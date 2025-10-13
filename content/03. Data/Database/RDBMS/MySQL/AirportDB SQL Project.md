---
title: AirportDB SQL Project
date: 2025-10-04
draft: false
tags:
  - MySQL
  - QueryOptimization
complete: true
banner: /_assets/_img/_banners/nebula.jpg
link: https://dev.mysql.com/doc/airportdb/en/airportdb-introduction.html
---
```python
나는 은행권 시니어 데이터 엔지니어 면접을 준비하는 주니어 개발자야. 이번 면접에선 SQL을 효과적으로 작성하는 Task를 시험볼거같아. 효율적인 서브쿼리, SQL Tuning, 복잡한 Join 문 작성등 시니어 데이터 엔지니어가 작성할만한 쿼리들을 연습해보기 위해 샘플 프로젝트로 문제를 만들어 여러 쿼리들을 연습하게 너가 내 선생님이되어줘. DBMS는 MySQL 8.0을 사용중이고, 연습해볼 DB는 'airport' DB라고 공식문서에 나와있는 대용량 샘플 데이터야. 각 채팅마다 내가 주제를 줄테니 내가 기본으로 제공한 소스파일들을 파악해서 문제와 답을 효과적으로 작성해줘. Airport DB는 이미 내 MySQL에 load 한 상태야.

- 문제를 구성할땐 핵심 주제를 중심으로 (Window Functions, Hash Joins, CTEs, Subquery) 작성
- 답안 제공시 바로 답변을 주지 말고 총 2가지의 힌트를 주고, 문제를 풀지못하면 그때 답변 쿼리를 제공
- 금융권 스타일로 쿼리 작성 (효과적인 쿼리 성능이 1순위)
```


```python

```

## Overview

![](https://i.imgur.com/nO5sRrH.png)


### 전체 스키마 mysqldump로 확인
```sh
mysqldump -u airportdb_user -p --no-data --no-tablespaces airportdb > airportdb_schema.sql
```

airportdb_schema.sql

```SQL
--
-- Table structure for table `airline`
-- 

DROP TABLE IF EXISTS `airline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airline` (
  `airline_id` smallint NOT NULL AUTO_INCREMENT,
  `iata` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `airlinename` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `base_airport` smallint NOT NULL,
  PRIMARY KEY (`airline_id`),
  UNIQUE KEY `iata_unq` (`iata`),
  KEY `base_airport_idx` (`base_airport`),
  CONSTRAINT `airline_ibfk_1` FOREIGN KEY (`base_airport`) REFERENCES `airport` (`airport_id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `airplane`
--

DROP TABLE IF EXISTS `airplane`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplane` (
  `airplane_id` int NOT NULL AUTO_INCREMENT,
  `capacity` mediumint unsigned NOT NULL,
  `type_id` int NOT NULL,
  `airline_id` int NOT NULL,
  PRIMARY KEY (`airplane_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `airplane_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `airplane_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5584 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `airplane_type`
--

DROP TABLE IF EXISTS `airplane_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplane_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`type_id`),
  FULLTEXT KEY `description_full` (`identifier`,`description`)
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `airport`
--

DROP TABLE IF EXISTS `airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport` (
  `airport_id` smallint NOT NULL AUTO_INCREMENT,
  `iata` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icao` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`airport_id`),
  UNIQUE KEY `icao_unq` (`icao`),
  KEY `name_idx` (`name`),
  KEY `iata_idx` (`iata`)
) ENGINE=InnoDB AUTO_INCREMENT=13598 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `airport_geo`
--

