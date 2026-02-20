---
title: SGD Classifier
date: 2024-07-09
draft: false
tags:
  - MachineLearning
  - SGD
  - SupervisedLearning
complete: true
---
## SGDClassifier
```python
pip install pandas scikit-learn numpy matplotlib

# https://velog.io/@dbs991013/%ED%99%95%EB%A5%A0%EC%A0%81-%EA%B2%BD%EC%82%AC-%ED%95%98%EA%B0%95%EB%B2%95Stochastic-Gradient-Descent
# https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fish.csv
# https://bit.ly/fish_csv_data
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import SGDClassifier

fish = pd.read_csv('data/fish.csv')
fish.head(5)


# input, target 데이터 나누기
fish_input = fish[['Weight', 'Length', 'Diagonal', 'Height', 'Width']].to_numpy()
fish_target = fish['Species'].to_numpy()
print(fish_input[:5], fish_target[:5])

# train set, test set 나누기
train_input, test_input, train_target, test_target = train_test_split(fish_input, fish_target, random_state=42)
print(train_input.shape, test_input.shape)

# 표준화 전처리
ss = StandardScaler()
ss.fit(train_input)
train_scaled = ss.transform(train_input)
test_scaled = ss.transform(test_input)
print(train_scaled[:5])


# 에포크 수에 따른 점수 기록
import numpy as np
sc = SGDClassifier(loss='log_loss', random_state=42)
train_score = []
test_score = []
classes = np.unique(train_target)

for _ in range(0, 300):
  sc.partial_fit(train_scaled, train_target, classes=classes)
  train_score.append(sc.score(train_scaled, train_target))
  test_score.append(sc.score(test_scaled, test_target))

plt.plot(train_score)
plt.plot(test_score)
plt.xlabel('epoch')
plt.ylabel('accuracy')
plt.show()
```