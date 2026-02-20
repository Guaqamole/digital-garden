---
title: Python3. 네임스페이스와 매직메소드
date: 2024-08-04
draft: false
tags:
  - Python
complete: true
link: https://wikidocs.net/book/4170
---
<< [[Python2. 자주 사용하는 내장함수|Prev]] | [[Python4. 제어 흐름|Next]] | >>

# 네임스페이스

네임스페이스(namespace, 이름공간)란 프로그래밍 언어에서 특정한 객체(Object)를 이름(Name)에 따라 구분할 수 있는 범위를 의미한다. 파이썬 내부의 모든것은 객체로 구성되며 이들 각각은 특정 이름과의 매핑 관계를 갖게 되는데 이 매핑을 포함하고 있는 공간을 네임스페이스라고 한다.

프로그래밍언어에서는 네임스페이스라는 개념을 도입하여, **특정한 하나의 이름이 통용될 수 있는 범위를 제한**한다. 따라서 소속된 네임스페이스가 다르다면 같은 이름이 다른 객체를 가리키도록 하는 것이 가능해진다.

## 파이썬의 네임스페이스와 변수 스코프
![|650](https://i.imgur.com/A6uaOOJ.png)

파이선의 네임스페이스는 크게 세 가지로 분류된다.

1. Global (전역) Namespace : 모듈별로 존재하며, 모듈 전체에 통용되는 이름을 사용한다.
2. Local (지역) Namespace : 함수 및 메소드 별로 존재하며, 함수 내의 지역 변수들이 소속된다.
3. Built-in (빌트인) Namespace : 기본 내장 함수 및 기본 예외들의 이름을 저장하는 곳

### 네임스페이스 구현
파이썬의 네임스페이스는 실제로 파이썬 사전으로 구현된다. 모든 이름 자체는 문자열로 되어 있고, 각 이름은 해당 범위에서의 실제 객체를 가리킨다. 이름과 실제 객체 사이의 맵핑은 가변적(mutable)이며 새로운 이름이 실행시간에 추가되거나 삭제될 수도 있다.

### 변수의 스코프
변수의 스코프란 변수의 이름으로 그 변수가 가리키는 엔티티를 찾을 수 있는 영역의 범위를 말한다. 이는 현재 위치에서 액세스할 수 있는 네임스페이스들(복수가된다.)과 그 순서에 의해 결정된다. C나 자바스크립트 같은 언어는 블럭 단위의 스코프를 사용한다. 따라서 보통 중괄호({ … })내에서 선언된 변수는 해당 블럭 내에서 통용되며, 블럭을 빠져나가는 경우에는 폐기된다.

#### 파이썬의 스코프
파이썬에서의 블럭은 다른 언어와 달리 조금 특별한데, 파이썬의 블럭은 “특별한 기능 단위의 경계”를 표시하기 보다는 “프로그램 수행 흐름의 분기점”에 그대로 일치하기 때문이다. (이 때문인지는 알 수 없지만) **파이썬에서는 블럭단위의 스코프는 존재하지 않는다. 파이썬에서 변수는 그저 지역 변수와 전역 변수만이 존재할 뿐이다.**

#### 전역이름
전역 이름은 모듈의 최상위에서 선언한 이름이다. 현재 모듈의 최상위에 어떤 이름들이 등록되어 있는지는 `globals()`라는 함수를 호출하여 전역 이름 공간의 사본을 얻을 수 있다. 주의할 것은 이 때 얻어지는 것은 복사된 사본이므로 이 결과값에 새로운 키-값 쌍을 추가한다고 해서 해당 이름을 액세스하게 되는 것이 아님을 알아두자.

```python
greet = 'hello'
globals()

# {'__name__': '__main__', ..... 
#  '__builtins__' : <module 'builtins' (built-in)>, 'greet': 'hello'}
```

위에서 보듯이 `greet = 'hello'`라고 새로운 객체를 생성하고 나면 그 이름이 `globals()`의 결과에 포함되어 있는 것을 알 수 있다.

#### 지역이름
지역 이름 공간은 함수나 메소드 단위로 생성되며, 함수에 진입하는 시점에 만들어진다. 로컬 이름 공간의 내용을 알고 싶다면 `locals()` 함수를 호출하면 된다. 다음 예에서는 간단한 함수를 하나 생성하고, 함수 내에서 지역 이름 공간의 내용을 출력한다.
```python
def double(n):
    m =  n + n
    print(locals())
    return m

print(double(4))
# {'m' : 8, 'n' : 4 }
# 8
```

## 예시
```python
name="Python"
print("id of name:",id(name))
print("id of Python:",id("Python"))

name ="PythonGeeks"
print("id of name:",id(name))
print("id of PythonGeeks:",id("PythonGeeks"))

text="Python"
print("id of text:",id(text))
print("id of Python:",id("Python"))

id of name: 2786126438960
id of Python: 2786126438960

id of name: 2786161874800
id of PythonGeeks: 2786161874800

id of text: 2786126438960
id of Python: 2786126438960
```

![](https://i.imgur.com/cfgxJmg.png)


```python
var = "varaible"

def hi():
    friend = "john"
    print("inside:",list(locals().keys()))
    print("inside:",list(globals().keys()))
    return "hi" + friend

hi()
print("outside:", list(locals().keys()))
print("outside:", list(globals().keys()))


inside: ['friend']
inside: ['__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', '__file__', '__cached__', 'var', 'hi']
outside: ['__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', '__file__', '__cached__', 'var', 'hi']
outside: ['__name__', '__doc__', '__package__', '__loader__', '__spec__', '__annotations__', '__builtins__', '__file__', '__cached__', 'var', 'hi']
```



## if __name__ == ‘__main__‘:의 의미
파이썬은 다양한 정보를 담고있는 내장변수가 존재한다.

`__name__ `은 현재 모듈의 이름을 담고있는 내장 변수이다. 이 변수는 직접 실행된 모듈의 경우 __main__이라는 값을 가지게 되며, 직접 실행되지 않은 import된 모듈은 모듈의 이름(파일명)을 가지게 된다.

test2.py
```python
def hello():
    print("Hello!")

# 보안성이 약한 private 의미로 사용
def _hello():
    print("Hello!")

print("not main", __name__)


if __name__ == '__main__':
    print("FROM TEST MAIN: ", __name__)
```

main.py
```python
print("main!!", __name__)

from test2 import *

if __name__ == '__main__':
    hello()
    _hello()
```

```python
main!! __main__
not main test2
Hello!
Traceback (most recent call last):
  File "main.py", line 7, in <module>
    _hello()
NameError: name '_hello' is not defined
```

내장 변수 `__name__`은 현재 모듈의 전역 네임스페이스의 이름을 담고있는 내장 변수이다. 이것은 `globals()["__name__"]`과 같은 표현이다.

즉, 맨 처음 질문의 `if __name__ == '__main__':`을 해석하면 다음과 같다. 

현재 모듈의 네임스페이스가 `__main__`에 해당한다면, 
즉 현재 모듈이 `커맨드 라인 상에서 직접 실행되는 경우`에만 `if`문 이하를 실행하라는 의미이다.



# 매직메소드 & 스페셜 어트리뷰트
클래스 안에 정의된 함수를 우리는 특별히 '메소드(method)'라고 부릅니다. 메소드 중에서 `__`로 시작해서 `__`로 끝나는 메소드들이 있는데 이를 매직 메소드 또는 던더 메소드(double underscore method)라고 부릅니다.

가장 유명한 매직 메소드에는 `__init__`이라는 생성자가 있습니다. 생성자는 어떤 클래스의 인스턴스(객체)가 생성될 때 파이썬 인터프리터에 의해 자동으로 호출되는 메소드였습니다. 이처럼 파이썬의 매직 메소드는 특별한 기능을 제공합니다.

callable 객체가 아닌것들은 스페셜 어트리뷰트라고 부릅니다.
## The List
```python
import inspect

def get_magic_methods(cls):
    magic_methods = []
    special_attributes = []
    
    for attr in dir(cls):
        if attr.startswith('__') and attr.endswith('__'):
            if callable(getattr(cls, attr)):
                magic_methods.append(attr)
            else:
                special_attributes.append(attr)
    
    return magic_methods, special_attributes

magic_methods, special_attributes = get_magic_methods(ValueError)

print("Magic Methods:")
print(magic_methods)
print("\nSpecial Attributes:")
print(special_attributes)
```

Magic Methods
```python
['__delattr__', '__dir__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__setstate__', '__sizeof__', '__str__', '__subclasshook__']
```

Special Attributes
```python
['__class__', '__cause__', '__context__', '__dict__', '__doc__', '__suppress_context__', '__traceback__']
```

## Special Attributes
### _\__class_\__
해당 인스턴스의 클래스가 무엇인지 알려주는 스페셜 어트리뷰트.

```python
print(ValueError.__class__)
>> <class 'type'> 
```

> [!info] Python Metaclass
> type 은 파이썬의 메타클래스이다.
> https://realpython.com/python-metaclasses/#:%7E:text=type%20is%20a%20metaclass%2C%20of,instance%20of%20the%20type%20metaclass.&text=type%20is%20also%20an%20instance,is%20an%20instance%20of%20itself.

더 궁금하면 `builtins.pyi` (Cpython 구현체) 를 확인해보자.

### _\__name_\__
위 내용 참고,


## Dunder Methods (Double Underscore Methods)

### _\__call_\__
더블 언더스코어(\_\__)로 시작하는 매직메소드를 통해 클래스가 특별한 동작을 수행할 수 있도록 만들 수 있다. 함수를 호출하는 것처럼 클래스의 객체도 호출할 수 있게 만들수 있는데 이때 필요한 매직메소드가 __call__이다.

### \_\_getitem\_\_

두개의 밑줄로 시작하는 파이썬의 특별 메소드 중 하나이다. 슬라이싱을 구현할 수 있도록 도우며 리스트에서 슬라이싱을 하게되면 내부적으로 \_\_getitem__ 메소드를 실행한다는 점이 중요하다. 따라서 객체에서도 슬라이싱을 하기 위해서는 \__getitem__ 메소드가 필수적이다.

인스턴스 변수에 직접 접근하지 말고 객체 자체를 통해서 슬라이싱을 구현하기 위해서는 getitem 특별 메소드를 정의해야한다. 그리고 이 함수는 인덱스를 인수로 받아야 한다.


### \__del__ 메서드 (소멸자)

__init__ 메서드와 반대로 객체가 없어질 때 호출되는 메서드도 있습니다. 이런 것을 소멸자(destructor)라고 하는데, 파이썬에서는 __del__ 메서드가 소멸자의 역할을 맡고 있죠.


### \__repr__ 메서드 (프린팅)

별 다른 것은 없습니다, return 문을 사용했다는 것만 눈여겨보시면 됩니다. **__repr__** 메서드는 '문자열'을 'return' 한다고 생각하시면 되겠죠?


### \__add__ 메서드 (덧셈)
도형 a와 b를 덧셈 연산자(+)로 더했더니 두 도형의 넓이가 더해졌죠? 마치 보통의 두 숫자를 더하는 것처럼 간단하게 말입니다. 이와 같이 특별한 메서드를 사용해서 연산자가 하는 일을 정의하는 것을 연산자 중복(overload)이라고 부른답니다. 연산자 중복을 이용하면 사용자가 직접 만든 클래스의 객체에 대해서도 연산자를 쓸 수 있게 되지요. 마치 파이썬 자체에서 제공하는 자료형처럼 말입니다.**

### \__cmp__ 메서드 (비교)

두 개의 객체를 비교하는 비교 연산자(<, >, ==)를 쓸 수 있도록 해주는 메서드를 살펴보면서 정리를 하도록 하겠습니다.