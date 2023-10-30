---
title: Python Collections 모듈 사용법
date: 2023-10-24
draft: false
tags:
  - Python
  - StandardLibrary
complete: true
---
예: 카운트하기
보유한 주식이 다음과 같을 때, 종목별로 합산해 나타내고 싶다고 하자.

~~~python
portfolio = [
    ('GOOG', 100, 490.1),
    ('IBM', 50, 91.1),
    ('CAT', 150, 83.44),
    ('IBM', 100, 45.23),
    ('GOOG', 75, 572.45),
    ('AA', 50, 23.15)
]
~~~

위 리스트에 IBM과 GOOG가 두 개씩 있다. 종목별로 합산해 보자.

```python
portfolio = [
    ('GOOG', 100, 490.1),
    ('IBM', 50, 91.1),
    ('CAT', 150, 83.44),
    ('IBM', 100, 45.23),
    ('GOOG', 75, 572.45),
    ('AA', 50, 23.15)
]

ibm, google = (0,0), (0,0)

for stock in portfolio:
    val = (stock[1], stock[2])
    
    if stock[0] == 'GOOG':
        google = tuple([sum(tup) for tup in zip(google, val)])
    elif stock[0] == 'IBM':
        ibm = tuple([sum(tup) for tup in zip(ibm, val)])
    
google = ('GOOG', google[0], google[1])
ibm = ('IBM', ibm[0], ibm[1])
print(ibm, google)
```

```python
('IBM', 150, 136.32999999999998) ('GOOG', 175, 1062.5500000000002)
```


# Collections Class

- namedtuple() `factory function for creating tuple subclasses with named fields`
- deque list-like `container with fast appends and pops on either end`
- ChainMap `dict-like class for creating a single view of multiple mappings`
- Counter `dict subclass for counting hashable objects`
- OrderedDict `dict subclass that remembers the order entries were added`
- defaultdict `dict subclass that calls a factory function to supply missing values`
- UserDict `wrapper around dictionary objects for easier dict subclassing`
- UserList `wrapper around list objects for easier list subclassing`
- UserString `wrapper around string objects for easier string subclassing`

이중 우리는 `Counter` 모듈을 쓸거다.

## **Counter**
- most_common()
- elements()

```python
from collections import Counter

cnt = Counter()

for word in ['red', 'blue', 'red', 'green', 'blue', 'blue']:
    cnt[word] += 1
    
cnt
>> Counter({'red': 2, 'blue': 3, 'green': 1})
```

### **most_common**
```python
cnt.most_common()
>> [('blue', 3), ('red', 2), ('green', 1)]
```

### **elements**
```python
list(cnt.elements())
>> ['red', 'red', 'blue', 'blue', 'blue', 'green']
```
