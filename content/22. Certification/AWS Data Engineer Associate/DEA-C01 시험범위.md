---
title: DE1-C01 시험범위
date: 2023-11-01
draft: false
tags:
  - Certification
  - AWS
complete: true
---
## 1. Data Ingestion and Transformation (34%) <br><br>

### 1.1 Data Ingestion <br>
#### 필요 지식
- AWS 데이터 수집 서비스의 처리량 및 대기 시간 특성
- 데이터 수집 패턴 (예: 빈도 및 데이터 기록)
- 스트리밍 데이터 수집
- 배치 데이터 수집 (예: 예약된 수집, 이벤트 기반 수집)
- 데이터 수집 파이프라인의 재생 가능성
- 상태 보유 및 상태 없는 데이터 트랜잭션

#### 필요 스킬
- 스트리밍 소스에서 데이터 읽기 (예: Amazon Kinesis, Amazon Managed Streaming for Apache Kafka [Amazon MSK], Amazon DynamoDB Streams, AWS Database Migration Service [AWS DMS], AWS Glue, Amazon Redshift)
- 배치 소스에서 데이터 읽기 (예: Amazon S3, AWS Glue, Amazon EMR, AWS DMS, Amazon Redshift, AWS Lambda, Amazon AppFlow)
- 배치 수집에 적절한 구성 옵션 구현하기
- 데이터 API 사용
- Amazon EventBridge, Apache Airflow 또는 작업 및 크롤러를 위한 시간 기반 일정을 사용하여 스케줄러 설정하기
- 이벤트 트리거 설정하기 (예: Amazon S3 이벤트 알림, EventBridge)
- Amazon Kinesis에서 Lambda 함수 호출하기
- 데이터 소스에 연결을 허용하기 위해 IP 주소의 허용 목록 생성하기
- 스로틀링 구현 및 속도 제한 극복하기 (예: DynamoDB, Amazon RDS, Kinesis)
- 스트리밍 데이터 분배를 위한 팬-인(fan-in) 및 팬-아웃(fan-out) 관리하기 <br><br>

### 1.2 Transform and Process data

#### 필요 지식
- 사업 요구 사항을 기반으로 한 ETL 파이프라인 생성
- 데이터의 볼륨, 속도, 다양성 (예: 구조화된 데이터, 비구조화된 데이터)
- 클라우드 컴퓨팅 및 분산 컴퓨팅
- Apache Spark를 사용하여 데이터 처리 방법
- 중간 데이터 스테이징 위치

#### 필요 기술
- 성능 요구 사항에 대한 컨테이너 사용 최적화 (예: Amazon EKS, Amazon ECS)
- 다양한 데이터 소스에 연결하기 (예: JDBC, ODBC)
- 여러 소스에서 데이터 통합하기
- 데이터 처리 시 비용 최적화하기
- 요구 사항을 기반으로 한 데이터 변환 서비스 구현하기 (예: Amazon EMR, AWS Glue, Lambda, Amazon Redshift)
- 형식 간 데이터 변환하기 (예: .csv에서 Apache Parquet로)
- 일반적인 변환 실패 및 성능 문제 문제 해결 및 디버깅하기
- AWS 서비스를 사용하여 다른 시스템에 데이터를 사용 가능하게 하는 데이터 API 생성하기 <br><br>
### 1.3 Orchestrate data pipelines

#### 필요 지식
- 다양한 AWS 서비스를 통합하여 ETL 파이프라인 생성 방법
- 이벤트 기반 아키텍처
- 스케줄 또는 의존성을 기반으로 데이터 파이프라인에 대한 AWS 서비스 구성 방법
- 서버리스 워크플로우

#### 필요 기술
- 데이터 ETL 파이프라인에 대한 워크플로우를 구축하기 위한 오케스트레이션 서비스 사용 (예: Lambda, EventBridge, Amazon MWAA, AWS Step Functions, AWS Glue 워크플로우)
- 성능, 가용성, 확장성, 회복력 및 장애 허용을 위한 데이터 파이프라인 구축
- 서버리스 워크플로우 구현 및 유지 관리
- 알림 서비스를 사용하여 알림 전송 (예: Amazon SNS, Amazon SQS)<br><br>
### 1.4 Apply programming concepts

#### 필요 지식
- 지속적인 통합 및 지속적인 배포 (CI/CD) (데이터 파이프라인의 구현, 테스팅, 배포)
- 데이터 소스 쿼리 및 데이터 변환을 위한 SQL 쿼리
- 반복적인 배포를 위한 코드로서의 인프라 (IaC) (예: AWS CDK, AWS CloudFormation)
- 분산 컴퓨팅
- 데이터 구조 및 알고리즘 (예: 그래프 데이터 구조 및 트리 데이터 구조)
- SQL 쿼리 최적화

