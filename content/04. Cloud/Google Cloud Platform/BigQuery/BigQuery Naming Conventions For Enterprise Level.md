---
title: BigQuery Naming Conventions
date: 2023-12-14
draft: false
tags:
  - BigQuery
  - Naming
complete: true
---
## Decision
We agree on a set of conventions for our BigQuery projects, datasets, and tables:

### Project ID
Format: `<orgname>-<env>-<domain>`

*Elements:*
- `<orgname>` is the short name of our organization.
- `<env>` represents the environment, such as _dev_ and _test_. Omitted for _prod_, to keep the default short.
- `<domain>` is the short name of the domain team.

*Examples:*
- `da-prod-search`
- `da-qa-search`
- `da-prod-bestmall`
- `da-lake-crawling`
- `da-dev-bestmall`
- `da-prod-sampledataset`

### Datasets
A BigQuery dataset equals one **data product or project.** Try to **make short and concise** as possible.
Format: `<project-id>.<product>_[detail]`

*Elements:*
`[detail]` is optional and should be treated as subtopic. However, any post-fix like convention should be avoided. such as years `2023` and alphabets `a`:
`dashboard_2023`
`inventory_a`
`inventory_b`

*Examples:*
- `da-prod-search.analytics` : GENERAL analytics of search platform.
- `da-prod-search.logs` : ALL logs of search platform.
-  `da-prod-search.logs_outdated` : SPECIFIC logs older than 10 years.
- `da-prod-bestmall.migrated` : ALL migrated databases of bestmall platform.
- `da-prod-bestmall.dw` : dataware houes of bestmall platform.
- `da-prod-bestmall.sales` : GENERAL sales numbers of bestmall platform. 
- `da-prod-bestmall.sales_organicfood` : SPECIFIC organic food sales of bestmall platform.
- `da-prod-bestmall.dashboards` : GENERAL dashboards of bestmall platform.
- `da-prod-bestmall.ads`: GENERAl ads number of bestmall platform.
- `da-prod-bestmall.ads_neckwarmer` : SPECIFIC neckwarmer numbers of bestmall platform.
- `da-lake-crawling.naver` : ALL crawling output of naver platform.

### Tables and Views
GENERAL - simple names.
SPECIAL CASE - *use prefixes to structure the data models within a data product:*
- **raw** for raw and imported data, followed by the source system name and concept, e.g. `google_analytics_activity_search_raw``
- **event_** for cleaned and curated immutable business events, e.g. `event_searches`

*Examples:*
- `da-prod-crawling.naver`
	- `naver_live_shopping`
	- `naver_map`
	- `naver_map_raw`
- `da-prod-bestmall.migrated`
	- `mysql_member_raw`
	- `mysql_purchase_raw`
	- `mysql_product_raw`
	- `postgre_purchase_history_raw`
- `da-prod-bestmall.dw`
	- `dim_member`
	- `fact_purchase`
	- `dim_product`

*Further naming conventions:*
- lowercase
- plural (if applicable)
- Additional context can be added to a concept using double underscores `__`
- avoid technical abbreviations, if not generally known
    - OK: id, gdpr, pii, sku
    - Not OK: cust, acc, shpmnt


