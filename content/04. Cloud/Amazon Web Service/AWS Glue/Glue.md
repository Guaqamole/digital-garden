---
title: Glue
date: 2023-11-28
draft: false
tags: 
complete: true
---

> [!success] 정의
> - 완전 관리형 데이터 **추출, 변환 및 적재(ETL)** 서비스 입니다.
> - 효율적인 비용으로 간단하게 여러 **데이터 스토어 및 데이터 스트림 간**에 원하는 데이터를 분류, 정리, 보강, 이동할 수 있습니다.
> - **2018년 5월** Seoul Region에 출시되었습니다.

## 특징
- **서버리스** 이므로 설정하거나 관리할 인프라가 없습니다.
- 원본 데이터의 변경 및 변경 데이터의 저장을 위한 별도의 저장소가 필요없고, **메타데이터 만으로 ETL작업**을 수행합니다.
- **정형데이터와 더불어 반정형 데이터**도 함께 작동하도록 설계되었습니다.
- ETL 스크립트에서 사용할 수 있는 **Dynamic Frame**이라는 구성 요소 사용하여 Apache Spark의 Data Frame과 완벽 호환 되고, 스키마가 필요 없고 Dynamic Frame용 고급 변환 세트 이용할 수 있습니다.
- **고성능의 워커**로 빠른 작업수행이 가능합니다.
- **스케쥴링** 기능으로 주기적인 작업 실행을 자동화할 수 있습니다.
- **북마크** 기능으로 작업상태를 저장하여 중단된 시점부터 작업 재개 가능합니다.
- 작업에 대한 **모니터링**을 지원합니다.

![](https://i.imgur.com/u2BAKw4.png)

1. **Data Store** : S3, RDS, Redshift, Kinesis, Apache kafka 등 데이터 저장 서비스나 데이터 스트림 서비스 입니다.
2. **Classifie**r : 데이터의 스키마를 결정하고 일반적인 파일들의 분류자를 제공합니다.(ex. csv, tsv 파일들)
3. **Crawler** : Classifier의 우선 순위 지정 목록을 통해 데이터의 스키마를 결정한 다음, 메타 데이터 테이블을 생성 합니다.
4. **Data Catalog** : 테이블 정의, 작업 정의 및 기타 관리 정보를 포함 합니다.
5. **Job** : ETL 작업을 수행하는 데 필요한 변환 스크립트, 데이터 원본 및 데이터 대상으로 구성된 비즈니스 로직 입니다.
6. **Connection** : AWS의 다른 데이터 저장 서비스나 사용자의 VPC환경 내부에 있는 데이터베이스에서 데이터 추출을 위한 장치 입니다.
7. **Script** : Apache Spark에서 사용하는 PySpark, Scala등으로 짜여진 ETL 작업 스크립트 입니다.
8. **Schedule or Event** : Job이 실행되는 주기를 설정하거나, 혹은 특정 이벤트로 인한 트리거로 실행할 수 있습니다.

---
## 상황별 파이프라인

### 데이터 통합
![](https://i.imgur.com/Kytcm8P.png)


### 이벤트 기반 ETL
![](https://i.imgur.com/uv6qMgF.png)


### 데이터 카탈로그 생성
![](https://i.imgur.com/5hwghwS.png)

### 노 코드 ETL
![](https://i.imgur.com/yh8HhVX.png)


### 데이터 품질관리 및 모니터링
![](https://i.imgur.com/UWUNHWM.png)

### 데이터 준비
![](https://i.imgur.com/G7UgT5m.png)

---
