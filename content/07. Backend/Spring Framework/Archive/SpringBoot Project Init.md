---
title: SpringBoot Project Init
date: 2023-11-25
draft: false
tags:
  - Springboot
  - HowTo
complete: true
---
# Spring Initializr
### 1. metadata & dependency info
![‘Explore’ 버튼을 클릭하면 의존성 파일들 목록을 볼 수 있다.](https://i.imgur.com/xzgKkcD.png)

### 2. [[sdkman으로 Springboot cli 설치하기]]
- 자동화시 유용

---
# IntelliJ Maven Type 1
### 1. Maven Archetype 지정
다음으로 Maven Archetype( 원형 )의 기본값을 지정해 준다.

![](https://blog.kakaocdn.net/dn/bYHMmh/btrSIqL2Q0v/wiOanM4leBoOUpscAddyhK/img.png)

Archetype을 보면 Add 버튼이 존재한다. 만약 자신이 찾는 원형이 없으면 여기서 ADD 해주면 된다.

클릭하면 Add Archetype이라는 팝업창이 나타나는데

|   |   |
|---|---|
|GroupId|org.apache.maven.archetypes|
|ArtifactId|maven-archetype-quickstart|
|Version|1.1|
|Catalog|Apache Maven 설치경로 지정 ( 해당 포스팅 : apache-maven-3.8.1 )|

위와 같이 입력하면 그림과 같이 Catalog, Archetype, Verison이 자동으로 값이 지정되는 것을 확인 할 수 있다.


### 2. Advanced Settings 
마지막으로 생성할 프로젝트의 GroupId (package 경로로 사용) 와 메이븐 ArtifactId와 Version을 작성해준다.

![](https://blog.kakaocdn.net/dn/clKx1Y/btrVBodQJ7X/5sXetLm2BXbDmtJebSk2v0/img.jpg)

|   |   |
|---|---|
|GroupId|( 예시 ) org.spring.example|
|ArtifactId|( 예시 ) spring_example|
|Version|( 예시 ) 0.0.1-SNAPSHOT|

Create 버튼을 클릭하면 IntelliJ에서 Maven 신규 프로젝트가 생성이 진행된다.

![](https://blog.kakaocdn.net/dn/bpLnPW/btrSwsjJiFK/Z61ajZQ7hoFHYYp2AioWp0/img.jpg)

BULID SUCCESS 문구가 확인이되면 정상적으로 설치가 된것을 알 수 있다.

### 3. Project에 Spring Framework 추가하기
새로운 프로젝트가 정상적으로 생성이 완료되면 먼저 해당 프로젝트에 Spring 구조를 잡아준다. IntelliJ의 Project에서 생성한 Project Name을 선택하고 마우스 우클릭하여 오픈된 메뉴에서

`Add Framework Support`를 선택한다.

![](https://i.imgur.com/dCiuOsM.png)


> [!Help] Spring Framework이 보이지 않는다!
> 이럴경우 따로 등록해줄 수 있는데
> 프로젝트 상단 우클릭에서 `Open Module Settings` -> `Libraries`에 들어간다.
> 그리고 `+`버튼을 누른다. + `spring-webmvc` 검색
> ![](https://i.imgur.com/CamjVgP.png)



Add Framework Support 창이 오픈되면 우측 메뉴에서  Spring → Spring MVC를 선택한다.

![](https://blog.kakaocdn.net/dn/cUT9R7/btrSz60AQVz/TzU5cINfiwjHiuJkUasaY1/img.jpg)

OK 버튼을 클릭하면 프로젝트에 Spring MVC-버전.RELEASE의 설치가 진행되고

아래와 같이 Spring 설정에 필요한 web 디렉토리가 생성되며 기본적인 값이 추가되는 것을 알 수 있다.

![](https://blog.kakaocdn.net/dn/bMt9UG/btrSy7k4YY0/SGMnaasKMp2N8zPdGDkoI0/img.jpg)

WEB-INF 디렉토리에 아래와 같은 파일이 추가되었다.

|   |   |
|---|---|
|applicationContext.xml|ApplicationContext 생성 시 필요한 설정정보를 담은 파일|
|dispatcher-server.xml|HTTP 프로토콜로 들어오는 모든 요청을 가장 먼저 받아   <br>적합한 컨트롤러에 위임해주는 프론트 컨트롤러(Front Controller)|
|web.xml|모든 Web application은 반드시 하나의 web.xml파일을 가져야한다.  <br>web.xml에서 서블릿 맵핑 되는 방법 ,인증이 필요한 URL 등의 정보를 확인한다.  <br>WebApplication의 Deployment Descriptor(배포 설명자) 로써 XML형식의 파일이다.  <br>web.xml파일의 설정들은 Web Application 시작시 메모리에 로딩된다.|

추가적으로 IntelliJ 상단 File → Project Stucture을 선택해보면

![](https://blog.kakaocdn.net/dn/4UDsv/btrSwEdnxKJ/28gVjeNSveihHRTfovjcfK/img.jpg)

Project Stucture 팝업창의 Project Settings → Modules를 선택하면

![](https://blog.kakaocdn.net/dn/bvaALV/btrSUavjENT/bnypC0C7gFkgmVNcfNbtKK/img.jpg)

생성한 프로젝트에 Srpign, Web 관련 설정이 추가된 것을 확인 할 수있다.

Project Settings → Artifacts을 확인해 보면 「프로젝트명 : war exploded」 파일이 생성된 것을 확인할 수 있다.

![](https://blog.kakaocdn.net/dn/cfF6nD/btrSQUtRhPJ/hWOuL5ip7Stlr64cj9nRc1/img.jpg)

> war exploded : 아카이브를 압축해제한 디렉토리 형태 구조

Available Elements를 를 살펴보면 위에서 우리가 추가한

Spring-버전.RELEASE.jar, Spring MVC-버전.RELEASE.jar 라이브러리가 추가되어 있는것을 알 수 있다.

![](https://blog.kakaocdn.net/dn/VxnRu/btrSMIGMzKy/bkExPc5X8Kiwx0LCjflC80/img.jpg)

Spring-버전.RELEASE.jar, Spring MVC-버전.RELEASE.jar 선택하고

마우스 더블클릭하여 WEB-INF → lib 디렉토리로 이동시켜주고

OK 버튼을 눌러 저장하고 팝업창을 닫는다.


### 4. Tomcat Web Application 실행하기
IntelliJ 상단 메뉴에서 Run → Edit Configuration을 선택한다.

![](https://blog.kakaocdn.net/dn/GDlzP/btrSSLDk40s/Ut5kouLP5PUwno5mNkp841/img.jpg)

Ren / Debug Configurations 팝업창이 뜨면 「+」 버튼을 클릭하고

![](https://blog.kakaocdn.net/dn/qDRr8/btrSSLi19WC/9RCPWJKK0zjdOvYYqck7g0/img.jpg)

Tomcat Sever → Local을 선택해준다.

Tomcat Server 설정을 시작한다.


> [!NOTE]
> #### Java vs Springboot Project
> Java에서는 비어있는 기본 메서드 `public static void main()` 가 기본적으로 들어있지만, Spring 프로젝트는 애플리케이션 실행 시 
> - 스프링 부트 애플리케이션 환경을 확인하고 
> - 애플리케이션을 설정한 다음, 
> - 초기 컨텍스트<sup>intial context</sup> 를 생성하고 
> - 스프링부트 애플리케이션을 실행한다.
> 
> ![](https://i.imgur.com/wxLK1hW.png)
> 
> 애플리케이션을 실행하려면 위 그림처럼 최상위 어노테이션 <sup>top-level annotation</sup> 과 한줄의 코드로 수행한다.
> 
> > [!question] 왜 이렇게 하나?
> > 애플리케이션을 실행할 때 거치는 지루한 애플리케이션 설정 작업을 덜어주므로 의미는 코드를 작성할 수 있게 설계되었기 때문.
> 
> 