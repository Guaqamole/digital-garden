---
title: NLP Basics
date: 2024-08-11
draft: false
tags: 
complete: true
link: https://www.youtube.com/watch?v=Ue9t-LIyzK4&list=PLIMb_GuNnFwdWabX_4pkti2cYonT-pFrw&index=2
---
Prerequiste
```python
pip install nltp konlpy kss

import nltk
nltk.download('treebank')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```




## Text Preprocessing
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


---
## Cleaning and Normalization
코퍼스에서 용도에 맞게 토큰을 분류하는 작업을 토큰화 (tokenization) 라고 하며, 토큰화 작업 전, 후에
는 텍스트 데이터를 용도에 맞게 정제 (cleaning) 및 정규화 (normalization) 하는 일이 항상 함께합니다.
정제 및 정규화의 목적은 각각 다음과 같습니다.

- 정제 (cleaning) : 갖고 있는 코퍼스로부터 노이즈 데이터를 제거한다.
- 정규화 (normalization) : 표현 방법이 다른 단어들을 통합시켜서 같은 단어로 만들어준다.

정제 작업은 토큰화 작업에 방해가 되는 부분들을 배제시키고 토큰화 작업을 수행하기 위해서 토큰화 작
업보다 앞서 이루어지기도 하지만, 토큰화 작업 이후에도 여전히 남아있는 노이즈들을 제거하기위해 지
속적으로 이루어지기도 합니다. 사실 완벽한 정제 작업은 어려운 편이라서, 대부분의 경우 이 정도면 됐
다. 라는 일종의 합의점을 찾기도합니다.

### 1. 규칙에 기반한 표기가 다른 단어들의 통합
가령, USA 와 US 는 같은 의미를 가지므로 하나의 단어로 정규화해볼 수 있습니다. uh‑huh 와 uhhuh 는
형태는 다르지만 여전히 같은 의미를 갖고 있습니다. 이러한 정규화를 거치게 되면, US 를 찾아도 USA 도
함께 찾을 수 있을 것입니다. 뒤에서 표기가 다른 단어들을 통합하는 방법인 어간 추출 (stemming) 과 표
제어 추출 (lemmatizaiton) 에 대해서 더 자세히 알아봅니다.


### 2. 대, 소문자 통합
영어권 언어에서 대, 소문자를 통합하는 것은 단어의 개수를 줄일 수 있는 또 다른 정규화 방법입니다. 영
어권 언어에서 대문자는 문장의 맨 앞 등과 같은 특정 상황에서만 쓰이고, 대부분의 글은 소문자로 작성되
기 때문에 대, 소문자 통합 작업은 대부분 대문자를 소문자로 변환하는 소문자 변환작업으로 이루어지게
됩니다.

### 3. 불필요한 단어의 제거
정제 작업에서 제거해야하는 노이즈 데이터 (noise data) 는 자연어가 아니면서 아무 의미도 갖지 않는 글
자들 (특수 문자 등) 을 의미하기도 하지만, 분석하고자 하는 목적에 맞지 않는 불필요 단어들을 노이즈 데
이터라고 하기도 합니다.

불필요 단어들을 제거하는 방법으로는 아래 방법이 있습니다:
- 불용어 제거와 등장 빈도가 적은 단어,
- 길이가 짧은 단어들을 제거

#### 등장 빈도가 적은 단어
때로는 텍스트 데이터에서 너무 적게 등장해서 자연어 처리에 도움이 되지 않는 단어들이 존재합니다. 예
를 들어 입력된 메일이 정상 메일인지 스팸 메일인지를 분류하는 스팸 메일 분류기를 설계한다고 가정해
보겠습니다. 총 100,000 개의 메일을 가지고 정상 메일에서는 어떤 단어들이 주로 등장하고, 스팸 메일에
서는 어떤 단어들이 주로 등장하는지를 가지고 설계하고자 합니다. 그런데 이때 100,000 개의 메일 데이
터에서 총 합 5 번 밖에 등장하지 않은 단어가 있다면 이 단어는 직관적으로 분류에 거의 도움이 되지 않을
것임을 알 수 있습니다.

