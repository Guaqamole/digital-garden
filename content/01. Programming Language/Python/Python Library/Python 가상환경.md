---
title: Python 가상환경
date: 2024-05-27
draft: false
tags:
  - Python
complete: true
---
## Why Do We need Virtual Environment?
파이썬을 사용하다 보면 pip로 패키지를 설치하게 되는데 이 패키지들은 파이썬 설치 폴더(디렉터리)의 Lib/site-packages 안에 저장됩니다. 그래서 pip로 설치한 패키지는 모든 파이썬 스크립트에서 사용할 수 있게 됩니다. 평소에는 이런 방식이 큰 문제가 없지만 프로젝트를 여러 개 개발할 때는 패키지의 버전 문제가 발생합니다.

예를 들어 프로젝트 A에서는 패키지X 1.5를 사용해야 하고, 프로젝트 B에서는 패키지X 2.0을 사용해야 하는 경우가 생깁니다. 이 패키지X 1.5와 2.0은 호환이 되지 않는다면 개발하기가 상당히 불편해집니다.

![|750](https://i.imgur.com/IekoA7V.png)

이런 문제를 해결하기 위해 파이썬에서는 가상 환경(virtual environment)을 제공하는데, 가상 환경은 독립된 공간을 만들어주는 기능입니다. 가상 환경에서 pip로 패키지를 설치하면 가상 환경 폴더(디렉터리)의 Lib/site-packages 안에 패키지를 저장해줍니다.

즉, 프로젝트 A와 B 각각 가상 환경을 만들어서 프로젝트 A에는 패키지X 1.5를 설치하고, 프로젝트 B에는 패키지X 2.0을 설치할 수 있습니다. 이렇게 하면 파이썬 스크립트를 실행할 때도 현재 가상 환경에 설치된 패키지를 사용하므로 버전 문제가 발생하지 않습니다.

![|750](https://i.imgur.com/mbtqly7.png)

특히 가상 환경에는 파이썬 실행 파일(인터프리터) 자체도 포함되므로 각 가상 환경 별로 다른 버전의 파이썬 인터프리터가 들어갈 수 있습니다. 따라서 스크립트를 실행할 때는 원래 설치된 파이썬 인터프리터가 아닌 가상 환경 안의 파이썬 인터프리터를 사용합니다.

### Types of Python Virtual Environment
#### **비표준 라이브러리**

**1. virtualenv**
비표준 라이브러리 가운데, 가장 많이 사용하는 가상환경 라이브러리입니다. 표준 라이브러리는 아니지만 PyPA에서 공인된 라이브러리입니다. 아래에서 소개할 venv와 사용법이 유사하지만, Python 2, 3을 모두 지원한다는 장점 때문에 많이 사용합니다.

**2. pyenv**
파이썬 버전별로 환경 생성이 가능한 라이브러리입니다. 가상환경은 virtualenv 등을 통해 별도로 생성해주어야 합니다. 즉, 파이썬 버전 관리 기능을 제공해준다고 생각할 수 있습니다. Windows를 지원하지 않습니다.

**3. pyenv-virtualenv**
pyenv를 위한 플러그인입니다. pyenv와 virtualenv를 동시에 사용할 수 있도록 해줍니다.

**4. virtualenvwrapper**
virtualenv에 대한 익스텐션 모음입니다. virtualenv를 사용할 때 번거로웠던 부분들을 편하게 사용할 수 있도록 해줍니다.

**5. pyenv-virtualenvwrapper**
pyenv를 위한 플러그인입니다. pyenv와 virtualenvwrapper를 편하게 통합하여 사용할 수 있도록 해줍니다.

**6. pipenv**
Pipfile, pip, virtualenv를 하나의 커맨드로 실행할 수 있도록 하는 라이브러리입니다. pip 명령어 대신 pipenv 명령어로 모듈을 설치하면 루트 디렉토리에 가상환경이 생성됩니다. 실행할 때도 pipenv 명령어를 사용하여 가상환경에서 작업을 수행합니다.

#### **표준 라이브러리**

**1. pyvenv**
venv과 거의 유사한 가상환경 라이브러리입니다. Python 3.3에서 추가되었으나, Python 3.8에서 제거되었습니다. 아마도 pyenv와 이름이 유사하여 혼란을 피하고자 venv로 기능을 옮긴 후 삭제된 것이 아닌가 싶습니다.

**2. venv**
Python 3.3부터 사용가능한 가상환경 라이브러리입니다. 현재 기준으로 유일하게 표준 라이브러리에서 지원하는 가상환경 라이브러리입니다. 앞서 소개한 virtualenv의 경량화 모듈로 생각할 수 있으며, 실제로 두 라이브러리는 상당히 유사합니다. venv는 Python 2.x가 지원되지 않는 등, virtualenv보다 기능적으로는 조금 부족하지만, 별도 설치 없이 표준 라이브러리로 제공된다는 점에서 많이 사용합니다.

그 외에도 아나콘다를 통해 가상환경을 구축하는 등 여러 가지 방법이 있습니다. 일반적으로는 위에서 소개한 virtualenv이나 venv를 통해 원하는 작업을 수행하는 것이 가능하니, 추가로 필요한 내용은 직접 찾아보시면 좋겠습니다.

가상환경 종류에 관해서는 아래의 자료를 참고하였습니다. 더 자세한 내용이 궁금하시다면 영어 원문을 참고해주세요.

[https://stackoverflow.com/questions/41573587/what-is-the-difference-between-venv-pyvenv-pyenv-virtualenv-virtualenvwrappe](https://stackoverflow.com/questions/41573587/what-is-the-difference-between-venv-pyvenv-pyenv-virtualenv-virtualenvwrappe)


## How to Use?
### Create Venv
```python
export VENV_BASE='/home/ec2-user/testwork'
export VENV_NAME='dc-fs-rcmd-api-test-v2'
python3 -m venv $VENV_BASE/$VENV_NAME

ls $VENV_BASE/$VENV_NAME
>> bin  include  lib  lib64  pyvenv.cfg
```

### Activate Venv
```python
cd $VENV_BASE/$VENV_NAME
source bin/activate
```

### Deactivate Venv
```python
deactivate
```

### Install Modules
```python
cd $VENV_BASE/$VENV_NAME

source bin/activate
python3 -m pip install --upgrade pip

# pip package 조회
pip index versions locust
locust (2.17.0)
Available versions: 2.17.0, 2.16.1, 2.16.0, 2.15.1 ...


sh -c 'cat << EOF >> requirements.txt
locust==2.17.0
EOF'

pip install -r requirements.txt

# Uninstall
pip uninstall -r requirements.txt
```

### Export My Modules
pip freeze로 패키지 목록과 버전 정보를 requirements.txt 파일에 저장합니다(git 등으로 버전 관리를 할 때 저장소에 설치된 패키지를 모두 추가하지 않고, requirements.txt 파일만 관리하면 됩니다).
```python
cd $VENV_BASE/$VENV_NAME
source bin/activate

pip freeze > requirements.txt
```


### Conda vs Venv
파이썬 프로젝트에서 Conda와 Venv는 두 가장 인기 있는 가상환경 관리 도구입니다. 각각의 특징을 이해하고, 프로젝트의 요구사항에 맞게 선택하는 것이 중요합니다.

### **기능적 차이점**
1. **설치 및 관리**:
    - **Conda**: 데이터 과학 및 머신러닝 프로젝트에 최적화된 다양한 패키지와 함께 제공됩니다. 복잡한 의존성 관리와 다양한 패키지 설치를 쉽게 처리할 수 있습니다.
    - **Venv**: 파이썬 3.3 이상 버전에 포함된 경량화된 도구로, 필요한 기본적인 가상환경 기능을 제공합니다.
2. **환경 구성**:
    - **Conda**: 파이썬과 다양한 프로그래밍 언어를 지원하며, 특히 Anaconda 배포판에 포함된 많은 과학 계산 관련 패키지들과의 호환성이 뛰어납니다.
    - **Venv**: 오직 파이썬 환경에 초점을 맞추고 있어, 순수 파이썬 프로젝트에 적합합니다.

### **추천**
- **Conda**:
    - 복잡한 데이터 과학 프로젝트나 다양한 언어를 사용하는 프로젝트에 추천됩니다.
    - Conda를 통해 라이브러리 간의 복잡한 의존성을 관리하고, 특히 과학 계산이나 데이터 분석에 필요한 패키지를 쉽게 설치할 수 있습니다.
- **Venv**:
    - 기본적인 파이썬 개발 환경이 필요한 경우에 적합합니다.
    - 가벼운 프로젝트나 파이썬 학습, 작은 규모의 웹 애플리케이션 개발에 주로 사용됩니다.

### **결론**
- **Conda**: 데이터 과학, 머신러닝, 복잡한 의존성을 가진 프로젝트에 적합
- **Venv**: 일반적인 파이썬 개발에 적합, 가볍고 간단한 프로젝트에 추천