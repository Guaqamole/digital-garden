---
title: PEFT (parameter-efficient fine-tuning)
date: 2024-08-13
draft: false
tags:
  - DeepLearning
  - HuggingFace
complete: true
---
## Overview
대규모 언어모델을 다루다 보면은 파라미터 개수가 많은 모델을 접할 수 있다. gpt3 같은 경우는 1750억 개의 파라미터를 가지고 있는데 학습하는 것도 문제이지만 그 학습이 끝난 모델을 일반적으로 사용하는 저렴한 GPU 한대의 메모리 용량에 업로드 하는것 자체가 불가능하다. 

따라서 대규모 LLM 모델을 일반 사용자도 사용하려면은 GPU 메모리 측면에서 메모리를 줄이는 거랑 또 트레이닝을 할 때도 더 적은 파라미터 (weight, bias) 로 트레이닝하는 기법이 필요한데 컴퓨팅 리소스가 충분하지 않은 상황에서도 학습할수 있도록 도와주는 라이브러리가 페프트이다.

### 특징
- 소수의 파라미터만을 미세 조정하여 계산 및 저장 비용을 크게 줄인다.

PEFT 에서 지원하는 모델들:
- LoRA
- Prefix Tuning
- P-Tuning
- Prompt Tuning
- AdaLoRA
- …


## LoRA (Low-Rank Adaptation of Large Language Models)
https://github.com/huggingface/peft
https://colab.research.google.com/drive/1ViGQuvsBhAbzcXvOyNawlWwux-VXMx1L?usp=sharing

핵심: fine-tuning 과정시 pre-train 이 끝난 파라미터 w_0 를 고정하고 low-rank decomposition 세팅의 새로운 파라미터를 학습시킴
가정: 전체 파라미터를 사용하지 않고 본질적 차원을 가지고 효율적으로 학습 할 수 있다.


```python
!pip install -q peft transformers datasets evaluate seqeval
```

warning
```python
import evaluate

TypeError: Descriptors cannot be created directly.
If this call came from a _pb2.py file, your generated code is out of date and must be regenerated with protoc >= 3.19.0.
If you cannot immediately regenerate your protos, some other possible workarounds are:
 1. Downgrade the protobuf package to 3.20.x or lower.
 2. Set PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python (but this will use pure-Python parsing and will be much slower)


--> !pip install protobuf==3.20.*
```

## 그외 좋은 문서
https://velog.io/@judy_choi/LLMLLaMA3-Fine-Tuning-%EB%B0%A9%EB%B2%95-%EC%A0%95%EB%A6%AC

https://www.runpod.io/