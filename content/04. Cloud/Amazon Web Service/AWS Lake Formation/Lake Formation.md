---
title: Lake Formation
date: 2023-11-29
draft: false
tags:
  - AWS
complete: true
---

> [!success] 언제사용?
> 레이크 포메이션(Lake Formation)은 'fully managed service'로 **데이터 레이크의 구축, 보안 설정, 관리를 손쉽게** 만들어 주는 글루로 기반된 서비스입니다.
> 

레이크 포메이션은 데이터 레이크 구축 시 복잡하고 손이 많이 가는 단계들을 단순화하고 자동화합니다. 이러한 단계들에는 **데이터를 수집, 정제, 이동, 카탈로깅**하고 분석과 머신러닝을 위해 **데이터를 안전하게 접근 가능하도록** 하는 부분들이 포함됩니다. 사용자가 데이터 소스를 설정하기만 하면, 레이크 포메이션은 소스를 크롤링하여 데이터를 **S3 데이터 레이크로 이동**시켜 주게 됩니다. 

레이크 포메이션은 AWS Identity and Access Management **(IAM)에 기반한 자체 권한 관리 모델을 제공**합니다. 이러한 중앙 관리형 권한 관리 모델은 간단한 grant/revoke 메커니즘을 통해 데이터 레이크의 데이터에 대한 세부 레벨의 권한 관리를 가능하게 해줍니다. 

레이크 포메이션의 권한은 모든 데이터 레이크 데이터셋에 대해 **테이블, 컬럼 레벨에 적용**됩니다. 권한 관리가 연동되는 서비스는 AWS Glue, Amazon Athena, Amazon Redshift Spectrum, Amazon QuickSight Enterprise Edition, Amazon EMR이 존재합니다.

정리해보면 레이크 포메이션은 아래와 같은 부분들을 수행합니다:

- 데이터 레이크가 존재할 S3의 버킷과 path를 등록
- raw 데이터를 수집, 정제, 가공, 정리하는 데이터 플로우의 관리
- 데이터 레이크에 존재하는 데이터와 데이터 소스에 대한 메타데이터를 가진 Data Catalog의 생성 및 관리
- 메타데이터와 데이터에 대한 접근 정책의 관리 및 적용

이번 글에서는 **(1) 레이크 포메이션과 관련된 사항들을 확인**해보고, **(2) 간단한 데이터 환경을 구축하는 튜토리얼**을 진행해보도록 하겠습니다. 

- 레이크 포메이션의 구조와 주요개념들

---

## **레이크 포메이션의 구조와 주요개념 및 컴포넌트들**

레이크 포메이션의 구조는 아래와 같습니다. 아래와 같이 레이크 포메이션은 AWS Glue 크롤러와 ETL jobs들, 데이터 카탈로그, 보안과 접근 관리에 대한 부분을 포함합니다. 데이터가 안전하게 데이터 레이크에 저장되고 나서는, 사용자는 원하는 분석 도구를 사용하여 데이터에 접근할 수 있게 됩니다. 

