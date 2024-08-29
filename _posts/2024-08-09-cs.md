---
# 제목
title: " 이란!"
# 부가 내용 미리보기
excerpt: " 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, study]

#
permalink: /flutter/study/

toc: true
toc_sticky: false

date: 2024-08-09
# last_modified_at: 0000-00-00

# true 활성 (default), false 비활성
published: false
---

# 🦥 Slivers

Slivers 탄생 이유

Render Box 에대해 먼저 알아보자
-2D 데카르트 좌표계를 가진 렌더 객체이다.
Flutter의 대부분의 레이아웃의 구성요소는 Render Box 로 구현되어있는데,
부모 요소로 부터 받은 제약 조건 내에서 최소 및 최대 너비와 높이에 따라 구현됨

Render Box 의 한계

- 부모 위젯의 제약 조건 내에서 구현되는 너비와 높이
- 동적인 콘텐트나 사용자와의 상호작용에 대처하기가 힘들다.
- 스크롤이 포함된 복잡한 화면 구조에 대처가 힘들다. ex) 무한스크롤뷰 컬랙싱 앱바

Slivers
로 한계를 극복하고자 했음

- 부모 위젯의 제약 조건 대신 Sliver protocol 로 제공되는 다양한 제약조건을 활용
- 스크롤 가능한 영역 내에서 동적인 스크롤 효과를 구현하는데 용이함
- 리스트의 각 아이템을 각각 렌더링: 화면에 보이는 부분만 렌더링하여 성능이 향상됨
- 한 화면에 많은 정보를 보여주는 GridView, Infinite Scroll 구현에 적합하다.

예시

```dart
SliverAppVar(
  expandedHeight: 300, // 최대 높이
  floating: false, // 띄우기 여부
  pinned: true, // 고정 여부
  flexibleSpace: FlexibleSpaceBar(...) // 가변하는 영역
),
SliverList( // 스크롤 가능한 리스트 위젯
  delegate: SliverChildBuilderDelegate(
    (BuildContext context, int index) {
      return ListTile(title: Text('Item $index'));
  }, childCount : 20),
)
```

delegate 에는 두가지 종류 존재

정적으로 위젯으로 구성!

```dart
SliverList(
  delegate: SliverChildListDelegate(
    [
      ListTile(title: Text('item 1')),
      ListTile(title: Text('item 2')),
      ListTile(title: Text('item 3')),
    ]
  )
)
```

동적으로 위젯으로 구성!

```dart
SliverList(
  delegate: SliverChildBuilderDelete(
    (BuildContext context, int index) {
      return ListTile(title: Text(Item $index));
    },
    itemCount: 10,
  )
)
```

예제 만들기 (SliverAppBar)

```dart
Scaffold(
  body: CustomScrollView(
    slivers: [
      SliverAppBar(
        expandedHeight: 200.0,
        floating: false,
        pinned: true,
        flexibleSpace: FlexibleSpaceBar(
          centerTitle: true,
          title: const Text(
            'SliverAppBar',
            style: TextStyle(color: Colors.black),
          ),
          background: Image.network(
            'https://via.placeholder.com/200',
            fit: BoxFit.cover,
          ),
        ),
      ),
      SliverList(
        delegate: SliverChildBuilderDelegate(
          childCount: 100,
          (context, index) {
            return ListTile(
              title: Text('Item $index'),
            );
          },
        ),
      )
    ],
  ),
);
```
