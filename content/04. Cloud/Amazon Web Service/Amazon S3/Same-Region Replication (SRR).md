---
title: Same-Region Replication (SRR)
topic: S3 Replication
date: 2023-11-20
draft: false
tags: 
complete: true
---
# Use Cases

![](https://miro.medium.com/v2/resize:fit:700/1*nPMrVEAsS5KSRFCigrTYyw.png)

# Same-Region Replication (SRR)

- Automatically replicates data between buckets within the same AWS Region.
- Replication can be setup at a bucket level, a shared prefix level, or an object level using S3 object tags.
- SRR can be use to make a second copy of data in the same AWS Region.
- Helps to address data sovereignty and compliance requirements by keeping a copy of your data in a separate AWS account in the same region as the original.
- Allows to change account ownership for the replicated objects to protect data from accidental deletion.
- Allows to aggregate logs from different S3 buckets for in-region processing, or to configure live replication between test and development environment.

> **_Observations_**

- <mark style="background: #C6AB16;">Both source and target buckets must be version enabled.</mark>
- <mark style="background: #C6AB16;">Object deletions are not replicated to target bucket</mark> (so it’s not like rsync — delete).

![](https://miro.medium.com/v2/resize:fit:700/1*K_0bEpgBz_45toV2JCRHLg.png)