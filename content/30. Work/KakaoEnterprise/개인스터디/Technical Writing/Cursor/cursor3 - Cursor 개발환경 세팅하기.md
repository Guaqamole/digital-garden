링크
- https://chucoding.tistory.com/143
- https://dev.to/heymarkkop/my-top-cursor-tips-v043-1kcg
- https://wikidocs.net/book/17550
- https://kimyir.tistory.com/96
- https://brunch.co.kr/@publichr/130
- https://news.hada.io/topic?id=20358
- https://www.gpters.org/dev/post/summary-cursor-functions-usage-22PQ9MmxvROzBcQ
TOC
1. 설치 세팅
	1. 세팅화면 (Codebase-wide)
	2. Cursor 공식문서
	3. Extension 이관
	4. Codebase Indexing
2. 개발 세팅
	1. Cursor vs VSCode Setting
	2. General
		1. privacy mode
	3. Features
		1. Cursor Tab
			1. Partial Accepts
			2. Auto Import (Typescript)
		2. Chat
			1. protection
			2. web search tool
		3. Codebase Indexing
			1. 설명
		4. Docs
			1. 내가 사용할 공식문서 추가
	4. Models
		1. 사용할 모델 선택
		2. API Keys
	5. Rules
	6. MCP
	7. Beta
3. 개인 세팅
	1. 업데이트가 되면서 자동으로 off 되었음
	2. 링크
		1. https://www.youtube.com/watch?v=fG6HV3pxtOI
	3. disable shadow workspace 
	4. caret smooth animation off
	5. > **"workbench.editor.enablePreview": false**


이번 글에선 Cursor IDE의 (간단한) 초기 세팅 방법과 Cursor 공식 포럼에서 여전히 논란(?)이 되고있는 Codebase Indexing에 대해 얘기해보겠습니다.

Cursor는 vscode를 fork해서 만든 프로젝트입니다. 기존에 vscode에서 사용중이던 extension, keybinding등 모든 세팅을 그대로 사용할수있다는 장점과, vector db를 활용한 codebase indexing을 지원한다는 점이 매력적입니다. 대부분 cursor로 넘어오신 분들은 context와 관련된 기능들을 사용해보고 싶어서일텐데, 이 기능이 정확히 어떻게 동작하는지 명확하게 설명 되지않아 cursor 공식 포럼에 codebase indexing과 관련된 질문들이 많이 올라와있습니다.

Cursor가 AI를 활용해 개발 생산성을 높인다는건 명확한 사실이지만 AI가 생성한 코드는 **일관성이 부족**하고, **보안 취약점**이 생길 수 있기 때문에 “어차피 사용할거라면 알고 쓰자” 라는 취지로 이번글을 쓰게되었다.
## Codebase Indexing
세팅을 진행하기전에 codebase indexing 관련 설정이 자주 언급되어, 저번 글에 올렸던 커서 IDE Background Process 그림을 토대로 동작원리를 간단하게 살펴보자 (cursor 운영진들이 직접 작성한 답변들을 참고하여 작성).

커서는 기본적으로 vector database를 활용한 코드베이스 인덱싱 기능, 즉 프로젝트내 파일, 코드등 프로젝트 리소스들의 context를 파악해 프로젝트 단위의 질문이 가능하다. “코드 생성해줘” 라는 user query를 Cursor Chat에 넣었을때, LLM은 실제로 필요한 파일과 코드만 선별 후 프로젝트의 context와 user query를 조합하여 답변하게 된다.

Anysphere의 Truell은 사용자의 코드를 직접 저장하지 않고 임베딩된 벡터값만 저장하기 때문에 데이터가 유출될 일은 없다고 주장했으나, chunking, embedding 과정을 명확하게 공개하지 않은 시점에 해당글만 보고 판단하는건 안전하지 않다고 생각한다. 결국 벡터화된 작은 코드 조각들의 모음이라고 해도 벡터 검색으로 활용 할 수 있지 않을까? 라는 의구심이 들기때문이다. 

따라서 가장 좋은 방법은 Cursor의 “Behind the scene”을 파악하고 사용자가 직접 보안에 주의하며 사용하는것이다 (Cursor Enterprise Plan이 나온 이유이기도하다).
## 1. 기본 세팅
### Cursor 설치
설치 후 바로 보이는 화면



이후 Cursor > Preference > Cursor Settings ⚙️ 에 들어가서 환경 설정을 시작합니다.

### Extension 이관
초기 세팅을 마친후, 기존에 vscode에서 사용하던 extension들을 불러옵니다. extension 수에 따라 작업 시간이 오래 걸릴수도있습니다.


### Codebase Indexing
다음으로는 앞서 말씀드렸던 코드베이스 인덱싱을 할지말지 결정하는 단계인데요. Cursor 버전에 따라 코드베이스 인덱싱 기능이 기본 활성화 되어 있을수도있고, 비활성화 되어 있을 수 있기 떄문에 해당 부분은 각자 보안에 유의해서 선택하시면 좋을 것 같다.

