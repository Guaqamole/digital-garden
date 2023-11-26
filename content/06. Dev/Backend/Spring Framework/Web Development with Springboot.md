---
title: Web Dev with Spring
date: 2023-11-25
draft: false
tags:
  - Springboot
  - Concept
complete: true
---
스프링으로 웹개발을 하려면 세가지 방법이있다.
## 1. 정적 컨텐츠
별도의 서버 작업 (DB 접근) 없이 파일을 브라우저에 [[렌더링 (Rendering)|렌더링]] 하는것. 스프링의 경우 자동으로 `static` , `resource`, `public` 폴더에서 정적 컨텐츠를 찾아서 렌더링 한다.

![](https://i.imgur.com/a6xMtjZ.png)

## 2. [[MVC Pattern|MVC]]와 템플릿 엔진
JSP, PHP와 같은 템플릿 엔진이 대표적이다. HTML을 그냥 주는게아니라 서버단에서 처리를 한 결과를 브라우저로 출력하는 방식. 주로 MVC 모델을 많이 활용한다.

![](https://i.imgur.com/1jCSnSt.png)


> [!NOTE] MVC
> 예전에는 JSP로 로직처리와 뷰를 한꺼번에 개발하는 model 1 방식을 많이사용했다면 현재는 모델, 뷰의 역할을 나누는 model 2 방식을 많이 사용한다.

**Controller**
```java
@Controller
public class HelloController {

	@GetMapping("hello")
	public String helloMvc(@RequestParam("name") String name, Model mdodel) {
		model.addAttribute("name", name);
		return "hello-template";
	}
}
```

**View**
```html
<html xmlns:th="http://www.thymeleaf.org">
	<body>
		<p th:text="'hello ' + ${name}">hello! empty</p>
	</body>
</html>
```
## 3. [[REST API with Springboot|API]]
1. 만약에 안드로이드와 아이폰의 클라이언트를 개발해야할경우 JSON 포맷 데이터를 클라이언트에게 RESTful 하게 전달하여 사용할 수 있다.
2. 서버끼리 통신 할 경우 HTML 렌더링 작업 자체가 필요 없기 떄문에 API를 많이 사용한다.

**`@ResponseBody` 문자 (string) 반환**
- `@ResponseBody` 를 사용하면 뷰 리졸버를 사용하지 않음
- 대신에 HTTP BODY에 문자내용을 직접 반환(HTML BODY TAG)를 말하는것이 아님.
```java
@Controller
public class HelloController {

	@GetMapping("hello-string")
	@ResponseBody
	public String helloString(@RequestParam("name") String name) {
		return "hello" + name;
	}
}
```

**`@ResponseBody` 객체 (object) 반환**
- `@ResponseBody`를 사용하고, 객체를 반환하면 객체가 JSON으로 변환됨.
```java
@Controller
public class HelloController {

	@GetMapping("hello-string")
	@ResponseBody
	public String helloString(@RequestParam("name") String name) {
		Hello hello = new Hello(); // 객체 선언
		hello.setName(name); // Setter 호출
		return hello; // Setter에 의해 상태가 변한 객체를 반환
	}

	static class Hello {
		private String name;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	}
}
```