---
title: ""
permalink: /portfolio/
layout: single
classes: wide
author_profile: false
comments: false
published: true
---

<div class="pf">

  <!-- ============ HERO ============ -->
  <header class="pf-hero">
    <p class="pf-eyebrow">PORTFOLIO</p>
    <h1 class="pf-hero__name">신희태</h1>
    <p class="pf-hero__role">Frontend / App Developer</p>
    <p class="pf-hero__desc">
      <!-- TODO: 한 줄 소개 -->
      즐기는 개발자가 되고 싶은 신희태입니다. 긍정의 힘을 믿으며, 배려와 협업으로 함께 성장합니다.
    </p>
    <div class="pf-actions">
      <a class="pf-btn" href="https://github.com/sht3756" target="_blank" rel="noopener">GitHub →</a>
      <a class="pf-btn pf-btn--ghost" href="mailto:shin103502.pref@gmail.com">Contact</a>
    </div>
  </header>

  <hr class="pf-rule" />

  <!-- ============ ABOUT ============ -->
  <section class="pf-section">
    <div class="pf-section__head">
      <span class="pf-num">01</span>
      <h2 class="pf-section__title">About</h2>
    </div>
    <div class="pf-section__body">
      <p class="pf-lead">
        <!-- TODO: 자기소개 -->
        3년 이상 SI 에이전시와 스타트업에서 웹·앱 서비스를 개발하며 기획부터 런칭까지 전 과정을 경험했습니다.
        사용자 경험을 고민하고, 더 나은 구조를 위해 끊임없이 리팩토링하는 개발자입니다.
      </p>
    </div>
  </section>

  <!-- ============ SKILLS ============ -->
  <section class="pf-section">
    <div class="pf-section__head">
      <span class="pf-num">02</span>
      <h2 class="pf-section__title">Skills</h2>
    </div>
    <div class="pf-section__body">
      <div class="pf-skills">
        <div class="pf-skill-group">
          <h3>Frontend</h3>
          <p>React · TypeScript · JavaScript (ES6+)<br />Redux · Context API · MobX</p>
        </div>
        <div class="pf-skill-group">
          <h3>Mobile</h3>
          <p>Flutter · Dart<br />Provider · Bloc · GetX · MVVM</p>
        </div>
        <div class="pf-skill-group">
          <h3>Backend / Etc</h3>
          <p>Node.js · Express · Firebase<br />Vue.js · Git · GitHub</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CAREER ============ -->
  <section class="pf-section">
    <div class="pf-section__head">
      <span class="pf-num">03</span>
      <h2 class="pf-section__title">Career</h2>
    </div>
    <div class="pf-section__body">
      <ul class="pf-career">
        <li>
          <span class="pf-career__period">2025.03 — 2025.09</span> 
          <div>
            <h3>뉴하이퍼</h3>
            <p>아이돌 굿즈 엔터 앱 · 고다지 축구 앱 (앱 런칭 오픈 멤버)</p>
          </div>
        </li>
        <li>
          <span class="pf-career__period">2023.05 — 2024.07</span>
          <div>
            <h3>에이드리븐</h3>
            <p>AI 기반 리워드 앱 런칭 (앱 런칭 오픈 멤버)</p>
          </div>
        </li>
        <li>
          <span class="pf-career__period">2021.09 — 2022.09</span>
          <div>
            <h3>프래프</h3>
            <p>웹 신규 서비스 개발</p>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <!-- ============ PROJECTS ============ -->
  <section class="pf-section">
    <div class="pf-section__head">
      <span class="pf-num">04</span>
      <h2 class="pf-section__title">Projects</h2>
    </div>
    <div class="pf-section__body">
      <div class="pf-grid">

        <!-- TODO: 카드 복제해서 추가/수정. .pf-card__detail 안에 상세 내용을 넣으면 모달에 표시됩니다. -->
        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog">
          <div class="pf-card__thumb">
            <img src="https://raw.githubusercontent.com/sht3756/sht3756.github.io/main/assets/images/project1.jpg" alt="나라면" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">나라면</h3>
            <p class="pf-card__summary">하루 1분 간편 응모 리워드 앱. 기획·개발·리팩토링 70% 이상 기여.</p>
            <div class="pf-tags"><span>Flutter</span><span>Firebase</span><span>Bloc</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>매일 1분 투자로 뷰티·가전·명품·패션 등 다양한 경품에 응모하고 선물을 받아가는 리워드 앱입니다. 개인정보 보호법 강화로 유저 정보를 함부로 추적·이용할 수 없게 된 환경에서, 유저가 개인정보 취득과 제어의 권한을 직접 가질 수 있도록 돕습니다.</p>
            <h4>기술 스택</h4>
            <ul>
              <li>Dart · Firebase (유저단)</li>
              <li>Vue.js · Node · Express (관리자단)</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(70% 이상)</em></h4>
            <ul>
              <li>기획 · 개발 · 리팩토링 전반 참여</li>
              <li>GetX → Bloc 마이그레이션 및 프로젝트 구조 개선</li>
              <li>드래그 응모 선택 기능, FCM 푸시 기획·개발</li>
              <li>홈 · 나라면 · 당첨 결과 UI/기능 개발 (리스트·더보기·응모·댓글·알림)</li>
              <li>관리자단: 유저 푸시(토큰/주제/즉시/예약), 구독 관리, 홈 배너 관리</li>
            </ul>
            <div class="pf-dialog__links">
              <a href="https://naramyeon.com/#firstSection" target="_blank" rel="noopener">소개 페이지 →</a>
              <a href="https://apps.apple.com/kr/app/id6444550618" target="_blank" rel="noopener">App Store →</a>
              <a href="https://play.google.com/store/apps/details?id=com.adriven.naramyeon" target="_blank" rel="noopener">Google Play →</a>
            </div>
          </template>
        </article>

        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog">
          <div class="pf-card__thumb">
            <img src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project2.jpeg?raw=true" alt="국룰" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">국룰 (KRule)</h3>
            <p class="pf-card__summary">제철 음식·특산품 추천 산지직송 플랫폼 앱. API 연동 중심 20% 기여.</p>
            <div class="pf-tags"><span>React</span><span>TypeScript</span><span>MobX</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>제철 음식과 지역별 특산품 추천, 라이브 쇼핑, 레시피 제공, 선물하기 서비스를 제공하는 산지직송 플랫폼 앱입니다. (현재 미오픈)</p>
            <h4>기술 스택</h4>
            <ul>
              <li>React · TypeScript (유저단)</li>
              <li>MobX (상태 관리)</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(20%)</em></h4>
            <ul>
              <li>퇴사 직전 합류, 빠른 API 연동 위주로 진행</li>
              <li>레시피 글 등록 기능</li>
              <li>리스트 출력 (장보기·제철음식·전국 특산품·라이브 쇼핑·레시피·선물 상품관)</li>
              <li>무한 스크롤 페이지네이션 (Intersection Observer)</li>
            </ul>
          </template>
        </article>

        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog">
          <div class="pf-card__thumb">
            <img src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project3.png?raw=true" alt="메르카도" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">메르카도 (Mercado)</h3>
            <p class="pf-card__summary">레시피·재료 배송 커뮤니티. 90% 이상 기여, 결제·인증·배송 추적 구현.</p>
            <div class="pf-tags"><span>React</span><span>ReactQuery</span><span>OAuth</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>요리 관련 레시피를 제공하고 재료 배송 서비스를 다루는 커뮤니티 페이지입니다.</p>
            <h4>기술 스택</h4>
            <ul>
              <li>React (유저단)</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(90% 이상)</em></h4>
            <ul>
              <li>이메일 · 소셜 로그인 (카카오톡 · 네이버 · 애플)</li>
              <li>NHN 웹/앱 결제 API 연동</li>
              <li>휴대폰 인증 (CoolSMS)</li>
              <li>CRUD 적용 (리스트 출력 · 삭제 · 수정), 임시저장 기능</li>
              <li>다음 우체국 API 적용 및 배송 위치 추적</li>
              <li>페이지네이션 (React Query)</li>
            </ul>
          </template>
        </article>

        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog">
          <div class="pf-card__thumb">
            <img src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project4.png?raw=true" alt="워프" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">워프 (Warp)</h3>
            <p class="pf-card__summary">음원 마스터링 홈페이지. 다국어·드래그 업로드·다운로드 기능 구현.</p>
            <div class="pf-tags"><span>React</span><span>Context API</span><span>i18n</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>음원 마스터링 홈페이지입니다. 원하는 음원을 첨부해 믹싱하거나 리듬을 변경할 수 있습니다.</p>
            <h4>기술 스택</h4>
            <ul>
              <li>React (유저단)</li>
              <li>Context API (상태 관리)</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(20%)</em></h4>
            <ul>
              <li>다국어 서비스 적용 (데이터 연동 및 스타일)</li>
              <li>Drag &amp; Drop 파일 업로드 (용량 제한 200MB)</li>
              <li>파일 포맷 후 다운로드 기능</li>
            </ul>
            <div class="pf-dialog__links">
              <a href="https://www.warpmastering.com/kr/main" target="_blank" rel="noopener">워프 링크 →</a>
            </div>
          </template>
        </article>

        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog">
          <div class="pf-card__thumb">
            <img src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project5.png?raw=true" alt="펫트워크" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">펫트워크 (PetWork)</h3>
            <p class="pf-card__summary">반려동물 정보 공유 커뮤니티. 100% 기여, 소셜 로그인·CRUD·검색 구현.</p>
            <div class="pf-tags"><span>React</span><span>Redux</span><span>NLP</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>반려동물 관련 정보를 공유하는 커뮤니티 사이트입니다. 용품 정보, 브랜드 정보를 제공하고 유저들끼리 자유롭게 정보를 주고받을 수 있습니다.</p>
            <h4>기술 스택</h4>
            <ul>
              <li>React (유저단)</li>
              <li>Redux · Context API (상태 관리)</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(100%)</em></h4>
            <ul>
              <li>소셜 로그인 적용 (카카오 · 네이버 · 애플)</li>
              <li>CRUD 기능 구현</li>
              <li>리스트 · 댓글 페이지네이션</li>
              <li>추천 · 관련 검색어 기능 (구글 자연어 NLP)</li>
              <li>카카오 공유 · 최근 검색어 기능</li>
            </ul>
            <div class="pf-dialog__links">
              <a href="https://petwork.kr/" target="_blank" rel="noopener">바로가기 →</a>
            </div>
          </template>
        </article>

      </div>
    </div>

  </section>

  <!-- ============ PERSONAL PROJECTS ============ -->
  <section class="pf-section">
    <div class="pf-section__head">
      <span class="pf-num">05</span>
      <h2 class="pf-section__title">개인 프로젝트</h2>
    </div>
    <div class="pf-section__body">
      <div class="pf-grid">

        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog"
          data-images="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project9.png?raw=true|https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project9-1.png?raw=true">
          <div class="pf-card__thumb">
            <img src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project9.png?raw=true" alt="CRM 프로젝트" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">CRM 프로젝트</h3>
            <p class="pf-card__summary">영업 조직용 통합 CRM 웹앱. 고객·내방·콜백·마감·공지·프로모션 관리 구현.</p>
            <div class="pf-tags"><span>Flutter</span><span>Supabase</span><span>BLoC</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>영업 조직(영업직 · 부팀장 · 본부장 · 관리자)이 사용하는 통합 CRM 웹 애플리케이션입니다. 고객 DB 관리부터 내방 일정, 콜백, 일일 마감, 공지·프로모션까지 영업 업무 전반을 한곳에서 처리하도록 설계했습니다. 역할 기반 권한으로 영업직은 본인 담당 고객만, 관리자는 전체를 관리합니다.</p>
            <h4>기술 스택</h4>
            <ul>
              <li>Flutter (반응형 웹 · 접이식 사이드바)</li>
              <li>Supabase (Auth · PostgreSQL · Storage, RLS 권한 정책)</li>
              <li>flutter_bloc (Cubit / BLoC 상태 관리)</li>
              <li>go_router (라우팅 · 인증 가드)</li>
              <li>table_calendar · flutter_quill (캘린더 · 리치 텍스트 에디터)</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(100% · 개인)</em></h4>
            <ul>
              <li>역할 기반 인증·권한 (영업직 · 관리자 · 개발자, 승인제 가입, Supabase RLS)</li>
              <li>고객 관리: 리스트·상세, 영업 상태(미컨택→컨택→가입→유입→입금), DB 배정·인계, 검색·페이지네이션</li>
              <li>내방 관리: 내방 일정·지원 인력(부팀장/본부장) 선택, 이력 자동 기록</li>
              <li>콜백: 통화 예약 시간 선택, 당일 알림(완료·취소·연장)</li>
              <li>캘린더: 일정 CRUD, 내방 일정 가져오기, 색상·레인 표시</li>
              <li>일일 마감 / 관리자 마감 집계</li>
              <li>메모: 폴더 분류·중요도, Quill 리치 텍스트 작성</li>
              <li>공지사항: 작성·좋아요·커버 이미지 업로드·대시보드 핀 고정</li>
              <li>프로모션: 등록·달성자 관리, 대시보드 위젯 통합</li>
            </ul>
            <h4>데모 계정 <em>(복사 후 로그인)</em></h4>
            <div class='pf-cred'>
              <div class='pf-cred__row'>
                <span class='pf-cred__label'>ID</span>
                <code>gmlxo1514@naver.com</code>
                <button type='button' class='pf-cred__copy' data-copy='gmlxo1514@naver.com'>복사</button>
              </div>
              <div class='pf-cred__row'>
                <span class='pf-cred__label'>PW</span>
                <code>123456</code>
                <button type='button' class='pf-cred__copy' data-copy='123456'>복사</button>
              </div>
            </div>
            <div class='pf-dialog__links'>
              <a href='https://custom-sonamoo-crm.vercel.app/#/login' target='_blank' rel='noopener'>CRM 바로가기 →</a>
            </div>
          </template>
        </article>

      </div>
    </div>

  </section>

  <!-- ============ PROJECT DIALOG ============ -->
  <dialog class="pf-dialog" aria-labelledby="pf-dialog-title">
    <button class="pf-dialog__close" type="button" aria-label="닫기">✕</button>
    <div class="pf-dialog__scroll">
      <div class="pf-dialog__media">
        <div class="pf-dialog__gallery"></div>
        <button class="pf-dialog__nav pf-dialog__nav--prev" type="button" aria-label="이전 사진" hidden>‹</button>
        <button class="pf-dialog__nav pf-dialog__nav--next" type="button" aria-label="다음 사진" hidden>›</button>
        <span class="pf-dialog__counter" hidden></span>
      </div>
      <div class="pf-dialog__content">
        <div class="pf-dialog__tags"></div>
        <h3 id="pf-dialog-title"></h3>
        <div class="pf-dialog__detail"></div>
      </div>
    </div>
  </dialog>

  <hr class="pf-rule" />

  <!-- ============ CONTACT ============ -->
  <section class="pf-contact">
    <h2>Let's work together.</h2>
    <p>함께 일하고 싶으시다면 언제든 연락 주세요.</p>
    <div class="pf-actions">
      <a class="pf-btn" href="mailto:shin103502.pref@gmail.com">shin103502.pref@gmail.com</a>
      <a class="pf-btn pf-btn--ghost" href="https://github.com/sht3756" target="_blank" rel="noopener">github.com/sht3756</a>
    </div>
  </section>

