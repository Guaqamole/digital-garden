---
title: Bash - sudoers
date: 2023-11-08
draft: false
tags:
  - Bash
  - HowTo
complete: true
---
sudo는 신뢰할 수 있는 사용자가 기본적으로 루트 사용자인 다른 사용자로 명령을 실행할 수 있도록 설계된 명령줄 유틸리티입니다.

사용자에게 sudo 액세스 권한을 부여하는 두 가지 옵션이 있습니다:
- 첫 번째 방법은 <mark style="background: #C6AB16;">사용자를 sudoers 파일에 추가하는 것입니다.</mark> 이 파일에는 권한 수준뿐만 아니라 sudo 권한으로 부여된 사용자 및 그룹을 정의하는 정보가 포함되어 있습니다.
- 두 번째 옵션은 <mark style="background: #C6AB16;">sudoers 파일에 정의된 sudo 그룹에 사용자를 추가하는 것입니다. </mark>
	- CentOS: 기본적으로 CentOS 및 Fedora와 같은 RedHat 기반 배포에서는 "wheel" 그룹의 구성원에게 sudo 권한이 부여됩니다.
	- Ubuntu: Ubuntu에서 사용자에게 sudo 권한을 부여하는 가장 쉬운 방법은 사용자를 "sudo" 그룹에 추가하는 것입니다. 이 그룹의 구성원은 sudo를 통해 모든 명령을 root로 실행할 수 있으며 sudo를 사용할 때 암호로 자신을 인증하라는 메시지를 표시합니다.

---

# 그룹에 사용자 추가

## CentOS - wheel 그룹에 사용자를 추가

사용자에게 CentOS에 대한 sudo 권한을 부여하는 가장 쉬운 방법입니다. 사용자를 "wheel" 그룹에 추가하는 것입니다. 이 그룹의 구성원은 sudo를 통해 모든 명령을 실행할 수 있으며 sudo를 사용할 때 암호로 자신을 인증하라는 메시지를 표시합니다.

사용자를 그룹에 추가하려면 아래 명령을 루트 또는 다른 sudo 사용자로 실행하십시오. 권한을 부여할 사용자의 이름을 사용하여 "username"을 변경합니다.

```
usermod -aG wheel username
```

대부분의 경우 이 방법을 사용하여 sudo 액세스 권한을 부여하면 충분합니다.

sudo 액세스를 테스트하려면 whoami 명령을 실행합니다.

암호를 입력하라는 메시지가 표시됩니다. 사용자에게 sudo 권한이 있는 경우 명령은 "root"를 인쇄합니다.

```
sudo whoami

# root
```

"user is not in the sudoers file"(사용자가 sudoers 파일에 없음) 오류가 발생하면 사용자에게 sudo 권한이 없음을 의미합니다.



## Ubuntu - sudo 그룹에 사용자를 추가

사용자를 그룹에 추가하려면 아래 명령을 루트 또는 다른 sudo 사용자로 실행하십시오. 권한을 부여할 사용자의 이름을 사용하여 "username"을 변경해야 합니다.

```
usermod -aG sudo username
```

대부분의 경우 이 방법을 사용하여 sudo 액세스 권한을 부여하면 충분합니다.

사용자에게 sudo 권한이 있는지 확인하려면 whoami 명령을 실행합니다.

```
sudo whoami

# root
```

암호를 입력하라는 메시지가 표시됩니다. 사용자에게 sudo 액세스 권한이 있는 경우 명령은 "root"를 인쇄합니다.

"user is not in the sudoers file"(사용자가 sudoers 파일에 없음) 오류가 발생하면 사용자에게 sudo 권한이 없음을 의미합니다.


---

# sudoers 파일에 사용자를 추가

## CentOS

사용자 및 그룹의 sudo 권한은 /etc/sudoers 파일에 구성됩니다. 사용자를 이 파일에 추가하면 명령에 대한 사용자 지정 액세스 권한을 부여하고 사용자에 대한 사용자 지정 보안 정책을 구성할 수 있습니다.

sudoers 파일을 수정하거나 /etc/sudoers.d 디렉토리에 새 구성 파일을 생성하여 사용자 sudo 액세스를 구성할 수 있습니다. 이 디렉터리의 파일은 sudoers 파일에 포함됩니다.

/etc/sudoers 파일을 편집하려면 visudo 명령을 사용합니다. 이 명령은 파일을 저장할 때 구문 오류가 있는지 확인합니다. 오류가 있으면 파일이 저장되지 않습니다. 텍스트 편집기로 파일을 여는 경우 구문 오류로 인해 sudo 액세스 권한이 손실될 수 있습니다.

