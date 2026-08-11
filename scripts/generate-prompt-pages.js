#!/usr/bin/env node
// =======================================
// 📚 PROMPT LIBRARY — Static SEO page generator
// =======================================
//
// VÌ SAO CẦN FILE NÀY?
// Website hiện tại là 1 trang duy nhất (SPA): mọi URL /prompts/<slug> đều
// được vercel.json / _redirects trả về CÙNG 1 file index.html, rồi
// prompts.js dùng JavaScript để "mở" đúng prompt theo URL. Cách này đủ để
// người dùng dùng được, và đủ để Googlebot (có chạy JS) đọc được nội dung —
// nhưng:
//   - Mọi prompt tạm thời dùng chung 1 <title>/<meta description> lúc HTML
//     thô vừa tải xong (trước khi JS kịp chạy).
//   - Các trình thu thập KHÔNG chạy JavaScript (Facebook/Zalo/Discord link
//     preview, một số bot SEO khác) sẽ chỉ thấy thẻ Open Graph mặc định của
//     trang chủ, không phải của từng prompt.
//
// Script này giải quyết bằng cách sinh SẴN 1 file HTML tĩnh cho mỗi prompt,
// tại đúng đường dẫn /prompts/<slug>/index.html. Nó CHÍNH LÀ index.html gốc
// (y hệt phần <body>, y hệt toàn bộ app/JS/CSS — nên vẫn tương tác đầy đủ
// như bình thường sau khi tải xong), CHỈ khác phần <head> nằm giữa
// <!-- SEO:START --> và <!-- SEO:END --> được thay bằng title/description/
// canonical/OG/Twitter/JSON-LD RIÊNG cho đúng prompt đó.
//
// Vercel/Netlify đều ưu tiên phục vụ file tĩnh có sẵn trên ổ đĩa TRƯỚC KHI
// áp dụng rewrite trong vercel.json / _redirects — nên khi các file này tồn
// tại, /prompts/<slug> sẽ trả thẳng file đã sinh (với đúng SEO tag), thay vì
// bị rewrite về index.html gốc.
//
// CÁCH DÙNG:
//   node scripts/generate-prompt-pages.js
//
// KHI NÀO CẦN CHẠY LẠI:
//   - Sau khi sửa data/prompts.json (thêm/sửa/xoá prompt mẫu).
//   - Sau khi Admin thêm/sửa/xoá prompt qua Firebase VÀ bạn muốn prompt đó
//     cũng có trang tĩnh riêng cho SEO (dùng tab "Backup/Restore" trong
//     Admin để tải dữ liệu Firebase hiện tại về, ghi đè data/prompts.json,
//     rồi chạy lại script này và deploy lại). Nếu không chạy lại, prompt mới
//     vẫn hoạt động bình thường cho người dùng (vì prompts.js vẫn đọc dữ
//     liệu thật từ Firebase) — chỉ là chưa có trang tĩnh riêng cho SEO, vẫn
//     dùng chung thẻ SEO của trang chủ giống trước đây.
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

const CATEGORY_LABELS = {
  coding: "Coding",
  writing: "Writing",
  marketing: "Marketing",
  image: "Image",
  video: "Video",
  study: "Study",
  business: "Business",
  productivity: "Productivity",
  research: "Research",
  other: "AI",
};

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

