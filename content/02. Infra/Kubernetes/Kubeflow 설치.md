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


---
## Single Command
```bash
cd manifests

while ! kustomize build example | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 20; done
```


---

## Multiple Command (customize)
In this section, we will install each Kubeflow official component (under `apps`) and each common service (under `common`) separately, using just `kubectl` and `kustomize`.

```bash
ls manifests

LICENSE  OWNERS  README.md  apps  common  contrib  docs  example  go.mod  go.sum  hack  proposals  prow_config.yaml  tests

cd manifests
```

### cert-manager
for admission webhooks.
```python
kustomize build common/cert-manager/cert-manager/base | kubectl apply -f -
echo "Waiting for cert-manager to be ready ..."
kubectl wait --for=condition=ready pod -l 'app in (cert-manager,webhook)' --timeout=180s -n cert-manager
kubectl wait --for=jsonpath='{.subsets[0].addresses[0].targetRef.kind}'=Pod endpoints -l 'app in (cert-manager,webhook)' --timeout=180s -n cert-manager


endpoints/cert-manager condition met
endpoints/cert-manager-webhook condition met

kubectl get ns
cert-manager       Active   2m49s
```

delete
```python
kustomize build common/cert-manager/base | kubectl delete -f -
```



### istio (not recommended)
if installed, skip.

```python
echo "Installing Istio configured with external authorization..."
kustomize build common/istio-1-17/istio-crds/base | kubectl apply -f -
kustomize build common/istio-1-17/istio-namespace/base | kubectl apply -f -
kustomize build common/istio-1-17/istio-install/overlays/oauth2-proxy | kubectl apply -f -

echo "Waiting for all Istio Pods to become ready..."
kubectl wait --for=condition=Ready pods --all -n istio-system --timeout 300s



kustomize build common/istio-1-17/istio-crds/base | kubectl delete -f -
kustomize build common/istio-1-17/istio-namespace/base | kubectl delete -f -
kustomize build common/istio-1-17/istio-install/overlays/oauth2-proxy | kubectl delete -f -
```

### Oauth2-proxy
to be able to function as an OIDC client
```python
echo "Installing oauth2-proxy..."
kustomize build common/oidc-client/oauth2-proxy/overlays/m2m-self-signed/ | kubectl apply -f -
kubectl wait --for=condition=ready pod -l 'app.kubernetes.io/name=oauth2-proxy' --timeout=180s -n oauth2-proxy


pod/oauth2-proxy-646768d597-csfpx condition met
pod/oauth2-proxy-646768d597-pjcqw condition met

kubectl get ns
oauth2-proxy       Active   35s



kustomize build common/oidc-client/oauth2-proxy/overlays/m2m-self-signed/ | kubectl delete -f -
```



### Dex
```python
kustomize build common/dex/overlays/oauth2-proxy | kubectl apply -f -

kustomize build common/dex/overlays/oauth2-proxy | kubectl delete -f -
```



### Knative (knative-eventing)
used by the KServe official Kubeflow component.
```python
kustomize build common/knative/knative-serving/overlays/gateways | kubectl apply -f -
kustomize build common/istio-1-17/cluster-local-gateway/base | kubectl apply -f -

kustomize build common/knative/knative-serving/overlays/gateways | kubectl delete -f -
kustomize build common/istio-1-17/cluster-local-gateway/base | kubectl delete -f -
```

**ERROR**
아래 뜨면 다시 위 명령어 재수행해서 재설치.
```python
error: resource mapping not found for name: "kubeflow-pipelines-profile-controller" namespace: "kubeflow" from "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1"
ensure CRDs are installed first
root@linux:~/k8s/manifests# error: resource mapping not found for name: "kubeflow-pipelines-profile-controller" namespace: "kubeflow" from "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1"
```


### Kubeflow
#### Namespace
```python
kustomize build common/kubeflow-namespace/base | kubectl apply -f -
```

#### Kubeflow Roles
```python
kustomize build common/kubeflow-roles/base | kubectl apply -f -

kustomize build common/kubeflow-roles/base | kubectl delete -f -
```

#### Kubeflow Pipelines
```python
kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl apply -f -
```

delete
```python
kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl delete -f -
```

standalone
```bash
export PIPELINE_VERSION=2.2.0
kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/cluster-scoped-resources?ref=$PIPELINE_VERSION"
kubectl wait --for condition=established --timeout=60s crd/applications.app.k8s.io
kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/env/dev?ref=$PIPELINE_VERSION"
```

```python
kubectl delete -k "github.com/kubeflow/pipelines/manifests/kustomize/cluster-scoped-resources?ref=$PIPELINE_VERSION"
kubectl wait --for condition=established --timeout=60s crd/applications.app.k8s.io
kubectl delete -k "github.com/kubeflow/pipelines/manifests/kustomize/env/dev?ref=$PIPELINE_VERSION"
```


**ERROR**
아래 뜨면 다시 위 명령어 재수행해서 재설치.
```python
error: resource mapping not found for name: "kubeflow-pipelines-profile-controller" namespace: "kubeflow" from "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1"
ensure CRDs are installed first
root@linux:~/k8s/manifests# error: resource mapping not found for name: "kubeflow-pipelines-profile-controller" namespace: "kubeflow" from "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1"
```


### Kserve
- 설치시 오류 2번 났었음. 될때까지 계속 명령어 수행
```python
kustomize build contrib/kserve/kserve | kubectl apply -f -

kustomize build contrib/kserve/kserve | kubectl delete -f -
```


### Katib
```python
kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f -
```

delete
```python
kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl delete -f -
```

