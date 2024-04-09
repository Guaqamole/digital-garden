---
title: Dispatcher Servelet
date: 2023-12-09
draft: false
tags:
  - Springboot
complete: true
---
부제 : DispatcherServele를 중심으로 본 스프링 MVC 동작 원리

## 탄생배경, 자바 백엔드 웹 기술 역사
- 서블릿 (Servelet, 1997)
    - 서블릿은 `자바 기반의 동적 웹 앱을 개발할 때 사용하는 핵심 기술`.
        - Http 스펙
    - 자바 코드 내에서 뷰와 비즈니스 로직까지 처리.
        -` “<div> …”`
    - 단점으론 각 역할이 구분되지 않음.
- JSP (Java Server Pages, 1999)
    - HTML 코드에 자바 코드를 포함시켜 동적 웹 페이지를 구성한다. `(<%- %> 태그와 같은 방식)` 서블릿과 하는 일은 동일하지만 HTML 코드를 작성하기 간편하다는 장점이 있다.
    - HTML 생성은 편리하지만, 여전히 비즈니스 로직까지 너무 많은 역할 담당.
- 서블릿, JSP 조합 MVC 패턴 사용
    - 모델, 뷰, 컨트롤러로 역할을 나눠 개발함.
- MVC 프레임워크 춘추 전국 시대 (2000~2010)
    - MVC 패턴 자동화, 복잡한 웹 기술을 편리하게 사용할 수 있는 다양한 기능 지원
    - 스트럿츠, 웹워크, 스프링 MVC
- 애노테이션 기반의 스프링 MVC 등장
    - @Controller
    - MVC 프레임워크의 춘추 전국 시대 마무리
- 스프링 부트(2014)의 등장
    - 스프링 부트는 웹 서버(톰캣)를 내장
    - 과거엔 서버에 WAS를 직접 설치하고 소스는 War 파일을 만들어서 설치한 WAS에 배포했음
    - 스프링 부트는 빌드 결과(Jar)에 WAS 서버 포함 → 빌드 배포 자동화
