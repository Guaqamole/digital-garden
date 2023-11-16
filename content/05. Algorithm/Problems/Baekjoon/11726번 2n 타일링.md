---
title: 11726번 2xn 타일링
date: 2023-11-13
draft: false
tags:
  - CodingTest
Platform: Baekjoon
link: https://www.acmicpc.net/problem/11726
difficulty:
  - 실버3
highlight: false
Comment: N/A
Status: Not Solved ✏️
idea: false
implement: true
time-complexity: true
time-enough: true
tries:
---
# 문제

|시간 제한|메모리 제한|제출|정답|맞힌 사람|정답 비율|
|---|---|---|---|---|---|
|1 초|256 MB|157188|60657|44955|36.519%|

2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.

아래 그림은 2×5 크기의 직사각형을 채운 한 가지 방법의 예이다.

![](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/11726/1.png)

## 입력

첫째 줄에 n이 주어진다. (1 ≤ n ≤ 1,000)

## 출력

첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.

## 예제 입력 1

```
2
```

## 예제 출력 1

```
2
```

## 예제 입력 2

```
9
```

## 예제 출력 2

```
55
```


___

# 풀이

$$dp[n] = dp[n-1] + dp[n-2]$$

____

# 코드
- bottom - up 방식

```python
n = int(input())
tab = [0] * 1001
tab[1], tab[2] = 1,2

for i in range(3, n+1):
    tab[i] = (tab[i - 1] + tab[i - 2]) % 10007

print(tab[n])
```




___

# 비슷한 문제들






___