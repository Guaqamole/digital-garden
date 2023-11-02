---
title: Python Data Model
date: 2023-11-01
draft: false
tags:
  - Python
  - Concept
complete: false
link: https://docs.python.org/3/reference/datamodel.html
---
## 1. Objects, values and types

객체는 파이썬에서 데이터를 표현하는 방식이고, 파이썬 프로그램에서 사용되는 모든 데이터는 객체 혹은 객체 간의 특정한 관계로 나타낼 수 있다.  
모든 객체는 각자의 Identity, 데이터 타입(type)과 특정 값(value)을 가지는데, 객체의 Identity는 생성된 이후 절대 바뀔 수 없다(객체가 생성된 메모리 주소라고 생각하면 된다). ‘is’ 연산은 두 객체의 ID를 비교하고, id() 함수는 해당 객체의 ID를 나타내는 정수값을 리턴한다.

객체의 타입은 해당 객체가 행할 수 있는 연산을 규정하며 (예를 들어, 이 객체는 길이라는 속성을 가지고 있나? Does it have a length?), 데이터 타입 별로 가질 수 있는 값을 정의한다. type() 함수는 객체의 데이터 타입을 리턴한다(이 역시 객체이다). 데이터 타입은 ID이기 때문에 당연히 바꿀 수 없다(unchangable).

객체의 값은 때로는 수정할 수 있는데, 값을 수정할 수 있는 객체는 mutable하다고 하며, 한번 생성되면 값을 수정할 수 없는 객체를 가리켜 immutable하다고 한다 (Immutable한 컨테이너 객체에 mutable한 객체가 들어있을 때, mutable 객체의 값을 수정하면 컨테이너 객체의 값이 바뀌겠지만, 컨테이너에 담겨있는 객체 자체는 바뀔 수 없기 때문에, 여전히 immutable하다고 여겨야 한다. 값을 수정할 수 없다는 것은 개별 값을 절대 바꿀 수 없다는 의미는 아니다). 객체의 값을 수정할 수 있는지 여부(mutability)는 객체의 데이터 타입에 따라 결정되는데, 예를 들어 숫자, 문자열 그리고 튜플은 값을 수정할 수 없고(immutable), 딕셔너리와 리스트는 값을 수정할 수 있다(mutable).

객체는 의도적으로 소멸시킬 수 없고, 다만 아무도 이를 사용하지 않을 때(when they become unreachable) garbage-collect 된다.

주의해야 할 점은 구현 중에 추적하거나 디버깅에 사용하고 있는 객체들과 try-except 구문에서 사용되는 객체들도 살아있다는 것이다. 어떤 객체는 파일이나, 윈도우 같은 외부 리소스를 참조하고 있을 수도 있다. 이런 객체들은 garbage-collect 될 때 free 된다고 여겨지지만 garbage-collect를 보장할 수 없기 때문에 명시적으로 close() 등의 함수로 리소스를 해제해야 한다. 그렇기 때문에 try-finally, with 등과 같이 명시적으로 리소스를 해제하는 구문을 사용하는 것을 추천한다.

## 2. The standard type hierarchy

다음은 파이썬에서 기본적으로 사용되는 데이터 타입들이다.

#### None

이 타입은 단 하나의 값을 가지고 있고, None 타입의 객체는 단 하나 밖에 없다 (This type has a single value. There is a single object with this value). 예약어 ‘None’으로 객체에 접근할 수 있으며, 값이 없음을 나타내야 하는 다양한 상황에 사용된다. 예를 들어, 명시적으로 어떠한 값도 리턴하지 않는 함수의 리턴값에 쓰일 수 있으며, 사실 이 값은 false와 같다.

#### NotImplemented

이 타입도 None과 같이 단 하나뿐이다. 예약어 ‘NotImplemented’로 접근 가능하다. 수와 관련된 연산이나 복잡한 비교를 수행하는 메소드에서 정의되어 있지 않은 연산을 수행해야 할 때 이 값을 리턴한다.

#### numbers.Number

수와 관련된 객체는 Immutable, 즉, 한번 생성되면 값을 바꿀 수 없다. 파이썬에서 수는 정수, 실수와 복소수를 구분한다.

- numbers.Integral
    1. Integers (int) : 사용 가능한 메모리가 남아있는 한 무한대의 수를 표현할 수 있다. shift, mask 연산에 대해서는 비트 단위 표현을 사용하며, 음수는 2의 보수 체계를 사용한다.
    2. Booleans (bool) : 참/거짓을 나타내는 타입이며, True / False 이 두 객체 밖에 없다. Integer 타입의 subtype이며, 사실 각각 1과 0으로 나타낼 수 있다. 하지만 문자열로 치환하면 ‘True’, ‘False’ (Not ‘1’, ‘0’)이 리턴된다.
- numbers.Real (float) : 아키텍처에 따라 표현 가능한 수의 범위가 달라진다. double-precision 체계를 사용한다.
- numbers.Complex (complex) : machine-level double precision 실수 체계와 짝을 이루어 복소수를 표현한다. 복소수 z는 실수부 z.real과 허수부 z.imag로 구분된다.

#### Sequences

Sequence는 음수가 아닌 수로 순서를 매겨 정렬된 유한한 개수의 집합이다. len() 함수를 통해 아이템 개수를 알수 있으며, 아이템이 총 n개 있을 때, 각 요소는 0, 1, … n-1로 순서를 매기며, i번째 요소는 a[i]로 접근할 수 있다.

Sequence는 슬라이싱도 지원하는데, a[i:j]와 같이 표현되며, i<= k < j 범위의 아이템을 추출할 수 있으며, 부모 Sequence와 같은 타입의 자식 Sequence가 리턴된다. 그렇기 때문에 리턴된 Sequence는 다시 0, 1 .. 부터 인덱싱된다.

일부 Sequence는 extended slicing을 지원하는데, 세번째 파라미터 step이 추가된다. a[i:j:k]와 같이 표현되며, i를 시작으로 k개씩 건너뛰며 j보다 작은 인덱스의 아이템을 추출한다.

Sequence는 Mutability(객체 생성 후 값을 수정할 수 있는지)에 따라 구분한다.

- Immutable Sequences : 객체가 한번 생성되면 값을 바꿀 수 없다 (만약 Immutable 객체가 다른 객체의 참조를 담고 있고 속한 객체가 mutable하다면 값 자체는 바뀔 수 있겠지만, Immutable 객체에 직접적으로 담겨있는 객체 참조 자체는 바뀔 수 없다).
    1. String : 문자열은 유니코드들의 집합이다. U+0000~U+10FFFF 사이의 유니코드를 사용할 수 있다. 파이썬에는 char 타입이 없고, 모든 유니코드 포인트들은 길이가 1인 문자열로 간주된다. ord() 함수는 각 유니코드 값을 문자열에서 정수로 변환해준다. chr() 함수는 정수값을 코드에 해당하는 길이 1의 유니코드로 변환한다. str.encode()는 str를 byte로 변환하고, bytes.decode()는 반대로 변환한다.
    2. Tuple :