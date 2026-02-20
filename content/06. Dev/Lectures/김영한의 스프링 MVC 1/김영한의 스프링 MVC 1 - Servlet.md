
# 1강
## Servlet 실습
```java
package com.guaqamole.study.servlet.basic;  
  
import jakarta.servlet.ServletException;  
import jakarta.servlet.annotation.WebServlet;  
import jakarta.servlet.http.HttpServlet;  
import jakarta.servlet.http.HttpServletRequest;  
import jakarta.servlet.http.HttpServletResponse;  
  
import java.io.IOException;  
  
@WebServlet(name = "helloServlet", urlPatterns = "/hello")  
public class HelloServlet extends HttpServlet {  
    @Override  
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        System.out.println("HelloServlet.service");  
        System.out.println("request = " + request);  
        System.out.println("response = " + response);  
    }  
}
```

http://localhost:8080/hello

```
HelloServlet.service
request = org.apache.catalina.connector.RequestFacade@52bc7d30
response = org.apache.catalina.connector.ResponseFacade@81cc669
```

## Query parameter
Servlet은 요청온 문자를 자동으로 파싱해준다.
```java
@Override  
protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
    System.out.println("HelloServlet.service");  
    System.out.println("request = " + request);  
    System.out.println("response = " + response);  
  
    String username = request.getParameter("username");  
    System.out.println("username = " + username);  
}
```

http://localhost:8080/hello?username=john

```
HelloServlet.service
request = org.apache.catalina.connector.RequestFacade@79c222d4
response = org.apache.catalina.connector.ResponseFacade@6519db9e
username = john
```


## Content-Type
```java
@Override  
protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
   
    response.setContentType("text/plain");  
    response.setCharacterEncoding("utf-8");  
    response.getWriter().write("hello " + username);  
}
```

http://localhost:8080/hello?username=john

![](https://i.imgur.com/xHDKeAR.png)

Response Body + Content-Type 이 세팅된것을 확인할 수 있다.

