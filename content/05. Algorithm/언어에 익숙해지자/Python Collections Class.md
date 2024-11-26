---
title: Python Collections 모듈 사용법
date: 2023-10-24
draft: false
tags:
  - Python
  - StandardLibrary
complete: true
---
[`Counter`](https://docs.python.org/ko/3.9/library/collections.html#collections.Counter "collections.Counter")는 해시 가능한 객체를 세기 위한 [`dict`](https://docs.python.org/ko/3.9/library/stdtypes.html#dict "dict") 서브 클래스입니다. 요소가 딕셔너리 키로 저장되고 개수가 딕셔너리값으로 저장되는 컬렉션입니다. 개수는 0이나 음수를 포함하는 임의의 정숫값이 될 수 있습니다. [`Counter`](https://docs.python.org/ko/3.9/library/collections.html#collections.Counter "collections.Counter") 클래스는 다른 언어의 백(bag)이나 멀티 셋(multiset)과 유사합니다.

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

- namedtuple(): `factory function for creating tuple subclasses with named fields`
- deque: list-like `container with fast appends and pops on either end`
- ChainMap: `dict-like class for creating a single view of multiple mappings`
- Counter: `dict subclass for counting hashable objects`
- OrderedDict `dict subclass that remembers the order entries were added`
- defaultdict `dict subclass that calls a factory function to supply missing values`
- UserDict `wrapper around dictionary objects for easier dict subclassing`
- UserList `wrapper around list objects for easier list subclassing`
- UserString `wrapper around string objects for easier string subclassing`

이중 우리는 `Counter` 모듈을 쓸거다.

## **Counter**
- 기본 사용법
- most_common()
- elements()

### 기본 사용법
#### Counter 객체로 만드는법
```python
from collections import Counter

# List
words = ['red', 'blue', 'red', 'green', 'blue', 'blue']  
cntr = Counter(words);
    
cntr
>> Counter({'red': 2, 'blue': 3, 'green': 1})


# Tuple
words = ('red', 'blue', 'red', 'green', 'blue', 'blue')  
cntr = Counter(words);

cntr
>> Counter({'blue': 3, 'red': 2, 'green': 1})


# String
words = "red blue red green blue blue"  
cntr = Counter(words, );
Counter({'e': 7, ' ': 5, 'r': 3, 'b': 3, 'l': 3, 'u': 3, 'd': 2, 'g': 1, 'n': 1})
```

#### Item Count 찾기
객체는 누락된 항목에 대해 [`KeyError`](https://docs.python.org/ko/3.9/library/exceptions.html#KeyError "KeyError")를 발생시키는 대신 0을 반환한다는 점을 제외하고 딕셔너리 인터페이스를 갖습니다:
```python
c = Counter(['eggs', 'ham'])
>>> c['bacon']                              # count of a missing element is zero
0
```



### **most_common**
```python
cnt.most_common()
>> [('blue', 3), ('red', 2), ('green', 1)]

# Top 1 Common Item
cntr.most_common()[0][0]
>> blue

# Top 1 Common Item Count
cntr.most_common()[0][0]
>> 3

# Getting Counts for each item
blue = cntr.pop('blue')  
red = cntr.pop('red')  
green = cntr.pop('green')  
print(blue, red, green, list(cntr.elements()))
>> 3 2 1 []

```

### **elements**
```python
list(cnt.elements())
>> ['red', 'red', 'blue', 'blue', 'blue', 'green']
```


## Default Dict
- 기본 사용법
- missing
```python
from collections import defaultdict 
  
# Function to return a default 
# values for keys that is not 
# present 
def def_value(): 
    return "Not Present"
      
# Defining the dict 
d = defaultdict(def_value) 
d["a"] = 1
d["b"] = 2
  
print(d["a"]) 
print(d["b"]) 
print(d["c"])
> 1
> 2
> Not Present
```


### default_factory()
**Default_factory:** It is a function returning the default value for the dictionary defined. If this argument is absent then the dictionary raises a KeyError.
```python
from collections import defaultdict 
  
# Defining the dict and passing  
# lambda as default_factory argument 
d = defaultdict(lambda: "Not Present") 
d["a"] = 1
d["b"] = 2
  
print(d["a"]) 
print(d["b"]) 
print(d["c"]) 

> 1
> 2
> Not Present
```

### __missing__()
```python
from collections import defaultdict 

# Defining the dict 
d = defaultdict(lambda: "Not Present") 
d["a"] = 1
d["b"] = 2
  
# Provides the default value  
# for the key 
print(d.__missing__('a')) 
print(d.__missing__('d')) 
> Not Present
> Not Present
```

