---
title: MLFlow Model Signature
date: 2024-07-30
draft: false
tags:
  - MLOps
  - MLFlow
complete: true
---
## Overview
_MLflow에서 model signature_ 및 _model inference_ 의 개념은 머신 러닝 모델을 효과적으로 사용하는 데 필수적입니다. 이러한 구성 요소는 단순히 메타데이터를 제공하는 것 이상을 수행합니다. 모델 상호 작용에 대한 중요한 지침을 수립하여 MLflow 생태계 내에서 통합 및 사용성을 향상시킵니다.

MLflow의 모델 [시그니처는](https://mlflow.org/docs/latest/model/signatures.html#id1) 모델의 명확하고 정확한 작동에 필수적입니다. 추론에 필요한 추가 매개변수를 포함하여 모델 입력 및 출력에 대한 예상 형식을 정의합니다. 이 사양은 MLflow의 도구 및 외부 서비스와의 원활한 모델 통합을 보장하는 결정적인 가이드 역할을 합니다.

왜 이게 중요할까요?
![](https://i.imgur.com/MXzAoYT.png)

모델 서명과 입력 예시는 견고한 ML 워크플로의 기초이며, 일관성, 정확성, 사용 편의성을 보장하는 모델 상호작용에 대한 청사진을 제공합니다. 이는 모델과 사용자 간의 계약 역할을 하며, 예상 데이터 형식에 대한 명확한 가이드를 제공하여 잘못된 입력이나 예상치 못한 입력으로 인해 발생할 수 있는 오해와 오류를 방지합니다.

## Features
Model Signature로 다음과 같은 기능을 수행할 수 있습니다:
- 모델 입력, 출력, 파라미터에 대한 스키마를 정의
- `pyfunc` 기능과 같은 모델 배포 도구는 시그니처를 활용하여 inference에 동일한 출력을 보장
- 시그니처를 강제화하여 인풋을 동일하게 유지

## Model Input Example
### colum-based
열 기반 입력을 허용하는 모델의 경우, 예시는 단일 레코드 또는 레코드 배치일 수 있습니다. 샘플 입력은 다음 형식일 수 있습니다.

- 판다스 데이터 프레임
- `dict`(스칼라, 문자열 또는 스칼라 값 목록)
- `list`
- `str`
- `bytes`
주어진 예제는 Pandas DataFrame으로 변환된 다음 Pandas 분할 지향 형식을 사용하여 json으로 직렬화됩니다. 바이트는 base64로 인코딩됩니다. 다음 예제는 모델로 열 기반 입력 예제를 로깅하는 방법을 보여줍니다.

```python
input_example = {
    "sepal length (cm)": 5.1,
    "sepal width (cm)": 3.5,
    "petal length (cm)": 1.4,
    "petal width (cm)": 0.2,
}
mlflow.sklearn.log_model(..., input_example=input_example)
```


### tensor-based
텐서 기반 입력을 허용하는 모델의 경우, 예시는 입력 배치여야 합니다. 기본적으로 축 0은 모델 서명에 달리 지정되지 않는 한 배치 축입니다. 샘플 입력은 다음 형식 중 하나로 전달될 수 있습니다.

- numpy 배열
- Python에서 `dict`문자열을 numpy 배열로 매핑
- Scipy `csr_matrix`(희소 행렬)
- Scipy `csc_matrix`(희소 행렬).

다음 예제는 모델에 텐서 기반 입력 예제를 기록하는 방법을 보여줍니다.
```python
# each input has shape (4, 4)
input_example = np.array(
    [
        [[0, 0, 0, 0], [0, 134, 25, 56], [253, 242, 195, 6], [0, 93, 82, 82]],
        [[0, 23, 46, 0], [33, 13, 36, 166], [76, 75, 0, 255], [33, 44, 11, 82]],
    ],
    dtype=np.uint8,
)
mlflow.tensorflow.log_model(..., input_example=input_example)
```


### json-object
pandas DataFrame 대신 파이썬 사전 입력을 허용하는 모델의 경우, 예제를 그대로 저장하는 것을 지원합니다. 이를 활성화하려면 모델을 로깅할 때 를 `example_no_conversion`설정해야 합니다 `True`. 이 기능은 langchain, openai, pyfunc 및 transformers 플레이버에서만 지원되며, 여기서는 예제를 직접 저장하는 것이 추론 및 모델 제공에 유용합니다. 기본적으로 는 이전 버전과의 호환성을 위해 로 `example_no_conversion`설정됩니다 `False`.

다음 예제는 모델에 JSON 객체 입력 예제를 기록하는 방법을 보여줍니다.
```python
input_example = {
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "assistant", "content": "What would you like to ask?"},
        {"role": "user", "content": "Who owns MLflow?"},
    ]
}
mlflow.langchain.log_model(..., input_example=input_example, example_no_conversion=True)
```


### input parameters
추론 중에 추가 매개변수가 필요한 모델의 경우 모델을 저장하거나 로깅할 때 params를 포함하는 input_example을 포함할 수 있습니다. 이를 위해 샘플 입력은 .으로 제공되어야 합니다 `tuple`. 튜플의 첫 번째 요소는 입력 데이터 예제이고 두 번째 요소는 `dict`params의 a입니다. 유효한 params의 포괄적인 목록은 [Model Inference Params](https://mlflow.org/docs/latest/model/signatures.html#inference-params) 섹션에 설명되어 있습니다.
- 파이썬 `tuple`: (입력_데이터, 매개변수)
```python
# input_example could be column-based or tensor-based example as shown above
# params must be a valid dictionary of params
input_data = "Hello, Dolly!"
params = {"temperature": 0.5, "top_k": 1}
input_example = (input_data, params)
mlflow.transformers.log_model(..., input_example=input_example)
```




## How to Use
 [`sklearn.log_model()`](https://mlflow.org/docs/latest/python_api/mlflow.sklearn.html#mlflow.sklearn.log_model "mlflow.sklearn.log_model") 모델을 기록하거나 저장하는 것과 같은 함수를 사용할 때 [모델 입력 예제를](https://mlflow.org/docs/latest/model/signatures.html#input-example) 포함하기만 하면 됩니다.
 이 작업을 통해 MLflow 에서 **모델의 서명을 자동으로 유추 할 수 있습니다**.

### Column-based Signature (sklearn)
https://mlflow.org/docs/latest/python_api/mlflow.sklearn.html#mlflow.sklearn.log_model

#### input_example
```python
import pandas as pd
from sklearn import datasets
from sklearn.ensemble import RandomForestClassifier
import mlflow

iris = datasets.load_iris()
iris_train = pd.DataFrame(iris.data, columns=iris.feature_names)
clf = RandomForestClassifier(max_depth=7, random_state=0)

with mlflow.start_run():
    clf.fit(iris_train, iris.target)
    # Take the first row of the training dataset as the model input example.
    input_example = iris_train.iloc[[0]]
    # The signature is automatically inferred from the input example and its predicted output.
    mlflow.sklearn.log_model(clf, "iris_rf", input_example=input_example)
```

#### signature
```python
from mlflow.models import ModelSignature, infer_signature
from mlflow.types.schema import Schema, ColSpec

# Option 1: Manually construct the signature object
input_schema = Schema(
    [
        ColSpec("double", "sepal length (cm)"),
        ColSpec("double", "sepal width (cm)"),
        ColSpec("double", "petal length (cm)"),
        ColSpec("double", "petal width (cm)"),
    ]
)
output_schema = Schema([ColSpec("long")])
signature = ModelSignature(inputs=input_schema, outputs=output_schema)

# Option 2: Infer the signature
signature = infer_signature(iris_train, clf.predict(iris_train))

with mlflow.start_run():
    mlflow.sklearn.log_model(clf, "iris_rf", signature=signature)
```


### Tensor-based Signature (tensorflow)
https://mlflow.org/docs/latest/python_api/mlflow.tensorflow.html#mlflow.tensorflow.log_model
#### input_example
```python
import tensorflow as tf
import mlflow

mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

model = tf.keras.models.Sequential(
    [
        tf.keras.layers.Flatten(input_shape=(28, 28)),
        tf.keras.layers.Dense(128, activation="relu"),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(10),
    ]
)
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
model.compile(optimizer="adam", loss=loss_fn, metrics=["accuracy"])

with mlflow.start_run():
    model.fit(x_train, y_train, epochs=5)
    # Take the first three training examples as the model input example.
    input_example = x_train[:3, :]
    mlflow.tensorflow.log_model(model, "mnist_cnn", input_example=input_example)
```


#### signature
```python
import numpy as np
from mlflow.models import ModelSignature, infer_signature
from mlflow.types.schema import Schema, TensorSpec

# Option 1: Manually construct the signature object
input_schema = Schema(
    [
        TensorSpec(np.dtype(np.float64), (-1, 28, 28, 1)),
    ]
)
output_schema = Schema([TensorSpec(np.dtype(np.float32), (-1, 10))])
signature = ModelSignature(inputs=input_schema, outputs=output_schema)

# Option 2: Infer the signature
signature = infer_signature(testX, model.predict(testX))

with mlflow.start_run():
    mlflow.tensorflow.log_model(model, "mnist_cnn", signature=signature)
```


### Signature with params
https://mlflow.org/docs/latest/python_api/mlflow.transformers.html#mlflow.transformers.log_model

#### signature
```python
import mlflow
from mlflow.models import infer_signature
import transformers

architecture = "mrm8488/t5-base-finetuned-common_gen"
model = transformers.pipeline(
    task="text2text-generation",
    tokenizer=transformers.T5TokenizerFast.from_pretrained(architecture),
    model=transformers.T5ForConditionalGeneration.from_pretrained(architecture),
)
data = "pencil draw paper"

params = {
    "top_k": 2,
    "num_beams": 5,
    "max_length": 30,
    "temperature": 0.62,
    "top_p": 0.85,
    "repetition_penalty": 1.15,
    "begin_suppress_tokens": [1, 2, 3],
}

# infer signature with params
signature = infer_signature(
    data,
    mlflow.transformers.generate_signature_output(model, data),
    params,
)

# save model with signature
mlflow.transformers.save_model(
    model,
    "text2text",
    signature=signature,
)
pyfunc_loaded = mlflow.pyfunc.load_model("text2text")

# predict with params
result = pyfunc_loaded.predict(data, params=params)
```

#### schema
```python
from mlflow.models import ModelSignature
from mlflow.types.schema import ColSpec, ParamSchema, ParamSpec, Schema

input_schema = Schema([ColSpec(type="string")])
output_schema = Schema([ColSpec(type="string")])
params_schema = ParamSchema(
    [
        ParamSpec("top_k", "long", 2),
        ParamSpec("num_beams", "long", 5),
        ParamSpec("max_length", "long", 30),
        ParamSpec("temperature", "double", 0.62),
        ParamSpec("top_p", "double", 0.85),
        ParamSpec("repetition_penalty", "double", 1.15),
        ParamSpec("begin_suppress_tokens", "long", [1, 2, 3], (-1,)),
    ]
)
signature = ModelSignature(
    inputs=input_schema, outputs=output_schema, params=params_schema
)
```


### Setup Signature on a logged model
이미 로깅된 모델에 시그니처를 적용하는 방법이다.
```python
import pandas as pd
from sklearn import datasets
from sklearn.ensemble import RandomForestClassifier
import mlflow

X, y = datasets.load_iris(return_X_y=True, as_frame=True)
clf = RandomForestClassifier(max_depth=7, random_state=0)
with mlflow.start_run() as run:
    clf.fit(X, y)
    mlflow.sklearn.log_model(clf, "iris_rf")
```

```python
import pandas as pd
from sklearn import datasets
import mlflow
from mlflow.models.model import get_model_info
from mlflow.models import infer_signature, set_signature

# load the logged model
model_uri = f"runs:/{run.info.run_id}/iris_rf"
model = mlflow.pyfunc.load_model(model_uri)

# construct the model signature from test dataset
X_test, _ = datasets.load_iris(return_X_y=True, as_frame=True)
signature = infer_signature(X_test, model.predict(X_test))

# set the signature for the logged model
set_signature(model_uri, signature)

# now when you load the model again, it will have the desired signature
assert get_model_info(model_uri).signature == signature
```


### Setup Signature on a registered model
```python
from sklearn.ensemble import RandomForestClassifier
import mlflow
from mlflow.client import MlflowClient

model_name = "add_signature_model"

with mlflow.start_run() as run:
    mlflow.sklearn.log_model(RandomForestClassifier(), "sklearn-model")

model_uri = f"runs:/{run.info.run_id}/sklearn-model"
mlflow.register_model(model_uri=model_uri, name=model_name)
```

```python
from sklearn.ensemble import RandomForestClassifier
import mlflow
from mlflow.store.artifact.models_artifact_repo import ModelsArtifactRepository

client = mlflow.client.MlflowClient()
model_name = "add_signature_model"
model_version = 1
mv = client.get_model_version(name=model_name, version=model_version)

# set a dummy signature on the model version source
signature = infer_signature(np.array([1]))
set_signature(mv.source, signature)

# create a new model version with the updated source
client.create_model_version(name=model_name, source=mv.source, run_id=mv.run_id)
```

