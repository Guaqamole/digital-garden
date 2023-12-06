---
title: MemoJang
complete: true
draft: true
cssClass: img-grid
---

![[Spark Client Mode.png]]
![[Spark Local Mode.png]]

![[Standalone vs Mesos.png]]
![[Spark Deployment Modes.png]]
![[Pasted Image 20230809112634_406.png]]
![[Spark Cluster Mode2.png]]


2023-10-13


## hello

Dd

Dd
$$ x + y =z $$


```mermaid
flowchart LR

%% Colors %%

classDef blue fill:#66deff,stroke:#000,color:#000
classDef green fill:#6ad98b,stroke:#000,color:#000

	483797("query"):::blue --> 535618["function_score"]
	535618 --> 900934["query"]
	900934 --> 917920["bool"]
	917920 --> 532526["must"]
	532526 --> 388742["bool"]
	388742 --> 540412["should"]
	540412 --> 307852["dis_max"]
	307852 --> 990833["queries"]
	990833 --> 250470["multi_match_normal"]
	990833 --> 340472["multi_match_bigram"]
	540412 --> 900187["multi_match_phrase"]
	532526 --> 617733["filter"]
	617733 --> 785044["bool"]
	785044 --> 628365["must"]
	628365 --> 925737["goods_use_yn"]
	628365 --> 631978["goods_del_yn"]
	628365 --> 227430["vendor_use_yn"]
	628365 --> 915671["listing_yn"]
	628365 --> 823855["plan_id"]:::green
	785044 --> 131156["must_not"]
	131156 --> 251002["stock_0"]
	785044 --> 331899["should"]
	331899 --> 852560["bool"]
	852560 --> 428846["must"]
	428846 --> 697262["bool"]
	697262 --> 958527["should"]
	958527 --> 799071["vendor_ids"]
	428846 --> 746450["delivery_type_1"]
	331899 --> 839602["delivery_type_2"]
	483797 --> 153118["functions"]
	153118 --> 714686["script_score"]
	153118 --> 112548["filter"]
	483797 --> 711192["boost_mode"]
	270243("post_filter"):::blue --> 881146["bool"]
	881146 --> 534562["filter"]
	964069("sort"):::blue --> 946573["orderable"]
	964069 --> 644534["delivery_type"]
	964069 --> 202052["_score"]
	964069 --> 433024["discount_price"]
	531164["_search"] --> 874130("track_total_hits")
	531164 --> 814053("aggs")
	531164 --> 483797
	531164 --> 270243
	531164 --> 964069
	531164 --> 155688("_source")
```

```dataview
TABLE file.name, file.ctime as "created", file.path as "path"
FROM #Python 
```

```python
a = 1
b = 3

print(a+b)
```



```dataview
list
where contains(complete, false)
```


```dataview
table filter(file.tags, (t) => t !="#CodingTest" AND t !="#Learned") as tags
from #Learned 
```


```dataview
table platform, difficulty, filter(file.tags, (t) => t !="#CodingTest" AND t !="#Learned") as tags
from #CodingTest 
where file.name != "Coding Problem" AND file.name != "Baekjoon Skeleton Codes"
AND status = "Solved ✅"
```



```mermaid
flowchart LR
Start --> Stop --> Test
Start --> Test

```

---


```python
def hello(name):
	print("hello", name)

def add(a, b):
	return a+b

hello("kim")
print(add(1,2))
```

---


```python
hello("john")
```


---



```python
print(add(1,2))
print(add(1,2))
```


---



```python
print(add(1,2))
```

---


## This is Jupyter notebooks

다 할수있어

```
오늘 할것
```

```python

```

---
