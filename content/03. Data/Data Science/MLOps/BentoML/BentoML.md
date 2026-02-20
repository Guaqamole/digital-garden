---
title: BentoML
date: 2024-07-22
draft: false
tags:
  - MLOps
  - BentoML
complete: true
---
## Overview
[BentoML](https://github.com/bentoml/BentoML) 은 안정적이고 확장 가능하며 비용 효율적인 AI 애플리케이션을 구축하기 위한 통합 AI 애플리케이션 프레임워크입니다. 배포 프로세스를 간소화하고 모델 제공, 애플리케이션 패키징 및 프로덕션 배포에 필요한 모든 것을 통합하기 위한 엔드투엔드 솔루션을 제공합니다.

### features
- 통합된 포맷으로 배포를 간소화
- 모든 AI 모델로 애플리케이션 구축
- AI 애플리케이션을 위한 Inference 최적화
- 한 번만 빌드하면 어디든 배포 가능

### architecture
1. 모델 정의 : tensorflow, pytorch 다양한 라이브러리 제공
2. 모델 생성 및 저장 : 모델을 간단하고 쉽게 저장하고 불러올수있음 
3. 서비스 생성 : 모델을 래핑하고 추상화하여 외부 엔드포인트를 쉽게 구성할 수 있음
4. 벤토 만들기 : 서비스, 파이썬 패키지, 모델, 도커 설정과 같은 모든 빌드 옵션이 포함된 yaml 파일을 통해 밴토로 패키징 가능.
5. 벤토 배포 : Dockerfile 사용하여 컨테이너화 하거나, bentocloud에 배포하여 바로 서비스에 적용가능.
![[Pasted image 20240722140915.png|775]]


## Components
### Models
BentoML은 모델을 저장하고 관리하기 위한 로컬 모델 스토어를 제공하는데, 이는 BentoML이 유지 관리하는 로컬 파일 디렉토리입니다. 혹은, remote storage로 mlflow와 통합해서 사용할 수 있습니다.

#### 1. save model
download_iris.py
```python
import bentoml

from sklearn import svm
from sklearn import datasets

# Load training data set
iris = datasets.load_iris()
X, y = iris.data, iris.target

# Train the model
clf = svm.SVC(gamma='scale')
clf.fit(X, y)

# Save model to the BentoML local Model Store
saved_model = bentoml.sklearn.save_model("iris_clf", clf)
```

```python
python download_iris.py
```

##### 자세히 설정하고 싶으면…
```python
bentoml.pytorch.save_model(
    "demo_mnist",   # Model name in the local Model Store
    trained_model,  # Model instance being saved
    labels={    # User-defined labels for managing models in BentoCloud
        "owner": "nlp_team",
        "stage": "dev",
    },
    metadata={  # User-defined additional metadata
        "acc": acc,
        "cv_stats": cv_stats,
        "dataset_version": "20210820",
    },
    custom_objects={    # Save additional user-defined Python objects
        "tokenizer": tokenizer_object,
    }
)
```
#### 2. list model
```python
bentoml models list

 Tag                               Module           Size      Creation Time       
 iris_clf:6r7hwuch46fighsm         bentoml.sklearn  5.98 KiB  2024-07-22 14:05:03 
```

#### 3. load model
모델 인스턴스를 메모리로 다시 로드하려면 프레임워크별 `load_model`메서드를 사용합니다.
두가지 명령어를 사용할 수 있습니다.
##### load_model()
```python
import bentoml
from sklearn.base import BaseEstimator

model: BaseEstimator = bentoml.sklearn.load_model("iris_clf:latest")
print(model.__dict__)
```
##### get()
모델 정보를 검색하고 `to_runner`API에 액세스하려면 다음 메서드를 사용하세요
```python
import bentoml
bento_model: bentoml.Model = bentoml.models.get("iris_clf:latest")

print(bento_model.tag)
print(bento_model.path)
print(bento_model.custom_objects)
print(bento_model.info.metadata)
print(bento_model.info.labels)

my_runner: bentoml.Runner = bento_model.to_runner()
```

#### 4. mlflow
##### mlflow.load_model
```python
import bentoml

bentoml.mlflow.import_model(
    'my_mlflow_model',
    model_uri="runs:/<mlflow_run_id>/run-relative/path/to/model",
    signatures={
        "predict": {"batchable": True},
    }
)
```

##### mlflow.get
```python
import bentoml
# target model must be from the BentoML model store
model = bentoml.mlflow.get("my_mlflow_model")
```


### Runners
