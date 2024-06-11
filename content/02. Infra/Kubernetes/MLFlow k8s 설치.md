---
title: MLFlow 설치
date: 2024-05-21
draft: false
tags:
  - Kubernetes
  - MLFlow
  - MLOps
complete: true
---
## Versions
k8s 배포판은 bitnam에서 제공하는 버전과, mlflow community에서 제공하는 총 2가지 버전이 있다.
original: https://github.com/mlflow/mlflow
bitnami: https://github.com/bitnami/charts/tree/main/bitnami/mlflow
community: https://github.com/burakince/mlflow
mlopsforall: https://mlops-for-all.github.io/docs/setup-components/install-components-mlflow

### MLOps for all
```python
helm repo add mlops-for-all https://mlops-for-all.github.io/helm-charts
helm repo update
```

```python
helm install mlflow-server mlops-for-all/mlflow-server \  
--namespace kubeflow
```

```python
helm search repo mlops-for-all
NAME                       	CHART VERSION	APP VERSIO
mlops-for-all/mlflow-server	0.3.0        	0.3.0      	
mlops-for-all/postgresql-ha	9.4.11       	14.5.0    


helm pull mlops-for-all/mlflow-server --untar
helm pull mlops-for-all/postgresql-ha --untar

helm install -n kubeflow postgresql postgresql-ha
## 만약 postgre가 안뜬다면, pvc 데이터를 지워야한다.
cd /mnt/k8s-pvc/kubeflow/data # pg_ 로 시작하면 Postgresql 데이터니 전부 지우자.


```

### Community
```bash
helm repo add community-charts https://community-charts.github.io/helm-charts
helm repo update
```

```bash
kubectl create ns mlflow-system

kubectl -n mlflow-system apply -f https://raw.githubusercontent.com/mlops-for-all/helm-charts/main/mlflow/manifests/postgres.yaml


kubectl port-forward pod/minio 9000 9090 -n mlflow-system
id: minioadmin
pw: minioadmin

helm install mlflow -n mlflow-system oci://registry-1.docker.io/bitnamicharts/mlflow \
--set tracking.service.type=LoadBalancer


kubectl create -n mlflow-system secret generic mlflow-secret \
    --from-literal=AWS_ACCESS_KEY_ID=minioadmin \
    --from-literal=AWS_SECRET_ACCESS_KEY='minioadmin'
```


### Bitnami (잘됨)
#### helm repo
```python
helm search repo mlflow

helm repo add bitnami https://charts.bitnami.com/bitnami
NAME                   	CHART VERSION	APP VERSION	
bitnami/mlflow         	1.0.7        	2.12.2     	
community-charts/mlflow	0.7.19       	2.1.1      	

helm pull bitnami/mlflow --untar && cd mlflow
```

#### namespace
```python
kubectl create ns mlflow-system
```

#### default setup
values.yaml
```python
tracking:
	enabled: true
	replicaCount: 1
...

run:
	enabled: true
	useJob: false

postgresql:
	enabled: true
	auth:
		username: bn_mlflow
		password: ""
		database: bitnami_mlflow
		existingSecret: ""
		architecure: standalone
```

#### minio
MLflow Tracking Server가 Artifacts Store로 사용할 용도의 Minio는 이전 Kubeflow 설치 단계에서 설치한 Minio를 활용합니다.  
단, kubeflow 용도와 mlflow 용도를 분리하기 위해, mlflow 전용 버킷(bucket)을 생성하겠습니다.  
minio 에 접속하여 버킷을 생성하기 위해, 우선 minio-service 를 포트포워딩합니다.
```python
kubectl port-forward --address 0.0.0.0 svc/minio-service -n kubeflow 9000:9000

id: minio
pw: minio123
```

우측 하단의 **`+`** 버튼을 클릭하여, `Create Bucket`를 클릭합니다.

