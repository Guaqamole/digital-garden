---
title: Hugging Face NLP Course
date: 2024-05-07
draft: false
tags:
  - DeepLearning
  - NLP
complete: true
---
## Overview
### What is Hugging Face
허깅페이스는 트랜스포머를 기반으로 하는 다양한 모델(_transformer.models_)과 학습 스크립트(_transformer.Trainer_)를 구현해 놓은 모듈이다.

> [!info] Transformers
> A transformer is a deep learning architecture developed by **Google** and based on the multi-head attention mechanism, proposed in a 2017 paper "Attention Is All You Need".

원래는 파이토치로 layer, model 등을 선언해주고 학습 스크립트도 전부 구현해야 하지만, 허깅 페이스를 사용하면 이런 수고를 덜 수 있다. 정리하면 '허깅 페이스'라는 회사가 만든 'transformers' 패키지가 있고, 일반적인 파이토치 구현체의 layer.py, model.py이 transformer.models에, train.py 가 transformer.Trainer에 대응된다.

허깅페이스를 사용하면:
- 기존의 성능이 검증된 pre-trained 모델을 쉽게 (무료로) 다운 받아서 사용할 수 있고,
- 본인의 task에 맞게 모델을 fine-tuning하는 것도 가능하다.
- 스스로 제작/파인튜닝한 딥러닝 모델을 공유할 수도 있다.

### What is NLP

NLP는 인간 언어와 관련된 모든 것을 이해하는 데 초점을 맞춘 언어학 및 기계 학습 분야입니다.

**Aim**
단일 단어를 개별적으로 이해하는 것뿐만 아니라 해당 단어의 맥락을 이해하는 것입니다. NLP는 written 텍스트에만 국한되지 않습니다. 또한 오디오 샘플의 대본이나 이미지 설명 생성과 같은 음성 인식 및 컴퓨터 비전의 복잡한 문제를 해결합니다.

**Fields**
- **Classifying whole sentences (전체 문장 분류)** : 리뷰의 감정 파악, 이메일 스팸 여부 감지, 문장이 문법적으로 맞는지, 두 문장이 논리적으로 연관되어 있는지 확인
- **Classifying each word in a sentence (문장의 각 단어 분류)** : 문장의 문법적 구성 요소(명사, 동사, 형용사) 또는 명명된 개체(사람, 위치, 조직) 식별
- **Generating Text Context (텍스트 콘텐츠 생성)** : 자동 생성된 텍스트로 프롬프트 완성, 마스크된 단어로 텍스트의 빈칸 채우기
- **Extracting an answer from a text (텍스트에서 답변 추출)** : 질문과 컨텍스트가 주어지면, 컨텍스트에 제공된 정보를 기반으로 질문에 대한 답변을 추출합니다.
- **Generating a new sentence an input text (입력 텍스트에서 새로운 문장 생성)** : 텍스트를 다른 언어로 번역, 텍스트 요약
- Extracting Keyword from text (핵심 키워드 단어 추출)

### Why is it so difficult?
컴퓨터는 인간과 같은 방식으로 정보를 처리하지 않습니다. 예를 들어, “나는 배고프다”라는 문장을 읽으면 그 의미를 쉽게 이해할 수 있습니다. 마찬가지로, "나는 배고프다"와 "나는 슬프다"라는 두 문장이 주어지면 우리는 그 두 문장이 얼마나 비슷한지 쉽게 판단할 수 있습니다. 기계 학습(ML) 모델의 경우 이러한 작업은 더 어렵습니다. 텍스트는 모델이 학습할 수 있는 방식으로 처리되어야 합니다. 그리고 언어는 복잡하기 때문에 이 처리가 어떻게 이루어져야 하는지 신중하게 생각해야 합니다. 텍스트를 표현하는 방법에 대해 많은 연구가 진행되어 왔으며 다음 장에서 몇 가지 방법을 살펴보겠습니다.


## Transformer
https://colab.research.google.com/github/huggingface/notebooks/blob/master/course/en/chapter1/section3.ipynb

Transformer 모델은 이전 섹션에서 언급한 것과 같은 모든 종류의 NLP 작업을 해결하는 데 사용됩니다. Hugging Face 및 Transformer 모델을 사용하고 모델을 공유하여 커뮤니티에 다시 기여하는 일부 회사 및 조직은 다음과 같습니다.

[🤗 Transformers 라이브러리는](https://github.com/huggingface/transformers) 이러한 공유 모델을 생성하고 사용할 수 있는 기능을 제공합니다. 모델 [허브에는](https://huggingface.co/models) 누구나 다운로드하여 사용할 수 있는 수천 개의 사전 훈련된 모델이 포함되어 있습니다. 자신의 모델을 허브에 업로드할 수도 있습니다!

Transformer 모델이 내부적으로 어떻게 작동하는지 알아보기 전에, 몇 가지 흥미로운 NLP 문제를 해결하는 데 어떻게 사용할 수 있는지에 대한 몇 가지 예를 살펴보겠습니다.

### install
```python
pip install transformers
from transformers import pipeline
```

### pipeline()
🤗 Transformers 라이브러리의 가장 기본적인 객체는 `pipeline()` 함수입니다. 모델을 필요한 전처리 및 후처리 단계와 연결하여 텍스트를 직접 입력하고 이해하기 쉬운 답변을 얻을 수 있습니다.

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
classifier("I've been waiting for a HuggingFace course my whole life.")
```

```python
[{'label': 'POSITIVE', 'score': 0.9598047137260437}]
```

여러 문장을 전달할 수도 있습니다!
```python
classifier(["I've been waiting for a HuggingFace course my whole life.", "I hate this so much!"])
```

```python
[{'label': 'POSITIVE', 'score': 0.9598047137260437},
 {'label': 'NEGATIVE', 'score': 0.9994558095932007}]
```

기본적으로 이 파이프라인은 영어로 된 감정 분석을 위해 미세 조정된 특정 사전 학습 모델을 선택합니다. **객체를 생성하면 모델이 다운로드되고 캐시됩니다 `classifier`. 명령을 다시 실행하면 캐시된 모델이 대신 사용되며 모델을 다시 다운로드할 필요가 없습니다.**

일부 텍스트를 파이프라인에 전달할 때 관련된 세 가지 주요 단계는 다음과 같습니다.

1. 텍스트는 모델이 이해할 수 있는 형식으로 전처리됩니다.
2. 전처리된 입력이 모델에 전달됩니다.
3. 모델의 예측은 사후 처리되므로 이를 이해할 수 있습니다.

[현재 사용 가능한 파이프라인](https://huggingface.co/transformers/main_classes/pipelines) 중 일부 는 다음과 같습니다.

- `feature-extraction`(텍스트의 벡터 표현을 얻습니다)
- `fill-mask`
- `ner`(명명된 엔터티 인식)
- `question-answering`
- `sentiment-analysis`
- `summarization`
- `text-generation`
- `translation`
- `zero-shot-classification`

이들 중 몇 가지를 살펴보겠습니다!

#### zero-shot classification
