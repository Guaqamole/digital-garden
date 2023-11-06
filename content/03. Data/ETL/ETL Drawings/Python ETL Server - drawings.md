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

curl -X POST "https://fs_etl/api/resource"
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
			"type": "rectangle",
			"version": 627,
			"versionNonce": 1431198441,
			"isDeleted": false,
			"id": "gDiD1vqR1f21QaTppq-JQ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -446.2580415296869,
			"y": -278.0463701127556,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1884,
			"versionNonce": 830989351,
			"isDeleted": false,
			"id": "WSGNhNaGZxy6Bj1wooESl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -382.95230450928227,
			"y": -337.24775447302324,
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
			"updated": 1699310243521,
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
			"version": 1709,
			"versionNonce": 1987384777,
			"isDeleted": false,
			"id": "lSymWz0z6qNizGCcvsTzq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -393.57100554056353,
			"y": -323.6822386887199,
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
			"updated": 1699310243521,
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
			"version": 2068,
			"versionNonce": 661047111,
			"isDeleted": false,
			"id": "BOW4uUNMvgzidsKfoTgU3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -409.48480098303924,
			"y": -339.83628713766444,
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
			"updated": 1699310243521,
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
			"version": 1929,
			"versionNonce": 2093053097,
			"isDeleted": false,
			"id": "LT1qnEHOR_BQx2rUBkEwK",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.70495167358423,
			"x": -397.83024635869094,
			"y": -340.5054923514759,
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
			"updated": 1699310243521,
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
			"version": 2005,
			"versionNonce": 1102857831,
			"isDeleted": false,
			"id": "ZQ9c6HLgyfxwm_UVU9XFu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -411.8763603690935,
			"y": -313.40660602547774,
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
			"updated": 1699310243521,
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
			"version": 1827,
			"versionNonce": 2078209929,
			"isDeleted": false,
			"id": "iMhIBD2nf9DW_Y4En3PmD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.139830983104382,
			"x": -414.3830524560266,
			"y": -336.17245757988036,
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
			"updated": 1699310243521,
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
			"version": 1979,
			"versionNonce": 1867833735,
			"isDeleted": false,
			"id": "AV3sLxpPYnM9jqwpE-GYb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -385.4721238389069,
			"y": -310.80014350603534,
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
			"updated": 1699310243521,
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
			"version": 1805,
			"versionNonce": 101260905,
			"isDeleted": false,
			"id": "at0rgeBhXcVOJmgCW5COd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5748780603245196,
			"x": -410.16415832605173,
			"y": -319.6044303345264,
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
			"updated": 1699310243521,
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
			"version": 976,
			"versionNonce": 292362407,
			"isDeleted": false,
			"id": "H210zISD2jWqe9XJrR9k7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -395.6648711374397,
			"y": -326.6866094031719,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 967,
			"versionNonce": 1510697289,
			"isDeleted": false,
			"id": "4SVjkKBY",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -360.0558642181486,
			"y": -346.5574795329813,
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
			"updated": 1699310243521,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 921,
			"versionNonce": 766602183,
			"isDeleted": false,
			"id": "hzF5SdRa",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -364.5923514797872,
			"y": -333.8279702715584,
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
			"updated": 1699310243521,
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
			"baseline": 22
		},
		{
			"type": "rectangle",
			"version": 362,
			"versionNonce": 1363236905,
			"isDeleted": false,
			"id": "GBOYVh3dWPdHwN6f2uyj9",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -419.94178552007145,
			"y": -263.8145491992943,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 287,
			"versionNonce": 1614699239,
			"isDeleted": false,
			"id": "43Ohjnk5",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -373.1066667127923,
			"y": -229.46058285314038,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 96.41990661621094,
			"height": 75,
			"seed": 1009368356,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 6258,
			"versionNonce": 227961609,
			"isDeleted": false,
			"id": "2WzW0oph9kZfRUXpLGD8k",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -369.68653923010754,
			"y": -59.31155651885712,
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
			"updated": 1699310243521,
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
			"version": 6981,
			"versionNonce": 228615687,
			"isDeleted": false,
			"id": "2I0zaCq3EH_X5rg6lDfkM",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -369.42060663942357,
			"y": -68.06452467488515,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 245,
			"versionNonce": 1736843753,
			"isDeleted": false,
			"id": "tkJ_KnvSgDUtVayqq9upF",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -401.00530547399774,
			"y": 80.18452790207385,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 223,
			"versionNonce": 1423183143,
			"isDeleted": false,
			"id": "5E5zomj1",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -361.20331936653827,
			"y": 102.63344617130463,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 55.35997009277344,
			"height": 25,
			"seed": 966789924,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 622,
			"versionNonce": 471596233,
			"isDeleted": false,
			"id": "8n_vptMdgse8cTecSIkwu",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -330.54918546189526,
			"y": 56.9073862167329,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.1815832055096962,
			"height": 16.746317882258083,
			"seed": 1195050660,
			"groupIds": [
				"wHksKQRlGsB_ICmElBo8d"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "tkJ_KnvSgDUtVayqq9upF",
				"gap": 6.530823803082868,
				"focus": 0.053130779867938724
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
					16.746317882258083
				]
			]
		},
		{
			"type": "arrow",
			"version": 582,
			"versionNonce": 1095094343,
			"isDeleted": false,
			"id": "wdQHJHYUCe5RRvCNQtZO2",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -330.5661414875907,
			"y": 56.81375704804992,
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
			"updated": 1699310243521,
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
			"version": 1011,
			"versionNonce": 989035433,
			"isDeleted": false,
			"id": "m7bqxFr9pSqgGT9ktxqd7",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -276.27224580935456,
			"y": -28.187683462290522,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1053,
			"versionNonce": 1020407655,
			"isDeleted": false,
			"id": "HsqgUyBGU_SYg-c4xUbzV",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -276.27224580935456,
			"y": -37.05946339054907,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1139,
			"versionNonce": 1412963977,
			"isDeleted": false,
			"id": "zjp8TZgYilvvZ3oDy_zum",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -276.27224580935456,
			"y": -49.69002298526112,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "diamond",
			"version": 1192,
			"versionNonce": 1103473287,
			"isDeleted": false,
			"id": "ZVsPvbY0YgR6Dmykiv_Q-",
			"fillStyle": "solid",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -276.27224580935456,
			"y": -62.221695282558414,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 359,
			"versionNonce": 1722115433,
			"isDeleted": false,
			"id": "nOdG64Gt",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -244.7665372488251,
			"y": -55.393892324541696,
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
			"updated": 1699310243521,
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
			"version": 1057,
			"versionNonce": 1289535911,
			"isDeleted": false,
			"id": "7rmquXcoImBTxaKfaP0_p",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -275.87972673798674,
			"y": -108.2907610463932,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.25553069419078156,
			"height": 23.566046328898196,
			"seed": 1111992100,
			"groupIds": [
				"4nKbo5XP7fQasOmh-16B8"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "GBOYVh3dWPdHwN6f2uyj9",
				"gap": 13.81025238599122,
				"focus": 0.103548037678144
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
					0.25553069419078156,
					23.566046328898196
				]
			]
		},
		{
			"type": "arrow",
			"version": 1038,
			"versionNonce": 226938953,
			"isDeleted": false,
			"id": "K7jsmqbHk3olnjrThXE-p",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 2.5619867103957787,
			"x": -262.0087953618714,
			"y": -63.796171934043116,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": null,
			"endBinding": {
				"elementId": "nOdG64Gt",
				"focus": -0.605391835133429,
				"gap": 10.51669755349613
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
			"version": 399,
			"versionNonce": 256111815,
			"isDeleted": false,
			"id": "EWDj-L6y5Q_dROmmLbwrh",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -91.89369083898112,
			"y": -212.81714272310097,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 361,
			"versionNonce": 1857543977,
			"isDeleted": false,
			"id": "tfxx6AnX",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -38.83212626695001,
			"y": -245.94581626692565,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 57.99993896484375,
			"height": 25,
			"seed": 1067043236,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 861,
			"versionNonce": 1620558823,
			"isDeleted": false,
			"id": "h3lLU5ucjmOXr0Gb9tKis",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -160.09428588483945,
			"y": -28.458456297540636,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "ZVsPvbY0YgR6Dmykiv_Q-",
				"focus": 1.289993537315494,
				"gap": 15.713008798042896
			},
			"endBinding": {
				"elementId": "pFt7Qi1K1AS-Z1ywrKiuN",
				"focus": 0.5725170004071707,
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
			"version": 589,
			"versionNonce": 1755582985,
			"isDeleted": false,
			"id": "Rs4Kp5wzQGGRiFZlsqWHg",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -161.77262834477926,
			"y": -23.745953855084565,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "zjp8TZgYilvvZ3oDy_zum",
				"focus": 0.42550273099081143,
				"gap": 7.759040314649198
			},
			"endBinding": {
				"elementId": "GXtPWSN1F_K5QRZxz5phd",
				"focus": -0.3479804145148524,
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
			"version": 747,
			"versionNonce": 1894035207,
			"isDeleted": false,
			"id": "abn5n_H1Uz4-FAVIc_r9V",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -162.3845942428003,
			"y": -18.565043685484227,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "zjp8TZgYilvvZ3oDy_zum",
				"focus": -0.817089593561974,
				"gap": 12.494251014540307
			},
			"endBinding": {
				"elementId": "rK1ZoUgIcDnM-FVnfgW8E",
				"focus": -0.7201098846423964,
				"gap": 3.840083236929331
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
			"version": 832,
			"versionNonce": 4647145,
			"isDeleted": false,
			"id": "Z2XbQNDM4HSBsAYTQOGyt",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -331.68593669691086,
			"y": -90.46977697133863,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 0.18159628854755283,
			"height": 16.747524451512376,
			"seed": 2019940260,
			"groupIds": [
				"7DUW6uVnxtn0y978TvrfC"
			],
			"frameId": null,
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GBOYVh3dWPdHwN6f2uyj9",
				"gap": 29.63683953564785,
				"focus": 0.08233521180677794
			},
			"endBinding": {
				"elementId": "2I0zaCq3EH_X5rg6lDfkM",
				"gap": 5.659246599515277,
				"focus": 0.021314651672632877
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
					0.18159628854755283,
					16.747524451512376
				]
			]
		},
		{
			"type": "arrow",
			"version": 790,
			"versionNonce": 984036903,
			"isDeleted": false,
			"id": "P327iheXpTWaRXmgpuudh",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -335.3032382226519,
			"y": -90.56340614002164,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 3.3985019066349196,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GBOYVh3dWPdHwN6f2uyj9",
				"gap": 29.54321036696483,
				"focus": -0.08304507274778385
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
					3.3985019066349196,
					-17.722798727512867
				]
			]
		},
		{
			"type": "rectangle",
			"version": 431,
			"versionNonce": 254534601,
			"isDeleted": false,
			"id": "pFt7Qi1K1AS-Z1ywrKiuN",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -70.90999423068536,
			"y": -184.37144415081917,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 423,
			"versionNonce": 885774663,
			"isDeleted": false,
			"id": "GXtPWSN1F_K5QRZxz5phd",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -69.49112054919908,
			"y": -75.49472703598809,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 442,
			"versionNonce": 829325993,
			"isDeleted": false,
			"id": "rK1ZoUgIcDnM-FVnfgW8E",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -69.26251042888919,
			"y": 37.91080199318935,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 407,
			"versionNonce": 1152325735,
			"isDeleted": false,
			"id": "t0WYY15N",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -46.94366202896083,
			"y": -208.4037797653378,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 76.5599365234375,
			"height": 25,
			"seed": 1712754980,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 460,
			"versionNonce": 1941587337,
			"isDeleted": false,
			"id": "5ojQUQBB",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -47.77112931198337,
			"y": -99.29711495502335,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 85.37992858886719,
			"height": 25,
			"seed": 1861274788,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 497,
			"versionNonce": 1880978311,
			"isDeleted": false,
			"id": "I7eH75K9",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": -51.07286323971937,
			"y": 17.1300434904187,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 84.75993347167969,
			"height": 25,
			"seed": 1744279588,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 158,
			"versionNonce": 1095412841,
			"isDeleted": false,
			"id": "Fm0hOq34iVmq2ei3yt4V_",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -440.285400390625,
			"y": -567.679443359375,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 152,
			"versionNonce": 1330866855,
			"isDeleted": false,
			"id": "3r-fbfyy7NRKJlhVHlG8y",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 269.948974609375,
			"y": -279.68725585937494,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "image",
			"version": 209,
			"versionNonce": 300627785,
			"isDeleted": false,
			"id": "VzkZEaDF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 288.031005859375,
			"y": -357.71533203125,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 64.08593750000001,
			"height": 64.08593750000001,
			"seed": 9654,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 96,
			"versionNonce": 1056800199,
			"isDeleted": false,
			"id": "9xZmQz_NnGH__6yjgVUak",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -412.328369140625,
			"y": -523.57080078125,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 56,
			"versionNonce": 1475831337,
			"isDeleted": false,
			"id": "zoXEuq58",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -362.496337890625,
			"y": -553.08642578125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 42.979949951171875,
			"height": 25,
			"seed": 2042575140,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 183,
			"versionNonce": 1379413223,
			"isDeleted": false,
			"id": "MHUidYNs",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -388.82615661621094,
			"y": -508.53955078125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 1941206564,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 243,
			"versionNonce": 777697545,
			"isDeleted": false,
			"id": "Rif7Ie2j",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -390.67159360349183,
			"y": -485.35205078125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 1692746524,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 275,
			"versionNonce": 76544007,
			"isDeleted": false,
			"id": "iynvCUbB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -387.60128110349183,
			"y": -461.34423828125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 250363676,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 324,
			"versionNonce": 1183887337,
			"isDeleted": false,
			"id": "nuRtaRgX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -388.9071731567383,
			"y": -438.37939453125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 1499444124,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 144,
			"versionNonce": 738287399,
			"isDeleted": false,
			"id": "zMWPLR1oAgQC8wGabyhBa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -232.191650390625,
			"y": -524.71142578125,
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
			"updated": 1699310243521,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 123,
			"versionNonce": 379898569,
			"isDeleted": false,
			"id": "7fvKIW9B",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -193.633056640625,
			"y": -554.22705078125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 74.01991271972656,
			"height": 25,
			"seed": 1995446820,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243521,
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
			"version": 238,
			"versionNonce": 720953927,
			"isDeleted": false,
			"id": "600oRdYS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -208.68943786621094,
			"y": -509.68017578125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 55.628570556640625,
			"height": 15.804687500000012,
			"seed": 498152868,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 320,
			"versionNonce": 1194494377,
			"isDeleted": false,
			"id": "QE9AetnH",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -210.53487485349183,
			"y": -486.49267578125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 107.45249938964844,
			"height": 15.804687500000012,
			"seed": 348315940,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 355,
			"versionNonce": 1649607015,
			"isDeleted": false,
			"id": "8BSwiL5s",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -210.46456235349183,
			"y": -462.48486328125,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 118.67683410644531,
			"height": 15.804687500000012,
			"seed": 596843684,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 141,
			"versionNonce": 1634036873,
			"isDeleted": false,
			"id": "2MtEDleSOvfa_aBlcxRkt",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -53.785400390625,
			"y": -525.86767578125,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 117,
			"versionNonce": 1666989191,
			"isDeleted": false,
			"id": "0T1Qkuah",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -9.953369140625,
			"y": -555.38330078125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 65.59992980957031,
			"height": 25,
			"seed": 1014646940,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 228,
			"versionNonce": 1022948201,
			"isDeleted": false,
			"id": "hAiIck0e",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -30.283187866210938,
			"y": -510.83642578125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 97.18885803222656,
			"height": 15.804687500000012,
			"seed": 1742656796,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 288,
			"versionNonce": 1641092007,
			"isDeleted": false,
			"id": "akTKdLJg",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -32.12862485349183,
			"y": -487.64892578125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 82.60231018066406,
			"height": 15.804687500000012,
			"seed": 1073598876,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 320,
			"versionNonce": 775462473,
			"isDeleted": false,
			"id": "CNdgkl8C",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -29.05831235349183,
			"y": -463.64111328125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 98.07365417480469,
			"height": 15.804687500000012,
			"seed": 604585500,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 369,
			"versionNonce": 1709049543,
			"isDeleted": false,
			"id": "BCoKh5hO",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -30.36420440673828,
			"y": -440.67626953125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 70.11399841308594,
			"height": 15.804687500000012,
			"seed": 1022565020,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 142,
			"versionNonce": 1946152233,
			"isDeleted": false,
			"id": "d_f-4zjUhc_7qeX2Bi-JM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 132.093505859375,
			"y": -529.11767578125,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 116,
			"versionNonce": 1042257383,
			"isDeleted": false,
			"id": "mAZg6gvb",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 175.925537109375,
			"y": -558.63330078125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 61.67994689941406,
			"height": 25,
			"seed": 186644900,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 251,
			"versionNonce": 1706713097,
			"isDeleted": false,
			"id": "Bt24Texf",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 155.59571838378906,
			"y": -514.08642578125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 50.572601318359375,
			"height": 15.804687500000012,
			"seed": 1874404644,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 315,
			"versionNonce": 832717063,
			"isDeleted": false,
			"id": "hi5au1j4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 154.75028139650817,
			"y": -490.89892578125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 110.78950500488281,
			"height": 15.804687500000012,
			"seed": 1327554724,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 357,
			"versionNonce": 1633908457,
			"isDeleted": false,
			"id": "20ne5yR4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 156.82059389650817,
			"y": -466.89111328125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 106.10006713867188,
			"height": 15.804687500000012,
			"seed": 1896164388,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 392,
			"versionNonce": 1910671399,
			"isDeleted": false,
			"id": "vqFXMsjQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 155.51470184326172,
			"y": -443.92626953125,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 87.40553283691406,
			"height": 15.804687500000012,
			"seed": 2001995684,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 145,
			"versionNonce": 2038870473,
			"isDeleted": false,
			"id": "Mt3Vv9Fr4fAwq_nSj6hT2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 321.132568359375,
			"y": -526.37548828125,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 110,
			"versionNonce": 1288497991,
			"isDeleted": false,
			"id": "ZTCVHn0S",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 370.964599609375,
			"y": -555.89111328125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 54.039947509765625,
			"height": 25,
			"seed": 1692998428,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 267,
			"versionNonce": 1665110185,
			"isDeleted": false,
			"id": "ioyXguHF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 344.63478088378906,
			"y": -511.62158203125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 96.72119140625,
			"height": 15.804687500000012,
			"seed": 1875859356,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 315,
			"versionNonce": 515762791,
			"isDeleted": false,
			"id": "YvPFn9HE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 342.78934389650817,
			"y": -488.15673828125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 88.32821655273438,
			"height": 15.804687500000012,
			"seed": 733611036,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 351,
			"versionNonce": 607753097,
			"isDeleted": false,
			"id": "osX5h4FE",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 345.85965639650817,
			"y": -464.14892578125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 97.555419921875,
			"height": 15.804687500000012,
			"seed": 1587224732,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 419,
			"versionNonce": 75629959,
			"isDeleted": false,
			"id": "7SZBTyKW",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 344.5537643432617,
			"y": -441.18408203125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 60.065216064453125,
			"height": 15.804687500000012,
			"seed": 1076145436,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "rectangle",
			"version": 173,
			"versionNonce": 11549289,
			"isDeleted": false,
			"id": "enYy36HZzFUt0gf11HFA3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 510.800537109375,
			"y": -527.09814453125,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 155,
			"versionNonce": 1297464487,
			"isDeleted": false,
			"id": "fuIjKTnr",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 556.632568359375,
			"y": -556.61376953125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 60.17994689941406,
			"height": 25,
			"seed": 1301238564,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 282,
			"versionNonce": 695141705,
			"isDeleted": false,
			"id": "E7iKq9dp",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 534.3027496337891,
			"y": -512.06689453125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 45.908416748046875,
			"height": 15.804687500000012,
			"seed": 771837604,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 345,
			"versionNonce": 753242055,
			"isDeleted": false,
			"id": "UsbtZvDD",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 532.4573126465082,
			"y": -488.87939453125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 80.23861694335938,
			"height": 15.804687500000012,
			"seed": 900192804,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 400,
			"versionNonce": 701592617,
			"isDeleted": false,
			"id": "fQ76Lzqz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 535.5276251465082,
			"y": -464.87158203125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 35.40460205078125,
			"height": 15.804687500000012,
			"seed": 795932068,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "text",
			"version": 426,
			"versionNonce": 760086247,
			"isDeleted": false,
			"id": "zk7MJUI3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 534.2217330932617,
			"y": -441.90673828125,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 99.37556457519531,
			"height": 15.804687500000012,
			"seed": 1485480228,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"baseline": 10
		},
		{
			"type": "freedraw",
			"version": 94,
			"versionNonce": 365102857,
			"isDeleted": false,
			"id": "7cxFlzpd3XXwNtkk-tkor",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -394.035400390625,
			"y": -623.03955078125,
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
			"updated": 1699310243522,
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
			"version": 49,
			"versionNonce": 1629194759,
			"isDeleted": false,
			"id": "AiDP4oomG8P7v0wVv2c3y",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -437.906494140625,
			"y": -507.46533203125,
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
			"updated": 1699310243522,
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
			"version": 82,
			"versionNonce": 2009021929,
			"isDeleted": false,
			"id": "ZwwvrrL8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -392.785400390625,
			"y": -645.61767578125,
			"strokeColor": "#1971c2",
			"backgroundColor": "transparent",
			"width": 181.74790954589844,
			"height": 35,
			"seed": 2113669540,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 2045,
			"versionNonce": 1430958375,
			"isDeleted": false,
			"id": "98RXpnT8XLKM6zyGzjzke",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 457.0426171768965,
			"y": -237.6961596151741,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1410,
			"versionNonce": 2127665353,
			"isDeleted": false,
			"id": "ovaVFvzIwdNcHX471CTOB",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 478.8287464047291,
			"y": -216.48995754904809,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1734,
			"versionNonce": 1128789063,
			"isDeleted": false,
			"id": "8WaT3eK99_nIVRtptbjzW",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 489.9086313147697,
			"y": -198.48780926494237,
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
			"updated": 1699310243522,
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
			"version": 1749,
			"versionNonce": 1821743017,
			"isDeleted": false,
			"id": "LRq9Nx8W0TN8YpVuXWo8Y",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 508.4380736871039,
			"y": -217.2579553208543,
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
			"updated": 1699310243522,
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
			"version": 1894,
			"versionNonce": 49271655,
			"isDeleted": false,
			"id": "4Cmku3cn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 402.93334960937517,
			"y": -165.4141919473259,
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
			"updated": 1699310243522,
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
			"version": 2108,
			"versionNonce": 1127660169,
			"isDeleted": false,
			"id": "mNsUF2nkVRKu6Uko_S42a",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 455.591842030412,
			"y": -111.27989984954911,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1473,
			"versionNonce": 1015991943,
			"isDeleted": false,
			"id": "o8biFmSb5dKCMEc7NluD-",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 477.37797125824454,
			"y": -90.07369778342309,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1797,
			"versionNonce": 863011177,
			"isDeleted": false,
			"id": "BX58eYiqJ-lKgh5B5hEDU",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 488.45785616828516,
			"y": -72.07154949931737,
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
			"updated": 1699310243522,
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
			"version": 1812,
			"versionNonce": 1524721063,
			"isDeleted": false,
			"id": "EvmdBwpzo57akElBStjBy",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 506.98729854061935,
			"y": -90.84169555522931,
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
			"updated": 1699310243522,
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
			"version": 1963,
			"versionNonce": 1250847817,
			"isDeleted": false,
			"id": "PvzSdGbC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 401.4825744628907,
			"y": -37.99793218170089,
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
			"updated": 1699310243522,
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
			"version": 2108,
			"versionNonce": 1024727239,
			"isDeleted": false,
			"id": "zQBSNX9sThrBmOY0RTw-E",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 456.197310780412,
			"y": 22.93494390045089,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 1473,
			"versionNonce": 1617689385,
			"isDeleted": false,
			"id": "VwF4zGLx0_BgOnAnER08V",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 477.9834400082446,
			"y": 44.141145966576914,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1797,
			"versionNonce": 683894759,
			"isDeleted": false,
			"id": "oTa7w1_nmc1HZWPjf4LHz",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 4.726840450960482,
			"x": 489.0633249182852,
			"y": 62.14329425068263,
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
			"updated": 1699310243522,
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
			"version": 1812,
			"versionNonce": 1165274633,
			"isDeleted": false,
			"id": "9nlfh1waMnDrCXL3VFNYH",
			"fillStyle": "solid",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 1.5503909961083693,
			"x": 507.59276729061935,
			"y": 43.37314819477069,
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
			"updated": 1699310243522,
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
			"version": 1959,
			"versionNonce": 2080101127,
			"isDeleted": false,
			"id": "lbjbbn38",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 402.0880432128907,
			"y": 95.21691156829911,
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
			"updated": 1699310243522,
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
			"version": 1418,
			"versionNonce": 816055529,
			"isDeleted": false,
			"id": "DnVlXLjYCff6yY338cA3X",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 155.24972534179688,
			"y": -82.87381929969729,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 1887,
			"versionNonce": 523885095,
			"isDeleted": false,
			"id": "0YXDPf7V8cjesFA4VAR-J",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 180.14622568727964,
			"y": -62.77772377667111,
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
			"updated": 1699310243522,
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
			"version": 1938,
			"versionNonce": 1837465545,
			"isDeleted": false,
			"id": "ng8yzfysYH1F6Q55hbYNK",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "dotted",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 178.67433133383793,
			"y": -37.998829258174965,
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
			"updated": 1699310243522,
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
			"version": 1784,
			"versionNonce": 929692999,
			"isDeleted": false,
			"id": "mgLG32quDEveWtHijOwj0",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 161.873781725526,
			"y": -66.94838434321014,
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
			"updated": 1699310243522,
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
			"version": 1732,
			"versionNonce": 1244962473,
			"isDeleted": false,
			"id": "saZHtKdTS4s64CythC-L1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 196.33482540482578,
			"y": -74.53399580241717,
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
			"updated": 1699310243522,
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
			"version": 1457,
			"versionNonce": 401128551,
			"isDeleted": false,
			"id": "00N18aRPmLR5hbBSOewW8",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 183.01579361834047,
			"y": -44.3983562397209,
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
			"updated": 1699310243522,
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
			"version": 1575,
			"versionNonce": 1163714953,
			"isDeleted": false,
			"id": "hrPYvPeeK9Rpcg2hiVei1",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 0,
			"x": 190.82430762314743,
			"y": -54.267110158164314,
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
			"updated": 1699310243522,
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
			"version": 1715,
			"versionNonce": 1954715527,
			"isDeleted": false,
			"id": "Q1uPauXnr_S3ILMyKtpEI",
			"fillStyle": "cross-hatch",
			"strokeWidth": 2,
			"strokeStyle": "solid",
			"roughness": 0,
			"opacity": 100,
			"angle": 3.141592653589793,
			"x": 179.01849102201504,
			"y": -54.81049351091474,
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
			"updated": 1699310243522,
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
			"version": 1402,
			"versionNonce": 2084161641,
			"isDeleted": false,
			"id": "lOG4jDFu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 120.82640838623047,
			"y": -14.812704137802712,
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
			"updated": 1699310243522,
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
			"version": 253,
			"versionNonce": 1400114855,
			"isDeleted": false,
			"id": "IIKH7VMZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 145.2404785156249,
			"y": -679.3920255962171,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 106.08172607421875,
			"height": 88.23401131849592,
			"seed": 2071776420,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 89,
			"versionNonce": 1486279497,
			"isDeleted": false,
			"id": "2WkEcW6LK1MI3Rw1k5hjl",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 52.202855160361764,
			"y": -128.03667442195285,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "pFt7Qi1K1AS-Z1ywrKiuN",
				"focus": -0.22751997108051575,
				"gap": 1.8704840871480428
			},
			"endBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": 0.17686571852389477,
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
			"version": 120,
			"versionNonce": 1063887303,
			"isDeleted": false,
			"id": "CHsolVngxjo0ZsVArM9r8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 54.6822959498354,
			"y": -35.921324704371024,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "GXtPWSN1F_K5QRZxz5phd",
				"focus": 0.07589139193097136,
				"gap": 2.931051195135403
			},
			"endBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": -0.3692710578568188,
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
			"version": 294,
			"versionNonce": 2127528489,
			"isDeleted": false,
			"id": "JrPDiZ5FTxWLJqNIPQZ9p",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 51.9438091077302,
			"y": 91.8826454564147,
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
			"updated": 1699310243522,
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
			"version": 394,
			"versionNonce": 964677863,
			"isDeleted": false,
			"id": "pynyHYYUVcpxfABHDpXoC",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 230.17849176314306,
			"y": -40.59827465212855,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": 0.33218444888470045,
				"gap": 10.275385073689932
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
			"version": 276,
			"versionNonce": 2077185289,
			"isDeleted": false,
			"id": "VGCI05B8P7vXtKhtkH0Id",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 228.0526123811539,
			"y": -81.49952968987128,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "DnVlXLjYCff6yY338cA3X",
				"focus": -0.2701380821692733,
				"gap": 8.149505691700767
			},
			"endBinding": {
				"elementId": "4Cmku3cn",
				"focus": 0.9042033439177539,
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
			"version": 173,
			"versionNonce": 1799560199,
			"isDeleted": false,
			"id": "xdQQAqybDf4G8iAkw_2n2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 259.4394194501681,
			"y": 0.3005494352193807,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "lOG4jDFu",
				"focus": -0.7972219197374931,
				"gap": 5.113087357882932
			},
			"endBinding": {
				"elementId": "lbjbbn38",
				"focus": -0.7057793169694155,
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
			"version": 292,
			"versionNonce": 856804329,
			"isDeleted": false,
			"id": "KRIM94Zu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -58.59552122417256,
			"y": -173.54909796463807,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 59.899932861328125,
			"height": 25,
			"seed": 100392356,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 379,
			"versionNonce": 414188327,
			"isDeleted": false,
			"id": "3bRfM5N7",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -58.97244021767074,
			"y": -139.61817691200633,
			"strokeColor": "#2f9e44",
			"backgroundColor": "transparent",
			"width": 88.0198974609375,
			"height": 25,
			"seed": 1795493540,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 348,
			"versionNonce": 211969737,
			"isDeleted": false,
			"id": "pyv5txc6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -57.6360915334601,
			"y": -69.16176243832228,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 80.97991943359375,
			"height": 25,
			"seed": 832214428,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 341,
			"versionNonce": 1379075655,
			"isDeleted": false,
			"id": "lfAMhSh6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -57.015203375565534,
			"y": -38.33939401726968,
			"strokeColor": "#f08c00",
			"backgroundColor": "transparent",
			"width": 80.01992797851562,
			"height": 25,
			"seed": 208625436,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 420,
			"versionNonce": 1662821801,
			"isDeleted": false,
			"id": "apeJEV7S",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -58.155525609066785,
			"y": 47.861263877467195,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 68.81993103027344,
			"height": 25,
			"seed": 529807516,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 496,
			"versionNonce": 1722328423,
			"isDeleted": false,
			"id": "LkYJA0Kh",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -57.544281407406515,
			"y": 79.70336914062523,
			"strokeColor": "#e03131",
			"backgroundColor": "transparent",
			"width": 72.63992309570312,
			"height": 25,
			"seed": 993257628,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
			"version": 126,
			"versionNonce": 358441095,
			"isDeleted": false,
			"id": "O8KyS6Px4JGARvTLheSRI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 93.8599275287828,
			"y": 59.96190121299355,
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
			"updated": 1699310243522,
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
			"version": 549,
			"versionNonce": 2059155559,
			"isDeleted": false,
			"id": "thHLL94i",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -152.57958808009244,
			"y": 249.19455891423183,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 427.1796569824219,
			"height": 175,
			"seed": 287795612,
			"groupIds": [
				"qpT7yEfgZn-VcnK0rzUpt"
			],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310259492,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "curl -X POST \"https://fs_etl/api/resource\"\n    request-body {\n        task: order\n        start_dt: 2023_09_01_1230\n        end_dt: 2023_09_30_2359\n    }\n",
			"rawText": "curl -X POST \"https://fs_etl/api/resource\"\n    request-body {\n        task: order\n        start_dt: 2023_09_01_1230\n        end_dt: 2023_09_30_2359\n    }\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "curl -X POST \"https://fs_etl/api/resource\"\n    request-body {\n        task: order\n        start_dt: 2023_09_01_1230\n        end_dt: 2023_09_30_2359\n    }\n",
			"lineHeight": 1.25,
			"baseline": 168
		},
		{
			"type": "rectangle",
			"version": 524,
			"versionNonce": 226734153,
			"isDeleted": false,
			"id": "PUWUYkcA1Nc2trsZsqDTz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -160.41922623798712,
			"y": 231.00376944054767,
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
			"updated": 1699310250576,
			"link": null,
			"locked": false
		},
		{
			"type": "line",
			"version": 356,
			"versionNonce": 898983,
			"isDeleted": false,
			"id": "5VjuDznpfBuDpSZADvkyn",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 550.3379634388704,
			"y": -68.7976788080224,
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
			"updated": 1699310243522,
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
			"version": 697,
			"versionNonce": 445135433,
			"isDeleted": false,
			"id": "PL85HkZsMRGHdnbnXJVy5",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 736.288941143549,
			"y": -136.61182354486442,
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
			"updated": 1699310243522,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 285,
			"versionNonce": 1558588103,
			"isDeleted": false,
			"id": "AOehfib8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 748.8877681263704,
			"y": -120.07198436357783,
			"strokeColor": "#1e1e1e",
			"backgroundColor": "transparent",
			"width": 385.81976318359375,
			"height": 100,
			"seed": 1783483044,
			"groupIds": [],
			"frameId": null,
			"roundness": null,
			"boundElements": [],
			"updated": 1699310243522,
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
		}
	],
	"appState": {
		"theme": "dark",
		"viewBackgroundColor": "#ffffff",
		"currentItemStrokeColor": "#f08c00",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "hachure",
		"currentItemStrokeWidth": 1,
		"currentItemStrokeStyle": "dashed",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 20,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": 564.7146408453729,
		"scrollY": 576.5107278262867,
		"zoom": {
			"value": 0.8500000000000001
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