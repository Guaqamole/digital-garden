---
title: Mac Tree
date: 2024-11-20
draft: false
tags:
  - DevTools
  - MacBook
complete: true
---
## Install
```python
brew install tree
```


## Level
```python
tree -L level

❯ tree -L 1
├── LICENSE
├── README.md
├── pom.xml
├── src
└── target
```

## Exclude Pattern
```python
tree -I 'pattern' or tree -I 'pattern1|pattern2'

❯ tree -I 'target' -L 1
├── LICENSE
├── README.md
├── pom.xml
└── src
```


## Example
- exclude: target, resources, license, readme.md
- level: 8
```python
tree -L 8 -I 'target|resources|LICENSE|README.md'
.
├── pom.xml
└── src
    └── main
        └── scala
            └── io
                └── github
                    └── streamingwithflink
                        ├── chapter1
                        │   └── AverageSensorReadings.scala
                        ├── chapter5
                        │   ├── BasicTransformations.scala
                        │   ├── KeyedTransformations.scala
                        │   ├── MultiStreamTransformations.scala
                        │   ├── RollingSum.scala
                        │   └── util
                        ├── chapter6
                        │   ├── CoProcessFunctionTimers.scala
                        │   ├── CustomWindow.scala
                        │   ├── LateDataHandling.scala
                        │   ├── ProcessFunctionTimers.scala
                        │   ├── SideOutputs.scala
                        │   ├── WatermarkGeneration.scala
                        │   └── WindowFunctions.scala
                        ├── chapter7
                        │   ├── BroadcastStateFunction.scala
                        │   ├── CheckpointedFunctionExample.scala
                        │   ├── KeyedStateFunction.scala
                        │   ├── OperatorListStateFunction.scala
                        │   ├── QueryableState.scala
                        │   └── StatefulProcessFunction.scala
                        ├── chapter8
                        │   ├── AsyncFunctionExample.scala
                        │   ├── IdempotentSinkFunctionExample.scala
                        │   ├── SinkFunctionExample.scala
                        │   ├── SourceFunctionExample.scala
                        │   ├── TransactionalSinkExample.scala
                        │   ├── WriteAheadSinkExample.scala
                        │   └── util
                        └── util
                            ├── ResettableSensorSource.scala
                            ├── SensorReading.scala
                            ├── SensorSource.scala
                            └── SensorTimeAssigner.scala

15 directories, 29 files
```