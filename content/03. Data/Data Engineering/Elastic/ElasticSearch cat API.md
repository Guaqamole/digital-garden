---
title: Elastic cat API
date: 2024-01-04
draft: false
tags: 
complete: true
---
### List Indices
- Authorization (Basic Auth)
	- User: elastic
	- Pass: password
```sh
https://ip:port/_cluster/_cat/indices
```

### Cluster Health
```sh
https://ip:port/_cluster/health?pretty
```

### Search Documents
이후에는 https://ip:port … 생략
```sh
GET kibana_sample_data_ecommerce/_search
```

