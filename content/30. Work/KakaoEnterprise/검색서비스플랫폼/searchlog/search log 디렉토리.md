아래에는 `/Log` 디렉토리 아래있는 Log들의 설명이다.
- http://guide.searchlog.daumtools.com/
- https://davinci.daumtools.com/display → 다빈치: 검색로그 코드 보는곳
- https://nodemon.daumtools.com/ → 노드몬: 다음검색에서 UI 보는곳
- https://wiki.daumkakao.com/display/slc/Search+Log → search log
- https://wiki.daumkakao.com/display/slc/DiaLog → dia log
- https://wiki.daumkakao.com/display/DAT/Search+%3A+Migrate → migrate log

```python
- hadoop-qm-workflow        searchquality        2023-06-22 14:01 /Log/Search
- hadoop-qm-workflow        searchquality        2024-11-07 16:04 /Log/Type=KEPSearch
- hadoop-searchquery-common searchquality        2024-10-17 15:46 /Log/Type=KSP
- bayes-han                 searchquality        2022-07-26 11:45 /Log/Type=KSP_old
- bayes-han                 searchquality        2022-07-28 10:29 /Log/Type=KakaoCommerce
- hadoop-qm-workflow        searchquality        2024-07-09 05:01 /Log/Type=Kakaoi
- hadoop-qm-workflow        searchquality        2024-07-09 05:04 /Log/Type=Kakaoi-withdrawal
- hadoop-qm-bsm             searchquality        2025-01-02 04:30 /Log/Type=Local
- ryon-steam                searchquality        2022-09-27 10:18 /Log/Type=NewTiara
- hadoop-qm-workflow        searchquality        2023-11-23 16:07 /Log/Type=Search
- hadoop-qm-datalab         searchquality        2025-01-07 13:11 /Log/Type=Shopping
- hadoop-qm-bsm             searchquality        2022-11-08 14:33 /Log/Type=TiaraCommerce
- hadoop-qm-srch1           searchquality        2023-07-04 10:45 /Log/UserProfile
```

그중에 search_log 목록은 다음과 같다:
https://wiki.daumkakao.com/display/slc/Search+Log
```python
- hadoop-qm-workflow    searchquality      2022-06-03 11:25 /Log/Type=Search/SubType1=3Tab
- hadoop-qm-workflow    searchquality      2022-06-03 11:37 /Log/Type=Search/SubType1=3TabMigrate
- hadoop-qm-workflow    searchquality      2025-01-13 12:59 /Log/Type=Search/SubType1=Davinci
- hadoop-qm-workflow    searchquality      2022-09-01 15:15 /Log/Type=Search/SubType1=Dialog
- hadoop-qm-h9-irf      searchquality      2022-09-27 12:02 /Log/Type=Search/SubType1=Freelog
- hadoop-qm-datalab     searchquality      2022-12-19 12:54 /Log/Type=Search/SubType1=Genie
- hadoop-qm-workflow    searchquality      2022-09-01 15:48 /Log/Type=Search/SubType1=Migrate
- albus-k               searchquality      2023-02-07 15:21 /Log/Type=Search/SubType1=Temp
```
## /Log/Type=Search/SubType1=Dialog
- query: 통검 → 통검프론트
- click: 클릭로그 → 컬렉션미들
- yscroll: collection별 로그 (뉴스, 날씨, 동영상등) → 검색로그플랫폼 
- dexpose: 동적노출로그 → 통검프론트 (밑으로 쭉 스크롤 내리다보면 동적으로 item 여러개 나오는것)

### Query
```python
import json

df3 = spark.read.json("/Log/Type=Search/SubType1=Dialog/SubType2=Hour/Device=Mobile/Kind=Query/Year=2025/Month=03/Day=31/Hour=15")
df3.show()

rows = df3.head(1)
dicts = [row.asDict() for row in rows]
json_result = json.dumps(dicts, indent=2)
print(json_result)
```

