---
title: neovim 키맵
date: 2024-10-10
draft: false
tags:
  - DevTools
complete: true
---
## Basic
vim이 아예 처음이라면 `:Tutor` 명령어를 수행해보길 바란다.
### leader key
리더키는 디폴트로 space 지정이다. 이제부터 리더키는 space 키라고 생각하면 된다.
```
leader
```

### nvim window (useful)
add file
```
(tree view) e + filename + enter
```

add dir
```
(tree view) e + dirname/ + enter
```

hide all
```
(tree view) h
```

add tab
```
(tree view) s
```

copy file
```
(tree view) y
```

rename file/dir
```
(tree view) r
```

view orderby
```
(tree view) o
```

cut
```
(tree view) x
```

move
```
(tree view) m
```
### root tree
root dir
```
leader + e
```

toggle on/off
```
leader + e
```

현재 작업중인 디렉토리를 열고싶으면
```
leader + E
```

### file navigation from root
telescope 패키지를 사용하여 root dir 에서 파일을 찾는 기능이다.
```
leader * 2
```

or
```
leader + f + f
```


### buffers (tabs)
buffer tree view
```
leader + ,
or (bad)
leader + f + b
```

move left (right) 
```
leader + `
{ (}) + b
```

#### close buffer
```
leader + b + d
```

### diagonostics (error msg)
```
leader + x + x
```


### code actions (error suggestions)
```
leader + c + a
```


### temp color scheme
```
leader + u + C
```


### execution
```
:term python3 %
```
→ 보통 이렇게 하지않고, 키맵 세팅으로 설정 후 사용.


### create file
```sh
a + filename + enter
```


### window
move left (right) window → buffer 에서 작업중 file navigation 으로 이동하고 싶을때 유용.
```
leader + w + h (l)
```