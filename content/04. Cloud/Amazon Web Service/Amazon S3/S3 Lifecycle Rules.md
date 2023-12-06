---
title: S3 Lifecycle Rules
topic: S3 Lifecycle Rules
date: 2023-11-21
draft: false
tags:
  - AWS
  - S3
complete: true
---
S3는 버킷에 저장된 **객체의 수명 주기(Life Cycle)**를 관리할 수 있는 기능이 있다.

> [!success] 언제사용?
> 이 기능은 일정 시간이 지났을 때 사용되지 않는 파일들을 삭제하거나 다른 곳에 백업하여 하게 해준다.

전에 S3 스토리지 클래스에 대해서 알아보았고, 각 티어마다 특징과 요금제가 다르다는 사실도 알았다.

즉, 자신의 서비스 상황에 따라 적절히 수명주기 관리를 통해 잘 안쓰는 데이터를 IA나 Glacier로 이동시키는 등 <mark style="background: #C6AB16;">수명 주기를 활용하면 보다 비용 효율적으로 S3 관리가 가능해진다.</mark>

정리하자면, S3 수명주기는 간단하게 새로운 버전 파일은 ~하고, 예전 버전 파일은 삭제해줘 라는 스크립트라고 이해하면 된다.
- ex) 30일이 지난 후 삭제
- ex) 30일이 지난 후 Glacier로 옮기기

S3 버저닝 기능과 연동이 가능하며, 예전 버전과 현재 버전에 대해 설정 가능하다.

또한 파일이 업로드 / 삭제 / 업데이트 되었을 때 Lambda 호출도 가능하다.

![s3-lifecycle](https://blog.kakaocdn.net/dn/cMZZ6k/btrFuPjJoME/svLiWkiWSUNKyHc2joTic1/img.png)

![s3-lifecycle](https://blog.kakaocdn.net/dn/ohPiJ/btrFsd7sNZJ/xiL4E14QR6t9bo9NOJk8AK/img.png)

<br>

## **S3 수명주기 작업**

S3 수명 주기 구성에는 다음과 같은 두 가지 유형의 작업이 있다.

**1. 전환 작업** 

- 객체가 다른 스토리지 클래스로 전환할 시기를 정의
- 예를 들어, 생성 후 30일이 지나면 객체를 S3 Standard-IA 스토리지 클래스로 전환하거나, 생성 후 1년이 지나면 객체를 S3 Glacier 스토리지 클래스에 아카이브하도록 선택

**2. 만료 작업**

- 객체가 만료되는 시기를 정의
- Amazon S3는 만료된 객체를 자동으로 삭제
- 수명 주기 만료 비용은 선택한 객체 만료 시점에 따라 달라짐


<br>

## **S3 수명주기 사용해야 하는 경우**

#### 버킷에 주기적으로 로그를 업로드할 경우 (eg. ELB access log, VPC flow log 등)  
- 애플리케이션으로 부터 쌓이는 로그를 일정 기간 동안에 필요로 하지만, 그 이후에 사용자가 삭제하고 싶을 경우

#### 특정 기간 동안만 자주 액세스하는 문서
- 일부 문서는 특정 기간 동안에만 자주 액세스 되고, 그 이후에 거의 액세스가 없는 경우

#### 보관 목적의 데이터  
- 어떤 유형의 데이터는 주로 보관 목적으로 Amazon S3에 업로드할 수 있다.
- 예를 들어, 디지털 미디어, 금융 및 의료 기록, 가공되지 않은 유전체 염기 서열 데이터, 장기 데이터베이스 백업 파일, 그리고 규제 준수를 위해 보존해야 하는 데이터 등이 있다.

<mark style="background: #C6AB16;">S3의 수명주기는 무한으로 증가되는 S3 **버킷 용량을 주기적으로 정리**하는데 목적이 있다.</mark>

수명주기는 각 버킷별로 생성할 수 있으며, 같은 수명주기를 가지더라도 **각 버킷에서 새롭게 생성**해줘야 한다.

예를 들어, 처음 30일간 S3 Standard(버킷 티어 종류)에 객체를 저장한 후, 다음 30일간은 좀 더 저렴한 One Zone IA(버킷 티어 종류)에 객체를 저장하는 생애주기 규칙을 작성할 수 있다.

<mark style="background: #C6AB16;">이후 법령등에 의해 오래된 데이터를 1년간 추가로 보관해야 하는 경우, 365일간 Glacier(버킷 티어 종류)에 저장한 뒤 영구적으로 삭제하는 규칙 또한 추가할 수 있다.</mark>

접두사를 이용해서 버킷 내 일부 객체에 대해서만 생애주기 규칙을 적용하는 것도 가능하다.

단, 객체 이동 전 특정 클래스에 유지돼야 하는 최소 기간(ex. 30일)이 정해져 있으며, S3 Standard에서 Reduced Redundancy로 직접 이동시킬 수는 없다.

![Reduced Redundancy](https://blog.kakaocdn.net/dn/bjnFPN/btrFreFz6dH/yuXKAKV1dplGnSoTCoCNH1/img.png)

Amazon S3은 다음 다이어그램과 같이 스토리지 클래스 간 전환을 위한 폭포형(Waterfall) 모델을 지원한다.

<mark style="background: #C6AB16;">즉, S3 Standard 에서 S3 Standard-IA 로 전환은 가능하지만 S3 Standard-IA 에서 S3 Standard로는 전환이 불가능하다.</mark>

![Reduced Redundancy](https://blog.kakaocdn.net/dn/xbxsx/btrFt2KTyPU/VrBEkFDUV5MG4sK1k6zvj1/img.png)

<br>


## **S3 수명 주기 규칙 예제**

S3 **버저닝 기능을 사용하지 않은 상태**에서, **30일 후에** S3 Standard에서 **S3 IA One Zone으로 이동**시키고 다시 **90일** 뒤에 **영구 삭제**하는 규칙 작성

![life-cycle rule 1](https://blog.kakaocdn.net/dn/bKp1vz/btrFyRwSgUd/8kLTX3FhW28nMBHC3kH3u1/img.png)

![life-cycle rule 2](https://blog.kakaocdn.net/dn/cSgnnD/btrFBKCBwCp/rqdVybcVXfHgYwhqW9brOk/img.png)