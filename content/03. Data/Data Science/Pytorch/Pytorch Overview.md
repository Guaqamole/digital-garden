---
title: Pytorch Overview
date: 2024-05-03
draft: false
tags:
  - Pytorch
complete: true
---
## Pytorch 특징 및 장점
### 그전에, 텐서란? 
단일데이터형식으로된자료들의 다차원행렬이며 , 파이토치의데이터형태입니다.

텐서는그것이1차원이든N차원이든메모리에저장할때는1차원배열형태가됩니다. 즉. 1차원배열형태여야만메 모리에저장할수있습니다.
→ 변환된1차원배열을스토리지(storage)라고함

#### storage
- offset: 텐 서 에 서 첫 번 째 요 소 가 스 토 리 지 에 저 장 된 인 덱 스 입 니 다.
- stride: 각차원에 따라 다음 요소를 얻기 위해 건너뛰기(skIp)가 필요한 스토리지의 요소 개수입니다.
즉.스트라이드는메모리에서의텐서레이아웃을표현하는것으로이해하면됩니다. 요소가연속적으로저장되기때 문에행중심으로스트라이드는항상1입니다.

#### 왜 알아야하나?
선형대수학을배웠다면 전치행렬 (transpose) 이무엇인지알고 있을것입니다. 이게 오프셋과 스트라이드와 무슨 관계냐?
![|650](https://i.imgur.com/UkWFrik.png)

![|675](https://i.imgur.com/nfqFxAe.png)



### 특징
**GPU**에서 **텐서 조작** 및 **동적 신경망 구축**이 가능한 프레임워크
![|475](https://i.imgur.com/Ok5lWsM.png)

### 장점
1. 단순함 (효율적인 계산)
	1. 디버깅이 직관적이고 간결하다.
2. 성능 (낮은 CPU 사용)
	1. 모델 훈련을 위한 CPU 사용률이 텐서플로와 비교하여 낮다.
	2. 학습 및 추론 속도가 빠르고 다루기 쉽다.
3. 직관적인 인터페이스
	1. 텐서플로처럼 잦은 API 변경이 없어 (layers → slim → estimators → tf.keras)이 없어 배우기 쉽다.

## Pytorch 아키텍처
![|725](https://i.imgur.com/wzL8snM.png)

크게 세개의 계층으로 나뉜다.
1. 상위: 파이토치 API
2. 중간: 파이토치 엔진
3. 아래: 텐서에 대한 연산처리

### Pytorch API
파이토치API 계층에서는사용자가이해하기쉬운API를제공하여텐서에대한처리와신경망을 구축하고훈련할수있도록돕습니다.
→ C++로작성된파이토치엔진으로그작업을전달하는역할

#### 1. t o r c h : G P U를 지원하는 텐서 패키지
다차원텐서를기반으로 다양한수학적연산이가능하도록합니다. 특히CPU뿐만아니라GPU 에 서 연 산 이 가 능 하 므 로 빠 른 속 도 로 많 은 양 의 계 산 을 할 수 있 습 니 다.

#### 2. torch.autograd:자동미분패키지
Autograd는텐서플로(tensorflow), 카페(Caffe) ,CNTK같은다른딥러닝프레임워크와가장차별
되는패키지입니다. 일반적으로신경망에사소한변경(c)은닉층노드수변경)이있다면신정망 구축을처음부터다시시작해야합니다. 하지만파이토치는'자동미분(auto-diferentiation'이라고 하는 기술을채택하여미분 계산을효율적으로처리.
→ '연산그래프' 가즉시계산(실시간 으로네트워크수정이반영된 계산)되기때문에사용자는 다양한신경망을적용해볼수있습니다.

#### 3. torch.nn:신경망구축및훈련패키지
신경망을쉽게구축하고사용할수있습니다. 특히합성곱신경망, 순환
신경망, 정규화등이포함되어손쉽게신경망을구축하고학습시킬수있습니다.

#### 4. to r c h . m u l t i p r o c e s s i n g : 파 이썬 멀 티 프로세 싱 패 키지
프로세스전반에걸쳐텐서의메모리공유가가능합니다. 따라서서로다른 프 로 세 스 에 서 동 일 한 데 이 터 ( 텐 서 ) 에 대 한 접 근 및 사 용 이 가 능 합 니 다

#### 5. to r c h . u t i l s : D a t a L o a d e r 및 기 타 유 틸리 티 를제 공하 는 패 키 지
모델에데이터를제공하기위한torch,utils.data.Dataloader 모듈을주로사용합니다. 또한,
병목현상을디버깅하기위한torch.utils.bottleneck, 모델또는모델의일부를검사하기위한 torch.utils.checkpoint 등의모듈도있습니다.

### Pytorch Engine
![|575](https://i.imgur.com/xIUEUL6.png)

파이토치엔진라이브러리는C++로감싼(래핑) 다음 Python API 형태로제공된다. 구성:
- Autograd C++
- Aten C++
- JIT C++
- Python API


---

## Pytorch 학습 절차
![|700](https://i.imgur.com/0uO8duN.png)

### 모델 정의
파이토치에서 모델을 정의하기 위해선 모듈을 상속한 클래스를 사용한다.
- 모듈 : 한개 이상의 계층이 모여서 구성된것으로, 모듈이 모여 새로운 모듈을 만들 수 도있다.
- 계층 : 모듈 또는 모듈을 구성하는 한개의 계층으로 합성 곱층 (convolutional layer), 선형 계층 (linear layer)가 있다.
- 모델 : 최종적으로 원하는 네트워크, 한개의 모듈이 모델이 될 수도있다.

#### 1. 모듈을 상속 받지 않고 단순 신경망을 정의하는법
```python
model = nn.Linear(in_features=1, out_features=1, bias=True)
```

#### 2. 모듈을 상속하여 정의하는법
파이토치에서 nn.Module을 상속받는 모델은 기본적으로 `__init__()` 과  `forward()` 함수를 포함한다.
- Init: 모델에서 사용될 모듈 (nn.Linear, nn.Conv2d), 활성화 함수 등을 정의하고
- forward: 모델에서 실행되어야하는 연산을 정의한다.
```python
class MLP(Module):
    def __init__(self, inputs):
        super(MLP, self).__init__()
        self.layer = Linear(inputs, 1) # 계층 정의
        self.activation = Sigmoid() # 활성화 함수 정의
        
    def forward(self, X):
        X = self.layer(X)
        X = self.activation(X)
        return X
```

#### 3. Sequential 신경망을 정의하는 방법
nn.Sequential을 사용하면  `__ i n i t __( )` 에 서 사 용 할 네 트 워 크 모 델 들 을 정 의 해 줄 뿐 만 아 니 라 f o r w a r d ( ) 함 수 에 서 는 모 델 에 서 실 행 되 어 야 할 계 산 을 좀 더 가 독 성 이 뛰 어 나 게 코 드로 작 성 할 수있습니다.

```python
import torch.nn as nn

class MLP(nn.Module):
    
    def __init__(self):
        super(MLP, self).__init__()
        
        self.layer1 = nn.Sequential(
            nn.Conv2d(in_channels=3, out_channels=64, kernel_size=5),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2))
        
        self.layer2 = nn.Sequential(
            nn.Conv2d(in_channels=64, out_channels=30, kernel_size=5),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2))
        
        self.layer3 = nn.Sequential(
            nn.Conv2d(in_channels=30*5*5, out_channels=10, bias=True),
            nn.ReLU(inplace=True))
    
    def forward(self, x):
        x = self.layer1(x)
        x = self.layer2(x)
        x = x.view(x.shape[0], -1)
        x = self.layer3(x)
        return x
    
model = MLP() # 모델 객체 생성
```

#### 4. 함수로 신경망을 정의하는 방법
```python
def MLP(in_features = 1, hidden_features=20, out_features=1):
    hidden = nn.Linear(in_features=in_features, out_features=hidden_features, bias=True)
    activation = nn.ReLU()
    output = nn.Linear(in_features=hidden_features, out_features=out_features, bias=True)
    net = nn.Sequential(hidden, activation, output)
    return net
```

ReLU, Softmax및Sigmoid와같은활성화함수는모델을정의할때지정합니다.

### 모델 파라미터 정의
사전에 정의할 파라미터들은 다음과 같다:
1. <mark style="background: #C6AB16;">손실함수</mark> : 학습하는동안출력과실제값(정답)사이의오차를측정.
	- `wx + b` 를 계산한 값과, 실제 값인 `y` 의 오차를 구해서 모델의 정확성 측정.
	- BCELoss: 이진 분류
	- CrossEntropyLoss: 다중 클래스 분류
	- MSELoss: 회귀 모델
2. <mark style="background: #C6AB16;">옵티마이저</mark> : 데이터와 손실 함수를 바탕으로 모델의 업데이트 방법을 결정한다
	1. 옵티마이저는 `step()` 메서드를 통해 전달받은 파라미터 업데이트
	2. 모델의 파라미터별로 다른 기준 (학습률) 을 적용 시킬 수 있다.
	3. `torch.optim.Optimizer(params, defaults)`는 모든 옵티마이저의 기본이 되는 클래스다
	4. `zero_grad()` 메서드는 옵티마이저에 사용된 파라미터들의 기울기를 0으로 만든다.
	5. `torch.optim.lr_scheduler` 는에포크에따라학습률을조절할수있습니다.
	6. 옵티마이저 종류
	7. •optim,Adadelta, optim,Adagrad, optim,Adam, optim,SparseAdam, optim.Adamax • optim.ASGD, optim,LBFGS
• optim,RMSProp, optim,Rprop, optim,SGD
3. <mark style="background: #C6AB16;">학습률 스케줄러</mark> : 미 리 지 정 한 횟 수 의 에 포 크 를 지 날 때 마 다 학 습 률 을 감소(decay)시켜줍니다. 학습률스케줄러를이용하면학습초기에는빠른 학습을 진행하다가 전역최소점(glolxilminimum) 근처에 다다르면 학습률을줄여서 최적점을찾아갈수있도록해줍니다
4. <mark style="background: #C6AB16;">지표</mark> : 훈련과 테스트를 모니터링

> [!info] global minimum AND local minimum
> 손실 함수는 실제 값과 예측 값 차이를 수치화해주는 함수다.
> 이 오차 값이 클수록 손실 함수의 값이 크고, 오차 값이 작을수록 손실 함수의 값이 작아진다.
> 그리고 이 손실 함수의 값을 최소화하는 가중치와 바이어스를 찾는것이 학습 목표이다.
> .
> 전역 최소점 : 오차가 가장 작을 때 값을 의미 → 최종적으로 찾고자하는 최적점
> 지역 최소점 : 전역 최소점을 찾아가는 과정에서 만나는 hole 과 같은것으로 
> 옵티마이저가 학습을 멈추면 최솟값을 갖는 오차를 찾을 수 없는 문제가 발생.
> ![|550](https://i.imgur.com/cXfhxW8.png)

#### 모델 파라미터 정의 코드
```python
from torch.optim import optimizer

criterion = torch.nn.MSELoss()
optimizer = torch.optim.SDG(model.parameters(), lr=0.01, momentum=0.9)
scheduler = torch.optim.lr_scheduler.LambdaLR(optimizer=optimizer, lr_lambda=lambda epoch: 0.95 ** epoch)

for epoch in range(1, 100+1):
    for x, y in dataloader:
        optimizer.zero_grad()
        
loss_fn(model(x), y).backward()

optimizer.step()
scheduler.step()
```

### 모델 훈련
모델을 학습 시킨다는것은 `y = wx + b` 라는 함수에서 `w`와 `b`의 적절한 값을 찾는다는 의미입니다. `w`와 `b`에 임의의 값을 적용하여 시작하며 오차가 줄어들어 전역 최소점에 이를 때까지 파라미터(w, b)를 게속 수정한다.

#### 기울기 초기화
가장먼저필요한절차가 `optimizer.zero_grad()` 메서드를이용하여기울기를초기화하는것입니다. 
파이토치는기울기값을계산하기위해 loss.backward() 메서드를 이용하는데, 
이것을 사용하면새로운기울기값이이전기울기값에누적하여 계산됩니다. 

이방법은순환신경망(RecurrentNeuralNetwork. ANN) 모델을구현할때효과적이지만 
누적계산이필요하지않는모델에대해서는불필요합니다. 

따라서 기울기값에대해 누적계산이 필 요 하 지 않 을 때 는 
입 력 값 을 모 델 에 적 용 하 기 전 에 o p t i m i z e r . z e r o _g r a d ( ) 메 서 드 를 호 출 하 여
미 분 값 ( 기 울 기 를 구 하 는 과 정 에 서 미 분 을 사 용 ) 이 누 적 되 지 않 게 초 기 화 해 주 어 야 합 니 다.

#### 기울기 자동 계산
`loss.backward()`  는 배치가반복될때마다오차가중접적으로쌓이게되므로매번zero_grad() 를사용하여미분값을0으로 초기화합니다.

#### 모델 훈련 예시코드
```python
for epoch in range(100):
    yhat = model(x_train)
    loss = criterion(yhat, y_train)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```



### 모델 평가
모델에 대한 평가는 함수와 모듈을 이용 하는두가지방법이있습니다. 이전에 모델평가를 위해 패키지를 설치합니다.
```python
pip install torchmetrics
```

#### 함수로 모델 평가
```python
import torch
import torchmetrics

preds = torch.randn(10, 5).softmax(dim=1)
target = torch.randint(5, (10,))

acc = torchmetrics.functional.accuracy(preds, target)
```

#### 모듈로 모델 평가
```python
import torch
import torchmetrics
metric = torchmetrics.Accuracy()

n_batches = 10

for i in range(n_batches):
    preds = torch.randn(10, 5).softmax(dim=-1)
    target = torch.randint(5, (10,))
    
    acc = metric(preds, target)
    
    print(f"Accuracy on batch {i}: {acc}")
    
acc = metric.compute()
print(f"Accuracy on all data: {acc}")
```

#### 사이킷런에서 제공하는 혼동 행렬을 이용
사이킷런의 metrics모듈에서제공하는confusion_matrix,accuracy_score와classification_report 클래
스를이용하면쉽게정확도(accuricy) 를찾을수있습니다.

### 훈련 과정 모니터링
파이토치로머신러닝/ 딥러닝모델을만들어 학습해보면 
학습이 진행되는과정에서각파라미터 에어떤값들이어떻게변화하는지모니터링하기어렵습니다.

이때텐서보드를이용하면학습에 사용되는각종 파라미터값이어떻게변화하는지손쉽게시각화하여살펴볼수있으며성능을추
적 하 거 나 평 가 하 는 용 도 로 도 사 용 할 수 있 습 니 다.


---



## Pytorch Mac에 셋업하기



---


## Pytorch 맛보기 (자동차 상태 평가)
https://github.com/gilbutITbook/080289

데이터셋
1. price(자동차가격)
2. maint(자동차유지비용)
3. doors(자동차문개수) 4 . persons(수용인원)
5. lugcapacity(수하물용량)
6. s a f e t y ( 안 전 성)
7. output(차상태) :이데이터는unac(c허용불가능한수준)및acc(허용가능한수준),양호 ( good)및매우좋은(verygood,vgood)중하나의값을갖습니다.
이때, 1-6 의 컬럼 정보를 이용하여 자동차 상태를 예측하는 코드를 구현한다.

### Library
#### install
```python
pip install matplotlib
pip install seaborn
pip install scikit-learn
```
matplotlib : 2D, 3D형태의플롯(그래프)을그릴때주로사용하는패키지
seaborn : 데이터프레임으로다양한통계지표를표현할수있는시각화차트를제공하기때문에데이터분석에 활발히사용되는라이브러리
scikit-learn : 분류(classification), 회귀(regression), 군집(clustering), 의사결정트리( decisiontree) 등 다양한 머신러닝 알고리즘을 적용 할 수있는 함수를 제공하는 머신러닝 라이브러리
#### import
```python
import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline
```


### Dataset
#### load
```python
import os
dir = os.getcwd()
dataset = pd.read_csv(dir + "/data/car_evaluation.csv")
dataset.head()
```

#### visualization
```python
fig_size = plt.rcParams["figure.figsize"]
fig_size[0] = 8
fig_size[1] = 6
plt.rcParams["figure.figsize"] = fig_size
dataset.output.value_counts().plot(kind='pie', autopct='%0.05f%%', colors=['lightblue', 'lightgreen', 'orange', 'pink'], explode=(0.05, 0.05, 0.05, 0.05))
```
![|500](https://i.imgur.com/v1ltzi5.png)

### Preprocessing
딥러닝은통계알고리즘을기반으로하기때문에단어를숫자(텐서)로변환해야합니다. 
가장먼저필요한전처리는데이터를파악하는것입니다

주어진 데이터의 형태를 파악한 후 숫자로변환
해주어야하는데, 예제에서 다루는데이터의 칼럼들은 모두 범주형 데이터(에성별:여자, 남자)로구성되어있습니다. 
다음코드로단어를배열로변환하는방법에대해간단히살펴보겠습니다.

#### to tensor
먼저astype() 메서드를이용하여범주특성을갖는데이터를범주형(category) 타입으로변환
토치를이용한모델학습을해야하므로범주형타입을텐서로변환

데이터를 범주형 타입으로 변환
```python
categorical_columns = list(dataset.columns)

# dataset[category]
for category in categorical_columns:
    dataset[category] = dataset[category].astype('category') # 데이터를 범주형으로 변환
    
price = dataset['price'].cat.codes.values
maint = dataset['maint'].cat.codes.values
doors = dataset['doors'].cat.codes.values
persons = dataset['persons'].cat.codes.values
lug_capacity = dataset['lug_capacity'].cat.codes.values
safety = dataset['safety'].cat.codes.values

# Numpy Array
categorical_data = np.stack([price, maint, doors, persons, lug_capacity, safety], 1)
categorical_data[:10] # 합친 넘파이 배열중 열개의 행을 출력하여 보여준다.

# Tensor
categorical_data = torch.tensor(categorical_data, dtype=torch.int64)
categorical_data[:10] # 텐서 열개의 행을 출력하여 보여준다.
```

범주형 데이터를 텐서로 변환하기 위해 다음과 같은 절차가 필요하다
- 범주형 데이터 → `dataset[category]` → Numpy Arrray → Tensor

![|700](https://i.imgur.com/SjHfZQQ.png)

![|700](https://i.imgur.com/2nuLMFz.png)


#### output to tensor 
```python
outputs = pd.get_dummies(dataset.output)
outputs = outputs.values
outputs = torch.tensor(outputs).flatten()

print(categorical_data.shape)
print(outputs.shape)

>> torch.Size([1728, 6])
>> torch.Size([6912])
```


#### Word Embedding
워드 임베딩은 유사한 단어끼리 유사하게 인코딩 되도록 표현하는 방법입니다.
또한, 높은 차원의 임베딩일수록 단어 간의 세부적인 관계를 잘 파악할 수 있습니다.
따라서 단일 숫자로 변환된 넘파이 배열을 N 차원을 변경하여 사용해야합니다.

#### 벡터 차원 (임베딩 크기) 정의
배열을N차원으로변환하기위해먼저모든범주형칼럼에대한임베딩 크기(벡터 차원)를정의 합니다.
임베딩 크기에 대한 정확한 규칙은 없지만, <mark style="background: #C6AB16;">칼럼의 고유 값 수를 2로 나누는 것을 많이 사용합니다.</mark>

다음코드를이용하여(모든범주형칼럼의고유값수, 차원의크기)형태로배열을만듭니다.

```python
categorical_column_sizes = [len(dataset[column].cat.categories) for column in categorical_columns]

categorical_embedding_sizes = [(col_size, min(50, (col_size+1)//2)) for col_size in categorical_column_sizes]

print(categorical_embedding_sizes)
>> [(4, 2), (4, 2), (4, 2), (3, 2), (3, 2), (3, 2), (4, 2)]
```

#### Train & Test dataset
```python
total_records = 1728
test_records = int(total_records * .2) # 전체중 20%만 사용

categorical_train_data = categorical_data[:total_records - test_records]
categorical_test_data = categorical_data[total_records - test_records: total_records]
train_outputs = outputs[:total_records - test_records]
test_outputs = outputs[total_records - test_records:total_records]
```


### Model
```python
class Model(nn.Module):
    def __init__(self, embedding_size, output_size, layers, p=0.4):
        super().__init__()
        self.all_embeddings = nn.ModuleList([nn.Embedding(ni, nf) for ni, nf in embedding_size])
        self.embedding_dropout = nn.Dropout(p)
        
        all_layers = []
        
        for i in layers:
            all_layers.append(nn.Linear(input_size, i))
            all_layers.append(nn.ReLU(inplace=True))
            all_layers.append(nn.BatchNorm1d(i))
            all_layers.append(nn.Dropout(p))
            input_size = i
        
        all_layers.append(nn.Linear(layers[-1], output_size))
        self.layers = nn.Sequential(*all_layers)
        
    def forward(self, x_categorical):
        embeddings = []
        
        for i,e in enumerate(self.all_embeddings):
            embeddings.append(e(x_categorical[:,i]))
        x = torch.cat(embeddings, 1)
        x = self.embedding_dropout(x)
        x = self.layers(x)
        return x
```