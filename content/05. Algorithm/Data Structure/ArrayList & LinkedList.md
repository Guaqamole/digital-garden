---
title: ArrayList & LinkedList
date: 2023-12-09
draft: false
tags:
  - DataStructure
complete: true
---
## Array(배열)
![](https://i.imgur.com/LDt8YAm.png)

가장 기본적인 자료구조

- **순차 자료구조**
    - 메모리의 연속 공간에 값이 채워져 있는 형태의 간단한 자료구조
    - 논리적인 저장순서와 물리적인 저장순서가 일치한다.
- 인덱스를 사용하여 바로 값에 접근 가능하여 조회 속도가 빠르다.
- 새로운 값을 삽입하거나 특정 인덱스에 있는 값을 삭제하기 어렵다.
    - 값을 삽입/삭제 하려면 주변 값들을 이동시키는 과정이 필요하다.
    - 값 삭제 시 해당 index는 null로 계속 남는다.
- 배열의 크기는 선언할 때 지정할 수 있으며, 정적 할당(static allocation)으로 한번 선언하면 수정이 불가능하다. `int[] array = new int[10];`
- 제네릭 사용이 불가하다.
- 배열의 크기 변경이 불가능하기 때문에, 처음에 너무 큰 크기로 설정해주었을 경우 메모리가 낭비 될 수 있고,반대로 너무 적게 설정했을 경우 공간이 부족해지는 경우가 발생할 수 있다.



## ArrayList
![](https://i.imgur.com/2Pn9ib2.png)
내부에 고정된 length의 Object 배열을 이용하여 요소를 저장한다.

![](https://i.imgur.com/YU1mDFR.png)
- 동적할당(dynamic allocation)으로 길이가 가변적이다.
    
- capacity : 내부 배열의 공간을 말하는 것
    
    size : 배열에 있는 요소의 개수를 뜻하는것
    
- 내부 배열의 용량
    
    - 최소값은 10
    - ![](https://i.imgur.com/dMjHMYz.png)
최대값 Integer.MAX_VALUE

최대값을 초과하여 삽입(add)요청 시 OOM에러가 발생한다.

![](https://i.imgur.com/MEXvbnk.png)

- 최대값을 초과하지 않고 기존 생성된 배열 사이즈보다 더 많은 요소 삽입 시 `(기존 사이즈 + 기존사이즈 /2)` 사이즈의 배열을 새로 생성하여 기존 배열을 복사한다.
- 삽입 / 삭제
    - null값은 허용하나 빈 공간은 허용하지 않음
    - 삭제가 일어나면 빈 공간을 메꾸기 위해 뒤 원소들을 앞으로 당겨오는 작업이 이루어진다.
    - 인덱스를 지정한 삽입 시에도 뒤에 원소를 하나씩 뒤로 미루는 작업이 이루어진다.
- 인덱스로 직접 접근하여 바로 조회가 가능하기때문에 조회 성능이 좋다.


## Linked List

#### 단방향 연결 리스트(singly linked list)
![](https://i.imgur.com/Gkp15nL.png)
- 다음 노드를 가리키기 위한 포인터 필드(next)만 가지고 있는 링크드 리스트
- 이전 노드를 모르기에 접근이 어려움

#### 양방향 연결 리스트(doubly linked list)
![](https://i.imgur.com/99F8hb0.png)
- 다음 노드와 이전 노드 주소를 위판 포인터 필드를 가지고 있는 링크드 리스트
- 각 요소에 대한 접근과 이동이 쉽다.
- 우리가 쓰는 java 컬렉션 프레임워크에 구현된 LinkedList는 양방향 연결리스트로 구현되어 있다.

#### 양방향 원형 연결 리스트(doubly circular linked list)
![](https://i.imgur.com/r9shcCM.png)
양방향 연결리스트와 비슷하나 처음 노드와 마지막 노드를 각각 연결시켜 마치 원형 리스트처럼 만들었다고 보면 된다.


#### Java LinkedList
![](https://i.imgur.com/i2cCRxD.png)
- 각각의 원소를 Node라고 한다.
    - Node 내부 item 필드에 LinkedList에 저장하고자 하는 타입의 객체를 저장
    - next와 prev 필드를 통해 자신의 이전과 다음 노드 원소를 기억한다.
    - 이러한 참조자(next나 prev같은 노드정보)를 위한 추가적인 메모리 할당이 필요하다.
- 코드 내의 Node 클래스 구조
- ![](https://i.imgur.com/2ORfFBp.png)
head 노드  prev == null
![](https://i.imgur.com/0SflEUG.png)

tail 노드 next == null
![](https://i.imgur.com/nBDINUG.png)

- 인덱스로 탐색 시 (전체 사이즈/2) 기준으로 순회 기준 설정
    - index < (전체 사이즈 /2) ==> 첫번째 노드부터 순회
    - index >= (전체 사이즈 /2) ==> 마지막 노드부터 순회
![](https://i.imgur.com/PLIIN4Z.png)

- 미리 정의된 용량(capacity)의 개념이 없다.
    - 리사이징 필요X
    - size가 int로 선언되어있는것으로 보아 Integer값은 넘을 수 없을 듯
- 조회 성능이 떨어진다.
    - ArrayList는 index로 직접 접근이 가능
    - LinkedList는 index로 조회 시 첫번째 순서(head) 혹은 마지막 순서(tail)에서부터 순차적으로 접근한다.
- 삽입 / 삭제 시 포인터만 변경하면 돼서 성능이 좋다고는 하나
- 중간 인덱스에 삽입/삭제 시 해당 인덱스까지 찾아가는 비용이 있어 성능이 좋다고만은 할 수 없다.