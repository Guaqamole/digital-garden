---
title: 추천 시스템 알고리즘 Trend
date: 2023-12-01
draft: false
tags:
  - DL
  - Recommendation
complete: true
---
밑에 언급될 알고리즘들은 학계에서 유명한 알고리즘 보다는 산업계에서 주로 Production 에서 많이 사용되었던 알고리즘을 나열하고 있습니다. 예를들어, Netflix 는 Competition 에서 우승한 Accuracy 가 높은 복잡한 알고리즘이나, 가장 최신의 학계 SOTA 알고리즘을 사용하는 것이 아닌, 개인화와 최신성, 그리고, 100ms 이하의 빠른 서빙이 가능한, 그로부터 Accuracy 보다는 ABTest 에서 더 효율이 좋은, 기민한 알고리즘을 사용하고 있습니다. 그리고 무엇보다, 그날 그날 시시각각 User 의 미묘한 반응의 변화에 Model 이 즉각적으로 개인화 진화 가능하도록 하는 Realtime Lambda 아키텍처 + 원순환 Continuous 진화 Serving 이 가능한 Simple 한 Model 을 이용하여 추천을 하고 있습니다. ( 2018년 Spark + AI Summit at Sanfrancisco 발표 내용 참고 )

본 글에서 소개 드리는 추천 알고리즘은 모든 도메인에 사용 가능한 범용적인 추천 알고리즘은 아닐 수도 있습니다. 하지만, 다양한 추천 알고리즘 접근 방식 및 각각의 장단점을 이해하여, 사고의 넓이를 키우자는 입장에서 전반적인 Trend 를 나열해 보았습니다. 혹시 제가 언급하지 못한 중요 Approach 가 있거나, 제가 잘못 이해하고 있었던 부분이 발견된다면, 언제든 컴멘트 부탁드립니다.

#### (1) 10년 ~ 15년 전에는 Apriori 알고리즘. 대표적인 연관 상품 추천 알고리즘.

-> 현재는 현업에서 거의 쓰이고 있지 않지만, Confidence , Support , Coverage , Lift 등의 추천 관련 용어를 이해함에 있어, 교과서적인 지식을 주는 알고리즘.

