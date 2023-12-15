---
title: 자바 ORM 표준 JPA 프로그래밍
Author: 저자(글) 김영한
Status: Currently Reading
Topics: JPA ORM
tags:
  - Book
Kanban-Cover: "![Book Cover|300](https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788960777330.jpg)"
draft: false

---
자료: https://github.com/holyeye/jpabook
# Chapter 2. JPA 시작




## H2 Databse
### h2 Test

![](https://i.imgur.com/GU47oVl.png)

**Member.sql**
```sql
CREATE TABLE MEMBER (
	ID VARCHAR(255) NOT NULL,
	NAME VARCHAR(255),
	AGE INTEGER NOT NULL,
	PRIMARY KEY(ID)
);
```


## gradle > application.properties
**application.properties**
```sh
#setting h2
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

#setting h2 db
spring.datasource.url=jdbc:h2:tcp://localhost/~/test
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect

#show sql
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=true

#ddl auto
spring.jpa.hibernate.ddl-auto=create
#spring.jpa.hibernate.ddl-auto=none
```


Sample Entity 생성
- Member
- Item
- Category
- ItemByCategory

## Entity
**Member.java**
```java
package com.guaqamole.h2demo.model.entity;  
  
import jakarta.persistence.Entity;  
import jakarta.persistence.GeneratedValue;  
import jakarta.persistence.GenerationType;  
import jakarta.persistence.Id;  
import lombok.Builder;  
import lombok.Getter;  
import lombok.NoArgsConstructor;  
  
@Getter  
@NoArgsConstructor  
@Entity  
public class Member {  
  
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;  
  
    private String name;  
  
    private int age;  
  
    @Builder  
    public Member(String name, int age) {  
        this.name = name;  
        this.age = age;  
    }  
}
```

**Item.java**
```java
package com.guaqamole.h2demo.model.entity;  
  
import jakarta.persistence.Entity;  
import jakarta.persistence.GeneratedValue;  
import jakarta.persistence.GenerationType;  
import jakarta.persistence.Id;  
import lombok.Getter;  
import lombok.Setter;  
  
@Getter  
@Setter  
@Entity  
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
  
    private Long category_id;
  
    private String name;
}
```

**Category.java**
```java
package com.guaqamole.h2demo.model.entity;  
  
import jakarta.persistence.Entity;  
import jakarta.persistence.GeneratedValue;  
import jakarta.persistence.GenerationType;  
import jakarta.persistence.Id;  
import lombok.Getter;  
import lombok.Setter;  
  
@Getter
@Setter
@Entity  
public class Category {  
  
    @Id  
    @GeneratedValue(strategy = GenerationType.AUTO)  
    private Long id;  
  
    private String name;  
}
```

**ItemByCategory.java**
```java
package com.guaqamole.h2demo.model.entity;  
  
  
import jakarta.persistence.Entity;  
import jakarta.persistence.Id;  
import lombok.Getter;  
import lombok.NoArgsConstructor;  
import lombok.Setter;  
  
  
@Entity  
@NoArgsConstructor  
@Getter  
@Setter  
public class ItemByCategory {  
  
    @Id  
    public Long itemId;  
    public String itemName;  
    public String categoryName;  
}
```

---

## Repository
- MemberRepository
- ItemByCategoryRepository
**MemberRepository.java**
```java
package com.guaqamole.h2demo.repository;  
  
import com.guaqamole.h2demo.model.entity.Member;  
import org.springframework.data.jpa.repository.JpaRepository;  
  
public interface MemberRepository extends JpaRepository<Member, Long> {  
}
```

**ItemByCategoryRepository.java**
```java
package com.guaqamole.h2demo.repository;  
  
import com.guaqamole.h2demo.model.entity.ItemByCategory;  
import org.springframework.data.jpa.repository.JpaRepository;  
import org.springframework.data.jpa.repository.Query;  
import org.springframework.data.repository.query.Param;  
  
import java.util.List;  
  
public interface ItemByCategoryRepository extends JpaRepository<ItemByCategory, Long> {  
  
    @Query(nativeQuery = true, value = "" + //  
            "select\n" +  
            "  i.id as item_id,\n" +  
            "  i.name as item_name,\n" +  
            "  c.name as category_name\n" +  
            "from item i\n" +  
            "left join category c on i.category_id = c.id\n" +  
            "where i.id = :id"  
    )  
    List<ItemByCategory> findItemByCategory(@Param("id") Long id);  
}
```

---

## Service
- MeberService
- ItemByCategoryService

**MemberService.java**
```java
package com.guaqamole.h2demo.service;  
  
import com.guaqamole.h2demo.model.entity.Member;  
import com.guaqamole.h2demo.repository.MemberRepository;  
import lombok.RequiredArgsConstructor;  
import org.springframework.stereotype.Service;  
  
@RequiredArgsConstructor  
@Service  
public class MemberService {  
  
    private final MemberRepository memberRepository;  
  
    public Member findById(Long id) {  
        return memberRepository.findById(id).get();  
    }  
}
```

**ItemByCategoryService.java**
```java
package com.guaqamole.h2demo.service;  
import com.guaqamole.h2demo.model.entity.ItemByCategory;  
import org.springframework.stereotype.Service;  
import com.guaqamole.h2demo.repository.ItemByCategoryRepository;  
  
import java.util.List;  
  
@Service  
public class ItemByCategoryService {  
    private final ItemByCategoryRepository itemByCategoryRepository;  
  
    public ItemByCategoryService(ItemByCategoryRepository itemByCategoryRepository) {  
        this.itemByCategoryRepository = itemByCategoryRepository;  
    }  
  
    public List<ItemByCategory> findItemByCategoryId(Long id) {  
        return itemByCategoryRepository.findItemByCategory(id);  
    }  
  
}
```

---

## Controller
- MemberController
- ItemController

**MemberController.java**
```java
package com.guaqamole.h2demo.controller;  
  
import com.guaqamole.h2demo.model.entity.Member;  
import com.guaqamole.h2demo.service.MemberService;  
import lombok.RequiredArgsConstructor;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
@RequiredArgsConstructor  
@RequestMapping("/api")  
public class MemberController {  
    private final MemberService memberService;  
  
    @GetMapping("/member/{id}")  
    public Member getMember(@PathVariable Long id) {  
        return memberService.findById(id);  
    }  
}
```

**ItemController.java**
```java
package com.guaqamole.h2demo.controller;  
  
import com.guaqamole.h2demo.model.entity.ItemByCategory;  
import org.springframework.http.ResponseEntity;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
import com.guaqamole.h2demo.service.ItemByCategoryService;  
  
import java.util.List;  
  
@RestController  
@RequestMapping("items")  
public class ItemController {  
  
    private final ItemByCategoryService itemByCategoryService;  
  
    public ItemController(ItemByCategoryService itemByCategoryService) {  
        this.itemByCategoryService = itemByCategoryService;  
    }  
  
    @GetMapping("/by-category/{id}")  
    public ResponseEntity<List<ItemByCategory>> getItemsByCategoryId(@PathVariable Long id) {  
        List<ItemByCategory> items = itemByCategoryService.findItemByCategoryId(id);  
        return ResponseEntity.ok(items);  
    }  
  
}
```