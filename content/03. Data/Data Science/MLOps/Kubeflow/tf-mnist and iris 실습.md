---
title: tf-mnist and iris 실습
date: 2024-05-29
draft: false
tags:
  - Kubeflow
complete: true
---
visualization 제공
```python
from kfp import dsl

EXPERIMENT_NAME = 'visualization-experiment'

@dsl.component(
    packages_to_install=['scikit-learn'],
    base_image='python:3.9'
)
def iris_sgdclassifier(test_samples_fraction: float, metrics: dsl.Output[dsl.ClassificationMetrics]):
    from sklearn import datasets, model_selection
    from sklearn.linear_model import SGDClassifier
    from sklearn.metrics import confusion_matrix

    iris_dataset = datasets.load_iris()
    train_x, test_x, train_y, test_y = model_selection.train_test_split(
        iris_dataset['data'], iris_dataset['target'], test_size=test_samples_fraction)


    classifier = SGDClassifier()
    classifier.fit(train_x, train_y)
    predictions = model_selection.cross_val_predict(classifier, train_x, train_y, cv=3)
    metrics.log_confusion_matrix(
        ['Setosa', 'Versicolour', 'Virginica'],
        confusion_matrix(train_y, predictions).tolist() # .tolist() to convert np array to list.
    )

@dsl.pipeline(
    name='metrics-visualization-pipeline')
def metrics_visualization_pipeline():
    iris_sgdclassifier_op = iris_sgdclassifier(test_samples_fraction=0.3)
    
if __name__ == '__main__':
    client.create_run_from_pipeline_func(
        metrics_visualization_pipeline,
        experiment_name=EXPERIMENT_NAME)
```


kubeflow → mlflow

![|675](https://i.imgur.com/fQBn3l6.png)

```python
from kfp import dsl

EXPERIMENT_NAME='fish-experiment'

@dsl.component(packages_to_install=['pandas', 'minio'])
def read_csv(bucket: str, object: str, df_output: dsl.Output[dsl.Dataset]):
    from minio import Minio
    from io import BytesIO
    import pandas as pd
    
    minio_client = Minio('192.168.51.214:9000',
       'minio',
       'minio123',
       secure=False)
    
    try:
        response = minio_client.get_object(bucket, object)
        
        data = response.read()
        df = pd.read_csv(BytesIO(data))
        df.to_csv(df_output.path) # kfp output
    except Exception as e:
        print(f"Error occurred: {e}")
        return None


@dsl.component(packages_to_install=['scikit-learn', 'numpy', 'pandas'], base_image='python:3.9')
def train(df_input1: dsl.Input[dsl.Dataset], df_input2: dsl.Input[dsl.Dataset], model: dsl.Output[dsl.Model]):
    import pickle
    import numpy as np
    import pandas as pd
    from sklearn.neighbors import KNeighborsClassifier
    
    df1 = pd.read_csv(df_input1.path)
    df2 = pd.read_csv(df_input2.path)
    
    df1_length = df1['length']
    df2_length = df2['length']
    
    df1_weight = df1['weight']
    df2_weight = df2['weight']
    
    length = pd.concat([df1_length, df2_length])
    weight = pd.concat([df1_weight, df2_weight])

    index = np.arange(49)
    fish_input = np.column_stack([length, weight])
    fish_target = np.concatenate([np.ones(35), np.zeros(14)])
    
    kn = KNeighborsClassifier()
    kn.fit(fish_input, fish_target)
    kn.score(fish_input, fish_target)
    
    # save model
    with open(model.path, 'wb') as f:
        pickle.dump(kn, f)

@dsl.component(packages_to_install=['mlflow'], base_image='python:3.9')
def save_model(model_input: dsl.Input[dsl.Model], model_output: dsl.Output[dsl.Model]):
    import os
    import mlflow
    import pickle
    
    mlflow.set_experiment(experiment_id="0")
    
    os.environ['MLFLOW_S3_ENDPOINT_URL'] = 'http://192.168.51.214:9000'
    os.environ['MLFLOW_TRACKING_URI'] = 'http://192.168.51.213:80'
    os.environ['MLFLOW_TRACKING_USERNAME'] = 'user'
    os.environ['MLFLOW_TRACKING_PASSWORD'] = '846JphvY4D'
    os.environ['AWS_ACCESS_KEY_ID'] = 'minio'
    os.environ['AWS_SECRET_ACCESS_KEY'] = 'minio123'
    
    fish_model = None
    
    with open(model_input.path, 'rb') as f:
        fish_model = pickle.load(f)
        
    mlflow.sklearn.save_model(fish_model, model_output.path)
    
    
@dsl.pipeline(name='fish-pipeline')
def fish_pipeline():
    
    bucket='mlpipeline'
    prefix='sample-data/'
    
    bream_op = read_csv(bucket=bucket, object=prefix + 'bream.csv')
    smelt_op = read_csv(bucket=bucket, object=prefix + 'smelt.csv')
    
    train_op = train(df_input1=bream_op.outputs['df_output'], df_input2=smelt_op.outputs['df_output'])
    save_model(model_input=train_op.outputs['model'])
    

if __name__ == '__main__':
    client.create_run_from_pipeline_func(
        fish_pipeline,
        experiment_name=EXPERIMENT_NAME)
```