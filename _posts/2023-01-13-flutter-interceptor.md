---
# 제목
title: "Interceptor 이란!"
# 부가 내용 미리보기
excerpt: "Interceptor 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, interceptor]

# 
permalink: /flutter/interceptor/

toc: true
toc_sticky: true

date: 2023-01-13
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Interceptor 
## 상황

Dio 패키지로 api 통신을 하는데, 
retrofit 패키지로 반복적인 api 요청, 응답 후 매핑 로직자체를 자동으로 생성하게 만들고, 여기서 accessToken 을 헤더에 담아야 하는데,
Interceptor 로 가로채서 accessToken 이 유효한지 체크해보는 시간을 갖겠다.

## Interceptor 란?
말 그대로 가로챈다~

새로 앱을 시작하면, accessToken 과 refreshToken 을 발급을 받았다.
accessToken 이 만료가 되었을때, refreshToken 을 이용해서 accessToken 을 새로 발급 받아와 flutter securestorage 에 저장하는 법을 안배웠다.

## Interceptor 추가
### 1. Interceptor 클래스 생성
Interceptor 를 상속을 받으면, onRequest, onResponse, onError 함수를 호출할 수 있다. 
그래서 api 통신을 해보면 요청 보낼때 pirnt 가 잘 출력되는 것을 볼 수 있다.

### onRequest (요청 할 때)
``` dart
import 'package:dio/dio.dart';

class CustomInterceptor extends Interceptor {
  // 1) 요청 보낼때
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
	print('[REQ] [${options.method}] ${options.uri}');
    
    return super.onRequest(options, handler);
  }

  // 2) 응답을 받을때
  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    // TODO: implement onResponse
    return super.onResponse(response, handler);
  }

  // 3) 에러가 났을때
  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    // TODO: implement onError
    return super.onError(err, handler);
  }
}

```

![](https://velog.velcdn.com/images/sht-3756/post/25df41cc-5c8f-4aaf-ad9d-cca4c1a53dbf/image.png)


``` dart
final dio = Dio();

// 추가
dio.interceptors.add(
	CustomInterceptor();
)
```

스토리지안에서 토큰을 가져오기 위해서 선언

### onError(에러날 때)
Interceptor 를 해서 401 status 에러가 나는 것을 감지해서 토큰을 새로 발급받는 
401 에러는 accessToken 이 만료될 때 나오는 에러이다.
``` dart
  @override
  void onError(DioError err, ErrorInterceptorHandler handler) async {
    // 401 에러가 날때 (status code)
    // 토큰을 재발급 받는 시도를 한다.
    // 토큰이 재발급되면, 다시 새로운 토큰으로 요청을 한다.
    print('[ERR] [${err.requestOptions.method}] ${err.requestOptions.uri}');

    final refreshToken = await storage.read(key: REFRESH_TOKEN_KEY);

    // refreshToken 이 없으면
    // 당연히 에러를 던진다.
    if (refreshToken == null) {
      // 에러를 던질때는 handler.reject 를 사용한다.
      return handler.reject(err);
    }

    final isStatus401 = err.response?.statusCode == 401;
    final isPathRefresh = err.requestOptions.path == '/auth/token';

    if (isStatus401 && !isPathRefresh) {
      final dio = Dio();

      try {
        final res = await dio.post(
          'http://$ip/auth/token',
          options: Options(headers: {
            'authorization': 'Bearer $refreshToken',
          }),
        );
        final accessToken = res.data['accessToken'];

        final options = err.requestOptions;

        // 토큰 변경하기
        options.headers.addAll({
          'authorization': 'Bearer $accessToken',
        });

        await storage.write(key: ACCESS_TOKEN_KEY, value: accessToken);

        // 요청 재전송
        final response = await dio.fetch(options);

        return handler.resolve(response);
      } on DioError catch (e) {
        // on DioError : 오직 DioError 만!
        return handler.reject(e);
      }
    }
    return handler.reject(err);
  }
```

### onResponse(응답 받을 때)
응답 받을때는 딱히 컨트롤 할게 없기 때문에, print문만 출력했다.
``` dart
@override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    print('[RES] [${response.requestOptions.method}] ${response.requestOptions.uri}');
    return super.onResponse(response, handler);
  }
```
