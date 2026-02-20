---
title: Quartz Blog에 특정 폴더 포함시키지 않는법
date: 2023-10-19
draft: false
tags:
  - Quartz
---
- `ignorePatterns`: a list of [glob](https://en.wikipedia.org/wiki/Glob_(programming)) patterns that Quartz should ignore and not search through when looking for files inside the `content` folder. See [private pages](https://quartz.jzhao.xyz/features/private-pages) for more details.

```js
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🥑 Avo's Garden",
...

// 이부분.
    ignorePatterns: ["private", "_templates", ".obsidian", ".sh", "_assets", "_img", "_test"],
...

export default config
```
