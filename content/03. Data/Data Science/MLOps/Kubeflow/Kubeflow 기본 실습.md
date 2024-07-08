---
title: Kubeflow 기본 실습
date: 2024-05-26
draft: false
tags:
  - Kubeflow
complete: true
---
# Kubeflow Pipelines
## Concepts
- pipeline
- component
- experiment
- 
- 실행환경 & 코드 런타임 분리
	- 이식성
	- 반복가능성
	- 캡슐화


# Basic Pipeline
## KFP client Authentication
공식문서대로 kfp client를 사용하면 동작하지 않아서 아래 내용대로 한번 submit 해줘야한다.
```python
import kfp
import requests

KUBEFLOW_HOST = "http://istio-ingressgateway.istio-system.svc.cluster.local"
USERNAME = "user@example.com"
PASSWORD = "12341234"
NAMESPACE = "kubeflow" # 보통 kubeflow가 기본값입니다.

session = requests.Session()
response = session.get(KUBEFLOW_HOST)

headers = {
    "Content-Type": "application/x-www-form-urlencoded",
}

data = {"login": USERNAME, "password": PASSWORD}
session.post(response.url, headers=headers, data=data)
session_cookie = session.cookies.get_dict()["authservice_session"]

client = kfp.Client(
    host=f"{KUBEFLOW_HOST}/pipeline",
    namespace=f"{NAMESPACE}",
    cookies=f"authservice_session={session_cookie}",
)
```

# V1
https://kubeflow-pipelines.readthedocs.io/en/1.8.22/
## Hello World
https://kubeflow-pipelines.readthedocs.io/en/1.8.22/source/kfp.components.html#kfp.components.func_to_container_op
```python
from kfp import dsl, components

def hello_world_component():
    ret = f"Hello World!"
    print(ret)
    return ret


@dsl.pipeline(name="hello_pipeline", description="Hello World Pipeline!")
def hello_world_pipeline():
    hello_task = components.func_to_container_op(hello_world_component)
    _ = hello_task()


if __name__ == "__main__":
    client.create_run_from_pipeline_func(
        hello_world_pipeline, arguments={}, experiment_name="hello-world-experiment")
```

## Passing TEXT Data
```python
import kfp
from kfp.components import InputPath, InputTextFile, OutputPath, OutputTextFile
from kfp.components import func_to_container_op

@func_to_container_op
def repeat_line(line: str, output_text_path: OutputPath(str), count: int = 10):
    with open(output_text_path, 'w') as writer:
        for i in range(count):
            writer.write(line + '\n')
            
@func_to_container_op
def print_text(text_path: InputPath()): # The "text" input is untyped so that any data can be printed
    with open(text_path, 'r') as reader:
        for line in reader:
            print(line, end = '')
            
def print_repeating_lines_pipeline():
    repeat_lines_task = repeat_line(line='Hello', count=5000)
    print_text(repeat_lines_task.output)

client.create_run_from_pipeline_func(print_repeating_lines_pipeline, arguments={})
```

