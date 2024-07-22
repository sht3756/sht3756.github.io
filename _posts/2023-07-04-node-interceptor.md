---
# 제목
title: "interceptor 란!"
# 부가 내용 미리보기
excerpt: "interceptor 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Node
# 태그 
tags:
  - [node, interceptor]

# 
permalink: /node/interceptor/

toc: true
toc_sticky: false

date: 2023-07-04
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Interceptor(인터셉터)

프론트에서 http 통신을 하면 api 요청전, 후 과정에 처리과정을 넣고 싶을때가 있고, 그렇게 해야하는 경우가 대단히 많다.

예를 들면 로그인된 회원만 볼수 있는 화면에 페이지를 보여준다거나 할때!

 

api 를 요청할때 가로채서 해당 처리과정을 실행하고 요청후에도 가로채서 해당 처리과정을 실행하면 된다.

 

Express 를 공부하면서 interceptor 를 사용해보려고 한다. 

 

전체 적용 

```js
const express = require('express');
const app = express();

app.use(function(req, res, next) {
	// 인터셉터 역할 
    next();
});
```
개별 적용
```js
const express = require('express');
const router = express.Router();

router.all('/매핑 주소', function(req, res, next) {
	// 인터셉터
    next();
}, function(req, res, next) {
	// 인터셉터 이후 
});

// router.all, post, get 다 가능
```