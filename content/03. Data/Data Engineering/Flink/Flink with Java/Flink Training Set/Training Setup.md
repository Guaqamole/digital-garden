---
title: Training Setup
date: 2025-01-10
draft: false
tags:
  - DataEngineering
  - Flink
complete: true
---
# Githubs Exercises
- https://github.com/apache/flink-training
- https://github.com/apache/flink/tree/master/flink-examples

# apache - flink examples
1. [Filtering a Stream (Ride Cleansing)](https://github.com/apache/flink-training/blob/master/ride-cleansing)
2. [Stateful Enrichment (Rides and Fares)](https://github.com/apache/flink-training/blob/master/rides-and-fares)
3. [Windowed Analytics (Hourly Tips)](https://github.com/apache/flink-training/blob/master/hourly-tips)
    - [Exercise](https://github.com/apache/flink-training/blob/master/hourly-tips/README.md)
    - [Discussion](https://github.com/apache/flink-training/blob/master/hourly-tips/DISCUSSION.md)
4. [`ProcessFunction` and Timers (Long Ride Alerts)](https://github.com/apache/flink-training/blob/master/long-ride-alerts)
    - [Exercise](https://github.com/apache/flink-training/blob/master/long-ride-alerts/README.md)
    - [Discussion](https://github.com/apache/flink-training/blob/master/long-ride-alerts/DISCUSSION.md)
## Setup
- a JDK for Java 8 or Java 11
- an IDE for Java (and/or Scala) development with Gradle support

### clone
```python
git clone https://github.com/apache/flink-training.git
cd flink-training

java --version
openjdk 11.0.25 2024-10-15 LTS

./gradlew test shadowJar
BUILD SUCCESSFUL in 44s
26 actionable tasks: 26 executed
```


### IDE
- import project into IDE and run test
- org.apache.flink.training.exercises.ridecleansing.RideCleansingUnitTest
![](https://i.imgur.com/AABeDWD.png)


### Data
- Data is from data generators
-  [New York City Taxi & Limousine Commission's](http://www.nyc.gov/html/tlc/html/home/home.shtml) public dataset
- https://uofi.app.box.com/v/NYCtaxidata
- Each Ride is represented by two events: TRIP START, TRIP END
#### Trip Start
```python
rideId         : Long      // a unique id for each ride
taxiId         : Long      // a unique id for each taxi
driverId       : Long      // a unique id for each driver
isStart        : Boolean   // TRUE for ride start events, FALSE for ride end events
eventTime      : Instant   // the timestamp for this event
startLon       : Float     // the longitude of the ride start location
startLat       : Float     // the latitude of the ride start location
endLon         : Float     // the longitude of the ride end location
endLat         : Float     // the latitude of the ride end location
passengerCnt   : Short     // number of passengers on the ride
```

#### Trip End
```python
rideId         : Long      // a unique id for each ride
taxiId         : Long      // a unique id for each taxi
driverId       : Long      // a unique id for each driver
startTime      : Instant   // the start time for this ride
paymentType    : String    // CASH or CARD
tip            : Float     // tip for this ride
tolls          : Float     // tolls for this ride
totalFare      : Float     // total fare collected
```


### Run Program
You can run exercises, solutions, and tests with the `gradlew` command.

To run tests:
```shell
./gradlew test
./gradlew :<subproject>:test
```

For Java/Scala exercises and solutions, we provide special tasks that can be listed with:
```shell
./gradlew printRunTasks
------------------------------------------------------------
Flink Training Tasks runnable from root project 'flink-training'
------------------------------------------------------------

> Subproject 'hourly-tips'
./gradlew :hourly-tips:runJavaExercise
./gradlew :hourly-tips:runJavaSolution

> Subproject 'long-ride-alerts'
./gradlew :long-ride-alerts:runJavaExercise
./gradlew :long-ride-alerts:runJavaSolution

> Subproject 'ride-cleansing'
./gradlew :ride-cleansing:runJavaExercise
./gradlew :ride-cleansing:runJavaSolution

> Subproject 'rides-and-fares'
./gradlew :rides-and-fares:runJavaExercise
./gradlew :rides-and-fares:runJavaSolution
```

Running Application Example
```python
./gradlew :ride-cleansing:runJavaExercise
```
### MissingSolutionException
**ℹ️ Note:** As long as your `...Exercise` class is throwing a `MissingSolutionException`, the provided JUnit test classes will ignore that failure and verify the correctness of the solution implementation instead.
**→ MissingSolutionException 지워야함.**

Like most of these exercises, at some point the `RideCleansingExercise` class throws an exception

```java
throw new MissingSolutionException();
```

Once you remove this line, the test will fail until you provide a working solution. You might want to first try something clearly broken, such as

```java
return false;
```

in order to verify that the test does indeed fail when you make a mistake, and then work on implementing a proper solution.



## 1. Filtering Stream (RideCleansing)
- cleanse a stream of TaxiRide events by **removing events that start or end outside of New York City**.

### location
The `GeoUtils` utility class provides a static method `isInNYC(float lon, float lat)` to check if a location is within the NYC area.

```python
GeoUtils.isInNYC()...
```

```python
boolean startOut = isInNYC(0, 90); // false
boolean endOut = isInNYC(0, 90); // false
```

### My Solution
```python
public static class NYCFilter implements FilterFunction<TaxiRide> {  
    @Override  
    public boolean filter(TaxiRide taxiRide) {  
        boolean isStartInNYC = GeoUtils.isInNYC(taxiRide.startLon, taxiRide.startLat);  
        boolean isEndInNYC = GeoUtils.isInNYC(taxiRide.endLon, taxiRide.endLat);  
        return isStartInNYC && isEndInNYC;  
    }  
}
```

### Tests
You will find the tests for this exercise in
- Java: [`org.apache.flink.training.exercises.ridecleansing.RideCleansingIntegrationTest`](https://github.com/apache/flink-training/blob/master/ride-cleansing/src/test/java/org/apache/flink/training/exercises/ridecleansing/RideCleansingIntegrationTest.java)
- Java: [`org.apache.flink.training.exercises.ridecleansing.RideCleansingUnitTest`](https://github.com/apache/flink-training/blob/master/ride-cleansing/src/test/java/org/apache/flink/training/exercises/ridecleansing/RideCleansingUnitTest.java)
- Scala: [`org.apache.flink.training.exercises.ridecleansing.scala.RideCleansingIntegrationTest`](https://github.com/apache/flink-training/blob/master/ride-cleansing/src/test/scala/org/apache/flink/training/exercises/ridecleansing/scala/RideCleansingIntegrationTest.scala)
- Scala: [`org.apache.flink.training.exercises.ridecleansing.scala.RideCleansingUnitTest`](https://github.com/apache/flink-training/blob/master/ride-cleansing/src/test/scala/org/apache/flink/training/exercises/ridecleansing/scala/RideCleansingUnitTest.scala)
#### unittest & integrationTest
```python
./gradlew :ride-cleansing:test

// FAILED
> Task :ride-cleansing:test
org.apache.flink.training.exercises.ridecleansing.RideCleansingIntegrationTest > testAMixtureOfLocations FAILED
    java.lang.AssertionError at RideCleansingIntegrationTest.java:62

org.apache.flink.training.exercises.ridecleansing.RideCleansingUnitTest > testRideThatStartsAndEndsOutsideNYC FAILED
    org.opentest4j.AssertionFailedError at RideCleansingUnitTest.java:61

org.apache.flink.training.exercises.ridecleansing.RideCleansingUnitTest > testRideThatStartsAndEndsInNYC FAILED
    org.opentest4j.AssertionFailedError at RideCleansingUnitTest.java:40
5 tests completed, 3 failed

// SUCCESS
BUILD SUCCESSFUL in 2s
8 actionable tasks: 2 executed, 6 up-to-date

```

### SOLUTION
Reference solutions are available in this project:
- Java: [`org.apache.flink.training.solutions.ridecleansing.RideCleansingSolution`](https://github.com/apache/flink-training/blob/master/ride-cleansing/src/solution/java/org/apache/flink/training/solutions/ridecleansing/RideCleansingSolution.java)
- Scala: [`org.apache.flink.training.solutions.ridecleansing.scala.RideCleansingSolution`](https://github.com/apache/flink-training/blob/master/ride-cleansing/src/solution/scala/org/apache/flink/training/solutions/ridecleansing/scala/RideCleansingSolution.scala)


## 3. 