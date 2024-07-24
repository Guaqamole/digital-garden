---
title: MLFlow Examples
date: 2024-07-23
draft: false
tags:
  - MLFlow
complete: true
---
## Overview

## Basic
### save_model
```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn import datasets
import time

mlflow.set_experiment("default")  # Creates an experiment if it doesn't exist

iris = datasets.load_iris()
x = iris.data[:, 2:]
y = iris.target
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=7)

# Start an MLflow run
with mlflow.start_run(run_name="iris-rf") as run:
    num_estimators = 100
    mlflow.log_param("num_estimators", num_estimators)

    rf = RandomForestRegressor(n_estimators=num_estimators)
    rf.fit(X_train, y_train)
    predictions = rf.predict(X_test)

    mlflow.sklearn.log_model(rf, "random-forest-model")

    mse = mean_squared_error(y_test, predictions)
    mlflow.log_metric("mse", mse)
    print(" mse: %f" % mse)

    run_id = run.info.run_id
    experiment_id = run.info.experiment_id

while True:
    run_info = mlflow.get_run(run_id).info
    status = run_info.status
    print(f"Current run status: {status}")
    if status == 'FINISHED':
        break
    time.sleep(5)  

print(f"Artifact URI: {run_info.artifact_uri}")
print(f"Run ID: {run_id}")
print(f"Experiment ID: {experiment_id}")
print(f"Final run status: {status}")
```

### load_model
```python
import mlflow
import mlflow.sklearn
from sklearn.model_selection import train_test_split
from sklearn import datasets

iris = datasets.load_iris()
x = iris.data[:, 2:]
y = iris.target
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=7)

artifact = "random-forest-model"
run_id = "bcee62c8a8a24315b8aeb4a0a8694078"
model_uri = f"runs:/{run_id}/{artifact}"
loaded_model = mlflow.sklearn.load_model(model_uri)

predictions = loaded_model.predict(X_test)
print(predictions)

# # If you need to log new metrics or parameters, you can start a new run and log them
# with mlflow.start_run(run_name="Iris RF Prediction") as run:
#     # Log the predictions or any other metrics if needed
#     mlflow.log_metric("mse", mean_squared_error(y_test, predictions))
#     print("MSE: %f" % mean_squared_error(y_test, predictions))
#     mlflow.end_run()

```