---
title: Python Walrus Operator
date: 2023-10-31
draft: false
tags:
  - Python
  - Fundamental
complete: false
---
`:=` : 파이썬 3.8에서 추가된 연산자로 값을 할당함과 동시에 해당 값을 반환하는 연산자이다.

while문과 함께 사용하면 궁합이 좋다.

```python
print(a := 5)
>>> 5
```

바다코끼리 연산자가 없었다면 이렇게 써야한다.

```python
while True:
	n = int(input())
	if not n:
    	break
```