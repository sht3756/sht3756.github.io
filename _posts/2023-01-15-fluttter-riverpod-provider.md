---
# 제목
title: "RiverPod Provider 실제 적용!"
# 부가 내용 미리보기
excerpt: "RiverPod Provider 실제 적용에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, riverpod, provider ]

# 
permalink: /flutter/riverpod-provider/

toc: true
toc_sticky: true

date: 2023-01-15
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 RiverPod Provider 적용

## 기존의 코드 
리스트 스크린
``` dart
class RestaurantScreen extends StatelessWidget {
  const RestaurantScreen({Key? key}) : super(key: key);

  Future<List<RestaurantModel>> paginateRestaurant() async {
    final dio = Dio();

    dio.interceptors.add(CustomInterceptor(storage: storage));

    final res =
        await RestaurantRepository(dio, baseUrl: 'http://$ip/restaurant')
            .paginate();

    return res.data;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
          child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: FutureBuilder<List<RestaurantModel>>(
          future: paginateRestaurant(),
          builder: (context, AsyncSnapshot<List<RestaurantModel>> snapshot) {
				...
                itemCount: snapshot.data!.length);
          },
        ),
      )),
    );
  }
}
```

디테일 스크린
``` dart
class RestaurantDetailScreen extends StatelessWidget {
  // 해당 디테일 id
  final String id;

  const RestaurantDetailScreen({
    Key? key,
    required this.id,
  }) : super(key: key);

  Future<RestaurantDetailModel> getRestaurantDetail() async {
    final dio = Dio();

    dio.interceptors.add(
      CustomInterceptor(storage: storage),
    );

    final repository =
        RestaurantRepository(dio, baseUrl: 'http://$ip/restaurant');

    return repository.getRestaurantDetail(id: id);
  }

  @override
  Widget build(BuildContext context) {
    return DefaultLayout(
      title: '불타는 떡볶이',
      child: FutureBuilder<RestaurantDetailModel>(
          future: getRestaurantDetail(),
          builder: (_, AsyncSnapshot<RestaurantDetailModel> snapshot) {
			...
          }),
    );
  }
}
```
## 변화된 코드
레포지토리
``` dart
part 'restaurant_repository.g.dart';

// 추가 코드 시작 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// repository 도 Provider 안에 넣기!
// 기존의 코드릭팩토링(레스토랑 스크린, 디테일 스크린에 있던 페이지네이션 요청 및 응답 하던 코드를 Provider 안에 로직에 넣어서 UI 단에는 UI 코드만 있게끔 리팩토링함.)
final restaurantRepositoryProvider = Provider<RestaurantRepository>(
  (ref) {
    final dio = ref.watch(dioProvider);
    final repository =
        RestaurantRepository(dio, baseUrl: 'http://$ip/restaurant');
    return repository;
  },
);
// 추가 코드 끝 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

@RestApi()
abstract class RestaurantRepository {
  factory RestaurantRepository(Dio dio, {String baseUrl}) =
      _RestaurantRepository;

  @GET('/')
  @Headers({
    'accessToken': 'true',
  })
  Future<CursorPagination<RestaurantModel>> paginate();

  @GET('/{id}')
  @Headers({
    'accessToken': 'true',
  })
  Future<RestaurantDetailModel> getRestaurantDetail({
    @Path() required String id,
  });
}
```

리스트 스크린 
``` dart
class RestaurantScreen extends ConsumerWidget {
  const RestaurantScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      child: Center(
          child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: FutureBuilder<CursorPagination<RestaurantModel>>(
          future: ref.watch(restaurantRepositoryProvider).paginate(),
          builder: (context, AsyncSnapshot<CursorPagination<RestaurantModel>> snapshot) {
            	... 
                },
                itemCount: snapshot.data!.data.length);
          },
        ),
      )),
    );
  }
}
```
디테일 스크린

## 느낀점
지금까지, 공부해본 바로 구조에 대해서 한번 적어보겠다.
restaurant 폴더를 예시를 들어보겠다.

![](https://velog.velcdn.com/images/sht-3756/post/7185e879-7691-4326-a69a-5982c93ab755/image.png)

|디렉토리 구조|설명|
|--|--|
|component|공통된 컴포넌트(반복적인 컴포넌트)|
|model|api 응답 후 데이터 관련 모델링|
|repository|비즈니스 로직, api 요청, 토큰 관련 요청|
|view|오직 UI 단만 출력|  

레포지토리를 Provider 에 넣어서 ref 로 접근해서 .watch, .read, .update 를 사용해 UI 단에 출력이 가능해진다. 
그래서 코드가 가독성은 물론이고, 나중에 수정이 편리한 코드란 바로 이것이 아닌가! 라는 생각이 든다.

중요한 점, UI 단에는 무조건 UI 코드만 있어야한다. 그게 좋은 코드다. 라는 생각이 있다.