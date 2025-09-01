
## DSAT Server
### Install
```python
git clone git@github.kakaocorp.com:sss/dsat-app-server.git

pyenv virtualenv 3.8.18 dsat-app
cd dsat-app-server
pyenv local dsat-app # 현재 폴더에 dsat-app 가상환경을 적용
pyenv versions
* dsat-app --> /Users/john/.pyenv/versions/3.8.18/envs/dsat-app

echo $VIRTUAL_ENV
/Users/john/workspace/dsat-app-server/.venv

pycharm ./
```

### Setup
```python
pip install --upgrade pip

# pip으로 python package 설치 (두개 다 설치해줘야 한다)
pip install -r requirements/dev.txt
pip install -r requirements/prod.txt
```

### LOCAL
```python
./bin/migrate.sh migrate dev
./bin/runserver.sh dev
```

### Role
django admin 사용자 권한 변경 꼭 해줘야한다. 방문자 → 개발자

### Error
#### django-extensions
```python
./bin/migrate.sh migrate dev
ModuleNotFoundError: No module named 'django_extensions'

pip install django-extensions
```

#### kafka-python
```python
./bin/migrate.sh migrate dev

return '<SimpleProducer batch=%s>' % self.async ^ 
SyntaxError: invalid syntax

pip install kafka-python
```

## DSAT Front
### install
```python
brew install nvm
mkdir ~/.nvm

nvm install 16
nvm use 16
npm install -g yarn

git clone git@github.kakaocorp.com:sss/dsat-app-front.git

cd dsat-app-front
yarn install
```

### config
```python
vi config/config.local.js
export default {
  // config.js < config.stage.js | config.prod.js < config.local.js
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV || 'dev',
    'process.env.UMI_APP_DSAT_SERVER': 'http://localhost:8000',
    'process.env.UMI_APP_DSAT_HTTPS_SERVER': 'http://localhost:8000',
    'process.env.UMI_APP_PROXY_SERVER': 'http://localhost:8000',
    'process.env.UMI_APP_MEDIA_SERVER': 'http://localhost:8000',
    'process.env.UMI_APP_ARBITER_SERVER': 'http://arbiter-server-develop.dev.9rum.cc',
    'process.env.UMI_APP_ELASTIC_SERVER':
      'http://localhost:8000/proxy/server/elastic',
    'process.env.UMI_CHROME_WEB_STORE':
      'https://chrome.google.com/webstore/detail/dsat/honnhgadcbjocgfniphgpcckcimeamlf',
  },
}

yarn start
```

### role
- extension 권한 허용

## DSAT Extension
```python
yarn config set "@kos:registry" https://npm-kos.onkakao.net

git clone git@github.kakaocorp.com:sss/dsat-app-extension.git
cd dsat-app-extension
nvm use 16
yarn install
yarn start
```


### error
```python
yarn install

warning webpack-dev-server > webpack-dev-middleware > memfs@3.6.0: this will be v4
[3/5] 🚚  Fetching packages...
error eslint-plugin-tailwindcss@3.17.5: The engine "node" is incompatible with this module. Expected version ">=18.12.0". Got "16.20.2"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.

yarn config set ignore-engines true
```





# 개선사항
## requirements.txt
- django, kafka 추가

