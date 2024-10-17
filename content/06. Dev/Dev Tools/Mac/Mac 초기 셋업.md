
## Ghostery (Ad Block)
https://chromewebstore.google.com/detail/ghostery-%ED%8A%B8%EB%9E%98%EC%BB%A4-%EA%B4%91%EA%B3%A0-%EC%B0%A8%EB%8B%A8%EA%B8%B0-%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4/mlomiejdfkolichcflejclcbmpeaniij?pli=1

## Mos for mouse controll

## RayCast (shortcut & extension)

## Nerd Fonts

https://github.com/ryanoasis/nerd-fonts/releases/tag/v3.1.1
→ 서체 관리자

## Iterm Setup

Preferences

Profiles Tab
- Text
	- Font: Firacode Nerd Font
	- Size: 26
- Window
	- Transparency: 18
	- Checked Blur: 56

Appearances
- Theme: Minimal

General
- Closing
	- Uncheck “Confirm Quit iTerm2”

## ohmyzsh setup

https://github.com/ohmyzsh/ohmyzsh

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## powerlevel10k

https://github.com/romkatv/powerlevel10k

https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#oh-my-zsh

```sh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

```sh
ZSH_THEME="powerlevel10k/powerlevel10k"
```

install mellow font? (No.)

## Homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```sh
brew list
brew install exa fzf node neovim tmux lazygit pnpm ripgrep tree-sitter yarn ripgrep fd

brew uninstall exa fzf node neovim tmux lazygit pnpm ripgrep tree-sitter yarn
```

## ZSH Plugins
```sh
vim ~/.zshrc

plugins=(git fzf zsh-syntax-highlighting zsh-autosuggestions z)

cd .oh-my-zsh/custom/plugins

git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

## aliases
```sh
alias v="nvim"
alias c="clear"
alias e="exit"
alias s="source ~/.zshrc"
alias n="nvim"
alias vz="vim ~/.zshrc"
```