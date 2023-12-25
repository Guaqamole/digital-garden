---
title: REST API with Springboot DB
date: 2023-11-30
draft: false
tags:
  - Backend
  - Springboot
  - API
  - Database
  - ORM
complete: true
---
## Spring Initializr
### Setting
- Maven
- Java 17
- 3.2.0
- jar
### Dependency
- Dev Tools: Lombok, Spring Configuration Processor
- Web: Spring Web
- SQL: Spring Data JPA, Mysql Driver
### application.properties
```
# Spring DataSource (MySQL)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/데이터베이스명?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC
spring.datasource.username=아이디
spring.datasource.password=비밀번호

# Spring JPA
spring.jpa.database=mysql
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=none
spring.jpa.generate-ddl=false
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## Entity
Spring Data JPA를 사용하면 데이터베이스에 테이블을 생성하기 위해 직접 쿼리를 작성 할 필요가 없다. 이 기능을 가능하게 하는것이 엔티티이다. JPA에서 엔티티는 데이터베이스의 테이블에 대응하는 클래스이다. 엔티티에는 데이터베이스에 쓰일 테이블과 칼럼을 정의한다. 엔티티에 어노테이션을 사용하면 테이블 간의 연관관계를 정의 할 수 있다. 

다음과 같은 테이블을 만든다고 해보자:
![|350](https://i.imgur.com/iNIAkEp.png)

```java
import jakarta.persistence.*;  
import java.time.LocalDateTime;  
  
@Entity  
@Table(name = "product")  
public class Product {  

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long number;  
  
    @Column(nullable = false)  
    private String name;  
  
    @Column(nullable = false)  
    private Integer price;  
    
    @Column(nullable = false)  
    private Integer stock;  
  
    private LocalDateTime regist_dt;  
  
    private LocalDateTime update_dt;  
  
    public Long getNumber() {  
        return number;  
    }  
  
    public void setNumber(Long number) {  
        this.number = number;  
    }  

    ... getter / setter 생략.
}
```

---
## Repository Interface 설계
Spring Data JPA는 `JPARepository`를 기반으로 더욱 쉽게 데이터베이스를 사용할 수 있는 아키텍처를 제공한다. 스프링 부트로 `JPARepository`를 상속하는 인터페이스를 생성하면 기존의 다양한 메서드를 손쉽게 활용할 수 있다.
### Create Repository Interface
여기서 말하는 리포지토리는 Spring Data JPA가 제공하는 인터페이스이다. 엔티티를 데이터베이스의 테이블 구조를 생성하는데 사용했다면, 리포지토리는 엔티티가 생성한 테이터베이스에 접근하는데 사용된다.

리포지토리를 생성하기 위해서는 접근하려는 테이블과, 매핑되는 엔티티에 대한 인터페이스를 생성하고, 아래 예제처럼 `JPARepository` 를 상속 받으면 된다.

![|546](https://i.imgur.com/xtasODC.png)

**ProductRepository.java**
```java
import com.marketboro.db.data.entity.Product;  
import org.springframework.data.jpa.repository.JpaRepository;  
  
