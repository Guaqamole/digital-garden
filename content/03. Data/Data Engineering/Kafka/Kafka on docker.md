---
title: Kafka on docker
date: 2025-01-17
draft: false
tags:
  - Kafka
complete: true
---
## Setup
```python
wget https://raw.githubusercontent.com/confluentinc/cp-all-in-one/7.5.0-post/cp-all-in-one-kraft/docker-compose.yml

docker-compose up -d # 끝나면 localhost:9021 접속
```

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