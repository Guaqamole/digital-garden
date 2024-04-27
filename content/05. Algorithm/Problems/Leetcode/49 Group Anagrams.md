---
title: 49 Group Anagrams
date: 2024-04-26
draft: false
tags:
  - CodingTest
Platform: LeetCode
link: https://leetcode.com/problems/group-anagrams
difficulty:
  - Medium
highlight: false
Comment: N/A
Status: Not Solved ✏️
idea: true
implement: 
time-complexity: 
time-enough: 
tries:
---
# 문제
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

```
Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]


Example 2:

Input: strs = [""]
Output: [[""]]


Example 3:

Input: strs = ["a"]
Output: [["a"]]
```

Constraints:
- `1 <= strs.length <= 104`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

Related Topics
- Array
- Hash Table
- String
- Sorting


- 👍 18884
- 👎 601



___

# 풀이
- Hashmap 문제
- 키포인트는 각 element를 anagram 형태 : count  key-value 형식으로 만들어 hash에 넣는것이다.
- 예시) ‘eat’ → {e:1 , a:1, t:1} → key 가 되고 value는 anagrams 가 된다.
- list는 dict의 key가 될 수 없으니 tuple() 로 바꾸어줘야한다.
- [[어구전철 (Anagram)#ord()]] 를 참고.




____

# 코드
```python
from collections import defaultdict  
  
str = ["eat","tea","tan","ate","nat","bat"]  
  
res = defaultdict(list)  
  
for s in str:  
    count = [0] * 26  
    for c in s:  
        count[ord(c) - ord('a')] += 1  
    res[tuple(count)].append(s)  
  
print(list(res.values()))
```




___

# 배운것






---


# 비슷한 문제들






___
