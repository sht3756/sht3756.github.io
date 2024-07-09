---
# 제목
title: "Dart 함수형 프로그래밍이란!"
# 부가 내용 미리보기
excerpt: "Dart 함수형 프로그래밍에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Dart
# 태그 
tags:
  - [dart, functionalProgramming]

# 
permalink: /dart/functional-programming/

toc: true
toc_sticky: false

date: 2022-12-22
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Functional Programming
함수형 프로그래밍이다.

## 📌 변환
### 📖 List
#### 선언 방법
```
List<List의 타입> 변수명 = [타입에 맞는 갑, 타입에 맞는 갑 , 타입에 맞는 값];
```

``` dart
void main() {
	List<String> lesserafim = ['김채원', '사쿠라', '홍은채', '허윤진', '카즈하'];
    
    print(lesserafim); // [김채원, 사쿠라, 홍은채, 허윤진, 카즈하]  
    // List -> Map
    print(lesserafim.asMap()); // {0: 김채원, 1: 사쿠라, 2: 홍은채, 3: 허윤진, 4: 카즈하} 
    // List -> Set
    print(lesserafim.toSet()); // {김채원, 사쿠라, 홍은채, 허윤진, 카즈하} 
    
    
// ---------------------------------------------------------
  // Map 으로 형변환
  Map lesserafimMap = lesserafim.asMap();

  print(lesserafimMap.keys); // (0, 1, 2, 3, 4)
  print(lesserafimMap.values); // (김채원, 사쿠라, 홍은채, 허윤진, 카즈하)

  // Map -> List : Iterable 형태를 List 형태로 바꿀떄 .toList() 를 사용한다. 
  print(lesserafimMap.keys.toList()); // [0, 1, 2, 3, 4]
  print(lesserafimMap.values.toList()); // [김채원, 사쿠라, 홍은채, 허윤진, 카즈하]

// ---------------------------------------------------------
  // Set 으로 형변환
  Set lesserafimSet = Set.from(lesserafim);

  // Set -> List 
  print(lesserafimSet.toList()); // [김채원, 사쿠라, 홍은채, 허윤진, 카즈하]
  }
```

#### map 함수
반복문이다.
``` dart
	List <String> lesserafim = ['김채원', '사쿠라', '홍은채', '허윤진', '카즈하'];
    
    // 반복
    final newLesserafim = lesserafim.map((e) => '르세라핌 $e'); 
  
  	// 기본 List 형태 출력
    print(lesserafim); // [김채원, 사쿠라, 홍은채, 허윤진, 카즈하]

	//  Iterable 형태로 출력
    print(newLesserafim); // (르세라핌 김채원, 르세라핌 사쿠라, 르세라핌 홍은채, 르세라핌 허윤진, 르세라핌 카즈하)
	
    // List 형태로 출력: Iterable 형태는 잘 사용안하니, List 로 형변환한 것임. 
    print(newLesserafim.toList()); // [르세라핌 김채원, 르세라핌 사쿠라, 르세라핌 홍은채, 르세라핌 허윤진, 르세라핌 카즈하]


```
#### 기본 배열과 반복문 타입 비교

``` dart
final newLesserafim1 = lesserafim.map((e) => '르세라핌 $e');
final newLesserafim2 = lesserafim.map((e) => '르세라핌 $e');

print(newLesserafim1 == newLesserafim2); // false : map 함수는 새로운 배열을 리턴하기 때문에 배열 안의 값이 같아도 다르다고 출력한다.

print(lesserafim = lesserafim); // true: 같은 배열이니 당연히 true

print(newLesserafim1 = lesserafim); // false: 기본 배열과 map 으로 새로 리턴된 배열은 다르다.
```

#### 데이터 가공(split, map, toList())
```
[1.jpg, 3.jpg, 5.jpg, 7.jpg]
```
``` dart
String number = '1357'; 

// .toList() 를 안하면 iterable 형태이니 List 형태로 바꿔주자!
final parsed = number.split('').map((e) => '$e.jpg).toList();

print(parsed); // [1.jpg, 3.jpg, 5.jpg, 7.jpg]
```




### 📖 List 형 변환 중복체크
|  현재 | 변경 | 중복 체크 여부|
| - | - | - |
| <center>List</center> | <center>List</center> |<center>X</center>|
| <center>List</center> | <center>Map</center> | <center>X</center>|
| <center>List</center> | <center>Set</center> |<center>O</center>|



