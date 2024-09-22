---
title: 다익스트라 알고리즘
date: 2024-08-20
draft: false
tags: 
complete: true
---
## Overview

최단 경로(Shortest path) 알고리즘은 길찾기 문제로, 말 그대로 특정 지점에서 특정 지점까지 가기 위한 최단 경로를 구하기 위한 알고리즘이다.

경로 계산 방식에도 아래와 같은 종류가 있다:
1. **(One-To-One)** 한 지점에서 다른 특정 지점까지의 최단경로 구하기
2. **(One-To-All)** 한 지점에서 다른 모든 지점까지의 최단경로 구하기
3. **(All-To-All)** 모든 지점에서 모든 지점까지의 최단경로 구하기

다익스트라 알고리즘은 이 중 2번째 유형(One-To-All)의 대표적인 방법이다.

노드와 노드 사이에는 weight가 존재할 수 있습니다. 노드 사이의 거리라고도 생각할 수 있는데, **다익스트라 알고리즘은 간선의 weight가 양수인 경우에만 작동**합니다.
#### 음의 가중치가 있으면 안되는 이유

![|335](https://blog.kakaocdn.net/dn/w3YOl/btseqYtnVTb/eXiKh88Gs0zNV1JLHm4PYk/img.png)

다음과 같은 경우에 다익스트라 알고리즘은 A->B->D 총 비용 22가 가장 최소 경로라고 생각 할 것입니다.  
하지만 A->B->C->D가 총-90 으로 값이 더 작습니다.

하지만 현실 세계에서 음의 간선은 존재하지 않기 때문에 다익스트라 알고리즘은 현실 세계의 문제들에 적절히 적용될 수 있습니다. 실제로 인공위성 GPS📡 등에 가장 많이 사용되고 있기도 합니다.

다익스트라 알고리즘은 **그리디**로 분류하기도 합니다.  
매 순간 가장 짧은 거리를 선택하면서 최단 거리를 찾기 때문입니다.

## Mechanism
keyword: 최단 거리 테이블, 인접 노드중 방문하지 않은 노드, 거리가 가장 짧은 노드
1. `출발 노드`와 `도착 노드`를 설정하여 **"최단 거리 테이블"** 을 초기화한다.
2. 현재 위치한 노드의 **인접 노드 중에서 방문하지 않은 노드들 중 거리가 가장 짧은 노드를 선택**한다. (방문 처리)
3. 해당 노드를 거쳐 다른 노드로 가는 비용을 계산하여 최단 거리 테이블을 갱신한다.
    - 갱신 : 현재 테이블의 최단거리보다, 해당 노드를 거쳐가는 비용이 작으면 작은 경로로 교체
4. 2번과 3번 과정을 반복한다.

#### init
최단거리 테이블은 각 노드에 대해 주어지며, 각 값들은 1번 노드에서 x번 노드로 가는 최단 경로를 의미합니다.  
처음에는 1번노드에서 자기 자신의 거리는 0이고, 나머지는 무한(INF)값으로 초기화합니다.

![|475](https://i.imgur.com/gFjD7y2.png)

#### step 1
![|500](https://i.imgur.com/E6Xpvur.png)
출발 노드인 1번 노드를 선택하고, 인접 노드인 2번과 3번의 거리를 계산하여 갱신합니다. 아직까지는 무한값이 들어있으니 각각 3과 4로 테이블 값이 업데이트 됩니다.

#### step 2
##### 2.1
![|475](https://i.imgur.com/3keAC4s.png)

방문하지 않은 노드 중 가장 짧은 최단거리 노드인 2번을 선택하고, 2번 노드를 거쳐갈 수 있는 다른 노드들의 테이블 값을 갱신합니다. 3,4,6번 노드가 이에 해당합니다.

이때, 3번 노드는 1번 노드를 거치는 것은 더 비용이 싸므로 업데이트를 하지 않습니다. 
하지만, **4번과 6번은 기존에 무한값이 들어있었기 때문에** 2번 노드를 거치는 경로의 비용으로 테이블 값을 업데이트합니다.

이제 3,4,6 번 노드 중에서 가장 짧은 최단거리 노드인 3번을 선택하고,
2번 과정 (**인접 노드 중에서 방문하지 않은 노드들 중 거리가 가장 짧은 노드를 선택**) 을 반복합니다.

##### 2.2
![|575](https://i.imgur.com/SZZr6OW.png)
3번 노드에 대해서도 아직 방문하지 않은 4번과 5번의 최단 거리를 갱신해줍니다.

따라서 4번 노드의 테이블 값은 13 -> 12로 갱신됩니다.

#### step 3
![|500](https://i.imgur.com/BkgsCwX.png)
위 과정을 반복하면 최종 테이블은 위와 같습니다.

1번 노드에서 2~8번 노드까지의 최단 거리를 모두 구했습니다. 
최단 거리는 8번 테이블의 값인 14를 리턴하면 됩니다.


## Code
- heapq 사용
- 2차원 그래프 사용
- 무한 변수 설정

init
```python
def init(n, m, start):
    """
    그래프, 저장 테이블 생성
    :param n: 노드 개수
    :param m: 엣지 개수
    :param start: 시작 노드
    :return:
    """
    INF = int(1e9)
    graph = [[] for i in range(n + 1)]
    distance = [[INF, i] for i in range(n + 1)]  # 최단 거리 + 부모 노드 저장 테이블 생성

    # 양방향 입력
    # 노드 1와 노드 2의 비용 3
    for _ in range(m):
        start_node, end_node, weight = map(int, input().split())
        graph[start_node].append((end_node, weight))
        graph[end_node].append((start_node, weight))

    return graph, distance
```

checking graph & dist
```python
# edge input
1 2 3
1 3 4
2 3 5
2 4 10
2 6 9
3 4 8
3 5 5
4 5 6
4 6 10
4 8 3
5 4 6
5 7 4
6 8 2
7 8 5

results = init(8, 14, 1)
graph = results[0]
distance = results[1]
print(graph, '\n', distance)

# graph
[
 [], # start node (1)
 [(2, 3), (3, 4)],  # 노드 1의 간접 노드인 2와 3의 edge --> graph[1]
 [(1, 3), (3, 5), (4, 10), (6, 9)],
 [(1, 4), (2, 5), (4, 8), (5, 5)],
 [(2, 10), (3, 8), (5, 6), (6, 10), (8, 3), (5, 6)],
 [(3, 5), (4, 6), (4, 6), (7, 4)],
 [(2, 9), (4, 10), (8, 2)],
 [(5, 4), (8, 5)],
 [(4, 3), (6, 2), (7, 5)]
] 

# distance (1000000000는 inf)
[
 [1000000000, 0],
 [1000000000, 1],
 [1000000000, 2],
 [1000000000, 3],
 [1000000000, 4],
 [1000000000, 5],
 [1000000000, 6],
 [1000000000, 7],
 [1000000000, 8]
]
```


dijkstra
```python
def dijkstra(graph, distance, start):  
    """  
    다익스트라 알고리즘  
    :param graph: 순회할 그래프  
    :param distance: 최단 거리와 부모 노드를 저장한 테이블  
    :param start: 시작 노드  
    :return: distance[-1][0] 최단 거리
    :distance[node][0]: 노드의 거리  
	:distance[node][1]: 노드 번호
	:visted[0]: 방문한 노드의 거리  
	:visted[1]: 방문한 노드의 번호
    """    
    visited = []  
    heapq.heappush(visited, (0, start))  # (거리, 노드) 형식으로 저장
    distance[start][0] = 0  
  
    while visited:  # 방문할 노드가 없을 때 까지 반복
        dist, cur_node = heapq.heappop(visited)  # 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기

        if distance[cur_node][0] < dist:  # 현재 처리된 적이 있는 노드 라면 pass
            continue

        for edge in graph[cur_node]:  # 현재 노드와 연결된 다른 인접한 노드 들을 확인
            node = edge[0]
            weight = edge[1]
            cost = dist + weight

            if cost < distance[node][0]:  # 현재 노드를 거쳐서, 다른 노드로 이동 하는 거리가 더 짧은 경우
                distance[node][0] = cost  # 최단 거리 갱신
                distance[node][1] = cur_node  # 부모 노드 저장
                heapq.heappush(visited, (cost, node))
  
    return distance[-1][0]
```

```python
print(dijkstra(graph, distance, 1))
>> 14
```