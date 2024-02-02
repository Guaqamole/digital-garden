---
title: Elastic-Search on k8s
date: 2023-11-18
draft: false
tags:
  - Elastic
  - Kubernetes
complete: false
link: https://github.com/elastic/helm-charts
link2: https://medium.com/rahasak/deploy-elasticsearch-and-kibana-cluster-on-kubernetes-with-elasticsearch-operator-79f205170f40
---
### 1. ECK Operator
Elastic Search를 k8s에 배포하기 위해선 Eck operator가 필수이다.
ECK operator는 yaml manifest, helm chart를 통해 배포가 가능하다. 아래는 yaml을 통한 배포 방법이다.

**crds.yaml**
```sh
wget https://download.elastic.co/downloads/eck/2.3.0/crds.yaml

kubectl apply -f crds.yaml

kubectl get crd

NAME                                                 CREATED AT
agents.agent.k8s.elastic.co                          2022-07-30T02:16:25Z
apmservers.apm.k8s.elastic.co                        2022-07-30T02:16:25Z
beats.beat.k8s.elastic.co                            2022-07-30T02:16:25Z
elasticmapsservers.maps.k8s.elastic.co               2022-07-30T02:16:25Z
elasticsearches.elasticsearch.k8s.elastic.co         2022-07-30T02:16:25Z
enterprisesearches.enterprisesearch.k8s.elastic.co   2022-07-30T02:16:25Z
kibanas.kibana.k8s.elastic.co                        2022-07-30T02:16:26Z

```

**operator.yaml**
custom resource를 정의하고 나면 es 배포를 위한 operator를 생성한다.
```sh
wget https://download.elastic.co/downloads/eck/2.3.0/operator.yaml

kubectl apply -f operator.yaml

kubectl get all -n elastic-system

NAME                     READY   STATUS    RESTARTS   AGE
pod/elastic-operator-0   1/1     Running   0          25h
```


### 2. Persistent Volume
ES 공식 github에 nfs storage class를 공식적으로 지원하지 않는다고 하여 local-storage를 선택했다.
노드별로 경로를 지정해줘야하기 때문에 사전에 pv를 생성한다:
- pv-master.yaml → 마스터 노드를 위한 볼륨
- pv-data.yaml → 데이터 노드를 위한 볼륨
- pv-client.yaml → 코오디네이터 노드를 위한 볼륨

**pv-master.yaml**
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: es-master-0
spec:
  capacity:
    storage: 50Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /mnt/elasticsearch/master-0
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - linux
```
- volumeMode: local-storage 구성시 필수 옵션.
- path: local-storage에 mount하는 path.
- nodeSelector: 지정한 노드에 배포

### 3. elastic cluster
yaml이 너무 길어서 master만 적었다. data, client도 아래 작성필요.
persistentVolumeClaim을 함께 작성해줘야 pv가 올바른 Pvc에게 Mount한다.
**es.yaml**
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: elasticsearch-data-elasticsearch-es-master-0
  namespace: es
spec:
  storageClassName: local-storage
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 50Gi
---
apiVersion: elasticsearch.k8s.elastic.co/v1
kind: Elasticsearch
metadata:
  name: elasticsearch
  namespace: es
spec:
  version: 7.6.2
  http:
    service:
      spec:
        type: NodePort
  transport:
    service:
      spec:
        type: NodePort
  nodeSets:
  - name: master
    count: 1
    config:
      node.master: true
      node.data: false
      node.ingest: false
      xpack.ml.enabled: true
      node.store.allow_mmap: false
    podTemplate:
      spec:
        volumes:
        - name: es-master-0
	- name: data
	  count: 1
	...
```
- http service type: 포트 9200을 노출할지 여부
- podTemplate, volumes: 사용할 pv를 적어준다.

### 4. Kibana
```yaml
apiVersion: kibana.k8s.elastic.co/v1
kind: Kibana
metadata:
  name: kibana
  namespace: es
spec:
  version: 7.6.2
  count: 1
  http:
    service:
      spec:
        type: NodePort
  elasticsearchRef:
    name: elasticsearch
    namespace: es
```

이렇게 구성하면 NodePort로 Kibana에 접근이 가능하다. 접근하기전 아래 명령어로 비밀번호를 조회한다.
```sh
kubectl get secret -n es elasticsearch-es-elastic-user -o=jsonpath='{.data.elastic}' | base64 --decode
```

혹은 바로 curl 명령어 (cat API 지원)를 수행해서 클러스터 상태를 볼 수도 있다.
```sh
curl -k -XGET https://192.168.51.200:31195/_cluster/health?pretty -u elastic:password
{
  "cluster_name" : "elasticsearch",
  "status" : "yellow",
  "timed_out" : false,
  "number_of_nodes" : 3,
  "number_of_data_nodes" : 1,
  "active_primary_shards" : 6,
  "active_shards" : 6,
  "relocating_shards" : 0,
  "initializing_shards" : 0,
  "unassigned_shards" : 1,
  "delayed_unassigned_shards" : 0,
  "number_of_pending_tasks" : 0,
  "number_of_in_flight_fetch" : 0,
  "task_max_waiting_in_queue_millis" : 0,
  "active_shards_percent_as_number" : 85.71428571428571
}
```