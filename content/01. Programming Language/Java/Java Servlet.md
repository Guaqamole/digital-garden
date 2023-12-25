---
title: Java Servlet
date: 2023-12-21
draft: false
tags:
  - Web
  - Java
complete: true
---
## 서블릿 이전에 CGI가 있었다.
`CGI(Common Gateway Interface)`는 서블릿의 조상쯤 되는 기술이라고 생각하면 된다. CGI 이전의 웹서버는 단순히 사용자가 특정 경로를 입력하면 그 경로에 해당하는 리소스만 뿌려주는 역할이었다.

그런데 CGI가 나오면서 **사용자의 입력값을 인자로 넣은 프로그램을 실행시킨 결과를 웹으로 뿌려줄 수 있게 되었다.** 간단히 정의하면 CGI는 **웹서버에서 동적인 페이지를 보여주기 위해 임의의 프로그램을 실행할 수 있도록 하는 기술** 이었다.

### CGI의 구조
1. 통신 요청이 웹 서버에 전달된다.
2. 웹 서버는 요청에 들어있는 주소가 CGI 프로그램에 대응되는지 확인한다.
3. 대응되는 CGI 프로그램이 있다면 실행하여 환경변수와 표준입력 형태로 요청을 전달한다. ([CGI 전달 방식 표준](https://www.w3.org/CGI/))
4. 웹 서버는 CGI 프로그램이 표준 출력으로 돌려 보낸 내용을 그대로 응답으로 돌려준다.

> 이렇게 단순히 정의만 봐서는 감이 안 올 수 있다. 정적 페이지와 동적 페이지가 각각 어떤 것인지 더 상세히 알아보자.

## 정적 페이지와 동적 페이지의 예시

### (정적 페이지) 기업의 랜딩 페이지
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F7e26fc53-23c4-4622-8f81-489e11710688%2Fimage.png)

기업의 랜딩 페이지는 훌륭한 정적 페이지의 예시로 볼 수 있다. 어떤 사람이 들어와도, 어떤 행위를 해도 계속 같은 페이지를 보여준다.

### (동적 페이지) 소셜 네트워크 페이지
![](https://i.imgur.com/3rONeOW.png)

소셜 네트워크 페이지는 훌륭한 동적 페이지의 예시이다. 사용자의 행위 하나하나에 민감하게 반응하며 내가 좋아요를 표시했던 게시물이나 팔로우하고 있는 계정들에 따라 추천 알고리즘을 변경하며, 계속 다양한 포스팅을 보여준다.

> 이는 웹서버 내부적으로 나의 행위에 따라 어떤 통계를 내는 프로그램이 동작하고 있으며 그에 따른 추천 가중치가 상시로 바뀐다는 이야기이다.

## 그래서 서블릿이란? #servlet정의 #정의
<mark style="background: #C6AB16;">웹 서버에서 동적인 웹 페이지나 애플리케이션을 생성하기 위해 사용되는 서버 측 Java API로, 클라이언트의 요청에 따라 HTTP 프로토콜을 통해 응답을 처리하는 Java 클래스입니다</mark>

이를테면 `index.html`에 `사용자님 환영합니다.`라는 고정 문구 대신에 사용자를 인식한 뒤, `A님 환영합니다.` `B님 환영합니다.` 와 같은 메세지를 출력할 수 있도록 만들어주는 자바 [소프트웨어 컴포넌트](https://en.wikipedia.org/wiki/Software_component)이다.

## 서블릿이 진짜 하는 일 간단히 살펴보기
포스트맨을 이용하여 간단히 요청과 응답을 받아보며 알아보자. 포스트맨은 HTTP 통신에서 요청, 응답을 쉽게 보고 편집하고 테스트해볼 수 있도록 해주는 도구이다.

### HTTP 요청과 응답
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Fb68721b3-6572-44ef-8db0-4e6817c4398e%2Fimage.png)

위와 같이 내 블로그에 `GET` 요청을 날리면,
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F64bc3dee-0dea-4bc6-8d8c-a4a50c24c8e3%2Fimage.png)

위처럼 그에 상응하는 HTTP 응답이 떨어진다. 위의 HTTP 응답에서는 생략되었지만 HTTP 응답의 BODY에는 아래와 같은 데이터가 담겨있다.

```null
<!doctype html>
<html><head><title data-rh="true">jakeseo_me (서진규(Jake Seo)) - velog</title><link data-rh="true" rel="alternate" type="application/rss+xml" title="RSS" href="https://v2.velog.io/rss/jakeseo_me"/><meta data-rh="true" property="fb:app_id" content="203040656938507"/><meta data-rh="true" property="og:image" content="https://images.velog.io/velog.png"/><meta data-rh="true" name="description" content="대전에 있는 (주) 아이와즈에서 풀스택 웹개발자로 일하고 있는 서진규입니다. 주로 Jake Seo라는 닉네임을 많이 씁니다. 프론트엔드: Javascript, React 백엔드: spring, node.js, nest.js, JPA, type orm 에 관심이 있습니다. "/>...
```

요청에 대한 응답으로 브라우저가 웹페이지를 보여줄 수 있도록 웹서버는 HTML을 BODY로 보내준다. 이렇게 보내진 HTML은 구글 크롬과 같은 웹 브라우저를 통해 우리에게 보여진다.

### 서블릿 적용 예시
서블릿을 적용하면 로그인이 되었는지 파악하고, 로그인 되지 않았다면 `로그인` 버튼을 제공하고, 로그인이 되었다면 프로필 사진과 함께 `새 글 작성` 버튼을 제공할 수 있다.

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F6118aeb0-62e5-4d73-b4df-58f261468181%2Fimage.png)

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F3dfe090c-a4b4-4945-915a-c91aa5be0d15%2Fimage.png)

