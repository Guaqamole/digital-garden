---
title: Load dataframe to bigquery table
date: 2023-10-17
draft: false
tags:
  - Python
  - BigQuery
---
## 빅쿼리 클라이언트 객체 만들기

아래와 같이 서비스 계정 인증 정보가 담긴 JSON 파일을 참조해 빅쿼리 클라이언트 객체를 만든다. 빅쿼리 클라이언트 객체를 이용해 빅쿼리에 접근할 수 있다.

```python
from google.cloud import bigquery
from google.oauth2 import service_account

# 서비스 계정 인증 정보가 담긴 JSON 파일 경로
KEY_PATH = "./key.json"
# Credentials 객체 생성
credentials = service_account.Credentials.from_service_account_file(KEY_PATH)
# 빅쿼리 클라이언트 객체 생성
client = bigquery.Client(credentials = credentials, project = credentials.project_id)
```

  

## 데이터프레임 만들기

이 테이블에는 `name`과 `age` 필드가 존재한다. `Pandas`를 이용해 샘플 데이터를 만들어보자.

```python
import pandas as pd

df = pd.DataFrame(
    {
        "name": ["Jason", "Paul", "Tom"],
        "age": [20, 22, 24],
    }
)
df
```

|     | name  | age |
| --- | ----- | --- |
| 0   | Jason | 20  |
| 1   | Paul  | 22  |
| 2   | Tom   | 24  |




## 데이터프레임을 테이블에 삽입하기

‘프로젝트 이름.데이터 세트 이름. 테이블 이름’ 형식으로 입력하여 테이블 ID를 만든다. `client.get_table`을 통해 빅쿼리 테이블 객체를 생성한다. 그리고 `client.load_table_from_dataframe`을 이용해 위에서 만든 데이터프레임 객체를 빅쿼리 테이블에 삽입하는 요청을 실행한다.

```python
# 테이블 ID
table_id = "[프로젝트 이름].[데이터 세트 이름].[테이블 이름]"
# 테이블 객체 생성
table = client.get_table(table_id)
# 데이터프레임을 테이블에 삽입
client.load_table_from_dataframe(df, table)
```

```sh
LoadJob<project=*****, location=asia-northeast3, id=*****>
```

  

## 삽입된 데이터를 테이블에서 조회하기

빅쿼리 테이블에 데이터가 정상적으로 삽입되었는지 확인하기 위해 SQL로 데이터를 조회하는 쿼리를 작성한다. `client.query`를 통해 빅쿼리 테이블의 데이터를 조회한 후 `.to_dataframe`을 이용해 조회 결과를 데이터프레임 형식으로 변환한다.

```python
query = f"""
SELECT *
FROM `[프로젝트 이름].[데이터 세트 이름].[테이블 이름]`
"""
check = client.query(query).to_dataframe()
check
```

