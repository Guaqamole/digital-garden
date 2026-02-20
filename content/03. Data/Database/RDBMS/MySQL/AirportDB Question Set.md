---
title: AirportDB Question Set
date: 2025-10-04
draft: false
tags:
  - MySQL
complete: true
banner: /_assets/_img/_banners/nebula.jpg
---
```python
아래는 내가 공부할 함수들 전체 리스트야. airportdb 소스파일들과 index 목록 리스트를 파악해서 별표 (★) 표시가된 함수들마다 최소 3문제 (쉬움1, 미디움2) 이상 문제를 만들어주고 답안지도 작성해줘. 문제를 만들때 너무 쉽게는 작성하지말아줘. 스냅샷, 일별 요약 테이블, 위클리 리포트 전용 마트도 만들라고 요청해도돼. 단, 오로지 내가 명시한 공부 함수위주로만 작성해줘. 여러개의 주제 (예, inner join + in + cte) 를 합쳐서 하나의 문제로 만들어도돼. 하지만 쉬움 문제는 가능한 여러개의 주제를 섞지말아줘. 내가 각 챕터 별로 공부 함수들을 제공할테니 너가 참고해서 문제를 만들어주도록해. 지금당장 문제를 만들지말고 내가 원하는 챕터를 말할때마다 만들어줘. 각 문제의 sample output도 테이블형식으로 보여줘.
```

# MySQL 8.0 함수 및 연산 정리 (DDL/DML 제외, 공부용)

별표(★) = 실무에서 자주 사용되는 핵심 기능  
정렬 기준: 중요도 및 빈도순  

---

## 🔗 0. 조인 및 집합 연산 (Join / Union / Subquery) ★★★★★

| 구문                           | 설명                                                      |
| ---------------------------- | ------------------------------------------------------- |
| INNER JOIN★                  | 두 테이블 간 일치하는 행만 반환                                      |
| LEFT JOIN★                   | 왼쪽 테이블의 모든 행 + 오른쪽 일치행                                  |
| RIGHT JOIN                   | 오른쪽 테이블의 모든 행 + 왼쪽 일치행                                  |
| FULL OUTER JOIN (에뮬레이션)      | LEFT + RIGHT UNION 으로 대체                                |
| CROSS JOIN                   | 모든 조합 생성 (Cartesian Product)                            |
| SELF JOIN★                   | 자기 자신과 조인                                               |
| NATURAL JOIN                 | 공통 컬럼 자동 조인 (비권장, 명시적 사용 권장)                            |
| USING(column)                | 동일 컬럼 기준 조인                                             |
| UNION★                       | 중복 제거 후 두 SELECT 결합                                     |
| UNION ALL★                   | 중복 유지 결합 (더 빠름)                                         |
| INTERSECT (에뮬레이션)            | MySQL은 직접 지원 안 함 → `INNER JOIN` 또는 `IN()`으로 대체          |
| EXCEPT (에뮬레이션)               | MySQL은 직접 지원 안 함 → `LEFT JOIN … WHERE right.id IS NULL` |
| EXISTS(), NOT EXISTS()★      | 서브쿼리 존재 여부 판단                                           |
| IN(), NOT IN()★              | 목록/서브쿼리 포함 여부 판단                                        |
| ANY(), ALL()                 | 서브쿼리의 조건 평가                                             |
| CTE (WITH … AS …)★           | 복잡 쿼리 구조화 및 재사용                                         |
| LATERAL JOIN (MySQL 8.0.14+) | FROM 내 하위쿼리 참조 허용 (`JOIN LATERAL`)                      |
|                              |                                                         |
|                              |                                                         |
|                              |                                                         |


### 🔹 [A] INNER JOIN

#### (Easy)

**문제 A1.**  
각 항공편(`flight`)의 항공사 이름(`airline.airlinename`)과 출발공항명(`airport.name`)을 함께 조회하라.  
결과는 항공편번호(`flightno`), 항공사명, 출발공항명 순으로 정렬하라.

