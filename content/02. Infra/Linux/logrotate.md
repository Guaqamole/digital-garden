---
title: logrotate
date: 2025-03-10
draft: false
tags: 
complete: true
---
## Overview
Logrotate의 기능은 기본적으로 log가 많이 쌓이게 되는걸 방지하기 위해 주기적으로 log를 삭제 및 정리하는 기능을 갖고있습니다.

![|455](https://i.imgur.com/SUQUBRX.png)

## File Structure
주로 logrotate.d 폴더안에 설정파일을 추가해 대상 로그파일을 관리한다. logrotate.conf는 logrotate 자체를 설정할때 씀

| Name         | Directory                 |
| :----------- | :------------------------ |
| Daemon       | /usr/sbin/logrotate       |
| Conf         | /etc/logrotate.conf       |
| Process conf | /etc/logrotate./d/        |
| Logs         | /etc/cron.daily/logrotate |

### logrotate.conf
```python
# see "man logrotate" for details
# 매주 로그파일을 로테이트
weekly
# 4개의 로그파일 이상이면 가장 오래된 로그파일을 삭제합니다.
rotate 4
# 로그파일을 정리하고 오래된 로그파일을 생성할지 여부
create
# 로테이트후 로그파일 뒤에 날짜를 추가합니다
dateext
# 로그파일을 로테이트한후 압축파일로 생성
#compress
# 디렉토리를 지정하여 logrotate파일을 사용가능합니다
include /etc/logrotate.d
# no packages own wtmp and btmp -- we'll rotate them here
/var/log/wtmp {
    monthly
    create 0664 root utmp
        minsize 1M
    rotate 1
}
 
/var/log/btmp {
    missingok
    monthly
    create 0600 root utmp
    rotate 1
}
```

### logrotate.d/testlogs
```python
/var/log/netdata/*.log {    # 로테이트 경로
        daily                # 로테이트 주기
        missingok            # 로그파일이 없어도 에러처리 안함
        rotate 14            # 로그파일의 개수가 14개 이상이면 가장 오래된 로그파일을 삭제합니다.
        compress            # 로테이트 파일 압축
        notifempty            # 로그가 빈경우 로테이트 진행 하지않음
        sharedscripts        # 로그파일이 여러개여도 스크립트를 한번만 진행 
        postrotate            # 로테이트를 진행후 스크립트 실행
                /bin/kill -HUP `cat /var/run/netdata/netdata.pid 2>/dev/null` 2>/dev/null || true
        endscript            # postrotate 종료 선언
}
```

### logrotate.d/zookeeper
```python
/user/apache-zookeeper-3.5.8-bin/logs/zookeeper-server.out {
 copytruncate
 daily
 rotate 30
 compress
 missingok
 notifempty
 delaycompress
}
```


## How to Run
### debug
로테이트 파일이 문제 없는지 확인
```python
logrotate -d /etc/logrotate.d/testlogs
```

### run
```python
logrotate -f /etc/logrotate.d/testlogs
```

### check running (verbose)
```python
logrotate -v /etc/logrotate.d/testlog
```