---
title: Version Tag 달기
date: 2024-08-29
draft: false
tags:
  - Git
complete: true
---
### tagging
```python
git tag -a v2.2.0 -m "tag v2.2.0" e7e4405
```

### push tag
#### single tag
```python
git push origin tag <tag_name>
git push origin tag v2.2.0
```

#### all tags
```python
# not recommended
git push --tags
```
