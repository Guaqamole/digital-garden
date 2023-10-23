---
title: CPython
date: 2023-10-10
draft: false
tags:
  - Python
  - C
  - Concept
complete:
---
![](https://i.imgur.com/0XL5NNA.png)

CPython은 python.org에서 배포되고 있는 Python을 의미합니다.

Python의 공식 github에 들어가면 python/cpython으로 프로젝트명이 되어있는 것을 볼 수 있습니다.

![](https://i.imgur.com/bxFOuX0.png)


여기서 앞에 C는 다들 예상 했겠지만 C/C++언어로 구현된 Python을 의미합니다.

프로그래밍 언어를 구축할때 해당 언어를 컴퓨터가 이해할 수 있게 번역해줄 compiler가 필요하고


이때

1. self-hosted compiler : 자신 언어로 컴파일러를 작성한 언어(ex. go언어는 compiler가 go언어로 작성됨)
2. Source-to-source compiler : 기존에 넓리 사용되는 프로그래밍 언어를 활용해서 컴파일러를 작성(대표적으로 Python)

Python은 C언어로 작성된 컴파일러를 활용해서 라인단위로 Code를 인터프리팅 하여 실행합니다.

(때문에 CPython을 수정한 다음 컴파일을 하면 Python의 문법이 바뀝니다!)

--> CPython으로 작성된 컴파일러 이기 때문에, CPython으로 패키지를 작성하는것 역시 가능합니다.