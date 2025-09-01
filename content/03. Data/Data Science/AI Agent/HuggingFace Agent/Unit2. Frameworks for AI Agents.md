---
title: Unit2. Frameworks for AI Agents
date: 2025-04-22
draft: false
tags:
  - HuggingFace
  - Agents
complete: true
link: https://huggingface.co/learn/agents-course/unit2/introduction
---
# 2.1 Smolagents
- 쉽고 빠르게 Agent 구축할때 사용
- code vs json action
## Intro
### Key Advantages of smolagents
- **Simplicity:** Minimal code complexity and abstractions, to make the framework easy to understand, adopt and extend
- **Flexible LLM Support:** Works with any LLM through integration with Hugging Face tools and external APIs
- **Code-First Approach:** First-class support for Code Agents that write their actions directly in code, removing the need for parsing and simplifying tool calling
- **HF Hub Integration:** Seamless integration with the Hugging Face Hub, allowing the use of Gradio Spaces as tools

### When to use smolagents?
With these advantages in mind, when should we use smolagents over other frameworks?

smolagents is ideal when:
- You need a **lightweight and minimal solution.**
- You want to **experiment quickly** without complex configurations.
- Your **application logic is straightforward.**

## Code Agent (Party Example)
- multi-step agent를 사용하여 party plan하는 예시를 만들어보자

### Agent Tool DuckDuckgo (Music)
```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel

agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=HfApiModel())

agent.run("Search for the best music recommendations for a party at the Wayne's mansion.")
```

### Custom Tool (Menu)
```python
from smolagents import CodeAgent, tool, HfApiModel

# Tool to suggest a menu based on the occasion
@tool
def suggest_menu(occasion: str) -> str:
    """
    Suggests a menu based on the occasion.
    Args:
        occasion (str): The type of occasion for the party. Allowed values are:
                        - "casual": Menu for casual party.
                        - "formal": Menu for formal party.
                        - "superhero": Menu for superhero party.
                        - "custom": Custom menu.
    """
    if occasion == "casual":
        return "Pizza, snacks, and drinks."
    elif occasion == "formal":
        return "3-course dinner with wine and dessert."
    elif occasion == "superhero":
        return "Buffet with high-energy and healthy food."
    else:
        return "Custom menu for the butler."

# Alfred, the butler, preparing the menu for the party
agent = CodeAgent(tools=[suggest_menu], model=HfApiModel())

# Preparing the menu for the party
agent.run("Prepare a formal menu for the party.")
```


### Using Python in Agents
```python
from smolagents import CodeAgent, HfApiModel
import numpy as np
import time
import datetime

agent = CodeAgent(tools=[], model=HfApiModel(), additional_authorized_imports=['datetime'])

agent.run(
    """
    Alfred needs to prepare for the party. Here are the tasks:
    1. Prepare the drinks - 30 minutes
    2. Decorate the mansion - 60 minutes
    3. Set up the menu - 45 minutes
    4. Prepare the music and playlist - 45 minutes

    If we start right now, at what time will the party be ready?
    """
)
```



### OpenTelemetry & Langfuse (debugging)
```python
pip install opentelemetry-sdk opentelemetry-exporter-otlp openinference-instrumentation-smolagents
```

```python
import os
import base64

LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_SECRET_KEY="sk-lf-..."
LANGFUSE_AUTH=base64.b64encode(f"{LANGFUSE_PUBLIC_KEY}:{LANGFUSE_SECRET_KEY}".encode()).decode()

os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "https://cloud.langfuse.com/api/public/otel" # EU data region
# os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "https://us.cloud.langfuse.com/api/public/otel" # US data region
os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = f"Authorization=Basic {LANGFUSE_AUTH}"
```

```python
from opentelemetry.sdk.trace import TracerProvider

from openinference.instrumentation.smolagents import SmolagentsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import SimpleSpanProcessor

trace_provider = TracerProvider()
trace_provider.add_span_processor(SimpleSpanProcessor(OTLPSpanExporter()))

SmolagentsInstrumentor().instrument(tracer_provider=trace_provider)
```

![](https://i.imgur.com/GZUBCcZ.png)

## Tool Calling Agent

### Code Agent vs Tool Calling
- While `smolagents` primarily focuses on `CodeAgents` since [they perform better overall](https://arxiv.org/abs/2402.01030),
- tool calling → `ToolCallingAgents` can be effective for simple systems that don’t require variable handling or complex tool calls.

Code Agent
```python
for query in [
    "Best catering services in Gotham City", 
    "Party theme ideas for superheroes"
]:
    print(web_search(f"Search for: {query}"))
```

Tool Calling
```python
[
    {"name": "web_search", "arguments": "Best catering services in Gotham City"},
    {"name": "web_search", "arguments": "Party theme ideas for superheroes"}
]
```


### example
```python

```