public interface ProductRepository extends JpaRepository<Product, Long> {  
}
```

#### JPA Repository의 상속구조
![](https://i.imgur.com/ZMtzwnB.png)

일반적으로 CRUD 에서 따로 생성 해서 사용하는 메서드는 대부분 READ 부분에 해당하는 SELECT 쿼리 밖에 없다. 엔티티를 저장하거나 갱신 또는 삭제할 때는 별도의 규칙이 필요하지 않기 때문이다.
다만, 리포지토리에서 기본적으로 제공하는 조회 메서드는 기본값으로 단일 조회하거나 전체 엔티티를 조회하는 것만 지원하고 있기 때문에 필요에 따라 다른 조회 메서드가 필요하다.

### Query Method
메서드에 이름을 붙일 떄는 첫 단어를 제외한 이후 단어들의 첫 글자를 대문자로 설정해야 쿼리를 만들어준다. 앞서 만들어둔 `name` , `email`, `company`로 예시를 들어보자.

`findBy`
- SQL 문의 where 절 역할을 수행하는 구문.
- 예시) `findByName(String name)`
`findByNameAndEmail`
- AND, OR 조건을 여러개 설정하기 위해 사용.
- 예시) `findByNameAndEmail(String name, String email)`
`Containing, Contains, isContaining`
- Like와 동일한 기능을 수행하며 특정 문자를 포함하는지 여부를 조건으로 추가.
… 이외에도 많다.

---
## [[DAO]] 설계 (for crud)
DAO 클래스는 일반적으로 ‘인터페이스-구현체’ 구성으로 생성한다. DAO 클래스는 의존성 결합을 낮추기 위한 디자인 패턴이며, 서비스 레이어에 DAO 객체를 주입 받을 때 인터페이스를 선언하는 방식으로 구성 할 수 있다. 
![|525](https://i.imgur.com/inXhiNX.png)

### 1. DAO interface
우선 기본적인 CRUD 를 다루기 위해 인터페이스에 메서드를 정의한다.
**ProductDAO.java**
```java
public interface ProductDAO {  
    Product insertProduct(Product product);  
    Product selectProduct(Long number);  
    Product updateProduct(Long number, String name) throws Exception;  
    void deleteNumber(Long number) throws Exception;  
}
```

#### 리턴값에 대한 의견들
일반적으로 데이터베이스에 접근하는 메서드는 리턴값으로 데이터 객체를 전달한다. 이때, 데이터 객체를 엔티티 객체로 전달할지, DTO 객체로 전달하지에 대해서는 의견이 분분하다. 일반적인 설계 원칙에서 엔티티 객체는 데이터베이스에 접근하는 계층에서만 사용하도록 정의한다. 반대로 다른 계층으로 데이터를 전달할때는 DTO 객체를 사용한다. 하지만 이부분은 회사마다 견해 차이가 있으므로 각자 정해진 원칙에 따라 진행한다.

이제 **인터페이스의 설계를 마쳤다면, 해당 인터페이스의 구현체를 만들어야 한다.** 그것이 바로 Impl 클래스이다.

### 2. DAO Impl.
**ProductDAOImpl.java**
```java
@Component  
public class ProductDAOImpl implements ProductDAO {  

    private final ProductRepository productRepository;  
    
    @Autowired  
    public ProductDAOImpl(ProductRepository productRepository) {  
        this.productRepository = productRepository;  
    }  
    @Override  
    public Product insertProduct(Product product) {  
        return null;  
    }  
      
    public Product selectProduct(Long number) {  
        return null;  
    }  
      
    public Product updateProduct(Long number, String name) throws Exception {  
        return null;  
    }  
      
