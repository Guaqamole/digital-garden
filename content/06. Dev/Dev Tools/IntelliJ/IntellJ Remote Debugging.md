---
title: IntellJ Remote Debugging
date: 2024-11-14
draft: false
tags:
  - DevTools
  - IntelliJ
complete: true
---
## Overview
배포되어있는 어플리케이션을 대상으로 원하는 지점에서 디버깅을 하기위해 IntellJ 셋업 방법을 알아보고 디버깅에 대해 자세히 알아본다.

### Debugger, Debugee
`Intellij`나 `Ecplise`와 같은 IDE(Integrated development environment, 통합 개발 환경)에서 
제공해주는 디버깅 기능을 사용해본 경험이 있을겁니다.

Debugging 모드로 실행하는 것은 어떤 의미인지 간단하게만 짚고 넘어갑시다.  
`Intellij` 같은 `IDE`에서 디버깅 모드로 실행을 하면,  해당 실행 어플리케이션을 
Debugee(디버그 대상)으로 실행하고, Debugger(디버거)로서의 역할을 수행합니다.
- IDE → Debugger
- App → Debugee

`JPDA(Java Platform Debugger Architecture)` 라는 구조에서 동작하게 된다고 하고,  
그리고 이 `JPDA`는 `JVM TI`, `JDI`라는 두개의 인터페이스와 `JDWP`라는 프로토콜로 구성되어 있다고 합니다.

각각에 대해 간단히 설명하자면 다음과 같습니다.
- JWM TI(**JVM** **T**ools **I**nterface): 디버깅이 진행중인 어플리케이션을 실행하는 VM
- JDI(**J**ava **D**ebug **I**nterface): 애플리케이션이 디버깅되는 동안 `IntelliJ IDEA`가 애플리케이션과 상호 작용할 수 있도록 하는 Java API. (Ex. 코드를 단계별로 진행, breakpoint 생성, 변수를 검사 등의 작업은 JDI 호출로 변환)
- JDWP(**J**ava **D**ebugging **W**ire **P**rotocol): JDWP는 디버깅 중인 프로세스(디버거)와 디버거(이 경우 IntelliJ IDEA) 간에 전송되는 정보 및 요청의 형식의 프로토콜.
중요한건, `Java Application`을 디버깅 모드로 실행하면 `[Debuggee]`와 `[Debugger]`가 따로 존재하고, 특정 JVM 기준이나 구조를 구현한 기능들을 사용한다는 점 입니다. 그리고, 이 `[Debuggee]`와 `[Debugger]` 사이에 `JDWP`라는 프로토콜을 통해 통신을 한다는 점 입니다.

### JVM Debug의 동작원리
![|975](https://i.imgur.com/KwntKxq.png)

IDE를 사용하여 디버깅을 하는 경우 위 그림에서 debuggee에 해당하는 VM이 디버깅을 하고자 하는 애플리케이션이 되고 JDI에 해당하는 front-end는 실제로 디버깅을 진행하는 IDE가 됩니다.

이렇게 VM과 디버거는 JDWP라는 프로토콜을 통해 연결되어 디버깅을 수행한다.
  
이 점은 로컬에서 디버깅을 할 때도 동일한데요, 인텔리제이에서 디버그를 시작하면 콘솔에 아래와 같은 메시지가 찍혀있는 것을 볼 수 있다.
![|800](https://i.imgur.com/1Nz6eNv.png)
위 메시지는 쉽게 말해 127.0.0.1의 2062 포트에 접속해서 디버깅을 할 애플리케이션에 연결을 했다는 뜻입니다.

그렇다면 위의 `127.0.0.1:2062`에 해당하는 주소를 원격으로 디버깅하려는 서버의 주소로 변경을 하면 되겠네요!


## Remote Debugging
그렇다면, 서버에서 실행중인 어플리케이션을 `Debuggee`, 이를 디버깅 하는 `Debugger`로 `intellij`를 사용하면 원격으로 디버깅이 가능합니다.

방식은 간단합니다.  Server에 배포하는 Java Application을 실행할 때 다음과 같은 매개변수를 설정합니다.

```java
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8081 -jar application.jar
```
- `agentlib:jdwp=transport=dt_socket` : JVM에 JDWP를 에이전트로 등록하여 디버거가 JVM에 소켓 방식으로 연결할 수 있도록 설정합니다. 실행중인 두 어플리케이션을 연결할 때, 소켓이 표준으로 사용됩니다.
- `server:y`: 서버 역할을 합니다.
- `suspend=n`: 디버거를 기다리지 않고, 즉시 프로그램을 실행합니다.
- `address=*:8081`: 8081 포트에 디버거가 연결될 수 있도록 Listening 합니다.

### 1. Jar 준비
```java
package com.guaqamole.remote_debug;  
  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;  
import org.springframework.boot.SpringApplication;  
import org.springframework.boot.autoconfigure.SpringBootApplication;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RequestParam;  
import org.springframework.web.bind.annotation.RestController;  
  
@SpringBootApplication  
public class RemoteDebugApplication {  
  
    private static final Logger logger = LoggerFactory.getLogger(RemoteDebugApplication.class);  
  
    public static void main(String[] args) {  
       SpringApplication.run(RemoteDebugApplication.class, args);  
       logger.info("Application started on port 9090");  
    }  

    // curl -X GET "http://localhost:9090/check?body=hello"
    @RestController  
    class DebugController {  
       @GetMapping("/check")  
       public String checkRequest(@RequestParam(value = "body", defaultValue = "") String body) {  
          logger.info("Received request with body: {}", body);  
          if (body.contains("hello")) {  
             logger.info("Body contains 'hello'. Returning 'nice to meet you!'");  
             return "nice to meet you!";  
          } else {  
             logger.info("Body does not contain 'hello'. Returning 'meh'");  
             return "meh";  
          }  
       }  
    }  
}
```


### 2. Run Configuration 설정
- local IDE에서 설정
- Host: localhost
- Port: 5055 (default)
- Path: 원격 서버에 위치한 jar path


### 3. Remote Server 설정
debug 를 위한 jvm app 실행 (remote server 에서 실행하는거다.)
```python
#java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5055 -jar /tmp/remote-debug-0.0.1-SNAPSHOT.jar 안된다ㅜㅠ
java -agentlib:jdwp=transport=dt_socket,server=y -jar /tmp/remote-debug-0.0.1-SNAPSHOT.jar
Listening for transport dt_socket at address: 51671


```

local → remote 포트 열려있는지 확인
```python
telnet localhost 5055
```