해당 설정은 Cursor Settings ⚙️ > Features 에서 변경하실 수도 있고 지금까지 인덱싱 된 데이터들도 Delete Index 버튼을 통해 모두 지울 수 있다.


### Cursor Oauth 연동
마지막으로는 Cursor 회원가입을 하시면 되는데요. 이 부분을 skip 하시면 AI사용이 불가능하므로 반드시 회원가입을 하셔야 합니다. 



## 2. 개발 세팅

### Cursor vs VScode Setting
Cursor > Preference Tab으로 가면 cursor setting, VS code setting을 확인 할 수 있습니다. 
- Cursor settings는 Model 선택, Rules for AI등 cursor.ai 가 제공하는 기능들을 모아놓은 세팅환경이고 
- VS code settings는 말그대로 이전에 사용하던 vscode와 동일한 세팅 환경입니다.

이중 저는 Cursor.ai의 핵심 기능이 포함된 설정들만 소개해 보겠습니다.

### General
- privacy mode
cursor 서버 (remote vector db)로 프롬프트, metadata등 사용자 데이터를 보낼것인지 설정하는 옵션입니다. 해당 옵션을 enabled 해놔야 remote server에 데이터 보존이 활성화 되지 않는다고 합니다. 팀의 보안 정책에 따라 꼭 설정해주시길 바랍니다.

### Features
- web search tool
	- 웹 검색 기능이 Agent/Ask 모드에서 자동으로 활성화됩니다
	- 매번 @web 태그를 입력할 필요 없이 자동으로 웹 검색을 수행합니다
- chat
	- large-context
		- - LLM에게 더큰사이즈의 context window를 보내게된다. pro plan 기준 월 500 fast request 제한을 더 빨리 소모할 순 있지만, **결과의 품질과 일관성 향상에 효과적**이다.
	- - Enable auto-run mode
	- Agent에게 자동으로 Tool(파일 저장, 명령어 입력)을 실행하는 기능입니다. 이 기능을 활성화하면 수동으로 실행 명령을 입력하거나 confirmation후 파일을 생성 하지 않습니다. (저는 꺼두는 편입니다)
- codebase indexing 
- docs 
	- 커서 IDE엔 자체적으로 공식문서들을 크롤링 하여 색인한 공식 문서 모음들이 존재하는데, `@Docs` symbol을 사용해서 액세스할 수 있다. 만약 내가 자주 보는 문서가 존재하지 않을때 커스텀으로 해당 옵션에 추가할 수 있다. SmolAgent Github Page를 추가하자마자 여러 페이지들을 색인하는것을 볼 수 있다.

### Models
- -max 가 붙은 모델들
- premium
	- 프리미엄 모델은 Pro 또는 Business Plan에 포함된 월 500개 요청과 함께 사용할 수 있다.
	- 월 500건 Request를 모두 소진하면 프리미엄 모델을 계속 제공하지만 플랫폼에 부하가 많을 때는 응답 시간이 지연되거나 일부 모델에 대한 액세스가 제한될 수 있다.
- MAX
	- larger context window & expanded reasoning 기능이 탑재되어 성능이 향상된 모델.
	- Agent Mode로 사용하는 경우, Tool 호출은 프롬프트 요청 외에 별도의 요청으로 요금이 청구된다 (사용할때마다추가 비용 나온다는말).
- API Keys
	- Langchain등 에서 자주 사용하는 OPENAI, Anthropic API KEY를 등록할수있다. 이로써 별도의 .env를 생성하지 않아도 해당 KEY를 기본적으로 참고한다.

자세한 내용은 https://www.cursor.com/privacy cursor의 Privacy policy 에서도 확인 할 수 있습니다.

## 3. 개인 세팅
- cursorignore
	- 커서는 프로젝트의 코드베이스를 읽고 인덱싱하여 Context를 파악한다. 루트 디렉터리에 `.cursorignore` 파일을 추가하여 커서가 액세스할 수 있는 디렉터리와 파일을 제어할 수 있다.
	- 제외되는 영역
		- Codebase Indexing
		- Tab, Chat, K로 접근 가능한 코드
		- @symbol 로 접근 가능한 코드
		- .gitignore에 포함된 영역
	- 왜 필요할까?
		- 보안
			- 커서는 ignored된 파일에 대한 접근을 차단하기 위해 최선을 다하고 있다지만 예측할 수 없는 LLM 동작으로 인해 보안에 민감한 파일이 절대 노출되지 않을 것이라고 보장할 수 없기 때문에 추가했다고한다.
		- 성능
			- 개발 중인 코드와 상당한 부분이 관련이 없는 매우 큰 코드베이스에서 작업하는 경우, 의도하지 않은 파일들까지 indexing되어 context 검색이 느려질수있다고한다. 따라서 개발에 필요없는 파일들은 최대한 지워보자.
		- 사용방법
			- 빈 줄은 무시됩니다
		- `#` 로 시작하는 줄은 주석으로 간주되어 무시됩니다.
		- .cursorignore패턴은 파일 위치를 기준으로 일치됩니다.
