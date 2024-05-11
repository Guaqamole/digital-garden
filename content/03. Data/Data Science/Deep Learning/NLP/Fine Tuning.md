---
title: Fine Tuning
date: 2024-05-09
draft: false
tags: 
complete: true
---
## Fine Tuning Process
### 1. Prepare Data
- download data
### 2. Process Data
- Use tokenizer to convert text to numbers for model
- Convert label to number if necessary
- Padding & Truncating
- Dynamic Padding (if necessary)
### 3. Training
### 4. Evaluating

PyTorch의 한 배치에 대해 Sequence Classifier 를 훈련하는 방법은 다음과 같습니다.

```python
import torch
from transformers import AdamW, AutoTokenizer, AutoModelForSequenceClassification

# Same as before
checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
sequences = [
    "I've been waiting for a HuggingFace course my whole life.",
    "This course is amazing!",
]
batch = tokenizer(sequences, padding=True, truncation=True, return_tensors="pt")

# This is new
batch["labels"] = torch.tensor([1, 1])

optimizer = AdamW(model.parameters())
loss = model(**batch).loss
loss.backward()
optimizer.step()
```

물론 두 문장으로 모델을 훈련시키는 것만으로는 좋은 결과를 얻을 수 없습니다. 더 나은 결과를 얻으려면 더 큰 데이터세트를 준비해야 합니다.

