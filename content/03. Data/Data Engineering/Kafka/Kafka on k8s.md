---
title: Kafka on k8s
date: 2023-11-18
draft: false
tags: 
complete: false
link: https://github.com/confluentinc/confluent-kubernetes-examples/tree/master/quickstart-deploy
---
## Quckstart with Kraft
### 1. setup
```python
wget https://raw.githubusercontent.com/confluentinc/confluent-kubernetes-examples/refs/heads/master/quickstart-deploy/confluent-platform-singlenode.yaml

wget https://raw.githubusercontent.com/confluentinc/confluent-kubernetes-examples/refs/heads/master/quickstart-deploy/producer-app-data-singlenode.yaml

kubectl create namespace confluent
kubectl config set-context --current --namespace confluent

helm repo add confluentinc https://packages.confluent.io/helm
helm repo update

helm upgrade --install \
  confluent-operator confluentinc/confluent-for-kubernetes
```

### 2. install kafka platform
```python
kubectl apply -f confluent-platform-singlenode.yaml

confluent-operator-66cdc85b48-qzx7x       ●       1/1        Running
zookeeper-0                               ●       1/1        Running
connect-0                                 ●       1/1        Running
controlcenter-0                           ●       1/1        Running
kafka-0                                   ●       1/1        Running
kafkarestproxy-0                          ●       1/1        Running
kraftcontroller-0                         ●       1/1        Running
ksqldb-0                                  ●       1/1        Running
schemaregistry-0                          ●       1/1        Running
```

### 3. test producer
```python
kubectl apply -f producer-app-data-singlenode.yaml
```
### tear down
```python
kubectl delete -f $TUTORIAL_HOME/producer-app-data.yaml

kubectl delete -f $TUTORIAL_HOME/confluent-platform.yaml

helm uninstall confluent-operator
```