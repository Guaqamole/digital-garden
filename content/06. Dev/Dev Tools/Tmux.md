---
title: Tmux
date: 2024-11-09
draft: false
tags:
  - DevTools
complete: true
---
## TL;DR
### 2. Starting and Managing Sessions

| Action                          | Command                               |
| ------------------------------- | ------------------------------------- |
| Start a new session             | `tmux` or `tmux new`                  |
| Start a new named session       | `tmux new -s [session-name]`          |
| List all sessions               | `tmux ls` or `tmux list-sessions`     |
| Attach to the last session      | `tmux attach` or `tmux a`             |
| Attach to a specific session    | `tmux attach -t [session-name]`       |
| Detach from the current session | `Ctrl+b d`                            |
| Rename the current session      | `Ctrl+b $`                            |
| Switch to the next session      | `Ctrl+b )`                            |
| Switch to the previous session  | `Ctrl+b (`                            |
| Kill the current session        | `Ctrl+b &`                            |
| Kill a specific session         | `tmux kill-session -t [session-name]` |
|                                 |                                       |

### 3. Working with Windows

| Action                              | Command                          |
| ----------------------------------- | -------------------------------- |
| Create a new window                 | `Ctrl+b c`                       |
| List all windows                    | `Ctrl+b w`                       |
| Rename the current window           | `Ctrl+b ,`                       |
| Close the current window            | `Ctrl+b &`                       |
| Move to the next window             | `Ctrl+b n`                       |
| Move to the previous window         | `Ctrl+b p`                       |
| Move to a specific window by number | `Ctrl+b [0-9]`                   |
| Swap current window with another    | `Ctrl+b :swap-window -t [index]` |


### 4. Managing Panes

| Action                              | Command                          |
| ----------------------------------- | -------------------------------- |
| Split the pane horizontally         | `Ctrl+b "`                       |
| Split the pane vertically           | `Ctrl+b %`                       |
| Switch to the next pane             | `Ctrl+b o`                       |
| Rotate panes                        | `Ctrl+b Ctrl+o`                  |
| Close the current pane              | `Ctrl+b x`                       |
| Toggle between panes                | `Ctrl+b ;`                       |
| Resize pane (Up, Down, Left, Right) | `Ctrl+b [arrow key]`             |
| Convert pane into a new window      | `Ctrl+b !`                       |
| Toggle pane layouts                 | `Ctrl+b Spacebar`                |
| Synchronize panes                   | `Ctrl+b :setw synchronize-panes` |

## Install
```python
# On Mac
brew install tmux

# On Debian
apt-get install tmux
```

## Overview
### tmux 서버
tmux는 기본적으로 서버-클라이언트 방식으로 동작한다.

tmux서버는 백그라운드로 실행되며 터미널에서 tmux 명령어를 실행할때 자동으로 시작되고, 구동 중인 프로그램이 없을때 종료된다. 사용자가 터미널에서 클라이언트를 실행하면 소켓 파일을 통해(`/tmp`) 서버와 통신을 시작한다.

### 1. 세션 ( session )
tmux는 프로세스들이 실행되는 tmux 서버와 접속해서 사용하는 tmux 클라이언트로 나뉘는데, 이 때 서버에서 실행되는 프로세스를 세션이라고 할 수 있습니다. 이 세션에는 한 개 이상의  tmux 클라이언트에서 접속할 수 있어서, 같은 화면을 보며 동시에 작업을 할 수도 있습니다. 각 세션은 이름 가지고 구별합니다. 

### 2. 윈도우 ( window )
윈도우는 웹브라우저의 탭과 유사합니다. 세션 안에 포함되며 세션은 1개 이상의 윈도우와 연결됩니다. 윈도우는 이름 대신 인덱스로 구분합니다. 윈도우를 생성한 순서대로 0번부터 번호가 부여됩니다. 

### 3. 패널 ( panel )
패널은 윈도우에 포함되며, 윈도우 내에 1개 이상이 있습니다. 패널이 여러 개일 경우, 여러 개의 패널이 동시에 분할되어 보입니다. 이 패널이 실제 터미널이 구동되는 곳입니다. 

### 4 명령 키( prefix key ) 
모든 명령을 입력하기 전에 명령키를 입력해 주어야 합니다. 마치 vi에서 명령을 입력하기 전에 ESC를 누르는 것과 같습니다. 기본값은 Ctrl + b이며 옵션에서 변경할 수 있습니다. 여기서는 기본 값을 기준으로 설명합니다.

