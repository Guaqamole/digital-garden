---
title: Colab에서 Kaggle Data읽기
date: 2025-09-08
draft: false
tags:
  - Colab
  - Kaggle
complete: true
banner: /_assets/_img/_banners/nebula.jpg
---
```python
from google.colab import drive
from os.path import join
ROOT = "/content/drive"
print(ROOT)
drive.mount(ROOT)

!git config --global user.email hiavokado@gmail.com
!git config --global user.name Guaqamole
```

```python
!pip install -q kaggle 
!mkdir -p ~/.kaggle 

from google.colab import files  
files.upload() # kaggle.json 업로드
```

```python
!mkdir -p ~/.kaggle
!cp kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json
```

```python
!kaggle datasets list

# https://www.kaggle.com/code/kanncaa1/machine-learning-tutorial-for-beginners/input
# using this dataset: https://www.kaggle.com/datasets/uciml/biomechanical-features-of-orthopedic-patien

import kagglehub

# Download latest version
path = kagglehub.dataset_download("uciml/biomechanical-features-of-orthopedic-patients")

print("Path to dataset files:", path)
```

```python
import os
import pandas as pd

# 다운로드된 폴더 안 파일 확인
print(os.listdir(os.curdir))
#print(os.listdir(path))

# CSV 파일 불러오기 (예시)
df = pd.read_csv(os.path.join(path, "column_2C_weka.csv"))
print(df.head())
```