#### 길이가 짧은 단어
영어권 언어에서는 길이가 짧은 단어를 삭제하는 것만으로도 어느정도 자연어 처리에서 크게 의미가 없
는 단어들을 제거하는 효과를 볼 수 있다고 알려져 있습니다. 즉, 영어권 언어에서 길이가 짧은 단어들은
대부분 불용어에 해당됩니다. 사실 길이가 짧은 단어를 제거하는 2 차 이유는 길이를 조건으로 텍스트를
삭제하면서 단어가 아닌 구두점들까지도 한꺼번에 제거하기 위함도 있습니다. 하지만 한국어에서는 길
이가 짧은 단어라고 삭제하는 이런 방법이 크게 유효하지 않을 수 있습니다.

### 4. 정규표현식
얻어낸 코퍼스에서 노이즈 데이터의 특징을 잡아낼 수 있다면, 정규 표현식을 통해서 이를 제거할 수 있는
경우가 많습니다. 가령, HTML 문서로부터 가져온 코퍼스라면 문서 여기저기에 HTML 태그가 있습니다.
뉴스 기사를 크롤링 했다면, 기사마다 게재 시간이 적혀져 있을 수 있습니다. 정규 표현식은 이러한 코퍼
스 내에 계속해서 등장하는 글자들을 규칙에 기반하여 한 번에 제거하는 방식으로서 매우 유용합니다.
이 책에서도 전처리를 위해 정규 표현식을 앞으로 종종 사용하게 될 겁니다. 예를 들어 위에서 길이가 짧
은 단어를 제거할 때도, 정규 표현식이 유용하게 사용되었습니다.


---
## Stemming and Lemmatization
정규화 기법 중 코퍼스에 있는 단어의 개수를 줄일 수 있는 기법인 표제어 추출 (lemmatization) 과 어간
추출 (stemming) 의 개념에 대해서 알아봅니다.

이 두 작업이 갖고 있는 의미는 눈으로 봤을 때는 서로 다른 단어들이지만, 하나의 단어로 일반화시킬 수
있다면 하나의 단어로 일반화시켜서 문서 내의 단어 수를 줄이겠다는 것입니다. 이러한 방법들은 단어의
빈도수를 기반으로 문제를 풀고자 하는 뒤에서 학습하게 될 BoW(Bag of Words) 표현을 사용하는 자연어
처리 문제에서 주로 사용됩니다. 

자연어 처리에서 전처리, 더 정확히는 정규화의 지향점은 언제나 갖고 있는 코퍼스로부터 복잡성을 줄이는 일입니다.

### 1. 표제어 추출 (Lemmatization)
표제어 (Lemma) 는 한글로는 ‘표제어’ 또는 ‘기본 사전형 단어’ 정도의 의미를 갖습니다. 표제어 추출은
단어들로부터 표제어를 찾아가는 과정입니다. **표제어 추출은 단어들이 다른 형태를 가지더라도, 그 뿌리
단어를 찾아가서 단어의 개수를 줄일 수 있는지 판단합니다**. 예를 들어서 am, are, is 는 서로 다른 스펠링
이지만 그 뿌리 단어는 be 라고 볼 수 있습니다. 이때, 이 단어들의 표제어는 be 라고 합니다.

표제어 추출을 하는 가장 섬세한 방법은 단어의 형태학적 파싱을 먼저 진행하는 것입니다. 형태소란’ 의
미를 가진 가장 작은 단위’ 를 뜻합니다. 그리고 형태학 (morphology) 이란 형태소로부터 단어들을 만들
어가는 학문을 뜻합니다. 형태소의 종류로 어간 (stem) 과 접사 (affix) 가 존재합니다.
1) 어간 (stem) 단어의 의미를 담고 있는 단어의 핵심 부분.
2) 접사 (affix) 단어에 추가적인 의미를 주는 부분.
형태학적 파싱은 이 두 가지 구성 요소를 분리하는 작업을 말합니다. 가령, cats 라는 단어에 대해 형태학
적 파싱을 수행한다면, 형태학적 파싱은 결과로 cat(어간) 와 ‑s(접사) 를 분리합니다. 

꼭 두 가지로 분리되지 않는 경우도 있습니다. 단어 fox 는 형태학적 파싱을 한다고 하더라도 더 이상 분리할 수 없습니다. fox 는 독립적인 형태소이기 때문입니다. 이와 유사하게 cat 또한 더 이상 분리되지 않습니다.

