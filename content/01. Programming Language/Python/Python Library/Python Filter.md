---
title: Python Filter
date: 2023-12-17
draft: false
tags:
  - StandardLibrary
complete: true
---
## 1. Explain
'filter' 함수는 파이썬 내장 함수 중 하나로, 주어진 함수의 반환 값이 참(True)인 요소만 선택하여 새로운 이터레이터를 반환합니다. 이 함수는 조건에 맞는 요소만 남기고 나머지 요소를 걸러내는 데 사용됩니다.

### filter(*function, iterable*)
> [!NOTE]
> Construct an iterator from those elements of _iterable_ for which _function_ is true. _iterable_ may be either a sequence, a container which supports iteration, or an iterator. If _function_ is `None`, the identity function is assumed, that is, all elements of _iterable_ that are false are removed.
> 
Note that `filter(function, iterable)` is equivalent to the generator expression `(item for item in iterable if function(item))` if function is not `None` and `(item for item in iterable if item)` if function is `None`.
#### Return Type
→ Iterable한 Filter 객체.

## 2. Feature
1. 주어진 시퀀스(이터러블)의 각 요소에 지정된 함수를 적용
2. 함수의 반환 값이 True인 요소만을 새로운 이터레이터로 반환합니다.
3. 조건에 맞는 요소만을 필터링하여 선택할 수 있습니다.

`filter()` 함수는 두 번째 인자로 넘어온 데이터 중에서 첫 번째 인자로 넘어온 조건 함수를 만족하는 데이터만 찾아서 반환해줍니다.

## 3. Example
아래는 'filter' 함수를 사용하여 리스트에서 짝수만 남기는 간단한 예제입니다.

```python
# 리스트 정의
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 짝수를 필터링하는 함수 정의
def is_even(x):
    return x % 2 == 0

# 'filter' 함수를 사용하여 짝수만 남김
even_numbers = filter(is_even, numbers)

# 결과 출력
print(list(even_numbers))  # [2, 4, 6, 8, 10]
```


## 4. Best Practice
간단한 실습을 위해서 파이썬 인터프리터에서 사용자 5명의 데이터를 사전(dictionary)의 형태로 생성 한 후에 리스트에 담아서 `users` 변수에 할당하겠습니다.

```python
>>> users = [{'mail': 'gregorythomas@gmail.com', 'name': 'Brett Holland', 'gender': 'M'},
 {'mail': 'hintoncynthia@hotmail.com', 'name': 'Madison Martinez', 'gender': 'F'},
{'mail': 'wwagner@gmail.com', 'name': 'Michael Jenkins', 'gender': 'M'},
{'mail': 'daniel79@gmail.com', 'name': 'Karen Rodriguez', 'gender': 'F'},
{'mail': 'ujackson@gmail.com', 'name': 'Amber Rhodes', 'gender': 'F'}]
```


### 함수로 필터링
그럼, 실습 데이터를 대상으로 `filter()` 함수를 사용해서 먼저 남성 사용자들만 추려내보겠습니다.

`filter()` 함수는 함수를 인자로 받기 때문에, `is_man()`이라는 함수를 먼저 작성합니다.

```python
>>> def is_man(user):
...     return user["gender"] == "M"
...
```

이제, `is_man()` 함수를 첫번째 인자로, `users` list를 두번째 인자로 던져서 `filter()` 함수를 호출합니다.

```python
>>> for man in filter(is_man, users):
...     print(man)
...
{'mail': 'gregorythomas@gmail.com', 'name': 'Brett Holland', 'gender': 'M'}
{'mail': 'wwagner@gmail.com', 'name': 'Michael Jenkins', 'gender': 'M'}
```

총 사용자 5명 중 남성 사용자 2명만 출력이 되었습니다!


### Lambda 함수로 필터링
조건 함수의 코드가 긴 경우에는 위와 같이 함수를 선언하는 것이 낫겠지만, 본 예제와 같이 코드가 짧은 경우에는 람다 함수를 사용해서 더욱 간단 명료한 코드를 짤 수 있습니다.

예를 들어, 람다 함수를 이용해서 여성 사용자만 출력하는 코드를 작성해보겠습니다.

```python
>>> for woman in filter(lambda u: u["gender"] == "F", users):
...     print(woman)
...
{'mail': 'hintoncynthia@hotmail.com', 'name': 'Madison Martinez', 'gender': 'F'}
{'mail': 'daniel79@gmail.com', 'name': 'Karen Rodriguez', 'gender': 'F'}
{'mail': 'ujackson@gmail.com', 'name': 'Amber Rhodes', 'gender': 'F'}
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

'filter' 함수의 시간 복잡도는 O(n)으로, 시퀀스의 길이에 비례합니다. 'filter' 함수는 입력 시퀀스를 순회하면서 함수를 적용하므로 입력 시퀀스의 크기만큼 반복 작업을 수행합니다. 빠른 접근 방법은 병렬 처리를 활용하여 'filter' 작업을 가속화하는 것입니다. 'multiprocessing' 라이브러리 등을 사용하여 여러 코어 또는 프로세스에서 작업을 분산할 수 있습니다. 이렇게 하면 대규모 데이터 필터링에서 성능을 향상시킬 수 있습니다.

→ 즉 FILTER 함수 자체로 성능 개선을 할 수 없으며, 코드 가독성 증가 목적으로 사용하면 될거같다.