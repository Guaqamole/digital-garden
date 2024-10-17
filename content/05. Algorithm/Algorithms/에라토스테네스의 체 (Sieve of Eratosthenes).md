---
title: 에라토스테네스의 체 (Sieve of Eratosthenes)
date: 2023-11-02
draft: false
tags:
  - Math
  - Concept
complete: true
---
고대 그리스의 수학자 에라토스테네스 (Eratosthenes) 가 만들어 낸 소수를 찾는 방법. 이 방법은 마치 체로 치듯이 수를 걸러낸다고 하여 `에라토스테네스의 체` 라고 부른다.

```python
def prime_list(n):
    # 에라토스테네스의 체 초기화: n개 요소에 True 설정(소수로 간주)
    sieve = [True] * n

    m = int(n ** 0.5)
    for i in range(2, m + 1):
        if sieve[i] == True:           # i가 소수인 경우 
            for j in range(i+i, n, i): # i이후 i의 배수들을 False 판정
                sieve[j] = False

    # 소수 목록 산출
    return [i for i in range(2, n) if sieve[i] == True]
```

아래 그림으로 알고리즘이 진행되는 모습을 육안으로 확인할 수 있다.

![](https://blog.kakaocdn.net/dn/k46OV/btq2Nx3GU7j/hQiuyWWdNmIK9J0W96CEZ1/img.gif)

임의의 자연수 n이 있으면 그 미만의 소수들을 전부 찾아내는 데 있어서 최적화된 알고리즘이라고 할 수 있다. 

기원전 200년대부터 쓴 검증된 로직이다.