---
# 제목
title: "나만의 라이브러리 만들기"
# 부가 내용 미리보기
excerpt: "갑자기 만드는 나의 첫 라이브러리"

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, library]

#
permalink: /flutter/make-library/

toc: true
toc_sticky: false

date: 2025-02-06
# last_modified_at: 0000-00-00

# true 활성 (default), false 비활성
published: true
---

<script src="/customs/loader.js"></script>

# 🦥 첫 라이브러리

갑자기 이전 포스팅 만들다가 (=플랫폼마다 UI 다르게 보여주기) 참조를 어떻게 할까? 고민을 했다.

내가 한 20개 정도를 만들건데(나중엔 더 추가하고 수정할 예정) 어디서 주워 들은 지식들이 나의 상상력을 풍부하게 만들었다.

## part , part of

참고로 freezed 생성시에 많이 선언해서 사용해봤다.
예시를 작성해야겠다.

📂 main.dart

```dart
library my_library; // 라이브러리 선언

part 'file1.dart';
part 'file2.dart';
```

📂 file1.dart

```dart
part of my_library;

void functionA() {
  print("Function A 실행");
}
```

📂 file2.dart

```dart
part of my_library;

void functionB() {
  print("Function B 실행");
}
```

기본 동작

- main.dart 에 포함된 part 파일들은 하나의 단일 파일처럼 동작함.
- file1.dart 와 file2.dart 안의 함수 및 클래스를 서로 참조 가능함.

단점
1️. 파일이 많아지면 의존성 관리가 어려움
part 파일끼리 서로 참조할 수 있기 때문에 파일 간의 의존성이 꼬일 가능성이 높음.
하나의 part를 수정하면 다른 여러 개의 part도 영향을 받을 수 있음.

2️. 파일 로딩 문제
part 파일들은 별도의 개별 라이브러리처럼 로드되지 않음.
main.dart가 로드될 때, 모든 part 파일들이 한 번에 로드됨.
즉, 불필요한 코드도 한꺼번에 메모리에 올라갈 수 있음 (성능 저하 가능).

3️. import보다 part가 더 제한적임
import는 모듈화가 가능하지만, part는 특정 라이브러리 내부에서만 사용 가능.
즉, 재사용이 어렵고, 유지보수가 불편해짐.

## export, import 사용

📂 my_library.dart

```dart
export 'file1.dart';
export 'file2.dart';
```

📂 file1.dart

```dart
void functionA() {
  print("Function A 실행");
}
```

📂 file2.dart

```dart
void functionB() {
  print("Function B 실행");
}
```

📂 main.dart

```dart
import my_library.dart;

void main() {
  functionA();
  functionB();
}
```

part는 정말 하나의 파일처럼 동작해서, 모든 part 파일이 한 번에 메모리에 올라감 → 성능 저하 가능성 있음.

서두가 길었지만, 어차피 하나씩 늘려갈거! 나만의 라이브러리를 만들어서 내 프로젝트에서 적용하는 방식으로 갈 것이다.

나는 fvm 을 사용해서 로컬 패키지가 아니라 깃허브에 배포해서 만드는 패키지를 만들겠다.

## 1. 깃허브 레포지토리 만들기

나는 누구와 공유할 생각이 없어서 `Private Repo` 로 생성할거다. 만약 누구랑 공유 할거면 그때서야 Public 으로 변경 or ssh key 를 추가해주는 방식으로 진행하면 된다.

<custom-details summary="Git SSH 키를 추가" content=
"

  <h4>
  1. SSH 키 생성하기
  </h4>

  <custom-code class='bash'> 
  ssh-keygen -t rsa -b 4096 -C 'your-email@example.com'
  </custom-code>

  <h4>
  2. 깃허브에 SSH 등록
    Settings -> SSH and GPG keys -> New SSH Key
  </h4>
  <h4>
  3. 그리고 5. 적용! 부분에서 시작하면 된다.
  </h4>
"
></custom-details>

## 2. 첫번째 라이브러리 프로젝트 만들기

```bash
flutter create --template=package platform_widgets

```

- `platform_widgets` 폴더안에 lib/ 자동 생성
- `src/` 생성해서 그 안에 추가할 함수 및 클래스 추가

```bash
platform_widgets/
 ├── lib/
 │    ├── platform_widgets.dart  <-- 이 파일에서 export 관리
 │    ├── src/  <-- 개별 위젯 파일 저장 폴더
 │    │    ├── bottom_navigation_bar.dart
 │    │    ├── adaptive_scroll_physics.dart
 │    │    ├── ... (여러 위젯 파일)
 ├── pubspec.yaml  <-- 패키지 정보 관리
 ├── README.md
 ├── test/
```

## 3. pubspec.yaml 설정

`platform_widgets/pubspec.yaml`

```yaml
name: platform_widgets
description: "플러터 플랫폼 별 UI (iOS & Android)"
version: 0.0.1 // 버전
homepage: https://github.com/sht3756/platform_widgets.git // ssh 로 만들었으니, 추가할 레포지토리의 ssh 주소

environment:
  sdk: ^3.6.1 // 맞는 버전 추가
  flutter: ">=1.17.0" // 맞는 버전 추가

dependencies:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0
  // 만약 필요한 패키지 있으면 추가

flutter:
  uses-material-design: true
```

## 4. 깃허브에 배포!

이제 내가 만든 패키지를 추가해주도록 하자!

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin git@github.com:sht3756/platform_widgets.git
git push -u origin main
```

<img width="868" alt="Image" src="https://github.com/user-attachments/assets/d33fd7ea-7093-4da9-a771-85c209d3e96d" />

이제 깃허브에 새로 추가한 `platform_widgets` 이 올라갔다.

## 5. 적용!

배포한 패키지를 내가 사용할 곳에 import 해주자
`pubspec.yaml`

```yaml
dependencies:
  flutter:
    sdk: flutter
  platform_widgets:
    git:
      url: git@github.com:sht3756/platform_widgets.git
      ref: main
```

```bash
flutter pub get
```

## 완료

```dart
import 'package:platform_widgets/platform_widgets.dart';
```

잘 적용된 모습!
<img width="559" alt="Image" src="https://github.com/user-attachments/assets/2e4f7a11-7bfc-436c-8275-934c45e04464" />
