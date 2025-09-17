---
title: Dacon - 심장 질환 예측
date: 2025-09-16
draft: false
tags:
  - Kaggle
complete: true
banner: /_assets/_img/_banners/nebula.jpg
link: https://dacon.io/competitions/official/236442/data
---

# 개요
### [주제]
심장 질환 유무를 예측하는 AI 알고리즘 개발
 
### [설명]
환자의 나이, 콜레스테롤 수치 등의 정보를 바탕으로 심장 질환 유무를 예측하는 AI 모델을 개발해야 합니다.

## 1. train.csv : 학습 데이터
- id: 데이터 고유 id
- age: 나이
- sex: 성별 (여자 = 0, 남자 = 1)
- cp: 가슴 통증(chest pain) 종류
	- 0 : asymptomatic 무증상
	- 1 : atypical angina 일반적이지 않은 협심증
	- 2 : non-anginal pain 협심증이 아닌 통증
	- 3 : typical angina 일반적인 협심증
- trestbps: (resting blood pressure) 휴식 중 혈압(mmHg)
- chol: (serum cholestoral) 혈중 콜레스테롤 (mg/dl)
- fbs: (fasting blood sugar) 공복 중 혈당 (120 mg/dl 이하일 시 = 0, 초과일 시 = 1)
- restecg: (resting electrocardiographic) 휴식 중 심전도 결과
	- 0: showing probable or definite left ventricular hypertrophy by Estes' criteria
	- 1: 정상
	- 2: having ST-T wave abnormality (T wave inversions and/or ST elevation or depression of > 0.05 mV)
- thalach: (maximum heart rate achieved) 최대 심박수
- exang: (exercise induced angina) 활동으로 인한 협심증 여부 (없음 = 0, 있음 = 1)
- oldpeak: (ST depression induced by exercise relative to rest) 휴식 대비 운동으로 인한 ST 하강
- slope: (the slope of the peak exercise ST segment) 활동 ST 분절 피크의 기울기
	- 0: downsloping 하강
	- 1: flat 평탄
	- 2: upsloping 상승
- ca: number of major vessels colored by flouroscopy 형광 투시로 확인된 주요 혈관 수 (0~3 개)
	- Null 값은 숫자 4로 인코딩됨
- thal: thalassemia 지중해빈혈 여부
	- 0 = Null
	- 1 = normal 정상
	- 2 = fixed defect 고정 결함
	- 3 = reversable defect 가역 결함
- target: 심장 질환 진단 여부
	- 0: < 50% diameter narrowing
	- 1: > 50% diameter narrowing


## 2. test.csv : 테스트 데이터
- id: 데이터 고유 id
- age: 나이
- sex: 성별 (여자 = 0, 남자 = 1)
- cp: 가슴 통증(chest pain) 종류
- trestbps: (resting blood pressure) 휴식 중 혈압(mmHg)
- chol: (serum cholestoral) 혈중 콜레스테롤 (mg/dl)
- fbs: (fasting blood sugar) 공복 중 혈당 (120 mg/dl 이하일 시 = 0, 초과일 시 = 1)
- restecg: (resting electrocardiographic) 휴식 중 심전도 결과
- thalach: (maximum heart rate achieved) 최대 심박수
- exang: (exercise induced angina) 활동으로 인한 협심증 여부 (없음 = 0, 있음 = 1)
- oldpeak: (ST depression induced by exercise relative to rest) 휴식 대비 운동으로 인한 ST 하강
- slope: (the slope of the peak exercise ST segment) 활동 ST 분절 피크의 기울기
- ca: number of major vessels colored by flouroscopy 형광 투시로 확인된 주요 혈관 수 (0~3 개)
- thal: thalassemia 지중해빈혈 여부

  

## 3. sample_submissoin.csv : 제출 양식
- id: 데이터 고유 id
- target: 심장 질환 진단 여부

위 자료는 아래 데이터를 바탕으로 제작되었습니다.

https://archive.ics.uci.edu/ml/datasets/Heart+Disease

Creators:
1. Hungarian Institute of Cardiology. Budapest: Andras Janosi, M.D.
2. University Hospital, Zurich, Switzerland: William Steinbrunn, M.D.
3. University Hospital, Basel, Switzerland: Matthias Pfisterer, M.D.
4. V.A. Medical Center, Long Beach and Cleveland Clinic Foundation: Robert Detrano, M.D., Ph.D.

#  Outline
## 1. 문제 정의
- **Task**: target (0/1) 분류
    **Metric**: 기본 Accuracy, 필요하면 ROC-AUC도 병행
    **Baseline 모델**: Logistic Regression (L2 정규화)
    
