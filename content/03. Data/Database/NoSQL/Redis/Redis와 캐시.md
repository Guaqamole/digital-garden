---
title: Redis와 캐시
date: 2023-12-10
draft: false
tags:
  - NoSQL
complete: true
---
## **Redis (Remote Dictionary Server)**

Redis는 Remote(원격)에 위치하고 프로세스로 존재하는 `In-Memory` 기반의 `Dictionary(key-value)` 구조 데이터 관리 Server 시스템이다. 

여기서 **key-value 구조** 데이터란, mysql 같은 관계형 데이터가 아닌 비 관계형 구조로서 데이터를 그저 `'키-값' 형태로 단순하게 저장하는 구조`를 말한다. 

그래서 관계형 데이터베이스와 같이 쿼리 연산을 지원하지 않지만, 대신 데이터의 **고속 읽기와 쓰기에 최적화** 되어 있다. 그래서 Redis는 `일종의 **NoSQL 로 분류**되기도 한다`. 

![](https://i.imgur.com/4IYJSWr.png)


> Info) NoSQL은 `Not Only SQL의 약자`로써 기존 관계형 데이터베이스(RDBMS)보다 더 융통성 있는 데이터 모델을 사용하고 데이터의 저장 및 검색을 위한 특화된 메커니즘을 제공하는 데이터 저장기술을 의미한다. NoSQL 데이터베이스는 `단순 검색 및 추가 작업`에 있어서 매우 `최적화된 키-값 저장 기법`을 사용하여 응답속도나 처리 효율 등에 있어서 매우 뛰어난 성능을 보여준다.
> 

또한 Redis는 **인 메모리(In-Memory) 솔루션**으로도 분류되기도 하는데, **다양한 데이터 구조체를 지원함으로써 DB, Cache, Message Queue, Shared Memory 용도로 사용될 수 있다**.

일반 데이터베이스 같이 디스크(ssd)에 데이터를 쓰는 구조가 아니라 메모리(d-ram)에서 데이터를 처리하기 때문에 **작업 속도가 상당히 빠르다**. 

