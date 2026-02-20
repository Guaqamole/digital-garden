---
title: Numpy Intro
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

### Auto resize Array 
- train_input 은 (42, ) 라고 가정하고 2차원 배열 (42, 1) 로 만들어야함
- train_input.reshape(42, 1) 을 사용해도 되지만 자동으로 지정하는 기능도 있기때문에 적극 활용.
```python
import numpy as np

train_input = train_input.reshape(-1, 1)
test_input = test_input.reshape(-1, 1)
>> (42, 1) (14, 1)
```

## Numpy I/O
|Function|Description|
|---|---|
|`save()`|saves an array to a binary file in the NumPy `.npy` format.|
|`load()`|loads data from a binary file in the NumPy `.npy` format|
|`savetxt()`|saves an array to a text file in a specific format|
|`loadtxt()`|loads data from a text file.|
### save()
```python
import numpy as np

# create a NumPy array
array1 = np.array([[1, 3, 5], 
                   [7, 9, 11]])

# save the array to a file
np.save('file1.npy', array1)
```

### load()
```python
import numpy as np

# load the saved NumPy array
loaded_array = np.load('file1.npy')

# display the loaded array
print(loaded_array)
```


## Indexing