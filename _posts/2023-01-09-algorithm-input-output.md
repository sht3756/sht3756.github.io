---
# 제목
title: "입력과 출력!"
# 부가 내용 미리보기
excerpt: "입력과 출력에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Algorithm
# 태그 
tags:
  - [algorithm, input, output]

# 
permalink: /algorithm/input-output/

toc: true
toc_sticky: false

date: 2023-01-09
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 입력과 출력
입력에는 cin, scanf, getline 가 있고,
출력에는 cout, printf 있다.

## 입력
대표적으로 cin, scanf 가 있다.
cin 은 개행무나 까지 입력받고, scanf 는 <span style="color: orange">형식을 지정</span> <span style="color: yellow">?? </span>해서 입력 받는다.
```
#include <bits/stdc++.h>
using namespace std;
int a;
int main(){
	cin >> a;
	scanf("%d", &a);
	return 0;
}
```

### cin 

### scanf
scanf 는 입력형식이 까다롭거나 이를 이용해야할때 사용하는게 좋다.
이외에 보통은 cin 을 사용한다.

``` cpp
#include <bits/stdc++.h>
using namespace std;
int a;
double b;
char c;
int main(){
  scanf("%d %lf %c", &a, &b, &c);
  printf("%d\n", a);
  printf("%lf\n", b);
  printf("%c\n", c);
  return 0;
}
/*
입력 )
23330
233.23123
a

출력 )
23330
233.231230
a

설명 ) 
%d 는 int
%if 는 double
%c 는 char
*/
```


|형식|타입||
|:-:|:-:|
|d|int|
|c|char|
|s|string|
|lf|double|
|id|long long|

#### scanf 를 이용해 실수타입을 정수타입으로 받아보기
3.22 처럼 double 타입으로 들어오는걸 double 타입으로 받을 수 있지만, scanf를 이용해 int 타입 2개를 만들어 받을 수 있다.
사실 실수타입 연산은 까다롭기 떄문에, 이런 방법으로 정수타입으로 유도한다.ㅋㅋ
``` cpp
#include <bits/stdc++.h>
using namespace std;
int a, b;
double c;
int main(){
    // 입력 1
    scanf("%d.%d", &a, &b);
    // 출력 1
    printf("\n%d %d\n", a, b);
    // 입력 2
    scanf("%lf", &c);
    // 출력 2
    printf("%lf\n", c);
    return 0;
}
/*
입력 1)
3.22
출력 1)
3 22
-----
입력 2)
3.22
출력 2)
3.220000
-----
설명 ) 
입력 1) 
scanf("%d.%d", &a, &b);
-> 입력해라("int.int", 변수a, 변수b)
-> 3.22 로 double 타입으로 입력했지만, 사실은 int.int 으로 받아서 각각 ab 에 저장 시켜놓고 출력한 것이다. 

출력 1)
printf("\n%d %d\n", a, b);
-> 출력해라("int int", 변수 a, 변수 b)

-----
입력 2)
scanf("%lf", &c);
-> 입력해라("double", 변수 c); 
-> 3.22 로 double 타입으로 입력하고, 받는 것도 lf double 이다. 출력은 문자열 char 

출력2)
printf("%lf\n", c); 
-> 출력해라("double", 변수 c)
*/
```

### getline
위에서 배운 cin 이 개행문자까지 받는다고 했는데, 한번에 받으려면?
예를 들어 "김똥개 화이팅" 문자열은 <span style="color:orange">어떻게 한번에</span> 받을까? 이럴땐~ <span style="color:orange">getline~</span>

``` cpp
#include<bits/stdc++.h>
using namespace std;
// string 타입인 변수 s 선언
string s;
int main(){
    // 입력
    getline(cin, s);
    // 출력
    cout << s << '\n';
    return 0;
}

/*
입력 ) 
김똥개 사랑해 바보야 

출력 ) 
김똥개 사랑해 바보야
*/
```

