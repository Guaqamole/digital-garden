---
title: Spring Container에 등록된 Bean 조회하기
date: 2024-04-23
draft: false
tags:
  - Spring
complete: true
---
스프링 컨테이너에 등록된 Bean 을 조회하는 방법은 여러가지가 있다:
1. 모든 Bean 조회
2. Bean Type으로 가져오기
3. Bean Name으로 가져오기
4. 상속 관계를 이용한 Bean 조회

## 등록된 모든 Bean 조회 
```java
package hello.core.beanfind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

class ApplicationContextInfoTest {

    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("모든 빈 출력하기")
    void findAllBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames(); // 스프링에 등록된 모든 빈 이름 조회
        for (String beanDefinitionName : beanDefinitionNames) {
            Object bean = ac.getBean(beanDefinitionName);// getBean(): Bean 이름으로 Bean 객체(인스턴스)를 조회
            System.out.println("name = " + beanDefinitionName + " object: " + bean);
        }
    }
}
```

혹은 main application 에서 사용하고 싶을때
```java
ApplicationContext ac = new AnnotationConfigApplicationContext(Application.class);
String[] beanDefinitionNames = ac.getBeanDefinitionNames(); // 스프링에 등록된 모든 빈 이름 조회
Arrays.sort(beanDefinitionNames);
for (String beanDefinitionName : beanDefinitionNames) {
	Object bean = ac.getBean(beanDefinitionName);// getBean(): Bean 이름으로 Bean 객체(인스턴스)를 조회
	System.out.println("BEAN : " + beanDefinitionName + " object: " + bean);
}
```

