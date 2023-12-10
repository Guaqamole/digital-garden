---
title: JPA
date: 2023-11-30
draft: false
tags:
  - Backend
  - Springboot
  - Java
  - ORM
complete: false
---

> [!success] JPA
> Java Persistence API는 자바 진영의 ORM 기술 표준으로 채택된 인터페이스의 모음이다. ORM이 큰 개념이라면, JPA는 더 구체화된 스펙을 포함한다. 즉, JPA 또한 실제로 동작하는 것이 아니고 어떻게 동작해야하는지 매커니즘을 정리한 표준 명세이다.

![](https://i.imgur.com/Ef6xUD2.png)

JPA의 매커니즘을 보면 내부적으로 JDBC를 사용한다. 개발자가 직접 JDBC를 구현하면 SQL에 의존하게되는 문제등이 있어 개발의 효율성이 떨어지기 때문이다. JPA는 이같은 문제점을 보완해서 개발자가 대신 적절한 SQL을 생성하고 데이터베이스를 조작해서 객체를 자동 매핑하는 역할을 수행한다.

## JPA 기반 구현체
JPA 기반의 구현체는 대표적으로 세가지가 있다:
- Hibernate
- EclipseLink
- DataNucleus


---



# 영속성 컨텍스트

### 영속성 컨텍스트란?

영속성 컨텐스트란 `엔티티를 영구 저장하는 환경`이라는 뜻이다. 애플리케이션과 데이터베이스 사이에서 객체를 보관하는 가상의 데이터베이스 같은 역할을 한다. 엔티티 매니저를 통해 엔티티를 저장하거나 조회하면 엔티티 매니저는 영속성 컨텍스트에 엔티티를 보관하고 관리한다.

`em.persist(member);`

- 엔티티 매니저를 사용해 회원 엔티티를 영속성 컨텍스트에 저장한다는 의미!

영속성 컨텍스트의 특징

- 엔티티 매니저를 생성할 때 하나 만들어진다.
- 엔티티 매니저를 통해서 영속성 컨텍스트에 접근하고 관리할 수 있다.

## 엔티티의 생명주기

- 비영속(new/transient): 영속성 컨텍스트와 전혀 관계가 없는 상태
- 영속(managed): 영속성 컨텍스트에 저장된 상태
- 준영속(detached): 영속성 컨텍스트에 저장되었다가 분리된 상태
- 삭제(removed): 삭제된 상태
    
![](https://i.imgur.com/FdOQqkl.png)

    

### 비영속

- 엔티티 객체를 생성했지만 아직 영속성 컨텍스트에 저장하지 않은 상태를 비영속(new/transient)라 한다.

```java
Member member = new Member();
```

### 영속

- 엔티티 매니저를 통해서 엔티티를 영속성 컨텍스트에 저장한 상태를 말하며 영속성 컨텍스트에 의해 관리된다는 뜻이다.

```java
em.persist(member);
```

### 준영속

- 영속성 컨텍스트가 관리하던 영속 상태의 엔티티 더이상 관리하지 않으면 준영속 상태가 된다. 특정 엔티티를 준영속 상태로 만드려면 `em.datach()`를 호출하면 된다.

```java
// 엔티티를 영속성 컨텍스트에서 분리해 준영속 상태로 만든다.
em.detach(member);
// 영속성 콘텍스트를 비워도 관리되던 엔티티는 준영속 상태가 된다.
em.claer();
// 영속성 콘텍스트를 종료해도 관리되던 엔티티는 준영속 상태가 된다.
em.close();
```

- 특징
    - 1차 캐시, 쓰기 지연, 변경 감지, 지연 로딩을 포함한 영속성 컨텍스트가 제공하는 어떠한 기능도 동작하지 않는다.
    - 식별자 값을 가지고 있다.
    

### 삭제

- 엔티티를 영속성 컨텍스트와 데이터베이스에서 삭제한다.

```java
em.remove(member);
```

## 영속성 컨텍스트의 특징

### **영속성 컨텍스트의 식별자 값**

영속성 컨텍스트는 엔티티를 식별자 값으로 구분한다. 따라서 영속 상태는 식별자 값이 반드시 있어야 한다.

### **영속성 컨텍스트와 데이터베이스 저장**

JPA는 보통 트랜잭션을 커밋하는 순간 영속성 컨텍스트에 새로 저장된 엔티티를 데이터 베이스에 반영하는데 이를 `flush`라 한다.

**영속성 컨텍스트가 엔티티를 관리하면 다음과 같은 장점이 있다.**

1. 1차 캐시
2. 동일성 보장
3. 트랙잭션을 지원하는 쓰기 지연
4. 변경 감지
5. 지연 로딩

### **1차 캐시**
![](https://i.imgur.com/v72sSxG.png)


영속성 컨텍스트 내부에는 캐시가 있는데 이를 `1차 캐시`라고 한다. 영속 상태의 엔티티를 이곳에 저장한다. 1차 캐시의 키는 식별자 값(데이터베이스의 기본 키)이고 값은 엔티티 인스턴스이다. 조회하는 방법은 다음과 같다.

```java
// em.find(엔티티 클래스 타입, 식별자 값);
Member member = em.find(Member.class, "member1");
```

**조회의 흐름**

1. 1차 캐시에서 엔티티를 찾는다

2. 있으면 메모리에 있는 1차 캐시에서 엔티티를 조회한다.

3. 없으면 데이터베이스에서 조회한다.

![](https://i.imgur.com/HGK0TLg.png)


4. 조회한 데이터로 엔티티를 생성해 1차 캐시에 저장한다. (엔티티를 영속상태로 만든다)

5. 조회한 엔티티를 반환한다.

### 영속 엔티티의 동일성 보장

영속성 컨텍스트는 엔티티의 동일성을 보장한다.

```java
Member a = em.find(Member.class, "member1");
Member b = em.find(Member.class, "member1");
System.out.print(a==b) // true
```

> 동일성 비교 : 실제 인스턴스가 같다. ==을 사용해 비교한다.

> 동등성 비교 : 실제 인스턴스는 다를 수 있지만 인스턴스가 가지고 있는 값이 같다. `equals()`메소드를 구현해서 비교한다.

### 트랜잭션을 지원하는 쓰기 지연(transactional write-behind)

```sql
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();

// 엔티티 매니저는 데이터 변경 시 트랜잭션을 시작해야 한다.
transaction.begin();    // 트랜잭션 시작

em.persist(memberA);
em.persist(memberB);
// 여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

// 커밋하는 순간 데이터베이스에 INSERT SQL을 보낸다.
transaction.commit();   // 트랜잭션 커밋
```

![](https://i.imgur.com/pw7sIre.png)


- `em.find(member)`를 사용해 member를 저장해도 바로 INSERT SQL이 DB에 보내지는 것이 아니다. 엔티티 매니저는 트랜잭션을 커밋하기 직전까지 내부 쿼리 저장소에 INSERT SQL을 모아둔다. 그리고 트랜잭션을 커밋할 때 모아둔 쿼리를 DB에 보낸다. 이것을 트랜잭션을 지원하는 `쓰기 지연`이라 한다.

### 변경 감지
![](https://i.imgur.com/279IrJ9.png)


JPA로 엔티티를 수정할 때는 단순히 엔티티를 조회해서 데이터를 변경하면 된다.

변경감지의 흐름

1. 트랙잭션을 커밋하면 엔티티 매니저 내부에서 먼저 플러시가 호출된다.

2. 엔티티와 스냅샷을 비교하여 변경된 엔티티를 찾는다.

3. 변경된 엔티티가 있으면 수정 쿼리를 생성해서 쓰기 지연 SQL 저장소에 저장한다.

4. 쓰기 지연 저장소의 SQL을 플러시한다.

5. 데이터베이스 트랜잭션을 커밋한다.

> 변경 감지는 영속성 컨텍스트가 관리하는 영속 상태의 엔티티만 적용된다.
> 

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
transaction.begin();

Member member = em.find(Member.class, "member1");
member.setName("노영삼");

transaction.commit();
```

### 플러시

플러시는 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영한다. 영속성 컨텍스트의 엔티티를 지우는게 아니라 변경 내용을 데이터베이스에 동기화하는 것이다.

플러시의 흐름

1. 변경 감지가 동작해서 스냅샷과 비교해서 수정된 엔티티를 찾는다.

2. 수정된 엔티티에 대해서 수정 쿼리를 만들거 SQL 저장소에 등록한다.

3. 쓰기 지연 SQL 저장소의 쿼리를 데이터베이스에 전송한다.

**플러시하는 방법**

1. `em.flush()`

2. 트랙잭션 커밋시 자동 호출

3. JPQL 쿼리 실행시 자동 호출

# 성능 최적화

- 기본원칙
    - 성능 최적화의 기본은 `요청 Query 수를 줄이는 것`

### 지연로딩과 즉시로딩

- 연관관계가 걸려있는 경우, 무조건 `지연로딩(FetchType.Lazy)`을 통해 조회한다. `즉시로딩(FetchType.Eager)`은 사용하지 않는다.
    - @ManyToOne, @OneToOne과 같이 @XXXToOne 어노테이션들은 기본이 즉시 로딩(EAGER) 이다.
    - **꼭 LAZY로 명시적으로 설정해서 사용하자.**
    - 그 까닭은 즉시 로딩을 적용하면 **예상하지 못한 SQL이 발생**한다.
    - 즉시 로딩은 **JPQL에서 N+1 문제**를 일으킨다.
    - 즉시 로딩은 무조건 조인해서 가져온다. 불필요한 데이터를 많이 불러올 가능성이 높다.
    - **N + 1의 문제의 의미**는 **쿼리를 1개** 날렸는데, 그것 때문에 **추가 쿼리가 N개** 나간다는 의미이다.

```java
Team team1 = new Team();
team1.setName("teamA");
em.persist(team1);

Team team2 = new Team();
team2.setName("teamB");
em.persist(team2);

Member member1 = new Member();
member1.setUsername("memberA");
em.persist(member1);
member1.changeTeam(team1);

Member member2 = new Member();
member2.setUsername("memberB");
em.persist(member2);
member2.changeTeam(team2);

em.flush();
em.clear();

List<Member> members = em.createQuery("select m from Member m", Member.class).getResultList();
tx.commit();
```

```java
Hibernate:
   /* select
       m
   from
       Member m */ select
          member0_.id as id1_4_,
          member0_.createdBy as createdB2_4_,
          member0_.createdDate as createdD3_4_,
          member0_.lastModifiedBy as lastModi4_4_,
          member0_.lastModifiedDate as lastModi5_4_,
          member0_.age as age6_4_,
          member0_.description as descript7_4_,
          member0_.roleType as roleType8_4_,
          member0_.team_id as team_id11_4_,
          member0_.name as name9_4_
       from
          Member member0_
Hibernate:
   select
      team0_.id as id1_8_0_,
      team0_.createdBy as createdB2_8_0_,
      team0_.createdDate as createdD3_8_0_,
      team0_.lastModifiedBy as lastModi4_8_0_,
      team0_.lastModifiedDate as lastModi5_8_0_,
      team0_.name as name6_8_0_
   from
      Team team0_
   where
      team0_.id=?
Hibernate:
   select
      team0_.id as id1_8_0_,
      team0_.createdBy as createdB2_8_0_,
      team0_.createdDate as createdD3_8_0_,
      team0_.lastModifiedBy as lastModi4_8_0_,
      team0_.lastModifiedDate as lastModi5_8_0_,
      team0_.name as name6_8_0_
   from
      Team team0_
   where
      team0_.id=?
```

## 지연로딩

- 동작원리
    - `다대일 관계`, `일대일 관계`, `일대다`, `다대다 관계` 모두 마찬가지다.
    - 객체 조회 시 항상 연관된 객체까지 함께 조회하는 것은 효율적이지 않다. 그래서 JPA는 엔티티가 실제로 사용되기 전까지 데이터베이스 조회를 지연할 수 있도록 제공하는데 이를 **"지연 로딩"** 이라고 한다.
    - 가능한 배경에는 Lazy 로딩 설정이 되어있는 엔티티는 로딩되는 시점에 `프록시 객체`로 가져온다. 후에 **실제 객체를 사용하는 시점에(Team을 사용하는 시점에) 초기화가 된다. DB에 쿼리가 나간다**.
    - 예시
        - getTeam()으로 Team을 조회하면 프록시 객체가 조회가 된다.
        - getTeam().getXXX()으로 팀의 필드에 접근 할 때, 쿼리가 나간다.
        
        ```java
        Team team = new Team();
        team.setName("teamA");
        em.persist(team);
        
        Member member = new Member();
        member.setUsername("memberA");
        em.persist(member);
        
        member.changeTeam(team);
        
        em.flush();
        em.clear();
        
        Member findMember = em.find(Member.class, member.getId());
        
        System.out.println(findMember.getTeam().getClass());
        System.out.println("TEAM NAME : " + findMember.getTeam().getName());
        ```
        
        ```java
        Hibernate:
           select
              member0_.id as id1_4_0_,
              member0_.createdBy as createdB2_4_0_,
              member0_.createdDate as createdD3_4_0_,
              member0_.lastModifiedBy as lastModi4_4_0_,
              member0_.lastModifiedDate as lastModi5_4_0_,
              member0_.age as age6_4_0_,
              member0_.description as descript7_4_0_,
              member0_.locker_id as locker_10_4_0_,
              member0_.roleType as roleType8_4_0_,
              member0_.team_id as team_id11_4_0_,
              member0_.name as name9_4_0_
           from
              Member member0_
           where
              member0_.id=?
               
        class hello.jpa.Team$HibernateProxy$z4JtUeLD // 프록시 객체
        
        Hibernate:
           select
              team0_.id as id1_8_0_,
              team0_.createdBy as createdB2_8_0_,
              team0_.createdDate as createdD3_8_0_,
              team0_.lastModifiedBy as lastModi4_8_0_,
              team0_.lastModifiedDate as lastModi5_8_0_,
              team0_.name as name6_8_0_
           from
              Team team0_
           where
              team0_.id=?
               
        TEAM NAME : teamA
        ```
        

- 그런데 즉시로딩이나 지연로딩이나, 결국 쿼리를 여러번 호출하는 건 마찬가지 아닌가요?
    - 결론은 맞다. 그러나 앞서 언급했듯 예측할 수 없기 때문에 즉시 로딩은 사용하지 않는다.
    - 여러번 호출하는 쿼리의 수를 줄이는 방법의 90%는 페치조인을 사용하는 것이다.
    - 그 외, DTO를

## 페치조인

- 다대일
    - 여기서 fetch는 `InnerJoin`과 같다. 지연로딩 대상을 SQL Join을 사용해서 호출해 가져온다.
    
    ```sql
    em.createQuery("select m from Member m join fetch m.team t where m.id = :id", Member.class).setParameter("id", memberId).getSingleResult();
    ```
    
    ```sql
    select
            m1_0.id,
            m1_0.created_date,
            m1_0.modified_date,
            m1_0.name,
            t1_0.team_id,
            t1_0.created_date,
            t1_0.modified_date,
            t1_0.name 
        from
            member m1_0 
        join
            team t1_0 
                on t1_0.team_id=m1_0.team_id 
        where
            m1_0.id=?
    ```
    

- 일대다 (컬렉션 페치조인)
    - 기본
        - `distict`를 사용한다. JPA의 distinct는 SQL에 distinct를 추가하고 더해서 같은 엔티티가 조회되면, 애플리케이션에서 중복을 걸러준다.
        
        ```sql
        em.createQuery(
            "select distinct o from Order o" +
                " join fetch o.member m" +
                " join fetch o.delivery d" +
                " join fetch o.orderItems oi" +
                " join fetch oi.item i", Order.class)
        .getResultList();
        ```
        
    - 단점
        - 페이징 처리가 되지 않는다.
            - 컬렉션 페치 조인의 경우, 페이징이 불가능하다. 기본적으로 일대다 관계에선 값이 해당 갯수만큼 데이터가 추가로 조회되기 때문이다.
            - **앞서 언급한 ToOne**(OneToOne, ManyToOne) 관계는 row수를 증가시키지 않으므로 페이징 쿼리에 영향을 주지 않는다.
    - 해결방법
        
        ```sql
        public List<Order> findAllWithMemberDelivery(int offset, int limit) {
            return em.createQuery(
              "select o from Order o" +
                      " join fetch o.member m" +
                      " join fetch o.delivery d", Order.class)
              .setFirstResult(offset)
              .setMaxResults(limit)
              .getResultList();
        }
        ```
        
        - 지연 로딩 성능 최적화를 위해  hibernate.default_batch_fetch_size , @BatchSize 옵션을 적용 가능하다.
        - 이 옵션을 사용하면 컬렉션이나, 프록시 객체를 한꺼번에 설정한 size 만큼 IN 쿼리로 조회한다.
    

## DTO 직접 조회

- 대부분의 경우 x대일 조회 성능은 페치 조인을 통해 최적화한다. 이 방법은 주로 특정한 화면에 딱 맞는 API를 제공해야할 때 사용하는 특수한 방법이다. 아래와 같이, 데이터베이스에서 조회한 엔티티를 즉시 DTO로 매핑한다.
- 페치조인을 통해 불러오는 것보다 불러오는 값이 줄어든다.

```sql
public List<OrderSimpleQueryDto> findOrderDtos() {
    return em.createQuery(
        "select new jpabook.jpashop.repository.order.simplequery.OrderSimpleQueryDto(o.id, m.name, o.orderDate, o.status, d.address)" +
                " from Order o " +
                " join o.member m" +
                " join o.delivery d", OrderSimpleQueryDto.class
    ).getResultList();
}
```

## 추가로 언급은 안했지만

- 기본적으로 엔티티는 클라이언트의 직접적인 조회 대상이 되어선 안된다. 조회 요청에 대한 서버의 응답 값은 DTO로 변환되어 반환되어야 한다. 엔티티를 직접 반환하면, 엔티티가 뷰에 종속되기 때문이다.

# OSIV

- OSIV (Open Session In View)
    
![](https://i.imgur.com/XcqblE3.png)

    
- 정의
	- Presentational Layer에서 엔티티가 영속 상태를 허용한다.
- 장점
	- OSIV 전략은 트랜잭션 시작처럼 최초 데이터베이스 커넥션 시작 시점부터 API 응답이 끝날 때 까지 영속성 컨텍스트와 데이터베이스 커넥션을 유지한다. 그래서 View Template이나 API 컨트롤러에서 지연 로딩이 가능하다.
- 단점
	- 그런데 이 전략은 너무 오랜시간동안 데이터베이스 커넥션 리소스를 사용하기 때문에, 실시간 트래픽이 중요한 애플리케이션에서는 커넥션이 모자랄 수 있다. 이것은 결국 장애로 이어진다.
	- 예를 들어서 컨트롤러에서 외부 API를 호출하면 외부 API 대기 시간 만큼 커넥션 리소스를 반환하지 못하고, 유지해야 한다.
- 실무 팁
	- 고객 서비스의 실시간 API는 OSIV를 끄고, ADMIN 처럼 커넥션을 많이 사용하지 않는 곳에서는 OSIV를 키는 것이 좋다.
- 설정방법
        
	```sql
	spring.jpa.open-in-view: false
	```
        
![](https://i.imgur.com/UCrdLfW.png)

# 결론
- 즉시로딩보다 지연로딩을 사용하자. 이유는 즉시로딩을 사용할 경우 N+1 문제는 물론 사용하지 않는 엔티티에 대한 불필요한 조회까지 실행되기 때문에 연관관계가 있는 경우 지연로딩을 사용해야 된다. 그리고 즉시로딩의 경우, JPQL에서 n+1 문제가 발생하므로 fetch를 통한 성능 최적화가 불가능함.