## Prompt
```python
Straw라는 Json Object Storage에 API 호출을 해서 데이터를 가져온다음, 다른 Object Storage API 호출을 해서 데이터를 조인할거야.
Java Flink App으로 개발할거고, 나는 처음 flink app을 만드는거라 너가 자세한 도움을 주었으면해.

1. Web Data를 저장하고 있는 Straw, Html Data를 저장하고있는 Dyn API, 2개의 API가 존재해.
2. Straw의 Data Schema중, nextUrl 이라는 필드가 있어. 다음 데이터 필드를 의미하는 URL 이야. hasNext라는 필드가 false가 될때까지 계속 nextUrl을 Looping 하며 데이터 요청을 해야해.
3. Straw 요청 한번당 여러개의 데이터를 조회할 수 있는데, 각 리스트마다 Dyn API를 조회하여 HTML 데이터를 가져오고, 해당 리스트마다 데이터를 조인해야해.
4. 조인한 결과를 Straw 저장할거야.
5. Source: Straw, Dyn
6. Transform: Join Straw, Dyn
7. Sink: Another Straw.

내가 이제 하나씩 코드를 주며 flink에 대한 질문을 할 수 도있고 디자인 패턴을 물어볼수도있어. 자세한 예시와 background까지 알려줘.
```

## 개선점
### ~~Naming~~
- model
	- crawler
	- webhammer

### ~~dev,prod~~
- read from spec
- 모든 endpoint는 변수화

### ~~Zookeeper savepoint~~
- external
	- zookeeper conf

### 성능 올리기
- nextUrl은 싱글 쓰레드밖에 안되지 않나?
- 비동기 방식 호출할수 있지만 동기방식으로 하나?
#### 해결방안
- partition 갯수 늘리기
### test
- flink test 기법알아보기

### ~~Logging~~
- flink logging 알아보기

### ~~Alerting (나중)~~
- java flink alerting 알아보기


### Error & Retry logic
- failover 전략


### Ci-cd 도입하기 (나중)
- github actions
- jenkins cicd
- flink 기반으로 작성하기


### flink best practices



# Daily Log
## 241218(수)
web_origin 데이터 처리량
avg. 1s = 15 ~ 60/s
avg. 1m = 850 ~ 3600/m
avg. 1h = 51,000 ~ 216,000/h
avg. 1d = 1,224,000 ~ 5,184,000/d (max 수치)
정리: 하루에 약 1백 ~ 3백만건 사이


#### 처리 방식
StrawWebSource → parse to EventObject
EventObject → Mapfunc → request Crawl
if EventType: Created → put
Updated → put
Deleted → delete

#### 파티셔닝
만약 파티셔닝을 한다면, 앞에 prefix대로 넣어줘야함 11_, 00_ 이런식으로.
## 241219(목)
http://straw.kozel.onkakao.net/boxes/web_origin/_events?offset=1020990&partition=0