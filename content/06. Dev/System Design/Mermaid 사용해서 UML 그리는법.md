---
title: Flowchart 작성법
date: 2023-11-20
draft: false
tags:
  - SystemDesign
  - Mermaid
complete: true
---

## 플로우차트 선언

먼저 mermaid 문법은 그리고자 하는 다이어그램을 선언합니다. 그리고 플로우차트 일 경우 그려질 방향을 선언합니다. 예제 코드는 아래와 같습니다. 아래 코드는 플로우차트를 그리고 그 방향은 왼쪽에서 오른쪽으로 향한다는 선언입니다.

```
flowchart LR
```

선언할 수 있는 방향은 아래와 같습니다.

- TB(= TD) : 위에서 아래로
- BT : 아래에서 위로
- RL : 오른쪽에서 왼쪽으로
- LR : 왼쪽에서 오른쪽으로

<br>

## 노드(Node) 선언

노드를 선언해보도록 하겠습니다. 플로우차트의 노드를 선언하게 되면 그래프로 해당 노드가 기본적으로 그려지게됩니다. 아래 코드는 플로우차트 선언 아래 노드를 하나 선언한 것입니다. id는 해당 노드를 가리키는 값이며 `[]` 사이에 있는 값은 해당 노드에 표시될 값입니다. 해당 값이 없으면 id가 노출됩니다.

```
flowchart LR
    id[구매]
```

위의 코드를 작성하게되면 아래와 같은 노드하나가 그려지게됩니다.

![](https://blog.kakaocdn.net/dn/vbZDM/btrp6Hok1KF/2xladwUQLOi5n8kMaJzmW1/img.png)

이 노드는 직사각형의 모습을 하고 있지만 어떻게 선언하냐에 따라서 다양한 형태의 노드를 선언할 수 있습니다. 

그 중에서 몇개를 보여드리자면 데이터베이스를 표현할때 많이 사용하는 실린더의 형태와 조건 분기에 많이 사용하는 마름모의 형태입니다.

```
flowchart LR
    id[(Database)]
```

![](https://blog.kakaocdn.net/dn/bkAEIO/btrp17BCzQe/PFoJ1kC3uXVjgNBm7OTgA1/img.png)

```
flowchart LR
    id{조건}
```

![](https://blog.kakaocdn.net/dn/tVZeu/btrp7Q6pWZg/DQxEKyOTcXAxoWZpWc9810/img.png)


<br>

### 간선(Edge) 선언

노드와 노드를 이어주는 간선을 선언해보도록 하겠습니다. 간선은 기본적으로 `-->`를 통해서 선언할 수 있습니다. 이렇게 선언하면 그래프로써 화살표가 있는 간선이 그려지게 됩니다. 아래 코드는 Service라는 이름을가진 A 노드에서 Database라는 이름을 가지고 있는 B 노드로의 화살표 간선이 생기는 플로우차트입니다. 그리고 B와 C 사이에는 방향이 없는 간선을 하나 두었습니다.

```
flowchart LR
    A[Service]
    B[(Database_1)]
    C[(Database_2)]
    A --> B --- C
```

![](https://blog.kakaocdn.net/dn/Pa7MR/btrp6wnkT6h/FIUeTpK5ZK9QPAct9Skc7K/img.png)

이런 간선 또한 여러 옵션들을 통해서 변환될 수 있습니다. 그중 몇가지만 알아보도록 하겠습니다. 먼저 아래 코드는 C와 id2사이에 간선을 점선 화살표의 형태로 가져가겠다라는 의미입니다.

```
flowchart LR
    C -.-> id2{box}
```

![](https://blog.kakaocdn.net/dn/bbmzUj/btrqdT19JM2/nwtZyVupCzzGyiex2gbku0/img.png)

그리고 간선에 텍스트를 추가하는 것도 가능합니다. 간선에 텍스트는 아래의 문법으로 추가할 수 있습니다.

```
flowchart LR
    A-->|의존|B
```

![](https://blog.kakaocdn.net/dn/bpXsMG/btrp6c3HD1U/kmhF533K75dv1MAq1JxO0K/img.png)

그리고 한 노드에서 여러개의 노드와 연결하는 것도 가능합니다. 아래는 A 노드를 B와 C에 연결하는 방법입니다. A,B,C를 각각 선언 한 후 아래에 A가 B를 바라본다는 것을 1개, 그리고 A가 C를 바라본다는 것을 1개 하여 추가할 수 있습니다.

```
flowchart LR
    A[Service]
    B[(Database_1)]
    C[(Database_2)]
    A-->B
    A-->C
```

![](https://blog.kakaocdn.net/dn/eMMNxu/btrqdTHQ4Jj/k3YWRuTCnZCwxH6ahUd2h1/img.png)

이외에도 좀 더 다양한 노드간의 연결방법을 알아보고 싶으신 분들은 [링크](https://mermaid-js.github.io/mermaid/#/flowchart?id=links-between-nodes)를 참고해주시기 바랍니다. 또한 이 외에도 중요하게 한번 보면 좋을 부분은 subGraph로 보여집니다. subGraph란 플로우차트안에 또 다른 플로우차트를 두는 것을 말합니다. 이 또한 공식문서에 자세하게 나와있습니다. 이용할 계획이 있으신 분들은 [링크](https://mermaid-js.github.io/mermaid/#/flowchart?id=subgraphs)를 이용하시면 됩니다.


## 예시
![](https://i.imgur.com/8JYoTSk.png)
```
---
title : 블랙잭 게임 진행
---

flowchart TD

    subgraph INIT[플레이어들 생성]
        A[이름 입력] --> B[플레이어 생성]
    end

    INIT --> PlayerDraw

    subgraph PlayerDraw[플레이어들 카드뽑기]
        C[카드 뽑기] --> Input

        Input[카드 뽑기 유무 입력 y,n] --> y
        y[카드를 뽑는다] --> |HIT| Player        
        Player[플레이어] --> isBust

        isBust[버스트인가?] --> |YES| END
        isBust --> |NO| Input

        Input --> n
        n --> |카드를 뽑지 않는다 STAND| END
    end    

    PlayerDraw --> DealerDraw

    subgraph DealerDraw[딜러 카드뽑기]
        Dealer[딜러] --> isUnder16[카드 합이 16 이하인가]

        isUnder16 --> |YES| draw --> isUnder16
        isUnder16 --> |NO| ENDDelar
    end

    DealerDraw --> Result

    subgraph Result[결과 출력하기]
        OutputDealr[딜러 결과 출력] --> OutputPlayers
        OutputPlayers[플레이어들 결과 출력] --> OutputResult
        OutputResult[최종 수익 출력]
    end
```
