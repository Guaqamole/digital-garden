## Overview
palu-runner란? 컬렉션별로 새로운 수집/처리기를 따로 구성하지 않고 설정만을 이용해 동적/재처리/정적 필터링을 수행
해당 문서는 동적필터링만 기록.
### submit flink
```python
python palu-runner.py -c john-flink.dev.onkakao.net:80 brunch2 start hdfs:///output/john/checkpoint
```

```python
FLINK_HOME=
PALU_HOME=/hanmail/working/palu

# 위 파이썬 명령어는 아래와 같다.
$FLINK_HOME/bin/flink run \
-m john-flink.dev.onkakao.net:80 \
-d \
-p 1 \
-c com.kakaocorp.hammer.runner.flink.FlinkRunner $PALU_HOME/palu-runner/target/palu-runner-1.0-SNAPSHOT.jar \
-m extract \
-f $PALU_HOME/palu-runner/specification/blog_hammer.yml \
-n brunch2_dynamic \
-u hanadmin \
-cp hdfs:///output/john/checkpoint \
-cpi 60000 \
-cpt 3600000
```


## Local 에서 실행해보기
- 예시) trending keyword
```python

```


## 코드분석

