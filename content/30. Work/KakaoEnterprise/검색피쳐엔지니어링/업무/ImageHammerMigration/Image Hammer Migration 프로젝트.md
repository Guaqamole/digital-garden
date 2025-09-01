# 파악
## Argon api vs Hammer API
argon api: 문서, 섬네일, md5등으로 요청
hammer api: ndid key로 요청


## Test
### https://mynote3692.tistory.com/19
- hammer: http://image-hammer.is.onkakao.net:18080/image/view/ndid64?key=1888525436355723156
- docGsid: http://dp.is.kakaocorp.com:9000/v3/documents/docgsid?gsid=tstory-7276108_19&collection=BL_S_TISTORY
- imgGsid: http://dp.is.kakaocorp.com:9000/v3/images/imggsid?gsid=61yyqUDmNYZTN2eU0s&collection=BL_S_TISTORY
- md5: http://dp.is.kakaocorp.com:9000/v3/images/imgmd5?md5=09c269e886c2d03b6bc9b4c9b5f5a422&collection=BL_S_CRAWL
	- 

## Workflow
https://wiki.daumkakao.com/pages/viewpage.action?pageId=612631196

1. hbase ‘IMAGE.I.NDID64’에서 prefix가 `0$` 인것만 뽑기
	1. `echo "count 'IMAGE.I.NDID64', {INTERVAL=>1}" | hbase shell > ndid64_0_raw.txt`
2. ndid64_0_raw.txt → ndid64_0_staging.csv
	1. pandas 에서 처리 가능한 형식으로 재처리
3. ndid64_0_staging.csv → request argon gsid → argon_response_gsid.json → ndid64_0.csv
	1. response를 최종 결과로 저장

첫 이미지가 단색으로 된 gif 이미지만 뽑기
1. 모든 ndid, gif true 가 하나라도 있는 

기존 이슈 → ndid 0이 잘못 생성 → 큰문제 아님
ndid gif animated 첫 이미지 

예) gif 검수 

첫 이미지가 흰색이여서 모든 이미지가 스팸 처리됨

1. 전체 gif 모두 뽑기 (방법 찾아야함)
	1. 첫번째 이미지가 단색으로 이루어진 gif 뽑기
	2. unique gif image
	3. filler lib 첫번째 이미지 로딩
		1. 단색 찾는법 → pixel rgb 찾기
2. 중복된 이미지 리스트 gif_animated=true
3. black 기준 


뽑을거
imgUrl (썸네일말고)
collection
hash (md5)
dsid vs imgDsid


## Thubnail Url 만드는법
https://search1.kakaocdn.net/argon/600x0_65_wr/2kKqzZZeTVc
## Hbase
```python
echo "count 'IMAGE.I.NDID64', {INTERVAL=>1}" | hbase shell > ndid64_0_raw.txt
```

```python
hbase(main):003:0> scan 'IMAGE.I.NDID64', {'LIMIT'=>2}
ROW                                         COLUMN+CELL
 0$0000462d60fcd9ca64e37b10c9da6489^317171^63JO04bST3sPv5GgXt
 0$0000462d60fcd9ca64e37b10c9da6489^317171^63QLc-NC5oDm4mLu_A
2 row(s) in 0.0080 seconds
```

```python
{ndid}${md5}^{image.docImgGsid}^{image.docImgDsid}

scan 'IMAGE.I.NDID64', {STARTROW=>'0$', ENDROW=>'10'} 
count 'IMAGE.I.NDID64', {STARTROW=>'0$', ENDROW=>'10', INTERVAL=>100} 
count 'IMAGE.I.NDID64', {INTERVAL=>1}
```

```python
hbase(main):018:0> get 'IMAGE', '09c269e886c2d03b6bc9b4c9b5f5a422^3605^63CHhTiATLtb_RnCVe'
get 'IMAGE.I.NDID64', '0$010ba09ce258da4852c6f75ae693a103^1827^63WLVbMFCdyHmKG7Jg'
```

