---
title: Mac Cron
date: 2024-09-22
draft: false
tags: 
complete: true
---
```python
crontab -e
```

```python
0 9 * * * /Users/avokey/sync-blog.sh >> /Users/avokey/sync-blog.log 2>&1
```