df3.show()
```python
root
 |-- adid: string (nullable = true)
 |-- adid_enabled: string (nullable = true)
 |-- bucket: struct (nullable = true)
 |    |-- id: string (nullable = true)
 |-- dacode: string (nullable = true)
 |-- display: struct (nullable = true)
 |    |-- CUT: array (nullable = true)
 |    |    |-- element: struct (containsNull = true)
 |    |    |    |-- code: string (nullable = true)
 |    |    |    |-- doc_count: long (nullable = true)
 |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |-- element: string (containsNull = true)
 |    |    |    |-- lineup_engine_score: long (nullable = true)
 |    |    |    |-- lineup_ranking_score: long (nullable = true)
 |    |-- SER: array (nullable = true)
 |    |    |-- element: struct (containsNull = true)
 |    |    |    |-- code: string (nullable = true)
 |    |    |    |-- doc_count: long (nullable = true)
 |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |-- carousel: struct (nullable = true)
 |    |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |    |-- gsid: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |    |-- co_watch: struct (nullable = true)
 |    |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |    |-- gsid: string (nullable = true)
 |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |-- kwd_cate: struct (nullable = true)
 |    |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |    |-- related: struct (nullable = true)
 |    |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |    |    |-- type: string (nullable = true)
 |    |    |    |    |    |-- relevant: array (nullable = true)
 |    |    |    |    |    |    |-- element: string (containsNull = true)
 |    |    |    |    |    |-- same_src: struct (nullable = true)
 |    |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |    |-- gsid: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |-- lineup_engine_score: double (nullable = true)
 |    |    |    |-- lineup_ranking_score: double (nullable = true)
 |    |-- SGR: array (nullable = true)
 |    |    |-- element: struct (containsNull = true)
 |    |    |    |-- code: string (nullable = true)
 |    |    |    |-- doc_count: long (nullable = true)
 |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |-- lineup_engine_score: long (nullable = true)
 |    |    |    |-- lineup_ranking_score: double (nullable = true)
 |    |-- SUI: array (nullable = true)
 |    |    |-- element: struct (containsNull = true)
 |    |    |    |-- code: string (nullable = true)
 |    |    |    |-- doc_count: long (nullable = true)
 |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |-- element: string (containsNull = true)
 |    |    |    |-- lineup_engine_score: long (nullable = true)
 |    |    |    |-- lineup_ranking_score: long (nullable = true)
 |-- extra: struct (nullable = true)
 |    |-- solar_0: struct (nullable = true)
 |    |    |-- collection: string (nullable = true)
 |    |    |-- contents: string (nullable = true)
 |    |    |-- display_code: string (nullable = true)
 |    |    |-- keyword_rule: string (nullable = true)
 |    |-- solar_1: struct (nullable = true)
 |    |    |-- collection: string (nullable = true)
 |    |    |-- contents: string (nullable = true)
 |    |    |-- display_code: string (nullable = true)
 |    |    |-- keyword_rule: string (nullable = true)
 |    |-- ua_hints: struct (nullable = true)
 |    |    |-- ua: string (nullable = true)
 |    |    |-- ua_arch: string (nullable = true)
 |    |    |-- ua_bitness: string (nullable = true)
 |    |    |-- ua_full_version_list: string (nullable = true)
 |    |    |-- ua_mobile: string (nullable = true)
 |    |    |-- ua_model: string (nullable = true)
 |    |    |-- ua_platform: string (nullable = true)
 |    |    |-- ua_platform_version: string (nullable = true)
 |    |    |-- ua_wow64: string (nullable = true)
 |-- hostname: string (nullable = true)
 |-- idc: string (nullable = true)
 |-- inflow_channel: string (nullable = true)
 |-- keyword_session_key: string (nullable = true)
 |-- marker: struct (nullable = true)
 |    |-- description: string (nullable = true)
 |    |-- level: string (nullable = true)
 |-- nation: string (nullable = true)
 |-- query: string (nullable = true)
 |-- query_string: string (nullable = true)
 |-- query_type: struct (nullable = true)
 |    |-- issue: boolean (nullable = true)
 |    |-- trend: boolean (nullable = true)
 |-- referer: string (nullable = true)
 |-- remote_ip: string (nullable = true)
 |-- request_time: string (nullable = true)
 |-- session_key: string (nullable = true)
 |-- ssn_sex: string (nullable = true)
 |-- tabcode: string (nullable = true)
 |-- transfer: struct (nullable = true)
 |    |-- auto: long (nullable = true)
 |    |-- clean: string (nullable = true)
 |    |-- koreng: long (nullable = true)
 |    |-- speller: long (nullable = true)
 |    |-- suggest: long (nullable = true)
 |-- user_agent: string (nullable = true)
 |-- user_id: string (nullable = true)
 |-- uuid: string (nullable = true)
 |-- vdid: string (nullable = true)
```

