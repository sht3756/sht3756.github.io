---
# 제목
title: "Split()!"
# 부가 내용 미리보기
excerpt: "Split()에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - C/C++
# 태그 
tags:
  - [cpp, split]

# 
permalink: /c-cpp/split/

toc: true
toc_sticky: false

date: 2023-02-07
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Split

Split 함수는 <span style="color:orange">자르기</span> 이다.

내가 원하는 기준으로 잘라서 배열로 반환하는 함수 

``` cpp
#include <bits/stdc++.h>
using namespace std;

vector<string> split(string input, string delimiter) {
	vector<string> ret;
    long long pos = 0;
    string token = "";
    while((pos = input.find(delimiter)) != string::npos) {
    	token = input.substr(0, pos);
        re.push_back(token);
        input.erase(0, pos + delimiter.length());
    }
    ret.push_back(intput);
    return ret;
}

int main() {
	string s = "안녕,나는,김,똥,개", d = ",";
    vector<string> a = split(s, d);
    for(string b : a) cout << b << "\n";
}
```

``` cpp
/*
안녕
나는
김
똥
개
*/
```