- **힌트1:** `flight.airline_id` ↔ `airline.airline_id`
- **힌트2:** `flight.from` ↔ `airport.airport_id`
    
| flightno | airlinename       | departure_airport |
| -------- | ----------------- | ----------------- |
| LH1234   | Lufthansa         | Frankfurt Intl    |
| OS5678   | Austrian Airlines | Vienna Intl       |
| BA2020   | British Airways   | London Heathrow   |
|          |                   |                   |

MyAnswer
```python
select  
    f.flightno,  
    a.airlinename,  
    ag.name  
from flight f  
inner join airline a  
inner join airport_geo ag  
on f.airline_id = a.airline_id  
and f.from = ag.airport_id  
order by f.flightno, a.airlinename, ag.name  
;
```


---

#### (Medium)

**문제 A2.**  
항공사별로 운항 중인 전체 항공편 수(`COUNT(*)`)를 구하고, 항공편이 1000편 이상인 항공사만 출력하라.  
결과 컬럼: `airlinename`, `total_flights`

- **힌트1:** `INNER JOIN` 후 `GROUP BY airline_id`
    
- **힌트2:** `HAVING COUNT(*) >= 1000

| airlinename       | total_flights |
| ----------------- | ------------- |
| Lufthansa         | 10534         |
| Austrian Airlines | 8932          |
| British Airways   | 4120          |

MyAns
```python
select  
    a.airlinename,  
    count(f.flightno) as total_flights  
from flight f  
inner join airline a  
on f.airline_id = a.airline_id  
group by a.airlinename  
having total_flights >= 1000  
;
```

---

#### (Medium)

**문제 A3.**  
각 항공사별 평균 티켓가격(`AVG(price)`)을 계산하라.  
단, `booking`과 `flight` 테이블을 연결해야 한다.  
항공사명이 `NULL`인 경우는 제외한다.

- **힌트1:** `booking.flight_id → flight.flight_id → airline.airline_id`
    
- **힌트2:** `AVG(price)` + `INNER JOIN` + `WHERE airlinename IS NOT NULL`
    

---

### 🔹 [B] LEFT JOIN

#### (Easy)

**문제 B1.**  
모든 항공사 이름과 해당 항공사의 등록된 비행기 수를 출력하라.  
비행기가 없는 항공사도 포함되어야 한다.

- **힌트1:** `LEFT JOIN airplane ON airline.airline_id = airplane.airline_id`
    
- **힌트2:** `COUNT(airplane_id)` + `GROUP BY airline_id`
    

---

#### (Medium)

**문제 B2.**  
비행 이력이 없는 항공편(`flight_log`에 존재하지 않음)을 찾아라.  
결과 컬럼: `flightno`, `airline_id`

- **힌트1:** `LEFT JOIN flight_log` 후 `WHERE flight_log.flight_id IS NULL`
    
- **힌트2:** outer join null-check = anti join 패턴
    

---

#### (Medium)

**문제 B3.**  
등록된 모든 공항(`airport`)과, 그 공항을 기반으로 하는 항공사(`base_airport`) 이름을 출력하라.  
항공사가 없는 공항도 포함하라.

- **힌트1:** `airport.airport_id = airline.base_airport`
    
- **힌트2:** `LEFT JOIN airline` + `ORDER BY airport.name`
    

---

### 🔹 [C] SELF JOIN

#### (Easy)

**문제 C1.**  
같은 도시(`city`)에 위치한 공항쌍(`airport_geo`)을 구하라.  
자기 자신과의 비교는 제외한다.

- **힌트1:** `SELF JOIN airport_geo a1, a2`
    
- **힌트2:** `WHERE a1.city = a2.city AND a1.airport_id <> a2.airport_id`
    

---

#### (Medium)

**문제 C2.**  
같은 항공사(`airline_id`)에 속한 항공기쌍(`airplane`)의 `capacity` 차이를 계산하라.  
결과 컬럼: `airline_id`, `airplane_id_1`, `airplane_id_2`, `capacity_diff`

- **힌트1:** `SELF JOIN airplane a1, a2`
    
- **힌트2:** `ABS(a1.capacity - a2.capacity)`
    

---

#### (Medium)

**문제 C3.**  
`flightschedule` 테이블에서 같은 출발지(`from`)–도착지(`to`) 조합인데 출발시간(`departure`)이 다른 항공편쌍을 구하라.

- **힌트1:** `SELF JOIN flightschedule f1, f2`
    
- **힌트2:** `f1.flightno <> f2.flightno` AND `f1.departure <> f2.departure`
    

---

### 🔹 [D] UNION / UNION ALL

#### (Easy)

**문제 D1.**  
독일(`country='Germany'`)과 오스트리아(`country='Austria'`)에 있는 공항 이름을 하나의 결과로 합쳐라.  
중복 제거를 원하면 `UNION`, 유지하려면 `UNION ALL`.

- **힌트1:** 두 개의 `SELECT name FROM airport_geo WHERE country = '...'`
    
- **힌트2:** 차이를 비교해보며 실행계획을 확인하라.
    

---

#### (Medium)

**문제 D2.**  
`employee`와 `passenger`의 이메일 주소를 모두 하나의 리스트로 합쳐라.  
중복 이메일은 제거하라.

- **힌트1:** 두 테이블의 이메일 컬럼 이름이 다름 (`emailaddress`)
    
- **힌트2:** `UNION` 사용 + `ORDER BY emailaddress`
    

---

#### (Medium)

**문제 D3.**  
지난 1주일간 운항된 항공편(`flight.departure`)과 예정된 항공편(`flightschedule`)의 `flightno`를 하나로 묶은 “Weekly Flight Report” 마트를 생성하라.

- **힌트1:** `DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
    
