---
title: PromQL
date: 2024-03-06
draft: false
tags:
  - Prometheus
  - MetaLabel
complete: true
---
## PromQL 사용하기
프로메테우스는 데이터를 쿼리하기 위해서 PromQL 이라고 하는 자체 쿼리 언어를 사용한다. PromQL은 사용 방법이 어렵지 않기 때문에 RDBMS의 쿼리문에 익숙한 사람들도 쉽게 사용 방법을 익힐 수 있다. 단, 프로메테우스는 Time-series DB이기 때문에 모든 쿼리는 Select문을 전제로 하며, CRud를 기본 원칙으로 한다.

모두 프로메테우스 공식 문서에 설명되어있는 내용들이지만, 자주 사용되는 것들만 다시 정리해 보았다.

### **4.1 기본 쿼리 사용 방법**
**Label Selector**
아무런 옵션 없이 Metrics의 이름만을 입력해 실행해도 PromQL로서 동작한다. 그러나 { }을 통해 Label 셀렉터를 추가할 수 있다. 아래의 예시는 method 라벨이 "get" 인 데이터만을 반환한다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTFfOTgg/MDAxNTU3NTg1NzI3NDU0.PKPXmJ5SKWrhQFy5Ry1yqVO-kULXuBpjHOsBFqNWEcUg.IzFN1CJqjnNgmZ0wu3GN0AMxjII2JW0rVLFRywAvdukg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_11.41.45.png?type=w2)

**특정 시간 이전부터 현재까지의 데이터 반환**
대괄호를 사용하면 현재를 기준으로 특정 시간 만큼의 데이터를 가져올 수 있다. 사용할 수 있는 시간 단위는 s, m, h, d, w, y 6가지이며, 반환되는 데이터는 Range Vector 타입이다. 아래의 예시는 최근 1분간의 데이터를 가져온다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTFfMjg4/MDAxNTU3NTg1ODkwMTk4.5HPweuP0rabL6R9bEFhubXt83IDWYtzhGxXXoOjp44sg.MK4t5ip91gCnherOLX53y5wxn0o8-0ExAP_C9QbSf-Ug.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_11.44.32.png?type=w2)

**정규 표현식을 사용한 Label 쿼리**
정규 표현식을 사용해 특정 라벨의 값을 가지는 데이터를 반환할 수 있다. 이 때, 정규 표현식은 [RE2 문법](https://github.com/google/re2/wiki/Syntax)을 따른다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTFfNzUg/MDAxNTU3NTg2NTAyMjM0.0D-4LPwo7J9zghFMnXRt912P6H_1mp1TDWkyHrM56w0g.rm6qV-csy9hAcz-YzZQZvYDxCxwg2vw5rvJNpDQG84kg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_11.54.47.png?type=w2)


**기본 연산자를 통한 데이터 쿼리**
다른 데이터 간에 같은 라벨을 가지는 데이터가 존재한다면, +, - 등의 연산이 가능하다. 예를 들어 아래와 같이 두 개의 라벨이 일치한다면,

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTAy/MDAxNTU3NTg2OTIyNDY0.NLhtDBUav5nZitYuWVkqDA3eZbRp4bECgn7C_7Jxl08g.7OZtNxLxj2qjRpXY-JKnappbPsNEKcpkqaZNEGTIHfYg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_12.01.34.png?type=w2)

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjY4/MDAxNTU3NTg2OTIyOTc4.RJAfhbsL7xERAULYGZ5P_WNgd8WHbMjzx-C6ddtRqrIg.M8DZb0-jLOGU4NgLk6J2J6bcdBhXhkx7gS_zuhu_ddMg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_12.01.47.png?type=w2)

아래와 같이 직접 데이터를 빼는 것이 가능하다. 값은 1069가 나올 것이다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTg4/MDAxNTU3NTg2ODcwMDIx.SsWsALEl2TGeoDSc-ZDe6z1zZUyQaD5HSsr5NO-zblgg.5xMTolCFaSxrWXH8H3oJWITA-ZOSTVcDId38C5GtXpwg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_12.00.11.png?type=w2)

