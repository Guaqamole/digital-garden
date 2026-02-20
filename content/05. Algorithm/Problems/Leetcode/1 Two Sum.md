---
title: 1 Two Sum
date: 2024-04-25
draft: false
tags:
  - CodingTest
Platform: LeetCode
link: https://leetcode.com/problems/two-sum
difficulty:
  - Easy
highlight: false
Comment: N/A
Status: Solved ✅
idea: true
implement: true
time-complexity: 
time-enough: true
tries: 1
---
# 문제
Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

```
Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].


Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]


Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**
- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**



___

# 풀이
1. Bruteforce
2. Hashmap + minus

____

# 코드
brute-force O(n^2)
```python
class Solution(object):  

    def twoSum(self, nums, target):  
	    answer = [None, None]  
  
        for x in range(len(nums)):  
            for y in range(x, len(nums)):  
                if y != x and nums[x] + nums[y] == target:  
                    answer = [x, y]  
                    return answer
```

hashmap + minus
```python
hashmap = {}  
for x in range(len(nums)):  
    diff = target - nums[x]  
  
    if diff in hashmap:  
        return [x, hashmap[diff]]  
  
    hashmap[nums[x]] = x
```




___


# 배운것
[[Python Loop Master]]  → Print without Pivot




---


# 비슷한 문제들






___
