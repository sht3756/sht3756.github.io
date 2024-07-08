---
# 제목
title: "Debounce 와 Throttle 이론 과 적용!"
# 부가 내용 미리보기
excerpt: "Debounce 와 Throttle 이론 과 적용에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, debounce, throttle]

# 
permalink: /flutter/debounce-throttle/

toc: true
toc_sticky: true

date: 2023-01-26
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Debounce, Throttle

- Debounce 와 Throttle 모두 특정 함수의 실행을 제한하는 목적을 두고있다.
- Debounce 는 특정 기간 안의 함수 실행을 모두 취소하고 마지막에만 실행한다.
- Throttle은 함수 실행 후 특정 기간 동안의 추가 실행을 모두 취소한다.

## Debounce 

디바운스는 함수 지정해놓은 시간 동안 다시 한번 함수가 재호출되면 기존의 함수를 취소하고 재호출된 함수 지정해놓은 시간 동안 기다리고 실행한다.

![](https://velog.velcdn.com/images/sht-3756/post/3cd7ebe0-0d3e-4592-9ff9-9800cfd2e659/image.png)
2 는 신경쓰지 않고, 1만 신경쓰도록 하자!
위에는 함수 버튼 누를때 시점, 아래는 함수가 발현되는 시점이다.
Debounce 는 특정 시간(5 초)을 지정하도록 한다.
1 함수를 실행하고 지정된 특정 시간동안(5초 내) 1 함수가 다시 실행된다면, 기존의 실행된 함수를 취소하고 다시 실행된 함수가 특정 시간 지난 이후에 다시 발현한다. 


### Debounce 는 언제 필요할까?
장바구니의 상품 구매 버튼, 무한스크롤 등의 Api 통신을 할때 여러번 실행하면,
실행하는 족족 서버에 보내버리면, 당연히 서버 부담이 된다. 이런 경우 Debounce 를 사용해서 특정 시간을 설정해두고 그 안에 함수에 여러번 실행되는 것을 막자!




## Throttle 
throttle 은 debounce 와 반대의 의미이다.

디바운스는 특정기간 동안 다시 한번 함수가 재호출되면 기존의 함수를 취소하고 재호출된 함수 지정해놓은 시간 동안 기다리고 실행하지만,

쓰로틀은 함수 호출 되면 바로 실행되어 버리고, 특정 기간 동안 다시 한번 함수가 재호출되면 마지막 함수를 취소한다.

![](https://velog.velcdn.com/images/sht-3756/post/ff63e3a4-e852-456a-a3ff-0696e485f4cd/image.png)


## 적용
https://pub.dev/packages/debounce_throttle

``` dart
debounce_throttle: ^2.0.0
```

미리 만들어 놓은 페이지 네이션 무한 스크롤 부분에다가 적용을 할것인데,
debounce 를 사용하지 않고 throttle 을 사용할것이다.
왜냐하면, debounce 를 적용하면 그 전 함수가 계속 취소가 될 것이기 때문이다. 그래서 throttle 이 더 적합하다!

현재 함수는 즉시 호출하고 연속적인 함수 호출은 막는 방법!

### 1. Throttle 선언
``` dart
// Throttle(얼마동안 throttle 할 것인지, initialValue: 처음에 어떤 값을 가지고 함수를 실행할것이냐, checkEquality: 함수 실행할때 넣는 값이 똑같으면 실행하지 않을거냐?(false: 함수를 실행할때마다 throttle 걸리게));
final 변수명 = Throttle(duration, initialValue: initialValue, checkEquality: false);
```
### 2. Throttle value 값 설정

``` dart
paginationThrottle.setValue(_PaginationInfo(
      fetchCount: fetchCount,
      fetchMore: fetchMore,
      forceRefetch: forceRefetch,
));
```

> 새로운 클래스(_PaginationInfo)를 선언 해준다. 그이유는, throttle 을 통해서 페이지 네이션 함수를 실행하려면 paginationThrottle.setValue(val);  이 코드를 실행해야하는데, 파라미터가 하나밖에 안넘어간다. 그러니 클래스를 만들어서 한번에 넘기는 것이다.

### 3. super 생성자에 throttle 실행 
``` dart
PaginationProvider({
    required this.repository,
  }) : super(CursorPaginationLoading()) {
    paginate();

    // _throttlePagination 의 값의 listen 해서 _throttlePagination 함수 실행한다.
    paginationThrottle.values.listen(
      (state) {
        _throttlePagination(state);
      },
    );
  }

```
### 전체 코드
``` dart
// 새로운 클래스를 선언해서 한번에 넘겨주기! 왜냐 setValue 에 파라미터 하나밖에 안된다.
class _PaginationInfo {
  final int fetchCount;
  final bool fetchMore;
  final bool forceRefetch;

  // 내가 필요한 파라미터들 생성자에 넣어주자!
  _PaginationInfo({
    this.fetchCount = 20,
    this.fetchMore = false,
    this.forceRefetch = false,
  });
}

class PaginationProvider<T extends IModelWithId,
        U extends IBasePaginationRepository<T>>
    extends StateNotifier<CursorPaginationBase> {

  // throttle 을 선언 및 초기화 해주자!
  final paginationThrottle = Throttle(
    Duration(seconds: 3), // 3초로 설정
    initialValue: _PaginationInfo(), // 초기값 설정
    checkEquality: false, // 함수에 같은 값 들어가도 실행해라~
  );

  PaginationProvider({
    required this.repository,
  }) : super(CursorPaginationLoading()) {
    paginate();
	
    // 쓰로틀 실행-values 값 변경하는거 listen 해서 body 값 실행해라~
    paginationThrottle.values.listen(
      (state) {
        _throttlePagination(state);
      },
    );
  }
  
  // 페이지네이션 처리 함수! 
  Future<void> paginate({
    int fetchCount = 20,
    bool fetchMore = false,
    bool forceRefetch = false,
  }) async {
  	// 페이지 네이션을 throttle 을 거치게 하는 방법!
    paginationThrottle.setValue(_PaginationInfo(
      fetchCount: fetchCount,
      fetchMore: fetchMore,
      forceRefetch: forceRefetch,
    ));
  }

  // throttle 함수 작성 
  _throttlePagination(_PaginationInfo info) async {
    final fetchCount = info.fetchCount;
    final fetchMore = info.fetchMore;
    final forceRefetch = info.forceRefetch;

    try {    
    	// 페이지 네이션 함수 처리 로직
    } catch (e, stack) {
    	// 에러 처리 로직  
    }
  }
}


```

## Throttle 적용 결과
페이지 스크롤을 여러번 내려도 하나의 REQ, RES 가 오는 것을 확인할 수 있고
여러번 REQ 요청 하는 모습을 방지한 모습이다.
![](https://velog.velcdn.com/images/sht-3756/post/bad86a07-3462-4a55-a8ea-a755e79ae515/image.gif)


## Debounce 적용
장바구니에 담겨있는 수량 증가, 감소 할때 api 를 요청을 한다.
이 함수 같은경우는 굉장히 유저가 많이 누를 수 있고 사용하니, 누르는 족족 서버에 보내지 않고, Debounce 로 적용해서 맨 마지막 것만 서버에 넘겨줘도 된다!
``` dart
class BasketProvider extends StateNotifier<List<BasketItemModel>> {
  final UserMeRepository repository;
  // debounce 선언 및 초기화
  final updateBasketDebounce = Debouncer(
    Duration(seconds: 1),
    // 초기값은 null 로, 왜냐 super 생성자에 파라미터로 넘겨줄게 없기 떄문이다. 
    initialValue: null,
    checkEquality: false,
  );

  BasketProvider({required this.repository}) : super([]) {
    // patchBasket 함수 실행
    updateBasketDebounce.values.listen((state) {
      patchBasket();
    });
  }

  // 장바구니에 아이템 추가 로직
  Future<void> addToBasket({
    // ProductModel 을 전부다 받는다. (내가 추가하려는 상품 id )
    required ProductModel product,
  }) async {
    ...
    // Optimistic Response (긍정적 응답)
    // 요청에 대한 응답이 성공했다고 가정하고 상태를 먼저 업데이트한다.
    // await patchBasket();
    updateBasketDebounce.setValue(null);
  }

  // 장바구니 삭제
  Future<void> removeFromBasket({
    required ProductModel product,
    bool isDelete = false,
  }) async {
  	...
    // Optimistic Response (긍정적 응답)
    // 요청에 대한 응답이 성공했다고 가정하고 상태를 먼저 업데이트한다.
    // await patchBasket();
    updateBasketDebounce.setValue(null);
  }
}


```

Optimistic Response 와 Debounce 의 적절한 조화! 라고 보면 된다.

>Optimistic Response
에러 날 상활을 미리 위에다가 if 조건문으로 다 잡아놓고 뷰단에는 바로 숫자가 올려지게끔 하면서 api 통신은 맨 밑에 처리 한다.

>Debounce
장바구니 추가, 장바구니 삭제 함수를 Debounce 걸어서 마지막 함수만 보내게 한다. 가능한 이유는 
장바구니 추가, 장바구니 삭제는 물론, 장바구니 리스트 출력은 ProductModel 을 전부 다 넘겨주고 받아오기 때문이다.

## Debounce 적용 결과
장바구니 추가를 아무리 눌러도 특정 시간 후 마지막 함수만 실행되고, 
장바구니 삭제도 마지막 함수만 실행된다.

![](https://velog.velcdn.com/images/sht-3756/post/af920988-7d29-40e7-9d1b-b129f30e8c6c/image.gif)
