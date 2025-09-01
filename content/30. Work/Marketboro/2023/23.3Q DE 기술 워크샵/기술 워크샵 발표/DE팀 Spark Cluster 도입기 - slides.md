---
css: css/custom.css
---
## DE팀 Spark Cluster 도입기
#### Marketboro
---
#### Marketboro Airflow
&nbsp;
![](https://i.imgur.com/GTMVJfJ.png)

---

![[grafana-airflow-prod.png]]

---

#### Kakao Page Datalake
&nbsp;

![](https://i.imgur.com/LbznUOT.png)

---

#### Kakao Page Airflow
&nbsp;

![](https://i.imgur.com/h0BDKo0.png)

---


![](https://i.imgur.com/NK86pNg.png)

---


![](https://i.imgur.com/XAMZuZA.png)



---


![](https://i.imgur.com/qEpSWvF.png)

##### 1. Data Chunk를 쪼개서 분산시킨다면?
##### 2. 병렬 처리까지 가능하다면?
---

#### Objectives (미래형):
1. `Airflow Worker`의 **Workload** 감소
2. 데이터 사이즈 증가시 **분산 처리**
3. 분산처리로 인한 **대용량 처리 속도 개선**

---

[[Spark Architecture|Spark 기본 구조 ]]

---

||S/A| Yarn |Mesos|k8s|
|---|---|---|---|---|
|구축|쉬움|어려움|보통|어려움|
|관리|small|big|mid|big|
|확장|보통|어려움|보통|쉬움|

---

#### Standalone vs Mesos 뿐만아니라..<br>
- *현재 상황에 맞는 배포모드는?*
- *리소스 설정은 어떻게?*
- *Client-mode vs Cluster-mode?*

---

[[Spark Deploy Mode|Spark의 배포모드]]


---

![[Standalone vs Mesos.png]]

---
이런 상황을 종합해보니…

→ Standalone Cluster!

---
#### Standalone Cluster 구축과정

인프라 구축 → 노드별 설정값 세팅 → 실행 스크립트<br>
→ Airflow & Spark 연계


---
#### 스파크의 환경변수 & 설정값

```sh
# spark-env.sh
export SPARK_MASTER_HOST="172.21.11.151"
export SPARK_LOCAL_IP="0.0.0.0"
export SPARK_MASTER_PORT='7077'
export SPARK_MASTER_WEBUI_PORT='8040'
export JAVA_HOME=$JAVA_HOME
export PYSPARK_DRIVER_PYTHON='/usr/bin/python'
...
...
# spark-defaults.conf
spark.master spark://172.21.11.151:7077
spark.history.fs.logDirectory file:///home/ec2-user/spark/logs
spark.eventLog.dir file:///home/ec2-user/spark/logs
spark.eventLog.enabled true
```

<br>

---

코드로 인프라 관리 = Ansible ✅

---

```yaml
- name: Setup Spark Properties
  hosts: all
  pre_tasks:
    - name: Ensure Spark Log Directory Exists
      stat:
        path: /tmp/spark
      register: spark_log
    - name: Ensure Spark Directory Exists
      stat:
        path: $SPARK_HOME
      register: spark_dir
...
...
    - name: Setup spark-defaults.conf properties
      template:
        src: ../templates/spark-defaults.properties.j2
        dest: $SPARK_HOME/conf/spark-defaults.conf
        owner: ec2-user
        group: ec2-user
        mode: '0644'
```

---
```sh
# master-init.sh
check_ssh_exist() {
    message "Checking if ssh key exist..." "$green"

    if [ -e ~/.ssh/id_rsa.pub ] || [ -e ~/.ssh/id_rsa ]; then
        message "Ssh key file already exists. skipping task." "$yellow"
    else
	message "Ssh key file does not exist. Generating ssh key." "$green"
	ssh-keygen -t rsa -N '' -f ~/.ssh/id_rsa
	message "$check Ssh key successfully created." "$green"
    fi
}

export_env_vars() {
    message "Exporting env variables..." "$green"
    for node in ${CLUSTER[@]}; do
        public_ip="${node}_PUBLIC_IP"
        public_ip_val=$(grep $node env |  awk '{print $2}' | cut -d'=' -f2)

        private_ip="${node}_PRIVATE_IP"
        private_ip_val=$(grep $node env |  awk '{print $3}' | cut -d'=' -f2)

        bash_public=$(grep $public_ip ~/.bashrc)
        bash_private=$(grep $private_ip ~/.bashrc)
```

---

### 구축 순서

```Bash
# ansible-playbooks
-rw-r--r-- 1 ec2-user ec2-user  588  9월 21 04:31 00_configure_ssh.yml
-rw-rw-r-- 1 ec2-user ec2-user  775  9월 21 07:51 01_setup_env.yml
-rw-rw-r-- 1 ec2-user ec2-user 1890 10월  6 02:35 02_install_spark.yml
-rw-rw-r-- 1 ec2-user ec2-user 1097  9월 22 02:11 03_setup_properties.yml
-rw-rw-r-- 1 ec2-user ec2-user 2326  9월 22 04:57 04_setup_systemd.yml
-rw-rw-r-- 1 ec2-user ec2-user  544 10월  4 01:49 05_deploy_scripts.yml
```


---

![](https://i.imgur.com/dW6DoM5.png)


---

“클러스터는 만들어놨는데… 
이제 어떻게 사용하지?”

→ 분석가가 덜 불편하게 사용할수있게

---

Q. 어떤 Airflow Operator를 사용할것인가?

---

##### spark provider 에서 지원하는 3개의 operator
```python
from airflow.models import DAG
from airflow.providers... import SparkJDBCOperator
from airflow.providers... import SparkSqlOperator
from airflow.providers... import SparkSubmitOperator
```

---
##### SparkJDBC Operator
```python
jdbc_to_spark_job = SparkJDBCOperator(
	spark_conn_id="spark_jdbc",
	cmd_type="jdbc_to_spark",
	jdbc_table="test",
	spark_jars="${SPARK_HOME}/jars/mysql-connector-j-8.0.33.jar",
	jdbc_driver="com.mysql.cj.jdbc.Driver",
	metastore_table="test",
	save_mode="overwrite",
	save_format="JSON",
	task_id="jdbc_to_spark_job",
)
```

---
##### SparkSubmit Operator
```python
submit_spark_app = SparkSubmitOperator(
    task_id='spark_submit', 
    conn_id='spark_conn', 
    application='${SPARK_HOME}/scripts/spark_app.py', 
    name='my_spark_app', 
    application_args=['--arg1', 'value1', '--arg2', 'value2'], 
)
```

---

![](https://i.imgur.com/HWcnMRN.png)
위 Operator들도 결국 사용자들이 `Spark-submit`을 쉽게 사용하도록 만들어진 `wrapper` 

---

Operator 사용 = 편리하지만 유연하지 못한 개발

---

```python
script = f"""
    {spark_home}/bin/spark-submit \
    --master spark://{spark_master} \
    --executor-memory {executor_memory} \
    --driver-memory {driver_memory} \
    --executor-cores {executor_cores} \
    --driver-cores {driver_cores} \
    --jars {variables.jars_path}/{mysql_jar} \
    --jars {variables.jars_path}/{bigquery_jar} \
    {variables.app_path}/{spark_app}.py """
...
...
t2 = BashOperator(
    task_id='upsert_shop',
    bash_command=script + 'shop',
    dag=dag
)
```

---

#### Airflow 변수

![](https://i.imgur.com/WiPuR2o.png)


---
#### Airflow 변수 관리
```json
    "LOCAL": {
      "GCP_PROJECT_ID": "da-dev-384206",
      "BQ_DATASET_ID": "dw_fs_dev",
      "RDS_DBNAME": "gred",
		...
		...
      "SPARK_MASTER_IP": "172.18.0.3",
      "SPARK_MASTER_PORT": "7077",
      "BIGQUERY_JAR": "spark-3.1-bigquery-0.32.2.jar",
      "MYSQL_JAR": "mysql-connector-j-8.0.33.jar",
      "EXECUTOR_MEMORY": "2g",
      "DRIVER_MEMORY": "4g",
      "EXECUTOR_CORES": "1",
      "DRIVER_CORES": "2"
    }
```

---

#### [[Spark Demo Cluster 성능 Test ]]

---

## Conclusion
- 데이터 사이즈가 큰 Data Chunk를 한번에 옮겨야하는 경우 <br>
→ Spark Cluster

- Airflow Worker Node의 부하분산 <br>
→ 별도의 Python Server 구축 후 Worker 와 분리