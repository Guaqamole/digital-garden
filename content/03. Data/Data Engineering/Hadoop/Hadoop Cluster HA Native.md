---
title: Hadoop Native
date: 2025-05-12
draft: false
tags:
  - Hadoop
complete: true
link: https://eyeballs.tistory.com/236
---
## Prerequiste
### Spec
#### Server Spec
- Namenode x 2
	- CentOS7
	- 4core/8Gib/50Gib
	- 4core/8Gib/50Gib
- Datanode x 3
	- CentOS7
	- 4core/8Gib/50Gib
	- 4core/8Gib/50Gib
	- 4core/8Gib/50Gib
#### Version
- jdk8u192-b12
- hadoop 2.10.1
- zookeeper 3.7.0

### Process List

| Server                      | Component                             | Daemon                                                                                                                                       |
| :-------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| namenode1.ay1.krane.9rum.cc | Namenode, Resource Manager, Zookeeper | - DFSZKFailoverController (zookeeper)<br>- JournalNode<br>- NameNode<br>- QuorumPeerMain (zookeeper)<br>- ResourceManager (resource manager) |
| namenode2.ay1.krane.9rum.cc | Namenode, Resource Manager, Zookeeper | - DFSZKFailoverController (zookeeper)<br>- JournalNode<br>- NameNode<br>- QuorumPeerMain (zookeeper)<br>- ResourceManager (resource manager) |
| datanode1.ay1.krane.9rum.cc | Datanode                              | - DataNode<br>- NodeManager                                                                                                                  |
| datanode2.ay1.krane.9rum.cc | Datanode                              | - DataNode<br>- NodeManager                                                                                                                  |
| datanode3.ay1.krane.9rum.cc | Datanode                              | - DataNode<br>- NodeManager                                                                                                                  |

```python
namenode1.ay1.krane.9rum.cc
namenode2.ay1.krane.9rum.cc
datanode1.ay1.krane.9rum.cc
datanode2.ay1.krane.9rum.cc
datanode3.ay1.krane.9rum.cc
```

## Setup
### pre
#### /etc/hosts (prod는 안되어있음)
```python
10.92.95.42 name1
10.202.75.140 name2
10.202.72.27 data1
10.202.17.46 data2
10.202.56.215 data3
```

#### envs (bash_profile)
```python
export JAVA_VERSION=8u192-b12
export ZK_VERSION=3.7.0
export HADOOP_VERSION=2.10.1

export HADOOP_BASE=/hanmail
export HADOOP_HOME=$HADOOP_BASE/hadoop-$HADOOP_VERSION
export HADOOP_BIN=$HADOOP_HOME/bin
export HADOOP_LOG_DIR=$HADOOP_HOME/logs/hadoop
export HADOOP_PID_DIR=$HADOOP_BASE/pids/hadoop
export HADOOP_MAPRED_PID_DIR=$HADOOP_BASE/pids/mapred
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export HADOOP_OPTS=-Djava.library.path=/lib
export HADOOP_MAPRED_LOG_DIR=$HADOOP_HOME/logs/mapreduce

export JAVA_HOME=$HADOOP_BASE/jdk$JAVA_VERSION

export YARN_PID_DIR=$HADOOP_BASE/pids/yarn
export YARN_LOG_DIR=$HADOOP_HOME/logs/yarn

export ZK_BASE=/hanmail
export ZK_HOME=$ZK_BASE/zookeeper-$ZK_VERSION

PATH=$PATH:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$ZK_HOME/bin
```

### zookeeper (namenode only)
```python
tar -zxvf zookeeper-3.7.0.tgz
sed -i 's/search-spamhd-name1:2888:3888/namenode1.ay1.krane.9rum.cc:2888:3888/g' $ZK_HOME/conf/zoo.cfg
sed -i 's/search-spamhd-name2:2888:3888/namenode2.ay1.krane.9rum.cc:2888:3888/g' $ZK_HOME/conf/zoo.cfg
sed -i 's/search-spamhd-name3:2888:3888/datanode1.ay1.krane.9rum.cc:2888:3888/g' $ZK_HOME/conf/zoo.cfg
sed -i "s|/data2/hanadmin/connexdata/zkdata|$ZK_HOME/data|g" $ZK_HOME/conf/zoo.cfg
mkdir -p $ZK_HOME/data
sed -i "s|/data4/hanadmin/connexdata/logs/zk|$ZK_HOME/logs|g" $ZK_HOME/conf/log4j.properties

cat $ZK_HOME/conf/zoo.cfg
cat $ZK_HOME/conf/log4j.properties
```

```python
# myid
echo 1 >> $ZK_HOME/data/myid
cat $ZK_HOME/data/myid

tar -zxvf jdk8u192-b12.tgz

zkServer.sh start
zkCli.sh -server localhost:2181
ls / # no error should be occured
```

### hadoop-namenode
#### slaves
```python
tar -zxvf hadoop2.10.1.tgz

# slaves
rm $HADOOP_CONF_DIR/slaves
sh -c 'cat << EOF >> $HADOOP_CONF_DIR/slaves
namenode1.ay1.krane.9rum.cc
namenode2.ay1.krane.9rum.cc
datanode1.ay1.krane.9rum.cc
datanode2.ay1.krane.9rum.cc
datanode3.ay1.krane.9rum.cc
EOF'
cat $HADOOP_CONF_DIR/slaves
```

#### core-site.xml
```python
sed -i "s|hdfs://spamhd|hdfs://demohd|g" $HADOOP_CONF_DIR/core-site.xml
sed -i "s|search-spamhd-name1.dakao.io:2181,search-spamhd-name2.dakao.io:2181,search-spamhd-name3.dakao.io:2181|namenode1.ay1.krane.9rum.cc:2181,namenode2.ay1.krane.9rum.cc:2181,|g" $HADOOP_CONF_DIR/core-site.xml
sed -i "s|/data3/hanadmin/connexdata/tmp/hadoop-hanadmin|/tmp|g" $HADOOP_CONF_DIR/core-site.xml
sed -i "s|/hanmail/connex/opt/hadoop-2.10.1/etc/hadoop/rack-topology.sh|/hanmail/hadoop-2.10.1/etc/hadoop/rack-topology.sh|g" $HADOOP_CONF_DIR/core-site.xml

cat $HADOOP_CONF_DIR/core-site.xml
```

#### hdfs-site.xml & yarn-site.xml → 여기까지했음
```python
sed -i "s|hdfs://spamhd|hdfs://demohd|g" $HADOOP_CONF_DIR/hdfs-site.xml
```

```python
# vi 로 치환
:%s/search-spamhd-name/namenode/g
:%s/dakao.io/ay1.krane.9rum.cc/g
:%s/\/connex\/opt//g
```
#### execute
```python
$HADOOP_HOME/sbin/stop-all.sh
```
### hadoop-datanode
```python

```



## Test





## Scenario