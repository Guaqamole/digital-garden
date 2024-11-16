---
title: Vim Help page 이용하기
date: 2024-10-29
draft: false
tags:
  - DevTools
  - Vim
complete: true
link: https://vimdoc.sourceforge.net/htmldoc/help.html
---
```bash
vim
:tab help

*help.txt*      For Vim version 9.0.  Last change: 2022 Dec 03

                        VIM - main help file
                                                                         k
      Move around:  Use the cursor keys, or "h" to go left,            h   l
                    "j" to go down, "k" to go up, "l" to go right.       j
Close this window:  Use ":q<Enter>".
   Get out of Vim:  Use ":qa!<Enter>" (careful, all changes are lost!).

Jump to a subject:  Position the cursor on a tag (e.g. |bars|) and hit CTRL-].
   With the mouse:  ":set mouse=a" to enable the mouse (in xterm or GUI).
                    Double-click the left mouse button on a tag, e.g. |bars|.
        Jump back:  Type CTRL-O.  Repeat to go further back.

Get specific help:  It is possible to go directly to whatever you want help
                    on, by giving an argument to the |:help| command.
                    Prepend something to specify the context:  *help-context*
...
...
Getting Started
|usr_01.txt|  About the manuals
|usr_02.txt|  The first steps in Vim
|usr_03.txt|  Moving around
|usr_04.txt|  Making small changes
...

Basic editing
|starting.txt|  starting Vim, Vim command arguments, initialisation
|editing.txt|   editing and writing files
|motion.txt|    commands for moving around
```

### help page 진입 & 나오기
```python
<C-]> == CTRL-]
<C-O> == CTRL-O
```

### help page 바로가기
```python
:help toc
:help motion
:help windows
...
```