---
title: Quickstart flink with Java
date: 2024-11-04
draft: false
tags:
  - DataEngineering
  - Flink
complete: true
---
# Maven
## Archetype
https://nightlies.apache.org/flink/flink-docs-release-1.13/docs/dev/datastream/project-configuration/
```python
mvn archetype:generate                \
  -DarchetypeGroupId=org.apache.flink   \
  -DarchetypeArtifactId=flink-quickstart-java \
  -DarchetypeVersion=1.13.6
```

## Prerequisite
https://github.com/apache/flink/blob/release-1.13.5/flink-examples/flink-examples-batch/src/main/java/org/apache/flink/examples/java/wordcount/WordCount.java (recommended)
https://github.com/apache/flink-training (from flink-book)
```python
git clone https://github.com/streaming-with-flink/examples-java.git
git clone https://github.com/apache/flink-training.git
```

### IntelliJ: Import Existing
File > New > Project from Existing Sources > Import project from external model > Maven > Create


### IntelliJ: Create Project
File > New > Project > name: hello-flink > build system: maven > language: java

### Flink Plugin
Settings > Editor > Plugins > Big Data Tools
Settings > Tools > Big Data Tools > + > Monitoring > Flink > URL: 127.0.0.1:8080 > Test connection

### Flink-Training
```python
git clone https://github.com/apache/flink-training.git
cd flink-training && chmod +x gradlew
./gradlew test shadowJar
```

### pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>hello-flink</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-java</artifactId>
            <version>1.13.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-streaming-java_2.11</artifactId>
            <version>1.13.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-clients_2.11</artifactId>
            <version>1.13.0</version>
        </dependency>
    </dependencies>
</project>
```
- install depenencies
	- maven > Lifecycle > install


---

## WordCount
### org.example.p1.MyWordCount.java
```java
package org.example.p1;  
  
  
import org.apache.flink.api.common.functions.FlatMapFunction;  
import org.apache.flink.api.java.DataSet;  
import org.apache.flink.api.java.ExecutionEnvironment;  
import org.apache.flink.api.java.tuple.Tuple2;  
import org.apache.flink.api.java.utils.MultipleParameterTool;  
import org.apache.flink.core.fs.FileSystem;  
import org.apache.flink.util.Collector;  
import org.apache.flink.util.Preconditions;  
import org.example.p1.util.WordCountData;  
  
public class MyWordCount {  
    public static void main(String[] args) throws Exception {  
        final MultipleParameterTool params = MultipleParameterTool.fromArgs(args);  
        final ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();  
  
        env.getConfig().setGlobalJobParameters(params);  
  
        DataSet<String> text = null;  
        if (params.has("input")) {  
            for (String input : params.getMultiParameterRequired("input")) {  
                if (text == null) {  
                    text = env.readTextFile(input);  
                } else {  
                    text = text.union(env.readTextFile(input));  
                }  
            }  
            Preconditions.checkNotNull(text, "Input DataSet should not be null.");  
        } else {  
            System.out.println("Executing WordCount example with default input data set.");  
            System.out.println("Use --input to specify file input.");  
            text = WordCountData.getDefaultTextLineDataSet(env);  
        }  
  
        DataSet<Tuple2<String, Integer>> counts =  
                // split up the lines in pairs (2-tuples) containing: (word,1)  
                text.flatMap(new Tokenizer())  
                        // group by the tuple field "0" and sum up tuple field "1"  
                        .groupBy(0)  
                        .sum(1);  
  
        if (params.has("output")) {  
            counts.writeAsCsv(params.get("output"), "\n", ",", FileSystem.WriteMode.OVERWRITE);  
            env.execute("WordCount Example");  
        } else {  
            System.out.println("Printing result to stdout. Use --output to specify output path.");  
            counts.print();  
        }  
    }  
  
    public static final class Tokenizer implements FlatMapFunction<String, Tuple2<String, Integer>> {  
        @Override  
        public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {  
            String[] tokens = value.toLowerCase().split("\\W+");  
  
            // emit the pairs  
            for (String token : tokens) {  
                if (token.length() > 0) {  
                    out.collect(new Tuple2<>(token, 1));  
                }  
            }  
        }  
    }  
}
```


### org.example.p1.util.WordCountData.java
```java
package org.example.p1.util;

import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;

