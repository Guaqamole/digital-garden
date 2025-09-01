---
title: AI, GPU, HBM and Semiconductors
date: 2025-03-13
draft: false
tags:
  - Scholars
complete: true
link: https://news.skhynix.co.kr/post/jeonginseong-column-ai-2
---
# Hardware
기존에는 대부분의 연산이 **CPU(중앙처리장치, Central Processing Unit)에서 수행되었지만, AI는 GPU, NPU, TPU 등 AI 전용 하드웨어**의 도움을 받아 성능을 극대화하고 있다.

🔹 CPU (중앙처리장치)
- **순차 연산(Serial Processing)에 최적화되어 있음.
- 문서 작업, 웹 브라우징, 소프트웨어 실행과 같은 범용 작업 수행.
- **AI 연산에서는 비효율적**이며, **병렬 연산이 가능한 GPU가 필요**.

🔹 GPU (그래픽처리장치)
- **행렬 곱셈(Matrix Multiplication) 및 병렬 연산(Parallel Processing)에 최적화**.
- AI의 핵심인 **딥러닝(Deep Learning)과 신경망(Neural Network) 학습**을 처리.
- **CUDA (NVIDIA), ROCm (AMD), Metal (Apple)과 같은 소프트웨어 생태계**를 통해 AI 최적화.

## GPU
### graphic computing
이름에서 알 수 있듯이 GPU는 그래픽 연산에 특화되어 그 결과값을 모니터에 출력하는 역할을 합니다.

