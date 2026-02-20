---
title: SpringBoot REST API
date: 2023-11-25
draft: true
tags:
  - Springboot
  - RESTful
  - HowTo
  - Backend
complete: true
---
## Spring Initializr
### Setting
- Maven
- Java 17
- 3.2.0
- jar
### Dependency
- Lombok
- Spring Configuration Processor
- Spring Web

---

## Main
```java
package com.example.demo;  
  
import org.springframework.boot.SpringApplication;  
import org.springframework.boot.autoconfigure.SpringBootApplication;  
  
import java.util.UUID;  
  
@SpringBootApplication  
public class DemoApplication {  
  
   public static void main(String[] args) {  
      SpringApplication.run(DemoApplication.class, args);  
   }  
  
}
```

## Domain
도메인은 비즈니스 영역 또는 개발하고 있는 애플리케이션에서의 문제 영역을 가리킵니다. 예를 들어, 은행 애플리케이션에서의 도메인은 계좌, 고객, 거래와 같은 개념들을 포함할 수 있습니다. 도메인은 애플리케이션에서 다루고자 하는 실제 업무와 데이터를 나타냅니다.

→  이번 예시의 경우 domain은 coffee class가 되겠다.
**domain.Coffee.java**
```java
package com.example.demo.domain;  
  
import java.util.UUID;  
  
public class Coffee {  
    private final String id;  
    private String name;  
  
    // Constructor  1  
    public Coffee(String id, String name) {  
        this.id = id;  
        this.name = name;  
    }  
    // Constructor 2 이걸 Constructor Chaining이라 부른다.  
    public Coffee(String name) {  
        this(UUID.randomUUID().toString(), name);  
    }  
  
    public String getId() {  
        return id;  
    }  
  
    public String getName() {  
        return name;  
    }  
  
    public void setName(String name) {  
        this.name = name;  
    }  
}
```
### Explanation
#### final
id 필드를 `final`로 선언해 한 번만 할당하고 절대 수정 할 수 없게한다. 이렇게 함으로서 인스턴스 생성시 id를 필수적으로 할당하고 변경자 <sup>mutator</sup> 메서드는 없게한다. 

#### 두개 생성자
하나는 매개변수를 모두 사용하는 것이고, 다른 하나는 Coffee 인스턴스 생성시 id 매개변수를 입력하지 않으면 고유 식별자인 id값을 기본으로 제공한다.

#### 접근자 <sup>Accessor</sup>  와 변경자 <sup>Mutator</sup>  메서드
`Getter & Setter`라고도 불린다. 이 방식은 완벽하지 않고 논란의 여지가 있는 설계이지만, 일단은 사용한다. final로 선언되지 않아서 변경이 가능한 name 필드를 위해 사용했다.

---
## GET Method
### `@RestController` 개요
스프링 [[MVC Pattern|MVC]]는 뷰가 서버 렌더링된 웹페이지로 제공된다는 가정하에, 데이터와 데이터를 전송하는 부분과 데이터를 표현하는 부분을 분리해 생성한다. 이러한 MVC의 여러 부분을 연결하는데 `@Controller` 어노테이션이 도움된다.

- `@Controller` 는 `@Component` 의 스테레오타입 / 별칭이다. 따라서 애플리케이션 실행시, 스프링 빈 <sup>Bean</sup> `@Controller`  어노테이션이 붙은 클래스로부터 생성된다.
- `@Controller` 가 붙은 클래스는 Model 객체를 받는다. Model 객체로 표현 계층<sup> Presentational Layer</sup> 에 모델 기반 데이터를 제공한다. 또한, `ViewResolver`와 함께 작동해 애플리케이션이 뷰기술에 의해 렌더링된 특정 뷰를 표시하게 한다.

