---
title: Python Pathlib
date: 2024-03-26
draft: false
tags:
  - Python
  - StandardLibrary
complete: true
---
## Script directory
```python
import pathlib
pathlib.Path(__file__).parent.resolve()
```

## Current working directory
```python
import pathlib
pathlib.Path().resolve()
```