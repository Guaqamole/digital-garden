---
title: Jython
date: 2023-10-10
draft: false
tags:
  - Python
---
![](https://i.imgur.com/SIAfpIk.png)

"아 ㅋㅋ 이거는 그럼 Java 비스무리한 문법으로 패키지 만드는 거구나?"

![](https://i.imgur.com/Tqw7h2F.png)

"안타깝게도 아닙니다. 이름은 Jython이지만, JPython이라고 쓰는게 맞을것 같습니다."

JVM을 활용하는 Python구현체 중 하나로, Python syntax로 작성된 코드를 JVM이 이해할 수 있는 바이트코드로 만들고, 이 바이트코드를 JVM이 실행하게 됩니다.

CPython대비 속도의 차이점이 있을수는 있지만, 사용자 입장에서는 큰 차이점을 느끼지 못합니다

(어차피 Python이라는 언어의 문법을 공유하니깐요)

  

이때 개발자 관점에서 차이점을 보면

`pypy와 유사하게 CPython으로 작성 or 컴파일된 패키지를 활용하는 부분에서 문제가 발생하게 됩니다.`

Jython의 특징으로 GC가 variable counting이 아닌 JVM에서 사용되는 GC으로 구현 되어있기 때문에 GIL을 사용하지 않는다는 장점이 있습니다

(문제는 아직도 Python 3.x 문법으로 못넘어 오고 있다죠...)


- https://jythonbook-ko.readthedocs.io/en/latest/Concurrency.html