---
title: Prometheus AlertManager
date: 2024-03-07
draft: false
tags:
  - Prometheus
  - Monitoring
complete: true
---
## 1. PreRequiste
alerting.yml (prometheus.yml)
```yaml
global:
  evaluation_interval: 1s

alerting:
  alertmanagers:
    - timeout: 10s
      static_configs:
      - targets:
        - host.docker.internal:9093

scrape_configs:
- job_name: 'node-exporter'
  scrape_interval: 3s
  scrape_timeout: 1s
  static_configs:
  - targets:
    - host.docker.internal:9104
- job_name: 'mysql-exporter'
  scrape_interval: 3s
  scrape_timeout: 1s
  static_configs:
  - targets:
    - host.docker.internal:9093

rule_files:
  - 'rules/mysql.yml'
```

```sh
ln -sf alerting.yml prometheus.yml
curl localhost:9090/-/reload -XPOST -D /dev/stdout
```
## 2. Alert Rules
https://samber.github.io/awesome-prometheus-alerts/
#### ex) mysql down
vi rules/mysql.yml
```yml
groups:
- name: example
  rules:
    - alert: MysqlDown
      expr: mysql_up == 0
      for: 0m
      labels:
        severity: critical
      annotations:
        summary: MySQL down (instance "{{ $labels.instance }}")
        description: "MySQL instance is down on {{ $labels.instance }}"
```

## 3. AlertManager Config
vi alertmanager.yml
```yaml
global:
  slack_api_url: 'https://hooks.slack.com/services/xxxxx/xxxxx'

route:
  receiver: 'slack-notification'
  group_by: ['alertname']
  group_wait: 3s
  group_interval: 5s
  repeat_interval: 20s
  routes:
  - receiver: 'slack-notification'
    group_wait: 10s
    match_re:
      service: local

receivers:
- name: 'slack-notification'
  slack_configs:
  - channel: '#namkyu-alert'
    send_resolved: true
    icon_url: https://avatars3.githubusercontent.com/u/3380462
    title: |-
      [{{ .Status | toUpper }}{{ if eq .Status "firing" }}:{{ .Alerts.Firing | len }}{{ end }}] {{ .CommonLabels.alertname }} for {{ .CommonLabels.job }}
      {{- if gt (len .CommonLabels) (len .GroupLabels) -}}
        {{" "}}(
        {{- with .CommonLabels.Remove .GroupLabels.Names }}
          {{- range $index, $label := .SortedPairs -}}
            {{ if $index }}, {{ end }}
            {{- $label.Name }}="{{ $label.Value -}}"
          {{- end }}
        {{- end -}}
        )
      {{- end }}
    text: >-
      {{ range .Alerts -}}
      *Alert:* `{{ .Labels.severity }}`

      *Description:* {{ .Annotations.description }}

      *Details:*
        {{ range .Labels.SortedPairs }} • *{{ .Name }}:* `{{ .Value }}`
        {{ end }}
      {{ end }}
```