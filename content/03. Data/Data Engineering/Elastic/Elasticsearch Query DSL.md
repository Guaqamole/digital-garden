---
title: Elasticsearch Query DSL
date: 2024-04-12
draft: false
tags:
  - Elastic
complete: true
---
### 여러 검색 대상 지정
```json
GET fs-goods-v1-*,fs-goods-v2-*,mgeon-*,mapping*,products*/_search

{
    "took": 10,
    "timed_out": false,
    "_shards": {
        "total": 2,
        "successful": 2,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "mapping_test",
                "_id": "3",
                "_score": 1.0,
                "_source": {
                    "keywordString": "Hello, World!",
                    "textString": "Hello, World!"
                }
            },
            {
                "_index": "products",
                "_id": "bk-1",
                "_score": 1.0,
                "_source": {
                    "productId": "bk-1",
                    "productName": [
                        "감자",
                        "쌀",
                        "계란"
                    ],
                    "price": 123.0
                }
            }
        ]
    }
}
```

### 쿼리 문자열 검색
검색을 할때는
- QueryDSL을 사용하여 검색하는 방법과
- 요청 주소줄에 q라는 매개변수를 넣고 그곳에 Lucene Query 문자열을 지정해 검색하는 방법이 있다.
#### Query DSL
```json
GET my_index/_search
{
    "query": {
        "match": {
            "title": "hello"
        }
    }
}
```

#### Query String
[[Lucene Cheatsheet]] 참고해서 사용해보자.
```json
GET my_index/_search?q=title:hello
```

### Term Query
지정한 필드의 값이 질의어와 정확히 일치하는 문서를 찾는 쿼리
```json
GET [index_name]/_search
{
	"query": {
		"term": {
			"fieldName": {
				"value": "hello"
			}
		}
	}
}
```

### Terms Query
지정한 필드의 값이 질의어와 정확히 일치하는 문서를 찾는 쿼리이다. 대신 질의어를 여러개 지정할 수 있다.
```json
{
    "query": {
        "terms": {
            "fieldName": ["hello", "world"]
        }
    }
}
```

### Range Query
```json
{
    "query": {
        "range": {
            "dateField": {
                "gte": "2019-01-15T00:00:00.000Z||+36h/d",
                "lte": "now-3h/d"
            }
        }
    }
}
```
- now: 현재 시간
- || : 날짜 시간 문자열의 마지막에 붙힘. 이뒤에 붙은 문자열은 시간 계산식으로 파싱됨
- + & - : 지정된 시간 만큼 빼거나 더한다.
- / : 버림을 수행한다. 예를들어 `/d`는 날짜 단위 이하의 시간을 버림한다.
##### 시간 단위표

| 기호  | 단위  |
| --- | --- |
| y   | 연도  |
| M   | 월   |
| w   | 주   |
| d   | 날짜  |
| h   | 시간  |
| H   | 시간  |
| m   | 분   |
| s   | 초   |


### bool 쿼리
must, must_not, filter, should 의 4가지 종류의 조건절에 다른 쿼리를 조합하여 사용한다.
```json
{
    "query": {
        "bool": {
            "must": [
                {"term": {"field1": {"value": "hello"}}},
                {"term": {"field2": {"value": "world"}}}
            ],
            "must_not": [
                {"term": {"field3": {"value": "test"}}}
            ],
            "filter": [
                {"term": {"field4": {"value": true}}}
            ],
            "should": [
                {"match": {"field5": {"query": "elasticsearch"}}},
                {"match": {"field6": {"query": "lucene"}}}
            ],
            "minimum_should_match": 1
        }
    }
}
```
- MUST & FILTER 조건졸에 들어간 하위 쿼리는 모두 AND 조건으로 만족해야 최종 검색 결과에 포함된다.
- MUST NOT 조건절에 들어간 쿼리를 만족하는 문서는 최종 검색 결과에서 제외된다.
- SHOULD 조건절에 들어간 쿼리는 `minimum_should_match` 에 지정한 개수 이상의 하위 쿼리를 만족하는 문서가 최종 검색 결과에 포함된다. 

#### Query Context & Filter Context
must 와 filter는 모두 AND 조건으로 검색을 수행하지만 점수를 계산하느냐 여부가 다르다.

**Filter Context**
- filter 조건에 들어간 쿼리는 단순히 문서의 매치 여부만을 판단하고 랭킹에 사용할 점수를 매기지않는다.
- must_not 도 점수를 매기지 않는다.

**Query Context**
문서가 주어진 검색 조건을 얼마나 더 잘 만족하는지 유사도 점수를 매기는 검색과정은 쿼리 문맥이다.


|       | 필터 문맥                               | 쿼리 문맥                                     |
| ----- | ----------------------------------- | ----------------------------------------- |
| 질의 개념 | 문서가 질의어와 얼마나 잘 매치되는가                | 질의 조건을 만족하는가                              |
| 점수    | 계산함                                 | 계산하지 않음                                   |
| 성능    | 상대적으로 느림                            | 상대적으로 빠름                                  |
| 캐시    | 쿼리 캐시 활용불가                          | 쿼리 캐시 활용 가능                               |
| 종류    | bool must, bool should, match, term | bool filter, bool must_not, exists, range |

### Routing
라우팅을 지정하지 않으면 전체 샤드에 검색 요청이 들어가기 때문에 정확히 한 샤드에만 검색 요청이 들어가게 하는것이 성능상 이득이 매우 크다.
```json
GET [index_name]/_search?routing=[routing]
```

### Sorting
```json
{
    "query": {
        "match_all": {}
    },
    "sort": [
        {"goods_id": {"order": "desc"}},
        {"goods_regist_dt": {"order": "asc"}}
    ]
}
```

> [!warning] 
> 필드 타입 유형중 정렬에 사용할 수 있는 타입과 불가능한 타입이 있다:
> 
> 가능 : 숫자, date, boolean, keyword
> 불가: text
> 
> 만약 fielddata 를 true로 지정하면 text 타입도 정렬에 사용 할 수 있지만, 성능상 심각한 문제를 야기할 수 있어 특수한 경우가 아니면 사용하지 않는것이 좋다.

### Pagination
#### From & Size
아래와 같이 지정해 검색하면 유사도 점수로 내림차순 정렬된 문서들중 11번째부터 15번째 까지 5개 문서가 반환된다.
```json
GET [index_name]/search
{
	"from": 10,
	"size": 5,
	"query": {
		//....
	}
}
```
