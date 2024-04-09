---
title: Java Garbage Collector
date: 2023-12-09
draft: false
tags:
  - Java
complete: true
---
### 목차
1. 가비지 컬렉터에 관해 알아야 하는 이유 
2. 가비지 컬렉터 동작 원리 
3. 가비지 컬렉터 튜닝 방법 

### 가비지 컬렉터에 관해 알아야 하는 이유

가비지 컬렉터(Garbage Collector, 이하 GC)
- `프로그램이 동적으로 할당했던 메모리 영역(a) 중 필요 없게 된 영역(b)을 알아서 해제`하는 메모리 관리 장치

가비지 컬렉터에 관해 알아야 하는 이유 
- 자바 애플리케이션 모니터링 시 주목해야 할 지표에 `Heap 메모리 지표`와 `GC 지표`가 존재하는데, 이들 모두 GC와 연관됨. 따라서 개발자로서 GC의 동작 원리에 관하여 이해하면 **메모리 관련 장애 대응 능력**을 높일 수 있다.
- 또 GC의 동작원리를 이해하면, 자바 서버 성능을 향상시키기 위해, `GC 튜닝`을 할 수도 있다.

실제 문제 사례 공유
트래픽이 많지 않았는데, 주문 중계 API에 응답 지연 문제가 발생됨. 코드 자체는 문제가 없었고 환경 복제 후 트래픽을 새로운 서버로 이관했음에도 계속 문제가 발생되었음.
	- 참고링크 : [https://techblog.woowahan.com/2628/](https://techblog.woowahan.com/2628/)
- 문제 : FullGC 가 계속 발생하지만 `heap memory`의 변화가 없었다.
- 원인 파악 : **heap dump** jmap -dump 명령어를 통해, 특정 라이브러리의 객체의 메모리가 힙 영역에서 비정상적으로 큰 비중을 차지하고 있는 것을 알게 됨. `메모리릭` 현상으로 판단함.

JVM memory leak에 관하여 
- 메모리릭이란 JVM 런타임 메모리 영역 중 힙 영역에 객체가 존재하고 더 이상 사용되지 않음에도 GC에서 제거할 수 없는 경우에 발생된다.
- 앞서 보았듯, 메모리릭 문제는 운영 과정에서 서비스 응답지연 문제를 유발할 수 있는 대표적인 문제 중 하나. 따라서 원인과 해결방법에 관해 알고 있어야 함.

 모니터링 방법 
- Heap 영역
	- `jmap -dump` 명령어를 통해 Heap Dump를 생성하여, 메모리 Heap 정보를 확인할 수 있다.
		- **ex) `jmap -heap <PID>`**
		- **ex) `jmap -dump:format=b,file=<파일명> <PID>`**
- GC 영역
	- CLI : 직접 CLI 명령어를 입력하여 Garbage Collection logs들을 확인할 수도 있다.
		- `java -XX:+PrintCommandLineFlags -version`
		- jstat
			- -gcutil : 힙 영역의 사용 정도와 GC 발생 횟수, 실행 누적 시간을 조회 가능하다.
			- -gccapacity : 실제 할당 크기를 파악할 수 있다.
			- **ex) `jstat -gcutil -t <PID> 1000 10`** : 해당 PID의 자바 프로세스의 힙 영역 정보를 10초간 10번 호출
			- **ex) `jstat -gcutil -t <PID> 1000 10`**
	- GUI GC 모니터링

언급은 안했지만
두 영역에 대한 모니터링 정보는 APM(Application Performance Management) 툴에서도 당연하게도 제공됨. 오픈소스로 사용 가능한 Scouter와 Pinpoint, 와탭과 데이터독 모니터링 서비스.



### 가비지 컬렉터의 동작 원리

