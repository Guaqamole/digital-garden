---
title: Dataframe Download Link 생성
date: 2025-09-11
draft: false
tags:
  - Pandas
  - Jupyter
complete: true
banner: /_assets/_img/_banners/nebula.jpg
---
```python
import base64
from IPython.display import HTML

def make_download_link(df, filename):
    csv = df.to_csv(index=False)
    b64 = base64.b64encode(csv.encode()).decode()
    return HTML(f'<a download="{filename}" href="data:text/csv;base64,{b64}" target="_blank">Download {filename}</a>')

# Train link
make_download_link(train, "train.csv")
# Test link
make_download_link(test, "test.csv")
```

