---
# 제목
title: "GetxController 와 GetxService 는 무엇일까?"
# 부가 내용 미리보기
excerpt: " 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, getxController, getxService]

# 
permalink: /flutter/getx-controller-service/

toc: true
toc_sticky: false

date: 2023-04-11
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 GetxController 와 GetxService 


## GetxController 와 GetxService 설명 시작! 
> GetxController 는 <span style="color: pink">사랑꾼!</span>
> GetxService 는 <span style="color: red">불사신!</span>

Getx 로 상태관리를 진행하면서 GetxController 와 GetxService 를 상속을 하면서, 그 둘의 차이를 알고 싶어 정리를 했다.

둘의 정의와 차이점
GetxController 는 비즈니스 로직들을 모아놓은 뷰 모델의 역할을 하는 녀석이고, 
생명주기가 화면단이 죽으면 같이죽는다.

GetxService 는 백엔드 서버와 통신하는 역할을 하는 녀석이다. 
생명주기가 화면단이 죽어도 죽지 않는다.


GetxController 의 모습
``` dart
class FeedController extends GetxController with StateMixin<List<FeedModel>> {
  // repository 참조! (repository 에서 선언한 api 통신을 사용하기 위함!)
  FeedProvider feedProvider = FeedProvider();
  
  // private 변수 선언! (변수의 변경은 오직 FeedController 에서만!)
  final Rx<FeedModel?> _feed = Rx<ReedModel?>(null); 

  // getter 선언! (뷰단에서 뿌려주기 위한 용도!)
  FeedModel? get feed => _feed;
  
  // 함수 선언! (뷰단에서 호출할 함수!)
  Future<void> getFeedDataFunction() async {
  	_feed = await feedProvider.getFeedData();  
  }
	
}
```
GetxService 의 모습 
``` dart
class FeedProvider extends GetConnect implements GetxService {

  final ip = 'https://주소.firebaseio.com';

  // 피드 리스트 불러오기
  Future getFeedData() async {
    final res = await get('$ip/feed-list.json');
    print(res);
    if (res.status.hasError) {
      return Future.error({res.statusText});
    } else {
      return FeedModel.fromJson(res.body);
    }
  }
  ...
}
```

GetxController 는 화면단이 dispose 되면 같이 사라지고, GetService 는 Get의 인스턴스를 모두 초기화 하지 않는 이상 사라지지 않는다!

> Get.reset() => 겟의 instance 를 모두 초기화하는 것이므로 등록된 service 도 삭제되는 것이다. 



### 나의 개발 구조 
``` 서버(백엔드) -> 레포지토리(Provider) -> 컨트롤러 -> 뷰 ```
내가 현재 개발하고 있는 개발 흐름 구조이다.


백엔드 => 서버를 담당하고 있으며, NOSQL 로 간편하게 Firebase 를 선택했다.
뷰 => 유저가 보는 뷰단
컨트롤러 => 뷰를 관리하는 뷰의 비즈니스 로직 (=viewModel)
프로바이더(레포지토리) => 컨트롤러에게 데이터를 wrapping해서 넘겨주는 역할(실질적으로 api 통신하는 코드)

개발자가 화면에서 볼 데이터를 컨트롤러가 관리하고, 프로바이더에서 데이터를 wrapping 해서 넘겨주는 방향이다.

> 뷰와 뷰비즈니스 로직을 분리해서 의존성을 줄이는 방향으로 진행하는 중이다.






