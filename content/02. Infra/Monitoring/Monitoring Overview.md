---
title: Monitoring Overview
date: 2024-03-08
draft: false
tags:
  - Monitoring
complete: true
---
# Introduction.
## 모니터링 관련 용어
### **Monitoring**
구글의 SRE book에서 모니터링은 쿼리 카운트, 에러 카운트, 처리 시간, 서버의 활성 시간과 같은 시스템에 관련된 정량적 수치를 실시간으로 수집, 처리, 집계, 보여주는 모든 행위라고 이야기 합니다.

쉽게 이야기 하면 signal(신호), telemetry(원격측정), trace(흔적)등을 수집하고 집계하는 행위를 말합니다. 예를 들면 데이터베이스 디스크 사용량이 설정한 임계치를 초과하고 알람이 발생(alert)되고 통지(notification)되고 난 후 관련 담당자가 이를 인지하고 스토지리 확장을 하는 일련의 행위를 모니터링이라고 정의할 수 있겠습니다.

참고: https://sre.google/sre-book/table-of-contents/
#### White-box Monitoring
로그, JVM의 프로파일링과 같은 인터페이스 류, 또는 내부 통계정보를 보내주는 HTTP 핸들러를 포함한 시스템의 내부에 의해 노출된 측정 기준에 근거한 모니터링을 말합니다.

이러한 유형의 수집은 운영상의 측정 데이터와 다양한 내부 구성요소의 상태를 노출하기 때문에 매우 효과적이며, 그렇지 않은 경우 내부를 확인하기 어렵고 불가능합니다.
#### Black-box Monitoring
사용자로서 관찰하듯 보이는 현상을 외부에서 테스팅하는 것을 말합니다.

호스트의 ICMP echo 응답 여부, 서비스 포트 오픈여부, HTTP 요청에 대해 정상적인 상태 코드(200)로 응답하는지 등 외부에서 관찰되는 방식으로 이뤄집니다.

### **Metric**
특정 시스템에서 리소스, 응용 프로그램 작업 또는 비즈니스 특성이 특정 시점에서의 수치로 표현되는 것을 말합니다. 이 정보는 집계(aggregation)된 형식으로 얻을 수 있습니다.

보통 키-밸류(key-value) 형태로 수집된 숫자가 일반적이고, 특정 요청에 대한 정확한 시간이 아닌 초당 요청 수를 확인할 수 있습니다.

### **Logging**
로깅은 메트릭보다 훨씬 많은 데이터를 포함하는 시스템이나 애플리케이션의 이벤트로 나타나며, 이러한 이벤트에 의해 생성되는 모든 정보를 포함합니다.

### **Tracing**
컨테이너 또는 쿠버네티스를 사용해 보신 분들은 아시겠지만 관련 리소스들이 동적으로 움직이기 때문에 일반적으로 추적(Track)이라는 용어를 사용합니다.

추적은 요청(request)이 모든 시스템에 걸쳐 전체 수명 주기 동안 추적될 수 있도록 고유한 식별자를 제공하는 로깅의 특별한 경우를 말합니다. 요청 횟수에 따라 데이터 셋이 증가하기 때문에 모든 요청을 추적하는 대신 샘플을 사용하는 것이 좋습니다.

### **Alerting**
메트릭 또는 로그의 지속적인 임계 값 유효성 검사이며, 설정된 임계 값 조건에 부합하는 경우 처리 또는 통지(notification)를 전송하는 것을 말합니다

### **Observability**
그런데 책이나 관련 기술문서를 보다보면 observability(관측성, 관측 가능성)이라는 용어가 더 많이 나옵니다. 이는 모니터링의 용어와 유사하지만 조금 다른 의미를 가지고 있습니다. 관측성은 시스템의 외부 시그널과 특성만을 가지고 내부 상태를 이해하고 판단하는 능력이나 수준을 이야기 합니다.

정의 자체로 보면 블랙박스 모니터링과 유사합니다.

관측성은 모니터링과 유사하지만 다른 관점으로 봐야합니다. 어떻게 보면 모니터링이 관측성의 하위 집합(set)이라고도 볼 수 있습니다.

관측성은 모니터링을 통해 상태를 확인하고 특정 임계치에 대한 알람을 발생하기 위해 메트릭을 수집, 집계하여 내부 동작과 모든 원인을 파악하는 행위 전체를 이야기합니다.

