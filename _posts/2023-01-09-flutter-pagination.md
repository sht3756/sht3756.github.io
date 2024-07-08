---
# 제목
title: "페이지네이션이란!"
# 부가 내용 미리보기
excerpt: "페이지 네이션에 대해 시각화 해서 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, pagination]

# 
permalink: /flutter/flutter-pagination/

toc: true
toc_sticky: true

date: 2023-01-09
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Pagination
## Pagination 이란?
페이지네이션은 <span style="color:orange">많은 데이터</span>를 부분적으로 <span style="color:orange">나눠서 불러오는</span> 기술이다!

## Pagination 특징 
- 쿼리에 해당되는 <span style="color:orange">모든 데이터</span>를 한번에 불러오지 않고 <span style="color:orange">부분적으로 쪼개서 불러온다.</span>
- 수억개의 상품이 데이터베이스에 저장되어있는데 사용자가 상품 검색화면 들어갈 때마다 <span style="color:orange">모든 상품 정보</span>를 <span style="color:orange">서버에서</span> 클라이언트로 <span style="color:orange">전송할 필요가 없다</span>.
- 클라우드 시스템은 데이터 전송에 <span style="color:orange">돈</span>이 든다!
- 돈이 안들더라도 수억개의 데이터를 한번에 보내면 분명 <span style="color:orange">메모리가 터질것</span>이다.
- 메모리가 터지지 않더라도 데이터 전송에 상당히 <span style="color:orange">오랜시간이 걸릴 것</span>이다.


## 페이지 기반의 Pagination
- <span style="color:orange">페이지 기반</span>으로 <span style="color:orange">데이터</span>를 잘라서 <span style="color:orange">요청</span>하는 Pagination
- <span style="color:orange">요청</span>을 보낼때 원하는 <span style="color:orange">데이터 개수</span>와 <span style="color:orange">몇번째 페이지</span>를 가져올지 명시
- 페이지 숫자를 누르면 다음 페이지로 넘어가는 형태 UI 에서 많이 사용
- <span style="color:red">Pagination 도중</span>에 데이터베이스에서 데이터가 <span style="color:red">추가되거나 삭제될 경우</span> 저장되는 <span style="color:red">데이터가 누락되거나 중복</span>될 수 있다.
- Pagination <span style="color:orange">알고리즘</span>이 <span style="color:orange">매우 간단</span>하다.

### 페이지 기반의 Pagination 예제

   
|1페이지|2페이지|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒🅓|🅔🅕🅖🅗|🅘🅙🅚🅛|🅜🅝🅞🅟|

- 1 페이지 요청
	- 4개 데이터 요청 (🅐🅑🅒🅓)

- 2 페이지 요청
	- 4개 스킵 (🅐🅑🅒🅓)
	- 4개 요청 (🅔🅕🅖🅗)

- 3 페이지 요청
	- 8개 스킵 (🅐🅑🅒🅓|🅔🅕🅖🅗|)
	- 4개 요청 (🅘🅙🅚🅛)

장점 : 데이터적으로 효율적이다!


### 예제의 문제점
가정 1 ) 
- 1페이지의 마지막에 Ⓒ 데이터가 추가된다면?

상황 1 )
- 1 페이지 처음 불러올때, 🅐🅑🅒🅓가 보이는 상황이고,
- 2 페이지를 불러올때, 갑자기 데이터Ⓒ를 추가했다면? 
🅓🅔🅕🅖가 불려지게 되면서 <span style="color: orange">🅓 가 중복</span>으로 불려지게된다. 

기존 현재 1 페이지 )

|<span style="color: orange">1페이지</span>|2페이지|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒🅓|🅔🅕🅖🅗|🅘🅙🅚🅛|🅜🅝🅞🅟|

갑자기 데이터 추가 된 후, 2 페이지 )

|1페이지|<span style="color: orange">2페이지</span>|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒Ⓒ|🅓🅔🅕🅖|🅗🅘🅙🅚|🅛🅜🅝🅞|


가정 2)
- 1 페이지의 🅓 가 삭제되고, 2 페이지를 불러온다면?


상황 2)
- 1페이지 불러온 상황

|<span style="color: orange">1페이지</span>|2페이지|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒🅓|🅔🅕🅖🅗|🅘🅙🅚🅛|🅜🅝🅞🅟|


- 갑자기 🅓 가 삭제되고 2페이지를 불러온다면?
<span style="color: orange">🅔 는 누락</span>되고 🅕🅖🅗🅘 가 보이게 된다.

|1페이지|<span style="color: orange">2페이지</span>|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒🅔|🅕🅖🅗🅘|🅙🅚🅛🅜|🅝🅞🅟


## 커서 기반 Pagination
- <span style="color:orange">무한스크롤</span> 할 경우 자주 <span style="color:orange">사용</span>
- <span style="color: orange">가장 최근</span>에 가져온 <span style="color: orange">데이터 기준</span>으로 다음 데이터를 가져오는 Pagination
- <span style="color: orange">요청</span>을 보낼때 <span style="color: orange">마지막 데이터의 기준값(ID 등 Unique 값)</span>과 <span style="color: orange">몇개의 데이터</span>를 가져올지 명시
- <span style="color: orange">스크롤 형태</span>의 리스트에서 <span style="color: orange">자주 사용</span> (ex : 앱의 ListView)
- 최근 데이터의 기준값을 기반으로 쿼리가 작성되기 때문에 <span style="color: green">데이터가 누락되거나 중복될 확률이 적음</span>.


### 예제

|<span style="color: orange">1페이지</span>|2페이지|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒🅓|🅔🅕🅖🅗|🅘🅙🅚🅛|🅜🅝🅞🅟|

- 1 페이지 요청시 id > 0 보다 큰 기준으로 불러오고
- 2 페이지 요청시 id > 4 보다 큰 기준으로 불러온다. (마지막 데이터를 파악하고 그 id 이후 부터 요청한다.)

가정 1) 
- 만약, 2 페이지를 불러오는데, 1 페이지에 Ⓒ 데이터가 추가됐다면?
- 1 페이지의 Ⓒ 는 누락되는데, 이 누락은 신규데이터라 어쩔 수 없다.

|1페이지|<span style="color: orange">2페이지</span>|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒Ⓒ🅓|🅔🅕🅖🅗|🅘🅙🅚🅛|🅜🅝🅞🅟|
 
가정 2)
- 만약 2 페이지에서 1페이지를 넘어가기 전 🅓가 삭제된다면?
1 페이지에서 🅐🅑🅒🅓 를 보여줬지만, 🅓가 삭제되면, 2 페이지가 보일때 마지막 데이터 기준으로 다음 부터 보여지게된다.

|1페이지|<span style="color: orange">2페이지</span>|3페이지|4페이지|
|--|--|--|--|
|🅐🅑🅒🅔|🅔🅕🅖🅗|🅘🅙🅚🅛|🅜🅝🅞🅟|
 
