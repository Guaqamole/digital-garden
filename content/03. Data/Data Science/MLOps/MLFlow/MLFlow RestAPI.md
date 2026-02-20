---
title: MLFlow RestAPI
date: 2024-07-29
draft: false
tags:
  - MLFlow
complete: true
link: https://mlflow.org/docs/latest/rest-api.html#rest-api
---
## Basic
```python
# https://mlflow.org/docs/latest/rest-api.html

host = "https://mlflow.com"

def search_model_versions(filter: str, max_results: int, order_by: list):
    import json
    import requests
    from pprint import pprint

    url = host + "/api/2.0/mlflow/model-versions/search"

    data = {
        "filter": filter,
        "max_results": max_results,
        "order_by": order_by
    }

    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers, data=json.dumps(data))
        pprint(response.json())
    except:
        raise(ValueError)

def model_version(name, version):
    import json
    import requests

    url = host + "/api/2.0/mlflow/model-versions/get"

    data = {
        "name": name,
        "version": version
    }

    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, data=json.dumps(data))
        model_version = response.json()['model_version']
        print(model_version)
    except:
        raise(ValueError)

def model_versions_latest(name):
    import json
    import requests

    url = host + "/api/2.0/mlflow/registered-models/get-latest-versions"

    data = {
        "name": name,
        "stages": ["Production", "Staging"]
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        model_versions = response.json()['model_versions']
        print(model_versions[0]['run_id'])
    except:
        raise(ValueError)
    
#model_versions_latest('logistic-regression-model')
#model_version('logistic-regression-model', "1")
filter_condition = "name = 'logistic-regression-model'"
search_model_versions(filter_condition, 10, [""])
```