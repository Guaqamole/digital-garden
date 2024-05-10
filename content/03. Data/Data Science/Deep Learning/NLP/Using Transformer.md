---
title: Transformer
date: 2024-05-09
draft: false
tags:
  - DeepLearning
  - NLP
complete: true
---
## Purpose of Transformer
Transformer 모델은 일반적으로 매우 큽니다. 수백만에서 수백억 개의 _매개_ 변수를 사용하여 이러한 모델을 교육하고 배포하는 것은 복잡한 작업입니다. 더욱이 새로운 모델이 거의 매일 출시되고 각각 자체 구현이 있기 때문에 모든 모델을 시험해 보는 것은 쉬운 일이 아닙니다.

🤗 Transformers 라이브러리는 이 문제를 해결하기 위해 만들어졌습니다. 목표는 모든 Transformer 모델을 로드하고, 훈련하고, 저장할 수 있는 단일 API를 제공하는 것입니다. 라이브러리의 주요 기능은 다음과 같습니다.

- **사용 편의성** : 추론을 위한 최첨단 NLP 모델을 다운로드, 로드 및 사용하는 작업을 단 두 줄의 코드로 완료할 수 있습니다.
- **유연성** : 기본적으로 모든 모델은 간단한 PyTorch `nn.Module`또는 TensorFlow `tf.keras.Model`클래스이며 해당 기계 학습(ML) 프레임워크에서 다른 모델처럼 처리될 수 있습니다.
- **단순성** : 라이브러리 전반에 걸쳐 추상화가 거의 이루어지지 않습니다. "All in one file"이 핵심 개념입니다. 모델의 정방향 전달이 단일 파일에 완전히 정의되므로 코드 자체를 이해하고 해킹할 수 있습니다.

이 마지막 기능은 🤗 Transformer를 다른 ML 라이브러리와 상당히 다르게 만듭니다. **모델은 파일 간에 공유되는 모듈을 기반으로 구축되지 않습니다. 대신 각 모델에는 자체 레이어가 있습니다.** 모델을 더욱 접근하기 쉽고 이해하기 쉽게 만드는 것 외에도 다른 모델에 영향을 주지 않고 한 모델을 쉽게 실험할 수 있습니다.

