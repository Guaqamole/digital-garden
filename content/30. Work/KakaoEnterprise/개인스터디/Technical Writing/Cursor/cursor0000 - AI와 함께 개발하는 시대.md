# **[#1] AI와 함께 개발하는 시대**

안녕하세요!  
AI와 함께 개발하는 것에 관심이 많은 존입니다.

요즘 AI를 활용한 다양한 도구들이 하루에도 수백 개씩 쏟아져 나오고 있지만, 정보가 너무 방대하다 보니 실제로 그 도구들을 _‘잘’_ 활용하는 건 쉽지 않은 현실입니다. 특히, AI Code Editor를 활용해 무언가를 개발했다는 글은 많지만, 어떻게 했지?는 많이 못본것같습니다. 따라서 처음 접하는 분들에게는 여전히 어려운 주제일 수 있다고 느꼈고, 검색 개발자 & 크루분들이 AI Tools에 좀 더 쉽게 다가 갈 수 있도록 이 아지트를 만들게되었습니다.

저는 AI와 함께 개발할 수 있는 **AI Code Editor** (cursor, windsurf등), 혹은 AI를 활용한 개발 Insight를 줄 수 있는 글들에 집중해 이 아지트에 정리해보려고 합니다 (물론 제가 관심을 쏟는 분야 먼저ㅎㅎ). 이 아지트를 활용해서 저희 검색 개발자 뿐만 아니라 기획자등 모든 크루분들이 쉽게 AI Code Editor에 정착(?)했으면 좋겠습니다! 

