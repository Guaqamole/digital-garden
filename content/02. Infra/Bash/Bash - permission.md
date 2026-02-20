---
title: Bash - Permission
date: 2023-10-31
draft: false
tags:
  - Bash
  - HowTo
  - Linux
complete: true
---
## Run as User (with no password) [link](https://askubuntu.com/questions/294736/run-a-shell-script-as-another-user-that-has-no-password)

***run.sh***
```bash
sudo -H -u root bash -c 'echo "I am $USER, with uid $UID"'
sudo -H -u avokey bash -c 'sh /Users/avokey/.ssh/switch.sh'
```

`-H`: `sudo`에게 대상 사용자(`root`인 경우)의 홈 디렉터리로 홈 환경 변수(`$HOME`)를 설정하라는 것입니다. 이를 통해 대상 사용자에게 적절한 환경 변수가 설정되도록 합니다.

`-u root`: 다음에 나오는 명령어를 실행할 사용자를 지정합니다. 이 경우 `root` 사용자로 명령을 실행하도록 합니다. 이 옵션을 사용하면 지정한 사용자의 권한으로 명령을 실행할 수 있습니다. 이 경우 명령을 root 사용자로 실행합니다.

```sh

```


***switch.sh***
```bash
#!/bin/bash

profile=$(cat id_rsa.pub | awk -F'@' '{print $1}' | awk '{print $NF}' | cut -c2-)

printf "\nCurrent Profile: $profile\n"

read -p "Choose 1 (avoholo) OR Choose 2 (guaqamole): " choice

if [ "$choice" -eq 1 ]; then
    rm -rf ./id_rsa.pub && rm -rf ./id_rsa
    cp ./avoholo/* ./
    echo "Switched to Avoholo."
elif [ "$choice" -eq 2 ]; then
    rm -rf ./id_rsa.pub && rm -rf ./id_rsa
    cp ./guaqamole/* ./
    echo "Switched to Guaqamole."
else
    echo "Invalid choice. Please enter 1 or 2."
fi
```


---

