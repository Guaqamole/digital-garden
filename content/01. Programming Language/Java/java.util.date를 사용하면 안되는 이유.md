---
title: java.util.date를 사용하면 안되는 이유
date: 2024-04-25
draft: false
tags:
  - Java
complete: true
link: https://d2.naver.com/helloworld/645609
---
## *Introduction*

Java의 기본 SDK에서 날짜와 시간을 다루는 java.util.Date 클래스와 java.util.Calendar 클래스는 사용하기 불편하다는 악평이 자자합니다. 이를 답답하게 여긴 사람들이 이 클래스를 대체하려고 Joda-Time 같은 오픈소스 라이브러리를 만들기도 했습니다. 많이 늦었지만 다행히 JDK 8에서는 개선된 날짜와 시간 API가 제공됩니다.

이 글에서는 Java의 날짜와 시간 API의 문제점이 무엇이었는지 되짚어 보고, 여러 오픈소스 라이브러리와 JDK 8에서는 문제점이 어떻게 개선되었는지 확인해 보겠습니다.

### 1582년 10월 4일의 다음 날은?

<예제 1>에서는 UTC(Universal Time Coordinated, 세계협정시) 시간대를 기준으로 1582년 10월 4일에 하루를 더한 날짜가 10월 5일인 것을 테스트하고 있다. JUnit과 Fest Assertions 라이브러리[1]를 활용했다.

예제 1 1일 후 구하기

```java
public class OldJdkDateTest {

    @Test
    public void shouldGetAfterOneDay() {
        TimeZone utc = TimeZone.getTimeZone("UTC");
        Calendar calendar = Calendar.getInstance(utc);
        calendar.set(1582, Calendar.OCTOBER , 4);
        String pattern = "yyyy.MM.dd";
        String theDay = toString(calendar, pattern, utc);
        assertThat(theDay).isEqualTo("1582.10.04");


        calendar.add(Calendar.DATE, 1);
        String nextDay = toString(calendar, pattern, utc);
        assertThat(nextDay).isEqualTo("1582.10.05");
    }

    private String toString(Calendar calendar, String pattern, TimeZone zone) {
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        format.setTimeZone(zone);
        return format.format(calendar.getTime());
    }
```

이 테스트는 실패한다. <예제 1>에서 계산한 1582년 10월 4일의 다음 날은 1582년 10월 15일이다. 따라서 마지막 줄을 다음과 같이 고쳐야 테스트를 통과한다.

예제 2 <예제 1>의 마지막 줄 수정

```java
assertThat(nextDay).isEqualTo("1582.10.15");  
```

1582년에서 실종된 10일은 그레고리력을 처음 적용하면서 율리우스력에 의해 그동안 누적된 오차를 교정하기 위해서 건너뛴 기간이다. 태양의 황경이 0도가 되는 춘분이 1582년에는 10일 정도 어긋나게 되었다. 교황 그레고리우스 13세는 더 정교한 그레고리력을 1582년 10월 15일에 처음 적용했고, 10월 5 ~ 14일의 날짜는 그 해 달력에서 제외시켰다. 율리우스력은 4년마다 윤년을 두지만, 그레고리력에서는 4년마다 윤년을 두되 매 100번째 해는 윤년이 아니고, 매 400번째 해는 윤년이라는 차이가 있다.

<예제 1>에서 Calendar.getInstance() 메서드는 java.util.GregorianCalendar 클래스의 인스턴스를 반환한다. GregorianCalendar 클래스는 그레고리력과 율리우스력을 같이 구현하고 있고, setGregorianChange() 메서드로 두 역법의 전환 시점을 지정할 수 있다. 그런데 AD 4년의 3월 1일 이전에는 윤년을 불규칙하게 두었기 때문에 GregorianCalendar 클래스로 구한 날짜는 정확하지는 않다. 이런 설명은 GregorianCalendar 클래스의 API 문서[2]에 나와 있다.

Calendar.getInstance() 메서드는 GregorianCalendar 외에도 Locale 정보에 따라서 JapaneseImperialCalendar, BuddhistCalendar 등도 반환한다. 역사와 천문학이 복합적으로 담긴 클래스라 할 만하다.

### 서울 1988년 5월 7일 23시의 1시간 후는?

<예제 3>에서는 'Asia/Seoul' 시간대에서 '1988.05.07 23:00'의 1시간 후가 '1988.05.08 00:00'임을 테스트하고 있다.

예제 3 1시간 후 구하기

```java
@Test
public void shouldGetAfterOneHour() {  
    TimeZone seoul = TimeZone.getTimeZone("Asia/Seoul");
    Calendar calendar = Calendar.getInstance(seoul);
    calendar.set(1988, Calendar.MAY , 7, 23, 0);
    String pattern = "yyyy.MM.dd HH:mm";
    String theTime = toString(calendar, pattern, seoul);
    assertThat(theTime).isEqualTo("1988.05.07 23:00");

    calendar.add(Calendar.HOUR_OF_DAY, 1);
    String after1Hour = toString(calendar, pattern, seoul);
    assertThat(after1Hour).isEqualTo("1988.05.08 00:00");
}
```