사실 **위와 같은 HTML 결과 말고도 HTTP 요청이나 응답 등 HTTP 와 관련된 어떠한 정보도 쉽게 얻고 편집할 수 있다.**

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F3037e6b5-7893-49ea-b129-b2d806037868%2Fimage.png)

물론 서블릿만 이러한 기능을 할 수 있는 건 아니다. 위에서 설명했듯, 서블릿은 단순히 자바에서 이러한 동적 페이지를 편리하게 만들으라고 제공하는 소프트웨어 컴포넌트이다.

### 그러면 서블릿은 왜 쓰는데?
서블릿을 사용하지 않고 직접 HTTP 통신으로 오고가는 문자열을 파싱하여 서블릿과 같은 기능을 구현해도 무방하지만, 이미 편리하게 사용할 수 있는 서블릿을 놔두고 직접 문자열 파싱을 구현하는 것은 개발자가 온전히 비즈니스 로직에 집중하지 못하게 만들 수 있다.

우리는 서블릿을 통해 문자열 파싱 등에 열올리지 않고 비즈니스 로직에 더욱 집중할 수 있다.
> 직접 만들면 비즈니스 로직을 짜기 전에 수 많은 규약과 문자열 검증에 정신이 나가버릴 수 있다.

## 기존 CGI의 단점과 그 단점을 해결한 서블릿

### 기존 CGI의 동작방식
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F30e64d98-e3d5-4905-99a1-eef68d44604e%2Fimage.png)
CGI는 브라우저에서 웹서버에 요청이 갔을 때, 각각에 대한 처리 프로세스를 만들어낸다는 단점이 있었다. 그래서 대량의 트래픽을 처리하기에는 약간 무리가 있었다.

### 서블릿의 동작방식
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Fd747f643-fbe8-4950-9007-e0e426a4f839%2Fimage.png)

<mark style="background: #C6AB16;">서블릿은 각 요청에 대한 프로세스를 생성하는 것이 아니라, 프로세스 1개가 있고 그 내부에 스레드 풀이라는 스레드들이 생성될 수 있는 공간을 만들어 스레드로 처리했다.</mark>

또한 스레드 풀은 개수를 지정하여 일정 이상의 요청이 들어왔을 때는 대기하도록 만들어서 대량의 요청이 들어왔을 때도 조금 더 안정성이 증가했다.

그리고 사실 비슷한 경로에 요청을 한 클라이언트들의 비즈니스 로직은 대부분 중복되는 부분이므로, 스레드 사이에 있는 공유 자원 (`Code`, `Data`, `Heap`)을 통해 더욱 효율적인 처리가 가능했다.

### 서블릿과 CGI의 결정적 차이는?
서블릿도 CGI 규칙에 따라 데이터를 주고 받는 것까지는 같지만, <mark style="background: #C6AB16;">서블릿은 서블릿을 가지고 있는 서블릿 컨테이너에게 이 일을 위임한다. 대신 체계적으로 이를 수행하기 위해 서블릿 컨테이너와 서블릿 사이의 규칙이 존재하게 된다.</mark>

