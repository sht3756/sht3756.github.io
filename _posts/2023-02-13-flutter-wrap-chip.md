---
# 제목
title: " Wrap 과 Chip 이란!"
# 부가 내용 미리보기
excerpt: "Flutter Widget Wrap, Chip 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, wrap, chip]

#
permalink: /flutter/wrap-chip/

toc: true
toc_sticky: false

date: 2023-02-13
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성
published: true
---

# 🦥 Wrap/Chip

```dart
Wrap(
                    // 정렬 : default. start
                    alignment: WrapAlignment.start,
                    // 클립들 좌우 사이 간격
                    spacing: 4,
                    // 2줄일때, 간격
                    // runSpacing: 30,
                    children: [
                      // 클립
                      Chip(
                          backgroundColor: Colors.grey[800],
                          label: Text(
                            '건강',
                            style: FooderlichTheme.darkTextTheme.bodyText1,
                          )),
                      Chip(
                          backgroundColor: Colors.grey[800],
                          label: Text(
                            '건강',
                            style: FooderlichTheme.darkTextTheme.bodyText1,
                          )),
                          ...
                    ],
                  )
```

결과
![](https://velog.velcdn.com/images/sht-3756/post/f5ef9f12-122a-4bec-8103-b0c9144f986c/image.png)
