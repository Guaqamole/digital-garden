---
title: Python Map
date: 2023-12-17
draft: false
tags:
  - StandardLibrary
complete: true
link: https://docs.python.org/3/library/functions.html#map
---
## 1. Explain
'map' 함수는 파이썬 내장 함수 중 하나로, 주어진 함수를 시퀀스(리스트, 튜플 등)의 각 요소에 적용하여 새로운 이터레이터를 반환합니다. 이러한 함수는 함수형 프로그래밍의 개념을 지원하며, 반복문을 사용하지 않고도 요소들을 변환하거나 처리할 수 있는 편리한 방법을 제공합니다.

### map(*function, iterable*, *\*iterable)
> [!NOTE]
> Return an iterator that applies _function_ to every item of _iterable_, yielding the results. If additional _iterables_ arguments are passed, _function_ must take that many arguments and is applied to the items from all iterables in parallel. With multiple iterables, the iterator stops when the shortest iterable is exhausted. For cases where the function inputs are already arranged into argument tuples, see [`itertools.starmap()`](https://docs.python.org/3/library/itertools.html#itertools.starmap "itertools.starmap").


## 2. Feature
- 주어진 시퀀스(이터러블)의 각 요소에 지정된 함수를 적용

- 함수가 적용된 결과를 새로운 이터레이터로 반환
	- map이 반환하는 맵 객체는 이터레이터라서 변수 여러 개에 저장하는 언패킹(unpacking)이 가능합니다.

- 원본 데이터를 변경하지 않고 변환된 데이터를 얻을 수 있습니다.

## 3. Example
![](https://i.imgur.com/cSlQS0S.png)

실수가 저장된 리스트가 있을 때 이 리스트의 모든 요소를 정수로 변환하려면 어떻게 해야 할까요? 먼저 for 반복문을 사용해서 변환해보겠습니다.

```python
>>> a = [1.2, 2.5, 3.7, 4.6]
>>> for i in range(len(a)):
...     a[i] = int(a[i])
...
>>> a
[1, 2, 3, 4]
```

for에 range(len(a))를 사용해서 인덱스를 가져왔습니다. 그리고 가져온 인덱스로 요소 하나 하나에 접근한 뒤 int로 변환하여 다시 저장했습니다.

매번 for 반복문으로 반복하면서 요소를 변환하려니 조금 번거롭습니다. 이때는 map을 사용하면 편리합니다.

```python
>>> a = [1.2, 2.5, 3.7, 4.6]
>>> a = list(map(int, a))
>>> a
[1, 2, 3, 4]
```

a = list(map(int, a)) 한 줄로 변환이 끝났습니다. map에 int와 리스트를 넣으면 리스트의 모든 요소를 int를 사용해서 변환합니다. 그다음에 list를 사용해서 map의 결과를 다시 리스트로 만들어줍니다.

## 4. Best Practice
### Iterable 모든 요소에 적용
'map' 함수를 사용하여 각 문자열의 길이 계산
```python
# 문자열 리스트 정의
words = ['apple', 'banana', 'cherry', 'date']

# 각 문자열의 길이를 계산하는 함수 정의
def calculate_length(word):
    return len(word)

# 'map' 함수를 사용하여 각 문자열의 길이 계산
word_lengths = map(calculate_length, words)

# 결과 출력
print(list(word_lengths))  # [5, 6, 6, 4]
```

### Unpacking
map이 반환하는 맵 객체는 이터레이터라서 변수 여러 개에 저장하는 언패킹(unpacking)이 가능
```python
x = input().split()    # input().split()의 결과는 문자열 리스트
m = map(int, x)        # 리스트의 요소를 int로 변환, 결과는 맵 객체
a, b = m               # 맵 객체는 변수 여러 개에 저장할 수 있음
```


## 5. Time Complexity

$$ \text{Time Complexity = } O(n) $$

'map' 함수의 시간 복잡도는 O(n)으로, 시퀀스의 길이에 비례합니다. 'map' 함수는 각 요소에 함수를 적용하므로 입력 시퀀스의 크기만큼 반복 작업을 수행합니다. 빠른 접근 방법은 병렬 처리를 활용하여 'map' 작업을 가속화하는 것입니다. 'multiprocessing' 라이브러리 등을 사용하여 여러 코어 또는 프로세스에서 작업을 분산할 수 있습니다. 이렇게 하면 대규모 데이터 처리에서 성능을 향상시킬 수 있습니다.

→ 즉 MAP 함수 자체로 성능 개선을 할 수 없으며, 코드 가독성 증가 목적으로 사용하면 될거같다.