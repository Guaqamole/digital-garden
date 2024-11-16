---
title: Swagger
date: 2023-12-03
draft: false
tags:
  - Springboot
  - Backend
complete: true
---
Springboot 3.x.x 버전대에서 Swgger 설정하는 법을 알아본다.

### 1. build.gradle
- dependenc에 openapi springdoc 을 추가한다.
**build.gradle**
```java
dependencies {  
   implementation 'org.springframework.boot:spring-boot-starter-data-jpa' 
   implementation 'org.springframework.boot:spring-boot-starter-web'  
   # 추가
   implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.0.2'  
   compileOnly 'org.projectlombok:lombok'  
   runtimeOnly 'com.mysql:mysql-connector-j'  
   annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'  
   annotationProcessor 'org.projectlombok:lombok'  
   testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

### 2. url
http://localhost:8080/swagger-ui/index.html
접속.


### 3. @Schema