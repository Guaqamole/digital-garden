---
title: NDCG (Normalized Discounted Cumulative Gain)
date: 2023-11-17
draft: false
tags:
  - DataScience
  - Evaluation
  - Math
complete: true
---

- 랭킹 추천에 많이 사용되는 평가 지표
- 기존 정보 검색(Information Retrieval)에서 많이 사용했던 지표
- Ton-N 랭킹 리스트 만들고, 더 관심있거나 관련성 높은 아이템 포함 여부를 평가
    - ex) 검색창에 10개의 아이템이 떴고, 그중 1,3,5,7번의 4개가 관심있는 아이템이라고 생각되면 이를 가지고 랭킹이 제대로 매겨졌는지 평가
- **순위에 가중치**를 주고, 단순한 랭킹이 아닌 데이터의 성향을 반영하기 위한 평가 지표
    - 10개를 좋아할 것 같은데, 추천시스템이 그 중에서도 순서를 매겨주어 랭킹까지 정확히 맞췄는지를 반영하기 위한 평가지표라고 생각
- MAP(Mean Average Precisoin), Tok K Precision/Recall 등 **평가방법 보완**
    - 추천 또는 정보검색에서 특정 아이템에 biased된 경우
    - 이미 유명하고 잘 알려진 인기있는 아이템 또는 한명의 사용자에 의해서 만들어진 랭킹 등의 문제

![](https://velog.velcdn.com/images/hyxxnii/post/4c28d3f7-9be4-48b7-a617-23f39296bdc3/image.png)

- 가장 이상적인 랭킹(정답 랭킹)과 현재 점수를 활용한 랭킹사이의 점수를 cumulative하게 비교
- 1에 가까울수록 좋은 랭킹
- log2​i**로 normalization**하여 **순위가 낮을수록 가중치 감소**
    - ex) 3등에서 4등으로 넘어갈 때보다 1등에서 2등으로 넘어갈 때 더 가중치를 주기 위한 것 (1,2등을 맞춘거랑 98,99등 맞춘거랑은 중요도의 차이가 있겠지)
- 검색엔진, 영상, 음악 등 컨텐츠 랭킹 추천에서 평가지표로 활용됨
### $$CG_p$$​

- 상위 아이템 p개의 관련성을 합한 cumulative gain
- reli​ ➡️ binary(관련 여부) 또는 complex value(문제에 따라 세분화된 값)
    - ex) 아이템 1번이 얼마나 관련있는지
- 상위 아이템 p개에 대해서 동일한 비중으로 합함
    - 1-5번의 아이템 ➡️ 1,3,4번이 관련있는 아이템이고 2,5번은 관련 없을 때 1/0/1/1/0 이라고 동일한 비중으로 합함 (1-5번까지 순위에 상관없이)
### $$DCG_p$$​

- 개별 아이템의 관련성에 **log normalization**을 적용함
    - 수식을 보면, 1번 아이템의 rel에다가 2번 아이템부터 p번 아이템까지 log normalization 적용한 것
- 랭킹에 따라 비중을 discount해서 관련성 계산 (뒷 순위로 갈수록 가중치가 점점 줄어들 수 밖에 없다)
- 즉, 하위권 penalty 부여

### $$NDCG_p$$​

- 이상적인 DCG(Ideal DCG)를 계산하고 (즉 정답 셋), 최종 NDCG를 계산함
- IDCG는 전체 p개의 결과 중 가질 수 있는 가장 큰 DCG 값

<br>


---

<br>


## NDCG 예시

[![](https://velog.velcdn.com/images/hyxxnii/post/4e58ebf0-799c-412c-9bf7-6ccbf730ce23/image.png)](https://web.stanford.edu/class/cs276/handouts/EvaluationNew-handout-6-per.pdf)

- Groudn Truth(정답): Document Order가 _d4>d3>d2>d1_ 순
- Relevance는 2, 2, 1, 0
- 첫번째 DCG 값은 IDCG(Ideal DCG)겠지

---

## Other Evaluation Metrics

### 1. Precisoin @ K (Top-K)

- Precision at K
- Top-K의 결과로 Precision 계산
- 관련 여부를 0 또는 1로 평가
- ex) 1-0-1-1-0-0-1 일 때, Top-3는 2/3=(66.7%), Top-5는 3/5=(60%)

### 2. Mean Average Precision (MAP)

- 추천 랭킹 또는 검색 결과에 대한 average precision의 평균값 계산
- Precision@K(K1​,K2​,...,KR​) ➡️ 전체 Precision@K에 대한 평균값

### 3. Precision/Recall, AUC

- 정밀도, 재현율
- 분류 문제의 정확도를 검증하고자 할 때 주로 사용되는 평가 지표