function buildSeoBlock(prompt) {
  const catLabel = CATEGORY_LABELS[prompt.category] || prompt.category || "AI";
  const aiList = Array.isArray(prompt.ai) ? prompt.ai : [];
  const title = `${prompt.title} — Free ${catLabel} AI Prompt | ${SITE_NAME}`;
  const description =
    (prompt.description && prompt.description.trim()) ||
    `Copy-ready ${catLabel} prompt${aiList.length ? " for " + aiList.join(", ") : ""} from the ${SITE_NAME} Prompt Library.`;
  const url = `${SITE_URL}/prompts/${prompt.slug}`;
  const image = `${SITE_URL}/brand/logo-1024.png`;
  const keywords = [
    prompt.title,
    catLabel + " prompt",
    ...(aiList.map(a => a + " prompt")),
    ...(Array.isArray(prompt.tags) ? prompt.tags : []),
  ].filter(Boolean).join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": prompt.title,
    "description": description,
    "url": url,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "keywords": keywords || undefined,
    "genre": catLabel,
    "dateCreated": prompt.createdAt || undefined,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL + "/"
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/brand/logo-512.png` }
    }
  };
  // Loại bỏ field undefined để tránh sinh JSON-LD sai/rác
  Object.keys(jsonLd).forEach(k => jsonLd[k] === undefined && delete jsonLd[k]);

  return `<!-- SEO:START (sinh tự động bởi scripts/generate-prompt-pages.js cho prompt "${escapeAttr(prompt.slug)}" — KHÔNG sửa tay, sửa data/prompts.json rồi chạy lại script) -->
    <title>${escapeHtml(title)}</title>

    <meta name="description" content="${escapeAttr(description)}">

    <link rel="canonical" href="${url}">

    <meta property="og:site_name" content="${SITE_BRAND_FULL}">
    <meta name="application-name" content="${SITE_BRAND_FULL}">
    <meta name="apple-mobile-web-app-title" content="${SITE_BRAND_FULL}">

    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>

    <meta property="og:type" content="article">
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

function main() {
  const templatePath = path.join(ROOT, "index.html");
  const dataPath = path.join(ROOT, "data", "prompts.json");
  const outDir = path.join(ROOT, "prompts");

  const template = fs.readFileSync(templatePath, "utf8");
  const prompts = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  const seoRegex = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;
  if (!seoRegex.test(template)) {
    console.error("Không tìm thấy khối <!-- SEO:START --> ... <!-- SEO:END --> trong index.html. Dừng lại để tránh sinh trang sai.");
    process.exit(1);
  }

  // Các trang /prompts/<slug>/index.html nằm SÂU HƠN 2 cấp thư mục so với
  // gốc site (vd: /prompts/api-documentation-writer/index.html). index.html
  // gốc dùng đường dẫn asset dạng "/style.css" (root-relative) — đúng khi
  // deploy thật trên Vercel ở MỌI URL (/, /prompts, /prompts/<slug>), nhưng
  // nếu giữ nguyên "/style.css" trong các trang con thì khi mở trực tiếp
  // bằng cách double-click file (file://) trình duyệt sẽ hiểu "/" là gốc Ổ
  // ĐĨA chứ không phải gốc project → toàn bộ CSS/JS/ảnh 404 → trang chỉ còn
  // chữ thô, không có giao diện.
  //
  // Vì vậy, RIÊNG cho các trang sinh ra trong /prompts/<slug>/, ta đổi các
  // đường dẫn asset cục bộ đó thành dạng tương đối "../../..." — vừa đúng
  // khi deploy thật (đi lên 2 cấp thư mục từ /prompts/<slug>/ ra gốc site),
  // vừa đúng khi mở trực tiếp bằng file:// (đi lên 2 cấp thư mục thật trên
  // ổ đĩa ra đúng thư mục gốc project). Không đụng tới URL tuyệt đối
  // (https://...) như canonical/OG/JSON-LD.
  const LOCAL_ASSET_PATHS = [
    "style.css", "admin-panel-styles.css", "quiz.css", "usecases.css",
    "battle.css", "prompts.css",
    "analytics.js",
    "data.js", "prompts-data.js", "articles.js", "battle-data.js",
    "translations.js", "firebase-config.js", "admin-auth-system.js",
    "admin-ui-handler.js", "script.js", "battle.js", "quiz.js",
    "usecases.js", "prompts.js", "cosmic-fx.js",
    "favicon.svg", "favicon.ico", "site.webmanifest",
  ];

  function toNestedRelativePaths(html) {
    let out = html;
    LOCAL_ASSET_PATHS.forEach(p => {
      // Khớp cả 2 dạng có thể có trong index.html gốc: "/style.css" (root-
      // relative) hoặc "style.css" (tương đối thường) — luôn quy về
      // "../../style.css" cho trang con, bất kể template gốc đang viết kiểu
      // nào tại thời điểm chạy script.
      const re = new RegExp(`(src|href)="/?${p.replace(/\./g, "\\.")}"`, "g");
      out = out.replace(re, `$1="../../${p}"`);
    });
    // Thư mục brand/ (favicon PNG, apple-touch-icon, logo...)
    out = out.replace(/(src|href)="\/?brand\//g, '$1="../../brand/');
    return out;
  }

  const validPrompts = prompts.filter(p => p && p.slug && p.title);
  const seenSlugs = new Set();
  let generated = 0;

  // Xoá các trang cũ (nếu prompt đã bị đổi slug/xoá khỏi data/prompts.json)
  // trước khi sinh lại, để không để lại trang rác không còn trong dữ liệu.
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  validPrompts.forEach(prompt => {
    if (seenSlugs.has(prompt.slug)) {
      console.warn(`Bỏ qua slug trùng lặp: ${prompt.slug}`);
      return;
    }
    seenSlugs.add(prompt.slug);

    const seoBlock = buildSeoBlock(prompt);
    let html = template.replace(seoRegex, seoBlock);
    html = toNestedRelativePaths(html);

    const dir = path.join(outDir, prompt.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    generated++;
  });

  console.log(`✅ Đã sinh ${generated} trang tĩnh tại /prompts/<slug>/index.html (từ ${validPrompts.length} prompt trong data/prompts.json).`);
}

main();