- **힌트2:** `CREATE TABLE weekly_flight_report AS (SELECT … UNION ALL SELECT …)`
    

---

### 🔹 [E] EXISTS / IN / CTE

#### (Easy)

**문제 E1.**  
예약(`booking`)이 존재하는 승객(`passenger`)만 조회하라.

- **힌트1:** `EXISTS (SELECT 1 FROM booking WHERE passenger_id = p.passenger_id)`
    
- **힌트2:** `NOT EXISTS`는 반대로 미예약 승객 찾을 때 사용
    

---

#### (Medium)

**문제 E2.**  
가격이 1000 이상인 항공편만을 대상으로, 관련된 승객 이름을 출력하라.  
단, `IN` 서브쿼리를 이용하라.

- **힌트1:** `WHERE flight_id IN (SELECT flight_id FROM booking WHERE price >= 1000)`
    
- **힌트2:** 조인보다 IN 성능을 비교해보라.
    

---

#### (Medium)

**문제 E3.**  
CTE를 활용해 다음을 수행하라.

1. `WITH high_value_flights AS (...)` — 평균 가격 500 이상인 항공편 추출
    
2. 이 항공편을 예약한 승객 이름 리스트 출력
    

- **힌트1:** CTE + `AVG(price)` + `GROUP BY flight_id`
    
- **힌트2:** `JOIN passenger`로 이름 가져오기



---

## 🧮 1. 집계 함수 (Aggregate Functions) ★★★★☆
| 함수 | 설명 |
|------|------|
| COUNT()★ | 행 개수 계산 |
| SUM()★ | 합계 |
| AVG()★ | 평균 |
| MIN(), MAX()★ | 최소/최대값 |
| GROUP_CONCAT()★ | 문자열 결합 |
| STDDEV(), VARIANCE() | 표준편차, 분산 |
| BIT_AND(), BIT_OR() | 비트 연산 집계 |

---

