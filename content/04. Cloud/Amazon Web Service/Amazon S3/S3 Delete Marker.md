---
title: S3 Delete Marker
topic: S3 Fundamental
date: 2023-11-20
draft: false
tags:
  - AWS
  - S3
  - Storage
complete: true
---

> [!NOTE]
> S3 버킷에 버저닝을 활성화 할 경우 오브젝트 삭제 요청을 날릴시 오브젝트에 삭제 마커가 생성된다.

Amazon S3의 삭제 마커는 단순 `DELETE` 요청에 지정된 버전이 지정된 객체에 대한 자리 표시자(또는 마커)입니다. 

단순 `DELETE` 요청은 버전 ID를 지정하지 않는 요청입니다. 객체가 버전 관리를 사용하는 버킷에 있기 때문에 이 객체는 삭제되지 않습니다. 

Delete Markers are a feature of versioning-enabled S3 buckets. <mark style="background: #C6AB16;">When you delete an object in a versioning-enabled bucket, the object isn’t deleted permanently. Instead, AWS creates a placeholder (or marker) for the object.</mark> This marker is referred to as the Delete Marker. This marker becomes the current version of the object. The Delete Marker makes AWS S3 behave as if the object has been deleted.

The following figure shows that a simple DELETE does not remove the specified object. Instead, Amazon S3 inserts a delete marker.

![AWS S3 Delete Marker](https://www.learnaws.org/assets/img/s3-delete-marker/s3-delete-marker.png "AWS S3 Delete Marker")

## How do Delete Markers work?

If you make a DELETE request for an object in an S3 bucket with versioning enabled, Amazon S3 will not permanently delete the object. Instead, S3 will insert a delete marker in that bucket, and that marker will become the current version of the object with a new ID.

A delete marker has the following properties:

- a key name (or key) and version ID like any other object.
- It does not have data associated with it.
- It is not associated with an access control list (ACL) value.
- It does not retrieve anything from a GET request because it has no data; you get a 404 error.
- The only operation you can use on a delete marker is DELETE, and only the bucket owner can issue such a request.  

If you try to get an object and its current version is a delete marker, Amazon S3 responds with the following:

- A 404 (Object not found) error
- A response header: `x-amz-delete-marker: true`

### Examples

**Deleting an object from a versioning enabled bucket**

```
aws s3api delete-object --bucket abhisheks-test-bucket --key sample.csv
```

Output:

```
{
    "DeleteMarker": true,
    "VersionId": "ydLmU4m94aHrEK8KWRZkmwcDfN7RY2hh"
}
```

**Retrieving object from S3**

```
aws s3api get-object --bucket abhisheks-test-bucket --key sample.csv sample.csv
```

Output:

```
An error occurred (NoSuchKey) when calling the GetObject operation: The specified key does not exist.
```

**Retrieving all object versions from S3**

We can retrieve all versions of a particular object.

```
aws s3api list-object-versions --bucket abhisheks-test-bucket
```

Output:

```
{
    "Versions": [
        {
            "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
            "Size": 0,
            "StorageClass": "STANDARD",
            "Key": "sample.csv",
            "VersionId": "Lk7Eolts1.71QbJPdkD3EuWtuya2RUlJ",
            "IsLatest": false,
            "LastModified": "2022-10-04T22:19:37+00:00",
            "Owner": {
                "DisplayName": "abhishekray07",
                "ID": "873f2dd9943352346a1d0414e31c98eecf45e8997265ca9f639ab07d05dc87c6"
            }
        }
    ],
    "DeleteMarkers": [
        {
            "Owner": {
                "DisplayName": "abhishekray07",
                "ID": "873f2dd9943352346a1d0414e31c98eecf45e8997265ca9f639ab07d05dc87c6"
            },
            "Key": "sample.csv",
            "VersionId": "ydLmU4m94aHrEK8KWRZkmwcDfN7RY2hh",
            "IsLatest": true,
            "LastModified": "2022-10-04T22:20:39+00:00"
        },
    ]
}
```

**Querying an older version of an object**

We can retrieve an earlier (non-current) version of an object by specifying the version ID in the request.

```
aws s3api get-object --bucket abhisheks-test-bucket --key sample.csv --version-id Lk7Eolts1.71QbJPdkD3EuWtuya2RUlJ sample.csv
```

Output:

```

{
    "AcceptRanges": "bytes",
    "LastModified": "2022-10-04T22:19:37+00:00",
    "ContentLength": 0,
    "ETag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
    "VersionId": "Lk7Eolts1.71QbJPdkD3EuWtuya2RUlJ",
    "ContentType": "binary/octet-stream",
    "Metadata": {}
}

```

## Manging delete markers

### Deleting a delete marker

You can delete a delete marker by specifying the version ID in the delete object request. Removing a delete marker makes an older version current.

```
aws s3api delete-object --bucket abhisheks-test-bucket --key sample.csv --version-id ydLmU4m94aHrEK8KWRZkmwcDfN7RY2hh

```

Output:

```
{
    "DeleteMarker": true,
    "VersionId": "ydLmU4m94aHrEK8KWRZkmwcDfN7RY2hh"
}
```

### Configuring lifecycle to clean up expired delete markers automatically

An expired object delete marker is one where all object versions are deleted and only a single delete marker remains. If the lifecycle policy is set to delete current versions, or the `ExpiredObjectDeleteMarker` action is explicitly set, Amazon S3 removes the expired object’s delete marker.