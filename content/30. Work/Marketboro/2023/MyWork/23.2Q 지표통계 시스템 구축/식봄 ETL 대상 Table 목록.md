# Overview

- 식봄 MySQL 데이터를 DW로 ETL 실행할 대상 목록 정리
    
- 식봄 MySQL 테이블단위로 비정규화를 거쳐서 DW에 적재 시킨다.
    

# ETL 대상 테이블 목록

- 식봄 MySQL 테이블은 `cmt_` prefix로 시작
    
- 식봄 BigQuery 의 Load된 임시 테이블은 `tmp_` prefix로 시작
    
- 식봄 BigQuery 의 DW 테이블들은 `dw_fs_` prefix로 시작
    
- 식봄 BigQuery 의 DW 테이블들 중 dimension 테이블들은 `_info` postfix로 끝
    
- **table 목록 하위 항목으로 적혀있는 column들은** `grain` **column 정의**
    

## 공통 테이블들

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|date_info|||dw_date_info DIMENSTION<br><br>- date_id|ETL 실행안함|
|maker|cmt_maker<br><br>- maker_id|[tmp_maker](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/maker/maker_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/maker/maker_get_update.sql")<br><br>- maker_id|[dw_fs_maker_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/maker/maker_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/maker/maker_merge.sql") DIMENSTION<br><br>- maker_id|증분 데이터 수집|
|coupon_promotion|cmt_coupon_promotion<br><br>- coupon_promotion_id|[tmp_coupon_promotion](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/coupon_promotion/coupon_promotion_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/coupon_promotion/coupon_promotion_get_update.sql")<br><br>- coupon_promotion_id|[dw_fs_coupon_promotion_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/coupon_promotion/coupon_promotion_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/coupon_promotion/coupon_promotion_merge.sql") DIMENSTION<br><br>- coupon_promotion_id|증분 데이터 수집|
|delivery_area|cmt_delivery_area<br><br>- delivery_area_id|[tmp_delivery_area](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/delivery_area/delivery_area_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/delivery_area/delivery_area_get_update.sql")<br><br>- delivery_area_id|[dw_fs_delivery_area_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/delivery_area/delivery_area_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/delivery_area/delivery_area_merge.sql") DIMENSTION<br><br>- delivery_area_id|증분 데이터 수집|
|goods_category|cmt_goods_category<br><br>- category_id|[tmp_goods_category](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_category/goods_category_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_category/goods_category_get_update.sql")<br><br>- category_id|[dw_fs_goods_category_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_category/goods_category_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_category/goods_category_merge.sql") DIMENSTION<br><br>- category_id|증분 데이터 수집|

## 구매자 (Shop) 관련 테이블들

