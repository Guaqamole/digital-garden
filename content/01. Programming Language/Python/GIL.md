---
title: GIL
date: 2023-10-09
draft: false
tags:
  - Python
---
# 파이썬 GIL이란?

GIL은 Global Interpreter Lock의 약어로, 여러 개의 스레드가 [[Python|파이썬]] 바이트코드를 한번에 하나만 사용할 수 있게 락을 거는 것을 의미한다. 쉽게 말해서 하나의 스레드만 파이썬 인터프리터를 제어할 수 있도록 하는 뮤텍스라고 보면 된다.

이게 무슨 의미냐면, 파이썬 프로그램은 특정 시점에 오직 하나의 스레드만 실행된다는 것이다. 파이썬 멀티 스레드 프로그램에서 멀티 스레드가 싱글 스레드처럼 동작하는 성능 병목 현상을 발견할 수 있다.

몇몇의 개발자들은(~~혹은 대다수?~~) 이러한 GIL의 과도한 성능제한에 대하여 악랄하다고 표현하기도 한다.

*그렇다면, 이 GIL은 정말 성능 병목만 만드는 EVIL 한 것일까?*

좀 더 자세히 들어가기 전에 이 GIL의 등장배경을 먼저 짚고 넘어가보자.

---
# GIL의 등장배경

GIL의 설계배경을 한마디로 말하자면 메모리 안전성을 보장하기 위함이다. 그런데, 파이썬 GIL의 등장배경에 대해 이야기하려면, 먼저 파이썬의 메모리 관리 방식에 대해 이야기해야 한다. 바로 여기서 등장하는 키워드가 바로 레퍼런스 카운팅이다.

근데, 레퍼런스 카운팅이 왜 문제가 되는가? Perl도 사용하고 C++도 사용하지 않는가!

이에 대해 설명하기 전에, 먼저 레퍼런스 카운팅에 대해 간단히 이해하고 넘어가보자. 레퍼런스 카운팅은 파이썬에서 생성된 객체가 객체를 가리키는 참조의 수를 추적하는 참조 카운트 변수를 가진다는 것을 의미한다.

