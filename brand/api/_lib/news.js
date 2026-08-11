// =======================================================
// AI News - shared aggregation library
// Zero external dependencies (works on Vercel without npm install).
// Used by /api/ai-news.js and /api/cron-refresh.js
// =======================================================

// ---------- 1. NGUỒN TIN (RSS) ----------
// Chỉ dùng nguồn chính thức / báo chí công nghệ uy tín.
// "category" ở đây là gợi ý mặc định cho nguồn, category cuối cùng của
// từng bài viết vẫn được tính lại theo nội dung (xem categorize()).
const SOURCES = [
  { id: "openai", name: "OpenAI", url: "https://openai.com/news/rss.xml", defaultCategory: "companies" },
  { id: "google-ai", name: "Google AI", url: "https://blog.google/technology/ai/rss/", defaultCategory: "companies" },
  { id: "deepmind", name: "Google DeepMind", url: "https://deepmind.google/blog/feed/basic/", defaultCategory: "research" },
  { id: "nvidia", name: "NVIDIA", url: "https://blogs.nvidia.com/feed/", defaultCategory: "companies" },
  { id: "microsoft-ai", name: "Microsoft AI", url: "https://news.microsoft.com/source/topics/ai/feed/", defaultCategory: "companies" },
  { id: "mit-news-ai", name: "MIT News", url: "https://news.mit.edu/rss/topic/artificial-intelligence2", defaultCategory: "research" },
  { id: "techcrunch-ai", name: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/", defaultCategory: "ai-news" },
  { id: "venturebeat-ai", name: "VentureBeat", url: "https://venturebeat.com/category/ai/feed/", defaultCategory: "ai-news" },
  { id: "theverge-ai", name: "The Verge", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", defaultCategory: "ai-news" },
  { id: "arstechnica-ai", name: "Ars Technica", url: "https://arstechnica.com/ai/feed/", defaultCategory: "ai-news" }
];

const FETCH_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 8 * 60 * 1000; // 8 phút - dùng cho cache "nóng" trong cùng 1 instance
const MAX_ITEMS = 150;

// ---------- 2. BỘ LỌC NỘI DUNG ----------
const AI_KEYWORDS = [
  "ai", "a.i.", "artificial intelligence", "machine learning", "ml model", "deep learning",
  "llm", "large language model", "generative ai", "genai", "chatgpt", "gpt-", "gpt5", "gpt-5",
  "gemini", "claude", "anthropic", "openai", "copilot", "llama", "mistral", "grok", "xai",
  "neural network", "transformer model", "diffusion model", "text-to-image", "text-to-video",
  "agentic", "ai agent", "ai model", "ai chip", "nvidia", "chatbot", "foundation model",
  "trí tuệ nhân tạo", "học máy", "mô hình ai"
];

const SPAM_PATTERNS = [
  /sponsored/i,
  /\bpress release\b/i,
  /\baffiliate\b/i,
  /\[deal\]/i,
  /discount code/i,
  /coupon/i
];

function isAiRelated(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  return AI_KEYWORDS.some(k => text.includes(k));
}

function isSpam(title, description) {
  const text = `${title} ${description}`;
  return SPAM_PATTERNS.some(p => p.test(text));
}

// ---------- 3. PHÂN LOẠI CATEGORY ----------
// All / AI News / Research / AI Tools / Companies / Technology
function categorize(title, description, source) {
  const text = `${title} ${description}`.toLowerCase();

  const researchWords = ["paper", "arxiv", "research", "study", "benchmark", "dataset", "study finds", "researchers"];
  const toolWords = ["launch", "launches", "release", "released", "available now", "new feature", "app", "extension", "api", "tool", "update", "rolling out", "beta"];
  const companyWords = ["announces", "partnership", "acquire", "acquisition", "raises", "funding", "ipo", "ceo", "lawsuit", "valuation", "investment", "hires", "layoffs"];
  const techWords = ["chip", "gpu", "data center", "datacenter", "infrastructure", "hardware", "processor", "cloud computing", "supercomputer"];

  const score = { research: 0, "ai-tools": 0, companies: 0, technology: 0 };
  researchWords.forEach(w => { if (text.includes(w)) score.research++; });
  toolWords.forEach(w => { if (text.includes(w)) score["ai-tools"]++; });
  companyWords.forEach(w => { if (text.includes(w)) score.companies++; });
  techWords.forEach(w => { if (text.includes(w)) score.technology++; });

  let best = "ai-news";
  let bestScore = 0;
  Object.entries(score).forEach(([cat, s]) => {
    if (s > bestScore) { best = cat; bestScore = s; }
  });

  if (bestScore === 0) {
    // fallback theo nguồn mặc định
    return source.defaultCategory || "ai-news";
  }
  return best;
}

// ---------- 4. PARSER RSS/ATOM (không dùng thư viện ngoài) ----------
function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function stripHtml(str) {
  if (!str) return "";
  return decodeEntities(str.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function matchTag(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

function matchAttr(block, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*/?>`, "i");
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

function extractImage(itemBlock, descriptionHtml) {
  // enclosure url=""
  let img = matchAttr(itemBlock, "enclosure", "url");
  if (img && /\.(jpg|jpeg|png|webp|gif)/i.test(img)) return img;
  // media:content url="" or media:thumbnail url=""
  img = matchAttr(itemBlock, "media:content", "url") || matchAttr(itemBlock, "media:thumbnail", "url");
  if (img) return img;
  // <img src="..."> inside description/content
  if (descriptionHtml) {
    const m = descriptionHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m) return m[1];
  }
  return null;
}

function parseDate(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d.toISOString();
  return null;
}

function parseFeed(xml, source) {
  const items = [];
  // RSS 2.0: <item>...</item>
  const isAtom = /<feed[\s>]/i.test(xml) && !/<rss[\s>]/i.test(xml);
  const blocks = isAtom
    ? xml.match(/<entry[\s\S]*?<\/entry>/gi) || []
    : xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (const block of blocks) {
    const rawTitle = matchTag(block, "title");
    let link = null;
    if (isAtom) {
      link = matchAttr(block, "link", "href") || matchTag(block, "link");
    } else {
      link = matchTag(block, "link");
    }
    if (!link) continue;
    link = link.trim();

    const rawDesc =
      matchTag(block, "content:encoded") ||
      matchTag(block, "description") ||
      matchTag(block, "summary") ||
      matchTag(block, "content") ||
      "";

    const rawDate =
      matchTag(block, "pubDate") ||
      matchTag(block, "published") ||
      matchTag(block, "updated") ||
      matchTag(block, "dc:date");

    const title = stripHtml(decodeEntities(rawTitle || "")).trim();
    if (!title) continue;

    const descriptionText = stripHtml(decodeEntities(rawDesc)).slice(0, 400);
    const image = extractImage(block, decodeEntities(rawDesc));
    const publishedAt = parseDate(rawDate) || new Date().toISOString();

    items.push({
      title,
      description: descriptionText.length > 220 ? descriptionText.slice(0, 217) + "…" : descriptionText,
      url: link,
      source: source.name,
      sourceId: source.id,
      image,
      publishedAt
    });
  }
  return items;
}

// ---------- 5. FETCH 1 NGUỒN (có timeout, không throw ra ngoài) ----------
async function fetchSource(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AINewsBot/1.0; +https://vercel.com)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*"
      }
    });
    if (!res.ok) {
      return { source: source.id, ok: false, error: `HTTP ${res.status}`, items: [] };
    }
    const xml = await res.text();
    const items = parseFeed(xml, source);
    return { source: source.id, ok: true, items };
  } catch (err) {
    return { source: source.id, ok: false, error: err && err.message ? err.message : String(err), items: [] };
  } finally {
    clearTimeout(timer);
  }
}

function normalizeUrl(u) {
  try {
    const url = new URL(u);
    url.hash = "";
    // Bỏ các tham số tracking phổ biến để dedupe chính xác hơn
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "source"].forEach(p =>
      url.searchParams.delete(p)
    );
    return url.toString().replace(/\/$/, "");
  } catch {
    return u;
  }
}

function hashId(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return "n" + Math.abs(h).toString(36);
}

// ---------- 6. TỔNG HỢP: FETCH TẤT CẢ NGUỒN, LỌC, DEDUPE, SẮP XẾP ----------
async function aggregateAll() {
  const results = await Promise.allSettled(SOURCES.map(fetchSource));

  const perSourceStatus = [];
  const seen = new Map(); // normalizedUrl -> item
  const seenTitles = new Set();

  for (let i = 0; i < results.length; i++) {
    const source = SOURCES[i];
    const r = results[i].status === "fulfilled" ? results[i].value : { source: source.id, ok: false, error: "rejected", items: [] };
    perSourceStatus.push({ source: source.id, name: source.name, ok: r.ok, error: r.error || null, count: r.items.length });

    for (const raw of r.items) {
      if (!raw.title || !raw.url) continue;
      if (isSpam(raw.title, raw.description)) continue;
      if (!isAiRelated(raw.title, raw.description)) continue;

      const normUrl = normalizeUrl(raw.url);
      if (seen.has(normUrl)) continue;

      const titleKey = raw.title.toLowerCase().trim().replace(/\s+/g, " ");
      if (seenTitles.has(titleKey)) continue;

      const category = categorize(raw.title, raw.description, source);

      const item = {
        id: hashId(normUrl),
        title: raw.title,
        description: raw.description,
        url: raw.url,
        source: raw.source,
        image: raw.image || null,
        publishedAt: raw.publishedAt,
        category
      };

      seen.set(normUrl, item);
      seenTitles.add(titleKey);
    }
  }

  const items = Array.from(seen.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);

  const anySuccess = perSourceStatus.some(s => s.ok && s.count > 0);

  return {
    items,
    sources: perSourceStatus,
    anySuccess,
    fetchedAt: new Date().toISOString()
  };
}

// ---------- 7. CACHE (best-effort, trong bộ nhớ + /tmp của instance) ----------
// Lưu ý: serverless function trên Vercel không đảm bảo instance được tái sử dụng,
// nên cache này CHỈ có tác dụng giảm tải khi cùng 1 instance xử lý nhiều request
// liên tiếp (warm start). Đây KHÔNG phải cache bền vững giữa các lần cold start.
// Fallback bền vững thực sự nằm ở phía client (localStorage) - xem public/ai-news.js.
let memoryCache = { data: null, ts: 0 };

const fs = require("fs");
const path = require("path");
const TMP_CACHE_FILE = path.join(require("os").tmpdir(), "ai-news-cache.json");

function readTmpCache() {
  try {
    const raw = fs.readFileSync(TMP_CACHE_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeTmpCache(payload) {
  try {
    fs.writeFileSync(TMP_CACHE_FILE, JSON.stringify(payload), "utf8");
  } catch {
    // best-effort only, /tmp có thể read-only tùy runtime -> bỏ qua lỗi
  }
}

async function getNews({ forceRefresh = false } = {}) {
  const now = Date.now();

  if (!forceRefresh && memoryCache.data && now - memoryCache.ts < CACHE_TTL_MS) {
    return { ...memoryCache.data, servedFrom: "memory-cache" };
  }

  if (!forceRefresh) {
    const tmp = readTmpCache();
    if (tmp && now - new Date(tmp.fetchedAt).getTime() < CACHE_TTL_MS) {
      memoryCache = { data: tmp, ts: now };
      return { ...tmp, servedFrom: "tmp-cache" };
    }
  }

  const result = await aggregateAll();

  if (result.anySuccess) {
    memoryCache = { data: result, ts: now };
    writeTmpCache(result);
    return { ...result, servedFrom: "live" };
  }

  // Toàn bộ nguồn lỗi -> dùng cache gần nhất nếu có (dù đã hết hạn TTL)
  const staleTmp = readTmpCache();
  if (staleTmp) {
    return { ...staleTmp, servedFrom: "stale-cache", sources: result.sources };
  }
  if (memoryCache.data) {
    return { ...memoryCache.data, servedFrom: "stale-memory-cache", sources: result.sources };
  }

  // Không có gì cả (lần chạy đầu tiên + tất cả nguồn lỗi)
  return { ...result, servedFrom: "empty" };
}

module.exports = {
  SOURCES,
  aggregateAll,
  getNews,
  categorize
};
