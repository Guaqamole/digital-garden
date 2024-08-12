---
title: NLP Basics
date: 2024-08-11
draft: false
tags: 
complete: true
---
## Prerequiste
```python
pip install nltp konlpy kss

import nltk
nltk.download('treebank')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
```

NLP Flow


## 1. Text Preprocessing
**텍스트 전처리는 왜 필요한가?**
텍스트 전처리는 풀고자 하는 문제의 용도에 맞게 텍스트를 사전에 처리하는 작업입니다. 요리를 할 때 재
료를 제대로 손질하지 않으면, 요리가 엉망이 되는 것처럼 텍스트에 제대로 전처리를 하지 않으면 뒤에서
배울 자연어 처리 기법들이 제대로 동작하지 않습니다.

데이터를 사용하고자하는 용도에 맞게 사용하려면 아래 일을 해야합니다:
- 토큰화 (tokenization) 
- 정제 (cleaning) 
- 정규화 (normalization)

### Tokenization

#### Word Tokenization
**토큰의 기준을 단어 (word) 로 하는 경우**

```python
Time is an illusion. Lunchtime double so!
```

이러한 입력으로부터 구두점을 제외시킨 토큰화 작업의 결과는 다음과 같습니다.
```python
“Time”, “is”, “an”, “illustion”, “Lunchtime”, “double”, “so”
```
구두점을 지운 뒤에 띄어쓰기 (whitespace) 를 기준으로 잘라냈습니다. 보통 토큰화 작업은 단순히 구두점이나 특수문자를 전부 제거하는 정제 (cleaning) 작업을 수행하는 것만으로 해결되지 않습니다. 구두점이나 특수문자를 전부 제거하면 토큰이 의미를 잃어버리는 경우가 발생합니다.

#### NLTK & Keras Tokenizers
토큰화를 하다보면, 예상하지 못한 경우가 있어서 토큰화의 기준을 생각해봐야 하는 경우가 발생합니다.
물론, 이러한 선택은 해당 데이터를 가지고 어떤 용도로 사용할 것인지에 따라서 그 용도에 영향이 없는
기준으로 정하면 됩니다. NLTK 는 영어 코퍼스를 토큰화하기 위한 도구들을 제공합니다. 그 중 word_tokenize 와 WordPunctTokenizer 를 사용해서 아포스트로피를 어떻게 처리하는지 확인해보겠습니다.

NLTK
```python
from nltk.tokenize import word_tokenize
from nltk.tokenize import WordPunctTokenizer

print('단어토큰화1:', word_tokenize("Don't be fooled by the dark sounding name,Mr. Jone's Orphanage is as cheery as cheery goes for a pastry shop."))

>> 단 어 토 큰 화 1 : ['Do', "n't", 'be', 'fooled', 'by', 'the', 'dark', 'sounding', 'name', ',', 'Mr', '.', 'Jone', "'s", 'Orphanage', 'is', 'as', 'cheery', 'as', 'cheery', 'goes', 'for', 'a', 'pastry', 'shop', '.']
```

KERAS
```python
from tensorflow.keras.preprocessing.text import text_to_word_sequence

print('단어토큰화3:',text_to_word_sequence ("Don't be fooled by the dark sounding name, Mr. Jone's Orphanage is as cheery as cheery goes for a pastry shop."))

>> 단어토큰화3: ["don't", 'be', 'fooled', 'by', 'the', 'dark', 'sounding', 'name', 'mr', "jone's", 'orphanage', 'is', 'as', 'cheery', 'as', 'cheery', 'goes', 'for', 'a', 'pastry', 'shop']
```


### Tokenization Rules
#### 1. 구두점이나 특수 문자를 단순 제외해서는 안 된다.
- 코퍼스에 대한 정제 작업을 진행하다보면, 구두점조차도 하나의 토큰으로 분류하기도 합니다. 가장 기본
적인 예를 들어보자면, 마침표 (.) 와 같은 경우는 문장의 경계를 알 수 있는데 도움이 되므로 단어를 뽑아
낼 때, 마침표 (.) 를 제외하지 않을 수 있습니다.
- 또 다른 예로 단어 자체에 구두점을 갖고 있는 경우도 있는데, m.p.h 나 Ph.D 나 AT&T 같은 경우가 있습니
다. 또 특수 문자의 달러나 슬래시 (/) 로 예를 들어보면, $45.55 와 같은 가격을 의미 하기도 하고, 01/02/06
은 날짜를 의미하기도 합니다. 보통 이런 경우 45.55 를 하나로 취급하고 45 와 55 로 따로 분류하고 싶지
는 않을 수 있습니다.
- 숫자 사이에 컴마 (,) 가 들어가는 경우도 있습니다. 보통 수치를 표현할 때는 123,456,789 와 같이 세 자리
단위로 컴마가 있습니다

