---
title: Create Scala Project with IntelliJ
date: 2024-12-09
draft: false
tags:
  - Scala
  - FunctionalProgramming
complete: true
---
## Scala with Maven
```python
New Project > Maven Archetype > ...

mvn archetype:generate -B \
-DarchetypeGroupId=net.alchim31.maven \
-DarchetypeArtifactId=scala-archetype-simple \
-DarchetypeVersion=1.7 \
-DgroupId=com.company \
-DartifactId=project \
-Dversion=0.1-SNAPSHOT \
-Dpackage=com.company
```

![](https://i.imgur.com/ezm6kYY.png)




## Scala with SBT
…