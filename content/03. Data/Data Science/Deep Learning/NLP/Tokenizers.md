---
title: Tokenizers
date: 2024-05-09
draft: false
tags:
  - DeepLearning
  - NLP
complete: true
---
토크나이저는 NLP 파이프라인의 핵심 구성 요소 중 하나입니다. 이는 한 가지 목적, 즉 텍스트를 모델에서 처리할 수 있는 데이터로 변환하는 데 사용됩니다. 모델은 숫자만 처리할 수 있으므로 토크나이저는 텍스트 입력을 숫자 데이터로 변환해야 합니다. 이 섹션에서는 토큰화 파이프라인에서 정확히 무슨 일이 일어나는지 살펴보겠습니다.

NLP 작업에서 일반적으로 처리되는 데이터는 원시 텍스트입니다. 다음은 그러한 텍스트의 예입니다.

```python
Jim Henson was a puppeteer
```

그러나 모델은 숫자만 처리할 수 있으므로 원시 텍스트를 숫자로 변환하는 방법을 찾아야 합니다. 이것이 바로 토크나이저가 하는 일이며, 이를 해결하는 방법은 많습니다. 목표는 가장 의미 있는 표현, 즉 모델에 가장 적합한 표현과 가능하다면 가장 작은 표현을 찾는 것입니다.

토큰화 알고리즘의 몇 가지 예를 살펴보고 토큰화에 관해 가질 수 있는 몇 가지 질문에 답해 보겠습니다.

## Word-based
장점: 쉽고 빠름
단점: 토큰이 많이 생성되어 적절한 표현을 검색할 수 없고 그 과정에서 정보가 손실됨
가장 먼저 떠오르는 토크나이저 유형은 _단어 기반_ 입니다 . 일반적으로 몇 가지 규칙만으로 설정하고 사용하는 것이 매우 쉽고, 종종 괜찮은 결과를 얻습니다. 예를 들어, 아래 이미지에서 목표는 원시 텍스트를 단어로 분할하고 각 단어에 대한 숫자 표현을 찾는 것입니다.