</div>

<style>
/* 이 페이지에서만 상단 네비게이션(masthead) 숨김 */
.masthead { display: none; }

/* ===== Portfolio — Light Minimal / Monochrome ===== */
.pf {
  --ink: #0a0a0a;
  --ink-2: #404040;
  --muted: #8a8a8a;
  --line: #e7e7e7;
  --bg-soft: #fafafa;
  --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Apple SD Gothic Neo", "Malgun Gothic", monospace;
  font-family: var(--mono);
  color: var(--ink);
  line-height: 1.65;
  max-width: 980px;
  margin: 0 auto;
  letter-spacing: -0.01em;
}
/* 페이지 내 모든 요소가 동일한 폰트를 상속 */
.pf, .pf h1, .pf h2, .pf h3, .pf h4, .pf p, .pf span,
.pf a, .pf li, .pf button, .pf div { font-family: var(--mono); }
.pf * { box-sizing: border-box; }
.pf p { margin: 0; }

/* HERO */
.pf-hero { padding: 64px 0 48px; }
.pf-eyebrow {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--muted);
  margin: 0 0 22px !important;
}
.pf-hero__name {
  font-size: clamp(56px, 11vw, 104px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin: 0 0 18px;
  color: var(--ink);
}
.pf-hero__role {
  font-size: 18px;
  font-weight: 600;
  color: var(--ink-2);
  margin: 0 0 18px !important;
}
.pf-hero__desc {
  font-size: 17px;
  color: var(--muted);
  max-width: 540px;
  margin: 0 0 32px !important;
}
.pf-actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* BUTTONS */
.pf-btn {
  display: inline-block;
  padding: 13px 26px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff !important;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none !important;
  border: 1.5px solid var(--ink);
  transition: opacity .2s ease, transform .2s ease, background .2s ease, color .2s ease;
}
.pf-btn:hover { transform: translateY(-2px); opacity: 0.85; }
.pf-btn--ghost {
  background: transparent;
  color: var(--ink) !important;
  border: 1.5px solid var(--line);
}
.pf-btn--ghost:hover { border-color: var(--ink); opacity: 1; }

/* RULE */
.pf-rule { border: 0; border-top: 1px solid var(--line); margin: 8px 0 56px; }

/* SECTION — two column (label | content) */
.pf-section { margin-bottom: 72px; }
.pf-section__head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 28px;
}
.pf-num {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
}
.pf-section__title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}
.pf-lead { font-size: 19px; color: var(--ink-2); max-width: 720px; line-height: 1.7; }

