---
# 제목
title: "enum String 변환하기!"
# 부가 내용 미리보기
excerpt: "enum String 변환하기에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Dart
# 태그 
tags:
  - [dart, enum, convert, string]

# 
permalink: /dart/enum-convert-to-string/

toc: true
toc_sticky: false

date: 2023-02-27
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 enum 을 string 변환하기

dart 에서 enum을 사용할 때가 있다.

dart 는 타입스크립트와 같은 방법으로는 안된다.
``` dart
// 컴파일 에러!!
enum Example {a = "A입니다.", b = "B입니다."}
```

선언 )
``` dart
enum Example {a, b}
```

방법 1 )
함수로 해결하기
```dart
String convertExampleToText(Example example) {
	swith (example) {
    	case example.a:
	        return "A입니다.";
    	case example.b:
    	    return "A입니다.";
        default:
        	return "";
    }
}
print(convertExampleToText(Example.a)); // A입니다.
```

 방법 2 )
extension method 로 해결하기
``` dart
extension ExampleExtension on Example {
	String get convertExampleToText {
    	switch(this) {
          case example.a:
              return "A입니다.";
          case example.b:
              return "A입니다.";
          default:
              return "";
        }
    }
} 

print(Example.a.convertExampleToText); // A입니다.
```

방법 3 ) 2.17 버전 이후로는 이렇게도 가능하다.
enum 확장 버전
``` dart
enum Tags {
  study('STUDY', '공부'), // 공부
  career('CAREER', '진로'), // 진로
  love('LOVE', '연애'), // 연애
  breakUp('BREAKUP', '이별'), // 이별
  friend('FRIEND', '친구'), // 친구
  religion('RELIGION', '종교'), // 종교
  money('MONEY', '금전'), // 금전
  jobs('JOBS', '취업'), // 취업
  etc('ETC', '기타'); // 기타

  final String tag;
  final String tagName;

  const Tags(this.tag, this.tagName);
}
```

view 단
``` dart
Tags selectedTag = Tags.study;
index = 0;
Text(Tags.values[index].tagName); // 공부
Text(Tags.values[index].tag); // STUDY
``` 
