// =======================================
// AI Tools - script.js
// =======================================

// ---------- CÀI ĐẶT GIAO DIỆN & TÊN WEBSITE (do Admin chỉnh) ----------
const SITE_SETTINGS_KEY = "siteSettings";
const DEFAULT_SITE_SETTINGS = {
  siteName: "Tool AI",
  colors: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    background: "#f4f7fb",
    text: "#1e293b"
  }
};

function getSiteSettings() {
  let stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(SITE_SETTINGS_KEY) || "null");
  } catch {
    stored = null;
  }
  return {
    siteName: (stored && stored.siteName) || DEFAULT_SITE_SETTINGS.siteName,
    colors: { ...DEFAULT_SITE_SETTINGS.colors, ...((stored && stored.colors) || {}) }
  };
}

function applySiteSettings() {
  const settings = getSiteSettings();

  document.title = settings.siteName;

  const logoEl = document.getElementById("siteLogoText");
  if (logoEl) logoEl.textContent = settings.siteName;

  const footerNameEl = document.getElementById("footerSiteName");
  if (footerNameEl) footerNameEl.textContent = settings.siteName;

  const root = document.documentElement.style;
  root.setProperty("--primary", settings.colors.primary);
  root.setProperty("--primary-dark", settings.colors.primaryDark);
  root.setProperty("--background", settings.colors.background);
  root.setProperty("--text", settings.colors.text);
}

// ---------- ĐỒNG BỘ TÊN WEBSITE / MÀU GIAO DIỆN QUA FIREBASE ----------
// Firebase App đã được khởi tạo (nếu cấu hình hợp lệ) ngay trong
// firebase-config.js, TRƯỚC KHI file này chạy — ở đây chỉ cần lấy service
// Realtime Database ra dùng, không gọi initializeApp() lần nữa.
let firebaseDb = null;
try {
  if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length) {
    firebaseDb = firebase.database();

    // Lắng nghe thay đổi theo thời gian thực từ Firebase
    firebaseDb.ref("siteSettings").on("value", (snapshot) => {
      const cloudSettings = snapshot.val();
      if (cloudSettings && cloudSettings.siteName) {
        localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(cloudSettings));
        applySiteSettings();
      }
    });
  }
} catch (e) {
  console.warn("Chưa kết nối được Firebase, dùng cấu hình lưu cục bộ (localStorage).", e);
}

applySiteSettings();

const knowledgeContainer = document.getElementById("knowledgeContainer");
const knowledgeSection = document.getElementById("knowledge-section");
const knowledgeToggle = document.getElementById("knowledgeToggle");
const guideContainer = document.getElementById("guideContainer");
const guideSection = document.getElementById("guide-section");
const guideToggle = document.getElementById("guideToggle");
const toolContainer = document.getElementById("toolContainer");
const toolSection = document.getElementById("tool-section");
const professionContainer = document.getElementById("professionContainer");
const professionSection = document.getElementById("profession-section");
const rankingContainer = document.getElementById("rankingContainer");
const rankingSection = document.getElementById("ranking-section");
const trendingContainer = document.getElementById("trendingContainer");
const trendingSection = document.getElementById("trending-section");
const homeToggle = document.getElementById("homeToggle");
const toolsToggle = document.getElementById("toolsToggle");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearSearchBtn = document.getElementById("clearSearch");
let sidebarItems = document.querySelectorAll(".sidebar li[data-category]");
const utilityItems = document.querySelectorAll("[data-utility]");
const themeToggleBtn = document.getElementById("themeToggle");
const compactModeBtn = document.getElementById("compactMode");
const langSelect = document.getElementById("langSelect");
const heroRobot = document.querySelector(".hero-robot");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navEl = document.querySelector(".header nav");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarPanel = document.getElementById("sidebarPanel");
const backToTopBtn = document.getElementById("backToTop");
const sortTools = document.getElementById("sortTools");
const advFilterToggleBtn = document.getElementById("advFilterToggleBtn");
const advFilterPanel = document.getElementById("advFilterPanel");
const advFilterClearBtn = document.getElementById("advFilterClearBtn");
const battleSection = document.getElementById("battle-section");
const battleToggle = document.getElementById("battleToggle");
const quizSection = document.getElementById("quiz-section");
const quizToggle = document.getElementById("quizToggle");
const usecasesSection = document.getElementById("usecases-section");
const usecasesToggle = document.getElementById("usecasesToggle");
const promptsSection = document.getElementById("prompts-section");
const promptsToggle = document.getElementById("promptsToggle");
const aiNewsSection = document.getElementById("ai-news-section");
const aiNewsToggle = document.getElementById("aiNewsToggle");

let currentCategory = "all";
let specialFilter = null; // null | "newest" | "free" | "favorites" | "recent" | "random"

// ---------- DANH MỤC (mặc định trong data.js, có thể được Firebase ghi đè) ----------
let currentCategories = DEFAULT_CATEGORIES.slice();

function applyCategoriesFromFirebase(categoriesObj) {
  const list = categoriesObj ? Object.values(categoriesObj) : [];
  if (list.length === 0) return; // Firebase "categories" trống -> giữ danh mục mặc định
  currentCategories = list;
}
let randomPickIds = [];
let favorites = new Set(JSON.parse(localStorage.getItem("favoriteTools") || "[]"));
let recentlyViewed = JSON.parse(localStorage.getItem("recentTools") || "[]");

// Bộ lọc nâng cao: giá (free/pro, chọn nhiều), có API (bật/tắt), loại công cụ (chọn nhiều)
let advFilters = { price: new Set(), api: false, category: new Set() };

function saveFavorites() {
  localStorage.setItem("favoriteTools", JSON.stringify([...favorites]));
}

function addToRecent(toolId) {
  recentlyViewed = [toolId, ...recentlyViewed.filter(id => id !== toolId)].slice(0, 10);
  localStorage.setItem("recentTools", JSON.stringify(recentlyViewed));
}

// ---------- LƯỢT XEM (VIEW COUNT) ----------
// Lưu số lượt xem thực tế (do người dùng bấm "Dùng ngay"/"Xem") vào LocalStorage.
// Bắt đầu từ 0, không cộng thêm số nền giả lập.
const VIEWS_STORAGE_KEY = "toolViews";

