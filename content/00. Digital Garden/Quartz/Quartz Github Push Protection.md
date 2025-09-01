---
title: Setup with Github Pages
date: 2025-09-01
draft: false
tags:
  - Quartz
---
*Parent* : [[00. Digital Garden]]

```sh
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote: error: GH013: Repository rule violations found for refs/heads/v4.
remote:
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote:
remote:     - Push cannot contain secrets
remote:
remote:
remote:      (?) Learn how to resolve a blocked push
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
remote:
remote:      (?) This repository does not have Secret Scanning enabled, but is eligible. Enable Secret Scanning to view and manage detected secrets.
remote:      Visit the repository settings page, https://github.com/Guaqamole/digital-garden/settings/security_analysis
remote:
remote:
remote:       —— Google OAuth Client ID ————————————————————————————
remote:        locations:
remote:          - commit: b1743c9f38c5a473d7bb06eec9b7056894a7be39
remote:            path: content/.obsidian/plugins/remotely-save/main.js:90
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/Guaqamole/digital-garden/security/secret-scanning/unblock-secret/325b8fgEiXxxI6kB8L5D7WMXsMh
```

### 문제되는 애들 .gitignore 추가
```sh
content/.obsidian/plugins/remotely-save
```
