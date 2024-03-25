---
title: Prometheus Overview
date: 2024-03-06
draft: false
tags:
  - Prometheus
complete: true
---
## Overview
### **Features**
- 다차원 데이터 모델 가능 (Metrics 이름과 key-value를 활용하면 다차원 데이터 모델이 된다. 뒤에서 다시 설명)
- 다차원 데이터 모델을 활용할 수 있는 유연한 쿼리 언어 (PromQL)
- 분산 스토리지에 대해서 어떠한 의존성도 없음. 
- 모든 데이터는 **HTTP (REST) Pull 기반으로 가져온다**. 물론 Push도 가능은 함
- 모니터링 타겟은 프로메테우스의 YAML 설정값을 통해 Discovery
- Vertical - Horizontal [Federation 가능](https://prometheus.io/docs/prometheus/latest/federation/) (상위-하위 구조를 통한 Aggregation 가능)

솔직하게 이야기 하자면, PromQL이 사용하기 유연하며 다차원 데이터 모델이 가능하다는 이유만으로 프로메테우스를 도입할 수는 없다. [나의 이전 포스트에서 다뤘던 InfluxDB](https://blog.naver.com/alice_k106/221226137412)도 굳이 따지자면 이런 것들이 불가능한 것은 아니기 때문이다. 

프로메테우스의 가장 큰 특징이자 장점은 애플리케이션으로부터 Metrics를 가져올 때 **Pull** 방식으로 동작한다는 것이다. 예를 들어, 이전에 내가 작성했던 포스트에서의 CAdvisor + InfluxDB 조합과 같은 경우에는 아래와 같이 CAdvisor가 InfluxDB로 데이터를 Push하는 방식으로 동작한다.
![](https://i.imgur.com/uAYojoE.png)

위 방식은 CAdvisor가 항상 InfluxDB에 데이터를 전송하기 때문에, 데이터 백엔드를 변경하기 위해서는 모든 컨테이너의 설정 값을 변경해야 한다. Poly Backend가 불가능하다는 뜻이다. 뿐만 아니라 **모니터링하려는 대상에 대한 설정 또한 InfluxDB가 아닌 애플리케이션에 내장되어 있기 때문에 모니터링 대상을 유연하게 변경하기 어렵다는 단점**도 있다. InfluxDB에 장애가 생겼을 때에도 각 애플리케이션이 데이터를 계속해서 InfluxDB에 전송하려고 시도하기 때문에 불필요한 트래픽 부하가 발생할 수도 있다.

그러나 프로메테우스는 이와 달리 대상 애플리케이션의 Exporter Endpoint로부터 데이터를 긁어 (Scrape) 가져오는 방식으로 동작한다. 예를 들어, CAdvisor는 Metrics를 외부에 제공하기 위한 Exporter로서 (IP):8080/metrics를 노출하고 있고, 프로메테우스는 해당 Endpoint에 주기적으로 요청을 전송함으로써 데이터를 가져오는 식이다. 모든 모니터링 설정은 CAdvisor가 아닌 프로메테우스에서 관리되기 때문에 모니터링 대상이나 Metrics 수집 주기 등과 같은 옵션을 유연하게 변경할 수 있다는 장점이 있다.

만약 프로메테우스에 장애가 생기거나, 트래픽 부하 등으로 인해 모니터링을 일시적으로 중단한다고 해도 애플리케이션에게는 아무런 문제가 되지 않는다. 애플리케이션 입장에서는 단지 Metrics Endpoint를 준비해 놓고 누군가가 가져가기를 하염없이 기다리기만 하면 되기 때문이다.
### **Good**
Prometheus는 순전히 숫자로 표현되는 모든 시계열에 대해 효과적으로 작동합니다. 이는 기계 중심 모니터링과 높은 동적 서비스 지향 아키텍처의 모니터링 모두에 적합합니다. 마이크로서비스 환경에서 다차원 데이터 수집 및 질의를 지원하는 것이 특히 강점입니다.

Prometheus는 신뢰성을 위해 설계되어 있어 장애 발생 시 문제를 신속하게 진단할 수 있도록 합니다. 각 Prometheus 서버는 독립적이며 네트워크 저장소나 기타 원격 서비스에 의존하지 않습니다. 다른 인프라 부분이 고장났을 때에도 이를 신뢰할 수 있으며, 사용하기 위해 방대한 인프라를 설정할 필요가 없습니다.
### **Bad**
Prometheus는 신뢰성을 중요시합니다. 실패 상태에서도 언제나 시스템에 대한 어떤 통계가 사용 가능한지 확인할 수 있습니다. 개별 요청에 대한 정확도가 100% 필요한 경우(예: 개별 요청에 대한 빌링), 수집된 데이터가 충분히 자세하고 완전하지 않을 가능성이 있으므로 Prometheus는 좋은 선택이 아닙니다. 이러한 경우 빌링 데이터를 수집하고 분석할 다른 시스템을 사용하고 나머지 모니터링에는 Prometheus를 사용하는 것이 가장 좋습니다.

## Prometheus 데이터 구조
다음은 프로메테우스의 데이터 구조를 알아볼 차례다. 프로메테우스를 처음 접하면 매우 복잡하고 어려워 보이지만, PromQL까지 익히고 나면 나름 체계적으로 잘 만들어진 TSDB임을 알게 된다.

기본적인 데이터 구조는 아래와 같다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTFfMTE5/MDAxNTU3NTc0MTc4OTUy.EJzg-xjWjg6Z78K6xzWc5zFgi8C-EJPjQ_fhtBLaG5Ig.R-K8N5noNKtQzNuItdI8Yu8mU9_3jQTM6SBcTg4HAOUg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_8.29.24.png?type=w2)

  

**1. 데이터 이름** : Metrics를 구분하기 위한 고유한 이름이다. 프로메테우스에서는 데이터 이름을 입력하는 것만으로도 해당 데이터의 목록을 조회할 수 있다. 
  
**2. 라벨 (Label)** : 동일한 데이터에서 종류를 구분하기 위한 식별자이다. 같은 데이터 이름이라도 다른 라벨을 갖는 여러 개의 데이터가 존재할 수 있다. 프로메테우스의 쿼리는 대부분 라벨을 기준으로 수행된다. 예를 들어, 프로메테우스에 아래와 같이 method 라벨이 다른 두 개의 데이터가 존재한다고 가정해보자.
![](https://blogfiles.pstatic.net/MjAxOTA1MTFfMjk1/MDAxNTU3NTc0NjA0MjEx.wO63xU672ckW9bFYa0wjCp2hbAOCxFb283ndlaMN2ykg.luDVgXk1XLc4j1FNvQ9-uUgK0ZAsEj3cowscOIKqiOcg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_8.36.19.png?type=w2)

아래와 같이 쿼리를 입력함으로써 특정 라벨만을 가지는 데이터를 가져올 수 있다. 즉, {method="put"} 부분이 RDBMS의 where 문에 해당한다고 볼 수 있다. 너무 쉬워서 쿼리라고 말하기도 민망할 수준이다. PromQL에 대해서는 뒤에서 다시 설명한다.

![](https://blogfiles.pstatic.net/MjAxOTA1MTFfMjI5/MDAxNTU3NTc0NjA0NTUw.uBZmPJcezxbIXN-zn_D-_-mvvdy5v_VaTEaz7_DdVbwg.FpMOjRL5GhjHIr_oIuW_7bK2s_smijHzOo0IpRCI5H8g.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_8.36.30.png?type=w2)

**3. 데이터 값 : Scalar** : 데이터의 값을 나타내는 부분을 스칼라 (Scalar) 라고 한다. 좀 더 정확히 말하자면, 프로메테우스에서는 단순 숫자 값에 대해서는 모두 스칼라 라는 표현을 사용한다. 위에서 언급했던 것처럼, 프로메테우스는 스칼라 값으로서 float64 범위의 실수만을 사용할 수 있다.

그리고 위와 같은 데이터들은 prometheus.yml에서 정의된 Job의 Target 으로부터 수집되어 저장된다. 그렇다면 Target 에서 들어오는 데이터는 어떤 구조로 되어 있을까. 위에서 생성했던 샘플 애플리케이션의 /metrics Endpoint로 요청을 보내보면 아래와 같은 출력을 얻을 수 있다. (실제로 데이터가 어떻게 Export되는지가 궁금하자면, [나의 Github](https://github.com/alicek106/flask-prometheus-example/blob/master/__main__.py)에서 샘플 애플리케이션의 소스코드를 확인하는 것도 좋은 방법이다)

```sh
root@testbed:~# curl $(docker inspect test_exporter | \
  jq .[0].NetworkSettings.Networks.prom.IPAddress -r):8080/metrics --silent | \ grep alicek106_http_requests

# HELP alicek106_http_requests Test
# TYPE alicek106_http_requests gauge
**alicek106_http_requests{method="get"} 34.0**
**alicek106_http_requests{method="put"} 120.0**
```  

데이터에는 alicek106_http_requests라는 이름으로 **{method="get"}** 이라는 라벨만이 존재하며, 데이터와 스칼라 사이가 공백으로 구분되어 있음을 알 수 있다. 또한 샘플 애플리케이션의 Flask에서 Response를 **Plain Text**로 주었기 때문에 별도의 형식이 존재하지 않는 단순한 문자열로 구성되어 있다. 프로메테우스는 이러한 문자열 데이터를 받아들여 쿼리 가능한 데이터로서 내부에 저장한다.

**3.2 Sample, Instant Vector, Range Vector**
프로메테우스는 Time-series DB이기 때문에 시간과 함께 데이터를 저장한다. 그런데 위의 Web UI에서는 시간 데이터가 함께 출력되지 않고, 단순히 Metrics의 스칼라 값만 출력되었다. 이는 프로메테우스가 기본적으로 최신 데이터만을 출력하기 때문이며, 시간 데이터는 이에 가려져 출력되지 않도록 되어 있다.

그러나 특정 시간동안의 값을 가져오도록 하는 지정 제한자인 [ ] (대괄호) 를 사용하면 일정 시간 동안의 데이터를 가져올 수 있다. 아래의 쿼리는 alicek106_http_requests[1m] 이라는 제한자를 통해 최근 1분 동안의 데이터를 가져오는 예시를 보여주고 있다.
![](https://blogfiles.pstatic.net/MjAxOTA1MTFfNDcg/MDAxNTU3NTc2MDI0MDk2.0andYWq0SZnbmOnWqtYEIJU-8DUa8UxhNFR__ZkzK54g.vWT_LLQ-wdEx9xDzud-0ouY6AF4C9nB195MU5yGDLIYg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_9.00.10.png?type=w2)

이번에는 Value 항목에 @유닉스 타임스탬프 값이 추가되었다. prometheus.yml 파일에서 기본적으로 10초 주기로 데이터를 긁어 오도록 설정했기 때문에, timestamp 또한 10의 주기를 가지는 것을 알 수 있다. 

여기까지 이해했다면, 다음은 프로메테우스의 전문 용어에 대해 조금 더 알아야 할 필요가 있다. 프로메테우스에서는 **Instant Vector, Sample, Range Vector**라는 용어가 자주 등장하는데, 이를 그림으로 간단하게 설명하면 아래와 같다. (직관적인 이해를 위해 Instance, Job 라벨 항목은 표시하지 않았다)

![](https://blogfiles.pstatic.net/MjAxOTA1MTFfMTY1/MDAxNTU3NTc2OTg5NDU0.Rp_GsZ9VUQCuD2kvERR77FRfLx_Y7J_r68_F0LE-wxMg.OgKankUDQVAzzfJKRD1-_LJAB7s4oOKhGLYO6HoaBrsg.PNG.alice_k106/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2019-05-11_%EC%98%A4%ED%9B%84_9.16.13.png?type=w2)

  

alicek106_http_requests라는 데이터가 있다고 가정해보자. 이 데이터는 method가 get인 경우와 put인 경우 두 가지가 존재한다.

1.  단일 데이터 이름과 라벨, 스칼라 값으로 이루어진 한 개의 데이터를 **Sample** 이라고 지칭하며, 쿼리 결과값의 가장 기본 단위가 된다. 위와 같이 alicek106_http_request {method="put"} 6 이라는 단일 Metrics 데이터는 하나의 Sample이 된다.
2. 동일한 시간대에 속하는, 그러나 다른 라벨을 가진 데이터를 쿼리해 가져올 경우 **Instant Vector** 데이터 타입의 결과를 반환한다. 예를 들어, 위에서 단순히 데이터 이름만으로 검색했을 때 반환된 데이터 또한 Instant Vector 타입이라고 할 수 있다. 단지 가장 최신의 Instant Vector를 보여주고 있는 것 뿐이다.
3. 위에서 사용했던 alice_k106_http_requests[1m] 처럼 특정 시간대의 데이터를 가져올 경우, 쿼리 결과값의 데이터 타입은 **Range Vector**가 된다. Instant Vector가 특정 시간대의 Sample을 가로로 잘라서 가져온 결과의 데이터 타입이라면, Range Vector는 일정 시간대의 데이터를 가져오도록 쿼리를 사용했을 때의 결과 데이터 타입이다.