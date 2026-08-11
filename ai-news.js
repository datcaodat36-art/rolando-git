// =======================================
// 🗞️ AI NEWS — tự động lấy & hiển thị tin tức AI mới nhất
// Gọi API /api/ai-news (Vercel serverless function, xem /api/ai-news.js).
// Có cache localStorage để trang KHÔNG BAO GIỜ trắng nếu API tạm lỗi.
// =======================================
(function () {
  "use strict";

  const API_URL = "/api/ai-news?limit=100";
  const LOCAL_CACHE_KEY = "aiNewsLocalCache";
  const PAGE_SIZE = 12;

  const STRINGS = {
    vi: {
      loading: "Đang tải tin tức AI mới nhất...",
      empty: "Không tìm thấy tin nào khớp với bộ lọc hiện tại.",
      error: "Không thể tải tin mới lúc này. Đang hiển thị tin đã lưu gần nhất.",
      errorNoCache: "Không thể tải tin lúc này, vui lòng thử lại sau.",
      retry: "🔄 Thử lại",
      readMore: "Đọc tiếp →",
      justNow: "Vừa xong",
      minutesAgo: n => `${n} phút trước`,
      hoursAgo: n => `${n} giờ trước`,
      daysAgo: n => `${n} ngày trước`,
      resultsCount: n => `${n} tin`,
      showMore: "Xem thêm tin"
    },
    en: {
      loading: "Loading the latest AI news...",
      empty: "No news matches the current filter.",
      error: "Couldn't load fresh news right now. Showing the latest saved copy.",
      errorNoCache: "Couldn't load news right now. Please try again later.",
      retry: "🔄 Retry",
      readMore: "Read more →",
      justNow: "Just now",
      minutesAgo: n => `${n}m ago`,
      hoursAgo: n => `${n}h ago`,
      daysAgo: n => `${n}d ago`,
      resultsCount: n => `${n} articles`,
      showMore: "Show more"
    }
  };

  function lang() {
    const l = document.documentElement.lang;
    return STRINGS[l] ? l : "en";
  }
  function s() {
    return STRINGS[lang()];
  }

  let els = {};
  let bound = false;

  let allItems = [];
  let currentFilter = "all";
  let currentQuery = "";
  let visibleCount = PAGE_SIZE;
  let loading = false;
  let isOffline = false;
  let hasLoadedOnce = false;
  let searchDebounceTimer = null;

  function grabEls() {
    els = {
      grid: document.getElementById("aiNewsGrid"),
      status: document.getElementById("aiNewsStatus"),
      searchInput: document.getElementById("aiNewsSearchInput"),
      searchClear: document.getElementById("aiNewsSearchClear"),
      refreshBtn: document.getElementById("aiNewsRefreshBtn"),
      filters: document.getElementById("aiNewsFilters"),
      resultsCount: document.getElementById("aiNewsResultsCount"),
      offlineBadge: document.getElementById("aiNewsOfflineBadge"),
      showMoreBtn: document.getElementById("aiNewsShowMoreBtn")
    };
  }

  // ---------- Cache cục bộ (localStorage) — hàng rào cuối cùng chống trang trắng ----------
  function readLocalCache() {
    try {
      const raw = localStorage.getItem(LOCAL_CACHE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function writeLocalCache(items, fetchedAt) {
    try {
      localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify({ items, fetchedAt }));
    } catch {
      // localStorage đầy hoặc bị chặn -> bỏ qua, không ảnh hưởng chức năng chính
    }
  }

  // ---------- Định dạng thời gian tương đối ----------
  function timeAgo(iso) {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return s().justNow;
    if (mins < 60) return s().minutesAgo(mins);
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return s().hoursAgo(hrs);
    const days = Math.floor(hrs / 24);
    return s().daysAgo(days);
  }

  function escapeHtml(str) {
    return (str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------- Render ----------
  function getFiltered() {
    let items = allItems;
    if (currentFilter !== "all") {
      items = items.filter(it => it.category === currentFilter);
    }
    if (currentQuery.trim()) {
      const q = currentQuery.trim().toLowerCase();
      items = items.filter(
        it =>
          (it.title || "").toLowerCase().includes(q) ||
          (it.description || "").toLowerCase().includes(q) ||
          (it.source || "").toLowerCase().includes(q)
      );
    }
    return items;
  }

  function cardHtml(item) {
    const img = item.image
      ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy" onerror="this.closest('.ai-news-card-img').classList.add('ai-news-img-fallback')">`
      : "";
    return `
      <article class="ai-news-card">
        <a class="ai-news-card-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" data-news-id="${escapeHtml(item.id)}">
          <div class="ai-news-card-img ${item.image ? "" : "ai-news-img-fallback"}">${img}<span class="ai-news-card-fallback-icon">🗞️</span></div>
          <div class="ai-news-card-body">
            <div class="ai-news-card-top">
              <span class="ai-news-card-source">${escapeHtml(item.source)}</span>
              <span class="ai-news-card-time">${timeAgo(item.publishedAt)}</span>
            </div>
            <h3 class="ai-news-card-title">${escapeHtml(item.title)}</h3>
            <p class="ai-news-card-desc">${escapeHtml(item.description)}</p>
            <span class="ai-news-card-readmore">${s().readMore}</span>
          </div>
        </a>
      </article>`;
  }

  function render() {
    if (!els.grid) return;
    const filtered = getFiltered();
    const visible = filtered.slice(0, visibleCount);

    if (els.resultsCount) els.resultsCount.textContent = s().resultsCount(filtered.length);

    if (loading && allItems.length === 0) {
      els.grid.innerHTML = "";
      showStatus(s().loading, "loading");
      if (els.showMoreBtn) els.showMoreBtn.classList.add("hidden");
      return;
    }

    if (filtered.length === 0) {
      els.grid.innerHTML = "";
      showStatus(s().empty, "empty");
      if (els.showMoreBtn) els.showMoreBtn.classList.add("hidden");
      return;
    }

    hideStatus();
    els.grid.innerHTML = visible.map(cardHtml).join("");

    els.grid.querySelectorAll(".ai-news-card-link").forEach(a => {
      a.addEventListener("click", () => {
        if (window.trackEvent) {
          try {
            window.trackEvent("ai_news_click", { news_id: a.dataset.newsId, news_url: a.getAttribute("href") });
          } catch {}
        }
      });
    });

    if (els.showMoreBtn) {
      els.showMoreBtn.classList.toggle("hidden", visible.length >= filtered.length);
      els.showMoreBtn.textContent = s().showMore;
    }

    if (els.offlineBadge) els.offlineBadge.classList.toggle("hidden", !isOffline);
  }

  function showStatus(message, kind) {
    if (!els.status) return;
    els.status.classList.remove("hidden");
    els.status.className = "ai-news-status ai-news-status-" + kind;
    if (kind === "error") {
      els.status.innerHTML = `<p>${escapeHtml(message)}</p><button type="button" class="ai-news-retry-btn">${s().retry}</button>`;
      const btn = els.status.querySelector(".ai-news-retry-btn");
      if (btn) btn.addEventListener("click", () => fetchNews(true));
    } else {
      els.status.innerHTML = `<p>${escapeHtml(message)}</p>`;
    }
  }

  function hideStatus() {
    if (els.status) els.status.classList.add("hidden");
  }

  // ---------- Fetch dữ liệu ----------
  async function fetchNews(isRetry) {
    if (loading) return;
    loading = true;
    if (allItems.length === 0) render(); // hiện trạng thái loading nếu chưa có gì để hiện

    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "API error");

      if (data.items && data.items.length > 0) {
        allItems = data.items;
        isOffline = false;
        writeLocalCache(allItems, data.fetchedAt || new Date().toISOString());
      } else if (allItems.length === 0) {
        // API chạy nhưng không có bài nào (hiếm) -> thử cache cục bộ
        const cached = readLocalCache();
        if (cached && cached.items && cached.items.length > 0) {
          allItems = cached.items;
          isOffline = true;
        }
      }
    } catch (err) {
      // API lỗi -> dùng cache cục bộ nếu có, không để trang trắng
      const cached = readLocalCache();
      if (cached && cached.items && cached.items.length > 0) {
        allItems = cached.items;
        isOffline = true;
        showStatus(s().error, "error");
      } else {
        showStatus(s().errorNoCache, "error");
      }
    } finally {
      loading = false;
      hasLoadedOnce = true;
      render();
    }
  }

  // ---------- Sự kiện UI ----------
  function bindEvents() {
    if (bound) return;
    bound = true;

    if (els.searchInput) {
      els.searchInput.addEventListener("input", () => {
        currentQuery = els.searchInput.value;
        if (els.searchClear) els.searchClear.classList.toggle("hidden", !currentQuery);
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
          visibleCount = PAGE_SIZE;
          render();
        }, 250);
      });
    }
    if (els.searchClear) {
      els.searchClear.addEventListener("click", () => {
        currentQuery = "";
        els.searchInput.value = "";
        els.searchClear.classList.add("hidden");
        visibleCount = PAGE_SIZE;
        render();
      });
    }
    if (els.filters) {
      els.filters.querySelectorAll(".ai-news-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          els.filters.querySelectorAll(".ai-news-filter-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          currentFilter = btn.dataset.filter;
          visibleCount = PAGE_SIZE;
          render();
        });
      });
    }
    if (els.showMoreBtn) {
      els.showMoreBtn.addEventListener("click", () => {
        visibleCount += PAGE_SIZE;
        render();
      });
    }
    if (els.refreshBtn) {
      els.refreshBtn.addEventListener("click", () => {
        if (loading) return;
        els.refreshBtn.classList.add("ai-news-spin");
        fetchNews(true).finally(() => {
          setTimeout(() => els.refreshBtn.classList.remove("ai-news-spin"), 600);
        });
      });
    }
  }

  // ---------- API công khai cho script.js ----------
  function onShow() {
    grabEls();
    bindEvents();

    if (!hasLoadedOnce) {
      // Hiện ngay cache cục bộ (nếu có) trong lúc chờ dữ liệu mới -> không bao giờ trắng trang
      const cached = readLocalCache();
      if (cached && cached.items && cached.items.length > 0) {
        allItems = cached.items;
        isOffline = true;
        render();
      }
      fetchNews(false);
    } else {
      render();
    }
  }

  function onLangChange() {
    if (els.grid) render();
  }

  window.AINews = { onShow, onLangChange };
})();