NLTK 에서는 표제어 추출을 위한 도구인 WordNetLemmatizer 를 지원합니다. 이를 통해 표제어 추출을
실습해보겠습니다.
```python
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()
words = ['policy', 'doing', 'organization', 'have', 'going', 'love', 'lives', 'fly', 'dies', 'watched', 'has', 'starting']
print(' 표 제 어 추 출 전 :',words)
print(' 표 제 어 추 출 후 :',[lemmatizer.lemmatize(word) for word in words])

 표 제 어 추 출 전 : ['policy', 'doing', 'organization', 'have', 'going', 'love', 'lives', 'fly', 'dies', 'watched', 'has', 'starting']
 표 제 어 추 출 후 : ['policy', 'doing', 'organization', 'have', 'going', 'love', 'life', 'fly', 'dy', 'watched', 'ha', 'starting']
```

표제어 추출은 뒤에서 언급할 어간 추출과는 달리 단어의 형태가 적절히 보존되는 양상을 보이는 특징이
있습니다. 하지만 그럼에도 위의 결과에서는 dy 나 ha 와 같이 의미를 알 수 없는 적절하지 못한 단어를 출
력하고 있습니다. 이는 표제어 추출기 (lemmatizer) 가 본래 단어의 품사 정보를 알아야만 정확한 결과를
얻을 수 있기 때문입니다

```python
lemmatizer.lemmatize('dies', 'v')
> 'die'

lemmatizer.lemmatize('watched', 'v')
> 'watch'

lemmatizer.lemmatize('has', 'v')
> 'have'
```


### 2. 어간 추출 (Stemming)
어간 (Stem) 을 추출하는 작업을 어간 추출 (stemming) 이라고 합니다. **어간 추출은 형태학적 분석을 단
순화한 버전이라고 볼 수도 있고, 정해진 규칙만 보고 단어의 어미를 자르는 어림짐작의 작업이라고 볼 수
도 있습니다. 이 작업은 섬세한 작업이 아니기 때문에 어간 추출 후에 나오는 결과 단어는 사전에 존재하
지 않는 단어일 수도 있습니다.** 예제를 보면 쉽게 이해할 수 있습니다. 어간 추출 알고리즘 중 하나인 포터
알고리즘 (Porter Algorithm) 에 아래의 문자열을 입력으로 넣는다고 해봅시다.

```python
This was not the map we found in Billy Bones’s chest, but an accurate copy, complete in all
things–names and heights and soundings–with the single exception of the red crosses and the
written notes.
```

```python
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

stemmer = PorterStemmer()
sentence = "This was not the map we found in Billy Bones's chest, but an accurate copy, complete in all things--names and heights and soundings--with the single exception of the red crosses and the written notes."
tokenized_sentence = word_tokenize(sentence)
print(' 어 간 추 출 전 :', tokenized_sentence)
print(' 어 간 추 출 후 :',[stemmer.stem(word) for word in tokenized_sentence])

 어 간 추 출 전 : ['This', 'was', 'not', 'the', 'map', 'we', 'found', 'in', 'Billy', 'Bones', "'s", 'chest', ',', 'but', 'an', 'accurate', 'copy', ',', 'complete', 'in', 'all', 'things', '--', 'names', 'and', 'heights', 'and', 'soundings', '--', 'with', 'the', 'single', 'exception', 'of', 'the', 'red', 'crosses', 'and', 'the', 'written', 'notes', '.']
 
 어 간 추 출 후 : ['thi', 'wa', 'not', 'the', 'map', 'we', 'found', 'in', 'billi', 'bone', "'s", 'chest', ',', 'but', 'an', 'accur', 'copi', ',', 'complet', 'in', 'all', 'thing', '--', 'name', 'and', 'height', 'and', 'sound', '--', 'with', 'the', 'singl', 'except', 'of', 'the', 'red', 'cross', 'and', 'the', 'written', 'note', '.']
```

