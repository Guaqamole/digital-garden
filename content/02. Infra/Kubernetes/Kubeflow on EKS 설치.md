---
title: Kubeflow on EKS 설치
date: 2024-05-31
draft: false
tags:
  - eks
complete: true
---
- Kubernetes version: 1.30
- Kubeflow version: 1.7.0 (kubeflow eks 공식 문서 기준 최신…)
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

### tools
eksctl
```python
ARCH=arm64
PLATFORM=$(uname -s)_$ARCH

curl -sLO "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"

# (Optional) Verify checksum
curl -sL "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_checksums.txt" | grep $PLATFORM | sha256sum --check

tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz

sudo mv /tmp/eksctl /usr/local/bin

eksctl
```

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

alias python=python3.8
```


### desired deploy s3 method
1. Export your desired PIPELINE_S3_CREDENTIAL_OPTION:
2. Note: **IRSA is only supported in KFPv1, if you plan to use KFPv2, choose the IAM User option.** IRSA support for KFPv2 will be added in the next release.
    
    - [IRSA](https://awslabs.github.io/kubeflow-manifests/docs/deployment/rds-s3/guide/#tabs-3-0)
```yaml
export PIPELINE_S3_CREDENTIAL_OPTION=irsa
```

    - [IAM User](https://awslabs.github.io/kubeflow-manifests/docs/deployment/rds-s3/guide/#tabs-3-1)
```python
export PIPELINE_S3_CREDENTIAL_OPTION=static
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

### IAM secrets
rds & s3 secret
```python
export RDS_SECRET=kubeflow-rds-secret
echo $RDS_SECRET

aws secretsmanager create-secret --name $RDS_SECRET --secret-string '{"username":"admin","password":"Kubefl0w","database":"kubeflow","host":"rm12abc4krxxxxx.xxxxxxxxxxxx.us-west-2.rds.amazonaws.com","port":"3306"}' --region $CLUSTER_REGION

vi awsconfigs/apps/pipeline/rds/params.env
dbHost= #위정보 추가
mlmdDb=kubeflow_db

vi awsconfigs/apps/pipeline/s3/params.env
bucketName=#bucket 이름
minioServiceHost=s3.amazonaws.com #변경 X
minioServiceRegion=ap-northeast-2
```

