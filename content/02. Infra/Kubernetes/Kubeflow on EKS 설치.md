---
title: Kubeflow on EKS 설치
date: 2024-05-31
draft: false
tags:
  - eks
complete: true
---
- Kubernetes version: 1.21
- Kubeflow version: 1.5.0
- Kustomize version: 3.2.0 (나는 3.3 사용)

github: https://github.com/awslabs/kubeflow-manifests/tree/release-v1.5.1-aws-b1.0.2
documentation: https://awslabs.github.io/kubeflow-manifests/release-v1.5.1-aws-b1.0.2/docs/

USING: RDS & S3

## Prerequisite
https://awslabs.github.io/kubeflow-manifests/release-v1.5.1-aws-b1.0.2/docs/deployment/prerequisites/

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) - A command line tool for interacting with AWS services.
- [eksctl](https://eksctl.io/introduction/#installation) - A command line tool for working with EKS clusters.
- [kubectl](https://kubernetes.io/docs/tasks/tools) - A command line tool for working with Kubernetes clusters.
- [yq](https://mikefarah.gitbook.io/yq) - A command line tool for YAML processing. (For Linux environments, use the [wget plain binary installation](https://github.com/mikefarah/yq/#install))
- [jq](https://stedolan.github.io/jq/download/) - A command line tool for processing JSON.
- [kustomize version 3.2.0](https://github.com/kubernetes-sigs/kustomize/releases/tag/v3.2.0) - A command line tool to customize Kubernetes objects through a kustomization file.

> Warning: Kubeflow is not compatible with the latest versions of of kustomize 4.x. This is due to changes in the order that resources are sorted and printed. Please see [kubernetes-sigs/kustomize#3794](https://github.com/kubernetes-sigs/kustomize/issues/3794) and [kubeflow/manifests#1797](https://github.com/kubeflow/manifests/issues/1797). We know that this is not ideal and are working with the upstream kustomize team to add support for the latest versions of kustomize as soon as we can.

- [python 3.8+](https://www.python.org/downloads/) - A programming language used for automated installation scripts.
- [pip](https://pip.pypa.io/en/stable/installation/) - A package installer for python.

### git clone
```python
git clone --branch v1.5.1-aws-b1.0.2 git@github.com:awslabs/kubeflow-manifests.git
```

## RDS, S3
### requirements
```python
cd tests/e2e

pip install -r requirements.txt

boto3==1.18.50
kfp==1.8.9 ## Error 나서 pip install kfp==1.8 했음
kubernetes==12.0.1
pytest==6.2.5
PyYAML==5.4 ## Error 나서 pip install PyYAML==5.3.1 했음 https://github.com/yaml/pyyaml/issues/724#issuecomment-1638587228
black==21.12b0
mysql-connector-python==8.0.27
```