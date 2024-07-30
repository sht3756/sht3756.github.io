---
# 제목
title: "이미지가 출력이 안될때!"
# 부가 내용 미리보기
excerpt: "이미지가 출력이 안될 때에 대해 작성을 한 내용입니다."

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, asset, image, not-found]

#
permalink: /flutter/image-not-found/

toc: true
toc_sticky: false

date: 2022-12-14
# last_modified_at: 0000-00-00

# true 활성 (default), fasle 비활성
published: true
---

# 🦥 이미지 출력 이슈

pubspec.yaml 파일에 이미지 경로를 잘 입력을 했는데도 이미지가 안나오는 경우가 있다.

터미널에 뜨는 이슈

```
Unable to load asset: assets/images/logo.png.
```

## 변경 전

```dart
Image.asset('asset/img/logo.png')
```

## 변경 후

```dart
Image(image: AssetImage("asset/img/logo.png")
```

체크사항

flutter fub get 후에 앱 재시작하기
디렉토리 구조와 pubspec.yaml 파일에 작성법이 알맞게 작성이 되었는지 확인하기

[참조](https://docs.flutter.dev/development/ui/assets-and-images)
