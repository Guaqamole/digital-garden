---
title: Udemy Flink - Dataset API
date: 2024-12-09
draft: false
tags:
  - Flink
complete: true
---
## pom.xml
```python
 <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>reduce</groupId>
  <artifactId>reduce</artifactId>
  <version>0.0.1-SNAPSHOT</version>
   <dependencies>
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-java</artifactId>
  <version>1.5.0</version>
</dependency>
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-streaming-java_2.11</artifactId>
  <version>1.5.0</version>
</dependency>
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-clients_2.11</artifactId>
  <version>1.5.0</version>
</dependency>
</dependencies>
</project>

```

## wordcount.java
```java
package p1;

import org.apache.flink.api.common.ExecutionConfig;
import org.apache.flink.api.common.functions.FilterFunction;
import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.java.operators.UnsortedGrouping;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.api.java.utils.ParameterTool;

public class WordCount
{
  public static void main(String[] args)
    throws Exception
  {
    ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
    
    ParameterTool params = ParameterTool.fromArgs(args);
    
    env.getConfig().setGlobalJobParameters(params);
    
    DataSet<String> text = env.readTextFile(params.get("input"));
    
    DataSet<String> filtered = text.filter(new FilterFunction<String>()
    
    {
      public boolean filter(String value)
      {
        return value.startsWith("N");
      }
    });
    DataSet<Tuple2<String, Integer>> tokenized = filtered.map(new Tokenizer());
    
    DataSet<Tuple2<String, Integer>> counts = tokenized.groupBy(new int[] { 0 }).sum(1);
    if (params.has("output"))
    {
      counts.writeAsCsv(params.get("output"), "\n", " ");
      
      env.execute("WordCount Example");
    }
  }
  
  public static final class Tokenizer
    implements MapFunction<String, Tuple2<String, Integer>>
  {
    public Tuple2<String, Integer> map(String value)
    {
      return new Tuple2(value, Integer.valueOf(1));
    }
  }
}

```

## Jar
```python
clean > compile > package (or deploy)

ls
reduce-0.0.1-SNAPSHOT.jar
```


## Run Jar
```python
~/playground/flink-1.5.6/bin/flink run ./reduce-0.0.1-SNAPSHOT.jar --input file:///Users/john/workspace/flink/hello-flink/data/input/wc.txt --output file:///Users/john/workspace/flink/hello-flink/data/output/wc_output.txt
```