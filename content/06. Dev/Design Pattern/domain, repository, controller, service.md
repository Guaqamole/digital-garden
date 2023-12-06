---
title: domain, repository, controller, service
date: 2023-11-29
draft: false
tags:
  - DesignPattern
  - MVC
complete: true
---
## Kyh’s Summary
`Controller` : 웹 MVC의 컨트롤러 역할
`Service` : 핵심 비즈니스 로직 구현
`Repository` : 데이터베이스에 접근, 도메인 객체를 DB애 저장하고 관리
`Domain` : 비즈니스 도메인 객체 예) 회원, 주문, 쿠폰 등등 데이터베이스에 저장하고 관리됨


## Concepts
### Domain
도메인은 애플리케이션이 다루는 주요 데이터나 엔티티를 나타냅니다. 예를 들어, 커피 샵 애플리케이션에서 도메인은 커피 객체일 수 있습니다.

```java
public class Coffee {
    private String id;
    private String name;

    // 생성자, 게터, 세터 등의 메서드들...
}
```

### Service
서비스는 비즈니스 로직을 담당합니다. 도메인 객체들 간의 상호 작용이나 특정 기능을 수행하는 메서드들을 포함합니다.
```java
@Service
public class CoffeeService {
    @Autowired
    private CoffeeRepository coffeeRepository;

    public List<Coffee> getAllCoffees() {
        return coffeeRepository.findAll();
    }

    public void addCoffee(Coffee coffee) {
        coffeeRepository.save(coffee);
    }
}
```

### Repository
리포지토리는 데이터베이스와의 상호 작용을 담당합니다. 도메인 객체들을 데이터베이스에 저장하고 가져오는 역할을 수행합니다.
```java
@Repository
public interface CoffeeRepository extends JpaRepository<Coffee, String> {
    // 추가적인 데이터베이스 관련 메서드들...
}
```

### Controller
컨트롤러는 클라이언트의 요청을 받고, 해당 요청에 맞는 서비스를 호출하여 결과를 반환합니다. 또한, 사용자에게 보여질 뷰를 선택하고 데이터를 전달하는 역할을 합니다.
```java
@RestController
@RequestMapping("/coffees")
public class CoffeeController {
    @Autowired
    private CoffeeService coffeeService;

    @GetMapping
    public List<Coffee> getAllCoffees() {
        return coffeeService.getAllCoffees();
    }

    @PostMapping
    public void addCoffee(@RequestBody Coffee coffee) {
        coffeeService.addCoffee(coffee);
    }
}
```
