---
# 제목
title: "데이터 모델링!"
# 부가 내용 미리보기
excerpt: "데이터 모델링에 대한 궁금증을 풀어 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, dataModeling]

# 
permalink: /flutter/flutter-data-modeling-reason/

toc: true
toc_sticky: true

date: 2023-01-09
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 데이터 모델링
## 데이터 모델링을 하는 이유
도대체 **왜!** 데이터 모델링을 하는 지 궁금했다.
api 통신을 하게 되면, api 통신을 할 때마다 각각 해당하는 model 폴더를 만드는데,,,
쌓여가는 폴더속에..
늘어나는 나의 궁금증..

## 데이터 모델링을 하기 전 과 후 비교
### 데이터 모델링 전
![](https://velog.velcdn.com/images/sht-3756/post/4900f4fc-fda4-49de-b60e-81aae863cb4c/image.png)

### 데이터 모델링 후
#### 모델 생성!
![](https://velog.velcdn.com/images/sht-3756/post/45a4c32f-1c0d-476a-9444-1b0b17d3dea2/image.png)
#### 모델을 만드는 이유!

1. 인스턴스화를 했기때문에, 오타를 내면 에러가 나고, 자동완성이 된다! 
2. 객체의 키값으로 접근을 안해도 된다.

![](https://velog.velcdn.com/images/sht-3756/post/e6ab3b6a-dd88-49b6-b186-6c4bdafebbb3/image.png)

하지만.. 오타를 안낸다고 한다면,, 전보다 후가 더 긴 코드를 작성했다.
이렇게 하는건 낭비이다.
사실은 이렇게 작성하고 싶은 것은 아니다.
이렇게 작성한다면, 매핑을 해줄때마다! 계속 반복해서 parsed 로 선언한 변수를 작성해줘야한다!

그러면 이렇게 더럽게 써야할까? 아니다!! No!!!
🙅🏻‍♂️🙅🏻‍♂️

#### factory_constructor 를 이용해서 중복되는 코드를 줄일것이다.
모른다면, [factory constructor](https://velog.io/@sht-3756/Dart-Factory-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%9D%B4%EB%A1%A0)를 보고 와라!

기존 인스턴스를 만든 부분을 모델 안으로 로직을 만들것이다.
``` dart
class RestaurantModel {
	...

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

![](https://velog.velcdn.com/images/sht-3756/post/9a0d4890-bfee-4d43-9ee9-63d4419d9064/image.png)

이렇게 FutureBuilder 에는 item을 우리가 만든 factory constructor 인 RestaurantModel.fromJson(json: item); 을 해주면 model에서 매핑하는 로직이 실행된다. 이게 되는 이유는 우리가 rest api 로 똑같은 결과를 받을거라는 보장이 있으니깐 가능한거다!

### 추가!
변수 parseItem 는 model 에서 자동으로 매핑이 되게끔 로직을 써둔것(factory_constructor 를 이용해 만듬)이다.
그리고, RestaurantModel 이 매핑이 되어 들어오면 RestaurantCard 로 자동으로 매핑되게 설정할 수 있다!

> RestaurantCard 클래스에도 factory constructor 가 생성이 가능하다!

그 이유는? 
RestaurantCard 도 클래스 이기 때문이다! 생성자도 있다. 그러니 factory constructor 를 못 만들 이유는 없다!

![](https://velog.velcdn.com/images/sht-3756/post/36cbd456-ee5c-4a32-a757-5b714ea5fb36/image.png)


``` dart
class RestaurantCard extends StatelessWidget {
	...
    // factory constructor 생성!!
	factory RestaurantCard.fromModel({required RestaurantModel model}) {
    return RestaurantCard(
      image: Image.network(
        model.thumbUrl,
        fit: BoxFit.cover,
      ),
      name: model.name,
      tags: model.tags,
      ratingsCount: model.ratingsCount,
      deliveryTime: model.deliveryTime,
      deliveryFee: model.deliveryFee,
      ratings: model.ratings,
    );
  }
}
```