    public void deleteProduct(Long number) throws Exception {  
          
    }  
}
```

> [!info] `@Component`
> `ProductDAOImpl` 클래스를 스프링이 관리하는 빈으로 등록하려면 컴포넌트 또는 `@Service` 어노테이션을 지정해야한다. 빈으로 등록된 객체는 다른 클래스가 인터페이스를 가지고 의존성을 주입받을때 이 구현체를 찾아 주입하게 된다.

마찬가지로, DAO 객체엣도 데이터베이스에 접근하기 위해 리포지토리 인터페이스를 사용해 의존성 주입을 받아야한다. 리포지토리를 정의하고 생성자를 통해 의존성 주입을 받으면 된다.

이제 구현체를 만들었으니, 실제 메서드를 구현하는 일만 남았다.

### 3. Method Impl.
**ProductDAOImpl.java**  → `insertProduct()`
```java
@Override  
public Product insertProduct(Product product) {  
    Product savedProduct = productRepository.save(product);  
    return savedProduct;  
}
```
 - return 문에 한줄로 코드를 작성 할 수 있지만, 예외 처리를 하거나 코드사이에 로그를 삽입해야할 수도 있기 때문에 서로 구분해서 작성.
- 리포지토리를 생성할 때 인터페이스에서 따로 메서드를 구현하지 않아도 JPA에서 기본 메서드를 제공하므로 위와 같이 `save()` 메서드를 활용 할 수 있다.

**ProductDAOImpl.java**  → `selectProduct()`
```java
@Override  
public Product selectProduct(Long number) {  
    Product selectedProduct = productRepository.getById(number);  
    return selectedProduct;  
}
```

리포지토리에서 단건 조회를 위한 기본 메서드로 두가지를 제공한다:
#### `getById()`
내부적으로 `EntityManager`의 `getReference()` 메서드를 호출한다. `getReference()` 메서드를 호출하면 프락시 객체를 리턴한다. 실제 쿼리는 프락시 객체를 통해 최초로 데이터에 접근하는 시점에 실행된다. 이떄 데이터가 존재하지 않는 경우에는 `EntityNotFoundException` 이 발생한다. `JpaRepository`의 실제 구현체인 `SimpleJpaRepository`의 `getById()` 메서드는 아래와 같다.

```java
public T getById(ID id ) {
	Assert.notNull(id, ID_MUST_NOT_BE_NULL);
	return em.getReference(getDomainClass(), id);
}
```

#### `findById()`
내부적으로 `EntityManager`의 `find()` 메서드를 호출한다. 이 메서드는 영속성 컨텍스트의 캐시에서 값을 조회한후, 영속성 컨텍스트에 값이 존재하지 않는다면 실제 데이터베이스에서 데이터를 조회한다. 리턴 값으로 Optional 객체를 전달한다. `SimpleJpaRepository`의 `findById()` 메서드는 아래 예제와 같다.
```java
public Optional<T> findById(ID id) {

	Assert.notNull(id, ID_MUST_NOT_BE_NULL);

	Class<T> domainType = getDomainClass();

	if (metadata == null) {
		return Optional.ofNullable(em.find(domainType, id));
	}

	LockModeType type = metadata.getLockModeType();

	Map<String, Object> hints = new HashMap<>();
	getQueryHints().withFetchGraphs(em).forEach(hints::put);

	return Optional.ofNullable(type == null ? em.find(domainType, id, hints) : em.find(domainType, id, type, hints));
}
```


**ProductDAOImpl.java**  → `updateProduct()`
```java
@Override  
public Product updateProduct(Long number, String name) throws Exception {  
    Optional<Product> selectedProduct = productRepository.findById(number);  
  
    Product updatedProduct;  
    if (selectedProduct.isPresent()) {  
        Product product = selectedProduct.get();  
  
        product.setName(name);  
        product.setUpdate_dt(LocalDateTime.now());  
  
        updatedProduct = productRepository.save(product);  
    } else {  
        throw new Exception();  
    }  
    return updatedProduct;  
}
```

Jpa에서 데이터의 값을 변경할 때는 다른 메서드와는 다른 점이 있다. JPA는 값을 갱신 할 때 `update` 라는 키워드를 사용하지 않는다. 여기서 영속성 컨텍스트를 활용해 값을 갱신하는데, `find()` 메서드를 통해 데이터베이스에서 값을 가져오면 가져온 객체가 영속성 컨텍스트에 추가된다. 

영속성 컨텍스트가 유지되는 상황에서 객체의 값을 변경하고 다시 `save()` 를 실행하면 JPA에서는 더티 체크라고 하는 변경 감지를 수행한다.

**ProductDAOImpl.java**  → `deleteProduct()`
```java
@Override  
public void deleteProduct(Long number) throws Exception {  
    Optional<Product> selectedProduct = productRepository.findById(number);  
  
    Product deletedProduct;  
    if (selectedProduct.isPresent()) {  
        Product product = selectedProduct.get();  
  
        productRepository.delete(product);  
    } else {  
        throw new Exception();  
    }  
}
```
데이터베이스의 레코드를 삭제하기 위해서는 삭제하고자 하는 레코드와 매핑된 영속객체를 영속성 컨테스트에서 가져와야한다. `deleteProduct()` 메서드는 `finById()` 메서드를 통해 객체를 가져오는 작업을 수행하고 `delete()` 메서드를 통해 해당 객체를 삭제하게끔 삭제 요청을 한다.

---
## DAO 연동을 위한 컨트롤러와 서비스 설계
이제 앞에서 설계한 구성 요소들을 클라이언트의 요청과 연결하려면 컨트롤러와 서비스를 생성해야한다. 이를 위해 먼저 DAO의 메서드를 호출하고 그외 비즈니스 로직을 수행하는 서비스 레이어을 생성한 후 컨트롤러를 실행한다.

### 1. Service Class
서비스 레이어에서는 도메인 모델을 활용해 애플리케이션에서 제공하는 핵심 기능을 제공한다. 여기서 말하는 핵심 기능을 구현하려면 세부 기능을 정의해야하는데, 세부 기능이 모여 핵심 기능을 구현하기 때문이다. 

이러한 모든 로직을 서비스 레이어에서 포함하기란 쉽지 않다. 이 같은 아키텍처의 한계를 극복하기 위해 아키텍처를 서비스 로직과 비즈니스 로직으로 분리하기도한다. 도메인을 활용한 세부 기능들을 비즈니스 레이어의 로직에서 구현하고, 서비스 레이어에서는 기능들을 종합해서 핵심 기능을 전달하도록 구성하는 경우가 대표적이다.

서비스 객체는 DAO와 마찬가지로 추상화해서 구성한다. 아래와 같이 `service` 패키지와 클래스, 인터페이스를 구성한다.
![](https://i.imgur.com/TLf6rTJ.png)

그다음에, 다른 레이어간 데이터 객체가 오고가는것을 위해 DTO 클래스를 생성한다. `data` 패키지안에 `dto` 패키지를 생성하고 `ProductDto`와 `ProductResponseDto` 클래스를 생성한다.

**ProductDto.java**
```java
public class ProductDto {  
  
