---
title: Airflow Install Native
date: 2024-11-08
draft: false
tags:
  - Airflow
  - DataEngineering
complete: true
---
# Airflow Celery
## Install
1. packages
2. mysql
3. redis
4. airflow-config
5. airflow command
6. cosmos-astronomer

### Packages
```python
# Airflow Contraints
export AIRFLOW_HOME=/Users/john/airflow2.10
export AIRFLOW_VERSION=2.10.5
export PYTHON_VERSION=3.9.16
python3 -m venv airflow2.10 && cd airflow2.10 && source bin/activate
sudo wget https://raw.githubusercontent.com/apache/airflow/constraints-main/constraints-3.10.txt

# Airflow 설치
pip3 install --upgrade pip
pip3 install "apache-airflow[celery]==2.10.5" --constraint constraints-3.10.txt
#pip3 install "apache-airflow[celery]==2.10.5" --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-main/constraints-3.10.txt"
pip3 install -U 'apache-airflow[celery,hdfs,hive,kerberos,kubernetes,mysql,password,spark,redis]'==2.10.5
pip3 install -U pyspark==3.4.2
pip3 install -U mmhash2


# airflow 설치했던 곳에 config 파일 생김.
airflow config list

# Plugins
sudo apt-get install python3-dev gcc libmysqlclient-dev -y 
pip3 install mysql-connector-python 
pip3 install mysqlclient
pip3 install 'apache-airflow[mysql]'
pip3 install redis
pip3 install celery
pip3 install flower
```

#### pip3 install mysqlclient 안될때
```python
note: This error originates from a subprocess, and is likely not a problem with pip.
error: subprocess-exited-with-error

sudo apt-get update
sudo apt-get install pkg-config
pip3 install mysqlclient
```

### mysql
```python
create database airflow;

-- 유저 생성
create user 'airflow'@'%' identified by 'airflow';

-- airflow 유저에 airflow 스키마 권한 생성
grant all privileges on airflow.* to 'airflow'@'%';
flush privileges;
```


### redis
```bash
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis

vi /etc/redis/redis.conf
#bind 127.0.0.1 ::1
bind 0.0.0.0


sudo systemctl enable redis-server
sudo systemctl start redis-server

netstat -npat | grep redis
tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN      46740/redis-server

# test
redis-cli

127.0.0.1:6379> ping
PONG # sucess
```

### airflow.cfg
```python
vi airflow/airflow.cfg

# Timezone 설정
default_timezone = Asia/Seoul

# 메타데이터 저장소 설정
sql_alchemy_conn = mysql://airflow:airflow@localhost:3306/airflow

# Executor DB 설정
result_backend = db+mysql://airflow:airflow@localhost:3306/airflow

# Redis 설정 [celery] 이부분 꼭 넣어야함.
[celery]
broker_url = redis://192.168.51.200:6379/0

# DAG 리스트 갱신 설정 (테스트니까 10초로)
dag_dir_list_interval = 10

# Executor를 설정
executor = CeleryExecutor

load_examples = False
```


### airflow commands
#### master
```python
airflow db init
Initialization done

airflow users create --role Admin --username admin --email admin --firstname admin --lastname airflow --password admin

airflow users create --role Admin --username airflow --email airflow --firstname airflow --lastname airflow --password airflow

airflow scheduler -D
airflow webserver -D
airflow celery flower -D
```

#### worker
```python
# 가상환경 미설치시
sudo apt-get update
sudo apt-get install python3-virtualenv

vi airflow/airflow.cfg

# Timezone 설정
default_timezone = Asia/Seoul

# 메타데이터 저장소 설정
sql_alchemy_conn = mysql://airflow:airflow@192.168.51.200:3306/airflow

# Executor DB 설정
result_backend = db+mysql://airflow:airflow@192.168.51.200:3306/airflow

# Redis 설정
broker_url = redis://192.168.51.200:6379/0

# DAG 리스트 갱신 설정 (테스트니까 10초로)
dag_dir_list_interval = 10

# Executor를 설정
executor = CeleryExecutor
```

command
```python
airflow celery worker
```

#### error
```python
# queue 설정을 별도로 할 경우 job submit이 안되는 경우가 있다.
airflow celery worker -q queue
```



# Airflow Local
```python
# Airflow Contraints
python3 -m venv airflow-local && cd airflow-local && source bin/activate
sudo wget https://raw.githubusercontent.com/apache/airflow/constraints-main/constraints-3.10.txt

# Airflow 설치
pip3 install --upgrade pip
pip3 install "apache-airflow==2.10.3" --constraint constraints-3.10.txt
pip3 install "apache-airflow==2.10.3" --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-main/constraints-3.10.txt"

# airflow 설치했던 곳에 config 파일 생김.
airflow config list

# Plugins
sudo apt-get install python3-dev gcc libmysqlclient-dev -y 
pip3 install mysql-connector-python 
pip3 install mysqlclient
pip3 install 'apache-airflow[mysql]'
pip3 install apache-airflow-providers-amazon
pip3 install apache-airflow-providers-ftp
pip3 install apache-airflow-providers-sftp
pip install 'apache-airflow-providers-sftp[ssh]'
```


```python
airflow db init

airflow users create \
    --username admin \
    --firstname airflow \
    --lastname airflow \
    --role Admin \
    --email admin@example.org
```

```python
airflow webserver --port 8080
airflow scheduler
```