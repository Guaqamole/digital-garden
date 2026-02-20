---
title: Jackson
date: 2023-12-20
draft: false
tags:
  - Springboot
  - Annotation
complete: true
---
### @JsonIgnoreProperties
`@JsonIgnoreProperties` (ignoreUnknown = true): JSON 응답 필드 중에서 클래스에 상응하는 멤버 변수가 없는 경우, Jackson 역직렬화 메커니즘이 이를 무시하도록 합니다 필요한 경우 필드 수준 어노테이션은 구체적인 지침을 제공합니다. 이 클래스에 사용된 `@JsonIgnoreproperties`와 `@ld` 어노테이션이 필드 수준 어노테이션에 해당합니다.


### @Jsonproperty
`@Jsonproperty(“vert_rate”)` 한 멤버 변수를 다른 이름이 붙은 JSON 필드와 연결합니다.

@Data 어노테이션으로 모든 멤버 변수의 게터와세터 메서드를 생성할 수 있다면, 여기서는 왜 굳이 lnstant 타입의 세 멤버 변수에 명시적 접근자와 변경자를 생성했는지 궁금할 것입니다.

이 세 가지 경우, lnstant: :parse 메서드를 호출해 JSON 값을 파싱parsing하고 string에서 복잡한 데이터 타입으로 변환해야 합니다.

만약 해당 값이 전혀 없다면(null인 경우), 다른 로직을 수행해 parse()에 null 값을 전달하지 않고 세터를 통해 해당 멤버 변수에 의미 있는 대제 값을 할당해야 합니다.

또 string으로 변환하면 인스턴트 값을 가장 잘 직렬화하기 때문에 명시적 게터 메서드를 사용했습니다.

일단 도메인 클래스를 하나 정의하고 나면, 레디스 데이터베이스에 액세스하는 메커니즘을 생성하고 설정할 차례입니다.