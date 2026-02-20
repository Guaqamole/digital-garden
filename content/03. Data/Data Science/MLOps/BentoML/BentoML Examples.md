---
title: BentoML Examples
date: 2024-07-08
draft: false
tags:
  - BentoML
complete: true
link: https://github.com/bentoml/gallery/tree/main/sklearn/linear_regression
---
## SGD Classifier
requirements
```python
bentoml==1.2.19
scikit-learn==1.5.0
```

train.py
```python
from __future__ import annotations
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import SGDClassifier
import bentoml
from bentoml.io import NumpyNdarray, JSON
from bentoml.sklearn import save_model, load_model

# Load and prepare data
fish = pd.read_csv('https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fish.csv')
fish_input = fish[['Weight', 'Length', 'Diagonal', 'Height', 'Width']].to_numpy()
fish_target = fish['Species'].to_numpy()
train_input, test_input, train_target, test_target = train_test_split(fish_input, fish_target, random_state=42)

# Standardize data
ss = StandardScaler()
ss.fit(train_input)
train_scaled = ss.transform(train_input)
test_scaled = ss.transform(test_input)

# Train the model
sc = SGDClassifier(loss='log_loss', max_iter=100, tol=None, random_state=42)
sc.fit(train_scaled, train_target)

# Save the trained model and scaler with BentoML
save_model("fish_classifier", sc)
save_model("fish_scaler", ss)
```

service.py
```python
import bentoml
from bentoml.io import NumpyNdarray

sc_runner = bentoml.sklearn.get("fish_classifier:latest").to_runner()
ss_runner = bentoml.sklearn.get("fish_scaler:latest").to_runner()

svc = bentoml.Service('sgd_classifier', runners=[sc_runner])

input_spec = NumpyNdarray(
    dtype="int",
    shape=(1, 5)
)

@svc.api(input=input_spec, output=NumpyNdarray())
def predict(input_arr):
    return sc_runner.predict.run(input_arr)
```

run
```python
1. python3 ./train.py
2. bentoml serve service.py:svc
3. curl -X POST -H "Content-Type: application/json" --data '[[242, 25.4, 30, 11.52, 4.02]]' http://127.0.0.1:3000/predict
4. bentoml build
5. bentoml containerize sgd_classifier:lastet
```