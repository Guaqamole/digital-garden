---
title: NotOpenSSLWarning urllib3 v2 only supports OpenSS
date: 2024-11-25
draft: false
tags:
  - Python
complete: true
link: https://medium.com/@tlsrid1119/urllib3-v2-0-only-supports-openssl-1-1-1-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-c750d17bf3a6
---
## Problem
```python
NotOpenSSLWarning: urllib3 v2 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'LibreSSL 2.8.3
```

## Solution
- python 버전 downgrade
- python recompile  
    LibreSSL 이 아닌 -> OpenSSL 1.1.1+ (아마도 이미지 패키징된게 있을 것 같기도합니다.)
- 보전 호환성 맞추기 -> urllib3 버전으로 downgrade


3) urllib3 버전으로 downgrade
```python
pip install 'urllib3<2.0'
```
