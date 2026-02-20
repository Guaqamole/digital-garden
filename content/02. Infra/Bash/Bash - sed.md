---
title: Bash - sed
date: 2024-07-18
draft: false
tags:
  - Bash
complete: true
---
### find all yamls recursively and replace text
```python
find . -type f -name '*.yaml' -exec sed -i '' 's/image: 123456789/image: abcdef/g' {} +
```