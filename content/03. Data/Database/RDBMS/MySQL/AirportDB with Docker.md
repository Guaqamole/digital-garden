---
title: AirportDB with Docker
date: 2025-10-02
draft: false
tags:
  - MySQL
complete: true
banner: /_assets/_img/_banners/nebula.jpg
link: https://dev.mysql.com/doc/airportdb/en/airportdb-installation-oci.html
---
## Prerequiste
### airportdb
```python
curl -L https://downloads.mysql.com/docs/airport-db.tar.gz -o airport-db.tar.gz
```

### mysqlsh
```python
apt-get update
apt-get install -y wget lsb-release gnupg
wget https://dev.mysql.com/get/mysql-apt-config_0.8.24-1_all.deb
dpkg -i mysql-apt-config_0.8.24-1_all.deb
apt-get update
apt-get install -y mysql-shell
```


### init tables
```python
docker exec -i airportdb-mysql mysql -uroot -pairportdb_root_2024 <<'MYSQL_EOF'
DROP DATABASE IF EXISTS airportdb;
CREATE DATABASE airportdb;
SHOW DATABASES;
MYSQL_EOF
```

### mysql-localinfile
```python
docker exec -i airportdb-mysql mysql -uroot -pairportdb_root_2024 -e "SHOW VARIABLES LIKE 'local_infile';" 2>&1 | grep -v "Warning"

Variable_name    Value
local_infile.    ON
```

## Docker
- docker-compose up -d
- 최대 리소스사용
```yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: airportdb-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: airportdb_root_2024
      MYSQL_DATABASE: airportdb
      MYSQL_USER: airportdb_user
      MYSQL_PASSWORD: airportdb_pass_2024
      TZ: Asia/Seoul
    ports:
      - "3306:3306"
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
      - --max_allowed_packet=2G
      - --innodb_buffer_pool_size=8G
      - --innodb_log_file_size=2G
      - --innodb_log_buffer_size=512M
      - --innodb_flush_log_at_trx_commit=0
      - --innodb_doublewrite=0
      - --innodb_flush_method=O_DIRECT_NO_FSYNC
      - --innodb_io_capacity=2000
      - --innodb_io_capacity_max=4000
      - --innodb_write_io_threads=16
      - --innodb_read_io_threads=16
      - --max_connections=1000
      - --thread_cache_size=200
      - --table_open_cache=8000
      - --sort_buffer_size=32M
      - --read_buffer_size=16M
      - --read_rnd_buffer_size=32M
      - --join_buffer_size=32M
      - --tmp_table_size=1G
      - --max_heap_table_size=1G
      - --local_infile=1
      - --performance_schema=OFF
      - --innodb_stats_on_metadata=OFF
    volumes:
      - mysql_data:/var/lib/mysql
      - ./airport-db:/airport-db
    mem_limit: 16g
    cpus: 10
    networks:
      - airportdb-network

volumes:
  mysql_data:
    driver: local

networks:
  airportdb-network:
    driver: bridge
```


## Load
### OPTION1. manual
```python
ocker exec -it airportdb-mysql bash

# MySQL Shell 설치
apt-get update
apt-get install -y wget lsb-release gnupg
wget https://dev.mysql.com/get/mysql-apt-config_0.8.24-1_all.deb
dpkg -i mysql-apt-config_0.8.24-1_all.deb
apt-get update
apt-get install -y mysql-shell

# MySQL Shell로 데이터 로드
mysqlsh root@localhost:3306 --password=airportdb_root_2024 --js

# MySQL Shell 프롬프트에서:
util.loadDump("/airport-db", {
    threads: 16,
    deferTableIndexes: "all",
    ignoreVersion: true
});
```


### OPTION2. script
`nohup bash run-load.sh > load-output.log 2>&1 & echo "로드 시작!"`
```sh
#!/bin/bash

# airportdb 로드 실행 스크립트

LOG_FILE="/Users/john/playground/sql/myqsl-airportdb/load-progress.log"

echo "==================================="
echo "airportdb 로드 시작"
echo "==================================="
echo "로그 파일: $LOG_FILE"
echo ""
echo "진행 상황 확인: tail -f $LOG_FILE"
echo "컨테이너 로그: docker logs -f airportdb-mysql"
echo ""

# 로그 파일 초기화
cat > "$LOG_FILE" <<EOF
airportdb 로드 시작 시간: $(date)
==================================================
최대 성능 설정:
  - 메모리: 16GB (mem_limit)
  - CPU: 10 코어
  - InnoDB 버퍼: 8GB
  - 로드 스레드: 32
  - deferTableIndexes: all (인덱스는 나중에 생성)
  - ignoreVersion: true
==================================================

EOF

# MySQL Shell 명령 실행 (최대 성능 설정)
docker exec -i airportdb-mysql mysqlsh root@localhost:3306 \
  --password=airportdb_root_2024 \
  --js \
  -e "util.loadDump('/airport-db', {threads: 32, deferTableIndexes: 'all', ignoreVersion: true, showProgress: true, resetProgress: true})" \
  >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "" >> "$LOG_FILE"
    echo "==================================="  >> "$LOG_FILE"
    echo "✓ airportdb 로드 완료!" >> "$LOG_FILE"
    echo "완료 시간: $(date)" >> "$LOG_FILE"
    echo "===================================" >> "$LOG_FILE"
    
    echo ""
    echo "✓ airportdb 로드 완료!"
    echo "완료 시간: $(date)"
else
    echo "" >> "$LOG_FILE"
    echo "==================================="  >> "$LOG_FILE"
    echo "❌ 로드 실패 (Exit Code: $EXIT_CODE)" >> "$LOG_FILE"
    echo "실패 시간: $(date)" >> "$LOG_FILE"
    echo "===================================" >> "$LOG_FILE"
    
    echo ""
    echo "❌ 로드 실패 (Exit Code: $EXIT_CODE)"
    echo "로그 파일을 확인하세요: $LOG_FILE"
    exit $EXIT_CODE
fi
```