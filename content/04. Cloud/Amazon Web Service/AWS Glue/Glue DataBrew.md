---
title: Glue DataBrew
date: 2023-11-29
draft: false
tags:
  - AWS
  - Glue
complete: true
---
AWS Glue DataBrew는 **코드를 작성하지 않고 사용자가 데이터를 정리하고 정규화할 수 있는 시각적 데이터 준비 도구**입니다. DataBrew를 사용하면 데이터를 분석 및 기계 학습(ML)에 대비하여 준비하는 데 소요되는 시간을 사용자 정의된 데이터 준비에 비해 최대 80% 단축할 수 있습니다. 250개 이상의 준비된 변환 중에서 선택하여 이상 징후를 걸러내거나 데이터를 표준 형식으로 변환하고 잘못된 값을 수정하는 데이터 준비 작업을 자동화할 수 있습니다.

DataBrew를 사용하면 비즈니스 분석가, 데이터 과학자, 데이터 엔지니어가 손쉽게 초기 데이터로부터 통찰력을 얻을 수 있습니다. DataBrew는 서버리스이므로 기술 수준에 관계없이 클러스터를 생성하거나 인프라를 관리하지 않고도 테라바이트 규모의 초기 데이터를 탐색하고 변환할 수 있습니다.

직관적인 DataBrew 인터페이스를 사용하면 초기 데이터를 대화식으로 찾고 시각화하고 정리하며 변환할 수 있습니다. DataBrew는 데이터 품질 문제를 식별하고 찾기 어려울 수 있는 지능적인 제안을 제공하여 문제를 해결하는 데 걸리는 시간을 절약합니다. DataBrew로 데이터를 준비하면 결과에 대한 조치를 취하고 더 빠르게 반복할 수 있습니다. 레시피의 단계로 변환을 저장할 수 있으며 나중에 다른 데이터셋과 함께 업데이트하거나 재사용하고 지속적으로 배포할 수 있습니다.

다음 이미지는 DataBrew가 고수준에서 어떻게 작동하는지를 보여줍니다.

<!--Upload failed, remote server returned an error: Imgur is over capacity. Please try again.-->
![[Pasted image 20231129130526.png]]

DataBrew를 사용하려면 프로젝트를 생성하고 데이터에 연결합니다. 프로젝트 작업 공간에서 데이터가 격자 형태의 시각적 인터페이스로 표시됩니다. 여기서 데이터를 탐색하고 값 분포 및 차트를 확인하여 데이터 프로필을 이해할 수 있습니다.

데이터를 준비하려면 250개 이상의 포인트 앤 클릭 변환 중에서 선택할 수 있습니다. 이에는 null 제거, 누락된 값 대체, 스키마 불일치 수정, 함수를 기반으로 열 생성 등이 포함됩니다. 또한 변환을 사용하여 자연어 처리 (NLP) 기법을 적용하여 문장을 구로 분할할 수 있습니다. 즉시 미리보기에서 변환 전후의 데이터 일부를 확인할 수 있으므로 전체 데이터셋에 적용하기 전에 레시피를 수정할 수 있습니다.

DataBrew가 데이터셋에 대해 레시피를 실행한 후 출력은 Amazon Simple Storage Service (Amazon S3)에 저장됩니다. 정제된 준비된 데이터셋이 Amazon S3에 있으면 다른 데이터 저장 또는 데이터 관리 시스템에서 해당 데이터를 가져올 수 있습니다.

## 기능
### **DataBrew** 레시피
레시피는 데이터 변환 단계의 집합입니다. 이러한 변환은 DataBrew 프로젝트의 하나 이상의 데이터 세트에 적용됩니다. 레시피에 대한 자세한 내용은 [AWS Glue DataBrew 레시피 생성 및 사용](https://docs.aws.amazon.com/databrew/latest/dg/recipes.html)을 참조하십시오.

### Custom SQL
