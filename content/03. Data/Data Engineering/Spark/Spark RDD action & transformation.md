---
title: Spark RDD action & transformation
date: 2024-09-19
draft: false
tags:
  - Spark
complete: true
---
## Spark Application 작업 단위
Spark로 제출되는 Job들은 Task라는 저수준 RDD Byte Code로 변환되어 Executor 들에 분산된다.

![|825](https://i.imgur.com/pZN8SRc.png)


**Application** 
Spark 위에서 돌아가는 사용자 프로그램. Driver Program + Executor를 칭함

**SparkSession**
Spark Core 기능들과 상호 작용할 수 있는 진입점을 제공하는 객체이다. Spark Application 에서는 사용자가 직접 Spark Session 객체를 생성해야 한다.

**Job** 
Spark Action 에 대한 응답으로 생성되는 여러 Task들로 이루어진 병렬 연산.
Spark Driver는 Spark Application을 하나 이상의 Job으로 변환하고, 각 Job은 DAG(실행계획)로 변환된다. DAG에서의 각각 Job Node들은 하나 이상의 Spark Stage에 해당한다.

**Stage**
Dependency를 가지는 다수의 Task 들의 모음.
Parallel 하거나 Continuous 하게 수행될 수 있는 작업을 기반으로 생성되며 일종의 물리적인 실행 계획을 담은 Dag라고 볼 수 있다.

**Task**
Executor에서 실행되는 가장 작은 실행 단위.
각 Task는 개별 CPU Core에 할당되고, 데이터의 개별 partition을 가지고 작업하게 된다. 만약 16 core를 가진 executor라면, 16개 이상의 partition을 갖는 16개 이상의 Task를 할당받아 작업하게 된다.


---

## 스파크 연산의 종류
Spark는 분산 환경에서 데이터를 다루는 데 필요한 **지연 처리방식의 transformation**과 **즉시 실행 방식의 action**을 제공

모든 Transformation은 호출된 직후 처리되지 않으며 Action을 호출하기 전까지 Lineage로서 기록만 해둔다. 기록된 Lineage들을 모아 Logical Execution Plan을 형성하고 후반이 되어서야 Optimizer를 통한 최적화를 한다. 즉, Action이 실행되는 시점이나 실제 Storage로부터 데이터를 읽거나 쓰는 연산을 하기 전까지 실제 Spark 연산을 미루는 것, 다시 말하면 Action이 실행될 때 Lineage를 기반으로 최적화된 Transformation 실행 계획을 따라가며 실제 연산이 실행된다.

![|675](https://i.imgur.com/JDYdGmW.png)


Lazy Evaluation이 가능하기 때문에 Query Opzimizing을 지원하고 (연산 Query를 분석하여 어떤 부분을 Optimize 진행해야 하는지 알 수 있음), Lineage로 기록하기 때문에 Fault Tolerance를 지원한다. (Lineage를 재실행시키면 똑같은 결과를 얻을 수 있기 때문)

그리고 DataFrame과 Dataset의 transformation, action과 동일한 방식으로 동작한다.

### 트랜스포메이션(transformation)
이미 불변성의 특징을 가진 원본 데이터를 수정하지 않고 하나의 스파크 데이터 프레임을 새로운 데이터 프레임으로 변형하는 연산 
(ex: select(), filter() 등)  
트랜스포메이션의 결과는 즉시 계산되는게 아니라 계보(lineage)라 불리는 형태로 기록됨(지연평가)  
기록된 리니지는 실행 계획의 후반에 확실한 트랜스포메이션들끼리 재배열 및 결합 등을 통해 최적화

→ **transformation을 수행할 때 query plan만 만들고 실제로 메모리에 올리지는 않는다**. action이 호출될 때 transformation을 메모리에 올려서 수행하고 action을 수행시킨다.

#### Narrow Transformation
하나의 연산이 수행될 데이터가 하나의 노드에 바로 있어서 수행되는 것
![|625](https://i.imgur.com/S733Og2.png)

#### Wide Transformation
연산처리되어야 할 데이터 클러스터 노드 여기저기에 분산되어 있어서 연산처리 수행 시, 
메모리 간의 전달량이 많아 지는 것, 네트워크 연산 처리량이 많아짐
![|625](https://i.imgur.com/ZAjkUWD.png)

#### Transformation 연산 종류
| 연산(operation)                     | 설명                                                                                                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **distinct()**                    | RDD의 distinct 메서드를 호출                                                                                                                                 |
| **filter()**                      | SQL의 where절, RDD의 레코드를 모두 확인하고 조건 함수를 만족하는 레코드만 반환                                                                                                    |
| **map()**                         | 주어진 입력을 원하는 값으로 반환하는 함수를 명시하고 레코드별로 적용                                                                                                                |
| **flatMap()**                     | 단일 로우를 여러 로우로 변환해야 하는 경우에 사용하는 map의 확장버전                                                                                                              |
| **sortBy()**                      | RDD를 정렬, 함수를 지정해 RDD의 데이터 객체에서 값을 추출한 다음 값을 기준으로 정렬                                                                                                   |
| **union()**                       | RDD들의 elements를 합쳐서 새로운 RDD를 만든다.                                                                                                                     |
| **join()**                        | 데이터베이스에서 쓰이는 조인개념, 두개의 테이블로 부터 공통된 값을 기준으로 필드를 결합시킨다.                                                                                                 |
| **coalesce(), repartition()**     | output partition 수 조절할 때사용  <br>coalesce()와 repartition()의 차이는 셔플을 하냐 안하냐 차이인데, coalesce()는 full shuffling을 하지 않고, repartition()은 full shuffling을 한다. |
| **groupByKey()**                  | 한 쌍의 (K,V) 데이터셋이 있을 때, key K를 기준으로 데이터가 셔플되어서 새로운 RDD를 만든다.                                                                                           |
| **reduceByKey(func, [numTasks])** | 데이터가 셔플되기전에 같은 머신에 같은 key끼리 결합하여 key별로 count를 한다.                                                                                                     |
| **sortByKey()**                   | 한 쌍의 (K,V) 데이터셋이 있을 때 이 데이터는 key K를 기준으로 정렬되어 새로운 RDD가 된다.                                                                                            |


---
### 액션(action)
모든 기록된 트랜스포메이션의 지연 평가를 발동시킴. 즉 액션 a가 호출되면 그 전까지 기록된 모든 트랜스포메이션이 실제로 실행되며 데이터에 접근함  (ex, show(), take() 등)

실제의 데이터를 가지고 작업하고 싶을 때 action이 수행된다.
action을 수행하게되면 rdd는 더이상 rdd가 아닌 non-rdd values로 바뀐다.
action의 값들은 drivers에 저장되거나 외부의 storage system에 저장된다
→ laziness 한 RDD를 실제 동작으로 바꾸게 한다.

#### RDD Action 연산 종류

| 연산(operation)      | 설명                                                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **count()**        | RDD전체의 row수를 나타내고 RDD가아닌 int으로 바뀜                                                                                                      |
| **cellect()**      | driver program에 RDD전체 데이터를 리턴하고 RDD가 아닌 list로 바뀜                                                                                       |
| **take(n)**        | 지정한 n만큼 RDD의 .요소를 리턴하고,RDD가 아닌 list로 바뀜                                                                                                |
| **top(n)**         | 지정한 n만큼 RDD에서 큰 순서대로 리턴하고 RDD가아닌 list로 바뀜                                                                                              |
| **countByValue()** | RDD의 value별로 수를 count해서 return해주고 dict로 바뀐다.                                                                                           |
| **reduce()**       | RDD의 모든 값을 하나의 값으로 만들 때 사용, RDD가 아닌 다른 타입으로 바뀜                                                                                         |
| **fold()**         | reduce()와 비슷, zero value(0)을 input으로서 사용한다. reduce()와의 가장 큰 차이는 reduce()는 빈 collection에 exception을 던지고 fold()는 빈 collection을 위해 정의되었다. |
| **aggregate()**    | input type으로부터 다른 데이터 타입을 얻을 수 있도록 유연성을 제공                                                                                             |
| **first()**        | RDD의 요소중 가장 첫 번째 값을 리턴하고 RDD가 아닌 다른 타입으로 바뀜                                                                                            |
| **max(), min()**   | RDD의 요소중 가장 큰 값, 가장 작은 값을 리턴하고 RDD가 아닌 다른 타입으로 바뀜                                                                                      |

----

### Dataframe의 transformation, action 연산 분류
| transformation            | action     |
| ------------------------- | ---------- |
| distinct()                | show()     |
| withColumn()              | collect()  |
| withColumnRenamed()       | count()    |
| filter(), where()         | take()     |
| groupBy()                 | reduce()   |
| agg(sum,min,max,count...) | first()    |
| select()                  | describe() |
| selectExpr()              | explain()  |
| union(),unionAll()        |            |
| sort(), orderBy()         |            |
| drop()                    |            |

#### spark.read나 spark.sql은 lazy transformation?
어떻게 보면 맞긴하다.
csv파일 데이터를 읽어오는데 스키마를 알기위해서 inferSchema옵션을 true로 주면, 
eager operation으로 메모리에 데이터를 다 올리지만,
parquet같이 메타데이터가 포함되어 있으면 file을 읽어올 때에는 lazy 하게 접근한다고 봐도 된다.
같은 맥락으로 csv파일도 schema를 직접 만들어서 read시에 .schema(정의한 스키마)처럼 주게되면 메모리를 사용하지 않고, 
lazy하게 접근한다.
spark.sql 또한 해당 sql을 논리적인 실행계획만 만들어두고, action이 있기 전까지는 메모리를 사용하지 않는다.

#### *df.write은 action?*
action이다. 하지만 정확히는 basic action으로 분류된다.

#### ***basic action이란?**
연산자(메소드)들의 그룹이다.
ex) write, toDF, schema, printSchema(), createTempView()...