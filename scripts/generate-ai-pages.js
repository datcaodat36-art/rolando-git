#!/usr/bin/env node
// =======================================
// 🤖 AI LANDING PAGES — Static SEO page generator
// =======================================
//
// VÌ SAO CẦN FILE NÀY?
// Giống hệt lý do của scripts/generate-prompt-pages.js (đọc comment ở đầu
// file đó để hiểu đầy đủ cơ chế) — nhưng áp dụng cho TRANG CHI TIẾT CỦA
// TỪNG AI thay vì từng prompt.
//
// Website vẫn là 1 SPA duy nhất: script.js đọc URL /ai/<slug>, tìm đúng
// AI theo trường "slug" trong aiTools (data.js), rồi tự mở modal chi tiết
// đầy đủ (mô tả, tính năng, giá, ưu/nhược, AI thay thế, prompt gợi ý,
// screenshot, FAQ...) ngay khi trang tải xong. Cách này đủ để người dùng
// dùng được và đủ để Googlebot (chạy JS) đọc nội dung — nhưng các trình
// thu thập KHÔNG chạy JS (preview link Zalo/Facebook/Discord, một số bot
// SEO khác) sẽ chỉ thấy <title>/<meta> mặc định của trang chủ.
//
// Script này sinh SẴN 1 file HTML tĩnh cho mỗi AI, tại đúng đường dẫn
// /ai/<slug>/index.html — CHÍNH LÀ index.html gốc (y hệt phần <body>, JS,
// CSS — vẫn hoạt động đầy đủ sau khi tải xong), CHỈ khác phần <head> giữa
// <!-- SEO:START --> và <!-- SEO:END --> được thay bằng title/description/
// canonical/OG/Twitter/JSON-LD (SoftwareApplication + FAQPage) RIÊNG cho
// đúng AI đó.
//
// CÁCH DÙNG:
//   node scripts/generate-ai-pages.js
//
// KHI NÀO CẦN CHẠY LẠI:
//   - Sau khi sửa/thêm dữ liệu trong ai-pages-data.js (bảng giá, FAQ,
//     screenshot, AI thay thế, SEO...).
//   - Sau khi thêm "slug" cho một AI mới trong data.js muốn có trang riêng.
//
// Không dùng thư viện ngoài — chỉ Node.js "fs"/"path" có sẵn.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://tool-ai-eta.vercel.app";
const SITE_NAME = "AI Tools";
// Dùng riêng cho og:site_name / application-name / apple-mobile-web-app-title
// theo yêu cầu đổi tên thương hiệu đầy đủ.
const SITE_BRAND_FULL = "AI Tools – Free AI Tools Online";

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
  return escapeHtml(str);
}

// data.js va ai-pages-data.js dung "const" o pham vi module (khong gan vao
// window/module.exports). const/let khai bao qua vm.runInContext KHONG gan
// vao object sandbox (chi "var" va function declaration moi lam vay), nen
// thay vao do bọc code trong 1 Function rồi "return" đúng biến cần lấy ra
// từ scope cục bộ của hàm đó — không cần sửa data.js/ai-pages-data.js.
function loadDataFile(relPath, varNames) {
  const code = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  const fn = new Function(`${code}\nreturn { ${varNames.join(", ")} };`);
  return fn();
}

