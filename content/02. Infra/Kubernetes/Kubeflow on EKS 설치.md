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

github: https://github.com/awslabs/kubeflow-manifests/tree/release-v1.7.0-aws-b1.0.3
documentation: https://awslabs.github.io/kubeflow-manifests/docs/deployment/rds-s3/

**USING: RDS & S3**

## 1. Prerequisite
https://awslabs.github.io/kubeflow-manifests/docs/deployment/prerequisites/

The `make` command above installs the following tools:
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) - A command line tool for interacting with AWS services.
- [eksctl](https://eksctl.io/introduction/#installation) - A command line tool for working with EKS clusters.
- [kubectl](https://kubernetes.io/docs/tasks/tools) - A command line tool for working with Kubernetes clusters.
- [yq](https://mikefarah.gitbook.io/yq) - A command line tool for YAML processing. (For Linux environments, use the [wget plain binary installation](https://github.com/mikefarah/yq/#install))
- [jq](https://stedolan.github.io/jq/download/) - A command line tool for processing JSON.
- [kustomize version 5.0.1](https://github.com/kubernetes-sigs/kustomize/releases/tag/kustomize%2Fv5.0.1) - A command line tool to customize Kubernetes objects through a kustomization file.
- [python 3.8+](https://www.python.org/downloads/) - A programming language used for automated installation scripts.
- [pip](https://pip.pypa.io/en/stable/installation/) - A package installer for python.
- [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) - An infrastructure as code tool that lets you develop cloud and on-prem resources.
- [helm](https://helm.sh/docs/intro/install/) - A package manager for Kubernetes

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
export KUBEFLOW_RELEASE_VERSION=v1.7.0
export AWS_RELEASE_VERSION=v1.7.0-aws-b1.0.3
git clone https://github.com/awslabs/kubeflow-manifests.git && cd kubeflow-manifests
git checkout ${AWS_RELEASE_VERSION}
git clone --branch ${KUBEFLOW_RELEASE_VERSION} https://github.com/kubeflow/manifests.git upstream
```


### cluster-name
```python

export CLUSTER_NAME=
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
- 설치방법에는 static, IRSA가 있는데 static 방법은 사용 X
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
## 2. RDS, S3 Secret
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
export S3_BUCKET=my_bucket

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
      - objectName: "rds-secret-new"  # 여기에 이름 추가 다른건 변경 X
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


vi awsconfigs/common/aws-secrets-manager/s3/secret-provider.yaml # IRSA 방식은 수정 필요없음
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

```bash
eksctl create iamserviceaccount  --name kubeflow-secrets-manager-sa  --namespace kubeflow  --cluster $CLUSTER_NAME --attach-policy-arn  arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess --attach-policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite --override-existing-serviceaccounts   --approve --region $CLUSTER_REGION

kubectl get sa -n kubeflow
kubeflow-secrets-manager-sa           0         30s
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

export PIPELINE_S3_CREDENTIAL_OPTION=irsa
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

# 아래처럼 나오면 성공
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ml-pipeline
  namespace: kubeflow
  annotations:
    eks.amazonaws.com/role-arn: 'arn:aws:iam::.../kf-pipeline-backend-role-my-eks'
```

### Install CSI Driver and update KFP configurations
```python
 kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/v1.3.2/deploy/rbac-secretproviderclass.yaml
 kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/v1.3.2/deploy/csidriver.yaml
 kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/v1.3.2/deploy/secrets-store.csi.x-k8s.io_secretproviderclasses.yaml
 kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/v1.3.2/deploy/secrets-store.csi.x-k8s.io_secretproviderclasspodstatuses.yaml
 kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/v1.3.2/deploy/secrets-store-csi-driver.yaml
 kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/v1.3.2/deploy/rbac-secretprovidersyncing.yaml
 kubectl apply -f https://raw.githubusercontent.com/aws/secrets-store-csi-driver-provider-aws/main/deployment/aws-provider-installer.yaml

```

### ADD node-selector in kustomize
cert-manager 예시
mkdir upstream/common/cert-manager/cert-manager/base/patches

vi upstream/common/cert-manager/cert-manager/base/kustomization.yaml
```python
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - cert-manager.yaml
patchesStrategicMerge: ### 여기 추가 ###
  - patches/node-selector-patch.yaml
```

```python
cat << EOF > upstream/common/cert-manager/cert-manager/base/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cert-manager-webhook
  namespace: cert-manager
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cert-manager
  namespace: cert-manager
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cert-manager-cainjector
  namespace: cert-manager
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```
## 3. Install
- 설치방법에는 static, IRSA가 있는데 static 방법은 사용 X
### order (참고만 하자)
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
kubeflow v1.7.0
```python
kustomize build upstream/common/istio-1-16/istio-crds/base | kubectl apply -f -
kustomize build upstream/common/istio-1-16/istio-namespace/base | kubectl apply -f -
kustomize build upstream/common/istio-1-16/istio-install/base | kubectl apply -f -
```
#### nodeSelector
vi upstream/common/istio-1-16/istio-install/base/kustmoization.yaml
```python
patchesStrategicMerge:
- patches/service.yaml
- patches/istio-configmap-disable-tracing.yaml
- patches/disable-debugging.yaml
- patches/node-selector-patch.yaml # 추가
```

```python
cat << EOF > upstream/common/istio-1-16/istio-install/base/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: istio-ingressgateway
  namespace: istio-system
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: istiod
  namespace: istio-system
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```




### oidc-auth
```python
kustomize build upstream/common/oidc-authservice/base | kubectl apply -f -
```

### dex
```python
kustomize build upstream/common/dex/overlays/istio | kubectl apply -f -
```

#### nodeSelector
```python
mkdir -p upstream/common/dex/overlays/istio/patches

cat << EOF >> upstream/common/dex/overlays/istio/kustomization.yaml
patchesStrategicMerge:
  - patches/node-selector-patch.yaml
EOF
```

```python
cat << EOF > upstream/common/dex/overlays/istio/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dex
  namespace: auth
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```


### cluster-local-gateway
kubeflow v1.7.0
```python
kustomize build upstream/common/istio-1-16/cluster-local-gateway/base | kubectl apply -f -
```

#### nodeSelector
```python
vi upstream/common/istio-1-16/cluster-local-gateway/base/kustomization.yaml

cat << EOF > upstream/common/istio-1-16/cluster-local-gateway/base/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-local-gateway
  namespace: istio-system
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```




### Knative-serving (optional)
CRD 이슈 때문에 두번 실행해야함
```python
kustomize build upstream/common/knative/knative-serving/overlays/gateways | kubectl apply -f -
```

### Knative-eventing (optional)
```python
kustomize build upstream/common/knative/knative-eventing/base | kubectl apply -f -
```

### kubeflow-resource
```python
kustomize build upstream/common/kubeflow-namespace/base | kubectl apply -f -
kustomize build upstream/common/kubeflow-roles/base | kubectl apply -f -
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

#### nodeSelector
```python
vi awsconfigs/apps/centraldashboard/kustomization.yaml
- patches/node-selector-patch.yaml

cat << EOF > awsconfigs/apps/centraldashboard/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: centraldashboard
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```





#### troubleshoot: istio 15017 port
[https://github.com/istio/istio/wiki/Troubleshooting-Istio#sidecar-injection](https://github.com/istio/istio/wiki/Troubleshooting-Istio#sidecar-injection)
이런식으로 15017로 통신이 안되면 비정상.
```python
kubectl get --raw /api/v1/namespaces/istio-system/services/https:istiod:https-webhook/proxy/inject -v4 
I0531 16:47:33.022034 53702 helpers.go:246] server response object: [{ "metadata": {}, "status": "Failure", "message": "error trying to reach service: dial tcp 172.00.000.00:15017: connect: connection timed out", "reason": "ServiceUnavailable", "code": 503 }] Error from server (ServiceUnavailable): error trying to reach service: dial tcp 172.00.000.00:15017: connect: connection timed out
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

#### nodeSelector
upstream/apps/admission-webhook/upstream/overlays/cert-manager
```python
mkdir -p upstream/apps/admission-webhook/upstream/overlays/cert-manager/patches

vi upstream/apps/admission-webhook/upstream/overlays/cert-manager/kustomization.yaml
- patches/node-selector-patch.yaml
EOF

cat << EOF > upstream/apps/admission-webhook/upstream/overlays/cert-manager/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: admission-webhook-deployment
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
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


#### nodeSelector
```python
cat << EOF > upstream/apps/jupyter/notebook-controller/upstream/overlays/kubeflow/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: notebook-controller-deployment
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```


### profiles
- profiles deployment → notebook controller 순으로 에러가 사라짐 (당황ㄴㄴ)
```python
kustomize build upstream/apps/profiles/upstream/overlays/kubeflow | kubectl apply -f -
```

#### nodeSelector
```python
cat << EOF > upstream/apps/profiles/upstream/overlays/kubeflow/patches/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: profiles-deployment
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
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

#### nodeSelector
```python
cat << EOF > upstream/common/user-namespace/overlay/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubeflow
  namespace: kubeflow-user-example-com
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
EOF
```


### ML pipeline
irsa
```python
kustomize build awsconfigs/common/aws-secrets-manager/rds | kubectl apply -f -
```

static (사용 권장 X)
```python
kustomize build awsconfigs/common/aws-secrets-manager | kubectl apply -f -
```

accesskey secretkey update for s3
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

#### 주의 사항
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


#### pipeline
irsa
```python
kustomize build awsconfigs/apps/pipeline | kubectl apply -f -
```

static
```python
kustomize build awsconfigs/apps/pipeline/static | kubectl apply -f -
```

#### nodeSelector
```python
cat << EOF > awsconfigs/apps/pipeline/node-selector-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cache-server
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubeflow-pipelines-profile-controller
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metadata-writer
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metadata-envoy-deployment
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metadata-grpc-deployment
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-pipeline
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-pipeline-persistenceagent
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-pipeline-scheduledworkflow
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-pipeline-ui
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: spot
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-pipeline-viewer-crd
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: spot
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-pipeline-visualizationserver
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: spot
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: workflow-controller
  namespace: kubeflow
spec:
  template:
    spec:
      nodeSelector:
        application: kubeflow
        karpenter.sh/capacity-type: on-demand
    metadata:
      annotations:
        karpenter.sh/do-not-disrupt: "true"
EOF
```




#### 에러 발생
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
- katib container들 늦게뜸 당황ㄴㄴ
```python
kustomize build awsconfigs/apps/katib-external-db-with-kubeflow | kubectl apply -f -
```


### Kserve (optional)
CRD 이슈로 두번 실행
```python
kustomize build upstream/contrib/kserve/kserve | kubectl apply -f -
kustomize build upstream/contrib/kserve/models-web-app/overlays/kubeflow | kubectl apply -f -
```


## 4. Network
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
> arn:aws:eks:ap-us-2:212346789:cluster/my-eks

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

## 5. 운영
### 유저 추가하는법
add user
```python
vi upstream/common/user-namespace/overlay/profile-namkyu.yaml

apiVersion: kubeflow.org/v1beta1
kind: Profile
metadata:
  name: kubeflow-namkyu
spec:
  owner:
    kind: User
    name: namkyu@gmail.com
  plugins:
    - kind: AwsIamForServiceAccount
      spec:
        awsIamRole: arn:aws:iam::1111111111:role/kf-pipeline-profile-role-my-eks
        annotateOnly: true
```

```python
kubectl apply -f upstream/common/user-namespace/overlay/profile-namkyu.yaml
```

add password
```python
pip install passlib bcrypt

from passlib.hash import bcrypt
import getpass

print(bcrypt.using(rounds=12, ident="2y").hash(getpass.getpass()))
> $2y$12$7RrMyk.rA9I99E7OeVoMR.wt9h0J/PHhoxblCNp7g0Kt20vRhHWge
```

or
```
python3 -c 'from passlib.hash import bcrypt; import getpass; print(bcrypt.using(rounds=12, ident="2y").hash(getpass.getpass()))'

> $2y$12$7RrMyk.rA9I99E7OeVoMR.wt9h0J/PHhoxblCNp7g0Kt20vRhHWge
```


```python
vi upstream/common/dex/base/config-map.yaml

staticPasswords:
- email: user@example.com
  hash: $2y$12$4K/VkmDd1q1Orb3xAt82zu8gk7Ad6ReFR4LCP9UeYE90NLiN9Df72
  username: user
  userID: "15841185641784"
- email: namkyu@gmail.com # 아이디 추가
  hash: $2y$12$7RrMyk.rA9I99E7OeVoMR.wt9h0J/PHhoxblCNp7g0Kt20vRhHWge # 비번추가
```

```python
# put new cred
kustomize build upstream/common/dex/overlays/istio | kubectl apply -f -

# apply new cred
kubectl rollout restart deployment dex -n auth
```