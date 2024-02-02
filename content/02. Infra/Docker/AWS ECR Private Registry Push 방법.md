---
title: AWS ECR Private Registry Push 방법
date: 2024-02-02
draft: true
tags:
  - Docker
  - ECR
complete: true
---
Here is a full answer, after I followed all steps - I was able to use ECR

The error can have a few meanings:
1. You are not authorized because you do not have ECR policy attached to your user
2. You are not authorized because you are using 2FA and using cli is not secure unless you set a temporary session token
3. You provided invalid credentials

Here is **a list of all steps to get access** (including handling 2FA)

1. First of all, you have to **create** a policy that gives you access to GetAuthorizationToken action in ECR.
2. Attach this policy either to a user or a group (groups/roles are IMHO always better approach, my vote to roles, e.g. DevOps)
3. Make sure you have AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY set in your environment. I recommend to use aws folder with credentials and profiles separated.

**If you have 2FA enabled**
4. You need to generate session token using this command `aws sts get-session-token --serial-number arn-of-the-mfa-device --token-code code-from-token`. `arn-of-the-mfa-device` can be found in your profile, 2FA section. Token, is generated token from the device.
5. Update aws credentails with received `AccessKeyId`, `SecretAccessKey`, and `SessionToken`. AWS recommends having either cron job to refresh token, which means if you are doing it you are testing things, your prod resources most likely do not have 2FA enabled. You can increase session by providing `--duration-seconds` but only up to 36 hours. A good explanation can be found at [authenticate-mfa-cli](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/)


### Session Token
```
aws sts get-session-token --serial-number arn:aws:iam::000000:mfa/namkyu@gmail.com --duration-seconds 3600 --token-code 228378
```

```
aws configure --profile mfa

액세스키 = ****
시크릿 = ****
aws_session_token = asdasfgdsgsdfgdf//////////dglkdfsjgirjg;sldkfjksjgl;sfdgijrfgs;iodjcvg;klxvbvxbxvbxvcbE6
```
