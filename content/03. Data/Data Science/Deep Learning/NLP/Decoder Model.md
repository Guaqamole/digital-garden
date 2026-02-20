---
title: Decoder Model
date: 2024-05-08
draft: false
tags:
  - NLP
  - DeepLearning
complete: true
---
디코더 모델은 Transformer 모델의 디코더만 사용합니다. 
각 단계에서 주어진 단어에 대해 어텐션 레이어는 문장에서 그 단어 앞에 위치한 단어에만 접근할 수 있습니다. 
이러한 모델을 종종 _auto-regressive model_ 이라고 합니다 .

디코더 모델의 사전 학습은 일반적으로 문장의 다음 단어를 예측하는 것입니다.

이러한 모델은 텍스트 생성과 관련된 작업에 가장 적합합니다.
- [CTRL](https://huggingface.co/transformers/model_doc/ctrl)
- [GPT](https://huggingface.co/docs/transformers/model_doc/openai-gpt)
- [GPT-2](https://huggingface.co/transformers/model_doc/gpt2)
- [Transformer XL](https://huggingface.co/transformers/model_doc/transfo-xl)