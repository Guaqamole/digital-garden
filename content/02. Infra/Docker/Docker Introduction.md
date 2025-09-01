---
title: Docker Introduction
date: 2025-02-04
draft: false
tags:
  - Docker
complete: true
---
> [!note] Docker
> 데이터 또는 운영체재 통째로 프로그램의 환경을 격리시키는 기능을 제공하는 소프트웨어.
> 도커를 이용하면 물리적 환경의 차이, 서버 구성의 차이를 무시하고 서비스를 운영 할 수 있게된다.

![](https://i.imgur.com/94eZ8mI.png)

> [!check] 도커 vs 가상화
> 가상화: CPU, Memory 등 물리적인 장비를 소프트웨어로 구현 (Hypervisor)
> 도커: 컨테이너에서 리눅스가 동작하는것 처럼 보이지만 실제 리눅스가 동작하는것은 아니며, 운영체제의 기능중 일부를 호스트 서버에게 맡겨 부담을 던 형태이다. → 커널을 포함시키지 않아도 되어 가볍다.
# 도커 기본 명령어
## Image
### delete all images
```bash
docker rmi -f $(docker images -aq)
```
## Network
### port binding
```python
docker run -i -t -p 3306:3306 -p 192.168.51.241:7777:80 ubuntu:14.04
```
#### test with apache
```python
apt-get update
apt-get install apache2 -y
service apache2 start # 192.168.51.241:7777 진입
```

## Sample Apps
### Wordpress
```python
docker run -d \
--name wordpressdb \
-e MYSQL_ROOT_PASSWORD=password \
-e MYSQL_DATABASE=wordpress \
mysql:5.7
# --platform linux/amd64 -> macos

docker run -d \
--name wordpress \
-e WORDPRESS_DB_HOST=mysql \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_PASSWORD=password \
--link wordpressdb:mysql \
-p 80 \
wordpress
```