![create-bucket](https://mlops-for-all.github.io/assets/images/create-bucket-58bd2a673744c0144ffb14a2aeeef821.png)

`Bucket Name`에 `mlflow`를 입력하여 버킷을 생성합니다.

정상적으로 생성되면 다음과 같이 왼쪽에 `mlflow`라는 이름의 버킷이 생성됩니다.

![mlflow-bucket](https://mlops-for-all.github.io/assets/images/mlflow-bucket-63b427bd7a5147b8bae2ac69c57facff.png)

이후 bitnami 에서 제공하는 values.yaml 에서 kubeflow에서 사용하는 minio 설정으로 바꿔준다.

values.yaml
```python
minio:
	enabled: false

externalS3:
  host: "minio-service.kubeflow.svc.cluster.local" # or "192.168.51.214"
  port: 9000
  useCredentialsInSecret: false
  accessKeyID: "minio"
  accessKeySecret: "minio123"
  existingSecret: ""
  existingSecretAccessKeyIDKey: ""
  existingSecretKeySecretKey: ""
  protocol: "http"
  bucket: "mlflow"
  serveArtifacts: true
```

install
```python
cd ..
helm install -n mlflow mlflow mlflow

#or
helm upgrade my-release ./my-chart -f ./my-chart/values.yaml
helm upgrade mlflow ./mlflow -f ./mlflow/values.yaml

# or simply
helm install -n mlflow mlflow oci://registry-1.docker.io/bitnamicharts/mlflow \
--set minio.service.type=LoadBalancer

kubectl port-forward svc/mlflow-server-service -n mlflow --address 0.0.0.0 5000:5000
```

id, pwd
```python
kubectl get secret -n mlflow mlflow-tracking -o jsonpath='{.data.admin-user}' | base64 --decode
>> user

kubectl get secret -n mlflow mlflow-tracking -o jsonpath='{.data.adpassword}' | base64 --decode
>> 846JphvY4D
```

mlflow-tracking 으로 접속하면 성공!
![](https://i.imgur.com/ZIYag4v.png)



delete
```python
kubectl delete job.batch/mlflow-minio-provisioning -n mlflow
kubectl delete pvc -n mlflow data-mlflow-postgresql-0
rm -rf /mnt/k8s-pvc/mlflow/*
rm -rf /mnt/k8s-pvc/mlflow/.user_scripts_initialized
```


### mlflow에 remote로 동작해보기
> [!warning] CONNECT ML TRACKING
> ml-tracking server로 remote 연결하려면 MLFLOW_TRACKING_URI가 꼭!!! 설정되어야 하므로 
> os.environ['MLFLOW_TRACKING_URI']
> export MLFLOW_TRACKING_URI
> 둘다 해주고
> os.system(‘mlflow experiments search’) 로 원격 서버와 연결되었는지 꼭 확인해야한다.

tip: AWS S3 & RDS 구성했을경우 AWS 관련 환경변수는 설정안해도된다.
```python
pip install mlflow

# internal
export MLFLOW_TRACKING_URI=http://mlflow-tracking.mlflow.svc.cluster.local:5000
export MLFLOW_TRACKING_USERNAME=user
export MLFLOW_TRACKING_PASSWORD=846JphvY4D
export MLFLOW_S3_ENDPOINT_URL=http://minio-service.kubeflow.svc.cluster.local:9000
export AWS_ACCESS_KEY_ID=minio
export AWS_SECRET_ACCESS_KEY=minio123

# external
export MLFLOW_S3_ENDPOINT_URL=http://192.168.51.214:9000
export MLFLOW_TRACKING_URI=http://192.168.51.213:80
export MLFLOW_TRACKING_USERNAME=user
export MLFLOW_TRACKING_PASSWORD=846JphvY4D
export AWS_ACCESS_KEY_ID=minio
export AWS_SECRET_ACCESS_KEY=minio123

# internal
os.environ['MLFLOW_TRACKING_URI'] = 'http://mlflow-tracking.mlflow.svc.cluster.local:5000'
os.environ['MLFLOW_S3_ENDPOINT_URL'] = 'http://minio-service.kubeflow.svc.cluster.local:9000'
os.environ['AWS_ACCESS_KEY_ID'] = 'minio'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'minio123'
os.environ['MLFLOW_TRACKING_USERNAME'] = 'user'
os.environ['MLFLOW_TRACKING_PASSWORD'] = '846JphvY4D'

# external
os.environ['MLFLOW_S3_ENDPOINT_URL'] = 'http://192.168.51.214:9000'
os.environ['MLFLOW_TRACKING_URI'] = 'http://192.168.51.213:80'
os.environ['MLFLOW_TRACKING_USERNAME'] = 'user'
os.environ['MLFLOW_TRACKING_PASSWORD'] = '846JphvY4D'
os.environ['AWS_ACCESS_KEY_ID'] = 'minio'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'minio123'
```

> [!tip] kubeflow → mlflow internal 통신
> 다른 네임스페이스의 svc로 통신하고싶을때 external name을 배포해야한다. 자세한건 [[External Name]] 참고.

external-name.yaml
```python
apiVersion: v1
kind: Service
metadata:
  name: mlflow-tracking-external
  namespace: kubeflow
spec:
  type: ExternalName
  externalName: mlflow-tracking.mlflow.svc.cluster.local
```

connection-test
```python
kubectl exec -n kubeflow ml-pipeline-cd4bf9bc8-rvrbq -it -- bash

telnet mlflow-tracking-external.kubeflow.svc.cluster.local 5000
Trying 10.101.78.43...
Connected to mlflow-tracking-external.kubeflow.svc.cluster.local
```

internal fixed
```python
export MLFLOW_TRACKING_URI=http://mlflow-tracking-external.kubeflow.svc.cluster.local:5000
os.environ['MLFLOW_TRACKING_URI'] = 'http://mlflow-tracking-external.kubeflow.svc.cluster.local:5000'
```


save_model.py
```python
import mlflow
import os

from sklearn.model_selection import train_test_split
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor

mlflow.autolog()
mlflow.set_experiment(experiment_id="0")

os.environ['MLFLOW_TRACKING_URI'] = 'http://mlflow-tracking.mlflow.svc.cluster.local:5000'
os.environ['MLFLOW_S3_ENDPOINT_URL'] = 'http://minio-service.kubeflow.svc.cluster.local:9000'
os.environ['AWS_ACCESS_KEY_ID'] = 'minio'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'minio123'
os.environ['MLFLOW_TRACKING_USERNAME'] = 'user'
os.environ['MLFLOW_TRACKING_PASSWORD'] = '846JphvY4D'

db = load_diabetes()
X_train, X_test, y_train, y_test = train_test_split(db.data, db.target)

# Create and train models.
rf = RandomForestRegressor(n_estimators=100, max_depth=6, max_features=3)
rf.fit(X_train, y_train)

# Use the model to make predictions on the test dataset.
predictions = rf.predict(X_test)
```

```python
python3 save_model.py
```

#### mlflow cli
```python
mlflow experiments search

Experiment Id    Name       Artifact Location  
---------------  ---------  -------------------
0                Default    mlflow-artifacts:/0
1                testmodel  /app/mlflow        
2                testcli    mlflow-artifacts:/2


mlflow runs list --experiment-id 0



```