#### 2. 줄임말과 단어 내에 띄어쓰기가 있는 경우
토큰화 작업에서 종종 영어권 언어의 아포스트로피 (’) 는 압축된 단어를 다시 펼치는 역할을 하기도 합니
다. 예를 들어 what’re 는 what are 의 줄임말이며, we’re 는 we are 의 줄임말입니다. 위의 예에서 re 를 접
어 (clitic) 이라고 합니다. 즉, 단어가 줄임말로 쓰일 때 생기는 형태를 말합니다. 가령 I am 을 줄인 I’m 이
있을 때, m 을 접어라고 합니다.


#### 3. 표준 토큰화 방법
이해를 돕기 위해 표준으로 쓰이고 있는 토큰화 방법 중 하나인 Penn Treebank Tokenization 의 규칙에
대해서 소개하고, 토큰화의 결과를 확인해보겠습니다

Penn Treebank Tokenization rule
1. 하이푼으로 구성된 단어는 하나로 유지한다
2. doesn’t 와 같이 아포스트로피로’ 접어’ 가 함께하는 단어는 분리해준다.

```python
“Starting a home‑based restaurant may be an ideal. it doesn’t have a food chain or restaurant of their
own.”
```

```python
from nltk.tokenize import TreebankWordTokenizer

tokenizer = TreebankWordTokenizer()
text = "Starting a home-based restaurant may be an ideal. it doesn't have a food
chain or restaurant of their own."
print(' 트 리 뱅 크 워 드 토 크 나 이 저 :',tokenizer.tokenize(text))
```


### Sentence Tokenization
이번에는 토큰의 단위가 문장 (sentence) 일 경우를 논의해보겠습니다. 이 작업은 갖고있는 코퍼스 내에
서 문장 단위로 구분하는 작업으로 때로는 문장 분류 (sentence segmentation) 라고도 부릅니다. 보통 갖
고있는 코퍼스가 정제되지 않은 상태라면, 코퍼스는 문장 단위로 구분되어 있지 않아서 이를 사용하고자
하는 용도에 맞게 문장 토큰화가 필요할 수 있습니다.

```python
from nltk.tokenize import sent_tokenize

text = "His barber kept his word. But keeping such a huge secret to himself was driving him crazy. Finally, the barber went up a mountain and almost to the edge of a cliff. He dug a hole in the midst of some reeds. He looked about, to make sure no one was near."
print(' 문 장 토 큰 화 1 :',sent_tokenize(text))
```

NLTK 는 단순히 마침표를 구분자로 하여 문장을 구분하지 않았기 때문에, Ph.D. 를 문장 내의 단어로 인식
하여 성공적으로 인식하는 것을 볼 수 있습니다. 한국어에 대한 문장 토큰화 도구 또한 존재합니다. 한국
어의 경우에는 박상길님이 개발한 KSS(Korean Sentence Splitter) 를 추천합니다. 

```python
import kss

text = ' 딥러닝 자연어 처리가 재미있기는 합니다. 그런데 문제는 영어보다 한국어로 할때 너무 어렵습니다. 이제 해보면 알걸요?'
print(' 한 국 어 문 장 토 큰 화 :',kss.split_sentences(text))
```


### Korean Tokenization
한국어는 영어와는 달리 띄어쓰기만으로는 토큰화를 하기에 부족합니다. 한국어의 경우에는 띄
어쓰기 단위가 되는 단위를’ 어절’ 이라고 하는데 어절 토큰화는 한국어 NLP 에서 지양되고 있습니다. 어
절 토큰화와 단어 토큰화는 같지 않기 때문입니다. 그 근본적인 이유는 한국어가 영어와는 다른 형태를 가
지는 언어인 교착어라는 점에서 기인합니다. 교착어란 조사, 어미 등을 붙여서 말을 만드는 언어를 말합
니다.

