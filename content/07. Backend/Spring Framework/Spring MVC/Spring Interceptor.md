---
title: Spring Interceptor
date: 2023-12-11
draft: false
tags:
  - Springboot
complete: true
---
## Interceptor?
_'가로채다'_

스프링 MVC 에서 인터셉터는 웹 애플리케이션 내에서 특정한 URI 호출을 말 그대로 '**가로채는**' 역할을 합니다.
  
인터셉터를 활용하면 기존 컨트롤러의 로직을 수정하지 않고도, 사전이나 사후에 제어가 가능합니다.
쉽게 말해, **요청과 응답을 가로채서 원하는 동작을 추가**하는 역할입니다.

예를 들자면, 세션을 통한 인증을 쉽게 구현할 수 있습니다.

요청을 받아 들이기 전, 세션에서 로그인한 사용자가 있는지 확인해보고 없다면 로그인 페이지로 redirect 시킬 수 있죠.
Interceptor가 없다면 모든 컨트롤러마다 해당 로직을 넣어야 하니, 꽤나 번거롭고 비효율적입니다.

혹은, 주기적으로 결과 페이지에 등장하는 데이터들을 인터셉터에서 응답을 가로채어 데이터를 추가한다음 보낼 수도 있죠.

메일 알림 개수를 조회한 후 추가한다거나, 헤더 데이터 같은 것들이 있을 수 있습니다.

## Interceptor VS Filter
Interceptor를 검색하다보면 같이 등장하는 단어가 바로 Filter입니다.
그만큼 많은 개발자들이 헷갈려 하는 것을 알 수 있습니다.
### 📌  Filter
Filter는 **DispatcherServlet 처리 전 · 후에 동작**하여 사용자의 요청이나 응답의 최전방에 존재합니다.
필터는 스프링의 독자적인 기능이 아닌 **자바 서블릿**에서 제공합니다.