## 🪟 2. 윈도우 함수 (Window Functions) ★★★★★
> `OVER(PARTITION BY ... ORDER BY ...)` 구문 필수

| 함수 | 설명 |
|------|------|
| ROW_NUMBER()★ | 순번 부여 |
| RANK(), DENSE_RANK()★ | 순위 계산 |
| NTILE(n) | 그룹 분할 |
| LAG(), LEAD()★ | 이전/다음 행 값 |
| FIRST_VALUE(), LAST_VALUE()★ | 첫/마지막 값 |
| NTH_VALUE() | N번째 값 |
| CUME_DIST(), PERCENT_RANK() | 누적 분포, 백분위 |
| SUM(), AVG(), COUNT()★ | 윈도우 내 집계 |
| WINDOW 정의: `ROWS BETWEEN ...` | 구간 제어 |

### 🔹 [A] ROW_NUMBER()

**문제 A1 (Easy)**  
항공사별로 운항편(`flight`)을 출발시간 순으로 정렬하고, 각 항공편에 순번을 부여하라.

`SELECT     f.airline_id,     f.flightno,     f.departure,     ROW_NUMBER() OVER (         PARTITION BY f.airline_id         ORDER BY f.departure     ) AS seq_no FROM flight f;`

**샘플 출력**

| airline_id | flightno | departure        | seq_no |
| ---------- | -------- | ---------------- | ------ |
| 1          | LH100    | 2025-09-01 08:00 | 1      |
| 1          | LH200    | 2025-09-01 11:30 | 2      |
| 2          | OS301    | 2025-09-01 07:45 | 1      |

```python
select  
    a.airline_id,  
    f.flightno,  
    f.departure,  
    ROW_NUMBER() over (partition by a.airline_id order by f.departure) as seq_no 
from flight f  
inner join airline a  
on f.airline_id = a.airline_id  
;
```


---

**문제 A2 (Medium)**  
각 항공편 내에서 좌석 예약(`booking`) 순서를 가격 순으로 매겨라.

`SELECT     flight_id,     passenger_id,     price,     ROW_NUMBER() OVER (         PARTITION BY flight_id         ORDER BY price DESC     ) AS price_rank FROM booking;`

**샘플 출력**

|flight_id|passenger_id|price|price_rank|
|---|---|---|---|
|1201|501|800.00|1|
|1201|345|760.00|2|
|1201|210|690.00|3|

```python
select  
    f.flight_id,  
    b.passenger_id,  
    b.price,  
    ROW_NUMBER() over (partition by b.flight_id order by b.price desc) as price_rank  
from flight f  
inner join booking b  
on f.flight_id = b.flight_id  
;
```


---

**문제 A3 (Medium)**  
공항별(`airport_geo.city`) 최근 등록된 항공사(`airline.airline_id`) TOP 1만 추출하라.

`WITH city_airline AS (   SELECT       ag.city,       a.airlinename,       ROW_NUMBER() OVER (           PARTITION BY ag.city           ORDER BY a.airline_id DESC       ) AS rn   FROM airline a   JOIN airport_geo ag ON a.base_airport = ag.airport_id ) SELECT city, airlinename FROM city_airline WHERE rn = 1;`

**샘플 출력**

|city|airlinename|
|---|---|
|Frankfurt|Lufthansa|
|Vienna|Austrian Airlines|

---

### 🔹 [B] RANK() / DENSE_RANK()

**문제 B1 (Easy)**  
항공사별 평균 티켓가격 순위를 매겨라. (동점 허용)

`SELECT     a.airlinename,     AVG(b.price) AS avg_price,     RANK() OVER (ORDER BY AVG(b.price) DESC) AS price_rank FROM booking b JOIN flight f ON b.flight_id = f.flight_id JOIN airline a ON f.airline_id = a.airline_id GROUP BY a.airlinename;`

**샘플 출력**

