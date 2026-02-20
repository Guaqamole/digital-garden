---
title: Jupyter Notebook 테마 설정
date: 2023-11-16
draft: false
tags:
  - Jupyter
  - HowTo
complete: true
---
# 설치 

```
pip install jupyterthemes
```

---

# 배경 설정

jupyterthemes를 설치했다면 `jt` 명령어를 통해 배경 테마 및 폰트를 바꿀 수 있다.

## 설정 가능한 배경 목록

여기서는 배경 테마를 변경하고자 하므로 설정가능한 배경을 알아보자. 아래와 같이 'jt -l' 을 입력하면 된다.

```
jt -l Available Themes:   
	chesterish   
	grade3   
	gruvboxd   
	gruvboxl   
	monokai   
	oceans16   
	onedork   
	solarizedd   
	solarizedl
```



## 배경 테마 변경 : jt -t

앞에서 살펴본 목록 중에서 맘에 드는 것을 골랐다면 아래와 같이 jt -t [테마명]을 실행한 후 주피터 노트북을 새로 고침 하면 배경 테마가 설정된다.

```
jt -t chesterish
```

참고로 기본 테마로 변경하고 싶다면 'jt'만 실행하면 된다.

```
jt
```

아래 그림들은 배경 테마별 주피터 노트북 환경을 나타낸 것이다. 이를 참고하여 원하는 배경을 선택하면 된다.

![](https://blog.kakaocdn.net/dn/msOse/btrMInILyj6/G7WMVBWpKihSQ0dMet4Kc0/img.png)![](https://blog.kakaocdn.net/dn/baqCWO/btrMIxRQyZw/iPCAKlDH8niEk3lDo3OlmK/img.png)

chesterish(왼쪽), grade3(오른쪽)

![](https://blog.kakaocdn.net/dn/c1LMeL/btrMJZzPILY/QeBHUTGFiVXzObwojkclx1/img.png)![](https://blog.kakaocdn.net/dn/Sxjex/btrMKWbBOIl/kUbOcnQtxuq17IzAbeCxzK/img.png)

gruvboxd(왼쪽), gruvboxl(오른쪽)

![](https://blog.kakaocdn.net/dn/cIb3Rw/btrMIYaoReZ/x4uOeXd9xIoMfwJscZONGk/img.png)![](https://blog.kakaocdn.net/dn/oPv6j/btrMJkqJLA1/pIWabkMuKhPnZhxqKXU8K1/img.png)

monokai(왼쪽), oceans16(오른쪽)

![](https://blog.kakaocdn.net/dn/RoZcY/btrMJQpre69/9hk3xDfmZSKKLrPTJ1YAeK/img.png)![](https://blog.kakaocdn.net/dn/cvNP7r/btrMI2RpIsl/nGQ6MpmnMKKkF5Wk9uKJF0/img.png)

onedork(왼쪽), solarizedd(오른쪽)

![](https://blog.kakaocdn.net/dn/cojmCD/btrMI4IpebY/XZ0GtXL10oKYT4NZV274nk/img.png)![](https://blog.kakaocdn.net/dn/bkpVvx/btrMJlQKZEl/OwyKHpaAzREJu3hKKIh9k0/img.png)

solarizedl(왼쪽), 기본테마(오른쪽)

---

# 폰트 및 셀 폭 설정

주피터 노트북은 각 부분별로 폰트와 폰트사이즈를 변경할 수 있다. 또한 -cellw를 통해 코드 편집 셀 폭(cell width)을 변경할 수 있다.

`-f, -fs` : 코드 폰트와 폰트 사이즈

`-ofs` : 아웃풋 폰트 사이즈

`-nf, -nfs `: 마크다운 폰트와 폰트 사이즈

`-cellw` : 셀 폭 변경

아래 코드는 필자가 사용하고 있는 설정 사항이다.

```
jt -t onedork -f inputmono -fs 13 -ofs 12 -nf ptsans -cellw 85%
```

아래 그림은 배경 테마를 onedork 만 설정한 경우와 위 코드로 설정한 경우의 차이를 나타낸 것이다.

![](https://blog.kakaocdn.net/dn/muSr5/btrMKnm0xro/oKstrcAkIebFk1De8UNB5k/img.png)

배경 테마만 onedork로 설정

![](https://blog.kakaocdn.net/dn/bXjCwG/btrMIwrVTJq/94Yt8SM0xiTYfA0HK2Jqdk/img.png)

`jt -t onedork -f inputmono -fs 13 -ofs 12 -nf ptsans -cellw 85%`