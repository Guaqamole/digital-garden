---
excalidraw-plugin: parsed
tags:
  - excalidraw
draft: true
---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
Apache ^4SVjkKBY

Airflow ^hzF5SdRa

Scheduler
&
Webserver ^43Ohjnk5

DAGs ^5E5zomj1

Redis ^nOdG64Gt

Celery ^tfxx6AnX

worker 1 ^t0WYY15N

worker 2 ^5ojQUQBB

worker 3 ^I7eH75K9

Shop ^zoXEuq58

- shop_address ^MHUidYNs

- shop_grade ^Rif7Ie2j

- shop_business ^iynvCUbB

- shop_info ^nuRtaRgX

Deposit ^7fvKIW9B

- deposit ^600oRdYS

- deposit_history ^QE9AetnH

- deposit_withdraw ^8BSwiL5s

Coupon ^0T1Qkuah

- shop_address ^hAiIck0e

- shop_grade ^akTKdLJg

- shop_business ^CNdgkl8C

- shop_info ^BCoKh5hO

Vendor ^mAZg6gvb

- vendor ^Bt24Texf

- vendor_business ^hi5au1j4

- vendor_delivery ^20ne5yR4

- vendor_user ^vqFXMsjQ

Order ^ZTCVHn0S

- order_master ^ioyXguHF

- order_goods ^YvPFn9HE

- order_status ^osX5h4FE

- payment ^7SZBTyKW

Goods ^fuIjKTnr

- goods ^E7iKq9dp

- goods_plan ^UsbtZvDD

- plan ^fQ76Lzqz

- plan_category ^zk7MJUI3

"Task Group" ^ZwwvrrL8

Python Instance 1 ^4Cmku3cn

Python Instance 2 ^PvzSdGbC

Python Instance 3 ^lbjbbn38

API Gateway ^lOG4jDFu

V.2 ^IIKH7VMZ

- shop ^KRIM94Zu

- deposit ^3bRfM5N7

- coupon ^pyv5txc6

- vendor ^lfAMhSh6

- order ^apeJEV7S

- goods ^LkYJA0Kh

curl -X POST "https://{endpoint}/api/fs_etl"
    request-body {
        task: order
        start_dt: 2023_09_01_1230
        end_dt: 2023_09_30_2359
    }
 ^thHLL94i

python3 fs_etl.py
    --task "order"
    --start_dt "2023-09-01 12:30:00"
    --end_dt "2023-09-30 23:59:59" ^AOehfib8

Apache ^pqafiCN6

Airflow ^riNTmVOi

Scheduler
&
Webserver ^Cy4CR0Wj

DAGs ^hBa29DCg

Redis ^V9L9xDVr

Celery ^k84N7q7w

worker 1 ^HwrMqsyu

worker 2 ^NGtb3S5A

worker 3 ^umvM6z3E

Shop ^BnhBzvc6

- shop_address ^ohm6gY4O

- shop_grade ^5Q2XHd9Z

- shop_business ^sXJut4xG

- shop_info ^1YI9KoMQ

Deposit ^jzcI4llT

- deposit ^s3YeBj4d

- deposit_history ^YODduJ7z

- deposit_withdraw ^O9ORLehH

Coupon ^7f8pDcSK

- shop_address ^fIjnTAdc

- shop_grade ^4JgrMs1C

- shop_business ^fxrj5P3q

- shop_info ^wnLYsESE

Vendor ^e6Wy1gvu

- vendor ^AOLBxLOl

- vendor_business ^fv9iOy7o

- vendor_delivery ^OCDgGU40

- vendor_user ^4D6MrOCs

Order ^0DpCjq2z

- order_master ^tuLG8ltz

- order_goods ^Dw4bEX9Z

- order_status ^OG74AmLN

- payment ^EeqWqa2F

Goods ^XWptltyP

- goods ^mTb8VweA

- goods_plan ^zesmpdKY

- plan ^A0IRGUlf

- plan_category ^kzzbEHPV

"Task Group" ^DOCskEEN

Python Instance 1 ^B5Na8kxF

V.1 ^3C3lWfDa

- shop ^hCdGBXRR

- deposit ^y4SbDXpZ

- coupon ^m9Ygn5Wi

- vendor ^FSvXbJpD

- order ^gzUAPQA1

- goods ^hjK8Wupv

ssh ec2-user@172.9.0.13 /opt/python/fs_etl.py
    -- task order
    -- start_dt 2023_09_01_1230
    -- update_dt 2023_09_30_2359 ^ZjUzA7jf

Airflow
ssh operator ^U6BtoVEe

Apache ^N1wr8o6x

Airflow ^ctdat0vu

Scheduler
&
Webserver ^BFPRkmrE

DAGs ^9jUvvrQU

Redis ^jeHm41d3

Celery ^CrEIWCfx

worker 1 ^0Dff7LHB

worker 2 ^GSWFF8bY

worker 3 ^Mno7S4Gm

Shop ^Mk11hVv9

- shop_address ^38moTGln

- shop_grade ^uZu26E2n

- shop_business ^v8aDELog

- shop_info ^KkxnptHA

Deposit ^1SCCoEPm

- deposit ^buFnkWyz

- deposit_history ^ih5HKbWz

- deposit_withdraw ^QnRSDkX1

Coupon ^K9HTjw7l

- shop_address ^muLc0D0w

- shop_grade ^F3fwaYxI

- shop_business ^BwgJ7Wdm

- shop_info ^XETcvd2T

Vendor ^NY8Bgepi

- vendor ^i6oGByZo

- vendor_business ^BGMoPPUD

- vendor_delivery ^E1dW8hmX

- vendor_user ^xSexn828

Order ^cMNowQHB

- order_master ^MvDe4RBs

- order_goods ^VRZacIKc

- order_status ^c3Ki7C3v

- payment ^XAGpjgEf

Goods ^PqFtmTzB

- goods ^lTgb3D38

- goods_plan ^jUQt9A0u

- plan ^yLuyHdPp

- plan_category ^opUGTR3q

"Task Group" ^dWpvCu8h

V.3 ^1jCU9rYK

- shop ^8BTd44h6

- deposit ^iPtGeGWe

- coupon ^d9TSxukm

- vendor ^Hn4VpY7Z

- order ^KCC7LyHX

- goods ^f5PjCcnd

invoke_lambda_function = AwsLambdaInvokeFunctionOperator (
    task_id='setup__invoke_lambda_function',
    function_name=LAMBDA_FUNCTION_NAME,
    payload=SAMPLE_EVENT,
) ^hncJL24M

Airflow
lambda operator ^vi49sHHq

Lambda ^aeokWEzw

.
.
 ^2HbAdAi0

Lambda ^3xDYPPzH

Lambda ^YfkUjtYo

Lambda ^vwFyUbaz

Lambda ^n3T54eZD

AWS ^ZnCSx0ho

Apache ^SlBoll21

Airflow ^cApR75FU

Scheduler
&
Webserver ^f0XiGw8S

DAGs ^PYaOQtQe

Redis ^O3S3u7dW

Celery ^9MZeUy0Q

worker 1 ^od8wl7sx

worker 2 ^lSiF2INa

worker 3 ^FWvSJWQD

Shop ^RHO5rC5U

- shop_address ^nNltQJzu

- shop_grade ^Qe3k7XL5

- shop_business ^D8mA02DJ

- shop_info ^d10hAWD6

Deposit ^wfH7D48x

- deposit ^pJAMD05a

- deposit_history ^FdcXNBP8

- deposit_withdraw ^wt216CHe

Coupon ^vBxz2y9P

- shop_address ^XurXN44D

- shop_grade ^H5GwoG88

- shop_business ^vcHcZWbS

- shop_info ^xSgjD6AX

Vendor ^7M5bXrE1

- vendor ^Gf4oaQBw

- vendor_business ^hsU2iKfT

- vendor_delivery ^kD1R6lhl

- vendor_user ^CcwEpcNM

Order ^iHgCm1eo

- order_master ^7m55BNUT

- order_goods ^wRR9dmkd

- order_status ^2jl0neOG

- payment ^51wJF1Gp

Goods ^VYqKURZA

- goods ^d0QqL5K1

- goods_plan ^yNjrhveP

- plan ^4LoAMnJ8

- plan_category ^REf07QAl

"Task Group" ^atkFaJzr

Python Instance 1 ^5E1OkNyZ

Python Instance 2 ^MAipWPUq

Python Instance 3 ^6fYx5VNZ

API Gateway ^01Qf3tsq

V.2 upgrade ^qSKx2fqJ

- shop ^EDXoliCN

- deposit ^CStPzltt

- coupon ^yzHjuiui

- vendor ^HjkYbd0j

- order ^mCtjqFjx

- goods ^4uwpAllq

curl -X POST "https://{endpoint}/api/spark"
    request-body {
        task: order
        option: all
    }
 ^NYWIcKuE

A ^fnkJOjHU

P ^m2Y18Gau

C ^ZCmL2lnc

H ^PBAhc6tF

E ^lgwLFpuK

A ^Bry5iz1D

Standalone Cluster ^TYkoR3rg

Master Node ^phb01Pi6

Cluster Manager ^gZrYLQ2N

Master JVM ^DUPnOZ5y

Worker Node 1 ^xZnr8k10

Worker JVM ^U8vo3q8R

Worker Node 2 ^kt5S9OGq

Worker JVM ^xovgHaNv

Worker Node 3 ^a5Q5EMRC

Worker JVM ^d2k1eqM8

Executor ^Ojacv7er


