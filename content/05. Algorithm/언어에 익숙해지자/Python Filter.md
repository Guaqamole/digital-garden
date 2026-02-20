---
title: Python Filter
date: 2023-10-31
draft: false
tags:
  - Python
  - Fundamental
complete: false
---
## Filter None

> [파이썬 filter 공식문서](https://docs.python.org/3/library/functions.html#filter)

filter에 함수 대신 None을 넣으면 **False**에 해당하는 값을 모두 지워준다. (0, False, None 등등)

즉 소수가 아닌 값을 0으로 만들어 놓고, `filter(none)`에 넣으면 해당 값이 사라지게 된다.

이를 통해 소수만 남은 리스트를 얻을 수 있다.