#### 필요 기술
- 데이터 수집 및 변환을 위한 런타임 감소를 위한 코드 최적화
- 동시성 및 성능 요구 사항을 충족하기 위해 Lambda 함수 구성
- 데이터 변환을 위해 SQL 쿼리 수행 (예: Amazon Redshift 저장 프로시저)
- 데이터 파이프라인 요구 사항을 충족하기 위해 SQL 쿼리 구조화
- 저장소 생성, 업데이트, 복제 및 분기와 같은 작업을 수행하기 위해 Git 명령 사용
- 서버리스 데이터 파이프라인 패키징 및 배포를 위해 AWS SAM 사용 (예: Lambda 함수, Step Functions, DynamoDB 테이블)
- Lambda 함수 내에서 스토리지 볼륨 사용 및 마운트


---

## 2. Data Store Management (26%)<br><br>
### 2.1 Choose a data store

#### 필요 지식
- 스토리지 플랫폼 및 스토리지 특성
- 특정 성능 요구에 대한 저장 서비스와 구성
- 데이터 저장 형식 (예: .csv, .txt, Parquet)
- 데이터 저장을 데이터 마이그레이션 요구 사항과 일치시키는 방법
- 특정 액세스 패턴에 대한 적절한 저장 솔루션 결정 방법
- 데이터 액세스를 방지하기 위해 락을 관리하는 방법 (예: Amazon Redshift, Amazon RDS)

#### 필요 기술
- 특정 비용 및 성능 요구 사항에 대한 적절한 저장 서비스 구현 (예: Amazon Redshift, Amazon EMR, AWS Lake Formation, Amazon RDS, DynamoDB, Amazon Kinesis Data Streams, Amazon MSK)
- 특정 액세스 패턴 및 요구 사항에 대한 적절한 저장 서비스 구성 (예: Amazon Redshift, Amazon EMR, Lake Formation, Amazon RDS, DynamoDB)
- 적절한 사용 사례에 저장 서비스 적용 (예: Amazon S3)
- 데이터 처리 시스템에 마이그레이션 도구 통합 (예: AWS Transfer Family)
- 데이터 마이그레이션 또는 원격 액세스 방법 구현 (예: Amazon Redshift 연합 쿼리, Amazon Redshift 머티리얼라이즈드 뷰, Amazon Redshift Spectrum)<br><br>
### 2.2 Understand data cataloging systems

#### 필요 지식
- 데이터 카탈로그 생성 방법
- 요구 사항을 기반으로한 데이터 분류
- 메타데이터와 데이터 카탈로그의 구성 요소

#### 필요 기술
- 데이터 소스에서 데이터를 소비하기 위해 데이터 카탈로그 사용
- 데이터 카탈로그 구축 및 참조 (예: AWS Glue Data Catalog, Apache Hive metastore)
- 스키마 발견 및 AWS Glue 크롤러를 사용하여 데이터 카탈로그 채우기
- 파티션과 데이터 카탈로그 동기화
- 카탈로그를 위한 새로운 소스 또는 대상 연결 생성 (예: AWS Glue)<br><br>
### 2.3 Manage the lifecycle of data

#### 필요 지식
- 뜨거운 데이터와 차가운 데이터 요구 사항을 해결하기 위한 적절한 저장 솔루션
- 데이터 수명 주기를 기반으로 저장 비용 최적화 방법
- 비즈니스 및 법적 요구 사항을 충족하기 위해 데이터 삭제 방법
- 데이터 보존 정책 및 아카이브 전략
- 적절한 탄력성과 가용성으로 데이터 보호 방법

#### 필요 기술
- Amazon S3와 Amazon Redshift 사이에서 데이터를 이동하기 위해 로드 및 언로드 작업 수행
- S3 데이터의 저장 티어 변경을 위해 S3 수명 주기 정책 관리
- S3 수명 주기 정책을 사용하여 특정 나이에 도달하면 데이터 만료
- S3 버전 관리 및 DynamoDB TTL 관리<br><br>
### 2.4 Design data models and schema evolution

#### 필요 지식
- 데이터 모델링 개념
- 데이터 계보를 사용하여 데이터의 정확성과 신뢰성 보장 방법
- 색인화, 파티셔닝 전략, 압축 및 기타 데이터 최적화 기술에 대한 모범 사례
- 구조화된, 반 구조화된 및 비 구조화된 데이터 모델링 방법
- 스키마 진화 기술

#### 필요 기술
- Amazon Redshift, DynamoDB, 및 Lake Formation에 대한 스키마 설계
- 데이터의 특성 변경 처리
- 스키마 변환 수행 (예: AWS Schema Conversion Tool AWS SCT 및 AWS DMS 스키마 변환 사용)
- AWS 도구를 사용하여 데이터 계보 설정 (예: Amazon SageMaker ML Lineage Tracking)


