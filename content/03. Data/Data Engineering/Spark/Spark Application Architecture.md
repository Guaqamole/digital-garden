---
title: Spark Application Architecture
date: 2023-10-26
draft: false
tags:
  - Spark
  - Concept
complete: true
---
Spark Application은 *Driver Process* 와 다수의 *Executor Process* 로 구성된다.

![Caption|550](https://i.imgur.com/nH1ec1j.png)

## Driver Process

<mark style="background: #C6AB16;">Driver Process는 클러스터 노드중 하나에서 실행되며</mark>, `main()` 함수를 실행한다.

Driver Process는:
- 스파크 어플리케이션 정보의 유지관리
- 사용자 프로그램이나 입력에 대한 응답
- 전반적인 Executor Process의 작업과 관련된 분석, 배포 그리고 스케줄링 역할
을 수행하기 때문에 Spark Application의 심장과 같은 존재로서 애플리케이션의 수명 주기 동안 관련 정보를 모두 유지한다.


## Executor

<mark style="background: #C6AB16;">Executor는 Driver Process가 할당한 작업을 수행한다.</mark>

즉, 드라이버가 할당한 코드를 실행하고 진행 상황을 다시 드라이버 노드에 보고하는 두가지 역할을 수행한다.

Executor는 대부분 스파크 코드를 실행하는 역할을 한다. 하지만 Driver는 Spark의 [[Spark High-Level API|High-Level API]]에 포함되어 있는 다양한 언어 API를 통해 4가지 언어로 실행 할 수 있다. 