→ 간단히 `@ResponseBody` 를 클래스나 메서드에 추가해서 JSON이나 XML 같은 데이터 형식처럼 형식화된 응답을 반환하도록 Controller 클래스에 지시할 수도 있다.
→ 이렇게 하면 메서드의 객체 / Iterable 반환값이 웹 응답의 전체 바디가 됩니다. 모델의 일부러 반환되지 않는다.

> [!summary] 결론
> `@RestController` 어노테이션은 `@Controller` 와 `@ResponseBody`를 하나의 어노테이션으로 합쳐 쓴것이다. 결합해 하나의 어노테이션을 사용함으로써 코드를 단순하게 만들고 의도를 더욱 명확하게 표현하게 된다. 클래스에 `@RestController`로 어노테이션을 달아서 Rest를 만들수 있게 된다.


**controller.RestApiDemoController.java**
```java
package com.example.demo.controller;  
  
import com.example.demo.domain.Coffee;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.bind.annotation.RestController;  
  
import java.util.List;  
import java.util.ArrayList;  
  
@RestController  
public class RestApiDemoController {  
    private List<Coffee> coffees = new ArrayList<>();  
  
    public RestApiDemoController() {  
        coffees.addAll(List.of(  
                new Coffee("Cafe Cereza"),  
                new Coffee("Cafe Ganador"),  
                new Coffee("Cafe Lareno"),  
                new Coffee("Cafe Tres Pontas")  
        ));  
    }  
    @RequestMapping(value = "/coffees", method = RequestMethod.GET)  
    Iterable<Coffee> getCoffees() {  
        return coffees;  
    }  
}
```
- 생성자에 Coffee 객체를 Coffee 객체 배열에 담고 initialize 한다.
- getCoffee에서 객체 배열을 리턴.

스프링 부트는 스프링 웹에 포함된 Jackson 의존성을 통해 객체를 자동으로 JSON이나 그밖에 포맷으로 마샬링하거나 언마샬링 한다. `@RequestMapping` 어노테이션을 다른 어노테이션으로 변경하면 위 코드를 더욱 간략하게 표현하게 된다. `@GetMapping` 을 사용하게 될 경우 GET 요청만 허용 할 수 있게되며 매개변수 간의 충돌을 염려할 필요가 없으므로 URL 경로의 등호도 생략할 수 있게된다.

```java
@GetMapping("/coffees")
Iterable<Coffee> getCoffees() {
	return coffees;
}
```


### List<> functions
`java.util.List` provides a variety of methods for working with lists. Here are some commonly used methods:

1. **Adding Elements:**
    - `add(E element)`: Appends the specified element to the end of the list.
    - `add(int index, E element)`: Inserts the specified element at the specified position in the list.

2. **Removing Elements:**
    - `remove(Object o)`: Removes the first occurrence of the specified element from the list.
    - `remove(int index)`: Removes the element at the specified position in the list.
    - `clear()`: Removes all elements from the list.

3. **Accessing Elements:**
    - `get(int index)`: Returns the element at the specified position in the list.
    - `indexOf(Object o)`: Returns the index of the first occurrence of the specified element in the list.
    - `contains(Object o)`: Returns `true` if the list contains the specified element.

4. **Size and Checking:**
    - `size()`: Returns the number of elements in the list.
    - `isEmpty()`: Returns `true` if the list contains no elements.

5. **Replacing Elements:**
    - `set(int index, E element)`: Replaces the element at the specified position in the list with the specified element.

1. **Sublist Operations:**
    - `subList(int fromIndex, int toIndex)`: Returns a view of the portion of this list between the specified `fromIndex`, inclusive, and `toIndex`, exclusive.

1. **Sorting:**
    - `sort(Comparator<? super E> c)`: Sorts the list according to the order induced by the specified comparator.

2. **Iteration:**
    - `forEach(Consumer<? super E> action)`: Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.

### 그럼 모든 커피를 조회하지 않고 특정 ID로 조회하려면?
```java
@GetMapping("/coffee/{id}")
Optional<Coffee> getCoffeeById(@PathVariable String id){
	for (Coffee c: coffees) {
		if(c.getId().equals(id)) {
			return Optional.of(c)
		}
	}
}
```