![](https://i.imgur.com/QRKihQv.png)

텍스트를 분할하는 방법에는 여러 가지가 있습니다. 예를 들어, Python의 `split()`. 기능을 적용하여 공백을 사용하여 텍스트를 단어로 토큰화할 수 있습니다

puntucation 에 대한 추가 규칙이 있는 다양한 단어 토크나이저도 있습니다. 이러한 종류의 토크나이저를 사용하면 꽤 큰 "vocabularies"가 나올 수 있습니다. 여기서 어휘는 corpus 에 있는 총 독립 토큰 수로 정의됩니다.

각 단어에는 0부터 시작하여 어휘 크기까지 ID가 할당됩니다. 모델은 이러한 ID를 사용하여 각 단어를 식별합니다.

단어 기반 토크나이저로 언어를 완전히 다루려면 언어의 각 단어에 대한 식별자가 있어야 하며, 이는 엄청난 양의 토큰을 생성합니다. 예를 들어 영어에는 500,000개 이상의 단어가 있으므로 각 단어에서 입력 ID까지의 맵을 작성하려면 많은 ID를 추적해야 합니다. 더욱이, "dog"와 같은 단어는 "dogs"와 같은 단어와 다르게 표현되며, 모델은 처음에는 "dog"와 "dogs"가 유사하다는 것을 알 수 없습니다. 즉, 두 단어를 관련 없는 것으로 식별합니다. "run" 및 "running"과 같은 다른 유사한 단어에도 동일하게 적용됩니다. 모델은 처음에는 이러한 단어를 유사한 것으로 간주하지 않습니다.

마지막으로, 우리 어휘에 없는 단어를 나타내기 위해서는 사용자 정의 토큰이 필요합니다. This is known as the “unknown” token, often represented as ”\[UNK]” or ”\<unk>”. **토크나이저가 이러한 토큰을 많이 생성하는 것을 보면 일반적으로 나쁜 징조입니다. 단어의 적절한 표현을 검색할 수 없고 그 과정에서 정보가 손실되기 때문입니다.** 어휘를 작성할 때의 목표는 토크나이저가 가능한 한 적은 단어를 알 수 없는 토큰으로 토큰화하는 방식으로 이를 수행하는 것입니다.

알려지지 않은 토큰의 양을 줄이는 한 가지 방법은 character - based 토크나이저를 사용하여 한 단계 더 깊이 들어가는 것입니다.

## Character-based
문자 기반 토크나이저는 텍스트를 단어가 아닌 문자로 분할합니다. 여기에는 두 가지 주요 이점이 있습니다.
장점:
- 어휘가 훨씬 작습니다.
- 모든 단어가 문자로 구성될 수 있으므로 어휘에서 벗어난(알 수 없는) 토큰이 훨씬 적습니다.
단점:
- 직관적으로 의미를 알기 힘들고 언어 별로 상이함

그러나 여기서도 공백과 구두점에 관해 몇 가지 질문이 제기됩니다.

![](https://i.imgur.com/7iHgoHj.png)

이 접근 방식도 완벽하지는 않습니다. 이제 표현은 단어가 아닌 문자를 기반으로 하기 때문에 직관적으로 의미가 덜하다고 주장할 수 있습니다. 각 문자는 그 자체로는 큰 의미가 없지만 단어의 경우에는 그렇습니다. 그러나 이것도 언어에 따라 다릅니다. 예를 들어 중국어의 경우 각 문자는 라틴어의 문자보다 더 많은 정보를 전달합니다.

고려해야 할 또 다른 사항은 모델에서 처리할 매우 많은 양의 토큰으로 끝날 것이라는 점입니다. 단어 기반 토크나이저에서는 단어가 단일 토큰일 뿐이지만 쉽게 10개 이상의 토큰으로 바뀔 수 있습니다. 문자로 변환할 때.

두 가지 장점을 모두 활용하기 위해 두 가지 접근 방식을 결합한 세 번째 기술인 _subword tokenization를_ 사용할 수 있습니다 .

## Subword Tokenization
하위 단어 토큰화 알고리즘은 자주 사용되는 단어를 더 작은 하위 단어로 분할해서는 안 되고, 희귀한 단어는 의미 있는 하위 단어로 분해해야 한다는 원칙에 의존합니다.

예를 들어, "짜증나게"는 드문 단어로 간주될 수 있으며 "짜증나는"과 "ly"로 분해될 수 있습니다. 이들 둘 다 독립형 하위 단어로 더 자주 나타날 가능성이 높으며 동시에 "짜증나게"의 의미는 "짜증나는"과 "ly"의 복합 의미로 유지됩니다.

다음은 하위 단어 토큰화 알고리즘이 "Let's do tokenization!" 시퀀스를 토큰화하는 방법을 보여주는 예입니다.

![](https://i.imgur.com/jg55Pqi.png)

이러한 하위 단어는 결국 많은 의미론적 의미를 제공하게 됩니다. 예를 들어 위의 예에서 "토큰화"는 "토큰"과 "화"로 분할되었으며 공간 효율적이면서 의미론적 의미를 갖는 두 개의 토큰입니다(두 개의 토큰만 필요함). 긴 단어를 표현하기 위해). 이를 통해 우리는 작은 어휘로 상대적으로 좋은 적용 범위를 가질 수 있으며 알 수 없는 토큰이 거의 없습니다.

이 접근 방식은 하위 단어를 함께 연결하여 (거의) 임의로 긴 복잡한 단어를 형성할 수 있는 터키어와 같은 교착어에서 특히 유용합니다.
### and more!
놀랍게도 이 외에도 더 많은 기술이 있습니다. 몇 가지 예를 들면 다음과 같습니다.

- GPT-2에서 사용되는 바이트 수준 BPE
- BERT에서 사용되는 WordPiece
- 여러 다국어 모델에 사용되는 SentencePiece 또는 Unigram

이제 API를 시작하려면 토크나이저가 어떻게 작동하는지에 대한 충분한 지식이 있어야 합니다.


## Load and Save Tokenizer
토크나이저를 로드하고 저장하는 것은 모델과 마찬가지로 간단합니다. 실제로 이는 동일한 두 가지 방법인 `from_pretrained()`및 `save_pretrained()`를 기반으로 합니다. 이러한 방법은 토크나이저에서 사용하는 알고리즘(모델의 _아키텍처_ 와 약간 유사 )뿐만 아니라 해당 어휘( 모델의 _가중치 와 약간 유사)를 로드하거나 저장합니다._

BERT와 동일한 체크포인트로 훈련된 BERT 토크나이저를 로드하는 것은 `BertTokenizer`클래스를 사용한다는 점을 제외하면 모델 로드와 동일한 방식으로 수행됩니다 .
```python
from transformers import BertTokenizer

tokenizer = BertTokenizer.from_pretrained("bert-base-cased")
```

`AutoModel` 과 마찬가지로 `AutoTokenizer` 클래스는 체크포인트 이름을 기반으로 라이브러리에서 적절한 토크나이저 클래스를 가져오고 모든 체크포인트와 함께 직접 사용할 수 있습니다.

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
```

이제 이전 섹션에 표시된 대로 토크나이저를 사용할 수 있습니다.

```python
tokenizer("Using a Transformer network is simple")
```

```python
{'input_ids': [101, 7993, 170, 11303, 1200, 2443, 1110, 3014, 102],
 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0],
 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1]}