### 서블릿 개발 흐름
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Fb0c285f0-9227-4699-addf-ddb9cb8eb635%2Fimage.png)

1. 개발자가 자바 서블릿 소스코드(`.java`)를 작성한다. (위에서는 스프링 프레임워크를 이용해 작성)
2. 해당 자바 서블릿 소스가 빌드시 컴파일되며 서블릿 클래스(`.class`)가 된다.
3. 해당 자바 서블릿 클래스가 톰캣과 같은 서블릿 컨테이너에 등록된다.
4. 클라이언트가 특정 경로에 대한 HTTP Request를 보낸다.
5. HTTP Request에 상응하는 서블릿이 실행된다.
6. 서블릿 메소드(비즈니스 로직)가 실행된다.
7. DB 연동 작업이 있는 경우 DB 연동이 되어 데이터를 CRUD한다.
8. 완성된 데이터를 클라이언트에게 반환해준다.

### 서블릿 라이프사이클 흐름
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Fefc0369f-6b56-44cd-94d0-110014498a24%2Fimage.png)

초기의 CGI처럼 하나의 요청에 하나의 프로세스가 켜지는 구조를 탈피하여 Servlet이 특정한 라이프사이클을 갖고 컨테이너 내부에서 쓰레드 단위로 요청을 처리한다.

> 이 과정에서 흐름을 개발자가 아닌 컨테이너가 제어하는데, 이를 IoC (Inversion of Control)라고 한다.

## 톰캣에서 설명하는 서블릿
[톰캣 문서](https://tomcat.apache.org/tomcat-7.0-doc/servletapi/javax/servlet/Servlet.html)에 보면 서블릿에 대해 상세히 설명하고 있다. 간단히 보고 넘어가자.

### 서블릿 인터페이스
- 서블릿은 웹서버 내부에서 동작하는 작은 자바 프로그램이다.
- 서블릿은 웹클라이언트에게 요청을 받고 그에 응답을 해준다.
    - 주로 HTTP를 통한다.
- `javax.servletGenericServlet` 혹은 `javax.servlet.http.HttpServlet`을 상속받아서 인터페이스를 구현 가능하다.

### 서블릿의 라이프사이클
1. 서블릿은 생성 이후에 `init()` 메소드를 통해 초기화된다.
2. 클라이언트가 서비스(`service()`)로 보낸 요청들을 처리한다.
3. 서블릿은 사용 중지된 후, `destroy()`를 이용해 제거된다.

### init 메소드
```java
void init(ServletConfig config) throws ServletException
```

어떤 서블릿이 서비스에 배치 되고 있다는 것을 나타내기 위해 서블릿 컨테이너로부터 호출되는 메소드이다. `init()` 메소드는 서블릿이 요청을 받기 전에 반드시 성공적으로 끝마쳐져야 한다.

만일 `init()` 메소드를 수행하다가 아래와 같은 현상이 일어나면 서블릿 컨테이너는 서블릿을 등록할 수 없다.

1. `ServletException` 예외가 발생했거나
2. 웹 서버에 의해 정해진 시간 내에 반환되지 않는다면

컨테이너는 서블릿을 등록할 수 없다.

### service 메소드
```java
void service(ServletRequest req, ServletResponse res) 
throws ServletException, java.io.IOException
```

서블릿이 요청에 응답하도록 서블릿 컨테이너에서 호출되는 메소드이다. 서블릿의 `init()` 메소드가 성공적으로 끝난 이후에 이 메소드가 실행된다. 응답의 상태 코드는 항상 에러를 보내거나 던지기 위해 설정되어야 한다.

서블릿들은 일반적으로 멀티스레드 서블릿 컨테이너들 내부에서 실행된다. 이 서블릿 컨테이너들은 여러 개의 요청을 동시다발적으로 처리할 수 있다. 개발자는 공유된 자원에 대한 접근, 네트워크 커넥션, 서블릿 클래스 접근, 서블릿 인스턴스 변수 접근 등을 반드시 동기화 시켜주어야 한다.

### 서블릿 객체의 재사용
일단 생성된 `Servlet` 객체는 메모리에 남겨두어, 동일한 서블릿에 대해 요청이 온다면 다시 `init()` 부터 수행하는 것이 아니라 이전에 메모리에 남겨두었던 것을 재사용한다.

그래서 자바 서블릿으로 만들어진 페이지는 첫 로딩 때는 상대적으로 느렸다가 그 이후에는 미리 로딩된 서블릿을 이용하기 때문에 상대적으로 빠르다.

## GenericServlet과 HttpServlet

### GenericServlet이란?
`.service()` 메소드를 제외한 나머지다. Servlet 인터페이스 메소드를 구현해놓은 `abstract class HTTP` 프로토콜 외 **독립적인 프로토콜 서블릿을 만들 때 사용된다.**

### HttpServlet
우리가 주로 사용하는 서블릿이다. `GenericServlet`을 상속받고 추가로 **HTTP 프로토콜의 기능** (doGet, doPost, ...)을 제공한다.

## 스프링에서 쓰는 서블릿을 알아보자

### 스프링 서블릿의 상속 관계
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F1f9f7e7e-0ef4-4892-8227-f71b6276b87d%2Fimage.png)

