---
title: Python Loop Master
date: 2024-04-25
draft: false
tags:
  - Python
  - Fundamental
complete: true
---
## Print without Pivot
```python
nums = [2, 7, 3, 8]

# Iterate over each number in the list
for i in range(len(nums)):
    pivot = nums[i]
    print("Pivot:", pivot)
    for j in range(len(nums)):
        if j != i:
            print(nums[j])
    print()  # Add an empty line after each permutation

```

```
Pivot: 2
7
3
8

Pivot: 
2
3
8

Pivot: 3
2
7
8

Pivot: 8
2
7
3
```
