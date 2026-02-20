---
title: Python Locust
date: 2024-05-27
draft: false
tags:
  - Testing
  - LoadTest
complete: true
---
## Overview
`Locust`는 높은 성능을 보장하기 위해 `Gevent`를 사용한다. `Gevent`는 `libdev`기반의 비동기 라이브러리와`greenlet`이라는 경량 스레드를 활용하고 있는 라이브러리다. `Gevent`를 사용하면 코루틴을 스케줄링하고 event-loop 위에서 로직들을 실행 할 수 있다. Gevent가 무엇인지에 대해서는 참고자료에 적혀있는 문서를 참고하는 것을 추천하고, 요약하자면 `Locust`는 부하테스트를 위해 비동기 라이브러리를 활용해 HTTP 요청을 보낸다고 생각하면 되겠다.
### 기본적인 proejct 구조
locust 테스트를 위한 프로젝트 구조는 아래와 같이 짜는 것을 추천한다.
- Project root
	- `common/`
		- `auth.py`
	-  `configs/`
		- `base.py`
		- `dev.py`
		- `prod.py`
	- `config.py`
	- `locustfile.py`
	- `requirements.txt` (External Python dependencies is often kept in a requirements.txt)

```python
import common.auth
```

common에 정의한 모듈을 사용할 경우 아래와 같이 import해서 사용하도록 하면 된다

### install
```python
pip -r install requirements.txt
>> locust==2.17.0
```


## Concepts
### User Class
locust에서 User class는 한 명의 user를 의미한다. Locust가 지정한 유저 수만큼 User class의 인스턴스를 생성하고, 각 인스턴스가 요청을 보내게 된다. User class는 아래와 같은 attribute을 가진다. attrubute는 클래스 변수로 적어주면 된다.

`wait_time` attribute
- **`constant`** for a fixed amount of time
- **`between`** for a random time between a min and max value

`weight` or `fixed_count`
- 특정 User class가 더 많은 작업을 하게 하고 싶거나, 요청 횟수를 지정해주고 싶으면 위 속성 활용

```python
class WebUser(User):
    weight = 3
    ...

class MobileUser(User):
    weight = 1
    ...
```

### on_start , on_stop
각 User class에는 `on_start`와 `on_stop` method를 통해 User class의 인스턴스가 생성돼서 task를 실행하기 시작할 때와 끝나고 나서 해야 할 작업들을 정해둘 수 있다.

참고로 locust 테스트를 작성하다보면, User Class가 로딩될때 실행되는 코드와, Master node에서만 실행되는 코드, 테스트 실행때만 실행되는 코드 등 여러 초기화 메소드들이 있기 때문에 사용에 주의해야 한다.


### tasks
task는 분산테스트의 업무를 의미한다. 분산 테스트 시작시, 개발자가 지정한 수만큼 User를 생성하면 그 만큼의 green thread(user-level 스레드)가 생성되고, 그 수만큼 User class의 인스턴스가 정의된 tasks를 실행한다.

task를 정의하는 방법은 크게 두 가지가 있다.

(1) decorator사용
- decorator의 argument는 task의 execution ratio를 넣고싶을 때 사용한다.

```python
from locust import User, task, between

class MyUser(User):
    wait_time = between(5, 15)

    @task(3)
    def task1(self):
        pass

    @task(6)
    def task2(self):
        pass
```

(2) 함수 정의 후 `tasks` attribute에 해당 함수들 입력
```python
from locust import User, constant

def my_task(user):
    pass

class MyUser(User):
    tasks = [my_task]
    wait_time = constant(1)
```


### Sequential Task
task에 순서를 부여하고 싶은 경우는 아래처럼 sequential task set을 정의할 수 있다.
```python
from locust import HttpUser, SequentialTaskSet, task, between

class User(HttpUser):    
    @task
    class SequenceOfTasks(SequentialTaskSet):
        wait_time = between(1, 5)
        @task
        def mainPage(self):
            self.client.get("/")
        @task
        def login(self):
            self.client.options("https://richet.com/login")
            self.client.post("url",json={"username":"haha"})        
        @task
        def clickProduct(self):
            self.client.options("https://richet.com/product")
            self.client.post("url",json={"username":"haha"})        
        @task
        def addToCart(self):
            self.client.options("https://richet.com/cart")
            self.client.post("url",json={"username":"haha"})        
        @task 
        def viewCart(self):
            self.client.options("https://richet.com/cart")
            self.client.post("url",json={"username":"haha"})
```

