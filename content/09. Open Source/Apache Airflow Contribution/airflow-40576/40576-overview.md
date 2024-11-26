---
title: 40576-overview
date: 2024-11-23
draft: false
tags:
  - OpenSource
  - Airflow
complete: true
link: https://github.com/apache/airflow/issues/40576
---
# Overview

## Issue

### Description

currently operator fail in case file not found on sftp,can we have one parameter for user to configure it like fail_on_file_not_exist ?

### Use case/motivation

this way, user will able to configure the parameter and operator will not fail in case of sftp file not exist

### Related issues

_No response_


## Mentoring

- SFTPToS3Operator 코드: [https://github1s.com/apache/airflow/blob/main/providers/src/airflow/providers/amazon/aws/transfers/sftp_to_s3.py#L82-L83](https://github1s.com/apache/airflow/blob/main/providers/src/airflow/providers/amazon/aws/transfers/sftp_to_s3.py#L82-L83)
- [https://github1s.com/apache/airflow/blob/main/providers/src/airflow/providers/amazon/aws/transfers/sftp_to_s3.py#L68-L74](https://github1s.com/apache/airflow/blob/main/providers/src/airflow/providers/amazon/aws/transfers/sftp_to_s3.py#L68-L74)


```python
class SFTPToS3Operator(BaseOperator):
    
    def __init__(
        ..
        fail_on_file_not_exist // 추가!
    ) -> None:
      self.fail_on_file_not_exist  = fail_on_file_not_exist 
      
    
    def execute() {
      if (fileNotFound && fail_on_file_not_exist) .. // 
    }
```


fail_on_file_not_exist 플래그 추가후 위처럼 파일이 없을때 이 플래그가 false면 그냥 반환하도록 구현하면 될듯!

file not found 케이스를 어떻게 감지할 수 있을지 코드 확인 필요 (예외를 던지나?)



# Develop
## Fork & Git Clone
```python
git clone git@github.com:Guaqamole/airflow.git
git checkout -b 40576
```


## FileNotFoundCase
```python
# 88 ~ 90
sftp_client = ssh_hook.get_conn().open_sftp() # -> Parmiko SftpClient

# temp file method (use_temp_file=True)
if self.use_temp_file:
    with NamedTemporaryFile("w") as f:
        sftp_client.get(self.sftp_path, f.name) # <- uses stats()
# streaming method (use_temp_file=False)
else:
    with sftp_client.file(self.sftp_path, mode="rb") as data:
        s3_hook.get_conn().upload_fileobj(data, self.s3_bucket, self.s3_key, Callback=self.log.info)

```

- sftp_client → ssh_hook → `from airflow.providers.ssh.hooks.ssh import SSHHook`

SSHHook
```python
def get_conn(self) -> paramiko.SSHClient:  
    """Establish an SSH connection to the remote host."""  
    if self.client:  
        transport = self.client.get_transport()  
        if transport and transport.is_active():  
            # Return the existing connection  
            return self.client  
```

parmiko.sftp_client
```python
class SFTPClient(BaseSFTP, ClosingContextManager):
...

def get(  
    self,  
    remotepath,  
    localpath,  
    callback=None,  
    prefetch=True,  
    max_concurrent_prefetch_requests=None,  
):
with open(localpath, "wb") as fl:  
    size = self.getfo(  
        remotepath,  
        fl,  
        callback,  
        prefetch,  
        max_concurrent_prefetch_requests,  
    )  
s = os.stat(localpath)  
if s.st_size != size:  
    raise IOError(  
        "size mismatch in get!  {} != {}".format(s.st_size, size)  
    )

def stat(self, path):
"""  
Retrieve information about a file on the remote system.  The return  
value is an object whose attributes correspond to the attributes of  
Python's ``stat`` structure as returned by ``os.stat``, except that it  
contains fewer fields.  An SFTP server may return as much or as little  
info as it wants, so the results may vary from server to server.  
  
Unlike a Python `python:stat` object, the result may not be accessed as  
a tuple.  This is mostly due to the author's slack factor.  
  
The fields supported are: ``st_mode``, ``st_size``, ``st_uid``,  
``st_gid``, ``st_atime``, and ``st_mtime``.  
  
:param str path: the filename to stat  
:return:  
    an `.SFTPAttributes` object containing attributes about the given    file"""  
path = self._adjust_cwd(path)  
self._log(DEBUG, "stat({!r})".format(path))  
t, msg = self._request(CMD_STAT, path)  
if t != CMD_ATTRS:  
    raise SFTPError("Expected attributes")  
return SFTPAttributes._from_msg(msg)
```


### Temp file method
```python
if self.use_temp_file:
    with NamedTemporaryFile("w") as f:
        sftp_client.get(self.sftp_path, f.name)
```
- 1. `get()` → 2. `getfo()` → 3. `stat()` → `FileNotFoundError`
### Streaming Method
```python
else:
    with sftp_client.file(self.sftp_path, mode="rb") as data:
        s3_hook.get_conn().upload_fileobj(data, self.s3_bucket, self.s3_key, Callback=self.log.info)
```

1.`file()` → 2. `open()` → 3. `stat()` → `FileNotFoundError`


# Code
## 1st Try
```python 
from __future__ import annotations  
  
from tempfile import NamedTemporaryFile  
from typing import TYPE_CHECKING, Sequence  
from urllib.parse import urlsplit  
  
from airflow.models import BaseOperator  
from airflow.providers.amazon.aws.hooks.s3 import S3Hook  
from airflow.providers.ssh.hooks.ssh import SSHHook  
  
if TYPE_CHECKING:  
    from airflow.utils.context import Context  
  
  
class SFTPToS3Operator(BaseOperator):  
    template_fields: Sequence[str] = ("s3_key", "sftp_path", "s3_bucket")  
  
    def __init__(  
        self,  
        *,  
        s3_bucket: str,  
        s3_key: str,  
        sftp_path: str,  
        sftp_conn_id: str = "ssh_default",  
        s3_conn_id: str = "aws_default",  
        use_temp_file: bool = True,  
        fail_on_file_not_exist: bool = True,  
        **kwargs,  
    ) -> None:  
        super().__init__(**kwargs)  
        self.sftp_conn_id = sftp_conn_id  
        self.sftp_path = sftp_path  
        self.s3_bucket = s3_bucket  
        self.s3_key = s3_key  
        self.s3_conn_id = s3_conn_id  
        self.use_temp_file = use_temp_file  
        self.fail_on_file_not_exist = fail_on_file_not_exist  
  
    @staticmethod  
    def get_s3_key(s3_key: str) -> str:  
        """Parse the correct format for S3 keys regardless of how the S3 url is passed."""  
        parsed_s3_key = urlsplit(s3_key)  
        return parsed_s3_key.path.lstrip("/")  
  
    def execute(self, context: Context) -> None:  
        self.s3_key = self.get_s3_key(self.s3_key)  
        ssh_hook = SSHHook(ssh_conn_id=self.sftp_conn_id)  
        s3_hook = S3Hook(self.s3_conn_id)  
  
        sftp_client = ssh_hook.get_conn().open_sftp()  
  
        try:  
            sftp_client.stat(self.sftp_path)  
        except FileNotFoundError:  
            if self.fail_on_file_not_exist:  
                raise  
            else:  
                self.log.info("File %s not found on SFTP server. Skipping transfer.", self.sftp_path)  
                return  
  
        if self.use_temp_file:  
            with NamedTemporaryFile("w") as f:  
                sftp_client.get(self.sftp_path, f.name)  
  
                s3_hook.load_file(filename=f.name, key=self.s3_key, bucket_name=self.s3_bucket, replace=True)  
        else:  
            with sftp_client.file(self.sftp_path, mode="rb") as data:  
                s3_hook.get_conn().upload_fileobj(data, self.s3_bucket, self.s3_key, Callback=self.log.info)
```

```python
git commit "Add fail_on_file_not_exist option to SFTPToS3Operator"
```

코멘트 주신 부분 업데이트 해놓았습니다~!!

이슈 분석
1. remote sftp 경로에 파일이 존재하지 않을 경우 Operator fail.
2. remote sftp 경로에 파일 존재 여부를 어떻게 확인하는지 파악.
3. parmiko.SFTPClient 클래스 내부의 stat() 메서드 조사

반영 내용
1. fail_on_file_not_exist param 생성 (default True)
2. 변경전과 동일하게 동작해야하기 때문에 True로 설정
3. stat() 메서드로 파일 유무 체크 후 플래그에 따라 return or 예외 발생
4. DocString 업데이트

추가로 해보면 좋은것들
1. 로컬 환경 셋업 후 operator 실제로 테스트
2. CI 돌려보기

https://github.com/Guaqamole/airflow/commit/44dfdb1e36f7333ce67834a03fb844ba23d0443c

```python
airflow tasks test sftp_to_s3_example transfer_file 2023-01-01
```


```python
sftp localhost
```


providers/tests/amazon/aws/transfers/test_s3_to_sftp.py
```python
@mock_aws
@conf_vars({("core", "enable_xcom_pickling"): "True"})
def test_fail_on_file_not_exist_true(self):
    # Arrange
    s3_hook = S3Hook(aws_conn_id=None)
    conn = boto3.client("s3")
    conn.create_bucket(Bucket=self.s3_bucket)

    run_task = S3ToSFTPOperator(
        s3_bucket=self.s3_bucket,
        s3_key=self.s3_key,
        sftp_path=self.sftp_path,
        sftp_conn_id=SFTP_CONN_ID,
        fail_on_file_not_exist=True,
        task_id=TASK_ID,
        dag=self.dag,
    )

    with pytest.raises(FileNotFoundError):
        run_task.execute(None)

@mock_aws
@conf_vars({("core", "enable_xcom_pickling"): "True"})
def test_fail_on_file_not_exist_false(self):

    s3_hook = S3Hook(aws_conn_id=None)
    conn = boto3.client("s3")
    conn.create_bucket(Bucket=self.s3_bucket)

    run_task = S3ToSFTPOperator(
        s3_bucket=self.s3_bucket,
        s3_key=self.s3_key,
        sftp_path=self.sftp_path,
        sftp_conn_id=SFTP_CONN_ID,
        fail_on_file_not_exist=False,  
        task_id=TASK_ID,
        dag=self.dag,
    )

    # No exception should be raised
    result = run_task.execute(None)
    assert result is None

```