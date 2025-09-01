Main Project
식봄 검색 시스템 v2 개편 (24.04 - 24.06)
ELASTICSEARCH, SYSTEM MODELiNG, GA4
• Overview | 복잡한 검색 시스템 개선을 위한 ’누가봐도’ 쉬운 검색 만들기 프로젝트 (3명)
• Role | 검색 인프라 개선, v1&v2API전환 설계, 성과 측정 설계
• 고가용성을 위해 단일 노드로 구성되어있던 ElasticSearch를 Cluster로 재구축
• CTR, 장바구니 비율을 통한 신규 구매자 검색 성과 측정 설립 (GA4, Access Log 사용)
• v1 & v2 API를 점진적으로 전환하기 위해 API Selector 구조 설계
• Performance | 기존 방문자를 제외한 신규 방문자 일 평균 8,000명 기준 CTR 9% 증가 및 장바구니 비율 5% 증가

식봄 검색 색인 프로세스 개선 (24.02 - 24.03)
JAVA, SPRiNG BATCH, ELASTiCSEARCH, MYSQL
• Overview | 식봄의 검색 결과를 빠르게 업데이트 하기 위해 검색 색인 시간을 단축시키는 프로젝트
• Role | Elasticsearch 색인 시간을 단축시키기 위한 Spring Batch Job 설계 및 개발
• Airflow Dag로 구현된 Python 코드 (ES Batch) 분석 및 로직 파악
• 색인 프로세스를 개선하기 위해 기존 Batch Job 로직 재설계 및 Spring Batch 개발
• Performance | Query Tuning, Parallel Processing, 색인구조 변경으로 상품 정보 색인 시간 600초 → 85초로 85% 감소

지표 통계 시스템 구축 (23.07 - 23.10)
REDASH, BiGQUERY, COST OPTiMiZATiON, GA4
• Overview | 운영 환경이 아닌 분석 환경에서 통계를 낼 수 있도록 지표 통계 시스템을 구축하는 프로젝트
• Role | 운영 DB에서 수행하던 통계 쿼리를 분석(DW) 환경으로 이관 및 비즈니스 지표 추가 추출
• 기획전, 상품별주문, 지역별 주문 통계등 식봄 비즈니스 지표추출
• BigQuery UDF Function을 활용한 고객 민감정보 마스킹 일괄 적용
• 분석환경으로 이관 후 운영 DB 부하 요소 제거
• Performance | DW 기반 Mart 구성 후 분석 쿼리 소요 시간 평균 50%감소

전사 DW 구축 및 운영 (23.05 - 23.07)
DIMENSIONAL MODELiNG, ELT, AIRFLOW, BIGQUERY, DBT, PYTHON
• Overview | 식봄 서비스의 분석 환경을 만들기 위한 첫번째 데이터 플랫폼 프로젝트
• Role| DW모델링 설계 및 ELT파이프라인 개발
• 다차원 모델링을 위한 비즈니스 프로세스 파악 및 Stakeholder 전수 조사
• 식봄 DB 다차원 모델링 진행, Fact와 Dimension으로 분류 후 BigQuery 환경에 DW 구축
• 모델링한 결과를 기반으로 Airflow Dag & ELT 파이프라인 개발
• Airflow의 Workload 부하 분산 테스트를 위해 Standalone Spark Cluster POC 진행

IBK 데이터 공유포탈 고도화 (22.03 - 22.10)
K8S, JENKiNS, TiBERO, HiVE 
• Overview | 폐쇄망 금융권 환경에서 Tmax Data Platform 구성 및 데이터 연계 프로젝트 (4명)
• Role | on‐premise k8s cluster 구축 및 Tmax Hyperdata 구성
• 프로젝트 종료 후 유지보수 기간동안 유용하게 사용 할 수 있는 APITest자동화 툴 구현
• Data Platform 버전 업그레이드시 Tibero DB Migration 작업 진행 (DB Cold‐Backup)
• Performance | 기업은행 빅데이터 부서에서 사용하는 DB, DW를 Tmax사 Data Platform 으로 연계하여 분석 시간 150% 감소

TmaxBI 내부 개발 서버 구축 및 운영 (21.12 - 22.03)
K8S, SHELL SCRIPTiNG, GRAFANA, PROMETHEUS
• Overview | TmaxBI사 Application을 Test 하기위한 테스트 전용 k8s‐cluster 운영
• Role | TmaxBI사내 Test전용 서버 약 20대 관리 및 운영
• k8s‐cluster 모니터링 구성을 위한 grafana, prometheus 구성
• k8s‐cluster 운영시 겪었던 문제 및 개선점을 세미나 형식으로 팀원에게 공유

Toy Project
Data Scientist 없이 추천 시스템 만들기
• 식봄 추천 시스템 프로젝트 진행시 빠르고 완성도 높은 시스템 개발을 위한 선행학습
• 개인화 추천 파이프라인 개발 ‐ 크롤링 데이터와 식봄 서비스 데이터를 추천 알고리즘에 적용시켜 구매자들에게 개인화 상품 추천
• 개인화 추천 데이터를 DB에 적재 시킨후 API Server로 추천 상품 제공

항공권 가격 조회 서비스
오픈소스 기술 습득을 위한 데이터 엔지니어링 프로젝트
• 지역별 키워드를 트위터에서 수집하여 Kafka Broker에게 실시간 전달
• 일별 항공권 가격을 수집하는 Airflow DAG 개발