이 테스트도 실패한다. 이상하게도 1시간 후는 5월 8일 새벽 1시이다. 이는 그 시기에 서울에 적용된 일광절약시간제(Daylight Saving Time), 즉 서머타임 때문이다. 서머타임이 시작되는 시점에서는 1시간을 건너뛴다. 해당 시간대가 서머타임 적용 시간대인지는 TimeZone.inDaylightTime() 메서드로 확인할 수 있다. <예제 3>의 마지막 2줄을 다음과 같이 바꾸면 테스트를 통과하고, 이 시간대에 일어난 일을 좀 더 잘 설명할 수 있다.

예제 4 <예제 3>의 마지막 줄 수정

```java
assertThat(seoul.inDaylightTime(calendar.getTime())).isTrue();  
assertThat(after1Hours).isEqualTo("1988.05.08 01:00");  
```

그러나 이 결과에도 여전히 의문이 남는다. 위키백과에 정리된 한국 표준시 자료[3]나 과거의 보도 기사[4]를 찾아보면 그 해 서머타임이 시작된 시간은 5월 8일 새벽 2시였다. 시간대 데이터베이스(timezone database)의 오류일까? 아니면 시간대 데이터베이스에서 기록한 시간에 특별한 이유가 있는 것일까? 아직 정확한 답은 찾지 못했다.

우리나라는 1988년 이후로는 지금까지 서머타임을 실시하지 않고 있지만 2009년에 정부가 적극적으로 도입을 검토하기도 했었다.[5] 그리고 미국은 2007년부터 서머타임을 한 달 더 늘려서 시행하고 있다. 이렇게 서머타임은 국가마다 계속 변화하는 제도인데 Java는 그런 데이터를 어디에서 참조하고 있을까?

앞에서 말한 시간대 데이터베이스라는 곳에 그런 데이터가 정리된다. tzdata, IANA Time Zone database, Olson database 등 다양한 이름으로 불리는 이 정보는 Java 외에도 Oracle, PHP 등 다양한 플랫폼에서 활용되는 국제 표준 데이터이다. Java는 운영체제에 의존하지 않고 독립적으로 시간대 데이터를 업데이트한다. 즉, 운영체제의 시간대 패치가 업데이트되지 않아도 Java는 최신 정보를 유지할 수 있고, 운영체제의 시간대 패치는 Java의 시간대 정보에 영향을 미칠 수 없다. 그리고 TZUpdater라는 도구로 JRE 전체를 업그레이드하지 않고 시간대 데이터만 최신으로 갱신하는 방식도 지원한다.[6]

JRE의 최신 시간대 데이터의 변경 이력을 보면 요르단, 리비아 등에서 일어난 변경 사항이 2013년에도 반영된 것을 확인할 수 있다.[7] 아마 우리나라 제도에 변화가 생긴다면 이 데이터가 잘 갱신되었는지 유심히 살펴봐야 할 것이다.

### 서울 1961년 8월 9일 23시 59분의 1분 후는?

<예제 5>는 '1961.08.09 23:59'의 1분 후가 '1961.08.10 00:00'임을 테스트하고 있다.

예제 5 1분 후 구하기

```java
@Test
public void shouldGetAfterOneMinute() {  
    TimeZone seoul = TimeZone.getTimeZone("Asia/Seoul");
    Calendar calendar = Calendar.getInstance(seoul);
    calendar.set(1961, Calendar.AUGUST, 9, 23, 59);
    String pattern = "yyyy.MM.dd HH:mm";
    String theTime = toString(calendar, pattern, seoul);
    assertThat(theTime).isEqualTo("1961.08.09 23:59");

    calendar.add(Calendar.MINUTE, 1);
    String after1Minute = toString(calendar, pattern, seoul);
    assertThat(after1Minute).isEqualTo("1961.08.10 00:00");
}
```

이 테스트도 실패한다. 신기하게도 23시 59분의 1분 후는 0시 30분이다. 다음과 같이 마지막 줄을 수정하면 테스트를 통과할 수 있다.

예제 6 <예제 5>의 마지막 줄 수정

```java
assertThat(after1Minute ).isEqualTo("1961.08.10 00:30");  
```

1961년 8월 10일은 대한민국의 표준시가 UTC+8:30에서 현재와 같은 UTC+9:00로 변경된 시점이다. 일제 강점기 동안 UTC+9:00이었던 표준시가 해방 이후 1954년에 UTC+8:30으로 바뀌었다가 1961년에 다시 UTC+9:00으로 바뀐다.[8] 이 표준시 변경 때문에 30분을 건너뛰게 된 것이다.

1961년 당시 최고 권력 기관이었던 국가재건최고회의는 표준시를 일본과 동일하게 바꾸기로 결정했다. 최근에는 일제의 잔재에서 벗어난다는 의미에서 다시 한 번 표준시를 바꾸자는 의견도 나오고 있다.[9] 우리나라 근현대사와 관련이 있는 예제라고 할 만하다.

### 협정세계시 2012년 6월 30일 23시 59분 59초의 2초 후는?

<예제 7> 은 UTC(협정세계시) '2012.06.30 23:59:59'의 2초 후가 '2012.07.01 00:00:01'인 것을 테스트하고 있다.

예제 7 2초 후 구하기