##  How To Use
### 세션 생성
`new-session` 명령을 통해 신규 tmux 세션을 생성할 수 있다.
```python
tmux new-session
# or 
tmux new    # 간소화된 버전, 기능은 동일하다
```

세션 생성시 세션의 이름은 0부터 순차적으로 부여된다. 이때 `-s` 플래그를 통해 세션의 이름을 임의로 지정할 수도 있다.
```python
tmux new -smysession
```

세션 생성시 명령어를 추가하여, 세션 생성과 동시에 특정 명령 혹은 프로그램이 바로 실행되도록 할 수도 있다.
```python
tmux new htop
```


> [new-session](https://man.openbsd.org/tmux#new-session) 링크를 타고가면 `new-session`에 대한 추가적인 옵션 정보를 확인할 수 있다.

### 상태 표시줄
클라이언트가 tmux 세션에 연결되면 하단 상태 표시줄을 통해 현재 세션의 상태를 볼 수 있다.

![](https://i.imgur.com/MWUGZFg.png)


### prefix key

tmux 클라이언트에서 키보드를 입력하면 기본적으로 현재 활성화된 창으로 입력이 전달된다. 그러다 보니 tmux 자체를 제어하기 위해서는 특수한 단축키를 입력해야 하며, 이를 **prefix key** 라고 부른다.

기본적인 prefix key는 `C-b` (Ctrl + b) 이다.

> `C-`: Ctrl, `M-`: Meta(alt키와 동일), `S-`: Shift

prefix key를 입력하고 난 후에 추가적인 키 입력을 통해 tmux를 제어할 수 있다.

예를 들어서 `C-b x`는 `C-b`를 입력하고 난 후에 `x` 키를 입력한다. 만일 `C-b C-x`가 들어온다면 `C-b` 입력 후 Ctrl키만 유지한채 `C-x`를 입력해 줘야 한다.

또한 tmux 제어가 아닌, 내부 프로그램으로 prefix key (Ctrl + b)를 입력해야 할 경우 `C-b`를 두번(`C-b C-b`) 입력하면 된다.

### 도움말
tmux 내부에서 `C-b ?`를 입력하면 도움말 화면을 볼 수 있다.

```python
C-b C-b     Send the prefix key                                                                      [38/38]
C-b C-o     Rotate through the panes                                                                        
C-b C-z     Suspend the current client                                                                      
C-b Space   Select next layout                                                                              
C-b !       Break pane to a new window                                                                      
C-b "       Split window vertically                                                                         
C-b #       List all paste buffers                                                                          
C-b $       Rename current session                                                                          
C-b %       Split window horizontally                                                                       
C-b &       Kill current window                                                                             
C-b '       Prompt for window index to select                                                               
C-b (       Switch to previous client                                                                       
C-b )       Switch to next client                                                                           
C-b ,       Rename current window                                                                           
C-b -       Delete the most recent paste buffer                                                             
C-b .       Move the current window                                                                         
C-b /       Describe key binding                                                                            
C-b 0       Select window 0                                                                                 
C-b 1       Select window 1                                                                                 
C-b 2       Select window 2                                                                                 
C-b 3       Select window 3                                                                                 
C-b 4       Select window 4          
... 생략 ...
```

설명을 읽고 필요한 기능의 단축키를 prefix key 항목에서 익힌 대로만 하면 입력하면 된다.

터미널에서 다음 명령어를 통해 동일한 정보를 확인할 수 있다
```python
tmux lsk -N|more
```

### command prompt
tmux 내부에서 `C-b :`를 통해 명령 프롬프트를 사용할 수 있다.
![](https://i.imgur.com/h0Uj79V.png)
터미널에서 `tmux ...` 형태로 입력하는 커맨드를 프롬프트 내부에서도 사용할 수 있다.  
또한 세미콜론(`;`)을 통해 여러개의 tmux 명령을 한번에 수행할 수도 있다.


### Attaching, Detaching
구동중인 세션에서 쉘로 돌아오는 것을 detaching 한다고 하며, tmux 내부에서 `C-b d` 혹은 `detach` 명령을 통해 수행 가능하다

```python
# 세션 생성 후 내부에서 C-b d를 통해 detach
tmux new
[detached (from session 18)]
```

반대로 `attach-session` 명령을 통해 쉘에서 구동중인 세션으로 접근(attaching) 할 수 있다.
```python
tmux attach-session
# or
tmux attach     # 기능은 동일하다
```


### 윈도우 생성
`new-window` 명령을 통해 윈도우를 생성할 수 있다. (`C-b c`로도 실행 가능)
```python
:new-window
# or 
:neww   # new-window와 기능 동일
```

명령 실행시 `-n`플래그를 넣으면 윈도우의 이름을 지정할 수 있다.
```python
:neww -nmynewwindow
```

### split-window
`split-window` 명령을 통해 현재 윈도우를 여러개의 pane으로 분할시킬 수 있다.
![](https://i.imgur.com/YQlIQCj.png)
`split-window` 명령에 사용 가능한 플래그는 다음과 같다

- `-h`: 수평 분할 (키 바인딩: `C-b %`)
- `-v`: 수직 분할 (키 바인딩: `C-b "`)
- `-d`: 현재 pane을 신규 pane으로 변경하지 않음
- `-b`: 신규 pane을 왼쪽 혹은 위쪽으로 배치 (오른쪽 혹은 아래로 배치됨)

### 현재 윈도우 변경
현재 윈도우를 변경하기 위해 다음과 같은 키 바인딩을 사용할 수 있다.
- `C-b 0` ~ `C-b 9`: 현재 윈도우를 0번 ~ 9번 인덱스에 해당하는 윈도우로 변경
- `C-b'`: 인덱스 번호 직접 입력 가능 (인덱스 범위가 0~9를 초과하는 경우)
- `C-bn`: 다음 윈도우로 변경
- `C-bp`: 이전 윈도우로 변경
- `C-bl`: 마지막 윈도우로 변경

### 활성 pane 변경
분할된 윈도우에서 특정 pane을 활성화 시키기 위한 키 바인딩은 다음과 같다

- `C-b <방향키>`: 분할된 윈도우 환경에서 여러 pane을 방향키로 옮겨 다닐 수 있음
- `C-b q`: 현재 윈도우에 분할된 pane들의 번호를 잠깐동안 보여줌
- `C-b q 0~9`: 입력된 번호의 pane을 활성화
- `C-b o`: 다음 번호의 pane을 활성화
- `C-b C-o`: 다음 번호의 pane과 현재 pane을 스왑

### Tree Mode
Tmux에서 트리 모드를 사용하면 현재 구동중인 모든 세션과 윈도우의 목록을 볼 수 있다.
![](https://i.imgur.com/n9HjxzP.png)
![](https://i.imgur.com/pNp71oC.png)
- `C-b s`: 세션 단위로 목록 조회 실행
- `C-b w`: 윈도우 단위로 목록 조회 실행

트리 모드 사용시 방향키와 엔터를 통해 접속할 윈도우를 선택할 수 있고, 파일탐색기처럼 세선내 윈도우 목록도 열고 닫을 수 있다.

트리모드에서 사용가능한 기능이 상당히 많은데

- `Enter`: attach 시킬 Session, Window, Pane 선택
- 방향키: 이동
- `x`: 선택 항목 제거
- `X`: 태깅된 항목 제거
- `<`: 프리뷰 스크롤 (좌측)
- `>`: 프리뷰 스크롤 (우측)
- `C-s`: 검색
- `n`: 마지막 검색 반복
- `t`: 태깅 상태 토글
- `C-t`: 전체 항목 태깅
- `T`: 전체 항목 태깅 제거
- `:`: 선택 항목 혹은 태깅 항목에 대한 커맨드 프롬프트 실행
- `O`: 재정렬
- `r`: 재정렬 (정렬 순서 반대로)
- `v`: 프리뷰 토글
- `q`: 트리 모드 종료


### 다른 클라이언트 접속 해제
`C-b D`를 누르면 현재 접속중인 클라이언트의 목록을 볼 수 있다.

이동, 태그 키는 트리 모드와 동일하고 접속 해제(Detach)를 위한 키가 별도로 존재한다.

- `Enter`: 현재 선택된 클라이언트 Detach
- `d`: `Enter`키와 동일
- `D`: 태깅된 클라이언트 제거
- `x`: 현재 선택된 클라이언트를 detach 시키고, 구동중인 쉘을 종료
- `X`: 태깅된 클라이언트를 detach 시키고, 구동중인 쉘을 종료


### Session, Window, Pane 제거
다음 키 바인딩을 통해 윈도우와 Pane을 제거할 수 있다.

- `C-b &`: 현재 윈도우 제거 (`kill-window` 커맨드에 바인딩)
- `C-b x`: 현재 pane 제거 (`kill-pane` 커맨드에 바인딩)

세션의 경우 `kill-session` 커맨드를 통해 제거할 수 있으며, 별도의 키 바인딩이 존재하진 않는다.


### Rename
다음 키 바인딩을 통해 현재 접속중인 session과 window의 이름을 변경할 수 있다.

- `C-b $`: 세션 이름 변경 (`rename-session` 커맨드에 바인딩)
- `C-b ,`: 윈도우 이름 변경 (`rename-window` 커맨드에 바인딩)

### Swapping
`swap-window`, `swap-pane` 커맨드를 통해 현재 활성화된 window 혹은 pane을 다른것과 스왑할 수 있다.

스왑을 위해서는 먼저 마킹된 pane이 필요하다.

- `C-b m`: pane 마킹
- `C-b M`: pane 마킹 해제

마킹된 pane의 경우 아래 이미지와 같이 모서리 부분이 하이라이트 처리된다

![](https://i.imgur.com/h1N2kKH.png)
이제 다른 pane선택 후 커맨드 프롬프트를 통해 `swap-pane`을 입력하면 기존에 마킹된 pane과 현재 pane이 스왑된다. pane 스왑은 다른 윈도우에서도 사용 가능하다. 마찬가지로 `swap-window` 커맨드를 입력하면 마킹된 pane이 존재하는 윈도우와 현재 윈도우가 스왑된다.

단일 윈도우 내에서 이전 혹은 다음 순서의 pane과 스왑시키기 위해서는 각각 `C-b {`, `C-b }` 키 바인딩을 사용할 수 있다.

### Moving
윈도우의 인덱스 번호를 변경하기 위해서는 `move-window` 혹은 `C-b .`를 통해 수행할 수 있다.
```python
:move-window -t999  # 현재 윈도우의 인덱스 번호를 999로 변경
# or
:movew -t999    # move-window와 동일
```

기존에 존재하는 윈도우 인덱스일 경우 옮길수 없으며, `-k` 플래그를 사용하면 강제로 인덱스를 덮어쓸 수 있다.
```python
:move-window -kt999
```

인덱스 목록에 빈 번호가 존재할 경우 (예: 0, 1, 3, 9 …) `-r` 플래그를 통해 순차적으로 정렬 시킬 수 있다.
```python
:movew -r
```

### Pane 크기 조정

`C-b C-<방향키>` 조합의 키 바인딩을 통해 현재 pane의 크기를 조절할 수 있다.

- `C-b C-Left`
- `C-b C-Right`
- `C-b C-Up`
- `C-b C-Down`

좀 더 큰 단위로 pane 사이즈를 조절하고자 할 경우 컨트롤키 대신 메타(Alt) 키를 통해 조절 가능하다

- `C-b M-Left`
- `C-b M-Right`
- `C-b M-Up`
- `C-b M-Down`

위 키 바인딩은 모두 `resize-pane` 커맨드를 사용한다.

또한 `C-b z` 키 바인딩을 통해 단일 Pane을 전체 화면으로 키울 수 있다. (전체화면 해제시에도 동일)

### 윈도우 레이아웃
현재 pane을 사전 정의된 레이아웃으로 재배치시켜주는 기능을 제공한다

`C-b Space` 키를 통해 레이아웃을 변경할 수 있으며 다음 키 바인딩을 통해 특정 레이아웃을 선택할 수 있다.

- `C-b M-1`: 수평 정렬
- `C-b M-2`: 수직 정렬
- `C-b M-3`: 상단에 메인 창 하나, 나머지는 하단에 수평 정렬
- `C-b M-4`: 좌측에 메인 창 하나, 나머지는 우측에 수직 정렬
- `C-b M-5`: 열과 동일한 수의 행으로 타일링

### 윈도우, Pane 찾기
`C-b f` 키 바인딩을 통해 윈도우 혹은 pane 이름을 검색할 수 있다.

검색시 해당 이름을 찾을 수 없을경우 `filter: no matches`가 출력되며 모든 window, pane의 목록이 제공된다

![](https://i.imgur.com/hu5b4Za.png)

### 마우스 사용 활성화
```python
:set -g mouse on
```