규칙 기반의 접근을 하고 있으므로 어간 추출 후의 결과에는 사전에 없는 단어들도 포함되어 있습니다. 가
령, 포터 알고리즘의 어간 추출은 이러한 규칙들을 가집니다.
ALIZE → AL
ANCE → 제거
ICAL → IC
위의 규칙에 따르면 좌측의 단어는 우측의 단어와 같은 결과를 얻게됩니다.
formalize → formal
allowance → allow
electricical → electric
실제 코드를 통해 확인해봅시다.

```python
words = ['formalize', 'allowance', 'electricical']
print(' 어 간 추 출 전 :',words)
print(' 어 간 추 출 후 :',[stemmer.stem(word) for word in words])
```

```python
어 간 추 출 전 : ['formalize', 'allowance', 'electricical']
어 간 추 출 후 : ['formal', 'allow', 'electric']
```


---
## Stopword
갖고 있는 데이터에서 유의미한 단어 토큰만을 선별하기 위해서는 큰 의미가 없는 단어 토큰을 제거하는
작업이 필요합니다. 여기서 큰 의미가 없다라는 것은 자주 등장하지만 분석을 하는 것에 있어서는 큰 도움
이 되지 않는 단어들을 말합니다. 예를 들면, I, my, me, over, 조사, 접미사 같은 단어들은 문장에서는 자
주 등장하지만 실제 의미 분석을 하는데는 거의 기여하는 바가 없는 경우가 있습니다. 이러한 단어들을 불
용어 (stopword) 라고 하며, NLTK 에서는 위와 같은 100 여개 이상의 영어 단어들을 불용어로 패키지 내
에서 미리 정의하고 있습니다.

물론 불용어는 개발자가 직접 정의할 수도 있습니다. 이번에는 영어 문장에서 NLTK 가 정의한 영어 불용
어를 제거하는 실습을 하고, 한국어 문장에서 직접 정의한 불용어를 제거해보겠습니다.

### NLTK 불용어 확인

```python
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from konlpy.tag import Okt

stop_words_list = stopwords.words('english')
print(' 불 용 어 개 수 :', len(stop_words_list))
print(' 불 용 어 10 개 출 력 :',stop_words_list[:10])
```

```python
불 용 어 개 수 : 179
불 용 어 10 개 출 력 : ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', '
you', "you're"]
```

### NLTK 불용어 제거
```python
example = "Family is not an important thing. It's everything."
stop_words = set(stopwords.words('english'))
word_tokens = word_tokenize(example)
result = []

for word in word_tokens:
    if word not in stop_words:
        result.append(word)
        
print(' 불 용 어 제 거 전 :',word_tokens)
print(' 불 용 어 제 거 후 :',result)
```

```python
 불 용 어 제 거 전 : ['Family', 'is', 'not', 'an', 'important', 'thing', '.', 'It', "'s", 'everything', '.']
 불 용 어 제 거 후 : ['Family', 'important', 'thing', '.', 'It', "'s", 'everything', '.']
```

### 한국어 불용어 제거
한국어에서 불용어를 제거하는 방법으로는 간단하게는 토큰화 후에 조사, 접속사 등을 제거하는 방법이
있습니다. 하지만 불용어를 제거하려고 하다보면 조사나 접속사와 같은 단어들뿐만 아니라 명사, 형용사
와 같은 단어들 중에서 불용어로서 제거하고 싶은 단어들이 생기기도 합니다. 결국에는 사용자가 직접 불
용어 사전을 만들게 되는 경우가 많습니다. 이번에는 직접 불용어를 정의해보고, 주어진 문장으로부터 사
용자가 정의한 불용어 사전으로부터 불용어를 제거해보겠습니다. 아래의 불용어는 임의 선정한 것으로
실제 의미있는 선정 기준이 아닙니다.

```python
okt = Okt()
example = " 고 기 를 아 무 렇 게 나 구 우 려 고 하 면 안 돼 . 고 기 라 고 다 같 은 게 아 니 거 든 . 예
컨 대 삼 겹 살 을 구 울 때 는 중 요 한 게 있 지 ."
stop_words = " 를 아 무 렇 게 나 구 우 려 고 안 돼 같 은 게 구 울 때 는 "
stop_words = set(stop_words.split(' '))
word_tokens = okt.morphs(example)
result = [word for word in word_tokens if not word in stop_words]
print(' 불 용 어 제 거 전 :',word_tokens)
print(' 불 용 어 제 거 후 :',result)
```

