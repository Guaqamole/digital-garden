---
title: Git Commands
date: 2024-11-24
draft: false
tags:
  - DevTools
  - Git
complete: true
---
## Basic
### git config
```python
git config --local --edit

[user]
        name = Namkyu Kim
        email = hiavokado@gmail.com

git clone git@github.com:Guaqamole/cote.git
git config --global user.email "hiavokado@gmail.com"
git config --global user.name "Guaqamole"
```
- git config setup을 했는데도 자꾸 username: … 물어본다면
- `git remote set-url origin git@github.com:USERNAME/REPO.git`
- 해서 HTTPS 대신 SSH 사용하도록.

### git check
```python
ssh -T git@github.com
Hi Guaqamole! You've successfully authenticated, but GitHub does not provide shell access.
```


### gitignore folder 적용안될때/안먹힐때
```python
git rm -rf --cached content/20.\ Sidejob
git rm -rf --cached content/Daily\ Notes
git commit & push
```


### git branch
#### create branch
```python
git checkout -b test
```

#### delete local branch
```python
git branch -d test
```

#### delete remote branch
```python
git push origin --delete test
```


### git remote
- intelliJ 프로젝트를 생성 후 git repo를 생성했을때
```python
git remote add origin git@github.com:john/web-stream.git
```

## Commit
### git log
```python
git log
```

#### git show (commit id)
```python
git show
```

### git diff
#### 로컬 변경 사항 보기
```python
git diff
```

#### 스테이징된 변경사항 보기
```python
git diff --cached
```

### 특정 파일제거
### 1. 파일제거
```python
rm content/실전에서바로쓰는nextjs.zip
```

### 2. staging 제거
```python
git rm --cached content/실전에서바로쓰는nextjs.zip

# 이미 지워지면 이렇게뜸
fatal: pathspec 'content/실전에서바로쓰는nextjs.zip' did not match any files
```

### 3. commit amend
```python
git commit --amend --allow-empty
```


## Roll Back
### git reset
- 바로 이전 commit으로 되돌리고 최근 깃로그는 삭제
```python
git reset --hard HEAD~1 # HEAD commit hash도 가능
git push -f # 일반 push로는 안됨
```


## Application
https://minny27.tistory.com/50
```python
git checkout -b develop

git add Model/Student.java
git commit
[#2]Docs: Student 모델 생성

git add ViewModel/StudentTableViewModel.java
git commit
[#3]Docs: StudentTableViewModel 생성

git add Cell/StudentTableViewCell.java
git commit
[#4]Docs: StudentTableViewCell 생성

git push --set-upstream origin develop
```