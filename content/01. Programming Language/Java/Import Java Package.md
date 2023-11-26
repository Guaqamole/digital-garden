---
title: Import Java Package
date: 2023-11-26
draft: false
tags:
  - Java
  - HowTo
complete: true
---
## 📝 패키지(Package)

> [!success] 
> 클래스의 묶음으로 클래스를 용도별이나, 기능별로 그룹화 한 것을 말한다.

- 패키지는 물리적으로 하나의 디렉토리(파일 시스템의 폴더) 이다.
- 클래스를 유일하게 만들어주는 식별자 역할을 한다.
- 같은 이름의 클래스 일지라도 서로 다른 패키지에 존재하는 것이 가능하므로, 자신만의 패키지 체계를 유지함으로써 충돌이 발생하지 않는다.

## 패키지 추가하기

![](https://velog.velcdn.com/images/hyun_ha/post/52b84a77-5c68-4308-9fb9-7adac7df8ce8/image.PNG)

클래스의 전체 이름은 "패키지명 + 클래스명"인데  
패키지가 상,하위로 구분되어 있다면 도트( . )를 사용해서 다음과 같이 표현한다.

```java
상위패키지.하위패키지.클래스
```

### 패키지 추가하기 예시)

![](https://velog.velcdn.com/images/hyun_ha/post/67fe24ea-0bb7-4fc0-96ef-f005115d94d2/image.PNG)

Car 클래스가 com.mycompany 패키지에 속해 있다면,
- Car 클래스의 전체 이름 -> com.mycompany.Car
- 실제 파일 시스템 -> com\mycompany 폴더에 Car.class가 위치한다. 
  
예를 들어 Car 클래스가 com.mycompany 패키지에 소속되어 있을 경우,  
파일 시스템 com\yourcompany 폴더에 강제로 Car.class를 이동하면 Car 클래스를 사용할 수 없다.
- ❗❗클래스만 따로 복사해서 다른 패키지로 이동하면 클래스는 사용할 수 없다.
- 즉, 클래스를 이동할 경우에는 패키지 전체를 이동시켜야 한다.

## 패키지 선언
- 패키지에 소속된 클래스 파일은 첫 번째 라인에서 자신이 소속된 클래스 패키지  
    이름을 선언해야 한다.

```java
package 패키지명;   
```

- 패키지 선언은 하나의 소스파일에 단 한 번만 선언될 수 있다.
- 소스파일에 자신이 속할 패키지를 지정하지 않은 클래스는 자동적으로 '이름 없는 패키지(unnamed package)'에 속하게 된다.
  

여러 개발 회사가 함께 참여하는 대규모 프로젝트나, 다른 회사의 패키지를 이용해서  
개발할 경우, 패키지 이름이 중복될 가능성이 있다.  
그래서 패키지가 중복되지 않도록 회사의 **도메인 이름**으로 패키지를 만든다.

도메인 이름으로 패키지를 만들 경우,  
도메인 이름 역순 + 마지막에 프로젝트 이름을 붙여준다.  
( 포괄적인 이름이 상위 패키지가 되도록 하기 위해 역순으로 한다.)

```java
ex)
com.samsung.projectName
com.lg.projectName
com.hyudai.projectName
```

  
  

## 패키지 사용하기
같은 패키지에 속하는 클래스들은 아무런 조건 없이 다른 클래스를 사용할 수 있지만  
다른 패키지에 속하는 클래스를 사용하려면 두 가지 방법 중 하나를 선택해야 한다.  
  
### 1. 패키지와 클래스를 모두 기술하는 방법
- 패키지에 속해 있는 클래스에 대한 객체 생성을 해야한다.
- 패키지 이름을 포함한 FullName으로 사용해야 한다.

예시)  
com.hankook 패키지에 소속된 Tire 클래스를 이용해서 필드를 선언 후 객체를 생성

```java
package com.mycompany;

public class Car {
	com.hankook.Tire tire = new com.hankook.Tire();
}
```
- 단점
    - 패키지 이름이 길거나 이렇게 사용해야 할 클래스 수가 많다면  
    - 이 방법은 전체 코드를 난잡해 보이게 할 수 있다.

그래서 두 번째 방법인 import문을 주로 사용한다.
  
### 2. import문

import문의 역할은 컴파일러에게 소스파일에 사용된 클래스의 패키지에 대한 정보를  
제공하는 것이다.  
import문으로 사용하고자 하는 클래스의 패키지를 미리 명시해주면 소스코드에  
사용되는 클래스이름에서 패키지명은 생략할 수 있다.  
  
**import문 선언**
```java
import 패키지명.클래스명;
		
        또는
        
import 패키지명.*;
```

- 패키지 선언과 클래스 사이에 선언해야 한다.
- import문의 개수는 제한이 없다.
- 같은 패키지에서 여러 개의 클래스가 사용될 때, ' 패키지명.* '을 이용해서 지정된 패키지에 속하는 모든 클래스를 패키지명 없이 사용할 수 있다. 

ex)
```java
package com.mycompany;

import com.hankook.Tire;

public class Car {
	Tire tire = new Tire();
}
```