```python
# Ignore specific file `config.json`
config.json

# Ignore `dist` directory and all files inside
dist/

# Ignore all files with a `.log` extension
*.log

# Ignore entire codebase
*

# Do not ignore `app` directory
!app/

# Ignores logs directories in any directory
**/logs
```
- cursorindexignore 
	- 만약 Chat, Prompt, Context 기능은 유지하면서 Indexing 에만 영향을 주고 싶은 경우 사용하는 파일이다.
- rules for AI (적극 추천)
	- https://dev.to/dpaluy/mastering-cursor-rules-a-developers-guide-to-smart-ai-integration-1k65
	- Agent Model이 코드베이스 & LLM과 상호 작용하는 방식을 정의하는 설정 파일이다. LLM은 답변간의 이력들을 유지하지 않으므로 Rules file을 통해 규칙이나 컨벤션, 동작 패턴등재사용 가능한 프롬프트와 컨텍스트를 LLM에게 제공한다. Rule이 적용되면 해당 내용들이 Model Context 시작부분에 포함되므로 AI는 코드 생성 및 수정, 워크플로우등 어떤 작업을 수행하든 일관된 지침을 줄 수 있게된다.
	- Rules for AI는 Chat과 Prompt bar (cmd + K)에 적용되며, 2가지 유형의 Rule을 지원한다.
	- 1. Project Rules (.cursor/rules/.mdc)
		- 이전엔 패턴별 규칙으로 불렸으며, project rules는 markdown 형태의 파일로, 특정 파일 패턴을 대상으로 rule을 적용 할 수 있다.
		- Rule type
			- Always: 	항상 모델 컨텍스트에 포함됨
			- Auto Attached: Glob Pattern과 일치하는 파일이 참조될 때 포함됨
			- Agent Requested: AI가 규칙을 포함할지 여부를 결정. 사용자의 설명 제공필요
			- Manual: 명시적으로 언급된 경우에만 포함됨 예) @ruleName
		- .mdc 사용 예시
			- 코드베이스에 대한 도메인별 지식 제공
			- 프로젝트별 워크플로우 작성 또는 템플릿 자동화
			- 코드 스타일 (컨벤션) 또는 아키텍처 표준화
	- 2. User Rules (Cursor Settings > Rules)
		- 이전에는 글로벌 규칙으로 불렸으며, Cursor setting에서 설정가능한 모든 프로젝트에 적용되는 글로벌 Rule.
		- 사용예시
			- 응답 언어 또는 응답에 대한 톤 설정
			- 개인 코드 스타일 선호도에 따른 코드 생성
			- 결과 형식 지정

```python
<CORE_PRINCIPLES>
1. EXPLORATION OVER CONCLUSION
- Never rush to conclusions
- Keep exploring until a solution emerges naturally
- Question every assumption and inference

2. DEPTH OF REASONING
- Break down complex thoughts into simple steps
- Embrace uncertainty and revision
- Express thoughts in natural conversation

3. THINKING PROCESS
- Show work-in-progress thinking
- Acknowledge and explore alternatives
- Frequently reassess and revise
</CORE_PRINCIPLES>

<OUTPUT_FORMAT>
Responses must follow:
  <CONTEMPLATOR>
  - Begin with foundational observations
  - Question thoroughly
  - Show natural progression
  </CONTEMPLATOR>

  <FINAL_ANSWER>
  - Clear, concise summary
  - Note remaining questions
  </FINAL_ANSWER>
</OUTPUT_FORMAT>
```

3. Cursor를 활용하여 팀 프로젝트를 진행할때 아래처림 도메인별 규칙을 세워 정의할 수 있다.
```python
.cursor/rules/
  ├── rails8.mdc
  ├── models/
  │   ├── active_record.mdc
  │   └── postgresql.mdc
  ├── controllers/
  │   ├── api.mdc
  │   └── web.mdc
  └── views/
      ├── erb.mdc
      └── components.mdc
```

4. @symbol 활용
```python
# ❌ Bad
- Controllers should use service objects for complex business logic...

# ✅ Good
- Follow service object patterns defined in @docs/architecture/services.md
- See implementation examples in @docs/examples/service_objects/
```

5. 명시적인 Glob Pattern
```python
# ❌ Bad
Globs: **/*.rb

# ✅ Good
Globs:
  app/services/**/*.rb
  app/models/**/*.rb
  !app/models/legacy/**/*.rb  # Exclude legacy
```

6. Rule Combination
```python
# .cursor/rules/base_ruby.mdc
Description: Base Ruby standards

# .cursor/rules/rails_controllers.mdc
@base_ruby.mdc
Description: Controller-specific rules
Globs: app/controllers/**/*.rb
```

# Tips
- language server
- 