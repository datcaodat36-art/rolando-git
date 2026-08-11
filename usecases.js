// =======================================
// 💡 AI USE CASES — "Bạn muốn làm gì với AI?"
// Gợi ý AI phù hợp theo nhu cầu, đọc trực tiếp từ database sống của trang
// (aiTools) nên luôn khớp với dữ liệu Admin/Firebase hiện tại, không cần
// một file dữ liệu riêng phải đồng bộ tay.
// =======================================
(function () {
  "use strict";

  // Danh sách nhu cầu gợi ý nhanh (chip). "category" phải khớp với
  // data-category của sidebar (chat | image | video | code | finance | study).
  // "filterKeywords" (tuỳ chọn, không dấu) dùng để lọc sâu hơn trong 1 category.
  const USE_CASES = [
    { id: "video", icon: "🎬", labelKey: "usecases_case_video", category: "video" },
    { id: "code", icon: "💻", labelKey: "usecases_case_code", category: "code" },
    { id: "english", icon: "🗣️", labelKey: "usecases_case_english", category: "study",
      filterKeywords: ["tieng anh", "english", "phat am", "pronun", "ngu phap", "grammar", "elsa", "duolingo"] },
    { id: "image", icon: "🎨", labelKey: "usecases_case_image", category: "image" },
    { id: "chat", icon: "💬", labelKey: "usecases_case_chat", category: "chat" },
    { id: "write", icon: "✍️", labelKey: "usecases_case_write", category: "chat",
      filterKeywords: ["viet", "content", "copy", "marketing", "seo", "writ", "quang cao"] },
    { id: "finance", icon: "📊", labelKey: "usecases_case_finance", category: "finance" },
    { id: "study", icon: "📚", labelKey: "usecases_case_study", category: "study" },
    { id: "voice", icon: "🎙️", labelKey: "usecases_case_voice", category: "study",
      filterKeywords: ["giong noi", "voice", "elevenlabs", "podcast", "thuyet minh", "long tieng", "doc truyen"] },
    { id: "design", icon: "🖼️", labelKey: "usecases_case_design", category: "image",
      filterKeywords: ["thiet ke", "design", "canva", "figma", "chinh sua", "xoa nen", "remove bg", "logo", "poster"] }
  ];

  // Từ khoá (không dấu) để dò nhu cầu từ ô nhập tự do -> khớp với id ở trên.
  const KEYWORDS = {
    video: ["video", "phim", "dung phim", "quay phim", "clip", "cat video", "lam video"],
    code: ["code", "lap trinh", "website", "trang web", "ung dung", "app", "phan mem", "developer", "programming", "lam web", "code website"],
    english: ["tieng anh", "ngoai ngu", "english", "phat am", "ngu phap", "tu vung tieng anh"],
    image: ["anh", "hinh anh", "ve tranh", "tao anh", "image", "photo", "ve anh"],
    chat: ["chat", "tro chuyen", "hoi dap", "tro ly", "assistant", "noi chuyen"],
    write: ["viet", "content", "bai viet", "marketing", "quang cao", "copywriting", "seo", "viet lach"],
    finance: ["tai chinh", "dau tu", "chung khoan", "ngan sach", "stock", "invest", "finance"],
    study: ["hoc", "nghien cuu", "bai tap", "on thi", "luan van", "research", "hoc tap"],
    voice: ["giong noi", "voice", "podcast", "thuyet minh", "long tieng", "doc truyen"],
    design: ["thiet ke", "design", "logo", "canva", "figma", "chinh sua anh", "xoa nen", "poster"]
  };

  let els = {};
  let bound = false;

  // Phòng vệ: một phần dữ liệu cũ trong data.js được nạp dạng mảng-tuple
  // thay vì object (additionalAiTools / moreAiTools bị push thẳng không
  // chuẩn hoá) — bỏ qua các mục đó để tính năng này không vỡ (giống quiz.js).
  function validTools() {
    return ((typeof aiTools !== "undefined" && aiTools) || []).filter(
      t => t && typeof t === "object" && !Array.isArray(t) && typeof t.name === "string"
    );
  }

  function normalizeText(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .trim();
  }

  function cacheEls() {
    els = {
      input: document.getElementById("usecasesInput"),
      searchBtn: document.getElementById("usecasesSearchBtn"),
      chips: document.getElementById("usecasesChips"),
      result: document.getElementById("usecasesResult"),
      resultTitle: document.getElementById("usecasesResultTitle"),
      resultGrid: document.getElementById("usecasesResultGrid"),
      viewAllBtn: document.getElementById("usecasesViewAllBtn")
    };
  }

  function renderChips() {
    if (!els.chips) return;
    els.chips.innerHTML = USE_CASES.map(uc => `
      <button type="button" class="usecases-chip" data-usecase-id="${uc.id}">
        <span>${uc.icon}</span> ${t(uc.labelKey)}
      </button>
    `).join("");

    els.chips.querySelectorAll(".usecases-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const uc = USE_CASES.find(u => u.id === btn.dataset.usecaseId);
        if (!uc) return;
        els.input.value = t(uc.labelKey).replace(/^\S+\s/, ""); // bỏ icon ở đầu, giữ lại câu chữ
        showResult(uc);
      });
    });
  }

  // Tìm nhu cầu khớp nhất từ chuỗi tự do, dựa trên số từ khoá trùng khớp.
  function matchUseCase(rawInput) {
    const input = normalizeText(rawInput);
    if (!input) return null;

    let bestId = null;
    let bestScore = 0;
    Object.entries(KEYWORDS).forEach(([id, keywords]) => {
      const score = keywords.reduce((acc, kw) => acc + (input.includes(kw) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestId = id;
      }
    });

    if (!bestId) return null;
    return USE_CASES.find(u => u.id === bestId) || null;
  }

  function toolsForUseCase(uc) {
    const pool = validTools().filter(tool => tool.category === uc.category);
    if (!uc.filterKeywords || uc.filterKeywords.length === 0) {
      return pool.sort((a, b) => b.rating - a.rating).slice(0, 4);
    }
    const narrowed = pool.filter(tool => {
      const haystack = normalizeText(
        tool.name + " " + localizedText(tool.description) + " " + (tool.description ? (tool.description.vi || "") + " " + (tool.description.en || "") : "")
      );
      return uc.filterKeywords.some(kw => haystack.includes(kw));
    });
    const finalPool = narrowed.length > 0 ? narrowed : pool;
    return finalPool.sort((a, b) => b.rating - a.rating).slice(0, 4);
  }

  function toolCardHtml(tool) {
    const badgeLabel = {
      free: t("badge_free"),
      pro: t("badge_pro"),
      hot: t("badge_hot")
    };
    return `
      <div class="tool-card usecases-tool-card">
        <span class="badge ${tool.badge}">${badgeLabel[tool.badge] || ""}</span>
        <div class="tool-image">
          <img class="tool-logo" data-fallback-icon="${tool.icon}"
               src="${officialLogoUrl(tool.link)}"
               alt="Logo ${tool.name}">
        </div>
        <div class="tool-content">
          <h3>${tool.name}</h3>
          <div class="rating">⭐ <span>${tool.rating.toFixed(1)}/5</span></div>
          <p>${localizedText(tool.description)}</p>
          <div class="tool-buttons">
            <a class="btn btn-free" href="${tool.link}" target="_blank" rel="noopener">${t("quiz_visit_btn")}</a>
          </div>
        </div>
      </div>
    `;
  }

  function showResult(uc) {
    if (!els.result) return;
    els.result.classList.remove("hidden");

    if (!uc) {
      els.resultTitle.textContent = t("usecases_no_match");
      els.resultGrid.innerHTML = `
        <button type="button" class="usecases-btn-ghost usecases-try-quiz-btn" id="usecasesTryQuizBtn">${t("usecases_try_quiz")}</button>
      `;
      const quizBtn = document.getElementById("usecasesTryQuizBtn");
      if (quizBtn) {
        quizBtn.addEventListener("click", () => {
          document.getElementById("quizToggle").click();
        });
      }
      els.viewAllBtn.classList.add("hidden");
      els.result.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const tools = toolsForUseCase(uc);
    els.resultTitle.textContent = t("usecases_result_title");
    els.resultGrid.innerHTML = tools.length > 0
      ? tools.map(toolCardHtml).join("")
      : `<div class="empty">${t("empty_search")}</div>`;

    els.resultGrid.querySelectorAll(".tool-logo").forEach(img => {
      img.addEventListener("error", () => {
        const span = document.createElement("span");
        span.style.fontSize = "48px";
        span.textContent = img.dataset.fallbackIcon;
        img.replaceWith(span);
      }, { once: true });
    });

    els.viewAllBtn.classList.remove("hidden");
    els.viewAllBtn.onclick = () => goToToolsCategory(uc.category);

    els.result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Nhảy sang mục "Công cụ AI" đã lọc sẵn theo category, tái dùng các biến
  // và hàm toàn cục của script.js (cùng phạm vi global classic-script).
  function goToToolsCategory(category) {
    specialFilter = null;
    currentCategory = category;
    searchInput.value = "";
    clearSidebarActive();
    const li = document.querySelector(`.sidebar li[data-category="${category}"]`);
    if (li) li.classList.add("active");
    renderTools();
    showSection("tools");
    closeMobileMenus();
  }

  function handleSearch() {
    const uc = matchUseCase(els.input.value);
    showResult(uc);
  }

  function bindEvents() {
    if (bound) return;
    bound = true;

    els.searchBtn.addEventListener("click", handleSearch);
    els.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  function onShow() {
    cacheEls();
    renderChips();
    bindEvents();
  }

  function onLangChange() {
    if (!els.chips) return;
    renderChips();
    if (els.result && !els.result.classList.contains("hidden")) {
      const uc = matchUseCase(els.input.value) || USE_CASES.find(u => u.id === "chat");
      showResult(uc);
    }
  }

  window.AIUseCases = { onShow, onLangChange };
})();
