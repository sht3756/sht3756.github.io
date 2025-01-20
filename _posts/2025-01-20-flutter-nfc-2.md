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
published: true
---

<script src="/customs/loader.js"></script>

# 🦥 NFC 란!

<span style="color:red">N</span>ear <span style="color:red">F</span>ield <span style="color:red">C</span>ommunication을 줄여서 NFC 라고 한다.  
10 cm 거리에서 13.56MHz 의 주파수로 두 전자기기가 통신할 수 있는 무선 통신 기술이다.

<custom-details summary="13.56MHz 의 주파수란?" content="

<p>13.56MHz(메가헤르츠)는 무선 주파수 중 하나로, 주로 근거리 무선 통신(NFC) 및 RFID 기술에서 사용된다.</p>
    <h2>주파수 범위로 이해하기</h2>
    <p>1Hz(헤르츠)는 1초에 1번의 진동을 의미한다.<br>
    1MHz(메가헤르츠)는 1초에 1,000,000번의 진동을 의미한다.<br>
    따라서, 13.56MHz는 1초에 13,560,000번의 진동을 발생시키는 주파수이다.</p>
    <h2>일상적인 사물로 비교하기</h2>
    <p>FM 라디오: 87.5MHz ~ 108MHz<br>
    Wi-Fi: 2.4GHz (2400MHz), 5GHz (5000MHz)<br>
    13.56MHz는 FM 라디오와 Wi-Fi의 주파수보다 낮은 주파수 대역에 속한다.
    </p>
    <h2>용도와 특징</h2>
    <p>RFID 및 NFC 장치가 데이터를 전송하거나 통신할때 자주 사용되며, 이 주파수 대역은 안테나 설계와 통신 거리에서 최적화된 성능을 제공한다.<br>
    단거리 통신에 적합하여 일반적으로 수 cm ~ 수십 cm 범위에서 동작합니다.<br>
    13.56MHz는 비교적 낮은 주파수이며, 전파가 긴 파장을 가지게 만들어 단거리 통신에 적합한 특성을 제공합니다.<br>
    NFC나 RFID 기술을 사용할 때 유용하게 사용되는 주파수이다!</p>">
</custom-details>

# RFID는 무엇인가?

<p align="center">
<img width="516" alt="nfc7" src="https://github.com/user-attachments/assets/473327bc-e019-4b44-b63d-5892a86fcfab" />
</p>

<p align="center">
<img height=500 width=500 alt="nfc6" src="https://github.com/user-attachments/assets/75000f18-f795-4c90-8590-259f2741d2cb" />
</p>

쿠팡에서 찾아보면, RFID 마크가 붙어 있는게 있고, 아닌게 있다.  
과연 둘의 차이는 무엇인가!

NFC 는 기본적으로 RFID 기술중 프록시미티 카드 기술인 ISO/IEC 14443 을 기반으로 만들어 졌다.  
<u>그래서 RFID 와 NFC 는 기술적으로 큰 차이가 없다</u>

주파수

- RFID : 낮은 ~ 높은 주파수까지 여러가지 규격이 존재 (134kHz ~ 960MHz)
- NFC : 높은 주파수 하나 존재(13.56MHz)

거리

- RFID : 낮은 주파수는 10 cm 까지, 매우높은 주파수는 최대 100m 까지 통신 가능
- NFC : 10 cm 근거리 통신 가능(낮은 주파수 만큼 단거리통신)

리더와 태그

- RFID : 리더와 태그로 구분, 양방향 통신이 가능하나 일반적으로 태그(전송), 리더(읽기) 역할을 한다.
- NFC : 둘다 가능

장점

- RFID : 카드에 전원 공급 필요 x, 장거리 통신 가능하며, 다중인식 가능하기에 많은 물량 한번에 읽기 가능
- NFC : 기기내의 NFC 기능 업데이트 및 제어 가능해, 더 보안성이 높고 유연하다. 기기에 저장해 불러오거나 클라우드에서 카드 데이터 내려받기 가능, 잠금기능도 있어 스키밍 예방 가능

보안적 단점

- RFID : 스키밍 위험이 크다.
- NFC : 스키밍 위험은 덜하나, 결제 단말기가 해커에 의해 장악된 경우 저장된 카드 정보 유출 가능성있다.(RFID도 마찬가지이다)

> 스키밍(Skimming) 이란?  
> NFC/RFID 스키밍은 해커가 기기간의 전파 통신을 가로채 NFC/RFID 지원기기가 내보내는 전파를 읽는 것  
> 주된 스키밍 피해로는 RFID를 이용한 신용카드, 여권 정보 갈취가 있다.

<custom-details summary="테이블표로 알아보기" content=
"