/* SKILLS */
.pf-skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
}
.pf-skill-group { background: #fff; padding: 26px 28px; }
.pf-skill-group h3 {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin: 0 0 12px;
  text-transform: uppercase;
}
.pf-skill-group p { font-size: 15px; color: var(--ink-2); line-height: 1.9; }

/* CAREER */
.pf-career { list-style: none; padding: 0; margin: 0; }
.pf-career li {
  display: flex;
  gap: 28px;
  padding: 22px 0;
  border-top: 1px solid var(--line);
}
.pf-career li:last-child { border-bottom: 1px solid var(--line); }
.pf-career__period {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
  min-width: 150px;
  padding-top: 3px;
  flex-shrink: 0;
}
.pf-career h3 { margin: 0 0 4px; font-size: 18px; font-weight: 700; }
.pf-career p { color: var(--muted); font-size: 15px; }

/* PROJECTS */
.pf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
.pf-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.pf-card:hover {
  transform: translateY(-5px);
  border-color: #d4d4d4;
  box-shadow: 0 18px 40px rgba(0,0,0,.08);
}
.pf-card__thumb { aspect-ratio: 16 / 10; overflow: hidden; background: var(--bg-soft); }
.pf-card__thumb img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  filter: grayscale(100%);
  transition: filter .35s ease, transform .35s ease;
}
.pf-card:hover .pf-card__thumb img { filter: grayscale(0%); transform: scale(1.03); }
.pf-card__body { padding: 22px 24px; display: flex; flex-direction: column; flex: 1; }
.pf-card__title { margin: 0 0 8px; font-size: 18px; font-weight: 700; }
.pf-card__summary { margin: 0 0 16px; color: var(--muted); font-size: 14px; flex: 1; line-height: 1.6; }
.pf-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.pf-tags span {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 3px 9px;
}
.pf-card__links { display: flex; gap: 18px; }
.pf-card__links a {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink) !important;
  text-decoration: none !important;
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 1px;
}
.pf-card__links a:hover { opacity: 0.6; }
.pf-card--empty {
  border: 1.5px dashed #d4d4d4;
  background: var(--bg-soft);
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 200px;
}
.pf-card--empty .pf-card__summary { flex: none; }
.pf-card[role="button"] { cursor: pointer; }
.pf-card[role="button"]:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.pf-card__more {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.02em;
  transition: gap .2s ease, opacity .2s ease;
}
.pf-card:hover .pf-card__more { opacity: 0.55; }

