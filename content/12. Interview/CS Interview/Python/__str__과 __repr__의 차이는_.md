---
title: __str__과 __repr__의 차이는?
date: 2024-09-17
draft: false
tags:
  - interview
complete: true
link: https://tibetsandfox.tistory.com/39
---
### **공통점**

두 메소드는 모두 **"객체를 문자열로 반환"** 한다는 공통점이 있습니다.

즉 사용하는 목적에는 차이가 있지만 결국 **객체가 어떤 타입을 가졌던 간에 그것을 문자열로서 반환**한다는 점이 동일합니다.

많고 많은 자료형 중 하필 **문자열로 반환하는 이유는 사람이 알아보기 가장 편한 자료형**이기 때문입니다. 사람들은 전부 문자를 쓰고 읽고 보고 듣고 하잖아요?

만약 객체를 문자열이 아니라 이진법으로 표현했다면.. 상상만 해도 더럽네요.

### **차이점**

그렇다면 두 메소드의 차이점은 과연 무엇일까요?

위에서 잠깐 언급했듯이 두 메소드는 **서로 다른 목적**을 두고 만들어졌습니다.

우선 __str__메소드에 대해 알아봅시다.

​

**__str__ 메소드**

결론부터 말하자면 **__str__ 메소드는 interface로서의 역할을 수행하기 위해 존재**합니다.

**서로 다른 타입을 가진 데이터끼리 상호작용 할 때 문자열로 변환시킴으로서 상호간의 호환**이 가능하도록 만들어줍니다. 즉 **사용자에 좀 더 초점**이 맞춰져 있습니다.

가장 쉬운 예시는 print문이 되겠네요.

```
a = 1
b = 'hi'
c = [1,2,3]

print(a,b,c) # 1 hi [1,2,3]
```

**참고로 print는 내부적으로 str 메소드를 호출합니다.** (중요)

서로 다른 타입의 데이터임에도 불구하고 오류 없이 잘 작동하죠? __str__ 메소드를 통해 **문자열이라는 하나의 형태로 통일**되었기 때문입니다.

```python
class test:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Hello, my name is {self.name}"


a = 1
b = "hi"
c = [1, 2, 3]
test_ = test("fox")

print(a, b, c, test_)
# 1 hi [1, 2, 3] Hello, my name is fox 출력
```

위의 예제에 커스텀 클래스와 인스턴스를 하나 생성하고 print에 같이 넣어보았습니다.

역시나 오류 없이 잘 작동되는 것을 확인할 수 있습니다.

​

**__repr__ 메소드**

__repr__ 메소드는 심플합니다. 이 메소드는 말 그대로 **'객체를 문자열로 표현'하기 위해 존재**합니다. **개발자에 초점**이 맞춰져 있습니다.

객체를 문자열로 표현했다는 말 그대로 **__repr__의 반환 값은 eval 함수에 사용 가능**하며, 이를 활용하여 **새로운 객체를 만들어 내는 것도 가능**합니다. **__str__ 메소드의 반환 값은 eval 함수에 사용할 수 없습니다.**

---
### **여담**
1. 파이썬에 존재하는 str() 메소드와 repr()메소드에 객체를 주고 실행하면 내부적으로 해당 객체의 __str__ 메소드와 __repr__ 메소드를 실행합니다.
2. __str__ 메소드를 정의하지 않았다면 __repr__ 메소드가 대신 쓰입니다. __str__ 메소드가 정의되었다면 __str__ 메소드를 사용합니다.
3. __str__메소드는 정의되었는데 __repr__ 메소드를 정의하지 않은 상태로 repr()메소드를 사용하면 __str__메소드를 대신 사용하지 않고 __repr__ 메소드의 디폴트 값을 사용합니다.
4. __str__ 메소드의 반환값은 **informal**, __repr__ 메소드의 반환값은 **formal** 하다고 표현하기도 합니다.