---
# 제목
title: "매 시간마다 함수 호출하기!"
# 부가 내용 미리보기
excerpt: "Timer.periodic를 이용해 매 시간마다 함수 호출하기에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Dart
# 태그 
tags:
  - [dart, function, timer, periodic]

# 
permalink: /dart/call-every-seconds-func/

toc: true
toc_sticky: false

date: 2023-03-12
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Timer.periodic 이용

javascript 에서의 setInterval() 함수와 같은 기능을 Flutter 에서 구현해 보도록 하겠다.
매 시, 분, 초마다 원하는 함수를 호출하는 방법을 알아보겠다.

``` dart
Timer.periodic(const Duration(seconds: 1), (timer)) {
  // 함수 실행!!
  print('안녕');
}

// 1초마다 print문이 계속 찍힌다.
```