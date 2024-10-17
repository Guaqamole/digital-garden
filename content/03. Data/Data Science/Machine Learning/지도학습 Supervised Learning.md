---
title: 지도학습 Supervised Learning
date: 2024-05-07
draft: false
tags:
  - MachineLearning
complete: true
---
## Overview
정답 (Label) 을 컴퓨터에 미리 알려주고 데이터를 학습 시키는 방법이며 학습에 필요한 데이터가 많이 필요한 딥러닝과 달리 비교적 적은 데이터와 시간이 덜 걸린다는 장점이 있다. 지도학습에는 분류와 회귀가 있다.

분류
주어진 데이터를 정해진 범주에 따라 분류

회귀
데이터들의 특성 (feature) 을 기준으로 연속된 값을 그래프로 표현하여 패턴이나 트렌드를 예측할때 사용

![|800](https://i.imgur.com/Qc7gFlW.png)

![|600](https://i.imgur.com/8b9aXJP.png)


## Classification Algorithms

### K-neartest Neighbor
![|625](https://i.imgur.com/K9yL5gc.png)

새로운 입력 (학습에사용하지않은새로운데이터) 을 받았을 때 기존 클러스터에서 모든 데이터와 인스턴스 기반 거리를 측정한 후 
가장 많은 속성을 가진 클러스터에 할당하는 분류 알고리즘

즉, 과거 데이터를 사용ㄹ하며 미리 분류 모형을 만드는것이 아니라 과거 데이터를 저장해두고 필요할 때 마다 비교를 수행하는 방식입니다.
따라서, K 값의 선택에 따라 새로운 데이터에 대한 분류 결과가 달라질 수 있다.

#### 학습절차
![|750](https://i.imgur.com/nvL3kKN.png)

예제 목표는 붓꽃에 대한 분류입니다. 참고로, 머신러닝 코드는 심층 신경망이 필요하지 않기 때문에 scikit-learn 을 이용합니다.
![|800](https://i.imgur.com/AjiQzPQ.png)


### Support Vector Machine (SVM)