![](https://blog.kakaocdn.net/dn/dra4C8/btq8QyiqAk2/Ogp6aDUubJts3IPsjzM8KK/img.png)
## 주요 개념

레이크 포메이션과 관련해 언급되는 주요 개념들을 아래와 같습니다:
### **Data Lake**
데이터 레이크는 S3에 저장되는 persistent한 데이터로 데이터 카탈로그를 사용해 레이크 포메이션에 의해 관리됩니다. 
### **Data Access**
레이크 포메이션은 AWS IAM 정책에 기반한 새로운 grant/revoke 권한 모델을 통해 안전하고 세분화된 접근 관리를 제공합니다. 

분석가나 데이터 사이언티스트는 Amazon Athena와 같은 서비스를 사용해 데이터에 접근할 수 있습니다. 이러한 부분에서 레이크 포메이션은 보안 정책을 통해 사용자가 접근이 필요한 데이터에만 접근할 수 있도록 해줍니다. 

### **Data Filters**
Lake Formation은 data access 기능을 제공할때 column, row 레벨까지 필터해서 사용자에게 데이터를 줄 수 있습니다
### **Blueprint**
블루프린트는 데이터 레이크에 데이터를 손쉽게 입수할 수 있도록 도와주는 데이터 관리 템플릿입니다. 레이크 포메이션은 각각 사전 정의된 RDS 또는 AWS CloudTrail 로그와 같은 source 타입을 가진 몇 가지 블루프린트를 제공합니다. 블루프린트로부터 시작해 사용자는 워크플로우를 생성할 수 있습니다. 워크플로우는 데이터를 로딩하고 업데이트하는 AWS Glue 크롤러, jobs, trigger로 구성되어 있습니다. 블루프린트는 데이터 소스, 데이터 타겟, 그리고 스케쥴을 워크플로우를 설정하기 위한 input으로 받습니다. 

### **Workflow**
워크플로우는 연관된 AWS Glue jobs, 크롤러, trigger들의 묶음을 위한 컨테이너입니다. 사용자는 워크플로우를 레이크 포메이션에서 생성할 수 있고, 그러한 워크플로우는 AWS Glue 서비스에서 실행됩니다. 레이크 포메이션은 워크플로우의 상태를 하나의 개체로 트래킹할 수 있습니다. 

워크플로우를 정의할 때, 사용자는 기반이 될 블루프린트를 선택할 수 있습니다. 그리고 이후 사용자는 워크플로우를 온디맨드 또는 스케쥴 형태로 실행할 수 있습니다. 

레이크 포메이션에서 생성한 워크플로우는 AWS Glue 콘솔에서 하나의 directed acyclis graph (DAG)로 보여지게 됩니다. DAG을 사용해서 사용자는 워크플로우의 진행을 트래킹하고 트러블슈팅을 진행할 수 있습니다. 

### **Data Catalog**
데이터 카탈로그는 persistent한 메타스토어입니다. 데이터 카탈로그는 managed 서비스로 Apache Hive와 유사하게 사용자가 메타데이터를 AWS Cloud에 메타데이터를 저장하고, 주석을 달아 관리하고, 공유할 수 있도록 합니다. 레이크 포메이션은 AWS Glue 데이터 카탈로그를 사용하여 데이터 레이크, 데이터 소스, transform, 타겟에 관한 메타데이터를 저장합니다.

데이터 소스와 타겟과 관련한 메타데이터는 데이터베이스와 테이블의 형태를 가지고 있습니다. 테이블은 스키마 정보, 파일 위치 정보 등을 저장합니다. 데이터베이스는 테이블들의 콜렉션입니다. 레이크 포메이션은 데이터 카탈로그에 속한 테이블과 데이터베이스의 접근을 수직적 권한의 구조로 제공합니다. 

### **Principal**
principal은 IAM 사용자나 역할(role) 또는 Active Directory 사용자를 뜻합니다.

### **Data Lake Administrator**
데이터 레이크 관리자는 모든 데이터 카탈로그 리소스나 데이터 위치에 대한 접근을 허용할 수 있는 principal입니다. 데이터 카탈로그의 첫 사용자로 데이터 레이크 관리자를 임명할 수 있고, 이 사용자는 리소스에 대한 더욱 세부적을 권한을 다른 principal에 허가할 수 있습니다. 

---
## 레이크 포메이션 컴포넌트
레이크 포메이션은 데이터 레이크 생성 및 관리 시 몇 가지 인터랙션 포인트를 제공합니다. 
### **레이크 포메이션 콘솔**
사용자는 레이크 포메이션을 사용해 데이터 레이크를 정의하고 관리하거나 권한을 허용하고 제한하는데 사용할 수 있습니다. 또한, 콘솔에서 블루프린트를 사용하여 데이터를 입수, 가공, 정제, discover할 수 있습니다. 그리고 콘솔에 대한 접근도 레이크 포메이션 사용자별로 허용하거나 제한할 수 있습니다.

### **레이크 포메이션 API와 CLI**
레이크 포메이션은 몇 가지 언어 특정의 SDKs와 AWS CLI를 통해 API 연산을 제공합니다. 레이크 포메이션 API는 AWS Glue API와 연동되어 작동하게 됩니다. 레이크 포메이션 API는 레이크 포메이션 권한을 관리하는 데에 중점을 두는 반면, AWS Glue API는 데이터 카탈로그 API를 제공하고 데이터에 대한 ETL 연산을 정의하고, 스케쥴링하고, 실행하는 데에 사용됩니다.