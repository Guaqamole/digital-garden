## flink debug

```scala
def createEnv(debug: Boolean): StreamExecutionEnvironment = {
    if(debug) {
      StreamExecutionEnvironment.createLocalEnvironmentWithWebUI(new Configuration())
    }
    else {
      StreamExecutionEnvironment.getExecutionEnvironment
    }
  }
```