> [!warning] Error creating bean with name 'springApplicationAdminRegistrar' defined in class path resource
> IntelliJ의 ‘Run/Debug’ Configuration 에서 ‘Disable JMX Endpoints’ 체크해야함
> ![|522](https://i.imgur.com/LbMcluC.png)
> ![|850](https://i.imgur.com/THRAyIl.png)

### getBeanDefinitionNames()
스프링의 등록된 모든 Bean의 이름을 String 배열로 반환한다. 받아온 Bean의 이름은 getBean()을 이용해 다시 객체로 받아올 수 있다. 단, 반환되는 객체는 Object 타입이다.


## 개발자가 직접 등록한 bean 조회하기
```java
    @Test
    @DisplayName("애플리케이션 빈 출력하기")
    void findApplicationBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            // getBeanDefinition(): Bean 이름으로 Bean의 메타데이터 조회
            BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);

            // ROLE.APPLICATION: 개발자가 애플리케이션 개발을 위해 등록한 bean 또는 외부 라이브러리
            // ROLE.INFRASTRUCTURE: 스프링 내부에서 사용하는 bean
            if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {
                Object bean = ac.getBean(beanDefinitionName); // getBean(): Bean 이름으로 Bean 객체(인스턴스)를 조회
                System.out.println("name = " + beanDefinitionName + " object: " + bean);
            }
        }
    }
```
메타데이터에는 `ROLE`이라는 정보가 존재한다. `ROLE_APPLICATION`은 사용자가 작성하고 등록한 Bean이고, `ROLE_INFRASTRUCTURE`은 스프링 내부에서 생성되고 등록된 Bean이다.

`ROLE_APPLICATION`을 조건으로 직접 등록한 Bean만 조회할 수 있다.



## Bean의 이름과 타입으로 조회
```java
public class ApplicationContextBasicFindTest {
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("빈 이름으로 조회")
    void findBeanByName() {
        MemberService memberService = ac.getBean("memberService", MemberService.class);

        System.out.println("memberService = " + memberService);
        System.out.println("memberService.getClass() = " + memberService.getClass());

        assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
    }
}
```

## 타입만 이용하여 조회
```java
@Test
@DisplayName("이름 없이 타입으로만 조회")
void findBeanByType() {
    MemberService memberService = ac.getBean(MemberService.class);

    System.out.println("memberService = " + memberService);
    System.out.println("memberService.getClass() = " + memberService.getClass());

    assertThat(memberService).isInstanceOf(MemberServiceImpl.class);
}
```

#### 팁: 타입이 동일한 객체가 있을때 조회방법
![](https://i.imgur.com/UlEaOB9.png)

타입이 동일한 Bean을 조회할 때 기본적으로는 Bean의 이름을 통해 구분할 수 있다. 자바 코드 방식을 통해 스프링 Bean을 등록했다면, 메서드 이름이 Bean의 이름이 된다. Bean의 이름은 `@Bean(name ="이름")`을 통해 별도로 지정할 수 있다.

```java
@Test
@DisplayName("타입으로 조회 시 같은 타입이 둘 이상 있으면, 빈 이름을 지정하면 된다.")
void findBeanByName() {
    MemberRepository memberRepository = ac.getBean("memberRepository1",MemberRepository.class);
    assertThat(memberRepository).isInstanceOf(MemberRepository.class);
}

@Configuration
// class 내에 class를 만드는 경우는 scope을 상위 class로 한정한다는 것을 의미한다.
static class SameBeanConfig {

    @Bean
    // MemoryMemberRepository를 반환하는 메서드
    public MemberRepository memberRepository1() {
        return new MemoryMemberRepository();
    }

    @Bean
    // 똑같은 반환 타입(MemoryMemberRepository)을 가진 메서드를 하나 더 만든다.
    public MemberRepository memberRepository2() {
        return new MemoryMemberRepository();
    }
}
```

동일한 타입을 가진, 2개 이상의 Bean 객체를 조회하고 싶다면, `getBeansOfType()`을 사용할 수 있다. `getBeansOfType()`는 Map을 이용하여 해당 Bean 객체를 반환한다. Map의 key는 Bean의 이름을 사용하고, value는 객체의 참조(주소)가 들어 있다.

```java
@Test
@DisplayName("특정 반환 타입 Bean 모두 조회하기")
void findAllBeanByType() {
    Map<String, MemberRepository> beansOfType = ac.getBeansOfType(MemberRepository.class);
    for (String key : beansOfType.keySet()) { // keySet(): map의 모든 키 값을 가져온다
        System.out.println("key = " + key + "/ value = " + beansOfType.get(key));
    }
    System.out.println("beansOfType = " + beansOfType);
    assertThat(beansOfType.size()).isEqualTo(2);
}
```

## 상속 관계를 이용한 Bean 조회
Bean을 조회할 때 부모 타입을 지정하면 자식 타입에 해당하는 Bean 객체가 함께 조회된다. 따라서, 모든 자바 객체의 최고 부모인 Object 타입으로 조회하면, 모든 스프링 빈을 조회할 수 있다. 하지만, 마찬가지로 반환되는 객체가 2개 이상일 경우 `getBeansOfType()`를 사용해야 한다. `getBean()`을 이용할 경우 `NoUniqueBeanDefinitionException`이 발생한다.

중복된 타입을 가진 Bean을 조회하는 것과 마찬가지로 자식 객체가 둘 이상일 경우 Bean 이름을 사용하여 구분할 수 있다. 복수의 객체가 필요한 경우 `getBean()`이 아닌 `getBeansOfType()`을 사용해야 한다.

### 이름으로 객체 구분
```java
@Test
@DisplayName("부모 타입으로 조회 시, 자식이 둘 이상 있으면 Bean 이름을 지정한다")
void findBeanByParentTypeBeanName() {
    DiscountPolicy rateDiscountPolicy = ac.getBean("rateDiscountPolicy", DiscountPolicy.class);
    // ac.getBean()의 반환 타입은 부모이지만, 특정 이름을 사용하여 RateDiscountPolicy를 받을 수 있다.
    assertThat(rateDiscountPolicy).isInstanceOf(RateDiscountPolicy.class); // 인스턴스 타입 증명
}
```

> `ac.getBean("rateDiscountPolicy", DiscountPolicy.class)`: rateDiscountPolicy가 이름, DiscountPolicy.class가 반환 타입이 된다.  
> `isInstanceOf()`: 인스턴스의 타입을 검증할 수 있다.

### 같은 부모 타입을 가진 Bean 객체를 Map으로 조회
```java
@Test
@DisplayName("부모 타입으로 모두 조회하기")
void findAllBeanByParentType() {
    Map<String, DiscountPolicy> beansOfType = ac.getBeansOfType(DiscountPolicy.class);
    assertThat(beansOfType.size()).isEqualTo(2);
    for (String key : beansOfType.keySet()) {
        System.out.println("key = " + key + " / value = " + beansOfType.get(key));
    }
}
```

Object는 모든 객체의 부모 타입이므로, 타입 조회에 사용할 경우 Bean에 등록된 모든 객체를 Map으로 받을 수 있다.

```java
@Test
@DisplayName(" Object 타입으로 모두 조회하기")
void findAllBeansByObjectType() {
    Map<String, Object> beansOfType = ac.getBeansOfType(Object.class);
    // Object는 모든 자바 객체의 부모 클래스이므로, 스프링 내부에서 사용하는 Bean까지 모두 담긴다.

    for (String key : beansOfType.keySet()) {
        System.out.println("key = " + key + " / value = " + beansOfType.get(key));
    }
}
```