## Pass Numpy Data
```python
import kfp

def processdata(
    output_path: OutputPath(str),
    bucket: str,
    key: str,
):
    
    import boto3
    import pandas as pd
    import numpy as np
    from io import StringIO
    from sklearn.model_selection import train_test_split
    from pathlib import Path
    
    Path(output_path).mkdir(parents=True, exist_ok=True)
    s3 = boto3.client('s3')
    
    try:
        obj = s3.get_object(Bucket=bucket, Key=key)
        df = pd.read_csv(StringIO(obj['Body'].read().decode('utf-8')))
        
        if df is not None:
            print("====== CSV Data ======")
            print(df.head())
            
            print("====== PROCESS DATA ======")
            fish_input = df[['Weight', 'Length', 'Diagonal', 'Height', 'Width']].to_numpy()
            fish_target = df['Species'].to_numpy()
            print(fish_input[:5], fish_target[:5])
            
            print("====== SPLIT DATA ======")
            train_input, test_input, train_target, test_target = train_test_split(fish_input, fish_target, random_state=42)
            print(train_input.shape, test_input.shape)
            
            print("====== OUTPUT DATA ======")
            
            np.save(output_path + '/train_input.npy', train_input)
            #df.to_csv(output_path + '/fish.csv')
            
    except Exception as e:
        print(f"Error occurred: {e}")
        
processdata_op = kfp.components.create_component_from_func(
   processdata, base_image="python", packages_to_install=["boto3", "pandas", "scikit-learn", "numpy"]
)


def printtext(input_path: InputPath(str)): # The "text" input is untyped so that any data can be printed
    import numpy as np
    
    train_input = np.load(input_path + '/train_input.npy')
    print(train_input)

printtext_op = kfp.components.create_component_from_func(
   printtext, base_image="python", packages_to_install=["numpy"]
)
    
    
def print_dataframe_pipeline():
    BUCKET = 'bucket'
    KEY = 'sample-data/fish.csv'
    
    processdata_task = processdata_op(BUCKET, KEY)
    printtext_op(processdata_task.output)
    
client.create_run_from_pipeline_func(print_dataframe_pipeline, arguments={})
```

## SGDClassifier
```python
pip install pandas scikit-learn numpy matplotlib

# https://velog.io/@dbs991013/%ED%99%95%EB%A5%A0%EC%A0%81-%EA%B2%BD%EC%82%AC-%ED%95%98%EA%B0%95%EB%B2%95Stochastic-Gradient-Descent
# https://raw.githubusercontent.com/rickiepark/hg-mldl/master/fish.csv
# https://bit.ly/fish_csv_data
import pandas as pd

fish = pd.read_csv('data/fish.csv')
fish.head(5)


# input, target 데이터 나누기
fish_input = fish[['Weight', 'Length', 'Diagonal', 'Height', 'Width']].to_numpy()
fish_target = fish['Species'].to_numpy()
print(fish_input[:5], fish_target[:5])

# train set, test set 나누기
from sklearn.model_selection import train_test_split
train_input, test_input, train_target, test_target = train_test_split(fish_input, fish_target, random_state=42)
print(train_input.shape, test_input.shape)

# 표준화 전처리
from sklearn.preprocessing import StandardScaler
ss = StandardScaler()
ss.fit(train_input)
train_scaled = ss.transform(train_input)
test_scaled = ss.transform(test_input)
print(train_scaled[:5])


from sklearn.linear_model import SGDClassifier
sc = SGDClassifier(loss='log_loss', max_iter=10, random_state=42)
sc.fit(train_scaled, train_target)
print(sc.score(train_scaled, train_target))
print(sc.score(test_scaled, test_target))


sc.partial_fit(train_scaled, train_target) # 11에포크
print(sc.score(train_scaled, train_target))
print(sc.score(test_scaled, test_target))


# 에포크 수에 따른 점수 기록
import numpy as np
sc = SGDClassifier(loss='log_loss', random_state=42)
train_score = []
test_score = []
classes = np.unique(train_target)



for _ in range(0, 300):
  sc.partial_fit(train_scaled, train_target, classes=classes)
  train_score.append(sc.score(train_scaled, train_target))
  test_score.append(sc.score(test_scaled, test_target))



import matplotlib.pyplot as plt
plt.plot(train_score)
plt.plot(test_score)
plt.xlabel('epoch')
plt.ylabel('accuracy')
plt.show()



sc = SGDClassifier(loss='log_loss', max_iter=100, tol=None, random_state=42)
sc.fit(train_scaled, train_target)
print(sc.score(train_scaled, train_target))
print(sc.score(test_scaled, test_target))


sc = SGDClassifier(loss='hinge', max_iter=100, tol=None, random_state=42)
sc.fit(train_scaled, train_target)
print(sc.score(train_scaled, train_target))
print(sc.score(test_scaled, test_target))
```



