---
title: Jenkins
date: 2024-11-06
draft: false
tags:
  - DevTools
  - Jenkins
complete: true
---
## Overview
Jenkins는 빌드, 테스트, 배포 등의 프로세스를 자동화하고 스케줄링하여 소프트웨어 품질과 개발 생산성을 향상시킵니다. 또한, Jenkins는 다양한 플러그인을 통해 기능을 확장하므로 다양한 도구와 통합할 수 있습니다. 

Jenkins를 사용하면 개발자들은 크게 두 가지 이점을 얻을 수 있습니다.

첫째, Jenkins를 사용하면 개발자들은 반복적인 업무를 자동화하여 버그를 빠르게 찾아내거나 변경사항을 빠르게 적용할 수 있어 고객에게 빠르게 서비스를 제공(배포) 할 수 있습니다. 즉, 고객의 요구사항에 빠르게 대응할 수 있개 해줍니다.

둘째, 고객에게 서비스를 제공하기 위한 빌드, 테스트, 배포 과정이 자동화됨으로 개발자가 수동으로 해야할 작업들이 줄어들어 시간을 절약할 수 있게 해줍니다.

![](https://i.imgur.com/VYJ4zFf.png)

### 마스터, 노드, 에이전트, 엑시큐터
- 모든 젠킨스 파이프라인은 코드를 실행하기 위해 하나 이상의 시스템 필요

### 마스터 (Master)
- 젠킨스 인스턴스 제어에 중심이 되는 역할
- 다른 시스템에 정의되지 않았다면 잡을 실행하는 기본 장소
- 무거운 작업은 다른 시스템에서 수행하는 것이 좋음
    - 마스터에서 수행되는 잡에는 모든 데이터, 환경 설정, 작업에 대해 마스터와 같은 접근 권한이 있는 보안 위협 때문
    - 마스터가 과부하로 인해 중단되면 안 되기 때문

### 노드 (Node)
- 젠킨스 잡을 실행할 수 있는 시스템
- 마스터 혹은 에이전트가 포함되며 도커와 같은 컨테이너를 의미할 때도 있음

### 에이전트 (Agent)
- 구 젠킨스의 슬레이브(slave), 전통적으로 마스터가 아닌 시스템을 의미
- 마스터에 의해 관리되고 필요에 의해 할당되어 각 잡의 수행을 담당
- 에이전트와 노드의 관계
    - 스크립트 방식 : 노드는 에이전트가 있는 시스템을 지칭
    - 서술적 : 특정 에이전트를 명시해 노드를 할당

### 엑시큐터 (Executor)
- 노드나 에이전트에서 잡을 실행시키는 장소
- 노드는 엑시큐터를 여러 개를 갖고 있을 수도 있고, 하나도 갖고 있지 않을 수도 있다
- 버전에 따라서 1개 이상 지정해야 하는 경우도 있음
![](https://i.imgur.com/sodV7ye.png)


※ 젠킨스 작업 수행에 연관된 시스템 종류
![](https://i.imgur.com/hpsWg6h.png)


CI 관련 용어
- 버전관리시스템 (Git…)
- 브랜치 관리 전략 (GitFlow…)
- CI 도구 (Jenkins…)
- 빌드 자동화 (Ant, Maven…)
- 코드 커버리지 (Sonarqube…)
- 코드 정적 분석 (Sonarqube…)
- 테스트 자동화
- 바이너리 관리 도구
- 패키징 자동화

**젠킨스 기본 개념**
- Java Runtime Environment에서 동작
- 다양한 플러그인들을 활용해서 각종 자동화 작업을 처리할 수 있다.
- AWS 배포, 테스트, 도커 빌드 등 할게 너무 많으니 각각의 컴포넌트들을 하나의 플러그인으로 모듈화를 해놓았는데 이를 활용하여 사용하면 된다.
- 가장 핵심적인 파이프라인, 시크릿 키마저도 플러그인으로 동작시킬 수 있다.
- 즉 일련의 자동화 작업의 순서들의 집합인 Pipeline을 통해 CI/CD 파이프라인을 구축한다.
- 플러그인들을 잘 조합해서 돌아가게 하는 게 Pipeline이라고 할 수 있다.

**젠킨스의 대표 Plugins**
- Credentials Plugin
    - Jenkins는 그냥 단지 서버이기 때문에 배포에 필요한 각종 리소스에 접근하기 위해서는 여러 가지 중요 정보들을 저장하고 있어야 한다.
    - 리소스에는 클라우드 리소스 혹은 베어메탈에 대한 ssh 접근 등을 의미한다.
    - 베어메탈이란 어떠한 소프트웨어도 담겨 있지 않은 하드웨어를 가리킨다.
    - AWS token, Git access token, secret key, ssh(username, password)등의 정보들을 저장할 때 사용한다.
    - 위와 같이 중요한 정보들을 저장해주는 플러그인
    - 젠킨스는 Private Network에 떠있기 때문에 보안상 너무 걱정하지 않아도 된다.
- Git Plugin => jenkins에서 git에 대한 소스코드를 긁어와서 빌드할 수 있도록 도와줌
- Pipeline => 핵심 기능인 파이프라인마저도 플러그인이다.
- Docker plugin and Docker Pipeline => Docker agent를 사용하고 jenkins에서 도커를 사용하기 위한 플러그인

---
## Jenkins Job
#### 1) Jenkins Jobs
- 젠킨스에 로그인을 해서 처음 접속을 하면 위의 화면 처럼 "Create a Job" 이라는 문구가 보입니다.
- 이 job이란 이름 그대로 jenkins에서 실행되는 각각의 작업을 의미합니다.
- 이 job 이 jenkins의 실행단위이고, 사용자는 job 을 커스텀하게 설정하여 하나의 빌드 프로세스를 만들 수 있습니다.

![](https://i.imgur.com/CR0t7xd.png)


1. 여기서 Create Job 혹은 New Item 을 선택하여 Job을 만들 수 있습니다.

- 아래의 6가지 선택지가 job 의 종류로 알고있고, 가장 기본적인 Freestyle project 로  job을 세팅할 수 있고
- Pipeline을 이용하여 미리 설정되어있는 ppt 템플릿 같은 개념의 프로세스들을 사용하여 job을 만들 수 있다고 합니다.
- 저는 먼저 Freestyle projcect 로 하나씩 해보면서 익숙해져 볼려고 합니다.
![](https://i.imgur.com/gaBYYU0.png)



---

2.  OK 버튼을 누르면 아래와 같이 작업을 정의하는 화면이 나타나게 됩니다. 하나씩 살펴보겠습니다

**2-1) General**

> job의 기본적인 설정을 정의합니다. 하나씩 살펴보도록 하겠습니다

![](https://i.imgur.com/wIF6WYW.png)


2-1-1) GitHub project

- 해당 Job과 연동할 원격 저장소가 있다면 url 을 적어주면 될 것 같습니다.
- 추후에, Github 의 특정 행동(Trigger) 가 발생했을 때 해당 행동이 웹훅으로 날라왔을 때 체킹하는 행위 등을 할 수 있을 것 같습니다.

![](https://i.imgur.com/L1975tf.png)


2-1-2) Throttle builds

- Throttle builds 는 빌드가 동시에 여러번 호출되는걸 막는 작업입니다.
- 예를 들어 빌드가 일어나고 5분안에는 빌드가 다시 일너나지 않도록 합니다.
- Number of Builds 와 Time Period로 시간을 설정할 수 있는 것 같습니다.
- 하단에 체크박스는, 위에서 언급했는 웹훅같은 트리거로 발생되는 빌드는, 해당 시간 제한을 받지 않는다는 옵션같습니다.

![](https://i.imgur.com/I0UwWqF.png)


2-1-3) 오래된 빌드 삭제

- 오래된 빌드 삭제는 빌드 이력 유지기간과 보관할 최대 갯수를 설정할수 있는데 용량을 최소화 하고 싶다면 설정해줍니다.

2-1-4) job 매개변수

- 매개변수는 빌드 작업중 사용할수 있는 변수이고 예를들어 한 작업에서 개발 버전 배포, Staging 배포, QA배포 등을 분기할때 사용할 수도 있다고합니다.

**2-2) 소스 코드 관리**

> 소스코드 관리는 원격 저장소의 트리거 → Web hook → jenkins 빌드 이 연결을 위한 설정입니다.

- source code management를 사용하기위해선 각 source code management의 plugin을 다운받아야 합니다. 저는 git을 다운받았기 때문에 아래와 같이 git을 선택할 수 있습니다.
- Repository URL에 job에서 사용할 github의 repository url을 입력하면 됩니다. private 저장소일 경우 credentails을 추가해 사용할 수 있습니다. 또한, job에서 사용할 branch도 직접 선택해 사용할 수 있습니다. default branch는 master입니다.
- 해당 부분은 각 의미는 아래 사진과 같고, 실제 Github 와의 연동은 나중에 해보겠습니다.

![](https://i.imgur.com/4QMjBXb.png)


**2-3)  build triggers**

> job을 실행시킬 trigger event를 선택합니다.

위에서 Github hook trigger를 선택할 경우, source code management에 등록한 repository에 commit이 발생하면 자동으로 jenkins job이 실행됩니다.

![](https://i.imgur.com/IhIHK09.png)


  
**2-3)  build steps**

> job이 실행될때 수행할 build script를 작성합니다.

- linux의 경우엔 Excute shell을 선택하고 수행할 build command line를 순서대로 작성하면 됩니다.
- 이때 작성하는 순서 (step) 에 따라 빌드가 실행됩니다.

![](https://i.imgur.com/Aau0uuD.png)

![](https://i.imgur.com/U9xAurS.png)


**2-4) post-build actions (빌드 후 조치)**

> 해당 job 완료 후 수행할 작업을 정의합니다.

- 빌드가 완련 된 후, 해당 job 에서 추가로 조치할 액션을 설정할 수 있습니다.
- 이메일 보내기, 테스트 리포트 보기, 다른 프로젝트 빌드하기, 배포하기 등 의 작업을 진행할 수 있습니다.

  
![](https://i.imgur.com/SXO0BFQ.png)

![](https://i.imgur.com/N0LAuLq.png)


---

3. Jenkins Run

> 생성한 job은 jenkins 메인 화면에서 확인할 수 있습니다.

- 이때 왼쪽의 'S'는 last build의 status를 나타내며, 'W'는 최근 5번 job의 build status를 나타냅니다.
![](https://i.imgur.com/UR5HMs0.png)


- job의 이름 옆을 클릭한 뒤 build now를 선택해 해당 job을 실행할 수 있습니다.
![](https://i.imgur.com/Cd9nPWZ.png)

---

## 2. Jenkins 파이프라인
**Pipeline**
- 파이프라인이란 CI/CD 파이프라인을 젠킨스에 구현하기 위한 일련의 플러그인들의 집합이자 구성
- 즉 여러 플러그인들을 이 파이프라인에서 용도에 맞게 사용하고 정의함으로써 파이프라인을 통한 서비스가 배포된다.
- Pipeline DSL(Domain Specific Langage)로 작성됨.
- 젠킨스가 동작되기 위해서는 여러 플러그인들이 파이프라인을 통해 흘러가는 과정이라고 할 수 있음

**Pipeline을 구성하는 요소**
- 파이프라인이란 CI/CD 파이프라인을 젠킨스에 구현하기 위한 일련의 플러그인들의 집합이자 구성.
- 즉 여러 플러그인들을 이 파이프라인에서 용도에 맞게 사용하고 정의함으로써 파이프라인을 통해 서비스가 배포됨.
- 두 가지 형태의 Pipeline Syntax가 존재
    - Declarative (더 최신이고 가독성이 좋음)
    - Scripted Pipeline

**Pipeline의 Section의 구성**
- Sections (가장 큰 개념)
    - Agent section
    - Post section
    - State section
    - Steps section

**Agent section**
- 젠킨스는 많을 일을 해야 하기 때문에 혼자 하기 버겁다.
- 여러 slave node를 두고 일을 시킬 수 있는데, 이처럼 어떤 젠킨스가 일을 하게 할 것인지를 지정한다.
- 젠킨스 노드 관리에서 새로 노드를 띄우거나 혹은 docker이미지를 통해 처리할 수 있다.
- 쉽게 말하면 젠킨스를 이용하여 시종을 여러 명 둘 수 있는데 어떤 시종에게 일을 시킬 것이냐 하는 것을 결정하는 것이다.
- 예를 들어 젠킨스 인스턴스가 서버 2대에 각각 떠있는 경우, 마스터에서 시킬 것인지 slave에서 시킬 것인지를 결정할 수 있다.
- 젠킨스 노드만 넣을 수 있는 것이 아니라 젠킨스 안에 있는 docker container에 들어가서 일을 시킬 수도 있다.
- "nodejs안에서 뭔가를 해"라고도 명령을 시킬 수 있다.

**Post section**
- 스테이지가 끝난 이후의 결과에 따라서 후속 조치를 취할 수 있다.
- 각각의 단계별로 구별하면 다음과 같다.
- 성공 시에 성공 이메일, 실패하면 중단 혹은 건너뛰기 등등, 작업 결과에 따른 행동을 취할 수 있다.

**Stage Section**
- 어떤 일들을 처리할 것인지 일련의 stage를 정의한다.
- 일종의 카테고리라고 보면 됨.
- ex) 프론트엔드 배포를 위한 스테이지, 등

**Steps Section**
- 한 스테이지 안에서의 단계로 일련의 스텝을 보여줌.
- Steps 내부는 여러 가지 스텝들로 구성되며 여러 작업들을 실행 가능
- 플러그인을 깔면 사용할 수 있는 스텝들이 생겨남
- 빌드를 할 때 디렉터리를 옮겨서 빌드를 한다던가, 다른 플러그인을 깔아서 해당 플러그인의 메서드를 활용해서 일을 처리한다던지 하는 작업들을 할 수 있다.
- 플러그인을 설치하면 쓸 수 있는 Steps들이 많아진다

### 사용법

1) 파이프라인을 사용하기 위해서는 플러그인을 설치해야합니다.
![](https://i.imgur.com/C29GzPC.png)
https://jojoldu.tistory.com/355


2) 그 후 new item 을 생성할 떄 pipeline 을 선택하시면 됩니다.
![](https://i.imgur.com/3ANRHnQ.png)

3) 그리고 나면 freestyle project와 다르게 pipeline script 공간이 생기는데 이때 작성되는 스크립트는 언어는 groovy 언어이고, 각각의 stage가 하나의 job으로 실행됩니다.
![](https://i.imgur.com/B1sgmza.png)

![](https://i.imgur.com/3F2XRyR.png)
