---
# 제목
title: "플랫폼별 UI 분리시키기!"
# 부가 내용 미리보기
excerpt: "Flutter는 한가지 코드로 여러 플랫폼에서 동작하는 멀티 플랫폼 개발을 목표로 하지만..."

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, ui/ux]

#
permalink: /flutter/ui-ux-study/

toc: true
toc_sticky: false

date: 2025-02-05
# last_modified_at: 0000-00-00

# true 활성 (default), false 비활성
published: true
---

# 🦥 Flutter, 나의 개인적인 경험을 위한 목표

Flutter 는 한가지 코드로 여러 플랫폼에서 동작하는 멀티 플랫폼 개발을 목표로 하지만,  
각 플랫폼의 사용자 경험(UX)를 최대한 존중하면서 일관성을 유지하는것을 중요하게 생각한다.

공식 가이드에서도 기본적으로 플랫폼의 디자인 철학을 존중하는 방향으로 추천하지만,  
동시에 공통적인 UI/UX를 유지하는 것이 개발 비용을 줄이고 사용자 경험을 통합하는데 도움이 된다고 한다.

그래서 나도...항상 앱을 시작할때

```dart
runApp(
  child: MyApp();
)

// MyApp statelessWidget or statefulWidget
@override
Widget build(context) {
  return MaterialApp(...);
}
```

항상 이런식으로 MaterialApp만 주구장창 써왔다.
아무리 Flutter가 기본적으로 Material 을 추구한다고 해도
지금까지도 Cupertino 스타일이 있는 걸 알면서도 사용할 줄모른다.ㅎㅎ  
하지만 이제는 플러터의 장점을 유지(?)하면서, 조금더 편한 UI/UX 를 경험할수 있도록 시도를 해보겠다.

자고로 내가 생각하는 편한 앱 경험은!!

안드로이드는 안드로이드 답게,
아이폰은 아이폰 답게 사용하는것이다.

각자 사용하는 바텀시트 나 앱바, 트랜지션, 모달 등 엄청나게 많은 것들이 다르다..  
아이폰 유저인 나는 그래서 안드로이드의 유저경험을 잘 모르고 어색해 한다.  
안드로이드 유저도 나와 같은 생각을 할 것이다.

그런데 공통적인 UI 를 제공하면 같은 UX 를 경험하지만,

각기 다른 UI 를 제공하면, 같은 UX 에 소소한 익숙함에 감동을 받을 것이다. 라는 생각을 가지며

한번 시도 해보겠다!

플러터에서는 머터리얼(Material) 과 쿠퍼티노(Cupertino) 를 동시에 제공한다.

Flutter 앱을 Android/iOS 두 플랫폼에 각각에 어울이는 UI 를 보여주는 것이 훨씬 더 좋은 UX 경험에 미칠것이라고 생각이 된다.

그렇기에 나는 UX는 통일하면서, UI는 각 플랫폼 스타일에 맞게 살리면서 접근할 것이다.

여기서 중점은 코드가 플랫폼별로 당연하게 늘어나기에 과도하게 분리시켜 관리가 어렵지 않게 하며 유지보수도 쉽게 할수 있으면 좋겠다라는 생각이 들었다.

이번 시도가 맞고 틀리는것은 중요하지 않으며, 오로지 경험을 위한 포스팅으로 생각해주면 좋겠다.

# 🔥iOS 사용자에게는 iOS답게, Android 사용자에게는 Android답게

우선, 모든 UI 가 플랫폼에 맞게 UI 를 만들어주면 엄청나게 큰 감동이 밀려올 것이다.

하지만, 그렇게 진행하게 되면, 코드의 양과, 유지보수가 굉장히 힘들 것이기에 적절하게 적용해줄 필요가 있다.
그렇기에 기준이 필요하다.

앞으로 밑의 기준을 따르려고 한다. (나중에 수정될 수 도 있음)

## 언제 UI 를 나누고 언제 공통적인 UI 를 사용할까!!

### 나눠야하는 경우 (각 플랫폼 경험을 살려야 할 때)

네비게이션 바 (AppBar VS CupertinoNavigationBar)
다이얼로그 (AlertDialog VS CupertinoAlertDialog)
버튼 (ElevatedButton VS CupertinoButton)
토글 (Switch VS CupertinoSwitch)
애니메이션 (PageRouteBuilder Vs CupertinoPageRoute)

### 공통으로해야하는 경우 (일관성이 중요할 때)

네비게이션 구조 (페이지 이동방식 동일!)
리스트, 카드, 테이블 등 데이터 UI
설정화면 같은 일반적인 UI
로그인/회원가입 UI

# 코드 진행

##

## Android

## iOS

여기서 참고 해야할점
PlatformWidget 상속할때와 Platform.isIOS 왜 다르게 선언하나?

PlatformWidget 상속할 때

같은 UI를 여러곳에서 재사용 가능성이 크다? YES
iOS 와 Android 의 UI 가 완전히 다르게 동작해야한다? YES
이후 유지보수할 때 한 곳에서 쉽게 관리하고 싶다? YES

에 : 버튼, 네비게이션 바, 다이얼로그, 스위치

Platform.isIOS 만 사용할 때
해당 위젯이 특정 코드에서만 사용되고 재사용될 가능성이 적다? YES
iOS 와 Android 의 UI 차이가 크지 않다? YES
빠르게 한줄로 분기처리 하고 싶다? YES

예 : 날짜 선택기, 페이지 이동 애니메이션, 간단한 UI 분기처리

중요한 건 재사용성과 유지보수의 편의성!
UI 차이가 크고, 여러 곳에서 쓰일 가능성이 크면 PlatformWidget 사용!
UI 차이가 크지 않고, 한 곳에서만 쓰이면 Platform.isIOS 사용!

# 각 플랫폼 경험

## Android

## iOS
