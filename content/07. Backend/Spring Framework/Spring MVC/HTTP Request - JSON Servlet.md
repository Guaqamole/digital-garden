---
title: HTTP Request - JSON
date: 2024-04-23
draft: false
tags: 
complete: true
---
## HTTP 요청 데이터 - API 메시지 바디 - 단순 텍스트
**HTTP message body**에 데이터를 직접 담아서 요청 
- HTTP API에서 주로 사용, JSON, XML, TEXT 
- 데이터 형식은 주로 JSON 사용  
- POST, PUT, PATCH
- 먼저 가장 단순한 텍스트 메시지를 HTTP 메시지 바디에 담아서 전송하고, 읽어보자. 
- HTTP 메시지 바디의 데이터를 InputStream을 사용해서 직접 읽을 수 있다.

```java
@WebServlet(name = "requestBodyJsonServlet", urlPatterns = "/request-body-json")  
public class RequestBodyJsonServlet extends HttpServlet {  
    @Override  
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        ServletInputStream inputStream = req.getInputStream();  
        String body = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);  
        
        System.out.println(body);  
    }  
}
```

> [!info]  **참고**  
inputStream은 byte 코드를 반환한다. byte 코드를 우리가 읽을 수 있는 문자(String)로 보려면 문자표 (Charset)를 지정해주어야 한다. 여기서는 UTF_8 Charset을 지정해주었다.
## jackson 선언 후 json 읽어보기
**HelloData.java**
```java
@Getter  
@Setter  
public class HelloData {  
    private String username;  
    private int age;  
  
}
```

```java
@WebServlet(name = "requestBodyJsonServlet", urlPatterns = "/request-body-json")  
public class RequestBodyJsonServlet extends HttpServlet {  
  
    private ObjectMapper mapper = new ObjectMapper();  
  
    @Override  
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {  
        ServletInputStream inputStream = req.getInputStream();  
        String body = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);  
  
        HelloData data = mapper.readValue(body, HelloData.class);  
        System.out.println("username = " + data.getUsername());  
        System.out.println("age = " + data.getAge());  
    }  
}
```

```sh
curl --location 'http://localhost:8080/request-body-json' \
--header 'Content-Type: application/json' \
--data '{
    "username": "john",
    "age": 31
}'


== output ==
username = john
age = 31
```
