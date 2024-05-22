---
title: MLFlow 설치
date: 2024-05-21
draft: false
tags:
  - Kubernetes
  - MLFlow
  - MLOps
complete: true
---
```bash
kubectl create ns mlflow-system

kubectl -n mlflow-system apply -f https://raw.githubusercontent.com/mlops-for-all/helm-charts/main/mlflow/manifests/postgres.yaml


kubectl port-forward pod/minio 9000 9090 -n mlflow-system
id: minioadmin
pw: minioadmin

helm install mlflow -n mlflow oci://registry-1.docker.io/bitnamicharts/mlflow \
--set tracking.service.type=NodePort


kubectl create -n mlflow-system secret generic mlflow-secret \
    --from-literal=AWS_ACCESS_KEY_ID=minioadmin \
    --from-literal=AWS_SECRET_ACCESS_KEY='minioadmin'

helm repo add bitnami https://charts.bitnami.com/bitnami
helm upgrade --install mlflow bitnami/mlflow -n mlflow-system \
--set minio.enabled=false \
--set externalS3.host=localhost \
--set externalS3.port=9000 \
--set externalS3.existingSecret=mlflow-secret \
--set externalS3.existingSecretAccessKeyIDKey="AWS_ACCESS_KEY_ID" \
--set externalS3.existingSecretKeySecretKey="AWS_SECRET_ACCESS_KEY" \
--set externalS3.bucket="mlflow" \
--set externalS3.protocol=http


--set externalS3.host=localhost \
--set externalS3.port=9090 \
--set externalS3.accessKeyID=minioadmin \
--set externalS3.accessKeySecret=minioadmin \
--set externalS3.protocol=http \

helm delete mlflow
```