---
title: Linking to PDFs
date: 2023-10-31
draft: false
tags:
  - ObsidianTips
complete: true
link: https://www.youtube.com/watch?v=jANKIv5CV9k
---

## Embed a PDF in a note

To embed a PDF:

```md
![[Document.pdf]]
```

You can also open a specific page in the PDF, by adding `#page=N` to the link destination, where `N` is the number of the page:

```md
![[Document.pdf#page=3]]
```

You can also specify the height in pixels for the embedded PDF viewer, by adding `#height=[number]` to the link. For example:

```md
![[Document.pdf#height=400]]
```


---

## Example
```
![[AWS Data Engineer Exam Guide.pdf#page=4]]
```

![[AWS Data Engineer Exam Guide.pdf#page=4]]

---