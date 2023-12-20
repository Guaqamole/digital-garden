---
title: Python Zip
date: 2023-12-17
draft: false
tags:
  - StandardLibrary
complete: true
link: https://docs.python.org/3/library/functions.html#zip
---
## 1. Explain
'zip' 함수는 파이썬 내장 함수 중 하나로, 주어진 **여러 시퀀스(리스트, 튜플 등)를 병렬로 결합**하여 튜플의 리스트를 생성하는 데 사용됩니다. 'zip' 함수는 입력된 시퀀스들에서 동일한 인덱스 위치의 요소들끼리 튜플로 묶어줍니다.

### zip(\*iterables, strict=False)
> [!NOTE]
> Iterate over several iterables in parallel, producing tuples with an item from each one.
> 
>  More formally: [`zip()`](https://docs.python.org/3/library/functions.html#zip "zip") returns an iterator of tuples, where the _i_-th tuple contains the _i_-th element from each of the argument iterables.
> 
> Another way to think of [`zip()`](https://docs.python.org/3/library/functions.html#zip "zip") is that it turns rows into columns, and columns into rows. This is similar to [transposing a matrix](https://en.wikipedia.org/wiki/Transpose).
> 
> [`zip()`](https://docs.python.org/3/library/functions.html#zip "zip") is lazy: The elements won’t be processed until the iterable is iterated on, e.g. by a `for` loop or by wrapping in a [`list`](https://docs.python.org/3/library/stdtypes.html#list "list").

example
```python
for item in zip([1, 2, 3], ['sugar', 'spice', 'everything nice']):
	print(item)

(1, 'sugar')
(2, 'spice')
(3, 'everything nice')
```

#### Return Type
→ Iterable한 Filter 객체.

## 2. Feature
- 동일한 인덱스 위치에 있는 요소들을 튜플로 묶어줍니다.
- 입력된 시퀀스들의 길이가 다를 경우, 가장 짧은 시퀀스의 길이에 맞춰 결과를 생성합니다.
- 복수의 시퀀스를 결합하여 **병렬 데이터로 다룰 수 있습니다.**

`zip()` 함수를 활용하면 여러 그룹의 데이터를 루프를 한 번만 돌면서 처리할 수 있는데요. **가변 인자를 받기 때문에 2개 이상의 인자를 넘겨서 병렬 처리를 할 수 있습니다.**

예를 들어, 아래 코드는 3개의 문자열 내의 글자를 하니씩 병렬해서 출력하고 있습니다.
```python
>>> for number, upper, lower in zip("12345", "ABCDE", "abcde"):
...     print(number, upper, lower)
...
1 A a
2 B b
3 C c
4 D d
5 E e
```

## 3. Example
아래는 'zip' 함수를 사용하여 두 리스트를 결합하는 간단한 예제입니다.

```python
# 두 개의 리스트 정의
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]

# 'zip' 함수를 사용하여 두 리스트를 결합하여 튜플의 리스트 생성
zipped_data = list(zip(names, scores))

# 결과 출력
print(zipped_data)  # [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
```


## 4. Best Practice
### 사전 변환
`zip()` 함수를 이용하면 두 개의 리스트나 튜플 부터 쉽게 사전(dictionary)을 만들 수 있습니다. 키를 담고 있는 리스트와 값을 담고 있는 리스트를 `zip()` 함수에 넘긴 후, 그 결과를 다시 `dict()` 함수에 넘기면 됩니다.

```python
>>> keys = [1, 2, 3]
>>> values = ["A", "B", "C"]
>>> dict(zip(keys, values))
{1: 'A', 2: 'B', 3: 'C'}
```

`dict()` 함수에 키와 값으로 이루어진 튜플을 넘기면 사전이 생성되는 원리를 이용하는 것입니다.

다른 예로, 날짜 데이터의 필드 이름 리스트와 필드 값 리스트를 사전으로 변환해보겠습니다.

```python
>>> dict(zip(["year", "month", "date"], [2001, 1, 31]))
{'year': 2001, 'month': 1, 'date': 31}
```

### unzip
`zip()` 함수로 엮어 놓은 데이터를 다시 해체(unzip)하고 싶을 때도 `zip()` 함수를 사용할 수 있습니다.

먼저 `zip()` 함수로 2개의 튜플의 데이터를 엮은 후 리스트로 변환해보겠습니다.

```python
>>> numbers = (1, 2, 3)
>>> letters = ("A", "B", "C")
>>> pairs = list(zip(numbers, letters))
>>> print(pairs)
[(1, 'A'), (2, 'B'), (3, 'C')]
```

### List comprehension
남성 사용자만 추려내는 코드를 list comprehension을 이용해서 재작성해보겠습니다.

```python
>>> [user for user in users if user["gender"] == 'M']
[{'mail': 'gregorythomas@gmail.com', 'name': 'Brett Holland', 'gender': 'M'}, {'mail': 'wwagner@gmail.com', 'name': 'Michael Jenkins', 'gender': 'M'}]
```

list comprehension은 결과값은 역시 리스트 타입이기 때문에, 별다른 타입 변환이 필요없는 것도 이점이 될 수 있겠습니다. 만약에 튜플을 얻고 싶다면 비슷한 방식으로 `tuple()` 내장 함수만 사용해주면 됩니다.

```python
>>> tuple(user for user in users if user["gender"] == 'M')
({'mail': 'gregorythomas@gmail.com', 'name': 'Brett Holland', 'gender': 'M'}, {'mail': 'wwagner@gmail.com', 'name': 'Michael Jenkins', 'gender': 'M'})
```


## 5. Time Complexity

$$ \text{Time Complexity = } O(n) $$

'zip' 함수의 시간 복잡도는 O(n)으로, 각 시퀀스의 길이에 비례합니다. 'zip' 함수는 입력된 시퀀스들을 순회하면서 동일한 인덱스 위치의 요소들을 묶어주므로 입력 시퀀스의 크기만큼 반복 작업을 수행합니다. 'zip' 함수는 복잡도 면에서 매우 효율적이며, 입력 데이터의 길이가 아주 크더라도 성능 저하가 거의 없습니다.