```python
[
  {
    "adid": "1d95f566-fabb-4cda-94bd-02b24403a99e",
    "adid_enabled": "Y",
    "bucket": [
      ""
    ],
    "dacode": "EKT",
    "display": [
      [],
      [
        [
          "TWA",
          6,
          [
            [
              null,
              null,
              "cafe-1E068/2GSs/557",
              "23sVQ2bTFX9MbV2wHl",
              null,
              null,
              null,
              null,
              "CCB"
            ],
            [
              null,
              null,
              "web-jo2to-jckXj0Oy40s_iRVy",
              "8dc9178f43b2e34b3f8915724d62b984fb46259b",
              null,
              null,
              [
                "same_src"
              ],
              [
                [
                  [
                    "web-jo2to-XiulB07yisjRZzmK",
                    "5e2ba5074ef28ac8d167398a1371107816bf444b",
                    "WSA"
                  ]
                ]
              ],
              "WSA"
            ],
            [
              null,
              null,
              "tstory-7673199_36",
              "22lA3mF-OTEY21_T0B",
              null,
              null,
              null,
              null,
              "BR1"
            ],
            [
              null,
              null,
              "web-namu-5H3di0p9LhkNzzIU",
              "e47ddd8b4a7d2e190dcf3214d75de25ba8bc341e",
              null,
              null,
              [
                "same_src"
              ],
              [
                [
                  [
                    "web-namu-QCJUYUpLQZ9kRFEW",
                    "402254614a4b419f644451164832e286e204cb0c",
                    "WSA"
                  ],
                  [
                    "web-namu-n6T3-945Un-AAvsn",
                    "9fa4f7fbde39527f8002fb2760d2395f856e6bbb",
                    "WSA"
                  ]
                ]
              ],
              "WSA"
            ],
            [
              null,
              null,
              "cafe-1Z3WG/D49M/385052",
              "23cjSb_lpcZjtfoqDY",
              null,
              null,
              null,
              null,
              "CCB"
            ],
            [
              null,
              null,
              "tstory-7019951_63",
              "22j7kagd0klBkM3nj9",
              null,
              null,
              null,
              null,
              "BR1"
            ]
          ],
          0.0,
          0.8205778261580351
        ],
        [
          "ST3",
          3,
          [
            [
              null,
              null,
              "tstory-6744774_54",
              "229zmPlNTBKwzCBtWr",
              null,
              null,
              null,
              null,
              "BR1"
            ],
            [
              null,
              null,
              "story-91912096_113511411920921829",
              "ce7a8b8203985dd3d0215c70a3b116c19c6ddbe3",
              null,
              null,
              null,
              null,
              "KAS"
            ],
            [
              null,
              null,
              "brch-fa53-35",
              "22E0KHE5Hug314LsiH",
              null,
              null,
              null,
              null,
              "BRC"
            ]
          ],
          0.0,
          0.8205678261580351
        ],
        [
          "VOI",
          4,
          [
            [
              null,
              null,
              "youtb-SY12bOoVWVk",
              "youtb-SY12bOoVWVk",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              "youtb-0fE1RTYbhYc",
              "youtb-0fE1RTYbhYc",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              "youtb-arzmbO5CtwA",
              "youtb-arzmbO5CtwA",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              "youtb-Us5qiRVYEHo",
              "youtb-Us5qiRVYEHo",
              null,
              null,
              null,
              null,
              ""
            ]
          ],
          0.0,
          0.06754768988415556
        ],
        [
          "DNS",
          4,
          [
            [
              null,
              null,
              null,
              "26E4D7gudvGQbwkH61",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "26mgiaxZUkFpUrFMgU",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "26DrKvomLClprvNdtp",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "26EyRH5Zv9Nt9sF19Y",
              null,
              null,
              null,
              null,
              ""
            ]
          ],
          2366.4444617,
          0.06580712991635557
        ],
        [
          "IIM",
          20,
          [
            [
              null,
              null,
              null,
              "6112x9OdlmyqfXzVNy",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "61XFF64uUOfoGT1KZB",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "619zjT1LQ_qZ1js2xY",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DXD-KMGrBZ0J7m6PV",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DYkpL7wQtjVgSKeCj",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6D-AdpZvUq0Gl9JOWu",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6D6GX3uqlx53ZS-Dzw",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DneEHaWO1n8NPXJr6",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "63MsuyKqwMB-Hj6Zhj",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DKRfiCVPdWqS3tCBr",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6D2jll9NyZ5-OtwNup",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6De7R9K-23XuhYFzOu",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6D_AjypCuQpNHKFdTK",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DjlgaTh8GSYkTWE72",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DnijoCWeWN_euSfr4",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6Dy3_27P_y-0jr190d",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "63Ah7hV43QCHiwQrxi",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6DN5Vz658Ep-u305UY",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "63YSRunCJfFV5vCVHS",
              null,
              null,
              null,
              null,
              ""
            ],
            [
              null,
              null,
              null,
              "6Dl0UdsSMrQqmCXrDq",
              null,
              null,
              null,
              null,
              ""
            ]
          ],
          0.3679798009136519,
          0.018433832
        ],
        [
          "0LL",
          1,
          [
            [
              null,
              null,
              null,
              "7adb4381-4ea5-4970-bdea-57dabd16d31c1",
              null,
              null,
              null,
              null,
              ""
            ]
          ],
          0.0,
          0.008792333
        ]
      ],
      [
        [
          "TRL",
          0,
          [],
          0,
          118.027363314
        ],
        [
          "NSJ",
          0,
          [],
          0,
          117.027363314
        ],
        [
          "NSC",
          5,
          [
            [
              "rel-2ebc19eb984c9ca08e7161d04a68e6a8",
              ""
            ],
            [
              "rel-83eb718bedd5c82ca8b38e986ac5d549",
              ""
            ],
            [
              "rel-abf4574254202460ed2c491cf12862ea",
              ""
            ],
            [
              "rel-f570b414884f7cd0a7d24fd7b8f2535f",
              ""
            ],
            [
              "rel-7185026d87084863e913a4b0b677c4e0",
              ""
            ]
          ],
          0,
          0.8204678261580352
        ],
        [
          "DCC",
          0,
          [],
          0,
          0.027363314
        ]
      ],
      []
    ],
    "extra": [
      null,
      null,
      [
        "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Android WebView\";v=\"134\"",
        "\"\"",
        "\"\"",
        "\"Chromium\";v=\"134.0.6998.109\", \"Not:A-Brand\";v=\"24.0.0.0\", \"Android WebView\";v=\"134.0.6998.109\"",
        "?1",
        "\"SM-M446K\"",
        "\"Android\"",
        "\"14.0.0\"",
        "?0"
      ]
    ],
    "hostname": "search-twig-prod-mo1",
    "idc": "",
    "inflow_channel": "i",
    "keyword_session_key": "bf359ccd-c063-40d3-b66b-b4aedde4da84",
    "marker": [
      "",
      ""
    ],
    "nation": "KR",
    "query": "5\ub300 \uc0c1\uae09\ubcd1\uc6d0",
    "query_string": "DA=EKT&o=1&q=5%EB%8C%80+%EC%83%81%EA%B8%89%EB%B3%91%EC%9B%90&rq=5%EB%8C%80+%EC%83%81%EA%B8%89%EB%B3%91%EC%9B%90&sugo=1&w=tot",
    "query_type": [
      false,
      false
    ],
    "referer": "https://m.search.daum.net/search?w=tot&q=5%EB%8C%80%20%EC%83%81%EA%B8%89%EB%B3%91%EC%9B%90&nzq=5%EB%8C%80%20%EC%A2%85%ED%95%A9%EB%B3%91%EC%9B%90&DA=NSJ",
    "remote_ip": "118.235.91.207",
    "request_time": "2025/03/31 15:00:00.290",
    "session_key": "c11c594f-f580-4525-a046-1542e0dcc3da",
    "ssn_sex": "",
    "tabcode": "tot",
    "transfer": [
      0,
      "N",
      0,
      0,
      0
    ],
    "user_agent": "Mozilla/5.0 (Linux; Android 14; SM-M446K Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/134.0.6998.109 Mobile Safari/537.36 DaumApps/8.1.1 DaumDevice/mobile",
    "user_id": "",
    "uuid": "gJ2zta72bmnf_240528598859831",
    "vdid": ""
  }
]
```


