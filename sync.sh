#!/bin/bash

# Get the current timestamp in KST
timestamp=$(TZ='Asia/Seoul' date '+%Y-%m-%d %H:%M:%S')

# Git Pull
git remote update
git pull origin v4

# Git commands
git add .
git commit -m "Quarts Sync at: $timestamp KST"
git push origin v4
