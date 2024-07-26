---
title: EKS GPU 사용하기
date: 2024-07-25
draft: false
tags:
  - Kubernetes
  - eks
complete: true
---
## Overview
karpenter가 구성되어있다는 가정하에 아래 yaml로 test 가능하다.
```python
apiVersion: v1
kind: Pod
metadata:
  name: gpu-pod
  namespace: kubeflow-user-example-com
spec:
  restartPolicy: Never
  containers:
   - name: cuda-container
     image: nvcr.io/nvidia/k8s/cuda-sample:vectoradd-cuda10.2
     resources:
       limits:
         nvidia.com/gpu: 1 # requesting 1 GPU
  tolerations:
  - key: "nvidia.com/gpu"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
  nodeSelector:
    application: kubeflow
    kubernetes.io/arch: amd64
    karpenter.sh/capacity-type: on-demand
```


## Error
```python
│   Warning  Failed               7s     kubelet            Failed to pull image "/kubeflow:jupyter-pytorch-2.0.0-gpu-py310-cu118-ubuntu20.04-ec2-v1.0": failed to pull and unp
│ ack image "kubeflow:jupyter-pytorch-2.0.0-gpu-py310-cu118-ubuntu20.04-ec2-v1.0": failed to extract layer sha256:b37d6ff05a012541f46993867604f7c67158af68f4e47f190b3904a00985
│ 4afe: symlink libssh.so.4.8.4 /var/lib/containerd/io.containerd.snapshotter.v1.overlayfs/snapshots/75/fs/usr/lib/x86_64-linux-gnu/libssh.so.4: no space left on device: unknown
```