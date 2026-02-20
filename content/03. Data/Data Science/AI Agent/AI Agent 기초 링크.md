---
title: AI Agent 기초
date: 2025-04-02
draft: false
tags: 
complete: true
---
## AI DATA
https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=133

## MCP
cursor AI + mcp: https://www.youtube.com/watch?v=VKIl0TIDKQg
mcp server remote: https://www.youtube.com/watch?v=ISrYHGg2C2c
https://github.com/teddynote-lab/mcp-usecase
## LangChain
https://wikidocs.net/book/14314
https://github.com/teddynote-lab/mcp-usecase
## Dify

## Vector Retreiver (Graph DB)
https://www.youtube.com/watch?v=FeAowtZB80w
https://uoahvu.tistory.com/entry/%EB%A7%9E%EC%B6%A4%ED%98%95-%EC%88%98%ED%95%99-%EB%AC%B8%ED%95%AD%EC%B6%94%EC%B2%9C%EC%9D%84-%EC%9C%84%ED%95%9C-Neo4j-Knowledge-Graph-%EA%B5%AC%EC%B6%95-%EB%B0%8F-%EC%B6%94%EC%B2%9C%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%ED%98%84-Cyper
https://uoahvu.tistory.com/entry/GraphRAG-Neo4j-%EC%83%9D%EC%84%B1%ED%98%95-AI-%ED%8C%A8%ED%82%A4%EC%A7%80Neo4j-GenAI%EB%A1%9C-%EC%98%81%ED%99%94-%EC%A0%95%EB%B3%B4-%EC%A7%88%EC%9D%98%EC%9D%91%EB%8B%B5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-Cypher-%EC%BF%BC%EB%A6%AC-%EC%9E%90%EB%8F%99-%EC%83%9D%EC%84%B1
## NLP
https://huggingface.co/learn/llm-course/chapter1/2

## Agent
https://huggingface.co/learn/agents-course/unit1/dummy-agent-library

## 프로젝트 할만한것
https://uoahvu.tistory.com/entry/GraphRAG-Neo4j-%EC%83%9D%EC%84%B1%ED%98%95-AI-%ED%8C%A8%ED%82%A4%EC%A7%80Neo4j-GenAI%EB%A1%9C-%EC%98%81%ED%99%94-%EC%A0%95%EB%B3%B4-%EC%A7%88%EC%9D%98%EC%9D%91%EB%8B%B5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-Cypher-%EC%BF%BC%EB%A6%AC-%EC%9E%90%EB%8F%99-%EC%83%9D%EC%84%B1

https://www.youtube.com/watch?v=FeAowtZB80w

- 회사 팀마다 맛집 DB 만들어서 사용자 선호도에 따라 메뉴추천하기
- 팀 선호도 → 팀마다 먹고싶은게 다를 수 있음
- 선호도 → 어떤게 땡기지? (맛이 땡길만한 요소들)
- 정적 선호도
	- 알러지
	- 
- 동적 선호도
	- 그날의 상태 (날씨, )
	- 인원수에따른 자리 이슈 → 붐비는 정도를 봐야함 → 모니터링 차트 보여주면 좋을듯?
	- 비선호 음식군 (전날에 먹은 음식, )