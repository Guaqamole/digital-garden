# 배경

식봄에서 쿠폰이 어떻게 발행되고, 사용되는지 알아본다.

# 기획전

한번의 기획전을 열때마다 지원금액을 정해놓고 기획전을 진행한다. 이후 기획전 금액이 고갈 될 때 까지 쿠폰을 발행하는거 같다. 쿠폰은 관리자 쿠폰, 판매자 쿠폰 두가지 종류로 나뉜다. 관리자 쿠폰은 금액할인, 할인율을 제공해주며 판매자 쿠폰의 경우 금액 할인만 가능하다.

`select distinct coupon_type, sale_type from cmt_coupon_promotion; coupon_type | sale_type ------------ | ------------ admin | price admin | rate vendor | price`

# 판매자 쿠폰

판매자 쿠폰 발행의 취지는 “누군가에게 특별히 상품을 저렴하게 제공하고 싶을 때” 라고한다.

# 정리

- cmt_coupon - 구매자(판매자) 쿠폰 지갑 정보
    
- cmt_coupon_list - 구매자(판매자)가 보유한 쿠폰 리스트 → 한개의 쿠폰지갑에 여러개 쿠폰이 있을 수 있다.
    
    - `select coupon_id, count(*) as cnt from cmt_coupon_list group by coupon_id having cnt > 2 order by cnt ;`
        
- cmt_coupon_promotion - 이벤트별로 발행된 쿠폰 정보
    
- cmt_coupon_history - 쿠폰 사용 이력