---
## 3. Data Operations and Support (22%)<br><br>
### 3.1 Automate data processing by using AWS services

#### 필요 지식
- 반복적인 비즈니스 결과를 위한 데이터 처리 유지 및 문제 해결 방법
- 데이터 처리를 위한 API 호출
- 스크립팅을 수용하는 서비스 (예: Amazon EMR, Amazon Redshift, AWS Glue)

#### 필요 기술
- 데이터 파이프라인 오케스트레이션 (예: Amazon MWAA, Step Functions)
- Amazon 관리 워크플로 문제 해결
- 코드에서 Amazon 기능에 액세스하기 위해 SDK 호출
- 데이터 처리를 위한 AWS 서비스의 기능 사용 (예: Amazon EMR, Amazon Redshift, AWS Glue)
- 데이터 API 소비 및 유지 관리
- 데이터 변환 준비 (예: AWS Glue DataBrew)
- 데이터 쿼리 (예: Amazon Athena)
- 데이터 처리를 자동화하기 위해 Lambda 사용
- 이벤트 및 스케줄러 관리 (예: EventBridge)<br><br>
### 3.2 Analyze data by using AWS services

#### 필요 지식
- 프로비전된 서비스와 서버리스 서비스 간의 트레이드 오프
- SQL 쿼리 (예: 여러 한정자 또는 JOIN 절을 가진 SELECT 문)
- 분석을 위한 데이터 시각화 방법
- 정제 기술을 적용할 시기 및 방법
- 데이터 집계, 롤링 평균, 그룹화 및 피벗

#### 필요 기술
- AWS 서비스 및 도구를 사용하여 데이터 시각화 (예: AWS Glue DataBrew, Amazon QuickSight)
- 데이터 확인 및 정리 (예: Lambda, Athena, QuickSight, Jupyter Notebooks, Amazon SageMaker Data Wrangler)
- 데이터 쿼리 또는 뷰 생성을 위해 Athena 사용
- 데이터 탐색을 위해 Apache Spark를 사용하는 Athena 노트북 사용
- 작업 명세서 3.3: 데이터 파이프라인 유지 및 모니터링<br><br>
### 3.3 Maintain and monitor data pipelines

#### 필요 지식
- 응용 프로그램 데이터 로깅 방법
- 성능 튜닝을 위한 모범 사례
- AWS 서비스 액세스 로깅 방법
- Amazon Macie, AWS CloudTrail, Amazon CloudWatch

#### 필요 기술
- 감사를 위한 로그 추출
- 감사 및 추적성을 용이하게 하기 위해 로깅 및 모니터링 솔루션 배포
- 모니터링 중 알림 사용
- 성능 문제 해결
- API 호출 추적을 위해 CloudTrail 사용
- 파이프라인 문제 해결 및 유지 관리 (예: AWS Glue, Amazon EMR)
- 응용 프로그램 데이터 로깅을 위해 Amazon CloudWatch Logs 사용 (구성 및 자동화 중점)
- AWS 서비스로 로그 분석 (예: Athena, Amazon EMR, Amazon OpenSearch Service, CloudWatch Logs Insights, 빅 데이터 응용 프로그램 로그)<br><br>
### 3.4 Ensure data quality

#### 필요 지식
- 데이터 샘플링 기술
- 데이터 왜곡 메커니즘 구현 방법
- 데이터 유효성 검사 (데이터 완전성, 일관성, 정확성 및 무결성)
- 데이터 프로파일링

#### 필요 기술
- 데이터 처리 중 데이터 품질 확인 (예: 빈 필드 확인)
- 데이터 품질 규칙 정의 (예: AWS Glue DataBrew)
- 데이터 일관성 조사 (예: AWS Glue DataBrew)


---
## 4. Data Security and Governance (18%)<br><br>
### 4.1 Apply authentication mechanisms

#### 필요 지식
- VPC 보안 네트워킹 개념
- 관리 서비스와 비관리 서비스의 차이
- 인증 방법 (비밀번호 기반, 인증서 기반, 역할 기반)
- AWS 관리 정책과 고객 관리 정책 간의 차이

#### 필요 기술
- VPC 보안 그룹 업데이트
- IAM 그룹, 역할, 엔드포인트 및 서비스 생성 및 업데이트
- 비밀번호 관리를 위한 자격 증명 생성 및 회전 (예: AWS Secrets Manager)
- IAM 역할 설정하기 (예: Lambda, Amazon API Gateway, AWS CLI, CloudFormation)
- IAM 정책 적용하기 역할, 엔드포인트 및 서비스 (예: S3 액세스 포인트, AWS PrivateLink)<br><br>
### 4.2 Apply authorization mechanisms

