---
# 제목
title: "NFC 이란!"
# 부가 내용 미리보기
excerpt: "NFC설명"

# 해당 카테고리
categories:
  - Flutter
# 태그
tags:
  - [flutter, nfc]

#
permalink: /flutter/nfc-2/

toc: true
toc_sticky: false

date: 2025-01-20
# last_modified_at: 0000-00-00

# true 활성 (default), false 비활성
published: false
---

<script src="/customs/loader.js"></script>

# 🦥 NFC 란!

<span style="color:red">N</span>ear <span style="color:red">F</span>ield <span style="color:red">C</span>ommunication을 줄여서 NFC 라고 한다.  
10 cm 거리에서 13.56MHz 의 주파수로 두 전자기기가 통신할 수 있는 무선 통신 기술이다.

<custom-details summary="13.56MHz 의 주파수란?" content="

<p>13.56MHz(메가헤르츠)는 무선 주파수 중 하나로, 주로 근거리 무선 통신(NFC) 및 RFID 기술에서 사용됩니다.</p>
    <h2>주파수 범위 이해하기</h2>
    <p>1Hz(헤르츠)는 1초에 1번의 진동을 의미합니다.<br>
    1MHz(메가헤르츠)는 1초에 1,000,000번의 진동을 뜻합니다.<br>
    따라서, 13.56MHz는 1초에 13,560,000번의 진동을 발생시키는 주파수입니다.</p>
    <h3>일상적인 비교</h3>
    <p>FM 라디오: 87.5MHz ~ 108MHz<br>
    Wi-Fi: 2.4GHz (2400MHz), 5GHz (5000MHz)<br>
    13.56MHz는 FM 라디오 주파수보다 낮고, Wi-Fi 주파수보다 훨씬 낮은 주파수 대역에 속합니다.</p>
    <h3>용도와 특징</h3>
    <p>이 주파수는 RFID 및 NFC 장치가 데이터를 전송하거나 통신하는 데 자주 사용되며, 이 주파수 대역은 안테나 설계와 통신 거리에서 최적화된 성능을 제공합니다.<br>
    단거리 통신에 적합하여 일반적으로 수 cm ~ 수십 cm 범위에서 동작합니다.<br>
    결론적으로, 13.56MHz는 비교적 낮은 주파수에 속하며, 이는 전파가 긴 파장을 가지게 만들어 단거리 통신에 적합한 특성을 제공합니다.<br>
    NFC나 RFID 기술을 사용할 때 유용하게 사용되는 주파수라고 보면 됩니다!</p>
">

</custom-details>

# RFID는 무엇인가?

<p align="center">
<img width="516" alt="nfc7" src="https://github.com/user-attachments/assets/473327bc-e019-4b44-b63d-5892a86fcfab" />
</p>

쿠팡에서 찾아보면, RFID 마크가 붙어 있는게 있고, 아닌게 있다.  
과연 둘의 차이는 무엇인가!

NFC 는 기본적으로 RFID 기술중 프록시미티 가드 기술인 ISO/IEC 14443 을 기반으로 만들어 졌다.  
그래서 RFID 와 NFC 는 기술적으로 큰차이가 없다

NTAG 215 는 용량에 따른 명칭이다.

> |항목|ntag213|ntag215|ntag216|
> |사용자메모리|144 바이트| 504 바이트|888 바이트|
> |최대 url|136 자|488자|872자|
> |비용|저렴|중간|고가|
> |유효성|높음|중간|낮음|
> |스캔강도|높음|높음|높음|
> |총 메모리(bytes)|180|540|924|
> |사용자 메모리(bytes)|144|504|888|
> |UID(bytes)|7|7|7|
> |ECC 서명|가능|가능|가능|
> |UID ASCII 미러|가능|가능|가능|
> |카운터 스캔|가능|가능|가능|
> |카운터 ASCII 미러|가능|가능|가능|
> |잠금|가능|가능|가능|
> |작동 주파수|13.56 MHz|13.56 MHz|13.56 MHz|
> |데이터 전송율|106 k에bit/s|106 k에bit/s|106 k에bit/s|
> |입력 용량|50pf|50pf|50pf|
> |빠른 읽기|가능|가능|가능|
> |데이터 보존 (년)|10|10|10|
> |내구성 쓰기 (사이클)|100000|100000|100000|
> |충돌 방지|가능|가능|가능|
> |스탠다드|ISO / IEC 14443 A|ISO / IEC 14443 A|ISO / IEC 14443 A|
>
> 주요사용처
>
> | ntag213                                                                                                                                  | ntag215                                           | ntag216                                       |
> | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------- |
> | - 마케팅 및 광고 <br> - 바우처 <br> - 블루투스 페어링 <br> - GS1 EPC/RFID <br> - 개체식별 <br> - 제품정보 <br> - 라운드 관리 <br> - PLCR | - 바우처 <br> - 개체 식별 <br> - 매우 긴 추적 URL | - 데이터 저장고 <br> - vCard <br> - 개체 식별 |

주요 차이점은 메모리 크기와 가격이다.

> [ISO/IEC 14443](https://namu.wiki/w/ISO/IEC%2014443){: target="\_blank"} : 식별에 사용되는 프록시미티 카드, 해당 카드와 통신하기 위한 전송 프로토콜을 정의하는 국제표준이다.

## 둘의 차이점

<p align="center">
<img height=500 width=500 alt="nfc6" src="https://github.com/user-attachments/assets/75000f18-f795-4c90-8590-259f2741d2cb" />
</p>
그래서 둘의 차이점이 뭔데!!