## Load Data
허깅페이스 데이터 허브에는 모델만 포함되는 것이 아닙니다. 다양한 언어로 된 여러 데이터 세트가 있습니다. [여기에서](https://huggingface.co/datasets) 데이터세트를 찾아볼 수 있으며 , 이 섹션을 완료한 후 새 데이터세트를 로드하고 처리해 보는 것이 좋습니다( [여기에서](https://huggingface.co/docs/datasets/loading) 일반 문서 참조 ). 하지만 지금은 MRPC 데이터 세트에 집중하겠습니다! 

**이는 10개의 다양한 텍스트 분류 작업에 걸쳐 ML 모델의 성능을 측정하는 데 사용되는 학문적 벤치마크인 [GLUE 벤치마크를](https://gluebenchmark.com/) 구성하는 10개의 데이터 세트 중 하나입니다 .**

🤗 데이터 세트 라이브러리는 허브에서 데이터 세트를 다운로드하고 캐시하는 매우 간단한 명령을 제공합니다. 다음과 같이 MRPC 데이터세트를 다운로드할 수 있습니다.

```python
from datasets import load_dataset

raw_datasets = load_dataset("glue", "mrpc")
raw_datasets
```

```python
DatasetDict({
    train: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx'],
        num_rows: 3668
    })
    validation: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx'],
        num_rows: 408
    })
    test: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx'],
        num_rows: 1725
    })
})
```

보시다시피 `DatasetDict`훈련 세트, 검증 세트 및 테스트 세트가 포함된 객체를 얻습니다. 각각에는 여러 열( `sentence1`, `sentence2`, `label`및 `idx`)과 각 세트의 요소 수인 가변 개수의 행이 포함되어 있습니다(따라서 훈련 세트에는 3,668개의 문장 쌍, 검증 세트에는 408개, 검증 세트에는 1,725개의 문장 쌍이 있습니다). 테스트 세트에서).

이 명령은 기본적으로 _~/.cache/huggingface/datasets_ 에 데이터세트를 다운로드하고 캐시합니다 . `HF_HOME`환경 변수를 설정하여 캐시 폴더를 사용자 정의할 수 있다는 것을 2장에서 상기해 보세요 .

`raw_datasets`사전처럼 색인을 생성하여 객체 의 각 문장 쌍에 액세스할 수 있습니다 .
```python
raw_train_dataset = raw_datasets["train"]
raw_train_dataset[0]
```

```python
{'idx': 0,
 'label': 1,
 'sentence1': 'Amrozi accused his brother , whom he called " the witness " , of deliberately distorting his evidence .',
 'sentence2': 'Referring to him as only " the witness " , Amrozi accused his brother of deliberately distorting his evidence .'}
```

레이블은 이미 정수이므로 전처리를 수행할 필요가 없습니다. 어떤 정수가 어떤 라벨에 해당하는지 알기 위해 `raw_train_dataset` 의 `features`  를 확인할 수 있습니다. 이는 각 열의 feature 을 알려줍니다.
```python
raw_train_dataset.features
```

```python
{'sentence1': Value(dtype='string', id=None),
 'sentence2': Value(dtype='string', id=None),
 'label': ClassLabel(num_classes=2, names=['not_equivalent', 'equivalent'], names_file=None, id=None),
 'idx': Value(dtype='int32', id=None)}
```

Behind the scenes, `label` 은 `ClassLabel` 타입이며 정수와 레이블 name의 매핑은 _names_ 폴더에 저장됩니다. `0`은 `not_equivalent` 을 의미하고 `1`은 `equivalent` 입니다.

## Preprocess Data
데이터세트를 전처리하려면 텍스트를 모델이 이해할 수 있는 숫자로 변환해야 합니다. [이전 장](https://huggingface.co/course/chapter2) 에서 본 것처럼 이는 토크나이저를 사용하여 수행됩니다. 토크나이저에 한 문장 또는 문장 목록을 제공할 수 있으므로 다음과 같이 각 쌍의 모든 첫 번째 문장과 모든 두 번째 문장을 직접 토큰화할 수 있습니다.
```python
from transformers import AutoTokenizer

checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
tokenized_sentences_1 = tokenizer(raw_datasets["train"]["sentence1"])
tokenized_sentences_2 = tokenizer(raw_datasets["train"]["sentence2"])
```

그러나 단지 두 시퀀스만 모델에 전달하고 두 문장이 passphrase 인지 아닌지에 대해 예측 할수는 없습니다. 두 시퀀스를 한 쌍으로 처리하고 적절한 전처리를 적용해야 합니다. 다행히도 토크나이저는 한 쌍의 시퀀스를 가져와 BERT 모델이 예상하는 방식으로 준비할 수도 있습니다.

```python
inputs = tokenizer("This is the first sentence.", "This is the second one.")
inputs
```

```python
{ 
  'input_ids': [101, 2023, 2003, 1996, 2034, 6251, 1012, 102, 2023, 2003, 1996, 2117, 2028, 1012, 102],
  'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}
```

[2장](https://huggingface.co/course/chapter2) 에서 `input_ids`및 `attention_mask` 키에 대해 논의했지만 `token_type_ids` 에 대한 이야기는 뒤로 미루었습니다 . 이 예에서는 입력의 어느 부분이 첫 번째 문장이고 어느 부분이 두 번째 문장인지 모델에 알려줍니다.

`input_ids`내부의 ID를 다시 단어로 디코딩하면 다음 과 같습니다.

```python
tokenizer.convert_ids_to_tokens(inputs["input_ids"])
```

그 후 이렇게 출력됩니다.
```python
['[CLS]', 'this', 'is', 'the', 'first', 'sentence', '.', '[SEP]', 'this', 'is', 'the', 'second', 'one', '.', '[SEP]']
```

`[CLS] sentence1 [SEP] sentence2 [SEP]`따라서 모델은 입력이 두 개의 문장이 있을 때 의 형식이 될 것으로 예상하는 것을 볼 수 있습니다 . 이를 `token_type_ids`다음과 같이 조정하면 다음과 같은 이점이 있습니다.

```python
['[CLS]', 'this', 'is', 'the', 'first', 'sentence', '.', '[SEP]', 'this', 'is', 'the', 'second', 'one', '.', '[SEP]']
[      0,      0,    0,     0,       0,          0,   0,       0,      1,    1,     1,        1,     1,   1,       1]
```

보시다시피, `[CLS] sentence1 [SEP]`모두에 해당하는 입력 부분의 토큰 유형 ID는 이고 `0`, 에 해당하는 다른 부분의 `sentence2 [SEP]`토큰 유형 ID는 모두 입니다 `1`.

다른 체크포인트를 선택하는 경우 토큰화된 입력에 반드시 `token_type_ids`가 있을 필요는 없습니다 (예를 들어 DistilBERT 모델을 사용하는 경우 반환되지 않습니다). 모델이 사전 훈련 중에 이를 보았기 때문에 모델이 이를 어떻게 해야 할지 알게 될 때만 반환됩니다.

[여기서 BERT는 토큰 유형 ID로 사전 학습되었으며, 1장](https://huggingface.co/course/chapter1) 에서 설명한 마스크된 언어 모델링 목표 외에 _다음 문장 예측_ 이라는 추가 목표가 있습니다 . 이 작업의 목표는 문장 쌍 간의 관계를 모델링하는 것입니다.

다음 문장 예측을 통해 모델에는 문장 쌍(무작위로 마스킹된 토큰 포함)이 제공되고 두 번째 문장이 첫 번째 문장 다음에 오는지 여부를 예측하도록 요청됩니다. 작업을 간단하게 만들기 위해 절반의 시간 동안 문장은 추출된 원본 문서에서 서로 따르고 나머지 절반의 시간은 두 문장이 두 개의 서로 다른 문서에서 나옵니다.

일반적으로 토큰화된 입력에 `token_type_ids` 가 있는지 여부에 대해 걱정할 필요가 없습니다. 토크나이저와 모델에 동일한 체크포인트를 사용하는 한 토크나이저는 모델에 무엇을 제공할지 알고 있으므로 모든 것이 괜찮을 것입니다. .

이제 토크나이저가 한 쌍의 문장을 처리하는 방법을 살펴보았으므로 이를 사용하여 전체 데이터 세트를 토큰화할 수 있습니다. [이전 장](https://huggingface.co/course/chapter2) 에서와 같이 첫 번째 문장 목록을 제공하여 토크나이저에 문장 쌍 목록을 제공할 수 있습니다. 문장, 그 다음 두 번째 문장의 목록입니다. 이는 [2장](https://huggingface.co/course/chapter2) 에서 본 패딩 및 자르기 옵션과도 호환됩니다 . 따라서 학습 데이터 세트를 전처리하는 한 가지 방법은 다음과 같습니다.

```python
tokenized_dataset = tokenizer(
    raw_datasets["train"]["sentence1"],
    raw_datasets["train"]["sentence2"],
    padding=True,
    truncation=True,
)
```

이것은 잘 작동하지만 사전(키, input_ids, attention_mask, token_type_ids 및 목록인 값)을 반환한다는 단점이 있습니다.

또한 토큰화 중에 데이터셋 전체를 저장할 수 있는 충분한 RAM이 있는 경우에만 작동합니다(whereas 🤗 데이터셋 라이브러리의 데이터셋은 디스크에 저장된 Apache Arrow 파일이므로 요청한 샘플만 메모리에 로드합니다).

### Dataset.map()

데이터를 데이터세트로 유지하기 위해 이 `Dataset.map()` 방법을 사용하겠습니다. 이는 또한 토큰화보다 더 많은 전처리가 필요한 경우 추가적인 유연성을 제공합니다. 이 `map()`방법은 데이터 세트의 각 요소에 함수를 적용하여 작동하므로 입력을 토큰화하는 함수를 정의해 보겠습니다.

```python
def tokenize_function(example):
    return tokenizer(example["sentence1"], example["sentence2"], truncation=True)
```

**이 함수는 (데이터 세트의 항목과 같은) 사전을 가져가서 input_ids, attention_mask 및 token_type_ids 키로 새 사전을 반환합니다.** 앞에서 본 것처럼 토큰화기는 문장 쌍의 목록에서 작동하므로 예제 사전에 여러 샘플(각 키는 문장 목록으로)이 포함된 경우에도 작동합니다. **이렇게 하면 batched=True 옵션을 사용하여 (),를 매핑하여 토큰화 속도를 크게 높일 수 있습니다.** 토큰화기는 🤗 토큰화 라이브러리의 Rust로 작성된 토큰화기에 의해 지원됩니다. 이 토큰화기는 매우 빠를 수 있지만 한 번에 많은 입력을 해야만 가능합니다.  
  
토큰화 함수에서 패딩 인수는 일단 생략했습니다. 이것은 모든 샘플을 최대 길이로 패딩하는 것이 효율적이지 않기 때문입니다. 그러면 전체 데이터 세트의 최대 길이가 아니라 해당 배치의 최대 길이로만 패딩하면 되기 때문에 배치를 구축할 때 샘플을 패딩하는 것이 좋습니다. 이는 입력이 매우 가변적인 길이를 가질 때 많은 시간과 처리 능력을 절약할 수 있습니다!  
  
다음은 토큰화 기능을 모든 데이터 세트에 한 번에 적용하는 방법입니다. 함수가 각 요소에 개별적으로 적용되는 것이 아니라 데이터 세트의 여러 요소에 한 번에 적용되도록 매핑하기 위해 batched=True를 사용하고 있습니다. 이를 통해 더 빠른 전처리가 가능합니다.

```python
tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)
tokenized_datasets
```

🤗 데이터 세트 라이브러리가 이 처리를 적용하는 방법은 전처리 함수에서 반환된 사전의 각 키에 대해 하나씩 데이터 세트에 새 필드를 추가하는 것입니다.

```python
DatasetDict({
    train: Dataset({
        features: ['attention_mask', 'idx', 'input_ids', 'label', 'sentence1', 'sentence2', 'token_type_ids'],
        num_rows: 3668
    })
    validation: Dataset({
        features: ['attention_mask', 'idx', 'input_ids', 'label', 'sentence1', 'sentence2', 'token_type_ids'],
        num_rows: 408
    })
    test: Dataset({
        features: ['attention_mask', 'idx', 'input_ids', 'label', 'sentence1', 'sentence2', 'token_type_ids'],
        num_rows: 1725
    })
})
```

`map()`으로 전처리 함수를 적용할 때 num_ proc 인수를 전달하여 멀티프로세싱을 사용할 수도 있습니다. 🤗 Tokenizers 라이브러리는 이미 여러 스레드를 사용하여 샘플을 더 빠르게 토큰화할 수 있으므로 여기서는 이 작업을 수행하지 않았지만, 이 라이브러리를 통해 지원되는 빠른 토큰화기를 사용하지 않으면 전처리 속도가 빨라질 수 있습니다.  
  
tokenize_function은 키 input_ids, attention_mask 및 token_type_ids가 포함된 사전을 반환하므로 이 세 필드는 데이터 세트의 모든 분할에 추가됩니다. 전처리 함수가 map()을 적용한 데이터 세트의 기존 키에 대한 새 값을 반환하면 기존 필드도 변경할 수 있습니다.  
  
마지막으로 해야 할 일은 요소를 함께 배치할 때 가장 긴 요소의 길이로 모든 예제를 패딩하는 것입니다. 이 기법을 `dynamic padding`이라고 합니다.

### dynamic padding
배치 내부의 샘플을 함께 배치하는데 책임이 있는 기능은 `collate function` 이라고 불린다.Data Loader를 구축하면 샘플 텐트 텐더로 변환할 수 있는 기능이며, 기본값은 poptors(Res)를 구성할 수 있습니다.우리가 같은 크기의 입력이 없는 경우, 우리가 할 수 없을 것입니다.우리는 패딩에 필요한 패딩으로 인해 패딩에 필요한 만큼 패딩으로 인해 패딩이 많이 연기되었다.이 훈련 속도를 상당히 빠르게 진행하지만 TPU는 TPU가 필요한 경우, TPU는 고정 형상을 일으킬 수 있습니다.  
  
이 작업을 수행하려면, 우리는 함께 배치하려는 데이터 세트의 올바른 패딩 기능을 정의해야 합니다.다행히도 🤗 transformer 라이브러리는 `DataCollatorWithPadding` 기능을 제공합니다. 인스턴스화 할때 ( 혹은 사용할 패딩 토큰, 모델이 입력의 왼쪽 또는 오른쪽에 패딩을 예상하는지 여부를 파악하기 위해) 토크나이저를 인자로 받고 당신이 필요한 모든것을 제공합니다.
```python
from transformers import DataCollatorWithPadding

data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
```

이 새로운 장난감을 테스트하기 위해 함께 배치할 훈련 세트에서 몇 가지 샘플을 가져와 보겠습니다. 여기에서는 `sentence1` , `sentence2`필요하지 않고 문자열을 포함하는 열(및 문자열로 텐서를 생성할 수 없음) `idx`을 제거하고 배치의 각 항목 길이를 살펴봅니다.

```python
samples = tokenized_datasets["train"][:8]
samples = {k: v for k, v in samples.items() if k not in ["idx", "sentence1", "sentence2"]}
[len(x) for x in samples["input_ids"]]
```

```python
[50, 59, 47, 67, 59, 50, 62, 32]
```

당연히 32에서 67까지 다양한 길이의 샘플을 얻습니다. 동적 패딩은 이 배치의 샘플이 모두 배치 내부의 최대 길이인 67의 길이로 패딩되어야 함을 의미합니다. 동적 패딩이 없으면 모든 샘플은 전체 데이터 세트의 최대 길이 또는 모델이 허용할 수 있는 최대 길이까지 패딩되어야 합니다. `data_collator` 가 일괄 처리가 적절하게 동적으로 채워지고 있는지 다시 확인해 보겠습니다 .

```python
batch = data_collator(samples)
{k: v.shape for k, v in batch.items()}
```

```python
{'attention_mask': torch.Size([8, 67]),
 'input_ids': torch.Size([8, 67]),
 'token_type_ids': torch.Size([8, 67]),
 'labels': torch.Size([8])}
```

드디어 이제 raw 텍스트에서 모델이 처리할 수 있는 배치로 전환했으므로 fine-tuning 할 준비가 되었습니다!

## Training
🤗 Transformers는 `Trainer`데이터세트에서 제공하는 사전 학습된 모델을 미세 조정하는 `Trainer`데 도움이 되는 클래스를 제공합니다. 마지막 섹션에서 모든 데이터 전처리 작업을 완료하고 나면 가장 어려운 부분 `Trainer.train()`은 CPU에서 매우 느리게 실행되므로 실행할 환경을 준비하는 것입니다 . GPU가 설정되어 있지 않은 경우 [Google Colab](https://colab.research.google.com/) 에서 무료 GPU 또는 TPU에 액세스할 수 있습니다 .

아래 코드 예제에서는 이전 섹션의 예제를 이미 실행했다고 가정합니다. 다음은 필요한 사항을 간략하게 요약한 것입니다.

```python
from datasets import load_dataset
from transformers import AutoTokenizer, DataCollatorWithPadding

raw_datasets = load_dataset("glue", "mrpc")
checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)


def tokenize_function(example):
    return tokenizer(example["sentence1"], example["sentence2"], truncation=True)


tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)
```

### Start Training
`Trainer` 를 정의하기 전 첫 번째 단계는 훈련과 평가에 사용할 모든 하이퍼파라미터를 포함하는 클래스인 `TrainingArguments`를 정의하는 것입니다 . 제공해야 하는 유일한 인수는 학습된 모델이 저장될 디렉터리와 그 과정에서 체크포인트입니다. 나머지 모든 사항에 대해서는 기본값을 그대로 두면 기본 미세 조정에 매우 적합합니다. 

```python
from transformers import TrainingArguments

training_args = TrainingArguments("test-trainer")
```

두 번째 단계는 모델을 정의하는 것입니다. [이전 장](https://huggingface.co/course/chapter2) 에서와 마찬가지로 두 개의 레이블이 있는`AutoModelForSequenceClassification` 클래스를 사용합니다 .

```python
from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)
```

[2장](https://huggingface.co/course/chapter2) 과 달리 사전 학습된 모델을 인스턴스화한 후 경고가 표시된다는 점을 알 수 있습니다 . 이는 BERT가 문장 쌍을 분류하는 데 사전 학습되지 않았기 때문에 사전 학습된 모델의 헤드를 삭제하고 대신 시퀀스 분류에 적합한 새로운 헤드를 추가했기 때문입니다. 경고는 일부 가중치(삭제된 사전 훈련 헤드에 해당하는 가중치)가 사용되지 않았으며 일부 가중치(새 헤드에 대한 가중치)가 무작위로 초기화되었음을 나타냅니다. 우리가 지금 하려고 하는 것이 바로 모델 훈련을 권장하는 것으로 마무리됩니다.

모델이 있으면 `Trainer`지금까지 구성된 모든 개체( , 훈련 및 검증 데이터 세트, our 및 our :)를 전달하여 `model`a `training_args`를 `data_collator`정의 `tokenizer`할 수 있습니다.

```python
from transformers import Trainer

trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
    tokenizer=tokenizer,
)
```

Note that when you pass the `tokenizer` as we did here, the default `data_collator` used by the `Trainer` will be a `DataCollatorWithPadding` as defined previously, so you can skip the line `data_collator=data_collator` in this call. It was still important to show you this part of the processing in section 2!

To fine-tune the model on our dataset, we just have to call the `train()` method of our `Trainer`:

```python
trainer.train()
```

그러면 fine-tuning (GPU에서는 몇 분 정도 소요)이 시작되고 500단계마다 훈련 손실이 보고됩니다. 그러나 모델의 성능이 얼마나 좋은지(또는 나쁜지) 알려주지는 않습니다. 왜냐면:
1. We didn’t tell the `Trainer` to evaluate during training by setting `evaluation_strategy` to either `"steps"` (evaluate every `eval_steps`) or `"epoch"` (evaluate at the end of each epoch).
2. We didn’t provide the `Trainer` with a `compute_metrics()` function to calculate a metric during said evaluation (otherwise the evaluation would just have printed the loss, which is not a very intuitive number).

### Evaluation
Let’s see how we can build a useful `compute_metrics()` function and use it the next time we train. The function must take an `EvalPrediction` object (which is a named tuple with a `predictions` field and a `label_ids` field) and will return a dictionary mapping strings to floats (the strings being the names of the metrics returned, and the floats their values). To get some predictions from our model, we can use the `Trainer.predict()` command:

```python
predictions = trainer.predict(tokenized_datasets["validation"])
print(predictions.predictions.shape, predictions.label_ids.shape)
```

```python
(408, 2) (408,)
```

The output of the `predict()` method is another named tuple with three fields: `predictions`, `label_ids`, and `metrics`. The `metrics` field will just contain the loss on the dataset passed, as well as some time metrics (how long it took to predict, in total and on average). Once we complete our `compute_metrics()` function and pass it to the `Trainer`, that field will also contain the metrics returned by `compute_metrics()`.

보시다시피 `predictions` 는 408 x 2 모양의 2차원 배열입니다(408은 우리가 사용한 데이터세트의 요소 수입니다). 이는 우리가 전달한 데이터 세트의 각 요소에 대한 로짓입니다 ( [이전 장](https://huggingface.co/course/chapter2)`predict()` 에서 본 것처럼 모든 Transformer 모델은 로짓을 반환합니다). 이를 레이블과 비교할 수 있는 예측으로 변환하려면 두 번째 축에서 최대값을 갖는 인덱스를 가져와야 합니다.

```python
import numpy as np

preds = np.argmax(predictions.predictions, axis=-1)
```

이제 이를 `preds`라벨과 비교할 수 있습니다. 함수를 구축하기 위해 🤗 [평가](https://github.com/huggingface/evaluate/) 라이브러리의 `compute_metric()` function 을 사용하겠습니다 . 이번에는 함수를 사용하여 데이터세트를 로드한 것처럼 쉽게 MRPC 데이터세트와 관련된 `evaluate.load()` 함수를 로드할 수 있습니다 . 반환된 객체에는 측정항목 계산을 수행하는 데 사용할 수 있는 `compute()` 메서드가 있습니다.

```python
import evaluate

metric = evaluate.load("glue", "mrpc")
metric.compute(predictions=preds, references=predictions.label_ids)
```

```python
{'accuracy': 0.8578431372549019, 'f1': 0.8996539792387542}
```

모델 헤드의 무작위 초기화로 인해 얻은 측정항목이 변경될 수 있으므로 얻을 수 있는 정확한 결과는 다를 수 있습니다. 여기서 우리 모델의 검증 세트 정확도는 85.78%이고 F1 score 는 89.97임을 알 수 있습니다. 이는 GLUE 벤치마크에 대한 MRPC 데이터세트의 결과를 평가하는 데 사용되는 두 가지 측정항목입니다. [BERT 논문](https://arxiv.org/pdf/1810.04805.pdf) 의 표는 기본 모델의 F1 점수가 88.9라고 보고했습니다. 그것은 우리가 현재 `uncased` 모델을 사용하고 있는 동안의 `cased` 모델이었는데, 이것이 더 나은 결과를 설명합니다.

모든 것을 하나로 묶으면 다음과 같은 `compute_metrics()` function 을 얻을 수 있습니다.

```python
def compute_metrics(eval_preds):
    metric = evaluate.load("glue", "mrpc")
    logits, labels = eval_preds
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)
```

그리고 각 epoch가 끝날 때 metric을 report하기 위해 실제로 사용되는 것을 확인하기 위해 `Trainer`이 `compute_metrics()`함수를 사용하여 새 항목을 정의하는 방법은 다음과 같습니다.

```python
training_args = TrainingArguments("test-trainer", evaluation_strategy="epoch")
model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)

trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)
```

Note that we create a new `TrainingArguments` with its `evaluation_strategy` set to `"epoch"` and a new model — otherwise, we would just be continuing the training of the model we have already trained. To launch a new training run, we execute:

```python
trainer.train()
```

이번에는 훈련 손실 외에 각 에포크가 끝날 때마다 검증 손실과 측정항목을 보고합니다. 다시 말하지만, 도달한 정확한 정확도/F1 점수는 모델의 무작위 헤드 초기화로 인해 우리가 찾은 것과 약간 다를 수 있지만 동일한 기준점에 있어야 합니다.

이는 `Trainer`여러 GPU 또는 TPU에서 즉시 작동하며 혼합 정밀도 교육( `fp16 = True`교육 인수에 사용)과 같은 다양한 옵션을 제공합니다. 10장에서 지원되는 모든 내용을 살펴보겠습니다.

이것으로 API를 사용한 미세 조정에 대한 소개를 마칩니다 `Trainer`. 가장 일반적인 NLP 작업에 대해 이 작업을 수행하는 예는 [7장](https://huggingface.co/course/chapter7) 에서 제공되지만 지금은 순수한 PyTorch에서 동일한 작업을 수행하는 방법을 살펴보겠습니다.




# 지금까지는 함수들이 자동으로 해줬던 부분들이 많아서 처음부터 어떻게 fine-tuning 하는지 보고싶으면 [여기로](https://huggingface.co/learn/nlp-course/chapter3/4?fw=pt)