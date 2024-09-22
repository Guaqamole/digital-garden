---
title: Python MRO
date: 2024-09-17
draft: false
tags:
  - Python
complete: true
---
> [!note] Method Resolution Order
> 파이썬의 상속과 관련있는 개념입니다. 직역하자면 **'메소드 결정 순서'** 정도가 되겠네요.
파이썬은 **기본적으로 다중 상속을 지원**합니다. 상속받은 부모 클래스가 서로 겹치지 않는 메소드 네임을 가지고 있다면 딱히 문제될 것이 없습니다. 하지만 만약 부모 클래스들이 똑같은 이름의 메소드를 가지고 있다면 이름부터 무시무시한 **죽음의 다이아몬드(the Deadly Diamond of Death) 문제**가 발생하게 됩니다.

### 죽음의 다이아몬드
![|550](https://i.imgur.com/W9WyEgW.png)

\죽음의 다이아몬드는 **다중 상속을 받을 때, 부모 클래스에 동일한 이름의 메소드를 호출하려 할 때 어떤 부모의 메소드를 호출해야 할 지 모르기 때문에 발생하는 문제**입니다. 한 마디로 정리하면 하나의 구문이 두 가지 이상의 의미로 해석 될 수 있을 때 발생하는 문제입니다.

**파이썬은 MRO를 통해 이 문제를 해결**합니다. **MRO는 자식과 부모 클래스를 전부 포함하여 메소드의 실행 순서를 지정하는 것**입니다. 따라서 동일한 이름의 메소드가 등장하더라도 문제가 되지 않죠. 지정된 순서대로 실행하면 되니까요

예제와 함께 빠르게 알아봅시다.
```python
class Human:
    def say(self):
        print("안녕")

class Mother(Human):
    def say(self):
        print("엄마")

class Father(Human):
    def say(self):
        print("아빠")

class Son(Mother, Father):
    def say(self):
        print("응애")
```

우선 최상위 클래스인 Human을 선언하고, Human을 상속받은 Mother, Father 클래스를 선언했습니다.

마지막으로 Mother, Father 클래스를 상속받는 Son 클래스를 선언했습니다.

또한 각 클래스는 say라는 메소드를 가지고 있습니다.

현재 상황을 그림으로 나타내면 다음과 같습니다.

![|550](https://i.imgur.com/iLtGoMu.png)

여기서 이제 모든것을 상속받은 Son 클래스의 MRO를 확인해봅시다.

MRO는 **__mro__라는 속성을 통해 확인할 수 있습니다.** 사족으로 이 속성은 튜플입니다.
```python
print(Son.__mro__)
(<class '__main__.Son'>, <class '__main__.Mother'>, 
<class '__main__.Father'>, <class '__main__.Human'>, 
<class 'object'>)
```

**먼저 출력된 값일수록 우선순위가 높습니다.**

Son -> Mother -> Father -> Human -> 그리고 최상위 부모인 object 클래스 순서로 우선순위를 가지는 것을 확인할 수 있습니다.

즉 **자식클래스 -> 부모클래스(먼저 상속받은 순서대로 우선순위가 높음) -> (부모클래스가 상속을 받았을 경우 그 부모 클래스) -> 최상위 object 클래스 순서로 메소드가 호출**된다는 사실을 알 수 있습니다.

```python
baby = Son()
baby.say()
응애
```

실제로 저 상태 그대로 인스턴스를 만들어서 say 메소드를 실행하면 **Son 클래스의 say가 실행되는것을 확인 할 수 있습니다.**
```python
class Human:
    def say(self):
        print("안녕")

class Mother(Human):
    def say(self):
        print("엄마")

class Father(Human):
    def say(self):
        print("아빠")

class Son(Mother, Father):
    pass


baby = Son()
baby.say()
엄마
```

**Son 클래스의 메소드를 삭제**하면 그 다음으로 우선순위를 가지는 Mother 클래스의 메소드가 실행됩니다.

```python
class Son(Father, Mother):
    pass

baby = Son()
baby.say()
아빠
```

만약 저기서 **Mother 클래스와 Father 클래스의 순서를 바꾼다면 Father 클래스의 메소드가 실행**됩니다.

우선순위가 바뀌는 것입니다.

---

### super 클래스와 MRO

아까의 예제 코드를 약간 변형해서 심화 과정으로 들어가봅시다.

```python
class Human:
    def say(self):
        print("안녕")

class Mother(Human):
    def say(self):
        super().say() # super 클래스 사용

class Father(Human):
    def say(self):
        print("아빠")


class Son(Mother, Father):
    pass

baby = Son()
baby.say()
?????
```

Mother 클래스의 메소드가 이제 super 클래스의 say 메소드를 호출합니다.

그렇다면 **이 코드를 실행하면 무엇을 출력하게 될까요?**

Mother 클래스의 부모는 Human 클래스니까 "안녕"을 출력하지 않을까요?

```
baby = Son()
baby.say()
아빠
```

**놀랍게도 "아빠"를 출력**했습니다. Mother 클래스의 부모 클래스는 Human 클래스인데 어째서 Father 클래스의 메소드가 실행되었을까요?

이것 또한 MRO가 힘을 좀 쓴 결과입니다.

```
print(Son.__mro__)
(<class '__main__.Son'>, <class '__main__.Mother'>, 
<class '__main__.Father'>, <class '__main__.Human'>, 
<class 'object'>)
```

위에서 보셨듯이 **Mother 클래스의 다음 우선순위는 Father 클래스**입니다. Mother 클래스의 실제 부모는 Human 클래스가 맞지만 **MRO에 의해 Mother 클래스의 super 클래스가 다음 우선순위를 가지는 Father 클래스를 가리키게 된 것** 입니다.


### TypeError: Cannot create a consistent method resolution order (MRO)

해당 문단의 제목은 **MRO를 정상적으로 생성할 수 없을때 발생하는 오류**입니다.

즉 메소드의 순서를 정할 수 없는 모순적인 상황에 발생합니다.

간단한 예시를 통해 살펴봅시다.

```python
class A:
    pass

class B(A):
    pass

class C(A):
    pass

class D(A, B, C): # 에러 발생!
    pass
```

첫 번째 예시입니다.

**B와 C 클래스 모두 A 클래스를 상속받는데 D 클래스가 A 클래스를 먼저 상속받은 상황**입니다.

이럴 경우 호출 순서가 꼬이게 되죠? **A 클래스가 MRO상 우선순위를 가지게 되야 하는데 뒤의 B 클래스와 C 클래스가 A를 상속받고 있으니 말 그대로 모순적인 상황**이 되어버립니다. 따라서 에러가 발생합니다.

```python
class A:
    pass

class B:
    pass

class C(A, B):
    pass

class D(B, A):
    pass

class E(C, D): # 에러 발생!
    pass
```

두 번째 예시입니다.

**E 클래스가 C, D 클래스를 상속받는데 C와 D 클래스가 각각 교차된 순서로 부모에게서 상속**을 받죠?

그렇다면 E 클래스에서는 어떻게 우선 순위를 정해야 할까요?

이 상황도 **순서를 정할 수 없는 모순적인 상황이 되기에 에러가 발생**합니다.