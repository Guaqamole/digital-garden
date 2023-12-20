---
title: Spring Bean
date: 2023-12-20
draft: false
tags:
  - Spring
complete: true
link: https://melonicedlatte.com/2021/07/11/232800.html
---
## 스프링 빈(Spring Bean)이란?
`Spring IoC 컨테이너가 관리하는 자바 객체를 빈(Bean)`이라고 부릅니다. 이전 포스팅에서 **제어의 역전** (IOC, Inversion Of Control)에 대하여 간략하게 알아보았는데요. IOC의 특징은 아래와 같습니다.

> - 일반적으로 처음에 배우는 자바 프로그램에서는 **각 객체들이 프로그램의 흐름을 결정하고 각 객체를 직접 생성하고 조작하는 작업(객체를 직접 생성하여 메소드 호출)을 했습니다**. 
> - 즉, 모든 작업을 사용자가 제어하는 구조였습니다. 예를 들어 A 객체에서 B 객체에 있는 메소드를 사용하고 싶으면, B 객체를 직접 A 객체 내에서 생성하고 메소드를 호출합니다.
>
> - 하지만 **IOC가 적용된 경우, 객체의 생성을 특별한 관리 위임 주체에게 맡깁니다.** 이 경우 **사용자는 객체를 직접 생성하지 않고, 객체의 생명주기를 컨트롤하는 주체는 다른 주체**가 됩니다. 
> - 즉, 사용자의 제어권을 다른 주체에게 넘기는 것을 IOC(제어의 역전) 라고 합니다.

우리가 알던 기존의 Java Programming 에서는 Class를 생성하고 new를 입력하여 원하는 객체를 직접 생성한 후에 사용했었습니다. 하지만 Spring에서는 직접 new를 이용하여 생성한 객체가 아니라, Spring에 의하여 관리당하는 자바 객체를 사용합니다. 이렇게 **Spring에 의하여 생성되고 관리되는 자바 객체를 Bean**이라고 합니다. Spring Framework 에서는 Spring Bean 을 얻기 위하여 ApplicationContext.getBean() 와 같은 메소드를 사용하여 Spring 에서 직접 자바 객체를 얻어서 사용합니다.

빈(Bean)은 스프링 컨테이너에 의해 관리되는 재사용 가능한 소프트웨어 컴포넌트이다.
즉, 스프링 컨테이너가 관리하는 자바 객체를 뜻하며, 하나 이상의 빈(Bean)을 관리한다.

빈은 인스턴스화된 객체를 의미하며, 스프링 컨테이너에 등록된 객체를 스프링 빈이라고 한다.
`@Bean` 어노테이션을 통해 메서드로부터 반환된 객체를 스프링 컨테이너에 등록한다.
빈은 클래스의 등록 정보, Getter/Setter 메서드를 포함하며, 컨테이너에 사용되는 설정 메타데이터로 생성된다.

설정 메타데이터 : XML 또는 자바 어노테이션, 자바 코드로 표현하며, 컨테이너의 명령과 인스턴스화, 설정, 조립할 객체 등을 정의한다.

## Spring Bean을 Spring IoC Container에 등록하는 방법

### 2.1. 자바 어노테이션(Java Annotation)을 사용하는 방법

JAVA에서 `Annotation` 이라는 기능이 있습니다. 사전상으로는 주석의 의미이지만 Java 에서는 주석 이상의 기능을 가지고 있습니다. Annotation은 자바 소스 코드에 추가하여 사용할 수 있는 메타데이터의 일종입니다. 소스코드에 추가하면 단순 주석의 기능을 하는 것이 아니라 특별한 기능을 사용할 수 있습니다.

Java에서는 @Override, @Deprecated 와 같은 기본적인 Annotation을 제공합니다. 아래의 상속 예제에서는 @Override 를 이용하여 상속임을 명시해줍니다.

```java
public class Parent { 
    public void doSomething() { 
        System.out.println("This is Parent"); 
    } 
} 

public class Son extends Parent{ 
    @Override 
    public void doSomething() { 
        System.out.println("This is Son"); 
    } 
}
```

Spring에서는 여러 가지 Annotation을 사용하지만, Bean을 등록하기 위해서는 @Component Annotation을 사용합니다. **@Component Annotation이 등록되어 있는 경우에는 Spring이 Annotation을 확인하고 자체적으로 Bean 으로 등록**합니다.

실제로 사용되는 예시를 볼까요? 실제 Spring 프로젝트에서 Controller를 등록할 때에는 아래와 같은 **Annotation**을 사용합니다. 아래의 예시에서 Controller 임을 Spring 에게 알려주기 위하여 **@Controller Annotation**을 사용했습니다.

```java
// HelloController.java
@Controller
public class HelloController {
    // Http Get method 의 /hello 경로로 요청이 들어올 때 처리할 Method를 아래와 같이 @GetMapping Annotation을 사용하여 Mapping을 사용할 수 있습니다.
    @GetMapping("hello")
    public String hello(Model model){
        model.addAttribute("data", "This is data!!");
        return "hello";
    }
}
```

