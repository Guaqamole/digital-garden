## overview
- project background (history)
	- 절대 DB 를 그대로 가져오는것이 아니기 떄문에 어느정도 데이터 불일치는 있을수있다 가정하고 만듬
	- 정확하게가 아닌, 추이를 보기위함
	- redash
	- dw → dm → redash
	- but.. dw → redash
- modeling
- nested
- 증분 vs cdc 

## Architecture
- Airflow DAGs
	- hourly (cron expression)
	- once
	- daily
- Variable
- XCOM

## Process
- logic
	- init
	- etl
	- push update time
	- if failed
- SELECT RDS
- CREATE temp table
- MERGE


## Maintenance
- error case
	- 데이터 불일치
	- interval dag 수행 방법
- 새로운 테이블 추가할때 (새로운 데이터가 자주 있지 않을거라고 생각했음)
	- 쿼리를 동적으로 만들기가 어려움
	- etl flow 추가
	- 코드에 추가
	- 