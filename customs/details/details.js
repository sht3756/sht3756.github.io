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
      } else {
        summary.classList.remove("rainbow");
      }
    });
  }
}

customElements.define("custom-details", CustomDetails);