![](https://i.imgur.com/kRoEW2O.png)

그림에서 보듯이 우측의 객체는 참조의 수가 2인데, 좌측의 객체는 참조가 없어져 0이 된다. 이 개수가 0에 도달하면 개체가 점유한 메모리가 메모리 가비지 컬렉터에 의해 해제된다.

문제는 이 레퍼런스 카운팅 변수가 멀티 스레드 환경에서 두 스레드가 동시에 값을 늘리거나 줄이는 Race Condition이 발생할 수 있다는 것이다. 이러한 상황이 발생하면 메모리 누수가 발생하거나 객체에 대한 참조가 남아있는 데도 메모리를 잘못 해제할 수 있다.

GIL은 그래서 멀티 스레드 프로그램에서 이러한 레퍼런스 카운팅에 의해 발생할 수 있는 문제를 미리 예방하고자 한다.

일종의 메모리 안전성을 보장하기 위한 디자인 선택이라고 볼 수 있다.

---

# 파이썬 싱글 스레드-멀티 스레드 프로그램의 비교

GIL의 병목을 단적으로 보여주는 예시를 싱글 스레드-멀티 스레드 프로그램을 비교하여 설명하고자 한다.

#### 싱글 스레드 프로그램
```python
import time
from threading import Thread

COUNT = 50000000

def countdown(n):
    while n>0:
        n -= 1

start = time.time()
countdown(COUNT)
end = time.time()

print('Time taken in seconds -', end - start)
```

```sh
$ python single_thread.py Time taken in seconds - 6.20024037361145
```

#### 멀티 스레드 프로그램
```python
import time
from threading import Thread

COUNT = 50000000

def countdown(n):
    while n>0:
        n -= 1

t1 = Thread(target=countdown, args=(COUNT//2,))
t2 = Thread(target=countdown, args=(COUNT//2,))

start = time.time()
t1.start()
t2.start()
t1.join()
t2.join()
end = time.time()

print('Time taken in seconds -', end - start)
```

```sh
$ python multi_thread.py Time taken in seconds - 6.924342632293701
```

두 파이썬 프로그램은 모두 카운트 다운을 하고, 프로그램이 종료된 뒤의 시간을 출력한다. 첫번째 싱글 스레드 프로그램은 카운트 다운까지의 수행을 스레드 하나로 실행하고, 두번째 멀티 스레드 프로그램은 두 스레드가 카운트 다운 시간을 나누어 실행한다.

그런데, 성능 기대를 해야할 멀티 스레드 프로그램에서 오히려 시간이 조금 더 걸리는 상황이 발생하였다. 왜 그런가 하면 바로 파이썬의 GIL 때문이다. 이렇게 CPU bound한 프로그램에 대해서 GIL은 락을 걸어, 성능향상보다 오히려 병목을 만들 수 있다. 반면에, I/O bound한 프로그램에서는 이득을 볼 수 있었을 것이다.

여기서 CPU bound? I/O bound? 이 차이는 과연 무엇인가? 가볍게 짚고 넘어가보도록 하자.

---

# 프로그램의 두가지 종류

## 1. I/O Bound Program

I/O bound 프로그램은 말그대로 입출력을 많이 하는 프로그램을 의미한다. 파일 시스템에 데이터를 읽어오고, 쓰는 과정이 잦은 프로그램들은 I/O bound하다고 표현할 수 있을 것이다.

## 2. CPU Bound Program

CPU bound 프로그램은 CPU 연산량이 많은 프로그램을 의미한다. 보통 같은 메모리에 접근하는 스레드들이 락에 걸리고, 연산을 많이하는 프로그램의 경우 이 경우에 대부분 해당된다.

이렇게 작성한 프로그램이 어떤 종류의 집중도를 가지고 있느냐에 따라서 멀티스레드가 성능을 높이기도, 낮추기도 한다. 문제는 이러한 CPU bound 프로그램들이 멀티코어로 스레드를 수행할 때 성능에서의 이득을 볼 수 없다는 것이다.

## I/O Intensivity를 DB에 적용하면?

이건 DB마다 다르다(DBMS 설계별). DBMS 별로 지정된 동시접속 수 및 동시성에 대한 관리 방안이 다르다. 단순하게 생각하면 I/O bound 프로그램처럼 멀티 스레드 프로그램에서 이득을 볼 수 있을 것 같다.

하지만, 일반적으로 DBMS에서 DB 일관성을 유지하기 위해 사용하는 락이나 저널링 때문에 각 스레드는 매번 다른 스레드의 작업이 끝날 때까지 기다려야만 DB에 접근이 가능한 상황이 생길 수도 있다.

~~결론은 케이스 바이 케이스. DBMS by DBMS.~~


---

# Conclusion

*Q. GIL은 과연 좋은 것일까?*

➡ 메모리 안전성을 보장하기 위한 제약이 과하다는 인상은 있지만 얻는 이득도 있다고 생각한다.

*Q. 파이썬에서 멀티 스레드 프로그램은 과연 유용한가?*

➡ 경우에 따라 다르다. 하지만 CPU bound 프로그램에서는 오히려 손해를 볼 수 있다.



#### Reference

- [https://realpython.com/python-gil/](https://realpython.com/python-gil/)
- [https://www.quora.com/What-are-some-disadvantages-caused-by-Pythons-GIL-Global-Interpreter-Lock-What-sort-of-applications-will-be-affected-by-GIL](https://www.quora.com/What-are-some-disadvantages-caused-by-Pythons-GIL-Global-Interpreter-Lock-What-sort-of-applications-will-be-affected-by-GIL)
- [https://grouplens.org/blog/pythons-gil-is-evil/](https://grouplens.org/blog/pythons-gil-is-evil/)
- [https://sangwoo-joh.github.io/](https://sangwoo-joh.github.io/)