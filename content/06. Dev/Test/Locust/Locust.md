---
title: Locust
date: 2024-06-09
draft: false
tags:
  - Locust
complete: true
---
locustfile.py
```python
import os
from locust import HttpUser, TaskSet, task, between
import random

# Load dag_id values from a file
def load_dag_ids(filename):
    with open(filename, 'r') as file:
        return [line.strip() for line in file.readlines()]

# Specify the path to your dag_ids file
dag_ids_file = "dag_ids.txt"
dag_ids = load_dag_ids(dag_ids_file)

class UserBehavior(TaskSet):
    @task
    def get_dag_info(self):
        # Select a random dag_id from the list
        dag_id = random.choice(dag_ids)
        self.client.get(f"/{dag_id}")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 2)

    # Override the setup method to load dag_ids only once per user instance
    def setup(self):
        global dag_ids
        if not dag_ids:
            dag_ids = load_dag_ids(dag_ids_file)
```

dag_ids.txt
```
test
amadeusflight
blog_wordcloud
naverblog_hdp
naverflight_after2day
naverflight_before3day
naverflight_targetday
test_flight_json_namkyu_new
weather
```


headless run
```bash
nohup locust -f locustfile.py --host=http://api.marketboro-dc.local -u 2 -r 1 --run-time 24h --csv endurance_test --html endurance_test --headless > locust.log 2>&1 &
```

headless run no log
```python
nohup locust -f locustfile.py --host=http://api.marketboro-dc.local -u 2 -r 1 --run-time 24h --csv endurance_test --html endurance_test --headless > /dev/null 2>&1 &
```