---
title: Random Variable & Probability Distribution
date: 2024-05-01
draft: false
tags:
  - Statistics
complete: true
---
​
## 스포주의
![](https://i.imgur.com/LTCkOkk.png)



주사위 도박을 한다고 해보자.

참가 비용은 3만원인데,

주사위를 굴려 나온 수 X 만원의 돈을 준다고 하자.

참가를 해야 할까, 말아야 할까?

​

우리는 주사위의 눈이 나올 경우의 수가

모두 1/6의 확률로 고르게 **분포**되어 있는 것을 안다.

때문에 평균값인 3.5를 구할 수 있다.

결국 주사위를 굴리는 도박의 평균 기대 수익은

3.5만원이므로,

참가하는게 좋다.


## Random Variable
### Trial & Event
- trial : 반복할 수 있으며, 매번 결과가 달라질 수 있는 실험 → 주사위를 2개 던지는 행동
- event: 시행에 따른 결과를 의미 → 눈금의 합이 7이 되는 사건

### **1) 확률변수의 정의**
![|550](https://previews.123rf.com/images/havanaman/havanaman1405/havanaman140500027/28424758-%EB%91%90-%EA%B0%9C%EC%9D%98-%ED%9D%B0%EC%83%89-%EC%A3%BC%EC%82%AC%EC%9C%84-%EB%8F%84%EB%B0%95-%EB%B0%B0%EA%B2%BD.jpg)

> [!success] 확률 변수 (random variable)
 **표본 공간의 각 단위 사건에 실수 값을 부여하는 함수**를 뜻한다.

​

예를 들어 보자.
위의 예시에서 주사위를 굴렸을 때 나오는 값 X라고 할때, 이 X를 가리킨다.
이 값은 1~6 사이의 모든 값을 취할 수 있다.

​

1이 나오는 경우부터 6이 나오는 경우를 모두 **단위 사건**이라고 부르고,
이 때 1~6의 값 외의 값이 나올 수는 없으므로
1~6이 **표본 공간**이라고 할 수 있다.
각 사건은 1~6의 **실수값**을 가지며,
그 경우는 모두 X -> 1~6의
**함수** 형태를 취한다.

​

### **2) 확률 변수의 종류**
확률 변수에는 두가지 종류가 있다.

예 1) 3명의 학생 중 남학생의 수
예 2) 하루에 마시는 물의 양

​

예 1)의 경우에는,
총 4개의 값(0부터 3까지)만을 취할 수 있다.

남학생 2.5명같은 셈이 불가능하기 때문이다.

이와 같은 속성을 지니는 확률 변수를

**이산확률변수(Discrete Random Variable)** 라 부른다.

![](https://postfiles.pstatic.net/MjAxODEwMTZfMjQy/MDAxNTM5NjcwNzUzOTEx.wJyF9wCOUBFQnL-zk36zf24ylSwSS6WKJiNIDpnMKUQg.QeeDWgnlOFTVsWTrnQ9uNoVvmPza0y7MrVLUlvcxhTkg.PNG.nilsine11202/20181016151853.png?type=w773)

이산확률변수의 조건

i) 모든 함수 값은 0보다 커야한다.

음수의 확률로 발생하는 사건은 없기 때문이다.

​

ii) i번째 경우의 수부터 전체 k번째 경우의 수가 발생하는 모든 확률을 더하면

1의 값이 나온다.

​

​

반면

예 2)의 경우에는,

모든 사람이 무한한 경우의 수를 취할 수 있다.

가령 0ml부터 5,345.22ml 처럼 무한히 많은 경우가 존재한다.

이처럼 상한과 하한 사이에 연속하여 있는

무한히 많은 값 중 아무 값이나 취할 수 있는 확률 변수를

**연속확률변수(Continuous Random Variable)**라 부른다.

![](https://postfiles.pstatic.net/MjAxODEwMTZfMTgx/MDAxNTM5NjcwOTg5OTIx.jlVhrSgJwV37dx1WfVfXan4M4ssZ-w9WDWIQqoZGryYg.cFHoRxfSy8Vj7L-1_eEMwEn0rLDOES6F81Ick0bx4Log.PNG.nilsine11202/20181016152253.png?type=w773)

히스토그램의 구간을 무한에 가깝게 쪼개면 확률밀도곡선이 만들어진다.

또한 연속확률변수는 다음과 같은 조건이 붙는다.

![](https://postfiles.pstatic.net/MjAxODEwMTZfMiAg/MDAxNTM5NjcxMTIzNjc2.t-Ot5069NQNj4njxNUSMuxWrC9C61svC4lXOtyD-nWog.VWp1tGAp4nb0cSLJ6NbHUVmqGO41NQ3Q6n0S03cqMgog.PNG.nilsine11202/20181016152509.png?type=w773)

연속확률변수의 조건

i)는 위의 설명과 같다.

​

ii) 연속된 구간의 면적은 적분을 통해 계산한다.

