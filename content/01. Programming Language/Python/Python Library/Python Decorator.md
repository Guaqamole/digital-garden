---
title: Python Decorator
date: 2023-11-08
draft: false
tags:
  - Python
  - StandardLibrary
complete: true
---

> [!info] 
> 파이썬은 데코레이터(decorator)라는 기능을 제공합니다. 데코레이터는 장식하다, 꾸미다라는 뜻의 decorate에 er(or)을 붙인 말인데 장식하는 도구 정도로 설명할 수 있습니다.
> 
> 데코레이터는 함수를 감싸는 형태로 구성되어 있습니다. 따라서 데코레이터는 기존 함수를 수정하지 않으면서 추가 기능을 구현할 때 사용합니다.

지금까지 클래스에서 메서드를 만들 때 @staticmethod, @classmethod, @abstractmethod 등을 붙였는데, 이렇게 @로 시작하는 것들이 데코레이터입니다. 즉, 함수(메서드)를 장식한다고 해서 이런 이름이 붙었습니다.

```python
class Calc:
    @staticmethod    # 데코레이터
    def add(a, b):
        print(a + b)
```

이번 유닛에서는 데코레이터를 만들고 사용하는 방법을 알아보겠습니다.

참고로 데코레이터는 장식자라고 부르기도 합니다. 이 책에서는 데코레이터를 사용하겠습니다.

## 데코레이터 만들기

데코레이터는 함수를 장식한다고 했는데 도대체 어디에 사용하는 것일까요? 데코레이터는 함수를 수정하지 않은 상태에서 추가 기능을 구현할 때 사용합니다. 예를 들어서 함수의 시작과 끝을 출력하고 싶다면 다음과 같이 함수 시작, 끝 부분에 print를 넣어주어야 합니다.

```python
def hello():
    print('hello 함수 시작')
    print('hello')
    print('hello 함수 끝')
 
def world():
    print('world 함수 시작')
    print('world')
    print('world 함수 끝')
 
hello()
world()
```

```bash
# 실행 결과
hello 함수 시작
hello
hello 함수 끝
world 함수 시작
world
world 함수 끝
```

만약 다른 함수도 시작과 끝을 출력하고 싶다면 함수를 만들 때마다 print를 넣어야 합니다. 따라서 함수가 많아지면 매우 번거로워집니다.

이런 경우에는 데코레이터를 활용하면 편리합니다. 다음은 함수의 시작과 끝을 출력하는 데코레이터입니다.

```python
def trace(func):                             # 호출할 함수를 매개변수로 받음
    def wrapper():                           # 호출할 함수를 감싸는 함수
        print(func.__name__, '함수 시작')    # __name__으로 함수 이름 출력
        func()                               # 매개변수로 받은 함수를 호출
        print(func.__name__, '함수 끝')
    return wrapper                           # wrapper 함수 반환
 
def hello():
    print('hello')
 
def world():
    print('world')
 
trace_hello = trace(hello)    # 데코레이터에 호출할 함수를 넣음
trace_hello()                 # 반환된 함수를 호출
trace_world = trace(world)    # 데코레이터에 호출할 함수를 넣음
trace_world()                 # 반환된 함수를 호출
```

```python
# 실행 결과
hello 함수 시작
hello
hello 함수 끝
world 함수 시작
world
world 함수 끝
```

hello와 world 함수의 시작과 끝이 출력되었습니다. 먼저 데코레이터 trace는 호출할 함수를 매개변수로 받습니다 (trace는 추적하다라는 뜻인데 프로그래밍에서 함수의 실행 상황을 추적할 때 trace라는 말을 사용합니다).

```python
# 호출할 함수를 매개변수로 받음
def trace(func):
```

trace 함수 안에서는 호출할 함수를 감싸는 함수 wrapper를 만듭니다(wrapper는 물건을 싸는 포장지라는 뜻인데 여기서는 함수를 감싼다고 해서 이런 이름을 붙였습니다. 다른 이름을 사용해도 상관없습니다).

```python
# 호출할 함수를 감싸는 함수
def wrapper():
```

이제 wrapper 함수에서는 함수의 시작을 알리는 문자열을 출력하고, trace에서 매개변수로 받은 func를 호출합니다. 그다음에 함수의 끝을 알리는 문자열을 출력합니다. 여기서 매개변수로 받은 함수의 원래 이름을 출력할 때는 __name__ 속성을 활용합니다. 마지막으로 wrapper 함수를 다 만들었으면 return을 사용하여 wrapper 함수 자체를 반환합니다.

