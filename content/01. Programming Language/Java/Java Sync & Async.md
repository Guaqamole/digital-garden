---
title: Java Sync & Async
date: 2023-12-09
draft: false
tags:
  - Java
complete: true
---

데이터 처리 모델을 쉽게 표현하자면 데이터를 받는 방식이라고 할수 있습니다.
이 방식에는 **동기식 처리와 비동기식 처리 모델이 존재합니다**.
이 둘의 개념에 대해 알아보고 둘의 차이점을 알아보겠습니다.

![https://velog.velcdn.com/images%2Fslobber%2Fpost%2F0722db09-f9f9-4f61-8708-4e9d53924fee%2F%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3%20(1).jpeg](https://velog.velcdn.com/images%2Fslobber%2Fpost%2F0722db09-f9f9-4f61-8708-4e9d53924fee%2F%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3%20(1).jpeg)

## 💡동기(synchronous)

- 동기는 데이터의 요청과 결과가 한 자리에서 동시에 일어나는것을 말합니다.

**요청을 하면 시간이 얼마나 걸리던지 요청한 자리에서 결과가 주어져야 합니다.**

*사용자가 데이터를 서버에게 요청한다면 그 서버가 데이터 요청에 따른 응답을 사용자에게 다시 리턴해주기 전까지 사용자는 다른 활동을 할 수 없으며 기다려야만합니다.*

**ex)**

브라우저를 실행시키는 시간이 약 10분이 소모된다고 가정했을시, 브라우저가 실행되는10분이라는 시간 동안 사용자는 컴퓨터💻의 다른 프로그램들을동작시키지 못하며 브라우저가 켜지는 그 순간만을 계속 기다려야한다는 것입니다. 이 시간이 10분이든 100분이든 관계없이 **한 개의 데이터 요청에 대한 서버의 응답이 이루어질 때까지 계속 대기해야만합니다.**

---

## 🕯 비동기(Asynchronous)

- 비동기는 동시에 일어나지 않는다는 의미입니다.
    
    **요청한 결과는 동시에 일어나지 않을거라는 약속입니다.**
    

*서버에게 데이터를 요청한 후 요청에 따른 응답을 계속 기다리지 않아도되며 다른 외부 활동을 수행하여도되고 서버에게 다른 요청사항을 보내도 상관없습니다*

Spring webflex → 비동기

---

## 동기와 비동기의 장단점

### 💡 동기

장점 : 설계가 매우 간단하고 직관적이다.

단점 : **결과가 주어질 때까지 아무것도 못하고 대기해야 합니다.**

---

### 🕯 비동기

장점 : 요청에 따른 결과가 반환되는 시간 동안 다른 작업을 수행할 수 있습니다.

단점 : 동기식보다 설계가 복잡합니다.

## 비동기 주의점

- Thread scope 변수 관리 Locale → ThreadLocal
    - 파라미터 넘겨주기
    - 외부세션, 외부 DB 참조하는 방법
- 동시성 관리
    - 동시에 접근해서 쓰는 자원 → Create, Update
    - 세마포어, 락 → 자원에 접근하는 제한자 → N개의 동작만 그 순간에
- 실패 지점 처리
- 비동기의 대안 spring batch

API thread

동작이 수행되는 Thread 들

## Block vs Non-Block

> 👀 블록 과 논블럭의 차이
> 

블록 과 논블럭은 동기, 비동기와 연결되는 개념입니다.

### 🧱 블록이란?

- 블록이란 동기의 개념에서 만들어진 상태로

브라우저가(크롬) 실행되는 시간이 10분(요청)이라고 가정했을시에

브라우저가(크롬) 이 오픈(결과) 되기전까지 다른 브라우저(사파리 등등)은 계속 대기해야 하는 상태를 **블록 상태**라고 부릅니다.

---

### ⚙️ 논블록이란?

- 논블록이란 비동기 개념에서 만들어진 상태로

브라우저가(크롬) 실행되는 시간이 10분(요청)이라고 가정했을시에

브라우저가(크롬) 이 오픈(결과) 되기전까지 다른 브라우저(사파리 등등)은 시간을 대기 하지 않고 제약없이 자유롭게 사용할수 있는 상황을 **논블록 상태** 라고 부릅니다.

---

