---
title: Airflow on Kubernetes
date: 2023-11-17
draft: false
tags:
  - Airflow
  - Kubernetes
complete: true
link: https://github.com/airflow-helm/charts/blob/main/charts/airflow/README.md#frequently-asked-questions, https://cloudnativenow.com/features/using-airflow-to-run-spark-on-kubernetes/
---

# 구현: Implementation
- IaC는 Helm Chart 사용 (User Community Version)
- Executor는 CeleryExecutor 사용
- CelerExecutor 사용에 따라 Redis도 Helm Chart에 포함되어있음
- `values.yaml`을 유심히 살펴볼것

### Airflow Cluster Spec
#### Master Node (1대)

#### Worker Node (2대)
#### Flower (1대)

#### Redis (1대)

<br>

# Pattern

---

## Step 1. Namespace
```sh
kubectl create namespace airflow-cluster
```

<br>

## Step 2. Helm Chart custom value 설정
```sh
wget https://github.com/airflow-helm/charts/raw/main/charts/airflow/sample-values-CeleryExecutor.yaml
```

### values.yaml

#### workers
- logCleanup: sidecar 방식으로 워커에 붙어서 로그를 주기적으로 지운다.
- true 하면 gitsync써야함. 하지만 난 노.
```yaml
###################################
## COMPONENT | Airflow Workers
###################################
workers:
  ## if the airflow workers StatefulSet should be deployed
  enabled: true

  ## the number of worker Pods to run
  replicas: 2

  ## resource requests/limits for the worker Pods
  ## [SPEC] https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#resourcerequirements-v1-core
  resources: {}

  ## configs for the log-cleanup sidecar of the worker Pods
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/monitoring/log-cleanup.md
  logCleanup:
    enabled: false
    retentionMinutes: 21600
```

#### logs
```yaml
###################################
## CONFIG | Airflow Logs
###################################
logs:
  ## the airflow logs folder
  path: /opt/airflow/logs

  ## configs for the logs PVC
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/monitoring/log-persistence.md
  #  persistence:
  #    enabled: false
  persistence:
    enabled: true
    storageClass: "nfs-client"
    size: 10Gi
    accessMode: ReadWriteMany

```


#### dags
- 클라우드에선 worker간 dag sync맞추려면 git sync 컨테이너 띄우고 s3랑 연동하고 난리쳐야하는데, 쿠버네티스는 pvc로 한방에 끝이다. 역시 on-prem의 힘ㅋ
```yaml
###################################
## CONFIG | Airflow DAGs
###################################
dags:
  ## the airflow dags folder
  path: /opt/airflow/dags

  ## configs for the dags PVC
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/dags/load-dag-definitions.md
  persistence:
    #enabled: false
    enabled: true
    storageClass: "nfs-client"
    size: 10Gi
    accessMode: ReadWriteMany

  ## configs for the git-sync sidecar
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/dags/load-dag-definitions.md
  gitSync:
    enabled: false

```

#### flower
- ClusterIP는 노노
- NodePort변경.
```yaml
###################################
## COMPONENT | Flower
###################################
flower:
  ## if the airflow flower UI should be deployed
  enabled: true

  ## the number of flower Pods to run
  replicas: 1

  ## resource requests/limits for the flower Pod
  ## [SPEC] https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#resourcerequirements-v1-core
  resources: {}

  ## configs for the Service of the flower Pods
  service:
    #type: ClusterIP
    type: NodePort
    externalPort: 5555
```

#### ingress
- 외부로부터 접근할 일이 있을거같아 true로 해놨다. 어차피 나는 구축시 ingress-controller까지 구축해놨다.
```yaml
###################################
## CONFIG | Kubernetes Ingress
###################################
ingress:
  ## if we should deploy Ingress resources
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/kubernetes/ingress.md
  #enabled: false
  enabled: true
```


#### pg
- pvc는 오래 두고두고 쓸껀데 좀더 늘리자.. 8G → 20G
- SC는 내가 구축했던 nfs.client.
```yaml
###################################
## DATABASE | Embedded Postgres
###################################
postgresql:
  ## if the `stable/postgresql` chart is used
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/database/embedded-database.md
  ## [WARNING] the embedded Postgres is NOT SUITABLE for production deployments of Airflow
  ## [WARNING] consider using an external database with `externalDatabase.*`
  enabled: true

  ## configs for the PVC of postgresql
#  persistence:
#    enabled: true
#    storageClass: ""
#    size: 8Gi
  persistence:
    enabled: true
    storageClass: "nfs-client"
    size: 20Gi
```

#### redis
- redis를 클러스터 모드로 할건가? 이건 나중에 대용량 처리할때 부하분산이 필요하다면 그때가서 생각해볼문제라 생각한다.
- 리소스를 여기에 쓸 시간이 없으므로 그냥 싱글로 진행.
```yaml
###################################
## DATABASE | Embedded Redis
###################################
redis:
  ## if the `stable/redis` chart is used
  ## [FAQ] https://github.com/airflow-helm/charts/blob/main/charts/airflow/docs/faq/database/embedded-redis.md
  ## [WARNING] consider using an external database with `externalDatabase.*`
  enabled: true

  ## configs for redis cluster mode
  cluster:
    enabled: false
    slaveCount: 1

  ## configs for the redis master StatefulSet
  master:
    ## resource requests/limits for the redis master Pods
    ## [SPEC] https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#resourcerequirements-v1-core
    resources: {}

    ## configs for the PVC of the redis master Pods
    persistence:
      enabled: false
      storageClass: ""
      size: 8Gi
```

