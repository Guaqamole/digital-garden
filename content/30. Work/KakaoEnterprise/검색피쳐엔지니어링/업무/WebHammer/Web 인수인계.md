- 25/05/21

## 정적필터
- 2개월에 한번씩 돔
- 자유 크롤링 → 웹데이터를 hbase를 축적하고 있다가 데이터가 바뀌면 해줘야함
- 필터 리스트
	- https://wiki.daumkakao.com/spaces/searchspam/pages/1323996370/3.2+%EC%A0%95%EC%A0%81+%ED%95%84%ED%84%B0
- log는 tool5에서 볼수있음

### jenkins/web_parquet batch → sss/WebFilter
- WebHammerEmCase  copy_base_ms2hammer (distcp)

### CrashHtmlFilter

### WhiteApplyStorage

### WebStatic + hbase
- merge 후 web hbase bulk load → web_static, persistence join → spam 제외하고 engine 색인
- WebHammerEmCase → webhammer.sh -d -a 

### 마지막 (emcase) write_finish_file + make_index_data



webhammer.sh 전체프로세스
- domaindb
- white 뽑고
- url 뽑고
- hbase snapshot 만듬


## Question
- MR Job Test 어떻게 하는지? emcase등.
	- tool5 접근
	- 코드 수정후 jar 파일 생성
	- 스크립트 돌려서 다른경로 설정 후 실행
	- runjobBatch.sh -d 2-250521 -c parquet
- 이슈되었던것들




# 전체 프로세스
## WebStatic
input: distcp (hdfs://input/www/ms/날짜/?.parquet) → WebFilter Parquet Batch → WebStaticPipeline → tool5 4파트에서 읽어감
1. distcp (4 파트 서버에서 실행함) WebHammeEmCase / script 실행
	1. runJobBatch.sj
2. WebFilter Parquet Batch (WebFilter)
	1. 
3. WebStaticPipeline
	1. webhammer.sh →
4. tool5 로컬 파일에 최종 결과생김



## 데이터 조회
/output/webhammer/20250421/filter/spam/joined + /input/www/web_dynamic
key: url




[http://webhammer.daumkakao.io:8080/WebHammer/web/view/article/url?url=&withMeta=n](http://webhammer.daumkakao.io:8080/WebHammer/web/view/article/url?url=&withMeta=n)



# 동적필터
webhammer (사전베이스)
ventilator → 해머한테 요청후 레벨 계산 후 hbase put
web 관련 straw → mojito
## WebSparkVentilator → Palu 대상
- 필터
- 

## 웹 동적 덤프 (web-extract)
- 하루에 한번
- 일배치 프로세스 

## Level Recalc (web_WebHammerLevelRecalc)
- ringer → couchbase 조회
- recalc: 0 or 1 (처리되었음)
	- webhammer.daumkakao.io:8080/WebHammer/web/board/recalcList?limit=10
- 초기화 필요함 → recalc_all
- 필요없음 → recalc


## Template Cluster
- host minhash → 값비교 해서 3bit까지 묶음
- webfilterTest → webtempletecluster
- hbase → web-hammer-hbase → straw 전환완료


## 예시
- web 에는 4가지 데이터 타입이 있음
	- domain → 원래는 햄이였는데 → 스팸으로 잘못찍음 → CS 들어와서 햄으로 바꿈
	- article
	- host
- kibana dynamic-web-history



## 배치잡
- web-hammertool
- screen processs
	- file_lookup
	- db_lookup