---
title: ORM
date: 2023-11-30
draft: false
tags:
  - Backend
  - ORM
complete: false
---

> [!success] ORM
> Object Relational Mapping의 줄임말로 객체 관계 매핑을 의미한다. 자바와 같은 객체 지향 언어에서 의미하는 객체와 RDB의 테이블을 자동으로 매핑하는 방법이다. 
> 

여기서 말하는 객체는 클래스를 의미한다. 클래스는 데이터 베이스의 테이블과 매핑하기 위해 만들어진것이 아니기 때문에 RDB 테이블과 어쩔 수 없는 불일치가 존재한다. <mark style="background: #C6AB16;">ORM은 이 둘의 불일치와 재약 사항을 해결하는 역할을 수행한다.</mark> 또한, ORM을 이용하면 쿼리문 작성이 아닌 코드로 데이터를 조작 할 수 있다.

![](https://i.imgur.com/qfnX7Wp.png)

## ORM의 장점
### 데이터 베이스 쿼리를 객체지향적으로 조작
- 쿼리문을 작성하는 양이 현저히 줄어 개발 비용이 줄어든다.
- 객체지향적으로 데이터베이스에 접근 할 수 있어 코드의 가독성을 높인다.
### 재사용 및 유지보수가 편리하다
- 매핑된 객체는 모두 독립적으로 작성되어 있어 재사용이 용이하다.
- 객체들은 각 클래스로 나뉘어 유지보수가 수월하다.
### 데이터베이스에 대한 종속성이 줄어든다
- 자동 생성된 SQL문은 객체를 기반으로 데이터베이스 테이블을 관리하기 때문에 데이터베이스에 종속적이지 않다.
- 데이터베이스를 교체하는 상황에서도 비교적 적은 리스크를 부담

## ORM의 단점
…