---
title: Pytest Overview
date: 2024-05-07
draft: false
tags:
  - Python
  - Testing
  - Pytest
complete: true
---
## Overview
### Recommended course Main
- **About testing**: Why and how to write tests
- **About pytest**: Why pytest, popularity, history overview
- **The basics**: Fundamental pytest features, test discovery and plain asserts
- **Configuration**: Typical directory structure, configs, options
- **Marks**: Marking/grouping tests, skipping tests
- **Parametrization**: Running tests against sets of input/output data
- **Fixtures**: Providing test data, setting up objects, modularity
- **Built-in fixtures**: Temporary files, patching, capturing output, test information
- **Fixtures advanced**: Caching, cleanup/teardown, implicit fixtures, parametrizing
- **Migrating to pytest**: Running existing testsuites, incremental rewriting, tooling
- **Mocking**: Dealing with dependencies which are in our way, alternatives, monkeypatch and unittest.mock, mocking libraries and helpers
- **Plugin tour**: Coverage, distributed testing, output improvements, alternative test syntax, testing C libraries, plugin overview
- **Property-based testing**: Using _hypothesis_ to generate test data
- **Writing plugins**: Extending pytest via custom hooks, domain-specific languages
- **Open space**: Discussions of your choice, postponed issues from the course

### Optional
- **tox basics**: Packaging, running tests against different Python versions
- **tox configuration**: Defining environments
- **tox extra**: Running tools via tox, integrating into Continuous Integration (CI)

