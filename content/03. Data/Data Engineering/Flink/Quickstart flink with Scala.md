---
title: Quickstart flink with Scala
date: 2024-11-18
draft: false
tags:
  - Flink
  - Scala
complete: true
---
# How to develop flink app
## 1. 실행 환경 설정
플링크 어플리케이션을 작성할때 청므 해야할 일은 실행환경 execution environment 설정이다. 실행환경은:
- 로컬 머신
- 클러스터
에서 가져 올지 결정한다. `DataStream API` 에서 애플리케이션 실행 환경은 `StreamExecutionEnvironment`로 표현한다.

 앞의 예제에서는 아래 메서드를 호출해 실행환경을 가져왔다. 이 메서드는 메서드를 호출하는 문맥에 따라 로컬이나 원격 실행 환경을 반환.
```scala
static getExecutionEnvironment()
```
- 원격 클러스터에 연결한 클라이언트에서 메서드를 호출하면 원격 실행환경을 반환
- 아래처럼 로컬이나 원격 실행환경을 명시적으로 생성하는것도 가능.
```scala
// local stream environment
val localEnv: StreamExecutionEnvironment.createLocalEnvironment()

// remote stream environment
val remoteEnv = StreamExecutionEnvironment.createRemoteEnvironment(
	"host",
	1234,
	"path/to/jarFile.jar") // 잡매니저로 제출할 JAR 파일의 로컬 위치.
```


## 2. 입력 스트림 읽기
실행환경을 설정하면 실제 처리 로직을 구현하고 스트림을 시작.
`StreamExecutionEnvironment`는 입력 데이터 스트림에서 스트림 소스를 생성하는 메서드를 제공해 애플리케이션으로 데이터를 가져온다.

데이터 스트림은 :
- 메시지큐나 
- 파일, 또는 
- 즉석에서 데이터를 생성하는 <sup>on the fly</sup> 
데이터 소스에서 데이터를 읽을 수 있다. 

```python
val sensorData: DataStream[SensorReading] =
	env.addSource(new SensorSource)
```

플링크는 여러 종류의 데이터 타입을 제공한다. 

SensorReading
- 여기서는 데이터 타입으로 앞에서 정의한 스칼라 케이스 클래스를 사용.
- 센서 식별자와 측정 시점을 나타내는 타임스탬프, 측정한 온도를 포함
- `assignTimestampsAndWatermarks` 메서드는 이벤트 시간처리에 필수인, 타임스탬프와 워터마크를 할당한다.


## 3. 변환 연산 적용
`DataStream` 을 생성하고 나면 이 객체에 변환 연산 <sup>transformation</sup> 을 적용할 . 수있다.
플링크는 여러 종류의 변환 연산을 제공한다. 어떤 변환 연산은 다른 종류의 DataStream을 새로 생성하고, 
어떤 변환은 레코드를 수정하지 않지만 파티션을 나누거나 그룹을 만들어 스트림을 재구성한다. 

