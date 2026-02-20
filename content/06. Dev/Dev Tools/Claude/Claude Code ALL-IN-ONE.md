---
title: Claude Code ALL-IN-ONE
date: 2026-01-31
draft: false
tags:
  - DevTools
  - Claude
complete: true
banner: /_assets/_img/_banners/nebula.jpg
---



# Basics

https://www.youtube.com/watch?v=a1a9wV88MSM

## Claude.md (claude's memory)

-   llm은 콘텍스트 윈도우 크기의 제약이 있어서 매 요청이 stateless하다. 따라서 새 채팅을 시작하면 이전 context가 유지되지 않은 채로 대화를 시작하게된다. 이것을 유지할수있게 도와주는게 claude.md 파일.

### 어떤정보를 입력하나?

-   자주 사용하는 명령어 (bash)
-   핵심 파일 및 유틸리티 함수
-   코드 스타일 가이드라인
-   테스트 지침
-   저장소 에티켓
    -   브랜치 naming conventions, merge, rebase
-   개발자 환경 설정
    -   python 패키징은 uv로, 컴파일러등
-   프로젝트에 특정한 예상치 못한 동작이나 경고
-   claude code가 기억했으면 하는 기타 정보
-   일괄적으로 사용하고 싶은 라이브러리에 대한 정보
-   프로젝트 아키텍처, 시스템 아키텍처 정보

### claude.md 파일 종류 3가지

1.   프로젝트 메모리 ( ./claude.md )
     1.   팀 전체에 적용할 규칙과 정보
     2.   프로젝트 아키텍처
     3.   코딩 표준: 스타일 가이드, 명명 규칙
     4.   일반적인 워크플로: 애플리케이션 빌드, 테스트, 배포 지침
2.   로컬 프로젝트 메모리 ( ./claude.local.md )
     1.   팀과 공유하지 않고 개인적인 프로젝트 관련 설정을 위한 파일
     2.   개인 설정이 원격 저장소에 커밋되는 것을 방지하기 위해 해당 파일을 `.gitignore` 에 추가함
          1.   샌드박스 url
          2.   개인 API 키 또는 테스트 데이터
          3.   자신에게 유용한 맞춤형 명령어
3.   사용자 메모리 (~/.claude/CLAUDE.md)
     1.   사용자의 모든 프로젝트에 적용되는 전역 설정.
          1.   일반적인 코드 스타일 선호도 (항상 2칸 들여쓰기 사용)
          2.   개인 도구를 위한 단축키



### CLAUDE.md 꿀팁

-   중요한 포인트는 `IMPORTANT`, `YOU MUST` 라는 강조어 사용하기
-   이 파일을 클로드에게 주기적으로 관리하라고 맡기기
-   혹은 파일이 너무 커지면 정리하라고하기



## Commands

- `/compact`: 
- `/config`:
  - Auto-compant: true
  - model -> set sonnet default
- `/memory`
- github
  - `/pr_comments`
  - `/review`
- `/resume` : 이전 세션 이어서 대화하기 아주중요.
    - naming은 어떻게? -> /rename
    - claude --resume "new-index-pipeline-planning" 이렇게 세션 시작할수있음.




## Setup

### /permissions 명령어

- 프로젝트, 파일단위로 agent가 권한 없이 수정할수있게 추가하는 rule
- 프로젝트 단위 권한은 `.claude/settings.local.json`
- 사용자 설정은 `~/.claude/settings.json`



## Theory

### CoT 유도하기

Chain of thought은 사고의 사슬, 논리적 사고 과정이라는 뜻이므로, AI가 최종 답변을 내놓기전에, 사고 과정을 명시적으로 기술하도록 유도해야한다.

어떻게 하나? 프롬프트에 '생각하라' 라는 문구만 들어가 있다면 대체로 사고를 잘해낸다.

>   REST API를 어떻게 설계 할 수 있는지 단계별로 생각하고 답변해줘.

-> 아쉬운 프롬프트

>   REST API를 구축하렴녀 어떻게 해야해? 생각과정을 <thinking> 태그에 입력해주고 생각한 과정을 분석하고 그를 기반으로 <answer> 태그에 답변을 입력해



### Extended Thinking

ET는 COT에서 한 단계 발전한 기능이다. 모델이 확정된 사고를 사용하면 응답 생성에 더 많은 노력을 들인다.

어떻게 하나? 확장된 사고는 고민해라 라고 말하면된다.

