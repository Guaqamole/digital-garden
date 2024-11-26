---
title: Array 중복 제거
date: 2024-04-26
draft: false
tags:
  - Python
complete: true
---
```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        hashset = set()

        for n in nums:
            if n in hashset:
                return True
            hashset.add(n)
        return False
```
