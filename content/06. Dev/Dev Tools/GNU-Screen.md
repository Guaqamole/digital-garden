---
title: GNU-Screen
date: 2024-11-13
draft: false
tags:
  - DevTools
complete: true
---
## Basics
**screen 이 attach 되었을때만 사용.**
- ctrl a c -> cre­ate new win­dow
- ctrl a A -> set win­dow name
- ctrl a w -> show all win­dow
- ctrl a 1|2|3|… -> switch to win­dow n
- ctrl a " -> choose win­dow
- ctrl a ctrl a -> switch between win­*dow*
- ctrl a d -> detach win­dow
- ctrl a ? -> help
- `ctrl a [` -> start copy, move cur­sor to the copy loca­tion, press ENTER, select the chars, press ENTER to copy the selected char­ac­ters to the buffer
- ctrl a ] -> paste from buffer

## Starting screen
- **screen -S → create screen**
- screen -d → dettach screen
- **screen -x → attach screen** 
- screen –DR -> list of detached screen
- screen –r PID -> attach detached screen ses­sion
- screen –dmS MySes­sion -> start a detached screen ses­sion
- screen –r MySes­sion -> attach screen ses­sion with name MySession

## Advanced
- ctrl a S -> cre­ate split screen
- ctrl a TAB -> switch between split screens
- ctrl a Q -> Kill all regions but the cur­rent one.
- ctrl a X -> remove active win­dow from split screen
- ctrl a O -> logout active win­dow (dis­able out­put)
- ctrl a I -> login active win­dow (enable output)