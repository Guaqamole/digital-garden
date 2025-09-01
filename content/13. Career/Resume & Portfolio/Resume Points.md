

## 나를 나타내는 성향들
### 장점
- 질문 많이해서 귀찮게 하는 스타일. 하지만 아무거나 질문하지 않고, 질문하기전 항상 10분정도 고민한다.
	- Remote LogBack
- 새로운 기술을 습득하는것에 즐거움을 느낌. 따라서 빠른 기술 습득 가능하고 R&R이 날 막지 않는다면 업무 스펙트럼에 제한두지 않는 스타일.
	- 예시) JPA, Spring Batch 와 달리 Spring Integration 은 
- 심각한 의심쟁이. 때로 공식문서도 잘 안믿어서 직접 코드로 구현해보고 테스트함
	- Spring Integration에서 ssh private key를 인증 목적으로만 사용한다고해서 달라고하는데 믿지 못해서 직접 서버에 들어가서 관련 키가 있는지 찾아봄

### 단점
- 성격이 급하다 → 하나둘씩 빠트린다.
	- 극복
		- 자동화 가능하면 하고
		- 어쩔수없이 안되는것들은 무조건 checkbox로 List up 해놓고 딱 2번 Test한다.
- 
- 

### 한줄요약
데이터와 아키텍처를 좋아하는 flexible한 engineer
컨테이너 기술과 ML에 관심이 많으며, 모두가 사용할 수 있는 정교한 데이터 플랫폼을 만들고, 개발합니다.

강점 3가지
1.  Generalist : Backend, Data Engineering, Infra Ops, Communication 다양한 업무경험
2. Engineerful : 내가 몰랐던 기술의 아키텍처를 파악하고 싶어하고 Dependency를 끊어내는걸 좋아함 (삶에서도)
3. Resourceful : 주변 동료들을 잘 사용함 (질문 효율적으로 하기), 문서와 Tool을 잘 사용함 ( 기술 공유하는것을 좋아하고 그림으로 효율적으로 아키텍처 설명하기 )



## 검색 강점
검색, 무슨일을 하였나?

검색 서비스를 전체적으로 개선하려는 프로젝트: 식봄 검색v2를 추진
- 색인 시간 단축 (준 실시간 레벨) eks airflow → spring batch + ECS
- 검색 알고리즘 + 검색 인프라 개선
- 알고리즘은 DS, 인프라 및 개발은 DE.

마켓컬리처럼 상품을 카테고리화하는 팀이 별도로 있는반면, 근무하던 환경에선 검색을 담당하는 인력이 3명이여서

- 검색 색인 과정 개선
	- 상품의 개수가 증가하면서 색인 속
	- Java, restHighLevelClient, Spring Batch
	- Elasticsearch
	- 쿼리 최적화 (MySQL)
	- 600초 → 90초
- 검색 서비스 로깅, 로그 수집
	- EFK
	- Grafana + Prometheus
	- BigQuery
- 검색 서비스 A/B Test
	- API Selector
	- 분기 색인
- 자동 사전 구축
	- 

추진하고 싶었지만 못한 서비스들 (Spring webflux + redis)
- 검색어 자동 완성
- 검색어 한영 전환
- 검색어 동의어 검색
- 검색어 한영 번역 단어 (필요시)