일반적으로 visudo는 vim을 사용하여 /etc/sudoer를 엽니다. vim을 사용해 본 경험이 없고 파일을 나노 유형으로 편집하려면 다음과 같이 하십시오.

```
EDITOR=nano visudo
```

사용자에게 암호를 묻지 않고 sudo 명령을 실행할 수 있도록 허용한다고 가정합니다. /etc/sudoers 파일을 엽니다.

```
visudo
```

파일 끝까지 스크롤하여 다음 줄을 추가합니다.

```
# /etc/sudoers

username  x
```

파일을 저장하고 편집기를 종료하십시오. 액세스 권한을 부여할 사용자 이름으로 "username"을 변경하는 것을 잊지 마십시오.

또 다른 일반적인 예는 사용자가 sudo를 통해 특정 명령만 실행하도록 허용하는 것입니다. 예를 들어, du 및 ping 명령만 허용하려면 다음과 같이 하십시오.

```
# /etc/sudoers

username ALL=(ALL) NOPASSWD:/usr/bin/du,/usr/bin/ping
```

sudoers 파일을 편집하는 대신 /etc/sudoers.d 디렉토리에 권한 부여 규칙을 사용하여 새 파일을 만들어 동일한 작업을 수행할 수 있습니다. sudoers 파일에 추가하는 것과 동일한 규칙을 추가합니다.

```
echo "username  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/username
```

이 접근 방식을 사용하면 sudo 권한의 관리를 보다 쉽게 유지할 수 있습니다. 파일 이름은 중요하지 않습니다. 일반적으로 파일 이름은 사용자 이름과 같습니다.

사용자에게 sudo 액세스 권한을 부여하는 것은 간단한 작업이며, 사용자를 "wheel" 그룹에 추가하기만 하면 됩니다.



## Ubuntu

사용자 및 그룹의 sudo 권한은 /etc/sudoers 파일에 정의됩니다. 이 파일에 사용자를 추가하면 명령에 대한 사용자 지정 액세스 권한을 부여하고 사용자 지정 보안 정책을 구성할 수 있습니다.

sudoers 파일을 수정하거나 /etc/sudoers.d 디렉토리에 새 구성 파일을 생성하여 사용자 sudo 액세스를 구성할 수 있습니다. 이 디렉터리의 파일은 sudoers 파일에 포함됩니다.

항상 visudo를 사용하여 /etc/sudoers 파일을 편집합니다. 이 명령은 파일을 저장할 때 구문 오류가 있는지 확인합니다. 오류가 있으면 파일이 저장되지 않습니다. 텍스트 편집기로 파일을 여는 경우 구문 오류로 인해 sudo 액세스 권한이 손실될 수 있습니다.

일반적으로 visudo는 vim을 사용하여 /etc/sudoer를 엽니다. vim에 대한 경험이 없고 파일을 나노로 편집하려면 다음을 실행하여 기본 편집기를 변경하십시오.

```
EDITOR=nano visudo
```

사용자에게 암호를 묻지 않고 sudo 명령을 실행할 수 있도록 허용한다고 가정합니다. 이렇게 하려면 /etc/sudoers 파일을 엽니다.

```
visudo
```

파일 끝까지 스크롤하여 다음 줄을 추가합니다.

```
# /etc/sudoers

username  ALL=(ALL) NOPASSWD:ALL
```

파일을 저장하고 편집기를 종료하십시오. 액세스 권한을 부여할 사용자 이름으로 "username"을 변경하는 것을 잊지 마십시오. 

또 다른 일반적인 예는 사용자가 sudo를 통해 특정 명령만 실행할 수 있도록 하는 것입니다. 예를 들어 mkdir 및 rmdir 명령만 허용하려면 다음을 사용합니다.

```
# /etc/sudoers

username ALL=(ALL) NOPASSWD:/bin/mkdir,/bin/rmdir
```

sudoers 파일을 편집하는 대신 /etc/sudoers.d 디렉토리에 권한 부여 규칙을 사용하여 새 파일을 만들어 동일한 작업을 수행할 수 있습니다. sudoers 파일에 추가하는 것과 동일한 규칙을 추가합니다.

```
echo "username  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/username
```

이 접근 방식을 사용하면 sudo 권한의 관리를 보다 쉽게 유지할 수 있습니다. 파일 이름은 중요하지 않습니다. 일반적으로 파일 이름은 사용자 이름과 같습니다.

Ubuntu에서 사용자에게 sudo 액세스 권한을 부여하는 것은 간단한 작업입니다. 사용자를 "sudo" 그룹에 추가하기만 하면 됩니다.