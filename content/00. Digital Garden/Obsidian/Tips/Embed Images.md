---
title: Embed Images
date: 2023-11-24
draft: false
tags: 
complete: true
---
## External images

You can add images with external URLs, by adding a `!` symbol before an [external link](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#External%20links).

```md
![Engelbart](https://history-computer.com/ModernComputer/Basis/images/Engelbart.jpg)
```

![Engelbart](https://history-computer.com/ModernComputer/Basis/images/Engelbart.jpg)

You can change the image dimensions, by adding `|640x480` to the link destination, where 640 is the width and 480 is the height.

```md
![Engelbart|100x145](https://history-computer.com/ModernComputer/Basis/images/Engelbart.jpg)
```

If you only specify the width, the image scales according to its original aspect ratio. For example:

```md
![Engelbart|100](https://history-computer.com/ModernComputer/Basis/images/Engelbart.jpg)
```


---

## Embed an image in a note

To embed an image:

```md
![[Engelbart.jpg]]
```

![Engelbart.jpg > outline](https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/Attachments/Engelbart.jpg)

You can change the image dimensions, by adding `|640x480` to the link destination, where 640 is the width and 480 is the height.

```md
![[Engelbart.jpg|100x145]]
```

If you only specify the width, the image scales according to its original aspect ratio. For example, `![[Engelbart.jpg|100]]`.

![Engelbart.jpg#outline](https://publish-01.obsidian.md/access/f786db9fac45774fa4f0d8112e232d67/Attachments/Engelbart.jpg)