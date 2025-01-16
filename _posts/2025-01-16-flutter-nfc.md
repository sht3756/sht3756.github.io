---
# 제목
title: "NFC 사용"
# 부가 내용 미리보기
excerpt: "NFC 너란 놈 정복해보겠어"

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, nfc]

#
permalink: /flutter/nfc/

toc: true
toc_sticky: false

date: 2025-01-16
# last_modified_at: 0000-00-00

# true 활성 (default), false 비활성
published: false
---

# 🦥 nfc 연동해보겠다.

## 준비

- nfc 연동을 위한 준비

```bash
  // pubspec.yaml
   flutter_nfc_kit: ^3.5.2
   dependency_overrides:
   js: "^0.6.4"
```

DOCUMENT에 따라서 설정을 해주자
![nfc1](https://github.com/user-attachments/assets/24bab511-3dba-4ee9-a283-283951b1bbf4)

### 1. XCode 권한 추가

NFC 기능을 활성화하기 위해 프로젝트의 entitlements파일에 권한을 추가해줘야한다.

- xcode 열기
- Signing & Capabilities 탭 클릭
- +Capability 클릭
- Near Field Communication Tag Reading 클릭

![nfc2](https://github.com/user-attachments/assets/452654b9-14ec-41fa-bfed-21982b80a5a5)

### 2. 앱이 NFC를 사용한다고 사용자에게 표시된다.

```
//info.plist
<key>NFCReaderUsageDescription</key>
<string>This app uses NFC to read data.</string>
```

### 3. iOS 14.5 이하 버전을 위한 추가 설정

iOS 14.5 이하 버전에서는 NFC 관련 설정이 누락되면 기기가 재부팅 전까지 NFC 기능이 비활성화될 수 있다. 이를 방지하기 위해 아래 키를 추가한다.

```
<key>com.apple.developer.nfc.readersession.felica.systemcodes</key>
<array>
  <string>D2760000850101</string>
</array>
<key>com.apple.developer.nfc.readersession.iso7816.select-identifiers</key>
<array>
  <string>A0000002471001</string>
</array>

```

## 이슈

> Doc 권한 설정 안하면 나는 이슈이니 잘 따라해주자!

```bash
flutter: start polling
flutter: PlatformException(500, Generic NFC Error, The operation couldn’t be completed. (NFCError error 4099.), null), #0      StandardMethodCodec.decodeEnvelope (package:flutter/src/services/message_codecs.dart:648:7)
#1      MethodChannel._invokeMethod (package:flutter/src/services/platform_channel.dart:334:18)
<asynchronous suspension>
#2      FlutterNfcKit.poll (package:flutter_nfc_kit/flutter_nfc_kit.dart:332:25)
<asynchronous suspension>
#3      _MyAppState.build.<anonymous closure> (package:nfc_test/main.dart:122:40)
<asynchronous suspension>
```

## 결과

| 이미지                                                                                                                      | 설명                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| <img height=300 width=300 src="https://github.com/user-attachments/assets/d2d58b9e-0f58-4082-bdbf-eef32c29f81c" alt='nfc3'> | <b>Start Polling을 클릭시 나오는 화면(바텀시트모달이 열리고 스캔준비라고 출력)</b> |
| <img height=300 width=300 src="https://github.com/user-attachments/assets/586fd33a-92a3-4734-9e1c-e34257665988" alt='nfc4'> | <b>스캔시 완료시 나오는 화면(NFC태그후 뜨는 바텀시트모달) </b>                     |
| <img height=300 width=300 src="https://github.com/user-attachments/assets/55c4ce13-5fe1-41b6-8a9c-85deeebac495" alt='nfc5'> | <b>결과 스크린(NFC태그 후 나온 결과) </b>                                          |

## 코드
