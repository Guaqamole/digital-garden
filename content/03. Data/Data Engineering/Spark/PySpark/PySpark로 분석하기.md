---
title: PySpark로 분석하기
date: 2024-11-21
draft: false
tags:
  - Spark
  - DataEngineering
complete: true
---
# RDD
https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.RDD.aggregate.html

## SparkContext Initialize
```python
sc = start_spark(queue_name='half', num_executors=300,app_name="john_ndid64_zero_count_app", spark_conf={'spark.executor.memory': '4g', 'spark.driver.memory':'8g', 'spark.ui.showConsoleProgress': 'true'})
```


## Get RDD
- 여기서 map은 Python library map이 아닌, rdd.map() 이다.
```python
ids = sc.textFile('/output/image/part-m-00443').map(lambda x: eval(x))
```


## Filter with option
```python
filter_rdd = ids.filter(lambda x: x.get('Id') == '0')
result = filter_rdd.collect() # Lazy Evaluation
```


## COUNT
```python
ids_total_count = ids.count() # 15697436019
```