---
title: AWS Personalize Options
date: 2023-11-17
draft: false
tags:
  - AWS
  - Personalize
complete: true
---
## Solution
![](https://i.imgur.com/PN7ez7m.jpg)

### Perform HPO
- Hyper-parameter Optimization의 약자로, 머신 러닝 알고리즘에 대한 환경 설정을 조절하는 하이퍼파라미터의 최적값을 찾는 프로세스다. 
- 사용된 파라미터간의 상관 관계를 자동으로 분석해주어 모델 훈련시 자동으로 최적의 변수만 사용하도록 설정하는 옵션

### Perform AutoML
- Automated Machine Learning의 약자로, 머신 러닝을 실제 문제에 자동으로 적용하는 프로세스를 의미한다. 
- 활성화시 자동으로 피쳐 엔지니어링, 모델 선택 및 하이퍼파라미터 튜닝과 같은 작업을 포함한다.
- 비활성화하면 시스템이 모델 아키텍처나 다른 설정을 수동으로 조정하거나 미리 정의된 설정을 사용한다.

### Maximum Number of training jobs
- 훈련 가능한 최대잡의 개수


### Maximum Number of Parallel training jobs
- 병렬로 훈련 가능한 최대잡의 개수


### User History Length Percentile
#### Minimum
- 사용자 히스토리의 길이에 대한 최소 백분위수를 나타냅니다. 이 경우에는 가능한 최소 백분위수인 0%에서 시작합니다.
#### Maximum
- 최대 백분위수를 나타냅니다. 값 0.99는 99번째 백분위수까지 고려한다는 것을 의미합니다.

따라서 "사용자 히스토리 길이 백분위수: 최소 0.00; 최대 0.99"라는 뜻은 데이터셋 내에서 사용자 히스토리의 길이에 대한 백분위수 범위를 조사하거나 설정하고 있다는 것을 나타냅니다. 이는 최소(0%)부터 최대 99번째 백분위수까지의 사용자 히스토리 길이의 분포를 분석하거나 필터링할 수 있도록 합니다. 이를 통해 데이터 내에서 특정 백분위수 범위 내에 속하는 사용자에 중점을 둘 수 있습니다.

---

## Solution Version Metrics

![](https://i.imgur.com/hpPGUjo.jpg)

### NDCG(Normalized Discounted Cumulative Gain)
→ 순위의 품질을 측정하는 지표
- 높을수록 정확하게 추천이 가능