*글쓰는 재주가 없어 잘못되거나 이해가 안되는 부분이 있을 수 있습니다.. 피드백 부탁드립니다!
# Cursor.ai
[Visual Studio Code](https://namu.wiki/w/Visual%20Studio%20Code)를 포크해서 만들어진 AI 기반의 코드 에디터(IDE)로, 단순한 자동완성을 넘어 **프로젝트 전체를 이해하고 리팩토링, 문서화, 코드 생성, 디버깅** 등 다양한 개발 작업을 AI의 도움으로 효율화할 수 있는 AI Code Assistant 입니다.

Cursor는 [GPT-4o](https://namu.wiki/w/GPT-4o), [Claude 3.7](https://namu.wiki/w/Claude#3.7) Sonnet 등 다양한 AI 모델을 지원하며, 코드 작성 및 디버깅 속도를 대폭 향상시키는 것을 목표로 하고 있습니다. 또한 자연어를 활용해 코드 작성, 수정, 명령어 변환 등 다양한 작업을 간단히 수행할 수 있다는 특징이 있습니다:
- AI 기반 자동 완성 기능 제공.
- 자연어로 코드 작성 및 수정 요청 가능.
- 코드베이스 전체를 이해하고 적절한 개선 사항 제안.
- [터미널](https://namu.wiki/w/터미널) 명령어를 자연어 기반으로 AI 변환 지원.
- [이미지](https://namu.wiki/w/이미지)와 코드의 컨텍스트를 이해하고 코드 작성에 반영.
- 웹 검색 통합으로 최신 정보 활용 가능.
→ 이 모든걸 IDE 안에서 해결 가능!


## Ai Code Editor, 정말 필요할까? (tmi)
(재미로 봐주세요)

2022년 5월부터 6월 사이, 프리랜서 매칭 플랫폼인 Upwork를 통해 모집한 95명의 전문 프로그래머를 대상으로 JavaScript로 HTTP 서버를 구현하는 과제를 부여한 실험이 진행되었습니다. 참가자는 GitHub Copilot을 사용한 **Treated 그룹**과 Copilot 없이 일반 정보원만 사용한 **Control 그룹**으로 나뉘었으며, 과제 완료 시간은 모든 테스트를 통과한 **첫 번째 커밋까지의 시간**으로 측정되었습니다.

**참가자**
(사진)

- 참가자 연령: 대부분 25-34세 
- 교육 수준: 대다수가 4년제 학위 이상을 소지
- 연간 소득: $10,000-$19,000 사이
- 프로그래밍 경력: 평균 6년
- 하루 평균 코딩 시간: 평균 9시간(?)

**결과**
- AI Code Editor를 사용한 그룹은 사용하지 않은 그룹보다 작업을 **55.8% 더 빠르게 완료**
- 핵심 → 주로 **프로그래밍 경험이 적은 개발자, 나이가 많은 프로그래머**, 그리고 **하루에 더 많은 시간을 프로그래밍하는 사람**들이 가장 큰 혜택을 보았음

(사진)


## 역대 가장 빠르게 성장한 제품 (tmi)
(재미로 봐주세요)

Cursor는 2023년 ARR (연간 반복 매출: 주로 구독 비즈니스에서 사용되는 지표) 100만 달러에서 2024년 말까지 1억 달러로 급등했고, 불과 **12개월** 만에 **연간 9,900%**의 성장 (한화 15억 -> 1500억원)을 이뤄내며 ChatGPT 까지 앞지르는, 역대 가장 빠르게 성장하는 제품으로서의 입지를 굳혔습니다.

2025년 현재 글을 쓴 시점의 Anysphere는 약 $10B (100억) 달러에 근접한 valuation을 가졌다고 하네요..ㄷㄷ 경쟁사인 windsurf를 출시한 Codeium의 약 3배 이상 가치입니다.


## Anysphere: AI Code Editor의 핵심 가치는? (tmi)
(재미로 봐주세요)

Anysphere의 공동 창업자:  Aman Sanger, Arvid Lunnemark, Sualeh Asif, Michael Truell (CEO)

MIT 학생으로서 그들은 **소프트웨어 개발의 패러다임을 바꿀 수 있는 AI의 잠재력에 집착**했지만, GitHub Copilot과 같은 기존 도구는 그 잠재력을 충분히 끌어올릴수 없다고 생각했다고 합니다.

**그들에게 AI는 단순히 코딩을 돕는데 그치지 않고 개발자가 작업하는 모든것의 기반이 되는 도구라고 생각했습니다.** 그래서 AI를 그저 플러그인으로 만족하지 않고, “AI 중심 개발 환경을 제공하는 IDE를 만들자”라는 그들의 스토리는 Cursor에 반영되었고, 짧은 시간에 큰 투자를 받기에 충분했습니다.

(사진)

_[Cursor Team: Future of Programming with AI](https://www.youtube.com/watch?v=oFfVt3S51T4): Lex Fridman이 Cursor의 공동창업자들과 진행한 Podcast입니다. AI가 프로그래밍의 패러다임을 어떻게 바꾸고있는지 그들의 생각을 들어볼수있는 자리입니다. 시간 날  때. 들어보시는것도 좋을 것 같습니다.



# [#2] Cursor의 핵심 기능
Cursor가 관심을 받게된 계기는 Copilot 이상의 “실질적인 리팩토링 도구”로 주목받았기 때문이다. 또한 GPT-4, Claude, MCP등 최신 LLM과 관련 기술을 빠르게 도입하면서 많은 개발자들이 Cursor를 사용하기 위해 유저수가 급등한거 같다.

Cursor는 Visual Studio Code를 fork 한 프로젝트여서 기존에 vscode에서 사용하던 extension뿐만 아니라 단축키등 기존 세팅을 그대로 사용할 수 있기 때문에 Python/JS 진영에선 많이 넘어오고 있는 추세이다. 그럼 Vscode에서 어떤 기능들이 Cursor에 추가되었는지 하나씩 살펴보자.

## TL;DR
Cursor의 핵심 기능은 크게 Editor, Context로 나뉨

🛠️ Editor 기능
Tab Completion (탭 코드 자동완성 기능)
키보드 탭(Tab) 입력을 통해 코드 자동완성을 제공.
ex) 함수 이름, 변수, 모듈 자동완성

Code Generation + Tools
자연어 명령을 기반으로 Agent가 코드를 생성하고, 필요시 Tool(예: Linter, Formatter, Debugger 등)과 연동
ex) "API 호출 함수 만들어줘" → 코드 자동 생성 + API 요청 도구 연결

Prompt Bar
에디터 내 특정 영역(예: Console, Inline Code 등)을 지정해 자연어로 질문, 코드 수정, 명령어 실행 가능
ex) 특정 함수 블록 선택 후 “이거 성능 개선해줘”라고 입력

🧠 Context 기능
Codebase Indexing (코드베이스 색인화)
전체 프로젝트를 분석하여 클래스, 함수, 파일 간 관계를 파악하고 AI가 빠르게 문맥을 이해할 수 있도록 색인 생성

@Symbol (@심볼 태깅)
@File명, @클래스명 등의 심볼 태그를 통해 특정 코드 요소를 직접 참조할 수 있는 기능
ex) “@LoginService 설명해줘” → 해당 클래스 분석 및 요약 제공

Rules for AI (AI 사용 규칙 정의)
프로젝트 또는 팀 단위로 AI의 응답 방식, 보안 기준, 코드 스타일, 제안 제한 등을 정의할 수 있는 커스텀 룰
ex) “외부 API는 직접 호출하지 않도록 설정” → AI가 해당 규칙을 인식하고 코드 제안 시 반영