### 📖 Map
#### 선언 방법
``` dart
Map<key 타입, value 타입> 변수명 = {key : value}
```

``` dart
void main() {
	// Map 선언
	Map<String, String> lesserafim = {
    	'김채원':'korea',
        '카즈하':'japan',
        '사쿠라':'japan',
    };
	
    // Map -> Map 형변환 : 이런 경우 별로 없음.
	final result = lesserafim.map(
    	(key, value) => MapEntry(
        	'르세라핌 멤버 $key',
            '국적은 $value 이다',  
        ),
    );
    
    print(result); // {르세라핌 멤버 김채원: 국적은 korea 이다, 르세라핌 멤버 카즈하: 국적은 japan 이다, 르세라핌 멤버 사쿠라: 국적은 japan 이다}
    
// ---------------------------------------------------------
	// key -> List 형변환 (map함수도 사용)
    final keys = lesserafim.keys.map((e) => '르세라핌 $e').toList(); 
    print(keys); // [르세라핌 김채원, 르세라핌 카즈하, 르세라핌 사쿠라]
    
    // values -> List 형변환 (map함수도 사용)
    final values = lesserafim.values.map((e) => '국적은 $e').toList();
    print(values); // [국적은 korea, 국적은 japan, 국적은 japan]
}

```

### 📖 Set
#### 선언 방법
``` dart
Set 변수명 = {
	'',
    '',
    ''
};

```

``` dart
void main() {
	Set myFamliySet = {
    	'dad',
        'mom',
        'me',
        'sister',
        'brother'
    };
    
    final newSet = myFamliySet.map((e) => '내가족 $e').toSet();
    
    print(newSet); // {내가족 dad, 내가족 mom, 내가족 me, 내가족 sister, 내가족 brother}
    
}
```
Where 함수 
배열 요소를 필터하는 함수다.

선언방법
```dart
	people.where((e) => e);
    
```

``` dart
void main() {
	List<Map<String, String>> people = [
    	{
        	'name' : '김채원',
            'group' : '르세라핌',
        },
        {
        	'name' : '사쿠라',
            'group' : '르세라핌',
        },
        {
        	'name' : '홍은채',
            'group' : '르세라핌',
        },
        {
        	'name' : '뷔',
            'group' : 'BTS,
        },
        {
        	'name' : 'RM',
            'group' : 'BTS,
        },
    ];
    
    print(people); 
    // [{name: 김채원, group: 르세라핌}, {name: 사쿠라, group: 르세라핌}, {name: 뷔, group: BTS}]
    
	final lesserafim = people.where((e) => e['group'] == '르세라핌');     
    
    print(lesserafim); 
    // ({name: 김채원, group: 르세라핌}, {name: 사쿠라, group: 르세라핌})
    
    final bts = people.where((e) => e['group'] == 'BTS');
    print(bts.toList()); 
    // [{name: 뷔, group: BTS}, {name: RM, group: BTS}]
}
```

reduce 함수

선언 방법
``` dart
List<타입> 변수명 = [];

변수명.reduce((prev, next) => 함수);

```

⛔️주의⛔️ 같은 타입을 리턴해야한다. 

``` dart
void main() {
	List<int> numbers = [
    	1, 3, 5, 7, 9,
    ];
    
    final result = numbers.reduce((prev, next){
    	print('----- 시작 ----');
        print('prev : $prev');
        print('next : $next');        
        print('total : ${prev + next}');        
        print('---- 끝 ----');
        
        return prev + next;
    });
    
    print(result);
    
    ----- 시작 ----
    prev : 1
    next : 3
    total : 4
    ---- 끝 ----
    ----- 시작 ----
    prev : 4
    next : 5
    total : 9
    ---- 끝 ----
    ----- 시작 ----
    prev : 9
    next : 7
    total : 16
    ---- 끝 ----
    ----- 시작 ----
    prev : 16
    next : 9
    total : 25
    ---- 끝 ----
    25
    
    List<String> words = ['안녕', '하세요', '~~'];
    
    final senetence = words.reduce((prev, next) => prev + next);
    
    print(senetece); // 안녕하세요~~
    
    print(); 
    
}
```

fold 
reduce 의 같은 타입을 리턴하는 함수
조건을 누적시켜 반환하는 함수

``` dart
void main() {
	List<int> numbers = [1,2,3,4,5];
    
	final sum = number.fold<int>(0, (prev, next) => prev + next); 
    
    print(sum); 
    // 
}
```