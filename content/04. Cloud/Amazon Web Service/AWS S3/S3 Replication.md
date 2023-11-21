---
title: AWS S3 Versioning
topic: S3 Replication
date: 2023-11-20
draft: false
tags:
  - AWS
  - S3
  - "#Storage"
  - "#Replication"
complete: true
Topics:
---

Amazon S3에는 두가지 Replication 방법이 존재한다.

비동기 복제 (asynchronous replication)를 활성화 하려면 <mark style="background: #C6AB16;">S3 Versioning 활성화</mark>해야한다.
IAM Permission 또한 필요.

## [[Cross-Region Replication (CRR)]] 
- 자동으로 다른 리전으로 복제
> [!success] 언제 사용?
> - 컴플라이언스 관리 (compliance)
> - 낮은 레이턴시 (lower latency)
> - 여러 계정내에서 복제 (replication across accounts)


## [[Same-Region Replication (SRR) ]]
- 동일한 리전에서 복제
- 소스와 타겟 버킷의 버저닝이 활성화 되어있어야함
> [!success] 언제 사용?
> - 로그 통합 (log aggregation),
> - 운영 서버용 계정과 테스트 계정간 실시간 복제 <mark style="background: #C6AB16;">(live replication</mark> between production and test accounts)

### 사용방법
#### 1. Replication Rule 생성
![](https://i.imgur.com/Eovt8E8.png)

#### 2. Source & Destination Bucket 설정
- 이후 IAM ROLE 설정.
![](https://i.imgur.com/1Tfvn4U.png)


#### 3. 기존에 존재하던 Object 복제 여부
- Replcation Rule  활성화시 기존에 존재하던 Object까지 복제할거냐고 물어본다.
- Yes 할 경우 `AWS Batch Operation` job을 통해 진행해야한다.
- No 할 경우 Rule <mark style="background: #C6AB16;">활성화 이후 생성한 Object에 대해 복제를 진행한다.</mark>
![](https://i.imgur.com/EApuv1j.png)

#### 4. Replication Version 확인
![](https://i.imgur.com/1UigtK7.png)