public class WordCountData {
    public static final String[] WORDS =
            new String[] {
                    "To be, or not to be,--that is the question:--",
                    "Whether 'tis nobler in the mind to suffer",
                    "The slings and arrows of outrageous fortune",
                    "Or to take arms against a sea of troubles,",
                    "And by opposing end them?--To die,--to sleep,--",
                    "No more; and by a sleep to say we end",
                    "The heartache, and the thousand natural shocks",
                    "That flesh is heir to,--'tis a consummation",
                    "Devoutly to be wish'd. To die,--to sleep;--",
                    "To sleep! perchance to dream:--ay, there's the rub;",
                    "For in that sleep of death what dreams may come,",
                    "When we have shuffled off this mortal coil,",
                    "Must give us pause: there's the respect",
                    "That makes calamity of so long life;",
                    "For who would bear the whips and scorns of time,",
                    "The oppressor's wrong, the proud man's contumely,",
                    "The pangs of despis'd love, the law's delay,",
                    "The insolence of office, and the spurns",
                    "That patient merit of the unworthy takes,",
                    "When he himself might his quietus make",
                    "With a bare bodkin? who would these fardels bear,",
                    "To grunt and sweat under a weary life,",
                    "But that the dread of something after death,--",
                    "The undiscover'd country, from whose bourn",
                    "No traveller returns,--puzzles the will,",
                    "And makes us rather bear those ills we have",
                    "Than fly to others that we know not of?",
                    "Thus conscience does make cowards of us all;",
                    "And thus the native hue of resolution",
                    "Is sicklied o'er with the pale cast of thought;",
                    "And enterprises of great pith and moment,",
                    "With this regard, their currents turn awry,",
                    "And lose the name of action.--Soft you now!",
                    "The fair Ophelia!--Nymph, in thy orisons",
                    "Be all my sins remember'd."
            };
    public static DataSet<String> getDefaultTextLineDataSet(ExecutionEnvironment env) {
        return env.fromElements(WORDS);
    }
}
```


### build & submit
#### build
- Lifecycle > clean > compile > package
- target/hello-flink-1.0-SNAPSHOT.jar
#### submit
- UI: Bigdata Tools > flink > Submit New Job
![](https://i.imgur.com/8F8Zfx7.png)

- class: org.example.p1.MyWordCount
- parallelism: 1
- program arguments: --ouput /Users/john/playground/flink/output/test.csv

- cli
```python
./bin/flink run \
-m 127.0.0.1:8080 \
-c org.example.p1.MyWordCount /Users/john/playground/flink/hello-flink/target/hello-flink-1.0-SNAPSHOT.jar \
--output /Users/john/playground/flink/output/test.csv
```


# Gradle
https://medium.com/@santoshkotagiri/setting-up-flink-projects-with-gradle-a-step-by-step-guide-4d1ef85f017
groupid: org.quickstart
artifactid: flink-gradle-starter

build.gradle
```python
plugins {  
    id 'java'  
}  
  
group = 'org.kakaocorp'  
version = '1.0-SNAPSHOT'  
  
ext { 
    javaVersion = '11'
    flinkVersion = '1.15.0'  
    junitVersion = '4.13'  
}  
  
  
repositories {  
    mavenCentral()  
}  
  
dependencies {  
    implementation "org.apache.flink:flink-streaming-java:$flinkVersion"  
    implementation "org.apache.flink:flink-clients:$flinkVersion"  
    implementation "org.apache.flink:flink-runtime:$flinkVersion"  
    implementation "org.apache.flink:flink-java:$flinkVersion"  
  
    testImplementation platform('org.junit:junit-bom:5.10.0')  
    testImplementation 'org.junit.jupiter:junit-jupiter'  
    testImplementation "org.apache.flink:flink-streaming-java:$flinkVersion:tests"  
    testImplementation "org.apache.flink:flink-runtime:$flinkVersion:tests"  
    testImplementation "org.apache.flink:flink-test-utils-junit:$flinkVersion"  
    testImplementation "org.apache.flink:flink-test-utils_2.11:1.14.4"  
    testImplementation 'org.assertj:assertj-core:3.20.2'  
}  
  
test {  
    useJUnitPlatform()  
}
```


# Run Remotely
```java
final ExecutionEnvironment env = ExecutionEnvironment.createRemoteEnvironment(  
        "127.0.0.1",  
        8080,  
        "test.jar");
```

Program arguments in IntelliJ Run/Debug Configuration
```python
-m 127.0.0.1:8080 --input /Users/john/Downloads/words.txt --output --output /Users/john/playground/flink/output/
```


# Debugging








# Test