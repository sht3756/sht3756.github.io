---
# 제목
title: "SSL 과 HTTP/HTTPS 란!"
# 부가 내용 미리보기
excerpt: "SSL 과 HTTP/HTTPS에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - CS
# 태그 
tags:
  - [ssl, http, https]

# 
permalink: /cs/ssl-http-https/

toc: true
toc_sticky: false

date: 2023-05-01
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 SSL 과 HTTP/HTTPS

## SSL 과 TLS 은 무엇인가?

SSL (Secura Socket Layer)은 간단하게 보여지는 데이터와 보내는 데이터들을 암호화 하는 보안 기능을 갖고있는 인증서! 라고 보면된다.

TSL (Transport Layer Security) 은 SSL 의 업그레이드 버전이다.  
둘을 따로 구분하지 않고 일반적으로 SSL 이라고 부른다.

우리는 보통 호스팅/도메인 업체에서 SSL 을 산다는 것을 의미한다.


네이버 인증서 확인 
![](https://velog.velcdn.com/images/sht-3756/post/4f719cc1-6cfe-4594-8ce4-9203296e8bf7/image.png)

이렇게 SSL 인증서를 받은 웹페이지는 <span style="color: orange">https</span> 로 표시가 된다.
![](https://velog.velcdn.com/images/sht-3756/post/6f30322f-0b61-4065-84fc-aec9f39338b7/image.png)

## HTTPS 와 HTTP 의 차이점은 ?
> HTTP + SSL = HTTPS 
HTTPS 는 <span style="color: orange">H</span>yper<span style="color: orange">t</span>ext <span style="color: orange">T</span>ransfer <span style="color: orange">P</span>rotocol Over <span style="color: orange">S</span>ecure Socket Layer

데이터 전송 기능의 보안을 강화한 전송 기능이라고 보면 된다. 
=> SSL 인증서를 가진 도메인만이 https:// 로 시작한다. 


### 차이점
1. https 적용 되지 않은 도메인은 사용자 브라우저에 사용했던 이미지처럼 '주의 요함' 같은 경고 메세지 표시하고, 개인정보에 취약할 수 있다. 
2. 검색엔진에서 도메인 평가 시, 구글에서는 https 적용 유/무는 중요요소중 하나이다.
대부분이 도메인이 https 를 사용하기 때문에 확실하게 SSL 을 적용해주는 것이 중요하다.


## 유료 vs 무료 SSL 인증서

기업이 아닌, 일반적인 경우 는 무료 SSL 사용하면 된다.
SSL 갱신 주기와 고객지원의 유/무라고 보면된다.

당연히 무료는 기간이 짧고 유료는 관리를 해주기 때문에 기간이 길다. 
기업에서 사용하면 당연히 유료 SSL 인증서를 발급받아서 사용하도록 하자! 

> 너무 깊이 알 필요없다. 우리는 그냥 SSL 이 무엇인지와 그에 따른 HTTP/HTTPS 의 차이만 알면 될뿐!








