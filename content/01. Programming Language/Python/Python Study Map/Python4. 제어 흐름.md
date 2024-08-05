---
title: Python4. 제어 흐름
date: 2024-08-04
draft: false
tags:
  - Python
complete: true
---
## Errors vs Exceptions
### **Error**
◆ 구문오류(syntax error) : 프로그램 언어의 문법을 따르지 않아 발생한 오류

◆ 시맨틱오류(semantic error) : 프로그램 언어의 문법 상 오류는 없으나, 프로그램 명령어를 올바르게 사용하지 않아 발생하는 오류

◆ 논리오류(logical error) : 프로그램 흐름의 비정상적 처리로 원하는 결과를 얻지 못하는 오류로, 구문 또는 시맨틱 오류와 같이 프로그램이 오류로 인하여 종료(stop) 되지는 않음

#### 오류 발견 시점 기준 오류
◆ 컴파일오류(compile time error) : 컴파일 시에 체크할 수 있는 오류로, 구문오류와 정적 시맨틱오류(static semantic error)가 그 예입니다.

◆ 런타임오류(runtime error) : 컴파일 시에 체크할 수 없고, 프로그램 실행 시에 발생하는 오류로, 동적 시맨틱오류(dynamic semantic error)와 논리오류(logical error)가 있습니다. 대표적인 런타임 논리오류로는 "무한반복(looping)"이 되도록 로직을 잘못 작성한 경우라 할 수 있습니다.

### **Exception**
Python에서는 문법적으로는 정상으로 구문상의 오류는 없으나, 프로그램이 실행되는 동안에 발견되는 오류(즉, 시맨틱오류)를 예외(Exceptions)라고 합니다. 오류와 예외는 다음의 차이를 갖습니다.

◆ 오류(error) : 프로그램에서 해결할 수 없는 심각한 문제점

◆ 예외(exception) : 심각한 오류로 프로그램이 죽지않고 프로그램에서 처리할 수 있도록 함

즉, 프로그램에서 오류를 "잘" 대응함으로써 **프로그램이 비정상적으로 종료하는 경우가 없도록 하는 것이 예외 처리**.

그렇다면 이러한 Exception은 파이썬에서 도대체 어떻게 존재하고 있는 걸까? 파이썬에서 Exception을 수동으로 발생시키는 것들을 본적이 있을 것이다. 그렇다면 이러한 Exception또한 파이썬에서 다루는 객체이어야 할 것이다. ( 파이썬의 모든 것은 객체니까) 그러한 관점에서 Exception에 대해서 정보를 찍어보자.

```python
raise ValueError

dir(ValueError)
>>> [... ,
 '__class__',
 ... ,
 'args']
```

많은 것들이 있지만, 주목해야할 것은 이정도가 아닐까 싶다. 이 Exception객체의 namespace에 `__class__`를 가지고 있다. 즉, class 객체인 것이다. 엇 Exception이 class 객체라고? 그렇다면 앞서 공부한 것을 바탕으로 `mro()`를 찍어보면 클래스간 상속관계가 나와야 할 것 같다. 파이썬의 객체기에 적어도 object는 보일 것이다.

```python
ValueError.mro()
>>> [ValueError, Exception, BaseException, object]
```

**그렇다. Exception은 class 객체였다**. **사실 Python에서 Exception의 종류는 정말 많고, 클래스 객체이기에 상속관계를 따지다 보면 아래와 같이 hierarchical하게 정리할 수 있다**. 앞서 syntax error와 Exception을 구분한 것은 좁은 의미에서 Exception을 정의한 것이고, 큰 의미의 Exception에는 모두 포함된다는 것을 체크하자.

![](https://i.imgur.com/Ax3zVNr.png)


그렇다면 이러한 Exception 발생시 우리에게 보이는 Error Message와 같은 세부사항은 어떻게 생기는 것일까? 답은 개발자가 직접 적어놓는 것이다. 그렇다면 어떻게 적어놓으면 Exception에 이러한 message를 넣을 수 있을까? 방법은 간단하다. Exception뒤에 `(string)`의 형태의 코드를 추가해주는 것이다. 즉, 우리가 지정한 특정 맥락에서의 Exception발생시 이러한 이유로 Exception이 발생했다는 메세지를 전달해줄 수 있는 것이다.

```python
raise NameError('Error Message')
>>>Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: Error Message
```

### **Exception Handling**
![|420](https://i.imgur.com/8r6wtOp.png)

우리가 실행하려는 코드이지만, Exception발생 가능성이 있는 경우 try절에 넣어주고, 예상한 Excpetion이 발생했을 때 어떻게 처리해줄지를 except문에 넣어준다. 우리가 보는 대부분의 에러메세지는 이러한 문법을 통해 만들어져 있어, 특정 에러 발생시 우리에게 전해지는 세부 에러메세지는 다른 개발자분들께서 코딩해놔주신 메세지인 것이다.

```python
while True:
    try:
        x = int(input("Please enter a number: "))
        break
    except ValueError:         
        print("Oops!  That was no valid number.  Try again...")
```

참고로 이 except문에서는 튜플형식을 통해 여러개의 Exception을 함께 명명할 수 있다.
```python
except (RuntimeError, TypeError, NameError):
    pass
```

지금까지 배운 것을 바탕으로 한가지 생각해보면 좋을 만한 것에 대해 이야기해보겠다. Exception이 클래스 객체임을 확인했다. 그렇다면, 우리가 Exception자체를 만들 수 있지 않을까 싶다. 한번 해도록 하자. 우선은 그냥 클래스 객체를 만들어서 `try~ except~`문을 통해 처리되는지 확인해보겠다.

```python
class B():
    pass

class C(B):
    pass

class D(C):
    pass

for cls in [B, C, D]:
    try:
        raise cls()
    except B:
        print("B")

>>> TypeError: catching classes that do not inherit from BaseException is not allowed
```

안된다. 에러메세지를 살펴보니, `BaseException`이라는 클래스를 상속해야만 Exception이 될 수 있는 것 같다. 이를 바탕으로 한번 만들어보자.

```python
class B(Exception):
    pass

class C(B):
    pass

class D(C):
    pass

for cls in [B, C, D]:
    try:
        raise cls()
    except D:
        print("D")
    except C:
        print("C")
    except B:
        print("B")
        
>>> B
C
D
```

이렇게 실제 Excepton처럼 처리되는 것을 볼 수 있다. 결국, Exception은 `Basic Exception` 클래스를 상속받는 클래스 객체였던 것이다!