> **Tip** : up은 해당 Target이 정상적으로 응답을 반환하고 있는지를 나타내는 Heart beat 데이터이다. 기타 이유로 인해 Target이 데이터를 반환하지 않고 있다면 Value 값은 0으로 변경된다. up은 프로메테우스에 의해 자동적으로 기록되는 데이터이며, 이러한 데이터의 종류에는 scrape_duration_seconds, scrape_samples_scraped 등이 있다.

한 가지 궁금한 점은, 두 개의 Target에서 들어오는 데이터의 Timestamp가 다른 경우도 분명 존재할 텐데.. 서로 매칭이 되는 데이터를 어떻게 구분하는 것인지를 모르겠다. 공식 문서에서는 all sharing the timestamp 라는 추상적인 말만 존재할 뿐, 해당 범위가 얼마나 되는지에 대해서는 구체적인 언급이 없다. (Staleness의 기본 값인 5분과는 관련이 없음은 명확하다)

### **4.2 Recording Rules**
**prometheus.yml 에서의 rule 정의를 통한 데이터 재정의**
저장된 데이터가 많아질수록 쿼리의 처리 속도는 느려지기 마련인데, 이를 보완하기 위한 방법으로 프로메테우스는 recording rule이라는 기능을 제공하고 있다. 자주 사용되는 쿼리는 prometheus.yml 파일에 별도로 정의해 놓은 뒤, 주기적으로 (기본 값은 60초) rule에 정의된 쿼리를 수행해 그 결과물을 새로운 데이터 Metrics로서 다시 저장하는 것이다. 즉, Grafana와 같은 시각화 툴에서 지속적으로 쿼리가 발생할 때 동반될 수 있는 부하를 평소에 분담할 수 있게 된다. [(공식 문서)](https://prometheus.io/docs/prometheus/latest/querying/basics/#avoiding-slow-queries-and-overloads) [(공식 문서 2)](https://prometheus.io/docs/practices/rules/)

간단한 예시를 들어보자. 아래의 내용으로 prometheus.rules.yml 파일을 작성한다.
```yaml
groups:
- name: example
  rules:
  - record: data:alicek106_gauge:gauge_minus_one
    expr: alicek106_gauge - up
```
  

prometheus.yml 파일 중, rule_files 항목을 추가한다.
```yaml
global:
  scrape_interval: 10s
  scrape_timeout: 5s
**rule_files:**
  **- 'prometheus.rules.yml'**
scrape_configs:
...
```

이전 포스트에서 사용한 프로메테우스 컨테이너를 계속 사용하고 있다면, 기존 컨테이너를 삭제한 뒤 rule 파일을 포함하는 새로운 컨테이너를 다시 생성한다. 물론, 실제 운영 환경에서는 이렇게 하면 안된다. k8s의 Configmap으로 설정을 관리하는 것이 좋다.
```sh
$ docker rm -f prometheus

$ docker run -d --name prometheus -h prometheus -p 9090:9090 \
 -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
 -v $(pwd)/prometheus.rules.yml:/etc/prometheus/prometheus.rules.yml \
 --network prom \
 prom/prometheus \
 --config.file=/etc/prometheus/prometheus.yml \
 --web.enable-lifecycle
```

잠시 후, Web UI에서 다시 데이터를 확인해 보면 rule에 의해 새로운 데이터가 지속적으로 생성되고 있음을 확인할 수 있다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMiAg/MDAxNTU3NTkwODU3MDc3.WQh7CXPAWAZWZT_WK6oKOnnhtRtZZpfKYvjSzSRS5KIg.Wb7323n8fImOfi3SSA35VvRtumoEQdR1Pcm3gYNGw2Qg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.07.17.png?type=w2)

  

### **4.3 자주 사용되는 함수들**
**sum, avg, rate 등의 함수**
내장된 함수들을 이용하면 PromQL의 활용도를 좀 더 높일 수 있다. 사용 가능한 모든 함수는 [공식 문서](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)를 참고하자.

sum 함수는 데이터의 Value 값을 합하는 간단한 함수이다. 예를 들어 아래와 같은 데이터가 존재한다면
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfNjUg/MDAxNTU3NTkxMzQyOTc5.vpTPNA0qSaq6d9ur5G_zzR-0Mad1Y4CrrKRZhq7qeiYg.0VDn2Gc6haxtAiryzAOvk4eovySvLzBKDtOeUD-UEBwg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.14.22.png?type=w2)

