// Prism.js 스타일 동적 로드
const prismCSS = document.createElement("link");
prismCSS.rel = "stylesheet";
prismCSS.href =
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
document.head.appendChild(prismCSS);

// Prism.js 라이브러리 동적 로드
const prismScript = document.createElement("script");
prismScript.src =
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
prismScript.defer = true;
document.body.appendChild(prismScript);

// Prism.js에서 사용할 언어 목록
const languages = [
  "dart",
  "javascript",
  "typescript",
  "cpp",
  "swift",
  "c",
  "java",
  "csharp",
  "kotlin",
  "bash",
];

// 언어 파일을 로드하는 함수
function loadLanguageFiles() {
  let loadedLanguages = 0;

  languages.forEach((lang) => {
    const script = document.createElement("script");
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
    script.defer = true;
    script.onload = () => {
      loadedLanguages++;
      // console.log(`✅ Prism.js 언어 로드 완료: ${lang}`);

      // 모든 언어 파일이 로드된 후에 코드 하이라이팅 적용
      if (loadedLanguages === languages.length) {
        console.log("✨ 모든 Prism.js 언어 파일 로드 완료");
        highlightAllCodes();
      }
    };
    script.onerror = () => console.error(`❌ Prism.js 언어 로드 실패: ${lang}`);
    document.body.appendChild(script);
  });
}

// MutationObserver 설정
let observer = new MutationObserver((mutationsList) => {
  if (typeof Prism === "undefined") {
    console.warn(
      "⏳ Prism.js가 아직 로드되지 않음. MutationObserver 대기 중..."
    );
    return;
  }

  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      highlightAllCodes();
    }
  }
});

// MutationObserver 감시 시작 (Prism 로드 후 실행)
function startObserver() {
  observer.observe(document.body, { childList: true, subtree: true });
  // console.log("🔍 MutationObserver 시작");
}

// <custom-code> 태그를 <pre><code>로 변환하여 Prism 적용
function highlightAllCodes() {
  // console.log("✨ Prism.js 하이라이팅 적용 시작");

  // MutationObserver 일시 중지
  observer.disconnect();

  document.querySelectorAll("custom-code").forEach((customCode) => {
    const language = customCode.classList[0] || "text";

    // 기존 내용을 <pre><code> 구조로 변경
    const preBlock = document.createElement("pre");
    const codeBlock = document.createElement("code");

    preBlock.appendChild(codeBlock);
    codeBlock.className = `language-${language}`;
    codeBlock.textContent = customCode.textContent.trim();

    // 기존 <custom-code> 태그를 <pre><code>로 교체
    customCode.replaceWith(preBlock);
  });

  // Prism.js 하이라이트 적용
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  } else {
    console.error("❌ Prism.js가 정의되지 않음. highlightAllCodes 실행 중단.");
  }

  // MutationObserver 다시 활성화
  startObserver();
}

// Prism.js 로드 후 실행
prismScript.onload = () => {
  // console.log("✅ Prism.js 로드 완료, 언어 파일 로드 시작");
  loadLanguageFiles();
  startObserver();
};

// 페이지 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
  console.log("📌 DOM 로드 완료, Prism.js 로드 대기...");
});
