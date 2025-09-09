---
title: Jupyter Notebook 화면 크기 조정
date: 2023-11-16
draft: false
tags:
  - Jupyter
  - HowTo
complete: true
---
## 셀크기
```python
from IPython.core.display import display, HTML
display(HTML("<style>.container { width:100% !important; }</style>"))
```

## 결과창 스크롤
```
shift + O
```

## 결과창 토글
```
O
```


## 판다스 결과창
```python
# general options
pd.set_option('display.max_columns',100)
pd.set_option('display.max_rows',100)

# for text columns
pd.set_option('display.max_colwidth',500)
pd.set_option('display.html.use_mathjax',False)
```


## 판다스 df 폰트사이즈
```python
df = df.style.set_properties(**{
    'font-size': '14pt',
})
```

## Line Number 표시
```
shift + L
```
