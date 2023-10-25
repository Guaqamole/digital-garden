---
title: Custom CSS Snippet
date: 2023-10-25
draft: false
tags:
  - Snippet
complete: true
link: https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/Guides/How+to+Style+Obsidian#Where+do+I+put+my+stylin'+declarations
---
# **Introduction**

Obsidian은 html, css, javascript로 이루어진 웹 어플리케이션입니다.

```bash
.obsidian/snippets/snippet.css
```

모르시더라도 이해하기 쉽게 html, css, javascript에 대해서 간단히 말씀드리겠습니다. 쉽게 우리는 이것을 파워포인트에 대입을 할 수가 있습니다. html은 단순히 글자, 내용입니다. CSS는 글자 크기, 글자 색 등을 서식을 말합니다.  javascript는 글자를 움직이게 하거나 나타났다 안 보이게 하는 등 글자나 도형에 효과를 줄 수 있도록 하는 것입니다. 사실 테마는 이 CSS를 Obsidian 화면에 보이는 모든 것(색, 크기, 폰트 등)에 대해서 변경한 것이라고 할 수 있습니다. 

그렇다면 커스텀 CSS는 언제 필요하냐면 이미 정해진 서식에서 조금씩 내가 원하는 모양대로 나오지 않을 때 많이 바꾸게 됩니다. 예를 들면 테마에서 지원하지 않는 경우에 취소선을 넣거나 위 아래 간격이 조금 안 맞는다던가. 바꿀 수 있습니다. 이런 작은 부분부터 CSS에 자신이 있다고 하시면 더 많은 것들을 바꿀 수 있게 됩니다. 

다른 포스팅에서 폰트 크기, 여백 등은 Style setting을 이용해서 바꿨는데요. 하지만 Style Setting에 없는 것도 바꾸고 싶을 때 아래와 같이 하면 됩니다.

## **CSS 변경하기**

예를 들어 California Coast 테마는 체크박스에 완료 버튼을 누르면 취소선이 그어지지 않습니다. 저는 이 부분이 매우 아쉬워서 임의로 취소선이 생기도록 변경을 했습니다.

![](https://blog.kakaocdn.net/dn/cippNH/btrpPwUt5lc/UoKE0BZgSX1iUSteRCtd5K/img.png)

체크박스 완료해도 취소선 없음

![](https://blog.kakaocdn.net/dn/bjGGel/btrpz2naakF/Eby7KxRjvTkFljuhXkDrA0/img.png)

CSS 스니펫 메뉴

다시 설정 - 테마로 들어오시면 CSS 스니펫 부분이 있습니다. 테마 외의 CSS를 빠르게 적용할 수 있습니다. 그러면 CSS 스니펫에 한번 체크박스에 취소선을 만들어보도록 하겠습니다. CSS 스니펫 오른쪽에 폴더 버튼을 누릅니다. 그러면 윈도우 탐색기가 뜹니다. 여기는 이 CSS 스니펫이 저장되는 공간으로 오른쪽 버튼 - 새로 만들기 - 텍스트 문서를 클릭하여 새로운 텍스트 파일을 만들고 checkbox-stroke.css로 파일명을 변경합니다.

![](https://blog.kakaocdn.net/dn/4anoN/btrpLs6wykF/CoOHtadEyrrK9fsodG60j1/img.png)

css 파일을 클릭하여 메모장을 엽니다. 아래 내용을 복사 - 붙여넣기 하고 저장하시면 됩니다.

```
.markdown-preview-view ul > li.task-list-item.is-checked {
    text-decoration: line-through;
    color: var(--text-faint);
}
```

![](https://blog.kakaocdn.net/dn/Cz6fe/btrpPEZn0ec/ThfeArnVuROEOWkM0yssw1/img.png)

checkbox-stroke

그리고 CSS 스니펫 폴더 버튼 옆에 새로고침 버튼을 누르면 checkbox-stroke이 생긴 것을 확인하실 수 있습니다. 오른쪽의 버튼을 눌러 활성화시킵니다.

![](https://blog.kakaocdn.net/dn/bhI8Yn/btrpP3dA6hl/WjPM8qOfZ2htUzlgg8UkX0/img.png)

체크박스 취소선 성공 ✨

적용된 것을 확인하실 수 있습니다. 이렇게 CSS 스니펫을 이용해서 다른 것들도 바꿀 수 있습니다. 다른 것들도 몇가지 첨부드립니다. 

- 마크다운에 html코드가 있는 경우(예, <br>등) 회색으로 보이게 하기

```
.cm-s-obsidian span.cm-tag {
    color: #7A7A7A;
}
```

- 옵시디언 좌우 여백을 없애기

```
.markdown-source-view, .markdown-preview-view {
    max-width: 3000px;
    margin: auto;
}
```

CSS를 잘 다루시는 분이라면 훨씬 더 쉽게 하실 수 있습니다. 이렇게 커스텀 CSS를 다루는 방법에 대해서 알아보았습니다. 감사합니다.