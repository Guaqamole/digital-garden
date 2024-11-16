---
title: Spring AOP
date: 2023-12-10
draft: false
tags:
  - Springboot
complete: true
---

AOP(Aspect Oriented Programming) 관점 지향 프로그래밍

AOP는 객체 지향 프로그래밍 한계를 보완하기 위해 등장한 프로그래밍 패러다임입니다.

스프링 AOP는 코드의 횡단 관심사를 분리하여 모듈화하고 공통 로직을 재사용하는 기능을 제공합니다.


> [!NOTE]
> 💡 횡단 관심사
> 애플리케이션의 여러 부분에서 공통으로 사용되는 로직
> 애플리케이션 전반에 걸쳐 중복되어 사용이 될 수 있음
> ex) 로깅, 보안, 트랜잭션 관리

![](https://i.imgur.com/kiOZMN6.png)

각각의 Service의 비즈니스 로직 관점에서 User와 Order는 공통된 요소가 없지만 부가기능 관점에서 바라보면 공통 요소가 존재합니다.

![](https://i.imgur.com/Rzi9TRH.png)


각각의 Service의 getXX 메서드를 호출하는 전후에 before과 after라는 메서드가 공통됩니다!

이렇게 부가기능 관점에서의 공통 요소(가로 횡단 영역)을 추출하여 모듈화하는 것이 AOP입니다.

간단하게 OOP와 AOP의 차이점에 대해서 한 번 더 짚고 넘어갈 수 있습니다.

OOP : 비즈니스 로직의 모듈화 

AOP : 인프라 혹은 부가기능의 모듈화

## AOP의 구현 방법
- 컴파일 시점
    - `.java` 파일을 컴파일러를 통해 `.class`를 만드는 시점에 부가 기능 로직을 추가하는 방식
    - 모든 지점에 적용이 가능
- 클래스 로딩 시점
    - .class 파일을 JVM 내부의 클래스 로더에 보관하기 전에 조작하여 부가 기능 로직 추가하는 방식
    - 모든 지점에 적용 가능
    - 특별한 옵션과 클래스 로더 조작기를 지정해야하기 때문에 운영학 어려움
- 런타임 시점
    - 스프링이 사용하는 방식
    - 컴파일이 끝나고 클래스 로더에 이미 다 올라가 자바가 실행된 다음에 동작하는 런타임 방식
    - 프록시를 통해서 부가 기능이 적용되는 방식
    - **프록시는 메서드 오버라이딩 개념으로 동작하기 때문에 메서드에만 적용 가능 → 스프링 빈에만 AOP를 적용이 가능**

## AOP 용어
- Target
    - Advice의 대상이 되는 객체
    - Pointcut으로 결정이 됩니다
- Advice
    - 실질적인 부가 기능 로직을 정의하는 곳입니다
- Join Point
    - Advcie가 적용될 수 있는 모든 위치를 말합니다.
    - 스프링 AOP는 프록시 방식을 사용하기 때문에 조인 포인트는 항상 메서드 실행 지점입니다.
- Point cut
    - 조인 포인트 중에서 Advice가 적용될 위치를 선별하는 기능입니다.

### Advice

실질적인 부가 기능 로직을 정의하게 되는 곳입니다.

포인트컷에 지정된 대상 메서드에서 Advice가 실행되는 시점을 정할 수 있습니다. 또한 속성값으로 Pointcut을 지정할 수 있습니다.

- @Around
    - 뒤에 나올 4가지 애노테이션을 모두 포함하는 애노테이션
    - 메서드 호출 전후 작업 명시 가능
    - 조인 포인트 실행 여부 선택 가능
    - 반환값 조작 가능
    - 예외 자체를 조작 가능
- @Before
    - 조인 포인트 실행 이전에 실행
- @AfterReturning
    - 조인 포인트가 정상 완료 후 실행
- @AfterThrowing
    - 메서드가 예외를 던지는 경우 실행
- @After
    - 조인 포인트의 정상, 예외 동작과 무관하게 실행

### Advice 종류를 한 눈에 알아보기

```java
@Slf4j
@Aspect
public class AspectV6Advice {

    @Around("execution(* com.example.mvc.order..*(..))")
    public Object doTransaction(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            // @Before 수행
            log.info("[트랜잭션 시작] {}", joinPoint.getSignature());
            // @Before 종료

            // Target 메서드 호출
            Object result = joinPoint.proceed();
            // Target 메서드 종료

            // @AfterReturning 수행
            log.info("[트랜잭션 커밋] {}", joinPoint.getSignature());
            // @AfterReturning 종료

            // 값 반환
            return result;
        } catch (Exception e) {
            // @AfterThrowing 수행
            log.info("[트랜잭션 롤백] {}", joinPoint.getSignature());
            throw e;
            // @AfterThrowing 종료
        } finally {
            //@ After 수행
            log.info("[리소스 릴리즈] {}", joinPoint.getSignature());
            //@ After 종료
        }
    }
}
```

@Around를 제외한 나머지 4개의 애노테이션은 JoinPoint를 인자로 받아서 사용하고 proceed를 호출하지 않는다는 것을 알 수 있습니다.

위 코드를 간편하게 어노테이션으로 다시 표현하면

`@Before`

```java
@Before("execution(* com.example.mvc.order..*(..))")
public void doBefore(JoinPoint joinPoint) {
    log.info("[before] {}", joinPoint.getSignature());
}
```

**`@AfterReturing`**

```java
@AfterReturning(value = "execution(* com.example.mvc.order..*(..))", returning = "result")
public void doReturn(JoinPoint joinPoint, Object result) {
    log.info("[return] {} return={}", joinPoint.getSignature(), result);
}
```

**`@AfterThrowing`**

```java
@AfterThrowing(value = "execution(* com.example.mvc.order..*(..))", throwing = "ex")
public void doThrowing(JoinPoint joinPoint, Exception ex) {
    log.info("[ex] {} message={}", joinPoint.getSignature(), ex.getMessage());
}
```

### Pointcut

Pointcut은 Advice가 적용될 위치를 선별하는 기능입니다.

프록시 기반이기 때문에 메서드만 적용 가능하므로 어느 메서드에 적용할 것인지 명시하는 것입니다.

포인트컷 지시자의 종류는 여러가지가 있지만 주로 execution과 @Annotation만 사용합니다.

**execution**

```java
execution(접근제어자? 반환타입 선언타입?메서드이름(파리미터) 예외?)
```

- ?가 붙은 것은 생략이 가능합니다.
- * 패턴을 사용해서 모든 타입 허용을 표현합니다.
- 기본적으로 상위 타입을 명시하면 하위 타입에도 적용이 됩니다.

예시

```java
@Around("execution(* com.example.mvc.order..*(..))")
// 접근 제어자(private, public, ..) | 생략 
// 모든 반환 타입 허용 | *
// order와 order의 모든 하위 패키지를 허용함 | order..
// 모든 메서드 허용 | *
// 모든 파라미터 허용 | (..)
```

@Annotation

- @Annotation은 메서드가 주어진 애노테이션을 갖고 있는 경우에 적용이 됩니다.
- @Annotation도 종종 사용합니다.

예시

```java
// 부착할 애노테이션
package com.example.mvc.aop.member.annotation;
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MethodAop {
    String value();
}

public class MemberServiceImpl {
    // 대상 메서드에 부착
    @MethodAop("test value")
    public String hello(String param) {
        return "ok";
    }
}

// 적용
@Around("@annotation(com.example.mvc.aop.member.annotation.MethodAop)")
public Object doAtAnnotation(ProceedingJoinPoint joinPoint) throws Throwable {
    // 생략
}
```

## 실제 사용이 어떻게 될까?

### 비즈니스 로직 전 후에 로그 찍기

AOP 사용 전

```java
@GetMapping("/api/test1")
public String test1(@RequestBody DataDto dto) {

    log.info("Arg dto.id = {}", dto.getId());
    log.info("Arg dto.content = {}", dto.getContent());
    
    [ 비즈니스로직 수행 ... ]
    [ 비즈니스로직 수행 ... ]
    
    log.info("Return dto.id = {}", dto.getId());
    log.info("Return dto.content = {}", dto.getContent());
    
    return dto;
}

@GetMapping("/api/test2")
public String test2(@RequestBody DataDto dto) {

    log.info("Arg dto.id = {}", dto.getId());
    log.info("Arg dto.content = {}", dto.getContent());
    
    [ 비즈니스로직 수행 ... ]
    [ 비즈니스로직 수행 ... ]
    
    log.info("Return dto.id = {}", dto.getId());
    log.info("Return dto.content = {}", dto.getContent());
    
    return dto;
}
```

AOP 사용 후

```java
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

```java
@GetMapping("/api/test1")
public String test1(@RequestBody DataDto dto) {

    // log.info("Arg dto.id = {}", dto.getId());
    // log.info("Arg dto.content = {}", dto.getContent());
    
    [ 비즈니스로직 수행 ... ]
    [ 비즈니스로직 수행 ... ]
    
    // log.info("Return dto.id = {}", dto.getId());
    // log.info("Return dto.content = {}", dto.getContent());
    
    return dto;
}

@GetMapping("/api/test2")
public String test2(@RequestBody DataDto dto) {

    // log.info("Arg dto.id = {}", dto.getId());
    // log.info("Arg dto.content = {}", dto.getContent());
    
    [ 비즈니스로직 수행 ... ]
    [ 비즈니스로직 수행 ... ]
    
    // log.info("Return dto.id = {}", dto.getId());
    // log.info("Return dto.content = {}", dto.getContent());
    
    return dto;
}
```

@AOP 설정 클래스 만들어주기

```java
@Slf4j
@Aspect
@Component
public class SimpleLogAop {

    // com.aop.controller 이하 패키지의 모든 클래스 이하 모든 메서드에 적용
    @Pointcut("execution(* com.aop.controller..*.*(..))")
    private void cut(){}

    // Pointcut에 의해 필터링된 경로로 들어오는 경우 메서드 호출 전에 적용
    @Before("cut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.info("======= method name = {} =======", method.getName());

        // 파라미터 받아오기
        Object[] args = joinPoint.getArgs();
        if (args.length <= 0) log.info("no parameter");
        for (Object arg : args) {
            log.info("parameter type = {}", arg.getClass().getSimpleName());
            log.info("parameter value = {}", arg);
        }
    }

    // Poincut에 의해 필터링된 경로로 들어오는 경우 메서드 리턴 후에 적용
    @AfterReturning(value = "cut()", returning = "returnObj")
    public void afterReturnLog(JoinPoint joinPoint, Object returnObj) {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.info("======= method name = {} =======", method.getName());

        log.info("return type = {}", returnObj.getClass().getSimpleName());
        log.info("return value = {}", returnObj);
    }

    // JoinPoint로 메서드 정보 가져오기
    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
```

### @Transactional

<aside>
💡 @Transactional이 왜 AOP의 역할을 할까?

</aside>

- Transaction을 사용하려면 Transaction을 생성하고 commit하고 닫는 과정이 필요합니다.
- 이러한 인프라 부가 기능을 @Transactional 어노테이션을 통해 모듈화할 수 있습니다.

<aside>
💡 @Transactional로 AOP를 사용할 때 주의사항

</aside>

1. private 접근 제어자를 사용하는 메서드에는 @Transactional을 붙일 수 없다

스프링 AOP는 크게 JDK Dynamic Proxy 또는 CGLIB를 사용합니다.

springboot 1.4 버전 이후부터는 default로 CGLIB를 사용합니다. 

CGLIB는 동적으로 상속을 통해 프록시를 생성합니다. 따라서 private 메서드는 상속이 불가능하기 때문에 프록시로 만들어지지 않습니다.

1. 같은 클래스내에서 트랙잭션이 걸린 메소드를 호출하면 트랜잭션이 작동하지 않습니다.

```java
public class A {
	public void init() {
		this.progress();
	}

	@Transactional
	public void progress() {
	}
}
```

progress()는 정상적으로 트랜잭션이 적용되지 않습니다.

Spring AOP 프록시 동작 과정을 보면 프록시를 통해 들어오는 외부 메서드 호출을 인터셉트하여 작동합니다. 

하지만 내부 트랜잭션 메소드를 호출하면 프록시의 내부 빈에서 프록시를 호출하게 되며 에러가 발생합니다.

![](https://i.imgur.com/x9hb0WN.png)


main 메서드에서 A의 init()을 호출하고 init()에서 progress()를 호출하면 그림과 같이 프록시 내부에서 호출하게 되는데 proxy가 인터셉트하지 못하기 때문에 트랜잭션이 동작하지 않습니다.

**해결방법**

타겟 내에서 타겟의 다른 메서드를 호출할 때 런타임에 실제 트랜잭션이 작동하지 않는 것이기 때문에 컴파일 시점에 적용하면 됩니다.

Spring AOP는 앞서 말했듯이 런타임에 작동합니다. 따라서 컴파일 시점에 적용하기 위해서는 AspectJ를 사용해야 합니다.

하지만 , Spring AOP를 사용하고 싶다면 두 가지 방법이 있습니다.

1. AppContext를 이용하는 방법입니다.
- App Context의 currentProxy() 메서드는 현재 AOP proxy를 반환합니다.

```java
public void init() {
    ((MenuService)AopContext.currentProxy()).progress();
}

public void progress() {
    System.out.println("PROGRESS");
}
```

1. 자기 자신을 호출하는 방법입니다.
- 내부에서 프록시를 호출하면 인터셉터가 작동하지 않으므로 외부에서 호출하는 방식으로 해결하는 것입니다.
- @Resource
- @Autowired
- @Inject

```java
public class MenuService {
		// @Resouce를 통해 빈 객체로 등록해줍니다
    @Resource(name = "menuService")
    MenuService self;
    
		// self.progress()를 호출해줍니다.
    public void init(){
    self.progress();
		}
		
		@Transactional
		public void progress(){
		    System.out.println("PROGRESS");
		}
}
```

외부에서 내부 빈으로 호출하기 때문에 AOP가 정상 작동합니다.

다만, 스프링부트 2.6보다 낮은 버전에서 사용이 가능합니다. 왜냐하면 순환 참조를 금지하도록 변경됐기 때문입니다.

사용하고 싶다면 yml 파일에서 다음과 같이 설정해야 합니다.

```java
spring:
  main:
    allow-circular-references: true
```