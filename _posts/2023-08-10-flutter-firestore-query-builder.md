---
# 제목
title: "FirestoreQueryBuilder 사용하기!"
# 부가 내용 미리보기
excerpt: "FirestoreQueryBuilder 사용하기에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, firestore, FirestoreQueryBuilder]

# 
permalink: /flutter/firestore-query-builder/

toc: true
toc_sticky: false

date: 2023-08-10
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 

참조 

[파베DOC](https://pub.dev/documentation/flutterfire_ui/latest/firestore/FirestoreQueryBuilder-class.html)

FirestoreQueryBuilder 는 개고생을 하고 얼마전에 발견했다.

파이어스토어의 데이터를 futureBuilder 로 출력해주고, 스크롤 내릴때마다 스크롤의 위치를 감지해서 출력해준 크기보다 이상으로 넘어가게 된다면, 더보기 함수를 부르는 방식으로 진행하는 중이었다. = 무한스크롤  

하지만, 개발을 하면서 FutureBuilder 와 더보기 함수를 연결하는데 아다리(?)가 안맞기 시작했고, 

제일 큰 문제는 더보기로해서 기존 데이터 + 새로 불러온 데이터를 List 에 add 하고 불러오는데, 맨위로 올라가진다...

코드량도 많아지고, 상태관리가 길어져서 가독성이 불편했기에 고생하며 찾아낸! FirestoreQueryBuilder 

 

우선 나는 개발시에 백엔드 응답 데이터를 데이터 모델링을 진행해서 매핑을 진행을 해주었다.

그리고 여기에서는 .withConverter(); 를 사용했다. 참 편해~

``` dart
class _TestState extends State<Test> {
	late Query<TestModel>? _query;
    
    @override
    void initState() {
    	super.initState();
        _query = null;
        init();        
    }    
    
    Future<void> init() async {
    	_query = FirebaseFiresotre.instance
        	.collection('컬랙션이름')
            .where('time', isLessThanOrEqualTo: nowDate.toString()) // 필요없음 생략 
            .orderBy('time', descending: true) // 필요없음 생략 
            .withConverter<TestModel>  
            (
            	fromFirestore: (snapshot, _) => TestModel.fromMap(snapshot.data()!),
            	toFirestore: (item, _) => item.toJson();
            ); // 여기 중요!!
    }
}
```

구현부 

```dart

@override
Widget build(BuildContext context) {
	return Scaffold(
    	appBar: AppBar(),
        body: SafeArea(
        	child: _query == null CustomIndicator() // 로딩 처리 하기 위함
            : FirestoreQueryBuilder(
            	query: _query!,
                builder: (BuildContext context, FirestoreQueryBuilderSnapshot<TestModel> snapshot, _) {
                	if(snapshot.isFetching) return CustomIndicator();
                    if(snapshot.hasError) return Container(child: Text('에러 발생'));
                    if(!snapshot.hasData) return Container(child: Text('데이터 없음'));
                    if(snapshot.docs.isEmpty) return Container(child: Text('통신 성공했지만, 데이터 비어있음'));
                    
                    return ListView.builder( // GridView 써도됨
                    	...,
                        itemCount: snapshot.docs.length,
                        itemBuilder: (context, index) {
                        	// 더보기 기능
                            if(snapshot.hasMore && index + 1 == snapshot.docs.length) {
                            	snapshot.fetchMore(); // 개꿀!!!
                            }
	                        return Contaienr(); // 리스트뷰로 보여줄 위젯 
                        }
                    );
                }
            )
        )
    )
}

```

완료 

만약에!! 이렇게까지 할필요 없다?  그냥 무한스크롤 없고,에러, 더보기, 로딩처리 없이 단순 형태만 출력할거면 FirestoreListView 사용하자!
```dart
FirestoreListView<Movie>(
  query: moviesCollection.orderBy('title'),
  itemBuilder: (context, snapshot) {
    Movie movie = snapshot.data();
    return Text(movie.title);
  },
)

```

[참조](https://pub.dev/documentation/flutterfire_ui/latest/firestore/FirestoreListView-class.html)

위의 방법대로 하면, 구현부가 깔끔해진다!! 하하

내가 직접 initState() 에 스크롤 위치 감지해서 메소드 호출할 필요없이 자동으로 불러준다. 

위에 상태관리하려고 지역 변수 왕창쓰고, 더보기 메소드 쓰고.. 엄청 복잡하고 고치려면 귀찮은데... 아주 편안해졌다..ㅋㅋ

그래도 이걸 조금만 더 빨리 알았으면.. 좋았을텐데.. 3번 리팩토링 하면서 발견했다는게 참ㅋㅋㅋ 그래도 그 3번 안했으면 이거 찾지도 못했다! 좋게 생각하자!

느낀점.

기본적으로 원래 이렇게 하나? 싶을 정도로 코드의 상태와 구조가 이상하긴 했다. 
처음 코드를 봤을때, initState() {} 에 스크롤을 감지하는 listen()함수를 사용해서, 일정 스크롤이 넘어가면 더보기 함수를 부르는 형식으로 되어 있었다. 
여기서 들었던 생각은...플랫폼마다 스크롤 위젯의 스크롤이 가능한 상황이 다를텐데 왜이렇게 작성했지? 였다.

 

내가 공부하기론, 우선 ios 는 singleScroll 이든, customScroll 위젯이든 안의 위젯의 길이를 넘어가야 스크롤이 가능하다.  android 는 그냥 가능하다.
또, ios 는 기본적으로 스크롤 밑으로 내려가면 default 로 bounce 가 되고, android 는 아니다. 


그렇다면, 기존의 방법은 스크롤을 내리면 ios 는 바운스 되어서 더보기 함수를 계속 부를것이고, 만약 위젯의 길이가 작다면, 더보기 함수조차를 호출하기 못할것이다.  안드로이드도 물론 위젯의 길이가 작으면 더보기 함수가 호출되지 않을 것이다.귀찮음을 이겨내고.. 위젯의 길이를 다이나믹하게 구해내는 함수를 추가하면 위의 예외처리없이 진행이 가능은 할 것이다. 

결국은... 기존의 코드 대부분을 살려내고, 진행을 하려고 했던 내가... 너무 고생을 했다... 다음부터는 그냥 다 지우고 내가 다시 작성을 하도록하자!