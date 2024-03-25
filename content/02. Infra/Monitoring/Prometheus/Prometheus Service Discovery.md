---
title: Prometheus Service Discovery
date: 2024-03-07
draft: false
tags:
  - Prometheus
  - Monitoring
complete: true
---
## 서비스 디스커버리
- 타켓 서버에 대한 정보를 가지고 오기 위한 설정
- 라벨을 통해 타겟 서버 관리

## 사용하는 이유:
- 새로운 서버 삭제, 수정시 프로메테우스 재기동, Reload 하는게 번거로움
- 서비스 디스커버리를 이용해서 타겟 서버를 관리해주면 좋음.

ServiceDiscovery 설정 문서
https://prometheus.io/docs/prometheus/latest/configuration/configuration
```sh
cd /prometheus/config  
mkdir sd  
mv prometheus.yml static_sd.yml (기존 yml파일을 static 서비스 디스커버리로 변경)  
vim file_sd.yml
```

```yaml
scrape_configs:
      - job_name: 'node_exporter'
        follow_redirects: true
        scrape_interval: 5s
        scrape_timeout: 1s
         file_sd_configs:
        - files:
          - 'sd/*.yml'

ln -sf file_sd.yml prometheus.yml  
```

vim sd/localhost.yml // 수집 대상서버에 대한 내용이 명시된 서버
```null
- targets:
  - localhost:9100  // 서버에 있는 node_exporter
  labels:
    region: KR
    tier: frontend
    environment: development //develop or production
    disk: NVMe // ssd or NVMe
```
별도의 라벨이 필요 할 시 밑에 계속 추가 하면 됨.

http://localhost:9090/service-discovery
만들어 놓은 label 확인
#### relabel
```null
relabel_configs 
        - source_labels: ['__address__'] // 참조하는 레이블
          regex: '(.*):(.*)' // host:port
          replacement: '${1}' // 매칭되는 부분의 첫번째
          target_label: 'host' // 레이블의 값을 사용하겠음
        - source_labels: ['__address__']
          regex: '(.*):(.*)'
          replacement: '${2}'
          target_label: 'port'
```

http://localhost:9090/service-discovery
Target Labels 변경 값 확인