---
title: Python Itertools
date: 2024-04-26
draft: false
tags:
  - Python
complete: true
---
### 함수 정리

| 함수                            | 파라미터                              | 설명                                                                                   |
| ----------------------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| accumulate                    | iterable[, func, *, initial=None] | - 누적 합계를 반환하는 이터레이터를 반환  <br>- func에 합계 대신 다른 함수를 넣을 수 있음                            |
| chain                         | *iterables                        | - 여러 iterable을 연달아 반환                                                                |
| chain.from_iterable           | iterable                          | - iterable을 여러개 받는 대신, iterable의 요소를 iterable로                                       |
| combinations                  | iterable, r                       | - 조합  <br> - 튜플 형태로 반환                                                               |
| combinations_with_replacement | iterable, r                       | - 중복조합  <br> - 튜플 형태로 반환                                                             |
| compress                      | data, selectors                   | - selectors가 true인 인덱스의 data만 반환  <br> - 둘다 iterable이며, 짧은 것 기준으로 동작                 |
| count                         | start=0, step=1                   | - start부터 step 만큼 더하면서 요소를 반복  <br> - float도 가능하지만 지양                                |
| cycle                         | iterable                          | - iterable을 계속 반복하여 반환  <br> - 무한히 반복                                                |
| dropwhile                     | predicate, iterable               | - predicate가 false인 요소부터 요소를 반환  <br> - takewhile의 반대                                |
| filterfalse                   | predicate, iterable               | - predicate가 false인 요소만 반환  <br> - predicate가 None이면 거짓인 요소를 반환                      |
| groupby                       | iterable, key=None                | - (key, iterator) 형태의 튜플을 반환하는 iterator 반환  <br> - key 값을 기준으로 group된 요소를 반환하는 이터레이터 |
| islice                        | iterable, stop                    | - stop 인덱스까지의 요소 반환 (stop을 안주면 끝까지)                                                  |
| iterable, start, stop[, step] | - start에서부터 stop까지 step 만큼 건너뛰면서  |                                                                                      |
| pairwise                      | iterable                          | - 연속하는 두개의 요소를 튜플로 묶어줌  <br> - '연속하는 두개'의 모든 가짓수 반환                                  |
| permutations                  | iterable, r=None                  | - 순열 (값이 중복되어도 위치로 고유성 다룸)  <br> - 튜플 형태로 반환                                         |
| product                       | *iterables, repeat=1              | - 여러 iterable의 데카르트 곱. (repeat 만큼 반복)  <br> - iterable을 하나만 줄 경우 reapeat을 r로 하는 중복순열 |
| repeat                        | object[, times]                   | - object를 times 번 만큼 반복  <br> - times를 명시하지 않으면 무한으로 반복                              |
| starmap                       | function, iterable                | - iterable의 tuple을 이용해 func 계산  <br> - 이미 zip 되어 있는 iterable에 func을 적용               |
| takewhile                     | predicate, iterable               | - predicate가 false이기 전까지 요소 반환  <br> - dropwhile의 반대                                 |
| tee                           | iterable, n=2                     | - 튜플 형태로 같은 이터레이터를 n개 만큼 반환  <br> - thread-safe하지 않아서 주의를 요함                         |
| zip_longest                   | *iterables, fillvalue=None        | - 가장 긴 요소를 기준으로 반환하는 zip()  <br> - 빈 공간을 fillvalue로  채움                              |

### accumulate
 - 기본적으로 결과값의 길이는 같으나, initial을 주면 하나가 더 늘어남
 - 첫번째 인자는 그대로 전달
```python
import itertools

myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

 
list(itertools.accumulate(myList))
>> [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]

list(itertools.accumulate(myList, initial=0))
>> [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55]

list(itertools.accumulate(myList, lambda x, y: x * y))
>> [1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

list(itertools.accumulate(myList, lambda x, y: x * y, initial=1))
>> [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
```



