# Overview

https://wiki.daumkakao.com/pages/viewpage.action?pageId=1313655477
https://wiki.daumkakao.com/pages/viewpage.action?pageId=1282242013

## Kas DataModel
https://wiki.daumkakao.com/pages/viewpage.action?pageId=318118037

### article
- 해당 아티클의 컨텐츠를 보고 스팸 여부 판단.
- https://wiki.daumkakao.com/display/searchspam/5.+Kakaostory+Filters
### image
- 초상권문제 잡으려고 만듬
- 카스 이미지 검수 → 
### channel





## Spec
- htmlcontent: blog는 그대로씀 카스는 html이 없음
- ignore 는 아예 필터도 스킵
- delete 필터는 하지만, 해머에 저장은 하지 않는다(?)
- blog.skin: html 콘텐트에 어뷰징 스크립트 넣음. 카스는 없음.
- hure: post 리퀘스트 날리면 작업이 db에 큐처럼 쌓음.


## Hammer
- butcher: api
- filter: 
- ventilator: 수집기

## KasImage
- expose_log → slog
- 노출이 몇번됬고, 클릭이 몇번됬는지 확인
- image hammer api 날려서

- clicklogcollector: dialog에서 로그 수집
- dungeoncollector: argon → hammer  level을 업데이트하는놈
- argoncollector: image vent → argon faceount를 업데이트하는놈
- kafkacollector: kafka log 수집잘 하는지 보는놈

operaAPI → image hammer

## image 검색


## Plugin
- PluginPath: _ 언더바를 붙히자.
- 랜덤조회 (RANDOM API): straw에 원본 (Object) 데이터 조회
- event vs object json 포맷이 약간 다름. 이벤트는 offset 같은게 들어감.
- 

## Questions.
- 카스는 현재 검수가 되고있는 컬렉션인지?
- 카스 1-5까지 나눈 이유?
- https://morpheus-grafana.daumkakao.io/dashboard/db/bifrost-straw-event-status?orgId=1&from=1731250800000&to=1731305634704&panelId=25&fullscreen
	- 동적 이벤트수가 다른 컬렉션에 비해 적지 않은데 왜 데이터가 적은건지?
	- 매일 0시에 배치가 도는건지?


# Kas Dynamic
## System Flow
