---
title: AWS Persoanlize Pipeline
date: 2023-11-15
draft: false
tags:
  - AWS
  - Personalize
complete: true
---
# Pipeline Architecure
![](https://i.imgur.com/l9gkkV0.png)


# Flowchart


```mermaid

flowchart TD
	subgraph PrepareDataset[ Prepare Dataset ]
		A[Test]
	end
	
	PrepareDataset -->  Test2
	
	subgraph Test2[Prepare Dataset]
		B[Test]
	end
```

