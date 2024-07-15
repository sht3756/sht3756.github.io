---
# 제목
title: "Visibilty VS Offstage이란!"
# 부가 내용 미리보기
excerpt: "Visibilty VS Offstage 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, visibility, offstage]

# 
permalink: /flutter/visibility-offstage/

toc: true
toc_sticky: false

date: 2023-11-29
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Visibility vs Offstage

Visibility는 물리적 공간을 차지하면서 show/hide만 하지만

Offstage는 물리적 공간까지도 show/hide 해준다 (강추)

참고::

https://stackoverflow.com/questions/44489804/show-hide-widgets-in-flutter-programmatically

Try the Offstage widget

if attribute offstage:true the not occupy the physical space and invisible,

if attribute offstage:false it will occupy the physical space and visible

```
Offstage(
   offstage: true,
   child: Text("Visible"),
),
```

Opacity, which can stop its child from being painted.

Offstage, which can stop its child from being laid out or painted.

TickerMode, which can stop its child from being animated.

ExcludeSemantics, which can hide the child from accessibility tools.

IgnorePointer, which can disable touch interactions with the child.

Visibility 참고 자료

https://api.flutter.dev/flutter/widgets/Visibility-class.html

Offstage 참고 자료

https://api.flutter.dev/flutter/widgets/Offstage-class.html