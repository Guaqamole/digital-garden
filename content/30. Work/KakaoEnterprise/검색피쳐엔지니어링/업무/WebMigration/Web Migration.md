joel, hyot, john


## Docdel 파헤치기
```python
├── main
│   ├── resources
│   │   ├── data
│   │   │   ├── argon-bl_s_crawl-adult.json
│   │   │   ├── argon-bl_s_crawl.json
│   │   │   ├── argon-bl_s_crawl2.json
│   │   │   ├── dungeon-history.json
│   │   │   └── dungeon-queue-history.json
│   │   └── profile
│   │       ├── dev
│   │       │   └── props.conf
│   │       └── prod
│   │           └── props.conf
│   └── scala
│       └── com
│           └── kakaoenterprise
│               └── docdel
│                   ├── Const.scala
│                   ├── app
│                   │   ├── DocdelBlockApp.scala
│                   │   ├── DocdelProcessApp.scala
│                   │   ├── DocdelToArbiterApp.scala
│                   │   ├── DungeonToDocdelApp.scala
│                   │   ├── SampleApp.scala
│                   │   ├── SpamToDungeonApp.scala
│                   │   ├── SpamToLCApp.scala
│                   │   └── TestApp.scala
│                   ├── func
│                   │   ├── AccumulatorMap.scala
│                   │   ├── ArbiterSinkFunction.scala
│                   │   ├── CustomMapFunction.scala
│                   │   ├── DungeonSinkFunction.scala
│                   │   ├── DungeonSourceFunction.scala
│                   │   ├── KafkaSinkFunction.scala
│                   │   ├── KafkaSourceFunction.scala
│                   │   └── LcSinkFunction.scala
│                   ├── impl
│                   │   ├── BlockImpl.scala
│                   │   ├── DungeonImpl.scala
│                   │   ├── EnvImpl.scala
│                   │   ├── ParseImpl.scala
│                   │   └── ProcessImpl.scala
│                   ├── model
│                   │   ├── Docdel.scala
│                   │   ├── Dungeon.scala
│                   │   └── KafkaRecord.scala
│                   ├── package.scala
│                   ├── partitioner
│                   │   └── SimplePartitioner.scala
│                   ├── schema
│                   │   └── KafkaSchema.scala
│                   ├── serializer
│                   │   ├── CustomDateTimeSerializer.scala
│                   │   └── SimpleTupleSchema.scala
│                   └── util
│                       ├── ArgonUtil.scala
│                       ├── ESConnector.scala
│                       ├── ESUtil.scala
│                       ├── HammerUtil.scala
│                       ├── LogConnector.scala
│                       ├── LogUtil.scala
│                       ├── Logging.scala
│                       ├── Pager.scala
│                       ├── Retry.scala
│                       ├── ScalajHttp.scala
│                       ├── WatchCenter.scala
│                       ├── ZkDataUtil.scala
│                       └── ZkUtil.scala
└── test
    └── scala
        └── com
            └── kakaoenterprise
                └── docdel
                    ├── JsonParseTest.scala
                    ├── PackageTest.scala
                    ├── impl
                    │   ├── BlockImplTest.scala
                    │   └── ProcessImplTest.scala
                    ├── model
                    │   └── DungeonTest.scala
                    └── util
                        ├── ArgonUtilTest.scala
                        ├── ESConnectorTest.scala
                        ├── ESUtilTest.scala
                        ├── HammerUtilTest.scala
                        ├── LogUtilTest.scala
                        ├── PagerTest.scala
                        ├── ScalajHttpTest.scala
                        ├── WatchCenterTest.scala
                        └── ZkDataUtilTest.scala

27 directories, 64 files
```