```python
불 용 어 제 거 전 : [' 고 기 ', ' 를 ', ' 아 무 렇 게 나 ', ' 구 ', ' 우 려 ', ' 고 ', ' 하 면 ', ' 안 ', '
돼 ', '.', ' 고 기 ', ' 라 고 ', ' 다 ', ' 같 은 ', ' 게 ', ' 아 니 거 든 ', '.', ' 예 컨 대 ', ' 삼 겹
살 ', ' 을 ', ' 구 울 ', ' 때 ', ' 는 ', ' 중 요 한 ', ' 게 ', ' 있 지 ', '.']
불 용 어 제 거 후 : [' 고 기 ', ' 하 면 ', '.', ' 고 기 ', ' 라
```



---


## Padding
자연어 처리를 하다보면 각 문장 (또는 문서) 은 서로 길이가 다를 수 있습니다. 그런데 기계는 길이가 전
부 동일한 문서들에 대해서는 하나의 행렬로 보고, 한꺼번에 묶어서 처리할 수 있습니다. 다시 말해 **병렬
연산을 위해서 여러 문장의 길이를 임의로 동일하게 맞춰주는 작업이 필요할 때가 있습니다. 실습을 통해
이해해봅시다.**

### Numpy 로 패딩하기
```python
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer

preprocessed_sentences = [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'], ['huge', 'secret'], ['barber', 'kept', 'word'], ['barber', 'kept', 'word'], ['barber', 'kept', 'secret'], ['keeping', 'keeping', 'huge', 'secret','driving', 'barber', 'crazy'], ['barber', 'went', 'huge', 'mountain']]
```

```python
tokenizer = Tokenizer()
tokenizer.fit_on_texts(preprocessed_sentences)
encoded = tokenizer.texts_to_sequences(preprocessed_sentences)
print(encoded)
```

모든 단어가 고유한 정수로 변환되었습니다
```python
[[1, 5], [1, 8, 5], [1, 3, 5], [9, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6],
[1, 4, 2], [7, 7, 3, 2, 10, 1, 11], [1, 12, 3, 13]]
```

모두 동일한 길이로 맞춰주기 위해서 이 중에서 가장 길이가 긴 문장의 길이를 계산해보겠습니다.
```python
max_len = max(len(item) for item in encoded)
print(' 최 대 길 이 :',max_len)
```

가장 길이가 긴 문장의 길이는 7 입니다. 모든 문장의 길이를 7 로 맞춰주겠습니다. 이때 가상의 단어’PAD’
를 사용합니다. ’PAD’ 라는 단어가 있다고 가정하고, 이 단어는 0 번 단어라고 정의합니다. 길이가 7 보다
짧은 문장에는 숫자 0 을 채워서 길이 7 로 맞춰줍니다.

```python
for sentence in encoded:
    while len(sentence) < max_len:
        sentence.append(0)
    
padded_np = np.array(encoded)
padded_np
```

```python
array([[ 1, 5, 0, 0, 0, 0, 0],
[ 1, 8, 5, 0, 0, 0, 0],
[ 1, 3, 5, 0, 0, 0, 0],
[ 9, 2, 0, 0, 0, 0, 0],
[ 2, 4, 3, 2, 0, 0, 0],
[ 3, 2, 0, 0, 0, 0, 0],
[ 1, 4, 6, 0, 0, 0, 0],
[ 1, 4, 6, 0, 0, 0, 0],
[ 1, 4, 2, 0, 0, 0, 0],
[ 7, 7, 3, 2, 10, 1, 11],
[ 1, 12, 3, 13, 0, 0, 0]])
```

길이가 7 보다 짧은 문장에는 전부 숫자 0 이 뒤로 붙어서 모든 문장의 길이가 전부 7 이된 것을 알 수 있습
니다. 기계는 이들을 하나의 행렬로 보고, 병렬 처리를 할 수 있습니다. 또한, 0 번 단어는 사실 아무런 의
미도 없는 단어이기 때문에 자연어 처리하는 과정에서 기계는 0 번 단어를 무시하게 될 것입니다. 이와 같
이 데이터에 특정 값을 채워서 **데이터의 크기 (shape) 를 조정하는 것을 패딩 (padding) 이라고 합니다. 숫
자 0 을 사용하고 있다면 제로 패딩 (zero padding) 이라고 합니다**.

