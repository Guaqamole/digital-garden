---
title: Hbase Install Native
date: 2024-11-10
draft: false
tags:
  - DataEngineering
  - Hbase
complete: true
---
## Install
### Prerequisite
- jdk 1.8
- hadoop
- zookeeper (cluster)

### binary
```python
wget http://apache.mirror.gtcomm.net/hbase/stable/hbase-2.5.10-bin.tar.gz
```

### conf
bashrc
```python
# Hbase
export HBASE_HOME=/opt/hbase
export HBASE_CONF=/opt/hbase/conf
#export HBASE_PID_DIR=$HBASE_HOME/pid
```

$HBASE_CONF/hbase-site.xml
```python
<configuration>
  <property>
    <name>hbase.cluster.distributed</name>
    <value>true</value>
  </property>
  <property>
    <name>hbase.root.dir</name>
    <value>hdfs://linux:8030/hbase</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/hadoop/zookper</value>
  </property>
  <property>
    <name>hbase.unsafe.stream.capability.enforce</name>
    <value>false</value>
  </property>
</configuration>
```

$HBASE_CONF/hbase-env.sh
```python
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
```

### command
```python
$HBASE_HOME/bin/start-hbase.sh

jps
61325 HMaster
61179 HQuorumPeer
61540 HRegionServer

hadoop fs -ls /user/root/tmp/hbase
...

$HBASE_HOME/bin/hbase shell
HBase Shell
Use "help" to get list of supported commands.
Use "exit" to quit this interactive shell.
For Reference, please visit: http://hbase.apache.org/2.0/book.html#shell
Version 2.5.10, ra3af60980c61fb4be31e0dcd89880f304d01098a, Thu Jul 18 22:45:17 PDT 2024
Took 0.0008 seconds
hbase:001:0> list
TABLE
0 row(s)
Took 0.2225 seconds
=> []

hbase:003:0> create 'emps', 'personal data', 'professional data'
2024-11-10 22:22:34,664 INFO  [main] client.HBaseAdmin (HBaseAdmin.java:postOperationResult(3599)) - Operation: CREATE, Table Name: default:emps, procId: 9 completed
Created table emps
Took 0.6507 seconds
=> Hbase::Table - emps

hbase(main):010:0> put ...
put 'emps', '1', 'personal data:name', 'john'
put 'emps', '1', 'personal data:city', 'seoul'
put 'emps', '1', 'professional data:designation', 'manager'
put 'emps', '1', 'professional data:salary', '50000'

hbase:013:0> scan 'emps'
ROW                                  COLUMN+CELL
 1                                   column=personal data:city, timestamp=2024-11-10T22:24:46.093, value=seoul
 1                                   column=personal data:name, timestamp=2024-11-10T22:24:33.405, value=john
 1                                   column=professional data:designation, timestamp=2024-11-10T22:24:48.715, value=manager
 1                                   column=professional data:salary, timestamp=2024-11-10T22:24:52.910, value=50000
1 row(s)

hbase:016:0> get 'emps', '1'
COLUMN                               CELL
 personal data:city                  timestamp=2024-11-10T22:24:46.093, value=seoul
 personal data:name                  timestamp=2024-11-10T22:24:33.405, value=john
 professional data:designation       timestamp=2024-11-10T22:24:48.715, value=manager
 professional data:salary            timestamp=2024-11-10T22:24:52.910, value=50000
```