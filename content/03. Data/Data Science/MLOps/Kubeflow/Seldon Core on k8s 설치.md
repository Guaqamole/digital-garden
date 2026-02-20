---
title: Seldon Core on k8s 설치
date: 2024-06-01
draft: false
tags:
  - Kubeflow
complete: true
link: https://docs.seldon.io/projects/seldon-core/en/v1.16.0/nav/installation.html
---
## Overview
- seldon version: v1.16.0
- Kubernetes cluster >= 1.23
    - For Openshift it requires version >= 4.10
- Installer method
    - Helm version >= 3.0
    - Kustomize version >= 0.1.0
- Ingress
    - Istio : we recommend >= 1.16
    - Ambassador v1 and v2

prepackaged model servers : https://docs.seldon.io/projects/seldon-core/en/latest/servers/overview.html

### repo
```python
helm repo add seldon https://storage.googleapis.com/seldon-charts
helm repo update
helm pull seldon/seldon-core-operator --version 1.16.0 --untar
```

## Install (istio)
values.yaml
```python
istio:
  enabled: true
  gateway: istio-system/seldon-gateway
  tlsMode: ""

usageMetrics:
  enabled: true
```

```python
kubectl create ns seldon-system
helm install -n seldon-system seldon-core seldon-core-operator



# or simply
helm install seldon-core seldon-core-operator \
    --repo https://storage.googleapis.com/seldon-charts \
    --set usageMetrics.enabled=true \
    --set crd.create=true \
    --namespace seldon-system \
    --set istio.enabled=true

helm install seldon-core seldon-core-operator \
    --repo https://storage.googleapis.com/seldon-charts \
    --set usageMetrics.enabled=true \
    --namespace seldon-system \
    --set certManager.enabled=true
```

```python
helm delete -n seldon-system seldon-core
```

## Test-Run
```python
kubectl create ns seldon
```

```python
sh -c 'cat << EOF >> iris-seldon.yaml
apiVersion: machinelearning.seldon.io/v1
kind: SeldonDeployment
metadata:
  name: iris-model
  namespace: seldon
spec:
  name: iris
  predictors:
  - graph:
      implementation: SKLEARN_SERVER
      modelUri: gs://seldon-models/v1.16.0/sklearn/iris
      name: classifier
    name: default
    replicas: 1
EOF'
```

```python
kubectl apply -n seldon -f iris-seldon.yaml
```

http://<ingress_url>/seldon/<namespace>/<model-name>/api/v1.0/doc/