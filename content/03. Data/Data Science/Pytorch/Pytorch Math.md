---
title: Pytorch Math
date: 2025-09-23
draft: false
tags:
  - Pytorch
  - DeepLearning
  - Math
complete: true
banner: /_assets/_img/_banners/nebula.jpg
---
## Linear Algebra

### Vector, dot product
![](https://i.imgur.com/D4DpcJh.png)

`@` 연산자를 이용해 `vector1`, `vector2` 두 벡터의 곱을 구해봅시다.

```python
import torch

# 벡터 정의
vector1 = torch.tensor([1, 2, 3])
vector2 = torch.tensor([4, 5, 6])

# 벡터의 내적 계산
dot_product = vector1 @ vector2
# 또는 torch.dot(vector1, vector2) 로 내적을 계산할 수 있다.

print("벡터의 내적 결과:", dot_product)
```

### Matrix, multiplication
![](https://i.imgur.com/TaYeY9L.png)

`matmul`함수를 이용해 `matrix1`과 `matrix2` 두 행렬 곱을 구해 봅시다.
```python
# 두 개의 2x2 행렬을 정의합니다.
matrix1 = torch.tensor([[1, 2], [3, 4]])
matrix2 = torch.tensor([[5, 6], [7, 8]])

# 행렬 곱셈 연산을 수행합니다.
mul_matrix = torch.matmul(matrix1, matrix2)

print("행렬 matrix1:\n", matrix1)
print("행렬 matrix2:\n", matrix2)
print("matrix1와 matrix2의 곱 mul_matrix:\n", mul_matrix)
```

### Determinant
![](https://i.imgur.com/i1kblXK.png)

`torch.linalg.det`함수를 이용해 `matrix_A`의 행렬식을 계산해 봅시다.
```python
matrix_A = torch.tensor([[4, 7], [2, 6]], dtype=torch.float32)

# 행렬식 계산
det_A = torch.linalg.det(matrix_A)

print(f"A 행렬의 행렬식: {det_A}")
print('직접 계산: ', 4 * 6 - 7 * 2)

A 행렬의 행렬식: 10.000001907348633
직접 계산:  10
```

- 행렬식이 0인 경우
```python
# 3x3 행렬 정의
matrix_B = torch.tensor(
    [[1, 2, 3], 
      [4, 5, 6], 
      [7, 8, 9]], dtype=torch.float32)

# 행렬식 계산
det_B = torch.linalg.det(matrix_B)
print(f"B 행렬의 행렬식: {det_B}")

B 행렬의 행렬식: 0.0
```

### Inverse Matrix
![](https://i.imgur.com/CHPwoek.png)

`torch.linalg.inv`함수를 이용해 `matrix_A`의 역행렬을 계산해 봅시다.

```python
# 가역적인 2x2 행렬 정의
matrix_A = torch.tensor([[4.0, 7.0], [2.0, 6.0]])

# 역행렬 계산
matrix_inv = torch.linalg.inv(matrix_A)

print("matrix_A 행렬:\n", matrix_A)
print("matrix_A의 역행렬:\n", matrix_inv)

matrix_A 행렬:
 tensor([[4., 7.],
        [2., 6.]])
matrix_A의 역행렬:
 tensor([[ 0.6000, -0.7000],
        [-0.2000,  0.4000]])
```

$$ 𝐴×𝐴^{−1}=𝐼 $$
식이 맞는지 확인해 봅시다.

```python
# A x A-1 가 항등 행렬인지 확인해 봅시다.
torch.matmul(matrix_A, matrix_inv)

tensor([[ 1.0000e+00,  2.3842e-07],
        [-1.1921e-07,  1.0000e+00]])
```


$$ 𝐴^{-1}×𝐴=𝐼 $$
식이 맞는지 확인해 봅시다.

```python
# A-1 x A 가 항등 행렬인지 확인해 봅시다.
torch.matmul(matrix_inv, matrix_A)

tensor([[ 1.0000e+00,  4.7684e-07],
        [-1.1921e-07,  1.0000e+00]])
```

행렬식이 0일때, 역행렬 연산
```python
matrix = torch.tensor(
    [[1, 2, 3], 
      [4, 5, 6], 
      [7, 8, 9]], dtype=torch.float32)

det = torch.linalg.det(matrix)
print(f"행렬의 행렬식: {det}")

행렬의 행렬식: 0.0


try:
    torch.linalg.inv(matrix)
except Exception as e:
    print(e) # 행렬식이 0일때, 역행렬을 구하면 에러가 발생하는 것을 확인할 수 있음.
    
linalg.inv: The diagonal element 3 is zero, the inversion could not be completed because the input matrix is singular.
```

### Trace
![](https://i.imgur.com/8o0w8z0.png)

`torch.trace`함수를 이용해 행렬 A의 트레이스를 계산해 봅시다.
```python
# 정사각 행렬 정의
A = torch.tensor([[1, 2, 3],
                  [4, 5, 6],
                  [7, 8, 9]], dtype=torch.float)

# 행렬의 트레이스 계산
trace_A = torch.trace(A)
print(f"A 행렬의 추적: {trace_A}")

A 행렬의 추적: 15.0
```

### Eigenvalues & Eigenvectors
![](https://i.imgur.com/94S5uc2.png)

![](https://i.imgur.com/PotS2Md.png)

```python
import torch

# 행렬 A 정의
A = torch.tensor([[4.0, 1.0], [2.0, 3.0]])

# 고유값과 고유벡터 계산
eigenvalues, eigenvectors = torch.linalg.eig(A)

print("행렬 A의 고유값:")
print(eigenvalues)
print("행렬 A의 고유벡터:")
print(eigenvectors)
```

### SVD, Singular Value Decomposition
![](https://i.imgur.com/lU6gEPp.png)

```python
A = torch.tensor([[3.0, 2.0, 2.0], [2.0, 3.0, -2.0]], dtype=torch.float32)

# A텐서에서 특이값 분해를 해 봅시다.
U, S, V = torch.linalg.svd(A, full_matrices=False)

print("행렬 A:\n", A)
print("U 행렬:\n", U)
print("특이값(Σ) 대각 행렬:\n", torch.diag(S))
print("V^T 행렬:\n", V.transpose(0, 1))

행렬 A:
 tensor([[ 3.,  2.,  2.],
        [ 2.,  3., -2.]])
U 행렬:
 tensor([[ 0.7071, -0.7071],
        [ 0.7071,  0.7071]])
특이값(Σ) 대각 행렬:
 tensor([[5.0000, 0.0000],
        [0.0000, 3.0000]])
V^T 행렬:
 tensor([[ 7.0711e-01, -2.3570e-01],
        [ 7.0711e-01,  2.3570e-01],
        [ 2.9802e-08, -9.4281e-01]])
```


### 연습문제

$$ 
\begin{equation}
  A = \begin{bmatrix}
  1 & 2\\
  3 & 4
  \end{bmatrix}, \ \ 
  B = \begin{bmatrix}
  5 & 6\\
  7 & 8
  \end{bmatrix}
\end{equation}
$$

일 떄,

$$ 𝐴𝐵^{−1} $$

####  을 계산해 봅시다.

```python
A = torch.tensor([[1., 2.], [3., 4.]])
B = torch.tensor([[5., 6.], [7., 8.]])

# B의 역행렬
B_inv = torch.inverse(B)

# A * B^{-1}
answer = A @ B_inv
print(answer)
```

#### 특이값 분해를 이용하여 U, S, Vt 를 구해봅시다.
```python
A = torch.tensor([[4.0, 11.0, 14.0],
                  [8.0, 7.0, -2.0]])

U, S, Vt = torch.linalg.svd(A, full_matrices=False)

print('U: \n', U)
print('S: \n', S)
print('Vt: \n', Vt)

U: 
 tensor([[ 0.9487, -0.3162],
        [ 0.3162,  0.9487]])
S: 
 tensor([18.9737,  9.4868])
Vt: 
 tensor([[ 0.3333,  0.6667,  0.6667],
        [ 0.6667,  0.3333, -0.6667]])
```

## Differential Calculus

### 미분
![](https://i.imgur.com/GA1SQgR.png)

![](https://i.imgur.com/LQNQMKs.png)

![](https://i.imgur.com/on608Z8.png)


위 함수를 x에 대해 미분하는 함수를 만들어 봅시다.
$$𝑓(𝑥)=𝑥^{2}$$ 
```python
def f(x):
    return x ** 2

# 미분 함수
def derivative(f, x, dx=1e-6):
    return (f(x + dx) - f(x)) / dx

# x = 2에서 f(x) = x^2의 미분값을 계산
x = 2
df_dx = derivative(f, x)

print(f"x = {x}에서의 미분값은: {df_dx}")
```

### 편미분
![](https://i.imgur.com/FWMwlcZ.png)

위 함수를 x, y에 대해 각각 편미분하는 함수를 만들어 봅시다.

$$𝑓(𝑥)=𝑥^{2}∗𝑦+𝑦^{3}+𝑥𝑦$$

```python
def f(x, y):
    return x**2 * y + y**3 + x * y

# x에 대한 편미분
def partial_derivative_x(f, x, y, dx=1e-6):
    return (f(x + dx, y) - f(x, y)) / dx

# y에 대한 편미분
def partial_derivative_y(f, x, y, dy=1e-6):
    return (f(x, y + dy) - f(x, y)) / dy

# x = 1, y = 2에서의 편미분 값 계산
x = 1
y = 2

df_dx = partial_derivative_x(f, x, y)
df_dy = partial_derivative_y(f, x, y)

print(f"x = {x}, y = {y}에서의 x에 대한 편미분값: {df_dx}")
print(f"x = {x}, y = {y}에서의 y에 대한 편미분값: {df_dy}")
```

### 자동미분 (autograd)
![](https://i.imgur.com/v0beKUv.png)

`requires_grad` 속성을 `True`로 입력해  
`tensor2`를 자동미분을 적용한 텐서로 만들어 봅시다.

```python
import torch

tensor1 = torch.tensor([1., 2., 3.])
print('tensor1 자동미분 사용 여부: ', tensor1.requires_grad)

tensor2 = torch.tensor([1., 2., 3.], requires_grad=True)
print('tensor2 자동미분 사용 여부: ', tensor2.requires_grad)
```

### 역전파 (backward)

![](https://i.imgur.com/4Dw7b1W.png)

$$𝑓(𝑥)=𝑥^{2}$$

자동 미분을 이용해 위 식에 대해 x가 2일 때의 미분값을 구해 봅시다.
```python
# 미분 가능한 텐서 x를 생성
x = torch.tensor(2.0, requires_grad=True)

# 함수 f 정의: f(x) = x^2
f = x ** 2

# f에 대한 x의 미분 계산
f.backward()

# x에 대한 f의 미분값 출력
print(f"x = {x.item()}에서의 도함수 값: {x.grad.item()}")

x = 2.0에서의 도함수 값: 4.0
```

자동 미분을 이용해 위 식에 대해 x가 1이고, y가 2일 때의 미분값을 구해 봅시다.

$$𝑓(𝑥)=𝑥^{2}𝑦+𝑦^{3}+𝑥𝑦$$
```python
import torch

# 변수 x와 y 정의, requires_grad=True로 설정하여 미분 가능하게 함
x = torch.tensor(1.0, requires_grad=True)
y = torch.tensor(2.0, requires_grad=True)

# 함수 f 정의
f = x**2 * y + y**3 + x * y

# 자동 미분을 사용하여 편미분 계산
f.backward()

# 결과 출력
print(f"x = {x.item()}, y = {y.item()}에서의 x에 대한 편미분값: {x.grad.item()}")
print(f"x = {x.item()}, y = {y.item()}에서의 y에 대한 편미분값: {y.grad.item()}")

x = 1.0, y = 2.0에서의 x에 대한 편미분값: 6.0
x = 1.0, y = 2.0에서의 y에 대한 편미분값: 14.0
```

### autograd 제어하기
![](https://i.imgur.com/zmTmziG.png)

![](https://i.imgur.com/NbbK5WD.png)

Gradient 중지 - no_grad
```python
x = torch.tensor(1.0, requires_grad=True)
print(f"자동미분 여부: {x.requires_grad}")  # True

with torch.no_grad():
    y = x * 2
    print(f"no_grad 블록 안에서의 자동미분 여부: {y.requires_grad}")  # False
    
자동미분 여부: True
no_grad 블록 안에서의 자동미분 여부: False
```

Gradient 중지 - detach
```python
x = torch.tensor(1.0, requires_grad=True)
print(f"x 자동미분 여부: {x.requires_grad}")  # True

z = x.detach()
print(f"z 자동미분 여부: {z.requires_grad}")  # False
```

Gradient 흐름 제어
```python
with torch.no_grad():
    with torch.enable_grad():
        y = x * 2
        print(f"enable_grad 블록 안에서의 자동미분 여부: {y.requires_grad}")  # True
```