    private String name;  
    private int price;  
    private int stock;  
  
    public ProductDto(String name, int price, int stock) {  
        this.name = name;  
        this.price = price;  
        this.stock = stock;  
    }  
  
    public String getName() {  
        return name;  
    }  
  
    public void setName(String name) {  
        this.name = name;  
    }  
  
    public int getPrice() {  
        return price;  
    }  
  
    public void setPrice(int price) {  
        this.price = price;  
    }  
  
    public int getStock() {  
        return stock;  
    }  
  
    public void setStock(int stock) {  
        this.stock = stock;  
    }  
}
```

**ProductResponseDto.java**
필요에 따라 [[Builder Method|빌더메서드]] 와 hashCode/equals 메서드도 추가할 수 있다.
```java
public class ProductResponseDto {  
    private Long number;  
    private String name;  
    private int price;  
    private int stock;  
    public ProductResponseDto() {}  
      
    public ProductResponseDto(Long number, String name, int price, int stock) {  
        this.number = number;  
        this.name = name;  
        this.price = price;  
        this.stock = stock;  
    }  
      
    public Long getNumber() {  
        return number;  
    }  
      
    public void setNumber(Long number) {  
        this.number = number;  
    }  
      
    public String getName() {  
        return name;  
    }  
  
    public void setName(String name) {  
        this.name = name;  
    }  
      
    public int getPrice() {  
        return price;  
    }  
      
    public void setPrice() {  
        this.price = price;  
    }  
      
    public int getStock() {  
        return stock;  
    }  
      
    public void setStock(int stock) {  
        this.stock = stock;  
    }  
}
```

### 2. Service Interface

이후 서비스 인터페이스 작성.
**ProductService.java**

> [!summary] 
> 서비스 인터페이스는 DAO 에서 구현한 기능을 서비스 인터페이스에서 호출해 결과값을 가져오는 작업을 수행하도록 설계한다.

```java
public interface ProductService {  
  
    ProductResponseDto getProduct(Long number);  
  
    ProductResponseDto saveProduct(ProductDto productDto);  
  
    ProductResponseDto changeProductName(Long number, String name) throws Exception;  
  
    void deleteProduct(Long number) throws Exception;  
    }
```

서비스에서는 클라이언트가 요청한 데이터를 적절하게 가공해서 컨트롤러에게 넘기는 역할을 한다. 이 과정에서 여러 메서드를 사용하는데, 지금은 간단하게 CRUD 만 구현하는것이므로 코드가 단순해 보일 수 있다.

#### 리턴 타입 : DTO
위 예제를 보면 리턴타입이 DTO 객체인것을 볼 수 있다. DAO 객체에서 엔티티 타입을 사용하는 것을 고려하면 서비스 레이어에서 DTO 객체와 엔티티 객체를 각 레이어에 변환해서 전달하는 역할도 수행한다고 볼 수 있다.

#### 정리
정리해보면 **데이터베이스와 밀접한 관련이 있는 데이터 액세스 레이어까지는 엔티티 객체를 사용**하고, **클라이언트와 가까워지는 다른 레이어에서는 데이터를 교환하는데 DTO 객체를 사용**하는것이 일반적이다. 
![](https://i.imgur.com/3IWeNXG.png)

서비스와 DAO의 사이에서 엔티티로 데이터를 전달하는 것으로 표현했지만 회사에 따라 DTO를 사용하기도 한다. 위 구조는 레이어 사이의 큰 데이터의 전달을 표현한 것이며, **단일 데이터나 소량의 데이터를 전달하는 경우 DTO나 엔티티를 사용하지 않기도 한다.**

### 3. Service Impl Override
```java
@Service  
public class ProductServiceImpl implements ProductService {  
  
    private final ProductDAO productDAO;  
  
    @Autowired  
    public ProductServiceImpl(ProductDAO productDAO) {  
        this.productDAO = productDAO;  
    }  
  
    @Override  
    public ProductResponseDto getProduct(Long number) {  
        return null;  
    }  
  
    @Override  
    public ProductResponseDto saveProduct(ProductDto productDto) {  
        return null;  
    }  
  
    @Override  
    public ProductResponseDto changeProductName(Long number, String name) {  
        return null;  
    }  
      
