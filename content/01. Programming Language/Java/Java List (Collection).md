---
title: Java List (Collection)
date: 2023-11-27
draft: false
tags:
  - Java
  - StandardLibrary
complete: true
---
# 리스트(List)란?
리스트(List)란 저장된 요소들의 순서가 있고 데이터에 중복이 가능하고 인덱스(index) 번호에 의해서 정렬됩니다. (배열과 비슷한 동작을 합니다.)

### 리스트(List)의 특징
1. 리스트(List)는 컬렉션(Collection) 인터페이스 중 하나이다.
2. 리스트(List)는 두 개의 종류로 나눠진다.
    - ArrayList -> 배열로 이루어진 리스트(List)
    - LinkedList
3. 리스트(List)는 크기 조절이 가능하다.
4. 리스트(List)는 초기 크기를 지정하지 않아도 된다.
5. 리스트(List)에 삭제는 공간을 지우는 것이다.

# 리스트(List) 사용 방법
리스트(List) 선언 방법

```java
List<자료형> 리스트 명 = new ArrayList(or LinkedList)<자료형(생략가능)>();
```

```java
import java.util.ArrayList;  // ArratList 선언 시

import java.util.LinkedList; // LinkedList 선언 시
import java.util.List;
```

리스트(List)에 ArrayList나 LinkedList를 사용하기 위해서는 java.util 패키지에 있는 ArrayList나 LinkedList, List를 선언해 줘야 합니다.

<>은 제네릭이라고 합니다. 제네릭은 jdk 1.5 부터 시행됐고 1.5이전에는 제네릭이 없기 때문에 매 메서드 사용때 마다

```java
Integer iData = (Integer)a.get(0);
String strDate = (String)a.get(0);
```

이렇게 선언을 해줘야 했기 때문에 이런 번거로움을 보안하기 위해 제네릭 기능이 추가되었습니다.  
**제네릭에서는 Wrapper 클래스로 지정해 줘야 합니다. 예)**

```java
Integer, Long, Double, Float, String
```

#### 리스트(List)에 주요 기능

1. 삽입: List.add(값);
    
2. 중간 삽입: List.add(index, value); : index: 중간에 넣을 인덱스(배열 인덱스), value: 중간에 넣을 값. (중간에 값을 넣을 경우 중간에 넣은 값 이후에 값들은 한 칸씩 밀리게 됩니다.
    
3. 치환: List.set(index, value); : 중간 삽입과 비슷하게 index는 치환할 값 자리에 인덱스이고 value는 치환할 자리에 값이다.
    
4. 삭제: List.remove(index); : 인덱스 위치에 있는 값을 삭제한다.
    
5. 전체 삭제: List.clear(); 모든 요소를 삭제
    
6. 출력: List.get(index) : 인덱스 위치에 있는 값을 출력
    
7. 사이즈: List.size() : 리스트에 크기를 알 수 있다.
    

# ArrayList
ArrayList는 요소를 순차적으로 추가하는 게 특징입니다. 배열과 매우 유사하며 배열은 배열 선언 시 크기도 같이 지정해 줘야 하는 반면 ArrayList는 크기를 지정하지 않아도 되며 추가될 때마다 크기가 정해집니다.

### ArrayList 예제
```java

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ArrayListTest01 {

	public static void main(String[] args) {

		// ArrayList 생성
		// 컬렉션 계열에서 데이터 타입을 지정하기 위해서 제네릭 사용
		// <데이터 타입> 을 쓴다.
		// 데이터 타입은 일반 변수 타입이 아닌 Wrapper class 타입으로 지정
		// ArrayList와 배열에 차이는 ArrayList는 크기를 먼저 지정하지 않아도 된다. 배열은 크기를 먼저 지정하고 사용해야 한다.
		List<Integer> list = new ArrayList<>();

		// 데이터 타입 - random 클래스
		Random ran = new Random();
		for (int i = 0; i < 5; i++) {
			list.add(ran.nextInt(30) + 1); // random에 +1을 안 해 주면 0 ~ 29까지만 사용된다.
		}
		// 출력 - 출력은 배열 출력과 거의 비슷하다.

		for (int i = 0; i < 5; i++) {
			System.out.print(list.get(i) + "\t");
		}
		System.out.println();

		// 중간 삽입 - index 3 (4 번째) 중간 삽입
		list.add(3, 35);
		for (int i = 0; i < list.size(); i++) {
			System.out.print(list.get(i) + "\t");
		}
		System.out.println();

		// 치환 - 첫 번째 값을 치환
		list.set(0, 40);

		// 삭제 전 list 크기
		System.out.println("삭제 전 lsit 크기: " + list.size());

		// 삭제 - 마지막 인덱스 삭제
		list.remove(4);

		// 삭제 후 list 크기
		System.out.println("삭제 후 list 크기: " + list.size());

		for (int i = 0; i < 5; i++) {
			System.out.print(list.get(i) + "\t");
		}
		System.out.println();
		System.out.print("iterator 사용: "+"\t");
		for (int i : list) {
			System.out.print(i + "\t");
		}

	}

}
```

> 출력 결과:  
> 4 15 12 9 22  
> 4 15 12 35 9 22  
> 삭제 전 lsit 크기: 6  
> 삭제 후 list 크기: 5  
> 40 15 12 35 22  
> iterator 사용: 40 15 12 35 22

# LinkedList
LinkedList는 이름 뜻대로 서로 링크되어 있다는 특징을 가집니다.  
하나에 리스트에는 다음 리스트와 이전 리스트의 주소들이 서로 연결되어 있습니다.

![](https://velog.velcdn.com/images%2Fsunnamgung8%2Fpost%2F4bddc7a0-26da-4727-acf0-a3f014e766e1%2Fimage.png)

기본 LinkedList에 형태입니다. 리스트마다 처음 리스트와 마지막 리스트를 제외하고 이전 리스트와 다음 리스트에 주소가 연결되어있습니다.

![](https://velog.velcdn.com/images%2Fsunnamgung8%2Fpost%2F79734348-6afa-44a7-ab47-afd8ed1a7738%2Fimage.png)

만약 300번지 리스트를 삭제할 경우 200번지 리스트와 400번지 리스에 연결을 끊고 200번지 리스트와 400번지 리스트가 새로 연결됩니다.

만약 값을 추가할 경우는 위에 있는 리스트 형식처럼 서로 연결해 주는 형태입니다.

### LinkedList 예제
```java

import java.util.LinkedList;
import java.util.List;

public class LinkedListTest01 {

	public static void main(String[] args) {

		List<Integer> list = new LinkedList<>(); // LinkedList 생성

		list.add(1); // 값 추가
		list.add(2);
		list.add(3);
		list.add(4);

		System.out.print("추가된 값: ");
		for (int l : list) { // iterator를 이용해 리스트에 값 출력
			System.out.print(l + "\t");
		}
		System.out.println();

		list.set(2, 5); // 리스트 수정

		System.out.print("수정된 값: ");
		for (int l : list) { // iterator를 이용해 리스트에 값 출력
			System.out.print(l + "\t");
		}
		System.out.println();

		list.remove(1); // 리스트 삭제

		System.out.print("삭제된 값: ");
		for (int i = 0; i < list.size(); i++) { // 일반 for를 이용해서 반복
			System.out.print(list.get(i) + "\t"); // .get() 메서드를 이용해 리스트에 값 출력
		}
		System.out.println();

	}

}
```

> 출력 결과:  
> 추가된 값: 1 2 3 4  
> 수정된 값: 1 2 5 4  
> 삭제된 값: 1 5 4