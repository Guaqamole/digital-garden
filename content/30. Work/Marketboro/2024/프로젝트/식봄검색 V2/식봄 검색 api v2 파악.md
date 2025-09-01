
![](https://i.imgur.com/fNBSb08.png)

## 1 단계: 호출 Case 정리
### "/api/v1/foodspring/goods/search","method":"GET"
#### main page
![|675](https://i.imgur.com/S6dx2uW.png)

#### headers
```python
{
  "x-datadog-parent-id": "7518743148482853848",
  "x-datadog-sampling-priority": "1",
  "Accept": "*/*",
  "ci_session": "6lg34ug0aa7jokv7c47ul4qh4jc11ipa",
  "x-datadog-trace-id": "491780138279898395",
  "Host": "172.31.2.132:16201"
}
```
#### params
```python
{
  "delivery": "direct",
  "user_funnel": "NL",
  "highlight": "0",
  "shop_id": "",
  "vendor_filter_target": "all",
  "size": "80",
  "vendor_ids": "",
  "count_only": "1",
  "query": "치즈",
  "from": "1",
  "sort": "rel_desc",
  "area_id": ""
}
```
#### response
```python
{
  "took" : 44,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits": {
	  "total": {
		  "value": 1515,
		  "relation": "eq"
	  },
	  "max_score": null,
	  "hits": [{ ...1 }, { ... 2 }, ...n documents]
  }
}
```


### /api/v1/foodspring/goods/search","method":"GET"
#### first_reco.params
- sort: first_reco
- delivery: NONE
- vendor_filter_target: direct
```python
{
  "user_funnel": "NL",
  "vendor_filter_target": "direct",
  "vendor_ids": "52,71,322,341,412,532,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,566,566,805,867,920,1186,1249,1391,1428,1499,1556,1589,1635,1649,1695,1702,1708,1845,1868,1872",
  "query": "로투스",
  "sort": "first_reco",
  "area_id": "692",
  "admin_sort": "false",
  "highlight": "false",
  "size": "1",
  "chuseok": "false",
  "from": "1",
  "1st_purchase": "true",
  "plan_id": "107"
}
```

#### Vendor filter: direct (first_reco)
```json
{
  "explain" : true,
  "track_total_hits" : true,
  "from" : 0,
  "size" : 1,
  "query" : {
    "function_score" : {
      "query" : {
        "bool" : {
          "must" : {
            "dis_max" : {
              "queries" : [ {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm" : {
                        "operator" : "and",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm.bigram" : {
                        "operator" : "and",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_pm" : {
                        "operator" : "or",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 1
                }
              } ]
            }
          },
          "filter" : [ {
            "bool" : {
              "must" : [ {
                "term" : {
                  "goods_use_yn" : true
                }
              }, {
                "term" : {
                  "goods_del_yn" : false
                }
              }, {
                "term" : {
                  "vendor_use_yn" : true
                }
              }, {
                "term" : {
                  "orderable" : true
                }
              }, {
                "term" : {
                  "listing_yn" : "y"
                }
              }, {
                "bool" : {
                  "minimum_should_match" : 1,
                  "should" : [ {
                    "bool" : {
                      "must" : [ {
                        "bool" : {
                          "minimum_should_match" : 1,
                          "should" : [ {
                            "term" : {
                              "vendor_id" : "52"
                            }
                          }, {
                            "term" : {
                              "vendor_id" : "71"
                            }, ..
                          } ]
                        }
                      }, {
                        "term" : {
                          "delivery_type" : 1
                        }
                      } ]
                    }
                  }, {
                    "term" : {
                      "delivery_type" : 2
                    }
                  } ]
                }
              }, {
                "bool" : {
                  "minimum_should_match" : 1,
                  "should" : [ {
                    "term" : {
                      "exist_first_plan" : true
                    }
                  } ]
                }
              } ],
              "must_not" : [ ]
            }
          } ]
        }
      },
      "functions" : [ {
        "script_score" : {
          "script" : {
            "source" : "return _score"
          }
        }
      } ],
      "boost_mode" : "replace"
    }
  },
  "sort" : [ {
    "delivery_type" : "asc"
  }, {
    "_score" : "desc"
  }, {
    "1st_discount_price" : "asc"
  } ],
  "aggs" : { }
}
```

----
#### all.params
- sort: rel_desc
- delivery: all
- vendor_filter_target: direct
```python
{
  "delivery": "all",
  "highlight": "0",
  "shop_id": "",
  "user_funnel": "NL",
  "size": "80",
  "vendor_filter_target": "direct",
  "vendor_ids": "52,71,322,341,412,532,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,560,566,566,805,867,920,1186,1249,1391,1428,1499,1556,1589,1635,1649,1695,1702,1708,1845,1868,1872",
  "query": "로투스",
  "from": "1",
  "sort": "rel_desc",
  "area_id": "692"
}
```

#### delivery: all
```python
{
  "explain" : true,
  "track_total_hits" : true,
  "from" : 0,
  "size" : 80,
  "query" : {
    "function_score" : {
      "query" : {
        "bool" : {
          "must" : {
            "dis_max" : {
              "queries" : [ {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm" : {
                        "operator" : "and",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm.bigram" : {
                        "operator" : "and",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_pm" : {
                        "operator" : "or",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 1
                }
              } ]
            }
          },
          "filter" : [ {
            "bool" : {
              "must" : [ {
                "term" : {
                  "goods_use_yn" : true
                }
              }, {
                "term" : {
                  "goods_del_yn" : false
                }
              }, {
                "term" : {
                  "vendor_use_yn" : true
                }
              }, {
                "term" : {
                  "orderable" : true
                }
              }, {
                "term" : {
                  "listing_yn" : "y"
                }
              }, {
                "bool" : {
                  "minimum_should_match" : 1,
                  "should" : [ {
                    "bool" : {
                      "must" : [ {
                        "bool" : {
                          "minimum_should_match" : 1,
                          "should" : [ {
                            "term" : {
                              "vendor_id" : "52"
                            }
                          }, {
                            "term" : {
                              "vendor_id" : "71"
                            }
                          } ...
                          } ]
                        }
                      }, {
                        "term" : {
                          "delivery_type" : 1
                        }
                      } ]
                    }
                  }, {
                    "term" : {
                      "delivery_type" : 2
                    }
                  } ]
                }
              } ],
              "must_not" : [ ]
            }
          } ]
        }
      },
      "functions" : [ {
        "script_score" : {
          "script" : {
            "source" : "return _score"
          }
        }
      } ],
      "boost_mode" : "replace"
    }
  },
  "sort" : [ {
    "_score" : "desc"
  }, {
    "discount_price" : "asc"
  } ],
  "aggs" : { }
}
```


---
#### direct.params
- sort: rel_desc
- delivery: direct
- vendor_filter_target: all
```python
{
   "delivery":"direct",
   "user_funnel":"NL",
   "highlight":"0",
   "shop_id":"",
   "vendor_filter_target":"all",
   "size":"80",
   "vendor_ids":"52,71,154,341,412,1823,1845,1868,1872",
   "count_only":"1",
   "query":"치즈",
   "from":"1",
   "sort":"rel_desc",
   "area_id":"46"
}
```


#### delivery: direct
```python
{
  "explain" : true,
  "track_total_hits" : true,
  "from" : 0,
  "size" : 1,
  "query" : {
    "function_score" : {
      "query" : {
        "bool" : {
          "must" : {
            "dis_max" : {
              "queries" : [ {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm" : {
                        "operator" : "and",
                        "query" : "치즈"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm.bigram" : {
                        "operator" : "and",
                        "query" : "치즈"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_pm" : {
                        "operator" : "or",
                        "query" : "치즈"
                      }
                    }
                  },
                  "boost" : 1
                }
              } ]
            }
          },
          "filter" : [ {
            "bool" : {
              "must" : [ {
                "term" : {
                  "goods_use_yn" : true
                }
              }, {
                "term" : {
                  "goods_del_yn" : false
                }
              }, {
                "term" : {
                  "vendor_use_yn" : true
                }
              }, {
                "term" : {
                  "orderable" : true
                }
              }, {
                "term" : {
                  "listing_yn" : "y"
                }
              }, {
                "bool" : {
                  "minimum_should_match" : 1,
                  "should" : [ {
                    "bool" : {
                      "must" : [ {
                        "bool" : {
                          "minimum_should_match" : 1,
                          "should" : [ {
                            "term" : {
                              "vendor_id" : "52"
                            }
                          },...
                          } ]
                        }
                      }, {
                        "term" : {
                          "delivery_type" : 1
                        }
                      } ]
                    }
                  }, {
                    "term" : {
                      "delivery_type" : 2
                    }
                  } ]
                }
              }, {
                "bool" : {
                  "minimum_should_match" : 1,
                  "should" : [ {
                    "term" : {
                      "exist_first_plan" : true
                    }
                  } ]
                }
              } ],
              "must_not" : [ ]
            }
          } ]
        }
      },
      "functions" : [ {
        "script_score" : {
          "script" : {
            "source" : "return _score"
          }
        }
      } ],
      "boost_mode" : "replace"
    }
  },
  "sort" : [ {
    "delivery_type" : "asc"
  }, {
    "_score" : "desc"
  }, {
    "1st_discount_price" : "asc"
  } ],
  "aggs" : { }
}
```

#### params
- delivery: parcel
- vendor_filter_taget: all
- sort: rel_desc
```python
{
  "delivery": "parcel",
  "highlight": "0",
  "shop_id": "",
  "user_funnel": "NL",
  "size": "80",
  "vendor_filter_target": "all",
  "count_only": "1",
  "query": "로투스",
  "from": "1",
  "sort": "rel_desc",
  "area_id": "692"
}
```


#### delivery: parcel
```python
{
  "explain" : true,
  "track_total_hits" : true,
  "from" : 0,
  "size" : 0,
  "query" : {
    "function_score" : {
      "query" : {
        "bool" : {
          "must" : {
            "dis_max" : {
              "queries" : [ {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm" : {
                        "operator" : "and",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_fm.bigram" : {
                        "operator" : "and",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 10
                }
              }, {
                "constant_score" : {
                  "filter" : {
                    "match" : {
                      "match_text_pm" : {
                        "operator" : "or",
                        "query" : "로투스"
                      }
                    }
                  },
                  "boost" : 1
                }
              } ]
            }
          },
          "filter" : [ {
            "bool" : {
              "must" : [ {
                "term" : {
                  "goods_use_yn" : true
                }
              }, {
                "term" : {
                  "goods_del_yn" : false
                }
              }, {
                "term" : {
                  "vendor_use_yn" : true
                }
              }, {
                "term" : {
                  "orderable" : true
                }
              }, {
                "term" : {
                  "listing_yn" : "y"
                }
              }, {
                "bool" : {
                  "minimum_should_match" : 1,
                  "should" : [ {
                    "term" : {
                      "delivery_type" : "2"
                    }
                  } ]
                }
              } ],
              "must_not" : [ ]
            }
          } ]
        }
      },
      "functions" : [ {
        "script_score" : {
          "script" : {
            "source" : "return _score"
          }
        }
      } ],
      "boost_mode" : "replace"
    }
  },
  "aggs" : { }
}
```
###
#### headers
#### params
#### response


## 2 단계: 파라미터 파악

## 3 단계: 세부 로직 파악