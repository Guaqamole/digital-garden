---
title: First Website v1
date: 2025-08-18
draft: false
tags:
  - Frontend
  - React
complete: true
---
## UseFul resources
https://htmlcolorcodes.com/color-picker/
### icons
- https://mui.com/material-ui/getting-started/
- http://kobat.co.kr/

### images
- https://unsplash.com/ko
- https://www.pexels.com/ko-kr/
- https://pixabay.com/ko/
- https://www.shopify.com/stock-photos

### reference
- http://tecc.co.kr/main/main.html

### logos
- http://worldvectorlogo.com/
- https://www.brandsoftheworld.com/
- https://seeklogo.com/

## Project Init
-  `npx create-react-app .`

## WebSite Flow
1. Pages
2. Home
3. NavBar
	1. NavBar.css



---
# 개발과정
- https://vercel.com/guaqamoles-projects/~/domains
## mail 안들어가지는 문제

메일나라 라는 서비스에서 도메인을 구입했고, 메일 서비스를 이용하고있어. 도메인명은 kyevp.com이야. 메일서비스는 mail.kyevp.com으로 이용중이고. 나는 vercel을 이용해서 webapp을 kyevp.com으로 배포했고 그 이후로 모든 도메인 세팅은 메일나라가 아닌 vercel에서 이용중이야. 그러다보니 mail.kyevp.com이 안들어가져. 여기 레코드 정보를 줄테니까 내가 제대로 세팅했는지 봐줘

###### ChatGPT의 말:
올려주신 두 장의 캡처를 보니까 설정이 조금 꼬여 있어요. 정리해드릴게요:

---

### 현재 상태

1. **메일나라에서 보여주는 설정**
    
    - 도메인: kyevp.com
        
    - MX 레코드: `223.130.109.63` (IP 직접 지정됨)
        
2. **Vercel DNS에 설정한 내용**
    
    - A 레코드: `kyevp.com → 223.130.109.63`
        
    - MX 레코드: `subdomain MX mail.kyevp.com. (priority 10)`
        

---

### 문제점

- `mail.kyevp.com` 이 **A 레코드로 등록되어 있지 않음** → 그래서 `mail.kyevp.com` 자체로 접속이 안 됨.
    
- 메일나라에서 보여주는 MX 레코드는 **IP 주소를 직접 바라보고 있어서** Vercel DNS와 불일치 발생.
    
- 정상적인 메일 세팅을 하려면, **MX는 도메인 이름을 바라보고, 그 도메인이 다시 A 레코드로 IP를 바라보는 방식**이어야 함.
    

---

### 해결 방법

Vercel의 DNS 관리에서 다음과 같이 추가/수정하면 돼요:

1. **A 레코드 추가**
    
    `Name: mail Type: A Value: 223.130.109.63 TTL: 3600 (혹은 60 유지)`
    
2. **MX 레코드 수정**
    
    `Name: @   (즉, kyevp.com 전체 메일 도메인용) Type: MX Value: mail.kyevp.com. Priority: 10 TTL: 3600 (혹은 60 유지)`
    

---

### 최종 구조

- `mail.kyevp.com → A → 223.130.109.63`
    
- `kyevp.com → MX → mail.kyevp.com.`
    

이렇게 되어야 메일서버로 들어올 수 있습니다.

---

👉 지금처럼 **MX에 IP 직접 쓰는 건 잘못된 설정**이에요.  
👉 `mail.kyevp.com` 에 A 레코드를 추가해주면 해결됩니다.