### Get dataframe from S3
```python
import kfp

def s3_op(bucket_name, s3_file_key):
    import boto3
    import pandas as pd
    from io import StringIO
    
    s3 = boto3.client('s3')
    
    try:
        obj = s3.get_object(Bucket=bucket_name, Key=s3_file_key)
        df = pd.read_csv(StringIO(obj['Body'].read().decode('utf-8')))
        
        if df is not None:
            print("CSV Data:")
            print(df.head())
    except Exception as e:
        print(f"Error occurred: {e}")

s3_op = kfp.components.create_component_from_func(
   s3_op, base_image="python", packages_to_install=["boto3", "pandas"]
)


def s3_pipeline():
    BUCKET_NAME = 'my-bucket'
    S3_FILE_KEY = 'sample-data/fish.csv'
    
    s3_operation = s3_op(BUCKET_NAME, S3_FILE_KEY)

client.create_run_from_pipeline_func(
   s3_pipeline, arguments={}
)
```





---






# V2
### Hello World
```python
from kfp import compiler
from kfp import dsl

@dsl.component
def addition_component(num1: int, num2: int) -> int:
  return num1 + num2

@dsl.pipeline(name='addition-pipeline')
def my_pipeline(a: int=1, b: int=2, c: int = 10):
  add_task_1 = addition_component(num1=a, num2=b)
  add_task_2 = addition_component(num1=add_task_1.output, num2=c)

cmplr = compiler.Compiler()
cmplr.compile(my_pipeline, package_path='my_pipeline.yaml')

client.create_run_from_pipeline_package('my_pipeline.yaml',arguments={"a":1,"b":2})
>> [Experiment details](http://192.168.51.210/pipeline/#/experiments/details/7cf0d70b-7131-4e7b-8e03-109e9a81e18b).
>> [Run details](http://192.168.51.210/pipeline/#/runs/details/2b12da50-99bb-41c1-984d-2dea41813a5f).
>> RunPipelineResult(run_id=2b12da50-99bb-41c1-984d-2dea41813a5f)
```


### Hello World2
component → pipeline → compile → run
```python
import kfp
from kfp import dsl


@dsl.component
def hello_world_component(name: str) -> str:
    ret = f"Hello World! {name}"
    print(ret)
    return ret


@dsl.pipeline(name="hello_pipeline", description="Hello World Pipeline!")
def hello_world_pipeline(recipient: str) -> str:
    hello_task = hello_world_component(name=recipient)
    return hello_task.output


if __name__ == "__main__":
    kfp.compiler.Compiler().compile(hello_world_pipeline, "hello-world-pipeline.yaml")

	# Run Method 1: run with function
    client.create_run_from_pipeline_func(
        hello_world_pipeline, arguments={'recipient': 'John'}, experiment_name="hello-world-experiment")

	# Run Method 2: run with yaml
	run = client.create_run_from_pipeline_package(
		'hello-world-pipeline.yaml',
		arguments={
			'recipient': 'David',
		},
	)        
```

### Hello World Bash
```python
BASE_IMAGE = "library/bash:4.4.23"

@dsl.container_component
def echo_op():
    return dsl.ContainerSpec(image='alpine', command=['echo'], args=['Hello John And David'])
	#return dsl.ContainerSpec(image=BASE_IMAGE, command=['echo'], args=['Hello John And David']) # or using base_image


@dsl.pipeline(name="hello_world_bash_pipeline", description="A hello world pipeline.")
def hello_world_bash_pipeline():
    echo_task = echo_op()


if __name__ == "__main__":
    kfp.compiler.Compiler().compile(hello_world_bash_pipeline, "hello-world-bash.yaml")
    client.create_run_from_pipeline_func(
        hello_world_bash_pipeline,
        arguments={},
        experiment_name="hello-world-bash-experiment",
    )
```

## Text Data 넘겨받기
### Serial

