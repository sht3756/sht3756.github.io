---
# 제목
title: "애니메이션 공부!"
# 부가 내용 미리보기
excerpt: "애니메이션 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, animation]

# 
permalink: /flutter/animation-study/

toc: true
toc_sticky: false

date: 2023-04-12
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 애니메이션 공부

## 애니메이션을 사용하는 이유

모바일에서 애니메이션을 추가하는 이유

깔끔 멋진 인터페이스는 더이상 사용자의 관심을 이끌지 못한다. 이에 대한 솔루션이다.

사용자가 통제감을 느끼는지 확인해야한다. 그들의 행동이 영향을 끼친다는 것을 알려줘야하고, 앱은 항상 사용자의 행동에 따른 피드백을 바로 보내줘야한다. 

이런 방식으로 사용자가 당신의 앱 사용법을 빠르게 배우고, 앞으로 방문할 횟수가 높아질 것이다.

Flutter 에서의 Animation 은 매력이 있다.

Flutter 는 시각적으로 효율적인 애니메이션을 만드는 완벽한 프레임워크이다.

유일한 한계는 나의 상상력 정도랄까..??

## Flutter 의 Animation 종류

💡 Flutter 의 Animation 에는 두가지 종류가 있다. 정의와 차이점 알아보자!


### 1. 암시적 Animation

Animation 위젯에서 사용할 수 있는 변수만으로 기반으로 하는것을 의미한다.

즉, Flutter 의 내장 위젯을 사용하는 방법이다.

예 : AnimationContainer, AnimatedOpacity, AnimatedCrossFade, 등등..

특징 : 지정된 값이 변경될때 마다 애니메이션이 생성된다.

### 2. 명시적 Animation (주로 이걸 사용한다.)

개발자가 직접 동작하는 방식을 정의하는 것을 의미한다.

즉 , AnimationController 를 사용해 암시적 Animation 보다 더 많은 사용성을 제공한다는 것이다.

💡  ❗AnimationController 는 위젯이 아닌라는 점을 기억해주자! 
그렇기 때문에 사용 시 무조건 꼭 메모리에서 제거 해줘야한다.


특징 : 애니메이션 상태를 관리를 해줘야한다. 그래서 복잡한 앱을 만들때 주로 사용한다.

## 예제

StatefulWidget 타입의 BouncingAnimationWidget 을 사용해볼 것이다.

이걸 위해 SingleTickerProviderStateMixin 을 사용해보는 경험을 가져보자!

SingleTickerProviderStateMixin 는 애니메이션을 새로 고치는 것을  컨트롤 하는 혼합물이다.

Flutter 엔진은 애니메이션을 표시할때 1 초당 60 프레임을 유지하도록 하는 Tricker 를 보장한다.

그리고 TickerProviderStateMixin 을 사용해 State 확장해야한다.

``` dart
class BouncingAnimationWidget extends StatefulWidget {
 const BouncingAnimationWidget({Key? key}) : super(key: key);
 @override
 State<BouncingAnimationWidget> createState() =>
     _BouncingAnimationWidgetState();
}
class _BouncingAnimationWidgetState extends State<BouncingAnimationWidget>with SingleTickerProviderStateMixin {
 late final AnimationController _controller;
 @override
 void initState() {
   super.initState();
   _controller = AnimationController(
     duration: const Duration(milliseconds: 500),
     vsync: this,
   );
 }
@override
 Widget build(BuildContext context) {
   return Scaffold();
 }
 @override
 void dispose() {
   _controller.dispose();
   super.dispose();
 }
}
```

### 애니메이션을 입힐 직사각형 코드 작성
``` dart
Stack(
         alignment: Alignment.center,
         children: [
           _boxShadow(context),
           Align(
             alignment: Alignment(0.0, _boxJumpHeight.value),
             child: _animatedBox(context),
           ),
         ],
       ),

Widget _boxShadow(BuildContext context) => Container(
       width: 180,
       height: 15,
       decoration: BoxDecoration(
         borderRadius:
             BorderRadius.all(Radius.elliptical(180, 15)),
         boxShadow: [
           BoxShadow(
             color: Colors.black.withOpacity(0.15),
             spreadRadius: 5,
             blurRadius: 4,
             offset: const Offset(0, 3),
           ),
         ],
       ),
     );

 Widget _animatedBox(BuildContext context) => Container(
         width: 160,
         height: 50,
         color: Colors.white,
       );
```

