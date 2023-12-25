---
title: Thymeleaf
date: 2023-12-21
draft: false
tags:
  - Springboot
complete: true
---
## 타임리프 소개
공식 사이트: https://www.thymeleaf.org/  
공식 메뉴얼 - 기본 기능: https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html 공식 메뉴얼 - 스프링 통합: https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html

이전 강의인 스프링 MVC 1편에서 타임리프를 간단히 사용해보고, 그 특징들도 알아보았다. 이번 시간에는 타임리프의 개념은 간단히 소개하고, 실제 동작하는 기본 기능 위주로 알아보겠다.

## 타임리프 특징
- 서버 사이드 HTML 렌더링 (SSR) 
- 네츄럴 템플릿  
- 스프링 통합 지원

**서버 사이드 HTML 렌더링 (SSR)**  
타임리프는 백엔드 서버에서 HTML을 동적으로 렌더링 하는 용도로 사용된다.

**네츄럴 템플릿**  
타임리프는 순수 HTML을 최대한 유지하는 특징이 있다.  
타임리프로 작성한 파일은 HTML을 유지하기 때문에 웹 브라우저에서 파일을 직접 열어도 내용을 확인할 수 있고, 서 버를 통해 뷰 템플릿을 거치면 동적으로 변경된 결과를 확인할 수 있다.  
JSP를 포함한 다른 뷰 템플릿들은 해당 파일을 열면, 예를 들어서 JSP 파일 자체를 그대로 웹 브라우저에서 열어보면 JSP 소스코드와 HTML이 뒤죽박죽 섞여서 웹 브라우저에서 정상적인 HTML 결과를 확인할 수 없다. 오직 서버를 통 해서 JSP가 렌더링 되고 HTML 응답 결과를 받아야 화면을 확인할 수 있다.  
반면에 타임리프로 작성된 파일은 해당 파일을 그대로 웹 브라우저에서 열어도 정상적인 HTML 결과를 확인할 수 있 다. 물론 이 경우 동적으로 결과가 렌더링 되지는 않는다. 하지만 HTML 마크업 결과가 어떻게 되는지 파일만 열어도 바 로 확인할 수 있다.  
이렇게 **순수 HTML을 그대로 유지하면서 뷰 템플릿도 사용할 수 있는 타임리프의 특징을 네츄럴 템플릿**(natural templates)이라 한다.

**스프링 통합 지원**  
타임리프는 스프링과 자연스럽게 통합되고, 스프링의 다양한 기능을 편리하게 사용할 수 있게 지원한다. 이 부분은 스프 링 통합과 폼 장에서 자세히 알아보겠다.

## 타임리프 기본 기능

타임리프를 사용하려면 다음 선언을 하면 된다. 

**타임리프 사용 선언**
`<html xmlns:th="http://www.thymeleaf.org">` 

**기본 표현식**
타임리프는 다음과 같은 기본 표현식들을 제공한다. 지금부터 하나씩 알아보자. ```

- 간단한 표현:
    - 변수 표현식: ${...}
    - 선택 변수 표현식: *{...}
    - 메시지 표현식: #{...}
    - 링크 URL 표현식: @{...}
    - 조각 표현식: ~{...}
- 리터럴
    - 텍스트: 'one text', 'Another one!',...
    - 숫자: 0, 34, 3.0, 12.3,...
    - 불린: true, false
    - 널: null
    - 리터럴 토큰: one, sometext, main,...
- 문자 연산:  
	- 문자합치기:+
	- 리터럴 대체: |The name is ${name}|
- 리터럴
    - 텍스트: 'one text', 'Another one!',...
    - 숫자: 0, 34, 3.0, 12.3,...
    - 불린: true, false
    - 널: null
    - 리터럴 토큰: one, sometext, main,...
- 산술 연산:
    - Binary operators: +, -, *, /, %
    - Minus sign (unary operator): -
- 불린 연산:
    - Binary operators: and, or
    - Boolean negation (unary operator): !, not
- 비교와 동등:
    ◦ 비교:>,<,>=,<=(gt,lt,ge,le)

◦ 동등 연산: ==, != (eq, ne)
- 조건 연산:
    - If-then: (if) ? (then)
    - If-then-else: (if) ? (then) : (else)
    - Default: (value) ?: (defaultvalue)
- 특별한 토큰:
◦ No-Operation: _