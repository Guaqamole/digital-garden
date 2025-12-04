---
title: Kafka on docker
date: 2025-01-17
draft: false
tags:
  - Kafka
complete: true
---
# Setup
https://docs.confluent.io/platform/current/get-started/platform-quickstart.html#ce-docker-quickstart

https://developer.confluent.io/tutorials/

- broker
- schema-registry
- connect
- control-center
- ksqldb
	- server
	- cli
	- datagen
- rest-proxy



## Yaml
```python
wget https://raw.githubusercontent.com/confluentinc/cp-all-in-one/7.5.0-post/cp-all-in-one-kraft/docker-compose.yml

docker-compose up -d # 끝나면 localhost:9021 접속
```

### Broker
- 역할: Kafka 브로커이자 컨트롤러입니다.
- 특징: Zookeeper 없이 KRaft 모드(KAFKA_PROCESS_ROLES: 'broker,controller')로 설정되어 있어, 자체적으로 메타데이터를 관리합니다.
- 포트
	- 9092: 호스트(외부)에서 접근 가능한 포트.
	- 29092: 도커 네트워크 내부 통신용 포트.
	- 9101: JMX 메트릭 포트.
```yml
version: '2'
services:

  broker:
    image: confluentinc/cp-server:7.5.0
    hostname: broker
    container_name: broker
    ports:
      - "9092:9092"
      - "9101:9101"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: 'CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT'
      KAFKA_ADVERTISED_LISTENERS: 'PLAINTEXT://broker:29092,PLAINTEXT_HOST://localhost:9092'
      KAFKA_METRIC_REPORTERS: io.confluent.metrics.reporter.ConfluentMetricsReporter
      KAFKA_CONFLUENT_METRICS_REPORTER_BOOTSTRAP_SERVERS: 'broker:9092'
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_JMX_PORT: 9101
      KAFKA_JMX_HOSTNAME: localhost
      KAFKA_PROCESS_ROLES: 'broker,controller'
      KAFKA_CONTROLLER_QUORUM_VOTERS: '1@broker:29093'
      KAFKA_LISTENERS: 'PLAINTEXT://broker:29092,CONTROLLER://broker:29093,PLAINTEXT_HOST://0.0.0.0:9092'
      KAFKA_INTER_BROKER_LISTENER_NAME: 'PLAINTEXT'
      KAFKA_CONTROLLER_LISTENER_NAMES: 'CONTROLLER'
      KAFKA_LOG_DIRS: '/tmp/kraft-combined-logs'
      # Replace CLUSTER_ID with a unique base64 UUID using "bin/kafka-storage.sh random-uuid" 
      # See https://docs.confluent.io/kafka/operations-tools/kafka-tools.html#kafka-storage-sh
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
```


### schema-registry
역할: Kafka 메시지의 스키마(Avro 등)를 저장하고 관리하는 저장소입니다.
포트: 8081
연동: broker와 통신하여 스키마 유효성을 검증합니다.
```yml
  schema-registry:
    image: confluentinc/cp-schema-registry:7.5.0
    hostname: schema-registry
    container_name: schema-registry
    depends_on:
      - broker
    ports:
      - "8081:8081"
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: 'broker:29092'
      SCHEMA_REGISTRY_LISTENERS: http://0.0.0.0:8081
```


