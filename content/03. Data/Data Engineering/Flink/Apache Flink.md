---
title: Apache Flink
date: 2024-10-28
draft: false
tags:
  - Flink
  - DataEngineering
complete: true
---
## Overview
> [!info] Apache Flink (https://flink.apache.org/)
> Apache Flink is a framework and distributed processing engine for stateful computations over unbounded and bounded data streams. Flink has been designed to run in all common cluster environments, perform computations at in-memory speed and at any scale.

플링크(Flink)는 독일어로 민첩함을 뜻하는 단어로 베를린 TU대학교에서 시작된 아파치 프로젝트입니다. Streaming model이 batch가 아닌 Exactly-once의 이벤트 처리를 보장하는 **네이티브 스트림** 방식으로, **지연 발생이 적고 처리량은 높으며** 비교적 사용하기 쉬운 이점이 있습니다. 일괄처리 기능도 제공하지만 스트림 프로세싱을 목적으로 주로 사용됩니다. 

우버는 초기에 스톰을 이용하였지만 고급 기능에 대한 요구가 커짐에 따라 자사 플랫폼에 플링크를 적용했습니다. 알리바바는 데이터가 폭발적으로 증가하면서 일괄처리와 스트림 프로세싱이 모두 필요하였고 그 해답으로 스트림 프로세싱을 기반으로 일괄처리까지 가능한 플링크를 채택했습니다.  
  
스트림 프로세싱의 기존 선두주자는 스파크를 꼽을 수 있습니다. 스파크는 플링크보다 높은 프로젝트 성숙도와 점유율을 보여왔습니다. 하지만 플링크는 스파크 다음 세대의 빅데이터 분석 프레임워크로서 짧은 지연시간 내에 스트림 데이터를 처리하면서도 강력한 상태 관리가 필요한 경우에 최적의 선택이 될 수 있습니다. 플링크의 네이티브 스트림과 스파크의 소규모 일괄처리로 인해 발생하는 지연시간은 데이터가 적은 환경에서는 그 차이가 미미할 수 있지만 하루에 1조 개 이상의 데이터가 생성되는 환경이라면 결코 무시할 수 없을 것이기 때문입니다.

### Features
플링크가 다른 프레임워크와 차별화되는 주요 특징은 다음과 같습니다.
- **네이티브 스트림(Native Stream)**: 플링크는 일괄처리도 지원하지만 스트림 프로세싱을 주목적으로 사용합니다. 경량의 분산 스냅샷을 구현하여 오버헤드는 낮으면서도 Exactly-once의 이벤트 처리를 보장할 수 있습니다.  
- **인메모리(In-Memory)**: 자바 애플리케이션으로 JVM(Java Virtual Machine)에서 실행되지만 JVM GC(Garbage Collector)에 전적으로 의존하지 않습니다. 대신 커스텀 메모리 매니저를 구현하여 안정적인 메모리 사용량을 유지하면서 성능 향상을 꾀하고 있습니다.  
- **낮은 지연과 높은 처리량(Throughput)**: 경쟁 제품에 비하여 지연과 처리량에서 우수한 성능을 보입니다. 플링크는 데이터를 처리하는 과정에서 변경된 부분만 재처리하도록 설정하여 처리 속도를 더 높일 수도 있습니다.  
- **손쉬운 설정과 사용 그리고 강력한 부가 기능**: 스파크는 파라미터 설정이 복잡하지만 플링크는 별다른 설정 없이 사용할 수 있습니다. 입력되는 이벤트 스트림에 개별로 접근할 수 있고, 강력한 윈도우 연산자를 사용하여 분석을 수행할 수 있습니다. 

![](https://i.imgur.com/E1O5GOy.png)

위와 같이 고급 분석용 API부터 상세한 제어가 가능해지는 상태 저장 이벤트 기반 애플리케이션 수준까지 계층에 따른 API를 제공합니다.


## Architecture
### Flink 추상화 레벨
![](https://i.imgur.com/jtsxjji.png)

- Stateful Stream Processing : 사용자가 직접 state, time 등을 관리할 수 있는 low-level 이 위치합니다.
- DataStream / DataSet API : 핵심적으로 가장 많이 사용하는 Core API 가 위치합니다.
- Table API : Library로 제공되는 Table API가 제공됩니다.
- SQL : select, join, aggregate 등의 고차원 함수를 사용할 수 있으며 이러한 SQL를 사용할 수 있는 High-level Language를 지원합니다.

### Flink 아키텍처
![](https://i.imgur.com/Cz1wRP4.png)

#### client
- 배치 또는 스트리밍 애플리케이션을 dataflow 그래프로 컴파일한 다음 JobManager에 제출
#### Job manager
- Task 스케줄링, 체크포인트 관리, 리커버리 담당
- 리소스 매니저: 리소스 할당/해제 및 프로비저닝 담당
- 디스패처: Flink 응용프로그램 제출 및 Flink webui 제공
- 잡마스터: 단일 JobGraph을 실행 관리함
#### JobGraph
- Flink application으로 개발된 코드는 연산자와 입출력 관계가 정의된 방향성 그래프로 변환  
    되어 실행됨
#### Task Manager
![|600](https://i.imgur.com/D8coAz3.png)

- Task의 실행을 담당하는 컴포넌트.
- 1개의 JVM Process로써 동작
- 최소 1개 이상의 Task Slot 존재(보통 CPU Core 갯수로 지정됨)
- JVM 메모리 공유: 하나의 TaskManager에 속한 Task Slot들은 TaskManager의 메모리를 나누어 사용
- CPU Isolation 불가: Slot들은 JVM Thread로써 동작하기 때문에 CPU Isolation은 이룰 수 없음
- 자원 공유: 하나의 TaskManager에 속한 Slot들은 자원을 공유


#### Task
![|725](https://i.imgur.com/OXcx9DI.png)
- 1개의 Task는 1개 이상의 Subtask로 나뉠 수 있음.
- Task Slot에서 실행하는 작업의 단위는 사실 Task가 아닌 Subtask 단위
- Operator들을 Chaining하여 Task로 만들 수 있음
- 각 Task는 하나의 Thread에서 동작
- Deploy Mode

### Flink 동작
![](https://i.imgur.com/u896ujn.png)

플링크에서 데이터는 소스(Source)로 시작해 싱크(Sink)로 끝납니다. 데이터가 입력되어 처리가 완료되기까지 각 단계는 스트림으로 이동하고 오퍼레이터에 의하여 데이터가 처리됩니다. 소스는 데이터 입력을 정의하는 단계로 원천시스템의 로그, 클릭 이벤트, IoT 장치 등에서 발생하는 데이터를 실시간 이벤트 스트림이나 데이터베이스, 파일, 키-밸류 스토어(Key-Value Store) 따위의 매체로부터 수신합니다.

트랜스포메이션(Transformation)은 데이터를 가공하는 작업입니다. 스트림 내의 특정 값에 가중치를 주거나 분석하여 새로운 스트림을 형성할 수도 있고 특정 키(Key) 값 기반 스트림을 처리할 수도 있습니다. 스트림 처리 시스템의 기본 개념인 윈도우(Window) 관련 기능도 제공합니다. 윈도우는 아래와 같이 제한이 없는(Unbounded) 데이터 흐름에서 집계 및 가공 처리 수행을 위해 유한한(Bounded) 단위로 구분하는 개념입니다.

![](https://i.imgur.com/WrQHCvH.png)

플링크는 윈도우 할당 방식으로 텀블링(Tumbling)·슬라이딩(Sliding)·세션(Session)·글로벌(Global) 윈도우를 지원합니다. 각 방식을 간략하게 살펴보면 아래와 같습니다.

| 윈도우      | 설명                                                                            |
| -------- | ----------------------------------------------------------------------------- |
| Tumbling | • 고정된 단위시간에 따라 윈도우를 나누어 데이터 중복 없음  <br>• 지정된 기간을 윈도우 크기로 하여 각 윈도우 안의 데이터 처리   |
| Sliding  | • Tumbling의 윈도우 크기에 slide 기간만큼 + or - 중복 허용  <br>• 특정기간 내의 평균값 처리 등을 목적으로 할 때 |
| Session  | • 윈도우의 크기가 일정하지 않음  <br>• 임계치 이상의 session gap 간격을 갖는 경우 다른 윈도우로 구분            |
| Global   | • 하나의 동일한 키 단위나 윈도우로 모든 데이터 처리                                                |

마지막으로 싱크는 처리한 스트림을 출력·저장하는 단계입니다. 플링크는 계산의 결과 값이 필요할 때까지 계산을 늦추어 불필요한 연산을 피하는 느긋한 계산법(Lazy Evaluation) 방식을 채택하고 있습니다. 따라서 싱크 단계를 수행함에 따라 처리 결과를 소비할 애플리케이션, 이벤트 로그 또는 데이터베이스 등으로 출력하게 됩니다. 플링크는 위와 같은 데이터 흐름 중에 체크포인트(Checkpoint)를 설정해 내결함성을 높이고 Exactly-once를 보장합니다. 아울러 이벤트가 발생한 시간(Event Time)과 처리된 시간(Processing Time)을 구분하고 워터마크를 활용하여 지연 데이터를 처리함으로써 신뢰성과 고성능을 지원하고 있습니다.


## Key Features
### 1. Stateful Stream Processing
이벤트를 각각 독립적으로 처리하면 state가 필요 없음 → stateless 예) 현재 인입된 데이터에 특정 숫자를 연산여러 이벤트를 한꺼번에 보려고 하면 state가 필요하며 flink는 state 제공하고 관리하는 Stateful Streaming 솔루션입니다. 예) 패턴 찾기, 시간별로 집계, 과거 데이터 조회 등checkpoint와 savepoint를 통해 내결함성을 갖 도록 설계되어 있음

![|700](https://i.imgur.com/HqUJnzf.png)
- checkpoint (설정을 통해 Flink에서 자동으로 관리)
- 스트림 중간에 checkpoint를 끼워 넣어서 만약 실패가 발생하는 경우 마지막 저장된 checkpoint부터 다시 처리하는 방식
- savepoint는 사용자가 직접 코드로 관리

State Backend
- 상태 저장 방식
- MemoryStateBackend : JobManager의 Heap Memory에 저장
- RocksDBStateBackend: Flink에서 제공하는 RocksDB에 저장
checkpoint를 얼마나 자주 저장하냐에 따라 Trade off 존재


### Timely Stream Processing
![|550](https://i.imgur.com/2j9TicP.png)
Flink에서의 Time 종류
- Event Time: 이벤트가 생성된 곳에서 만들어진 시간(데이터에 포함되어 있는 시간)
- Processing Time: 데이터를 처리하는 시스템의 시간

Processing Time의 장/단점
- 장점: window 분석 시 시스템 처리 시간 기준이기 때문에 빠른 성능과 Low Latency 보장
- 단점: 분산되고 비동기적인 환경에서는 정확한 통계데이터 추출 불가

– 정상(윈도우 사이즈 10, 5초마다 슬라이딩, 인입 건수 측정)
![|750](https://i.imgur.com/ZY0oCp3.png)


지연 (14초에 도달해야 할 데이터가 지연되어 19초에 도달했다면…)
![|700](https://i.imgur.com/ZuwSseM.png)


Event time을 사용하는 경우
![|725](https://i.imgur.com/8iMasAG.png)

Event time Watermark 기능
- 이벤트 시간의 진행상황을 측정하는 Flink 매커니즘
- 워터마크 지연처리 기능을 통해 일정 시간 지연된 데이터를 처리할 수 있음

