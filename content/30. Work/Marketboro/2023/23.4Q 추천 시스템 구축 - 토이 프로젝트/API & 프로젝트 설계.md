## 페이지별 쿼리
### 사용된 테이블
- **gred.cmt_goods** 
	- goods_name
	- price
	- unit
	- standard

- **gred.cmt_vendor**
	- vendor_name
	- delivery_type

- **namkyu.fs_order_goods_for_recommend**

- **namkyu.fs_recommend_goods_for_biz_category**

- **namkyu.fs_recommend_goods_for_shop**

- **namkyu.fs_shop_biz_category**

### 1. 카테고리 상품 목록
```sql
# 1.1 동일 업종 카테고리별 상품 목록 (판매 인기순)
select  
    rcbc.goods_id,  
    bc.biz_cate3_code,  
    cv.vendor_name,  
    cg.goods_name,  
    cg.standard,  
    cg.unit,  
    cg.price  
from fs_shop_biz_category bc  
inner join fs_recommend_goods_for_biz_category rcbc on bc.biz_cate3_code = rcbc.biz_cate_code  
inner join gred.cmt_goods cg on rcbc.goods_id = cg.goods_id  
left join gred.cmt_vendor cv on cg.vendor_id = cv.vendor_id  
where biz_cate3 is not null  
and rcbc.vendor_id is null # 카테고리 검색시 판매자 랭킹은 고려하지 않음  
and shop_id = 313  
and goods_category_id = 267  
order by ranking;
```

### 2. 직배송 업체별 상품목록
```sql
# 2 직배송 업체별 상품 목록

# 2.1 카테고리별 상품 목록
SET @vendor_id = 1517;
select a.goods_id,
       cgc.category_name,
       a.count
from (select bc.goods_id,
             count(goods_id) as count
      from fs_recommend_goods_for_biz_category bc
      where vendor_id = @vendor_id
        and vendor_id is not null
      group by goods_id
      order by count desc) a
inner join gred.cmt_goods cg on a.goods_id = cg.goods_id
inner join gred.cmt_goods_category cgc on cgc.category_id = cg.category_id;

# 2.2 전체 상품 목록
select goods_id
from fs_recommend_goods_for_biz_category
where vendor_id = @vendor_id
order by score desc;
```


### 3. 구매자 추천
```sql
# 3 구매자 추천

# 3.1 구매자별 상품목록이 포함된 페이지
select goods_id
from fs_recommend_goods_for_shop
where shop_id = @shop_id
order by ranking desc;


# 실제 결과 리턴
select  
    id,  
    cg.goods_name,  
    cg.price  
from fs_recommend_goods_for_shop rg  
left join gred.cmt_goods cg on rg.goods_id = cg.goods_id  
where shop_id = :shopId  
order by ranking;
```


### 4. 구매자 정보
```sql
select
	shop_id,
	name,
	bizno_validation,
	biz_type,
	biz_cate1,
	biz_cate2,
	biz_cate3,
	biz_kind,
	major_product,
	open_d
from namkyu.fs_shop_biz_category
```


### 5. 구매자 구매내역
```sql
select  
    og.order_goods_id,  
    cog.goods_name,  
    cgc.category_name,  
    og.regist_dt,  
    og.price,  
    og.qty  
from fs_order_goods_for_recommend og  
left join gred.cmt_order_goods cog on og.order_goods_id = cog.order_goods_id  
left join gred.cmt_goods_category cgc on og.goods_category3_id = cgc.category_id  
where og.shop_id = 57
```


## API Endpoints
| Type     | Method | Endpoint                                  | Response                          | Desc                           |
|:-------- |:------ |:----------------------------------------- |:--------------------------------- | ------------------------------ |
| Shop     | GET    | /api/v1/fs/shop/{shop-id}                      | 구매자 정보 (List)                | 구매자별 추천 상품 조회        |
| Shop     | GET    | /api/v1/fs/shop/{shop-id}/order-goods                | 구매자 상품 구매 내역 (List)      | 구매자별 상품 구매내역 조회    |
| Shop     | GET    | /api/v1/fs/shop/{shop-id}/recommend-goods | 랭킹별 상품 (List)                | 개인별 추천 상품 조회          |
| Shop     | GET    | /api/v1/fs/shop/{shop-id}/recommend-goods/category/{category-id}        | 카테고리 상품               | 카테고리 상품 추천 목록          |
| Shop     | GET    | /api/v1/fs/shop/{shop-id}/recommend-goods/vendor/{vendor-id}         | 업체 상품 (List)                | 특정 업체 상품 추천 목록  

sort option enum 구현해보기.
## Project Structure
#### Before
```
> config
	> SwaggerConfiguration.java
> controller
	> GoodsController.java
	> VendorController.java
	> ShopController.java
	> AdminController.java
> model
	> dto
		> CategoryResponseDto
		> CategoryGoodsResponseDto
		> ShopResponseDto
		> ShopGoodsResponseDto
		> VendorResponseDto
		> VendorGoodsReponseDto
	> entity
		> Goods.java						(cmt_goods)
		> GoodsCategory.java 				(cmt_goods_category)
		> Vendor.java 						(cmt_vendor)
		> ShopBizCategory.java 				(fs_shop_biz_category)
		> RecommendOrderGoods.java			(fs_order_goods_recommend)
		> RecommendGoodsForShop.java		(fs_recommend_goods)
		> RecommendGoodsForBizCategory.java	(fs_recommend_goods_for_shop_biz)
> repository
	> CategoryRepository
	> ShopRepository
	> VendorRepository
> service
	> CategoryService
	> ShopService
	> VendorService
	> impl
		> CategoryServiceImpl
		> ShopServiceImpl
		> VendorServiceImpl
> exception
> logging
```


#### 1st After
- JPA Native 쿼리 기반으로 Entity 작성
```sh
> config
	> SwaggerConfiguration
> controller
	> ShopController
> model
	> dto
		> ShopResponseDto 								
		> ShopOrderGoodsResponseDto					
		> ShopRecommendGoodsResponseDto				
		> ShopRecommendGoodsByCategoryResponseDto		
		> ShopRecommendGoodsByVendorResponseDto		
	> entity
		> Shop 								(구매자 정보)
		> ShopOrderGoods					(구매자 구매내역)
		> ShopRecommendGoods				(구매자 개인화 추천상품)
		> ShopRecommendGoodsByCategory		(구매자 카테고리별 추천상품)
		> ShopRecommendGoodsByVendor		(구매자 판매자별 추천상품)
> repository
	> ShopRepository
> service
	> ShopService
	> impl
		> ShopServiceImpl
> exception
> logging
```


DAO를 Response로 뽑아보기.


## Dependency & Project Info
group: com.marketboro.da.servingapi
artifact: recommendation

- Spring Web
- Spring Configuration Processor
- Lombok
- JPA
- Mysql Driver
- Swagger