secret 생성
![|675](https://i.imgur.com/wfyFz0C.png)

```python
vi awsconfigs/common/aws-secrets-manager/rds/secret-provider.yaml
...
  parameters:
    objects: |
      - objectName: "rds-secret-new"  # 여기에 이름 추가
        objectType: "secretsmanager"
        jmesPath:
            - path: "username"
              objectAlias: "user"
            - path: "password"
              objectAlias: "pass"
            - path: "host"
              objectAlias: "host"
            - path: "database"
              objectAlias: "database"
            - path: "port"
              objectAlias: "port"
...


vi awsconfigs/common/aws-secrets-manager/s3/secret-provider.yaml
  parameters:
    objects: |
      - objectName: "s3-secret-new"
        objectType: "secretsmanager"
        jmesPath:
            - path: "accesskey"
              objectAlias: "access"
            - path: "secretkey"
              objectAlias: "secret"
```


### IRSA (v1.7은 이 방법으로 해야함)
Create and Configure IAM Roles: 
```python
eksctl utils associate-iam-oidc-provider --cluster ${CLUSTER_NAME} \
--region ${CLUSTER_REGION} --approve
```

Get the identity issuer URL by running the following commands:
```python
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
export OIDC_PROVIDER_URL=$(aws eks describe-cluster --name $CLUSTER_NAME --region $CLUSTER_REGION \
--query "cluster.identity.oidc.issuer" --output text | cut -c9-)

```

IAM policy access S3
```python
cat <<EOF > s3_policy.json
{
   "Version": "2012-10-17",
   "Statement": [
            {
         "Effect": "Allow",
         "Action": "s3:*",
         "Resource": [
            "arn:aws:s3:::${S3_BUCKET}",
            "arn:aws:s3:::${S3_BUCKET}/*"
               ]
            }
      ]
}
EOF

```

kfp backend role
```python
cat <<EOF > backend-trust.json
{
"Version": "2012-10-17",
"Statement": [
   {
   "Effect": "Allow",
   "Principal": {
      "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER_URL}"
   },
   "Action": "sts:AssumeRoleWithWebIdentity",
   "Condition": {
      "StringEquals": {
      "${OIDC_PROVIDER_URL}:aud": "sts.amazonaws.com",
      "${OIDC_PROVIDER_URL}:sub": "system:serviceaccount:kubeflow:ml-pipeline"
      }
   }
   }
]
}
EOF
```

```python
export PIPELINE_BACKEND_ROLE_NAME=kf-pipeline-backend-role-$CLUSTER_NAME
aws --region $CLUSTER_REGION iam create-role --role-name $PIPELINE_BACKEND_ROLE_NAME --assume-role-policy-document file://backend-trust.json
export BACKEND_ROLE_ARN=$(aws --region $CLUSTER_REGION iam get-role --role-name $PIPELINE_BACKEND_ROLE_NAME --output text --query 'Role.Arn')
```


profile_role
```python
cat <<EOF > profile-trust.json
{
"Version": "2012-10-17",
"Statement": [
   {
   "Effect": "Allow",
   "Principal": {
      "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER_URL}"
   },
   "Action": "sts:AssumeRoleWithWebIdentity",
   "Condition": {
      "StringEquals": {
      "${OIDC_PROVIDER_URL}:aud": "sts.amazonaws.com",
      "${OIDC_PROVIDER_URL}:sub": "system:serviceaccount:kubeflow-user-example-com:default-editor"
      }
   }
   }
]
}
EOF
```

```python
export PROFILE_ROLE_NAME=kf-pipeline-profile-role-$CLUSTER_NAME
aws --region $CLUSTER_REGION iam create-role --role-name $PROFILE_ROLE_NAME --assume-role-policy-document file://profile-trust.json
export PROFILE_ROLE_ARN=$(aws --region $CLUSTER_REGION iam get-role --role-name $PROFILE_ROLE_NAME --output text --query 'Role.Arn')
```


check roles
```python
echo PIPELINE_BACKEND_ROLE_NAME=$PIPELINE_BACKEND_ROLE_NAME
echo BACKEND_ROLE_ARN=$BACKEND_ROLE_ARN
echo AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID
echo OIDC_PROVIDER_URL=$OIDC_PROVIDER_URL
echo PROFILE_ROLE_NAME=$PROFILE_ROLE_NAME
echo PROFILE_ROLE_ARN=$PROFILE_ROLE_ARN
echo PIPELINE_S3_CREDENTIAL_OPTION=$PIPELINE_S3_CREDENTIAL_OPTION
```

atttach s3 policy to roles
```python
aws --region $CLUSTER_REGION iam put-role-policy --role-name $PIPELINE_BACKEND_ROLE_NAME --policy-name kf-pipeline-s3 --policy-document file://s3_policy.json
aws --region $CLUSTER_REGION iam put-role-policy --role-name $PROFILE_ROLE_NAME --policy-name kf-pipeline-s3 --policy-document file://s3_policy.json
```

configure manifest with role ARNs (kustomize)
```python
yq e '.metadata.annotations."eks.amazonaws.com/role-arn"=env(BACKEND_ROLE_ARN)' -i awsconfigs/apps/pipeline/s3/service-account.yaml
yq e '.spec.plugins[0].spec."awsIamRole"=env(PROFILE_ROLE_ARN)' -i awsconfigs/common/user-namespace/overlay/profile.yaml


cat awsconfigs/apps/pipeline/s3/service-account.yaml
cat awsconfigs/common/user-namespace/overlay/profile.yaml
```

## Install
### order
```python
cat tests/e2e/utils/kubeflow_installation.py # grep static 하면 static 사용가능.


#level 1
#cert-manager
cert-manager:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/cert-manager/cert-manager/base
    helm:
      repo: remote
  validations:
    pods:
      namespace: cert-manager
      labels:
        - key: app.kubernetes.io/instance
          value: cert-manager

#kubeflow-roles
kubeflow-roles:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/kubeflow-roles/base
    helm:
      paths: ../../charts/common/kubeflow-roles

#level 2
#kubeflow-issuer
kubeflow-issuer:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/cert-manager/kubeflow-issuer/base
    helm:
      paths: ../../charts/common/kubeflow-issuer

#istio
istio:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/istio-1-16/istio-crds/base
        - ../../upstream/common/istio-1-16/istio-namespace/base
        - ../../upstream/common/istio-1-16/istio-install/base
    helm:
      paths: ../../charts/common/istio
  validations:
    pods:
      namespace: istio-system
      labels:
        - key: app
          value: istio-ingressgateway, istiod

#dex
dex:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/dex/overlays/istio
    helm:
      paths: ../../charts/common/dex
  validations:
    pods:
      namespace: auth
      labels:
        - key: app
          value: dex

#kubeflow-namespace
kubeflow-namespace:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/kubeflow-namespace/base
    helm:
      paths: ../../charts/common/kubeflow-namespace

#cluster-local-gateway
cluster-local-gateway:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/istio-1-16/cluster-local-gateway/base
    helm:
      paths: ../../charts/common/cluster-local-gateway
  validations:
    pods:
      namespace: istio-system
      labels:
        - key: app
          value: cluster-local-gateway

#knative-serving
knative-serving:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/knative/knative-serving/overlays/gateways
    helm:
      paths: ../../charts/common/knative-serving
  validations:
    crds:
      - images.caching.internal.knative.dev
    pods:
      namespace: knative-serving
      labels:
        - key: app.kubernetes.io/name
          value: knative-serving

#knative-eventing
knative-eventing:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/knative/knative-eventing/base
    helm:
      paths: ../../charts/common/knative-eventing
  validations:
    pods:
      namespace: knative-eventing
      labels:
        - key: app.kubernetes.io/name
          value: knative-eventing

#level 4
#oidc-authservice
oidc-authservice:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/oidc-authservice/base
    helm:
      paths: ../../charts/common/oidc-authservice
  validations:
    pods:
      namespace: istio-system
      labels:
        - key: app
          value: authservice

#kubeflow-istio-resources
kubeflow-istio-resources:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/common/istio-1-16/kubeflow-istio-resources/base
    helm:
      paths: ../../charts/common/kubeflow-istio-resources

#kserve
kserve:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/apps/kserve
    helm:
      paths: ../../charts/common/kserve
  validations:
    crds:
      - clusterservingruntimes.serving.kserve.io
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: kserve

#models-web-app
models-web-app:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/contrib/kserve/models-web-app/overlays/kubeflow
    helm:
      paths: ../../charts/apps/models-web-app
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: kustomize.component
          value: kserve-models-web-app

#level 5
#central-dashboard
central-dashboard:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/apps/centraldashboard
    helm:
      paths: ../../charts/apps/central-dashboard
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: centraldashboard

#pipelines
kubeflow-pipelines:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/apps/pipeline/
    helm:
      paths: ../../charts/apps/kubeflow-pipelines/rds-s3
  validations:
    crds:
      - compositecontrollers.metacontroller.k8s.io
    pods:
      namespace: kubeflow
      labels:
        - key: application-crd-id
          value: kubeflow-pipelines

#notebook
#admission-webhook
admission-webhook:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/apps/admission-webhook/upstream/overlays/cert-manager
    helm:
      paths: ../../charts/apps/admission-webhook
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: poddefaults

#jupyter-web-app
jupyter-web-app:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/apps/jupyter-web-app
    helm:
      paths: ../../charts/apps/jupyter-web-app
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: jupyter-web-app

#notebook-controller
notebook-controller:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/apps/notebook-controller
    helm:
      paths: ../../charts/apps/notebook-controller
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: notebook-controller

#volume-web-app
volumes-web-app:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/apps/volumes-web-app/upstream/overlays/istio
    helm:
      paths: ../../charts/apps/volumes-web-app
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: volumes-web-app

#training-operator
training-operator:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/apps/training-operator/upstream/overlays/kubeflow
    helm:
      paths: ../../charts/apps/training-operator
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: control-plane
          value: kubeflow-training-operator

#katib
katib:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/apps/katib-external-db-with-kubeflow
    helm:
      paths: ../../charts/apps/katib/katib-external-db-with-kubeflow
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: katib.kubeflow.org/component
          value: controller, db-manager, ui

#tensorboard
tensorboard-controller:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/apps/tensorboard/tensorboard-controller/upstream/overlays/kubeflow
    helm:
      paths: ../../charts/apps/tensorboard-controller
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: tensorboard-controller

#tensorboards-web-app
tensorboards-web-app:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/apps/tensorboard/tensorboards-web-app/upstream/overlays/istio
    helm:
      paths: ../../charts/apps/tensorboards-web-app
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: tensorboards-web-app

#profiles and kfam
profiles-and-kfam:
  installation_options:
    kustomize:
      paths:
        - ../../upstream/apps/profiles/upstream/overlays/kubeflow
    helm:
      paths: ../../charts/apps/profiles-and-kfam
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: kustomize.component
          value: profiles

#user namespace
user-namespace:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/common/user-namespace/overlay
    helm:
      paths: ../../charts/common/user-namespace

#AWS Secrets Manager
aws-secrets-manager:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/common/aws-secrets-manager/rds
    helm:
      paths: ../../charts/common/aws-secrets-manager/rds-only
  validations:
    pods:
      namespace: kubeflow
      labels:
        - key: app
          value: aws-secrets-sync


ack-sagemaker-controller:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/common/ack-sagemaker-controller
    helm:
      repo: remote

#AWS Telemetry (Optional)
aws-telemetry:
  installation_options:
    kustomize:
      paths:
        - ../../awsconfigs/common/aws-telemetry
    helm:
      paths: ../../charts/common/aws-telemetry
```

### cert-manager
```python
kustomize build upstream/common/cert-manager/cert-manager/base | kubectl apply -f -
kustomize build upstream/common/cert-manager/kubeflow-issuer/base | kubectl apply -f - # 여기 에러나서 스킵ㅜ
```


### istio
kubeflow v1.5.0
```python
kustomize build upstream/common/istio-1-11/istio-crds/base | kubectl apply -f -
kustomize build upstream/common/istio-1-11/istio-namespace/base | kubectl apply -f -
kustomize build upstream/common/istio-1-11/istio-install/base | kubectl apply -f -
```

kubeflow v1.7.0
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
kubeflow v1.5.0
```python
kustomize build upstream/common/istio-1-11/cluster-local-gateway/base | kubectl apply -f -
```

kubeflow v1.7.0
```python
kustomize build upstream/common/istio-1-16/cluster-local-gateway/base | kubectl apply -f -
```

### kubeflow-resource
```python
kustomize build upstream/common/kubeflow-namespace/base | kubectl apply -f -
kustomize build upstream/common/kubeflow-roles/base | kubectl apply -f -
```

```python
kustomize build upstream/common/istio-1-11/kubeflow-istio-resources/base | kubectl apply -f -
```

```python
kustomize build upstream/common/istio-1-16/kubeflow-istio-resources/base | kubectl apply -f -
```


### central dashboard (보안그룹 주의)
보안그룹 수정 → 내부 ip에 대해 모든 트래픽 통신 허용
처음으로 kubeflow namespace에 뜨는 pod인데, 보안그룹 허용안하면 pod가 안뜬다.
```python
kustomize build awsconfigs/apps/centraldashboard | kubectl apply -f -
```

#### troubleshoot: istio 15017 port
[https://github.com/istio/istio/wiki/Troubleshooting-Istio#sidecar-injection](https://github.com/istio/istio/wiki/Troubleshooting-Istio#sidecar-injection)
이런식으로 15017로 통신이 안되면 비정상.
```python
kubectl get --raw /api/v1/namespaces/istio-system/services/https:istiod:https-webhook/proxy/inject -v4 I0531 16:47:33.022034 53702 helpers.go:246] server response object: [{ "metadata": {}, "status": "Failure", "message": "error trying to reach service: dial tcp 172.00.000.00:15017: connect: connection timed out", "reason": "ServiceUnavailable", "code": 503 }] Error from server (ServiceUnavailable): error trying to reach service: dial tcp 172.00.000.00:15017: connect: connection timed out
```

아래는 정상.
```python
kubectl get --raw /api/v1/namespaces/istio-system/services/https:istiod:https-webhook/proxy/inject -v4
I0604 14:21:02.987777   21255 helpers.go:246] server response object: [{
  "metadata": {},
  "status": "Failure",
  "message": "the server rejected our request for an unknown reason",
  "reason": "BadRequest",
  "details": {
    "causes": [
      {
        "reason": "UnexpectedServerResponse",
        "message": "no body found"
      }
    ]
  },
  "code": 400
}]
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
- profiles 배포안하면 pending 상태임!! (주의)
```python
kustomize build upstream/apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -
#irsa
kustomize build awsconfigs/apps/notebook-controller | kubectl apply -f -
Error: json: unknown field "env"
error: no objects passed to apply

# 밑에 에러참고
```

### profiles
- profiles deployment → notebook controller 순으로 에러가 사라짐 (당황ㄴㄴ)
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
cp -R awsconfigs/common/user-namespace/overlay upstream/common/user-namespace
kustomize build upstream/common/user-namespace/overlay | kubectl apply -f -
```


### kubeflow pipelines (집중)
secrets manager (배포후 검색날짜에 사용이력이 있으면 ok)
![](https://i.imgur.com/XMITTwi.png)

#### irsa
```python
kustomize build awsconfigs/common/aws-secrets-manager/rds | kubectl apply -f -
```


pipeline
```python
kustomize build awsconfigs/apps/pipeline | kubectl apply -f -
```



#### static
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
kustomize build awsconfigs/apps/pipeline/static | kubectl apply -f -
```

ml-pipeline-pod 가 안뜬다면..?
```python
 kubectl logs -f -n kubeflow pod/ml-pipeline-58894f4b89-zjmpg
I0603 09:07:38.033625       7 client_manager.go:160] Initializing client manager
I0603 09:07:38.033764       7 config.go:57] Config DBConfig.ExtraParams not specified, skipping
F0603 09:07:38.685028       7 client_manager.go:412] Failed to check if Minio bucket exists. Error: Access Denied.
```

→ secret 을 확인하라..
```python
kubectl get secret -n kubeflow mlpipeline-minio-artifact -o yaml
apiVersion: v1
data:
  accesskey: ""
  secretkey: ""
