---
title: DataStreamAPI Overview
date: 2024-12-19
draft: false
tags:
  - Flink
  - DataEngineering
complete: true
---
## DataStream API Programming Guide
Flink의 DataStream 프로그램은 데이터 스트림에 대한 변환(예: 필터링, 상태 업데이트, 창 정의, 집계)을 구현하는 일반 프로그램입니다. 데이터 스트림은 처음에 다양한 소스(예: 메시지 큐, 소켓 스트림, 파일)에서 생성됩니다. 결과는 싱크를 통해 반환되며, 싱크는 예를 들어 데이터를 파일이나 표준 출력(예: 명령줄 터미널)에 쓸 수 있습니다. Flink 프로그램은 다양한 컨텍스트에서 독립 실행형으로 실행되거나 다른 프로그램에 내장되어 실행됩니다. 실행은 로컬 JVM에서 또는 여러 머신의 클러스터에서 발생할 수 있습니다.

### What is DataStream
DataStream API는 Flink 프로그램에서 데이터 컬렉션을 나타내는 데 사용되는 특수 `DataStream`클래스에서 이름을 따왔습니다. 중복을 포함할 수 있는 불변 데이터 컬렉션이라고 생각할 수 있습니다. 이 데이터는 `bounded`하거나 `unbounded`할 수 있으며, 이를 처리하는 데 사용하는 API는 동일합니다.

A는 사용 측면에서 `DataStream`일반 Java와 유사 `Collection`하지만 몇 가지 핵심적인 면에서 상당히 다릅니다. 이들은 불변이므로 일단 생성되면 요소를 추가하거나 제거할 수 없습니다. 또한 내부의 요소를 검사할 수 있을 뿐만 아니라 `DataStream`API 작업(변환이라고도 함)을 사용하여 작업할 수 있습니다.

`DataStream`Flink 프로그램에서 소스를 추가하여 초기값을 만들 수 있습니다 . 그런 다음 `map`여기 에서 새 스트림을 파생시키고 , `filter`등의 API 메서드를 사용하여 결합할 수 있습니다.


## Anatomy of Flink Program
Flink programs look like regular programs that transform `DataStreams`. Each program consists of the same basic parts:
1. Obtain an `execution environment`,
2. Load/create the initial data,
3. Specify transformations on this data,
4. Specify where to put the results of your computations,
5. Trigger the program execution

### Execution Environment
- IDE 내부에서 프로그램을 실행하거나 일반 Java 프로그램으로 실행하는 경우 로컬 머신에서 프로그램을 실행하는 로컬 환경을 만듬
- 프로그램에서 JAR 파일을 만들고 [명령줄을](https://nightlies.apache.org/flink/flink-docs-master/docs/deployment/cli/) 통해 호출하는 경우 Flink 클러스터 관리자가 main 메서드를 실행하고 `getExecutionEnvironment()`클러스터에서 프로그램을 실행하기 위한 실행 환경을 반환

### DataSource
- 데이터 소스를 지정하기 위해 실행 환경에는 다양한 방법을 사용하여 파일에서 읽는 여러 가지 방법이 있음
	- CSV 파일로 줄별로 읽거나
	- 제공된 다른 소스를 사용하여 읽을 수 있음
```java
final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStream<String> text = env.readTextFile("file:///path/to/file");
```

### Transformation
- 새로운 파생 DataStream을 생성할 수 있는 DataStream이 제공됨
```java
DataStream<String> input = ...;

DataStream<Integer> parsed = input.map(new MapFunction<String, Integer>() {
    @Override
    public Integer map(String value) {
        return Integer.parseInt(value);
    }
});
```


### Sink
- 최종 결과를 포함하는 DataStream이 있으면 싱크를 만들어 외부 시스템에 쓸 수 있음
```java
writeAsText(String path);

print();
```


### Execute
전체 프로그램을 지정했으면 `execute()` 을 호출하여 **프로그램 실행을 트리거** 해야 합니다 . 실행 유형에 따라 로컬 머신에서 실행이 트리거되거나 클러스터에서 실행되도록 프로그램을 제출합니다.

작업이 완료될 때까지 기다리고 싶지 않다면 `executeAsync()`를 호출하여 비동기 작업 실행을 트리거할 수 있음
```java
final JobClient jobClient = env.executeAsync();

final JobExecutionResult jobExecutionResult = jobClient.getJobExecutionResult().get();
```