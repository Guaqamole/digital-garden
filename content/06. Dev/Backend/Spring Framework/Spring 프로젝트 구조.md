---
title: Spring 프로젝트 구조
date: 2023-11-26
draft: false
tags:
  - Springboot
  - Concept
complete: true
---
스프링부트 프로젝트의 전체 구조는 다음과 같다.

![](https://wikidocs.net/images/page/160947/O_2-01_1.png)

### src/main/java
src/main/java의 com.mysite.sbb 패키지는 자바 파일을 작성하는 공간이다. 자바 파일로는 HelloController와 같은 스프링부트의 컨트롤러, 폼과 DTO, 데이터 베이스 처리를 위한 엔티티, 서비스 파일등이 있다.


### SbbApplication.java
모든 프로그램에는 시작을 담당하는 파일이 있다. 스프링부트 애플리케이션에도 시작을 담당하는 파일이 있는데 그 파일이 바로 `<프로젝트명>` + Application.java 파일이다. 스프링부트 프로젝트를 생성할때 "Sbb"라는 이름을 사용하면 다음과 같은 SbbApplication.java 파일이 자동으로 생성된다.

`[파일명:/sbb/src/main/java/com/mysite/sbb/SbbApplication.java]`

```java
package com.mysite.sbb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SbbApplication {

    public static void main(String[] args) {
        SpringApplication.run(SbbApplication.class, args);
    }
}
```

SbbApplication 클래스에는 위와 같이 반드시 `@SpringBootApplication` 애너테이션이 적용되어 있어야 한다. @SpringBootApplication 애너테이션을 통해 스프링부트의 모든 설정이 관리된다.


### src/main/resources
src/main/resources는 자바 파일을 제외한 HTML, CSS, Javascript, 환경파일 등을 작성하는 공간이다.


### templates
src/main/resources의 하위인 templates에는 템플릿 파일을 저장한다. 템플릿 파일은 HTML 파일 형태로 자바 객체와 연동되는 파일이다. templates에는 SBB의 질문 목록, 질문 상세 등의 HTML 파일을 저장한다.


### static
static는 SBB 프로젝트의 스타일시트(.css), 자바스크립트(.js) 그리고 이미지 파일(.jpg, .png) 등을 저장하는 공간이다.


### application.properties
application.properties 파일은 SBB 프로젝트의 환경을 설정한다. SBB 프로젝트의 환경, 데이터베이스 등의 설정을 이 파일에 저장한다.


### src/test/java
src/test/java는 SBB 프로젝트에서 작성한 파일을 테스트하기 위한 테스트 코드를 작성하는 공간이다. JUnit과 스프링부트의 테스팅 도구를 사용하여 서버를 실행하지 않은 상태에서 src/main/java에 작성한 코드를 테스트할 수 있다.


### build.gradle 
그레이들(Gradle)이 사용하는 환경 파일이다. 그레이들은 그루비(Groovy)를 기반으로 한 빌드 도구로 Ant, Maven과 같은 이전 세대 빌드 도구의 단점을 보완하고 장점을 취합하여 만든 빌드 도구이다. build.gradle 파일에는 프로젝트를 위해 필요한 플러그인과 라이브러리 등을 기술한다.

---

### Spring MVC
MVC가 조금 더 포괄적이 개념이라 생각한다.  
고로 MVC안에 Spring web Layer를 넣어보면

Model : Service, DTO, Repository, Domain  
View : Front-end  
Controller : Controller

## 계층형 구조, 도메인형 구조
기본적이 틀은 레이어 계층형과 도메인형으로 구성되어 있다고 생각합니다.

### 계층형
![](https://velog.velcdn.com/images/sunil1369/post/baf9dc40-c059-43d0-bfd5-bc16daeb69de/image.png)

계층형 구조는 각 계층을 대표하는 디렉터리를 기준으로 코드를 구성하는 것이다.

- 장점 : 프로젝트의 이해도가 낮아도 전체적인 구조 파악을 빠르게 할 수 있다.
- 단점 : 디렉터리 안에 클래스들이 너무 모인다.

### 도메인형
![](https://velog.velcdn.com/images/sunil1369/post/ee88d016-a09a-4d89-9fee-13cdfa8f9902/image.png)

도메인 디렉터리를 기준으로 코드를 구성하는 것이다.

- 장점 : 도메인의 관련 코드를 응집할 수 있다.
- 단점 : 프로젝트의 이해도가 낮을 경우 전체적인 구조를 파악하기 어렵다.


## 계층형 Directory 구조
### src/main/java

자바파일들을 담는다.

- web(controller)
- service
- db
    - repository(dao)
    - entity
- global(공통적으로 사용되는 것들)
    - auth
    - exception
- model(dto)
- config

### src/main/resources
리소스 파일들을 담는다.

- static
    - js, css, img
- templates
    - thymeleaf
- application.properties
- ㅇㅇㅇ.properties


### src/test/java
테스트에 필요한 Junit 테스트 케이스


### src/test/resources
테스트에 필요한 설정파일


## 도메인형 Directory 구조

### src/main/java
자바파일들을 담는다.

- domain
    
    - graduation
        - controller
        - entity
        - service
        - repository
        - exception
        - model(dto)
    - blog
        - controller
        - entity
        - service
        - repository
        - exception
        - model(dto)
- global(공통적으로 사용되는 것들)
    
    - auth
    - exception
    - common
        - request
        - response
    - config

아래는 위와 동일합니다.