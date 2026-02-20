---
title: Flink Streaming API
date: 2024-12-06
draft: false
tags:
  - Flink
complete: true
---
## Streaming dataflow
Flink의 streaming dataflow는 데이터를 받아오는 Data source, 그리고 데이터를 처리하는 Transformation, 데이터를 최종 처리하는 data Sink로 3단계로 구성된다. 데이터를 가져와서 가공하고 저장하는 단계를 flink는 네이밍을 저렇게 한 것이다. dataflow의 구성은 아래 그림과 같다.

![|776](https://i.imgur.com/2gxiPaT.png)

### Data Source
source는 input에 해당하며 어디서부터 데이터를 가져올 것 인가를 정의하는 단계이다.
flink는 기본적으로 StreamExecutionEnviroment로부터 다음의 stream source를 제공하고 있다.

#### File Based
파일로부터 data source를 생성한다.
단순히 local에있는 파일을 읽을수도 있고, HDFS나 s3도 가능하다. 
그리고 파일이 변경이 있을때마다 데이터를 가져올 수 있는 watch 기능도 있다. 
```scala
val env = StreamExecutionEnvironment.getExecutionEnvironment
env.setParallelism(1)

val inputText = env.readTextFile("src/main/resources/log.txt")
inputText.print()
env.execute("example-fileread")
```
StreamExecutionEnviroment를 가져오는 부분과 env.execute()는 flink 프로그램을 하는 기본이다. 이후 작업에선 생략할 것이다.
그리고 간단히 DataStream의 print()를 써서 단순히 콘솔에 찍는것으로 예제를 확인할 것이다.

다시 위 예제를 설명하면 local에 있는 path로 readTextFile로 가져올 수 있다. line별로 하나의 element를 이루고 있다.

#### Socket Based
```scala
val socketStream = env.socketTextStream("localhost", 9999)
socketStream.print()
```


#### Collection Based
collection으로부터 데이터 스트림을 생성하는 방법이다. 단순히 transformation의 연산을 테스트해보기 위해 가장 간단하고 쉽다.

사용하는 API는 다음과 같다.
- fromCollection(Seq)
- fromCollection(Iterator)
- fromElements(elements: _*)
- fromParallelCollection(SplittableIterator)
- generateSequence(from, to)

방법은 다양하지만 결국 Collection의 elements를 DataStream으로 만들어주는것이다.
```scala
val collectionStream = env.fromCollection[Int](List(1,2,3,4,5))
```


#### Custom
파일이나 소켓, Collection등 외에도 직접 사용자가 source를 만들 수 있다. env.addSource(SourceFunction[])를 통해 만들 수 있다.
```scala
class CustomContinueSource(from:Int, to:Int) extends RichSourceFunction[Int] {
val list = List.range(from, to)

override def cancel(): Unit = ???

override def run(ctx: SourceContext[Int]): Unit = {
  while(true) {
    for (i <- list) {
        Thread.sleep(100)
        ctx.collect(i)
      }
    }
  }
}

val stream = env.addSource(new CustomContinueSource(1, 10))
```

1, 10까지 데이터를 100ms 간격으로 무한히 생성해주는 source이다. 이런식으로 RichSourceFunction을 구현해서 addSource로 만들 수 있다.

그리고 kafka나 RabbitMQ등 외부 시스템과 연결을 해주는 [connectors](https://ci.apache.org/projects/flink/flink-docs-release-1.2/dev/connectors/) 들이 이미 구현되어 있다. 주로 flink 와 사용되는 시스템은 대부분 지원을 하고 있다. 아니면 다른 사용자가 미리 만들어놓은 오픈소스가 분명히 있을 것이다. 검색해서 사용하면된다.



### Data Sink
sink는 처리된 stream을 저장하는 단계라고 보면된다. 꼭 저장이 아니여도 된다. stream을 소비하는 단계라 flink의 특징인 lazy evaluation 방식에 따라 stream을 아무리 처리해도 sink단계가 없다면 처리되지 않는다. 

sink는 파일로 저장하거나 socket으로 전달, 그리고 custom sink가 있다.

#### File
```scala
val stream = env.fromCollection(List.range(1, 10))
stream.writeAsText("src/main/resources/sample.txt")
```

#### Socket
```scala
val stream = env.fromCollection(List("A","B","C"))
stream.writeToSocket("localhost", 9999, new SimpleStringSchema())
```

#### Custom
```scala
class DataSinkCustom extends RichSinkFunction[Int] {
  override def invoke(value: Int): Unit = {
    println(s"Custom Sink: $value")
  }
}
 
val stream = env.fromCollection(List.range(1, 10))

stream.addSink(new DataSinkCustom())
```
source와 거의 유사하다. custom의 경우 RichSinkFunction을 구현해 addSink로 만들어서 처리하면 된다.


### Transformation
transformation은 데이터 스트림을 변경시켜 새로운 스트림을 만드는 작업이다. 즉 연산을 통해 중간 데이터 가공이라고 할 수 있다.

Flink는 대부분의 스트르밍 플랫폼과 유사한 API를 지원한다. 

|Transformation|Description|
|---|---|
|**Map**  <br>DataStream → DataStream|Takes one element and produces one element. A map function that doubles the values of the input stream:<br><br>```<br>dataStream.map { x => x * 2 }<br>```|
|**FlatMap**  <br>DataStream → DataStream|Takes one element and produces zero, one, or more elements. A flatmap function that splits sentences to words:<br><br>```<br>dataStream.flatMap { str => str.split(" ") }<br>```|
|**Filter**  <br>DataStream → DataStream|Evaluates a boolean function for each element and retains those for which the function returns true. A filter that filters out zero values:<br><br>```<br>dataStream.filter { _ != 0 }<br>```|
|**KeyBy**  <br>DataStream → KeyedStream|Logically partitions a stream into disjoint partitions, each partition containing elements of the same key. Internally, this is implemented with hash partitioning. See [keys](https://ci.apache.org/projects/flink/flink-docs-release-1.2/dev/api_concepts.html#specifying-keys) on how to specify keys. This transformation returns a KeyedDataStream.<br><br>```<br>dataStream.keyBy("someKey") // Key by field "someKey"<br>dataStream.keyBy(0) // Key by the first element of a Tuple<br>```|
|**Reduce**  <br>KeyedStream → DataStream|A "rolling" reduce on a keyed data stream. Combines the current element with the last reduced value and emits the new value.   <br>  <br>A reduce function that creates a stream of partial sums:<br><br>```<br>keyedStream.reduce { _ + _ }<br>```|
|**Fold**  <br>KeyedStream → DataStream|A "rolling" fold on a keyed data stream with an initial value. Combines the current element with the last folded value and emits the new value.   <br>  <br><br>A fold function that, when applied on the sequence (1,2,3,4,5), emits the sequence "start-1", "start-1-2", "start-1-2-3", ...<br><br>```<br>val result: DataStream[String] =<br>    keyedStream.fold("start")((str, i) => { str + "-" + i })<br>```|
|**Aggregations**  <br>KeyedStream → DataStream|Rolling aggregations on a keyed data stream. The difference between min and minBy is that min returns the minimun value, whereas minBy returns the element that has the minimum value in this field (same for max and maxBy).<br><br>```<br>keyedStream.sum(0)<br>keyedStream.sum("key")<br>keyedStream.min(0)<br>keyedStream.min("key")<br>keyedStream.max(0)<br>keyedStream.max("key")<br>keyedStream.minBy(0)<br>keyedStream.minBy("key")<br>keyedStream.maxBy(0)<br>keyedStream.maxBy("key")<br>```|
|**Window**  <br>KeyedStream → WindowedStream|Windows can be defined on already partitioned KeyedStreams. Windows group the data in each key according to some characteristic (e.g., the data that arrived within the last 5 seconds). See [windows](https://ci.apache.org/projects/flink/flink-docs-release-1.2/dev/windows.html) for a description of windows.<br><br>```<br>dataStream.keyBy(0).window(TumblingEventTimeWindows.of(Time.seconds(5))) // Last 5 seconds of data<br>```|
|**WindowAll**  <br>DataStream → AllWindowedStream|Windows can be defined on regular DataStreams. Windows group all the stream events according to some characteristic (e.g., the data that arrived within the last 5 seconds). See [windows](https://ci.apache.org/projects/flink/flink-docs-release-1.2/dev/windows.html) for a complete description of windows.<br><br>**WARNING:** This is in many cases a **non-parallel** transformation. All records will be gathered in one task for the windowAll operator.<br><br>```<br>dataStream.windowAll(TumblingEventTimeWindows.of(Time.seconds(5))) // Last 5 seconds of data<br>```|
|**Window Apply**  <br>WindowedStream → DataStream  <br>AllWindowedStream → DataStream|Applies a general function to the window as a whole. Below is a function that manually sums the elements of a window.<br><br>**Note:** If you are using a windowAll transformation, you need to use an AllWindowFunction instead.<br><br>```<br>windowedStream.apply { WindowFunction }<br><br>// applying an AllWindowFunction on non-keyed window stream<br>allWindowedStream.apply { AllWindowFunction }<br>```|
|**Window Reduce**  <br>WindowedStream → DataStream|Applies a functional reduce function to the window and returns the reduced value.<br><br>```<br>windowedStream.reduce { _ + _ }<br>```|
|**Window Fold**  <br>WindowedStream → DataStream|Applies a functional fold function to the window and returns the folded value. The example function, when applied on the sequence (1,2,3,4,5), folds the sequence into the string "start-1-2-3-4-5":<br><br>```<br>val result: DataStream[String] =<br>    windowedStream.fold("start", (str, i) => { str + "-" + i })<br>```|
|**Aggregations on windows**  <br>WindowedStream → DataStream|Aggregates the contents of a window. The difference between min and minBy is that min returns the minimum value, whereas minBy returns the element that has the minimum value in this field (same for max and maxBy).<br><br>```<br>windowedStream.sum(0)<br>windowedStream.sum("key")<br>windowedStream.min(0)<br>windowedStream.min("key")<br>windowedStream.max(0)<br>windowedStream.max("key")<br>windowedStream.minBy(0)<br>windowedStream.minBy("key")<br>windowedStream.maxBy(0)<br>windowedStream.maxBy("key")<br>```|
|**Union**  <br>DataStream* → DataStream|Union of two or more data streams creating a new stream containing all the elements from all the streams. Note: If you union a data stream with itself you will get each element twice in the resulting stream.<br><br>```<br>dataStream.union(otherStream1, otherStream2, ...)<br>```|
|**Window Join**  <br>DataStream,DataStream → DataStream|Join two data streams on a given key and a common window.<br><br>```<br>dataStream.join(otherStream)<br>    .where(<key selector>).equalTo(<key selector>)<br>    .window(TumblingEventTimeWindows.of(Time.seconds(3)))<br>    .apply { ... }<br>```|
|**Window CoGroup**  <br>DataStream,DataStream → DataStream|Cogroups two data streams on a given key and a common window.<br><br>```<br>dataStream.coGroup(otherStream)<br>    .where(0).equalTo(1)<br>    .window(TumblingEventTimeWindows.of(Time.seconds(3)))<br>    .apply {}<br>```|
|**Connect**  <br>DataStream,DataStream → ConnectedStreams|"Connects" two data streams retaining their types, allowing for shared state between the two streams.<br><br>```<br>someStream : DataStream[Int] = ...<br>otherStream : DataStream[String] = ...<br><br>val connectedStreams = someStream.connect(otherStream)<br>```|
|**CoMap, CoFlatMap**  <br>ConnectedStreams → DataStream|Similar to map and flatMap on a connected data stream<br><br>```<br>connectedStreams.map(<br>    (_ : Int) => true,<br>    (_ : String) => false<br>)<br>connectedStreams.flatMap(<br>    (_ : Int) => true,<br>    (_ : String) => false<br>)<br>```|
|**Split**  <br>DataStream → SplitStream|Split the stream into two or more streams according to some criterion.<br><br>```<br>val split = someDataStream.split(<br>  (num: Int) =><br>    (num % 2) match {<br>      case 0 => List("even")<br>      case 1 => List("odd")<br>    }<br>)<br>```|
|**Select**  <br>SplitStream → DataStream|Select one or more streams from a split stream.<br><br>```<br>val even = split select "even"<br>val odd = split select "odd"<br>val all = split.select("even","odd")<br>```|
|**Iterate**  <br>DataStream → IterativeStream → DataStream|Creates a "feedback" loop in the flow, by redirecting the output of one operator to some previous operator. This is especially useful for defining algorithms that continuously update a model. The following code starts with a stream and applies the iteration body continuously. Elements that are greater than 0 are sent back to the feedback channel, and the rest of the elements are forwarded downstream. See [iterations](https://ci.apache.org/projects/flink/flink-docs-release-1.2/dev/datastream_api.html#iterations) for a complete description.<br><br>```<br>initialStream.iterate {<br>  iteration => {<br>    val iterationBody = iteration.map {/*do something*/}<br>    (iterationBody.filter(_ > 0), iterationBody.filter(_ <= 0))<br>  }<br>}<br>```|
|**Extract Timestamps**  <br>DataStream → DataStream|Extracts timestamps from records in order to work with windows that use event time semantics. See [Event Time](https://ci.apache.org/projects/flink/flink-docs-release-1.2/apis/streaming/event_time.html).<br><br>```<br>stream.assignTimestamps { timestampExtractor }<br>```|