kind: Secret
metadata:
  annotations:
  labels:
    application-crd-id: kubeflow-pipelines
    secrets-store.csi.k8s.io/managed: "true"
  name: mlpipeline-minio-artifact
  namespace: kubeflow
  ownerReferences:
  - apiVersion: apps/v1
    kind: ReplicaSet
    name: aws-secrets-sync-99b5765d8
    uid: 28b41b15-ab80-4d72-a4b5-f5046b34c68f
  resourceVersion: "27377278"
  uid: df8785b1-340d-4748-bf53-d55b5d408fc5
type: Opaque
```
이렇게 비어있으면 access denied 뜬다.

```python
vi awsconfigs/apps/pipeline/s3/disable-default-secret.yaml

apiVersion: v1
kind: Secret
metadata:
  labels:
    application-crd-id: kubeflow-pipelines
  name: mlpipeline-minio-artifact
  namespace: kubeflow
stringData:
  accesskey: "accesskey" # 여기다 적으면 된다.
  secretkey: "secretkey" # 여기다 적으면 된다.
```



#### 처음 실행하면 아래 에러 바로난다.
```python
Error: json: unknown field "env"
error: no objects passed to apply

vi awsconfigs/apps/pipeline/kustomization.yaml

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


## Network
https://awslabs.github.io/kubeflow-manifests/docs/add-ons/load-balancer/guide/
https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/
### Create LoadBalancer
1. Create domain (이미 있음)
2. Create subdomain (이미 있음)
3. Create certificate for subdomain (이미있음) → cert arn
4. Create Load Balancer Controller (이미있음)
5. Create Ingress (없음)

