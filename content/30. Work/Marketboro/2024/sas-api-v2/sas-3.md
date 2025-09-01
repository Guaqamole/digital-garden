## parameters
```json
"params":{"delivery":"all","highlight":"0","shop_id":"","user_funnel":"NL","size":"80","vendor_ids":"1695","from":"1","sort":"sales_desc","area_id":"","admin_sort":"vendor"}
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
            "match_all": {}
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
                                        "vendor_id": "1695"
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
                                        "vendor_id": "1695"
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
      "vendor_goods_order": "desc"
    },
    {
      "_score": "desc"
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
                                "bool": {
                                  "should": [
                                    {
                                      "term": {
                                        "vendor_id": {
                                          "value": "1838"
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
              "source": "if (doc['sales_quantity'].size() == 0) {return _score * 0.1} else if (doc['sales_quantity'].value == 0) {return _score * 1} else {return _score * Math.sqrt(doc['sales_quantity'].value)}"
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
    "vendor_goods_order": "desc",
    "sales_quantity": "desc",
    "_score": "desc"
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