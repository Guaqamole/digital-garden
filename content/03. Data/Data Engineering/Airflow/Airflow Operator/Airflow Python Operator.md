---
title: Airflow Python Operator
date: 2023-11-08
draft: false
tags:
  - Airflow
  - Python
complete: true
link: https://airflow.apache.org/docs/apache-airflow/stable/howto/operator/python.html
---
Use the `@task` decorator to execute Python callables.

> [!Warning]
> 
> The `@task` decorator is recommended over the classic [`PythonOperator`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/operators/python/index.html#airflow.operators.python.PythonOperator "airflow.operators.python.PythonOperator") to execute Python callables.

```python
@task(task_id="print_the_context")
def print_context(ds=None, **kwargs):
    """Print the Airflow context and ds variable from the context."""
    pprint(kwargs)
    print(ds)
    return "Whatever you return gets printed in the logs"

run_this = print_context()
```

## Passing in arguments

Pass extra arguments to the `@task` decorated function as you would with a normal Python function.

```python
# Generate 5 sleeping tasks, sleeping from 0.0 to 0.4 seconds respectively
for i in range(5):

@task(task_id=f"sleep_for_{i}")
def my_sleeping_function(random_base):
	"""This is a function that will run within the DAG execution"""
	time.sleep(random_base)

sleeping_task = my_sleeping_function(random_base=i / 10)

run_this >> log_the_sql >> sleeping_task
```

## Templating

Airflow passes in an additional set of keyword arguments: one for each of the [Jinja template variables](https://airflow.apache.org/docs/apache-airflow/stable/templates-ref.html#templates-variables) and a `templates_dict` argument.

The `templates_dict` argument is templated, so each value in the dictionary is evaluated as a [Jinja template](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/operators.html#concepts-jinja-templating).

```python
@task(task_id="log_sql_query", templates_dict={"query": "sql/sample.sql"}, templates_exts=[".sql"])
def log_sql(**kwargs):
    logging.info("Python task decorator query: %s", str(kwargs["templates_dict"]["query"]))

log_the_sql = log_sql()
```


----

# PythonVirtualenvOperator

Use the `@task.virtualenv` decorator to execute Python callables inside a new Python virtual environment. The `virtualenv` package needs to be installed in the environment that runs Airflow (as optional dependency `pip install apache-airflow[virtualenv] --constraint ...`).

> [!Warning]
> 
> The `@task.virtualenv` decorator is recommended over the classic [`PythonVirtualenvOperator`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/operators/python/index.html#airflow.operators.python.PythonVirtualenvOperator "airflow.operators.python.PythonVirtualenvOperator") to execute Python callables inside new Python virtual environments.


```python
@task.virtualenv(
	task_id="virtualenv_python", requirements=["colorama==0.4.0"], system_site_packages=False
)
def callable_virtualenv():
	"""
	Example function that will be performed in a virtual environment.

	Importing at the module level ensures that it will not attempt to import the
	library before it is installed.
	"""
	from time import sleep

	from colorama import Back, Fore, Style

	print(Fore.RED + "some red text")
	print(Back.GREEN + "and with a green background")
	print(Style.DIM + "and in dim text")
	print(Style.RESET_ALL)
	for _ in range(4):
		print(Style.DIM + "Please wait...", flush=True)
		sleep(1)
	print("Finished")

virtualenv_task = callable_virtualenv()
```


```python
    virtual_classic = PythonVirtualenvOperator(
        task_id="virtualenv_classic",
        requirements="colorama==0.4.0",
        python_callable=x,
    )
```


## Passing in arguments

Pass extra arguments to the `@task.virtualenv` decorated function as you would with a normal Python function. Unfortunately, Airflow does not support serializing `var`, `ti` and `task_instance` due to incompatibilities with the underlying library. For Airflow context variables make sure that you either have access to Airflow through setting `system_site_packages` to `True` or add `apache-airflow` to the `requirements` argument. Otherwise you won’t have access to the most context variables of Airflow in `op_kwargs`. If you want the context related to datetime objects like `data_interval_start` you can add `pendulum` and `lazy_object_proxy`.

If additional parameters for package installation are needed pass them in `requirements.txt` as in the example below:

```
SomePackage==0.2.1 --pre --index-url http://some.archives.com/archives
AnotherPackage==1.4.3 --no-index --find-links /my/local/archives
```

All supported options are listed in the [requirements file format](https://pip.pypa.io/en/stable/reference/requirements-file-format/#supported-options).


---

# ExternalPythonOperator

The `ExternalPythonOperator` can help you to run some of your tasks with a different set of Python libraries than other tasks (and than the main Airflow environment). This might be a virtual environment or any installation of Python that is preinstalled and available in the environment where Airflow task is running. The operator takes Python binary as `python` parameter. Note, that even in case of virtual environment, the `python` path should point to the python binary inside the virtual environment (usually in `bin` subdirectory of the virtual environment). Contrary to regular use of virtual environment, there is no need for `activation` of the environment. Merely using `python` binary automatically activates it. In both examples below `PATH_TO_PYTHON_BINARY` is such a path, pointing to the executable Python binary.

Use the [`ExternalPythonOperator`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/operators/python/index.html#airflow.operators.python.ExternalPythonOperator "airflow.operators.python.ExternalPythonOperator") to execute Python callables inside a pre-defined environment. The virtualenv should be preinstalled in the environment where Python is run. In case `dill` is used, it has to be preinstalled in the environment (the same version that is installed in main Airflow environment).

TaskFlow example of using the operator:

```python
    @task.external_python(task_id="external_python",python=PATH_TO_PYTHON_BINARY)
    def callable_external_python():
        """
        Example function that will be performed in a virtual environment.

        Importing at the module level ensures that it will not attempt to import the
        library before it is installed.
        """
        import sys
        from time import sleep

        print(f"Running task via {sys.executable}")
        print("Sleeping")
        for _ in range(4):
            print("Please wait...", flush=True)
            sleep(1)
        print("Finished")

    external_python_task = callable_external_python()
```

Classic example of using the operator:

```python
    external_classic = ExternalPythonOperator(
        task_id="external_python_classic",
        python=PATH_TO_PYTHON_BINARY,
        python_callable=x,
    )
```


## Passing in arguments

Pass extra arguments to the `@task.external_python` decorated function as you would with a normal Python function. Unfortunately Airflow does not support serializing `var` and `ti` / `task_instance` due to incompatibilities with the underlying library. For Airflow context variables make sure that Airflow is also installed as part of the virtualenv environment in the same version as the Airflow version the task is run on. Otherwise you won’t have access to the most context variables of Airflow in `op_kwargs`. If you want the context related to datetime objects like `data_interval_start` you can add `pendulum` and `lazy_object_proxy` to your virtualenv.

---

# ShortCircuitOperator

Use the `@task.short_circuit` decorator to control whether a pipeline continues if a condition is satisfied or a truthy value is obtained.

> [!Warning]
> 
> The `@task.short_circuit` decorator is recommended over the classic [`ShortCircuitOperator`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/operators/python/index.html#airflow.operators.python.ShortCircuitOperator "airflow.operators.python.ShortCircuitOperator") to short-circuit pipelines via Python callables.

The evaluation of this condition and truthy value is done via the output of the decorated function. If the decorated function returns True or a truthy value, the pipeline is allowed to continue and an [XCom](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html#concepts-xcom) of the output will be pushed. If the output is False or a falsy value, the pipeline will be short-circuited based on the configured short-circuiting (more on this later). In the example below, the tasks that follow the “condition_is_true” task will execute while the tasks downstream of the “condition_is_false” task will be skipped.

```python
@task.short_circuit()
def check_condition(condition):
    return condition

ds_true = [EmptyOperator(task_id=f"true_{i}") for i in [1, 2]]
ds_false = [EmptyOperator(task_id=f"false_{i}") for i in [1, 2]]

condition_is_true = check_condition.override(task_id="condition_is_true")(condition=True)
condition_is_false = check_condition.override(task_id="condition_is_false")(condition=False)

chain(condition_is_true, *ds_true)
chain(condition_is_false, *ds_false)
```

The “short-circuiting” can be configured to either respect or ignore the [trigger rule](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html#concepts-trigger-rules) defined for downstream tasks. If `ignore_downstream_trigger_rules` is set to True, the default configuration, all downstream tasks are skipped without considering the `trigger_rule` defined for tasks. If this parameter is set to False, the direct downstream tasks are skipped but the specified `trigger_rule` for other subsequent downstream tasks are respected. In this short-circuiting configuration, the operator assumes the direct downstream task(s) were purposely meant to be skipped but perhaps not other subsequent tasks. This configuration is especially useful if only _part_ of a pipeline should be short-circuited rather than all tasks which follow the short-circuiting task.

In the example below, notice that the “short_circuit” task is configured to respect downstream trigger rules. This means while the tasks that follow the “short_circuit” task will be skipped since the decorated function returns False, “task_7” will still execute as its set to execute when upstream tasks have completed running regardless of status (i.e. the `TriggerRule.ALL_DONE` trigger rule).

```python
[task_1, task_2, task_3, task_4, task_5, task_6] = [
    EmptyOperator(task_id=f"task_{i}") for i in range(1, 7)
]

task_7 = EmptyOperator(task_id="task_7", trigger_rule=TriggerRule.ALL_DONE)

short_circuit = check_condition.override(task_id="short_circuit", ignore_downstream_trigger_rules=False)(
    condition=False
)

chain(task_1, [task_2, short_circuit], [task_3, task_4], [task_5, task_6], task_7)
```


## Passing in arguments

Pass extra arguments to the `@task.short_circuit`-decorated function as you would with a normal Python function.

## Templating

Jinja templating can be used in same way as described for the PythonOperator.

----

# PythonSensor

Sensors can be used in two ways. One is to use the [`PythonSensor`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/sensors/python/index.html#airflow.sensors.python.PythonSensor "airflow.sensors.python.PythonSensor") to use arbitrary callable for sensing. The callable should return True when it succeeds, False otherwise. The other uses the Taskflow API utilizing the `sensor` as a decorator on a function.

```python
t8 = PythonSensor(task_id="success_sensor_python", python_callable=success_callable)

t9 = PythonSensor(
    task_id="failure_timeout_sensor_python", timeout=3, soft_fail=True, python_callable=failure_callable
)
```


```python
# Using a sensor operator to wait for the upstream data to be ready.
@task.sensor(poke_interval=60, timeout=3600, mode="reschedule")
def wait_for_upstream() -> PokeReturnValue:
    return PokeReturnValue(is_done=True, xcom_value="xcom_value")
```
