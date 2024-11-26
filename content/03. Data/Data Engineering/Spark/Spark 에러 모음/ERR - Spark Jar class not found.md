---
title: ERR - Spark Jar class not found
date: 2023-10-19
draft: false
tags:
  - Spark
  - ErrorLog
complete: true
---
# 현상

spark-submit 시 `--jars` 옵션으로 jar와 같이 submit 했지만 ClassNotFound Error 발생.

```bash
spark-submit  --jars /home/xxx/mysql-connector-j-8.0.33.jar ...

SparkContext: Added JAR /home/xxx/mysql-connector-j-8.0.33.jar at spark://ip-xxx.xxx.xxx
```

```bash
java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver
```

___
# 원인

에러 발생 지점

```python
rds_df = (spark
	.read
	.format("jdbc")
	.option("url", f'jdbc:mysql://{rds_endpoint}:{rds_port}/{rds_dbname}')
	.option("driver", "com.mysql.cj.jdbc.Driver")
	.option("dbtable", transform_rds_sql)
	.option("user", "****").option("password", "****")
	.option("partitionColumn", "id")
	.option("lowerBound",1)
	.option("upperBound",10000000)
	.option("numPartitions", 4)
	.option("encoding", "UTF-8")
	.load() # 여기서 발생
)

...
```


___
# 조치

- `SPARK_HOME/jars 경로에 mysql-connector-j.jar` 추가.
- `spark-submit` 시 서버에 클라이언트가 서버에 Load 해주는줄 알아서  `/jars` 경로에 안넣어줘도 된다고 생각했는데, 결국 추가해야되나 보다.