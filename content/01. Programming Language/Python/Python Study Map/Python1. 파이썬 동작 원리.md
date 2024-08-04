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


## 🎈 python의 구현체
**파이썬 구현체는 인터프리터 안에 컴파일러를 내장하고 있다!**

구현쳬: 인터페이스나 추상 클래스를 상속받아 실제로 메서드를 구현한 클래스
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