---
title: Langchain Basics
date: 2025-04-05
draft: false
tags:
  - Langchain
  - Agents
  - LLM
complete: true
link: https://python.langchain.com/docs/tutorials/
---
# 1. LLM 시작하기
## Prompt의 세가지 형태
- SystemMessage: LLM에게 역할을 부여하는 메세지
- HumanMessage: LLM에게 전달하는 사용자의 메세지 (ChatGPT같은 일반적인 프롬프트의 형태)
- AIMesage: LLM이 출력한 메세지

```python
from langchain.prompts import HumanMessagePromptTemplate
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI

chat_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
       "You are a helpful assistant that re-writes the user's text to sound more upbeat."
            )
        ),
        HumanMessagePromptTemplate.from_template("{text}"),
    ]
)
messages = chat_template.format_messages(text="I don't like eating tasty things")
print(messages)
```

### Temperature
```python
#API KEY 저장을 위한 os 라이브러리 호출
import os

#OPENAI API키 저장
os.environ["OPENAI_API_KEY"]="YOUR_OPENAI_API_KEY"

#Temperature=0
chatgpt_temp0_1 = ChatOpenAI(model_name="gpt-4o-mini", temperature = 0)
chatgpt_temp0_2 = ChatOpenAI(model_name="gpt-4o-mini", temperature = 0)

#Temperature=1
chatgpt_temp1_1 = ChatOpenAI(model_name="gpt-4o-mini", temperature = 1)
chatgpt_temp1_2 = ChatOpenAI(model_name="gpt-4o-mini", temperature = 1)

model_list = [chatgpt_temp0_1, chatgpt_temp0_2, chatgpt_temp1_1, chatgpt_temp1_2]

for i in model_list:
    answer = i.invoke("왜 파이썬이 가장 인기있는 프로그래밍 언어인지 한 문장으로 설명해줘", max_tokens = 128)
    print("-"*100)
    print(">>>",answer.content)
```

### Stream
```python
from langchain_openai import ChatOpenAI
chat = ChatOpenAI(model_name="gpt-4o-mini", temperature = 0)
for chunk in chat.stream("달에 관한 시를 써줘"):
    print(chunk.content, end="", flush=True)
```

### Caching
```python
from langchain.globals import set_llm_cache #캐시메모리 라이브러리 호출
from langchain_openai import ChatOpenAI

chat = ChatOpenAI(model_name="gpt-4o-mini", temperature = 0)
```

```python
%%time 
#셀 실행 시간 측정
from langchain.cache import InMemoryCache
set_llm_cache(InMemoryCache()) #캐시메모리 설정

chat.invoke("일반상대성 이론을 한마디로 설명해줘")
```

```python
%%time
#같은 질문 전달
chat.invoke("일반상대성 이론을 한마디로 설명해줘")
```


## PromptTemplate vs ChatPromptTemplate
- PromptTemplate: 사용자 입력을 활용하여 원하는 형태로 가공
- ChatPromptTemplate: PromptTemplate에서 SystemMessage와 HumanMessage, AIMessage가 추가된것.
결국 둘의 차이는 ‘챗봇에 역할 부여가 가능한가?’ ‘대화에 맥락을 추가할 수있는가?’로 구분될 수 있다.

```python
from langchain.prompts import PromptTemplate

prompt= (
    PromptTemplate.from_template(
        """
        너는 요리사야. 내가 가진 재료들을 갖고 만들 수 있는 요리를 {개수}추천하고,
        그 요리의 레시피를 제시해줘. 내가 가진 재료는 아래와 같아.
        <재료>
        {재료}
        """
        )
    )

prompt
prompt.format(개수= 3, 재료="사과, 양파, 계란")
```

### difference
```python
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
prompt = SystemMessage(content=
        """
        너는 항상 밝은 말투로 대화하는 챗봇이야. 답변의 끝에 이모티콘을 붙여줘.
        """
        )
new_prompt = (
    prompt
    + HumanMessage(content=
                          """
                          오늘은 날씨가 어때?
                          """)
    + AIMessage(content=
                         """
                         오늘은 날씨가 아주 좋아요!
                         """)
    + """{input}"""
)
new_prompt.format_messages(input = "오늘 너의 기분은 어때?")
```

### chain
PromptTemplate을 설정하고 LLM에게 전달할수있음. 
```python
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
prompt = SystemMessage(content=
        """
        너는 항상 밝은 말투로 대화하는 챗봇이야. 답변의 끝에 이모티콘을 붙여줘.
        """
        )
new_prompt = (
    prompt
    + HumanMessage(content=
                          """
                          오늘은 날씨가 어때?
                          """)
    + AIMessage(content=
                         """
                         오늘은 날씨가 아주 좋아요!
                         """)
    + """{input}"""
)
new_prompt.format_messages(input = "오늘 너의 기분은 어때?")
```

```python
import os
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI

os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

model = ChatOpenAI(model = 'gpt-4o-mini')
chain = LLMChain(llm=model, prompt=new_prompt)
chain.invoke("오늘 너의 기분은 어때?")
```

