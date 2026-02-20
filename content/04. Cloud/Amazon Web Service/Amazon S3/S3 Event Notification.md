---
title: S3 Event Notification
topic: S3 Event Notification
date: 2023-11-23
draft: false
tags:
  - AWS
  - S3
  - Storage
complete: true
---
Amazon S3에서 이벤트가 발생하는데, 객체의 생성, 삭제, 복원, 복제 등의 모든 이벤트를 일컫습니다.

알림 설정은 객체의 구분을 위해 Prefix나 Tags로 필터링할 수도 있습니다. 예를 들어 .jpg 로 끝나는 객체를 필터링할 수 있죠.

또, 다른 AWS 서비스와 통합할 수 있습니다.

가령, 사진의 섬네일을 생성하려고 한다면, 이에 대한 이벤트 알림을 만들어서 다른 AWS 수신 서비스로 보낼 수 있습니다.

이 때 수신 서비스는 SNS, SQS 대기열이나 Lambda 함수가 될 수도 있습니다.

<br>

##  사용법

### 1. SQS 생성

먼저 SQS의 새로운 Queue를 생성합니다.
![SQS Queue 생성 - 1. Queue 생성](https://blog.kakaocdn.net/dn/I0q5x/btr5Q35zb1E/38xSkI1hRGi1BMM1cbLVvk/img.gif)

<br>


### 2. SQS 정책 설정
그리고 S3에서 보내는 이벤트를 받아야 하는데, 이 때 필요한 SQS 접근 정책을 설정해야 합니다. 생성한 Queue의 Access policy를 수정합니다.

![SQS Queue 생성](https://blog.kakaocdn.net/dn/ml04u/btr59ZtNemf/Qmb7tZaUae18YBWTFNjhG1/img.gif)


정책은 AWS 정책 생성기를 통해 제작합니다. 

![SQS Queue 정책 생성](https://blog.kakaocdn.net/dn/pWHmW/btr5Uj7Nhlk/n4uqvlEwqRbJoOVEqRTAv0/img.gif)

S3가 SQS Queue에 접근하기 위해서는 아래와 같은 설정이 필요합니다.

✔️ Principal: *
✔️ AWS Service: Amazon SQS
✔️ Actions: SendMessage
✔️ ARN: 생성한 SQS ARN
✔️ Condition (optional) 
        - Condition: ArnEquals 
        - Key: aws::SourceArn 
        - Value: SQS Queue에 메세지를 보낼 AWS S3의 ARN

생성한 정책 JSON을 SQS의 Access policy에 입력 후 저장합니다.

![SQS Queue 정책 설정](https://blog.kakaocdn.net/dn/bgJqYg/btr5TrkrPEk/3upz44IeH7EELTdZ7NhVNK/img.gif)


<br>


### 3. S3 Event notification 생성

설정이 끝났으면, S3의 Event notification을 생성합니다.

![](https://blog.kakaocdn.net/dn/DRphC/btr5UlkfsYo/Xtp4EdntrOpVSqdaJMkuRk/img.gif)

S3 Event Notification 생성

설정 시 Event types 를 Object Creation의 모든 Action으로 선택했기 때문에 해당 버킷에 객체가 생성될 때마다 이벤트가 발생하여 SQS로 전달됩니다.

<br>


### 4. S3 Event notification 테스트

그럼, 이제 실제로 이벤트가 SQS로 잘 전달되는지 확인해보겠습니다.

![](https://blog.kakaocdn.net/dn/cLjNlx/btr5Pa5iChB/3QkT2rTrsy9Olwdk1VsdGk/img.gif)

S3에 객체 생성 (파일 업로드)

어느 정도 시간이 지나고 난 후 SQS를 확인하면 아래와 같이 이벤트가 발생한 것을 확인할 수 있습니다.

Poll for messages을 클릭하여 확인할 수 있습니다.

![](https://blog.kakaocdn.net/dn/RUb9F/btr5UlLkEJV/BW463EPdGZ1tuyR4C0Tngk/img.gif)
<br>


## EventBridge
최근에 S3 이벤트 알림은 Amazon EventBridge와 통합되었습니다.
S3 속성의 Amazon EventBridge을 활성화하면 S3의 거의 모든 이벤트가 Amazon EventBridge로 모이게 됩니다. 
EventBridge는 필터링 옵션을 이전보다 훨씬 더 심화시켜 사용할 수 있어요

메타데이터, 객체 크기 그리고 이름 등으로 필터링할 수 있고, 동시에 여러 수신지로 보낼 수도 있습니다.

가령 Kinesis Streams나 Firehose에도 보낼 수 있고, EventBridge에서 제공하는 기능을 사용할 수도 있습니다. 이벤트를 보관(archive)하거나 재생할 수 있고 안정적으로 전송할 수 있습니다.