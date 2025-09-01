## parameters
```json
"params":{"delivery":"all","highlight":"0","shop_id":"","user_funnel":"NL","size":"80","vendor_filter_target":"direct","vendor_ids":"52,71,322,341,412,532,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,566,566,805,867,920,1186,1249,1391,1428,1499,1556,1589,1635,1649,1695,1702,1708,1845,1868,1872","query":"치즈","from":"1","sort":"rel_desc","area_id":"692"}
```

## query_v2
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
                          "query": "치즈",
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
                          "query": "치즈",
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
                          "query": "치즈",
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
                      "should": [
                        {
                          "bool": {
                            "must": [
                              {
                                "bool": {
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
                                  ],
                                  "minimum_should_match": 1
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
                      ],
                      "minimum_should_match": 1
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

## query_v1
```json
{
  "from": 0,
  "size": 80,
  "track_total_hits": "true",
  "query": {
    "function_score": {
      "query": {
        "bool": {
          "must": [
            {
              "bool": {
                "should": [
                  {
                    "dis_max": {
                      "queries": [
                        {
                          "match": {
                            "goods_name": {
                              "query": "쌀 신동진",
                              "boost": 2,
                              "operator": "or",
                              "minimum_should_match": 1,
                              "_name": "normal"
                            }
                          }
                        },
                        {
                          "match": {
                            "goods_name.bigram": {
                              "query": "쌀 신동진",
                              "boost": 1,
                              "operator": "or",
                              "minimum_should_match": 1,
                              "_name": "bigram"
                            }
                          }
                        }
                      ],
                      "boost": 1,
                      "tie_breaker": 0
                    }
                  },
                  {
                    "match_phrase": {
                      "goods_name.bigram": {
                        "query": "쌀 신동진",
                        "boost": 1,
                        "_name": "phrase"
                      }
                    }
                  },
                  {
                    "multi_match": {
                      "query": "쌀.잡곡.견과",
                      "fields": [
                        "category_name^1.0f",
                        "category_path^1.0f"
                      ],
                      "type": "cross_fields",
                      "boost": 2,
                      "minimum_should_match": 1,
                      "_name": "category"
                    }
                  }
                ]
              }
            }
          ],
          "filter": [
            {
              "bool": {
                "must": [
                  {
                    "term": {
                      "goods_use_yn": {
                        "value": true
                      }
                    }
                  },
                  {
                    "term": {
                      "goods_del_yn": {
                        "value": false
                      }
                    }
                  },
                  {
                    "term": {
                      "vendor_use_yn": {
                        "value": true
                      }
                    }
                  },
                  {
                    "term": {
                      "listing_yn": {
                        "value": "y"
                      }
                    }
                  },
                  {
                    "bool": {
                      "should": [
                        {
                          "bool": {
                            "must": [
                              {
                                "term": {
                                  "delivery_type": {
                                    "value": "1"
                                  }
                                }
                              },
                              {
                                "bool": {
                                  "should": [
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "52"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "71"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "322"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "341"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "412"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "532"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "560"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "566"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "805"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "867"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "920"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1186"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1249"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1391"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1428"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1499"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1556"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1589"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1635"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1649"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1695"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1702"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1708"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1845"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1868"
                                        }
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1872"
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          "term": {
                            "delivery_type": {
                              "value": "2"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      "boost": "1",
      "functions": [
        {
          "script_score": {
            "script": {
              "source": "if (doc['sales_quantity'].size() == 0) { return _score + (doc['exist_cms_price'].value ? 1 : 0 * 3) + (doc['exist_plan_price'].value ? 1 : 0 * 3) + (doc['exist_1st_price'].value ? 1 : 0 * 3) + (doc['discount_rate_scaled'].value * 5)} else if (doc['sales_quantity'].value == 0) { return _score + (doc['exist_cms_price'].value ? 1 : 0 * 3) + (doc['exist_plan_price'].value ? 1 : 0 * 3) + (doc['exist_1st_price'].value ? 1 : 0 * 3) + (doc['discount_rate_scaled'].value * 5) } else { return _score + (Math.log(doc['sales_quantity'].value + 1)) + (doc['exist_cms_price'].value ? 1 : 0 * 3) + (doc['exist_plan_price'].value ? 1 : 0 * 3) + (doc['exist_1st_price'].value ? 1 : 0 * 3) + (doc['discount_rate_scaled'].value * 5)} "
            }
          }
        },
        {
          "filter": {
            "match": {
              "stock": {
                "query": 0
              }
            }
          },
          "weight": 0
        }
      ],
      "boost_mode": "replace"
    }
  },
  "_source": true,
  "explain": "true",
  "sort": {
    "orderable": "desc",
    "_score": "desc",
    "discount_price": "asc"
  },
  "highlight": {
    "fields": {
      "goods_name": {}
    },
    "pre_tags": [
      "<strong>"
    ],
    "post_tags": [
      "</strong>"
    ]
  }
}
```