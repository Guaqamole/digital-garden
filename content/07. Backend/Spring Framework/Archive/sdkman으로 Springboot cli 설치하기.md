---
title: sdkman으로 Springboot cli 설치하기
date: 2023-11-25
draft: false
tags:
  - Springboot
complete: true
---
## Install
```sh
$ sdk install springboot

Downloading: springboot 3.2.0
In progress...

######################################################################## 100.0%

Installing: springboot 3.2.0
Done installing!

Setting springboot 3.2.0 as default.
```

## Init (maven)
`-a demo`: artifact id. 애플리케이션의 이름을 설정
`-l java`: language. 언어를 지정
`--build maven`: 프로젝트를 빌드하는 도구를 설정
```sh
spring init -a demo -l java --build maven demo
Using service at https://start.spring.io

Project extracted to 'C:\Users\**\Desktop\demo'

unzip demo.zip -d demo
```