@Controller Annotation을 intelliJ에서 Ctrl 을 눌러서 이동해보면 아래와 같은 소스를 확인할 수 있습니다. @Controller Annotation에는 @Component Annotation이 있는 것을 확인할 수 있습니다. @Component Annotation 으로 인하여 Spring은 해당 Controller를 Bean 으로 등록합니다.

```java
// Controller.java

// -- 일부 생략 --
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Controller {

	/**
	 * The value may indicate a suggestion for a logical component name,
	 * to be turned into a Spring bean in case of an autodetected component.
	 * @return the suggested component name, if any (or empty String otherwise)
	 */
	@AliasFor(annotation = Component.class)
	String value() default "";

}
```

### 2.2. Bean Configuration File에 직접 Bean 등록하는 방법

@Configuration과 @Bean Annotation 을 이용하여 Bean을 등록할 수 있습니다. 아래의 예제와 같이 @Configuration을 이용하면 Spring Project 에서의 Configuration 역할을 하는 Class를 지정할 수 있습니다. 해당 File 하위에 Bean 으로 등록하고자 하는 Class에 @Bean Annotation을 사용해주면 간단하게 Bean을 등록할 수 있습니다.

```
// Hello.java
@Configuration
public class HelloConfiguration {
    @Bean
    public HelloController sampleController() {
        return new SampleController;
    }
}
```

### 2.3 빈(Bean) 접근 방법
먼저, ApplicationContext(스프링 컨테이너)를 사용하여 bean을 정의를 읽고 액세스 할 수 있다.
```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("memberRepository", memberRepository.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

- getBean() 메서드를 통해 bean의 인스턴스를 가져올 수 있다.
- ApplicationContext 인터페이스는 bean을 가져오는 여러 가지 방법들이 있다.

그러나 실제 응용 프로그램 코드에서는 getBean() 메서드를 통해 호출하지 않는다

### **BeanDefinition**

스프링의 다양한 설정 형식(Java, XML 등)은 BeanDefinition이라는 추상화 덕분에 할 수 있는 것이다.
Bean은 BeanDefinition(빈 설정 메타정보)으로 정의되고, BeanDefinition에 따라 활용하는 방법이 달라진다.

BeanDefinition은 속성에 따라 컨테이너가 Bean을 어떻게 생성하고 관리할지를 결정한다.

@Bean 어노테이션 또는 `<bean>` 태그당 1개씩 메타 정보가 생성된다.

Spring이 설정 메타정보를 BeanDefinition 인터페이스를 통해 관리하기 때문에 컨테이너 설정을 XML, Java로 할 수 있는 것이다.

스프링 컨테이너는 설정 형식이 XML인지 Java 코드인지 모르며, BeanDefinition만 알면 된다.

**BeanDefinition 정보
- BeanClassName : 생성할 빈의 클래스 이름
- factoryBeanName : 팩토리 역할의 빈을 사용할 경우의 이름 (appConfig, … 등)
- factoryMethodName : 빈을 생성할 팩토리 메서드 지정 (memberService, … 등)
- Scope : 싱글톤(기본값)
- lazyInit: 스프링 컨테이너를 생성할 때 빈을 생성하는 것이 아니라, 실제 빈을 사용할 때까지 최대한 생성을 지연 처리하는지 여부
- InitMethodName: 빈을 생성하고, 의존관계를 적용한 뒤에 호출되는 초기화 메서드 명
- DestroyMethodName: 빈의 생명주기가 끝나서 제거하기 직전에 호출되는 메서드 명
- Constructor arguments, Properties: 의존관계 주입에서 사용한다. (자바 설정처럼 팩토리 역할의 빈을 사용하면 없음

### **빈 설정 메타정보 확인하기**
```java
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
String[] beanDefinitionNames = ac.getBeanDefinitionNames();

for (String beanDefinitionName : beanDefinitionNames ) {
    BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);

    if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {
        System.out.println("beanDefinitionName = " + beanDefinitionName + ", beanDefinition = " + beanDefinition);
    }
}
```

**빈 이름 조회**
- ac.getBeanDefinitionNames(); : 스프링에 등록된 모든 빈 이름을 조회

**빈 객체 조회*
- ac.getBean(빈이름, 타입) : 빈 인스턴스 조회
- ac.getBean(타입) : 빈 인스턴스 조회(같은 타입의 스프링 빈이 둘 이상이면 예외 발생)
- ac.getBeansOfType(타입) : 해당 타입의 모든 빈 조회

#### getRole()
스프링 내부에서 사용하는 빈과 사용자가 등록한 빈을 구분할 수 있다.

#### BeanDefinition.ROLE_application
일반적으로 사용자가 정의한 빈

#### BeanDefinition.ROLE_Infrastructure
스프링이 내부에서 사용하는 빈

