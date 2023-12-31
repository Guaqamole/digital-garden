---
title: API를 왜 사용하고 어떻게 사용할까요
date: 2023-11-25
draft: false
tags:
  - DevFundamental
  - Concept
complete: true
---
모든것을 한곳에서 실행하는 모놀리식 <sup>monolithic</sup> 애플리케이션의 시대는 끝났기 때문이다.

> [!warning] 
> 모놀리식 애플리케이션이 완전히 사라졌다거나 앞으로 만들어지지 않는다는 말은 아니다. 다음과 같은 환경에서는 다양한 상황에서 단일 패키지로 수많은 기능을 제공하는 모놀리식 애플리케이션이 여전히 유효하다:
> - 도메인과 도메인의 경계가 모호할때
> - 제공된 기능이 긴밀하게 결합됐으며, 모듈간 상호작용에서 유연함보다 성능이 절대적으로 즁요할때
> - 관련된 모든 기능의 애플리케이션 확장 요구사항 <sup>Scaling Requirement</sup> 이 알려져있고 직관적일때
> - 기능이 변동성이 없을 때, 즉 변화가 느리거나 변화범위가 제한적일 때와 둘 다일때

마이크로서비스에서는 기능을 작고 응집력있는 청크 <sup>chunk</sup> 로 분할해 디커플링 <sup>decoupling</sup> 한다. 따라서 더 빠른 배포와 용이한 유지보수가 가능한 유연하고 튼튼한 시스템을 구축하게 된다.

어떤 마이크로 서비스 분산 시스템에서든 통신이 핵심이다. 어떤 서비스도 섬처럼 고립되어 동작하지 않는다. 애플리케이션 / 마이크로서비스를 연결하는 수많은 동작방식이 있지만, 일상 생활에서 자주 사용하는 인터넷으로 예를 들어본다.

인터넷은 우선 통신을 위한 수단으로 만들었습니다. 인터넷의 전신인 ARPANET <sup>Advanced Research Projects Agency Network</sup> 의 설계자들은 **중대한 장애**가 발생하더라도 시스템 간 통신이 유지되게 하려고 했다. ARPANET과 HTTP 기반의 접근방식은 유사하다. 오늘날 사용하는 시스템은 유선을 통해 다양한 리소스를 생성, 조회 업데이트 삭제하는등의 기능을 수행한다.

오늘날 가장 많이 사용하는 HTTP 통신으로 객체를 다루는 일은, 로이 필딩이 2000년 박사 학위 논문에서 1994년의 HTTP 객체 모델을 기반으로 REST 원칙을 제시했다는 것 말고는 REST API의 역사를 더 깊이 파고들지 않겠다.

## 그래서 왜 REST가 중요한건데?
앞서 언급한 바와 같이, API는 개발자가 작성한 인터페이스이다. API를 통해 라이브러리, 다른 애플리케이션, 서비스 같은 다른 코드를 사용할 수 있다. 그런데 REST API에서 REST란 무엇인가?

> [!summary] REST의 정의
> Representational State Transfer의 약어이다. 애플리케이션 A가 B와 통신할 때, A는 B에서 통신 시점의 ‘현재 상태’ <sup>state</sup> 를 가져온다. A는 B가 통신 호출간 상태를 유지하리라고 가정하지 않는다. A는 B에 요청 할 때 마다 관련 상태의 표현을 제공한다.
> → 이로인해 생존 가능성과 회복 탄련성을 향상 시킨다.
> → 이렇게 하는 이유는 통신 문제가 발생하거나 B가 충동해 재시작돼도, A와 상호작용한 현재상태를 잃어버리지 않기 때문이다. A가 다시 요청해 두 애플리케이션이 중단된 곳에서 다시 통신을 이어갈 수 있다.
##### 추가 설명
- A는 B에서 통신 시점의 ‘현재 상태’ state 를 가져온다
	- 통신 시점의 데이터의 상태를 말한다.
	- 데이터의 상태란 주로 리소스의 상태를 의미하는데, 여기서 리소스라는건 네트워크를 통해 식별될 수 있는 모든것을 의미한다.
	- 웹 이미지, 데이터베이스 엔트리등
- 상태의 표현의 의미
	- 서비스에서 클라이언트와 서버 간의 통신에서 전달되는 데이터의 형태나 포맷
	- 웹에서는 JSON 또는 XML 형식의 데이터가 많이 사용
- REST는 상태를 유지하지 않는 (stateless) 특성을 가지고 있다. 각요청은 서버의 의해 독립적으로 처리되며 클라이언트의 상태를 서버에 저장하지 않는다. 이로인해 서버측에서 확장성을 향상시키고, 장애가 발생했을 때의 회복 탄력성을 향상 시킬 수 있다.

## API, HTTP 메서드 스타일
REST API는 주로 다음의 HTTP 메서드를 기반으로 한다:
- `POST` : 생성
- `GET` : 읽기
- `PUT` : 업데이트
- `PATCH` : 업데이트
- `DELETE` : 삭제
때로는 `OPTIONS`, `HEAD` 메서드도 사용한다. 옵션의 경우 리퀘스트와과 리스폰스에서 사용할 수 있는 통신 옵션을 조회하고, 헤드는 리스폰스 메세지에서 바디를 뺀 응답 헤더를 조회하는데 사용된다.