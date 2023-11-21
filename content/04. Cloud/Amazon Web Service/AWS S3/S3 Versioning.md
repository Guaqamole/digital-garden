---
title: S3 Versioning
topic: S3 Versioning
date: 2023-11-20
draft: false
tags: 
complete: true
---
## **S3 버저닝 (Versioning)**

![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/chLS5b/btrFqrL00Ry/NwC1rVm7kw76ls1zz2Egt0/img.jpg)

앞서 소개했듯이, 파일을 실수로 삭제하고 저장을 해버렸을 경우, S3는 이를 위해 자동화된 백업 관리 기법인 **버전 관리** 및 생애주기 관리 기법을 제공한다.

> [!NOTE]
> 버저닝(Versioning)은 특정 객체에 여러 버전을 유지하는 수단이다.

파일에 버젼 아이디를 붙임으로서, 버전 관리를 사용하여 S3 버킷에 저장된 모든 객체의 버전을 보존, 검색 및 복원할 수 있다. 또한 의도하지 않은 사용자 작업과 응용 프로그램 오류 모두 쉽게 복구할 수 있다.

변경내용을 추적할 수 있으므로 매우 편리하지만 비용을 조심해야한다.

aws 매니저에서 버킷을 만들때 기본적으로 비활성화 라서, 직접 활성화 해야한다. 

단, 버킷에서 버전을 사용하도록 설정한 후에는 비활성화 상태로 돌아갈 수 없다. 대신 버전 관리 일시 중지 설정은 가능하다.

[![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/XZFpj/btrFuoUyE1L/MIEdo54OS0tdhm8HkxqWV1/img.png)](https://blog.kakaocdn.net/dn/XZFpj/btrFuoUyE1L/MIEdo54OS0tdhm8HkxqWV1/img.png)

### 객체 버전 ID 조회

버킷에 대한 버전 관리를 사용 설정하면 저장되는 **객체에 대해 고유한 버전 ID**를 자동으로 생성되어진다.

예를 들어, photo.gif(버전ID : 111111) , photo.gif(버전ID : 121212)와 같이 하나의 버킷에서 **키값은 동일하지만 버전 ID가 다른** 두 개의 객체를 보유할 수 있게 된다.

[![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/d5RQlT/btrFuVElAeJ/rdFvE7KPwFlBX9KkobTReK/img.png)](https://blog.kakaocdn.net/dn/d5RQlT/btrFuVElAeJ/rdFvE7KPwFlBX9KkobTReK/img.png)

<br>


### 객체 버전 ID 수정

이번에는 **파일을 수정할때의 동작**을 알아보자.

버전 관리를 사용하는 버킷에 객체를 PUT(REST API의 수정 동작 명령)할 때 파일을 덮어쓰지 않는다.

다음 그림처럼, 동일한 이름의 객체를 이미 보유하고 있는 버킷에 **새 버전의 photo.gif**를 PUT할 때 원래 객체(ID = 111111)는 버킷에 계속 남아 있으며 S3가 새 버전 ID(121212)를 만들어 버킷에 추가해 위로 올리게 된다. (맨 위에 올려진게 최신 데이터로 인식)

[![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/s9jQi/btrFrdNxn12/rVqbo058B1jW4Xq1sdfkZK/img.png)](https://blog.kakaocdn.net/dn/s9jQi/btrFrdNxn12/rVqbo058B1jW4Xq1sdfkZK/img.png)

이 기능으로 실수로 객체를 덮어쓰거나 삭제하는 것을 방지하고, 객체의 이전 버전을 검색할 수 있는 것이다.

마찬가지로 객체를 DELETE하면, 다음 그림과 같이 버킷에 삭제 마커(Delete Marker)를 삽입을 하게 된다.

파일을 삭제 한것이 아니다. 삭제 마커를 최상단에 올림으로서 마치 파일이 삭제된것처럼 효과를 주는 것이다.

따라서 DELETE를 수행해도 파일의 전체적인 버전 정보를 유지시키게 된다.

<br>

### 객체 버전 ID 삭제

만일 버전 관리되는 객체를 영구적으로 삭제하려면 버젼 ID 자체를 DELETE 해야 한다.

[![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/babIva/btrFsfxBt6K/6K8okM1DFH1kDfbbZD10m1/img.png)](https://blog.kakaocdn.net/dn/babIva/btrFsfxBt6K/6K8okM1DFH1kDfbbZD10m1/img.png)

기본적으로 GET 요청은 가장 최근에 저장된 버전을 검색한다.

그런데 최신 버전이 삭제 마커일 때 간단한 GET Object 요청을 수행하면 다음 그림과 같이 404 Not Found 오류가 반환된다. (삭제된 파일이니까 정상 동작이다)

[![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/cmUvOK/btrFuVYDSre/TGGwpRiByfyG1CPgUNAaP0/img.png)](https://blog.kakaocdn.net/dn/cmUvOK/btrFuVYDSre/TGGwpRiByfyG1CPgUNAaP0/img.png)

이때 버전 ID를 지정하여 특정 객체에 대해 GET을 실행할 수 있다. (특정 객체 버전인 111111을 GET)

[![S3 버저닝 (Versioning)](https://blog.kakaocdn.net/dn/bribhC/btrFrd7QBNm/ddrigQfJVkixkK3gQnPIZ1/img.png)](https://blog.kakaocdn.net/dn/bribhC/btrFrd7QBNm/ddrigQfJVkixkK3gQnPIZ1/img.png)

출처: [https://inpa.tistory.com/entry/AWS-📚-S3-버킷-생성-사용법-실전-구축](https://inpa.tistory.com/entry/AWS-%F0%9F%93%9A-S3-%EB%B2%84%ED%82%B7-%EC%83%9D%EC%84%B1-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%8B%A4%EC%A0%84-%EA%B5%AC%EC%B6%95) [Inpa Dev 👨‍💻:티스토리]