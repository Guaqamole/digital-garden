---
title: Dataview Quries
date: 2023-10-20
draft: false
tags: 
complete: true
link: https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-pages/
---

# List

## Search by title using tags

```
LIST 
FROM #Python WHERE title = "Python" 
```


 ```dataview
LIST FROM #Greedy and #Heap 
```

```
LIST FROM #Greedy and #Heap 
```


## 현재 파일 메타 데이터 사용
```
LIST 
	WHERE file.frontmatter.source = this.file.frontmatter.source 
	SORT file.name ASC 
```




# Table

## 현재 파일의 상태 체크
 ```dataview
TABLE file.name, complete
WHERE file.name = this.file.name
```

 ```
TABLE file.name, complete
WHERE file.name = this.file.name
```



## YAML Front-matter로 찾기

 ```dataview
TABLE WITHOUT ID
	file.name as "title",
	file.path as "path",
	file.ctime as "created at",
	file.mtime as "modified at",
	file.frontmatter as "front-matter",
	complete
WHERE contains(file.folder, this.file.folder) 
AND contains(complete, true)
```

```
TABLE WITHOUT ID
	file.name as "title",
	file.path as "path",
	file.ctime as "created at",
	file.mtime as "modified at",
	file.frontmatter as "front-matter",
	complete
WHERE contains(file.folder, this.file.folder) 
AND contains(complete, true)
```



___

## Choose a Output Format

https://blacksmithgu.github.io/obsidian-dataview/queries/structure/

The output format of a query is determined by its **Query Type**. There are four available:

1. **TABLE**: A table of results with one row per result and one or many columns of field data.
2. **LIST**: A bullet point list of pages which match the query. You can output one field for each page alongside their file links.
3. **TASK**: An interactive task list of tasks that match the given query.
4. **CALENDAR**: A calendar view displaying each hit via a dot on its referred date.

## FLATTEN (for nested)

Flatten an array in every row, yielding one result row per entry in the array.

```
FLATTEN field 
FLATTEN (computed_field) AS name
```

For example, flatten the `authors` field in each literature note to give one row per author:

Query
```
TABLE authors 
FROM #LiteratureNote 
FLATTEN authors
```


Output

| File                                           | authors             |
| ---------------------------------------------- | ------------------- |
| stegEnvironmentalPsychologyIntroduction2018 SN | Steg, L.            |
| stegEnvironmentalPsychologyIntroduction2018 SN | Van den Berg, A. E. |
| stegEnvironmentalPsychologyIntroduction2018 SN | De Groot, J. I. M.  |
| Soap Dragons SN                                | Robert Lamb         |
| Soap Dragons SN                                | Joe McCormick       |
| smithPainAssaultSelf2007 SN                    | Jonathan A. Smith   |
| smithPainAssaultSelf2007 SN                    | Mike Osborn         |

## MyExamples

```dataview
TABLE algorithms
FROM #Greedy 
```


```dataview
table tags
from #Greedy 
flatten tags
```

흠... 위에 필요없는 디폴트 태그들이 너무많다 (`CodingTest)` 등.

# 태그로 찾고 특정 태그는 안보이게 출력

## Before
```dataview
TABLE file.tags as tags
FROM #Learned 
```


## After
```dataview
TABLE filter(file.tags, (t) => t !="#CodingTest" AND t !="#Learned") as tags
FROM #Learned 
```


```
TABLE filter(file.tags, (t) => t !="#CodingTest" AND t !="#Learned") as tags
FROM #Learned 
```


# Choice 문 사용시 다중 조건 걸고 싶을때

```
---
title: recursion problem
solved: true
hard:
tag: #algo
---
```

이런 Front-matter 가 있다고할때 아래와 같은 쿼리를 날리면 `hard` 의 경우 O도 X도 아닌데 X를 써야한다…
```
table
	choice(solved, "O", "X") as solved,
	choice(hard, "O", "X") as hard
from #algo
```

|solved | hard|
|- |-|
| O | X|

O, X, N/A 세개의 옵션을 주고싶은 경우 Nested choice 문을 사용하면 된다.

```
table
	choice(
		contains(hard, True),"✅",
			choice(contains(hard, False), "❌", 
				"N/A")) as hard
```