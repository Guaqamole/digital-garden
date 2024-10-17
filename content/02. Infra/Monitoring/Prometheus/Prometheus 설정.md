---
title: Prometheus 설정
date: 2024-03-06
draft: false
tags:
  - Monitoring
  - Prometheus
complete: true
---
## 컴포넌트
![](https://i.imgur.com/p4tZeCc.png)


## 아키텍처
![](https://i.imgur.com/liYHpOt.png)


## 설정은 크게 3가지로 나뉜다
- global: 전역으로 사용되는 설정 값
- alerting: AlertManager에 연관된 설정
- scrape_configs: 수집할 방법 및 대상을 설정하는 부분

### Global
![](https://i.imgur.com/OvLDH48.png)

### Alerting
![](https://i.imgur.com/EVTWsBF.png)

### Scrape_configs
![](https://i.imgur.com/Zs1Z6WZ.png)


#### static_sd.yml
- prometheus 는 docker로 실행중이므로 자기자신은 localhost,
- node-exporter는 
```yaml
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    scrape_timeout: 1s
    static_configs:
    - targets:
      - localhost:9090
      labels:
        region: KR
        env: prod
    - targets:
      - host.docker.internal:9100
      labels:
        region: EU
        env: dev
    - targets:
      - host.docker.internal:9100
      labels:
        region: EU
        env: prod
```