```

토크나이저 저장은 모델 저장과 동일합니다.

```python
tokenizer.save_pretrained("directory_on_my_computer")
```

[자세한 내용은 3장](https://huggingface.co/course/chapter3)`token_type_ids` 에서 다루겠습니다 . 그리고 `attention_mask`에 대해서는 잠시 후에 설명하겠습니다 . 먼저 `input_ids`가 어떻게 생성되는지 살펴보겠습니다 . 이를 위해서는 토크나이저의 중간 메소드를 살펴봐야 합니다.

### Encoding
_텍스트를 숫자로 변환하는 것을 인코딩_ 이라고 합니다 . 인코딩은 토큰화와 입력 ID로의 변환이라는 2단계 프로세스로 수행됩니다.

앞서 살펴본 것처럼 첫 번째 단계는 텍스트를 일반적으로 _토큰_ 이라고 하는 단어(또는 단어의 일부, 구두점 기호 등)로 분할하는 것입니다 . 해당 프로세스를 관리할 수 있는 여러 규칙이 있으므로 모델 이름을 사용하여 토크나이저를 인스턴스화하여 모델이 사전 훈련될 때 사용된 것과 동일한 규칙을 사용하는지 확인해야 합니다.

두 번째 단계는 해당 토큰을 숫자로 변환하는 것입니다. 이를 통해 토큰으로 텐서를 구축하고 모델에 제공할 수 있습니다. 이를 위해 토크나이저에는 메소드를 사용하여 인스턴스화할 때 다운로드하는 부분인 _어휘가_`from_pretrained()` 있습니다 . 다시 말하지만, 모델이 사전 훈련될 때 사용된 것과 동일한 어휘를 사용해야 합니다.

두 단계를 더 잘 이해하기 위해 두 단계를 별도로 살펴보겠습니다. 토큰화 파이프라인의 일부를 개별적으로 수행하는 일부 메서드를 사용하여 해당 단계의 중간 결과를 표시하지만 실제로는 입력에서 직접 토크나이저를 호출해야 합니다(섹션 2 참조).

### Tokenization
`tokenize()`토큰화 프로세스는 토크나이저의 방법 으로 수행됩니다 .

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

sequence = "Using a Transformer network is simple"
tokens = tokenizer.tokenize(sequence)

print(tokens)
```

이 메소드의 출력은 문자열 또는 토큰 목록입니다.
```python
['Using', 'a', 'transform', '##er', 'network', 'is', 'simple']
```

이 토크나이저는 하위 단어 토크나이저입니다. 즉, 어휘로 표현될 수 있는 토큰을 얻을 때까지 단어를 분할합니다. 와 의 `transformer`두 토큰으로 분할된 경우 `transform` , `##er` 가 여기에 해당합니다 .

#### From Token to Input IDs
입력 ID로의 변환은 `convert_tokens_to_ids()`토크나이저 메서드에 의해 처리됩니다.

```python
ids = tokenizer.convert_tokens_to_ids(tokens)

print(ids)
[7993, 170, 11303, 1200, 2443, 1110, 3014]
```

이러한 출력은 일단 적절한 프레임워크 텐서로 변환되면 이 장의 앞부분에서 본 것처럼 모델에 대한 입력으로 사용될 수 있습니다.


### Decoding
_디코딩은_ 반대 방향으로 진행됩니다. 즉, 어휘 색인에서 문자열을 얻으려고 합니다. 이는 다음과 같은  `decode()` 방법으로 수행할 수 있습니다.

```python
decoded_string = tokenizer.decode([7993, 170, 11303, 1200, 2443, 1110, 3014])
print(decoded_string)
```

```python
'Using a Transformer network is simple'
```

이 `decode`방법은 인덱스를 다시 토큰으로 변환할 뿐만 아니라 동일한 단어의 일부였던 토큰을 함께 그룹화하여 읽을 수 있는 문장을 생성합니다. 이 동작은 새 텍스트(프롬프트에서 생성된 텍스트 또는 번역이나 요약과 같은 시퀀스 간 문제)를 예측하는 모델을 사용할 때 매우 유용합니다.

