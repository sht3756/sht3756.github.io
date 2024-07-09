---
# 제목
title: "순열(permutation)!"
# 부가 내용 미리보기
excerpt: "순열(permutation)에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Algorithm
# 태그 
tags:
  - [algorithm, permutation]

# 
permalink: /algorithm/permutation/

toc: true
toc_sticky: false

date: 2023-01-11
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 순열

## 순열이란?
순열이란 순서가 정해진 임의의 집합을 다른 순서로 섞는 연산을 말한다.
## 식
>nPr = n! / (n-r)!
n 은 총 개수
r 은 고르려는 개수

## 예제
### 1번

📝1,2,3 이 있다고 한다면, 1, 3, 2 이런식으로 다른 순서로 섞는 연산을 말한다.
📝n 개의 집합 중 n 개를 고르는 순열의 개수는 n! 이라는 특징을 가지고 있다.

### 2-1번
💡문제
예를 들어 3개 중 3개를 뽑는다면 3! / (3-3)! 이 된다. 

📝해설
3P3 = 3! / (3-3)!
### 2-2번 
💡문제
3개 중 1개를 뽑는다면 3! / (3-1)! 이 되는 것이다.

📝해설
3P1 = 3! / (3-1)!

### 3번
![](https://velog.velcdn.com/images/sht-3756/post/4d2ebf12-97c2-414d-b2e8-7d6ee8d9df0d/image.png)
💡문제
서로 다른 색깔을 가진 3개의 공에 대해 3개를 "!!!순서와 상관 있이!!!" 뽑는 경우의 수는 어떻게 될까?

📝해설
3P3 = 3! / (3-3)!
6 / 0! -> 참고로 0! 은 1 이다.

📝결과
6
## next_permutation 과 prev_permutation 
순열에 두가지가 있다.
next_permutation -> 오름차순의 배열 기반으로 순열을 만들 수 있다.
prev_permutation -> 내림차순의 배열 기반으로 순열을 만들 수 있다.

매개변수로는 순열을 만들 범위를 가르키는 first, last 을 넣는다.
순열을 시작할 범위의 첫번째 주소, 그리고 포함되지 않는 마지막 주소를 넣어 만든다.


## C++ 로 예제
한가지만 알아도 되니, next_permutaion 으로 문제르 풀자!
``` cpp
#include <cstdio>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;
vector<int> v; 
void printV(vector<int> &v) {
    for(int i = 0; i < v.size(); i++ ){
        cout << v[i] << " ";    
    }
    cout << "\n";

}

int main() {
    for(int i = 1; i <= 3; i ++)v.push_back(i);

    do
    {
        printV(v);
    } while (next_permutation(v.begin(), v.end()));

    return 0;
}

/*
결과 )
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 1 2 
3 2 1 
*/
```

## 잠깐 end() 말고 다른거 가능?
<span style="color:orange">**응 가능!**</span>
여기서 배열의 종점인 end() 를 넣지않고 다른걸 넣을 수 있다.
배열의 0, 1 만의 순서만 고치게도 가능하다
``` cpp
// v.begin(), v.begin() +2 만의 범위를 만든것이다.
do{
	printV(v);
}while(next_permutation(v.begin(), v.begin() + 2));

/*
결과 )
123
213
*/
```
.



## 추가 설명
### vector 란 ?
- 동적으로 요소를 할당할 수 있는 동적 배열이다.
- 컴파일 시점에 사용할 요소의 개수를 모른다면 vector 를 써야한다.
- 연속된 메모리 공간에 위치한 같은 타입의 요소들의 모음이며,
- 숫자인덱스를 기반으로 랜덤접근이 가능하고 중복 허용된다.

### 선언 방법 
> vector<타입> 변수명;

### vector 함수 
무엇이있는지와 C++ 코드에 적힌 함수만 설명하고, 자세한건 알고리즘 이론에 작성하겠다.

#### push_back() 는? 
vector 의 뒤에서부터 요소를 더한다. 참고로 emplace_back() 과 같은 기능이다. 

push_back(), pop_back(), erase(), find(from, to, value), clear(), fill(from, to, value) 등이 있다. 

#### begin() 는?
문자열의 첫번째 요소
#### end() 는?
문자열의 마지막 요소 그다음을 가르키는 이터레이터를 반환한다. 자료 구조인 vector, Array, 연결리스트, Map, Set 에서도 같은 의미이다. 
