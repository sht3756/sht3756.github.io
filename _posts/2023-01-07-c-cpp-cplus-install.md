---
# 제목
title: "C++ 프로그램 설치 및 기본!"
# 부가 내용 미리보기
excerpt: "C++ 프로그램 설치 및 기본에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - C/C++
# 태그 
tags:
  - [c++, install]

# 
permalink: /c-cpp/cpp-install/

toc: true
toc_sticky: false

date: 2023-01-07
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 설치 및 베이직

# 1. Mac 에서 시작하기

맥에서는 보통 xCode or vsCode 로 작업할 예정이다.. 나는 vsCode 로 할 것이다.

brew install gcc

## bits/stdc++.h 사용

bits/stdc++.h 란? 
**<span style="color: orange">C++ 의 표준 라이브러리가 모두 포함</span>**된 헤더이다!
iostream, csdio 등 여러 라이브러리에 있는 함수를 신경쓸 필요가 없어진다.

Mac 에서는 window의 Dev C++ 와는 달리 include 하려면 별도의 작업이 필요하다.

## 별도의 설정
``` bash
cd/usr/local/include
mkdir bits 
cd bits
vi stdc++.h
```

여기서 만약에 <span style="color: orange">Permission denied 가 뜬다면?</span>
``` bash
sudo mkdir bits
```
그리고 <span style="color:orange">파일이 저장이 안된다?</span>
그러면 그냥 따로 만들어서 넣어주자!
<details>
  <summary>파일 내용 자세히 보기</summary>

``` cpp
  #ifndef _GLIBCXX_NO_ASSERT
  #include <cassert>
  #endif
  #include <cctype>
  #include <cerrno>
  #include <cfloat>
  #include <ciso646>
  #include <climits>
  #include <clocale>
  #include <cmath>
  #include <csetjmp>
  #include <csignal>
  #include <cstdarg>
  #include <cstddef>
  #include <cstdio>
  #include <cstdlib>
  #include <cstring>
  #include <ctime>

  #if __cplusplus >= 201103L
  #include <ccomplex>
  #include <cfenv>
  #include <cinttypes>
  #include <cstdbool>
  #include <cstdint>
  #include <ctgmath>
  #include <cwchar>
  #include <cwctype>
  #endif

  // C++
  #include <algorithm>
  #include <bitset>
  #include <complex>
  #include <deque>
  #include <exception>
  #include <fstream>
  #include <functional>
  #include <iomanip>
  #include <ios>
  #include <iosfwd>
  #include <iostream>
  #include <istream>
  #include <iterator>
  #include <limits>
  #include <list>
  #include <locale>
  #include <map>
  #include <memory>
  #include <new>
  #include <numeric>
  #include <ostream>
  #include <queue>
  #include <set>
  #include <sstream>
  #include <stack>
  #include <stdexcept>
  #include <streambuf>
  #include <string>
  #include <typeinfo>
  #include <utility>
  #include <valarray>
  #include <vector>

  #if __cplusplus >= 201103L
  #include <array>
  #include <atomic>
  #include <chrono>
  #include <condition_variable>
  #include <forward_list>
  #include <future>
  #include <initializer_list>
  #include <mutex>
  #include <random>
  #include <ratio>
  #include <regex>
  #include <scoped_allocator>
  #include <system_error>
  #include <thread>
  #include <tuple>
  #include <typeindex>
  #include <type_traits>
  #include <unordered_map>
  #include <unordered_set>
  #endif
  ```
</details>
  

  # 2.첫번째 C++ 파일 만들기
  내가 만들고 싶은 경로에 a.cpp 파일을 만들자
  ``` cpp
  #include <bits/stdc++.h> 
using namespace std; 
int main() {
    cout << 1 << "\n";
    return 0;
}
  ```
 
 다음의 명령어 실행!
 a.cpp 라는 파일을 엄격하게(-wall) C++14버전으로 컴파일해서 test.out 라는 파일을 만든다.(-o test.out)는 뜻이다.
 
 ``` bash
 g++ -std=c++14 -Wall a.cpp -o test.out
./test.out
 ```
 
# 예제로 이해하는 C++
``` cpp 
#include <bits/stdc++.h> // --- (1)
using namespace std;// --- (2)
string a;// --- (3)
int main(){
	cin >> a;// --- (4)
	cout << a << "\n";// --- (5)
	return 0; // - (6)
}
```