-   Think -> Think Hard -> Think Harder -> UltraThink
-   지금은 없어진 기능이라곤한다.



# Advanced

## Custom Slash Commands

커스텀 커맨드를 저장하고 싶다면 프로젝트의 이 위치에 저장하면된다: `.claude/commands` (사용자는 `~/.claude/commands`)

세가지 요소로 이루어져 있으며 다음과 같은 형태를 보임

```
/<prefix>:<command> [arguments]
```

-   prefix: command scope (project, user)
-   command: commands in md file
-   arguments: optional arguments (github issue-75, prompts..etc)

### Namespaces

커맨드를 분리할 수 있는 기능

-   `~/.claude/commands/github/create-pr.md`
    -   `/github:create-pr`
-   `~/.claude/commands/create-pr.md`
    -   `/create-pr`



## MCP

-   `-s user ; --scope user`: 모든 프로젝트에서 사용

### stdio, SSE, HTTP

### MySetUp

#### Notion MCP

```json
claude mcp add --transport http notion-mcp https://mcp.notion.com/mcp
```



#### Slack MCP

```json
```



#### Microsoft Playwright MCP

```json
claude mcp add-json --scope user playwright-mcp '{
    "command": "npx",
    "args": [
      "-y",
      "@playwright/mcp@latest"
      ],
    "env": {
    }
  }'
// or 
claude mcp add playwright-mcp -s user -- npx @executeautomation/playwright-mcp-server
```



#### sequential-thinking-mcp

```json
claude mcp add-json --scope user sequential-thinking-mcp '{
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sequential-thinking"
    ],
    "env": {
    }
  }'
```

#### Context7

```json
claude mcp add-json --scope user context7-mcp '{
    "command": "npx",
    "args": [
      "-y",
      "@upstash/context7-mcp@latest"
      ],
    "env": {
    }
  }'
```



#### Atlassian MCP

```json
claude mcp add-json --scope user jira-mcp '{
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "-e", "JIRA_URL",
        "-e", "JIRA_USERNAME",
        "-e", "JIRA_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest"
    ],
    "env": {
      "JIRA_URL": "...",
        "JIRA_USERNAME": "...",
        "JIRA_API_TOKEN": "..."
    }
  }'
  
claude mcp add-json --scope user confluence-mcp '{
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "-e", "CONFLUENCE_URL",
        "-e", "CONFLUENCE_USERNAME",
        "-e", "CONFLUENCE_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest"
    ],
    "env": {
      "CONFLUENCE_URL": "...",
        "CONFLUENCE_USERNAME": "...",
        "CONFLUENCE_API_TOKEN": "..."
    }
  }'
```



#### Github MCP

```json
claude mcp add-json --scope user github-mcp '{
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "-e",
      "GITHUB_PERSONAL_ACCESS_TOKEN",
      "-e",
      "GITHUB_HOST",
      "ghcr.io/github/github-mcp-server"
    ],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "...",
      "GITHUB_HOST": "https://github..."
    }
  }'
```

### Youtube MCP

### Serena MCP

```
claude mcp add -s user serena \ 
  /Users/namkyu.k/.local/bin/uvx -- \
  --from serena-agent serena-mcp-server start-mcp-server \
  --context ide-assistant \
  --enable-web-dashboard false \
  --enable-gui-log-window false
```

## Setting.json

```json
{
  "hooks": {
    "Notification": [
      { 
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Submarine.aiff"
          },
          { 
            "type": "command",
            "command": "terminal-notifier -title \"Claude Code\" -message \"작업을 진행해주세요\" -sound default -ignoreDnD"
          }
        ]
      }
    ],
    "Stop": [
      { 
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title \"Claude Code\" -message \"작업 완료\" -sound default -ignoreDnD"
          }
        ]
      }
    ]
  },
  "statusLine": {
    "type": "command",
    "command": "node /Users/namkyu.k/.claude/hud/omc-hud.mjs"
  },
  "enabledPlugins": {
    "oh-my-claudecode@omc": true
  },
  "model": "sonnet"
}
```





## SuperClaude

https://github.com/SuperClaude-Org/SuperClaude_Framework?tab=readme-ov-file#complete-guide-to-superclaude

```
/sc:design --persona-frontend --seq 어드민 페이지를 제작하고 싶어 UI 만들어줘
```

```json
/sc:implement --ultrathink --plan  --seq 
```



## Oh-my-openclaude

https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md

```json

```