1. 가비지 컬렉터(GC)
- 필요한 이유
	- `프로그램이 동적으로 할당했던 메모리 영역(a) 중 필요 없게 된 영역(b)을 알아서 해제` (a)이란 런타임에서 사용되는 Heap 메모리 영역을 말하고 (b)란 어떤 변수도 가리키지 않게 된 영역을 말함.
	- C/C++의 경우, Heap 영역의 메모리를 관리하기 위해 동적으로 메모리를 할당 받고 필요 없어지면 해제해줘야 했음.
    - 장점
        - 메모리 누수 현상을 예방함.
        - 해제된 메모리에 접근을 막음.
        - 중복 해제를 방지함.
    - 단점
        - GC 작업은 순수 `오버헤드`(프로그램이 해야 할 일을 못하도록 방해하는 일)입니다.
        - 따라서, 실시간성이 매우 중요한 프로그램의 경우, GC에게 메모리 관리를 맡기는게 문제가 됨. 후술하겠지만 Full GC가 발생할 경우, `stop-the-world`가 발생되기 때문.
        - 여기서 `stop-the-world`란 GC 실행을 위해 JVM이 어플리케이션 실행을 멈추는 것을 말한다.
        - 또 개발자는 `언제 GC가 메모리를 해제하는지 알 수 없다`.
    - 동작원리 : GC 알고리즘을 구현하는 방법에는 2가지가 있습니다.
        
        ![](https://i.imgur.com/uo4LzOS.png)

        
        - Reference Counting
            - 객체를 참조하는 횟수가 0이라면, GC의 대상이 됨.
            - 단점으로 `순환참조`(두 객체가 서로를 참조하면 실제 이 객체들이 사용되지 않아도 레퍼런스 카운트는 1에서 더 내려가지 않는다)가 발생할 경우, `Root Space`에서의 Heap 영역으로의 참조가 불가하더라도 GC 대상이 되지 않음. 여기서 `Root Space`란 Stack의 로컬 변수, Method Area의 static 변수, Native Method Stack의 JNI 참조를 말함.
        - Mark And Sweep
            - 순환 참조 문제를 해결한 GC 알고리즘. 해제 기준은 루트에서부터 해당 객체에 접근 가능한가?이다.
            - 루트로부터 그래프 순회를 통해 연결된 객체들을 찾아내고(Mark) 연결이 끊어진 객체들은 삭제한다(Sweep).
            - 자바와 자바스크립트의 GC가 해당 알고리즘을 사용한다.
            - 단점으론 Reference Counting 방식에선 참조 횟수가 0이면 바로 제거하지만, Mark and Sweep 방식에선 `JVM의 실행엔진`이 의도적으로 GC를 실행시켜야 한다. 이는 곧 컴퓨터 리소스를 프로그램이 아닌, GC에게 할당해야 한다는 것. 따라서 `어플리케이션 실행과 GC 실행을 적절히 병행하는 것이 중요`한데, 이는 어플리케이션의 사용성을 유지하면서 효율성을 지키는 것이 중요하기 때문이다.
    - 힙 메모리 구조
        
        ![](https://i.imgur.com/v3AnZYw.png)

        
        - YG (Eden → Survival 0 or Survival 1) → OG.
        - Old Generation과 Young Generation으로 구분됨.
        - Survival 0 혹은 Survival 1 중 하나는 비어있어야 함.
    - GC 동작
        - **Minor GC** : Eden 영역이 꽉 차면, Mark and Sweep이 이뤄져 Survival 0 영역으로 이동됨. 이 때, Root Space로부터 접근 가능하다고 판단된 객체들이 옮겨진다.
        - **Promotion** : JVM GC에서는 age-bit가 넘어가면, Survival 영역에서 Old Generation으로 넘기는 동작을 한다. Java 8 Parallel GC 기준 age-bit 15가 넘어가면, 넘긴다.
        - **Major GC** : minor GC보다 더 오래 걸림. 대부분의 객체의 수명 주기가 금방 사라져 YG/OG 두 영역으로 나누고 YG에서 대부분의 작업을 처리한다.
        - **Stop the World** : GC를 실행하기 위해 JVM이 어플리케이션 실행을 멈추는 것을 말한다.
    - GC 작동 방식
        - Serial GC
           ![](https://i.imgur.com/g6Jf4E0.png)

            
        - Parallel GC
            ![](https://i.imgur.com/dmETp9Y.png)

            
        - CMS(Concurrent Mark & Sweep) GC
            ![](https://i.imgur.com/ngNoif8.png)

            
        - G1(Garbage First) GC
            - 런타임에서 각 영역 갯수를 튜닝한다.
            ![](https://i.imgur.com/RbH2E1O.png)

            
            
    
### 가비지 컬렉터 튜닝 방법
- 주의사항
	- 기본적으로 GC는 추가 옵션을 지정할 필요 없이 전반적으로 우수한 성능을 제공하도록 설계되었다. 따라서 GC 튜닝은 최후 작업이다.
- 목표
	- GC 튜닝이란 stop-the-world 시간을 줄이는 것이다.
	- 이를 위해선, Old Generation으로 넘어가는 객체를 최소화하거나 Major GC 시간을 짧게 유지해야 한다.
- 튜닝 방법
	- 피해야 할 작업
		- Young Generation의 크기를 특정 값으로 제한해선 안된다. 이를 제한하면, GC가 일시정지 시간을 효과적으로 제어할 수 없다.
- 튜닝 과정
	- GC 상태 모니터링
	- 알맞은 GC 방식과 메모리 크기 지정
	- 적용하기
- GC 튜닝 옵션 정보
	- Heap 크기 설정
		- -Xms : JVM 시작 시, 힙 영역의 크기 지정
		- -Xmx : 최대 힙 영역 크기 지정
	- New 영역 크기 설정
		- -XX:NewRatio : New 영역과 Old 영역의 비율
		- -XX:NewSize : New 영역의 크기
		- -XX:SurvivorRatio : Eden 영역과 Survivor 영역의 비율
	- GC 실행 방식 설정
		- -XX:+UseSerialGC : SerialGC 사용
		- -XX:ParallelGCThread=value : ParallelGC 사용
		- -XX:+UseParallelOldGC: ParallelGC + Compacting
		- -XX:+UseGMSInitialingOccupancyOnly : CMS GC 사용
		- -XX+UseG1GC: G1 사용




### (추가) MinorGC에 대한 자세한 과정
[https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html#t3](https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html#t3)