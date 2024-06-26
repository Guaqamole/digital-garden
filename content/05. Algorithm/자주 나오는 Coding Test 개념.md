---
title: 자주 나오는 Coding Test 개념
date: 2024-06-25
draft: false
tags:
  - CodingTest
complete: true
---
## Math
### GCD & LCM
gcd
```python

```

lcm
```python
# Function to calculate the LCM of two numbers
def lcm(x, y):
    # Find the larger of the two numbers
    larger = max(x, y)
        for i in range(larger, x * y + 1):
        if i % x == 0 and i % y == 0:
            return i

# Prompting the user to input values for num1 & num2
num1 = int(input("Enter the first number: "))
num2 = int(input("Enter the second number: "))

# Calculate the LCM
result = lcm(num1, num2)

# Display the LCM
print(f"The LCM of {num1} and {num2} is {result}")
```