### chain
-  여러 iterable을 단일 iterable 처럼 사용할 수 있는 메서드
 - element 를 하나씩 돌려주는 이터레이터 반환
```python
import itertools

myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Hello', 'World', '!']
myString = 'Hello World!'

list(itertools.chain(myList))
>> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Hello', 'World', '!']

list(itertools.chain(myString))
>> ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!']
```


### chain.from_iterable
 - iterable의 요소를 iterable로 받아서 chain과 같이 처리함
```python
import itertools

myList = ['Hello', 'World', '!']
myString = 'Hello World!'

list(itertools.chain.from_iterable(myList))
>> ['H', 'e', 'l', 'l', 'o', 'W', 'o', 'r', 'l', 'd', '!']
```


### combinations
 - nCr 에서 n은 요소의 개수, r은 인자로 넘겨줌
 - 가능한 모든 조합의 tuple을 반환하는 이터레이터 반환
 - 요소는 값이 아니라 위치로 고유성을 다룸 (값의 중복 허용)
```python
import itertools

myList = [1, 2, 3, 4, 5]

list(itertools.combinations(myList, 2))
[(1, 2), (1, 3), (1, 4), (1, 5), (2, 3), (2, 4), (2, 5), (3, 4), (3, 5), (4, 5)]
```


### combinations_with_replacement
 - 중복 조합
 - 개별 요소를 두번 이상 반복 (r = 2의 경우 요소 내가 두번 있는 놈 추가, r = 3 일 경우 내가 두번, 내가 세번 있는 놈 추가)
```python
import itertools

myList = [1, 2, 3, 1]

list(itertools.combinations(myList, 2))
>> [(1, 2), (1, 3), (1, 1), (2, 3), (2, 1), (3, 1)]

list(itertools.combinations_with_replacement(myList, 2))
>> [(1, 1), (1, 2), (1, 3), (1, 1), (2, 2), (2, 3), (2, 1), (3, 3), (3, 1), (1, 1)]

list(itertools.combinations(myList, 3))
>> [(1, 2, 3), (1, 2, 1), (1, 3, 1), (2, 3, 1)]

list(itertools.combinations_with_replacement(myList, 3))
>> [(1, 1, 1), (1, 1, 2), (1, 1, 3), (1, 1, 1), (1, 2, 2), (1, 2, 3), (1, 2, 1), (1, 3, 3), (1, 3, 1), (1, 1, 1), (2, 2, 2), (2, 2, 3), (2, 2, 1), (2, 3, 3), (2, 3, 1), (2, 1, 1), (3, 3, 3), (3, 3, 1), (3, 1, 1), (1, 1, 1)]

```


### islice
- start 부터 stop 까지 step으로 건너 뛰면서 요소 하나씩 반환하는 iterator 반환
 - stop이 None이면 끝까지
```python
import itertools

"""  
islice(iterable, stop) --> islice object  
islice(iterable, start, stop, step) --> islice object

If start is specified, will skip all preceding elements;  

otherwise, start defaults to zero. 

Step defaults to one.  

If specified as another value, step determines how many values are  
skipped between successive calls.
"""

myString = 'hello ward'  

list(itertools.islice(myString, None))
>> ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'a', 'r', 'd']

list(itertools.islice(myString, 4))
>> ['h', 'e', 'l', 'l']

list(itertools.islice(myString, 1, 5))
>> ['e', 'l', 'l', 'o']

# Stop이 None 이므로 1부터 끝까지 slice. but 2칸씩 skip.
list(itertools.islice(myString, 1, None, 2))
>> ['e', 'l', ' ', 'a', 'd']
```



### permutations
 - 순열
 - nPr 에서 n은 요소의 개수, r은 파라미터로 전달
 - 값이 아니라 순서로 고유성을 다룸
 - None은 최대 값으로
```python
import itertools

myString = 'abcd'

print(type(itertools.permutations(myString)))
print(itertools.permutations(myString))
print()

print(list(itertools.permutations(myString, 2)))
```

