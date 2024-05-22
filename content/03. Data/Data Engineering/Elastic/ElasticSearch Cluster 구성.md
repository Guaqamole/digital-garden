---
title: ElasticSearch Cluster 구성
date: 2024-05-20
draft: true
tags:
  - Elastic
complete: true
---
## Overview
- 3 X t3.medium
- ES 8.13
- JDK 17
- Node 1 : Master, Data, Ingest
- Node 2: Master, Data, Ingest
- Node 3: Master, Data, Ingest
## Install
### 1. JDK
https://www.oracle.com/kr/java/technologies/downloads/#java17
x64 Compressed Archive

or `wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz`

#### download and untar
```bash
sudo mkdir -p /opt/java
sudo chown ec2-user.ec2-user /opt/java
cd /opt/java
wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz

tar xvzf jdk-17_linux-x64_bin.tar.gz
ln -s jdk-17.0.11 jdk17
ln -s jdk-17.0.11 jdk
```

#### etc.profile
```bash
sudo sh -c 'cat << EOF >> /etc/profile

# JAVA SETTINGS
export JAVA_HOME=/opt/java/jdk
export PATH=$JAVA_HOME/bin:$PATH
EOF'
```


### 2. ElasticSearch
#### add yum repo
```bash
sudo sh -c 'cat << EOF > /etc/yum.repos.d/elasticsearch.repo
[elasticsearch-8.x]
name=Elasticsearch repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
EOF'
```

#### install
```bash
sudo yum update -y
sudo yum install -y elasticsearch
```


#### linux account setup
- linux group `elasticsearch` 에 `ec2-user` 추가
    - elasticsearch 계정/그룹이 생성되며 다른 사용자는 접근이 제한되기 때문에 `ec2-user` user를 `elasticsearch` 그룹에 추가한다.
```bash
sudo gpasswd -a ec2-user elasticsearch
sudo chmod g+rwx /etc/elasticsearch/
sudo chmod g+rwx /var/log/elasticsearch/
sudo chmod g+rwx /var/lib/elasticsearch/
```


