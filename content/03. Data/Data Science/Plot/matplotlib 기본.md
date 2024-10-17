---
title: matplotlib 기본
date: 2024-04-30
draft: false
tags:
  - plotting
complete: true
---
### create graph
```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 6, 0.1)
y = np.sin(x)

plt.plot(x,y)
plt.show()
```
![|575](https://i.imgur.com/XBDzANZ.png)

### pyplot
```python
import numpy as np
import matplotlib.pyplot as plt
X= np.arange(0, 6, 0.1)  
y1 = np.sin(x)
y2 = np.cos(x)
# 그래프 그리기
plt.plot(x, y1, label="sin")
plt.plot(x, y2, linestyle="--", label="cos")
plt.xlabel("x") #x축이름
plt.ylabel("y") #y축이름 plt. title('sin & Cos') # plt. legend()
plt.show ()
```

![|575](https://i.imgur.com/1z4gVuw.png)