### connect
역할: Kafka Connect 서비스로, 외부 시스템과 Kafka 간의 데이터 이동을 담당합니다.
특징: datagen이 포함된 이미지를 사용하여 테스트 데이터를 생성할 수 있는 커넥터가 포함된 것으로 보입니다.
포트: 8083
```yml
  connect:
    image: cnfldemos/cp-server-connect-datagen:0.6.2-7.5.0
    hostname: connect
    container_name: connect
    depends_on:
      - broker
      - schema-registry
    ports:
      - "8083:8083"
    environment:
      CONNECT_BOOTSTRAP_SERVERS: 'broker:29092'
      CONNECT_REST_ADVERTISED_HOST_NAME: connect
      CONNECT_GROUP_ID: compose-connect-group
      CONNECT_CONFIG_STORAGE_TOPIC: docker-connect-configs
      CONNECT_CONFIG_STORAGE_REPLICATION_FACTOR: 1
      CONNECT_OFFSET_FLUSH_INTERVAL_MS: 10000
      CONNECT_OFFSET_STORAGE_TOPIC: docker-connect-offsets
      CONNECT_OFFSET_STORAGE_REPLICATION_FACTOR: 1
      CONNECT_STATUS_STORAGE_TOPIC: docker-connect-status
      CONNECT_STATUS_STORAGE_REPLICATION_FACTOR: 1
      CONNECT_KEY_CONVERTER: org.apache.kafka.connect.storage.StringConverter
      CONNECT_VALUE_CONVERTER: io.confluent.connect.avro.AvroConverter
      CONNECT_VALUE_CONVERTER_SCHEMA_REGISTRY_URL: http://schema-registry:8081
      # CLASSPATH required due to CC-2422
      CLASSPATH: /usr/share/java/monitoring-interceptors/monitoring-interceptors-7.5.0.jar
      CONNECT_PRODUCER_INTERCEPTOR_CLASSES: "io.confluent.monitoring.clients.interceptor.MonitoringProducerInterceptor"
      CONNECT_CONSUMER_INTERCEPTOR_CLASSES: "io.confluent.monitoring.clients.interceptor.MonitoringConsumerInterceptor"
      CONNECT_PLUGIN_PATH: "/usr/share/java,/usr/share/confluent-hub-components"
      CONNECT_LOG4J_LOGGERS: org.apache.zookeeper=ERROR,org.I0Itec.zkclient=ERROR,org.reflections=ERROR
```