설명
 (1) 헤더 파일을 include 포함시킨다. bits/stdc++.h 는<span style="color: orange"> C++ 의 모든 표준 라이브러리</span> 포함된 헤더파일!
 (2) std 라는 네임스페이스를 사용한다. <span style="color: orange">네임스페이스</span>란? 많은 라이브러리를 불러서 사용하다보면 <span style="color: orange">변수명 중복</span>이 생기는데, 이를 <span style="color: orange">방지</span>하기 위해 <span style="color: orange"> 변수명에 범위를 걸어놓는</span> 의미이다. 
 (3) 문자열 변수 a 선언, string 타입을 가진 a 라는 변수이다. 만약, string a = '안녕'; 이라고 한다면, a는 <span style="color: orange">lvalue</span> 라고 하고 안녕 은 <span style="color: orange">rvalue</span> 라고 한다. lvalue는 <span style="color: orange">추후 다시 사용될 수 있는 변수</span>이고, rvalue는 <span style="color: orange">한번 쓰고 다시 사용되지 않는 변수</span>이다.
 (4) 변수 a 를 <span style="color: orange">입력</span>받는다. 대표적으로 cin, scanf 가 있다.
 (5) 변수 a 를 <span style="color: orange">출력</span>한다. 대표적으로 cout, prinf 가 있다.
 (6) main 함수를 종료시키는 return 0 이다. 프로세스를 정상적으로 <span style="color: orange">마무리</span>한다는 뜻, C++ 은 <span style="color: orange">cpp 파일당 하나의 main 함수</span>만 만들수 있다!
 
 ## typedef
 typedef는 <span style="color: orange">타입의 이름을 새로</span> 별칭으로 정의하는 것!
 C++ 에서 이미 정의 된 타입 이나 사용자가 정의한 타입(struct or class)보다 더 짧게 지을수 있다.
 
 ## define
 상수, 매크로를 정의할수 있다.
 ``` cpp
 #definde <이름> <값>
 ```
 상수 PI 값을 정의 하였고, for 반복문을 loop 라는 문자열로 치환한 것이다.
 
 ``` cpp
	#include<bits/stdc++.h>
    using namespace std;
    #define PI 3.14159
    #define loop(x, n) for(int x = 0; x < n; x++)
    
    int main() {
    	cout << PI << '\n';
        int sum = 0;
        loop(i, 10){
        	sum += i;            
        }
        cout << sum << '\n';
        return 0;
    }
    /*
    3.14159
    45
    */
 ```
 
 ## STL
 C++ 은 STL()을 제공하며 이는 <span style="color: orange">자료구조, 함수 등을 제공하는 라이브러리</span>이다. <span style="color: orange">알고리즘, 컨테이너, 이터레이터, 펑터</span> 4가지 제공한다.
 
C++ 로 vector 의 자료구조를 쓴다거나 sort() 함수를 쓸 수 있는 것은 다 ~ STL 덕분이다. 

 ### 알고리즘
 <span style="color: orange">정렬, 탐색</span> 등에 관한 함수로 이루어져 있습니다. sort() 대표적이다.

 ### 컨테이너
 시퀀스 컨테이너 - <span style="color: orange">데이터를 단순히 저장</span>해 놓는 자료구조 (array, vector, deque, forward_list, list)가 있다.
 
 연관 컨테이너 - 자료가 저장됨에 따라 <span style="color: orange">자동정렬되는 자료구조</span>를 말한다. 
 중복키가 가능한 가능한 것에는 이름이 <span style="color: orange">multi</span> 가 붙는다. set, map, multiset, multimap 이 있다.
 
 정렬되지 않은 연관 컨테이너 - 자료가 저장됨에 따라 <span style="color: orange">자동정렬이 되지 않는 자료구조</span>를 말한다. unordered_set, unordered_map, unordered_multiset, unordered_multimap이 있다.
 
 컨테이너 어댑터 - <span style="color: orange">시퀀스 컨테이너</span>를 이용해 만든 자료구조이며, stack, queue 는 <span style="color: orange">deque</span> 로 만들어져있고 priority_queue는 <span style="color: orange">vector</span> 을 이용해 힙자료구조로 만든다.
 
 ### 이터레이터
 추후 공부 예정
 
 ### 펑터
 펑터란 함수 호출 연산자를 오버로드 하는 <span style="color: orange">클래스의 인스턴스</span>를 말한다.
 
 **자세한 정리는 나중에! 지금은 간단하게 무슨 이론이다만 알고 넘어가자!**
 