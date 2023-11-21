---
title: put_object()
date: 2023-11-21
draft: false
tags:
  - AWS
  - S3
  - Boto3
complete: true
---
```python
S3.Client.put_object(**kwargs)
```
Adds an object to a bucket. You must have WRITE permissions on a bucket to add an object to it.

## Examples



## Request Syntax
```python
response = client.put_object(
	Bucket='string',
	Key='string',
	Body=b'bytes|file,
	...
	...
)
```
- **Body** (_bytes_ _or_ _seekable file-like object_) 
	- Object data.
	    
- **Bucket** (_string_) 
    **[REQUIRED]**
    
    The bucket name to which the PUT action was initiated.
    
    When using this action with an access point, you must direct requests to the access point hostname. The access point hostname takes the form _AccessPointName_-_AccountId_.s3-accesspoint.*Region*.amazonaws.com. When using this action with an access point through the Amazon Web Services SDKs, you provide the access point ARN in place of the bucket name. For more information about access point ARNs, see [Using access points](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-access-points.html) in the _Amazon S3 User Guide_.
    
    When you use this action with Amazon S3 on Outposts, you must direct requests to the S3 on Outposts hostname. The S3 on Outposts hostname takes the form `AccessPointName-AccountId.outpostID.s3-outposts.Region.amazonaws.com`. When you use this action with S3 on Outposts through the Amazon Web Services SDKs, you provide the Outposts access point ARN in place of the bucket name. For more information about S3 on Outposts ARNs, see [What is S3 on Outposts?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/S3onOutposts.html) in the _Amazon S3 User Guide_.
- - **Key** (_string_) 
    
    **[REQUIRED]**
    
    Object key for which the PUT action was initiated.