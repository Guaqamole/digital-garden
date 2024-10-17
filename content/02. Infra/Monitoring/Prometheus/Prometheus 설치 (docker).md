---
title: Prometheus 설치 (docker)
date: 2024-03-06
draft: false
tags:
  - Monitoring
  - Prometheus
  - Docker
complete: true
---
## 1. PreRequisite
#### Directory
```sh
mkdir -p ~/prometheus/config ~/prometheus/data
cd ~/prometheus
vim run.sh
```
#### prometheus.yml
```yml
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    scrape_timeout: 1s
    static_configs:
    - targets:
      - localhost:9090
```
## 2. Shell Script
https://prometheus.io/docs/prometheus/latest/installation/
```sh
home="$(pwd)"

docker run \
-d --name=prometheus \
-p 9090:9090 \
-v $home/config:/etc/prometheus \
-v $home/data:/prometheus \
prom/prometheus \
--config.file=/etc/prometheus/prometheus.yml \
--storage.tsdb.path=/prometheus \
--storage.tsdb.retention.time=20d \
--web.enable-lifecycle \
--log.level=debug2
```
- web.enable-lifecycle: management api 로 관리 유무
- storage.tsdb.retention.time: log 유지기간
## 3. Management API
```sh
 curl localhost:9090/-/ready -D /dev/stdout

HTTP/1.1 200 OK
Date: Wed, 06 Mar 2024 06:35:40 GMT
Content-Length: 28
Content-Type: text/plain; charset=utf-8
```

만약 lifecycle 이 enable 상태가 아니면 아래와같이 나온다
```sh
 curl localhost:9090/-/reload -XPOST -D /dev/stdout

HTTP/1.1 403 Forbidden
Date: Wed, 06 Mar 2024 06:26:39 GMT
Content-Length: 29
Content-Type: text/plain; charset=utf-8

Lifecycle API is not enabled.%
```

## 4. Config Check
#### docker logs
```sh
 docker logs -f prometheus 2>&1 | grep retention
ts=2024-03-06T06:31:14.731Z caller=main.go:564 level=info msg="No time or size retention was set so using the default time retention" duration=15d
```

#### UI
http://localhost:9090/flags 진입
![](https://i.imgur.com/GwXfFmm.png)

