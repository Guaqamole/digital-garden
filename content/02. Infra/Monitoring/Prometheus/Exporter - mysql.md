---
title: Exporter - mysql
date: 2024-03-07
draft: false
tags:
  - NodeExporter
  - Prometheus
  - MySQL
complete: true
---
## 1. PreRequisite
```sh
mysql -u root -p
```
### Query
```sql
CREATE DATABASE 'exporter';
COMMIT;

CREATE USER 'exporter'@'localhost' IDENTIFIED BY 'exporter'; 

GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'localhost'; 

flush privileges;
```