### Keras 전처리도구로 패딩하기
케라스에서는 위와 같은 패딩을 위해 pad_sequences() 를 제공하고 있습니다.

```python
from tensorflow.keras.preprocessing.sequence import pad_sequences
```

encoded 값이 위에서 이미 패딩 후의 결과로 저장되었기 때문에 패딩 이전의 값으로 다시 되돌리겠습니
다.

```python
encoded = tokenizer.texts_to_sequences(preprocessed_sentences)
print(encoded)
```

케라스의 pad_sequences 를 사용하여 패딩을 해봅시다
```python
padded = pad_sequences(encoded)
padded

array([[ 0, 0, 0, 0, 0, 1, 5],
[ 0, 0, 0, 0, 1, 8, 5],
[ 0, 0, 0, 0, 1, 3, 5],
[ 0, 0, 0, 0, 0, 9, 2],
[ 0, 0, 0, 2, 4, 3, 2],
[ 0, 0, 0, 0, 0, 3, 2],
[ 0, 0, 0, 0, 1, 4, 6],
[ 0, 0, 0, 0, 1, 4, 6],
[ 0, 0, 0, 0, 1, 4, 2],
[ 7, 7, 3, 2, 10, 1, 11],
[ 0, 0, 0, 1, 12, 3, 13]], dtype=int32)
```

Numpy 로 패딩을 진행하였을 때와는 패딩 결과가 다른데 그 이유는 pad_sequences 는 기본적으로 문
서의 뒤에 0 을 채우는 것이 아니라 앞에 0 으로 채우기 때문입니다. 뒤에 0 을 채우고 싶다면 인자로
padding=’post’ 를 주면됩니다

```python
padded = pad_sequences(encoded, padding='post')
padded
```


---

## One-Hot Encoding
컴퓨터 또는 기계는 문자보다는 숫자를 더 잘 처리 할 수 있습니다. 이를 위해 자연어 처리에서는 문자를
숫자로 바꾸는 여러가지 기법들이 있습니다. **원‑핫 인코딩 (One‑Hot Encoding) 은 그 많은 기법 중에서
단어를 표현하는 가장 기본적인 표현 방법이며, 머신 러닝, 딥 러닝을 하기 위해서는 반드시 배워야 하는
표현 방법입니다.**

원‑핫 인코딩에 대해서 배우기에 앞서 단어 집합 (vocabulary) 에 대해서 정의해보겠습니다. 단어 집합은 서로
다른 단어들의 집합입니다. 여기서 혼동이 없도록 서로 다른 단어라는 정의에 대해서 좀 더 주목할 필요
가 있습니다. 단어 집합 (vocabulary) 에서는 기본적으로 book 과 books 와 같이 단어의 변형 형태도 다른
단어로 간주합니다.

원‑핫 인코딩을 위해서 먼저 해야할 일은 단어 집합을 만드는 일입니다. 텍스트의 모든 단어를 중복을 허
용하지 않고 모아놓으면 이를 단어 집합이라고 합니다. 그리고 이 단어 집합에 고유한 정수를 부여하는 정
수 인코딩을 진행합니다. 텍스트에 단어가 총 5,000 개가 존재한다면, 단어 집합의 크기는 5,000 입니다.
5,000 개의 단어가 있는 이 단어 집합의 단어들마다 1 번부터 5,000 번까지 인덱스를 부여한다고 해보겠습
니다. 가령, book 은 150 번, dog 는 171 번, love 는 192 번, books 는 212 번과 같이 부여할 수 있습니다.

이제 각 단어에 고유한 정수 인덱스를 부여하였다고 합시다. 이 숫자로 바뀐 단어들을 벡터로 다루고 싶
다면 어떻게 하면 될까요?

### 1. 원‑핫 인코딩 (One‑Hot Encoding) 이란?
원‑핫 인코딩은 단어 집합의 크기를 벡터의 차원으로 하고, 표현하고 싶은 단어의 인덱스에 1 의 값을 부
여하고, 다른 인덱스에는 0 을 부여하는 단어의 벡터 표현 방식입니다. 이렇게 표현된 벡터를 원‑핫 벡터
(One‑Hot vector) 라고 합니다.

