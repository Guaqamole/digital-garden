- [x] prometheus actuator 제거 ✅ 2024-02-24
- [ ] bulk processor
- [x] remote logging ✅ 2024-02-24
- [ ] application 시작시 delay 기능 (안전한 배포를 위해)
- [x] listener를 통한 error handling ✅ 2024-02-24
- [ ] grafana 시각화

# 순위
1순위
- es node 설정
- spring batch alert

2순위
- container 2개 띄울건데 LB랑 도메인 설정 어떻게 할건지?
- 
# etc
## Search Goods Text
```java
package com.marketboro.dc.search.index.elasticsearch.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketboro.dc.search.index.db.entity.Goods;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.ElementCollection;
import javax.persistence.Id;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
public class SearchGoods {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    @Id
    @Field(type = FieldType.Keyword)
    private String goods_id;
    @Field(type = FieldType.Text)
    private Integer sales_quantity;
    @Field(type = FieldType.Text)
    private Double stock;
    @Field(type = FieldType.Text)
    private String goods_name;
    @Field(type = FieldType.Text)
    private Integer list_price;
    @Field(type = FieldType.Text)
    private Integer category_l;
    @Field(type = FieldType.Text)
    private Integer category_m;
    @Field(type = FieldType.Text)
    private Integer category_s;
    @Field(type = FieldType.Text)
    private String category_l_name;
    @Field(type = FieldType.Text)
    private String category_m_name;
    @Field(type = FieldType.Text)
    private String category_s_name;
    @Field(type = FieldType.Text)
    private Integer category_l_order;
    @Field(type = FieldType.Text)
    private Integer category_m_order;
    @Field(type = FieldType.Text)
    private Integer category_s_order;
    @Field(type = FieldType.Text)
    private Integer vendor_goods_order;
    @Field(type = FieldType.Text)
    private Integer goods_price_rate;
    @Field(type = FieldType.Text)
    private String category_badge_name;
    @Field(type = FieldType.Text)
    private String category_badge_rank;
    @Field(type = FieldType.Text)
    private String repurchase_badge_name;
    @Field(type = FieldType.Text)
    private String repurchase_badge_rank;
    @Field(type = FieldType.Text)
    private Integer discount_price;
    @Field(type = FieldType.Text)
    private Integer discount_rate;
    @Field(type = FieldType.Text)
    private Integer discount_rate_scaled;
    @Field(type = FieldType.Text)
    private Boolean exist_1st_price;
    @Field(type = FieldType.Text)
    private Boolean exist_cms_price;
    @Field(type = FieldType.Text)
    private Boolean exist_plan_price;
    @Field(type = FieldType.Text)
    @JsonProperty("1st_discount_price")
    private Integer first_discount_price;
    @Field(type = FieldType.Text)
    @JsonProperty("1st_discount_rate")
    private Integer first_discount_rate;
    @Field(type = FieldType.Text)
    private Long vendor_id;
    @Field(type = FieldType.Text)
    private String vendor_name;
    @Field(type = FieldType.Text)
    private String intro_brand;
    @Field(type = FieldType.Text)
    private String detail_order_deadline;
    @Field(type = FieldType.Text)
    private Integer detail_delivery_day;
    @Field(type = FieldType.Text)
    private String detail_delivery_available_day;
    @Field(type = FieldType.Text)
    private Integer delivery_type;
    @Field(type = FieldType.Text)
    private Integer image_id;
    @Field(type = FieldType.Text)
    private Boolean free_delivery;
    @Field(type = FieldType.Text)
    private Boolean free_parcel_delivery;
    @Field(type = FieldType.Text)
    private Boolean free_direct_delivery;
    @Field(type = FieldType.Text)
    private Boolean free_direct_delivery_user;
    @Field(type = FieldType.Text)
    private Integer category_id;
    @Field(type = FieldType.Text)
    private String category_name;
    @Field(type = FieldType.Text)
    private String category_path;
    @Field(type = FieldType.Text)
    private Boolean goods_use_yn;
    @Field(type = FieldType.Text)
    private Boolean goods_del_yn;
    @Field(type = FieldType.Text)
    private Boolean vendor_use_yn;
    @Field(type = FieldType.Text)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date goods_regist_dt;
    @Field(type = FieldType.Text)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date goods_update_dt;
    @Field(type = FieldType.Text)
    private String image_key;
    @Field(type = FieldType.Text)
    private Boolean orderable;
    @Field(type = FieldType.Text)
    private String gfo_code;
    @Field(type = FieldType.Text)
    private Boolean bulk_order;
    @Field(type = FieldType.Text)
    //Todo [{"goods_price": 18000, "reference_qty": "1"}, {"goods_price": 15900, "reference_qty": "10"}]
    private List<Object> qty_sales_price;
    @Field(type = FieldType.Text)
    private String standard;
    @Field(type = FieldType.Text)
    private Integer unit_qty;
    @Field(type = FieldType.Text)
    private Integer min_qty;
    @Field(type = FieldType.Text)
    private Boolean min_qty_yn;
    @Field(type = FieldType.Text)
    private String unit;
    @Field(type = FieldType.Text)
    private String listing_yn;
    @Field(type = FieldType.Text)
    //Todo.. ["195", "195"]
    @ElementCollection
    private List<Object> plan_id;
    @Field(type = FieldType.Text)
    //Todo.. ["195_2328", "195_2329"]
    @ElementCollection
    private List<Object> plan_category_id;
    @Field(type = FieldType.Text)
    //Todo.. [{"195_2328": 10}, {"195_2329": 14}]
    private List<Object> plan_category_goods_order;

    public static SearchGoods of(Goods goods) throws Exception {

        List<Object> qtySalesPrice = parseListField(goods.getQty_sales_price());
        List<Object> planId = parseListField(goods.getPlan_id());
        List<Object> planCategoryId = parseListField(goods.getPlan_category_id());
        List<Object> planCategoryGoodsOrder = parseListField(goods.getPlan_category_goods_order());

        SearchGoods searchGoods = new SearchGoods(
                goods.getGoods_id().toString(),
                goods.getSales_quantity(),
                goods.getStock(),
                goods.getGoods_name(),
                goods.getList_price(),
                goods.getCategory_l(),
                goods.getCategory_m(),
                goods.getCategory_s(),
                goods.getCategory_l_name(),
                goods.getCategory_m_name(),
                goods.getCategory_s_name(),
                goods.getCategory_l_order(),
                goods.getCategory_m_order(),
                goods.getCategory_s_order(),
                goods.getVendor_goods_order(),
                goods.getGoods_price_rate(),
                goods.getCategory_badge_name(),
                goods.getCategory_badge_rank(),
                goods.getRepurchase_badge_name(),
                goods.getRepurchase_badge_rank(),
                goods.getDiscount_price(),
                goods.getDiscount_rate(),
                goods.getDiscount_rate_scaled(),
                goods.getExist_1st_price(),
                goods.getExist_cms_price(),
                goods.getExist_plan_price(),
                goods.getFirst_discount_price(),
                goods.getFirst_discount_rate(),
                goods.getVendor_id(),
                goods.getVendor_name(),
                goods.getIntro_brand(),
                goods.getDetail_order_deadline(),
                goods.getDetail_delivery_day(),
                goods.getDetail_delivery_available_day(),
                goods.getDelivery_type(),
                goods.getImage_id(),
                goods.getFree_delivery(),
                goods.getFree_parcel_delivery(),
                goods.getFree_direct_delivery(),
                goods.getFree_direct_delivery_user(),
                goods.getCategory_id(),
                goods.getCategory_name(),
                goods.getCategory_path(),
                goods.getGoods_use_yn(),
                goods.getGoods_del_yn(),
                goods.getVendor_use_yn(),
                goods.getGoods_regist_dt(),
                goods.getGoods_update_dt(),
                goods.getImage_key(),
                goods.getOrderable(),
                goods.getGfo_code(),
                goods.getBulk_order(),
                qtySalesPrice,
                goods.getStandard(),
                goods.getUnit_qty(),
                goods.getMin_qty(),
                goods.getMin_qty_yn(),
                goods.getUnit(),
                goods.getListing_yn(),
                planId,
                planCategoryId,
                planCategoryGoodsOrder
        );
        return searchGoods;
    }

    public static List<Object> parseListField(Object fieldValue) {
        return Optional.ofNullable(fieldValue)
                .map(fieldValueString -> {
                    try {
                        return MAPPER.readValue(fieldValueString.toString(), new TypeReference<List<Object>>() {});
                    } catch (IOException e) {
                        e.printStackTrace();
                        return null;
                    }
                })
                .orElseGet(() -> null);
    }
}
```
## Test Index Template
```json
{
  "properties": {
    "goods_name": {
      "type": "text"
    },
    "goods_id": {
      "ignore_above": 256,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "sales_quantity": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "orderable": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "bulk_order": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "category_badge_name": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "category_badge_rank": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "repurchase_badge_name": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "repurchase_badge_rank": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "stock": {
      "index": false,
      "type": "float",
      "doc_values": true
    },
    "standard": {
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "min_qty": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "min_qty_yn": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "unit": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "unit_qty": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "list_price": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "discount_price": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "discount_rate": {
      "index": false,
      "type": "float",
      "doc_values": true
    },
    "discount_rate_scaled": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "qty_sales_price": {
      "index": false,
      "type": "flattened",
      "doc_values": true
    },
    "1st_discount_price": {
      "index": false,
      "type": "long",
      "doc_values": true
    },
    "1st_discount_rate": {
      "index": false,
      "type": "float",
      "doc_values": true
    },
    "exist_1st_price": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "exist_cms_price": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "exist_plan_price": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "gfo_code": {
      "ignore_above": 256,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "image_id": {
      "ignore_above": 256,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "image_key": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "image_url": {
      "index": false,
      "type": "keyword",
      "doc_values": false
    },
    "listing_yn": {
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "goods_del_yn": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "goods_use_yn": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "goods_regist_dt": {
      "index": false,
      "type": "date",
      "format": "yyyy-MM-dd HH:mm:ss",
      "doc_values": true
    },
    "goods_update_dt": {
      "index": false,
      "type": "date",
      "format": "yyyy-MM-dd HH:mm:ss",
      "doc_values": true
    },
    "delivery_type": {
      "ignore_above": 10,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "free_delivery": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "free_direct_delivery": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "free_parcel_delivery": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "detail_delivery_day": {
      "ignore_above": 16,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "detail_delivery_available_day": {
      "ignore_above": 16,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "detail_order_deadline": {
      "ignore_above": 16,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "category_name": {

      "type": "text",
      "fields": {
        "keyword": {
          "ignore_above": 256,
          "type": "keyword"
        }
      }
    },
    "category_path": {
      "type": "text"
    },
    "category_l": {
      "ignore_above": 16,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "category_m": {
      "ignore_above": 16,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "category_s": {
      "ignore_above": 16,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "category_l_name": {
      "ignore_above": 64,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "category_m_name": {
      "ignore_above": 64,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "category_s_name": {
      "ignore_above": 64,
      "index": true,
      "type": "keyword",
      "doc_values": true
    },
    "category_l_order": {
      "index": true,
      "type": "long",
      "doc_values": true
    },
    "category_m_order": {
      "index": true,
      "type": "long",
      "doc_values": true
    },
    "category_s_order": {
      "index": true,
      "type": "long",
      "doc_values": true
    },
    "vendor_name": {
      "type": "text",
      "fields": {
        "keyword": {
          "ignore_above": 256,
          "type": "keyword"
        }
      }
    },
    "vendor_id": {
      "ignore_above": 256,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "intro_brand": {
      "type": "text"
    },
    "vendor_goods_order": {
      "index": true,
      "type": "long",
      "doc_values": true
    },
    "vendor_use_yn": {
      "index": true,
      "type": "boolean",
      "doc_values": true
    },
    "plan_id": {
      "ignore_above": 256,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "plan_category_id": {
      "ignore_above": 256,
      "index": false,
      "type": "keyword",
      "doc_values": true
    },
    "plan_category_goods_order": {
      "type": "nested",
      "properties": {
        "*_*": {
          "type": "nested",
          "properties": {
            "*": {
              "index": false,
              "type": "long",
              "doc_values": true
            }
          }
        }
      }
    }
  }
}
```