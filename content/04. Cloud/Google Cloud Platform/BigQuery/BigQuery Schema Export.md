---
title: BigQuery Schema Export
date: 2023-11-22
draft: false
tags:
  - GCP
  - BigQuery
  - HowTo
complete: true
---
```sh
gcloud config set project

bq show --schema --format=prettyjson dataset.table > schema.json
```
