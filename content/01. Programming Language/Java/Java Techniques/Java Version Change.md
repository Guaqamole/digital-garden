---
title: Java Version Change
date: 2024-11-04
draft: false
tags:
  - Java
complete: true
---
### **로컬에 설치되어있는 Java 버전 확인하기**
```python
❯ /usr/libexec/java_home -V
Matching Java Virtual Machines (3):
    17.0.13 (arm64) "Azul Systems, Inc." - "Zulu 17.54.21" /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
    11.0.25 (arm64) "Azul Systems, Inc." - "Zulu 11.76.21" /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
    1.8.0_432 (arm64) "Azul Systems, Inc." - "Zulu 8.82.0.21" /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home
```

### **Java 다른 버전 변경**
- JDK 8로 설정할 경우
```python
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
```