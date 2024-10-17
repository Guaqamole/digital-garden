---
title: KFP node selector 사용하기
date: 2024-07-25
draft: false
tags: 
complete: true
---
## Overview

## Main
`kfp.dsl`  패키지에서 node selector를 추가 할 수 있는 기능을 제공한다.

> [!caution] 주의사항
> Cache 기능을 끄지 않으면 nodeselector가 할당되지 않는다.
> `.execution_options.caching_strategy.max_cache_staleness = "P0D"` 을 명시해주자.
> https://kubeflow-pipelines.readthedocs.io/en/1.8.16/source/kfp.components.structures.html?highlight=caching_strategy#kfp.components.structures.ExecutionOptionsSpec


### PipelineConf
- `func_to_container_op` 과 사용가능.
https://kubeflow-pipelines.readthedocs.io/en/1.8.16/source/kfp.dsl.html#kfp.dsl.PipelineConf
```python
from kfp import dsl, components
from kfp.dsl import PipelineConf

def hello_world_component():
    ret = f"Hello World!"
    print(ret)
    return ret


@dsl.pipeline(name="hello_pipeline", description="Hello World Pipeline!")
def hello_world_pipeline():
    hello_task = components.func_to_container_op(hello_world_component)
    _ = hello_task().execution_options.caching_strategy.max_cache_staleness = "P0D"


if __name__ == "__main__":
    pipeline_conf = PipelineConf() \
        .set_default_pod_node_selector('application', 'kubeflow') \
        .set_default_pod_node_selector('kubernetes.io/arch', 'amd64') 
    
    kfp.compiler.Compiler().compile(hello_world_bash_pipeline, "hello-world.yaml")
    client.create_run_from_pipeline_func(
        hello_world_pipeline, arguments={}, experiment_name="hello-world-experimen", pipeline_conf=pipeline_conf)
```


### add_affinity
https://kubeflow-pipelines.readthedocs.io/en/1.8.16/source/kfp.dsl.html#kfp.dsl.ContainerOp.add_affinity
```python
import kfp
from kfp import dsl
from kubernetes.client.models import V1Affinity, V1NodeAffinity, V1NodeSelector, V1NodeSelectorTerm, V1NodeSelectorRequirement

BASE_IMAGE = "library/bash:4.4.23"

def echo_op():
    return dsl.ContainerOp(
        name="echo",
        image=BASE_IMAGE,
        command=["sh", "-c"],
        arguments=['echo "hello world"'],
    )


@dsl.pipeline(name="hello_world_bash_pipeline", description="A hello world pipeline.")
def hello_world_bash_pipeline():
    
    affinity = V1Affinity(
        node_affinity=V1NodeAffinity(
            required_during_scheduling_ignored_during_execution=V1NodeSelector(
                node_selector_terms=[
                    V1NodeSelectorTerm(
                        match_expressions=[
                            V1NodeSelectorRequirement(
                                key='application',
                                operator='In',
                                values=['kubeflow']
                            ),
                            V1NodeSelectorRequirement(
                                key='kubernetes.io/arch',
                                operator='NotIn',
                                values=['arm64']
                            )
                        ]
                    )
                ]
            )
        )
    )
    
    echo_task = echo_op() \
        .add_affinity(affinity) \
        .execution_options.caching_strategy.max_cache_staleness = "P0D"


if __name__ == "__main__":
    kfp.compiler.Compiler().compile(hello_world_bash_pipeline, "hello-world-bash.yaml")
    client.create_run_from_pipeline_func(
        hello_world_bash_pipeline,
        arguments={},
        experiment_name="hello-world-bash-experiment",
    )
```


### add_node_selector_contraint
https://kubeflow-pipelines.readthedocs.io/en/1.8.16/source/kfp.dsl.html#kfp.dsl.BaseOp.add_node_selector_constraint
```python
import kfp
from kfp import dsl

BASE_IMAGE = "library/bash:4.4.23"

def echo_op():
    return dsl.ContainerOp(
        name="echo",
        image=BASE_IMAGE,
        command=["sh", "-c"],
        arguments=['echo "hello world"'],
    ).set_caching_options(False)


@dsl.pipeline(name="hello_world_bash_pipeline", description="A hello world pipeline.")
def hello_world_bash_pipeline():
    echo_task = echo_op().add_node_selector_constraint('application', 'kubeflow').execution_options.caching_strategy.max_cache_staleness = "P0D"


if __name__ == "__main__":
    kfp.compiler.Compiler().compile(hello_world_bash_pipeline, "hello-world-bash.yaml")
    client.create_run_from_pipeline_func(
        hello_world_bash_pipeline,
        arguments={},
        experiment_name="hello-world-bash-experiment"
    )
```

## Toleration
```python
import kfp
from kfp import dsl
from kubernetes.client.models import V1Toleration

def echo_op():
    return dsl.ContainerOp(
        name="echo",
        image=BASE_IMAGE,
        command=["sh", "-c"],
        arguments=['echo "hello world"'],
    )

@dsl.pipeline(
    name='Toleration Pipeline',
    description='An example pipeline that demonstrates how to add tolerations.'
)
def toleration_pipeline():
    # Define the tolerations
    toleration = \
        V1Toleration( \
            key='application', \
            operator='Equal', \
            value='kubeflow', \
            effect='NoSchedule')
        
    sample_task = echo_op() \
        .add_toleration(toleration) \
        .execution_options.caching_strategy.max_cache_staleness = "P0D"
    
if __name__ == "__main__":
    client.create_run_from_pipeline_func(
        toleration_pipeline, arguments={}, experiment_name="toleration-experiment")
```