function getStoredViews() {
  try {
    return JSON.parse(localStorage.getItem(VIEWS_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function getViews(toolId) {
  const stored = getStoredViews();
  return stored[toolId] || 0;
}

function incrementViews(toolId) {
  const stored = getStoredViews();
  stored[toolId] = (stored[toolId] || 0) + 1;
  localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(stored));
  return getViews(toolId);
}

function formatViews(n) {
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return String(n);
}

// ---------- RENDER TRENDING AI: BỤC PODIUM TOP 3 ----------
// Admin chọn thủ công đúng 3 AI cho Hạng 1 / 2 / 3 trong Admin Panel
// (tab Trending AI). Hạng 1 luôn ở giữa & cao nhất, Hạng 2 bên trái,
// Hạng 3 bên phải, đúng bố cục bục trao huy chương.
function renderTrending() {
  if (!trendingContainer) return;

  const byRank = {};
  aiTools.forEach(tool => {
    if (tool.trendingRank === 1 || tool.trendingRank === 2 || tool.trendingRank === 3) {
      byRank[tool.trendingRank] = tool;
    }
  });

  if (!byRank[1] && !byRank[2] && !byRank[3]) {
    trendingContainer.innerHTML = `<p class="trending-empty">${t("trending_empty")}</p>`;
    return;
  }

  const medalMeta = {
    1: { medal: "🥇", label: t("admin_trending_rank1") },
    2: { medal: "🥈", label: t("admin_trending_rank2") },
    3: { medal: "🥉", label: t("admin_trending_rank3") }
  };

  const buildStep = (pos) => {
    const tool = byRank[pos];
    if (!tool) {
      return `<div class="podium-step podium-step-${pos} podium-empty"></div>`;
    }
    return `
      <div class="podium-step podium-step-${pos}">
        <div class="podium-spotlight"></div>
        <div class="podium-avatar-wrap">
          <div class="podium-medal">
            <span class="podium-medal-ribbon-l"></span>
            <span class="podium-medal-ribbon-r"></span>
            <span class="podium-medal-disc">${medalMeta[pos].medal}</span>
          </div>
          <div class="podium-avatar">
            <img class="tool-logo" data-fallback-icon="${tool.icon}"
                 src="${officialLogoUrl(tool.link)}"
                 alt="Logo ${tool.name}">
          </div>
        </div>
        <div class="podium-card">
          <h4 class="podium-name">${tool.name}</h4>
          <span class="podium-rank-label">${medalMeta[pos].label}</span>
          <span class="podium-category">${t("cat_" + tool.category)}</span>
          <a class="btn btn-free podium-link" href="${tool.link}" target="_blank" rel="noopener" data-tool-id="${tool.id}">${t("btn_use")}</a>
        </div>
        <div class="podium-block podium-block-${pos}"><span class="podium-block-num">${pos}</span></div>
      </div>
    `;
  };

  trendingContainer.innerHTML = `
    <div class="podium-stage">
      <div class="podium-beam"></div>
      ${buildStep(2)}
      ${buildStep(1)}
      ${buildStep(3)}
    </div>
  `;

  trendingContainer.querySelectorAll(".podium-avatar .tool-logo").forEach(img => {
    img.addEventListener("error", () => {
      const span = document.createElement("span");
      span.style.fontSize = "40px";
      span.textContent = img.dataset.fallbackIcon;
      img.replaceWith(span);
    }, { once: true });
  });
}

// ---------- NGÔN NGỮ ----------
const supportedLanguages = ["vi", "en"];
let currentLang = supportedLanguages.includes(localStorage.getItem("lang")) ? localStorage.getItem("lang") : "en";

function localizedText(value) {
  if (value && typeof value === "object") {
    return value[currentLang] || value.en || value.vi || "";
  }
  return value || "";
}

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}

// Lấy favicon trực tiếp từ tên miền chính thức của từng công cụ, tránh dùng sai logo
// khi kho icon bên thứ ba chưa có hoặc đặt tên icon khác với thương hiệu.
function officialLogoUrl(link) {
  try {
    return `https://www.google.com/s2/favicons?sz=128&domain=${encodeURIComponent(new URL(link).hostname)}`;
  } catch {
    return "";
  }
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t("site_title");
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
  clearSearchBtn.setAttribute("aria-label", t("clear_search"));
  clearSearchBtn.title = t("clear_search");
  if (heroRobot) {
    heroRobot.alt = t("robot_alt");
  }
  applyCompactMode(document.body.classList.contains("compact"));
  refreshThemeButtonLabel();
}

langSelect.addEventListener("change", () => {
  currentLang = langSelect.value;
  localStorage.setItem("lang", currentLang);
  applyTranslations();
  renderCategorySidebar();
  renderKnowledge();
  renderGuide();
  renderTools();
  renderProfession();
  renderRanking();
  renderTrending();
  if (window.BattleArena) window.BattleArena.onLangChange();
  if (window.AIQuiz) window.AIQuiz.onLangChange();
  if (window.AIUseCases) window.AIUseCases.onLangChange();
  if (window.AIPrompts) window.AIPrompts.onLangChange();
  if (window.AINews) window.AINews.onLangChange();
});

// ---------- RENDER KIẾN THỨC AI ----------
function renderKnowledge() {
  knowledgeContainer.innerHTML = aiKnowledge.map(item => `
    <div class="knowledge-card">
      <div class="knowledge-icon">${item.icon}</div>
      <h3>${localizedText(item.name)}</h3>
      ${
        Array.isArray(item.content)
          ? "<ul>" + item.content.map(x => `<li>${localizedText(x)}</li>`).join("") + "</ul>"
          : `<p>${localizedText(item.content)}</p>`
      }
    </div>
  `).join("");
}

// ---------- RENDER HƯỚNG DẪN SỬ DỤNG AI ----------
function renderGuide() {
  guideContainer.innerHTML = aiGuide.map(item => `
    <div class="knowledge-card">
      <div class="knowledge-icon">${item.icon}</div>
      <h3>${localizedText(item.name)}</h3>
      <p>${localizedText(item.content)}</p>
    </div>
  `).join("");
}

// ---------- RENDER AI THEO NGHỀ ----------
function renderProfession() {
  professionContainer.innerHTML = aiByProfession.map(item => `
    <div class="profession-card">
      <div class="knowledge-icon">${item.icon}</div>
      <h3>${localizedText(item.title)}</h3>
      <p class="profession-intro">${localizedText(item.intro)}</p>
      <ul class="profession-tasks">
        ${item.tasks.map(task => `<li>${localizedText(task)}</li>`).join("")}
      </ul>
      <div class="profession-suggest">
        <span class="suggest-label">${t("profession_suggest_label")}</span>
        <div class="chip-row">
          ${item.suggested.map(name => `<span class="chip" data-tool="${name}">${name}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  // Bấm vào tên công cụ gợi ý -> tìm công cụ đó trong khu Công cụ AI
  professionContainer.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      searchInput.value = chip.dataset.tool;
      specialFilter = null;
      currentCategory = "all";
      clearSidebarActive();
      document.querySelector('.sidebar li[data-category="all"]').classList.add("active");
      renderTools();
      showSection("tools");
    });
  });
}

