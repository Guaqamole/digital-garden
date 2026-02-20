---
title: Grafana 설치
date: 2024-03-07
draft: false
tags: 
complete: true
---
## 1. PreRequiste
```sh
sudo mkdir -p grafana/data grafana/config
sudo touch grafana/config/grafana.ini
sudo chown -R 472:472 grafana/data

home="$(pwd)"
docker run \
-d --name=grafana \
-p 3000:3000 \
-v $home/config:/etc/grafana \
-v $home/data:/var/lib/grafana \
grafana/grafana
```

초기 id/pw : admin/admin

## 2. admin settings
http://localhost:3000/admin/settings
#### Server
| Name                | Value                                         |
| ------------------- | ---------------------------------------- |
| cdn_url             | n/a                                         |
| cert_file           | n/a                                         |
| cert_key            | n/a                                         |
| domain              | localhost                                |
| enable_gzip         | false                                    |
| enforce_domain      | false                                    |
| http_addr           | 0.0.0.0                                  |
| http_port           | 3000                                     |
| min_tls_version     | TLS1.2                                   |
| protocol            | http                                     |
| read_timeout        | 0                                        |
| root_url            | %(protocol)s://%(domain)s:%(http_port)s/ |
| router_logging      | false                                    |
| serve_from_sub_path | false                                    |
| socket              | /tmp/grafana.sock                        |
| socket_gid          | -1                                       |
| socket_mode         | 0660                                     |
| static_root_path    | public                                   |

여기서 `domain` 이런 값들을 변경하고 싶다면 grafana.ini 파일 변경이 필요하다.
```yaml
[server]
domain=grafana
```

## 3. plugins
#### Test로 Clock 설치해보기
https://grafana.com/grafana/plugins/

```sh
docker exec -ti grafana sh

grafana-cli plugins install grafana-clock-panel
```

#### Grafana Dashboards
https://grafana.com/grafana/dashboards/