## 1. 탭완성 (Tab Completion)
Cursor.ai와 GitHub Copilot의 차이점중 하나는 코드를 완성하는 방식이다. Copilot은 주로 inline 단위로 코드를 편집하지만 Cursor는 프로젝트 단위로 Context 기반 Suggestion을 제공한다. 탭 완성 기능은`TAB` 버튼으로 실행 가능하다.

Context 기반 편집을 한다는건, AI가 인식하는 정보가 단순히 현재 파일, 또는 주변 코드만 인식하는것이 아니라:
- 프로젝트 파일 전체
- 다른곳에서 Import된 파일
- class, 함수 정의, commit 이력등 
프로젝트의 전체적인 문맥을 읽고 판단한다는 뜻이다.

예를들어, GitHub Copilot은 커서 위치에 텍스트를 삽입할 수 있지만, 커서 주변의 코드를 편집하거나 텍스트를 제거할 수 없다. Cursor는 다중 문자 편집, 지시 기반 편집, 변경 내용을 기록하여 개발자가 다음에 무엇을 하려는지 알 수 있다. [[https://docs.cursor.com/tab/from-gh-copilot](https://docs.cursor.com/tab/from-gh-copilot)]


## 2. 코드 생성 (Code Generation) + Tools
Cursor에선 `Chat` 기능으로 (구 Composer) Agent가 사용자의 프롬프트로 코드를 생성하고, 프로젝트를 빌드하여 실제로 동작하는 애플리케이션을 만들 수 있다. `CMD + I`로 실행 가능하다.

또한 프로젝트 구조를 짜거나, 로직을 설계할때 Agent에게 `Ask` 하여 코드 수정없이 대화를 이어 나갈수있습니다. LLM은 Context 단위로 전체 프로젝트를 Scan하기 때문에 사용자의 코딩 스타일 또한 고려대상이다.


#### Tools
Cursor Chat은 단순히 질문-답변을 넘어서, 특정 목적에 맞는 “도구”들을 선택적으로 호출해 AI가 실질적인 작업을 하도록 도와줍니다. 각 도구는 개발 워크플로우에서 자주 수행되는 작업을 자동화합니다.

Search Files
- 프로젝트 전체를 대상으로 키워드나 함수 등을 검색하여 관련 파일을 찾습니다.

Open Files
- AI가 작업에 필요한 파일을 자동으로 열어서 사용자가 더 편하게 접근할 수 있게 합니다.

Run Terminal Commands
- 빌드, 테스트, lint 등 터미널 명령어를 AI가 대신 실행합니다 (보안 제약 하에).

Web Search
- 코딩 외 일반적인 질문도 웹검색을 포함해 답변 품질을 향상시킵니다.

⭐️ MCP Server
- DB, 3rd party API등을 연동하여 Chat을 사용할 수 있습니다.


Copilot에서 Migrate 하고싶다면?
Cursor에는 Copilot이 기본적으로 포함되어 있어 GitHub Copilot을 사용하려면 설정에서 [Cursor를 비활성화 후 사용 할 수 있습니다.](https://docs.cursor.com/tab/overview#copilot-settings)



## 3. 프롬프트 바 (Prompt Bar)
Cursor의 Agent와 Copilot은 콘솔에서도 명령어를 직접 수행 할 수 있지만, Cursor의 프롬프트 바는 콘솔뿐만 아니라, 특정 영역을 지정하여 프롬프트 바에서 편리하게 질문하고, 코드를 수정 할 수 있다. `CMD + K` 로 실행 가능.

Quick Question
간단하고 빠른 답변을 얻고싶을때 프롬프트 바에서 `Option + Enter` 로 질문할수있습니다.


## 4. 코드 베이스 인덱싱 (Codebase Indexing)
기본적으로 Cursor는 더 정확한 코드베이스 답변을 위해 파일들과 코드를 인덱싱합니다. 백그라운드에서 Cursor는 코드베이스의 각 파일에 대한 임베딩을 계산하고 이를 사용해서 답변의 정확도를 개선하게 됩니다.

예) 프로젝트의 `.gitignore` 파일을 읽어 AI가 읽을 필요가 없는 대용량 콘텐츠 파일을 무시하여 답변의 정확도를 향상시킴

#### 대형 Mono-repo 작업 지원
소규모 프로젝트가 아닌, 수십만개의 파일이 포함되어있는 대규모 모노레포로 작업하는 경우, 무엇을 인덱싱할지 전략적으로 명시하기위해 `.cursorignore` 파일을 추가할 수 있다.

자동 Indexing 비활성화
만약 자동으로 Codebase Indexing이 실행되는걸 원치 않는다면, `Cursor Setting`에서 비활성화가 가능하다.

## 5. @Symbol
`Chat` ,`Prompt Bar`에서 코드, 파일, 문서 및 기타 컨텍스트를 참조하기 위해 `@` 기호를 사용하여 더 명확하게 AI와 협업할 수 있다. 예시:
- `@Docs Pandas` AI가 공식 문서에  접근하여 업데이트된 기능, Deprecated된 최신 함수 조회
- `@Files index.html script.js`에 접근하여 특정 파일을 수정함
- `@Git` commit log에 접근하여 변경하려는 파일의 함수가 어떻게 구현되어 왔는지 history 파악 가능


- [@Files](https://docs.cursor.com/context/@-symbols/@-files) - Reference specific files in your project (**pdf는 아직 첨부불가**)
- [@Folders](https://docs.cursor.com/context/@-symbols/@-folders) - Reference entire folders for broader context
- [@Code](https://docs.cursor.com/context/@-symbols/@-code) - Reference specific code snippets or symbols from your codebase
- [@Docs](https://docs.cursor.com/context/@-symbols/@-docs) - Access documentation and guides
- [@Git](https://docs.cursor.com/context/@-symbols/@-git) - Access git history and changes
- [@Notepads](https://docs.cursor.com/context/@-symbols/@-notepads) - Access notepads (베타기능)
- [@Cursor Rules](https://docs.cursor.com/context/@-symbols/@-cursor-rules) - Work with cursor rules
- [@Web](https://docs.cursor.com/context/@-symbols/@-web) - Reference external web resources and documentation
- [@Recent Changes](https://docs.cursor.com/context/@-symbols/@-recent-changes) - Create links to specific code or documentation
- @Rules - 
- [@Lint Errors](https://docs.cursor.com/context/@-symbols/@-lint-errors) - Reference lint errors ([Chat](https://docs.cursor.com/chat/overview) only)
- [@Definitions](https://docs.cursor.com/context/@-symbols/@-definitions) - Look up symbol definitions ([Cmd K](https://docs.cursor.com/cmdk/overview) only) There are also some other symbols that can be used:
- [# Files](https://docs.cursor.com/context/@-symbols/pill-files) - Add files to the context without referencing
- [/ Commands](https://docs.cursor.com/context/@-symbols/slash-commands) - Add open and active files to the context


## 6. Rules for AI
프로젝트별 혹은 글로벌하게 Rule을 정의하여 Cursor에서 AI 응답을 사용자가 직접 정의하는 방법 (LLM에 대한 지침 및/또는 시스템 프롬프트)

Global Rules
모든 프로젝트에 공통으로 적용되는 규칙
- AI가 절대로 수정하거나 접근하지 말아야 할 파일들
- 특정 언어나 프레임워크를 쓸 때 공통적으로 따라야 할 규칙들
- 출력 언어 설정

Project Rules
해당 프로젝트에만 적용되는 세부 규칙
- 특정 디렉터리에서는 테스트 코드만 작성
- `src/` 디렉터리에는 Python만 쓰기
- 특정 언어에서 함수 이름 규칙 강제


cursor.directory
https://cursor.directory/rules
표준화되고 Customize화된 Rules for AI template을 제공하는 플랫폼.Typescript, Python, Web Development등 다양한 Rules 제공.

# Free vs Pro
Context Window