그렇다면 그래픽 연산이란 무엇일까요?
![|775](https://i.imgur.com/dvFJiUT.png)

모니터에 뿌려지는 이미지들은 Pixel이라는 작은 점들로 이루어져 있습니다.  
현재 가장 범용적으로 사용되는 해상도인 1920x1080의 Pixel 수는 200만개 정도 입니다.

동영상의 경우는 Pixel들이 모인 이미지가 빠르게 표시되는데 이 때의 이미지들을 Frame이라고 부릅니다.

1초에 30프레임이면 컴퓨터가 1초에 계산해야하는 Pixel의 개수는 6000만개정도가 되겠죠!

물론 이 계산을 CPU가 처리해 줄 수도 있겠지만, 효율적이지 않습니다.  
수백 수천만개의 단순 연산을 몇 개의 고성능 코어로 돌리게 되기 때문에 정말 빠르게 처리해야하는 중요한 작업들이 딜레이될 수도 있습니다.

3D그래픽은 어떨까요?
이 경우 조금 더 복잡한 연산이 들어가게 되는데, 하나의 정점데이터에는 좌표값(position), 방향(normal), 이미지 좌표(texture coordinate) 등 여러 정보가 포함됩니다.

거기다 게임같은 경우 실시간으로 3D모델이 끊임없이 움직이게 될 것입니다.  
그러므로 계속해서 변하는 정점 데이터를 계산해줘야 합니다!

이 연산은 여러 정보가 포함된 데이터, 즉 **행렬**의 형태로 나타나게 되고,  
이는 행렬의 곱셈 형태로 실시간 계산이 되게 됩니다.

![|725](https://i.imgur.com/fiN8fDB.png)

위 그림은 CPU와 GPU의 구조를 개략적으로 나타낸 그림입니다.  
CPU에서 논리 연산을 수행하는 장치를 ALU(Arithmetic Logic Unit, 산술 논리 연산 장치)라고 부르는데, 요놈이 많을 수록 동시에 계산할 수 있는 수가 많아집니다.

CPU같은 경우는 복잡한 수식을 처리하거나 명령어 하나로 계산여러개를 한꺼번에 한다거나 각종 제어처리를 위한 부분이 많습니다.

반면 GPU는 독립적인 연산 여러개를 빠르게 수행하기 위해 이런 부분을 삭제하고 수천개의 ALU를 가지고 있습니다.

GPU에서는 순차적인 계산(A->A’->A’‘)을 처리하는데에는 효율이 떨어지고(나머지 코어들이 놀고 있기 때문), **서로 독립적인 대량의 데이터를 처리**할 때 매우 효과적인 특성을 갖고 있습니다.

### Matrix computing
사람들은 이러한 특성을 사용하여 그래픽 처리뿐만 아니라 다른 영역에도 적용해보자! 라고 고민하기 시작했습니다.

그러나 그래픽이 처리되는 방식으로 데이터를 처리하려니 바꿔줘야하는 부분들이 있고,  
행렬연산이 일반적인 계산에 적합하지 않을 때가 있기 때문에 `OpenCL`이나 `CUDA`같은 언어가 등장했습니다.

**OpenCL vs CUDA**
- 기능 비슷, 코딩스타일도 C와 비슷
- `OpenCL`은 NVIDIA, AMD 모두 동작가능, CPU에서 디버깅도 가능
- `CUDA`는 NVIDIA GPU에서만 사용가능

GPU가 독립적인 대량의 데이터를 처리하는데 특화된 녀석이라는 것을 알았으니, 이제는 실제로 데이터가 어떻게 처리되는지 알아보겠습니다.

**GPU의 코어 하나는 한 번에 하나의 스레드를 처리할 수 있습니다.**  
그렇다면 스레드의 개수만큼 코어가 존재하는것이 이상적일 것입니다.  
하지만 현실적으로는 불가능에 가깝죠!

1,000,000개의 스레드가 있다고 생각해봅시다.  
우리가 가진 GPU의 코어는 1,000개이구요.

![|700](https://i.imgur.com/Is6GRUS.png)

스레드를 1000개의 묶음으로 묶으면 한 묶음에 1000개의 스레드가 있을 것이고,  
코어를 10개씩 묶으면 하나에 100개의 코어가 존재할 것입니다.

![|775](https://i.imgur.com/8U3tAuM.png)
또 이 스레드 묶음에서 100개씩 묶어준다면 100개의 코어에서 한 번에 처리가 가능해집니다.  
이때의 단위를 Nvidia에서는 `Warp`, AMD에서는 `Wavefront`라고 부릅니다.

`Warp`&`Wavefront`는 같은 명령어로 동시에 동작 가능한 스레드의 집합을 의미하고, 이런 동작을 **Single Instruction Multi Thread**(SIMT)라고 부릅니다. gpu의 발전 방향은 SIMD -> SIMT로 발전되어 왔습니다.
  
CPU에서는 Work를 저장한 Thread를 다수 만들고, 이 Thread가 GPU로 전달되며 GPU는 이 Thread를 처리하게 됩니다.

이때, Thread를 단순히 1~N개의 1차원 형식으로 전달하는것이 아니라
**Cuda에서는 Thread를 모아서 Block을, Block을 모아서 Grid를 생성합니다.** 
**OpenCL의 경우 Work(=Thread)를 모아서 Work Group(=Block), Work Group을 모아서 ND Range(=Grid)를 만듭니다.**

GPU역시 한정된 자원으로 동작하는 장치인 만큼, 레지스터 <-> 캐시 <-> GDDR의 메모리 계층구도를 이루고 있습니다. 

**이때, Work Group(=Block)에 존재하는 Work(=Thread)는 무조건 같은 CU(혹은 SM)에 할당됩니다.**
때문에 동일한 Data를 공유해야하는 Work가 다른 CU(혹은 SM)에 할당된 경우 CU(혹은 SM)끼리의 데이터 교환(다른 CU, SM의 Cache의 데이터 조회)이 발생하고, 이 때문에 불필요한 오버헤드가 발생할 수 있습니다.
(같은 CU 혹은 SM에 할당하기 위해서 Group(=Block)와 ND Range(=Grid)의 차원을 조절하게 됩니다)

때문에 OpenCL을 활용해서 빠른 성능을 얻고자 한다면 이러한 아키텍쳐의 대략적인 처리방향을 알면 큰 도움이 됩니다.

### GPU Cores
GPU의 Core는 더 작은 용량의 Cache, 작은 Instruction set, 낮은 Clock rate를 갖는다. 그렇지만 CPU보다 매우 많은 Core가 밀집되어 있기 때문에 병렬 처리에 유용하다. GPU 내에서 CUDA Core의 수는 더 좋은 Computing performance를 낼 수 있다는 말과 동일하다. 하지만 GPU의 서로 다른 세대 간의 성능을 비교할 때는 단순히 Core의 수 만으로 비교할 수는 없다. GPU 안에서도 세대를 변화하며 단일 Core의 성능이 달라지기 때문이다.

최신 NVIDIA GPU 안에는 세 가지 종류의 Core가 존재하며, 각 core 들은 서로 다른 목적을 위해 설계되었다.

**(1) CUDA cores (2) Tensor cores (3) Ray-Tracing cores**

#### CUDA Core
GPU 상에서 CUDA Cores가 하는 일은 근본적으로 CPU 내부의 Core가 하는 일과 유사하다. 하지만 CPU와 달리 Instruction을 가져오거나 Decoding 할 수는 없다.

![|675](https://i.imgur.com/PKHUk1H.png)


**그래픽 처리 장치(GPU)에서 병렬 처리를 수행하는 단위.**

**CPU에서 해야할 영상처리라던지 그래픽 관련 작업을 GPU가 뺏어와서 하는데 쓰이는 코어의 갯수라 생각하면 됩니다. 그만큼 CPU의 부담을 덜어주고 뛰어난 GPU의 성능을 더 활용해서 더 높은 수준의 영상연산을 할 수 있게 만드는 기술.**

구조적으로 CPU는 큰 크기의 Cache memory와 함께 한 번에 몇 개의 Thread를 처리할 수 있는 소수의 Core로 구성된다. 이와 대조적으로 GPU는 수천 개의 Thread를 동시에 처리할 수 있는 수백에서 수천 개의 CUDA Core로 구성된다. 이를 통해 GPU는 CPU보다 훨씬 많은 작업을 빠르게 처리할 수 있으며 이런 특징을 통해 AI분야의 Deep Learning 연산에서 핵심적인 역할을 할 수 있다.

일반적으로 CUDA Cores는 Tensor Cores에 비해 느리지만 fp32 연산을 수행하기 때문에 더 정확한 연산을 수행할 수 있다. Tensor Cores 는 fp16 연산이기 때문에 계산 정확도를 어느 정도 희생해야 한다.  
  
단순히 CUDA Cores의 수로 GPU의 성능을 판단하기에는 많은 제한 조건들이 있다. 어떤 GPU Architecture를 채택했는가 부터 *GPU Clock speeds, Memory Bandwidth, Meory speed, TMUs, *VRAM, ROPs 등은 성능에 영향을 미치는 요소들이다.

하지만 동일한 GPU Architecture 내에서는 이런 조건들이 비슷하기 때문에 CUDA Cores의 수로 성능을 비교할 수 있다. 많은 수의 CUDA Cores는 Performance bottleneck 현상을 일으키는 다른 요인이 없는 경우 같은 Generation에서 더 좋은 성능을 의미한다. 하지만 다른 Generation 사이에서 성능을 비교하는 경우는 이와 상황이 다르다.

예를 들어 GTX 1070은 GTX 780과 거의 동일한 수의 CUDA Core를 갖고 있지만 성능 면에서 월등한 차이를 갖고 있다. 이런 성능 차이는 단일 Core의 성능 차이와 세대를 거듭하며 발전하는 제조 공정 차이, 트랜지스터의 크기 차이 등에 기인한 것으로 판단된다.

GTX 980 Ti(Maxwell architecture)와 GTX 980 Ti(Pascal architecture)의 경우는 비슷한 수의 CUDA Core와 Transistor가 존재하지만 트랜지스터의 크기가 이 둘의 성능을 비교하는 데에 결정적인 역할을 했다. 더 작은 Transistor를 사용하는 Pascal architecture의 전력 소비 감소로 작은 공간에 많은 트랜지스터를 집적할 수 있었으며 이를 통해 최대 Clock frequency를 증가시킬 수 있었다. Clock frequency의 증가로 단일 Core가 더 빠르게 작업을 수행할 수 있었으며 이는 두 Architecture 간의 성능 차이로 이어졌다.   
  
NVIDIA에서 자사의 GPU Cores를 CUDA Core로 명명한 것 처럼 AMD 사에서는 이를 Stream Processor라고 부른다. 두 회사의 Architecture가 근본적으로 다르게 설계되었기 때문에 CUDA Cores의 수와 Stream processor의 수만 보고 성능을 비교할 수는 없다. 하지만 Benchmark simulation을 통해 두 Architecture의 성능을 보다 정확히 비교할 수 있다.


#### Tensor Core
Tensor cores란 NVIDIA에서 개발한 행렬 곱셈 프로세스를 가속하는 처리 장치이다. CUDA Cores가 1 Core Clock에 하나의 fp32 부동소수점 연산을 수행하는 것에 비해 Tensor Cores는 같은 Term 동안 4 x 4 크기의 fp16 행렬 두 개를 곱하고 그 결과를 4 x 4 fp32 행렬에 더하는 Matrix multiply-accumulate 연산(A와 B를 곱하고 C를 더하는 과정을 하나의 연산으로 수행)을 수행한다.

![](https://i.imgur.com/7dQ69rK.png)

이 과정에서 fp16 행렬을 입력 받고 fp32 행렬을 출력하기 때문에 Mixed precision이라고 불린다. 또한 이 연산은 Rounding이 한번 일 때 FMA(Fused Multiply-Add)라고 불리기도 한다. 각 Tensor core는 한 번의 GPU Clock에 64개의 부동소수점 연산을 하는데 이는 출력 행렬의 한 원소를 계산하기 위해 4 개의 FMA 연산이 필요하고 총 4 x 4 (16개)의 원소가 존재하기 때문이다. 

![|1050](https://i.imgur.com/pefZZ8i.png)

 Tensor Cores라는 이름에서 'Tensor' 의 의미는 무엇일까? Tensor란 다차원의 Data sets 를 저장할 수 있는 컨테이너로 행렬의 확장으로 생각할 수 있다. 행렬은 숫자를 포함한 2차원 구조이지만 Tensor는 숫자의 다차원 집합으로 표현된다. 

![|900](https://i.imgur.com/qA1qjXk.png)

모든 마이크로 프로세서는 산술 및 논리 연산을 수행한다. 이 중 중요도가 높은 산술 연산 중 하나는 바로 행렬 곱셈 이다. 하지만 2개의 4 x 4 행렬의 곱셈을 수행하려면 이론적으로 64개의 곱셈 연산과 48개의 덧셈 연산이 필요하다. 그렇기 때문에 NVIDIA는 연산의 정확도를 희생하여 더 많은 연산을 빠르게 수행할 수 있는 Tensor Cores를 세상에 출시하였습니다. NVIDIA의 Volta Architecture에서 이 기술이 최초로 적용되었으며 그 이후의 Architecture에도 이를 적용하여 훨씬 빠르게 연산을 수행할 수 있게 되었다.

![](https://i.imgur.com/rNKoji8.png)

Tensor Cores는 Clk 주기 당 여러 작업을 한 번에 수행할 수 있으며 CUDA Cores 보다 훨씬 높은 처리량(Throughput)을 수행한다. 기계 학습 분야의 경우 비용과 계산 속도 면에서 Tensor Cores의 성능은 CUDA Cores를 크게 앞지르고 있으며 AI 연산 분야와 그 응용 분야들에서 널리 사용되고 있다. 

CUDA Toolkit에서 제공하는 라이브러리인 cuBLAS와 cuDNN에서는 Tensor Cores를 지원하고 있다. cuBLAS는 행렬과 행렬의 곱셈 연산인 GEMM 연산에 Tensor Cores를 이용하고 cuDNN 에서는 Convolution 연산에 이를 이용하고 있다.

실험 결과 Tensor Cores는 cuBLAS에서 4에서 9배, cuDNN에서 4에서 5배의 성능 향상을 이끌었습니다. Tensor Cores가 처음 적용된 Architecture인 Volta의 model 중 Titan V는 5120개의 CUDA Cores와 640개의 Tensor Cores를 갖고 있다.

하나의 Tensor Core 는 한 Cycle에 64개의 FMA를 수행하며 이는 한 번에 128개의 부동소수점 연산을 수행하는 것과 같다. 따라서 Titan V 의 경우 640개의 Tensor Cores가 있으므로 Cycle마다 128 x 640 개의 부동소수점 연산을 수행할 수 있다. Turing Architecture의 경우 딥러닝 추론 속도 향상을 위하여 INT8과 INT4 연산을 추가했는데 이를 통해 연산에 필요한 비트 수를 대폭 줄이고 연산 속도를 극적으로 향상시키는 Quantization 기법을 적용하였다. 


### GPU memory
![](https://i.imgur.com/ZmZdPsz.png)

그래픽카드에 들어있는 메모리와 컴퓨터 메인보드에 꽂혀 있는 메모리는 별개로 동작.
- GPU SM은 CPU Core와 같은 단위입니다. **SM은 Streaming Multiprocessor의 약자입니다. 1개의 GPU에는 여러 개의 SM으로 구성되어 있습니다.**
- SM 내부에는 L1 cache가 있고, SM들은 L2 cache를 통해 RAM(=main memory=global memory)에 access 하는 구조입니다. CPU와 cache단위가 다른 것을 볼 수 있습니다.

![|850](https://i.imgur.com/LPm1Xgf.png)

세부적인 수치를 같이 보겠습니다. 위는 A100 GPU의 구조입니다. (출처 : [link](https://developer.nvidia.com/blog/cuda-refresher-cuda-programming-model/))
- Register : 가장 빠른 저장소입니다. GPU Core 연산에 직접적으로 사용됩니다.
- Cache : RAM의 데이터나 값을 미리 복사해 놓는 빠른 속도의 임시 저장소입니다. SM 내/외부로 나눠져있습니다.
- DRAM : 프로그램 실행을 위해 사용되는 저장소입니다.
- 용량(=Capacity)과 속도(=Latency)가 반비례합니다.  
    - 용량 : Register < L1 cache < L2 cache < GPU DRAM (위 이미지에서 확인 가능합니다.)  
    - 속도 : Register > L1 cache > L2 cache > GPU DRAM
![|625](https://i.imgur.com/2mFJLnp.png)

위와 같은 속도 차이가 발생한다고 보면 됩니다. (출처 : [link](http://blog.zorangagic.com/2013/11/memory-hierarchy.html))

#### 프로그램 실행시 데이터 흐름
![|600](https://i.imgur.com/4sYo4hJ.png)

하나의 프로그램이 실행 될 때, 데이터의 흐름입니다. (출처 : [link](https://cuda-programming.blogspot.com/2013/01/thread-and-block-heuristics-in-cuda.html))

단위에 대한 개념부터 설명하자면 아래와 같습니다. Grid는 여러개의 Thread Block으로 구성되어 있고, Thread Block은 여러개의 Thread로 구성됩니다.
- Grid : 병렬 실행되는 명령의 모음이며, Kernel(=함수)당 1개의 grid 실행합니다. 여러 개의 block으로 구성됩니다.
- Block : 병렬로 독립적으로 수행되는 단위입니다. 여러 개의 thread로 구성됩니다.
- Thread : 명령을 실행하는 동작 단위입니다. **Cuda Core 1개가 1개의 thread 를 수행**합니다.

**각각의 Thread는 Cuda Core안에서 다음과 같은 메모리 Access를 통해 수행됩니다.**

SM에 Register와 Shared Memory에 Acess합니다.
- Register : Thread마다 사용되는 메모리입니다.
- Shared Memory (=SMEM) :데이터나 값을 미리 복사해 놓는 빠른 속도의 임시 저장소입니다. L1 cache와 동일한 역할을 하며 L1은 자동으로 관리되며 SMEM는 수동으로 코드를 통해 관리 됩니다. Block안의 모든 thread 들이 공유합니다.

DRAM의 Local Memory(지역 변수용), Global memory(전역 변수용), Constant memory(=상수용), Texture memory(=그래픽용)에 Acess합니다.
- Local Memory : Thread마다 사용되는 메모리입니다.
- Global, Constant, Texture Memory : Thread간에 공유되어 사용되는 메모리입니다.

![](https://i.imgur.com/CvmijUj.png)
위 과정은 병렬 연산을 통해 수행됩니다.(출처 : [link](https://dlsys.cs.washington.edu/pdf/lecture5.pdf)) Grid내 Thread Block은 여러 SM에 병렬적으로 나눠 수행되는 것을 볼 수 있습니다. 위에서 설명 안한 용어만 추가적으로 적어보겠습니다.
- Kernel : programmer가 GPU에서 병렬로 실행하게 구현한 함수입니다. 코드를 작성하는 함수 단위로 생각하면 될 것 같습니다. Kernel은 SW형태이고 Grid는 HW형태로 구분하면 됩니다. (일반적으로 커널은 OS에서 System Resource을 관리하는 프로그램을 의미합니다.)
- Warp : 동시에 동일 instruction으로 실행되는 thread 묶음입니다(출처 : [link](https://en.wikipedia.org/wiki/Thread_block_(CUDA_programming))) . 스케쥴링되는 최소 단위입니다. 32개의 Thread로 구성되어 있습니다. 여러 개의 warp로 1개의 thread block을 구성 합니다.

#### A100 Spec
![|750](https://i.imgur.com/n6888Ai.png)

- Warp마다 32개의 Thread로 구성되어 있습니다.
- SM마다 64개의 Warp로 구성되어 있습니다. 때문에 SM마다 총 2048개(32thread x 64warp)의 thread로 구성됩니다.
- Block은 병렬로 독립적으로 수행되는 단위라고 했었습니다. block사이즈는 1024개까지 늘일수 있네요.
- SM은 총 108개입니다.
- SM마다 64개의 Core로 구성되어 있기 때문에, GPU에 있는 총 Core 갯수는 6912(108SM x 64core)입니다.
- FP32, FP64, INT32 core가 별도로 존재하는 것을 볼 수 있습니다. 각각은 Floating Point 32bit연산, 64bit연산, int연산을 나타냅니다.
- Memory Size는 Global Memory(=Main Memory)에 해당하며, 40GB임을 볼 수 있습니다. 딥러닝 학습 할 때 가장 많이 고려하는 항목입니다.
- 마지막 빨간 사각형에서는 L2 Cache Size와 SM마다 Shared Memory Size, Register File size를 볼 수 있습니다.


## NPU & TPU
GPU가 AI 학습(Training)과 추론(Inference)에 널리 사용되고 있지만,  
더 높은 성능과 저전력 최적화를 위해 **NPU(Neural Processing Unit)와 TPU(Tensor Processing Unit)가 등장했다.

AI 모델의 학습(Training)에는 GPU 및 TPU가 필수적이며, 추론(Inference)에서는 NPU가 활용될 수 있음.
### 🔹 NPU (Neural Processing Unit)
- AI 연산(특히 **추론, Inference**)을 가속화하기 위해 개발된 프로세서.
- **스마트폰, 엣지 컴퓨팅, IoT 기기에서 AI 추론을 수행**.
- 예: **애플 Neural Engine, 삼성 엑시노스 NPU, 퀄컴 Hexagon AI 엔진**.
### 🔹 TPU (Tensor Processing Unit)
- 구글이 AI 학습 및 추론을 위해 개발한 AI 가속기.
- **텐서 연산(Tensor Computation) 최적화** → 대형 AI 모델 학습(Training)에서 뛰어난 성능.
- Google Cloud TPU를 통해 AI 연구자들이 사용 가능.


## Vram
AI 연산과 GPU 성능을 결정짓는 중요한 요소 중 하나가 **비디오 메모리(VRAM)이다.  

VRAM의 성능은 **클럭(Clock), 채널(Channel), 비트(Bit)의 조합**에 의해 결정되며, 
이를 이해하면 **메모리 대역폭(Bandwidth)을 계산하고 성능을 예측**할 수 있다.

AI 모델의 추론에서는 메모리 대역폭과 캐시 효율성이 매우 중요한 요소입니다. 특히, 대형 모델(GPT, Stable Diffusion 등)의 경우, 메모리 대역폭 부족이 병목이 되는 주요 원인 중 하나입니다.


### 1️⃣ VRAM이란?
- VRAM(Video RAM)은 GPU가 데이터를 빠르게 접근하고 연산할 수 있도록 **전용 메모리**를 제공하는 역할을 한다.
- 게임 그래픽, AI 연산, 영상 렌더링에서 **대량의 데이터**를 저장하고 빠르게 불러오는 것이 필요하기 때문에 **일반적인 PC DRAM보다 고속의 메모리를 사용**한다.
- 일반적으로 **GDDR(GDDR6, GDDR6X, GDDR7) 또는 HBM(High Bandwidth Memory)를 사용한다.
💡 **VRAM은 GPU가 데이터를 빠르게 불러올 수 있도록 특화된 고속 메모리이다.**


### 2️⃣ 클럭(Clock), 채널(Channel), 비트(Bit)의 관계
VRAM의 데이터 전송 속도를 결정하는 가장 중요한 요소는 **클럭 속도**, **채널 개수**, **비트 폭(Bit Width)이다.
#### 🔹 1) 클럭(Clock)
- VRAM의 클럭 속도는 **초당 몇 번의 데이터 전송을 수행할 수 있는지**를 결정한다.
- **MHz 또는 GHz 단위로 측정되며, 메모리 클럭이 높을수록 전송 속도 증가**.

#### **🔹 2) 채널(Channel)**
- 채널은 **메모리가 데이터를 전송할 수 있는 경로(버스의 개수)**를 의미한다.
- 예를 들어, **GDDR6X가 384-bit 메모리 인터페이스를 가진다면, 384개의 데이터 버스를 통해 동시 전송이 가능**.

#### **🔹 3) 비트(Bit)**
- 비트(Bit)는 **각 클럭 주기에서 전송할 수 있는 데이터의 크기**를 나타낸다.
- 예를 들어, **GDDR6 메모리는 1 클럭당 16비트를 전송**할 수 있으며, GDDR6X는 **2배 속도(Double Data Rate, DDR)로 32비트 전송 가능**.

📌 **클럭이 높을수록 데이터 전송 속도가 증가하고, 채널과 비트 수가 많을수록 한 번에 더 많은 데이터를 전송 가능하다.**


### 3️⃣ VRAM 대역폭(Bandwidth) 계산 공식
VRAM 성능을 결정하는 가장 중요한 지표는 **메모리 대역폭(Bandwidth, GB/s)**이다.  
대역폭이 높을수록 한 번에 더 많은 데이터를 전송할 수 있어 **AI 연산과 그래픽 성능이 향상**된다.

💡 **VRAM 대역폭(Bandwidth) 공식:**

$$ \text{Bandwidth(GB/s)} = \frac{\text{클럭 속도 (MHz)}\times \text{비트 수 (Bit Width) * 2}}{8} $$

- **클럭 속도(Clock Speed, MHz)** → VRAM이 작동하는 속도
- **비트 수(Bit Width)** → VRAM 인터페이스 폭 (예: 192-bit, 256-bit, 384-bit)
- **2배속(Double Data Rate, DDR)** → GDDR 계열은 DDR 기술을 사용하여 **클럭당 2번 데이터 전송**
- **8로 나누는 이유** → 비트(Bit)를 바이트(Byte) 단위로 변환하기 위함


### 4️⃣ GDDR6X vs. HBM3: AI 연산에서의 차이점
VRAM의 종류는 AI 연산의 속도를 결정하는 중요한 요소이다.  
특히 (Nvdia GPU기준) **GDDR6X vs. HBM3**는 AI 가속기에서 선택하는 중요한 메모리 유형이다.

| **구분**             | **GDDR6X (Gaming & AI GPU)**    | **HBM3 (AI & HPC GPU)**       |
| ------------------ | ------------------------------- | ----------------------------- |
| **대역폭**            | 500~1000GB/s                    | 1000~3000GB/s                 |
| **채널**             | 192-bit, 256-bit, 384-bit       | 4096-bit, 5120-bit            |
| **클럭 속도**          | 21~24 Gbps                      | 3.2 Gbps (낮은 클럭이지만 높은 채널 수)   |
| **지연 시간(Latency)** | 낮음                              | 높음                            |
| **소비 전력**          | 상대적으로 높음                        | 상대적으로 낮음                      |
| **사용처**            | **RTX 4090, RTX 4080, AI용 GPU** | **NVIDIA H100, MI300, AI 서버** |

- **GDDR6X는 높은 클럭 속도와 낮은 지연 시간(Latency)로 게이밍 & 일반 AI 연산에 적합**.
- **HBM3는 채널 수를 극대화하여 초고속 메모리 대역폭을 제공하므로 AI 학습 및 데이터센터에 최적화**.

GDDR6X는 **각 메모리 칩이 32-bit 인터페이스를 가지며, 여러 개의 칩을 GPU에 병렬 연결**하여 채널을 확장한다.
- 예를 들어, **RTX 4090(24GB GDDR6X)은 12개의 메모리 칩(각각 32-bit)로 구성**됨.
- 따라서, **12 × 32-bit = 384-bit** 인터페이스를 가지며, 이를 하나의 채널로 간주.

HBM3는 기존 GDDR6X와 달리 **하나의 메모리 스택(Stack) 내부에 여러 개의 독립적인 채널이 존재**하는 구조를 가진다.
- **HBM3는 각 메모리 스택이 1024-bit 인터페이스를 가짐.**
- **하나의 HBM3 스택(메모리 모듈) 내부에는 16개 채널이 포함됨.**
- **NVIDIA H100 GPU는 6개의 HBM3 스택을 사용**하며, 각 스택은 **1024-bit 인터페이스**를 가짐.
- 따라서, H100의 **전체 인터페이스 비트수는 1024-bit × 6 = 6144-bit**.

애플 M 시리즈는 NVIDIA GPU와 **완전히 다른 통합 메모리(Unified Memory) 구조**를 사용한다.
🔹 애플 M 시리즈의 특징
- **GDDR6X 또는 HBM을 사용하지 않음.**
- **LPDDR5X 기반의 저전력 고대역폭 메모리 사용.**
- **CPU, GPU, Neural Engine(NPU), AI Accelerator가 하나의 통합 메모리(UMA, Unified Memory Architecture)를 공유**.

🔹 애플 M 시리즈의 메모리 인터페이스
- **M1, M2, M3 칩은 LPDDR5X 메모리를 사용**하며, 메모리 컨트롤러를 여러 개 두어 병렬로 데이터를 처리.
- **M1 Ultra, M2 Ultra, M3 Max 같은 상위 모델은 더 넓은 메모리 인터페이스를 제공**.
- 예: **M1 Ultra는 1024-bit 인터페이스를 제공하여 높은 대역폭(800GB/s 이상)을 확보**.

📌 **애플 M 시리즈의 메모리 구조:**
- **메모리 컨트롤러를 여러 개 두어 병렬 처리**
- **HBM처럼 메모리를 적층하지 않고, 낮은 클럭 속도로 고대역폭을 확보**
- **GDDR처럼 개별 메모리 칩을 병렬 연결하는 구조가 아님**
- **CPU, GPU, NPU가 동일한 메모리를 공유하는 통합 아키텍처(UMA) 사용**

#### "소비자용 Nvidia GPU (GDDR)는 대역폭에서도 동시에 접근가능한 비트수가 많은 vram이 1클럭당 가져오는 메모리 데이터가 애플 M시리즈 칩보다 압도적으로 많기 때문입니다."
→ **❌ 부정확한 표현이 포함된 문장임.**

##### **✅ GDDR6X가 LPDDR5X보다 높은 대역폭을 제공하는 것은 사실**
- **NVIDIA의 GDDR6X (예: RTX 4090)**
        - 메모리 대역폭: **1008GB/s (RTX 4090 기준)**
    - 메모리 인터페이스: **384-bit**
    - 클럭 속도: **21Gbps**
    - **DDR (Double Data Rate) 기술**을 사용하여 **클럭당 2번 데이터 전송**.
- **애플 M 시리즈의 LPDDR5X (예: M3 Ultra)**
        - 메모리 대역폭: **800GB/s (M3 Ultra 기준)**
    - 메모리 인터페이스: **1024-bit**
    - 클럭 속도: **약 8.5Gbps**
    - **DDR 방식으로 클럭당 2번 데이터 전송**.

📌 **결론:**
- **GDDR6X는 개별 메모리 칩이 32-bit 인터페이스를 가지고, 여러 개의 메모리 칩을 병렬 연결**하여 192-bit, 256-bit, 384-bit 등의 인터페이스를 구성한다.
- **애플 M 시리즈는 LPDDR5X를 사용하며, 단일 메모리 버스의 인터페이스가 1024-bit로 더 넓음**.
- **하지만 GDDR6X의 클럭 속도가 더 높아(21Gbps vs. 8.5Gbps), 총 대역폭이 더 크다.**
- 따라서 **"GDDR6X가 애플 M 시리즈보다 1클럭당 더 많은 데이터를 가져온다"**는 표현은 부정확할 수 있다.

##### **3️⃣ "1클럭당 가져오는 데이터량"이라는 표현이 부정확한 이유**
1. **GDDR6X와 LPDDR5X의 데이터 전송 방식이 다름**
        - GDDR6X는 **클럭 속도가 높지만, 상대적으로 좁은 버스(384-bit)에서 데이터를 전송**.
    - LPDDR5X는 **클럭 속도가 낮지만, 더 넓은 버스(1024-bit)에서 데이터를 전송**.
    - 결과적으로, **"1클럭당 전송되는 데이터량"을 기준으로 비교하면 애플 M 시리즈(LPDDR5X)가 더 많을 수도 있음.**
    - 하지만 **"초당 전송되는 데이터량(대역폭)"을 기준으로 하면 GDDR6X가 더 빠름.**
2. **클럭 속도가 다르기 때문에 단순 비교가 어려움**
        - GDDR6X는 **클럭 속도가 빠르고, 단일 칩의 인터페이스는 좁음**.
    - LPDDR5X는 **클럭 속도가 상대적으로 낮고, 인터페이스는 넓음**.
    - 즉, **"1클럭당" 기준으로 비교하는 것보다 "총 대역폭"으로 비교하는 것이 더 적절함**.
📌 **결론:**
- **GDDR6X는 초당 전송하는 데이터량(총 대역폭)이 애플 M 시리즈보다 크지만, "1클럭당 가져오는 데이터량"은 반드시 더 많다고 볼 수 없음.**
- 즉, **이 문장은 부정확한 표현을 포함하고 있으며, "총 대역폭"을 강조하는 방식으로 수정하는 것이 바람직함.**

### 5️⃣ 클럭(Clock), 채널(Channel), 비트(Bit)이 VRAM에 미치는 영향
1. **클럭이 높을수록 데이터 전송 속도가 증가** → VRAM의 성능이 향상됨.
2. **채널(Bit Width)이 넓을수록 한 번에 더 많은 데이터를 전송** → AI 학습 및 초고속 데이터 처리 가능.
3. **HBM은 GDDR보다 낮은 클럭을 사용하지만 더 넓은 채널을 활용** → 초고속 AI 학습 및 HPC에서 사용됨.

📌 **최종 정리:**
- **게이밍 & 일반 AI 연산** → **GDDR6X (고클럭, 좁은 채널)**
- **AI 학습 & 데이터센터 AI** → **HBM3 (저클럭, 넓은 채널)**


## HBM vs DRAM
AI 연산을 위해서는 **고속 메모리**가 필수적이다.  
특히 AI 학습(Training)에서는 **엄청난 양의 데이터가 GPU와 메모리 사이를 이동**하며,  
이때 **HBM(High Bandwidth Memory)**과 같은 고대역폭 메모리**가 중요한 역할을 한다.
### **🔹 Bandwidth, Latency, Capacity**
- **Bandwidth(대역폭):** 초당 얼마나 많은 데이터를 전송할 수 있는지.
- **Latency(지연 시간):** 데이터가 요청된 후 실제로 전달되는 데 걸리는 시간.
- **Capacity(용량):** 저장할 수 있는 데이터의 양.

### **🔹 PC DRAM vs. HBM DRAM**

|**구분**|**PC DRAM (DDR5, LPDDR5X)**|**HBM (High Bandwidth Memory)**|
|---|---|---|
|대역폭|50~100GB/s 수준|1,000GB/s 이상|
|지연 시간|상대적으로 낮음|상대적으로 높음|
|용량|16~128GB|16~96GB|

작은 규모의 AI 모델 추론에서는 NPU나 행렬 연산 가속기 등이 유용할 수 있지만, 대형 모델 추론에서는 여전히 GPU의 높은 메모리 대역폭이 필요합니다.