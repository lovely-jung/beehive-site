/* ============================================================
   연락처 설정: 여기만 채우면 문의 페이지와 버튼에 자동 반영돼요.
   비워 두면 '준비 중'으로 표시됩니다.
   ============================================================ */
const CONTACT = {
  email: "",      // 예: "hello@beehive.kr"
  phone: "",      // 예: "010-1234-5678"
  kakao: "",      // 카카오톡 채널 주소, 예: "https://pf.kakao.com/_xxxx"
};

// 모바일 메뉴
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
if (menuBtn && links) {
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.innerHTML = open ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
  });
}

// 스크롤 등장 효과
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15 })
  : null;
document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

// 탭
document.querySelectorAll("[role=tablist]").forEach((list) => {
  const tabs = [...list.querySelectorAll("[role=tab]")];
  const select = (t) => {
    tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute("aria-selected", String(on));
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        select(n); n.focus();
      }
    });
  });
  const hash = location.hash.replace("#", "");
  const fromHash = tabs.find((t) => t.dataset.key === hash);
  if (fromHash) select(fromHash);
});

// 연락처 카드
const fill = (key, href, text) => {
  document.querySelectorAll(`[data-contact="${key}"]`).forEach((card) => {
    const span = card.querySelector("span");
    if (!CONTACT[key]) { card.classList.add("pending"); span.textContent = "준비 중이에요"; return; }
    span.textContent = text;
    if (card.tagName === "A") card.href = href;
  });
};
fill("email", `mailto:${CONTACT.email}`, CONTACT.email);
fill("phone", `tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`, CONTACT.phone);
fill("kakao", CONTACT.kakao, "카카오톡 채널로 상담하기");

// 문의 폼: 메일 앱으로 내용을 옮겨 보내요
const form = document.querySelector("#inquiry");
if (form) {
  const note = form.querySelector(".form-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((input) => {
      const field = input.closest(".field");
      const bad = !input.value.trim();
      field.classList.toggle("invalid", bad);
      if (bad && ok) { input.focus(); ok = false; }
    });
    if (!ok) return;
    const d = Object.fromEntries(new FormData(form));
    if (!CONTACT.email) {
      note.textContent = "온라인 문의 연결을 준비하고 있어요. 조금만 기다려 주세요.";
      note.classList.add("show");
      return;
    }
    const body = [
      `이름: ${d.name}`, `소속/상호: ${d.org || "-"}`, `연락처: ${d.tel}`,
      `문의 분야: ${d.topic}`, `희망 시기: ${d.when || "-"}`, "", d.message,
    ].join("\n");
    location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`[비하이브 문의] ${d.topic} - ${d.name}`)}&body=${encodeURIComponent(body)}`;
    note.textContent = "메일 앱이 열렸어요. 내용을 확인하고 보내기를 눌러 주세요.";
    note.classList.add("show");
  });
  form.querySelectorAll("input, textarea, select").forEach((el) =>
    el.addEventListener("input", () => el.closest(".field")?.classList.remove("invalid"))
  );
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
