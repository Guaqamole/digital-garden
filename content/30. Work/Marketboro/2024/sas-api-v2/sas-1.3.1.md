## parameters
```json
"params":{"delivery":"parcel","highlight":"0","shop_id":"","user_funnel":"NL","size":"80","vendor_ids":"","query":"낑깡","from":"1","sort":"rel_desc","area_id":"692"}
```

## query
```json
{
  "explain": true,
  "track_total_hits": true,
  "from": 0,
  "size": 80,
  "query": {
    "function_score": {
      "query": {
        "bool": {
          "must": {
            "dis_max": {
              "queries": [
                {
                  "constant_score": {
                    "filter": {
                      "match": {
                        "match_text_fm": {
                          "query": "낑깡",
                          "operator": "and"
                        }
                      }
                    },
                    "boost": 10
                  }
                },
                {
                  "constant_score": {
                    "filter": {
                      "match": {
                        "match_text_fm.bigram": {
                          "query": "낑깡",
                          "operator": "and"
                        }
                      }
                    },
                    "boost": 10
                  }
                },
                {
                  "constant_score": {
                    "filter": {
                      "match": {
                        "match_text_pm": {
                          "query": "낑깡",
                          "operator": "or"
                        }
                      }
                    },
                    "boost": 1
                  }
                }
              ]
            }
          },
          "filter": [
            {
              "bool": {
                "must": [
                  {
                    "term": {
                      "goods_use_yn": true
                    }
                  },
                  {
                    "term": {
                      "goods_del_yn": false
                    }
                  },
                  {
                    "term": {
                      "vendor_use_yn": true
                    }
                  },
                  {
                    "term": {
                      "orderable": true
                    }
                  },
                  {
                    "term": {
                      "listing_yn": "y"
                    }
                  },
                  {
                    "bool": {
                      "minimum_should_match": 1,
                      "should": [
                        {
                          "term": {
                            "delivery_type": "2"
                          }
                        }
                      ]
                    }
                  }
                ],
                "must_not": []
              }
            }
          ]
        }
      },
      "functions": [
        {
          "script_score": {
            "script": {
              "source": "return _score"
            }
          }
        }
      ],
      "boost_mode": "replace"
    }
  },
  "sort": [
    {
      "_score": "desc"
    },
    {
      "discount_price": "asc"
    }
  ],
  "aggs": {}
}
```