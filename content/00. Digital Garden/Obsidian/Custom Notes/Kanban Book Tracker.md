---
title: Kanban Book Tracker
date: 2023-10-18
draft: false
tags:
  - Kanban
link: https://thebuccaneersbounty.wordpress.com/2022/06/19/tutorial-how-to-make-a-book-tracker-in-obsidian/
complete: true
---
## How to Create a Book Note using a Template

---

![](https://images2.imgbox.com/9d/21/zMTagJEj_o.png)

_Screenshot of the book template_

|   |
|---|
|❗ Note: If you have read this section from my bookshelf tutorial and already know how to set up a book note and QuickAdd, skip to the “[How to Setup and Add Books to the Kanban Board](https://thebuccaneersbounty.wordpress.com/2022/06/19/tutorial-how-to-make-a-book-tracker-in-obsidian/#kanban-board)” section.|

Templates are used to automatically fill in the contents of your note.

1. Create a folder called `_templates`. This will house the templates used for your book notes.
2. Click on the Settings button on the bottom left corner and select **Core Plugins**. Turn on Templates to enable this plugin.

![](https://i.postimg.cc/NMt9hYdV/Templates-Core-Plugin.png)

_Templates plugin in the Core plugins menu_

3. Look for **Templates** under Plugin Options.
4. Set the template folder location to `_templates`.

![](https://i.postimg.cc/prXmTCbJ/Templates-Folder-Location.png)

_Setting the template folder location to_ `_templates`

5. Create a new note and name it “Book Template”. Type the following on the **top of the note**:

|   |
|---|
|`---   Author:   Status:   Kanban-Cover:   ---`|
|   |
|---|
|💡 What you have just added is called a YAML frontmatter. This is a custom metadata that you can put in your notes and it will be used by the Dataview plugin to display your books. You can use it to sort your books by author, for example.|

Here is an explanation for each YAML frontmatter:

- **Author:**
    - This is where you put the author of the book. If the book has a translator (in the case of classics) put `[Author, Translator]`.
- **Status:**
    - This is where you put if the book is filed under “unread”, “currently reading” and “read”.
- **Kanban-Cover:**
    - This is where you put the cover of the book. For the cover to appear on the Kanban board, you need to format it like this: `"![Book Cover|150](URL of Book Cover)"`
    - If you want to use a local image, use this format and replace the file path after the `src=` part of the code: `<img width="150px" src="file:///C:/Users/USERNAME/Obsidian/Vault Name/_image source/Book Covers/Book Cover.jpg">`

After creating the template, we can now use it to generate a new book note using the QuickAdd plugin.

## How to Add a New Book Note Using QuickAdd

---

![](https://i.postimg.cc/jqFf2V2W/Quick-Add-Add-New-Book-Command-Palette.png)

_QuickAdd command to add a new book_

QuickAdd is a plugin that lets you quickly add templates, use macros, and such. Using this plugin allows you to add a new book note from the command palette instead of adding a new note, applying the template, and moving it to the folder (saving you three or more clicks!)

### Setting Up QuickAdd

1. Go to **Settings** and look for QuickAdd under the Plugin Options.

![](https://i.postimg.cc/B6v8ZNGc/Quick-Add-Plugin-Options.png)

2. On the textbox, add a name for the command (I use “Add New Book”) and then click **Add Choice**.

![](https://i.postimg.cc/hPmXGfNw/Quick-Add-Add-Choice.png)

3. Click on the gear icon to open up the settings of the Add New Book command.

![](https://i.postimg.cc/Zqbnjj0t/Quick-Add-Settings.png)

4. On **Template Path**, select the Book Template you just made.

![](https://i.postimg.cc/BtfQFBRz/Quick-Add-Template-Path.png)

5. Turn on the **Create in folder** button and select the folder location of the books (Make sure to add a folder in your vault first!). Press the **Add button** to confirm.

![](https://i.postimg.cc/mgGSwcMf/Quick-Add-Create-in-Folder.png)

6. **Optional:** Click the toggle on the **Open** and **New Tab settings** if you want QuickAdd to open up the newly added book in either a vertical or horizontal tab.

![](https://i.postimg.cc/GpLJWZqX/Quick-Add-Open-and-New-Tab.png)

7. **Optional:** Click on the lightning bolt icon to add a shortcut to this command on the Command Palette.

![](https://i.postimg.cc/SRMWLqxx/Quick-Add-Lightning-Bolt.png)

### How to Use QuickAdd

Once you’ve set up the QuickAdd command, open the Command Palette (or press **Ctrl + P**) and type QuickAdd. Select the **Add New Book** command.

![](https://i.postimg.cc/nr2nP9zR/Quick-Add-Add-New-Book-Command.png)

A new window will pop up after clicking on the Add New Book command. Type the name of the book and QuickAdd will automatically create a new note with the Book Template applied.

![](https://i.postimg.cc/15W90Fb4/Quick-Add-Add-New-Book-Window.png)

From here, you can add the metadata for the book.

![](https://images2.imgbox.com/4f/8f/AnV0mGHm_o.png)

## How to Setup and Add Books to the Kanban Board

---

![](https://images2.imgbox.com/1a/94/5NNJSMAo_o.png)

_The Book Tracker note_

In this section, I’ll explain how to set up the Kanban Board to display the YAML front matter that you have included in the book notes.

### Create the Kanban Board

1. Press **Ctrl+P** (Cmd+P on Mac) to open up the Command Palette, type “Kanban”, and click “**Kanban: Create a new board**“

![](https://images2.imgbox.com/44/d0/43AxWXLw_o.png)

2. Rename the Kanban Board to something like “**Book Tracker**“.
3. Create a new list called **Unread** on the small window and click **Add list** to confirm. Do the same process to add the **Currently Reading** and **Read** lists.

![](https://images2.imgbox.com/16/0c/oW7SoCqv_o.png)

3. Click the gear icon (⚙) on the top-right corner. This opens up the settings for Book Tracker kanban board.

![](https://images2.imgbox.com/c6/76/y4NSzfqP_o.png)

4. Scroll to the very bottom of the settings menu. Under **Linked Page Metadata**, type **Kanban-Cover** on the Metadata key and press the **Add key** button. Do the same for **Author** and **Status** YAML fields.

![](https://images2.imgbox.com/ac/dc/wXChV66C_o.png)

5. Toggle **Hide label** and **Field contains markdown** for Kanban-Cover. This will display the book cover on the kanban board.

![](https://images2.imgbox.com/6d/d9/a1xNIh19_o.png)

### Add the Book Notes

1. Click the **+ Add a card** on any of the lists and type `[[Book Note Name]]` . Press **Enter** to add it to the list.

![](https://images2.imgbox.com/99/97/GaGJ9YMn_o.gif)

_A GIF showing the steps to add the book note to the Kanban board._

### Setup MetaEdit’s Kanban Board Helper

This feature in MetaEdit automatically updates the Status YAML field on your book note whenever you move them to another list, allowing you to change the status without manually editing the property from the book note!

1. Click on the gear icon (⚙) on the bottom-left corner to open the settings menu.

![](https://images2.imgbox.com/3f/d4/5zwmosgp_o.png)

2. Under plugin options, click MetaEdit and toggle the **Kanban Board Helper**.

![](https://images2.imgbox.com/87/22/Y9B0FnMu_o.png)

3. Click the small gear icon (⚙) next to the toggle to add a new Kanban Board. Type Book Tracker (or the name of your kanban board) and click the Add button. Type **Status** on the Property in Link.

![](https://images2.imgbox.com/a4/88/AdXmr4W0_o.png)

4. To test if it works, go to your kanban board and **click and drag a book note** from the Unread list to the Currently Reading list. If the Status is the same, you can “refresh” the kanban board by going back and forth between opening a book note and the kanban board.