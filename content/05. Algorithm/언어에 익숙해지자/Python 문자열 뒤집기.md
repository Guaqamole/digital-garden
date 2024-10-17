---
title: Python 문자열 뒤집기
date: 2023-10-27
draft: false
tags:
  - Python
  - Fundamental
complete: true
---
```python
a = 'happy birthday'

print(a[::-1])
```

위와 같이 문자열을 뒤집으려면 다음과 같은 `slicing` `[::-1]` 을 사용하면된다.


## Syntax

문자열 슬라이싱은 `[start:stop:step]` 형식으로 작동하며, 문자열을 특정한 방식으로 추출할 때 사용된다. 여기서는 `-1`을 사용하여 거꾸로 출력하도록 한다. 즉, `[::-1]` 은:
- 시작 : 아무 값도 명시 안했을 경우 0번째 인덱스부터 시작
- 끝 : 아무 값도 명시 안했을 경우 마지막 인덱스를 끝으로 지정
- 스텝 : 리스트를 반대로 순회
가 되겠다.