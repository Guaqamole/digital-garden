---
title: Stream, Batch, Mini-batch
date: 2024-10-28
draft: false
tags: 
complete: true
---
![|750](https://i.imgur.com/2zq31UX.png)

![|950](https://i.imgur.com/1HdNgiS.png)
## Data transfer
![|775](https://i.imgur.com/nFxyG2y.png)

- Bulk: 벌크형은 이미 어딘가에 존재하는 데이터를 정리해 추출하는 방법으로, 데이터 베이스와 파일 서버등에서 정기적 으로 데이터를 수집하는데에 사용한다.
- Streaming: 차례 차례로 생성되는 데이터를 끊임없이계속해서보내는 방법으로모바일애플 리케이션과임베디드장비등에서널리데이터를수집하는데사용

## Batch Processing
In batch processing, we wait for a certain amount of raw data to “pile up” before running an ETL job. Typically this means data is **between an hour to a few days** old before it is made available for analysis. Batch ETL jobs will typically be run on a set schedule (e.g. every 24 hours), or in some cases once the amount of data reaches a certain threshold.

![|925](https://i.imgur.com/aNKruqP.png)
### When to use it?
- Data freshness is not a mission-critical issue
- You are working with large datasets and are running a complex algorithm that requires access to the entire batch – for instance, sorting the entire dataset
- You get access to the data in batches rather than in streams
- When you are joining tables in relational databases


## Stream Processing
In stream processing, we process data as soon as it arrives in the storage layer – which would often also be very close to the time it was generated (although this would not always be the case). This would typically be in sub-second timeframes, so that for the end user the processing happens in real-time. **These operations would typically not be stateful**, or would only be able to store a ‘small’ state, so would usually involve a relatively simple transformation or calculation.

'이벤트 스트림 프로세싱(Event Stream Processing, 이하 ESP)' 라고도 불리며, '스트림 프로세싱'과 동일한 의미로 사용됩니다. 스트리밍 데이터는 복수의 데이터 소스(Data Source)로부터 연속적으로 생성되는 데이터 레코드로 대부분 KB 단위 크기입니다. 스트림 프로세싱은 스트리밍 데이터가 레코드나 정의된 단위에 따라 순차적으로 처리되는 것을 의미합니다. 이때 처리 과정은 단순 수집에서부터 합계·평균 계산과 같은 집계, 패턴에 기반한 예측 분석 및 데이터 형식을 변환하거나 다른 데이터 소스와 결합 등을 수반합니다.

![|800](https://i.imgur.com/6G0cO6g.png)

스트림 프로세싱은 구현하는 방법에 따라 [표 4]와 같이 네이티브 스트림(Native Stream)과 소규모 일괄처리(Micro Batch) 형태로 구분할 수 있습니다. 네이티브 스트림은 지속적으로 유입되는 새로운 데이터(Unbounded Data)를 처리하기 위해 별도의 프로세서를 두기 때문에 상태 관리가 용이합니다. 이 프로세서는 프레임워크에 따라 오퍼레이터(Operator), 태스크(Task) 등으로 불리며 데이터의 가공 처리를 수행할 수 있습니다. 소규모 일괄처리는 일반적인 일괄처리와 비교하여 작업 수행주기의 기간임계치가 짧습니다. 네이티브 스트림과 비교하면 상태 관리가 어렵지만 내결함성 면에서 이점이 있습니다.

| 구현 방식    | 특성                                             | 대표 제품                                       |
| -------- | ---------------------------------------------- | ------------------------------------------- |
| 네이티브 스트림 | • 지연시간 최소  <br>• 이벤트 처리 보장 방식에 따라 내결함성 유지가 어려움 | • 플링크(Flink)  <br>• 카프카 스트림즈(Kafka Streams) |
| 소규모 일괄처리 | • 네이티브 스트림 대비 지연시간 발생                          | • 스파크(Spark)                                |
|          |                                                |                                             |

### When to use it?
- Data is being generated in a continuous stream and arriving at high velocity
- Sub-second latency is crucial

### Example.
예를들어,과 거3 0분간취합한데이터를집계하여그래프를만들려면, 시계열데 이터 베이스(time-seriesdatabase) 와같은실시간처리를지향한데이터베이스가자주사용된다.스트림처리의결과를시계열데이터베이스에저장함으로써,지금무슨 일이일어나고있는지즉시알수있다.

한편스트림처리는장기적인데이터분석에는적합하지않은문제가있다. 예를들어, 지난 1년간의 데이터를 분석하려 고하면 데이터양은 단번에 수천 배 혹은 수만 배로 증가한다. 실시간데이터처리와장기적인데이터분석결과를하나의시스템으로실현 하 는 것 은 불 가 능 하 지 는 않 지 만 그렇 게 쉬 운 일 만 은 아 니다 .

이와 같은 스트림 프로세싱의 특성은 이벤트 처리 보장, 내결함성(Fault Tolerance) 및 상태 관리 등을 통하여 지원됩니다. 이벤트 처리 보장은 분산 데이터 파이프라인에서 데이터를 전달하는 방법으로써 아래와 같이 At-least-once, At-most-once, Exactly-once의 3가지로 나눌 수 있습니다. Exactly-once가 가장 신뢰할 수 있는 방법이지만, 성능 부하로 인한 비용을 고려하여 적절한 방법을 선택해야 합니다.  
  
|방법|설명|
|---|---|
|At-least-once|• 최소 한 번의 전달 보장  <br>• 데이터 전송 후 전달 완료가 확인되지 않아 타임아웃되면 재전송  <br>• 데이터가 중복으로 수신되어도 무방한 경우에 사용|
|At-most-once|• 한 번의 전송만 수행  <br>• 지연이나 유실이 발생해도 데이터를 재전송하지 않음  <br>• 데이터를 수신하지 않아도 무방한 경우에 사용|
|Exactly-once|• 정확하게 한 번의 전달만 보장|


내결함성은 장애가 발생하면 복구하여 처리 시점부터 재개할 수 있는 기능입니다. 일례로 플링크의 경우 이벤트 스트림이 메모리에 적재되기 때문에 시스템이 갑작스럽게 중단되면 처리 중이던 데이터의 복구가 어려울 수 있습니다. 이를 방지하기 위하여 세이브 포인트(Save Point) 기능으로 현재 메모리에 적재된 내용의 스냅샷을 영구 저장소에 백업하는 기능을 지원합니다.


## Micro Batch
Micro-batch processing is a method of efficiently processing large datasets with **reduced latency and improved scalability**. It breaks up large datasets into smaller batches and runs them in parallel, resulting in more timely and accurate processing.

In micro-batch processing, we run batch processes on much smaller accumulations of data – typically less than a minute’s worth of data. This means data is available in near real-time. In practice, there is little difference between micro-batching and stream processing, and the terms would often be used interchangeably in data architecture descriptions and software platform descriptions.

- **Apache Spark Streaming** the most popular open-source framework for micro-batch processing.
### When to use it?
- web analytics (clickstream) or user behavior
- while a day’s delay is definitely too long in this case, a minute’s delay should not be an issue – making micro-batch processing a good choice.