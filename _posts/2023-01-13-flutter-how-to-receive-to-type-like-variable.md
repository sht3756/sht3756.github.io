---
# 제목
title: "타입을 변수처럼 받을 수있는 방법"
# 부가 내용 미리보기
excerpt: "타입을 변수처럼 받을 수있는 방법에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, type, variable]

# 
permalink: /flutter/flutter-how-to-receive-to-type-like-variable/

toc: true
toc_sticky: true

date: 2023-01-13
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 타입을 변수처럼 받는 방법

## 상황
``` dart
// 리스트 출력하는 get api 
{ 
  meta : {
      "count : 20,
      "hasMore": true,
  },
  data : [
      {
          "id" : "고유 Id",
          "name" : "감자",
          ...
      }
  ]
}
```

api 를 통신하면서 지금까지 페이징처리는 따로 안하면서 리스트를 출력만 했기때문에, data 배열안의 속성들만 model 에 인스턴스해왔다.
이제는 페이징처리를 할때이다!
백엔드 데이터를 잘 확인해보면, 잘하는 백엔드의 RestApi 데이터는 일정한 규칙을 지켜서 오는것을 확인할 수 있을거다!
만약에, 규칙이 정해져있지 않다면, 프론트엔드와 백엔드가 서로 협의를 봐서 규칙을 정해야한다. 그래야 프론트도 편하고 백엔드도 편하게 개발할 수 있다.
예를 들면, status code, data 형식, 페이징 처리는 어떻게 데이터를 던져줄것인지에 대한 것! 


## 타입을 변수처럼 받을 수 있게 하는 방법

**일정한 규칙이 있다.**
meta와 data 는 같고, 안의 값들만 변경이 된다.
``` dart
// 1번 탭 리스트 조회 api response
{ 
  meta : {
      "count : 20,
      "hasMore": true,
  },
  data : [
      {
          "id" : "고유 Id",
          "name" : "감자",
          ...
      }
  ]
}

// 2번 탭 리스트 조회 api response
{ 
  meta : {
      "count : 20,
      "hasMore": false,
  },
  data : [
      {
          "id" : "고유 Id",
          "name" : "고구미",
          ...
      }
  ]
}
```
``` dart
import 'package:json_annotation/json_annotation.dart';

part 'cursor_pagination_model.g.dart';

@JsonSerializable(
  // true : retrofit 으로 자동으로 CursorPagination<T> 만들때,  genericArgument 를 고려해서 만들겠다! 라는 의미
  genericArgumentFactories: true,
)
class CursorPagination<T> {
  final CursorPaginationMeta meta;
  final List<T> data;

  CursorPagination({
    required this.meta,
    required this.data,
  });

  // CursorPagination 을 인스턴스로 만들 <T> 이 타입으로 List<T> 의 타입을 지정할수 있어진다.
  // List<T> 부분에서 <T> 타입이 빌드,런타임할때 지정이 안 되어있기 때문에, data 를 어떻게 Json 으로 부터 클래스의 인스턴스로 변화하게 될지 알려줘야한다. (외부에서 전환이 된다는 것을 정의)
  factory CursorPagination.fromJson(
          Map<String, dynamic> json, T Function(Object? json) fromJsonT) =>
      _$CursorPaginationFromJson(json, fromJsonT);
}

@JsonSerializable()
class CursorPaginationMeta {
  final int count;
  final bool hasMore;

  CursorPaginationMeta({
    required this.count,
    required this.hasMore,
  });

  factory CursorPaginationMeta.fromJson(Map<String, dynamic> json) =>
      _$CursorPaginationMetaFromJson(json);
}

```

## g.dart 자세히보기!
``` dart
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cursor_pagination_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CursorPagination<T> _$CursorPaginationFromJson<T>(
  Map<String, dynamic> json,
  // 1 설명참조)
  T Function(Object? json) fromJsonT,
) =>
    CursorPagination<T>(
      meta: CursorPaginationMeta.fromJson(json['meta'] as Map<String, dynamic>),
      // 2 설명참조)
      data: (json['data'] as List<dynamic>).map(fromJsonT).toList(),
    );

Map<String, dynamic> _$CursorPaginationToJson<T>(
  CursorPagination<T> instance,
  Object? Function(T value) toJsonT,
) =>
    <String, dynamic>{
      'meta': instance.meta,
      'data': instance.data.map(toJsonT).toList(),
    };

CursorPaginationMeta _$CursorPaginationMetaFromJson(
        Map<String, dynamic> json) =>
    CursorPaginationMeta(
      count: json['count'] as int,
      hasMore: json['hasMore'] as bool,
    );

Map<String, dynamic> _$CursorPaginationMetaToJson(
        CursorPaginationMeta instance) =>
    <String, dynamic>{
      'count': instance.count,
      'hasMore': instance.hasMore,
    };


```
1 설명 ) cursor_pagination_model.dart 에서 factory 생성자 를 만들면서 런타입할때 <T>의 타입을 지정해준 것이다. data 를 어떻게 Json 으로부터 클래스의 인스턴스로 변화할수 있게하는지, 타입을 주입시켜준 것!
2 설명 )
data 를 List 형태로 받지만, fromJsonT 라는 함수로 매핑을 해준다.



## 사용법
반복적인 부분을 이렇게 공통적으로 만들었으니 사용할때 편리하게 사용하면된다.
  
``` dart
// repostory.dart
// Future<List<RestaurantModel>> paginmate(); 가 아니라!!
Future<CursorPagination<RestaurantModel>> paginate();

// 만약 다른 클래스모델에서 pagination 을 해야한다면?
// ~ .dart
Future<CursorPagination<클래스모델>> paginate();
```
  
## 결론 
OOP 와 JsonSerializable 그리고 retrofit 의 조화이다.