// ---------- RENDER BẢNG XẾP HẠNG AI ----------
function renderRanking() {
  const ranked = [...aiTools].sort((a, b) => b.rating - a.rating).slice(0, 20);

  rankingContainer.innerHTML = ranked.map((tool, idx) => {
    const pos = idx + 1;
    const posLabel = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : pos;
    return `
      <div class="ranking-item">
        <div class="rank-pos ${pos <= 3 ? "rank-top" : ""}">${posLabel}</div>
        <div class="ranking-logo">
          <img class="tool-logo" data-fallback-icon="${tool.icon}"
               src="${officialLogoUrl(tool.link)}"
               alt="Logo ${tool.name}">
        </div>
        <div class="ranking-info">
          <h4>${tool.name}</h4>
          <span class="ranking-category">${t("cat_" + tool.category)}</span>
        </div>
        <div class="ranking-rating">⭐ ${tool.rating.toFixed(1)}</div>
        <a class="btn btn-free ranking-link" href="${tool.link}" target="_blank" rel="noopener">${t("btn_use")}</a>
      </div>
    `;
  }).join("");

  rankingContainer.querySelectorAll(".ranking-logo .tool-logo").forEach(img => {
    img.addEventListener("error", () => {
      const span = document.createElement("span");
      span.style.fontSize = "28px";
      span.textContent = img.dataset.fallbackIcon;
      img.replaceWith(span);
    }, { once: true });
  });
}

// ---------- CHUYỂN QUA LẠI GIỮA CÁC KHU VỰC (chỉ hiện 1 khu vực tại 1 thời điểm) ----------
function showSection(target) {
  const sections = {
    tools: toolSection,
    knowledge: knowledgeSection,
    guide: guideSection,
    profession: professionSection,
    ranking: rankingSection,
    trending: trendingSection,
    battle: battleSection,
    quiz: quizSection,
    usecases: usecasesSection,
    prompts: promptsSection,
    "ai-news": aiNewsSection
  };

  // Ẩn tất cả khu vực, chỉ hiện đúng khu vực được chọn
  Object.entries(sections).forEach(([key, el]) => el.classList.toggle("hidden", key !== target));

  // Đánh dấu link đang active trên menu
  [homeToggle, knowledgeToggle, toolsToggle, guideToggle, battleToggle, quizToggle, usecasesToggle, promptsToggle, aiNewsToggle].forEach(link => link.classList.remove("active-link"));
  if (target === "knowledge") knowledgeToggle.classList.add("active-link");
  if (target === "guide") guideToggle.classList.add("active-link");
  if (target === "tools") { homeToggle.classList.add("active-link"); toolsToggle.classList.add("active-link"); }
  if (target === "battle") battleToggle.classList.add("active-link");
  if (target === "quiz") quizToggle.classList.add("active-link");
  if (target === "usecases") usecasesToggle.classList.add("active-link");
  if (target === "prompts") promptsToggle.classList.add("active-link");
  if (target === "ai-news") aiNewsToggle.classList.add("active-link");

  // Cuộn lên đúng đầu khu vực vừa hiện
  sections[target].scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---------- MENU DI ĐỘNG: MỞ/ĐÓNG NAV & SIDEBAR ----------
function closeMobileMenus() {
  navEl.classList.remove("nav-open");
  sidebarPanel.classList.remove("sidebar-open");
}

mobileMenuBtn.addEventListener("click", () => {
  navEl.classList.toggle("nav-open");
  sidebarPanel.classList.remove("sidebar-open");
});

sidebarToggle.addEventListener("click", () => {
  sidebarPanel.classList.toggle("sidebar-open");
  navEl.classList.remove("nav-open");
});

// ---------- SIDEBAR: BỎ TRẠNG THÁI ACTIVE Ở TẤT CẢ MỤC ----------
function clearSidebarActive() {
  sidebarItems.forEach(item => item.classList.remove("active"));
  utilityItems.forEach(item => item.classList.remove("active"));
}

// ---------- TRỞ VỀ TRẠNG THÁI MẶC ĐỊNH CỦA KHU CÔNG CỤ AI ----------
function resetToolsView() {
  specialFilter = null;
  currentCategory = "all";
  searchInput.value = "";
  clearSidebarActive();
  document.querySelector('.sidebar li[data-category="all"]').classList.add("active");
  renderTools();
}

homeToggle.addEventListener("click", (e) => { e.preventDefault(); resetToolsView(); showSection("tools"); closeMobileMenus(); });
toolsToggle.addEventListener("click", (e) => { e.preventDefault(); resetToolsView(); showSection("tools"); closeMobileMenus(); });
knowledgeToggle.addEventListener("click", (e) => { e.preventDefault(); showSection("knowledge"); closeMobileMenus(); });
guideToggle.addEventListener("click", (e) => { e.preventDefault(); showSection("guide"); closeMobileMenus(); });
battleToggle.addEventListener("click", (e) => {
  e.preventDefault();
  showSection("battle");
  closeMobileMenus();
  if (window.BattleArena) window.BattleArena.onShow();
});
quizToggle.addEventListener("click", (e) => {
  e.preventDefault();
  showSection("quiz");
  closeMobileMenus();
  if (window.AIQuiz) window.AIQuiz.onShow();
});
usecasesToggle.addEventListener("click", (e) => {
  e.preventDefault();
  showSection("usecases");
  closeMobileMenus();
  if (window.AIUseCases) window.AIUseCases.onShow();
});
promptsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  showSection("prompts");
  closeMobileMenus();
  if (window.AIPrompts) window.AIPrompts.onShow();
});
aiNewsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  showSection("ai-news");
  closeMobileMenus();
  if (window.AINews) window.AINews.onShow();
});

