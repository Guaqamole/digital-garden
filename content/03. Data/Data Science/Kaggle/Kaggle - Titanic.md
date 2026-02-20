---
title: Kaggle - Titanic
date: 2025-09-09
draft: false
tags:
  - Kaggle
  - MachineLearning
complete: true
banner: /_assets/_img/_banners/nebula.jpg
link: https://www.kaggle.com/competitions/titanic
---
## Problem Statement
- target: binary classification
- metric: accuracy
- method: linear regression -> logistic regression

## Data Prep
### download
```python
import os
import pandas as pd

!kaggle competitions download -c titanic
!unzip titanic.zip
!ls

gender_submission.csv sample_data titanic.zip kaggle.json test.csv train.csv
```

### data overview
#### info
```python
df = pd.read_csv('train.csv')
df.head()
```



### preprocessing
