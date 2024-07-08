---
# 제목
title: "반응형 UI 란!"
# 부가 내용 미리보기
excerpt: "반응형 UI 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, reactive, UI]

# 
permalink: /flutter/reactive-ui/

toc: true
toc_sticky: true

date: 2023-03-07
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 반응형 UI

MediaQuery
MediaQueryData
physicalSize of WidgetsBinding

화면 사이즈 읽는 방법중 3가지를 소개하겠다.

## MediaQuery 
``` dart
MediaQuery.of(context).sized.width;
```
현재 빌드된 위젯트리에서 가장 가까운 MediaQuery 위젯에서 논리적인 픽셀단위로 디바이스 너비를 가져온다.

인자로 BuildContext 를 넘겨줘야한다. 
현재 화면의 크기를 알기위해선 BuildContext 트리를 타고 올라가야한다. 
반드시 위젯트리에서 접근가능한 build 메소드 안에 작성해야한다!

그래서 위젯트리에 따라 원하지 않는 동작을 일으킬 문제점이 있다.

## MediaQueryData.fromWindow
``` dart
MediaQueryData.fromWindow(WidgetsBinding.instance.window).size.width;
```

현재 화면의 너비를 논리적 픽셀단위로 가져온다.
Mediaquery 와 비슷해보이지만, 다른점은 BuildContext 를 인자로 받지 않아서 build 메소드안에 작성안해도된다.

앱에서는 앱 시작시 로딩화면에서 초기화 작업을 하면서 해당기기의 unitSize를 설정할때 사용한다고 한다.

논리적인 레이아웃 크기를 반환하여 레이아웃 작업에 사용한다.

위젯트리와 관계없이 작동하므로 싱글톤 처럼 어느 한곳에 메모리를 잡아놓고 build 메소드 안에서 값 할당하면 MediaQuery 와 다르게 오작동을 막을 수 있다.

## WidgetsBinding.instance.window.physicalSize
``` dart
MediaQueryData.fromData(WidgetsBinding.instance.windwo).size.width;
```
현재 디바이스의 너비를 물리적 픽셀 단위를 반환한다.

![](https://velog.velcdn.com/images/sht-3756/post/094aaea7-ead1-4472-a235-be1e48144501/image.gif)

	1번째 화면 사이즈에 따라  값이 변한다.
    2번째 build 메소드 밖에서 초기화 한 MediaQueryData.fromWindow 는 화면 사이즈에 따라 변하지 않는다.
    3번째 build 메소드 안에서 초기화한 MediaQueryData.fromWindow 는 화면 크기에 따라 값이 변한다.
    
    화면크기가 변경될때마다 Flutter 는 해당화면을 다시 build한다.
    build 함수를 다시 호출하는 위젯을 사용하지 않았는데 말이다!
    Stateless 위젯과 별도의 rebuild 함수를 사용하지 않았는데, 다시 호출한다는 것이 증거!
    
    4번째는 최대 넓이 일때 3024 이다. 
    
## MediaQuery 잘못 사용한 사용법 
 첫번째 페이지에서 만든 MediaQuery를 두번째 페이지에 넘겨보았다.
 두번째 페이지에서 재빌드 하지 않아 생기는 오류이다.
 
 첫번째 페이지에서는 MediaQeury 가 잘 작동해도 두번째는 적용이 되지 않는다.

값을 재 할당 해주면 문제없다.
 ![](https://velog.velcdn.com/images/sht-3756/post/e14cbfdc-81aa-4328-8067-9534b1ed3faa/image.gif)
 
 
 실시간으로 해상도 대응할 필요있을때는 MediaQuery 사용하면 좋다.
 실시간 해상도 대응 => 모바일 가로모드로 바꿀때!실시간 변경시를 말한다.
 
 반응형 UI 는 지원하지만, 실시간대응까지는 필요없을때 MediaQueryData.fromWindow 사용하자. 싱글톤 패턴처럼 어딘가에 선언후 변수를 지속적으로 사용하는게 실수를 줄일수 있는 방법이고, 메모리 관리에도 좋다.
 
 이미지의 픽셀을 강제할때나 그래픽 관련 작업일때는 WidgetsBinding.instance.window.physicalSize 사용하자.


## 적용
MediaQuery에서 받은 해상도값을 바탕으로 하는 방법도 있지만, 웹에서는 주로 기준값을 정해서 대응을 한다.

기준값을 정해서 대응하는 법으로 진행하겠다.
size.dart 에서 pageWidth, mobileWidth 을 전역으로 초기화 해주고, build 메소드 안에서 재할당 해주고 mobileWidth 보다 큰지 아닌지 비교해준다.

``` dart
// size.dart
import 'package:flutter/material.dart';

final double fixedWidth = MediaQueryData.fromWindow(WidgetsBinding.instance.window).size.width;

final pageWidth = MediaQueryData.fromWindow(WidgetsBinding.instance.window).size.width;
const double mobileWidth = 700;
const double breakPointWidth =1200;
bool isWeb = true;
```


``` dart
import 'package:flutter/material.dart';
import 'package:portfolio/size.dart';

class FlutterWebTestPage02 extends StatelessWidget {

  const FlutterWebTestPage02({Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    double pageWidth = MediaQuery.of(context).size.width;
    isWeb = pageWidth > mobileWidth ? true : false;

    TextStyle h1 = const TextStyle(
      fontSize: 30,
      fontWeight: FontWeight.w600,
    );
    TextStyle h2 = const TextStyle(
      fontSize: 25,
      fontWeight: FontWeight.w600,
    );
    TextStyle h3 = const TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.w600,
    );

    return Scaffold(
      body: Column(
        children: [
          Container(
            width: double.infinity,
            height: 48,
            color: Theme.of(context).colorScheme.primary,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                SizedBox(
                    width: pageWidth > breakPointWidth
                        ? (pageWidth - breakPointWidth) / 2 + 20
                        : 20),
                Text("hizzang", style: isWeb ? h1 : h2),
                const Spacer(),
                Text("Hello", style: isWeb ? h2 : h3),
                const SizedBox(width: 24),
                Text("my", style: isWeb ? h2 : h3),
                const SizedBox(width: 24),
                Text("friend", style: isWeb ? h2 : h3),
                SizedBox(
                    width: pageWidth > breakPointWidth
                        ? (pageWidth - breakPointWidth) / 2 + 20
                        : 20),
              ],
            ),
          ),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('현재는 ${isWeb ? '웹 사이즈' : '모바일 사이즈'} ', style: const TextStyle(fontSize: 30),),
                Text("pageWidth: $pageWidth", style: const TextStyle(fontSize: 30),),
              ],
            ),
          )
        ],
      ),
    );
  }
}

```

padding 이 되는 SizedBox 의 width 을 설정
(현재사이즈 - 기준 해상도) / 2 + padding
최소 20은 padding 을 준다는 뜻이다. 
화면이 정해진 1200 픽셀보다 크다면 그 차이만큼 공백을 주라는 거다.

``` dart
SizedBox(
                    width: pageWidth > breakPointWidth
                        ? (pageWidth - breakPointWidth) / 2 + 20
                        : 20),
```
![](https://velog.velcdn.com/images/sht-3756/post/27ba3bf6-d114-4b84-a628-ca3a940d826f/image.gif)
끝!

[참조글 보러가기!](https://medium.com/doohyeon-kim/flutter-responsive-web-c2c123c0d5d1) 
