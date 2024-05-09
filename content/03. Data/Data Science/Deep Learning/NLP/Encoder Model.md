---
title: Encoder Model
date: 2024-05-08
draft: false
tags:
  - DeepLearning
  - NLP
complete: true
---
인코더 모델은 Transformer 모델의 인코더만 사용합니다. 각 단계에서 Attention 레이어는 초기 문장의 모든 단어에 접근할 수 있습니다. 이러한 모델은 종종 "양방향" 주의를 기울이는 특징이 있으며 _자동 인코딩 모델_ 이라고도 합니다 .

이러한 모델의 사전 훈련은 일반적으로 주어진 문장을 어떻게든 손상시키고(예: 임의의 단어를 마스킹하여) 초기 문장을 찾거나 재구성하는 작업을 모델에 맡기는 것을 중심으로 진행됩니다.

인코더 모델은 문장 분류, 명명된 엔터티 인식(더 일반적으로는 단어 분류), 추출적 질문 응답 등 전체 문장에 대한 이해가 필요한 작업에 가장 적합합니다.

이 모델의 대표적인 가족은 다음과같습니다:
- [ALBERT](https://huggingface.co/docs/transformers/model_doc/albert)
- [BERT](https://huggingface.co/docs/transformers/model_doc/bert)
- [DistilBERT](https://huggingface.co/docs/transformers/model_doc/distilbert)
- [ELECTRA](https://huggingface.co/docs/transformers/model_doc/electra)
- [RoBERTa](https://huggingface.co/docs/transformers/model_doc/roberta)

