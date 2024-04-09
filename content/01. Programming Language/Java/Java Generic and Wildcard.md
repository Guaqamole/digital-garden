---
title: Java Generic and Wildcard
date: 2023-12-09
draft: false
tags:
  - Java
complete: true
---
## 제네릭이란?
자바에서 사용할 데이터 타입을 지정하는 기법입니다.

```java
ArrayList<String> list = new ArrayList<>();
```

## 제네릭을 사용하는 이유
1. 컴파일 타임에 타입 검사를 통해서 예외를 방지하기
2. 클래스 외부에서 타입을 지정하기 때문에 타입을 체크하고 변환해줄 필요가 없습니다

```java
public static void main(String[] args) {
    List numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
    int sum = 0;
    for (Object number : numbers) {
        sum += (int) number;
    }
}
```

List에 타입 지정을 안 하면 Object로 타입이 지정되고 더하는 부분에서 형 변환을 직접해줘야 합니다.

하지만 제네릭을 사용하면 변환과정이 생략됩니다
```java
public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
    int sum = 0;
    for (Integer number : numbers) {
        sum += number;
    }
}
```

## 타입 파라미터 컨벤션
![|575](https://i.imgur.com/b75qBLM.png)

반드시 지켜야할 필요는 없지만 암묵적인 규칙입니다.

## 제네릭의 예시
### 제네릭 클래스
```java
class Person<T> {
	public T info;
}
Person<String> p1 = new Person<String>(); // info의 데이터 타입을 String으로
Person<StringBuilder> p2 = new Person<StringBuilder>(); // info의 데이터 타입을 StringBuilder로
```

### 제네릭 메소드
제네릭은 메소드 레벨에서도 사용이 가능합니다. 제네릭 타입을 메서드 리턴 타입 앞에 선언한 메서드를 제네릭 메서드라고 합니다.

```java
public class GenericPractice {

    public <T> T printAndGet(T value) {
        System.out.println("Value: " + value);
        return value;
    }

		// 제네릭 타입을 안 붙여서 컴파일 에러
		// public T printAndGet(T value) {
    //     System.out.println("Value: " + value);
    //     return value;
    // }

    public static void main(String[] args) {
        GenericPractice example = new GenericPractice();

        Integer intValue = example.printAndGet(42);
        String stringValue = example.printAndGet("Hello");
    }
}

// Value: 42
// Value: Hello
```

제네릭 타입을 리턴 타입 앞에 꼭 붙여야 하는 이유는
- 자바 문법
- Static 메서드
```java
class ClassName<E> {
 
	/*
	 * 클래스와 같은 E 타입이더라도
	 * static 메소드는 객체가 생성되기 이전 시점에
	 * 메모리에 먼저 올라가기 때문에
	 * E 유형을 클래스로부터 얻어올 방법이 없다.
	 */
	static E genericMethod(E o) {	// error!
		return o;
	}
	
}
 
class Main {
 
	public static void main(String[] args) {
 
		// ClassName 객체가 생성되기 전에 접근할 수 있으나 유형을 지정할 방법이 없어 에러남
		ClassName.genericMethod(3);
 
	}
}
// genericMethod 메모리에 올라감 (static) -> ClassName이 인스턴스화(new 연산자) 쓰지 않는 이상 
// 사용할 수가 없는 상황 발생
```

```java
class ClassName<E> {
 
	static <E> E genericMethod(E o) {
		return o;
	}
	
}
 
class Main {
 
	public static void main(String[] args) {
 
		// ClassName 객체가 생성되기 전에 접근할 수 있으나 유형을 지정할 방법이 없어 에러남
		System.out.println(ClassName.genericMethod(3) + ", class는: " + ClassName.getnerMethod(3).getClass().getName());
 
	}
}
// 3, class는: java.lang.Integer
// ClassName을 인스턴스화 하지 않았음에도 제네릭 타입을 사용할 수 있습니다!
```


---
## 와일드 카드
```java
public static void print(Object[] arr) {
    for (Object e : arr) {
        System.out.println(e);
    }
}

public static void main(String[] args) {
    Integer[] integers = {1, 2, 3};
    print(integers); // [1, 2, 3]
}

// 에러가 발생하지 않습니다.
```

```java
public static void print(List<Object> arr) {
    for (Object e : arr) {
        System.out.println(e);
    }
}

public static void main(String[] args) {
    List<Integer> integers = Arrays.asList(1, 2, 3);
    print(integers); // ! Error
}
// 에러 발생
// 필요타입 : List<Object>
// 제공된 타입 : List<Integer>
```

에러가 발생하는 이유 : `List<Integer>`는 `List<Object>`의 하위 타입이 아니기 때문에 업캐스팅이 안 됩니다! 

이러한 캐스팅 문제를 해결하기 위해 와일드카드가 등장했습니다

## 와일드카드 경계 범위

> [!NOTE]
> 💡 `<?>` : 모든 타입이 가능하다


![|575](https://i.imgur.com/KrtCKWA.png)



💡 `<? extends U>` : 타입 매개변수의 범위는 U 클래스이거나, U를 상속한 하위 클래스 (U와 U의 자손 타입)
![|575](https://i.imgur.com/4iqEmT4.png)



💡 `<? super U>` : 타입 매개변수의 범위는 U 클래스이거나, U가 상속한 상위 클래스 (U와 U의 조상 타입)
![|575](https://i.imgur.com/Gsa1Rk6.png)


### 결과
![|500](https://i.imgur.com/IrPa4Vm.png)

## 와일드카드는 언제 사용하면 좋을까?

> 와일드카드는 설계가 아닌 사용을 위한 것

애초에 와일드카드는 설계를 할 때 사용할 수가 없습니다.
```java
class Sample<? extends T> { // ! Error
    
}
```

따라서, 이미 만들어진 제네릭 클래스 혹은 제네릭 메서드를 사용할 때 이용하면 됩니다 ( ex. 범위 재정의 )

```java
class Sample<T> {
    public static <E> void run(List<? super E> l) {}
}

public class Main {
    public static void main(String[] args) {
        Sample<?> s2= new Sample<String>();
        
        Sample<? extends Number> s1 = new Sample<Integer>();
        
        Sample.run(new ArrayList<>());
    }
}
```