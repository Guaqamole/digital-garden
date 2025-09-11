---
title: Numpy 50 Questions
date: 2025-09-10
draft: false
tags:
  - Numpy
complete: true
banner: /_assets/_img/_banners/nebula.jpg
link: https://www.kaggle.com/code/themlphdstudent/learn-numpy-numpy-50-exercises-and-solution
---
## Basic
### Exercise 2. How to create a 1D array?
```python
# Python list
print(np.array([1, 2, 3, 4]))

# Zeros
print(np.zeros(4))

# arange
print(np.arange(4))

# rand
print(np.random.rand(5))

# empty
print(np.empty(5))

# full(shape, value, dtype)
np.full(5, 0, dtype=np.float32)
```

#### 2D array
```python
import numpy as np

# Python list -> 2D array
print(np.array([[1, 2, 3], [4, 5, 6]]))

# Zeros
print(np.zeros((2, 3)))   # 2행 3열

# arange + reshape
print(np.arange(6).reshape(2, 3))  # 0~5까지 -> 2x3

# rand
print(np.random.rand(2, 3))   # 2행 3열 난수

# empty
print(np.empty((2, 3)))   # 초기화 안 된 2D 배열 (값은 랜덤 쓰레기 값일 수 있음)

# full(shape, value, dtype)
print(np.full((2, 3), 7, dtype=np.float32))   # 2x3 크기, 모든 값 7
```

#### array manipulation
- `(3,)` = 그냥 길이가 3인 1D 배열 (행, 열 개념 없음)
- `(3,1)` = 2D 배열, 세로 방향 벡터
- `(1,3)` = 2D 배열, 가로 방향 벡터
```python
a = np.arange(1,4)

print(np.shape(a)) # (3,)
print(a.reshape(3, 1))
print(a.reshape(1, 3))
```

### Exercise 3. How to create a boolean array?
```python
a = np.full(5, False, dtype=bool)

type(a[0])
```

### Extract items - Broadcasting
```python
# Question : Extract all odd numbers from array
# input: arr = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
# output: array([1, 3, 5, 7, 9])

arr = np.arange(10)
out = arr[arr % 2 == 1]
out
```

### Replace Items ⭐ - Broadcasting
```python
# Question: Replace all odd numbers in arr with -1
# input: arr = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
# output: array([ 0, -1,  2, -1,  4, -1,  6, -1,  8, -1])
arr = np.arange(10)

arr[arr%2 == 1] = -1
arr
```

### _Exercise 7_. How to reshape an array?
```python
arr = np.arange(6)
arr.reshape(2,3)

arr2 = np.arange(10)
arr2.reshape(2, -1) # Setting to -1 automatically decides the number of cols

array([[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]])
```

### Exercise 8. How to stack two arrays?
#### Vertical
```python
a = np.arange(10).reshape(2,-1)
b = np.arange(10, 20).reshape(2,-1)
np.vstack((a,b))

array([
	[ 0, 1, 2, 3, 4], 
	[ 5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19]
])
```

#### Horizontal
```python
np.hstack((a,b))

array([
[ 0, 1, 2, 3, 4, 10, 11, 12, 13, 14], 
[ 5, 6, 7, 8, 9, 15, 16, 17, 18, 19]
])
```

### Custom Sequence ⭐ - tile, repeat, np.r
- repeat: 요소별 반복
- tile: 배열단위 반복
- np.r: concat
	- or np.concatenate([...])
```python
# Input: a = np.array([1,2,3])
# Output: array([1, 1, 1, 2, 2, 2, 3, 3, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3])

a = np.array([1,2,3])
[np.repeat(a,3)] # [array([1, 1, 1, 2, 2, 2, 3, 3, 3])]
[np.tile(a,3)] # [array([1, 2, 3, 1, 2, 3, 1, 2, 3])]
np.concatenate([[1,2,3], [4,5,6]]) # array([1, 2, 3, 4, 5, 6])

# Solution
np.r_[np.repeat(a, n), np.tile(a, n)]
np.concatenate([np.repeat(a, 3), np.tile(a, 3)]) # alternative

array([1, 1, 1, 2, 2, 2, 3, 3, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3])
```

