---
title: Cross-Region Replication (CRR)
topic: S3 Replication
date: 2023-11-20
draft: false
tags: 
complete: true
---
# Cross-Region Replication (CRR)

- Automatically replicates data between buckets across different AWS Regions.
- Provides ability to replicate data at a bucket level, a shared prefix level, or an object level using S3 object tags.
- CRR provide lower-latency data access in different geographic regions.
- CRR can help with compliance requirement to store copies of data hundreds of miles apart.
- Allows to change account ownership for the replicated objects to protect data from accidental deletion.

![](https://miro.medium.com/v2/resize:fit:700/1*1aVC0DFXBKBeHCsLdaeKEA.png)

# Security

- Objects are remained encrypted throughout the replication process.
- The encrypted objects are transmitted securely via SSL within the same region (if using SRR) or from the source region to the destination region (if using CRR).