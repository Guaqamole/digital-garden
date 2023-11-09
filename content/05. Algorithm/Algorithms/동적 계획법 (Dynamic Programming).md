---
title: 동적 계획법 (Dynamic Programming)
date: 2023-11-09
draft: false
tags:
  - DynamicProgramming
  - Concept
complete: true
---

> [!success]+ definition
> 동적 계획법은 어떤 문제를 여러개의 작은 문제로 나눠 해결하고 그 결과를 저장을 했다가 큰 문제를 풀 때 사용하는 문제 풀이 기법입니다.

즉, 한 번 푼 문제는 다시 풀지 않게 되는 것이죠. 분할 정복 알고리즘과 비슷하다고 생각하실 수도 있는데 해결한 문제를 반복적으로 해결하는 분할 정복과는 달리 <mark style="background: #C6AB16;">동적 계획법은 이미 푼 문제는 기억하여 다시 풀지 않기 때문에 부분 문제가 중복된다면 더욱 효율적</mark>이라고 볼 수 있습니다.

이렇게 해결한 작은 문제를 리스트에 저장하여 재사용을 하는데 이런 기법을 **메모이제이션(Memoization)** 이라고 합니다.

---

# 동적 계획법의 사용 조건

동적 계획법을 사용하기 위해서는 다음 두 가지 조건을 만족해야 합니다.

> **1) 최적 부분 구조(Optimal Substructure)**  
>   
> 문제의 최종 해결 방법은 부분 문제의 최적 문제 해결 방법으로 구성됩니다. 문제를 해결하는 모든 단계에 대해서 해당 단계의 최적해가 도출되어야 합니다.   
>   
> ex) 부분 문제에서 A에서 B까지의 최단 경로 X를 구했을 때 X는 모든 문제에서 최단 경로  
>   
>   
> **2) 겹치는 부분 문제(Overlapping Subproblems)**  
>   
> 동일한 작은 문제들이 중복되어 사용되는 경우 사용이 가능합니다. 위에서 설명했듯 메모이제이션을 하여 작은 문제를 재사용할 수 있어야 동적 계획법이 의미가 있습니다.

---
# 동적 계획법 적용 방식

동적 계획법 적용하는데 **Top-Down** 방식과 **Bottom-Up** 방식이 있습니다. 

## Top-Down

하향식이라고 불리며, n의 결괏값을 찾기 위해 위에서부터 출발하여 제일 작은 문제까지 내려간 다음에 결과값을 재사용하여 올라가는 방식입니다. 이미 계산을 완료한 것은 메모이제이션 해두었다가 재사용하여 큰 문제에서 사용합니다.

## Bottom-Up

상향식이라고 불리며, 가장 작은 문제들부터 답을 구하여 큰 문제를 해결하는 방식입니다. 재귀 호출을 하지 않기 때문에 시간과 메모리 사용량을 줄일 수 있다는 장점을 갖고 있습니다.  반복문을 통해 제일 작은 문제부터 결과를 채워나가는데 이때 채우는 과정을 **Table Filling이라고** 하며, 이 테이블에 저장된 결과를 사용하는 것을 **Tabulation**이라고 합니다.

---

# 동적 계획법 적용

## Fibonacci sequence

피보나치수열은 재귀 알고리즘 또는 동적 계획법으로 해결할 수 있는 대표적인 문제입니다. 재귀 알고리즘에 대한 예시를 들때 대표적으로 사용되는 문제입니다.

$$ \text{Time Complexity} : O(2^n)$$
$$ \text{Space Complexity} : O(n)$$

```python
# fibonacci.py
def fibo(n):
    if n == 1 or n == 2:
        return 1
    else:
        return fibo(n-1) + fibo(n-2)
```

피보나치 수열은 재귀 알고리즘으로 풀게 되면 점화식에 따라 위와 같이 재귀 호출을 하게 됩니다.

![](https://blog.kakaocdn.net/dn/tHG1Q/btrHYLNBFzQ/KnJyVZNgGV5URe2QPSpCTK/img.png)

n이 5일 때의 함수 호출을 상태 트리로 나타내면 위와 같이 나타낼 수 있고, fibo(3), fibo(2), fibo(2)와 같이 중복되는 부분 문제가 발생한다는 것을 알 수 있습니다. <mark style="background: #C6AB16;">n이 커질수록 중복 되는 부분 문제 또한 많아질 것이고, 이렇게 되면 수행 시간이 시간 복잡도 O(2 ** n)으로 기하급수적으로 증가하게 됩니다.</mark>

피보나치수열은 작은 문제의 답이 그것을 포함한 큰 문제에서도 답이 되고, 동일한 작은 부분 문제들이 중복되어 사용되므로 두 가지 조건을 만족합니다. 이제 동적 계획법으로 피보나치수열을 작성해볼까요?


## Top-Down approach

```python
# fibonacci.py
def fibo(n):
    if n == 1 or n == 2:
        return 1
    else:
        # memoization 리스트에 작은 문제의 결과가 저장되어 있다면 저장값리턴
        if memoization[n] != 0:
            return memoization[n]
        # 아직 작은 문제의 결과가 memoization 리스트에 저장되지 않았다면
        else:
            # memoization! 작은 문제 결과 저장
            memoization[n] = fibo(n-1) + fibo(n-2)
            # 저장 후 결과 리턴
            return memoization[n]
            
if __name__ == "__main__": 
	num = 5 
	memoization = [0] * (num+1) 
	print(fibo(num))
```

일반적인 재귀 호출과 플로우는 같습니다. 하지만 메모이제이션을 사용하여 작은 문제의 결괏값을 리스트에 저장해두었다가 큰 문제에서 재사용하기 때문에 훨씬 효율적이라고 볼 수 있습니다.

### **fibo(5) 호출 과정**

```
1) memoization[5]은 0, fibo(4) + fibo(3)에서 fibo(4) 호출  
  
2) memoization[4]은 0, fibo(3) + fibo(2)에서 fibo(3) 호출  
  
3) memoization[3]은 0, fibo(2) + fibo(1)에서 fibo(2) 호출  
  
4) n은 2이므로 1 리턴  
  
5) memoization[3], 1 + fibo(1)에서 fibo(1) 호출  
  
6) n은 1이므로 1리턴  
  
7) memoization[3] = 1 + 1 = 2 저장후 리턴  
  
8) memoization[4], 2 + fibo(2)에서 fibo(2) 호출  
  
9) n은 2이므로 1 리턴  
  
10) memoization[4] = 2 + 1 = 3 저장후 리턴  
  
11) memoization[5], 3 + fibo(3)에서 fibo(3) 호출  
  
12) memoization[3]은 2이므로 2 리턴  
  
13) memoization[5], 3 + 2 = 5 저장후 리턴
```



## Botton-Up Approach

```python
# Fibonacci.py
if __name__ == "__main__":
    num = 5
    dp = [0] * (num+1)
    dp[1] = 1
    dp[2] = 1
    
    # Table Filling 
    for i in range(3, num + 1):
        # Tabulation
        dp[i] = dp[i-1] + dp[i-2]
        
    print(dp[num])
```

반복문을 사용해서 제일 작은 문제부터 채워 나갑니다. 1일 때와 2일 때가 결과가 1이기 때문에 이를 이용하여 제일 큰 문제인 5까지 채워나갈 수 있습니다!