#### 필요 지식
- 인가 방법 (역할 기반, 정책 기반, 태그 기반 및 속성 기반)
- AWS 보안에 적용되는 최소 권한 원칙
- 역할 기반 접근 제어 및 예상되는 접근 패턴
- 서비스 간의 무단 접근으로부터 데이터 보호 방법

#### 필요 기술
- 관리 정책이 필요를 충족하지 않을 때 사용자 정의 IAM 정책 생성
- 응용 프로그램 및 데이터베이스 자격 증명 저장 (예: Secrets Manager, AWS Systems Manager Parameter Store)
- 데이터베이스에 사용자, 그룹 및 역할에게 접근 및 권한 부여 (예: Amazon Redshift)
- Lake Formation을 통한 권한 관리 (Amazon Redshift, Amazon EMR, Athena 및 Amazon S3용)<br><br>
### 4.3 Ensure data encryption and masking

#### 필요 지식
- AWS 분석 서비스에서 사용 가능한 데이터 암호화 옵션 (예: Amazon Redshift, Amazon EMR, AWS Glue)
- 클라이언트 측 암호화와 서버 측 암호화 간의 차이
- 민감한 데이터 보호
- 데이터 익명화, 마스킹 및 키 솔팅

#### 필요 기술
- 준수 법률 또는 회사 정책에 따라 데이터 마스킹 및 익명화 적용
- 데이터를 암호화하거나 복호화하기 위해 암호화 키 사용 (예: AWS Key Management Service AWS KMS)
- AWS 계정 경계 간 암호화 구성
- 데이터에 대한 전송 중 암호화 활성화.<br><br>
### 4.4 Prepare logs for audit

#### 필요 지식
- 응용 프로그램 데이터 로깅 방법
- AWS 서비스에 대한 접근 로깅 방법
- 중앙 집중식 AWS 로그

#### 필요 기술
- API 호출 추적을 위해 CloudTrail 사용
- CloudWatch 로그를 사용하여 응용 프로그램 로그 저장
- 중앙 집중식 로깅 쿼리를 위한 AWS CloudTrail Lake 사용
- 로그 분석을 위해 AWS 서비스 사용 (예: Athena, CloudWatch Logs Insights, Amazon OpenSearch Service)
- 로깅을 수행하기 위해 여러 AWS 서비스 통합 (예: 대량의 로그 데이터가 있는 경우 Amazon EMR)<br><br>
### 4.5 Understand data privacy and governance

#### 필요 지식
- 개인 식별 정보 (PII) 보호 방법
- 데이터 주권

#### 필요 기술
- 데이터 공유 권한 부여 (예: Amazon Redshift용 데이터 공유)
- PII 식별 구현 (예: Lake Formation과 함께 사용되는 Macie)
- 허용되지 않는 AWS 지역에 데이터 백업 또는 복제를 방지하기 위해 데이터 개인 정보 전략 구현
- 계정에서 발생한 구성 변경 관리 (예: AWS Config)


---

## Summary

### Data Ingestion and Transformation (36%)
#### 1.1 Data Ingestion
- Amazon Kinesis
- Amazon MSK
- Amazon DynamoDB streams
- AWS DMS
- AWS Glue
- Amazon Redshift
- AWS Lambda
- Amazon AppFlow
- Amazon EventBridge
- Apache Airflow
- Amazon S3
- Amazon RDS
#### 1.2 Transform and Process data
- Amazon EKS
- Amazon ECS
- JDBC
- ODBC
- Amazon EMR
- AWS Glue
- AWS Lambda
- Amazon Redshift
- Apache Parquet
#### 1.3 Orchestrate data pipelines
- AWS Lambda
- Amazon EventBridge
- Amazon MWAA
- AWS Step Functions
- AWS Glue Workflow
- Amazon SNS
- Amazon SQS
#### 1.4 Apply programming concepts
- Amazon Redshift Stored Procedure
- Git
- AWS SAM
- AWS Lambda
- AWS Step Functions
- AWS DynamoDB
<br><br>
### Data Store Management (26%)
#### 2.1 Choose a data store
- Amazon Redshift
- Amazon EMR
- Lake Formation
- Amazon RDS
- Amazon DynamoDB
#### 2.2 Understand data cataloging systems
- AWS Glue Data Catalog
- AWS Glue Crawler
- Apache Hive metastore
- Partition & Catalog
#### 2.3 Manage the lifecycle of data
- Amazon S3
- Amazon S3 Lifecylcle Policy
- Amazon S3 Version control
- Amazon DynamoDB TTL
- Amazon Redshift
#### 2.4 Design data models and schema evolution
- Amazon Redshift
- Amazon DynamoDB
- Lake Formation
- AWS Schema Conversion Tool
- AWS DMS
- Amazon SageMaker ML Lineage Tracking
<br><br>
### Data Operations and Support (22%)
#### 3.1 Automate data processing by using AWS services
- Amazon MWAA
- Amazon Step Functions
- SDK
- Amazon EMR
- Amazon Redshift
- AWS Glue
- AWS Glue DataBrew
- Amazon Athena
- AWS Lambda
- Amazon EventBridge
#### 3.2 Analyze data by using AWS services
- AWS Glue DataBrew
- Amazon QuickSight
- AWS Lambda
- AWS Athena
- Jupyter Notebooks
- Amazon SageMaker Data Wrangler
#### 3.3 Maintain and monitor data pipelines
- CloudTrail
- AWS Glue
- Amazon EMR
- Amazon CloudWatch Logs
- Amazon CloudWatch Logs Insights
- Amazon Athena
- Amazon OpenSearch Service
#### 3.4 Ensure data quality
- AWS Glue DataBrew
<br><br>
### Data Security and Governance (18%)