- Web Servlet - Spring MVC
    ![](https://i.imgur.com/8X0dcD7.png)
    
    - 특징
        - `동기 블로킹 방식`, 사용자 요청마다 스레드를 계속 생성 → 쓰레드 풀 (200개) 생성
        - Thread Pool Hell 현상 : 많은 사용자가 동시 요청을 보내면 요청을 처리하지 못하는 문제 발생
- **Web Reactive - Spring WebFlux**
    - 특징
        - `비동기 논블로킹` 처리되어야 함. 특정 구간에서 블로킹이 발생한다면 Spring MVC에서의 문제점이 그대로 발생됨.
        - Node.js처럼 `Event Loop` 활용, **리액티브 프로그래밍**이 가능해짐.
        - 최소 스레드로 최대 성능 - 쓰레드 컨텍스트 스위칭 비용 효율화.
        - 함수형 스타일로 개발 - 동시처리 코드 효율화.
        - 서블릿 기술 사용 X.
    - 단점
        - 웹 플럭스는 기술적 난이도가 매우 높음.
        - 아직은 RDB 지원 부족.
        - 일반 MVC 쓰레드 모델도 충분히 빠름.
        - 실무에서 아직 많이 사용하지 않음.

## DispatcherServelet의 동작원리

### 정의
- **디스패처 서블릿**의 dispatch는 "보내다"라는 뜻을 가지고 있다. 그리고 이러한 단어를 포함하는 디스패처 서블릿은 HTTP 프로토콜로 들어오는 모든 요청을 가장 먼저 받아 적합한 컨트롤러에 위임해주는 프론트 컨트롤러(Front Controller)라고 정의할 수 있습니다.
- 이것을 보다 자세히 설명하자면, 클라이언트로부터 어떠한 요청이 오면 Tomcat(톰캣)과 같은 서블릿 컨테이너가 요청을 받게 됩니다. 그리고 이 모든 요청을 프론트 컨트롤러인 디스패처 서블릿이 가장 먼저 받게 됩니다. 그러면 디스패처 서블릿은 `**공통적인 작업을 먼저 처리한 후**`에 **해당 요청을 처리해야 하는 컨트롤러를 찾아서 작업을 `위임`**합니다.
- 여기서 Front Controller(프론트 컨트롤러)라는 용어가 사용되는데, `**Front Controller**`는 주로 서블릿 컨테이너의 제일 앞에서 서버로 들어오는 클라이언트의 모든 요청을 받아서 처리해주는 컨트롤러로써, MVC 구조에서 함께 사용되는 디자인 패턴입니다.
### 역할
- 과거에는 모든 서블릿을 URL 매핑을 위해 `web.xml`에 모두 등록해주어야 했지만, dispatcher-servlet이 해당 어플리케이션으로 들어오는 모든 요청을 핸들링해주고 공통 작업을 처리면서 상당히 편리하게 이용할 수 있게 되었습니다. 우리는 컨트롤러를 구현해두기만 하면 디스패처 서블릿가 알아서 적합한 컨트롤러로 위임을 해주는 구조가 되었습니다.
![](https://i.imgur.com/SAnobta.png)


### 클라이언트가 스프링 MVC 서버로부터 응답을 받기까지의 과정
- 클라이언트의 요청을 **디스패처 서블릿**이 받는다.
- 유저의 요청을 보고 요청을 처리할 수 있는지 **HandlerMapping**에서 핸들러 목록을 조회한다.
- 해당 요청을 처리할 수 있는 Adapter가 있는지 **HandlerAdapter**에서 어댑터 목록을 조회한다.
- 어댑터에서 핸들러를 호출한다.
- 컨트롤러에서 요청을 서비스 계층으로 위임한다.
- 서비스 계층에서 실제 비지니스 로직을 처리한다.
- 핸들러에서 처리된 값을 반환한다.
- 서버의 응답을 클라이언트로 반환한다.

### 자세한 설명
#### 1. 클라이언트의 요청을 **디스패처 서블릿**이 받는다. (서블릿 컨텍스트의 Filter를 먼저 거친다) 
![](https://i.imgur.com/XgMvAVo.png)


#### 2. 유저의 요청을 보고 요청을 처리할 수 있는지 **HandlerMapping**에서 핸들러 목록을 조회한다. 

```java
public interface HandlerMapping {
	@Nullable
	HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception;
}
```

@Controller에 @RequestMapping 관련 어노테이션을 사용해 컨트롤러를 작성하는 것이 일반적입니다. 하지만 예전 스펙을 따라 Controller 인터페이스를 구현하여 컨트롤러를 작성할 수도 있습니다. 즉, 컨트롤러를 구현하는 방법이 다양하기 때문에 스프링은 HandlerMapping 인터페이스를 만들어두고, 다양한 구현 방법에 따라 요청을 처리할 대상을 찾도록 되어 있습니다. 

오늘날 흔한 @Controller 방식은 `RequestMappingHandlerMapping`가 처리합니다. 이는 @Controller로 작성된 모든 컨트롤러를 찾고 파싱하여 HashMap으로 <요청 정보, 처리할 대상> 관리합니다. 여기서 처리할 대상은 HandlerMethod 객체로 컨트롤러, 메소드 등을 갖고 있는데, 이는 스프링이 리플렉션을 이용해 요청을 위임하기 때문입니다. 

그래서 요청이 오면 (Http Method, URI) 등을 사용해 요청 정보를 만들고, HashMap에서 요청을 처리할 대상(HandlerMethod)를 찾은 후에 HandlerExecutionChain으로 감싸서 반환합니다. HandlerExecutionChain으로 감싸는 이유는 컨트롤러로 요청을 넘겨주기 전에 처리해야 하는 인터셉터 등을 포함하기 위해서입니다. 

#### 3. 해당 요청을 처리할 수 있는 Adapter가 있는지 **HandlerAdapter**에서 어댑터 목록을 조회한다. 

```java
public interface HandlerAdapter {
	boolean supports(Object handler);
	@Nullable
	ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception;
}
```

스프링은 꽤나 오래 전에(2004년) 만들어진 프레임워크로, 트렌드를 굉장히 잘 따라갑니다. 프로그래밍 흐름에 맞게 스프링 역시 변화를 따라가게 되었는데, 그러면서 다양한 코드 작성 방식을 지원하게 되었습니다. 과거에는 컨트롤러를 Controller 인터페이스로 구현하였는데, Ruby On Rails가 어노테이션 기반으로 관례를 이용한 프로그래밍을 내세워 혁신을 일으키면서 스프링 역시 이를 도입하게 되었습니다. 

그래서 다양하게 작성되는 컨트롤러에 대응하기 위해 스프링은 HandlerAdapter라는 어댑터 인터페이스를 통해 **어댑터 패턴**을 적용함으로써 컨트롤러의 구현 방식에 상관없이 요청을 위임할 수 있도록 하였습니다. 

#### 4. 어댑터에서 핸들러를 호출한다. 

```java
public interface HandlerMethodArgumentResolver {
	boolean supportsParameter(MethodParameter parameter);
	@Nullable
	Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception;
}
```

```java
public interface HandlerMethodReturnValueHandler {
	boolean supportsReturnType(MethodParameter returnType);
	void handleReturnValue(@Nullable Object returnValue, MethodParameter returnType,
			ModelAndViewContainer mavContainer, NativeWebRequest webRequest) throws Exception;
}
```

핸들러 어댑터가 **컨트롤러로 요청을 위임한 전/후에 공통적인 전/후처리 과정이 필요합니다**. 대표적으로 인터셉터들을 포함해 요청 시에 @RequestParam, @RequestBody 등을 처리하기 위한 `ArgumentResolver`들과 응답 시에 ResponseEntity의 Body를 Json으로 직렬화하는 등의 처리를 하는 `ReturnValueHandler` 등이 핸들러 어댑터에서 처리됩니다. ArgumentResolver 등을 통해 파라미터가 준비 되면 리플렉션을 이용해 컨트롤러로 요청을 위임합니다. 

#### 5. 컨트롤러에서 요청을 서비스 계층으로 위임한다. 
#### 6. 서비스 계층에서 실제 비지니스 로직을 처리한다. 

비지니스 로직이 처리된 후에는 컨트롤러가 반환값을 반환합니다. 응답 데이터를 사용하는 경우에는 주로 ResponseEntity를 반환하게 되고, 응답 페이지를 보여주는 경우라면 String으로 View의 이름을 반환할 수도 있습니다. 요즘 프론트엔드와 백엔드를 분리하고, MSA로 가고 있는 시대에서는 주로 `ResponseEntity`를 반환합니다. 

#### 7. 핸들러에서 처리된 값을 반환한다. 

HandlerAdapter는 컨트롤러로부터 받은 응답을 응답 처리기인 ReturnValueHandler가 후처리한 후에 디스패처 서블릿으로 돌려줍니다. 만약 컨트롤러가 ResponseEntity를 반환하면 HttpEntityMethodProcessor가 MessageConverter를 사용해 응답 객체를 직렬화하고 응답 상태(HttpStatus)를 설정합니다. 만약 컨트롤러가 View 이름을 반환하면 ViewResolver를 통해 View를 반환합니다. 

#### 8. 서버의 응답을 클라이언트로 반환한다. 

디스패처 서블릿을 통해 반환되는 응답은 다시 필터들을 거쳐 클라이언트에게 반환됩니다. 이때 응답이 데이터라면 그대로 반환되지만, 응답이 화면이라면 View의 이름에 맞는 View를 찾아서 반환해주는 ViewResolver가 적절한 화면을 내려줍니다. 

- 전체 과정
- DispatcherServelet

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpServletRequest processedRequest = request;
		HandlerExecutionChain mappedHandler = null;
		boolean multipartRequestParsed = false;

		WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

		try {
			ModelAndView mv = null;
			Exception dispatchException = null;

			try {
				processedRequest = checkMultipart(request);
				multipartRequestParsed = (processedRequest != request);

				// 1. 핸들러 조회
				mappedHandler = getHandler(processedRequest);
				if (mappedHandler == null) {
					noHandlerFound(processedRequest, response);
					return;
				}

				// 2.핸들러 어댑터 조회-핸들러를 처리할 수 있는 어댑터
				HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

				// Process last-modified header, if supported by the handler.
				String method = request.getMethod();
				boolean isGet = HttpMethod.GET.matches(method);
				if (isGet || HttpMethod.HEAD.matches(method)) {
					long lastModified = ha.getLastModified(request, mappedHandler.getHandler());
					if (new ServletWebRequest(request, response).checkNotModified(lastModified) && isGet) {
						return;
					}
				}

				if (!mappedHandler.applyPreHandle(processedRequest, response)) {
					return;
				}

				// 3. 핸들러 어댑터 실행 -> 4. 핸들러 어댑터를 통해 핸들러 실행 -> 5. ModelAndView 반환
				mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

				if (asyncManager.isConcurrentHandlingStarted()) {
					return;
				}

				applyDefaultViewName(processedRequest, mv);
				mappedHandler.applyPostHandle(processedRequest, response, mv);
			}
			catch (Exception ex) {
				dispatchException = ex;
			}
			catch (Throwable err) {
				// As of 4.3, we're processing Errors thrown from handler methods as well,
				// making them available for @ExceptionHandler methods and other scenarios.
				dispatchException = new ServletException("Handler dispatch failed: " + err, err);
			}
			processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
		}
		catch (Exception ex) {
			triggerAfterCompletion(processedRequest, response, mappedHandler, ex);
		}
		catch (Throwable err) {
			triggerAfterCompletion(processedRequest, response, mappedHandler,
					new ServletException("Handler processing failed: " + err, err));
		}
		finally {
			if (asyncManager.isConcurrentHandlingStarted()) {
				// Instead of postHandle and afterCompletion
				if (mappedHandler != null) {
					mappedHandler.applyAfterConcurrentHandlingStarted(processedRequest, response);
				}
			}
			else {
				// Clean up any resources used by a multipart request.
				if (multipartRequestParsed) {
					cleanupMultipart(processedRequest);
				}
			}
		}
	}
```

```java
private void processDispatchResult(HttpServletRequest request, HttpServletResponse response, HandlerExecutionChain mappedHandler, ModelAndView mv, Exception exception) throws Exception {
		render(mv, request, response);
}
```

```java
protected void render(ModelAndView mv, HttpServletRequest request, HttpServletResponse response) throws Exception {
	View view;
		String viewName = mv.getViewName(); 
		
		//6. 뷰 리졸버를 통해서 뷰 찾기, 7.View 반환
	view = resolveViewName(viewName, mv.getModelInternal(), locale, request);
		
		// 8. 뷰 렌더링
	view.render(mv.getModelInternal(), request, response);
  }
```

- HandlerMaping
- HandlerAdapter
- ModelAndView

```java
public class ModelAndView {

	/** View instance or view name String. */
	@Nullable
	private Object view;

	/** Model Map. */
	@Nullable
	private ModelMap model;

	/** Optional HTTP status for the response. */
	@Nullable
	private HttpStatusCode status;

	/** Indicates whether this instance has been cleared with a call to {@link #clear()}. */
	private boolean cleared = false;

	/**
	 * Default constructor for bean-style usage: populating bean
	 * properties instead of passing in constructor arguments.
	 * @see #setView(View)
	 * @see #setViewName(String)
	 */
	public ModelAndView() {
	}

	/**
	 * Convenient constructor when there is no model data to expose.
	 * Can also be used in conjunction with {@code addObject}.
	 * @param viewName name of the View to render, to be resolved
	 * by the DispatcherServlet's ViewResolver
	 * @see #addObject
	 */
	public ModelAndView(String viewName) {
		this.view = viewName;
	}

	/**
	 * Convenient constructor when there is no model data to expose.
	 * Can also be used in conjunction with {@code addObject}.
	 * @param view the View object to render
	 * @see #addObject
	 */
	public ModelAndView(View view) {
		this.view = view;
	}

	/**
	 * Create a new ModelAndView given a view name and a model.
	 * @param viewName name of the View to render, to be resolved
	 * by the DispatcherServlet's ViewResolver
	 * @param model a Map of model names (Strings) to model objects
	 * (Objects). Model entries may not be {@code null}, but the
	 * model Map may be {@code null} if there is no model data.
	 */
	public ModelAndView(String viewName, @Nullable Map<String, ?> model) {
		this.view = viewName;
		if (model != null) {
			getModelMap().addAllAttributes(model);
		}
	}
```

- ViewResolver

```java
public interface ViewResolver {

	/**
	 * Resolve the given view by name.
	 * <p>Note: To allow for ViewResolver chaining, a ViewResolver should
	 * return {@code null} if a view with the given name is not defined in it.
	 * However, this is not required: Some ViewResolvers will always attempt
	 * to build View objects with the given name, unable to return {@code null}
	 * (rather throwing an exception when View creation failed).
	 * @param viewName name of the view to resolve
	 * @param locale the Locale in which to resolve the view.
	 * ViewResolvers that support internationalization should respect this.
	 * @return the View object, or {@code null} if not found
	 * (optional, to allow for ViewResolver chaining)
	 * @throws Exception if the view cannot be resolved
	 * (typically in case of problems creating an actual View object)
	 */
	@Nullable
	View resolveViewName(String viewName, Locale locale) throws Exception;

}
```

- View

```java
public interface View {
	void render(@Nullable Map<String, ?> model, HttpServletRequest request, HttpServletResponse response)
			throws Exception;
}
```

- 그외에도
- HandlerExceptionResolver
- LocaleResolver
- 스프링은 Locale 선택 방식을 변경할 수 있도록 LocaleResolver 라는 인터페이스를 제공하는데,
스프링 부트는 기본으로 Accept-Language 를 활용하는 AcceptHeaderLocaleResolver 를 사용한다.

```java
public interface LocaleResolver {
	  Locale resolveLocale(HttpServletRequest request);
	void setLocale(HttpServletRequest request, @Nullable HttpServletResponse
  response, @Nullable Locale locale);
}
```

- ThemeResolver
- MultipartResolver
- FlashMapMananger

### 제공하는 다양한 기능들이 정말 많지만..

- Filters
- Annotated
- Controllers
- Functional
- Endpoints
- URI Links
- Asynchronous Requests
- CORS
- Error Responses
- Web Security
- HTTP Caching
- View Technologies
- MVC Config
- HTTP/2