![](https://blog.kakaocdn.net/dn/AK1R3/btrDYqzaUVs/Fs7pcaPFNTPiMnCD7dBUK1/img.png)


### product
 - iterable을 하나만 주면 중복순열
 - 여러개 주면 데카르트 곱
```python
import itertools

myString = 'abc'
myList = [1, 2]

print(type(itertools.product(myString)))
print(itertools.product(myString))
print()

print(list(itertools.product(myString, repeat=2)))
print(list(itertools.product(myString, myList)))
print(list(itertools.product(myString, myList, repeat=2)))
```

![](https://blog.kakaocdn.net/dn/dtwOES/btrDYLjb3KF/fiImF5eKHzyAJBGQaeynMK/img.png)


### tee
```python
import itertools

myList = [1, 2, 3]

print(type(itertools.tee(myList)))
print(itertools.tee(myList))
print()

t1, t2, t3 = itertools.tee(myList, 3)
print(list(t1))
print(list(t2))
print(list(t3))
```

![](https://blog.kakaocdn.net/dn/052hr/btrDWFjY5U7/w46snNleWfiKMykjRYpM0K/img.png)

 - 튜플 형태로 같은 이터레이터를 n개 만큼 반환

 - thread-safe하지 않아서 이터러블과 tee 객체를 동시에 쓰기 어려움 (공식 문서 참조)

### zip_longest
 - zip()이랑 같지만 가장 긴 iterable 기준으로 맞춤 (zip은 가장 짧은 iterable을 기준으로 남는건 버림)
 - 비어있는 (짧은 iterable에서 범위 밖)은 fillvalue로 채워짐
```python
import itertools

myList1 = [1, 2, 3]
myList2 = [1, 2, 3, 4, 5]

print(type(itertools.zip_longest(myList1, myList2)))
print(itertools.zip_longest(myList1, myList2))
print()

print(list(itertools.zip_longest(myList1, myList2)))
print(list(itertools.zip_longest(myList1, myList2, fillvalue=0)))
```

![|603](https://blog.kakaocdn.net/dn/5ZxCd/btrDWFdbKOu/ye3AR63okZ9SU87MzUN4ZK/img.png)



### compress
```
import itertools

myList1 = [0, 1, 2, 3, 4, 5, 6, 7]
myList2 = [1, 0, True, False, 'string', '']

print(type(itertools.compress(myList1, myList2)))
print(itertools.compress(myList1, myList2))
print()

print(list(itertools.compress(myList1, myList2)))
```

![](https://blog.kakaocdn.net/dn/crUGtN/btrD0spRDni/t49k7KZISQC8zd4cHvfmV0/img.png)

 - 해당 index의 selectors 요소가 True 인 놈들만 반환하는 iterator 반환

 - 길이가 다르면 짧은 놈 기준

### count
 - start부터 step 간격으로 무한히 증가하는 요소를 반환
 - 연속적인 데이터를 다루기 위한 map()에 대한 인자나 시퀀스 번호를 추가하기 위한 zip()과 함께 사용됨
 - int 대신에 float도 작동은 하나, 정확도를 위해 (start + step * i for i in count()) 등을 이용하길 권장
 - c언어 스러운 for문을 돌리기도 좋을 듯
```
import itertools

print(type(itertools.count(1, 100)))
print(itertools.count(1, 100))
print()
```

![|288](https://blog.kakaocdn.net/dn/F3TTG/btrDYLwF0XC/rkYZpTgDUilKcsTGrvzstk/img.png)


### cycle
 - iterable의 요소를 반복하며 계속 반환하는 iterator 반환
```
import itertools

myList = [1, 2, 3]

print(type(itertools.cycle(myList)))
print(itertools.cycle(myList))
```

![](https://blog.kakaocdn.net/dn/bId3KF/btrDW95tyXi/VzsmZksNf8y6GuHf9iXc4K/img.png)


### dropwhile
```
import itertools

myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

print(type(itertools.dropwhile(lambda x: x % 5, myList)))
print(itertools.dropwhile(lambda x: x % 5, myList))
print()

print(list(itertools.dropwhile(lambda x: x % 5, myList)))
```

![](https://blog.kakaocdn.net/dn/kSXlW/btrDZu2w6lE/DLjFdY5MLtSAea18jXJla1/img.png)

 - predicate가 거짓인 경우를 만나기 전까지 모든 요소를 반환

### filterfalse

```
import itertools

myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

print(type(itertools.filterfalse(lambda x: x % 2, myList)))
print(itertools.filterfalse(lambda x: x % 2, myList))
print()

print(list(itertools.filterfalse(lambda x: x % 2, myList)))
print(list(itertools.filterfalse(None, myList)))
```

![](https://blog.kakaocdn.net/dn/cnjs0h/btrDWKLCTAd/Vzr9i40xM9Hevb6j0PaWVk/img.png)

 - predicate가 False 인 요소만 반환하는 iterator 반환

 - predicate가 None인 경우 거짓인 항목을 반환

### repeat

```
import itertools

print(type(itertools.repeat('a')))
print(itertools.repeat('a'))
print()

print(list(itertools.repeat('a', 10)))
```

![](https://blog.kakaocdn.net/dn/dYoGpv/btrDWTCgjbB/c8tR0xMWqssJShf5BUG3B1/img.png)

 - times를 주지 않으면 영원히 반복

### starmap

```
import itertools

myList = [(2,5), (3,2), (10,3)]

print(type(itertools.starmap(pow, myList)))
print(itertools.starmap(pow, myList))
print()

print(list(itertools.starmap(pow, myList)))
print()
```

![](https://blog.kakaocdn.net/dn/OokEk/btrDZvUIQ2Z/pg0KOdgGVmjblvDnX8oHN0/img.png)

 - iterable에서 얻은 인자를 사용하여 함수를 계산

 - 인자 매개 변수가 이미 튜플일때 (미리 zip 일때) map()대신 계산

### takewhile

```
import itertools

myList = [1, 2, 3, 2, 1]

print(type(itertools.takewhile(lambda x : x < 3, myList)))
print(itertools.takewhile(lambda x : x < 3, myList))
print()

print(list(itertools.takewhile(lambda x : x < 3, myList)))
```

![](https://blog.kakaocdn.net/dn/S6rYK/btrDWTCgBO8/GGauTOQMn0uUqiNKAkn7O0/img.png)

 - predicate가 true일 동안만 요소를 반환 (dropwhile의 반대)

 - 첫 false 이후 중단
### pairwise
 - 가능한 연속하는 두개의 요소를 묶어서 반환. 
```
import itertools

myString = '123456789'

print(type(itertools.pairwise(myString)))
print(itertools.pairwise(myString))
print()

print(list(itertools.pairwise(myString)))
```

![](https://blog.kakaocdn.net/dn/0yLkJ/btrDVLYVt03/OiUzvMapkqzqQLbheCkboK/img.png)


### groupby
 - key 값을 기준으로 값들을 묶어서 (key, iterator) 형태의 튜플 변환
 - 판다스의 groupby와 다른놈 (비슷하긴 함)
 - SQL의 GROUP BY와는 다름
```python
import itertools

myString = 'abbcccddddaaa'
myList = [('Europe', 'Manchester'),
          ('America', 'NewYork'),
          ('Asia', 'Seoul'),
          ('Asia', 'Tokyo'),
          ('America', 'Chicago'),
          ('America', 'Seattle'),
          ('Europe', 'London'),
          ('Asia', 'Beijing'),
          ('Europe', 'Paris'),
          ]

print(type(itertools.groupby(myList)))
print(itertools.groupby(myList))
print()


print(list(itertools.groupby(myString)))
print()


for item in itertools.groupby(myString):
    print(list(item[1]))
print()


# 예시
category = {}

for key, group in itertools.groupby(sorted(myList), lambda x: x[0]):
    listg = [x[1] for x in list(group)]
    category[key] = listg

print(category)
```

