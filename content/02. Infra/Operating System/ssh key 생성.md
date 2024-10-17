---
title: ssh key 생성
date: 2024-10-17
draft: false
tags:
  - Linux
complete: true
---
### ssh-keygen 이란?

SSH를 통한 서버 접속 시 다양한 인증 방법으로 접속이 가능한데, 제일 편리하고 간단하게 사용하는 방법은 패스워드를 통한 접속을 하는 것입니다. 하지만 보안에 취약하고 주기적 변경해야 하는 단점이 있습니다. 

폐쇄망을 사용하지 않는 경우는 더더욱 취약하게 됩니다. 

ssh-keygen은 SSH 접속을 위한 인증 키를 생성, 관리 및 변환합니다.  Key 생성 시 Public key와 Private Key가 생성되는데 이는 한 쌍으로 동작합니다. Private key와 Public key를 가지고 있는 클라이언트에서 Public key를 접속할 서버로 전달하고 서버는 이를 암호화 한 뒤 클라이언트에게 전송하면, 클러이언트는 Private key로 복호화하여 인증합니다.  

쉽게 말해서 두 개의 key 중 하나는 누구나 가질 수 있는 key고 나머지 하나는 클라이언트만 가질 수 있는 key입니다. 이를 가지고 같은 랜덤 한 문자열을  암호화 복호화하여 인증하는 방식으로 생각하면 됩니다. 

아래 그림으로 간단하게 설명이 가능합니다.

![](https://i.imgur.com/CZFPYMb.png)

### ssh-keygen 생성
```python
ssh-keygen
```

**id_rsa**
RSA 방식으로 생성된 private key

**id_rsa.pub**
RSA 방식으로 생성된 public key

**authorized_keys**
클라이언트 public key 키의 값을 저장합니다.


### ssh key 복사
to localhost
```python
ssh-copy-id root@localhost
```

to server
```python
ssh-copy-id user@172.12.346.123
```