### FewShotPromptTemplate
llm이 결과물을 출력할 때 예시 결과물을 제시함으로써 원하는 결과물로 유도하는 방법론이다.
내가 원하는 결과물의 형태가 특수하거나, 구조화된 답변을 원할 경우, 결과물의 예시를 여러개 제시함으로써 결과물의 품질 향상이 가능.
**원래 ChatGPT가 못하거나 모르는 분야였는데, 이예제를 통해 가능하다는것이 few-shot의 큰 장점이다.**

```python
from langchain.prompts.few_shot import FewShotPromptTemplate
from langchain.prompts.prompt import PromptTemplate
examples = [
    {
        "question": "아이유로 삼행시 만들어줘",
        "answer":
                """
                아: 아이유는
                이: 이런 강의를 들을 이
                유: 유가 없다.
                """
    }
]

example_prompt = PromptTemplate(
                                input_variables=["question", "answer"],
                                template="Question: {question}\n{answer}"
                                )

print(example_prompt.format(**examples[0]))
```

```python
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    suffix="Question: {input}",
    input_variables=["input"]
)

print(prompt.format(input="호날두로 삼행시 만들어줘"))
```

### Partial Prompt
템플릿에 들어가는 매개변수를 따로따로 입력받고싶을때 사용

```python
from langchain.prompts import PromptTemplate

prompt = PromptTemplate.from_template("나이: {age} \n직업: {job}")
partial_prompt = prompt.partial(age="20")
print(partial_prompt.format(job="개발자"))
```

```python
from datetime import datetime


def _get_datetime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y, %H:%M:%S")
```

```python
prompt = PromptTemplate(
    template="Tell me a {adjective} joke about the day {date}",
    input_variables=["adjective", "date"],
)
partial_prompt = prompt.partial(date=_get_datetime)
print(partial_prompt.format(adjective="funny"))
```

## Output Parser
ChatGPT의 경우 대화에 특화되어있어 정해진 형식으로 답변을 받는것이 꽤 어렵다.
이러한 단점을 극복하기 위해 일반적으로 선택하는 해결책은 프롬프트 엔지니어링이다.

예) 영화 추천 AI 앱을 만든다고 했을때, AI가 추천해주는 영화 제목들은 일반 텍스트가 아니라 리스트 형태로 보여줘야한다.
이를 가정하고 ChatPromptTemplate 기반의 프롬프트 엔지니어링 후 LLM API로 리스트 형태의 답변을 받을 수 있다.

```python
import os
from langchain_openai import ChatOpenAI
from langchain.prompts import HumanMessagePromptTemplate
from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate

os.environ["OPENAI_API_KEY"] = "YOUR_OPENAI_API_KEY"

llm = ChatOpenAI(model_name="gpt-4o-mini",
                 temperature = 0)

#ChatPromptTemplate에 SystemMessage로 LLM의 역할과 출력 형식 지정
chat_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
                "너는 영화 전문가 AI야. 사용자가 원하는 장르의 영화를 리스트 형태로 추천해줘."
                'ex) Query: SF영화 3개 추천해줘 / 답변: ["인터스텔라", "스페이스오디세이", "혹성탈출"]'
            )
        ),
        HumanMessagePromptTemplate.from_template("{text}"),
    ]
)
messages = chat_template.format_messages(text="스릴러 영화 3개를 추천해줘.")
answer = llm.invoke(messages)
result = answer.content
print(result)
```

### CSV Output Parser
```python
from langchain.output_parsers import CommaSeparatedListOutputParser
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
#CSV 파서 선언
output_parser = CommaSeparatedListOutputParser()
#CSV 파서 작동을 위한 형식 지정 프롬프트 로드
format_instructions = output_parser.get_format_instructions()
#프롬프트 템플릿의 partial_variables에 CSV 형식 지정 프롬프트 주입
prompt = PromptTemplate(
    template="List {number} {subject}. answer in Korean \n{format_instructions}",
    input_variables=["subject", "number"],
    partial_variables={"format_instructions": format_instructions},
)

model = ChatOpenAI(temperature=0)

#프롬프트템플릿-모델-Output Parser를 체인으로 연결
chain = prompt | model | output_parser
chain.invoke({"subject": "공포 영화", "number": "4"})
```

### Datetime Parser
```python
from langchain.output_parsers import DatetimeOutputParser
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI

output_parser = DatetimeOutputParser()

template = """
    Answer the users question:
    {question}

    {format_instructions}
"""

prompt = PromptTemplate.from_template(
    template,
    partial_variables={"format_instructions": output_parser.get_format_instructions()},
)

model = ChatOpenAI(temperature=0)

chain = prompt | model | output_parser
output = chain.invoke({"question": "비트코인은 언제 개발됐어?"})
print(output)
```

```python
output_parser.get_format_instructions()
```