```java
@Test
public void shouldGetAfterTwoSecond() {  
    TimeZone utc = TimeZone.getTimeZone("UTC");
    Calendar calendar = Calendar.getInstance(utc);
    calendar.set(2012, Calendar.JUNE, 30, 23, 59, 59);
    String pattern = "yyyy.MM.dd HH:mm:ss";
    String theTime = toString(calendar, pattern, utc);
    assertThat(theTime).isEqualTo("2012.06.30 23:59:59");

    calendar.add(Calendar.SECOND, 2);
    String afterTwoSeconds = toString(calendar, pattern, utc);
    assertThat(afterTwoSeconds).isEqualTo("2012.07.01 00:00:01");
}
```

지금까지의 예제와는 다르게 위의 테스트는 잘 통과한다. 별로 특별할 것이 없다면 이번 예제는 왜 넣었을까? 2012년 6월 30일은 가장 최근에 '윤초'가 적용된 때이다. 즉 <예제 7>의 결과는 윤년이나 서머타임과는 달리 Java에서 윤초가 Calendar 연산에 적용되지 않는다는 것을 보여 준다.

윤년보다는 다소 낯선 윤초가 필요한 이유는 다음과 같다. UTC는 세슘 원자의 진동수에 바탕을 둔 원자시계가 기준이고, UT1(세계시)은 지구의 움직임을 관찰한 결과가 기준이다. 원자시계는 일정한 반면에 지구의 움직임은 미세하게나마 불규칙적이므로 이 둘 사이에는 오차가 발생한다. 윤초는 그 둘의 오차를 보정하기 위하여 추가하는 1초이다. 국제지구자전사업(IERS, International Earth Rotation Service)이라는 기관에서 윤초 수정에 대해 결정한다.

최근에는 윤초를 폐지하자는 주장도 일어나고 있다.[10] 윤초가 컴퓨터 시스템에서 복잡한 문제를 일으킬 수 있기 때문이다. 대부분의 시스템에서 시간은 데이터 정렬, 복제에 핵심적인 키 역할을 한다. 윤초의 적용으로 만약 같은 초가 반복된다면 그 사이의 데이터가 엉킬 가능성이 크다.

