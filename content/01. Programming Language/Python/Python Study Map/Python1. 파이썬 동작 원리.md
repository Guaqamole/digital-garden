---
title: Python1. 파이썬 특징
date: 2024-08-03
draft: false
tags:
  - Python
  - Concept
complete: true
---
## ❗인터프리터 언어 vs 컴파일러 언어

### 인터프리터 언어
- 프로그래머가 작성한 코드를 기계어로 변환하는 과정 없이 한 줄 한 줄 해석해서 바로 명령어를 실행하는 언어
- 기계어로 변환하지 않기 때문에 빌드 과정 없이 바로 실행 가능
- 런타임 상황에서는 한 줄씩 읽기 때문에 컴파일 언어에 비해 속도가 느림
- 프로그램 수정이 간단
    
![](https://i.imgur.com/q2R5zwx.png)


### 컴파일 언어
- 프로그래머가 작성한 코드를 모두 기계어로 변환 후 기계에 넣고 기계어 코드를 실행
- 빌드 과정 (소스 파일 -> 실행 파일)에서 인터프리터 언어에 비해 시간 소요
- 런타임 상황에서는 이미 소스코드가 변환되어 있기에 빠름
- 수정 후 다시 컴파일 해야 함
![](https://i.imgur.com/4ZCz6zS.png)

### 동적 바인딩 언어
프로그램 실행 중에 자료형과 함수의 타입이 결정되는 것을 말합니다. 즉 코딩을 할때 값이 어느 변수의 타입인지 할당이 되지 않고, 프로그램을 우리가 실제로 동작을 하는 동시에 자료형과 함수의 타입이 그때 그때마다 결정이 됩니다. 파이썬에서 하나의 장점이자 단점이 변수를 생성할때 type을 지정하지 않는것도 파이썬이 동적 바인딩 프로그래밍 언어라는 사실을 알 수 있습니다. 하지만 동적바인딩의 가장 단점은 타입이 정해져 있지 않기 때문에 정적 바인딩(사전에 자료형과 함수의 타입이 정해져있는)에 비해 실행 속도가 느립니다. 

## 🎈 python의 구현체
**파이썬 구현체는 인터프리터 안에 컴파일러를 내장하고 있다!**

구현체: 인터페이스나 추상 클래스를 상속받아 실제로 메서드를 구현한 클래스
```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass

class Dog(Animal):
    def sound(self):
        return "Bark"

class Cat(Animal):
    def sound(self):
        return "Meow"
```

### CPython
- 파이썬을 C언어로 구현한 구현체
- 인터프리터이면서 컴파일러
- 파이썬 코드를 컴파일해서 bytecode로 바꾸고 인터프리터가 실행
- .py 파일을 실행하면 .pyc파일이 생성(cpython이 컴파일한 bytecode 들어있음)
- GIL(Global interpreter lock) 사용

### Jython
- 파이썬 코드를 java bytecode로 만들어서 JVM에서 실행될 수 있도록 함
- .py파일을 .class 파일로 컴파일

### PyPy3
- python 자체로 구현
- JIT 컴파일(프로그램을 실행하는 시점에서 필요한 부분을 즉석으로 컴파일하는 방식) 도입해서 Cpython보다 빠름  

## 🎈 동작 순서
![](https://velog.velcdn.com/images%2Fchldppwls12%2Fpost%2F996ce5b5-9b83-4796-be68-67ac1423beb0%2Fimage.png)

1. 파이썬 컴파일러는 명령어를 바이트코드 명령어로 번역하고 이를 하드 디스크의 .pyc파일에 저장
2. 파이썬 인터프리터는 .pyc를 변역하여 인터프리터 방식으로 기계어로 번역

## 동작 순서 심화
<mark class="hltr-highlight">CPython은 인터프리터 이면서 컴파일러</mark> 이다. 우리가 작성하는 Python 코드를 bytecode로 컴파일 하고 실행한다. 다시 말해, python 코드를 C언어로 바꾸는 것이 아니라 컴파일하여 bytecode로 바꾸고 그 다음에 interpreter(python virtual machine)가 실행한다.

`.py` 파일을 실행하면 `.pyc` 라는 파일이 생성되는데 이것이 CPython이 컴파일한 bytecode가 들어있는 것이다. 그 다음 `.pyc`를 interpret 하는 것도 CPyton이다.
![](https://i.imgur.com/3fYj7z2.png)

```python
리딩(text) -> 렉싱(CST) -> 파싱(AST) -> 컴파일 -> 인터프리팅(vm) -> 실행
```
1. 리딩: 파일, I/O 스트림 혹은 텍스트 형식으로된 파이썬 코드가 리더에게 전달됨 (명령문 to 컴파일러)
2. 렉싱: 전달된 텍스트는 렉싱이라는 과정을 거쳐 어휘/구문을 분석하여 concrete syntax tree 생성 (명령문 to 컴파일러)
3. 파싱: syntax tree에서 중요 문법을 거르기 위해 abstract syntax tree 라는 tree 구조를 형성하여 컴파일러에게 전달 (명령문 to 컴파일러)
4. 컴파일러: AST 구조로 형성되어 처리 시간이 대폭줄고 컴파일 하기 용이해진 데이터를 컴파일하여 바이트 코드로 변환 (컴파일러 to 바이트 코드)
5. 인터프리팅: python virtual machine에서 필요한 라이브러리와 바이트 코드 (.pyc) 를 한줄씩 바이너리 코드로 변환하여 실행한다. (바이트 코드 to vm to CPU)

**bytecode.py**
```python
def hello():
    print("hello")

import dis
dis.dis(hello)
  2           0 LOAD_GLOBAL              0 (print)
              2 LOAD_CONST               1 ('hello')
              4 CALL_FUNCTION            1
              6 POP_TOP
              8 LOAD_CONST               0 (None)
             10 RETURN_VALUE
```