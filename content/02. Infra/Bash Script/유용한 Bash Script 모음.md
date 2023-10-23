---
title: Quick Bash Scripts
date: 2023-10-19
draft: false
tags:
  - Bash
complete: true
---
# Permission

## Run as User (with no password) [link](https://askubuntu.com/questions/294736/run-a-shell-script-as-another-user-that-has-no-password)

***run.sh***
```bash
#sudo -H -u root bash -c 'echo "I am $USER, with uid $UID"'
sudo -H -u avokey bash -c 'sh /Users/avokey/.ssh/switch.sh'
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