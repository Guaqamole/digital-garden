---
title: BigQuery Rollback Table
date: 2023-11-23
draft: false
tags:
  - GCP
  - BigQuery
complete: true
---
### bq comamnd

```sh
gcloud config set project-id

bq show --format=prettyjson --job=True rod:asia-northeast3.job_ByKGjGbBk3as5eziEQYhzLL03whJ | grep startTime

1700704956347

bq cp dataset.source_table@1700704956347 dataset.target
```