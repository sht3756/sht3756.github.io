---
# 제목
title: "JsonSerializable 이란!"
# 부가 내용 미리보기
excerpt: "JsonSerializable 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, jsonSerializable]

# 
permalink: /flutter/json-serializable/

toc: true
toc_sticky: true

date: 2023-01-11
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---


# 🦥 JsonSerializable
## 상황
플러터로 프로젝트를 하다보면, 갑자기 <span style="color: orange">g.dart</span> 파일을 만드는 경우가 생긴다!
그 <span style="color: orange">이유</span>와 <span style="color: orange">사용법</span>을 알아보자!

## 패키지 설치 
https://pub.dev/packages/json_serializable
https://github.com/google/json_serializable.dart/tree/master/example

## 공통된 부분
model 페이지에는 api 를 통해서 받을 속성들을 미리 지정을 해놓았고, 인스턴스 생성를 하기 생성자 선언과 맵핑을 자동으로 해주기 위한 factory 생성자가 있다.
생성자까지는 파라미터 어떤값을 넣어야하는지 지정을 해야하니깐 있어야하지만, 
factory 생성자로 만든 fromJson은 <span style="color: orange">반복적</span>으로 <span style="color: orange">속성</span>을 또 넣어줘야한다.
  
그렇다면 반복적으로 들어가는 부분을 <span style="color: orange">자동화</span> 하면 좋지 않은가? 
그 귀찮은 작업을 구해줄 패키지! 바로 <span style="color: orange">JsonSerializable</span> 이다.
``` dart
import 'package:authentication_study/common/const/data.dart';

enum RestaurantPriceRange {
  expensive,
  medium,
  cheap,
}

class RestaurantModel {
  final String id;
  final String name;
  final String thumbUrl;
  final List<String> tags;
  final RestaurantPriceRange priceRange;
  final double ratings;
  final int ratingsCount;
  final int deliveryTime;
  final int deliveryFee;

  // 인스턴스화할때 매개변수 다 넣을 수 있게 만듬
  RestaurantModel({
    required this.id,
    required this.name,
    required this.thumbUrl,
    required this.tags,
    required this.priceRange,
    required this.ratings,
    required this.ratingsCount,
    required this.deliveryTime,
    required this.deliveryFee,
  });

  // factory constructor 사용
  factory RestaurantModel.fromJson({required Map<String, dynamic> json}) {
    return RestaurantModel(
      id: json['id'],
      name: json['name'],
      thumbUrl: 'http://$ip${json['thumbUrl']}',
      tags: List<String>.from(json['tags']),
      // enum 값을 매핑
      priceRange: RestaurantPriceRange.values.firstWhere(
            (e) => e.name == json['priceRange'],
      ),
      ratings: json['ratings'],
      ratingsCount: json['ratingsCount'],
      deliveryTime: json['deliveryTime'],
      deliveryFee: json['deliveryFee'],
    );
  }
}

```


### @어노테이션! 
<span style="color: orange">어노테이션</span>을 사용해 <span style="color: orange">이 클래스</span>를 자동으로 JsonSerializable 코드를 생성시킬거라고 <span style="color: orange">정의</span> 해주는 것이다.



``` dart
import 'package:json_annotation/json_annotation.dart';

part 'restaurant_model.g.dart';

enum RestaurantPriceRange {
  expensive,
  medium,
  cheap,
}

@JsonSerializable()
class RestaurantModel {
  final String id;
  final String name;
  final String thumbUrl;
  final List<String> tags;
  final RestaurantPriceRange priceRange;
  final double ratings;
  final int ratingsCount;
  final int deliveryTime;
  final int deliveryFee;

  // 인스턴스화할때 매개변수 다 넣을 수 있게 만듬
  RestaurantModel({
    required this.id,
    required this.name,
    required this.thumbUrl,
    required this.tags,
    required this.priceRange,
    required this.ratings,
    required this.ratingsCount,
    required this.deliveryTime,
    required this.deliveryFee,
  });
}

// g.dart 적용하는 방법
// json -> 인스턴스를 만드는것
  factory RestaurantModel.fromJson(Map<String, dynamic> json)
  => _$RestaurantModelFromJson(json);

  // 인스턴스 -> json 으로 만드는것
  Map<String, dynamic> toJson() => _$RestaurantModelToJson(this);
```

```bash
flutter pub run build_runner build
```

## g.dart 파일 자세히보기
g.dart 파일을 잘 살펴보면 RestaurantModel 을 생성하는 인스턴스가 생긴걸 볼 수 있는데,
직접 만든 <span style="color: orange">factory 생성자</span>와 thumUrl 빼고 똑같이 생긴 것을 알 수 있다.
그러니 <span style="color: orange">직접 만들 필요가 없다.</span>

