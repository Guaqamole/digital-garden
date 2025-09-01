
## Task.1 Straw에 데이터 입출력 해보기
- Straw 개발서버 : http://console.straw.rehearsal.is.daumkakao.io/
- docs: [http://doc.straw.is.daumkakao.io/](http://doc.straw.is.daumkakao.io/)




## Task.2 Straw Plugin
```python
http://straw.coke.daumkakao.io/boxes/crawler/_events/_blog-hammer?offset=188267922
partition=0
sizeHint=10
style=ConnectsMap


http://straw.coke.daumkakao.io/boxes/crawler/_events/_blog-hammer?
connects[0].fields[0]=meta.channelId
connects[0].target.box=crawler
connects[0].target.maxSize=3
connects[0].target.type=channels

connects[1].alias=id_static
connects[1].fields[0]=id
connects[1].target.box=crawler_hammer
connects[1].target.maxSize=3sds
connects[1].target.type=static

connects[2].alias=id_persistenc
connects[2].fields[0]=id
connects[2].target.box=crawler_hammer
connects[2].target.maxSize=3
connects[2].target.type=persistence

connects[3].alias=parent_static
connects[3].fields[0]=meta.channelId
connects[3].target.box=crawler_hammer
connects[3].target.maxSize=3
connects[3].target.type=static

connects[4].alias=parent_persistence
connects[4].fields[0]=meta.channelId
connects[4].target.box=crawler_hammer
connects[4].target.maxSize=3
connects[4].target.type=persistence

offset=188267922
partition=0
sizeHint=10
style=ConnectsMap
```