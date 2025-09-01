
# palu-core remote debugging
```python
cd /hanmail/working/palu
java -agentlib:jdwp=transport=dt_socket,server=y -jar app.jar
Listening for transport dt_socket at address: 37018
```

## Run Configuration 설정
- local IDE에서 설정
- Host: localhost
- Port: 37018
- Path: 원격 서버에 위치한 jar path
