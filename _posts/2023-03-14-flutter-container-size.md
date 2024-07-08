---
# 제목
title: "컨테이너 maxHeight, maxWidth 정하기 및 위젯 사이즈 구하기!"
# 부가 내용 미리보기
excerpt: "컨테이너 maxHeight, maxWidth 정하기 및 위젯 사이즈에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, container, size, maxHeight, maxWidth]

# 
permalink: /flutter/container-size/

toc: true
toc_sticky: false

date: 2023-03-14
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 컨테이너 maxHeight, maxWidth 정하기 및 위젯 사이즈

## 컨테이너 맥스 height, width 정하기
``` dart
ConstrainedBox(
	constraints: BoxConstraints(
    minHeight: 100,
    minWidth: 100,
    ),
)
```


## 위젯 사이즈 구하기

```
  final GlobalKey _containerKey = GlobalKey();  
  
Size? _getSize() {
      if (_containerKey.currentContext != null) {
        final RenderBox renderBox =
            _containerKey.currentContext!.findRenderObject() as RenderBox;
        Size size = renderBox.size;
        return size;
      }
      return null;
    }
```