sum을 이용해 두 개의 데이터 값을 합할 수 있다.  
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfODcg/MDAxNTU3NTkxMzQzMzAx.xph9jSmDtosoTSlMgyngkLnVzjaA0KmAf8VQYnJQz1kg.sHIQIlzpoaI133zbUq-pYeOWa9KQ6o3KpVj5GOq3MHEg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.14.43.png?type=w2)

원한다면 **by 지시자**를 사용해 라벨 별로 데이터를 합칠 수도 있다. by 지시자는 모든 함수에서 사용할 수 있으며, 함수의 결과값에 라벨을 보존할 수 있는 방법이기도 하니 반드시 기억해두도록 하자. 아래의 예시는 instance, job 두 개의 라벨이 일치하는 데이터끼리 값을 합한다. (물론 이 예시에서는 동일한 Target에서 저장된 2개의 데이터만 존재하기 때문에 by (instance, job) 은 있으나 없으나 결과값은 동일하다)   
  
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMzgg/MDAxNTU3NTkxMzQzNTgw.a0D5wFYwIqvnbcXn6NKbW6D_mGdFAEssEQqjG4sMC3sg.nj4W3fss_Y7pGPYQq9Jlq1K9DlWIbwxYSJD_TaoeVfQg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.15.11.png?type=w2) 


avg 함수는 출력된 결과값들의 평균을 계산한다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTQw/MDAxNTU3NTkxNTc4MjAy.Xo1gFkFYnMBbNy4HfwthCP9KV5y2wruwwzHQ2po5WhEg.ytaDsNWvFdEhr_6B8gFlJTO2teVztsAqYy5qnJgm8Log.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.19.21.png?type=w2)

rate 함수는 조금 특별한데, 수집된 데이터의 1초 당 증감률을 계산한다. 예를 들어 10초간 수집되는 Target에서 5, 10, 15 .. 와 같은 데이터가 순서대로 저장되었다면 10초간 5의 값 상승이 있었으니 rate의 결과값은 0.5가 된다. 

내가 사용하고 있는 샘플 애플리케이션 컨테이너는 /metrics 요청이 수신될때마다 alicek106_gauge의 값이 5씩 상승하므로, 10초 당 5의 값이 상승하도록 구현되어 있다. 즉, 아래 쿼리의 결과값은 0.5가 된다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjE4/MDAxNTU3NTkxODAxNDU5.T_PYhgMEbnur7zR5GeQACkEnB0cwRTwmGGe0AsQN48og.b63hC7cETRj-VocmsuewiXpFaajEICN3S3Dw_n7yLlog.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.23.10.png?type=w2)

단, rate 함수의 인자는 Range Vector여야만 하므로 [5m] 과 같은 제한자와 함께 사용해야만 한다.

sum, avg, rate 정도가 자주 사용되는 함수인 것 같고, 그 외에는 그다지 자주 보지 못한 것 같다. (적어도 Prometheus Operator에서 기본적으로 사용하도록 설정된 rules에서는 그렇다는 이야기이고, 다른 함수의 기능이 필요하다면 스스로 찾아서 써야한다.) histogram 타입의 bucket 데이터와 quantile 함수를 이용하면 재밌는 연산을 할 수 있을 것 같은데, 지금 당장 필요하지는 않아 굳이 다루지 않기로 했다.

### **4.4 Join 쿼리문**
사실 프로메테우스 PromQL에서 가장 많이 사용하는 부분이 아닐까 한다. k8s의 Recording Rule을 얼핏 훑어보면 Join 쿼리문으로 도배가 되어 있는 진풍경을 볼 수 있다. 그렇기 때문에 Join 쿼리문은 반드시 알고 넘어가야만 한다. 한 가지 알아둘 것은, 프로메테우스에서는 이 기능을 Join이라고 부르지 않고 **Vector Match** 라고 부른다는 점이다.