윤초가 마지막으로 적용된 2012년 6월 30일에는 [Reddit](http://www.reddit.com/), [Foursquare](https://www.foursquare.com/), [Yelp](http://www.yelp.com/), [LinkedIn](https://www.linkedin.com/) 등 많은 기업이 장애를 겪었다. Linux + Java 환경의 시스템이 많았고, Cassandra, Hadoop, Elasticsearch 등 데이터 저장, 검색 플랫폼에서 CPU를 100% 사용하는 문제가 발생했다고 한다.[11] 국내에서도 Hadoop을 사용하는 시스템에서 유사한 문제가 많이 발생했다.[12] Linux 커널과 Java의 복합적인 문제로 추정된다. 대부분 시간 재설정, 서버 재시작 등으로 이 문제를 해결한 듯하다. Google은 윤초 적용 이전에 점진적으로 시간을 더해가는 'leap smear'라는 기법으로 이런 장애를 예방했다.[13]

API 문서에 따르면 Date 클래스가 UTC를 정확히 반영하는지 여부는 JVM(Java Virtual Machine)의 실행 환경에 따라 다르다고 한다. 대부분의 현대적인 운영체제에서 모든 경우에 하루는 86,400초(24 × 60 × 60초)이고, 컴퓨터 시계의 대부분은 윤초를 반영할 정도로 정교하지는 못하다고 언급하고 있다.[14] 참고로 System.currentTimeMillis() 메서드는 1970년 1월 1일 이후로 지나간 밀리초를 반환하는데, Windows, Android 등의 운영체제에서 테스트한 결과로는 그 기간 중의 윤초가 특별히 더해지진 않는다.[15]

뒤에서 소개할 Joda-Time과 JSR-310을 포함해서, 모든 환경에서 윤초를 명시적으로 지원하는 Java 라이브러리는 아직 보이지 않는다. 어쨌든 윤초 동기화 때는 운영체제, Java, 미들웨어, 애플리케이션의 상호작용이 불안정해질 가능성이 높다는 점은 분명하다.


---
## *Problem*
### JDK의 기본 날짜 클래스의 문제점

앞의 예제로 날짜와 시간 계산이 생각보다 어렵고 고려해야 할 것도 많으며 깊이 이해하기 위해서는 배경 지식도 많이 필요한 영역임을 확인했다. 그런데 이 분야의 어려움은 별도로 치더라도 Calendar 클래스와 Date 클래스는 문제가 많다.

### 1. 불변 객체가 아니다( not immutable)

VO(Value Object)는 값에 의해 동등성이 판단되는 객체이다.[16] VO는 완전한 불변 객체일 때 별칭 문제, 스레드 불안정성 등의 부작용에서 자유롭고 여러 객체에서 공유되어도 안전하다.[17] 날짜, 돈 등의 객체는 VO의 대표적인 예로 자주 제시된다. C#, Python 같은 언어에서는 날짜 클래스가 한번 생성된 이후에는 내부 속성을 바꿀 수 없다.

불행히도 Java의 기본 날짜, 시간 클래스는 불변 객체가 아니다. 앞의 코드에서 Calendar 클래스에 set 메서드를 호출해서 날짜를 지정하고, 다시 같은 객체에 set(int,int) 메서드를 호출해서 수행한 날짜 연산 결과는 같은 인스턴스에 저장되었다. Date 클래스에도 값을 바꿀 수 있는 set 메서드가 존재한다. 이 때문에 Calendar 객체나 Date 객체가 여러 객체에서 공유되면 한 곳에서 바꾼 값이 다른 곳에 영향을 미치는 부작용이 생길 수 있다. 『Effective Java 2nd Edition』(2008)의 저자 Joshua Bloch도 Date 클래스는 불변 객체여야 했다고 지적했다.[18]

이를 안전하게 구현하려면 이들 객체를 복사해서 반환하는 기법을 권장한다. <그림 1>에서 보이는 코드의 startTime 필드는 내부의 Date 객체를 외부에서 조작할 수 있기 때문에 악의적인 클라이언트 코드에 의해서 착취당할 수 있다. endTime 필드처럼 방어복사 기법을 써서 새로운 객체를 생성해서 반환하는 구현이 바람직하다.[19]

![javatime1](https://d2.naver.com/content/images/2015/06/helloworld-645609-1.png)

그림 1 Date의 방어 복사 기법과 FindBugs의 취약점 지적

이런 취약점은 정적분석 도구로 발견해낼 수도 있다. FindBugs의 다음 규칙은 <그림 1>의 startTime 필드와 같이 취약한 코드를 경고해 준다.

- EI_EXPOSE_REP[20]
- EI_EXPOSE_REP2[21]

<그림 1>에서 취약성이 있는 코드의 아래에 추가한 주석은 FindBugs에서 보여 주는 경고문를 그대로 옮긴 문장이다.

### 2. int 상수 필드의 남용

Calendar를 사용한 날짜 연산은 <예제 8>과 같이 int 상수 필드를 사용한다.

예제 8 초 더하기 코드

```java
calendar.add(Calendar.SECOND, 2);  
```

첫 번째 파라미터에 Calendar.JUNE과 같이, 전혀 엉뚱한 상수가 들어가도 이를 컴파일 시점에서 확인할 방법이 없다. 이 뿐만 아니라 Calendar 클래스에는 많은 int 상수가 쓰였는데, 이어서 설명할 월, 요일 지정 등에서도 많은 혼란을 유발한다.

### 3. 헷갈리는 월 지정

앞에서 1582년 10월 4일을 지정하는 코드는 다음과 같았다.

예제 9 10월 지정 코드

```java
calendar.set(1582, Calendar.OCTOBER , 4);  
```

그런데 월에 해당하는 Calendar.OCTOBER 값은 실제로는 '9'이다. JDK 1.0에서 Date 클래스는 1월을 0으로 표현했고, JDK 1.1부터 포함된 Calendar 클래스도 이러한 관례를 답습했다. 그래서 1582년 10월 4일을 표현하는 코드를 다음과 같이 쓰는 실수를 많은 개발자들이 반복하고 있다.

예제 10 실수로 쓰기 쉬운 10월 지정 코드

```java
calendar.set(1582, 10 , 4);  
```

또는 일부러 가독성을 높이기 위해서 10월을 10-1로 표현한 기법을 쓰는 사람도 있다.

예제 11 10월 지정 코드의 한 방식

```java
calendar.set(1582, 10 - 1 , 4);  
```

<예제 12>는 이로 인해서 일어날 수 있는 실수를 보여 주는 코드이다.[22] <예제 12>의 테스트는 통과한다.

예제 12 1999년 12월 31일을 지정하려다 2000년으로 넘어간 코드

```java
@Test
public void shouldGetDate() {  
     Calendar calendar = Calendar.getInstance();
     calendar.set(1999, 12, 31);
     assertThat(calendar.get(Calendar.YEAR)).isEqualTo(2000);
     assertThat(calendar.get(Calendar.MONTH)).isEqualTo(Calendar.JANUARY); 
     assertThat(calendar.get(Calendar.DAY_OF_MONTH)).isEqualTo(31); 
}
```

1999년 12월 31일을 지정하려 했으나, 12월의 상수값은 11이므로 직접 숫자 12를 대입하면 2000년 1월 31일로 넘어간다. 숫자 12 대신 11 혹은 Calendar.DECEMBER 상수로 지정해야 1999년 12월 31일이 된다.

13월을 의미하는 12를 넣어도 Calendar.set() 메서드가 오류를 반환하지 않기 때문에 이런 실수를 인지하기 더욱 어렵다. calendar.setLenient(false) 메서드를 호출하면 잘못된 월이 지정된 객체에서 IllegalArgumentException을 던져 준다. 그렇게 지정해도 Calendar.set() 메서드가 호출되는 시점이 아니라, Calendar.get() 메서드가 호출될 때 Exception이 발생한다는 점도 주의해야한다.

참고로 FindBugs에서는 0 ~ 11을 벗어난 월을 지정할 때 경고를 보여 주기도 한다.

![javatime2](https://d2.naver.com/content/images/2015/06/helloworld-645609-2.png)

그림 2 Calendar에 잘못된 월 지정 코드와 FindBugs의 경고

### 4. 일관성 없는 요일 상수

<예제 13>은 2013년 1월 1일이 수요일임을 확인하는 코드이다.

예제 13 요일 확인하기

```java
@Test
@SuppressWarnings("deprecation")
public void shouldGetDayOfWeek() {  
    Calendar calendar = Calendar.getInstance();
    calendar.set(2014, Calendar.JANUARY, 1);

    int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
    assertThat(dayOfWeek).isEqualTo(Calendar.WEDNESDAY);
    assertThat(dayOfWeek).isEqualTo(4);
    Date theDate = calendar.getTime();
    assertThat(theDate.getDay()).isEqualTo(3);
}
```

Calendar.get(Calendar.DAY_OF_WEEK) 함수에서 반환한 요일은 int 값으로, 일요일이 1로 표현된다. 따라서 수요일은 4이고, 보통 Calendar.WEDNESDAY 상수와 비교해서 확인한다. 그런데 calendar.getTime() 메서드로 Date 객체를 얻어와서 Date.getDay() 메서드로 요일을 구하면 일요일은 0, 수요일은 3이 된다. 두 개의 클래스 사이에 요일 지정값에 일관성이 없는 것이다.

Date.getDay() 메서드는 요일을 구하는 메서드로는 이름이 모호하기도 하다. 현재는 사용하지 않는(deprecated) 메서드라서 그나마 다행이다.

### 5. Date와 Calendar의 불편한 역할 분담

JDK 1.0 시절에는 Date 클래스가 날짜 연산을 지원하는 유일한 클래스였다. JDK 1.1 이후부터 Calendar 클래스가 포함되면서 날짜간의 연산, 국제화 지원 등은 Calendar 클래스에서 주로 담당하고 Date 클래스의 많은 기능이 사용되하지 않게(deprecated)되었다.

특정 시간대의 날짜를 생성한다거나, 년/월/일 같은 날짜 단위의 계산은 Date 클래스만으로는 수행하기 어렵기 때문에 날짜 연산을 위해서 Calendar 객체를 생성하고, 다시 Calendar 객체에서 Date 객체를 생성한다. 최종 결과에는 불필요한 중간 객체를 생성해야 하는 셈인데, 쓰기에도 번거롭고, Calendar 클래스는 생성 비용이 비싼 편이기 때문에 비효율적이기도 하다.[23] 불편함을 덜기 위해 실무에서는 Date의 연산에 [Apache commons Lang](http://commons.apache.org/proper/commons-lang/) 라이브러리에 있는 [DateUtils](http://commons.apache.org/proper/commons-lang/javadocs/api-2.6/org/apache/commons/lang/time/DateUtils.html) 클래스의 plusDays() 메서드나 plusMonth() 메서드 같은 메서드를 주로 활용한다. 그러나 DateUtils 클래스를 쓰더라도 중간 객체로 Calendar를 생성하는 것은 마찬가지다.

날짜와 시간을 모두 저장하는 클래스의 이름이 'Date'라는 점도 다소 아쉽다. Calendar.getTime() 메서드도 Date 타입을 반환하는데 메서드 이름만 봐서는 반환 타입을 예측하기가 힘들다.

### 6. 오류에 둔감한 시간대 ID지정

<예제 14>는 시간대의 ID를 'Asia/Seoul'대신 'Seoul/Asia'로 잘못 지정한 코드다.

예제 14 잘못 지정한 시간대 ID

```java
@Test
public void shouldSetGmtWhenWrongTimeZoneId(){  
    TimeZone zone = TimeZone.getTimeZone("Seoul/Asia");
    assertThat(zone.getID()).isEqualTo("GMT");
}
```

그러나 이 코드는 오류가 발생하지 않고, 'GMT'가 ID인 시간대가 지정된 것처럼 테스트를 통과한다. 이런 특성 때문에 찾기 어려운 버그가 생길 수도 있다.

### 7. java.util.Date 하위 클래스의 문제

java.util.Date 클래스를 상속한 하위 클래스에도 문제가 많다.

java.sql.Date 클래스는 상위 클래스인 java.util.Date 클래스와 이름이 같다. 이 클래스를 두고 Java 플랫폼 설계자는 클래스 이름을 지으면서 깜빡 존 듯하다는 조롱까지 나왔다.[24] 그리고 이 클래스는 Comparable 인터페이스에 대한 정의를 클래스 선언에서 하지 않았기 때문에 Comparable과 관련된 Generics 선언을 복잡하게 만들었다.[25]

java.sql.TimeStamp 클래스는 java.util.Date 클래스에 나노초(nanosecond) 필드를 더한 클래스이다. 이 클래스는 equals() 선언의 대칭성을 어겼다. Date 타입과 TimeStamp 타입을 섞어 쓰면 a.equals(b)가 true라도 b.equals(a)는 false인 경우가 생길 수 있다.[26]


---

## *Solution*
### Java의 개선된 날짜, 시간 API

좋은 API는 오용하기 어려워야 하고, 문서가 없어도 쉽게 사용할 수 있어야 한다.[27] 그러나 Java의 기본 API는 문서를 열심히 보기 전까지는 제대로 사용하기 어렵다.

이런 문제점 때문에 JDK의 날짜, 시간 API를 대체하는 라이브러리가 많이 나와 있다. 대표적으로 다음과 같은 것들이 있다.

- Joda-Time: [http://www.joda.org/joda-time](http://www.joda.org/joda-time)
- Time and Money Code Library: [http://timeandmoney.sourceforge.ne](http://timeandmoney.sourceforge.net/)(DDD의 저자 Eric Evans가 참여한 것으로 유명하다)
- CalendarDate: [http://calendardate.sourceforge.net](http://calendardate.sourceforge.net/)
- date4j: [http://www.date4j.net](http://www.date4j.net/)

### Joda-Time

Joda-Time은 기본 JDK를 대체하는 날짜와 시간 API 중 가장 널리 쓰인다. 앞에서 나왔던 <예제 1>, <예제 3>, <예제 5>, <예제 7>, <예제 12>, <예제 13>, <예제 14> 등을 테스트를 통과하는 상태로 Joda-Time으로 옮기면 다음과 같다.

예제 15 Joda-Time으로 날짜 연산

```java
public class JodaTimeTest {

    @Test  // 예제1, 2: 1일 후 구하기
    public void shouldGetAfterOneDay() {
        Chronology chrono = GregorianChronology.getInstance();
        LocalDate theDay = new LocalDate(1582, 10, 4, chrono);
        String pattern = "yyyy.MM.dd";
        assertThat(theDay.toString(pattern)).isEqualTo("1582.10.04");


        LocalDate nextDay = theDay.plusDays(1);
        assertThat(nextDay.toString(pattern)).isEqualTo("1582.10.05");
    }

    @Test  // 예제1, 2: 1일 후 구하기.
    public void shouldGetAfterOneDayWithGJChronology() {
        Chronology chrono = GJChronology.getInstance();
        LocalDate theDay = new LocalDate(1582, 10, 4, chrono);
        String pattern = "yyyy.MM.dd";
        assertThat(theDay.toString(pattern)).isEqualTo("1582.10.04");

        LocalDate nextDay = theDay.plusDays(1);
        assertThat(nextDay.toString(pattern)).isEqualTo("1582.10.15");
    }

    @Test  // 예제3, 4: 1시간 후 구하기
    public void shouldGetAfterOneHour() {
        DateTimeZone seoul = DateTimeZone.forID("Asia/Seoul");
        DateTime theTime = new DateTime(1988,5,7,23,0, seoul);
        String pattern = "yyyy.MM.dd HH:mm";
        assertThat(theTime.toString(pattern)).isEqualTo("1988.05.07 23:00");
        assertThat(seoul.isStandardOffset(theTime.getMillis())).isTrue();


        DateTime after1Hour = theTime.plusHours(1);
        assertThat(after1Hour.toString(pattern)).isEqualTo("1988.05.08 01:00");
        assertThat(seoul.isStandardOffset(after1Hour.getMillis())).isFalse();
    }


    @Test  // 예제 5, 6: 1분 후 구하기
    public void shouldGetAfterOneMinute() {
        DateTimeZone seoul = DateTimeZone.forID("Asia/Seoul");
        DateTime theTime = new DateTime(1961, 8, 9, 23, 59, seoul);
        String pattern = "yyyy.MM.dd HH:mm";
        assertThat(theTime.toString(pattern)).isEqualTo("1961.08.09 23:59");


        DateTime after1Minute = theTime.plusMinutes(1);
        assertThat(after1Minute.toString(pattern)).isEqualTo("1961.08.10 00:30");
    }


    @Test  // 예제 7: 2초 후 구하기
    public void shouldGetAfterTwoSecond() {
        DateTimeZone utc = DateTimeZone.forID("UTC");
        DateTime theTime = new DateTime(2012, 6, 30, 23, 59, 59, utc);
        String pattern = "yyyy.MM.dd HH:mm:ss";
        assertThat(theTime.toString(pattern)).isEqualTo("2012.06.30 23:59:59");


        DateTime after2Seconds = theTime.plusSeconds(2);
        assertThat(after2Seconds.toString(pattern)).isEqualTo("2012.07.01 00:00:01");
   }


    @Test  // 예제 12: 1999년 12월 31일을 지정하는 코드 
    public void shouldGetDate() {
        LocalDate theDay = new LocalDate(1999, 12, 31);


        assertThat(theDay.getYear()).isEqualTo(1999);
        assertThat(theDay.getMonthOfYear()).isEqualTo(12);                
        assertThat(theDay.getDayOfMonth()).isEqualTo(31);                
    }

    @Test (expected=IllegalFieldValueException.class) // 예제 12 : 1999년 12월 31일을 지정하는 코드의 실수
    public void shouldNotAcceptWrongMonth() {
        new LocalDate(1999, 13, 31);
    }

    @Test // 예제 13: 요일 확인하기
    public void shouldGetDayOfWeek() {
        LocalDate theDay = new LocalDate(2014, 1, 1);


        int dayOfWeek = theDay.getDayOfWeek();
        assertThat(dayOfWeek).isEqualTo(DateTimeConstants.WEDNESDAY);
        assertThat(dayOfWeek).isEqualTo(3);
    }

@Test(expected=IllegalArgumentException.class) // 예제 14: 잘못 지정한 시간대 ID
    public void shouldThrowExceptionWhenWrongTimeZoneId(){
        DateTimeZone.forID("Seoul/Asia");
    }
}
```

<예제 15>에서 볼 수 있는 특징은 아래와 같다.

- LocalDate, DateTime 등으로 지역 시간과 시간대가 지정된 시간을 구분했다. LocalDate와 LocalTime으로 날짜와 시간을 별도의 클래스로 구분할 수도 있다.
- plusDays, plusMinutes, plusSeconds 등 단위별 날짜 연산 메서드를 LocalDate, DateTime 클래스에서 지원한다. 메서드가 호출된 객체의 상태를 바꾸지 않고 새로운 객체를 반환한다. 불변 객체이다.
- 월의 int 값과 명칭이 일치한다. 1월은 int 값 1이다.
- GregorianChronology를 썼을 때는 1582년 10월을 특별하게 취급하지는 않는다. GJChronology를 사용하면 JDK의 GregorianCalendar와 같이 10월 4일 다음 날이 10월 15일로 나온다.
- 서머타임 기간이면 DateTimeZone.isStandardOffset() 메서드의 반환값이 false이다.
- 13월 같이 잘못 된 월이 넘어가면 객체 생성 시점에서 IllegalFieldValueException을 던진다.
- 요일 상수는 일관되게 사용한다.
- 잘못 된 시간대 ID 지정에는 IllegalArguementException을 던진다.

그밖에 Joda-Time에서는 시간 간격에 대한 개념을 섬세하게 정의하고 Duration, Period, Interval 등으로 역할을 분담한 클래스로 구현했다.

그레고리력과 율리우스력뿐만 아니라 불교, 이슬람교, 콥트교회, 에티오피아의 달력까지도 지원한다. 다양한 달력은 org.joda.time.chrono.BaseChronology 클래스의 하위 클래스로 구현되어 있다.

Joda-Time은 Jar 파일에 별도로 시간대 데이터베이스를 포함하고 있다. 그래서 JDK에서 참조하는 시간대 데이터베이스와는 별도로 정보를 갱신할 수도 있다. Jar의 압축을 해제하면 **{root}/src/java/org/joda/time/tz/src** 폴더에 시간대 정보 파일이 있다. 이 폴더를 덮어쓰면 특정 애플리케이션만의 시간대 정보를 정의할 수도 있다.

Joda-Time은 다음과 같이 다른 언어로 래핑되거나 포팅되어 있기도 하다.

- Scala Wrapper: [https://github.com/nscala-time/nscala-time](https://github.com/nscala-time/nscala-time)
- Clujure Wrapper: [https://github.com/clj-time/clj-time](https://github.com/clj-time/clj-time)
- .NET 포팅: [https://code.google.com/p/noda-time](https://code.google.com/p/noda-time/)

Spring 프레임워크에서도 Joda-Time을 기본으로 지원한다. Spring-web-mvc 프레임워크는 사용자가 입력한 문자열을 원하는 객체로 변환할 때 Converter라는 인터페이스를 활용하는데, 클래스 패스에 Joda-Time이 포함되어 있으면 이 라이브러리의 객체를 변화하는 Converter 구현체를 자동으로 등록한다.[28]

Hibernate 프레임워크에서도 Joda-Time을 쓸 수 있다. Joda-time-hibernate 모듈([http://www.joda.org/joda-time-hibernate](http://www.joda.org/joda-time-hibernate)) 을 이용하면 데이터베이스에 저장된 TIMESTAMPE 같은 타입을 Date 클래스와 같은 JDK의 기본 클래스대신 Joda-Time의 클래스로 매핑할 수 있다.

## JSR-310: 새로운 Java의 날짜 API

2014년에 최종 배포되는 JDK 8에는 JSR-310이라는 표준 명세로 날짜와 시간에 대한 새로운 API가 추가되었다.[29] 앞에서 설명한 Joda-Time에 가장 많은 영향을 받았고, 그 밖에 Time and Money 라이브러리나 ICU 등 여러 오픈소스 라이브러리를 참고했다고 한다.

앞의 <예제 15>를 JDK 8의 ZonedDateTime 등을 이용해서 작성하면 다음과 같다.

예제 16 JSR-310을 이용한 날짜 연산

```java
public class Jsr310Test {  
    @Test  // 예제 1, 2: 1일 후 구하기
    public void shouldGetAfterOneDay() {
        LocalDate theDay = IsoChronology.INSTANCE.date(1582, 10, 4);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        assertThat(theDay.format(formatter)).isEqualTo("1582.10.04");


        LocalDate nextDay = theDay.plusDays(1);
        assertThat(nextDay.format(formatter)).isEqualTo("1582.10.05");
    }


    @Test  // 예제 3, 4: 1시간 후 구하기
    public void shouldGetAfterOneHour() {
        ZoneId seoul = ZoneId.of("Asia/Seoul");
        ZonedDateTime theTime = ZonedDateTime.of(1988, 5, 7, 23, 0, 0, 0, seoul);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
        assertThat(theTime.format(formatter)).isEqualTo("1988.05.07 23:00");
        ZoneRules seoulRules = seoul.getRules();
        assertThat(seoulRules.isDaylightSavings(Instant.from(theTime))).isFalse();

        ZonedDateTime after1Hour = theTime.plusHours(1);
        assertThat(after1Hour.format(formatter)).isEqualTo("1988.05.08 01:00");
        assertThat(seoulRules.isDaylightSavings(Instant.from(after1Hour))).isTrue();
    }


    @Test  // 예제5, 6: 1분 후 구하기
    public void shouldGetAfterOneMinute() {
         ZoneId seoul = ZoneId.of("Asia/Seoul");
         ZonedDateTime theTime = ZonedDateTime.of(1961, 8, 9, 23, 59, 59, 0, seoul);
         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
         assertThat(theTime.format(formatter)).isEqualTo("1961.08.09 23:59");


         ZonedDateTime after1Minute = theTime.plusMinutes(1);
         assertThat(after1Minute.format(formatter)).isEqualTo("1961.08.10 00:30");
    }

    @Test // 예제 7: 2초 후 구하기
    public void shouldGetAfterTwoSecond() {
        ZoneId utc = ZoneId.of("UTC");
        ZonedDateTime theTime = ZonedDateTime.of(2012, 6, 30, 23, 59, 59, 0, utc);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
        assertThat(theTime.format(formatter)).isEqualTo("2012.06.30 23:59:59");


        ZonedDateTime after2Seconds = theTime.plusSeconds(2);
        assertThat(after2Seconds.format(formatter)).isEqualTo("2012.07.01 00:00:01");
    }


    @Test // 예제 12: 1999년 12월 31일을 지정하는 코드
    public void shouldGetDate() {
        LocalDate theDay = LocalDate.of(1999, 12, 31);


        assertThat(theDay.getYear()).isEqualTo(1999);
        assertThat(theDay.getMonthValue()).isEqualTo(12);                
        assertThat(theDay.getDayOfMonth()).isEqualTo(31);                
    }

    @Test(expected=DateTimeException.class) // 예제 12: 1999년 12월 31일을 지정하는 코드의 실수
    public void shouldNotAcceptWrongDate() {
        LocalDate.of(1999, 13, 31);
    }


    @Test // 예제 13: 요일 확인하기
    public void shouldGetDayOfWeek() {
        LocalDate theDay = LocalDate.of(2014, 1, 1);


        DayOfWeek dayOfWeek = theDay.getDayOfWeek();
        assertThat(dayOfWeek).isEqualTo(DayOfWeek.WEDNESDAY);
    }
@Test(expected=ZoneRulesException.class) // 예제 14: 잘못 지정한 시간대 ID
    public void shouldThrowExceptionWhenWrongTimeZoneId(){
         ZoneId.of("Seoul/Asia");
    }
}
```

'java.time.*' 패키지로 시작하지만, 거의 Joda-Time과 유사한 모습을 보여 준다. 다음과 같은 특징이 있고 Joda-Time에서 개선된 점도 많다.

- DateTime 클래스대신 ZoneDateTime 클래스가 사용된다. 시간대 정보를 가지고 있는 클래스임을 더욱 명확히 표현하려 한 듯하다.
- 요일 클래스는 Enum 상수로 제공한다. 잘못 지정하거나 혼동할 여지가 없다.
- 생성자 대신 of() 메서드 같은 static factory 메서드를 많이 사용한다. DateTimeFormatter.ofPattern(), Instant.from() 등이 그 예이다. static factory 메서드는 가독성 있는 이름을 따로 붙일 수 있고, 생성자와는 달리 한번 생성된 객체를 재활용할 수도 있다.[30]
- Joda-Time보다 클래스별 역할이 더 세분화되었다. ZoneRules 같은 클래스가 그 예이다.
- 서머타임 기간이면 TimeZoneRules.isDaylightSavings() 메서드의 반환값이 true이다.
- 잘못 지정돤 시간대 ID에는 ZoneRulesException을 던진다.
- 잘못 된 월 지정에는 객체 생성 시점에서 DateTimeException을 던진다.

그 밖에도 여러 장점이 있다. Calendar, Date, Joda-Time의 시간 클래스가 밀리초(millisecond) 단위의 정밀성을 가졌던 반면, JSR-310의 클래스는 나노초까지 다룰 수 있다. 시계의 개념도 도입되어서 현재 시간과 관련된 기능을 테스트할 때도 유용한다. java.time.Clock 클래스의 하위 클래스로 SystemClock, FixedClock 등이 제공된다.

이미 Spring 프레임워크 4.0에서는 JSR-310을 기본으로 지원한다. ZoneDateTime 등의 타입이 Controller의 메서드 파라미터로 선언되면 사용자가 입력한 문자열을 날짜 객체로 변환해 준다. JDK 8과 JSR-310 명세가 논의된 지 오래되어서인지 이 기능은 2012년부터 계획되어 있었다.[31]

JSR-310을 JDK 7에서 쓸 수 있는 백포트 모듈도 존재한다. pom.xml 파일에 다음과 같이 의존성을 추가하면 사용할 수 있다.

예제 17 JSR-310의 백포트 모듈의 의존성 선언

```xml
<dependency>  
    <groupId>org.threeten</groupId> 
    <artifactId>threetenbp</artifactId> 
    <version>0.8.1</version> 
</dependency>  
```

패키지가 'java.time.*' 대신 'org.threeten.bp.*'라는 점을 제외하면 대부분의 클래스가 동일하다. 다만 백포트 모듈의 ZonedDateTime.toString(DateTimeFormatter) 메서드가 java.time 패키지에서는 ZonedDateTime.format(DateTimeFormatter)으로 바뀌는 등 미묘한 차이가 존재하기는 한다.


