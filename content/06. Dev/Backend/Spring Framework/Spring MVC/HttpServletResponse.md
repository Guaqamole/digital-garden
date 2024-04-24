---
title: HttpServletResponse
date: 2024-04-23
draft: false
tags:
  - SpringMVC
complete: true
---
## HttpServletResponse - 기본 사용법
### HttpServletResponse 역할
**HTTP 응답 메시지 생성** 
- HTTP 응답코드 지정
- 헤더 생성 
- 바디 생성
**편의 기능 제공**
- Content-Type, 쿠키, Redirect

### 응답 코드 세팅법
코드로 하는방법
```java
@Override  
protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
    resp.setStatus(200);  
}
```

상수로 하는방법
```java
@Override  
protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
    resp.setStatus(HttpServletResponse.SC_OK);  
}
```
### HttpServletResponse - 기본 사용법
```java
@WebServlet(name = "requestHeaderServlet", urlPatterns = "/response-header")  
public class ResponseHeaderServlet extends HttpServlet {  
    @Override  
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
  
        // status-line  
        resp.setStatus(HttpServletResponse.SC_OK);  
  
        resp.setHeader("Content-Type", "text/plain");  
        resp.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");  
        resp.setHeader("Pragma", "no-cache");  
        resp.setHeader("my-header1","hello");  
        resp.setHeader("my-header2","hello");  
        resp.setHeader("my-header3","hello");  
        resp.setHeader("my-header4","hello");  
        resp.setHeader("my-header5","hello");  
        resp.setHeader("my-header6","hello");  
  
        PrintWriter writer = resp.getWriter();  
        writer.println("ok");  
    }  
}
```

결과
![](https://i.imgur.com/jVoibRi.png)

#### Content
```java
private void content(HttpServletResponse response) {  
	//Content-Type: text/plain;charset=utf-8  
	//Content-Length: 2  
	//response.setHeader("Content-Type", "text/plain;charset=utf-8"); 
	response.setContentType("text/plain"); 
	response.setCharacterEncoding("utf-8"); 
	//response.setContentLength(2); //(생략시 자동 생성)
}
```

#### Cookie
```java
private void cookie(HttpServletResponse response) {  
	//Set-Cookie: myCookie=good; Max-Age=600; 
	//response.setHeader("Set-Cookie", "myCookie=good; Max-Age=600"); 
	Cookie cookie = new Cookie("myCookie", "good"); 
	cookie.setMaxAge(600); //600초
    response.addCookie(cookie);
 }
```

#### Redirect
```java
private void redirect(HttpServletResponse response) throws IOException {
     //Status Code 302
     //Location: /basic/hello-form.html

     //response.setStatus(HttpServletResponse.SC_FOUND); //302
     //response.setHeader("Location", "/basic/hello-form.html");
     response.sendRedirect("/basic/hello-form.html");
}
```