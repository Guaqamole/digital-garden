---
title: JVM
date: 2023-10-10
draft: false
tags:
  - Java
complete:
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

## 더 짧게 정리

JVM의 구조에는 크게 **Class Loader**, **Runtime data areas**, **Execution Engine**, **GC** 으로 나누어져 있다.

**Class Loader**는 클래스 파일을 Runtime Data Area의 메서드 영역으로 불러오는 역할을 한다.

**Execution Engine**은 .class파일과 같은 ByteCode를 실행 가능하도록 해석한다.

**Runtime Data Area** 는 런타임시 클래스 데이터와 같은 메타 데이터와 실제 데이터가 저장되는 곳이다.

**Runtime Data Area** 에는 또 다시 **Method Area**, **Heap**, **PC Registers**, **Java Stacks** 그리고 **Native Method Stacks** 로 나누어진다.



---

## 자바 가상 머신

Java Virture Machine은 Java 코드를 컴파일한 자바 바이트코드 (.class)를 실행할 수 있는 추상 컴퓨팅 머신.

**Virture Machine** : 하드웨어 컴퓨팅 환경의 동작을 소프트웨어로 만들어 둔 것

**추상 컴퓨팅 머신** : 구현이 되어 있는 것이 아님. 각 플랫폼에 맞게 구현을 시켜야 한다.

→ 자바는 플랫폼에 독립적이지만 JVM은 플랫폼에 의존적이다.

그래서 오라클에서 대부분의 운영체제 뿐 아니라 웹 브라우저, 스마트폰, 가전기기 등에 JVM을 설치할 수 있도록 지원함.

