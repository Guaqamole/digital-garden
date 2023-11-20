---
title: Baekjoon Skeleton Codes
date: 2023-10-24
draft: false
tags:
  - CodingTest
complete: true
---
# 여러개 입력

```bash
4 2 3 4
```

```python
a, b, c, d = map(int, input().split())
```

```python
5 3 
1 2 34 5
```

```python
n,m = map(int, input().split())
nums = list(map(int,input().split()))
```
# N 개 입력을 list에 넣기

```bash
3
1 3
2 4
3 5
```

```python
n = int(input())
li = []
for i in range(n):
    start, end = map(int, input().split())
    li.append([start, end])
```

is same as
```python
n = int(input())
li = [list(map(int, input().split())) for _ in range(n)]
```


```python
print(li)
>> [[1, 3], [2, 4], [3, 5]]
```



# 입력이 몇개인지 모를때 여러줄 입력 받기
```bash
1 2
3
3 4
7
9 12
21
```

```python
import sys 
for line in sys.stdin: 
	a, b = map(int, line.split()) 
	print(a+b)
```


# 명령어 형식
```bash
14
push 1
push 2
top
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
top
```

```python
n = int(input())

for _ in range(n):
    command = input().split()
    if command[0] == 'push':
...
```

# 특정 값이 나올때 까지 입력받기
- 0 이나오면 끝.
```python
8
20
42
0
```

```python
import sys

while True:
    n = int(sys.stdin.readline())

    if n == 0:
        break
```
