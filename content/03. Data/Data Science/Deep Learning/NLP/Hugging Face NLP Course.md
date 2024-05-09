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

----

## Transformer
### definition
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

기본적으로 이 파이프라인은 영어로 된 감정 분석을 위해 fine-tuning된 특정 사전 학습 모델을 선택합니다. **객체를 생성하면 모델이 다운로드되고 캐시됩니다 `classifier`. 명령을 다시 실행하면 캐시된 모델이 대신 사용되며 모델을 다시 다운로드할 필요가 없습니다.**

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
라벨(정답)이 지정되지 않은 텍스트를 분류해야 하는 좀 더 어려운 작업부터 시작하겠습니다. 

텍스트에 주석을 다는 것은 일반적으로 시간이 많이 걸리고 도메인 전문 지식이 필요하기 때문에 이는 실제 프로젝트에서 일반적인 시나리오입니다. 이 사용 사례의 경우 `zero-shot-classification`파이프라인은 매우 강력합니다. 

분류에 사용할 레이블을 지정할 수 있으므로 사전 학습된 모델의 레이블에 의존할 필요가 없습니다. 모델이 두 레이블을 사용하여 문장을 긍정 또는 부정으로 분류하는 방법을 이미 확인했습니다. 하지만 원하는 다른 레이블 세트를 사용하여 텍스트를 분류할 수도 있습니다.

```python
from transformers import pipeline

classifier = pipeline("zero-shot-classification")
classifier(
    "This is a course about the Transformers library",
    candidate_labels=["education", "politics", "business"]
)
```

```python
{'sequence': 'This is a course about the Transformers library',
 'labels': ['education', 'business', 'politics'],
 'scores': [0.8445963859558105, 0.111976258456707, 0.043427448719739914]}
```

_이 파이프라인을 제로샷_ 이라고 부르는 이유는 이를 사용하기 위해 모델을 `fine-tuning` 할 필요가 없기 때문입니다. 
원하는 라벨 목록에 대한 확률 점수를 직접 반환할 수 있습니다!

#### text-generation
이제 파이프라인을 사용하여 일부 텍스트를 생성하는 방법을 살펴보겠습니다. 

여기서 주요 아이디어는 프롬프트를 제공하면 모델이 나머지 텍스트를 생성하여 프롬프트를 자동 완성한다는 것입니다. 
이는 많은 휴대폰에서 볼 수 있는 텍스트 예측 기능과 유사합니다. 
텍스트 생성에는 무작위성이 포함되므로 아래와 같은 결과를 얻지 못하는 것이 정상입니다.

```python
from transformers import pipeline

generator = pipeline("text-generation")
generator("In this course, we will teach you how to")
```

```python
[{'generated_text': 'In this course, we will teach you how to understand and use '
                    'data flow and data interchange when handling user data. We '
                    'will be working with one or more of the most commonly used '
                    'data flows — data flows of various types, as seen by the '
                    'HTTP'}]
```

`max_length` argument 를 사용하여 생성되는 다양한 시퀀스 수 `num_return_sequences`와 인수를 사용하여 출력 텍스트의 전체 길이를 제어할 수 있습니다.


#### Mask Filling
이 태스크의 아이디어는 주어진 텍스트의 빈칸을 채우는 것입니다.
```python
from transformers import pipeline

unmasker = pipeline("fill-mask")
unmasker("This course will teach you all about <mask> models.", top_k=2)
```

```python
[{'sequence': 'This course will teach you all about mathematical models.',
  'score': 0.19619831442832947,
  'token': 30412,
  'token_str': ' mathematical'},
 {'sequence': 'This course will teach you all about computational models.',
  'score': 0.04052725434303284,
  'token': 38163,
  'token_str': ' computational'}]
```

