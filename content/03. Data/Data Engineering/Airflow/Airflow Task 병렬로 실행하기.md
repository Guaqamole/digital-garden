---
title: Airflow Task 병렬로 실행하기
date: 2023-11-08
draft: false
tags:
  - Airflow
  - HowTo
complete: true
---
Task를 병렬적(Parallel)으로 실행하기 위해서는 다음을 먼저 준비해야 합니다.

1. Meta Database를 SQLite(default)가 아닌 Meta Database(MySQL, Postgres 등)로 바꿔주기
2. Executor를 Sequential Executor(default)가 Executor(Local Executor 등)으로 바꿔주기

별도의 작업을 하지 않으면 Airflow는 기본적으로 Database는 SQLite를 사용하고 Executor는 Sequential Executor를 사용합니다. 그러나 이 값들은 실제 운영(Production) 환경에 올리기 적합하지 않으며, 공식 문서에도 실제 운영 환경에 Airflow를 배포할 때는 이 기본 값들을 바꿔서 쓰라고 말하고 있습니다.

---

# 방법 1. 의존성 표기법 사용

![|1025](https://i.imgur.com/U8kc5am.png)

```python
from datetime import datetime, timedelta
from time import sleep

from airflow import DAG
from airflow.operators.python import PythonOperator
from pendulum.tz.timezone import Timezone

with DAG(
    dag_id="02_parallel_tasks",
    description="병렬적인 Task 의존성을 가지는 DAG 예제입니다.",
    default_args={
        "owner": "heumsi",
        "retries": 1,
        "retry_delay": timedelta(minutes=1),
    },
    start_date=datetime(2022, 1, 20, tzinfo=Timezone("Asia/Seoul")),
    schedule_interval="@once",
    tags=["examples", "01_writing_various_task_flows"],
) as dag:

    def dump() -> None:
        sleep(3)

    task_1 = PythonOperator(task_id="task_1", python_callable=dump)
    task_2 = PythonOperator(task_id="task_2", python_callable=dump)
    task_3 = PythonOperator(task_id="task_3", python_callable=dump)
    task_4 = PythonOperator(task_id="task_4", python_callable=dump)
    task_5 = PythonOperator(task_id="task_5", python_callable=dump)

    task_1 >> task_2 >> task_5
    task_3 >> task_4 >> task_5
```

---

# 방법 2. 동적 할당으로 List 사용

![|556](https://i.imgur.com/cKOLP7b.png)

```python
from __future__ import annotations

import os
from datetime import datetime

from airflow.models import DAG
from airflow.operators.bash import BashOperator

DAG_ID = "demo_dag_parallel"

with DAG(
    dag_id=DAG_ID,
    schedule=None,
    start_date=datetime(2021, 1, 1),
    catchup=False,
    tags=["example"],
) as dag:
    
    start = BashOperator(
        task_id='start', 
        bash_command="sudo -u root bash -c \
            'rm -rf /tmp/parallel.txt && \
            sleep 1 && \
            echo -e Task Start >> /tmp/parallel.txt && \
            chmod 777 /tmp/parallel.txt'"
    )
    
    tasks = [
            BashOperator(
                task_id=f"task_{i}", 
                bash_command=f"echo 'task {i} executed.' >> /tmp/parallel.txt"
            ) for i in range(4)
        ]
        
    end = BashOperator(
        task_id="end", 
        bash_command="echo '\nTask End.\n' >> /tmp/parallel.txt"
    )
    
    start >> tasks >> end
```