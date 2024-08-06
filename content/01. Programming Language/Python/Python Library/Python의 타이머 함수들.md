---
title: Python의 타이머 함수들
date: 2024-08-05
draft: false
tags:
  - Python
complete: true
link: https://realpython.com/python-timer/
---
## Overview 
파이썬의 빌트인 모듈에는 시간을 잴 수 있는 유용한 타이머 기능들이 있다
- [`monotonic()`](https://docs.python.org/3/library/time.html#time.monotonic)
- [`perf_counter()`](https://docs.python.org/3/library/time.html#time.perf_counter)
- [`process_time()`](https://docs.python.org/3/library/time.html#time.process_time)
- [`time()`](https://docs.python.org/3/library/time.html#time.time)


## Python’s Timer Class
```python
import time
type(time)
>> <class 'module'>

time.__class__
>> <class 'module'>
```

### perf_counter
`perf_counter()`는 특정되지 않은 순간부터 초 단위로 시간을 측정하는데, 이는 함수에 대한 단일 호출의 반환 값이 유용하지 않다는 것을 의미합니다. 그러나 두 호출 간의 차이를 살펴보면 `perf_counter()`두 호출 사이에 몇 초가 지났는지 알아낼 수 있습니다.

```python
import time
from reader import feed

def main():
    tic = time.perf_counter()
    tutorial = feed.get_article(0)
    toc = time.perf_counter()
    print(f"Executed the tutorial in {toc - tic:0.4f} seconds")

    print(tutorial)

if __name__ == "__main__":
    main()
```


### time.time
```python
import time
start_time = time.time()

# Your code here

end_time = time.time()
elapsed_time = end_time - start_time
print(f'Time elapsed: {elapsed_time} seconds')

# Output:
# 'Time elapsed: X seconds'
```


### timeit
더 큰 프로젝트를 시작하면서 시간을 측정할 때 정밀도가 중요하다는 것을 금방 깨닫게 될 것입니다. 여기서 Python `timeit`모듈이 등장합니다. 이 `timeit`모듈은 Python 코드의 작은 비트를 측정하는 간단한 방법을 제공합니다.
```python
import timeit

start_time = timeit.default_timer()

# List comprehension
numbers = [i for i in range(1000000)]

end_time = timeit.default_timer()

elapsed_time = end_time - start_time
print(f'Time elapsed: {elapsed_time} seconds')

# Output:
# 'Time elapsed: X seconds'
```



## Measuring Your Code
```python
import builtins

from random import randint
from timeit import repeat

def my_sort(array):
    return array

def test_sorting_algorithm(algorithm, array):
    is_builtin = algorithm in dir(builtins)
    setup_code = f"from __main__ import {algorithm}" if not is_builtin else f""

    stmt = f"{algorithm}({array})"
    
    times = repeat(setup=setup_code, stmt=stmt, repeat=10, number=10)
    print(f"Algorithm: {algorithm}; Minimum execution time: {min(times)}")
    print(f"Algorithm: {algorithm}; Maximum execution time: {max(times)}")

if __name__ == "__main__":
    ARRAY_LENGTH = 100000
    array = [randint(0, 1000) for i in range(ARRAY_LENGTH)]
    test_sorting_algorithm(algorithm="sorted", array=array)
    test_sorting_algorithm(algorithm="my_sort", array=array)

```
