class CustomDetails extends HTMLElement {
  connectedCallback() {
    const summaryText = this.getAttribute("summary") || "Details";
    const content = this.getAttribute("content");

    this.innerHTML = `
        <details>
          <summary class="custom-summary">${summaryText}</summary>
          <div class="custom-content">${content}</div>
        </details>
      `;

    const details = this.querySelector("details");
    const summary = this.querySelector(".custom-summary");

    details.addEventListener("toggle", () => {
      if (details.open) {
        summary.classList.add("rainbow");
        highlightCustomContent(this);
      } else {
        summary.classList.remove("rainbow");
      }
    });

    // 초기 상태에서 코드 하이라이팅 적용
    highlightCustomContent(this);
  }
}

// 코드 하이라이팅을 적용하는 함수
function highlightCustomContent(element) {
  // custom-code 변환 (pre, code 구조로 변경)
  element.querySelectorAll("custom-code").forEach((customCode) => {
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
  // Prism.highlightAll();
}

// 커스텀 엘리먼트 등록
customElements.define("custom-details", CustomDetails);
