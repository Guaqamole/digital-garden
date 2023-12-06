---
title: Python Glossary
date: 2023-10-17
draft: false
tags:
  - Python
link: https://docs.python.org/ko/3/glossary.html
complete: true
---
## 2to3

파이썬 2.x 코드를 파이썬 3.x 코드로 변환하려고 시도하는 도구인데, 소스를 구문 분석하고 구문 분석 트리를 탐색해서 감지할 수 있는 대부분의 비호환성을 다룹니다.

2to3 는 표준 라이브러리에서 [`lib2to3`](https://docs.python.org/ko/3/library/2to3.html#module-lib2to3 "lib2to3: The 2to3 library") 로 제공됩니다; 독립적으로 실행할 수 있는 스크립트는 `Tools/scripts/2to3` 로 제공됩니다. [2to3 — Automated Python 2 to 3 code translation](https://docs.python.org/ko/3/library/2to3.html#to3-reference)을 보세요.


## abstract base class (추상 베이스 클래스)[]

추상 베이스 클래스는 [`hasattr()`](https://docs.python.org/ko/3/library/functions.html#hasattr "hasattr") 같은 다른 테크닉들이 불편하거나 미묘하게 잘못된 (예를 들어, [매직 메서드](https://docs.python.org/ko/3/reference/datamodel.html#special-lookup)) 경우, 인터페이스를 정의하는 방법을 제공함으로써 [덕 타이핑](https://docs.python.org/ko/3/glossary.html#term-duck-typing) 을 보완합니다. ABC는 가상 서브 클래스를 도입하는데, 클래스를 계승하지 않으면서도 [`isinstance()`](https://docs.python.org/ko/3/library/functions.html#isinstance "isinstance") 와 [`issubclass()`](https://docs.python.org/ko/3/library/functions.html#issubclass "issubclass") 에 의해 감지될 수 있는 클래스들입니다; [`abc`](https://docs.python.org/ko/3/library/abc.html#module-abc "abc: Abstract base classes according to :pep:`3119`.") 모듈 설명서를 보세요. 파이썬에는 많은 내장 ABC 들이 따라오는데 다음과 같은 것들이 있습니다: 자료 구조 ([`collections.abc`](https://docs.python.org/ko/3/library/collections.abc.html#module-collections.abc "collections.abc: Abstract base classes for containers") 모듈에서), 숫자 ([`numbers`](https://docs.python.org/ko/3/library/numbers.html#module-numbers "numbers: Numeric abstract base classes (Complex, Real, Integral, etc.).") 모듈에서), 스트림 ([`io`](https://docs.python.org/ko/3/library/io.html#module-io "io: Core tools for working with streams.") 모듈에서), 임포트 파인더와 로더 ([`importlib.abc`](https://docs.python.org/ko/3/library/importlib.html#module-importlib.abc "importlib.abc: Abstract base classes related to import") 모듈에서). [`abc`](https://docs.python.org/ko/3/library/abc.html#module-abc "abc: Abstract base classes according to :pep:`3119`.") 모듈을 사용해서 자신만의 ABC를 만들 수도 있습니다.

## annotation (어노테이션)

관습에 따라 [형 힌트](https://docs.python.org/ko/3/glossary.html#term-type-hint) 로 사용되는 변수, 클래스 어트리뷰트 또는 함수 매개변수 나 반환 값과 연결된 레이블입니다.

지역 변수의 어노테이션은 실행 시간에 액세스할 수 없지만, 전역 변수, 클래스 속성 및 함수의 어노테이션은 각각 모듈, 클래스, 함수의 `__annotations__` 특수 어트리뷰트에 저장됩니다.

See [variable annotation](https://docs.python.org/ko/3/glossary.html#term-variable-annotation), [function annotation](https://docs.python.org/ko/3/glossary.html#term-function-annotation), [**PEP 484**](https://peps.python.org/pep-0484/) and [**PEP 526**](https://peps.python.org/pep-0526/), which describe this functionality. Also see [Annotations Best Practices](https://docs.python.org/ko/3/howto/annotations.html#annotations-howto) for best practices on working with annotations.


## argument (인자)

함수를 호출할 때 [함수](https://docs.python.org/ko/3/glossary.html#term-function) (또는 [메서드](https://docs.python.org/ko/3/glossary.html#term-method)) 로 전달되는 값. 두 종류의 인자가 있습니다:

- _키워드 인자 (keyword argument)_: 함수 호출 때 식별자가 앞에 붙은 인자 (예를 들어, `name=`) 또는 `**` 를 앞에 붙인 딕셔너리로 전달되는 인자. 예를 들어, 다음과 같은 [`complex()`](https://docs.python.org/ko/3/library/functions.html#complex "complex") 호출에서 `3` 과 `5` 는 모두 키워드 인자입니다:
    
    complex(real=3, imag=5)
    complex(**{'real': 3, 'imag': 5})
    
- _위치 인자 (positional argument)_: 키워드 인자가 아닌 인자. 위치 인자들은 인자 목록의 처음에 나오거나 [이터러블](https://docs.python.org/ko/3/glossary.html#term-iterable) 의 앞에 `*` 를 붙여 전달할 수 있습니다. 예를 들어, 다음과 같은 호출에서 `3` 과 `5` 는 모두 위치 인자입니다.
    
    complex(3, 5)
    complex(*(3, 5))
    

인자는 함수 바디의 이름 붙은 지역 변수에 대입됩니다. 이 대입에 적용되는 규칙들에 대해서는 [호출](https://docs.python.org/ko/3/reference/expressions.html#calls) 절을 보세요. 문법적으로, 어떤 표현식이건 인자로 사용될 수 있습니다; 구해진 값이 지역 변수에 대입됩니다.

용어집의 [매개변수](https://docs.python.org/ko/3/glossary.html#term-parameter) 항목과 FAQ 질문 [인자와 매개변수의 차이](https://docs.python.org/ko/3/faq/programming.html#faq-argument-vs-parameter) 와 [**PEP 362**](https://peps.python.org/pep-0362/)도 보세요.


## asynchronous context manager (비동기 컨텍스트 관리자)

An object which controls the environment seen in an [`async with`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-with) statement by defining [`__aenter__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__aenter__ "object.__aenter__") and [`__aexit__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__aexit__ "object.__aexit__") methods. Introduced by [**PEP 492**](https://peps.python.org/pep-0492/).



## asynchronous generator (비동기 제너레이터)

[비동기 제너레이터 이터레이터](https://docs.python.org/ko/3/glossary.html#term-asynchronous-generator-iterator) 를 돌려주는 함수. [`async def`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-def) 로 정의되는 코루틴 함수처럼 보이는데, [`async for`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-for) 루프가 사용할 수 있는 일련의 값들을 만드는 [`yield`](https://docs.python.org/ko/3/reference/simple_stmts.html#yield) 표현식을 포함한다는 점이 다릅니다.

보통 비동기 제너레이터 함수를 가리키지만, 어떤 문맥에서는 _비동기 제너레이터 이터레이터_ 를 가리킵니다. 의도하는 의미가 명확하지 않은 경우는, 완전한 용어를 써서 모호함을 없앱니다.

비동기 제너레이터 함수는 [`await`](https://docs.python.org/ko/3/reference/expressions.html#await) 표현식과, [`async for`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-for) 문과, [`async with`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-with) 문을 포함할 수 있습니다.


## asynchronous generator iterator (비동기 제너레이터 이터레이터)

[비동기 제너레이터](https://docs.python.org/ko/3/glossary.html#term-asynchronous-generator) 함수가 만드는 객체.

This is an [asynchronous iterator](https://docs.python.org/ko/3/glossary.html#term-asynchronous-iterator) which when called using the [`__anext__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__anext__ "object.__anext__") method returns an awaitable object which will execute the body of the asynchronous generator function until the next [`yield`](https://docs.python.org/ko/3/reference/simple_stmts.html#yield) expression.

Each [`yield`](https://docs.python.org/ko/3/reference/simple_stmts.html#yield) temporarily suspends processing, remembering the location execution state (including local variables and pending try-statements). When the _asynchronous generator iterator_ effectively resumes with another awaitable returned by [`__anext__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__anext__ "object.__anext__"), it picks up where it left off. See [**PEP 492**](https://peps.python.org/pep-0492/) and [**PEP 525**](https://peps.python.org/pep-0525/).


## asynchronous iterable (비동기 이터러블)

An object, that can be used in an [`async for`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-for) statement. Must return an [asynchronous iterator](https://docs.python.org/ko/3/glossary.html#term-asynchronous-iterator) from its [`__aiter__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__aiter__ "object.__aiter__") method. Introduced by [**PEP 492**](https://peps.python.org/pep-0492/).



## asynchronous iterator (비동기 이터레이터)

An object that implements the [`__aiter__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__aiter__ "object.__aiter__") and [`__anext__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__anext__ "object.__anext__") methods. [`__anext__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__anext__ "object.__anext__") must return an [awaitable](https://docs.python.org/ko/3/glossary.html#term-awaitable) object. [`async for`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-for) resolves the awaitables returned by an asynchronous iterator’s [`__anext__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__anext__ "object.__anext__") method until it raises a [`StopAsyncIteration`](https://docs.python.org/ko/3/library/exceptions.html#StopAsyncIteration "StopAsyncIteration") exception. Introduced by [**PEP 492**](https://peps.python.org/pep-0492/).



## attribute (어트리뷰트)

A value associated with an object which is usually referenced by name using dotted expressions. For example, if an object _o_ has an attribute _a_ it would be referenced as _o.a_.

It is possible to give an object an attribute whose name is not an identifier as defined by [식별자와 키워드](https://docs.python.org/ko/3/reference/lexical_analysis.html#identifiers), for example using [`setattr()`](https://docs.python.org/ko/3/library/functions.html#setattr "setattr"), if the object allows it. Such an attribute will not be accessible using a dotted expression, and would instead need to be retrieved with [`getattr()`](https://docs.python.org/ko/3/library/functions.html#getattr "getattr").



## awaitable (어웨이터블)

An object that can be used in an [`await`](https://docs.python.org/ko/3/reference/expressions.html#await) expression. Can be a [coroutine](https://docs.python.org/ko/3/glossary.html#term-coroutine) or an object with an [`__await__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__await__ "object.__await__") method. See also [**PEP 492**](https://peps.python.org/pep-0492/).


## BDFL

자비로운 종신 독재자 (Benevolent Dictator For Life), 즉 [Guido van Rossum](https://gvanrossum.github.io/), 파이썬의 창시자.



## binary file (바이너리 파일)

[바이트열류 객체들](https://docs.python.org/ko/3/glossary.html#term-bytes-like-object)을 읽고 쓸 수 있는 [파일 객체](https://docs.python.org/ko/3/glossary.html#term-file-object). 바이너리 파일의 예로는 바이너리 모드 (`'rb'`, `'wb'` 또는 `'rb+'`) 로 열린 파일, `sys.stdin.buffer`, `sys.stdout.buffer`, [`io.BytesIO`](https://docs.python.org/ko/3/library/io.html#io.BytesIO "io.BytesIO") 와 [`gzip.GzipFile`](https://docs.python.org/ko/3/library/gzip.html#gzip.GzipFile "gzip.GzipFile") 의 인스턴스를 들 수 있습니다.

[`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str") 객체를 읽고 쓸 수 있는 파일 객체에 대해서는 [텍스트 파일](https://docs.python.org/ko/3/glossary.html#term-text-file) 도 참조하세요.


## borrowed reference

In Python’s C API, a borrowed reference is a reference to an object, where the code using the object does not own the reference. It becomes a dangling pointer if the object is destroyed. For example, a garbage collection can remove the last [strong reference](https://docs.python.org/ko/3/glossary.html#term-strong-reference) to the object and so destroy it.

Calling [`Py_INCREF()`](https://docs.python.org/ko/3/c-api/refcounting.html#c.Py_INCREF "Py_INCREF") on the [borrowed reference](https://docs.python.org/ko/3/glossary.html#term-borrowed-reference) is recommended to convert it to a [strong reference](https://docs.python.org/ko/3/glossary.html#term-strong-reference) in-place, except when the object cannot be destroyed before the last usage of the borrowed reference. The [`Py_NewRef()`](https://docs.python.org/ko/3/c-api/refcounting.html#c.Py_NewRef "Py_NewRef") function can be used to create a new [strong reference](https://docs.python.org/ko/3/glossary.html#term-strong-reference).


## bytes-like object (바이트열류 객체)

[버퍼 프로토콜](https://docs.python.org/ko/3/c-api/buffer.html#bufferobjects) 를 지원하고 C-[연속](https://docs.python.org/ko/3/glossary.html#term-contiguous) 버퍼를 익스포트 할 수 있습니다. 여러 공통 [`memoryview`](https://docs.python.org/ko/3/library/stdtypes.html#memoryview "memoryview") 객체들은 물론이고 [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes"), [`bytearray`](https://docs.python.org/ko/3/library/stdtypes.html#bytearray "bytearray"), [`array.array`](https://docs.python.org/ko/3/library/array.html#array.array "array.array") 객체들을 포함합니다. 바이트열류 객체들은 바이너리 데이터를 다루는 여러 가지 연산들에 사용될 수 있습니다; 압축, 바이너리 파일로 저장, 소켓을 통한 전송 같은 것들이 있습니다.

어떤 연산들은 바이너리 데이터가 가변적일 필요가 있습니다. 이런 경우에 설명서는 종종 “읽고-쓰기 바이트열류 객체”라고 표현합니다. 가변 버퍼 객체의 예로는 [`bytearray`](https://docs.python.org/ko/3/library/stdtypes.html#bytearray "bytearray") 와 [`bytearray`](https://docs.python.org/ko/3/library/stdtypes.html#bytearray "bytearray") 의 [`memoryview`](https://docs.python.org/ko/3/library/stdtypes.html#memoryview "memoryview") 가 있습니다. 다른 연산들은 바이너리 데이터가 불변 객체 (“읽기 전용 바이트열류 객체”)에 저장되도록 요구합니다; 이런 것들의 예로는 [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes")와 [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes") 객체의 [`memoryview`](https://docs.python.org/ko/3/library/stdtypes.html#memoryview "memoryview") 가 있습니다.


## bytecode (바이트 코드)

파이썬 소스 코드는 바이트 코드로 컴파일되는데, CPython 인터프리터에서 파이썬 프로그램의 내부 표현입니다. 바이트 코드는 `.pyc` 파일에 캐시 되어, 같은 파일을 두 번째 실행할 때 더 빨라지게 만듭니다 (소스에서 바이트 코드로의 재컴파일을 피할 수 있습니다). 이 “중간 언어” 는 각 바이트 코드에 대응하는 기계를 실행하는 [가상 기계](https://docs.python.org/ko/3/glossary.html#term-virtual-machine) 에서 실행된다고 말합니다. 바이트 코드는 서로 다른 파이썬 가상 기계에서 작동할 것으로 기대하지도, 파이썬 배포 간에 안정적이지도 않다는 것에 주의해야 합니다.

바이트 코드 명령어들의 목록은 [dis 모듈](https://docs.python.org/ko/3/library/dis.html#bytecodes) 설명서에 나옵니다.


## callable

A callable is an object that can be called, possibly with a set of arguments (see [argument](https://docs.python.org/ko/3/glossary.html#term-argument)), with the following syntax:
```python
callable(argument1, argument2, argumentN)
```

A [function](https://docs.python.org/ko/3/glossary.html#term-function), and by extension a [method](https://docs.python.org/ko/3/glossary.html#term-method), is a callable. An instance of a class that implements the [`__call__()`](https://docs.python.org/ko/3/reference/datamodel.html#object.__call__ "object.__call__") method is also a callable.


## callback (콜백)

인자로 전달되는 미래의 어느 시점에서 실행될 서브 루틴 함수.


## class (클래스)

사용자 정의 객체들을 만들기 위한 주형. 클래스 정의는 보통 클래스의 인스턴스를 대상으로 연산하는 메서드 정의들을 포함합니다.


## class variable (클래스 변수)

클래스에서 정의되고 클래스 수준 (즉, 클래스의 인스턴스에서가 아니라) 에서만 수정되는 변수.


## complex number (복소수)

익숙한 실수 시스템의 확장인데, 모든 숫자가 실수부와 허수부의 합으로 표현됩니다. 허수부는 실수에 허수 단위(`-1`의 제곱근)를 곱한 것인데, 종종 수학에서는 `i`로, 공학에서는 `j`로 표기합니다. 파이썬은 후자의 표기법을 쓰는 복소수를 기본 지원합니다; 허수부는 `j` 접미사를 붙여서 표기합니다, 예를 들어, `3+1j`. [`math`](https://docs.python.org/ko/3/library/math.html#module-math "math: Mathematical functions (sin() etc.).") 모듈의 복소수 버전이 필요하면, [`cmath`](https://docs.python.org/ko/3/library/cmath.html#module-cmath "cmath: Mathematical functions for complex numbers.")를 사용합니다. 복소수의 활용은 꽤 수준 높은 수학적 기능입니다. 필요하다고 느끼지 못한다면, 거의 확실히 무시해도 좋습니다.


## context manager (컨텍스트 관리자)

`__enter__()` 와 `__exit__()` 메서드를 정의함으로써 [`with`](https://docs.python.org/ko/3/reference/compound_stmts.html#with) 문에서 보이는 환경을 제어하는 객체. [**PEP 343**](https://peps.python.org/pep-0343/)으로 도입되었습니다.


## context variable (컨텍스트 변수)

컨텍스트에 따라 다른 값을 가질 수 있는 변수. 이는 각 실행 스레드가 변수에 대해 다른 값을 가질 수 있는 스레드-로컬 저장소와 비슷합니다. 그러나, 컨텍스트 변수를 통해, 하나의 실행 스레드에 여러 컨텍스트가 있을 수 있으며 컨텍스트 변수의 주 용도는 동시성 비동기 태스크에서 변수를 추적하는 것입니다. [`contextvars`](https://docs.python.org/ko/3/library/contextvars.html#module-contextvars "contextvars: Context Variables")를 참조하십시오.

## contiguous (연속)

버퍼는 정확히 _C-연속(C-contiguous)_이거나 _포트란 연속(Fortran contiguous)_일 때 연속이라고 여겨집니다. 영차원 버퍼는 C-연속이면서 포트란 연속입니다. 일차원 배열에서, 항목들은 서로에 인접하고, 0에서 시작하는 오름차순 인덱스의 순서대로 메모리에 배치되어야 합니다. 다차원 C-연속 배열에서, 메모리 주소의 순서대로 항목들을 방문할 때 마지막 인덱스가 가장 빨리 변합니다. 하지만, 포트란 연속 배열에서는, 첫 번째 인덱스가 가장 빨리 변합니다.



## coroutine (코루틴)

코루틴은 서브루틴의 더 일반화된 형태입니다. 서브루틴은 한 지점에서 진입하고 다른 지점에서 탈출합니다. 코루틴은 여러 다른 지점에서 진입하고, 탈출하고, 재개할 수 있습니다. 이것들은 [`async def`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-def) 문으로 구현할 수 있습니다. [**PEP 492**](https://peps.python.org/pep-0492/)를 보세요.



## coroutine function (코루틴 함수)

[코루틴](https://docs.python.org/ko/3/glossary.html#term-coroutine) 객체를 돌려주는 함수. 코루틴 함수는 [`async def`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-def) 문으로 정의될 수 있고, [`await`](https://docs.python.org/ko/3/reference/expressions.html#await) 와 [`async for`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-for)와 [`async with`](https://docs.python.org/ko/3/reference/compound_stmts.html#async-with) 키워드를 포함할 수 있습니다. 이것들은 [**PEP 492**](https://peps.python.org/pep-0492/) 에 의해 도입되었습니다.


## CPython

파이썬 프로그래밍 언어의 규범적인 구현인데, [python.org](https://www.python.org/)에서 배포됩니다. 이 구현을 Jython 이나 IronPython 과 같은 다른 것들과 구별할 필요가 있을 때 용어 “CPython” 이 사용됩니다.


## decorator (데코레이터)

다른 함수를 돌려주는 함수인데, 보통 `@wrapper` 문법을 사용한 함수 변환으로 적용됩니다. 데코레이터의 흔한 예는 [`classmethod()`](https://docs.python.org/ko/3/library/functions.html#classmethod "classmethod") 과 [`staticmethod()`](https://docs.python.org/ko/3/library/functions.html#staticmethod "staticmethod") 입니다.

데코레이터 문법은 단지 편의 문법일 뿐입니다. 다음 두 함수 정의는 의미상으로 동등합니다:

def f(arg):
    ...
f = staticmethod(f)

@staticmethod
def f(arg):
    ...

같은 개념이 클래스에도 존재하지만, 덜 자주 쓰입니다. 데코레이터에 대한 더 자세한 내용은 [함수 정의](https://docs.python.org/ko/3/reference/compound_stmts.html#function) 와 [클래스 정의](https://docs.python.org/ko/3/reference/compound_stmts.html#class) 의 설명서를 보면 됩니다.


## descriptor (디스크립터)

메서드 `__get__()` 이나 `__set__()` 이나 `__delete__()`를 정의하는 객체. 클래스 어트리뷰트가 디스크립터일 때, 어트리뷰트 조회는 특별한 연결 작용을 일으킵니다. 보통, _a.b_를 읽거나, 쓰거나, 삭제하는데 사용할 때, _a_의 클래스 딕셔너리에서 _b_ 라고 이름 붙여진 객체를 찾습니다. 하지만 _b_가 디스크립터면, 해당하는 디스크립터 메서드가 호출됩니다. 디스크립터를 이해하는 것은 파이썬에 대한 깊은 이해의 열쇠인데, 함수, 메서드, 프로퍼티, 클래스 메서드, 스태틱 메서드, 슈퍼 클래스 참조 등의 많은 기능의 기초를 이루고 있기 때문입니다.

디스크립터의 메서드들에 대한 자세한 내용은 [디스크립터 구현하기](https://docs.python.org/ko/3/reference/datamodel.html#descriptors)나 [디스크립터 사용법 안내서](https://docs.python.org/ko/3/howto/descriptor.html#descriptorhowto)에 나옵니다.


## dictionary (딕셔너리)

임의의 키를 값에 대응시키는 연관 배열 (associative array). 키는 `__hash__()` 와 `__eq__()` 메서드를 갖는 모든 객체가 될 수 있습니다. 펄에서 해시라고 부릅니다.


## dictionary comprehension (딕셔너리 컴프리헨션)

이터러블에 있는 요소 전체나 일부를 처리하고 결과를 담은 딕셔너리를 반환하는 간결한 방법. `results = {n: n ** 2 for n in range(10)}`은 값 `n ** 2`에 매핑된 키 `n`을 포함하는 딕셔너리를 생성합니다. [리스트, 집합, 딕셔너리의 디스플레이(display)](https://docs.python.org/ko/3/reference/expressions.html#comprehensions)을 참조하십시오.


## dictionary view (딕셔너리 뷰)

[`dict.keys()`](https://docs.python.org/ko/3/library/stdtypes.html#dict.keys "dict.keys"), [`dict.values()`](https://docs.python.org/ko/3/library/stdtypes.html#dict.values "dict.values"), [`dict.items()`](https://docs.python.org/ko/3/library/stdtypes.html#dict.items "dict.items") 메서드가 돌려주는 객체들을 딕셔너리 뷰라고 부릅니다. 이것들은 딕셔너리 항목들에 대한 동적인 뷰를 제공하는데, 딕셔너리가 변경될 때, 뷰가 이 변화를 반영한다는 뜻입니다. 딕셔너리 뷰를 완전한 리스트로 바꾸려면 `list(dictview)`를 사용하면 됩니다. [딕셔너리 뷰 객체](https://docs.python.org/ko/3/library/stdtypes.html#dict-views)를 보세요.


## docstring (독스트링)

클래스, 함수, 모듈에서 첫 번째 표현식으로 나타나는 문자열 리터럴. 스위트가 실행될 때는 무시되지만, 컴파일러에 의해 인지되어 둘러싼 클래스, 함수, 모듈의 `__doc__` 어트리뷰트로 삽입됩니다. 인트로스펙션을 통해 사용할 수 있으므로, 객체의 설명서를 위한 규범적인 장소입니다.



## duck-typing (덕 타이핑)

올바른 인터페이스를 가졌는지 판단하는데 객체의 형을 보지 않는 프로그래밍 스타일; 대신, 단순히 메서드나 어트리뷰트가 호출되거나 사용됩니다 (“오리처럼 보이고 오리처럼 꽥꽥댄다면, 그것은 오리다.”) 특정한 형 대신에 인터페이스를 강조함으로써, 잘 설계된 코드는 다형적인 치환을 허락함으로써 유연성을 개선할 수 있습니다. 덕 타이핑은 [`type()`](https://docs.python.org/ko/3/library/functions.html#type "type") 이나 [`isinstance()`](https://docs.python.org/ko/3/library/functions.html#isinstance "isinstance") 을 사용한 검사를 피합니다. (하지만, 덕 타이핑이 [추상 베이스 클래스](https://docs.python.org/ko/3/glossary.html#term-abstract-base-class) 로 보완될 수 있음에 유의해야 합니다.) 대신에, [`hasattr()`](https://docs.python.org/ko/3/library/functions.html#hasattr "hasattr") 검사나 [EAFP](https://docs.python.org/ko/3/glossary.html#term-EAFP) 프로그래밍을 씁니다.


## EAFP

허락보다는 용서를 구하기가 쉽다 (Easier to ask for forgiveness than permission). 이 흔히 볼 수 있는 파이썬 코딩 스타일은, 올바른 키나 어트리뷰트의 존재를 가정하고, 그 가정이 틀리면 예외를 잡습니다. 이 깔끔하고 빠른 스타일은 많은 [`try`](https://docs.python.org/ko/3/reference/compound_stmts.html#try)와 [`except`](https://docs.python.org/ko/3/reference/compound_stmts.html#except) 문의 존재로 특징지어집니다. 이 테크닉은 C와 같은 다른 많은 언어에서 자주 사용되는 [LBYL](https://docs.python.org/ko/3/glossary.html#term-LBYL) 스타일과 대비됩니다.


## expression (표현식)

어떤 값으로 구해질 수 있는 문법적인 조각. 다른 말로 표현하면, 표현식은 리터럴, 이름, 어트리뷰트 액세스, 연산자, 함수들과 같은 값을 돌려주는 표현 요소들을 쌓아 올린 것입니다. 다른 많은 언어와 대조적으로, 모든 언어 구성물들이 표현식인 것은 아닙니다. [`while`](https://docs.python.org/ko/3/reference/compound_stmts.html#while)처럼, 표현식으로 사용할 수 없는 [문장](https://docs.python.org/ko/3/glossary.html#term-statement) 들이 있습니다. 대입 또한 문장이고, 표현식이 아닙니다.


## extension module (확장 모듈)[](https://docs.python.org/ko/3/glossary.html#term-extension-module "이 용어에 대한 퍼머링크")

C 나 C++로 작성된 모듈인데, 파이썬의 C API를 사용해서 핵심이나 사용자 코드와 상호 작용합니다.



## f-string (f-문자열)[](https://docs.python.org/ko/3/glossary.html#term-f-string "이 용어에 대한 퍼머링크")

`'f'` 나 `'F'` 를 앞에 붙인 문자열 리터럴들을 흔히 “f-문자열”이라고 부르는데, [포맷 문자열 리터럴](https://docs.python.org/ko/3/reference/lexical_analysis.html#f-strings) 의 줄임말입니다. [**PEP 498**](https://peps.python.org/pep-0498/) 을 보세요.



## file object (파일 객체)[](https://docs.python.org/ko/3/glossary.html#term-file-object "이 용어에 대한 퍼머링크")

하부 자원에 대해 파일 지향적 API(`read()` 나 `write()` 같은 메서드들)를 드러내는 객체. 만들어진 방법에 따라, 파일 객체는 실제 디스크 상의 파일이나 다른 저장 장치나 통신 장치 (예를 들어, 표준 입출력, 인-메모리 버퍼, 소켓, 파이프, 등등)에 대한 액세스를 중계할 수 있습니다. 파일 객체는 _파일류 객체 (file-like objects)_나 _스트림 (streams)_ 이라고도 불립니다.

실제로는 세 부류의 파일 객체들이 있습니다. 날(raw) [바이너리 파일](https://docs.python.org/ko/3/glossary.html#term-binary-file), 버퍼드(buffered) [바이너리 파일](https://docs.python.org/ko/3/glossary.html#term-binary-file), [텍스트 파일](https://docs.python.org/ko/3/glossary.html#term-text-file). 이들의 인터페이스는 [`io`](https://docs.python.org/ko/3/library/io.html#module-io "io: Core tools for working with streams.") 모듈에서 정의됩니다. 파일 객체를 만드는 규범적인 방법은 [`open()`](https://docs.python.org/ko/3/library/functions.html#open "open") 함수를 쓰는 것입니다.



## file-like object (파일류 객체)[](https://docs.python.org/ko/3/glossary.html#term-file-like-object "이 용어에 대한 퍼머링크")

[파일 객체](https://docs.python.org/ko/3/glossary.html#term-file-object) 의 비슷한 말.

filesystem encoding and error handler[](https://docs.python.org/ko/3/glossary.html#term-filesystem-encoding-and-error-handler "이 용어에 대한 퍼머링크")

Encoding and error handler used by Python to decode bytes from the operating system and encode Unicode to the operating system.

The filesystem encoding must guarantee to successfully decode all bytes below 128. If the file system encoding fails to provide this guarantee, API functions can raise [`UnicodeError`](https://docs.python.org/ko/3/library/exceptions.html#UnicodeError "UnicodeError").

The [`sys.getfilesystemencoding()`](https://docs.python.org/ko/3/library/sys.html#sys.getfilesystemencoding "sys.getfilesystemencoding") and [`sys.getfilesystemencodeerrors()`](https://docs.python.org/ko/3/library/sys.html#sys.getfilesystemencodeerrors "sys.getfilesystemencodeerrors") functions can be used to get the filesystem encoding and error handler.

The [filesystem encoding and error handler](https://docs.python.org/ko/3/glossary.html#term-filesystem-encoding-and-error-handler) are configured at Python startup by the [`PyConfig_Read()`](https://docs.python.org/ko/3/c-api/init_config.html#c.PyConfig_Read "PyConfig_Read") function: see [`filesystem_encoding`](https://docs.python.org/ko/3/c-api/init_config.html#c.PyConfig.filesystem_encoding "PyConfig.filesystem_encoding") and [`filesystem_errors`](https://docs.python.org/ko/3/c-api/init_config.html#c.PyConfig.filesystem_errors "PyConfig.filesystem_errors") members of [`PyConfig`](https://docs.python.org/ko/3/c-api/init_config.html#c.PyConfig "PyConfig").

See also the [locale encoding](https://docs.python.org/ko/3/glossary.html#term-locale-encoding).



## finder (파인더)[](https://docs.python.org/ko/3/glossary.html#term-finder "이 용어에 대한 퍼머링크")

임포트될 모듈을 위한 [로더](https://docs.python.org/ko/3/glossary.html#term-loader) 를 찾으려고 시도하는 객체.

파이썬 3.3. 이후로, 두 종류의 파인더가 있습니다: [`sys.meta_path`](https://docs.python.org/ko/3/library/sys.html#sys.meta_path "sys.meta_path") 와 함께 사용하는 [메타 경로 파인더](https://docs.python.org/ko/3/glossary.html#term-meta-path-finder) 와 [`sys.path_hooks`](https://docs.python.org/ko/3/library/sys.html#sys.path_hooks "sys.path_hooks") 과 함께 사용하는 [경로 엔트리 파인더](https://docs.python.org/ko/3/glossary.html#term-path-entry-finder).

더 자세한 내용은 [**PEP 302**](https://peps.python.org/pep-0302/), [**PEP 420**](https://peps.python.org/pep-0420/), [**PEP 451**](https://peps.python.org/pep-0451/) 에 나옵니다.



## floor division (정수 나눗셈)[](https://docs.python.org/ko/3/glossary.html#term-floor-division "이 용어에 대한 퍼머링크")

가장 가까운 정수로 내림하는 수학적 나눗셈. 정수 나눗셈 연산자는 `//` 다. 예를 들어, 표현식 `11 // 4` 의 값은 `2`가 되지만, 실수 나눗셈은 `2.75`를 돌려줍니다. `(-11) // 4` 가 `-2.75`를 _내림_ 한 `-3`이 됨에 유의해야 합니다. [**PEP 238**](https://peps.python.org/pep-0238/)을 보세요.




## function (함수)[](https://docs.python.org/ko/3/glossary.html#term-function "이 용어에 대한 퍼머링크")

호출자에게 어떤 값을 돌려주는 일련의 문장들. 없거나 그 이상의 [인자](https://docs.python.org/ko/3/glossary.html#term-argument) 가 전달될 수 있는데, 바디의 실행에 사용될 수 있습니다. [매개변수](https://docs.python.org/ko/3/glossary.html#term-parameter) 와 [메서드](https://docs.python.org/ko/3/glossary.html#term-method) 와 [함수 정의](https://docs.python.org/ko/3/reference/compound_stmts.html#function) 섹션도 보세요.



## function annotation (함수 어노테이션)[](https://docs.python.org/ko/3/glossary.html#term-function-annotation "이 용어에 대한 퍼머링크")

함수 매개변수나 반환 값의 [어노테이션](https://docs.python.org/ko/3/glossary.html#term-annotation).

함수 어노테이션은 일반적으로 [형 힌트](https://docs.python.org/ko/3/glossary.html#term-type-hint) 로 사용됩니다: 예를 들어, 이 함수는 두 개의 [`int`](https://docs.python.org/ko/3/library/functions.html#int "int") 인자를 받아들일 것으로 기대되고, 동시에 [`int`](https://docs.python.org/ko/3/library/functions.html#int "int") 반환 값을 줄 것으로 기대됩니다:

```python
def sum_two_numbers(a: int, b: int) -> int:
   return a + b
```

함수 어노테이션 문법은 [함수 정의](https://docs.python.org/ko/3/reference/compound_stmts.html#function) 절에서 설명합니다.

See [variable annotation](https://docs.python.org/ko/3/glossary.html#term-variable-annotation) and [**PEP 484**](https://peps.python.org/pep-0484/), which describe this functionality. Also see [Annotations Best Practices](https://docs.python.org/ko/3/howto/annotations.html#annotations-howto) for best practices on working with annotations.



## __future__[](https://docs.python.org/ko/3/glossary.html#term-__future__ "이 용어에 대한 퍼머링크")

A [future statement](https://docs.python.org/ko/3/reference/simple_stmts.html#future), `from __future__ import <feature>`, directs the compiler to compile the current module using syntax or semantics that will become standard in a future release of Python. The [`__future__`](https://docs.python.org/ko/3/library/__future__.html#module-__future__ "__future__: Future statement definitions") module documents the possible values of _feature_. By importing this module and evaluating its variables, you can see when a new feature was first added to the language and when it will (or did) become the default:

>>>

>>> import __future__
>>> __future__.division
_Feature((2, 2, 0, 'alpha', 2), (3, 0, 0, 'alpha', 0), 8192)



## garbage collection (가비지 수거)[](https://docs.python.org/ko/3/glossary.html#term-garbage-collection "이 용어에 대한 퍼머링크")

더 사용되지 않는 메모리를 반납하는 절차. 파이썬은 참조 횟수 추적과 참조 순환을 감지하고 끊을 수 있는 순환 가비지 수거기를 통해 가비지 수거를 수행합니다. 가비지 수거기는 [`gc`](https://docs.python.org/ko/3/library/gc.html#module-gc "gc: Interface to the cycle-detecting garbage collector.") 모듈을 사용해서 제어할 수 있습니다.



## generator (제너레이터)[](https://docs.python.org/ko/3/glossary.html#index-19 "이 용어에 대한 퍼머링크")

[제너레이터 이터레이터](https://docs.python.org/ko/3/glossary.html#term-generator-iterator) 를 돌려주는 함수. 일반 함수처럼 보이는데, 일련의 값들을 만드는 [`yield`](https://docs.python.org/ko/3/reference/simple_stmts.html#yield) 표현식을 포함한다는 점이 다릅니다. 이 값들은 for-루프로 사용하거나 [`next()`](https://docs.python.org/ko/3/library/functions.html#next "next") 함수로 한 번에 하나씩 꺼낼 수 있습니다.

보통 제너레이터 함수를 가리키지만, 어떤 문맥에서는 _제너레이터 이터레이터_ 를 가리킵니다. 의도하는 의미가 명확하지 않은 경우는, 완전한 용어를 써서 모호함을 없앱니다.



## generator iterator (제너레이터 이터레이터)[](https://docs.python.org/ko/3/glossary.html#term-generator-iterator "이 용어에 대한 퍼머링크")

[제너레이터](https://docs.python.org/ko/3/glossary.html#term-generator) 함수가 만드는 객체.

각 [`yield`](https://docs.python.org/ko/3/reference/simple_stmts.html#yield)는 일시적으로 처리를 중단하고, 그 위치의 (지역 변수들과 대기 중인 try-문들을 포함하는) 실행 상태를 기억합니다. _제너레이터 이터레이터_ 가 재개되면, 떠난 곳으로 복귀합니다 (호출마다 새로 시작하는 함수와 대비됩니다).



## generator expression (제너레이터 표현식)[](https://docs.python.org/ko/3/glossary.html#index-20 "이 용어에 대한 퍼머링크")

이터레이터를 돌려주는 표현식. 루프 변수와 범위를 정의하는 `for` 절과 생략 가능한 `if` 절이 뒤에 붙는 일반 표현식 처럼 보입니다. 결합한 표현식은 둘러싼 함수를 위한 값들을 만들어냅니다:

>>>

>>> sum(i*i for i in range(10))         # sum of squares 0, 1, 4, ... 81
285



## generic function (제네릭 함수)[](https://docs.python.org/ko/3/glossary.html#term-generic-function "이 용어에 대한 퍼머링크")

같은 연산을 서로 다른 형들에 대해 구현한 여러 함수로 구성된 함수. 호출 때 어떤 구현이 사용될지는 디스패치 알고리즘에 의해 결정됩니다.

[싱글 디스패치](https://docs.python.org/ko/3/glossary.html#term-single-dispatch) 용어집 항목과 [`functools.singledispatch()`](https://docs.python.org/ko/3/library/functools.html#functools.singledispatch "functools.singledispatch") 데코레이터와 [**PEP 443**](https://peps.python.org/pep-0443/)도 보세요.



## generic type (제네릭 형)[](https://docs.python.org/ko/3/glossary.html#term-generic-type "이 용어에 대한 퍼머링크")

A [type](https://docs.python.org/ko/3/glossary.html#term-type) that can be parameterized; typically a [container class](https://docs.python.org/ko/3/reference/datamodel.html#sequence-types) such as [`list`](https://docs.python.org/ko/3/library/stdtypes.html#list "list") or [`dict`](https://docs.python.org/ko/3/library/stdtypes.html#dict "dict"). Used for [type hints](https://docs.python.org/ko/3/glossary.html#term-type-hint) and [annotations](https://docs.python.org/ko/3/glossary.html#term-annotation).

For more details, see [generic alias types](https://docs.python.org/ko/3/library/stdtypes.html#types-genericalias), [**PEP 483**](https://peps.python.org/pep-0483/), [**PEP 484**](https://peps.python.org/pep-0484/), [**PEP 585**](https://peps.python.org/pep-0585/), and the [`typing`](https://docs.python.org/ko/3/library/typing.html#module-typing "typing: Support for type hints (see :pep:`484`).") module.



## global interpreter lock (전역 인터프리터 록)[](https://docs.python.org/ko/3/glossary.html#term-global-interpreter-lock "이 용어에 대한 퍼머링크")

한 번에 오직 하나의 스레드가 파이썬 [바이트 코드](https://docs.python.org/ko/3/glossary.html#term-bytecode) 를 실행하도록 보장하기 위해 [CPython](https://docs.python.org/ko/3/glossary.html#term-CPython) 인터프리터가 사용하는 메커니즘. ([`dict`](https://docs.python.org/ko/3/library/stdtypes.html#dict "dict")와 같은 중요한 내장형들을 포함하는) 객체 모델이 묵시적으로 동시 액세스에 대해 안전하도록 만들어서 CPython 구현을 단순하게 만듭니다. 인터프리터 전체를 잠그는 것은 인터프리터를 다중스레드화하기 쉽게 만드는 대신, 다중 프로세서 기계가 제공하는 병렬성의 많은 부분을 희생합니다.

However, some extension modules, either standard or third-party, are designed so as to release the GIL when doing computationally intensive tasks such as compression or hashing. Also, the GIL is always released when doing I/O.

(훨씬 더 미세하게 공유 데이터를 잠그는) “스레드에 자유로운(free-threaded)” 인터프리터를 만들고자 하는 과거의 노력은 성공적이지 못했는데, 흔한 단일 프로세서 경우의 성능 저하가 심하기 때문입니다. 이 성능 이슈를 극복하는 것은 구현을 훨씬 복잡하게 만들어서 유지 비용이 더 들어갈 것으로 여겨지고 있습니다.



## hash-based pyc (해시 기반 pyc)[](https://docs.python.org/ko/3/glossary.html#term-hash-based-pyc "이 용어에 대한 퍼머링크")

유효성을 판별하기 위해 해당 소스 파일의 최종 수정 시간이 아닌 해시를 사용하는 바이트 코드 캐시 파일. [캐시된 바이트 코드 무효화](https://docs.python.org/ko/3/reference/import.html#pyc-invalidation)을 참조하세요.



## hashable (해시 가능)[](https://docs.python.org/ko/3/glossary.html#term-hashable "이 용어에 대한 퍼머링크")

객체가 일생 그 값이 변하지 않는 해시값을 갖고 (`__hash__()` 메서드가 필요합니다), 다른 객체와 비교될 수 있으면 (`__eq__()` 메서드가 필요합니다), _해시 가능_하다고 합니다. 같다고 비교되는 해시 가능한 객체들의 해시값은 같아야 합니다.

해시 가능성은 객체를 딕셔너리의 키나 집합의 멤버로 사용할 수 있게 하는데, 이 자료 구조들이 내부적으로 해시값을 사용하기 때문입니다.

대부분 파이썬의 불변 내장 객체들은 해시 가능합니다; (리스트나 딕셔너리 같은) 가변 컨테이너들은 그렇지 않습니다; (튜플이나 frozenset 같은) 불변 컨테이너들은 그들의 요소들이 해시 가능할 때만 해시 가능합니다. 사용자 정의 클래스의 인스턴스 객체들은 기본적으로 해시 가능합니다. (자기 자신을 제외하고는) 모두 다르다고 비교되고, 해시값은 [`id()`](https://docs.python.org/ko/3/library/functions.html#id "id")로 부터 만들어집니다.



## IDLE[](https://docs.python.org/ko/3/glossary.html#term-IDLE "이 용어에 대한 퍼머링크")

An Integrated Development and Learning Environment for Python. [IDLE](https://docs.python.org/ko/3/library/idle.html#idle) is a basic editor and interpreter environment which ships with the standard distribution of Python.



## immutable (불변)[](https://docs.python.org/ko/3/glossary.html#term-immutable "이 용어에 대한 퍼머링크")

고정된 값을 갖는 객체. 불변 객체는 숫자, 문자열, 튜플을 포함합니다. 이런 객체들은 변경될 수 없습니다. 새 값을 저장하려면 새 객체를 만들어야 합니다. 변하지 않는 해시값이 있어야 하는 곳에서 중요한 역할을 합니다, 예를 들어, 딕셔너리의 키.



## import path (임포트 경로)[](https://docs.python.org/ko/3/glossary.html#term-import-path "이 용어에 대한 퍼머링크")

[경로 기반 파인더](https://docs.python.org/ko/3/glossary.html#term-path-based-finder) 가 임포트 할 모듈을 찾기 위해 검색하는 장소들 (또는 [경로 엔트리](https://docs.python.org/ko/3/glossary.html#term-path-entry)) 의 목록. 임포트 하는 동안, 이 장소들의 목록은 보통 [`sys.path`](https://docs.python.org/ko/3/library/sys.html#sys.path "sys.path") 로부터 옵니다, 하지만 서브 패키지의 경우 부모 패키지의 `__path__` 어트리뷰트로부터 올 수도 있습니다.



## importing (임포팅)[](https://docs.python.org/ko/3/glossary.html#term-importing "이 용어에 대한 퍼머링크")

한 모듈의 파이썬 코드가 다른 모듈의 파이썬 코드에서 사용될 수 있도록 하는 절차.



## importer (임포터)[](https://docs.python.org/ko/3/glossary.html#term-importer "이 용어에 대한 퍼머링크")

모듈을 찾기도 하고 로드 하기도 하는 객체; 동시에 [파인더](https://docs.python.org/ko/3/glossary.html#term-finder) 이자 [로더](https://docs.python.org/ko/3/glossary.html#term-loader) 객체입니다.



## interactive (대화형)[](https://docs.python.org/ko/3/glossary.html#term-interactive "이 용어에 대한 퍼머링크")

파이썬은 대화형 인터프리터를 갖고 있는데, 인터프리터 프롬프트에서 문장과 표현식을 입력할 수 있고, 즉각 실행된 결과를 볼 수 있다는 뜻입니다. 인자 없이 단지 `python`을 실행하세요 (컴퓨터의 주메뉴에서 선택하는 것도 가능할 수 있습니다). 새 아이디어를 검사하거나 모듈과 패키지를 들여다보는 매우 강력한 방법입니다 (`help(x)`를 기억하세요).



## interpreted (인터프리티드)[](https://docs.python.org/ko/3/glossary.html#term-interpreted "이 용어에 대한 퍼머링크")

바이트 코드 컴파일러의 존재 때문에 그 구분이 흐릿해지기는 하지만, 파이썬은 컴파일 언어가 아니라 인터프리터 언어입니다. 이것은 명시적으로 실행 파일을 만들지 않고도, 소스 파일을 직접 실행할 수 있다는 뜻입니다. 그 프로그램이 좀 더 천천히 실행되기는 하지만, 인터프리터 언어는 보통 컴파일 언어보다 짧은 개발/디버깅 주기를 갖습니다. [대화형](https://docs.python.org/ko/3/glossary.html#term-interactive) 도 보세요.



## interpreter shutdown (인터프리터 종료)[](https://docs.python.org/ko/3/glossary.html#term-interpreter-shutdown "이 용어에 대한 퍼머링크")

종료하라는 요청을 받을 때, 파이썬 인터프리터는 특별한 시기에 진입하는데, 모듈이나 여러 가지 중요한 내부 구조들과 같은 모든 할당된 자원들을 단계적으로 반납합니다. 또한, [가비지 수거기](https://docs.python.org/ko/3/glossary.html#term-garbage-collection) 를 여러 번 호출합니다. 사용자 정의 파괴자나 weakref 콜백에 있는 코드들의 실행을 시작시킬 수 있습니다. 종료 시기 동안 실행되는 코드는 다양한 예외들을 만날 수 있는데, 그것이 의존하는 자원들이 더 기능하지 않을 수 있기 때문입니다 (흔한 예는 라이브러리 모듈이나 경고 장치들입니다).

인터프리터 종료의 주된 원인은 실행되는 `__main__` 모듈이나 스크립트가 실행을 끝내는 것입니다.



## iterable (이터러블)[](https://docs.python.org/ko/3/glossary.html#term-iterable "이 용어에 대한 퍼머링크")

An object capable of returning its members one at a time. Examples of iterables include all sequence types (such as [`list`](https://docs.python.org/ko/3/library/stdtypes.html#list "list"), [`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str"), and [`tuple`](https://docs.python.org/ko/3/library/stdtypes.html#tuple "tuple")) and some non-sequence types like [`dict`](https://docs.python.org/ko/3/library/stdtypes.html#dict "dict"), [file objects](https://docs.python.org/ko/3/glossary.html#term-file-object), and objects of any classes you define with an `__iter__()` method or with a `__getitem__()` method that implements [sequence](https://docs.python.org/ko/3/glossary.html#term-sequence) semantics.

이터러블은 [`for`](https://docs.python.org/ko/3/reference/compound_stmts.html#for) 루프에 사용될 수 있고, 시퀀스를 필요로 하는 다른 많은 곳 ([`zip()`](https://docs.python.org/ko/3/library/functions.html#zip "zip"), [`map()`](https://docs.python.org/ko/3/library/functions.html#map "map"), …) 에 사용될 수 있습니다. 이터러블 객체가 내장 함수 [`iter()`](https://docs.python.org/ko/3/library/functions.html#iter "iter") 에 인자로 전달되면, 그 객체의 이터레이터를 돌려줍니다. 이 이터레이터는 값들의 집합을 한 번 거치는 동안 유효합니다. 이터러블을 사용할 때, 보통은 [`iter()`](https://docs.python.org/ko/3/library/functions.html#iter "iter") 를 호출하거나, 이터레이터 객체를 직접 다룰 필요는 없습니다. `for` 문은 이것들을 여러분을 대신해서 자동으로 해주는데, 루프를 도는 동안 이터레이터를 잡아둘 이름 없는 변수를 만듭니다. [이터레이터](https://docs.python.org/ko/3/glossary.html#term-iterator), [시퀀스](https://docs.python.org/ko/3/glossary.html#term-sequence), [제너레이터](https://docs.python.org/ko/3/glossary.html#term-generator) 도 보세요.



## iterator (이터레이터)[](https://docs.python.org/ko/3/glossary.html#term-iterator "이 용어에 대한 퍼머링크")

데이터의 스트림을 표현하는 객체. 이터레이터의 [`__next__()`](https://docs.python.org/ko/3/library/stdtypes.html#iterator.__next__ "iterator.__next__") 메서드를 반복적으로 호출하면 (또는 내장 함수 [`next()`](https://docs.python.org/ko/3/library/functions.html#next "next") 로 전달하면) 스트림에 있는 항목들을 차례대로 돌려줍니다. 더 이상의 데이터가 없을 때는 대신 [`StopIteration`](https://docs.python.org/ko/3/library/exceptions.html#StopIteration "StopIteration") 예외를 일으킵니다. 이 지점에서, 이터레이터 객체는 소진되고, 이후의 모든 `__next__()` 메서드 호출은 [`StopIteration`](https://docs.python.org/ko/3/library/exceptions.html#StopIteration "StopIteration") 예외를 다시 일으키기만 합니다. 이터레이터는 이터레이터 객체 자신을 돌려주는 `__iter__()` 메서드를 가질 것이 요구되기 때문에, 이터레이터는 이터러블이기도 하고 다른 이터러블들을 받아들이는 대부분의 곳에서 사용될 수 있습니다. 중요한 예외는 여러 번의 이터레이션을 시도하는 코드입니다. ([`list`](https://docs.python.org/ko/3/library/stdtypes.html#list "list") 같은) 컨테이너 객체는 [`iter()`](https://docs.python.org/ko/3/library/functions.html#iter "iter") 함수로 전달하거나 [`for`](https://docs.python.org/ko/3/reference/compound_stmts.html#for) 루프에 사용할 때마다 새 이터레이터를 만듭니다. 이런 것을 이터레이터에 대해서 수행하려고 하면, 지난 이터레이션에 사용된 이미 소진된 이터레이터를 돌려줘서, 빈 컨테이너처럼 보이게 만듭니다.

[이터레이터 형](https://docs.python.org/ko/3/library/stdtypes.html#typeiter) 에 더 자세한 내용이 있습니다.

**CPython 구현 상세:** CPython does not consistently apply the requirement that an iterator define `__iter__()`.

## key function (키 함수)[](https://docs.python.org/ko/3/glossary.html#term-key-function "이 용어에 대한 퍼머링크")

키 함수 또는 콜레이션(collation) 함수는 정렬(sorting)이나 배열(ordering)에 사용되는 값을 돌려주는 콜러블입니다. 예를 들어, [`locale.strxfrm()`](https://docs.python.org/ko/3/library/locale.html#locale.strxfrm "locale.strxfrm") 은 로케일 특정 방식을 따르는 정렬 키를 만드는 데 사용됩니다.

파이썬의 많은 도구가 요소들이 어떻게 순서 지어지고 묶이는지를 제어하기 위해 키 함수를 받아들입니다. 이런 것들에는 [`min()`](https://docs.python.org/ko/3/library/functions.html#min "min"), [`max()`](https://docs.python.org/ko/3/library/functions.html#max "max"), [`sorted()`](https://docs.python.org/ko/3/library/functions.html#sorted "sorted"), [`list.sort()`](https://docs.python.org/ko/3/library/stdtypes.html#list.sort "list.sort"), [`heapq.merge()`](https://docs.python.org/ko/3/library/heapq.html#heapq.merge "heapq.merge"), [`heapq.nsmallest()`](https://docs.python.org/ko/3/library/heapq.html#heapq.nsmallest "heapq.nsmallest"), [`heapq.nlargest()`](https://docs.python.org/ko/3/library/heapq.html#heapq.nlargest "heapq.nlargest"), [`itertools.groupby()`](https://docs.python.org/ko/3/library/itertools.html#itertools.groupby "itertools.groupby") 이 있습니다.

There are several ways to create a key function. For example. the [`str.lower()`](https://docs.python.org/ko/3/library/stdtypes.html#str.lower "str.lower") method can serve as a key function for case insensitive sorts. Alternatively, a key function can be built from a [`lambda`](https://docs.python.org/ko/3/reference/expressions.html#lambda) expression such as `lambda r: (r[0], r[2])`. Also, [`operator.attrgetter()`](https://docs.python.org/ko/3/library/operator.html#operator.attrgetter "operator.attrgetter"), [`operator.itemgetter()`](https://docs.python.org/ko/3/library/operator.html#operator.itemgetter "operator.itemgetter"), and [`operator.methodcaller()`](https://docs.python.org/ko/3/library/operator.html#operator.methodcaller "operator.methodcaller") are three key function constructors. See the [Sorting HOW TO](https://docs.python.org/ko/3/howto/sorting.html#sortinghowto) for examples of how to create and use key functions.



## keyword argument (키워드 인자)[](https://docs.python.org/ko/3/glossary.html#term-keyword-argument "이 용어에 대한 퍼머링크")

[인자](https://docs.python.org/ko/3/glossary.html#term-argument) 를 보세요.



## lambda (람다)[](https://docs.python.org/ko/3/glossary.html#term-lambda "이 용어에 대한 퍼머링크")

호출될 때 값이 구해지는 하나의 [표현식](https://docs.python.org/ko/3/glossary.html#term-expression) 으로 구성된 이름 없는 인라인 함수. 람다 함수를 만드는 문법은 `lambda [parameters]: expression` 입니다.



## LBYL[](https://docs.python.org/ko/3/glossary.html#term-LBYL "이 용어에 대한 퍼머링크")

뛰기 전에 보라 (Look before you leap). 이 코딩 스타일은 호출이나 조회를 하기 전에 명시적으로 사전 조건들을 검사합니다. 이 스타일은 [EAFP](https://docs.python.org/ko/3/glossary.html#term-EAFP) 접근법과 대비되고, 많은 [`if`](https://docs.python.org/ko/3/reference/compound_stmts.html#if) 문의 존재로 특징지어집니다.

다중 스레드 환경에서, LBYL 접근법은 “보기”와 “뛰기” 간에 경쟁 조건을 만들게 될 위험이 있습니다. 예를 들어, 코드 `if key in mapping: return mapping[key]` 는 검사 후에, 하지만 조회 전에, 다른 스레드가 _key_를 _mapping_에서 제거하면 실패할 수 있습니다. 이런 이슈는 록이나 EAFP 접근법을 사용함으로써 해결될 수 있습니다.



## locale encoding[](https://docs.python.org/ko/3/glossary.html#term-locale-encoding "이 용어에 대한 퍼머링크")

On Unix, it is the encoding of the LC_CTYPE locale. It can be set with [`locale.setlocale(locale.LC_CTYPE, new_locale)`](https://docs.python.org/ko/3/library/locale.html#locale.setlocale "locale.setlocale").

On Windows, it is the ANSI code page (ex: `"cp1252"`).

On Android and VxWorks, Python uses `"utf-8"` as the locale encoding.

`locale.getencoding()` can be used to get the locale encoding.

See also the [filesystem encoding and error handler](https://docs.python.org/ko/3/glossary.html#term-filesystem-encoding-and-error-handler).



## list (리스트)[](https://docs.python.org/ko/3/glossary.html#term-list "이 용어에 대한 퍼머링크")

내장 파이썬 [시퀀스](https://docs.python.org/ko/3/glossary.html#term-sequence). 그 이름에도 불구하고, 원소에 대한 액세스가 O(1)이기 때문에, 연결 리스트(linked list)보다는 다른 언어의 배열과 유사합니다.



## list comprehension (리스트 컴프리헨션)[](https://docs.python.org/ko/3/glossary.html#term-list-comprehension "이 용어에 대한 퍼머링크")

시퀀스의 요소들 전부 또는 일부를 처리하고 그 결과를 리스트로 돌려주는 간결한 방법. `result = ['{:#04x}'.format(x) for x in range(256) if x % 2 == 0]` 는 0에서 255 사이에 있는 짝수들의 16진수 (0x..) 들을 포함하는 문자열의 리스트를 만듭니다. [`if`](https://docs.python.org/ko/3/reference/compound_stmts.html#if) 절은 생략할 수 있습니다. 생략하면, `range(256)`에 있는 모든 요소가 처리됩니다.



## loader (로더)[](https://docs.python.org/ko/3/glossary.html#term-loader "이 용어에 대한 퍼머링크")

모듈을 로드하는 객체. `load_module()` 이라는 이름의 메서드를 정의해야 합니다. 로더는 보통 [파인더](https://docs.python.org/ko/3/glossary.html#term-finder) 가 돌려줍니다. 자세한 내용은 [**PEP 302**](https://peps.python.org/pep-0302/) 를, [추상 베이스 클래스](https://docs.python.org/ko/3/glossary.html#term-abstract-base-class) 는 [`importlib.abc.Loader`](https://docs.python.org/ko/3/library/importlib.html#importlib.abc.Loader "importlib.abc.Loader") 를 보세요.



## magic method (매직 메서드)[](https://docs.python.org/ko/3/glossary.html#term-magic-method "이 용어에 대한 퍼머링크")

[특수 메서드](https://docs.python.org/ko/3/glossary.html#term-special-method) 의 비공식적인 비슷한 말.



## mapping (매핑)[](https://docs.python.org/ko/3/glossary.html#term-mapping "이 용어에 대한 퍼머링크")

A container object that supports arbitrary key lookups and implements the methods specified in the [`collections.abc.Mapping`](https://docs.python.org/ko/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping") or [`collections.abc.MutableMapping`](https://docs.python.org/ko/3/library/collections.abc.html#collections.abc.MutableMapping "collections.abc.MutableMapping") [abstract base classes](https://docs.python.org/ko/3/library/collections.abc.html#collections-abstract-base-classes). Examples include [`dict`](https://docs.python.org/ko/3/library/stdtypes.html#dict "dict"), [`collections.defaultdict`](https://docs.python.org/ko/3/library/collections.html#collections.defaultdict "collections.defaultdict"), [`collections.OrderedDict`](https://docs.python.org/ko/3/library/collections.html#collections.OrderedDict "collections.OrderedDict") and [`collections.Counter`](https://docs.python.org/ko/3/library/collections.html#collections.Counter "collections.Counter").



## meta path finder (메타 경로 파인더)[](https://docs.python.org/ko/3/glossary.html#term-meta-path-finder "이 용어에 대한 퍼머링크")

[`sys.meta_path`](https://docs.python.org/ko/3/library/sys.html#sys.meta_path "sys.meta_path") 의 검색이 돌려주는 [파인더](https://docs.python.org/ko/3/glossary.html#term-finder). 메타 경로 파인더는 [경로 엔트리 파인더](https://docs.python.org/ko/3/glossary.html#term-path-entry-finder) 와 관련되어 있기는 하지만 다릅니다.

메타 경로 파인더가 구현하는 메서드들에 대해서는 [`importlib.abc.MetaPathFinder`](https://docs.python.org/ko/3/library/importlib.html#importlib.abc.MetaPathFinder "importlib.abc.MetaPathFinder") 를 보면 됩니다.



## metaclass (메타 클래스)[](https://docs.python.org/ko/3/glossary.html#term-metaclass "이 용어에 대한 퍼머링크")

클래스의 클래스. 클래스 정의는 클래스 이름, 클래스 딕셔너리, 베이스 클래스들의 목록을 만듭니다. 메타 클래스는 이 세 인자를 받아서 클래스를 만드는 책임을 집니다. 대부분의 객체 지향형 프로그래밍 언어들은 기본 구현을 제공합니다. 파이썬을 특별하게 만드는 것은 커스텀 메타 클래스를 만들 수 있다는 것입니다. 대부분 사용자에게는 이 도구가 전혀 필요 없지만, 필요가 생길 때, 메타 클래스는 강력하고 우아한 해법을 제공합니다. 어트리뷰트 액세스의 로깅(logging), 스레드 안전성의 추가, 객체 생성 추적, 싱글톤 구현과 많은 다른 작업에 사용됐습니다.

[메타 클래스](https://docs.python.org/ko/3/reference/datamodel.html#metaclasses) 에서 더 자세한 내용을 찾을 수 있습니다.



## method (메서드)[](https://docs.python.org/ko/3/glossary.html#term-method "이 용어에 대한 퍼머링크")

클래스 바디 안에서 정의되는 함수. 그 클래스의 인스턴스의 어트리뷰트로서 호출되면, 그 메서드는 첫 번째 [인자](https://docs.python.org/ko/3/glossary.html#term-argument) (보통 `self` 라고 불린다) 로 인스턴스 객체를 받습니다. [함수](https://docs.python.org/ko/3/glossary.html#term-function) 와 [중첩된 스코프](https://docs.python.org/ko/3/glossary.html#term-nested-scope) 를 보세요.



## method resolution order (메서드 결정 순서)[](https://docs.python.org/ko/3/glossary.html#term-method-resolution-order "이 용어에 대한 퍼머링크")

메서드 결정 순서는 조회하는 동안 멤버를 검색하는 베이스 클래스들의 순서입니다. 2.3 릴리스부터 파이썬 인터프리터에 사용된 알고리즘의 상세한 내용은 [The Python 2.3 Method Resolution Order](https://www.python.org/download/releases/2.3/mro/)를 보면 됩니다.



## module (모듈)[](https://docs.python.org/ko/3/glossary.html#term-module "이 용어에 대한 퍼머링크")

파이썬 코드의 조직화 단위를 담당하는 객체. 모듈은 임의의 파이썬 객체들을 담는 이름 공간을 갖습니다. 모듈은 [임포팅](https://docs.python.org/ko/3/glossary.html#term-importing) 절차에 의해 파이썬으로 로드됩니다.

[패키지](https://docs.python.org/ko/3/glossary.html#term-package) 도 보세요.



## module spec (모듈 스펙)[](https://docs.python.org/ko/3/glossary.html#term-module-spec "이 용어에 대한 퍼머링크")

모듈을 로드하는데 사용되는 임포트 관련 정보들을 담고 있는 이름 공간. [`importlib.machinery.ModuleSpec`](https://docs.python.org/ko/3/library/importlib.html#importlib.machinery.ModuleSpec "importlib.machinery.ModuleSpec") 의 인스턴스.



## MRO[](https://docs.python.org/ko/3/glossary.html#term-MRO "이 용어에 대한 퍼머링크")

[메서드 결정 순서](https://docs.python.org/ko/3/glossary.html#term-method-resolution-order) 를 보세요.



## mutable (가변)[](https://docs.python.org/ko/3/glossary.html#term-mutable "이 용어에 대한 퍼머링크")

가변 객체는 값이 변할 수 있지만 [`id()`](https://docs.python.org/ko/3/library/functions.html#id "id") 는 일정하게 유지합니다. [불변](https://docs.python.org/ko/3/glossary.html#term-immutable) 도 보세요.



## named tuple (네임드 튜플)[](https://docs.python.org/ko/3/glossary.html#term-named-tuple "이 용어에 대한 퍼머링크")

“named tuple(네임드 튜플)”이라는 용어는 튜플에서 상속하고 이름 붙은 어트리뷰트를 사용하여 인덱스 할 수 있는 요소에 액세스 할 수 있는 모든 형이나 클래스에 적용됩니다. 형이나 클래스에는 다른 기능도 있을 수 있습니다.

[`time.localtime()`](https://docs.python.org/ko/3/library/time.html#time.localtime "time.localtime")과 [`os.stat()`](https://docs.python.org/ko/3/library/os.html#os.stat "os.stat")가 반환한 값을 포함하여, 여러 내장형이 네임드 튜플입니다. 또 다른 예는 [`sys.float_info`](https://docs.python.org/ko/3/library/sys.html#sys.float_info "sys.float_info")입니다:

>>>

>>> sys.float_info[1]                   # indexed access
1024
>>> sys.float_info.max_exp              # named field access
1024
>>> isinstance(sys.float_info, tuple)   # kind of tuple
True

일부 네임드 튜플은 내장형(위의 예)입니다. 또는, [`tuple`](https://docs.python.org/ko/3/library/stdtypes.html#tuple "tuple")에서 상속하고 이름 붙은 필드를 정의하는 일반 클래스 정의로 네임드 튜플을 만들 수 있습니다. 이러한 클래스는 직접 작성하거나 팩토리 함수 [`collections.namedtuple()`](https://docs.python.org/ko/3/library/collections.html#collections.namedtuple "collections.namedtuple")로 만들 수 있습니다. 후자의 기법은 직접 작성하거나 내장 네임드 튜플에서는 찾을 수 없는 몇 가지 추가 메서드를 추가하기도 합니다.



## namespace (이름 공간)[](https://docs.python.org/ko/3/glossary.html#term-namespace "이 용어에 대한 퍼머링크")

변수가 저장되는 장소. 이름 공간은 딕셔너리로 구현됩니다. 객체에 중첩된 이름 공간 (메서드 에서) 뿐만 아니라 지역, 전역, 내장 이름 공간이 있습니다. 이름 공간은 이름 충돌을 방지해서 모듈성을 지원합니다. 예를 들어, 함수 [`builtins.open`](https://docs.python.org/ko/3/library/functions.html#open "open") 과 [`os.open()`](https://docs.python.org/ko/3/library/os.html#os.open "os.open") 은 그들의 이름 공간에 의해 구별됩니다. 또한, 이름 공간은 어떤 모듈이 함수를 구현하는지를 분명하게 만들어서 가독성과 유지 보수성에 도움을 줍니다. 예를 들어, [`random.seed()`](https://docs.python.org/ko/3/library/random.html#random.seed "random.seed") 또는 [`itertools.islice()`](https://docs.python.org/ko/3/library/itertools.html#itertools.islice "itertools.islice") 라고 쓰면 그 함수들이 각각 [`random`](https://docs.python.org/ko/3/library/random.html#module-random "random: Generate pseudo-random numbers with various common distributions.") 과 [`itertools`](https://docs.python.org/ko/3/library/itertools.html#module-itertools "itertools: Functions creating iterators for efficient looping.") 모듈에 의해 구현되었음이 명확해집니다.



## namespace package (이름 공간 패키지)[](https://docs.python.org/ko/3/glossary.html#term-namespace-package "이 용어에 대한 퍼머링크")

오직 서브 패키지들의 컨테이너로만 기능하는 [**PEP 420**](https://peps.python.org/pep-0420/) [패키지](https://docs.python.org/ko/3/glossary.html#term-package). 이름 공간 패키지는 물리적인 실체가 없을 수도 있고, 특히 `__init__.py` 파일이 없으므로 [정규 패키지](https://docs.python.org/ko/3/glossary.html#term-regular-package) 와는 다릅니다.

[모듈](https://docs.python.org/ko/3/glossary.html#term-module) 도 보세요.



## nested scope (중첩된 스코프)[](https://docs.python.org/ko/3/glossary.html#term-nested-scope "이 용어에 대한 퍼머링크")

둘러싼 정의에서 변수를 참조하는 능력. 예를 들어, 다른 함수 내부에서 정의된 함수는 바깥 함수에 있는 변수들을 참조할 수 있습니다. 중첩된 스코프는 기본적으로는 참조만 가능할 뿐, 대입은 되지 않는다는 것에 주의해야 합니다. 지역 변수들은 가장 내부의 스코프에서 읽고 씁니다. 마찬가지로, 전역 변수들은 전역 이름 공간에서 읽고 씁니다. [`nonlocal`](https://docs.python.org/ko/3/reference/simple_stmts.html#nonlocal) 은 바깥 스코프에 쓰는 것을 허락합니다.



## new-style class (뉴스타일 클래스)[](https://docs.python.org/ko/3/glossary.html#term-new-style-class "이 용어에 대한 퍼머링크")

지금은 모든 클래스 객체에 사용되고 있는 클래스 버전의 예전 이름. 초기의 파이썬 버전에서는, 오직 뉴스타일 클래스만 [`__slots__`](https://docs.python.org/ko/3/reference/datamodel.html#object.__slots__ "object.__slots__"), 디스크립터, 프라퍼티, `__getattribute__()`, 클래스 메서드, 스태틱 메서드와 같은 파이썬의 새롭고 다양한 기능들을 사용할 수 있었습니다.



## object (객체)[](https://docs.python.org/ko/3/glossary.html#term-object "이 용어에 대한 퍼머링크")

상태 (어트리뷰트나 값) 를 갖고 동작 (메서드) 이 정의된 모든 데이터. 또한, 모든 [뉴스타일 클래스](https://docs.python.org/ko/3/glossary.html#term-new-style-class) 의 최종적인 베이스 클래스입니다.



## package (패키지)[](https://docs.python.org/ko/3/glossary.html#term-package "이 용어에 대한 퍼머링크")

A Python [module](https://docs.python.org/ko/3/glossary.html#term-module) which can contain submodules or recursively, subpackages. Technically, a package is a Python module with a `__path__` attribute.

[정규 패키지](https://docs.python.org/ko/3/glossary.html#term-regular-package) 와 [이름 공간 패키지](https://docs.python.org/ko/3/glossary.html#term-namespace-package) 도 보세요.



## parameter (매개변수)[](https://docs.python.org/ko/3/glossary.html#term-parameter "이 용어에 대한 퍼머링크")

[함수](https://docs.python.org/ko/3/glossary.html#term-function) (또는 메서드) 정의에서 함수가 받을 수 있는 [인자](https://docs.python.org/ko/3/glossary.html#term-argument) (또는 어떤 경우 인자들) 를 지정하는 이름 붙은 엔티티. 다섯 종류의 매개변수가 있습니다:

- _위치-키워드 (positional-or-keyword)_: [위치 인자](https://docs.python.org/ko/3/glossary.html#term-positional-argument) 나 [키워드 인자](https://docs.python.org/ko/3/glossary.html#term-keyword-argument) 로 전달될 수 있는 인자를 지정합니다. 이것이 기본 형태의 매개변수입니다, 예를 들어 다음에서 _foo_ 와 _bar_:
    
    def func(foo, bar=None): ...
    

- _위치-전용 (positional-only)_: 위치로만 제공될 수 있는 인자를 지정합니다. 위치 전용 매개변수는 함수 정의의 매개변수 목록에 `/` 문자를 포함하고 그 뒤에 정의할 수 있습니다, 예를 들어 다음에서 _posonly1_과 _posonly2_:
    
    def func(posonly1, posonly2, /, positional_or_keyword): ...
    

- _키워드-전용 (keyword-only)_: 키워드로만 제공될 수 있는 인자를 지정합니다. 키워드-전용 매개변수는 함수 정의의 매개변수 목록에서 앞에 하나의 가변-위치 매개변수나 `*`를 그대로 포함해서 정의할 수 있습니다. 예를 들어, 다음에서 _kw_only1_ 와 _kw_only2_:
    
    def func(arg, *, kw_only1, kw_only2): ...
    
- _가변-위치 (var-positional)_: (다른 매개변수들에 의해서 이미 받아들여진 위치 인자들에 더해) 제공될 수 있는 위치 인자들의 임의의 시퀀스를 지정합니다. 이런 매개변수는 매개변수 이름에 `*` 를 앞에 붙여서 정의될 수 있습니다, 예를 들어 다음에서 _args_:
    
    def func(*args, **kwargs): ...
    
- _가변-키워드 (var-keyword)_: (다른 매개변수들에 의해서 이미 받아들여진 키워드 인자들에 더해) 제공될 수 있는 임의의 개수 키워드 인자들을 지정합니다. 이런 매개변수는 매개변수 이름에 `**`를 앞에 붙여서 정의될 수 있습니다, 예를 들어 위의 예에서 _kwargs_.
    

매개변수는 선택적 인자들을 위한 기본값뿐만 아니라 선택적이거나 필수 인자들을 지정할 수 있습니다.

[인자](https://docs.python.org/ko/3/glossary.html#term-argument) 용어집 항목, [인자와 매개변수의 차이](https://docs.python.org/ko/3/faq/programming.html#faq-argument-vs-parameter)에 나오는 FAQ 질문, [`inspect.Parameter`](https://docs.python.org/ko/3/library/inspect.html#inspect.Parameter "inspect.Parameter") 클래스, [함수 정의](https://docs.python.org/ko/3/reference/compound_stmts.html#function) 절, [**PEP 362**](https://peps.python.org/pep-0362/)도 보세요.



## path entry (경로 엔트리)[](https://docs.python.org/ko/3/glossary.html#term-path-entry "이 용어에 대한 퍼머링크")

[경로 기반 파인더](https://docs.python.org/ko/3/glossary.html#term-path-based-finder) 가 임포트 할 모듈들을 찾기 위해 참고하는 [임포트 경로](https://docs.python.org/ko/3/glossary.html#term-import-path) 상의 하나의 장소.



## path entry finder (경로 엔트리 파인더)[](https://docs.python.org/ko/3/glossary.html#term-path-entry-finder "이 용어에 대한 퍼머링크")

[`sys.path_hooks`](https://docs.python.org/ko/3/library/sys.html#sys.path_hooks "sys.path_hooks") 에 있는 콜러블 (즉, [경로 엔트리 훅](https://docs.python.org/ko/3/glossary.html#term-path-entry-hook)) 이 돌려주는 [파인더](https://docs.python.org/ko/3/glossary.html#term-finder) 인데, 주어진 [경로 엔트리](https://docs.python.org/ko/3/glossary.html#term-path-entry) 로 모듈을 찾는 방법을 알고 있습니다.

경로 엔트리 파인더들이 구현하는 메서드들은 [`importlib.abc.PathEntryFinder`](https://docs.python.org/ko/3/library/importlib.html#importlib.abc.PathEntryFinder "importlib.abc.PathEntryFinder") 에 나옵니다.



## path entry hook (경로 엔트리 훅)[](https://docs.python.org/ko/3/glossary.html#term-path-entry-hook "이 용어에 대한 퍼머링크")

`sys.path_hook` 리스트에 있는 콜러블인데, 특정 [경로 엔트리](https://docs.python.org/ko/3/glossary.html#term-path-entry) 에서 모듈을 찾는 법을 알고 있다면 [경로 엔트리 파인더](https://docs.python.org/ko/3/glossary.html#term-path-entry-finder) 를 돌려줍니다.



## path based finder (경로 기반 파인더)[](https://docs.python.org/ko/3/glossary.html#term-path-based-finder "이 용어에 대한 퍼머링크")

기본 [메타 경로 파인더들](https://docs.python.org/ko/3/glossary.html#term-meta-path-finder) 중 하나인데, [임포트 경로](https://docs.python.org/ko/3/glossary.html#term-import-path) 에서 모듈을 찾습니다.



## path-like object (경로류 객체)[](https://docs.python.org/ko/3/glossary.html#term-path-like-object "이 용어에 대한 퍼머링크")

파일 시스템 경로를 나타내는 객체. 경로류 객체는 경로를 나타내는 [`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str") 나 [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes") 객체이거나 [`os.PathLike`](https://docs.python.org/ko/3/library/os.html#os.PathLike "os.PathLike") 프로토콜을 구현하는 객체입니다. [`os.PathLike`](https://docs.python.org/ko/3/library/os.html#os.PathLike "os.PathLike") 프로토콜을 지원하는 객체는 [`os.fspath()`](https://docs.python.org/ko/3/library/os.html#os.fspath "os.fspath") 함수를 호출해서 [`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str") 나 [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes") 파일 시스템 경로로 변환될 수 있습니다; 대신 [`os.fsdecode()`](https://docs.python.org/ko/3/library/os.html#os.fsdecode "os.fsdecode") 와 [`os.fsencode()`](https://docs.python.org/ko/3/library/os.html#os.fsencode "os.fsencode") 는 각각 [`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str") 나 [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes") 결과를 보장하는데 사용될 수 있습니다. [**PEP 519**](https://peps.python.org/pep-0519/)로 도입되었습니다.



## PEP[](https://docs.python.org/ko/3/glossary.html#term-PEP "이 용어에 대한 퍼머링크")

파이썬 개선 제안. PEP는 파이썬 커뮤니티에 정보를 제공하거나 파이썬 또는 그 프로세스 또는 환경에 대한 새로운 기능을 설명하는 설계 문서입니다. PEP는 제안된 기능에 대한 간결한 기술 사양 및 근거를 제공해야 합니다.

PEP는 주요 새로운 기능을 제안하고 문제에 대한 커뮤니티 입력을 수집하며 파이썬에 들어간 설계 결정을 문서로 만들기 위한 기본 메커니즘입니다. PEP 작성자는 커뮤니티 내에서 합의를 구축하고 반대 의견을 문서화 할 책임이 있습니다.

[**PEP 1**](https://peps.python.org/pep-0001/) 참조하세요.



## portion (포션)[](https://docs.python.org/ko/3/glossary.html#term-portion "이 용어에 대한 퍼머링크")

[**PEP 420**](https://peps.python.org/pep-0420/) 에서 정의한 것처럼, 이름 공간 패키지에 이바지하는 하나의 디렉터리에 들어있는 파일들의 집합 (zip 파일에 저장되는 것도 가능합니다).



## positional argument (위치 인자)[](https://docs.python.org/ko/3/glossary.html#term-positional-argument "이 용어에 대한 퍼머링크")

[인자](https://docs.python.org/ko/3/glossary.html#term-argument) 를 보세요.



## provisional API (잠정 API)[](https://docs.python.org/ko/3/glossary.html#term-provisional-API "이 용어에 대한 퍼머링크")

잠정 API는 표준 라이브러리의 과거 호환성 보장으로부터 신중히 제외된 것입니다. 인터페이스의 큰 변화가 예상되지는 않지만, 잠정적이라고 표시되는 한, 코어 개발자들이 필요하다고 생각한다면 과거 호환성이 유지되지 않는 변경이 일어날 수 있습니다. 그런 변경은 불필요한 방식으로 일어나지는 않을 것입니다 — API를 포함하기 전에 놓친 중대하고 근본적인 결함이 발견된 경우에만 일어날 것입니다.

잠정 API에서조차도, 과거 호환성이 유지되지 않는 변경은 “최후의 수단”으로 여겨집니다 - 모든 식별된 문제들에 대해 과거 호환성을 유지하는 해법을 찾으려는 모든 시도가 선행됩니다.

이 절차는 표준 라이브러리가 오랜 시간 동안 잘못된 설계 오류에 발목 잡히지 않고 발전할 수 있도록 만듭니다. 더 자세한 내용은 [**PEP 411**](https://peps.python.org/pep-0411/)을 보면 됩니다.



## provisional package (잠정 패키지)[](https://docs.python.org/ko/3/glossary.html#term-provisional-package "이 용어에 대한 퍼머링크")

[잠정 API](https://docs.python.org/ko/3/glossary.html#term-provisional-API) 를 보세요.



## Python 3000 (파이썬 3000)[](https://docs.python.org/ko/3/glossary.html#term-Python-3000 "이 용어에 대한 퍼머링크")

파이썬 3.x 배포 라인의 별명 (버전 3의 배포가 먼 미래의 이야기던 시절에 만들어진 이름이다.) 이것을 “Py3k” 로 줄여 쓰기도 합니다.



## Pythonic (파이썬다운)[](https://docs.python.org/ko/3/glossary.html#term-Pythonic "이 용어에 대한 퍼머링크")

다른 언어들에서 일반적인 개념들을 사용해서 코드를 구현하는 대신, 파이썬 언어에서 가장 자주 사용되는 이디엄들을 가까이 따르는 아이디어나 코드 조각. 예를 들어, 파이썬에서 자주 쓰는 이디엄은 [`for`](https://docs.python.org/ko/3/reference/compound_stmts.html#for) 문을 사용해서 이터러블의 모든 요소로 루핑하는 것입니다. 다른 많은 언어에는 이런 종류의 구성물이 없으므로, 파이썬에 익숙하지 않은 사람들은 대신에 숫자 카운터를 사용하기도 합니다:

for i in range(len(food)):
    print(food[i])

더 깔끔한, 파이썬다운 방법은 이렇습니다:

for piece in food:
    print(piece)

qualified name (정규화된 이름)[](https://docs.python.org/ko/3/glossary.html#term-qualified-name "이 용어에 대한 퍼머링크")

모듈의 전역 스코프에서 모듈에 정의된 클래스, 함수, 메서드에 이르는 “경로”를 보여주는 점으로 구분된 이름. [**PEP 3155**](https://peps.python.org/pep-3155/) 에서 정의됩니다. 최상위 함수와 클래스의 경우에, 정규화된 이름은 객체의 이름과 같습니다:

>>>

>>> class C:
...     class D:
...         def meth(self):
...             pass
...
>>> C.__qualname__
'C'
>>> C.D.__qualname__
'C.D'
>>> C.D.meth.__qualname__
'C.D.meth'

모듈을 가리키는데 사용될 때, _완전히 정규화된 이름(fully qualified name)_은 모든 부모 패키지들을 포함해서 모듈로 가는 점으로 분리된 이름을 의미합니다, 예를 들어, `email.mime.text`:

>>>

>>> import email.mime.text
>>> email.mime.text.__name__
'email.mime.text'



## reference count (참조 횟수)[](https://docs.python.org/ko/3/glossary.html#term-reference-count "이 용어에 대한 퍼머링크")

The number of references to an object. When the reference count of an object drops to zero, it is deallocated. Some objects are “immortal” and have reference counts that are never modified, and therefore the objects are never deallocated. Reference counting is generally not visible to Python code, but it is a key element of the [CPython](https://docs.python.org/ko/3/glossary.html#term-CPython) implementation. Programmers can call the [`sys.getrefcount()`](https://docs.python.org/ko/3/library/sys.html#sys.getrefcount "sys.getrefcount") function to return the reference count for a particular object.



## regular package (정규 패키지)[](https://docs.python.org/ko/3/glossary.html#term-regular-package "이 용어에 대한 퍼머링크")

`__init__.py` 파일을 포함하는 디렉터리와 같은 전통적인 [패키지](https://docs.python.org/ko/3/glossary.html#term-package).

[이름 공간 패키지](https://docs.python.org/ko/3/glossary.html#term-namespace-package) 도 보세요.



## \__slots__[](https://docs.python.org/ko/3/glossary.html#term-__slots__ "이 용어에 대한 퍼머링크")

클래스 내부의 선언인데, 인스턴스 어트리뷰트들을 위한 공간을 미리 선언하고 인스턴스 딕셔너리를 제거함으로써 메모리를 절감하는 효과를 줍니다. 인기 있기는 하지만, 이 테크닉은 올바르게 사용하기가 좀 까다로운 편이라서, 메모리에 민감한 응용 프로그램에서 많은 수의 인스턴스가 있는 특별한 경우로 한정하는 것이 좋습니다.



## sequence (시퀀스)[](https://docs.python.org/ko/3/glossary.html#term-sequence "이 용어에 대한 퍼머링크")

`__getitem__()` 특수 메서드를 통해 정수 인덱스를 사용한 빠른 요소 액세스를 지원하고, 시퀀스의 길이를 돌려주는 `__len__()` 메서드를 정의하는 [이터러블](https://docs.python.org/ko/3/glossary.html#term-iterable). 몇몇 내장 시퀀스들을 나열해보면, [`list`](https://docs.python.org/ko/3/library/stdtypes.html#list "list"), [`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str"), [`tuple`](https://docs.python.org/ko/3/library/stdtypes.html#tuple "tuple"), [`bytes`](https://docs.python.org/ko/3/library/stdtypes.html#bytes "bytes") 가 있습니다. [`dict`](https://docs.python.org/ko/3/library/stdtypes.html#dict "dict") 또한 `__getitem__()` 과 `__len__()` 을 지원하지만, 조회에 정수 대신 임의의 [불변](https://docs.python.org/ko/3/glossary.html#term-immutable) 키를 사용하기 때문에 시퀀스가 아니라 매핑으로 취급된다는 것에 주의해야 합니다.

[`collections.abc.Sequence`](https://docs.python.org/ko/3/library/collections.abc.html#collections.abc.Sequence "collections.abc.Sequence") 추상 베이스 클래스는 `__getitem__()` 과 `__len__()`을 넘어서 훨씬 풍부한 인터페이스를 정의하는데, `count()`, `index()`, `__contains__()`, `__reversed__()`를 추가합니다. 이 확장된 인터페이스를 구현한 형을 [`register()`](https://docs.python.org/ko/3/library/abc.html#abc.ABCMeta.register "abc.ABCMeta.register")를 사용해서 명시적으로 등록할 수 있습니다.



## set comprehension (집합 컴프리헨션)[](https://docs.python.org/ko/3/glossary.html#term-set-comprehension "이 용어에 대한 퍼머링크")

이터러블에 있는 요소 전체나 일부를 처리하고 결과를 담은 집합을 반환하는 간결한 방법. `results = {c for c in 'abracadabra' if c not in 'abc'}`는 문자열의 집합 `{'r', 'd'}`를 생성합니다. [리스트, 집합, 딕셔너리의 디스플레이(display)](https://docs.python.org/ko/3/reference/expressions.html#comprehensions)을 참조하십시오.



## single dispatch (싱글 디스패치)[](https://docs.python.org/ko/3/glossary.html#term-single-dispatch "이 용어에 대한 퍼머링크")

구현이 하나의 인자의 형에 기초해서 결정되는 [제네릭 함수](https://docs.python.org/ko/3/glossary.html#term-generic-function) 디스패치의 한 형태.



## slice (슬라이스)[](https://docs.python.org/ko/3/glossary.html#term-slice "이 용어에 대한 퍼머링크")

보통 [시퀀스](https://docs.python.org/ko/3/glossary.html#term-sequence) 의 일부를 포함하는 객체. 슬라이스는 서브 스크립트 표기법을 사용해서 만듭니다. `variable_name[1:3:5]` 처럼, `[]` 안에서 여러 개의 숫자를 콜론으로 분리합니다. 대괄호 (서브 스크립트) 표기법은 내부적으로 [`slice`](https://docs.python.org/ko/3/library/functions.html#slice "slice") 객체를 사용합니다.



## special method (특수 메서드)[](https://docs.python.org/ko/3/glossary.html#term-special-method "이 용어에 대한 퍼머링크")

파이썬이 형에 어떤 연산을, 덧셈 같은, 실행할 때 묵시적으로 호출되는 메서드. 이런 메서드는 두 개의 밑줄로 시작하고 끝나는 이름을 갖고 있습니다. 특수 메서드는 [특수 메서드 이름들](https://docs.python.org/ko/3/reference/datamodel.html#specialnames) 에 문서로 만들어져 있습니다.



## statement (문장)[](https://docs.python.org/ko/3/glossary.html#term-statement "이 용어에 대한 퍼머링크")

문장은 스위트 (코드의 “블록(block)”) 를 구성하는 부분입니다. 문장은 [표현식](https://docs.python.org/ko/3/glossary.html#term-expression) 이거나 키워드를 사용하는 여러 가지 구조물 중의 하나입니다. 가령 [`if`](https://docs.python.org/ko/3/reference/compound_stmts.html#if), [`while`](https://docs.python.org/ko/3/reference/compound_stmts.html#while), [`for`](https://docs.python.org/ko/3/reference/compound_stmts.html#for).



## strong reference[](https://docs.python.org/ko/3/glossary.html#term-strong-reference "이 용어에 대한 퍼머링크")

In Python’s C API, a strong reference is a reference to an object which is owned by the code holding the reference. The strong reference is taken by calling [`Py_INCREF()`](https://docs.python.org/ko/3/c-api/refcounting.html#c.Py_INCREF "Py_INCREF") when the reference is created and released with [`Py_DECREF()`](https://docs.python.org/ko/3/c-api/refcounting.html#c.Py_DECREF "Py_DECREF") when the reference is deleted.

The [`Py_NewRef()`](https://docs.python.org/ko/3/c-api/refcounting.html#c.Py_NewRef "Py_NewRef") function can be used to create a strong reference to an object. Usually, the [`Py_DECREF()`](https://docs.python.org/ko/3/c-api/refcounting.html#c.Py_DECREF "Py_DECREF") function must be called on the strong reference before exiting the scope of the strong reference, to avoid leaking one reference.

See also [borrowed reference](https://docs.python.org/ko/3/glossary.html#term-borrowed-reference).



## text encoding (텍스트 인코딩)[](https://docs.python.org/ko/3/glossary.html#term-text-encoding "이 용어에 대한 퍼머링크")

A string in Python is a sequence of Unicode code points (in range `U+0000`–`U+10FFFF`). To store or transfer a string, it needs to be serialized as a sequence of bytes.

Serializing a string into a sequence of bytes is known as “encoding”, and recreating the string from the sequence of bytes is known as “decoding”.

There are a variety of different text serialization [codecs](https://docs.python.org/ko/3/library/codecs.html#standard-encodings), which are collectively referred to as “text encodings”.



## text file (텍스트 파일)[](https://docs.python.org/ko/3/glossary.html#term-text-file "이 용어에 대한 퍼머링크")

[`str`](https://docs.python.org/ko/3/library/stdtypes.html#str "str") 객체를 읽고 쓸 수 있는 [파일 객체](https://docs.python.org/ko/3/glossary.html#term-file-object). 종종, 텍스트 파일은 실제로는 바이트 지향 데이터스트림을 액세스하고 [텍스트 인코딩](https://docs.python.org/ko/3/glossary.html#term-text-encoding) 을 자동 처리합니다. 텍스트 파일의 예로는 텍스트 모드 (`'r'` 또는 `'w'`) 로 열린 파일, [`sys.stdin`](https://docs.python.org/ko/3/library/sys.html#sys.stdin "sys.stdin"), [`sys.stdout`](https://docs.python.org/ko/3/library/sys.html#sys.stdout "sys.stdout"), [`io.StringIO`](https://docs.python.org/ko/3/library/io.html#io.StringIO "io.StringIO") 의 인스턴스를 들 수 있습니다.

[바이트열류 객체](https://docs.python.org/ko/3/glossary.html#term-bytes-like-object) 를 읽고 쓸 수 있는 파일 객체에 대해서는 [바이너리 파일](https://docs.python.org/ko/3/glossary.html#term-binary-file) 도 참조하세요.



## triple-quoted string (삼중 따옴표 된 문자열)[](https://docs.python.org/ko/3/glossary.html#term-triple-quoted-string "이 용어에 대한 퍼머링크")

따옴표 (”) 나 작은따옴표 (’) 세 개로 둘러싸인 문자열. 그냥 따옴표 하나로 둘러싸인 문자열에 없는 기능을 제공하지는 않지만, 여러 가지 이유에서 쓸모가 있습니다. 이스케이프 되지 않은 작은따옴표나 큰따옴표를 문자열 안에 포함할 수 있도록 하고, 연결 문자를 쓰지 않고도 여러 줄에 걸칠 수 있는데, 독스트링을 쓸 때 특히 쓸모 있습니다.



## type (형)[](https://docs.python.org/ko/3/glossary.html#term-type "이 용어에 대한 퍼머링크")

파이썬 객체의 형은 그것이 어떤 종류의 객체인지를 결정합니다; 모든 객체는 형이 있습니다. 객체의 형은 [`__class__`](https://docs.python.org/ko/3/library/stdtypes.html#instance.__class__ "instance.__class__") 어트리뷰트로 액세스할 수 있거나 `type(obj)`로 얻을 수 있습니다.

type alias (형 에일리어스)[](https://docs.python.org/ko/3/glossary.html#term-type-alias "이 용어에 대한 퍼머링크")

형을 식별자에 대입하여 만들어지는 형의 동의어.

형 에일리어스는 [형 힌트](https://docs.python.org/ko/3/glossary.html#term-type-hint)를 단순화하는 데 유용합니다. 예를 들면:

def remove_gray_shades(
        colors: list[tuple[int, int, int]]) -> list[tuple[int, int, int]]:
    pass

는 다음과 같이 더 읽기 쉽게 만들 수 있습니다:

Color = tuple[int, int, int]

def remove_gray_shades(colors: list[Color]) -> list[Color]:
    pass

이 기능을 설명하는 [`typing`](https://docs.python.org/ko/3/library/typing.html#module-typing "typing: Support for type hints (see :pep:`484`).")과 [**PEP 484**](https://peps.python.org/pep-0484/)를 참조하세요.

type hint (형 힌트)[](https://docs.python.org/ko/3/glossary.html#term-type-hint "이 용어에 대한 퍼머링크")

변수, 클래스 어트리뷰트 및 함수 매개변수 나 반환 값의 기대되는 형을 지정하는 [어노테이션](https://docs.python.org/ko/3/glossary.html#term-annotation).

형 힌트는 선택 사항이며 파이썬에서 강제되지는 않습니다. 하지만, 정적 형 분석 도구에 유용하며 IDE의 코드 완성 및 리팩토링을 돕습니다.

지역 변수를 제외하고, 전역 변수, 클래스 어트리뷰트 및 함수의 형 힌트는 [`typing.get_type_hints()`](https://docs.python.org/ko/3/library/typing.html#typing.get_type_hints "typing.get_type_hints")를 사용하여 액세스할 수 있습니다.

이 기능을 설명하는 [`typing`](https://docs.python.org/ko/3/library/typing.html#module-typing "typing: Support for type hints (see :pep:`484`).")과 [**PEP 484**](https://peps.python.org/pep-0484/)를 참조하세요.



## universal newlines (유니버설 줄 넘김)[](https://docs.python.org/ko/3/glossary.html#term-universal-newlines "이 용어에 대한 퍼머링크")

다음과 같은 것들을 모두 줄의 끝으로 인식하는, 텍스트 스트림을 해석하는 태도: 유닉스 개행 문자 관례 `'\n'`, 윈도우즈 관례 `'\r\n'`, 예전의 매킨토시 관례 `'\r'`. 추가적인 사용에 관해서는 [`bytes.splitlines()`](https://docs.python.org/ko/3/library/stdtypes.html#bytes.splitlines "bytes.splitlines") 뿐만 아니라 [**PEP 278**](https://peps.python.org/pep-0278/) 와 [**PEP 3116**](https://peps.python.org/pep-3116/) 도 보세요.



## variable annotation (변수 어노테이션)[](https://docs.python.org/ko/3/glossary.html#term-variable-annotation "이 용어에 대한 퍼머링크")

변수 또는 클래스 어트리뷰트의 [어노테이션](https://docs.python.org/ko/3/glossary.html#term-annotation).

변수 또는 클래스 어트리뷰트에 어노테이션을 달 때 대입은 선택 사항입니다:

class C:
    field: 'annotation'

변수 어노테이션은 일반적으로 [형 힌트](https://docs.python.org/ko/3/glossary.html#term-type-hint)로 사용됩니다: 예를 들어, 이 변수는 [`int`](https://docs.python.org/ko/3/library/functions.html#int "int") 값을 가질 것으로 기대됩니다:

count: int = 0

변수 어노테이션 문법은 섹션 [어노테이트된 대입문(Annotated assignment statements)](https://docs.python.org/ko/3/reference/simple_stmts.html#annassign) 에서 설명합니다.

See [function annotation](https://docs.python.org/ko/3/glossary.html#term-function-annotation), [**PEP 484**](https://peps.python.org/pep-0484/) and [**PEP 526**](https://peps.python.org/pep-0526/), which describe this functionality. Also see [Annotations Best Practices](https://docs.python.org/ko/3/howto/annotations.html#annotations-howto) for best practices on working with annotations.



## virtual environment (가상 환경)[](https://docs.python.org/ko/3/glossary.html#term-virtual-environment "이 용어에 대한 퍼머링크")

파이썬 사용자와 응용 프로그램이, 같은 시스템에서 실행되는 다른 파이썬 응용 프로그램들의 동작에 영향을 주지 않으면서, 파이썬 배포 패키지들을 설치하거나 업그레이드하는 것을 가능하게 하는, 협력적으로 격리된 실행 환경.

[`venv`](https://docs.python.org/ko/3/library/venv.html#module-venv "venv: Creation of virtual environments.") 도 보세요.

virtual machine (가상 기계)[](https://docs.python.org/ko/3/glossary.html#term-virtual-machine "이 용어에 대한 퍼머링크")

소프트웨어만으로 정의된 컴퓨터. 파이썬의 가상 기계는 바이트 코드 컴파일러가 출력하는 [바이트 코드](https://docs.python.org/ko/3/glossary.html#term-bytecode)를 실행합니다.



## Zen of Python (파이썬 젠)[](https://docs.python.org/ko/3/glossary.html#term-Zen-of-Python "이 용어에 대한 퍼머링크")

파이썬 디자인 원리와 철학들의 목록인데, 언어를 이해하고 사용하는 데 도움이 됩니다. 이 목록은 대화형 프롬프트에서 “`import this`” 를 입력하면 보입니다.

