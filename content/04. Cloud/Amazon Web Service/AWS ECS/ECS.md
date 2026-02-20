---
title: ECS
date: 2024-03-20
draft: false
tags:
  - AWS
  - ECS
complete: true
---
## Elastic Container Service(이하 ECS)란?

‘Amazon Elastic Container Service(Amazon ECS)는 확장성이 뛰어나고 빠른 컨테이너 관리 서비스입니다. 이를 사용하여 클러스터에서 컨테이너를 실행, 중지 및 관리할 수 있습니다. Amazon ECS에서 컨테이너는 서비스 내 개별 태스크나 여러 태스크를 실행하는 데 사용하는 태스크 정의에 정의됩니다. 이 컨테이너에서 서비스는 클러스터에서 지정된 수의 태스크를 동시에 실행하고 유지하는 데 사용할 수 있는 구성입니다. AWS Fargate에서 관리하는 서버를 사용하지 않는 인프라에서 태스크 및 서비스를 실행할 수 있습니다. 또는 인프라에 대한 더 세부적인 제어를 위해 관리하는 Amazon EC2 인스턴스의 클러스터에서 태스크와 서비스를 실행할 수 있습니다.’ 가 AWS의 설명이다.

이를 쉽게 풀어보자면 ECS는 우리가 흔히 사용하는 컨테이너(ex: Docker)를 관리하기 위한 도구이다. 컨테이너를 쉽게 실행, 중지하는 등의 관리가 가능하다. 유명한 오케스트레이션 툴인 Kubernetes와 비슷하다.

## ECS는 대상?

ECS는 ’AWS Fargate에서 관리하는 서버를 사용하지 않는 인프라에서 태스크 및 서비스를 실행할 수 있습니다. 또는 인프라에 대한 더 세부적인 제어를 위해 관리하는 Amazon EC2 인스턴스의 클러스터에서 태스크와 서비스를 실행할 수 있습니다.’ 위 AWS 설명의 일부를 추출한 내용이다.

사실 이 내용은 크게 어렵지 않다. ECS가 컨테이너를 관리하는 대상을 말하는 내용이다. ECS에서는 현재 두 가지 플랫폼을 지원한다. 바로 EC2와 Fargate이다. 이 둘의 차이점은 사용자가 서버를 직접 관리하는 IAAS와 사용자가 서버를 직접 관리하지 않는 PaaS의 차이이다.

공식 문서:

[https://docs.aws.amazon.com/ko_kr/AmazonECS/latest/developerguide/Welcome.html](https://docs.aws.amazon.com/ko_kr/AmazonECS/latest/developerguide/Welcome.html)

## ECS vs EKS

![](https://blog.kakaocdn.net/dn/rBsFi/btrHCoEwDAY/WD0wG7JE3djMDYS9L8TQUK/img.png)

위 사진은 AWS에서 제공하는 컨테이너 서비스이다. Management에 ECS와 EKS가 있다. 둘 다 컨테이너를 관리하는 점이 비슷하다. 비슷한 서비스인 듯 하지만 ECS는 Docker를 기반으로 하고, EKS는 Kubernetes를 기반으로 한다. 간단히 말해서 ECS는 AWS의 자원을 활용하고, EKS는 Kubernetes의 를 더 활용한다. 상황을 잘 고려하여 선택하는 것이 좋다.

## ECS 기본 용어와 구성

ECS에는 여러가지 구성요소가 있다. '**Cluster, Service, Container instance, Task'** 등이 있다.

### ECS Console

ECS Console은 구성하는 요소는 아니다. 하지만 ECS Console에서는 Cluster를 모니터링하고, 제어할 수 있다. 즉 쿠버네티스의 Master Node로 생각하면 될 것 같다.

### Cluster

컴퓨터 클러스터란 **‘여러 대의 컴퓨터들이 연결되어 하나의 시스템처럼 동작하는 컴퓨터들의 집합’**을 말한다. 즉 ECS의 클러스터는 Task를 배포하기 위한 인스턴스의 집합을 말한다.

### Service

Task의 상위의 있는 부분이다. Task를 Cluster에 몇 개나 배포할 것인지 결정한다. 외부의 서비스 하기 위해 로드밸런서를 연동한다. Task가 문제가 생기면 자동으로 새로운 Task를 생성한다. 이는 쿠버네티스의 배포와 레플리카셋 등의 기능과 비슷한 듯하다.

### Container instance

ECS를 통해서 Task가 배포되는 EC2 인스턴스를 **Container Instance**라고 한다. 쿠버네티스의 Worker Node와 비슷한 듯하다. Container Instance에는 ecs-agent가 설치된다. ecs-agent는 Instance를 Cluster에 묶고, 관리합니다.

### Task

Task는 Task definition과 Task 두 가지가 있다.

**Task definition**은 컨테이너를 실행하기 위해 설정한 내용이다. 컨테이너 이미지, 리소스, 포트 설정들을 한다. docker run 명령과 비슷한 역할을 한다.

**Task**는 **Task definition**에서 정의된 내용을 기반으로 배포된 컨테이너들을 Task라고 한다. Task에는 컨테이너가 하나 있을 수도 있고, 여러 개가 있을 수도 있다. 쿠버네티스의 Pod와 비슷한 듯하다.

위 설명한 내용을 글만 봐선 이해가 잘되지 않는다. 아래 그림을 보면 이해가 조금 더 쉽다.

![](https://blog.kakaocdn.net/dn/tylAp/btrHCwWNSD9/56Ju98oYLvsGrIdq5eZ0L0/img.png)

사진을 보면 구조가 어느 정도 이해가 된다. 추가로 service는 서로 다른 task를 여러 개 실행 가능하다. 그리고 위 사진에서 볼 수 있듯 한 cluster에서 여러 개의 service 실행이 가능하다.

출처: [https://itguny04.tistory.com/62](https://itguny04.tistory.com/62) [능지차이:티스토리]