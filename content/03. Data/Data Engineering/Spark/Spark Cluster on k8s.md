---
title: Spark Cluster on k8s
date: 2023-11-18
draft: false
tags:
  - Spark
  - Kubernetes
complete: false
link: https://github.com/bitnami/charts/tree/main/bitnami/spark, https://purumir.github.io/2020/05/21/kubernetes%EB%A1%9C-spark-submit%ED%95%98%EA%B8%B0-spark-submit-to-kubernetes/,
---
# 구현: Implementation

## 방법 1. Bitnami
- IaC는 Helm Chart 사용 (Bitnami Version)
- Cluster Manager는 k8s 사용

## 방법 2. spark-operator
- gcp에서 helm chart 제공

### Spark Cluster Spec
- 간단히 짚고 넘어가는 spark on k8s 구조 (this content is from my obsidian note)
### D. Kubernetes
![|600](https://i.imgur.com/oi04Zzs.png)

- Kubernetes에서는 driver가 뜨고 이 driver가 executor pod들을 실행
- client모드로 Spark job을 실행하면 실행하고자 하는 pod이 driver가 되고 executor pod들이 새로 생성됨
- cluster 모드로 실행하면 실행한 pod과는 별개로 driver pod이 새로 뜨게되며 새로 뜬 driver pod이 executor pod들을 띄우게 되는 구조

---

# Bitnami

## Step 1. Install Helm Chart

```sh
helm install my-release oci://{REGISTRY_NAME}/{REPOSITORY_NAME}/spark
```
- registry_name : 원하는 도커 레지스트리 입력
- repository_name : 지정한 레포
- 나는 비트나미꺼를 그대로 쓸 예정


```sh
helm install spark-cluster oci://registry-1.docker.io/bitnamicharts/spark
```
- 이거는 아무런 옵션을 건들지 않은 순정 옵션이니 다음으로 넘어가보자.

<br>

## Step 2. Parameters
- 옵션이 엄청나게 많으니 쇼핑하듯이 쓸만한 것만 골라보자.
https://github.com/bitnami/charts/tree/main/bitnami/spark#parameters

### default options
- 일단 순정으로 설치하게 되면 기본적으로 가져가게되는 옵션이 있다.
- 이것도 엄청 많으니 중요한것들만 짚고 넘어가자

### Spark master parameters

- 마스터 포트 정보야 많이 봐서 익숙하지만 `updateStrategy.type`은 알아두면 좋을거같다.
- 기본적으로 master-worker 구조를 가져가는 클러스터는 k8s에서 상태가 보장되어야하기 때문에 `Statefulset`으로 구성되어있는데, 비트나미는 업데이트 방식을 바꿀수 있도록 helm chart에서 제공해준다.
- 지금이야 마스터가 1대라 어떤 방식을 써도 크게 문제는 없지만, 나중에 마스터가 3개 이상일 경우 어떻게 업데이트 방식을 가져갈지 고민해 볼 필요가 있다.

| Name                          | Description                              | Value         |
| ----------------------------- | ---------------------------------------- | ------------- |
| `master.containerPorts.http`    | 스킵                                     | 8080          |
| `master.containerPorts.https`   | 스킵                                     | 8480          |
| `master.containerPorts.cluster` | 스킵                                     | 7077          |
| `master.updateStrategy.type`    | 스파크 마스터 스테이트풀셋 업데이트 방식 | RollingUpdate |

<br>

### Spark worker parameters
- `worker.replicaCount` : autoscaling 옵션 활성화할경우 사용할 미니멈 노드 개수

| Name                          | Description                                       | Value  |
| ----------------------------- | ------------------------------------------------- | ------ |
| `worker.existingConfigmap`    | 워커의 커스텀 설정을 위한 컨피그맵 설정           | `""`   |
| `worker.containerPorts.http`  | 스킵                                              | `8080` |
| `worker.containerPorts.https` | 스킵                                              | `8480` |
| `worker.dir`                  | Spark Application 작성시 설정할 커스텀 디렉토리   | `""`   |
| `worker.replicaCount`         | 스파크 워커 개수                                  | `2`    |
| `worker.args`                 | 추가 옵션 넣어서 사용할 경우 기본 설정 override함 | `[]`   |
|`worker.autoscaling.maxReplicas`|autoscaling 옵션 활성화시 max 노드(replica)개수|`5`|

옵션들을 쭉 둘러봤는데 지금 상황에서는 default값으로도 충분히 프로젝트 수행에 무리 없을거같아 스텝 2에서 사용한 명령어 그대로 사용해도 될거같다.

alternatively, airflow 구성시 사용했던 방법처럼 [values.yaml](https://github.com/bitnami/charts/blob/main/bitnami/spark/values.yaml) 을 제공하기 때문에 운영하기에는 이 방법이 제일 좋을거같다.

```sh
helm install spark-cluster -f values.yaml oci://registry-1.docker.io/bitnamicharts/spark
```

<br>

## Step 3. Deployment

```sh
export SPARK_NAME='spark-cluster'

kubectl create ns $SPARK_NAME

helm install \
"$SPARK_NAME" \
oci://registry-1.docker.io/bitnamicharts/spark \
--set namespaceOverride="$SPARK_NAME" \
--set service.type="NodePort"
```

### Service Account & ClusterRoleBinding 생성
```sh
kubectl create serviceaccount apache-spark-driver --namespace=$SPARK_NAME
kubectl create clusterrolebinding spark-role --clusterrole=edit  --serviceaccount=$SPARK_NAME:apache-spark-driver --namespace=$SPARK_NAME
```

## Submit Test
- executor는 worker instance 개수만큼 띄울수있다.
```sh
K8S_API_ENDPOINT=$(kubectl config view --minify -o jsonpath='{.clusters[].cluster.server}')

$SPARK_HOME/bin/spark-submit \
--master k8s://$K8S_API_ENDPOINT \
--name spark-pi \
--class org.apache.spark.examples.SparkPi \
--conf spark.executor.instances=3 \
--conf spark.kubernetes.container.image=apache/spark:3.5.0 \
--conf spark.kubernetes.namespace=$SPARK_NAME \
--conf spark.kubernetes.authenticate.driver.serviceAccountName=apache-spark-driver \
--deploy-mode cluster \
local:///opt/spark/examples/jars/spark-examples_2.12-3.5.0.jar
```


## Finished.
-  1/1 READY의 아름다움을 감상하시죠.
```sh
NAME                         READY   STATUS    RESTARTS   AGE
pod/spark-cluster-master-0   1/1     Running   0          90s
pod/spark-cluster-worker-0   1/1     Running   0          90s
pod/spark-cluster-worker-1   1/1     Running   0          59s
pod/spark-cluster-worker-2   1/1     Running   0          12s

NAME                               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)
                      AGE
service/spark-cluster-headless     ClusterIP   None            <none>        <none>
                      90s
service/spark-cluster-master-svc   NodePort    10.103.135.53   <none>        7077:326
09/TCP,80:32378/TCP   90s

NAME                                    READY   AGE
statefulset.apps/spark-cluster-master   1/1     90s
statefulset.apps/spark-cluster-worker   3/3     90s
```

![](https://i.imgur.com/gYC3ekJ.png)

크.. 역시 data-utopia 프로젝트를 위해 1년동안 cpu랑 시금치램, ssd 드래곤볼하면서 25에 서버 두대를 구축한게 신의 한수다ㅋㅋ 이제 요금 아낀다고 ec2 인스턴스 10대씩 띄어놓고 서버 추가될때마다 앤서블 돌리고 뻘짓하지않아도 된다

t2.medium 10대씩 띄어놔도 한달에 십만원은 그냥 넘기는데 이제 이 녀셕들을 잘 활용해봐야겠다ㅎㅎ

익스큐터 10개씩 돌려봐야지ㅎ 재밌겠다


---

# Spark-Operator
- https://github.com/GoogleCloudPlatform/spark-on-k8s-operator
- 3.1.1이 가장 최근이미지 인거같다ㅠ

## Step 1. helm chart
- CRD까지 알아서 만들어진다.
```sh
helm repo add spark-operator https://googlecloudplatform.github.io/spark-on-k8s-operator

helm install spark-operator spark-operator/spark-operator --namespace spark-operator --create-namespace --set webhook.enable=true
```


## Step 2. Service Account
```sh
kubectl create serviceaccount spark --namespace=spark-operator

kubectl create clusterrolebinding spark-operator-role --clusterrole=edit --serviceaccount=spark-operator:spark --namespace=spark-operator
```

## Step 3. yaml
- https://github.com/apache/airflow/blob/2.1.4/airflow/providers/cncf/kubernetes/example_dags/example_spark_kubernetes.py
```yaml
apiVersion: "sparkoperator.k8s.io/v1beta2"
kind: SparkApplication
metadata:
  name: spark-pi
  namespace: spark-operator
spec:
  type: Scala
  mode: cluster
  image: "gcr.io/spark-operator/spark:v3.1.1"
  imagePullPolicy: Always
  mainClass: org.apache.spark.examples.SparkPi
  mainApplicationFile: "local:///opt/spark/examples/jars/spark-examples_2.12-3.1.1.jar"
  sparkVersion: "3.1.1"
  restartPolicy:
    type: Never
  volumes:
    - name: "test-volume"
      hostPath:
        path: "/tmp"
        type: Directory
  driver:
    cores: 1
    coreLimit: "1200m"
    memory: "512m"
    labels:
      version: 3.1.1
    serviceAccount: spark
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
  executor:
    cores: 1
    instances: 1
    memory: "512m"
    labels:
      version: 3.1.1
    volumeMounts:
      - name: "test-volume"
        mountPath: "/tmp"
```

## Step 4. Deploy
```sh
kubectl apply -f spark-app.yaml
```