# Embedded files
907320ac5d17df89816c0d633e1bd332ce62b658: https://pnghq.com/wp-content/uploads/png-image-of-python-logo-no-text-included-7.png

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/1.9.23",
	"elements": [
		{
			"type": "line",
			"version": 421,
			"versionNonce": 161995582,
			"isDeleted": false,
			"id": "pbxRKIbq1_VVV6HgYx74Z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 989.2508704258348,
			"y": -2717.9354248583327,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 1894.231317579983,
			"height": 4179.09747297124,
			"seed": 2042172873,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699337643317,
			"link": null,
			"locked": true,
			"customData": {
				"slideshow": {
					"originalProps": {
						"strokeColor": "#ced4da",
						"backgroundColor": "transparent",
						"locked": false
					},
					"hidden": true
				}
			},
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-1653.284328395577,
					1295.8387925563443
				],
				[
					-1559.3960004650294,
					1497.4502993920084
				],
				[
					240.946989184406,
					2713.989024721984
				],
				[
					26.32862542421799,
					2936.98425256811
				],
				[
					-1562.9529879593895,
					4179.09747297124
				]
			]
		},
		{
			"type": "rectangle",
			"version": 713,
			"versionNonce": 514356135,
			"isDeleted": false,
			"id": "gDiD1vqR1f21QaTppq-JQ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -410.7372081963548,
			"y": -790.3901201127564,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 554.9067080593737,
			"height": 447.58359035579053,
			"seed": 1929471908,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1970,
			"versionNonce": 1426538057,
			"isDeleted": false,
			"id": "WSGNhNaGZxy6Bj1wooESl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -347.43147117595015,
			"y": -849.5915044730241,
			"strokeColor": "turquoise",
			"backgroundColor": "turquoise",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1966920484,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1795,
			"versionNonce": 1355376327,
			"isDeleted": false,
			"id": "lSymWz0z6qNizGCcvsTzq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -358.0501722072314,
			"y": -836.0259886887209,
			"strokeColor": "aqua",
			"backgroundColor": "aqua",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 67030692,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2154,
			"versionNonce": 133860649,
			"isDeleted": false,
			"id": "BOW4uUNMvgzidsKfoTgU3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -373.9639676497071,
			"y": -852.1800371376653,
			"strokeColor": "red",
			"backgroundColor": "red",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1878350372,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2015,
			"versionNonce": 1956574695,
			"isDeleted": false,
			"id": "LT1qnEHOR_BQx2rUBkEwK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -362.3094130253588,
			"y": -852.8492423514767,
			"strokeColor": "salmon",
			"backgroundColor": "salmon",
			"width": 19.090763219686202,
			"height": 10.920680508629188,
			"seed": 1141798308,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.247032861929438,
					5.414223509566554
				],
				[
					7.80069096616502,
					9.655793097762178
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.2700879407222723
				],
				[
					17.409206394840286,
					1.7137171824230046
				],
				[
					12.349656751372345,
					2.271356548532129
				],
				[
					5.08675110820378,
					0.625643650550335
				],
				[
					0.013602600172775085,
					-1.26488741086701
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2091,
			"versionNonce": 1633746953,
			"isDeleted": false,
			"id": "ZQ9c6HLgyfxwm_UVU9XFu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -376.3555270357614,
			"y": -825.7503560254786,
			"strokeColor": "#228be6",
			"backgroundColor": "#228be6",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 2105024804,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1913,
			"versionNonce": 557162759,
			"isDeleted": false,
			"id": "iMhIBD2nf9DW_Y4En3PmD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -378.86221912269446,
			"y": -848.5162075798812,
			"strokeColor": "lightblue",
			"backgroundColor": "lightblue",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 1134582948,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2065,
			"versionNonce": 1865815785,
			"isDeleted": false,
			"id": "AV3sLxpPYnM9jqwpE-GYb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -349.9512905055748,
			"y": -823.1438935060362,
			"strokeColor": "green",
			"backgroundColor": "green",
			"width": 26.626032756145793,
			"height": 31.683786732555944,
			"seed": 540354596,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245173
				],
				[
					-2.048210553853881,
					5.466507876823853
				],
				[
					-5.656165483542917,
					8.491751647064286
				],
				[
					-10.052266425009464,
					11.126683806841765
				],
				[
					-10.006359309336936,
					12.356339945392238
				],
				[
					-4.093510626546925,
					14.592608482820363
				],
				[
					2.8736090261096536,
					15.831570229232076
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732269
				],
				[
					16.146625249157346,
					-5.0410819524881925
				],
				[
					16.57376633113633,
					-14.47177307413826
				],
				[
					15.460041218424415,
					-15.852216503323866
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1891,
			"versionNonce": 1477044263,
			"isDeleted": false,
			"id": "at0rgeBhXcVOJmgCW5COd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -374.6433249927196,
			"y": -831.9481803345273,
			"strokeColor": "lightgreen",
			"backgroundColor": "lightgreen",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 925139876,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1062,
			"versionNonce": 1946505673,
			"isDeleted": false,
			"id": "H210zISD2jWqe9XJrR9k7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -360.1440378041076,
			"y": -839.0303594031727,
			"strokeColor": "#000000",
			"backgroundColor": "black",
			"width": 2.4664671675253453,
			"height": 2.4664671675253453,
			"seed": 2124181284,
			"groupIds": [
				"8E_k5Br7iT-ZH5VLt1JmF",
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1053,
			"versionNonce": 923290439,
			"isDeleted": false,
			"id": "4SVjkKBY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -324.5350308848165,
			"y": -858.9012295329821,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 41.3492431640625,
			"height": 15.66025242037268,
			"seed": 1997204132,
			"groupIds": [
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.311733971712764,
			"fontFamily": 1,
			"text": "Apache",
			"rawText": "Apache",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Apache",
			"lineHeight": 1.2719778104654809,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 1007,
			"versionNonce": 1424634025,
			"isDeleted": false,
			"id": "hzF5SdRa",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -329.0715181464551,
			"y": -846.1717202715593,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 83.15940856933594,
			"height": 32.80021373085932,
			"seed": 1662907940,
			"groupIds": [
				"RGpsFrH2bXUOWjBgvS_vM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 25.854479605079288,
			"fontFamily": 1,
			"text": "Airflow",
			"rawText": "Airflow",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Airflow",
			"lineHeight": 1.2686472221400076,
			"baseline": 23
		},
		{
			"type": "rectangle",
			"version": 448,
			"versionNonce": 1787644519,
			"isDeleted": false,
			"id": "GBOYVh3dWPdHwN6f2uyj9",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -384.4209521867393,
			"y": -776.1582991992952,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 190.09014423076923,
			"height": 143.7079326923078,
			"seed": 2143523236,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "43Ohjnk5"
				},
				{
					"id": "7rmquXcoImBTxaKfaP0_p",
					"type": "arrow"
				},
				{
					"id": "Z2XbQNDM4HSBsAYTQOGyt",
					"type": "arrow"
				},
				{
					"id": "P327iheXpTWaRXmgpuudh",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 373,
			"versionNonce": 1200632713,
			"isDeleted": false,
			"id": "43Ohjnk5",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -337.58583337946015,
			"y": -741.8043328531413,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.41990661621094,
			"height": 75,
			"seed": 1009368356,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Scheduler\n&\nWebserver",
			"rawText": "Scheduler\n&\nWebserver",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "GBOYVh3dWPdHwN6f2uyj9",
			"originalText": "Scheduler\n&\nWebserver",
			"lineHeight": 1.25,
			"baseline": 68
		},
		{
			"type": "line",
			"version": 6344,
			"versionNonce": 1600480647,
			"isDeleted": false,
			"id": "2WzW0oph9kZfRUXpLGD8k",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -334.1657058967754,
			"y": -571.655306518858,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 75.01121630306868,
			"height": 96.81388324216654,
			"seed": 1908308132,
			"groupIds": [
				"SeRnHZB19yFwwUXTYU77F",
				"6Z1C_CKsJ9LbwUu39GLH2",
				"Vl7HU_1PYwCVimMGJ442u"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.24734846976242794,
					73.1714082159101
				],
				[
					0.011575327725072006,
					81.50165529728328
				],
				[
					3.8632435379119165,
					85.10105205208878
				],
				[
					17.276485894102954,
					88.14730719194147
				],
				[
					39.948665011120255,
					89.0958655364321
				],
				[
					61.61043288740646,
					87.58135319133916
				],
				[
					73.11948965218787,
					83.95942431004657
				],
				[
					74.74268637210398,
					80.90610026776591
				],
				[
					74.9706584753909,
					74.19947908967055
				],
				[
					74.79172688269483,
					6.138672737165569
				],
				[
					74.38835763792527,
					-0.2918194398554754
				],
				[
					69.57188081608908,
					-3.885863818744892
				],
				[
					59.42940850758881,
					-5.967344146345569
				],
				[
					36.31608449133351,
					-7.7180177057344235
				],
				[
					17.785060590062127,
					-6.674087120295436
				],
				[
					3.210536142559118,
					-3.1332019499277424
				],
				[
					-0.04055782767777212,
					-0.04396604849106378
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 7067,
			"versionNonce": 1077074537,
			"isDeleted": false,
			"id": "2I0zaCq3EH_X5rg6lDfkM",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -333.89977330609145,
			"y": -580.4082746748861,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 74.53008207714048,
			"height": 15.073148387271289,
			"seed": 472892452,
			"groupIds": [
				"SeRnHZB19yFwwUXTYU77F",
				"6Z1C_CKsJ9LbwUu39GLH2",
				"Vl7HU_1PYwCVimMGJ442u"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "Z2XbQNDM4HSBsAYTQOGyt",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 331,
			"versionNonce": 885857447,
			"isDeleted": false,
			"id": "tkJ_KnvSgDUtVayqq9upF",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -365.4844721406656,
			"y": -432.15922209792706,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 134.96394230769238,
			"height": 69.89783653846155,
			"seed": 292265892,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "5E5zomj1"
				},
				{
					"id": "8n_vptMdgse8cTecSIkwu",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 309,
			"versionNonce": 530425161,
			"isDeleted": false,
			"id": "5E5zomj1",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -325.68248603320615,
			"y": -409.7103038286963,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.35997009277344,
			"height": 25,
			"seed": 966789924,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "DAGs",
			"rawText": "DAGs",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "tkJ_KnvSgDUtVayqq9upF",
			"originalText": "DAGs",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 780,
			"versionNonce": 1043747818,
			"isDeleted": false,
			"id": "8n_vptMdgse8cTecSIkwu",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -295.02835212856314,
			"y": -455.436363783268,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.1815832055096962,
			"height": 16.74631788225804,
			"seed": 1195050660,
			"groupIds": [
				"wHksKQRlGsB_ICmElBo8d"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864115,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "tkJ_KnvSgDUtVayqq9upF",
				"gap": 6.530823803082853,
				"focus": 0.05313077986793871
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.1815832055096962,
					16.74631788225804
				]
			]
		},
		{
			"type": "arrow",
			"version": 668,
			"versionNonce": 556536873,
			"isDeleted": false,
			"id": "wdQHJHYUCe5RRvCNQtZO2",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -295.0453081542586,
			"y": -455.529992951951,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341078562,
			"height": 17.722798727512895,
			"seed": 1860866596,
			"groupIds": [
				"wHksKQRlGsB_ICmElBo8d"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341078562,
					-17.722798727512895
				]
			]
		},
		{
			"type": "diamond",
			"version": 1097,
			"versionNonce": 1718443751,
			"isDeleted": false,
			"id": "m7bqxFr9pSqgGT9ktxqd7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -240.75141247602244,
			"y": -540.5314334622915,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 530361764,
			"groupIds": [
				"KnaQSrYv3p5QBPogyj63O",
				"DG4-R_B1COswDPs6DCUej"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1139,
			"versionNonce": 147433225,
			"isDeleted": false,
			"id": "HsqgUyBGU_SYg-c4xUbzV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -240.75141247602244,
			"y": -549.40321339055,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 981424420,
			"groupIds": [
				"KnaQSrYv3p5QBPogyj63O",
				"DG4-R_B1COswDPs6DCUej"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "h3lLU5ucjmOXr0Gb9tKis",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1225,
			"versionNonce": 2135878151,
			"isDeleted": false,
			"id": "zjp8TZgYilvvZ3oDy_zum",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -240.75141247602244,
			"y": -562.033772985262,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1258329252,
			"groupIds": [
				"KnaQSrYv3p5QBPogyj63O",
				"DG4-R_B1COswDPs6DCUej"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "h3lLU5ucjmOXr0Gb9tKis",
					"type": "arrow"
				},
				{
					"id": "Rs4Kp5wzQGGRiFZlsqWHg",
					"type": "arrow"
				},
				{
					"id": "abn5n_H1Uz4-FAVIc_r9V",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1278,
			"versionNonce": 284286441,
			"isDeleted": false,
			"id": "ZVsPvbY0YgR6Dmykiv_Q-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -240.75141247602244,
			"y": -574.5654452825593,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1053712420,
			"groupIds": [
				"KnaQSrYv3p5QBPogyj63O",
				"DG4-R_B1COswDPs6DCUej"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "K7jsmqbHk3olnjrThXE-p",
					"type": "arrow"
				},
				{
					"id": "h3lLU5ucjmOXr0Gb9tKis",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 445,
			"versionNonce": 370282791,
			"isDeleted": false,
			"id": "nOdG64Gt",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -209.24570391549298,
			"y": -567.7376423245425,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 51.11994934082031,
			"height": 25,
			"seed": 500612004,
			"groupIds": [
				"DG4-R_B1COswDPs6DCUej"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "Rs4Kp5wzQGGRiFZlsqWHg",
					"type": "arrow"
				},
				{
					"id": "K7jsmqbHk3olnjrThXE-p",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Redis",
			"rawText": "Redis",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Redis",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1215,
			"versionNonce": 1622612202,
			"isDeleted": false,
			"id": "7rmquXcoImBTxaKfaP0_p",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -240.35889340465457,
			"y": -620.6345110463941,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.25553069419075314,
			"height": 23.56604632889821,
			"seed": 1111992100,
			"groupIds": [
				"4nKbo5XP7fQasOmh-16B8"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864113,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "GBOYVh3dWPdHwN6f2uyj9",
				"gap": 13.810252385991248,
				"focus": 0.10354803767814348
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.25553069419075314,
					23.56604632889821
				]
			]
		},
		{
			"type": "arrow",
			"version": 1176,
			"versionNonce": 874730567,
			"isDeleted": false,
			"id": "K7jsmqbHk3olnjrThXE-p",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -226.4879620285393,
			"y": -576.139921934044,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2840418715895313,
			"height": 24.940186781763522,
			"seed": 277815972,
			"groupIds": [
				"4nKbo5XP7fQasOmh-16B8"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "nOdG64Gt",
				"focus": -0.6053918351334293,
				"gap": 10.516697553496101
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.2840418715895313,
					-24.940186781763522
				]
			]
		},
		{
			"type": "rectangle",
			"version": 485,
			"versionNonce": 295712681,
			"isDeleted": false,
			"id": "EWDj-L6y5Q_dROmmLbwrh",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -56.372857505648994,
			"y": -725.1608927231018,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 164.12306810890618,
			"height": 345.2139841463238,
			"seed": 794504740,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "h3lLU5ucjmOXr0Gb9tKis",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 447,
			"versionNonce": 23016295,
			"isDeleted": false,
			"id": "tfxx6AnX",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -3.3112929336178922,
			"y": -758.2895662669266,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 57.99993896484375,
			"height": 25,
			"seed": 1067043236,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Celery",
			"rawText": "Celery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Celery",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1051,
			"versionNonce": 770529929,
			"isDeleted": false,
			"id": "h3lLU5ucjmOXr0Gb9tKis",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -124.57345255150733,
			"y": -540.8022062975415,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.61060860972839,
			"height": 99.21676970494727,
			"seed": 343471396,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "ZVsPvbY0YgR6Dmykiv_Q-",
				"focus": 1.289993537315494,
				"gap": 15.713008798042914
			},
			"endBinding": {
				"elementId": "pFt7Qi1K1AS-Z1ywrKiuN",
				"focus": 0.5725170004071704,
				"gap": 6.573683044425707
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					82.61060860972839,
					-99.21676970494727
				]
			]
		},
		{
			"type": "arrow",
			"version": 779,
			"versionNonce": 1980903047,
			"isDeleted": false,
			"id": "Rs4Kp5wzQGGRiFZlsqWHg",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -126.25179501144714,
			"y": -536.0897038550854,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 83.24860871393275,
			"height": 0.3810062462142696,
			"seed": 1801892004,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "zjp8TZgYilvvZ3oDy_zum",
				"focus": 0.42550273099081265,
				"gap": 7.759040314649226
			},
			"endBinding": {
				"elementId": "GXtPWSN1F_K5QRZxz5phd",
				"focus": -0.34798041451485184,
				"gap": 9.032899081647429
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					83.24860871393275,
					-0.3810062462142696
				]
			]
		},
		{
			"type": "arrow",
			"version": 937,
			"versionNonce": 1314070889,
			"isDeleted": false,
			"id": "abn5n_H1Uz4-FAVIc_r9V",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -126.86376090946817,
			"y": -530.9087936854851,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 89.28200057698177,
			"height": 98.53147271835927,
			"seed": 605092900,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "zjp8TZgYilvvZ3oDy_zum",
				"focus": -0.8170895935619735,
				"gap": 12.494251014540328
			},
			"endBinding": {
				"elementId": "LkYJA0Kh",
				"focus": -0.8560968029210516,
				"gap": 15.558312258412002
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					89.28200057698177,
					98.53147271835927
				]
			]
		},
		{
			"type": "arrow",
			"version": 1062,
			"versionNonce": 1392600682,
			"isDeleted": false,
			"id": "Z2XbQNDM4HSBsAYTQOGyt",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -296.16510336357874,
			"y": -602.8135269713396,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18160064923915797,
			"height": 16.747926611653384,
			"seed": 2019940260,
			"groupIds": [
				"7DUW6uVnxtn0y978TvrfC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864113,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GBOYVh3dWPdHwN6f2uyj9",
				"gap": 29.636839535647823,
				"focus": 0.08233521180677789
			},
			"endBinding": {
				"elementId": "2I0zaCq3EH_X5rg6lDfkM",
				"gap": 5.658844441888655,
				"focus": 0.021314651672632887
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.18160064923915797,
					16.747926611653384
				]
			]
		},
		{
			"type": "arrow",
			"version": 948,
			"versionNonce": 2073889066,
			"isDeleted": false,
			"id": "P327iheXpTWaRXmgpuudh",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -296.182059389274,
			"y": -602.9071561400226,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341084246,
			"height": 17.722798727512867,
			"seed": 882066212,
			"groupIds": [
				"7DUW6uVnxtn0y978TvrfC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864113,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GBOYVh3dWPdHwN6f2uyj9",
				"gap": 29.543210366964786,
				"focus": 0.0830450727477833
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341084246,
					-17.722798727512867
				]
			]
		},
		{
			"type": "rectangle",
			"version": 517,
			"versionNonce": 893352135,
			"isDeleted": false,
			"id": "pFt7Qi1K1AS-Z1ywrKiuN",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -35.389160897353236,
			"y": -696.71519415082,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 82.7041936917846,
			"seed": 1862745764,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "h3lLU5ucjmOXr0Gb9tKis",
					"type": "arrow"
				},
				{
					"id": "2WkEcW6LK1MI3Rw1k5hjl",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 509,
			"versionNonce": 1529256745,
			"isDeleted": false,
			"id": "GXtPWSN1F_K5QRZxz5phd",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -33.97028721586696,
			"y": -587.838477035989,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 1081068068,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "Rs4Kp5wzQGGRiFZlsqWHg",
					"type": "arrow"
				},
				{
					"id": "CHsolVngxjo0ZsVArM9r8",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 528,
			"versionNonce": 1149421543,
			"isDeleted": false,
			"id": "rK1ZoUgIcDnM-FVnfgW8E",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -33.741677095557066,
			"y": -474.43294800681156,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 2075846052,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "abn5n_H1Uz4-FAVIc_r9V",
					"type": "arrow"
				}
			],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 493,
			"versionNonce": 1339772425,
			"isDeleted": false,
			"id": "t0WYY15N",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -11.42282869562871,
			"y": -720.7475297653386,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 76.5599365234375,
			"height": 25,
			"seed": 1712754980,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 1",
			"rawText": "worker 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 1",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 546,
			"versionNonce": 684667655,
			"isDeleted": false,
			"id": "5ojQUQBB",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -12.250295978651252,
			"y": -611.6408649550242,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 85.37992858886719,
			"height": 25,
			"seed": 1861274788,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 2",
			"rawText": "worker 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 2",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 583,
			"versionNonce": 1966515433,
			"isDeleted": false,
			"id": "I7eH75K9",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -15.552029906387247,
			"y": -495.2137065095822,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 84.75993347167969,
			"height": 25,
			"seed": 1744279588,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 3",
			"rawText": "worker 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 3",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "rectangle",
			"version": 244,
			"versionNonce": 446773799,
			"isDeleted": false,
			"id": "Fm0hOq34iVmq2ei3yt4V_",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -404.7645670572929,
			"y": -1080.023193359376,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1152.91796875,
			"height": 187.7109375,
			"seed": 2021096604,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 238,
			"versionNonce": 1187258313,
			"isDeleted": false,
			"id": "3r-fbfyy7NRKJlhVHlG8y",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 305.4698079427071,
			"y": -792.0310058593759,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 440.546875,
			"height": 445.98437499999994,
			"seed": 1750231068,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "image",
			"version": 295,
			"versionNonce": 249912647,
			"isDeleted": false,
			"id": "VzkZEaDF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 323.5518391927071,
			"y": -870.0590820312509,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.08593750000001,
			"height": 64.08593750000001,
			"seed": 9654,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"status": "pending",
			"fileId": "907320ac5d17df89816c0d633e1bd332ce62b658",
			"scale": [
				1,
				1
			]
		},
		{
			"type": "rectangle",
			"version": 182,
			"versionNonce": 1117732521,
			"isDeleted": false,
			"id": "9xZmQz_NnGH__6yjgVUak",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -376.8075358072929,
			"y": -1035.914550781251,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1651625244,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 142,
			"versionNonce": 687348839,
			"isDeleted": false,
			"id": "zoXEuq58",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -326.9755045572929,
			"y": -1065.430175781251,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 42.979949951171875,
			"height": 25,
			"seed": 2042575140,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Shop",
			"rawText": "Shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 269,
			"versionNonce": 393445769,
			"isDeleted": false,
			"id": "MHUidYNs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -353.3053232828788,
			"y": -1020.8833007812509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 1941206564,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 329,
			"versionNonce": 1822816135,
			"isDeleted": false,
			"id": "Rif7Ie2j",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -355.1507602701597,
			"y": -997.6958007812509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 1692746524,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 361,
			"versionNonce": 310143081,
			"isDeleted": false,
			"id": "iynvCUbB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -352.0804477701597,
			"y": -973.6879882812509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 250363676,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 410,
			"versionNonce": 808152743,
			"isDeleted": false,
			"id": "nuRtaRgX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -353.38633982340616,
			"y": -950.7231445312509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 1499444124,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 230,
			"versionNonce": 1300591433,
			"isDeleted": false,
			"id": "zMWPLR1oAgQC8wGabyhBa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -196.67081705729288,
			"y": -1037.055175781251,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 55676580,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 209,
			"versionNonce": 1312096711,
			"isDeleted": false,
			"id": "7fvKIW9B",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -158.11222330729288,
			"y": -1066.570800781251,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 74.01991271972656,
			"height": 25,
			"seed": 1995446820,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Deposit",
			"rawText": "Deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 324,
			"versionNonce": 485106217,
			"isDeleted": false,
			"id": "600oRdYS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -173.16860453287882,
			"y": -1022.0239257812509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 55.628570556640625,
			"height": 15.804687500000012,
			"seed": 498152868,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 406,
			"versionNonce": 400503015,
			"isDeleted": false,
			"id": "QE9AetnH",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -175.0140415201597,
			"y": -998.8364257812509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 107.45249938964844,
			"height": 15.804687500000012,
			"seed": 348315940,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_history",
			"rawText": "- deposit_history",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_history",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 441,
			"versionNonce": 1033237769,
			"isDeleted": false,
			"id": "8BSwiL5s",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -174.9437290201597,
			"y": -974.8286132812509,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 118.67683410644531,
			"height": 15.804687500000012,
			"seed": 596843684,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_withdraw",
			"rawText": "- deposit_withdraw",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_withdraw",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 227,
			"versionNonce": 112622599,
			"isDeleted": false,
			"id": "2MtEDleSOvfa_aBlcxRkt",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -18.26456705729288,
			"y": -1038.211425781251,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1616784412,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 203,
			"versionNonce": 1124363241,
			"isDeleted": false,
			"id": "0T1Qkuah",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 25.56746419270712,
			"y": -1067.727050781251,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 65.59992980957031,
			"height": 25,
			"seed": 1014646940,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Coupon",
			"rawText": "Coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 314,
			"versionNonce": 783770407,
			"isDeleted": false,
			"id": "hAiIck0e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 5.237645467121183,
			"y": -1023.1801757812509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 1742656796,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 374,
			"versionNonce": 1161889481,
			"isDeleted": false,
			"id": "akTKdLJg",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3.392208479840292,
			"y": -999.9926757812509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 1073598876,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 406,
			"versionNonce": 1884186183,
			"isDeleted": false,
			"id": "CNdgkl8C",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 6.462520979840292,
			"y": -975.9848632812509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 604585500,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 455,
			"versionNonce": 1323779497,
			"isDeleted": false,
			"id": "BCoKh5hO",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 5.156628926593839,
			"y": -953.0200195312509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 1022565020,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 228,
			"versionNonce": 1784153447,
			"isDeleted": false,
			"id": "d_f-4zjUhc_7qeX2Bi-JM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 167.61433919270712,
			"y": -1041.461425781251,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 2078760484,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 202,
			"versionNonce": 186820745,
			"isDeleted": false,
			"id": "mAZg6gvb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 211.44637044270712,
			"y": -1070.977050781251,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 61.67994689941406,
			"height": 25,
			"seed": 186644900,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Vendor",
			"rawText": "Vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 337,
			"versionNonce": 740343943,
			"isDeleted": false,
			"id": "Bt24Texf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 191.11655171712118,
			"y": -1026.430175781251,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 50.572601318359375,
			"height": 15.804687500000012,
			"seed": 1874404644,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 401,
			"versionNonce": 867086185,
			"isDeleted": false,
			"id": "hi5au1j4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 190.2711147298403,
			"y": -1003.2426757812509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 110.78950500488281,
			"height": 15.804687500000012,
			"seed": 1327554724,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_business",
			"rawText": "- vendor_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 443,
			"versionNonce": 660936615,
			"isDeleted": false,
			"id": "20ne5yR4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 192.3414272298403,
			"y": -979.2348632812509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 106.10006713867188,
			"height": 15.804687500000012,
			"seed": 1896164388,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_delivery",
			"rawText": "- vendor_delivery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_delivery",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 478,
			"versionNonce": 1054267977,
			"isDeleted": false,
			"id": "vqFXMsjQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 191.03553517659384,
			"y": -956.2700195312509,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 87.40553283691406,
			"height": 15.804687500000012,
			"seed": 2001995684,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_user",
			"rawText": "- vendor_user",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_user",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 231,
			"versionNonce": 1649511111,
			"isDeleted": false,
			"id": "Mt3Vv9Fr4fAwq_nSj6hT2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 356.6534016927071,
			"y": -1038.719238281251,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1859473052,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 196,
			"versionNonce": 1299622185,
			"isDeleted": false,
			"id": "ZTCVHn0S",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 406.4854329427071,
			"y": -1068.234863281251,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 54.039947509765625,
			"height": 25,
			"seed": 1692998428,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Order",
			"rawText": "Order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 353,
			"versionNonce": 1770166759,
			"isDeleted": false,
			"id": "ioyXguHF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 380.1556142171212,
			"y": -1023.9653320312509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 96.72119140625,
			"height": 15.804687500000012,
			"seed": 1875859356,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_master",
			"rawText": "- order_master",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_master",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 401,
			"versionNonce": 1492753417,
			"isDeleted": false,
			"id": "YvPFn9HE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 378.3101772298403,
			"y": -1000.5004882812509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 88.32821655273438,
			"height": 15.804687500000012,
			"seed": 733611036,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_goods",
			"rawText": "- order_goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 437,
			"versionNonce": 33867015,
			"isDeleted": false,
			"id": "osX5h4FE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 381.3804897298403,
			"y": -976.4926757812509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 97.555419921875,
			"height": 15.804687500000012,
			"seed": 1587224732,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_status",
			"rawText": "- order_status",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_status",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 505,
			"versionNonce": 559624937,
			"isDeleted": false,
			"id": "7SZBTyKW",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 380.07459767659384,
			"y": -953.5278320312509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 60.065216064453125,
			"height": 15.804687500000012,
			"seed": 1076145436,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- payment",
			"rawText": "- payment",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- payment",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 259,
			"versionNonce": 458525735,
			"isDeleted": false,
			"id": "enYy36HZzFUt0gf11HFA3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 546.3213704427071,
			"y": -1039.441894531251,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 61073316,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 241,
			"versionNonce": 1529277897,
			"isDeleted": false,
			"id": "fuIjKTnr",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 592.1534016927071,
			"y": -1068.957519531251,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 60.17994689941406,
			"height": 25,
			"seed": 1301238564,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Goods",
			"rawText": "Goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 368,
			"versionNonce": 22966087,
			"isDeleted": false,
			"id": "E7iKq9dp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 569.8235829671212,
			"y": -1024.410644531251,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 45.908416748046875,
			"height": 15.804687500000012,
			"seed": 771837604,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 431,
			"versionNonce": 494423209,
			"isDeleted": false,
			"id": "UsbtZvDD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 567.9781459798403,
			"y": -1001.2231445312509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 80.23861694335938,
			"height": 15.804687500000012,
			"seed": 900192804,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods_plan",
			"rawText": "- goods_plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods_plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 486,
			"versionNonce": 1316941415,
			"isDeleted": false,
			"id": "fQ76Lzqz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 571.0484584798403,
			"y": -977.2153320312509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 35.40460205078125,
			"height": 15.804687500000012,
			"seed": 795932068,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan",
			"rawText": "- plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 512,
			"versionNonce": 268095369,
			"isDeleted": false,
			"id": "zk7MJUI3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 569.7425664265938,
			"y": -954.2504882812509,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 99.37556457519531,
			"height": 15.804687500000012,
			"seed": 1485480228,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan_category",
			"rawText": "- plan_category",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan_category",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "freedraw",
			"version": 180,
			"versionNonce": 495094151,
			"isDeleted": false,
			"id": "7cxFlzpd3XXwNtkk-tkor",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -358.5145670572929,
			"y": -1135.383300781251,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 84.68359375,
			"height": 138.65234375,
			"seed": 547952668,
			"groupIds": [
				"ysadT4m9O9TbCzEkf3A6R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954098,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-0.546875,
					0
				],
				[
					-2.7421875,
					0
				],
				[
					-5.02734375,
					0
				],
				[
					-14.1640625,
					1.01171875
				],
				[
					-20.28515625,
					2.5703125
				],
				[
					-26.40625,
					4.0390625
				],
				[
					-30.2421875,
					5.13671875
				],
				[
					-37.1875,
					7.93359375
				],
				[
					-40.4765625,
					9.58203125
				],
				[
					-43.35546875,
					11.64453125
				],
				[
					-45.82421875,
					14.12109375
				],
				[
					-48.4296875,
					17.19140625
				],
				[
					-51.171875,
					21.3125
				],
				[
					-52.90625,
					24.703125
				],
				[
					-55.3671875,
					32.6640625
				],
				[
					-56.4609375,
					40.34375
				],
				[
					-56.4609375,
					44.46484375
				],
				[
					-56.4609375,
					46.75390625
				],
				[
					-55.03515625,
					49.6015625
				],
				[
					-54.11328125,
					50.5234375
				],
				[
					-52.3671875,
					51.21484375
				],
				[
					-49.6171875,
					51.62890625
				],
				[
					-44.30859375,
					51.62890625
				],
				[
					-35.52734375,
					51.12890625
				],
				[
					-28.66796875,
					50.08203125
				],
				[
					-26.375,
					48.94140625
				],
				[
					-25.8203125,
					48.39453125
				],
				[
					-25.49609375,
					47.48046875
				],
				[
					-25.12890625,
					45.7421875
				],
				[
					-25.12890625,
					41.71875
				],
				[
					-25.12890625,
					38.9765625
				],
				[
					-27.18359375,
					33.49609375
				],
				[
					-29.375,
					29.56640625
				],
				[
					-32.75390625,
					24.76953125
				],
				[
					-37.50390625,
					19.515625
				],
				[
					-41.5234375,
					16.2265625
				],
				[
					-45.63671875,
					13.484375
				],
				[
					-47.921875,
					12.34375
				],
				[
					-51.8515625,
					11.93359375
				],
				[
					-55.96484375,
					11.93359375
				],
				[
					-61.4453125,
					12.34765625
				],
				[
					-66.37890625,
					14.73046875
				],
				[
					-73.82421875,
					19.85546875
				],
				[
					-77.296875,
					23.703125
				],
				[
					-78.84765625,
					26.453125
				],
				[
					-81.72265625,
					33.59375
				],
				[
					-82.6328125,
					38.53515625
				],
				[
					-83.04296875,
					41.83203125
				],
				[
					-83.63671875,
					48.23828125
				],
				[
					-84.2734375,
					55.6484375
				],
				[
					-84.68359375,
					59.5859375
				],
				[
					-84.68359375,
					65.9921875
				],
				[
					-84.68359375,
					70.5703125
				],
				[
					-84.68359375,
					80.453125
				],
				[
					-84.22265625,
					85.03125
				],
				[
					-81.10546875,
					95.375
				],
				[
					-79.1796875,
					100.68359375
				],
				[
					-74.37109375,
					109.1484375
				],
				[
					-73.546875,
					110.796875
				],
				[
					-68.59765625,
					117.94140625
				],
				[
					-61.9609375,
					125.26171875
				],
				[
					-57.61328125,
					128.6484375
				],
				[
					-55.09765625,
					130.66015625
				],
				[
					-46.81640625,
					135.78125
				],
				[
					-45.89453125,
					136.375
				],
				[
					-45.6171875,
					136.6484375
				],
				[
					-45.33984375,
					136.921875
				],
				[
					-43.68359375,
					137.55859375
				],
				[
					-42.58203125,
					138.2890625
				],
				[
					-40.8359375,
					138.65234375
				],
				[
					-40.8359375,
					138.65234375
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "freedraw",
			"version": 135,
			"versionNonce": 1491727977,
			"isDeleted": false,
			"id": "AiDP4oomG8P7v0wVv2c3y",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -402.3856608072929,
			"y": -1019.8090820312509,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 20.19921875,
			"height": 38.51953125,
			"seed": 1739013276,
			"groupIds": [
				"ysadT4m9O9TbCzEkf3A6R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0.32421875,
					0.64453125
				],
				[
					1.24609375,
					1.56640625
				],
				[
					2.21484375,
					2.85546875
				],
				[
					3.59375,
					4.6015625
				],
				[
					4.65234375,
					6.89453125
				],
				[
					5.7109375,
					8.640625
				],
				[
					6.6796875,
					9.9296875
				],
				[
					8.10546875,
					12.77734375
				],
				[
					9.1640625,
					14.5234375
				],
				[
					9.53125,
					15.90234375
				],
				[
					10.54296875,
					17.64453125
				],
				[
					10.8671875,
					18.92578125
				],
				[
					11.46875,
					19.83984375
				],
				[
					11.46875,
					20.38671875
				],
				[
					11.74609375,
					20.66015625
				],
				[
					11.74609375,
					20.93359375
				],
				[
					12.0234375,
					20.93359375
				],
				[
					12.0234375,
					21.20703125
				],
				[
					10.7890625,
					22.44140625
				],
				[
					7.86328125,
					24.54296875
				],
				[
					3.5234375,
					27.921875
				],
				[
					-0.81640625,
					31.7578125
				],
				[
					-4.2890625,
					34.40625
				],
				[
					-7.21484375,
					36.96484375
				],
				[
					-8.17578125,
					38.24609375
				],
				[
					-8.17578125,
					38.51953125
				],
				[
					-8.17578125,
					38.51953125
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "text",
			"version": 168,
			"versionNonce": 2074460327,
			"isDeleted": false,
			"id": "ZwwvrrL8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -357.2645670572929,
			"y": -1157.961425781251,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 181.74790954589844,
			"height": 35,
			"seed": 2113669540,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "\"Task Group\"",
			"rawText": "\"Task Group\"",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "\"Task Group\"",
			"lineHeight": 1.25,
			"baseline": 25
		},
		{
			"type": "rectangle",
			"version": 2131,
			"versionNonce": 1259422025,
			"isDeleted": false,
			"id": "98RXpnT8XLKM6zyGzjzke",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 492.5634505102286,
			"y": -750.039909615175,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 928061860,
			"groupIds": [
				"atBm41jlEDp3i5QIyXb-R",
				"trEL9Ic8_RpeiAH0q9GA1",
				"G95Sf4pXA8vMMx159TcHy"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1496,
			"versionNonce": 445977543,
			"isDeleted": false,
			"id": "ovaVFvzIwdNcHX471CTOB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 514.3495797380613,
			"y": -728.833707549049,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 952517924,
			"groupIds": [
				"d8S-D2JP9ii13IFa1pdGo",
				"trEL9Ic8_RpeiAH0q9GA1",
				"G95Sf4pXA8vMMx159TcHy"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1820,
			"versionNonce": 1405890601,
			"isDeleted": false,
			"id": "8WaT3eK99_nIVRtptbjzW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 525.4294646481019,
			"y": -710.8315592649433,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 965345444,
			"groupIds": [
				"jcD2A9QkFrbRuz_hlQAkx",
				"d8S-D2JP9ii13IFa1pdGo",
				"trEL9Ic8_RpeiAH0q9GA1",
				"G95Sf4pXA8vMMx159TcHy"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 1835,
			"versionNonce": 1114440423,
			"isDeleted": false,
			"id": "LRq9Nx8W0TN8YpVuXWo8Y",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 543.9589070204361,
			"y": -729.6017053208552,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 1900694564,
			"groupIds": [
				"zINynxhcoazSclGnpZMzn",
				"d8S-D2JP9ii13IFa1pdGo",
				"trEL9Ic8_RpeiAH0q9GA1",
				"G95Sf4pXA8vMMx159TcHy"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 1980,
			"versionNonce": 688276233,
			"isDeleted": false,
			"id": "4Cmku3cn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 438.4541829427073,
			"y": -677.7579419473268,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 175.67987060546875,
			"height": 24,
			"seed": 1911891876,
			"groupIds": [
				"G95Sf4pXA8vMMx159TcHy"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "VGCI05B8P7vXtKhtkH0Id",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 1",
			"rawText": "Python Instance 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 1",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "rectangle",
			"version": 2194,
			"versionNonce": 62524935,
			"isDeleted": false,
			"id": "mNsUF2nkVRKu6Uko_S42a",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 491.11267536374413,
			"y": -623.62364984955,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 1919518748,
			"groupIds": [
				"a1i66z0KbjgR-FwRwqgHK",
				"wk_G_iQqi-WGMfws5xkKF",
				"9reO3fpEJ8ZgapN7kynTu"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1559,
			"versionNonce": 926611945,
			"isDeleted": false,
			"id": "o8biFmSb5dKCMEc7NluD-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 512.8988045915767,
			"y": -602.417447783424,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 750396572,
			"groupIds": [
				"kJhIwQ35SGEq5o0xyJAHL",
				"wk_G_iQqi-WGMfws5xkKF",
				"9reO3fpEJ8ZgapN7kynTu"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1883,
			"versionNonce": 695776551,
			"isDeleted": false,
			"id": "BX58eYiqJ-lKgh5B5hEDU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 523.9786895016173,
			"y": -584.4152994993183,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 2076389660,
			"groupIds": [
				"cT7CJL4bEL65GYYYraNKS",
				"kJhIwQ35SGEq5o0xyJAHL",
				"wk_G_iQqi-WGMfws5xkKF",
				"9reO3fpEJ8ZgapN7kynTu"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 1898,
			"versionNonce": 1333122249,
			"isDeleted": false,
			"id": "EvmdBwpzo57akElBStjBy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 542.5081318739515,
			"y": -603.1854455552302,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 251047324,
			"groupIds": [
				"RV69sc-wqNlxW-i7ncdh2",
				"kJhIwQ35SGEq5o0xyJAHL",
				"wk_G_iQqi-WGMfws5xkKF",
				"9reO3fpEJ8ZgapN7kynTu"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 2049,
			"versionNonce": 1796569159,
			"isDeleted": false,
			"id": "PvzSdGbC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 437.0034077962228,
			"y": -550.3416821817018,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 184.49986267089844,
			"height": 24,
			"seed": 1468439068,
			"groupIds": [
				"9reO3fpEJ8ZgapN7kynTu"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 2",
			"rawText": "Python Instance 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 2",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "rectangle",
			"version": 2194,
			"versionNonce": 357716905,
			"isDeleted": false,
			"id": "zQBSNX9sThrBmOY0RTw-E",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 491.71814411374413,
			"y": -489.40880609955,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 6054052,
			"groupIds": [
				"5XA2MtwnBI64Pu_LYZpo1",
				"IRhikhz8hAutG6xdNZobA",
				"IC9y4L7nyytwK70SfDMwe"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1559,
			"versionNonce": 1584191335,
			"isDeleted": false,
			"id": "VwF4zGLx0_BgOnAnER08V",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 513.5042733415767,
			"y": -468.202604033424,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 1859169316,
			"groupIds": [
				"iGQBtUmSTjYmX7JIZgYK6",
				"IRhikhz8hAutG6xdNZobA",
				"IC9y4L7nyytwK70SfDMwe"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1883,
			"versionNonce": 754710153,
			"isDeleted": false,
			"id": "oTa7w1_nmc1HZWPjf4LHz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 524.5841582516173,
			"y": -450.2004557493183,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 800032676,
			"groupIds": [
				"i6rCawaZjdRV5IdWWrr_3",
				"iGQBtUmSTjYmX7JIZgYK6",
				"IRhikhz8hAutG6xdNZobA",
				"IC9y4L7nyytwK70SfDMwe"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 1898,
			"versionNonce": 701190791,
			"isDeleted": false,
			"id": "9nlfh1waMnDrCXL3VFNYH",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 543.1136006239515,
			"y": -468.9706018052302,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 925299492,
			"groupIds": [
				"IIAa7ZeDIGrjYkFnHGsbu",
				"iGQBtUmSTjYmX7JIZgYK6",
				"IRhikhz8hAutG6xdNZobA",
				"IC9y4L7nyytwK70SfDMwe"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 2045,
			"versionNonce": 690896233,
			"isDeleted": false,
			"id": "lbjbbn38",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 437.6088765462228,
			"y": -417.1268384317018,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 183.87986755371094,
			"height": 24,
			"seed": 1134882468,
			"groupIds": [
				"IC9y4L7nyytwK70SfDMwe"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "xdQQAqybDf4G8iAkw_2n2",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 3",
			"rawText": "Python Instance 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 3",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "rectangle",
			"version": 1504,
			"versionNonce": 1978493351,
			"isDeleted": false,
			"id": "DnVlXLjYCff6yY338cA3X",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 190.770558675129,
			"y": -595.2175692996982,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 64.65338134765624,
			"height": 64.65338134765624,
			"seed": 894423460,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "2WkEcW6LK1MI3Rw1k5hjl",
					"type": "arrow"
				},
				{
					"id": "CHsolVngxjo0ZsVArM9r8",
					"type": "arrow"
				},
				{
					"id": "JrPDiZ5FTxWLJqNIPQZ9p",
					"type": "arrow"
				},
				{
					"id": "pynyHYYUVcpxfABHDpXoC",
					"type": "arrow"
				},
				{
					"id": "VGCI05B8P7vXtKhtkH0Id",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1973,
			"versionNonce": 959752265,
			"isDeleted": false,
			"id": "0YXDPf7V8cjesFA4VAR-J",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 215.66705902061176,
			"y": -575.121473776672,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.16932105348633,
			"height": 0,
			"seed": 1982725412,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					15.16932105348633,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2024,
			"versionNonce": 536845511,
			"isDeleted": false,
			"id": "ng8yzfysYH1F6Q55hbYNK",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 214.19516466717005,
			"y": -550.3425792581759,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 17.13783740126311,
			"height": 0,
			"seed": 1631238308,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					17.13783740126311,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1870,
			"versionNonce": 384481065,
			"isDeleted": false,
			"id": "mgLG32quDEveWtHijOwj0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 197.3946150588581,
			"y": -579.292134343211,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 16.95504631353927,
			"height": 48.41270068259871,
			"seed": 1378092068,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					16.95504631353927,
					-7.400560664373661
				],
				[
					16.871549804500688,
					41.01214001822505
				],
				[
					0.08056087780811456,
					33.450908214315675
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1818,
			"versionNonce": 731802599,
			"isDeleted": false,
			"id": "saZHtKdTS4s64CythC-L1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 231.8556587381579,
			"y": -586.8777458024181,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 16.976775286010504,
			"height": 48.27905988118746,
			"seed": 2128076708,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.1970252545028261,
					48.27905988118746
				],
				[
					16.961573619999825,
					40.954321999069336
				],
				[
					16.976775286010504,
					7.507893438730637
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1543,
			"versionNonce": 884730377,
			"isDeleted": false,
			"id": "00N18aRPmLR5hbBSOewW8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 218.5366269516726,
			"y": -556.7421062397218,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.101119485207235,
			"height": 12.203935908273408,
			"seed": 797199140,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					9.101119485207235,
					-12.203935908273408
				]
			]
		},
		{
			"type": "line",
			"version": 1661,
			"versionNonce": 1960204039,
			"isDeleted": false,
			"id": "hrPYvPeeK9Rpcg2hiVei1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 226.34514095647955,
			"y": -566.6108601581652,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.016669064250991,
			"height": 8.41385706862771,
			"seed": 1989625508,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.00572174417704,
					4.3706612125143
				],
				[
					-0.010947320073949565,
					8.41385706862771
				]
			]
		},
		{
			"type": "line",
			"version": 1801,
			"versionNonce": 732152041,
			"isDeleted": false,
			"id": "Q1uPauXnr_S3ILMyKtpEI",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 214.53932435534716,
			"y": -567.1542435109156,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.016669064250991,
			"height": 8.41385706862771,
			"seed": 1757336100,
			"groupIds": [
				"lOf-q1QK6zqCL9PuWMTit",
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.00572174417704,
					4.3706612125143
				],
				[
					-0.010947320073949565,
					8.41385706862771
				]
			]
		},
		{
			"type": "text",
			"version": 1488,
			"versionNonce": 572775975,
			"isDeleted": false,
			"id": "lOG4jDFu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 156.3472417195626,
			"y": -527.1564541378036,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 133.4999237060547,
			"height": 24,
			"seed": 1424551332,
			"groupIds": [
				"DS2PbndJ96yhy39n_4OHG"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "JrPDiZ5FTxWLJqNIPQZ9p",
					"type": "arrow"
				},
				{
					"id": "xdQQAqybDf4G8iAkw_2n2",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "API Gateway",
			"rawText": "API Gateway",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "API Gateway",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "text",
			"version": 339,
			"versionNonce": 1764604873,
			"isDeleted": false,
			"id": "IIKH7VMZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 180.761311848957,
			"y": -1191.735775596218,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 106.08172607421875,
			"height": 88.23401131849592,
			"seed": 2071776420,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 70.58720905479673,
			"fontFamily": 1,
			"text": "V.2",
			"rawText": "V.2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "V.2",
			"lineHeight": 1.25,
			"baseline": 62
		},
		{
			"type": "arrow",
			"version": 279,
			"versionNonce": 1450410311,
			"isDeleted": false,
			"id": "2WkEcW6LK1MI3Rw1k5hjl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 87.72368849369388,
			"y": -640.3804244219538,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 99.78618421052636,
			"height": 50.76055876695635,
			"seed": 350312988,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "pFt7Qi1K1AS-Z1ywrKiuN",
				"focus": -0.2328091163340205,
				"gap": 1.8704840871480428
			},
			"endBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": 0.17686571852389432,
				"gap": 3.260685970908753
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					99.78618421052636,
					50.76055876695635
				]
			]
		},
		{
			"type": "arrow",
			"version": 310,
			"versionNonce": 494230185,
			"isDeleted": false,
			"id": "CHsolVngxjo0ZsVArM9r8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 90.20312928316753,
			"y": -548.265074704372,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 91.29029123406679,
			"height": 1.6946133557034173,
			"seed": 1849331876,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GXtPWSN1F_K5QRZxz5phd",
				"focus": 0.07589139193096822,
				"gap": 2.93105119513541
			},
			"endBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": -0.3692710578568197,
				"gap": 9.277138157894683
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					91.29029123406679,
					-1.6946133557034173
				]
			]
		},
		{
			"type": "arrow",
			"version": 432,
			"versionNonce": 589414503,
			"isDeleted": false,
			"id": "JrPDiZ5FTxWLJqNIPQZ9p",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 87.46464244106232,
			"y": -420.4611045435862,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 87.9235197368422,
			"height": 73.13322368421052,
			"seed": 268680484,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "lOG4jDFu",
				"focus": 0.2683800856297855,
				"gap": 9.562125910006898
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					87.9235197368422,
					-73.13322368421052
				]
			]
		},
		{
			"type": "arrow",
			"version": 532,
			"versionNonce": 1764105609,
			"isDeleted": false,
			"id": "pynyHYYUVcpxfABHDpXoC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 265.69932509647515,
			"y": -552.9420246521295,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 148.34703947368425,
			"height": 3.6759868421052033,
			"seed": 111717284,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": 0.3321844488846997,
				"gap": 10.275385073689904
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					148.34703947368425,
					-3.6759868421052033
				]
			]
		},
		{
			"type": "arrow",
			"version": 466,
			"versionNonce": 972757895,
			"isDeleted": false,
			"id": "VGCI05B8P7vXtKhtkH0Id",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 263.573445714486,
			"y": -593.8432796898721,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 163.7129934210526,
			"height": 73.92282939093832,
			"seed": 1518763684,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": -0.27013808216927226,
				"gap": 8.149505691700767
			},
			"endBinding": {
				"elementId": "4Cmku3cn",
				"focus": 0.9042033439177527,
				"gap": 11.167743807168705
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					163.7129934210526,
					-73.92282939093832
				]
			]
		},
		{
			"type": "arrow",
			"version": 363,
			"versionNonce": 1266386025,
			"isDeleted": false,
			"id": "xdQQAqybDf4G8iAkw_2n2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 294.9602527835002,
			"y": -512.0432005647815,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 130.80920570775083,
			"height": 88.94272217061243,
			"seed": 1713744420,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "lOG4jDFu",
				"focus": -0.7972219197374926,
				"gap": 5.113087357882932
			},
			"endBinding": {
				"elementId": "lbjbbn38",
				"focus": -0.7057793169694165,
				"gap": 11.83941805497173
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					130.80920570775083,
					88.94272217061243
				]
			]
		},
		{
			"type": "text",
			"version": 378,
			"versionNonce": 1597772455,
			"isDeleted": false,
			"id": "KRIM94Zu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -23.074687890840437,
			"y": -685.892847964639,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 59.899932861328125,
			"height": 25,
			"seed": 100392356,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- shop",
			"rawText": "- shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 465,
			"versionNonce": 1346441033,
			"isDeleted": false,
			"id": "3bRfM5N7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -23.451606884338617,
			"y": -651.9619269120072,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 88.0198974609375,
			"height": 25,
			"seed": 1795493540,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 434,
			"versionNonce": 462497223,
			"isDeleted": false,
			"id": "pyv5txc6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -22.115258200127982,
			"y": -581.5055124383232,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 80.97991943359375,
			"height": 25,
			"seed": 832214428,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- coupon",
			"rawText": "- coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 427,
			"versionNonce": 2110930473,
			"isDeleted": false,
			"id": "lfAMhSh6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -21.494370042233413,
			"y": -550.6831440172706,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 80.01992797851562,
			"height": 25,
			"seed": 208625436,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 506,
			"versionNonce": 773248231,
			"isDeleted": false,
			"id": "apeJEV7S",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -22.634692275734665,
			"y": -464.4824861225337,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 68.81993103027344,
			"height": 25,
			"seed": 529807516,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- order",
			"rawText": "- order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 584,
			"versionNonce": 52072713,
			"isDeleted": false,
			"id": "LkYJA0Kh",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -22.023448074074395,
			"y": -432.6403808593757,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 72.63992309570312,
			"height": 25,
			"seed": 993257628,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "abn5n_H1Uz4-FAVIc_r9V",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "line",
			"version": 212,
			"versionNonce": 1046061063,
			"isDeleted": false,
			"id": "O8KyS6Px4JGARvTLheSRI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 129.38076086211493,
			"y": -452.38184878700736,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1.484375,
			"height": 163.75822368421063,
			"seed": 81807524,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-1.484375,
					163.75822368421063
				]
			]
		},
		{
			"type": "text",
			"version": 696,
			"versionNonce": 630556649,
			"isDeleted": false,
			"id": "thHLL94i",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -117.05875474676031,
			"y": -263.5055337173525,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 443.7596740722656,
			"height": 175,
			"seed": 287795612,
			"groupIds": [
				"qpT7yEfgZn-VcnK0rzUpt"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "curl -X POST \"https://{endpoint}/api/fs_etl\"\n    request-body {\n        task: order\n        start_dt: 2023_09_01_1230\n        end_dt: 2023_09_30_2359\n    }\n",
			"rawText": "curl -X POST \"https://{endpoint}/api/fs_etl\"\n    request-body {\n        task: order\n        start_dt: 2023_09_01_1230\n        end_dt: 2023_09_30_2359\n    }\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "curl -X POST \"https://{endpoint}/api/fs_etl\"\n    request-body {\n        task: order\n        start_dt: 2023_09_01_1230\n        end_dt: 2023_09_30_2359\n    }\n",
			"lineHeight": 1.25,
			"baseline": 168
		},
		{
			"type": "rectangle",
			"version": 612,
			"versionNonce": 1314260775,
			"isDeleted": false,
			"id": "PUWUYkcA1Nc2trsZsqDTz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -124.898392904655,
			"y": -281.33998055945324,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 496.0269661592712,
			"height": 181.71391253869973,
			"seed": 2010034596,
			"groupIds": [
				"qpT7yEfgZn-VcnK0rzUpt"
			],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 442,
			"versionNonce": 1819839047,
			"isDeleted": false,
			"id": "5VjuDznpfBuDpSZADvkyn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 585.8587967722025,
			"y": -581.1414288080233,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 183.9843749999999,
			"height": 0.9375000000001137,
			"seed": 2075495836,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					183.9843749999999,
					-0.9375000000001137
				]
			]
		},
		{
			"type": "rectangle",
			"version": 762,
			"versionNonce": 484532649,
			"isDeleted": false,
			"id": "PL85HkZsMRGHdnbnXJVy5",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 771.8097744768811,
			"y": -648.9555735448653,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 411.2360654239771,
			"height": 133.3961531432749,
			"seed": 434482332,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 371,
			"versionNonce": 631089511,
			"isDeleted": false,
			"id": "AOehfib8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 784.4086014597025,
			"y": -632.4157343635787,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 385.81976318359375,
			"height": 100,
			"seed": 1783483044,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "python3 fs_etl.py\n    --task \"order\"\n    --start_dt \"2023-09-01 12:30:00\"\n    --end_dt \"2023-09-30 23:59:59\"",
			"rawText": "python3 fs_etl.py\n    --task \"order\"\n    --start_dt \"2023-09-01 12:30:00\"\n    --end_dt \"2023-09-30 23:59:59\"",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "python3 fs_etl.py\n    --task \"order\"\n    --start_dt \"2023-09-01 12:30:00\"\n    --end_dt \"2023-09-30 23:59:59\"",
			"lineHeight": 1.25,
			"baseline": 93
		},
		{
			"type": "rectangle",
			"version": 769,
			"versionNonce": 1266238601,
			"isDeleted": false,
			"id": "C_RejTk9kSms1Gxjv2tl6",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -404.3205415296868,
			"y": -2196.9682451127574,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 554.9067080593737,
			"height": 447.58359035579053,
			"seed": 14308167,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2026,
			"versionNonce": 923919495,
			"isDeleted": false,
			"id": "T05cgf-WwXZGBvRqkzzYm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -341.01480450928216,
			"y": -2256.169629473025,
			"strokeColor": "turquoise",
			"backgroundColor": "turquoise",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1021203047,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1851,
			"versionNonce": 1725025129,
			"isDeleted": false,
			"id": "mnyOrFgHt2VIGFCLs3ggk",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -351.6335055405634,
			"y": -2242.6041136887216,
			"strokeColor": "aqua",
			"backgroundColor": "aqua",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 1381330311,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2210,
			"versionNonce": 9550759,
			"isDeleted": false,
			"id": "0oLyrCeqwXr3MU0Xosqvm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -367.5473009830391,
			"y": -2258.758162137666,
			"strokeColor": "red",
			"backgroundColor": "red",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1551639719,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2071,
			"versionNonce": 1463187017,
			"isDeleted": false,
			"id": "Iy7fGHrGz_nyLuWa-y_Fg",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -355.89274635869083,
			"y": -2259.4273673514776,
			"strokeColor": "salmon",
			"backgroundColor": "salmon",
			"width": 19.090763219686202,
			"height": 10.920680508629188,
			"seed": 1526659015,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.247032861929438,
					5.414223509566554
				],
				[
					7.80069096616502,
					9.655793097762178
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.2700879407222723
				],
				[
					17.409206394840286,
					1.7137171824230046
				],
				[
					12.349656751372345,
					2.271356548532129
				],
				[
					5.08675110820378,
					0.625643650550335
				],
				[
					0.013602600172775085,
					-1.26488741086701
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2147,
			"versionNonce": 910798535,
			"isDeleted": false,
			"id": "lNZJS7VI5WOuXBMQz5C8g",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -369.9388603690934,
			"y": -2232.3284810254795,
			"strokeColor": "#228be6",
			"backgroundColor": "#228be6",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 603612903,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1969,
			"versionNonce": 1870841129,
			"isDeleted": false,
			"id": "qo-G3v9WjG5i85N2Xw3hI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -372.44555245602646,
			"y": -2255.094332579882,
			"strokeColor": "lightblue",
			"backgroundColor": "lightblue",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 368767495,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2121,
			"versionNonce": 1389772263,
			"isDeleted": false,
			"id": "CVbKmcUjnVSbtcSMaXB0Z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -343.5346238389068,
			"y": -2229.7220185060373,
			"strokeColor": "green",
			"backgroundColor": "green",
			"width": 26.626032756145793,
			"height": 31.683786732555944,
			"seed": 167581991,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245173
				],
				[
					-2.048210553853881,
					5.466507876823853
				],
				[
					-5.656165483542917,
					8.491751647064286
				],
				[
					-10.052266425009464,
					11.126683806841765
				],
				[
					-10.006359309336936,
					12.356339945392238
				],
				[
					-4.093510626546925,
					14.592608482820363
				],
				[
					2.8736090261096536,
					15.831570229232076
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732269
				],
				[
					16.146625249157346,
					-5.0410819524881925
				],
				[
					16.57376633113633,
					-14.47177307413826
				],
				[
					15.460041218424415,
					-15.852216503323866
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1947,
			"versionNonce": 455227401,
			"isDeleted": false,
			"id": "AJkRDXzNXPQQCh8omfYZA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -368.2266583260516,
			"y": -2238.5263053345284,
			"strokeColor": "lightgreen",
			"backgroundColor": "lightgreen",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 91053127,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1118,
			"versionNonce": 1229187335,
			"isDeleted": false,
			"id": "_ZhYq4jXtnehM9fP5mkm3",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -353.7273711374396,
			"y": -2245.608484403174,
			"strokeColor": "#000000",
			"backgroundColor": "black",
			"width": 2.4664671675253453,
			"height": 2.4664671675253453,
			"seed": 740834151,
			"groupIds": [
				"V67DSHMZ3HZzl9yiZh_x_",
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1109,
			"versionNonce": 1276137193,
			"isDeleted": false,
			"id": "pqafiCN6",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -318.1183642181485,
			"y": -2265.479354532983,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 41.3492431640625,
			"height": 15.66025242037268,
			"seed": 1920611975,
			"groupIds": [
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 12.311733971712764,
			"fontFamily": 1,
			"text": "Apache",
			"rawText": "Apache",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Apache",
			"lineHeight": 1.2719778104654809,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 1063,
			"versionNonce": 1997484071,
			"isDeleted": false,
			"id": "riNTmVOi",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -322.6548514797871,
			"y": -2252.7498452715604,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 83.15940856933594,
			"height": 32.80021373085932,
			"seed": 253742503,
			"groupIds": [
				"m9o13TaMxqgKO9hALxWKP"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 25.854479605079288,
			"fontFamily": 1,
			"text": "Airflow",
			"rawText": "Airflow",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Airflow",
			"lineHeight": 1.2686472221400076,
			"baseline": 23
		},
		{
			"type": "rectangle",
			"version": 504,
			"versionNonce": 685279689,
			"isDeleted": false,
			"id": "FkzsMW60NG6t4z7lQtuLs",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -378.00428552007133,
			"y": -2182.736424199296,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 190.09014423076923,
			"height": 143.7079326923078,
			"seed": 759529671,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "Cy4CR0Wj"
				},
				{
					"id": "0QzTh_yCaQCFf0whrXwQr",
					"type": "arrow"
				},
				{
					"id": "kHKtgsRYkpZoNcQEC90II",
					"type": "arrow"
				},
				{
					"id": "KyUeias4VD-UsePzxNMdv",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 429,
			"versionNonce": 1445237575,
			"isDeleted": false,
			"id": "Cy4CR0Wj",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -331.16916671279216,
			"y": -2148.382457853142,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.41990661621094,
			"height": 75,
			"seed": 1585958887,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Scheduler\n&\nWebserver",
			"rawText": "Scheduler\n&\nWebserver",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "FkzsMW60NG6t4z7lQtuLs",
			"originalText": "Scheduler\n&\nWebserver",
			"lineHeight": 1.25,
			"baseline": 68
		},
		{
			"type": "line",
			"version": 6400,
			"versionNonce": 2056677545,
			"isDeleted": false,
			"id": "SZLyJFSaVYuqvlSS2Tcsf",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -327.7490392301074,
			"y": -1978.2334315188589,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 75.01121630306868,
			"height": 96.81388324216654,
			"seed": 1291008775,
			"groupIds": [
				"d7oxn3GvWyp_Q7IdgjYEp",
				"S3JV55Qcrm0wdzNq8zjG0",
				"HUDnbKvRMQVv9KRJclcu7"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.24734846976242794,
					73.1714082159101
				],
				[
					0.011575327725072006,
					81.50165529728328
				],
				[
					3.8632435379119165,
					85.10105205208878
				],
				[
					17.276485894102954,
					88.14730719194147
				],
				[
					39.948665011120255,
					89.0958655364321
				],
				[
					61.61043288740646,
					87.58135319133916
				],
				[
					73.11948965218787,
					83.95942431004657
				],
				[
					74.74268637210398,
					80.90610026776591
				],
				[
					74.9706584753909,
					74.19947908967055
				],
				[
					74.79172688269483,
					6.138672737165569
				],
				[
					74.38835763792527,
					-0.2918194398554754
				],
				[
					69.57188081608908,
					-3.885863818744892
				],
				[
					59.42940850758881,
					-5.967344146345569
				],
				[
					36.31608449133351,
					-7.7180177057344235
				],
				[
					17.785060590062127,
					-6.674087120295436
				],
				[
					3.210536142559118,
					-3.1332019499277424
				],
				[
					-0.04055782767777212,
					-0.04396604849106378
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 7123,
			"versionNonce": 1860211303,
			"isDeleted": false,
			"id": "wCwDgHVClDG5wFRGo0cNs",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -327.48310663942345,
			"y": -1986.986399674887,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 74.53008207714048,
			"height": 15.073148387271289,
			"seed": 755253799,
			"groupIds": [
				"d7oxn3GvWyp_Q7IdgjYEp",
				"S3JV55Qcrm0wdzNq8zjG0",
				"HUDnbKvRMQVv9KRJclcu7"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "kHKtgsRYkpZoNcQEC90II",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 388,
			"versionNonce": 1526033289,
			"isDeleted": false,
			"id": "eNJBHWKrPb3pE4ju-Kggt",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -359.0678054739976,
			"y": -1838.7373470979283,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 134.96394230769238,
			"height": 69.89783653846155,
			"seed": 1873241415,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "hBa29DCg"
				},
				{
					"id": "Ee8nRHpvzPv-xebZB1FZL",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 366,
			"versionNonce": 168799623,
			"isDeleted": false,
			"id": "hBa29DCg",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -319.26581936653815,
			"y": -1816.2884288286975,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.35997009277344,
			"height": 25,
			"seed": 876160103,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "DAGs",
			"rawText": "DAGs",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "eNJBHWKrPb3pE4ju-Kggt",
			"originalText": "DAGs",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 890,
			"versionNonce": 477274538,
			"isDeleted": false,
			"id": "Ee8nRHpvzPv-xebZB1FZL",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -288.61168546189515,
			"y": -1862.014488783269,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.1815832055096962,
			"height": 16.7463178822577,
			"seed": 2055602055,
			"groupIds": [
				"X9V8YzYf-TDdF_kHkAv21"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864118,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "eNJBHWKrPb3pE4ju-Kggt",
				"gap": 6.530823803082967,
				"focus": 0.053130779867938877
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.1815832055096962,
					16.7463178822577
				]
			]
		},
		{
			"type": "arrow",
			"version": 724,
			"versionNonce": 586048679,
			"isDeleted": false,
			"id": "ErW3kKb6_gwjGfwGq0-LP",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -288.6286414875906,
			"y": -1862.108117951952,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341078562,
			"height": 17.722798727512895,
			"seed": 348812967,
			"groupIds": [
				"X9V8YzYf-TDdF_kHkAv21"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341078562,
					-17.722798727512895
				]
			]
		},
		{
			"type": "diamond",
			"version": 1153,
			"versionNonce": 353688905,
			"isDeleted": false,
			"id": "qb1hCXK33bWEnHynt3uGh",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -234.33474580935444,
			"y": -1947.1095584622924,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1504905671,
			"groupIds": [
				"jWZpUpEspupqlDa8jG1DQ",
				"SDiOy1uHZtfK26Rk4WxKl"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1195,
			"versionNonce": 422131655,
			"isDeleted": false,
			"id": "qr2_zAuHhAW2jIurFzGAR",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -234.33474580935444,
			"y": -1955.981338390551,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 375142631,
			"groupIds": [
				"jWZpUpEspupqlDa8jG1DQ",
				"SDiOy1uHZtfK26Rk4WxKl"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "6FKyBIQdWw0dNBxfHFsYP",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1281,
			"versionNonce": 1392266281,
			"isDeleted": false,
			"id": "Sp2tA7e9thdPoZ1QNJYbJ",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -234.33474580935444,
			"y": -1968.6118979852629,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1079149575,
			"groupIds": [
				"jWZpUpEspupqlDa8jG1DQ",
				"SDiOy1uHZtfK26Rk4WxKl"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "6FKyBIQdWw0dNBxfHFsYP",
					"type": "arrow"
				},
				{
					"id": "q1_VVuKIUhgImT_owPK1t",
					"type": "arrow"
				},
				{
					"id": "jLb9n14oII7NXyXPkCRKc",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1334,
			"versionNonce": 584885991,
			"isDeleted": false,
			"id": "WNdpzWF0MPbS_yKegAfh4",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -234.33474580935444,
			"y": -1981.1435702825602,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1737648935,
			"groupIds": [
				"jWZpUpEspupqlDa8jG1DQ",
				"SDiOy1uHZtfK26Rk4WxKl"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "Ud8mf8kAURx9bjT86Y5k8",
					"type": "arrow"
				},
				{
					"id": "6FKyBIQdWw0dNBxfHFsYP",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 501,
			"versionNonce": 64151305,
			"isDeleted": false,
			"id": "V9L9xDVr",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -202.829037248825,
			"y": -1974.3157673245435,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 51.11994934082031,
			"height": 25,
			"seed": 1753771591,
			"groupIds": [
				"SDiOy1uHZtfK26Rk4WxKl"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "q1_VVuKIUhgImT_owPK1t",
					"type": "arrow"
				},
				{
					"id": "Ud8mf8kAURx9bjT86Y5k8",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Redis",
			"rawText": "Redis",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Redis",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1325,
			"versionNonce": 1557677738,
			"isDeleted": false,
			"id": "0QzTh_yCaQCFf0whrXwQr",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -233.94222673798663,
			"y": -2027.212636046395,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2555306941908384,
			"height": 23.56604632889821,
			"seed": 1578175847,
			"groupIds": [
				"PynHg7pY0c2xrEETeJOnZ"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864115,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "FkzsMW60NG6t4z7lQtuLs",
				"gap": 13.810252385991248,
				"focus": 0.10354803767814492
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.2555306941908384,
					23.56604632889821
				]
			]
		},
		{
			"type": "arrow",
			"version": 1286,
			"versionNonce": 1175721449,
			"isDeleted": false,
			"id": "Ud8mf8kAURx9bjT86Y5k8",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -220.0712953618713,
			"y": -1982.7180469340449,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2840418715895313,
			"height": 24.940186781763522,
			"seed": 1400424583,
			"groupIds": [
				"PynHg7pY0c2xrEETeJOnZ"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "V9L9xDVr",
				"focus": -0.6053918351334168,
				"gap": 10.516697553496442
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.2840418715895313,
					-24.940186781763522
				]
			]
		},
		{
			"type": "rectangle",
			"version": 541,
			"versionNonce": 1699698983,
			"isDeleted": false,
			"id": "BEpAliRbByet3wW_XxSgx",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -49.956190838981,
			"y": -2131.7390177231027,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 164.12306810890618,
			"height": 345.2139841463238,
			"seed": 914104231,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "6FKyBIQdWw0dNBxfHFsYP",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 503,
			"versionNonce": 1556836553,
			"isDeleted": false,
			"id": "k84N7q7w",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3.105373733050101,
			"y": -2164.8676912669275,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 57.99993896484375,
			"height": 25,
			"seed": 155685575,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Celery",
			"rawText": "Celery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Celery",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1215,
			"versionNonce": 1014471751,
			"isDeleted": false,
			"id": "6FKyBIQdWw0dNBxfHFsYP",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -118.15678588483934,
			"y": -1947.3803312975424,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.61060860972839,
			"height": 99.21676970494727,
			"seed": 1417126375,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "WNdpzWF0MPbS_yKegAfh4",
				"focus": 1.2899935373154943,
				"gap": 15.713008798042914
			},
			"endBinding": {
				"elementId": "meRWTeod_squJmDTYnw0i",
				"focus": 0.5725170004071709,
				"gap": 6.573683044425707
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					82.61060860972839,
					-99.21676970494727
				]
			]
		},
		{
			"type": "arrow",
			"version": 943,
			"versionNonce": 496267177,
			"isDeleted": false,
			"id": "q1_VVuKIUhgImT_owPK1t",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -119.83512834477915,
			"y": -1942.6678288550863,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 83.24860871393275,
			"height": 0.3810062462142696,
			"seed": 1494797575,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "Sp2tA7e9thdPoZ1QNJYbJ",
				"focus": 0.4255027309908084,
				"gap": 7.759040314649226
			},
			"endBinding": {
				"elementId": "g_fHWozuQTJ1yLigYj96E",
				"focus": -0.347980414514858,
				"gap": 9.032899081647429
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					83.24860871393275,
					-0.3810062462142696
				]
			]
		},
		{
			"type": "arrow",
			"version": 1101,
			"versionNonce": 132807527,
			"isDeleted": false,
			"id": "jLb9n14oII7NXyXPkCRKc",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -120.44709424280018,
			"y": -1937.486918685486,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 89.28200057698177,
			"height": 98.53147271835927,
			"seed": 44536871,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "Sp2tA7e9thdPoZ1QNJYbJ",
				"focus": -0.8170895935619735,
				"gap": 12.494251014540328
			},
			"endBinding": {
				"elementId": "hjK8Wupv",
				"focus": -0.8560968029210521,
				"gap": 15.558312258412002
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					89.28200057698177,
					98.53147271835927
				]
			]
		},
		{
			"type": "arrow",
			"version": 1226,
			"versionNonce": 58860586,
			"isDeleted": false,
			"id": "kHKtgsRYkpZoNcQEC90II",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -289.7484366969107,
			"y": -2009.3916519713405,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18160064923910113,
			"height": 16.747926611653156,
			"seed": 420509511,
			"groupIds": [
				"ReM2WhYiW2FXfLCe6G4GE"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864116,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "FkzsMW60NG6t4z7lQtuLs",
				"gap": 29.63683953564771,
				"focus": 0.0823352118067781
			},
			"endBinding": {
				"elementId": "wCwDgHVClDG5wFRGo0cNs",
				"gap": 5.658844441888714,
				"focus": 0.021314651672632946
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.18160064923910113,
					16.747926611653156
				]
			]
		},
		{
			"type": "arrow",
			"version": 1058,
			"versionNonce": 1623199466,
			"isDeleted": false,
			"id": "KyUeias4VD-UsePzxNMdv",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -289.765392722606,
			"y": -2009.4852811400235,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341084246,
			"height": 17.722798727512867,
			"seed": 850392679,
			"groupIds": [
				"ReM2WhYiW2FXfLCe6G4GE"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864116,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "FkzsMW60NG6t4z7lQtuLs",
				"gap": 29.543210366964672,
				"focus": 0.08304507274778417
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341084246,
					-17.722798727512867
				]
			]
		},
		{
			"type": "rectangle",
			"version": 576,
			"versionNonce": 614029673,
			"isDeleted": false,
			"id": "meRWTeod_squJmDTYnw0i",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -28.972494230685243,
			"y": -2103.293319150821,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 82.7041936917846,
			"seed": 1716687239,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "6FKyBIQdWw0dNBxfHFsYP",
					"type": "arrow"
				},
				{
					"id": "0ufONsrol1AKy9JM9s1s-",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 566,
			"versionNonce": 257035687,
			"isDeleted": false,
			"id": "g_fHWozuQTJ1yLigYj96E",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -27.553620549198968,
			"y": -1994.4166020359899,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 1026869415,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "q1_VVuKIUhgImT_owPK1t",
					"type": "arrow"
				},
				{
					"id": "JqSh6p1ifOP12qSUJEoAj",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 586,
			"versionNonce": 1356612681,
			"isDeleted": false,
			"id": "qUZnZlBUCGocV1jHUH57n",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -27.325010428889073,
			"y": -1881.0110730068125,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 1694702535,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "jLb9n14oII7NXyXPkCRKc",
					"type": "arrow"
				},
				{
					"id": "MVH3pnboNdOd8InNb9lcz",
					"type": "arrow"
				}
			],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 550,
			"versionNonce": 1831846087,
			"isDeleted": false,
			"id": "HwrMqsyu",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -5.006162028960716,
			"y": -2127.3256547653396,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 76.5599365234375,
			"height": 25,
			"seed": 567937767,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 1",
			"rawText": "worker 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 1",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 603,
			"versionNonce": 255775529,
			"isDeleted": false,
			"id": "NGtb3S5A",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -5.833629311983259,
			"y": -2018.2189899550253,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 85.37992858886719,
			"height": 25,
			"seed": 4593159,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 2",
			"rawText": "worker 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 2",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 640,
			"versionNonce": 657068007,
			"isDeleted": false,
			"id": "umvM6z3E",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -9.135363239719254,
			"y": -1901.791831509583,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 84.75993347167969,
			"height": 25,
			"seed": 1195621671,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 3",
			"rawText": "worker 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 3",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "rectangle",
			"version": 326,
			"versionNonce": 1143768585,
			"isDeleted": false,
			"id": "Z8GJKoOrgCr0x-erwEJnd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -398.3479003906249,
			"y": -2486.601318359377,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1152.91796875,
			"height": 187.7109375,
			"seed": 708804679,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 294,
			"versionNonce": 1196260103,
			"isDeleted": false,
			"id": "mL_CWGRpqyWnhe2J9geJ8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 311.8864746093751,
			"y": -2198.609130859377,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 440.546875,
			"height": 445.98437499999994,
			"seed": 991289191,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "image",
			"version": 351,
			"versionNonce": 983620841,
			"isDeleted": false,
			"id": "DTedLjWKsYiPaLf8B88Zp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 329.9685058593751,
			"y": -2276.637207031252,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.08593750000001,
			"height": 64.08593750000001,
			"seed": 471030407,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"status": "pending",
			"fileId": "907320ac5d17df89816c0d633e1bd332ce62b658",
			"scale": [
				1,
				1
			]
		},
		{
			"type": "rectangle",
			"version": 239,
			"versionNonce": 1645642279,
			"isDeleted": false,
			"id": "gp8uAj-uBcJy-wkSPOXQp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -370.3908691406249,
			"y": -2442.492675781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1911845287,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 199,
			"versionNonce": 1378310089,
			"isDeleted": false,
			"id": "BnhBzvc6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -320.5588378906249,
			"y": -2472.008300781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 42.979949951171875,
			"height": 25,
			"seed": 367371463,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Shop",
			"rawText": "Shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 326,
			"versionNonce": 1215407431,
			"isDeleted": false,
			"id": "ohm6gY4O",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -346.8886566162108,
			"y": -2427.461425781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 126055399,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 386,
			"versionNonce": 1826322089,
			"isDeleted": false,
			"id": "5Q2XHd9Z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -348.7340936034917,
			"y": -2404.273925781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 517627655,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954099,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 418,
			"versionNonce": 2042324071,
			"isDeleted": false,
			"id": "sXJut4xG",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -345.6637811034917,
			"y": -2380.266113281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 2120672807,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 467,
			"versionNonce": 493402505,
			"isDeleted": false,
			"id": "1YI9KoMQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -346.96967315673817,
			"y": -2357.301269531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 1159039303,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 287,
			"versionNonce": 1438662535,
			"isDeleted": false,
			"id": "aI40gQrqUDLzh-VKPcHMa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -190.2541503906249,
			"y": -2443.633300781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 4376679,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 266,
			"versionNonce": 353017961,
			"isDeleted": false,
			"id": "jzcI4llT",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -151.6955566406249,
			"y": -2473.148925781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 74.01991271972656,
			"height": 25,
			"seed": 1572545415,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Deposit",
			"rawText": "Deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 381,
			"versionNonce": 247248551,
			"isDeleted": false,
			"id": "s3YeBj4d",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -166.75193786621082,
			"y": -2428.602050781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.628570556640625,
			"height": 15.804687500000012,
			"seed": 498801319,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 463,
			"versionNonce": 1368173385,
			"isDeleted": false,
			"id": "YODduJ7z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -168.59737485349171,
			"y": -2405.414550781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 107.45249938964844,
			"height": 15.804687500000012,
			"seed": 1156525511,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_history",
			"rawText": "- deposit_history",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_history",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 498,
			"versionNonce": 1532840391,
			"isDeleted": false,
			"id": "O9ORLehH",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -168.52706235349171,
			"y": -2381.406738281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 118.67683410644531,
			"height": 15.804687500000012,
			"seed": 242474215,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_withdraw",
			"rawText": "- deposit_withdraw",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_withdraw",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 284,
			"versionNonce": 189422121,
			"isDeleted": false,
			"id": "GZJ-U5s1tDbApwHtwoJ6R",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -11.847900390624886,
			"y": -2444.789550781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 500541447,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 260,
			"versionNonce": 1757313255,
			"isDeleted": false,
			"id": "7f8pDcSK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 31.984130859375114,
			"y": -2474.305175781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 65.59992980957031,
			"height": 25,
			"seed": 1896943399,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Coupon",
			"rawText": "Coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 371,
			"versionNonce": 1664036105,
			"isDeleted": false,
			"id": "fIjnTAdc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 11.654312133789176,
			"y": -2429.758300781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 311595591,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 431,
			"versionNonce": 208454663,
			"isDeleted": false,
			"id": "4JgrMs1C",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 9.808875146508285,
			"y": -2406.570800781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 188133735,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 463,
			"versionNonce": 1354146793,
			"isDeleted": false,
			"id": "fxrj5P3q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 12.879187646508285,
			"y": -2382.562988281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 340388999,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 512,
			"versionNonce": 912567079,
			"isDeleted": false,
			"id": "wnLYsESE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 11.573295593261832,
			"y": -2359.598144531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 159957927,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 285,
			"versionNonce": 1340882633,
			"isDeleted": false,
			"id": "4RlUi391PvkbukUZZA9Ag",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 174.0310058593751,
			"y": -2448.039550781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 455063239,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 259,
			"versionNonce": 588426823,
			"isDeleted": false,
			"id": "e6Wy1gvu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 217.8630371093751,
			"y": -2477.555175781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 61.67994689941406,
			"height": 25,
			"seed": 1068189159,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Vendor",
			"rawText": "Vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 394,
			"versionNonce": 1332444585,
			"isDeleted": false,
			"id": "AOLBxLOl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 197.53321838378918,
			"y": -2433.008300781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 50.572601318359375,
			"height": 15.804687500000012,
			"seed": 1714942215,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 458,
			"versionNonce": 1297304935,
			"isDeleted": false,
			"id": "fv9iOy7o",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 196.68778139650829,
			"y": -2409.820800781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 110.78950500488281,
			"height": 15.804687500000012,
			"seed": 1749170215,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_business",
			"rawText": "- vendor_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 500,
			"versionNonce": 1583341705,
			"isDeleted": false,
			"id": "OCDgGU40",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 198.75809389650829,
			"y": -2385.812988281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 106.10006713867188,
			"height": 15.804687500000012,
			"seed": 1001823047,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_delivery",
			"rawText": "- vendor_delivery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_delivery",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 535,
			"versionNonce": 544409735,
			"isDeleted": false,
			"id": "4D6MrOCs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 197.45220184326183,
			"y": -2362.848144531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 87.40553283691406,
			"height": 15.804687500000012,
			"seed": 1693555303,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_user",
			"rawText": "- vendor_user",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_user",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 288,
			"versionNonce": 444917609,
			"isDeleted": false,
			"id": "7bqgms4ftg_WOkKa38K5K",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 363.0700683593751,
			"y": -2445.297363281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 683652487,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 253,
			"versionNonce": 1781424039,
			"isDeleted": false,
			"id": "0DpCjq2z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 412.9020996093751,
			"y": -2474.812988281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 54.039947509765625,
			"height": 25,
			"seed": 2120051879,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Order",
			"rawText": "Order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 410,
			"versionNonce": 1579553353,
			"isDeleted": false,
			"id": "tuLG8ltz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 386.5722808837892,
			"y": -2430.543457031252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.72119140625,
			"height": 15.804687500000012,
			"seed": 1098334151,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_master",
			"rawText": "- order_master",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_master",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 458,
			"versionNonce": 212980423,
			"isDeleted": false,
			"id": "Dw4bEX9Z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 384.7268438965083,
			"y": -2407.078613281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 88.32821655273438,
			"height": 15.804687500000012,
			"seed": 606711527,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_goods",
			"rawText": "- order_goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 494,
			"versionNonce": 773775657,
			"isDeleted": false,
			"id": "OG74AmLN",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 387.7971563965083,
			"y": -2383.070800781252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.555419921875,
			"height": 15.804687500000012,
			"seed": 1627470343,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_status",
			"rawText": "- order_status",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_status",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 562,
			"versionNonce": 1889133031,
			"isDeleted": false,
			"id": "EeqWqa2F",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 386.49126434326183,
			"y": -2360.105957031252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 60.065216064453125,
			"height": 15.804687500000012,
			"seed": 754606375,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- payment",
			"rawText": "- payment",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- payment",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 316,
			"versionNonce": 1742394377,
			"isDeleted": false,
			"id": "vvGuwtPDEUScIOX_LhVPs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 552.7380371093751,
			"y": -2446.020019531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1770103879,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 298,
			"versionNonce": 921898247,
			"isDeleted": false,
			"id": "XWptltyP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 598.5700683593751,
			"y": -2475.535644531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 60.17994689941406,
			"height": 25,
			"seed": 376669031,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Goods",
			"rawText": "Goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 425,
			"versionNonce": 794127081,
			"isDeleted": false,
			"id": "mTb8VweA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 576.2402496337892,
			"y": -2430.988769531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 45.908416748046875,
			"height": 15.804687500000012,
			"seed": 68976263,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 488,
			"versionNonce": 725210151,
			"isDeleted": false,
			"id": "zesmpdKY",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 574.3948126465083,
			"y": -2407.801269531252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.23861694335938,
			"height": 15.804687500000012,
			"seed": 1161368999,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods_plan",
			"rawText": "- goods_plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods_plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 543,
			"versionNonce": 488252873,
			"isDeleted": false,
			"id": "A0IRGUlf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 577.4651251465083,
			"y": -2383.793457031252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 35.40460205078125,
			"height": 15.804687500000012,
			"seed": 1626720455,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan",
			"rawText": "- plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 569,
			"versionNonce": 1968879431,
			"isDeleted": false,
			"id": "kzzbEHPV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 576.1592330932618,
			"y": -2360.828613281252,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 99.37556457519531,
			"height": 15.804687500000012,
			"seed": 1156519911,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan_category",
			"rawText": "- plan_category",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan_category",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "freedraw",
			"version": 236,
			"versionNonce": 742687913,
			"isDeleted": false,
			"id": "dDzRLnPm979kfrDgRSMnd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -352.0979003906249,
			"y": -2541.961425781252,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 84.68359375,
			"height": 138.65234375,
			"seed": 1999733511,
			"groupIds": [
				"R7EVToCJJNj58gAClXLgJ"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-0.546875,
					0
				],
				[
					-2.7421875,
					0
				],
				[
					-5.02734375,
					0
				],
				[
					-14.1640625,
					1.01171875
				],
				[
					-20.28515625,
					2.5703125
				],
				[
					-26.40625,
					4.0390625
				],
				[
					-30.2421875,
					5.13671875
				],
				[
					-37.1875,
					7.93359375
				],
				[
					-40.4765625,
					9.58203125
				],
				[
					-43.35546875,
					11.64453125
				],
				[
					-45.82421875,
					14.12109375
				],
				[
					-48.4296875,
					17.19140625
				],
				[
					-51.171875,
					21.3125
				],
				[
					-52.90625,
					24.703125
				],
				[
					-55.3671875,
					32.6640625
				],
				[
					-56.4609375,
					40.34375
				],
				[
					-56.4609375,
					44.46484375
				],
				[
					-56.4609375,
					46.75390625
				],
				[
					-55.03515625,
					49.6015625
				],
				[
					-54.11328125,
					50.5234375
				],
				[
					-52.3671875,
					51.21484375
				],
				[
					-49.6171875,
					51.62890625
				],
				[
					-44.30859375,
					51.62890625
				],
				[
					-35.52734375,
					51.12890625
				],
				[
					-28.66796875,
					50.08203125
				],
				[
					-26.375,
					48.94140625
				],
				[
					-25.8203125,
					48.39453125
				],
				[
					-25.49609375,
					47.48046875
				],
				[
					-25.12890625,
					45.7421875
				],
				[
					-25.12890625,
					41.71875
				],
				[
					-25.12890625,
					38.9765625
				],
				[
					-27.18359375,
					33.49609375
				],
				[
					-29.375,
					29.56640625
				],
				[
					-32.75390625,
					24.76953125
				],
				[
					-37.50390625,
					19.515625
				],
				[
					-41.5234375,
					16.2265625
				],
				[
					-45.63671875,
					13.484375
				],
				[
					-47.921875,
					12.34375
				],
				[
					-51.8515625,
					11.93359375
				],
				[
					-55.96484375,
					11.93359375
				],
				[
					-61.4453125,
					12.34765625
				],
				[
					-66.37890625,
					14.73046875
				],
				[
					-73.82421875,
					19.85546875
				],
				[
					-77.296875,
					23.703125
				],
				[
					-78.84765625,
					26.453125
				],
				[
					-81.72265625,
					33.59375
				],
				[
					-82.6328125,
					38.53515625
				],
				[
					-83.04296875,
					41.83203125
				],
				[
					-83.63671875,
					48.23828125
				],
				[
					-84.2734375,
					55.6484375
				],
				[
					-84.68359375,
					59.5859375
				],
				[
					-84.68359375,
					65.9921875
				],
				[
					-84.68359375,
					70.5703125
				],
				[
					-84.68359375,
					80.453125
				],
				[
					-84.22265625,
					85.03125
				],
				[
					-81.10546875,
					95.375
				],
				[
					-79.1796875,
					100.68359375
				],
				[
					-74.37109375,
					109.1484375
				],
				[
					-73.546875,
					110.796875
				],
				[
					-68.59765625,
					117.94140625
				],
				[
					-61.9609375,
					125.26171875
				],
				[
					-57.61328125,
					128.6484375
				],
				[
					-55.09765625,
					130.66015625
				],
				[
					-46.81640625,
					135.78125
				],
				[
					-45.89453125,
					136.375
				],
				[
					-45.6171875,
					136.6484375
				],
				[
					-45.33984375,
					136.921875
				],
				[
					-43.68359375,
					137.55859375
				],
				[
					-42.58203125,
					138.2890625
				],
				[
					-40.8359375,
					138.65234375
				],
				[
					-40.8359375,
					138.65234375
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "freedraw",
			"version": 191,
			"versionNonce": 196228711,
			"isDeleted": false,
			"id": "5OeoVYj7lT0JLz5DCXgrw",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -395.9689941406249,
			"y": -2426.387207031252,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 20.19921875,
			"height": 38.51953125,
			"seed": 137988647,
			"groupIds": [
				"R7EVToCJJNj58gAClXLgJ"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0.32421875,
					0.64453125
				],
				[
					1.24609375,
					1.56640625
				],
				[
					2.21484375,
					2.85546875
				],
				[
					3.59375,
					4.6015625
				],
				[
					4.65234375,
					6.89453125
				],
				[
					5.7109375,
					8.640625
				],
				[
					6.6796875,
					9.9296875
				],
				[
					8.10546875,
					12.77734375
				],
				[
					9.1640625,
					14.5234375
				],
				[
					9.53125,
					15.90234375
				],
				[
					10.54296875,
					17.64453125
				],
				[
					10.8671875,
					18.92578125
				],
				[
					11.46875,
					19.83984375
				],
				[
					11.46875,
					20.38671875
				],
				[
					11.74609375,
					20.66015625
				],
				[
					11.74609375,
					20.93359375
				],
				[
					12.0234375,
					20.93359375
				],
				[
					12.0234375,
					21.20703125
				],
				[
					10.7890625,
					22.44140625
				],
				[
					7.86328125,
					24.54296875
				],
				[
					3.5234375,
					27.921875
				],
				[
					-0.81640625,
					31.7578125
				],
				[
					-4.2890625,
					34.40625
				],
				[
					-7.21484375,
					36.96484375
				],
				[
					-8.17578125,
					38.24609375
				],
				[
					-8.17578125,
					38.51953125
				],
				[
					-8.17578125,
					38.51953125
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "text",
			"version": 224,
			"versionNonce": 1753221001,
			"isDeleted": false,
			"id": "DOCskEEN",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -350.8479003906249,
			"y": -2564.539550781252,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 181.74790954589844,
			"height": 35,
			"seed": 1156820295,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "\"Task Group\"",
			"rawText": "\"Task Group\"",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "\"Task Group\"",
			"lineHeight": 1.25,
			"baseline": 25
		},
		{
			"type": "rectangle",
			"version": 2270,
			"versionNonce": 1695338887,
			"isDeleted": false,
			"id": "ewwVBNNgVAK_7A2NBSTrK",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 499.4971154679121,
			"y": -2007.364860787051,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 298372103,
			"groupIds": [
				"IjsCSm0U-5iXOllEDN5mO",
				"O8wltBIlYLhpoFOj42ipZ",
				"20byJMyhOE9TUPq7_qTrs"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1635,
			"versionNonce": 1544040041,
			"isDeleted": false,
			"id": "w7rMFmJAi1EuUu4Su0lCr",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 521.2832446957447,
			"y": -1986.158658720925,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 1124053799,
			"groupIds": [
				"c6AwjPuBzIqbyz47SrpZz",
				"O8wltBIlYLhpoFOj42ipZ",
				"20byJMyhOE9TUPq7_qTrs"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1959,
			"versionNonce": 1789331623,
			"isDeleted": false,
			"id": "36LKLrBSClQQIkFR_WoJt",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 532.3631296057853,
			"y": -1968.1565104368192,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 1997321799,
			"groupIds": [
				"UXW0h1C6zReqeyhR_hR0n",
				"c6AwjPuBzIqbyz47SrpZz",
				"O8wltBIlYLhpoFOj42ipZ",
				"20byJMyhOE9TUPq7_qTrs"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 1974,
			"versionNonce": 1034451273,
			"isDeleted": false,
			"id": "zKadO4li7vGAY512yIlGO",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 550.8925719781195,
			"y": -1986.9266564927311,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 617370983,
			"groupIds": [
				"hqHk2oGe9OC7hoAKY69Ui",
				"c6AwjPuBzIqbyz47SrpZz",
				"O8wltBIlYLhpoFOj42ipZ",
				"20byJMyhOE9TUPq7_qTrs"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 2129,
			"versionNonce": 707615687,
			"isDeleted": false,
			"id": "B5Na8kxF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 445.3878479003908,
			"y": -1934.0828931192027,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 175.67987060546875,
			"height": 24,
			"seed": 864751751,
			"groupIds": [
				"20byJMyhOE9TUPq7_qTrs"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 1",
			"rawText": "Python Instance 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 1",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "text",
			"version": 397,
			"versionNonce": 1589405737,
			"isDeleted": false,
			"id": "3C3lWfDa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 187.177978515625,
			"y": -2598.313900596219,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 74.9559326171875,
			"height": 88.23401131849592,
			"seed": 2118199143,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 70.58720905479673,
			"fontFamily": 1,
			"text": "V.1",
			"rawText": "V.1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "V.1",
			"lineHeight": 1.25,
			"baseline": 62
		},
		{
			"type": "arrow",
			"version": 549,
			"versionNonce": 1203522279,
			"isDeleted": false,
			"id": "JqSh6p1ifOP12qSUJEoAj",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 96.61979594983552,
			"y": -1955.1898793918729,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 328.2092365465668,
			"height": 1.7190274182034955,
			"seed": 1223539111,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "g_fHWozuQTJ1yLigYj96E",
				"focus": 0.046187055259002886,
				"gap": 2.93105119513541
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					328.2092365465668,
					-1.7190274182034955
				]
			]
		},
		{
			"type": "text",
			"version": 435,
			"versionNonce": 1496283913,
			"isDeleted": false,
			"id": "hCdGBXRR",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -16.658021224172444,
			"y": -2092.4709729646397,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 59.899932861328125,
			"height": 25,
			"seed": 792842567,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- shop",
			"rawText": "- shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 522,
			"versionNonce": 803231239,
			"isDeleted": false,
			"id": "y4SbDXpZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -17.034940217670623,
			"y": -2058.540051912008,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 88.0198974609375,
			"height": 25,
			"seed": 1839599719,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 491,
			"versionNonce": 2105356777,
			"isDeleted": false,
			"id": "m9Ygn5Wi",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -15.69859153345999,
			"y": -1988.083637438324,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.97991943359375,
			"height": 25,
			"seed": 1333095303,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- coupon",
			"rawText": "- coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 484,
			"versionNonce": 160824615,
			"isDeleted": false,
			"id": "FSvXbJpD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -15.07770337556542,
			"y": -1957.2612690172714,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.01992797851562,
			"height": 25,
			"seed": 1894539943,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 563,
			"versionNonce": 11603145,
			"isDeleted": false,
			"id": "gzUAPQA1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -16.21802560906667,
			"y": -1871.0606111225347,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 68.81993103027344,
			"height": 25,
			"seed": 850884039,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- order",
			"rawText": "- order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 640,
			"versionNonce": 1749663815,
			"isDeleted": false,
			"id": "hjK8Wupv",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -15.606781407406402,
			"y": -1839.2185058593766,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 72.63992309570312,
			"height": 25,
			"seed": 737354983,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "jLb9n14oII7NXyXPkCRKc",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "line",
			"version": 386,
			"versionNonce": 1785105321,
			"isDeleted": false,
			"id": "NJKKq-5CyKHIZ3brU8pqf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 236.85699784128292,
			"y": -1948.9355597245083,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1.513671875,
			"height": 263.15275493421063,
			"seed": 1546383367,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.513671875,
					263.15275493421063
				]
			]
		},
		{
			"type": "text",
			"version": 982,
			"versionNonce": 1037573991,
			"isDeleted": false,
			"id": "ZjUzA7jf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 30.21728691990768,
			"y": -1644.4441129607699,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 457.13958740234375,
			"height": 100,
			"seed": 492721959,
			"groupIds": [
				"bqyLDW85znYvKFB0Jfa4j"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "ssh ec2-user@172.9.0.13 /opt/python/fs_etl.py\n    -- task order\n    -- start_dt 2023_09_01_1230\n    -- update_dt 2023_09_30_2359",
			"rawText": "ssh ec2-user@172.9.0.13 /opt/python/fs_etl.py\n    -- task order\n    -- start_dt 2023_09_01_1230\n    -- update_dt 2023_09_30_2359",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "ssh ec2-user@172.9.0.13 /opt/python/fs_etl.py\n    -- task order\n    -- start_dt 2023_09_01_1230\n    -- update_dt 2023_09_30_2359",
			"lineHeight": 1.25,
			"baseline": 93
		},
		{
			"type": "rectangle",
			"version": 704,
			"versionNonce": 1120480905,
			"isDeleted": false,
			"id": "LJA59F-6kfebtyDlvFq3Q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 4.921594074512996,
			"y": -1673.909316496954,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 496.0269661592712,
			"height": 181.71391253869973,
			"seed": 1442241095,
			"groupIds": [
				"bqyLDW85znYvKFB0Jfa4j"
			],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 398,
			"versionNonce": 210606727,
			"isDeleted": false,
			"id": "U6BtoVEe",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 164.24584831550146,
			"y": -2020.2286094481215,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 138.97671508789062,
			"height": 54.99461549550163,
			"seed": 1253751657,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 21.99784619820065,
			"fontFamily": 1,
			"text": "Airflow\nssh operator",
			"rawText": "Airflow\nssh operator",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Airflow\nssh operator",
			"lineHeight": 1.25,
			"baseline": 47
		},
		{
			"type": "arrow",
			"version": 624,
			"versionNonce": 9729385,
			"isDeleted": false,
			"id": "0ufONsrol1AKy9JM9s1s-",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 107.5596635586906,
			"y": -2072.695166401087,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 323.5363849840668,
			"height": 56.674527269296505,
			"seed": 124196489,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "meRWTeod_squJmDTYnw0i",
				"focus": -0.46278340636029885,
				"gap": 15.289792485476767
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					323.5363849840668,
					56.674527269296505
				]
			]
		},
		{
			"type": "arrow",
			"version": 643,
			"versionNonce": 1495708071,
			"isDeleted": false,
			"id": "MVH3pnboNdOd8InNb9lcz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 103.8389604336906,
			"y": -1841.9773929635871,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 320.2502521715668,
			"height": 66.2209805432035,
			"seed": 1869336935,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "qUZnZlBUCGocV1jHUH57n",
				"focus": 0.31432555400784307,
				"gap": 9.921605558680596
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					320.2502521715668,
					-66.2209805432035
				]
			]
		},
		{
			"type": "rectangle",
			"version": 881,
			"versionNonce": 924049481,
			"isDeleted": false,
			"id": "UZQCLnxZ-2t4HjbuOBHqj",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -382.60127342600106,
			"y": 648.739616103212,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 554.9067080593737,
			"height": 447.58359035579053,
			"seed": 1664726567,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2138,
			"versionNonce": 1557128391,
			"isDeleted": false,
			"id": "7Vrh2H4ZxAMPp0Psohn5F",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -319.2955364055964,
			"y": 589.5382317429444,
			"strokeColor": "turquoise",
			"backgroundColor": "turquoise",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 655251783,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1963,
			"versionNonce": 69398313,
			"isDeleted": false,
			"id": "eC_aGSE2kM_l6EcgEsjHf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -329.91423743687767,
			"y": 603.1037475272478,
			"strokeColor": "aqua",
			"backgroundColor": "aqua",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 1252104295,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2322,
			"versionNonce": 1998959591,
			"isDeleted": false,
			"id": "Glv1K163KerZ_HIzCEGBd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -345.8280328793534,
			"y": 586.9496990783032,
			"strokeColor": "red",
			"backgroundColor": "red",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 331346823,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2183,
			"versionNonce": 1043145225,
			"isDeleted": false,
			"id": "luzNdKRGs0QXlIJ7rdkRx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -334.1734782550051,
			"y": 586.2804938644917,
			"strokeColor": "salmon",
			"backgroundColor": "salmon",
			"width": 19.090763219686202,
			"height": 10.920680508629188,
			"seed": 1520822951,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.247032861929438,
					5.414223509566554
				],
				[
					7.80069096616502,
					9.655793097762178
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.2700879407222723
				],
				[
					17.409206394840286,
					1.7137171824230046
				],
				[
					12.349656751372345,
					2.271356548532129
				],
				[
					5.08675110820378,
					0.625643650550335
				],
				[
					0.013602600172775085,
					-1.26488741086701
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2259,
			"versionNonce": 1614061319,
			"isDeleted": false,
			"id": "U6O8TP07xWGgapqKcWiZZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -348.21959226540764,
			"y": 613.3793801904899,
			"strokeColor": "#228be6",
			"backgroundColor": "#228be6",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1006632391,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2081,
			"versionNonce": 1647180009,
			"isDeleted": false,
			"id": "1-OVSTXekBp3YFXYsTU1g",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -350.7262843523407,
			"y": 590.6135286360873,
			"strokeColor": "lightblue",
			"backgroundColor": "lightblue",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 183151847,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2233,
			"versionNonce": 444147239,
			"isDeleted": false,
			"id": "8GD5vqxxO1MBi0xaERBx8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -321.81535573522103,
			"y": 615.9858427099321,
			"strokeColor": "green",
			"backgroundColor": "green",
			"width": 26.626032756145793,
			"height": 31.683786732555944,
			"seed": 49444871,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245173
				],
				[
					-2.048210553853881,
					5.466507876823853
				],
				[
					-5.656165483542917,
					8.491751647064286
				],
				[
					-10.052266425009464,
					11.126683806841765
				],
				[
					-10.006359309336936,
					12.356339945392238
				],
				[
					-4.093510626546925,
					14.592608482820363
				],
				[
					2.8736090261096536,
					15.831570229232076
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732269
				],
				[
					16.146625249157346,
					-5.0410819524881925
				],
				[
					16.57376633113633,
					-14.47177307413826
				],
				[
					15.460041218424415,
					-15.852216503323866
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2059,
			"versionNonce": 1102115785,
			"isDeleted": false,
			"id": "nPvhtHo_WSu-zHzgBCODL",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -346.50739022236587,
			"y": 607.181555881441,
			"strokeColor": "lightgreen",
			"backgroundColor": "lightgreen",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 974380839,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1230,
			"versionNonce": 618645831,
			"isDeleted": false,
			"id": "8Q2ZRSaDuNdshjHkzTpzO",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -332.00810303375386,
			"y": 600.0993768127955,
			"strokeColor": "#000000",
			"backgroundColor": "black",
			"width": 2.4664671675253453,
			"height": 2.4664671675253453,
			"seed": 1388012103,
			"groupIds": [
				"gjpQUI4SZQQ8u-uiqVzCj",
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1221,
			"versionNonce": 1892782761,
			"isDeleted": false,
			"id": "N1wr8o6x",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -296.39909611446285,
			"y": 580.2285066829863,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 41.3492431640625,
			"height": 15.66025242037268,
			"seed": 1841660263,
			"groupIds": [
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.311733971712764,
			"fontFamily": 1,
			"text": "Apache",
			"rawText": "Apache",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Apache",
			"lineHeight": 1.2719778104654809,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 1175,
			"versionNonce": 1824852071,
			"isDeleted": false,
			"id": "ctdat0vu",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -300.93558337610136,
			"y": 592.958015944409,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 83.15940856933594,
			"height": 32.80021373085932,
			"seed": 1551809671,
			"groupIds": [
				"sa02KDsC7xb6YoNM6tAw9"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 25.854479605079288,
			"fontFamily": 1,
			"text": "Airflow",
			"rawText": "Airflow",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Airflow",
			"lineHeight": 1.2686472221400076,
			"baseline": 23
		},
		{
			"type": "rectangle",
			"version": 618,
			"versionNonce": 1950045577,
			"isDeleted": false,
			"id": "M8p6Op6TYk7qP13e280I0",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -356.2850174163856,
			"y": 662.9714370166739,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 190.09014423076923,
			"height": 143.7079326923078,
			"seed": 312710055,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "BFPRkmrE"
				},
				{
					"id": "jp5lvCfU-bstmUaKZ6e44",
					"type": "arrow"
				},
				{
					"id": "4Yq_m3Qe5GR1ey9jQOQxs",
					"type": "arrow"
				},
				{
					"id": "X8Qxj7o4ys_FqtZ80eCF3",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 545,
			"versionNonce": 2146788231,
			"isDeleted": false,
			"id": "BFPRkmrE",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -309.4498986091064,
			"y": 697.3254033628278,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.41990661621094,
			"height": 75,
			"seed": 1482720967,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Scheduler\n&\nWebserver",
			"rawText": "Scheduler\n&\nWebserver",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "M8p6Op6TYk7qP13e280I0",
			"originalText": "Scheduler\n&\nWebserver",
			"lineHeight": 1.25,
			"baseline": 68
		},
		{
			"type": "line",
			"version": 6512,
			"versionNonce": 791264361,
			"isDeleted": false,
			"id": "--YPIzOkr-qCg8PdHcLWT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -306.0297711264217,
			"y": 867.4744296971105,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 75.01121630306868,
			"height": 96.81388324216654,
			"seed": 1012012519,
			"groupIds": [
				"1Rljsd4BUTwAZeX3xcbWz",
				"BWFPUC7jHX9TtobhVdG45",
				"Be9_1FPOOZ37GGptaMly4"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.24734846976242794,
					73.1714082159101
				],
				[
					0.011575327725072006,
					81.50165529728328
				],
				[
					3.8632435379119165,
					85.10105205208878
				],
				[
					17.276485894102954,
					88.14730719194147
				],
				[
					39.948665011120255,
					89.0958655364321
				],
				[
					61.61043288740646,
					87.58135319133916
				],
				[
					73.11948965218787,
					83.95942431004657
				],
				[
					74.74268637210398,
					80.90610026776591
				],
				[
					74.9706584753909,
					74.19947908967055
				],
				[
					74.79172688269483,
					6.138672737165569
				],
				[
					74.38835763792527,
					-0.2918194398554754
				],
				[
					69.57188081608908,
					-3.885863818744892
				],
				[
					59.42940850758881,
					-5.967344146345569
				],
				[
					36.31608449133351,
					-7.7180177057344235
				],
				[
					17.785060590062127,
					-6.674087120295436
				],
				[
					3.210536142559118,
					-3.1332019499277424
				],
				[
					-0.04055782767777212,
					-0.04396604849106378
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 7235,
			"versionNonce": 2125290151,
			"isDeleted": false,
			"id": "EkW62VoJuZIcr0EXx0p9M",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -305.7638385357378,
			"y": 858.7214615410824,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 74.53008207714048,
			"height": 15.073148387271289,
			"seed": 1166328071,
			"groupIds": [
				"1Rljsd4BUTwAZeX3xcbWz",
				"BWFPUC7jHX9TtobhVdG45",
				"Be9_1FPOOZ37GGptaMly4"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "4Yq_m3Qe5GR1ey9jQOQxs",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 502,
			"versionNonce": 292046665,
			"isDeleted": false,
			"id": "RF_negEa5OEHW5aDL9ZKf",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -337.3485373703119,
			"y": 1006.9705141180407,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 134.96394230769238,
			"height": 69.89783653846155,
			"seed": 1702168615,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "9jUvvrQU"
				},
				{
					"id": "BhfdRwJWpQOpQpsYigOyA",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 480,
			"versionNonce": 1301900743,
			"isDeleted": false,
			"id": "9jUvvrQU",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -297.5465512628524,
			"y": 1029.4194323872714,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.35997009277344,
			"height": 25,
			"seed": 705653575,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "DAGs",
			"rawText": "DAGs",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "RF_negEa5OEHW5aDL9ZKf",
			"originalText": "DAGs",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1117,
			"versionNonce": 512120682,
			"isDeleted": false,
			"id": "BhfdRwJWpQOpQpsYigOyA",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -266.8924173582094,
			"y": 983.6933724327005,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18158320550963936,
			"height": 16.746317882257472,
			"seed": 800090727,
			"groupIds": [
				"o1NG11f4ciMQufTIrC5vE"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864120,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "RF_negEa5OEHW5aDL9ZKf",
				"gap": 6.53082380308274,
				"focus": 0.05313077986793611
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.18158320550963936,
					16.746317882257472
				]
			]
		},
		{
			"type": "arrow",
			"version": 836,
			"versionNonce": 131472615,
			"isDeleted": false,
			"id": "ezs7YdxVYQB-639ezNIYy",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -266.90937338390484,
			"y": 983.5997432640174,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341078562,
			"height": 17.722798727512895,
			"seed": 1394902407,
			"groupIds": [
				"o1NG11f4ciMQufTIrC5vE"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341078562,
					-17.722798727512895
				]
			]
		},
		{
			"type": "diamond",
			"version": 1265,
			"versionNonce": 500418825,
			"isDeleted": false,
			"id": "cTJdtrxUR81UhV1sTXz47",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -212.6154777056687,
			"y": 898.598302753677,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 598228135,
			"groupIds": [
				"ygmEDnWP2rF_ar2q1u-Xc",
				"JMtjwzGJTQGVvJsZwcC_a"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1307,
			"versionNonce": 821028871,
			"isDeleted": false,
			"id": "mFvYlvJ-5QlQSZfJZ0ydH",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -212.6154777056687,
			"y": 889.7265228254184,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 350752711,
			"groupIds": [
				"ygmEDnWP2rF_ar2q1u-Xc",
				"JMtjwzGJTQGVvJsZwcC_a"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "RC-I__bM_95iupD0D8Y_a",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1393,
			"versionNonce": 73908201,
			"isDeleted": false,
			"id": "SAjRq3KhvOx3RuZEnaSRT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -212.6154777056687,
			"y": 877.0959632307065,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1895857895,
			"groupIds": [
				"ygmEDnWP2rF_ar2q1u-Xc",
				"JMtjwzGJTQGVvJsZwcC_a"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "RC-I__bM_95iupD0D8Y_a",
					"type": "arrow"
				},
				{
					"id": "Ig0wo_Fkqat7L53pDqk9G",
					"type": "arrow"
				},
				{
					"id": "6M6v9_QJ5DPlMi5GIhPTc",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1446,
			"versionNonce": 652431143,
			"isDeleted": false,
			"id": "KgWUhJlxjazROSTs5RW1p",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -212.6154777056687,
			"y": 864.5642909334092,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 176032263,
			"groupIds": [
				"ygmEDnWP2rF_ar2q1u-Xc",
				"JMtjwzGJTQGVvJsZwcC_a"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "KJj0KvTVXu1H8qoNZLrR3",
					"type": "arrow"
				},
				{
					"id": "RC-I__bM_95iupD0D8Y_a",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 613,
			"versionNonce": 656005833,
			"isDeleted": false,
			"id": "jeHm41d3",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -181.10976914513924,
			"y": 871.3920938914259,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 51.11994934082031,
			"height": 25,
			"seed": 777859367,
			"groupIds": [
				"JMtjwzGJTQGVvJsZwcC_a"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "Ig0wo_Fkqat7L53pDqk9G",
					"type": "arrow"
				},
				{
					"id": "KJj0KvTVXu1H8qoNZLrR3",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Redis",
			"rawText": "Redis",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Redis",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1552,
			"versionNonce": 1371855978,
			"isDeleted": false,
			"id": "jp5lvCfU-bstmUaKZ6e44",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -212.22295863430088,
			"y": 818.4952251695745,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2555306941908668,
			"height": 23.566046328897983,
			"seed": 1443525703,
			"groupIds": [
				"Ropb7sZxKW-UcpChpFPo1"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864119,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "M8p6Op6TYk7qP13e280I0",
				"gap": 13.81025238599068,
				"focus": 0.1035480376781431
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.2555306941908668,
					23.566046328897983
				]
			]
		},
		{
			"type": "arrow",
			"version": 1513,
			"versionNonce": 646289833,
			"isDeleted": false,
			"id": "KJj0KvTVXu1H8qoNZLrR3",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -198.35202725818556,
			"y": 862.9898142819245,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2840418715895313,
			"height": 24.940186781763522,
			"seed": 425874279,
			"groupIds": [
				"Ropb7sZxKW-UcpChpFPo1"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "jeHm41d3",
				"focus": -0.6053918351334293,
				"gap": 10.516697553496101
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.2840418715895313,
					-24.940186781763522
				]
			]
		},
		{
			"type": "rectangle",
			"version": 653,
			"versionNonce": 561574247,
			"isDeleted": false,
			"id": "Ir9VPWYqMm7tOnL_PYcpe",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -28.236922735295252,
			"y": 713.9688434928667,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 164.12306810890618,
			"height": 345.2139841463238,
			"seed": 1622232711,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "RC-I__bM_95iupD0D8Y_a",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 615,
			"versionNonce": 64388233,
			"isDeleted": false,
			"id": "CrEIWCfx",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 24.82464183673585,
			"y": 680.8401699490419,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 57.99993896484375,
			"height": 25,
			"seed": 1454630311,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Celery",
			"rawText": "Celery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Celery",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1557,
			"versionNonce": 675556487,
			"isDeleted": false,
			"id": "RC-I__bM_95iupD0D8Y_a",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -96.43751778115359,
			"y": 898.327529918427,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.61060860972839,
			"height": 99.21676970494727,
			"seed": 446077127,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "KgWUhJlxjazROSTs5RW1p",
				"focus": 1.289993537315494,
				"gap": 15.713008798042914
			},
			"endBinding": {
				"elementId": "hN8KatEMqKIVaCcg6nfn-",
				"focus": 0.5725170004071704,
				"gap": 6.573683044425707
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					82.61060860972839,
					-99.21676970494727
				]
			]
		},
		{
			"type": "arrow",
			"version": 1285,
			"versionNonce": 247989097,
			"isDeleted": false,
			"id": "Ig0wo_Fkqat7L53pDqk9G",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -98.1158602410934,
			"y": 903.0400323608831,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 83.24860871393275,
			"height": 0.3810062462142696,
			"seed": 838199271,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "SAjRq3KhvOx3RuZEnaSRT",
				"focus": 0.42550273099081265,
				"gap": 7.759040314649226
			},
			"endBinding": {
				"elementId": "2R2bWSaU83l86JEbmom4c",
				"focus": -0.34798041451485184,
				"gap": 9.032899081647429
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					83.24860871393275,
					-0.3810062462142696
				]
			]
		},
		{
			"type": "arrow",
			"version": 1443,
			"versionNonce": 607847335,
			"isDeleted": false,
			"id": "6M6v9_QJ5DPlMi5GIhPTc",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -98.72782613911443,
			"y": 908.2209425304834,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 89.28200057698177,
			"height": 98.53147271835927,
			"seed": 987648775,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "SAjRq3KhvOx3RuZEnaSRT",
				"focus": -0.8170895935619735,
				"gap": 12.494251014540328
			},
			"endBinding": {
				"elementId": "f5PjCcnd",
				"focus": -0.8560968029210516,
				"gap": 15.558312258412002
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					89.28200057698177,
					98.53147271835927
				]
			]
		},
		{
			"type": "arrow",
			"version": 1568,
			"versionNonce": 789858794,
			"isDeleted": false,
			"id": "4Yq_m3Qe5GR1ey9jQOQxs",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -268.029168593225,
			"y": 836.3162092446291,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18160937014056344,
			"height": 16.748730887514284,
			"seed": 1573673511,
			"groupIds": [
				"hfAu9F9kb2QKHFs5a-Inm"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864119,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "M8p6Op6TYk7qP13e280I0",
				"gap": 29.63683953564737,
				"focus": 0.08233521180677529
			},
			"endBinding": {
				"elementId": "EkW62VoJuZIcr0EXx0p9M",
				"gap": 5.658040171052239,
				"focus": 0.021314651672631767
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.18160937014056344,
					16.748730887514284
				]
			]
		},
		{
			"type": "arrow",
			"version": 1285,
			"versionNonce": 713522346,
			"isDeleted": false,
			"id": "X8Qxj7o4ys_FqtZ80eCF3",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -268.04612461892043,
			"y": 836.2225800759461,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341072877,
			"height": 17.722798727513094,
			"seed": 2142010695,
			"groupIds": [
				"hfAu9F9kb2QKHFs5a-Inm"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864119,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "M8p6Op6TYk7qP13e280I0",
				"gap": 29.54321036696433,
				"focus": 0.08304507274777759
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341072877,
					-17.722798727513094
				]
			]
		},
		{
			"type": "rectangle",
			"version": 690,
			"versionNonce": 1229651241,
			"isDeleted": false,
			"id": "hN8KatEMqKIVaCcg6nfn-",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -7.253226126999493,
			"y": 742.4145420651485,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 82.7041936917846,
			"seed": 870005863,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "RC-I__bM_95iupD0D8Y_a",
					"type": "arrow"
				},
				{
					"id": "g8gQQ7Qb3AmIGUxebGMd7",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 678,
			"versionNonce": 47023591,
			"isDeleted": false,
			"id": "2R2bWSaU83l86JEbmom4c",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -5.834352445513218,
			"y": 851.2912591799795,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 1847924615,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "Ig0wo_Fkqat7L53pDqk9G",
					"type": "arrow"
				},
				{
					"id": "vXYjmbvtqMADFBD6pEwq8",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 700,
			"versionNonce": 2133028873,
			"isDeleted": false,
			"id": "6ofGfKNh6DBwcYpbghzcg",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -5.605742325203323,
			"y": 964.6967882091569,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 1959169703,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "6M6v9_QJ5DPlMi5GIhPTc",
					"type": "arrow"
				},
				{
					"id": "amExfYSXqluQb27pKwIDd",
					"type": "arrow"
				}
			],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 662,
			"versionNonce": 185741575,
			"isDeleted": false,
			"id": "0Dff7LHB",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 16.713106074725033,
			"y": 718.3822064506298,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 76.5599365234375,
			"height": 25,
			"seed": 309076423,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 1",
			"rawText": "worker 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 1",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 715,
			"versionNonce": 187336425,
			"isDeleted": false,
			"id": "GSWFF8bY",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 15.88563879170249,
			"y": 827.488871260944,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 85.37992858886719,
			"height": 25,
			"seed": 137515239,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 2",
			"rawText": "worker 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 2",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 752,
			"versionNonce": 2010413095,
			"isDeleted": false,
			"id": "Mno7S4Gm",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 12.583904863966495,
			"y": 943.9160297063863,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 84.75993347167969,
			"height": 25,
			"seed": 1067817991,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 3",
			"rawText": "worker 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 3",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "rectangle",
			"version": 438,
			"versionNonce": 2011939273,
			"isDeleted": false,
			"id": "dQMGtDjZ6RkxqJg6jJL0h",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -376.62863228693925,
			"y": 359.10654285659257,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1152.91796875,
			"height": 187.7109375,
			"seed": 1019380519,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 406,
			"versionNonce": 520149831,
			"isDeleted": false,
			"id": "wpuf-_YKj5oabbmcwJ5HU",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 333.60574271306086,
			"y": 647.0987303565926,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 440.546875,
			"height": 445.98437499999994,
			"seed": 1341490759,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 351,
			"versionNonce": 1921163433,
			"isDeleted": false,
			"id": "NuxhdiZrNlV0bHAmQqbbb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -348.67160103693925,
			"y": 403.21518543471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1686102151,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 311,
			"versionNonce": 1693702759,
			"isDeleted": false,
			"id": "Mk11hVv9",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -298.83956978693925,
			"y": 373.69956043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 42.979949951171875,
			"height": 25,
			"seed": 1189099431,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Shop",
			"rawText": "Shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 438,
			"versionNonce": 2023400329,
			"isDeleted": false,
			"id": "38moTGln",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -325.1693885125252,
			"y": 418.24643543471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 627616455,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 498,
			"versionNonce": 1853486471,
			"isDeleted": false,
			"id": "uZu26E2n",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -327.01482549980585,
			"y": 441.43393543471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 2092284391,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954100,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 530,
			"versionNonce": 1181698665,
			"isDeleted": false,
			"id": "v8aDELog",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -323.94451299980585,
			"y": 465.44174793471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 30663943,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 579,
			"versionNonce": 315600039,
			"isDeleted": false,
			"id": "KkxnptHA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -325.25040505305253,
			"y": 488.40659168471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 339717159,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 399,
			"versionNonce": 80483657,
			"isDeleted": false,
			"id": "WoMZi5h_WZvdCOVCuesfv",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -168.53488228693914,
			"y": 402.07456043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1877315399,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 378,
			"versionNonce": 228687815,
			"isDeleted": false,
			"id": "1SCCoEPm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -129.97628853693914,
			"y": 372.55893543471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 74.01991271972656,
			"height": 25,
			"seed": 522325607,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Deposit",
			"rawText": "Deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 493,
			"versionNonce": 923567145,
			"isDeleted": false,
			"id": "buFnkWyz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -145.03266976252507,
			"y": 417.10581043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.628570556640625,
			"height": 15.804687500000012,
			"seed": 750889351,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 575,
			"versionNonce": 1896607463,
			"isDeleted": false,
			"id": "ih5HKbWz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -146.87810674980597,
			"y": 440.29331043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 107.45249938964844,
			"height": 15.804687500000012,
			"seed": 369156263,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_history",
			"rawText": "- deposit_history",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_history",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 610,
			"versionNonce": 1763448585,
			"isDeleted": false,
			"id": "QnRSDkX1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -146.80779424980597,
			"y": 464.30112293471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 118.67683410644531,
			"height": 15.804687500000012,
			"seed": 2089563079,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_withdraw",
			"rawText": "- deposit_withdraw",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_withdraw",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 396,
			"versionNonce": 1469807111,
			"isDeleted": false,
			"id": "ZgsIBxy2pYyW9solIfYiS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 9.871367713060863,
			"y": 400.91831043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 411050727,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 372,
			"versionNonce": 494292457,
			"isDeleted": false,
			"id": "K9HTjw7l",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 53.70339896306086,
			"y": 371.40268543471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 65.59992980957031,
			"height": 25,
			"seed": 1785277959,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Coupon",
			"rawText": "Coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 483,
			"versionNonce": 1447862567,
			"isDeleted": false,
			"id": "muLc0D0w",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 33.373580237474926,
			"y": 415.94956043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 759420199,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 543,
			"versionNonce": 2066131145,
			"isDeleted": false,
			"id": "F3fwaYxI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 31.528143250194034,
			"y": 439.13706043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 142383175,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 575,
			"versionNonce": 780919879,
			"isDeleted": false,
			"id": "BwgJ7Wdm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 34.598455750194034,
			"y": 463.14487293471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 32503655,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 624,
			"versionNonce": 1003005865,
			"isDeleted": false,
			"id": "XETcvd2T",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 33.29256369694758,
			"y": 486.10971668471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 803893895,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 397,
			"versionNonce": 1077265255,
			"isDeleted": false,
			"id": "pX2xSj_CXJrb0qoNk0lto",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 195.75027396306086,
			"y": 397.66831043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 724076967,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 371,
			"versionNonce": 1502071433,
			"isDeleted": false,
			"id": "NY8Bgepi",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 239.58230521306086,
			"y": 368.15268543471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 61.67994689941406,
			"height": 25,
			"seed": 1087814855,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Vendor",
			"rawText": "Vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 506,
			"versionNonce": 999734919,
			"isDeleted": false,
			"id": "i6oGByZo",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 219.25248648747493,
			"y": 412.69956043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 50.572601318359375,
			"height": 15.804687500000012,
			"seed": 1687260135,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 570,
			"versionNonce": 2099220841,
			"isDeleted": false,
			"id": "BGMoPPUD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 218.40704950019403,
			"y": 435.88706043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 110.78950500488281,
			"height": 15.804687500000012,
			"seed": 1650816775,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_business",
			"rawText": "- vendor_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 612,
			"versionNonce": 325801383,
			"isDeleted": false,
			"id": "E1dW8hmX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 220.47736200019403,
			"y": 459.89487293471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 106.10006713867188,
			"height": 15.804687500000012,
			"seed": 1355742759,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_delivery",
			"rawText": "- vendor_delivery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_delivery",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 647,
			"versionNonce": 735804489,
			"isDeleted": false,
			"id": "xSexn828",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 219.17146994694758,
			"y": 482.85971668471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 87.40553283691406,
			"height": 15.804687500000012,
			"seed": 1119527239,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_user",
			"rawText": "- vendor_user",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_user",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 400,
			"versionNonce": 786434247,
			"isDeleted": false,
			"id": "w4tJnr7ZKrfjyNE_ENiwR",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 384.78933646306086,
			"y": 400.41049793471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 965009511,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 365,
			"versionNonce": 899091241,
			"isDeleted": false,
			"id": "cMNowQHB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 434.62136771306086,
			"y": 370.89487293471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 54.039947509765625,
			"height": 25,
			"seed": 1459239815,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Order",
			"rawText": "Order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 522,
			"versionNonce": 1536251879,
			"isDeleted": false,
			"id": "MvDe4RBs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 408.2915489874749,
			"y": 415.16440418471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.72119140625,
			"height": 15.804687500000012,
			"seed": 1331114663,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_master",
			"rawText": "- order_master",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_master",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 570,
			"versionNonce": 1656602121,
			"isDeleted": false,
			"id": "VRZacIKc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 406.44611200019403,
			"y": 438.62924793471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 88.32821655273438,
			"height": 15.804687500000012,
			"seed": 457721287,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_goods",
			"rawText": "- order_goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 606,
			"versionNonce": 2139865863,
			"isDeleted": false,
			"id": "c3Ki7C3v",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 409.51642450019403,
			"y": 462.63706043471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.555419921875,
			"height": 15.804687500000012,
			"seed": 1776940263,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_status",
			"rawText": "- order_status",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_status",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 674,
			"versionNonce": 1649087721,
			"isDeleted": false,
			"id": "XAGpjgEf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 408.2105324469476,
			"y": 485.60190418471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 60.065216064453125,
			"height": 15.804687500000012,
			"seed": 1388888071,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- payment",
			"rawText": "- payment",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- payment",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 428,
			"versionNonce": 189516327,
			"isDeleted": false,
			"id": "ycgd_9oMQsePJBFtF0asA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 574.4573052130609,
			"y": 399.68784168471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1205937959,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 410,
			"versionNonce": 2009763785,
			"isDeleted": false,
			"id": "PqFtmTzB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 620.2893364630609,
			"y": 370.17221668471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 60.17994689941406,
			"height": 25,
			"seed": 1201646151,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Goods",
			"rawText": "Goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 537,
			"versionNonce": 733867335,
			"isDeleted": false,
			"id": "lTgb3D38",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 597.9595177374749,
			"y": 414.71909168471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 45.908416748046875,
			"height": 15.804687500000012,
			"seed": 1323354471,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 600,
			"versionNonce": 1767354025,
			"isDeleted": false,
			"id": "jUQt9A0u",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 596.114080750194,
			"y": 437.90659168471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.23861694335938,
			"height": 15.804687500000012,
			"seed": 183567495,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods_plan",
			"rawText": "- goods_plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods_plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 655,
			"versionNonce": 1010740327,
			"isDeleted": false,
			"id": "yLuyHdPp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 599.184393250194,
			"y": 461.91440418471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 35.40460205078125,
			"height": 15.804687500000012,
			"seed": 1267522471,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan",
			"rawText": "- plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 681,
			"versionNonce": 765325705,
			"isDeleted": false,
			"id": "opUGTR3q",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 597.8785011969476,
			"y": 484.87924793471757,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 99.37556457519531,
			"height": 15.804687500000012,
			"seed": 887148231,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan_category",
			"rawText": "- plan_category",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan_category",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "freedraw",
			"version": 348,
			"versionNonce": 2023393159,
			"isDeleted": false,
			"id": "QoEsMSvJp9Mi0t0Vz0dII",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -330.37863228693925,
			"y": 303.74643543471757,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 84.68359375,
			"height": 138.65234375,
			"seed": 831086055,
			"groupIds": [
				"Q5hzWsVi_SsHh_eA7NU9Y"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-0.546875,
					0
				],
				[
					-2.7421875,
					0
				],
				[
					-5.02734375,
					0
				],
				[
					-14.1640625,
					1.01171875
				],
				[
					-20.28515625,
					2.5703125
				],
				[
					-26.40625,
					4.0390625
				],
				[
					-30.2421875,
					5.13671875
				],
				[
					-37.1875,
					7.93359375
				],
				[
					-40.4765625,
					9.58203125
				],
				[
					-43.35546875,
					11.64453125
				],
				[
					-45.82421875,
					14.12109375
				],
				[
					-48.4296875,
					17.19140625
				],
				[
					-51.171875,
					21.3125
				],
				[
					-52.90625,
					24.703125
				],
				[
					-55.3671875,
					32.6640625
				],
				[
					-56.4609375,
					40.34375
				],
				[
					-56.4609375,
					44.46484375
				],
				[
					-56.4609375,
					46.75390625
				],
				[
					-55.03515625,
					49.6015625
				],
				[
					-54.11328125,
					50.5234375
				],
				[
					-52.3671875,
					51.21484375
				],
				[
					-49.6171875,
					51.62890625
				],
				[
					-44.30859375,
					51.62890625
				],
				[
					-35.52734375,
					51.12890625
				],
				[
					-28.66796875,
					50.08203125
				],
				[
					-26.375,
					48.94140625
				],
				[
					-25.8203125,
					48.39453125
				],
				[
					-25.49609375,
					47.48046875
				],
				[
					-25.12890625,
					45.7421875
				],
				[
					-25.12890625,
					41.71875
				],
				[
					-25.12890625,
					38.9765625
				],
				[
					-27.18359375,
					33.49609375
				],
				[
					-29.375,
					29.56640625
				],
				[
					-32.75390625,
					24.76953125
				],
				[
					-37.50390625,
					19.515625
				],
				[
					-41.5234375,
					16.2265625
				],
				[
					-45.63671875,
					13.484375
				],
				[
					-47.921875,
					12.34375
				],
				[
					-51.8515625,
					11.93359375
				],
				[
					-55.96484375,
					11.93359375
				],
				[
					-61.4453125,
					12.34765625
				],
				[
					-66.37890625,
					14.73046875
				],
				[
					-73.82421875,
					19.85546875
				],
				[
					-77.296875,
					23.703125
				],
				[
					-78.84765625,
					26.453125
				],
				[
					-81.72265625,
					33.59375
				],
				[
					-82.6328125,
					38.53515625
				],
				[
					-83.04296875,
					41.83203125
				],
				[
					-83.63671875,
					48.23828125
				],
				[
					-84.2734375,
					55.6484375
				],
				[
					-84.68359375,
					59.5859375
				],
				[
					-84.68359375,
					65.9921875
				],
				[
					-84.68359375,
					70.5703125
				],
				[
					-84.68359375,
					80.453125
				],
				[
					-84.22265625,
					85.03125
				],
				[
					-81.10546875,
					95.375
				],
				[
					-79.1796875,
					100.68359375
				],
				[
					-74.37109375,
					109.1484375
				],
				[
					-73.546875,
					110.796875
				],
				[
					-68.59765625,
					117.94140625
				],
				[
					-61.9609375,
					125.26171875
				],
				[
					-57.61328125,
					128.6484375
				],
				[
					-55.09765625,
					130.66015625
				],
				[
					-46.81640625,
					135.78125
				],
				[
					-45.89453125,
					136.375
				],
				[
					-45.6171875,
					136.6484375
				],
				[
					-45.33984375,
					136.921875
				],
				[
					-43.68359375,
					137.55859375
				],
				[
					-42.58203125,
					138.2890625
				],
				[
					-40.8359375,
					138.65234375
				],
				[
					-40.8359375,
					138.65234375
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "freedraw",
			"version": 303,
			"versionNonce": 1507383401,
			"isDeleted": false,
			"id": "VlTonFmuXVdx_joTzCGbj",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -374.24972603693925,
			"y": 419.32065418471757,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 20.19921875,
			"height": 38.51953125,
			"seed": 613615879,
			"groupIds": [
				"Q5hzWsVi_SsHh_eA7NU9Y"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0.32421875,
					0.64453125
				],
				[
					1.24609375,
					1.56640625
				],
				[
					2.21484375,
					2.85546875
				],
				[
					3.59375,
					4.6015625
				],
				[
					4.65234375,
					6.89453125
				],
				[
					5.7109375,
					8.640625
				],
				[
					6.6796875,
					9.9296875
				],
				[
					8.10546875,
					12.77734375
				],
				[
					9.1640625,
					14.5234375
				],
				[
					9.53125,
					15.90234375
				],
				[
					10.54296875,
					17.64453125
				],
				[
					10.8671875,
					18.92578125
				],
				[
					11.46875,
					19.83984375
				],
				[
					11.46875,
					20.38671875
				],
				[
					11.74609375,
					20.66015625
				],
				[
					11.74609375,
					20.93359375
				],
				[
					12.0234375,
					20.93359375
				],
				[
					12.0234375,
					21.20703125
				],
				[
					10.7890625,
					22.44140625
				],
				[
					7.86328125,
					24.54296875
				],
				[
					3.5234375,
					27.921875
				],
				[
					-0.81640625,
					31.7578125
				],
				[
					-4.2890625,
					34.40625
				],
				[
					-7.21484375,
					36.96484375
				],
				[
					-8.17578125,
					38.24609375
				],
				[
					-8.17578125,
					38.51953125
				],
				[
					-8.17578125,
					38.51953125
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "text",
			"version": 336,
			"versionNonce": 1863188135,
			"isDeleted": false,
			"id": "dWpvCu8h",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -329.12863228693925,
			"y": 281.16831043471757,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 181.74790954589844,
			"height": 35,
			"seed": 1534742567,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "\"Task Group\"",
			"rawText": "\"Task Group\"",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "\"Task Group\"",
			"lineHeight": 1.25,
			"baseline": 25
		},
		{
			"type": "text",
			"version": 511,
			"versionNonce": 1339286345,
			"isDeleted": false,
			"id": "1jCU9rYK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 208.89724661931075,
			"y": 247.3939606197505,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 103.89373779296875,
			"height": 88.23401131849592,
			"seed": 1148176103,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 70.58720905479673,
			"fontFamily": 1,
			"text": "V.3",
			"rawText": "V.3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "V.3",
			"lineHeight": 1.25,
			"baseline": 62
		},
		{
			"type": "arrow",
			"version": 967,
			"versionNonce": 843420103,
			"isDeleted": false,
			"id": "vXYjmbvtqMADFBD6pEwq8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 118.33906405352127,
			"y": 887.106168133434,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 343.53375577733635,
			"height": 19.703404712533256,
			"seed": 1086607879,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "2R2bWSaU83l86JEbmom4c",
				"focus": 0.040237938683345215,
				"gap": 2.93105119513541
			},
			"endBinding": {
				"elementId": "UN3HOedKX3tssBbWHFlvy",
				"focus": -0.8364179372516991,
				"gap": 27.110487581282882
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					343.53375577733635,
					-19.703404712533256
				]
			]
		},
		{
			"type": "text",
			"version": 547,
			"versionNonce": 736793129,
			"isDeleted": false,
			"id": "8BTd44h6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 5.061246879513305,
			"y": 753.2368882513297,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 59.899932861328125,
			"height": 25,
			"seed": 1419409703,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- shop",
			"rawText": "- shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 634,
			"versionNonce": 1264435431,
			"isDeleted": false,
			"id": "iPtGeGWe",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 4.684327886015126,
			"y": 787.1678093039613,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 88.0198974609375,
			"height": 25,
			"seed": 1432271943,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 603,
			"versionNonce": 1929929993,
			"isDeleted": false,
			"id": "d9TSxukm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 6.02067657022576,
			"y": 857.6242237776453,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.97991943359375,
			"height": 25,
			"seed": 921541479,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- coupon",
			"rawText": "- coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 596,
			"versionNonce": 1810041863,
			"isDeleted": false,
			"id": "Hn4VpY7Z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 6.641564728120329,
			"y": 888.446592198698,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 80.01992797851562,
			"height": 25,
			"seed": 1033082503,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 675,
			"versionNonce": 11066345,
			"isDeleted": false,
			"id": "KCC7LyHX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 5.501242494619078,
			"y": 974.6472500934346,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 68.81993103027344,
			"height": 25,
			"seed": 1879911847,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- order",
			"rawText": "- order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 752,
			"versionNonce": 1607594791,
			"isDeleted": false,
			"id": "f5PjCcnd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 6.112486696279348,
			"y": 1006.4893553565928,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 72.63992309570312,
			"height": 25,
			"seed": 1233576135,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "6M6v9_QJ5DPlMi5GIhPTc",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "line",
			"version": 515,
			"versionNonce": 886535881,
			"isDeleted": false,
			"id": "JGCgRGa-uLNOcFAWcyEKR",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 258.57626594496867,
			"y": 896.7723014914611,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 2.6630108173076223,
			"height": 264.4147741649797,
			"seed": 731721703,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-2.6630108173076223,
					264.4147741649797
				]
			]
		},
		{
			"type": "text",
			"version": 1147,
			"versionNonce": 1066858055,
			"isDeleted": false,
			"id": "hncJL24M",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -9.367531514868006,
			"y": 1197.7120655628923,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 620.3594360351562,
			"height": 125,
			"seed": 274504455,
			"groupIds": [
				"o6JCkfzmp7AyNiwb3sbML"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "invoke_lambda_function = AwsLambdaInvokeFunctionOperator (\n    task_id='setup__invoke_lambda_function',\n    function_name=LAMBDA_FUNCTION_NAME,\n    payload=SAMPLE_EVENT,\n)",
			"rawText": "invoke_lambda_function = AwsLambdaInvokeFunctionOperator (\n    task_id='setup__invoke_lambda_function',\n    function_name=LAMBDA_FUNCTION_NAME,\n    payload=SAMPLE_EVENT,\n)",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "invoke_lambda_function = AwsLambdaInvokeFunctionOperator (\n    task_id='setup__invoke_lambda_function',\n    function_name=LAMBDA_FUNCTION_NAME,\n    payload=SAMPLE_EVENT,\n)",
			"lineHeight": 1.25,
			"baseline": 118
		},
		{
			"type": "rectangle",
			"version": 915,
			"versionNonce": 1647293865,
			"isDeleted": false,
			"id": "8xeQ2enu81ESmbLnczm3S",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -34.66322436026269,
			"y": 1168.6735447190158,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 668.016148851579,
			"height": 181.71391253869973,
			"seed": 2084676135,
			"groupIds": [
				"o6JCkfzmp7AyNiwb3sbML"
			],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 536,
			"versionNonce": 1645122919,
			"isDeleted": false,
			"id": "vi49sHHq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 184.63098180380268,
			"y": 818.9407902293865,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 176.9534149169922,
			"height": 54.99461549550163,
			"seed": 809026887,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 21.99784619820065,
			"fontFamily": 1,
			"text": "Airflow\nlambda operator",
			"rawText": "Airflow\nlambda operator",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Airflow\nlambda operator",
			"lineHeight": 1.25,
			"baseline": 47
		},
		{
			"type": "rectangle",
			"version": 2018,
			"versionNonce": 2078087305,
			"isDeleted": false,
			"id": "UN3HOedKX3tssBbWHFlvy",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 488.98330741214045,
			"y": 759.9323601428443,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 109.19193135359085,
			"height": 109.08736978485705,
			"seed": 809955881,
			"groupIds": [
				"xjKh765p9L59Kq2SrGAjF",
				"Og4zCQBbBqTAd7OjYjVin",
				"Z3c-2MtZ14xjQVYh_x6vV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "vXYjmbvtqMADFBD6pEwq8",
					"type": "arrow"
				},
				{
					"id": "g8gQQ7Qb3AmIGUxebGMd7",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1182,
			"versionNonce": 243617927,
			"isDeleted": false,
			"id": "mRdQ0UrcsvAEj9emWyOC6",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 531.3163734399088,
			"y": 805.223445105865,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 32.704725240264345,
			"height": 45.56132290328304,
			"seed": 1826145545,
			"groupIds": [
				"3HPGpT3Y3LmoyUg40ZYSJ",
				"Og4zCQBbBqTAd7OjYjVin",
				"Z3c-2MtZ14xjQVYh_x6vV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-21.564166846274794,
					43.13732568892464
				],
				[
					-0.877209358373814,
					45.56132290328304
				],
				[
					11.140558393989552,
					22.32753828264021
				],
				[
					1.5233077756302125,
					0.9553699712775268
				]
			]
		},
		{
			"type": "line",
			"version": 1182,
			"versionNonce": 60497769,
			"isDeleted": false,
			"id": "4X7wnBo79tPbLlUg-XxH5",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 572.7948790678431,
			"y": 832.1516657324585,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 59.05643090674373,
			"height": 74.53240910675741,
			"seed": 560806889,
			"groupIds": [
				"3HPGpT3Y3LmoyUg40ZYSJ",
				"Og4zCQBbBqTAd7OjYjVin",
				"Z3c-2MtZ14xjQVYh_x6vV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-25.341227956434878,
					-54.9168341645699
				],
				[
					-49.41893694728731,
					-55.899306830068056
				],
				[
					-51.119373534037315,
					-38.96181686055744
				],
				[
					-38.786147698913275,
					-37.26620455337871
				],
				[
					-13.325147177394884,
					17.654017447968762
				],
				[
					6.250116403151719,
					18.633102276689353
				],
				[
					7.937057372706402,
					1.6939183887899416
				],
				[
					6.25011640315172,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1509,
			"versionNonce": 1857529767,
			"isDeleted": false,
			"id": "aeokWEzw",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 481.86982566837537,
			"y": 877.4273326750113,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 123.38833618164062,
			"height": 40.654041330958584,
			"seed": 2114967241,
			"groupIds": [
				"Z3c-2MtZ14xjQVYh_x6vV"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 33.87836777579882,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"lineHeight": 1.2,
			"baseline": 29
		},
		{
			"type": "text",
			"version": 186,
			"versionNonce": 934627913,
			"isDeleted": false,
			"id": "2HbAdAi0",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 534.2433355889355,
			"y": 910.2736307044677,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 18,
			"height": 135,
			"seed": 1610816199,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": ".\n.\n",
			"rawText": ".\n.\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": ".\n.\n",
			"lineHeight": 1.25,
			"baseline": 122
		},
		{
			"type": "rectangle",
			"version": 2154,
			"versionNonce": 1087511239,
			"isDeleted": false,
			"id": "Y4ravkS1ynixL5JYUupdM",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 406.5711336759979,
			"y": 1006.4659506959822,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 51.32633964089789,
			"height": 51.27718983171614,
			"seed": 1073135369,
			"groupIds": [
				"U0jp1BQpsWDNpX-AGSxzi",
				"G4u4mcyclzYEQ6q8-QLsk",
				"5c3Z_7m16oN4sUFWz2vGY"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1319,
			"versionNonce": 17242409,
			"isDeleted": false,
			"id": "rNkrjeXwNhbIRu-0Xcajw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 426.47005201224124,
			"y": 1027.755304045627,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.373057466199414,
			"height": 21.416380357353415,
			"seed": 314308073,
			"groupIds": [
				"zLKEnISAVjKdZorJBCROU",
				"G4u4mcyclzYEQ6q8-QLsk",
				"5c3Z_7m16oN4sUFWz2vGY"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-10.13636939931727,
					20.276965541895457
				],
				[
					-0.4123376599894517,
					21.416380357353415
				],
				[
					5.236688066882147,
					10.495196843152595
				],
				[
					0.7160401991281912,
					0.4490775373293426
				]
			]
		},
		{
			"type": "line",
			"version": 1319,
			"versionNonce": 1232153063,
			"isDeleted": false,
			"id": "tm1MlaD0maWzYRNnnaUax",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 445.9672789709091,
			"y": 1040.4130799515215,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75983896541882,
			"height": 35.03441780583524,
			"seed": 158814409,
			"groupIds": [
				"zLKEnISAVjKdZorJBCROU",
				"G4u4mcyclzYEQ6q8-QLsk",
				"5c3Z_7m16oN4sUFWz2vGY"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-11.911800229977526,
					-25.813996028754058
				],
				[
					-23.229675590541447,
					-26.275813354376428
				],
				[
					-24.028976277940362,
					-18.314241908000373
				],
				[
					-18.231667536952916,
					-17.51720890291762
				],
				[
					-6.263567475303479,
					8.298379599373062
				],
				[
					2.937905698036385,
					8.75860445145881
				],
				[
					3.7308626874784614,
					0.7962367683144375
				],
				[
					2.9379056980363853,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1646,
			"versionNonce": 553389065,
			"isDeleted": false,
			"id": "3xDYPPzH",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 403.22739778375967,
			"y": 1061.6951859657147,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 57.99652099609375,
			"height": 19.109682439546493,
			"seed": 163860393,
			"groupIds": [
				"5c3Z_7m16oN4sUFWz2vGY"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 15.924735366288743,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"lineHeight": 1.2,
			"baseline": 14
		},
		{
			"type": "rectangle",
			"version": 2217,
			"versionNonce": 94459143,
			"isDeleted": false,
			"id": "6va3PRo0ArKH5uSX8F7x_",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 479.5767917523575,
			"y": 1006.4779699267508,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 51.32633964089789,
			"height": 51.27718983171614,
			"seed": 1332927751,
			"groupIds": [
				"y5PqyMWSGddAutiSy_OH7",
				"6RDjUibGUZsvwJZWl7mhh",
				"lHw0np35JwGKnAemMdPuw"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1382,
			"versionNonce": 529507049,
			"isDeleted": false,
			"id": "wx51IydY8EnbKSjmmjpe8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 499.47571008860086,
			"y": 1027.7673232763957,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.373057466199414,
			"height": 21.416380357353415,
			"seed": 1128244263,
			"groupIds": [
				"kiNzVcv8un4Dq9iyJ_OlO",
				"6RDjUibGUZsvwJZWl7mhh",
				"lHw0np35JwGKnAemMdPuw"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-10.13636939931727,
					20.276965541895457
				],
				[
					-0.4123376599894517,
					21.416380357353415
				],
				[
					5.236688066882147,
					10.495196843152595
				],
				[
					0.7160401991281912,
					0.4490775373293426
				]
			]
		},
		{
			"type": "line",
			"version": 1382,
			"versionNonce": 484383783,
			"isDeleted": false,
			"id": "bolEBgClB0u2iF9bbs34F",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 518.9729370472687,
			"y": 1040.4250991822898,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75983896541882,
			"height": 35.03441780583524,
			"seed": 740722503,
			"groupIds": [
				"kiNzVcv8un4Dq9iyJ_OlO",
				"6RDjUibGUZsvwJZWl7mhh",
				"lHw0np35JwGKnAemMdPuw"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-11.911800229977526,
					-25.813996028754058
				],
				[
					-23.229675590541447,
					-26.275813354376428
				],
				[
					-24.028976277940362,
					-18.314241908000373
				],
				[
					-18.231667536952916,
					-17.51720890291762
				],
				[
					-6.263567475303479,
					8.298379599373062
				],
				[
					2.937905698036385,
					8.75860445145881
				],
				[
					3.7308626874784614,
					0.7962367683144375
				],
				[
					2.9379056980363853,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1709,
			"versionNonce": 2035113417,
			"isDeleted": false,
			"id": "YfkUjtYo",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 476.2330558601193,
			"y": 1061.707205196483,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 57.99652099609375,
			"height": 19.109682439546493,
			"seed": 411305575,
			"groupIds": [
				"lHw0np35JwGKnAemMdPuw"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 15.924735366288743,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"lineHeight": 1.2,
			"baseline": 14
		},
		{
			"type": "rectangle",
			"version": 2180,
			"versionNonce": 320274247,
			"isDeleted": false,
			"id": "WTl14skYoown7awLiJCfx",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 554.4746282908194,
			"y": 1007.0609026190589,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 51.32633964089789,
			"height": 51.27718983171614,
			"seed": 1865767529,
			"groupIds": [
				"5hihm4TEYtfaGhBILmwXL",
				"LziNBGq-Y0Ri5ZSxyBuzi",
				"9CPQBaC-n_6QW-qsFiTGM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1345,
			"versionNonce": 223394985,
			"isDeleted": false,
			"id": "LMNotu8LXTVjZiaUIeQUS",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 574.3735466270628,
			"y": 1028.3502559687038,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.373057466199414,
			"height": 21.416380357353415,
			"seed": 1246766409,
			"groupIds": [
				"l1f813pULehnTYbGiX2QR",
				"LziNBGq-Y0Ri5ZSxyBuzi",
				"9CPQBaC-n_6QW-qsFiTGM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-10.13636939931727,
					20.276965541895457
				],
				[
					-0.4123376599894517,
					21.416380357353415
				],
				[
					5.236688066882147,
					10.495196843152595
				],
				[
					0.7160401991281912,
					0.4490775373293426
				]
			]
		},
		{
			"type": "line",
			"version": 1345,
			"versionNonce": 983924327,
			"isDeleted": false,
			"id": "CXyJfyhZl6UiCQSimmxWo",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 593.8707735857306,
			"y": 1041.0080318745984,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75983896541882,
			"height": 35.03441780583524,
			"seed": 1368298537,
			"groupIds": [
				"l1f813pULehnTYbGiX2QR",
				"LziNBGq-Y0Ri5ZSxyBuzi",
				"9CPQBaC-n_6QW-qsFiTGM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-11.911800229977526,
					-25.813996028754058
				],
				[
					-23.229675590541447,
					-26.275813354376428
				],
				[
					-24.028976277940362,
					-18.314241908000373
				],
				[
					-18.231667536952916,
					-17.51720890291762
				],
				[
					-6.263567475303479,
					8.298379599373062
				],
				[
					2.937905698036385,
					8.75860445145881
				],
				[
					3.7308626874784614,
					0.7962367683144375
				],
				[
					2.9379056980363853,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1672,
			"versionNonce": 1262829449,
			"isDeleted": false,
			"id": "vwFyUbaz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 551.1308923985812,
			"y": 1062.2901378887916,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 57.99652099609375,
			"height": 19.109682439546493,
			"seed": 148645641,
			"groupIds": [
				"9CPQBaC-n_6QW-qsFiTGM"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 15.924735366288743,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"lineHeight": 1.2,
			"baseline": 14
		},
		{
			"type": "rectangle",
			"version": 2193,
			"versionNonce": 1716984199,
			"isDeleted": false,
			"id": "IqIQUyofCKgt4dpXbIx1i",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 634.7390513677423,
			"y": 1008.8397487729046,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 51.32633964089789,
			"height": 51.27718983171614,
			"seed": 1953726119,
			"groupIds": [
				"woIQDporZ1WeZpvFfVmLE",
				"Zjqs1gQaya3tVcNyWOG-V",
				"U-24wnBGbnKuOU5Q7eh95"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1358,
			"versionNonce": 560359017,
			"isDeleted": false,
			"id": "jUnPPaqWZ7wzGu8JHtoL6",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 654.6379697039856,
			"y": 1030.1291021225495,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.373057466199414,
			"height": 21.416380357353415,
			"seed": 1861947847,
			"groupIds": [
				"pQKOf0DDIb1nwrCcTlpPg",
				"Zjqs1gQaya3tVcNyWOG-V",
				"U-24wnBGbnKuOU5Q7eh95"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-10.13636939931727,
					20.276965541895457
				],
				[
					-0.4123376599894517,
					21.416380357353415
				],
				[
					5.236688066882147,
					10.495196843152595
				],
				[
					0.7160401991281912,
					0.4490775373293426
				]
			]
		},
		{
			"type": "line",
			"version": 1358,
			"versionNonce": 1533563047,
			"isDeleted": false,
			"id": "cmbXPvolNaPaUndIjBN_4",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 674.1351966626535,
			"y": 1042.7868780284437,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 27.75983896541882,
			"height": 35.03441780583524,
			"seed": 1432568039,
			"groupIds": [
				"pQKOf0DDIb1nwrCcTlpPg",
				"Zjqs1gQaya3tVcNyWOG-V",
				"U-24wnBGbnKuOU5Q7eh95"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-11.911800229977526,
					-25.813996028754058
				],
				[
					-23.229675590541447,
					-26.275813354376428
				],
				[
					-24.028976277940362,
					-18.314241908000373
				],
				[
					-18.231667536952916,
					-17.51720890291762
				],
				[
					-6.263567475303479,
					8.298379599373062
				],
				[
					2.937905698036385,
					8.75860445145881
				],
				[
					3.7308626874784614,
					0.7962367683144375
				],
				[
					2.9379056980363853,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1685,
			"versionNonce": 713011529,
			"isDeleted": false,
			"id": "n3T54eZD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 631.395315475504,
			"y": 1064.0689840426369,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 57.99652099609375,
			"height": 19.109682439546493,
			"seed": 423136263,
			"groupIds": [
				"U-24wnBGbnKuOU5Q7eh95"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 15.924735366288743,
			"fontFamily": 1,
			"text": "Lambda",
			"rawText": "Lambda",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Lambda",
			"lineHeight": 1.2,
			"baseline": 14
		},
		{
			"type": "line",
			"version": 107,
			"versionNonce": 59089863,
			"isDeleted": false,
			"id": "m2CGfGnsQ8Xm6lUl-czVn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 894.8980890768731,
			"y": -2148.4691859271475,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 0.46875,
			"height": 322.90441176470586,
			"seed": 1260047111,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-0.46875,
					322.90441176470586
				]
			]
		},
		{
			"type": "arrow",
			"version": 1053,
			"versionNonce": 468492329,
			"isDeleted": false,
			"id": "g8gQQ7Qb3AmIGUxebGMd7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 127.4910694900787,
			"y": 785.044348544548,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 336.8795529798162,
			"height": 25.852654128037102,
			"seed": 1987264455,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "hN8KatEMqKIVaCcg6nfn-",
				"focus": -0.09587398887296412,
				"gap": 13.501930313179116
			},
			"endBinding": {
				"elementId": "UN3HOedKX3tssBbWHFlvy",
				"focus": -0.042557529676097654,
				"gap": 24.612684942245608
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					336.8795529798162,
					25.852654128037102
				]
			]
		},
		{
			"type": "arrow",
			"version": 1022,
			"versionNonce": 1590399719,
			"isDeleted": false,
			"id": "amExfYSXqluQb27pKwIDd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 125.02934457136445,
			"y": 1004.4113913010674,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 333.9556651453283,
			"height": 99.34162061736924,
			"seed": 1045616073,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "6ofGfKNh6DBwcYpbghzcg",
				"focus": 0.4073380143307876,
				"gap": 9.392721592668693
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					333.9556651453283,
					-99.34162061736924
				]
			]
		},
		{
			"type": "line",
			"version": 593,
			"versionNonce": 1939387145,
			"isDeleted": false,
			"id": "kTQ7ZGcQMUibuqWEvxlIW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1779.6968239838775,
			"y": -710.8401395851521,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "black",
			"width": 151.095208990433,
			"height": 113.60418688852988,
			"seed": 1004440743,
			"groupIds": [
				"-X0KGlTPhBNxkOQfqlpsk",
				"cPvFv_qoVjZllzx70DBIz"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					37.7334010591116,
					113.60418688852988
				],
				[
					151.095208990433,
					113.60418688852988
				],
				[
					0,
					0
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 593,
			"versionNonce": 902209031,
			"isDeleted": false,
			"id": "7ocUWlmlA3aASptxTqD8_",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1930.7920329743106,
			"y": -597.2359526966223,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "black",
			"width": 151.095208990433,
			"height": 113.60420639344865,
			"seed": 1909743559,
			"groupIds": [
				"-X0KGlTPhBNxkOQfqlpsk",
				"cPvFv_qoVjZllzx70DBIz"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-113.36180793132141,
					0
				],
				[
					-151.095208990433,
					113.60420639344865
				],
				[
					0,
					0
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 594,
			"versionNonce": 1711237609,
			"isDeleted": false,
			"id": "2VD5jCpzuqJjjTIR8jfNT",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1713.4411850986173,
			"y": -483.6317463031736,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "black",
			"width": 66.25563888525812,
			"height": 113.60420639344865,
			"seed": 199413479,
			"groupIds": [
				"-X0KGlTPhBNxkOQfqlpsk",
				"cPvFv_qoVjZllzx70DBIz"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					37.895001478671865,
					-18.907114721331705
				],
				[
					66.25563888525812,
					-113.60420639344865
				],
				[
					28.360650409865503,
					-113.60420639344865
				],
				[
					0,
					0
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 593,
			"versionNonce": 192103719,
			"isDeleted": false,
			"id": "d2SyFEDeUjW9q-garBpeP",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 1713.4411850986173,
			"y": -710.8401395851521,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "black",
			"width": 66.25563888525812,
			"height": 113.60418688852988,
			"seed": 882268679,
			"groupIds": [
				"-X0KGlTPhBNxkOQfqlpsk",
				"cPvFv_qoVjZllzx70DBIz"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					28.360650409865503,
					113.60418688852988
				],
				[
					66.25563888525812,
					113.60418688852988
				],
				[
					37.895001478671865,
					18.90709955083926
				],
				[
					0,
					0
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 26,
			"versionNonce": 204227785,
			"isDeleted": false,
			"id": "ZnCSx0ho",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 352.2487290249544,
			"y": 598.353962542784,
			"strokeColor": "#f08c00",
			"backgroundColor": "black",
			"width": 72.3599853515625,
			"height": 45,
			"seed": 1131694025,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "AWS",
			"rawText": "AWS",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "AWS",
			"lineHeight": 1.25,
			"baseline": 32
		},
		{
			"type": "rectangle",
			"version": 841,
			"versionNonce": 1329465415,
			"isDeleted": false,
			"id": "R2mcDg5K0KRZlTVZQGKX_",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2589.5200051861602,
			"y": -778.0563555181318,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 554.9067080593737,
			"height": 447.58359035579053,
			"seed": 574523655,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2098,
			"versionNonce": 1371194281,
			"isDeleted": false,
			"id": "jbI6xwNgBimzdKDEmJzGk",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2652.8257422065644,
			"y": -837.2577398783994,
			"strokeColor": "turquoise",
			"backgroundColor": "turquoise",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 397791271,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1923,
			"versionNonce": 1325623143,
			"isDeleted": false,
			"id": "5tyG8Vy3uAhgVQSRGCc5r",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2642.2070411752834,
			"y": -823.6922240940962,
			"strokeColor": "aqua",
			"backgroundColor": "aqua",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 1761030983,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2282,
			"versionNonce": 584476297,
			"isDeleted": false,
			"id": "gYVd1iApNBqCTwh1RLGW4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": 2626.293245732808,
			"y": -839.8462725430406,
			"strokeColor": "red",
			"backgroundColor": "red",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1314861671,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2143,
			"versionNonce": 1762648711,
			"isDeleted": false,
			"id": "XmFiH2uOt-CGvEK_P_c2_",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": 2637.9478003571558,
			"y": -840.5154777568521,
			"strokeColor": "salmon",
			"backgroundColor": "salmon",
			"width": 19.090763219686202,
			"height": 10.920680508629188,
			"seed": 1085951367,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.247032861929438,
					5.414223509566554
				],
				[
					7.80069096616502,
					9.655793097762178
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.2700879407222723
				],
				[
					17.409206394840286,
					1.7137171824230046
				],
				[
					12.349656751372345,
					2.271356548532129
				],
				[
					5.08675110820378,
					0.625643650550335
				],
				[
					0.013602600172775085,
					-1.26488741086701
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2219,
			"versionNonce": 1513794921,
			"isDeleted": false,
			"id": "58NZDPL3Lzu1HzR1Hiub-",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": 2623.901686346753,
			"y": -813.4165914308539,
			"strokeColor": "#228be6",
			"backgroundColor": "#228be6",
			"width": 26.626032756145793,
			"height": 31.68378673255594,
			"seed": 1799685287,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245165
				],
				[
					-2.048210553853881,
					5.466507876823851
				],
				[
					-5.656165483542917,
					8.491751647064284
				],
				[
					-10.052266425009464,
					11.126683806841763
				],
				[
					-10.006359309336936,
					12.356339945392234
				],
				[
					-4.093510626546925,
					14.592608482820362
				],
				[
					2.8736090261096536,
					15.831570229232073
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732267
				],
				[
					16.146625249157346,
					-5.041081952488192
				],
				[
					16.57376633113633,
					-14.471773074138259
				],
				[
					15.460041218424415,
					-15.852216503323865
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2041,
			"versionNonce": 2116024743,
			"isDeleted": false,
			"id": "uXYZrrGHaOtOA0qPVrsDB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": 2621.39499425982,
			"y": -836.1824429852566,
			"strokeColor": "lightblue",
			"backgroundColor": "lightblue",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 1571542983,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2193,
			"versionNonce": 1865619529,
			"isDeleted": false,
			"id": "Ka4rUB1bchXZGtmlLsxFk",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": 2650.30592287694,
			"y": -810.8101289114115,
			"strokeColor": "green",
			"backgroundColor": "green",
			"width": 26.626032756145793,
			"height": 31.683786732555944,
			"seed": 2114668263,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3102325723157333,
					2.1078922197245173
				],
				[
					-2.048210553853881,
					5.466507876823853
				],
				[
					-5.656165483542917,
					8.491751647064286
				],
				[
					-10.052266425009464,
					11.126683806841765
				],
				[
					-10.006359309336936,
					12.356339945392238
				],
				[
					-4.093510626546925,
					14.592608482820363
				],
				[
					2.8736090261096536,
					15.831570229232076
				],
				[
					9.248306412718266,
					14.024065340244405
				],
				[
					13.693323260831255,
					7.231070384732269
				],
				[
					16.146625249157346,
					-5.0410819524881925
				],
				[
					16.57376633113633,
					-14.47177307413826
				],
				[
					15.460041218424415,
					-15.852216503323866
				],
				[
					10.461193823397712,
					-10.726513378247839
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2019,
			"versionNonce": 593505479,
			"isDeleted": false,
			"id": "6eAWO6605aPrNewM2oLcX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": 2625.613888389795,
			"y": -819.6144157399026,
			"strokeColor": "lightgreen",
			"backgroundColor": "lightgreen",
			"width": 19.090763219686202,
			"height": 10.880751506368723,
			"seed": 988795399,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					3.373032680577558,
					5.331568026436101
				],
				[
					8.051758082133961,
					9.615864095501713
				],
				[
					11.465592337213657,
					9.126231504240293
				],
				[
					19.090763219686202,
					1.270087940722272
				],
				[
					17.409206394840286,
					1.7137171824230044
				],
				[
					12.349656751372345,
					2.2713565485321285
				],
				[
					5.08675110820378,
					0.6256436505503349
				],
				[
					0.013602600172775085,
					-1.2648874108670098
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 1190,
			"versionNonce": 1671112489,
			"isDeleted": false,
			"id": "uCeYrc3GDLqr2a3kk9vCW",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2640.113175578407,
			"y": -826.6965948085481,
			"strokeColor": "#000000",
			"backgroundColor": "black",
			"width": 2.4664671675253453,
			"height": 2.4664671675253453,
			"seed": 2102786343,
			"groupIds": [
				"OUPsXqNGkkeqZQ4zWNh9H",
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1181,
			"versionNonce": 342686695,
			"isDeleted": false,
			"id": "SlBoll21",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2675.722182497698,
			"y": -846.5674649383575,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 41.3492431640625,
			"height": 15.66025242037268,
			"seed": 1521105991,
			"groupIds": [
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 12.311733971712764,
			"fontFamily": 1,
			"text": "Apache",
			"rawText": "Apache",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Apache",
			"lineHeight": 1.2719778104654809,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 1135,
			"versionNonce": 1910397449,
			"isDeleted": false,
			"id": "cApR75FU",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2671.1856952360595,
			"y": -833.8379556769346,
			"strokeColor": "#495057",
			"backgroundColor": "black",
			"width": 83.15940856933594,
			"height": 32.80021373085932,
			"seed": 113843047,
			"groupIds": [
				"esMg277OcCENeIqPkpezC"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 25.854479605079288,
			"fontFamily": 1,
			"text": "Airflow",
			"rawText": "Airflow",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Airflow",
			"lineHeight": 1.2686472221400076,
			"baseline": 23
		},
		{
			"type": "rectangle",
			"version": 576,
			"versionNonce": 1699931911,
			"isDeleted": false,
			"id": "arV_BgWz3iuag9V9KJ50S",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2615.8362611957755,
			"y": -763.8245346046706,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 190.09014423076923,
			"height": 143.7079326923078,
			"seed": 100603527,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "f0XiGw8S"
				},
				{
					"id": "rUPmN1AkN5bqtLd9p3Qw_",
					"type": "arrow"
				},
				{
					"id": "9x-aVPaq9lqpoDcx4wUKc",
					"type": "arrow"
				},
				{
					"id": "IqJjoqcqKgIXM1deOAO1C",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 502,
			"versionNonce": 2063085801,
			"isDeleted": false,
			"id": "f0XiGw8S",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2662.6713800030548,
			"y": -729.4705682585167,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.41990661621094,
			"height": 75,
			"seed": 520662439,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Scheduler\n&\nWebserver",
			"rawText": "Scheduler\n&\nWebserver",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "arV_BgWz3iuag9V9KJ50S",
			"originalText": "Scheduler\n&\nWebserver",
			"lineHeight": 1.25,
			"baseline": 68
		},
		{
			"type": "line",
			"version": 6472,
			"versionNonce": 1955491367,
			"isDeleted": false,
			"id": "RIWinnA8zU7Tiu0V2Kq7A",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2666.0915074857394,
			"y": -559.3215419242333,
			"strokeColor": "#000000",
			"backgroundColor": "#ced4da",
			"width": 75.01121630306868,
			"height": 96.81388324216654,
			"seed": 219308231,
			"groupIds": [
				"jf0rQ3YNp-QAUluqCUc5C",
				"wNyn32fGeL3P9Uvtw9eg8",
				"lZN20LFHCmKH4_L42u3ig"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.24734846976242794,
					73.1714082159101
				],
				[
					0.011575327725072006,
					81.50165529728328
				],
				[
					3.8632435379119165,
					85.10105205208878
				],
				[
					17.276485894102954,
					88.14730719194147
				],
				[
					39.948665011120255,
					89.0958655364321
				],
				[
					61.61043288740646,
					87.58135319133916
				],
				[
					73.11948965218787,
					83.95942431004657
				],
				[
					74.74268637210398,
					80.90610026776591
				],
				[
					74.9706584753909,
					74.19947908967055
				],
				[
					74.79172688269483,
					6.138672737165569
				],
				[
					74.38835763792527,
					-0.2918194398554754
				],
				[
					69.57188081608908,
					-3.885863818744892
				],
				[
					59.42940850758881,
					-5.967344146345569
				],
				[
					36.31608449133351,
					-7.7180177057344235
				],
				[
					17.785060590062127,
					-6.674087120295436
				],
				[
					3.210536142559118,
					-3.1332019499277424
				],
				[
					-0.04055782767777212,
					-0.04396604849106378
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "ellipse",
			"version": 7195,
			"versionNonce": 880028617,
			"isDeleted": false,
			"id": "ciSKL-D79npTS2X2Yai8-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2666.3574400764232,
			"y": -568.0745100802615,
			"strokeColor": "#000000",
			"backgroundColor": "#fff",
			"width": 74.53008207714048,
			"height": 15.073148387271289,
			"seed": 1907929063,
			"groupIds": [
				"jf0rQ3YNp-QAUluqCUc5C",
				"wNyn32fGeL3P9Uvtw9eg8",
				"lZN20LFHCmKH4_L42u3ig"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "9x-aVPaq9lqpoDcx4wUKc",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 459,
			"versionNonce": 487330119,
			"isDeleted": false,
			"id": "y_8UY424F3Cm2wosRoL4y",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2634.772741241849,
			"y": -419.82545750330246,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 134.96394230769238,
			"height": 69.89783653846155,
			"seed": 117971719,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "PYaOQtQe"
				},
				{
					"id": "yG5_cUnpsEQbwSwTt7nKJ",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 439,
			"versionNonce": 632392135,
			"isDeleted": false,
			"id": "PYaOQtQe",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2674.5747273493084,
			"y": -397.3765392340717,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.35997009277344,
			"height": 25,
			"seed": 293413415,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699314982627,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "DAGs",
			"rawText": "DAGs",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "y_8UY424F3Cm2wosRoL4y",
			"originalText": "DAGs",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1036,
			"versionNonce": 1758491946,
			"isDeleted": false,
			"id": "yG5_cUnpsEQbwSwTt7nKJ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2705.2288612539514,
			"y": -443.10259918864335,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18158320550992357,
			"height": 16.746317882257983,
			"seed": 302269767,
			"groupIds": [
				"Uqi2MWFZosp8zOWkit7KC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864121,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "y_8UY424F3Cm2wosRoL4y",
				"gap": 6.530823803082853,
				"focus": 0.053130779867950034
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.18158320550992357,
					16.746317882257983
				]
			]
		},
		{
			"type": "arrow",
			"version": 796,
			"versionNonce": 160468361,
			"isDeleted": false,
			"id": "J5xPtWZ9KJsA0o3B7y7do",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2705.211905228256,
			"y": -443.1962283573264,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.20184359341078562,
			"height": 17.722798727512895,
			"seed": 939132007,
			"groupIds": [
				"Uqi2MWFZosp8zOWkit7KC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.20184359341078562,
					-17.722798727512895
				]
			]
		},
		{
			"type": "diamond",
			"version": 1225,
			"versionNonce": 2142219143,
			"isDeleted": false,
			"id": "-vCurVQVKJYo9WTNnOLWB",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2759.5058009064924,
			"y": -528.1976688676668,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 321576839,
			"groupIds": [
				"Y6GxQ4h2biPyl5iX1o0p0",
				"tMhZ-oOp3YtJv4WkYxp9R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1267,
			"versionNonce": 1427633257,
			"isDeleted": false,
			"id": "KplxaqKcfv1LYlDyg1K5g",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2759.5058009064924,
			"y": -537.0694487959254,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 97736359,
			"groupIds": [
				"Y6GxQ4h2biPyl5iX1o0p0",
				"tMhZ-oOp3YtJv4WkYxp9R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "VSckBDH3tN3GHanlKc377",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1353,
			"versionNonce": 534684327,
			"isDeleted": false,
			"id": "1a7ODGGBV3UZCPBbYMZr1",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2759.5058009064924,
			"y": -549.7000083906373,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1990191559,
			"groupIds": [
				"Y6GxQ4h2biPyl5iX1o0p0",
				"tMhZ-oOp3YtJv4WkYxp9R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "VSckBDH3tN3GHanlKc377",
					"type": "arrow"
				},
				{
					"id": "haQr4FNE3PnuP1eSp7bpa",
					"type": "arrow"
				},
				{
					"id": "mOHat2U8VASJDwOifIGSe",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1406,
			"versionNonce": 1288666953,
			"isDeleted": false,
			"id": "72MzxxJfVblT0SfZSDxCh",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2759.5058009064924,
			"y": -562.2316806879346,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#fd8888",
			"width": 112.64736525303451,
			"height": 36.77344700318558,
			"seed": 1118640359,
			"groupIds": [
				"Y6GxQ4h2biPyl5iX1o0p0",
				"tMhZ-oOp3YtJv4WkYxp9R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "a0J2uA4pJz6R3eCmLM1iQ",
					"type": "arrow"
				},
				{
					"id": "VSckBDH3tN3GHanlKc377",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 573,
			"versionNonce": 1231140295,
			"isDeleted": false,
			"id": "O3S3u7dW",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2791.011509467022,
			"y": -555.4038777299179,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 51.11994934082031,
			"height": 25,
			"seed": 1871143943,
			"groupIds": [
				"tMhZ-oOp3YtJv4WkYxp9R"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "haQr4FNE3PnuP1eSp7bpa",
					"type": "arrow"
				},
				{
					"id": "a0J2uA4pJz6R3eCmLM1iQ",
					"type": "arrow"
				}
			],
			"updated": 1699313954101,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Redis",
			"rawText": "Redis",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Redis",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1471,
			"versionNonce": 1264310826,
			"isDeleted": false,
			"id": "rUPmN1AkN5bqtLd9p3Qw_",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": 2759.8983199778604,
			"y": -608.3007464517699,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2555306941908384,
			"height": 23.566046328898324,
			"seed": 489376551,
			"groupIds": [
				"bux-X_dBT2KA7tWVu1tPD"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864120,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "arV_BgWz3iuag9V9KJ50S",
				"gap": 13.810252385991248,
				"focus": 0.10354803767815282
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.2555306941908384,
					23.566046328898324
				]
			]
		},
		{
			"type": "arrow",
			"version": 1432,
			"versionNonce": 1934976231,
			"isDeleted": false,
			"id": "a0J2uA4pJz6R3eCmLM1iQ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": 2773.7692513539755,
			"y": -563.8061573394193,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.2840418715895313,
			"height": 24.940186781763522,
			"seed": 939871815,
			"groupIds": [
				"bux-X_dBT2KA7tWVu1tPD"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "O3S3u7dW",
				"focus": -0.6053918351334114,
				"gap": 10.516697553496215
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-0.2840418715895313,
					-24.940186781763522
				]
			]
		},
		{
			"type": "rectangle",
			"version": 613,
			"versionNonce": 583860489,
			"isDeleted": false,
			"id": "qzOYIyprLyT7k3dYXU4IO",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2943.884355876866,
			"y": -712.8271281284772,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 164.12306810890618,
			"height": 345.2139841463238,
			"seed": 1794239847,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "VSckBDH3tN3GHanlKc377",
					"type": "arrow"
				}
			],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 575,
			"versionNonce": 2101751815,
			"isDeleted": false,
			"id": "9MZeUy0Q",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2996.9459204488967,
			"y": -745.955801672302,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 57.99993896484375,
			"height": 25,
			"seed": 1362995335,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Celery",
			"rawText": "Celery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Celery",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "arrow",
			"version": 1435,
			"versionNonce": 91879401,
			"isDeleted": false,
			"id": "VSckBDH3tN3GHanlKc377",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2875.6837608310075,
			"y": -528.4684417029168,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 82.61060860972839,
			"height": 99.21676970494727,
			"seed": 1755643815,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "72MzxxJfVblT0SfZSDxCh",
				"focus": 1.289993537315491,
				"gap": 15.713008798042875
			},
			"endBinding": {
				"elementId": "Dq6JIpYKfCsqOlSK0-w-M",
				"focus": 0.5725170004071678,
				"gap": 6.573683044425479
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					82.61060860972839,
					-99.21676970494727
				]
			]
		},
		{
			"type": "arrow",
			"version": 1163,
			"versionNonce": 556832551,
			"isDeleted": false,
			"id": "haQr4FNE3PnuP1eSp7bpa",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2874.0054183710677,
			"y": -523.7559392604608,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 83.24860871393275,
			"height": 0.3810062462142696,
			"seed": 1129607879,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "1a7ODGGBV3UZCPBbYMZr1",
				"focus": 0.42550273099081265,
				"gap": 7.75904031464918
			},
			"endBinding": {
				"elementId": "b2SpyCt1ZkIWgudcpQql1",
				"focus": -0.34798041451485184,
				"gap": 9.032899081647656
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					83.24860871393275,
					-0.3810062462142696
				]
			]
		},
		{
			"type": "arrow",
			"version": 1321,
			"versionNonce": 958730953,
			"isDeleted": false,
			"id": "mOHat2U8VASJDwOifIGSe",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2873.3934524730466,
			"y": -518.5750290908604,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 89.28200057698177,
			"height": 98.53147271835927,
			"seed": 2045280743,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "1a7ODGGBV3UZCPBbYMZr1",
				"focus": -0.8170895935619706,
				"gap": 12.494251014540286
			},
			"endBinding": {
				"elementId": "4uwpAllq",
				"focus": -0.8560968029210537,
				"gap": 15.558312258412116
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					89.28200057698177,
					98.53147271835927
				]
			]
		},
		{
			"type": "arrow",
			"version": 1446,
			"versionNonce": 903272362,
			"isDeleted": false,
			"id": "9x-aVPaq9lqpoDcx4wUKc",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2704.092110018936,
			"y": -590.4797623767149,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18160500977000993,
			"height": 16.748328756987803,
			"seed": 1567468807,
			"groupIds": [
				"ZiBEQfIwqsPrr4flfW0Ph"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864120,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "arV_BgWz3iuag9V9KJ50S",
				"gap": 29.636839535647823,
				"focus": 0.08233521180677218
			},
			"endBinding": {
				"elementId": "ciSKL-D79npTS2X2Yai8-",
				"gap": 5.658442299067391,
				"focus": 0.02131465167264196
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					0.18160500977000993,
					16.748328756987803
				]
			]
		},
		{
			"type": "arrow",
			"version": 1204,
			"versionNonce": 1563578986,
			"isDeleted": false,
			"id": "IqJjoqcqKgIXM1deOAO1C",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2700.4748084931944,
			"y": -590.573391545398,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 3.398501906635545,
			"height": 17.722798727512867,
			"seed": 1767928871,
			"groupIds": [
				"ZiBEQfIwqsPrr4flfW0Ph"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699331864121,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "arV_BgWz3iuag9V9KJ50S",
				"gap": 29.543210366964786,
				"focus": -0.08304507274779518
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					3.398501906635545,
					-17.722798727512867
				]
			]
		},
		{
			"type": "rectangle",
			"version": 645,
			"versionNonce": 1326725479,
			"isDeleted": false,
			"id": "Dq6JIpYKfCsqOlSK0-w-M",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2964.8680524851616,
			"y": -684.3814295561954,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 82.7041936917846,
			"seed": 1974294343,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "VSckBDH3tN3GHanlKc377",
					"type": "arrow"
				},
				{
					"id": "2vxNcQevVDI4DxGvB8Bxc",
					"type": "arrow"
				}
			],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 637,
			"versionNonce": 108246153,
			"isDeleted": false,
			"id": "b2SpyCt1ZkIWgudcpQql1",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2966.286926166648,
			"y": -575.5047124413643,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 682677863,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "haQr4FNE3PnuP1eSp7bpa",
					"type": "arrow"
				},
				{
					"id": "UJ1YWrzTj5Vft9Sjmd_oW",
					"type": "arrow"
				}
			],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 656,
			"versionNonce": 322335879,
			"isDeleted": false,
			"id": "POJz-XFzddFI0Nl-btUol",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2966.5155362869577,
			"y": -462.0991834121869,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 121.24236530389908,
			"height": 75.59818019052632,
			"seed": 691499399,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "mOHat2U8VASJDwOifIGSe",
					"type": "arrow"
				}
			],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 621,
			"versionNonce": 956185449,
			"isDeleted": false,
			"id": "od8wl7sx",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2988.834384686886,
			"y": -708.413765170714,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 76.5599365234375,
			"height": 25,
			"seed": 276670631,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 1",
			"rawText": "worker 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 1",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 674,
			"versionNonce": 161762215,
			"isDeleted": false,
			"id": "lSiF2INa",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2988.0069174038636,
			"y": -599.3071003603995,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 85.37992858886719,
			"height": 25,
			"seed": 472906695,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 2",
			"rawText": "worker 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 2",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 711,
			"versionNonce": 173336137,
			"isDeleted": false,
			"id": "FWvSJWQD",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 2984.705183476128,
			"y": -482.8799419149575,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 84.75993347167969,
			"height": 25,
			"seed": 543877863,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "worker 3",
			"rawText": "worker 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "worker 3",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "rectangle",
			"version": 372,
			"versionNonce": 512376519,
			"isDeleted": false,
			"id": "TELiZm_AFyr-NxzH7PcFJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2595.492646325222,
			"y": -1067.6894287647513,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1152.91796875,
			"height": 187.7109375,
			"seed": 968553991,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 366,
			"versionNonce": 357774633,
			"isDeleted": false,
			"id": "TFro7OJ6yAKHx-LkBa-Az",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3305.727021325222,
			"y": -779.6972412647513,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 440.546875,
			"height": 445.98437499999994,
			"seed": 1058839847,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "image",
			"version": 423,
			"versionNonce": 75812327,
			"isDeleted": false,
			"id": "gxRlozI31BYbohGzXSXxJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3323.809052575222,
			"y": -857.7253174366263,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.08593750000001,
			"height": 64.08593750000001,
			"seed": 1945919559,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"status": "pending",
			"fileId": "907320ac5d17df89816c0d633e1bd332ce62b658",
			"scale": [
				1,
				1
			]
		},
		{
			"type": "rectangle",
			"version": 310,
			"versionNonce": 224700425,
			"isDeleted": false,
			"id": "6V8l7D2iQB0MUuX54lUvh",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2623.449677575222,
			"y": -1023.5807861866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 2050408295,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 270,
			"versionNonce": 1721792775,
			"isDeleted": false,
			"id": "RHO5rC5U",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2673.281708825222,
			"y": -1053.0964111866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 42.979949951171875,
			"height": 25,
			"seed": 68696711,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Shop",
			"rawText": "Shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 397,
			"versionNonce": 746897129,
			"isDeleted": false,
			"id": "nNltQJzu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2646.951890099636,
			"y": -1008.5495361866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 1180520871,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 457,
			"versionNonce": 1515831335,
			"isDeleted": false,
			"id": "Qe3k7XL5",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2645.106453112355,
			"y": -985.3620361866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 707953863,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 489,
			"versionNonce": 1631517129,
			"isDeleted": false,
			"id": "D8mA02DJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2648.176765612355,
			"y": -961.3542236866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 1060393959,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 538,
			"versionNonce": 295510855,
			"isDeleted": false,
			"id": "d10hAWD6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2646.8708735591085,
			"y": -938.3893799366263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 1836007175,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 358,
			"versionNonce": 1018091689,
			"isDeleted": false,
			"id": "8SAsTJIpaxpCFojhyTFrn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2803.586396325222,
			"y": -1024.7214111866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1734329895,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 337,
			"versionNonce": 1288118887,
			"isDeleted": false,
			"id": "wfH7D48x",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2842.144990075222,
			"y": -1054.2370361866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 74.01991271972656,
			"height": 25,
			"seed": 1542613319,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Deposit",
			"rawText": "Deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 452,
			"versionNonce": 545250185,
			"isDeleted": false,
			"id": "pJAMD05a",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2827.088608849636,
			"y": -1009.6901611866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 55.628570556640625,
			"height": 15.804687500000012,
			"seed": 1753458791,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 534,
			"versionNonce": 212090247,
			"isDeleted": false,
			"id": "FdcXNBP8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2825.243171862355,
			"y": -986.5026611866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 107.45249938964844,
			"height": 15.804687500000012,
			"seed": 1256194951,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_history",
			"rawText": "- deposit_history",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_history",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 569,
			"versionNonce": 753762921,
			"isDeleted": false,
			"id": "wt216CHe",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2825.313484362355,
			"y": -962.4948486866263,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 118.67683410644531,
			"height": 15.804687500000012,
			"seed": 1396964007,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- deposit_withdraw",
			"rawText": "- deposit_withdraw",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit_withdraw",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 355,
			"versionNonce": 74511527,
			"isDeleted": false,
			"id": "8DejuCKVecrBXE9vgudIU",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2981.992646325222,
			"y": -1025.8776611866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 375131591,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 331,
			"versionNonce": 1858293065,
			"isDeleted": false,
			"id": "vBxz2y9P",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3025.824677575222,
			"y": -1055.3932861866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 65.59992980957031,
			"height": 25,
			"seed": 1598340327,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Coupon",
			"rawText": "Coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 442,
			"versionNonce": 1272563655,
			"isDeleted": false,
			"id": "XurXN44D",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3005.494858849636,
			"y": -1010.8464111866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 1636468743,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_address",
			"rawText": "- shop_address",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_address",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 502,
			"versionNonce": 1297923113,
			"isDeleted": false,
			"id": "H5GwoG88",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3003.649421862355,
			"y": -987.6589111866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 724168487,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_grade",
			"rawText": "- shop_grade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_grade",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 534,
			"versionNonce": 1358640871,
			"isDeleted": false,
			"id": "vcHcZWbS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3006.719734362355,
			"y": -963.6510986866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 1452241479,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_business",
			"rawText": "- shop_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 583,
			"versionNonce": 950357769,
			"isDeleted": false,
			"id": "xSgjD6AX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3005.4138423091085,
			"y": -940.6862549366263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 2090307943,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- shop_info",
			"rawText": "- shop_info",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop_info",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 356,
			"versionNonce": 174178823,
			"isDeleted": false,
			"id": "T7mnjmWbB8YL79igxZWQI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3167.871552575222,
			"y": -1029.1276611866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 1720634503,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 330,
			"versionNonce": 387483113,
			"isDeleted": false,
			"id": "7M5bXrE1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3211.703583825222,
			"y": -1058.6432861866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 61.67994689941406,
			"height": 25,
			"seed": 3253159,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Vendor",
			"rawText": "Vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 465,
			"versionNonce": 1762257191,
			"isDeleted": false,
			"id": "Gf4oaQBw",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3191.373765099636,
			"y": -1014.0964111866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 50.572601318359375,
			"height": 15.804687500000012,
			"seed": 162305735,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 529,
			"versionNonce": 1942085833,
			"isDeleted": false,
			"id": "hsU2iKfT",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3190.528328112355,
			"y": -990.9089111866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 110.78950500488281,
			"height": 15.804687500000012,
			"seed": 161228263,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_business",
			"rawText": "- vendor_business",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_business",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 571,
			"versionNonce": 174074951,
			"isDeleted": false,
			"id": "kD1R6lhl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3192.598640612355,
			"y": -966.9010986866263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 106.10006713867188,
			"height": 15.804687500000012,
			"seed": 2131546375,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_delivery",
			"rawText": "- vendor_delivery",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_delivery",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 606,
			"versionNonce": 1815928745,
			"isDeleted": false,
			"id": "CcwEpcNM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3191.2927485591085,
			"y": -943.9362549366263,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 87.40553283691406,
			"height": 15.804687500000012,
			"seed": 1400576039,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- vendor_user",
			"rawText": "- vendor_user",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor_user",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 359,
			"versionNonce": 708905831,
			"isDeleted": false,
			"id": "-juxStR-oRwrbWbmHVs-g",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3356.910615075222,
			"y": -1026.3854736866263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 215186247,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 324,
			"versionNonce": 1588920969,
			"isDeleted": false,
			"id": "iHgCm1eo",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3406.742646325222,
			"y": -1055.9010986866263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 54.039947509765625,
			"height": 25,
			"seed": 1064467047,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Order",
			"rawText": "Order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 481,
			"versionNonce": 1425606279,
			"isDeleted": false,
			"id": "7m55BNUT",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3380.412827599636,
			"y": -1011.6315674366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 96.72119140625,
			"height": 15.804687500000012,
			"seed": 1076139399,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_master",
			"rawText": "- order_master",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_master",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 529,
			"versionNonce": 1474677097,
			"isDeleted": false,
			"id": "wRR9dmkd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3378.567390612355,
			"y": -988.1667236866263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 88.32821655273438,
			"height": 15.804687500000012,
			"seed": 371608743,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_goods",
			"rawText": "- order_goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 565,
			"versionNonce": 1497669031,
			"isDeleted": false,
			"id": "2jl0neOG",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3381.637703112355,
			"y": -964.1589111866263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 97.555419921875,
			"height": 15.804687500000012,
			"seed": 757342151,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- order_status",
			"rawText": "- order_status",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order_status",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 633,
			"versionNonce": 1092269129,
			"isDeleted": false,
			"id": "51wJF1Gp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3380.3318110591085,
			"y": -941.1940674366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 60.065216064453125,
			"height": 15.804687500000012,
			"seed": 1195020007,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- payment",
			"rawText": "- payment",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- payment",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "rectangle",
			"version": 387,
			"versionNonce": 2052083911,
			"isDeleted": false,
			"id": "_fd7svDTS3MpZqEUMT3Ii",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3546.578583825222,
			"y": -1027.1081299366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 154.5,
			"height": 122.234375,
			"seed": 787880455,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 369,
			"versionNonce": 1311720233,
			"isDeleted": false,
			"id": "VYqKURZA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3592.410615075222,
			"y": -1056.6237549366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 60.17994689941406,
			"height": 25,
			"seed": 693322023,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Goods",
			"rawText": "Goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 496,
			"versionNonce": 1639489511,
			"isDeleted": false,
			"id": "d0QqL5K1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3570.080796349636,
			"y": -1012.0768799366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 45.908416748046875,
			"height": 15.804687500000012,
			"seed": 666797127,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 559,
			"versionNonce": 730789385,
			"isDeleted": false,
			"id": "yNjrhveP",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3568.235359362355,
			"y": -988.8893799366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 80.23861694335938,
			"height": 15.804687500000012,
			"seed": 974414695,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- goods_plan",
			"rawText": "- goods_plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods_plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 614,
			"versionNonce": 1368001287,
			"isDeleted": false,
			"id": "4LoAMnJ8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3571.305671862355,
			"y": -964.8815674366263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 35.40460205078125,
			"height": 15.804687500000012,
			"seed": 1084317319,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan",
			"rawText": "- plan",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "text",
			"version": 640,
			"versionNonce": 1815432425,
			"isDeleted": false,
			"id": "REf07QAl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3569.9997798091085,
			"y": -941.9167236866263,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 99.37556457519531,
			"height": 15.804687500000012,
			"seed": 1579283879,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 12.64375000000001,
			"fontFamily": 1,
			"text": "- plan_category",
			"rawText": "- plan_category",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- plan_category",
			"lineHeight": 1.25,
			"baseline": 11
		},
		{
			"type": "freedraw",
			"version": 308,
			"versionNonce": 373363239,
			"isDeleted": false,
			"id": "50CRN8SC4TqFcklzQBK_o",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2641.742646325222,
			"y": -1123.0495361866265,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 84.68359375,
			"height": 138.65234375,
			"seed": 700623047,
			"groupIds": [
				"PYHkXZ7RGu46iqKn8xIA2"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-0.546875,
					0
				],
				[
					-2.7421875,
					0
				],
				[
					-5.02734375,
					0
				],
				[
					-14.1640625,
					1.01171875
				],
				[
					-20.28515625,
					2.5703125
				],
				[
					-26.40625,
					4.0390625
				],
				[
					-30.2421875,
					5.13671875
				],
				[
					-37.1875,
					7.93359375
				],
				[
					-40.4765625,
					9.58203125
				],
				[
					-43.35546875,
					11.64453125
				],
				[
					-45.82421875,
					14.12109375
				],
				[
					-48.4296875,
					17.19140625
				],
				[
					-51.171875,
					21.3125
				],
				[
					-52.90625,
					24.703125
				],
				[
					-55.3671875,
					32.6640625
				],
				[
					-56.4609375,
					40.34375
				],
				[
					-56.4609375,
					44.46484375
				],
				[
					-56.4609375,
					46.75390625
				],
				[
					-55.03515625,
					49.6015625
				],
				[
					-54.11328125,
					50.5234375
				],
				[
					-52.3671875,
					51.21484375
				],
				[
					-49.6171875,
					51.62890625
				],
				[
					-44.30859375,
					51.62890625
				],
				[
					-35.52734375,
					51.12890625
				],
				[
					-28.66796875,
					50.08203125
				],
				[
					-26.375,
					48.94140625
				],
				[
					-25.8203125,
					48.39453125
				],
				[
					-25.49609375,
					47.48046875
				],
				[
					-25.12890625,
					45.7421875
				],
				[
					-25.12890625,
					41.71875
				],
				[
					-25.12890625,
					38.9765625
				],
				[
					-27.18359375,
					33.49609375
				],
				[
					-29.375,
					29.56640625
				],
				[
					-32.75390625,
					24.76953125
				],
				[
					-37.50390625,
					19.515625
				],
				[
					-41.5234375,
					16.2265625
				],
				[
					-45.63671875,
					13.484375
				],
				[
					-47.921875,
					12.34375
				],
				[
					-51.8515625,
					11.93359375
				],
				[
					-55.96484375,
					11.93359375
				],
				[
					-61.4453125,
					12.34765625
				],
				[
					-66.37890625,
					14.73046875
				],
				[
					-73.82421875,
					19.85546875
				],
				[
					-77.296875,
					23.703125
				],
				[
					-78.84765625,
					26.453125
				],
				[
					-81.72265625,
					33.59375
				],
				[
					-82.6328125,
					38.53515625
				],
				[
					-83.04296875,
					41.83203125
				],
				[
					-83.63671875,
					48.23828125
				],
				[
					-84.2734375,
					55.6484375
				],
				[
					-84.68359375,
					59.5859375
				],
				[
					-84.68359375,
					65.9921875
				],
				[
					-84.68359375,
					70.5703125
				],
				[
					-84.68359375,
					80.453125
				],
				[
					-84.22265625,
					85.03125
				],
				[
					-81.10546875,
					95.375
				],
				[
					-79.1796875,
					100.68359375
				],
				[
					-74.37109375,
					109.1484375
				],
				[
					-73.546875,
					110.796875
				],
				[
					-68.59765625,
					117.94140625
				],
				[
					-61.9609375,
					125.26171875
				],
				[
					-57.61328125,
					128.6484375
				],
				[
					-55.09765625,
					130.66015625
				],
				[
					-46.81640625,
					135.78125
				],
				[
					-45.89453125,
					136.375
				],
				[
					-45.6171875,
					136.6484375
				],
				[
					-45.33984375,
					136.921875
				],
				[
					-43.68359375,
					137.55859375
				],
				[
					-42.58203125,
					138.2890625
				],
				[
					-40.8359375,
					138.65234375
				],
				[
					-40.8359375,
					138.65234375
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "freedraw",
			"version": 263,
			"versionNonce": 934135753,
			"isDeleted": false,
			"id": "vMzQApKZolOKwlFJSzKKS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2597.871552575222,
			"y": -1007.4753174366263,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 20.19921875,
			"height": 38.51953125,
			"seed": 555743207,
			"groupIds": [
				"PYHkXZ7RGu46iqKn8xIA2"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0.32421875,
					0.64453125
				],
				[
					1.24609375,
					1.56640625
				],
				[
					2.21484375,
					2.85546875
				],
				[
					3.59375,
					4.6015625
				],
				[
					4.65234375,
					6.89453125
				],
				[
					5.7109375,
					8.640625
				],
				[
					6.6796875,
					9.9296875
				],
				[
					8.10546875,
					12.77734375
				],
				[
					9.1640625,
					14.5234375
				],
				[
					9.53125,
					15.90234375
				],
				[
					10.54296875,
					17.64453125
				],
				[
					10.8671875,
					18.92578125
				],
				[
					11.46875,
					19.83984375
				],
				[
					11.46875,
					20.38671875
				],
				[
					11.74609375,
					20.66015625
				],
				[
					11.74609375,
					20.93359375
				],
				[
					12.0234375,
					20.93359375
				],
				[
					12.0234375,
					21.20703125
				],
				[
					10.7890625,
					22.44140625
				],
				[
					7.86328125,
					24.54296875
				],
				[
					3.5234375,
					27.921875
				],
				[
					-0.81640625,
					31.7578125
				],
				[
					-4.2890625,
					34.40625
				],
				[
					-7.21484375,
					36.96484375
				],
				[
					-8.17578125,
					38.24609375
				],
				[
					-8.17578125,
					38.51953125
				],
				[
					-8.17578125,
					38.51953125
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "text",
			"version": 296,
			"versionNonce": 952776007,
			"isDeleted": false,
			"id": "atkFaJzr",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2642.992646325222,
			"y": -1145.6276611866265,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 181.74790954589844,
			"height": 35,
			"seed": 1514562311,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "\"Task Group\"",
			"rawText": "\"Task Group\"",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "\"Task Group\"",
			"lineHeight": 1.25,
			"baseline": 25
		},
		{
			"type": "rectangle",
			"version": 2259,
			"versionNonce": 940828329,
			"isDeleted": false,
			"id": "sb5yp8f_yMIPFl9-oezSG",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3492.820663892743,
			"y": -737.7061450205504,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 1974626855,
			"groupIds": [
				"asP0SCDfHN8AinRr2XqX6",
				"l9mdz-2v2TnrkWGdFGbR8",
				"5Crg5QsrX5h2h8vzdXj4h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1624,
			"versionNonce": 1887564903,
			"isDeleted": false,
			"id": "0OIYUrCdlZRENhZZRux51",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3514.606793120576,
			"y": -716.4999429544243,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 1347456327,
			"groupIds": [
				"D1LnH6SFenkxH0ZE5Q8z4",
				"l9mdz-2v2TnrkWGdFGbR8",
				"5Crg5QsrX5h2h8vzdXj4h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1948,
			"versionNonce": 1209215369,
			"isDeleted": false,
			"id": "3HCsqLDl2ksaldji8F6ze",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 3525.686678030617,
			"y": -698.4977946703186,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 1971145831,
			"groupIds": [
				"XqmjUSg7JyccjyJGAVxih",
				"D1LnH6SFenkxH0ZE5Q8z4",
				"l9mdz-2v2TnrkWGdFGbR8",
				"5Crg5QsrX5h2h8vzdXj4h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 1963,
			"versionNonce": 1429524359,
			"isDeleted": false,
			"id": "Vvc70W7yRaCNDBeUza8Rm",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 3544.2161204029508,
			"y": -717.2679407262306,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 1359292295,
			"groupIds": [
				"VkkPsVT3KdDBBxvoUwdO0",
				"D1LnH6SFenkxH0ZE5Q8z4",
				"l9mdz-2v2TnrkWGdFGbR8",
				"5Crg5QsrX5h2h8vzdXj4h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 2109,
			"versionNonce": 1625755753,
			"isDeleted": false,
			"id": "5E1OkNyZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3438.7113963252223,
			"y": -665.4241773527021,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 175.67987060546875,
			"height": 24,
			"seed": 556048039,
			"groupIds": [
				"5Crg5QsrX5h2h8vzdXj4h"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 1",
			"rawText": "Python Instance 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 1",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "rectangle",
			"version": 2322,
			"versionNonce": 1361004199,
			"isDeleted": false,
			"id": "NoBwEPin0nXReR65JdZYQ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3491.3698887462588,
			"y": -611.2898852549254,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 680014279,
			"groupIds": [
				"91--zeCRbwP8uxCmgvIfm",
				"j-NfZ_o1BR_hgh8kBZ9UZ",
				"937esg76HQm6j23qzpJ9U"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1687,
			"versionNonce": 1213930313,
			"isDeleted": false,
			"id": "MEII5kFtSH0lmqCoQZLys",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3513.1560179740914,
			"y": -590.0836831887993,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 541876455,
			"groupIds": [
				"ss6ty5J0EJ2-Qyhojkw__",
				"j-NfZ_o1BR_hgh8kBZ9UZ",
				"937esg76HQm6j23qzpJ9U"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2011,
			"versionNonce": 1391319495,
			"isDeleted": false,
			"id": "LrWjui-VsYaLMLPMRlzjI",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 3524.235902884132,
			"y": -572.0815349046936,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 1778232327,
			"groupIds": [
				"m6OZ8KSIvth7PS0BPgW0x",
				"ss6ty5J0EJ2-Qyhojkw__",
				"j-NfZ_o1BR_hgh8kBZ9UZ",
				"937esg76HQm6j23qzpJ9U"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 2026,
			"versionNonce": 2127219241,
			"isDeleted": false,
			"id": "rMeZuMFu6LCOXJFUgPRZ6",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 3542.7653452564664,
			"y": -590.8516809606056,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 26776359,
			"groupIds": [
				"Bbf1650u6leRt9vZt7Eyj",
				"ss6ty5J0EJ2-Qyhojkw__",
				"j-NfZ_o1BR_hgh8kBZ9UZ",
				"937esg76HQm6j23qzpJ9U"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 2177,
			"versionNonce": 1069353191,
			"isDeleted": false,
			"id": "MAipWPUq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3437.260621178738,
			"y": -538.0079175870771,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 184.49986267089844,
			"height": 24,
			"seed": 797546055,
			"groupIds": [
				"937esg76HQm6j23qzpJ9U"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 2",
			"rawText": "Python Instance 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 2",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "rectangle",
			"version": 2322,
			"versionNonce": 1830919433,
			"isDeleted": false,
			"id": "3F6uWPx9QAUUDB0HNUbbJ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3491.9753574962588,
			"y": -477.07504150492537,
			"strokeColor": "#000000",
			"backgroundColor": "#fd7e1488",
			"width": 64.46115236495699,
			"height": 64.39942473426015,
			"seed": 2058171751,
			"groupIds": [
				"rBqu6tUCKtAWwwTaEXroz",
				"F-GkDwZO_3vzsDrwAuBej",
				"yHGDG-9ykV7M0T6sWHkZ8"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1687,
			"versionNonce": 622416903,
			"isDeleted": false,
			"id": "fDgycybLWEEaEXZoPqUiy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3513.7614867240914,
			"y": -455.86883943879934,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 21.136985907710482,
			"height": 21.58982944276917,
			"seed": 1515188359,
			"groupIds": [
				"M1fFKz61C-0C_xGHvtjT5",
				"F-GkDwZO_3vzsDrwAuBej",
				"yHGDG-9ykV7M0T6sWHkZ8"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2011,
			"versionNonce": 1390089193,
			"isDeleted": false,
			"id": "12DC3zctWMkVlQTxi-TTY",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 3524.841371634132,
			"y": -437.8666911546936,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520286,
			"height": 21.325685740313624,
			"seed": 674121639,
			"groupIds": [
				"7ZHlAaSFZK7oMnpFSWxQY",
				"M1fFKz61C-0C_xGHvtjT5",
				"F-GkDwZO_3vzsDrwAuBej",
				"yHGDG-9ykV7M0T6sWHkZ8"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "line",
			"version": 2026,
			"versionNonce": 721369895,
			"isDeleted": false,
			"id": "0shemmFmVlH0Uj4wA0R90",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 3543.3708140064664,
			"y": -456.63683721060556,
			"strokeColor": "#000",
			"backgroundColor": "#ff00",
			"width": 21.298113442520282,
			"height": 21.325685740313624,
			"seed": 1383381703,
			"groupIds": [
				"ydKb1HtUdA4ioQEEqf5mx",
				"M1fFKz61C-0C_xGHvtjT5",
				"F-GkDwZO_3vzsDrwAuBej",
				"yHGDG-9ykV7M0T6sWHkZ8"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.05533508667380005,
					-8.330350296057105
				],
				[
					-21.16993868276674,
					-8.49388689455444
				],
				[
					-21.242778355846482,
					12.60784310791851
				],
				[
					-12.973972126229569,
					12.831798845759185
				]
			]
		},
		{
			"type": "text",
			"version": 2174,
			"versionNonce": 1946332873,
			"isDeleted": false,
			"id": "6fYx5VNZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3437.866089928738,
			"y": -404.79307383707715,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 183.87986755371094,
			"height": 24,
			"seed": 1304414695,
			"groupIds": [
				"yHGDG-9ykV7M0T6sWHkZ8"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Python Instance 3",
			"rawText": "Python Instance 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Python Instance 3",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "rectangle",
			"version": 1634,
			"versionNonce": 1171996231,
			"isDeleted": false,
			"id": "PWvvY7xhG2t8p-oI4JPLw",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3191.0277720576437,
			"y": -582.8838047050735,
			"strokeColor": "#000000",
			"backgroundColor": "#e6498088",
			"width": 64.65338134765624,
			"height": 64.65338134765624,
			"seed": 1193014535,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "2vxNcQevVDI4DxGvB8Bxc",
					"type": "arrow"
				},
				{
					"id": "UJ1YWrzTj5Vft9Sjmd_oW",
					"type": "arrow"
				},
				{
					"id": "aiLREU9yIfryKYq3SJzhc",
					"type": "arrow"
				}
			],
			"updated": 1699313954102,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 2101,
			"versionNonce": 120843689,
			"isDeleted": false,
			"id": "pb3oDDmtp0pyAC26A4wvJ",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3215.9242724031265,
			"y": -562.7877091820474,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 15.16932105348633,
			"height": 0,
			"seed": 369474599,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					15.16932105348633,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2152,
			"versionNonce": 680123751,
			"isDeleted": false,
			"id": "qmodtNhEree_Izxbqkna6",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3214.4523780496847,
			"y": -538.0088146635512,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 17.13783740126311,
			"height": 0,
			"seed": 1852415815,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					17.13783740126311,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1998,
			"versionNonce": 1671057545,
			"isDeleted": false,
			"id": "i7uOmCq4VZePzrsQADdNN",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3197.651828441373,
			"y": -566.9583697485864,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 16.95504631353927,
			"height": 48.41270068259871,
			"seed": 1386487399,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					16.95504631353927,
					-7.400560664373661
				],
				[
					16.871549804500688,
					41.01214001822505
				],
				[
					0.08056087780811456,
					33.450908214315675
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1946,
			"versionNonce": 1985452167,
			"isDeleted": false,
			"id": "W-sAaZj6SHtl55dcTYCFS",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3232.112872120673,
			"y": -574.5439812077934,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 16.976775286010504,
			"height": 48.27905988118746,
			"seed": 1166129543,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.1970252545028261,
					48.27905988118746
				],
				[
					16.961573619999825,
					40.954321999069336
				],
				[
					16.976775286010504,
					7.507893438730637
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1671,
			"versionNonce": 1861310313,
			"isDeleted": false,
			"id": "psrZWIip3iytU8LMokIps",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3218.7938403341873,
			"y": -544.4083416450972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 9.101119485207235,
			"height": 12.203935908273408,
			"seed": 1010757799,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					9.101119485207235,
					-12.203935908273408
				]
			]
		},
		{
			"type": "line",
			"version": 1789,
			"versionNonce": 889253799,
			"isDeleted": false,
			"id": "0sXEtl1Ydi2CNfI8lrIU_",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3226.6023543389942,
			"y": -554.2770955635406,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.016669064250991,
			"height": 8.41385706862771,
			"seed": 1351107527,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.00572174417704,
					4.3706612125143
				],
				[
					-0.010947320073949565,
					8.41385706862771
				]
			]
		},
		{
			"type": "line",
			"version": 1929,
			"versionNonce": 1266975305,
			"isDeleted": false,
			"id": "SR7Zfw2mbyF90GlAy3ifi",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 3214.796537737862,
			"y": -554.820478916291,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 5.016669064250991,
			"height": 8.41385706862771,
			"seed": 846869223,
			"groupIds": [
				"c87WtqxzZsQ_u_Dhzbp35",
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					5.00572174417704,
					4.3706612125143
				],
				[
					-0.010947320073949565,
					8.41385706862771
				]
			]
		},
		{
			"type": "text",
			"version": 1618,
			"versionNonce": 590528519,
			"isDeleted": false,
			"id": "01Qf3tsq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3156.6044551020773,
			"y": -514.822689543179,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 133.4999237060547,
			"height": 24,
			"seed": 1520516615,
			"groupIds": [
				"-UfJPGX3Iv69ls9QdL_at"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "aiLREU9yIfryKYq3SJzhc",
					"type": "arrow"
				},
				{
					"id": "mJA4N8ucVH4bOnsSZ9l1U",
					"type": "arrow"
				}
			],
			"updated": 1699313959554,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "API Gateway",
			"rawText": "API Gateway",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "API Gateway",
			"lineHeight": 1.2,
			"baseline": 17
		},
		{
			"type": "text",
			"version": 507,
			"versionNonce": 1177506089,
			"isDeleted": false,
			"id": "qSKx2fqJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3051.2849789890147,
			"y": -1206.1679654868146,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 407.8111572265625,
			"height": 88.23401131849592,
			"seed": 2079974695,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 70.58720905479673,
			"fontFamily": 1,
			"text": "V.2 upgrade",
			"rawText": "V.2 upgrade",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "V.2 upgrade",
			"lineHeight": 1.25,
			"baseline": 62
		},
		{
			"type": "arrow",
			"version": 663,
			"versionNonce": 1946710503,
			"isDeleted": false,
			"id": "2vxNcQevVDI4DxGvB8Bxc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3087.980901876209,
			"y": -628.0466598273292,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 99.78618421052636,
			"height": 50.76055876695635,
			"seed": 904964167,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "Dq6JIpYKfCsqOlSK0-w-M",
				"focus": -0.23280911633402562,
				"gap": 1.8704840871484976
			},
			"endBinding": {
				"elementId": "PWvvY7xhG2t8p-oI4JPLw",
				"focus": 0.17686571852389854,
				"gap": 3.2606859709085256
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					99.78618421052636,
					50.76055876695635
				]
			]
		},
		{
			"type": "arrow",
			"version": 694,
			"versionNonce": 73221129,
			"isDeleted": false,
			"id": "UJ1YWrzTj5Vft9Sjmd_oW",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3090.460342665682,
			"y": -535.9313101097473,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 91.29029123406679,
			"height": 1.6946133557034173,
			"seed": 107087719,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "b2SpyCt1ZkIWgudcpQql1",
				"focus": 0.07589139193096803,
				"gap": 2.931051195135069
			},
			"endBinding": {
				"elementId": "PWvvY7xhG2t8p-oI4JPLw",
				"focus": -0.36927105785681974,
				"gap": 9.27713815789457
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					91.29029123406679,
					-1.6946133557034173
				]
			]
		},
		{
			"type": "arrow",
			"version": 688,
			"versionNonce": 1846516999,
			"isDeleted": false,
			"id": "aiLREU9yIfryKYq3SJzhc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3087.7218558235772,
			"y": -408.12733994896143,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 87.9235197368422,
			"height": 73.13322368421052,
			"seed": 2073723527,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "01Qf3tsq",
				"focus": 0.2683800856297828,
				"gap": 9.562125910007012
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					87.9235197368422,
					-73.13322368421052
				]
			]
		},
		{
			"type": "text",
			"version": 506,
			"versionNonce": 1519601479,
			"isDeleted": false,
			"id": "EDXoliCN",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2977.1825254916744,
			"y": -673.5590833700144,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 59.899932861328125,
			"height": 25,
			"seed": 227378951,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- shop",
			"rawText": "- shop",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- shop",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 593,
			"versionNonce": 1084028073,
			"isDeleted": false,
			"id": "CStPzltt",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2976.805606498176,
			"y": -639.6281623173827,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 88.0198974609375,
			"height": 25,
			"seed": 2088046119,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- deposit",
			"rawText": "- deposit",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- deposit",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 562,
			"versionNonce": 1532544615,
			"isDeleted": false,
			"id": "yzHjuiui",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2978.141955182387,
			"y": -569.1717478436985,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 80.97991943359375,
			"height": 25,
			"seed": 790540615,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- coupon",
			"rawText": "- coupon",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- coupon",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 555,
			"versionNonce": 944404361,
			"isDeleted": false,
			"id": "HjkYbd0j",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2978.7628433402815,
			"y": -538.349379422646,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 80.01992797851562,
			"height": 25,
			"seed": 518451303,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- vendor",
			"rawText": "- vendor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- vendor",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 634,
			"versionNonce": 560030087,
			"isDeleted": false,
			"id": "mCtjqFjx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2977.6225211067804,
			"y": -452.14872152790895,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 68.81993103027344,
			"height": 25,
			"seed": 1704610695,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- order",
			"rawText": "- order",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- order",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "text",
			"version": 712,
			"versionNonce": 688168553,
			"isDeleted": false,
			"id": "4uwpAllq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2978.2337653084405,
			"y": -420.306616264751,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 72.63992309570312,
			"height": 25,
			"seed": 796213927,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [
				{
					"id": "mOHat2U8VASJDwOifIGSe",
					"type": "arrow"
				}
			],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "- goods",
			"rawText": "- goods",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "- goods",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "line",
			"version": 341,
			"versionNonce": 1307154599,
			"isDeleted": false,
			"id": "ZTUOjK2AOpyJOTLg-g3BC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3129.6379742446297,
			"y": -440.0480841923827,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 1.484375,
			"height": 163.75822368421063,
			"seed": 1831097799,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-1.484375,
					163.75822368421063
				]
			]
		},
		{
			"type": "text",
			"version": 858,
			"versionNonce": 295102793,
			"isDeleted": false,
			"id": "NYWIcKuE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2883.2935151299944,
			"y": -250.59486112320272,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 436.73846435546875,
			"height": 151.81876686765773,
			"seed": 1170474215,
			"groupIds": [
				"879fHqAKWjyp0bb689rLp"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699313954102,
			"link": null,
			"locked": false,
			"fontSize": 20.24250224902103,
			"fontFamily": 1,
			"text": "curl -X POST \"https://{endpoint}/api/spark\"\n    request-body {\n        task: order\n        option: all\n    }\n",
			"rawText": "curl -X POST \"https://{endpoint}/api/spark\"\n    request-body {\n        task: order\n        option: all\n    }\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "curl -X POST \"https://{endpoint}/api/spark\"\n    request-body {\n        task: order\n        option: all\n    }\n",
			"lineHeight": 1.25,
			"baseline": 144
		},
		{
			"type": "rectangle",
			"version": 782,
			"versionNonce": 980758919,
			"isDeleted": false,
			"id": "43uqg5QTgXMcYB5lNsToR",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2875.35882047786,
			"y": -269.0062159648287,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 502.04134890270626,
			"height": 183.917214162152,
			"seed": 1222692871,
			"groupIds": [
				"879fHqAKWjyp0bb689rLp"
			],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315012344,
			"link": null,
			"locked": false
		},
		{
			"type": "arrow",
			"version": 122,
			"versionNonce": 872638631,
			"isDeleted": false,
			"id": "mJA4N8ucVH4bOnsSZ9l1U",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3222.088418576243,
			"y": -480.7329868156554,
			"strokeColor": "#f08c00",
			"backgroundColor": "black",
			"width": 0.3542987342698325,
			"height": 161.7307754235544,
			"seed": 1910996169,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315012344,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "01Qf3tsq",
				"focus": 0.01968348966679507,
				"gap": 10.089702727523559
			},
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3542987342698325,
					161.7307754235544
				]
			]
		},
		{
			"type": "arrow",
			"version": 870,
			"versionNonce": 798501415,
			"isDeleted": false,
			"id": "fshZDiAXGgY65qvpcxx5q",
			"fillStyle": "hachure",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3222.5658972788447,
			"y": -318.117298240306,
			"strokeColor": "#f08c00",
			"backgroundColor": "black",
			"width": 237.1797508360637,
			"height": 31.559227082805535,
			"seed": 1794967815,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315016829,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					237.1797508360637,
					31.559227082805535
				]
			]
		},
		{
			"type": "rectangle",
			"version": 624,
			"versionNonce": 1375557161,
			"isDeleted": false,
			"id": "MKsomH_trrH-dt2mmz9D6",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 3464.720979122376,
			"y": -223.5929088679776,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 401.53505041437376,
			"height": 451.1582193031937,
			"seed": 1773723399,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 3359,
			"versionNonce": 1378003209,
			"isDeleted": false,
			"id": "hYeo7Do-XAjq2Wl3zTJtM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3503.792425024966,
			"y": -272.47194128699675,
			"strokeColor": "#000000",
			"backgroundColor": "#000000",
			"width": 22.299363896566742,
			"height": 31.113431660423082,
			"seed": 1769301543,
			"groupIds": [
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.1826756436113515,
					-3.799943902439677
				],
				[
					-11.123030811516896,
					-4.1378600093244415
				],
				[
					-16.309717880715393,
					0.10058365287475546
				],
				[
					-17.45525583017779,
					5.7286187019440655
				],
				[
					-14.167138921415363,
					10.945173722738392
				],
				[
					-9.72868952710939,
					15.60186894167256
				],
				[
					-9.199251488116175,
					19.447936723162247
				],
				[
					-12.191465837325891,
					21.58957716497457
				],
				[
					-15.425855499681473,
					20.43192871792655
				],
				[
					-17.578312793395067,
					18.012002908257966
				],
				[
					-22.299363896566742,
					20.694205006655988
				],
				[
					-19.62763796872423,
					25.20808537614717
				],
				[
					-13.585046464651477,
					26.975571651098644
				],
				[
					-6.48959800354875,
					24.143477475513183
				],
				[
					-2.9433164532902474,
					17.227565507696287
				],
				[
					-5.356711135453521,
					11.29141197395553
				],
				[
					-8.893716663674377,
					7.4571981618454934
				],
				[
					-11.66206099313596,
					4.047086415038242
				],
				[
					-10.788179017239305,
					1.2595328699807267
				],
				[
					-7.481711955210956,
					0.9094350926391597
				],
				[
					-4.375065701382292,
					3.378779127309117
				],
				[
					-0.3457574814495564,
					0.3375581197292129
				]
			]
		},
		{
			"type": "line",
			"version": 3118,
			"versionNonce": 198877161,
			"isDeleted": false,
			"id": "cU1QW69-Sce3Nli_Qa7Vd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3544.5145704954966,
			"y": -253.33573767969483,
			"strokeColor": "#000000",
			"backgroundColor": "#000000",
			"width": 23.494052291560436,
			"height": 22.405256824682102,
			"seed": 1247021383,
			"groupIds": [
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-1.582939071476149,
					6.662285651855003
				],
				[
					-10.236042003196754,
					6.805614733753594
				],
				[
					-15.318173799688793,
					2.6006877536638813
				],
				[
					-16.301512158679277,
					-3.1721481229618114
				],
				[
					-14.856341109963907,
					-8.64118394053428
				],
				[
					-11.241409992545218,
					-12.990209331941895
				],
				[
					-6.673263760442632,
					-15.411579129894726
				],
				[
					0.161960263057761,
					-15.479123912861658
				],
				[
					5.392712784387053,
					-11.773912884537072
				],
				[
					7.192540132881157,
					-6.7910900475614175
				],
				[
					6.597454102107998,
					-1.156261784105832
				],
				[
					5.583148226519953,
					5.725761682471179
				],
				[
					3.2505590594605343,
					6.9261329118204475
				],
				[
					0.8158013045472505,
					5.891414685127631
				],
				[
					1.5286753905781367,
					0.11764408257253733
				],
				[
					1.9312873017103844,
					-5.443433356135478
				],
				[
					-0.09095340229453974,
					-9.73355403044389
				],
				[
					-4.699735852519538,
					-10.76861877252275
				],
				[
					-8.689045945776115,
					-8.955581439442481
				],
				[
					-11.300475958858442,
					-3.743279668693041
				],
				[
					-8.794045898502013,
					1.5634693550371508
				],
				[
					-3.966321651106405,
					2.269971881597037
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 2571,
			"versionNonce": 2100345545,
			"isDeleted": false,
			"id": "AMPJdI7orv_qfYDL4pcdU",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3565.471529425804,
			"y": -268.4534384482221,
			"strokeColor": "#000000",
			"backgroundColor": "#000000",
			"width": 12.418293110060562,
			"height": 22.15302851849142,
			"seed": 1504790631,
			"groupIds": [
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.718522608373322,
					-0.02144849052439657
				],
				[
					-8.0858315494782,
					1.4799006831987662
				],
				[
					-10.359304782391366,
					4.632732573491799
				],
				[
					-11.238665403379262,
					9.158226621577674
				],
				[
					-12.41829311006056,
					19.174375191659017
				],
				[
					-12.292095072535204,
					22.131580027967026
				],
				[
					-8.110928486615329,
					21.886016037480907
				],
				[
					-6.820411844307365,
					15.592575454486008
				],
				[
					-5.490644703955286,
					6.884755352272542
				],
				[
					-4.047853596040121,
					5.102060312663467
				],
				[
					-0.7506716414495322,
					4.589837556051037
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 1960,
			"versionNonce": 1455454633,
			"isDeleted": false,
			"id": "BVk59QOQ9TJvZUGpjuXds",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3574.39833001028,
			"y": -276.0916562575643,
			"strokeColor": "#000000",
			"backgroundColor": "#000000",
			"width": 21.842700613666278,
			"height": 30.063940096362284,
			"seed": 89760647,
			"groupIds": [
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-6.024876967744682,
					4.009868972633223
				],
				[
					-9.430243172885282,
					29.943039542863765
				],
				[
					-3.989718265451465,
					29.94303954286377
				],
				[
					-2.3172612236538255,
					18.034333178462603
				],
				[
					5.62187573768162,
					29.94303954286375
				],
				[
					12.412457440780996,
					30.063940096362288
				],
				[
					2.1762099629735143,
					15.495421554993488
				],
				[
					8.382437760965997,
					8.624240712759102
				],
				[
					7.49583616170484,
					3.344915928391309
				],
				[
					-1.6321574722301344,
					13.2587613152707
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "line",
			"version": 3684,
			"versionNonce": 699751561,
			"isDeleted": false,
			"id": "xyWa6tVR_cHs-SPp98lsa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3572.827111643802,
			"y": -276.9577614304902,
			"strokeColor": "#d9480f",
			"backgroundColor": "#fd7e14",
			"width": 44.7916144144986,
			"height": 37.202840061387775,
			"seed": 1300863655,
			"groupIds": [
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-4.705001212478338,
					3.1994008244852674
				],
				[
					-7.622101964214906,
					3.011200775986134
				],
				[
					-13.60082102109283,
					0.029120706161290144
				],
				[
					-15.62060402542808,
					-3.0504137345867743
				],
				[
					-13.456586401688908,
					-6.217881059085521
				],
				[
					-4.046301042731372,
					-9.410002424956671
				],
				[
					-1.4058990912463294,
					-11.025942812249305
				],
				[
					-0.47050012124783436,
					-14.491403734433273
				],
				[
					0.9723678744804651,
					-22.207606440823962
				],
				[
					3.2935008487348316,
					-24.74830709556226
				],
				[
					6.91327023765393,
					-23.704530977088318
				],
				[
					12.076170735929338,
					-15.714704049677643
				],
				[
					14.679603782932409,
					-14.836437635299156
				],
				[
					24.371909152342628,
					-17.314404461920287
				],
				[
					27.477209952578324,
					-17.502604510419406
				],
				[
					29.171010389070524,
					-15.244203928429796
				],
				[
					26.7244097585818,
					-11.103802861448862
				],
				[
					20.505965519309996,
					-3.8406735201275097
				],
				[
					20.79610823085909,
					-0.4391324892630397
				],
				[
					24.842409273590455,
					7.5280019399653355
				],
				[
					24.089609079593927,
					11.480202958447146
				],
				[
					20.89244943752249,
					12.45453296582551
				],
				[
					15.76646548418457,
					11.048330158069959
				],
				[
					11.963279233051196,
					9.369746557127796
				],
				[
					11.051477042914376,
					4.489157285601349
				],
				[
					18.56926679061943,
					6.421914729252348
				],
				[
					14.45462136985984,
					-1.4313815852144156
				],
				[
					15.432403976928939,
					-4.830468868712712
				],
				[
					21.168482136160677,
					-11.780597928668623
				],
				[
					11.762503031195834,
					-9.410002424956671
				],
				[
					9.221802376457536,
					-11.041070469184108
				],
				[
					4.848759786033739,
					-17.71332301705676
				],
				[
					3.2571133955627487,
					-8.82571994954144
				],
				[
					1.4449122486303168,
					-6.429176056516464
				],
				[
					-7.91424238273338,
					-3.235191197946372
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 1950,
			"versionNonce": 1439359849,
			"isDeleted": false,
			"id": "fnkJOjHU",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3508.115401256847,
			"y": -281.13141493963496,
			"strokeColor": "#d9480f",
			"backgroundColor": "#000000",
			"width": 5.405426025390625,
			"height": 10.27323417759548,
			"seed": 1995288007,
			"groupIds": [
				"OYpKLxC0pt0QgpNyU_KOs",
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 8.246517354920737,
			"fontFamily": 1,
			"text": "A",
			"rawText": "A",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "A",
			"lineHeight": 1.245766392702174,
			"baseline": 7
		},
		{
			"type": "text",
			"version": 2115,
			"versionNonce": 927764041,
			"isDeleted": false,
			"id": "m2Y18Gau",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3517.227440778859,
			"y": -281.1111374621553,
			"strokeColor": "#d9480f",
			"backgroundColor": "#000000",
			"width": 5.598663330078125,
			"height": 10.579897884389377,
			"seed": 2091015399,
			"groupIds": [
				"OYpKLxC0pt0QgpNyU_KOs",
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 8.47487643194314,
			"fontFamily": 1,
			"text": "P",
			"rawText": "P",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "P",
			"lineHeight": 1.2483837338928128,
			"baseline": 8
		},
		{
			"type": "text",
			"version": 2043,
			"versionNonce": 353754409,
			"isDeleted": false,
			"id": "ZCmL2lnc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3531.83745439827,
			"y": -281.4862740443797,
			"strokeColor": "#d9480f",
			"backgroundColor": "#000000",
			"width": 5.6993865966796875,
			"height": 11.193225297977168,
			"seed": 1110714375,
			"groupIds": [
				"OYpKLxC0pt0QgpNyU_KOs",
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 8.851857870828914,
			"fontFamily": 1,
			"text": "C",
			"rawText": "C",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "C",
			"lineHeight": 1.2645057637972448,
			"baseline": 8
		},
		{
			"type": "text",
			"version": 2103,
			"versionNonce": 1318211593,
			"isDeleted": false,
			"id": "PBAhc6tF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3540.8983348238726,
			"y": -281.82085938461876,
			"strokeColor": "#d9480f",
			"backgroundColor": "#000000",
			"width": 4.8377685546875,
			"height": 11.03989344458022,
			"seed": 94342951,
			"groupIds": [
				"OYpKLxC0pt0QgpNyU_KOs",
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 8.783722724637462,
			"fontFamily": 1,
			"text": "H",
			"rawText": "H",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "H",
			"lineHeight": 1.2568581443963873,
			"baseline": 8
		},
		{
			"type": "text",
			"version": 2009,
			"versionNonce": 1237149417,
			"isDeleted": false,
			"id": "lgwLFpuK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3548.9095778022565,
			"y": -281.43558267128935,
			"strokeColor": "#d9480f",
			"backgroundColor": "#000000",
			"width": 5.7829132080078125,
			"height": 10.733229737786322,
			"seed": 290525767,
			"groupIds": [
				"OYpKLxC0pt0QgpNyU_KOs",
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 8.583440583314472,
			"fontFamily": 1,
			"text": "E",
			"rawText": "E",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "E",
			"lineHeight": 1.2504577428602315,
			"baseline": 8
		},
		{
			"type": "text",
			"version": 1976,
			"versionNonce": 555917769,
			"isDeleted": false,
			"id": "Bry5iz1D",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3523.739432964584,
			"y": -281.01218652544776,
			"strokeColor": "#d9480f",
			"backgroundColor": "#000000",
			"width": 5.405426025390625,
			"height": 10.27323417759548,
			"seed": 774189415,
			"groupIds": [
				"OYpKLxC0pt0QgpNyU_KOs",
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 8.246517354920737,
			"fontFamily": 1,
			"text": "A",
			"rawText": "A",
			"textAlign": "center",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "A",
			"lineHeight": 1.245766392702174,
			"baseline": 7
		},
		{
			"type": "line",
			"version": 2944,
			"versionNonce": 299729065,
			"isDeleted": false,
			"id": "nNB5iR2pufgiXoLIweRs3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3500.5519649135495,
			"y": -239.37159775999737,
			"strokeColor": "#000000",
			"backgroundColor": "#000000",
			"width": 25.646822339239176,
			"height": 29.48693117690851,
			"seed": 1432906887,
			"groupIds": [
				"dJGRAb1L7Fj8tSKjLKaWA"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					2.3546989815728265,
					-17.819110586032444
				],
				[
					4.838521230384583,
					-24.122483725829966
				],
				[
					8.344697105010725,
					-27.31310386803971
				],
				[
					12.622229296655405,
					-29.346684719723275
				],
				[
					17.671121015317595,
					-29.486931176908513
				],
				[
					21.70322311063771,
					-27.69878202654899
				],
				[
					25.06915092307914,
					-23.59655750513599
				],
				[
					25.646822339239176,
					-17.965155546439224
				],
				[
					23.795803198467908,
					-12.517044052516601
				],
				[
					20.833930775162585,
					-9.02199297283616
				],
				[
					17.2503800387624,
					-6.907166505113485
				],
				[
					12.411858808377849,
					-6.0306217339572115
				],
				[
					7.5223175611249316,
					-7.534405610681689
				],
				[
					6.346177466373627,
					-9.78222770490795
				],
				[
					7.2333704913534795,
					-14.409328719143602
				],
				[
					9.12874301819873,
					-12.76627588283872
				],
				[
					12.341736382284942,
					-11.289883940896953
				],
				[
					16.408898085652048,
					-12.026180649868511
				],
				[
					19.28396249544541,
					-14.445441265060786
				],
				[
					20.721493095342648,
					-17.81136907750225
				],
				[
					20.265689300741577,
					-21.2824821340825
				],
				[
					18.197047236011564,
					-23.701742749274786
				],
				[
					14.655811753338428,
					-24.63245212783441
				],
				[
					10.836496968101372,
					-23.491372260997174
				],
				[
					8.298509492019146,
					-20.805159728318486
				],
				[
					7.433089515808571,
					-17.916554321641065
				],
				[
					6.837040869021681,
					-13.98963747045975
				],
				[
					6.100744160050113,
					-8.379759923056618
				],
				[
					4.588252310185477,
					-0.5539707385427439
				],
				[
					0,
					0
				]
			]
		},
		{
			"type": "text",
			"version": 365,
			"versionNonce": 697926537,
			"isDeleted": false,
			"id": "TYkoR3rg",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3484.3612613786854,
			"y": -208.41504559039458,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 145.56651306152344,
			"height": 19.29633750976086,
			"seed": 584532903,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 15.437070007808687,
			"fontFamily": 1,
			"text": "Standalone Cluster",
			"rawText": "Standalone Cluster",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Standalone Cluster",
			"lineHeight": 1.25,
			"baseline": 13
		},
		{
			"type": "rectangle",
			"version": 517,
			"versionNonce": 881994345,
			"isDeleted": false,
			"id": "WYRkyFM166s0rLBjqEpsp",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3676.745795138271,
			"y": -175.28072054024403,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 153.15257352941148,
			"height": 122.85845588235287,
			"seed": 111032007,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 793,
			"versionNonce": 1804793161,
			"isDeleted": false,
			"id": "phb01Pi6",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3688.7614506558493,
			"y": -206.6134411284794,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 126.639892578125,
			"height": 25,
			"seed": 928630247,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "Master Node",
			"rawText": "Master Node",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Master Node",
			"lineHeight": 1.25,
			"baseline": 18
		},
		{
			"type": "rectangle",
			"version": 628,
			"versionNonce": 1643602985,
			"isDeleted": false,
			"id": "xdkllbaqrOdy_N6_d2u-G",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3694.216383373565,
			"y": -128.42686024612647,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 118.99816176470584,
			"height": 63.860294117647065,
			"seed": 1679192327,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"type": "text",
					"id": "gZrYLQ2N"
				}
			],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 556,
			"versionNonce": 169623530,
			"isDeleted": false,
			"id": "gZrYLQ2N",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3721.235491416562,
			"y": -116.49671318730293,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 64.95994567871094,
			"height": 40,
			"seed": 642824231,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699331864122,
			"link": null,
			"locked": false,
			"fontSize": 16,
			"fontFamily": 1,
			"text": "Cluster \nManager",
			"rawText": "Cluster Manager",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "xdkllbaqrOdy_N6_d2u-G",
			"originalText": "Cluster Manager",
			"lineHeight": 1.25,
			"baseline": 34
		},
		{
			"type": "text",
			"version": 900,
			"versionNonce": 1932078569,
			"isDeleted": false,
			"id": "DUPnOZ5y",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3704.007650319796,
			"y": -155.31564701083232,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 97.21522521972656,
			"height": 20.48713235294116,
			"seed": 871701319,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 16.389705882352928,
			"fontFamily": 1,
			"text": "Master JVM",
			"rawText": "Master JVM",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Master JVM",
			"lineHeight": 1.25,
			"baseline": 14
		},
		{
			"type": "rectangle",
			"version": 578,
			"versionNonce": 1467844809,
			"isDeleted": false,
			"id": "CH44B0IxlkiU8GN8nzomF",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3496.9709445757544,
			"y": -129.539863012635,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 102.65160601337084,
			"height": 82.3467573414589,
			"seed": 1365252711,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 902,
			"versionNonce": 709068713,
			"isDeleted": false,
			"id": "xZnr8k10",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3503.212841657307,
			"y": -150.70256457341827,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 90.83851623535156,
			"height": 16.756428515655596,
			"seed": 56505735,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 13.405142812524476,
			"fontFamily": 1,
			"text": "Worker Node 1",
			"rawText": "Worker Node 1",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Worker Node 1",
			"lineHeight": 1.25,
			"baseline": 12
		},
		{
			"type": "rectangle",
			"version": 737,
			"versionNonce": 1973856905,
			"isDeleted": false,
			"id": "06e3ikfuMpDbv6BdRcIZT",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3508.680731091401,
			"y": -106.40551862572704,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 79.75936764418857,
			"height": 54.26979004112787,
			"seed": 19655847,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "NIUQ0bSQ-AODG3K381BV3",
					"type": "arrow"
				}
			],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 981,
			"versionNonce": 901930057,
			"isDeleted": false,
			"id": "U8vo3q8R",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3515.2433976778902,
			"y": -122.15812991641917,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 61.60871887207031,
			"height": 13.731646750513342,
			"seed": 1718992839,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 10.985317400410674,
			"fontFamily": 1,
			"text": "Worker JVM",
			"rawText": "Worker JVM",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Worker JVM",
			"lineHeight": 1.25,
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 605,
			"versionNonce": 530705193,
			"isDeleted": false,
			"id": "gkBT6stooJL3lUtis4mT_",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3498.8097676138386,
			"y": -3.797272093830429,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 102.65160601337084,
			"height": 82.3467573414589,
			"seed": 626536167,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 938,
			"versionNonce": 141336073,
			"isDeleted": false,
			"id": "kt5S9OGq",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3505.051664695391,
			"y": -26.95997365461369,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.74790954589844,
			"height": 16.756428515655596,
			"seed": 945797639,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 13.405142812524476,
			"fontFamily": 1,
			"text": "Worker Node 2",
			"rawText": "Worker Node 2",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Worker Node 2",
			"lineHeight": 1.25,
			"baseline": 12
		},
		{
			"type": "rectangle",
			"version": 722,
			"versionNonce": 790492393,
			"isDeleted": false,
			"id": "PgG35izkWioc9jSPbYG_a",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3510.519554129485,
			"y": 22.60686233420546,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 79.75936764418857,
			"height": 42.80281813484378,
			"seed": 344514855,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "sZ89lR2VJIfdnybh2KK8F",
					"type": "arrow"
				}
			],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1006,
			"versionNonce": 116559529,
			"isDeleted": false,
			"id": "xovgHaNv",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3517.0822207159745,
			"y": 4.58446100238541,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 61.60871887207031,
			"height": 13.731646750513342,
			"seed": 1530930247,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 10.985317400410674,
			"fontFamily": 1,
			"text": "Worker JVM",
			"rawText": "Worker JVM",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Worker JVM",
			"lineHeight": 1.25,
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 624,
			"versionNonce": 350015881,
			"isDeleted": false,
			"id": "wC5Q4PI88Irk57IlAscY8",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3499.9155135542314,
			"y": 117.95516349170435,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 102.65160601337084,
			"height": 82.3467573414589,
			"seed": 1281491815,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 951,
			"versionNonce": 909883497,
			"isDeleted": false,
			"id": "a5Q5EMRC",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3506.157410635784,
			"y": 96.79246193092098,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.33251953125,
			"height": 16.756428515655596,
			"seed": 2017132167,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 13.405142812524476,
			"fontFamily": 1,
			"text": "Worker Node 3",
			"rawText": "Worker Node 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Worker Node 3",
			"lineHeight": 1.25,
			"baseline": 12
		},
		{
			"type": "rectangle",
			"version": 741,
			"versionNonce": 1557840713,
			"isDeleted": false,
			"id": "OCD3I1E6fj6ohZ28Iuv42",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3511.625300069878,
			"y": 149.35929791974007,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 79.75936764418857,
			"height": 42.80281813484378,
			"seed": 830969255,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [
				{
					"id": "4d_LBG0r6LTh6xozYy3Mk",
					"type": "arrow"
				}
			],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 1021,
			"versionNonce": 1406616841,
			"isDeleted": false,
			"id": "d2k1eqM8",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3518.1879666563664,
			"y": 131.3368965879202,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 61.60871887207031,
			"height": 13.731646750513342,
			"seed": 1064585415,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 10.985317400410674,
			"fontFamily": 1,
			"text": "Worker JVM",
			"rawText": "Worker JVM",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Worker JVM",
			"lineHeight": 1.25,
			"baseline": 10
		},
		{
			"type": "freedraw",
			"version": 288,
			"versionNonce": 1096776007,
			"isDeleted": false,
			"id": "MEgq065ur93c5VSvG0gBQ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3453.4501526843806,
			"y": -295.7700385650121,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 18.41064117604833,
			"height": 21.260704069794997,
			"seed": 1335728103,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315026811,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					0.16976045759724911,
					0.16736946523678853
				],
				[
					0.7340346546814089,
					0.7268616775997998
				],
				[
					1.2983088517655688,
					1.0902925163996997
				],
				[
					2.0873363307389354,
					1.6784766370890338
				],
				[
					2.426857245933661,
					2.1805850327994563
				],
				[
					2.59661770353091,
					2.1805850327994563
				],
				[
					2.9361386187256358,
					2.51532396327309
				],
				[
					3.5004128158097956,
					2.87875480207299
				],
				[
					5.3103940327278,
					4.695908996072546
				],
				[
					5.649914947922298,
					5.03064792654618
				],
				[
					5.9894358631170235,
					5.365386857019757
				],
				[
					6.328956778311749,
					5.700125787493334
				],
				[
					6.8932309753956815,
					6.063556626293291
				],
				[
					7.261443798916616,
					6.455679373419514
				],
				[
					7.854409904327213,
					7.043863494108848
				],
				[
					8.418684101411145,
					7.435986241235071
				],
				[
					9.011650206821514,
					8.024170361924405
				],
				[
					9.406163946308425,
					8.387601200724362
				],
				[
					9.944137227426609,
					8.947093413087373
				],
				[
					9.944137227426609,
					9.114462878324161
				],
				[
					12.454679205978664,
					12.024300581083992
				],
				[
					12.79420012117339,
					12.359039511557626
				],
				[
					12.963960578770639,
					12.526408976794414
				],
				[
					13.133721036367888,
					12.693778442031203
				],
				[
					13.303481493965364,
					12.861147907267991
				],
				[
					13.303481493965364,
					13.028517372504837
				],
				[
					13.473241951562613,
					13.195886837741625
				],
				[
					13.643002409159863,
					13.195886837741625
				],
				[
					13.643002409159863,
					13.36325630297847
				],
				[
					13.812762866757339,
					13.530625768215259
				],
				[
					14.152283781952065,
					13.697995233452048
				],
				[
					14.66156515474404,
					14.200103629162413
				],
				[
					9.346389137295091,
					16.37829766960141
				],
				[
					8.674520283987476,
					16.600659959130326
				],
				[
					8.282397536861254,
					16.99278270625655
				],
				[
					7.498152042608808,
					17.18884407981966
				],
				[
					6.938659830245797,
					17.55227491861956
				],
				[
					6.379167617882786,
					17.74833629218267
				],
				[
					5.035429911267329,
					18.417814153129882
				],
				[
					3.691692204651872,
					18.6401764426588
				],
				[
					2.013215567562611,
					19.36464712789808
				],
				[
					0.33473893047357706,
					19.83806361528218
				],
				[
					-2.0705993842152566,
					20.64861002550043
				],
				[
					-3.4143370908307134,
					21.09333460455821
				],
				[
					-3.7490760213042904,
					21.260704069794997
				],
				[
					-3.7490760213042904,
					21.260704069794997
				]
			],
			"lastCommittedPoint": null,
			"simulatePressure": true,
			"pressures": []
		},
		{
			"type": "line",
			"version": 218,
			"versionNonce": 393107145,
			"isDeleted": false,
			"id": "n-8VVUluJZ07qh5LpHcpn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3752.077964778635,
			"y": -52.045106452108826,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 0.3646438912071517,
			"height": 88.89564624445723,
			"seed": 672137991,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					0.3646438912071517,
					88.89564624445723
				]
			]
		},
		{
			"type": "line",
			"version": 238,
			"versionNonce": 250254761,
			"isDeleted": false,
			"id": "Cx3yEPapqzDvko-nrlExg",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3751.890383810858,
			"y": 36.78819135499168,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 109.2911426464234,
			"height": 1.513366615838379,
			"seed": 424151591,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					-109.2911426464234,
					1.513366615838379
				]
			]
		},
		{
			"type": "line",
			"version": 256,
			"versionNonce": 238811273,
			"isDeleted": false,
			"id": "56aAWayEXch2okj5_fKZf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3641.0078465796178,
			"y": -91.07333889077665,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 1.513366615838322,
			"height": 259.28636815379764,
			"seed": 808594759,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": null,
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": null,
			"points": [
				[
					0,
					0
				],
				[
					1.513366615838322,
					259.28636815379764
				]
			]
		},
		{
			"type": "arrow",
			"version": 412,
			"versionNonce": 536785639,
			"isDeleted": false,
			"id": "NIUQ0bSQ-AODG3K381BV3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3641.3641441525288,
			"y": -90.75026062447398,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 48.486301451010604,
			"height": 2.7408015960913303,
			"seed": 673901671,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315020312,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "06e3ikfuMpDbv6BdRcIZT",
				"focus": -0.5691067478382795,
				"gap": 4.437743965928803
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-48.486301451010604,
					-2.7408015960913303
				]
			]
		},
		{
			"type": "arrow",
			"version": 426,
			"versionNonce": 597016071,
			"isDeleted": false,
			"id": "sZ89lR2VJIfdnybh2KK8F",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3642.9937055834407,
			"y": 38.67942728814302,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 48.486301451010604,
			"height": 0.7708534073183841,
			"seed": 486459271,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315020313,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "PgG35izkWioc9jSPbYG_a",
				"focus": -0.17502459986727706,
				"gap": 4.228482358756537
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-48.486301451010604,
					0.7708534073183841
				]
			]
		},
		{
			"type": "arrow",
			"version": 439,
			"versionNonce": 845047079,
			"isDeleted": false,
			"id": "4d_LBG0r6LTh6xozYy3Mk",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3642.7783200725717,
			"y": 167.67645483243672,
			"strokeColor": "#4a4721",
			"backgroundColor": "transparent",
			"width": 48.486301451010604,
			"height": 0.7708534073183841,
			"seed": 2095726247,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699315020313,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "OCD3I1E6fj6ohZ28Iuv42",
				"focus": -0.07411492892674364,
				"gap": 2.907350907494674
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "triangle",
			"points": [
				[
					0,
					0
				],
				[
					-48.486301451010604,
					0.7708534073183841
				]
			]
		},
		{
			"type": "text",
			"version": 1104,
			"versionNonce": 485157897,
			"isDeleted": false,
			"id": "Ojacv7er",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3524.3893864743086,
			"y": -102.66494514697877,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 46.39703369140625,
			"height": 13.179741995939782,
			"seed": 983159239,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false,
			"fontSize": 10.543793596751826,
			"fontFamily": 1,
			"text": "Executor",
			"rawText": "Executor",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Executor",
			"lineHeight": 1.25,
			"baseline": 9
		},
		{
			"type": "rectangle",
			"version": 294,
			"versionNonce": 2057470697,
			"isDeleted": false,
			"id": "fP7Jg7WkXhylp3wjm1zCV",
			"fillStyle": "solid",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3520.349619747515,
			"y": -87.29395813542408,
			"strokeColor": "#1971c2",
			"backgroundColor": "#a5d8ff",
			"width": 14.042928259224254,
			"height": 12.881932366668366,
			"seed": 2106471207,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 341,
			"versionNonce": 788807113,
			"isDeleted": false,
			"id": "u7aJaMJcFhDhOwpUhWoU8",
			"fillStyle": "solid",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3520.5203544375972,
			"y": -70.44737476979378,
			"strokeColor": "#1971c2",
			"backgroundColor": "#a5d8ff",
			"width": 14.042928259224254,
			"height": 12.881932366668366,
			"seed": 1540044359,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 380,
			"versionNonce": 690724009,
			"isDeleted": false,
			"id": "40GeKd2VqKO7nnXaOW2Dx",
			"fillStyle": "solid",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3540.2985454944837,
			"y": -87.057394842029,
			"strokeColor": "#1971c2",
			"backgroundColor": "#a5d8ff",
			"width": 14.042928259224254,
			"height": 12.881932366668366,
			"seed": 1840960871,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 425,
			"versionNonce": 1757683593,
			"isDeleted": false,
			"id": "XrtQUUEml2nol5_7S1DCi",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3540.4692801845667,
			"y": -70.2108114763987,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 14.042928259224254,
			"height": 12.881932366668366,
			"seed": 1521062023,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 323,
			"versionNonce": 1812547177,
			"isDeleted": false,
			"id": "UMzS1gO3AHInNQF73Uz33",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3559.8761232905254,
			"y": -87.5069961925775,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 14.042928259224254,
			"height": 12.881932366668366,
			"seed": 743696295,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 370,
			"versionNonce": 1573294409,
			"isDeleted": false,
			"id": "QtzwPS6QADdKu7b2ECeAi",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 3560.0468579806075,
			"y": -70.66041282694732,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 14.042928259224254,
			"height": 12.881932366668366,
			"seed": 15096519,
			"groupIds": [],
			"frameId": null,
			"roundness": {
				"type": 3
			},
			"boundElements": [],
			"updated": 1699315020026,
			"link": null,
			"locked": false
		}
	],
	"appState": {
		"theme": "dark",
		"viewBackgroundColor": "#ffffff",
		"currentItemStrokeColor": "#f08c00",
		"currentItemBackgroundColor": "black",
		"currentItemFillStyle": "hachure",
		"currentItemStrokeWidth": 2,
		"currentItemStrokeStyle": "solid",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 36,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": null,
		"scrollX": 808.2252915016866,
		"scrollY": 1220.4851254663242,
		"zoom": {
			"value": 0.8231923009506882
		},
		"currentItemRoundness": "round",
		"gridSize": null,
		"gridColor": {
			"Bold": "#C9C9C9FF",
			"Regular": "#EDEDEDFF"
		},
		"currentStrokeOptions": null,
		"previousGridSize": null,
		"frameRendering": {
			"enabled": true,
			"clip": true,
			"name": true,
			"outline": true
		}
	},
	"files": {}
}
```
%%