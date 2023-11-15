---
title: Bash Symbolic Link
date: 2023-11-14
draft: false
tags:
  - Bash
  - Linux
  - HowTo
complete: true
---
## 명령어

```sh
ln -s 원본 링크파일
```

→ 원본은 파일, 디렉토리 모두 가능

## 실습

/test.txt 파일을 만들고 그에 대한 심볼릭 링크 파일 /tmp/s_link.txt를 만들어보자.

```sh
[root@CentOS ~] echo hello > /test.txt
[root@CentOS ~] cat /test.txt
hello
[root@CentOS ~] ll /test.txt
-rw-r--r-- 1 root root 6 Jun 19 21:44 /test.txt
```

- 심볼릭 링크 설정 및 확인

```sh
[root@CentOS ~] ln -s /test.txt /tmp/s_link.txt
[root@CentOS ~] ll /tmp/s_link.txt 
lrwxrwxrwx 1 root root 9 Jun 19 21:45 /tmp/s_link.txt -> /test.txt
[root@CentOS ~] cat /tmp/s_link.txt 
hello
```

## 하드 링크와 차이

```bash
[root@CentOS ~] ln /test.txt /tmp/h_link.txt
[root@CentOS ~] ls -i /test.txt
98116 /test.txt
[root@CentOS ~] ls -i /tmp/h_link.txt
98116 /tmp/h_link.txt
[root@CentOS ~] ls -i /tmp/s_link.txt 
1962252 /tmp/s_link.txt
```

→ 하드 링크 파일의 inode number는 원본과 같다.

→ 디스크 상에서 근본적으로 같은 파일이라 할 수 있다.[[

→ 반면 심볼릭 링크는 디스크 상에서 다른 파일이며 그야말로 바로가기 파일일뿐이다.

## 원본 삭제 실습
```sh
[root@CentOS ~]# rm -f /test.txt
[root@CentOS ~]# ll /tmp/s_link.txt
lrwxrwxrwx 1 root root 9 Jun 19 22:11 /tmp/s_link.txt -> /test.txt
[root@CentOS ~]# cat /tmp/s_link.txt
cat: /tmp/s_link.txt: No such file or director
```

→ /tmp/s_link.txt 은 존재하지만 원본인 /test.txt 파일이 없어서 내용은 볼 수 없다.