/* DIALOG / MODAL */
.pf-dialog {
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100vh - 64px);
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  color: var(--ink);
  box-shadow: 0 30px 80px rgba(0,0,0,.25);
  /* 이미지(고정) + 내용(스크롤) 세로 분할 */
  display: flex;
  flex-direction: column;
}
.pf-dialog:not([open]) { display: none; }
/* 다이얼로그 열렸을 때 배경 스크롤 잠금 (전역) */
body.pf-modal-open { overflow: hidden; }
.pf-dialog::backdrop { background: rgba(10,10,10,.55); backdrop-filter: blur(3px); }
.pf-dialog[open] { animation: pf-pop .22s ease both; }
@keyframes pf-pop { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }
.pf-dialog__close {
  position: absolute;
  top: 14px; right: 14px;
  width: 36px; height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(4px);
  color: var(--ink);
  font-size: 15px;
  cursor: pointer;
  z-index: 2;
  transition: background .2s ease, transform .2s ease;
}
.pf-dialog__close:hover { background: #fff; transform: rotate(90deg); }
/* 이미지 + 내용이 함께 스크롤되는 영역 */
.pf-dialog__scroll { overflow-y: auto; flex: 1; min-height: 0; -webkit-overflow-scrolling: touch; }
/* 이미지 갤러리: 여러 장이면 가로 스크롤(스냅) + 현재 장수 카운터 */
.pf-dialog__media { position: relative; background: var(--bg-soft); line-height: 0; }
.pf-dialog__gallery {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.pf-dialog__gallery::-webkit-scrollbar { display: none; }
.pf-dialog__gallery img {
  flex: 0 0 100%;
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  scroll-snap-align: center;
  display: block;
}
.pf-dialog__counter {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: rgba(10, 10, 10, 0.7);
  padding: 3px 10px;
  border-radius: 999px;
  line-height: 1.4;
}
.pf-dialog__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
  transition: background 0.2s ease, opacity 0.2s ease;
  z-index: 2;
}
.pf-dialog__nav:hover { background: #fff; }
.pf-dialog__nav--prev { left: 12px; }
.pf-dialog__nav--next { right: 12px; }
.pf-dialog__nav:disabled { opacity: 0.3; cursor: default; }
.pf-dialog__content { padding: 28px 32px 34px; }
.pf-dialog__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.pf-dialog__tags span {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 3px 9px;
}
.pf-dialog__content h3 {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 18px;
}
.pf-dialog__detail h4 {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin: 18px 0 7px;
}
.pf-dialog__detail h4:first-child { margin-top: 0; }
.pf-dialog__detail h4 em { font-style: normal; color: var(--ink); }
.pf-dialog__detail p { font-size: 15px; color: var(--ink-2); line-height: 1.55; margin: 0; }
.pf-dialog__detail ul { margin: 0; padding-left: 18px; }
.pf-dialog__detail li { font-size: 15px; color: var(--ink-2); line-height: 1.55; margin-bottom: 4px; }
/* 한글 가독성: 양쪽정렬·줄늘어짐 방지, 단어 단위 줄바꿈 */
.pf-dialog__detail { text-align: left; word-break: keep-all; word-spacing: -0.05em; }
.pf-dialog__links { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 24px; }
.pf-dialog__links a {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink) !important;
  text-decoration: none !important;
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 1px;
}
.pf-dialog__links a:hover { opacity: 0.6; }

/* DEMO CREDENTIALS */
.pf-cred { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
.pf-cred__row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 8px 10px 8px 12px;
}
.pf-cred__label {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  width: 28px;
  flex-shrink: 0;
}
.pf-cred__row code {
  flex: 1;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--ink);
  background: none;
  padding: 0;
  word-break: break-all;
}
.pf-cred__copy {
  flex-shrink: 0;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: var(--ink);
  border: 1px solid var(--ink);
  border-radius: 7px;
  padding: 5px 12px;
  cursor: pointer;
  transition: opacity .2s ease;
}
.pf-cred__copy:hover { opacity: 0.8; }
.pf-cred__copy.copied { background: #16a34a; border-color: #16a34a; }

/* CONTACT */
.pf-contact { padding: 16px 0 72px; }
.pf-contact h2 {
  font-size: clamp(34px, 7vw, 56px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 12px;
}
.pf-contact p { color: var(--muted); font-size: 17px; margin-bottom: 28px !important; }

/* RESPONSIVE */
@media (max-width: 640px) {
  .pf-hero { padding: 40px 0 36px; }
  .pf-career li { flex-direction: column; gap: 6px; }
  .pf-career__period { min-width: 0; }
  .pf-dialog__content { padding: 22px 22px 28px; }
}
</style>

<script>
(function () {
  var dialog = document.querySelector(".pf-dialog");
  if (!dialog) return;

  var dGallery = dialog.querySelector(".pf-dialog__gallery");
  var dCounter = dialog.querySelector(".pf-dialog__counter");
  var dPrev = dialog.querySelector(".pf-dialog__nav--prev");
  var dNext = dialog.querySelector(".pf-dialog__nav--next");
  var dTags = dialog.querySelector(".pf-dialog__tags");
  var dTitle = dialog.querySelector(".pf-dialog__title, #pf-dialog-title");
  var dDetail = dialog.querySelector(".pf-dialog__detail");
  var closeBtn = dialog.querySelector(".pf-dialog__close");

  function currentIndex() {
    return Math.round(dGallery.scrollLeft / dGallery.clientWidth);
  }

  // 현재 보고 있는 이미지 번호 표시 + 화살표 활성/비활성 갱신
  function updateCounter() {
    var n = dGallery.children.length;
    if (n <= 1) return;
    var idx = Math.max(0, Math.min(currentIndex(), n - 1));
    dCounter.textContent = idx + 1 + " / " + n;
    dPrev.disabled = idx <= 0;
    dNext.disabled = idx >= n - 1;
  }
  dGallery.addEventListener("scroll", updateCounter);

  function scrollToImage(idx) {
    dGallery.scrollTo({ left: idx * dGallery.clientWidth, behavior: "smooth" });
  }
  dPrev.addEventListener("click", function () { scrollToImage(currentIndex() - 1); });
  dNext.addEventListener("click", function () { scrollToImage(currentIndex() + 1); });

  // 카드 이미지 목록 구성: data-images(파이프 구분)가 있으면 여러 장, 없으면 썸네일 1장
  function imagesOf(card) {
    var data = card.getAttribute("data-images");
    if (data) {
      var list = data.split("|").map(function (s) { return s.trim(); }).filter(Boolean);
      if (list.length) return list;
    }
    var thumb = card.querySelector(".pf-card__thumb img");
    return thumb ? [thumb.getAttribute("src")] : [];
  }

  function openCard(card) {
    var title = card.querySelector(".pf-card__title");
    var tags = card.querySelector(".pf-tags");
    var detail = card.querySelector(".pf-card__detail");
    var altText = title ? title.textContent : "";

    var srcs = imagesOf(card);
    dGallery.innerHTML = "";
    srcs.forEach(function (src) {
      var im = document.createElement("img");
      im.src = src;
      im.alt = altText;
      im.loading = "lazy";
      dGallery.appendChild(im);
    });
    dGallery.scrollLeft = 0;
    var multi = srcs.length > 1;
    dCounter.hidden = !multi;
    dPrev.hidden = !multi;
    dNext.hidden = !multi;
    if (multi) {
      dCounter.textContent = "1 / " + srcs.length;
      dPrev.disabled = true;
      dNext.disabled = false;
    }

    dTitle.textContent = altText;
    dTags.innerHTML = tags ? tags.innerHTML : "";
    dDetail.innerHTML = detail ? detail.innerHTML : "";

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("pf-modal-open"); // 배경 스크롤 잠금
    dialog.querySelector(".pf-dialog__content").scrollTop = 0;
  }

  function closeDialog() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("pf-modal-open");
  }

  // ESC 등 다른 경로로 닫힐 때도 스크롤 잠금 해제
  dialog.addEventListener("close", function () {
    document.body.classList.remove("pf-modal-open");
  });

  document.querySelectorAll('.pf-card[role="button"]').forEach(function (card) {
    card.addEventListener("click", function () { openCard(card); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCard(card);
      }
    });
  });

  closeBtn.addEventListener("click", closeDialog);
  // 백드롭(다이얼로그 바깥) 클릭 시 닫기
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) closeDialog();
  });

  // 데모 계정 복사 버튼 (다이얼로그 내용은 매번 새로 그려지므로 위임 처리)
  dialog.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".pf-cred__copy");
    if (!btn) return;
    var text = btn.getAttribute("data-copy") || "";
    var done = function () {
      var original = btn.textContent;
      btn.textContent = "복사됨";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      // 구형 브라우저 폴백
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(ta);
      done();
    }
  });
})();
</script>
