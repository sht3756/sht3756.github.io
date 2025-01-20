// 무단 복제를 막기 위한 코드 예 : 드래그 및 오른쪽 클릭
// 모달 관련 HTML 주입
document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div id="modal-overlay" class="modal-overlay"></div>
  <div id="ascii-modal" class="ascii-modal">
    <div id="ascii-content"></div>
    <button id="close-modal" class="close-modal">X</button>
  </div>
`
);

// 아스키 코드 (하나의 문자열)
const asciiArt = `
　 ∧_∧　！
　(´  ωﾟ')   드래그와, 마우스 우클릭은
＿(_つ/￣￣￣/＿   막아놓을게!
　 ＼/　　　/
　　　￣￣￣
`;

// 모달 및 백그라운드 요소
const modalOverlay = document.getElementById("modal-overlay");
const asciiModal = document.getElementById("ascii-modal");
const closeModal = document.getElementById("close-modal");
const asciiContent = document.getElementById("ascii-content");

// 오른쪽 클릭 비활성화 상태 관리
let isRightClickDisabled = false;

// 스크롤 바 너비 계산 함수
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

// 오른쪽 클릭 이벤트 비활성화 및 모달 표시
document.addEventListener("contextmenu", (e) => {
  if (isRightClickDisabled) {
    e.preventDefault();
    return;
  }

  e.preventDefault();

  // 아스키 코드 업데이트
  asciiContent.textContent = asciiArt;

  // 스크롤 바 너비를 계산
  const scrollbarWidth = getScrollbarWidth();

  // body에 패딩 추가
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  // 모달 및 오버레이 활성화
  modalOverlay.classList.add("active");
  asciiModal.classList.add("active");

  // 백그라운드 스크롤 비활성화
  document.body.classList.add("no-scroll");

  // 오른쪽 클릭 비활성화
  isRightClickDisabled = true;
});

// 닫기 버튼 클릭 이벤트
closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  asciiModal.classList.remove("active");

  // 패딩 복원
  document.body.style.paddingRight = "";

  // 백그라운드 스크롤 활성화
  document.body.classList.remove("no-scroll");

  // 오른쪽 클릭 활성화
  isRightClickDisabled = false;
});

// 모달 닫기 (배경 클릭 시)
modalOverlay.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  asciiModal.classList.remove("active");

  // 패딩 복원
  document.body.style.paddingRight = "";

  // 백그라운드 스크롤 활성화
  document.body.classList.remove("no-scroll");

  // 오른쪽 클릭 활성화
  isRightClickDisabled = false;
});

// 드래그 방지
document.addEventListener("selectstart", (e) => e.preventDefault());
