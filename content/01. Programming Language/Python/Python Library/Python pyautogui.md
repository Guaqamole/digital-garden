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

## Screenshot
```python
import os
import time
import pyautogui

dir = input("directory to save screenshots ('/Users/avokey/Downloads/images'): ")

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
position = pyautogui.position()
x, y = position.y, position.y
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
    pyautogui.press('right')
    press_time = time.time() - press_start
    
    
    print(str(num) + '.png',
        "screenshot_time: " + str(round(screenshot_time, digit)) + "s",
        "save_time: " + str(round(save_time, digit)) + "s",
        "press_time: " + str(round(press_time, digit)) + "s",
        "total:" + str(round(time.time() - start, digit)) + "s")
```