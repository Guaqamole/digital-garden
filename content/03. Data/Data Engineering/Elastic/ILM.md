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
```json
PUT /<index_name>/_settings
{
	"lifecycle.name": "my_policy"
}
```

## ilm policy
```json
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "set_priority": {
            "priority": 0
          }
        }
      },
      "delete": {
        "min_age": "2d", <-- Set your TTL here
        "actions": {
          "delete": {
            "delete_searchable_snapshot": true
          }
        }
      }
    }
  }
}
```

