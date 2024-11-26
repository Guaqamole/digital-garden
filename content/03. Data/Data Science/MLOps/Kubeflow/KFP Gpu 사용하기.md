---
title: KFP Gpu 사용하기
date: 2024-07-25
draft: false
tags:
  - Kubeflow
complete: true
---
```python
import kfp
from kfp import dsl

def gpu_smoking_check_op():
    return dsl.ContainerOp(
        name='check',
        image='tensorflow/tensorflow:latest-gpu',
        command=['sh', '-c'],
        arguments=['nvidia-smi']
    ).set_gpu_limit(1)

@dsl.pipeline(
    name='GPU smoke check',
    description='smoke check as to whether GPU env is ready.'
)
def gpu_pipeline():
    toleration = \
        V1Toleration( \
            key='nvidia.com/gpu', \
            operator='Equal', \
            value='true', \
            effect='NoSchedule')
    
    gpu_smoking_check = gpu_smoking_check_op().add_toleration(toleration).execution_options.caching_strategy.max_cache_staleness = "P0D"

if __name__ == "__main__":
    pipeline_conf = PipelineConf() \
        .set_default_pod_node_selector('application', 'kubeflow') \
        .set_default_pod_node_selector('kubernetes.io/arch', 'amd64') 
    
    client.create_run_from_pipeline_func(
        gpu_pipeline, arguments={}, experiment_name="gpu-experiment", pipeline_conf=pipeline_conf)
```