---
title: Spark Deploy Mode
date: 2023-11-02
draft: false
tags:
  - Spark
  - Concept
complete: false
---
Spark의 배포 모드는 Spark Application을 실행할 때 **요청한 자원의 물리적인 위치를 결정한다**.

![[Spark Deployment Modes.png]]

위 그림에서 local mode와 deploy mode를 선택하는 기준은 **cluster를 사용 여부**다. 즉, cluster를 사용해서 분산 모드로 애플리케이션을 실행한다면 deploy mode, 그렇지 않다면 local mode다.

cluster를 사용한다면 **cluster manager 종류와 배포 방식**을 선택할 수 있다. cluster manager는 standalone, YARN, Mesos 등 중에 선택할 수 있다. **배포 방식에는 client, cluster가 있고 어떤 방식을 사용하느냐에 따라 driver 실행 위치가 달라진다.**

즉, spark 애플리케이션을 실행할때 local mode, client mode, cluster mode 총 3가지 방식으로 실행할 수 있다.

---

## Local Mode

![[Spark Local Mode.png]]

local mode는 local client JVM에 driver 1개와 executor 1개를 생성하는 형태로, 클러스터를 사용하지 않고 로컬 단일 머신에서 애플리케이션을 실행한다. 다시말해, 한개의 노드에 Master Process, Worker Process가 동작하고 있어야한다.

> [!INFO]
> Local Mode는단일 머신 환경을 구축하거나 간단한 테스트를 할 때 유용하다.

local mode로 실행하고 싶다면 아래와 같이`spark-submit` 명령어에 `--master local[N]` 으로 옵션 값을 설정하면 된다. N은 몇개의 executor core를 사용할지 나타내는 숫자로, `local[*]` 로 지정시 갖고 있는 모든 core를 사용한다.

```bash
spark-submit --master local[N] ...
```

---

## Client Mode

**→** Driver가 Cluster **외부에 위치**

![[Spark Client Mode.png]]

![[Spark Client Mode2.png]]

**client mode는 driver가 cluster 외부인 Client JVM에서 실행**된다. client 프로세스에 driver program과 그 안에 spark application, spark context가 있기 때문에 client 프로세스를 중지시키면 수행 중이던 모든 스파크 잡도 중단된다.

> [!info] 
> driver program의 출력을 직접 확인 가능하기 때문에 주로 **디버깅**할 때 사용된다.

cluster manager는 YARN을 사용하고 client mode로 실행하고 싶다면 아래과 같이 `spark-submit` 명령어에 `--master yarn`와 `--deploy-mode client`으로 옵션 값을 지정하면 된다.

```bash
spark-submit --master yarn --deploy-mode client
```

---

## Cluster Mode

**→** Driver가 Cluster **내부에 위치**

![[Spark Cluster Mode.png]]

![[Spark Cluster Mode2.png]]

**cluster mode는 driver가 cluster 내부의 worker 노드 중 하나에서 실행**된다. 애플리케이션은 cluster 내부에서 독립적인 프로세스로 실행되고 cluster manager에 의해 조정되기 때문에 해당 모드에서 client는 <mark style="background: #C6AB16;">애플리케이션 제출 후 개입하지 않는다.</mark>

> [!info] 
> cluster mode는 주로 **프로덕션 잡을 수행**할때 사용한다.

cluster manager는 MESOS를 사용하고 cluster mode로 실행하고 싶다면 위과 같이 `spark-submit` 명령어에 `--master mesos://172.8.0.13`와 `--deploy-mode cluster`으로 옵션 값을 지정하면 된다.

```bash
spark-submit --master mesos://172.8.0.13 --deploy-mode cluster
```