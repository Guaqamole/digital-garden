---
title: Spring Boot Web
date: 2023-12-21
draft: false
tags:
  - Springboot
complete: true
---
`@ServletComponentScan` : 스프링 부트 애플리케이션 실행 시 서블릿(Servlet), 필터(Filter), 리스너(Listener)와 같은 서블릿 컴포넌트를 자동으로 검색하고 등록하는 것입니다.

### 주요 기능
- **자동 검색 및 등록**: `@ServletComponentScan`을 사용하면, 지정된 패키지(또는 그 하위 패키지) 내에 있는 `@WebServlet`, `@WebFilter`, `@WebListener` 어노테이션이 붙은 클래스들을 자동으로 검색하여 서블릿 컨텍스트에 등록합니다.
- **쉬운 설정**: 전통적인 서블릿 기반 애플리케이션에서는 `web.xml` 파일을 사용하여 서블릿과 필터, 리스너를 구성했지만, `@ServletComponentScan`을 사용하면 이러한 설정을 어노테이션 기반으로 간단하게 처리할 수 있습니다.

### 사용 예시
```java
@SpringBootApplication
@ServletComponentScan("com.example.myapp")  // 이 패키지 내 서블릿 컴포넌트를 검색하여 등록
public class MyAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyAppApplication.class, args);
    }
}
```

이 예시에서, `@ServletComponentScan("com.example.myapp")`은 `com.example.myapp` 패키지와 그 하위 패키지에서 서블릿 관련 컴포넌트를 검색하고 등록하도록 지시합니다.

### 주의사항
- **스프링 부트 자동 설정**: 스프링 부트는 많은 서블릿 컴포넌트를 자동으로 설정합니다. 때문에 `@ServletComponentScan`은 특정한 상황에서만 필요할 수 있으며, 대부분의 경우 스프링 부트의 자동 설정만으로 충분할 수 있습니다.
- **성능 고려**: 큰 애플리케이션에서는 `@ServletComponentScan`이 검색 범위가 넓어지므로 시작 시간에 영향을 줄 수 있습니다. 필요한 경우에만 사용하고, 검색 범위를 적절히 제한하는 것이 좋습니다.