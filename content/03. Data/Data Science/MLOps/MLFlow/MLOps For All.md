---
title: MLOps For All
date: 2024-05-27
draft: false
tags: 
complete: true
---
## Delete

kubeflow pipeline
```python
kustomize build apps/pipeline/upstream/env/platform-agnostic-multi-user | kubectl delete -n kubeflow -f -
```

```python
kustomize build common/istio-1-17/kubeflow-istio-resources/base/ | kubectl delete -n kubeflow -f -
```

```python
kustomize build common/kubeflow-roles/base | kubectl  delete -n kubeflow -f -
```

```python
kustomize build common/kubeflow-namespace/base | kubectl delete -n kubeflow -f -
```

```python
kustomize build common/oidc-client/oidc-authservice/base | kubectl delete -f -
```

```python
kustomize build common/dex/overlays/istio | kubectl delete -f -
```

```python
kustomize build common/istio-1-17/istio-install/base | kubectl delete -f -
```

```python
kustomize build common/cert-manager/kubeflow-issuer/base | kubectl delete -f -
```

```python

```



## mlpipeline pod fail시

```python
root@linux:~/k8s/kubeflow/kubeflow-1.8.0/manifests# kubectl logs -n kubeflow ml-pipeline-cd4bf9bc8-7997q
I0527 02:04:09.374333       7 client_manager.go:170] Initializing client manager
I0527 02:04:09.374403       7 config.go:57] Config DBConfig.MySQLConfig.ExtraParams not specified, skipping

root@linux:~/k8s/kubeflow/kubeflow-1.8.0/manifests# kubectl delete rs -n kubeflow ml-pipeline-cd4bf9bc8

root@sublinux:/mnt/k8s-pvc/kubeflow# mkdir minio
root@sublinux:/mnt/k8s-pvc/kubeflow# chwon 999:999 minio/
kubectl delete rs -n kubeflow ml-pipeline-cd4bf9bc8


```

