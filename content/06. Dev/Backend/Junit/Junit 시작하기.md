---
title: Junit 시작하기
date: 2024-02-25
draft: false
tags:
  - Testing
  - Junit
complete: true
---
## 단축키
```
CMD + SHIFT + T
```
![](https://i.imgur.com/Fl6Ngs7.png)

## 기본 Format
```java
package com.guaqamole.hello.member;  
  
import com.guaqamole.hello.core.member.Grade;  
import com.guaqamole.hello.core.member.Member;  
import com.guaqamole.hello.core.member.MemberService;  
import com.guaqamole.hello.core.member.MemberServiceImpl;  
import org.junit.jupiter.api.Assertions;  
import org.junit.jupiter.api.Test;  
public class MemberServiceTest {  
  
    MemberService memberService = new MemberServiceImpl();  
  
    @Test  
    void join() {  
        // given : Test 데이터 제공  
        Member member = new Member(1L, "John", Grade.VIP);  
  
        // when : Test 환경 만들기  
        memberService.join(member);  
        Member findMember = memberService.findMember(1L);  
  
        // then : Test 검증  
        Assertions.assertEquals(member, findMember);  
    }  
}
```