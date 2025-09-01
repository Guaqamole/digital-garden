## parameters
```json
"params":{"delivery":"all","user_funnel":"NL,SW1M","highlight":"false","vendor_filter_target":"direct","size":"80","vendor_ids":"52,341,566,1186,1249,1868,1872,71,322,412,532,566,805,920,1391,1428,1499,1556,1589,1635,1649,1695,1702,1708,1845,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,867,560","count_only":"false","from":"1","sort":"sales_desc","category_ids":"1,3,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,7,8,9,10,11,12","area_id":"692","target":"goods"}
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
                            "category_l": "1"
                          }
                        },
                        {
                          "term": {
                            "category_m": "1"
                          }
                        },
                        {
                          "term": {
                            "category_s": "1"
                          }
                        },
                        {
                          "term": {
                            "category_l": "3"
                          }
                        },
                        {
                          "term": {
                            "category_m": "3"
                          }
                        },
                        {
                          "term": {
                            "category_s": "3"
                          }
                        },
                        {
                          "term": {
                            "category_l": "13"
                          }
                        },
                        {
                          "term": {
                            "category_m": "13"
                          }
                        },
                        {
                          "term": {
                            "category_s": "13"
                          }
                        },
                        {
                          "term": {
                            "category_l": "14"
                          }
                        },
                        {
                          "term": {
                            "category_m": "14"
                          }
                        },
                        {
                          "term": {
                            "category_s": "14"
                          }
                        },
                        {
                          "term": {
                            "category_l": "15"
                          }
                        },
                        {
                          "term": {
                            "category_m": "15"
                          }
                        },
                        {
                          "term": {
                            "category_s": "15"
                          }
                        },
                        {
                          "term": {
                            "category_l": "16"
                          }
                        },
                        {
                          "term": {
                            "category_m": "16"
                          }
                        },
                        {
                          "term": {
                            "category_s": "16"
                          }
                        },
                        {
                          "term": {
                            "category_l": "17"
                          }
                        },
                        {
                          "term": {
                            "category_m": "17"
                          }
                        },
                        {
                          "term": {
                            "category_s": "17"
                          }
                        },
                        {
                          "term": {
                            "category_l": "18"
                          }
                        },
                        {
                          "term": {
                            "category_m": "18"
                          }
                        },
                        {
                          "term": {
                            "category_s": "18"
                          }
                        },
                        {
                          "term": {
                            "category_l": "19"
                          }
                        },
                        {
                          "term": {
                            "category_m": "19"
                          }
                        },
                        {
                          "term": {
                            "category_s": "19"
                          }
                        },
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
                        },
                        {
                          "term": {
                            "category_l": "21"
                          }
                        },
                        {
                          "term": {
                            "category_m": "21"
                          }
                        },
                        {
                          "term": {
                            "category_s": "21"
                          }
                        },
                        {
                          "term": {
                            "category_l": "22"
                          }
                        },
                        {
                          "term": {
                            "category_m": "22"
                          }
                        },
                        {
                          "term": {
                            "category_s": "22"
                          }
                        },
                        {
                          "term": {
                            "category_l": "23"
                          }
                        },
                        {
                          "term": {
                            "category_m": "23"
                          }
                        },
                        {
                          "term": {
                            "category_s": "23"
                          }
                        },
                        {
                          "term": {
                            "category_l": "24"
                          }
                        },
                        {
                          "term": {
                            "category_m": "24"
                          }
                        },
                        {
                          "term": {
                            "category_s": "24"
                          }
                        },
                        {
                          "term": {
                            "category_l": "25"
                          }
                        },
                        {
                          "term": {
                            "category_m": "25"
                          }
                        },
                        {
                          "term": {
                            "category_s": "25"
                          }
                        },
                        {
                          "term": {
                            "category_l": "26"
                          }
                        },
                        {
                          "term": {
                            "category_m": "26"
                          }
                        },
                        {
                          "term": {
                            "category_s": "26"
                          }
                        },
                        {
                          "term": {
                            "category_l": "27"
                          }
                        },
                        {
                          "term": {
                            "category_m": "27"
                          }
                        },
                        {
                          "term": {
                            "category_s": "27"
                          }
                        },
                        {
                          "term": {
                            "category_l": "28"
                          }
                        },
                        {
                          "term": {
                            "category_m": "28"
                          }
                        },
                        {
                          "term": {
                            "category_s": "28"
                          }
                        },
                        {
                          "term": {
                            "category_l": "29"
                          }
                        },
                        {
                          "term": {
                            "category_m": "29"
                          }
                        },
                        {
                          "term": {
                            "category_s": "29"
                          }
                        },
                        {
                          "term": {
                            "category_l": "30"
                          }
                        },
                        {
                          "term": {
                            "category_m": "30"
                          }
                        },
                        {
                          "term": {
                            "category_s": "30"
                          }
                        },
                        {
                          "term": {
                            "category_l": "31"
                          }
                        },
                        {
                          "term": {
                            "category_m": "31"
                          }
                        },
                        {
                          "term": {
                            "category_s": "31"
                          }
                        },
                        {
                          "term": {
                            "category_l": "32"
                          }
                        },
                        {
                          "term": {
                            "category_m": "32"
                          }
                        },
                        {
                          "term": {
                            "category_s": "32"
                          }
                        },
                        {
                          "term": {
                            "category_l": "33"
                          }
                        },
                        {
                          "term": {
                            "category_m": "33"
                          }
                        },
                        {
                          "term": {
                            "category_s": "33"
                          }
                        },
                        {
                          "term": {
                            "category_l": "34"
                          }
                        },
                        {
                          "term": {
                            "category_m": "34"
                          }
                        },
                        {
                          "term": {
                            "category_s": "34"
                          }
                        },
                        {
                          "term": {
                            "category_l": "35"
                          }
                        },
                        {
                          "term": {
                            "category_m": "35"
                          }
                        },
                        {
                          "term": {
                            "category_s": "35"
                          }
                        },
                        {
                          "term": {
                            "category_l": "36"
                          }
                        },
                        {
                          "term": {
                            "category_m": "36"
                          }
                        },
                        {
                          "term": {
                            "category_s": "36"
                          }
                        },
                        {
                          "term": {
                            "category_l": "37"
                          }
                        },
                        {
                          "term": {
                            "category_m": "37"
                          }
                        },
                        {
                          "term": {
                            "category_s": "37"
                          }
                        },
                        {
                          "term": {
                            "category_l": "7"
                          }
                        },
                        {
                          "term": {
                            "category_m": "7"
                          }
                        },
                        {
                          "term": {
                            "category_s": "7"
                          }
                        },
                        {
                          "term": {
                            "category_l": "8"
                          }
                        },
                        {
                          "term": {
                            "category_m": "8"
                          }
                        },
                        {
                          "term": {
                            "category_s": "8"
                          }
                        },
                        {
                          "term": {
                            "category_l": "9"
                          }
                        },
                        {
                          "term": {
                            "category_m": "9"
                          }
                        },
                        {
                          "term": {
                            "category_s": "9"
                          }
                        },
                        {
                          "term": {
                            "category_l": "10"
                          }
                        },
                        {
                          "term": {
                            "category_m": "10"
                          }
                        },
                        {
                          "term": {
                            "category_s": "10"
                          }
                        },
                        {
                          "term": {
                            "category_l": "11"
                          }
                        },
                        {
                          "term": {
                            "category_m": "11"
                          }
                        },
                        {
                          "term": {
                            "category_s": "11"
                          }
                        },
                        {
                          "term": {
                            "category_l": "12"
                          }
                        },
                        {
                          "term": {
                            "category_m": "12"
                          }
                        },
                        {
                          "term": {
                            "category_s": "12"
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
                          "term": {
                            "category_id": {
                              "value": "1"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "3"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "13"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "14"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "15"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "16"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "17"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "7"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "8"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "9"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "10"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "11"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "12"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "18"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "19"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "20"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "21"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "22"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "23"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "24"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "25"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "26"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "27"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "28"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "29"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "30"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "31"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "32"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "33"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "34"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "35"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "36"
                            }
                          }
                        },
                        {
                          "term": {
                            "category_id": {
                              "value": "37"
                            }
                          }
                        }
                      ],
                      "minimum_should_match": 1
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