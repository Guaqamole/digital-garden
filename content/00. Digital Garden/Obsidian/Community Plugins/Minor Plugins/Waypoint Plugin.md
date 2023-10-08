---
title: Waypoint
date: 2023-10-07
draft: false
tags:
  - MinorPlugins
  - CommunityPlugins
---
*Parent* : [[00. Digital Garden]]

## [How To Use](https://github.com/IdreesInc/Waypoint#how-to-use)

- First, install the plugin. Waypoint is currently being reviewed for inclusion in the Community Plugins list. Once it is accepted, you'll be able to install it directly within Obsidian.
- Generate a waypoint by editing a folder note (a note with the same name as its parent folder) and typing in the waypoint trigger text. By default, this is `%% Waypoint %%`. Make sure to include the double-percents on both sides!
    - This trigger flag can be changed in settings, but it will always require the double-percents as that is how Obsidian knows it's a comment and not real text.
- And that's it! Waypoints will be automatically updated whenever the files or folders within that folder are changed. Be sure not to remove the `%% Begin Waypoint %%` or `%% End Waypoint %%` flags as this is what the plugin uses to locate the table of contents. Any changes made to the text between these flags will get removed once the waypoint is updated.

Note that since waypoints can only be generated in folder notes, **it is highly recommended that you install a plugin like [Folder Note](https://github.com/xpgo/obsidian-folder-note-plugin)** to ensure that folder notes don't get lost after folder renames and other actions that change the file tree. If a folder note containing a waypoint is renamed to something other than the folder's name, the waypoint will no longer be updated.

## [Current Limitations](https://github.com/IdreesInc/Waypoint#current-limitations)

- **Waypoints can only be created within a folder note**
    - Because scanning for waypoints every time a file/folder is changed is an intensive process, only folder notes are checked to avoid scanning every file in the vault.
- **Waypoints cannot be created on the top level of your vault**
    - Waypoints are meant to categorize notes that are similar to one another. Adding a waypoint to the root node would cause every note in your vault to be linked and defeat the point of using waypoints in the first place.
- **Waypoint appearance can't be customized (yet)**
- **Only one waypoint can be created per folder note**

If your workflow would be improved by the removal of one of these limitations, feel free to reach out to me with your use case and I'll see what I can do!

# 혹은 이렇게 내가 메뉴에서 바꿀수도 있다
![[Pasted image 20231008233250.png]]