### Click
```python
import json

df4 = spark.read.json("/Log/Type=Search/SubType1=Dialog/SubType2=Hour/Device=Mobile/Kind=Click/Year=2025/Month=03/Day=31/Hour=17")

rows = df4.head(1)
dicts = [row.asDict() for row in rows]
json_result = json.dumps(dicts, indent=2)
print(json_result)
```

```python
root
 |-- action_type: string (nullable = true)
 |-- adid: string (nullable = true)
 |-- adid_enabled: string (nullable = true)
 |-- bucket: struct (nullable = true)
 |    |-- id: string (nullable = true)
 |-- click_count: long (nullable = true)
 |-- click_duration: long (nullable = true)
 |-- collection: struct (nullable = true)
 |    |-- code: string (nullable = true)
 |    |-- doc_count: long (nullable = true)
 |    |-- rank: long (nullable = true)
 |-- coords: struct (nullable = true)
 |    |-- res_x: long (nullable = true)
 |    |-- res_y: long (nullable = true)
 |    |-- x: long (nullable = true)
 |    |-- y: long (nullable = true)
 |-- dacode: string (nullable = true)
 |-- display: array (nullable = true)
 |    |-- element: string (containsNull = true)
 |-- document: struct (nullable = true)
 |    |-- abs_rank: long (nullable = true)
 |    |-- gsid: string (nullable = true)
 |    |-- id: string (nullable = true)
 |    |-- parent: struct (nullable = true)
 |    |    |-- abs_rank: long (nullable = true)
 |    |    |-- gsid: string (nullable = true)
 |    |    |-- id: string (nullable = true)
 |    |    |-- subcode: string (nullable = true)
 |    |-- relevant: string (nullable = true)
 |    |-- subcode: string (nullable = true)
 |-- extra: struct (nullable = true)
 |    |-- cktype: string (nullable = true)
 |    |-- cpid: struct (nullable = true)
 |    |    |-- value: string (nullable = true)
 |    |-- ency3dv: struct (nullable = true)
 |    |    |-- id: string (nullable = true)
 |    |    |-- type: string (nullable = true)
 |    |-- img: struct (nullable = true)
 |    |    |-- cpid: string (nullable = true)
 |    |    |-- ndid64: string (nullable = true)
 |    |-- kwd: struct (nullable = true)
 |    |    |-- requery: string (nullable = true)
 |    |-- mgc: struct (nullable = true)
 |    |    |-- 1depth_tab: string (nullable = true)
 |    |    |-- 2depth_tab: string (nullable = true)
 |    |    |-- PCBG: long (nullable = true)
 |    |-- muc: struct (nullable = true)
 |    |    |-- 1depth_tab: string (nullable = true)
 |    |    |-- 2depth_tab: string (nullable = true)
 |    |    |-- PCBG: long (nullable = true)
 |    |-- person: struct (nullable = true)
 |    |    |-- property: string (nullable = true)
 |    |-- trl: struct (nullable = true)
 |    |    |-- kwt: string (nullable = true)
 |    |-- twa: struct (nullable = true)
 |    |    |-- e2: string (nullable = true)
 |    |    |-- fsnirf: boolean (nullable = true)
 |    |    |-- rank: long (nullable = true)
 |    |    |-- topic: struct (nullable = true)
 |    |    |    |-- etc: long (nullable = true)
 |    |    |    |-- 건강: long (nullable = true)
 |    |    |    |-- 경제: long (nullable = true)
 |    |    |    |-- 레시피: long (nullable = true)
 |    |    |    |-- 미용/건강: long (nullable = true)
 |    |    |    |-- 사회: long (nullable = true)
 |    |    |    |-- 생활: long (nullable = true)
 |    |    |    |-- 스포츠: long (nullable = true)
 |    |    |    |-- 여행: long (nullable = true)
 |    |    |    |-- 연예: long (nullable = true)
 |    |    |    |-- 음식점: long (nullable = true)
 |    |    |    |-- 자동차: long (nullable = true)
 |    |-- ua_hints: struct (nullable = true)
 |    |    |-- ua: string (nullable = true)
 |    |    |-- ua_arch: string (nullable = true)
 |    |    |-- ua_bitness: string (nullable = true)
 |    |    |-- ua_full_version_list: string (nullable = true)
 |    |    |-- ua_mobile: string (nullable = true)
 |    |    |-- ua_model: string (nullable = true)
 |    |    |-- ua_platform: string (nullable = true)
 |    |    |-- ua_platform_version: string (nullable = true)
 |    |    |-- ua_wow64: string (nullable = true)
 |-- hostname: string (nullable = true)
 |-- idc: string (nullable = true)
 |-- inflow_channel: string (nullable = true)
 |-- item: struct (nullable = true)
 |    |-- extra_link: long (nullable = true)
 |    |-- ordering: long (nullable = true)
 |    |-- position: long (nullable = true)
 |    |-- sub_ordering: long (nullable = true)
 |-- keyword_session_key: string (nullable = true)
 |-- marker: struct (nullable = true)
 |    |-- description: string (nullable = true)
 |    |-- level: string (nullable = true)
 |-- nation: string (nullable = true)
 |-- page: long (nullable = true)
 |-- query: string (nullable = true)
 |-- query_string: string (nullable = true)
 |-- remote_ip: string (nullable = true)
 |-- request_time: string (nullable = true)
 |-- session_key: string (nullable = true)
 |-- tabcode: string (nullable = true)
 |-- url: string (nullable = true)
 |-- user_agent: string (nullable = true)
 |-- uuid: string (nullable = true)
 |-- vdid: string (nullable = true)
```

