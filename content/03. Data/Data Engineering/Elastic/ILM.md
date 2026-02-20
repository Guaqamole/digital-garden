---
title: ILM
date: 2024-03-25
draft: false
tags:
  - Elastic
complete: true
link: https://stackoverflow.com/questions/32718927/is-there-a-way-to-set-ttl-in-elastic-search-index
---
## Index Template
```json
{
	"index_patterns": [
	    "test*" <-- Choose your index here
	],
	"template": {
	    "settings": {
	        "number_of_shards": 1,
	        "number_of_replicas": 1,
	        "index.lifecycle.name": "delete_log_after_2day"
	    }
	}
}
```

## \_settings
access log 삭제
```json
PUT /access-*/_settings
{
	"lifecycle.name": "index_ttl_14_days"
}
```

## ilm policy
```json
PUT _ilm/policy/ttl_14_days
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_age": "1d",
            "max_size": "50gb"
          }
        }
      },
      "delete": {
        "min_age": "14d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}

```

- hot: transaction or action이 지속적으로 일어나고있는 상태
- rollover: hot → warm 으로 변경되는 시점, 이후 제시한 조건에 일치하는지 확인
	- 위예시 설명: 인덱스가 하루이상되었거나, 50g 이상 사용하고 있을 경우 다음 페이즈로 넘어간다
	- 위 경우 delete로 넘어감
		- 이후 14일 이상 된 index일 경우 삭제함.