---
title: Spring Container에 등록된 Bean 조회하기
date: 2024-04-23
draft: false
tags: 
complete: true
---
스프링 컨테이너에 등록된 Bean 을 조회하는 방법은 여러가지가 있다.

## 등록된 모든 Bean 조회 
```java
package hello.core.beanfind;

import hello.core.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

class ApplicationContextInfoTest {

    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    @Test
    @DisplayName("모든 빈 출력하기")
    void findAllBean() {
        String[] beanDefinitionNames = ac.getBeanDefinitionNames(); // 스프링에 등록된 모든 빈 이름 조회
        for (String beanDefinitionName : beanDefinitionNames) {
            Object bean = ac.getBean(beanDefinitionName);// getBean(): Bean 이름으로 Bean 객체(인스턴스)를 조회
            System.out.println("name = " + beanDefinitionName + " object: " + bean);
        }
    }

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
}
```