```python
hbase(main):001:0> count 'IMAGE.I.NDID64', {FILTER=> "PrefixFilter('0$')"}
hbase(main):001:0> scan 'IMAGE.I.NDID64', {FILTER=> "PrefixFilter('10')", 'LIMIT'=>2}
Current count: 1000, row: 0$010ba09ce258da4852c6f75ae693a103^1827^63WLVbMFCdyHmKG7Jg
Current count: 2000, row: 0$01f444930eb54f21dea45ee2f52993d6^7437^68fLH5iD3lyu6397J-
...
Current count: 514000, row: 0$fdecc07dffe25a17eb899dab37b5a72c^3384277^63ys2FLW8mY5eXcH57
Current count: 515000, row: 0$fea02b27bffd31b784814bf878a89aec^8547^63UMafQU02_kG3KKLI
Current count: 516000, row: 0$ff375ab3ad0f1054024331fcdb20c15b^3745^68J4ZCvfFQBE71T8dk
Current count: 517000, row: 10000000770241501549$a564645f0f5dc46284f4cb1f2dca71dd^235451^63LMvLc7c3sCz8sTIQ

image.imghashMD5, image.imgMeta.metadata.size.toString, image.docImgGsid, image.docImgDsid
```

```python
get '', ''
scan '', {'LIMIT'=>1}
```


ndid start: `0$0000462d60fcd9ca64e37b10c9da6489^317171^63JO04bST3sPv5GgXt`
- http://image-hammer.is.onkakao.net:18080/image/view/ndid64?key=0

ndid end: `0$ffff0589770740d23090e3c95725cfbc^14411824^63VEJ9hRvmPg-78T3o`
- http://image-hammer.is.onkakao.net:18080/image/view/ndid64?key=0&start=0$ffff0589770740d23090e3c95725cfbc^14411824^63VEJ9hRvmPg-78T3o&size=1
- http://image-hammer.is.onkakao.net:18080/image/view/ndid64?key=0&start=0$ffff0589770740d23090e3c95725cfbc^14411824^63VEJ9hRvmPg-78T3o&size=100


잘못된 예시: https://postfiles.pstatic.net/MjAxODEyMDhfMTUw/MDAxNTQ0MjY5NzE0NTY3.0YKR60xxAjfpzGlmvlsEXJPXBfUbZo43uTIFrqsOGhIg.Y2iTQ0e_I9TkusNwYR3gj2GopkaUwfqQ5m1Fgmat2ikg.GIF.sldp25/GOMCAM_20181125_0003250638.gif?type=w773


## How to Make
program input
- chunk_size

docdsid vs dsid vs imgdsid
argon wiki → 확인 필요

문제점들 argon 에 날려보기



# 회의
## 2024-11 회의전 팀내 회의
hbase image → straw 전환 필요

기존에 쓰고있던 butcher 도 변경
현재는 butcher api 



argon-bl_s tistory의 image 정보 → 이미지 bypass 라는 로직을 통해 → 검수를 해야하는지 내려보내는지 진행
만약 검수 필요 → redis queue
던전 → redis queue
검수한 결과를 mysql → 근데 mysql을 걷어내고 straw에 집어넣을 예정.


이미지 해머의 경우 기존 모든 이미지 해머
ndid 

4시에 어떤 회의? (마일스톤 잡아야함)
1. 서비스에서 어떻게 interfacing 할건지
2. 동적, 정적, 랜덤 interface field는 어떻게 하는건지
3. 해머 인터페이싱할때 필드 레이턴시는 어느정도 개런티 되고있는지?
이렇게 api를 제공할거야. 협의하자.

### 기대효과
nimha butcher → nimha opera api 이말은즉 
dsid → ndid
우리 hbase → 
빠진걸 찾으려고 mr  돌라는데 → 이것도 걷어낼수있음

### 회의관련없이 내부적으로는 어떤걸 해야하는지?
nimha butcher → 내릴수 없으니 2개 띄워야함
straw box에 ndid sync 하고, 2셀 test 띄우고 저희도 

ndid64 (argon) → image의 각 pixel 계산해서 관련된 hash 값 → 유사한 이미지 클러스터 id

카스 → 문서, 채널, 이미지(ndid64)


john KAS immage hammer 뭘 봐야하는지?
- 10번체크 던전 컬렉터를 key를 어떻게 lookup 하는지
- as-is kas butcher api 어디쓰는지 확인


## 241128 - SEARCHSPAM-990 회의
- https://jira.daumkakao.com/browse/SEARCHSPAM-990


## 241203 - NDID 회의
### 사전준비
- 전체 ndid0 중, gif vs jpg
- 전체 ndid0 gif 중, valid, invalid
- valid ndid0 gif, valid중, animated gif 는?
- 전체 / anmiated gif
