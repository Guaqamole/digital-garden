---
title: Node Exporter 설치
date: 2024-03-07
draft: false
tags:
  - Prometheus
  - NodeExporter
complete: true
---
## 1. PreRequisite
download from here
https://prometheus.io/download/#node_exporter
```sh
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.darwin-amd64.tar.gz

tar -zxvf ...
cd node-exporter
./node-exporter

netstat -nltp | grep 9100
tcp46      0      0  *.9100        *.*           LISTEN
```

check metrics here
http://localhost:9100/metrics

#### docker version
```sh
home="$(pwd)"

docker run \
-d --name=node-exporter \
--net=host \
--pid=host \
-v "/:/host:ro,rslave" \
quay.io/prometheus/node-exporter:latest \
--path.rootfs=/host
```

## 2. Systemctl
```sh
tar -zxvf -C node_exporter-1.7.0.darwin-amd64.tar.gz /opt/node-exporter

sudo ln -s /opt/node-exporter /opt/node-export/link

sudo echo "OPTION=" > /home/ec2-user/node-exporter/node-exporter.conf
sudo bash -c 'cat << EOF > /etc/systemd/system/node-exporter.service
[Unit]
Description=Node Exporter

[Service]
User=root
EnvironmentFile=/home/ec2-user/node-exporter/node-exporter.conf
ExecStart=/opt/node-exporter/link
EOF'

sudo systemctl daemon-reload
sudo systemctl start node-exporter.service
sudo systemctl status node-exporter
```