> 📝 블럭과 논블럭 정리
> 
- 블록이란 동기의 개념에서 만들어진 상태
- 논블록이란 비동기 개념에서 만들어진 상태

- **기다림** Blocking / **기다리지 않음** Non-blocking
- **내가 함** Synchronous / **다른 사람 시킴** Asynchronous

(1)손님이 식당에서 (2)주방장에게 (3)요리를 시킨다고 가정
- sync- blocking: 손님 요리 요청 -> 주방장 요리 시작 -> 요리 시작 알림
- sync - nonblocking: 손님 요리 요청 -> 요리 서빙
- async - blocking: 손님 요리 요청 -> 주방장 요청 확인 -> 주방장 요리 시작 -> 요리 서빙 -> 주방장 요청 완료
- async - nonblocking -> 

![https://blog.kakaocdn.net/dn/s4GhX/btry69JJgmj/LkjtlqXss4xSsMQUCnjx21/img.png](https://blog.kakaocdn.net/dn/s4GhX/btry69JJgmj/LkjtlqXss4xSsMQUCnjx21/img.png)

1. Sync-Blocking
    
    앞의 blocking 설명과 사실상 동일합니다. 내가 복합기 앞으로 갑니다. 시작 버튼을 누릅니다. 다른 일 못하고 기다립니다. 완료되면 그제야 내 자리로 돌아가 스캔 완료된 파일을 사용합니다.
    
2. Sync-NonBlocking
    
    앞의 non-blocking 설명과 동일합니다. 내가 복합기 시작 버튼을 누릅니다. 자리로 돌아옵니다. 틈틈이 스캔이 완료되었는지 확인해줘야 합니다. 하지만 다른 일을 할 수 있습니다. 다른 일을 못 하면서까지 앞에 가서 기다리지는 않습니다.
    
3. Async-Blocking
    
    드디어 심부름꾼이 등장합니다. 나는 내 자리에 그대로 앉아있습니다. 나는 다른 일을 하는 동안, 심부름꾼에게 스캔을 하도록 시킵니다. 심부름꾼이 복합기 앞으로 갑니다. 시작 버튼을 누릅니다. 이 사람은 다른 일 못하고 이것만 기다립니다. 완료되면 심부름꾼은 내 자리로 돌아와 스캔이 완료되었다고 알려줍니다.
    
4. Async-NonBlocking
    
    나는 내 자리에 앉아서 내 일하는 동안, 심부름꾼에게 스캔을 하도록 시킵니다. 심부름꾼이 복합기 앞으로 가서 시작 버튼을 누릅니다. 심부름꾼은 스캔을 기다리면서 커피를 내려 마시면서 일기를 씁니다. 일기를 쓰는 동안, 틈틈이 스캔이 완료되었는지 곁눈질로 확인합니다. 스캔이 완료되면 내 자리로 돌아와 스캔이 완료되었다고 알려줍니다.
    

##### 내 서비스가 지금 블락 방식
→ 타 서비스 * DB 호출 시에 응답이 올 때까지 기다린다

##### 내 서비스가 지금 비동기 방식
→ 내 서비스는 바로 상태 응답을 내어주고, 나중에 처리한 후에 응답을 전송하는 형태 

##### Spring 비동기 Async

##### API Thread
→  thread 비동기 작업 하나 당 한 개씩
→ thread limit 설정한대로

##### Thread 여러개
200~300

Spring → Thread

API 200 개 Queue
Spring MVC →API thread
30개 thread 

## Spring Async

### @Async
**`@Async` Annotation**은 **Spring에서 제공**하는 **Thread Pool을 활용하는 비동기 메소드 지원 Annotation**이다.

기존 **Java에서 비동기 방식으로 메소드를 구현할 때는 아래와 같이 구현**할 수 있었다.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class GillogAsync {

    static ExecutorService executorService = Executors.newFixedThreadPool(5);

    public void asyncMethod(final String message) throws Exception {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                // do something
            }
        });
    }
}
```

**`java.util.concurrent.ExecutorService`을 활용**해서 **비동기 방식의 method를 정의 할 때마다**,

위와 같이 **`Runnable`의 `run()`을 재구현해야 하는 등 동일한 작업들의 반복**이 잦았다.

### With @Async
**`@Async` Annotation을 활용하면 손쉽게 비동기 메소드 작성이 가능**하다.

**만약 `Spring Boot`에서 간단히 사용**하고 싶다면, 단순히 **`Application` Class에 `@EnableAsync` Annotation을 추가**하고,

```java
@EnableAsync
@SpringBootApplication
public class SpringBootApplication {
    ...
}
```

**비동기로 작동하길 원하는 method 위에 `@Async` Annotation을 붙여주면 사용**할 수 있다.

```java
public class GillogAsync {