// ---------- TIỆN ÍCH: SO SÁNH / XẾP HẠNG / MỚI NHẤT / MIỄN PHÍ / THEO NGHỀ ----------
utilityItems.forEach(li => {
  li.addEventListener("click", () => {
    clearSidebarActive();
    li.classList.add("active");
    const type = li.dataset.utility;
    if (type !== "random") searchInput.value = "";

    if (type === "ranking") {
      renderRanking();
      showSection("ranking");
    } else if (type === "trending") {
      renderTrending();
      showSection("trending");
    } else if (type === "profession") {
      renderProfession();
      showSection("profession");
    } else if (type === "newest") {
      specialFilter = "newest";
      currentCategory = "all";
      renderTools();
      showSection("tools");
    } else if (type === "free") {
      specialFilter = "free";
      currentCategory = "all";
      renderTools();
      showSection("tools");
    } else if (type === "favorites") {
      specialFilter = "favorites";
      currentCategory = "all";
      renderTools();
      showSection("tools");
    } else if (type === "recent") {
      specialFilter = "recent";
      currentCategory = "all";
      renderTools();
      showSection("tools");
    } else if (type === "random") {
      const shuffled = [...aiTools].sort(() => Math.random() - 0.5);
      randomPickIds = shuffled.slice(0, 8).map(tool => tool.id);
      searchInput.value = "";
      specialFilter = "random";
      currentCategory = "all";
      renderTools();
      showSection("tools");
    }

    sidebarPanel.classList.remove("sidebar-open");
  });
});

// ---------- RENDER CÔNG CỤ AI ----------
function renderTools() {
  const badgeLabel = {
    free: t("badge_free"),
    pro: t("badge_pro"),
    hot: t("badge_hot")
  };

  const keyword = searchInput.value.trim().toLowerCase();

  let filtered = aiTools.filter(tool => {
    const matchCategory = specialFilter ? true : (currentCategory === "all" || tool.category === currentCategory);
    const matchSearch = tool.name.toLowerCase().includes(keyword) ||
                         localizedText(tool.description).toLowerCase().includes(keyword);
    const matchSpecial = specialFilter === "free" ? tool.badge === "free" :
                         specialFilter === "favorites" ? favorites.has(tool.id) :
                         specialFilter === "recent" ? recentlyViewed.includes(tool.id) :
                         specialFilter === "random" ? randomPickIds.includes(tool.id) : true;
    // Bộ lọc nâng cao: giá, có API, loại công cụ (chỉ áp dụng khi người dùng có chọn)
    const matchAdvPrice = advFilters.price.size === 0 ? true :
                           (tool.badge === "hot" ? true : advFilters.price.has(tool.badge));
    const matchAdvApi = !advFilters.api || tool.hasApi === true;
    const matchAdvCategory = advFilters.category.size === 0 ? true : advFilters.category.has(tool.category);
    return matchCategory && matchSearch && matchSpecial && matchAdvPrice && matchAdvApi && matchAdvCategory;
  });

  // "AI mới nhất": sắp xếp theo id giảm dần, lấy 12 công cụ gần nhất
  if (specialFilter === "newest") {
    filtered = [...filtered].sort((a, b) => b.id - a.id).slice(0, 12);
  }

  if (specialFilter === "recent" && sortTools.value === "featured") {
    filtered.sort((a, b) => recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id));
  }

  if (sortTools.value === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortTools.value === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, currentLang));
  } else if (sortTools.value === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name, currentLang));
  }

  const countLabel = document.getElementById("toolCount");
  if (countLabel) countLabel.textContent = t("tool_count").replace("{n}", filtered.length);

  if (filtered.length === 0) {
    toolContainer.innerHTML = `<div class="empty">${specialFilter === "favorites" ? t("favorites_empty") : specialFilter === "recent" ? t("recent_empty") : t("empty_search")}</div>`;
    return;
  }

  toolContainer.innerHTML = filtered.map(tool => `
    <div class="tool-card">
      <span class="badge ${tool.badge}">${badgeLabel[tool.badge] || ""}</span>
      <button class="favorite-btn ${favorites.has(tool.id) ? "is-favorite" : ""}" type="button" data-tool-id="${tool.id}" aria-label="${favorites.has(tool.id) ? t("favorite_remove") : t("favorite_add")}" title="${favorites.has(tool.id) ? t("favorite_remove") : t("favorite_add")}">${favorites.has(tool.id) ? "♥" : "♡"}</button>
      <div class="tool-image">
        <img class="tool-logo" data-fallback-icon="${tool.icon}"
             src="${officialLogoUrl(tool.link)}"
             alt="Logo ${tool.name}">
      </div>
      <div class="tool-content">
        <h3>${tool.name}</h3>
        <div class="rating">⭐ <span>${tool.rating.toFixed(1)}/5</span> ${tool.hasApi ? `<span class="api-tag" title="${t("adv_filter_has_api")}">🔌 ${t("api_tag_label")}</span>` : ""}</div>
        <div class="views-count" data-views-id="${tool.id}">👁️ <span>${formatViews(getViews(tool.id))}</span> ${t("views_label")}</div>
        <p>${localizedText(tool.description)}</p>
        <div class="tool-buttons">
          <button type="button" class="btn btn-view tool-view-btn" data-tool-id="${tool.id}">${t("btn_view")}</button>
          <a class="btn btn-free tool-use-link" data-tool-id="${tool.id}" href="${tool.link}" target="_blank" rel="noopener">${t("btn_use")}</a>
        </div>
      </div>
    </div>
  `).join("");

  // Nếu logo thật không tải được (không có trong kho) -> hiện icon emoji thay thế
  toolContainer.querySelectorAll(".tool-logo").forEach(img => {
    img.addEventListener("error", () => {
      const span = document.createElement("span");
      span.style.fontSize = "48px";
      span.textContent = img.dataset.fallbackIcon;
      img.replaceWith(span);
    }, { once: true });
  });

  toolContainer.querySelectorAll(".favorite-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.toolId);
      const nowFavorite = !favorites.has(id);
      favorites.has(id) ? favorites.delete(id) : favorites.add(id);
      saveFavorites();

      if (window.trackEvent) {
        const favTool = aiTools.find(item => item.id === id);
        if (favTool) {
          window.trackEvent("ai_favorite", {
            ai_name: favTool.name,
            ai_slug: favTool.slug,
            category: favTool.category,
            action: nowFavorite ? "add" : "remove"
          });
        }
      }

      if (specialFilter === "favorites") {
        // Đang ở chế độ "Yêu thích": bỏ tim thì thẻ phải biến mất khỏi lưới,
        // nên vẫn cần render lại.
        renderTools();
        return;
      }

      // Các trường hợp còn lại: chỉ cập nhật đúng nút bấm vừa click, KHÔNG
      // render lại toàn bộ lưới. Trước đây gọi renderTools() ở đây làm mọi
      // .tool-card bị tạo lại từ đầu -> animation "fadeUp" chạy lại trên
      // toàn bộ lưới cùng lúc, tạo cảm giác cả trang bị "giật" chỉ vì bấm
      // 1 tim.
      button.classList.toggle("is-favorite", nowFavorite);
      button.textContent = nowFavorite ? "♥" : "♡";
      const label = nowFavorite ? t("favorite_remove") : t("favorite_add");
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  });

  toolContainer.querySelectorAll(".tool-use-link").forEach(link => {
    link.addEventListener("click", () => {
      const id = Number(link.dataset.toolId);
      addToRecent(id);
      const newCount = incrementViews(id);
      const viewsEl = toolContainer.querySelector(`.views-count[data-views-id="${id}"] span`);
      if (viewsEl) viewsEl.textContent = formatViews(newCount);

      if (window.trackEvent) {
        const visitTool = aiTools.find(item => item.id === id);
        if (visitTool) {
          window.trackEvent("ai_visit_website", {
            ai_name: visitTool.name,
            ai_slug: visitTool.slug,
            category: visitTool.category
          });
        }
      }
    });
  });

  toolContainer.querySelectorAll(".tool-view-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.toolId);
      openToolDetailModal(id);
    });
  });
}