### Events
테스트의 특정 시점에 setup code가 필요한 경우, 예를 들어 테스트의 시작과 끝에 어떤 setup code를 작성해야 한다면 아래와 같은 이벤트를 정의할 수 있다

****test_start and test_stop****
- 위는 load test를 시작하고 끝낼 때 실행되는 코드
- 분산환경에서 실행된다면 master node에서만 실행된다.

```python
from locust import events

@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    print("A new test is starting")

@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    print("A new test is ending")
```

**init**
- 만약 master node뿐 아니라 locust process가 실행될 때마다 초기화해야 하는 코드가 필요하다면 아래와 같이 정의할 수 있다
```python
from locust import events
from locust.runners import MasterRunner

@events.init.add_listener
def on_locust_init(environment, **kwargs):
    if isinstance(environment.runner, MasterRunner):
        print("I'm on master node")
        elif isinstance(environment.runner, WorkerRunner):
                print("I'm on a worker node") 
    else:
        print("I'm on a standalone node")
```

### Logging

Locust를 실행할 때 아래 옵션들을 활용해 로깅을 셋업할 수 있다.
**`-skip-log-setup` : 직접 로그를 configure하고 싶은 경우 사용**
**`-loglevel` : 기본값은 INFO인데, 원할 경우** `DEBUG`/`INFO`/`WARNING`/`ERROR`/`CRITICAL` 중에 선택
**`-logfile` : 로그 파일이 저장될 경로 선택. 만약 지정되지 않으면** `stdout`/`stderr` 로 로깅된다.

기본적으로 locust가 사용하는 로그 외에, 따로 로그를 적고 싶은 로직에서는 아래처럼 로그를 찍으면된다.
```python
import logging
logging.info("this log message will go wherever the other locust log messages go")
```


## Sample Code
locustfile.py
```python
import json
from locust import HttpUser,  task , between

class sample(HttpUser):
	wait_time = between(5, 15)
	access_token = ""
	def on_start(self):		
		print("start test")		

	def on_stop(self):		
		print("end test")		

	@task
	def login(self):
		data = {
			"id" : "sample"
			,"password" : "ssss"
		}
		
		self.client.post(
			"/api/auth/sign-in", 
			json.dumps(data), 
			headers={"Content-Type" : "application/json"})

	@task
	def logout(self):
		self.client.post("/api/auth/sign-out",
						headers={"Content-Type" : "application/json"})
```

run locust
```python
locust -f ./locustfile.py
```



## Sample Code2: Real Example
tree depth
```python
tree -L 2 ./

.
├── bin
├── common
│   ├── auth.py
│   └── config.py
├── include
├── lib
├── lib64
├── locustfile.py
├── pyvenv.cfg
└── requirements.txt
```

locustfile.py
```python

```

## Tuning
### connection pool
위 세팅외에도 Connection Pool을 사용해서 생성되는 유저마다 자체적인 pool을 가지지 않고, 모든 유저가 connection pool을 공유하도록 하고 싶으면 아래와 같이 pool_manager를 정의할 수도 있다.
```python
from locust import HttpUser
from urllib3 import PoolManager

class MyUser(HttpUser):

    # All users will be limited to 10 concurrent connections at most.
    pool_manager = PoolManager(maxsize=10, block=True)
```

### FastHttpUser 클래스 사용
기본적으로 제공되는 HttpUser말고 아래와 같이 `FastHttpUser`를 상속받아 User Class를 정의하는게 좋다.

`HttpUser`는 코어당 850 RPS정도의 성능을 가지고, `FastHttpUser`는 코어당 5000RPS 정도의 성능을 가지기 때문이다. 필자도 성능테스트할 때 FastHttpUser를 사용했다.

`FastHttpUser`의 기본 attribute들은 아래 문서를 참고하자

[https://docs.locust.io/en/stable/increase-performance.html#increase-performance](https://docs.locust.io/en/stable/increase-performance.html#increase-performance)
```python
from locust import task, FastHttpUser

class MyUser(FastHttpUser):
    @task
    def index(self):
        response = self.client.get("/")
```