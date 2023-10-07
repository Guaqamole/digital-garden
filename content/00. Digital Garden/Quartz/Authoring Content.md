---
title: Authoring Content
date: 2023-10-06
draft: false
tags:
  - Quartz
---
*Parent* : [[00. Digital Garden]]

## Syntax

As Quartz uses Markdown files as the main way of writing content, it fully supports Markdown syntax. By default, Quartz also ships with a few syntax extensions like [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) (footnotes, strikethrough, tables, tasklists) and [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown) ([callouts](https://quartz.jzhao.xyz/features/callouts))

Additionally, Quartz also allows you to specify additional metadata in your notes called **front-matter**. 

~~~yaml
title: Example Title
draft: false
tags:
  - example-tag
~~~

Some common front-matter fields that are natively supported by Quartz:

- `title`: Title of the page. If it isn’t provided, Quartz will use the name of the file as the title.
- `aliases`: Other names for this note. This is a list of strings.
- `draft`: Whether to publish the page or not. This is one way to make [pages private](https://quartz.jzhao.xyz/features/private-pages)
   in Quartz.
- `date`: A string representing the day the note was published. Normally uses `YYYY-MM-DD` format.

