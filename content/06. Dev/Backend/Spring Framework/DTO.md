---
title: DTO
date: 2023-11-30
draft: false
tags:
  - Backend
  - Springboot
  - Java
complete: true
---

> [!success] DTO
> Data Transfer Object의 약자로, 다른레이거 간의 데이터 교환에 활용된다. 간단하게 설명하면, 각 클래스 및 인터페이스를 호출하면서 전달하는 매개변수로 사용되는 데이터 객체.

DTO는 데이터를 교환하는 용도로만 사용하는 객체이기 떄문에 DTO에는 별도의 로직이 포함되지 않는다.

### DTO vs VO
#### VO
VO는 데이터 그 자체로 의미가 있는 객체를 의미. VO의 가장 특징적인 부분은 읽기 전용으로 설계한다는점. 즉, VO는 값을 변경 할 수 없게 만들어 데이터의 신뢰성을 유지해야할 때 사용.
#### DTO
DTO는 데이터 전송을 위해 사용되는 데이터 컨테이너로 볼 수 있다. 즉, 같은 애플리케이션 내부에서 사용되는 것이 아니라 다른 서버(시스템)로 전달하는 경우에 사용.

여기서 레이어란, 애플리케이션 내부에 정의된 레이어일 수도 있고, 인프라 관점에서 서버 아키텍처 상의 레이어 일수도 있다. 이러한 개념의 혼용이 DTO와 VO의 차이를 흐리게 만든다. 