![](https://blog.kakaocdn.net/dn/HKcSM/btrwmX58bjC/BKKTKpOKIKeoCGflCngPYk/img.png)

Filter Chain
위의 그림과 같이 FilterChain(필터 체인)을 통해 여러 필터가 연쇄적으로 동작하게 할 수 있습니다.
```
public interface Filter {

    public default void init(FilterConfig filterConfig) throws ServletException {}

    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException;


    public default void destroy() {}
}
```

필터 인터페이스는 3가지 메소드를 갖고 있는데 각각 다음과 같습니다.
- **init** : 필터가 웹 컨테이너에 **생성**될 때 실행됩니다.
- **doFilter** : Request, Response가 **필터를 거칠 때** 수행되는 메소드로, 체인을 따라 다음에 존재하는 필터로 이동합니다.
- **destroy** : 필터가 **소멸**될 때 실행됩니다.

#### ✔️  공통점 
Servlet 기술의 Filter와 Spring MVC의 HandlerInterceptor는

**특정 URI에 접근할 때 제어하는 용도로 사용된다는 공통점**을 가지고 있습니다.

#### ✔️  차이점 : 영역의 차이
두 기능의 가장 큰 차이는 **실행 시점에 속하는 영**역(Context)에 있습니다.

![](https://blog.kakaocdn.net/dn/bmoLez/btrv5mrG2OD/c5k6qMlA94FMvVnM2qMLY1/img.png)


Filter는 동일한 **웹 애플리케이션**의 영역 내에서 필요한 자원들을 활용합니다.
웹 애플리케이션 내에서 동작하므로, 스프링의 Context를 접근하기 어렵습니다.

Interceptor의 경우 스프링에서 관리되기 때문에 스프링 내의 모든 객체(빈)에 접근이 가능하다는 차이가 있습니다.

즉, 빈을 관리하는 스프링 컨텍스트 내에 있어서 생성된 빈들에 자유롭게 접근할 수 있습니다.

예를 들어, 추후에 살펴볼 HandlerInterceptor의 경우
스프링의 빈으로 등록된 컨트롤러나 서비스 객체들을 주입받아서 사용할 수 있기 때문에
기존의 구조를 그대로 활용하면서 추가적인 작업이 가능합니다.

#### ✔️  차이점 : 호출 시점의 차이

영역에서 차이가 나기 때문에 호출 시점도 다릅니다.
Filter는 DispatcherServlet이 실행되기 전, Interceptor는 DispatcherServlet이 실행된 후에 호출되며
Interceptor는 DispatcherServlet이 실행되며 호출됩니다.

#### ✔️  차이점 : 용도의 차이
Filter
👉🏻 보안 관련 공통 작업
👉🏻 모든 요청에 대한 로깅 또는 감사
👉🏻 이미지/데이터 압축 및 문자열 인코딩

Interceptor
👉🏻 인증/인가 등과 같은 공통 작업
👉🏻 Controller로 넘겨주는 정보의 가공
👉🏻 API 호출에 대한 로깅 또는 감사

## HandlerIntercepter

HandlerInterceptor는 Filter와 유사하게 HttpServletRequest, HttpServletResponse를 인자로 받습니다.

일반적으로, Controller에서는 Servlet API에 해당하는 HttpServletRequest, HttpServletResponse를 활용하는 경우는 많지 않습니다.  (DTO나 VO를 사용하곤 하죠.)

컨트롤러에서는 순수하게 파라미터와 결과 데이터를 만들어 내고,

HandlerInterceptor에서는 이러한 인자를 이용해 웹과 관련된 처리를 도와주는 역할을 할 수 있습니다.

**HandlerInterceptor**는 아래와 같이 정의되어 있습니다.
```java
public interface HandlerInterceptor {

    default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        return true;
    }

    default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            @Nullable ModelAndView modelAndView) throws Exception {
    }

    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            @Nullable Exception ex) throws Exception {
    }
}
```

메서드를 확인해보면 아래와 같습니다.
각 메서드의 반환값이 **true**이면 핸들러의 다음 **동작**이 **실행**되지만 
**false**이면 **중단**되어서 남은 인터셉터와 컨트롤러가 실행되지 않습니다.

### 📌  preHandle

_preHandle(request, response, handler)_
preHandle 메서드는지정된 컨트롤러의 동작 이전에 가로채는 역할로 사용합니다.
preHandle()의 경우 세 개의 파라미터를 사용하는데, 
HttpServletRequest, HttpServletResponse, Object handler로 구성됩니다.

#### ****✔️**  Object Handler**
마지막의 Handler는 현재 실행하려는 메소드 자체를 의미하는데,
이를 활용하면 **현재 실행되는 컨트롤러를 파악**하거니, **추가적인 메소드를 싱행하는 등의 작업이 가능**합니다.

✍🏻  현재 실행되는 **컨트롤러**와 **메소드의 정보**를 파악하는 **예제**

```java
@Override
public boolean preHandle(HttpServletRequest request, 
	HttpServletResponse response, Object handler) throws Exception {

	HandlerMethod handlerMethod = (HandlerMethod) handler;
	Method method = handlerMethod.getMethod();

	System.out.println("Bean: " + handlerMethod.getBean());
	System.out.println("Method: " + method);
		
	return true;
}
```

위와 같이 handler를 HandlerMethod 타입으로 캐스팅한 후 원래의 메소드와 객체(빈)를 확인할 수 있습니다.

코드를 실행하면 순서대로 현재 실행되는 Controller와 메소드가 출력됩니다.
```java
Bean: com.gngsn.app.controller.Home@23af30c9
Method: public java.lang.String com.gngsn.app.controller.Home.getHomePage(java.lang.Long,java.lang.Long,org.springframework.ui.Model)
```

### 📌  postHandle
_postHandle(request, response, handler, modelAndView)_
지정된 컨트롤러의 동작 이후에 처리하며,
Spring MVC의 Front Controller인 DispatcherServlet이 화면을 처리하기 전에 동작합니다.

#### ✔️  추가 작업

컨트롤러 실행이 끝나고 아직 화면처리는 안 된 상태이므로,
필요하다면 메소드의 실행 이후에 **추가적인 작업이 가능**합니다.

예를 들어, 특정한 메소드의 실행 결과를 HttpSession 객체에 같이 담아야 하는 경우를 생각해 볼 수 있습니다.

컨트롤러에서는 Model 객체에 결과 데이터를 저장하고,
인터셉터의 PostHandle()에서 이를 이용해 HttpSession에 결과를 담는다면
컨트롤러에서 HttpSession을 처리할 필요가 없게 됩니다.

✍🏻 result라는 변수가 저장되었다면 HttpSession객체에 이를 보관하는 예제
```java
@Override
public void postHandle(HttpServletRequest request,
    HttpServletResponse response, Object handler,
    ModelAndView modelAndView) throws Exception {

    Object result = modelAndView.getModel().get("result");

    if (result != null) {
        request.getSession().setAttribute("result", result);
        response.sendRedirect("/home");
    }
}
```

`postHandle()`에서 'result'라는 변수가 ModelAndView에 존재하면 이를 추출해서 HttpSession에 추가합니다.  
HttpSession에 'result'라는 이름으로 보관한 후 `/home` 로 redirect를 수행합니다.
```html
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Home</title>
</head>
<body>
<h2>${result}</h2>
</body>
</html>
```

`/home`이 HomeController를 통해 'home'이라는 문자열을 반환하여 home.jsp를 보여준다고 했을 때, 
home.jsp에서는 `${result}` 라는 데이터를 사용할 수 있습니다.
이렇게 되면 Controller상에서 home.jsp에는 전달되는 객체가 없지만,
HttpSession 객체에 필요한 정보가 보관되어 있기 때문에 데이터가 보여지는 것입니다.

  
  

### 📌  afterCompletion
_afterCompletion(request, response, handler, exception)_
DispatcherSerlvet의 **화면 처리(뷰)가 완료된 상태에서 처리**합니다.

## HandlerInterceptorAdapter
_Spring 5.3 부터 Deprecated_
HandlerInterceptor는 인터페이스로 정의되어 있지만, 
HandlerInterceptorAdaptor는 인터페이스를 구현한 추상 클래스로 설계되어 있습니다.
결국 HandlerInterceptor를 구현하는 추상클래스입니다.
일반적으로 Adapter라는 용어가 붙으면 특정 인터페이스를 미리 구현해서 사용하기 쉽게 하는 용도인 경우가 많은데요.

HandlerInterceptorAdaptor 역시 HandlerInterceptor를 쉽게 사용하기 위해 인터페이스의 메소드를 미리 구현한 클래스입니다.
추상클래스를 사용하여 불필요한 메소드까지 불러오는 일이 없앨 수 있습니다.
하지만, 인터페이스의 **default 메소드** 기능이 추가된 이후부터는 상관없어졌죠.
그래서 그런지, Spring 5.3부터 HandlerInterceptorAdaptor가 **Deprecated** 되었습니다. 

자바독을 보면 아래와 같이 명시되어 있습니다.
```java
 /* ... 생략
 * @deprecated as of 5.3 in favor of implementing {@link HandlerInterceptor}
 * and/or {@link AsyncHandlerInterceptor} directly.
 */
@Deprecated
public abstract class HandlerInterceptorAdapter implements AsyncHandlerInterceptor {

}
```

자바독에 적혀있듯이,
스프링에서는 **HandlerInterceptor**이나 **AsyncHandlerInterceptor**를 구현해서 사용하라고 제안하고 있습니다.

## AsyncHandlerInterceptor
AsyncHandlerInterceptor는 위와 같이 **afterConcurrentHandling**를 추가로 구현합니다.
```java
public interface AsyncHandlerInterceptor extends HandlerInterceptor {

   default void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response,
         Object handler) throws Exception {
   }

}
```

Servlet 3.0 부터 비동기 요청이 가능해 졌는데요.

비동기 요청 시 PostHandle과 afterCompletion이 수행되지 않고 afterConcurrentHandlingStarted가 수행됩니다. 

참고해서 상황에 맞는 인터페이스를 구현하면 되겠습니다.