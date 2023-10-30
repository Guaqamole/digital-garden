---
title: Obsidian Comments
date: 2023-10-30
draft: false
tags: []
complete: true
---
### [Insert a comment:](https://github.com/Darakah/obsidian-comments-plugin#insert-a-comment)

---

1. Select the text that you want to add a comment to
2. cmd/ctrl + p -> 'add comment' command -> enter
3. the selected text will be replaced with the following: `<label class="ob-comment" title="..." style="..."> SELECTED TEXT <input type="checkbox"> <span> COMMENT </span></label>`

- binding the add comment to a hotkey (settings -> hotkeys) can make its usage faster e.g. cmd/ctrl + C

### [Example](https://github.com/Darakah/obsidian-comments-plugin#example)

---

[![example](https://raw.githubusercontent.com/Darakah/obsidian-comments-plugin/main/images/example_2.png)](https://raw.githubusercontent.com/Darakah/obsidian-comments-plugin/main/images/example_2.png)

**----> Old View but still valid annotations:**

[![example](https://raw.githubusercontent.com/Darakah/obsidian-comments-plugin/main/images/example_1.png)](https://raw.githubusercontent.com/Darakah/obsidian-comments-plugin/main/images/example_1.png)

### [Comment Properties](https://github.com/Darakah/obsidian-comments-plugin#comment-properties)

---

1. Title (optional): Text to be shown in the side panel above the comment. If a title is not specified a default place holder will be used as the title. Possible use cases:

- to specify the line of text where this comment appears (if you have editor mode line number active) which can be useful in very large notes as currently side panel links don't cause the page to jump to it ;(
- Q/A -> the question can be the title and clicking it in the sidebar will reveal the highlighted text (can be used to review key ideas of the note just from the side pannel)
- Note to remember the reason for the comment

2. Style (optional): as shown by the example above, as it is simple html syntax style can be defined as one desires. keep in mind there are !!! **2 STYLES** !!! the one placed inside `<label class="ob-comment" style="...">` will specify style for the highlighted text while `<input type="checkbox"> <span style="">` will specify the style for the comment pop-up (this style is used the same for the side pannel.
3. COMMENT section: as the comment is identified using `<input type="checkbox"> <span>` to identify the content, the actual COMMENT can include more divs / spans / HTML elements to further custimise it and it will be rendered properly in-line and in the side-panel.

### [Comment Ribbon & Comment Panel:](https://github.com/Darakah/obsidian-comments-plugin#comment-ribbon--comment-panel)

---

#### [Comment Ribbon](https://github.com/Darakah/obsidian-comments-plugin#comment-ribbon)

A ribbon is added by default, when clicked it will open the side panel comment list. The ribbon can be hidden through the plugin settings tab (NEED TO UNLOAD / RELOAD THE PLUGIN AFTER THIS OPTION IS MODIFED FOR THE CHANGE TO TAKE PLACE!!!)

#### [Comment Panel](https://github.com/Darakah/obsidian-comments-plugin#comment-panel)

Can be opened in 2 ways:

- Clicking the comment ribbon
- Using a command `comment panel`

### [Default background color & Text color](https://github.com/Darakah/obsidian-comments-plugin#default-background-color--text-color)

---

As all in-line highlights / pop-ups are done using css, it can all be customized as one wishes by modifying the `style.css` in the `obsidian-comments-plugin` folder. to modify the default background color / text color for highlighted text:

```
.ob-comment {
  color: #8f0303;
  background-color: #CCA300;
}
```

to modify the default background color / text color for comment bubble:

```
.ob-comment span {
  background-color: #FFDE5C;
  color: #b30202;
}
```

to modify the highlight color when it is hovered over:

```
.ob-comment:hover {
  background-color: #FFDE5C;
}
```