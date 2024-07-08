---
# 제목
title: "애니메이션 라이브러리 적용!"
# 부가 내용 미리보기
excerpt: "애니메이션 라이브러리 적용 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, animation, library]

# 
permalink: /flutter/animation-library-apply/

toc: true
toc_sticky: false

date: 2023-04-24
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Animation 라이브러리 적용

## 사용할 방법

### `confetti`(컨페티 : 색종이) 라이브러리 사용!

[confetti 라이브러리](https://pub.dev/packages/confetti)를 사용해서 응모하기 버튼을 누르고 당첨 되었을때의 액션을 만들어보기로 한다. 

### 선택 이유 ?

우선은 시간적 여유가 그렇게 많지 않고, 빠르게 결과물을 만들어서 보고 싶은 나의 욕심 !!

라이브러리 설치해서 빠르게 구현해보겠다. 

(예상 구현 시간 : 최대 1시간, 너무 신경써서 만들진 말자 경험 위주) 

### 개발환경 준비

```dart
// pubspec.yaml

// 라이브러리 추가
get: ^4.6.5
confetti: ^0.7.0

```

### 코드 작성
``` dart
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const GetMaterialApp(
      home: Scaffold(body: TestWidget()),
    );
  }
}

class TestWidget extends StatefulWidget {
  const TestWidget({Key? key}) : super(key: key);

  @override
  State<TestWidget> createState() => _TestWidgetState();
}

class _TestWidgetState extends State<TestWidget> {
	late ConfettiController _controllerTopCenter;

	@override
	  void initState() {
	    super.initState();
			_controllerTopCenter = ConfettiController(
				duration: const Duration(milliseconds: 600)
			);
		}
	
	@override
  void dispose() {
		_controllerTopCenter.dispose();
		super.dispose();
	}
}
``` 
```dart
Align(
  alignment: Alignment.topCenter,
  child: ConfettiWidget(
    confettiController: _controllerTopCenter,
    // 송풍 방향
    blastDirection: pi / 2,
    // 최대 폭발력
    maxBlastForce: 2,
    // 최소 폭발력
    minBlastForce: 1,
    // 방출 빈도
    emissionFrequency: 0.1,
    // 입자 수
    numberOfParticles: 10,
    // 중력
    gravity: 1,
  ),
),
Align(
  alignment: Alignment.topCenter,
  child: TextButton(
      onPressed: () {
        _controllerTopCenter.play();
      },
      child: const Text('당첨(아래로)!')),
),
```

```dart
Align(
    alignment: Alignment.center,
    child: ConfettiWidget(
      confettiController: _controllerCenter,
      // 송풍 방향
      blastDirectionality: BlastDirectionality.explosive,
      // 무한 여부
      shouldLoop: false,
      // 색상
      colors: const [
        Colors.green,
        Colors.blue,
        Colors.pink,
        Colors.orange,
        Colors.purple
      ],
      // 커스텀 위젯을 넣는 부분
      createParticlePath: drawStar,
    ),
  ),
  Align(
    alignment: Alignment.center,
    child: TextButton(
        onPressed: () => checkResults(), child: const Text('응모\n확인')),
  ),
```

```dart
// 별 그리는 커스텀
  Path drawStar(Size size) {
    double degToRad(double deg) => deg * (pi / 180.0);

    const numberOfPoints = 5;
    final halfWidth = size.width / 2;
    final externalRadius = halfWidth;
    final internalRadius = halfWidth / 2.5;
    final degreesPerStep = degToRad(360 / numberOfPoints);
    final halfDegreesPerStep = degreesPerStep / 2;
    final path = Path();
    final fullAngle = degToRad(360);
    path.moveTo(size.width, halfWidth);

    for (double step = 0; step < fullAngle; step += degreesPerStep) {
      path.lineTo(halfWidth + externalRadius * cos(step),
          halfWidth + externalRadius * sin(step));
      path.lineTo(halfWidth + internalRadius * cos(step + halfDegreesPerStep),
          halfWidth + internalRadius * sin(step + halfDegreesPerStep));
    }

    path.close();
    return path;
  }
```
