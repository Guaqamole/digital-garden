---
title: AWS S3 Versioning
topic: S3 Replication
date: 2023-11-20
draft: false
tags:
  - AWS
  - S3
  - "#Storage"
  - "#Replication"
complete: true
---

Amazon S3에는 두가지 Replication 방법이 존재한다.

비동기 복제 (asynchronous replication)를 활성화 하려면 <mark style="background: #C6AB16;">S3 Versioning 활성화</mark>해야한다.
IAM Permission 또한 필요.

## [[Cross-Region Replication (CRR)]] 
언제 사용?
- compliance
- lower latency
- replication across accounts


## [[Same-Region Replication (SRR) ]]
언제 사용?
- log aggregation,
- <mark style="background: #C6AB16;">live replication</mark> between production and test accounts


# Pricing for S3 Replication

- For CRR and SRR, Amazon S3 charges for storage in the selected destination S3 storage class, in addition to the storage charges for the primary copy, and replication PUT requests.
- For CRR, you will be charge for inter-region Data Transfer OUT from Amazon S3 to your destination region.
- Pricing for the replicated copy of storage is based on the destination AWS Region, while pricing for requests and inter-region data transfers are based on the source AWS Region.