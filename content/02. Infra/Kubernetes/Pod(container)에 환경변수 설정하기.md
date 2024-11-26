---
title: Pod에 환경변수 설정하기
date: 2024-07-23
draft: false
tags: 
complete: true
---
### Text
```python
apiVersion: v1
kind: Pod
metadata:
  name: envar-demo
spec:
  containers:
  - name: envar-demo-container
    image: gcr.io/google-samples/hello-app:2.0
    env:
    - name: DEMO_GREETING
      value: "Hello from the environment"
    - name: DEMO_FAREWELL
      value: "Such a sweet sorrow"

```


### Json
```python
apiVersion: v1
kind: Pod
metadata:
  name: envar-demo
spec:
  containers:
  - name: envar-demo-container
    image: gcr.io/google-samples/hello-app:2.0
    env:
    - name: DEMO_GREETING
      value: |
        {
	        "key": "value"
        }
```


### Secret
```python
---
apiVersion: v1
kind: Secret
metadata:
  name: sa-secret
type: Opaque
data:
  sa: ...base64 # macos command: openssl base64 -in sa.json | tr -d '\n'
---
apiVersion: v1
kind: Pod
metadata:
  name: secret-env-pod
spec:
  containers:
  - name: mycontainer
    image: redis
    env:
	- name: BQ_SERVICE_ACCOUNT_KEY
	  valueFrom:
		secretKeyRef:
		  name: sa-secret
		  key: sa
		  optional: false
```