관측성은 예측 불가능한 모든 장애 가능성을 알 수 없다는 것을 전제로 시작합니다.

모니터링과 관측성의 차이를 예를 들어 설명해보겠습니다.

> 쇼핑몰을 운영중인데 사용자가 장바구니에서 할인쿠폰을 적용하는데 몇십초가 걸리는 불편이 발생하고 있습니다.
> 
> 운영팀이 모니터링 시스템을 통해 확인해보면 모든 CPU, Wait, 디스크 사용량, I/O, Queue, 시스템 상태 등 메트릭 임계값은 정상입니다.
> 
> 상세한 원인 분석을 위해 좀더 세밀한 데이터가 필요한 상황이 되었습니다
> 
> 서비스 대기 시간, 메시지 대기열 또는 데이터베이스에 관련된 인프라 홉과 같은 요청 경로를 추적하고 특정 사용자 및 요청에 대해 데이터베이스 쿼리가 실행된 수준까지 파악하고, 집계된 데이터를 분석하고 여러 도구들을 활용해서 문제 원인을 파악하는것을 관측성을 확보 한다고 볼 수 있습니다.

### **etc.**
#### CPU Saturation vs CPU Utilization
시스템의 CPU 성능을 나타내는 두 가지 다른 개념
1. **CPU Saturation (CPU 포화):**
    - CPU saturation은 시스템에서 사용 가능한 CPU 리소스가 작업을 처리하는 데 충분하지 않을 때 발생합니다.
    - 일반적으로 시스템이 현재의 작업 부하를 처리하기에 CPU 자원이 부족한 상태입니다.
    - 높은 CPU saturation은 대기 중인 작업이 많아서 작업을 처리하는 데 CPU가 포화된 상태를 의미합니다.
    - 너무 많은 작업이 동시에 실행되거나 CPU 성능이 제한적일 때 CPU saturation이 증가할 수 있습니다.
2. **CPU Utilization (CPU 활용도):**
    - CPU utilization은 현재의 작업 부하에 대한 CPU의 사용 정도를 나타냅니다.
    - 일반적으로 0%에서 100%까지의 범위로 표시되며, 100%는 CPU가 완전히 활용되고 있음을 나타냅니다.
    - 높은 CPU utilization은 CPU가 현재 작업에 대해 활발히 사용되고 있다는 것을 의미합니다.
    - 그러나 높은 CPU utilization이 항상 나쁜 것은 아닙니다. 시스템이 설계된 대로 처리량을 유지하고 있는 경우에는 정상적일 수 있습니다.

간단히 말해서, CPU saturation은 시스템이 현재의 작업을 처리하기에 CPU 리소스가 부족한 상태를 나타내고, CPU utilization은 현재의 작업에 대한 CPU의 사용 정도를 나타냅니다. CPU utilization이 높다고 항상 나쁜 것은 아니며, 시스템이 일반적인 작업 부하를 처리하는 동안 높은 CPU utilization이 나타날 수 있습니다.

## 모니터링의 대상과 목적
구글에서는 어떤 메트릭을 관측해야 하는지 정의를 해놨습니다. 골든 시그널(Golden Signal)이라고 해서 모니터링에 대한 구글의 원리는 매우 단순합니다.

- 지연시간(latency): 요청을 처리하는데 필요한 시간
- 트래픽(Traffic): 요청 횟수
- 에러(Errors): 실패한 요청 비율
- 포화도(Saturation): 일반적으로 대기하는, 처리되지 않은 작업의 수량

기본적으로 모니터링 시스템은 위에서 이야기 한것 처럼 화이트박스 모니터링 및 블랙박스 모니터링을 효과적으로 지원할 수 있어야 합니다. 화이트박스 모니터링을 통해 내부 실제 작동 상태를 이해할 수 있고, 잠재적 불확실성을 최소화하기 위해 시각화가 가능한 대시보드를 확인하여 발생 가능한 문제를 예측할 수 있습니다. HTTP Probe, TCP Probe 등과 같은 블랙박스 모니터링은 시스템 또는 서비스에 문제가 생겼을때 관련 담당자에게 신속하게 알릴 수 있습니다. 완벽한 모니터링 시스템을 구축하면 다음과 같은 목표를 달성 할 수 있습니다.

