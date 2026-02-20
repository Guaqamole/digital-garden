---
title: Airflow ML Model CT CD 파이프라인
date: 2024-07-26
draft: false
tags:
  - Airflow
complete: true
---
```python
from datetime import timedelta
from airflow.sensors.python import PythonSensor
from airflow.operators.python import PythonOperator, PythonVirtualenvOperator, BranchPythonOperator
from dag_factory import DagFactory, ScheduleConfiguration

def poke_model_version(**context):
    import json
    import requests
    
    artifact = 'logistic-regression-model'
    xcom_key = artifact + '-latest'
    latest_model_id = context['task_instance'].xcom_pull(key=xcom_key, include_prior_dates=True)
    
    url = "https://mlflow.com/api/2.0/mlflow/registered-models/get-latest-versions"

    data = {
    "name": artifact,
    "stages": ["Production", "Staging"]
    }

    headers = {
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(data))
    model_versions = response.json()['model_versions']
    run_id = model_versions[0]['run_id']
    
    if latest_model_id != run_id:
        print("*** MODEL NOT LATEST ***")
        print(latest_model_id, run_id, latest_model_id==run_id)
        return True
    
    print("*** STILL LATEST ***")
    return False


def request_model_id(**context):
    artifact = 'logistic-regression-model'
    xcom_key = artifact + '-latest'
    latest_model_id = context['task_instance'].xcom_pull(key=xcom_key, include_prior_dates=True)
    
    return latest_model_id

def request_run_id():
    import os
    import mlflow
    from airflow_dags_ml_model_deploy.modules.model_utils import get_secret
    
    secret = get_secret()
    os.environ['MLFLOW_TRACKING_URI'] = 'https://mlflow.com'
    
    client = mlflow.tracking.MlflowClient()
    latest_versions = client.get_latest_versions(name="logistic-regression-model")
    
    return latest_versions[-1].run_id
    

def compare(model_id: str, model_run_id: str, **context):
    print(model_id, model_run_id, model_id == model_run_id)
    if model_id != model_run_id:
        print("model different.")
        context['task_instance'].xcom_push(key='logistic-regression-model-latest', value=model_run_id)
        return 'inference'
    
    else:
        print("model same.")
        return "end"


def inference():
    import os
    import mlflow
    from airflow_dags_ml_model_deploy.modules.model_utils import get_secret
    
    secret = get_secret()
    os.environ['MLFLOW_TRACKING_URI'] = 'https://mlflow.com'
    
    client = mlflow.tracking.MlflowClient()
    artifact = "logistic-regression-model"
    latest_versions = client.get_latest_versions(name=artifact)
    model_uri = latest_versions[-1].source
    print("loading:", model_uri)
    
    model = mlflow.sklearn.load_model(model_uri)
    
    input_data = [[5.1, 3.5, 1.4, 0.2], [6.7, 3.0, 5.2, 2.3]]
    prediction = model.predict(input_data)
    print("prediction:", prediction)


def end():
    print("Skipping inference.")


schedule_conf = ScheduleConfiguration(
    schedule=None,
)
task_args = {
    "owner": "example",
    "retries": 2,
    "retry_delay": timedelta(minutes=1),
}
tags = ['example']
dag_factory = DagFactory(schedule_conf=schedule_conf, task_args=task_args, tags=tags)
dag = dag_factory.build_dag()

with dag:
    
    t0 = PythonSensor(
        task_id='poke_model_version',
        python_callable=poke_model_version,
        timeout=24 * 60 * 60,
        poke_interval=30,
        mode='poke'
    )

    t1 = PythonOperator(
        task_id="request_model_id",
        python_callable=request_model_id
    )
    
    t2 = PythonVirtualenvOperator(
        task_id="request_run_id",
        python_callable=request_run_id,
        requirements=["mlflow==2.14.3"],
    )
    
    t3 = BranchPythonOperator(
        task_id="compare",
        python_callable=compare,
        op_args=["{{ ti.xcom_pull(task_ids='request_model_id', key='return_value') }}", "{{ ti.xcom_pull(task_ids='request_run_id', key='return_value') }}"]
    )

    t4 = PythonVirtualenvOperator(
        task_id="inference",
        python_callable=inference,
        requirements=["mlflow==2.14.3"],
    )

    t5 = PythonOperator(
        task_id="end",
        python_callable=end,
    )
    
    t0 >> [t1, t2] >> t3
    t3 >> t4
    t3 >> t5
```