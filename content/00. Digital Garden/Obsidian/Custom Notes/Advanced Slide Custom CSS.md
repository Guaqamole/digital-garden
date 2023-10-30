---
title: Advanced Slide Custom CSS
date: 2023-10-29
draft: false
tags: 
complete: true
---
```bash
vi .obsidian/plugins/obsidian-advanced-slides/css/custom.css
```

```css
@import url(https://fonts.googleapis.com/css2?family=Ubuntu,wght@1,500);
/*font-family: 'Ubuntu', sans-serif;*/
/*font-size: 5em;*/

@import url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500);
@import url(https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500);
@import url(https://fonts.googleapis.com/css2?family=Poppins);

@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400);
@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR);

.reveal {
}

.reveal p {
  font-size: 1em;
  font-family: 'Source Code Pro', 'Noto Sans KR', sans-serif;
  word-spacing: -10px;
}

.reveal h1 {
  font-family: 'Poppins', 'IBM Plex Sans KR', sans-serif;
  line-height: 1.5;
}

.reveal h2 {
  font-family: 'Poppins', 'IBM Plex Sans KR', sans-serif;
  line-height: 1.5;
}

.reveal h3 {
  font-family: 'Poppins', 'IBM Plex Sans KR', sans-serif;
  line-height: 1.5;
}

.reveal h4 {
  font-size: 1.1em;
  font-family: 'Source Code Pro', 'IBM Plex Sans KR', sans-serif;
  line-height: 2;
  text-transform: none;
}

.reveal h5 {
  font-size: 0.7em;
  font-family: 'Source Code Pro', 'Noto Sans KR' sans-serif;
  text-transform: none;
}

.reveal h6 {
  font-size: 0.4em;
  font-family: 'Source Code Pro', 'Noto Sans KR' sans-serif;
  text-transform: none;
}

.reveal li {
  line-height: 1.5;
  font-size: 0.8em;
}
```

yaml-front matter
```yaml
---
title: 1회차 - 오리엔테이션
css: css/custom.css
---
```