- 장기 추세 분석(long-term trend analysis) : 모니터링 샘플 데이터의 지속적인 수집을 통해 통계 데이터를 통해 장기 지표 분석이 가능합니다. 예를 들어, 디스크 사용량의 증가 속도를 판단하여 향후 용량 확장이 필요한 시점을 미리 예측할 수 있습니다.
- 비교 분석(comparative analysis) : 두 버전의 시스템 간 운영에 필요한 리소스 사용량의 차이를 확인할 수 있습니다. 두 시스템의 용량이 다른 경우에도 동시성(concurrency)이나 시스템 부하(load)를 확인하고 모니터링을 통해 쉽게 추적하고 비교할 수 있습니다.
- 알람(알림)(Alarm) : 시스템에 특정 이벤트가 발생할 때, 모니터링 시스템은 신속하게 확인하고 관리자에게 통지(notification)해야 하므로 비즈니스에 대한 영향을 최소화하기 위해 문제를 신속하게 처리하거나 사전에 문제를 예방할 수 있습니다.
- 장애 분석 및 근본원인 찾기 : 장애가 발생하면 문제를 조사하고 처리해야 합니다. 모니터링 및 기록 데이터 분석을 통해 근본 원인을 찾아서 해결할 수 있습니다.
- 데이터 시각화 : 시각적 대시보드를 통해 시스템 작동 상태, 리소스 사용량 및 서비스 작동 상태와 같은 직관적 인 정보를 직접 얻을 수 있습니다.

## 메트릭의 수집방식 (Pull vs Push)
모니터링을 이해하고 잘 활용하기 위해서는 메트릭 수집 방법에서 어떤 차이점이 있는지 명확한 이해가 필요하기 때문에 메트릭 수집 방법에 대해서 설명하려고 합니다.

일반적으로 메트릭 수집은 풀(pull)과 푸시(push) 두 가지 방식으로 나눌 수 있습니다.

푸시 기반 모니터링 시스템의 대표적인 시스템은 InfluxDB가 있으며 실행중인 응용프로그램이 메트릭 데이터를 모니터링 시스템에 적극적으로 Push해야 합니다.

Raw 이벤트 데이터를 처리하는 시스템은 일반적으로 이벤트 생성 빈도가 초당 수천, 수만건으로 매우 높기 때문에 일반적으로 푸시(Push) 방식을 선호합니다.

폴링(polling)되는 이벤트들을의 무결성과 정확도를 위해 버퍼링 메커니즘이 필요하고, 푸시(push)방법을 사용하는 시스템들로는 Riemann, StatsD, Elasticsearch, Logstash, Kibana(이하 ELK스택)가 있습니다.

앞서 언급된 유형의 시스템만이 푸시 방식을 지원하는 것이 아니며, Graphite, OpenTSDB 및 Telegraf, InfluxDB, Chronograph, Kapacitor (TICK)등 일부 모니터링 시스템은 푸시 방식을 사용하는 형태로 설계되어 있습니다.