![](https://i.imgur.com/Hs8Y2Ho.png)


| 메모리 | RAM | CPU에서 이루어진 연산을 기록하는 메모리 CPU와 하드디스크를 연결시켜주는 장치 |
| --- | --- | --- |
| 외부 저장 장치 | HDD, SDD | 컴퓨터의 정보, 문서, 자료 등을 저장하고 읽을 수 있는 장치 |

외부 저장 장치를 사용했다면 메모리와 외부 저장 장치와의 병목 현상이 발생했겠지만, 메모리만 사용하기 때문에 데이터 저장 속도가 매우 빠르다. 마지막으로 Redis가 인기 있는 이유는 Java, Python, PHP, C, C++, C#, JavaScript, Node.js, Ruby, R, Go를 비롯한 정말 많은 프로그래밍 언어 프레임워크에 대한 API를 폭넓게 지원하기 때문이다. (참고 : **[http://www.redis.io/clientsVisit Website](http://www.redis.io/clients)** ) 

> Redis 탄생 배경에는 `Salvatore Sanfilippo`라는 이탈리아 해커가 MySQL로 어떤 어플을 개발하다가 느려터졌다고 생각해 직접 빠른 서버를 만들어봐야겠다고 생각했고,그 결과 Redis를 개발하게 되었다는 비하인드 스토리가 있다.
> 

## Redis의 특징

- `NoSql DBMS(비관계형 데이터베이스)`로 분류되며 `In memory` 기반의 `Key - Value 구조`를 가진 데이터 관리 시스템
- 메모리 기반이라 모든 데이터들을 `메모리에 저장하고 조회에 매우 빠르다`. (리스트형 데이터 입력과 삭제가 MySQL에 비해서 10배정도 빠름)
- 메모리에 상주하면서 서비스의 상황에 따라 데이터베이스로 사용될 수 있으며, `Cache로도 사용`될 수 있다.
- Remote Data Storage로 `여러 서버에서 같은 데이터를 공유하고 보고 싶을 때 사용할 수 있다`.
- `다양한 자료구조`를 지원한다. (Strings, Set, Sorted-Set, Hashes, List ...)
- 쓰기 성능 증대를 위한 클라이언트 측 `샤딩(Sharding)`을 지원한다.
    - Sharding : 같은 테이블 스키마를 가진 데이터(row)를 **다수의 데이터베이스에 분산하여 저장하는 방법**
- 메모리 기반이지만 Redis는 `영속적인 데이터 보존(Persistence)이 가능`하다. (메모리는 원래 휘발성)
- 스냅샷 기능을 제공해 메모리 내용을 *.rdb 파일로 저장하여 `해당 시점으로 복구할 수 있다`.
- 여러 프로세스에서 동시에 같은 key에 대한 갱신을 요청하는 경우, 데이터 부정합 방지 Atomic 처리 함수를 제공한다(원자성)
- Redis는 기본적으로 1개의 싱글 쓰레드로 수행되기 때문에, 안정적인 인프라를 구축하기 위해서는 **[Replication(Master-Slave 구조)](http://redisgate.kr/redis/configuration/replication.php)** 필수이다.

---

## **Redis 활용하기 - 캐시(Cache)**

### **캐쉬(Cache)란?**

Cache란 한번 조회된 데이터를 **`미리 특정 공간에 저장`**해놓고, 똑같은 요청이 발생하게 되면 서버에게 다시 요청하지 말고 **`저장해놓은 데이터를 제공해서 빠르게 서비스를 제공`**해주는 것을 의미한다.

즉, 미리 결과를 저장하고 나중에 요청이 오면 그 요청에 대해서 DB 또는 API를 참조하지 않고 Cache를 접근하여 요청을 처리하는 기법이다.

서비스를 처음 운영할 때는 WEB-WAS-DB 정도로 작게 인프라를 구축하는데, 사용자가 늘어나면 DB에 무리가 가기 시작한다.

DB는 데이터를 물리 디스크에 직접 쓰기 때문에 서버에 문제가 발생해도 데이터가 손실되지는 않지만, `매 트랜잭션마다 디스크에 접근`해야하므로 `부하가 많아지면 성능이 떨어진다`.

그래서 사용자가 늘어나면 DB를 **스케일 인** 또는 **스케일 아웃**하는 방식 외에도 **`캐시 서버`**를 검토하게 된다.

Redis Cache 는 메모리 단 (In-Memory) 에 위치한다. 따라서 용량은 적지만 접근 속도가 빠르다.

다만 저장하려는 데이터 셋이 주어진 메모리 크기보다 크면 디스크를 쓰는 것이 올바른 선택이다.

## **Redis - 캐시(Cache) 전략**

들어가기 앞서 선수 지식이 필요한데, 바로 cache hit 과 cache miss 이다.

- cache hit : 캐시 스토어(redis)에 데이터가 있을 경우 바로 가져옴 (빠름)
- cache miss : 캐시 스토어(redis)에 데이터가 없을 경우 어쩔수없이 DB에서 가져옴 (느림)

![](https://i.imgur.com/M6xn7V1.png)


---

### **Redis 캐시의 활용 사례**

Twitter는 140자 정도의 짧은 글을 올릴 수 있는 소셜 네트워킹 서비스(SNS)이다.

Twitter에서의 Timeline은 사용자가 Follow(구독)하는 사용자들의 최근 트윗을 확인할 수 있는 페이지이다.

2012년 당시 Twitter는 15만명이 넘는 실시간 활동 사용자와 `초당 30만 건`이 넘는 Timeline 요청이 발생했었다. 이러한 규모의 Timeline 요청을 데이터베이스에 직접 접근하는 방식으로 처리하면 Query가 복잡해짐에 따라 속도가 현저히 떨어지는 문제가 발생한다. 

Twitter는 이 문제를 해결하기 위해 `메모리 기반 NoSQL 기술인 Redis를 사용`하였다고 한다.

Twitter의 데이터 센터에 존재하는 방대한 양의 `Redis Cluster`는 **각 사용자의 Timeline에 노출될 `Tweet의 정보(Tweet ID, 작성자 ID)`를 List 형태로 약 800개 정도 캐싱한다**. 

발생하는 Timeline 요청은 **바로 데이터베이스로 접근하지 않고** `Redis에 **캐싱된 Timeline 정보를 먼저 가져와`서**, 이를 토대로 **Query를 단순화하여 데이터베이스에** 접근하여 처리한다. 

![](https://i.imgur.com/WZhcP5i.png)


단, 모든 사용자의 Timeline을 캐싱하게 되면 메모리가 부족해질 수 있으므로, 로그인을 안한 지 30일이 지난 사용자의 Timeline은 Redis Cluster에서 삭제하도록 설정한다.

Redis Cluster에서 삭제된 사용자의 Timeline 정보는 해당 사용자가 다시 로그인을 할 시에 재생성 하게 하는데, 이때 데이터베이스에 직접 접근하는 과정이 필요하기에 시간이 다소 소요될 수도 있다.

이외에도 Redis를 주로 사용하는 곳은 다음과 같다.

- 인증 토큰 등을 저장(Strings or Hash)
- Ranking 보드로 사용(Sorted-Set)
- 유저 API Limit
- 잡큐(list)

---

이처럼, Redis는 특히 Remote Dictionary로서 RDBMS의 **`캐시 솔루션`**으로 사용 용도가 굉장히 높다.

일반적으로 데이터베이스는 저장장치에 저장이 되는데, 데이터베이스를 조회하려면 저장장치로 i/o가 발생하게 된다. 

RDBMS에서 SELECT 쿼리문을 날려 특정 데이터들을 FETCH했을 때, RDBMS의 구조상 DISK에서 데이터를 꺼내오는 데 Memory에서 읽어들이는 것보다 천배 가량 더 느리다. 예를 들어, 데이터베이스에 접근하여 10,000개의 레코드를 읽는다고 가정했을 때 disk에 저장되어 있다면 약 30초의 시간이 걸리는 반면 RAM에서 읽을 경우엔 약 0.0002초 밖에 걸리지 않는다. 

![](https://i.imgur.com/w7taV7G.png)


- 따라서 Redis같은 유연한 자료구조를 가지는 인메모리 Key-value 솔루션을 사용하여 `DB 부하의 Read 연산의 부하를 분산시키는 데 적용`한다.
- 캐시는 `in-memory` 방식을 활용하여 데이터를 임시로 저장해두기 때문에 저장장치의 i/o보다 훨씬 빠르게 동작할 수 있다.
- 그래서 자주 사용하는 데이터는 캐시 서버에서 우선 조회하고 없을 때는 데이터베이스를 다시 조회하는 방식을 활용하면 전체적인 서비스의 속도를 향상시킬 수 있다.
- 또, 하드한 작업 같은 경우 쿼리문이 길고 복잡해 기본적으로 데이터베이스를 조회하는 시간이 오래 걸리는데, 만일 이 쿼리가 자주 사용되는 경우라면 해당 쿼리가 전체 서비스 속도의 병목이 될 수 있다.
- 그럴때는 `쿼리 결과 자체를 Redis로 캐싱`을 해두고, 쿼리의 결과가 바뀔 수 있는 `이벤트가 발생할 때마다 캐시에 적재`를 새로한다면 **전체 서비스 속도를 향상 시킬 수도 있다**.
- 그래서 캐싱이 필요할 때 많이 사용되는데 즉시 **메시지를 주고 받아야 될 때**나, **장바구니의 삭제**와 같은 경우에 많이 사용하는 편이다.
- 또한 RAM은 휘발성인데 그럼 실행중인 Redis를 끄면 데이터가 전부 날라간다고 생각이 들게 되는데, Redis는 **in-memory** 이지만 **persistent on-disk 데이터베이스** 이기도 하다.
- Redis는 특정한 때에 현재까지의 in-memory 상태를 disk에 저장해 두었다가 Redis를 다시 시작했을 때 disk에 저장해 두었던 dump 파일들을 load 하기 때문에 데이터의 손실 발생을 방지할수도 있다.

# **캐시의 캐싱 전략**

**캐싱 전략**은 웹 서비스 환경에서 **시스템 성능 향상**을 기대할 수 있는 중요한 기술이다.

일반적으로 캐시(cache)는 메모리(RAM)를 사용하기 때문에 데이터베이스 보다 훨씬 빠르게 데이터를 응답할 수 있어 이용자에게 빠르게 서비스를 제공할 수 있다.

하지만 기본적으로 RAM의 용량은 커봐야 16 ~ 32G 정도라, 데이터를 모두 캐시에 저장해버리면 용량 부족 현상이 일어나 시스템이 다운 될 수 있다.

따라서 `어느 종류의 데이터를 캐시에 저장할지`, `얼만큼 데이터를 캐시에 저장할지`, `얼마동안 오래된 데이터를 캐시에서 제거하는지`에 대한 **'지침 전략'** 을 숙지할 필요가 있다.

> Tip) 캐시를 효율적으로 이용하기위해서는 캐시에 저장할 데이터 특성도 고려해야 한다. 예를 들어, **자주 조회되는 데이터, 결과값이 자주 변동되지 않고 일정한 데이터, 조회하는데 연산이 필요한 데이터를 캐싱해두면 좋다**.
> 

## **캐싱 전략 패턴 종류**

캐시를 이용하게 되면 반드시 닥쳐오는 문제점이 있는데 바로 `**데이터 정합성**` 문제이다.

데이터 정합성이란, 어느 한 데이터가 캐시(Cache Store)와 데이터베이스(Data Store) 이 두 곳에서 같은 데이터임에도 불구하고 데이터 정보값이 서로 다른 현상을 말한다.

쉽게 말하면, 캐시에는 어떤 게시글의 좋아요 갯수가 10개로 저장되어 있는데 데이터베이스에는 7개로 저장되어있을 경우 정보 불일치가 발생하게 된다.

이전에는 그냥 DB에서 데이터 조회와 작성을 처리하였기 때문에 데이터 정합성 문제가 나타나지 않았지만, 캐시라는 또다른 데이터 저장소를 이용하기 때문에, 결국 같은 종류의 데이터라도 두 저장소에서 저장된 갑시 서로 다를수 있는 현상이 일어날수 밖에 없는 것이다.

따라서 적절한 **캐시 읽기 전략(Read Cache Strategy)**과 **캐시 쓰기 전략(Write Cache Strategy)**을 통해, 캐시와 DB간의 데이터 불일치 문제를 극복하면서도 빠른 성능을 잃지 않게 하기 위해 고심히 연구를 할 필요가 있다.

## `읽기 전략 (READ)`

### **Look aside Cache 패턴**

캐시를 사용하는 패턴은 첫 번째로 Look aside Cache 패턴이다.

위에서 말한 `일반적인 캐시 정의를 그대로 구현한 구조`이다.

look aside cache는 **캐시를 한 번 접근하여 데이터가 있는지 판단한 후, 있다면 캐시의 데이터를 사용하고 없으면 실제 DB 또는 API를 호출**한다. 

**[Look aside Cache 쿼리 순서]** 

1. 클라이언트에서 데이터 요청
2. 서버에서 캐시에 `데이터 존재 유무 확인`
3. 데이터가 있다면 `캐시의 데이터 사용 (빠른 조회)` → Cache Hit
4. 데이터가 없다면 `실제 DB 데이터에 접근` → Cache Miss
5. 그리고 DB에서 가져 온 `데이터를 캐시에 저장하고 클라이언트에 반환`

![](https://i.imgur.com/wACOHLX.png)


### 특징

- Cache Aside 패턴이라고도 불림.
- 데이터를 찾을때 우선 캐시에 저장된 데이터가 있는지 우선적으로 확인하는 전략. 만일 캐시에 데이터가 없으면 DB에서 조회함.
- `**반복적인 읽기가 많은 호출**`에 적합.
- 캐시와 DB가 분리되어 가용되기 때문에 원하는 데이터만 별도로 구성하여 캐시에 저장
- 캐시와 DB가 분리되어 가용되기 때문에 캐시 장애 대비 구성이 되어있음.만일 redis가 다운 되더라도 DB에서 데이터를 가져올수 있어 서비스 자체는 문제가 없음.
- 대신에 캐시에 붙어있던 connection이 많았다면, redis가 다운된 순간 순간적으로 DB로 몰려서 부하 발생.

이 방식은 캐시에 장애가 발생하더라도 DB에 요청을 전달함으로써 캐시 장애로 인한 서비스 문제는 대비할수 있지만, Cache Store와 Data Store(DB)간 `**정합성 유지 문제**`가 발생할 수 있으며, 초기 조회 시 무조건 Data Store를 호출 해야 하므로 단건 호출 빈도가 높은 서비스에 적합하지 않다. 대신 `**반복적으로 동일 쿼리를 수행하는 서비스에 적합한 아키텍처**`이다. 이런 경우 DB에서 캐시로 데이터를 미리 넣어주는 작업을 하기도 하는데 이를 `Cache Warming`이라고 합니다.

> Info) **[ Cache Warming ]**
> 
> 
> 미리 cache로 db의 데이터를 밀어 넣어두는 작업을 의미한다. 
> 
> 이 작업을 수행하지 않으면 서비스 초기에 트래픽 급증시 대량의 cache miss 가 발생하여 데이터베이스 부하가 급증 할 수 있다. (Thundering Herd)
> 
> 다만, 캐시 자체는 용량이 작아 무한정으로 데이터를 들고 있을수는 없어 일정시간이 지나면 expire되는데, 그러면 다시 Thundering Herd가 발생될 수 있기 때문에 캐시의 TTL을 잘 조정할 필요가 있다. (뒤에서 자세히 설명)
> 

> Tip) Thundering Herd는 모든 지점에서 발생되는 것은 아니고, 서비스의 첫 페이지와 같은 대부분의 조회가 몰리는 지점에서 주로 발생된다고 보면 된다.
> 

### **Read Through 패턴**

- `**캐시에서만 데이터를 읽어오는 전략 (inline cache)**`
- Look Aside 와 비슷하지만 **`데이터 동기화를 라이브러리 또는 캐시 제공자에게 위임`**하는 방식이라는 차이가 있음.
- 따라서 데이터를 조회하는데 있어 전체적으로 속도가 느림.
- 또한 데이터 조회를 전적으로 `캐시에만 의지`하므로, redis가 다운될 경우 서비스 이용에 차질이 생길수 있음.
- 대신에 **캐시와 DB간의 데이터 동기화**가 항상 이루어져 **데이터 정합성 문제에서 벗어날수 있음**
- 역시 읽기가 많은 워크로드에 적합

![](https://i.imgur.com/dWwFV3n.png)


Read Through 방식은 Cache Aside 방식과 비슷하지만, `**Cache Store에 저장하는 주체가 Server이냐 또는 Data Store 자체이냐에서 차이점**`이 있다. 

이 방식은 **직접적인 데이터베이스 접근을 최소화하고 Read 에 대한 소모되는 자원을 최소화할 수 있다**. 

하지만 캐시에 문제가 발생하였을 경우 이는 바로 서비스 전체 중단으로 빠질 수 있다. 그렇기 때문에 redis과 같은 구성 요소를 **Replication 또는 Cluster로 구성**하여 가용성을 높여야 한다. 

> Tip) 이 방식 또한 서비스 운영 초반에 cache warming을 수행하는 것이 좋다.
> 

## 쓰기 전략

### **Write Back 패턴**

- Write Behind 패턴 이라고도 불림.
- write back은 주로 **쓰기 작업**이 굉장히 많아서, **`INSERT 쿼리를 일일이 날리지 않고 한꺼번에 배치 처리`**를 하기 위해 사용한다. ****JPA의 쓰기지연 동작처럼.****
- 예를 들어, 영어 듣기 평가를 온라인으로 진행하는 서비스가 있을 때, 여러 학생이 동시에 제출 버튼을 누르면서 DB에 갑작스럽게 엄청난 쓰기 요청이 몰리게 되면 DB 서버가 죽을 수도 있다.
- 이때 write back 기반의 캐시를 사용하면 캐시 메모리에 데이터를 저장해 놓고, 이후 DB 디스크에 업데이트 해 주면 안전하게 쓰기 작업을 이행할 수 있는 것이다.
- 즉, `insert 를 1개씩 500번 수행하는 것보다 500개를 한번에 삽입하는 동작이 훨씬 빠르기 때문`에 write back 방식은 빠른 속도로 서비스가 가능하다.
- 하지만 단점도 있다. DB에서 디스크를 접근하는 횟수가 줄어들기 때문에 성능 향상을 기대할 수 있지만, `DB에 데이터를 저장하기 전에 캐시 서버가 죽으면 데이터가 유실된다는 문제점`이 있다.
- 그래서 `다시 재생 가능한 데이터`나, `극단적으로 heavy 한 데이터`에서 write back 방식을 많이 사용한다.
- 예를 들면 로그를 캐시에 저장하고 특정 시점에 DB 에 한번에 저장하는 경우가 있다.
- Write가 빈번하면서 Read를 하는데 많은 양의 Resource가 소모되는 서비스에 적합
- 데이터 정합성 확보
- 캐시와 DB 동기화를 비동기하기 때문에 동기화 과정이 생략.
- 자주 사용되지 않는 불필요한 리소스 저장.

**[write back 쿼리 순서]**

1. 우선 모든 데이터를 캐시에 싹 저장
2. 캐시의 데이터를 일정 주기마다 DB에 한꺼번에 저장 (배치)
3. 그리고나선 DB에 저장했으니 잔존 데이터를 캐시에서 제거

![](https://i.imgur.com/JzZSxrC.png)


Write Back 방식은 데이터를 저장할때 DB가 아닌 먼저 캐시에 저장하여 모아놓았다가 특정 시점마다 DB로 쓰는 방식으로 `**캐시가 일종의 Queue 역할을 겸하게 된다**`.

캐시에 데이터를 모았다가 한 번에 DB에 저장하기 때문에 DB 쓰기 횟수 비용과 부하를 줄일 수 있지만, 데이터를 옮기기 전에 캐시 장애가 발생하면 데이터 유실이 발생할 수 있다는 단점이 존재한다. 하지만 오히려 반대로 데이터베이스에 장애가 발생하더라도 지속적인 서비스를 제공할 수 있도록 보장하기도 한다.

> Tip) 이 전략 또한 캐시에 **Replication이나 Cluster 구조를 적용함으로써 Cache 서비스의 가용성을 높이는 것이 좋으며**, **캐시 읽기 전략인 Read-Through와 결합하면 가장 최근에 업데이트된 데이터를 항상 캐시에서 사용할 수 있는 혼합 워크로드에 적합**하다.
> 

### **Write Through 패턴**

- `데이터베이스와 Cache에 동시에 데이터를 저장`하는 전략
- 데이터를 저장할 때 먼저 캐시에 저장한 다음 바로 DB에 저장 (모아놓았다가 나중에 저장이 아닌 바로 저장)
- Read Through 와 마찬가지로 `DB 동기화 작업을 캐시에게 위임`
- DB와 캐시가 **항상 동기화** 되어 있어, 캐시의 데이터는 항상 최신 상태로 유지
- 캐시와 백업 저장소에 업데이트를 같이 하여 데이터 일관성을 유지할 수 있어서 안정적
- `**데이터 유실이 발생하면 안 되는 상황에 적합**`
- 자주 사용되지 않는 불필요한 리소스 저장.
- 매 요청마다 두번의 Write가 발생하게 됨으로써 빈번한 생성, 수정이 발생하는 서비스에서는 `**성능 이슈 발생**`
- 기억장치 속도가 느릴 경우, 데이터를 기록할 때 CPU가 대기하는 시간이 필요하기 때문에 성능 감소

![](https://i.imgur.com/IuRzRK8.png)


Write Through 패턴은 `**Cache Store에도 반영하고 Data Store에도 동시에 반영하는 방식**`이다. (Write Back은 일정 시간을 두고 나중에 한꺼번에 저장) 그래서 항상 동기화가 되어 있어 항상 최신정보를 가지고 있다는 장점이 있다. 하지만 결국 저장할때마다 2단계 과정을 거쳐치기 때문에 상대적으로 느리며, 무조건 일단 Cache Store에 저장하기 때문에 캐시에 넣은 데이터를 저장만 하고 사용하지 않을 가능성이 있어서 `리소스 낭비 가능성`이 있다. 

> Tip) write throuth 패턴과 write back 패턴 둘 다 모두 자주 사용되지 않는 데이터가 저장되어 리소스 낭비가 발생되는 문제점을 안고 있기 때문에, 이를 해결하기 위해 `**TTL을 꼭 사용**`하여 사용되지 않는 데이터를 반드시 삭제해야 한다. (expire 명령어)
> 

> Tip) Write-Through 패턴과 Read-Through 패턴을 함께 사용하면, `**캐시의 최신 데이터 유지와 더불어 정합성 이점**`을 얻을 수 있다. 대표적인 예로 AWS의 DynamoDB Accelerator(DAX)가 있다. DAX 패턴을 통해 DynamoDB에 대한 읽기 및 쓰기를 효율적으로 수행할 수 있다.
>![](https://i.imgur.com/f2PJN8r.png)


### **Write Around 패턴**

- `Write Through`보다 훨씬 빠름
- 모든 데이터는 DB에 저장 (캐시를 갱신하지 않음)
- `**Cache miss가 발생하는 경우에만 DB와 캐시에도 데이터를 저장**`
- 따라서 캐시와 DB 내의 데이터가 다를 수 있음 (데이터 불일치)

![](https://i.imgur.com/f1xErml.png)


Write Around 패턴은 속도가 빠르지만, cache miss가 발생하기 전에 데이터베이스에 저장된 데이터가 수정되었을 때, **사용자가 조회하는 cache와 데이터베이스 간의 데이터 불일치가 발생**하게 된다. `따라서 데이터베이스에 저장된 데이터가 수정, 삭제될 때마다, Cache 또한 삭제하거나 변경해야 하며, Cache의 expire를 짧게 조정하는 식으로 대처해야 한다`. 

> Tip) `Write Around 패턴`은 주로 **Look aside, Read through와 결합해서 사용된다.**
> 
> 
> **데이터가 한 번 쓰여지고, 덜 자주 읽히거나 읽지 않는 상황에서 좋은 성능을 제공한다.** 
> 

## **캐시 읽기 + 쓰기 전략 조합**

### **Look Aside + Write Around 조합**

- 가장 일반적으로 자주 쓰이는 조합

![](https://i.imgur.com/RUTY1IB.png)


### **Read Through + Write Around 조합**

- 항상 DB에 쓰고, 캐시에서 읽을때 항상 DB에서 먼저 읽어오므로 데이터 정합성 이슈에 대한 완벽한 안전 장치를 구성할 수 있음

![](https://i.imgur.com/4mCsVvx.png)


### **Read Through + Write Through 조합**

- 데이터를 쓸때 항상 캐시에 먼저 쓰므로, 읽어올때 최신 캐시 데이터 보장
- 데이터를 쓸때 항상 캐시에서 DB로 보내므로, 데이터 정합성 보장

![](https://i.imgur.com/YslF0va.png)


---

## **캐시 저장 방식 지침**

캐시 솔루션은 **`자주 사용되면서 자주 변경되지 않는 데이터`**의 경우 캐시 서버에 적용하여 반영할 경우 높은 성능 향상을 이뤄낼 수 있다. 이를 `Cache Hit Rating`이라고 한다.

일반적으로 캐시는 메모리에 저장되는 형태를 선호한다. 

메모리 저장소로는 대표적으로 Redis와 MemCached가 있으며 이와 같은 솔루션은 메모리를 1차 저장소로 사용하기 때문에 디스크와 달리 제약적인 저장 공간을 사용하게 된다.

많아야 수십기가 정도의 저장소를 보유하게 되며, 이는 결국 자주 사용되는 데이터를 어떻게 뽑아 캐시에 저장하고 자주 사용하지 않는 데이터를 어떻게 제거해 나갈 것이냐를 지속적으로 고민해야 할 필요성이 있다.

따라서 `캐시를 저장하는 시점은 자주 사용되며 자주 변경되지 않는 데이터를 기준으로`하는 것이 좋다. 

또한 한가지 고민해야 할 사항은 캐시 솔루션은 언제든지 데이터가 날라갈 수 있는 `휘발성을 기본으로 한다는 점`이다.

이는 데이터를 주기적으로 디스크에 저장함으로서 어느정도 해결을 볼수는 있지만, 실시간으로 모든 데이터를 디스크에 저장할 경우 성능 저하를 일으킬 수 있어 어느 정도 데이터 수집과 저장 주기를 가지도록 설계 해야 된다.

즉 `데이터의 유실 또는 정합성이 일정 부분 깨질 수 있다는 점을 항상 고려해야 한다`.

따라서 캐시에 저장되는 데이터는 중요한 정보, 민감 정보 등은 저장하지 않는 것이 좋으며, 캐시 솔루션이 장애가 발생했을 경우 적절한 대응방안을 모색해 두는 것이 바람직하다. (TimeOut, 데이터베이스 조회 병행 등)

> **[ 파레토 법칙 - 8:2 법칙 ]**
> 
> 
> 파레토 법칙이란 전체 결과의 80%가 전체 원인의 20%에서 일어나는 현상을 가리킨다.
> 
> 서비스에 빗대어 표현하자면 80%의 활동을 20%의 유저가 하기 때문에 20%의 데이터만 캐시 해도 서비스 대부분의 데이터를 커버할 수 있게 된다는 말이다.
> 
> 즉, 캐시에 모든 데이터를 저장할 필요 없이 "파레토 법칙"에 따라 일부만 저장해도 대부분의 데이터를 커버할 수 있다는 저장 지침이다.
> 
> ![](https://i.imgur.com/maYdKSQ.png)

> 

## **캐시 제거 방식 지침**

캐시 데이터의 경우 캐시 서버에만 단독으로 저장되는 경우도 있지만, 대부분 **영구 저장소에 저장된 데이터의 복사본으로 동작**하는 경우가 많다. 

이는 2차 저장소(영구 저장소)에 저장되어 있는 데이터와 캐시 솔루션의 **`데이터를 동기화 하는 작업**이 반드시 필요함`을 의미하며, 개발 과정에 고려사항이 늘어난다는 점을 반드시 기억해야 한다.

예를 들어, 캐시 서버와 데이터베이스에 저장되는 데이터의 commit 시점에 대한 고려 등이 예가 될 수 있다.

`캐시의 만료 정책`이 제대로 구현되지 않은 경우 클라이언트는 데이터가 변경되었음에도 `오래된 정보가 캐싱 되어있어 오래된 정보를 사용할 수 있다는 문제점이 발생`한다. 따라서 **캐시를 구성할 때 기본 만료 정책을 설정해야 한다.**

캐시된 데이터가 기간 만료 되면 캐시에서 데이터가 제거 되고, 응용 프로그램은 원래 데이터 저장소에서 데이터를 검색 해야 한다. 그래서 캐시 만료 주기가 너무 짧으면 데이터는 너무 빨리 제거되고 캐시를 사용하는 이점은 줄어든다. 반대로 너무 기간이 길면 데이터가 변경될 가능성과 메모리 부족 현상이 발생하거나, 자주 사용되어야 하는 데이터가 제거되는 등의 역효과를 나타낼 수도 있다. 

---

### **Cache Stampede 현상**

![](https://i.imgur.com/RtmovQ5.png)


대규모 트래픽 환경에서 **`TTL 값이 너무 작게 설정하면** cache stampede 현상이 발생할 가능성`이 있다.

위에서 배웠듯이, Look-aside 패턴에서 redis에 데이터가 없다는 응답을 받은 서버 (캐시 미스)가 직접 DB로 데이터 요청한 뒤, 다시 redis에 저장하는 과정을 거친다.

그런데 위 상황에서 key가 만료(**Key Expires**)되는 순간 많은 서버에서 이 key를 같이 보고 있었다면 모든 어플리케이션 서버에서 DB로 가서 찾게 되는 **duplicate read** 가 발생한다.

또 읽어온 값을 각 각 redis에 쓰는 **duplicate write** 도 발생되어, 처리량도 다 같이 느려질 뿐 아니라 불필요한 작업이 굉장히 늘어나 요청양 폭주로 장애로 이어질 가능성 도 있다.

---

## **캐시 공유 방식 지침**

캐시는 `애플리케이션의 여러 인스턴스에서 공유하도록 설계`된다.

그래서 각 애플리케이션 인스턴스가 캐시에서 데이터를 읽고 수정할 수 있다.

따라서 어느 한 애플리케이션이 캐시에 보유하는 데이터를 수정해야 하는 경우, 애플리케이션의 한 인스턴스가 만드는 업데이트가 다른 인스턴스가 만든 변경을 덮어쓰지 않도록 해야 한다.

그렇지 않으면 데이터 정합성 문제가 발생하기 떄문이다. (각 애플리케이션 마다 표시되는 갯수가 달라지는 현상)

데이터의 충돌을 방지하기 위해 다음과 같은 어플리케이션 개발 방식을 취해야 한다.

먼저, 캐시 데이터를 변경하기 직전에 데이터가 검색된 이후 변경되지 않았는지 일일히 확인하는 방법이다.

변경되지 않았다면 즉시 업데이트하고 변경되었다면 업데이트 여부를 애플리케이션 레벨에서 결정하도록 수정해야 한다.

이와 같은 방식은 업데이트가 드물고 충돌이 발생하지 않는 상황에 적용하기 용이하다.

두번째로, 캐시 데이터를 업데이트 하기 전에 Lock을 잡는 방식이다.

이와 같은 경우 조회성 업무를 처리하는 서비스에 Lock으로 인한 대기현상이 발생한다.

이 방식은 데이터의 사이즈가 작아 빠르게 업데이트가 가능한 업무와 빈번한 업데이트가 발생하는 상황에 적용하기 용이하다.

---

## **캐시 가용성 지침**

캐시를 구성하는 목적은 `빠른 성능 확보와 데이터 전달`에 있으며, `데이터의 영속성을 보장하기 위함`이 아니라는 점을 기억하고 설계해야 한다.

데이터의 영속성은 기존 데이터 스토어에 위임하고, 캐시는 `데이터 읽기에 집중하는 것이 성능 확보의 지침 사항`이 될 수 있다.

또한, 캐시 서버가 장애로 인해 다운되었을 경우나 서비스가 불가능할 경우에도 지속적인 서비스가 가능해야 한다.

이는 `캐시에 저장되는 데이터는 결국 기존 영구 데이터 스토어에 동일하게 저장되고 유지된다는 점을 뒷바침하는 설계방식`이다. (Write Through)

즉, `캐시 서버가 장애로 부터 복구되는 동안 성능상의 지연은 발생할 수 있지만, 서비스가 불가능한 상태가 되지 않도록 고려해야 한다`는 말이다.

# Spring에서의 Redis, 캐시전략

## 1. 스프링의 캐싱 방법
### 스프링의 캐싱

- @Cacheable, @CacheEvict 같은 어노테이션을 통해 [AOP](https://docs.spring.io/spring-framework/docs/2.5.5/reference/aop.html) 기반으로 동작
- 이를 위해서는 @EnableCaching 설정이 필수
- 기본전략은 Look Aside + Write Through 패턴이다.

---

## 2. 사전 준비

이 글에서는 Redis를 이용해 예제 코드를 작성하기 때문에 사전 준비가 필요하다.

**별도의 Redis를 사용하지 않는 경우에는 생략**해도 된다.

### 2-1. 로컬에 Redis 설치

[GitHub - yeon-06/practice-redis](https://github.com/yeon-06/practice-redis)

### 2-2. Redis 설정

편의를 위해 Spring Data Redis를 이용했다. Gradle의 경우, build.gradle에 아래 설정을 추가하면 된다.

```groovy
implementation 'org.springframework.boot:spring-boot-starter-data-redis'
```

Redis 사용을 위한 설정 파일을 만든다. RedisCacheConfiguration을 여러개 설정할 수도 있고, 더 다양한 옵션을 설정할 수도 있지만 자세한건 생략한다.

```java
@Configuration
public class CacheConfiguration {

    @Bean
    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
        return builder -> builder.withCacheConfiguration("customerCache", customerCacheConfiguration());
    }

    private RedisCacheConfiguration customerCacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(1));// 캐싱 시간을 1분으로 설정한다.
    }
}
```

---

## 3. 예제 코드

### 3-1. @EnableCaching 추가

메인 클래스에 @EnableCaching을 추가해주었다.

```java
**@EnableCaching**
@SpringBootApplication
public class RedisApplication {
    public static void main(String[] args) {
        SpringApplication.run(RedisApplication.class, args);
    }
}
```

> @EnableCaching
> 

### 3-2. 캐싱할 객체 생성

고객 정보를 캐싱한다고 가정한다. Customer와 CustomerRepository를 만들었다.

```java
public class Customer {
    private Long id;
    private String name;
    private String email;
    private LocalDate birthday;

// 생성자, getter, setter, ...
}
```

~~(DB와 연동하기 귀찮은 관계로)~~ Map을 이용해 Repository를 구현했다.

```java
@Repository
public class CustomerRepository {

    private Long id = 1L;
    private final Map<Long, Customer> customers = new HashMap<>();

    public void save(Customer customer) {
        customer.setId(id);
        customers.put(id, customer);
        id++;
	}

    public Customer getById(Long id) {
        return customers.get(id);
    }

    public void deleteById(Long id) {
        customers.remove(id);
    }

    public void updateEmail(Long id, String email) {
        Customer customer = getById(id);
        customer.setEmail(email);
        return customer;
    }
}
```

### 3-3. @Cacheable 예제

이제 캐싱할 준비가 모두 끝났다. 캐싱하고 싶은 데이터를 반환하는 메서드에 @Cacheable을 붙이기만 하면 된다. 만약 **이미 캐싱된 데이터를 요청하는 경우, 메서드 호출을 생략**하고 캐시에서 결과를 가져온다.

```java
@Service
public class CacheService {

    private final CustomerRepository customerRepository;

    public CacheService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    **@Cacheable(key = "#id", value = "customerCache")**
    public Customer findCustomerById(Long id) {
        return customerRepository.getById(id);
    }
}
```

@Cacheable 주요 속성

| 속성 | 설명 |
| --- | --- |
| value | 캐시로 사용될 이름 |
| key | 캐시의 key |
| condition | 캐시를 저장할 조건 |
| unless | 캐시를 저장하지 않을 조건 |
| cacheManger | 사용할 캐시 매니저의 이름 지정 |
| cacheResolver | 사용할 캐시 리졸버의 이름 지정 |

### 3-4. @CacheEvict 예제

@CacheEvict는 캐싱된 데이터를 **삭제**하기 위해 사용한다. 설정에서 직접 캐싱 시간을 지정할 수도 있지만, @CacheEvict를 이용하면 메서드를 호출할 때 직접 제거해줄 수 있다.

```java
**@CacheEvict(key = "#id", value = "customerCache")**
public void deleteCustomerById(Long id) {
    customerRepository.deleteById(id);
}
```

@CacheEvict 주요 속성

| 속성 | 설명 |
| --- | --- |
| value | 캐시 이름 |
| key | 캐시의 key |
| condition | 캐시를 삭제할 조건 |
| allEntries | 캐시 전체 삭제 여부 |
| beforeInvocation | 메서드 실행 전 캐시 삭제 여부 |
| cacheManger | 사용할 캐시 매니저의 이름 지정 |

### 3-5. @CachePut 예제

@Cacheable은 이미 캐싱된 데이터가 존재하면 메서드를 호출하지 않았다. @CachePut은 **메서드는 항상 실행되고 결과는 캐시**된다. (캐시 내용을 업데이트 한다.) 

정보가 수정될때 응답이 저장되어있는 Cache가 제거되면서 Cache miss가 발생할 수 있게 해주고, `데이터의 실시간성을 확보하여 Cache와 DB의 데이터가 일치`하게 된다. 

```java
**@CachePut(key = "#id", value = "customerCache")**
public Customer updateCustomerById(Long id, String email) {
    return customerRepository.updateEmail(id, email);
}
```

@CachePut 주요 속성

| 속성 | 설명 |
| --- | --- |
| value | 캐시 이름 |
| key | 캐시의 key |
| condition | 캐시를 저장할 조건 |
| unless | 캐시를 저장하지 않을 조건 |
| cacheManger | 사용할 캐시 매니저의 이름 지정 |

### 3-6. 추가 예제

여러 캐싱 어노테이션을 사용하고 싶다면 @Caching을 이용해야 한다.

```java
@Caching(evict = {
    @CacheEvict("emails"),
    @CacheEvict(value="customerCache", key="#customer.email")
})
public String getEmail(Customer customer) {...}
```