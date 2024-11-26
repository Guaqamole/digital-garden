---
title: Git Commands
date: 2024-11-24
draft: false
tags:
  - DevTools
  - Git
complete: true
---
### git config
```python
git config --local --edit

[user]
        name = Namkyu Kim
        email = hiavokado@gmail.com
```


### git check
```python
ssh -T git@github.com
Hi Guaqamole! You've successfully authenticated, but GitHub does not provide shell access.
```


### gitignore folder 적용안될때
```python
git rm -rf --cached content/20.\ Sidejob
git rm -rf --cached content/Daily\ Notes
git commit & push
```