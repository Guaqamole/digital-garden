---
title: 정렬 알고리즘 (Sort Algorithms)
date: 2024-08-05
draft: false
tags:
  - Algorithm
  - SortAlgorithm
complete: true
link: https://wikidocs.net/233707, https://realpython.com/sorting-algorithms-python/
---
## Overview
![](https://i.imgur.com/tgj9f4C.png)

흔히 Bubble sort, Insertion sort는 평균 시간 복잡도 O(n2)O(n2)으로 느린 정렬 알고리즘, Merge sort, Heap sort, Quick sort는 평균 O(nlog⁡n)O(nlogn)으로 빠른 알고리즘으로 알려져 있다. 정렬의 성능을 파악하는 지표에 시간은 필수이므로 Merge sort, Heap sort, Quick sort를 사용하는 것이 좋을 것 같다. 이 세 개의 정렬 알고리즘 중 어떤 것을 표준 정렬 알고리즘으로 선정하는 것이 좋을까?

최선의 경우 O(n)O(n), 최악의 경우 O(nlog⁡n)O(nlogn)에 추가 메모리도 들지 않는 Heap sort가 제일 성능이 좋은 알고리즘이 아닐까 하는 생각이 들 수도 있지만 평균 시간 복잡도가 O(nlog⁡n)O(nlogn)이라는 의미를 좀 더 자세히 살펴볼 필요가 있다.

시간 복잡도가 O(nlog⁡n)O(nlogn)이라는 말은 실제 동작 시간은 C×nlog⁡n+αC×nlogn+α라는 의미이다. 상대적으로 무시할 수 있는 부분인 αα 부분을 제하면 nlog⁡n nlogn에는 앞에 CC라는 상수가 곱해져 있어 이 값에 따라 실제 동작 시간에 큰 차이가 생긴다. 이 CC라는 값에 큰 영향을 끼치는 요소로 '알고리즘이 **참조 지역성**(Locality of reference) 원리를 얼마나 잘 만족하는가'가 있다.

참조 지역성 원리란, CPU가 미래에 원하는 데이터를 예측하여 속도가 빠른 장치인 캐시 메모리에 담아 놓는데 이때의 예측률을 높이기 위하여 사용하는 원리이다. 쉽게 말하자면, 최근에 참조한 메모리나 그 메모리와 인접한 메모리를 다시 참조할 확률이 높다는 이론을 기반으로 캐시 메모리에 담아놓는 것이다. 메모리를 연속으로 읽는 작업은 캐시 메모리에서 읽어오기에 빠른 반면, 무작위로 읽는 작업은 메인 메모리에서 읽어오기에 속도의 차이가 있다.

참조 지역성 원리의 개념과 함께 다시 한 번 세 정렬 알고리즘을 비교해보겠다.
#### Heap sort
![|325](https://d2.naver.com/content/images/2020/01/img.gif)

Heap sort의 경우 대표적으로 참조 지역성이 좋지 않은 정렬이다. 위의 이미지에서 확인할 수 있듯이 한 위치에 있는 요소를 해당 요소의 인덱스 두 배 또는 절반인 요소와 반복적으로 비교하기에 캐시 메모리에서는 예측하기가 매우 어렵다. 그렇기에 CC는 상대적으로 다른 두 정렬들보다 큰 값으로 정의된다.

#### Merge sort
![|325](https://d2.naver.com/content/images/2020/01/img-1-.gif)

이와 달리, Merge sort의 경우 인접한 덩어리를 병합하기에 참조 지역성의 원리를 어느 정도 잘 만족한다. 그러나 입력 배열 크기만큼의 메모리를 추가로 사용한다는 단점이 있다.

#### Quick sort
![|325](https://d2.naver.com/content/images/2020/01/img-2-.gif)

Quick sort의 경우 pivot 주변에서 데이터의 위치 이동이 빈번하게 발생하기에 참조 지역성이 좋으며 메모리를 추가로 사용하지 않는다. 실제로도 CC의 값은 다른 두 정렬들보다 작은 값으로 정의되어 있고 평균 시간 복잡도는 셋 중에 가장 빠르다고 알려져 있다. 그러나 pivot을 선정하는 방법에 따라 최악의 경우 O(n2)O(n2)이 될 수 있다는 단점이 있다.

위와 같이 모든 정렬 알고리즘에는 장단점이 있어 어떤 한 정렬이 탁월하게 좋다고 선택할 수가 없었다. 상수 CC의 값이 너무 커지지 않게 동작하며, 추가 메모리도 많이 사용하지 않고, 최악의 경우에도 O(nlog⁡n)O(nlogn)으로 동작하는 정렬 알고리즘이 필요했다.

https://d2.naver.com/helloworld/0315536

## Bubble Sort
구현하기 가장 간단한 버블 소트이다.
서로 인접한 두 원소를 검사하여 정렬하는 알고리즘
인접한 2개의 레코드를 비교하여 크기가 순서대로 되어 있지 않으면 서로 교환한다.

![|425](https://i.imgur.com/eq5Vply.png)


```python
def bubble_sort(arr):
    for i in range(len(arr) - 1, 0, -1):
        swapped = False
        for j in range(i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```


## Selection Sort
선택 정렬(Selection Sort)은 배열이나 리스트를 정렬하는 간단한 비교 기반 알고리즘입니다. 기본 원리는 전체 배열을 순회하며 각 위치에 올바른 값을 찾아서 배치하는 것입니다. 이 과정은 배열의 모든 요소가 올바르게 정렬될 때까지 반복됩니다. 선택 정렬은 그 구현의 단순함으로 인해 **작은 리스트에 대해서는 효율적일 수 있지만, 대규모 데이터 세트에 대해서는 다른 더 효율적인 정렬 알고리즘에 비해 성능이 떨어**집니다.

![|500](https://i.imgur.com/yLkMOSM.png)

### 핵심
1. **최소값 탐색**: 배열 전체에서 최소값을 탐색합니다.
2. **스왑(swap)**: 최소값을 배열의 현재 위치와 교체합니다. 처음에는 배열의 첫 번째 위치에서 시작합니다.
3. **다음 위치로 이동**: 현재 위치를 한 칸 옮기고 남은 배열에 대해 최소값을 다시 탐색합니다.
4. **반복**: 위의 과정을 배열의 모든 요소가 올바르게 정렬될 때까지 반복합니다.

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```



## Merge Sort
병합 정렬(Merge Sort)은 분할 정복(Divide and Conquer) 알고리즘의 대표적인 예 중 하나로, 큰 문제를 작은 문제로 나눈 뒤 각각 해결한 다음 결과를 합쳐 전체 문제의 답을 얻는 방법입니다. 병합 정렬은 효율적인 정렬 방법 중 하나로, 평균적으로 O(n log n)의 시간 복잡도를 가집니다. 이 알고리즘은 안정적인 정렬 방법으로, 동일한 값을 가진 원소의 상대적인 순서가 변경되지 않습니다.

그러나, 추가적인 메모리 공간이 필요하다는 단점이 있습니다. 또한, 적은 양의 데이터에 대해서는 삽입 정렬이나 버블 정렬과 같은 간단한 정렬 알고리즘이 더 효율적일 수 있습니다.

### 핵심
병합 정렬은 다음과 같은 과정으로 이루어집니다:  
1. **분할(Divide):** 정렬되지 않은 리스트를 계속해서 절반으로 나누어, 각 부분 리스트의 크기가 1이 될 때까지 분할합니다.  
2. **정복(Conquer):** 각각의 부분 리스트를 재귀적으로 정렬합니다.  
3. **결합(Merge):** 정렬된 부분 리스트들을 하나의 정렬된 리스트로 합치는 과정입니다.

![|600](https://i.imgur.com/KkGs19Q.png)

![|725](https://i.imgur.com/wqXawwO.png)


```python
def merge_sort(arr):
    if len(arr) < 2:
        return arr

    mid = len(arr) // 2
    low_arr = merge_sort(arr[:mid])
    high_arr = merge_sort(arr[mid:])

    merged_arr = []
    l = h = 0
    while l < len(low_arr) and h < len(high_arr):
        if low_arr[l] < high_arr[h]:
            merged_arr.append(low_arr[l])
            l += 1
        else:
            merged_arr.append(high_arr[h])
            h += 1
    merged_arr += low_arr[l:]
    merged_arr += high_arr[h:]
    return merged_arr
```


## Heap Sort
힙 정렬(Heap Sort)은 선택 정렬을 개선한 정렬 방식 중 하나로, 완전 이진 트리를 이용한 최대 힙(Max Heap)이나 최소 힙(Min Heap) 트리 구조를 활용하여 배열을 정렬하는 방법입니다. 이 알고리즘의 핵심은 모든 부모 노드가 자신의 자식 노드보다 큰 값을 갖는 최대 힙 특성을 이용하여 배열의 최댓값(또는 최솟값)을 쉽게 추출할 수 있다는 점에 있습니다.

### 핵심
1. **힙 구성(Heapify)**: 주어진 배열로부터 최대 힙을 구성합니다. 이 과정은 배열의 중간부터 시작하여 처음까지 역순으로 진행하며, 각 요소에 대하여 하위 힙을 최대 힙으로 만드는 작업을 반복합니다.
2. **정렬 실행**: 최대 힙의 루트(가장 큰 값)와 마지막 요소를 교환한 뒤, 마지막 요소를 제외한 나머지 힙에 대해 다시 힙 구성 과정을 실행합니다. 이 과정을 배열의 모든 요소가 정렬될 때까지 반복합니다.

```python
def heapify(arr, n, i):
    largest = i  # 루트를 최대값으로 가정
    l = 2 * i + 1  # 왼쪽 자식
    r = 2 * i + 2  # 오른쪽 자식

    # 왼쪽 자식이 루트보다 크다면
    if l < n and arr[l] > arr[largest]:
        largest = l

    # 오른쪽 자식이 현재 최대값보다 크다면
    if r < n and arr[r] > arr[largest]:
        largest = r

    # 최대값이 루트가 아니라면
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # 교환

        # 교환된 루트에 대해 다시 힙 구성
        heapify(arr, n, largest)

def heapSort(arr):
    n = len(arr)

    # 초기 최대 힙 구성
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # 하나씩 원소를 꺼내어 다시 최대 힙 구성
    for i in range(n-1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # 루트와 마지막 요소 교환
        heapify(arr, i, 0)

# 예시 배열
arr = [12, 11, 13, 5, 6, 7]
heapSort(arr)
print("정렬된 배열은", arr)

```