#### Multi-node setup
- discovery.type: {설정할 경우, single-node 값으로 지정되고 단일 노드 구성됨.} (# * cluster.initial_master_nodes 설정과 함께 사용 불가.)
- cluster.initial_master_nodes: {명시된 노드들을 대상으로 마스터 노드 선출, 바인딩 할 노드의 IP 또는 도메인 주소를 입력한다. master 구성은 최소 3개 이상 쿼럼 구성 추천.}
- action.destructive_requires_name: false  → index삭제시 '*' 허용

##### Node 1 elasticsearch.yml
- `/etc/elasticsearch/elasticsearch.yml`
```bash
cluster.name: prod-fs-search-cluster-01
node.name: prod-fs-search-master-01
node.roles: [master, data, ingest]
network.host: 172.31.134.184
http.port: 9200
discovery.seed_hosts: ["172.31.134.184"]
action.destructive_requires_name: false

# Enable security features
xpack.security.enabled: false
xpack.security.transport.ssl.enabled: false
xpack.security.http.ssl.enabled: false

cluster.initial_master_nodes: ["prod-fs-search-master-01"]
http.host: 0.0.0.0
transport.port: 9300
```

> [!warning] 처음 마스터 1번 노드를 구성할때
> 처음 마스터 1번 노드를 구성할때는 한개의 IP만 적는다 안그러면 # ['master_not_discovered_exception'](https://stackoverflow.com/questions/37970187/elasticsearch-cluster-master-not-discovered-exception) 발생.
> 추후 노드를 하나씩 더 붙힐때 2개 추가.
##### Node 1 jvm.options
- `/etc/elasticsearch/jvm.options`
- 전체메모리 / 2 == 4g / 2 == 2g
```bash
-Xms2g
-Xmx2g
```

#### common
- file descriptor
- `/etc/security/limits.conf`
```bash
elasticsearch - nofile 65535
```

- vm_map_max_count
- `/etc/sysctl.conf`
```bash
vm.max_map_count = 262144
```

#### Start
```bash
sudo systemctl enable elasticsearch.service
sudo systemctl start elasticsearch.service
```

#### Check
```bash
curl 'http://localhost:9200'
{
  "name" : "prod-fs-search-master-01",
  "cluster_name" : "prod-fs-search-cluster-01",
  "cluster_uuid" : "1LAzHapASi2iztyXssLezw",
  "version" : {
    "number" : "8.13.4",
    "build_flavor" : "default",
    "build_type" : "rpm",
    "build_hash" : "da95df118650b55a500dcc181889ac35c6d8da7c",
    "build_date" : "2024-05-06T22:04:45.107454559Z",
    "build_snapshot" : false,
    "lucene_version" : "9.10.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}


curl 'http://localhost:9200/_cluster/health'
curl 'http://localhost:9200/_cat/indices'


curl localhost:9200/_cat/nodes
172.xxx.xxx.xxx 18 97 0 0.05 0.17 0.13 dim * prod-fs-search-master-01
```


#### Connecting other nodes
172.31.134.184
172.31.134.163
172.31.140.102
##### Node 2 elasticsearch.yml
- `/etc/elasticsearch/elasticsearch.yml`
```bash
cluster.name: prod-fs-search-cluster-01
node.name: prod-fs-search-master-02
node.roles: [master, data, ingest]
network.host: 172.31.134.163
http.port: 9200
discovery.seed_hosts: ["172.31.134.184", "172.31.134.163", "172.31.140.102"]
cluster.initial_master_nodes: ["prod-fs-search-master-01", "prod-fs-search-master-02", "prod-fs-search-master-03"]
action.destructive_requires_name: false

# Enable security features
xpack.security.enabled: false
xpack.security.transport.ssl.enabled: false
xpack.security.http.ssl.enabled: false
http.host: 0.0.0.0
#transport.port: 9300
```

## Kibana
### install
- /etc/yum.repos.d/kibana.repo
```bash
[kibana-8.x]
name=Kibana repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

```python
sudo yum update -y
sudo yum install -y kibana
```

### config
- sudo vi /etc/kibana/kibana.yml
```bash
server.port: 5601
server.host: 0.0.0.0
elasticsearch.hosts: ["http://172.31.134.184:9200", "http://172.31.134.163:9200", "http://172.31.140.102:9200"]
```

### start
```bash
sudo systemctl enable kibana
sudo systemctl start kibana
```


## MetricBeat (monitoring) - 안됨…

### install
```python
sudo mkdir -p /opt/metricbeat
sudo chown ec2-user.ec2-user /opt/metricbeat
cd /opt/metricbeat

curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-8.13.4-linux-x86_64.tar.gz
tar xzvf metricbeat-8.13.4-linux-x86_64.tar.gz

ln -s metricbeat-8.13.4-linux-x86_64 metricbeat8
```

### setup
sudo vi /opt/metricbeat/metricbeat8/metricbeat.yml
```yaml
setup.kibana
	host: 172.31.13.5:5601
output.elasticsearch:
	hosts: ["http://172.31.134.184:9200", "http://172.31.134.163:9200", "http://172.31.140.102:9200"]
```


### systemd
```bash
sudo sh -c 'cat << EOF > /etc/systemd/system/metricbeat.service
[Unit]
Description=Metricbeat8
Documentation=https://www.elastic.co/guide/en/beats/metricbeat/8.13/metricbeat-installation-configuration.html
Wants=network-online.target
After=network-online.target

[Service]
User=root
Restart=on-failure
ExecStart=/usr/local/bin/metricbeat -c /opt/metricbeat/metricbeat8/metricbeat.yml

[Install]
WantedBy=multi-user.target
EOF'


sudo systemctl daemon-reload
sudo systemctl enable metricbeat
sudo systemctl start metricbeat
```

```bash
sudo gpasswd -a ec2-user metricbeat
sudo chmod g+rwx /opt/metricbeat/metricbeat8

sudo useradd -r -d /opt/metricbeat -s /sbin/nologin ec2-user
sudo chown -R ec2-user:metricbeat /opt/metricbeat

```


## ElasticSearch Exporter
### binary
```bash
sudo mkdir -p /opt/exporter
sudo chown ec2-user.ec2-user /opt/exporter
cd /opt/exporter

wget https://github.com/prometheus-community/elasticsearch_exporter/releases/download/v1.7.0/elasticsearch_exporter-1.7.0.linux-amd64.tar.gz
tar -zxvf elasticsearch_exporter-1.7.0.linux-amd64.tar.gz
mv elasticsearch_exporter-1.7.0.linux-amd64 elasticsearch_exporter
rm -rf elasticsearch_exporter-1.7.0.linux-amd64.tar.gz

sudo ln -s /opt/exporter/elasticsearch_exporter/elasticsearch_exporter /usr/local/bin/elasticsearch_exporter
```

### systemd
```bash
sudo sh -c 'cat << EOF > /etc/systemd/system/elasticsearch_exporter.service
[Unit]
Description=Prometheus elasticsearch_exporter
After=local-fs.target network-online.target network.target
Wants=local-fs.target network-online.target network.target

[Service]
User=root
Restart=on-failure
ExecStart=/usr/local/bin/elasticsearch_exporter --es.uri=http://localhost:9200 --es.all --es.indices --es.timeout 20s

[Install]
WantedBy=default.target
EOF'
```

### start
```bash
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch_exporter
sudo systemctl start elasticsearch_exporter
```

### check
```bash
curl -XGET http://localhost:9114/metrics
```


## Node Exporter
### binary
```bash
sudo mkdir -p /opt/exporter
sudo chown ec2-user.ec2-user /opt/exporter
cd /opt/exporter

wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
tar -zxvf node_exporter-1.7.0.linux-amd64.tar.gz
mv node_exporter-1.7.0.linux-amd64 node_exporter
rm -rf node_exporter-1.7.0.linux-amd64.tar.gz

sudo ln -s /opt/exporter/node_exporter/node_exporter /usr/local/bin/node_exporter
```

### systemd
```bash
sudo sh -c 'cat << EOF > /etc/systemd/system/node_exporter.service
[Unit]
Description=Prometheus Node Exporter
Documentation=https://prometheus.io/docs/guides/node-exporter/
Wants=network-online.target
After=network-online.target

[Service]
User=root
Restart=on-failure
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF'
```

### start
```bash
sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter
```

### check
```bash
curl -XGET http://localhost:9100/metrics
```




## Plugins
### Nori Analyzer
```bash
cd /usr/share/elasticsearch
sudo bin/elasticsearch-plugin list
sudo bin/elasticsearch-plugin install analysis-nori
sudo systemctl restart elasticsearch
```