[이 장은 모델과 토크나이저를 함께 사용하여 1장](https://huggingface.co/course/chapter1)`pipeline()` 에서 소개한 기능을 복제하는 엔드투엔드 예제로 시작됩니다 . 다음으로 모델 API에 대해 논의하겠습니다. 모델 및 구성 클래스를 자세히 살펴보고 모델을 로드하는 방법과 숫자 입력을 처리하여 예측을 출력하는 방법을 보여줍니다.[](https://huggingface.co/course/chapter1)

그런 다음 `pipeline()` 함수의 또 다른 주요 구성 요소인 토크나이저 API를 살펴보겠습니다. 토크나이저는 첫 번째와 마지막 처리 단계를 처리하여 텍스트를 신경망의 숫자 입력으로 변환하고 필요할 때 다시 텍스트로 변환하는 작업을 처리합니다. 마지막으로, 준비된 배치에서 모델을 통해 여러 문장 전송을 처리하는 방법을 보여주고, 상위 수준 `tokenizer()`함수를 자세히 살펴보며 마무리하겠습니다.

## Behind the Pipeline
다음 코드를 실행했을 때 뒤에서 무슨 일이 일어났는지 살펴보겠습니다
```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
classifier(
    [
        "I've been waiting for a HuggingFace course my whole life.",
        "I hate this so much!",
    ]
)
```

```python
[{'label': 'POSITIVE', 'score': 0.9598047137260437},
 {'label': 'NEGATIVE', 'score': 0.9994558095932007}]
```

[1장](https://huggingface.co/course/chapter1) 에서 본 것처럼 이 파이프라인은 전처리, 모델을 통해 입력 전달, 후처리의 세 단계를 그룹화합니다.

![](https://i.imgur.com/qefDMDm.png)

### 1. Preprocessing with a tokenizer
다른 신경망과 마찬가지로 Transformer 모델은 원시 텍스트를 직접 처리할 수 없으므로 파이프라인의 첫 번째 단계는 텍스트 입력을 모델이 이해할 수 있는 숫자로 변환하는 것입니다. 이를 위해 우리는 다음을 담당하는 _토크나이저(tokenizer)를 사용합니다._

- _입력을 토큰_ 이라고 하는 단어, 하위 단어 또는 기호(구두점 등)로 분할
- 각 토큰을 정수로 매핑
- 모델에 유용할 수 있는 추가 입력 추가

이 모든 전처리는 모델이 사전 훈련되었을 때와 정확히 동일한 방식으로 수행되어야 하므로 먼저 [모델 허브](https://huggingface.co/models) 에서 해당 정보를 다운로드해야 합니다 . 이를 위해 클래스 `AutoTokenizer`와 해당 `from_pretrained()`메서드를 사용합니다. 모델의 체크포인트 이름을 사용하면 모델의 토크나이저와 관련된 데이터를 자동으로 가져와서 캐시합니다(따라서 아래 코드를 처음 실행할 때만 다운로드됩니다).

파이프라인 의 기본 체크포인트 `sentiment-analysis`는 ( [여기서](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english)`distilbert-base-uncased-finetuned-sst-2-english` 해당 모델 카드를 볼 수 있음 )이므로 다음을 실행합니다.

```python
from transformers import AutoTokenizer

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
```

토크나이저가 있으면 문장을 직접 전달할 수 있고 모델에 제공할 준비가 된 사전을 다시 얻을 수 있습니다! 이제 남은 일은 입력 ID 목록을 텐서로 변환하는 것뿐입니다.

#### Transformer uses tensor

어떤 ML 프레임워크가 백엔드로 사용되는지 걱정할 필요 없이 🤗 Transformers를 사용할 수 있습니다. 일부 모델의 경우 PyTorch, TensorFlow 또는 Flax일 수 있습니다. 그러나 Transformer 모델은 _텐서_ 만 입력으로 허용합니다. 텐서에 대해 처음 듣는 경우 대신 NumPy 배열로 생각할 수 있습니다. NumPy 배열은 스칼라(0D), 벡터(1D), 행렬(2D)이거나 더 많은 차원을 가질 수 있습니다. 사실상 텐서입니다. 다른 ML 프레임워크의 텐서는 유사하게 동작하며 일반적으로 NumPy 배열만큼 인스턴스화하기가 간단합니다.

반환하려는 텐서 유형(PyTorch, TensorFlow 또는 일반 NumPy)을 지정하려면 다음 `return_tensors`인수를 사용합니다.

```python
raw_inputs = [
    "I've been waiting for a HuggingFace course my whole life.",
    "I hate this so much!",
]
inputs = tokenizer(raw_inputs, padding=True, truncation=True, return_tensors="pt")
print(inputs)
```

아직은 ***padding*** 과 ***truncation*** 에 대해 걱정하지 마세요. 이에 대해서는 나중에 설명하겠습니다. 여기서 기억해야 할 주요 사항은 한 문장 또는 문장 목록을 전달할 수 있을 뿐만 아니라 반환하려는 텐서 유형을 지정할 수 있다는 것입니다(유형이 전달되지 않으면 결과적으로 목록 목록을 얻게 됩니다). .

PyTorch 텐서의 결과는 다음과 같습니다.

```python
{
    'input_ids': tensor([
        [  101,  1045,  1005,  2310,  2042,  3403,  2005,  1037, 17662, 12172, 2607,  2026,  2878,  2166,  1012,   102],
        [  101,  1045,  5223,  2023,  2061,  2172,   999,   102,     0,     0,     0,     0,     0,     0,     0,     0]
    ]), 
    'attention_mask': tensor([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
}
```

출력 자체는 두 개의 키 `input_ids`와 를 포함하는 사전입니다 `attention_mask`. `input_ids`각 문장에 있는 토큰의 고유 식별자인 두 행의 정수(각 문장당 하나씩)를 포함합니다. `attention_mask`이 장의 뒷부분에서 가 무엇인지 설명하겠습니다 .


### 2. Model
토크나이저에서와 동일한 방식으로 사전 훈련된 모델을 다운로드할 수 있습니다. 🤗 Transformers는 다음 `from_pretrained()` 메소드 `AutoModel`도 포함하는 클래스를 제공합니다 .

```python
from transformers import AutoModel

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModel.from_pretrained(checkpoint)
```

이 코드 조각에서는 이전에 파이프라인에서 사용한 것과 동일한 체크포인트를 다운로드하고(실제로는 이미 캐시되었어야 함) 이를 사용하여 모델을 인스턴스화했습니다.

이 아키텍처에는 기본 Transformer 모듈만 포함되어 있습니다. 일부 입력이 주어지면 _hidden state 라고 부르는 feature을 출력합니다 . 각 모델 입력에 대해 **Transformer 모델에 의한 해당 입력의 맥락적 이해를** 나타내는 고차원 벡터를 검색합니다 .

이것이 이해가 되지 않는다면 걱정하지 마십시오. 나중에 모두 설명하겠습니다.

_이러한 hidden state는 그 자체로 유용할 수 있지만 일반적으로  head_ 라고 하는 모델의 다른 부분에 대한 입력입니다 . [1장](https://huggingface.co/course/chapter1) 에서는 동일한 아키텍처로 다양한 작업을 수행할 수 있었지만 이러한 각 작업에는 이와 관련된 다른 헤드가 있습니다.

#### High-Demansional Vector
Transformer 모듈의 벡터 출력은 일반적으로 큽니다. 일반적으로 다음과 같은 세 가지 차원을 갖습니다.

- **배치 크기** : 한 번에 처리되는 시퀀스 수(예제에서는 2)입니다.
- **시퀀스 길이** : 시퀀스의 숫자 표현 길이입니다(이 예에서는 16).
- **숨겨진 크기** : 각 모델 입력의 벡터 차원입니다.

마지막 값 때문에 "고차원"이라고 합니다. 숨겨진 크기는 매우 클 수 있습니다 (작은 모델에서는 768이 일반적이고 대형 모델에서는 3072 이상에 도달할 수 있음).

전처리한 입력을 모델에 공급하면 이를 확인할 수 있습니다.

```python
outputs = model(**inputs)
print(outputs.last_hidden_state.shape)
```

```python
torch.Size([2, 16, 768])
```

🤗 Transformers 모델의 출력은 `namedtuple`s 또는 사전처럼 동작합니다. 속성(우리가 했던 것처럼)이나 키( )로 요소에 액세스할 수 있으며 `outputs["last_hidden_state"]`, 찾고 있는 항목이 어디에 있는지 정확히 알고 있는 경우에는 인덱스( `outputs[0]`)로도 요소에 액세스할 수 있습니다.

#### Model Head
모델 머리는 숨겨진 상태의 고차원 벡터를 입력으로 사용하여 이를 다른 차원에 투영합니다. 일반적으로 하나 또는 몇 개의 선형 레이어로 구성됩니다.

![](https://i.imgur.com/YoJsHLT.png)

Transformer 모델의 Output은 처리를 위해 모델 헤드로 직접 전송됩니다.

이 다이어그램에서 모델은 embedding 레이어와 subsequent 레이어로 표현됩니다. 임베딩 레이어는 토큰화된 입력의 각 입력 ID를 연결된 토큰을 나타내는 벡터로 변환합니다. subsequent 레이어에서는 Attention 메커니즘을 사용하여 해당 벡터를 조작하여 문장의 최종 표현을 생성합니다.

🤗 Transformers에는 다양한 아키텍처가 있으며, 각 아키텍처는 특정 작업을 처리하도록 설계되었습니다. Non-exclusive lists:

- `*Model`(숨겨진 상태 검색)
- `*ForCausalLM`
- `*ForMaskedLM`
- `*ForMultipleChoice`
- `*ForQuestionAnswering`
- `*ForSequenceClassification`
- `*ForTokenClassification`
- and others

이 예에서는 문장을 긍정 또는 부정으로 분류할 수 있도록 시퀀스 분류 헤드가 있는 모델이 필요합니다. 따라서 실제로 `AutoModel` 클래스를 사용하지는 않지만 `AutoModelForSequenceClassification` 을 사용합니다.

```python
from transformers import AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
outputs = model(**inputs)
```

이제 출력의 모양을 살펴보면 차원이 훨씬 낮아집니다. 모델 헤드는 이전에 본 고차원 벡터를 입력으로 사용하고 두 값(레이블당 하나씩)을 포함하는 벡터를 출력합니다.

```python
print(outputs.logits.shape)
```

```python
torch.Size([2, 2])
```

두 개의 문장과 두 개의 레이블만 있으므로 모델에서 얻은 결과는 2 x 2 모양입니다.

### 3. Processing the Output
모델의 출력으로 얻은 값이 그 자체로 이해가 되진 않기 때문에 자세히 볼 필요가 있습니다.

```python
print(outputs.logits)
```

```python
tensor([[-1.5607,  1.6123],
        [ 4.1692, -3.3464]], grad_fn=<AddmmBackward>)
```

**우리 모델은 `[-1.5607, 1.6123]`첫 번째 문장과 `[ 4.1692, -3.3464]`두 번째 문장을 예측했습니다. 이는 확률이 아니라 모델의 마지막 계층에서 출력되는 정규화되지 않은 원시 점수인 _logits 입니다.** 확률로 변환하려면_ [SoftMax](https://en.wikipedia.org/wiki/Softmax_function) 레이어를 거쳐야 합니다 (모든 🤗 Transformers 모델은 로짓을 출력합니다. 훈련용 손실 함수는 일반적으로 SoftMax와 같은 마지막 활성화 함수를 Cross Entropy 와 같은 실제 손실 함수와 융합하기 때문입니다):

```python
import torch

predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
print(predictions)
```

```python
tensor([[4.0195e-02, 9.5980e-01],
        [9.9946e-01, 5.4418e-04]], grad_fn=<SoftmaxBackward>)
```

`[0.0402, 0.9598]`이제 첫 번째 문장과 `[0.9995, 0.0005]`두 번째 문장에 대해 모델이 예측된 것을 볼 수 있습니다 . 이는 인식 가능한 확률 점수입니다.

각 위치에 해당하는 레이블을 얻으려면 `id2label`모델 구성의 속성을 검사할 수 있습니다(자세한 내용은 다음 섹션에서 설명).

```python
model.config.id2label
```

```python
{0: 'NEGATIVE', 1: 'POSITIVE'}
```

이제 모델이 다음을 예측했다는 결론을 내릴 수 있습니다.

- 첫 번째 문장: 부정: 0.0402, 긍정: 0.9598
- 두 번째 문장: 음수: 0.9995, 양수: 0.0005

우리는 파이프라인의 세 단계, 즉 토크나이저를 사용한 전처리, 모델을 통해 입력 전달, 후처리를 성공적으로 재현했습니다! 이제 각 단계에 대해 자세히 알아보는 시간을 갖도록 하겠습니다.


## Creating Transformers
체크포인트에서 모델을 인스턴스화하려는 경우, 편리한 `AutoModel` 클래스를 사용할 수 있습니다.

클래스 `AutoModel`와 모든 관련 클래스는 실제로 라이브러리에서 사용할 수 있는 다양한 모델에 대한 간단한 래퍼입니다. 체크포인트에 적합한 모델 아키텍처를 자동으로 추측한 다음 이 아키텍처로 모델을 인스턴스화할 수 있으므로 영리한 래퍼입니다.

그러나 사용하려는 모델 유형을 알고 있는 경우 해당 아키텍처를 직접 정의하는 클래스를 사용할 수 있습니다. 이것이 BERT 모델에서 어떻게 작동하는지 살펴보겠습니다.

### Create Transformer
```python
from transformers import BertConfig, BertModel

# Building the config
config = BertConfig()

# Building the model from the config
model = BertModel(config)
print(config)
```

```python
BertConfig {
  [...]
  "hidden_size": 768,
  "intermediate_size": 3072,
  "max_position_embeddings": 512,
  "num_attention_heads": 12,
  "num_hidden_layers": 12,
  [...]
}
```

이러한 모든 속성의 기능을 아직 보지 못했지만 일부 속성은 알고있을거라 생각합니다. `hidden_size` 속성은 `hidden_states` 벡터의 크기를 정의하고 `num_hidden_layers`는 Transformer 모델의 레이어 수를 정의합니다.

#### Loading configs to model

**Random** 방법
기본 구성에서 모델을 생성하면 config가 임의의 값으로 초기화됩니다.

```python
from transformers import BertConfig, BertModel

config = BertConfig()
model = BertModel(config)

# Model is randomly initialized!
```

이 상태에서 모델을 사용할 수 있지만 횡설수설이 출력됩니다. 먼저 훈련을 받아야 합니다. 당면한 작업에 대해 처음부터 모델을 훈련할 수 있지만 [1장](https://huggingface.co/course/chapter1) 에서 본 것처럼 이 작업에는 오랜 시간과 많은 데이터가 필요하며 환경에 무시할 수 없는 영향을 미칩니다. 불필요하고 중복된 노력을 피하려면 이미 훈련된 모델을 공유하고 재사용할 수 있는 것이 필수적입니다.

**Pretrained** 방법
이미 학습된 Transformer 모델을 로드하는 것은 간단합니다. `from_pretrained()`다음 방법을 사용하여 이를 수행할 수 있습니다.

```python
from transformers import BertModel

model = BertModel.from_pretrained("bert-base-cased")
```

앞에서 본 것처럼 `BertModel` 을 동등한 `AutoModel`클래스로 대체할 수 있습니다. 체크포인트에 구애받지 않는 코드가 생성되므로 지금부터 이 작업을 수행하겠습니다. 코드가 하나의 체크포인트에서 작동한다면 다른 체크포인트에서도 원활하게 작동해야 합니다. 이는 체크포인트가 유사한 작업(예: 감정 분석 작업)에 대해 훈련된 한 아키텍처가 다르더라도 적용됩니다.

위의 코드 샘플에서는 `BertConfig`를 사용하지 않고 대신 `bert-base-cased`식별자를 통해 사전 학습된 모델을 로드했습니다. 이는 BERT 작성자가 직접 train 한 모델 체크포인트입니다. [모델 카드](https://huggingface.co/bert-base-cased) 에서 자세한 내용을 확인할 수 있습니다 .

이제 이 모델은 체크포인트의 모든 가중치로 초기화됩니다. 훈련된 작업에 대한 추론을 위해 직접 사용할 수 있으며, 새로운 작업에 대해 미세 조정할 수도 있습니다. 처음부터 훈련하는 것이 아니라 미리 훈련된 가중치로 훈련하면 빠르게 좋은 결과를 얻을 수 있습니다.

가중치는 캐시 폴더에 다운로드되어 캐시되었습니다(향후 메소드 호출 시 `from_pretrained()`다시 다운로드되지 않음). 기본값은 _~/.cache/huggingface/transformers_ 입니다 . 환경 변수를 설정하여 캐시 폴더를 사용자 정의할 수 있습니다 `HF_HOME`.

모델을 로드하는 데 사용되는 식별자는 BERT 아키텍처와 호환되는 한 모델 허브에 있는 모든 모델의 식별자가 될 수 있습니다. 사용 가능한 BERT 체크포인트의 전체 목록은 [여기에서](https://huggingface.co/models?filter=bert) 확인할 수 있습니다 .

**Saving** 방법
모델을 저장하는 것은 모델을 로드하는 것만큼 쉽습니다.  `save_pretrained()`:
```python
model.save_pretrained("directory_on_my_computer")
```

이렇게 하면 디스크에 두 개의 파일이 저장됩니다.
```python
ls directory_on_my_computer

config.json   pytorch_model.bin
```

_config.json_ 파일 을 살펴보면 모델 아키텍처를 구축하는 데 필요한 속성을 인식할 수 있습니다. 이 파일에는 체크포인트가 어디서 생성되었는지, 체크포인트를 마지막으로 저장했을 때 사용한 🤗 Transformers 버전과 같은 일부 메타데이터도 포함되어 있습니다.

pytorch_model.bin 파일 _은_ _상태 사전_ 으로 알려져 있습니다 . 여기에는 모델의 모든 가중치가 포함됩니다. 두 파일은 함께 사용됩니다. 모델의 아키텍처를 알기 위해서는 구성이 필요하며, 모델 가중치는 모델의 매개변수입니다.


### Use Transformer for inference
이제 모델을 로드하고 저장하는 방법을 알았으므로 모델을 사용하여 몇 가지 예측을 해보겠습니다. 변환기 모델은 토크나이저가 생성하는 숫자만 처리할 수 있습니다. 하지만 토크나이저에 대해 논의하기 전에 모델이 어떤 입력을 받아들이는지 살펴보겠습니다.

토크나이저는 입력을 적절한 프레임워크의 텐서에 캐스팅하는 작업을 처리할 수 있지만, 무슨 일이 일어나고 있는지 이해하는 데 도움이 되도록 입력을 모델에 보내기 전에 수행해야 할 작업을 간략하게 살펴보겠습니다.

몇 가지 시퀀스가 ​​있다고 가정해 보겠습니다.
```python
sequences = ["Hello!", "Cool.", "Nice!"]
```

_토크나이저는 이를 일반적으로 입력 ID_ 라고 하는 어휘 색인으로 변환합니다 . 이제 각 시퀀스는 숫자 목록입니다! 결과 출력은 다음과 같습니다.

```python
encoded_sequences = [
    [101, 7592, 999, 102],
    [101, 4658, 1012, 102],
    [101, 3835, 999, 102],
]
```

이것은 인코딩된 시퀀스 목록입니다. 목록의 목록입니다. Tensor는 직사각형 모양(행렬을 생각해 보세요)만 허용합니다. 이 "배열"은 이미 직사각형 모양이므로 텐서로 변환하는 것은 쉽습니다.

```python
import torch

model_inputs = torch.tensor(encoded_sequences)
```

#### Use Tensors as inputs to the model
모델은 다양한 인수를 허용하지만 입력 ID만 필요합니다. 다른 인수의 기능과 필요한 시기는 나중에 설명하겠지만 먼저 Transformer 모델이 이해할 수 있는 입력을 작성하는 토크나이저를 자세히 살펴봐야 합니다.
```python
output = model(model_inputs)
```



# 다음 [[Tokenizers]]