#### 4.1 Apply authentication mechanisms
- VPC Security Group
- IAM Group
- IAM Role
- IAM Endpoint
- IAM Service
- AWS Secrets Manager
- AWS Lambda
- Amazon API Gateway
- AWS CLI
- CloudFormation
- Amazon S3 Access Point
- AWS PrivateLink
#### 4.2 Apply authorization mechanisms
- IAM Policy
- AWS Secrets Manager
- AWS Systems Manager Parameter Store
- Amazon Redshift
- Lake Formation
#### 4.3 Ensure data encryption and masking
- Amazon Redshift
- Amazon EMR
- AWS Glue
- AWS KMS
#### 4.4 Prepare logs for audit
- AWS CloudTrail
- AWS CloudWatch
- AWS CloudTrail Lake
- AWS Athena
- AWS CloudWatch Logs Insights
- Amazon OpenSearch Service
- Amazon EMR
#### 4.5 Understand data privacy and governance
- Amazon Redshift
- PII
- Lake Formation, Macie
- AWS Config
<br><br>
--- 
## Exam In-Scope Appendix

### **Analytics:**  
• Amazon Athena  
• Amazon EMR  
• AWS Glue  
• AWS Glue DataBrew  
• AWS Lake Formation  
• Amazon Kinesis Data Analytics  
• Amazon Kinesis Data Firehose  
• Amazon Kinesis Data Streams  
• Amazon Managed Streaming for Apache Kafka (Amazon MSK)  
• Amazon OpenSearch Service  
• Amazon QuickSight  <br>

### **Application Integration:**  
• Amazon AppFlow  
• Amazon EventBridge  
• Amazon Managed Workflows for Apache Airflow (Amazon MWAA)  
• Amazon Simple Notification Service (Amazon SNS)  
• Amazon Simple Queue Service (Amazon SQS)  
• AWS Step Functions  <br>

### **Cloud Financial Management:**  
• AWS Budgets  
• AWS Cost Explorer<br>

### **Compute:**  
• AWS Batch  
• Amazon EC2  
• AWS Lambda  
• AWS Serverless Application Model (AWS SAM) <br>

### **Containers:**  
• Amazon Elastic Container Registry (Amazon ECR)  
• Amazon Elastic Container Service (Amazon ECS)  
• Amazon Elastic Kubernetes Service (Amazon EKS) <br>

### **Database:**  
• Amazon DocumentDB (with MongoDB compatibility)  
• Amazon DynamoDB  
• Amazon Keyspaces (for Apache Cassandra)  
• Amazon MemoryDB for Redis  
• Amazon Neptune  
• Amazon RDS  
• Amazon Redshift <br>

### **Developer Tools:**  
• AWS CLI  
• AWS Cloud9  
• AWS Cloud Development Kit (AWS CDK)  
• AWS CodeBuild  
• AWS CodeCommit  
• AWS CodeDeploy  
• AWS CodePipeline  <br>

### **Frontend Web and Mobile:**  
• Amazon API Gateway  <br>

### **Machine Learning:**  
• Amazon SageMaker <br>

### **Management and Governance:**  
• AWS CloudFormation  
• AWS CloudTrail  
• Amazon CloudWatch  
• Amazon CloudWatch Logs  
• AWS Config  
• Amazon Managed Grafana  
• AWS Systems Manager  
• AWS Well-Architected Tool  <br>

### **Migration and Transfer:**  
• AWS Application Discovery Service  
• AWS Application Migration Service  
• AWS Database Migration Service (AWS DMS)  
• AWS DataSync  
• AWS Schema Conversion Tool (AWS SCT)  
• AWS Snow Family  
• AWS Transfer Family  <br>

### **Networking and Content Delivery:**  
• Amazon CloudFront  
• AWS PrivateLink  
• Amazon Route 53  
• Amazon VPC  <br>

