## parameters
```json
"params":{"delivery":"all","user_funnel":"NL,SW1M","highlight":"false","vendor_filter_target":"direct","size":"80","vendor_ids":"52,341,566,1186,1249,1868,1872,71,322,412,532,566,805,920,1391,1428,1499,1556,1589,1635,1649,1695,1702,1708,1845,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,867,560","count_only":"false","from":"1","sort":"sales_desc","category_ids":"20","area_id":"692","target":"goods"}
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
                                        "vendor_id": "52"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "341"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "566"
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
                                        "vendor_id": "1868"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "1872"
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
                                        "vendor_id": "920"
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
                                        "vendor_id": "867"
                                      }
                                    },
                                    {
                                      "term": {
                                        "vendor_id": "560"
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
                          "term": {
                            "category_l": "20"
                          }
                        },
                        {
                          "term": {
                            "category_m": "20"
                          }
                        },
                        {
                          "term": {
                            "category_s": "20"
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
      "sales_quantity": "desc"
    },
    {
      "_score": "desc"
    }
  ],
  "aggs": {}
}
```