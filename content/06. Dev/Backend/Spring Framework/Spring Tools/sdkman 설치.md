---
title: sdkman 설치
date: 2023-11-25
draft: false
tags:
  - Springboot
complete: true
---
자바를 사용하면서 기존 사용하던 버전에서 다른 버전을 사용해야 하는 경우가 종종 있을 것이다. 이를 위해선 새로운 JDK를 다운로드하고 해당 폴더를 새로운 환경변수로 등록해주는 작업을 매번 해주어야 한다. 매번 이러한 번거로운 과정을 하면서 몇 번의 클릭 혹은 명령만으로 해당 과정을 대신 처리해 주는 프로그램이 없을 가라는 생각을 해 보았을 것이다. 

sdkman 단순한 커맨드라인 인터페이스(CLI) 명령만으로 JDK를 설치, 변경, 환경변수변경을 처리 해주는 프로그램이다. 해당 프로그램은 유닉스 기반의 프로그램이라서 윈도우의 경우 약간 번거로운 과정을 거쳐야 하는데 이러한 과정을 정리하고 기본적인 사용방법을 정리하고자 한다. (윈도우에서 sdkman을 사용하는 방법에 대한 포스팅이 없는 것은 아니었지만 개인적으론 많이 헤매어서 따로 정리해 두고자 이 글을 쓴다.)
## 설치
git bash를 실행시키고 아래의 명령어를 치면 자동으로 설치가 진행된다.

```
curl -s "https://get.sdkman.io" | bash
```

※ git bash의 경우 복사는 "ctrl + Insert", 붙여넣기는 "shift + Insert" 이다.

![](https://blog.kakaocdn.net/dn/nXLCM/btr5cSqfP8h/K3lS6YEKIKp7mj5ZzmLfc1/img.png)

## 환경변수 등록
> [!info]
> 설정 > 왼쪽 창 ‘설정 검색’ > 시스템 환경 변수 편집 > 고급탭 > 환경 변수

sdkman에서 JDK를 설치하고 윈도우에서 설치된 JDK를 바로 사용 할 수 없다. 윈도우에서 해당 JDK를 인식하고 사용 할 수 있도록 환경변수로 등록을 해주어야한다. 보통의 경우 사용하는 java가 설치된 경로를 등록을 해주어야하는데, sdkman에서 유동적으로 환경변수를 변경 할 수 있도"C:\Users\사용자명\.sdkman\candidates\java\current" 의 경로를 지정해 주면 된다. (해당 경로를 등록해 주면 sdkman이 알아서 사용할 JDK를 연결시켜주는 것으로 보인다.)

윈도우 환경변수 설정 창으로 이동을 한 후 아래의 순서대로 진행해 준다.(기존 자바를 환경변수에 등록했던 분이라면 "ㄷ)" 부분만 수정해 주면 된다.)

**ㄱ) 환경변수창 하단의 "새로 만들기"를 클릭해서 아래와 같이 CLASSPAHT를 등록해 준다.**

```
CLASSPATH
%JAVA_HOME%\lib
```

![](https://blog.kakaocdn.net/dn/eevRaP/btr5dSpIuAj/EpjYrGO4NS0GN0ssIdgqTk/img.png)

![](https://blog.kakaocdn.net/dn/cW0JYM/btr5fmX9wKo/5b05encotAoTiw60l9aKJ0/img.png)

**ㄴ) 시스템 변수 영역에 있는 Path를 더블 클릭한 아래의 정보를 등록해 준다**

> %JAVA_HOME%\bin

![](https://blog.kakaocdn.net/dn/b0ixSe/btr49SK4sWL/xZmE6Bm8opINULCm6RPjoK/img.png)

![](https://blog.kakaocdn.net/dn/bnx3TL/btr5dqtsWtI/s3guPQypPNW3aJvhW2AcSK/img.png)

**ㄷ) 환경변수 창 하단의 "새로 만들기"를 클릭해서 JAVA_HOME 변수를 등록해 준다. 변수값은 아래의 경로를 등록해 주면 된다.**

```
C:\Users\사용자명\.sdkman\candidates\java\current
```

![](https://blog.kakaocdn.net/dn/Cxepx/btr5fOtwa97/3QKNTm4vr4eohmoGCBUf80/img.png)

## **4. 기본 명령어 수행해 보기**
  설치할 수 있는 혹은 설치된 JDK 리스트를 보고, JDK 설치 및 사용하는 명령어를 실행해보고자 한다. 어떠한 sdk 명령이 있는지 확인해보고 싶다면 git bash에서 단순히 "sdk help"를 쳐보면 사용할 수 있는 명령어들이 출력된다.

![](https://blog.kakaocdn.net/dn/lZjcR/btr5d4cBvGs/jMwUMvKsIzCGU4otSsurI1/img.png)

 sdkman 홈페이지에서도 실행할 수 있는 명령들을 소개해 놓았다.

**[https://sdkman.io/usage](https://sdkman.io/usage)**

### 버전 확인
```
sdk version
```

위명령어를 실행하면 sdkman버전을 확인할 수 있다.
![](https://blog.kakaocdn.net/dn/bivt1h/btr5dBPds5B/Wb5QojDklU9aHVQUs0XpA0/img.png)

### JDK 목록 보기
```
sdk list java
```

위 명령어를 실행하면 아래와 같이 JDK 리스트를 볼 수 있다.

![](https://blog.kakaocdn.net/dn/qxscl/btr5gRpZuSH/ZhMlnr2FkVlTFHpgrZ0CG0/img.png)

 status에 적혀 있는 installed는 설치가 되어 있다는 의미다. 해당목록 중 설치하고 싶은 버전이 있다면 해당 JDK의 Identifier를 복사해둔다. q를 눌러서 list 화면을 벗어 날 수 있다.

### 4-2 JDK 설치하기
 앞서 list에서 복사해 둔 Idenfier를 활용하여 아래의 명령어를 실행한다. (테스트릴 위해 corretto19.0.2 버전을 설치했다)

```
sdk install java [Identifier]
```

![](https://blog.kakaocdn.net/dn/bsNgVx/btr45kATaOL/J0cYDxT4pfDmQZFtnI1HQk/img.png)

명령어를 실행하면 위와 같이 설치가 진행된다. 설치를 진행하다 보면 해당 버전을 기본(default)으로 사용할 것인지 물어보는 문구가 뜨는 경우가 있는데 기본 버전으로 사용하고자 한다면 "y"를 누르면 된다.

### 설치한 JDK 사용하기
 다운로드된 JDK 중 다른 특정 버전으로 사용을 하고 싶다면 아래의 명령어를 실행하면 된다.

```
sdk use java [identifier]
```

![](https://blog.kakaocdn.net/dn/z7wSp/btr5cSw0KMp/mzeAgzKRNfhEPQSsZllaB1/img.png)

 기본 jdk를 지정을 하고 싶다면 아래의 명령을 실행하면 된다.

![](https://blog.kakaocdn.net/dn/b7bvuV/btr5d3SfXro/EUafn1vHM2bC75REMnlq50/img.png)

※ 윈도우에 해당 JDK버전이 적용되었는지 확인을 하고싶다면 윈도우 cdm을 실행시켜서 "java -version"명령어를 통해 확인하면 된다.(앞서 등록한 자바 환경변수 설정이 제대로 되어있지 않다면 git bash에서 "java -version" 명령어의 결과와 윈도우 cmd의 "java -version"의 결과가 다르다)

![](https://blog.kakaocdn.net/dn/UPCCx/btr5epgwqhv/JI08xUC3VcCmzQUriDKjek/img.png)