인수 `top_k`는 표시할 가능성의 수를 제어합니다. 여기서 모델은 종종 _마스크 토큰_`<mask>` 이라고 하는 특수 단어를 채웁니다 . 다른 마스크 채우기 모델에는 다른 마스크 토큰이 있을 수 있으므로 다른 모델을 탐색할 때 항상 적절한 마스크 단어를 확인하는 것이 좋습니다. 이를 확인하는 한 가지 방법은 위젯에 사용된 마스크 단어를 보는 것입니다.


#### Named Entity Recognition (NER: 개체명 인식)
모델이 입력 텍스트의 어느 부분이 사람, 위치 또는 조직과 같은 엔터티에 해당하는지 찾아야 하는 작업입니다. 예를 살펴보겠습니다:
```python
from transformers import pipeline

ner = pipeline("ner", grouped_entities=True)
ner("My name is Sylvain and I work at Hugging Face in Brooklyn.")
```

```python
from transformers import pipeline

ner = pipeline("ner", grouped_entities=True)
ner("My name is Sylvain and I work at Hugging Face in Brooklyn.")
```

```python
[{'entity_group': 'PER', 'score': 0.99816, 'word': 'Sylvain', 'start': 11, 'end': 18}, 
 {'entity_group': 'ORG', 'score': 0.97960, 'word': 'Hugging Face', 'start': 33, 'end': 45}, 
 {'entity_group': 'LOC', 'score': 0.99321, 'word': 'Brooklyn', 'start': 49, 'end': 57}
]
```

여기서 모델은 Sylvain이 사람(PER), Hugging Face가 조직(ORG), Brooklyn이 위치(LOC)임을 올바르게 식별했습니다.

파이프라인 생성 함수에 옵션을 전달하여 `grouped_entities=True`동일한 엔터티에 해당하는 문장 부분을 함께 재그룹화하도록 파이프라인에 지시합니다. 여기서 모델은 이름이 구성되어 있음에도 불구하고 "Hugging"과 "Face"를 단일 조직으로 올바르게 그룹화했습니다. 여러 단어 중. 실제로 다음 장에서 살펴보겠지만 전처리는 일부 단어를 더 작은 부분으로 분할하기도 합니다. 예를 들어 는 , , 및 `Sylvain`의 네 부분으로 나뉩니다 . 사후 처리 단계에서 파이프라인은 해당 조각을 성공적으로 재그룹화했습니다.`S``##yl``##va``##in`


#### Question Answering (질문 답변)
주어진 컨텍스트의 정보를 사용하여 질문에 답합니다.
```python
from transformers import pipeline

question_answerer = pipeline("question-answering")
question_answerer(
    question="Where do I work?",
    context="My name is Sylvain and I work at Hugging Face in Brooklyn",
)
```

```python
{'score': 0.6385916471481323, 'start': 33, 'end': 45, 'answer': 'Hugging Face'}
```


#### Summarization (요약)
요약은 텍스트에서 참조된 모든 중요한 측면을 유지하면서 텍스트를 더 짧은 텍스트로 줄이는 작업입니다.
```python
from transformers import pipeline

summarizer = pipeline("summarization")
summarizer(
    """
    America has changed dramatically during recent years. Not only has the number of 
    graduates in traditional engineering disciplines such as mechanical, civil, 
    electrical, chemical, and aeronautical engineering declined, but in most of 
    the premier American universities engineering curricula now concentrate on 
    and encourage largely the study of engineering science. As a result, there 
    are declining offerings in engineering subjects dealing with infrastructure, 
    the environment, and related issues, and greater concentration on high 
    technology subjects, largely supporting increasingly complex scientific 
    developments. While the latter is important, it should not be at the expense 
    of more traditional engineering.

    Rapidly developing economies such as China and India, as well as other 
    industrial countries in Europe and Asia, continue to encourage and advance 
    the teaching of engineering. Both China and India, respectively, graduate 
    six and eight times as many traditional engineers as does the United States. 
    Other industrial countries at minimum maintain their output, while America 
    suffers an increasingly serious decline in the number of engineering graduates 
    and a lack of well-educated engineers.
"""
)
```

