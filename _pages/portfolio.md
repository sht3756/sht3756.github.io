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
        2년 이상 SI 에이전시와 스타트업에서 웹·앱 서비스를 개발하며 기획부터 런칭까지 전 과정을 경험했습니다.
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

        <article class="pf-card" tabindex="0" role="button" aria-haspopup="dialog">
          <div class="pf-card__thumb">
            <img src="https://github.com/sht3756/sht3756.github.io/blob/main/assets/images/project6.png?raw=true" alt="하쿠나마타타" />
          </div>
          <div class="pf-card__body">
            <h3 class="pf-card__title">하쿠나마타타</h3>
            <p class="pf-card__summary">익명 고민 상담 커뮤니티 앱. MVVM 패턴 적용, 소셜 로그인 구현.</p>
            <div class="pf-tags"><span>Flutter</span><span>Provider</span><span>Firebase</span></div>
            <span class="pf-card__more">자세히 보기 →</span>
          </div>
          <template class="pf-card__detail">
            <h4>프로젝트 소개</h4>
            <p>고민을 이야기하고 위로를 전하는 익명 고민 상담 커뮤니티 앱입니다. 고민님이 글을 작성하면 위로님이 따듯한 말을 전할 수 있고, 위로의 말은 작성자인 고민님만 확인할 수 있습니다.</p>
            <h4>기술 스택</h4>
            <ul>
              <li>Dart (유저단)</li>
              <li>Provider (상태 관리) · MVVM 패턴</li>
            </ul>
            <h4>기여도 · 주요 작업 <em>(50%)</em></h4>
            <ul>
              <li>Firebase 소셜 로그인 (구글 · 애플)</li>
              <li>고민글 · 위로글 CRUD</li>
              <li>명언 · 배경 리스트 조회, 내가 쓴/받은 글 조회</li>
              <li>고민글 · 위로글 페이지네이션</li>
              <li>고민글 검색 · 태그 필터</li>
            </ul>
            <div class="pf-dialog__links">
              <a href="https://apps.apple.com/kr/app/id6446880691" target="_blank" rel="noopener">App Store →</a>
            </div>
          </template>
        </article>

        <article class="pf-card pf-card--empty">
          <div class="pf-card__body">
            <h3 class="pf-card__title">새 프로젝트</h3>
            <p class="pf-card__summary">여기에 프로젝트 내용을 채워주세요.</p>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ============ PROJECT DIALOG ============ -->
  <dialog class="pf-dialog" aria-labelledby="pf-dialog-title">
    <button class="pf-dialog__close" type="button" aria-label="닫기">✕</button>
    <div class="pf-dialog__scroll">
      <div class="pf-dialog__media"><img alt="" /></div>
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
/* 이미지는 자연 크기로 크게 표시 (세로 긴 사진도 잘 보이게), 영역을 넘으면 함께 스크롤 */
.pf-dialog__media { background: var(--bg-soft); text-align: center; line-height: 0; }
.pf-dialog__media img {
  max-width: 100%;
  max-height: 60vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: inline-block;
  vertical-align: top;
}
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

  var dImg = dialog.querySelector(".pf-dialog__media img");
  var dTags = dialog.querySelector(".pf-dialog__tags");
  var dTitle = dialog.querySelector(".pf-dialog__title, #pf-dialog-title");
  var dDetail = dialog.querySelector(".pf-dialog__detail");
  var closeBtn = dialog.querySelector(".pf-dialog__close");

  function openCard(card) {
    var img = card.querySelector(".pf-card__thumb img");
    var title = card.querySelector(".pf-card__title");
    var tags = card.querySelector(".pf-tags");
    var detail = card.querySelector(".pf-card__detail");

    dImg.src = img ? img.getAttribute("src") : "";
    dImg.alt = title ? title.textContent : "";
    dTitle.textContent = title ? title.textContent : "";
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
})();
</script>
