---
title: Python2. 자주 사용하는 내장함수
date: 2024-08-04
draft: false
tags:
  - Python
complete: true
---
https://docs.python.org/3/py-modindex.html

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