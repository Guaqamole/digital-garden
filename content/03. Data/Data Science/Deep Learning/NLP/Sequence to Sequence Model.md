---
title: Sequence to Sequence Model
date: 2024-05-08
draft: false
tags:
  - DeepLearning
  - NLP
complete: true
---
_인코더-디코더 모델( 시퀀스-시퀀스 모델_ 이라고도 함 )은 Transformer 아키텍처의 두 부분을 모두 사용합니다. 각 단계에서 인코더의 어텐션 레이어는 초기 문장의 모든 단어에 액세스할 수 있는 반면, 디코더의 어텐션 레이어는 입력에서 특정 단어 앞에 위치한 단어에만 액세스할 수 있습니다.

이러한 모델의 사전 훈련은 인코더 또는 디코더 모델의 목표를 사용하여 수행될 수 있지만 일반적으로 좀 더 복잡한 작업이 포함됩니다. 예를 들어, [T5는](https://huggingface.co/t5-base) 임의의 텍스트 범위(여러 단어를 포함할 수 있음)를 단일 마스크 특수 단어로 대체하여 사전 학습되었으며, 그런 다음 목표는 이 마스크 단어가 대체할 텍스트를 예측하는 것입니다.

Sequence-to-Sequence 모델은 요약, 번역 또는 생성적 질문 답변과 같이 주어진 입력에 따라 새로운 문장을 생성하는 작업에 가장 적합합니다.
- [BART](https://huggingface.co/transformers/model_doc/bart)
- [mBART](https://huggingface.co/transformers/model_doc/mbart)
- [Marian](https://huggingface.co/transformers/model_doc/marian)
- [T5](https://huggingface.co/transformers/model_doc/t5)
