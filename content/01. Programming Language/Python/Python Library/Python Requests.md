---
title: Python Requests
date: 2024-05-27
draft: false
tags:
  - Python
complete: true
link: https://me2nuk.com/Python-requests-module-example/
---
## Overview
```
requests
   ├── __version__.py
   ├── _internal_utils.py
   ├── adapters.py
   ├── api.py
   ├── auth.py
   ├── certs.py
   ├── compat.py
   ├── cookies.py
   ├── exceptions.py
   ├── help.py
   ├── hooks.py
   ├── models.py
   ├── packages.py
   ├── sessions.py
   ├── status_codes.py
   ├── structures.py
   └── utils.py
```

## Table of Contents
- HTTP Request
- HTTP Response
- Response Status
- Headers
- Cookies
## HTTP Request
요청의 모든 기능은 하단의 코드 예시와 같이 7가지 방법으로 액세스할 수 있습니다.

모두 Response 개체의 인스턴스를 반환합니다.
``` python
>>> r = requests.get("http://httpbin.org/get")
>>> r
<Response [200]>
>>> r = requests.post("http://httpbin.org/post")
>>> r = requests.put("http://httpbin.org/put")
>>> r = requests.head("http://httpbin.org/get")
>>> r = requests.patch("http://httpbin.org/patch")
>>> r = requests.delete("http://httpbin.org/delete")
>>> r = requests.options("http://httpbin.org/get")
```

