### LocalDate와 LocalTime

---

#### LocalDate 클래스와 LocalTime 클래스

LocalDate 클래스는 날짜를 표현하는 데 사용되며, LocalTime 클래스는 시간을 표현하는 데 사용됩니다.

java.time 패키지에 포함된 대부분의 클래스들은 이 두 클래스를 확장한 것이 많으므로, 우선 이 두 클래스를 잘 이해하는 것이 중요합니다.

---

#### 날짜와 시간 객체의 생성

LocalDate와 LocalTime 클래스는 객체를 생성하기 위해서 now()와 of() 메소드라는 클래스 메소드를 제공합니다.

now() 메소드는 현재의 날짜와 시간을 이용하여 새로운 객체를 생성하여 반환합니다.

하지만 of() 메소드는 전달된 인수를 가지고 특정 날짜와 시간을 표현하는 새로운 객체를 생성하여 반환합니다.

##### 예제
```
LocalDate today = LocalDate.now();

LocalTime present = LocalTime.now();

System.out.println(today + " " + present);

// static LocalDate of(int year, int month, int dayOfMonth)

LocalDate birthDay = LocalDate.of(1982, 02, 19);

// static LocalTime of(int hour, int minute, int second, int nanoOfSecond)

LocalTime birthTime = LocalTime.of(02, 02, 00, 100000000);

System.out.println(birthDay + " " + birthTime);
```


##### 실행 결과
```
2017-02-16 09:21:50.634

1982-02-19 02:02:00.100

of() 메소드는 위의 예제에서 사용된 메소드 시그니처 이외에도 다양한 형태가 오버로딩되어 제공됩니다.
```
---

#### 날짜와 시간 객체에 접근하기

LocalDate와 LocalTime 클래스는 특정 필드의 값을 가져오기 위해서 다음과 같이 다양한 getter 메소드를 제공합니다.

LocalDate 클래스에서 제공하는 대표적인 getter 메소드는 다음과 같습니다.

|메소드|설명|
|---|---|
|int get(TemporalField field)<br><br>long getLong(TemporalField field)|해당 날짜 객체의 명시된 필드의 값을 int형이나 long형으로 반환함.|
|int getYear()|해당 날짜 객체의 연도(YEAR) 필드의 값을 반환함.|
|Month getMonth()|해당 날짜 객체의 월(MONTH_OF_YEAR) 필드의 값을 Month 열거체를 이용하여 반환함.|
|int getMonthValue()|해당 날짜 객체의 월(MONTH_OF_YEAR) 필드의 값을 반환함. (1~12)|
|int getDayOfMonth()|해당 날짜 객체의 일(DAY_OF_MONTH) 필드의 값을 반환함. (1~31)|
|int getDayOfYear()|해당 날짜 객체의 일(DAY_OF_YEAR) 필드의 값을 반환함. (1~365, 윤년이면 366)|
|DayOfWeek getDayOfWeek()|해당 날짜 객체의 요일(DAY_OF_WEEK) 필드의 값을 DayOfWeek 열거체를 이용하여 반환함.|

기존의 Calendar 클래스에서는 1월을 0으로 표현하여 월의 범위가 0~11이었으며, 요일은 일요일부터 1로 표현했습니다.

하지만 java.time 패키지에서는 1월을 1로 표현하여 월의 범위가 1~12가 되었으며, 요일은 월요일부터 1로 표현하도록 변경되었습니다.

Calendar 클래스와 java.time 패키지의 클래스를 같이 사용할 때에는 특히 위와 같은 차이점에 주의해야 합니다.

##### 예제
```
LocalDate today = LocalDate.now();

System.out.println("올해는 " + today.getYear() + "년입니다.");

System.out.println("이번달은 " + today.getMonthValue() + "월입니다.");

System.out.println("오늘은 " + today.getDayOfWeek() + "입니다.");

System.out.println("오늘은 1년 중 " + today.get(ChronoField.DAY_OF_YEAR) + "일째 날입니다.");
```


##### 실행 결과

올해는 2017년입니다.

이번달은 2월입니다.

오늘은 THURSDAY입니다.

오늘은 1년 중 47일째 날입니다.

