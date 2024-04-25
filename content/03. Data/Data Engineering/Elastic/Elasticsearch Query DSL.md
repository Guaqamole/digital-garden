---
title: Elasticsearch Query DSL
date: 2024-04-12
draft: false
tags:
  - Elastic
complete: true
---
## 여러 검색 대상 지정
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

## 쿼리 문자열 검색
검색을 할때는
- QueryDSL을 사용하여 검색하는 방법과
- 요청 주소줄에 q라는 매개변수를 넣고 그곳에 Lucene Query 문자열을 지정해 검색하는 방법이 있다.
### Query DSL
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

### Query String
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

## Range Query
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


## Compound Query
### bool query (중요)
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
- MUST & FILTER 조건절에 들어간 하위 쿼리는 **모두 AND 조건으로 만족해야 최종 검색 결과에 포함된다.**
- MUST NOT 조건절에 들어간 쿼리를 만족하는 문서는 최종 검색 결과에서 제외된다.
- SHOULD 조건절에 들어간 쿼리는 `minimum_should_match` 에 지정한 개수 이상의 하위 쿼리를 만족하는 문서가 최종 검색 결과에 포함된다 (OR 조건). 

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

조건을 만족하는지 여부만이 중요하고 최종 검색 결과에서 랭킹에 영향을 주기 위해 유사도 점수를 매길 의미가 없는 조건이라면 필터 문맥으로 검색을 해야 성능상 유리하다.

#### 쿼리 실행 순서
must, filter, must_not, should 사이에 어떤 쿼리가 먼저 수행된다는 규칙은 없다. 또한 요청의 위쪽에 기술된 쿼리가 먼저 수행되는것도 아니다.
엘라스틱 서치는 검색 요청을 받으면 내부적으로:
1. 쿼리를 Lucene의 여러 쿼리로 쪼갠다
2. 쪼갠 쿼리를 조합하여 재작성한다. 
3. 그 뒤 쪼개진 각 쿼리를 수행할 경우의 비용을 측정한다.
4. 추정한 비용과 효과를 토대로 유리할 것으로 생각되는 부분을 먼저 수행한다.

### constant_score query
filter  부분에 지정한 쿼리를 필터 문맥에서 검색하는 쿼리다. 해당 쿼리에 매치된 문서의 유사도 점수는 일괄적으로 1로 지정된다.
```json
GET [index_name]/_search
{
    "query": {
        "constant_score": {
            "filter": {
                "term": {
                    "fileName": "hello"
                }
            }
        }
    }
}
```

**boost**
(선택사f항, float) 필터 쿼리와 일치하는 모든 문서에 대한 상수 관련성 점수로 사용되는 부동 소수점 숫자입니다. 기본값은 1.0입니다.
### dis_max query
Disjunction max의 줄임말. 멀티 키워드 검색을 수행시 여러 필드에서 검색을 수행하게 되는 조건에서 멀티 키워드의 키워드와 동일한 키워드의 score를 더욱 높이 평가 하는 방식을 제공

query와 정확히 일치하는 Document에 가장 높은 점수를 부여하고 나머지 subqueries에 대해 매칭될 경우 tie_braker의 값을 곱해 최종 점수를 계산한다. tie_braker의 기본값은 0.0이며 최대값은 1.0이다.

예를 들어 "코로나19 팬데믹" 이라는 두단어 키워드(멀티키워드)로 검색을 수행한다고 할 때..
```
제목 : 코로나 맥주 불티나
내용 : 코로나19의 위기 속 코로나 맥주 반짝 특수

제목 : 전염병 세계적 대유행
내용 : 코로나19 팬데믹 선언은 세계적 ...
```

위 두 검색결과중 첫번째 문서는 정확하게 매칭되는 결과가 있음에도 불구하고 코로나 키워드 빈도로 인한 첫번째 문장의 스코어가 더 높이 나오는 현상이 발생한다. 그렇다면 정확한 일치를 하는 문서2에 더 높은 점수를 주기 위한 방법은 없을까? 정답은 dis_max!

```json
GET test_msm/_search
{
  "query": {
    "dis_max": {
      "queries": [
        { "match": { "test": "dogs" }},
        { "match": { "test": "barking"}},
        { "match": { "test": "friends"}}
      ],
      "tie_breaker": 0.7
    }
  }
}
```

### function_score query
function_score를 사용하면 쿼리로 검색된 문서의 점수를 수정할 수 있습니다. 
예를 들어, score function이 계산 비용이 많이 들 때, 문서 집합을 필터링하여 점수를 계산하는 것으로 충분할 때 유용합니다.

function_score를 사용하려면 사용자가 쿼리를 정의하고 해당 쿼리로 검색된 각 문서에 대한 새 점수를 계산하는 하나 이상의 function을 정의해야 합니다.

검색 결과의 relevance score를 다양한 수식 조건을 활용하여 목적에 맞게 수정 할 수 있음
- score_mode : 각 문서에서 계산된 함수의 점수를 어떻게 결합할지 지정하는 역할
    - multiply, sum, avg, max, min, first
- boost_mode
    - multiply, sum, avg, max, min, replace

#### script score
원하는 스코어 계산식을 스크립트로 직접 타이핑하여 적용할 수 있는 기능(painless)
```json
GET /_search
{
  "query": {
    "function_score": {
      "query": {
        "match": { "message": "elasticsearch" }
      },
      "script_score": {
        "script": {
          "source": "Math.log(2 + doc['my-int'].value)"
        }
      }
    }
  }
}
```

#### weight
특정 쿼리에 원하는 만큼 가중치를 주는 기능
```json
"weight" : number
```

#### random score
0과 1사이의 랜덤한 값을 주는 기능(샘플링)
    - seed : 랜덤으로 준 값이 변하지 않도록 지정
```json
GET test_msm/_search
{
  "query": {
    "function_score": {
      "random_score": {
        "seed": 15,
      }
    }
  }
}
```

#### field_value_factor
각 필드 값에 원하는 규칙을 적용하여 스코어에 반영
- field : 수정할 필드 명
- factor : 곱할 값
- modifier : 수정 할 식
    - log : 필드 값에 로그 함수 적용
    - log1p : 필드 값에+1을 한 뒤 로그 함수 적용
    - log2p : 필드 값에 +2를 한 뒤 로그 함수 적용
    - ln : 필드 값에 자연 로그 함수 적용
    - ln1p : 필드 값에 자연 로그 함수 적용
    - ln2p : 필드 값에 +1을 할 뒤 자연 로그 함수 적용
    - square : 필드 값에 제곱 함수 적용
    - sqrt : 필드 값에 제곱근 함수 적용
    - reciprocal : 필드 값을 역수로 치환
- missing : 필드에 빈 값이 있을때 입력할 값
```json
GET clothes/_search
{
  "query": {
    "function_score": {
      "field_value_factor": {
        "field": "size",
        "factor": 1.5,
        "modifier": "square",
        "missing": 1
      }
    }
  }
}
```
## Routing
라우팅을 지정하지 않으면 전체 샤드에 검색 요청이 들어가기 때문에 정확히 한 샤드에만 검색 요청이 들어가게 하는것이 성능상 이득이 매우 크다.
```json
GET [index_name]/_search?routing=[routing]
```

## Sorting
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
