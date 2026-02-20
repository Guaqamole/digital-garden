---
title: Wikipedia Style Callouts
date: 2023-11-24
draft: false
tags:
  - ObsidianTips
complete: true
---
# Callout Infoboxes

![Callout-Infobox.png](https://raw.githubusercontent.com/SlRvb/Obsidian--ITS-Theme/main/Images/Callout-Infobox.png)

---

## Attributes

|Attribute|Description|
|---|---|
|`wikipedia`|Style inner tables like wikipedia|

Positioning the same as the [Image Adjustment Positioning](https://publish.obsidian.md/slrvb-docs/ITS+Theme/Image+Adjustments#Position)  

|Attribute|Description|
|---|---|
|`left`|Move the image to the left.|
|`right`|Move the image to the right.|
|`center`|Move the image to the center.|

Position Attributes will not work in Live Preview

This causes issues with editing notes so it is and will not be natively supported by me unless that stops occurring.

---

## Examples

```markdown
> [!infobox]
> # Name
> ![[Image.png|cover hsmall]]
> ###### Stats
> | Type | Stat |
> | ---- | ---- |
> | Test | Testing |
> | Test | Testing |
> 
> ##### Stats 2
> | Type | Stat |
> | ---- | ---- |
> | Test | Testing |
> | Test | Testing |
```

```markdown
> [!infobox]+ Collapsible Infobox
> # Name
> ![[Image.png|cover hsmall]]
> ###### Stats
> | Type | Stat |
> | ---- | ---- |
> | Test | Testing |
> | Test | Testing |
> 
> ###### Stats 2
> | Type | Stat |
> | ---- | ---- |
> | Test | Testing |
> | Test | Testing |
```

```markdown
> [!infobox|left]
> # Name
> ![[Image.png|cover hsmall]]
> ###### Stats
> | Type | Stat |
> | ---- | ---- |
> | Test | Testing |
> | Test | Testing |
> 
> ###### Stats 2
> | Type | Stat |
> | ---- | ---- |
> | Test | Testing |
> | Test | Testing |
```

```markdown
> [!infobox|left wikipedia]+
> # Heading
> ![[Image.png]]
> ###### Heading 6
> | Table Header |  Table Header |
> | ---- | --- |
> | Test | Testing |
> | Test | Testing |
> 
> # Heading 1
> - Bullet list
> 	- Testing
> 	- Testing
> - Testing
```

## Live Examples
https://publish.obsidian.md/slrvb-docs/ITS+Theme/Callouts/Callout+-+Infoboxes