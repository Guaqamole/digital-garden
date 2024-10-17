---
title: Kubeflow EKS 최적화
date: 2024-07-03
draft: false
tags:
  - Kubeflow
  - eks
complete: true
---
## Target
- Request, Limit 맞추기
- On-demand, spot 분리하기
- private-image 사용하도록 분리

## private-image push
### cert-manager
- quay.io/jetstack/cert-manager-controller:v1.10.1
- quay.io/jetstack/cert-manager-cainjector:v1.10.1
- quay.io/jetstack/cert-manager-webhook:v1.10.1