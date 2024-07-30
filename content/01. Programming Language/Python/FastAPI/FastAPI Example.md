---
title: FastAPI Example
date: 2024-07-29
draft: false
tags:
  - Python
  - FastAPI
complete: true
---
# OVERVIEW

## Basic Commands
### start
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def first_api():
    return {"message": "Hello Eric!"}
```

#### uvicorn
```python
uvicorn books:app --reload
# or
python -m uvicorn books:app --reload
```

#### fastapi
```python
# production
fastapi_cli run books.py

# development mode
fastapi_cli dev books.py
```



# Project 1: Books (Basics)
## DATA
```bash
BOOKS = [
    {'title': 'Title One', 'author': 'Author One', 'category': 'science'},
    {'title': 'Title Two', 'author': 'Author Two', 'category': 'science'},
    {'title': 'Title Three', 'author': 'Author Three', 'category': 'history'},
    {'title': 'Title Four', 'author': 'Author Four', 'category': 'math'},
    {'title': 'Title Five', 'author': 'Author Five', 'category': 'math'},
    {'title': 'Title Six', 'author': 'Author Two', 'category': 'math'}
]
```


## GET
get 요청은 body가 없기 때문에 별도의 모듈을 임포트 할 필요가 없다.
### Path Parameters
```python
from fastapi import FastAPI

BOOKS = [
    {'title': 'Title One', 'author': 'Author One', 'category': 'science'},
    ...
]

app = FastAPI()

@app.get("/books")
async def read_all_books():
    return BOOKS


@app.get("/books/{book_title}")
async def read_book(book_title: str):
    for book in BOOKS:
        if book.get('title').casefold() == book_title.casefold():
            return book
        
        
curl -X 'GET' \
  'http://localhost:8000/books/title%20one' \
  -H 'accept: application/json'
```


### Query Parameters
```python
@app.get("/books/")
async def read_category_by_query(category: str):
    books_to_return = []
    for book in BOOKS:
        if book.get('category').casefold() == category.casefold():
            books_to_return.append(book)
    return books_to_return

curl -X 'GET' \
  'http://localhost:8000/books/?category=science' \
  -H 'accept: application/json'
```


### Path & Query
```python
@app.get("/books/{book_author}/")
async def read_author_category_by_query(
        book_author: str,
        category: str
):
    books_to_return = []

    for book in BOOKS:
        if book.get('author').casefold() == book_author.casefold() and \
                book.get('category').casefold() == category.casefold():
            books_to_return.append(book)
    return books_to_return
```


## POST
request에 body를 추가하려면 아래 모듈을 임포트해준다.
```python
from fastapi import Body
```

```python
@app.post("/books/create_book")
async def create_book(new_book=Body()):
    BOOKS.append(new_book)
```


## PUT
-   update data
```python
@app.put("/books/update_book")
async def update_book(updated_book=Body()):
    for i in range(len(BOOKS)):
        if BOOKS[i].get('title').casefold() == updated_book.get('title').casefold():
            BOOKS[i] = updated_book
```


## DELETE
```python
@app.delete("/books/delete_book/{book_title}")
async def update_book(book_title: str):
    for i in range(len(BOOKS)):
        if BOOKS[i].get('title').casefold() == book_title.casefold():
            BOOKS.pop(i)
            break
```



# Project 2: OOP Book
-   Data Validataion
-   Exception Handling
-   Status Code
-   Swagger Config
-   Python Request Objects
-   Project Structure

## Project Structure
-   api
    -   v1
        -   models
        -   routes
        -   schemas (request/response)
-   core
-   db
-   tests
-   utils
    -   logging
```
base_project
└── backend
    ├── app
    │   ├── api
    │   │   ├── main.py
    │   │   └── v1
    │   │       ├── models
    │   │       │   └── book.py
    │   │       ├── routes
    │   │       │   └── book.py
    │   │       └── schemas
    │   │           └── book.py
    │   ├── core
    │   │   └── config.py
    │   ├── db
    │   ├── tests
    │   └── utils
    │       └── logging
    │   ├── dependencies.py
    │   ├── main.py
    ├── README.md
    └── requirements.txt
└── frontend
...
```



### api
#### app/main.py
```python
from fastapi import FastAPI

from app.api.main import api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(api_router)
```

#### app/api/v1/main.py
```python
from fastapi import APIRouter

from app.api.routes import book

api_router = APIRouter()
api_router.include_router(book.router, prefix="/books")
```

#### app/api/v1/routes/book.py
```python
from app.api.v1.models.book import Book
from app.api.v1.schemas.book import BookRequest
from fastapi import APIRouter, Body

BOOKS = [
    Book(1, 'Computer Science Pro', 'codingwithroby', 'A very nice book!', 5, 2030),
    Book(2, 'Be Fast with FastAPI', 'codingwithroby', 'A great book!', 5, 2030),
    Book(3, 'Master Endpoints', 'codingwithroby', 'A awesome book!', 5, 2029),
    Book(4, 'HP1', 'Author 1', 'Book Description', 2, 2028),
    Book(5, 'HP2', 'Author 2', 'Book Description', 3, 2027),
    Book(6, 'HP3', 'Author 3', 'Book Description', 1, 2026)
]

router = APIRouter()

@router.get("/all")
async def read_all_books():
    return BOOKS


@router.post("/create-book")
async def create_book(book_request=Body()):
    BOOKS.append(book_request)
```

#### app/api/v1/models/book.py
```python
class Book:
    id: int
    title: str
    author: str
    description: str
    rating: int
    published_date: int

    def __init__(self, id, title, author, description, rating, published_date):
        self.id = id
        self.title = title
        self.author = author
        self.description = description
        self.rating = rating
        self.published_date = published_date
```

#### app/api/v1/schemas/book.py
```python
from typing import Optional
from pydantic import BaseModel, Field

class BookRequest(BaseModel):
    id: Optional[int] = Field(description='ID is not needed on create', default=None)
    title: str = Field(min_length=3)
    author: str = Field(min_length=1)
    description: str = Field(min_length=1, max_length=100)
    rating: int = Field(gt=0, lt=6)
    published_date: int = Field(gt=1999, lt=2031)

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "A new book",
                "author": "codingwithroby",
                "description": "A new description of a book",
                "rating": 5,
                'published_date': 2029
            }
        }
    }
```


### core
#### app/core/config.py
```python
import pydantic

# pip install pydantic-settings
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "test"

settings = Settings()
```

### start
```python
python -m uvicorn app.main:app --reload
```



## Data Validation

