---
title: REST API with Springboot V2
date: 2023-11-30
draft: false
tags:
  - Backend
  - Springboot
  - API
  - HowTo
complete: true
---
## @RequestMapping
### Controller Package & GetController.java
- 안에 `GetController` 생성 

![](https://i.imgur.com/Ee5BOon.png)

##### GetController.java
`@RequestMapping` : 별다른 설정 없이 선언하면 HTTP의 모든 요청을 받는다. 그러나 **GET 형식의 요청만 받기 위해서는** 어노테이션에 별도 설정이 필요하다. 아래와 같이 어노테이션의 method 요소의 값을 `RequestMethod.GET` 으로 설정하면 요청 형식을 GET으로만 설정 할 수 있다.
```java
package com.springboot.api.controller;  
  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
@RequestMapping("/api/v1/get-api")  
public class GetController {  
    @RequestMapping(value = "/hello", method = RequestMethod.GET)  
    public String getHello() {  
        return "Hello From Spring!";  
    }  
}
```
- `/hello` 라는 url 에 GET 메소드를 호출하면 아래 스트링이 반한된다.

> [!danger]
> 스프링 4.3버전 이후로는 새로나온 아래의 어노테이션을 사용하기 때문에 `@RequestMapping` 어노테이션은 더이상 사용되지 않는다. 이번 예제에서는 특별히 사용하는것이다.


### 결과 확인
`http://localhost:8080/api/v1/get-api/hello`

![](https://i.imgur.com/E6oKpe2.png)

<br>

## 매개변수를 활용한 구현
##### GetController.java
`@GetMapping` 어노테이션과 `@PathVariable`을 활용해서 변수 삽입가능
```java
@GetMapping(value = "/hello/{variable}")  
public String getVariable1(@PathVariable String variable) {  
    return "Hello, " + variable;  
}
```
이러한 방식으로 코드를 작성 할 때는 몇가지 지켜야할 규칙이 있다. `@GetMapping` 어노테이션의 값으로 URL을 입력 할 때 중괄호를 사용해 어느 위치에서 값을 받을지 지정해야한다. 또한 매개변수와 그 값을 연결하기 위해 `@PathVariable`을 명시하며, `@GetMapping` 어노테이션과 지정된 **변수의 이름을 동일하게 맞춰야한다.**

### 만약 변수이름을 동일하게 맞추기 어렵다면?
`@PathVariable`에 괄호를 넣어 `@GetMapping` 어노테이션의 변수명을 지정.
```java
@GetMapping(value = "/hello/{variable}")  
public String getVariable1(@PathVariable("variable") String myvar) {  
    return "Hello, " + myvar;  
}
```

## @RequestParam을 활용한 구현
URI에서 `Query String` “?” 를 기준으로 우측에 ‘{키}={값}’ 형태로 구성된 요청을 전송하는 방법. 
이걸 구현하려면 `@RequestParam` 을 사용하면 된다.
```java
@GetMapping(value="/request")  
public String getRequestParam(  
        @RequestParam String name,  
        @RequestParam String email,  
        @RequestParam String company) {  
    return name + " " + email + " " + company;  
}
```
- 만약 키와 `@RequestParam` 뒤에 적는 이름을 동일하게 설정하기 어렵다면 `@PathVariable` 예제에서 사용한 방법처럼 value 요소로 매핑한다.
```
http://localhost:9090/api/v1/get-api/request?name=john&email=hello&company=boro

john hello boro
```
### 어떤 값이 들어올지 모른다면?
매개변수의 항목이 일정하지 않을 수 있다면 Java의 `Map` 객체를 활용.
```java
@GetMapping(value="/request/random")  
public String getRequestRandomParam(@RequestParam Map<String, String> param) {  
        StringBuilder sb = new StringBuilder();  
        param.entrySet().forEach(map -> {  
            sb.append(map.getKey() + " : " + map.getValue() + "\n");  
        });  
        return sb.toString();  
}
```

<br>

## [[DTO]] 객체를 활용한 GET 메서드 구현
![|346](https://i.imgur.com/3GAw6Eq.png)

**MemberDto.java**
```java
public class MemberDto {  
  
    private String name;  
    private String email;  
    private String company;  
  
    public String getName() {  
        return name;  
    }  
  
    public void setName(String name) {  
        this.name = name;  
    }  
  
    public String getEmail() {  
        return email;  
    }  
  
    public void setEmail(String email) {  
        this.email = email;  
    }  
  
    public String getCompany() {  
        return company;  
    }  
  
    public void setCompany(String company) {  
        this.company = company;  
    }  
      
    public String toString() {  
        return "MemberDto{" +  
                "name='" + name + '\'' +  
                ", email='" + email + '\'' +  
                ", company='" + company + '\'' +  
                '}';  
    }  
}
```

DTO 클래스에는 전달하고자 하는 필드 객체를 선언하고 getter / setter 메서드를 구현한다.

(중요) DTO 클래스에 선언된 필드는 컨트롤러의 메서드에 쿼리 파라미터 키와 매핑된다. 즉, 쿼리스트링의 키가 정해져 있지만 받아야할 파라미터가 많을 경우에는 DTO 객체를 활용해 코드의 가독성을 높일 수 있다. 이제 다시 컨트롤러로 돌아와보자.

```java
@GetMapping(value="/request/dto")  
public String getRequestRandomParam(MemberDto memberDto) {  
    return memberDto.toString();  
}
```

아까 전에 구현했던 `toString()` 메서드로 인해 실제로 리턴하는 결과는 다음과 같다:
```java
return memberDto.getName() + " " + memberDto.getEmail() + " " + memberDto.getCompany();
```

```
http://localhost:9090/api/v1/get-api/request/dto?name=john&email=nam&company=boro

MemberDto{name='john', email='nam', company='boro'}
```