<table>
  <thead>
    <tr>
      <th>항목</th>
      <th>ntag213</th>
      <th>ntag215</th>
      <th>ntag216</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>사용자메모리</td>
      <td>144 바이트</td>
      <td>504 바이트</td>
      <td>888 바이트</td>
    </tr>
    <tr>
      <td>최대 url</td>
      <td>136 자</td>
      <td>488자</td>
      <td>872자</td>
    </tr>
    <tr>
      <td>비용</td>
      <td>저렴</td>
      <td>중간</td>
      <td>고가</td>
    </tr>
    <tr>
      <td>유효성</td>
      <td>높음</td>
      <td>중간</td>
      <td>낮음</td>
    </tr>
    <tr>
      <td>스캔강도</td>
      <td>높음</td>
      <td>높음</td>
      <td>높음</td>
    </tr>
    <tr>
      <td>총 메모리(bytes)</td>
      <td>180</td>
      <td>540</td>
      <td>924</td>
    </tr>
    <tr>
      <td>사용자 메모리(bytes)</td>
      <td>144</td>
      <td>504</td>
      <td>888</td>
    </tr>
    <tr>
      <td>UID(bytes)</td>
      <td>7</td>
      <td>7</td>
      <td>7</td>
    </tr>
    <tr>
      <td>ECC 서명</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>UID ASCII 미러</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>카운터 스캔</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>카운터 ASCII 미러</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>잠금</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>작동 주파수</td>
      <td>13.56 MHz</td>
      <td>13.56 MHz</td>
      <td>13.56 MHz</td>
    </tr>
    <tr>
      <td>데이터 전송율</td>
      <td>106 k에bit/s</td>
      <td>106 k에bit/s</td>
      <td>106 k에bit/s</td>
    </tr>
    <tr>
      <td>입력 용량</td>
      <td>50pf</td>
      <td>50pf</td>
      <td>50pf</td>
    </tr>
    <tr>
      <td>빠른 읽기</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>데이터 보존 (년)</td>
      <td>10</td>
      <td>10</td>
      <td>10</td>
    </tr>
    <tr>
      <td>내구성 쓰기 (사이클)</td>
      <td>100000</td>
      <td>100000</td>
      <td>100000</td>
    </tr>
    <tr>
      <td>충돌 방지</td>
      <td>가능</td>
      <td>가능</td>
      <td>가능</td>
    </tr>
    <tr>
      <td>스탠다드</td>
      <td>ISO / IEC 14443 A</td>
      <td>ISO / IEC 14443 A</td>
      <td>ISO / IEC 14443 A</td>
    </tr>
  </tbody>
</table>

<h3>주요사용처</h3>

<table>
  <thead>
    <tr>
      <th>ntag213</th>
      <th>ntag215</th>
      <th>ntag216</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>- 마케팅 및 광고 <br> - 바우처 <br> - 블루투스 페어링 <br> - GS1 EPC/RFID <br> - 개체식별 <br> - 제품정보 <br> - 라운드 관리 <br> - PLCR</td>
      <td>- 바우처 <br> - 개체 식별 <br> - 매우 긴 추적 URL</td>
      <td>- 데이터 저장고 <br> - vCard <br> - 개체 식별</td>
    </tr>
  </tbody>
</table>
">
</custom-details>

> [ISO/IEC 14443](https://namu.wiki/w/ISO/IEC%2014443){: target="\_blank"} : 식별에 사용되는 프록시미티 카드, 해당 카드와 통신하기 위한 전송 프로토콜을 정의하는 국제표준이다.

## NFC/RFID 보안 방법

### 1. 물리적 보호

- 금속으로 RFID 차단 지갑이나 케이스를 사용한다.
- 차단 스티커 부착

### 2. 보안 프로토콜 및 암호화

- 고급 암호화를 적용(AES 암호화를 적용해 해독을 어렵게 함)
- ECC(Elliptic Curve Cryptography) 또는 디지털 서명 기술을 적용해 데이터 무결성 보장

### 3. 신호관리

- 주파수 신호강도를 낮춰 장거리 스캔이 되지 않게 한다.
- 안티 스키밍장치를 사용해 방해 전파로 스캔 차단한다.

### 4. 소프트웨어 및 펌웨어 보안

- 일회성 토큰 사용 : 태그 요청받을때마다 고유한 일회성 토큰 생성하도록 설계해 재사용 방지
- 비활성화 모드 : 사용하지 않을때 태그나 카드를 비활성화하도록 펌웨어 설정해준다.

### 실생활에 사용되는 NFC/RFID

- 신용카드, 체크카드
- 신용카드 조회기
- 스마트폰
- 닌텐도의 아미보
- 카메라 EOS800D 전송기능
