## Summary
- arbiter server → backend Proxy API
	- from
		- stormbreaker
		- hure
		- heimdall
		- …
	- using
		- dsid
		- gsid
		- dsid & gsid
	- to
		- kafka topics
			- arbiter blog
			- arbiter-cafe
## Arbiter Server
-> pyenv local
-> pyenv virtualenv
-> brew install sqlite3
-> migrate.sh loaddata dev X -> stage

sqlite3.OperationalError: no such table: auth_user
django.db.utils.OperationalError: Problem installing fixture '/Users/john/workspace/arbiter-server/samples/dev/auth.json': Could not load auth.User(pk=1): no such table: auth_user

sqlite3.OperationalError: no such table: common_collection
django.db.utils.OperationalError: Problem installing fixture '/Users/john/workspace/arbiter-server/samples/dev/common.json': Could not load common.Collection(pk=1): no such table: common_collection

sqlite3.OperationalError: no such table: entity_job
django.db.utils.OperationalError: Problem installing fixture '/Users/john/workspace/arbiter-server/samples/dev/entity.json': Could not load entity.Job(pk=6): no such table: entity_job

sqlite3.OperationalError: no such table: external_emgdel
django.db.utils.OperationalError: Problem installing fixture '/Users/john/workspace/arbiter-server/samples/dev/external.json': Could not load external.Emgdel(pk=1): no such table: external_emgdel


-> python ${APP_DIR}/manage.py loaddata samples/$1/auth.json --settings=djangoserver.settings.$1


sample/dev/auth.json → user 추가
hellomis 라는 카카오 ldap 계정 인증하는 라이브러리

start
```python
cd arbiter-sever
./bin/runserver.sh dev
```
## Arbiter Stream
```python
git clone git@github.kakaocorp.com:sss/arbiter-stream.git
```

compile
```python
./compile.sh -Pdev
```
→ 이렇게하면안된다. intelliJ 에서 실행하자.

intelliJ
```python
Lifecycle
clean
compile
package
```

Run Configurations / package
```python
package -f pom.xml -DskipTests
```

after package
```python
ls target
arbiter-stream-1.0.0-SNAPSHOT-jar-with-dependencies.jar
arbiter-stream-1.0.0-SNAPSHOT.jar
```

### error
```python
./compile.sh -Pdev -e
...
java.lang.UnsatisfiedLinkError: Native library libswoval-files0.dylib (/native/i686/libswoval-files0.dylib) can't be loaded.
```

https://github.com/swoval/swoval/issues/141
→ arm 말고 x86_64 버전 JDK로 변경