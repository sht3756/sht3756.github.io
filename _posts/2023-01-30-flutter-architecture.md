---
# 제목
title: "Flutter 아키텍처!"
# 부가 내용 미리보기
excerpt: "Flutter 아키텍처에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, architecture]

# 
permalink: /flutter/architecture/

toc: true
toc_sticky: true

date: 2023-01-30
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Flutter 아키텍쳐

``` dart
dependencies:
	http: ^0.13.5           
```
강의가 flutter 2.0 버전이기에 3.0에 맞게 조금씩 바꿔가며 진행하겠다.
그리고 아직은 여러 방법을 경험해보는것이 중요하기에, 내가 알고있는 지식을 최대한으로 줄이고 최대한 강의 방법을 따라가도록 하겠다.

## 모델 클래스 작성
### 사용 API
https://pixabay.com/api/ 사용 

### 플러그인 설치 
유용해 보이지만.. 별로 쓰임이 못된다.. 그냥 json to dart 검색해서 파싱해보자!
![](https://velog.velcdn.com/images/sht-3756/post/c3aca6b6-3e68-4f44-aa63-110cfcd7dae9/image.png)

### json to dart 검색
https://www.webinovers.com/web-tools/json-to-dart-convertor

hits 에 대한 걸 json to dart 를 통해 convert 해보자
그리고 그대로 copy 해와 붙이자!

![](https://velog.velcdn.com/images/sht-3756/post/6e2b0517-d8cf-4883-9594-39ffe587cf38/image.png)
  
``` dart
class PhotoModel {
  PhotoModel({
    required this.id,
    required this.pageURL,
    required this.type,
    required this.tags,
    required this.previewURL,
    required this.previewWidth,
    required this.previewHeight,
    required this.webformatURL,
    required this.webformatWidth,
    required this.webformatHeight,
    required this.largeImageURL,
    required this.imageWidth,
    required this.imageHeight,
    required this.imageSize,
    required this.views,
    required this.downloads,
    required this.collections,
    required this.likes,
    required this.comments,
    required this.userId,
    required this.user,
    required this.userImageURL,
  });

  late final int id;
  late final String pageURL;
  late final String type;
  late final String tags;
  late final String previewURL;
  late final int previewWidth;
  late final int previewHeight;
  late final String webformatURL;
  late final int webformatWidth;
  late final int webformatHeight;
  late final String largeImageURL;
  late final int imageWidth;
  late final int imageHeight;
  late final int imageSize;
  late final int views;
  late final int downloads;
  late final int collections;
  late final int likes;
  late final int comments;
  late final int userId;
  late final String user;
  late final String userImageURL;

  PhotoModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    pageURL = json['pageURL'];
    type = json['type'];
    tags = json['tags'];
    previewURL = json['previewURL'];
    previewWidth = json['previewWidth'];
    previewHeight = json['previewHeight'];
    webformatURL = json['webformatURL'];
    webformatWidth = json['webformatWidth'];
    webformatHeight = json['webformatHeight'];
    largeImageURL = json['largeImageURL'];
    imageWidth = json['imageWidth'];
    imageHeight = json['imageHeight'];
    imageSize = json['imageSize'];
    views = json['views'];
    downloads = json['downloads'];
    collections = json['collections'];
    likes = json['likes'];
    comments = json['comments'];
    userId = json['user_id'];
    user = json['user'];
    userImageURL = json['userImageURL'];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};
    _data['id'] = id;
    _data['pageURL'] = pageURL;
    _data['type'] = type;
    _data['tags'] = tags;
    _data['previewURL'] = previewURL;
    _data['previewWidth'] = previewWidth;
    _data['previewHeight'] = previewHeight;
    _data['webformatURL'] = webformatURL;
    _data['webformatWidth'] = webformatWidth;
    _data['webformatHeight'] = webformatHeight;
    _data['largeImageURL'] = largeImageURL;
    _data['imageWidth'] = imageWidth;
    _data['imageHeight'] = imageHeight;
    _data['imageSize'] = imageSize;
    _data['views'] = views;
    _data['downloads'] = downloads;
    _data['collections'] = collections;
    _data['likes'] = likes;
    _data['comments'] = comments;
    _data['user_id'] = userId;
    _data['user'] = user;
    _data['userImageURL'] = userImageURL;
    return _data;
  }
}

```

## UI 작성
  
## 이미지 검색 기본 버전 완성

<!-- summary 아래 한칸 공백 두어야함 -->
### home_screen.dart
``` dart
  import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:image_saerch/model/photo_model.dart';
import 'package:image_saerch/ui/widget/photo_widget.dart';
import 'package:http/http.dart' as http;

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _controller = TextEditingController();

  List<PhotoModel> _photos = [];

  Future<List<PhotoModel>> fetch(String query) async {
    final res = await http.post(Uri.parse(
        'https://pixabay.com/api/?key=키값&q=$query&image_type=photo&pretty=true'));

    Map<String, dynamic> jsonResponse = jsonDecode(res.body);

    Iterable hits = jsonResponse['hits'];
    return hits.map((e) => PhotoModel.fromJson(e)).toList();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          '이미지 검색앱',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _controller,
              decoration: InputDecoration(
                border: const OutlineInputBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(10.0),
                  ),
                ),
                suffixIcon: IconButton(
                  onPressed: () async {
                    final photos = await fetch(_controller.text);

                    setState(() {
                      _photos = photos;
                    });
                  },
                  icon: const Icon(Icons.search),
                ),
              ),
            ),
          ),
          Expanded(
              child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: GridView.builder(
                itemCount: _photos.length,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16),
                itemBuilder: (_, index) {
                  final photo = _photos[index];

                  return PhotoWidget(photo: photo);
                }),
          )),
        ],
      ),
    );
  }
}

```
ui > widget > photo_widget.dart
``` dart
  import 'package:flutter/material.dart';
import 'package:image_saerch/model/photo_model.dart';

class PhotoWidget extends StatelessWidget {
  final PhotoModel photo;

  const PhotoWidget({
    Key? key,
    required this.photo,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.0),
          image: DecorationImage(
            fit: BoxFit.cover,
            image: NetworkImage(photo.previewURL),
          )),
    );
  }
}

```

## 기능 분리
  이렇게 보면 view 단에 비즈니스 로직이 있다. 
  비즈니스 로직 고치려면 뷰단에 들어가서 고치는 건 매우 불편한일이다.
  심지어 비즈니스로직이 뷰단에 같이 있어 가독성이 매우 떨어진다.
  그러니 분리시켜주자.
![](https://velog.velcdn.com/images/sht-3756/post/ff09236b-8559-4e14-a337-ed626538069c/image.png)
### 변경 후 
  ``` dart
  import 'package:flutter/material.dart';
import 'package:image_saerch/model/photo_model.dart';

class PhotoWidget extends StatelessWidget {
  final PhotoModel photo;

  const PhotoWidget({
    Key? key,
    required this.photo,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16.0),
          image: DecorationImage(
            fit: BoxFit.cover,
            image: NetworkImage(photo.previewURL),
          )),
    );
  }
}

  ```
  ``` dart
  class _HomeScreenState state<HomeScreen> {
  	final _controller TextEditingController();
  	final api = PixabayApi();
  
  	return 
  		... 
  		onPressesd:() async {
  			final test = await api.fetch(_controller.text);
  		} 
  }
  ```
  
## InheritedWidget 을 활용 객체 주입
>  현재 상태는 HomeScreenState 클래스 안에서 Pixabay클래스를 인스턴스한 상황이다. 그러니 저 인스턴스를 하지 않는다면 HomeScreenState클래스 는 실행되지않는 결합도가 생겨버린 몸이 되어버렸다.(의존성이 주입된 상태)
  

위의 기능분리 단계에서 뷰단에 있는 비즈니스 로직을 분리해서 PixabayApi() 클래스를 불러왔다. 여기서 클래스 간의 결합도는 낯추는 방법을 배우겠다.
  
  
  
  클래스와 클래스간의 결합도를 느슨하게 하는 방법은 외부에서 생성된인스턴스를 받아서 사용하는 것이다.
  
  
  
## Stream 활용 데이터 다루기
  
  ```dart
  import 'package:flutter/material.dart';
import 'package:image_saerch/data/photo_provider.dart';
import 'package:image_saerch/model/photo_model.dart';
import 'package:image_saerch/ui/widget/photo_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final photoProvider = PhotoProvider.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          '이미지 검색앱',
          style: TextStyle(color: Colors.black),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _controller,
              decoration: InputDecoration(
                border: const OutlineInputBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(10.0),
                  ),
                ),
                suffixIcon: IconButton(
                  onPressed: () async {
                    photoProvider.fetch(_controller.text);
                  },
                  icon: const Icon(Icons.search),
                ),
              ),
            ),
          ),
          StreamBuilder<List<PhotoModel>>(
            stream: photoProvider.photoStream,
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return const CircularProgressIndicator();
              }
              final _photos = snapshot.data!;
              return Expanded(
                child: GridView.builder(
                    padding: const EdgeInsets.all(16.0),
                    itemCount: _photos.length,
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 16,
                        mainAxisSpacing: 16),
                    itemBuilder: (_, index) {
                      final photo = _photos[index];

                      return PhotoWidget(photo: photo);
                    }),
              );
            },
          ),
        ],
      ),
    );
  }
}
  ```
  ``` dart
  import 'dart:async';

import 'package:flutter/material.dart';
import 'package:image_saerch/data/api.dart';
import 'package:image_saerch/model/photo_model.dart';

class PhotoProvider extends InheritedWidget {
  final PixabayApi api;
  final _photoSteamController = StreamController<List<PhotoModel>>()..add([]);

  Stream<List<PhotoModel>> get photoStream => _photoSteamController.stream;

  PhotoProvider({
    Key? key,
    required this.api,
    required Widget child,
  }) : super(key: key, child: child);

  static PhotoProvider of(BuildContext context) {
    final PhotoProvider? result =
        context.dependOnInheritedWidgetOfExactType<PhotoProvider>();
    assert(result != null, 'No pixabayApi found in context');
    return result!;
  }

  Future<void> fetch(String query) async {
    final result = await api.fetch(query);
    _photoSteamController.add(result);
  }
  @override
  bool updateShouldNotify(PhotoProvider oldWidget) {
    return oldWidget.api != api;
  }
}

  ```
## 라이브러리 없이 MVVM 구현
MVVM 모델!
  <span style="color:orange">M</span>odel
  <span style="color:orange">V</span>iew
  <span style="color:orange">V</span>iew<span style="color:orange">M</span>odel
model 과 view 는 이미 알고 있고, viewmodel 은 view를 위한 model 이다.
  이렇게 나누면 테스트 하기에도 용이한데, 작성 로직 , 파일을 확인하기 위함이다.  
```dart
// home_view_model.dart
class HomeViewModel {
  final PixabayApi api;

  HomeViewModel(this.api);

  final _photoSteamController = StreamController<List<PhotoModel>>()..add([]);

  Stream<List<PhotoModel>> get photoStream => _photoSteamController.stream;

  Future<void> fetch(String query) async {
    final result = await api.fetch(query);
    _photoSteamController.add(result);
  }
}
```
``` dart
// home_screen.dart
...
class _HomeScreenState extends State<HomeScreen> {
  ...
  @override
  Widget build(BuildContext context) {
  	// 변경!
    final viewModel = PhotoProvider.of(context).viewModel;

    return Scaffold(
      appBar: AppBar(
		...
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(            
  				...
                ),
                suffixIcon: IconButton(
                  onPressed: () async {
                    viewModel.fetch(_controller.text);
                  },
                  icon: const Icon(Icons.search),
                ),
              ),
            ),
          ),
          StreamBuilder<List<PhotoModel>>(
            stream: viewModel.photoStream,
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return const CircularProgressIndicator();
              }
              final _photos = snapshot.data!;
              return Expanded(
                child: GridView.builder(
                    padding: const EdgeInsets.all(16.0),
                    itemCount: _photos.length,
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 16,
                        mainAxisSpacing: 16),
                    itemBuilder: (_, index) {
                      final photo = _photos[index];

                      return PhotoWidget(photo: photo);
                    }),
              );
            },
          ),
        ],
      ),
    );
  }
}

  ```
## ViewModel 과 Test
[test](https://pub.dev/packages/test#stream-matchers) 는 자동으로 패키지에 설치된 라이브러리로 사용한다.
viewMoel이 제대로 작동하는지 test 코드를 작성해보겠다.
UI 테스트는 개인적으로 해보고, viewModel 테스트코드만 작성해보자

그리고, test 를 폴더랑 파일을 생성할때 lib 폴더 에 저장해놓은 그대로 폴더구조를 해놓자! 그래야 보기 편함.

기본 test() 함수 코드
``` dart
// test/ui/home_view_model_test.dart 생성
void main() {
	test(description, () => null);
}
```
viewModel 을 정의 해서 타입 검사를 해보겠다. 
``` dart
  void main() {
  test('Stream 이 잘 동작해야한다.', () async {
    // viewModel 로 따로 분리를 했기에 이렇게 test 코드로 작성가능한 것이다.
    final viewModel = HomeViewModel(PixabayApi());

    await viewModel.fetch('apple');
    await viewModel.fetch('apple');
    // 어떤 값이 올지 예측하는 코드 작성
    expect(
        viewModel.photoStream,
        // 순서대로 어떤 동작들이 일어날건지 리스트로 작성가능
        emitsInOrder([
          // 타입 검사 isA, <List<PhotoModel>> 의 타입이 제대로 들어왔는지
          isA<List<PhotoModel>>(),
          isA<List<PhotoModel>>()
        ])
    );
  });
}
```
첫번째 테스트 결과가 잘 나왔다. 
![](https://velog.velcdn.com/images/sht-3756/post/7ae1fc3e-580e-46cd-9016-0d0c2b73ea28/image.png)

하지만, PixabayApi() 가 문제가 있다면, HomeViewModel() 도 테스트가 안된다. 의존되는 객체를 의존 되지 않게 해줘야한다. 

> 테스트란 의존되는 객체때문에 결과가 달라지면 안된다!


기존 코드
``` dart
// home_view_model_test.dart
    final viewModel = HomeViewModel(PixabayApi());
    
// home_view_model.dart
    class HomeViewModel {
  	  final PixabayApi api;

	  HomeViewModel(this.api);
      ...
    }
```

인터페이스를 활용해서 임의의 데이터로 테스트를 진행할 수 있게끔  바꿔서 진행하겠다.
PixabayApi 클래스에서 제일 필요한 거는 fetch 함수이다. 
그 함수를 클래스의 인스턴스를 만들어 분리 시켜주겠다.(의존성 분리!)

``` dart
// /data/photo_api.repository.dart
import 'package:image_saerch/model/photo_model.dart';

abstract class PhotoApiRepository {
  Future<List<PhotoModel>> fetch(String query);
}
```

그렇게 되면, 기존에 HomeViewModel 의 api 를 변경해줘야한다.
그럼 HomeViewModel 은 PixabayApi 와 관계가 있는것이 아닌 PhotoApiRepository 와 관계가 생긴것이다. 

``` dart
class HomeViewModel {
	// 변경 PixabayApi -> PhotoApiRepository, api -> repository 
	final PhotoApiRepository repository;
	...
}
```
``` dart
// 상속 PhotoApiRepository
class PixabayApi implements PhotoApiRepository{
	...
}
```


``` dart
// home_view_model_test.dart
void main() {
  test('Stream 이 잘 동작해야한다.', () async {
    // viewModel 로 따로 분리를 했기에 이렇게 test 코드로 작성가능한 것이다.
    final viewModel = HomeViewModel(FakePhotoApiRepository());

    await viewModel.fetch('apple');
    await viewModel.fetch('iphone');
    // 어떤 값이 올지 예측하는 코드 작성
    expect(
        viewModel.photoStream,
        // 순서대로 어떤 동작들이 일어날건지 리스트로 작성가능
        emitsInOrder([
          equals([]),
          equals(fakeJson.map((e) => PhotoModel.fromJson(e)).toList()),
          equals(fakeJson.map((e) => PhotoModel.fromJson(e)).toList()),
        ]));
  });
}


class FakePhotoApiRepository extends PhotoApiRepository {
  @override
  Future<List<PhotoModel>> fetch(String query) async {
    // 임의의 데이터를 준다.
    Future.delayed(const Duration(milliseconds: 500));

    return fakeJson.map((e) => PhotoModel.fromJson(e)).toList();
  }
}

// 가짜 데이터 일부를 그대로 가져온다.
List<Map<String, dynamic>> fakeJson = [
  {
    "id": 2295434,
    "pageURL":
        "https://pixabay.com/photos/spring-bird-bird-tit-spring-blue-2295434/",
    "type": "photo",
    "tags": "spring bird, bird, tit",
    "previewURL":
        "https://cdn.pixabay.com/photo/2017/05/08/13/15/spring-bird-2295434_150.jpg",
    "previewWidth": 150,
    "previewHeight": 99,
    "webformatURL":
        "https://pixabay.com/get/g2d0806cf3ecb54379ef7b49fff34b7fe14aa9befa24eb94b5c5dd0ba5d130ff771c55d76487ae03401c8b87fdcaba75b3eac014958513a6438b14516ba38fcd2_640.jpg",
    "webformatWidth": 640,
    "webformatHeight": 426,
    "largeImageURL":
        "https://pixabay.com/get/g9963a4416a7094b2d7fc79081785913be73c06e8b9096c4cc2a3f2216ac7c02a7574c31f47d02d2d1f3e0cc0ec76166cc0a85df1bd7b96eafed62def3a82d41c_1280.jpg",
    "imageWidth": 5363,
    "imageHeight": 3575,
    "imageSize": 2938651,
    "views": 621251,
    "downloads": 358054,
    "collections": 2053,
    "likes": 1981,
    "comments": 249,
    "user_id": 334088,
    "user": "JillWellington",
    "userImageURL":
        "https://cdn.pixabay.com/user/2018/06/27/01-23-02-27_250x250.jpg"
  },
  {
    "id": 3063284,
    "pageURL":
        "https://pixabay.com/photos/rose-flower-petal-floral-noble-3063284/",
    "type": "photo",
    "tags": "rose, flower, petal",
    "previewURL":
        "https://cdn.pixabay.com/photo/2018/01/05/16/24/rose-3063284_150.jpg",
    "previewWidth": 150,
    "previewHeight": 99,
    "webformatURL":
        "https://pixabay.com/get/g74eebf94a08a77f5c607a68e11c5188c2ed5479c3f835103f526625d1696d36add22668b152744fa6abfb57924e3531a3f90358a0cec96df4c87bef24807748f_640.jpg",
    "webformatWidth": 640,
    "webformatHeight": 426,
    "largeImageURL":
        "https://pixabay.com/get/g732b9d620fd51dc9e839c24201cfcbcc40f7adee22c4fa4b7d81e6e2c1f03a7aacc6c1bcf5a8faac698f8f793b6b3a7c941afdd198e2e810f5b36cce379b29a8_1280.jpg",
    "imageWidth": 6000,
    "imageHeight": 4000,
    "imageSize": 3574625,
    "views": 1043353,
    "downloads": 674161,
    "collections": 1408,
    "likes": 1524,
    "comments": 329,
    "user_id": 1564471,
    "user": "anncapictures",
    "userImageURL":
        "https://cdn.pixabay.com/user/2015/11/27/06-58-54-609_250x250.jpg"
  },
];

```

테스트 진행 (에러)
내가 api 로 데이터 가져온것과 가짜데이터 매핑된 것과 같은지 비교(equals())
에러가 나는 이유는 id 값이 다르다고 인식을 한다.
PhotoModel 에서 인스턴스를 계속 새로 만들어주면서 내용물은같지만 다르다고 인식을 하는것이다. 
![](https://velog.velcdn.com/images/sht-3756/post/4a7e5d16-487a-4cc1-956a-73c7cc81f5b1/image.png)

해결 방법
model 에서 ==() and hashCode 를 Generate 해서 컬랙션 내에 동일 값을 비교하는 규칙을 제정의 하는것이다.(hashCode 를 비교하는게 기본이다.) 우리는 id 를 기준으로 비교를 해보자.

``` dart
class PhotoModel {
  ...
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is PhotoModel && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'PhotoModel{id: $id}';
  }
}
```
테스트 결과
![](https://velog.velcdn.com/images/sht-3756/post/dd0a4ceb-5ad7-4e9e-85e9-9c5aafc93c64/image.png)

만약에, equals() 함수가 테스트 한것과 갯수가 맞지않는다면?
api 테스트를 2개 요청하고  equals() 함수를 3개를 출력하면 테스트가 끝나지 않고 계속 로딩이 돌아간다. viewModel.photoStream, 에 값이 들어오기를! 그러니 갯수에 맞게 테스트를 진행하자!
``` dart
void main() {
  test('Stream 이 잘 동작해야한다.', () async {
    final viewModel = HomeViewModel(FakePhotoApiRepository());
	// 여기는 2개 
    await viewModel.fetch('apple');
    await viewModel.fetch('iphone');

    expect(
        viewModel.photoStream,
        // 순서대로 어떤 동작들이 일어날건지 리스트로 작성가능
        emitsInOrder([
      	  // 처음에 넣어줄때 빈값을 넣어줬으니(..add([])), 처음에는 [] 값이 들어가있다. ; 
          equals([]),
          // 여기는 1개를 더 추가하면??
          equals(fakeJson.map((e) => PhotoModel.fromJson(e)).toList()),
          equals(fakeJson.map((e) => PhotoModel.fromJson(e)).toList()),
        ]));
  });
}
```





### 꿀팁!(빠르게 toString(), ==() and hashCode) 
model toString 빠르게 만들어보기!
``` [Instance of 'PhotoModel']```
print 로 찍어 볼때 이런식으로 출력되는 걸 볼수 있다. 이럴떄마다 toString 을 재정의 해줘야하는데, ```⌘ + N``` 을 클릭해 toString() 으로 하고싶은걸 클릭하자!

![](https://velog.velcdn.com/images/sht-3756/post/2ebbbef4-4084-4b7f-aa9d-7c60218f8bb1/image.png)


![](https://velog.velcdn.com/images/sht-3756/post/5e28a840-eb96-49d4-854d-3e5e59c814df/image.png)

> 결국은 ViewModel 을 나눈 이유 : ViewModel 자체를 테스트 하기 위함.

## Mockito 를 활용한 테스트
이전 단계에서 ViewModel 을 테스트를 해봤으니, 이제는 pixabayAPi 를 테스트를 진행 해볼것이다.
실제 구동전에 성공실패를 알수 없으니, api 테스트를 진행할 것이다.
``` dart
import 'package:flutter_test/flutter_test.dart';
import 'package:image_saerch/data/pixabay_api.dart';

void main() {
  test('Pixabay 데이터를 잘 가져와야 한다.', () async {
    final api = PixabayApi();

    final res = await api.fetch('iphone');

    expect(res.length, 20);

  });
}
```
테스트 결과
![](https://velog.velcdn.com/images/sht-3756/post/0d7cdf6c-0a56-4957-9d9b-7e0795dfed4f/image.png)

flutter 에서 제공하는 [Mockito](https://docs.flutter.dev/cookbook/testing/unit/mocking) 을 사용해보겠다.

설명 참조 )
http.get() => http 의 기본적인 client 를 사용하는 것이다.
client.get() => 코드 위에 {http.Client? client} 라고 파라미터를 받게 작성을 했고, 만약에 파라미터로 넘겨준 client 값이 있으면, 그값으로 하고 만약 없으면, 기본 http.get() 으로 해라! 라는 뜻이다.

그리고 ??= 은 if( == null) 이랑 같은 문이다.

``` dart
dev_dependencies:
	mockito: ^5.3.2
	build_runner: ^2.3.3
```
``` dart
import 'dart:convert';

import 'package:image_saerch/data/photo_api_repository.dart';
import 'package:image_saerch/model/photo_model.dart';
import 'package:http/http.dart' as http;

class PixabayApi implements PhotoApiRepository{
  static const baseUrl = 'https://pixabay.com/api/';
  static const key = '키값';
	
  // 재정의를 꼭해줘야한다.
  @override
  Future<List<PhotoModel>> fetch(String query, {http.Client? client}) async {
    // client 가 null 일때 http.Client() 로 초기화하겠다.
    client ??= http.Client();

	// 설명 참조 )
    final res = await client.get(Uri.parse(
        '$baseUrl?key=$key&q=$query&image_type=photo&pretty=true'));

    Map<String, dynamic> jsonResponse = jsonDecode(res.body);

    Iterable hits = jsonResponse['hits'];
    return hits.map((e) => PhotoModel.fromJson(e)).toList();
  }
}

```
Client 객체를 조작해서 헤더를 세세하게 조작하기 위함이다.





여기서 mockito 가 업데이트 되면서, http 패키지에서 Mockito 객체를 제공해서 만들수 있게 되었다. 굳이 ```@GenerateMocks([http.client])``` 할필요없어짐.
// when() : 이런 동작들은 실행했을때 어떤 결과를 줄건지  동작 정의 하는 when()
``` dart
void main() {
  test('Pixabay 데이터를 잘 가져와야 한다.', () async {    
	// 준비	       
    final mockClient = MockClient((request) async {
      if (request.url.toString() ==
          '${PixabayApi.baseUrl}?key=${PixabayApi.key}&q=iphone&image_type=photo&pretty=true') {
        return Response(fakeData, 200);
      }
      return Response('error', 404);
    });

	final api = PixabayApi(client: mockClient);
    
	// 실행
    List<PhotoModel> photos = await api.getImages('apple');
    
    // 검증
    expect(photos[0].previewUrl, 
    	'https://pixabay.com/photos/phone-wallpaper-watercolor-painting-2681039/');
    expect(photos.length, 20);    
  });
}

// 가짜 데이터 전부다 긁어옴
String fakeData = """{
	...
}
"""
```

## JsonSerializable 과 Equatable
``` dart
json_annotation: ^4.8.0
equatable: ^2.0.5
```
[이 모델 부분](https://velog.io/@sht-3756/Flutter-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98#json-to-dart-%EA%B2%80%EC%83%89)을 직접 작성하자니 실수할 수 있다. 
이것도 라이브러리가 편하게 작성해준다. 

그리고 Equatable 은 [==()](https://velog.io/@sht-3756/Flutter-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98#%EA%BF%80%ED%8C%81%EB%B9%A0%EB%A5%B4%EA%B2%8C-tostring--and-hashcode)를 조금더 편리하게 작성하기 위한 방법이다.

model 에다가 상속만 해주면 바로 사용가능하다.
``` dart
part 'photo_model.g.dart';

@JsonSerializable()
class PhotoModel extends Equatable{
	...
    @override
	List<Object?> get props => [id];
}

```
그리고 나서 테스트를 진행해보면, 제대로 통과하는것을 확인가능하다.
```flutter test``` 하면 전체 테스트 가능!
![](https://velog.velcdn.com/images/sht-3756/post/810ba339-9924-4f49-8384-c548ad8b1536/image.png)

## [Freezed](https://pub.dev/packages/freezed) 
``` dart
dependencies:
	freezed_annotation: ^2.2.0
dev_dependencies:
	build_runner: ^2.3.3
	freezed: ^2.3.2
```
이전 단계에서 JsonSerializable 과 Equatable 을 사용하면서, model 객체가 불변객체로 바뀌었다. (불변이란, 한번 값이 세팅되면 변하지 않고, 에러 발생률이 낮아진다.) 변수보단 상수 쓰듯이 객체도 불변 객체를 사용하자!
이것 보다 더 많은 기능을 사용하려면 freezed 를 사용하는 것이다.

![](https://velog.velcdn.com/images/sht-3756/post/1d5cae85-afaf-42e6-92c4-73627155f076/image.png)

Freezed 의 플러그인을 따로 설치를해줬고, 
기존 모델을 삭제하고 Freezed 를 통해 다시 작성해보았다.

``` dart
import 'package:freezed_annotation/freezed_annotation.dart';
part 'photo_model.freezed.dart';
part 'photo_model.g.dart';

@freezed
class PhotoModel with _$PhotoModel {
  factory PhotoModel({
    required int id,
    required String tags,
    required String previewURL,
  }) = _PhotoModel;

  factory PhotoModel.fromJson(Map<String, dynamic> json)
  => _$PhotoModelFromJson(json);
}
```
```flutter pub run build_runner build``` 해주면 JsonSerialized 사용하는 것마냥 .freezed.dart 파일이 생긴다. 기능은 같다~

기존 코드보다 짧아진것을 볼 수 있다.
![](https://velog.velcdn.com/images/sht-3756/post/eb9812dd-cda0-47cb-9aa0-3a160939fd91/image.png)


이후 테스트 진행 
![](https://velog.velcdn.com/images/sht-3756/post/ac3a21d5-8b66-46fb-8901-51766a20c5be/image.png)

## [Provider](https://pub.dev/packages/provider) 
``` dart
provider: ^6.0.5
```
플러터는 이것또한 편하게 작성가능하게 라이브러리가 있다.
![](https://velog.velcdn.com/images/sht-3756/post/24cee9a4-691e-4524-b959-f7efde5254d6/image.png)
기본적인 동작 흐름을 알기위해선 getX 보다 먼저 기본적인 Provider 를 배우는게 좋다.




``` dart
// 기본 작성법
Provider(
	create: (_) => Home(),
    child: ...
)
```
|기존|변경|
|--|--|
|![](https://velog.velcdn.com/images/sht-3756/post/de650a8c-f830-4b47-80e3-eb3c616226b7/image.png)|![](https://velog.velcdn.com/images/sht-3756/post/2674f408-1a68-4fe8-8b68-b843ce0b39e8/image.png)|
|![](https://velog.velcdn.com/images/sht-3756/post/7d74bc8d-faca-491d-ba97-56b8b1c80e5d/image.png)|예전 방식![](https://velog.velcdn.com/images/sht-3756/post/594b3ee4-d0fb-4d36-aff3-c53cb78cc75e/image.png)
||최근방식![](https://velog.velcdn.com/images/sht-3756/post/df2149a2-a850-41c1-ba9a-3768d1e47fea/image.png)
|


> 결론은 InheritedWidget 으로 만든 provider 클래스는 아예 사용을 안하고 있다. Provider() 를 사용하면 Provider 파일을 따로 만들필요가 없다.

라이브러리를 사용하지 않는 코드에는 InheritedWidget 를 상속한다.
이 파일을 삭제해도 문제 없다.
![](https://velog.velcdn.com/images/sht-3756/post/83a182e3-da5f-4533-a83e-ee73049baf0b/image.png)





## ChangeNotifierProvider, Consumer

변경이 감지 가능한 뷰 모델을 만들기 쉽다.
무조건 changeNotifier 를 상속받아야한다.

with mixin 기능 사용, 상속이랑 비슷한 개념이다.
``` dart
// ChangeNotifier 을 mixin 하기 위함
class HomeViewModel with ChangeNotifier{
  final PhotoApiRepository repository;

  List<PhotoModel> _photos = [];

  // get 만든 이유 : 내부에서는 변경할수 있게 하고 외부에서는 불가능하게 하려고!
  // 외부에서 _photos 를 조회할 수 있게 한것이다.
  List<PhotoModel> get photos => _photos;

  // 예 1 시작 )
  final String _string = '';
  
  String get string => _string;
  // 예 1 끝 )

  HomeViewModel(this.repository);

  Future<void> fetch(String query) async {
    final result = await repository.fetch(query);
    _photos = result;
    // 감시하고 있는 곳에 화면이 다시 그려질수 있게 알려준다.
    notifyListeners();
  }
}

```
test 의 viewModel 을 보겠다.
getter 로 불러온 값들은 재 선언이 불가능한데, list 에 함수(add, remove, clear) 는 가능하다.
이것을 막아줄 필요가 있다. dart 문법으로 UnmodifiableListView 를 제공해주는데, 외부에서 수정을 못하게(함수 사용불가능하게) 만들어준다.
(앱을 죽이는 방법으로 진행) 

![](https://velog.velcdn.com/images/sht-3756/post/fd838871-59d7-45c4-a098-a9a89e4df667/image.png)

``` dart
// UnmodifiableListView 를 추가해준다.

UnmodifiableListView<PhotoModel> get photos => UnmodifiableListView(_photos);
```

add 함수를 따라가보면, 변경이 된걸 확인할 수 있다.


|기존|변경후|
|--|--|
|![](https://velog.velcdn.com/images/sht-3756/post/71da74f6-ecb0-419d-8539-db02934bbc20/image.png)|![](https://velog.velcdn.com/images/sht-3756/post/936a4314-5abf-4aaa-8399-303b609c5277/image.png)|

Provider 는 변화를 감지 못하니 감지를 할 수 있게 ChangeNotifierProvider 로 변경하여 감싸주자
그리고 Stream 부분을 싹다 삭제해주자.
Stream 부분을 삭제하니 가독성이 높아졌고 UI 적으로도 너무 좋아졌다.

|기존|변경후|
|--|--|
|![](https://velog.velcdn.com/images/sht-3756/post/bca4b6d5-a2c2-4ba9-b794-bf20754a8de0/image.png)|![](https://velog.velcdn.com/images/sht-3756/post/2f73cdbd-0308-4c10-a8eb-f00af2970fe4/image.png)

테스트
``` dart
void main() {
  test('Stream 이 잘 동작해야한다.', () async {
    // viewModel 로 따로 분리를 했기에 이렇게 test 코드로 작성가능한 것이다.
    final viewModel = HomeViewModel(FakePhotoApiRepository());

    await viewModel.fetch('apple');

    final List<PhotoModel> result = fakeJson.map((e) => PhotoModel.fromJson(e)).toList();

    expect(viewModel.photos, result);

  });
}
```
결과
![](https://velog.velcdn.com/images/sht-3756/post/e6711cf4-c12c-4497-8fe4-ad835360be36/image.png)


``` dart
Widget build(BuildContext context) {
	final viewmodel = cotext.watch<HomeViewModel>();        
    ...
}
```
여기서 HomeViewModel 을 watch 하면서 상태가 변할때 마다 build 함수를 전체다 그린다. 이건 효율적이지 못한다.
그래서 Consumer() 위젯을 사용해준다.(그다지 성능차이는 안나는데, 굳이consumer를 안써줘도 된다.)

![](https://velog.velcdn.com/images/sht-3756/post/b02b29d7-3649-4475-b4b2-af528871e3fd/image.png)

## 클린 아키텍쳐
![](https://velog.velcdn.com/images/sht-3756/post/665c9ed4-ce7d-48f5-b776-369e6c2025ba/image.png)

<span style="color: yellow">노랑</span>(Data Layer)
<span style="color: orange">주황</span>(Domain Layer)
<span style="color: green">초록</span>(Presentation Layer)

노랑 - 비즈니스 적인 부분,
DataSource
Repository(impolements)
주황 - 비즈니스 적인 부분,추상적인 개념의 레이어층(photo_api_repository)
Entity 는 Model Class)

초록 - MNNM 패턴으로 만들어서 view 와 viewModel을 말하는것이고 

|Data Layer: repository 를 구현하고 있는 데이터 층|Domain Layer|Presentation Layer|
|--|--|--|
|Data Source: 데이터 제공 |Use Case|View: view 단|
|Repository(impolements): repository 를 상속받아 있는 구현하는 곳 |Repository(Interface): 추상적인 개념의 레이어들이 있는곳 보통은 interface 존재 |ViewModel: view 의 비즈니스 로직|
|--|Entity(Model):각 모델|--|

![](https://velog.velcdn.com/images/sht-3756/post/003fb61f-e98c-4ceb-9063-46eac4b36a0a/image.png)


## 에러처리

인터넷이 끊겼을때 
``` dart
 abstract class Result<T> {
  factory Result.success(T data )= Success;
  factory Result.error(String message) = Error;
}

class Success<T> implements Result<T> {
  final T data;

  Success(this.data);
}

class Error<T> implements Result<T> {
  final String message;

  Error(this.message);
}
```

# 상태를 불변상태로 관리하기
# Use Case
# DI(Dependecies Injection)
의존성을 주입 시켜주겠다.

``` dart
import 'package:image_saerch/data/data_source/pixabay_api.dart';
import 'package:image_saerch/data/repository/photo_api_repository_impl.dart';
import 'package:image_saerch/domain/repository/photo_api_repository.dart';
import 'package:image_saerch/domain/use_case/get_photos_use_case.dart';
import 'package:image_saerch/presentation/home/home_view_model.dart';
import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';
import 'package:http/http.dart' as http;

// 1. provider 전체
List<SingleChildWidget> globalProviders = [
  ...independentModels,
  ...dependentModels,
  ...viewModels,
];

// 2. 독립적인 객체
List<SingleChildWidget> independentModels = [
  Provider<http.Client>(
    create: (context) => http.Client(),
  ),
];

// 3. 2번의 의존성이 있는 객체
List<SingleChildWidget> dependentModels = [
  ProxyProvider<http.Client, PixabayApi>(
    update: (context, client, _) => PixabayApi(client),
  ),
  ProxyProvider<PixabayApi, PhotoApiRepository>(
    update: (context, api, _) => PhotoApiRepositoryImpl(api),
  ),
  ProxyProvider<PhotoApiRepository, GetPhotosUseCase>(
    update: (context, repository, _) => GetPhotosUseCase(repository),
  ),
];

// 4. ViewModels
List<SingleChildWidget> viewModels = [
  ChangeNotifierProvider<HomeViewModel>(
    create: (context) => HomeViewModel(context.read<GetPhotosUseCase>()),
  ),
];


``` 

``` dart
void main() {
  runApp(
    MultiProvider(
      providers: globalProviders,
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}
```

## 클린 아키텍처 정리
[참조 글 보러가보기](https://medium.com/@justfaceit/clean-architecture%EB%8A%94-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EA%B0%9C%EB%B0%9C%EC%9D%84-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%84%EC%99%80%EC%A3%BC%EB%8A%94%EA%B0%80-1-%EA%B2%BD%EA%B3%84%EC%84%A0-%EA%B3%84%EC%B8%B5%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%B4%EC%A4%80%EB%8B%A4-b77496744616)