나머지는 다 있으므로 5번만 생성.

### prerequisite
```python
export CLUSTER_REGION=ap-northeast-2
export CLUSTER_NAME=

echo $CLUSTER_REGION
echo $CLUSTER_NAME

kubectl config current-context
aws eks describe-cluster --name $CLUSTER_NAME --region $CLUSTER_REGION
```
### Create Ingress
```python
export certArn=arn:aws:acm:northkorea-2:359838957435:certificate/a94tb255-839b-9414-diq4-deiuoisdf3

echo $certArn

printf 'certArn='$certArn'' > awsconfigs/common/istio-ingress/overlays/https/params.env
```

install order
```python
ls awsconfigs/common/istio-ingress/overlays/https
ingress.yaml       kustomization.yaml params.env

cat awsconfigs/common/istio-ingress/overlays/https/params.env
```


```python
ls awsconfigs/common/istio-ingress/base
ingress.yaml       kustomization.yaml params.env         params.yaml

kubectl describe svc -n istio-system istio-ingressgateway
Requests:
│       cpu:      10m
│       memory:   40Mi
│     Readiness:  http-get http://:15021/healthz/ready delay=1s timeout=1s period=2s #success=1 #failure=30

vi awsconfigs/common/istio-ingress/base/ingress.yaml
```

```python
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/load-balancer-attributes: routing.http.drop_invalid_header_fields.enabled=true
    alb.ingress.kubernetes.io/scheme: $(loadBalancerScheme)
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}]'
    alb.ingress.kubernetes.io/target-type: ip
    # 아래 추가
    alb.ingress.kubernetes.io/healthcheck-port: "15021"
    alb.ingress.kubernetes.io/healthcheck-path: "/healthz/ready"
    alb.ingress.kubernetes.io/group.name: internet
    alb.ingress.kubernetes.io/load-balancer-name: "something"
...
...
spec:
  ingressClassName: alb # 추가
  rules:
  - host: namkyu.qa.co.kr # 추가
    http:
      paths:
      - backend:
          service:
            name: istio-ingressgateway
            port:
              number: 80
        path: /*
        pathType: ImplementationSpecific
```

### install
```python
kustomize build awsconfigs/common/istio-ingress/overlays/https | kubectl apply -f -
```

```python
kustomize build awsconfigs/common/istio-ingress/overlays/https | kubectl delete -f -
```