-> [https://ratsgo.github.io/machine%20learning/2017/04/08/apriori/](https://ratsgo.github.io/machine%20learning/2017/04/08/apriori/)

  

#### (2) 5~10년 전에는 Apriori 다음으로 Collaboration Filtering

-> 2010년도 이후, 상당기간 거의 추천의 표준으로 자리 메김.
-> 손쉬운 구현체 많음.
-> User Base , Item Base , Contents Base, 혹은 복수개의 결합. etc…
-> T-Store 추천 시스템 관련 이야기가 있는 아래 Blog 추천. 좀 오래된 블로그인데, 그만큼 옛 방식이기 때문 임.
-> [https://readme.skplanet.com/?p=2509](https://readme.skplanet.com/?p=2509)
-> 아래는 CF on Spark 에 관한 spotify 의 Approach
-> [https://www.slideshare.net/MrChrisJohnson/collaborative-filtering-with-spark](https://www.slideshare.net/MrChrisJohnson/collaborative-filtering-with-spark)
-> spotify 는 이후 song2vec 등 다양한 시도로 좀더 진화 함. (item2vec 항목에서 재 언급)

  

#### **(3) 4 ~7년 전에는 FPGroth . Apriori 의 BigData  버전**

-> Spark ML 라이브러리에 구현되어 있으며, Apriori 와 거의 동일한 Input 과 Output 을 보이지만, 계산 속도 및 BigData Scale 병렬처리에 있어 훨씬 더 효과적인 알고리즘.
-> 이로부터 Output 이 Apriori 와 거의 동일하지만, 대용량 Data 를 통한 커버리지 개선 및 최신성이 개선 되어 결과론적으로 ABTest Score 를 향상 시키는 것이 가능해짐.
-> [http://blog.naver.com/PostView.nhn?blogId=sindong14&logNo=220661064114&parentCategoryNo=&categoryNo=48&viewDate=&isShowPopularPosts=true&from=search](http://blog.naver.com/PostView.nhn?blogId=sindong14&logNo=220661064114&parentCategoryNo=&categoryNo=48&viewDate=&isShowPopularPosts=true&from=search)

  

#### **(3.5) 4 ~ 5년 전에는 Collaboration Filltering + Deep Learning  혹은 유사 Approach**

-> 모두의 연구소에서 정리한 버전. 크게 성공한 방식은 별로 없음.
-> [https://www.whydsp.org/291](https://www.whydsp.org/291)

  

#### **(4) 3~5년 전에는 Matrix Factorization**
-> ALS, SGD 가 많이 쓰이며, 모두 Spark ML 에 구현되어 있어, BigData Scale Approach 에서도 많이 사용 되었음.
-> 나온지는 좀더 오래되었지만, Mahout 과 Spark ML 에 구현되면서 BigData 와 결합 가능한 알고리즘으로서 3~5년 전에 더 유행 하였음. (개인적인 경험으로, 정말 Big한 Data 에서는 Spark ML 보다 Mahout Hadoop 버전이 좀더 안정적 이었음.)
-> 특히 Netflix 추천 Competition 에서 가장 우수한 알고리즘으로 알려지면서 유명세를 탓던 알고리즘이기도 하다. ( ps. 뒤에 Factorization Machine 이 나오는데, MF에 비하여 좀더 Sparse 한 Matrix 에서 유용하다.)
-> [http://sanghyukchun.github.io/73/](http://sanghyukchun.github.io/73/)

  

#### **(5) 2~4년 전에는 Item2Vec + CF**
-> Doc2Vec , User2Vec , Item2Vec 등을 CF 에 결합하면, Un Seen Feature 에 대하여 좀더 강건해 짐.
-> Doc2Vec 은 상품상세 Text 나 댓글, Search Engine Tag 등을 이용하여 구성 가능. 이후 Doc => Item 으로 치환하고, 카테고리, 제목, 이미지Search Simillarity Score 등을 동원하여, Item2Vec 을 만들어 낼 수 있음.
-> Microsoft 사의 Market 상품 추천에 사용된 바 있음.
-> [Microsoft 논문] [https://arxiv.org/vc/arxiv/papers/1603/1603.04259v2.pdf](https://arxiv.org/vc/arxiv/papers/1603/1603.04259v2.pdf)
-> MS의 원 논문에서 파생되어 다양하게 응용되어 사용되고 있음.
-> [관련 블로그] [https://brunch.co.kr/@goodvc78/16](https://brunch.co.kr/@goodvc78/16)
-> 예, item2vec : 아프리카TV에서 Live 방송을 벡터화.
-> song2vec : Spotify(음원 스트리밍)에서 플레이리스트로 노래를 벡터화. ( <- 개인적으로 드는 생각. 추천되는 목록에서 사용자가 Skip 또는 Listen 행위를 할 때. Vector 공간에서 방향성을 + 혹은 - 함으로써, 더 원하는 취향의 노래를(실시간으로 지금 딱 이순간에 맞게) 찾아 들어가는 취지에서…. 음원 서비스 추천에 매우 적합할 듯한 느낌. Word2Vec 이 그러하듯이 Song2Vec 또한 수백차원의 방향성 벡터 공간일 수 있으므로...) 
( word2vec 이 그러하듯, 복수의 차원에서 공간적으로 +, - 연산을 통해 수백차원의 공간 내부를 특정하여, 해당 위치 근처의 음원들에 대하여, cosign similarity 순 정렬을 빠르게 해 올 수 있음. )
(가수와 장르, 남성, 여성, 혼성, 듀오, 년도 등등이 모두 공간 차원 요소일 수 있음.)

[![](https://2.bp.blogspot.com/-JX3YL20jXsk/XKIxR2fWyiI/AAAAAAAAJjE/UuajsWcsS189diw5IWzi-sPtFZOMjzCdQCLcBGAs/s640/1.png)](https://2.bp.blogspot.com/-JX3YL20jXsk/XKIxR2fWyiI/AAAAAAAAJjE/UuajsWcsS189diw5IWzi-sPtFZOMjzCdQCLcBGAs/s1600/1.png)
-> meta-pro2vec : Criteo(개인화 광고)에서 상품을 벡터화.

  

#### **(6) 2~3년 전에는 You-tube Recommendation 스타일 Deep Learning Approach**
-> 사실 딥러닝 보다도 You-tube 는 머문시간으로 Measure 를 바꾼 것 자체가 보다 큰 성공 요인이었음.
-> 딥러닝으로 추천을 바라보는 Bible 격 논문.
-> [논문] [https://static.googleusercontent.com/media/research.google.com/ko//pubs/archive/45530.pdf](https://static.googleusercontent.com/media/research.google.com/ko/pubs/archive/45530.pdf
-> 시간없으신 분들은 이거라도…
-> [논문 요약] [http://keunwoochoi.blogspot.com/2016/09/deep-neural-networks-for-youtube.html](http://keunwoochoi.blogspot.com/2016/09/deep-neural-networks-for-youtube.html)
-> [슬라이드 쉐어] [https://pt.slideshare.net/lekaha/deep-neural-network-for-youtube-recommendations](https://pt.slideshare.net/lekaha/deep-neural-network-for-youtube-recommendations)
-> 유튜브 알고리즘에 대한 다양한 인문학적 고찰 [https://www.bloter.net/archives/301890](https://www.bloter.net/archives/301890)

  

#### **(7) 1~3년 전부터 Wide & Deep Model**
-> 구글 Play스토어의 추천에 사용되면서 높은 효율 개선 이력을 보인 알고리즘으로 알려지면서, 유명세를 탔음.
-> 추천이 아닌 예측 문제에서도 유용함. (마치 Factorization Machine 처럼...)
-> Cold Start Problem 에 대하여 좀더 능동적으로 대처하고, Memorization (wide)에 의존성을 덜 받기 위한 Generalized 가 가미된 방식(deep).
-> 여기서 시사점. 단건 단건 접근하여 Merged 된 Model 을 Wide Model 이라고 할때, 좀더 Generalized 된 Deep Model 은, User 의 Minimal 한 정보만으로도 다양하게 추천이 되는, 그로부터 Sparse 한 부분까지를 유추해 내는 효과를 주지는 않을 런지… ( 이런 효과는 뒤에서 언급되는 Factorization Machine 에서도 언급 됨.)
-> [논문] [https://arxiv.org/abs/1606.07792](https://arxiv.org/abs/1606.07792)
-> [조대협님이 정리한 코드가 있는 블로그] [https://bcho.tistory.com/tag/wide%20and%20deep%20model](https://bcho.tistory.com/tag/wide%20and%20deep%20model)

  

#### **(8) 1~2년 전부터 개인화 추천이 뜨면서 다시 각광 받는 Factorization Machine. (논문은 사실 좀 오래 되었음.)**
-> 특히 Big Sparse Matrix 일때 유리.  
-> 특히, (6),(7)의 모델이 Inference 및 Serving 에서 극한의 Engineering 작업을 필요로 하고, BigData Lambda 아키텍처 + Deep Learning Continuous Training 을 통하여 실시간성을 부여하는데 Engineering 복잡도 크게 증가하는 단점을 보여, 단순한 Approach 로 개인화를 구현함에 있어서 상대적으로 Factorization Machine 이  다시금 각광을 받음.
-> 기존 스타일의 추천 Legacy Approach 및 Legacy Search Engine 과 결합하여, 뒷 Layer 로서, 개인화 랭킹을 추가하는 용도로도 많이 쓰임.
-> 기존 검색엔진의 Output에 Factorization Machine 을 적용하면, 개인화 re-Ranking 을 할 수 있음.
-> 복수의 모델의 Output 을 Mash-Up 함에 있어, 모델(영역)을 Factorization Machine 과 결합하면, 개인화된 담벼락을 얻을 수 있음. ( amazon 첫페이지나 You-tube 첫페이지 처럼)
-> 룰엔진의 결과에 적용 시 Rule Engine + 개인화 Re-Ranking 형태로 손쉽게 개인화 추천 적용 가능.
-> 모델별 개별 접근의 결과가 개인별로 있는 경우, 특정 이력이 전혀없어 Sparse 한 부분을 Factorization Machine 으로 보완하는 경우, 개별 모델로 부터 General 모델을 파생하는데 도움이 될 수 있음.
-> Factorization Machine 은 다양한 구현체가 있음. 특히, AWS 에는 SageMaker 안에 PaaS 위에서 돌아가는 손쉬운 Library 수준의 Service 구현체가 있어( Code Snippet 이라 SaaS 라고 하기에는 무리가 있음) 빠르게 자사의 데이터로 Training 및 Serving 할 수 있음.
-> 개인적으로 가지고 있는 Jupyter Notebook 소스코드가 있으므로, 필요하신 분은 요청 주세요.
-> 아래는 정리가 잘 되어있는 Hands On Lab 예제.  
-> [HOL] [https://cloud.hosting.kr/techblog_180709_movie-recommender-with-factorization-machines/](https://cloud.hosting.kr/techblog_180709_movie-recommender-with-factorization-machines/)

  

#### (8.5) Matrix Factorization 과 Factorization Machine 과의 차이점.
-> MF와 FM의 차이점을 간단하게 써 놓은 글.
[https://stats.stackexchange.com/questions/108901/difference-between-factorization-machines-and-matrix-factorization](https://stats.stackexchange.com/questions/108901/difference-between-factorization-machines-and-matrix-factorization)
논문 참고 : [https://www.csie.ntu.edu.tw/~b97053/paper/Rendle2010FM.pdf](https://www.csie.ntu.edu.tw/~b97053/paper/Rendle2010FM.pdf)

Key 내용은 아래와 같다.
So compared to Matrix Factorization, here are key differences:
1. In recommended systems, where Matrix Factorization is generally used, we cannot use side-features. Ex for a movie recommendation system, we cannot use the movie genres, its language etc in Matrix Factorization. The factorization itself has to learn these from the existing interactions. But we can pass this info in Factorization Machines
MF는 유저-상품 데이터만 가지고, 숨겨진 정보들(side-features, latent feature -> 상품카테고리, 검색어, 이전에 본 상품 등등등) 을 표현(학습) 하는 알고리즘이라, 입력 데이터로 유저-상품(클릭 여부) 만 사용 가능. 하지만 FM에서는 이러한 side-feature들을 직접 입력으로 넣어서 학습이 가능하다.
1. Factorization Machines can also be used for other prediction tasks such as Regression and Binary Classification. This is usually not the case with Matrix Factorization
FM은 MF보다 더 일반적이고 확장된 모델이여서, 추천 뿐만 아니라 회귀나 이진분류 와 같은 다양한 ML에서도 사용 가능하다. (MF는 불가능)

Just some extension to Dileep's answer.
If the only features involved are two categorical variables (e.g. users and items) then FM is equivalent to the matrix factorization model. But FM can be easily applied to more than two and real valued features.

FM의 가장 큰 장점은 이렇듯 기존 user,item 외에 2개이상의 feature들을 실제로 사용 할 수 있다는 부분.

  

#### (9) 최근. 개인화 추천. ( 2017 re-invent By Amazon )
-> Amazon 이 사용하였으나, 크게 알려지진 않은 Deep Learning Base 개인화 추천 알고리즘.
-> 그 이전에 Amazon 도 Factorization Machine 을 썼다는 이야기가 나옴.
-> 어떻게 추천이 Deep Learning 으로 진화 되었는지 시계열적인 설명을 하고 있음.
-> 최종 DSSM 버전은 Google 의 You-tube Recommendation 과도 유사. 다양한 Feature 의 Embedding Vector 를 Concat 하여 Neurual Network 에 넣었다는 것이 핵심. 그래서 사실 You-Tube 의 그것보다 그다지 새롭지는 않음.

[![](https://2.bp.blogspot.com/-e484LjEIOmY/XKIybzl2RiI/AAAAAAAAJjM/I_snmxJL39sZJjmKxSVlkOXiMGKhSchewCLcBGAs/s640/2.png)](https://2.bp.blogspot.com/-e484LjEIOmY/XKIybzl2RiI/AAAAAAAAJjM/I_snmxJL39sZJjmKxSVlkOXiMGKhSchewCLcBGAs/s1600/2.png)

-> 최종 버전의 소스코드 및 PaaS/SaaS 서비스가 Open 되지는 않았으나, 일부는 github 에 spark + mxnet + gluon 버전의 코드가 부분 공개되어 있음.
-> [슬라이드쉐어] [https://fr.slideshare.net/AmazonWebServices/building-content-recommendation-systems-using-apache-mxnet-and-gluon-mcl402-reinvent-2017](https://fr.slideshare.net/AmazonWebServices/building-content-recommendation-systems-using-apache-mxnet-and-gluon-mcl402-reinvent-2017)

  

#### (10) 최근. 개인화 추천. Hierarchical RNN ( 2018 re-invent By Amazon )
-> 2018 re-invent 행사에서 Amazon 이 알파버전을 PaaS/SaaS 개인화 추천 서비스로 공개하여, 주목받음. 
-> [논문] [https://arxiv.org/pdf/1706.04148.pdf](https://arxiv.org/pdf/1706.04148.pdf)
-> 아직 알파버전이라 당장 사용해볼 수는 없으나, github 에 위 논문 저자가 올린 공개 버전 코드가 있음.
-> [구현체] 저자의 구현체 공개버전 : [https://github.com/mquad/hgru4rec](https://github.com/mquad/hgru4rec)


#### **(11) 최근. 개인화 Re-Ranking. (개인화 Reinforcement Learning Re-Ranking By 알리바바)**
-> 개인화 re-Ranking 에 Reinforcement Learning 이용.
-> [논문] [https://arxiv.org/pdf/1803.00710.pdf](https://arxiv.org/pdf/1803.00710.pdf)
-> 아카데믹하게 알려진 논문은 아니지만, 타오바오와 알리바바의 사례를 담고있는 논문이라, 매우 현실적인 접근이며, 의미있는 새로운 Approach 임.
-> Factorization Machine 과 마찬가지로, 기존 Legacy 추천 시스템 뒤에서, 혹은 복수개의 모델의 개인화 노출 순서를 정하는 부분, 혹은 Search 엔진 뒤에서 개인화를 구현하는데, 적합.

  
#### **(12) Deep Learning 기반 최신 추천시스템 동향 관련 Survey 논문**
-> [https://arxiv.org/pdf/1707.07435.pdf](https://arxiv.org/pdf/1707.07435.pdf)