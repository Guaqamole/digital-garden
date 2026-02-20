---
title: pythonthon Dataclass
date: 2024-09-17
draft: false
tags:
  - pythonthon
  - StandardLibrary
complete: true
---
리스트(list), 튜플(tuple), 사전(dictoinary), 네임드 튜플(namedtuple), 세트(set), 프로즌 세트(frozen set)와 같은 내장 자료구조는 사용하기 간편하다는 장점이 있는데요. 반면에 클래스(class)를 이용해서 데이터를 담아두면 type-safe해지기 때문에 프로그램 실행 중에 오류가 발생할 확률이 적어진다는 장점이 있습니다.

파이썬 3.7에서 dataclasses라는 매우 매력적인 모듈이 표준 라이브러리에 추가되었는데요. 이번 포스팅에서는 내장 자료구조처럼 편리하면서도 클래스처럼 견고한 데이터 클래스에 대해서 알아보도록 하겠습니다.

## 기존 방식의 클래스 작성하기

먼저 dataclasses 모듈에 등장하기 전에 우리는 어떻게 데이터를 담아두기 위한 클래스를 작성하였는지 살펴보겠습니다. 예를 들어, 사용자 데이터를 담아두기 위한 `User` 클래스를 작성한다고 가정하려면 다음과 같은 코드가 필요할 것입니다.

```python
from datetime import date


class User:
    def __init__(
        self, id: int, name: str, birthdate: date, admin: bool = False
    ) -> None:
        self.id = id
        self.name = name
        self.birthdate = birthdate
        self.admin = admin
```

위 코드를 잘 살펴보면 `id`, `name`, `birthdate`, `admin` 각 변수가 3번씩 반복되는 것을 알 수 있습니다. 이러한 코드를 흔히 보일러 플레이트(boiler-plate)라고도 하지요. 만약에 필드 개수가 많은 클래스였다면 이러한 코드를 작성하는 것이 매우 지루하게 느껴졌을 것입니다. 같은 변수명을 반복해서 타이핑하다가 자칫 오타라도 나게되면 버그로 이어질 수도 있고요. 🤪

위 클래스의 인스턴스를 출력해보면 출력 결과에 필드값이 나타나지 않아서 불편합니다.

```python
>>> user = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user
<__main__.User object at 0x105558100>
```

`__repr__()` 메서드를 추가하여 필드값이 모두 출력되도록 인스턴스의 출력 형태를 바꿔보도록 하겠습니다.

```python
from datetime import date


class User:
    def __init__(
        self, id: int, name: str, birthdate: date, admin: bool = False
    ) -> None:
        self.id = id
        self.name = name
        self.birthdate = birthdate
        self.admin = admin

    def __repr__(self) -> str:
        return (
            self.__class__.__qualname__ + f"(id={self.id!r}, name={self.name!r}, "
            f"birthdate={self.birthdate!r}, admin={self.admin!r})"
        )
```

```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user1
User(id=1, name='Steve Jobs', birthdate=datetime.date(1955, 2, 24), admin=False)
```

이번에는 이 클래스로 생성한 두 개의 인스턴스를 동등성(equality)을 체크해볼까요?

```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user2 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user1 == user2
False
```

두 개의 인스턴스 간에 필드의 값이 모두 같을 때, 동등한 인스턴스로 취급하고 싶다면 `__eq__()` 메서드를 구현해줘야 합니다.

```python
from datetime import date


class User:
    def __init__(
        self, id: int, name: str, birthdate: date, admin: bool = False
    ) -> None:
        self.id = id
        self.name = name
        self.birthdate = birthdate
        self.admin = admin

    def __repr__(self) -> str:
        return (
            self.__class__.__qualname__ + f"(id={self.id!r}, name={self.name!r}, "
            f"birthdate={self.birthdate!r}, admin={self.admin!r})"
        )

    def __eq__(self, other) -> bool:
        if other.__class__ is self.__class__:
            return (self.id, self.name, self.birthdate, self.admin) == (
                other.id,
                other.name,
                other.birthdate,
                other.admin,
            )
        return False
```


```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user2 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user1 == user2
True
```

위와 같이 이상적으로 작동하는 클래스를 작성하려면 생각했던 것 보다 많은 양의 코드가 필요하다는 것을 알 수 있는데요. 이러한 보일러 플레이트 코드를 일일이 직접 작성하지 않아도 된다면 얼마나 좋을까요?

## 데이터 클래스 작성하기

dataclasses 모듈은 위와 같이 데이터를 담아두기 위한 클래스를 매우 적은 양의 코드로 작성하게 해줍니다. 위 예제 코드를 이번에는 dataclasses 모듈을 이용해서 재작성 해보겠습니다.

```python
from dataclasses import dataclass
from datetime import date


@dataclass
class User:
    id: int
    name: str
    birthdate: date
    admin: bool = False
```

어떤가요? 너무 간단하지 않은가요? 💅

dataclasses 모듈에서 제공하는 `@dataclass` 데코레이터를 일반 클래스에 선언해주면 해당 클래스는 소위 **데이터 클래스**가 됩니다.

