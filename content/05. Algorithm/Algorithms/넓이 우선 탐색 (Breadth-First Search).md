---
title: 넓이 우선 탐색 (Breadth-First Search)
date: 2024-08-19
draft: false
tags:
  - Algorithm
  - GraphAlgorithm
complete: true
---
### **1. BFS 기본 개념** 

BFS란 그래프 자료 구조에서 원하는 자료를 찾는 탐색 알고리즘 중에 하나입니다. 

자료를 찾을 때 "수직" 방향으로 자료를 검색할 수도 있고, **"수평" 방향으로 자료를 검색**할 수 있는데, BFS는 이름에서 추론할 수 있듯이, "수평방향"으로 원하는 노드를 탐색하는 알고리즘입니다. 

![](https://www.fun-coding.org/00_Images/BFSDFS.png)

### **2. BFS 구현 원리**

BFS를 구현하기 위해서는 항상 "방문하고자 하는 노드"와 "방문했던 노드"를 나누어서 알고리즘을 구성하는 것이 핵심 원리입니다. 

논리를 3단계로 요약하면 다음과 같습니다. 

1단계. 시작 노드를 방문했던 노드에 삽입한다. 
2단계. 방문할 노드에 시작노드의 Child Node를 삽입한다. 
3단계. Child노드를 중심으로 다시 1~2단계를 거쳐 탐색한다. 

### **3. BFS 구현 코드**

파이썬에서는 간편하게 리스트 자료 구조를 활용하여 BFS를 구현할 수 있습니다. 

**(1) 기반 데이터 - 그냥 복붙하세요** 

```python
graph = dict()
 
graph['A'] = ['B', 'C']
graph['B'] = ['A', 'D']
graph['C'] = ['A', 'G', 'H', 'I']
graph['D'] = ['B', 'E', 'F']
graph['E'] = ['D']
graph['F'] = ['D']
graph['G'] = ['C']
graph['H'] = ['C']
graph['I'] = ['C', 'J']
graph['J'] = ['I']
```

**(2) 구현 코드** 

```python
def bfs(graph, start_node):
    need_visited, visited = [], []
    need_visited.append(start_node)
        
    while need_visited:
        node = need_visited[0]
        del need_visited[0]
        
        if node not in visited:
            visited.append(node)
            need_visited.extend(graph[node])
    return visited
```

BFS와 DFS의 가장 큰 차이점은 **While문 다음에 어떤 자료를 우선적으로 추출**하느냐 입니다. 

DFS 같은 경우 리스트의 가장 끝에 있는 데이터를 기준으로 추출하지만, 

**BFS는 리스트의 가장 처음에 있는 인자를 받습니다.** 

그래서 `need_visited[0]` 이라는 코드를 작성한 것입니다. 
