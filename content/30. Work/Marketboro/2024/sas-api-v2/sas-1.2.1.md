## parameters
```json
"params":{"delivery":"direct","highlight":"0","shop_id":"","user_funnel":"NL","size":"80","vendor_ids":"52,71,322,341,412,532,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,566,566,805,867,920,1186,1249,1391,1428,1499,1556,1589,1635,1649,1695,1702,1708,1845,1868,1872","query":"낑깡","from":"1","sort":"rel_desc","area_id":"692"}
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
                          "bool": {
                            "must": [
                              {
                                "bool": {
                                  "minimum_should_match": 1,
                                  "should": [
                                    {
                                      "term": {
                                        "vendor_id": "52"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "71"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "322"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "341"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "412"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "532"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "566"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "566"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "805"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "867"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "920"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1186"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1249"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1391"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1428"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1499"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1556"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1589"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1635"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1649"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1695"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1702"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1708"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1845"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1868"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1872"
                                      }
                                    }
                                  ]
                                }
                              },
                              {
                                "term": {
                                  "delivery_type": 1
                                }
                              }
                            ]
                          }
                        },
                        {
                          "term": {
                            "delivery_type": 2
                          }
                        }
                      ]
                    }
                  },
                  {
                    "bool": {
                      "minimum_should_match": 1,
                      "should": [
                        {
                          "bool": {
                            "must": [
                              {
                                "bool": {
                                  "minimum_should_match": 1,
                                  "should": [
                                    {
                                      "term": {
                                        "vendor_id": "52"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "71"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "322"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "341"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "412"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "532"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "566"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "566"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "805"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "867"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "920"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1186"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1249"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1391"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1428"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1499"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1556"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1589"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1635"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1649"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1695"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1702"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1708"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1845"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1868"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1872"
                                      }
                                    }
                                  ]
                                }
                              },
                              {
                                "term": {
                                  "delivery_type": 2
                                }
                              }
                            ]
                          }
                        },
                        {
                          "term": {
                            "delivery_type": 1
                          }
                        }
                      ]
                    }
                  },
                  {
                    "bool": {
                      "minimum_should_match": 1,
                      "should": [
                        {
                          "term": {
                            "delivery_type": "1"
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