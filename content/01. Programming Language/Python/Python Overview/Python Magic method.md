---
title: Python Magic method
date: 2024-09-17
draft: false
tags:
  - Python
complete: true
---
**이미 파이썬 내에 정의되어 있고, 클래스 내부에서 매직 메소드들을 오버라이딩 하여 사용**할 수 있습니다. 또한 **직접 호출해서 사용하지 않고, 정해진 규칙에 따라 알아서 호출된다는 특징**이 있습니다.

## 어디에 쓸까?

우선 매직 메소드를 제대로 이해하기 전에 알고 넘어가야 할 것이 하나 있습니다.

**파이썬에 존재하는 타입들은 사실 모두 클래스**라는 점입니다.

```python
print(int)     <class 'int'>
print(float)   <class 'float'>
print(str)     <class 'str'>
print(list)    <class 'list'>
print(tuple)   <class 'tuple'>
print(dict)    <class 'dict'>
```

따라서 **우리가 사용하는 데이터들은 해당되는 타입 클래스의 인스턴스**라고 할 수 있습니다.

뭔가 이상하지 않나요? 우리는 일상적으로 자료형끼리 연산을 사용하고 있습니다.

데이터가 클래스의 인스턴스라면, **어떻게 인스턴스끼리 더하고(+) 빼는(-)등 연산을 할 수 있을까요?**

**이것을 가능하게 해 주는 것이 매직 메소드의 힘**입니다. 미리 구현된 __add__, __sub__와 같은 **매직 메소드들이 연산자에 따라 자동으로 호출**되는 것입니다.

```python
print(dir(int))
# 실제로 int클래스에 dir을 사용해보면 수많은 매직 메소드가 반겨준다.
['__abs__', '__add__', '__and__', '__bool__', '__ceil__', '__class__', '__delattr__', 
'__dir__', '__divmod__', '__doc__', '__eq__', '__float__', '__floor__', '__floordiv__',
'__format__', '__ge__', '__getattribute__', '__getnewargs__', '__gt__', '__hash__', 
'__index__', '__init__', '__init_subclass__', '__int__', '__invert__', '__le__',
 '__lshift__', '__lt__', '__mod__', '__mul__', '__ne__', '__neg__', '__new__', '__or__', 
'__pos__', '__pow__', '__radd__', '__rand__', '__rdivmod__', '__reduce__', '__reduce_ex__',
 '__repr__', '__rfloordiv__', '__rlshift__', '__rmod__', '__rmul__', '__ror__', '__round__',
 '__rpow__', '__rrshift__', '__rshift__', '__rsub__', '__rtruediv__', '__rxor__', '__setattr__',
 '__sizeof__', '__str__', '__sub__', '__subclasshook__', '__truediv__', '__trunc__', '__xor__',
 'as_integer_ratio', 'bit_count', 'bit_length', 'conjugate', 'denominator', 'from_bytes', 'imag', 
'numerator', 'real', 'to_bytes']
```

즉 1+1 과 같은 연산을 하게 되면 내부적으로 int 클래스 내에 구현되어있는 __add__ 매직 메소드가 호출되어 미리 정의된 기능을 수행하는 거라고 생각하시면 됩니다. (자세한 예시는 아래에서 다루겠습니다.)​

물론 매직 메소드가 연산만을 위해 존재하진 않습니다. 매직 메소드는 많은 종류가 존재하며 사용 목적에 따라 알맞은 메소드를 구현해서 사용하시면 됩니다. 대표적으로 자주 보는 **__init__ 메소드도 매직 메소드**입니다.

---

## 종류

종류가 꽤 많으니 대표적으로 몇 가지만 기술하겠습니다.
### **__new__**
- 객체를 생성할 때 가장 먼저 실행되는 메소드입니다. init__보다 먼저 실행되는게 특징이고 새로 생성된 객체를 반환합니다. **첫 번째 인자로 클래스 자신이 넘어옵니다. 특수한 상황이 아니면 잘 사용하지 않는 메소드 입니다.**


### **__init__**
- 우리가 **보통 생성자라고 부르는 메소드**입니다. __new__ 메소드로 인해 객체가 생성되고 나면 호출됩니다. **데이터를 초기화 하는등의 목적으로 사용**합니다.

### **__del__**
- **객체가 소멸될 때 호출**됩니다.

### **__str__, __repr__**
- **객체의 문자열 표현을 위해 사용**됩니다.

### **__iter__**

- **iterable한 객체를 만들때 사용**합니다. 이 메소드가 구현되었다면 그 객체는 iterable하다고 합니다.

### **__next__**

- **iterator를 만들 때 사용**합니다. 위의 __iter__메소드와 같이 구현하면 그 객체는 iterable한 iterator가 됩니다.

​

### **__len__**

- **객체의 길이를 반환할 때 사용**합니다. len()함수가 내부적으로 객체의 이 메소드를 호출합니다.

​

### **__bool__**

- **객체의 boolean 표현을 나타낼 때 사용**합니다.

​

### **__add__, __sub__, __mul__, __truediv__**

- 각각 **+, -, *, / 기호에 매핑되어 해당 연산을 할 때 호출**됩니다.

​

이 외에도 많은 종류의 매직 메소드가 존재하니 한번쯤 찾아보시길 권합니다.

---

### **예제**

간단하게 사용법을 익히기 위해 커스텀 클래스를 만들고, 그 클래스의 인스턴스로 사칙연산을 할 수 있게 만들어 봅시다.

```python
class Fruit(object):
    def __init__(self, name, price):
        self._name = name
        self._price = price
        

apple = Fruit("사과", 100000)
durian = Fruit("두리안", 50000)
print(apple + durian) # TypeError 발생
print(apple._price + durian._price) # 작동은 하지만..
```

우선 Fruit 라는 클래스를 만들고, 속성으로 _name과 _price를 지정해 주었습니다. 그리고 해당 클래스의 인스턴스, apple과 durian을 만들었습니다.

하지만 아직 과일 객체끼리 연산을 할 수는 없습니다. 직접 속성에 접근하여 연산을 할 순 있지만, 매번 그러기엔 너무 번거롭습니다. 알아서 _price 속성을 기준으로 사칙연산이 된다면 참 좋을 것 같은데 말이죠..

매직 메소드 구현으로 이를 가능하게 해 봅시다.

```python
class Fruit(object):
    def __init__(self, name, price):
        self._name = name
        self._price = price

    def __add__(self, target):
        return self._price + target._price

    def __sub__(self, target):
        return self._price - target._price

    def __mul__(self, target):
        return self._price * target._price

    def __truediv__(self, target):
        return self._price / target._price


apple = Fruit("사과", 100000)
durian = Fruit("두리안", 50000)

print(apple + durian) # 150000
print(apple - durian) # 50000
print(apple * durian) # 5000000000
print(apple / durian) # 2.0
print(f"{apple}와 {durian}") # 사과와 두리안
```

각각 연산자에 매핑되는 매직 메소드들을 구현했습니다. 따라서 **직접 객체끼리 연산을 하더라도 알아서 _price 속성을 기준으로 연산**하는것을 볼 수 있습니다.

덤으로 **__str__메소드도 구현하여 객체의 문자열 표현을 _name 속성**으로 해 주었습니다.

이렇게 필요한 연산이나 상황에 맞게 매직 메소드를 구현하면 객체를 좀 더 멋지게 다룰 수 있습니다.