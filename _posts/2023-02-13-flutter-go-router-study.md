---
# 제목
title: "GoRouter 란!"
# 부가 내용 미리보기
excerpt: "GoRouter에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, goRouter]

# 
permalink: /flutter/go-router-study/

toc: true
toc_sticky: true

date: 2023-02-13
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 GoRouter


## 네비게이터의 진화버전!

나중에 참고하면 좋은 사이트
https://www.kodeco.com/flutter/paths/flutter-fundamentals

GoRouter 
- GoRote : 각각의 페이지로 가는 길
- redirect : 옵션, 조건문을 걸어서 다른 길로 이동 


``` dart
class MyRouter {
	// 로그인 상태 
  final LoginState loginState;

  MyRouter(this.loginState);

// 기본 Router()
  late final router = GoRouter(
    // 각페이지의 루트 포함
    routes: [],
    // loginState 상태를 지켜본다.
    refreshListenable: loginState,
    // 개발시 디버그하기, 앱출시에는 false 로 변경해야한다.
    debugLogDiagnostics: true,
  );
}
```

### errorhandler

``` dart
late final router = GoRouter(
    // 길 들
    routes: [
      // 길 등록
      GoRoute(
        // 길
        path: '/login',
        // 길 이름 (겹치면 안된다.)
        name: loginRouteName,
        // 도착치 
        builder: (context, state) {
          return const Login();
        },
      ),
      // 길 등록,
      // 길 등록,
    ],
    refreshListenable: loginState,
    debugLogDiagnostics: true,
  );
```

#### 에러 핸들러 작성

``` dart
late final router = GoRouter(
	errorBuilder: (context, state) {
    	// 에러 페이지출력
    	return ErrorPage(error: state.error)
    }
    errorPageBuilder: (context, state) {
    	return MaterialPage<void>(child: ErrorPage());
    }
	...
);
```
### errorBuilder 와 errorPageBuilder 차이
결과적으로 같다. 
기본적인 트랜지션을 사용할때는 errorBuilder 사용
커스텀 트랜지션은 errorPageBuilder 사용한다. 
errorPagebuilder 같은 경우는 MaterialPage처럼컨트롤 가능해진다.



### go() 와 goNamed() 와 pushNamed() 차이
``` dart
context.go('/login');
```
``` dart
context.goNamed(routeName);
```
``` dart
context.pushNamed(routeName);
```

go 는 라우트 스택에 안쌓인다.
push 는 라우트 스택에 쌓인다. 그래서 뒤로가기 버튼 생김


### redirect
어떤 경로로 다시 보내버리겠다. 라는 의미이다.
refreshListenable: loginState 
loginState 의 상태가 변경되어 리프래쉬 되는 것을 읽겠다.
``` dart
GoRouter(
	  ...
      routes: [라우트들],
      redirect: (context, state) {
      // 현재 우리가 보고있는 페이지 확인
      // 현재 로그인 상태 어떤지 확인
      final loggedIn = loginState.loggedIn;
      // state.subloc : 현재 위치해 있는 쿼리파라미터를 리턴한다.
      final inAuthPages = state.subloc.contains(loginRouteName) ||
          state.subloc.contains(createAccountRouteName);

      // inAuth && true => go to home
      if(inAuthPages && loggedIn) return '/';
      // noInAuth && false => go to loginPage
      if(!inAuthPages && !loggedIn) return '/login';
    },
	// loginState 상태를 지켜본다.
    refreshListenable: loginState,
)

```

### 경로에서 매개변수 전달 받기

HomeScreen() 에는 tab 을 받아서 바텀시트를 변경하는데, 하드코딩으로 하지말고, state의 파람을 매개변수를 받아 전달하면 동적으로 잘 전달된다.
``` dart
GoRoute(
        path: '/',
        name: rootRouteName,
        builder: (context, state) {
          return HomeScreen(tab: 'shopping');
        },
      ),
```
경로의 매개변수 받기!
``` dart
GoRoute(
        path: '/:tab',
        name: rootRouteName,
        builder: (context, state) {
          final tab = state.params['tab'];
          // 빈값을 
          return HomeScreen(tab: tab ?? '');
        },
      ),
```

### 서브 경로 넣어주기
기존 경로에 서브 경로를 넣어줄 수있다.