### Central Dashboard
```python
kustomize build apps/centraldashboard/upstream/overlays/kserve | kubectl apply -f -

kustomize build apps/centraldashboard/upstream/overlays/kserve | kubectl delete -f -
```


### Admission Webhook
Admission Webhook for PodDefaults:
```python
kustomize build apps/admission-webhook/upstream/overlays/cert-manager | kubectl apply -f -

kustomize build apps/admission-webhook/upstream/overlays/cert-manager | kubectl delete -f -
```


### Notebooks 1.0
controller
```python
kustomize build apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -

kustomize build apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl delete -f -
```

jupyter web app
```python
kustomize build apps/jupyter/jupyter-web-app/upstream/overlays/istio | kubectl apply -f -

kustomize build apps/jupyter/jupyter-web-app/upstream/overlays/istio | kubectl delete -f -
```

### PVC Viewer
```python
kustomize build apps/pvcviewer-controller/upstream/default | kubectl apply -f -

kustomize build apps/pvcviewer-controller/upstream/default | kubectl delete -f -
```


### Profiles + KFAM (skipped)
Kubeflow Access-Management (KFAM) official Kubeflow components:
```python
kustomize build apps/profiles/upstream/overlays/kubeflow | kubectl apply -f -

kustomize build apps/profiles/upstream/overlays/kubeflow | kubectl delete -f -
```

### Volumes Web App
```python
kustomize build apps/volumes-web-app/upstream/overlays/istio | kubectl apply -f -

kustomize build apps/volumes-web-app/upstream/overlays/istio | kubectl delete -f -
```


### Tensorboard (skipped)
tensorboard web app
```python
kustomize build apps/tensorboard/tensorboards-web-app/upstream/overlays/istio | kubectl apply -f -
```

tensorboard controller
```python
kustomize build apps/tensorboard/tensorboard-controller/upstream/overlays/kubeflow | kubectl apply -f -
```


### Tranining Operator
```python
kustomize build apps/training-operator/upstream/overlays/kubeflow | kubectl apply -f -



kustomize build apps/training-operator/upstream/overlays/kubeflow | kubectl delete -f -
```



### User Namespaces
```python
kustomize build common/user-namespace/base | kubectl apply -f -
```



## Final Check
```python
kubectl get pods -n cert-manager
kubectl get pods -n istio-system
kubectl get pods -n auth
kubectl get pods -n knative-eventing
kubectl get pods -n knative-serving
kubectl get pods -n kubeflow
kubectl get pods -n kubeflow-user-example-com
```



### Error 발생
```python
kubectl get pods -n kubeflow
NAME                                                    READY   STATUS             RESTARTS        AGE
admission-webhook-deployment-54df8774c8-5cxb4           1/1     Running            0               13m
cache-server-78f4bf75f4-gsv2z                           2/2     Running            1 (5m41s ago)   18m
centraldashboard-75456c4b95-tfdrv                       2/2     Running            0               13m
jupyter-web-app-deployment-646b966d96-wfm7n             2/2     Running            0               10m
katib-controller-5d8b9df85d-hfz7p                       1/1     Running            0               14m
katib-db-manager-676ffb7c8c-rtqd2                       0/1     CrashLoopBackOff   6 (2m9s ago)    14m
katib-mysql-77b9495867-5d5qs                            0/1     CrashLoopBackOff   7 (3m21s ago)   14m
katib-ui-746df74ff7-x469k                               2/2     Running            0               14m
kserve-controller-manager-6fc859d89b-lbhkl              2/2     Running            0               15m
kubeflow-pipelines-profile-controller-6476b6cb9-hxxw8   1/1     Running            0               18m
metacontroller-0                                        1/1     Running            0               18m
metadata-envoy-deployment-7459fc7c8b-pvq5z              1/1     Running            0               18m
metadata-grpc-deployment-c568bd446-d78sf                1/2     CrashLoopBackOff   8 (111s ago)    18m
metadata-writer-5f79589d47-cft8c                        1/2     CrashLoopBackOff   6 (35s ago)     18m
minio-55464b6ddb-4f26d                                  2/2     Running            0               18m
ml-pipeline-cd4bf9bc8-bs7zd                             1/2     CrashLoopBackOff   7 (3m6s ago)    18m
ml-pipeline-persistenceagent-6b9b9c89dd-d2rgn           2/2     Running            0               18m
ml-pipeline-scheduledworkflow-5d8858d674-5jnhp          2/2     Running            0               18m
ml-pipeline-ui-6bf6b6cb9f-vcvck                         2/2     Running            0               18m
ml-pipeline-viewer-crd-65cd4b9d75-prp8t                 2/2     Running            1 (17m ago)     18m
ml-pipeline-visualizationserver-769c44f96d-2nhkp        2/2     Running            0               18m
mysql-7d8b8ff4f4-89nkd                                  1/2     CrashLoopBackOff   8 (117s ago)    18m
notebook-controller-deployment-7f44fdc4c5-cs8gz         2/2     Running            1 (13m ago)     13m
pvcviewer-controller-manager-58c98cdcc8-xkp6m           3/3     Running            0               10m
volumes-web-app-deployment-6dfbf9cc44-95msl             2/2     Running            0               10m
workflow-controller-65c58f96d4-ffsln                    2/2     Running            2 (17m ago)     18m
```

에러난 순서:
- metadata-grpc-deployment-c568bd446-d78s
- metadata-writer-5f79589d47-cft8c
- ml-pipeline-cd4bf9bc8-bs7z
- mysql-7d8b8ff4f4-89nkd
→ ml pipeline 에서 에러남.

- katib-db-manager-676ffb7c8c-rtqd2
- katib-mysql-77b9495867-5d5qs
→ katib 에서 에러남.





## Connect

### Port-foward
```python
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```