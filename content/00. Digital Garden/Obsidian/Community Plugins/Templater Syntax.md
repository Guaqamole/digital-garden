---
title: Templater Syntax
date: 2023-10-06
draft: false
tags:
  - Templater
  - CommunityPlugins
---
*Parent* : [[00. Digital Garden]]

### **Templater 플러그인 (커뮤니티 플러그인)**

Templater 플러그인은 커뮤니티 플러그인으로 Obsidian에서 기본적으로 제공하는 템플릿 기능에 훨씬 더 많은 문법을 지원하여 풍성한 템플릿을 만들 수 있도록 도와줍니다. 또한 자바스크립트를 활용하여 무궁무진한 기능을 추가할 수 있습니다. 이것은 너무 심화되기 때문에 다음에 다시 한번 다뤄보도록 하겠습니다.

`{{title}}` 이 아닌 `<% tp.date.now() %>` 와 같이 사용합니다. **Placeholder** 인 `<% %>` 안에 있는 내용을 **Command** 라고 합니다. 그리고 이 **Command** 안에 있는 변수와 함수들을 이용해서 원하는 값을 가져오게 합니다. Templater 내장된 함수와 사용자가 정의한 함수 모두 사용할 수 있습니다. 이번에는 내장된 함수를 이용해서 템플릿을 만들어보도록 하겠습니다. 사용자 정의한 함수는 자바스크립트에 대한 이해가 필요합니다. 😢

### **1. 플러그인 설치 및 활성화**

커뮤니티 플러그인을 설치하고 활성하 하는 것은 아래 포스팅 참조해주세요

- [Obsidian 옵시디언 플러그인 기능 소개 (2) - Second Brain, 나만의 지식베이스 만들기](https://olait.tistory.com/11)

Templater 플러그인을 설치하고 활성화해줍니다. 

![](https://blog.kakaocdn.net/dn/b7lHrz/btrkJ5OiJ7L/kQaNw5g9g87iOdIczCncG0/img.png)

Templater 플러그인 활성화

### **2. 플러그인 설정**

1. 먼저 템플릿 노트들이 저장될 폴더를 만들어주세요. 위에서 만든 폴더를 사용한다면 새롭게 안 만드셔도 됩니다.
2. `Ctrl/CMD + ,` 을 눌러 설정창을 열고 Templater 메뉴에서 템플릿 저장 폴더를 적용시켜주세요.  
    __(주의 - 먼저 Templater 플러그인을 활성화해야 메뉴가 생깁니다.)__
    
    ![](https://blog.kakaocdn.net/dn/bzLEZr/btrkG3jYqb5/IeEcfgYerI7nnFt2UAykG0/img.png)
    
    Template folder location에 폴더를 넣어주세요.
    

### **적용 방법**

기존의 방식과 똑같습니다. 문법만 달라졌을 뿐입니다.

1. 먼저 템플릿 문법이 작성된 템플릿 노트를 만들고 템플릿 저장 폴더에 넣어주세요.
2. 새로운 노트를 만들고 템플릿 노트를 불러옵니다.
3. 템플릿 문법이 각 문법에 맞게 변환되서 새로운 노트에 기입된 것을 확인합니다.

### **따라해보기**

1. templater 문법이 적용된 템플릿 노트를 만들고 Templates 폴더에 저장합니다.

![](https://blog.kakaocdn.net/dn/b9OqjW/btrkJlKCXg6/2ZABKB9FJrM3l80TSZ7Z71/img.png)

test-templater

```
# <% tp.file.title %>
created : <% tp.date.now() %>
```

2. 새로운 노트를 만들고 제목을 입력니다.

![](https://blog.kakaocdn.net/dn/YuPZz/btrkLlb7MI4/6owmFeVNCFekUJRafBCfpK/img.png)

3. 명령어 팔레트(`Ctrl/CMD + p`)를 누르고 Templater라고 검색하고 `Open Insert Templater modeal` 을 누르거나 `Alt/Opt + e`(Templater 단축키)를 눌러 템플릿 선택 창을 엽니다. 그리고 test-templater를 선택합니다. 

![](https://blog.kakaocdn.net/dn/rpJ9J/btrkK60wf0r/IuHeiBqmOSlzjdMFsD0Qbk/img.png)![](https://blog.kakaocdn.net/dn/cdyDlI/btrkOkKWz9f/Mb9QPwOkixroZyntcqd6V1/img.png)

### **사용하고 있는 템플릿 소개**

![](https://blog.kakaocdn.net/dn/AkP8b/btrkIPFdOGT/tKiuYqPO7D5g5Evkgme590/img.png)![](https://blog.kakaocdn.net/dn/brQqlQ/btrkHoByR6m/TKKyE3ZoP5KRkExKjVgBvK/img.png)

템플릿 노트 목록 / 템플릿 폴더 구조

1. 노트 서식에 관련된 템플릿
2. 노트 종류에 따른 템플릿

저는 크게 2가지 종류의 템플릿을 사용하고 있습니다. 하나는 노트 템플릿이고 또 다른 하나는 서식 템플릿입니다. 지금까지 새로운 노트를 만들고 템플릿을 적용하는 방식이 바로 노트템플릿입니다. 위의 오른쪽 그림과 같이 일간노트, 주간 노트, 책, 유튜브 정리 등등 자주 쓰는 노트들을 템플릿화 시켰습니다.

그 외에 **formatting**이라는 폴더 밑에 여러가지 서식템플릿을 만들었습니다. 서식 템플릿이란 스니펫, 자주 사용하는 단어나 문장들을 바로 불러올 수 있는 역할을 합니다. 템플릿노트에 있는 내용을 커서가 있는 해당 줄에 삽입하는 것이라고 생각하시면 이해하기 쉽습니다. 예를 들어 `#####`을 쓰는 것이 너무 귀찮아 저는 미리 하나 노트를 만들고 `#####` 만 쓰여있는 노트를 만들고 5라고 저장해놓으면 아래 그림과 같이 `Alt/Opt + e` 로 단축키를 누르고 5를 입력해서 바로 `#####`을 쓰게 합니다. 그 외에도 🗺 지도 아이콘을 많이 사용해서 미리 map 아이콘이 쓰여있는 노트를 만들어 두었습니다. 필요에 따라서 만들고 빠르게 쓸 수 있어서 자주 사용하고 있습니다.

### **자주 사용하는 Templater 내장 문법 모음**

내장 문법을 이용해서 사용할 때는 날짜와 파일 이름에 대해서 많이 사용을 합니다. 특히 일간 노트를 사용할 때 가장 많이 사용합니다. 제가 자바스크립트를 조금 더 잘했다면 원하는 함수를 만들어서 할 수 있을텐데 프로그래밍까지는 조금 어렵네요 😂  외국의 초고수분들의 사용법을 익혀서 나중에 포스팅해보도록 하겠습니다. 

- 날짜 관련

```
Date now: <% tp.date.now() %>
Last week: <% tp.date.now("dddd Do MMMM YYYY", -7) %>
Today: <% tp.date.now("dddd Do MMMM YYYY, ddd") %>
Next week: <% tp.date.now("dddd Do MMMM YYYY", 7) %>

File's title date + 1 day (tomorrow):
<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>

File's title date - 1 day (yesterday):
<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>
```

- 파일 관련

```
File title: <% tp.file.title %>
File creation date: <% tp.file.creation_date() %>
```


# Free Templates
https://beingpax.gumroad.com/l/obsidian-task-management