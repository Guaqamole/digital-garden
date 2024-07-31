---
title: Kubeflow Sample Pipelines
date: 2024-07-05
draft: false
tags:
  - Kubeflow
complete: true
link: https://github.com/kubeflow/pipelines/tree/1.8.20/samples/core
---
## Prrallel
```python
import kfp.dsl as dsl
import kfp

@kfp.components.create_component_from_func
def start_op() -> str:
    print("Start Operation")
    return "Start Completed"

@kfp.components.create_component_from_func
def print_for_op(start: int, end: int) -> str:
    for i in range(start, end + 1):
        print(i)
    return f"Printed from {start} to {end}"

@kfp.components.create_component_from_func
def end_op() -> str:
    print("End Operation")
    return "End Completed"

@dsl.pipeline(name='my-pipeline')
def for_pipeline():
    start_task = start_op()
    print_task1 = print_for_op(0, 20).after(start_task)
    print_task2 = print_for_op(20, 40).after(start_task)
    print_task3 = print_for_op(40, 60).after(start_task)
    end_task = end_op().after(print_task1, print_task2, print_task3)

if __name__ == '__main__':
    client.create_run_from_pipeline_func(
        for_pipeline,
        arguments={},
        experiment_name="hello-world-parallel-experiment"
    )

```