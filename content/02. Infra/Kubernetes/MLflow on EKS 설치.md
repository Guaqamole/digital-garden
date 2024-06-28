---
title: MLflow on EKS 설치
date: 2024-06-04
draft: false
tags:
  - MLFlow
complete: true
link: https://github.com/burakince/mlflow
---
## PreRequisite
### helm chart
```python
helm pull community-charts/mlflow --untar
```


## Install
1. db 접속후 database 생성
2. s3 접속후 bucket 생성
values.yaml
```python
backendStore:
  mysql:
    enabled: true
    host: "somewhere.ap-northeast-2.rds.amazonaws.com"
    port: 3306 # required
    database: "mlflow" # required
    user: "namkyu" # required
    password: "38947238ohgga" # required
    driver: "pymysql"
  s3:
    enabled: true
    bucket: "mlflow-bucket" # required
    path: "mlflow" # optional
    awsAccessKeyId: "JFHJFHDKJF098458953" 
    awsSecretAccessKey: "sdfkjhdHFUHFK98023424"
# 아래는 필요시 작성
ingress:
  enabled: false
  className: ""
  annotations: {}
      alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-northeast-2:254543545345:certificate/flksjdfsdf-442jhsf-24ujhsfsdf
      alb.ingress.kubernetes.io/group.name: internet
      alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}, {"HTTP":80}]'
      alb.ingress.kubernetes.io/load-balancer-name: k8s-public
      alb.ingress.kubernetes.io/scheme: internet-facing
      alb.ingress.kubernetes.io/success-codes: 200-399
      alb.ingress.kubernetes.io/target-type: ip
      alb.ingress.kubernetes.io/healthcheck-port: "5000"
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local
```

### ingress
ingress.yaml
```python
apiVersion: v1
items:
- apiVersion: networking.k8s.io/v1
  kind: Ingress
  metadata:
    annotations:
      alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-northeast-2:343423434:certificate/a507e729-asds-asd2-dsjkf3-124234234
      alb.ingress.kubernetes.io/group.name: internet
      alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}, {"HTTP":80}]'
      alb.ingress.kubernetes.io/load-balancer-name: k8s-public
      alb.ingress.kubernetes.io/scheme: internet-facing
      alb.ingress.kubernetes.io/success-codes: 200-399
      alb.ingress.kubernetes.io/target-type: ip
      alb.ingress.kubernetes.io/healthcheck-port: "5000"
    finalizers:
    - group.ingress.k8s.aws/internet
    generation: 1
    labels:
      app: mlflow
      app.kubernetes.io/instance: mlflow
      app.kubernetes.io/managed-by: Helm
      app.kubernetes.io/name: mlflow
      app.kubernetes.io/version: 2.1.1
      helm.sh/chart: mlflow-0.7.19
      version: 2.1.1
    name: mlflow-ingress
    namespace: kubeflow
  spec:
    ingressClassName: alb
    rules:
    - host: mlflow.qa.myserver.co.kr
      http:
        paths:
        - backend:
            service:
              name: mlflow
              port:
                number: 5000
          path: /*
          pathType: ImplementationSpecific
kind: List
metadata:
  resourceVersion: ""
```

### ingress 통해 접속시 RBAC:access denied
rbac.yaml
```python
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
 name: allow-all
 namespace: kubeflow
spec:
 rules:
 - {}
```

### install
```python
helm install -n kubeflow mlflow mlflow
kubectl apply -f mlflow-ingress.yaml rbac.yaml
```

id:
pw: