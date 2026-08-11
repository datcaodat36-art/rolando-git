// =======================================
// AI BATTLE ARENA - battle.js
// Toan bo du lieu hien thi (ten, logo, mo ta, gia, API, danh gia,
// pros/cons...) duoc lay truc tiep tu `aiTools` (data.js). Diem so tieu
// chi va tong diem duoc tinh boi battle-data.js (BattleData), khong co
// con so nao duoc go cung trong file nay.
// =======================================

(function () {
  "use strict";

  // ---------- CHO DOM SAN SANG (script nay load sau script.js) ----------
  document.addEventListener("DOMContentLoaded", init);

  // ---------- STATE ----------
  const state = {
    slotA: null, // tool object
    slotB: null,
    pickerTarget: null, // "a" | "b"
    pickerCategory: "all",
    votedBattles: new Set(JSON.parse(localStorage.getItem("battleVoted") || "[]")),
    historyRendered: false,
    trendingRendered: false,
    rankingRendered: false,
    routedFromUrl: false
  };

  // Cac tran dau "hat giong" de khu Trending khong bi trong voi nguoi
  // dung moi - deu la cac AI CO THAT trong database (chi la goi y ban dau,
  // trong so duoc cong don voi luot vote/xem that su qua localStorage).
  const TRENDING_SEED = [
    ["openai", "claude"], ["openai", "gemini"], ["claude", "gemini"],
    ["midjourney", "dalle"], ["runway", "sora"], ["githubcopilot", "cursor"],
    ["deepseek", "openai"], ["grok", "claude"]
  ];

  let els = {};

  function qs(id) { return document.getElementById(id); }

  function init() {
    els = {
      section: qs("battle-section"),
      slotA: qs("battleSlotA"),
      slotB: qs("battleSlotB"),
      logoA: qs("battleLogoA"),
      logoB: qs("battleLogoB"),
      nameA: qs("battleNameA"),
      nameB: qs("battleNameB"),
      placeholderA: qs("battlePlaceholderA"),
      placeholderB: qs("battlePlaceholderB"),
      scoreA: qs("battleScoreA"),
      scoreB: qs("battleScoreB"),
      randomBtn: qs("battleRandomBtn"),
      shareBtn: qs("battleShareBtn"),
      resetBtn: qs("battleResetBtn"),
      picker: qs("battlePicker"),
      pickerClose: qs("battlePickerClose"),
      pickerSearch: qs("battlePickerSearch"),
      pickerCats: qs("battlePickerCats"),
      pickerGrid: qs("battlePickerGrid"),
      pickerTitle: qs("battlePickerTitle"),
      results: qs("battleResults"),
      winnerBanner: qs("battleWinnerBanner"),
      compareGrid: qs("battleCompareGrid"),
      radarContainer: qs("battleRadarContainer"),
      infoGrid: qs("battleInfoGrid"),
      pcGrid: qs("battleProsConsGrid"),
      voteBox: qs("battleVoteBox"),
      shareBox: qs("battleShareBox"),
      trendingList: qs("battleTrendingList"),
      historyList: qs("battleHistoryList"),
      rankingList: qs("battleRankingList"),
      confetti: qs("battleConfettiCanvas")
    };

    if (!els.section || typeof aiTools === "undefined" || typeof BattleData === "undefined") return;

    bindEvents();
    tryRouteFromUrl();
  }

  // ---------- SU KIEN ----------
  function bindEvents() {
    els.slotA.addEventListener("click", () => openPicker("a"));
    els.slotB.addEventListener("click", () => openPicker("b"));
    els.pickerClose.addEventListener("click", closePicker);
    els.picker.addEventListener("click", e => { if (e.target === els.picker) closePicker(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !els.picker.classList.contains("hidden")) closePicker(); });
    els.pickerSearch.addEventListener("input", renderPickerGrid);
    els.randomBtn.addEventListener("click", randomBattle);
    els.resetBtn.addEventListener("click", resetBattle);
    window.addEventListener("popstate", tryRouteFromUrl);
  }

  // ---------- PICKER ----------
  function openPicker(slot) {
    state.pickerTarget = slot;
    state.pickerCategory = "all";
    els.pickerTitle.textContent = t("battle_pick_title");
    els.pickerSearch.value = "";
    renderPickerCats();
    renderPickerGrid();
    els.picker.classList.remove("hidden");
    setTimeout(() => els.pickerSearch.focus(), 50);
  }
  function closePicker() {
    els.picker.classList.add("hidden");
    state.pickerTarget = null;
  }

  function renderPickerCats() {
    const cats = [{ slug: "all", icon: "🔥", labelVi: "Tất cả", labelEn: "All" }].concat(
      (typeof currentCategories !== "undefined" ? currentCategories : [])
    );
    els.pickerCats.innerHTML = cats.map(c => `
      <button type="button" class="battle-picker-cat ${state.pickerCategory === c.slug ? "active" : ""}" data-cat="${c.slug}">
        ${c.icon} ${currentLang === "en" ? c.labelEn : c.labelVi}
      </button>
    `).join("");
    els.pickerCats.querySelectorAll(".battle-picker-cat").forEach(btn => {
      btn.addEventListener("click", () => {
        state.pickerCategory = btn.dataset.cat;
        renderPickerCats();
        renderPickerGrid();
      });
    });
  }

  function renderPickerGrid() {
    const keyword = els.pickerSearch.value.trim().toLowerCase();
    const otherTool = state.pickerTarget === "a" ? state.slotB : state.slotA;
    let list = aiTools.filter(tool => {
      if (otherTool && tool.id === otherTool.id) return false; // khong cho chon trung
      const matchCat = state.pickerCategory === "all" || tool.category === state.pickerCategory;
      const matchSearch = !keyword || tool.name.toLowerCase().includes(keyword);
      return matchCat && matchSearch;
    });
    list = list.slice(0, 60); // gioi han render de muot, nguoi dung go tim de thu hep

    if (list.length === 0) {
      els.pickerGrid.innerHTML = `<div class="battle-pc-empty">${t("empty_search")}</div>`;
      return;
    }

    els.pickerGrid.innerHTML = list.map(tool => `
      <button type="button" class="battle-picker-item" data-id="${tool.id}">
        ${logoImgHtml(tool, "")}
        <span>${tool.name}</span>
      </button>
    `).join("");
    bindLogoFallback(els.pickerGrid);
    els.pickerGrid.querySelectorAll(".battle-picker-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const tool = aiTools.find(x => x.id === Number(btn.dataset.id));
        if (!tool) return;
        selectTool(state.pickerTarget, tool);
        closePicker();
      });
    });
  }

  // ---------- LOGO HELPER (giong pattern dung o Bang xep hang) ----------
  function logoImgHtml(tool, extraClass) {
    return `<img class="${extraClass}" data-fallback-icon="${tool.icon}" src="${officialLogoUrl(tool.link)}" alt="Logo ${tool.name}">`;
  }
  function bindLogoFallback(container) {
    container.querySelectorAll("img[data-fallback-icon]").forEach(img => {
      img.addEventListener("error", () => {
        const span = document.createElement("span");
        span.style.fontSize = "26px";
        span.textContent = img.dataset.fallbackIcon;
        img.replaceWith(span);
      }, { once: true });
    });
  }

  // ---------- CHON AI VAO O ----------
  function selectTool(slot, tool) {
    if (slot === "a") state.slotA = tool; else state.slotB = tool;
    renderSlot(slot);
    if (state.slotA && state.slotB) {
      renderResults();
      pushHistoryEntry(state.slotA, state.slotB);
      updateUrlAndSeo(state.slotA, state.slotB);
    } else {
      els.results.classList.add("hidden");
    }
  }

  function renderSlot(slot) {
    const tool = slot === "a" ? state.slotA : state.slotB;
    const slotEl = slot === "a" ? els.slotA : els.slotB;
    const logoEl = slot === "a" ? els.logoA : els.logoB;
    const nameEl = slot === "a" ? els.nameA : els.nameB;
    const scoreEl = slot === "a" ? els.scoreA : els.scoreB;

    slotEl.classList.remove("is-winner");
    if (!tool) {
      slotEl.classList.remove("is-filled");
      nameEl.textContent = "";
      scoreEl.textContent = "";
      logoEl.removeAttribute("src");
      return;
    }
    slotEl.classList.add("is-filled");
    logoEl.src = officialLogoUrl(tool.link);
    logoEl.alt = "Logo " + tool.name;
    logoEl.onerror = () => { logoEl.style.display = "none"; };
    nameEl.textContent = tool.name;
    const stats = BattleData.getBattleStats(tool);
    scoreEl.textContent = t("battle_total_score") + ": " + stats.total + "/100";
  }

  // ---------- RANDOM BATTLE ----------
  function randomBattle() {
    const shuffled = [...aiTools].sort(() => Math.random() - 0.5);
    state.slotA = shuffled[0];
    state.slotB = shuffled[1];
    renderSlot("a");
    renderSlot("b");
    renderResults();
    pushHistoryEntry(state.slotA, state.slotB);
    updateUrlAndSeo(state.slotA, state.slotB);
    els.results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- LAM LAI ----------
  function resetBattle() {
    state.slotA = null;
    state.slotB = null;
    renderSlot("a");
    renderSlot("b");
    els.results.classList.add("hidden");
    els.shareBtn.disabled = true;
    if (location.pathname.indexOf("/battle/") === 0) {
      history.pushState({}, "", "/");
    }
    resetSeoMeta();
  }

  // ---------- KET QUA TRAN DAU ----------
  function renderResults() {
    const a = state.slotA, b = state.slotB;
    const sa = BattleData.getBattleStats(a);
    const sb = BattleData.getBattleStats(b);

    if (window.trackEvent) {
      window.trackEvent("ai_battle_start", {
        ai_slug_a: a.slug,
        ai_slug_b: b.slug
      });
    }

    els.results.classList.remove("hidden");
    els.shareBtn.disabled = false;

    // Winner banner
    let winner = null;
    if (sa.total > sb.total) winner = "a";
    else if (sb.total > sa.total) winner = "b";
    else if (a.rating !== b.rating) winner = a.rating > b.rating ? "a" : "b";

    els.slotA.classList.toggle("is-winner", winner === "a");
    els.slotB.classList.toggle("is-winner", winner === "b");

    if (winner) {
      const winnerTool = winner === "a" ? a : b;
      const winnerScore = winner === "a" ? sa.total : sb.total;
      els.winnerBanner.className = "battle-winner-banner";
      els.winnerBanner.innerHTML = `🏆 ${escapeHtml(winnerTool.name)} ${t("battle_wins")} — ${winnerScore}/100`;
    } else {
      els.winnerBanner.className = "battle-winner-banner is-tie";
      els.winnerBanner.textContent = "🤝 " + t("battle_tie");
    }

    if (window.trackEvent) {
      window.trackEvent("ai_battle_complete", {
        ai_slug_a: a.slug,
        ai_slug_b: b.slug,
        winner_slug: winner === "a" ? a.slug : winner === "b" ? b.slug : "tie"
      });
    }

    renderCompareGrid(a, b, sa, sb);
    renderRadar(a, b, sa, sb);
    renderInfoGrid(a, b);
    renderProsCons(a, b);
    renderVoteBox(a, b);
    renderShareBox(a, b);
  }

  function renderCompareGrid(a, b, sa, sb) {
    els.compareGrid.innerHTML = BattleData.CRITERIA.map(c => {
      const va = sa.scores[c.key], vb = sb.scores[c.key];
      const winCls = va > vb ? "crit-win-a" : (vb > va ? "crit-win-b" : "");
      return `
      <div class="battle-crit-row ${winCls}" data-key="${c.key}">
        <div>
          <div class="battle-bar-track side-a"><div class="battle-bar-fill side-a" data-target="${va}"></div></div>
          <span class="battle-crit-score a">${va}</span>
        </div>
        <div class="battle-crit-label">${c.icon} ${currentLang === "en" ? c.en : c.vi}</div>
        <div>
          <div class="battle-bar-track side-b"><div class="battle-bar-fill side-b" data-target="${vb}"></div></div>
          <span class="battle-crit-score b">${vb}</span>
        </div>
      </div>`;
    }).join("") + `<p class="battle-disclaimer">${t("battle_disclaimer")}</p>`;

    // Animate progress bars (Progress Count effect)
    requestAnimationFrame(() => {
      els.compareGrid.querySelectorAll(".battle-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.target + "%";
      });
    });
  }

  // ---------- RADAR CHART (SVG thuan, khong phu thuoc thu vien ngoai) ----------
  function renderRadar(a, b, sa, sb) {
    const size = 340;
    const center = size / 2;
    const radius = size / 2 - 46;
    const n = BattleData.CRITERIA.length;
    const angleStep = (Math.PI * 2) / n;

    function pointFor(index, value) {
      const angle = -Math.PI / 2 + index * angleStep;
      const r = (value / 100) * radius;
      return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
    }
    function polygon(scores) {
      return BattleData.CRITERIA.map((c, i) => pointFor(i, scores[c.key]).join(",")).join(" ");
    }

    // Vong tron luoi + truc + nhan
    let grid = "";
    [0.25, 0.5, 0.75, 1].forEach(f => {
      const pts = BattleData.CRITERIA.map((c, i) => pointFor(i, f * 100).join(",")).join(" ");
      grid += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
    });
    let axes = "", labels = "";
    BattleData.CRITERIA.forEach((c, i) => {
      const [x, y] = pointFor(i, 100);
      axes += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
      const [lx, ly] = pointFor(i, 118);
      labels += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#a9b0d6">${c.icon}</text>`;
    });

    const polyA = polygon(sa.scores);
    const polyB = polygon(sb.scores);

    els.radarContainer.innerHTML = `
      <svg viewBox="0 0 ${size + 40} ${size}" width="${size + 40}" height="${size}">
        <g transform="translate(20,0)">
          ${grid}
          ${axes}
          <polygon points="${polyA}" fill="rgba(124,92,255,.28)" stroke="#7c5cff" stroke-width="2"/>
          <polygon points="${polyB}" fill="rgba(0,229,255,.22)" stroke="#00e5ff" stroke-width="2"/>
          ${labels}
        </g>
      </svg>
      <div class="battle-radar-legend" style="display:flex;gap:18px;justify-content:center;margin-top:10px;font-size:12.5px;color:var(--battle-text-dim);">
        <span>🟣 ${escapeHtml(a.name)}</span>
        <span>🔵 ${escapeHtml(b.name)}</span>
      </div>
    `;
  }

  // ---------- THONG TIN CO BAN ----------
  function renderInfoGrid(a, b) {
    els.infoGrid.innerHTML = [a, b].map(tool => `
      <div class="battle-info-card">
        <h4>${logoImgHtml(tool, "")} ${escapeHtml(tool.name)}</h4>
        <div class="battle-info-row"><span class="lbl">${t("battle_info_price")}</span><span class="val">${priceLabel(tool)}</span></div>
        <div class="battle-info-row"><span class="lbl">${t("battle_info_api")}</span><span class="val">${tool.hasApi ? "✅ " + t("battle_yes") : "❌ " + t("battle_no")}</span></div>
        <div class="battle-info-row"><span class="lbl">${t("battle_info_rating")}</span><span class="val">⭐ ${tool.rating.toFixed(1)}/5</span></div>
        <div class="battle-info-row"><span class="lbl">${t("battle_info_category")}</span><span class="val">${t("cat_" + tool.category)}</span></div>
        <div class="battle-info-row"><span class="lbl">${t("battle_info_dev")}</span><span class="val">${BattleData.getDeveloper(tool) || t("battle_updating")}</span></div>
        <div class="battle-info-row"><span class="lbl">${t("battle_info_link")}</span><span class="val"><a href="${tool.link}" target="_blank" rel="noopener" style="color:#00e5ff;">${t("btn_use")} →</a></span></div>
      </div>
    `).join("");
    bindLogoFallback(els.infoGrid);
  }
  function priceLabel(tool) {
    if (tool.badge === "free") return "🎁 " + t("badge_free");
    if (tool.badge === "pro") return "💎 " + t("badge_pro");
    if (tool.badge === "hot") return "🔥 " + t("badge_hot");
    return "—";
  }

  // ---------- UU / NHUOC DIEM (co that thi dung, khong co thi hien thong
  // tin noi bat suy ra tu du lieu that, khong bia dat nhan xet) ----------
  function renderProsCons(a, b) {
    els.pcGrid.innerHTML = [a, b].map(tool => {
      if (Array.isArray(tool.pros) && Array.isArray(tool.cons)) {
        return `
        <div class="battle-pc-card">
          <h4>${logoImgHtml(tool, "")} ${escapeHtml(tool.name)}</h4>
          <p style="font-size:12px;color:var(--battle-text-dim);margin-bottom:8px;">✓ ${t("battle_pros")}</p>
          <ul class="battle-pc-list pros">${tool.pros.map(p => `<li>${escapeHtml(localizedText(p))}</li>`).join("")}</ul>
          <p style="font-size:12px;color:var(--battle-text-dim);margin:12px 0 8px;">✕ ${t("battle_cons")}</p>
          <ul class="battle-pc-list cons">${tool.cons.map(p => `<li>${escapeHtml(localizedText(p))}</li>`).join("")}</ul>
        </div>`;
      }
      // Fallback: thong tin noi bat that (khong phai danh gia chu quan)
      const highlights = [
        `⭐ ${t("battle_hl_rating").replace("{n}", tool.rating.toFixed(1))}`,
        tool.hasApi ? "🔌 " + t("battle_hl_api") : "🚫 " + t("battle_hl_noapi"),
        tool.badge === "free" ? "🎁 " + t("battle_hl_free") : "💎 " + t("battle_hl_paid"),
        "🗂️ " + t("cat_" + tool.category)
      ];
      return `
      <div class="battle-pc-card">
        <h4>${logoImgHtml(tool, "")} ${escapeHtml(tool.name)}</h4>
        <p class="battle-pc-empty">${t("battle_hl_title")}</p>
        <ul class="battle-pc-list pros">${highlights.map(h => `<li>${h}</li>`).join("")}</ul>
      </div>`;
    }).join("");
    bindLogoFallback(els.pcGrid);
  }

  // ---------- VOTE (localStorage) ----------
  function pairKey(a, b) {
    return [BattleData.getBattleSlug(a), BattleData.getBattleSlug(b)].sort().join("__");
  }
  function getVotes(a, b) {
    const store = JSON.parse(localStorage.getItem("battleVotes") || "{}");
    const key = pairKey(a, b);
    return store[key] || {};
  }
  function addVote(a, b, pickedSlug) {
    const store = JSON.parse(localStorage.getItem("battleVotes") || "{}");
    const key = pairKey(a, b);
    if (!store[key]) store[key] = {};
    store[key][pickedSlug] = (store[key][pickedSlug] || 0) + 1;
    localStorage.setItem("battleVotes", JSON.stringify(store));
    state.votedBattles.add(key);
    localStorage.setItem("battleVoted", JSON.stringify([...state.votedBattles]));
  }

  function renderVoteBox(a, b) {
    const votes = getVotes(a, b);
    const slugA = BattleData.getBattleSlug(a), slugB = BattleData.getBattleSlug(b);
    const va = votes[slugA] || 0, vb = votes[slugB] || 0;
    const totalVotes = va + vb;
    const pctA = totalVotes ? Math.round((va / totalVotes) * 100) : 50;
    const pctB = 100 - pctA;
    const already = state.votedBattles.has(pairKey(a, b));

    els.voteBox.innerHTML = `
      <div class="battle-vote-title">🗳️ ${t("battle_vote_title")}</div>
      <div class="battle-vote-buttons">
        <button type="button" class="battle-vote-btn ${already ? "voted" : ""}" data-pick="${slugA}">${logoImgHtml(a, "")} ${t("battle_vote_for")} ${escapeHtml(a.name)}</button>
        <button type="button" class="battle-vote-btn ${already ? "voted" : ""}" data-pick="${slugB}">${logoImgHtml(b, "")} ${t("battle_vote_for")} ${escapeHtml(b.name)}</button>
      </div>
      <div class="battle-vote-bars">
        <div class="battle-vote-bar-row">
          <span style="width:90px;text-align:right;">${escapeHtml(a.name)}</span>
          <div class="battle-vote-bar-track"><div class="battle-vote-bar-fill a" data-target="${pctA}"></div></div>
          <span style="width:40px;">${pctA}%</span>
        </div>
        <div class="battle-vote-bar-row">
          <span style="width:90px;text-align:right;">${escapeHtml(b.name)}</span>
          <div class="battle-vote-bar-track"><div class="battle-vote-bar-fill b" data-target="${pctB}"></div></div>
          <span style="width:40px;">${pctB}%</span>
        </div>
      </div>
      <div class="battle-vote-count">${totalVotes} ${t("battle_votes_count")}</div>
    `;
    bindLogoFallback(els.voteBox);
    requestAnimationFrame(() => {
      els.voteBox.querySelectorAll(".battle-vote-bar-fill").forEach(bar => { bar.style.width = bar.dataset.target + "%"; });
    });
    els.voteBox.querySelectorAll(".battle-vote-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        addVote(a, b, btn.dataset.pick);
        renderVoteBox(a, b);
        fireConfetti();
        showToast(t("battle_vote_thanks"));
      });
    });
  }

  // ---------- CHIA SE MANG XA HOI ----------
  function renderShareBox(a, b) {
    const url = location.origin + BattleData.buildBattlePath(a, b);
    const text = encodeURIComponent(`${a.name} vs ${b.name} - ${t("battle_share_text")}`);
    els.shareBox.innerHTML = `
      <a class="battle-share-btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">📘 Facebook</a>
      <a class="battle-share-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}">🐦 X / Twitter</a>
      <button type="button" class="battle-share-btn" id="battleCopyLinkBtn">🔗 ${t("battle_copy_link")}</button>
      <input class="battle-share-url" id="battleShareUrl" type="text" readonly value="${url}">
    `;
    qs("battleCopyLinkBtn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        const input = qs("battleShareUrl");
        input.select();
        document.execCommand("copy");
      }
      showToast(t("battle_link_copied"));
    });
  }

  function bindShareBtn() {
    els.shareBtn.addEventListener("click", () => {
      if (!state.slotA || !state.slotB) return;
      els.shareBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // ---------- TOAST ----------
  let toastTimer = null;
  function showToast(msg) {
    let toast = document.querySelector(".battle-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "battle-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ---------- CONFETTI (canvas nhe, tu don don sau khi chay) ----------
  function fireConfetti() {
    const canvas = els.confetti;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#7c5cff", "#00e5ff", "#ffd166", "#ff5ac8", "#4ade80"];
    const particles = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -8 - 3,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3
    }));
    const gravity = 0.28;
    const start = performance.now();
    function frame(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (elapsed < 1800) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(frame);
  }

  // ---------- LICH SU TRAN DAU (localStorage, cua rieng nguoi dung) ----------
  function pushHistoryEntry(a, b) {
    let list = JSON.parse(localStorage.getItem("battleHistory") || "[]");
    const key = pairKey(a, b);
    list = list.filter(item => item.key !== key);
    list.unshift({ key, a: BattleData.getBattleSlug(a), b: BattleData.getBattleSlug(b), ts: Date.now() });
    list = list.slice(0, 12);
    localStorage.setItem("battleHistory", JSON.stringify(list));
    renderHistoryList();
    renderTrendingList(); // vote/luot xem co the anh huong thu tu trending
  }

  function renderHistoryList() {
    const list = JSON.parse(localStorage.getItem("battleHistory") || "[]");
    if (list.length === 0) {
      els.historyList.innerHTML = `<div class="battle-history-empty">${t("battle_history_empty")}</div>`;
      return;
    }
    els.historyList.innerHTML = list.map(item => {
      const a = BattleData.findToolBySlug(item.a), b = BattleData.findToolBySlug(item.b);
      if (!a || !b) return "";
      return `<button type="button" class="battle-history-chip" data-a="${item.a}" data-b="${item.b}">${a.icon} ${escapeHtml(a.name)} <span style="opacity:.5;">vs</span> ${b.icon} ${escapeHtml(b.name)}</button>`;
    }).join("");
    els.historyList.querySelectorAll(".battle-history-chip").forEach(chip => {
      chip.addEventListener("click", () => loadBattleBySlug(chip.dataset.a, chip.dataset.b, true));
    });
  }

  // ---------- TRENDING BATTLES ----------
  function renderTrendingList() {
    const votesStore = JSON.parse(localStorage.getItem("battleVotes") || "{}");
    const historyList = JSON.parse(localStorage.getItem("battleHistory") || "[]");

    const candidates = new Map(); // key -> {a,b,weight}
    TRENDING_SEED.forEach(([sa, sb], idx) => {
      const a = BattleData.findToolBySlug(sa), b = BattleData.findToolBySlug(sb);
      if (!a || !b) return;
      const key = pairKey(a, b);
      candidates.set(key, { a, b, weight: (TRENDING_SEED.length - idx) * 3 });
    });
    historyList.forEach(item => {
      const a = BattleData.findToolBySlug(item.a), b = BattleData.findToolBySlug(item.b);
      if (!a || !b) return;
      const key = pairKey(a, b);
      const existing = candidates.get(key) || { a, b, weight: 0 };
      existing.weight += 2;
      candidates.set(key, existing);
    });
    Object.entries(votesStore).forEach(([key, votes]) => {
      const total = Object.values(votes).reduce((s, v) => s + v, 0);
      if (candidates.has(key)) candidates.get(key).weight += total;
    });

    const top = [...candidates.values()].sort((x, y) => y.weight - x.weight).slice(0, 6);
    if (top.length === 0) {
      els.trendingList.innerHTML = `<div class="battle-trending-empty">${t("battle_trending_empty")}</div>`;
      return;
    }
    els.trendingList.innerHTML = top.map(({ a, b, weight }) => `
      <button type="button" class="battle-trending-card" data-a="${BattleData.getBattleSlug(a)}" data-b="${BattleData.getBattleSlug(b)}">
        <div class="battle-trending-logos">${logoImgHtml(a, "")}${logoImgHtml(b, "")}</div>
        <div class="battle-trending-info">
          <div class="battle-trending-names">${escapeHtml(a.name)} vs ${escapeHtml(b.name)}</div>
          <div class="battle-trending-meta">🔥 ${weight} ${t("battle_trending_score")}</div>
        </div>
      </button>
    `).join("");
    bindLogoFallback(els.trendingList);
    els.trendingList.querySelectorAll(".battle-trending-card").forEach(card => {
      card.addEventListener("click", () => loadBattleBySlug(card.dataset.a, card.dataset.b, true));
    });
  }

  // ---------- BANG XEP HANG SUC MANH (dua tren tong diem uoc tinh) ----------
  function renderRankingList() {
    const ranked = [...aiTools]
      .map(tool => ({ tool, total: BattleData.getBattleStats(tool).total }))
      .sort((x, y) => y.total - x.total)
      .slice(0, 15);

    els.rankingList.innerHTML = ranked.map((item, idx) => {
      const pos = idx + 1;
      const posLabel = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : pos;
      return `
      <div class="battle-rank-row pick-btn" data-id="${item.tool.id}">
        <div class="battle-rank-pos ${pos <= 3 ? "top3" : ""}">${posLabel}</div>
        ${logoImgHtml(item.tool, "")}
        <div class="battle-rank-name">${escapeHtml(item.tool.name)}</div>
        <div class="battle-rank-cat">${t("cat_" + item.tool.category)}</div>
        <div class="battle-rank-score">${item.total}/100</div>
      </div>`;
    }).join("");
    bindLogoFallback(els.rankingList);
    els.rankingList.querySelectorAll(".battle-rank-row").forEach(row => {
      row.addEventListener("click", () => {
        const tool = aiTools.find(x => x.id === Number(row.dataset.id));
        if (!tool) return;
        pickForBattle(tool);
      });
    });
  }

  function pickForBattle(tool) {
    if (!state.slotA) { selectTool("a", tool); return; }
    if (!state.slotB && tool.id !== state.slotA.id) { selectTool("b", tool); return; }
    // Ca hai da co hoac trung -> dat lam AI A moi, mo picker cho AI B
    state.slotB = null;
    selectTool("a", tool);
    openPicker("b");
  }

  // ---------- URL / SEO: /battle/slug-a-vs-slug-b ----------
  function updateUrlAndSeo(a, b) {
    if (els.section.classList.contains("hidden")) return; // chi doi URL khi dang xem Battle
    const path = BattleData.buildBattlePath(a, b);
    if (location.pathname !== path) {
      history.pushState({ battle: [BattleData.getBattleSlug(a), BattleData.getBattleSlug(b)] }, "", path);
    }
    const title = `${a.name} vs ${b.name} — ${t("battle_seo_title_suffix")}`;
    document.title = title;
    setMeta("description", `${a.name} vs ${b.name}: ${t("battle_seo_desc")}`);
    setJsonLd(a, b);
  }
  let originalMetaDesc = null;
  function resetSeoMeta() {
    if (typeof applyTranslations === "function") applyTranslations(); // dat lai document.title
    if (originalMetaDesc !== null) setMeta("description", originalMetaDesc);
    removeJsonLd();
  }
  function setMeta(name, content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    if (name === "description" && originalMetaDesc === null) {
      originalMetaDesc = tag.getAttribute("content");
    }
    tag.setAttribute("content", content);
  }
  function setJsonLd(a, b) {
    removeJsonLd();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "battleJsonLd";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${a.name} vs ${b.name}`,
      "itemListElement": [
        { "@type": "SoftwareApplication", "position": 1, "name": a.name, "url": a.link },
        { "@type": "SoftwareApplication", "position": 2, "name": b.name, "url": b.link }
      ]
    });
    document.head.appendChild(script);
  }
  function removeJsonLd() {
    const old = qs("battleJsonLd");
    if (old) old.remove();
  }

  function loadBattleBySlug(slugA, slugB, scrollTo) {
    const a = BattleData.findToolBySlug(slugA), b = BattleData.findToolBySlug(slugB);
    if (!a || !b) return;
    state.slotA = a;
    state.slotB = b;
    renderSlot("a");
    renderSlot("b");
    renderResults();
    pushHistoryEntry(a, b);
    if (typeof showSection === "function") showSection("battle");
    window.BattleArena.onShow();
    updateUrlAndSeo(a, b);
    if (scrollTo) els.section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function tryRouteFromUrl() {
    const parsed = BattleData.parseBattlePath(location.pathname);
    if (parsed) {
      loadBattleBySlug(BattleData.getBattleSlug(parsed.a), BattleData.getBattleSlug(parsed.b), false);
    } else if (location.pathname === "/" || location.pathname === "/index.html") {
      // khong lam gi - trang chu binh thuong
    }
  }

  // ---------- HELPERS ----------
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  // ---------- API CONG KHAI cho script.js goi (dieu huong, doi ngon ngu) ----------
  window.BattleArena = {
    onShow() {
      if (!state.trendingRendered) { renderTrendingList(); state.trendingRendered = true; }
      if (!state.historyRendered) { renderHistoryList(); state.historyRendered = true; }
      if (!state.rankingRendered) { renderRankingList(); state.rankingRendered = true; }
      if (els.shareBtn && !els.shareBtn.dataset.bound) {
        bindShareBtn();
        els.shareBtn.dataset.bound = "1";
      }
      if (state.slotA && state.slotB) updateUrlAndSeo(state.slotA, state.slotB);
    },
    onLangChange() {
      if (state.slotA) renderSlot("a");
      if (state.slotB) renderSlot("b");
      if (state.slotA && state.slotB) renderResults();
      if (state.trendingRendered) renderTrendingList();
      if (state.historyRendered) renderHistoryList();
      if (state.rankingRendered) renderRankingList();
      if (!els.picker.classList.contains("hidden")) { renderPickerCats(); renderPickerGrid(); }
    },
    loadBattleBySlug
  };
})();
