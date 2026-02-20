---
title: Jackson (Databind)
date: 2024-02-24
draft: false
tags:
  - Java
  - Json
complete: true
link: https://www.baeldung.com/jackson
---
## *Concept*
### Jackson Library 정의
https://github.com/FasterXML/jackson
> [!info] 
Jackson은 "Java JSON 라이브러리" 또는 "Java용 최고의 JSON 파서"로 알려져 있습니다. 또는 간단히 "Java용 JSON"으로 불립니다.

더 나아가서 Jackson은 Java (및 JVM 플랫폼)용 데이터 처리 도구 스위트로, 
- 주요한 스트리밍 JSON 파서/생성기 라이브러리, 
- 데이터 바인딩 라이브러리(POJO를 JSON으로 변환 및 역변환) 
- Avro, BSON, CBOR, CSV, Smile, (Java) Properties, Protobuf, TOML, XML 또는 YAML로 인코딩된 데이터를 처리하기 위한 추가 데이터 형식 모듈 등이 포함되어 있습니다. 
- 또한 Guava, Joda, PCollections와 같은 널리 사용되는 데이터 유형을 지원하기 위한 많은 데이터 형식 모듈도 제공합니다.


실제 핵심 구성 요소는 각각 독립된 프로젝트로 구성되어 있다:
#### Core Packages (3)
- [Streaming](https://github.com/FasterXML/jackson-core) ([docs](https://github.com/FasterXML/jackson-core/wiki)) ("jackson-core") defines low-level streaming API, and includes JSON-specific implementations
- [Annotations](https://github.com/FasterXML/jackson-annotations) ([docs](https://github.com/FasterXML/jackson-annotations/wiki)) ("jackson-annotations") contains standard Jackson annotations
- [Databind](https://github.com/FasterXML/jackson-databind) ([docs](https://github.com/FasterXML/jackson-databind/wiki)) ("jackson-databind") implements data-binding (and object serialization) support on `streaming` package; it depends both on `streaming` and `annotations` packages

#### Third-party datatype
- Standard Collections datatype modules
	- [jackson-datatype-eclipse-collections](https://github.com/FasterXML/jackson-datatypes-collections/tree/master/eclipse-collections): support for [Eclipse Collections](https://www.eclipse.org/collections/) (NEW in Jackson 2.10!)
	- [jackson-datatype-guava](https://github.com/FasterXML/jackson-datatypes-collections/tree/master/guava): support for many of [Guava](http://code.google.com/p/guava-libraries/) datatypes
	- [jackson-datatype-hppc](https://github.com/FasterXML/jackson-datatypes-collections/tree/master/hppc): support for [High-Performance Primitive Containers](http://labs.carrotsearch.com/hppc.html) containers
	- [jackson-datatype-pcollections](https://github.com/FasterXML/jackson-datatypes-collections/tree/master/pcollections): support for [PCollections](http://pcollections.org/) datatypes (since Jackson 2.7)
- Hibernate 
- Java 8 Modules
- Joda datatypes
- JSON-P

#### Data Format modules
- Avro
- CBOR
- CSV
- Ion
- Protobuf
- Smile
- TOML
- XML
- YAML


### Jackson-databind
Java 객체와 JSON 간의 변환 및 직렬화/역직렬화 작업을 수행하는데 사용된다.

#### Spring and Jackson
Spring 3.0 이후로부터, Jacskon과 관련된 API를 제공함으로써, Jackson라이브러리를 사용할때, 자동화 처리가 가능하게 되었습니다.

덕분에, JSON데이터를 직접 만들거나 GSON or SimpleJSON방식과 같이 직접 key와 value를 셋팅하는 방식에서 한단계 더 발전한 방식이 가능해졌다.

#### **Jackson은 어떻게 동작하는가?**
Spring은 @ResponseBody를 사용하여 컨트롤러의 리턴 값을 HTTP 응답 본문으로 변환할 때 MessageConverter를 활용한다. 또한 이를 활용하여 컨트롤러가 리턴하는 객체를 후킹 할 수 있다.

Jackson은 JSON데이터를 출력하기 위한 MappingJacksonHttpMessageConverter를 제공한다.  
만약 우리가 스프링 MessageConverter를 MappingJacksonHttpMessageConverter로 등록한다면, 컨트롤러가 리턴하는 객체를 다시 뜯어(자바 리플렉션 사용), Jackson의 ObjectMapper API로 JSON 객체를 만들고 난 후, 출력하여 JSON데이터를 완성한다.

더욱 편리해진 점은, Spring 3.1 이후로 만약 클래스패스에 Jackson 라이브러리가 존재한다면, ( 쉽게 말해 Jackson을 설치했느냐 안했느냐 ) 자동적으로 MessageConverter가 등록된다는 점이다.

덕분에 우리는 아래와 같이 매우 편리하게 사용할 수 있다.

```java
@RequestMapping("/json")
@ResponseBody()
public Object printJSON() {
   Person person = new Person("Mommoo", "Developer");
   return person;
}
```

이제는 그냥 데이터 인스턴스만 리턴 하더라도 JSON 데이터가 출력된다.  
위에서 설명한 방식보다 매우 진보한 방식인걸 알 수 있다.


### jackson-databind를 사용하기 위해 알아야할 지식

#### 역직렬화시 기본 생성자 & @JsonCreator
databind 가 Java 객체를 역직렬화하려면 2가지 조건이 필요하다.
##### NoargsConstructor
```java
public class Car {
    private String color;
    private String type;
    
    // Default constructor
    public Car() {
    }

    // Getters and setters
}
```

##### @JsonCreator
```java
public class Car {
    private String color;
    private String type;
    
    @JsonCreator
    public Car(@JsonProperty("color") String color, @JsonProperty("type") String type) {
        this.color = color;
        this.type = type;
    }

    // Getters and setters
}
```

#### Jackson은 기본적으로 프로퍼티로 동작한다.
Java는 프로퍼티를 제공하는 문법이 없다. (멤버변수랑은 다르다)  
Java의 프로퍼티는 보통 Getter 와 Setter의 이름 명명 규칙으로 정해진다.

Person 같은 경우는 Getter만 존재 하므로, Getter를 기준으로 프로퍼티를 도출 할 수 있다. 즉 Name 과 Job이 Person 프로퍼티이다.

Person의 멤버변수 이름도 똑같이 name, job이지만, 앞서 설명했듯 프로퍼티는 Getter, Setter기준이므로 멤버변수 이름을 변경하더라도 상관 없다.

갑자기 프로퍼티를 설명한 이유는 많은 라이브러리가 해당 프로퍼티 개념으로 작동하기 때문이다.

Jackson라이브러리도 마찬가지다.  
JSON데이터로 출력되기 위해서는 멤버변수의 유무가 아닌 프로퍼티, 즉 Getter, Setter를 기준으로 작동한다.

따라서 예로 아래와 같이 코딩하더라도 전혀 문제가 없다.

```java
public class Person {
   public String getName() {
       return "Mommoo";
  }
   
   public String getJob() {
       return "Developer";
  }
}

@RequestMapping("/json")
@ResponseBody()
public Object printJSON() {
   return new Person();
}
```


#### Jackson의 데이터 매핑을 Getter가 아닌, 멤버변수로 하고 싶다면?
그렇다면, 이번에는 Jackson의 매핑을 프로퍼티가 아닌 멤버변수로 할 수 있는 방법을 알아보자.

Jackson은 이와 관련해 `@JsonProperty` 어노테이션 API를 제공한다.  
아래와 같이 멤버변수 위에 프로퍼티 이름과 함께 선언해준다면, JSON데이터로 출력된다.

```java
public class Person {
@JsonProperty("name")
   private String myName = "Mommoo";
}
```

위의 예시는 `{"name": "Mommoo"}` 로 출력된다.
그렇다면 JSON 매핑을 멤버변수로 하고 싶다면, 매번 @JsonProperty를 선언 해야 할까?



#### Jackson의 데이터 매핑 법칙 변경하기
Jackson은 매핑 법칙을 바꿀 수 있는 `@JsonAutoDetect` API를 제공한다.

위 예시와 같이 멤버변수로만 Jackson을 구성하고 싶은 경우, @JsonProperty를 일일이 붙이는 것보다 아래와 같이 설정하는 것이 더 편리하다.

```java
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Person {
   private String myName = "Mommoo";
}
```

@JsonAutoDetect는 멤버변수 뿐만 아니라, Getter, Setter의 데이터 매핑 정책도 정할 수 있다.  
아래의 경우는 멤버변수 뿐만 아니라, 기본정책인 Getter역시 데이터 매핑이 진행된다.

```java
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Person {
   private String myName = "Mommoo";
   
   public String getJob() {
       return "Developer";
  }
}
```

Getter를 제외하고 싶다면, `@JsonIgnore` API를 쓰면된다.

```java
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Person {
   private String myName = "Mommoo";
   
   @JsonIgnore
   public String getJob() {
       return "Developer";
  }
}
```

하지만, 이것조차 일일이 붙여야 하는 상황이 온다면 매핑 정책을 바꾸는게 좋다.

아래예시는 Getter정책으로 private 만 데이터 바인딩에 제외했다.

```java
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
public class Person {
   private String myName = "Mommoo";
   
   public String getJob() {
       return "Developer";
  }
}
```

이렇게 제외범위를 설정할 수 있는데, 자세한건 아래링크를 참조하자.  
[https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonAutoDetect.Visibility.html](https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonAutoDetect.Visibility.html)


#### Jackson의 데이터 상태에 따른 포함 관계 설정
만약 Jackson데이터 매핑시 NULL 값과 같은 특정 데이터 상태인 경우를 제외하고 싶다면 어떻게 해야 할까?

Jackson은 이와 관련하여 `@JsonInclude` API를 제공한다.  
NULL을 클래스 전반적으로 제외하고 싶다면, 클래스 위에 선언하면 됩니다.  
또한 특정 프로퍼티가 NULL일때 해당 프로퍼티만을 제외하고 싶다면 역시 해당 프로퍼티위에 선언하면 된다.

```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Person {
   private String myName = "Mommoo";
   
   public String getJob() {
       return "Developer";
  }
}

public class Person {
   private String myName = "Mommoo";
   
   @JsonInclude(JsonInclude.Include.NON_NULL)
   public String getJob() {
       return "Developer";
  }
}
```

JsonInclude.Include 속성은 NON_NULL뿐만 아니라 몇몇 개가 더 존재한다.

자세한건 아래링크를 참고하자.  
[https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonInclude.Include.html](https://fasterxml.github.io/jackson-annotations/javadoc/2.9/com/fasterxml/jackson/annotation/JsonInclude.Include.html)


### Serialize & Deserialize
Jackson은 객체를 JSON으로 직렬화하고 JSON 데이터를 객체로 역직렬화하는 데 사용된다. 이러한 기능은 RESTful 웹 서비스와 같은 다양한 환경에서 데이터 통신을 단순화한다.

**직렬화(Serialize)**
- 자바 시스템 내부에서 사용되는 Object 또는 Data를 외부의 자바 시스템에서도 사용할 수 있도록 byte 형태로 데이터를 변환하는 기술
- JVM의 메모리에 상주(힙 또는 스택)되어 있는 객체 데이터를 바이트 형태로 변환하는 기술

**역직렬화(Deserialize)**
- byte로 변환된 데이터를 원래대로 Object나 Data로 변환하는 기술을 역직렬화(Deserialize)라고 한다.
- 직렬화된 바이트 형태의 데이터를 객체로 변환해서 JVM으로 상주시키는 형태

### Json Node
JsonNode는 Jackson에서 제공하는 트리 모델이다. JSON 데이터를 Java에서 사용하기 편리한 형태로 표현하는 데 사용된다. JsonNode를 사용하여 JSON 데이터를 조작하고 분석할 수 있다.  
이 클래스의 서브 클래스들이 있는데 JsonNode의 역할을 세분화한 버전이라고 생각하면 된다. `com.fasterxml.jackson.databind.node`패키지에서 확인 할 수 있다.  
json 문자열을 jsonNode 객체로 변환하기 위해 objectMapper 클래스의 다음 메서드들을 사용할 수 있다.

- readTree()  
    `public JsonNode readTree(String content)`  
    Json 문자열을 받아서 JsonNode 객체를 리턴한다.
    
- readValue()  
    `public <T> T readValue(String content, Class<T> valueType)`  
    readValue() 메서드는 2번째 파라미터로 Json 문자열을 변환할 클래스 타입을 입력받아 변환 후 입력받은 클래스 타입의 객체로 리턴한다.  
    이 메서드를 이용하면 Json 문자열을 Json Node 뿐 아니라 다른 객체 타입으로 변환하여 리턴할 수 있다.


### Gson vs Jackson
Gson은 Java Object를 Json 표현으로 변환하는 데 사용할 수 있는 Java 라이브러리로
Json 문자열을 동등한 Java객체로 변환하는 데 사용할 수 있습니다.
Gson은 구글에서 만들었으며, 가벼운 데이터를 처리할 때 성능이 좋다고 합니다.

### [Jackson 취약점](https://www.osckorea.com/post/asiaeseo-gajang-manhi-daunrodeu-doen-cwiyaghan-oss-guseongyoso-5gae)
Jackson‑Databind는 전 세계 개발자들에게 축복임과 동시에 저주였던 매우 인기있는 구성요소입니다.

1. 취약점 이름: Sonatype‑2017‑0312
2. 관련 CVES: CVE‑2017‑7525, CVE‑2017‑15095, CVE‑2017‑17485, CVE‑2018‑5968, CVE‑2018‑7489, CVE‑2018‑11307, CVE‑2018‑12022, CVE‑2018‑12023, CVE‑2018‑14718, CVE‑2018‑14719, CVE‑2018‑14720, CVE‑2018‑14721, CVE‑2019-12086, CVE‑2019‑12384, CVE‑2019‑12814, CVE‑2019‑14379, CVE‑2019‑14439, CVE‑2019‑14540, sonatype‑2019‑0371 및 CVE‑203
3. 취약점 유형: 원격으로 이어지는 직렬화 해제 코드 실행(RCE)
4. 구성 요소 이름: com.fasterxml.jackson.core:jackson‑databind
5. 영향을 받는 버전: ( , 2.10.0)
6. 심각도 :
(1) CVSS 3.0 점수 : 8.5
(2) CVSS 측정항목 : CVSS:3.0/AV:N/AC:H/PR:L/ UI:N/S:C/C:H/I:H/A:H

이 취약한 구성 요소에 대한 공격 벡터는 애플리케이션에 대한 입력으로 제공되는 신뢰할 수 없는 데이터의 역직렬화에 있습니다. 공격자가 직렬화된 개체 데이터에 영향을 미치고 악성 코드를 삽입할 수 있는 경우 해당 코드는 비직렬화 시 응용 프로그램 환경에 큰 피해를 줄 수 있습니다.

Sonatype 데이터 연구팀은 최근 프로젝트에서 jackson‑databind의 역직렬화 취약점에 대한 충분하고 전체적인 수정 버전 2.10.0 을 출시했습니다.

7. 대응 방안
최소한 버전 2.10.0으로 업그레이드해야 합니다. 이 취약점을 완화하기 위해 Maven Central에 있는`com.fasterxml.jackson.core:jackson‑databind` 및 ` enableDefaultTyping ()` 의 사용을 `activateDefaultTyping()` 으로 변경해야 합니다.

### Jackson의 Visibility
일반적인 로컬 캐싱에서는 객체 자체가 메모리에 보관되기 때문에 값의 일관성을 쉽게 보장할 수 있습니다. 하지만 외부에 데이터를 저장하는 글로벌 캐싱의 경우는 직렬화 옵션에 따라 직렬화 과정에서 실제 객체의 값과 다른 값이 생성될 수도 있고, 역직렬화 과정에서 기존의 값과 다른 값이 객체에 주입될 가능성이 있습니다.

이러한 데이터 불일치성을 해결하기 위해 Jackson의 visibility 옵션을 활용 할 수 있습니다.

Jackson은 field, getter, setter, constructor 등 여러가지 방식으로 직렬화/역직렬화를 제공합니다.

그리고 visibility 옵션을 이용하여 어떤 것들을, 어떤 접근제한자를 이용하여 직렬화/역직렬화할지 선택할 수 있습니다.

예를 들면 모든 visibility를 막아두고, 모든 getter만 이용하여 직렬화한다면 아래처럼 객체가 직렬화됩니다. 생성자와 propertyA가 보이지 않기 때문에 propertyB만 직렬화가 되었습니다.

```java
class Data {
    private String propertyA;
    private String propertyB;

    public Data(String propertyA, String propertyB) {
        this.propertyA = propertyA;
        this.propertyB = propertyB;
    }

    public String getPropertyB() {
        return propertyB;
    }

    public void setPropertyB(String propertyB) {
        this.propertyB = propertyB;
    }
}

Data data = new Data("A", "B");

String json = new ObjectMapper()
        .setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE)
        .setVisibility(PropertyAccessor.GETTER, JsonAutoDetect.Visibility.ANY)
        .writeValueAsString(data);

System.out.println(json); // ==> {"propertyB":"B"}
```

하지만 이 변환된 JSON을 동일한 타입으로 역직렬화하려면 에러가 발생합니다. 역직렬화할 때 객체를 생성할 constructor 혹은 값을 주입해줄 setter가 visibility 옵션에 의해 가려져 보이지 않기 때문입니다.

### 캐싱에서의 Visibility 활용

결론부터 말씀드리자면 다른 visibility는 모두 비활성화하고 field만 보이도록 했습니다. 그 이유는 아래와 같습니다.

- 간혹 getter에 부가적인 로직이 들어있어 getter를 사용하면 다른 값으로 직렬화될 가능성이 있습니다.
- immutability을 위해 setter를 제공하지 않는 경우가 있습니다.
- constructor 혹은 setter의 파라미터 이름이 필드명과 일치하지 않을 가능성이 있습니다.

위의 내용은 사실 전부 하나의 요인에서 나오고 있습니다. constructor, getter, setter 등은 사람이 로직을 임의로 정의하고 변경할 수 있기 때문입니다.

이러한 점은 자바의 기본 클래스인 `Throwable`에서도 나타납니다. `Throwable`의 메세지 필드의 이름은 `detailMessage`입니다. 이 필드는 immutable로 getter만 제공되고, constructor에서만 초기화할 수 있습니다.

하지만 getter와 constructor에서 사용되는 이름은 `message`입니다. getter의 이름은 `getMessage()`이며 constructor에서는 `message`란 변수명으로 받고 있습니다. 이로 인해 직렬화시에는 `detailMessage`와 `message`라는 필드가 동시에 생성되고, 역직렬화시에 중복으로 데이터 주입이 이루어집니다.

```java
// in Throwable.java
private String detailMessage;

public Throwable(String message) {
    fillInStackTrace();
    detailMessage = message;
}

public String getMessage() {
    return detailMessage;
}
```

캐싱은 보다 상위 개념이기에 클래스들은 캐싱의 존재를 몰라야합니다. 그렇기에 개발자가 클래스를 개발할 때마다 캐싱을 고려해서 클래스를 만들지는 않을 것입니다. 그래서 개발자가 값에 대한 오퍼레이션을 임의로 정의할 수 있는 constructor, getter, setter 등을 제외하고 데이터 고유의 값인 field의 값만을 가지고 직렬화하도록 설계했습니다.

또한 데이터가 불일치하는 상황이 발생하면 예외를 발생시키도록 역직렬화 옵션에 `FAIL_ON_UNKNOWN_PROPERTIES`을 활성화시켰습니다. (기본값이 활성화입니다.)

```java
new ObjectMapper()
    .setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE)
    .setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
```

---


## *Basics*
gradle setup
```gradle
plugins {  
    id 'java'  
}  
  
group 'org.example'  
version '1.0-SNAPSHOT'  
  
repositories {  
    mavenCentral()  
}  
  
dependencies {  
    implementation 'org.projectlombok:lombok:1.18.22'  
    
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.8.1'  
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.8.1'  
    
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.3'  
    implementation 'com.fasterxml.jackson.core:jackson-core:2.15.3'  
    implementation 'com.fasterxml.jackson.core:jackson-annotations:2.15.3'  
}  
  
test {  
    useJUnitPlatform()  
}
```


### Read & Write Value API
- `readValue` API (deserialize): JSON → POJO
- `writeValue` API (serialize): POJO → JSON


### POJO <=> Json
```java
@Getter  
@Setter  
public class Car {  
    private String color;  
    private String type;  
    
    @JsonCreator  
    public Car(@JsonProperty("color") String color, @JsonProperty("type") String type) {  
        this.color = color;  
        this.type = type;  
    }  
}
```
#### pojo to json
- ObjectMapper 사용
```java
static ObjectMapper objectMapper = new ObjectMapper();  
  
public static String carToJson(Car car) throws Exception {  
    String carString = objectMapper.writeValueAsString(car);  
    return carString;  
}
```

#### json to pojo
```java
public static Car jsonToCar(String carString) throws Exception {  
    Car car = objectMapper.readValue(carString, Car.class);  
    return car;  
}
```

#### json file to pojo
```java
Car car = objectMapper.readValue(new File("src/test/resources/json_car.json"), Car.class);
```


#### json url to pojo
```java
Car car = objectMapper.readValue(new URL("file:src/test/resources/json_car.json"), Car.class);
```




### JsonNode <=> Json
#### json to jsonNode
```java
String json = "{ \"color\" : \"Black\", \"type\" : \"FIAT\" }"; 
JsonNode jsonNode = objectMapper.readTree(json); 
String color = jsonNode.get("color").asText(); 

// Output: color -> Black
```




### Java List <=> Json Array
#### json array to java list
```java
String jsonCarArray =   
        "[" +  
            "{ \"color\" : \"Black\", \"type\" : \"BMW\" }, " +  
            "{ \"color\" : \"Red\", \"type\" : \"FIAT\" }" +  
        "]";  
List<Car> listCar = objectMapper.readValue(jsonCarArray, new TypeReference<List<Car>>(){});  
listCar.forEach(car -> System.out.println(car.getType()));
```



### Java Map <=> Json
#### json to java map
```java
String json = "{ \"color\" : \"Black\", \"type\" : \"BMW\" }";
Map<String, Object> map = objectMapper.readValue(json, new TypeReference<Map<String,Object>>(){});
```


---
## *Advanced*
Jackson의 가장 큰 장점중 하나는 직렬화 & 역직렬화를 커스텀하게 사용할수 있도록 제공한다는것이다.

### 새로운 필드 설정
Json에서 Java Object로 변환시 새로운 필드가 추가되어 변환하려 한다면 예외가 발생한다.

기존 필드
```java
String jsonString = "{ \"color\" : \"Black\", \"type\" : \"Fiat\"}";

```

새로운 필드
```java
String jsonString = "{ \"color\" : \"Black\", \"type\" : \"Fiat\", \"year\" : \"1970\" }";
```

```
Exception in thread "main" com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "year" (class org.example.json.domain.Car), not marked as ignorable (2 known properties: "type", "color"])
```

이것을 바로 `Configure` method로 해결 가능하며, 여러가지 옵션이 존재한다
- FAIL_ON_UNKNOWN_PROPERTIES 
- FAIL_ON_NULL_FOR_PRIMITIVES
- FAIL_ON_NUMBERS_FOR_ENUM
##### FAIL_ON_UNKNOWN_PROPERTIES
```java
objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
Car car = objectMapper.readValue(jsonString, Car.class);

JsonNode jsonNodeRoot = objectMapper.readTree(jsonString);
JsonNode jsonNodeYear = jsonNodeRoot.get("year");
String year = jsonNodeYear.asText();
```

### 날짜 설정하기



---

## *Customization*

---

## Annotations
### @JsonAnyGetter
- Map 필드를 다루는데 유연성을 제공
- 이 엔티티의 인스턴스를 직렬화 할 때, 타입이 Map인 멤버변수의 Getter위에 선언하면, 모든 '키 - 값' 을 표준 일반 속성으로 가져온다. ("key":"value" 형식으로 나온다)

```java
@Getter
@Builder
public static class ExtendableBean {
    public String name;
    private Map<String, String> properties;

    @JsonAnyGetter
    public Map<String, String> getProperties() {
        return properties;
    }
}
```

<결과>

```java
//적용전
{
  "name": "yun",
  "properties": {
    "key1": "value1",
    "key2": "value2"
  }
}
//적용후
{
  "name": "yun",
  "key1": "value1",
  "key2": "value2"
}
```


### @JsonGetter
getter 이름 기반으로 키값이 정해지는것을 어노테이션으로 제어

```java
@Builder
public static class MyBean {
    public int id;
    private String name;

    @JsonGetter("name")
    public String getTheName() {
        return name;
    }
}
```

<결과>

```java
//적용전
{
  "id": 1,
  "theName": "yun"
}
//적용후
{
  "id": 1,
  "name": "yun"
}
```


### @JsonPropertyOrder
Json 직렬화 순서를 제어

```java
@JsonPropertyOrder({"name", "id"})
@Builder
public static class PropertyOrder {
    private long id;
    private String name;
}
```

<결과>

```java
//적용전
{
  "id": 1,
  "name": "name"
}
//적용후
{
  "name": "name",
  "id": 1
}
```


### @JsonValue
전체 인스턴스를 직렬화할 때 사용하는 단일 메서드를 나타낸다.  
예를들어, enum에서 getName 메서드에 @JsonValue를 넣어주어 이름을 통해 직렬화 할 수 있다.

말이 조금 어려울 수 있는데 예시를 보자.

```java
public enum TypeEnumWithValue {
    TYPE1(1, "치킨"), TYPE2(2, "피자");

    private Integer id;
    private String name;

    TypeEnumWithValue(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    //@JsonValue
    public String getName() {
        return name;
    }
}
```

이 enum 은 TYPE1 과 TYPE2가 있다.  
하단의 getName에 @JsonValue 어노테이션을 주석처리해뒀다.  
만약 저 어노테이션이 없다면, 이 enum을 json으로 직렬화 할 때 enum 이름으로 직렬화가 된다.

`new ObjectMapper().writeValueAsString(TypeEnumWithValue.TYPE1);`

즉 이 결과가 다음과 같이 나오게 된다. (애노테이션 없을 시)

`TYPE1`

enum의 name 필드로 직렬화를 하고 싶다면 (치킨, 피자..) @JsonValue 어노테이션을 getName() 메서드위에 붙인다.

```java
@JsonValue
public String getName() {
    return name;
}
```

이렇게 직렬화 시 나오는 필드를 결정하고, 결과적으로 다음과 같은 내용을 얻을 수 있다.

```null
치킨
```


### @JsonRawValue
Jackson이 속성을 그대로 직렬화하여 JSON으로 변경

```java
@Builder
    public static class RawBean {
        public String name;

        @JsonRawValue
        public String json;
    }
```

<결과>

```java
//적용전
{
  "name": "yun",
  "json": "{\n  \"attr\":false\n}"
}
//적용후
{
  "name": "yun",
  "json": {
    "attr": false
  }
}
```


### @JsonRootName
```java
@Builder
@JsonRootName(value = "user")
public static class UserWithRoot {
    public int id;
    public String name;
}

//objectMapper.enable(SerializationFeature.WRAP_ROOT_VALUE); 반드시 적용해야함
```

<결과>

```java
//적용전
{
  "id": 1,
  "name": "yun"
}
//적용후
{
  "user": {
    "id": 1,
    "name": "yun"
  }
}
```

### 그외
```java
@JsonIgnoreProperties : json으로 변환(Serialize, Deserialize) 시 제외시킬 속성을 지정. VO class 위에서 선언

@JsonIgnore : VO의 멤버변수 위에 선언해서 제외처리 (비밀번호 같은거)

@JsonProperty : json으로 변환 시에 사용할 이름이다. (DB 칼럼과 이름이 다르거나 api 응답과 이름이 다르지만 매핑시켜야 할 때)

@JsonInclude : 값 존재 유무에 따라 Serialize 시 동작을 지정 (default는 ALWAYS)
	ALWAYS : 속성의 값에 의존하지 말고 항상 포함
	NOT_EMPTY : null 또는 값이 빈 경우가 아니면 포함
	NOT_NULL : null 이 아니면 포함
	NOT_DEFAULT : bean의 기본생성자로 정의된 필드값과 다르게 변경된 필드만 포함

@JsonAnyGetter : Map 타입의 멤버변수의 getter 위에 선언한다. json 변환 시 "key":"value" 형식으로 나온다.

@JsonAnySetter : Deserialize 때

@JsonGetter : 어떤 필드값을 가져올 떄 이 메소드로 접근해서만 가져오라고 jackson에게 명시적으로 알린다.

@JsonSetter : 위와 동일, Deserialize 때

@JsonAutoDetect :

@JsonUnwrapped : 어떤 필드가 대해 중첩 구조로 넣는다면, 그러지 말라고 명시적으로 알린다

@JsonRootName : VO class 위에 선언해서 wrapping 해서 json 변환

@JsonFormat : 날짜, 시간값을 직렬화할 때 형식을 지정

@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
```
