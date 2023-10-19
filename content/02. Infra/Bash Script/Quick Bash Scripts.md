---
title: Quick Bash Scripts
date: 2023-10-19
draft: false
tags:
  - Bash
---
# Permission

## Run as User (with no password)

***run.sh***
```sh
#sudo -H -u root bash -c 'echo "I am $USER, with uid $UID"'
sudo -H -u avokey bash -c 'sh /Users/avokey/.ssh/switch.sh'
```

***switch.sh***
```sh
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
