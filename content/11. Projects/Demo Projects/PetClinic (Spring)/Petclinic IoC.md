---
title: Petclinic IoC
date: 2024-04-02
draft: false
tags: 
complete: true
---
## IoC
제어 역전이라는 말인데 여기선 주로 의존성의 제어가 역전되었다는 의미이다.

### Owner Controller 예제
- 위치 : petclinic.owner.OwnerController
- Owner Controller는 Owner Repository가 없으면 안되기 때문에 의존성이 걸려있다.
- 아래 예제에서는 new() 명령어로 새로운 OwnerRepository 객체를 만드는데 “누가” 만드느냐가 관건이다.
- 내가 만들지 않고 다른 객체가 만들게 되는 순간이 바로 제어가 역전된 순간이다.

### IoC 가 적용되지 않을때
> “ 내가 쓸놈은 내가 만들어 쓸게… ” → 일반적인 의존성에 대한 제어권
```java
class OwnerController {
	private OwnerRepository repository = new OwnerRepository();
}
```


### IoC 가 적용되었을 때
- 생성자의 parameter로 의존성 주입 가능
- 의존성을 제어하는 주체가 바뀔 수 있도록 세팅
```java
@Controller  
class OwnerController {
	private final OwnerRepository owners;
	
	public OwnerController(OwnerRepository clinicService) {  
	   this.owners = clinicService;  
	}
}
```

### 의존성 주입 at Test
```java
class OwnerControllerTest {
	@Test
	public void create() {
		OwnerRepository repo = new OwnerRepository();
		OwnerController controller = new OwnerController(repo); // 의존성 주입
	}
}
```

---
## IoC Container
SPFW은 ioc를 위한 컨테이너를 제공한다. 대표적인 Interface가 바로 `application context` , `bean factory` 이다.
- 근데 직접 쓸일은 없다…
- 스포: 빈을 만들고 엮어주면 제공하는 놈.
	- 이름 또는 ID
	- 타입
	- 스코프

### Application Context
- owner controller가 container안에서 객체가 생성되고 (bean) 의존성 관리를 해준다.
- 정확히는 bean의 의존성을 관리해준다.

```java
@Controller  
class OwnerController {}

@Entity  
@Table(name = "owners")  
public class Owner extends Person {}
```

위 예시에서, `OwnerController` 는 Bean 이지만, `Owner` 는 Bean이 아니다.
- `@Controller` , `@Component` 이런 Annotaion으로 등록되어있으면 IoC Container 안에서 객체를 생성하고 주입한다.

----
## Bean
Spring IoC Container 가 관리하는 객체

### OwnerRepository 는 IoC 컨테이너가 관리하는 객체인가? 그럼 Pet은?
→ IOC Container에서 Bean 으로 등록 되려면 어떻게 해야하나?
→ 2가지 방법이 존재.

#### 1. Component Scan `@Component`
`PetClinicApplication`에 보면 `@SpringBootApplication` 이 붙어있다. 설명을 보면 아래에 3가지 기능이 붙어있다.
- ComponentScan
- SpringBootConfiguration
- EnableAutoConfiguration

그럼, 어노테이션은 기능이 없는 Marker 같은 기능인데 어떻게 빈등록이 가능할까? 바로 ComponentScan으로 등록된 객체를 바라보는녀석이 객체로 만들어준다.

#### 2. 직접 일일히 XML이나 자바 설정 파일에 등록
직접 `@Bean` 객체를 등록해서 사용 가능.
```java
@SpringBootApplication  
@ImportRuntimeHints(PetClinicRuntimeHints.class)  
public class PetClinicApplication {  
   @Bean  
   public String namkyu() {return "KIMNAMKYU";}  
   
   public static void main(String[] args) {  
      SpringApplication.run(PetClinicApplication.class, args);  
   }  
}
```

하지만, `@Configuration` 이라는 annocation을 가진 class 안에서만 사용이 가능하다. `@SpringBootConfiguration` 을 들어가보자.

```java
@Target({ElementType.TYPE})  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
@Configuration  
@Indexed  
public @interface SpringBootConfiguration {  
    @AliasFor(  
        annotation = Configuration.class  
    )  
    boolean proxyBeanMethods() default true;  
}
```
위와 같이 `@Configuration` 이 있는걸 볼 수 있다.

### 그럼 어떻게 이 Bean 을 꺼내쓸까요?
```java
@RestController  
public class SomeController {  

   // 1번 방법
   @Autowired 
   ApplicationContext applicationContext;  

   // 2번 방법
   @Autowired  
   String namkyu;  
  
   @GetMapping("/context")  
   public String context() {  
      return "hello " + applicationContext.getBean(OwnerRepository.class);  
   }  
}
```

두가지 방법이 있다:
1. `ApplicationContext` 에서 꺼내쓰는 방법과 `applicationContext.getBean()`
2. `@Autowired` or `@Inject` 어노테이션으로 의존성을 주입하여 넣는방법.