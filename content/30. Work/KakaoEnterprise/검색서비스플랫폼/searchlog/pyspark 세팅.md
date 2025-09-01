1. pyenv activate 
	1. `pyenv activate venv-3.7.17` python 3.7.17 써야함
2. kinit john-kim995@KAKAO.HADOOP
	1. klist → Credentials cache 떠야함
3. hadoop-qm-env (pass 신청)
4. jupyter dir 이동
5. source ./env.sh
6. 노트북 파일이 열리면 성공
7. spark 실행
*VPN 환경에서는 할 수 없음.

## Hadoop-cli 실행
```python
패스신청
hadoop-qm-env
hadoop-qm-env-start
kinit 계정@KAKAO.HADOOP
hdfs dfs -ls /
```
