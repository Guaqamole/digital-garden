---
title: Python 전용 ETL 서버 구축하기
date: 2023-11-06
draft: false
tags:
  - Python
  - ETL
complete: false
---

# V.1

![](https://i.imgur.com/hGq7QO7.png)

가격 - t3.large 1대 기준 
- 하루: $1.99
- 한달: $60
- 일년: $716

### 장점
- 간단한 구축
- 간단한 운영

### 단점
- 병렬로 수행 불가
- 속도가 느릴수있음

|인스턴스 이름|온디맨드 시간당 요금|vCPU|메모리|스토리지|네트워크 성능|
|---|---|---|---|---|---|
|t4g.nano|USD 0.0042|2|0.5GiB|EBS 전용|최대 5기가비트|
|t4g.micro|USD 0.0084|2|1GiB|EBS 전용|최대 5기가비트|
|t4g.small|USD 0.0168|2|2GiB|EBS 전용|최대 5기가비트|
|t4g.medium|USD 0.0336|2|4GiB|EBS 전용|최대 5기가비트|
|t4g.large|USD 0.0672|2|8GiB|EBS 전용|최대 5기가비트|
|t4g.xlarge|USD 0.1344|4|16GiB|EBS 전용|최대 5기가비트|
|t4g.2xlarge|USD 0.2688|8|32GiB|EBS 전용|최대 5기가비트|
|t3.nano|USD 0.0052|2|0.5GiB|EBS 전용|최대 5기가비트|
|t3.micro|USD 0.0104|2|1GiB|EBS 전용|최대 5기가비트|
|t3.small|USD 0.0208|2|2GiB|EBS 전용|최대 5기가비트|
|t3.medium|USD 0.0416|2|4GiB|EBS 전용|최대 5기가비트|
|t3.large|USD 0.0832|2|8GiB|EBS 전용|최대 5기가비트|
|t3.xlarge|USD 0.1664|4|16GiB|EBS 전용|최대 5기가비트|
|t3.2xlarge|USD 0.3328|8|32GiB|EBS 전용|최대 5기가비트|
|t3a.nano|USD 0.0047|2|0.5GiB|EBS 전용|최대 5기가비트|
|t3a.micro|USD 0.0094|2|1GiB|EBS 전용|최대 5기가비트|
|t3a.small|USD 0.0188|2|2GiB|EBS 전용|최대 5기가비트|
|t3a.medium|USD 0.0376|2|4GiB|EBS 전용|최대 5기가비트|
|t3a.large|USD 0.0752|2|8GiB|EBS 전용|최대 5기가비트|


---

# V.2

![](https://i.imgur.com/4N0z3Rv.png)

가격 - t3.medium 3대 기준 
- 하루: $1 x 3 = $3
- 한달: $30 x 3 = $90
- 일년: $360 x 3 = $1080 

가격 - t3.small 3대 기준 
- 하루: $0.5 x 3 = $1.5
- 한달: $15 x 3 = $45
- 일년: $180 x 3 = $540

### 장점
- 병렬 수행으로 인한 성능 증가
- 적절한 로드 밸런싱으로 인한 유연한 개발

### 단점
- 개발 난이도 증가
- 운영 난이도 증가
- 관리할 포인트 증가

---

# V.3
![](https://i.imgur.com/ojNtb3A.png)

가격 
- 하루: $8
- 한달: $240
- 일년: $2880

### 장점
- 편리한 개발
- Managed System으로 인한 쉬운 Scale-out

### 단점
- 비싼 운영비
