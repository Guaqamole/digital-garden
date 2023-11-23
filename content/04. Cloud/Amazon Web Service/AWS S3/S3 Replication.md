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

S3의 Replication은 특정 버킷(Source Bucket)에서 다른 버킷(Target Bucket)으로  비동기 방식의 복제를 지원하는 기능이며  (S3 Versioning 활성화 필요) (IAM Permission 또한 필요). Replication Rule을 생성하여 특정 오브젝트가 소스 버킷에서 생성되었을때 타겟 버킷으로 복제를 할 수 있다.

Replication types:
- Versioning Object Replication
- S3 Batch Replication
- Delete Marker Replcation
- Cross Region Replication
- Same Region Replication

<br>

## S3 Batch Replication
버킷을 사용하다가 **중간에 Replication Rules를 활성화**하면, **기존의 객체 및 데이터**는 어떻게 될까요?
→ 버킷 속성의 복제를 활성화한 후에는, **새롭게 등록되는 객체만 복제 대상**이 됩니다.
> [!success] 언제사용?
> 만약 기존의 객체를 복제하고 싶다면, S3 배치 복제 기능인 S3 Batch Replication을 사용해야 합니다.
S3 배치 복제는 기존 객체부터 복제에 실패한 객체까지 복제할 수 있습니다. 

<br>

## Delete Marker Replication
그럼 Versioning되는 객체에 대한 복제가 이루어진다면, **삭제 마커** 또한 같이 생성될까요?
→ 기본적으로 삭제 마커가 복제되지 않음. 하지만, 삭제 마커를 선택적으로 복제를 선택할 수 있다.

> [!success] 언제사용?
> Delete Marker Replication이 활성화 되어 있다면 삭제 마커 또한 복제할 수 있습니다.

> [!warning]
> 그렇다면 원본 버킷의 Delete Marker를 삭제하면 어떻게 될까요?
→ 원본 버킷의 Delete Marker를 삭제해도 복제 버킷의 Delete Marker는 삭제되지 않습니다.

<br>

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
