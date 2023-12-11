---
title: Spring MVC
date: 2023-12-09
draft: false
tags:
  - Springboot
  - MVC
complete: true
---
먼저 Spring MVC는 스프링의 서브 프로젝트로, Servlet/JSP 보다 빠른 웹 개발이 가능합니다.   
아무래도 국내에서 많이 사용하는 이유 중 큰 비중이 전자정부 표준 프레임워크라는 점이죠.

Spring MVC는 크게 일반 자바 영역과 Web 관련영역으로 나뉘어져 있어요.

흔히 xml로 설정할 때 **일반 자바 설정**은 
applicationContext.xml (intelliJ) 혹은 root-context.xml (eclipse) 에서,

**Web부분을 설정**할 땐 
dispatcher-servlet.xml (intelliJ)  혹은 servlet-context.xml (eclipse) 에서 작업하죠.

설정 관련 xml에서는 web.xml도 있는데요.
web.xml은 Tomcat과 관련된 부분입니다.

전체적인 구조를 확인해보면 아래의 그림과 같습니다.
![](https://blog.kakaocdn.net/dn/baZmKE/btq3Xr1jig6/kTtnkEYelQ6Jyu9Cd0fs21/img.png)

기능 별로 모듈화하여 개발할 수 있어 유지보수에 쉽다는 장점이 있죠.

그렇다면, 스프링은 어떻게 사용자의 요청을 받아서 
적절한 컨트롤러를 찾고 적절한 Bean 들을 찾아 데이터를 가져올까요?

## **기본 동작 방식** 
### ✔️ 첫 번째, DispatcherServlet
![](https://blog.kakaocdn.net/dn/LNhyM/btq3TyHwyeD/wdAKHHJVhglwAnPkTVnKT0/img.png)

가장 먼저, Client가 요청을 보내면 DispatcherServlet 클래스의 객체가 요청을 받습니다.

### ✔️ 두 번째, HandlerMapping
![](https://blog.kakaocdn.net/dn/Vqtz1/btq3TKH1p9f/3EiWvbjYPmVmXsvrb4HMG1/img.png)

그 다음 DispatcherServlet은 요청을 HandlerMapping에게 던지게 되고,
HandlerMapping은 여러개의 controller 파일 중, 
request에 해당하는  적합한 controller를 찾아서 연결합니다.

### ✔️ 세 번째, HandlerAdapter
![](https://blog.kakaocdn.net/dn/bLjvG7/btq3UbrTf77/zPo59KKkhzNd4w8XNgDmjk/img.png)

HandlerMappring이 적합한 Controller를 찾으면,
다시 DispatcherServlet으로 돌아와서 HandlerAdapter에게 요청을 보냅니다.
HandlerAdapter은 controller의 메소드들 중 요청에 맞는 적합한 메소드를 매칭합니다.

### ✔️ 네 번째, ViewResolver
![](https://blog.kakaocdn.net/dn/c68umo/btq3Ult9vQK/ETNvk4M8fTI8I70gVBY2Q0/img.png)

그 다음으로 ViewResolver를 찾아서 적합한 View를 찾습니다.
그리고 나서 마지막으로 View를 Response로 반환합니다.
전체적으로 확인하면 아래와 같습니다.

![](https://blog.kakaocdn.net/dn/sR9bB/btq3YVukpET/W42zSyjN0XnfUKamSnCytK/img.png)


> [!NOTE] ViewResolver?
> ViewResolver는 사용자가 요청한 것에 대한 응답 view를 렌더링하는 역할을 합니다. 간단히 말씀드리면 view 이름으로부터 사용될 view 객체를 맵핑하는 역할을 합니다. 자세한 부분은 마지막 부분에 설명드리겠습니다.  여기서 궁금한 점이 생기실겁니다. 우리는 **ViewResolver를 생성하지도 Bean으로 등록하지도 않았는데 언제 생성되어 처리되지?** 이 **궁금증을 해결하신다면 직접 ViewResolver를 등록하고 SpringBoot에서 처럼 view이름만 적어주어 알맞은 view를 찾아 렌더링할 수 있도록 할 수**도 있습니다.



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

*주요 인터페이스*
- 핸들러 매핑 : org.springframework.web.servlet.HandlerMapping
- 핸들러 어댑터: org.springframework.web.servlet.HandlerAdapter
- 뷰 리졸버: org.springframework.web.servlet.ViewResolver
- 뷰: org.springframework.web.servlet.View


**Spring MVC Request LifeCycle**
![](https://i.imgur.com/d7xI7vQ.png)



