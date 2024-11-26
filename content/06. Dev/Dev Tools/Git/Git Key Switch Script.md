---
title: Git Key Switch Script
date: 2024-11-23
draft: false
tags:
  - DevTools
  - Git
  - Script
complete: true
---
```python
mkdir -p ~/.ssh/profiles
```

switch.sh
```bash
#!/bin/bash

# 프로파일 디렉토리 경로
PROFILES_DIR="$HOME/.ssh/profiles"

# 현재 SSH 키 경로
SSH_DIR="$HOME/.ssh"

# 프로파일 디렉토리 체크
if [ ! -d "$PROFILES_DIR" ]; then
  echo "Profiles directory does not exist: $PROFILES_DIR"
  exit 1
fi

# 프로파일 조회
profiles=($(ls -d "$PROFILES_DIR"/*/))
if [ ${#profiles[@]} -eq 0 ]; then
  echo "No profiles found in $PROFILES_DIR"
  exit 1
fi

echo "Available profiles:"
for i in "${!profiles[@]}"; do
  profile_name=$(basename "${profiles[i]}")
  echo "$((i + 1)). $profile_name"
done

# 사용자 선택
read -p "Select a profile (1-${#profiles[@]}): " choice

selected_profile="${profiles[$((choice - 1))]}"
selected_profile_name=$(basename "$selected_profile")

# 키 교체
echo "Switching to profile: $selected_profile_name"

key_files=($(ls "$selected_profile"/id_* 2>/dev/null))
if [ ${#key_files[@]} -eq 0 ]; then
  echo "No key files found in $selected_profile"
  exit 1
fi

# 기존 키 제거
rm -f "$SSH_DIR"/id_* 2>/dev/null

# 선택된 프로파일의 키 복사
for key in "${key_files[@]}"; do
  cp "$key" "$SSH_DIR/"
  chmod 600 "$SSH_DIR/$(basename "$key")"
done

echo "Key switching completed. Active profile: $selected_profile_name"
```


```python
sudo mv switch.sh /usr/local/bin/switch

#export PATH="$PATH:/usr/local/bin" # if necessary
```