LocalTime 클래스에서 제공하는 대표적인 getter 메소드는 다음과 같습니다.

|메소드|설명|
|---|---|
|int get(TemporalField field)<br><br>long getLong(TemporalField field)|해당 시간 객체의 명시된 필드의 값을 int형이나 long형으로 반환함.|
|int getHour()|해당 시간 객체의 시(HOUR_OF_DAY) 필드의 값을 반환함.|
|int getMinute()|해당 시간 객체의 분(MINUTE_OF_HOUR) 필드의 값을 반환함.|
|int getSecond()|해당 시간 객체의 초(SECOND_OF_MINUTE) 필드의 값을 반환함.|
|int getNano()|해당 시간 객체의 나노초(NANO_OF_SECOND) 필드의 값을 반환함.|

##### 예제
```
LocalTime present = LocalTime.now();

System.out.println("현재 시각은 " + present.getHour() + "시 " + present.getMinute() + "분입니다.");
```


##### 실행 결과

현재 시간은 9시 22분입니다.

---

#### TemporalField 인터페이스

TemporalField 인터페이스는 월(month-of-year)과 시(hour-of-day)와 같이 날짜와 시간과 관련된 필드를 정의해 놓은 인터페이스입니다.

이 인터페이스를 구현하여 날짜와 시간을 나타낼 때 사용하는 열거체가 바로 ChronoField입니다.

java.time 패키지를 구성하는 클래스의 메소드에서는 이 열거체를 이용하여 날짜와 시간을 처리하고 있습니다.

ChronoField 열거체에 정의된 대표적인 열거체 상수는 다음과 같습니다.

|열거체 상수|설명|
|---|---|
|ERA|시대|
|YEAR|연도|
|MONTH_OF_YEAR|월|
|DAY_OF_MONTH|일|
|DAY_OF_WEEK|요일 (월요일:1, 화요일:2, ..., 일요일:7)|
|AMPM_OF_DAY|오전/오후|
|HOUR_OF_DAY|시(0~23)|
|CLOCK_HOUR_OF_DAY|시(1~24)|
|HOUR_OF_AMPM|시(0~11)|
|CLOCK_HOUR_OF_AMPM|시(1~12)|
|MINUTE_OF_HOUR|분|
|SECOND_OF_MINUTE|초|
|DAY_OF_YEAR|해당 연도의 몇 번째 날 (1~365, 윤년이면 366)|
|EPOCH_DAY|EPOCH(1970년 1월 1일)을 기준으로 몇 번째 날|

##### 예제

LocalTime present = LocalTime.now();

String ampm;

if(present.get(ChronoField.AMPM_OF_DAY) == 0) {

    ampm = "오전";

} else {

    ampm = "오후";

}

System.out.println("지금은 " + ampm + " " + present.get(ChronoField.HOUR_OF_AMPM) + "시입니다.");



##### 실행 결과

지금은 오전 9시입니다.

---

#### 날짜와 시간 객체의 필드값 변경

LocalDate와 LocalTime 클래스는 날짜와 시간 객체에 접근하여 특정 필드의 값을 변경하기 위해서 with() 메소드를 사용합니다.

with() 메소드를 사용하면 값이 변경될 필드를 사용자가 직접 명시할 수 있습니다.

또한, 특정 필드의 값을 변경하기 위해 미리 정의되어 제공되는 다양한 with() 메소드를 사용할 수도 있습니다.

LocalDate 클래스에서 제공하는 with() 메소드는 다음과 같습니다.

|메소드|설명|
|---|---|
|LocalDate with(TemporalField field, long newValue)|해당 날짜 객체에서 특정 필드를 전달된 새로운 값으로 설정한 새로운 날짜 객체를 반환함.|
|LocalDate withYear(int year)|해당 날짜 객체에서 연도(YEAR) 필드를 전달된 새로운 값으로 설정한 새로운 날짜 객체를 반환함.|
|LocalDate withMonth(int month)|해당 날짜 객체에서 월(MONTH_OF_YEAR) 필드를 전달된 새로운 값으로 설정한 새로운 날짜 객체를 반환함.|
|LocalDate withDayOfMonth(int dayOfMonth)|해당 날짜 객체에서 일(DAY_OF_MONTH) 필드를 전달된 새로운 값으로 설정한 새로운 날짜 객체를 반환함.|
|LocalDate withDayOfYear(int dayOfYear)|해당 날짜 객체에서 DAY_OF_YEAR 필드를 전달된 새로운 값으로 설정한 새로운 날짜 객체를 반환함.|

