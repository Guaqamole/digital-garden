---
title: JVM
date: 2023-10-10
draft: false
tags:
  - Java
---
# JVM의 구조

## Runtime Data Area

![](https://i.imgur.com/HTMkVeH.png)

자바 가상 머신은 프로그램 실행 중 다양한 런타임 데이터 영역을 사용한다. <mark class="hltr-highlight">런타임 데이터 영역은 모든 스레드들이 공유하는 영역과 스레드 별 할당되는 영역으로 구분</mark>된다. 

JVM을 시작하면 *Heap* 영역과 *Method* 영역이 생성되며 해당 영역들은 모든 스레드들이 공유한다. 각 스레드가 시작 될 때마다 스레드마다 PC Register, Stack, Navtive Method Stack이 생성되며 스레드가 종료될 때 사라진다. 마지막으로 모든 스레드들이 실행되고 종료되면 JVM이 종료되면서 Heap 영역과 Method 영역도 사라진다.
### Heap
- Heap 영역은 클래스의 인스터스들과 배열들이 저장되는 공간이다.
- Heap 영역은 가비지 컬렉션라는 동적 메모리 관리 시스템에 의해 관리된다.
- 힙 구성 방식, 가비지 컬렉션의 알고리즘은 JVM 구현체의 재량으로 자유롭게 구성된다.

### Method
- Method 영역은 런타임 상수 풀, 필드, 함수, 코드 등 클래스와 인터페이스의 구조가 저장되는 공간이다.

### PC Register
- PC Register는 자바 가상 머신이 현재 실행중인 명령어의 주소를 저장한다.

### Native Method Stack
- <mark class="hltr-highlight">다른 언어로 작성된 코드를 실행할 때 사용되는 스택이다.</mark>
- Native Code (C++) 를 실행할때 사용하는 영역

### Stack
- Stacke은 Frame이라는 자료구조를 저장한다.
- Stack은 C 같이 전통적인 언어의 스택 구조와 비슷하다. - 지역 변수, 함수의 실행 결과를 저장하며 함수 호출과 반환을 담당한다.

### Frame
- 프레임은 데이터, 반환 값을 저장하는 자료구조이다.
- 프레임은 함수가 호출될 때 생성되고 함수가 종료되면 사라진다.
- 각 프레임은 지역 변수 배열, Operand Stack, Run Time Constant Pool에 대한 참조값을 지닌다.
- 클래스파일의 함수에 대한 접근은 Runtime Constant Pool에 존재하는 심볼릭 링크를 통해 접근 가능하다.
- 동적 할당은 코드 실행 시점에 심볼릭 링크를 해석해 고정된 주소값으로 변환시킨다.
- 심볼릭 링크를 통한 late-binding은 객체 지향의 핵심이다.

### Runtime Constant Pool (?)
- 런타임 상수 풀은 클래스, 인터페이스 마다 존재하며 클래스 파일의 constant pool 테이블 영역이 저장되는 공간이다.
- 각 클래스, 인터페이스의 전역 변수, 함수, 인스턴스 변수, 함수에 대한 심볼릭 링크가 존재한다.
- 전역 변수와 전역 함수는 컴파일 시점에 할당되어 고정된 값으로 존재하며 인스턴스 변수와 인스턴스 함수는 심볼릭 링크로 존재하며 실행 시점에 고정된 주소로 변환된다.
- 런타임 상수 풀은 클래스가 생성되어 Heap에 할당될 때 만들어지며 클래스가 삭제되면 사라진다.
- 자세한 내용은 [The Java® Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se11/jvms11.pdf)의 2장 The Structure of the Java  
    Virtual Machine 확인 가능하다.


# Class Loader

![](https://i.imgur.com/pKvDBeV.png)

클래스 로더는 <mark class="hltr-highlight">클래스 파일의 바이트 코드를 읽어 런타임 데이터 영역으로 가져온다.</mark> 클래스 로더는 부트스트랩 클래스 로더, 플랫폼 클래스 로더, 시스템 클래스 로더 3가지로 구분된다. 클래스 로더는 계층 구조를 가지고 있으며 시스템 클래스 로더는 플랫폼 클래스 로더를 부모로 가지고, 플랫폼 클래스 로더는 부트스트랩 클래스 로더를 부모로 가진다.


### Class Loader의 종류

**Bootstrap Class Loader**

- 네이티브 코드로 작성되었으며 JVM에 내장되어 있다.
- JVM이 시작될 때 실행되며 java.lang package 처럼 JVM 실행에 필요한 클래스들을 로딩한다.

**Platform Class Loader**

- java.lang.ClassLoader의 인스턴스로 Java SE platform API 등 자바에서 <mark class="hltr-highlight">기본적으로 제공해주는 클래스를 로딩할 때 사용된다.</mark>
- Bootstrap Class Loader를 부모로 가지고 있다.
- JAVA 8까지는 Extension Class Loader로 불리다가 모듈 시스템이 도입되면서 Platform Class Loader로 명칭이 바뀌었다.

**System Class Loader**

- java.lang.ClassLoader의 인스턴스로 <mark class="hltr-highlight">유저가 작성한 클래스를 로딩할 때 사용된다.</mark>
- ClassPath에 명시된 경로를 통해 클래스를 찾는다.
- Platform Class Loader를 부모로 가지고 있다.
- JAVA 8까지는 Applicaiton Class Loader로 불리다가 모듈 시스템이 도입되면서 Platform Class Loader로 명칭이 바뀌었다.

# Loading, Linking, Initializing

![](https://i.imgur.com/WE8hZ9P.png)

<mark class="hltr-highlight">JVM은 동적으로 로드, 링크, 초기화 과정을 진행한다</mark>. 로딩은 특정 이름을 가진 클래스 또는 인터페이스의 <mark class="hltr-highlight">바이트 코드를 찾은 후 클래스 또는 인터페이스를 생성하는 과정</mark>이다. JAVA 어플리케이션의 동작은 JVM을 시작한 후 특정 클래스를 런타임 데이터 영역으로 로딩한 후 로딩,링크,초기화 과정을 거쳐 최종적으로 특정 클래스의 public static method void main(String []) 함수를 실행하는 것이다. 해당 과정을 실행하면서 연쇄적으로 다른 클래스들을 로딩,링크,초기화한다.

### JVM 시작

JVM이 시작되면 런타임 데이터 영역이 생성되고 그 안에 메소드, 힙 영역이 할당된다. JVM에 내장된 BootStrap Class Loader는 java.lang.package 처럼 JVM 실행에 필요한 클래스들을 메소드 영역으로 로딩한다. System Class Loader를 통해 실행한 클래스를 메소드 영역으로 로딩한다.

### 로딩

클래스 또는 인터페이스의 생성은 해당 클래스의 필드, 메소드, 런타임 상수 풀 등 클래스가 가지고 있는 바이트코드를 찾은 후 JVM의 메소드 영역에 구성하는 것을 의미한다. 클래스 로더를 통해 로딩을 진행하며 A 클래스를 로딩했을 때 A 클래스의 부모 클래스가 존재할 경우 먼저 부모 클래스를 로딩한다.

### 링크

링크는 검증(verification), 준비(Prepare), 분석(Resolution) 3가지 과정으로 이루어져 있다.

- 검증 : 로딩된 바이트 코드가 JVM 명세를 따르고 있는지 검증하는 과정
- 준비 : 정적 필드를 각 유형의 기본값으로 초기화하는 과정 - Int type은 0으로, reference type은 null로 초기화 된다.
- 분석 : 클래스의 런타임 상수 풀 안에 있는 Symbolic Reference를 고정된 주소 값으로 바꾸는 과정

검증, 준비, 분석 3가지 과정을 거치면서 다른 클래스의 로딩을 추가적으로 요청할 수 있다. 이 때 분석 과정은 검증, 준비 과정과 같은 시간에 일어날 필요가 없다. 보통 Symbolic Reference를 고정된 주소 값으로 변환시키는 <mark class="hltr-highlight">분석 과정은 해당 명령이 실행될 때 일어난다.</mark>

### 초기화

클래스 초기화 함수를 실행한다. 클래스에 작성된 static 초기화 함수를 모두 합쳐 한꺼번에 실행한다. 초기화 과정은 로딩-검증-준비 과정이 모두 끝났을 때 한번만 실행된다.

### JVM 종료

일부 스레드가 Runtime 클래스의 종료 메서드나 중지 메서드, <mark class="hltr-highlight">클래스 시스템의 종료 메서드를 호출하면</mark> JVM 종료 또는 중지 작업이 *Security Manager* 에 의해 허용된다.

___

# 정리

1. JDK에 있는 자바 컴파일러를 통해 java 파일을 바이트 코드(class 파일)로 만들고, JRE에서 바이트 코드를 실행시키면 JVM이 시작되면서 JVM 위에서 바이트 코드가 기계어로 해석되어 실행된다.
2. JVM의 명세를 따르는 가상 머신은 모두 JVM이다. 대표적으로 Oracle의 Hotspot이 존재한다.
3. JVM의 런타임 데이터 영역에는 모든 스레드들이 공유하는 Heap, Method 영역, 각 스레드 마다 존재하는 Stack, PC Register, Native Method Stack이 존재한다.
4. HotSpot의 JAVA 실행 엔진은 일반적으로 한줄 씩 바이트 코드를 읽어 인터프리터를 통해 기계어로 번역하며 자주 사용되는 바이트 코드는 JIT 컴파일러를 통해 캐시에 미리 컴파일 하는 방식으로 실행 엔진을 최적화 시킨다.
5. 클래스 로더에는 BootStrap, Platform, System 클래스 로더가 존재하며 각 클래스 로더들은 위임 모델과 계층 구조를 지닌다.
6. JVM은 동적으로 로딩,링크,초기화 과정을 진행하며 java 어플리케이션의 실행은 특정 클래스를 로딩, 링크, 초기화 과정을 거친 후 해당 클래스의 main method를 실행하는 것을 의미한다.
7. Java의 동적 바인딩은 실행 시점에 클래스의 런타임 상수 풀에 있는 Symbolic Referenc를 고정된 주소 값으로 바꾸는 것이며 이 때 고정된 주소 값을 선택하는 기준은 스택 위에 올라와 있는 객체의 타입이다

정리

JVM의 구조에는 크게 **Class Loader**, **Runtime data areas**, **Execution Engine**, **GC** 으로 나누어져 있다.

**Class Loader**는 클래스 파일을 Runtime Data Area의 메서드 영역으로 불러오는 역할을 한다.

**Execution Engine**은 .class파일과 같은 ByteCode를 실행 가능하도록 해석한다.

**Runtime Data Area** 는 런타임시 클래스 데이터와 같은 메타 데이터와 실제 데이터가 저장되는 곳이다.

**Runtime Data Area** 에는 또 다시 **Method Area**, **Heap**, **PC Registers**, **Java Stacks** 그리고 **Native Method Stacks** 로 나누어진다.