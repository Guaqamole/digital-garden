---
title: Customize Horizontal Rules
date: 2023-10-28
draft: false
tags:
  - Custom
complete: true
link: https://forum.obsidian.md/t/creating-fancy-horizontal-rule-lines/63700
---
## Gradient Horizontal Rules

Starting out quite simply, you can make the line a gradient from transparent on the sides to a solid color in the center.

![Fig 1. Gradient Horizontal Rules|625](https://forum.obsidian.md/uploads/default/original/3X/b/7/b7aa438bfbccce41507d6791d7556daee9b2b889.png)


```css
.markdown-source-view hr,
.markdown-preview-view hr {
  margin-block-start: 2em;
  margin-block-end: 2em;
  border: none;
  height: 1px;;
  background-image: linear-gradient(to right, var(--background-primary), tan, yellow, #e6d265, yellow, tan, var(--background-primary));
}

.markdown-source-view hr::before, 
.markdown-preview-view hr::before {
  content: '🙤x🙦'; /* '🙦 🙤' */
  color: #e6d265; /* #e6d265; */
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -55%);
  transform-origin: 50% 50%;
  padding: none;
  background-color: var(--background-primary);
}
```


---


## Add Obsidian Custom Logo

```css
.markdown-rendered hr, .cm-line.hr hr {
    height: 2px;
    background-image: linear-gradient(to right, transparent, var(--hr-color) 46.2%, transparent 46.2%, transparent 54%, var(--hr-color) 54%, transparent);
    border: none;
    position: relative;
    overflow: visible;
}

.markdown-source-view.mod-cm6, hr {
    margin-block-start: 3em;
    margin-block-end: 3em;
    flex: 1 0 0;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0px;
}

.markdown-source-view:not(.is-live-preview) .HyperMD-hr::after, .markdown-rendered hr::after, .cm-line.hr hr::after {
    content: "";
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    height: 24px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: var(--obsidian-logo-small);
}
```