// ---------- MODAL "XEM": hiển thị chi tiết 1 công cụ AI ----------
function openToolDetailModal(id) {
  const tool = aiTools.find(item => item.id === id);
  if (!tool) return;

  if (window.trackEvent) {
    window.trackEvent("ai_view", {
      ai_name: tool.name,
      ai_slug: tool.slug,
      category: tool.category
    });
  }

  addToRecent(id);
  const newCount = incrementViews(id);  // +1 lượt xem khi bấm xem chi tiết
  const viewsEl = document.querySelector(`.views-count[data-views-id="${id}"] span`);
  if (viewsEl) viewsEl.textContent = formatViews(newCount);

  const badgeLabel = {
    free: t("badge_free"),
    pro: t("badge_pro"),
    hot: t("badge_hot")
  };

  // Sao đánh giá dạng ⭐⭐⭐⭐⭐ dựa trên rating (làm tròn)
  const fullStars = Math.round(tool.rating);
  const starsHtml = "⭐".repeat(Math.max(0, Math.min(5, fullStars)));

  // Danh mục hiện tại của tool (để hiển thị + tìm AI liên quan)
  const categoryInfo = currentCategories.find(cat => cat.slug === tool.category);
  const categoryLabel = categoryInfo ? (currentLang === "en" ? categoryInfo.labelEn : categoryInfo.labelVi) : tool.category;

  // Danh sách tag đơn giản: danh mục + loại giá + API (nếu có)
  const tagList = [categoryLabel, badgeLabel[tool.badge]];
  if (tool.hasApi) tagList.push(t("api_tag_label"));
  const tagsHtml = tagList.filter(Boolean).map(tag => `<span class="modal-tag">${tag}</span>`).join("");

  const listSectionHtml = (titleKey, items) => {
    if (!items || !items.length) return "";
    const rows = items.map(item => `<li>${localizedText(item)}</li>`).join("");
    return `
      <div class="tool-modal-section">
        <h4>${t(titleKey)}</h4>
        <ul class="modal-list">${rows}</ul>
      </div>`;
  };

  const usageHtml = tool.usage ? `
      <div class="tool-modal-section">
        <h4>${t("modal_usage")}</h4>
        <p>${localizedText(tool.usage)}</p>
      </div>` : "";

  // Noi dung chuyen sau (bai gioi thieu dai, so sanh, ai nen dung) lay tu articles.js
  // theo ten cong cu. Neu chua co du lieu cho AI nay, cac phan nay se an di
  // thay vi hien o trang trong (du lieu se duoc bo sung dan qua tung dot).
  const deep = (typeof aiArticles !== "undefined" && aiArticles[tool.name]) ? aiArticles[tool.name] : null;

  // Du lieu mo rong cho "trang landing rieng" cua AI nay (gia, danh muc,
  // AI thay the, FAQ, screenshot, SEO) - lay tu ai-pages-data.js. Chi mot
  // so AI uu tien co du lieu nay; neu chua co, cac phan lien quan se an di
  // giong nhu cach deep-dive article hoat dong o tren.
  const page = (typeof aiPagesData !== "undefined" && aiPagesData[tool.name]) ? aiPagesData[tool.name] : null;

  const pricingHtml = page && page.pricing && page.pricing.plans && page.pricing.plans.length ? `
      <div class="tool-modal-section">
        <h4>${t("modal_pricing")}</h4>
        <div class="modal-pricing-grid">
          ${page.pricing.plans.map(plan => `
            <div class="modal-pricing-card">
              <div class="modal-pricing-name">${localizedText(plan.name)}</div>
              <div class="modal-pricing-price">${typeof plan.price === "string" ? plan.price : localizedText(plan.price)}</div>
              <div class="modal-pricing-note">${localizedText(plan.note)}</div>
            </div>
          `).join("")}
        </div>
      </div>` : "";

  const categoryTagsHtml = page && page.categoryTags && page.categoryTags.length ? `
      <div class="tool-modal-section">
        <h4>${t("modal_categories")}</h4>
        <div class="modal-tags">
          ${page.categoryTags.map(slug => {
            const cat = currentCategories.find(c => c.slug === slug);
            if (!cat) return "";
            const label = currentLang === "en" ? cat.labelEn : cat.labelVi;
            return `<span class="modal-tag">${cat.icon || ""} ${label}</span>`;
          }).join("")}
        </div>
      </div>` : "";

  const alternativeTools = page && page.alternatives && page.alternatives.length
    ? page.alternatives.map(name => aiTools.find(item => item.name === name)).filter(Boolean)
    : [];
  const alternativesHtml = alternativeTools.length ? `
      <div class="tool-modal-section">
        <h4>${t("modal_alternatives")}</h4>
        <div class="related-tools-list">
          ${alternativeTools.map(item => `
            <button type="button" class="related-tool-item" data-tool-id="${item.id}">
              <span class="related-tool-icon">${item.icon}</span>
              <span class="related-tool-name">${item.name}</span>
              <span class="related-tool-rating">⭐ ${item.rating.toFixed(1)}</span>
            </button>
          `).join("")}
        </div>
      </div>` : "";

  // Prompt goi y: tinh tu du lieu Prompt Library (khong khai bao tay), loc
  // theo prompt co "ai" chua dung ten AI nay.
  const promptSource = (typeof DEFAULT_PROMPTS !== "undefined" && Array.isArray(DEFAULT_PROMPTS)) ? DEFAULT_PROMPTS
    : (typeof promptLibrary !== "undefined" && Array.isArray(promptLibrary)) ? promptLibrary : [];
  const recommendedPrompts = promptSource
    .filter(p => Array.isArray(p.ai) && p.ai.includes(tool.name))
    .slice(0, 4);
  const recommendedPromptsHtml = recommendedPrompts.length ? `
      <div class="tool-modal-section">
        <h4>${t("modal_recommended_prompts")}</h4>
        <div class="modal-prompt-list">
          ${recommendedPrompts.map(p => `
            <a class="modal-prompt-item" href="/prompts/${p.slug}">${p.title}</a>
          `).join("")}
        </div>
        <a class="modal-prompt-viewall" href="/prompts">${t("modal_recommended_prompts_view_all")}</a>
      </div>` : "";

  const screenshotsHtml = page && page.screenshots && page.screenshots.length ? `
      <div class="tool-modal-section">
        <h4>${t("modal_screenshots")}</h4>
        <div class="modal-screenshots-grid">
          ${page.screenshots.map(shot => `
            <div class="modal-screenshot-placeholder">
              <span class="modal-screenshot-icon">🖼️</span>
              <span class="modal-screenshot-label">${localizedText(shot.label)}</span>
            </div>
          `).join("")}
        </div>
        <p class="modal-screenshots-note">${t("modal_screenshots_placeholder")}</p>
      </div>` : "";

  const faqHtml = page && page.faq && page.faq.length ? `
      <div class="tool-modal-section">
        <h4>${t("modal_faq")}</h4>
        <div class="modal-faq-list">
          ${page.faq.map(item => `
            <details class="modal-faq-item">
              <summary>${localizedText(item.q)}</summary>
              <p>${localizedText(item.a)}</p>
            </details>
          `).join("")}
        </div>
      </div>` : "";

  const articleHtml = deep && deep.article ? `
      <div class="tool-modal-section tool-modal-article is-collapsed" id="toolArticleBlock">
        <h4>${t("modal_deepdive")}</h4>
        <div class="tool-modal-article-full">${localizedText(deep.article).split(/\n\s*\n/).map(p => `<p>${p.trim()}</p>`).join("")}</div>
        <button type="button" class="tool-modal-read-more-btn" id="toolArticleToggle">${t("modal_read_more")} ▾</button>
      </div>` : "";

  const comparisonHtml = deep && deep.comparison ? `
      <div class="tool-modal-section">
        <h4>${t("modal_comparison")}</h4>
        <p>${localizedText(deep.comparison)}</p>
      </div>` : "";

  const whoShouldUseHtml = deep && deep.whoShouldUse ? `
      <div class="tool-modal-section">
        <h4>${t("modal_who_should_use")}</h4>
        <p>${localizedText(deep.whoShouldUse)}</p>
      </div>` : "";

  const updatedNoteHtml = deep && deep.lastUpdated ? `
      <div class="tool-modal-updated-note">🔄 ${t("modal_updated_note")} (${deep.lastUpdated})</div>` : "";

  // AI liên quan: các tool cùng danh mục, đánh giá cao nhất, tối đa 4 mục
  const relatedTools = aiTools
    .filter(item => item.category === tool.category && item.id !== tool.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const relatedHtml = relatedTools.length ? `
    <div class="tool-modal-divider"></div>
    <div class="tool-modal-section">
      <h4>${t("modal_related")}</h4>
      <div class="related-tools-list">
        ${relatedTools.map(item => `
          <button type="button" class="related-tool-item" data-tool-id="${item.id}">
            <span class="related-tool-icon">${item.icon}</span>
            <span class="related-tool-name">${item.name}</span>
            <span class="related-tool-rating">⭐ ${item.rating.toFixed(1)}</span>
          </button>
        `).join("")}
      </div>
    </div>` : "";

  let overlay = document.getElementById("toolDetailModal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "toolDetailModal";
    overlay.className = "tool-modal-overlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", event => {
      if (event.target === overlay) closeToolDetailModal();
    });
  }

  overlay.innerHTML = `
    <div class="tool-modal">
      <button type="button" class="tool-modal-close" aria-label="${t("modal_close")}">✕</button>
      <div class="tool-modal-body">
        <div class="tool-modal-sidebar">
          <div class="tool-modal-header">
            <div class="tool-modal-image">
              <img class="tool-logo" data-fallback-icon="${tool.icon}"
                   src="${officialLogoUrl(tool.link)}"
                   alt="Logo ${tool.name}">
            </div>
            <div class="tool-modal-header-info">
              <span class="badge ${tool.badge}">${badgeLabel[tool.badge] || ""}</span>
              <h3>${tool.name}</h3>
              <div class="rating">${starsHtml} <span>${tool.rating.toFixed(1)}/5</span></div>
            </div>
          </div>
          <a class="btn btn-free tool-use-link" data-tool-id="${tool.id}" href="${tool.link}" target="_blank" rel="noopener">${t("modal_visit_website")}</a>
          <div class="tool-modal-section">
            <h4>${t("modal_tags")}</h4>
            <div class="modal-tags">${tagsHtml}</div>
          </div>
          <div class="tool-modal-section">
            <h4>${t("modal_official_site")}</h4>
            <a class="modal-official-link" href="${tool.link}" target="_blank" rel="noopener">${tool.link}</a>
          </div>
          ${updatedNoteHtml}
        </div>
        <div class="tool-modal-main">
          <p class="tool-modal-short-desc">${localizedText(tool.description)}</p>
          <div class="tool-modal-divider"></div>
          ${articleHtml}
          <div class="tool-modal-two-col">
            ${listSectionHtml("modal_features", tool.features)}
            <div>
              ${listSectionHtml("modal_pros", tool.pros)}
              ${listSectionHtml("modal_cons", tool.cons)}
            </div>
          </div>
          ${usageHtml}
          ${pricingHtml}
          ${categoryTagsHtml}
          ${comparisonHtml}
          ${whoShouldUseHtml}
          ${alternativesHtml}
          ${recommendedPromptsHtml}
          ${screenshotsHtml}
          ${faqHtml}
          ${relatedHtml}
        </div>
      </div>
    </div>
  `;

  overlay.querySelector(".tool-modal-close").addEventListener("click", closeToolDetailModal);
  overlay.querySelector(".tool-logo").addEventListener("error", event => {
    const span = document.createElement("span");
    span.style.fontSize = "48px";
    span.textContent = event.target.dataset.fallbackIcon;
    event.target.replaceWith(span);
  }, { once: true });
  overlay.querySelector(".tool-use-link").addEventListener("click", () => {
    const newCount2 = incrementViews(tool.id);  // +1 lượt xem khi bấm dùng ngay
    const viewsEl2 = overlay.querySelector(`.views-count[data-views-id="${tool.id}"] span`);
    if (viewsEl2) viewsEl2.textContent = formatViews(newCount2);

    if (window.trackEvent) {
      window.trackEvent("ai_visit_website", {
        ai_name: tool.name,
        ai_slug: tool.slug,
        category: tool.category
      });
    }
  });
  overlay.querySelectorAll(".related-tool-item").forEach(item => {
    item.addEventListener("click", () => {
      openToolDetailModal(Number(item.dataset.toolId));
    });
  });

  const articleToggleBtn = overlay.querySelector("#toolArticleToggle");
  if (articleToggleBtn) {
    articleToggleBtn.addEventListener("click", () => {
      const block = overlay.querySelector("#toolArticleBlock");
      const collapsed = block.classList.toggle("is-collapsed");
      articleToggleBtn.textContent = collapsed ? `${t("modal_read_more")} ▾` : `${t("modal_read_less")} ▴`;
    });
  }

  overlay.classList.add("is-open");
  document.body.classList.add("modal-open");
  overlay.querySelector(".tool-modal").scrollTop = 0;
  document.addEventListener("keydown", handleModalEscape);
}