**one-to-one Vector Matching**
one-to-one 매칭은 서로 계산할 데이터가 1개씩만 있을 때에 해당하는 Join이다. 예를 들어, HTTP 요청의 에러 횟수 데이터와 (http_errors) 성공 횟수 데이터 (http_requests) 가 각각 존재한다고 가정해보자. 이 때에는 아래와 같은 방법으로 요청의 에러 확률을 구할 수 있다. (물론 실제로는 이렇게 계산하지 않지만)

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfODUg/MDAxNTU3NTkzNTM0MzE4.FlHQP-Kw79YkKg8s91yUvQ1nuS4BOxxLq9gRWye2Kx8g.ZArypPgCVOHPjCxyR4u9jIXoUitXqSr4KJxpsVF65v8g.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.51.56.png?type=w2)

원칙대로라면 http_error와 http_requests의 라벨은 전부 동일해야만 / (나누기) 연산을 할 수 있다. 그러나 위 예시에서는 ignoring(code) 구문을 이용해 **"code 라벨은 무시하고 라벨간의 짝을 찾아라"** 라는 효과를 주었기 때문에, http_error와 http_requests는 **code 라벨을 제외한 나머지 라벨로 Join**을 수행하게 된다. 그리고 그 결과는 각 데이터 간 1:1 매칭이 되기 때문에, one-to-one Vector Matching에 속하게 된다. 

아래 그림과 위 그림을 번갈아 보면서 이해하도록 하자. 데이터 간 연산에서 code="500" 은 무시되는 것에 유의한다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjA0/MDAxNTU3NTkzNDU2NDU0.-eAQN3tlBNaXR9panGd-c9jaraYJ0KOmtkIZq8HD0pMg.rAN7BEQTw_1w3F8rI4cbfpu0eMV4CPd7pYa28X6aEDwg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_1.50.32.png?type=w2)

**one-to-Many, Many-to-one Vector Matching**
one-to-one 매칭이 1:1 매칭으로 쿼리를 수행하는 것이라면, one-to-Many와 Many-to-one은 1:N 또는 N:1 관계라고 할 수 있다. 말로 하는 것보다 직접 해 보는 것이 빠르므로 예시를 통해 살펴본다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTMw/MDAxNTU3NjI1NzMxMDE4.XjlEuhfSLJlmZ-j9c3_l_WVtRavUotW6uddb9lyAZlog.hKCUtTVMBZ4NxmE1nr-p_-JvvCdtWVJjp6wF99CD3Dsg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_10.48.21.png?type=w2)

이번에는 **group_left** 라는 구문이 추가되었다. 왼쪽에 위치한 데이터 (http_errors) 가 여러 개 (N개) 에 해당하니, 오른쪽 (http_requests) 을 기준으로 매칭을 수행하라는 뜻이다. 물론 one-to-one에서의 예시와 동일하게 ignoring(code) 를 통해 "code 라벨은 빼고 매칭을 진행하라" 라는 지시를 남겨두었다. 그리고 이를 시각화해서 나타내보면 아래와 같다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjI0/MDAxNTU3NjI2Mjk2MDk4.1jd89nYvdu_3b8VbYZX0UP1NScv2N6ecc1hcV6pdx_Ag.Pjlcpz0xAZtG5kbUlNLUvtvL2iQFIzVf-9swcYkOUPMg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_10.57.59.png?type=w2)

왼쪽의 그룹인 http_errors 데이터에서 2개의 데이터가 매칭되기 때문에 group_left 가 사용되었음에 유의하자. 만약 오른쪽에 위치한 데이터가 2개 이상의 데이터였다면, 즉 one-to-Many 관계의 데이터라면 **group_right**를 사용해야만 한다. 이 때 2개 이상의 데이터가 존재하는 쪽을 **high cardinality**를 가졌다고 말한다. 

예시를 몇 개 더 살펴보도록 하자. 특정 라벨에 대해서 매칭하려면 ignoring 대신 on을 사용하면 된다. 사실 on이 더 많이 쓰인다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTU4/MDAxNTU3NjI3NjU4ODQ1.8Mdg03Rn36nTylukbNEjLLPGSNKVtsjsco7HPLJPUIcg.89fFVvESTfejocoKJ5kTI240-8s7LEGf7qmPU4xH1Isg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%EC%A0%84_11.19.53.png?type=w2)

