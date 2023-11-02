---
title: Spark Demo Cluster 성능 Test
date: 2023-10-23
draft: false
tags:
  - Spark
  - PoC
complete: true
---
# Introduction

기존 Airflow로 수행했던 ETL 작업을 Spark Cluster로 이전하기 전 Airflow, Spark 클러스터간 성능차이를 비교해보고 만약 이전한다면 Airflow의 Workload를 얼마나 Spark Cluster가 가져 갈 수 있는지 알아본다.


# Spark Partition

Spark의 Executor가 병렬로 작업을 수행할 수 있게 하려면 Spark는 데이터를 파티션이라는 작은 조각으로 나눈다. 즉, 파티션은 클러스터중 하나의 물리적 머신에 있는 행의 집합(Collection of rows)이다.

하나의 파티션만 있다면 수천 개의 Executor가 있더라도 Spark는 병렬로 작업하지 않고 반대로, 파티션 수만 많고 Executor가 하나뿐이라면 Spark는 여전히 병렬로 작업하지 않는다.

Spark에서는 하나의 최소 연산을 Task라고 표현하는데, 이 하나의 Task에서 하나의 Partition이 처리된다. 또한, 하나의 Task는 **하나의 Core가 연산 처리한다.**

## 예시

- 전체 Core 수: 300개
- 전체 Partition 수: 1800개

Core 수를 300개로 세팅했다면, 현재 병렬로 실행이 가능한 Task의 수는 300개이며, 300개의 Partition이 작업을 처리중이다. 전체 Partition 개수가 1800개이므로, 미리 선점된 300개의 CPU 자원이 release 되야 나머지 Task를 실행한다.