function closeToolDetailModal() {
  const overlay = document.getElementById("toolDetailModal");
  if (overlay) overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", handleModalEscape);
}

function handleModalEscape(event) {
  if (event.key === "Escape") closeToolDetailModal();
}

// ---------- SIDEBAR: VẼ LẠI DANH SÁCH DANH MỤC TỪ DỮ LIỆU ----------
// Mục "Tất cả AI" luôn cố định; các danh mục còn lại được vẽ động từ
// currentCategories (mặc định trong data.js, hoặc được Firebase ghi đè).
function renderCategorySidebar() {
  const listEl = document.getElementById("categorySidebarList");
  if (!listEl) return;

  const allItem = listEl.querySelector('li[data-category="all"]');
  listEl.innerHTML = "";
  if (allItem) listEl.appendChild(allItem);

  currentCategories.forEach(cat => {
    const li = document.createElement("li");
    li.dataset.category = cat.slug;
    const label = localizedText({ vi: cat.labelVi, en: cat.labelEn }) || cat.slug;
    li.textContent = cat.icon ? `${cat.icon} ${label}` : label;
    listEl.appendChild(li);
  });

  // sidebarItems là danh sách chụp tại 1 thời điểm (không tự cập nhật) nên
  // phải lấy lại + gắn lại sự kiện click mỗi khi vẽ lại danh mục.
  sidebarItems = document.querySelectorAll(".sidebar li[data-category]");
  bindSidebarItemEvents();

  clearSidebarActive();
  const activeItem =
    document.querySelector(`.sidebar li[data-category="${currentCategory}"]`) ||
    document.querySelector('.sidebar li[data-category="all"]');
  if (activeItem) activeItem.classList.add("active");
}

