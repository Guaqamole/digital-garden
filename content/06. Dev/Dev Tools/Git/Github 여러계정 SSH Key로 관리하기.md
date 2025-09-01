---
title: Github 여러계정 SSH Key로 관리하기
date: 2025-08-22
draft: false
tags:
  - Git
complete: true
---
## SSH 키 만들기

이미 만들어 놓은 SSH 키가 있다면 그걸 사용하고, 없으면 계정마다 키를 만들어줘야 한다.

```
ssh-keygen -t rsa -C "account1@email1.com" -f "id_rsa_account1"
ssh-keygen -t rsa -C "account2@email2.com" -f "id_rsa_account2"
...
```

해당 명령어를 실행하면 ~/.ssh 경로에 확장자가 없는 비밀키와 .pub 확장자를 가진 공개키가 생성된다.

## GitHub 계정에 SSH 키 등록하기

계정마다 등록할 공개키(.pub으로 되어있는 파일)의 내용을 복사한 뒤 다음에 따라 GitHub 사이트에서 키를 등록한다.

1. **Settings**로 이동한다.
2. **SSH and GPG keys** 를 선택한다.
3. **New SSH key**를 선택하고 원하는 이름을 입력한 뒤 복사한 공개키를 붙여넣는다.
4. **Add key**를 눌러 등록을 완료한다.

## SSH config 수정하기

계정마다 다른 SSH 키를 사용해야 하기 때문에 SSH config 파일을 수정한다. 위치는 ~/.ssh/config 이며 없을 경우 새로 만들어준다. 그 다음 계정마다 다음의 내용을 추가한다.

```
# account1  
Host github.com-account1
   HostName github.com  
   User git  
   IdentityFile ~/.ssh/id_rsa_account1
   
# account2
Host github.com-account2
   HostName github.com  
   User git  
   IdentityFile ~/.ssh/id_rsa_account2
```

## Git Clone 하기
```python
git clone git@github.com-account2:username/repo.git
```

## Git Config 확인하기
```python
git config --list
```
## Git local config 수정하기
깃 리파지토리마다 계정을 다르게 사용하기 위해서 로컬 설정을 한다.
```
git config --local user.name "account1"
git config --local user.email "account1@email1.com"
```

## remote url 수정하기
remote url을 수정해서 ssh key를 사용하도록 한다.
```
git remote set-url origin git@github.com-account1:repo_user/repo_name.git
```

여기까지 완료한 뒤 push 를 해보면 SSH config에 설정해놓은 호스트에 따라 SSH 키가 사용되고 정상적으로 push가 되는 것을 확인할 수 있다. 만약 SSH config에 설정된 키로 접속하지 않거나 push를 실패한다면 아래 내용을 참고하자.

## Git Config 확인
```python
git config --local --list
git config --local user.name
cat .git/config
```

## Optional) ssh-agent에 SSH 키 등록하기
ssh-agent는 SSH 키를 관리하는 도구이다. 한번 키를 등록해 놓으면 SSH를 실행할 때 따로 키를 주입하지 않아도 ssh-agent에 등록되어있는 키를 사용한다.

문제는 처음 만든 여러 개의 키 중에 일부만 등록되는 경우이다. 등록되지 않은 키를 사용하는 호스트로 접근하고자 하면 등록된 키를 잘못 사용하고 접속이 되지 않는다. (실제로 2번 계정으로 푸시하려고 하는데 자꾸 1번 계정은 접속할 수 없다는 에러가 났다.)

이 때는 모든 키를 삭제하면 되는데 명령어는 다음과 같다.

```
# key 확인
ssh-add -l
# key 전체 삭제
ssh-add -D
```

아마도 ssh-agent에 키가 등록되어있지 않으면, 그 이후에 SSH config를 보고 key를 찾아서 사용하는 것으로 판단된다.

다른 방법으로는 모든 키를 미리 등록하는 방법이 있다. 이 방법은 키에 비밀번호가 걸려있는 경우 한번 등록하면 키를 다시 입력하지 않아도 되는 장점이 있다.

```
ssh-add ~/.ssh/id_rsa_account1
```

## 참고
- [How to manage multiple GitHub accounts on a single machine with SSH keys](https://medium.freecodecamp.org/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)
## 번외
- 