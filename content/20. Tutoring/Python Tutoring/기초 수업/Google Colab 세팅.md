## 1. Colab 에 구글 드라이브 연동하기

```
from google.colab import drive
from os.path import join
ROOT = "/content/drive"
print(ROOT)
drive.mount(ROOT)
```

![](https://blog.kakaocdn.net/dn/kJNAz/btrcYa5xouy/r8ETjaOkFk3qJHEhTjnxyk/img.png)

- 파랑색 링크에 들어가셔서 인증 코드를 복사하여 아래에 넣어주세요. (아주 간단하죠?)

## 2. Github 레퍼지토리를 clone 할 Google Drive 경로 찾기

![](https://blog.kakaocdn.net/dn/EEJsi/btrdcPrdp1e/dWL19TuBSHXFXeCYJ4MRg0/img.png)

![](https://blog.kakaocdn.net/dn/I2Obg/btrcX9S5pHK/lCnALvIqro1LOeKWLqy1lK/img.png)

- 저는 amazon-fashion-data-description-generation 이라는 Github 레퍼지토리를 Google Drive 속 'Github' 폴더 아래에amazon-fashion-data-description-generation 폴더 아래에 clone 해오려합니다. (레퍼지토리별로 예쁘게 정리하고싶어서!)

```
1. amazon-fashion-data-description-generation 폴더 생성
2. amazon-fashion-data-description-generation 폴더 우클릭 > copy path
```

- 위 방식으로 경로를 복사해둡니다.

## 3. Github Access Token 생성하기

Github와 연동을 위해서는 기존방식(비밀번호인증) 대신 Github Access Token을 생성해야합니다.

아래 순서를 따라주세요.

```
1. 깃허브 오른쪽 상단 setting 클릭
2. Developer settings 클릭
3. Personal access tokens 클릭
4. repo 선택지 클릭하고, Github Access Token 생성
5. Github Access Token 복사 (메모장에 기록해두는 것이 좋음)
```

![](https://blog.kakaocdn.net/dn/qacpN/btrc8h9PZPN/E80xXefU4kqQUDKDfAXSkk/img.png)

![](https://blog.kakaocdn.net/dn/cuDESp/btrc1wHgUvj/LsUFti3PdK3FvF0wOBKwFK/img.png)

```python
from os.path import join  

MY_GOOGLE_DRIVE_PATH = '/content/drive/MyDrive/Github/colab

GIT_USERNAME = "guaqamole" 

GIT_TOKEN = "[복붙한 인증코드 여기에]"  

GIT_REPOSITORY = "colab" 

# 이젠 입력 불필요
PROJECT_PATH = join(join(ROOT, MY_GOOGLE_DRIVE_PATH),GIT_REPOSITORY)

# It's good to print out the value if you are not sure 
print("PROJECT_PATH: ", PROJECT_PATH)   

# In case we haven't created the folder already; we will create a folder in the project path 
!mkdir "{PROJECT_PATH}"    

#GIT_PATH = "https://{GIT_TOKEN}@github.com/{GIT_USERNAME}/{GIT_REPOSITORY}.git" this return 400 Bad Request for me
GIT_PATH = "https://" + GIT_TOKEN + "@github.com/" + GIT_USERNAME + "/" + GIT_REPOSITORY + ".git"
print("GIT_PATH: ", GIT_PATH)
```

- GIT_TOKEN 부분에 복붙한 인증코드를 붙여줍니다.
- MY_GOOGLE_DRIVE_PATH에는 2번과정에서 복사한 경로를 붙여넣기 해줍니다.
- GIT_REPOSITORY 부분도 여러분의 상황에 맞게 바꾸는 것 잊지마세요!

## 4. Git clone 진행

```python
%cd "{PROJECT_PATH}"
!git clone "{GIT_PATH}" .
```

위 과정을 잘 마쳤다면 clone이 잘 되는 걸 확인하실 수 있습니다.

![](https://blog.kakaocdn.net/dn/cUN9d1/btrc4FjoxhL/HzTgZ50pUkf6ZhFqxnWvr1/img.png)

- !git clone "{GIT_PATH}" 다음에 .을 붙여주는 이유는 clone을 해올 때, 폴더를 달고 오지 않게 하기 위함입니다.
- . 을 붙이지 않으면 amazon-fashion-data-description-generation 경로 아래에, clone 해오려는 레퍼지토리의 이름인 amazon-fashion-data-description-generation 폴더가 생성되고 그 안에 내용이 들어갑니다.  
    (취향에 맞게 선택해주세요!)

---

## [추가] Google Drive에서 git pull, commit, push 하기

- 구글 드라이브에서 내용을 수정하고 github 레퍼지토리에 반영하려면 아래 과정이 필요합니다.

```python
!git config --global user.email hiavokado@gmail.com
!git config --global user.name guaqamole
```

### 1) git pull

```python
!git pull
```

### 2)git add, git commit

```python
!git add . 
!git commit -m "update from g-drive" #커밋메세지를 자유롭게 적어줍니다.
```

### 3)git push

```python
!git push
```