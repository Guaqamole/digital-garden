---
title: Image Captions
date: 2023-10-28
draft: false
tags: 
complete: true
link: https://github.com/alangrainger/obsidian-image-captions
---
# [Add image captions](https://github.com/alangrainger/obsidian-image-captions#add-image-captions)

Add an image in this format: (Read 뷰에서만 된다)

```md
![[image.jpg|This is a caption]]
```

or this format:

```md
![This is a caption](image.jpg)
```

and it will add the caption underneath the image, like this:

![This is a Caption](https://github.com/alangrainger/obsidian-image-captions/raw/main/example.png)

## [Resize images](https://github.com/alangrainger/obsidian-image-captions#resize-images)

You can use the existing Obsidian width parameter to resize your images:

```md
![[image.jpg|This is a caption|150]]
```

or this format:

```md
![This is a caption|150](image.jpg)
```

## [Markdown in captions](https://github.com/alangrainger/obsidian-image-captions#markdown-in-captions)

You can include inline Markdown and it will be rendered as part of the caption:

```md
![[image.jpg|This is a caption with **bold text**]]
```

You can use Markdown links as normal:

```md
![[image.jpg|This is a caption with [a link to Obsidian](https://obsidian.md)]]
```

To use Wikilinks, you'll need to swap your square brackets `[[]]` for angle brackets `<<>>`:

```md
![[image.jpg|This is a caption with <<a Wikilink>>]]
```

## [Use filename as caption](https://github.com/alangrainger/obsidian-image-captions#use-filename-as-caption)

If you want to use the image filename as the caption, specify `%` as your caption, and it will replace that with the filename (without extension):

```md
![[image.jpg|%]]
```

If you want to literally use the `%` character as the caption, you can escape it:

```md
![[image.jpg|\%]]
```

If you want the filename including extension, use `%.%`.

## [Styling](https://github.com/alangrainger/obsidian-image-captions#styling)

You can apply CSS styling by targeting the `.image-captions-figure` and `.image-captions-caption` classes.

## [Limitations](https://github.com/alangrainger/obsidian-image-captions#limitations)

The captions won't show for external images in **Editing** mode. For example:

```md
![Not visible in Editing mode](https://obsidian.md/logo.png)
```

I couldn't find a reliable way of targeting them. Get in touch if you know a way to do this!