원‑핫 인코딩을 두 가지 과정으로 정리해보겠습니다. 

첫째, 정수 인코딩을 수행합니다. 다시 말해 각 단어에 고유한 정수를 부여합니다. 

둘째, 표현하고 싶은 단어의 고유한 정수를 인덱스로 간주하고 해당 위치에 1 을 부여하고, 다른 단어의 인덱스의 위치에는 0 을 부여합니다. 

한국어 문장을 예제로 원‑핫 벡터를만들어보겠습니다.
```python
"나는 자연어 처리를 배운다"
```

Okt 형태소 분석기를 통해서 문장에 대해서 토큰화를 수행합니다.
```python
from konlpy.tag import Okt

okt = Okt()
tokens = okt.morphs("나는 자연어 처리를 배운다")
print(tokens)

>> [' 나 ', ' 는 ', ' 자 연 어 ', ' 처 리 ', ' 를 ', ' 배 운 다 ']
```

각 토큰에 대해서 고유한 정수를 부여합니다. 지금은 문장이 짧기 때문에 각 단어의 빈도수를 고려하지 않
지만, 빈도수 순으로 단어를 정렬하여 정수를 부여하는 경우가 많습니다.
```python
word_to_index = {word : index for index, word in enumerate(tokens)}
print(' 단 어 집 합 :',word_to_index)

>> 단 어 집 합 : {' 나 ': 0, ' 는 ': 1, ' 자 연 어 ': 2, ' 처 리 ': 3, ' 를 ': 4, ' 배 운 다 ': 5}
```

토큰을 입력하면 해당 토큰에 대한 원‑핫 벡터를 만들어내는 함수를 만들었습니다.
```python
def one_hot_encoding(word, word_to_index):
	one_hot_vector = [0]*(len(word_to_index))
	index = word_to_index[word]
	one_hot_vector[index] = 1
	return one_hot_vector
```

’자연어’ 라는 단어의 원‑핫 벡터를 얻어봅시다.
```python
one_hot_encoding("자연어", word_to_index)
>> [0, 0, 1, 0, 0, 0]
```

### 2. 케라스를 이용한 원‑핫 인코딩
위에서는 원‑핫 인코딩을 이해하기 위해 파이썬으로 직접 코드를 작성하였지만, 케라스는 원‑핫 인코딩을
수행하는 유용한 도구 to_categorical() 를 지원합니다. 이번에는 케라스만으로 정수 인코딩과 원‑핫 인코
딩을 순차적으로 진행해보도록 하겠습니다.

```python
text = "나랑 점심 먹으러 갈래 점심메뉴는 햄버거 갈래 갈래 햄버거 최고야"
```

```python
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import to_categorical

tokenizer = Tokenizer()
tokenizer.fit_on_texts([text])
print(' 단 어 집 합 :',tokenizer.word_index)

>>  단 어 집 합 : {'갈래': 1, '햄버거': 2, '나랑': 3, '점심': 4, '먹으러': 5, '점심메뉴는': 6, '최고야': 7}
```

위 와 같 이 생 성 된 단 어 집 합 (vocabulary) 에 있 는 단 어 들 로 만 구 성 된 텍 스 트 가 있 다 면,
texts_to_sequences() 를 통 해 서 이 를 정 수 시 퀀 스 로 변 환 가 능 합 니 다. 생 성 된 단 어 집 합 내 의 일
부 단어들로만 구성된 서브 텍스트인 sub_text 를 만들어 확인해보겠습니다.

```python
sub_text = " 점 심 먹 으 러 갈 래 메 뉴 는 햄 버 거 최 고 야 "
encoded = tokenizer.texts_to_sequences([sub_text])[0]
print(encoded)

>> [2, 5, 1, 6, 3, 7]
```


