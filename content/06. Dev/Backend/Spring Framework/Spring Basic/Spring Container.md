---
title: Spring Container
date: 2023-12-09
draft: false
tags:
  - Spring
complete: true
---
## 스프링 컨테이너란(application context)?
IoC원리가 적용된 스프링 프레임워크의 핵심 컴포넌트
스프링 컨테이너는 자바 객체의 생명 주기를 관리하며, 생성된 자바 객체들에게 추가적인 기능을 제공한다.
→ 스프링에서는 Sprint Container에 의해 관리되는 자바 객체를 [[Spring Bean|빈(Bean)]]이라 한다.

DI 컨테이너 혹은 IoC 컨테이너 라고도 불리며 BeanFactory, ApplicationContext를 통틀어 추상적으로 하는 말이다.

> [!NOTE] IoC 란?
> → 프로그램의 실행 흐름이나 객체의 생명 주기를 개발자가 제어하는 것이 아닌 외부에서 관리한다 하여 제어의 역전이라고 한다.

> [!NOTE] DI 란?
> → 의존관계 주입이라는 뜻으로, 클래스 사이의 의존 관계를 빈 설정 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것을 말한다.


## 스프링 컨테이너의 역할
자바 객체의 생명주기 관리
생성된 자바 객체들에게 추가적인 기능 제공
⇒ 자바 객체 == 빈(Bean) : 스프링 IoC 컨테이너가 관리하는 자바 객체