// ---------- SIDEBAR: LỌC DANH MỤC ----------
function bindSidebarItemEvents() {
  sidebarItems.forEach(li => {
    li.addEventListener("click", () => {
      clearSidebarActive();
      li.classList.add("active");
      currentCategory = li.dataset.category;
      specialFilter = null;
      searchInput.value = "";
      renderTools();
      showSection("tools");
      sidebarPanel.classList.remove("sidebar-open");
    });
  });
}
bindSidebarItemEvents();

// ---------- TÌM KIẾM ----------
searchBtn.addEventListener("click", renderTools);
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderTools();
  searchInput.focus();
});
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") renderTools();
  else renderTools();

  if (window.trackEventDebounced) {
    const keyword = searchInput.value.trim();
    if (keyword) {
      window.trackEventDebounced("ai-search", "site_search", {
        search_term: keyword,
        search_source: "ai_tools"
      });
    }
  }
});

// ---------- TRACKING: ai_visit_website cho nút "Dùng ngay" ở khu vực
// Top 3 (podium) và Bảng xếp hạng (ranking) — 2 khu vực này không bind
// listener riêng theo từng lần render như lưới chính, nên dùng 1 listener
// gắn 1 lần trên document (event delegation) để không bỏ sót và không phải
// gắn lại mỗi khi renderTrending()/renderRanking() vẽ lại DOM. ----------
document.addEventListener("click", e => {
  if (!window.trackEvent) return;
  const link = e.target.closest(".podium-link, .ranking-link");
  if (!link) return;
  let tool = null;
  if (link.dataset.toolId) {
    tool = aiTools.find(item => item.id === Number(link.dataset.toolId));
  }
  if (!tool) {
    const href = link.getAttribute("href");
    tool = aiTools.find(item => item.link === href);
  }
  if (!tool) return;
  window.trackEvent("ai_visit_website", {
    ai_name: tool.name,
    ai_slug: tool.slug,
    category: tool.category
  });
});

sortTools.addEventListener("change", renderTools);

// ---------- BỘ LỌC NÂNG CAO ----------
if (advFilterToggleBtn && advFilterPanel) {
  advFilterToggleBtn.addEventListener("click", () => {
    const isOpen = advFilterPanel.classList.toggle("open");
    advFilterPanel.classList.toggle("hidden", !isOpen);
    advFilterToggleBtn.setAttribute("aria-expanded", String(isOpen));
    advFilterToggleBtn.classList.toggle("active", isOpen);
  });
}

