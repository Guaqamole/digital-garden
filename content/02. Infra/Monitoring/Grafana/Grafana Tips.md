---
title: Grafana Tips
date: 2024-03-14
draft: false
tags:
  - Grafana
  - Monitoring
complete: true
---
## Hide Annotation, Marks on alert in Dashboard
![](https://i.imgur.com/MDyYYnl.png)
![](https://i.imgur.com/0DyIaoe.png)

## Custom Slack Alert Template
```golang
{{ define "slack.title" -}}
	{{- if eq .Status "firing" -}}
		:red_circle: [{{ .Status | toUpper }} x {{ .Alerts.Firing | len }}] | {{ .CommonLabels.alertname }}
	{{- else -}}
		{{- if ne .Status "firing" }}
			:white_check_mark: [{{ .Status | toUpper }} x {{ .Alerts.Resolved | len }}] | {{ .CommonLabels.alertname }}
		{{- end }}
	{{- end }}
{{- end }}

{{- define "slack.text" -}}
	{{- range .Alerts -}}
		{{- if gt (len .Annotations) 0 }}
			{{- if eq .Status "firing" -}}
*{{ .Annotations.summary }}* : {{ .Annotations.description }}
Labels: 
					{{- range .Labels.SortedPairs }}
						{{- if or (eq .Name "env") (eq .Name "instance") (eq .Name "type") (eq .Name "layer") }}
• {{ .Name }}: `{{ .Value }}`
						{{- end -}}
					{{- end }}
			{{- end }}
		{{- end }}
{{ .DashboardURL }}
	{{- end }}
{{- end }}
```

## Change URL DOMAIN
```sh
vi /etc/grafana/grafana.ini

;domain = localhost // before
domain = xx.xxx.xx.xxx // after

sudo systemctl restart grafana-server
```
