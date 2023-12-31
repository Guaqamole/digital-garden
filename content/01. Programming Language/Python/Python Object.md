---
title: Python Object
date: 2023-10-17
draft: false
tags:
  - Python
  - OOP
  - Concept
complete:
---
[# 파이썬은 객체로 이루어져있다.

파이썬은 모든것이 객체로 이뤄져있습니다. 
> 대체 객체가 뭔가요? 아직 아무것도 배운게 없는데..?

*객체란 무엇일까요?*

___

# 객체란?

파이썬은 모든것이 객체입니다.

객체(object)란 무엇일까요?

파이썬 용어설명집(Python Glossary)은 다음과 같이 이야기합니다.

> Python Glossary : https://docs.python.org/3/glossary.html  
> 파이썬 공식홈페이지에서 여러분이 자주 확인해야 될 페이지 중 하나입니다.  
> 익숙하지 않아서, 혹은 다른 프로그래밍 언어를 통해배운 개념과 혼동되서, 혹은 잘못배워서  
> 파이썬내에서 사용되는 어떤 용어에 대해서 잘못 이해하고 있게되는 경우가 있습니다.  
> 개념이 명확하지 않은 용어가 있으면 공식홈페이지 용어집에서 꼭 확인하는 습관을 기르시기 바랍니다.

**object**

```csharp
Any data with state (attributes or value) and defined behavior (methods).    
Also the ultimate base class of any new-style class.
```

객체는 어떠한 속성값과 행동을 가지고 있는 데이터입니다.

파이썬의 모든것들(숫자, 문자, 함수 등)은 여러 속성과 행동을 가지고 있는 데이터입니다.

실제 세상에서도 object는 그 본연의 추상적인 개념만 가지고 있는것이 아니라, 다양한 정보와 행동을 가지고 있습니다.

자동차를 가지고 한번 생각을 해보겠습니다.

자동차를 `원동기를 장치하여 그 동력으로 바퀴를 굴려서 철길이나 가설된 선에 의하지 아니하고 땅 위를 움직이도록 만든 차.` 라는 사전적 의미만을 담는것이 아니라

내가 탈 수 있고, 앞으로 뒤로 움직이는 행동을 할 수 있고 차 앞뒤에 있는 차량번호 정보와 디자인과 제조사, 모델명 정보도 있습니다.

이러한 정보와 행위를 묶은 데이터를 하나의 자동차 객체로 볼 수 있습니다.

![object_car](https://wikidocs.net/images/page/20457/1.png)

자동차라는 객체를 위와 같이 그림과 텍스트로 표현해보면, 자동차 그 자체로 정보가 있고(제조사 정보, 차량 번호, 차량 크기), 행위가 있습니다(앞으로 이동, 멈추기)

`뭐지? 당연한 소리를 하네?` 라고 생각하실 수 있습니다.

그럼 추상적인 개념으로 생각을 해보겠습니다.

문자 'a'는 파이썬에서 다음과 같이 객체화 시킵니다.

![object_str](https://wikidocs.net/images/page/20457/2.png)

> 일부분만 나타냈습니다. 파이썬은 문자 객체에 더 많은 속성과 행동을 넣어둡니다.

파이썬에서는 단순하게 'a'라는 문자를 표현하는것으로 끝내는게 아니라, 'a'라는 문자 자체를 객체로 만들고 다양항 속성과 행동을 넣어뒀습니다.

이러한 객체들이 가진 속성중에 상태들은 value, 또는 attribute라고 부릅니다. 또 객체가 가진 행동들은 method라고 부릅니다.

> 이러한 프로그래밍 기법을 **객체지향프로그래밍**이라고 합니다.
> 
> **객체지향프로그래밍**은 컴퓨터 프로그램으로 해결해야하는 문제를 실제 세상에서 처럼 다양항 정보들을 가진 객체들로 표현하고, 그 객체들간 통신으로 해결하는 기법입니다.
> 
> 파이썬은 객체로 구성되어있고 객체지향 프로그래밍을 가능하게하는 언어이면서, **객체지향프로그래밍**을 강제하지 않는 프로그래밍 언어입니다.

모든것이 단순히 값이나, 하나의 정보가 아닌 객체로 취급하는 파이썬에 특성은 많은 장점을 가집니다.

___

# 객체의 타입

## 객체의 타입

파이썬에서 모든것은 객체입니다.

객체는 각각의 타입이 존재합니다.

파이썬에서는 객체는 타입별로 동일한 속성과 행동을 가집니다.

### 타입

파이썬에서 객체의 타입은 객체를 만든 클래스를 이야기합니다.

객체는 클래스를 통해서 생성됩니다.

클래스의 개념을 보다 명확히 이해하는건 클래스를 직접만들때로 잠시 미뤄두고, 객체를 이해하는데 초점을 두도록 하겠습니다.

클래스에 대한 이해는 '객체는 클래스로 만드는구나' 하는 개념과, '객체의 타입이란 객체를 만든 클래스를 이야기한다' 라는 정도만 이해하고 계시면 충분합니다.

![타입설명](https://wikidocs.net/images/page/21719/3.png)

클래스를 만드다는건, 새로운 타입을 만드는 겁니다.

클래스는 클래스를 통해 생성할 객체들의 속성과 행동(메소드)들을 정의하는 공간이기도 합니다.

객체끼리 서로 같은 타입을 가진다면 같은 속성과 행동(메소드)을 가지게 됩니다.

### 클래스

객체의 타입은 어떤 클래스로 만들어졌느냐로 결정된다고 했습니다.

클래스는 객체를 만드는 틀입니다.

클래스를 통해서 객체가 가질 속성과 메소드를 결정합니다.

클래스로 객체를 생성하면, 생성한 객체들은 클래스에서 지정한 속성과 메소드를 가집니다.

![객체를만드는틀클래스](https://wikidocs.net/images/page/21719/4.png)

> 우리는 후반부에 클래스를 직접 만들어 볼겁니다.

마지막 편집일시 : 2018년 9월 4일 12:30 오전](<C에서 변수가 저장되는 방식 : 변수 = 메모리
C에서 특정한 값이 변수에 저장되는 방식은 간단하다. 예를 들어, 아래와 같은 C코드가 작성되어 있다고 하자.

// C 코드
int a = 5;
int b = a;
코드를 실행하는 세부 과정은 다음과 같다.

int 4바이트 만큼의 메모리를 할당하고 a라는 이름을 붙인다 (컴퓨터는 a를 방금 할당한 메모리의 주소로 기억한다.)
변수 a 자리에 5를 저장한다. (0x5의 형태로 4바이트만큼 사용할 것이다.)
int 4바이트 만큼의 메모리를 다시 할당하고 b라는 이름을 붙인다.
변수 a에 있는 값을 꺼내서(당연히 5일 것이다) 변수 b에 저장한다.
이렇듯 C코드에서의 변수는 메모리를 직접적으로 나타내고, 변수의 값은 할당한 메모리에 저장되어 있는 실제 값을 나타낸다. 그런데 파이썬에서는 변수를 다른 방식으로 관리한다고 한다!

파이썬에서 변수가 저장되는 방식 : Everything is Object
파이썬에서는 모든 것(부울, 정수, 실수, 문자열, 데이터 구조, 함수, 프로그램)이 객체(Object)로 구현되어 있다. … 파이썬 변수의 핵심을 살펴보자. 변수는 단지 이름일 뿐이다. 할당한다는 의미는 값을 복사하는 것이 아니다. 데이터가 담긴 객체에 그냥 이름을 붙이는 것이다. 그 이름은 객체 자신에 포함되는 것이라기보다는 객체의 참조다. 이름을 포스트잇처럼 생각하자. (Introducing Python p.42-43)

간단히 말해 5라고 하는 값이 사실은 객체였다는 것이다. 정수는 정수 클래스의 객체로, 문자열은 문자열 클래스의 객체로, 모든 변수와 값들이 사실은 객체로 다루어지고 있다는 것이다. C에서는 변수 a에 5라는 값을 저장하고, 변수 b에 변수 a의 값을 대입하면, 5라는 값이 “복사”되었다. 그런데 파이썬에서는 변수가 자신만을 위한 메모리를 가지는 것이 아니라 5라는 값을 가진 객체를 가리키도록 되어있다는 것이다.

# 파이썬 코드
a = 5
b = a
같은 로직의 위 코드를 실행하면 5라는 값을 가지는 정수 객체가 생기고, 변수 a와 변수 b는 단지 정수 5 객체의 주소를 참조하게 되는 것이다. 이 과정에 대해서 더 자세히 설명하고 있는 블로그의 설명을 들여다봐보자.

[Why python is Slow:Looking Under the Hood](http://jakevdp.github.io/blog/2014/05/09/why-python-is-slow/)

위 블로그 글에서는 파이썬 코드가 일반적으로 왜 느린지에 대해서 설명하면서 자연스럽게 파이썬에서 변수가 어떤 식으로 관리되고 있는지에 대해서 힌트를 준다.

정수(실수, 문자열 등) 클래스는 어떻게 생겼을까?
파이썬의 변수는 특정 값을 가지는 객체의 참조라고 이야기했다. 그렇다면 그 객체는 어떤 정보들을 담고 있어야 할까?

value : 5라는 정수 값, 혹은 5.0 실수값, ‘string’이라는 문자열 값 등 이 객체가 나타내는 값을 지니고 있어야 한다.
data type : 알다시피 파이썬에서는 변수를 선언하고 초기화할 때 변수의 데이터 타입을 명시하지 않는다. 그렇기 때문에 연산을 할 때마다 해당 변수가 어떤 타입의 데이터인지 확인해야 값은 ‘+’ 연산을 하더라도 덧셈을 할 것인지, 문자열 이어붙이기를 할 것인지 수행하는 작업이 달라질 수 있다.
reference count : 몇 개의 변수가 나를 사용하고 있는지 알아야 한다. 아무도 나를 사용하지 않는다면 굳이 메모리를 차지하면서 있을 필요가 없을테니까.
생각나는 속성들은 이 정도인데 실제 파이썬 코드에도 이렇게 구현이 되어 있을까 궁금하다. 위 블로그 글의 Digging into Python Integers 부분을 보면 실제 파이썬 C API 쪽에 구현되어 있는 클래스들을 분해하여 설명하고 있다.

```c
// Include/longintrepr.h
// 정수 타입을 나타내는 클래스(struct)
struct _longobject {
	PyObject_VAR_HEAD
	digit ob_digit[1];
};

// Include/object.h
typedef struct {
    PyObject ob_base;
    Py_ssize_t ob_size; /* Number of items in variable part */
} PyVarObject;

typedef struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
} PyObject;

// 위 struct와 typedef를 합치고 당장 이해하기 어려운 정보들을 빼면 실제로 아래와 같다.
struct _longobject {
    long ob_refcnt;
    PyTypeObject *ob_type;
    size_t ob_size;
    long ob_digit[1];
};
```
위에서 추측했던대로 reference count(ob_refcnt), object type(ob_type), value(ob_digit), 그리고 하나 데이터의 사이즈(ob_size)의 속성을 담고 있다.

그리고 같은 값(255보다 작은)을 나타내는 변수가 생성되면 새로운 값을 가진 객체를 또 만들어내는 것이 아니라, singleton으로 이미 있는 객체를 리턴하고 reference count를 하나 증가시킨다.

```
x = 42
y = 42
id(x) == id(y)
```
id()는 객체의 주소값을 리턴하는 함수이다. 위의 코드를 실행하면 변수 x, y 모두 42 값을 가지기 때문에 42 객체의 주소 값이 리턴되고 True가 출력될 것이다.