### **Security, Identity, and Compliance:**  
• AWS Identity and Access Management (IAM)  
• AWS Key Management Service (AWS KMS)  
• Amazon Macie  
• AWS Secrets Manager  
• AWS Shield  
• AWS WAF <br>

### **Storage:**  
• AWS Backup  
• Amazon Elastic Block Store (Amazon EBS)  
• Amazon Elastic File System (Amazon EFS)  
• Amazon S3  
• Amazon S3 Glacier


---

## Original Text

Domain 1: Data Ingestion and Transformation

Task Statement 1.1: Perform data ingestion.
Knowledge of: 
• Throughput and latency characteristics for AWS services that ingest data 
• Data ingestion patterns (for example, frequency and data history) 
• Streaming data ingestion 
• Batch data ingestion (for example, scheduled ingestion, event-driven 
ingestion) 
• Replayability of data ingestion pipelines 
• Stateful and stateless data transactions 

Skills in: 
• Reading data from steaming sources (for example, Amazon Kinesis, Amazon 
Managed Streaming for Apache Kafka [Amazon MSK], Amazon DynamoDB 
Streams, AWS Database Migration Service [AWS DMS], AWS Glue, Amazon 
Redshift) 
• Reading data from batch sources (for example, Amazon S3, AWS Glue, 
Amazon EMR, AWS DMS, Amazon Redshift, AWS Lambda, Amazon 
AppFlow) 
• Implementing appropriate configuration options for batch ingestion 
• Consuming data APIs 
• Setting up schedulers by using Amazon EventBridge, Apache Airflow, or 
time-based schedules for jobs and crawlers 
• Setting up event triggers (for example, Amazon S3 Event Notifications, 
EventBridge) 
• Calling a Lambda function from Amazon Kinesis 
• Creating allowlists for IP addresses to allow connections to data sources 
• Implementing throttling and overcoming rate limits (for example, 
DynamoDB, Amazon RDS, Kinesis) 
• Managing fan-in and fan-out for streaming data distribution




Task Statement 1.2: Transform and process data. 

Knowledge of: 
• Creation of ETL pipelines based on business requirements 
• Volume, velocity, and variety of data (for example, structured data, 
unstructured data) 
• Cloud computing and distributed computing 
• How to use Apache Spark to process data 
• Intermediate data staging locations 

Skills in: 
• Optimizing container usage for performance needs (for example, Amazon 
Elastic Kubernetes Service [Amazon EKS], Amazon Elastic Container Service 
[Amazon ECS]) 
• Connecting to different data sources (for example, Java Database 
Connectivity [JDBC], Open Database Connectivity [ODBC]) 
• Integrating data from multiple sources 
• Optimizing costs while processing data 
• Implementing data transformation services based on requirements (for 
example, Amazon EMR, AWS Glue, Lambda, Amazon Redshift) 
• Transforming data between formats (for example, from .csv to Apache 
Parquet) 
• Troubleshooting and debugging common transformation failures and 
performance issues 
• Creating data APIs to make data available to other systems by using AWS 
services 

 
Task Statement 1.3: Orchestrate data pipelines.

Knowledge of: 
• How to integrate various AWS services to create ETL pipelines 
• Event-driven architecture 
• How to configure AWS services for data pipelines based on schedules or 
dependencies 
• Serverless workflows 

Skills in: 
• Using orchestration services to build workflows for data ETL pipelines (for 
example, Lambda, EventBridge, Amazon Managed Workflows for Apache 
Airflow [Amazon MWAA], AWS Step Functions, AWS Glue workflows) 
• Building data pipelines for performance, availability, scalability, resiliency, 
and fault tolerance 
• Implementing and maintaining serverless workflows 
• Using notification services to send alerts (for example, Amazon Simple 
Notification Service [Amazon SNS], Amazon Simple Queue Service [Amazon 
SQS])



Task Statement 1.4: Apply programming concepts. 

Knowledge of: 
• Continuous integration and continuous delivery (CI/CD) (implementation, 
testing, and deployment of data pipelines) 
• SQL queries (for data source queries and data transformations) 
• Infrastructure as code (IaC) for repeatable deployments (for example, AWS 
Cloud Development Kit [AWS CDK], AWS CloudFormation) 
• Distributed computing 
• Data structures and algorithms (for example, graph data structures and tree 
data structures) 
• SQL query optimization 
  
 
Skills in: 
• Optimizing code to reduce runtime for data ingestion and transformation 
• Configuring Lambda functions to meet concurrency and performance needs 
• Performing SQL queries to transform data (for example, Amazon Redshift 
stored procedures) 
• Structuring SQL queries to meet data pipeline requirements 
• Using Git commands to perform actions such as creating, updating, cloning, 
and branching repositories 
• Using the AWS Serverless Application Model (AWS SAM) to package and 
deploy serverless data pipelines (for example, Lambda functions, Step 
Functions, DynamoDB tables) 
• Using and mounting storage volumes from within Lambda functions 




