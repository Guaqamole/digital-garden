---
title: Spring MVC
date: 2023-12-09
draft: false
tags:
  - Springboot
  - MVC
complete: true
---
### **Intro**

스프링 프레임워크의 모듈 중에는 웹 계층을 담당하는 몇 가지 모듈이 있다.

웹 계층에 서블릿(Servlet) API를 기반으로 클라이언트의 요청을 처리하는 모듈이 있는데 이를 스프링 웹 MVC(spring-web-mvc) 또는 스프링 MVC라고 한다.

Spring MVC는 클라이언트의 요청을 편리하게 해주는 기능을 제공한다.

**서블릿(Servlet)이란?**

서블릿은 클라이언트의 요청을 처리하도록 특정 규약에 맞춰 Java 코드로 작성하는 클래스 파일이다.

아파치 톰캣(Apache Tomcat)은 이러한 서블릿들이 웹 애플리케이션으로 실행할 수 있도록 해주는 서블릿 컨테이너(Servlet Container) 중 하나이다.

Spring MVC 내부에서는 서블릿을 기반으로 웹 애플리케이션을 동작하며, 스프링 부트는 기본적으로 아파치 톰캣이 내장되어 있다.

### **MVC란? (MVC: Model, View, Controller)**

MVC 패턴은 애플리케이션을 개발할 때 사용하는 디자인 패턴이다.

애플리케이션의 개발 영역을 MVC(Model, View, Controller)로 구분하여 각 역할에 맞게 코드를 작성하는 개발 방식이다.

MVC 패턴을 도입하면서 UI 영역과 도메인(비즈니스 로직) 영역으로 구분되어 서로에게 영향을 주지 않으면서 개발과 유지보수를 가능하게 되었다.

**Model(모델)**

Spring MVC 기반의 웹 애플리케이션이 클라이언트의 요청을 전달받으면 요청 사항을 처리하기 위한 작업을 한다.

처리한 작업의 결과 데이터를 클라이언트에게 응답을 돌려주어야 하는데, 이때 클라이언트에게 응답으로 돌려주는 **작업의 처리 결과 데이터를 Model**이라 한다.

클라이언트의 요청 사항을 구체적으로 처리하는 영역을 서비스 계층(Service layer)라고 하며,

요청 사항을 처리하기 위해 Java 코드로 구현한 것을 비즈니스 로직(Business Logic)이라 한다.

**View(뷰)**

View는 Model을 이용하여 웹 브라우저와 같은 애플리케이션의 화면에 보이는 리소스(Resource)를 제공하는 역할을 한다.

Spring MVC에는 다양한 View 기술이 포함되어 있다.

- HTML 페이지 출력
- PDF, Excel 등의 문서 형태로 출력
- XML, JSON 등 특정 형식의 포맷으로 변환

**Controller(컨트롤러)**

컨트롤러는 클라이언트 측의 요청을 직접적으로 전달받는 엔드포인트(Endpoint)로써 Model과 View의 중간에서 상호작용을 해주는 역할을 한다.

클라이언트 측의 요청을 전달받아 비즈니스 로직을 거친 후, Model 데이터가 만들어지면, 이 Model 데이터를 View로 전달하는 역할을 한다.

**MVC 패턴의 구조**

MVC 패턴에서도 여러 가지 구조를 가진다.

![https://blog.kakaocdn.net/dn/bAdB0R/btrQPjHTCQR/9r4fBFffmaTRHQVztREdc0/img.png](https://blog.kakaocdn.net/dn/bAdB0R/btrQPjHTCQR/9r4fBFffmaTRHQVztREdc0/img.png)

여러 가지 구조를 가진 MVC 패턴 중 위 그림의 구조를 그대로 사용하고 있는 것이 Spring MVC이다.

일반 MVC 패턴도 유지보수하기에 좋은 패턴임은 확실하나, 구조가 복잡해지는 한계가 있다.

이러한 한계를 극복하게 해주는 것이 Spring MVC이다.

### **Spring MVC의 동작 방식과 구성 요소**

![https://blog.kakaocdn.net/dn/bJdZu0/btrQQc2DRga/3GzN7FYTzISAt6Y8oWxGI1/img.png](https://blog.kakaocdn.net/dn/bJdZu0/btrQQc2DRga/3GzN7FYTzISAt6Y8oWxGI1/img.png)

**DispatcherServlet**

DispatcherServlet은 HttpServlet을 상속받아 사용하고, 서블릿으로 동작한다.

- DispatcherServlet → FrameworkServlet → HttpServletBean → HttpServlet

DispacherServlet을 사용하면 서블릿으로 등록하면서 모든 경로에 (urlPatterns=”/”)에 대해 매핑한다.

**요청 흐름**

- 서블릿이 호출되면 HttpServlet이 제공하는 service()가 호출된다.
- 스프링 MVC는 FramworkServlet.service()를 시작으로 여러 메서드가 호출되면서 **DispacherServlet.doDispatch()**가 최종적으로 호출된다.

**동작 순서**

1. 핸들러 조회 : 핸들러 매핑을 통해 URL에 매핑된 핸들러(컨트롤러)를 조회한다.
2. 핸들러 어댑터 조회 : 핸들러를 실행할 수 있는 핸들러 어댑터를 조회한다.
3. 핸들러 어댑터 실행 : 핸들러 어댑터를 실행한다.
4. 핸들러 실행 : 핸들러 어댑터가 실제 핸들러를 실행한다.
5. ModelAndView 반환 : 핸들러 어댑터는 핸들러가 반환하는 정보를 ModelAndView로 변환하여 반환한다.
6. viewResolver 호출 : 뷰 리졸버를 찾고 실행한다.
7. View 반환 : 뷰 리졸버는 뷰의 논리 이름을 물리 이름으로 바꾸고, 렌더링 역할을 담당하는 뷰 객체를 반환한다.
8. 뷰 렌더링 : 뷰를 통해 뷰를 렌더링한다.

**인터페이스 살펴보기**

스프링 MVC의 큰 장점은 DispatcherServlet 코드의 변경 없이 원하는 기능을 변경하거나 확장할 수 있다는 것이다. 동작에 필요한 대부분의 기능을 확장할 수 있도록 인터페이스로 제공한다.

따라서 인터페이스들만 구현하여 DispatcherServlet에 등록하면 원하는 기능의 컨트롤러를 만들 수도 있다.

주요 인터페이스

- 핸들러 매핑 : org.springframework.web.servlet.HandlerMapping
- 핸들러 어댑터: org.springframework.web.servlet.HandlerAdapter
- 뷰 리졸버: org.springframework.web.servlet.ViewResolver
- 뷰: org.springframework.web.servlet.View