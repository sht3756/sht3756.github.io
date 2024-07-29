---
# 제목
title: "데이터 직렬화, 역직렬화!"
# 부가 내용 미리보기
excerpt: "데이터 직렬화, 역직렬화에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, serialized]

# 
permalink: /flutter/data-serialized/

toc: true
toc_sticky: false

date: 2023-07-15
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 데이터 직렬화, 역직렬화

RestAPI 로 데이터 통신을 자주하는 요즘 json 문자열로 응답을 보내고 받는것이 요즘 추세이다.

그렇기 때문에 json 문자열을 잘 다루는 것이 중요하다. 

여기서 중요한 개념이 직렬화와 역직렬화이다.

 

직렬화 : 언어에서 사용되는 Object 또는 Data 를 다른 시스템에서도 사용할 수 있도록 바이트 스트림형태로 연속적인 데이터로 변환하는 포맷 기술이다.

 

역직렬화는 직렬화의 반대의미이다.

 

Flutter 에서도 친절하게 json 데이터를 직렬화와 역직렬화하는 방법을 알려준다. 

Flutter 는 클래스를 별도로 만들어서 매핑을 할수있게 해준다.

 

front 의 입장에서는 백엔드의 api 의 응답값인, response.data 로 데이터를 출력해주기 위해 사용한다.

``` dart

// 어떤 api 의 response 값
data : {
	"title" : "어떤 제목",
	"content" : "어떤 내용",
}

```

title 의 값에 접근한다면, data['title'] 이렇게 접근을 한다.  나중에는 디버깅/유효성 판단에조 좋지 않고 조금더 구조적으로 접근하기 위해서는 직렬화(Serialization) 클래스들을 따로 두는 것이 좋을 것이다.

[참조!](https://flutter-ko.dev/development/data-and-backend/json)

이제는 json 데이터를 다뤄보자!

## 모델 부분

```dart
class TestModel {
	final String id;
    final String image;
    final String title;
    final String content;
    
    TestModel(
    	this.id, 
        this.image, 
        this.title, 
        this.content,
    );
    
    factory TestModel.fromJson(Map<String, dynamic> json){
    	return TestModel(
        	json['id'],
            json['image'],
            json['title'],
            json['content'],
        );
    }
    
	Map<String, dynamic> toJson() {
    	final Map<String, dynamic> data = new Map<String,dynamic>();
        data['id'] = this.id;
        data['image'] = this.image;
        data['title'] = this.title;
        data['content'] = this.content;
        return data;
    }
}

```

## 구현 부분 

``` dart
import 'package:http/http.dart' as http; 

// stful
class Test extends StatefulWidget {
	@override
    _TestState createState() => _TestState();
}

class _TestState extends State<Test> {
	// 데이터 담을 List 준비    
	List<TestModel> result = []; 
	
    @override
    void initState() {
    	// api 통신
        testApi();
    }
    
	Future<void> testApi() async {
    	var res = await http.get(Uri.parse('http://localhost:8080/v1/testApi'));
        
        if(res) {
        	result.add(TestModel.fromJson(res.data)); 
        }
    }    
}
```

이렇게 하면 출력하고 싶은 곳에 쉽게 접근 해서 출력이 가능해진다. 

무조건 백엔드와 통신을 1 번 이상 진행할텐데, 이렇게 json 데이터를 직렬화 하는 부분을 만들면, api 응답받는곳에 fromJson() 만 사용해주면 코드도 가독성이 높아지기 떄문에 훨씬 구조적으로도 좋아진다.

 

수동 직렬화와 자동 직렬화 

위의 예제 까지는 수동으로 직렬화하는 방법을 작성을 했다. 하지만 플러터에서 제공해주는 라이브러리들이 엄청 많다!

몇개 소개를 시켜주겠다.

[json_serializable-pub.dev](https://pub.dev/packages/json_serializable)

[freezed-pub.dev](https://pub.dev/packages/freezed)

위의 두개가 자주 사용되고 각각 장단점과 편리한 점이 있다. 

json_serializable 은 기본적으로 자주사용된다. 그만큼 편리하고, 기본적인 것들을 더 잘 사용할 수있다. 하지만 없는 것들이 있어서 직접 추가해줘야하는 불편함이 있다.

 

freezed 는 json_serializable 이 없는 것들을 가지고 있다는 장점이 있다. toString(), equals, hashCode() 자동생성 깊은, 얕은 복사 Sealed Class 등 포함되어 있는 것들이 많다. 덕분에 코드를 진짜 매우 간결하게 작성가능하다! 하지만, freezed 를 사용하기 위해서는 파일 하나당 .freezed 파일과 .jsonserializable 파일이 생기기 때문에 무분별한 사용은 프로젝트가 무거워질 가능성이 있다.

 

프로젝트 상황을 잘 고려해서 사용해보자