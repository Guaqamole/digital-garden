---
title:  Bash - grep (egrep, fgrep)
date: 2023-10-31
draft: false
tags:
  - 
  - HowTo
complete: true
---

# 개념


## Grep vs Egrep

`egrep` 명령어는 `grep` 바이너리의 단축키입니다. 하지만 한 가지 알고가야할 사항이 있습니다: `grep이` `egrep으로` 호출되면 `grep` 바이너리는 내부 로직을 활성화하여 `grep -E`로 호출된 것처럼 실행됩니다.

여기서 차이점은 `-E` 옵션이 확장된 `regexp` 패턴의 사용을 활성화한다는 것입니다. 이를 통해 `+, ?` 또는 `|` 와 같은 메타 기호를 사용할 수 있습니다. 이러한 기호는 우리가 단어나 파일 이름에서 사용하는 일반 문자가 아니라 `grep` 바이너리 자체의 제어 명령입니다. 따라서 `egrep`을 사용하면 `|` 문자는 논리 OR을 의미합니다.

예를 들어, "mp4" 또는 "avi"라는 파일 확장자를 포함한 파일만 보려면 egrep을 사용하여 다음과 같이 실행합니다:

```
ls | egrep "mp4|avi"
```

이 예시에서 큰 따음표 안의 | (pipe) 는 OR 명령처럼 작동합니다. 이것은 `ls`의 출력에서 "mp4" 또는 "avi" 문자열을 포함하는 모든 이름을 가져옵니다. 일반 grep 명령으로 실행하면 결과가 나오지 않습니다. 왜냐하면 grep은 `|`명령을 모르기 때문입니다. 대신, grep은 "mp4|avi"를 전체 텍스트 문자열(파이프 기호 포함)로 검색합니다. 예를 들어, 디렉터리에 |mp4|avi|cool-guy.q2.stats라는 파일이 있다면 일반 grep 검색에서 파이프로 찾을 수 있습니다.

그래서 egrep 명령에서 grep과 동일한 효과를 얻기 위해 |를 이스케이프해야 하는 이유입니다. 이스케이핑은 grep 바이너리의 | 명령의 특별한 의미를 차단합니다.


https://stackoverflow.com/questions/18058875/difference-between-egrep-and-grep

---

```
grep = grep -G # 'grep'은 grep 명령어에 -G 옵션을 붙인 것과 동일 (기본값)
egrep = grep -E # 'egrep'은 grep 명령어에 -E 옵션을 붙인 것과 동일 
fgrep = grep -F # 'fgrep'은 grep 명령어에 -F 옵션을 붙인 것과 동일 
```

## egrep / grep -E / grep --extened-regexp

`egrep은` `grep` 명령어에 `-E` 또는 `--extened-regexp` 옵션을 준 것과 같다.  
옵션 풀네임을 보면 알 수 있듯이 <mark style="background: #C6AB16;">확장 정규표현식을 사용하기 위한 명령이다.  </mark>

확장 정규표현식에 쓰이는 메타문자를 사용할 때 각각의 문자에 escape 처리를 해주지 않아도 된다.  

```
egrep 'no(escape|character)' someFile 
grep 'no\(escape\|character\)' someFile
```

`someFile` 이라는 파일에서 `noescape` 또는 `nocharacter` 라는 문자열 둘 중 하나를 검색한다는 정규표현식을 사용할 때:
- 확장 정규표현식(egrep)에서는 그냥 사용하면 되지만 
- 기본 정규표현식(grep) 에서는 메타문자 각각에 대하여 문자를 통해 escape 처리를 해주어야 동작하게 된다.  

## fgrep / grep -F / grep --fixed-strings

`egrep` 이 기본 `grep` 의 정규표현식을 확장하는 개념이라면  
`fgrep` 은 <mark style="background: #C6AB16;">정규표현식을 사용하지 않는다고 선언해주는 것과 같다.</mark>

따라서 정규표현식에서 메타문자로 사용되는 문자들이 그 자체로서 패턴 비교에 활용된다.  

```
fgrep 'self.' * 
grep 'self.' *
```

