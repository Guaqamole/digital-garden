---
title: JPA Entity를 Http Response Dto로 절대 사용하지 말아야 하는 이유
date: 2023-12-13
draft: false
tags:
  - Springboot
  - DevFundamental
complete: true
---
몇몇 개인 블로그에서 JPA Entity를 Http Response로 리턴하는 사례를 보고 이런 Anti-Pattern은 꼭 알려야 겠다는 생각이 들었습니다. 그 잘못된 정보의 포스팅을 보고 개발 업무에 적용하는 사례가 생기면 안되니 꼭 제대로 정정했으면 하는 바램입니다.

왜 Http Response Dto로 Entity를 사용하면 안되는 이유를 알아보시죠.

1. Entity 객체를 Json으로 Serialize할때 Query의 실행으로 시스템 부하가 올라갑니다.
2. Entity <-> Entity 간 양방향으로 Relationship이 걸린경우 무한루프가 발생하면서 시스템이 Down 상태가 됩니다.
3. Entity를 Serialize하기 위해서 추가하는 코드가 아키텍처링 혼선을 만듭니다.
4. Client에 전달해서는 안되는 불필요한 정보가 리턴됩니다.

#### 1. Entity 객체를 Json으로 Serialize할때 Query의 실행으로 시스템 부하가 올라갑니다.

Entity는 변수와 DB 컬럼을 매핑합니다. 그런데 복잡한 Modeling으로 가면 Entity 끼리 Relationship으로 매핑을 해줘야 할때가 있습니다. 바로 @OneToOne, @OneToMany @ManyToOne등의 Annotation입니다. 데이터 로딩은 EAGER(미리), LAZY(필요시) Loading 설정을 해주지요. 여기까지는 전혀 문제가 없습니다. 

바로 이렇게 Relationship이 엮여 있는 Entity를 Respnose로 리턴하게되면 JSON Serialize할때 Relationship에 연결된 모든 정보를 Query를 실행해서 Loading하게 됩니다. 당연히 Query 실행이 많아지기 때문에 웹서버와 DB에 부하가 증가합니다.

#### 2. Entity <-> Entity간 양방향으로 Relationship이 걸린 경우 무한루프가 발생하면서 시스템이 Down됩니다.

위의 상황에서 조금 더 디테일한 케이스로 들어가면 Entity <-> Entity간 양방향으로 Relationship이 걸린 경우 무한루프가 발생됩니다. 설명을 위해 극단적으로 표현한 코드입니다. ㅎ 

```java
@Entity
class AAA {
	
    @Column(name="col_A1")
    private String colA1;
    @Column(name="col_A2")
    private String colA2;
    
    @OneToMany
    @JoinColumn("col_A1")
    private List<BBB> bbbList;
}


@Entity
class BBB {
	
    @Column(name="col_B1")
    private String colB1;
    
    @ManyToOne
    @JoinColumn("col_A2")
    private AAA aaa;
{
```

만약에 AAA를 Response로 전달하려면 시스템 내부에서는 다음과 같은 순서로 실행됩니다.

1. JPA Repository에서 대상하는 AAA를 Select Query로 로딩하고 AAA Entity 객체를 생성한다.
2. Json Lib에서는 AAA를 Serialize를 시도한다. @OneToMany 발견
3. 'col_A1' 컬럼과 Join된 Query를 BBB 테이블에 실행한다.
4. (지금부터 엄청난 일이 생깁니다!!) 3에서 실행한 BBB 데이터를 객체로 변환한다.
5. 4의 객체를 Json Serialize를 한다. @ManyToOne 발견
6. `List<BBB>`의 각각의 객체가 'col_A2'를 참조하는 AAA를 조회하는 Query를 각각 실행한다.
7. 6의 AAA에서 다시 @OneToMany에 대한 Query를 실행한다.
8. ... 무한 반복. ㅠㅠ

DB Modeling과 JPA Entity 설계를 잘못하면 티가 안나다가 이런 트리거를 만나면 시스템에서 엄청난 장애를 유발하게 됩니다. 무한루프가 계속 실행되다가 Load가 올라가고 Latency가 점점 올라가면서 펑!.. Blocker Incident.. ㅠ

#### 3. Entity를 Response Dto로 하기 위한 추가 코드가 아키텍처링 혼선을 만듭니다.

2번에서 무시무시한 이야기를 했습니다. 그런데 2차적인 문제는 이것을 위해서 추가되는 코드가 아키텍처를 망치는 요소들입니다. 우리가 Spring Framework 기반으로 개발을하면 'Controller < Service < Repository' 구조로 Layer를 구성합니다. 그런데 Entity가 Controller에서 참조되고 Json Serialize를 위해서 @Transactional이 추가되면서 DB Access를 허용하는 코드가 추가됩니다. DB의 Transaction은 Service Layer에서 실행되고 Repository가 리턴한 Entity는 Dto로 변환되서 Service가 Controller에게 리턴해주는 아키텍처가 무너지게 되는 것입니다. 하나의 시스템이 가져가는 아키텍처는 팀 멤버들이나 시스템에서 지켜져야하는 약속과도 같은데 이런 코드가 생긴다면 안되겠죠. Clean Architecture를 한번이라도 읽어보셨다면 이런 코드는 안만들겠죠.

![Clean Architecture - Robert C. Martin](https://blog.kakaocdn.net/dn/cgUaX7/btson1tZQnv/V8JRbLGyrtpNUDwXvbThVK/img.jpg)

위의 이미지에서 보듯이 Entity가 Controller로 바로 전달되지 않는 것을 볼 수 있습니다.

#### 4. Client에 전달해서는 안되는 불필요한 정보가 리턴됩니다. - 보안에 Big Hole!

과거에 발생한 개인정보 유출 보안사고중에서 비슷한 사례가 있습니다. 회원 정보를 제공하는 API에서 회원 DB에 있는 모든 정보(Entity)를 그대로 Dto로 만들어서 Client에게 전달했습니다. 해커는 이점을 노려서 특정 계정으로 인증을 한뒤에 Crawling Script로 회원 API의 파라미터 정보를 바꿔가면서 API를 호출해서 고객정보를 획득해간 사건입니다. 보안사고가 Entity를 Response 그대로 사용했는지 동일한 멤버 변수로 구성된 별도 Dto를 만들어서 제공을 했는지 중요하지 않습니다. 핵심은 'DB Fields = Dto Fields'라는 사실입니다.

API로 Client에 정보를 제공할때는 필드 하나하나에 어떤 데이터가 담기고 중요도가 어느정도 인지 검토해야 합니다. Client에 제공할 데이터와 내부적으로만 사용하는 데이터는 반드시 분리되야 합니다.