### DTO vs Entity
Entity와 DTO를 분리해서 관리해야 하는 이유는 DB Layer와 View Layer 사이의 역할을 분리 하기 위해서입니다.  
DB Layer = Persistence Tier, View Layer = Presentation Tier
![](https://i.imgur.com/8Ug1vR4.png)

**Entity**는 실제 테이블과 매핑되어 만일 변경되게 되면 여러 다른 Class에 영향을 끼치고, DTO는 View와 통신하며 자주 변경되므로 분리 해주어야 합니다.  
결국 DTO는 **Domain Model** 객체(Entity)를 그대로 두고 복사하여, 다양한 Presentation Logic을 추가한 정도로 사용하며 **Domain Model** 객체(Entity)는 Persistent만을 위해서 사용해야합니다.


---

DTO는 프로세스 간에 데이터를 전달하는 용도의 객체입니다. 비즈니스 로직을 포함하지 않는 **데이터를 전달하기 위한 단순한 객체** 를 뜻합니다.

![](https://blog.kakaocdn.net/dn/b9FaUJ/btrUavkZBFF/eur8vEaMzaz9Y7gDFua3d1/img.png)

MVC 패턴에서는 주로 Client 와 Controller 사이에서 DTO 가 사용됩니다.

저는 보통 Controller 에서는 DTO 로 데이터를 전달받고, 애플리케이션 내부에서는 Domain(또는 Entity 또는 Model) 을 통해 데이터를 전달합니다.

예를 들면 Controller, Service, Repository, DataBase 는 서로 `User` 라는 도메인 객체를 통해 데이터를 전달하고,

Controller 에서 Client 로 리턴할 때는 `UserDTO` 에 매핑하여 리턴하는 것입니다.
소스 코드로 구현하면 아래와 같습니다. 코드는 baeldung 의 예제를 가져왔습니다.

### 1.1. DTO 를 통해 원하는 정보만 보여주기
```java
public class User {

    private String id;
    private String name;
    private String email;
    private String password;

    public User(String name, String email, String password) {
        this.name = Objects.requireNonNull(name);
        this.email = Objects.requireNonNull(email);
        this.password = this.encrypt(password);
    }

    // Getters and Setters

   String encrypt(String password) {
       // encryption logic
   }
}
```

User 객체는 id, name, email, password 의 값을 가지고 있습니다.

password 라는 공개할 수 없는 값을 가지고 있기 때문에 User 객체 그대로 Client 에게 전달할 수 없습니다.

그렇기 때문에 Client 에게 노출해도 되는 필드로만 이루어진 UserDTO 가 필요합니다.
```java
public class UserDTO {
    private String name;
    private String email;
    
    // standard getters and setters
}
```

Service, Repository 에서는 User 객체로 데이터를 전달하고

Controller 에서 DTO 객체로 매핑해서 Client 에게 리턴합니다.
```java
@RestController
@RequestMapping("/users")
class UserController {

    private UserService userService;
    private Mapper mapper;

    // Constructor

    @GetMapping
    @ResponseBody
    public List<UserDTO> getUsers() {
        return userService.getAll()
          .stream()
          .map(mapper::toDto)
          .collect(toList());
    }
}
```

```java
@Component
class Mapper {
    public UserDTO toDto(User user) {
        String name = user.getName();
        String email = user.getEmail();

        return new UserDTO(name, email);
    }
}
```

이처럼 DTO 를 사용하면 Client 에게 **password 와 같은 값을 노출하지 않고 원하는 값만 리턴**할 수 있습니다.

그런데 막상 DTO 를 사용하려고하면 이런 의문들이 생깁니다.
1. 그렇다면 클라이언트에게 노출해도 되는 값만 가진 도메인 객체라면 그대로 리턴해도 되는걸까?
2. 매번 Controller 에서 도메인 객체를 DTO 객체로 변환하는 비용을 치르더라도 DTO 를 사용해야만 할까?

이제부터 두 가지 의문에 대한 답을 찾아보도록 하겠습니다.


### 1.2. DTO 와 Domain 을 분리하는 이유
_그렇다면 클라이언트에게 노출해도 되는 값만 가진 도메인 객체라면 그대로 리턴해도 되는걸까?_


#### 1.2.1. 관심사의 분리(Separation of Concerns, SoC)
우리가 Spring Boot 와 같은 프레임 워크에서 MVC 패턴을 사용하는 이유는 무엇일까요?

모델1 방식을 사용해보신 분들은 아시겠지만, Model-Controller-View 가 각자의 역할을 수행하여 유지보수가 편리하기 때문입니다.

Controller 는 중간 다리의 역할로 client 와 request/response 하는 책임이 있고, Model 은 DataBase 에서 받아온 데이터를 다루는 책임이 있습니다.

우리가 사는 세상에서도 복잡하고 큰 기업일수록 팀이 철저하게 구분되고 다른 팀이 무엇을 하는지조차 모르는 경우가 있는 것처럼

OOP 세상에서는 **관심사의 분리**를 통해 복잡한 시스템을 효율적으로 작동하게 합니다.
![](https://blog.kakaocdn.net/dn/bfo3G2/btrVjNxVrFT/RoofJxoDiUmLAZYkvT7br0/img.png)

그런데 '관심사' 라는 말이 잘 와닿지 않습니다. 네이버 영어사전에 concern 을 검색해보았더니 "영향을 미치다" 라는 의미가 나왔습니다.

그렇다면 concerns 를 분리한다는 것은 **"애플리케이션에 같은 영향을 미치는 코드들끼리 분리한다"**
는 것이라고 이해할 수 있습니다.

#### 1.2.2. 관심사의 수평적 분리
![](https://blog.kakaocdn.net/dn/wlL8R/btrVkeotWCu/mth3EJiMlBjYv5gR7tSrK1/img.png)

관심사의 수평적 분리는 애플리케이션 내에서 동일한 역할을 수행하는 논리적 계층으로 애플리케이션을 나눈 것입니다.

프로세스에 따라 MVC 패턴을 녹이면 다음 그림과 같습니다.
![](https://blog.kakaocdn.net/dn/cFCvj5/btrUa2ivGTL/5Dt8ubKjvZVzC3AREukOfK/img.png)
- Presentation Layer: 애플리케이션의 기능과 데이터를 사용자에게 제공
- Business Layer: 애플리케이션의 핵심 비즈니스 로직 및 나머지 두 계층 간에 전달되는 데이터 처리
- Data Access Layer: 데이터베이스와 상호 작용하는 역할

여기까지 멀리 돌아왔는데요.. DTO 와 Domain 을 분리해야하는 이유가 바로 여기에서 나옵니다.
DTO 는 오직 데이터를 전달하는 목적으로 Presentation Layer 에 속합니다.
그리고 Domain 은 비즈니스 로직을 담는 Business Layer 에서 역할을 수행합니다.
두 객체를 분리하지 않는다면 Presentation, Business 가 혼합된 god class 가 탄생하게 됩니다.

IT 대기업에서 영업과 개발을 함께하는 그저 god team 을 만들어 버리는 거랄까요.
이렇게 god class 를 만든다면 변경이 있을 때 두 레이어에 영향을 미치게 됩니다.

좋은 객체지향 설계를 위해서는 하나의 객체에는 하나의 책임만 존재해야 합니다. 변경이 있을 때 파급 효과를 최소한으로 하기 위해서죠.

### 1.3. 마틴 파울러의 DTO 패턴

_매번 Controller 에서 도메인 객체를 DTO 객체로 변환하는 비용을 치르더라도 DTO 를 사용해야만 할까?_
마틴 파울러는 저서 _Patterns of Enterprise Application Architecture(P of EAA)_ 에서 DTO 를 소개하며

DTO 의 주요 목적에 대해 아래와 같이 말했습니다.
> _The main reason for using a Data Transfer Object is to batch up what would be multiple remote calls into a single call_

마틴 파울러가 말하는 DTO 의 주요 목적은 **한 번의 호출로 여러 매개 변수를 일괄 처리해서 서버의 왕복을 줄이는 것**입니다.

해당 호출에 관련 된 모든 데이터를 가지고 있는 DTO 객체를 만들어서 네트워크 비용을 줄인다는 의미입니다.

OKKY 에 이해하기 좋은 댓글이 있어서 첨부하도록 하겠습니다.
> 대표적으로 유저 테이블이 있다고 가정하면, 이 유저라는 정보는 광범위하게 사용될 것 입니다.  
> 또 게시판이 있을 수 있고, 상품 판매 화면이 있을 수 있고, 결제가 있을 수 있고, Q&A  게시판이 있을 수 있습니다.  
>   
> 그렇다면 예를 들어, 상품정보와 Q&A는 서로 다른 테이블에 구현이 되겠는데  
> 특정 상품 소개 페이지 안에 해당 상품과 관련은 없어도 연관성은 있는  
> 질문들의 Q&A 만 뽑아서 보여주고 싶다면? 거기에 구매한 몇몇 유저들의 정보까지 포함시키고 싶다면?  
>   
> 상품소개 API  1개  
> Q&A  API 1개  
> 유저 API 1개  
>   
> 이렇게 3개의 API를 호출하실건가요? 네 이것도 틀린 방법은 아닙니다. 잘못된 방법도 아닙니다.  
> 충분히 유효한 방법입니다.  
>   
> 그런데 그렇다면 모든 불필요한 정보까지 전부 반환이 될 것이고  
>   
> 결국 통신도 3회 이루어졌는데, 이걸 1회로 줄일 수 있다면?  
>   
> 방법은 간단하겠죠. 서비스 3개는 존재할테고, 이를 부르는 컨트롤러 하나에서  
> DTO를 준비하고, 여기에 필요한 필드를 미리 구성해놓은 다음에  
> 서비스 3개에서 리턴된 오브젝트에서 뽑아서 매핑시켜주면 됩니다.  
>   
> 그러면 컨트롤러 1개가 불필요한 정보 없이 API 1개만으로 원하는 응답을 모두 해줬습니다.  
>   
> 출처: [OKKY] 카카오콘 님, https://okky.kr/articles/1293573

추가로 인프런에 김영한 님이 답변하신 글도 참고하면 좋을 것 같아 첨부하겠습니다.
> 항상 유지보수에서 가장 문제가 되는 것이 바로 애매한 것입니다.  
> 특히 같은 필드인데, 어떤 경우에는 null이고 어떤 경우에는 값이 있고 이렇게 모호하면 정말 유지보수가 어려워집니다.  
> 그래서 API 응답 스펙이 정해지면 그 필드에 값은 항상 같은 원칙으로 반환되도록 명확하게 설계하는 것이 중요합니다.
> 
>   
> 클래스를 여러개 만들더라도, 코드가 중복되는 것 처럼 보일지라도, 명확한 것이 훨씬 더 나은 선택이라는 것이지요.  
>   
> 다만 API를 제공할 때 또 모든 케이스에 대응해서 만들면 API 자체가 너무 많아집니다.  
> 그래서 null 값 대신에 실제 값을 채워서 반환하는 API를 제공하는 것이 좋습니다.  
> 예를 들어서 username, age 둘다 제공하는 공통 API 하나를 여러곳에서 사용하도록 제공하는 것이지요.  
> 실무에서 API를 설계할 때 진짜 고민은, 생각보다 너무 복잡하다는 것입니다.  
>   
> 어떻게 보면 제공 단위를 크게 만들어서 모든 데이터를 다 반환하는 API 하나를 만들면 될 것 같지만, 이렇게 너무 공통화해도 유지보수가 어렵고, 성능 이슈가 있습니다. 반대로 너무 각각의 케이스를 대응하도록 만들어도 API 자체가 많아져서 유지보수가 어렵습니다.  
> 이 사이에서 적절한 단위로 API를 설계하고 제공하는 것이 묘미이지요^^!  
>   
> 제가 선호하는 방법은 기본 공통 API를 제공하고, 이 기본 공통 API로 해결이 안되는 특수한 경우에 한해서 별도의 API를 제공하는 방법을 선호합니다.  
>   
> 출처: [인프런] 김영한 님, https://www.inflearn.com/questions/72423/dto

여러 의견을 종합해 본 저의 결론은 다음과 같습니다.

1. DTO 를 사용하는 주요 목적은 한 번의 호출로 해당 호출에 관련 된 모든 데이터를 담은 객체를 리턴 받아 사용하는 것입니다.
2. `네트워크 비용 > 컨트롤러에서 매번 변환하는 비용` 이라고 판단한 것입니다.
3. 이 때, 같은 필드인데 어떤 경우에는 null 이고 어떤 경우에는 값이 있다면 유지보수가 어려워집니다.
4. 그렇기 때문에 null 없이 모든 필드에 값이 있는 공통 DTO 를 사용합니다.
5. 공통 DTO 가 커져서 성능에 이슈가 생기거나, 특수한 경우에만 별도의 DTO 를 사용합니다.

---

이번에는 DTO에 대해 완벽 총 정리를 해보고자 한다. 차근차근 뿌셔나가보자. 한 번 배울 때 확실하고 제대로 배워보자.

> **DTO를 왜 쓸까? 장점이 뭘까 ?**

DTO를 쓰는 이유는, DTO를 썼을 때 크게는 3가지의 장점이 있어서 사용한다. 그 장점이 무엇인지 하나씩 알아보자.

### **1. 호출 횟수를 줄여서 효율적인 통신을 하게 해준다.**
Martin Fowler의 저서인 P of EAA에서는 다음과 같이 얘기한다.

> **원격 인터페이스를 사용할 때는 각 호출의 비용이 상당히 부담스럽다. 따라서 호출 횟수를 줄여야 하며, 이를 위해서는 각 호출에서 더 많은 데이터를 전송해야 한다. 한 가지 방법은 다수의 매개변수를 사용하는 것이다.**
> **그러나 이 방식은 프로그램을 작성하기에는 상당히 불편하며, 자바와 같이 단일 값만 반환할 수 있는 언어에서는 아예 불가능하다.**
> **이 문제를 해결하는 방법은 호출에 필요한 모든 데이터를 저장하는 데이터 전송 객체(Data Transfer Object, DTO)이다.**
> - P of EAA, Martin Fowler -

위의 내용이 DTO의 탄생 배경이자, DTO를 쓰는 근본적인 이유이다. 위의 말을 우리가 최근에 쓰는 프로그래밍 기술들로 재해석해보자. ​

특정 View에서 User(사용자), Payment(결제 정보), Product(상품 정보) Domain에 대한 정보를 필요로 한다고 가정하자. 만약 DTO가 없다면 백엔드에서는 User, Payment, Product 정보를 조회하는 API를 따로따로 만들어서 프론트엔드한테 제공해야 한다.

그러면 프론트엔드는 API를 3번이나 통신해서 직접 데이터를 조합해서 써야 한다. 1번에 통신하면 되는 걸 3번에 나눠 통신하게 되는 꼴이다. 지금 이렇게야 Domain이 3개만 얽혀서 그렇지, 복잡한 서비스에는 5~10개 이상으로 많은 Domain이 얽히게 된다.

이를 해결하기 위해 DTO라는 개념이 등장했고, DTO를 활용해 1번의 API 요청으로 많은 데이터를 한 번의 호출로 응답할 수 있게 해결했다.

### **2. View가 Domain에 강하게 결합되는 걸 막아준다.**

강하게 결합되는 걸 왜 막아야 할까? 유지보수가 좋은 코드를 작성하려면 항상 의존성을 생각해야 한다. A와 B가 강하게 결합되어 있다면, A를 바꿀 때 B도 같이 바꿔줘야 할 가능성이 높다. 강하게 결합되어 있는 객체들이 많으면 많을 수록 우린 하나의 기능을 수정할 때 수많은 코드들을 고쳐야 할 수도 있다.

View가 Domain에 강하게 결합되어 있다면, Domain을 변경했을 때 View(웹 페이지, GUI 화면)도 같이 바뀔 가능성이 높다. 단적으로 예를 들어보자. 우리가 백엔드 코드 중에서 Domain 부분을 수정했는데, 프론트엔드한테 보내주던 Json의 Response 형태가 바뀐다고 생각해보자. 프론트엔드는 기존에 자기가 알고 있던 Response의 형태와 달라져서 프론트엔드 코드가 오작동 할 수도 있다. 따라서 Domain을 바꿨는데 View도 같이 바뀐다면 서비스를 운영하는 데 있어서 치명적일 수 있다.

예를 들어보자. 만약에 User라는 객체에 id, name이라는 필드만 있고 Controller에서 User라는 객체를 그대로 반환했다고 가정하자. 그러면 클라이언트(ex. 프론트엔드)는 다음과 같이 요청을 받았을 것이다.

```
{ id: 1, name: "john" }
```

그런데 어느 날, User라는 객체에 password라는 필드가 추가됐다고 하자. 개발자는 아무런 걱정 없이 User라는 객체에 password 필드를 추가했다. 이 때문에 프론트엔드한테 보내는 요청의 값이 아래와 같이 바뀌어 버렸다.

```
{ id: 1, name: "john", password: "admin1234" }
```

하지만 보안상 클라이언트(ex. 프론트엔드)한테는 password 필드가 노출됐으면 안 됐다. 그리고 Domain 로직을 수정한다고 View가 함부로 바뀌면 안 됐다. 응답 형태가 나도 바뀌게 바뀐다는 건, 클라이언트한테 예상치 못한 응답값을 전달함으로써 버그를 발생시키기 때문이다.

이렇게 된 발생 경위는 전부 View가 Domain에 강하게 의존했기 때문이다.
​

### **3. View(웹 페이지, GUI 화면)에 맞게 여러 객체를 조합해 응답 형태를 조정할 수 있다.**

백엔드에서는 프론트가 사용하기 쉽게 응답값을 정제해서 보내줄 의무가 있다. 그러다보니 백엔드는 View(웹 페이지, GUI 화면)에 맞게 응답 값을 구성해야 하는 경우가 많다. 그러다보면 단순히 1개의 Domain 객체를 응답값을 보내기보다는, 여러개의 Domain 객체를 조합해서 보내야 하는 경우가 많다.

이 때, DTO를 활용한다면 여러 Domain 객체를 조합해서 깔끔하게 응답값을 구성할 수 있다. 또한 DTO를 두게 되면 어떤 형태로 응답할 지 필드로 구성을 해놓기 때문에, Domain 객체가 변경되더라도 클라이언트한테 전달하는 응답 형태는 변하지 않을 가능성이 높다.

> **DTO의 책임은 어디까지 ?**

DTO는 데이터 조회(getter), 데이터 저장(setter), 직렬화(serialize), 역직렬화(deserialize)에 대한 책임만 가져야 한다. 여기서 직렬화와 역직렬화에 대한 개념을 쉽게 풀어서 설명하자면, ‘Domain → DTO → JSON 또는 XML 등’으로 변환하는 과정을 의미한다. 역직렬화는 ‘JSON 또는 XML 등 → DTO → Domain’으로 변환하는 과정을 의미한다. 여기서 ‘DTO ↔ JSON 또는 XML’으로 변환하는 과정은 프레임워크 단에서 기능이 내장되어 있다.


따라서 다시 정리하자면 우리가 일반적으로 가져야 하는 DTO의 책임은 다음과 같다.
- DTO의 클래스에 데이터를 담을 수 있는 기능 (생성자 또는 setter)
- 이 기능은 Domain을 DTO로 바꾸는 과정이라고 볼 수 있다.
- DTO의 클래스에 있는 데이터를 조회할 수 있는 기능 (getter)
- DTO를 Domain으로 변환하는 기능

---

# DTO와 Entity 분리

처음 웹 애플리케이션을 개발하다보면, 많이 하는 실수 중 하나가 바로 요청과 응답으로 엔티티를 직접 사용하는 것이다.

다음은 컨트롤러에서 요청과 응답으로 엔티티를 직접 사용했을 때의 코드이다.

```java
@GetMapping("/lines/{id}")
public ResponseEntity<Line> read(@PathVariable("id") Long id) {
  Line line = lineService.readLine(id);
  return ResponseEntity.ok(line);
}
```

여러분은 혹시 이렇게 코드를 작성하고 있지 않은가? 만약 고개를 끄덕였다면 지금 당장 이 글을 끝까지 읽기 바란다.

위와 같이 엔티티를 직접 사용하는 방식보다 더 좋은 방식이 있다. 그것은 바로 DTO를 정의하여 요청과 응답의 객체로 사용하는 것이다.

```java
@GetMapping("/lines/{id}")
public ResponseEntity<LineResponseDto> read(@PathVariable("id") Long id) {
  LineResponseDto line = lineService.readLine(id);
  return ResponseEntity.ok(line);
}
```

> 혹자는 DTO 대신 Map을 사용하기도 하지만 필자는 DTO를 더 권장하기 때문에 여기서는 언급을 생략하도록 하겠다.

그렇다면 왜 이처럼 귀찮게 DTO를 만들어서 코드를 작성하는 것이 더 좋은 것일까?

지금부터 그 이유를 알아보도록 하자.

### 1. 엔티티 내부 구현을 캡슐화할 수 있다.

엔티티가 getter와 setter를 가지고 있다면 충분히 데이터 전달 역할도 할 수 있지 않을까?

여기서 엔티티란 도메인의 핵심 로직과 속성을 가지고 있고, 실제 DB의 테이블과 매칭되는 클래스이다.

그렇기 때문에 엔티티가 getter와 setter를 갖게 된다면, controller와 같은 비즈니스 로직과 크게 상관없는 곳에서 자원의 속성이 실수로라도 변경될 수 있다. 또한 엔티티를 UI계층에 노출하는 것은 테이블 설계를 화면에 공개하는 것이나 다름없기 때문에 보안상으로도 바람직하지 못한 구조가 된다.

따라서 엔티티의 내부 구현을 캡슐화하고 UI계층에 노출시키지 않아야하는 것은 충분히 데이터 전달 역할로 DTO를 사용해야 할 이유로 볼 수 있다.

### 2. 화면에 필요한 데이터를 선별할 수 있다.
애플리케이션이 확장되면 엔티티의 크기는 점차 커지게 된다. 엔티티의 크기만 커질까?

화면도 다양해지고, API 스펙도 더 많아질 것이다. 이때 요청과 응답으로 엔티티를 사용한다면, 요청하는 화면에 필요하지 않은 속성까지도 함께 보내지게 된다.

예를 들어 단순히 사용자의 이름만 보여주면 되는 상황에서 필요 이상으로 사용자가 가지고 있는 다른 속성들까지 항상 데이터 전송에 참여하게 되는 것이다.

이처럼 모든 API 요청과 응답에서 엔티티의 모든 속성이 함께 전송되기 때문에 당연히 속도도 느려질 수 밖에 없다.

물론 엔티티에서도 `@JsonIgnore`같은 어노테이션을 사용하면 화면으로 보내지 않을 속성을 지정할 수 있는데, 이 역시 근본적인 해결책이 될 수는 없다.

아래 예시로 작성된 User 엔티티 코드를 보자.

대학(College)과 나이(Age) 속성을 화면에 노출시키지 않도록 `@JsonIgnore` 어노테이션을 추가한 상황이다.

우리는 User 엔티티를 처음 보았을 때 두 가지 문제점을 확인할 수 있다.

1. 어떤 속성이 화면으로 보내지는 지 혹은 무시되고 있는지 한 눈에 알아보기 어렵다.
2. User가 사용되는 다양한 API에 따른 필요한 속성들을 동적으로 선택할 수 없다.
```java
@Entity
public class User {
  @Id
  private Long id;

  private UserName username;

  private Team team;

  @JsonIgnore
  private College college;

  private Major major;

  @JsonIgnore
  private Age age;
}
```

하지만 만약 특정 API에 필요한 데이터를 포함한 DTO를 별도로 만들면, 화면에서 요구하는 필요한 데이터들만 선별하여 요청과 응답을 할 수 있는 장점이 있다.
```java
@AllArgsConstructor
@Data
public class UserResponse {
  private Long id;
  private UserName username;
  private Team team;
  private Major major;
  private Age age;
}
```

### 3. 순환참조를 예방할 수 있다.

JPA로 개발할 때, 양방향 참조를 사용했다면 순환참조를 조심해야 한다는 것은 아마 많은 개발자들이 알고 있는 사실일 것이다.

이 때, 양방향 참조된 엔티티를 컨트롤러에서 응답으로 return하게 되면, 엔티티가 참조하고 있는 객체는 지연 로딩되고, 로딩된 객체는 또 다시 본인이 참조하고 있는 객체를 호출하게 된다. 이렇게 서로 참조하는 객체를 계속 호출하면서 결국 무한 루프에 빠지게 되는 문제를 낳게된다.

물론 이 순환참조의 근본적인 원인은 양방향 매핑 자체에 있다고도 할 수 있지만, 양방향 참조가 부득이한 상황이라면 순환참조가 일어나지 않도록 응답의 return으로 DTO로 두는 것이 더 안전하다고 할 수 있다.

### 4. validation 코드와 모델링 코드를 분리할 수 있다.

엔티티 클래스는 DB의 테이블과 매칭되는 필드가 속성으로 선언되어 있고, 복잡한 비즈니스 로직이 작성되어있는 곳이다.

그렇기 때문에, 속성에는 `@Column`, `@JoinColumn` , `@ManyToOne`, `@OneToOne` 등의 모델링을 위한 코드가 추가된다.

여기에 만약 `@NotNull`, `@NotEmpty`, `@NotBlank` 등과 같은 요청에 대한 값의 validation코드가 들어간다면 엔티티 클래스는 더 복잡해지고 그만큼 가독성이 저하된다.

이때, 각각의 요청에 필요한 validation을 DTO에서 정의한다면, 엔티티 클래스를 좀 더 모델링과, 비즈니스 로직에만 집중되도록 만들 수 있다.

```java
@NoArgsConstructor
@Data
public class UserRequest {

  @NotBlank
  private String username;

  private String college;

  @NotBlank
  private String major;

  @NotBlank
  private Team team;

  private int age;
}
```

## 결론

요청과 응답에서 엔티티 대신 DTO를 사용해야하는 이유는 위 네가지 외에도 많지만, 필자는 위 네가지가 주요한 이유라고 생각한다.

혹자는 DTO를 모든 API마다 구별해서 만들다보면 너무 많은 DTO가 생겨서 관리하기 어렵다고 하기도 한다. 틀린말은 아니다.

그럼에도 불구하고 요청과 응답으로 엔티티를 사용하면, 개발의 편리함을 얻는 대신 애플리케이션의 결함을 얻게 될 수 있다.

위에서 언급한 결함들은 물론이고, API 스펙과 엔티티 사이에 의존성이 생기는 문제도 간과할 수 없다. 우리는 UI와 도메인이 서로 의존성을 갖지 않고 독립적으로 개발하는 것을 지향하기 때문에 이를 중간에서 연결시켜주는 DTO의 역할은 꽤나 중요하다.

요청과 응답으로 DTO를 사용하면 각각의 DTO 클래스가 데이터를 전송하는 클래스로서의 역할을 명확히 가질 수 있게 되고, 이는 하나의 클래스가 하나의 역할을 해야 한다는 객체지향의 정신과도 부합하는 부분이라고 생각한다.

그러므로 이제부터는 하나의 엔티티에 너무 많은 책임을 주지 말고, 각 화면에 필요한 데이터 전송 역할은 DTO에게 위임하는 것이 어떨까?


#### 결론2
- `common/domain/User` : DTO → Request, Response 처리할때 사용을 해주면 되고
- `backend/domain/User` : 실제 DB와 상호작용을 할때는 Entity객체를 사용을 하면 됩니다


---

# DTO & @Builder
## ✨ 웹 애플리케이션 계층 & 파일 구조

- **DTO(Data Transfer Object)**
![](https://velog.velcdn.com/images/taegon1998/post/c9fd8e8f-b3c5-465b-9218-0a16ff54b42a/image.jpg)

> 순수한 데이터 객체로 주로 데이터를 전달하고 저장하는 클래스이며 Controller, Service, View처럼 계층 간의 데이터 교환을 위해 쓰인다.  
> 화면과 데이터를 분리할 수 있다는 장점을 가지고 있지만 Entity -> DTO or DTO -> Entity로 변환해주는 과정이 필요하다.

- **dto 패키지와 service패키지의 추가**
![](https://velog.velcdn.com/images/taegon1998/post/5cc44b4e-6235-4bd0-bd5a-caacd56bfaa2/image.png)

---

## 1. MemberDTO

- ### @Builder Annotation 을 사용하지 않고 작성한 MemberDTO class

```java
@Data
public class MemberDTO {

    private Long id;
    private String userId;
    private String password;
    private String name;
    private MemberDTO() {

    }

    public static class Builder {

        private String userId;
        private String password;
        private String name;

		public Builder(String userId, String password) {
        	this.userId = userId;
            this.password = password;
        }
        
        public Builder setName(String name) {
        	this.name = name;
            return this;
        }

        public MemberDTO build() {

            MemberDTO memberDTO = new MemberDTO();

            memberDTO.userId = userId;
            memberDTO.password = password;
            memberDTO.name = name;

            return memberDTO;
        }
    }
}
```

> - **Builder Pattern 적용 이전**  
>     -> **등장 배경** : 인스턴스를 생성할 때 생성자에 매개변수가 너무 많을 경우 각각의 매개변수가 필수값인지 아닌지, 무엇을 의미하는지 이해하기 쉽지가 않다.  
>     또한, 특정 매개변수만을 생성자로 생성할 때 나머지 값에 대해 0 또는 null로 작성하게 되면 가독성이 현저하게 떨어진다.  
>       
>     ex) 아이디와 패스워드만 알고 있을 때 객체를 생성할 경우 null이 **어떠한 필드값을 의미**하는지 알 수 없다.
> 
> ```java
> MemberDTO memberDTO = new MemberDTO("taegon", "1234", null)
> ```

> - **Builder Pattern 적용 이후**  
>     ex) 필수값이 무엇인지, 각각의 인자마다 어떤 의미가 있는지 한 눈에 파악하기 쉽다.  
>     또한
> 
> ```java
> MemberDTO memberDTO = new MemberDTO.Builder("taegon", "1234")
> 				.setName("LEE")
>                 .build();
> ```

> - **@Builder Pattern 생성 과정**
> 
> 1. MemberDTO class의 nested class로 **Builder클래스를 생성**한다.
> 2. 필드별로 메서드를 작성하는데 각각의 메소드는 **변수에 값을 저장하고 빌더객체를 리턴**한다.  
>     -> 필수값들을 생성자에 값을 넣어준다.  
>     -> Optional값들에 대해서 각각 Setter 메소드를 작성해준다.  
>     -> Method Chaining을 통해 같은 객체내에서 값을 계속해서 update하는 방식!
> 3. 마지막으로 build()메서드에서 객체에 set되어진 값들을통해 **MemberDTO클래스의 생성자를 호출**하고 **인스턴스를 리턴**한다.

  

- ### @Builder Annotation 을 사용해서 작성한 MemberDTO class
    

```java
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDTO {
    private Long id;
    @NotNull
    private String userId;
    @NotNull
    private String password;
    private String name;

    @Builder
    public MemberDTO(String userId, String password, String name) {
        this.userId = userId;
        this.password = password;
        this.name = name;
    }
}
```

- 생성자 레벨에 **@Builder Annotation** 을 작성해주게되면 해당 필드 값들에 대해서 위와같은 Builder class를 자동으로 생성해준다.

> 1. **@NotNull** : 필수값을 나타내며 null값으로 넘어올 경우 NullPointerException 예외를 발생시킨다.  
>     -> **@NotNull** 방법 대신에 사전에 builder class를 재정의해서 Entity를 생성할 때, required, optional를 구분해서 입력받도록 설정할 수도 있다.
> 
> ```java
>  @Builder(builderMethodName = "customBuilder")
>     public MemberDTO(String userId, String password, String name) {
>         this.userId = userId;
>         this.password = password;
>         this.name = name;
>     }
>     public static MemberDTOBuilder builder(String userId, String password) {
>         return customBuilder()
>                 .userId(userId)
>                 .password(password);
>     }
> ```
> 
> 2. **@NoargsConstructor(AccessLevel.PROTECTED)** : 자바에서 기본생성자는 본래 자동으로 생성되지만 **@Builder에 의해서 생성자가 생성되므로** (매개변수를 가지는 생성자가 하나라도 정의 되어있는 경우) 기본 생성자는 자동으로 추가되지 않는다.
> 3. **AccessLevel.PROTECTED** : 모든 필드에 대한 값이 들어가야함을 보장하고 싶을 때 기본 생성자 호출을 막음으로써 무분별한 객체 생성을 막을 수 있다.

---

## 2. MemberService

```java
public interface MemberService {
    Long register(MemberDTO dto);

    default Member dtoToEntity(MemberDTO dto) {
        Member entity = Member.builder(dto.getUserId(), dto.getPassword())
                .name(dto.getName())
                .build();
        return entity;
    }
}
```

> - **register** : dto형태의 객체를 받아서 **회원을 등록**하는 기능
> - **dtoToEntity** : dto형태의 객체를 **Entity 형태의 객체로 변환**시키는 메소드  
>     -> builder의 필수값인 userId, password를 생성자의 매개변수로 작성해준다.  
>     -> Java8 버전부터 default키워드를 통해 인터페이스도 실제 내용을 가지는 코드를 작성할 수 있다.

---

## 3. MemberServiceImpl

```java
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public Long register(MemberDTO dto) {
        Member entity = dtoToEntity(dto);
        memberRepository.save(entity);

        return entity.getId();
    }
}
```

> - MemberRepository 의존성 주입을 받았다.
> - dto형태로 받은 회원정보를 interface에있는 **dtoToEntity 메소드** 를 통해 Member Entity형태로 변환 후에 **JPA의 save() 기능**을 통해 데이터베이스에 등록하였다.

---

## 4. MemberServiceImplTest

```java
@SpringBootTest
class MemberServiceImplTest{
    MemberService memberService = new MemberServiceImpl();
    @Autowired
    private MemberRepository memberRepository;
    
    @Test
    void register() {
        MemberDTO memberDTO = MemberDTO.builder("taegon","1234")
                .name("lee")
                .build();
        Member member = memberService.dtoToEntity(memberDTO);
        memberRepository.save(member);
    }
}
```

> 1. MemberServiceImpl, memberRepository 의존성 주입을 받았다.
> 2. Builder Pattern을 사용해 dto객체에 required(userId, password)를 입력하고 optional(name)을 입력해주었다.
> 3. memberSerivce의 dtoToEntity를 통해 Entity형태의 객체로 변환시켜주었다.
> 4. Jpa save(Entity) 테스트를 성공적으로 수행할 수 있었다.