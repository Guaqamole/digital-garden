---
title: Jupyter 환경에서 Cuda 설정하기
date: 2024-08-13
draft: false
tags:
  - DeepLearning
  - Jupyter
  - Cuda
complete: true
---
## 설치 확인
Torch로 확인
```python
import torch
torch.cuda.is_available()
>> True
```

Transformer로 확인
```python
from transformers import BertTokenizer, BertModel, BertForMaskedLM

def assign_GPU(Tokenizer_output):
    tokens_tensor = Tokenizer_output['input_ids'].to('cuda:0')
    token_type_ids = Tokenizer_output['token_type_ids'].to('cuda:0')
    attention_mask = Tokenizer_output['attention_mask'].to('cuda:0')
    
    output = {'input_ids' : tokens_tensor, 
              'token_type_ids' : token_type_ids, 
              'attention_mask' : attention_mask}

    return output

sentence  = 'Hello World!'
tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')
model     = BertModel.from_pretrained('bert-large-uncased')

inputs    = assign_GPU(tokenizer(sentence, return_tensors="pt"))
model     = model.to('cuda:0')
outputs   = model(**inputs)
outputs
```