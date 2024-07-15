---
# 제목
title: "일괄적 오류 잡기!"
# 부가 내용 미리보기
excerpt: "flutter 에서 남발하는 try-catch 문을 일괄적으로 잡는 방법에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, try, catch]

# 
permalink: /flutter/try-catch/

toc: true
toc_sticky: false

date: 2024-02-04
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 일괄적 오류 잡기

나는 웹 프론트에서나 API 통신을 진행할 때에 항상! 빼놓지 않고 작성해왔던 코드가 있다.

함수에 try catch 문을 작성해두면 만능인줄 알았던!! 이 코드! 

궁금증! 불 필요하지만, 모든 곳에 try catch 문을 쓰면 에러든 뭐든 잡아주지 않을까? 란 생각!!!!!!

*오류는 어디서든 나타날수 있다는 것을 알아둬야 한다.* 

불 특정한 위치에서 모든 에러를 잡을 수 있다면 얼마나 좋을까? 

```dart
try {
	...
	// API 통신
} catch(e) {
	...
	Logger(e.toString);
}
```

# 1. Flutter 내부 오류 발생하는 경우

밑의 코드는 버튼 클릭시 오류 발생 시키는 코드이다.

```dart
ElevatedButton(
	onPressed: makeError,
	child: const Text('첫번째 경우');
)

void makeError() {
	final list = ['a'];
	
	for(var n = 0; n < list.length + 1; n++) {
		log(list[n]);
	}
}
```

어제의 나 였다면, makeError() 함수 내부에 try {} catch(e) 문을 집어 넣었을 것이다.

*runApp 호출 전, FlutterError.onError 를 설정을 해준다.*

```jsx
void main() {
	FlutterError.onError = (details) {
		FlutterError.presentError(details);
	};
	runApp(const MyApp());
}
```

# 2. 위젯 생성 과정에서 오류가 발생하는 경우

MaterialApp.builder 에서 ErrorWidget.builder 를 설정해주면 build내부 함수에서 오류 발생시 설정한 ErorWidget.builder 를 리턴해준다.

```dart
return MaterialApp(
	builder: (context, widget) {
		ErrorWidget.builder = (errorDetails) {
			Widget error = Text(errorDetails);
			if (widget is Scaffold || widget is Navigator) {
				error = Scaffold(body: SafeArea(child : error));
			}
			return error;
		};
		return widget!;
	},
	home: const MyHome(),
);
```

# 3. Flutter 외부에서 오류 발생하는 경우

Flutter 외부에서는 다양한 상황에서 오류가 발생 할 수 있다. (플랫폼별, 패키지 등.. )

밑의 코드는 존재하지 않는 플러그인을 호출해 발생하는 코드이다.

```dart
ElevatedButton(
	onPressed: () async {
		const channel = MethodChannel('fake-channel');
		await channel.invokeMethod('strange ~');
	},
)
```

```dart
void main() {
	runZonedGuarded(() { 
		runApp(const MyApp());
	}, (error, stackTrace) {
		log('error outside Flutter', error: error, stackTrce: stackTrace);
	}); 
}
```

전체 적용 사례

```dart
import 'dart:async';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
	runZonedGuarded(() {
		WidgetsFlutterBinding.ensureInitialized();
		FlutterError.onError = (details) {
			log('플러터 내부 에러');
			FlutterError.presentError(details);
		};
		runApp(const MyApp());
	}, (error, stackTrace) {
		log('플러터 외부 에러', error: error, stackTrace: stackTrace);
	});
}

class MyApp extends StatelessWidget {
	const MyApp({Key? key}) : super(key: key);

	@override
	Widget build(BuildContext context) {
		return MaterialApp(
			builder: (context, widget) {
				ErrorWidget.builder = (errorDetails) {
					Widget error = Text(errorDetails);

					if(widget is Scaffold || widget is Navigator) {
						error = Scaffold(body: SafeArea(child: error));
					}
					return error;
				};
				return widget!;
			},
			home: cosnt MyHome();
		);	
	}
}

class MyHome extends StatefulWidget {
	const MyHome({Key? key}) : super(key: key);

	@oveeride
	State<StatefulWidget> createState() {
		return MyHomeState();
	}	
}

class MyHomeState extends State<MyHome> {
	var error = false;
	
	void makeError() {
		final list = ['a'];
		for (var n = 0; n < list.length + 1; n++) {
			log(list(n));
		}
	}

	@override
	Widget build(BuildContext context) {
		if (error) {
			makeError();
		}
		return Scaffold(
			body: SafeArea(
				child: Center(
					child: Column(
						children: [
							ElevatedButton(
								onPressed: () { makeError();},
								child: const Text('첫번째 플러터 내부 에러'),
							),
							ElevatedButton(
								onPressed: () { 
									setState(() => error = true);
								},
								child: const Text('두번째 플러터 내부 위젯 생성 과정 에러'),
							),
							ElevatedButton(
								onPressed: () async {
									const channerl = MethodChannel('fake-channel');
									await channel.invokeMethod('strange~');
								},
								child: const Text('세번째 플러터 외부 에러'),
							),
						],
					),
				),
			)
		);
	}
}
```