|airlinename|avg_price|price_rank|
|---|---|---|
|Lufthansa|254.30|1|
|British Airways|254.30|1|
|Austrian Airlines|242.00|3|

---

**문제 B2 (Medium)**  
공항별(`from`) 평균 출발 지연 시간(`departure`) 순위를 `DENSE_RANK()`로 계산하라.

``SELECT     f.`from` AS from_airport,     AVG(TIMESTAMPDIFF(MINUTE, fs.departure, f.departure)) AS avg_delay_min,     DENSE_RANK() OVER (ORDER BY AVG(TIMESTAMPDIFF(MINUTE, fs.departure, f.departure)) DESC) AS delay_rank FROM flight f JOIN flightschedule fs ON f.flightno = fs.flightno GROUP BY f.`from`;``

**샘플 출력**

|from_airport|avg_delay_min|delay_rank|
|---|---|---|
|105|45.3|1|
|202|30.0|2|
|307|30.0|2|

---

**문제 B3 (Medium)**  
직원(`employee`) 급여 기준 상위 3위까지 순위를 부여하라.

`SELECT     firstname,     lastname,     salary,     RANK() OVER (ORDER BY salary DESC) AS sal_rank FROM employee WHERE department = 'Management' LIMIT 10;`

**샘플 출력**

|firstname|lastname|salary|sal_rank|
|---|---|---|---|
|Hans|Bauer|9800.00|1|
|Lukas|Huber|9500.00|2|
|Anna|Meier|9000.00|3|

---

### 🔹 [C] LAG() / LEAD()

**문제 C1 (Easy)**  
항공편별로 바로 이전 출발시간을 구하라.

`SELECT     airline_id,     flightno,     departure,     LAG(departure) OVER (         PARTITION BY airline_id         ORDER BY departure     ) AS prev_departure FROM flight;`

**샘플 출력**

|airline_id|flightno|departure|prev_departure|
|---|---|---|---|
|1|LH100|2025-09-01 08:00|NULL|
|1|LH200|2025-09-01 11:00|2025-09-01 08:00|

---

**문제 C2 (Medium)**  
각 항공편의 다음 출발 공항(`to`)을 구하라.

``SELECT     airline_id,     flightno,     `to`,     LEAD(`to`) OVER (PARTITION BY airline_id ORDER BY departure) AS next_destination FROM flight;``

**샘플 출력**

|airline_id|flightno|to|next_destination|
|---|---|---|---|
|1|LH100|101|202|
|1|LH200|202|303|

---

**문제 C3 (Medium)**  
직원 급여 상승 추이를 확인하라. 이전 급여 대비 차이(`delta_salary`)를 계산하라.

`SELECT     department,     firstname,     salary,     salary - LAG(salary) OVER (PARTITION BY department ORDER BY salary) AS delta_salary FROM employee;`

**샘플 출력**

|department|firstname|salary|delta_salary|
|---|---|---|---|
|Management|Hans|9800|NULL|
|Management|Lukas|9500|-300|
|Management|Anna|9000|-500|

---

### 🔹 [D] FIRST_VALUE() / LAST_VALUE()

**문제 D1 (Easy)**  
각 항공사에서 가장 먼저 출발하는 항공편 번호를 구하라.

`SELECT     airline_id,     flightno,     FIRST_VALUE(flightno) OVER (         PARTITION BY airline_id ORDER BY departure     ) AS first_flight FROM flight;`

**샘플 출력**

|airline_id|flightno|first_flight|
|---|---|---|
|1|LH100|LH100|
|1|LH200|LH100|

---

**문제 D2 (Medium)**  
공항별로 마지막으로 측정된 온도(`weatherdata.temp`)를 구하라.

`SELECT     station,     log_date,     time,     LAST_VALUE(temp) OVER (         PARTITION BY station         ORDER BY log_date, time         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING     ) AS latest_temp FROM weatherdata;`

**샘플 출력**