위와 같은 상속 관계를 갖는다.`HttpServlet`까지는 `WAS`라 불리는 톰캣에서 구현되고, 스프링은 `WAS`로 부터 상속받은 `HttpServlet`을 이용하여 스프링에서 쓰이는 `Servlet`들을 구현한다.

### `Servlet<Interface>` (톰캣 9.0)
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F1abfd108-97b8-4d0f-a314-5ae66bd964b9%2Fimage.png)

기본적으로 서블릿의 라이프사이클에 따라 어떠한 메소드를 구현해야 하는지에 대해 정의하고 있다.

### GenericServlet (톰캣 9.0)
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F7ab4c6ab-f1ba-4be7-9e29-821c2e83ed02%2Fimage.png)

주석에 있는 설명을 간단히 요약하면, 프로토콜에 독립적인 서블릿이며, 웹에서 사용하는 HTTP 서블릿을 작성하고 싶다면 `javax.servlet.http.HttpServlet`을 상속받으라고 작성되어 있다. 서블릿을 편리하게 작성할 수 있도록 도와주며, `service` 메소드만 작성하면 `GenericServlet`을 만들 수 있다고 한다.

### HttpServlet (톰캣 9.0)
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F40db7bef-6ced-407f-a9f7-b48f456c5592%2Fimage.png)

각종 HTTP 메소드들에 대한 상수가 있고, 캐싱 처리를 위한 `If-Modified-Since` 등의 상수도 보인다.

`doGet()` 메소드를 보면, 구현되지 않았다는 에러만 송출하도록 작성되어 있는데 저렇게 작성된 이유는 해당 추상 클래스를 상속받고 오버라이드하여 직접 구현하기 전까지는 지원하지 않는다는 메세지를 띄우려고 하는 목적인 것 같다.

### HttpServletBean
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Fb7b4e56f-1152-48d0-8e9a-7205163cf12d%2Fimage.png)

`HttpServlet` 클래스를 상속하였는데, `Servlet`의 기본 라이프사이클 중 `init()` 메소드만 오버라이드하고, 나머지는 그대로 두었다.

`init()` 메소드에서는 `BeanWrapper` 혹은 `ResourceLoader`와 같은 것들을 초기화한다. 또한 `HttpServletBean` 역시 단독으로는 쓸 수 없는 추상 클래스이다.

### FrameworkServlet
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F7826bb16-fc37-4ec6-84cc-8011f6c525b7%2Fimage.png)

위 컨트롤러는 2가지 기능을 제공한다.

- 서블릿당 1개의 `WebApplicationContext` 인스턴스를 관리한다.
    - 서블릿의 Configuration은 서블릿 네임스페이스에 들어있는 빈에 의해 결정된다.
- 요청이 성공적으로 처리됐는지에 상관없이 일단 요청 처리에 관한 이벤트를 발행한다.

하위 클래스는 `doService`를 구현하여 요청을 처리해야 한다. 이 클래스는 `HttpServlet`을 직접적으로 상속하기보다 `HttpServletBean`을 상속하였기 때문에, 빈 프로퍼티들이 자동으로 매핑된다. 서브클래스는 `initFrameworkServlet()`을 오버라이드하여 커스터마이징 가능하다.

### DispatchServlet
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F56de3a2a-4291-4f12-a9a0-e997dc901567%2Fimage.png)

