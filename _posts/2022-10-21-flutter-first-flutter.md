---
# 제목
title: "플러터의 첫 발!"
# 부가 내용 미리보기
excerpt: "처음 플러터를 접해 작성한 문법에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, first]

# 
permalink: /flutter/first-flutter/

toc: true
toc_sticky: false

date: 2022-10-21
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 플러터의 첫발

플러터 공부를 시작해보겠다.

플러터는 dart 언어를 사용 하는 것을 알아두자!

플러터를 웹에서 간단하게 할수 있도록 웹페이지 하나를 소개해주겠다.

https://dartpad.dev에 접속하면 바로 Dart 언어를 사용해 코드를 실행해볼 수 있다.

문법은 자바스크립트 문법이랑 매우 유사하고, 자주 에러가 생성되는 부분은 코드 마지막에 ; (세미콜론)을 안붙이면 무조건 에러가 출력된다.

```dart
void main() {
 // variable
  var name = '코드팩토리';
  print(name);
  name = 'zh';
  print(name);
  
  // interger
  int number = 1;
  print(number);
  int number2 = 12;
  print(number2);
  int number3 = -20;
  print(number3);
  
  // 덧셈
  print(number + number2);
  // 뺄셈
  print(number - number2);
  // 곱셈
  print(number * number2);
  // 나눗셈
  print(number / number2);
  
  // 실수
  // double
  double doubleNumber1 = 2.5;
  double doubleNumber2 = 2.1;
  print(doubleNumber1 + doubleNumber2);
  print(doubleNumber1 - doubleNumber2);
  print(doubleNumber1 * doubleNumber2);
  print(doubleNumber1 / doubleNumber2);
  
  // 참/거짓
  // boolean
  bool isTrue = true;
  bool isFalse = false;
  print(isTrue);
  print(isFalse);
  
  // 글자
  // string 무조건 대문자로 시작해야함
  String strName = '스트링1';
  String strName2 = '스트링2';
  
  print(strName);
  print(strName2);
  
  // var String 의 차이 (할당된 값으로 자동으로 타입을 유추 한다.)
  var varName1 = '스트링3'; // String
  var varNumber = 20; // int
  
  print(varName1.runtimeType);  // String 런타입 되었을때의 타입을 알려주는 내장 메소드
  
  // 글자타입
  // String
  print(strName + strName2); // 스트링1스트링2
  print(strName + ' ' + strName2); // 스트링1 스트링2
  print('${strName} ${strName2}'); // 스트링1 스트링2
  // 조금 더 생략해서
  print('$strName $strName'); // 스트링1 스트링2 , 괄호가 없어도된다.
  
  // Dynamic
  // Dynamic 에는 뭐든지 할당 가능하다.
  
  dynamic name13 = 'code13';
  
  print(name13); // code13
  
  dynamic number13 = 13;
  print(number13); // 13
  
  // 그렇다면,  var 와는 무슨 차이가 있을까? var 도 모든 타입이 다 할당이 가능하다.
  var name14 = '블랙핑크';
  
  print(name14); // 블랙핑크
  
  print(name13.runtimeType); // String
  
  print(name14.runtimeType); // String
  
  name13 = 2; // Daynamic 으로 미리 String 으로 선언을 해두었지만, number로 잘바뀌는것을 볼수있다.
  
//   name14 = 4;  // var 타입으로 선언한 변수는 이미 정해놓은 타입대로 가는 것이지 변경이 불가능하다.
  
  
// nullable - null 이 될 수 있다. ? 
// non-nullable - null 이 될 수 없다. !
// null - 아무런 값도 있지 않다. 
  String nullName = 'code';
  print(nullName); // code
  
//   nullName = null; // 에러가 나는 이유는 null이 들어갈수 없는 String 타입인데 null 을 넣었다.
  // 우리가 방금 까지 배운 타입들은 전부 다 2가지로 나뉜다.
  // 그 타입만 들어갈 수있는 경우, 그 타입과 null 까지 포함하는 경우 
  
  // 이렇게 ? 가 들어가게 된다면 null 까지 들어가되는 경우이다. 
  String? name5 = '블랙핑크';
  
  name5 = null;
  print(name5); // null
   
  // 다른 방법으로 
 String name67 = '블랙핑크67';
  print(name67!); // 블랙핑크67 , 현재 이값은 null 값이 될 수 없다.
  
  
  // final 
  // final 로 변수를 선언하게 되면 다시 재할당 불가능하다. 
  final String name8 = 'code8';
  print(name8); // code8
//  name8 = 'ccc'; 변수 재할당도 안되고,
//   name8 = 8; 타입 변경해서도 안된다.
  
  // const
  const String name9 = 'code1';
  
  print(name9); // code1
  
//   name9 = 'd'; const 역시도 같다.

// final 과 const 를쓰면 좋은점은 Type 선언한거를 생략 가능하다.
  final name10 = 'code10';
  const name11 = 12;
  
  print(name10); // code10
  print(name11); // 12
  
// 차이점을 알기전에 datetime 을알야한다.
  DateTime now = DateTime.now();
  
  print(now); // 2022-10-21 22:52:41.310 , 현재날짜가 출력된다.
  
  // now 라는 변수에 현재시간의 값을 저장 할수 있다. 
  // 나온 시간이 Run  버튼을 눌렀을떄 시점의 시간이 아니고! , 버튼을 누르고 코드가 실행되는 시점의 시간인 것이다.
  // 그렇다면 현재 날짜를 출력하는 변수명만다른 변수가 있다고 한다면, 같은 시간을 담는 것은 아니다.위의 설명대로 코드가 실행되었을때의 시점의 시간을 저장하기 떄문이다. 하지만 코드의 실행 속도가 너무빨라서 같은 시간이 저장이 된다.
  
  // 그러면 final 과 const 로 선언을 해서 테스트를 진행해보자! 
  final DateTime finalNow  = DateTime.now();
//   const DateTime constNow = DateTime.now();
  
  // const 같은 경우에는 buildTime 에 대한 값을 가지고 있어야한다.
  // final 같은 경우는 buildTime 에 대한 값이 필요없다. 
  // buildTime 이란?? 코드를 작성하면 컴퓨터는 2진수로 변환이 된다. ex ) 1010101 
  // 10101010 으로 코드를 작성할 수 없으니 우리의 편리를 위해 프로그래밍 언어를 만들었다. 
  // Run 을 딱하는 순간에 build 가 이뤄지게된다. build 를 하게 되면서 컴퓨터가 이해할 수 있게 101010 변환을하는데 이것이 buildTime 이다.
  // 그렇다면? buildTime 의 값을 알아야한다라는 의미는 ? 지금 당장 코드를 작성했을때의 시간을 알아야한다. 하지만 알수 있는 방법이 없다. 왜냐 DateTiem.now()는 코드가 실행되는 순간 시점의 시간을 가져오기 때문이다!
  // 그래서 const로는 선언이 안된다.  
  
  
  
  // operator
  int number12 = 2;
  print(number12);
  
  print(number12 % 2); // 0 ,  나머지 값 출력
  print(number12 % 3); // 2
  
  number12 ++; // 더하기 
  print(number12); // 3
  number12 --; // 빼기 
  print(number12); // 2
  
  
  double number16 = 4.0;
  print(number16); // 4
   
  number16 += 1;
  print(number16); // 5
   
  number16 -= 1;
  print(number16); // 4
  
  number16 *= 2;
  print(number16); // 8
  
  number16 /= 2;
  print(number16); // 4
  
  
  
  // null 조건 의 operator
  // null 
  double? number17 = 4.0;
  print(number17); // 4
  
  number17 = 2.0;
  print(number17); // 2
  
  number17 = null;
  print(number17); // null
  
  number17 ??= 3.0; // 만약 number17 의 값이 null 이라면? 오른쪽 같으로 바꿔라! 위에 null 이라고 선언을 해두었기 때문에!
  print(number17); // 3
  
  
  // 값을 서로 비교하는 operator
  int number18 = 1;
  int number19 = 2;
  
  print(number18 > number19); // false
  print(number18 < number19); // true 
    print(number18 >= number19); // false
  print(number18 == number19); //false
  print(number18 != number19); // true
  
  
  
  // 타입을 비교하는 operator
  int number20 = 1; 
  
  print(number20 is int); // true
  print(number20 is String); // false
  
  print(number20 is! int); // false
  print(number20 is! String); // true
  
  // 논리 operator
  // && - and 조건
  // || - or 조건
  
  bool result = 12 > 10;
  print(result); // true
  
  bool result1 = 12 > 10 && 1 > 0;
  print(result1); // true
  
  bool result2 = 12 > 10 && 0 > 1; 
  print(result2); // false
  
  bool result3 = 12 > 10 || 1 > 0;
  print(result3); // true
  
  bool result4 = 12> 10 || 0 > 1;
  print(result4); // true
  
  bool result5 = 12 < 10 || 0 > 1; 
  print(result5); // false
  
  
  // List 
  // 리스트 앞은 무조건 대문자로 시작  
  // <> 제너릭 : List 안에 어떤 타입이 들어갈 건지 정의 해줘야한다.
  
  List<String> blackPink = ['제니','지수', '리사','로제'];
  List<int> blackPinkAge = [20,20,20,21];
  print(blackPink); // [제니, 지수, 리사, 로제]
  print(blackPinkAge); // [20, 20, 20, 21]
  
  
  // index
  // 순서
  // 0 부터 시작
  print(blackPink[0]); // 제니
  
  // list 의 크기 구하기
  print(blackPink.length); // 4
  // 추가
  blackPink.add('김희동'); // [제니, 지수, 리사, 로제, 김희동]
  print(blackPink);
  
  // 삭제
  blackPink.remove('김희동');;
  print(blackPink); // [제니, 지수, 리사, 로제]
  
  // List의 index 찾기
  print(blackPink.indexOf('리사')); // 2
 
  // Map 
  // Key / Value  
  Map<String, String> dictionary = {
    'Harry Poter' : '해리포터',
    'Ron Weasley': '론 위즐리',
    'Hermione Granger': '헤르미온느 그레인저'    
  };
  print(dictionary); 
  
  Map<String, bool> isHarryPotter = {
    'Harry Poter' : true,
    'Ron Weasley': true,
    'Hermione Granger': true    
  };
  print(isHarryPotter); 
  
//   map 에 추가할수 있는 방법
  isHarryPotter.addAll({
    'Spider': false
  });
  print(isHarryPotter);
  
  // key에 해당하는 value값 가져오기
  print(isHarryPotter['Spider']); // false
  
  // 새로운 키와 벨류를 넣기
  isHarryPotter['Ironman'] = false;
  print(isHarryPotter); // {Harry Poter: true, Ron Weasley: true, Hermione Granger: true, Spider: false, Ironman: false}

  
  // value 값 변경 가능
  isHarryPotter['Spider'] = true; 
  print(isHarryPotter); // {Harry Poter: true, Ron Weasley: true, Hermione Granger: true, Spider: true, Ironman: false}
  
  // 해당 키값 제거
  isHarryPotter.remove('Harry Poter'); 
  print(isHarryPotter); // {Ron Weasley: true, Hermione Granger: true, Spider: true, Ironman: false}
  
  // 키값만 가져오기
  print(isHarryPotter.keys); // (Ron Weasley, Hermione Granger, Spider, Ironman)
  
  // 벨류 값만 가져오기
  print(isHarryPotter.values); // (true, true, true, false)

  
  // set 
  // map 이랑 매우 비슷하지만 키 랑 밸류 ㄷ짝이아니라 하나의 값만 저장 가능 
  // map 은 중복 가능 set 은 중복 값이 안됌 
  final Set<String> names = {
    'kim',
    'shin',
    'lee',
  };
  
  print(names); // {kim, shin, lee}
  
  print(names.contains('shin')); // true
  
  
  // if 문
  
  int ifNumber = 2; 
  if(ifNumber % 2 == 0){
    print('나머지가 0입니다.');
  } else if(ifNumber & 3 == 1){
   print('나머지가 1입니다.');
  } else {
    print('나머지가 2입니다.');
  }
 
  // switch 문
 switch(ifNumber % 3) {
   case 0 : print('나머지가 0입니다.');
     break;
     case 1 : print('나머지가 1입니다.');
     break;
   default: print('나머지가 2입니다.');
     break;
}
 
  //for loop
 for(int i =0; i < 10; i++){
    print(i); 
 }
  
  int total1 = 0;
  List<int> numbers1 = [1,2,3,4,5];
  
  for(int i=0; i < numbers1.length; i++) {
    total1 += numbers1[i];    
  }
  
  print(total1); // 15
  
  total1 = 0;
  
  // 다른 방법으로 더하기
  for(int number in numbers1){
    total1 += number;    
  } 
  
  print(total1); // 15
  
  // while loop
  
  int total3 = 0;
  
  while(total3 < 10){
      total3 +=1;
    
    if(total3 == 5){
      break;
    }
  };
  
  print(total3); // 5
  
  for(int i=0; i < 5; i ++){
    if(i == 3){
      continue;
    }
    print(i); // 0 1 2 3 4 
  }  
}
```