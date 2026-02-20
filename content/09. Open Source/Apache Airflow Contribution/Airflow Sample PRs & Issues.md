---
title: Airflow Sample PRs & Issues
date: 2024-11-17
draft: false
tags:
  - OpenSource
complete: true
---
## 이전 기수 사람이 했던거
1. ISSUE (https://github.com/apache/airflow/issues/38115)
2. PR https://github.com/apache/airflow/pull/40909
3. 

https://chip-bream-9d5.notion.site/PR-459f46f1dbe048ffbb7ef04fd9dcc6a6?pvs=4

## Overview
### 용어정리
- What happend? → 에러 내용 적는곳
- What you think should happen instead → 어떻게 동작해야하는지 적는곳
- How to reproduce → 어떻게 고칠건지
- Are you willing to submit PR? → 글 올린사람이 pr할건지
- needs-triage → 분류해야함


## Sample Merged PR
https://github.com/apache/airflow/pull/41076/files
https://github.com/apache/airflow/pull/44279


## Contributing DOcs
https://github.com/apache/airflow/tree/main/contributing-docs

## PR Guidelines
https://github.com/apache/airflow/blob/main/contributing-docs/05_pull_requests.rst#pull-request-guidelines

pre-commit hooks 
https://github.com/apache/airflow/blob/main/contributing-docs/08_static_code_checks.rst#pre-commit-hooks

Coding Style
https://github.com/apache/airflow/blob/main/contributing-docs/05_pull_requests.rst#coding-style-and-best-practices

Rebase over merge
https://github.blog/developer-skills/github/rebase-and-merge-pull-requests/
https://stackoverflow.com/questions/7244321/how-do-i-update-or-sync-a-forked-repository-on-github/7244456#7244456
( Make sure to resolve all conflicts during rebase.)

Run relevant tests locally before opening PR. Often tests are placed in the files that are corresponding to the changed code (for example for `airflow/cli/cli_parser.py` changes you have tests in `tests/cli/test_cli_parser.py`). However there are a number of cases where the tests that should run are placed elsewhere - you can either run tests for the whole `TEST_TYPE` that is relevant (see `breeze testing tests --help` output for available test types) or you can run all tests, or eventually you can push your code to PR and see results of the tests in the CI.

Commit Message
https://cbea.ms/git-commit/
## Issues
- https://github.com/apache/airflow/issues/41512
	- core, bug, needs-triage
	- 쉬워보임
	- 근데 검증되지 않음

안녕하세요 저도 인제님 이슈선정 가이드를 읽고 가벼운 질문이생겼어요! 현재 Airflow 공식 레포의 오픈된 Issue들을 보고있는데, 대부분 이슈 설명들이 자세하게 나와있어요.

근데 마지막에 보면 "Are you willing to submit PR?" -> "Yes I am willing to submit a PR!" 라는 문구에 체크를 확인할수있는데요 (https://github.com/apache/airflow/issues/41472)

리포팅해주신분이 해결하려고 올린 이슈인거 같은데, 제가 갑자기 PR을 요청하는게 뭔가 날먹(?)한다는 생각이들어서요ㅋㅋㅋㅎㅎ
개인적으로 해결 해보고싶은 이슈인데 제가 그냥 Assignee 되고싶다고 요청해도 되는건가요? 오픈소스가 처음이라 잘 모르겠네요ㅎ



1. https://github.com/apache/airflow/issues/40576 (비슷한 이슈 https://github.com/apache/airflow/issues/41472)
2. https://github.com/apache/airflow/issues/39968
3. https://github.com/apache/airflow/issues/41972

쉽고 재밌어보이는 이슈 3개 골랐습니다! 40576, 39968는 이슈어가 Assignee로 배정되어있어 해당 이슈 개발중일거같아 41972를 추가해봤습니다… (안전빵)

[SFTPToS3Operator 사용시 sftp 경로에 파일체크 로직 추가]
https://github.com/apache/airflow/issues/40576

[JDBC Connection ‘Test’ 기능 이슈]
https://github.com/apache/airflow/issues/39968

[dag.test() 함수 호출시 무한 retry 상태에 빠지는 이슈]
https://github.com/apache/airflow/issues/41972