> 스프링 클래스 중에 이렇게 주석이 긴 클래스는 처음봤다. 그만큼 중요한 것 같다.

HTTP 요청 핸들러/컨트롤러의 중심이 되는 디스패쳐이다. 이를테면 HTTP를 기반으로한 JSON 반환 등의 API 혹은 웹 UI 컨트롤러와 같은 것의 중심이 된다. 웹 요청을 처리하기 위해 요청을 등록된 핸들러로 보내고 편리한 매핑을 제공하며, 예외처리도 한다.

이 서블릿은 매우 유연하여 적절한 어댑터 클래스와 함께 어떤 워크 플로우에도 사용될 수 있다.

`DispatchServlet`은 `핸들러 매핑`과 `핸들러 어댑터` 등을 사용할 수 있는데, `핸들러 매핑`은 어떤 요청이 들어왔는지 판별하여 올바른 핸들러를 찾는 것이고, `핸들러 어댑터` 는 올바른 핸들러를 찾은 이후에 어떤 어댑터를 사용하여 해당 요청을 처리할 수 있는지 찾는 것이다.

핸들러 매핑과 핸들러 어댑터란 용어에 대해 감이 잘 안 올 수 있는데,

`핸들러 매핑`: 특정한 경로에 도달하면 이러이러한 처리 어댑터들로 처리가 가능하다는 것을 알림  
`핸들러 어댑터`: 요청의 종류에 따라 응답을 위해 다양한 어댑터가 적용될 수 있다. 이를테면 `String`으로 뷰의 위치를 반환하여 뷰를 반환할 수도 있고, `ModelAndView` 객체를 직접 반환할 수도 있고, `@ResponseBody` 애노테이션을 이용하여 `JSON`을 반환할 수도 있다.  
`뷰 리졸버`: 사실 뷰는 뷰 리졸버라는 뷰만을 담당하는 객체가 따로 처리한다.

> 위와 같이 3가지 역할(경로 찾기, 알맞은 처리기 찾기, 뷰 보여주기)을 잘 분담해서 처리할 수 있도록 도와주는 중개자 역할이 `DispatcherServlet`이다.

> 스프링의 `DispatcherServlet`을 사용함으로써, 우리는 실제로는 `핸들러 어댑터`에 대한 코드만 작성해주면 된다.

### Dispatcher 서블릿의 두가지 컨텍스트
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F9947233d-e59f-47db-9be9-5aeb41b2ddf0%2Fimage.png)

총 두가지 컨텍스트를 포함하며, 웹과 직접적으로 관련된 서블릿 웹 애플리케이션 컨텍스트와 루트 웹 애플리케이션 컨텍스트로 나뉜다.

`DispatcherServlet`은 이를 이용해 필요한 빈을 주입할 수 있다.

> ~~[관련 포스트](https://velog.io/@jakeseo_me/%EC%8A%A4%ED%94%84%EB%A7%81-MVC-1%ED%8E%B8-%EB%B0%B1%EC%97%94%EB%93%9C-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%ED%95%B5%EC%8B%AC-%EA%B8%B0%EC%88%A0-34-%ED%95%B8%EB%93%A4%EB%9F%AC-%EB%A7%A4%ED%95%91%EA%B3%BC-%ED%95%B8%EB%93%A4%EB%9F%AC-%EC%96%B4%EB%8C%91%ED%84%B0) 해당 포스트는 저작권 때문에 비공개입니다.~~ 인프런 김영한님 강의를 보시면 됩니다.

## 직접 서블릿 만들어보기

### 메소드에 상관없이 응답하는 MyOwnServlet
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Fff8feccc-6f7e-40c2-86c8-e89a39f765b3%2Fimage.png)

스프링부트 프로젝트에서 `HttpServlet`을 상속한 뒤에 `.service()` 메소드를 오버라이드하여 `MyOwnServlet`이라는 서블릿을 직접 만들어보았다. 해당 서블릿은 `/myOwnServlet`이라는 `urlPattern`으로 접근하는 요청들에 대한 응답을 해줄 것이다. 응답의 내용은 간단하게 `"Hello World"`를 적어보았다.

이렇게 작성하면, HTTP 메소드에 상관없이 모두 `"Hello World"`라는 프린트 값을 뿌려주게 될 것이다.

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Ffc554098-aad0-4298-b03c-55743a752eca%2Fimage.png)

