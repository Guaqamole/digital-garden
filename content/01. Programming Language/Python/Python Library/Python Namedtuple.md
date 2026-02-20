---
title: Python Namedtuple
date: 2024-09-17
draft: false
tags:
  - Python
  - StandardLibrary
complete: true
---

파이썬의 namedtuple은 튜플(tuple)과 딕셔너리(dictionary)의 기능을 합쳐 놓은 자료형입니다.  
  
튜플은 순서가 있는 데이터 집합이며, 한 번 생성된 후에는 수정이 불가능합니다. 딕셔너리는 순서가 없는 key-value 쌍의 데이터 집합입니다. namedtuple은 이 둘의 장점을 모두 갖추고 있습니다

### Namedtuple
- Class가 아니고 collections module 아래에 있음
- 참고로 Collectios에 있는 것들은 다음과 같음
- namedtuple
    - deque
    - Chainmap
    - Counter
    - OrderedDict
    - defaultdict
    - UserDict
    - UserList
    - UserString
- 공식 문서엔 이렇게 설명됨
    - Factory Function for Tuples with Named Fields
- Dictionary와 비슷함
- 키와 인덱스로 접근 가능
- 메모리를 효율적으로 다룰 수 있음

### 정의 방식
- 1) 리스트로 구분
```python
Point = namedtuple('Point', ['x', 'y'])
```

- 2) 띄어쓰기로 정의
```python
Point = namedtuple('Point', 'x y')
```

- 3) 콤마로 구분
```python
Point = namedtuple('Point', 'x, y')
```

- 4) 같은 key가 중복되거나 예약어를 사용하는 경우, rename=True 사용
```python
Point = namedtuple('Point', 'x y x class', rename=True)
```
        
- 5) Dictionary를 unpacking
```python
  temp_dict = {'x': 40, 'y': 30}
  p1 = Point(**temp_dict)
```
        
- 사용 예시
    - 위치 또는 키워드 아규먼트 사용 가능
    - 인덱스로 접근 가능
    - unpack도 사용 가능
    - 필드 이름으로 접근 가능
    - `__repr__` 사용 가능
    
```python
from collections import namedtuple

# Basic example
Point = namedtuple('Point', ['x', 'y'])
p = Point(11, y=22)     # instantiate with positional or keyword arguments
p[0] + p[1]             # indexable like the plain tuple (11, 22)
33
x, y = p                # unpack like a regular tuple
x, y
p.x + p.y               # fields also accessible by name
p                       # readable __repr__ with a name=value style
```

---

### 네임드 튜플 메소드

- `_make`
    - 새로운 인스턴스 생성함
- `_fields`
    - 필드 네임 확인
- `_asdict`
    - 네임드 튜플을 Dictionary로 바꾸고 싶을 떄 사용
    - Python named tuple to dict
    - OrdededDict 반환함
- `_replace`
    - 특정 필드의 값이 변경된 새로운 객체를 생성함

---

### Named Tuple에서 기본 값을 설정하고 싶은 경우

- Python Named Tuple Default Value
- 네임드 튜플을 사용할 떄, default value를 설정하고 싶은 경우가 있음
- 이런 경우 defaults 인자에 넣으면 됨
    
    - 단, Python 3.7 이후부터 사용 가능함
    
```python
from collections import namedtuple
fields = ('value', 'left', 'right')

Node = namedtuple('Node', fileds, defaults=(None, ) * len(fields))
Print(Node())
```
    
- 혹은 새로 나온 `@dataclass`를 사용할 수 있음
```python
from dataclasses import dataclass
from typing import Any

@dataclass
class Node:
  val: Any = None
  left: 'Node' = None
  right: 'Node' = None
	
print(Node())    
```
    

  
  

---

### Named Tuple에서 값을 변경하고 싶은 경우

- Python Named tuple Change Value
- Named tuple은 immutable이기 때문에 값을 직접 변경할 수 없음
    - 이럴 경우 `_replace` 함수를 사용해 새로운 값의 객체를 생성할 수 있음
        - 하지만 본래 의미와 다르게 사용하는거 아니냐?는 사람도 있으며
    - mutable한 자료 구조를 원한다면 [recordtype](https://pypi.python.org/pypi/recordtype)를 사용하는 방법도 있음
    - 또는 dataclass를 사용하는 방법도 존재함
- 각각의 방식을 이해하고, 차이를 알아두면 좋을듯. 자세한 내용은 [Changing values of a list of namedtuples](https://stackoverflow.com/questions/31252939/changing-values-of-a-list-of-namedtuples/31253184) 참고

  
  

---

### Namedtuple 값을 Json으로 변경하고 싶은 경우

- python namedtuple to json
- 직접 Json으로 바꿔주는 메소드는 없지만, dict으로 바꿀 수는 있음
- OrderedDict으로 변경한 후, json.dumps를 사용하면 변경할 수 있음
    
```python
from collections import namedtuple
import json
Point = namedtuple("Point", ("x", "y"))
pt = Point(15, 15)
json.dumps(pt._asdict())
```