```python
[
  {
    "action_type": "func",
    "adid": "981af659-e26f-47f6-aecd-f368719e6c5c",
    "adid_enabled": "Y",
    "bucket": [
      ""
    ],
    "click_count": 1,
    "click_duration": 10,
    "collection": [
      "SNP",
      0,
      1
    ],
    "coords": [
      375,
      561,
      0,
      0
    ],
    "dacode": "SHB",
    "display": [],
    "document": [
      0,
      "",
      "",
      null,
      null,
      "SNP"
    ],
    "extra": [
      "direct",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [
        "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Android WebView\";v=\"134\"",
        "",
        "",
        "",
        "?1",
        "",
        "\"Android\"",
        "",
        ""
      ]
    ],
    "hostname": "search-vein-aminer1",
    "idc": "",
    "inflow_channel": "kc",
    "item": [
      22,
      0,
      0,
      null
    ],
    "keyword_session_key": "2df075aa-b367-4971-a750-b393da7433f6",
    "marker": [
      "",
      ""
    ],
    "nation": "KR",
    "page": 1,
    "query": "\uc640\uc774\uc990\ub9ac",
    "query_string": "DA=SHB&al=OFF&card_order=1&dc=SNP&fdc=SNP&mk=2df075aa-b367-4971-a750-b393da7433f6&q=%EC%99%80%EC%9D%B4%EC%A6%90%EB%A6%AC&sh=m&w=tot",
    "remote_ip": "175.194.178.204",
    "request_time": "2025/03/31 17:00:00.000",
    "session_key": "2df075aa-b367-4971-a750-b393da7433f6",
    "tabcode": "tot",
    "url": "",
    "user_agent": "Mozilla/5.0 (Linux; Android 14; SM-S916N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/134.0.6998.135 Mobile Safari/537.36 KAKAOTALK/25.2.1 (JDSEARCH)",
    "uuid": "w-ea5moqvJ7TfF_241122912729419",
    "vdid": ""
  }
]
```