![](https://i.imgur.com/nlGrPTD.png)

### 특징

1. 스택 기반의 가상 머신
2. 심볼릭 레퍼런스
3. 가비지 컬렉션
4. 기본 자료형을 명확하게 정의
5. 네트워크 바이트 오더

## 1. 스택 기반의 가상 머신

인텔x86 아키텍처나 ARM 아키텍처와 같은 하드웨어가 레지스터 기반으로 동작하는데 비해

JVM은 **스택 기반**으로 동작한다.

가상 머신은 CPU에 의해 처리되는 동작을 흉내낼 수 있어야 한다.

- 소스 코드를 VM이 실행할 수 있는 바이트 코드로 변환
- 명령어와 피연산자를 포함하는 데이터구조
- 함수를 실행하기 위한 콜스택
- 다음 실행할 명령어를 가리키는 IP(Instruction Pointer)
- 가상 CPU
    - Fetch
        - IP가 가리키는 명령어를 가져온다
    - Decode
        - 가져온 명령어를 디코드(해석)한다.
    - Execution
        - 디코딩된 명령어를 수행한다


---
# Java의 탄생 배경

Java는 1991년 썬 마이크로시스템즈(이하 썬)의 제임스 고슬링과 아서 밴 호프를 주축으로 한 엔지니어들이 `플랫폼으로부터 독립적으로 실행 가능하도록 개발한 언어`예요. 참고로 여기서 플랫폼이란 운영체제와 CPU 아키텍처를 말해요. 대표적으로 Windows, Linux, Mac 그리고 x86과 핸드폰에 주로 쓰이는 arm이 있죠. 이해를 높이기 위해서, 잠시 91년도로 돌아가볼까요? 90년대 초는 C와 C++ 의 사용률이 높았던 시절이예요. 그들은 왜 당시 핫했던 C나 C++를 사용하지 않았을까요? 객체지향 프로그래밍을 하려면 C++로도 가능했지만, C++는 플랫폼에 따라 컴파일러에 차이가 있어 `플랫폼 간 실행파일의 호환성이 보장되지 않았어요`. 이는 인터넷의 발전으로 다양한 환경에서 실행될 가능성이 높아진 프로그램들을 플랫폼에 따라, 크로스 컴파일(Cross Complie) 해서 실행해야 하는 불편함이 생겼어요. 그래서 썬의 개발자들은 이 문제를 근본적으로 해결하기 위해, `JVM(Java Virtual Machine)`이라는 가상머신을 만들어 운영체제와 상관 없이 동일한 코드(바이트 코드)를 실행할 수 있도록 만들었어요.

**추가 용어 설명**

- **컴파일**이란 사람이 이해할 수 있도록 작성한 프로그래밍 언어를 소스 코드를 컴퓨터가 이해할 수 있도록 이진수 형태인 기계어로 변환하는 것을 말해요.
- **바이트코드**란 고급 언어로 작성된 소스 코드를 가상머신이 이해할 수 있는 `중간 코드`로 컴파일한 것을 말해요. 자바의 경우, JVM이 이 바이트코드를 각각의 하드웨어 아키텍처에 맞는 기계어로 변환해서 실행해요.
- **기계어**란 CPU가 직접 해독하고 실행할 수 있는 비트 단위로 쓰인 컴퓨터 언어를 말해요.
- **크로스 컴파일**이란 플랫폼에 따라 읽어올 수 있는 기계어 형태가 다른데, 해당 플랫폼에 맞춰 컴파일하는 것을 말해요.

# JVM 동작원리 및 기본 개념
![JVM실행과정](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2Fexecution_process.png&w=1920&q=75)

JVM의 동작 원리는 다음과 같아요. JVM은 자바 컴파일러에 의해 컴파일된 바이트 코드(.class)를 `클래스 로더`를 통해 `런타임 데이터 영역`에 전달해요. 그리고 `실행 엔진`을 통해 명령어 단위로 하나씩 실행하는 역할을 수행해요. 그래서 클래스 로더, 런타임 데이터 영역, 실행엔진을 알아야 JVM에 알 수 있어요. 이 세 요소들이 유기적으로 상호작용함으로써 JVM이 작동하기 때문이죠.

# **클래스 로더**
![클래스로더](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2Fclass_loader.png&w=750&q=75)

**클래스 로더**는 클래스 로드, 클래스 링킹 (검증, 준비, 분석), 클래스 초기화 과정을 거쳐, `실행 엔진`에서 실행할 수 있도록 `런타임 데이타 영역`에 클래스 파일을 적재하는 역할을 해요. 이 때, 클래스를 메모리에 한 번에 전부 올리는 것이 아니라 어플리케이션에서 필요한 경우마다 동적으로 로딩합니다.

1. 로딩

컴파일된 파일 안에는 단순히 사용자가 작성한 클래스만 존재하지 않아요. Java 내장 API 및 확장 클래스들이 함께 존재하죠. 클래스 로더는 Bootstrap Class Loader, Extension Class Loader, System Class Loader, User-Defined Class Loader로 나뉘며, 이러한 특성을 `계층 구조`라고 이야기해요.

- **부트스트랩 클래스 로더(Bootstrap Class Loader)** : 모든 클래스들의 상위 클래스인 Object 클래스들 비롯해, 자바 API를 로드해요.
- **익스텐션 클래스 로더(Extension Class Loader)** : 다양한 보안 확장 기능 등 확장 클래스들을 로드해요.
- **시스템 클래스 로더(System Class Loader)** : 앞서, 두 로더가 JVM 자체의 구성요소들을 로드했다면 시스템 클래스 로더는 사용자가 지정한 $CLASSPATH 내의 클래스들을 로드해요.
- **사용자 정의 클래스 로더(User-Defined Class Loader)** : 애플리케이션 사용자가 직접 코드 상에서 생성하여 사용하는 클래스 로더를 말한다.
![class_loader_2](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2Fclass_loader_2.png&w=640&q=75)

또 클래스 로드를 요청받으면, 이전에 로드된 적 있는지 확인하기 위해 클래스 로더 캐시를 확인하고 없으면 아래에서부터 순서대로 해당 클래스가 있는 위치를 확인해요. 이 때 올라가는 도중에 클래스를 발견하더라도 최상위 클래스 로더까지 확인하여 거기에도 동일한 클래스가 존재하면 상위 클래스를 로드해요. 만약 최상위 클래스 로더에 찾는 클래스가 없으면 로드를 요청 받은 클래스 로더가 파일 시스템에서 해당 클래스를 찾아요. 이러한 특성을 `위임 모델`이라고 하며, 위 그림과 같은 구조를 띄어요.

2. 링킹

로드 과정을 거치면 검증, 준비, 분석 단계를 거쳐요.

- 검증 (Verification) : Bytecode Verifier를 통해, 읽어들인 바이트 코드들이 바르게 생성되었는지 확인해요. 만약 바르게 생성되지 않았다면 검증에 실패하며 오류를 뱉어요.
- 준비 (Preparation) : 클래스가 필요로 하는 메모리를 할당해요. 필요한 메모리란 클래스에서 정의된 필드, 메서드, 인터페이스들을 나타내는 데이터 구조를 말해요.
- 분석 (Resolution) : 메모리에 적재되지 않았기 때문에 심볼릭 레퍼런스(Symbolic Reference, [예] com.example.User)로 참조되던 요소가 실제 위치한 주소로 참조해요. 이 과정을 `Constant Pool Resolution`이라고 불러요.

3. 초기화

클래스 로딩의 마지막 과정으로, 가리키던 주소 값을 참조하여 실제 사용자가 정의한 값으로 변경해요.

런타임 데이터 영역

![Runtime-Data-Area](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2FRuntime-Data-Area.png&w=1920&q=75)

다음은 런타임 데이터 영역입니다. 런타임 데이터 영역은 애플리케이션이 동작하기 위해 OS에서 할당 받은 메모리 공간을 의미하는데요. 아래 5가지로 구성됩니다.

- 메서드 영역(Method Area)

메서드 영역은 JVM이 시작될 때 생성되는 메모리 영역입니다. 또 모든 쓰레드가 공유하는 영역이므로 멀티 스레드 프로그래밍을 할 때 동기화에 주의해야 하는 영역이기도 해요. 이 곳에는 `런타임 상수 풀 (Runtime Constant Pool)`이 있는데, 이 런타임 상수 풀은 각 클래스와 인터페이스의 상수, 메서드와 필드에 대한 레퍼런스 정보를 보관하는 테이블로 **JVM 동작의 가장 핵심적인 역할을 수행하는 정보를 보관**합니다. 실제 코드를 실행할 때, 메서드 영역의 런타임 상수 풀에 있는 정보를 조회하여 값을 불러와요. 또 GC(Garbage Collector)가 관리하는 메모리 영역 중 하나예요. static 메서드와 인자를 객체 생성 없이 사용할 수 있는 까닭도 공통 영역인 Method Area에서 값을 보관하기 때문이예요.

- 힙 영역(Heap Area)

모든 Object와 Instacne를 저장하는 공간입니다. 또한 메서드 영역과 마찬가지로, 모든 쓰레드가 공유하는 영역입니다. 또 프로그래머가 직접적으로 성능에 영향을 줄 수 있는 메모리 영역 중 하나예요. 생성 후 더 이상 사용되지 않는 클래스는 자동으로 GC(Garbage Collector)가 정리하지만, memory leak 현상이 발생하지 않도록 메모리 관리에 유의해야 해요.

- 스택 영역(Stack Area, JVM Stacks)

스택 영역은 메서드를 실행하기 위한 정보들이 저장되는 공간입니다. **각 쓰레드를 위해 분리된 런타임 환경**으로, 변수나 임시 데이터, 쓰레드 또는 메서드 정보들을 저장해요. 그리고 스레드 역할이 종료되면 바로 소멸돼요. printStackTrace()를 통해 확인할 수 있는데, 각 라인 하나가 스택 프레임을 표현해요.

또 이 프레임은 메서드가 하나 호출될 때마다 새로 생기고 작업이 완료되거나 예외가 생기면 종료돼요. 그리고 하나의 스택 프레임에는 LVA(Local Variable Array), OS(Operand Stack), 상수 풀 참조 주소(Reference to Constant Pool)가 존재하는데, 바이트 코드가 실행되는 과정에서 LVA에 계산 결과를 저장하고 연산 결과를 OS에 저장해요. 또 참조 주소를 확인해, 실제 메서드 값을 반환할 때 사용돼요.

아래와 같은 자바 코드를 실행한 상황이라 가정해볼게요. 실행 과정을 살펴보기 위해, 아래 소스코드의 바이트코드를 읽어오겠습니다.

```java
package com.example;

public class Calculation {
    public static void main(String[] args) {
        Calculation calculation = new Calculation();
        int result = calculation.sum(3);
    }

    private int sum(2️⃣ int param){
        1️⃣ int localVariable = 1;
        5️⃣ int sum = 3️⃣ localVariable + 4️⃣ param;
        7️⃣9️⃣ print(8️⃣ sum);
        🔟 return sum;
    }

    private void print(int param){
        System.out.println("param = " + param);
    }
}
```

실제 스택 영역의 값들은 다음과 같아요.
![Stack_Frame](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2Fstack_frame.png&w=1920&q=75)

그리고 실제 바이트코드의 실행 과정은 다음과 같아요. 아래와 같이 메서드가 실행되는 과정에서 Stack 영역의 메모리 공간을 활용하게 됩니다.

```json
0 iconst_1 1️⃣ 스택에 정수 값 1을 올린다
1 istore 2 2️⃣ LTV의 2번 인덱스에 1을 저장한다
2 iload 2 3️⃣ 저장한 값을 불러온다
3 iload 1 4️⃣ param 1번 인덱스인 param 3을 불러온다
4 iadd  5️⃣ 더한다
5 istore 3 6️⃣ 더한 값(sum)을 저장한다
6 aload 0 7️⃣ this를 호출한다
7 iload 3 8️⃣ 저장된 값(sum)을 호출한다
8 invokestatic com/example/Calculation.print(I)V 9️⃣ print 함수를 호출한다
9 iload 3 🔟 저장된 값(sum)을 호출한다
10 ireturn
```

그리고 9️⃣번에서 호출된 print 함수의 내부 동작은 다음과 같아요.

```json
0 getstatic java/lang/System.out:java.io.PrintStream // PrintStream이란 static 객체를 불러온다
1 iload 1 // param 1번 인덱스인 param 4을 불러온다
2 invokedynamic // InvokeDynamic #0:makeConcatWithConstants
3 invokevirtual java/io/PrintStream.println(Ljava/lang/String;)V // println 메서드 호출
```

- PC 레지스터(PC Register)

현재 수행 중인 명령의 주소 정보를 보관해요. 스레드가 시작될 때 생성되며, 어떤 명령을 실행해야 할지에 관해 기록해요.

- 네이티브 메서드 스택 (Native Method Stack)

바이트 코드가 아닌 기계어로 작성된 프로그램을 실행하는 영역으로, Java가 아닌 다른 언어로 작성된 코드를 위한 영역이예요. JNI(Java Native Interface)를 통해 바이트 코드로 전환하여 저장할 수 있어요.

실행 엔진

![execution_engine](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2Fexecution_engine.png&w=750&q=75)

이제 런타임 데이터 영역에 바이트 코드가 불러와졌으니, 실행만 남았어요. 실행은 실행 엔진을 통해 이뤄지는데요, **실행 엔진**은 JVM 메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 실행하는 역할을 해요. 실행엔진은 2가지 방식을 이용해 동작하는데요. 하나씩 읽고 해석하고 실행하는 `자바 인터프리터 방식`과 바이트 코드 전체를 컴파일하여 바이너리 코드로 변경하고 바이너리 코드를 직접 실행하는 `JIT 컴파일러 방식`이 있어요.

- Interpreter

바이트 코드를 기계어로 번역하고 실행하는 역할을 수행해요. 다만 같은 메서드가 여러 번 호출될 때 매번 새로 수행해야 하는 문제가 존재해, 반복되는 코드를 발견하면 JIT 컴파일러를 사용해요.

- JIT Complier

JIT Complier는 Interpreter의 문제를 개선하기 위해 등장했는데요, 반복되는 코드를 발견하여 전체 바이트 코드를 컴파일하고 그것을 Native Code(Java의 부모 격인 C, C++, 어셈블리어 등)로 변경하여 사용합니다. 바이트 코드 전체를 실행하기 때문에 실행 속도가 인터프리터 방식보다 빨라요.

- Garbage Collector

더 이상 참조되지 않는 메모리 객체(Garbage)들을 모아 정해진 시간마다 제거하는 역할을 수행해요. 또 GC가 작동하는 동안, GC 관련 Thread를 제외한 모든 Thread가 멈추게 돼요.

# 정리하며
![JVM-Architecture](https://www.joonfluence.com/_next/image?url=%2Fstatic%2Fimages%2Fjava%2Fstep-0%2FJVM-Architecture.png&w=1920&q=75)

정리해보면, 자바 프로그램의 실행 과정은 다음과 같아요.

1. 자바 컴파일러는 자바 소스코드를 읽어, JVM이 실행할 수 있는 중간 단계인 바이트 코드로 변환해요.
2. 컴파일된 코드는 클래스 로더에 전달되요.
3. 클래스 로더는 동적로딩을 통해 그 때 그 때 필요한 클래스들을 로딩, 링킹, 초기화 과정을 거쳐 JVM의 Runtime Data Area에 적재해요.
4. 로딩된 바이트 코드는 실행 엔진(Execution Engine)을 통해 실행되요.