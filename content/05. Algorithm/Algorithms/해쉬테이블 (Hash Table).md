---
title: 해쉬테이블 (Hash Table)
date: 2023-12-09
draft: false
tags:
  - Algorithm
complete: true
---

# 해쉬테이블(해쉬맵)이란
![](https://i.imgur.com/WZPkPmi.png)

1. 주어진 `키(문자열이나 숫자, 파일 데이터 등)`에 `해시함수` 사용하여 `해쉬코드`를 반환한다. 
2. 반환된 `해쉬코드`를 배열의 크기로 나눠 `배열의 인덱스`로 삼는다. 
3. `데이터의 값(value)`을 키와 함께 저장하며, 데이터가 저장되는 곳을 `버킷(bucket)` 또는 `슬롯(slot)`이라고 한다. 
4. 해쉬 테이블은 검색에 특화된 자료구조로 `O(1)`의 속도로 검색이 가능하다. 

# 해쉬 알고리즘과 충돌(Collision)
1. `해쉬 함수`는 임의의 크기를 가진 데이터를 고정된 데이터의 크기로 변환한다. 
2. 해쉬 함수가 사용하는 알고리즘이 `해쉬 알고리즘`이다. 
3. `충돌`이란 해시 함수가 서로 다른 두 개의 입력 값에 대해 동일한 출력값을 반환하는 상황을 의미한다. 
4. 충돌이 발생하는 경우는 2가지다. 첫번째, 다른 키 값이 같은 해쉬코드를 반환하는 경우와 두번째, 다른 해쉬 코드를 배열의 인덱스로 환산할 때 같은 인덱스가 반환되는 경우다. 
5. `해쉬 알고리즘의 성능`은 충돌이 적을수록 성능이 좋다고 평가된다. 

# 구현
1. 기본로직
    - `getHashCode(key)`
        - 입력 값이 문자열인 경우를 가정하여, 각 문자열의 ASCII 코드 값을 합한 값을 해쉬코드로 반환한다.
            - ex) sung : s(115) + u(117) + n(110) + g(103) = 445
            - jin : j(106) + i(105) + n(11) = 321
            - hee : h(104) + e(101) + e(101) = 306
    
    - `ConvertToIndex(HashCode)`
        - 반환된 해쉬코드를 배열의 인덱스로 반환한다.
        - `Hashcode % size`
            - ex) 445 % 4 = 1
            - 321 % 4 = 1
            - 306 % 4 = 2
            - 324 % 4 = 0
            
