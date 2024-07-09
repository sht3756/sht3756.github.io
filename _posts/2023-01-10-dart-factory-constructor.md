---
# 제목
title: "Factory 생성자란!"
# 부가 내용 미리보기
excerpt: "Factory 생성자 이론에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Dart
# 태그 
tags:
  - [dart, factory, constructor]

# 
permalink: /dart/factory-constructor/

toc: true
toc_sticky: false

date: 2023-01-10
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Factory 생성자
## factory 생성자란?

> factory항상 해당 클래스의 새 인스턴스를 만들지 않는 생성자를 구현할 때 키워드를 사용합니다. 예를 들어 팩토리 생성자는 캐시에서 인스턴스를 반환하거나 하위 유형의 인스턴스를 반환할 수 있습니다. 팩토리 생성자의 또 다른 사용 사례는 이니셜라이저 목록에서 처리할 수 없는 논리를 사용하여 최종 변수를 초기화하는 것입니다.

dart Docs 에 있는 설명이다. 
정리하면, 매번 인스턴스를 새로 생성하지 말고 기존에 이미 생성된 인스턴스가 있다면, factory 생성자를 사용해 body에 return 해 재사용해라!

> 디자인 패턴 중 싱글톤 패턴을 따른 것이다.

싱글 톤 패턴(singleton-pattern)은 싱글턴 패턴을 따른 클래스는 생성자가 여러 차례 호출되도 실제로 생성되는 객체는 하나이며, 최초 생성 이후에 호출된 생성자는 최초의 생성자가 생성한 객체를 리턴한다.
정리하면, 하나의 클래스에는 하나의 인스턴스만 생성한다!

참고로 모델링할때 자주 사용한다.

``` dart
void main() {
	final parent2 = Parent.fromInt(5);
    
    print(parent2); // Instance.of Parent
    print(parent2.id); // 5    
}

class Parent{
	final int id;
    
    Parent({
    	required this.id,
    });

    // factory 생성자 선언    
    factory Parent.fromInt(int id) {
        return Parent(id: id);
    }    
}
```
factory 생성자에는 자식클래스인 Child 도 리턴할 수 있다.
``` dart
void main() {
	final parent3 = Parent.fromInt(5);
    
    print(parent3); // Instance.of Child
    print(parent3.id); //5    
}

class Parent{
	final int id;
    
    Parent({
    	required this.id,        
    });
    
	// factory 생성자 선언
    factory Parent.fromInt(int id) {
    	return Child(id: id);
    }
}

// Parent 를 상속한 클래스
class Child extends Parent{
	Child({
    	required super.id,
    })
}
```

