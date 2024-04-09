---
title: Spring Security
date: 2023-12-10
draft: false
tags:
  - Springboot
complete: true
---
## Spring Security란?

Spring 기반 애플리케이션의 보안을 담당하는 스프링 하위 프레임워크로 인증과 권한에 대한 부분을 필터의 흐름에 따라 처리한다.

Filter는 Dispatcher Servlet으로 가기 전에 적용되므로 가장 먼저 URL 요청을 받지만 (웹 컨테이너에서 관리),

Interceptor는 Dispatcher와 Controller 사이에 위치한다는 점에서 적용 시기의 차이가 있다. (스프링 컨테이너에서 관리)

![](https://i.imgur.com/eOtvYl5.png)


> Client(request) → Filter → DispatcherServlet → Interceptor → Controller
> 

Interceptor가 Controller로 요청을 위임하는 것은 아니며 거쳐서 가는 것이다.

### 인증(Authorization)과 인가(Authentication)란?
![](https://i.imgur.com/iIzjTsw.png)

- 인증(Authentication) : 사용자가 본인이 맞는지를 확인하는 절차
- 인가(Authorization) : 인증된 사요앚가 요청한 자원에 접근 가능한지를 결정하는 절차

→ 스프링 시큐리티는 인증 절차를 거친 후 인가 절차를 진행하게 되며 인가 과정에서 해당 리소스에 대한 접근 권한을 확인한다. 이 때, Principal을 아이디로, Credential을 비밀번호로 사용하는 Credential 기반의 인증 방식을 사용한다.

- Principal (접근 주체) : 보호받는 Resource에 접근하는 대상
- Credential(비밀번호) : Resource에 접근하는 대상의 비밀번호

## Filter란?

리스소에 대한 접근을 필터링하는 작업을 수행하는 객체를 위한 인터페이스

### 사용 이유

서블릿으로 요청이 전달되기 전 일괄적으로 수행해야할 작업이 필요하다. 이러한 작업들을 각 서블릿에서 직접 구현하게 되면 단일 책임 원칙을 위반하기도 하며 중복 코드와 복잡도가 증가하기 때문에 테스트가 어려워질 수 있다.따라서 서블릿 외부에서 공통기능을 핸들링 한 후 요청을 전달해주도록 사용하는 것이 Filter이다.

### 내부 구조

```java
public interface Filter {

   // 필터가 인스턴스화 될 때 서블릿 컨테이너가 호출
   public default void init(FilterConfig filterConfig) throws ServletException {}

   // 요청/응답 체인에서 필터를 거쳐갈 때 호출
  public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException;

   // 필터의 작업이 종료되거나 중단될 때 clean-up 작업을 수행
  public default void destroy() {}
}
```

### FilterChain이란?
![](https://i.imgur.com/HLuJxAg.png)

체인이란 연속된 필터로 이루어지는 것을 말한다. 필터는 1개 이상 존재할 수 있으며 각각의 필터는 맡은 작업을 수행하고 작업이 다음 필터에서 수행될 수 있도록 제어권을 넘겨주며 최종적으로 서블릿까지 도달한다.

### DelegatingFilterProxy
![](https://i.imgur.com/82POAMY.png)

Filter는 JavaEE 스펙이고 Tomcat같은 서블릿 컨테이너 영역에서 사용하는 객체이다. 때문에 스프링 어플리케이션 컨텍스트 외부 객체이므로 스프링 빈을 사용할 수 없다. 이를 위해 DelegatingFilterProxy라는 Filter 구현체를 제공한다.

해당 객체가 서블릿 컨테이너와 스프링 어플리케이션 컨텍스트 사이의 일종의 브릿지 역할을 함으로써 스프링 빈을 사용하는 필터를 구현할 수 있다.

### FilterChainProxy
![](https://i.imgur.com/byyH1zs.png)

- 스프링 시큐리티는 위에서 봤던 DelegatingFilterProxy에서 필터 동작을 위임할 빈 필터를 FilterChainProxy라는 클래스로 제공
- FilterChainProxy는 내부에 SecurityFilterChain을 구현한 필터들을 리스트로 가짐
- FilterChainProxy가 doFilter 동작을 위임받으면 다시 내부의 SecurityFilterChain 리스트들에게 필터링 동작 위임
- SpringSecurity 구현 시 설정하는 HttpSecurity를 주입받아 빈으로 생성하면 새로운 SecurityFilterChain을 정의하는 것이다.
    - HttpSecurity 클래스를 보면 DefaultSecurityFilterChain을 확인할 수 있다.

![](https://i.imgur.com/uLglBjM.png)

## 인터셉터란?

필터가 동작한 후 작동하며 Filter와 다르게 Spring에서 제공해주는 기능이다.
디스패처 서블릿이 컨트롤러를 호출하기 전과 후에 요청과 응답을 참조하거나 가공할 수 있는 기능을 제공한다.

### 용도

- 세부적인 보안 및 인증/인가 공통 작업 처리
- API 호출에 대한 로깅 또는 감사
- Controller로 넘겨주는 데이터의 가공

### 내부 구조

인터셉터 구현을 위해서는 HandlerInterceptor 인터페이스를 구현해야 한다.

```java
public interface HandlerInterceptor {

// 컨트롤러가 호출되기 전에 실행
   default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
         throws Exception {

      return true;
   }

	// 컨트롤러 작업 완료 후 실행
	// 컨트롤러 작업 중 예외 발생시 호출되지 않는다.
   default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
         @Nullable ModelAndView modelAndView) throws Exception {
   }

   // 모든 작업이 완료된 후 실행
	 // 컨트롤러 작업 중 예외 발생시에도 반드시 호출된다.
   default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
         @Nullable Exception ex) throws Exception {
   }

}

```

## SpringSecurity의 Login 인증 로직 플로우
![](https://i.imgur.com/ltSNyYm.png)


1. 사용자가 로그인 정보와 함께 인증 요청 (Http Request)
2. AuthenticationFilter가 요청을 가로채고, 가로챈 정보를 통해 UsernamePasswordAuthenticationToken 인증용 객체 생성
3. AuthenticationManager를 구현한 ProviderManager에게 생성한 UserPasswordToken 객체 전달
4. AuthenticationManager는 AuthenticationProvicer들을 조회하여 인증 요구
5. 전달받은 사용자 정보를 통해 UserDetailsService에서 DB에서 조회
6. DB에서 조회한 사용자 정보를 UserDetails 객체 생성하여 반환
7. AuthenticationProvider에서 조회된 UserDetails 객체와 전달받은 사용자정보를 비교하여 인증 진행
8. 인증이 완료된 사용자에 대해 권한 등의 사용자 정보를 담은 Authentication 객체를 반환
9. Authentication을 최초의 AuthenticationFilter에 반환
10. Authentication을 SecurityContext에 저장
→ SecurityContextFilter → SecurityContext → Authentication 순으로 접근하여 사용 가능

![](https://i.imgur.com/VNUX7dB.png)

## SpringSecurity의 Logout 플로우

사용자가 로그아웃 요청 시 SpringSecurity 필요 작업

- 세션 무효화
- 인증토큰 삭제
- 인증 토큰을 갖고있던 SecurityContext 또한 삭제
- 쿠키정보 삭제
- 로그인 페이지 혹은 홈으로 리다이렉트

동작 과정

![](https://i.imgur.com/HDcCGsu.png)


1. AntPathRequestMatcher를 통해 logout url이 들어왔는지 확인
2. Authentication 객체를 SecurityContext에서 찾고 해당 객체를 SecurityContextLogoutHandler로 전달
3. SecurityContextLogoutHandler를 통해 세션 무효화, 쿠키 삭제, SecurityContextHolder 내용 삭제 등의 작업 진행
4. SimpleUrlLogoutSuccessHander가 동작

## Spring Security 주요 모듈

### SecurityContextHolder
![](https://i.imgur.com/lyvZmiX.png)

- 보안 주체의 세부정보를 포함하여 응용프로그램의 현재 보안 컨텍스트에 대한 세부 정보 저장
    - Authentification 객체를 담고 있음
- SecurityContextHolder.MODE_INHERITABLETHREADLOCAL 방법과 SecurityContextHolder.MODE_THREADLCAL방법을 제공한다.
- ThreadLocal을 사용하여 따로 파라미터를 통해 전달하지 않아도 된다.
    - ThreadLocal - 동일 쓰레드 어디에서나 접근 가능
        - 파라미터로 데이터를 전달하지 않아도 됨
- 만약 값이 포함되어 있다면, 현재 인증된 사용자 정보로 사용된다.
- 사용자가 인증되었음을 나타내는 가장 간단한 방법은 SecurityContextHolder를 직접 설정하는 것이다.

### SecurityContext

- Authentication을 보관하는 역할

### Authentication

- 현재 접근하는 주체의 정보와 권한을 담은 인터페이스
    - 인자로 받은 필요한 정보 (username, password, jwt 등,,)
- Session에 저장되는 정보로 SecurityContextHolder 내부에 보관되는 SecurityContext에 저장된다.
    - SecurityContextHolder → SecurityContext → Authentication 순으로 접근 가능
- 내부 필드
    - principal
        - 식별된 사용자 정보를 보관한다. `UserDetails` 의 인스턴스이다.
        - 시스템에 따라 `UserDetails` 클래스를 상속하여, 커스텀한 형태로 유지할 수 있다.
    - credentials
        - 주체(사용자)가 올바르다는 것을 증명하는 자격 증명이다.
        - 보통 비밀번호를 의미하며 AuthenticationManager와 관련된 항목일 수 있다.
    - Authorities
        - AuthenticationManager가 설정한 권한을 의미한다.
        - Authentication 상태에 영향을 주지 안헉나 수정할 수 없는 인스턴스를 사용해야한다.

```java
public interface Authentication extends Principal, Serializable {
	// 현재 사용자의 권한 목록을 가져옴
   Collection<? extends GrantedAuthority> getAuthorities();
		//credential(주로 비밀번호)를 가져옴
   Object getCredentials();

   Object getDetails();
		//접근 대상에 대해 가져옴
   Object getPrincipal();

		// 인증여부를 가져옴
   boolean isAuthenticated();
		// 인증 여부를 설정
   void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;

}

```

### UsernamePasswordAuthenticationFilter

- 사용자 인증 요청을 Authentication 인터페이스로 추상화하고 AuthenticationManager를 호출한다.

### AuthenticationManager

- ID/PW를 인증하기 위해 적절한 AuthenticationProvider를 찾아 처리를 위임
- AuthenticationFilter에 의해 AuthenticationManager가 동작
- 인증 성공 시 인증이 성공한(isAuthenticated=true) 객체를 생성하여 SecurityContext에 저장
    - 인증 상태를 유지하기 위해 세션에 보관
- 인증이 실패한 경우 AuthenticationException을 발생시킴

### AuthenticationProvider

- 사용자 아이디/비밀번호 실제 인증에 대한 부분 처리
- Authentication 객체를 받아 인증이 완료된 객체를 반환하는 역할

### UserDetails

- 인증에 성공하면 생성되는 객체이며 UsernamePasswordAuthenticationToken을 생성하기 위해 사용됨
- 유저 정보와 스프링 시큐리티가 사용하는 Authentification 객체 사이의 어댑터

### UserDetailsService

- 유저 정보를 UserDetails 타입으로 가져오는 DAO(DataAcessObject) 인터페이스
- UserDetails 객체를 반환하는 단 하나의 메소드가 존재
- 일반적으로 이를 구현한 내부에 UserRepository를 주입받아 DB와 연결하여 처리한다.
    
    ```java
    public interface UserDetailsService {
    
        UserDetails loadUserByUsername(String var1) throws UsernameNotFoundException;
    
    }
    ```
    

### PasswordEncoding

패스워드 암호화에 사용될 구현체를 지정할 수 있다.

### GrantedAuthority

- 현재 사용자(Principal)가 가지고 있는 권한을 의미한다.
- `ROLE_ADMIN` 이나 `ROLE_USER`와 같이 `ROLE_*`의 형태로 사용
- UserDetailsService에 의해 불러올 수 있다.
- 특정 자원에 대한 권한이 있는지를 검사하며 접근 허용 여부를 결정한다.

## ****WebSecurityConfigurerAdapter Deprecated 대처 방법****

- 기존에 상속받아 사용되던 WebSecurityConfigurerAdapter가 Deprecated 되었다.

    ![](https://i.imgur.com/dwUGN6R.png)
    
    - 공식문서를 보면 SecurityFilterChain을 빈으로 등록하여 사용하라고 되어있다.
- 실제 SecurityFilterChain 사용 코드를 보면 아래와 같다.
    - WebSecurityConfigurerAdapter를 상속받으면 바로 호출 가능했던 AuthenticationManager도 따로 빈으로 등록하여 사용해야 한다.
    
    ```java
    @Configuration
    @EnableWebSecurity
    @RequiredArgsConstructor
    public class SecurityConfig {
    
        private final CorsConfig corsConfig;
        private final UserRepository userRepository;
        private final AuthenticationConfiguration authenticationConfiguration;
    
        @Bean
        public BCryptPasswordEncoder encodePwd() {
            return new BCryptPasswordEncoder();
        }
    
        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
            return authenticationConfiguration.getAuthenticationManager();
        }
    
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception {
            http.csrf().disable()
    							...
                .anyRequest().permitAll();
    
            return http.build();
        }
    }
    ```