이렇게 on Match 연산을 할 때는 일치하는 라벨들만 결과값에 남게 된다. 예를 들어, on(method) 구문을 이용해 method 라벨이 일치하는 데이터들에 대해 연산을 수행했다면, 매치되지 않는 다른 라벨들은 버려지게 된다. 이 때, 낮은 cardinality의 데이터가 가지는 라벨을 group_left 또는 group_right에 인자로 넣음으로써 라벨을 보존할 수 있다. 

예를 들어보자. 아래는 alicek106/flask-prometheus-example:0.3 버전의 이미지를 사용한 예시이며, alicek106_http_requests 데이터에 success_message라는 라벨이 추가되어 있는 이미지 버전이다. (latest 이미지에는 해당 라벨이 없다)
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfNDkg/MDAxNTU3NjMxNDAzMzk0.c7NHyWY-O_6a2RNAVr4EupbSnXTJiOskb6yVHtyi9DMg.aDUdBPa1eMrZnGjWB3swVlYm0Vfmd2BUE-WMEOW_OdYg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_12.22.04.png?type=w2)

이 때, **alicek106_http_errors / on(method) group_left alicek106_http_requests** 를 사용한 결과값을 확인해보자. 당연하게도 낮은 cardinality를 가지는 데이터인 http_requests의 success_message  라벨은 소멸된다.
  
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTU2/MDAxNTU3NjMxNDAzNzk4.KFOlnXTx5S8CMxn2k5vG17KENoOJR55Dgz1cuQU7bCEg.mU3xTEju3uBRpR6wsjqQCKEpi3OsQ7NbBINrquvu24Qg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_12.22.44.png?type=w2)

  
group_left의 인자로서 success_message를 넣으면 http_requests의 라벨 데이터가 보존되는 것을 알 수 있다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMTA0/MDAxNTU3NjMxNDA0MTg3.68aa_SPdGM8jlnKW7DJ5GPFs3yLxtHr3IQK1crMtfx0g.tDoRQmC9zr1fdCYkQlFAMEdsh431GF02lndzMmAxbtgg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_12.23.04.png?type=w2)
  
이정도만 알아도 기존에 쓰여진 쿼리문들을 읽는 것에는 크게 무리가 없다. 실전 연습을 해보고 싶다면 Prometheus Operator를 설치해 k8s 의 Recording Rule의 쿼리들을 직접 보면서 익히도록 하자. 나 또한 그렇게 공부를 했다.
  
## **5. Meta Label을 사용해 기본 Label 설정하기** 
**5.1 Meta Label과 relabel 작업**
프로메테우스는 데이터를 Target으로 가져올 때, 기본적으로 Meta Label이라는 것을 함께 가져온다. 간단하게 이야기하자면 Target의 종류에 따라서 메타데이터를 함께 가져와 이를 기본 라벨로서 활용하는 것이다. 만약 정적인 Scrape를 통해 직접 Endpoint를 지정했다면, 웹 대시보드의 Target 페이지에서 아래와 같이 4개의 (job 포함해서) Meta Label이 붙어 있을 것을 확인할 수 있다. 
  
참고로, Meta Label은 일반적으로 __address__와 같이 두 개의 언더바 (_) 로 시작한다. 

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjE1/MDAxNTU3NjMxOTAyODIw.lF1yKKDx1OIBYzM7jE7p2M5yM4VPNg_xB3H0yWcCpO0g.28JH4fU59beF2oABqoFyCK0Qaix3jw4K023R9dxEQqog.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_12.31.30.png?type=w2)

이 라벨 중, job과 __address__ 는 프로메테우스가 자동적으로 instance와 job이라는 라벨로 변환해 기본 라벨로서 데이터에 포함시킨다. 모든 데이터에 기본적으로 instance와 job 라벨이 존재했던 것을 생각해보면 이해가 쉬울 것이다. 이처럼, 프로메테우스는 Target의 종류에 따라 Meta Label을 기본적으로 가져오는데, 이 Meta Label에 대해 **relabel**이라는 작업을 수행함으로써 기본적으로 포함될 라벨의 종류를 설정할 수 있다. Target의 종류는 AWS의 EC2가 될 수도 있고, 쿠버네티스가 될 수도 있다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfNDAg/MDAxNTU3NjMzODU2MTQ3.2MnMzB6OQHXwQk5iHLLq3bfgWPSPH6UTpBEXJcZl6HIg.ESFyM0ld_TqsnR0UurXVib8hQhHZencMwlCVWpqL71Ug.PNG.alice_k106/relabel.png?type=w2)