### Dexpose
```python
[
  {
    "action_type": "spread",
    "adid": "981af659-e26f-47f6-aecd-f368719e6c5c",
    "adid_enabled": "Y",
    "bucket": [
      ""
    ],
    "dacode": "SHB",
    "display": [
      [
        "SNP",
        8,
        [
          [
            null,
            null,
            "F30722302158",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "W30714658608",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "F15894309691",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "P26428357779",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "K30938724823",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "P30938865411",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "K30939491302",
            null,
            null,
            null,
            null,
            "SNP"
          ],
          [
            null,
            null,
            "R30939926173",
            null,
            null,
            null,
            null,
            "SNP"
          ]
        ]
      ]
    ],
    "hostname": "search-twig-prod-mo1",
    "inflow_channel": "i",
    "keyword_session_key": "2df075aa-b367-4971-a750-b393da7433f6",
    "query": "\uc640\uc774\uc990\ub9ac",
    "query_string": "DA=SHB&cfg=1&ksk=2df075aa-b367-4971-a750-b393da7433f6&lv=2&m=SNP&mk=2df075aa-b367-4971-a750-b393da7433f6&page=1&q=%EC%99%80%EC%9D%B4%EC%A6%90%EB%A6%AC&qsearch=true&sh=16&ui=list&uk=97f3cb2b-ae36-40e1-9594-abd5e8fb80bc&viewsite=kc&w=tot",
    "referer": "https://m.search.daum.net/kakao?DA=SHB&al=OFF&card_order=1&dc=SNP&fdc=SNP&mk=2df075aa-b367-4971-a750-b393da7433f6&q=%EC%99%80%EC%9D%B4%EC%A6%90%EB%A6%AC&sh=m&w=tot",
    "remote_ip": "175.194.178.204",
    "request_time": "2025/03/31 17:00:00.803",
    "session_key": "2df075aa-b367-4971-a750-b393da7433f6",
    "ssn_sex": "",
    "tabcode": "tot",
    "user_agent": "Mozilla/5.0 (Linux; Android 14; SM-S916N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/134.0.6998.135 Mobile Safari/537.36 KAKAOTALK/25.2.1 (JDSEARCH)",
    "user_id": "",
    "uuid": "w-ea5moqvJ7TfF_241122912729419",
    "vdid": ""
  }
]
```

