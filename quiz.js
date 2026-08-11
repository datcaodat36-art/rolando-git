// =======================================
// AI QUIZ — "Dò đúng tần số AI"
// Đọc trực tiếp từ database sống của trang (aiTools, currentCategories,
// aiByProfession) nên luôn khớp với dữ liệu Admin/Firebase hiện tại,
// không cần một file dữ liệu riêng phải đồng bộ tay.
// =======================================
(function () {
  "use strict";

  const STORAGE_KEY = "aiQuizResult";

  // Dữ liệu tĩnh riêng của quiz: nhãn 2 thứ tiếng cho các lựa chọn không
  // lấy trực tiếp từ database (ngân sách, mức độ sử dụng, ưu tiên, tần suất).
  const STATIC = {
    priority: [
      { id: "accurate", icon: "🎯", vi: "Độ chính xác / đánh giá cao", en: "Accuracy / high rating" },
      { id: "free", icon: "🆓", vi: "Miễn phí", en: "Free" },
      { id: "api", icon: "🔌", vi: "Có API để tích hợp", en: "Has an API to integrate" },
      { id: "allround", icon: "🧰", vi: "Đa năng, nhiều tính năng", en: "Versatile, feature-rich" }
    ],
    budget: [
      { id: "free_only", icon: "🆓", vi: "Chỉ miễn phí", en: "Free only" },
      { id: "paid_ok", icon: "💳", vi: "Sẵn sàng trả phí để có tính năng tốt nhất", en: "Willing to pay for the best features" },
      { id: "unlimited", icon: "🏆", vi: "Không giới hạn", en: "No limit" }
    ],
    level: [
      { id: "beginner", icon: "🌱", vi: "Mới bắt đầu", en: "Just starting out" },
      { id: "medium", icon: "⚙️", vi: "Trung bình", en: "Intermediate" },
      { id: "pro", icon: "🚀", vi: "Chuyên nghiệp / dùng để phát triển", en: "Professional / builds with it" }
    ],
    style: [
      { id: "simple", icon: "🙂", vi: "Đơn giản, dễ dùng", en: "Simple, easy to use" },
      { id: "powerful", icon: "🧠", vi: "Mạnh mẽ, nhiều tính năng nâng cao", en: "Powerful, advanced features" },
      { id: "creative", icon: "🎨", vi: "Sáng tạo, giàu hình ảnh", en: "Creative, visual" }
    ],
    frequency: [
      { id: "daily", icon: "📆", vi: "Hàng ngày", en: "Daily" },
      { id: "weekly", icon: "🗓️", vi: "Hàng tuần", en: "Weekly" },
      { id: "occasional", icon: "🕰️", vi: "Thỉnh thoảng", en: "Occasionally" }
    ]
  };

  let els = {};
  let questions = [];
  let step = 0;
  let answers = [];
  let bound = false;

  function validTools() {
    // Phòng vệ: một phần dữ liệu cũ trong data.js được nạp dạng mảng-tuple
    // thay vì object (additionalAiTools / moreAiTools bị push thẳng không
    // chuẩn hoá) — bỏ qua các mục đó để quiz không tính điểm sai / vỡ.
    return ((typeof aiTools !== "undefined" && aiTools) || []).filter(
      t => t && typeof t === "object" && !Array.isArray(t) && typeof t.name === "string"
    );
  }

  function cacheEls() {
    els = {
      hero: document.getElementById("quizScreenHero"),
      quiz: document.getElementById("quizScreenQuestion"),
      results: document.getElementById("quizScreenResults"),
      startBtn: document.getElementById("quizStartBtn"),
      savedBtn: document.getElementById("quizViewSavedBtn"),
      qIndex: document.getElementById("quizQIndex"),
      qTotal: document.getElementById("quizQTotal"),
      qPercent: document.getElementById("quizQPercent"),
      dialFill: document.getElementById("quizDialFill"),
      qLabel: document.getElementById("quizQLabel"),
      qText: document.getElementById("quizQText"),
      optionsGrid: document.getElementById("quizOptionsGrid"),
      backBtn: document.getElementById("quizBackBtn"),
      skipBtn: document.getElementById("quizSkipBtn"),
    };
  }

  // ---------- XÂY DỰNG CÂU HỎI TỪ DỮ LIỆU SỐNG ----------
  function buildQuestions() {
    const cats = ((typeof currentCategories !== "undefined" && currentCategories) || []).filter(c => c.slug !== "all");
    const professions = (typeof aiByProfession !== "undefined" && aiByProfession) || [];

    const q = [];

    q.push({
      textVi: "Bạn dùng AI cho việc gì là chính?",
      textEn: "What do you use AI for the most?",
      options: cats.map(c => ({
        id: "cat_" + c.slug,
        icon: c.icon,
        vi: c.labelVi, en: c.labelEn,
        score: (tool) => (tool.category === c.slug ? 6 : 0)
      }))
    });

    if (professions.length) {
      q.push({
        textVi: "Bạn là ai?",
        textEn: "Which best describes you?",
        options: professions.map(p => ({
          id: "prof_" + slugify(p.title.en),
          icon: p.icon,
          vi: p.title.vi, en: p.title.en,
          score: (tool) => {
            const idx = (p.suggested || []).indexOf(tool.name);
            return idx === -1 ? 0 : Math.max(6 - idx, 1);
          }
        }))
      });
    }

    q.push({
      textVi: "Việc thứ hai bạn muốn AI hỗ trợ?",
      textEn: "What's the second thing you want AI to help with?",
      options: cats.map(c => ({
        id: "cat2_" + c.slug,
        icon: c.icon,
        vi: c.labelVi, en: c.labelEn,
        score: (tool) => (tool.category === c.slug ? 3 : 0)
      }))
    });

    q.push({
      textVi: "Ngân sách của bạn?",
      textEn: "What's your budget?",
      options: STATIC.budget.map(o => ({
        ...o,
        score: (tool) => {
          if (o.id === "free_only") return tool.badge === "free" ? 4 : 0;
          if (o.id === "paid_ok") return tool.badge && tool.badge !== "free" ? 4 : 0;
          if (o.id === "unlimited") return tool.hasApi ? 2 : 0;
          return 0;
        }
      }))
    });

    q.push({
      textVi: "Mức độ sử dụng AI của bạn hiện tại?",
      textEn: "How experienced are you with AI right now?",
      options: STATIC.level.map(o => ({
        ...o,
        score: (tool) => {
          if (o.id === "beginner") return tool.badge === "free" && tool.rating >= 4.5 ? 3 : 0;
          if (o.id === "medium") return tool.rating >= 4.5 ? 1 : 0;
          if (o.id === "pro") return tool.hasApi ? 3 : 0;
          return 0;
        }
      }))
    });

    q.push({
      textVi: "Điều nào quan trọng nhất với bạn?",
      textEn: "What matters most to you?",
      options: STATIC.priority.map(o => ({
        ...o,
        score: (tool) => {
          if (o.id === "accurate") return tool.rating >= 4.6 ? 4 : 0;
          if (o.id === "free") return tool.badge === "free" ? 4 : 0;
          if (o.id === "api") return tool.hasApi ? 4 : 0;
          if (o.id === "allround") return tool.category === "chat" ? 3 : 0;
          return 0;
        }
      }))
    });

    q.push({
      textVi: "Bạn thích phong cách nào hơn?",
      textEn: "Which style do you prefer?",
      options: STATIC.style.map(o => ({
        ...o,
        score: (tool) => {
          if (o.id === "simple") return tool.rating >= 4.6 ? 3 : 0;
          if (o.id === "powerful") return tool.hasApi ? 3 : 0;
          if (o.id === "creative") return (tool.category === "image" || tool.category === "video") ? 3 : 0;
          return 0;
        }
      }))
    });

    q.push({
      textVi: "Bạn dùng AI thường xuyên cỡ nào?",
      textEn: "How often do you use AI?",
      options: STATIC.frequency.map(o => ({
        ...o,
        score: (tool) => {
          if (o.id === "daily") return tool.rating >= 4.6 ? 2 : 0;
          if (o.id === "occasional") return tool.badge === "free" ? 2 : 0;
          return 0;
        }
      }))
    });

    return q;
  }

  function slugify(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function lt(vi, en) {
    return (typeof currentLang !== "undefined" && currentLang === "vi") ? vi : en;
  }

  // ---------- LUỒNG QUIZ ----------
  function start() {
    questions = buildQuestions();
    step = 0;
    answers = [];
    els.qTotal.textContent = questions.length;
    showScreen("hero", false);
    showScreen("quiz");
    renderQuestion();

    if (window.trackEvent) {
      window.trackEvent("quiz_start", {
        question_count: questions.length
      });
    }
  }

  function showScreen(name, activate) {
    const map = { hero: els.hero, quiz: els.quiz, results: els.results };
    if (activate === false) { map[name].classList.remove("active"); return; }
    Object.values(map).forEach(s => s.classList.remove("active"));
    map[name].classList.add("active");
  }

  function renderQuestion() {
    const q = questions[step];
    els.qIndex.textContent = step + 1;
    const pct = Math.round((step / questions.length) * 100);
    els.qPercent.textContent = pct + "%";
    els.dialFill.style.width = pct + "%";
    els.qLabel.textContent = (typeof currentLang !== "undefined" && currentLang === "vi" ? "CH " : "Q ") + String(step + 1).padStart(2, "0");
    els.qText.textContent = lt(q.textVi, q.textEn);
    els.backBtn.disabled = step === 0;

    els.optionsGrid.innerHTML = "";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option-card";
      btn.innerHTML = `<span class="quiz-opt-icon">${opt.icon || "•"}</span><span>${lt(opt.vi, opt.en)}</span>`;
      btn.addEventListener("click", (e) => {
        ripple(btn, e);
        setTimeout(() => advance(opt), 130);
      });
      els.optionsGrid.appendChild(btn);
    });
  }

  function ripple(btn, e) {
    const rect = btn.getBoundingClientRect();
    const r = document.createElement("span");
    r.className = "quiz-ripple";
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    const x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    r.style.left = x + "px";
    r.style.top = y + "px";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }

  function advance(opt) {
    answers.push({ questionIndex: step, option: opt || null });
    if (step < questions.length - 1) {
      step += 1;
      renderQuestion();
    } else {
      finish();
    }
  }

  function finish() {
    els.dialFill.style.width = "100%";
    const scored = computeScores();
    persist(scored);

    if (window.trackEvent) {
      const top = scored && scored[0] && scored[0].tool;
      window.trackEvent("quiz_complete", {
        question_count: questions.length,
        ai_name: top ? top.name : undefined,
        ai_slug: top ? top.slug : undefined
      });
    }

    setTimeout(() => renderResults(scored), 200);
  }

  function computeScores() {
    const tools = validTools();
    const totals = new Map();

    answers.forEach(a => {
      if (!a.option) return;
      tools.forEach(tool => {
        const pts = a.option.score(tool) || 0;
        if (!pts) return;
        totals.set(tool.id, (totals.get(tool.id) || 0) + pts);
      });
    });

    // Đảm bảo luôn có kết quả kể cả khi mọi điểm bằng 0: dùng rating làm fallback nhẹ
    if ([...totals.values()].every(v => !v)) {
      tools.forEach(tool => totals.set(tool.id, tool.rating || 0));
    }

    const max = Math.max(...totals.values(), 1);
    const ranked = tools
      .map(tool => ({
        tool,
        points: totals.get(tool.id) || 0,
        pct: Math.max(8, Math.round(((totals.get(tool.id) || 0) / max) * 100))
      }))
      .sort((a, b) => b.points - a.points || b.tool.rating - a.tool.rating);

    return ranked;
  }

  function persist(scored) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ids: scored.slice(0, 5).map(r => r.tool.id),
        pct: scored.slice(0, 5).map(r => r.pct),
        savedAt: Date.now()
      }));
    } catch (e) { /* ignore */ }
  }

  function readSaved() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      const tools = validTools();
      const scored = data.ids
        .map((id, i) => {
          const tool = tools.find(t => t.id === id);
          return tool ? { tool, points: 0, pct: data.pct[i] || 0 } : null;
        })
        .filter(Boolean);
      return scored.length ? scored : null;
    } catch (e) { return null; }
  }

  function renderResults(scored) {
    showScreen("results");
    const top = scored[0].tool;
    const topPct = scored[0].pct;

    document.getElementById("quizMatchIcon").textContent = top.icon || "🤖";
    document.getElementById("quizMatchName").textContent = top.name;
    document.getElementById("quizMatchCat").textContent = categoryLabel(top.category);
    document.getElementById("quizMatchPct").textContent = topPct + "%";
    document.getElementById("quizMatchTagline").textContent = localizedText(top.description);
    document.getElementById("quizVisitBtn").href = top.link || "#";

    document.getElementById("quizExplainText").innerHTML = buildExplanation(scored);

    const listEl = document.getElementById("quizTopList");
    listEl.innerHTML = "";
    scored.slice(0, 5).forEach((row, i) => {
      const div = document.createElement("div");
      div.className = "quiz-top-row";
      div.innerHTML = `
        <span class="quiz-top-rank">#${i + 1}</span>
        <span class="quiz-top-icon">${row.tool.icon || "🤖"}</span>
        <span class="quiz-top-info">
          <span class="quiz-top-name">${row.tool.name}</span>
          <span class="quiz-top-desc">${localizedText(row.tool.description)}</span>
        </span>
        <span class="quiz-top-pct">${row.pct}%</span>`;
      listEl.appendChild(div);
    });

    document.getElementById("quizRetakeBtn").onclick = () => {
      showScreen("hero");
    };

    document.getElementById("quizSaveBtn").onclick = () => {
      persist(scored);
      toast(t("quiz_saved_toast"));
    };

    document.getElementById("quizCompareBtn").onclick = () => {
      const [a, b, c] = scored;
      if (window.BattleArena && a && b && window.BattleData) {
        window.BattleArena.loadBattleBySlug(
          window.BattleData.getBattleSlug(a.tool),
          window.BattleData.getBattleSlug(b.tool),
          true
        );
      }
      const msg = t("quiz_compare_toast")
        .replace("{a}", a ? a.tool.name : "")
        .replace("{b}", b ? b.tool.name : "")
        .replace("{c}", c ? c.tool.name : "");
      toast(msg);
    };

    setupShare(top, topPct);
  }

  function categoryLabel(slug) {
    const c = ((typeof currentCategories !== "undefined" && currentCategories) || []).find(c => c.slug === slug);
    if (!c) return slug || "";
    return lt(c.labelVi, c.labelEn);
  }

  function buildExplanation(scored) {
    const names = scored.slice(0, 3).map(r => `<b>${r.tool.name}</b>`).join(", ");
    return `${t("quiz_explain_prefix")} ${names}.`;
  }

  function setupShare(top, pct) {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`${top.name} — ${pct}% match! `);
    document.getElementById("quizShareFb").onclick = () =>
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "noopener");
    document.getElementById("quizShareX").onclick = () =>
      window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "_blank", "noopener");
    document.getElementById("quizShareLi").onclick = () =>
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, "_blank", "noopener");
    document.getElementById("quizShareCopy").onclick = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast(t("quiz_copy_toast"));
      } catch (e) {
        toast(t("quiz_copy_fail_toast"));
      }
    };
  }

  function toast(msg) {
    let box = document.getElementById("quizToast");
    if (!box) {
      box = document.createElement("div");
      box.id = "quizToast";
      box.className = "quiz-toast";
      document.body.appendChild(box);
    }
    box.textContent = msg;
    box.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => box.classList.remove("show"), 2600);
  }

  function paintTuner() {
    const wrap = document.getElementById("quizHeroTuner");
    if (!wrap || wrap.dataset.painted) return;
    wrap.dataset.painted = "1";
    for (let i = 0; i < 42; i++) {
      const s = document.createElement("span");
      const h = 10 + Math.round(Math.random() * 30);
      s.style.setProperty("--h", h + "px");
      s.style.animationDelay = (Math.random() * 2.2).toFixed(2) + "s";
      wrap.appendChild(s);
    }
  }

  function bindOnce() {
    if (bound) return;
    bound = true;
    cacheEls();
    paintTuner();

    els.startBtn.addEventListener("click", start);
    els.backBtn.addEventListener("click", () => {
      if (step > 0) { step -= 1; answers.pop(); renderQuestion(); }
    });
    els.skipBtn.addEventListener("click", () => advance(null));

    const saved = readSaved();
    if (saved) {
      els.savedBtn.hidden = false;
      els.savedBtn.addEventListener("click", () => {
        questions = buildQuestions();
        renderResults(saved);
      });
    }
  }

  window.AIQuiz = {
    onShow() { bindOnce(); },
    onLangChange() {
      if (!bound) return;
      if (els.quiz && els.quiz.classList.contains("active") && questions[step]) renderQuestion();
      if (els.results && els.results.classList.contains("active")) {
        const saved = readSaved();
        if (saved) renderResults(saved);
      }
    }
  };
})();
