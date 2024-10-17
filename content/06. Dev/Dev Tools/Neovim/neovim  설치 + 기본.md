---
title: neovim  기본
date: 2024-10-10
draft: false
tags:
  - DevTools
complete: true
---
## Setup
### pre-setup
#### delete previous setup
```sh
rm -rf ~/.local/share/nvim
rm -rf ~/.local/state/nvim
rm -rf ~/.cache/nvim
rm -rf ~/.config/nvim
rm -rf ~/.git
```

#### Nora (git dot files) Install
```sh
git init
git clone https://github.com/LazyVim/starter ~/.config/nvim
cd ~/.config/nvim
nvim # 설치 시작
```

### Lazyvim
#### Change Theme (solarized Osaka)
lua/plugins/colorscheme.lua
```lua
return {
  "craftzdog/solarized-osaka.nvim",
  lazy = true,
  priority = 1000,
  opts = function()
    return {
      transparent = true,
    }
  end,
}
```

lua/config/lazy.lua
```lua
require("lazy").setup({
  spec = {
    { "LazyVim/LazyVim", import = "lazyvim.plugins", opts = { -- <-- add opts part
      colorscheme = "solarized-osaka", -- <-- add
      } -- <-- add 
    }, 
    { import = "plugins" },
  },
```

```python
indent_type = "Spaces"
indent_width = 2
column_width = 120
```

### keymaps
lua/config/keymaps.lua
```lua
local keymap = vim.keymap
local opts = { noremap = true, silent = true }

-- Increment/decrement
keymap.set("n", "+", "<C-a>")
keymap.set("n", "-", "<C-x>")

-- Delete a word backwards
keymap.set("n", "dw", "vd_b")

-- Select all
keymap.set("n", "<C-a>", "gg<S-v>G")

-- Jumplist
keymap.set("n", "<C-m>", "<C-i>", opts)

-- New tab
keymap.set("n", "te", ":tabedit", opts)
keymap.set("n", "<tab>", ":tabnext<Return>", opts)
keymap.set("n", "<s-tab>", ":tabprev<Return>", opts)

-- Split window
keymap.set("n", "ss", ":split<Return>", opts)
keymap.set("n", "sv", ":vsplit<Return>", opts)

-- Move window
keymap.set("n", "sh", "<C-w>h")
keymap.set("n", "sk", "<C-w>k")
keymap.set("n", "sj", "<C-w>j")
keymap.set("n", "sl", "<C-w>l")

-- Resize window
keymap.set("n", "<C-w><left>", "<C-w><")
keymap.set("n", "<C-w><right>", "<C-w>>")
keymap.set("n", "<C-w><up>", "C-w>+")
keymap.set("n", "<C-w><down>", "C-w>-")

-- diagnostic
keymap.set("n", "<C-j>", function()
  vim.diagnostic.goto_next()
end, opts)
```

### extras
lua/config/lazy.lua
```lua
require("lazy").setup({
  spec = {
    -- add LazyVim and import its plugins
    { "LazyVim/LazyVim", import = "lazyvim.plugins", opts = {
      colorscheme = "solarized-osaka",
    } },
    -- import EXTRA
    { import = "lazyvim.plugins.extras.lang.python" },
    { import = "lazyvim.plugins.extras.lang.json" },
...
```

## Basic
### mason.nvim
language server 등 레이지빔에서 설치되어있는 패키지를 볼수있는 파일이다.
```
leader + c + m
```

메이슨으로 바로 가기
```
leader + c + m
```

명령어 바로 입력
```sh
:Mason 
```

ui 로 패키지 설치하는 방법
```
:Mason -> ctrl + f (찾기) -> i 명령어로 설치
```

삭제
```
U
```


### init.lua
```lua
--vim.opt.clipboard = "unnamedplus" -- copy to clipboard
```
### change theme
lua/plugin/colorscheme
```js
return {
  {
    opts = {
      colorscheme = "tokyonight-day"
    }
  }
}
```
