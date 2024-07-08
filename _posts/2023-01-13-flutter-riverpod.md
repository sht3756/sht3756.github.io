---
# 제목
title: "RiverPod 소개와 이론이란!"
# 부가 내용 미리보기
excerpt: "RiverPod 소개와 이론에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, riverpod]

# 
permalink: /flutter/riverpod/

toc: true
toc_sticky: true

date: 2023-01-13
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 RiverPod 소개와 이론

## 상황
상태는 데이터를 관리하는 것이며, stful setState 만 사용해서 관리할수 있다.
setState 만으로는 부족할 때가 있다. 스크린과 다른 스크린에 데이터를 넘겨줄때 어려움이 있을 수 있다.

## RiverPod 란?
상태관리 중 하나이다.

## 패키지 설치
riverpod 은 native riverpod 이고,
flutter_riverpod 은 flutter 에서 native 하게 쓸수 있게 도와주는 것
hooks 라는 다른라이브러리를 sync 가 잘 되게 패키지
https://pub.dev/packages/riverpod

## 사용법
main.dart
``` dart
void main() {
	runApp(
    	//  RiverPod을 사용하기 위해서 ProviderScope 로 위젯이 있어야 한다.
    	ProviderScope(
        	child: MeterialApp(
            	home: HomeScreen(),
            )
        )
    )
}

```
``` dart
import 'package:패키지 이름/flutter_riverpod.dart';

final numberProvider = StateProvider<int>((ref) => 0);
```

``` dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_study/layout/default_layout.dart';
import 'package:riverpod_study/reverpod/state_provider_screen.dart';

class StateProviderScreen extends ConsumerWidget {
  const StateProviderScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 특정 provider 를 바라 보고있다가 변경이 되는것을 감지한다.

    final provider = ref.watch(numberProvider);
    return DefaultLayout(
        title: 'StateProviderScreen',
        body: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(provider.toString()),
              ElevatedButton(
                onPressed: () {
                  ref
                      .read(numberProvider.notifier)
                      .update((state) => state + 1);
                },
                child: Text('UP'),
              ),
              ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => _NextScreen(),
                      ),
                    );
                  },
                  child: Text('NextScreen'))
            ],
          ),
        ));
  }
}

class _NextScreen extends ConsumerWidget {
  const _NextScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = ref.watch(numberProvider);

    return DefaultLayout(
        title: 'StateProviderScreen',
        body: SizedBox(
          width: MediaQuery.of(context).size.width,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(provider.toString()),
              ElevatedButton(
                onPressed: () {
                  ref
                      .read(numberProvider.notifier)
                      .update((state) => state + 1);
                },
                child: Text('UP'),
              )
            ],
          ),
        ));
  }
}

```

## 결과
<video src="https://velog.velcdn.com/images/sht-3756/post/bd76ef0a-57b1-4888-9189-9d80866b05d2/image.mov" height="500"/>
![비디오](https://velog.velcdn.com/images/sht-3756/post/bd76ef0a-57b1-4888-9189-9d80866b05d2/image.mov)

## ref.read 와 ref.watch
### watch 
반환값의 업데이트가 있을때 지속적으로 build 함수를 다시 실행해준다.
필수적으로 UI 관련 코드에만 사용한다.
### read
실행되는 순간 단한번만 provider 값을 가져온다.
onPressed 콜백처럼 특정 액션 뒤에 실행되는 함수 내부에서 사용된다.

## Provider 의 종류
- Provider
- StateProvider
- StateNotifierProvider
- FutuerProvider
- StreamProvier
- ChangeNotifierProvider (사용안함 - Provider 마이그레이션 용도)

- 각각 다른 타입을 반환해주고 사용목적이 다르다.
- 모든 Provider 는 글로벌하게 선언된다.

|Provider 종류|반환 값|사용 예제|
|------|---|---|
|Provider|아무 타입|데이터 캐싱|
|StateProvider|아무 타입|간단한 상태값 관리|
|StateNotifierProvider|StateNotifier 를 상속한 값 변환|복잡한 상태값 관리|
|FutureProvider|Future 타입|Api 요청의 Future 결과값|
|StreamProvider|Stream 타입|Api 요청의 Stream 결과값|


### Provider 
가장 기본 베이스인, Provider
아무 타입이나 반환가능하다.
Service, 계산한 값등을 반환할때 사용
반환값을 캐싱할때 유용하게 사용 된다.(빌드 횟수 최소화 가능)
여러 Provider 의 값들을 묶어서 한번에 반환값을 만들어 낼 수 있다. 

### StateProvider
UI 에서 "직접적으로" 데이터를 변경할 수 있도록 하고싶을때 사용
단순한 형태의 데이터만 관리(int, double, String 등)
Map, List 등 복잡한 형태의 데이터는 다루지 않음 (number++ 정도의 간단한 로직으로만 한정)

### StateNotifierProvider
StateProvider와 마찬가지로 UI 에서 "직접적으로" 데이터를 변경할 수 있도록 하고싶을때 사용

복잡한 형태의 데이터관리가능(클래스의 메소드를 이용한 상태관리) 
StateNotifier를 상속한 클래스를 반환

### FutureProvider
Future 타입만 반환가능
Api 요청 결과를 반환할때 자주 사용
복잡한 로직 또는 사용자의 특정 행동 뒤에 Future를 재실행하는 기능이 없음(필요한 경우 StateNotifierProvider 사용)

### StreamProvider
Stream 타입만 반환가능
Api 요청의 결과를 Stream 으로 반환할때 자주 사용(Socket)






