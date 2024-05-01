---
title: Logical Gates
date: 2024-04-30
draft: false
tags:
  - numpy
complete: true
---
### AND gate
```python
def AND(a, b, w:list, bias):
    x = np.array([a, b])
    tmp = np.sum(w*x) + bias
    if tmp < 0:
        return 0
    return 1

>> AND(0, 0, [0.5,0.5], -0.7)
>> 0
```

w1 과w2 는각입력신호가결과에 주는영향력( 중요도) 을조절하는매개변수고, 편향은뉴 런이얼마나쉽게활성화(결과로1을출력) 하느냐를조정하는매개변수입니다.

편향의값은뉴런이얼마나쉽게활성화되는지를결정합니다. 한편W, 과w는 ' 가중치'로, b는' 편향' 으로서로구별하기도합니다만, 이책에서는문맥에따
라셋모두를'가중치'라고할때도있습니다

### NAND gate
- AND와는가중치(w와b)만다르다!
```python
def NAND(a, b, w:list, bias):
    x = np.array([a, b])
    tmp = np.sum(w*x) + bias
    if tmp <= 0:
        return 0
    return 1
>> NAND(0,0, [-0.5, -0.5], 0.7)
>> 1
```