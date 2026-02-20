---
title: Scala Project 생성하기
date: 2024-12-03
draft: false
tags:
  - Scala
  - IntelliJ
complete: true
---

## Scala with FLINK
```python
File > New > Project...
```

![](https://i.imgur.com/HNQozjZ.png)

### version setup
#### maven-archetype
```python
mvn archetype:generate \
-DarchetypeGroupId=org.apache.flink \
-DarchetypeArtifactId=flink-quickstart-scala \
-DarchetypeVersion=1.13.1 \
-DgroupId=org.apache.flink.quickstart \
-DartifactId=flink-scala-project \
-Dversion=0.1 \
-Dpackage=org.apache.flink.quickstart \
-DinteractiveMode=false
```

![](https://i.imgur.com/SAfllK7.png)

#### 1.7.1 → 1.13.1 로 변경
![](https://i.imgur.com/j2RAT4R.png)

### pom.xml
- scala.version: 2.12.6
- scala.binary.version: 2.12
```python
<properties>  
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
    <flink.version>1.13.1</flink.version>  
    <target.java.version>1.8</target.java.version>  
    <scala.binary.version>2.12</scala.binary.version>  
    <scala.version>2.12.6</scala.version>  
    <log4j.version>2.12.1</log4j.version>  
</properties>
```

### Project Structure
![|725](https://i.imgur.com/1TBSa6F.png)

### StreamingJob.scala
```scala

package org.example.guaqamole

import org.apache.flink.streaming.api.scala._

object StreamingJob {
  def main(args: Array[String]) {
    // set up the streaming execution environment
    val env = StreamExecutionEnvironment.getExecutionEnvironment

    /*
     * Here, you can start creating your execution plan for Flink.
     *
     * Start with getting some data from the environment, like
     *  env.readTextFile(textPath);
     *
     * then, transform the resulting DataStream[String] using operations
     * like
     *   .filter()
     *   .flatMap()
     *   .join()
     *   .group()
     *
     * and many more.
     * Have a look at the programming guide:
     *
     * https://flink.apache.org/docs/latest/apis/streaming/index.html
     *
     */

    // execute program
    env.execute("Flink Streaming Scala API Skeleton")
  }
}
```

## Sample Run to Flink
### repository setup
```scala
    <repository>
      <id>some-repo</id>
      <url>https://repo.com/groups/some-group</url>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </repository>
```
### pom.xml setup
#### info
```scala
	<groupId>org.example.guaqamole</groupId>
	<artifactId>demo-web</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>Flink Quickstart Job</name> // change here
```


#### dependencies & repo
```scala
// flink hadoop compat
<dependency>  
    <groupId>org.apache.flink</groupId>  
    <artifactId>flink-hadoop-compatibility_${scala.binary.version}</artifactId>  
    <version>${flink.version}</version>  
</dependency>

// hadoop-common
<dependency>
  <groupId>org.apache.hadoop</groupId>
  <artifactId>hadoop-common</artifactId>
  <version>2.6.5</version>
  <scope>provided</scope>
  <exclusions>
	<!-- Exclude Commons Logging in favor of SLF4j -->
	<exclusion>
	  <groupId>log4j</groupId>
	  <artifactId>*</artifactId>
	</exclusion>
	<exclusion>
	  <groupId>org.slf4j</groupId>
	  <artifactId>slf4j-log4j12</artifactId>
	</exclusion>
  </exclusions>
</dependency>

// mapred
<dependency>
  <groupId>org.apache.hadoop</groupId>
  <artifactId>hadoop-mapreduce-client-core</artifactId>
  <version>2.6.5</version>
  <scope>provided</scope>
  <exclusions>
	<!-- Exclude Commons Logging in favor of SLF4j -->
	<exclusion>
	  <groupId>log4j</groupId>
	  <artifactId>*</artifactId>
	</exclusion>
	<exclusion>
	  <groupId>org.slf4j</groupId>
	  <artifactId>slf4j-log4j12</artifactId>
	</exclusion>
  </exclusions>
</dependency>

// 필수
<dependency>
  <groupId>com.hadoop.gplcompression</groupId>
  <artifactId>hadoop-lzo</artifactId>
  <version>0.4.16</version>
</dependency>

<dependency>  
  <groupId>com.fasterxml.jackson.module</groupId>  
  <artifactId>jackson-module-scala_${scala.binary.version}</artifactId>  
  <version>2.11.1</version>  
</dependency>
```

### code
```scala
object StreamingJob {  
  def main(args: Array[String]) {  
    val env = StreamExecutionEnvironment.getExecutionEnvironment
```

### packaging

