---
# 제목
title: "Widget Build 후 콜백 함수!"
# 부가 내용 미리보기
excerpt: "Widget Build 후 콜백 함수에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, after, build]

# 
permalink: /flutter/after-build/

toc: true
toc_sticky: false

date: 2023-07-18
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 AfterBuild!

위젯이 빌드되고 난 후 콜백함수를 받고 싶을 떄가 있다. 

나는 위젯이 빌드되고 나서 로그인 여부를 판별해 페이지 이동 시켜주는 코드를 본 적이 있다. 

다른 방법으로 사용되는 부분이 있을지 한번 생각해보고 찾아보겠다. 


```dart
	WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
   		afterBuild(timeStamp, context);
	});
    
	void afterBuild(Duration timeStamp, BuildContext context) {
	}
```