```python
root
 |-- action_type: string (nullable = true)
 |-- adid: string (nullable = true)
 |-- adid_enabled: string (nullable = true)
 |-- bucket: struct (nullable = true)
 |    |-- id: string (nullable = true)
 |-- dacode: string (nullable = true)
 |-- display: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- code: string (nullable = true)
 |    |    |-- doc_count: long (nullable = true)
 |    |    |-- documents: array (nullable = true)
 |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |-- carousel: struct (nullable = true)
 |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |-- gsid: string (nullable = true)
 |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |-- gsid: string (nullable = true)
 |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |-- related: struct (nullable = true)
 |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |    |-- type: string (nullable = true)
 |    |    |    |    |-- relevant: array (nullable = true)
 |    |    |    |    |    |-- element: string (containsNull = true)
 |    |    |    |    |-- same_src: struct (nullable = true)
 |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |-- gsid: string (nullable = true)
 |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |-- snippetA: struct (nullable = true)
 |    |    |    |    |    |-- documents: array (nullable = true)
 |    |    |    |    |    |    |-- element: struct (containsNull = true)
 |    |    |    |    |    |    |    |-- id: string (nullable = true)
 |    |    |    |    |    |    |    |-- subcode: string (nullable = true)
 |    |    |    |    |-- subcode: string (nullable = true)
 |-- hostname: string (nullable = true)
 |-- inflow_channel: string (nullable = true)
 |-- keyword_session_key: string (nullable = true)
 |-- query: string (nullable = true)
 |-- query_string: string (nullable = true)
 |-- referer: string (nullable = true)
 |-- remote_ip: string (nullable = true)
 |-- request_time: string (nullable = true)
 |-- session_key: string (nullable = true)
 |-- ssn_sex: string (nullable = true)
 |-- tabcode: string (nullable = true)
 |-- user_agent: string (nullable = true)
 |-- user_id: string (nullable = true)
 |-- uuid: string (nullable = true)
 |-- vdid: string (nullable = true)
```

### YScroll
```python
root
 |-- adid: string (nullable = true)
 |-- adid_enabled: string (nullable = true)
 |-- bucket: struct (nullable = true)
 |    |-- id: string (nullable = true)
 |-- coords: struct (nullable = true)
 |    |-- res_x: long (nullable = true)
 |    |-- res_y: long (nullable = true)
 |    |-- y: long (nullable = true)
 |-- dacode: string (nullable = true)
 |-- display: array (nullable = true)
 |    |-- element: struct (containsNull = true)
 |    |    |-- code: string (nullable = true)
 |-- hostname: string (nullable = true)
 |-- inflow_channel: string (nullable = true)
 |-- keyword_session_key: string (nullable = true)
 |-- query: string (nullable = true)
 |-- query_string: string (nullable = true)
 |-- remote_ip: string (nullable = true)
 |-- request_time: string (nullable = true)
 |-- session_key: string (nullable = true)
 |-- tabcode: string (nullable = true)
 |-- user_agent: string (nullable = true)
 |-- uuid: string (nullable = true)
 |-- vdid: string (nullable = true)
```