`GET`, `POST`, `PUT` 등의 다양한 메소드를 변경해서 요청해도 동일하게 `"Hello World"`를 응답한다.

### GET 메소드만 응답하게 만들기
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F8a323b49-eb74-4c5e-9062-7ebce460dd2e%2Fimage.png)

위는 `HttpServlet` 내부적으로 구현된 `.service()` 메소드의 내용인데, 이미 Http 메소드에 대한 처리가 다 되어있다. 그러므로 우리는 메소드 하나만 응답하게 만드려면 그냥 `.doGet()` 메소드만 오버라이드해서 적당한 응답을 반환하도록 작성하면 될 것이다.

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F2f536fa3-9f97-46f4-b7c2-c4ab3948c6da%2Fimage.png)

위와 같이 `doGet()` 메소드만 오버라이드 해보았다. 이제 `POST`와 같이 지원하지 않는 메소드로 요청을 보내면 아래와 같은 응답을 준다.

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F52e4ba9f-bb4d-436e-a813-0dc59cd614e8%2Fimage.png)

`Method Not Allowed`라는 에러를 내뿜는 것을 확인할 수 있다. 이는 아래와 같이 `.doPost()`의 오버라이딩되지 않은 원형이 가지고 있는 동작이다.

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Ff600dba5-08bd-473c-abb9-565a9ff2413d%2Fimage.png)

오버라이드가 되지 않았다면 위와 같이 지원하지 않는 메소드라는 응답을 내보낸다. 이로 인해 우리는 편리하게 필요한 부분만 오버라이드해서 사용하면 사용하지 않는 부분에 대한 예외 처리는 자동으로 만들어져있다. `화이트 리스트`의 원리와 비슷하다.

![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2Faa2ba6f1-e107-4513-9a9b-2f68613f6c61%2Fimage.png)

`GET`으로 요청하면 위와 같이 우리가 작성했던 응답을 반환한다.

## 서블릿은 싱글톤으로 관리된다.
서블릿은 싱글톤 패턴으로 관리되어 서블릿 객체가 만들어졌다 사라졌다를 반복하지 않고, 한 객체를 만들어놓고 서블릿 컨테이너에서 계속 끌어다 쓰는 방식이다. 그래서 클라이언트의 요청에 대한 응답이 완료되어도 서블릿은 즉시 소멸하지 않는다.

하지만 이러한 싱글톤 때문에 단점도 있는데,

- **공유 메모리 사용**에 대해서는 항상 꼬이지 않도록 조심해야 한다.
- 다른 스레드로 전환하는 `Context Switch`가 많은 오버헤드를 일으킬 수 있다.
- 스레드 생성에 제한을 두지 않고 필요한 만큼 계속 생성하게 되면 하드웨어의 한계를 넘어설 수 있으니 스레드 풀로 관리해주는 것이 좋다.

## 서블릿은 lazy loading 기법이 적용되어 있다.
서블릿이 일단 만들어지는 것이 아니라, 한 클라이언트라도 해당 경로에 접근하면 그 때서야 그 서블릿은 만들어진다. 그래서 스프링 프로젝트를 처음 켜고 나서 처음 경로에 접근하면 서블릿을 초기화하는 과정이 포함되어 아주 약간 더 오래걸린다.

### 처음 서블릿에 접근했을 때
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F868ace6a-8548-45ea-ae9b-5a0d82498150%2Fimage.png)

약 38.50ms 가 소요되고 페이지가 켜졌다.

### 두번째로 서블릿에 접근했을 때
![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F9c06fe4f-e83d-4c70-9bb2-f4c9bc9dff90%2Fimage.png)

약 6.61ms 가 소요되고 페이지가 켜졌다. 서블릿이 초기화된 이후라 훨씬 빠르게 페이지가 로드됐다.

> 사실 위는 `GET` 요청이어서, 위에 `HttpServlet` 구현을 잘 보았다면, 수정되지 않은 페이지에 대해서는 캐시해둔 것을 보여주는 기능이 있는 것을 봤을 것이다.  
> ![](https://velog.velcdn.com/images%2Fjakeseo_me%2Fpost%2F10c5129d-8e4a-4f75-b7e5-89dd65f74914%2Fimage.png)  
> 캐싱도 페이지가 빠르게 나오는데 관여했을 수 있다.