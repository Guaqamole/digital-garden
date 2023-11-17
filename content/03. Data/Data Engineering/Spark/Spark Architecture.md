---
title: Spark 기본 구조
date: 2023-10-31
draft: false
tags:
  - Spark
  - Concept
complete: true
---
# 기본 구조 

![Spark: The Definitive Guide|550](https://i.imgur.com/7E4ZAOU.png)

스파크는 크게 [[Spark Application Architecture|Spark Application]], [[Spark Cluster Manger|Cluster Manager]]로 나뉘게된다. 

- Spark Application: 실제 연산과 스파크 잡을 수행하고 해당 잡에 대한 실행 계획 생성
- Cluster Manager: 스파크 어플리케이션 사이에서 노드간 자원을 분배하는 중계자

---

## Spark Application 

스파크 애플리케이션은 **드라이버 프로세스**와 다수의 **익스큐터 프로세스**로 구성

- 드라이버 프로세스는 **클러스터 노드 중 하나에서 실행**되며, main()함수 실행
  - 스파크 언어 API를 통해 다양한 언어로 실행 가능
- 익스큐터 프로세스는 스파크 코드를 실행



### A. Driver Process

> [!success]+ definition
> Spark에서 수행되는 사용자 프로그램
> - 애플리케이션 수명 주기 동안 관련 정보를 모두 유지함
> - 사용자 프로그램이나 입력에 대한 응답
> - 전반적인 익스큐터 프로세스의 작업과 관련된 분석, 배포, 스케줄링
> - **1개의 Driver Program과 N개의 Executor로 구성**

![](https://i.imgur.com/I2uK3Or.png)


***주요 역할***

#### **사용자 프로그램을 실제 수행 단위인 Task로 변환 해 Executor에 할당**
1. 연산들의 관계에 대해 논리적인 방향성 비순환 그래프(DAG, Directed Acyclic Graph)를 생성
	- 입력으로부터 RDD를 만듦
	- 트랜스포메이션을 사용하여 새로운 RDD를 받아오며
	- 데이터를 가져오거나 저장하기 위해 액션을 사용한다.

2. Driver가 실행될 때, Driver는 논리 그래프(DAG)를 물리적인 실행 계획(Physical Plan)으로 변환
	- Driver는 Map/Tranformation을 사용한 여러 최적화를 통해, 물리적인 실행 계획을 여러 단계(Stage)로 변경
	- 각 Stage는 순서에 따라 여러 개의 Task로 구성된다.

3. 단위 작업들은 묶여서 Cluster로 전송된다.
	- Task의 묶음은 Stage이며 Stage의 묶음은 Job이다.



#### **Executor에 할당 된 Task들을 적절하게 Scheduling**

1. Executor들은 시작 시 드라이버에 등록됨

2. Driver는 항상 실행중인 익스큐터를 감시
	- 각 Task가 데이터 위치에 기반해 적절한 위치에서 실행이 되도록 한다.

 

### B. Spark Session 

> [!success]+ definition
> **스파크 응용 프로그램의 통합 진입점**으로 사용자가 정의한 처리 명령을 클러스터에서 실행. 이를 통해 스파크 어플리케이션을 제어함. 아래 처럼 계층 구조로 되어있음.

![|531](https://i.imgur.com/M2UZqf9.png)

#### **Spark Context**

- spark2.x 이전에 SparkContext가 모든 Spark 애플리케이션의 진입점
- Driver Program에서 Job을 Executor에 실행하기 위한 Endpoint
- Cluster Manager와 연결된다.

**SparkContext 대신 SparkSession이 필요해진 이유**

- 다른 컨텍스트들을 모두 통합하기 위해서
- 개발자가 다른 컨텍스트들을 생성하는 것에 대한 걱정을 피하기 위해서
- 동일한 사용자가 같은 SparkContext를 사용하는 문제를 해결하기 위해서
  동일한 노트북 환경에 여러 사용자가 액세스하고 있고 동일한 SparkContext를 공유하는 격리 된 환경이 필요할때)
  Spark2.0 이전에는 사용자당 스파크 컨텍스트를 생성 -> 비용 발생(context당 jvm이 하나)

 

### C. Executor
![](https://i.imgur.com/qysRoZn.png)

- Application에서 Driver Program이 요청한 Task들의 연산을 실제로 수행하는 프로세스
- **Executor는 Spark application 실행 시 최초 한번 실행된다.**

> [!tip]
>   대개 애플리케이션이 끝날 때까지 계속 동작하지만, 익스큐터가 오류로 죽더라도 스파크 애플리케이션은 계속 실행된다.

- ## Executor는 두가지 역할을 수행:
  1. Application을 구성하는 작업들을 실행하여 Driver Program에 그 결과를 되돌려 준다.
  2. 각 Executor 안에 존재하는 Block Manager라는 서비스를 통해 사용자 프로그램에서 cache 하는 RDD를 저장하기 위한 메모리 저장소를 제공한다.
     - RDD가 Executor 내부에 직접 캐시되므로 단위 작업들 또한 같이 실행되기에 용이하다.


---

## Cluster Manager 

Cluster Manager는 여러 대의 서버로 구성된 클러스터 환경에서, 다수의 Application이 함께 구동될 수 있도록 Application(Driver와 Executor) 사이의 자원을 관리해주는 역할을 담당

- 스파크와 붙이거나 뗄 수 있는(pluggable) 컴포넌트
- Standalone, YARN, mesos, Kubernetes 등 다양한 Cluster Manager 중 선택가능

### A. Standalone

> [!success]+ definition
> Spark 에서 자체적으로 제공하는 클러스터 매니저

![](https://i.imgur.com/4JvcyAQ.png)

- **각 노드에서 하나의 익스큐터만 실행 가능**
- 한 대의 물리적인 머신 위에 3개의 Thread 프로세스가 실행된다.
- standalone 클러스터 모드는 현재 애플리케이션 전체에서 간단한 FIFO 스케줄러만 지원
- 스케줄러는 마스터를 사용해 스케줄링 결정을 내리고 이는 단일 실패 지점을 생성

**단일 장애점(single point of failure, SPOF)*: 시스템 구성 요소 중에서 동작하지 않으면 전체 시스템이 중단되는 요소

### B. Yarn

> [!success]+ definition
> 하둡의 클러스터 매니저

![](https://i.imgur.com/a5RE9p5.png)

- 작업 스케줄링과 리소스 할당 등의 자원 관리, 분산자원 관리를 담당하며 다른 애플리케이션들과 함께 돌리거나 더 우수한 자원 스케줄링이 필요한 경우에 사용
- Spark on Yarn에서 **스파크 익스큐터는 yarn container 로서 동작**

### C. Mesos

> [!success]+ definition
> CPU, 메모리 저장소 그리고 다른 연산 자원을 머신에서 추상화한 리소스 매니저

![](https://i.imgur.com/7mPJfpI.png)

- Mesos 마스터는 Spark의 클러스터의 마스터 역할을 담당하며 가용한 리소스 내에서 Spark Job을 배포
- 다른 클러스터 매니저와 달리 메소스는 동일 클러스터 내에서 자원을 공유할 수 있는 두 가지 모드를 지원하는데 그 두 가지는 아래와 같음

#### **fine-grainged ( 세밀한 모드 )**

기본으로 실행되는 모드

세밀한 모드는 다중 사용자 모드에서 셸 같은 대화형 작업들이 클러스터를 공유 시 특히 매력적인데 , 그 이유는 아무것도 하지 않을 경우 애플리케이션은 알아서 사용 코어 수를 줄여주기 때문. 하지만 스케줄링되는 작업들의 응답성이 나빠진다는 단점이 존재. (스파크 스트리밍같이 빠른 응답성을 요구하는 애플리케이션에게는 적절치 않을 수 있음)

실행하는 작업들에 따라 익스큐터가 메소스에 요청하는 cpu 개수를 조정하므로 여러 개의 익스큐터를 한 머신에서 실행하더라도 익스큐터들 사이에 동적으로 자원 공유가 가능합니다.

#### **coarse-grained ( 거친 모드 )**

각 익스큐터에 고정된 개수의 *cpu를 할당.*cpu : center process unit , 중앙처리장치 명령어의 해석 및 자료의 연산 비교 등의 처리를 제어하는 컴퓨터 시스템의 핵심 장치로 다양한 입력 장치로부터 자료를 받아 처리한 뒤 그 결과를 출력장치로 보내는 일련의 과정을 제어하고 조정

애플리케이션 종료 전까지 익스큐터가 아무 일을 하지 않을 때도 절대 반환하지 않음


### D. Kubernetes
![](https://i.imgur.com/oi04Zzs.png)

- Kubernetes에서는 driver가 뜨고 이 driver가 executor pod들을 실행
- client모드로 Spark job을 실행하면 실행하고자 하는 pod이 driver가 되고 executor pod들이 새로 생성됨
- cluster 모드로 실행하면 실행한 pod과는 별개로 driver pod이 새로 뜨게되며 새로 뜬 driver pod이 executor pod들을 띄우게 되는 구조