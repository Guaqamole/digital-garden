---
title: 파이썬 구글 이미지 URL 받기
date: 2024-07-01
draft: false
tags:
  - Python
complete: true
---
```python
pip install icrawler
```

```python
from icrawler.builtin import GoogleImageCrawler

def get_image_urls(keyword, num_images):
    google_crawler = GoogleImageCrawler()
    google_crawler.crawl(keyword=keyword, max_num=num_images)
    return google_crawler.parser.out_queue._cache

if __name__ == "__main__":
    import os
    keyword = "생선"
    num_images = 2
    image_urls = get_image_urls(keyword, num_images)
    for url_obj in image_urls:
        url = eval(url_obj)['file_url']
        print(url)
```