```python
[{'summary_text': ' America has changed dramatically during recent years . The '
                  'number of engineering graduates in the U.S. has declined in '
                  'traditional engineering disciplines such as mechanical, civil '
                  ', electrical, chemical, and aeronautical engineering . Rapidly '
                  'developing economies such as China and India, as well as other '
                  'industrial countries in Europe and Asia, continue to encourage '
                  'and advance engineering .'}]
```

텍스트 생성과 마찬가지로 결과에 대해 a `max_length`또는 a를 지정할 수 있습니다.`min_length`

#### Translation
번역의 경우 작업 이름(예: )에 언어 쌍을 제공하면 기본 모델을 사용할 수 있지만 가장 쉬운 방법은 [모델 허브](https://huggingface.co/models)`"translation_en_to_fr"` 에서 사용하려는 모델을 선택하는 것입니다 . 여기서는 프랑스어를 영어로 번역해 보겠습니다.

지금까지 표시된 파이프라인은 대부분 시연 목적으로 사용되었습니다. 특정 작업을 위해 프로그래밍되었으며 다양한 작업을 수행할 수 없습니다. 다음 챕터에서는 `pipeline()`함수 내부의 내용과 함수의 동작을 사용자 정의하는 방법을 배우게 됩니다 .


### how do transfomers work

#### history of transformers
Transformer [아키텍처는](https://arxiv.org/abs/1706.03762) 2017년 6월에 도입되었습니다. 원래 연구의 초점은 번역 작업이었습니다. 그 후 다음을 포함한 여러 영향력 있는 모델이 도입되었습니다.

- **2018년 6월** : 최초의 사전 훈련된 Transformer 모델인 [GPT는](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf) 다양한 NLP 작업의 fine-tuning에 사용되어 최첨단 결과를 얻었습니다.
- **2018년 10월** : 또 다른 대형 사전 학습 모델인 [BERT는](https://arxiv.org/abs/1810.04805) 더 나은 문장 요약을 생성하도록 설계되었습니다(자세한 내용은 다음 장에서!).
- **2019년 2월** : [GPT-2](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) , 윤리적 문제로 인해 즉시 공개되지 않은 개선된(및 더 큰) 버전의 GPT
- **2019년 10월** : [DitilBERT](https://arxiv.org/abs/1910.01108) , 60% 더 빠르고 메모리가 40% 더 가벼우면서도 여전히 BERT 성능의 97%를 유지하는 BERT의 증류 버전입니다.
- **2019년 10월** : [BART](https://arxiv.org/abs/1910.13461) 및 [T5](https://arxiv.org/abs/1910.10683) , 원래 Transformer 모델과 동일한 아키텍처를 사용하는 두 개의 사전 훈련된 모델(최초)
- **2020년 5월** , fine-tuning 없이 다양한 작업을 잘 수행할 수 있는 GPT-2의 더 큰 버전인 [GPT-3 (](https://arxiv.org/abs/2005.14165) _제로샷 학습_ 이라고 함 )


이 목록은 포괄적이지 않으며 단지 다양한 종류의 Transformer 모델 중 몇 가지를 강조하기 위한 것입니다. 
Transformer는 크게는 세 가지 범주로 분류할 수 있습니다.
- GPT 유사( _auto-regressive Transformer 모델이라고도 함)
- BERT 유사( _auto-encoding_ Transformer 모델이라고도 함)
- BART/T5 유사( _sequence-to-sequence_ 변환기 모델이라고도 함)

나중에 이러한 계열에 대해 더 자세히 살펴보겠습니다.


#### transfomers are language models
_위에서 언급한 모든 Transformer 모델(GPT, BERT, BART, T5 등)은 언어 모델_ 로 학습되었습니다 . 이는 그들이 자기 감독 방식으로 대량의 원시 텍스트에 대해 훈련을 받았다는 것을 의미합니다. 자기 지도 학습은 모델의 입력으로부터 목표가 자동으로 계산되는 훈련 유형입니다. 이는 데이터에 라벨을 붙이는 데 사람이 필요하지 않다는 것을 의미합니다!

이러한 유형의 모델은 훈련된 언어에 대한 통계적 이해를 발전시키지만 특정 실제 작업에는 그다지 유용하지 않습니다. 이로 인해 일반 사전 학습 모델은 _전이 학습_ 이라는 과정을 거칩니다 . 이 프로세스 동안 모델은 주어진 작업에 대해 지도 방식, 즉 사람이 주석을 추가한 레이블을 사용하여 fine-tuning됩니다.

작업의 예는 _n개의_ 이전 단어를 읽고 문장의 다음 단어를 예측하는 것입니다. 출력이 과거 및 현재 입력에 따라 달라지지만 미래 입력에는 영향을 받지 않기 때문에 이를 _인과 언어 모델링_ 이라고 합니다 .

![](https://i.imgur.com/wN8Lw72.png)

또 다른 예는 _마스크된 언어 모델링으로_ , 모델이 문장에서 마스크된 단어를 예측합니다.

![](https://i.imgur.com/po5Cl7h.png)


#### Transformers are big models
DistilBERT와 같은 몇 가지 이상값을 제외하고 더 나은 성능을 달성하기 위한 일반적인 전략은 모델의 크기와 사전 학습된 데이터의 양을 늘리는 것입니다.

![](https://i.imgur.com/lURbETa.png)

불행하게도 모델, 특히 **대규모 모델을 훈련하려면 많은 양의 데이터가 필요합니다.** 이는 시간과 컴퓨팅 리소스 측면에서 매우 비용이 많이 듭니다. 다음 그래프에서 볼 수 있듯이 이는 환경에 미치는 영향까지 해석됩니다.

![](https://i.imgur.com/7UsdxFH.png)

그리고 이것은 사전 훈련이 환경에 미치는 영향을 의식적으로 줄이기 위해 노력하는 팀이 이끄는 (매우 큰) 모델에 대한 프로젝트를 보여줍니다. 최상의 hyperparameters를 얻기 위해 수많은 시도를 실행하는 데 드는 공간은 훨씬 더 커질 것입니다.

연구팀, 학생 단체 또는 회사가 모델을 훈련하려고 할 때마다 처음부터 그렇게 했다고 상상해 보십시오. 이로 인해 막대하고 불필요한 글로벌 비용이 발생하게 됩니다!

이것이 바로 언어 모델 공유가 중요한 이유입니다. 훈련된 가중치를 공유하고 이미 훈련된 가중치 위에 구축하면 커뮤니티의 전체 컴퓨팅 비용과 탄소 배출량이 줄어듭니다.

그런데 여러 도구를 통해 모델 학습의 탄소 배출량을 평가할 수 있습니다. 예를 들어 🤗 Transformers에 통합된 [ML CO2 Impact](https://mlco2.github.io/impact/) 또는 [Code Carbon이 있습니다](https://codecarbon.io/) . 이에 대해 자세히 알아보려면 훈련 공간 추정치가 포함된 파일을 생성하는 방법을 보여주는 이 [블로그 게시물](https://huggingface.co/blog/carbon-emissions-on-the-hub) 과 이 주제를 다루는 🤗 Transformers [문서](https://huggingface.co/docs/hub/model-cards-co2) 를 읽어보세요 .`emissions.csv`


#### Transfer Learning
*Pretraining*  은 모델을 처음부터 훈련하는 행위입니다. 가중치는 무작위로 초기화되고 사전 지식 없이 훈련이 시작됩니다.

![](https://i.imgur.com/tbCXy4w.png)

이 훈련은 일반적으로 매우 많은 양의 데이터에 대해 수행됩니다. 
따라서 매우 많은 양의 데이터가 필요하며 훈련에는 최대 몇 주가 걸릴 수 있습니다.

반면, _fine-tuning은_ 모델이 사전 훈련된 **후에** 수행되는 훈련입니다. fine-tuning을 수행하려면 먼저 사전 훈련된 언어 모델을 획득한 다음 작업과 관련된 데이터 세트를 사용하여 추가 훈련을 수행합니다. 잠깐만요. 처음부터 최종 사용 사례에 맞게 모델을 훈련하면 어떨까요( **처음부터** )? 몇 가지 이유가 있습니다:

- 사전 훈련된 모델은 fine-tuning 데이터 세트와 일부 유사한 데이터 세트에 대해 이미 훈련되었습니다. 따라서 fine-tuning 프로세스는 사전 학습 중에 초기 모델에서 얻은 지식을 활용할 수 있습니다(예를 들어 NLP 문제의 경우 사전 학습된 모델은 작업에 사용하는 언어에 대해 일종의 통계적 이해를 갖습니다).
- 사전 훈련된 모델은 이미 많은 데이터에 대해 훈련되었으므로 fine-tuning에 적절한 결과를 얻으려면 훨씬 적은 양의 데이터가 필요합니다.
- 같은 이유로 좋은 결과를 얻는 데 필요한 시간과 자원의 양은 훨씬 적습니다.

예를 들어, 영어로 훈련된 사전 훈련된 모델을 활용한 다음 arXiv 코퍼스에서 이를 fine-tuning하여 과학/연구 기반 모델을 만들 수 있습니다. fine-tuning에는 제한된 양의 데이터만 필요합니다. 사전 훈련된 모델이 획득한 지식은 "transfer"되므로 _전이 학습_ 이라는 용어가 사용됩니다 .

![](https://i.imgur.com/DjCPyOg.png)

따라서 모델을 fine-tuning하면 시간, 데이터, 재정, 환경 비용이 절감됩니다. 또한 훈련이 전체 사전 훈련보다 덜 제한적이므로 다양한 fine-tuning 방식을 반복하는 것이 더 빠르고 쉽습니다.

또한 이 프로세스는 처음부터 훈련하는 것보다 더 나은 결과를 얻을 수 있습니다(데이터가 많지 않은 경우). 따라서 항상 사전 훈련된 모델(현재 작업에 최대한 가까운 모델)을 활용하고 fine-tuning해야 합니다.


#### General Architecture
모델은 기본적으로 두 개의 블록으로 구성됩니다.
- **인코더(왼쪽)** : 인코더는 입력을 수신하고 이에 대한 표현(해당 기능)을 작성합니다. 이는 모델이 입력으로부터 이해를 얻도록 최적화되었음을 의미합니다.
- **디코더(오른쪽)** : 디코더는 다른 입력과 함께 인코더의 표현(기능)을 사용하여 대상 시퀀스를 생성합니다. 이는 모델이 출력 생성에 최적화되어 있음을 의미합니다.

![|750](https://i.imgur.com/oLv1kKj.png)

이러한 각 부분은 작업에 따라 독립적으로 사용될 수 있습니다.
- **인코더 전용 모델** : 문장 분류, NER 등 입력에 대한 이해가 필요한 작업에 적합합니다.
- **디코더 전용 모델** : 텍스트 생성과 같은 생성 작업에 적합합니다.
- **인코더-디코더 모델** 또는 **시퀀스-시퀀스 모델** : 번역 또는 요약과 같이 입력이 필요한 생성 작업에 적합합니다.


#### Attention Layers
_Transformer 모델의 주요 특징은 Attention 레이어_ 라고 하는 특수 레이어로 구축된다는 것입니다 . 실제로 Transformer 아키텍처를 소개하는 논문의 제목은 ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762) 였습니다 ! 이 과정의 뒷부분에서 Attention 레이어에 대한 세부 사항을 살펴보겠습니다. 지금으로서 알아야 할 것은 **이 레이어가 각 단어의 표현을 처리할 때 전달한 문장의 특정 단어에 특별한 주의를 기울이고 다른 단어는 거의 무시하도록 모델에 지시한다는 것입니다.**

이를 맥락에 맞게 이해하려면 텍스트를 영어에서 프랑스어로 번역하는 작업을 고려해 보세요. "You like thiscourse"라는 입력이 주어지면 번역 모델은 "like"라는 단어에 대한 적절한 번역을 얻기 위해 인접한 단어 "You"에도 주의를 기울여야 합니다. 왜냐하면 프랑스어에서는 동사 "like"가 다음에 따라 다르게 활용되기 때문입니다. 주제. 그러나 문장의 나머지 부분은 해당 단어를 번역하는 데 유용하지 않습니다. 같은 맥락에서, "this"를 번역할 때 모델은 "course"라는 단어에도 주의를 기울여야 합니다. "this"는 관련 명사가 남성인지 여성인지에 따라 다르게 번역되기 때문입니다. 다시 말하지만, 문장의 다른 단어는 "course"를 번역하는 데 중요하지 않습니다. 더 복잡한 문장(및 더 복잡한 문법 규칙)의 경우 모델은 각 단어를 적절하게 번역하기 위해 문장에서 더 멀리 나타날 수 있는 단어에 특별한 주의를 기울여야 합니다.

동일한 개념이 자연어와 관련된 모든 작업에 적용됩니다. 단어 자체에는 의미가 있지만 해당 의미는 연구되는 단어 전후의 다른 단어(또는 단어)일 수 있는 문맥에 의해 깊은 영향을 받습니다.


#### Original Architecture
Transformer 아키텍처는 원래 번역용으로 설계되었습니다. 학습 중에 인코더는 특정 언어로 된 입력(문장)을 수신하고 디코더는 원하는 대상 언어로 동일한 문장을 수신합니다. 인코더에서 어텐션 레이어는 문장의 모든 단어를 사용할 수 있습니다(방금 본 것처럼 주어진 단어의 번역은 문장의 앞과 뒤의 내용에 따라 달라질 수 있기 때문입니다). 그러나 디코더는 순차적으로 작동하며 이미 번역된 문장의 단어에만 주의를 기울일 수 있습니다. 즉, 현재 생성되고 있는 단어 앞의 단어에만 주의를 기울일 수 있습니다. 예를 들어, 번역된 대상의 처음 세 단어를 예측한 경우 이를 디코더에 제공하고 디코더는 인코더의 모든 입력을 사용하여 네 번째 단어를 예측하려고 시도합니다.

훈련 중에 작업 속도를 높이기 위해(모델이 대상 문장에 액세스할 수 있는 경우) 디코더에 전체 대상이 제공되지만 미래 단어를 사용할 수는 없습니다(예측을 시도할 때 위치 2의 단어에 액세스한 경우). 위치 2에 단어가 있으면 문제는 그리 어렵지 않을 것입니다!). 예를 들어, 네 번째 단어를 예측하려고 할 때 Attention 레이어는 위치 1~3의 단어에만 접근할 수 있습니다.

원래 Transformer 아키텍처는 다음과 같았습니다. 인코더는 왼쪽에 디코더는 오른쪽에 있습니다.

![](https://i.imgur.com/IhFae2k.png)

디코더 블록의 첫 번째 주의 계층은 디코더에 대한 모든(과거) 입력에 주의를 기울이지만 두 번째 주의 계층은 인코더의 출력을 사용합니다. 따라서 전체 입력 문장에 액세스하여 현재 단어를 가장 잘 예측할 수 있습니다. 이는 서로 다른 언어가 단어의 순서를 다르게 하는 문법 규칙을 가질 수 있거나 문장의 뒷부분에 제공되는 일부 컨텍스트가 주어진 단어의 최상의 번역을 결정하는 데 도움이 될 수 있으므로 매우 유용합니다.

어텐션 _마스크_ 는 모델이 일부 특수 단어(예: 문장을 일괄 처리할 때 모든 입력을 동일한 길이로 만드는 데 사용되는 특수 패딩 단어)에 주의를 기울이는 것을 방지하기 위해 인코더/디코더에서 사용할 수도 있습니다.


#### Architectures vs Checkpoints
이 과정에서 Transformer 모델을 자세히 살펴보면 _모델_ 뿐만 아니라 _아키텍처_ 와 _체크포인트에_ 대한 언급도 볼 수 있습니다 . 이러한 용어는 모두 약간 다른 의미를 갖습니다.
- **아키텍처** : 이는 모델의 뼈대입니다. 즉, 각 레이어의 정의와 모델 내에서 발생하는 each operation입니다.
- **체크포인트** : 주어진 아키텍처에 로드될 가중치 (weight) 입니다.
- **모델** : 이는 "아키텍처" 또는 "체크포인트"만큼 정확하지 않은 포괄적인 용어입니다. 두 가지 모두를 의미할 수 있습니다. 이 과정에서는 모호성을 줄이는 것이 중요한 경우 _아키텍처_ 또는 _체크포인트를_ 지정합니다 .

예를 들어, BERT는 아키텍처이고 Google 팀이 BERT의 첫 번째 릴리스를 위해 훈련한 `bert-base-cased` 가중치 세트는 체크포인트입니다. 그러나 "BERT 모델"과 " `bert-base-cased`모델"이라고 말할 수 있습니다.


---
## Bias and Limitation
프로덕션에서 사전 학습된 모델이나 미세 조정된 버전을 사용하려는 경우 이러한 모델은 강력한 도구이기는 하지만 제한 사항이 있다는 점에 유의하세요. 그 중 가장 큰 점은 대용량 데이터에 대한 사전 훈련을 활성화하기 위해 연구자들이 인터넷에서 사용할 수 있는 콘텐츠 중 최고와 최악의 콘텐츠를 모두 수집하여 찾을 수 있는 모든 콘텐츠를 긁어내는 경우가 많다는 것입니다.

`fill-mask`빠른 설명을 위해 BERT 모델을 사용하는 파이프라인 의 예로 돌아가 보겠습니다 .

```python
from transformers import pipeline

unmasker = pipeline("fill-mask", model="bert-base-uncased")
result = unmasker("This man works as a [MASK].")
print([r["token_str"] for r in result])

result = unmasker("This woman works as a [MASK].")
print([r["token_str"] for r in result])
```

```python
['lawyer', 'carpenter', 'doctor', 'waiter', 'mechanic']
['nurse', 'waitress', 'teacher', 'maid', 'prostitute']
```

이 두 문장에서 누락된 단어를 채워 달라는 요청을 받으면 모델은 성별에 관계없이 단 하나의 답변(웨이터/웨이트리스)만 제공합니다. 다른 것들은 일반적으로 하나의 특정 성별과 관련된 직업입니다. 그렇습니다. 매춘부는 모델이 "여성" 및 "일"과 연관시키는 상위 5가지 가능성에 포함되었습니다. 이는 BERT가 인터넷 전체에서 데이터를 스크랩하여 구축된 것이 아니라 명백히 중립적인 데이터( [English Wikipedia](https://huggingface.co/datasets/wikipedia) 및 [BookCorpus](https://huggingface.co/datasets/bookcorpus) 데이터 세트에서 훈련됨)를 사용하여 구축된 보기 드문 Transformer 모델 중 하나임에도 불구하고 발생합니다.

따라서 이러한 도구를 사용할 때는 사용 중인 원래 모델이 **성차별, 인종 차별, 동성애 혐오 콘텐츠를 매우 쉽게 생성할 수 있다는 점을 염두에 두어야 합니다.** 데이터에 대한 모델을 미세 조정해도 이러한 본질적인 편향이 사라지지는 않습니다.





# 다음 [[Using Transformer]]