DROP TABLE IF EXISTS `airport_geo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport_geo` (
  `airport_id` smallint NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(11,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `geolocation` point NOT NULL,
  PRIMARY KEY (`airport_id`),
  SPATIAL KEY `geolocation_spt` (`geolocation`),
  CONSTRAINT `airport_geo_ibfk_1` FOREIGN KEY (`airport_id`) REFERENCES `airport` (`airport_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `airport_reachable`
--

DROP TABLE IF EXISTS `airport_reachable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport_reachable` (
  `airport_id` smallint NOT NULL,
  `hops` int DEFAULT NULL,
  PRIMARY KEY (`airport_id`),
  CONSTRAINT `airport_reachable_ibfk_1` FOREIGN KEY (`airport_id`) REFERENCES `airport` (`airport_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `flight_id` int NOT NULL,
  `seat` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passenger_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`booking_id`),
  UNIQUE KEY `seatplan_unq` (`flight_id`,`seat`),
  KEY `flight_idx` (`flight_id`),
  KEY `passenger_idx` (`passenger_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flight` (`flight_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`passenger_id`) REFERENCES `passenger` (`passenger_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55099799 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` date NOT NULL,
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` smallint NOT NULL,
  `country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailaddress` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephoneno` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  `department` enum('Marketing','Buchhaltung','Management','Logistik','Flugfeld') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `user_unq` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight` (
  `flight_id` int NOT NULL AUTO_INCREMENT,
  `flightno` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `from` smallint NOT NULL,
  `to` smallint NOT NULL,
  `departure` datetime NOT NULL,
  `arrival` datetime NOT NULL,
  `airline_id` smallint NOT NULL,
  `airplane_id` int NOT NULL,
  PRIMARY KEY (`flight_id`),
  KEY `from_idx` (`from`),
  KEY `to_idx` (`to`),
  KEY `departure_idx` (`departure`),
  KEY `arrivals_idx` (`arrival`),
  KEY `airline_idx` (`airline_id`),
  KEY `airplane_idx` (`airplane_id`),
  KEY `flightno` (`flightno`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`from`) REFERENCES `airport` (`airport_id`),
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`to`) REFERENCES `airport` (`airport_id`),
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`airline_id`) REFERENCES `airline` (`airline_id`),
  CONSTRAINT `flight_ibfk_4` FOREIGN KEY (`airplane_id`) REFERENCES `airplane` (`airplane_id`),
  CONSTRAINT `flight_ibfk_5` FOREIGN KEY (`flightno`) REFERENCES `flightschedule` (`flightno`)
) ENGINE=InnoDB AUTO_INCREMENT=758658 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flight_log`
--

DROP TABLE IF EXISTS `flight_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight_log` (
  `flight_log_id` int unsigned NOT NULL AUTO_INCREMENT,
  `log_date` datetime NOT NULL,
  `user` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `flight_id` int NOT NULL,
  `flightno_old` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `flightno_new` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_old` smallint NOT NULL,
  `to_old` smallint NOT NULL,
  `from_new` smallint NOT NULL,
  `to_new` smallint NOT NULL,
  `departure_old` datetime NOT NULL,
  `arrival_old` datetime NOT NULL,
  `departure_new` datetime NOT NULL,
  `arrival_new` datetime NOT NULL,
  `airplane_id_old` int NOT NULL,
  `airplane_id_new` int NOT NULL,
  `airline_id_old` smallint NOT NULL,
  `airline_id_new` smallint NOT NULL,
  `comment` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`flight_log_id`),
  KEY `flight_log_ibfk_1` (`flight_id`),
  CONSTRAINT `flight_log_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flight` (`flight_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flightschedule`
--

DROP TABLE IF EXISTS `flightschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flightschedule` (
  `flightno` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `from` smallint NOT NULL,
  `to` smallint NOT NULL,
  `departure` time NOT NULL,
  `arrival` time NOT NULL,
  `airline_id` smallint NOT NULL,
  `monday` tinyint(1) DEFAULT '0',
  `tuesday` tinyint(1) DEFAULT '0',
  `wednesday` tinyint(1) DEFAULT '0',
  `thursday` tinyint(1) DEFAULT '0',
  `friday` tinyint(1) DEFAULT '0',
  `saturday` tinyint(1) DEFAULT '0',
  `sunday` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`flightno`),
  KEY `from_idx` (`from`),
  KEY `to_idx` (`to`),
  KEY `airline_idx` (`airline_id`),
  CONSTRAINT `flightschedule_ibfk_1` FOREIGN KEY (`from`) REFERENCES `airport` (`airport_id`),
  CONSTRAINT `flightschedule_ibfk_2` FOREIGN KEY (`to`) REFERENCES `airport` (`airport_id`),
  CONSTRAINT `flightschedule_ibfk_3` FOREIGN KEY (`airline_id`) REFERENCES `airline` (`airline_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passenger` (
  `passenger_id` int NOT NULL AUTO_INCREMENT,
  `passportno` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`passenger_id`),
  UNIQUE KEY `pass_unq` (`passportno`)
) ENGINE=InnoDB AUTO_INCREMENT=36100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `passengerdetails`
--

DROP TABLE IF EXISTS `passengerdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengerdetails` (
  `passenger_id` int NOT NULL,
  `birthdate` date NOT NULL,
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` smallint NOT NULL,
  `country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailaddress` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephoneno` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`passenger_id`),
  CONSTRAINT `passengerdetails_ibfk_1` FOREIGN KEY (`passenger_id`) REFERENCES `passenger` (`passenger_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `weatherdata`
--

DROP TABLE IF EXISTS `weatherdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weatherdata` (
  `log_date` date NOT NULL,
  `time` time NOT NULL,
  `station` int NOT NULL,
  `temp` decimal(3,1) NOT NULL,
  `humidity` decimal(4,1) NOT NULL,
  `airpressure` decimal(10,2) NOT NULL,
  `wind` decimal(5,2) NOT NULL,
  `weather` enum('Nebel-Schneefall','Schneefall','Regen','Regen-Schneefall','Nebel-Regen','Nebel-Regen-Gewitter','Gewitter','Nebel','Regen-Gewitter') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `winddirection` smallint NOT NULL,
  PRIMARY KEY (`log_date`,`time`,`station`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flughafen DB by Stefan Pröll, Eva Zangerle, Wolfgang Gassler is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0';
```


### 전체 Index 목록 확인
```SQL
SELECT TABLE_NAME, INDEX_NAME, COLUMN_NAME, NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'airportdb'
ORDER BY TABLE_NAME, INDEX_NAME;
```

```csv
TABLE_NAME,INDEX_NAME,COLUMN_NAME,NON_UNIQUE
airline,base_airport_idx,base_airport,1
airline,iata_unq,iata,0
airline,PRIMARY,airline_id,0
airplane,PRIMARY,airplane_id,0
airplane,type_id,type_id,1
airplane_type,description_full,identifier,1
airplane_type,description_full,description,1
airplane_type,PRIMARY,type_id,0
airport,iata_idx,iata,1
airport,icao_unq,icao,0
airport,name_idx,name,1
airport,PRIMARY,airport_id,0
airport_geo,geolocation_spt,geolocation,1
airport_geo,PRIMARY,airport_id,0
airport_reachable,PRIMARY,airport_id,0
booking,flight_idx,flight_id,1
booking,passenger_idx,passenger_id,1
booking,PRIMARY,booking_id,0
booking,seatplan_unq,flight_id,0
booking,seatplan_unq,seat,0
employee,PRIMARY,employee_id,0
employee,user_unq,username,0
flight,airline_idx,airline_id,1
flight,airplane_idx,airplane_id,1
flight,arrivals_idx,arrival,1
flight,departure_idx,departure,1
flight,flightno,flightno,1
flight,from_idx,from,1
flight,PRIMARY,flight_id,0
flight,to_idx,to,1
flight_log,flight_log_ibfk_1,flight_id,1
flight_log,PRIMARY,flight_log_id,0
flightschedule,airline_idx,airline_id,1
flightschedule,from_idx,from,1
flightschedule,PRIMARY,flightno,0
flightschedule,to_idx,to,1
passenger,pass_unq,passportno,0
passenger,PRIMARY,passenger_id,0
passengerdetails,PRIMARY,passenger_id,0
weatherdata,PRIMARY,station,0
weatherdata,PRIMARY,time,0
weatherdata,PRIMARY,log_date,0
```


### Relations 전부 파악
```sql
SELECT t.table_name, c.constraint_name, c.constraint_type, k.column_name, k.referenced_table_name
FROM information_schema.table_constraints c
JOIN information_schema.key_column_usage k USING (constraint_name, table_schema, table_name)
JOIN information_schema.tables t ON t.table_name = c.table_name
WHERE c.table_schema = 'airportdb'
ORDER BY t.table_name, c.constraint_type;
```

```csv
TABLE_NAME,CONSTRAINT_NAME,CONSTRAINT_TYPE,COLUMN_NAME,REFERENCED_TABLE_NAME
airline,airline_ibfk_1,FOREIGN KEY,base_airport,airport
airline,PRIMARY,PRIMARY KEY,airline_id,
airline,iata_unq,UNIQUE,iata,
airplane,airplane_ibfk_1,FOREIGN KEY,type_id,airplane_type
airplane,PRIMARY,PRIMARY KEY,airplane_id,
airplane_type,PRIMARY,PRIMARY KEY,type_id,
airport,PRIMARY,PRIMARY KEY,airport_id,
airport,icao_unq,UNIQUE,icao,
airport_geo,airport_geo_ibfk_1,FOREIGN KEY,airport_id,airport
airport_geo,PRIMARY,PRIMARY KEY,airport_id,
airport_reachable,airport_reachable_ibfk_1,FOREIGN KEY,airport_id,airport
airport_reachable,PRIMARY,PRIMARY KEY,airport_id,
booking,booking_ibfk_2,FOREIGN KEY,passenger_id,passenger
booking,booking_ibfk_1,FOREIGN KEY,flight_id,flight
booking,PRIMARY,PRIMARY KEY,booking_id,
booking,seatplan_unq,UNIQUE,seat,
booking,seatplan_unq,UNIQUE,flight_id,
employee,PRIMARY,PRIMARY KEY,employee_id,
employee,user_unq,UNIQUE,username,
flight,flight_ibfk_1,FOREIGN KEY,from,airport
flight,flight_ibfk_2,FOREIGN KEY,to,airport
flight,flight_ibfk_3,FOREIGN KEY,airline_id,airline
flight,flight_ibfk_4,FOREIGN KEY,airplane_id,airplane
flight,flight_ibfk_5,FOREIGN KEY,flightno,flightschedule
flight,PRIMARY,PRIMARY KEY,flight_id,
flight_log,flight_log_ibfk_1,FOREIGN KEY,flight_id,flight
flight_log,PRIMARY,PRIMARY KEY,flight_log_id,
flightschedule,flightschedule_ibfk_1,FOREIGN KEY,from,airport
flightschedule,flightschedule_ibfk_2,FOREIGN KEY,to,airport
flightschedule,flightschedule_ibfk_3,FOREIGN KEY,airline_id,airline
flightschedule,PRIMARY,PRIMARY KEY,flightno,
passenger,PRIMARY,PRIMARY KEY,passenger_id,
passenger,pass_unq,UNIQUE,passportno,
passengerdetails,passengerdetails_ibfk_1,FOREIGN KEY,passenger_id,passenger
passengerdetails,PRIMARY,PRIMARY KEY,passenger_id,
weatherdata,PRIMARY,PRIMARY KEY,log_date,
weatherdata,PRIMARY,PRIMARY KEY,time,
weatherdata,PRIMARY,PRIMARY KEY,station,
```