### Core pytest functionality[](https://docs.pytest.org/en/8.2.x/how-to/index.html#core-pytest-functionality "Link to this heading")
- [How to invoke pytest](https://docs.pytest.org/en/8.2.x/how-to/usage.html)
- [How to write and report assertions in tests](https://docs.pytest.org/en/8.2.x/how-to/assert.html)
- [How to use fixtures](https://docs.pytest.org/en/8.2.x/how-to/fixtures.html)
- [How to mark test functions with attributes](https://docs.pytest.org/en/8.2.x/how-to/mark.html)
- [How to parametrize fixtures and test functions](https://docs.pytest.org/en/8.2.x/how-to/parametrize.html)
- [How to use temporary directories and files in tests](https://docs.pytest.org/en/8.2.x/how-to/tmp_path.html)
- [How to monkeypatch/mock modules and environments](https://docs.pytest.org/en/8.2.x/how-to/monkeypatch.html)
- [How to run doctests](https://docs.pytest.org/en/8.2.x/how-to/doctest.html)
- [How to re-run failed tests and maintain state between test runs](https://docs.pytest.org/en/8.2.x/how-to/cache.html)

### Test output and outcomes[](https://docs.pytest.org/en/8.2.x/how-to/index.html#test-output-and-outcomes "Link to this heading")
- [How to handle test failures](https://docs.pytest.org/en/8.2.x/how-to/failures.html)
- [Managing pytest’s output](https://docs.pytest.org/en/8.2.x/how-to/output.html)
- [How to manage logging](https://docs.pytest.org/en/8.2.x/how-to/logging.html)
- [How to capture stdout/stderr output](https://docs.pytest.org/en/8.2.x/how-to/capture-stdout-stderr.html)
- [How to capture warnings](https://docs.pytest.org/en/8.2.x/how-to/capture-warnings.html)
- [How to use skip and xfail to deal with tests that cannot succeed](https://docs.pytest.org/en/8.2.x/how-to/skipping.html)

### Plugins[¶](https://docs.pytest.org/en/8.2.x/how-to/index.html#plugins "Link to this heading")
- [How to install and use plugins](https://docs.pytest.org/en/8.2.x/how-to/plugins.html)
- [Writing plugins](https://docs.pytest.org/en/8.2.x/how-to/writing_plugins.html)
- [Writing hook functions](https://docs.pytest.org/en/8.2.x/how-to/writing_hook_functions.html)


## Basics
### Setup in VsCode
```bash
tree -I '*cache*'

.
├── src
│   ├── calculator.py
│   └── sample_calculator.py
└── tests
    ├── conftest.py
    ├── core-features
    │   └── test_fixtures.py
    └── start
        └── test_calculator.py
```

#### src
**sample_calculator.py**
```python
"""
Python code to perform mathematical operations on two variable
"""

def summation(num1: int, num2: int) -> int:
    """
    Calculate the summation of two number
    """
    return num1 + num2

def subtraction(num1: int, num2: int) -> int:
    """
    Calculate the subtraction of two number
    """
    return num1 - num2

def multiplication(num1: int, num2: int) -> int:
    """
    Calculate the multiplication of two number
    """
    return num1 * num2

def division(num1: int, num2: int) -> float:
    """
    Calculate the division of two number
    """
    return num1 / num2
```

**calculator.py**
```python
class Calculator():
    def add(self, x, y):
        return x + y

    def sub(self, x, y):
        return x - y

    def mul(self, x, y):
        return x * y

    def div(self, x, y):
        return x / y
```

#### tests/start
**test_calculator.py**
```python
from src.sample_calculator import (
    summation, 
    subtraction, 
    multiplication, 
    division
)

def test_summation():
    """
    Testing Summation function
    """
    assert summation(2, 10) == 12
    assert summation(3, 5) == 8
    assert summation(4, 6) == 10

def test_subtraction():
    """
    Testing Subtraction function
    """
    assert subtraction(8, 2) == 6
    assert subtraction(7, 5) == 2
    assert subtraction(4, 2) == 2

def test_multiplication():
    """
    Testing Multiplication function
    """
    assert multiplication(2, 2) == 4
    assert multiplication(7, 2) == 14
    assert multiplication(10, 2) == 20

def test_Division():
    """
    Testing Division function
    """
    assert division(5, 5) == 1
    assert division(70, 10) == 7
    assert division(16, 4) == 4
```

#### 전체 실행
![|825](https://i.imgur.com/cuh7X6g.png)

### fixture
여러 test 파일에 공통적으로 fixture 함수가 선언하면 중복된 코드를 작성하게 된다. 이러한 문제는 별도의 `conftest.py` 파일에 fixture 함수를 선언하여 해결할 수 있다.

**test_fixtures.py**
```python
import pytest

from src.calculator import Calculator

def test_add_before_fixture():
    calc = Calculator()
    assert calc.add(1, 2) == 3
    
def test_sub_before_fixture():
    calc = Calculator()
    assert calc.sub(3, 2) == 1
    
@pytest.fixture
def calculator():
    return Calculator()
    
def test_add_after_fixture(calculator):
    assert calculator.add(1, 2) == 3
    
def test_sub_after_fixture(calculator):
    assert calculator.sub(3, 2) == 1
```

### conftest.py
여러 test 파일에 공통적으로 fixture 함수가 선언하면 중복된 코드를 작성하게 된다. 이러한 문제는 별도의 `conftest.py` 파일에 fixture 함수를 선언하여 해결할 수 있다.

**conftest.py**
```python
import pytest

from src.calculator import Calculator

@pytest.fixture
def calculator():
    return Calculator()
```

**test_conftest.py**
```python
def test_add(calculator):
    assert calculator.add(1, 2) == 3
    assert calculator.add(2, 2) == 4

def test_sub(calculator):
    assert calculator.sub(5, 1) == 4
    assert calculator.sub(3, 2) == 1
```

### parameterize
테스트 케이스마다 테스트값을 포함한 테스트 함수를 호출하는 코드도 중복 작성하는 부분이다. 이를 위한 테스트 입력값과 결과값을 `@pytest.mark.parametrize(argnames, argvalues)` 데코테이터로 작성하여 테스트 코드를 간결하게 만들 수 있다.
함수명에는 `def func(fixture, argnames[n])` 으로 쓰면된다.

**test_parameterize.py**
```python
import pytest

@pytest.mark.parametrize(
    "a, b, result",
    [(1, 2, 3),
     (2, 2, 4)]
)
def test_add(calculator, a, b, result):
    assert calculator.add(a, b) == result

@pytest.mark.parametrize(
    "a, b, expected",
    [(1, 2, 4),
     (2, 2, 6)]
)
def test_add_fail(calculator, a, b, expected):
    assert calculator.add(a, b) != expected
```

### xfail
`@pytest.mark.xfail`는 테스트 실패가 예상되는 함수에 지정하는 데코레이터이다. `reason` 파라미터는 작성자가 실패가 예상되는 이유를 작성하는 부분이다.

**test_xfail.py**
```python
import pytest

@pytest.mark.parametrize(
    "a, b, expected",
    [(1, 2, 4),
     (2, 2, 6)]
)
def test_add_fail_parametrize(calculator, a, b, expected):
    assert calculator.add(a, b) != expected

@pytest.mark.xfail(reason="wrong result")
@pytest.mark.parametrize(
    "a, b, expected",
    [(1, 2, 4),
     (2, 2, 6),
     (3, 4, 7)]
)
def test_add_fail_xfail(calculator, a, b, expected):
    assert calculator.add(a, b) == expected
```

### param
`pytest.param`을 사용하여 테스트 케이스별로 옵션을 지정할 수 있다.

#### 성공 & 실패 케이스 통합
위에서 학습한 `pytest.param xfail`을 사용하면 하나의 테스트 함수에서 성공과 실패 케이스 모두 테스트할 수 있다.
```python
import pytest

@pytest.mark.parametrize(
    "a, b, result",
    [(1, 2, 3),
     (2, 2, 4),
     pytest.param(1, 2, 4, marks=pytest.mark.xfail),
     pytest.param(2, 2, 6, marks=pytest.mark.xfail)]
)
def test_add(calculator, a, b, result):
    assert calculator.add(a, b) == result
```
