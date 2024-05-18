---
title: M1 Mac에 minikube 설치하기
date: 2024-05-17
draft: false
tags:
  - Kubernetes
complete: true
---
## Install
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64

sudo install minikube-darwin-arm64 /usr/local/bin/minikube
```

## Start
```bash
minikube start --driver=docker --alsologtostderr --disk-size 64g --memory 4096 --cpus 4 --profile kubeflow
```

## Stop
```bash
minikube stop --all
```