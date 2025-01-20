// 필요한 리소스 파일 리스트
const resources = [
  { type: "css", url: "/customs/details/details.css" },
  { type: "js", url: "/customs/details/details.js" },
  { type: "css", url: "/customs/copy/copy.css" },
  { type: "js", url: "/customs/copy/copy.js" },
];

// 리소스 파일을 동적으로 로드
resources.forEach((resource) => {
  if (resource.type === "css") {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = resource.url;
    document.head.appendChild(link);
  } else if (resource.type === "js") {
    const script = document.createElement("script");
    script.src = resource.url;
    script.defer = true; // 비동기 로드
    document.body.appendChild(script);
  }
});