---

## 2. 데이터 점검
- 결측치 처리:
    `ca`에서 값이 4 → 결측으로 간주해야 함
    `thal`에서 값이 0 → 결측으로 간주해야 함
    target 분포 확인 (양성/음성 클래스 비율 확인 → class imbalance 여부 체크)
    

---

## 3. Feature 구분
- **수치형 (continuous)**: `age`, `trestbps`, `chol`, `thalach`, `oldpeak`
    **이산형/범주형 (categorical)**:
    `sex`, `cp`, `fbs`, `restecg`, `exang`, `slope`, `ca`, `thal`
    
---

## 4. 전처리 전략
- **수치형**:
    결측 → 중앙값 대치
    스케일링 (StandardScaler) → 로지스틱 수렴 안정화
    
- **범주형**:
    결측 → 최빈값 대치
    OneHot Encoding (dummy variable trap 방지 → drop_first 옵션 고려)
    

---

## 5. 데이터 분할
- train/validation split (Stratified, 예: 80/20)
    KFold (StratifiedKFold)로 교차검증 스키마 확정
    

---

## 6. Baseline 모델링 (Logistic Regression)

- 단순히 전체 feature를 넣고 학습
    CV 평균 Accuracy/AUC 기록
    계수 해석 → 어떤 변수들이 질환에 양/음 영향 미치는지 확인
    

---

## 7. 정규화/차원축소 탐색
- L1 (Lasso) vs L2 (Ridge) 비교
    L1 → 중요하지 않은 feature 가중치 0으로 수축 (변수 선택)
    L2 → 가중치 전체를 고르게 줄임 (안정성 ↑)
    성능 vs 해석력 균형 비교
    
---

## 8. 오류 분석

- 잘못 분류된 샘플 모아서 패턴 확인
    예: 나이/콜레스테롤은 높은데도 0으로 분류된 경우 → threshold 조정 or 상호작용 항 고려
    

---

## 9. 개선 루트

- Feature Engineering:
    `age` binning (연령대 그룹화)
    `oldpeak` 구간화 (ST depression 정도)
    `thal`, `cp` 같은 임상 범주형 변수를 조합해서 파생 피처 생성
    Hyperparameter 튜닝: C 값 (정규화 강도) 스윕
    최종 모델: CV 점수 안정적이면 전체 데이터 재학습 후 테스트 제출


# Keypoints
## 1. LogisticRegression 입력 데이터 타입
- **형식**: `numpy array` 또는 `pandas DataFrame`
    
- **값**: 모두 **숫자형(float, int)** 이어야 함
    
- 즉, 범주형이든 연속형이든 최종적으로는 숫자로 변환된 형태여야 학습 가능함.
    

---

## 2. 왜 범주형 변수를 변환해야 하나?

- 지금처럼 범주형을 숫자로 “라벨만 붙여둔 상태”(예: `sex=0/1`, `thal=0/1/2/3`)는 **순서/간격 의미가 없음**.
    
- Logistic Regression은 계수 β를 곱해서 선형 조합을 만드는데, **라벨숫자를 연속값처럼 잘못 해석**할 위험이 있음.
    
    - 예: `thal=3`이 `thal=1`보다 “3배 강한 효과”가 있다는 식으로 해석될 수 있음.
        
- 따라서 **원핫 인코딩(OneHot Encoding)** 같은 방법으로 “더미 변수화”해줘야 한다.
    
    - 예: `thal=1/2/3` → `thal_normal`, `thal_fixed`, `thal_reversable` 세 개의 0/1 변수로 변환.
        
    - 이렇게 하면 각 카테고리별 효과를 독립적으로 학습 가능.
        

---

## 3. 연속형 변수는?

- 이미 숫자라서 바로 쓸 수 있음.
    
- 다만 **스케일 차이(예: 나이는 20~80, 콜레스테롤은 100~400)** 때문에 모델 학습이 불안정해질 수 있어.
    
- 그래서 StandardScaler(평균0, 표준편차1) 같은 정규화 과정을 거치는 게 안정적임.
    

---

✅ 결론:

- **LogisticRegression input** = 전부 숫자형 (float/int)
    
- **범주형** → 반드시 더미 변수(OneHot)로 변환해야 “순서 착각” 방지
    
- **연속형** → 스케일링하면 학습 안정성과 계수 해석 용이성 ↑



# Notebook
## 1. 데이터 파악
```python

```


## 2. 데이터 시각화