function buildSeoBlock(tool, page) {
  const seo = (page && page.seo) || {};
  const title = (seo.title && seo.title.en) || `${tool.name} — Review, Pricing & Features | ${SITE_NAME}`;
  const description = (seo.description && seo.description.en) ||
    `${tool.name}: features, pricing, pros & cons, and alternatives, reviewed on ${SITE_NAME}.`;
  const url = `${SITE_URL}/ai/${tool.slug}`;
  const image = `${SITE_URL}/brand/logo-1024.png`;
  const keywords = (seo.keywords || [tool.name, `${tool.name} review`, `${tool.name} pricing`]).join(", ");

  const faqEntities = (page && page.faq && page.faq.length) ? page.faq.map(item => ({
    "@type": "Question",
    "name": item.q && item.q.en,
    "acceptedAnswer": { "@type": "Answer", "text": item.a && item.a.en }
  })) : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": description,
    "url": url,
    "applicationCategory": "AI Application",
    "offers": (page && page.pricing) ? {
      "@type": "Offer",
      "price": page.pricing.free ? "0" : undefined,
      "priceCurrency": "USD"
    } : undefined,
    "aggregateRating": tool.rating ? {
      "@type": "AggregateRating",
      "ratingValue": tool.rating,
      "bestRating": "5",
      "ratingCount": "1"
    } : undefined,
    "image": image,
    "isPartOf": { "@type": "WebSite", "name": SITE_NAME, "url": SITE_URL + "/" },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/brand/logo-512.png` }
    }
  };
  Object.keys(jsonLd).forEach(k => jsonLd[k] === undefined && delete jsonLd[k]);
  if (jsonLd.offers) {
    Object.keys(jsonLd.offers).forEach(k => jsonLd.offers[k] === undefined && delete jsonLd.offers[k]);
  }

  const faqJsonLd = faqEntities.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqEntities
  } : null;

  return `<!-- SEO:START (sinh tự động bởi scripts/generate-ai-pages.js cho AI "${escapeAttr(tool.slug)}" — KHÔNG sửa tay, sửa ai-pages-data.js rồi chạy lại script) -->
    <title>${escapeHtml(title)}</title>

    <meta name="description" content="${escapeAttr(description)}">
    <meta name="keywords" content="${escapeAttr(keywords)}">

    <link rel="canonical" href="${url}">

    <meta property="og:site_name" content="${SITE_BRAND_FULL}">
    <meta name="application-name" content="${SITE_BRAND_FULL}">
    <meta name="apple-mobile-web-app-title" content="${SITE_BRAND_FULL}">

    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
${faqJsonLd ? `    <script type="application/ld+json">
${JSON.stringify(faqJsonLd, null, 2)}
    </script>
` : ""}
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="1024">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(title)}">
    <meta name="twitter:description" content="${escapeAttr(description)}">
    <meta name="twitter:image" content="${image}">
    <!-- SEO:END -->`;
}

const LOCAL_ASSET_PATHS = [
  "style.css", "admin-panel-styles.css", "quiz.css", "usecases.css",
  "battle.css", "prompts.css",
  "analytics.js",
  "data.js", "ai-pages-data.js", "prompts-data.js", "articles.js", "battle-data.js",
  "translations.js", "firebase-config.js", "admin-auth-system.js",
  "admin-ui-handler.js", "script.js", "battle.js", "quiz.js",
  "usecases.js", "prompts.js", "cosmic-fx.js",
  "favicon.svg", "favicon.ico", "site.webmanifest",
];

function toNestedRelativePaths(html) {
  let out = html;
  LOCAL_ASSET_PATHS.forEach(p => {
    const re = new RegExp(`(src|href)="/?${p.replace(/\./g, "\\.")}"`, "g");
    out = out.replace(re, `$1="../../${p}"`);
  });
  out = out.replace(/(src|href)="\/?brand\//g, '$1="../../brand/');
  return out;
}

function main() {
  const templatePath = path.join(ROOT, "index.html");
  const template = fs.readFileSync(templatePath, "utf8");
  const outDir = path.join(ROOT, "ai");

  const { aiTools } = loadDataFile("data.js", ["aiTools"]);
  const { aiPagesData } = loadDataFile("ai-pages-data.js", ["aiPagesData"]);

  const seoRegex = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;
  if (!seoRegex.test(template)) {
    console.error("Không tìm thấy khối <!-- SEO:START --> ... <!-- SEO:END --> trong index.html. Dừng lại để tránh sinh trang sai.");
    process.exit(1);
  }

  const targets = (aiTools || []).filter(tool => tool && tool.slug);

  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  let generated = 0;
  const seenSlugs = new Set();

  targets.forEach(tool => {
    if (seenSlugs.has(tool.slug)) {
      console.warn(`Bỏ qua slug trùng lặp: ${tool.slug}`);
      return;
    }
    seenSlugs.add(tool.slug);

    const page = aiPagesData ? aiPagesData[tool.name] : null;
    const seoBlock = buildSeoBlock(tool, page);
    let html = template.replace(seoRegex, seoBlock);
    html = toNestedRelativePaths(html);

    const dir = path.join(outDir, tool.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    generated++;
  });

  console.log(`✅ Đã sinh ${generated} trang tĩnh tại /ai/<slug>/index.html (từ ${targets.length} AI có "slug" trong data.js).`);
}

main();
