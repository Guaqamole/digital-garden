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
### 설치 파일 준비[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#%EC%84%A4%EC%B9%98-%ED%8C%8C%EC%9D%BC-%EC%A4%80%EB%B9%84 "설치 파일 준비에 대한 직접 링크")

Kubeflow **v1.80** 버전을 설치하기 위해서, 설치에 필요한 manifests 파일들을 준비합니다.

[kubeflow/manifests Repository](https://github.com/kubeflow/manifests) 를 **v1.8.0** 태그로 깃 클론한 뒤, 해당 폴더로 이동합니다.

```
git clone -b v1.8.0 https://github.com/kubeflow/manifests.gitcd manifests
```

### 각 구성 요소별 설치[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#%EA%B0%81-%EA%B5%AC%EC%84%B1-%EC%9A%94%EC%86%8C%EB%B3%84-%EC%84%A4%EC%B9%98 "각 구성 요소별 설치에 대한 직접 링크")

kubeflow/manifests Repository 에 각 구성 요소별 설치 커맨드가 적혀져 있지만, 설치하며 발생할 수 있는 이슈 혹은 정상적으로 설치되었는지 확인하는 방법이 적혀져 있지 않아 처음 설치하는 경우 어려움을 겪는 경우가 많습니다.  
따라서, 각 구성 요소별로 정상적으로 설치되었는지 확인하는 방법을 함께 작성합니다.

또한, 본 문서에서는 다루지 않는 구성요소인 Knative, KFServing, MPI Operator 의 설치는 리소스의 효율적 사용을 위해 따로 설치하지 않습니다.

### Cert-manager[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#cert-manager "Cert-manager에 대한 직접 링크")

1. cert-manager 를 설치합니다.
    
    ```
    kustomize build common/cert-manager/cert-manager/base | kubectl apply -f -
    ```
    
    정상적으로 설치되면 다음과 같이 출력됩니다.
    
    ```
    namespace/cert-manager createdcustomresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io createdcustomresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io createdcustomresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io createdcustomresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io createdcustomresourcedefinition.apiextensions.k8s.io/issuers.cert-manager.io createdcustomresourcedefinition.apiextensions.k8s.io/orders.acme.cert-manager.io createdserviceaccount/cert-manager createdserviceaccount/cert-manager-cainjector createdserviceaccount/cert-manager-webhook createdrole.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving createdrole.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection createdrole.rbac.authorization.k8s.io/cert-manager:leaderelection createdclusterrole.rbac.authorization.k8s.io/cert-manager-cainjector createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-certificates createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-challenges createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-issuers createdclusterrole.rbac.authorization.k8s.io/cert-manager-controller-orders createdclusterrole.rbac.authorization.k8s.io/cert-manager-edit createdclusterrole.rbac.authorization.k8s.io/cert-manager-view createdclusterrole.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews createdrolebinding.rbac.authorization.k8s.io/cert-manager-webhook:dynamic-serving createdrolebinding.rbac.authorization.k8s.io/cert-manager-cainjector:leaderelection createdrolebinding.rbac.authorization.k8s.io/cert-manager:leaderelection createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-cainjector createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-approve:cert-manager-io createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-certificates createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-challenges createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-clusterissuers createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-ingress-shim createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-issuers createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-controller-orders createdclusterrolebinding.rbac.authorization.k8s.io/cert-manager-webhook:subjectaccessreviews createdservice/cert-manager createdservice/cert-manager-webhook createddeployment.apps/cert-manager createddeployment.apps/cert-manager-cainjector createddeployment.apps/cert-manager-webhook createdmutatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook createdvalidatingwebhookconfiguration.admissionregistration.k8s.io/cert-manager-webhook created
    ```
    
    cert-manager namespace 의 3 개의 pod 가 모두 Running 이 될 때까지 기다립니다.
    
    ```
    kubectl get pod -n cert-manager
    ```
    
    모두 Running 이 되면 다음과 비슷한 결과가 출력됩니다.
    
    ```
    NAME                                       READY   STATUS    RESTARTS   AGEcert-manager-7dd5854bb4-7nmpd              1/1     Running   0          2m10scert-manager-cainjector-64c949654c-2scxr   1/1     Running   0          2m10scert-manager-webhook-6b57b9b886-7q6g2      1/1     Running   0          2m10s
    ```
    
2. kubeflow-issuer 를 설치합니다.
    
    ```
    kustomize build common/cert-manager/kubeflow-issuer/base | kubectl apply -f -
    ```
    
    정상적으로 설치되면 다음과 같이 출력됩니다.
    
    ```
    clusterissuer.cert-manager.io/kubeflow-self-signing-issuer created
    ```
    

- cert-manager-webhook 이슈
    
    cert-manager-webhook deployment 가 Running 이 아닌 경우, 다음과 비슷한 에러가 발생하며 kubeflow-issuer가 설치되지 않을 수 있음에 주의하시기 바랍니다.  
    해당 에러가 발생한 경우, cert-manager 의 3개의 pod 가 모두 Running 이 되는 것을 확인한 이후 다시 명령어를 수행하시기 바랍니다.
    
    ```
    Error from server: error when retrieving current configuration of:Resource: "cert-manager.io/v1alpha2, Resource=clusterissuers", GroupVersionKind: "cert-manager.io/v1alpha2, Kind=ClusterIssuer"Name: "kubeflow-self-signing-issuer", Namespace: ""from server for: "STDIN": conversion webhook for cert-manager.io/v1, Kind=ClusterIssuer failed: Post "https://cert-manager-webhook.cert-manager.svc:443/convert?timeout=30s": dial tcp 10.101.177.157:443: connect: connection refused
    ```

### Istio[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#istio "Istio에 대한 직접 링크")
1. istio 관련 Custom Resource Definition(CRD) 를 설치합니다.
    
    ```
    kustomize build common/istio-1-17/istio-crds/base | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    customresourcedefinition.apiextensions.k8s.io/authorizationpolicies.security.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/destinationrules.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/envoyfilters.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/gateways.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/istiooperators.install.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/peerauthentications.security.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/requestauthentications.security.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/serviceentries.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/sidecars.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/virtualservices.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/workloadentries.networking.istio.io createdcustomresourcedefinition.apiextensions.k8s.io/workloadgroups.networking.istio.io created
    ```
    
2. istio namespace 를 설치합니다.
    
    ```
    kustomize build common/istio-1-17/istio-namespace/base | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    namespace/istio-system created
    ```
    
3. istio 를 설치합니다.
    
    ```
    kustomize build common/istio-1-17/istio-install/base | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    serviceaccount/istio-ingressgateway-service-account createdserviceaccount/istio-reader-service-account createdserviceaccount/istiod-service-account createdrole.rbac.authorization.k8s.io/istio-ingressgateway-sds createdrole.rbac.authorization.k8s.io/istiod-istio-system createdclusterrole.rbac.authorization.k8s.io/istio-reader-istio-system createdclusterrole.rbac.authorization.k8s.io/istiod-istio-system createdrolebinding.rbac.authorization.k8s.io/istio-ingressgateway-sds createdrolebinding.rbac.authorization.k8s.io/istiod-istio-system createdclusterrolebinding.rbac.authorization.k8s.io/istio-reader-istio-system createdclusterrolebinding.rbac.authorization.k8s.io/istiod-istio-system createdconfigmap/istio createdconfigmap/istio-sidecar-injector createdservice/istio-ingressgateway createdservice/istiod createddeployment.apps/istio-ingressgateway createddeployment.apps/istiod createdenvoyfilter.networking.istio.io/metadata-exchange-1.8 createdenvoyfilter.networking.istio.io/metadata-exchange-1.9 createdenvoyfilter.networking.istio.io/stats-filter-1.8 createdenvoyfilter.networking.istio.io/stats-filter-1.9 createdenvoyfilter.networking.istio.io/tcp-metadata-exchange-1.8 createdenvoyfilter.networking.istio.io/tcp-metadata-exchange-1.9 createdenvoyfilter.networking.istio.io/tcp-stats-filter-1.8 createdenvoyfilter.networking.istio.io/tcp-stats-filter-1.9 createdenvoyfilter.networking.istio.io/x-forwarded-host createdgateway.networking.istio.io/istio-ingressgateway createdauthorizationpolicy.security.istio.io/global-deny-all createdauthorizationpolicy.security.istio.io/istio-ingressgateway createdmutatingwebhookconfiguration.admissionregistration.k8s.io/istio-sidecar-injector createdvalidatingwebhookconfiguration.admissionregistration.k8s.io/istiod-istio-system created
    ```
    
    istio-system namespace 의 2 개의 pod 가 모두 Running 이 될 때까지 기다립니다.
    ```
    kubectl get po -n istio-system
    ```
    
    모두 Running 이 되면 다음과 비슷한 결과가 출력됩니다.
    ```
    NAME                                   READY   STATUS    RESTARTS   AGEistio-ingressgateway-79b665c95-xm22l   1/1     Running   0          16sistiod-86457659bb-5h58w                1/1     Running   0          16s
    ```
    

### Dex[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#dex "Dex에 대한 직접 링크")

dex 를 설치합니다.

```
kustomize build common/dex/overlays/istio | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
namespace/auth createdcustomresourcedefinition.apiextensions.k8s.io/authcodes.dex.coreos.com createdserviceaccount/dex createdclusterrole.rbac.authorization.k8s.io/dex createdclusterrolebinding.rbac.authorization.k8s.io/dex createdconfigmap/dex createdsecret/dex-oidc-client createdservice/dex createddeployment.apps/dex createdvirtualservice.networking.istio.io/dex created
```

auth namespace 의 1 개의 pod 가 모두 Running 이 될 때까지 기다립니다.

```
kubectl get po -n auth
```

모두 Running 이 되면 다음과 비슷한 결과가 출력됩니다.

```
NAME                   READY   STATUS    RESTARTS   AGEdex-5ddf47d88d-458cs   1/1     Running   1          12s
```

### OIDC AuthService[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#oidc-authservice "OIDC AuthService에 대한 직접 링크")

OIDC AuthService 를 설치합니다.
```
kustomize build common/oidc-client/oidc-authservice/base | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.
```
configmap/oidc-authservice-parameters createdsecret/oidc-authservice-client createdservice/authservice createdpersistentvolumeclaim/authservice-pvc createdstatefulset.apps/authservice createdenvoyfilter.networking.istio.io/authn-filter created
```

istio-system namespace 에 authservice-0 pod 가 Running 이 될 때까지 기다립니다.
```
kubectl get po -n istio-system -w
```

모두 Running 이 되면 다음과 비슷한 결과가 출력됩니다.
```
NAME                                   READY   STATUS    RESTARTS   AGEauthservice-0                          1/1     Running   0          14sistio-ingressgateway-79b665c95-xm22l   1/1     Running   0          2m37sistiod-86457659bb-5h58w                1/1     Running   0          2m37s
```

### Kubeflow Namespace[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#kubeflow-namespace "Kubeflow Namespace에 대한 직접 링크")

kubeflow namespace 를 생성합니다.
```
kustomize build common/kubeflow-namespace/base | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.
```
namespace/kubeflow created
```

kubeflow namespace 를 조회합니다.
```
kubectl get ns kubeflow
```

정상적으로 생성되면 다음과 비슷한 결과가 출력됩니다.
```
NAME       STATUS   AGEkubeflow   Active   8s
```

### Kubeflow Roles[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#kubeflow-roles "Kubeflow Roles에 대한 직접 링크")

kubeflow-roles 를 설치합니다.
```
kustomize build common/kubeflow-roles/base | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.
```
clusterrole.rbac.authorization.k8s.io/kubeflow-admin createdclusterrole.rbac.authorization.k8s.io/kubeflow-edit createdclusterrole.rbac.authorization.k8s.io/kubeflow-kubernetes-admin createdclusterrole.rbac.authorization.k8s.io/kubeflow-kubernetes-edit createdclusterrole.rbac.authorization.k8s.io/kubeflow-kubernetes-view createdclusterrole.rbac.authorization.k8s.io/kubeflow-view created
```

방금 생성한 kubeflow roles 를 조회합니다.
```
kubectl get clusterrole | grep kubeflow
```


다음과 같이 총 6개의 clusterrole 이 출력됩니다.
```
kubeflow-admin                                                         2021-12-03T08:51:36Zkubeflow-edit                                                          2021-12-03T08:51:36Zkubeflow-kubernetes-admin                                              2021-12-03T08:51:36Zkubeflow-kubernetes-edit                                               2021-12-03T08:51:36Zkubeflow-kubernetes-view                                               2021-12-03T08:51:36Zkubeflow-view                                                          2021-12-03T08:51:36Z
```

### Kubeflow Istio Resources[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#kubeflow-istio-resources "Kubeflow Istio Resources에 대한 직접 링크")

kubeflow-istio-resources 를 설치합니다.
```
kustomize build common/istio-1-17/kubeflow-istio-resources/base | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
clusterrole.rbac.authorization.k8s.io/kubeflow-istio-admin createdclusterrole.rbac.authorization.k8s.io/kubeflow-istio-edit createdclusterrole.rbac.authorization.k8s.io/kubeflow-istio-view createdgateway.networking.istio.io/kubeflow-gateway created
```

방금 생성한 kubeflow roles 를 조회합니다.
```
kubectl get clusterrole | grep kubeflow-istio
```

다음과 같이 총 3개의 clusterrole 이 출력됩니다.
```
kubeflow-istio-admin                                                   2021-12-03T08:53:17Zkubeflow-istio-edit                                                    2021-12-03T08:53:17Zkubeflow-istio-view                                                    2021-12-03T08:53:17Z
```

Kubeflow namespace 에 gateway 가 정상적으로 설치되었는지 확인합니다.
```
kubectl get gateway -n kubeflow
```

정상적으로 생성되면 다음과 비슷한 결과가 출력됩니다.
```
NAME               AGEkubeflow-gateway   31s
```

### Kubeflow Pipelines[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#kubeflow-pipelines "Kubeflow Pipelines에 대한 직접 링크")

kubeflow pipelines 를 설치합니다.
```
kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.
```
customresourcedefinition.apiextensions.k8s.io/clusterworkflowtemplates.argoproj.io createdcustomresourcedefinition.apiextensions.k8s.io/cronworkflows.argoproj.io createdcustomresourcedefinition.apiextensions.k8s.io/workfloweventbindings.argoproj.io created...(생략)authorizationpolicy.security.istio.io/ml-pipeline-visualizationserver createdauthorizationpolicy.security.istio.io/mysql createdauthorizationpolicy.security.istio.io/service-cache-server created
```

위 명령어는 여러 resources 를 한 번에 설치하고 있지만, 설치 순서의 의존성이 있는 리소스가 존재합니다.  
따라서 때에 따라 다음과 비슷한 에러가 발생할 수 있습니다.

```
"error: unable to recognize "STDIN": no matches for kind "CompositeController" in version "metacontroller.k8s.io/v1alpha1""  
```

위와 비슷한 에러가 발생한다면, 10 초 정도 기다린 뒤 다시 위의 명령을 수행합니다.

```
kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl apply -f -
```

정상적으로 설치되었는지 확인합니다.
```
kubectl get po -n kubeflow
```

다음과 같이 총 16개의 pod 가 모두 Running 이 될 때까지 기다립니다.
```
NAME                                                     READY   STATUS    RESTARTS   AGEcache-deployer-deployment-79fdf9c5c9-bjnbg               2/2     Running   1          5m3scache-server-5bdf4f4457-48gbp                            2/2     Running   0          5m3skubeflow-pipelines-profile-controller-7b947f4748-8d26b   1/1     Running   0          5m3smetacontroller-0                                         1/1     Running   0          5m3smetadata-envoy-deployment-5b4856dd5-xtlkd                1/1     Running   0          5m3smetadata-grpc-deployment-6b5685488-kwvv7                 2/2     Running   3          5m3smetadata-writer-548bd879bb-zjkcn                         2/2     Running   1          5m3sminio-5b65df66c9-k5gzg                                   2/2     Running   0          5m3sml-pipeline-8c4b99589-85jw6                              2/2     Running   1          5m3sml-pipeline-persistenceagent-d6bdc77bd-ssxrv             2/2     Running   0          5m3sml-pipeline-scheduledworkflow-5db54d75c5-zk2cw           2/2     Running   0          5m2sml-pipeline-ui-5bd8d6dc84-j7wqr                          2/2     Running   0          5m2sml-pipeline-viewer-crd-68fb5f4d58-mbcbg                  2/2     Running   1          5m2sml-pipeline-visualizationserver-8476b5c645-wljfm         2/2     Running   0          5m2smysql-f7b9b7dd4-xfnw4                                    2/2     Running   0          5m2sworkflow-controller-5cbbb49bd8-5zrwx                     2/2     Running   1          5m2s
```


- localhost 연결 거부 이슈
![localhost-reject](https://mlops-for-all.github.io/assets/images/localhost-reject-8d0b59ff30048e97d5721f786f25c857.png)

만약 다음과 같이 `localhost에서 연결을 거부했습니다` 라는 에러가 출력될 경우, 커맨드로 address 설정을 통해 접근하는 것이 가능합니다.

**보안상의 문제가 되지 않는다면,** 아래와 같이 `0.0.0.0` 로 모든 주소의 bind를 열어주는 방향으로 ml-pipeline UI가 정상적으로 접속되는지 확인합니다.

```
kubectl port-forward --address 0.0.0.0 svc/ml-pipeline-ui -n kubeflow 8888:80
```

- 위의 옵션으로 실행했음에도 여전히 연결 거부 이슈가 발생할 경우

방화벽 설정으로 접속해 모든 tcp 프로토콜의 포트에 대한 접속을 허가 또는 8888번 포트의 접속 허가를 추가해 접근 권한을 허가해줍니다.

웹 브라우저를 열어 `http://192.168.51.200:8888/#/pipelines/` 경로에 접속하면, ml-pipeline UI 화면이 출력되는 것을 확인할 수 있습니다.

다음과 같은 화면이 출력되는 것을 확인합니다.
![pipeline-ui](https://mlops-for-all.github.io/assets/images/pipeline-ui-796868a1ebeabfd6d1b6eb9b54c389aa.png)


하단에서 진행되는 다른 포트의 경로에 접속할 때도 위의 절차와 동일하게 커맨드를 실행하고, 방화벽에 포트 번호를 추가해주면 실행하는 것이 가능합니다.

#### delete kubeflow pipeline
```python
kustomize build apps/pipeline/upstream/env/cert-manager/platform-agnostic-multi-user | kubectl delete -n kubeflow -f -
```

### Katib[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#katib "Katib에 대한 직접 링크")

Katib 를 설치합니다.

```
kustomize build apps/katib/upstream/installs/katib-with-kubeflow | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
customresourcedefinition.apiextensions.k8s.io/experiments.kubeflow.org createdcustomresourcedefinition.apiextensions.k8s.io/suggestions.kubeflow.org createdcustomresourcedefinition.apiextensions.k8s.io/trials.kubeflow.org createdserviceaccount/katib-controller createdserviceaccount/katib-ui createdclusterrole.rbac.authorization.k8s.io/katib-controller createdclusterrole.rbac.authorization.k8s.io/katib-ui createdclusterrole.rbac.authorization.k8s.io/kubeflow-katib-admin createdclusterrole.rbac.authorization.k8s.io/kubeflow-katib-edit createdclusterrole.rbac.authorization.k8s.io/kubeflow-katib-view createdclusterrolebinding.rbac.authorization.k8s.io/katib-controller createdclusterrolebinding.rbac.authorization.k8s.io/katib-ui createdconfigmap/katib-config createdconfigmap/trial-templates createdsecret/katib-mysql-secrets createdservice/katib-controller createdservice/katib-db-manager createdservice/katib-mysql createdservice/katib-ui createdpersistentvolumeclaim/katib-mysql createddeployment.apps/katib-controller createddeployment.apps/katib-db-manager createddeployment.apps/katib-mysql createddeployment.apps/katib-ui createdcertificate.cert-manager.io/katib-webhook-cert createdissuer.cert-manager.io/katib-selfsigned-issuer createdvirtualservice.networking.istio.io/katib-ui createdmutatingwebhookconfiguration.admissionregistration.k8s.io/katib.kubeflow.org createdvalidatingwebhookconfiguration.admissionregistration.k8s.io/katib.kubeflow.org created
```

정상적으로 설치되었는지 확인합니다.

```
kubectl get po -n kubeflow | grep katib
```

다음과 같이 총 4 개의 pod 가 Running 이 될 때까지 기다립니다.

```
katib-controller-68c47fbf8b-b985z                        1/1     Running   0          82skatib-db-manager-6c948b6b76-2d9gr                        1/1     Running   0          82skatib-mysql-7894994f88-scs62                             1/1     Running   0          82skatib-ui-64bb96d5bf-d89kp                                1/1     Running   0          82s
```

추가로 katib UI가 정상적으로 접속되는지 확인합니다.

```
kubectl port-forward svc/katib-ui -n kubeflow --address 0.0.0.0 8081:80
```

웹 브라우저를 열어 [http://localhost:8081/katib/](http://localhost:8081/katib/) 경로에 접속합니다.

다음과 같은 화면이 출력되는 것을 확인합니다.

![katib-ui](https://mlops-for-all.github.io/assets/images/katib-ui-f10efe0ffd3bb57b1de7bdc2ff2aa880.png)

### Central Dashboard[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#central-dashboard "Central Dashboard에 대한 직접 링크")

Dashboard 를 설치합니다.

```
kustomize build apps/centraldashboard/upstream/overlays/istio | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
serviceaccount/centraldashboard createdrole.rbac.authorization.k8s.io/centraldashboard createdclusterrole.rbac.authorization.k8s.io/centraldashboard createdrolebinding.rbac.authorization.k8s.io/centraldashboard createdclusterrolebinding.rbac.authorization.k8s.io/centraldashboard createdconfigmap/centraldashboard-config createdconfigmap/centraldashboard-parameters createdservice/centraldashboard createddeployment.apps/centraldashboard createdvirtualservice.networking.istio.io/centraldashboard created
```

정상적으로 설치되었는지 확인합니다.

```
kubectl get po -n kubeflow | grep centraldashboard
```

kubeflow namespace 에 centraldashboard 관련 1 개의 pod 가 Running 이 될 때까지 기다립니다.

```
centraldashboard-8fc7d8cc-xl7ts                          1/1     Running   0          52s
```

추가로 Central Dashboard UI가 정상적으로 접속되는지 확인합니다.

```
kubectl port-forward --address 0.0.0.0 svc/centraldashboard -n kubeflow 8082:80
```

웹 브라우저를 열어 [http://localhost:8082/](http://localhost:8082/) 경로에 접속합니다.

다음과 같은 화면이 출력되는 것을 확인합니다.

![central-dashboard](https://mlops-for-all.github.io/assets/images/central-dashboard-ddf80e24ff9066a7e3fdbfd0d58b5721.png)

### Admission Webhook[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#admission-webhook "Admission Webhook에 대한 직접 링크")

```
kustomize build apps/admission-webhook/upstream/overlays/cert-manager | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
customresourcedefinition.apiextensions.k8s.io/poddefaults.kubeflow.org createdserviceaccount/admission-webhook-service-account createdclusterrole.rbac.authorization.k8s.io/admission-webhook-cluster-role createdclusterrole.rbac.authorization.k8s.io/admission-webhook-kubeflow-poddefaults-admin createdclusterrole.rbac.authorization.k8s.io/admission-webhook-kubeflow-poddefaults-edit createdclusterrole.rbac.authorization.k8s.io/admission-webhook-kubeflow-poddefaults-view createdclusterrolebinding.rbac.authorization.k8s.io/admission-webhook-cluster-role-binding createdservice/admission-webhook-service createddeployment.apps/admission-webhook-deployment createdcertificate.cert-manager.io/admission-webhook-cert createdissuer.cert-manager.io/admission-webhook-selfsigned-issuer createdmutatingwebhookconfiguration.admissionregistration.k8s.io/admission-webhook-mutating-webhook-configuration created
```

정상적으로 설치되었는지 확인합니다.

```
kubectl get po -n kubeflow | grep admission-webhook
```

1 개의 pod 가 Running 이 될 때까지 기다립니다.

```
admission-webhook-deployment-667bd68d94-2hhrx            1/1     Running   0          11s
```

### Notebooks & Jupyter Web App[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#notebooks--jupyter-web-app "Notebooks & Jupyter Web App에 대한 직접 링크")

1. Notebook controller 를 설치합니다.
    
    ```
    kustomize build apps/jupyter/notebook-controller/upstream/overlays/kubeflow | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    customresourcedefinition.apiextensions.k8s.io/notebooks.kubeflow.org createdserviceaccount/notebook-controller-service-account createdrole.rbac.authorization.k8s.io/notebook-controller-leader-election-role createdclusterrole.rbac.authorization.k8s.io/notebook-controller-kubeflow-notebooks-admin createdclusterrole.rbac.authorization.k8s.io/notebook-controller-kubeflow-notebooks-edit createdclusterrole.rbac.authorization.k8s.io/notebook-controller-kubeflow-notebooks-view createdclusterrole.rbac.authorization.k8s.io/notebook-controller-role createdrolebinding.rbac.authorization.k8s.io/notebook-controller-leader-election-rolebinding createdclusterrolebinding.rbac.authorization.k8s.io/notebook-controller-role-binding createdconfigmap/notebook-controller-config-m44cmb547t createdservice/notebook-controller-service createddeployment.apps/notebook-controller-deployment created
    ```
    
    정상적으로 설치되었는지 확인합니다.
    
    ```
    kubectl get po -n kubeflow | grep notebook-controller
    ```
    
    1 개의 pod 가 Running 이 될 때까지 기다립니다.
    
    ```
    notebook-controller-deployment-75b4f7b578-w4d4l          1/1     Running   0          105s
    ```
    
2. Jupyter Web App 을 설치합니다.
    
    ```
    kustomize build apps/jupyter/jupyter-web-app/upstream/overlays/istio | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    serviceaccount/jupyter-web-app-service-account createdrole.rbac.authorization.k8s.io/jupyter-web-app-jupyter-notebook-role createdclusterrole.rbac.authorization.k8s.io/jupyter-web-app-cluster-role createdclusterrole.rbac.authorization.k8s.io/jupyter-web-app-kubeflow-notebook-ui-admin createdclusterrole.rbac.authorization.k8s.io/jupyter-web-app-kubeflow-notebook-ui-edit createdclusterrole.rbac.authorization.k8s.io/jupyter-web-app-kubeflow-notebook-ui-view createdrolebinding.rbac.authorization.k8s.io/jupyter-web-app-jupyter-notebook-role-binding createdclusterrolebinding.rbac.authorization.k8s.io/jupyter-web-app-cluster-role-binding createdconfigmap/jupyter-web-app-config-76844k4cd7 createdconfigmap/jupyter-web-app-logos createdconfigmap/jupyter-web-app-parameters-chmg88cm48 createdservice/jupyter-web-app-service createddeployment.apps/jupyter-web-app-deployment createdvirtualservice.networking.istio.io/jupyter-web-app-jupyter-web-app created
    ```
    
    정상적으로 설치되었는지 확인합니다.
    
    ```
    kubectl get po -n kubeflow | grep jupyter-web-app
    ```
    
    1개의 pod 가 Running 이 될 때까지 기다립니다.
    
    ```
    jupyter-web-app-deployment-6f744fbc54-p27ts              1/1     Running   0          2m
    ```
    

### Profiles + KFAM[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#profiles--kfam "Profiles + KFAM에 대한 직접 링크")

Profile Controller를 설치합니다.

```
kustomize build apps/profiles/upstream/overlays/kubeflow | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
customresourcedefinition.apiextensions.k8s.io/profiles.kubeflow.org createdserviceaccount/profiles-controller-service-account createdrole.rbac.authorization.k8s.io/profiles-leader-election-role createdrolebinding.rbac.authorization.k8s.io/profiles-leader-election-rolebinding createdclusterrolebinding.rbac.authorization.k8s.io/profiles-cluster-role-binding createdconfigmap/namespace-labels-data-48h7kd55mc createdconfigmap/profiles-config-46c7tgh6fd createdservice/profiles-kfam createddeployment.apps/profiles-deployment createdvirtualservice.networking.istio.io/profiles-kfam created
```

정상적으로 설치되었는지 확인합니다.

```
kubectl get po -n kubeflow | grep profiles-deployment
```

1 개의 pod 가 Running 이 될 때까지 기다립니다.

```
profiles-deployment-89f7d88b-qsnrd                       2/2     Running   0          42s
```

### Volumes Web App[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#volumes-web-app "Volumes Web App에 대한 직접 링크")

Volumes Web App 을 설치합니다.

```
kustomize build apps/volumes-web-app/upstream/overlays/istio | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
serviceaccount/volumes-web-app-service-account createdclusterrole.rbac.authorization.k8s.io/volumes-web-app-cluster-role createdclusterrole.rbac.authorization.k8s.io/volumes-web-app-kubeflow-volume-ui-admin createdclusterrole.rbac.authorization.k8s.io/volumes-web-app-kubeflow-volume-ui-edit createdclusterrole.rbac.authorization.k8s.io/volumes-web-app-kubeflow-volume-ui-view createdclusterrolebinding.rbac.authorization.k8s.io/volumes-web-app-cluster-role-binding createdconfigmap/volumes-web-app-parameters-4gg8cm2gmk createdservice/volumes-web-app-service createddeployment.apps/volumes-web-app-deployment createdvirtualservice.networking.istio.io/volumes-web-app-volumes-web-app created
```

정상적으로 설치되었는지 확인합니다.

```
kubectl get po -n kubeflow | grep volumes-web-app
```

1개의 pod가 Running 이 될 때까지 기다립니다.

```
volumes-web-app-deployment-8589d664cc-62svl              1/1     Running   0          27s
```

### Tensorboard & Tensorboard Web App[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#tensorboard--tensorboard-web-app "Tensorboard & Tensorboard Web App에 대한 직접 링크")

1. Tensorboard Web App 를 설치합니다.
    
    ```
    kustomize build apps/tensorboard/tensorboards-web-app/upstream/overlays/istio | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    serviceaccount/tensorboards-web-app-service-account createdclusterrole.rbac.authorization.k8s.io/tensorboards-web-app-cluster-role createdclusterrole.rbac.authorization.k8s.io/tensorboards-web-app-kubeflow-tensorboard-ui-admin createdclusterrole.rbac.authorization.k8s.io/tensorboards-web-app-kubeflow-tensorboard-ui-edit createdclusterrole.rbac.authorization.k8s.io/tensorboards-web-app-kubeflow-tensorboard-ui-view createdclusterrolebinding.rbac.authorization.k8s.io/tensorboards-web-app-cluster-role-binding createdconfigmap/tensorboards-web-app-parameters-g28fbd6cch createdservice/tensorboards-web-app-service createddeployment.apps/tensorboards-web-app-deployment createdvirtualservice.networking.istio.io/tensorboards-web-app-tensorboards-web-app created
    ```
    
    정상적으로 설치되었는지 확인합니다.
    
    ```
    kubectl get po -n kubeflow | grep tensorboards-web-app
    ```
    
    1 개의 pod 가 Running 이 될 때까지 기다립니다.
    
    ```
    tensorboards-web-app-deployment-6ff79b7f44-qbzmw            1/1     Running             0          22s
    ```
    
2. Tensorboard Controller 를 설치합니다.
    
    ```
    kustomize build apps/tensorboard/tensorboard-controller/upstream/overlays/kubeflow | kubectl apply -f -
    ```
    
    정상적으로 수행되면 다음과 같이 출력됩니다.
    
    ```
    customresourcedefinition.apiextensions.k8s.io/tensorboards.tensorboard.kubeflow.org createdserviceaccount/tensorboard-controller createdrole.rbac.authorization.k8s.io/tensorboard-controller-leader-election-role createdclusterrole.rbac.authorization.k8s.io/tensorboard-controller-manager-role createdclusterrole.rbac.authorization.k8s.io/tensorboard-controller-proxy-role createdrolebinding.rbac.authorization.k8s.io/tensorboard-controller-leader-election-rolebinding createdclusterrolebinding.rbac.authorization.k8s.io/tensorboard-controller-manager-rolebinding createdclusterrolebinding.rbac.authorization.k8s.io/tensorboard-controller-proxy-rolebinding createdconfigmap/tensorboard-controller-config-bf88mm96c8 createdservice/tensorboard-controller-controller-manager-metrics-service createddeployment.apps/tensorboard-controller-controller-manager created
    ```
    
    정상적으로 설치되었는지 확인합니다.
    
    ```
    kubectl get po -n kubeflow | grep tensorboard-controller
    ```
    
    1 개의 pod 가 Running 이 될 때까지 기다립니다.
    
    ```
    tensorboard-controller-controller-manager-954b7c544-vjpzj   3/3     Running   1          73s
    ```
    

### Training Operator[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#training-operator "Training Operator에 대한 직접 링크")

Training Operator 를 설치합니다.

```
kustomize build apps/training-operator/upstream/overlays/kubeflow | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
customresourcedefinition.apiextensions.k8s.io/mxjobs.kubeflow.org createdcustomresourcedefinition.apiextensions.k8s.io/pytorchjobs.kubeflow.org createdcustomresourcedefinition.apiextensions.k8s.io/tfjobs.kubeflow.org createdcustomresourcedefinition.apiextensions.k8s.io/xgboostjobs.kubeflow.org createdserviceaccount/training-operator createdclusterrole.rbac.authorization.k8s.io/kubeflow-training-admin createdclusterrole.rbac.authorization.k8s.io/kubeflow-training-edit createdclusterrole.rbac.authorization.k8s.io/kubeflow-training-view createdclusterrole.rbac.authorization.k8s.io/training-operator createdclusterrolebinding.rbac.authorization.k8s.io/training-operator createdservice/training-operator createddeployment.apps/training-operator created
```

정상적으로 설치되었는지 확인합니다.

```
kubectl get po -n kubeflow | grep training-operator
```

1 개의 pod 가 Running 이 될 때까지 기다립니다.

```
training-operator-7d98f9dd88-6887f                          1/1     Running   0          28s
```

### User Namespace[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#user-namespace "User Namespace에 대한 직접 링크")

Kubeflow 사용을 위해, 사용할 User의 Kubeflow Profile 을 생성합니다.

```
kustomize build common/user-namespace/base | kubectl apply -f -
```

정상적으로 수행되면 다음과 같이 출력됩니다.

```
configmap/default-install-config-9h2h2b6hbk createdprofile.kubeflow.org/kubeflow-user-example-com created
```

kubeflow-user-example-com profile 이 생성된 것을 확인합니다.

```
kubectl get profile
```

```
kubeflow-user-example-com   37s
```

## 정상 설치 확인[​](https://mlops-for-all.github.io/docs/setup-components/install-components-kf#%EC%A0%95%EC%83%81-%EC%84%A4%EC%B9%98-%ED%99%95%EC%9D%B8 "정상 설치 확인에 대한 직접 링크")

Kubeflow central dashboard에 web browser로 접속하기 위해 포트 포워딩합니다.

```
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

Web Browser 를 열어 [http://localhost:8080](http://localhost:8080/) 으로 접속하여, 다음과 같은 화면이 출력되는 것을 확인합니다.

![login-ui](https://mlops-for-all.github.io/assets/images/login-after-install-a3e252f02dc4f4988686d6ae97ddd41f.png)

다음 접속 정보를 입력하여 접속합니다.

- Email Address: `user@example.com`
- Password: `12341234`

![central-dashboard](https://mlops-for-all.github.io/assets/images/after-login-4b41daca6d9a97824552770b832d59b0.png)


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
→ ml pipeline 에서 에러남. → mysql 경로에 파일 (정확히는 minio)이 존재해서그럼.

#### MySQL 데이터 제거

mysql-5f587f4849-sdt92      1/2     CrashLoopBackOff   16 (27s ago)     58m
```python
ls /mnt/k8s-pvc/kubeflow
datadir   minio

rm -rf *

## PVC 로컬 데이터 전부 지워주고 RS 삭제
kubectl delete rs -n kubeflow mysql-5f587f4849


## 이후 에러나는 POD 전부 삭제
metadata-grpc-deployment-5644fb9768-sxwd4   1/2     CrashLoopBackOff   16 (3m8s ago)    61m

## 이후 **무조건** minio pod 삭제 후 ml-pipeline pod 삭제
kubectl delete rs -n kubeflow minio-5f587f4849
kubectl delete rs -n kubeflow ml-pipeline-50345fhdv
```

##### mlflow-pipeline open toomany files
```python
sudo sysctl fs.inotify.max_user_instances=1280
sudo sysctl fs.inotify.max_user_watches=655360
```

##### Config DBConfig.ExtraParams not specified
아래는 정상 기동중인 ml-pipeline config
```python
root@ml-pipeline-5d8ff445fb-sr8k6:/config# cat config.json 
{
  "DBConfig": {
    "MySQLConfig": {
      "DataSourceName": "",
      "DBName": "mlpipeline",
      "GroupConcatMaxLen": "4194304"
    },
    "PostgreSQLConfig": {
      "DBName": "mlpipeline"
    },
    "ConMaxLifeTime": "120s"
  },
  "ObjectStoreConfig": {
    "AccessKey": "minio",
    "SecretAccessKey": "minio123",
    "BucketName": "mlpipeline",
    "PipelinePath": "pipelines"
  },
  "DBDriverName": "mysql",
  "ARCHIVE_CONFIG_LOG_FILE_NAME": "main.log",
  "ARCHIVE_CONFIG_LOG_PATH_PREFIX": "/artifacts",
  "InitConnectionTimeout": "6m",
  "DEFAULTPIPELINERUNNERSERVICEACCOUNT": "pipeline-runner",
  "CacheEnabled": "true",
  "CRON_SCHEDULE_TIMEZONE": "UTC",
  "CACHE_IMAGE": "gcr.io/google-containers/busybox",
  "CACHE_NODE_RESTRICTIONS": "false"
}
```

#### minio 생성
```python
mkdir minio
```






## Connect

### Port-foward
```python
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

### minio password
```python
    "AccessKey": "minio",
    "SecretAccessKey": "minio123",
    "BucketName": "mlpipeline",
    "PipelinePath": "pipelines"
```


### kubeflow password
dex로 로그인

```python
id: user@exmaple.com
pw:12341234
```
