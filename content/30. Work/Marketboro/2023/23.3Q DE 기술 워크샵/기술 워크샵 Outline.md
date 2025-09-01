# 문제 제기

## 1. Airflow WorkLoad 분산
- Best Practive 소개
## 2. 데이터 사이즈 증가에 따라 분산 처리 필요
- Excel 예시
- Big Chunk vs Small Chunks
## 3. 큰 데이터 처리시 속도 개선


# 발표

## 기본 구조 이해 (5분)
- Spark Application
	- Driver process
	- Spark Session
	- Executor
- Spark Cluster Manager
	- Standalone
	- Yarn
	- Mesos
	- k8s

## Step 1. Cluster Manager 결정 (5분)
- Standalone vs Mesos 구도가 나오기 까지
- 배포모드, 여러가지 고려해야할 사항이 많았음
- Client Mode vs Cluster Mode 차이점 설명
- 그림과 함께 설명

## Step 2. 구축 과정 (5분)
> 나를 편하게 하기 위한 구축과정
- IaC로 코드관리, 멱등성 보장
- 환경변수 관리

## Step 3. 연계 과정 (10분)
> 클러스터는 만들어놨는데… 이제 어떻게 사용하지?
- 만약 분석가가 Spark를 사용한다면 어떤 그림으로 사용하게 될까? 관점으로 고민.
- Spark SQL vs Spark Dataframe
- Airflow Variable 관리
- Airflow with Spark Cluster 그림 + 과정 설명
- 어떤 Airflow Operator를 사용할것인가?

## Step 4. 최적화 과정 (5분)
- Spark Executor with Threads
- 병렬 처리에 대해
- 메모리 최적화

## Step 5. 결과 (5분)
- 이슈 리스트
	- SQL 써서 Partitioning 해야하는점
	- 
- 얼마만큼 부하분산이 되었는지 그래프로 보여준다.
- 속도 비교 그래프 표시.
- 대용량 데이터(?) 속도 차이 그래프 표시