## 스프링 컨테이너 구조
![](https://i.imgur.com/ZaDTorz.png)

### 1. BeanFactory
1. 스프링 컨테이너의 최상위 인터페이스
2. Bean의 등록, 생성, 조회 및 전체 생명주기 관리
3. getBean() 메소드를 통해 오브젝트를 요청할 수 있다.

![](https://i.imgur.com/YeXLv66.png)


### 2. ApplicationContext

a. BeanFactory의 기능을 상속받아 동일한 기능 및 이외의 부가기능 제공 실제 인터페이스를 보면 많은 인터페이스를 상속바다 사용되는 것을 확인할 수 있다.
![](https://i.imgur.com/jzv7rBs.png)

b. HierarchicalBeanFactory, ListableBeanFactory 인터페이스가 직접 BeanFactory 인터페이스를 상속받았으므로, ApplicationContext 또한 BeanFactory를 구현했다고 볼 수 있다.
![](https://i.imgur.com/0MbbOU2.png)
![](https://i.imgur.com/HOobITH.png)

c. 부가기능
- MessageSource : 메세지 다국화 인터페이스
- EnvironmentCapable : 애플리케이션 구동 시 필요한 정보 관리
- ApplicationEventPublisher : 이벤트 관련 기능 제공
- ResourceLoader : 파일 클래스 패스, 외부 등 리소스를 편리하게 조회

## 스프링 컨테이너의 기능
- Bean의 인스턴스화 , 구성, 전체 생명주기 및 제거까지 관리
- 스프링 컨테이너를 통해 원하는만큼 많은 객체 관리 가능
- 의존성 주입을 통해 애플리케이션 컴포넌트 관리 가능
- 서로 다른 Bean을 연결하는 역할을 해줌

⇒ 이로인한 이점.
- 개발자는 모듈 간에 의존 및 결합으로 인해 발생하는 문제로부터 자유로울 수 있다
- 메서드가 언제 어디서 호출되어야 하는지, 메서드를 호출하기 위해 필요한 매개변수 준비과정이 생략 가능하다.


## 스프링 컨테이너의 사용 이유
개발자가 직접 객체를 관리한다면 new 생성자를 사용하여 직접 생성해야한다.
이는 개발자가 각 객체에 대한 의존관계를 파악하고 있어야 하며 하나의 객체에 대해 중복 생성이 많아진다.

**객체 간의 참조가 많아지면 의존성이 높아지는 단점이 있으며**
→ 이는 낮은 결합도와 캡슐화를 지향하는 객체지향 프로그래밍의 핵심과는 멀어진다.

<mark style="background: #C6AB16;">따라서, 객체 간의 의존성을 낮춰 느슨한 결합도와 높은 캡슐화를 위해 사용되어야 한다.</mark>

그렇다면 중복생성이 되지 않는 [[Singleton Pattern|싱글톤패턴]]을 사용하면 어떻게 될까?
> 싱글톤이란? 객체를 최초 한 번만 메모리에 할당해두고 그 다음부터는 생성된 객체를 참조해서 사용하는 것.

싱글톤 패턴을 적용하면 생성자는 private으로 설정 후 static으로 자기 자신을 등록하게 된다.

⇒ 싱글톤 패턴의 한계
- 생성자가 private으로 처리되면 해당 클래스는 상속 불가능한 클래스가 되어 Java의 특징인 다형성에 만족되지 못한다.
- 호출 타이밍에 따라 싱글톤이 하나만 생성될 수 있다는 것을 보장하지 못한다.
- 해당 클래스를 전역 상태로만 만들 수 있기 때문에 어디서든 접근가능하게 된다. ⇒ 객체지향 프로그래밍에서 권장되지 않는 프로그래밍 모델.

## 싱글톤 레지스트리
스프링 컨테이너는 빈을 싱글톤으로 관리한다.

스프링에서의 ApplicationContext는 IoC Container임과 동시에 싱글톤을 저장하고 관리하는 싱글톤 레지스트리이다. 다시 말해, 스프링 컨테이너는 싱글톤을 생성하고, 관리하고, 공급하는 싱글톤 관리 컨테이너가 된다.

![](https://i.imgur.com/p670BSf.png)


싱글톤 패턴과 다른 점

기존 싱글톤패턴 처럼 private생성자로 객체의 생성을 막는 것이 아닌 일반 자바 클래스를 싱글톤으로 활용할 수 있도록 지원한다.

객체, 관계설정, 사용에 대한 제어권이 컨테이너에 있기 때문에 일반 자바 클래스도 싱글톤으로 관리될 수 있다.

다형성에서 배제되지 않아 객체지향적인 설계와 디자인 패턴이 적용 가능하다.

> [!warning] 주의할 점
> 멀티 스레드 환경에서 여러 쓰레드가 동시에 접근 가능하기 때문에 상태 관리를 주의해야 한다.
> 파라미터, 로컬 변수, 리턴 값 등을 활용하여 stateless하게 만들어져야 한다.

#### Bean의 생명주기

1. 스프링 컨테이너 생성
2. 빈 생성
3. 의존관계 주입
4. 초기화 콜백 (빈이 생성되고 빈의 의존관계 주입이 완료된 후 호출되는 것)
	1. @PostConstruct 어노테이션을 통해 설정 가능
5. 초기화 됨과 동시에 의존성 확인 가능
	1. bean lifecycle에서 오직 한번만 수행된다는 것을 보장할 수 있다.
6. 사용
7. 소멸 전 콜백 (빈이 소멸되기 직전에 호출되는 것)
8. 스프링 컨테이너에서 스피링 빈을 제거하기 전에 해야할 작업이 있을 때 메서드 위에 선언한다.
9. 스프링 종료

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0377f601-90ee-4427-8b6a-a76d0c07dfcc%2FUntitled.png?table=block&id=8dfbbea3-db92-4548-a795-212f182a883a&spaceId=5e23101c-ba37-4c89-b790-aa7dfcaa180f&width=2000&userId=5232f70a-a9ba-46b7-924b-e32823ab4b08&cache=v2)

#### Bean의 범위 (Bean Scope)

Bean이 생성되고 존재하고 적용되는 범위를 말한다.

범위 설정 종류

싱글톤 스코프 : 컨테이너 내의 한 개 오브젝트만 생성되고 스프링 컨테이너가 종료될 때까지 계속 유지된다.

프로토타입 스코프 : 컨테이너에 빈을 요청할 때마다 매번 새로운 오브젝트를 생성하여 응답한다.

@Scope 어노테이션을 통해 설정 가능하다.
```java
@Component @Scope(value = "prototype") public class ProtoType { }
```

​

#### Bean의 생성 방식

Component Scanning 가장 편하게 사용할 수 있는 Bean 등록 방법으로, @Controller, @Service , @Component 등의 어노테이션 사용 시 자동으로 Spring Bean에 등록이 된다.

@Configuration @Configuration 을 명시하면 해당 클래스는 설정 파일이라고 판단하며 해당 클래스 내부의 메소드에 @Bean 명시를 통해 빈을 등록할 수 있다. 이처럼 AnnotationConfigApplicationContext를 생성한 후 getBean()메소드에 인자로 해당 등록 빈 메소드의 이름을 입력해주면 인스턴스화 된 빈을 가져올 수 있다.

Java

복사

@Configuration public class TestConfiguration { @Bean public TestBean testBean() { return new TestBean(); } }

​

Java

복사

public class ConfigurationTest { public static void main(String[] args) { ApplicationContext applicationContext = new AnnotationConfigApplicationContext(TestConfiguration.class); TestBean testBean = (TestBean) applicationContext.getBean("testBean"); System.out.println(testBean); } }

​

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F81bf536e-44b0-4cb5-b9b9-08856d093367%2FUntitled.png?table=block&id=6cc64fed-6a94-491c-ab6d-0fb7b46fba3d&spaceId=5e23101c-ba37-4c89-b790-aa7dfcaa180f&width=2000&userId=5232f70a-a9ba-46b7-924b-e32823ab4b08&cache=v2)

XML 파일 resource/application.xml 파일에 직접 xml에 정의하여 설정파일을 등록할 수도 있다.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F39c670ce-b0ac-407e-bcb6-4b19df1a6029%2FUntitled.png?table=block&id=6e2c9ccc-3d85-4637-905e-d1227e4ccc74&spaceId=5e23101c-ba37-4c89-b790-aa7dfcaa180f&width=2000&userId=5232f70a-a9ba-46b7-924b-e32823ab4b08&cache=v2)