##### 예제

LocalDate today = LocalDate.now();

System.out.println("올해는 " + today.getYear() + "년입니다.");

LocalDate otherDay = today.withYear(1982);

System.out.println("올해는 " + otherDay.getYear() + "년입니다.");



##### 실행 결과

올해는 2017년입니다.

올해는 1982년입니다.

LocalTime 클래스에서 제공하는 with() 메소드는 다음과 같습니다.

|메소드|설명|
|---|---|
|LocalTime with(TemporalField field, long newValue)|해당 시간 객체에서 특정 필드를 전달된 새로운 값으로 설정한 새로운 시간 객체를 반환함.|
|LocalTime withHour(int hour)|해당 시간 객체에서 시(HOUR_OF_DAY) 필드를 전달된 새로운 값으로 설정한 새로운 시간 객체를 반환함.|
|LocalTime withMinute(int minute)|해당 시간 객체에서 분(MINUTE_OF_HOUR) 필드를 전달된 새로운 값으로 설정한 새로운 시간 객체를 반환함.|
|LocalTime withSecond(int second)|해당 시간 객체에서 초(SECOND_OF_MINUTE) 필드를 전달된 새로운 값으로 설정한 새로운 시간 객체를 반환함.|
|LocalTime withNano(int nanoOfSecond)|해당 시간 객체에서 나노초(NANO_OF_SECOND) 필드를 전달된 새로운 값으로 설정한 새로운 시간 객체를 반환함.|

##### 예제

LocalTime present = LocalTime.now();

System.out.println("현재 시각은 " + present.getHour() + "시입니다.");

LocalTime otherTime = present.withHour(8);

System.out.println("현재 시각은 " + otherTime.getHour() + "시입니다.");



##### 실행 결과

현재 시간은 9시입니다.

현재 시간은 8시입니다.

with() 메소드 이외에도 특정 필드의 값을 더하거나 뺄 수 있는 다양한 plus()와 minus() 메소드도 제공됩니다.

##### 예제

LocalTime present = LocalTime.now();

System.out.println("현재 시각은 " + present.get(ChronoField.HOUR_OF_DAY) + "시입니다.");

LocalTime otherTime = present.plus(2, ChronoUnit.HOURS);

System.out.println("바뀐 시간은 " + otherTime.getHour() + "시입니다.");

LocalTime anotherTime = present.minus(6, ChronoUnit.HOURS);

System.out.println("바뀐 시간은 " + anotherTime.getHour() + "시입니다.");



##### 실행 결과

현재 시간은 9시입니다.

바뀐 시간은 11시입니다.

바뀐 시간은 3시입니다.

---

#### 날짜와 시간 객체의 비교

LocalDate와 LocalTime 클래스에도 객체를 비교할 수 있는 compareTo() 메소드가 오버라이딩되어 있습니다.

하지만 더욱 편리하게 날짜와 시간 객체를 서로 비교할 수 있도록 다음과 같은 메소드를 제공합니다.

1. isEqual() 메소드 : equals() 메소드와는 달리 오직 날짜만을 비교함. (LocalDate 클래스에서만 제공)

2. isBefore() 메소드 : 두 개의 날짜와 시간 객체를 비교하여 현재 객체가 명시된 객체보다 앞선 시간인지를 비교함.

3. isAfter() 메소드 : 두 개의 날짜와 시간 객체를 비교하여 현재 객체가 명시된 객체보다 늦은 시간인지를 비교함.

##### 예제

LocalDate today = LocalDate.now();

LocalDate otherDay = LocalDate.of(1982, 02, 19);

System.out.println(today.compareTo(otherDay));

System.out.println(today.isBefore(otherDay));

System.out.println(today.isEqual(otherDay));