Domain 2: Data Store Management 

Task Statement 2.1: Choose a data store. 

Knowledge of: 
• Storage platforms and their characteristics 
• Storage services and configurations for specific performance demands 
• Data storage formats (for example, .csv, .txt, Parquet) 
• How to align data storage with data migration requirements 
• How to determine the appropriate storage solution for specific access 
patterns 
• How to manage locks to prevent access to data (for example, Amazon 
Redshift, Amazon RDS) 

Skills in: 
• Implementing the appropriate storage services for specific cost and 
performance requirements (for example, Amazon Redshift, Amazon EMR, 
AWS Lake Formation, Amazon RDS, DynamoDB, Amazon Kinesis Data 
Streams, Amazon MSK) 
• Configuring the appropriate storage services for specific access patterns and 
requirements (for example, Amazon Redshift, Amazon EMR, Lake 
Formation, Amazon RDS, DynamoDB) 
• Applying storage services to appropriate use cases (for example, Amazon 
S3) 
• Integrating migration tools into data processing systems (for example, AWS 
Transfer Family) 
• Implementing data migration or remote access methods (for example, 
Amazon Redshift federated queries, Amazon Redshift materialized views, 
Amazon Redshift Spectrum) 

Task Statement 2.2: Understand data cataloging systems. 

Knowledge of: 
• How to create a data catalog 
• Data classification based on requirements 
• Components of metadata and data catalogs 

Skills in: 
• Using data catalogs to consume data from the data’s source 
• Building and referencing a data catalog (for example, AWS Glue Data 
Catalog, Apache Hive metastore) 
• Discovering schemas and using AWS Glue crawlers to populate data 
catalogs 
• Synchronizing partitions with a data catalog 
• Creating new source or target connections for cataloging (for example, AWS 
Glue) 


Task Statement 2.3: Manage the lifecycle of data. 

Knowledge of: 
• Appropriate storage solutions to address hot and cold data requirements 
• How to optimize the cost of storage based on the data lifecycle 
• How to delete data to meet business and legal requirements 
• Data retention policies and archiving strategies 
• How to protect data with appropriate resiliency and availability 
  
Skills in: 
• Performing load and unload operations to move data between Amazon S3 
and Amazon Redshift 
• Managing S3 Lifecycle policies to change the storage tier of S3 data 
• Expiring data when it reaches a specific age by using S3 Lifecycle policies 
• Managing S3 versioning and DynamoDB TTL 


Task Statement 2.4: Design data models and schema evolution. 

Knowledge of: 
• Data modeling concepts  
• How to ensure accuracy and trustworthiness of data by using data lineage 
• Best practices for indexing, partitioning strategies, compression, and other 
data optimization techniques 
• How to model structured, semi-structured, and unstructured data 
• Schema evolution techniques 

Skills in: 
• Designing schemas for Amazon Redshift, DynamoDB, and Lake Formation 
• Addressing changes to the characteristics of data 
• Performing schema conversion (for example, by using the AWS Schema 
Conversion Tool [AWS SCT] and AWS DMS Schema Conversion) 
• Establishing data lineage by using AWS tools (for example, Amazon 
SageMaker ML Lineage Tracking) 


Domain 3: Data Operations and Support 

Task Statement 3.1: Automate data processing by using AWS services. 

Knowledge of: 
• How to maintain and troubleshoot data processing for repeatable business 
outcomes 
• API calls for data processing 
• Which services accept scripting (for example, Amazon EMR, Amazon 
Redshift, AWS Glue) 

Skills in: 
• Orchestrating data pipelines (for example, Amazon MWAA, Step Functions) 
• Troubleshooting Amazon managed workflows 
• Calling SDKs to access Amazon features from code 
• Using the features of AWS services to process data (for example, Amazon 
EMR, Amazon Redshift, AWS Glue) 
• Consuming and maintaining data APIs 
• Preparing data transformation (for example, AWS Glue DataBrew) 
• Querying data (for example, Amazon Athena) 
• Using Lambda to automate data processing 
• Managing events and schedulers (for example, EventBridge) 



Task Statement 3.2: Analyze data by using AWS services. 

Knowledge of: 
• Tradeoffs between provisioned services and serverless services 
• SQL queries (for example, SELECT statements with multiple qualifiers or 
JOIN clauses) 
• How to visualize data for analysis 
• When and how to apply cleansing techniques 
• Data aggregation, rolling average, grouping, and pivoting 


