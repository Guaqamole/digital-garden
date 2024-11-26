---
title: Hbase Shell Command
date: 2024-11-22
draft: false
tags:
  - Hbase
  - DataEngineering
complete: true
---
## Hbase Shell Start
```python
/bin/hbase shell
```


## All Tables
```python
hbase> list
```


## Get Rows
```python
hbase> scan 'TABLE', { COLUMNS => 'col:value', LIMIT => 2 }
```