### 결과물 
![](https://velog.velcdn.com/images/sht-3756/post/bedf3a9b-0c68-42d5-bc1b-3330a25c7a2e/image.png)



``` dart
void _initJumpAnimation() => _boxJumpHeight = Tween<double>(
       begin: -0.07,
       end: -0.5,
     ).animate(
       CurvedAnimation(
         parent: _controller,
         curve: const Interval(
           0.0,
           1.0,
           curve: Curves.easeInOut,
         ),
       ),
     );

 void _initBoxRotationAnimation() => _boxRotationAngle = Tween<double>(
       begin: 0,
       end: 360,
     ).animate(
       CurvedAnimation(
         parent: _controller,
         curve: const Interval(
           0.25,
           1.0,
           curve: Curves.ease,
         ),
       ),
     );

 void _initBoxWidthAnimation() => _boxWidth = Tween<double>(
       begin: 160,
       end: 50,
     ).animate(
       CurvedAnimation(
         parent: _controller,
         curve: const Interval(
           0.05,
           0.3,
           curve: Curves.ease,
         ),
       ),
     );

 void _initBoxShadowWidthAnimation() => _boxShadowWidth = Tween<double>(
       begin: 180,
       end: 50,
     ).animate(
       CurvedAnimation(
         parent: _controller,
         curve: const Interval(
           0.05,
           0.5,
           curve: Curves.ease,
         ),
       ),
     );

 void _initBoxShadowIntensityAnimation() =>
     _boxShadowIntensity = Tween<double>(
       begin: 0.15,
       end: 0.05,
     ).animate(
       CurvedAnimation(
         parent: _controller,
         curve: const Interval(
           0.05,
           1.0,
           curve: Curves.ease,
         ),
       ),
     );
```

### 전체 코드
``` dart
class BouncingAnimationWidget extends StatefulWidget {
 const BouncingAnimationWidget({Key? key}) : super(key: key);


@override
 State<BouncingAnimationWidget> createState() =>
     _BouncingAnimationWidgetState();
}

class _BouncingAnimationWidgetState extends State<BouncingAnimationWidget>with SingleTickerProviderStateMixin {
 late final AnimationController _controller;
 late final Animation<double> _boxJumpHeight;
 late final Animation<double> _boxWidth;
 late final Animation<double> _boxShadowWidth;
 late final Animation<double> _boxShadowIntensity;
 late final Animation<double> _boxRotationAngle;

 @override
 void initState() {
   super.initState();
   _controller = AnimationController(
     duration: const Duration(milliseconds: 500),
     vsync: this,
   );
   _initJumpAnimation();
   _initBoxWidthAnimation();
   _initBoxShadowWidthAnimation();
   _initBoxShadowIntensityAnimation();
   _initBoxRotationAnimation();
 }
 // Insert init functions from the last paragraph here
 @override
 Widget build(BuildContext context) => AnimatedBuilder(
       builder: (context, _) => _buildAnimation(context),
       animation: _controller,
     );

 Widget _buildAnimation(BuildContext context) => GestureDetector(
       onTap: _playAnimation,
       child: Stack(
         alignment: Alignment.center,
         children: [
           _boxShadow(context),
           Align(
             alignment: Alignment(0.0, _boxJumpHeight.value),
             child: _animatedBox(context),
           ),
         ],
       ),
     );

 Future<void> _playAnimation() async {
   try {
     await _controller.forward().orCancel;
     await _controller.reverse().orCancel;
   } on TickerCanceled {
     // the animation got canceled
   }
 }

 Widget _boxShadow(BuildContext context) => Container(
       width: _boxShadowWidth.value,
       height: 15,
       decoration: BoxDecoration(
         borderRadius:
             BorderRadius.all(Radius.elliptical(_boxShadowWidth.value, 15)),
         boxShadow: [
           BoxShadow(
             color: Colors.black.withOpacity(_boxShadowIntensity.value),
             spreadRadius: 5,
             blurRadius: 4,
             offset: const Offset(0, 3),
           ),
         ],
       ),
     );

 Widget _animatedBox(BuildContext context) => Transform(
       alignment: Alignment.center,
       transform: _boxRotation(_controller.status),
       child: Container(
         width: _boxWidth.value,
         height: 50,
         color: Colors.white,
       ),
     );

 Matrix4 _boxRotation(AnimationStatus animationStatus) {
   // This will ensure that rotation will be in the same direction on reverse
   if (animationStatus == AnimationStatus.reverse) {
     return Matrix4.identity()..rotateZ(-_boxRotationAngle.value * pi / 180);
   } else {
     return Matrix4.identity()..rotateZ(_boxRotationAngle.value * pi / 180);
   }
 }

 @override
 void dispose() {
   _controller.dispose();
   super.dispose();
 }
}
```

## 조금 더 업그레이드 !

### 만약 복잡한 애니메이션이 필요로 한다면?

앞서 작성했듯이 애니메이션은 앱에 한 몸이 되듯이 작동해야하고 적용되어야한다.

만약, 클라이언트가 매우 복잡한 애니메이션을 필요로 한다면 어떻게 해야할까?

2가지 방법을 제시하겠다.

1. 코드로 애니메이션 구현한다.

위에 작성한 예제를 보면된다. (좀 더 디테일하게 하면 원하는 데로 가능하다.)

1. Rive 라이브러리를 사용한다.

### Rive 란 ??

Rive 는 인터렉티브 애니메이션을 만드는 플랫폼이다. 

Flutter, Swift, Kotlin 등으로 작성된 앱에 직접 포함시킬 수 있고, 브라우저에서도 사용할 수 있다. 

개발자가 asset 을 추가할 수 있고, 인터넷을 통해서 애니메이션을 만들어서 업로드할 수 있다. (Rive Community 를 말하는듯!)

심지어 구현하기도 쉬워서 많은 개발자가 애용하고, 온라인에서 많은 가이드와 예제를 찾아볼 수 있다는 점이 있다.

### 예제

💡 코드를 작성하기 전, Rive 라이브러리 설치 후! .riv 파일을 준비해야 한다.

``` dart
class HoldappLogoRiveWidget extends StatefulWidget {
 const HoldappLogoRiveWidget({Key? key}) : super(key: key);

 @override
 State<HoldappLogoRiveWidget> createState() => _HoldappLogoRiveWidgetState();
}

class _HoldappLogoRiveWidgetState extends State<HoldappLogoRiveWidget>with SingleTickerProviderStateMixin {
 Artboard? _riveArtboard;

 @override
 void initState() {
   super.initState();
   rootBundle.load('assets/example.riv').then((data) {
		 // binary 타입의 data 로부터 RiveFile 을 로드 한다.
     final file = RiveFile.import(data);

		 // artboard 는 애니메이션의 시작점이고, Rive 위젯에 그린다.  
     final artboard = file.mainArtboard;
     var controller =
         StateMachineController.fromArtboard(artboard, 'State Machine 1');
     if (controller != null) {
       artboard.addController(controller);
     }
     setState(() => _riveArtboard = artboard);
   });
 }

 @override
 Widget build(BuildContext context) => Scaffold(
       backgroundColor: Colors.white,
       body: _riveArtboard != null
           ? Rive(artboard: _riveArtboard!)
           : const Center(
               child: CircularProgressIndicator(),
             ),
     );
}
```
### Rive 의 애니메이션 method

💡 Rive 는 애니메이션이 3가지 방법이 있다. 
One-shot, Ping-pong, Loop


One-Shot 

Animation 을 한번만 재생하는 것

Ping pong

Animation 을 재생 후  reverse 로 역 재생 하는 것 무한으로~ 

0 → 1 → 0 → 1 → 0 → … 이런 식으로 무한으로 재생

Loop

Animation 을 무한으로 재생한다.

0 → 1 , 0 → 1, 0 → 1, … 이런 식으로  무한으로 재생

예 

- 다크모드의 버튼에 따른 이미지를 변경시킬 수 있음
- 커서의 움직임에 따른 이미지의 변경 (404 페이지의 눈알을 돌리는 이미지를 본적 이 있음)

레퍼런스
https://www.holdapp.com/blog/flutter-animations-rive
