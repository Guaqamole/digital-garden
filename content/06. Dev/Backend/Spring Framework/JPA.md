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