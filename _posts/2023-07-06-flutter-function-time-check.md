---
# 제목
title: "함수 작동 시간 체크"
# 부가 내용 미리보기
excerpt: "함수 작동 시간 체크에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, function, time, check]

#
permalink: /flutter/function-time-check/

toc: true
toc_sticky: false

date: 2023-07-06
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성
published: true
---

# 🦥 함수 작동 시간

면접을 볼때 어떤 사람이 자랑스럽게 A 로직이 1초가 걸리던 로직을 0.5초까지 로직 시간을 줄인 경험이 있다라고 대답하는 면접자를 본 경험이 있다.

개발을 진행하다보니 함수가 얼마나 빨리 로직을 돌고 결과물을 리턴하는 것이 매우 중요해졌다.

왜냐하면 이 로직의 시간이 길어질수록, 사용하는 클라이언트는 그만큼 기다려야하고, 앱, 웹을 탈출하는 요소를 더욱 더 높이기 떄문이다.

우리의 앱과 웹을 많은 사람들이 애용하게 하려면, 체류시간을 늘리기는 목표로 잡아야한다.

체류시간을 높이기 위한 방법 중 하나가 유저의 불편요소를 없애는 것이다. 아니면 다른 방법으로 불편하지 않게 대체 해주면 된다.

부드럽게 유저 편의성을 높이면, 자연스럽게 앱을 사용하는데 편안함을 느낄 것이다.

그리고 그 후에는 컨텐츠의 양과 질로 유저들의 마음을 사로잡으면 되는 것이다.

## Flutter

### TimelineClass 사용

```dart
import 'dart:developer';

void main() {
	Timeline.startSync('interesting function');
		testFunction();
	Timeline.finishSync();
}
```

### Stopwatch 사용

```dart
void main() {
    Stopwatch stopwatch = new Stopwatch();

    stopwatch.start();
	testFunction();
	print('testFunction() 완료 시간 : ${stopwatch.elapsed}');
    stopwatch.stop();
}
```

추가로 노드에서도 작동시간 체크하는 방법을 작성하겠다.

### Node

```js
console.time("duration_time");
// 시간을 측정할 코드
testFunction();
console.timeEnd("duration_time");
```
