---
title: Python
date: 2023-10-09
draft: false
tags:
  - Python
  - Concept
complete: true
---
Python은 1991년 프로그래머인 귀도 반 로섬(Guido van Rossum)이 발표한 고급 프로그래밍 언어로, 플랫폼 독립적이며 인터프리터식, 객체지향적, 동적 타이핑(dynamically typed) 대화형 언어이다. 파이썬이라는 이름은 귀도가 좋아하는 코미디 〈Monty Python’s Flying Circus〉에서 따온 것이다.

![](https://i.imgur.com/gL4AU4N.png)

# 1. Python의 철학
파이썬 코드는 프로그래밍을 한번도 해보자 않은 사람조차도 소스 코드만 보고 프로그램이 어떤 일을 하는지 이해할 수 있을 정도로 접근하기 쉽고, 이는 Pythonista (베테랑 파이썬 개발자)의 자랑이다.

가독성(readability) 은 파이썬 디자인의 핵심이며, 코드 작성자가 코드를 읽는데 소요하는 시간이 훨씬 길다는 인식이 바탕에 깔려있다. 

그렇기 때문에 우리가 작성하는 파이썬 코드는 `PEP20` 과 `PEP8` 이라는 코드 스타일 가이드라인을 따라야한다. 두 가이드라인을 팔로우 하면서 파이썬 코드가 좀 더 쉽게 이해될 수 있다면, 이보다 더 Pythonic한 파이썬 코드는 없을것이다. 

> “A foolish consistency is the homoglobin of little minds”
> 멍청한 일관성의 고집은 소인배의 발상이다.

## The Zen of Python
파이썬 다운 코딩은 어떤 것일까?

언어에는 그에 맞는 적절한 표현 방식이 있다. 외국인이 우리말을 할 때, 문법적으로는 틀리지 않았다고 해도 듣기에 영 어색한 경우가 있다. 반대로 한국인이 영어를 하면 영어를 고유어로 사용하는 사람들이 어색하게 여길 때가 많을 거다.

파이썬의 선(The Zen of Python)은 파이썬이 추구하는 철학을 시적(?)으로 표현한 것이다. Tim Peters란 프로그래머가 파이썬 디자인(설계?)에 관해 언급한 20개의 경구 중 19개를 문서화 한 것이란다(나머지 한 구절은 무엇인지 궁금하다). 파이썬 뿐만 아니라 프로그래밍 언어라면-일상에서도 마찬가지지만- 모두 적용되는 이야기가 아닐까 싶다. 일종의 Easter Egg로 파이썬 쉘에서 `import this`를 입력하면 볼 수 있다.

```txt
Beautiful is better than ugly. 아름다움이 추한 것보다 낫다.

Explicit is better than implicit. 명확함이 함축된 것보다 낫다.

Simple is better than complex. 단순함이 복잡한 것보다 낫다.

Complex is better than complicated. 복잡함이 난해한 것보다 낫다.

Flat is better than nested. 단조로움이 중접된 것보다 낫다.

Sparse is better than dense. 여유로움이 밀집된 것보다 낫다.

Readability counts. 가독성은 중요하다.

Special cases aren't special enough to break the rules. 
규칙을 깨야할 정도로 특별한 경우란 없다.

Although practicality beats purity. 
비록 실용성이 이상을 능가한다 하더라도.

Errors should never pass silently. 오류는 결코 조용히 지나가지 않는다. Unless explicitly silenced. 알고도 침묵하지 않는 한.

In the face of ambiguity, refuse the temptation to guess. 
모호함을 마주하고 추측하려는 유혹을 거절하라. 

There should be one-- and preferably only one --obvious way to do it. 
문제를 해결할 하나의 - 바람직하고 유일한 - 명백한 방법이 있을 것이다.

Although that way may not be obvious at first unless you're Dutch. 
비록 당신이 우둔해서 처음에는 명백해 보이지 않을 수도 있겠지만.

Now is better than never. 
지금 하는 것이 전혀 안하는 것보다 낫다. 

Although never is often better than _right_ now. 
비록 하지않는 것이 지금 하는 것보다 나을 때도 있지만.

If the implementation is hard to explain, it's a bad idea. 
설명하기 어려운 구현이라면 좋은 아이디어가 아니다. 

If the implementation is easy to explain, it may be a good idea. 
쉽게 설명할 수 있는 구현이라면 좋은 아이디어일 수 있다. 

Namespaces are one honking great idea -- let's do more of those! 
네임스페이스는 정말 대단한 아이디어다. -- 자주 사용하자!
```


### “Explicit is better than implicit.”
The Zen of the Python에서 명시되었던 것처럼, 일반적으로 **코드는 가장 간단하고 명시적인 방법으로 작성하는것이 좋다.**

##### 나쁜예시 (Implicit)
```python
def make_dict(*args):
	x, y = args
	return dict(**locals())
```

##### 좋은 예시 (Explicit)
```python
def make_dict(x, y):
	return {'x': x, 'y': y}
```


# 3. Python은 어떻게 동작하는가?

![](https://i.imgur.com/3fYj7z2.png)

## Python의 구현체 CPython

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

[[CPython]] 인터프리터 실행 중에 단점이 있는데. [[GIL]] (global interpreter lock)을 사용한다는 것이다. bytecode를 실행할 때에 여러 thread를 사용할 경우, 전체에 lock 을 걸어서 한번에 단 하나의 thread 만이 python object에 접근하도록 제한한 것이다. 하지만 single thread일 때는 문제가 없고 GIL의 단점을 보안하기 위한 방법들이 존재하고 있어서 Enterprise급 Application, 혹은 잘못 설계한 프로그램이 아닌이상, GIL로 인한 불편함을 느낄 가능성은 거의 없다고 한다.

## Python Compiler
![](https://i.imgur.com/8Z4DpAU.png)

1. [[CPython]] : Python 그 자체
2. [[PyPy]] : Python Compiler를 Python으로 작성한 Python 구현체
3. Cython : C언어 비슷한 문법으로 함수를 작성하고, CPython Library를 만들어주는 패키지
4. [[Jython]] : Python을 구현할 때 "JVM"을 사용한 Python
5. IronPython : Python을 구현할 때 ".NET"을 사용한 Python

___