![](https://i.imgur.com/k7l0Imu.png)

### Test
```java
package org.datastructure.hashtable;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class HashTableTest {

    @Test
    public void putAndGet(){
        HashTable hashTable = new HashTable(4);
        hashTable.put("john", "john is an actor");
        hashTable.put("lisa", "lisa is a model");
        hashTable.put("sandra", "sandra is a programmer");
        Assertions.assertEquals("john is an actor", hashTable.get("john"));
        Assertions.assertEquals("lisa is a model", hashTable.get("lisa"));
        Assertions.assertEquals("sandra is a programmer", hashTable.get("sandra"));
    }
}
```

### Node
```java
package org.example;

class Node {
    private String key;
    private String value;

    public Node(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
```

### HashTable
```java
package org.example;

import java.util.LinkedList;

class HashTable {
    LinkedList<Node>[] data;
    public HashTable(int size) {
        this.data = new LinkedList[size];
    }

    int getHashCode(String key){
        return key.chars().sum();
    }

    int convertToIndex(int hashCode){
        return hashCode % data.length;
    }

    Node searchKey(LinkedList<Node> list, String key){
        if (list == null) return null;
        for (Node node : list){
            if(node.getKey().equals(key)){
                return node;
            }
        }
        return null;
    }

    void put(String key, String value){
        int hashCode = getHashCode(key);
        int idx = convertToIndex(hashCode);
        LinkedList<Node> list = data[idx];
        if (list == null) {
            list = new LinkedList<Node>();
            data[idx] = list;
        }

        Node node = searchKey(list, key);
        if (node == null){
            list.addLast(new Node(key, value));
        } else {
            node.setValue(value);
        }
    }

    String get(String key){
        int hashCode = getHashCode(key);
        int idx = convertToIndex(hashCode);
        LinkedList<Node> list = data[idx];
        Node node = searchKey(list, key);
        return node == null ? "Not Found" : node.getValue();
    }
}
```

### HashTable vs HashMap vs ConcurrentHashMap

- 자바에선 해쉬테이블을 구현한 자료구조가 3개 있다. 이들의 공통점과 차이점은 아래와 같다.
    - 공통점
        - hash 함수를 활용하여 key-value 형태로 값을 저장한다.
    - 차이점
        - HashMap이 HashTable의 개선된 형태이다. 그래서 속도 면에서 HashTable보다 빠르고 HashTable은 거의 사용하지 않는다.
        - HashMap은 thread-safe 하지 않다. HashTable은 thread-safe, HashMap은 non-synchronized 하다. HashTable은 synchronized.
        - 동기화 이슈를 피하기 위해, 실무에선 `[ConcurrentHashMap](https://stackoverflow.com/questions/40471/what-are-the-differences-between-a-hashmap-and-a-hashtable-in-java)`을 사용한다.

### HashTable
```java
public class Hashtable<K,V> extends Dictionary<K,V> implements Map<K,V>, Cloneable, java.io.Serializable {
    public synchronized int size() { }
    @SuppressWarnings("unchecked")
    public synchronized V get(Object key) { }
    public synchronized V put(K key, V value) { }
}
```

- 특징
    - 메소드 전체에 `synchronized` 키워드가 존재.
    - Don’t Permits `null` values and the `null` key

### HashMap
```java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable {
    public V get(Object key) {}
    public V put(K key, V value) {}
}
```

- 특징
    - `Multi-Thread` 환경에서 사용할 수 없다.
    - Permits `null` values and the `null` key

### ConcurrentHashMap
```java
public class ConcurrentHashMap<K,V> extends AbstractMap<K,V> implements ConcurrentMap<K,V>, Serializable {
    private static final int DEFAULT_CAPACITY = 16;
    // 동시에 업데이트를 수행하는 쓰레드 수
    private static final int DEFAULT_CONCURRENCY_LEVEL = 16;
}
```

- 특징
    - Multi-Thread 환경에서 사용할 수 있도록 나온 클래스가 바로 `ConcurrentHashMap`

## 정리하면

1. `해쉬테이블`은 다량의 데이터를 효과적으로 저장하고 불러올 수 있는 자료구조.  
2. 충돌이 적을수록 해쉬테이블의 성능이 좋게 평가된다. 
3. 해쉬테이블의 검색성능이 O(1)이라곤 하지만, 어디까지나 충돌이 없을 경우이다. 전부 충돌될 경우, 검색 성능이 최대 O(N)만큼 소요될 수 있다. 
4. 자바의 HashMap, HashTable, ConcurrentHashMap은 HashTable 자료구조를 구현한 구현체이다. HashMap 혹은 multi-thread 환경에서는 ConcurrentHashMap을 쓴다. 
5. 실무에서 스프링 부트 환경의 웹 서버는 동시에 요청된 유저의 응답을 multi-thread를 활용하여 처리하므로 thread-safe한 ConcurrentHashMap을 사용하는 것이 좋다. 

## 충돌 방지 방법

1. Chaining
    - 가장 기본적인 형태로, 앞서 충돌이 발생한 데이터를 링크드리스트 인덱스에 연속적으로 추가한 형태를 말합니다.
2. Open Addressing (closed hashing) 
    - 같은 버킷에 넣지 않고 다른 버킷을 찾는 `탐사(probing)`를 통해 충돌을 해결하는 방법을 말합니다.
    - 방법
        - `선형탐색(linear proboing)` : interval 1 간격으로 순차적으로 버킷이 비어있는지 탐색합니다. 세 방법 중 가장 성능이 좋으나, 이웃한 곳에 데이터가 군집되는 현상인 **1차 군집화**(clustering)가 발생하게 됩니다.
        - `이차탐색(quadratic probing)` : 1^2, 2^2, 3^2 와 같이 제곱수만큼 떨어진 배열의 인덱스를 탐사합니다. 같은 해시 값을 갖는 키들은 똑같은 점프 시퀀스에 따라 empty 원소를 찾아내므로 결국 또 다른 형태의 군집을 발생시킵니다. 이를 **2차 군집화**라고 합니다.
        - `Double hasing` : 함수를 한번 더 적용해 충돌시 함수로 인한 새로운 해시값으로 충돌을 피하는 방법으로, 클러스터 현상을 막을 수 있지만 해쉬 함수가 2번 연산되므로 성능이 좋지 못합니다.
    - 영향을 주는 요인
        - 부하율(LoadFactor) : 어레이에서 사용되는 슬롯의 비율로, 100%에 가까워짐에 따라 주어진 키를 찾거나 삽입하는 데 필요한 프로브의 수가 급격히 증가합니다.