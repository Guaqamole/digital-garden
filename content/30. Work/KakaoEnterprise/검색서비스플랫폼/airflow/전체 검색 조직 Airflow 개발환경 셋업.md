요구사항
```
현재 airflow에 연동된 깃헙이 cbt 브랜치에서 테스트를 하다보니 cbt 브랜치가 엉망인 상태입니다. 커밋을 main에 넣을수가 없어서 pr도 안되고 개별 커밋을 체리픽해서 따로 넣고 있는것 같더라구요.

그래서 개발용 브랜치가 우선 따로 필요할것 같았구요. 개발용 브랜치로 dag 테스트 가능한 환경이 있다면 cbt 브랜치는 싹 다시 정리해야 할것 같더라구요.
k8s에 올라가 있다보니 개별 브랜치 git sync 연동이 간단하지 않은 문제도 있다보니 어떻게 하는게 좋은 방법일까? 혼자 고민하고 있었습니다.

일단 로컬에서 dag를 테스트 할수 있는 환경이 있다면 조금씩 정리해 나갈수 있을것 같습니다.
```

1. 조직별 github submodule
2. 여러개 worker node로 작업
3. 조직별로 auto tagging
4. keytab 설정
5. cicd auto import checks

참고
- https://github.kakaocorp.com/SearchModel/searchmodel-dags
- https://github.kakaocorp.com/SearchModel/keyword-infra
- https://airflow.apache.org/docs/docker-stack/build.html
- https://blog.pages.kr/3023
- https://tommykim.tistory.com/89
- 얄코의 too much 친절한 깃
- 그림과실습으로배우는도커

## 추가세팅
1. airflow variables
2. airflow connections → KHPSparkConn
3. KWD__SERVICE_TIER, SERVICE_TIER_ENV_VAR_NAME


## 안되는것

### repo?
- repo 폴더 세팅을 어떻게하는건지 모르겠음
```python
java.io.FileNotFoundException: File file:/opt/***/dags/repo/pyapp/sample/read_sample.py does not exist
```


### io.py
io.py 때문에 airflow 뜰때 계속 에러남
pyspark이 없다고 뜨는데 왜그러는지 모르겠음…
```python
File "/opt/airflow/pylib/io.py", line 4, in <module>
ModuleNotFoundError: No module named 'pyspark'
```



## 해야할일
1. airflow2, airflow3 shell script 작성
2. extra module 어떻게 설치하는지 조사
3. submodule 어떻게 적용시킬건지
	1. 우선 dag repo를 clone해와서 사용해야할듯
		1. repo를 어떻게 사용하냐에 따라 전략이 바뀔듯
4. git push & merge 어떻게 할건지?
5. sample app
	1. read_sample
	2. parallel_sample
6. import checks (cicd)
	1. 에러나면 카톡알림방으로 문자감
7. 개인키탭 선택적 세팅 → local이랑 cbt에서 어떻게 강제화할지?
	1. local에선 일단 resources에다가 집어넣음
	2. 꼭 container 안에있는 hadoop-env-v2 로 키탭 생성한 다음, 집어넣어야함
	3. PresetSparkSubmitOperator() keytab, principal
https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html


- docker 없는 명령어 -> docker init에 pull 과정 집어넣어야지
- x86/arm으로 맞춤

airflow-local-settings.py
https://github.com/AllenInstitute/incubator-airflow/blob/master/airflow/config_templates/airflow_local_settings.py
https://github.com/apache/airflow/blob/v2-1-stable/airflow/settings.py#L364



### full process
1. env.example 수정
2. airflow init
3. git clone (clone-dags)
6. bigdata portal (LDAP x) keytab copy to resources
7. kaya pass
8. airflow up
9. variable + connections into resources
10. airflow extra-setup
11. http://localhost:8080/home?status=all&tags=example 접근