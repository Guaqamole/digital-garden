---
title: Python Iterator
date: 2023-12-17
draft: false
tags:
  - StandardLibrary
complete: true
---
## 1. Explain
반복자(Iterator)는 파이썬에서 반복 가능한 객체(iterable)에서 요소를 하나씩 차례로 꺼내는 데 사용되는 객체입니다. 반복 가능한 객체는 문자열, 리스트, 튜플, 집합, 딕셔너리 등과 같이 여러 요소를 포함하는 컬렉션 데이터 타입입니다.

## 2. Feature
- `iter()` 함수를 사용하여 반복 가능한 객체(iterable)를 반복자로 변환합니다.
- `next()` 함수를 사용하여 반복자에서 다음 요소를 가져옵니다.
- 반복자가 다음 요소를 가지고 있을 때는 요소를 반환하고, 다음 요소가 없을 때는 `StopIteration` 예외를 발생시킵니다.
- 반복자를 사용하면 데이터를 메모리에 모두 로드하지 않고도 큰 데이터 집합을 처리할 수 있습니다.
## 3. Example
아래는 반복자를 사용하여 리스트의 요소를 하나씩 출력하는 간단한 예제입니다.

```python
# 리스트 정의
my_list = [1, 2, 3, 4, 5]

# 반복자 생성
my_iterator = iter(my_list)

# 반복자를 사용하여 요소 하나씩 출력
print(next(my_iterator))  # 1
print(next(my_iterator))  # 2
print(next(my_iterator))  # 3
```


## 4. Best Practice
- `for` 루프나 `while` 루프를 사용하여 반복자를 효과적으로 사용할 수 있습니다.
- 커스텀 클래스를 만들어 반복자 프로토콜(`__iter__()`와 `__next__()` 메서드 구현)을 준수할 수도 있습니다.

```python
class MyIterator:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current > self.end:
            raise StopIteration
        else:
            self.current += 1
            return self.current - 1

# 반복 가능한 객체 생성
my_iterable = MyIterator(1, 5)

# 반복자를 사용하여 요소 출력
for num in my_iterable:
    print(num)
```

## 5. Time Complexity

$$ \text{Time Complexity = } O(1) $$

반복자의 시간 복잡도는 O(1)입니다. 즉, 요소를 하나씩 가져오는 데 상수 시간이 걸립니다. 반복자는 요소를 필요한 만큼만 가져오므로 큰 데이터 집합도 효율적으로 처리할 수 있습니다. 이것은 메모리를 효율적으로 사용하며, 대용량 데이터 집합에서도 빠른 속도를 보장합니다.