|station|log_date|time|latest_temp|
|---|---|---|---|
|101|2025-10-03|23:00|12.4|
|102|2025-10-03|23:00|14.2|

---

**문제 D3 (Medium)**  
항공사별 평균 운항거리(`flight_id` 기준 가정)를 계산하고 첫 번째와 마지막 평균값 비교하라.

`WITH avg_flight AS (   SELECT airline_id, AVG(flight_id) AS avg_metric   FROM flight GROUP BY airline_id ) SELECT   airline_id,   FIRST_VALUE(avg_metric) OVER (ORDER BY avg_metric) AS min_metric,   LAST_VALUE(avg_metric) OVER (ORDER BY avg_metric ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS max_metric FROM avg_flight;`

**샘플 출력**

|airline_id|min_metric|max_metric|
|---|---|---|
|1|105.4|9783.2|

---

### 🔹 [E] SUM(), AVG(), COUNT() over window

**문제 E1 (Easy)**  
항공편별 누적 예약금액(`SUM(price)`)을 계산하라.

`SELECT     flight_id,     passenger_id,     price,     SUM(price) OVER (         PARTITION BY flight_id         ORDER BY booking_id     ) AS cumulative_sales FROM booking;`

**샘플 출력**

|flight_id|passenger_id|price|cumulative_sales|
|---|---|---|---|
|1201|500|200.00|200.00|
|1201|501|400.00|600.00|

---

**문제 E2 (Medium)**  
날짜별 평균 기온의 누적 평균(`AVG() OVER`)을 구하라.

`SELECT     log_date,     AVG(temp) AS daily_avg,     AVG(AVG(temp)) OVER (ORDER BY log_date) AS running_avg FROM weatherdata GROUP BY log_date;`

**샘플 출력**

|log_date|daily_avg|running_avg|
|---|---|---|
|2025-09-28|13.4|13.4|
|2025-09-29|12.8|13.1|
|2025-09-30|14.1|13.4|

---

**문제 E3 (Medium)**  
항공사별 항공편 누적 운항편 수(`COUNT()` over)와 누적 비율(`ratio`)을 구하라.

`WITH flight_counts AS (   SELECT airline_id, COUNT(*) AS total_flights   FROM flight GROUP BY airline_id ) SELECT     airline_id,     total_flights,     SUM(total_flights) OVER (ORDER BY total_flights DESC) AS cumulative_count,     ROUND(SUM(total_flights) OVER (ORDER BY total_flights DESC) /           SUM(total_flights) OVER (), 4) AS ratio FROM flight_counts;`

**샘플 출력**

|airline_id|total_flights|cumulative_count|ratio|
|---|---|---|---|
|1|12000|12000|0.3312|
|2|8000|20000|0.5520|
|3|6000|26000|0.7185|




---

## 🔤 3. 문자열 함수 (String Functions) ★★★★☆
| 함수 | 설명 |
|------|------|
| CONCAT(), CONCAT_WS()★ | 문자열 결합 |
| SUBSTRING(), LEFT(), RIGHT()★ | 부분 문자열 |
| LENGTH(), CHAR_LENGTH()★ | 문자열 길이 |
| TRIM(), LTRIM(), RTRIM()★ | 공백 제거 |
| UPPER(), LOWER()★ | 대소문자 변환 |
| REPLACE(), REVERSE(), LOCATE()★ | 검색/치환 |
| LPAD(), RPAD() | 문자열 채우기 |
| FORMAT() | 숫자 포맷 변환 |
| REGEXP_LIKE(), REGEXP_REPLACE() | 정규식 처리 |



---

