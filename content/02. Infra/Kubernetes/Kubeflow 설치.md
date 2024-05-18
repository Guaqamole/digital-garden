---
title: Kubeflow 설치
date: 2024-05-17
draft: false
tags: 
complete: true
---
## PreRequisite
Kustomize
```bash
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash

sudo mv kustomize /usr/local/bin/
```

Kubeflow Manifest
```python
git clone https://github.com/kubeflow/manifests.git
```


## Single Command
```bash
cd manifests

while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 20; done
```