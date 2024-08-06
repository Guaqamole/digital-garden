---
title: MySQL Lock Debugging
date: 2024-08-05
draft: false
tags:
  - Database
complete: true
---
## Overview
### show engine innodb status;


## Other Methods
```python
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;  
SELECT * FROM information_schema.INNODB_LOCK_WAITS;  
SELECT * from performance_schema.metadata_locks;  
SELECT * from INFORMATION_SCHEMA.INNODB_TRX;  
show engine innodb status;
show open tables IN gred where In_use > 0;
show full processlist;
show tables from performance_schema like '%lock%';  
show tables from INFORMATION_SCHEMA like '%LOCK%';
```