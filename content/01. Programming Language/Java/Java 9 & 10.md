---
title: Java 10
date: 2023-12-09
draft: false
tags:
  - Java
complete: true
---
## 1. Immutable Object List
### ImmutableList

Guava 라이브러리의 일부로 제공되며, 불변 리스트를 생성하고자 할 때 사용합니다.
ImmutableList 객체는 생성 시점부터 불변이며, 원본 리스트로부터 변경되지 않습니다.
ImmutableList는 다양한 정적 팩토리 메서드를 제공하여 객체 생성을 용이하게 합니다. (of(), copyOf() 등)

```JAVA
@Test
public void givenUsingJava9_whenNullElement_thenThrowsException() {
    List<String> list = new ArrayList<>(Arrays.asList("one", "two", "three", null));
    assertThrows(NullPointerException.class, () -> List.of(list.toArray(new String[]{})));
}
```

Java9부터는 Factory 메서드인 of를 활용해서 immutable list를 반환받을 수 있습니다.

```JAVA
@Test
public void givenUsingGuava_whenNullElement_thenNoException() {
    List<String> list = new ArrayList<>(Arrays.asList("one", "two", "three", null));
    assertThrows(NullPointerException.class, () -> ImmutableList.copyOf(list).add("four"));
}
```

중요한 점은 **실제로 뷰가 아닌 원본 목록의 복사본을 생성합니다.**

### Collections.unmodifiableList()

Java 표준 라이브러리의 일부로 제공되며, 기존 리스트를 **불변 뷰로 감싸서 반환합니다.**
불변 뷰 객체는 기존 리스트를 필드로 가지고 있습니다.
읽기 메서드들은 기존 리스트에서 직접 호출됩니다.

예를 들어, **get()** 메서드는 원본 리스트의 **get()** 메서드를 호출하고, 결과를 반환합니다.
**add(), set(), addAll()** 와 같은 수정 메서드를 사용할 수 없습니다.
수정 메서드들은 UnsupportedOperationException을 발생시키도록 재정의되며 수정 메서드가 호출되면 **UnsupportedOperationException이 발생합니다.**

객체 생성에 Collections.unmodifiableList() 메서드를 사용하여 기존 리스트를 불변 뷰로 변환합니다.

```JAVA
@Test(expected = UnsupportedOperationException.class)
public void givenUsingUnmodifiableList_whenAddElement_thenThrowsException() {
    List<String> list = new ArrayList<>(Arrays.asList("one", "two", "three"));
    List<String> unmodifiableList = Collections.unmodifiableList(list);
    unmodifiableList.add("four");
}
```

원본 리스트에 대한 참조를 유지하므로, **원본 리스트가 변경되면 반환된 불변 뷰도 영향을 받습니다.**

```JAVA
@Test
public void givenUsingUnmodifiableList_whenAddElement_thenUnmodifiableListReflectsChange() {
    List<String> list = new ArrayList<>(Arrays.asList("one", "two", "three"));
    List<String> unmodifiableList = Collections.unmodifiableList(list);
    list.add("four");

    assertEquals(4, unmodifiableList.size());
    assertEquals("one", unmodifiableList.get(0));
    assertEquals("two", unmodifiableList.get(1));
    assertEquals("three", unmodifiableList.get(2));
    assertEquals("four", unmodifiableList.get(3));
}
```

### 어떤 상황에서 사용할까?

#### ImmutableList or java9  list.of

1. 원본 데이터에 대한 참조가 필요하지 않은 경우에 사용.
2. 생성 시점부터 불변을 보장해야 하는 경우에 사용.
3. Guava의 경우 외부 라이브러리(Guava)에 대한 의존성 추가를 해도 상관없는 경우.

#### Collections.unmodifiableList()

1. 원본 데이터에 대한 참조가 필요하고, 원본 데이터의 변경에 따라 불변 뷰도 같이 변경되어야 하는 경우에 사용.

#### 간단 예제

**ImmutableList**
```JAVA
import com.google.common.collect.ImmutableList;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public ImmutableList<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        ImmutableList<UserDto> userDtos = users.stream()
                .map(user -> new UserDto(user.getId(), user.getName(), user.getEmail()))
                .collect(ImmutableList.toImmutableList());
        return userDtos;
    }
}
```

원본 데이터에 대한 참조가 필요하지 않은 상황이므로, `Collections.unmodifiableList()` 보다는 `ImmutableList`를 사용하는 것이 더 적절합니다.

**Collections.unmodifiableList()** 
```JAVA
@Service
public class TeamService {
    private final List<Member> teamMembers = new ArrayList<>();

    public TeamService() {
        teamMembers.add(new Member("Alice", "Developer"));
        teamMembers.add(new Member("Bob", "Designer"));
    }

    public List<Member> getTeamMembers() {
        return Collections.unmodifiableList(teamMembers);
    }

    public void addTeamMember(String name, String role) {
        teamMembers.add(new Member(name, role));
    }

    public void removeTeamMember(String name) {
        teamMembers.removeIf(member -> member.getName().equals(name));
    }
}
```

팀원 목록이 언제든지 변경될 수 있으며.

이를 위해 원본 데이터의 참조를 유지하면서 변경을 방지합니다.

반환되는 List<Member> teamMembers 에 대한 불변성을 유지할 수 있으며 List <Member> teamMembers의 수정을 TeamService에서만 할 수 있도록 강제할 수 있습니다.

즉 Collections.unmodifiableList() 로 반환한 b라는 list에 대한 변경이 불가능하며 Collections.unmodifiableList()에 할당하는 a라는 list의 변경사항이 생길 때마다 반영하기 위해서 해당 자료구조를 사용합니다.