``` dart
GoRoute(
          path: '/:tab',
          name: rootRouteName,
          builder: (context, state) {
            final tab = state.params['tab'];
            return HomeScreen(tab: tab ?? '');
          },
          routes: [
            GoRoute(
              name: profilePersonalRouteName,
              path: 'personal',
              builder: (context, state) {
                return const PersonalInfo();
              },
            ),
          ]),
```

	/:tab/profile-personal
    /profile/profile-personal
``` dart
   onTap: () {
                // TODO: Add Personal Page Route
                context.pushNamed(
                  profilePersonalRouteName,
                  // /:tab 을 넣어줘야 에러가 안난다.
                  params: {'tab': 'profile'},
                );
              },
```


debugLogDiagnostics: true, 했을시 나오는 bash

    [GoRouter] Full paths for routes:
      => /login
      => /create-account
      => /:tab
      =>   /:tab/personal
    known full paths for route names:
      login => /login
      create-account => /create-account
      root => /:tab
      profile-personal => /:tab/personal

    [GoRouter] setting initial location /login
    [GoRouter] redirecting to RouteMatchList(/:tab)
    [GoRouter] Using MaterialApp configuration

#### 여기서 문제점 해결
바텀 모델을 클릭해도 위의 경로가 바뀌지 않는다.
크롬으로 확인해보자!

![](https://velog.velcdn.com/images/sht-3756/post/6a02c1de-caf8-4a47-9e16-a6b9f0377643/image.gif)

바텀 시트 코드 변경
```dart
onTap: (index) {
          switch (index) {
            case 0:
              context.go('/shop');
              break;
            case 1:
              context.go('/cart');
              break;
            case 2:
              context.go('/profile');
              break;
          }
}
```
#### 해결
![](https://velog.velcdn.com/images/sht-3756/post/0972ec6c-6332-4a09-9736-ae1bd40561a3/image.gif)

### 서브라우트 연결
``` dart
GoRoute(
	name: shopDetailsRouteName,
	path: 'details/:item',
	builder: (context, state) {
		return Details(description: state.params['item']!);
	},
),
```

``` dart
onTap: () {
	final value = items[index];
	context.goNamed(
	shopDetailsRouteName,
	params: {'tab': 'shop', 'item': value},
);
```
결과
![](https://velog.velcdn.com/images/sht-3756/post/d4193c3f-41ef-44b6-8b89-0a7261a22ce5/image.gif)
이런식으로 profile 의 서브 경로도 연결해주자!


``` dart
context.pushNamed(
	profilePersonalRouteName,
    params: {'tab': 'profile'},
);
```

### 로그아웃 기능도 적용
``` dart
ListTile(
	title: Text(
		'log out',
	style: TextStyle(fontWeight: FontWeight.bold),
),
	onTap: () {
		logOut(context);
	},
),

// 로그아웃 함수
void logOut(BuildContext context) {
    Provider.of<LoginState>(context, listen: false).loggedIn = false;
  }
```
그리고 goRouter 등록할때, redirect를 하기
``` dart
redirect: (context, state) {
      // 현재 우리가 보고있는 페이지 확인
      // 현재 로그인 상태 어떤지 확인
      final loggedIn = loginState.loggedIn;
      // state.subloc : 현재 위치해 있는 쿼리파라미터를 리턴한다.
      final inAuthPages = state.subloc.contains(loginRouteName) ||
          state.subloc.contains(createAccountRouteName);

      // inAuth && true => go to home
      if (inAuthPages && loggedIn) return '/shop';
      // noInAuth && false => go to loginPage
      if (!inAuthPages && !loggedIn) return '/login';
    },
```

### 라우터를 사용할때 데이터 전달하는 법
전달 하는 곳
``` dart
context.goNamed(
	shopDetailsRouteName,
	params: {'tab': 'shop', 'item': value},
    // 어떤 Object? 든 보낼수 있다.
	extra: 'TestText - $value'
);
```
전달 받는 라우터 설정
``` dart
GoRoute(
	name: shopDetailsRouteName,
	path: 'details/:item',
	builder: (context, state) {
		return Details(
        	description: state.params['item']!, 
            // extra 로 던져주기
        	extra: state.extra,
        );
	},
),
```

전달 받는 곳
``` dart
class Details extends StatelessWidget {
  final Object? extra;

	Details({..., this.extra});
    
   return(
   ...
   	// String 인거는 이미 아니깐, 캐스팅해준다.
   	Text('extra- ${extra as String}'),
   )
}
```