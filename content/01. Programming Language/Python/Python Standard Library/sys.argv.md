---
title: sys.argv
date: 2023-10-20
draft: false
tags:
  - Python
  - StandardLibrary
complete: false
---
sys.argv는 파이썬 스크립트로 전달한 명령행 매개변수를 처리할 때 사용하는 모듈이다.
## 문제

매개변수를 전달받아 이를 처리하는 파이썬 프로그램을 만들고자 한다. 그 첫 단계로, 다음과 같이 동작하는 파이썬 프로그램 argv_upper.py는 어떻게 만들어야 할까?

```bash
python3 argv_upper.py life is too short, you need python.
LIFE IS TOO SHORT, YOU NEED PYTHON.
```

즉, argv_upper.py 라는 파이썬 스크립트에 life is too short, you need python.이라는 인수를 전달하면 이를 모두 대문자로 바꾸어 출력해야 한다.

## 풀이

python 명령어 뒤에 전달한 모든 문자열은 공백을 기준으로 나뉘어서 sys.argv 리스트의 요소가 된다. 즉, `python argv_upper.py life is too short, you need python.` 명령을 수행하면 sys.argv에는 다음과 같은 값이 저장된다.

```python
['argv_upper.py', 'life', 'is', 'too', 'short,', 'you', 'need', 'python.']
```

여기서 주의할 점은 sys.argv의 첫 번째 값은 argv_upper.py와 같은 파이썬 스크립트의 이름이라는 점이다. 따라서 대문자로 변환하기 위한 대상은 sys.argv[1:]임을 알 수 있다.

이 내용을 종합한 풀이는 다음과 같다.

`[파일명: argv_upper.py]`

```python
import sys

print(' '.join(map(str.upper, sys.argv[1:])))
```

`sys.argv[1:]`의 각 항목의 값을 대문자로 변환하기 위해 map과 `str.upper`를 사용했다.

> map()은 여러 개의 데이터를 한 번에 다른 형태로 변환하는 함수이며 str.upper()는 대문자로 바꾸는 함수이다.

이 코드를 실행한 결과는 다음과 같다.

```no-highlight
c:\projects\pylib>python argv_upper.py life is too short, you need python
LIFE IS TOO SHORT, YOU NEED PYTHON
```
