---
title: Homebrew commands
date: 2024-10-30
draft: false
tags: 
complete: true
---
## Update

```shell
brew update
```

`homebrew` 를 최신 버전으로 `update` 합니다. tap 되어있는 모든 저장소를 업데이트합니다. 위 사진을 보면 필자와 같은 경우 `homebrew/cask-versions`, `home-brew/core`, `homebrew/cask`, `homebrew/services`가 `update`가 된 것을 알 수 있습니다. 우선 formula는 쉽게 말해서 java, python, mysql과 같이 CLI 환경에서 동작하는 것이고 cask는 vscode나 intellij-IDEA와 같이 GUI 환경에서 동작하는 것이라고 할 수 있습니다. 위 사진에서 현재 업데이트 된 `formula`는 `libomp`이고, `cask`는 `visual-studio-code` 인 것을 알 수 있습니다.


```shell
brew upgrade
```

`brew upgrade`를 하게 되면 update가 되어 upgrade가 필요한 항목들을 upgrade 할 수 있습니다. 하지만 꼭 `brew upgrade`를 하기 위해서 `brew update` 명령어를 우선적으로 해야 하는 것은 아닙니다.

다음과 같이 정리할 수 있습니다.

```shell
brew upgrade = brew update + brew upgrade
```

upgrade 명령은 update 명령을 포함하고 있는 것입니다. 따라서 `brew upgrade` 를 `brew update` 를 생략하고 진행할 수 있는 것입니다. 그러나 생략을 하기 때문에 update가 된 항목이 어떤 것인지 확인하지 않고 upgrade를 진행한다는 것을 유의해야 합니다.

```shell
brew upgrade A
brew upgrade A B C ...
```

알파벳 A, B, C를 예시로 들어서 설명하자면
`brew upgrade A` 처럼 항목을 지정하여 **그 지정한 항목만 최신 버전으로** `upgrade` 를 할 수 있고, `brew upgrade A B C ...` 처럼 **여러 개의 항목을 동시에 지정**하여 `upgrade` 가 가능합니다.

```shell
brew upgrade --greedy
```

`brew upgrade`에 `--greedy` 옵션을 추가하면 `formula`만 아니라 `cask`까지 한 번에 upgrade가 가능합니다. 위 이미지를 참고하면 `formula`인 `bat`까지 upgrade 완료 후 바로 `cask`들을 upgrade하는 것을 알 수 있습니다.

---
## Search
```shell
brew search A
```

그래서 보통 자신이 설치하고자 혹은 궁금한 항목을 먼저 `brew search A` 와 같은 명령어를 통해 탐색 즉 search를 합니다.

> [!tip] 
> 원하는 버전이 안나올 수도 있으니 아래 명령어를 이용해보자.

```zsh
brew info --json node | jq -r '.[].versioned_formulae[]'
node@22
node@20
node@18
node@16
node@14
```



---
## Install
```shell
brew install A
```

말 그래도 패키지를 설치하는 것입니다. homebrew를 사용하지 않는다면 설치할 때 마다 해당 홈페이지에 들어가서 .dmg 파일을 받아서 설치를 진행해야하는 번거로움을 겪겠지만 homebrew를 활용하면 python, java와 같은 언어 뿐만이 아닌 htop과 같은 도구 또한 쉽게 설치하고 삭제할 수 있습니다.


---
## List

```shell
brew list,ls [--formula | --cask]
```

`brew list` 를 통해 자신의 맥에 있는 모든 항목들을 볼 수 있습니다. 또한 `--formula` 혹은 `--cask` 옵션을 줌으로써 전체가 아닌 자신이 원하는 특성의 항목들을 볼 수 있습니다.


---

## Uninstall

```shell
brew uninstall | remove | rm
```

brew를 통해 설치한 것을 삭제하는 명령어입니다. python, java와 같은 formula의 경우 삭제하기 간단하고 수월하다고 할 수 있습니다.


---
## Cleanup

```shell
brew cleanup
```

homebrew로 설치한 패키지 중 `brew upgrade` 이후 최신 버전이 아닌 패키지 혹은 부속 파일들이 삭제되지 않고 찌꺼기처럼 쌓여있는 경우가 있습니다. 이 때 `brew cleanup`을 사용한다면 깔끔하게 청소할 수 있습니다. 잘 쌓여있지 않아서 필자도 자주 하진 않고 종종하는 경우가 있습니다.

---

## Outdated

```shell
brew outdated
```

`brew outdated` 명령어를 통해서 `brew update`를 하고 난 후 update 되어지지 않은 항목들을 확인할 수 있습니다. `brew upgrade` 를 하기 전 자신이 upgrade를 원하거나 원치 않는 항목들을 사전에 확인 할 수 있습니다.


```shell
brew outdated --greedy
```

`brew outdated` 명령어에 `--greedy` 옵션을 추가하면 `cask`의 목록들까지 함께 확인할 수 있습니다.


---

## Leaves
```shell
brew leaves
```

우선 `brew ls` 명령어를 통해 설치된 항목들을 확인 할 수 있었습니다. 이를 간단하게 볼 수 있는 명령어가 바로 `brew leaves` 명령어입니다. 이 명령어를 통해 자신이 설치한 formula 항목들에 한해서 부속적인 즉 **`dependencies` 항목들을 제외한 `brew ls --formula`**를 볼 수 있습니다.


---

## Deps

```shell
brew deps --tree --installed [formula | cask]
```

다음과 같이 종속 formula 항목들과 그에 속하는 `dependencies` 들을 쉽게 볼 수 있습니다. 또한 세부적으로 어떤 한 패키지에 대해서만 알고 싶다면 `brew deps --tree --installed python` 과 같이 formula 항목 이름을 붙히면 그 항목에 대해서만 알 수 있습니다.



---

## Doctor

```shell
brew doctor
```

`brew doctor` 를 통해 현재 내 맥의 homebrew와 관련된 것에 한해 문제가 있다면 이 명령어를 통해 진단을 할 수 있습니다. 지금은 문제가 없다고 판단할 수 있지만 종종 트러블이 일어나서 혼자 힘으로 해결하지 못하는 경우 `brew doctor` 명령어를 통해서 나온 추천 명령어들을 통해 손쉽게 해결할 수 있습니다.