## 🕓 4. 날짜·시간 함수 (Date & Time Functions) ★★★★★
| 함수 | 설명 |
|------|------|
| NOW(), CURDATE(), CURTIME()★ | 현재 시각 |
| DATE_ADD(), DATE_SUB()★ | 날짜 계산 |
| TIMESTAMPDIFF(), DATEDIFF()★ | 날짜 차이 |
| EXTRACT(), YEAR(), MONTH(), DAY()★ | 날짜 구성요소 추출 |
| DATE_FORMAT(), TIME_FORMAT()★ | 포맷 지정 |
| STR_TO_DATE() | 문자열→날짜 변환 |
| UTC_TIMESTAMP(), CONVERT_TZ() | 시간대 변환 |

---

## 🔢 5. 수학 함수 (Numeric Functions) ★★★☆☆
| 함수 | 설명 |
|------|------|
| ROUND(), CEIL(), FLOOR()★ | 반올림/올림/내림 |
| ABS(), SIGN()★ | 절댓값, 부호 |
| MOD(), DIV()★ | 나머지, 정수나눗셈 |
| POW(), SQRT(), EXP(), LOG() | 제곱, 로그 |
| RAND() | 난수 |
| TRUNCATE()★ | 소수점 절단 |

---

## ⚙️ 6. 조건 및 흐름 제어 함수 (Control Flow) ★★★★☆
| 함수 | 설명 |
|------|------|
| IF(expr, t, f)★ | 조건 분기 |
| IFNULL(expr, alt)★ | NULL 대체 |
| NULLIF(a, b) | 값 비교 시 NULL 반환 |
| CASE WHEN THEN ELSE END★ | 복수 조건 분기 |
| COALESCE()★ | 첫 NULL 아닌 값 반환 |

---

## 🧩 7. JSON 함수 (JSON Functions) ★★★☆☆
| 함수 | 설명 |
|------|------|
| JSON_EXTRACT(), JSON_UNQUOTE()★ | JSON 값 추출 |
| JSON_OBJECT(), JSON_ARRAY() | JSON 생성 |
| JSON_SET(), JSON_REPLACE() | 수정 |
| JSON_CONTAINS(), JSON_KEYS() | 존재/키 조회 |
| JSON_TABLE()★ | JSON → 테이블 변환 |

---

## 🖥 8. 시스템 정보 함수 (System Information) ★★☆☆☆
| 함수 | 설명 |
|------|------|
| VERSION(), DATABASE(), USER() | 시스템 정보 |
| LAST_INSERT_ID()★ | 마지막 AUTO_INCREMENT 값 |
| CONNECTION_ID(), BENCHMARK() | 세션 진단 |

---

## 🔐 9. 암호화/보안 함수 (Encryption) ★★☆☆☆
| 함수 | 설명 |
|------|------|
| MD5(), SHA1(), SHA2()★ | 해시 |
| AES_ENCRYPT(), AES_DECRYPT() | 암복호화 |
| PASSWORD() (Deprecated) | 사용 비권장 |

---

## 🌍 10. 공간 함수 (Spatial / GIS Functions) ★★★☆☆
| 함수 | 설명 |
|------|------|
| ST_Distance(), ST_Within(), ST_Intersects() | 공간 거리 및 포함 관계 |
| ST_Point(), ST_GeomFromText()★ | 좌표 생성 |
| ST_Area(), ST_Length() | 면적, 길이 |
| ST_AsText(), ST_AsGeoJSON() | 포맷 변환 |

---

## 🧰 11. 기타 함수 (Miscellaneous) ★★☆☆☆
| 함수 | 설명 |
|------|------|
| UUID(), UUID_TO_BIN(), BIN_TO_UUID()★ | UUID 생성 |
| SLEEP(), FORMAT_BYTES(), WEIGHT_STRING() | 시스템 제어/포맷 |

---

> ✅ **추천 학습 순서**
> 1️⃣ Join & Union  
> 2️⃣ 집계/조건 함수  
> 3️⃣ 윈도우 함수  
> 4️⃣ 문자열/날짜  
> 5️⃣ JSON 및 공간 함수  

> 실무 SQL 튜닝 핵심 = **JOIN + WINDOW + AGGREGATE + CASE**
