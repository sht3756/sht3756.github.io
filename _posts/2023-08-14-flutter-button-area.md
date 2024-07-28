---
# 제목
title: "LongPressed, onPressed 버튼 영역 클릭효과 없애기!"
# 부가 내용 미리보기
excerpt: "LongPressed, onPressed 버튼 영역 클릭효과 없애기에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, button, area]

# 
permalink: /flutter/button-area/

toc: true
toc_sticky: false

date: 2023-08-14
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 버튼 영역 없애기!

개발을 진행하다보면, Button() 위젯, Inkwell() 위젯을 사용하는데,

버튼의 영역을 없애고 싶을떄가 있다. 

그럴떄 사용하는 방법!

 

부분적으로 위젯의 테마를 수정하고 싶을때, 해당하는 자식 위젯에 적용해주면 된다.


```dart

Theme(
	data: ThemeData(
    	splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
    ),
    child: Button(
    	onPressed: () {},
        child: Container(),
    ),
);

```

전체 위젯의 테마를 수정하고 싶을때, 최상단인 스크린 위젯이나, main.dart 에 위젯을 적용준다.

```dart

// main.dart

MaterialApp(
	theme: ThemeData(
    	spalshColor: Colors.transparent,
        highlightColor: Colors.transparent,
    ),
    home: ExampleScreen(),
),

```

적용 완료후 모습, 클릭을 했지만, 영역이 보이지 않는다. 

spalshColor: 터치 영역의 원 색상

highlightColor: 마지막 강조 색상