<br>
## Step 3. Helm Repo
```sh
helm repo add airflow-stable https://airflow-helm.github.io/charts

helm repo update
```


## Step 4. Deployment
- 최신 버전인 8.7.1을 쓰자.
```yaml
export AIRFLOW_NAME="airflow-cluster"
export AIRFLOW_NAMESPACE="airflow-cluster"

helm install \
  "$AIRFLOW_NAME" \
  airflow-stable/airflow \
  --namespace "$AIRFLOW_NAMESPACE" \
  --version "8.7.1" \
  --values ./custom-values.yaml
```
- uninstall
```yaml
helm uninstall "$AIRFLOW_NAME" --namespace "$AIRFLOW_NAMESPACE"
```


## Result
네 당연히 처음부터 될리가 없구요
```
0/2 nodes are available: pod has unbound immediate PersistentVolumeClaims. preemption: 0/2 nodes are available: 2 Preemption is not helpful for scheduling..
```

```sh
kubectl describe pvc -n airflow-cluster

no persistent volumes available for this claim and no storage class is set
```
- 처음에 잘못 만들었던 pvc가 아직 안지워졌다. 지우자.

```sh
root@linux:/data1/data-utopia# helm install \
>   "$AIRFLOW_NAME" \
>   airflow-stable/airflow \
>   --namespace "$AIRFLOW_NAMESPACE" \
>   --version "8.7.1" \
>   --values ./custom-values.yaml

NAME: airflow-cluster
LAST DEPLOYED: Fri Nov 17 20:35:12 2023
NAMESPACE: airflow-cluster
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
========================================================================
Thanks for deploying Apache Airflow with the User-Community Helm Chart!

====================
        TIPS
====================
Default Airflow Webserver login:
  * Username:  **
  * Password:  **

Use these commands to port-forward the Services to your localhost:
  * Airflow Webserver:  kubectl port-forward svc/airflow-cluster-web 8080:8080 --namespace airflow-cluster
  * Flower Dashboard:   kubectl port-forward svc/airflow-cluster-flower 5555:5555 --namespace airflow-cluster

```
- 포트포워드까지 하라고 명령어까지 제공한다. 오픈소스 할꺼면 이정도는 친절해야하나보다.

```sh
kubectl port-forward svc/airflow-cluster-web 5554:8080 --namespace airflow-cluster
kubectl port-forward svc/airflow-cluster-flower 5555:5555 --namespace airflow-cluster
```
- 8080은 자주 쓸꺼라 싫다ㅋ
```sh
kubectl edit -n airflow-cluster svc/airflow-cluster-web
kubectl edit -n airflow-cluster svc/airflow-cluster-flower
```
- 노드 포트 내가 원하는 포트로 변경.


## Sample Dag
- sample dag도 배포해보자.
```python
from airflow import DAG
from datetime import datetime, timedelta
from airflow.contrib.operators import kubernetes_pod_operator

default_args = {
    'owner': 'Namkyu',
    'start_date': datetime(2020, 5, 5),
    'retries': 1,
    'retry_delay': timedelta(seconds=5)
}

with DAG('etl_dag',
         default_args=default_args,
         schedule_interval=None) as dag:

    extract_tranform = kubernetes_pod_operator.KubernetesPodOperator(
        namespace='airflow',
        image="python:3.7-slim",
        cmds=["echo"],
        arguments=["This can be the extract part of an ETL"],
        labels={"foo": "bar"},
        name="extract-tranform",
        task_id="extract-tranform",
        get_logs=True
    )

    extract_tranform
```

```sh
cd /mnt/k8s-pvc

touch test_dag.py
```
- nfs 경로로 가서 dag 파일 추가.

## Finished.
-  1/1 READY의 아름다움을 감상하시죠.
```sh
NAME                                             READY   STATUS    RESTARTS   AGE
airflow-cluster-db-migrations-684bc985b8-qgzmc   1/1     Running   0          66s
airflow-cluster-flower-c56f7bc47-8sglb           1/1     Running   0          66s
airflow-cluster-pgbouncer-586c87f7bb-gd2l9       1/1     Running   0          66s
airflow-cluster-postgresql-0                     1/1     Running   0          66s
airflow-cluster-redis-master-0                   1/1     Running   0          66s
airflow-cluster-scheduler-554649b98f-6tgxd       1/1     Running   0          66s
airflow-cluster-sync-users-96bcbb456-l4khw       1/1     Running   0          66s
airflow-cluster-triggerer-649876b87c-wxnvs       1/1     Running   0          66s
airflow-cluster-web-8459c4f587-p4f85             1/1     Running   0          66s
airflow-cluster-worker-0                         1/1     Running   0          66s
airflow-cluster-worker-1                         1/1     Running   0          66s


airflow-cluster-dags                Bound    pvc-0fab05ce-0596-4d64-90ac-b2e191fa70f9   10Gi       RWX            nfs-client     29s
airflow-cluster-logs                Bound    pvc-51823eaa-bb6f-4753-93f7-7c03f1734252   10Gi       RWX            nfs-client     29s
data-airflow-cluster-postgresql-0   Bound    pvc-7f4ebb86-9dab-4e90-885f-07633ed0c3a3   20Gi       RWO            nfs-client     36m

```

1시간 컷.