```scala
val avgTemp: DataStream[SensorReading] = sensorData  
  // convert Fahrenheit to Celsius using an inlined map function  
  .map( r =>  
  SensorReading(r.id, r.timestamp, (r.temperature - 32) * (5.0 / 9.0)) )  
  // organize stream by sensorId  
  .keyBy(_.id)  
  // group readings in 1 second windows  
  .timeWindow(Time.seconds(1))  
  // compute average temperature using a user-defined function  
  .apply(new TemperatureAverager)
```
- `timeWindow(Time.seconds(5))`: 각 센서 식별자별 파티션 데이터에 5초 길이의 텀블링 윈도우로 그룹을 만드는 변환 연산.
	- [[아파치 플링크로하는 스트림 데이터처리#텀블링 윈도우(Tumbling Window)]]

## 4. 결과 출력
플링크는 외부 시스템으로 데이터를 내보낼 수 있는 여러 스트림 싱크를 제공하며, 필요에 따라 직접 스트리밍 싱크를 구현할 수도 있다.
결과를 내보내지 않고 내부에 결과를 유지하면서 플링크 쿼리 가능한 상태<sup>Queryable State</sup>  기능을 이용해 서비스 하기도한다.

## 5. 실행
애플리케이션 정의가 끝나면 `StreamExecutionEnvironment.execute()` 호출로 애플리케이션을 실행 할 수 있다. 
```scala
env.execute("Compute average sensor temperature")
```

플링크는 애플리케이션을 지연 실행한다. 즉, 스트림 소스와 변환 연산을 생성하는 API를 호출한다고 해서 바로 데이터 처리를 시작하는것이 아니다.
대신, 실행환경에서 API 호출로 생성한 스트림 소스와 변환 연산을 이용해 실행 계획을 만들고, 변환 연산을 스트림 소스에 차례로 적용한 후 마지막에 `execute()` 를 호출하면 프로그램을 실행한다.

- 플링크는 실행 계획에서 생성한 잡그래프를 잡 매니저로 제출한다.
- 실행 환경에 따라 잡매니저를 로컬 스레드 (로컬 실행환경)로 시작하기도하고
- 원격의 잡매니저로 전송하기도 한다.
- 잡매니저가 원격에서 실행중이라면 애플리케이션에 필요한 모든 클래스와 의존 라이브러리를 포함하는 JAR 파일과 잡그래프를 함께 전송한다.




---

# Sample Run (Chapter.4 아파치 플링크 개발 환경설치)
[[아파치 플링크로하는 스트림 데이터처리]]
## Prerequisite
https://github.com/apache/flink-training (from flink-book)
```python
git clone https://github.com/streaming-with-flink/examples-scala.git
```

jdk-1.8
scala-2.11

## Chapter.1
### AverageSensorReadings.scala
```scala
/*  
 * Copyright 2015 Fabian Hueske / Vasia Kalavri * * Licensed under the Apache License, Version 2.0 (the "License"); * you may not use this file except in compliance with the License. * You may obtain a copy of the License at * *  http://www.apache.org/licenses/LICENSE-2.0 * * Unless required by applicable law or agreed to in writing, software * distributed under the License is distributed on an "AS IS" BASIS, * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. * See the License for the specific language governing permissions and * limitations under the License. */package io.github.streamingwithflink.chapter1  
  
import io.github.streamingwithflink.util.{SensorReading, SensorSource, SensorTimeAssigner}  
  
import org.apache.flink.streaming.api.TimeCharacteristic  
import org.apache.flink.streaming.api.scala._  
import org.apache.flink.streaming.api.scala.function.WindowFunction  
import org.apache.flink.streaming.api.windowing.time.Time  
import org.apache.flink.streaming.api.windowing.windows.TimeWindow  
import org.apache.flink.util.Collector  
  
/** Object that defines the DataStream program in the main() method */  
object AverageSensorReadings {  
  
  /** main() defines and executes the DataStream program */  
  def main(args: Array[String]) {  
  
    // set up the streaming execution environment  
    val env = StreamExecutionEnvironment.getExecutionEnvironment  
  
    // use event time for the application  
    env.setStreamTimeCharacteristic(TimeCharacteristic.EventTime)  
    // configure watermark interval  
    env.getConfig.setAutoWatermarkInterval(1000L)  
  
    // ingest sensor stream  
    val sensorData: DataStream[SensorReading] = env  
      // SensorSource generates random temperature readings  
      .addSource(new SensorSource)  
      // assign timestamps and watermarks which are required for event time  
      .assignTimestampsAndWatermarks(new SensorTimeAssigner)  
  
    val avgTemp: DataStream[SensorReading] = sensorData  
      // convert Fahrenheit to Celsius using an inlined map function  
      .map( r =>  
      SensorReading(r.id, r.timestamp, (r.temperature - 32) * (5.0 / 9.0)) )  
      // organize stream by sensorId  
      .keyBy(_.id)  
      // group readings in 1 second windows  
      .timeWindow(Time.seconds(1))  
      // compute average temperature using a user-defined function  
      .apply(new TemperatureAverager)  
  
    // print result stream to standard out  
    avgTemp.print()  
  
    // execute application  
    env.execute("Compute average sensor temperature")  
  }  
}  
  
/** User-defined WindowFunction to compute the average temperature of SensorReadings */  
class TemperatureAverager extends WindowFunction[SensorReading, SensorReading, String, TimeWindow] {  
  
  /** apply() is invoked once for each window */  
  override def apply(  
    sensorId: String,  
    window: TimeWindow,  
    vals: Iterable[SensorReading],  
    out: Collector[SensorReading]): Unit = {  
  
    // compute the average temperature  
    val (cnt, sum) = vals.foldLeft((0, 0.0))((c, r) => (c._1 + 1, c._2 + r.temperature))  
    val avgTemp = sum / cnt  
  
    // emit a SensorReading with the average temperature  
    out.collect(SensorReading(sensorId, window.getEnd, avgTemp))  
  }  
}
```

- 플링크 애플리케이션은 실행 태스크를 여러 태스크매니저로 배포하는 잡매니저(마스터)에 데이터 플로우를 제출.
- 플링크는 분산 시스템이므로 잡매니저와 태스트매니저는 여러 머신에서 별도의 jvm 프로세스로 실행된다.
- 보통 `main()` 메서드에서 데이터 플로우를 조립하고 `StreamExecutionEnvironment.execute()`가 실행 될때 원격의 잡매니저에 데이터 플로우를 제출.
- 플링크는 execute() 메서드를 호출하면 잡 매니저와 태스크매니저 (슬로의 기본값은 사용 할 수 있는 CPU 코어 개수)를 동일 JVM에서 별도 스레드로 시작할 수 있는 모드를 제공한다.


### submit to flink server
#### 특정 scala 파일만 packaging 하고싶다면?
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
                        │   └── AverageSensorReadings.scala // <- 이놈!
                        ├── chapter5
                        │   ├── BasicTransformations.scala
                        │   ├── KeyedTransformations.scala
                        │   ├── MultiStreamTransformations.scala
                        │   ├── RollingSum.scala
						...
						...
```

#### 1. maven shade plugin
pom.xml
- include: 포함할 패키지
- transformer: jar 만들어졌을때 사용할 Main class
```python
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-shade-plugin</artifactId>
			<version>3.0.0</version>
			<executions>
				<execution>
					<phase>package</phase>
					<goals>
						<goal>shade</goal>
					</goals>
					<configuration>
						<filters>
							<filter>
								<includes><include>io/github/streamingwithflink/chapter1/AverageSensorReadings.class</include>
									<include>io/github/streamingwithflink/util/**</include>
								</includes>
							</filter>
						</filters>
						<transformers>  
    						<transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">  
       							<mainClass>io.github.streamingwithflink.AverageSensorReadings.class</mainClass>  
    						</transformer>
						</transformers>
					</configuration>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```


#### 2. mvn package (create jar)
```python
mvn clean package // 명령어 말고 IntelliJ mvn으로 그냥 하자.
```

#### 3. submit
```python
$FLINK_HOME/bin/flink run \
  -m 127.0.0.1:8080 \
  -c io.github.streamingwithflink.chapter1.AverageSensorReadings\
  /Users/john/workspace/examples-scala/target/examples-scala_2.12-1.0.jar 

$FLINK_HOME/bin/flink run \
  -m 127.0.0.1:8080 \
  /Users/john/workspace/examples-scala/target/examples-scala_2.12-1.0.jar 
```



## 플링크 메이븐 프로젝트 부트스트랩
플링크는 자바나 스칼라 플링크 애플리케이션을 메이븐 프로젝트로 생성하는 메이븐 아키타입을 제공한다.

```python
brew install mvn
```

template
```python
mvn archetype:generate \
-DarchetypeGroupId= \
-DarchetypeArtifactId= \
-DarchetypeVersion= \
-DgroupId= \
-DartifactId= \
-Dversion=0.1 \
-Dpackage=org. \
-DinteractiveMode=false
```

example
```python
mvn archetype:generate \
-DarchetypeGroupId=org.apache.flink \
-DarchetypeArtifactId=flink-quickstart-scala \
-DarchetypeVersion=1.7.1 \
-DgroupId=org.apache.flink.quickstart \
-DartifactId=flink-scala-project \
-Dversion=0.1 \
-Dpackage=org.apache.flink.quickstart \
-DinteractiveMode=false
```

```python
tree flink-scala-project
├── pom.xml
└── src
    └── main
        ├── resources
        │   └── log4j.properties
        └── scala
            └── org
                └── apache
                    └── flink
                        └── quickstart
                            ├── BatchJob.scala
                            └── StreamingJob.scala
```


## 플링크 프로젝트 부트스트랩 with SBT
```python
❯ sbt new tillrohrmann/flink-project.g8

copying runtime jar...
[info] resolving Giter8 0.16.2...
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
A Flink Application Project Using sbt 

name [Flink Project]: hello-flink-scala
organization [org.example]: com.guaqamole 
version [0.1-SNAPSHOT]: 0.1-SNAPSHOT
scala_version [2.11.12]: 2.11.12
flink_version [1.14.6]: 1.14.6

Template applied in /Users/john/workspace/./hello-flink-scala
```


```python
cd hello-flink-scala

sbt assembly
[info] Checking every *.class/*.jar file's SHA-1.
[info] Merging files...
[info] SHA-1: 18d284dee61c9f990cb78a9b6d7f159607d0cc35
[success] Total time: 7 s, completed 2024. 11. 21. 오전 11:19:02

ls target/scala-2.11
classes   hello-flink-scala-assembly-0.1-SNAPSHOT.jar   update

$FLINK_HOME/bin/flink run \
  -m 127.0.0.1:8080 \
  -c com.guaqamole.WordCount \
  /Users/john/workspace/flink/hello-flink-scala/target/scala-2.11/hello-flink-scala-assembly-0.1-SNAPSHOT.jar
```