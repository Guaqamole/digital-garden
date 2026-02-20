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
https://{ip}:{port}/_cluster/_cat/indices
```

### Cluster Health
```sh
https://{ip}:{port}/_cluster/health?pretty
```

### Search Documents
이후에는 https://ip:port … 생략
#### 1. Search By Field
```sh
GET {index}/_search
```
##### Request body
```sh
{
  "query": {
    "term": {
        "goods_id": {
            "value": "432020"
            }
        }
    }
}
```
##### Request body
```sh
{
  "query": {
    "match": {
        "goods_id": {
            "value": "432020"
            }
        }
    }
}
```

#### 2. List up Fields
```
GET {index}/_mappings
```
