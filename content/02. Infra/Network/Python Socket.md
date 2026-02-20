---
title: Python Socket
date: 2023-12-19
draft: false
tags:
  - Network
  - Socket
  - Python
complete: true
---
이번에는 Python의 Socket을 활용해서 HTTP Raw Msg를 확인하는 방법에 대해서 다룹니다.
## 1. HTTP 통신
예전부터 requests 패키지등을 파내면서 결국 HTTP 통신은 아래처럼 흘러가게 됩니다.

![image.png](https://devocean.sk.com/editorImg/2023/9/29/ced730d9daa28018d76f78a282fbc92dd17c502d22c46ab2c23c6e8f4ab98185)  

예전 Requests Library를 통해서 Requests 패키지 내부적으로 Socket을 이용해서 HTTP Msg를 보내는것을 알아 보았습니다. ([링크](https://devocean.sk.com/experts/techBoardDetail.do?ID=164139))
이때 Request HTTP Msg를 수령하는 부분은 대부분 웹프래임워크(Flask, FastAPI, Django...)가 담당하고 있습니다.
때문에 서버가 받아들인 Raw HTTP Msg를 확인하기 어려운 부분이 있습니다.
이때 위 구조를 알고 있으면 손쉽게 Raw HTTP Msg를 확인할 수 있습니다.

  

## 2. Python의 Socket
Python의 경우 socket Library를 통해서 Raw Level 통신을 지원합니다.
이때 무한루프를 돌면서 받아들이는 모든 I/O를 받는 서버를 아래처럼 구축할 수 있습니다.

```python
import socket

host = ''
port = 22220
backlog = 10
size = 2048*2
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host,port))
s.listen(backlog)
while 1:
    client, address = s.accept()    
    data = client.recv(size)    
    if data:
        #Data를 Byte String으로 들어오기 때문에
        #내부에서 받아들인 문자를 Decoding
        ret = data.decode()
        for i in ret.split(r"\r\n"):
            print(i)        
        client.send(data)
    print("End Of HTTP\r\n")
    client.close()
```

위 코드를 실행하고, 웹브라우저를 통해서 http://loaclhost:22220으로 접근할 경우

  

아래처럼 웹브라우저가 어떤 Request Msg를 보냈는지 확인할 수 있습니다.
![image.png](https://devocean.sk.com/editorImg/2023/9/29/6f8c7e5bfd546944c3d74cc5d65933f82447d8791612492f63c7ad2534f3b1c0)  

이제 위 코드를 사용해서 Python Requests와 Java의 Requests 패키지를 비교해 보겠습니다.

  

## 3. Python을 활용해서 request Post Msg보내보기

requests 패키지를 사용할 때 Post method의 경우 다양한 Data를 Body에 담아서 보낼 수 있습니다.

이때 Python의 requests package를 잠시 살펴볼가요?
[출처](https://requests.readthedocs.io/en/latest/api/#requests.get)

```python
def post(url, data=None, json=None, **kwargs):
    r"""Sends a POST request.

    :param url: URL for the new :class:`Request` object.
    :param data: (optional) Dictionary, list of tuples, bytes, or file-like
        object to send in the body of the :class:`Request`.
    :param json: (optional) A JSON serializable Python object to send in the body of the :class:`Request`.
    :param \*\*kwargs: Optional arguments that ``request`` takes.
    :return: :class:`Response <Response>` object
    :rtype: requests.Response
    """

    return request("post", url, data=data, json=json, **kwargs)
```

실제 HTTP Msg를 보지 않았던 사용자는 여기서 data와 json이 도대체 어떤 차이인지 알기 어렵습니다.
결국 둘다 data를 body에 담아서 보내는구나 정도만 알 수 있습니다.
이제 그러면 아래 두 코드를 통해서 HTTP Msg가 어떻게 만들어지는지 볼까요?
```python
import requests
import json

my_dt = {
        "python" : "easy",
        "java" : "hard"        
    }
requests.post("http://localhost:22220", data = my_dt)
requests.post("http://localhost:22220", json = my_dt)
```

![image.png](https://devocean.sk.com/editorImg/2023/9/30/4d646603b58fe06dcc07eda771d5e32481aba982c79f18f86c873ca30369cd0b)  

결과를 보면, data에 첨부했을 경우 query string형태로 key1=value1&key2=value2 형태로 serialize 되어 전달되는 것을 볼 수 있습니다.

반면 json으로 설정할 경우 body에서 json 형태를 유지하면서 데이터를 보내는것을 볼 수 있으며

Content-Type header가 application/json으로 변경되는것을 볼 수가 있습니다.

그럼 이때 data와 json두가지를 모두 설정할 경우도 한번 살펴보겠습니다.

```python
import requests
import json

my_dt1 = {
        "python" : "easy",
        "java" : "hard"        
    }
my_dt2 = {
        "javascript" : "easy",
        "typescript" : "hard"        
    }
requests.post("http://localhost:22220", data = my_dt1, json = my_dt2)
```

![image.png](https://devocean.sk.com/editorImg/2023/9/30/25d8b5c840fc91b90164c34772c992abf5b9813c731757c09cd6684e8581a49d)  

이 경우 json에 설정된 내용은 무시가 되고, data로 설정된 parameter만 살아남는것을 볼 수 있습니다.

마지막으로 requests package에서 params라는 매개변수를 지원합니다.

결국 params, data, json 모두 data를 캐리할 수 있는것을 예상할 수 있으니

생성되는 HTTP Msg가 다르기 때문에 서버에서 어떤 HTTP Msg가 도착하는지 알아야 합니다.

```python
import requests
import json

my_dt = {
        "python" : "easy",
        "java" : "hard"        
    }
requests.post("http://localhost:22220", params = my_dt)
```

![image.png](https://devocean.sk.com/editorImg/2023/9/30/8b8e658d3aef8cfa4f2ef494a1d3fabb9691701ad0240272282baffa1ed2e8a9)  

확인을 해 보면 위와같이 body에 data가 있는것이 아니라 url부분에 query string으로 data가 추가되는것을 볼 수 있습니다.

(원래 get만 이런식으로 data를 보내지만, post도 위와같이 params를 추가하여 보내는것이 가능 합니다)

  

## 4. Java를 사용해서 request Post Msg보내보기

다양한 언어로 만들어진 Client를 운용하기 위해서는 HTTP Msg를 동일하게 보낸주는것이 중요합니다.
위와같이 HTTP Msg를 확인할 수 있게되면 다양한 언어에서 requests를 테스트하기 용이해집니다.

모든 언어에서 Requests 패키지가 있지 않기때문에
필요한 언어에서 필요한 패키지를 찾아서 테스트를 해야 할탠데요
이때 parameter마다 어떻게 HTTP Msg가 바뀌는지 손쉽게 확인할 수 있게 됩니다.
아래는 Java의 apache http를 사용해서 request를 보내고
그 결과를 Raw HTTP Msg로 확인한 모습 입니다.

```java
package org.example;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;


import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        CloseableHttpClient client = HttpClients.createDefault();
        ArrayList<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("Python", "easy"));
        params.add(new BasicNameValuePair("Java", "hard"));
        try {
            HttpPost post = new HttpPost("http://localhost:22220");
            post.setHeader("Content-Type", "application/x-www-form-urlencoded");
            post.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
            HttpResponse response = client.execute(post);
        } catch (Exception e) {
            System.err.println(e);
        }
    }
}
```

![image.png](https://devocean.sk.com/editorImg/2023/10/4/d77653d328d4456c63f39826242e59e2d51a132962880a0651892971009283a9)