![](https://miro.medium.com/v2/resize:fit:1400/1*QLuN_8xf4cztx_3qvNcFTg.png)

TICK Stack(Telegraf + InfluxDB + Chronograf + Kapacitor)

출처 : [https://www.influxdata.com/time-series-platform/](https://www.influxdata.com/time-series-platform/)

오래된 나기오스(Nagios) 또한 흔히 수동 검사라고 알려진 *Nagios Service Check Acceptor (NSCA)*를 통해 푸시 방식을 지원합니다.

반면 풀(Pul) 기반 모니터링 시스템은 응용프로그램으로 부터 직접 메트릭을 수집하거나, 프록시 처리를 통해 메트릭을 수집을 수행합니다. 풀 방식을 사용하는 주요 모니터링 소프트웨어는 나기오스 및 나기오스-스타일(Nagios-style) 시스템(Icinga, Zabbix, Zenoss, Sensu 등)이 있습니다. 프로메테우스(Prometheus) 또한 풀 방식을 채택한 시스템 중 하나입니다.

모니터링 커뮤니티에서는 이러한 설계에 따른 각각의 장점에 대해 많은 논쟁이 있습니다. 주요 논쟁의 포인트는 주로 타켓 디스커버리(target discovery)입니다.

푸시 기반 시스템에서 모니터링 호스트와 서비스는 모니터링 시스템과 정보를 전송함으로써 스스로의 상태를 인지합니다. 여기서 장점은 새로운 시스템이 수집 될 수 있도록 사전 정보가 필요하지 않다는 것입니다. 그러나 이것의 의미는 모니터링 서비스의 정보를 모든 대상(target)에 전달해야한다는 것이고 일반적으로 구성 관리 도구(configuration management)가 필요하게 됩니다.

풀 기반 모니터링 시스템은 모니터링 할 호스트 및 서비스의 목록이 이미 설정되어 있다는 가정에서 메트릭을 수집합니다. 그래서 모든 정보를 정확히 유지하고 변경사항을 갱신해야하는 단점이 있습니다. 오늘날의 인프라가 빠르게 변화함에 따라 전체 상황을 파악하기 위해서는 어떤 형태로든 자동 디스커버리 기능이 필요합니다.

결국, 각 방식의 단점은 자동화로 줄이거나 효과적으로 해결할 수 있습니다. 이후 프로메테우스와 쿠버네티스 모니터링 관련 포스팅에서도 따로 언급하겠지만 프로메테우스는 기존 모니터링 시스템의 단점들을 고려하여 설계된 중앙집중형 풀방식의 오픈소스 모니터링 솔루션입니다.

프로메테우스는 풀 기반의 모니터링 시스템이지만. 푸시에서 풀 방식으로 변환하는 게이트웨이를 사용하여 푸시 형태 메트릭을 수집하는 방법을 제공하고 있습니다. 푸시 방식은 매우 제한된 종류의 프로세스를 모니터링하는데 유용합니다.

---
# Application.
## 레이어별 메트릭 분리
토스 인프라팀에서는 메트릭을 Application, Network, OS 레이어별로 분리하여 수집한다고 한다.
![](https://i.imgur.com/YdX8Nhx.png)

### Application Layer Metric
토스의 서비스는 대부분 스프링 프레임워크로 이루어져 있어 스프링 관련 메트릭을 수집한다:
- jvm
- tomcat
- jpa
팀에따라 node, python 관련 메트릭도 지원하며, 오류와 가장 상관 관계가 높은 메트릭 순서로 보게된다.

### Network Layer Metric
**KeyPoint: 모든 네트워크 퍼널의 가시성을 확보**
네트워크 레이어의 경우 주로 서비스와 서비스 간의 통신 메트릭을 보게된다.

#### Network Error Flags
| UH     | no healthy Upstream Hosts     |      |
|:-----|:-----|:-----|
| UO     | Upstream Overflow     |      |
| NR     | No Route configured     |      |
| DC     | Downstream Connection termination     |      |
| UC     | Upstream Connection termination     |      |
| UT     | Upstream request Timeout     |      |
| UF     | Upstream connection Failure     |      |
| URX     | the request was rejected because of Upstream Retry Limit     |      |

### OS Layer Metric
**KeyPoint: 서버의 리소스가 얼마나 잘 배분되거나 부족한지 확인**
#### 모니터링 지표
- cpu
- memory
- network
- disk
- kernel

## The Use Method By Brendan Gregg
![](https://i.imgur.com/imc2mZF.png)

Netflix의 퍼포먼스 엔지니어가 만든 모니터링 분석 기법이며, 각 하드웨어 리소스별 문제가 있는지, 사용률이 높은지, 리소스가 포화되어 더이상 못쓰는 상태인지 등을 보고 각 리소스의 문제를 배제해 나가는 방식이다.
##### CPU Usage
`container_cpu_usage_seconds_total`
##### CPU Saturation
`container_cpu_cfs_throttled_periods_total`
`container_cpu_cfs_periods_total`
##### Memory Utilization
`container_cpu_usage_seconds_total`
##### Memory Saturation
`kube_pod_container_status_terminated_reason{reason="OOMKilled"}`
##### Disk Device Utilization
`container_fs_writes/reads_bytes_total`
##### Disk Device Saturation
`node_disk_io_time_seconds_total`
##### Disk Device Error
`node_filesystem_device_error`
##### Network Device Utilization
`container_network_receive/transmit_bytes_total`
##### Network Device Saturation
`ethtool로 측정한 drop 관련 메트릭 (tx_stat_discard)`

### Example
![](https://i.imgur.com/rSnlmv1.png)
