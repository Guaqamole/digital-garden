---
title: Python2. 자주 사용하는 내장함수
date: 2024-08-04
draft: false
tags:
  - Python
complete: true
link: https://technote.luminance.kr/entry/PythonBuiltinBasic
---
https://docs.python.org/3/py-modindex.html

## Built-in 파헤치기
Python에서는 모든것이 object이다. 그리고 모두 **object** class를 상속받아 정의되어 있다.

**object** class의 instance인 object는 모두 __ (underscore 2개) 로 둘러쌓인 __bultins__ 를 물려받게 된다. __builtins__ 와 object는 모두 
**__builtin__** 에 정의되어 있다. 이 모듈은 파이썬이 시작되면서 항상 로드되는 파이썬의 가장 밑바닥의 초석이다. 파이썬이 실행되면 마치 

```python
from __builtin__ import *
import __builtin__ as __builtins__ 
```

를 수행한것과 같은 상태라고 생각하면 쉽지만… 이해를 돕기위해 예시를 든것일뿐 정확히 그렇게 동작하진 않는다.
(꼭 같지는 않다. python 기본 실행 상태에서 **__main__** 이라는 이름을 가지는 메인스레드에서 **__builtin__** 의 모든 name을 디렉토리에 갖고 있지는 않다. dir()로 확인해보시길..)

Dunder Method가 Python `__builtin__` 의 모든것은 아니다. C/C++ 과 같은 언어에서 빌트인 데이터 타입이라고 말하는 `int` , `float` 등등이 Python 에서는 모두 object 로 다루어지기 때문에 이런 유용한 데이터 타입역시 `__builtin__` 에서 정의하고 있다.

## 알아두면 유용한 Dunder Method
`__repr__()`이 정의되어 있는 class의 instance는 repr() 함수의 인자로 줄수 있다. 마찬가지로, __add__()가 정의되어 있는 class의 instance는 + 연산자의 좌측(L-value)로 사용할 수 있다.  

`repr()` 과  `__repr__()` 은 다른 함수이다. 이문서에서의 `repr(x) == x.__repr__()` 와 같은 표기는 이 절의 나머지 함수들에도 똑같이 적용되며 굳이 매번 설명을 달지는 않았다. 일반적으로 같은 결과가 리턴되는것 뿐이다. 

`repr()`함수는 `__builtin__`에 정의된 함수이며 object class의 함수이다. 이 함수는 내부적으로 인자로 받은 object의 `__repr__()`를 호출하여 받은 결과를 그대로 리턴한다. 이 역시 나머지 함수들의 설명에도 똑같이 적용되는 원리이다. 

이를테면 `int(x) == x.__int__()`인 것은 `int(x)가 x.__int__()` 를 호출한 결과를 리턴한다는 표현을 한 것이다. 하지만 `int(x)`는 바로 `x.__int__()` 를 호출하여 이를 리턴하기만 하는 것은 아니므로 각 builtin에 대해서는 별도의 문서를 참고해야 한다. shell에서 pydoc `__builtins__` 또는 python interactive mode에서 `help(__builtins__)` 를 보면 된다.
    

### 표현, 타입캐스팅, 변환
#### `__init__()`: class의 constructor(생성자)

#### `__repr__()`: representation 함수  
- `repr(x) == x.__repr__()`
- Python interactive mode의 프롬프트에서 아무 object나 하나 입력해 보자. 이때 엔터키 누른 직후에 나오는 것이 바로 그 object의 `__repr__()` 값이다.
- 많은 builtin data type은 그 내용이 분명하고 간단하기 때문에 `__str__()` 과 같은 결과를 리턴한다. 즉, **문자열화**한다. 이 경우에 `__str__()` 과의 차이점은 object를 문자열로 표현하긴 하되, quoatation하지 않는다는 것이다. `__repr__()` 을 명시적으로 부르면 quoatation한다.
- 보다 복잡한 object (어떤 class로부터 생성한 instance)의 경우에는 **<type과 object의 address>** 의 형태로 보여준다. 이는 `__repr__()` 이 정의 되지 않았을 경우에 파이썬의 기본행동이다.

#### `__str__()`: 문자열 변환 함수  
`str(x) == x.__str__()`
str변환이 일어나는 가장 대표적인 경우는 "%s" 로 문자열을 만들 때이다.
    
#### `__int__()`
- int(x) == x.__int__()
- 정수형으로 캐스팅을 시도한다.
- 모든 class에 이 함수가 정의되어 있지는 않다. 상식적으로 정수로 캐스팅 될것 같지 않은 경우에는 (int로의 캐스팅이라는 기본행동이 정의되지 않는 클래스들) __int__()가 없기 때문에 int(x)를 시도하면 AttributeError라 발생한다.
    
#### `__long__()`
- `long(x) == x.__long__()`
- `__int__()` 와 매우 유사.
    
#### `__float__():  `
- `float(x) == x.__float__()`
    
#### `__hash__():  `
- `hash(x) == x.__hash__()`
    
#### `__getitem__(i)`
- list, tuple, basestring과 같은 순서가 있는 컬렉션 객체에 대해 특정 원소를 접근하는 방법을 제공한다.
- `[]`연산자 오버로딩에 해당한다. 즉, x[3] == x.__getitem__(3) 이다.
    
