---
title: Python pyautogui
date: 2024-06-12
draft: false
tags:
  - Python
complete: true
---
## Install
```python
pip install -y pyautogui
```

- mac 설정
	- 개인 정보및보안 > 키보드 모니터링 >  cursor 추가
	- 개인 정보및보안 > 손쉬운 사용 (Accessbility)>  cursor 추가
## Click.py
```python
import os
import time
import pyautogui

dir = input("directory to save screenshots ('/Users/john/Downloads/img'): ")

if not os.path.isdir(dir):
    raise FileNotFoundError("Directory does not exist:", dir)

print("Move Cursor to get position.")
print(pyautogui.displayMousePosition())
x = int(input("x position: "))
y = int(input("y position: "))
digit = 3

pyautogui.moveTo(x,y)
print(f"moved to screen x:{x}, y:{y}")
time.sleep(0.5)
pyautogui.click(x,y)
print("clicked screen.")
time.sleep(0.5)

print("starting screenshot.")
for num in range(10):
    start = time.time()
    
    screenshot_start = time.time()
    screenshot = pyautogui.screenshot()
    screenshot_time = time.time() - screenshot_start
    
    save_start = time.time()
    screenshot.save(dir + '/' + str(num) +'.png')
    save_time = time.time() - save_start
    
    press_start = time.time()
    pyautogui.click(x,y)
    press_time = time.time() - press_start
    
    
    print(str(num) + '.png',
        "screenshot_time: " + str(round(screenshot_time, digit)) + "s",
        "save_time: " + str(round(save_time, digit)) + "s",
        "press_time: " + str(round(press_time, digit)) + "s",
        "total:" + str(round(time.time() - start, digit)) + "s")
```


## Simplified
### Click.py
```python
import os
import time
import pyautogui

dir = '/Users/john/Downloads/img'
start = int(input("start:  "))
end = 5
iter = end - start

if not os.path.isdir(dir):
    raise FileNotFoundError("Directory does not exist:", dir)

x = 1093
y = 848

print("starting screenshot.")
for _ in range(iter):
    screenshot = pyautogui.screenshot()
    screenshot.save(dir + '/' + str(start) +'.png')
    pyautogui.click(x,y)
    time.sleep(0.5)
    print(str(start) + '.png')
    start += 1
```

### Press.py
```python
import os
import time
import pyautogui
import random

dir = '/Users/john/Downloads/img'
start = int(input("start:  "))
end = 437
iter = end - start

if not os.path.isdir(dir):
    raise FileNotFoundError("Directory does not exist:", dir)

print("Move Cursor to get position.")
time.sleep(1)
print("3")
time.sleep(1)
print("2")
time.sleep(1)
print("1")
time.sleep(1)
digit = 3
time.sleep(3)
print("starting screenshot.")

for _ in range(iter):
    screenshot = pyautogui.screenshot()
    screenshot.save(dir + '/' + str(start) +'.png')
    pyautogui.press('right')
    print(str(start) + '.png')
    
    start += 1
    time.sleep(1)
    time.sleep(1)
```