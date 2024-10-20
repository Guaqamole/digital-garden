## 아키텍처

### Redshift
#### 리더 노드
- JDBC나 ODBC를 통한 SQL 연결의 엔드포인트 역할 수행
- 데이터가 어디 위치해 있고 데이터에 대한 정보를 의미하는 메타 데이터를 저장
- 클러스터의 모든 쿼리 수행을 관리하는 역할
    
#### 컴퓨팅 노드
- 실제 데이터는 각 컴퓨팅 노드의 Local로 저장이 되며 Column 방식의 스토리지 형태로 저장
- 각 컴퓨팅 노드는 쿼리를 병렬로 실행
- 각 컴퓨팅 노드는 S3를 통해 Loading, Backup, Recovery를 수행
- DynamoDB, EC2 인스턴스로부터 병렬로 Loading이 가능
### BigQuery
- Redshift와 달리, 필요한 리소스를 자동으로 관리하는 서버리스 아키텍처 사용

## 쿼리 처리
### Redshift - Slice

- 병렬 처리 단위
- 각 컴퓨팅 노드는 복수의 Slice로 구성됨
- 각 슬라이스는 별도의 메모리, CPU 및 disk 공간 할당
- 각 슬라이스는 독립적인 워크로드를 병렬로 실행
### BigQuery - Slot
- SQL 쿼리를 실행하기 위해 BigQuery에 사용되는 가상 CPU
- 각 쿼리는 처리중인 데이터의 양과 복잡성에 따라 특정 수의 슬롯 사용
    

## Disk I/O

### Redshift

- Redshift는 각 데이터를 Column 별로 모아서 압축하여 저장하는 방식을 사용한다.
- 특정 필요한 Column 데이터 만을 불러와서 분석하는 경우가 많기 때문에, Row 기반의 스토리지 저장 방식 보다 디스크 스캔에서 훨씬 더 속도가 빠르다.
### BigQuery
- 저장소 계층에 Colossus라는 분산 파일 시스템 사용
    - 높은 처리량과 확장성을 위해 설계되어 BigQuery가 대량의 데이터를 쉽게 처리할 수 있도록 함
- 읽기와 쓰기 모두에 최적화되어 있으므로 빈번한 업데이트 또는 삽입이 필요한 워크로드에 적합
    

## 결과 캐싱
### Redshift

- 쿼리 실행 시간을 단축하기 위해 쿼리 결과를 리더 노드의 메모리에 캐싱
- 쿼리 실행 시마다 실행해야 하는 함수 (예: GETDATE)는 미사용
- 캐시 크기는 클러스터에 의해
- default : 활성화
### BigQuery
- 사용자 수준 캐시, 쿼리 캐시, 테이블 캐시로 구성
- 사용자 수준 캐시 : 쿼리 결과를 사용자 머신의 메모리에 저장
- 쿼리 캐시 : 자주 실행되는 쿼리와 그 결과를 BigQuery 서버의 메모리에 저장
- 테이블 캐시 : 최근 접근한 테이블 데이터를 BigQuery 서버의 메모리에 저장

## 운영
### Redshift
- 데이터는 Amazon S3로 지속적으로 자동 백업
    - 스트리밍 방식으로 백업을 진행하기 때문에, 빠르게 최신 데이터로 복구가 가능
- 클러스터 용량 만큼의 데이터는 기본으로 백업하는 것을 무상 제공
- 디스크 장애, 노드 복구는 자동으로 관리
    

### BigQuery
- 중복성과 내결함성을 위해 데이터가 자동으로 복제
- 특정 시점 복구를 제공하므로 사용자가 데이터를 특정 시점으로 복원 가능
- Redshift와 달리, 백업 기능이 서비스 비용에 포함
- 디스크 장애, 노드 복구는 자동으로 관리
    

# 비용
### Amazon Redshift
- 클러스터 유지 비용이 청구됨
- 온디맨드 형식, 예약 형식에 따라 요금이 다 다름
- 데이터가 어느 정도 될 것이고, 어느 정도 컴퓨팅 성능이 필요한지에 따라 다름
- dc2.large 온디맨드 기준
    - 2 vCPU, 15 GiB, 160GB
    - 노드 당 0.30$/시간
        - 월 216$
            
- 스토리지
    - 관리형 스토리지(RMS) (서울 리전에 대한 정보 X)
        - 로컬 스토리지를 사용하는 노드 유형의 경우 해당 없음
        - 0.0261$ / GB (도쿄 기준)
    - 백업용 스토리지(S3)
        - DW의 자동 스냅샷으로 생성되는 것에 대한 스토리지 비용은 청구 X (최대 35일까지 보존)
            - 24시간 내로 생성된 스냅샷으로의 복구는 비용 청구 X
            - 나머지는 RMS의 일부로 청구됨
        - 수동으로 스냅샷을 생성할 시 S3 스토리지 비용이 청구됨
### BigQuery
- 쿼리 가격
- 스토리지 가격
    - 스토리지 가격은 압축되지 않은 상태에서 테이블에 저장된 데이터의 양을 기준으로 책정
→ 장기 스토리지 : 90일 동안 수정되지 않은 테이블

## 결론
- 성능을 우선으로 고려하면 Redshift, 비용와 편이를 고려하면 BigQuery
    - Redshift에 세부 설정 사항이 많음
    - Redshift는 기본적으로 클러스터를 구축해야 하기 때문에 서버 비용 청구
- 데이터 양이 많지 않다면 BigQuery