![](https://tech.kakao.com/storage/2022/01/01-12.png)

이처럼 설정된 Partition 수에 따라 각 Partition의 크기가 결정된다. 그리고 이 Partition의 크기가 결국 Core 당 필요한 메모리 크기를 결정하게 된다.

- `Partition` 수 → `Core` 에 영향을 미침
- `Partition` 크기 → `메모리 크기`에 영향을 미침

따라서, Partition의 크기와 수가 Spark 성능에 큰 영향을 미치는데, 통상적으로는 Partition의 크기가 클수록 메모리가 더 필요하고, Partition의 수가 많을수록 Core가 더 필요하다.

- **적은 수의 Partition = 크기가 큰 Partition**
- **많은 수의 Partition = 크기가 작은 Partition**

즉, Partition의 수를 늘리는 것은 Task 당 필요한 메모리를 줄이고 병렬화의 정도를 증가시킨다.

> [!warning]
> 그렇다고 무조건 Partition의 개수를 늘린다고 성능이 증가되진 않는다.

통상적으로, Spark Job의 성능을 최적화 시킬때 고려해야할 우선순위는 다음과 같다:
쿼리 최적화 > Parition의 수 > Core당 메모리 증가

Spark Partition이 성능에 어떤 영향을 미치는지 이해했다면, Spark Application 작성시 작은 작업보단 큰 작업을 수행해야 할 때 적절하다고 생각할것이다.

작업의 갯수가 많고 하나의 작업마다 큰 리소스가 요구되지 않는 성격의 Task라면, Spark Cluster를 통해 수행하지 않는것이 리소스를 낭비하지 않는 최선의 방법임.


## 실전

Spark에서 Partition을 나누는 방법은 여러가지가 있지만 가장 기초적인 방법은 데이터 소스 API를 사용하는 것

Spark에서 지원하는 대표적인 데이터 소스 종류는 다음과 같다 (커뮤니티에서 만든 데이터 소스는 더 많다):
- CSV
- JSON
- Parquet
- ORC
- JDBC/ODBC
- TXT

Spark에선 위 데이터 소스를 읽을때 다음과 같은 형식을 사용한다 (Python, Java, Scala 모두 동일).
```scala
DataFrameReader.format(...).option("key", "value").schema(...).load()
```
- `DataFrameReader` (필수) : 데이터를 읽을 때는 기본적으로 `DataFrameReader` 객체를 사용
- `.format()` (선택) : 읽으려는 데이터 소스의 포맷. Default format은 parquet
- `.option("key", "value")` (선택) : 데이터를 읽는 방법을 키-값 형태로 제공
-  `.schema()` (선택) : 데이터에서 스키마를 제공하거나, 스키마 추론 기능을 사용할 때 사용

### 데이터 읽기

이번 예제에서는 PySpark를 사용하여 RDS 데이터를 BigQuery로 적재해야하므로 JDBC Connection에 관한 옵션과, SQL을 사용한만 예제만 명시


### Spark Session 객체 생성

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder.config("spark.jars", "mysql-connector-j-8.0.33.jar") \
.master("spark://{MASTER_IP}:{MASTER_PORT}") \
.appName("SparkApp").getOrCreate()

```


### JDBC 데이터 소스 생성

- 위 예시와같이 `.format()` , `.option()`, `.load()` 형식 사용
```python
rds_df = (spark
    .read
    .format("jdbc")
    .option("url", "jdbc:mysql://{rds_endpoint}:{rds_port}/{rds_dbname}")
    .option("driver", "com.mysql.cj.jdbc.Driver")
    .option("dbtable", "select * from shop")
    .option("user", {rds_user}).option("password", {rds_password})
    .option("partitionColumn", "shop_id")
    .option("lowerBound",1)
    .option("upperBound",10000)
    .option("numPartitions", 2)
    .load()
)
```

이중 중요 옵션만 살펴보면 다음과 같다:
https://spark.apache.org/docs/latest/sql-data-sources-jdbc.html

| **Property Name**                       | **Default** | **Meaning**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url                                     | (none)      | The JDBC URL of the form jdbc:subprotocol:subname to connect to. The source-specific connection properties may be specified in the URL. e.g., jdbc:postgresql://localhost/test?user=fred&password=secret                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| dbtable                                 | (none)      | The JDBC table that should be read from or written into. Note that when using it in the read path anything that is valid in a FROM clause of a SQL query can be used. For example, instead of a full table you could also use a subquery in parentheses. It is not allowed to specify dbtable and query options at the same time.                                                                                                                                                                                                                                                                                                                                                                                        |
| query                                   | (none)      | A query that will be used to read data into Spark. The specified query will be parenthesized and used as a subquery in the FROM clause. Spark will also assign an alias to the subquery clause. As an example, spark will issue a query of the following form to the JDBC Source.Below are a couple of restrictions while using this option.- It is not allowed to specify dbtable and query options at the same time.    - It is not allowed to specify query and partitionColumn options at the same time. When specifying partitionColumn option is required, the subquery can be specified using dbtable option instead and partition columns can be qualified using the subquery alias provided as part of dbtable. |
| partitionColumn, lowerBound, upperBound | (none)      | These options must all be specified if any of them is specified. In addition, numPartitions must be specified. They describe how to partition the table when reading in parallel from multiple workers. partitionColumn must be a numeric, date, or timestamp column from the table in question. Notice that lowerBound and upperBound are just used to decide the partition stride, not for filtering the rows in table. So all rows in the table will be partitioned and returned. This option applies only to reading.                                                                                                                                                                                                |
| numPartitions                           | (none)      | The maximum number of partitions that can be used for parallelism in table reading and writing. This also determines the maximum number of concurrent JDBC connections. If the number of partitions to write exceeds this limit, we decrease it to this limit by calling coalesce(numPartitions) before writing.                                                                                                                                                                                                                                                                                                                                                                                                         |

이중 `partitionColumn` 옵션을 사용하여 다수의 워커노드에서 병렬로 테이블을 나눠 읽는 방법을 제공한다. 여기서 `lowerBound` 와 `upperBound는` 테이블의 행을 필터링하는데 사용되는것이 아니라, 각 파티션의 범위를 결정하는데 사용한다.

`numPartitions는` 테이블의 데이터를 병렬로 읽거나 쓰기 작업에 사용할 수 있는 최대 파티션 수를 결정한다. 해당 속성은 JDBC Connection 수를 결정하며, 쓰기에 사용되는 파티션수가 값을 초과하는경우, 쓰기 연산전에 `coalesce (numPartitions)` 를 실행해 파티션 수를 이 값에 맞게 자동으로 줄이게 된다.

```bash
partitionRows = upperBound / numPartitions - lowerBound / numPartitions
```

따라서, 위 쿼리의 내용은 만개의 row를 2개의 파티션으로 나눠서 5000 rows 씩 병렬로 처리한다는 뜻이다. 
만약 Cluster에 가용한 Executor가 2개 존재한다면 처리할 전체 Rows 수가:
- 10,000 rows 일경우 -> 5000, 5000로 나눠서 병렬로 처리
- 20,000 rows 일경우 -> 5000, 15000로 나눠서 병렬로 처리

---

# Testing

**Airflow**
- Master - 2 vCPUs, 8 Gib
- 2 x worker - 2 vCPUs, 8 Gib

**Spark Cluster**
- Master - 1 vCPU, 2g Gib
- 2 x Worker - 1 vCPU, 2g Gib
- numPartition: 2

### **Test by time taken** (10.24 기준)

| **Workflow**                   | **Spec**                     | **Airflow Cluster** | **Spark Cluster** |
| ------------------------------ | ---------------------------- | ------------------- | ----------------- |
| shop (shop, shop_info)         | Rows: 70864<br><br>Cols: 40  | 63s                 | 88s (+25s)        |
| deposit                        | Rows: 73208<br><br>Cols: 7   | 42s                 | 67s (+25s)        |
| point                          | Rows: 73210<br><br>Cols: 7   | 42s                 | 65s (+23s)        |
| shop_address                   | Rows: 80190<br><br>Cols: 16  | 65s                 | 79s (+14s)        |
| shop_grade                     | Rows: 63894<br><br>Cols: 11  | 43s                 | 75s (+32s)        |
| bookmark (goods, vendor, menu) | Rows: 63165<br><br>Cols: 9   | 77s                 | 106s (+29s)       |
| coupon_history                 | Rows: 232138<br><br>Cols: 10 | 54s                 | 92s (+38s)        |


### **Test by rows** (10.24 기준)
- Table: cmt_order_status_history
- Total Rows: 11,615,715
- Total Columns: 13

| **order_status_history** | **Airflow Cluster** | **Spark Cluster** |
| ------------------------ | ------------------- | ----------------- |
| 100,000 rows             | O                   | O                 |
| 200,000 row              | O                   | O                 |
| 500,000 rows             | X                   | O                 |
| 1,000,000 rows           | X                   | O                 |
| 2,000,000 rows           | X                   | Scale-up 필요     |
| 5,000,000 rows           | X                   | Scale-out 필요    |
| 10,000,000 rows          | X                   | Scale-out 필요    |


