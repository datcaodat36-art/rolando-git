// =======================================
// 📚 PROMPT LIBRARY
// Tìm, xem, copy và lưu (favorite) các prompt hữu ích cho từng mục đích
// sử dụng AI. Theo đúng kiến trúc các module khác của site (usecases.js,
// quiz.js, battle.js): 1 IIFE, expose window.AIPrompts = { onShow, onLangChange },
// showSection()/closeMobileMenus()/t()/localizedText()/firebaseDb đều là các
// hàm/biến toàn cục có sẵn từ script.js (được nạp trước file này).
//
// Dữ liệu: promptLibrary (khai báo sẵn ở prompts-data.js) được nạp từ
// data/prompts.json khi trang tải, sau đó Firebase Realtime Database
// ("prompts") sẽ đồng bộ/ghi đè nếu Admin đã từng lưu (giống hệt cơ chế
// "tools"/"categories" trong script.js).
//
// Số liệu (lượt copy) CHỈ đếm cục bộ trên trình duyệt người dùng — không có
// số ảo/số nền — cùng triết lý với "lượt xem" của AI Directory (xem
// VIEWS_STORAGE_KEY trong script.js).
// =======================================
(function () {
  "use strict";

  const CATEGORIES = [
    "coding", "writing", "marketing", "image", "video",
    "study", "business", "productivity", "research", "other"
  ];

  const FAVORITES_KEY = "favoritePrompts";
  const COPY_COUNTS_KEY = "promptCopyCounts";
  // Prompt do người dùng tự tạo (nút "✨ Create Prompt"): lưu HOÀN TOÀN cục bộ
  // trong trình duyệt, KHÔNG bao giờ được đẩy vào promptLibrary (mảng dùng
  // chung/đồng bộ Firebase) hay gửi lên server — vì vậy dùng 1 localStorage
  // key riêng biệt, tách bạch khỏi FAVORITES_KEY/COPY_COUNTS_KEY ở trên.
  const USER_PROMPTS_KEY = "userCreatedPrompts";
  const PREVIEW_LENGTH = 160;
  // Số prompt tối đa hiển thị mỗi khối (Trending/Newest) trong khối xem
  // trước trên Trang chủ (#homePromptsPreview). Khai báo NGAY Ở ĐÂY (đầu
  // file) — không phải gần renderHomePreview() bên dưới — vì loadDefaultPrompts()
  // chạy sớm (ngay khi script parse) và gọi rerenderCurrentView() ->
  // renderHomePreview() đồng bộ; nếu hằng số này khai báo bằng "const" ở
  // phía dưới file, nó vẫn đang ở "temporal dead zone" tại thời điểm đó và
  // sẽ ném ReferenceError, làm crash toàn bộ IIFE.
  const HOME_PREVIEW_LIMIT = 3;

  let favorites = new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"));
  let copyCounts = JSON.parse(localStorage.getItem(COPY_COUNTS_KEY) || "{}");
  let userPrompts = JSON.parse(localStorage.getItem(USER_PROMPTS_KEY) || "[]");

  // Trạng thái bộ lọc / tìm kiếm hiện tại
  let state = {
    search: "",
    category: "all",
    ai: "all",
    sort: "newest",   // "newest" | "popular" | "featured"
    mode: "browse",   // "browse" | "favorites"
  };

  let els = {};
  let bound = false;
  let dataLoaded = false;
  let currentDetailSlug = null;
  // Slug đang được SỬA trong modal "✨ Create/Edit Prompt" — null nghĩa là
  // modal đang ở chế độ TẠO MỚI. Chỉ áp dụng cho prompt cá nhân
  // (userPrompts), không bao giờ trỏ tới prompt mặc định.
  let editingSlug = null;

  // ---------- TIỆN ÍCH ----------
  function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  }

  function saveCopyCounts() {
    localStorage.setItem(COPY_COUNTS_KEY, JSON.stringify(copyCounts));
  }

  function saveUserPrompts() {
    localStorage.setItem(USER_PROMPTS_KEY, JSON.stringify(userPrompts));
  }

  function getCopyCount(id) {
    return copyCounts[id] || 0;
  }

  function normalizeText(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function escapeHtml(str) {
    return (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function validPrompts() {
    return (Array.isArray(promptLibrary) ? promptLibrary : []).filter(
      p => p && typeof p === "object" && p.slug && p.title
    );
  }

  // Prompt cá nhân (do người dùng tạo) — CHỈ tồn tại trong localStorage của
  // trình duyệt này, không thuộc promptLibrary/không đồng bộ Firebase, nên
  // sẽ không bao giờ xuất hiện trong Trending/Newest/Tất cả Prompt hay kết
  // quả tìm kiếm công khai — chỉ hiện ở khối "✨ Prompt Của Bạn" riêng.
  function validUserPrompts() {
    return (Array.isArray(userPrompts) ? userPrompts : []).filter(
      p => p && typeof p === "object" && p.slug && p.title
    );
  }

  // Tìm theo slug ở CẢ thư viện công khai lẫn prompt cá nhân, để Copy/Yêu
  // thích/Xem chi tiết dùng chung được 1 hàm cho mọi loại prompt.
  function findBySlug(slug) {
    return validPrompts().find(p => p.slug === slug) ||
      validUserPrompts().find(p => p.slug === slug) ||
      null;
  }

  function catLabel(cat) {
    return t("prompts_category_" + cat) || cat;
  }

  // ---------- LIÊN KẾT NỘI BỘ: AI Directory ----------
  // Nếu tên AI được gợi ý (vd "Claude") khớp (không phân biệt hoa/thường)
  // với 1 công cụ có thật trong aiTools (data.js), hiển thị dạng link mở
  // đúng công cụ đó trong AI Directory. Nếu không tồn tại, chỉ hiện dạng
  // chip thường (KHÔNG tạo link giả) — đúng yêu cầu #11.
  function findAiToolByName(name) {
    if (typeof aiTools === "undefined" || !Array.isArray(aiTools)) return null;
    const n = normalizeText(name);
    // Khớp chính xác trước (vd "Claude" === "Claude")
    let match = aiTools.find(tool => normalizeText(tool.name) === n);
    if (match) return match;
    // Rồi khớp gần đúng cho các biến thể tên thật (vd prompt ghi "Gemini"
    // nhưng AI Directory lưu "Google Gemini"; "DALL-E" vs "DALL·E 3") —
    // vẫn chỉ link nếu công cụ THẬT SỰ tồn tại trong database, không đoán mò.
    match = aiTools.find(tool => {
      const tn = normalizeText(tool.name).replace(/[·.\-]/g, " ").replace(/\s+/g, " ").trim();
      const nn = n.replace(/[·.\-]/g, " ").replace(/\s+/g, " ").trim();
      return tn.includes(nn) || nn.includes(tn);
    });
    return match || null;
  }

  function aiChipHtml(name) {
    const tool = findAiToolByName(name);
    if (!tool) return `<span class="prompt-ai-chip">${escapeHtml(name)}</span>`;
    return `<button type="button" class="prompt-ai-chip prompt-ai-chip-link" data-ai-tool-id="${tool.id}" title="${t("prompts_view_ai_tool") || "View AI"}">${escapeHtml(name)} →</button>`;
  }

  function tagChipHtml(tag) {
    return `<span class="prompt-tag-chip">#${escapeHtml(tag)}</span>`;
  }

  function bindAiChipEvents(container) {
    container.querySelectorAll(".prompt-ai-chip-link").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = Number(btn.dataset.aiToolId);
        if (typeof showSection === "function") showSection("tools");
        if (typeof closeMobileMenus === "function") closeMobileMenus();
        if (typeof openToolDetailModal === "function") {
          setTimeout(() => openToolDetailModal(id), 150);
        }
      });
    });
  }

  // ---------- NẠP DỮ LIỆU ----------
  function loadDefaultPrompts() {
    // Ưu tiên dùng DEFAULT_PROMPTS (nhúng sẵn trong data/prompts-default.js,
    // nạp qua thẻ <script> bình thường) NGAY LẬP TỨC — không cần chờ mạng
    // hay fetch. Điều này giúp Prompt Library luôn có dữ liệu kể cả khi
    // trang được mở trực tiếp bằng file:// (bấm đúp index.html sau khi giải
    // nén ZIP/RAR), vì fetch() bị trình duyệt chặn trong trường hợp đó.
    if (promptLibrary.length === 0 && typeof DEFAULT_PROMPTS !== "undefined" && Array.isArray(DEFAULT_PROMPTS)) {
      DEFAULT_PROMPTS.forEach(p => promptLibrary.push(p));
      dataLoaded = true;
      rerenderCurrentView();
    }

    // Vẫn thử fetch data/prompts.json khi chạy qua HTTP(S) (Vercel/Netlify/
    // localhost) — chỉ để dùng bản mới nhất nếu file JSON được cập nhật mà
    // quên đồng bộ lại data/prompts-default.js. Nếu fetch lỗi (vd chạy qua
    // file://), bỏ qua trong im lặng vì đã có DEFAULT_PROMPTS ở trên rồi.
    fetch("/data/prompts.json")
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(list => {
        // Chỉ dùng làm mặc định nếu Firebase chưa từng nạp gì vào mảng
        // (tránh việc fetch xong sau lại ghi đè dữ liệu Admin đã đồng bộ).
        if (promptLibrary.length === 0 && Array.isArray(list)) {
          list.forEach(p => promptLibrary.push(p));
          dataLoaded = true;
          rerenderCurrentView();
        }
      })
      .catch(() => {
        // Bỏ qua trong im lặng: đây chỉ là bản dự phòng/đồng bộ qua mạng,
        // DEFAULT_PROMPTS ở trên đã đảm bảo có dữ liệu để dùng ngay.
      })
      .finally(() => {
        dataLoaded = true;
        rerenderCurrentView();
      });
  }

  function applyPromptsFromFirebase(promptsObj) {
    const arr = promptsObj ? Object.values(promptsObj) : [];
    if (arr.length === 0) return; // Firebase "prompts" trống -> giữ dữ liệu mặc định từ JSON
    promptLibrary.length = 0;
    arr.forEach(p => promptLibrary.push(p));
    dataLoaded = true;
    rerenderCurrentView();
    if (window.adminUIHandler && typeof window.adminUIHandler.renderPromptsList === "function") {
      window.adminUIHandler.renderPromptsList();
      window.adminUIHandler.loadEditPromptSelect();
    }
  }

  // Gọi ngay khi script parse (không đợi người dùng bấm vào mục Prompt
  // Library), để Trending/Newest và Admin có dữ liệu sẵn sàng sớm nhất.
  loadDefaultPrompts();

  if (typeof firebaseDb !== "undefined" && firebaseDb) {
    firebaseDb.ref("prompts").on("value", (snapshot) => {
      applyPromptsFromFirebase(snapshot.val());
    });
  }

  // ---------- DOM ----------
  function cacheEls() {
    els = {
      section: document.getElementById("prompts-section"),
      searchInput: document.getElementById("promptsSearchInput"),
      searchClear: document.getElementById("promptsSearchClear"),
      categoryFilter: document.getElementById("promptsCategoryFilter"),
      aiFilter: document.getElementById("promptsAiFilter"),
      sortNewestBtn: document.getElementById("promptsSortNewestBtn"),
      sortPopularBtn: document.getElementById("promptsSortPopularBtn"),
      sortFeaturedBtn: document.getElementById("promptsSortFeaturedBtn"),
      clearFiltersBtn: document.getElementById("promptsClearFiltersBtn"),
      myPromptsBtn: document.getElementById("promptsMyPromptsBtn"),
      createBtn: document.getElementById("promptsCreateBtn"),
      userWrap: document.getElementById("promptsUserWrap"),
      userGrid: document.getElementById("promptsUserGrid"),
      trendingWrap: document.getElementById("promptsTrendingWrap"),
      trendingGrid: document.getElementById("promptsTrendingGrid"),
      newestWrap: document.getElementById("promptsNewestWrap"),
      newestGrid: document.getElementById("promptsNewestGrid"),
      resultsTitle: document.getElementById("promptsResultsTitle"),
      resultsGrid: document.getElementById("promptsResultsGrid"),
      gridView: document.getElementById("promptsGridView"),
      detailView: document.getElementById("promptsDetailView"),
      detailBack: document.getElementById("promptsDetailBack"),
      detailBody: document.getElementById("promptsDetailBody"),
      relatedGrid: document.getElementById("promptsRelatedGrid"),
    };
  }

  // ---------- RENDER: BỘ LỌC ----------
  function renderFilterOptions() {
    if (els.categoryFilter) {
      const current = els.categoryFilter.value || "all";
      els.categoryFilter.innerHTML =
        `<option value="all">${t("prompts_filter_all")}</option>` +
        CATEGORIES.map(c => `<option value="${c}">${catLabel(c)}</option>`).join("");
      els.categoryFilter.value = CATEGORIES.includes(current) ? current : "all";
    }
    if (els.aiFilter) {
      const current = els.aiFilter.value || "all";
      const aiSet = new Set();
      validPrompts().forEach(p => (p.ai || []).forEach(a => aiSet.add(a)));
      const aiList = [...aiSet].sort((a, b) => a.localeCompare(b));
      els.aiFilter.innerHTML =
        `<option value="all">${t("prompts_filter_all")}</option>` +
        aiList.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("");
      els.aiFilter.value = aiList.includes(current) ? current : "all";
    }
  }

  // ---------- LỌC / SẮP XẾP ----------
  function getFilteredPrompts() {
    let list = validPrompts();

    if (state.mode === "favorites") {
      list = list.filter(p => favorites.has(p.id));
    }

    if (state.category !== "all") {
      list = list.filter(p => p.category === state.category);
    }
    if (state.ai !== "all") {
      list = list.filter(p => (p.ai || []).includes(state.ai));
    }

    // "Featured" là 1 kiểu lọc (chỉ giữ prompt được đánh dấu featured:true
    // trong data/prompts.json), khác với "Mới nhất"/"Phổ biến" chỉ SẮP XẾP
    // lại chứ không loại bỏ prompt nào.
    if (state.sort === "featured") {
      list = list.filter(p => !!p.featured);
    }

    const q = normalizeText(state.search);
    if (q) {
      // Tách từ khóa thành từng "token" và yêu cầu TẤT CẢ đều xuất hiện
      // (không cần liền nhau) — để tìm "chat gpt" vẫn khớp "ChatGPT" (viết
      // liền, không dấu cách) và không phụ thuộc thứ tự từ người dùng gõ.
      const tokens = q.split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const haystack = normalizeText(
          [p.title, p.description, p.prompt, catLabel(p.category), (p.ai || []).join(" "), (p.tags || []).join(" ")].join(" ")
        );
        return tokens.every(tok => haystack.includes(tok));
      });
    }

    list = [...list].sort((a, b) => {
      if (state.sort === "popular") {
        const featuredDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        if (featuredDiff !== 0) return featuredDiff;
        const usageDiff = getCopyCount(b.id) - getCopyCount(a.id);
        if (usageDiff !== 0) return usageDiff;
      }
      // "featured" đã được LỌC ở trên; trong nhóm đó vẫn ưu tiên hiển thị
      // theo lượt dùng nhiều trước, rồi tới mới nhất.
      if (state.sort === "featured") {
        const usageDiff = getCopyCount(b.id) - getCopyCount(a.id);
        if (usageDiff !== 0) return usageDiff;
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return list;
  }

  function isFiltering() {
    return !!state.search || state.category !== "all" || state.ai !== "all" ||
      state.mode === "favorites" || state.sort === "featured";
  }

  // ---------- CARD HTML ----------
  function cardHtml(p) {
    const isFav = favorites.has(p.id);
    const usage = getCopyCount(p.id);
    const preview = (p.prompt || "").length > PREVIEW_LENGTH
      ? p.prompt.slice(0, PREVIEW_LENGTH).trim() + "…"
      : (p.prompt || "");

    return `
      <div class="prompt-card ${p.isUserCreated ? "prompt-card-personal" : ""}" data-slug="${escapeHtml(p.slug)}">
        <div class="prompt-card-top">
          <span class="prompt-badge-category">${catLabel(p.category)}</span>
          ${p.featured ? `<span class="prompt-badge-trending" title="Trending">🔥</span>` : ""}
          ${p.isUserCreated ? `<span class="prompt-badge-personal" title="${t("prompts_create_subtitle")}">✨ ${t("prompts_personal_badge")}</span>` : ""}
        </div>
        <h3 class="prompt-card-title">${escapeHtml(p.title)}</h3>
        <p class="prompt-card-desc">${escapeHtml(p.description || "")}</p>
        <div class="prompt-card-ai">
          ${(p.ai || []).map(a => `<span class="prompt-ai-chip">${escapeHtml(a)}</span>`).join("")}
        </div>
        <pre class="prompt-card-preview">${escapeHtml(preview)}</pre>
        ${usage > 0 ? `<div class="prompt-usage" data-usage-id="${p.id}">${t("prompts_usage_count").replace("{n}", usage)}</div>` : `<div class="prompt-usage hidden" data-usage-id="${p.id}"></div>`}
        <div class="prompt-card-actions">
          <button type="button" class="prompt-copy-btn" data-copy-slug="${escapeHtml(p.slug)}">${t("prompts_copy_btn")}</button>
          <button type="button" class="prompt-fav-btn ${isFav ? "active" : ""}" data-fav-slug="${escapeHtml(p.slug)}" aria-pressed="${isFav}">
            ${isFav ? "💖" : "🤍"} <span>${isFav ? t("prompts_favorite_added") : t("prompts_favorite_add")}</span>
          </button>
          ${p.isUserCreated ? `<button type="button" class="prompt-edit-btn" data-edit-slug="${escapeHtml(p.slug)}" title="${t("prompts_edit_btn")}" aria-label="${t("prompts_edit_btn")}">✏️</button>` : ""}
          ${p.isUserCreated ? `<button type="button" class="prompt-delete-btn" data-delete-slug="${escapeHtml(p.slug)}" title="${t("prompts_delete_btn")}" aria-label="${t("prompts_delete_btn")}">🗑️</button>` : ""}
        </div>
      </div>
    `;
  }

  function renderGridInto(container, list, emptyMsg) {
    if (!container) return;
    if (!dataLoaded) {
      container.innerHTML = `<div class="prompts-empty">${t("prompts_loading")}</div>`;
      return;
    }
    if (list.length === 0) {
      container.innerHTML = `<div class="prompts-empty">${emptyMsg || t("prompts_not_found")}</div>`;
      return;
    }
    container.innerHTML = list.map(cardHtml).join("");
    bindCardEvents(container);
  }

  function bindCardEvents(container) {
    container.querySelectorAll(".prompt-copy-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleCopy(btn.dataset.copySlug, btn);
      });
    });
    container.querySelectorAll(".prompt-fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.favSlug);
      });
    });
    container.querySelectorAll(".prompt-edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openEditPromptModal(btn.dataset.editSlug);
      });
    });
    container.querySelectorAll(".prompt-delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteUserPrompt(btn.dataset.deleteSlug);
      });
    });
    container.querySelectorAll(".prompt-card").forEach(card => {
      card.addEventListener("click", () => openDetail(card.dataset.slug));
    });
    bindAiChipEvents(container);
  }

  // ---------- COPY ----------
  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback cho trình duyệt cũ / môi trường không hỗ trợ Clipboard API
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  function handleCopy(slug, triggerEl) {
    const p = findBySlug(slug);
    if (!p) return;

    copyTextToClipboard(p.prompt || "").then(() => {
      copyCounts[p.id] = (copyCounts[p.id] || 0) + 1;
      saveCopyCounts();
      showToast(t("prompts_copied_toast"));

      if (window.trackEvent) {
        window.trackEvent("prompt_copy", {
          prompt_name: p.title,
          prompt_slug: p.slug,
          category: p.category
        });
      }

      if (triggerEl) {
        // Đổi nhãn nút sang trạng thái "✓ Copied!" tạm thời, không reload trang.
        if (triggerEl._copyRevertTimer) {
          clearTimeout(triggerEl._copyRevertTimer);
        }
        if (triggerEl._copyOriginalHtml === undefined) {
          triggerEl._copyOriginalHtml = triggerEl.innerHTML;
        }
        triggerEl.innerHTML = t("prompts_copied_btn");
        triggerEl.classList.add("copied-pulse", "is-copied");
        triggerEl._copyRevertTimer = setTimeout(() => {
          triggerEl.innerHTML = triggerEl._copyOriginalHtml;
          triggerEl.classList.remove("copied-pulse", "is-copied");
          triggerEl._copyRevertTimer = null;
        }, 2000);
      }

      // Cập nhật số lượt dùng hiển thị trên (các) card đang hiện, không cần
      // vẽ lại toàn bộ lưới.
      document.querySelectorAll(`[data-usage-id="${p.id}"]`).forEach(el => {
        el.textContent = t("prompts_usage_count").replace("{n}", getCopyCount(p.id));
        el.classList.remove("hidden");
      });
    }).catch(() => {
      showToast(t("prompts_copied_toast") + " ⚠️");
    });
  }

  // ---------- FAVORITES ----------
  function toggleFavorite(slug) {
    const p = findBySlug(slug);
    if (!p) return;
    const nowSaved = !favorites.has(p.id);
    if (favorites.has(p.id)) {
      favorites.delete(p.id);
    } else {
      favorites.add(p.id);
    }
    saveFavorites();

    if (window.trackEvent) {
      window.trackEvent("prompt_save", {
        prompt_name: p.title,
        prompt_slug: p.slug,
        category: p.category,
        action: nowSaved ? "add" : "remove"
      });
    }

    rerenderCurrentView();
    if (currentDetailSlug === slug) renderDetail(slug);
  }

  // ---------- PROMPT CỦA BẠN: XÓA ----------
  function deleteUserPrompt(slug) {
    const p = userPrompts.find(x => x.slug === slug);
    if (!p) return;
    if (!window.confirm(t("prompts_delete_confirm"))) return;

    userPrompts = userPrompts.filter(x => x.slug !== slug);
    saveUserPrompts();
    // Dọn dẹp: nếu prompt này đang được yêu thích, bỏ luôn khỏi favorites
    // để không để lại id "mồ côi" không còn prompt nào tương ứng.
    if (favorites.has(p.id)) {
      favorites.delete(p.id);
      saveFavorites();
    }
    showToast(t("prompts_deleted_toast"));

    if (currentDetailSlug === slug) {
      showGrid();
    } else {
      rerenderCurrentView();
    }
  }

  // ---------- ✨ CREATE PROMPT (form thủ công, KHÔNG dùng AI API) ----------
  // Toàn bộ luồng này chỉ đọc/ghi vào biến `userPrompts` + localStorage
  // (USER_PROMPTS_KEY) — không gọi API AI nào, không ghi vào `promptLibrary`,
  // không ghi lên Firebase ("prompts") -> prompt cá nhân không bao giờ lộ
  // ra thư viện công khai hay cho người dùng khác thấy.
  function slugifyTitle(str) {
    const base = normalizeText(str).replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
    return base || "prompt";
  }

  function uniqueUserSlug(base) {
    let slug = base;
    let i = 2;
    while (findBySlug(slug)) {
      slug = `${base}-${i}`;
      i++;
    }
    return slug;
  }

  function splitCsv(str) {
    return (str || "").split(",").map(s => s.trim()).filter(Boolean);
  }

  function createModalMarkup(isEdit) {
    return `
      <div class="prompt-create-modal">
        <button type="button" class="prompt-create-close" aria-label="${t("modal_close") || "Close"}">✕</button>
        <h3 class="prompt-create-title">✨ ${isEdit ? t("prompts_edit_title") : t("prompts_create_title")}</h3>
        <p class="prompt-create-subtitle">${t("prompts_create_subtitle")}</p>
        <form id="promptCreateForm" class="prompt-create-form" novalidate>
          <label class="prompt-create-label">${t("prompts_create_field_title")}
            <input type="text" id="pcTitle" maxlength="120" required placeholder="${t("prompts_create_placeholder_title")}">
          </label>
          <label class="prompt-create-label">${t("prompts_create_field_desc")}
            <textarea id="pcDesc" rows="2" maxlength="240" placeholder="${t("prompts_create_placeholder_desc")}"></textarea>
          </label>
          <div class="prompt-create-row2">
            <label class="prompt-create-label">${t("prompts_create_field_category")}
              <select id="pcCategory">${CATEGORIES.map(c => `<option value="${c}">${catLabel(c)}</option>`).join("")}</select>
            </label>
            <label class="prompt-create-label">${t("prompts_create_field_ai")}
              <input type="text" id="pcAi" placeholder="${t("prompts_create_placeholder_ai")}">
            </label>
          </div>
          <label class="prompt-create-label">${t("prompts_create_field_tags")}
            <input type="text" id="pcTags" placeholder="${t("prompts_create_placeholder_tags")}">
          </label>
          <label class="prompt-create-label">${t("prompts_create_field_prompt")}
            <textarea id="pcPrompt" rows="7" required placeholder="${t("prompts_create_placeholder_prompt")}"></textarea>
          </label>
          <div class="prompt-create-actions">
            <button type="button" id="pcCancelBtn" class="prompts-clear-btn">${t("prompts_create_cancel")}</button>
            <button type="submit" class="prompt-copy-btn prompt-create-save-btn">${isEdit ? t("prompts_edit_save") : t("prompts_create_save")}</button>
          </div>
        </form>
      </div>
    `;
  }

  function ensureCreateModal(isEdit) {
    let overlay = document.getElementById("promptCreateOverlay");
    if (overlay) {
      // Đã tồn tại (vd đổi ngôn ngữ sau khi tạo trước đó) -> vẽ lại nội dung
      // để nhãn/placeholder luôn đúng ngôn ngữ hiện tại, đồng thời đảm bảo
      // đúng tiêu đề/nút Tạo mới hay Sửa.
      overlay.innerHTML = createModalMarkup(isEdit);
      bindCreateModalEvents(overlay);
      return overlay;
    }
    overlay = document.createElement("div");
    overlay.id = "promptCreateOverlay";
    overlay.className = "prompt-create-overlay tool-modal-overlay";
    overlay.innerHTML = createModalMarkup(isEdit);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCreatePromptModal();
    });
    bindCreateModalEvents(overlay);
    return overlay;
  }

  function bindCreateModalEvents(overlay) {
    overlay.querySelector(".prompt-create-close")?.addEventListener("click", closeCreatePromptModal);
    overlay.querySelector("#pcCancelBtn")?.addEventListener("click", closeCreatePromptModal);
    overlay.querySelector("#promptCreateForm")?.addEventListener("submit", handleCreatePromptSubmit);
  }

  function handleCreateModalEscape(e) {
    if (e.key === "Escape") closeCreatePromptModal();
  }

  function openCreatePromptModal() {
    editingSlug = null; // chế độ TẠO MỚI
    const overlay = ensureCreateModal(false);
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleCreateModalEscape);
    setTimeout(() => overlay.querySelector("#pcTitle")?.focus(), 60);
  }

  // ---------- PROMPT CỦA BẠN: SỬA (chỉ Created Prompts, KHÔNG áp dụng cho
  // prompt mặc định — nút Sửa chỉ tồn tại trên card có isUserCreated) ----------
  function openEditPromptModal(slug) {
    const p = userPrompts.find(x => x.slug === slug);
    if (!p) return;
    editingSlug = slug; // chế độ SỬA
    const overlay = ensureCreateModal(true);
    overlay.querySelector("#pcTitle").value = p.title || "";
    overlay.querySelector("#pcDesc").value = p.description || "";
    if (CATEGORIES.includes(p.category)) overlay.querySelector("#pcCategory").value = p.category;
    overlay.querySelector("#pcAi").value = (p.ai || []).join(", ");
    overlay.querySelector("#pcTags").value = (p.tags || []).join(", ");
    overlay.querySelector("#pcPrompt").value = p.prompt || "";
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleCreateModalEscape);
    setTimeout(() => overlay.querySelector("#pcTitle")?.focus(), 60);
  }

  function closeCreatePromptModal() {
    const overlay = document.getElementById("promptCreateOverlay");
    editingSlug = null;
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", handleCreateModalEscape);
    overlay.querySelector("#promptCreateForm")?.reset();
  }

  function handleCreatePromptSubmit(e) {
    e.preventDefault();
    const overlay = document.getElementById("promptCreateOverlay");
    if (!overlay) return;

    const title = overlay.querySelector("#pcTitle").value.trim();
    const description = overlay.querySelector("#pcDesc").value.trim();
    const categoryRaw = overlay.querySelector("#pcCategory").value;
    const aiRaw = overlay.querySelector("#pcAi").value;
    const tagsRaw = overlay.querySelector("#pcTags").value;
    const promptContent = overlay.querySelector("#pcPrompt").value.trim();

    if (!title || !promptContent) {
      showToast(t("prompts_create_validation"));
      return;
    }

    if (editingSlug) {
      // ---- CHẾ ĐỘ SỬA: cập nhật prompt cá nhân đã có tại chỗ, GIỮ NGUYÊN
      // id/slug/createdAt để không phá vỡ URL chi tiết (/prompts/<slug>)
      // hay trạng thái yêu thích (favorites lưu theo id) đã lưu trước đó.
      // Không đụng tới promptLibrary/Firebase -> Prompt mặc định không ảnh hưởng.
      const idx = userPrompts.findIndex(x => x.slug === editingSlug);
      if (idx === -1) {
        closeCreatePromptModal();
        return;
      }
      const editedSlug = editingSlug;
      userPrompts[idx] = {
        ...userPrompts[idx],
        title,
        description,
        category: CATEGORIES.includes(categoryRaw) ? categoryRaw : "other",
        ai: splitCsv(aiRaw),
        tags: splitCsv(tagsRaw),
        prompt: promptContent,
      };
      saveUserPrompts();
      closeCreatePromptModal();
      showToast(t("prompts_edit_success"));
      rerenderCurrentView();
      if (currentDetailSlug === editedSlug) renderDetail(editedSlug);
      return;
    }

    const baseSlug = slugifyTitle(title);
    const newPrompt = {
      id: "user-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      slug: uniqueUserSlug(baseSlug),
      title,
      description,
      category: CATEGORIES.includes(categoryRaw) ? categoryRaw : "other",
      ai: splitCsv(aiRaw),
      tags: splitCsv(tagsRaw),
      prompt: promptContent,
      createdAt: new Date().toISOString().slice(0, 10),
      featured: false,
      isUserCreated: true, // đánh dấu rõ: prompt cá nhân, không thuộc thư viện công khai
    };

    userPrompts.push(newPrompt);
    saveUserPrompts();
    closeCreatePromptModal();
    showToast(t("prompts_create_success"));

    if (window.trackEvent) {
      // Không gửi title/nội dung prompt (có thể chứa dữ liệu riêng tư của
      // người dùng) — chỉ gửi category để biết xu hướng loại prompt được tạo.
      window.trackEvent("prompt_create", {
        category: newPrompt.category
      });
    }

    rerenderCurrentView();
  }

  // ---------- TOAST ----------
  let toastTimer = null;
  function showToast(msg) {
    let toast = document.querySelector(".prompts-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "prompts-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  // ---------- RENDER: TRENDING / NEWEST / MAIN GRID ----------
  function renderTrending() {
    if (!els.trendingWrap) return;
    const list = validPrompts().filter(p => p.featured).slice(0, 6);
    const show = list.length > 0 && !isFiltering();
    els.trendingWrap.classList.toggle("hidden", !show);
    if (show) renderGridInto(els.trendingGrid, list);
  }

  function renderNewest() {
    if (!els.newestWrap) return;
    const list = [...validPrompts()]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6);
    const show = list.length > 0 && !isFiltering();
    els.newestWrap.classList.toggle("hidden", !show);
    if (show) renderGridInto(els.newestGrid, list);
  }

  // ---------- 🏠 KẾT NỐI VỚI TRANG CHỦ (#homePromptsPreview trong #tool-section) ----------
  // Khối rút gọn hiển thị "Trending Prompts" + "New Prompts" NGAY trên Trang
  // chủ, dùng CHUNG dữ liệu thật (promptLibrary) và CHUNG cardHtml() với
  // trang Prompt Library đầy đủ — không có số liệu/prompt giả nào ở đây.
  // (HOME_PREVIEW_LIMIT được khai báo ở đầu file, xem giải thích ở đó.)

  // Điều hướng dùng chung cho: bấm 1 card ở Trang chủ (mở đúng prompt đó)
  // và bấm nút "View All Prompts" (mở lưới đầy đủ). Luôn hiện đúng khu vực
  // Prompt Library trước (showSection) rồi mới cacheEls()/render bên trong
  // onShow() — vì lúc đứng ở Trang chủ, prompts-section vẫn đang bị ẩn
  // (class "hidden") và els.section có thể chưa từng được gán.
  function goToPromptsLibrary(slug) {
    if (typeof showSection === "function") showSection("prompts");
    if (typeof closeMobileMenus === "function") closeMobileMenus();
    onShow(slug ? { slug } : undefined);
  }

  // Giống bindCardEvents() nhưng bấm vào card sẽ điều hướng sang Prompt
  // Library đầy đủ trước khi mở chi tiết (an toàn khi đang ở Trang chủ).
  // Prompt trong khối này luôn lấy từ validPrompts() (không có nút sửa/xóa).
  function bindHomeCardEvents(container) {
    container.querySelectorAll(".prompt-copy-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleCopy(btn.dataset.copySlug, btn);
      });
    });
    container.querySelectorAll(".prompt-fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(btn.dataset.favSlug);
      });
    });
    container.querySelectorAll(".prompt-card").forEach(card => {
      card.addEventListener("click", () => goToPromptsLibrary(card.dataset.slug));
    });
    bindAiChipEvents(container);
  }

  function renderHomePreview() {
    const trendingWrap = document.getElementById("homePromptsTrendingWrap");
    const trendingGrid = document.getElementById("homePromptsTrendingGrid");
    const newestWrap = document.getElementById("homePromptsNewestWrap");
    const newestGrid = document.getElementById("homePromptsNewestGrid");
    // Trang không có khối này (vd trang chi tiết /prompts/<slug> sinh tĩnh) -> bỏ qua.
    if (!trendingGrid && !newestGrid) return;
    // Chờ có dữ liệu thật (DEFAULT_PROMPTS/JSON/Firebase) để tránh chớp
    // trạng thái rỗng ngay khi trang vừa tải.
    if (!dataLoaded) return;

    const trending = validPrompts().filter(p => p.featured).slice(0, HOME_PREVIEW_LIMIT);
    if (trendingWrap) trendingWrap.classList.toggle("hidden", trending.length === 0);
    if (trendingGrid && trending.length > 0) {
      trendingGrid.innerHTML = trending.map(cardHtml).join("");
      bindHomeCardEvents(trendingGrid);
    }

    const newest = [...validPrompts()]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, HOME_PREVIEW_LIMIT);
    if (newestWrap) newestWrap.classList.toggle("hidden", newest.length === 0);
    if (newestGrid && newest.length > 0) {
      newestGrid.innerHTML = newest.map(cardHtml).join("");
      bindHomeCardEvents(newestGrid);
    }
  }

  function bindHomePreviewEvents() {
    const btn = document.getElementById("homePromptsViewAllBtn");
    if (!btn || btn._promptsHomeBound) return;
    btn._promptsHomeBound = true;
    btn.addEventListener("click", () => goToPromptsLibrary());
  }

  function renderMainGrid() {
    if (!els.resultsGrid) return;
    const list = getFilteredPrompts();

    if (els.resultsTitle) {
      els.resultsTitle.textContent = state.mode === "favorites"
        ? t("prompts_my_prompts_title")
        : t("prompts_all_title");
    }

    const emptyMsg = state.mode === "favorites" ? t("prompts_my_prompts_empty") : t("prompts_not_found");
    renderGridInto(els.resultsGrid, list, emptyMsg);
  }

  // ---------- RENDER: PROMPT CỦA BẠN (tạo thủ công, chỉ lưu local) ----------
  // Luôn hiển thị (nếu có) độc lập với tìm kiếm/bộ lọc/chế độ "Prompt Của
  // Tôi" — vì đây là khu vực riêng cho prompt cá nhân, KHÔNG thuộc
  // promptLibrary công khai nên không đi qua getFilteredPrompts().
  function renderUserPrompts() {
    if (!els.userWrap || !els.userGrid) return;
    const list = [...validUserPrompts()].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const show = list.length > 0;
    els.userWrap.classList.toggle("hidden", !show);
    if (!show) {
      // Dọn sạch DOM khi không còn prompt cá nhân nào (vd vừa xóa prompt
      // cuối cùng) — tránh để lại node/nút bấm cũ ẩn ngầm bên trong.
      els.userGrid.innerHTML = "";
      return;
    }
    els.userGrid.innerHTML = list.map(cardHtml).join("");
    bindCardEvents(els.userGrid);
  }

  function rerenderCurrentView() {
    // Khối xem trước trên Trang chủ (#homePromptsPreview) độc lập với
    // prompts-section (có thể người dùng chưa từng bấm vào menu "Prompt
    // Library") nên luôn được vẽ lại, không phụ thuộc els.section bên dưới.
    renderHomePreview();
    if (!els.section) return;
    if (els.detailView && !els.detailView.classList.contains("hidden")) {
      if (currentDetailSlug) renderDetail(currentDetailSlug);
      return;
    }
    renderFilterOptions();
    renderUserPrompts();
    renderTrending();
    renderNewest();
    renderMainGrid();
  }

  // ---------- DETAIL VIEW ----------
  const SITE_URL = "https://tool-ai-eta.vercel.app";
  const SITE_NAME = "AI Tools";
  const DEFAULT_TITLE = "AI Tools – Free AI Tools Online";
  const DEFAULT_DESC = "Discover the best AI tools for writing, images, video, coding, productivity and more. Find the right AI tool for your needs.";
  const DEFAULT_OG_IMAGE = SITE_URL + "/brand/logo-1024.png";

  function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  }

  function upsertJsonLd(id, dataObj) {
    let script = document.getElementById(id);
    if (!dataObj) {
      if (script) script.remove();
      return;
    }
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(dataObj);
  }

  // Cập nhật title/description/canonical/OG/Twitter/JSON-LD phía client khi
  // điều hướng trong SPA (không tải lại trang) — bổ sung cho các trang tĩnh
  // /prompts/<slug>/index.html do scripts/generate-prompt-pages.js sinh sẵn
  // (dùng cho lượt tải trang đầu tiên/crawler chưa chạy JS). Nhờ vậy SEO
  // đúng cả khi người dùng bấm chuyển prompt ngay trong trang, và cả với
  // prompt mới do Admin thêm qua Firebase (chưa kịp sinh trang tĩnh riêng).
  //
  // QUAN TRỌNG (chống trùng meta description): nếu prompt không có mô tả
  // (Admin không bắt buộc nhập description), KHÔNG được rơi về DEFAULT_DESC
  // (mô tả chung của trang chủ) — vì như vậy MỌI prompt thiếu description sẽ
  // dùng chung 1 câu, vi phạm yêu cầu "không cùng title/description cho tất
  // cả Prompt". Thay vào đó dựng 1 câu fallback DUY NHẤT theo category + AI
  // của chính prompt đó — giống hệt logic scripts/generate-prompt-pages.js
  // dùng cho các trang tĩnh, để 2 nguồn SEO luôn nhất quán với nhau.
  function fallbackDescription(prompt, catLabel_) {
    const aiList = prompt.ai || [];
    return `Copy-ready ${catLabel_} prompt${aiList.length ? " for " + aiList.join(", ") : ""} from the ${SITE_NAME} Prompt Library.`;
  }

  function updateSeoMeta(prompt) {
    try {
      if (!prompt) {
        // document.title về trạng thái mặc định của Trang chủ PHẢI khớp với
        // cơ chế tiêu đề thật của cả site (script.js: applyTranslations() ->
        // document.title = t("site_title")), không dùng chuỗi tĩnh riêng ở
        // đây — nếu không, sau khi xem 1 Prompt rồi quay lại, tiêu đề tab sẽ
        // lệch khỏi tiêu đề Trang chủ thật (và bỏ qua Tên website Admin đã
        // đổi). DEFAULT_TITLE chỉ còn dùng làm phương án dự phòng an toàn.
        document.title = (typeof t === "function") ? t("site_title") : DEFAULT_TITLE;
        setMeta('meta[name="description"]', "content", DEFAULT_DESC);
        setMeta('link[rel="canonical"]', "href", SITE_URL + "/");
        setMeta('meta[property="og:type"]', "content", "website");
        setMeta('meta[property="og:title"]', "content", DEFAULT_TITLE);
        setMeta('meta[property="og:description"]', "content", DEFAULT_DESC);
        setMeta('meta[property="og:url"]', "content", SITE_URL + "/");
        setMeta('meta[property="og:image"]', "content", DEFAULT_OG_IMAGE);
        setMeta('meta[name="twitter:title"]', "content", DEFAULT_TITLE);
        setMeta('meta[name="twitter:description"]', "content", DEFAULT_DESC);
        upsertJsonLd("promptJsonLd", null);
        return;
      }

      const catLabel_ = catLabel(prompt.category);
      const title = `${prompt.title} — Free ${catLabel_} AI Prompt | ${SITE_NAME}`;
      const description = (prompt.description && prompt.description.trim()) || fallbackDescription(prompt, catLabel_);
      const url = SITE_URL + "/prompts/" + prompt.slug;

      document.title = title;
      setMeta('meta[name="description"]', "content", description);
      setMeta('link[rel="canonical"]', "href", url);
      setMeta('meta[property="og:type"]', "content", "article");
      setMeta('meta[property="og:title"]', "content", title);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[property="og:url"]', "content", url);
      setMeta('meta[property="og:image"]', "content", DEFAULT_OG_IMAGE);
      setMeta('meta[name="twitter:title"]', "content", title);
      setMeta('meta[name="twitter:description"]', "content", description);

      upsertJsonLd("promptJsonLd", {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": prompt.title,
        "description": description,
        "url": url,
        "isAccessibleForFree": true,
        "genre": catLabel_,
        "dateCreated": prompt.createdAt || undefined,
        "keywords": [prompt.title, catLabel_ + " prompt", ...(prompt.tags || [])].join(", "),
        "isPartOf": { "@type": "WebSite", "name": SITE_NAME, "url": SITE_URL + "/" }
      });
    } catch (e) { /* no-op: SEO cập nhật thất bại không được làm hỏng trang */ }
  }

  function renderDetail(slug) {
    const p = findBySlug(slug);
    if (!p) {
      if (els.detailBody) els.detailBody.innerHTML = `<div class="prompts-empty">${t("prompts_not_found")}</div>`;
      return;
    }
    currentDetailSlug = slug;
    const isFav = favorites.has(p.id);
    const usage = getCopyCount(p.id);

    if (els.detailBody) {
      els.detailBody.innerHTML = `
        <div class="prompt-detail-head">
          <span class="prompt-badge-category">${catLabel(p.category)}</span>
          ${p.featured ? `<span class="prompt-badge-trending">🔥 Trending</span>` : ""}
          ${p.isUserCreated ? `<span class="prompt-badge-personal">✨ ${t("prompts_personal_badge")}</span>` : ""}
        </div>
        <h2 class="prompt-detail-title">${escapeHtml(p.title)}</h2>
        <p class="prompt-detail-desc">${escapeHtml(p.description || "")}</p>
        <div class="prompt-detail-meta">
          <div class="prompt-detail-ai">
            <strong>${t("prompts_recommended_ai")}:</strong>
            ${(p.ai || []).map(aiChipHtml).join("")}
          </div>
          ${usage > 0 ? `<div class="prompt-usage" data-usage-id="${p.id}">${t("prompts_usage_count").replace("{n}", usage)}</div>` : `<div class="prompt-usage hidden" data-usage-id="${p.id}"></div>`}
        </div>

        ${(p.tags || []).length > 0 ? `
        <div class="prompt-detail-tags">
          <strong>${t("prompts_tags_label")}:</strong>
          ${(p.tags || []).map(tagChipHtml).join("")}
        </div>` : ""}

        <h4 class="prompt-detail-subheading">${t("prompts_full_prompt")}</h4>
        <pre class="prompt-detail-full">${escapeHtml(p.prompt || "")}</pre>

        <div class="prompt-detail-actions">
          <button type="button" class="prompt-copy-btn prompt-copy-btn-lg" data-copy-slug="${escapeHtml(p.slug)}">${t("prompts_copy_btn")}</button>
          <button type="button" class="prompt-fav-btn prompt-fav-btn-lg ${isFav ? "active" : ""}" data-fav-slug="${escapeHtml(p.slug)}" aria-pressed="${isFav}">
            ${isFav ? "💖" : "🤍"} <span>${isFav ? t("prompts_favorite_added") : t("prompts_favorite_add")}</span>
          </button>
          ${p.isUserCreated ? `<button type="button" class="prompt-edit-btn prompt-edit-btn-lg" data-edit-slug="${escapeHtml(p.slug)}">✏️ ${t("prompts_edit_btn")}</button>` : ""}
          ${p.isUserCreated ? `<button type="button" class="prompt-delete-btn prompt-delete-btn-lg" data-delete-slug="${escapeHtml(p.slug)}">🗑️ ${t("prompts_delete_btn")}</button>` : ""}
        </div>
      `;
      bindCardEvents(els.detailBody);
    }

    // Prompt liên quan: tính điểm theo category / AI / tags trùng nhau
    // (yêu cầu #8), loại trừ chính nó.
    if (els.relatedGrid) {
      const pAi = new Set(p.ai || []);
      const pTags = new Set((p.tags || []).map(normalizeText));
      const related = validPrompts()
        .filter(rp => rp.slug !== p.slug)
        .map(rp => {
          let score = 0;
          if (rp.category === p.category) score += 3;
          score += (rp.ai || []).filter(a => pAi.has(a)).length * 2;
          score += (rp.tags || []).filter(tag => pTags.has(normalizeText(tag))).length;
          return { rp, score };
        })
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(x => x.rp);
      if (related.length > 0) {
        els.relatedGrid.closest(".prompts-related-wrap")?.classList.remove("hidden");
        renderGridInto(els.relatedGrid, related);
      } else {
        els.relatedGrid.closest(".prompts-related-wrap")?.classList.add("hidden");
      }
    }

    updateSeoMeta(p);
  }

  function openDetail(slug, opts) {
    const push = !opts || opts.push !== false;
    if (!findBySlug(slug) && dataLoaded) {
      // slug không tồn tại -> quay lại lưới thay vì hiện trang trống
      showGrid({ push: false });
      return;
    }
    currentDetailSlug = slug;
    if (els.gridView) els.gridView.classList.add("hidden");
    if (els.detailView) els.detailView.classList.remove("hidden");

    if (window.trackEvent) {
      const viewedPrompt = findBySlug(slug);
      if (viewedPrompt) {
        window.trackEvent("prompt_view", {
          prompt_name: viewedPrompt.title,
          prompt_slug: viewedPrompt.slug,
          category: viewedPrompt.category
        });
      }
    }

    renderDetail(slug);
    if (push) history.pushState({ prompts: true, slug }, "", "/prompts/" + slug);
    els.section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showGrid(opts) {
    const push = !opts || opts.push !== false;
    currentDetailSlug = null;
    if (els.detailView) els.detailView.classList.add("hidden");
    if (els.gridView) els.gridView.classList.remove("hidden");
    updateSeoMeta(null);
    rerenderCurrentView();
    if (push) history.pushState({ prompts: true }, "", "/prompts");
  }

  // ---------- SỰ KIỆN ----------
  function bindEvents() {
    if (bound) return;
    bound = true;

    let searchDebounce = null;
    els.searchInput?.addEventListener("input", () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.search = els.searchInput.value;
        if (els.searchClear) els.searchClear.classList.toggle("hidden", !state.search);
        renderTrending();
        renderNewest();
        renderMainGrid();
      }, 150);

      if (window.trackEventDebounced) {
        const keyword = els.searchInput.value.trim();
        if (keyword) {
          window.trackEventDebounced("prompt-search", "site_search", {
            search_term: keyword,
            search_source: "prompts"
          });
        }
      }
    });

    els.searchClear?.addEventListener("click", () => {
      state.search = "";
      if (els.searchInput) els.searchInput.value = "";
      els.searchClear.classList.add("hidden");
      renderTrending();
      renderNewest();
      renderMainGrid();
    });

    els.categoryFilter?.addEventListener("change", () => {
      state.category = els.categoryFilter.value;
      renderTrending();
      renderNewest();
      renderMainGrid();
    });

    els.aiFilter?.addEventListener("change", () => {
      state.ai = els.aiFilter.value;
      renderTrending();
      renderNewest();
      renderMainGrid();
    });

    els.sortNewestBtn?.addEventListener("click", () => setSort("newest"));
    els.sortPopularBtn?.addEventListener("click", () => setSort("popular"));
    els.sortFeaturedBtn?.addEventListener("click", () => setSort(state.sort === "featured" ? "newest" : "featured"));

    els.clearFiltersBtn?.addEventListener("click", () => {
      state = { search: "", category: "all", ai: "all", sort: "newest", mode: state.mode };
      if (els.searchInput) els.searchInput.value = "";
      els.searchClear?.classList.add("hidden");
      if (els.categoryFilter) els.categoryFilter.value = "all";
      if (els.aiFilter) els.aiFilter.value = "all";
      setSort("newest");
    });

    els.myPromptsBtn?.addEventListener("click", () => {
      state.mode = state.mode === "favorites" ? "browse" : "favorites";
      els.myPromptsBtn.classList.toggle("active", state.mode === "favorites");
      showGrid({ push: false });
    });

    els.createBtn?.addEventListener("click", () => openCreatePromptModal());

    els.detailBack?.addEventListener("click", () => showGrid());

    window.addEventListener("popstate", (e) => {
      if (!els.section || els.section.classList.contains("hidden")) return;
      const path = location.pathname;
      const match = path.match(/^\/prompts\/([^/]+)\/?$/);
      if (match) {
        openDetail(match[1], { push: false });
      } else if (path.replace(/\/$/, "") === "/prompts") {
        showGrid({ push: false });
      }
    });
  }

  function setSort(sort) {
    state.sort = sort;
    els.sortNewestBtn?.classList.toggle("active", sort === "newest");
    els.sortPopularBtn?.classList.toggle("active", sort === "popular");
    els.sortFeaturedBtn?.classList.toggle("active", sort === "featured");
    // "Featured" thay đổi TẬP KẾT QUẢ (không chỉ thứ tự) nên cần render lại
    // cả Trending/Newest (để ẩn đi, giống các bộ lọc khác) chứ không chỉ
    // bảng kết quả chính.
    if (els.section && !els.section.classList.contains("hidden")) {
      rerenderCurrentView();
    } else {
      renderMainGrid();
    }
  }

  // ---------- HOOKS GỌI TỪ script.js ----------
  function onShow(opts) {
    cacheEls();
    bindEvents();
    renderFilterOptions();
    setSort(state.sort);
    if (opts && opts.slug) {
      openDetail(opts.slug, { push: false });
    } else {
      showGrid({ push: false });
    }
  }

  function onLangChange() {
    renderHomePreview();
    if (!els.section) return;
    updateSeoMeta(null);
    rerenderCurrentView();
  }

  window.AIPrompts = { onShow, onLangChange };

  // Khởi tạo khối xem trước trên Trang chủ SAU khi mọi hàm/const liên quan
  // (renderHomePreview, bindHomePreviewEvents, HOME_PREVIEW_LIMIT) đã được
  // khai báo ở trên — gọi sớm hơn sẽ vỡ vì HOME_PREVIEW_LIMIT là "const"
  // (temporal dead zone), làm crash toàn bộ IIFE và khiến window.AIPrompts
  // không bao giờ được gán.
  bindHomePreviewEvents();
  renderHomePreview();

  // ---------- ĐIỀU HƯỚNG TRỰC TIẾP QUA URL ----------
  // Cho phép mở thẳng /prompts hoặc /prompts/<slug> (vd: tải lại trang, chia
  // sẻ link) mà không cần bấm menu trước — giống cơ chế /battle/:path* đã có.
  function initDirectRoute() {
    const path = location.pathname.replace(/\/$/, "");
    if (path === "/prompts" || /^\/prompts\/[^/]+$/.test(path)) {
      const match = path.match(/^\/prompts\/([^/]+)$/);
      const run = () => {
        if (typeof showSection === "function") showSection("prompts");
        if (typeof closeMobileMenus === "function") closeMobileMenus();
        onShow(match ? { slug: match[1] } : null);
      };
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(run, 0);
      } else {
        document.addEventListener("DOMContentLoaded", run);
      }
    }
  }
  initDirectRoute();
})();
