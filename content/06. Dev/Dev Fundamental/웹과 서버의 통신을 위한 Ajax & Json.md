---
title: 웹과 서버의 통신을 위한 Ajax & Json
date: 2024-02-24
draft: false
tags:
  - http
  - ajax
  - Json
  - Concept
complete: true
---
브라우저 위에서 동작하고있는 웹 사이트는 웹 어플리케이션과 같은 클라이언트들이 어떻게 서버와 통신할 수 있는지를 정리한 것이 바로 http이며, hyper-text를 서로 주고받을 수 있음을 규약한 프로토콜이다.

http는 클라이언트가 서버에게 데이터를 리퀘스트 (요청) 할 수가 있고
서버는 클라이언트가 요청한 곳에 따라 그에 맞는 리스폰스 (응답)을 다시 클라이언트에게 보내주는 방식으로 진행된다.

http를 이용해서 서버에게 데이터를 요청해서 받아올 수 있는 방법으로는 여러가지가 존재하지만, 그중 가장 대중적으로 이용된 기술이 바로 Ajax (Asynchronous Javascript and XML)이다.

데이터를 받아올때 사용되는 객체는 대표적으로 XHR (XML Http Request) 라는 오브젝트가있다. 이 객체는 브라우저 API에서 제공하는 객체중에 하나로 간단하게 서버에게 데이터를 요청하고 받아올 수 있게 도와준다.

또 하나 더 눈여겨 볼 것은 Ajax 그리고 XHR에서 계속 반복해서 XML이 등장하고
있는데, 이 xml 은 바로 html 과 같은 Mark-up 언어 중의 하나이다. Mark-up 언에중에 하나인 HTML 와 같이, XML 또한 데이터를 표현할 수 있는 한 가지 방법이다.

그럼 왜 하필 이름이 XML인가? 예전에 MS 개발팀이 Outlook을 개발하던 당시 서버와 클라이언트간에 데이터를 주고받을 때 XML을 사용했고 http request 또한 아직깢에 xml을 그냥 박아버려서 지금까지 이 이름을 쓰게 된것이다. 데이터를 주고 받을때 브라우저와 서버간에 사용되는 fetch() api 가 존재하지만 xhr 또한 아직까지 사용되고 있다는 것을 잊지말자.

# JSON의 시작
json은 1999년도 ECMAScript 세 번째 버전에서 영감을 받아 만들어진 데이터 포맷이다. JSON의 가장 큰 특징은 단순히 웹 브라우저와 서버간 통신뿐만 아니라 모바일과 서버간에 통신도 이루어지게 해준다. 혹은 별도로 데이터를 전송하지 않고 FileSystem에 데이터를 저장할수 있게도 해주기 때문에 XML 보다 훨씬 범용성도 좋고, 성능도 뛰어나다.

## 특징
- Simplest data interchange format
- Lightweight text-based strcuture
- Easy to read
- Key - Value pairs
- Used for Serialization and transmission of data between the network and the connection
- independent programming language and platform

