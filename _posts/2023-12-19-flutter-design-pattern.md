---
# 제목
title: "mvc, mvp,mvvm !"
# 부가 내용 미리보기
excerpt: "mvc, mvp,mvvm 디자인 패턴에 대해 간단 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, mvc, mvp, mvvm]

# 
permalink: /flutter/design-pattern/

toc: true
toc_sticky: false

date: 2023-12-19
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 디자인패턴!

# MVC

***빠른 개발, 기능 역할 직관적*** 

***View 와 Model 의존성이 높다***

m : 뷰에 필요한 데이터, 비즈니스 로직 집합, 데이터 변경,조작 정의

v :  UI 요소, 옵저버패턴으로 m 관찰

c : v,m 중재자 역할, 사용자 요청 처리, m 의 res 데이터 가공 후 v 반환 

<aside>
💡 순서

1. 사용자 요청 → c → m 을 업데이트 
2. c→ v 선택 (업데이트 된 m)
3. v 업데이트된 m 로 UI 업데이트
</aside>

# MVP

***View 와 Controller 의존성 사라짐***

***View와 Presenter 의존성이 높다***

1. 사용자 요청 action → v
2. v (데이터 요청) → p 
3. p (데이터 요청) → m
4. m (데이터 응답) → p 
5. p (데이터 가공 후 응답) → v
6. v 응답받은 데이터 UI 업데이트

# MVVM

테스트 용이

***View 와 ViewModel 사이 의존성 사라짐***

***ViewModel 설계 어려움***

1. 사용자 요청 action → v
2. v (action 전달) → vm 
3. vm (데이터 요청) → m 
4. m (데이터 응답) → vm
5. vm 응답받은 데이터 가공후 저장
6. v 는 vm 업데이트 감지해 UI 업데이트

mvc 

m 모델타입 정의 +  데이터 비즈니스로직

v 스크린

c 컨트롤러 + 데이터 가공 (뷰 비즈니스 로직)

mvp 

m 모델타입 정의 + 데이터 비즈니스 로직

v 스크린

p 컨트롤러 + 데이터 가공 (뷰 비즈니스 로직)

mvvm

m 

v 스크린

vm 모델 타입 + 데이터 비즈니스 로직,  뷰 상태

|패턴|장점|단점|차이점| 
|---|---|---|---|
|MVC|테스트2|테스트3|
|MVP|뷰와 모델의 의존선이 낮다|프레젠터가 추가되어 복잡해진다.|뷰와 모델의 |
|MVVM|뷰와모델의 의존성이 낮다|뷰모델이 추가되어 복잡하다|뷰와 모델의 의존성이 뷰모델을 통해 간접적이다|


![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/bced9c22-53d7-447a-b941-f50cbcbdea3d/e36ecc47-af2d-4c8a-8f52-8ca8dd3b36f2/Untitled.png)


**MVC**

MVC 패턴은 Model, View, Controller의 세 가지 구성 요소로 이루어져 있습니다. Model은 데이터를 처리하고, View는 화면을 구성하고, Controller는 Model과 View를 연결합니다.

MVC 패턴의 장점은 다음과 같습니다.

- 간단하고 이해하기 쉽습니다.
- 유지보수가 쉽습니다.

MVC 패턴의 단점은 다음과 같습니다.

- 뷰와 모델의 의존성이 높습니다.
- 뷰와 모델이 서로 직접적으로 통신하기 때문에, 뷰나 모델의 변경이 다른 컴포넌트에 영향을 미칠 수 있습니다.

**MVP**

MVP 패턴은 MVC 패턴과 유사하지만, 프레젠터를 추가한 패턴입니다. 프레젠터는 뷰와 모델을 연결하고, 뷰의 요청을 모델에 전달하고, 모델의 응답을 뷰에 전달합니다.

MVP 패턴의 장점은 다음과 같습니다.

- MVC 패턴의 장점을 그대로 가지고 있습니다.
- 뷰와 모델의 의존성을 낮출 수 있습니다.

MVP 패턴의 단점은 다음과 같습니다.

- MVC 패턴보다 복잡합니다.
- 프레젠터가 추가되어 유지보수가 어려울 수 있습니다.

**MVVM**

MVVM 패턴은 MVC 패턴과 MVP 패턴의 장점을 결합한 패턴입니다. MVVM 패턴에서는 뷰와 모델의 의존성을 낮추기 위해 뷰모델을 사용합니다. 뷰모델은 뷰의 UI 상태를 관리하고, 모델의 데이터를 뷰에 전달합니다.

MVVM 패턴의 장점은 다음과 같습니다.

- MVC 패턴과 MVP 패턴의 장점을 그대로 가지고 있습니다.
- 뷰와 모델의 의존성을 낮출 수 있습니다.

MVVM 패턴의 단점은 다음과 같습니다.

- MVC 패턴과 MVP 패턴보다 복잡합니다.
- 뷰모델이 추가되어 유지보수가 어려울 수 있습니다.

**차이점**

MVC, MVP, MVVM 패턴의 주요 차이점은 다음과 같습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/bced9c22-53d7-447a-b941-f50cbcbdea3d/c985a6b3-60b9-4200-845a-3cb84f03bfbd/Untitled.png)