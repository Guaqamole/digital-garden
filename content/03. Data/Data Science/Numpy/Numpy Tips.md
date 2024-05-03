---
title: Numpy Tips
date: 2024-05-02
draft: false
tags:
  - Numpy
complete: true
---
### Save result as textfile
```python
import numpy as np

def save(obj, idx):
	np.savetxt(f"result_{idx}.txt",obj[idx],delimiter=',');

def save_all(obj):
	import numpy as np
	np.savetxt(f"result.txt",obj,delimiter=',');
```