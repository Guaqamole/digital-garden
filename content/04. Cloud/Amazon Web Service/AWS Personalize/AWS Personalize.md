---
title: AWS Personalize
date: 2023-11-13
draft: false
tags:
  - AWS
  - Personalize
complete: true
---

> [!INFO] Definition
> AWS 자체 구현된 머신러닝 기술을 이용하여 사용자가 데이터만 주입하면 개인화 추천 시스템을 제공해주는 서비스. 
> 
> 사용자가 머신러닝 구현 기술에 대한 이해가 없어도, 몇 가지 설정만으로 머신러닝 기술을 사용할 수 있다. 또한 단순히 추천을 해주는게 아닌 서비스 특성에 맞는 추천 시스템을 제공할 수 있다는것이 장점이다.



# How it works

Amazon Personalize가 동작하려면 여러개의 최적화된 Hyper-parameter와 추천에 필요한 학습된 알고리즘이 필요하다. 여기서 학습된 알고리즘은 콘텐츠 기반 필터링 (Content-Based Filtering)일 수도 있고, 협업 필터링 (Collarborative Filtering)을 통해 동작할 수도 있으며 두 가지의 조합일 수도 있다.

![How Amazon Personalize Works|800](https://i.imgur.com/SKdVRBv.png)

## Import Data
Amazon Personalize는 추천 시스템을 구축하기 위해 세가지 데이터셋이 필요하다:
1. Users: 사용자 메타데이터. 나이, 성별과 같은 정보뿐만 아니라 사용자의 고유 ID와 같은 정보를 포함한다.
2. Items : Item에 관한 메타데이터. 가격, 카테고리, 영화, 제품, 노래 목록 등과 같은 정보를 포함한다. 
3. Interactions : User와 Item간의 상호작용 내역. 주로 사용자가 클릭하여 상품을 구매했거나, 시청했던 비디오 항목들이 상호작용 내역이다. 
Amazon Personalize는 Data Platform이 아니기 때문에 데이터에 대한 별도의 전처리는 해주지 않는다. 해당 부분은 엔지니어가 직접 수행해야한다.


## Dataset
위 세가지 데이터는 골격만 맞추어진 Raw-data이고 `Dataset`는 Personalize가 실제로 읽고 학습할 수 있는 형태의 데이터이다. `Dataset Group` 은 개인화 추천 모델은 만드는데 필요한 datasets들의 집합체이다.

![](https://i.imgur.com/zt4Nb3v.png)


> [!INFO]
> `user-item interactions`데이터셋에 들어갈 피쳐들은 fields라는 항목에 사용자가 직접 추가할수있다. User, Item 데이터의 경우 필수가 아니지만 Interaction 데이터의 경우 추천 모델 생성에 필수이기 때문에 Fields 항목에 어떤 필드가 들어갈지, 피쳐간에 어떤 상관관계가 있는지, 파악하는것이 중요하다. 물론, 파라미터까지 최적화 시켜주는 performHPO 기능이 있기때문에 사용할 수 있는 금액이 여유롭다면 사용하는것이 좋다.
> ```json
{
  "type": "record",
  "name": "Interactions",
  "namespace": "your.namespace.schema",
  "fields": [
  {
  "name": "USER_ID",
  "type": "string"
  },
  {
  "name": "ITEM_ID",
  "type": "string"
  },
  {
  "name": "TIMESTAMP",
  "type": "long"
  },
  {
  "name": "EVENT_TYPE",
  "type": "string"
  }
  ],
  "version": "1.0"
 }


## Solution
Personalize에서 Solution은 “어떤 모델을 사용할 것인가”를 정하는 스텝이다.
![](https://i.imgur.com/dOtmMIm.png)


### Recipe
추천 Algorithm, 데이터 전처리 및 기타 Parameters등 개인화 추천 모델을 만드는데 필요한 작업들이 명시되어 있는 문서 혹은 블루 프린트이다. Personalize 솔루션에서 제공하는 레시피는 다음과 같다:
- `aws-sims` : CF기반의 알고리즘으로 주어진 아이템과 유사한 아이템을 추천 (Input:`Item`)
- `aws-popularity-count` : 인기도 모델로 데이터 세트에서 가장 인기 있는 항목을 추천, 모든 사용자에게 동일한 리스트 반환 (Input:`User`)
- `aws-hrnn` : Personalize의 대표 알고리즘인 Session 기반의 HRNN 알고리즘 (Input:`User`)
- `aws-user-personalization` : 2020년 말에 나온 레시피로 HRNN 및 기타 추천 알고리즘을 앙상블 형태로 제공? (제 추측 입니다…) (Input:`User`)
- `aws-personalize ranking` : 다른 레시피를 통한 추천 리스트 내에서 순위를 재설정하는 역할을 합니다. 추천 알고리즘의 `Ranking` 부분입니다.

### AutoML
Automatic (AutoML)를 선택하게 되면 현재 가지고 있는 Dataset를 분석해서 가장 적합한 recipe를 추천해준다.

### Perform HPO (Hyper-parameter Optimization)
피쳐들의 상관관계를 자동으로 최적화해주는 옵션.

### Filter
프로덕션 레벨의 추천 시스템에서는 filter가 필수적으로 필요하다. 기간이 오래된 상품을 추천하고 싶지 않을 경우 Personalize에선 조건을 걸어 결과에서 제외시킬 수 있다. `batch inference job` 생성시 사전에 만들어둔 filter를 (filter arn) 명시하여 적용 시킬 수 있다.

## Inference
학습된 모델을 사용하여 새로운 데이터에 대한 예측이나 결론을 도출하는 과정이다. AWS Personalize에는 추론을 두가지 방식으로 Serving 할 수 있다.

### 1. Batch Inference
배치 추론 작업은 Amazon S3 버킷에서 배치 `Input JSON` 데이터를 가져오고, 사용자가 지정한 Personalize 솔루션 버전을 사용하여 Recommendation을 생성한 다음, Recommendation List를 Amazon S3 버킷으로 Export하는 방식이다. 쉽게 말해 추천 결과를 1회성으로 받는 방식이며 Recipe마다 Data Input & Output 형식이 달라진다.

#### USER_PERSONALIZATION 레시피 예제
##### **INPUT**
```json
{"userId": "4638"}
{"userId": "663"}
{"userId": "3384"}
...
```

##### **OUTPUT**
```json
{"input":{"userId":"4638"},"output":{"recommendedItems":["63992","115149","110102","148626","148888","31685","102445","69526","92535","143355","62374","7451","56171","122882","66097","91542","142488","139385","40583","71530","39292","111360","34048","47099","135137"],"scores":[0.0152238,0.0069081,0.0068222,0.006394,0.0059746,0.0055851,0.0049357,0.0044644,0.0042968,0.004015,0.0038805,0.0037476,0.0036563,0.0036178,0.00341,0.0033467,0.0033258,0.0032454,0.0032076,0.0031996,0.0029558,0.0029021,0.0029007,0.0028837,0.0028316]},"error":null}
{"input":{"userId":"663"},"output":{"recommendedItems":["368","377","25","780","1610","648","1270","6","165","1196","1097","300","1183","608","104","474","736","293","141","2987","1265","2716","223","733","2028"],"scores":[0.0406197,0.0372557,0.0254077,0.0151975,0.014991,0.0127175,0.0124547,0.0116712,0.0091098,0.0085492,0.0079035,0.0078995,0.0075598,0.0074876,0.0072006,0.0071775,0.0068923,0.0066552,0.0066232,0.0062504,0.0062386,0.0061121,0.0060942,0.0060781,0.0059263]},"error":null}
{"input":{"userId":"3384"},"output":{"recommendedItems":["597","21","223","2144","208","2424","594","595","920","104","520","367","2081","39","1035","2054","160","1370","48","1092","158","2671","500","474","1907"],"scores":[0.0241061,0.0119394,0.0118012,0.010662,0.0086972,0.0079428,0.0073218,0.0071438,0.0069602,0.0056961,0.0055999,0.005577,0.0054387,0.0051787,0.0051412,0.0050493,0.0047126,0.0045393,0.0042159,0.0042098,0.004205,0.0042029,0.0040778,0.0038897,0.0038809]},"error":null}
...
```


#### **POPULAR_ITEMS (Popularity-Count only)** 레시피 예제
##### **INPUT**
```json
{"userId": "12"}
{"userId": "105"}
{"userId": "41"}
...
```
##### **OUTPUT**
```json
{"input": {"userId": "12"}, "output": {"recommendedItems": ["105", "106", "441"]}}
{"input": {"userId": "105"}, "output": {"recommendedItems": ["105", "106", "441"]}}
{"input": {"userId": "41"}, "output": {"recommendedItems": ["105", "106", "441"]}}
...
```

#### **PERSONALIZED_RANKING 레시피 예제
##### **INPUT**
```json
{"userId": "891", "itemList": ["27", "886", "101"]}
{"userId": "445", "itemList": ["527", "55", "901"]}
{"userId": "71", "itemList": ["27", "351", "101"]}
...
```
##### **OUTPUT**
```json
{"input":{"userId":"891","itemList":["27","886","101"]},"output":{"recommendedItems":["27","101","886"],"scores":[0.48421,0.28133,0.23446]}}
{"input":{"userId":"445","itemList":["527","55","901"]},"output":{"recommendedItems":["901","527","55"],"scores":[0.46972,0.31011,0.22017]}}
{"input":{"userId":"71","itemList":["29","351","199"]},"output":{"recommendedItems":["351","29","199"],"scores":[0.68937,0.24829,0.06232]}}
...
```

#### **RELATED_ITEMS 레시피 예제
##### **INPUT**
```json
{"itemId": "105"}
{"itemId": "106"}
{"itemId": "441"}
...
```
##### **OUTPUT**
```json
{"input": {"itemId": "105"}, "output": {"recommendedItems": ["106", "107", "49"]}}
{"input": {"itemId": "106"}, "output": {"recommendedItems": ["105", "107", "49"]}}
{"input": {"itemId": "441"}, "output": {"recommendedItems": ["2", "442", "435"]}}
...
```


### 2. Campaign
campaign 방식으로 사용할 경우, 추천 후 유저의 feedback 등도 streaming API를 통해 제공받을 수 있고, 실시간으로 추천이 가능하기 때문에 기능적인 측면에서 더 유용하다. 캠페인을 통해 실시간 추천을 받을 경우 Personalized Ranking 점수를 사용한다.

#### 사용자 개인화 추천 점수
Amazon Personalize는 사용자 개인화 레시피를 통해 사용자의 상호 작용 데이터 및 메타데이터를 기반으로 항목에 대한 점수를 생성한다. 이 점수는 Amazon Personalize가 사용자가 다음에 해당 항목과 상호 작용할지 여부에 대한 상대적 확실성을 나타내며, 점수가 높을수록 확실성이 높아진다.

Amazon Personalize는 카탈로그의 모든 항목을 서로 비교하여 0부터 1까지의 척도로 점수를 매기므로 모든 점수의 합계는 1이 된다. 예를 들어, 사용자에 대한 동영상 권장 사항을 추천해준 경우 Items 데이터 세트에 동영상이 세 개 있으면 해당 점수는 `0.6`, `0.3` 및 `0.1`가 될 수 있다.

각 User-item interaction의 점수는 다음 공식에 따라 계산된다.

![](https://i.imgur.com/mqfhdGg.png)



---

# Price

## 데이터 수집

Amazon Personalize에 업로드된 데이터 GB 당 요금이 부과됩니다. 여기에는 Amazon Personalize로 스트리밍된 실시간 데이터와 Amazon Simple Storage Service(S3)를 통해 업로드된 배치 데이터가 포함됩니다.  

**데이터 수집 비용**: GB당 0.05 USD


## 훈련

사용자 지정 솔루션을 생성할 때 데이터로 사용자 지정 솔루션을 훈련하는 데 사용된 훈련 시간에 대해 요금이 부과됩니다. 솔루션 훈련에 가장 적합한 인스턴스 유형을 Amazon Personalize가 자동으로 선택합니다. Personalize에서는 사용된 인스턴스를 기반으로 훈련 시간을 계산합니다. 즉, 청구된 훈련 시간이 훈련 중 시계에서 경과된 시간보다 많을 수 있습니다.  

**훈련 비용**: 훈련 시간당 0.24 USD


## 권장 사항(추론)

### 실시간 추천 (Campaign) 

실시간 추천 처리량은 초당 트랜잭션(TPS)으로 측정됩니다. Amazon Personalize는 기본적으로 최소 1TPS를 캠페인에 프로비저닝하며 필요에 따라 최소 프로비저닝 처리량을 늘릴 수 있습니다. 요청한 추천의 처리량이 프로비저닝된 최소 TPS를 초과하는 경우 Amazon Personalize는 추가 요청을 처리하도록 자동 조정되고 트래픽이 감소하면 프로비저닝된 최소 TPS로 돌아갑니다. 제공되는 실제 TPS는 5분 이내에 초당 평균 요청으로 계산됩니다.

실시간 권장 사항의 경우 시간당 처리 용량에 대해 TPS 시간 단위로 요금이 부과됩니다(가장 가까운 시간으로 반올림). 이 값은 제공되는 실제 TPS와 프로비저닝된 최소 TPS 사이의 최대값에 각 5분 단위로 요청이 처리되는 총 시간을 곱하여 계산됩니다. 사용량은 해당 월에 집계되고 사용 계층에 따라 청구됩니다.

TPS 시간 = 최대(실제 제공된 TPS, 프로비저닝된 최소 TPS) * (5/60분)

최소 프로비저닝 처리량을 늘리면 최소 요금이 증가한다는 점에 유의하세요.  

|   |   |
|---|---|
|**실시간 추천**|**요금**|
|적격 리전당 월별 최초 20,000TPS-시간|TPS-시간당 0.20 USD|
|적격 리전당 월별 다음 180,000TPS-시간|TPS-시간당 0.10 USD|
|적격 리전당 월별 다음 200,000TPS-시간 이상|TPS-시간당 0.05 USD|



### 배치 추천  

배치 추천의 경우 반환된 결과 수와 관계없이 요청된 추천 수에 따라 요금이 부과됩니다.  


|**배치 추천**|**1,000개의 권장 사항당 가격**|
|---|---|
|적격 리전당 월별 최초 2천만 개의 권장 사항|0.067 USD|
|적격 리전당 월별 다음 1억 8천만 개의 권장 사항|0.058 USD|
|적격 리전당 월별 2억 개 초과 권장 사항|0.050 USD|

