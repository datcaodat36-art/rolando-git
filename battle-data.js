// =======================================
// AI BATTLE - battle-data.js
// =======================================
// File nay KHONG chua so lieu benchmark that cua tung AI (vi database goc
// trong data.js khong co diem theo tieu chi Coding/Writing/Reasoning...).
// Thay vi bia dat con so cho tung AI mot cach thu cong, diem so duoc TINH
// TOAN tu chinh cac truong du lieu that da co san trong aiTools:
//   - category   (chat / image / video / code / study / finance)
//   - rating     (danh gia nguoi dung, 0-5)
//   - hasApi     (co API hay khong)
//   - badge      (free / pro / hot)
//   - logo       (dung lam "seed" on dinh de tao do lech nho, khong doi
//                 giua cac lan tai trang, giup moi AI trong cung danh muc
//                 khong co diem giong het nhau)
// => Day la diem UOC TINH mang tinh tham khao/minh hoa cho tinh nang so
//    sanh truc quan, khong phai benchmark chinh thuc tu nha phat trien.
//    Dieu nay duoc ghi ro trong giao dien (xem battle_disclaimer trong
//    translations).
// =======================================

(function (global) {
  "use strict";

  // ---------- 9 TIEU CHI SO SANH ----------
  const BATTLE_CRITERIA = [
    { key: "coding", icon: "💻", vi: "Lập trình", en: "Coding" },
    { key: "writing", icon: "✍️", vi: "Viết lách", en: "Writing" },
    { key: "reasoning", icon: "🧠", vi: "Tư duy & Suy luận", en: "Reasoning" },
    { key: "speed", icon: "⚡", vi: "Tốc độ", en: "Speed" },
    { key: "creativity", icon: "🎨", vi: "Sáng tạo", en: "Creativity" },
    { key: "research", icon: "🔬", vi: "Nghiên cứu", en: "Research" },
    { key: "image", icon: "🖼️", vi: "Tạo ảnh", en: "Image" },
    { key: "video", icon: "🎬", vi: "Tạo video", en: "Video" },
    { key: "voice", icon: "🎙️", vi: "Giọng nói", en: "Voice" }
  ];

  // ---------- HO SO GOC THEO DANH MUC (0-100) ----------
  // Phan anh muc do lien quan trung binh cua tung danh muc voi tung tieu
  // chi (vi du: AI danh muc "image" chac chan manh ve Image/Creativity,
  // yeu ve Coding/Video). Day la khung tham chieu, KHONG phai diem rieng
  // cho tung AI - diem rieng se duoc tinh tiep ben duoi.
  const CATEGORY_PROFILE = {
    chat: { coding: 55, writing: 78, reasoning: 75, speed: 72, creativity: 62, research: 58, image: 18, video: 10, voice: 32 },
    image: { coding: 8, writing: 18, reasoning: 22, speed: 62, creativity: 92, research: 12, image: 95, video: 22, voice: 5 },
    video: { coding: 8, writing: 28, reasoning: 24, speed: 55, creativity: 86, research: 12, image: 38, video: 95, voice: 48 },
    code: { coding: 95, writing: 38, reasoning: 76, speed: 66, creativity: 28, research: 32, image: 5, video: 5, voice: 4 },
    study: { coding: 24, writing: 62, reasoning: 66, speed: 56, creativity: 32, research: 82, image: 12, video: 12, voice: 34 },
    finance: { coding: 28, writing: 44, reasoning: 82, speed: 54, creativity: 14, research: 86, image: 4, video: 4, voice: 8 }
  };
  const FALLBACK_PROFILE = { coding: 40, writing: 40, reasoning: 45, speed: 50, creativity: 40, research: 40, image: 15, video: 15, voice: 15 };

  // ---------- HASH / SEED ON DINH (khong dung Math.random de diem khong
  // doi giua cac lan tai trang cua cung mot nguoi dung) ----------
  function hashStr(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h) + str.charCodeAt(i);
      h = h & 0xffffffff;
    }
    return Math.abs(h);
  }
  function seeded01(str) {
    return (hashStr(str) % 10000) / 10000; // 0..1 on dinh theo chuoi seed
  }
  function jitter(seedStr, spread) {
    return (seeded01(seedStr) * 2 - 1) * spread;
  }

  const _cache = new Map();

  function getBattleStats(tool) {
    if (!tool) return null;
    if (_cache.has(tool.id)) return _cache.get(tool.id);

    const profile = CATEGORY_PROFILE[tool.category] || FALLBACK_PROFILE;
    const rating = typeof tool.rating === "number" ? tool.rating : 4.2;
    const ratingFactor = 0.7 + (rating / 5) * 0.35; // ~0.98 -> ~1.04

    const scores = {};
    BATTLE_CRITERIA.forEach(c => {
      let v = (profile[c.key] !== undefined ? profile[c.key] : FALLBACK_PROFILE[c.key]) * ratingFactor;
      if (tool.hasApi && (c.key === "coding" || c.key === "speed")) v += 3;
      if (tool.badge === "hot" && (c.key === "speed" || c.key === "creativity")) v += 4;
      if (tool.badge === "pro") v += 2;
      v += jitter(String(tool.logo || tool.id) + "_" + c.key, 5);
      scores[c.key] = Math.max(1, Math.min(100, Math.round(v)));
    });

    const total = Math.round(
      BATTLE_CRITERIA.reduce((sum, c) => sum + scores[c.key], 0) / BATTLE_CRITERIA.length
    );

    const result = { scores, total };
    _cache.set(tool.id, result);
    return result;
  }

  // ---------- NHA PHAT TRIEN (suy ra tu truong `logo` co san, chi de
  // hien thi thong tin, khong lien quan diem so) ----------
  const VENDOR_MAP = {
    openai: "OpenAI", gemini: "Google", claude: "Anthropic", grok: "xAI",
    midjourney: "Midjourney, Inc.", dalle: "OpenAI", firefly: "Adobe",
    runway: "Runway AI, Inc.", sora: "OpenAI", pika: "Pika Labs",
    githubcopilot: "GitHub (Microsoft)", cursor: "Anysphere", copilot: "Microsoft",
    notion: "Notion Labs", khanacademy: "Khan Academy", duolingo: "Duolingo",
    perplexity: "Perplexity AI", deepseek: "DeepSeek", qwen: "Alibaba Cloud",
    meta: "Meta", kimi: "Moonshot AI", mistral: "Mistral AI",
    codeium: "Windsurf (Codeium)", windsurf: "Windsurf", amazon: "Amazon",
    canva: "Canva", gamma: "Gamma", flux: "Black Forest Labs",
    ideogram: "Ideogram AI", stability: "Stability AI", veo: "Google DeepMind",
    kling: "Kuaishou", hailuo: "MiniMax", luma: "Luma AI", synthesia: "Synthesia",
    heygen: "HeyGen", leonardo: "Leonardo AI", recraft: "Recraft", krea: "Krea AI",
    photoroom: "PhotoRoom", removebg: "Kaleido AI", designer: "Microsoft",
    freepik: "Freepik", figma: "Figma", premiere: "Adobe", gitlab: "GitLab",
    tabnine: "Tabnine", replit: "Replit", devin: "Cognition AI",
    sourcegraph: "Sourcegraph", jetbrains: "JetBrains", v0: "Vercel",
    bolt: "StackBlitz", lovable: "Lovable", firebase: "Google", phind: "Phind",
    huggingface: "Hugging Face", poe: "Quora", you: "You.com",
    characterai: "Character AI", notebooklm: "Google", elicit: "Elicit",
    consensus: "Consensus", scite: "Scite", otter: "Otter.ai",
    photomath: "Google", brainly: "Brainly", elsa: "ELSA Corp",
    elevenlabs: "ElevenLabs", jasper: "Jasper AI", copyai: "Copy.ai",
    writesonic: "Writesonic", hubspot: "HubSpot", salesforce: "Salesforce",
    suno: "Suno", udio: "Udio", ernie: "Baidu", chatglm: "Zhipu AI",
    cohere: "Cohere", pi: "Inflection AI", iflytek: "iFlytek",
    sensetime: "SenseTime", replika: "Luka, Inc.", yi: "01.AI", groq: "Groq",
    mistralchat: "Mistral AI", ai21: "AI21 Labs", coze: "ByteDance",
    minimax: "MiniMax", doubao: "ByteDance", amazonrufus: "Amazon",
    wps: "Kingsoft", baichuan: "Baichuan Intelligence", stepfun: "StepFun",
    playground: "Playground AI", nightcafe: "NightCafe", artbreeder: "Artbreeder",
    deepai: "DeepAI", bingimage: "Microsoft", craiyon: "Craiyon", pixlr: "Pixlr",
    fotor: "Fotor", photoshop: "Adobe", getimg: "Getimg.ai", civitai: "Civitai",
    magnific: "Magnific AI", clipdrop: "Stability AI", pixai: "PixAI",
    pictory: "Pictory", elai: "Elai.io", did: "D-ID", colossyan: "Colossyan",
    steveai: "Steve AI", rephrase: "Rephrase.ai", synthesys: "Synthesys",
    fliki: "Fliki", renderforest: "Renderforest", vizard: "Vizard",
    topaz: "Topaz Labs", clipchamp: "Microsoft", deepbrain: "DeepBrain AI",
    codexcli: "OpenAI", cline: "Cline", warp: "Warp", blackbox: "Blackbox AI",
    coderabbit: "CodeRabbit", qodo: "Qodo", zed: "Zed Industries",
    snyk: "Snyk", magicdev: "Magic.dev", augment: "Augment Code",
    codegeex: "Zhipu AI", trae: "ByteDance", wolframalpha: "Wolfram",
    grammarly: "Grammarly", quizlet: "Quizlet", socratic: "Google",
    speechify: "Speechify", quillbot: "QuillBot", wordtune: "AI21 Labs",
    speak: "Speak", busuu: "Busuu", babbel: "Babbel"
  };
  function getDeveloper(tool) {
    return (tool && VENDOR_MAP[tool.logo]) || null;
  }

  // ---------- SLUG / URL (dung lai truong `logo` co san - da la duy nhat
  // trong toan bo database nen khong can tao them slug moi) ----------
  function getBattleSlug(tool) {
    return tool && tool.logo ? tool.logo : "";
  }
  function findToolBySlug(slug) {
    if (!slug) return null;
    return aiTools.find(t => t.logo === slug) || null;
  }
  function buildBattlePath(toolA, toolB) {
    return "/battle/" + getBattleSlug(toolA) + "-vs-" + getBattleSlug(toolB);
  }
  function parseBattlePath(pathname) {
    const m = /\/battle\/([a-z0-9-]+)-vs-([a-z0-9-]+)/i.exec(pathname || "");
    if (!m) return null;
    // logo slugs co the chua dau gach ngang (vd "amazon-rufus" khong co,
    // nhung de an toan ta thu tach tai moi vi tri "-vs-" hop le)
    const a = findToolBySlug(m[1]);
    const b = findToolBySlug(m[2]);
    if (a && b) return { a, b };
    return null;
  }

  global.BattleData = {
    CRITERIA: BATTLE_CRITERIA,
    getBattleStats,
    getDeveloper,
    getBattleSlug,
    findToolBySlug,
    buildBattlePath,
    parseBattlePath
  };
})(window);
