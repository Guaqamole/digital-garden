---
title: Install Flink Local (mac)
date: 2024-10-30
draft: false
tags: 
complete: true
---
## Java version
[[Java Version Change]]

```python
❯ java -version
openjdk version "1.8.0_432"
```

## option1: Homebrew
```python
brew search apache-flink
==> Formulae
apache-flink    apache-flink-cdc

brew install apache-flink
```


## option2: Binary
> [!warning] JAVA_HOME
> JAVA_HOME이 셋업되어있더라도 export JAVA_HOME을 무조건 한번 더 해줘야 flink 서버기 뜬다…

- recommended
https://archive.apache.org/dist/flink/flink-1.13.1 
```python
cd /opt && sudo wget https://archive.apache.org/dist/flink/flink-1.13.1/flink-1.13.1-bin-scala_2.11.tgz && sudo tar -zxvf flink-1.13.1-bin-scala_2.11.tgz

chown -R john:admin flink

# for 1.13.1
echo "FLINK_HOME=/opt/flink" >> ~/.zshrc
vi $FLINK_HOME/conf/flink-conf.yaml
rest.address: localhost
rest.bind-address: 0.0.0.0
--> http://host:8080

# for 1.19
vi $FLINK_HOME/conf/config.yaml
rest:
  address: localhost
  bind-address: 0.0.0.0
--> http://host:8081

export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
$FLINK_HOME/bin/start-cluster.sh

jps
Starting cluster.
Starting standalonesession daemon on host Johnss-MacBook-Pro.local.
Starting taskexecutor daemon on host Johnss-MacBook-Pro.local.


$FLINK_HOME/bin/stop-cluster.sh
```