이제 토큰화, ID로 변환, ID를 다시 문자열로 변환 등 토크나이저가 처리할 수 있는 원자성 작업을 이해해야 합니다. 그러나 우리는 빙산의 일각만을 긁어낸 것에 불과합니다. 다음 섹션에서는 한계에 대한 접근 방식을 살펴보고 이를 극복하는 방법을 살펴보겠습니다.


## Multiple Sequence
이전 섹션에서는 가장 간단한 사용 사례인 짧은 길이의 단일 시퀀스에 대해 추론을 수행하는 방법을 살펴보았습니다. 그러나 몇 가지 질문이 이미 나타났습니다.

- 여러 시퀀스를 어떻게 처리합니까?
- _길이가 다른_ 여러 시퀀스를 어떻게 처리합니까 ?
- 모델이 잘 작동하도록 하는 유일한 입력은 어휘 색인입니까?
- 너무 긴 시퀀스 같은 것이 있나요?

이러한 질문이 어떤 종류의 문제를 야기하는지, 그리고 🤗 Transformers API를 사용하여 이러한 문제를 어떻게 해결할 수 있는지 살펴보겠습니다.

### Model expect a batch of inputs
이전에는 시퀀스가 ​​숫자 목록으로 변환되는 방법을 살펴보았습니다. 이 숫자 목록을 텐서로 변환하여 모델로 보내겠습니다.

```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence = "I've been waiting for a HuggingFace course my whole life."

tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)
input_ids = torch.tensor(ids)

# This line will fail.
model(input_ids)
```

```python
IndexError: Dimension out of range (expected to be in range of [-1, 0], but got 1)
```

안 돼! 왜 이것이 실패했는가? “우리는 섹션 2의 파이프라인 단계를 따랐습니다.

문제는 우리가 모델에 단일 시퀀스를 보낸 반면 🤗 Transformers 모델은 기본적으로 여러 문장을 기대한다는 것입니다. 여기서 우리는 토크나이저를 `sequence`. 그러나 자세히 살펴보면 토크나이저가 입력 ID 목록을 텐서로 변환한 것이 아니라 그 위에 차원을 추가했음을 알 수 있습니다.

```python
tokenized_inputs = tokenizer(sequence, return_tensors="pt")
print(tokenized_inputs["input_ids"])
```

```python
tensor([[  101,  1045,  1005,  2310,  2042,  3403,  2005,  1037, 17662, 12172,
          2607,  2026,  2878,  2166,  1012,   102]])
```

다시 시도하고 새로운 dimension을 추가해 보겠습니다.

```python
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence = "I've been waiting for a HuggingFace course my whole life."

tokens = tokenizer.tokenize(sequence)
ids = tokenizer.convert_tokens_to_ids(tokens)

input_ids = torch.tensor([ids])
print("Input IDs:", input_ids)

output = model(input_ids)
print("Logits:", output.logits)
```

입력 ID와 결과 로짓을 인쇄합니다. 출력은 다음과 같습니다.

```python
Input IDs: [[ 1045,  1005,  2310,  2042,  3403,  2005,  1037, 17662, 12172,  2607, 2026,  2878,  2166,  1012]]
Logits: [[-2.7276,  2.8789]]
```

_Batching (일괄 처리)_ 은 모델을 통해 여러 문장을 한 번에 보내는 행위입니다. 문장이 하나뿐인 경우 단일 시퀀스로 배치를 만들 수 있습니다.

```python
batched_ids = [ids, ids]
```

일괄 처리를 사용하면 모델에 여러 문장을 제공할 때 모델이 작동할 수 있습니다. 여러 시퀀스를 사용하는 것은 단일 시퀀스로 배치를 구축하는 것만큼 간단합니다. 하지만 두 번째 문제가 있습니다. **두 개 이상의 문장을 일괄 처리하려고 하면 길이가 다를 수 있습니다. 이전에 텐서를 사용해 본 적이 있다면 직사각형 모양이어야 하므로 입력 ID 목록을 텐서로 직접 변환할 수 없다는 것을 알고 있을 것입니다**. **이 문제를 해결하기 위해 일반적으로 입력을 _pad_ 한다고 표현합니다.**

### Padding the inputs → padding
```python
batched_ids = [
    [200, 200, 200],
    [200, 200]
]
```