지금까지 진행한 것은 이미 이전에 정수 인코딩 실습을 하며 배운 내용입니다. 이제 해당 결과를 가지
고, 원‑핫 인코딩을 진행해보겠습니다. 케라스는 정수 인코딩 된 결과로부터 원‑핫 인코딩을 수행하는
to_categorical() 를 지원합니다.
```python
one_hot = to_categorical(encoded)
print(one_hot)

[[0. 0. 1. 0. 0. 0. 0. 0.] # 인 덱 스 2 의 원 - 핫 벡 터
[0. 0. 0. 0. 0. 1. 0. 0.] # 인 덱 스 5 의 원 - 핫 벡 터
[0. 1. 0. 0. 0. 0. 0. 0.] # 인 덱 스 1 의 원 - 핫 벡 터
[0. 0. 0. 0. 0. 0. 1. 0.] # 인 덱 스 6 의 원 - 핫 벡 터
[0. 0. 0. 1. 0. 0. 0. 0.] # 인 덱 스 3 의 원 - 핫 벡 터
[0. 0. 0. 0. 0. 0. 0. 1.]] # 인 덱 스 7 의 원 - 핫 벡 터
```

위의 결과는 “점심 먹으러 갈래 메뉴는 햄버거 최고야” 라는 문장이 [2, 5, 1, 6, 3, 7] 로 정수 인코딩이 되고
나서, 각각의 인코딩 된 결과를 인덱스로 원‑핫 인코딩이 수행된 모습을 보여줍니다.

### 원‑핫 인코딩 (One‑Hot Encoding) 의 한계

이러한 표현 방식은 단어의 개수가 늘어날 수록, 벡터를 저장하기 위해 필요한 공간이 계속 늘어난다는 단
점이 있습니다. 다른 표현으로는 벡터의 차원이 늘어난다고 표현합니다. 원 핫 벡터는 단어 집합의 크기
가 곧 벡터의 차원 수가 됩니다. 가령, 단어가 1,000 개인 코퍼스를 가지고 원 핫 벡터를 만들면, 모든 단어
각각은 모두 1,000 개의 차원을 가진 벡터가 됩니다. 다시 말해 모든 단어 각각은 하나의 값만 1 을 가지고,
999 개의 값은 0 의 값을 가지는 벡터가 되는데 이는 저장 공간 측면에서는 매우 비효율적인 표현 방법입
니다.

**또한 원‑핫 벡터는 단어의 유사도를 표현하지 못한다는 단점이 있습니다.** 예를 들어서 늑대, 호랑이, 강아
지, 고양이라는 4 개의 단어에 대해서 원‑핫 인코딩을 해서 각각, `[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0,1]` 이라는 원‑핫 벡터를 부여받았다고 합시다. 이때 원‑핫 벡터로는 강아지와 늑대가 유사하고, 호랑이와
고양이가 유사하다는 것을 표현할 수가 없습니다. 좀 더 극단적으로는 강아지, 개, 냉장고라는 단어가 있
을 때 강아지라는 단어가 개와 냉장고라는 단어 중 어떤 단어와 더 유사한지도 알 수 없습니다.

단어 간 유사성을 알 수 없다는 단점은 검색 시스템 등에서는 문제가 될 소지가 있습니다. 가령, 여행을 가
려고 웹 검색창에 ‘삿포로 숙소’ 라는 단어를 검색한다고 합시다. 제대로 된 검색 시스템이라면, ’ 삿포로
숙소’ 라는 검색어에 대해서’ 삿포로 게스트 하우스’, ‘삿포로 료칸’, ’ 삿포로 호텔’ 과 같은 유사 단어에 대
한 결과도 함께 보여줄 수 있어야 합니다. 하지만 단어간 유사성을 계산할 수 없다면, ’ 게스트 하우스’ 와’
료칸’ 과’ 호텔’ 이라는 연관 검색어를 보여줄 수 없습니다.

이러한 단점을 해결하기 위해 단어의 잠재 의미를 반영하여 다차원 공간에 벡터화 하는 기법으로 크게 두
가지가 있습니다. 첫째는 카운트 기반의 벡터화 방법인 LSA(잠재 의미 분석), HAL 등이 있으며, 둘째는 예
측 기반으로 벡터화하는 NNLM, RNNLM, Word2Vec, FastText 등이 있습니다. 그리고 카운트 기반과 예측
기반 두 가지 방법을 모두 사용하는 방법으로 GloVe 라는 방법이 존재합니다

여기서 언급한 방법들 중 대부분은 워드 임베딩 챕터에서 다루게 됩니다.