document.querySelectorAll(".adv-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const type = chip.dataset.filterType;
    const value = chip.dataset.filterValue;

    if (type === "api") {
      advFilters.api = !advFilters.api;
      chip.classList.toggle("active", advFilters.api);
    } else {
      const set = advFilters[type];
      if (set.has(value)) {
        set.delete(value);
        chip.classList.remove("active");
      } else {
        set.add(value);
        chip.classList.add("active");
      }
    }
    renderTools();
  });
});

if (advFilterClearBtn) {
  advFilterClearBtn.addEventListener("click", () => {
    advFilters = { price: new Set(), api: false, category: new Set() };
    document.querySelectorAll(".adv-chip").forEach(chip => chip.classList.remove("active"));
    renderTools();
  });
}

// ---------- THEME (Space AI / Future Lab) ----------
const THEME_STORAGE_KEY = "siteTheme";
const themeIcons = { space: "🧪", future: "🌌" };
const themeMetaColors = { space: "#050816", future: "#F3F6FC" };
const themeColorTag = document.getElementById("themeColorMeta");

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "future" ? "future" : "space";
}

function refreshThemeButtonLabel() {
  if (!themeToggleBtn) return;
  const theme = currentTheme();
  const nextTheme = theme === "space" ? "future" : "space";
  themeToggleBtn.textContent = themeIcons[theme];
  const label = t(nextTheme === "future" ? "theme_switch_to_future" : "theme_switch_to_space");
  themeToggleBtn.setAttribute("aria-label", label);
  themeToggleBtn.title = label;
}

function applyTheme(theme, opts) {
  const settings = opts || {};
  const root = document.documentElement;

  if (!settings.skipTransition) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 700);
  }

  root.setAttribute("data-theme", theme);
  if (themeColorTag) themeColorTag.setAttribute("content", themeMetaColors[theme] || themeMetaColors.space);
  refreshThemeButtonLabel();
  window.dispatchEvent(new CustomEvent("sitethemechange", { detail: { theme } }));
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const next = currentTheme() === "space" ? "future" : "space";
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  });
}

function applyCompactMode(isCompact) {
  document.body.classList.toggle("compact", isCompact);
  const label = t(isCompact ? "compact_off" : "compact_on");
  compactModeBtn.setAttribute("aria-label", label);
  compactModeBtn.title = label;
}

compactModeBtn.addEventListener("click", () => {
  const isCompact = !document.body.classList.contains("compact");
  applyCompactMode(isCompact);
  localStorage.setItem("compactMode", isCompact ? "1" : "0");
});

window.addEventListener("scroll", () => {
  backToTopBtn.classList.toggle("show", window.scrollY > 500);
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Khôi phục theme & compact mode đã lưu (theme attribute was already set
// pre-paint by the inline script in <head>; this just syncs the button UI).
applyTheme(currentTheme(), { skipTransition: true });
applyCompactMode(localStorage.getItem("compactMode") === "1");

// ---------- KHỞI CHẠY ----------
document.addEventListener("DOMContentLoaded", () => {
  // Vẽ danh sách danh mục (mặc định "Tất cả AI" sẽ tự được đánh dấu active)
  renderCategorySidebar();

  // Khôi phục ngôn ngữ đã lưu
  langSelect.value = supportedLanguages.includes(currentLang) ? currentLang : "en";
  applyTranslations();

  renderKnowledge();
  renderGuide();
  renderTools();
  renderProfession();
  renderRanking();
  renderTrending();
  showSection("tools");

  // ---------- ĐIỀU HƯỚNG TRỰC TIẾP QUA URL: /ai/<slug> ----------
  // Cho phép mở thẳng trang chi tiết 1 AI (vd: tải lại trang, chia sẻ link,
  // hoặc Googlebot crawl trang tĩnh /ai/<slug>/index.html do
  // scripts/generate-ai-pages.js sinh ra) và tự động mở đúng modal chi
  // tiết của AI đó ngay khi trang tải xong.
  const aiRouteMatch = location.pathname.replace(/\/$/, "").match(/^\/ai\/([^/]+)$/);
  if (aiRouteMatch) {
    const routeTool = aiTools.find(item => item.slug === aiRouteMatch[1]);
    if (routeTool) openToolDetailModal(routeTool.id);
  }

  // Hide loading screen
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
    }, 500);
  }
});

// Also hide loading if content takes more than 3 seconds
window.addEventListener("load", function() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
  }
});

// Timeout fallback
setTimeout(() => {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
  }
}, 3000);


// =======================================
// ĐỒNG BỘ DANH SÁCH CÔNG CỤ & DANH MỤC QUA FIREBASE
// =======================================
// Firebase Realtime Database là nguồn dữ liệu chính cho "tools" và
// "categories". Khi Admin thêm/sửa/xóa trong Admin Panel, dữ liệu được ghi
// thẳng lên Firebase, và mọi trình duyệt đang mở website (kể cả không phải
// Admin) sẽ tự nhận thay đổi này ngay lập tức nhờ `.on("value", ...)` bên
// dưới — không cần tải lại trang.
//
// Nếu node "tools"/"categories" trên Firebase còn TRỐNG (chưa từng bấm
// "Nhập dữ liệu mặc định lên Firebase" trong tab Dashboard của Admin), hoặc
// chưa cấu hình Firebase, website vẫn hiển thị bộ công cụ/danh mục mặc định
// có sẵn trong data.js để không bị trống trang.
function applyToolsFromFirebase(toolsObj) {
  const toolsArray = toolsObj ? Object.values(toolsObj) : [];
  if (toolsArray.length === 0) return; // Firebase "tools" trống -> giữ dữ liệu mặc định

  aiTools.length = 0;
  toolsArray.forEach(tool => aiTools.push(tool));
}

if (firebaseDb) {
  firebaseDb.ref("categories").on("value", (snapshot) => {
    applyCategoriesFromFirebase(snapshot.val());
    renderCategorySidebar();
    renderTools();
  });

  firebaseDb.ref("tools").on("value", (snapshot) => {
    applyToolsFromFirebase(snapshot.val());
    renderTools();
    renderRanking();
    renderTrending();
  });
}

