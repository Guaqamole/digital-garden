---
title: Python Map
date: 2023-12-17
draft: false
tags:
  - StandardLibrary
complete: true
link: https://docs.python.org/3/library/functions.html#map
---

## 1. Explain
'map' 함수는 파이썬 내장 함수 중 하나로, 주어진 함수를 시퀀스(리스트, 튜플 등)의 각 요소에 적용하여 새로운 이터레이터를 반환합니다. 이러한 함수는 함수형 프로그래밍의 개념을 지원하며, 반복문을 사용하지 않고도 요소들을 변환하거나 처리할 수 있는 편리한 방법을 제공합니다.

> [!success] Syntax
> $$ \text{map(function, iterable, *iterable)} $$

> [!NOTE]
> Return an iterator that applies _function_ to every item of _iterable_, yielding the results. If additional _iterables_ arguments are passed, _function_ must take that many arguments and is applied to the items from all iterables in parallel. With multiple iterables, the iterator stops when the shortest iterable is exhausted. For cases where the function inputs are already arranged into argument tuples, see [`itertools.starmap()`](https://docs.python.org/3/library/itertools.html#itertools.starmap "itertools.starmap").


## 2. Feature
### 