#### 교착어 특성
예를 들어봅시다. 영어와는 달리 한국어에는 조사라는 것이 존재합니다. 예를 들어 한국어에 그 (he/him)
라는 주어나 목적어가 들어간 문장이 있다고 합시다. 이 경우, 그라는 단어 하나에도 ‘그가’, ‘그에게’, ‘그를’, ‘그와’, ’ 그는’ 과 같이 다양한 조사가’ 그’ 라는 글자 뒤에 띄어쓰기 없이 바로 붙게됩니다. 자연어 처리
를 하다보면 같은 단어임에도 서로 다른 조사가 붙어서 다른 단어로 인식이 되면 자연어 처리가 힘들고 번
거로워지는 경우가 많습니다. **대부분의 한국어 NLP 에서 조사는 분리해줄 필요가 있습니다.**

#### 형태소 (morpheme)
형태소 (morpheme) 란 뜻을 가진 가장 작은 말의 단위를 말합니다. 이 형태소에는 두 가지 형태소가 있는데 자립 형태소와 의존 형태소입니다.

- 자립 형태소: 접사, 어미, 조사와 상관없이 자립하여 사용할 수 있는 형태소. 그 자체로 단어가 된다. 체언 (명사, 대명사, 수사), 수식언 (관형사, 부사), 감탄사 등이 있다.
- 의존 형태소: 다른 형태소와 결합하여 사용되는 형태소. 접사, 어미, 조사, 어간을 말한다.

#### 한국어는 띄어쓰기가 영어보다 잘 지켜지지 않는다.
한국어는 영어권 언어와 비교하여 띄어쓰기가 어렵고 잘 지켜지지 않는 경향이 있습니다. 그 이유는 여러
견해가 있으나, 가장 기본적인 견해는 한국어의 경우 띄어쓰기가 지켜지지 않아도 글을 쉽게 이해할 수 있
는 언어라는 점입니다.

영어의 경우에는 띄어쓰기를 하지 않으면 손쉽게 알아보기 어려운 문장들이 생깁니다. 이는 한국어 (모아
쓰기 방식) 와 영어 (풀어쓰기 방식) 라는 언어적 특성의 차이에 기인합니다


### Part-of-speech tagging
단어는 표기는 같지만 품사에 따라서 단어의 의미가 달라지기도 합니다. 예를 들어서 영어 단어 ‘fly’ 는 동
사로는’ 날다’ 라는 의미를 갖지만, 명사로는’ 파리’ 라는 의미를 갖고있습니다. 

한국어도 마찬가지입니다.
’ 못’ 이라는 단어는 명사로서는 망치를 사용해서 목재 따위를 고정하는 물건을 의미합니다. 하지만 부사
로서의’ 못’ 은’ 먹는다’, ’ 달린다’ 와 같은 동작 동사를 할 수 없다는 의미로 쓰입니다. 결국 단어의 의미를
제대로 파악하기 위해서는 해당 단어가 어떤 품사로 쓰였는지 보는 것이 주요 지표가 될 수도 있습니다.

그에 따라 단어 토큰화 과정에서 각 단어가 어떤 품사로 쓰였는지를 구분해놓기도 하는데, 이 작업을 품사
태깅 (part‑of‑speech tagging) 이라고 합니다. NLTK 와 KoNLPy 를 통해 품사 태깅 실습을 진행합니다.

NLTK 에서는 Penn Treebank POS Tags 라는 기준을 사용하여 품사를 태깅합니다.
```python
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

text = "I am actively looking for Ph.D. students. and you are a Ph.D. student."
tokenized_sentence = word_tokenize(text)
print(' 단 어 토 큰 화 :',tokenized_sentence)
print(' 품 사 태 깅 :',pos_tag(tokenized_sentence))
```

한국어 NLP 에서 형태소 분석기를 사용하여 단어 토큰화. 더 정확히는 형태소 토큰화 (morpheme
tokenization) 를 수행해보겠습니다
```python
from konlpy.tag import Okt
from konlpy.tag import Kkma

okt = Okt()
kkma = Kkma()
print('OKT 형 태 소 분 석 :',okt.morphs("열심히 코딩한 당신, 연휴에는 여행을 가봐요 "))
print('OKT 품 사 태 깅 :',okt.pos("열심히 코딩한 당신, 연휴에는 여행을 가봐요 "))
print('OKT 명 사 추 출 :',okt.nouns("열심히 코딩한 당신, 연휴에는 여행을 가봐요 "))
```