## 예시
![](https://i.imgur.com/TVFBfrI.png)

웹 어플리케이션에 토끼라는 오브젝트가 있다면 이 토끼 오브젝트를 서버에 전송할 때는 토끼 오브젝트를 키와 벨류의 스트링 타입으로 변환해서 서버에 전송하게 되고,

서버 에서 다시 토끼를 받아 올 때도 이렇게 키와 밸류를 string 타입으로 토끼를 전송받아 와서 다시 토끼라는 오브젝트로 변환해서 브라우저의 표기하게된다.

## 직렬화와 역직렬화
### 직렬화
외부의 시스템에서도 사용할 수 있도록 바이트 형태로 데이터를 변환하는 기술 `JSON.stringfy()`
### 역직렬화
바이트 형태의 데이터를 객체로 변환하는 기술 `JSON.parse()`

## JSON은 사실 문자열

JSON 또한 객체와 배열이 있다면 일반 JavaScript 객체 리터럴이나 배열처럼 프로그램에서 사용할 수 없는지 의문이 들 수도 있습니다.

하지 못하는 이유는 JSON은 사실 문자열에 불과하기 때문입니다.

예를 들어 `jane-profile.json` 또는 `profiles.json`과 같은 별도의 파일에 JSON을 작성하면 해당 파일은 JavaScript처럼 보이지만 사실 JSON 객체 또는 JSON 배열 형식의 문자열이 담깁니다.

이때 API에 요청하면 다음과 같은 내용이 반환됩니다.

```json
{"name":"Jane Doe","favorite-game":"Stardew Valley","subscriber":false}
```

텍스트 파일과 마찬가지로 프로젝트에서 JSON을 사용하려면 해당 파일을 구문분석하거나 프로그래밍 언어가 이해할 수 있는 형식으로 변경해야 합니다. 예를 들어, Python에서 JSON 객체를 구문분석하면 딕셔너리(dictionary)가 생성됩니다.

# Ajax란
AJAX란, Asynchronous Javascript And Xml (비동기식 자바스크립트와 xml) 의 약자로 다음과 같은 기술들을 사용하여, 웹페이지의 전체 페이지를 새로 고치지 않고, 페이지의 일부분만을 서버에서 가지고 와서 ‘웹페이지 화면을 동적으로 변경하는 방식’을 의미합니다.
- HTML DOM
- Javascript
- 브라우저 내장 객체 XMLHttpRequest 또는 Fetch 함수

Ajax는 User Experience 및 디자인 회사 ‘Adaptive Path’의 설립자인 Jesse James Garrett가 유저가 웹페이지와 자유롭게 상호작용하는 기술을 설명하기 위해 ‘Ajax’라는 용어를 쓰면서 처음 사용되었습니다.

Ajax가 소개된 당시에는 백엔드 서버에서 데이터를 가져올 때 주로 XML 방식으로 가져왔기 때문에 이름에 Ajax 이름에 XML이 포함되어 사용되었습니다. 하지만, 현재는 대부분의 경우 데이터 송수신에 JSON 포맷이라는 더 효율적인 전송 포맷을 이용하여 데이터를 송수신하고 있습니다. 

용어와 현재 사용되는 기술 간에 괴리가 있지만, Ajax라는 용어는 최초에 사용된 약어를 그대로 사용하여 고유명사의 의미로 Ajax로 계속 불리고 있습니다. Ajax는 ‘자바스크립트를 이용해 백엔드 서버의 데이터만 가져와서 웹페이지의 일부분을 동적으로 바꾸는 기술’을 의미합니다.

Ajax 용어에 포함된 또 다른 단어인 "Asynchronous"는 비동기 방식의 웹 애플리케이션 서비스를 의미합니다. 여기서 ‘비동기적(Asynchronous)’이라는 뜻을 알아보겠습니다.

![](https://i.imgur.com/9EFpqB9.png)

‘비동기적 방식’은 동기적 방식과는 반대로 서버의 응답이 올 때까지 대기하지 않고, 서버의 데이터가 준비되는 동안에도 사용자가 웹페이지에서 다른 작업을 수행할 수 있는 방식을 의미합니다.

‘동기적 방식’은 요청을 하고 응답이 올 때까지 다른 일을 하지 못하고 응답이 완료되어야 다른 처리를 진행할 수 있습니다. 예를 들면 회원가입을 하기 위해 회원가입 정보를 웹페이지의 Form의 Input 항목에 입력 후 전송(가입) 버튼을 클릭하면 서버로 제어권이 넘어가서 서버에서 회원가입이 완료되고 새로운 웹페이지가 생성되어 브라우저에 웹페이지가 표시되어야 그다음 작업을 진행할 수 있습니다. 

하지만 브라우저에 웹페이지가 표시되기까지 시간이 오래 걸릴 경우 고객 이탈이 발생할 수 있는데, 비동기적 방식을 택할경우, 화면전환으로 인한 지연 없이 움직임을 일으킬 수 있어 웹페이지 내 움직이는 효과가 필요한 경우 비동기 방식을 사용합니다.

## Ajax 특징
Ajax는 웹 애플리케이션을 보다 동적이고 반응적으로 만들기 위한 강력한 도구로 활용되는데요. Ajax의 주요 특징들을 살펴보겠습니다.

### 비동기 통신 
Ajax는 비동기적인 통신을 지원합니다. 즉, 웹 페이지와 서버 간의 데이터 교환을 페이지 전체를 다시 로드하지 않고도 수행할 수 있습니다.

###  DOM 조작 
서버에서 수신한 데이터를 Javascript를 사용하여 웹페이지의 DOM (Document Object Model)을 동적으로 조작해서 실시간으로 업데이트되는 웹페이지를 구현할 수 있습니다.

### 부분 업데이트
전체 페이지를 다시 로드하지 않고도 필요한 부분만 업데이트할 수 있습니다. 이는 사용자 경험을 개선하고 서버 부하를 줄여줍니다. 이를 통해 실시간으로 웹페이지를 업데이트할 수 있고 동적 웹 애플리케이션을 개발할 수 있습니다.

## Ajax를 사용하는 다양한 방법
서버에 Ajax 요청을 보내는 방법으로는 브라우저 자체 내장되어 있는 XMLHttpRequest, fetch를 사용하거나, 외부 라이브러리인 [jQuery](https://www.elancer.co.kr/blog/view?seq=176), axios 등을 사용할 수 있습니다.

### 1) XMLHttpRequest
![](https://i.imgur.com/FcrTN1G.png)

1999년 Microsoft의 Internet Explorer에 처음 도입된 기술로 과거 Ajax를 사용해야 한다면 주로 이 방식으로 사용했습니다. 대부분의 웹브라우저가 지원하고 있으며, XMLHttpRequest는 2006년에 공식적인 웹 표준이 되었습니다. XMLHttpRequest는 아래 예시와 같이 사용할 수 있습니다.

### 2) Fetch
![](https://i.imgur.com/0HEV85l.png)


모던 비동기 Promise 방식의 Ajax 요청 API로 2015년에 처음 지원되기 시작하였고, 대부분의 브라우저에서 지원하고 있습니다. 브라우저 자체적으로 지원되므로 다른 라이브러리를 사용할 필요 없이 사용이 가능합니다. Axios를 사용하여 Ajax 호출은 다음과 같이 사용할 수 있습니다.

### 3) JQuery
![](https://i.imgur.com/NFjBS2y.png)

[JQuery](https://www.elancer.co.kr/blog/view?seq=176)는 SPA 방식의 프론트엔드 프레임워크인 React나 Vue가 사용되기 전에 다양한 브라우저의 차이를 극복할 수 있게 하여 많이 사용되었습니다. 현재는 프론트엔드에 [JQuery](https://www.elancer.co.kr/blog/view?seq=176)를 사용하지 않고 있어서 다음에 소개할 Axios라는 외부 라이브러리가 주로 사용됩니다. jQuery 라이브러리를 이용하여, Ajax를 사용하는 경우는 다음과 같이 사용할 수 있습니다.

### 4) Axios
Axios는 Node.js와 브라우저를 위한 Promise API를 활용하는 ‘HTTP 통신 라이브러리’입니다. Fetch는 웹브라우저에서 지원하는 API이므로 Node.js에서는 axios를 사용하여 Ajax를 사용할 수 있습니다. 또한, fetch에는 없는 서버 요청 시 timeout 설정이 가능하며, 구형 브라우저를 포함한 다양한 브라우저 호환성이 뛰어납니다. Axios를 사용하여 Ajax 호출은 다음과 같이 사용할 수 있습니다.

## Ajax 사용 사례
동적인 기능 즉 움직이는 기능을 갖춘 웹페이지를 서비스하기 위해선 Ajax가 ‘필수’입니다. Ajax를 활용하면 다음 페이지로 넘어가지 않고도 원하는 모습을 바로 확인할 수 있기 때문인데요. 이해하기 쉽게 Ajax를 활용한 사례 2가지를 소개해 드리겠습니다.

### Ajax 활용 사례 1 - 구글 Earth
![](https://i.imgur.com/ynAsCWV.png)

해외를 가지 않고도 집에서 유명 건물의 모습을 확인할 수 있는 방법을 아시나요? 바로 ‘[구글 어스(Google Earth)](https://www.google.co.kr/intl/ko/earth/)’를 사용하는 것입니다. 구글 어스는 위성 이미지와 함께 전 세계 도시의 빌딩 건물들을 3D로 확인할 수 있는 서비스를 갖춘 웹 페이지인데요. 

이 구글 어스가 바로 Ajax의 기술이 적용된 웹 페이지 입니다. Ajax를 적용한 덕분에 명령어를 입력해도 새로운 페이지로 넘어가지 않고, 보고 있는 페이지에서 바로 확인이 가능 한 것이지요.

### Ajax 활용사례 2 - 네이버 자동 검색어
Ajax가 활용된 사례 두 번째는 바로 ‘[네이버](https://www.naver.com/)’입니다. 우리나라 사람들이 검색할 때, 가장 많이 사용하는 검색포털사이트 네이버. 네이버도 Ajax를 활용하여 동적인 기능을 갖췄는데요. 바로 ‘자동 연관 검색어’입니다.

[네이버](https://www.naver.com/) 검색창에 검색어를 입력하면 자동으로 연관 검색어가 뜨는 것을 볼 수 있습니다. 이 또한 Ajax가 활용된 것입니다. 전체 HTML 태그와 CSS 스타일이 포함된 웹페이지가 아닌, 필요한 데이터만 JSON이나 XML 형태로 받아오기 때문에, 페이지를 이탈하지 않고도 빠르게 동적으로 웹페이지 갱신이 가능하며, 사용자 경험이 향상됩니다.