---

## Post Mehod
> [!NOTE] POST
> POST는 리소스의 세부 정보(일반적으로 JSON 형식)를 제공한다. 해당 서비스에 POST 요청을해서 지정된 URI에 리소스를 생성한다.

스프링 부트의 자동 마샬링 덕분에 해당 커피 정보를 Coffee 객체로 받는다. 그리고 해당 객체를 커피 목록에 추가한다. Coffee 객체는 스프링 부트에 의해 언마샬링 (기본값은 JSON)되어 요청한 애플리케이션이나 서비스로 반환된다.
```java
@PostMapping("/coffees")
Coffee postCoffee(@RequestBody Coffee coffee) {
	coffees.add(coffee);
	return coffee;
}
```
- `@RequestBody` is an annotation that indicates that the `coffee` parameter should be extracted from the request body of the HTTP request. This is often used in conjunction with JSON or XML payloads in POST requests.

---
## Put Method
> [!tip] 
> IETF의 ‘Hypertext Transfer Protocol(HTTP/1.1): Semantics and Content (https://tools.ietf.org/html/rfc7231)’  문서에 의하면 기존에 만든 리소스가 있으면 `PUT` 요청으로 리소스를 업데이트하고 리소스가 없으면 리소스를 생성 해야한다.

- 특정 식별자로 커피를 검색하고 찾으면 업데이트
```java
@PutMapping("/coffees/{id}")
Coffee putCoffee(@PathVariable String id, @RequestBody Coffee coffee) {
	int coffeeIndex = -1;

	for (Coffee c: coffees) {
		if (c.getId().equals(id)) {
			coffeeIndex = coffees.indexOf(c);
			coffee.set(coffeeIndex, coffee);
		}
	}
	
	return (coffeeIndex == -1) ? postCoffee(coffee) : coffee;
}
```
#### Path Variable
- `@PathVariable` annotation is used to **extract values from the URI template**.
- `@PathVariable String id`: This annotation is used to extract the value of the `id` variable from the URI. The `{id}` in the URI template corresponds to the variable name `id`. For example, if the URI template is "/coffees/{id}", and a request is made to "/coffees/123", the value "123" would be assigned to the `id` parameter in the `putCoffee` method.
- `@RequestBody Coffee coffee`: This annotation indicates that the `coffee` parameter is expected to be **extracted from the request body.** This is common in PUT or POST requests where the client sends data in the request body, usually in JSON or another format.
#### Enhanced For Loop
designed for iterating over collections (like arrays, lists, or other iterable objects)
```java
for (ElementType element : collection) {
    // Code to be executed for each element
}
```

---
## Delete Method
HTTP의 `DELETE` 요청은 리소스를 삭제한다. 아래 코드는 `@PathVariable` 로 커피 식별자인 `id` 를 받아서 `Collection` 메서드 `removeIf` 를 해당 커피를 목록에서 제거한다. `removeIf` 는 `Predicate` 값을 받는다.

즉, 목록에 제거할 커피가 존재하면 참인 불값을 반환하는 람다 (Lambda Function) 이다.

```java
@DeleteMapping("/coffees/{id}")
void deleteCoffee(@PathVariable String id) {
	coffees.removeIf(c -> c.getId().equals(id))
}
```


---

## Refactoring


---
## Repository
리포지토리는 데이터베이스나 다른 영속적인 저장소에서 도메인 객체를 읽거나 저장하는 역할을 합니다. 리포지토리는 주로 도메인 객체들의 영속성 (메모리에 있는 객체를 DB에 저장해서 프로그램이 종료되도 그 객체가 유지되는것)과 관련이 있습니다. 스프링 프레임워크에서는 데이터 액세스 계층을 관리하고 객체 지향 프로그래밍을 지원하기 위해 리포지토리 인터페이스를 사용합니다.