데이터 클래스는 `__init__()`, `__repr__()`, `__eq__()`와 같은 메서드를 자동으로 생성해줍니다. 따라서 이 데이터 클래스는 다음과 같이 이전 섹션에서 손수 작성했던 클래스와 동일하게 작동하는 것을 알 수 있습니다.

```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user1
User(id=1, name='Steve Jobs', birthdate=datetime.date(1955, 2, 24), admin=False)
>>> user2 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user1 == user2
True
```

자, 지금까지 데이터 클래스의 기본 기능을 살펴봤으니, 지금부터 데이터 클래스가 제공하는 더욱 강력한 부가 기능들에 대해서 살펴보겠습니다.

## 불변 데이터 만들기

데이터 클래스는 기본적으로 담고있는 데이터를 자유 자재로 변경할 수 있습니다.

```python
>>> user = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user
User(id=1, name='Steve Jobs', birthdate=datetime.date(1955, 2, 24), admin=False)
>>> user.admin = True
>>> user
User(id=1, name='Steve Jobs', birthdate=datetime.date(1955, 2, 24), admin=True)
```

만약에 데이터의 불변성(immutability)가 보장되어야 하는 경우라면 다음과 같이 `frozen` 옵션을 사용하면 됩니다.

```python
from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class User:
    id: int
    name: str
    birthdate: date
    admin: bool = False
```

이제 데이터 클래스가 담고 있는 데이터를 변경해보려고 하면 예외가 발생하는 것을 알 수 있습니다.

```python
>>> user = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user.admin = True
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<string>", line 4, in __setattr__
dataclasses.FrozenInstanceError: cannot assign to field 'admin'
```

## 데이터 대소비교 및 정렬

데이터 클래스의 인스턴스 간에 대소비교를 하려고 하면 다음과 같이 예외가 발생합니다.

```python
>>> user1 < user2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '<' not supported between instances of 'User' and 'User'
```

필드값에 따라서 데이터의 대소비교가 필요한 경우라면 `order` 옵션을 사용할 수 있습니다.

```python
from dataclasses import dataclass
from datetime import date


@dataclass(order=True)
class User:
    id: int
    name: str
    birthdate: date
    admin: bool = False
```

이제 데이터 클래스 간에 대소비교가 가능하고, 따라서 데이터 정렬도 가능해졌습니다.

```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user2 = User(id=2, name="Bill Gates", birthdate=date(1955, 10, 28))
>>> user1 < user2
True
>>> user1 > user2
False
>>> sorted([user2, user1])
[User(id=1, name='Steve Jobs', birthdate=datetime.date(1955, 2, 24), admin=False), User(id=2, name='Bill Gates', birthdate=datetime.date(1955, 10, 28), admin=False)]
```

## 세트나 사전에서 사용하기
데이터 클래스의 인스턴스는 기본적으로 hashable하지 않기 때문에, 세트(set)의 값이나 사전(dictionary)의 키로 사용을 할 수 없습니다.
```python
>>> set([user1, user2])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'User'
```

데이터 클래스의 인스턴스를 hashable하게 만들고 싶다면, `unsafe_hash` 옵션을 사용하면 됩니다.
```python
from dataclasses import dataclass
from datetime import date


@dataclass(unsafe_hash=True)
class User:
    id: int
    name: str
    birthdate: date
    admin: bool = False
```

이제 세트를 이용해서 중복 데이터를 제거할 수 있습니다.

```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user2 = User(id=2, name="Bill Gates", birthdate=date(1955, 10, 28))
>>> user3 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user4 = User(id=2, name="Bill Gates", birthdate=date(1955, 10, 28))
>>> set([user1, user2, user3, user4])
{User(id=2, name='Bill Gates', birthdate=datetime.date(1955, 10, 28), admin=False), User(id=1, name='Steve Jobs', birthdate=datetime.date(1955, 2, 24), admin=False)}
```


## 데이터 클래스 사용 시 주의 사항
데이터 클래스를 사용할 때 흔히 하는 실수가 잇는데요. 바로 list와 같은 가변 데이터 타입의 필드에 기본값을 할당해주는 것입니다.

```python
from dataclasses import dataclass
from datetime import date


@dataclass(unsafe_hash=True)
class User:
    id: int
    name: str
    birthdate: date
    admin: bool = False
    friends: list[int] = []
```

필드의 기본값은 서로 다른 인스턴스 간에 공유가 되기 때문에 이런 식으로 기본값 할당이 허용되지 않습니다.

```python
ValueError: mutable default <class 'list'> for field friends is not allowed: use default_factory
```

이 문제를 해결하려면 dataclasses 모듈에서 제공하는 `filed` 함수의 `default_factory` 옵션을 사용해서 매번 새로운 리스트가 생성될 수 있도록 해줘야 합니다.

```python
from dataclasses import dataclass, field
from datetime import date


@dataclass(unsafe_hash=True)
class User:
    id: int
    name: str
    birthdate: date
    admin: bool = False
    friends: list[int] = field(default_factory=list)
```

```python
>>> user1 = User(id=1, name="Steve Jobs", birthdate=date(1955, 2, 24))
>>> user1.friends
[]
>>> user1.friends.append(2)
>>> user1.friends
[2]
```