```python
[
  {
    "adid": "",
    "adid_enabled": "N",
    "bucket": [
      ""
    ],
    "coords": [
      412,
      787,
      1223
    ],
    "dacode": "STC",
    "display": [
      [
        "DNS"
      ]
    ],
    "hostname": "search-vein-aminer1",
    "inflow_channel": "i",
    "keyword_session_key": "7b1bfd2d-3307-4d45-ac47-9079cac7f580",
    "query": "\uae40\uc218\ud604",
    "query_string": "w=news&nil_search=btn&DA=STC&enc=utf8&cluster=y&cluster_page=1&q=%EA%B9%80%EC%88%98%ED%98%84&p=1&sort=recency",
    "remote_ip": "222.238.198.253",
    "request_time": "2025/03/31 17:00:00.029",
    "session_key": "2bf610d4-66eb-49fa-98e3-31333d078215",
    "tabcode": "news",
    "user_agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/27.0 Chrome/125.0.0.0 Mobile Safari/537.36",
    "uuid": "w-og5vA5GryKAA_250222115164558",
    "vdid": ""
  }
]
```

## /Log/Type=Search/SubType1=Migrate
```python
root
 |-- Query: string (nullable = true)
 |-- Tab: string (nullable = true)
 |-- MKey: string (nullable = true)
 |-- UUID: string (nullable = true)
 |-- BID: string (nullable = true)
 |-- ADID: string (nullable = true)
 |-- ADIDEnabled: string (nullable = true)
 |-- IP: string (nullable = true)
 |-- Bucket: string (nullable = true)
 |-- IOFlag: string (nullable = true)
 |-- ResultCount: long (nullable = true)
 |-- Timestamp: long (nullable = true)
 |-- Marker: string (nullable = true)
 |-- MarkerM: string (nullable = true)
 |-- MarkerRY: string (nullable = true)
 |-- DA: string (nullable = true)
 |-- Page: long (nullable = true)
 |-- UserYear: string (nullable = true)
 |-- UserSex: string (nullable = true)
 |-- UserAgent: string (nullable = true)
 |-- Referer: string (nullable = true)
 |-- QueryString: string (nullable = true)
 |-- QueryTypeIssue: boolean (nullable = true)
 |-- QueryTypeTrend: boolean (nullable = true)
 |-- KeywordSessionKey: string (nullable = true)
```

```python
[
  {
    "Query": "\uc544\uc138\ud1a4 \ubd84\uc790\uc2dd",
    "Tab": "tot",
    "MKey": "26891218-6306-4b24-8ed1-76ac4a74a08e",
    "UUID": "db365ab5-9ea7-4f3f-92ba-28b7f519c988",
    "BID": "",
    "ADID": "db365ab5-9ea7-4f3f-92ba-28b7f519c988",
    "ADIDEnabled": "Y",
    "IP": "10.92.150.177",
    "Bucket": "",
    "IOFlag": "kc",
    "ResultCount": 40,
    "Timestamp": 1743414240,
    "Marker": "",
    "MarkerM": "",
    "MarkerRY": "",
    "DA": "CAB",
    "Page": 1,
    "UserYear": "",
    "UserSex": "",
    "UserAgent": "KT/25.2.1 An/14 ko",
    "Referer": "",
    "QueryString": "DA=CAB&aa=db365ab5-9ea7-4f3f-92ba-28b7f519c988&al=OFF&q=%EC%95%84%EC%84%B8%ED%86%A4+%EB%B6%84%EC%9E%90%EC%8B%9D&sa_ua=KT%2F25.2.1+An%2F14+ko&sh=m&w=tot",
    "QueryTypeIssue": false,
    "QueryTypeTrend": false,
    "KeywordSessionKey": "26891218-6306-4b24-8ed1-76ac4a74a08e"
  }
]
```