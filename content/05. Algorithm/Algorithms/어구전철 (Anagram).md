---
title: 어구전철 (Anagram)
date: 2024-04-26
draft: false
tags:
  - Algorithm
complete: true
---
**어구전철**(語句轉綴) 또는 **애너그램**([영어](https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%B4 "영어"): anagram)은 [단어](https://ko.wikipedia.org/wiki/%EB%8B%A8%EC%96%B4 "단어")나 [문장](https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%9E%A5 "문장")을 구성하고 있는 [문자](https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%9E%90 "문자")의 순서를 바꾸어 다른 단어나 문장을 만드는 것이다.

예시) LE SSERAFIM의 그룹명은 I'm fearless라는 영어 문장을 [어구전철](https://ko.wikipedia.org/wiki/%EC%96%B4%EA%B5%AC%EC%A0%84%EC%B2%A0 "어구전철")(애너그램)로 재조합한 것
![|420](https://i.imgur.com/mZ4mVAW.png)


## Implementation
### Hash
```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        countS, countT = {}, {}

        for i in range(len(s)):
            countS[s[i]] = 1 + countS.get(s[i], 0)
            countT[t[i]] = 1 + countT.get(t[i], 0)
        return countS == countT
```


### collections.Counter()
```python
def is_anagram(word, compare):  
    word, compare = word.lower(), compare.lower()  
    a,b = Counter(word), Counter(compare)  
  
    if a == b:  
        print(a, b)  
        return True  
  
    print(a,b)  
    return False
```


### ord()
- collections module을 사용하지 않고 ord로 푸는방법.
- `al[ord(c) - ord("a")] += 1  ` 이 부분은 소문자 문자의 시작인 ‘a’ 를 사용해서 문자의 포지션을 알아내어 계산하는 방법
```python
def is_anagram(a,b):  
    al, bl = [0] * 26  
    for c in a:  
        al[ord(c) - ord("a")] += 1  
	for c in b:  
		bl[ord(c) - ord("a")] += 1  
    if a == b:  
        return True  
	return False
```