마이너스 극한부터 극한까지의 사이에 정의된 f(x)라는 확률 함수를

전체 적분하면 1이라는 값이 나온다.

​

### **3) 확률 밀도 함수의 여러 형태**

![](https://postfiles.pstatic.net/MjAxODEwMTZfMTcw/MDAxNTM5NjcxMjUzOTE1.lVgGM0EgCOjwGzCB8g87maj03PnKbWIQYFywConI8_Ag.3tObBOaRfa5SWSq7OEaX_kEhTNUkyMTs8nhIsDcoW-wg.PNG.nilsine11202/20181016152723.png?type=w773)

확률밀도함수는 여러가지 형태를 띨 수 있는데,

이를 바탕으로 여러 통계적인 정보를 얻을 수 있다.

특히 종 모양의 형태를 주의깊게 보자.

앞으로 자주 가정하게 될 정규분포의 형태가 위와 같은 좌우 대칭의 종 모양을 띤다.


---
## Probability Distribution

### **1) 확률분포의 정의**

> [!success] 
**확률 변수가 취할 수 있는 모든 값과** **그 값들이 나타날 확률을 나열한 표/그림/함수식**이다.

​![](https://i.imgur.com/6uyrZ7F.png)


위의 예1)을 통해 확률 분포에 대해 쉽게 이해해보자.

​

남학생과 여학생이 1:1의 비율로 있다고 가정하고,

임의로 3명의 학생을 뽑을 경우

0명이 남학생일 경우, 1명, 2명, 3명이 남학생일 확률

총 4개의 경우가 있을 것이다.

​

0명일 확률 = 1/8(12.5%)

1명일 확률 = 3/8(37.5%)

2명일 확률 = 3/8(37.5%)

모두 남학생일 확률 = 1/8(12.5%)

합계 = 1.0 (100%)

![](https://postfiles.pstatic.net/MjAxODEwMTZfMTM1/MDAxNTM5Njc0NjY4NzMz._tafIPVsDpzONSYx810WsxDrGY7f2pKgofbHSDG_0wIg.o8Zt3EAu9Q1LnrPvDE-dl93-XsLsJGkZT-FpAOqFYysg.PNG.nilsine11202/20181016162411.png?type=w773)

이거 그리는데 30분...

이처럼 저 모든 경우의 수를 그림으로 나타낸 것을 확률분포라고 한다.

넓이의 총합은 물론 1이다.

​

### **2)확률분포의 기대치**

확률분포는 기대치와 분산으로 전체적인 형태가 요약될 수 있다.

​

기대치(Expected Value)란 확률적 자료의 중심 경향을 나타내는 값이다.

즉, 확률을 가중치로 삼은 가중평균으로,

발생할 가능성이 있는 값에 그 발생 확률을 모두 곱해 합하여 구할 수 있다.

위의 확률변수 X (획득 금액)가 x1~x6과 같이 주어졌으며,

각 확률 변수가 발생할 확률을 p(xi)라 하면,

확률 변수 X의 기대치 E(X)는 다음과 같이 정의된다.

​

![](https://postfiles.pstatic.net/MjAxODEwMTZfMjYy/MDAxNTM5Njc1MDc2MDcy.ORD0rWRrNY8A_d-6DV21gnhW9lAFFTXkEXDbwrmRrJEg.ZqWApcUyVB2aA7jT94SBO8Ye2m4EHI1O09HcXEmsS9wg.PNG.nilsine11202/20181016163038.png?type=w773)

이산형 변수일 경우 일일이 곱해서 총합을 구하면 되고,

연속형 변수일 경우 적분을 통해 계산한다.

​

|   |   |   |   |
|---|---|---|---|
|나온 눈금|획득 금액|확률|기대값|
|1|1만원|1/6|10000/6|
|2|2만원|1/6|20000/6|
|3|3만원|1/6|30000/6|
|4|4만원|1/6|40000/6|
|5|5만원|1/6|50000/6|
|6|6만원|1/6|60000/6|

​

앞서 제시한 주사위 도박의 예시의 기대치를 계산해보자.

각 경우의 기대치를 가장 오른쪽 열에 정리했다.

이 값을 모두 더하면

35,000원이 나오는데,

이 값이 바로 확률변수 X(획득 금액)의 기대치가 된다.

​

만약 모든 획득 금액을 2로 곱하거나, 5000원을 더한다면 기대치는 어떻게 될까?

정확히 기대치에 곱하거나 더한 것과 같은 효과가 나타날 것이다.

계산해 보면 나온다.

이와 같은 성질을 기대치의 **선형성**이라고 한다.

​

E(a+bX) = a + b*E(X)

​

### **3) 확률 분포의 분산** (적률) 

확률 변수 X의 k제곱의 기대치를 **적률**이라고 부른다.

**확률의 적률은 확률의 분포를 설명하는 데 중요한 역할을 수행하는데,**

일단은 그런 것이 있나보다 하고 넘어가자.

![](https://postfiles.pstatic.net/MjAxODEwMTZfMTk2/MDAxNTM5Njc2NTQ1MDYw.5s-AzGXQtqRkPPgyvjgiSSMJfOaXQ2P8fXNa8v84A3Eg.1vCSYV4PIcpDBsbnC0wkBcggbU814rrrv8vCV3M_X0cg.PNG.nilsine11202/20181016165305.png?type=w773)

E(Xk)로 표현하는 X의 k차 적률을 위와 같이 계산한다.

​

![](https://postfiles.pstatic.net/MjAxODEwMTZfNyAg/MDAxNTM5Njc2NjU2MDQ1.QTlt_t87GadYkg2aNAhL5Xr-ukqoVIkdvxLoz5pc94Mg.8arvohWk6c16eghMq4bNbNnWEZHkhzsqlr3nHztHUkEg.PNG.nilsine11202/20181016165319.png?type=w773)

앞서 다룬 기대치의 선형성을 이용하여, 위처럼 간단히

​

**모분산 = 2차적률 - 1차적률의 제곱**

​

와 같이 모분산의 공식을 정리할 수 있다.

​

### **4) 기대치와 분산의 특성**

방금 설명한 기대치의 선형성을 활용해 다음과 같은 산식을 도출할 수 있다.

![](https://qph.fs.quoracdn.net/main-qimg-783507435d1fa2a650018e19b0a4e58b)

즉, 기대치에는 곱하고 더한게 모두 반영된다.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG8LqCP5W6NlUJig53DsfvvIj_04EVZAGNjCLmhGm0UuBI-sm3MQ)

반면에 분산은 "흩어진 정도"이기 때문에,

더하는 것은 의미가 없다(3을 모든 값에 더한다면 그래프를 오른쪽으로 3만큼 움직일 뿐,

흩어진 정도와는 무관한 것을 생각해보면 쉽다)

그러나 각 값에 특정 수 a를 곱 한다면

분산 값에 a2만큼 곱해진 결과가 나온다고 기억하면 되겠다.


## 딥러닝 분야에 적용
- 우리가 흔히 얻을 수 있는 데이터는 해당 예시에서 사건(event) 으로 이해할 수 있다.
- 이미지 분류 모델을 학습 할 때는 다양한 이미지를 사용한다.
- 이때 내가 수집하여 가지고있는 이미지를 사건(event)으로 이해 할 수 있다.


### Probability Mass Function (PMF)
- 확률질량함수는 **이산확률변수가 특정한 값을 가질 확률을 출력**하는 함수다
→ 이산확률분포를 표현하기 위해 사용하는 확률분포함수

예) 동전 2개를 동시에 던지는 시행에서 두 눈금의 합을 X라고 할 경우,
$$ f(0) = P(X=0) = 1/4 $$
$$ f(1) = P(X=1) = 1/4 $$
$$ f(2) = P(X=2) = 1/4 $$
#### 분류 모델을 통한 예시

예시 1
- Classification 모델의 출력은 확률 분포에 해당한다.
- 이미지 x가 주어졌을 때 클래스 y의 확률을 P(y|x) 로 표현 할 수 있다.
- **확률 변수 X의 값에 따라서 Y의 확률 분포가 변경된다는 의미에서 조건부 확률이라 한다.**

![](https://i.imgur.com/m90Lmi5.png)


예시 2
- 한장의 이미지 x가 주어졌을 때, 분류 모델의 실행 결과가 다음과 같다고 해보자.
![](https://i.imgur.com/QylzpR3.png)
