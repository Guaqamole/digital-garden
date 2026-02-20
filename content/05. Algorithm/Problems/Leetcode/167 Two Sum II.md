---
title: 167 Two Sum II
date: 2024-07-15
draft: false
tags:
  - CodingTest
Platform: LeetCode
link: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
difficulty:
  - Medium
highlight: false
Comment: N/A
Status: Not Solved ✏️
idea: 
implement: true
time-complexity: true
time-enough: true
tries: 1
problem-type:
---
# 문제




___

# 풀이





____

# 코드

```python
def twoSum(numbers: list[int], target: int) -> list[int]:
    left = 0
    right = len(numbers) - 1

    while left < right:
        if numbers[left] + numbers[right] == target:
            return [left + 1, right + 1]
        elif numbers[left] + numbers[right] < target:
            left += 1
        else:
            right -= 1

numbers = [2,7,11,15]
target = 9

# numbers = [2, 3, 4]
# target = 6

# numbers = [-1, 0]
# target = -1

# numbers = [0, 0, 3, 4]
# target = 0

print(twoSum(numbers, target))
```




___

# 배운것






---


# 비슷한 문제들






___
