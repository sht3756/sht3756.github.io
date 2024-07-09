---
# 제목
title: "조합(Combination)!"
# 부가 내용 미리보기
excerpt: "조합(Combination)에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Algorithm
# 태그 
tags:
  - [algorithm, combination]

# 
permalink: /algorithm/combination/

toc: true
toc_sticky: false

date: 2023-02-07
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 조합(Combination)
조합하는 방법을 배워볼 것이다.
조합에는 순서가 없다. 그냥 몇명을 뽑아 갈건지를 할때 조합을 쓴다.
만약, 3개 이하를 뽑는 다면 중첩for문 사용하고, 4개 이상이면 재귀함수를 사용하면 편리하다.

조합의 공식   
![](https://velog.velcdn.com/images/sht-3756/post/b06d164f-b9f0-4546-ac15-6b3aba32b21c/image.png)

## 만약, 예를 들어 5개 중 3개를 뽑는다!
``` cpp
#include <bits/stdc++.h>
using namespace std;

int n = 5, k = 3, a[5] = {1, 2, 3, 4, 5}; 

void print(vector<int> b){
for(int i : b)cout << i << " ";
    cout << '\n';
}
void combi(int start, vector<int> b) {
	if(b.size() == k) {
    	print(b);
        return;
    }
    for(int i = start + 1; i < n; i++) {
    	b.push_back(i);
        combi(i, b);
        b.pop_back();
    }
    return;
}
int main() {
	vector<int> b;
    combi(-1, b);
    return 0;
}
```

# 중첩 for 문
3개를 뽑는 거면 3중 for문이 필요하다.
``` cpp
int main() {
	for(int i = 0; i < n; i++){
      for(int j = i + 1; j < n; j++){
        for(int k = j + 1; k < n; k++){
        	cout << i << " " << j << " " << k << '\n';
      	} 
      }
	}
	return 0; 
}

/* 
0 1 2 
0 1 3
0 1 4
0 2 3
0 2 4
0 3 4
1 2 3
1 2 4
1 3 4
2 3 4 
*/
```