**5.2 Meta Label과 relabel 설정 예시**
예를 들어보자. 이제부터는 프로메테우스 단일 컨테이너따위는 집어 치우고, 사용하기 편한 Prometheus Operator를 기준으로 설명한다. Prometheus Operator의 웹 대시보드에 들어가 Configuration을 확인해 보면 아래와 같이 설정되어 있는 것을 볼 수 있다.
```yaml
  kubernetes_sd_configs:
  - role: endpoints
    namespaces:
      names:
      - monitoring
 
  relabel_configs:
  - source_labels: [__meta_kubernetes_service_label_app]
    separator: ;
    regex: prometheus-operator-alertmanager
    replacement: $1
    action: keep
...
  - source_labels: [__meta_kubernetes_namespace]
    separator: ;
    regex: (.*)
    target_label: namespace
    replacement: $1
    action: replace
```
1. 여기서 주목해야 할 부분은 kubernetes_sd_configs와 role: endpoints 부분이다. 이 부분은 쿠버네티스로부터 데이터를 받아오도록 Target을 설정하는 역할인데, endpoints는 endpoint 오브젝트로부터 데이터를 받아온다는 뜻이다. 물론, namespace가 monitoring으로 설정되어 있으니 해당 namespace의 endpoint 오브젝트의 데이터를 가져온다.

2. 두 번째로 중요한 부분은 relabel_configs 부분이다. 쿠버네티스의 Pod, Service 등의 오브젝트로부터 Meta Label이 함께 따라오게 되는데, 이 Meta Label에 따라 해당 Data Source의 데이터를 받아들일지를 결정한다. 위 예시에서는 k8s의 Service 오브젝트에 포함된 라벨 중, app 이라는 이름의 라벨1이 regex에 해당될 경우 (**__meta_kubernetes_service_label_app**) 해당 Target으로부터 데이터를 받아올 것이다 (**action: keep**).

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjUw/MDAxNTU3NjM1ODY2ODQ1.8M9dSE6MeBChWswqGohfVmYvCuVomI4IXXRYexyEhvQg.p7EpbSLpqoVPKNL-UcHdPuxJayp4se7lpblv-MqWAAUg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_1.37.28.png?type=w2)

3. 세 번째로 중요한 부분은, 해당 Data Source로부터 데이터를 받아들이기로 결정했다면 (action: keep) Meta Label을 어떤 식으로 가공해 기본 라벨로서 데이터에 포함시킬지를 설정하는 부분이다. 이 옵션들에 대해서는 뒤에서 다시 자세하게 이야기하겠지만, 위의 예시를 간단하게 설명하자면 __meta_kubernetes_namespace의 Meta Label 값이 무엇이든지간에 (.*) namespace 이라는 이름의 라벨로서 포함시키라는 의미이다. 따라서 해당 Target으로부터 들어오는 데이터에는 모두 namespace라는 이름의 라벨이 항상 기본적으로 존재할 것이다.


**5.3 모든 Meta Label과 relabel의 결과물 확인하기**

이러한 Meta label과 keep에 대한 값들은 웹 대시보드의 Service Discovery 항목에서 자세히 확인할 수 있다. 예를 들어, 위 설정에 해당하는 alertmanager의 Meta Label은 regex에 부합하기 때문에 아래처럼 Target Label로 변환 (relabel) 되어 저장되지만

![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjE2/MDAxNTU3NjM0NzkyMTYz.FlM7yK8M7GrRlHim_is5bBrZ-2FRi-fTEpa80dQr4Lsg.mmzzGIcSq8qwrgR7Xyt6mgXGQImuvA09TF6EqwXVQ0Yg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_1.19.31.png?type=w2)

