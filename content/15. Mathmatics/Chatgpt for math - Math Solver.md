---
title: Chatgpt for math - Math Solver
date: 2024-11-05
draft: false
tags:
  - Prompt
  - Math
complete: true
---
## pdf_extractor
```python
cli로 pdf에서 특정 페이지를 추출하는 python 프로그램을 만들어줘.
1. pdf를 import 하는 기능 + (file name as argument)
2. page를 선택하는 기능 + as argument
3. 추출한 페이지를 pdf로 export하는 기능 (파일 이름 입력 포함) + as argument
4. 하나의 Python 파일로 만들어줘.
5. user interface는 필요없어 (no tkinter)
6. 모든 arugments가 single command line으로 나오게해줘
```

### setup
```python
cd ~/playground/python && python3 -m venv pdf_extractor && cd pdf_extractor && source bin/activate
/Users/john/playground/python/pdf_extractor/bin/python3 -m pip install --upgrade pip
pip install PyPDF2
```

### code
```python
import sys
from PyPDF2 import PdfReader, PdfWriter

def extract_pages(pdf_path, start_page, end_page, output_path):
    """
    PDF 파일에서 특정 페이지 범위를 추출하여 새 PDF로 저장합니다.
    :param pdf_path: 원본 PDF 파일 경로
    :param start_page: 추출할 시작 페이지 (1부터 시작)
    :param end_page: 추출할 끝 페이지 (1부터 시작)
    :param output_path: 저장할 PDF 파일 경로
    """
    try:
        # PDF 파일 열기
        reader = PdfReader(pdf_path)
        writer = PdfWriter()

        # 페이지 유효성 검사
        if start_page < 1 or end_page > len(reader.pages) or start_page > end_page:
            print("페이지 범위가 유효하지 않습니다.")
            sys.exit(1)

        # 지정된 페이지 범위 추출
        for page_num in range(start_page - 1, end_page):
            writer.add_page(reader.pages[page_num])

        # 결과를 새 PDF 파일로 저장
        with open(output_path, "wb") as output_pdf:
            writer.write(output_pdf)

        print(f"PDF 페이지가 성공적으로 추출되었습니다: {output_path}")
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) < 5:
        print("사용법: python extract_pdf.py <PDF 파일 경로> <시작 페이지> <끝 페이지> <출력 파일 이름>")
        sys.exit(1)

    # 명령줄 인자에서 입력값 가져오기
    pdf_path = sys.argv[1]
    try:
        start_page = int(sys.argv[2])
        end_page = int(sys.argv[3])
    except ValueError:
        print("시작 페이지와 끝 페이지는 정수여야 합니다.")
        sys.exit(1)
    output_path = sys.argv[4]

    # 페이지 추출 함수 호출
    extract_pages(pdf_path, start_page, end_page, output_path)

if __name__ == "__main__":
    main()
```

### run
```python
python extract_pdf.py <PDF 파일 경로> <시작 페이지> <끝 페이지> <출력 파일 이름>
python pdf_extractor.py ~/Downloads/개발자를\ 위한\ 필수\ 수학.pdf 1 10 test.pdf
```


## image extractor
```python
pip install pymupdf
```

```python
import sys
import os
import fitz  # PyMuPDF

def extract_images(pdf_path, start_page, end_page, output_dir):
    """
    PDF 파일에서 특정 페이지 범위의 이미지를 추출하여 지정된 폴더에 저장합니다.
    :param pdf_path: 원본 PDF 파일 경로
    :param start_page: 추출할 시작 페이지 (1부터 시작)
    :param end_page: 추출할 끝 페이지 (1부터 시작)
    :param output_dir: 이미지를 저장할 폴더 경로
    """
    try:
        # PDF 파일 열기
        pdf_document = fitz.open(pdf_path)
        if start_page < 1 or end_page > pdf_document.page_count or start_page > end_page:
            print("페이지 범위가 유효하지 않습니다.")
            sys.exit(1)

        # 출력 폴더 생성
        os.makedirs(output_dir, exist_ok=True)

        # 지정된 페이지 범위에서 이미지 추출
        for page_num in range(start_page - 1, end_page):
            page = pdf_document[page_num]
            images = page.get_images(full=True)

            if not images:
                print(f"{page_num + 1} 페이지에 이미지를 찾을 수 없습니다.")
                continue

            # 각 이미지 저장
            for img_index, img in enumerate(images, start=1):
                xref = img[0]
                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]  # 이미지 확장자

                image_filename = os.path.join(output_dir, f"page_{page_num + 1}_img_{img_index}.{image_ext}")
                with open(image_filename, "wb") as image_file:
                    image_file.write(image_bytes)

                print(f"이미지 저장됨: {image_filename}")

        pdf_document.close()
        print("이미지 추출 완료.")
        
    except Exception as e:
        print(f"오류가 발생했습니다: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) < 5:
        print("사용법: python extract_image.py <PDF 파일 경로> <출력 폴더> <시작 페이지> <끝 페이지>")
        sys.exit(1)

    # 명령줄 인자에서 입력값 가져오기
    pdf_path = sys.argv[1]
    output_dir = sys.argv[2]
    try:
        start_page = int(sys.argv[3])
        end_page = int(sys.argv[4])
    except ValueError:
        print("시작 페이지와 끝 페이지는 정수여야 합니다.")
        sys.exit(1)

    # 이미지 추출 함수 호출
    extract_images(pdf_path, start_page, end_page, output_dir)

if __name__ == "__main__":
    main()
```

```python
python extract_image.py example.pdf output 10 20
python image_extractor.py ~/Downloads/개발자를\ 위한\ 필수\ 수학.pdf ~/Downloads/math 33 36
```

## Prompt
```python
나는 데이터 사이언스를 위한 수학을 공부하는 개발자야. 나의 수학 선생님이 되어줘.
1. 특정 주제에 대한 pdf 혹은 image를 추출해서 너에게 첨부할거야 (선형대수, 통계, 미분등)
2. pdf & image를 학습하고 해당 주제에 대해 문제 set을 만들어줘. 
3. 정답이 숫자로 떨어지는 문제는 5개 예) f(x) = x^2 + 1 -> f(3)은?
4. 개념적인 문제 3개
5. 이후 정답 set까지 따로 만들어줘.
6. 숫자 문제 난이도는 easy * 2, medium * 2, hard * 1로 총 5문제씩 내줘.
7. 개념 문제 난이도는 easy, medium, hard 총 3문제.
8. 특정 챕터 range를 너에게 알려줄거야. (ex. 1.3 chapter only.)
```

```python
나는 데이터 사이언스를 위한 수학을 공부하는 개발자야. 나의 수학 선생님이 되어줘.
1. 수학 주제에 대한 목차 image를 추출해서 너에게 첨부할거야 (선형대수, 통계, 미분등)
2. 목차를 학습하고 해당 주제에 대해 문제 set을 만들어줘. 
3. 각 목차별로 정답이 숫자로 떨어지는 문제는 5개 예) f(x) = x^2 + 1 -> f(3)은?
4. 각 목차별로 개념적인 문제 3개
5. 이후 정답 set까지 따로 만들어줘.
6. 숫자 문제 난이도는 easy * 2, medium * 2, hard * 1로 총 5문제씩 내줘.
7. 개념 문제 난이도는 easy, medium, hard 총 3문제.
```