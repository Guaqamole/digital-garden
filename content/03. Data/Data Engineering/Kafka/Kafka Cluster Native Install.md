---
title: Kafka Cluster Native Install
date: 2024-11-08
draft: false
tags:
  - Kafka
  - DataEngineering
complete: true
---
## Install
```python
wget https://downloads.apache.org/kafka/3.6.2/kafka_2.13-3.6.2.tgz
tar -zxvf kafka_2.13-3.6.2.tgz && mv kafka_2.13-3.6.2.tgz kafka
mkdir -pv logs/kraft-combined
```

## Kraft

### kraft config
- vi config/kraft/server.properties

broker1 (192.168.51.200)
```python
############################# Server Basics #############################
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@192.168.51.200:9093,2@192.168.51.190:9093

############################# Socket Server Settings #############################
listeners=PLAINTEXT://192.168.51.200:9092,CONTROLLER://192.168.51.200:9093
advertised.listeners=PLAINTEXT://192.168.51.200:9092

############################# Log Basics #############################
log.dirs=/opt/kafka/logs/kraft-combined-logs
num.partitions=2

############################# Internal Topic Settings  #############################
offsets.topic.replication.factor=2
transaction.state.log.replication.factor=2
transaction.state.log.min.isr=2
```

broker2 (192.168.51.190)
```python
############################# Server Basics #############################
process.roles=broker,controller
node.id=2
controller.quorum.voters=1@192.168.51.200:9093,2@192.168.51.190:9093

############################# Socket Server Settings #############################
listeners=PLAINTEXT://192.168.51.190:9092,CONTROLLER://192.168.51.190:9093
advertised.listeners=PLAINTEXT://192.168.51.190:9092

############################# Log Basics #############################
log.dirs=/opt/kafka/logs/kraft-combined-logs
num.partitions=2

############################# Internal Topic Settings  #############################
offsets.topic.replication.factor=2
transaction.state.log.replication.factor=2
transaction.state.log.min.isr=2
```

### cluster uuid, storage format
- broker 1대에서만 하면됨
```python
#  broker 1대에서만 하면됨
./bin/kafka-storage.sh random-uuid
wWbd7bqkQ-KJHVLmDLk4mA

# 모든 broker 적용
sudo ./bin/kafka-storage.sh format -t wWbd7bqkQ-KJHVLmDLk4mA -c ./config/kraft/server.properties
Formatting /opt/kafka/logs/kraft-combined-logs with metadata.version 3.6-IV2.
```

### start instance
- 각 서버마다 해줘야함.
- 모든 서버가 다 connect 될때까지 안뜸.
```python
sudo ./bin/kafka-server-start.sh -daemon ./config/kraft/server.properties
sudo ./bin/kafka-server-start.sh ./config/kraft/server.properties

[2024-11-09 00:09:21,383] INFO [KafkaRaftServer nodeId=1] Kafka Server started (kafka.server.KafkaRaftServer)
[2024-11-08 15:09:21,455] INFO [KafkaRaftServer nodeId=2] Kafka Server started (kafka.server.KafkaRaftServer)
```
### check cluster
```python
./bin/kafka-metadata-quorum.sh --bootstrap-server 192.168.51.200:9092,192.168.51.190:9092 describe --status
ClusterId:              wWbd7bqkQ-KJHVLmDLk4mA
LeaderId:               1
LeaderEpoch:            62
HighWatermark:          87
MaxFollowerLag:         0
MaxFollowerLagTimeMs:   0
CurrentVoters:          [1,2]
CurrentObservers:       []
```


### create topic and test
create
```python
./bin/kafka-topics.sh --create --bootstrap-server 192.168.51.200:9092 --replication-factor 2 --partitions 2 --topic test

Created topic test.
```

check
```python
./bin/kafka-topics.sh --bootstrap-server 192.168.51.200:9092 --describe --topic test

Topic: test	TopicId: 1U3HbrWLTHyhD04VsMUh_Q	PartitionCount: 2	ReplicationFactor: 2	Configs: segment.bytes=1073741824
	Topic: test	Partition: 0	Leader: 1	Replicas: 1,2	Isr: 1,2
	Topic: test	Partition: 1	Leader: 2	Replicas: 2,1	Isr: 2,1
```

producer cli (broker1)
```python
./bin/kafka-console-producer.sh --bootstrap-server 192.168.51.200:9092 --topic test
hello from node1
```

consumer cli (broker2)
```python
./bin/kafka-console-consumer.sh --bootstrap-server 192.168.51.190:9092 --topic test
hello from node1
```