```python
def trace(func):                             # 호출할 함수를 매개변수로 받음
    def wrapper():                           # 호출할 함수를 감싸는 함수
        print(func.__name__, '함수 시작')    # __name__으로 함수 이름 출력
        func()                               # 매개변수로 받은 함수를 호출
        print(func.__name__, '함수 끝')
    return wrapper                           # wrapper 함수 반환
```

즉, 함수 안에서 함수를 만들고 반환하는 [[Python Closure|클로저]] 입니다.

데코레이터를 사용할 때는 trace에 호출할 함수 hello 또는 world를 넣습니다. 그다음에 데코레이터에서 반환된 함수를 호출합니다. 이렇게 하면 데코레이터에 인수로 넣은 함수를 호출하고 시작과 끝을 출력합니다.

```python
trace_hello = trace(hello)    # 데코레이터에 호출할 함수를 넣음
trace_hello()                 # 반환된 함수를 호출
trace_world = trace(world)    # 데코레이터에 호출할 함수를 넣음
trace_world()                 # 반환된 함수를 호출
```

물론 trace에 다른 함수를 넣은 뒤 반환된 함수를 호출하면 해당 함수의 시작과 끝을 출력할 수 있습니다.

### @로 데코레이터 사용하기

이제 @을 사용하여 좀 더 간편하게 데코레이터를 사용해보겠습니다. 다음과 같이 호출할 함수 위에 **@****데코레이터** 형식으로 지정합니다.

```python
@데코레이터
def 함수이름():
    코드
```

```python
# decorator_closure_at_sign.py
def trace(func):                             # 호출할 함수를 매개변수로 받음
    def wrapper():
        print(func.__name__, '함수 시작')    # __name__으로 함수 이름 출력
        func()                               # 매개변수로 받은 함수를 호출
        print(func.__name__, '함수 끝')
    return wrapper                           # wrapper 함수 반환
 
@trace    # @데코레이터
def hello():
    print('hello')
 
@trace    # @데코레이터
def world():
    print('world')
 
hello()    # 함수를 그대로 호출
world()    # 함수를 그대로 호출
```

```python
# 실행 결과
hello 함수 시작
hello
hello 함수 끝
world 함수 시작
world
world 함수 끝
```

hello와 world 함수 위에 @trace를 붙인 뒤에 hello와 world 함수를 그대로 호출하면 끝입니다.

```python 
@trace    # @데코레이터
def hello():
    print('hello')
 
@trace    # @데코레이터
def world():
    print('world')
 
hello()    # 함수를 그대로 호출
world()    # 함수를 그대로 호출
```

물론 다른 함수 위에 @trace를 붙인 뒤 함수를 호출하면 해당 함수의 시작과 끝을 출력할 수 있습니다.

이 데코레이터를 그림으로 표현하면 다음과 같은 모양이 됩니다.

▼ **그림 데코레이터

![](https://dojang.io/pluginfile.php/14011/mod_page/content/3/042001.png)

이렇게 데코레이터는 함수를 감싸는 형태로 구성되어 있습니다. 따라서 데코레이터는 기존 함수를 수정하지 않으면서 추가 기능을 구현할 때 사용합니다.

> [!INFO]+ 참고 | 데코레이터를 여러 개 지정하기
> 
> 함수에는 데코레이터를 여러 개 지정할 수 있습니다. 다음과 같이 함수 위에 데코레이터를 여러 줄로 지정해줍니다. 이때 데코레이터가 실행되는 순서는 위에서 아래 순입니다.
> 
> ```python
> @데코레이터1
> @데코레이터2
> def 함수이름():
>     코드
> ```
> 
> ```python
> # multiple_decorators.py
> def decorator1(func):
>     def wrapper():
>         print('decorator1')
>         func()
>     return wrapper
>  
> def decorator2(func):
>     def wrapper():
>         print('decorator2')
>         func()
>     return wrapper
> ```
>  
> # 데코레이터를 여러 개 지정
> ```python
> @decorator1
> @decorator2
> def hello():
>     print('hello')
>  
> hello()
> ```
> 
> ```python
> # 실행 결과
> decorator1
> decorator2
> hello
> ```
> 
> @을 사용하지 않았을 때는 다음 코드와 동작이 같습니다.
> ```python
> decorated_hello = decorator1(decorator2(hello))
> decorated_hello()
> ```