이 문제를 해결하기 위해 _패딩을_ 사용하여 텐서를 직사각형 모양으로 만듭니다. 패딩은 값이 더 적은 문장에 _패딩 토큰_ 이라는 특수 단어를 추가하여 모든 문장의 길이를 동일하게 만듭니다 . 예를 들어, 10개 단어로 구성된 10개의 문장과 20개 단어로 구성된 1개의 문장이 있는 경우 패딩을 사용하면 모든 문장이 20개 단어로 구성됩니다. 이 예에서 결과 텐서는 다음과 같습니다.

```python
padding_id = 100

batched_ids = [
    [200, 200, 200],
    [200, 200, padding_id],
]
```

패딩 토큰 ID는 `tokenizer.pad_token_id` 에서 확인할 수 있습니다. 이를 사용하고 모델을 통해 두 문장을 개별적으로 일괄 전송해 보겠습니다.

```python
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)

sequence1_ids = [[200, 200, 200]]
sequence2_ids = [[200, 200]]
batched_ids = [
    [200, 200, 200],
    [200, 200, tokenizer.pad_token_id],
]

print(model(torch.tensor(sequence1_ids)).logits)
print(model(torch.tensor(sequence2_ids)).logits)
print(model(torch.tensor(batched_ids)).logits)
```

```python
tensor([[ 1.5694, -1.3895]], grad_fn=<AddmmBackward>)
tensor([[ 0.5803, -0.4125]], grad_fn=<AddmmBackward>)
tensor([[ 1.5694, -1.3895],
        [ 1.3373, -1.2163]], grad_fn=<AddmmBackward>)
```

일괄 예측의 로짓에 문제가 있습니다. 두 번째 행은 두 번째 문장의 로짓과 동일해야 하지만 값이 완전히 다릅니다!

이는 Transformer 모델의 주요 기능이 각 토큰을 _맥락화하는_ 주의 레이어이기 때문입니다. 이는 시퀀스의 모든 토큰에 참여하므로 패딩 토큰을 고려합니다. **모델을 통해 길이가 다른 개별 문장을 전달할 때 또는 동일한 문장과 패딩이 적용된 배치를 전달할 때 동일한 결과를 얻으려면 해당 Attention 레이어에 패딩 토큰을 무시하도록 지시해야 합니다. 이는 Attention Mask를 사용하여 수행됩니다.**

### Attention Masks
_어텐션 마스크는_ 입력 ID 텐서와 정확히 동일한 모양을 가진 텐서이며 0과 1로 채워집니다. 1은 해당 토큰에 주의해야 함을 나타내고 0은 해당 토큰에 주의하지 않아야 함을 나타냅니다(즉, 무시해야 함). 모델의 주의 레이어).

어텐션 마스크를 사용하여 이전 예제를 완성해 보겠습니다.

```python
batched_ids = [
    [200, 200, 200],
    [200, 200, tokenizer.pad_token_id],
]

attention_mask = [
    [1, 1, 1],
    [1, 1, 0],
]

outputs = model(torch.tensor(batched_ids), attention_mask=torch.tensor(attention_mask))
print(outputs.logits)
```

```python
tensor([[ 1.5694, -1.3895],
        [ 0.5803, -0.4125]], grad_fn=<AddmmBackward>)
```

이제 배치의 두 번째 문장에 대해 동일한 로짓을 얻습니다.

두 번째 시퀀스의 마지막 값이 어텐션 마스크의 0 값인 패딩 ID라는 점에 유의하세요.

### What about longer sequences? → truncation
Transformer 모델의 경우 모델을 전달할 수 있는 시퀀스의 길이에 제한이 있습니다. 대부분의 모델은 최대 512개 또는 1024개 토큰의 시퀀스를 처리하며 더 긴 시퀀스를 처리하라는 요청을 받으면 충돌이 발생합니다. 이 문제에는 두 가지 해결책이 있습니다.

- 지원되는 시퀀스 길이가 더 긴 모델을 사용
- 시퀀스를 자릅니다.
모델마다 지원되는 시퀀스 길이가 다르며 일부 모델은 매우 긴 시퀀스를 전문적으로 처리합니다. [Longformer가](https://huggingface.co/docs/transformers/model_doc/longformer) 하나의 예이고 다른 하나는 [LED](https://huggingface.co/docs/transformers/model_doc/led) 입니다 . 매우 긴 시퀀스가 ​​필요한 작업을 수행하는 경우 해당 모델을 살펴보는 것이 좋습니다

그렇지 않은 경우  `max_sequence_length`. 매개변수를 지정하여 시퀀스를 자르는 것이 좋습니다

```python
sequence = sequence[:max_sequence_length]
```