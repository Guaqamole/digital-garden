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