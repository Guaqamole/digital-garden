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

| Component                 | Local Manifests Path                             | Upstream Revision                                                                                          |
| ------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Training Operator         | apps/training-operator/upstream                  | [v1.4.0](https://github.com/kubeflow/tf-operator/tree/v1.4.0/manifests)                                    |
| Notebook Controller       | apps/jupyter/notebook-controller/upstream        | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/notebook-controller/config)           |
| Tensorboard Controller    | apps/tensorboard/tensorboard-controller/upstream | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/tensorboard-controller/config)        |
| Central Dashboard         | apps/centraldashboard/upstream                   | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/centraldashboard/manifests)           |
| Profiles + KFAM           | apps/profiles/upstream                           | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/profile-controller/config)            |
| PodDefaults Webhook       | apps/admission-webhook/upstream                  | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/admission-webhook/manifests)          |
| Jupyter Web App           | apps/jupyter/jupyter-web-app/upstream            | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/crud-web-apps/jupyter/manifests)      |
| Tensorboards Web App      | apps/tensorboard/tensorboards-web-app/upstream   | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/crud-web-apps/tensorboards/manifests) |
| Volumes Web App           | apps/volumes-web-app/upstream                    | [v1.5.0](https://github.com/kubeflow/kubeflow/tree/v1.5.0/components/crud-web-apps/volumes/manifests)      |
| Katib                     | apps/katib/upstream                              | [v0.13.0](https://github.com/kubeflow/katib/tree/v0.13.0/manifests/v1beta1)                                |
| Kubeflow Pipelines        | apps/pipeline/upstream                           | [1.8.2](https://github.com/kubeflow/pipelines/tree/1.8.2/manifests/kustomize)                              |


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
export KUBEFLOW_RELEASE_VERSION=v1.5.1
export AWS_RELEASE_VERSION=v1.5.1-aws-b1.0.2
git clone https://github.com/awslabs/kubeflow-manifests.git && cd kubeflow-manifests
git checkout ${AWS_RELEASE_VERSION}
git clone --branch ${KUBEFLOW_RELEASE_VERSION} https://github.com/kubeflow/manifests.git upstream
```


### cluster-name
```python

export CLUSTER_NAME = 
kubectl config view --minify -o jsonpath='{.clusters[].name}'

-> arn:aws:eks:region:123456789:cluster/{cluster_name}
{cluster_name} 만 쓰면된다.

```
### envs
```python
export REPO_ROOT=$(pwd)

echo $REPO_ROOT
/Users/avokey/kubeflow/eks-kubeflow-manifests


export CLUSTER_REGION=ap-northeast-2
echo $CLUSTER_REGION
```

## RDS, S3 Secret
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

### secrets
rds secret
```python
export RDS_SECRET=kubeflow-rds-secret
echo $RDS_SECRET

aws secretsmanager create-secret --name $RDS_SECRET --secret-string '{"username":"admin","password":"Kubefl0w","database":"kubeflow","host":"rm12abc4krxxxxx.xxxxxxxxxxxx.us-west-2.rds.amazonaws.com","port":"3306"}' --region $CLUSTER_REGION
```



## Install
### order
```python
cat deployments/rds-s3/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
  - ./base
resources:
  # Configured for AWS RDS and AWS S3

  # AWS Secret Manager
  - ../../awsconfigs/common/aws-secrets-manager
  # Kubeflow Pipelines
  - ../../awsconfigs/apps/pipeline
  # Katib
  - ../../awsconfigs/apps/katib-external-db-with-kubeflow





cat base/kustomization.yaml


apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  # Cert-Manager
  - ../../../upstream/common/cert-manager/cert-manager/base
  - ../../../upstream/common/cert-manager/kubeflow-issuer/base
  # Istio
  - ../../../upstream/common/istio-1-11/istio-crds/base
  - ../../../upstream/common/istio-1-11/istio-namespace/base
  - ../../../upstream/common/istio-1-11/istio-install/base
  # OIDC Authservice
  - ../../../upstream/common/oidc-authservice/base
  # Dex
  - ../../../upstream/common/dex/overlays/istio

# local-gateway
	../../../upstream/common/istio-1-11/cluster-local-gateway/base

  # Kubeflow namespace
  - ../../../upstream/common/kubeflow-namespace/base
  # Kubeflow Roles
  - ../../../upstream/common/kubeflow-roles/base
  # Kubeflow Istio Resources
  - ../../../upstream/common/istio-1-11/kubeflow-istio-resources/base
  # Central Dashboard
  - ../../../upstream/apps/centraldashboard/upstream/overlays/kserve
  # Admission Webhook
  - ../../../upstream/apps/admission-webhook/upstream/overlays/cert-manager
  # Jupyter Web App
  - ../../../awsconfigs/apps/jupyter-web-app
  # Notebook Controller
  - ../../../upstream/apps/jupyter/notebook-controller/upstream/overlays/kubeflow
  # Profiles + KFAM
  - ../../../upstream/apps/profiles/upstream/overlays/kubeflow
  # Volumes Web App
  - ../../../upstream/apps/volumes-web-app/upstream/overlays/istio
  # Tensorboard Controller
  - ../../../upstream/apps/tensorboard/tensorboard-controller/upstream/overlays/kubeflow
  # Tensorboards Web App
  - ../../../upstream/apps/tensorboard/tensorboards-web-app/upstream/overlays/istio
  # Training Operator
  - ../../../upstream/apps/training-operator/upstream/overlays/kubeflow
  # User namespace
  - ../../../upstream/common/user-namespace/base

  # KServe
  - ../../../awsconfigs/apps/kserve
  - ../../../upstream/contrib/kserve/models-web-app/overlays/kubeflow

  # AWS Telemetry - This is an optional component. See usage tracking documentation for more information
  - ../../../awsconfigs/common/aws-telemetry
```

### cert-manager
```python
kustomize build upstream/common/cert-manager/cert-manager/base | kubectl apply -f -
kustomize build upstream/common/cert-manager/kubeflow-issuer/base | kubectl apply -f -
```


### istio
```python
kustomize build upstream/common/istio-1-11/istio-crds/base | kubectl apply -f -
kustomize build upstream/common/istio-1-11/istio-namespace/base | kubectl apply -f -
kustomize build upstream/common/istio-1-11/istio-install/base | kubectl apply -f -
```

```python
kustomize build upstream/common/istio-1-16/istio-crds/base | kubectl apply -f -
kustomize build upstream/common/istio-1-16/istio-namespace/base | kubectl apply -f -
kustomize build upstream/common/istio-1-16/istio-install/base | kubectl apply -f -
```



### oidc-auth
```python
kustomize build upstream/common/oidc-authservice/base | kubectl apply -f -
```

### dex
```python
kustomize build upstream/common/dex/overlays/istio | kubectl apply -f -
```

crd 에서 에러남 v1beta issue → 1.7.0 으로 배포
```python
cd kubeflow-manifests-1.7.0
kustomize build upstream/common/dex/overlays/istio | kubectl apply -f -
```

### cluster-local-gateway
```python
kustomize build upstream/common/istio-1-11/cluster-local-gateway/base | kubectl apply -f -
```

```python
kustomize build upstream/common/istio-1-16/cluster-local-gateway/base | kubectl apply -f -
```

### kubeflow-resource
```python
kustomize build upstream/common/kubeflow-namespace/base | kubectl apply -f -
kustomize build upstream/common/kubeflow-roles/base | kubectl apply -f -
kustomize build upstream/common/istio-1-11/kubeflow-istio-resources/base | kubectl apply -f -
```

### central dashboard
```python
kustomize build upstream/apps/centraldashboard/upstream/overlays/kserve | kubectl apply -f -
```



### admission-webhook
```python
kustomize build upstream/apps/admission-webhook/upstream/overlays/cert-manager | kubectl apply -f -
```


### jupyter-webapp (p)
```python
kustomize build awsconfigs/apps/jupyter-web-app | kubectl apply -f -
```


### notebook controller (p)
```python
kustomize build upstream/apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -
```




### profiles
```python
kustomize build upstream/apps/profiles/upstream/overlays/kubeflow | kubectl apply -f -
```



### volumes web app
```python
kustomize build upstream/apps/volumes-web-app/upstream/overlays/istio | kubectl apply -f -
```


### training operator
```python
kustomize build upstream/apps/training-operator/upstream/overlays/kubeflow | kubectl apply -f -
```


### user
```python
kustomize build upstream/common/user-namespace/base | kubectl apply -f -
```


### kubeflow pipelines (집중)
secrets manager
```python
kustomize build awsconfigs/common/aws-secrets-manager | kubectl apply -f -
```

secret manager 등록시 절대 절대 키/값 으로 하지말고
일반 텍스트에 다 떄려박는다.

예를들어 아래 명령어를 쳐야한다면
```python
aws secretsmanager create-secret --name $S3_SECRET --secret-string '{"accesskey":"AXXXXXXXXXXXXXXXXXX6","secretkey":"eXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXq"}' --region $CLUSTER_REGION
```
OK
![](https://i.imgur.com/Npm1oF0.png)

WRONG
![](https://i.imgur.com/u8h0lCh.png)



pipeline
```python
kustomize build awsconfigs/apps/pipeline | kubectl apply -f -
```

```python
Error: json: unknown field "env"
error: no objects passed to apply


# env를 envs로 변경
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
bases:
- ../../../upstream/apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user
configMapGenerator:
- name: pipeline-install-config
# WRONG PART
  env: ./rds/params.env

apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
bases:
- ../../../upstream/apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user
configMapGenerator:
- name: pipeline-install-config
# change here
  envs: 
    - ./rds/params.env
```


### katib
```python
kustomize build awsconfigs/apps/katib-external-db-with-kubeflow | kubectl apply -f -
```