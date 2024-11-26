**excel.py**
```python
from openpyxl import Workbook

# 엑셀파일 쓰기
write_wb = Workbook()

# 이름이 있는 시트를 생성
write_ws = write_wb.create_sheet('생성시트')

# Sheet1에다 입력
write_ws = write_wb.active
write_ws['A1'] = '숫자'

#행 단위로 추가
write_ws.append([1,2,3])

#셀 단위로 추가
write_ws.cell(5, 5, '5행5열')
write_wb.save("숫자.xlsx")
```


**pdf.py**
```python
import pdfplumber

def get_text(page):    
    text = page.extract_text()    # 한 페이지의 텍스트 추출 
    return text

def pdf2text(fname):
    pdf = pdfplumber.open(fname)  # pdf 파일 열기 
    pages = pdf.pages             # 페이지 추출
    text = ""
    for pg in pages:              # 모든 페이지에 대해서 
        text += get_text(pg)    
    return text

if __name__ == '__main__':
    print(pdf2text("한국항만기술단 견적서 220602.pdf"))
```