    @Async
    public void asyncMethod(final String message) throws Exception {
        ....
    }
}
```

위와 같은 **사용은 간단하지만 `@Async`의 기본설정인 `SimpleAsyncTaskExecutor`를 사용**한다.

![https://velog.velcdn.com/images%2Fgillog%2Fpost%2F37347b0e-42d5-47db-ad12-4267fa101838%2Fimage.png](https://velog.velcdn.com/images%2Fgillog%2Fpost%2F37347b0e-42d5-47db-ad12-4267fa101838%2Fimage.png)

**본인의 개발 환경에 맞게 Customize하기에는 직접 `AsyncConfigurerSupport`를 상속받는 Class를 작성**하는 것이 좋다.

### AsyncConfigurerSupport
**아래와 같은 `AsyncConfigurerSupport`를 상속받는 Customize Class를 구현**하자.

```java
import java.util.concurrent.Executor;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig extends AsyncConfigurerSupport {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5); -> 기다리는 스레드 -> 비동기용 스레드
        executor.setMaxPoolSize(30);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("DDAJA-ASYNC-");
        executor.initialize();
        return executor;
    }
}
```

여기서 **설정한 요소들은 아래**와 같다.

- **@Configuration** : **Spring 설정 관련 Class로 @Component 등록되어 Scanning** 될 수 있다.
- **@EnableAsync** : **Spring method에서 비동기 기능을 사용가능하게 활성화** 한다. → Application or config
- **CorePoolSize :** 기본 실행 대기하는 Thread의 수**
- **MaxPoolSize : 동시 동작하는 최대 Thread의 수 → 동작이 부하가 있으면 thread**
- **QueueCapacity** : **MaxPoolSize 초과 요청**에서 **Thread 생성 요청시**,**해당 요청을 Queue에 저장**하는데 이때 **최대 수용 가능한 Queue의 수**,Queue에 저장되어있다가 **Thread에 자리가 생기면 하나씩 빠져나가 동작**
- **ThreadNamePrefix** : **생성되는 Thread 접두사** 지정

위와 같이 작성한 후 **비동기 방식 사용을 원하는 method에 `@Async` Annotation을 지정**해주면 된다.

---

## 주의사항
**`@Async` Annotation을 사용할 때 아래와 같은 세 가지 사항을 주의**하자.

1. **private method는 사용 불가 → AOP → Spring proxy 객체**
2. **self-invocation(자가 호출) 불가**, 즉 **inner method는 사용 불가**
3. **QueueCapacity 초과 요청에 대한 비동기 method 호출시 방어 코드 작성**

**위 주의사항을 아래 사진과 함께 설명**을 해보면,

![https://velog.velcdn.com/images%2Fgillog%2Fpost%2F5bb64a29-5263-4fcc-9f02-cffea4162137%2Fimage.png](https://velog.velcdn.com/images%2Fgillog%2Fpost%2F5bb64a29-5263-4fcc-9f02-cffea4162137%2Fimage.png)

> 출처 : https://dzone.com/articles/effective-advice-on-spring-async-part-1
> 

**`@Async`의 동작**은 **AOP가 적용**되어 **`Spring Context`에서 등록된 Bean Object의 method가 호출 될 시**에,

**Spring이 확인**할 수 있고 **`@Async`가 적용된 method**의 경우 **Spring이 method를 가로채 다른 Thread에서 실행 시켜주는 동작 방식**이다.

이 때문에 **Spring이 해당 `@Async` method를 가로챈 후, 다른 Class에서 호출이 가능해야** 하므로,

**`private` method는 사용할 수 없는 것**이다.

또한 **`Spring Context`에 등록된 `Bean`의 method의 호출이어야 `Proxy` 적용이 가능**하므로,

**inner method의 호출은 `Proxy` 영향을 받지 않기에 `self-invocation`이 불가능**하다.

위 주의사항을 아래 예시 코드와 함께 살펴보자

## self-invocation(자가 호출) 불가
위에서 작성한 `AsyncConfig`를 사용하는 Spring Project에서 아래와 같이,

**같은 Class에 존재하는 method에 `@Async` Annotation을 작성해 비동기 방식을 사용**해보자.

```java
@Controller
public Class TestController {

    @Async
    public void asyncMethod(int i) {
        try {
            Thread.sleep(500);
            log.info("[AsyncMethod]"+"-"+i);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("async")
    public String testAsync() {
        log.info("TEST ASYNC");
        for(int i=0; i<50; i++) {
            asyncMethod(i);
        }
        return "";
    }
}
```

![https://velog.velcdn.com/images%2Fgillog%2Fpost%2F925c2314-0f9a-43b6-978b-bb5f6eef6dd7%2Fimage.png](https://velog.velcdn.com/images%2Fgillog%2Fpost%2F925c2314-0f9a-43b6-978b-bb5f6eef6dd7%2Fimage.png)

**작동 결과를 보면 비동기 방식으로 호출되지 않았고, 동기적으로 호출 순서대로 동작하는 것을 확인**할 수 있다.

**자가 호출에서는 `@Async` 사용이 불가**하다.

하지만, **`@Service`로 Bean 등록된 Service를 통해 주입하여 위 코드를 다시 작성**해보면,

```java
@Service
public class TestService {
    @Async
    public void asyncMethod(int i) {
        try {
            Thread.sleep(500);
            log.info("[AsyncMethod]"+"-"+i);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
    }
}

@AllArgsConstructor
@Controller
public Class TestController {

    private TestService testService;

    @GetMapping("async")
    public String testAsync() {
        log.info("TEST ASYNC");
        for(int i=0; i<50; i++) {
            testService.asyncMethod(i);
        }
        return "";
    }

}
```

![https://velog.velcdn.com/images%2Fgillog%2Fpost%2F97f0ec1f-c0f3-4d2f-b539-c573524b6707%2Fimage.png](https://velog.velcdn.com/images%2Fgillog%2Fpost%2F97f0ec1f-c0f3-4d2f-b539-c573524b6707%2Fimage.png)

위 사진과 같이 **호출 순서에 상관없이 비동기 방식으로 method가 호출** 되었고,

**`AsyncConfig`에서 prefix로 작성한 접두사도 정상적으로 붙은 것을 확인**할 수 있다.

## + Spring Event

### **스프링 이벤트를 사용하는 이유와 장점**

![https://blog.kakaocdn.net/dn/YpcAx/btrUsPdK81f/RzbwUa4oaJnWx56k1lBES1/img.jpg](https://blog.kakaocdn.net/dn/YpcAx/btrUsPdK81f/RzbwUa4oaJnWx56k1lBES1/img.jpg)

spring event

spring event를 사용하는 가장 주된 이유는 **'서비스 간의 강한 의존성을 줄이기 위함'**이라고 볼 수 있는데요.

예를 들어 어떤 상품을 주문하는 프로세스가 있고, 해당 프로세스는 내부적으로 주문을 처리한 뒤 푸시 메시지를 발송하고, 메일을 전송하는 과정을 거친다고 가정하겠습니다.

**'주문 처리'**와 **'푸시 메시지 발송', '메일 전송'** 기능이 각각의 서비스**(OrderService, PushService, MailService)**에 구현되어 있을 경우, 아래 코드와 같이 주문 처리를 하는 OrderService에서 푸시 메시지 발송을 하는 PushService와 메일 전송을 하는 MailService에 대한 의존성을 주입받아 사용하게 되는데요.

```java
@Service
public class OrderService {

    private final PushService pushService;
    private final MailService mailService;

    @Autowired
    public OrderService(PushService pushService, MailService mailService) {
        this.pushService = pushService;
        this.mailService = mailService;
    }
}
```

해당 예시는 간단한 경우지만 실제로 복잡한 도메인을 개발하게 되면 도메인 사이의 강한 의존성으로 인해 시스템이 복잡해지는 경우가 발생할 수 있다고 하며, 스프링 이벤트를 통해 이러한 도메인 간의 의존성을 줄일 수 있게 됩니다.

*(강한 결합으로 인해 발생하는 유지보수 측면의 문제점도 줄일 수 있습니다.)*

또한 이렇게 이벤트로 분리된 부분을 비동기 방식으로 처리하게 되면 전체 프로세스가 끝나는 시간도 짧아지게 된다는 성능 측면에서의 장점도 있는데요. 그러면 이어지는 내용을 통해 spring event의 구현 방법을 살펴보겠습니다.

### **2. 스프링 이벤트 구성 요소 및 동작 구현**

spring event는 크게 **'event class'**와 이벤트를 발생시키는 **'event publisher'** 그리고 이벤트를 받아들이는 **'event listener'** 3가지 요소로 볼 수 있는데요.

#### **2-1. event class**

```java
public class OrderedEvent {

    private String productName;

    public OrderedEvent(String productName) {
        this.productName = productName;
    }

    public String getProductName() {
        return productName;
    }
}
```

*(Spring Framework 4.2부터)*

**'event class'**는 이벤트를 처리하는데 필요한 데이터를 가지고 있으며, 기존에는 **ApplicationEvent** 클래스를 확장하여 사용하였지만 스프링 프레임워크 4.2 버전부터 위 예시와 같이 **ApplicationEvent**를 확장할 필요가 없어졌습니다.

#### **2. event publisher**

```java
@Slf4j
@Service
public class OrderService {

    ApplicationEventPublisher publisher;

    public OrderService(ApplicationEventPublisher applicationEventPublisher) {
        this.publisher = applicationEventPublisher;
    }

    public void order(String productName) {
//주문 처리
        log.info(String.format("주문 로직 처리 [상품명 : %s]", productName));
        publisher.publishEvent(new OrderedEvent(productName));

//4.2 버전 이전에서 event class가 ApplicationEvent를 구현하는 경우라면//publisher.publishEvent(new OrderedEvent(this, productName));
    }
}
```

**'event publisher'**는 **ApplicationEventPublisher** 빈을 주입하여 **publishEvent()** 메서드를 통해 생성된 이벤트 객체를 넣어주면 되는데요.

![https://blog.kakaocdn.net/dn/tsELF/btrUtFaoyDp/JQ92ZTEvinPZIZKv2CNncK/img.jpg](https://blog.kakaocdn.net/dn/tsELF/btrUtFaoyDp/JQ92ZTEvinPZIZKv2CNncK/img.jpg)

ApplicationEventPublisher interface

앞의 **'event class'**에서도 언급하였지만 Spring Framework 4.2부터 **ApplicationEventPublisher** 인터페이스에서 다음과 같이 모든 객체를 이벤트로 하용하는 **publishEvent(Object event)** 메서드가 추가되었기 때문에 event class에서 ApplicationEvent를 상속받을 필요가 없어진 것입니다.

#### **3. event listener**

```java
@Component
public class OrderedEventListener implements ApplicationListener<OrderedEvent> {

    @Override
    public void onApplicationEvent(OrderedEvent event) {
        ...
    }
}
```

*(Spring Framework 4.2 이전)*

```java
@Slf4j
@Component
public class OrderedEventListener {

    @EventListener
    public void sendPush(OrderedEvent event) throws InterruptedException {
        log.info(String.format("푸시 메세지 발송 [상품명 : %s]", event.getProductName()));
    }

    @EventListener
    public void sendMail(OrderedEvent event) throws InterruptedException {
        log.info(String.format("메일 전송 [상품명 : %s]", event.getProductName()));
    }
}
```

*(Spring Framework 4.2부터)*

**'event listener'** 역시 스프링 프레임워크 4.2 버전을 기점으로 더 사용하기 쉽게 바뀌었는데요.

**@EventListener** 어노테이션을 통해 발생하는 이벤트를 캐치할 수 있으며, 기존과 같이 **ApplicationListener<CustomEvent>** 인터페이스를 구현하여 사용할 필요가 없어졌습니다.

### @TransactionalEvent 알아보기

[Spring Event, @TransactionalEventListener 사용하기](https://wildeveloperetrain.tistory.com/246)

### 원리가 궁금하다면

[[Spring] Spring의 Event 처리 과정](https://gudwnsgur.tistory.com/19)