위 코드를 보면 `fgrep` 과 `grep` 명령어 모두 `self.` 라는 문자열을 검색하고 있다:
- `fgrep` : 순수하게 `self.` 이라는, `self` 뒤에 `.` (점) 문자를 포함한 문자열만을 검색 
- `grep` `self.` 뿐만이 아니라 `selfi`, `selfy`, `selfa` 등 `.`(점) 이 문자 1개를 의미하는 메타문자로서 동작하여 패턴 비교에 활용된다.

---

# 문법

## sample.txt
```txt
In the world of business, professionals strive for excellence in their fields, continuously seeking opportunities for growth and innovation. The conference brings together professionals from diverse backgrounds, showcasing their impressive collective expertise. Professionals in the healthcare industry work tirelessly to provide quality care to patients, earning admiration for their dedication. 

In the fast-paced world of technology, professionals are always adapting to new developments, emphasizing the importance of staying up-to-date. Events attract professionals from all over the globe, creating valuable networking experiences. 

Many professionals 

find fulfillment in helping others, their passion for making a difference inspiring. 

In the world of finance, professionals analyze data and make informed decisions, playing a crucial role in organizational success. Professionals in the education sector shape the future, displaying commendable dedication to students.

In the realm of art, professionals continually push the boundaries of creativity, exploring new forms and expressions. Art exhibitions showcase professionals from diverse backgrounds, each contributing unique perspectives. Professionals in the culinary world craft delightful dishes, their passion for flavors and presentation truly exceptional. In the dynamic field of technology, professionals innovate relentlessly, adapting to rapid changes and breakthroughs. Conferences draw professionals from various industries, fostering valuable connections and insights. 

Many professionals derive satisfaction from mentoring others, their guidance and wisdom profoundly impactful. In the realm of science, professionals conduct groundbreaking research, shaping the future of knowledge and discovery. 

Professionals in the environmental sector champion sustainability, their dedication to preserving the planet inspiring.
```

## 글포함줄 / 전체줄
```bash
grep -vE '^[[:space:]]*$' sample.txt | wc -l && wc -l sample.txt

8
15 sample.txt
```


## 파일에서 단어찾기
```bash
egrep -n professionals sample.txt sample2.txt sample3.txt
```

## 라인별 매칭된 단어 카운트하기 (중복 카운트 X)
```bash
egrep -c professionals sample.txt

6
```

## 매칭된 단어 전체 카운트
```bash
egrep -o professionals sample.txt | wc -l

12
```

## 대소문자 구분없이 찾기
```bash
egrep -i He sample.txt

In the world of business...
```

## 정확한 단어 매칭
```bash
egrep -w in sample.txt
```

## Quiet Mode (쉘스크립트 작성시 유용)
```bash
egrep -q professionals sample.txt
$ echo $?
> 0

egrep -q non-existing-pattern sample.txt
$ echo $?
> 1
```

## 재귀적 단어 찾기
```bash
$ find dir1 -type f -name '*sample*'
> dir1/dir2/dir3/sample2.txt
> dir1/dir2/dir3/sample3.txt
> dir1/dir2/sample.txt

egrep -nr professionals dir1

# 왠만하면 한줄한줄씩 띄어서 보기 쉽게하자...
egrep -nr professionals dir1 | awk '{print $0,"\n"}'

```

---

# 활용

## Search for Error Messages in Logs:
```bash
egrep -i 'error|exception' /var/log/syslog
```


## Find IP Addresses:
```bash
egrep -o '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b' /var/log/access.log
```


## Search for Specific HTTP Status Codes:
```bash
egrep ' 404 | 500 ' /var/log/apache/access.log
```


## Search for Failed SSH Login Attempts:
```bash
egrep 'sshd\[.*\]: Failed' /var/log/auth.log
```


## Find CPU Information:
```bash
cat /proc/cpuinfo | egrep 'model name|processor'
```


## Search for Running Processes:
```bash
ps aux | egrep 'process1|process2'
```


## Check for Disk Usage:
```bash
df -h | egrep '/dev/sd[a-z]'
```


## Search for Open Ports:
```bash
netstat -tuln | egrep 'LISTEN'
```


## Find Large Files:
```bash
find /path/to/search -type f -size +100M | egrep '.*'
```


## Search for Specific Strings in Configuration Files:
```bash
egrep 'parameter1|parameter2' /etc/nginx/nginx.conf
```


---