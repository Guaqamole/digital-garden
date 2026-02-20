---
title: Hive Install Native
date: 2024-11-10
draft: false
tags:
  - DataEngineering
  - Hive
complete: true
---
## Install
 - jdk 1.8
 - hadoop

## Conf
hive-site
```python
vi $HIVE_CONF/hive-site.xml
<configuration>
    <property>
        <name>javax.jdo.option.ConnectionURL</name>
        <value>jdbc:mysql://host:3306/metastore?createDatabaseIfNotExist=true&amp;useSSL=false&amp;allowPublicKeyRetrieval=true&amp;serverTimezone=Asia/Seoul</value>
        <description>metadata is stored in a MySQL server</description>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionDriverName</name>
        <value>com.mysql.cj.jdbc.Driver</value>
        <description>MySQL JDBC driver class</description>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionUserName</name>
        <value>hive</value>
        <description>user name for connecting to mysql server</description>
    </property>
    <property>
        <name>javax.jdo.option.ConnectionPassword</name>
        <value>hive</value>
        <description>hivepassword for connecting to mysql server</description>
    </property>
    <property>
        <name>hive.metastore.warehouse.dir</name>
        <value>/user/hive/warehouse</value>
    </property>
    <property>
      <name>hive.metastore.uris</name>
      <value>thrift://192.168.51.190:9083</value>
    </property>
</configuration>
```

core-site.xml (namenode 바라봐야함)
```python
vi $HADOOP_CONF/core-site.xml
<configuration>
  <property>
	   <name>fs.default.name</name>
		  <value>hdfs://linux:9000</value>
  </property>
</configuration>
```

```python
cp hive-env.sh.template hive-env.sh
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64

# hadoop env도 동일하게 jdk8되어야함.
vi $HADOOP_CONF/hadoop-env.sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```


## MySQL
```python
create database metastore;

-- 유저 생성
create user 'hive'@'%' identified by 'hive';

-- airflow 유저에 airflow 스키마 권한 생성
grant all privileges on hive.* to 'hive'@'%';
flush privileges;
```
## Command
```python
hdfs dfs -mkdir -p /user/hive/warehouse
hdfs dfs -mkdir -p /tmp
hdfs dfs -chmod g+w /user/hive/warehouse
hdfs dfs -chmod g+w /tmp

$HIVE_HOME/bin/schematool -dbType mysql -initSchema
Initialization script completed
schemaTool completed

# tmux
$HIVE_HOME/bin/hive
```

## Error
```python
Exception in thread "main" java.lang.ClassCastException: class jdk.internal.loader.ClassLoaders$AppClassLoader cannot be cast to class java.net.URLClassLoader (jdk.internal.loader.ClassLoaders$AppClassLoader and java.net.URLClassLoader are in module java.base of loader 'bootstrap')

==> Install JDK 8 & hadoop-env, hive-env 둘다 jdk8로 설정.
apt-cache search openjdk-8 | grep openjdk-8
sudo apt install openjdk-8-jdk -y

export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
```