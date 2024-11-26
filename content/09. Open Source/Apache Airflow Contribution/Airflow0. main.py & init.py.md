---
title: Airflow0. main.py & init.py
date: 2024-11-16
draft: false
tags:
  - OpenSource
  - Airflow
complete: true
link: https://raw.githubusercontent.com/puckel/docker-airflow/refs/heads/master/config/airflow.cfg
---
## [Main.py](https://github.com/apache/airflow/blob/main/airflow/__main__.py)
> [!note] 기본역할
> Airflow의 실행 가능한 주요 모듈로, CLI(Command Line Interface)를 통해 Airflow의 다양한 기능을 실행할 수 있도록 구성되어 있음. 이 파일은 Airflow의 엔트리 포인트로 동작하며, Airflow의 초기화, 설정, 그리고 명령어 처리를 담당

- **Airflow 초기화**:
    - 설정 파일을 로드하고 초기 환경을 설정합니다.
- **CLI 처리**:
    - 명령어를 파싱하여 적절한 기능을 호출합니다.
- **보안 및 데이터베이스 설정**:
    - 특정 모드(예: Kerberos 인증, 데이터베이스 접근 제한)에서 환경 변수를 설정합니다.

```python
from __future__ import annotations  
  
import os  
from argparse import Namespace  
  
import argcomplete

from airflow import configuration  
from airflow.cli import cli_parser  
from airflow.configuration import AirflowConfigParser, write_webserver_configuration_if_needed  
from airflow.exceptions import AirflowException
```

### CLI 파서 생성 및 명령어 처리
```python
parser = cli_parser.get_parser()
argcomplete.autocomplete(parser)
args = parser.parse_args()
```

### 설정 파일 초기화
```python
if args.subcommand not in ["lazy_loaded", "version"]:
    from airflow.configuration import write_default_airflow_configuration_if_needed
    conf = write_default_airflow_configuration_if_needed()
    if args.subcommand in ["webserver", "internal-api", "worker"]:
        write_webserver_configuration_if_needed(conf)
```

### 내부 API 설정
```python
configure_internal_api(args, conf)
```
`configure_internal_api()`를 호출하여 데이터베이스 접근 제한 설정 등을 처리합니다.

```python
if conf.getboolean("core", "database_access_isolation", fallback=False):
    if args.subcommand in ["worker", "dag-processor", "triggerer", "run"]:
        if "AIRFLOW__DATABASE__SQL_ALCHEMY_CONN" in os.environ:
            os.environ["AIRFLOW__DATABASE__SQL_ALCHEMY_CONN"] = "none://"
            conf.set("database", "sql_alchemy_conn", "none://")
        from airflow.api_internal.internal_api_call import InternalApiConfig
        InternalApiConfig.set_use_internal_api(args.subcommand)
```
`database_access_isolation`이 활성화된 경우:
- 데이터베이스 접근이 필요 없는 컴포넌트(예: `worker`, `dag-processor`)에서는 DB 연결을 비활성화(`none://`)합니다.
- `InternalApiConfig`를 통해 내부 API를 사용하도록 설정합니다.

**신뢰할 수 있는 컴포넌트 처리**:
```python
else:
    db_connection_url = conf.get("database", "sql_alchemy_conn")
    if not db_connection_url or db_connection_url == "none://":
        raise AirflowException("Running trusted components ... requires connection ...")
    from airflow.api_internal.internal_api_call import InternalApiConfig
    InternalApiConfig.set_use_database_access(args.subcommand)
```
- 신뢰할 수 있는 컴포넌트(예: 웹 서버)가 실행되려면 적절한 데이터베이스 연결이 필요합니다.
- 설정된 DB URL이 없으면 예외를 발생시킵니다.

### 명령어 실행
```python
args.func(args)
```
- CLI 파싱 결과로 반환된 함수(`func`)를 실행합니다.
- 이는 Airflow CLI가 실행될 수 있도록 하는 핵심 부분입니다.


## [Init.py](https://github.com/apache/airflow/blob/main/airflow/__init__.py)
> [!note] 기본역할
> 디렉터리를 파이썬 패키지로 인식하게 만드는 파일
> 여기서 특정 모듈이나 기능을 초기화하거나 전역적으로 사용할 변수, 클래스, 함수를 설정할 수 있음

### overview
#### 코드실행 및 설정
- 파일에 정의된 코드는 패키지가 임포트될 때 실행됩니다.
- 필요한 모듈을 로드하거나, 전역 변수를 설정하거나, 패키지 수준에서의 로직을 실행합니다.

#### Lazy Import 및 네임스페이스 제공
- 파일에 정의된 `__all__` 목록은 패키지를 임포트할 때 사용할 수 있는 이름을 제한적으로 제공할 수 있습니다.

```python
from airflow import configuration, settings  
  
__all__ = [  
    "__version__",  
    "DAG",  
    "Dataset",  
    "XComArg",  
]
```

#### 1. **버전 정보 정의**
```python
__version__ = "2.10.3"
```

#### 2. **환경 의존적 초기화**
Airflow가 특정 환경에서 적절히 작동하도록 초기화
```python
# Gevent patch
if os.environ.get("_AIRFLOW_PATCH_GEVENT"):
    from gevent.monkey import patch_all
    patch_all()
```

#### 3. 초기화 작업 및 의존성 해결
```python
from airflow import configuration, settings
```
- `configuration` 및 `settings`를 초기화합니다.
- `settings.initialize()`는 Airflow의 설정 및 데이터베이스를 초기화하는 데 중요합니다.
#### 4. Lazy Imports 설정
```python
__lazy_imports: dict[str, tuple[str, str, bool]] = {
    "DAG": (".models.dag", "DAG", False),
    "Dataset": (".datasets", "Dataset", False),
    "XComArg": (".models.xcom_arg", "XComArg", False),
}
```
- Lazy Imports는 필요한 모듈과 객체를 동적으로 로드하여 초기 로드 속도를 최적화합니다. (필요할 때만 모듈을 로드하여 성능 최적화)
- `__getattr__` 메서드를 사용해 필요한 경우에만 모듈을 불러옵니다.

