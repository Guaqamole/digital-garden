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



### mlpipeline run 10초뒤 fail.
https://github.com/kubeflow/pipelines/issues/9678#issuecomment-2071361425

failed 한 pipeline pod logs 해보면 다음과 같은 에러뜸.
```python
argo=true error="open /tmp/outputs/iteration-count: no such file or directory
```

cache server 이슈로 cache pod 지웠다가 다시 올리면됨.

```python
kubectl delete po -n kubeflow cache-server-5b6f65b559-vqqvb
```