`__getslice__(i, j)`
- `__getitem__()`과 같이 순서가 있는 컬렉션 객체에 대해 특정 구간의 원소를 접근하는 방법을 제공한다.
- 특정구간의 원소집합을 slice라 한다.
- `x[3:5] == x.__getslice__(3,5)` 는 3 <= index < 5를 만족하는 원소구간을 리턴한다.

### 산술연산자
- 특정한 목적에 의해 설계된 class instance끼리의 사칙연산을 정의할 수 있다.
- 연산자 오버로딩으로 생각하면 된다.
- binary operators:  `__add__(), __sub__(), __mul__(), __div__(), __divmod__()`
    - `x + y == x.__add__(y)`
    - `x - y == x.__sub__(y)`
    - `x * y == x.__mul__(y)`
    - `x / y == x.__div__(y)`
    - `x % y == x.__divmod__(y)`
    
- unary operators; __neg__(), __pos__():  
    - -x == x.__neg__()
    - +x == x.__pos__()

## 알아두면 유용한 내장 함수
### dir()
객체가 가진 변수나 메서드를 모두 속성이라고 부른다. 객체의 속성은 obj.x 와 같이 점(.) 으로 연결해 참조할 수 있다.
여기서 `dir()` 은 인수로 전달한 객체 속성 목록을 리스트로 변환하는 내장함수이다.
```python
s = "hello world"
dir(s)

['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__'...' 'upper', 'zfill']

print(type(s.upper))
>> <class 'builtin_function_or_method'> # python callable

print(s.upper())
>> HELLO WORLD
```

### help()
특정 메서드의 인수와 그 반환값을 확인할 때는 help()에 해당 메서드를 직접 전달하면 편리하다.
```python
import json
dir(json)
>> ['JSONDecodeError', 'JSONDecoder', 'JSONEncoder', '__all__', '__author__', '__builtins__', '__cached__', '__doc__'... 'load', 'loads', 'scanner']

help(json.loads)
>> Help on function loads in module json: loads(s, *, cls=None, object_hook=None, parse_float=None, parse_int=None, parse_constant=None, object_pairs_hook=None, **kw) Deserialize ``s`` (a ``str``, ``bytes`` or ``bytearray`` instance containing a JSON document) to a Python object.
```


### docstring
```python
def increment(n):
    """function that returns n + 1.
    
    :param n: number
    :return: n + 1
    """
    return n + 1

help(increment)
>> increment(n) function that returns n + 1. :param n: number :return: n + 1
```



## 이 외에도.. 내장 모듈은 정말 많다.
https://docs.python.org/3/library/index.html 아니면 [[Python Standard Library]] 를 참고하자.

- [Built-in Functions](https://docs.python.org/3/library/functions.html)
- [Built-in Constants](https://docs.python.org/3/library/constants.html)
- [Built-in Types](https://docs.python.org/3/library/stdtypes.html)
- [Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)
- 👍[Text Processing Services](https://docs.python.org/3/library/text.html)
- [Binary Data Services](https://docs.python.org/3/library/binary.html)
- 👍[Data Types](https://docs.python.org/3/library/datatypes.html)
- [Numeric and Mathematical Modules](https://docs.python.org/3/library/numeric.html)
- [Functional Programming Modules](https://docs.python.org/3/library/functional.html)
- [File and Directory Access](https://docs.python.org/3/library/filesys.html)
- [Data Persistence](https://docs.python.org/3/library/persistence.html)
- [Data Compression and Archiving](https://docs.python.org/3/library/archiving.html)
- [File Formats](https://docs.python.org/3/library/fileformats.html)
- [Cryptographic Services](https://docs.python.org/3/library/crypto.html)
- [Generic Operating System Services](https://docs.python.org/3/library/allos.html)
- 👍[Concurrent Execution](https://docs.python.org/3/library/concurrency.html)
- [Networking and Interprocess Communication](https://docs.python.org/3/library/ipc.html)
- [Internet Data Handling](https://docs.python.org/3/library/netdata.html)
- [Structured Markup Processing Tools](https://docs.python.org/3/library/markup.html)
- [Internet Protocols and Support](https://docs.python.org/3/library/internet.html)
- [Internationalization](https://docs.python.org/3/library/i18n.html)
- [Program Frameworks](https://docs.python.org/3/library/frameworks.html)
- [Graphical User Interfaces with Tk](https://docs.python.org/3/library/tk.html)
- 👍 [Development Tools](https://docs.python.org/3/library/development.html)
- [Debugging and Profiling](https://docs.python.org/3/library/debug.html)
- [Software Packaging and Distribution](https://docs.python.org/3/library/distribution.html)
- 👍[Python Runtime Services](https://docs.python.org/3/library/python.html)
- [Importing Modules](https://docs.python.org/3/library/modules.html)
- [Python Language Services](https://docs.python.org/3/library/language.html)
- [Unix Specific Services](https://docs.python.org/3/library/unix.html)
- [Superseded Modules](https://docs.python.org/3/library/superseded.html)