``` dart
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'restaurant_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

// 1) RestaurantModel 을 생성하는 인스턴스, 직접만든 factory 생성자와 거의 유사하다!
RestaurantModel _$RestaurantModelFromJson(Map<String, dynamic> json) =>
    RestaurantModel(
      id: json['id'] as String,
      name: json['name'] as String,
      thumbUrl: json['thumbUrl'] as String,
      tags: (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
      priceRange:
          $enumDecode(_$RestaurantPriceRangeEnumMap, json['priceRange']),
      ratings: (json['ratings'] as num).toDouble(),
      ratingsCount: json['ratingsCount'] as int,
      deliveryTime: json['deliveryTime'] as int,
      deliveryFee: json['deliveryFee'] as int,
    );
// 2) 현재 인스턴스에서 다시 json 으로 바꾸는 코드가 자동으로 생긴것 
Map<String, dynamic> _$RestaurantModelToJson(RestaurantModel instance) =>
    <String, dynamic>{
    // 현재 instance 의 id 값을 'id' 키값에 넣어준다.
      'id': instance.id,
      'name': instance.name,
      'thumbUrl': instance.thumbUrl,
      'tags': instance.tags,
      'priceRange': _$RestaurantPriceRangeEnumMap[instance.priceRange]!,
      'ratings': instance.ratings,
      'ratingsCount': instance.ratingsCount,
      'deliveryTime': instance.deliveryTime,
      'deliveryFee': instance.deliveryFee,
    };

const _$RestaurantPriceRangeEnumMap = {
  RestaurantPriceRange.expensive: 'expensive',
  RestaurantPriceRange.medium: 'medium',
  RestaurantPriceRange.cheap: 'cheap',
};

```


### model 에 g.dart 적용을 하는 방법!

``` dart
// g.dart 적용하기!
  // 1) json -> 인스턴스를 만드는것
  factory RestaurantModel.fromJson(Map<String, dynamic> json) =>
      _$RestaurantModelFromJson(json);

  // 2) 인스턴스 -> json 으로 만드는것
  Map<String, dynamic> toJson() => _$RestaurantModelToJson(this);
```
### 매핑될 때 추가로 다르게 저장 하고 싶은 경우!
thumUrl 같은 경우, 앞에 http://$ip 를 붙이고 싶지만!
g.dart 파일에는 그냥 적혀져서 매핑 되어있는 것을 볼수있다. 
``` dart
// 이전
thumbUrl: json['thumbUrl'] as String,
```

> 하지만 절대로 g.dart 파일은 수정하지 않는다!

pathToUrl 이 실행이 되면, Json 으로부터 thumbUrl 을 가져오고,
그 값을 pathToUrl에 파라미터로 넣고 리턴값을 다시 thumbUrl 에 저장된다.
그러니 pathtoUrl 에 파라미터를 안 넣어도된다.

``` dart 
@JsonSerializable()
class RestaurantModel {
  final String id;
  final String name;
  @JsonKey(
    fromJson: pathToUrl,
  )
  final String thumbUrl;
...

// @JsonKey 를 위한 static 함수 생성
static pathToUrl(String value) {
    // value 는 thumbUrl 이다.
    return 'http://$ip$value';
  }
```

그리고 다시 build 해서 g.dart 파일을 만들면, 새로 업데이트되어서 생성된 모습을 볼 수 있다.

![](https://velog.velcdn.com/images/sht-3756/post/1ef7717f-4d06-4838-af39-4a8e8a5dd903/image.png)


## 절대로 g.dart 파일은 수정하지않는 이유!
왜냐! <span style="color: orange">어차피</span> 새로 생성되거나 수정된 .dart 파일 기준으로 g.dart 이 새로 생성되기 때문에!



## 꿀팁! 
### 1. g.dart 파일 때문에 디렉토리가 복잡하다?
위의 방식대로 하면 g.dart 파일이 생길텐데, 같은 루트에 생기면 보기 불편하고 어지러울수 있다.
안드로이드 스튜디오의 프로젝트 상단에 톱니바퀴를 누르고 File Nesting... 클릭!!!

![](https://velog.velcdn.com/images/sht-3756/post/170c60a2-73a2-40b0-8b3b-6a9633aefb50/image.png)

![](https://velog.velcdn.com/images/sht-3756/post/f07bcd7d-583a-440c-912e-52ffbf44a04f/image.png)
뒤에 g.dart 파일을 추가해주면, model.dart 의 하단에 포함이 된걸 볼수있다.
이게 구조 바뀌거나 파일시스템이 바뀐것이 아니라 우리가 볼때만 바뀐 것이다.

![](https://velog.velcdn.com/images/sht-3756/post/40ad05d0-6f6f-487c-abd7-099ca15bd9e1/image.png)

### 2. g.dart 파일 매번 생성하기 귀찮다?
평소에 작성하는 코드는 일회성으로 build 하는 것이다.

``` bash
flutter pub run build_runner build
```
하지만, 변화하는것을 감지해서 <span style="color: orange">자동</span>으로 <span style="color: orange">업데이트</span> 하게 할 수 있다.

``` bash
flutter pub run build_runner watch
```


### 3. 자동완성 스니펫 만들기
설정
![](https://velog.velcdn.com/images/sht-3756/post/7730aa1d-de68-446d-b267-15b775ffa580/image.png)

그룹생성
![](https://velog.velcdn.com/images/sht-3756/post/75e65fc2-3e41-43d7-ad92-c5a79cabd5aa/image.png)
템플릿텍스트작성
``` 
factory $Name$.fromJson(Map<String, dynamic> json)
=> _$$$Name$FromJson(json);
```
define 설정
![](https://velog.velcdn.com/images/sht-3756/post/31a2f940-8532-4e5c-8171-4a83d1bc4c98/image.png)