Skills in: 
• Visualizing data by using AWS services and tools (for example, AWS Glue 
DataBrew, Amazon QuickSight) 
• Verifying and cleaning data (for example, Lambda, Athena, QuickSight, 
Jupyter Notebooks, Amazon SageMaker Data Wrangler) 
• Using Athena to query data or to create views 
• Using Athena notebooks that use Apache Spark to explore data 



Task Statement 3.3: Maintain and monitor data pipelines. 

Knowledge of: 
• How to log application data 
• Best practices for performance tuning 
• How to log access to AWS services 
• Amazon Macie, AWS CloudTrail, and Amazon CloudWatch 
 
Skills in: 
• Extracting logs for audits 
• Deploying logging and monitoring solutions to facilitate auditing and 
traceability 
• Using notifications during monitoring to send alerts 
• Troubleshooting performance issues 
• Using CloudTrail to track API calls 
• Troubleshooting and maintaining pipelines (for example, AWS Glue, 
Amazon EMR) 
• Using Amazon CloudWatch Logs to log application data (with a focus on 
configuration and automation) 
• Analyzing logs with AWS services (for example, Athena, Amazon EMR, 
Amazon OpenSearch Service, CloudWatch Logs Insights, big data 
application logs) 



Task Statement 3.4: Ensure data quality. 

Knowledge of: 
• Data sampling techniques 
• How to implement data skew mechanisms 
• Data validation (data completeness, consistency, accuracy, and integrity) 
• Data profiling 

Skills in: 
• Running data quality checks while processing the data (for example, 
checking for empty fields)  
• Defining data quality rules (for example, AWS Glue DataBrew) 
• Investigating data consistency (for example, AWS Glue DataBrew) 



Domain 4: Data Security and Governance 

Task Statement 4.1: Apply authentication mechanisms. 

Knowledge of: 
• VPC security networking concepts  
• Differences between managed services and unmanaged services 
• Authentication methods (password-based, certificate-based, and role-based) 
• Differences between AWS managed policies and customer managed policies 
 
Skills in: 
• Updating VPC security groups 
• Creating and updating IAM groups, roles, endpoints, and services 
• Creating and rotating credentials for password management (for example, 
AWS Secrets Manager) 
• Setting up IAM roles for access (for example, Lambda, Amazon API Gateway, 
AWS CLI, CloudFormation) 
• Applying IAM policies to roles, endpoints, and services (for example, S3 
Access Points, AWS PrivateLink) 
Task Statement 4.2: Apply authorization mechanisms. 
Knowledge of: 
• Authorization methods (role-based, policy-based, tag-based, and attribute-
based)  
• Principle of least privilege as it applies to AWS security 
• Role-based access control and expected access patterns 
• Methods to protect data from unauthorized access across services 
Skills in: 
• Creating custom IAM policies when a managed policy does not meet the 
needs 
• Storing application and database credentials (for example, Secrets Manager, 
AWS Systems Manager Parameter Store) 
• Providing database users, groups, and roles access and authority in a 
database (for example, for Amazon Redshift) 
• Managing permissions through Lake Formation (for Amazon Redshift, 
Amazon EMR, Athena, and Amazon S3) 


Task Statement 4.3: Ensure data encryption and masking.

Knowledge of: 
• Data encryption options available in AWS analytics services (for example, 
Amazon Redshift, Amazon EMR, AWS Glue) 
• Differences between client-side encryption and server-side encryption  
• Protection of sensitive data 
• Data anonymization, masking, and key salting 
 

Skills in: 
• Applying data masking and anonymization according to compliance laws or 
company policies 
• Using encryption keys to encrypt or decrypt data (for example, AWS Key 
Management Service [AWS KMS]) 
• Configuring encryption across AWS account boundaries 
• Enabling encryption in transit for data. 



Task Statement 4.4: Prepare logs for audit. 

Knowledge of: 
• How to log application data 
• How to log access to AWS services 
• Centralized AWS logs 

Skills in: 
• Using CloudTrail to track API calls 
• Using CloudWatch Logs to store application logs 
• Using AWS CloudTrail Lake for centralized logging queries 
• Analyzing logs by using AWS services (for example, Athena, CloudWatch 
Logs Insights, Amazon OpenSearch Service) 
• Integrating various AWS services to perform logging (for example, Amazon 
EMR in cases of large volumes of log data) 



Task Statement 4.5: Understand data privacy and governance. 

Knowledge of: 
• How to protect personally identifiable information (PII) 
• Data sovereignty 

Skills in: 
• Granting permissions for data sharing (for example, data sharing for 
Amazon Redshift) 
• Implementing PII identification (for example, Macie with Lake Formation) 
• Implementing data privacy strategies to prevent backups or replications of 
data to disallowed AWS Regions 
• Managing configuration changes that have occurred in an account (for 
example, AWS Config)