![|700](https://i.imgur.com/TvZEmKY.png)


```python
import kfp
from kfp import components
from kfp import dsl
from kfp.v2.dsl import component


EXPERIMENT_NAME = 'Add-number-pipeline'        # Name of the experiment in the UI
BASE_IMAGE = "python:3.7"


@component(base_image=BASE_IMAGE)
def add_op(a: int, b: int) -> int:
    print(a, '+', b, '=', a + b)
    return a + b


@dsl.pipeline(
    name='Calculation pipeline',
    description='A toy pipeline that performs arithmetic calculations.'
)
def calc_pipeline(a: int, b: int) -> int:
    # Passing pipeline parameter and a constant value as operation arguments
    add_1_task = add_op(a=a, b=4)  # Returns a dsl.ContainerOp class instance.

    # You can create explicit dependency between the tasks using xyz_task.after(abc_task)
    add_2_task = add_op(a=a, b=b)

    add_3_task = add_op(a=add_1_task.output, b=add_2_task.output)
    
    return add_3_task.output


if __name__ == "__main__":
    # Specify pipeline argument values
    arguments = {'a': 7, 'b': 8}
    
    # Compile the pipeline
    kfp.compiler.Compiler().compile(calc_pipeline, "calc_pipeline.yaml")

    # Launch a pipeline run given the pipeline function definition
    run = client.create_run_from_pipeline_func(
        calc_pipeline,
        arguments=arguments,
        experiment_name=EXPERIMENT_NAME
    )
```

### Use OutputContainer
```python
import kfp
from kfp import dsl

EXPERIMENT_NAME = 'hello-ouput'

@dsl.container_component
def say_hello(name: str, greeting: dsl.OutputPath(str)):
    return dsl.ContainerSpec(
        image='alpine',
        command=[
            'sh', '-c', '''RESPONSE="Hello, $0!"\
                            && echo $RESPONSE\
                            && mkdir -p $(dirname $1)\
                            && echo $RESPONSE > $1
                            '''
        ],
        args=[name, greeting])

@dsl.pipeline
def hello_pipeline(person_to_greet: str) -> str:
    # greeting argument is provided automatically at runtime
    hello_task = say_hello(name=person_to_greet)
    return hello_task.outputs['greeting']

if __name__ == "__main__":

    arguments = {'person_to_greet': 'John'}
    
    run = client.create_run_from_pipeline_func(
        hello_pipeline,
        arguments=arguments,
        experiment_name=EXPERIMENT_NAME
    )
```


### GCS Download Pipeline
```python
import kfp
from kfp import dsl

EXPERIMENT_NAME = 'parallel'

@dsl.container_component
def gcs_download_op():
    return dsl.ContainerSpec(
        image='google/cloud-sdk:272.0.0',
        command=['sh', '-c'],
        args=['gsutil cat $0 | tee $1', 'gs://ml-pipeline-playground/shakespeare1.txt', 'results.txt'])

@dsl.pipeline(name="gcs_download_pipeline", description="A gcs download pipeline.")
def download_pipeline():
    download_task = gcs_download_op()

if __name__ == "__main__":
    client.create_run_from_pipeline_func(
        download_pipeline,
        experiment_name="gcs-download-experiment"
    )
```

### Parallel - passing raw texts
```python
import kfp
from kfp import dsl

EXPERIMENT_NAME = 'parallel'

@dsl.container_component
def gcs_download_op(url: str, myoutput: dsl.OutputPath(str)):
    return dsl.ContainerSpec(
        image='google/cloud-sdk:272.0.0',
        command=['sh', '-c', 'gsutil cat $0 | tee $1'],
        args=[url, myoutput])


@dsl.container_component
def echo2_op(text1:str , text2:str):
    return dsl.ContainerSpec(
        image='library/bash:4.4.23',
        command=['sh', '-c', 'echo "Text 1: $0"; echo "Text 2: $1"'],
        args=[text1, text2]
    )

@dsl.pipeline(name="gcs_download_pipeline")
def download_pipeline(url1: str, url2: str):
    download1_task = gcs_download_op(url=url1)
    download2_task = gcs_download_op(url=url2)
    
    echo_task = echo2_op(text1=download1_task.outputs['myoutput'],
                         text2=download2_task.outputs['myoutput'])

if __name__ == "__main__":
    
    arguments = {'url1': 'gs://ml-pipeline-playground/shakespeare1.txt',
                 'url2': 'gs://ml-pipeline-playground/shakespeare2.txt'}
    
    client.create_run_from_pipeline_func(
        download_pipeline,
        arguments=arguments,
        experiment_name="parallel-experiment"
    )
```


## Control Pipeline (If-Elif-Else)
```python
import kfp
from kfp import dsl

@dsl.component
def get_random_int_op(minimum: int, maximum: int) -> int:
    import random
    result = random.randint(minimum, maximum)
    print(result)
    return result


@dsl.component
def flip_coin_op() -> str:
    import random
    result = random.choice(['heads', 'tails'])
    print(result)
    return result

@dsl.component
def print_op(message: str):
    """Print a message."""
    print(message)
    
    
@dsl.pipeline(
    name='Conditional execution pipeline',
    description='Shows how to use dsl.Condition().'
)
def flipcoin_pipeline():
    flip = flip_coin_op()
    with dsl.If(flip.output == 'heads', 'head-condition'):
        random_num_head = get_random_int_op(minimum=0, maximum=9)
        with dsl.If(random_num_head.output > 5, 'head-condition;lrt 5'):
            print_op(message='heads and %s > 5!' % random_num_head.output)
        with dsl.Elif(random_num_head.output <= 5, 'head-condition;lst 5'):
            print_op(message='heads and %s <= 5!' % random_num_head.output)

    with dsl.If(flip.output == 'tails', 'tail-condition'):
        random_num_tail = get_random_int_op(minimum=10, maximum=19)
        with dsl.If(random_num_tail.output > 15, 'tail-condition; lrt 15'):
            print_op(message='tails and %s > 15!' % random_num_tail.output)
        with dsl.Elif(random_num_tail.output <= 15, 'tail-condition; lst 15'):
            print_op(message='tails and %s <= 15!' % random_num_tail.output)
            
if __name__ == '__main__':
    client.create_run_from_pipeline_func(
        flipcoin_pipeline,
        experiment_name="flip-coin-experiment"
    )
```

## Data 전달하기
![|550](https://i.imgur.com/msi0dIp.png)

bucket: mlpipeline
prefix: sample-data/Fish.csv
### Create & Consume data
```python
from kfp.dsl import InputPath, OutputPath

@dsl.component
def create_dataset(dataset_path: OutputPath('Dataset')):
    import json
    dataset = {'my_dataset': [[1, 2, 3], [4, 5, 6]]}
    with open(dataset_path, 'w') as f:
        json.dump(dataset, f)


@dsl.component
def consume_dataset(dataset: InputPath('Dataset')) -> str:
    return str(dataset)


@dsl.pipeline(name='datapasssing')
def my_pipeline():
    create_dataset_op = create_dataset()
    consume_dataset(dataset=create_dataset_op.outputs['dataset_path'])

if __name__ == '__main__':
    client.create_run_from_pipeline_func(
        my_pipeline,
        experiment_name="data-pass-experiment"
    )
```

### load data from minio
```python
@dsl.component(packages_to_install=['minio==7.1.14'])
def minio_list_objects(bucket: str, prefix: str):
    from minio import Minio
    from minio.error import S3Error
    
    
    try:
        minio_client = Minio('192.168.51.214:9000',
                   'minio',
                   'minio123',
                   secure=False)
        objects = minio_client.list_objects('mlpipeline', prefix='sample-data', recursive=True)
        for obj in objects:
            print(obj.object_name)

    except S3Error as s3_err:
        print(f'S3 Error occurred: {s3_err}.')


@dsl.pipeline(
   name='minio-pipeline',
   description='Pipeline that will list minio data'
)
def minio_pipeline(bucket: str, prefix: str):
    exists = minio_list_objects(bucket=bucket, prefix=prefix)
    

if __name__ == '__main__':
    
    arguments = {'bucket': 'mlpipeline', 'prefix': 'sample-data'}
    
    client.create_run_from_pipeline_func(
        minio_pipeline,
        arguments = arguments,
        experiment_name="minio-experiment")
```

### read data from minio as df
```python
@dsl.component(packages_to_install=['minio==7.1.14', 'pandas'])
def minio_read_object_pandas(bucket: str, prefix: str):
    import pandas as pd
    from io import BytesIO
    from minio import Minio
    
    try:
        minio_client = Minio('192.168.51.214:9000',
           'minio',
           'minio123',
           secure=False)
        
        response = minio_client.get_object(bucket, prefix)
        
        data = response.read()
        df = pd.read_csv(BytesIO(data))
    except Exception as e:
        print(f"Error occurred: {e}")

    if df is not None:
        print(df)3

@dsl.pipeline(
   name='minio-pipeline',
   description='Pipeline that will read minio data as dataframe')
def minio_pipeline(bucket: str, prefix: str):
    exists = minio_read_object_pandas(bucket=bucket, prefix=prefix)
    

if __name__ == '__main__':
    
    arguments = {'bucket': 'mlpipeline', 'prefix': 'sample-data/Fish.csv'}
    
    client.create_run_from_pipeline_func(
        minio_pipeline,
        arguments = arguments,
        experiment_name="minio-experiment")
```


## Use DB
pymysql
```python

```



# KServe
https://www.kubeflow.org/docs/external-add-ons/kserve/first_isvc_kserve/
https://kserve.github.io/website/0.8/get_started/first_isvc/#2-create-an-inferenceservice
## Install
```python
pip install kserve
```

```python
pip freeze | grep kf
kfp-pipeline-spec==0.1.16
kfp-server-api==1.8.5
kfserving==0.6.1
```

## Service Account
### eks
S3 Full Access로 Service Account 생성
```python
eksctl create iamserviceaccount --cluster=qa-cluster --name=kubeflow-user-example-com-sa --namespace=kubeflow-user-example-com --attach-policy-arn=arn:aws:iam::aws:policy/AmazonS3FullAccess --approve
```

```python
kubectl get sa -n kubeflow-user-example-com

NAME                           SECRETS   AGE
default                        0         7d14h
default-editor                 0         7d14h
default-viewer                 0         7d14h
kubeflow-user-example-com-sa   0         15h
```
→ AWS Cloudformation 들어가서 생성되었는지 확인.

### minio (on-prem)
https://kserve.github.io/website/0.7/modelserving/v1beta1/sklearn/v2/#testing-deployed-model
#### create-s3-secret.yaml
```python
apiVersion: v1
kind: Secret
metadata:
  name:  minio-secret
  namespace: kubeflow-user-example-com
  annotations:
     serving.kserve.io/s3-endpoint: minio-service.kubeflow:9000 # replace with your s3 endpoint e.g minio-service.kubeflow:9000
     serving.kserve.io/s3-usehttps: "0" # http를 사용하지 않음 (설치된 Minio 설정)
     serving.kserve.io/s3-region: "us-east-2"
     serving.kserve.io/s3-useanoncredential: "false" # omitting this is the same as false, if true will ignore provided credential and use anonymous credentials
type: Opaque
stringData: # use `stringData` for raw credential string or `data` for base64 encoded string
  AWS_ACCESS_KEY_ID: minio
  AWS_SECRET_ACCESS_KEY: minio123
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kfserving-sa    # ServiceAccount 명
  namespace: kubeflow-user-example-com    # ServiceAccount가 설치될 Namespace
secrets:
- name: minio-secret    # 이 ServiceAccount가 사용할 Secret (위에서 생성한 Secret)
```
---

```python
import requests

isvc_resp = KServe.get("sklearn-irisv2", namespace=namespace)
isvc_url = "http://sklearn-irisv2-predictor-default-00001.kubeflow-user-example-com.svc.cluster.local/v2/models/sklearn-irisv2/infer"

inference_input = {
  "inputs": [
    {
      "name": "input-0",
      "shape": [2, 4],
      "datatype": "FP32",
      "data": [
        [6.8, 2.8, 4.8, 1.4],
        [6.0, 3.4, 4.5, 1.6]
      ]
    }
  ]
}

response = requests.post(isvc_url, json=inference_input)
print(response.text)
```

## Init
```python
from kubernetes import client 
from kserve import KServeClient
from kserve import constants
from kserve import utils
from kserve import V1beta1InferenceService
from kserve import V1beta1InferenceServiceSpec
from kserve import V1beta1PredictorSpec
from kserve import V1beta1SKLearnSpec

namespace = utils.get_default_target_namespace()
namespace
```
## Run
make inference service
```python
name='sklearn-iris'
kserve_version='v1beta1'
api_version = constants.KSERVE_GROUP + '/' + kserve_version

isvc = V1beta1InferenceService(
	api_version=api_version,
	kind=constants.KSERVE_KIND,
	metadata=client.V1ObjectMeta(name=name, namespace=namespace, annotations={'sidecar.istio.io/inject':'false'}),
	spec=V1beta1InferenceServiceSpec(
		predictor=V1beta1PredictorSpec(
			service_account_name="kubeflow-user-example-com-sa", # 무조건 Service Account 명시 해줘야 S3 접근 가능
			#sklearn=(V1beta1SKLearnSpec(storage_uri="s3://ml-qa/kserve"))
            sklearn=(V1beta1SKLearnSpec(storage_uri="gs://kfserving-examples/models/sklearn/1.0/model"))
            # 위 모델 URI는 S3에 모델 이미지 넣어서 사용해도됨.
			)
		)
	)
```

init kserve client
```python
KServe = KServeClient()
KServe.create(isvc)

>>
>>
{'apiVersion': 'serving.kserve.io/v1beta1',
 'kind': 'InferenceService',
 'metadata': {'annotations': {'sidecar.istio.io/inject': 'false'},
  'creationTimestamp': '2024-06-10T10:11:51Z',
  'generation': 1,
  'managedFields': [{'apiVersion': 'serving.kserve.io/v1beta1',
    'fieldsType': 'FieldsV1',
    'fieldsV1': {'f:metadata': {'f:annotations': {'.': {},
       'f:sidecar.istio.io/inject': {}}},
     'f:spec': {'.': {},
      'f:predictor': {'.': {},
       'f:serviceAccountName': {},
       'f:sklearn': {'.': {}, 'f:name': {}, 'f:storageUri': {}}}}},
    'manager': 'OpenAPI-Generator',
    'operation': 'Update',
    'time': '2024-06-10T10:11:49Z'}],
  'name': 'sklearn-iris',
  'namespace': 'kubeflow-user-example-com',
  'resourceVersion': '30950755',
  'uid': 'c3b67aa5-a347-48e0-b0a2-a57c879ef331'},
 'spec': {'predictor': {'model': {'modelFormat': {'name': 'sklearn'},
    'name': '',
    'resources': {},
    'storageUri': 'gs://kfserving-examples/models/sklearn/1.0/model'},
   'serviceAccountName': 'kubeflow-user-example-com-sa'}}}
```

check serving pod
```python
KServe.get(name, namespace=namespace, watch=True, timeout_seconds=120)

NAME          READY      PREV    LATEST  URL
sklearn-iris  True          0       100  http://sklearn-iris.kubeflow-user-example-com.svc.cluster.local
```

make predictions
```python
import requests

isvc_resp = KServe.get(name, namespace=namespace)
isvc_url = isvc_resp['status']['address']['url']

print(isvc_url)

inference_input = {
  'instances': [
    [6.8,  2.8,  4.8,  1.4],
    [6.0,  3.4,  4.5,  1.6]
  ]
}

response = requests.post(isvc_url, json=inference_input)
print(response.text)

http://sklearn-iris.kubeflow-user-example-com.svc.cluster.local/v1/models/sklearn-iris:predict
{"predictions":[1,1]}
```

## Delete
```python
KServe.delete(name, namespace=namespace)
```
