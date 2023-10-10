---
title: Python
date: 2023-10-09
draft: false
tags:
  - Python
---
Python은 1991년 프로그래머인 귀도 반 로섬(Guido van Rossum)이 발표한 고급 프로그래밍 언어로, 플랫폼 독립적이며 인터프리터식, 객체지향적, 동적 타이핑(dynamically typed) 대화형 언어이다. 파이썬이라는 이름은 귀도가 좋아하는 코미디 〈Monty Python’s Flying Circus〉에서 따온 것이다.


# Python은 어떻게 동작하는가?

![](https://i.imgur.com/3fYj7z2.png)

##### Python의 구현체 CPython

일반적으로 python이 C로 구현되어 있다고 알려져 있는데 그 구현체가 [[CPython]]이다. 가장 처음 만들어진 python의 구현체이고 _Python.org_ 에서 다운 받으면 CPython을 받는 것이다. 다른 구현체들과 비교해서 언급할 때 주로 [[CPython]]이라고 표기하는데 Python을 C언어로 구현한 구현체를 의미한다.

<mark class="hltr-highlight">CPython은 인터프리터 이면서 컴파일러</mark> 이다. 우리가 작성하는 Python 코드를 bytecode로 컴파일 하고 실행한다. 다시 말해, python 코드를 C언어로 바꾸는 것이 아니라 컴파일하여 bytecode로 바꾸고 그 다음에 interpreter(python virtual machine)가 실행한다.

`.py` 파일을 실행하면 `.pyc` 라는 파일이 생성되는데 이것이 CPython이 컴파일한 bytecode가 들어있는 것이다. 그 다음 `.pyc`를 interpret 하는 것도 CPyton이다.

`dis` 라는 패키지를 사용하면 python 코드가 어떻게 bytecode로 변환되는지를 볼 수 있다.

```python
>>> def hello():
...    print("Hello")  
...
>>> import dis
>>> dis.dis(hello)  
2           0 LOAD_GLOBAL              0 (print)
            2 LOAD_CONST               1 ('Hellog')
            4 CALL_FUNCTION            1
```

[[CPython]] 인터프리터 실행 중에 단점이 있는데. [[GIL]] (global interpreter lock)을 사용한다는 것이다. bytecode를 실행할 때에 여러 thread를 사용할 경우, 전체에 lock 을 걸어서 한번에 단 하나의 thread 만이 python object에 접근하도록 제한한 것이다. 하지만 single thread일 때는 문제가 없고 GIL의 단점을 보안하기 위한 방법들이 존재하고 있어서 GIL로 인한 불편함을 느낄 가능성은 거의 없다고 한다.

##### Python Compiler

![](https://i.imgur.com/8Z4DpAU.png)

1. [[CPython]] : Python 그 자체
2. [[PyPy]] : Python Compiler를 Python으로 작성한 Python 구현체
3. Cython : C언어 비슷한 문법으로 함수를 작성하고, CPython Library를 만들어주는 패키지
4. [[Jython]] : Python을 구현할 때 "JVM"을 사용한 Python
5. IronPython : Python을 구현할 때 ".NET"을 사용한 Python