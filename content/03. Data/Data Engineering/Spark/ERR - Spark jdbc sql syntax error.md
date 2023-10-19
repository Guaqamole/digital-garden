---
title: Spark jdbc sql syntax error
date: 2023-10-18
draft: false
tags:
  - Spark
  - ErrorLog
---
# 현상

```sh
java.sql.SQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ';) SPARK_GEN_SUBQ_0 WHERE 1=0' at line 15
```

___
# 원인

> [!warning] 
> spark `query` option 사용시 아래 옵션을 함께 사용할 수 없다:
>  - `partitionColumn`
>  - `lowerBound`
>  - `upperBound`
>
> 따라서 해당 옵션들을 주석처리 하였다.
>  https://sparkbyexamples.com/spark/spark-jdbc-parallel-read/

```python
rds_df = (spark
	.read
	.format("jdbc")
	.option("url", f'jdbc:mysql://{rds_endpoint}:{rds_port}/{rds_dbname}')
	.option("driver", "com.mysql.cj.jdbc.Driver")
	#.option("dbtable", transform_rds_sql)
	.option("query", rds_sql)
	.option("user", "xxxxx").option("password", "xxxxx")
	#.option("partitionColumn", "point_id") # cannot use with 'query' option.
	#.option("lowerBound",1)
	#.option("upperBound",20000)
	.option("numPartitions", 2)
	.option("encoding", "UTF-8")
	.load()
)
```

`numPartitions` 옵션 사용시 자동으로 쿼리끝에 `';) SPARK_GEN_SUBQ_0 WHERE 1=0' ` 문이 추가되는데 만약 작성한 쿼리에 세미 콜론이 있다면 `SQL Syntax Error`가 발생하게 된다.

```sql
-- rds_sql.sql
SELECT name, age
FROM users
;
```

___
# 조치

세미콜론 `;`  제거.
```sql
-- rds_sql.sql
SELECT name, age
FROM users
```