    @Override  
    public void deleteProduct(Long number) throws Exception {  
          
    }
}
```
위에 `@Autowired`를 지정한 생성자를 통해 의존성을 주입받는다.

### 4. Service Impl.
이제 남은건 오버라이딩된 메서드들을 구현하는것이다!
**ProductServiceImpl.java** → `getProduct()`
```java
@Override  
public ProductResponseDto getProduct(Long number) {  
    Product product = productDAO.selectProduct(number);  
    ProductResponseDto productResponseDto = new ProductResponseDto();  
    productResponseDto.setNumber(product.getNumber());  
    productResponseDto.setName(product.getName());  
    productResponseDto.setPrice(product.getPrice());  
    productResponseDto.setStock(product.getStock());
    
    return productResponseDto;  
}
```

**ProductServiceImpl.java** → `saveProduct()`
```java
@Override  
public ProductResponseDto saveProduct(ProductDto productDto) {  
    Product product = new Product();  
    product.setName(productDto.getName());  
    product.setPrice(productDto.getPrice());  
    product.setStock(productDto.getStock());  
    product.setRegist_dt(LocalDateTime.now());  
    product.setUpdate_dt(LocalDateTime.now());  
    
    Product savedProduct = productDAO.insertProduct(product);  
    
    ProductResponseDto productResponseDto = new ProductResponseDto();  
    productResponseDto.setNumber(savedProduct.getNumber());  
    productResponseDto.setName(savedProduct.getName());  
    productResponseDto.setPrice(savedProduct.getPrice());  
    productResponseDto.setStock(savedProduct.getStock());  
    
    return productResponseDto;  
}
```

**ProductServiceImpl.java** → `changeProductName()`
```java
@Override  
public ProductResponseDto changeProductName(Long number, String name) throws Exception {  
    Product updatedProduct = productDAO.updateProduct(number, name);  
  
    ProductResponseDto productResponseDto = new ProductResponseDto();  
    productResponseDto.setName(updatedProduct.getName());  
    productResponseDto.setNumber(updatedProduct.getNumber());  
    productResponseDto.setPrice(updatedProduct.getPrice());  
    productResponseDto.setStock(updatedProduct.getStock());  
  
    return productResponseDto;  
}
```

**ProductServiceImpl.java** → `deleteProductName()`
```java
@Override  
public void deleteProduct(Long number) throws Exception {  
    productDAO.deleteProduct(number);  
}
```

## 컨트롤러 생성
서비스 객체의 설계를 마친 후에는 비즈니스 로직과 클라이언트의 요청을 연결하는 컨트롤러를 생성해야한다. 
![](https://i.imgur.com/Mqs26Kr.png)
**컨트롤러는 클라이언트으로 부터 요청을 받고 해당 요청에 대해 서비스 레이어에 구현된 적절한 메서드를 호출해서 결괏값을 받는다. 이처럼 컨트롤러는 요청과 응답을 전달하는 역할만 맡는것이 좋다.**

**ProductController.java**
```java
@RestController  
@RequestMapping("/product")  
public class ProductController {  
    private final ProductService productService;  
  
    @Autowired  
    public ProductController(ProductService productService) {  
        this.productService = productService;  
    }  
  
    @GetMapping()  
    public ResponseEntity<ProductResponseDto> getProduct(Long number) {  
        ProductResponseDto productResponseDto = productService.getProduct(number);  
  
        return ResponseEntity.status(HttpStatus.OK).body(productResponseDto);  
    }  
  
  
    @PostMapping()  
    public ResponseEntity<ProductResponseDto> createProduct(@RequestBody ProductDto productDto) {  
        ProductResponseDto productResponseDto = productService.saveProduct(productDto);  
  
        return ResponseEntity.status(HttpStatus.OK).body(productResponseDto);  
    }  
  
    @PutMapping()  
    public ResponseEntity<ProductResponseDto> changeProductName(  
            @RequestBody ChangeProductNameDto changeProductNameDto  
    ) throws Exception {  
        ProductResponseDto productResponseDto = productService.changeProductName(  
                changeProductNameDto.getNumber(),  
                changeProductNameDto.getName()  
        );  
        return ResponseEntity.status(HttpStatus.OK).body(productResponseDto);  
    }  
  
    @DeleteMapping()  
    public ResponseEntity<String> deleteProduct(Long number) throws Exception {  
        productService.deleteProduct(number);  
  
        return ResponseEntity.status(HttpStatus.OK).body("정삭적으로 삭제되었습니다.");  
    }  
}
```