조건에 부합하지 않는다면 아래처럼 drop 되는 것을 확인할 수 있다.
  
![](https://blogfiles.pstatic.net/MjAxOTA1MTJfOTUg/MDAxNTU3NjM0NzkyNDU1.IdhEFWaKsDCwTDIix5yrNd7a8_ntHe4CA-mg4O13ySgg.iukCvx8GA2sNg8pA8FUh-0SaVrq7u4ocTRzZPI_D51wg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_1.19.35.png?type=w2)

Target Labels에 존재하는 라벨들이 relabel의 결과물로서 생성된 기본 라벨들이며, 해당 Target으로부터 들어오는 데이터들은 모두 Target Labels로 구성된 기본 라벨들을 포함하고 있을 것이다. 참 쉽죠? 

그렇다면 이러한 Target의 종류는 얼마나 되는지 궁금할 수도 있는데, 프로메테우스는 쿠버네티스나 EC2 외에도 오픈스택과 같은 다양한 sd_configs를 지원하고 있다. 또한 이러한 Data Source로부터 얻을 수 있는 Meta Label의 목록 또한 확인할 수 있으니, 필요하다면 [공식 문서를 참고](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#ec2_sd_config)하도록 하자.
> **Tip** : kube-system, default 등의 namespace에 대한 Target 정보를 받아올 때는 kubernetes.default.svc API 서비스에 접근하는 것으로 보인다. 프로메테우스의 Configuration을 자세히 살펴보면 알 수 있겠지만, Operator가 속한 namespace를 제외한 namespace에 대해서는 Bearer Token을 명시하고 있기 때문이다 (kube-system, default). 이러한 것들에 대해 관심이 있다면 ServiceMonitor 오브젝트를 좀 더 살펴보는 것도 좋은 방법이다.
> 
>   
> 
> ![](https://blogfiles.pstatic.net/MjAxOTA1MTJfMjMg/MDAxNTU3NjM2NDIzNzkw.KRo_dmnhH3qS1HkJaUuXOtwGAwx86D5mVgo6FGYZ1A8g.yFsCkIZ6lZfHGZuXsss2npmFrg6Wap6cd3MJ0CphJPwg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-12_%EC%98%A4%ED%9B%84_1.46.45.png?type=w2)  

**5.4 relabel 설정의 자세한 사용 방법**
relabel에 대해 조사하면서 알게 된 것이 하나 있다. relabel은 의외로 프로메테우스에서 중요한 부분을 차지하는 것 같은데, 공식 문서에서는 relabel과 Meta Label의 자세한 사용 방법에 대해 일언반구도 없다는 것이다. regex, replacement, action, labelmap 등이 함께 섞여 이해하기 힘든 그랜드슬램을 달성하고 있는데도 말이다.

그나마 relabel 설정 값들에 대해 설명을 잘 해 놓고 있는 블로그 링크를 함께 첨부하니, 궁금하다면 Prometheus Operator의 Configuration 값들과 대조해가면서 직접 공부하는 것을 추천한다. 이해하고 나면 크게 어렵지는 않다.

  

그래도 아예 다루지 않는건 좀 그래서, 간단한 예제를 하나 준비해봤다.

```yaml
...
  - job_name: test_exporter
    metrics_path: /metrics
    scheme: http
    static_configs:
    - targets:
      - test_exporter:8080
 
    relabel_configs:
    - source_labels: [__metrics_path__]
      target_label: my_custom_metrics_label
      separator: ;
      regex: (.*metrics)
      replacement: $1
```

1. **source_labels** : __metrics_path__ 라는 이름의 기본 Meta Label에 대해서 적용한다.
2. **target_label** : 새롭게 포함될 기본 라벨 이름은 my_custom_metrics_label이다.
3. **seperator** : 2개 이상의 source_labels가 정의됬을 때 regex에서 사용하는 구분자. 지금은 필요가 없다.
4. **regex** : __metrics_path__ 라벨의 값을 정규 표현식으로 뽑아낸다. regex Group을 만들어 replacement에서 사용한다.
5. **replacement** : target_label의 이름의 라벨 값을 정규표현식으로 완성시킨다. 보통 abcd_$1 과 같은 방식으로 사용한다.