### control-center (webui)
역할: Kafka 클러스터를 모니터링하고 관리하기 위한 웹 기반 UI 대시보드입니다.
기능: 브로커 상태, 토픽, 커넥터, ksqlDB 쿼리 등을 시각적으로 관리할 수 있습니다.
포트: 9021 (브라우저에서 http://localhost:9021로 접속 가능)
```yml
  control-center:
    image: confluentinc/cp-enterprise-control-center:7.5.0
    hostname: control-center
    container_name: control-center
    depends_on:
      - broker
      - schema-registry
      - connect
      - ksqldb-server
    ports:
      - "9021:9021"
    environment:
      CONTROL_CENTER_BOOTSTRAP_SERVERS: 'broker:29092'
      CONTROL_CENTER_CONNECT_CONNECT-DEFAULT_CLUSTER: 'connect:8083'
      CONTROL_CENTER_CONNECT_HEALTHCHECK_ENDPOINT: '/connectors'
      CONTROL_CENTER_KSQL_KSQLDB1_URL: "http://ksqldb-server:8088"
      CONTROL_CENTER_KSQL_KSQLDB1_ADVERTISED_URL: "http://localhost:8088"
      CONTROL_CENTER_SCHEMA_REGISTRY_URL: "http://schema-registry:8081"
      CONTROL_CENTER_REPLICATION_FACTOR: 1
      CONTROL_CENTER_INTERNAL_TOPICS_PARTITIONS: 1
      CONTROL_CENTER_MONITORING_INTERCEPTOR_TOPIC_PARTITIONS: 1
      CONFLUENT_METRICS_TOPIC_REPLICATION: 1
      PORT: 9021
```


### ksqldb
ksqldb-server (confluentinc/cp-ksqldb-server)
- 역할: Kafka Streams를 기반으로 SQL 쿼리를 통해 실시간 스트림 처리를 수행하는 서버입니다.
- 포트: 8088

ksqldb-cli (confluentinc/cp-ksqldb-cli)
- 역할: ksqlDB 서버에 접속하여 SQL 명령을 실행할 수 있는 커맨드 라인 인터페이스 도구입니다.

ksql-datagen (confluentinc/ksqldb-examples)
- 역할: ksqlDB 예제 데이터를 생성하거나 특정 시나리오를 시뮬레이션하기 위한 보조 컨테이너입니다.
```yml
  ksqldb-server:
    image: confluentinc/cp-ksqldb-server:7.5.0
    hostname: ksqldb-server
    container_name: ksqldb-server
    depends_on:
      - broker
      - connect
    ports:
      - "8088:8088"
    environment:
      KSQL_CONFIG_DIR: "/etc/ksql"
      KSQL_BOOTSTRAP_SERVERS: "broker:29092"
      KSQL_HOST_NAME: ksqldb-server
      KSQL_LISTENERS: "http://0.0.0.0:8088"
      KSQL_CACHE_MAX_BYTES_BUFFERING: 0
      KSQL_KSQL_SCHEMA_REGISTRY_URL: "http://schema-registry:8081"
      KSQL_PRODUCER_INTERCEPTOR_CLASSES: "io.confluent.monitoring.clients.interceptor.MonitoringProducerInterceptor"
      KSQL_CONSUMER_INTERCEPTOR_CLASSES: "io.confluent.monitoring.clients.interceptor.MonitoringConsumerInterceptor"
      KSQL_KSQL_CONNECT_URL: "http://connect:8083"
      KSQL_KSQL_LOGGING_PROCESSING_TOPIC_REPLICATION_FACTOR: 1
      KSQL_KSQL_LOGGING_PROCESSING_TOPIC_AUTO_CREATE: 'true'
      KSQL_KSQL_LOGGING_PROCESSING_STREAM_AUTO_CREATE: 'true'

  ksqldb-cli:
    image: confluentinc/cp-ksqldb-cli:7.5.0
    container_name: ksqldb-cli
    depends_on:
      - broker
      - connect
      - ksqldb-server
    entrypoint: /bin/sh
    tty: true

  ksql-datagen:
    image: confluentinc/ksqldb-examples:7.5.0
    hostname: ksql-datagen
    container_name: ksql-datagen
    depends_on:
      - ksqldb-server
      - broker
      - schema-registry
      - connect
    command: "bash -c 'echo Waiting for Kafka to be ready... && \
                       cub kafka-ready -b broker:29092 1 40 && \
                       echo Waiting for Confluent Schema Registry to be ready... && \
                       cub sr-ready schema-registry 8081 40 && \
                       echo Waiting a few seconds for topic creation to finish... && \
                       sleep 11 && \
                       tail -f /dev/null'"
    environment:
      KSQL_CONFIG_DIR: "/etc/ksql"
      STREAMS_BOOTSTRAP_SERVERS: broker:29092
      STREAMS_SCHEMA_REGISTRY_HOST: schema-registry
      STREAMS_SCHEMA_REGISTRY_PORT: 8081
```

### rest-proxy
역할: HTTP REST API를 통해 Kafka 클러스터에 메시지를 보내거나 읽을 수 있게 해주는 프록시 서버입니다.
포트: 8082
```yml
  rest-proxy:
    image: confluentinc/cp-kafka-rest:7.5.0
    depends_on:
      - broker
      - schema-registry
    ports:
      - 8082:8082
    hostname: rest-proxy
    container_name: rest-proxy
    environment:
      KAFKA_REST_HOST_NAME: rest-proxy
      KAFKA_REST_BOOTSTRAP_SERVERS: 'broker:29092'
      KAFKA_REST_LISTENERS: "http://0.0.0.0:8082"
      KAFKA_REST_SCHEMA_REGISTRY_URL: 'http://schema-registry:8081'
```


# Hands-on

## Topic
- name: test
- partitions: 3
- retention.ms: 604800000
- max.message.bytes: 1048588
- retention.bytes: -1

## Producer
https://developer.confluent.io/get-started/python/

```python
pip install confluent-kafka
```

```python
import json
from confluent_kafka import Producer
 
producer = Producer({'bootstrap.servers': 'localhost:9092'})

topic_name = "test"
message = {
  "userid": 2,
  "gender": "FEMALE",
  "username": "김옥순"
}
 
producer.produce(topic=topic_name, value=json.dumps(message))
producer.flush() # 토픽에 메시지가 들어갈 때까지 대기
print("DONE.")
```

**offset에 -1 옵션을 꼭주자**
![](https://i.imgur.com/R5mUdb5.png)


## Consumer
- **auto.offset.reset**: 새로운 컨슈머 그룹의 offset을 읽는 방식의 옵션

polling 방식
```python
from confluent_kafka import Consumer
import json
 
consumer = Consumer({'bootstrap.servers': 'localhost:9092', 'group.id': 'test_group_id'})
 
topics = ["test"]
consumer.subscribe(topics)
 
timeout = -1 # -1 은 무한 대기, 메시지가 생성될 때까지 대기
print("consuming...")
message = consumer.poll(timeout=-1) # message 객체는 key, value, offset 등 다양한 정보를 가지고 있슴
 
print("key: ", message.key())
print("value: ", json.loads(message.value()))
print("offset: ", message.offset())
print("partition: ", message.partition())
 
# consumer.close()
```

모든 partition의 특정 offset부터 **무한으로** 읽기
```python
from confluent_kafka import Consumer, TopicPartition
import json

# Kafka configuration
consumer = Consumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'test_group_id',
    'auto.offset.reset': 'earliest'  # To fetch messages from the earliest offset if no committed offset exists
})

topics = ["test"]
consumer.subscribe(topics)

# Assign specific offsets for each partition
def assign_partitions_with_offsets(consumer, topics, offset):
    metadata = consumer.list_topics(timeout=10)
    partitions = []
    
    for topic in topics:
        if topic in metadata.topics:
            for partition in metadata.topics[topic].partitions:
                # Assign a specific offset for each partition
                partitions.append(TopicPartition(topic=topic, partition=partition, offset=offset))
        else:
            print(f"Topic {topic} not found in metadata!")
            return
    
    consumer.assign(partitions)

# Assign the offset for the topic
assign_partitions_with_offsets(consumer, topics, 1)

print("Consuming messages from offset 1...")
try:
    while True:
        message = consumer.poll(timeout=-1)  # Wait indefinitely for messages
        if message is None:
            continue
        if message.error():
            print(f"Error: {message.error()}")
            continue
        
        print("Key: ", message.key())
        print("Value: ", json.loads(message.value()))
        print("Offset: ", message.offset())
        print("Partition: ", message.partition())
        print("---------------------------------")
except KeyboardInterrupt:
    print("Stopping consumer...")
finally:
    consumer.close()

```

특정 파티션만 오프셋에서 메시지 읽기
```python
from confluent_kafka import Consumer, TopicPartition
import json

# Kafka 설정
consumer = Consumer({
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'test_group_id',
    'auto.offset.reset': 'earliest'  # 메시지가 없을 경우의 기본 동작: 'earliest'는 가장 처음부터 읽음
})

topic = "test"
partition = 2  # 읽고자 하는 파티션 번호
start_offset = 1  # 시작 오프셋

# 특정 파티션과 오프셋 할당
def assign_specific_partition(consumer, topic, partition, offset):
    tp = TopicPartition(topic=topic, partition=partition, offset=offset)
    consumer.assign([tp])  # 하나의 파티션만 할당

# 파티션과 오프셋 지정
assign_specific_partition(consumer, topic, partition, start_offset)

print(f"Consuming messages from topic '{topic}', partition {partition}, starting at offset {start_offset}...")
try:
    while True:
        message = consumer.poll(timeout=-1)  # 메시지가 생성될 때까지 대기
        if message is None:
            continue
        if message.error():
            print(f"Error: {message.error()}")
            continue
        
        print("Key: ", message.key())
        print("Value: ", json.loads(message.value()))
        print("Offset: ", message.offset())
        print("Partition: ", message.partition())
        print("---------------------------------")
except KeyboardInterrupt:
    print("Stopping consumer...")
finally:
    consumer.close()

```