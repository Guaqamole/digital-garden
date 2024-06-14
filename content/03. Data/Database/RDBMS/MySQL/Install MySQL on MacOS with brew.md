---
title: Install MySQL on MacOS with brew
date: 2024-06-13
draft: false
tags:
  - MySQL
complete: true
---
## Install
```python
brew install mysql@5.7
```

> [!warning] brew로 서비스 시작하지 말것.
>  brew services start mysql 으로 시작하지말아야한다.

## Config
vi /opt/homebrew/etc/my.cnf
- 5.7 버전에만 있는 mysqlx 설정은 모두 주석처리.
```python
#Default Homebrew MySQL server config
[mysqld]
# Only allow connections from localhost
bind-address = 0.0.0.0 # 0.0.0.0 변경
#mysqlx-bind-address = 127.0.0.1 # 5.7 버전에만 있는 mysqlx 설정은 모두 주석처리.
pid-file=/opt/homebrew/var/mysql/notebook.pid
secure-file-priv = "" # LOAD 명령어 쓸때 필요.
```

## Start
init
- 두개중 하나 선택해서 실행
```python
mysqld --initialize-insecure # without password
mysqld --initialize # with password
```

start
```python
mysql.server start
Starting MySQL
.. SUCCESS!
```

access
```python
mysql -u root
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.44 Homebrew

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

## Test
https://www.databasestar.com/sample-bookstore-database/
https://github.com/bbrumm/databasestar/tree/main/sample_databases/sample_db_gravity

erd
![](https://i.imgur.com/1Xz3ib6.png)


### run sql file
```python
mysql> source /Users/avokey/mysql/sample_databases/sample_db_bookstore/mysql/01_mysql_create.sql

Query OK, 1 row affected (0.00 sec)

Database changed
Query OK, 0 rows affected (0.01 sec)
Query OK, 0 rows affected (0.00 sec)
...
```


### load sql file with no schema
```python
brew install mysql-client pkg-config
pip install csvkit mysqlclient
```

create sql
```bash
csvsql --dialect mysql --snifflimit 100000 --db-schema dbt jaffle_shop_customers.csv > jaffle_shop_customers.sql 
```

schema
```python
source /Users/avokey/Downloads/jaffle-shop/jaffle_shop_customers.sql
source /Users/avokey/Downloads/jaffle-shop/jaffle_shop_orders.sql
source /Users/avokey/Downloads/jaffle-shop/stripe_payment.sql
```

import sql
```python
csvsql --db mysql://admin@localhost:3306/dbt --tables jaffle_shop_customers --insert jaffle_shop_customers.csv

csvsql --db mysql://admin@localhost:3306/dbt --tables jaffle_shop_orders --insert jaffle_shop_orders.csv

csvsql --db mysql://admin@localhost:3306/dbt --tables stripe_payment.csv --insert stripe_payment.csv
```

or
```sql
LOAD DATA INFILE "/Users/avokey/Downloads/jaffle-shop/jaffle_shop_customers.csv"
INTO TABLE jaffle_shop_customers
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;
```