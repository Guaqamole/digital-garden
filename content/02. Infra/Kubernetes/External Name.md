---
title: External Name
date: 2024-05-28
draft: false
tags:
  - Kubernetes
  - Ingress
complete: true
---
## Example
AS-IS
![](https://i.imgur.com/c0oi2zm.png)

TO-BE
![](https://i.imgur.com/i5FY7Pl.png)



### deployment
```python
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ade
  namespace: namespace-a
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ade
  template:
    metadata:
      labels:
        app: ade
    spec:
      containers:
      - name: ade
        image: nginxdemos/nginx-hello:plain-text
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: ade-svc
  namespace: namespace-a
spec:
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
    name: http
  selector:
    app: ade
```


### external name
```python
apiVersion: v1
kind: Service
metadata:
  annotations:
  name: my-ade-svc
spec:
  type: ExternalName
  # {Service Name}.{Namespace}.svc.cluster.local 형식으로 작성
  externalName: ade-svc.namespace-a.svc.cluster.local
```

### ingress
```python
apiVersion: networking.k8s.io/v1  
kind: Ingress  
metadata:  
  name: cafe-ingress-uri  
  annotations:  
    cert-manager.io/cluster-issuer: "letsencrypt"  
    cert-manager.io/acme-challenge-type: http01  
spec:  
  ingressClassName: nginx  
  tls:  
  - hosts:  
    - kong-lab.site  
    secretName: cafe-secret  
  rules:  
  - host: kong-lab.site  
    http:  
      paths:  
      - path: /tea  
        pathType: Prefix  
        backend:  
          service:  
            name: tea-svc  
            port:  
              number: 80  
      - path: /coffee  
        pathType: Prefix  
        backend:  
          service:  
            name: coffee-svc  
            port:  
              number: 80  
      - path: /ade  
        pathType: Prefix  
        backend:  
          service:
            # External Name Service의 이름을 입력합니다.  
            name: my-ade-svc  
            port:  
              number: 80
```