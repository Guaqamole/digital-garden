---
title: Kubeflow 기본 실습
date: 2024-05-26
draft: false
tags:
  - Kubeflow
complete: true
---
## Kubeflow Pipeline
### Example1. Hello World
```python
import kfp
import requests

HOST = "http://192.168.51.210"  # Central Dashboard 접근 주소 (포트 포함)
USERNAME = "user@example.com"
PASSWORD = "12341234"
NAMESPACE = "kubeflow" # 보통 kubeflow가 기본값입니다.

session = requests.Session()
response = session.get(HOST)

headers = {
    "Content-Type": "application/x-www-form-urlencoded",
}

data = {"login": USERNAME, "password": PASSWORD}
session.post(response.url, headers=headers, data=data)
session_cookie = session.cookies.get_dict()["authservice_session"]
```

```python
client = kfp.Client(
    host=f"{HOST}/pipeline",
    namespace=f"{NAMESPACE}",
    cookies=f"authservice_session={session_cookie}",
)
```

```python
from kfp import compiler
from kfp import dsl

@dsl.component
def addition_component(num1: int, num2: int) -> int:
  return num1 + num2

@dsl.pipeline(name='addition-pipeline')
def my_pipeline(a: int=1, b: int=2, c: int = 10):
  add_task_1 = addition_component(num1=a, num2=b)
  add_task_2 = addition_component(num1=add_task_1.output, num2=c)

cmplr = compiler.Compiler()
cmplr.compile(my_pipeline, package_path='my_pipeline.yaml')

client.create_run_from_pipeline_package('my_pipeline.yaml',arguments={"a":1,"b":2})
>> [Experiment details](http://192.168.51.210/pipeline/#/experiments/details/7cf0d70b-7131-4e7b-8e03-109e9a81e18b).
>> [Run details](http://192.168.51.210/pipeline/#/runs/details/2b12da50-99bb-41c1-984d-2dea41813a5f).
>> RunPipelineResult(run_id=2b12da50-99bb-41c1-984d-2dea41813a5f)
```