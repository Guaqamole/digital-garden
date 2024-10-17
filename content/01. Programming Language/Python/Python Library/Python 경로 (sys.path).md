---
title: Python 경로 (sys.path)
date: 2024-08-08
draft: false
tags: 
complete: true
---
### sys.path
```python
from MappingModels import SoyWordSimModel
ModuleNotFoundError: No module named 'MappingModels'

import os
import sys

os.getcwd()
sys.path.append('/home/jovyan/da-kubeflow-notebook/mgeon')
```