### grain = `shop_id` 테이블들 → dw_fs_shop 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|shop|cmt_shop<br><br>- shop_id|[tmp_shop](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop/shop_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop/shop_get_update.sql")<br><br>- shop_id|[dw_fs_shop](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop/shop_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop/shop_merge.sql") FACT<br><br>- shop_id<br>    <br><br>[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop/shop_info_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop/shop_info_merge.sql") DIMENSTION<br><br>- shop_id|증분 데이터 수집|
|shop_address|cmt_shop_address<br><br>- shop_id<br>    <br>- shop_address_id|[tmp_shop_address](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_address/shop_address_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_address/shop_address_get_update.sql")<br><br>- shop_id<br>    <br>- shop_address_id|[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_address/shop_address_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_address/shop_address_merge.sql") DIMENSTION<br><br>- shop_id<br>    <br>- address <ARRAY><br>    <br>    - shop_address_id|전체 데이터 수집|
|shop_grade|cmt_shop_grade<br><br>- shop_id|[tmp_shop_grade](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade/shop_grade_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade/shop_grade_get_update.sql")<br><br>- shop_id|[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade/shop_grade_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade/shop_grade_merge.sql") DIMENSTION<br><br>- shop_id<br>    <br>- grade <STRUCT>|증분데이터 수집<br><br>전체 데이터 수집 (23.08.03)<br><br>- 회원 탈퇴시 shop_grade row가 삭제되기 때문에 전체데이터 수집필요|
|shop_business_info|cmt_shop_business_info<br><br>- shop_id|[tmp_shop_business_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_business_info/shop_business_info_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_business_info/shop_business_info_get_update.sql")<br><br>- shop_id|[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_business_info/shop_business_info_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_business_info/shop_business_info_merge.sql") DIMENSTION<br><br>- shop_id<br>    <br>- business_info <STRUCT><br>    <br>    - _참고_: 사업자 등록 번호를 2개 이상 가진 구매자가 있어 `shop_business_info` - `id` 컬럼의 max 값을 기준으로 tmp 테이블 생성<br>        <br>    - 오른쪽 사진 기준 shop_id = 67은 test 계정.|증분 데이터 수집<br><br>![](blob:https://boro.atlassian.net/c2688d29-467b-4580-b097-d64f6ec95270#media-blob-url=true&id=6c15274e-2ee3-437e-8d50-fc90dfed246f&collection=contentId-2612002887&contextId=2612002887&height=312&width=197&alt=)|
|shop_bookmark_goods|cmt_bookmark<br><br>- shop_id<br>    <br>- goods_id|[tmp_bookmark_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_get_update.sql")<br><br>- shop_id<br>    <br>- goods_id|[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_goods_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_goods_merge.sql") DIMENSTION<br><br>- shop_id<br>    <br>- bookmark_goods <ARRAY><br>    <br>    - goods_id|전체 데이터 수집|
|shop_bookmark_vendor|cmt_bookmark<br><br>- shop_id<br>    <br>- vendor_id|[tmp_shop_bookmark_vendor](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_get_update.sql")<br><br>- shop_id<br>    <br>- vendor_id|[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_vendor_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_vendor_merge.sql") DIMENSTION<br><br>- shop_id<br>    <br>- bookmark_vendor <ARRAY><br>    <br>    - vendor_id|전체 데이터 수집|
|shop_bookmark_menu|cmt_bookmark<br><br>- shop_id<br>    <br>- menu_id|[tmp_shop_bookmark_menu](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_get_update.sql")<br><br>- shop_id<br>    <br>- menu_id|[dw_fs_shop_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_menu_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/bookmark/bookmark_menu_merge.sql") DIMENSTION<br><br>- shop_id<br>    <br>- bookmark_menu <ARRAY><br>    <br>    - menu_id|전체 데이터 수집|
|shop_deposit|**cmt_deposit (증분 기준)**<br><br>- deposit_id<br>    <br><br>cmt_shop<br><br>- shop_id<br>    <br>- deposit_id|[tmp_shop_deposit](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/deposit/deposit_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/deposit/deposit_get_update.sql")<br><br>- shop_id - cmt_shop.deposit_id와 join|[dw_fs_shop](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/deposit/deposit_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/deposit/deposit_merge.sql") FACT<br><br>- shop_id<br>    <br>- deposit <STRUCT>|증분 데이터 수집|
|shop_point|**cmt_point (증분 기준)**<br><br>- point_id<br>    <br><br>cmt_shop<br><br>- shop_id<br>    <br>- point_id|[tmp_shop_point](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/point/point_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/point/point_get_update.sql")<br><br>- shop_id - cmt_shop.point_id와 join|[dw_fs_shop](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/point/point_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/point/point_merge.sql") FACT<br><br>- shop_id<br>    <br>- point <STRUCT>|증분 데이터 수집|

### grain = `shop_id` & Log 테이블들

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|shop_grade_log|cmt_shop_grade_log<br><br>- shop_id<br>    <br>- gl_idx|[tmp_shop_grade_log](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade_log/shop_grade_log_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade_log/shop_grade_log_get_update.sql")<br><br>- shop_id<br>    <br>- gl_idx|[dw_fs_shop_grade_log](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade_log/shop_grade_log_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_grade_log/shop_grade_log_merge.sql") FACT<br><br>- shop_id<br>    <br>- gl_idx|증분 데이터 수집|
|shop_deposit_history|cmt_deposit_history<br><br>- shop_id<br>    <br>- deposit_history_id|[tmp_shop_deposit_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/deposit_history/deposit_history_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/deposit_history/deposit_history_get_update.sql")<br><br>- shop_id<br>    <br>- deposit_history_id|[dw_fs_shop_deposit_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_deposit_history/shop_deposit_history_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_deposit_history/shop_deposit_history_merge.sql") FACT<br><br>- shop_id<br>    <br>- deposit_history_id|증분 데이터 수집|
|shop_coupon_list|**cmt_coupon_list (증분 기준)**<br><br>- coupon_list_id<br>    <br>- coupon_id<br>    <br><br>cmt_coupon<br><br>- coupon_id<br>    <br><br>cmt_shop<br><br>- shop_id<br>    <br>- coupon_id|tmp_shop_coupon_list<br><br>- shop_id - cmt_coupon/cmt_shop 테이블과 join<br>    <br>- coupon_list_id|[dw_fs_shop_coupon_list](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_coupon_list/shop_coupon_list_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_coupon_list/shop_coupon_list_merge.sql") FACT<br><br>- shop_id<br>    <br>- coupon_list_id|증분 데이터 수집|
|shop_coupon_history|**cmt_coupon_history (증분 기준)**<br><br>- coupon_list_id<br>    <br>- coupon_history_id<br>    <br><br>cmt_coupon_list<br><br>- coupon_list_id<br>    <br>- coupon_id<br>    <br><br>cmt_coupon<br><br>- coupon_id<br>    <br><br>cmt_shop<br><br>- shop_id<br>    <br>- coupon_id|[tmp_coupon_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_coupon_history/shop_coupon_history_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_coupon_history/shop_coupon_history_get_update.sql")<br><br>- shop_id - cmt_shop.coupon_id와 join<br>    <br>- coupon_list_id<br>    <br>- coupon_history_id|[dw_fs_shop_coupon_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_coupon_history/shop_coupon_history_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/shop_coupon_history/shop_coupon_history_merge.sql") FACT<br><br>- shop_id<br>    <br>- coupon_list_id<br>    <br>- coupon_history_id|증분 데이터 수집|

## 판매자 (Vendor) 관련 테이블들

### grain = `vendor_id` 테이블들 → dw_fs_vendor 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|vendor|cmt_vendor<br><br>- vendor_id|[tmp_vendor](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor/vendor_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor/vendor_get_update.sql")<br><br>- vendor_id|[dw_fs_vendor_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor/vendor_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor/vendor_merge.sql") DIMENSTION<br><br>- vendor_id|증분 데이터 수집|
|vendor_business|cmt_vendor_business<br><br>- vendor_id<br>    <br>- business_cd|[tmp_vendor_business](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_business/vendor_business_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_business/vendor_business_get_update.sql")<br><br>- vendor_id<br>    <br>- business_cd|[dw_fs_vendor_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_business/vendor_business_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_business/vendor_business_merge.sql") DIMENSTION<br><br>- vendor_id<br>    <br>- business <ARRAY><br>    <br>    - business_cd|전체 데이터 수집|
|vendor_delivery_area|cmt_vendor_delivery_area<br><br>- vendor_id<br>    <br>- delivery_area_id|[tmp_vendor_delivery_area](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_area/vendor_delivery_area_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_area/vendor_delivery_area_get_update.sql")<br><br>- vendor_id<br>    <br>- delivery_area_id|[dw_fs_vendor_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_area/vendor_delivery_area_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_area/vendor_delivery_area_merge.sql") DIMENSTION<br><br>- vendor_id<br>    <br>- delivery_area <ARRAY><br>    <br>    - delivery_area_id|전체 데이터 수집|
|vendor_delivery_price|cmt_vendor_delivery_price<br><br>- vendor_id<br>    <br>- vendor_delivery_price_id|[tmp_vendor_delivery_price](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_price/vendor_delivery_price_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_price/vendor_delivery_price_get_update.sql")<br><br>- vendor_id<br>    <br>- vendor_delivery_price_id|[dw_fs_vendor_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_price/vendor_delivery_price_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/vendor_delivery_price/vendor_delivery_price_merge.sql") DIMENSTION<br><br>- vendor_id<br>    <br>- delivery_price <ARRAY><br>    <br>    - vendor_delivery_price_id|전체 데이터 수집|

### grain = `vendor_id` & Log 테이블들

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
||||||

## 상품 (Goods) 관련 테이블들

### grain = `plan_id` 테이블들 → dw_fs_plan 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|plan|cmt_plan<br><br>- plan_id|[tmp_plan](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan/plan_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan/plan_get_update.sql")<br><br>- plan_id|[dw_fs_plan_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan/plan_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan/plan_merge.sql") DIMENSTION<br><br>- plan_id|증분 데이터 수집|
|plan_category|cmt_plan_category<br><br>- plan_id<br>    <br>- plan_category_id|[tmp_plan_category](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan_category/plan_category_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan_category/plan_category_get_update.sql")<br><br>- plan_id<br>    <br>- plan_category_id|[dw_fs_plan_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan_category/plan_category_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/plan_category/plan_category_merge.sql") DIMENSTION<br><br>- plan_id<br>    <br>- plan_category <ARRAY><br>    <br>    - plan_category_id|전체 데이터 수집|

### grain = `goods_id` 테이블들 → dw_fs_goods 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|goods|cmt_goods<br><br>- goods_id|[tmp_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods/goods_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods/goods_get_update.sql")<br><br>- goods_id|[dw_fs_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods/goods_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods/goods_merge.sql") FACT<br><br>- goods_id<br>    <br><br>[dw_fs_goods_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods/goods_info_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods/goods_info_merge.sql") DIMENSTION<br><br>- goods_id|증분 데이터 수집|
|goods_plan|cmt_plan_category_goods<br><br>- goods_id<br>    <br>- plan_id|[tmp_goods_plan](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan/goods_plan_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan/goods_plan_get_update.sql")<br><br>- goods_id<br>    <br>- plan_id<br>    <br>- group by goods_id and DISTINCT plan_id 처리|[dw_fs_goods_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan/goods_plan_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan/goods_plan_merge.sql") DIMENSTION<br><br>- goods_id<br>    <br>- goods_plan <ARRAY><br>    <br>    - plan_id - 해당컬럼만 기록|전체 데이터 수집|
|goods_plan_category|cmt_plan_category_goods<br><br>- goods_id<br>    <br>- plan_category_id|[tmp_goods_plan_category](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan_category/goods_plan_category_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan_category/goods_plan_category_get_update.sql")<br><br>- goods_id<br>    <br>- plan_category_id<br>    <br>- group by goods_id and DISTINCT plan_category_id 처리|[dw_fs_goods_info](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan_category/goods_plan_category_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_plan_category/goods_plan_category_merge.sql") DIMENSTION<br><br>- goods_id<br>    <br>- goods_plan_category <ARRAY><br>    <br>    - plan_category_id - 해당컬럼만 기록|전체 데이터 수집|

### grain = `goods_id` & Log 테이블들

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|goods_price_change_history|cmt_goods_price_change_history<br><br>- goods_id<br>    <br>- goods_price_change_history_id|[tmp_goods_price_change_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_price_change_history/goods_price_change_history_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_price_change_history/goods_price_change_history_get_update.sql")<br><br>- goods_id<br>    <br>- goods_price_change_history_id|[dw_fs_goods_price_change_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_price_change_history/goods_price_change_history_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/goods_price_change_history/goods_price_change_history_merge.sql") FACT<br><br>- goods_id<br>    <br>- goods_price_change_history_id|증분 데이터 수집|

## 주문 (Order) 관련 테이블들

### grain = `order_master_id` 테이블들 → dw_fs_order_master 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|order_master|**cmt_order_master (증분 기준)**<br><br>- order_master_id|[tmp_order_master](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_master/order_master_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_master/order_master_get_update.sql")<br><br>- order_master_id|[dw_fs_order_master](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_master/order_master_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_master/order_master_merge.sql") FACT<br><br>- order_master_id|증분 데이터 수집|
|payment|**cmt_payment (증분 기준)**<br><br>- payment_id<br>    <br>- order_master_id|[tmp_payment](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/payment/payment_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/payment/payment_get_update.sql")<br><br>- order_master_id<br>    <br>- payment_id|[dw_fs_order_master](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/payment/payment_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/payment/payment_merge.sql") FACT<br><br>- order_master_id<br>    <br>- payment <STRUCT>|증분 데이터 수집|

### grain = `order_id` 테이블들 → dw_fs_order 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|order|cmt_order<br><br>- order_id|[tmp_order_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order/order_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order/order_get_update.sql")<br><br>- order_id|[dw_fs_order](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order/order_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order/order_merge.sql") FACT<br><br>- order_id|증분 데이터 수집|

### grain = `order_goods_id` 테이블들 → dw_fs_order_goods 으로 merge

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|order_goods|cmt_order_goods<br><br>- order_goods_id|[tmp_order_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_goods/order_goods_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_goods/order_goods_get_update.sql")<br><br>- order_goods_id|[dw_fs_order_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_goods/order_goods_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_goods/order_goods_merge.sql") FACT<br><br>- order_goods_id|증분 데이터 수집|
|event_order_goods|cmt_event_order_goods<br><br>- order_goods_id|[tmp_event_order_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/event_order_goods/event_order_goods_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/event_order_goods/event_order_goods_get_update.sql")<br><br>- order_goods_id|[dw_fs_order_goods](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/event_order_goods/event_order_goods_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/event_order_goods/event_order_goods_merge.sql") FACT<br><br>- order_goods_id<br>    <br>- event_order_goods|전체 데이터 수집|

### grain = `order_goods_id` & Log 테이블들

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|order_status_history|cmt_order_status_history<br><br>- order_goods_id<br>    <br>- order_status_history_id|[tmp_order_status_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_status_history/order_status_history_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_status_history/order_status_history_get_update.sql")<br><br>- order_goods_id<br>    <br>- order_status_history_id|[dw_fs_order_status_history](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_status_history/order_status_history_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/order_status_history/order_status_history_merge.sql") FACT<br><br>- order_goods_id<br>    <br>- order_status_history_id|증분 데이터 수집|

### grain = `ct_idx` → dw_fs_cart 으로 merge

- cart는 **dw_fs_shop으로 merge하지 않는다.** (비회원 항목도 포함하고 있음)
    

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|cart|cmt_cart<br><br>- ct_idx|[tmp_cart](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/cart/cart_get_update.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/cart/cart_get_update.sql")<br><br>- ct_idx|[dw_fs_cart](https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/cart/cart_merge.sql "https://bitbucket.org/marketboro/airflow_dags_dw_fs_etl/src/master/modules/dw_foodspring_etl/query/cart/cart_merge.sql") FACT<br><br>- ct_idx|전체 데이터 수집|

## 추후 ETL 고려할 테이블들

- 이번 ETL 대상 범위에서는 제외
    
- 추후 검토를 거쳐서 ETL 추가할지 결정
    

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|

|   |   |   |   |   |
|---|---|---|---|---|
|**대상 항목**|**식봄 MySQL**|**BigQuery 임시**|**BigQuery DW**|**ETL 실행 모드**|
|coupon_history|cmt_coupon_history<br><br>- coupon_list_id<br>    <br>- coupon_history_id|tmp_coupon_history<br><br>- coupon_list_id<br>    <br>- coupon_history_id|dw_fs_coupon_history FACT<br><br>- coupon_list_id<br>    <br>- coupon_history_id|증분 데이터 수집|
|delivery_tracking|cmt_delivery_tracking<br><br>- order_goods_id|tmp_delivery_tracking<br><br>- order_goods_id|dw_fs_order_goods FACT<br><br>- order_goods_id<br>    <br>- delivery_tracking <STRUCT>|전체 데이터 수집|
|delivery_tracking_history|cmt_delivery_tracking_history<br><br>- order_goods_id<br>    <br>- delivery_tracking_history_id|tmp_delivery_tracking_history<br><br>- order_goods_id<br>    <br>- delivery_tracking_history_id|dw_fs_delivery_tracking_history FACT<br><br>- order_goods_id<br>    <br>- delivery_tracking_history_id|증분 데이터 수집|
|shop_device|cmt_devices<br><br>- shop_id|tmp_shop_device<br><br>- shop_id|dw_fs_shop_info DIMENSTION<br><br>- shop_id<br>    <br>- device <ARRAY>|전체 데이터 수집|
