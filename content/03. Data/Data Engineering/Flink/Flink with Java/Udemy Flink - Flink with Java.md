---
title: Udemy Flink - Flink with Java
date: 2024-12-09
draft: false
tags: 
complete: true
---
## Overview
- title: apache flink | real time & hands on course on flink
- Flink 1.5.0 (https://nightlies.apache.org/flink/flink-docs-release-1.5)
- https://archive.apache.org/dist/flink/
- without bundled hadoop → https://archive.apache.org/dist/flink/flink-1.5.6/flink-1.5.6-bin-scala_2.11.tgz

## Install
```python
cd ~/playground
wget https://archive.apache.org/dist/flink/flink-1.5.6/flink-1.5.6-bin-scala_2.11.tgz
tar -zxvf flink-1.5.6-bin-scala_2.11.tgz
cd flink-1.5.6
```


## Run Server
> [!warning] JAVA_HOME
> JAVA_HOME이 셋업되어있더라도 export JAVA_HOME을 무조건 한번 더 해줘야 flink 서버기 뜬다…


```python
./bin/start-cluster.sh
```