하지만, geline 을 여러번 써야되는 상황이 있다.
그럴때 <span style="color: orange">특정 문자열을 기반</span>으로 <span style="color: orange">버퍼플래시</span>를 하고 받으면 된다.

``` cpp
#include <bits/stdc++.h>
using namespace std;
// 반복할 만큼의 int 타입 변수 T 선언
int T;
// 출력하기 위한 string 타입 변수 s 선언
string s;
int main(){
    // 몇 번 반복할 것인지, T 입력
    cin >> T;
    // 특정 문자열 기반 bufferFlush 로 하고 받으면 된다.
    string bufferFlush;
    // 개행까지 한번에 받기위한 getline() 사용
    getline(cin, bufferFlush);
    // 반복문 T 로 입력한 만큼 반복
    for(int i = 0; i < T; i++){        
        getline(cin, s);
        // 출력
        cout << s << "\n";
    }
    return 0;
}

/*
입력 )
2
안녕 하세요

출력 )
안녕 하세요

입력 )
저는 김똥개입니다.

출력 )
저는 김똥개입니다.
*/
```

## 출력
출력에는 <span style="color: orange">cout</span> 와 <span style="color: orange">printf</span> 가 있다.

### cout 
밑에처럼 하는 것이 일반적!
이렇게 해야 <span style="color:orange">"한 줄" 띄어쓰기</span>를 넣어주는 것이디.
``` cpp
cout << 출력할 것 << "\n"; 
```

<span style="color:orange">"한 칸" 띄어쓰기</span>를 넣어주는 것이다.
``` cpp
cout << 출력할 것 << " ";

```


#### cout의 실수타입 출력
cout 를 사용해 실수타입을 출력하고싶다면? 
가정 ) 소수자리 6자리까지 반올림해서 출력해야한다
> cout.precision(자릿수);

``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
double a = 1.23456789;
int main() {
	// 출력 
	cout << a << "\n"; // 1.23457
    cout.precision(7);
    // 출력
    cout << a << "\n"; // 1.234568
    return 0;
    
}
```

### printf
<span style="color: orange">printf</span> 는 형식을 지정해서 출력할때 사용하면 좋다.
<span style="color: orange"> 형식(format)</span> 을 정한 후 매개변수로 변수를 넣으면 형식에 맞춰 <span style="color: orange">출력</span>된다.

``` cpp
int printf(cont char * format, ...);
```

#### 예제 1

김씨 : 1 : 홍씨 2 이런 형식으로 출력해라!

``` cpp
#include<bits/stdc++.h>
using namespace std;
int a = 1, b = 2;
int main() {
	printf("김씨 %d : 홍씨 %d\n", a, b);
    return 0;
}

/*
결과 )
김씨 : 1 : 홍씨 2
*/

```
#### 예제 2
printf 를 이용해서 소수점 6자리 까지 출력하고, 2는 02로 출력해라!
``` cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
double a = 1.23456789;
int b = 2;
int main() {
	// 출력
	printf("%.6lf\n", a); // 1.234568
    printf("%02d\n", b); // 02
    return 0;
}
```

### 주의할 점!
<span style="color: orange">prinf로 문자열을 출력하려면 string 을 문자열에 대한 포인터(char *) 타입으로 바꿔줘야한다.</span>
``` cpp
#include<bits/stdc++.h>
using namespaing std;
int ageInt = 28;
char gradeChar = 'a';
string nameStr = '김똥개';
double weightDouble = 73.5;
int main() {
	// 출력
	printf("내 나이 : %d\n", ageInt);
    printf("내 성적 : %d\n", gradeChar);
    printf("내 이름 : %d\n", nameStr.c_str());
    printf("내 체중 : %d\n", weightDouble);
    return 0;
    
} 

/*
결과)
내 나이 : 28
내 성적 : a
내 이름 : 김똥개
내 체중 : 73.5
*/

```
> 그러니깐! 보통 문자열 출력할때는 간단하게 <span style="color: orange">cout</span> 를 사용하자!








