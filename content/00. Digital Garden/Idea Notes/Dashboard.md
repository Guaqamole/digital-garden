---
tags: []
aliases: 
Type: 
Progress: 200
Target: 1000
Reason: 크롤링 스킬 업그레이드, 각종 프로젝트에 활용
Timespan: 1 Year
DueDate: 2023-12-31
draft: true
---
# Dashboard


## Goals
```dataview
TABLE WITHOUT ID
	(link(file.path, alias)) as title,
	Bar
FROM #goal
WHERE number(Progress) != number(Target)
SORT Type DESC
```








## Projects
```dataview
TABLE WITHOUT ID
	(link(file.path, alias[0])) as title,
	subtitle,
	Bar,
	("Goal: " + link(Goal, Goal.alias)) as goal
FROM #project
WHERE status = "In Progress"
```