### JsonOutputParser
```python
from typing import List
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

# Define your desired data structure.
class Country(BaseModel):
    continent: str = Field(description="사용자가 물어본 나라가 속한 대륙")
    population: str = Field(description="사용자가 물어본 나라의 인구(int 형식)")

# And a query intented to prompt a language model to populate the data structure.
country_query = "아르헨티나는 어떤 나라야?"

# Set up a parser + inject instructions into the prompt template.
parser = JsonOutputParser(pydantic_object=Country)

prompt = PromptTemplate(
    template="Answer the user query.\n{format_instructions}\n{query}\n",
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

model = ChatOpenAI(temperature=0)

chain = prompt | model | parser
chain.invoke({"query": country_query})
```



# 6. LangGraph
https://www.youtube.com/watch?v=9dXp5q3OFdQ&list=PLfaIDFEXuae16n2TWUkKq5PgJ0w6Pkwtg&index=2

## StateGraph
langgraph로 메뉴 추천 시스템을 만들어본다:
- 사용자의 선호도에 따라 메뉴를 추천하고, 메뉴에 대한 정보를 제공
### 1. State
- 상태는 그래프가 처리하는 데이터의 구조를 정의
- 기존 상태를 override (덮어쓰기)
```python
from typing import TypedDict

class MenuState(TypedDict):
    user_preference: str
    recommended_menu: str
    menu_info: str
```

### 2. Node
- 노드는 그래프에서 실제 작업을 수행하는 함수
```python
import random

def get_user_preference(state: MenuState) -> MenuState:
    print("---랜덤 사용자 선호도 생성---")
    preferences = ["육류", "해산물", "채식", "아무거나"]
    preference = random.choice(preferences)
    print(f"생성된 선호도: {preference}")
    return {"user_preference": preference}

def recommend_menu(state: MenuState) -> MenuState:
    print("---메뉴 추천---")
    preference = state['user_preference']
    if preference == "육류":
        menu = "스테이크"
    elif preference == "해산물":
        menu = "랍스터 파스타"
    elif preference == "채식":
        menu = "그린 샐러드"
    else:
        menu = "오늘의 쉐프 특선"
    print(f"추천 메뉴: {menu}")
    return {"recommended_menu": menu}

def provide_menu_info(state: MenuState) -> MenuState:
    print("---메뉴 정보 제공---")
    menu = state['recommended_menu']
    if menu == "스테이크":
        info = "최상급 소고기로 만든 juicy한 스테이크입니다. 가격: 30,000원"
    elif menu == "랍스터 파스타":
        info = "신선한 랍스터와 al dente 파스타의 조화. 가격: 28,000원"
    elif menu == "그린 샐러드":
        info = "신선한 유기농 채소로 만든 건강한 샐러드. 가격: 15,000원"
    else:
        info = "쉐프가 그날그날 엄선한 특별 요리입니다. 가격: 35,000원"
    print(f"메뉴 정보: {info}")
    return {"menu_info": info}
```


### 3. Graph
```python
from langgraph.graph import StateGraph, START, END

# 그래프 빌더 생성
builder = StateGraph(MenuState)

# 노드 추가
builder.add_node("get_preference", get_user_preference)
builder.add_node("recommend", recommend_menu)
builder.add_node("provide_info", provide_menu_info)

# 엣지 추가
builder.add_edge(START, "get_preference")
builder.add_edge("get_preference", "recommend")
builder.add_edge("recommend", "provide_info")
builder.add_edge("provide_info", END)

# 그래프 컴파일
graph = builder.compile()
```
#### Visualization
```python
from IPython.display import Image, display

# 그래프 시각화
display(Image(graph.get_graph().draw_mermaid_png()))
```

#### Run Graph
```python
# 그래프 실행
def print_result(result: MenuState):
    print("\n=== 결과 ===")
    print("선호도:", result['user_preference'])
    print("추천 메뉴:", result['recommended_menu'])
    print("메뉴 정보:", result['menu_info'])
    print("============\n")


# 초기 입려
inputs = {"user_preference": ""}

# 여러 번 실행하여 테스트 
for _ in range(2):
    result = graph.invoke(inputs)
    print_result(result)
    print("*"*100)
    print()
```

```python
---랜덤 사용자 선호도 생성---
생성된 선호도: 아무거나
---메뉴 추천---
추천 메뉴: 오늘의 쉐프 특선
---메뉴 정보 제공---
메뉴 정보: 쉐프가 그날그날 엄선한 특별 요리입니다. 가격: 35,000원

=== 결과 ===
선호도: 아무거나
추천 메뉴: 오늘의 쉐프 특선
메뉴 정보: 쉐프가 그날그날 엄선한 특별 요리입니다. 가격: 35,000원
============

****************************************************************************************************

---랜덤 사용자 선호도 생성---
생성된 선호도: 육류
---메뉴 추천---
추천 메뉴: 스테이크
---메뉴 정보 제공---
메뉴 정보: 최상급 소고기로 만든 juicy한 스테이크입니다. 가격: 30,000원

=== 결과 ===
선호도: 육류
추천 메뉴: 스테이크
...
============

****************************************************************************************************
```

## Branching
