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
python -m pip install dbt-core dbt-mysql dbt-bigquery
```

### git clone
```python
git clone git@github.com:dbt-labs/jaffle-shop-classic.git
```

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

### dbt_project.yml


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

