---
title: Java
date: 2023-10-09
draft: false
tags: 
complete:
---
# JDK, JRE, JVM

![](https://i.imgur.com/gKrMqoi.png)

### **JDK**
- 자바 개발 환경으로 자바 어플리케이션을 개발하기 위해 필요한 도구를 제공한다.
- 자바 언어를 바이트 코드로 컴파일 해주는 자바 컴파일러(javac), 자바 클래스 파일을 해석해주는 역 어셈블리어(javap) 등이 있다.
- 자세한 내용은 [Tools and Commands Reference](https://docs.oracle.com/en/java/javase/11/tools/tools-and-command-reference.html) 에서 확인이 가능하다.

### **JRE**
- JRE는 자바 실행 환경으로 JVM,자바 클래스 라이브러리, 기타 자바 어플리케이션 실행에 필요한 파일들을 포함한다.

### **JVM**
[[JVM]] 은 자바 가상 머신으로 자바 어플리케이션을 실행하는 가상 머신이다. 실제 컴퓨터로 부터 JAVA 어플리케이션 실행을 위한 메모리를 할당 받아 Runtime Data Area를 구성한다.

- JVM은 인터프리터와 JIT 컴파일러를 통해 바이트 코드를 각 운영체제에 맞는 기계어로 해석시켜 실행시키고, 가비지 콜렉터를 통해 어플리케이션의 동적 메모리를 관리한다.
- 자세한 내용은 [The Java® Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se11/jvms11.pdf)와 • [Java Virtual Machine Guide](https://www.oracle.com/pls/topic/lookup?ctx=javase11&id=JSJVM-GUID-982B244A-9B01-479A-8651-CB6475019281)에서 확인 가능하다.

___

# JAVA 컴파일 순서


![](https://i.imgur.com/dm6cvvX.png)


1. 개발자가 자바 소스코드(.java)를 작성한다.
    
2. 자바 컴파일러(Java Compiler)가 자바 소스파일을 컴파일한다.
    이때 나오는 파일은 자바 바이트 코드(.class)파일로 아직 컴퓨터가 읽을 수 없는 자바 가상 머신이 이해할 수 있는 코드이다. 바이트 코드의 각 명령어는 1바이트 크기의 Opcode와 추가 피연산자로 이루어져 있다.
    
3. 컴파일된 바이트 코드를 JVM의 클래스로더(Class Loader)에게 전달.
    
4. 클래스 로더는 동적로딩(Dynamic Loading)을 통해 필요한 클래스들을 로딩 및 링크하여 런타임 데이터 영역(Runtime Data area), 즉 JVM의 메모리에 올린다.
    
    - 클래스 로더 세부 동작  
        a. 로드 : 클래스 파일을 가져와서 JVM의 메모리에 로드한다.  
        b. 검증 : 자바 언어 명세(Java Language Specification) 및 JVM 명세에 명시된 대로 구성되어 있는지 검사한다. 
        c. 준비 : 클래스가 필요로 하는 메모리를 할당(필드, 메서드, 인터페이스 등등)  
        <mark class="hltr-highlight">d. 분석 : 클래스의 상수 풀 내 모든 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경한다 (?)</mark>
        e. 초기화 : 클래스 변수들은 적절한 값으로 초기화한다.(static 필드)
    - 
5. 실행엔진(Execution Engine)은 JVM 메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 가져와서 실행. 이때, 실행 엔진은 두가지 방식으로 변경한다.  
    i. 인터프리터: 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행한다. 하나하나의 실행은 빠르나, 전체적인 실행 속도가 느리다는 단점을 가짐.  
    ii. JIT 컴파일러(Just-In-Time Compiler) : 인터프리터의 단점을 보완하기 위해 도입된 방식으로 바이트 코드 전체를 컴파일하여 바이너리 코드로 변경하고 이후에는 해당 메서드를 더 이상 인터프리팅 하지 않고, <mark class="hltr-highlight">바이너리 코드로 직접 실행하는 방식이다</mark>. 하나씩 인터프리팅하여 실행하는 것이 아니라 바이트 코드 전체가 컴파일된 바이너리 코드를 실행하는 것이기 때문에 전체적인 실행속도는 인터프리팅 방식보다 빠름.


# Reference
- https://docs.oracle.com/javase/specs/jvms/se7/html/