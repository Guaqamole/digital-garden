---
title: Pandas 기본
date: 2023-11-17
draft: false
tags:
  - Pandas
  - HowTo
complete: true
---
## 데이터 오브젝트 생성

- 데이터 오브젝트는 ‘데이터를 담고 있는 그릇’이라고 생각하면 됩니다.
- 아래의 이미지처럼 pandas에서는 2가지 오브젝트 Series 와 DataFrame가 있습니다.
    - Series : 1차원 데이터와 각 데이터의 위치정보를 담는 인덱스로 구성
    - DataFrame : 2차원 데이터와 인덱스, 컬럼으로 구성(하나의 컬럼만 선택한다면 Series)
<br>
### pd.Series()

![](https://i.imgur.com/ZXZjRI0.png)

```python
import pandas as pd
import numpy as np

# Series 생성
s = pd.Series([1, 3, 5, np.nan, 6, 8])

print(s)
```

- 위와 같이 Series() 안에 list로 1차원 데이터만 넘기면 됩니다. index는 입력하지 않아도 자동으로 0부터 입력됩니다.
<br>

### pd.DataFrame()

```python
# DataFrame 생성
dates = pd.date_range('20130101', periods=6)

df = pd.DataFrame(
				  np.random.randn(6,4), 
				  index=dates, 
				  columns=list('ABCD')
	)

print(df)
```

<br>
### pd.read_csv(‘path/name.csv’)
```python
import pandas as pd

df = pd.read_csv('.csv')
```

---
<br>
## 데이터 확인하기

### df.head(), df.tail()
- DataFrame은 head(), tail()의 함수로 처음과 끝의 일부 데이터를 볼 수 있습니다.
- 데이터가 큰 경우에 데이터가 어떤식으로 구성되어 있는지 확인할 때 자주 사용합니다.
![](https://i.imgur.com/9n3zZQo.png)

> [!NOTE]+  jupyter Notebook 사용 팁
> 
> - head()와 같은 함수를 사용할 경우 jupyter notebook에서 함수의 기본값을 확인할 수 있습니다.
> - shift+tab을 누를 경우 아래의 내용을 확인 할 수 있습니다. 이미지처럼 n: 'int' = 5 로 설정이 되어 있기 때문에 디폴트 값이 5입니다. 위의 이미지처럼 3개만 넣고 싶다면 3을 입력해줄 수 있습니다.
> 
> ![](https://velog.velcdn.com/images/suminwooo/post/bbf41faf-9549-4ac8-996b-3970eaac3af6/image.png)
> 

<br>

### df.index, df.columns, df.values
- DataFrame에서 인덱스를 확인하고 싶을 경우에는 `.index`, 컬럼은 `.columns`, 내부 데이터는 `.values` 속성을 통해 확인할 수 있습니다.

```python
print(df.index)
```

```python
print(df.columns)
```

```python
print(df.values)
```

![](https://i.imgur.com/g0GOeBX.png)

<br>

### df.describe()
- DataFrame의 describe()를 통해 각 컬럼의 통계적인 수치를 확인할 수 있습니다.
	- `count`: 데이터 개수
	- `mean`: 평균값
	- `std`: 표준편차
	- `min`: 최소값
	- `25%`: 1사분위값
	- `50%`: 중앙값
	- `75%`: 3사분위값
	- `max`: 최대값

```python
df.describe()
```

> [!NOTE] 분위수란?
> 1. 1사분위값 : 누적 확률이 0.25가 되는 곳의 확률 변호
> 2. 2사분위값 : 누적 확률이 0.5가 되는 곳의 확률 변호
> 3. 3사분위값 : 누적 확률이 0.75가 되는 곳의 확률 변호
> ![](https://i.imgur.com/4UMhjQc.png)

<br>

### df.transpose(), df.T
- .T 속성은 DataFrame 에서 index 와 column 을 바꾼 형태의 DataFrame 입니다.
```python
print(df.transpose())
```

```python
print(df.T)
```

#### 추가 활용법
```python
import pandas as pd

data = {
    '과목': ['국어', '영어', '수학'],
    '1반': [85, 45, 15],
    '2반': [57, 99, 45],
    '3반': [12, 89, 87],
    '4반': [47, 55, 81],
    '5반': [12, 23, 64],
    '6반': [45, 65, 33],
    '7반': [18, 55, 77]
}

school = pd.DataFrame(data)
print(school)
```

column이 row의 데이터로 되어 있는경우 첫번째 row를 컬럼 이름으로 변경후 맨 왼쪽 인덱스를 제거해서 헤더를 만들어준다 (`과목` 제거 ):
```python
tp = school.transpose()
print(tp)
```

```python
tp.rename(columns=tp.iloc[0],inplace=True)
new_tp = tp.drop(tp.index[0])
print(new_tp)
```

<br>

### df.sort_index()
- .sort_index() 라는 메소드를 활용해 행과 열 이름을 정렬하여 나타낼 수도 있습니다.
    - axis: 축 기준 정보 (0: 인덱스 기준, 1: 컬럼 기준)
    - ascending: 정렬 방식 (false : 내림차순, true: 오름차순)

```python
asc = df.sort_index(axis=1, ascending=False)
print(asc)
```

```python
val = df.sort_values(by='B')
print(val)
```


---

## 데이터 선택하기

### df\[‘A’]
![](https://i.imgur.com/6mnC1gu.png)
- 데이터프레임 자체가 갖고 있는 인덱싱&슬라이싱 기능을 이용할 수 있습니다.
- 특정 컬럼의 값들만 가져오고 싶다면 `df['A']`(df.A와 동일) 와 같은 형태로 입력합니다. 리턴되는 값은 Series의 자료구조를 갖고 있습니다.
- 단, 컬럼의 이름이 간혹 df.A로 쓰면 에러가 나는 경우가 발생하기 때문에 `df['A']` 를 추천합니다.
```python
print(df['A'])


print(type(df['A']))
```

<br>

### df\[0:3]
![](https://i.imgur.com/vVzLVrQ.png)
- 특정 ‘행 범위’를 가져오고 싶다면 다음과 같이 리스트를 슬라이싱 할 때와 같이 동일하게 사용할 수 있습니다.
- `df[0:3]` 라고 하면 0, 1, 2번째 행을 가져옵니다.
- 또 다른 방법으로 `df['20130102':'20130104'] `인덱스명을 직접 넣어서 해당하는 행 범위를 가져올 수도 있습니다.
- 파이썬에서 슬라이싱을 할 경우 경우에 따라 마지막 값이 포함되거나 포함되지 않을 수 있습니다. 다양한 경우를 외우기 보단 다양한 테스트를 통해 확인하는 방법을 추천합니다.
```python
## 맨 처음 3개의 행
print(df[0:3])


## 인덱스명에 해당하는 값
print(df['20130102':'20130104'])
```

<br>

### df.loc\[]
![](https://i.imgur.com/ENiNyco.png)
- 이름(Label)로 가져오는 것은 DataFrame의 .loc 속성을 이용합니다.
- .loc은 2차원으로 구성되어 있습니다. `.loc[인덱스명, 컬럼명]` 형식으로 접근가능 합니다.
- `.loc[인덱스명]` 으로 입력하면 모든 행의 값으로 결과가 나옵니다.  
    여기에서는 `.loc[인덱스명, :]` 과 동일한 의미이며, :의 경우 모든 값을 의미합니다.
- `.loc[선택 인덱스 리스트, 선택 컬럼 리스트]` 와 같은 리스트 형식으로 멀티인덱싱이 가능합니다.

```python
print(df.loc[dates[0]])
```


![](https://i.imgur.com/6Q0SYHW.png)
```python
print(df.loc[:,['A','B']])


print(df.loc['20130102':'20130104',['A','B']])
```

<br>

![](https://i.imgur.com/7yQdrtS.png)

```python
print(df.loc['20130102',['A','B']])

print(df.loc[dates[0],'A'])
```

<br>

### df.iloc\[]
![](https://i.imgur.com/gDNT1Hw.png)
- 여기서 말하는 인덱스는 위치(숫자) 정보를 말합니다.
- `.iloc`도 `.loc`와 마찬가지로 2차원 형태로 구성되어 있어 1번째 인덱스는 행의 번호를, 2번째 인덱스는 컬럼의 번호를 의미합니다. 마찬가지로 멀티인덱싱도 가능합니다.

<br>

![](https://i.imgur.com/I5t1p95.png)
```python
print(df.iloc[3])
```

<br>

![](https://i.imgur.com/RtR9T0b.png)
```python
print(df.iloc[3:5,0:2])


print(df.iloc[[1,2,4],[0,2]])
```

<br>

![](https://i.imgur.com/YYfQjVJ.png)
```python
print(df.iloc[1:3,:])


print(df.iloc[:,1:3])
```

<br>

### df.iat\[]
- .iat의 경우 .iloc와 동일한 값을 가져 올 수 있습니다. 동일하지만 스칼라값을 가져오는 속도가 .iat이 빠릅니다.
- 헷갈릴 경우 하나만 써도 큰 문제는 없습니다.
![](https://i.imgur.com/U19FI6a.png)
```python
print(df.iloc[1,1])


print(df.iat[1,1])
```

<br>

### df\[df\['A'] > 0]
- 하나의 컬럼의 다양한 조건에 따라 행들을 선택할 수 있습니다.
![](https://i.imgur.com/maRuZmM.png)
```python
print(df[df['A'] > 0])
```



### df\[df > 0]
- DataFrame의 값 조건에 해당하는 것만 선택할 수도 있습니다.
![](https://i.imgur.com/gkCr51t.png)
```python
print(df[df > 0])
```
