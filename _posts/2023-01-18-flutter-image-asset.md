---
# 제목
title: "Image.asset() 와 AssetImage() 란!"
# 부가 내용 미리보기
excerpt: "Image.asset() 와 AssetImage() 에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그 
tags:
  - [flutter, Image.asset(), AssetImage()]

# 
permalink: /flutter/image-asset/

toc: true
toc_sticky: true

date: 2023-01-18
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성 
published: true
---

# 🦥 Image.asset(), AssetImage()

## ImageAsset() 과 Image.asset() 
비슷해보이는데 차이점이 무엇일까?
둘다 asset 을 통해서 이미지를 가져오는것은 맞다.
하지만, AssetImage 은 Provider 이고, Image.asset() 은 위젯이다. 

### Image.asset()

``` dart
Image.asset('assets/imgs/sample.jpg');
```
위젯이다.
직접 이미지를 그리는 위젯이다.
![](https://velog.velcdn.com/images/sht-3756/post/f7857f5c-b9f5-48c7-b20a-cbb7fd7ff0d4/image.png)


### AssetImage()

``` dart
AssetImage('assets/imgs/sample.jpg');
```
위젯이 아닌 이미지를 전달해주는 클래스이다. 
![](https://velog.velcdn.com/images/sht-3756/post/3008da06-ee4f-4d34-b938-c7d50804c06e/image.png)
