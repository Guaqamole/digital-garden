---
title: DBT Quickstart
date: 2024-06-13
draft: false
tags:
  - Modeling
  - DBT
complete: true
---
## Install
```python
python -m pip install --upgrade pip
python -m pip install dbt-core dbt-mysql dbt-bigquery dbt-duckdb dbt-postgre
```

### git clone
```python
git clone git@github.com:dbt-labs/jaffle-shop-classic.git
```

## Flow
1. dbt init
2. dbt compile
3. dbt run
4. dbt test
5. dbt build
6. dbt docs generate
7. dbt docs serve

## Project Structure
- dbt init을 하면 기본적으로 폴더가 생성됨
- dbt init 할 때 생기는 폴더
```python
      ├── README.md
      ├── analyses
      ├── dbt_project.yml
      ├── macros
      ├── models
      │   └── example
      │       ├── my_first_dbt_model.sql
      │       ├── my_second_dbt_model.sql
      │       └── schema.yml : 모델 정의
      ├── seeds
      ├── snapshots
      └── tests
```
- dbt_project.yml : dbt 프로젝트 설정
- analyses/ : 임시 또는 일회성 분석을 위한 쿼리를 저장하는 폴더. dbt run을 해도 실행되지 않음
- macros/ : 재사용 가능한 매크로를 저장
- models/ : SQL 모델 파일들을 저장
	- 보통 staging, intermediate, mart와 같이 하위 폴더로 구분
	- schema.yml : 모델에 대한 정의. model name, description, columns, data_tests 등이 존재
- seeds/ : CSV 파일 형태의 변하지 않는 데이터를 저장
- snapshots/ : 데이터의 스냅샷을 찍기 위한 SQL 파일을 저장
	- dbt snapshot 명령어로 실행
- tests/ : 데이터 품질 테스트 정의
## Config Files
https://docs.getdbt.com/reference/node-selection/yaml-selectors
### profile.yml
https://docs.getdbt.com/docs/core/connect-data-platform/profiles.yml

### dbt_project.yml
https://docs.getdbt.com/reference/dbt_project.yml

### schema.yml
https://docs.getdbt.com/reference/model-properties

### sources.yml
https://docs.getdbt.com/docs/build/sources

## Init
```python
dbt init jaffle_shop
      
Running with dbt=1.7.16
Enter a name for your project (letters, digits, underscore): jaffle_shop
Your new dbt project "jaffle_shop" was created!

Which database would you like to use?
[1] mysql5
[2] mariadb
[3] mysql
Enter a number: 1
```

vi ~/.dbt/profile.yml
```python
jaffle_shop:
  target: dev
  outputs:
    dev:
      type: mysql5
      server: localhost
      port: 3306
      schema: dbt
      username: root
      password:
```

## DBT Project directorty
```python
root/
├─ models/
│  ├─ staging/
│  │  ├─ jaffle_shop/
│  │  │  ├─ _jaffle_shop_docs.md
│  │  │  ├─ _jaffle_shop_models.yml
│  │  │  ├─ _jaffle_shop_sources.yml
│  │  │  ├─ stg_jaffle_shop_customers.sql
│  │  │  ├─ stg_jaffle_shop_orders.sql
│  │  ├─ stripe/
│  │  │  ├─ _stripe_docs.md
│  │  │  ├─ _stripe_models.yml
│  │  │  ├─ _stripe_sources.yml
│  │  │  ├─ stg_stripe_order_payments.sql
├─ dbt_project.yml
```



## Start
### seed
- inserts data.
```python
cd $ROOT_PROJECT
ll seeds
-rw-r--r--   1 avokey  staff  1302  6 13 17:02 raw_customers.csv
-rw-r--r--   1 avokey  staff  2723  6 13 17:02 raw_orders.csv
-rw-r--r--   1 avokey  staff  2560  6 13 17:02 raw_payments.csv
```

```python
cd $ROOT_PROJECT
dbt seed
08:41:16  Running with dbt=1.7.16
08:41:16  Registered adapter: mysql5=1.7.0
08:41:16  Found 5 models, 3 seeds, 20 tests, 0 sources, 0 exposures, 0 metrics, 376 macros, 0 groups, 0 semantic models
08:41:16
08:41:16  Concurrency: 1 threads (target='dev')
08:41:16
08:41:16  1 of 3 START seed file dbt.raw_customers ....................................... [RUN]
08:41:16  1 of 3 OK loaded seed file dbt.raw_customers ................................... [INSERT 100 in 0.12s]
08:41:16  2 of 3 START seed file dbt.raw_orders .......................................... [RUN]
08:41:16  2 of 3 OK loaded seed file dbt.raw_orders ...................................... [INSERT 99 in 0.09s]
08:41:16  3 of 3 START seed file dbt.raw_payments ........................................ [RUN]
08:41:16  3 of 3 OK loaded seed file dbt.raw_payments .................................... [INSERT 113 in 0.12s]
08:41:16
08:41:16  Finished running 3 seeds in 0 hours 0 minutes and 0.44 seconds (0.44s).
08:41:16
08:41:16  Completed successfully
08:41:16
08:41:16  Done. PASS=3 WARN=0 ERROR=0 SKIP=0 TOTAL=3
```

```python
mysql> show tables;
+---------------+
| Tables_in_dbt |
+---------------+
| raw_customers |
| raw_orders    |
| raw_payments  |
+---------------+
```

### run
```python
dbt run
```


## With Cosmos Airflow
https://www.astronomer.io/docs/learn/airflow-dbt/
