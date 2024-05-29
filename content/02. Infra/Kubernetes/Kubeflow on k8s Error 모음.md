---
title: Kubeflow on k8s Error 모음
date: 2024-05-29
draft: false
tags: 
complete: true
---
### RBAC: access denied
kubeflow pipeline-ui 접속시 access denied 뜸
![|550](https://i.imgur.com/eT8Xub4.png)
→ pipeline-ui로 바로 접속하지 말고 istio loadbalancer ip 로 kubeflow ui 로 접속.

