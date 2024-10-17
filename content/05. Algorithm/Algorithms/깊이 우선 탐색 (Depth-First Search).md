---
title: 깊이 우선 탐색 (Depth-First Search)
date: 2024-08-12
draft: false
tags:
  - Algorithm
  - GraphAlgorithm
complete: true
link: https://data-marketing-bk.tistory.com/entry/DFS-%EC%99%84%EB%B2%BD-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%ED%8C%8C%EC%9D%B4%EC%8D%AC
---
### 1. DFS의 기본 개념
**(1) 기본개념**
DFS란 Depth first search의 약자로서 **그래프 자료에서 데이터를 탐색하는 알고리즘**입니다. 
한 번 예시를 들어 보겠습니다. 

![|525](https://www.fun-coding.org/00_Images/BFSDFS.png)

오른쪽에 보이다 싶이 A부터 J까지 노드가 연결되어 있는 그래프 자료를 볼 수 있습니다. 그래프에서 특정 노드를 찾으려고 할 때, 위에서 부터 찾느냐 혹은 옆에서부터 찾느냐 그 차이가 있겠죠.

위에서 아래로 찾는 방식을 바로 DFS(Depth First Search)라고 부르는 것입니다. 

BFS(Breadth First Search)는 차후 포스팅에서 다루도록 하겠습니다. 

참고로 위에서 아래로 탐색할 때 왼쪽으로 가냐 오른쪽으로 가냐는 전혀 상관 없습니다~

데이터 입력하기 귀찮으신 분들은 아래의 코드 복붙해주세요.

```python
def init() -> dict:
    graph = dict()

    graph['A'] = ['C', 'B']
    graph['B'] = ['D', 'A']
    graph['C'] = ['I', 'H', 'G', 'A']
    graph['D'] = ['F', 'E', 'B']
    graph['E'] = ['D']
    graph['F'] = ['D']
    graph['G'] = ['C']
    graph['H'] = ['C']
    graph['I'] = ['J', 'C']
    graph['J'] = ['I']

    return graph
```


**(2) DFS의 기본 원칙**

DFS에서 데이터를 찾을 때는 항상 **"앞으로 찾아야 가야할 노드"와 "이미 방문한 노드"를 기준으로 데이터를 탐색**을 합니다.

이 원칙을 **반드시 기억**해주셔야 해요. 

그래서 특정 노드가 "앞으로 찾아야 가야할 노드"라면 계속 검색을 하는 것이고, "이미 방문한 노드"면 무시하거나 따로 저장하면 됩니다. 

**(3) DFS의 구현 방식**

DFS를 구현할 때는 기본적으로 **"스택/큐"를 활용**할 수도 있고, **"재귀함수를 통해 구현**할 수도 있습니다. 두 가지 방법 모두 아래의 부분에서 소개해드리도록 하겠습니다.

###  2. 스택/큐를 활용한 DFS 구현

**(1) 리스트를 활용한 DFS 구현**

여기서는 need_visited에서 추가된 Node들 중에서 가장 끝에 있는 것을 뽑아서 검색하는 방식입니다. 바로 이것이 "스택"을 활요한 방식이죠.

파이썬은 굉장히 편한 언어라서 리스트로도 쉽게 구현할 수 있습니다. 다만 l**ist에서 pop을 활용하면 성능면에서 떨어지는 단점**이 있어요. 

```python
def dfs_list(graph: dict, start_node: str):
    need_visited, visited = list(), list()

    need_visited.append(start_node)

    while need_visited:
        node = need_visited.pop()

        if node not in visited:
            visited.append(node)
            need_visited.extend(graph[node])

    return visited
```

스택/큐를 활용한 DFS

**(2) deque를 활용한 DFS 구현** 
![](https://blog.kakaocdn.net/dn/IWPlx/btrDnkM4DIC/MzC8xHiE2eBKt5OtrKm2rK/img.png)

스택/큐를 구현할 때는 collections라는 패키지에서 deque를 활용하시는 것을 추천드립니다. 

논리는 거의 동일합니다만, **성능면에서 list() 형태보다 deque형태가 훨씬 좋아요**!!


### 3. 재귀함수를 통한 DFS 구현
![](https://blog.kakaocdn.net/dn/tQ1Pf/btqUZumBjMd/GeM2IPOhrEIhzIEgxWMuV1/img.png)

재귀함수를 활용한 DFS

재귀함수를 통해서 DFS를 구현해봤습니다. 

특징 정인 것은 visited 자료형을 기본 함수 인자로 포함시키고, 방문한 리스트들을 재귀함수를 통해서 계속 visited에 담는 방식입니다. 

훨씬 단순한 구조이지만, 재귀함수를 이해하지 못 하면 어려워 보일 수도 있죠. 저는 개인적으로 재귀함수를 DFS 구현할 때 많이 활용합니다.