// =======================================
// 🗂️ AI LANDING PAGES — dữ liệu mở rộng cho từng trang /ai/<slug>
// =======================================
// File này TÁCH RIÊNG khỏi data.js (giống articles.js), chỉ chứa các
// trường PHỤ THÊM cần cho một "trang landing riêng" của từng AI:
//   - pricing     : bảng giá rút gọn (miễn phí/gói trả phí)
//   - categoryTags: các thẻ danh mục hiển thị trên trang (có thể nhiều hơn
//                   1 category chính trong aiTools)
//   - alternatives: tên các AI thay thế/cạnh tranh trực tiếp (khớp với
//                   trường "name" trong aiTools để tra cứu logo/link/rating)
//   - faq         : câu hỏi thường gặp riêng cho AI này (song ngữ)
//   - screenshots : danh sách Ô ảnh minh hoạ — CHƯA có ảnh thật (site chưa
//                   có bộ ảnh chụp màn hình sản phẩm), mỗi mục chỉ có nhãn
//                   mô tả; phần UI sẽ hiện khung placeholder cho tới khi bạn
//                   tải ảnh chụp màn hình thật lên (đặt vào /brand/screenshots/
//                   rồi thêm trường "src" vào từng mục bên dưới).
//   - seo         : title/description/keywords RIÊNG cho trang này (khác
//                   với title/description mặc định của toàn site)
//
// "Best for" và "So sánh với AI khác" đã có sẵn trong articles.js
// (whoShouldUse / comparison) — trang /ai/<slug> sẽ tái sử dụng, không lặp
// lại ở đây. Danh sách "Recommended Prompts" cũng KHÔNG khai báo tay: được
// tính tự động từ data/prompts.json / prompts-default.js (lọc theo trường
// "ai" của mỗi prompt có chứa đúng tên AI này).
//
// Khoá (key) phải khớp CHÍNH XÁC với trường "name" trong aiTools (data.js).
// =======================================

const aiPagesData = {

  "ChatGPT": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Mô hình rút gọn, đủ dùng hằng ngày", en: "Lighter model, fine for everyday use" } },
        { name: { vi: "Plus", en: "Plus" }, price: "$20/mo", note: { vi: "Mô hình mạnh nhất, tạo ảnh, duyệt web", en: "Strongest model, image gen, web browsing" } },
        { name: { vi: "Team / Enterprise", en: "Team / Enterprise" }, price: { vi: "Liên hệ", en: "Contact sales" }, note: { vi: "Bảo mật & quản trị cho doanh nghiệp", en: "Security & admin controls for orgs" } }
      ]
    },
    categoryTags: ["chat", "writing-content", "productivity"],
    alternatives: ["Claude", "Google Gemini", "Grok"],
    faq: [
      { q: { vi: "ChatGPT có miễn phí không?", en: "Is ChatGPT free?" }, a: { vi: "Có, bản miễn phí dùng được ngay không cần thẻ tín dụng, nhưng giới hạn số lượt dùng mô hình mạnh trong ngày.", en: "Yes, the free tier works without a credit card, but usage of the strongest model is capped per day." } },
      { q: { vi: "ChatGPT Plus có đáng nâng cấp không?", en: "Is ChatGPT Plus worth upgrading to?" }, a: { vi: "Đáng cân nhắc nếu bạn dùng hằng ngày cho công việc, cần tạo ảnh hoặc phân tích file thường xuyên.", en: "Worth it if you use it daily for work, or need frequent image generation and file analysis." } },
      { q: { vi: "ChatGPT có dùng được trên điện thoại không?", en: "Does ChatGPT have a mobile app?" }, a: { vi: "Có, ứng dụng chính thức cho cả iOS và Android, đồng bộ lịch sử với bản web.", en: "Yes, official apps for both iOS and Android, synced with the web version." } },
      { q: { vi: "ChatGPT khác gì so với Claude?", en: "How is ChatGPT different from Claude?" }, a: { vi: "ChatGPT có hệ sinh thái plugin rộng hơn; Claude thường được đánh giá viết tự nhiên hơn và xử lý tài liệu dài tốt hơn.", en: "ChatGPT has a broader plugin ecosystem; Claude is often praised for more natural writing and better long-document handling." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện trò chuyện chính", en: "Main chat interface" } },
      { label: { vi: "Tính năng tạo ảnh DALL·E", en: "DALL·E image generation" } },
      { label: { vi: "Custom GPT / thư viện GPT", en: "Custom GPT / GPT store" } }
    ],
    seo: {
      title: { vi: "ChatGPT là gì? Đánh giá, giá, tính năng chi tiết 2026", en: "ChatGPT Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Tìm hiểu ChatGPT: tính năng, bảng giá Free/Plus, ưu nhược điểm, AI thay thế và prompt mẫu để dùng ChatGPT hiệu quả hơn.",
        en: "Everything about ChatGPT: features, Free vs Plus pricing, pros & cons, alternatives, and ready-to-use prompts."
      },
      keywords: ["ChatGPT", "ChatGPT review", "ChatGPT pricing", "OpenAI chatbot", "ChatGPT vs Claude"]
    }
  },

  "Google Gemini": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Dùng được với tài khoản Google thường", en: "Available with any Google account" } },
        { name: { vi: "Google AI Pro", en: "Google AI Pro" }, price: "$19.99/mo", note: { vi: "Mô hình mạnh hơn, giới hạn cao hơn", en: "Stronger model, higher usage limits" } },
        { name: { vi: "Google AI Ultra", en: "Google AI Ultra" }, price: "$249.99/mo", note: { vi: "Giới hạn cao nhất, tính năng sớm nhất", en: "Highest limits, earliest access to new features" } }
      ]
    },
    categoryTags: ["chat", "productivity", "research"],
    alternatives: ["ChatGPT", "Claude", "Perplexity"],
    faq: [
      { q: { vi: "Gemini có tích hợp với Gmail/Docs không?", en: "Does Gemini integrate with Gmail/Docs?" }, a: { vi: "Có, đây là lợi thế lớn nhất của Gemini so với các chatbot khác — có thể đọc và soạn thảo trực tiếp trong Gmail, Docs, Sheets.", en: "Yes, this is Gemini's biggest advantage — it can read and draft directly inside Gmail, Docs, and Sheets." } },
      { q: { vi: "Gemini miễn phí có đủ dùng không?", en: "Is the free tier enough?" }, a: { vi: "Đủ cho nhu cầu cơ bản hằng ngày; các tác vụ cần suy luận sâu hoặc ngữ cảnh dài nên cân nhắc gói Pro.", en: "Fine for everyday basics; deeper reasoning or long-context tasks benefit from the Pro plan." } },
      { q: { vi: "Gemini có thể tìm kiếm thông tin mới nhất không?", en: "Can Gemini search for up-to-date info?" }, a: { vi: "Có, Gemini lấy dữ liệu thời gian thực trực tiếp từ Google Search.", en: "Yes, Gemini pulls real-time information straight from Google Search." } },
      { q: { vi: "Gemini phù hợp với ai nhất?", en: "Who is Gemini best for?" }, a: { vi: "Người dùng đã quen với hệ sinh thái Google (Gmail, Docs, Android) muốn một trợ lý tích hợp sẵn.", en: "People already living in the Google ecosystem (Gmail, Docs, Android) who want a built-in assistant." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện chat Gemini", en: "Gemini chat interface" } },
      { label: { vi: "Tích hợp trong Gmail", en: "Integration inside Gmail" } },
      { label: { vi: "Tạo nội dung trong Google Docs", en: "Drafting inside Google Docs" } }
    ],
    seo: {
      title: { vi: "Google Gemini là gì? Giá, tính năng và so sánh 2026", en: "Google Gemini Review 2026: Pricing, Features & Comparison" },
      description: {
        vi: "Đánh giá Google Gemini: tích hợp Gmail/Docs, bảng giá Free/Pro/Ultra, ưu nhược điểm và các lựa chọn thay thế.",
        en: "Google Gemini reviewed: Gmail/Docs integration, Free/Pro/Ultra pricing, pros & cons, and top alternatives."
      },
      keywords: ["Google Gemini", "Gemini AI review", "Gemini pricing", "Gemini vs ChatGPT"]
    }
  },

  "Claude": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Giới hạn số tin nhắn mỗi ngày", en: "Limited number of messages per day" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$20/mo", note: { vi: "Giới hạn cao hơn, Projects, Artifacts", en: "Higher limits, Projects, Artifacts" } },
        { name: { vi: "Team / Enterprise", en: "Team / Enterprise" }, price: { vi: "Liên hệ", en: "Contact sales" }, note: { vi: "Quản trị nhóm, bảo mật nâng cao", en: "Team admin & advanced security" } }
      ]
    },
    categoryTags: ["chat", "code", "writing-content"],
    alternatives: ["ChatGPT", "Google Gemini", "GitHub Copilot"],
    faq: [
      { q: { vi: "Claude có miễn phí không?", en: "Is Claude free?" }, a: { vi: "Có, claude.ai cho dùng miễn phí với giới hạn số tin nhắn mỗi ngày; gói Pro tăng giới hạn và mở khoá Projects/Artifacts.", en: "Yes, claude.ai offers a free tier with a daily message cap; Pro raises the limit and unlocks Projects/Artifacts." } },
      { q: { vi: "Claude mạnh nhất ở điểm nào?", en: "What is Claude best known for?" }, a: { vi: "Xử lý tài liệu rất dài, viết văn tự nhiên và lập trình chính xác với ít lỗi cú pháp.", en: "Handling very long documents, natural writing, and accurate coding with fewer syntax errors." } },
      { q: { vi: "Artifacts trong Claude là gì?", en: "What is Artifacts in Claude?" }, a: { vi: "Là khung xem trực tiếp kết quả (code, tài liệu, trang web nhỏ) ngay trong cuộc trò chuyện, không cần chuyển sang công cụ khác.", en: "A live preview pane for output (code, documents, small web pages) right inside the chat, no need to switch tools." } },
      { q: { vi: "Claude có tạo hình ảnh được không?", en: "Can Claude generate images?" }, a: { vi: "Không trực tiếp — Claude tập trung vào văn bản, code và tài liệu, cần dùng công cụ ảnh riêng như Midjourney nếu cần tạo ảnh.", en: "Not directly — Claude focuses on text, code, and documents; use a dedicated image tool like Midjourney for image generation." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện trò chuyện Claude", en: "Claude chat interface" } },
      { label: { vi: "Tính năng Artifacts xem trực tiếp code", en: "Artifacts live code preview" } },
      { label: { vi: "Không gian làm việc Projects", en: "Projects workspace" } }
    ],
    seo: {
      title: { vi: "Claude AI là gì? Giá, tính năng, đánh giá chi tiết 2026", en: "Claude AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Tìm hiểu Claude của Anthropic: Artifacts, Projects, bảng giá Free/Pro, ưu nhược điểm và AI thay thế.",
        en: "Explore Anthropic's Claude: Artifacts, Projects, Free/Pro pricing, pros & cons, and alternatives."
      },
      keywords: ["Claude AI", "Claude review", "Anthropic Claude pricing", "Claude vs ChatGPT"]
    }
  },

  "Grok": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Dùng giới hạn qua ứng dụng X", en: "Limited access via the X app" } },
        { name: { vi: "X Premium+", en: "X Premium+" }, price: "$40/mo", note: { vi: "Truy cập Grok đầy đủ + các tính năng X", en: "Full Grok access plus X features" } },
        { name: { vi: "SuperGrok", en: "SuperGrok" }, price: "$30/mo", note: { vi: "Gói riêng cho Grok, không cần X Premium", en: "Standalone Grok plan without X Premium" } }
      ]
    },
    categoryTags: ["chat", "research"],
    alternatives: ["ChatGPT", "Google Gemini", "Perplexity"],
    faq: [
      { q: { vi: "Grok khác gì các chatbot khác?", en: "How is Grok different?" }, a: { vi: "Grok tích hợp sâu với X (Twitter), truy cập được các bài đăng và xu hướng gần như thời gian thực.", en: "Grok integrates deeply with X (Twitter), giving it near real-time access to posts and trends." } },
      { q: { vi: "Grok có miễn phí không?", en: "Is Grok free?" }, a: { vi: "Có bản dùng thử giới hạn; để dùng đầy đủ cần gói X Premium+ hoặc SuperGrok.", en: "There's a limited free trial; full access requires X Premium+ or SuperGrok." } },
      { q: { vi: "Grok phù hợp với ai?", en: "Who is Grok for?" }, a: { vi: "Người dùng X thường xuyên muốn một trợ lý AI nắm bắt tin tức/xu hướng mới nhất.", en: "Frequent X users who want an AI assistant that tracks the latest news and trends." } },
      { q: { vi: "Grok có đáng tin cậy về nội dung không?", en: "Is Grok's content reliable?" }, a: { vi: "Nhìn chung ổn định, nhưng như mọi chatbot AI khác vẫn có thể mắc lỗi — nên kiểm chứng lại thông tin quan trọng.", en: "Generally solid, but like any AI chatbot it can make mistakes — verify important information independently." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện Grok trong X", en: "Grok interface inside X" } },
      { label: { vi: "Chế độ trò chuyện nhanh", en: "Quick chat mode" } },
      { label: { vi: "Tóm tắt xu hướng thời gian thực", en: "Real-time trend summaries" } }
    ],
    seo: {
      title: { vi: "Grok AI là gì? Giá, tính năng và đánh giá 2026", en: "Grok AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Grok của xAI: tích hợp X, bảng giá, ưu nhược điểm và các lựa chọn AI thay thế.",
        en: "xAI's Grok reviewed: X integration, pricing, pros & cons, and alternative AI chatbots."
      },
      keywords: ["Grok AI", "Grok xAI review", "Grok pricing", "Grok vs ChatGPT"]
    }
  },

  "Midjourney": {
    pricing: {
      free: false,
      plans: [
        { name: { vi: "Basic", en: "Basic" }, price: "$10/mo", note: { vi: "~200 ảnh/tháng, dùng cá nhân", en: "~200 images/month, personal use" } },
        { name: { vi: "Standard", en: "Standard" }, price: "$30/mo", note: { vi: "Tạo ảnh không giới hạn tốc độ chậm", en: "Unlimited relaxed-speed generations" } },
        { name: { vi: "Pro / Mega", en: "Pro / Mega" }, price: "$60–120/mo", note: { vi: "Chế độ riêng tư, tạo nhanh nhiều hơn", en: "Stealth mode, more fast-hours" } }
      ]
    },
    categoryTags: ["image", "design"],
    alternatives: ["DALL·E 3", "Stable Diffusion", "FLUX"],
    faq: [
      { q: { vi: "Midjourney có bản miễn phí không?", en: "Does Midjourney have a free plan?" }, a: { vi: "Không, Midjourney yêu cầu trả phí ngay từ đầu, không có bản dùng thử miễn phí lâu dài.", en: "No, Midjourney requires a paid subscription from the start — there's no ongoing free trial." } },
      { q: { vi: "Midjourney dùng qua đâu?", en: "Where do I use Midjourney?" }, a: { vi: "Chủ yếu qua Discord (lệnh /imagine) hoặc web app riêng tại midjourney.com.", en: "Mainly via Discord (the /imagine command) or the standalone web app at midjourney.com." } },
      { q: { vi: "Midjourney khác gì DALL·E 3?", en: "How does Midjourney differ from DALL·E 3?" }, a: { vi: "Midjourney thiên về chất lượng nghệ thuật và phong cách độc đáo; DALL·E 3 bám sát mô tả văn bản và tích hợp sẵn trong ChatGPT.", en: "Midjourney leans toward artistic quality and distinctive style; DALL·E 3 follows text prompts more literally and is built into ChatGPT." } },
      { q: { vi: "Có thể dùng ảnh Midjourney để kinh doanh không?", en: "Can Midjourney images be used commercially?" }, a: { vi: "Các gói trả phí thường cho phép dùng thương mại, nhưng nên đọc kỹ điều khoản bản quyền mới nhất trước khi dùng.", en: "Paid plans generally allow commercial use, but always check the latest terms of service before relying on it." } }
    ],
    screenshots: [
      { label: { vi: "Lệnh /imagine trên Discord", en: "The /imagine command on Discord" } },
      { label: { vi: "Web app tạo ảnh", en: "Standalone image-generation web app" } },
      { label: { vi: "Thư viện biến thể ảnh", en: "Image variation gallery" } }
    ],
    seo: {
      title: { vi: "Midjourney là gì? Giá, cách dùng và đánh giá 2026", en: "Midjourney Review 2026: Pricing, How to Use & Alternatives" },
      description: {
        vi: "Tìm hiểu Midjourney: bảng giá Basic/Standard/Pro, cách dùng qua Discord, ưu nhược điểm và AI tạo ảnh thay thế.",
        en: "Everything about Midjourney: Basic/Standard/Pro pricing, how to use it on Discord, pros & cons, and alternatives."
      },
      keywords: ["Midjourney", "Midjourney pricing", "Midjourney review", "Midjourney vs DALL-E"]
    }
  },

  "DALL·E 3": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Trong ChatGPT Free", en: "Inside ChatGPT Free" }, price: "$0", note: { vi: "Số lượt tạo ảnh giới hạn/ngày", en: "Limited generations per day" } },
        { name: { vi: "ChatGPT Plus", en: "ChatGPT Plus" }, price: "$20/mo", note: { vi: "Giới hạn cao hơn, chất lượng ưu tiên", en: "Higher limits, priority quality" } },
        { name: { vi: "API (theo lượt)", en: "API (pay-per-use)" }, price: { vi: "Từ ~$0.02/ảnh", en: "From ~$0.02/image" }, note: { vi: "Dành cho nhà phát triển tích hợp", en: "For developers integrating it directly" } }
      ]
    },
    categoryTags: ["image", "design"],
    alternatives: ["Midjourney", "Stable Diffusion", "Ideogram"],
    faq: [
      { q: { vi: "DALL·E 3 dùng ở đâu?", en: "Where can I use DALL·E 3?" }, a: { vi: "Trực tiếp trong ChatGPT (Free có giới hạn, Plus không giới hạn nhiều), hoặc qua API cho nhà phát triển.", en: "Directly inside ChatGPT (limited on Free, more on Plus), or via the API for developers." } },
      { q: { vi: "DALL·E 3 có miễn phí không?", en: "Is DALL·E 3 free?" }, a: { vi: "Có thể dùng miễn phí với số lượt giới hạn mỗi ngày qua ChatGPT Free.", en: "You can use it free with a daily cap through ChatGPT Free." } },
      { q: { vi: "DALL·E 3 mạnh ở điểm gì?", en: "What is DALL·E 3 best at?" }, a: { vi: "Bám sát mô tả văn bản chi tiết, kể cả chữ viết trong ảnh, nhờ tích hợp chặt với ChatGPT.", en: "Following detailed text prompts closely, including rendering text in images, thanks to tight ChatGPT integration." } },
      { q: { vi: "DALL·E 3 khác Midjourney thế nào?", en: "How is DALL·E 3 different from Midjourney?" }, a: { vi: "DALL·E 3 dễ dùng hơn (chỉ cần gõ trong ChatGPT) nhưng Midjourney thường cho chất lượng nghệ thuật cao hơn.", en: "DALL·E 3 is easier to use (just type inside ChatGPT), but Midjourney often produces higher artistic quality." } }
    ],
    screenshots: [
      { label: { vi: "Tạo ảnh ngay trong ChatGPT", en: "Generating images inside ChatGPT" } },
      { label: { vi: "Chỉnh sửa vùng ảnh (inpainting)", en: "Region editing (inpainting)" } },
      { label: { vi: "Ảnh có chữ chính xác", en: "Images with accurate text rendering" } }
    ],
    seo: {
      title: { vi: "DALL·E 3 là gì? Giá, cách dùng và đánh giá 2026", en: "DALL·E 3 Review 2026: Pricing, How to Use & Alternatives" },
      description: {
        vi: "Đánh giá DALL·E 3 của OpenAI: cách dùng trong ChatGPT, bảng giá, ưu nhược điểm và các AI tạo ảnh thay thế.",
        en: "OpenAI's DALL·E 3 reviewed: how to use it inside ChatGPT, pricing, pros & cons, and image-AI alternatives."
      },
      keywords: ["DALL-E 3", "DALL-E review", "DALL-E pricing", "DALL-E vs Midjourney"]
    }
  },

  "GitHub Copilot": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Giới hạn số lượt hoàn thành code/tháng", en: "Limited completions per month" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$10/mo", note: { vi: "Không giới hạn gợi ý code cơ bản", en: "Unlimited basic code suggestions" } },
        { name: { vi: "Business / Enterprise", en: "Business / Enterprise" }, price: "$19–39/user/mo", note: { vi: "Quản trị nhóm, bảo mật doanh nghiệp", en: "Team admin & enterprise security" } }
      ]
    },
    categoryTags: ["code", "productivity"],
    alternatives: ["Cursor", "Codeium", "Windsurf"],
    faq: [
      { q: { vi: "GitHub Copilot có miễn phí không?", en: "Is GitHub Copilot free?" }, a: { vi: "Có gói Free giới hạn số lượt hoàn thành code mỗi tháng; sinh viên và chủ dự án mã nguồn mở phổ biến có thể được dùng Pro miễn phí.", en: "There's a Free tier with capped completions per month; students and popular open-source maintainers can often get Pro for free." } },
      { q: { vi: "Copilot hỗ trợ những IDE nào?", en: "Which IDEs does Copilot support?" }, a: { vi: "VS Code, Visual Studio, JetBrains IDEs, Neovim và cả GitHub.com (chat trực tiếp trên web).", en: "VS Code, Visual Studio, JetBrains IDEs, Neovim, and directly on GitHub.com via chat." } },
      { q: { vi: "Copilot khác gì Cursor?", en: "How is Copilot different from Cursor?" }, a: { vi: "Copilot là plugin thêm vào IDE có sẵn của bạn; Cursor là một IDE độc lập được xây riêng quanh AI.", en: "Copilot is a plugin added to your existing IDE; Cursor is a standalone IDE built around AI from the ground up." } },
      { q: { vi: "Copilot có tự viết cả tính năng lớn không?", en: "Can Copilot build entire features on its own?" }, a: { vi: "Có, chế độ Copilot Chat/Agent có thể thực hiện các thay đổi nhiều file, nhưng vẫn nên review kỹ trước khi merge.", en: "Yes, Copilot Chat/Agent mode can make multi-file changes, but you should still review carefully before merging." } }
    ],
    screenshots: [
      { label: { vi: "Gợi ý code inline trong VS Code", en: "Inline code suggestions in VS Code" } },
      { label: { vi: "Copilot Chat trong IDE", en: "Copilot Chat inside the IDE" } },
      { label: { vi: "Giải thích & sửa lỗi code", en: "Code explanation & bug fixing" } }
    ],
    seo: {
      title: { vi: "GitHub Copilot là gì? Giá, tính năng, đánh giá 2026", en: "GitHub Copilot Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Tìm hiểu GitHub Copilot: bảng giá Free/Pro/Business, IDE hỗ trợ, ưu nhược điểm và các AI coding thay thế.",
        en: "GitHub Copilot explained: Free/Pro/Business pricing, supported IDEs, pros & cons, and coding-AI alternatives."
      },
      keywords: ["GitHub Copilot", "Copilot pricing", "Copilot review", "Copilot vs Cursor"]
    }
  },

  "Perplexity": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Tìm kiếm AI có trích dẫn nguồn không giới hạn cơ bản", en: "Unlimited basic AI search with citations" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$20/mo", note: { vi: "Mô hình mạnh hơn, tạo file/hình ảnh, tìm kiếm chuyên sâu", en: "Stronger models, file/image generation, deep research" } }
      ]
    },
    categoryTags: ["research", "chat"],
    alternatives: ["Google Gemini", "ChatGPT", "Grok"],
    faq: [
      { q: { vi: "Perplexity khác gì Google Search?", en: "How is Perplexity different from Google Search?" }, a: { vi: "Perplexity tổng hợp câu trả lời trực tiếp kèm trích dẫn nguồn, thay vì chỉ trả về danh sách link như Google.", en: "Perplexity synthesizes a direct answer with cited sources, instead of just returning a list of links like Google." } },
      { q: { vi: "Perplexity có miễn phí không?", en: "Is Perplexity free?" }, a: { vi: "Có, bản miễn phí đã dùng tốt cho tra cứu hằng ngày; gói Pro mở khoá tìm kiếm chuyên sâu và mô hình mạnh hơn.", en: "Yes, the free tier works well for everyday research; Pro unlocks deep research mode and stronger models." } },
      { q: { vi: "Perplexity có đáng tin cậy không?", en: "Is Perplexity reliable?" }, a: { vi: "Đáng tin hơn chatbot thông thường nhờ luôn kèm nguồn trích dẫn để bạn tự kiểm chứng.", en: "More trustworthy than a typical chatbot since it always attaches sources you can verify yourself." } },
      { q: { vi: "Perplexity phù hợp với ai?", en: "Who is Perplexity for?" }, a: { vi: "Người cần tra cứu, nghiên cứu nhanh và muốn biết chính xác thông tin lấy từ nguồn nào.", en: "Anyone who needs fast research and wants to know exactly which source information came from." } }
    ],
    screenshots: [
      { label: { vi: "Kết quả tìm kiếm kèm trích dẫn", en: "Search results with citations" } },
      { label: { vi: "Chế độ Deep Research", en: "Deep Research mode" } },
      { label: { vi: "Trang chủ khám phá xu hướng", en: "Discover/trending homepage" } }
    ],
    seo: {
      title: { vi: "Perplexity AI là gì? Giá, tính năng, đánh giá 2026", en: "Perplexity AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Perplexity: công cụ tìm kiếm AI có trích dẫn nguồn, bảng giá Free/Pro, ưu nhược điểm và AI thay thế.",
        en: "Perplexity reviewed: AI search with cited sources, Free/Pro pricing, pros & cons, and alternatives."
      },
      keywords: ["Perplexity AI", "Perplexity review", "Perplexity pricing", "Perplexity vs Google"]
    }
  },

  "Notion AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free (Notion)", en: "Free (Notion)" }, price: "$0", note: { vi: "Dùng thử AI giới hạn số lượt", en: "Limited AI trial responses" } },
        { name: { vi: "AI add-on", en: "AI add-on" }, price: "$8–10/user/mo", note: { vi: "Cộng thêm vào gói Notion đang dùng", en: "Added on top of your existing Notion plan" } },
        { name: { vi: "Business / Enterprise", en: "Business / Enterprise" }, price: { vi: "Liên hệ", en: "Contact sales" }, note: { vi: "AI không giới hạn kèm gói cao cấp", en: "Unlimited AI bundled with higher-tier plans" } }
      ]
    },
    categoryTags: ["productivity", "writing-content", "work-tools"],
    alternatives: ["Gamma", "Microsoft Copilot", "Grammarly"],
    faq: [
      { q: { vi: "Notion AI hoạt động độc lập hay cần Notion?", en: "Does Notion AI work standalone or need Notion?" }, a: { vi: "Cần dùng bên trong không gian làm việc Notion — đây là tính năng cộng thêm, không phải sản phẩm độc lập.", en: "It runs inside a Notion workspace — it's an add-on feature, not a standalone product." } },
      { q: { vi: "Notion AI làm được gì?", en: "What can Notion AI do?" }, a: { vi: "Tóm tắt trang, viết nháp nội dung, dịch, tạo bảng dữ liệu và trả lời câu hỏi dựa trên tài liệu trong workspace.", en: "Summarize pages, draft content, translate, build data tables, and answer questions based on your workspace docs." } },
      { q: { vi: "Notion AI có miễn phí không?", en: "Is Notion AI free?" }, a: { vi: "Có bản dùng thử giới hạn số lượt; dùng thường xuyên cần mua thêm gói AI add-on.", en: "There's a limited free trial; regular use requires the paid AI add-on." } },
      { q: { vi: "Notion AI phù hợp với ai?", en: "Who is Notion AI for?" }, a: { vi: "Người đã dùng Notion để quản lý ghi chú/dự án và muốn AI hỗ trợ ngay trong cùng không gian làm việc.", en: "People already using Notion for notes/projects who want AI help without leaving that workspace." } }
    ],
    screenshots: [
      { label: { vi: "Trợ lý AI trong trang Notion", en: "AI assistant inside a Notion page" } },
      { label: { vi: "Tóm tắt tài liệu tự động", en: "Automatic document summaries" } },
      { label: { vi: "Hỏi đáp dựa trên workspace", en: "Q&A grounded in the workspace" } }
    ],
    seo: {
      title: { vi: "Notion AI là gì? Giá, tính năng, đánh giá 2026", en: "Notion AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Tìm hiểu Notion AI: cách hoạt động trong workspace Notion, bảng giá, ưu nhược điểm và các công cụ thay thế.",
        en: "Notion AI explained: how it works inside your Notion workspace, pricing, pros & cons, and alternatives."
      },
      keywords: ["Notion AI", "Notion AI pricing", "Notion AI review", "Notion AI alternatives"]
    }
  },

  "DeepSeek": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free (web/app)", en: "Free (web/app)" }, price: "$0", note: { vi: "Truy cập miễn phí không giới hạn nhiều", en: "Free access with generous limits" } },
        { name: { vi: "API", en: "API" }, price: { vi: "Theo token, giá rất thấp", en: "Pay-per-token, very low cost" }, note: { vi: "Dành cho nhà phát triển tích hợp", en: "For developers integrating directly" } }
      ]
    },
    categoryTags: ["chat", "code"],
    alternatives: ["ChatGPT", "Qwen", "Kimi"],
    faq: [
      { q: { vi: "DeepSeek có miễn phí không?", en: "Is DeepSeek free?" }, a: { vi: "Có, bản web/app dùng miễn phí với giới hạn khá rộng rãi; API tính phí theo token nhưng rất rẻ so với mặt bằng chung.", en: "Yes, the web/app version is free with fairly generous limits; the API is pay-per-token and very cheap by industry standards." } },
      { q: { vi: "DeepSeek mạnh ở điểm gì?", en: "What is DeepSeek best at?" }, a: { vi: "Suy luận toán học và lập trình, với chi phí vận hành/API thấp hơn nhiều so với các mô hình lớn của phương Tây.", en: "Math and coding reasoning, at a fraction of the API/operating cost of major Western models." } },
      { q: { vi: "DeepSeek có mã nguồn mở không?", en: "Is DeepSeek open-source?" }, a: { vi: "Một số phiên bản mô hình của DeepSeek được phát hành mã nguồn mở, cho phép tự triển khai (self-host).", en: "Several DeepSeek model versions are released open-source, allowing self-hosting." } },
      { q: { vi: "DeepSeek phù hợp với ai?", en: "Who is DeepSeek for?" }, a: { vi: "Nhà phát triển và người dùng cần chi phí AI thấp, đặc biệt cho các tác vụ toán học và lập trình.", en: "Developers and users who need low-cost AI, especially for math-heavy and coding tasks." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện chat DeepSeek", en: "DeepSeek chat interface" } },
      { label: { vi: "Chế độ suy luận (Deep Think)", en: "Reasoning / Deep Think mode" } },
      { label: { vi: "Trang tài liệu API", en: "API documentation page" } }
    ],
    seo: {
      title: { vi: "DeepSeek là gì? Giá, tính năng, đánh giá 2026", en: "DeepSeek Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá DeepSeek: chi phí thấp, mạnh về toán/lập trình, bảng giá, ưu nhược điểm và AI thay thế.",
        en: "DeepSeek reviewed: low cost, strong math/coding performance, pricing, pros & cons, and alternatives."
      },
      keywords: ["DeepSeek", "DeepSeek review", "DeepSeek pricing", "DeepSeek vs ChatGPT"]
    }
  },

  "Adobe Firefly": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Số credit AI giới hạn/tháng", en: "Limited monthly AI credits" } },
        { name: { vi: "Premium", en: "Premium" }, price: "$9.99/mo", note: { vi: "Nhiều credit hơn, xuất ảnh độ phân giải cao", en: "More credits, higher-resolution exports" } },
        { name: { vi: "Kèm Creative Cloud", en: "Bundled with Creative Cloud" }, price: { vi: "Theo gói CC", en: "Included in CC plans" }, note: { vi: "Đã có sẵn nếu dùng Photoshop/Illustrator", en: "Already included if you use Photoshop/Illustrator" } }
      ]
    },
    categoryTags: ["image", "design"],
    alternatives: ["Midjourney", "DALL·E 3", "Canva AI"],
    faq: [
      { q: { vi: "Adobe Firefly có an toàn bản quyền không?", en: "Is Adobe Firefly copyright-safe?" }, a: { vi: "Có, Firefly được huấn luyện trên kho Adobe Stock và nội dung được cấp phép, nên Adobe cam kết bồi thường thương mại cho người dùng trả phí.", en: "Yes, Firefly is trained on Adobe Stock and licensed content, and Adobe offers commercial indemnification for paid users." } },
      { q: { vi: "Firefly có tích hợp với Photoshop không?", en: "Does Firefly integrate with Photoshop?" }, a: { vi: "Có, các tính năng Generative Fill/Expand trong Photoshop chạy trực tiếp bằng công nghệ Firefly.", en: "Yes, Photoshop's Generative Fill/Expand features run directly on Firefly technology." } },
      { q: { vi: "Firefly có miễn phí không?", en: "Is Firefly free?" }, a: { vi: "Có bản miễn phí với số credit giới hạn mỗi tháng; dùng nhiều nên nâng cấp Premium hoặc dùng kèm gói Creative Cloud.", en: "There's a free tier with limited monthly credits; heavy use benefits from Premium or an existing Creative Cloud plan." } },
      { q: { vi: "Firefly phù hợp với ai?", en: "Who is Firefly for?" }, a: { vi: "Designer và người làm nội dung thương mại cần nguồn ảnh AI rõ ràng về bản quyền.", en: "Designers and commercial content creators who need AI images with clear copyright standing." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện tạo ảnh Firefly", en: "Firefly image generation interface" } },
      { label: { vi: "Generative Fill trong Photoshop", en: "Generative Fill inside Photoshop" } },
      { label: { vi: "Tạo hiệu ứng chữ bằng AI", en: "AI text-effects generation" } }
    ],
    seo: {
      title: { vi: "Adobe Firefly là gì? Giá, tính năng, đánh giá 2026", en: "Adobe Firefly Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Adobe Firefly: an toàn bản quyền, tích hợp Photoshop, bảng giá, ưu nhược điểm và AI tạo ảnh thay thế.",
        en: "Adobe Firefly reviewed: copyright safety, Photoshop integration, pricing, pros & cons, and image-AI alternatives."
      },
      keywords: ["Adobe Firefly", "Firefly AI review", "Firefly pricing", "Firefly vs Midjourney"]
    }
  },

  "Runway": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Số credit dùng thử giới hạn", en: "Limited trial credits" } },
        { name: { vi: "Standard", en: "Standard" }, price: "$12/mo", note: { vi: "Thêm credit hằng tháng, không watermark", en: "More monthly credits, no watermark" } },
        { name: { vi: "Pro / Unlimited", en: "Pro / Unlimited" }, price: "$28–76/mo", note: { vi: "Credit cao hơn hoặc tạo không giới hạn", en: "Higher/unlimited generation credits" } }
      ]
    },
    categoryTags: ["video", "design"],
    alternatives: ["Sora", "Veo", "HeyGen"],
    faq: [
      { q: { vi: "Runway dùng để làm gì?", en: "What is Runway used for?" }, a: { vi: "Tạo video từ văn bản/hình ảnh, chỉnh sửa video bằng AI (xoá vật thể, green screen tự động, mở rộng khung hình).", en: "Generating video from text/images, and AI video editing (object removal, auto green-screen, frame expansion)." } },
      { q: { vi: "Runway có miễn phí không?", en: "Is Runway free?" }, a: { vi: "Có bản dùng thử với credit giới hạn; dùng thường xuyên cần gói trả phí theo credit.", en: "There's a free trial with limited credits; regular use needs a paid credit-based plan." } },
      { q: { vi: "Runway phù hợp với ai?", en: "Who is Runway for?" }, a: { vi: "Nhà làm phim, editor và người sáng tạo nội dung cần công cụ video AI chuyên sâu hơn ứng dụng phổ thông.", en: "Filmmakers, editors, and creators who need a more advanced AI video toolset than mainstream apps." } },
      { q: { vi: "Runway khác gì Sora?", en: "How is Runway different from Sora?" }, a: { vi: "Runway có bộ công cụ chỉnh sửa video AI phong phú hơn (đã dùng nhiều năm trong ngành phim); Sora tập trung vào tạo video chất lượng cao từ đầu bằng OpenAI.", en: "Runway offers a broader AI video-editing toolset with years of industry use; Sora focuses on high-quality generation from scratch via OpenAI." } }
    ],
    screenshots: [
      { label: { vi: "Tạo video từ văn bản (Gen-3)", en: "Text-to-video generation (Gen-3)" } },
      { label: { vi: "Xoá vật thể khỏi video bằng AI", en: "AI object removal from video" } },
      { label: { vi: "Mở rộng khung hình video", en: "Video frame expansion" } }
    ],
    seo: {
      title: { vi: "Runway là gì? Giá, tính năng, đánh giá 2026", en: "Runway ML Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Runway: tạo và chỉnh sửa video bằng AI, bảng giá theo credit, ưu nhược điểm và AI video thay thế.",
        en: "Runway reviewed: AI video generation and editing, credit-based pricing, pros & cons, and video-AI alternatives."
      },
      keywords: ["Runway ML", "Runway AI review", "Runway pricing", "Runway vs Sora"]
    }
  },

  "Sora": {
    pricing: {
      free: false,
      plans: [
        { name: { vi: "Trong ChatGPT Plus", en: "Inside ChatGPT Plus" }, price: "$20/mo", note: { vi: "Số lượt tạo video giới hạn/tháng", en: "Limited video generations per month" } },
        { name: { vi: "ChatGPT Pro", en: "ChatGPT Pro" }, price: "$200/mo", note: { vi: "Giới hạn cao hơn, độ phân giải tốt hơn", en: "Higher limits, better resolution" } }
      ]
    },
    categoryTags: ["video"],
    alternatives: ["Runway", "Veo", "HeyGen"],
    faq: [
      { q: { vi: "Sora dùng ở đâu?", en: "Where can I use Sora?" }, a: { vi: "Qua ứng dụng Sora riêng hoặc tích hợp trong các gói ChatGPT Plus/Pro của OpenAI.", en: "Through the standalone Sora app, or bundled into OpenAI's ChatGPT Plus/Pro plans." } },
      { q: { vi: "Sora có miễn phí không?", en: "Is Sora free?" }, a: { vi: "Không có bản miễn phí lâu dài — cần ChatGPT Plus trở lên để dùng.", en: "There's no ongoing free tier — you need ChatGPT Plus or higher to use it." } },
      { q: { vi: "Sora tạo video dài bao lâu?", en: "How long are Sora's videos?" }, a: { vi: "Tuỳ gói, thường tạo được các clip ngắn vài giây đến khoảng 1 phút với chất lượng cao.", en: "Depending on the plan, it generates short clips from a few seconds up to about a minute at high quality." } },
      { q: { vi: "Sora phù hợp với ai?", en: "Who is Sora for?" }, a: { vi: "Người sáng tạo nội dung muốn thử nghiệm video AI chất lượng cao ngay trong hệ sinh thái OpenAI.", en: "Content creators who want to experiment with high-quality AI video directly inside the OpenAI ecosystem." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện tạo video Sora", en: "Sora video generation interface" } },
      { label: { vi: "Thư viện video cộng đồng", en: "Community video feed" } },
      { label: { vi: "Chỉnh sửa/tiếp nối video (Remix)", en: "Video remix/continuation editing" } }
    ],
    seo: {
      title: { vi: "Sora là gì? Giá, tính năng, đánh giá 2026", en: "OpenAI Sora Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Sora của OpenAI: tạo video AI chất lượng cao, bảng giá qua ChatGPT Plus/Pro, ưu nhược điểm và AI thay thế.",
        en: "OpenAI's Sora reviewed: high-quality AI video generation, ChatGPT Plus/Pro pricing, pros & cons, and alternatives."
      },
      keywords: ["Sora AI", "Sora OpenAI review", "Sora pricing", "Sora vs Runway"]
    }
  },

  "Cursor": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Hobby", en: "Hobby" }, price: "$0", note: { vi: "Dùng thử giới hạn số lượt", en: "Limited trial usage" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$20/mo", note: { vi: "Không giới hạn hoàn thành code cơ bản", en: "Unlimited basic code completions" } },
        { name: { vi: "Business", en: "Business" }, price: "$40/user/mo", note: { vi: "Quản trị nhóm, bảo mật doanh nghiệp", en: "Team admin & enterprise security" } }
      ]
    },
    categoryTags: ["code"],
    alternatives: ["GitHub Copilot", "Replit", "v0"],
    faq: [
      { q: { vi: "Cursor khác gì VS Code thường?", en: "How is Cursor different from regular VS Code?" }, a: { vi: "Cursor là một fork của VS Code được xây riêng quanh AI, hỗ trợ chat và chỉnh sửa nhiều file trực tiếp trong IDE.", en: "Cursor is a fork of VS Code built around AI from the ground up, with chat and multi-file edits directly in the IDE." } },
      { q: { vi: "Cursor có miễn phí không?", en: "Is Cursor free?" }, a: { vi: "Có gói Hobby miễn phí dùng thử giới hạn; dùng thường xuyên nên nâng cấp Pro.", en: "There's a free Hobby tier with limited usage; regular use benefits from upgrading to Pro." } },
      { q: { vi: "Cursor có import được cấu hình VS Code không?", en: "Can Cursor import my VS Code settings?" }, a: { vi: "Có, Cursor hỗ trợ nhập extension, theme và phím tắt từ VS Code chỉ trong vài bước.", en: "Yes, Cursor supports importing extensions, themes, and keybindings from VS Code in just a few steps." } },
      { q: { vi: "Cursor phù hợp với ai?", en: "Who is Cursor for?" }, a: { vi: "Lập trình viên muốn một IDE được thiết kế riêng cho làm việc cùng AI, thay vì chỉ thêm plugin vào IDE cũ.", en: "Developers who want an IDE purpose-built for working with AI, rather than just adding a plugin to an existing one." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện Cursor IDE", en: "Cursor IDE interface" } },
      { label: { vi: "Chat AI chỉnh sửa nhiều file", en: "AI chat with multi-file edits" } },
      { label: { vi: "Chế độ Agent tự động sửa lỗi", en: "Agent mode auto-fixing errors" } }
    ],
    seo: {
      title: { vi: "Cursor là gì? Giá, tính năng, đánh giá 2026", en: "Cursor AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Cursor: IDE lập trình bằng AI, bảng giá Hobby/Pro/Business, ưu nhược điểm và AI coding thay thế.",
        en: "Cursor reviewed: the AI-native coding IDE, Hobby/Pro/Business pricing, pros & cons, and coding-AI alternatives."
      },
      keywords: ["Cursor AI", "Cursor IDE review", "Cursor pricing", "Cursor vs Copilot"]
    }
  },

  "Microsoft Copilot": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Dùng trên web/Windows, giới hạn số lượt", en: "Web/Windows access, limited daily use" } },
        { name: { vi: "Copilot Pro", en: "Copilot Pro" }, price: "$20/mo", note: { vi: "Ưu tiên tốc độ, tích hợp Office", en: "Priority speed, Office app integration" } },
        { name: { vi: "Microsoft 365 Copilot", en: "Microsoft 365 Copilot" }, price: "$30/user/mo", note: { vi: "Dành cho doanh nghiệp, sâu trong Word/Excel/Teams", en: "For businesses, deeply integrated into Word/Excel/Teams" } }
      ]
    },
    categoryTags: ["chat", "productivity", "work-tools"],
    alternatives: ["ChatGPT", "Google Gemini", "Notion AI"],
    faq: [
      { q: { vi: "Microsoft Copilot có miễn phí không?", en: "Is Microsoft Copilot free?" }, a: { vi: "Có, bản miễn phí dùng được trên web và Windows với giới hạn số lượt; gói Pro/365 mở khoá tích hợp sâu với Office.", en: "Yes, the free tier works on web and Windows with usage limits; Pro/365 unlocks deep Office integration." } },
      { q: { vi: "Copilot có khác gì ChatGPT?", en: "How is Copilot different from ChatGPT?" }, a: { vi: "Cùng dựa trên công nghệ OpenAI, nhưng Copilot tích hợp sẵn vào Windows, Edge và bộ Office của Microsoft.", en: "Both are built on OpenAI technology, but Copilot is built directly into Windows, Edge, and Microsoft Office." } },
      { q: { vi: "Copilot có dùng được trong Excel/Word không?", en: "Does Copilot work inside Excel/Word?" }, a: { vi: "Có, với gói Microsoft 365 Copilot, có thể soạn thảo, phân tích dữ liệu và tạo slide ngay trong ứng dụng Office.", en: "Yes, with the Microsoft 365 Copilot plan you can draft, analyze data, and build slides directly inside Office apps." } },
      { q: { vi: "Copilot phù hợp với ai?", en: "Who is Copilot for?" }, a: { vi: "Người dùng Windows và doanh nghiệp đã gắn bó với bộ Office muốn AI hỗ trợ ngay trong công cụ quen thuộc.", en: "Windows users and businesses already invested in Office who want AI help inside the tools they already use." } }
    ],
    screenshots: [
      { label: { vi: "Copilot trên thanh taskbar Windows", en: "Copilot on the Windows taskbar" } },
      { label: { vi: "Copilot trong Word soạn thảo", en: "Copilot drafting inside Word" } },
      { label: { vi: "Copilot phân tích dữ liệu trong Excel", en: "Copilot analyzing data in Excel" } }
    ],
    seo: {
      title: { vi: "Microsoft Copilot là gì? Giá, tính năng 2026", en: "Microsoft Copilot Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Microsoft Copilot: tích hợp Windows/Office, bảng giá Free/Pro/365, ưu nhược điểm và AI thay thế.",
        en: "Microsoft Copilot reviewed: Windows/Office integration, Free/Pro/365 pricing, pros & cons, and alternatives."
      },
      keywords: ["Microsoft Copilot", "Copilot 365 review", "Copilot pricing", "Copilot vs ChatGPT"]
    }
  },

  "Meta AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Miễn phí hoàn toàn qua Facebook/Instagram/WhatsApp", en: "Completely free via Facebook/Instagram/WhatsApp" } }
      ]
    },
    categoryTags: ["chat", "image"],
    alternatives: ["ChatGPT", "Google Gemini", "Grok"],
    faq: [
      { q: { vi: "Meta AI có miễn phí không?", en: "Is Meta AI free?" }, a: { vi: "Có, hoàn toàn miễn phí, tích hợp sẵn trong Facebook, Instagram, WhatsApp và Messenger.", en: "Yes, it's completely free and built directly into Facebook, Instagram, WhatsApp, and Messenger." } },
      { q: { vi: "Meta AI dùng ở đâu?", en: "Where can I use Meta AI?" }, a: { vi: "Ngay trong khung chat của các ứng dụng Meta, hoặc qua trang meta.ai riêng.", en: "Right inside the chat box of Meta's apps, or via the standalone meta.ai site." } },
      { q: { vi: "Meta AI có tạo ảnh được không?", en: "Can Meta AI generate images?" }, a: { vi: "Có, hỗ trợ tạo ảnh từ mô tả văn bản ngay trong cuộc trò chuyện.", en: "Yes, it supports generating images from text descriptions directly in chat." } },
      { q: { vi: "Meta AI phù hợp với ai?", en: "Who is Meta AI for?" }, a: { vi: "Người dùng thường xuyên các ứng dụng Meta muốn có trợ lý AI miễn phí ngay trong ứng dụng quen thuộc.", en: "Frequent users of Meta's apps who want a free AI assistant right where they already spend time." } }
    ],
    screenshots: [
      { label: { vi: "Meta AI trong WhatsApp", en: "Meta AI inside WhatsApp" } },
      { label: { vi: "Tạo ảnh AI trong Instagram", en: "AI image generation in Instagram" } },
      { label: { vi: "Trang web meta.ai", en: "The meta.ai website" } }
    ],
    seo: {
      title: { vi: "Meta AI là gì? Tính năng và đánh giá 2026", en: "Meta AI Review 2026: Features, Pricing & Alternatives" },
      description: {
        vi: "Tìm hiểu Meta AI: trợ lý miễn phí trong Facebook/Instagram/WhatsApp, tính năng, ưu nhược điểm và AI thay thế.",
        en: "Meta AI explained: the free assistant inside Facebook/Instagram/WhatsApp, features, pros & cons, and alternatives."
      },
      keywords: ["Meta AI", "Meta AI review", "Meta AI WhatsApp", "Meta AI vs ChatGPT"]
    }
  },

  "Mistral": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Le Chat Free", en: "Le Chat Free" }, price: "$0", note: { vi: "Chat miễn phí không giới hạn nhiều", en: "Generous free chat access" } },
        { name: { vi: "Le Chat Pro", en: "Le Chat Pro" }, price: "$14.99/mo", note: { vi: "Giới hạn cao hơn, mô hình mạnh hơn", en: "Higher limits, stronger models" } },
        { name: { vi: "API", en: "API" }, price: { vi: "Theo token", en: "Pay-per-token" }, note: { vi: "Dành cho nhà phát triển", en: "For developers" } }
      ]
    },
    categoryTags: ["chat", "code"],
    alternatives: ["ChatGPT", "DeepSeek", "Claude"],
    faq: [
      { q: { vi: "Mistral (Le Chat) có miễn phí không?", en: "Is Mistral's Le Chat free?" }, a: { vi: "Có, bản miễn phí dùng khá thoải mái; gói Pro tăng giới hạn và mở khoá mô hình mạnh hơn.", en: "Yes, the free tier is fairly generous; Pro raises the limits and unlocks stronger models." } },
      { q: { vi: "Mistral có phải là công ty Pháp không?", en: "Is Mistral a French company?" }, a: { vi: "Đúng, Mistral AI có trụ sở tại Paris, được xem là đối trọng châu Âu với các mô hình AI của Mỹ.", en: "Yes, Mistral AI is based in Paris and is seen as Europe's answer to major U.S. AI models." } },
      { q: { vi: "Mistral có mã nguồn mở không?", en: "Does Mistral have open-source models?" }, a: { vi: "Có, một số mô hình của Mistral được phát hành mã nguồn mở, cho phép tự triển khai.", en: "Yes, several Mistral models are released open-source, allowing self-hosting." } },
      { q: { vi: "Mistral phù hợp với ai?", en: "Who is Mistral for?" }, a: { vi: "Người dùng châu Âu quan tâm đến quyền riêng tư dữ liệu, và nhà phát triển cần mô hình mã nguồn mở hiệu quả.", en: "European users who care about data privacy, and developers who need efficient open-source models." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện chat Le Chat", en: "Le Chat interface" } },
      { label: { vi: "Chế độ tìm kiếm web", en: "Web search mode" } },
      { label: { vi: "Canvas soạn thảo trực tiếp", en: "Live editing canvas" } }
    ],
    seo: {
      title: { vi: "Mistral AI là gì? Giá, tính năng, đánh giá 2026", en: "Mistral AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Mistral AI (Le Chat): mô hình mã nguồn mở từ Pháp, bảng giá, ưu nhược điểm và AI thay thế.",
        en: "Mistral AI (Le Chat) reviewed: open-source models from France, pricing, pros & cons, and alternatives."
      },
      keywords: ["Mistral AI", "Le Chat review", "Mistral pricing", "Mistral vs ChatGPT"]
    }
  },

  "Canva AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Tính năng AI cơ bản, giới hạn số lượt", en: "Basic AI features, limited monthly usage" } },
        { name: { vi: "Canva Pro", en: "Canva Pro" }, price: "$12.99/mo", note: { vi: "Magic Studio đầy đủ, không giới hạn nhiều tính năng", en: "Full Magic Studio suite, higher limits" } },
        { name: { vi: "Teams", en: "Teams" }, price: "$10/user/mo", note: { vi: "Cộng tác nhóm, thư viện thương hiệu", en: "Team collaboration, brand kits" } }
      ]
    },
    categoryTags: ["image", "design"],
    alternatives: ["Adobe Firefly", "Figma AI", "Microsoft Designer"],
    faq: [
      { q: { vi: "Canva AI (Magic Studio) là gì?", en: "What is Canva AI (Magic Studio)?" }, a: { vi: "Là bộ tính năng AI tích hợp trong Canva: tạo ảnh, viết nội dung, xoá nền, mở rộng ảnh và tạo video tự động.", en: "It's Canva's built-in AI toolset: image generation, copywriting, background removal, photo expansion, and automatic video creation." } },
      { q: { vi: "Canva AI có miễn phí không?", en: "Is Canva AI free?" }, a: { vi: "Có bản miễn phí với tính năng cơ bản giới hạn; Canva Pro mở khoá Magic Studio đầy đủ.", en: "There's a free tier with limited basic features; Canva Pro unlocks the full Magic Studio suite." } },
      { q: { vi: "Canva AI phù hợp với ai?", en: "Who is Canva AI for?" }, a: { vi: "Người không chuyên thiết kế cần tạo nhanh hình ảnh, bài đăng mạng xã hội và tài liệu marketing.", en: "Non-designers who need to quickly create images, social posts, and marketing materials." } },
      { q: { vi: "Canva AI khác gì Adobe Firefly?", en: "How is Canva AI different from Adobe Firefly?" }, a: { vi: "Canva thiên về thiết kế nhanh, dễ dùng cho người mới; Firefly thiên về chất lượng ảnh chuyên nghiệp và tích hợp Photoshop.", en: "Canva focuses on fast, beginner-friendly design; Firefly focuses on professional image quality and Photoshop integration." } }
    ],
    screenshots: [
      { label: { vi: "Magic Studio trong Canva", en: "Magic Studio inside Canva" } },
      { label: { vi: "Tạo ảnh bằng văn bản", en: "Text-to-image generation" } },
      { label: { vi: "Viết nội dung tự động (Magic Write)", en: "Automatic copywriting (Magic Write)" } }
    ],
    seo: {
      title: { vi: "Canva AI là gì? Giá, tính năng, đánh giá 2026", en: "Canva AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Canva AI (Magic Studio): tính năng thiết kế AI, bảng giá Free/Pro/Teams, ưu nhược điểm và thay thế.",
        en: "Canva AI (Magic Studio) reviewed: AI design features, Free/Pro/Teams pricing, pros & cons, and alternatives."
      },
      keywords: ["Canva AI", "Magic Studio review", "Canva AI pricing", "Canva vs Adobe Firefly"]
    }
  },

  "Stable Diffusion": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Mã nguồn mở (tự chạy)", en: "Open-source (self-hosted)" }, price: "$0", note: { vi: "Miễn phí nếu tự có phần cứng GPU", en: "Free if you have your own GPU hardware" } },
        { name: { vi: "DreamStudio / API", en: "DreamStudio / API" }, price: { vi: "Theo credit", en: "Pay-per-credit" }, note: { vi: "Chạy trên cloud của Stability AI", en: "Runs on Stability AI's cloud" } }
      ]
    },
    categoryTags: ["image"],
    alternatives: ["Midjourney", "DALL·E 3", "Leonardo AI"],
    faq: [
      { q: { vi: "Stable Diffusion có miễn phí không?", en: "Is Stable Diffusion free?" }, a: { vi: "Có, mã nguồn mở và có thể tự chạy miễn phí trên máy có GPU đủ mạnh; dùng qua cloud (DreamStudio/API) thì tính phí theo credit.", en: "Yes, it's open-source and free to self-host on a machine with a strong enough GPU; cloud access (DreamStudio/API) is pay-per-credit." } },
      { q: { vi: "Stable Diffusion khác gì Midjourney?", en: "How is Stable Diffusion different from Midjourney?" }, a: { vi: "Stable Diffusion mã nguồn mở, tuỳ biến sâu và tự host được; Midjourney là dịch vụ đóng, dễ dùng hơn nhưng ít tuỳ biến.", en: "Stable Diffusion is open-source, deeply customizable, and self-hostable; Midjourney is a closed service that's easier to use but less customizable." } },
      { q: { vi: "Cần cấu hình máy như thế nào để tự chạy?", en: "What hardware do I need to self-host it?" }, a: { vi: "Thường cần GPU có ít nhất 8GB VRAM trở lên để chạy mượt các phiên bản mới.", en: "You typically need a GPU with at least 8GB VRAM or more to run recent versions smoothly." } },
      { q: { vi: "Stable Diffusion phù hợp với ai?", en: "Who is Stable Diffusion for?" }, a: { vi: "Nhà phát triển và người dùng kỹ thuật muốn toàn quyền kiểm soát mô hình, tuỳ biến sâu hoặc tích hợp vào sản phẩm riêng.", en: "Developers and technical users who want full control, deep customization, or want to embed it into their own product." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện WebUI phổ biến", en: "A popular community WebUI" } },
      { label: { vi: "Tạo ảnh từ văn bản", en: "Text-to-image generation" } },
      { label: { vi: "Tuỳ chỉnh mô hình (LoRA/ControlNet)", en: "Model customization (LoRA/ControlNet)" } }
    ],
    seo: {
      title: { vi: "Stable Diffusion là gì? Giá, cách dùng 2026", en: "Stable Diffusion Review 2026: Pricing, How to Use & Alternatives" },
      description: {
        vi: "Tìm hiểu Stable Diffusion: mô hình tạo ảnh mã nguồn mở, cách tự chạy, bảng giá cloud và AI tạo ảnh thay thế.",
        en: "Stable Diffusion explained: the open-source image model, how to self-host, cloud pricing, and image-AI alternatives."
      },
      keywords: ["Stable Diffusion", "Stable Diffusion review", "Stable Diffusion free", "Stable Diffusion vs Midjourney"]
    }
  },

  "Wolfram Alpha": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Trả lời cơ bản, không xem chi tiết từng bước", en: "Basic answers, no step-by-step details" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$7.25/mo", note: { vi: "Xem lời giải từng bước, tải file, không quảng cáo", en: "Step-by-step solutions, file downloads, no ads" } }
      ]
    },
    categoryTags: ["study", "science"],
    alternatives: ["ChatGPT", "Grammarly", "NotebookLM"],
    faq: [
      { q: { vi: "Wolfram Alpha khác gì công cụ tìm kiếm thường?", en: "How is Wolfram Alpha different from a regular search engine?" }, a: { vi: "Wolfram Alpha tự tính toán câu trả lời từ dữ liệu và công thức, thay vì chỉ trả về danh sách trang web liên quan.", en: "Wolfram Alpha computes answers directly from data and formulas, instead of just returning a list of related web pages." } },
      { q: { vi: "Wolfram Alpha có miễn phí không?", en: "Is Wolfram Alpha free?" }, a: { vi: "Có, bản miễn phí trả lời được nhiều câu hỏi; gói Pro cần thiết nếu muốn xem lời giải chi tiết từng bước.", en: "Yes, the free tier answers most questions; Pro is needed if you want detailed step-by-step solutions." } },
      { q: { vi: "Wolfram Alpha dùng cho môn học nào?", en: "Which subjects does Wolfram Alpha cover?" }, a: { vi: "Toán học, vật lý, hoá học, kỹ thuật, thống kê và cả các câu hỏi về đời sống như dinh dưỡng, tài chính.", en: "Math, physics, chemistry, engineering, statistics, and even everyday questions like nutrition or finance." } },
      { q: { vi: "Wolfram Alpha phù hợp với ai?", en: "Who is Wolfram Alpha for?" }, a: { vi: "Học sinh, sinh viên và người làm kỹ thuật cần lời giải chính xác thay vì câu trả lời chung chung của chatbot.", en: "Students and technical professionals who need precise computed answers rather than a chatbot's general response." } }
    ],
    screenshots: [
      { label: { vi: "Kết quả tính toán chi tiết", en: "Detailed computed results" } },
      { label: { vi: "Lời giải từng bước (Pro)", en: "Step-by-step solutions (Pro)" } },
      { label: { vi: "Vẽ đồ thị hàm số tự động", en: "Automatic function graphing" } }
    ],
    seo: {
      title: { vi: "Wolfram Alpha là gì? Giá, tính năng 2026", en: "Wolfram Alpha Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Tìm hiểu Wolfram Alpha: công cụ tính toán tri thức, bảng giá Free/Pro, ưu nhược điểm và AI học tập thay thế.",
        en: "Wolfram Alpha explained: the computational knowledge engine, Free/Pro pricing, pros & cons, and study-AI alternatives."
      },
      keywords: ["Wolfram Alpha", "Wolfram Alpha review", "Wolfram Alpha pricing", "Wolfram Alpha vs ChatGPT"]
    }
  },

  "Grammarly": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Sửa lỗi ngữ pháp, chính tả cơ bản", en: "Basic grammar & spelling fixes" } },
        { name: { vi: "Premium", en: "Premium" }, price: "$12/mo", note: { vi: "Gợi ý văn phong, viết lại câu, phát hiện đạo văn", en: "Style suggestions, sentence rewrites, plagiarism detection" } },
        { name: { vi: "Business", en: "Business" }, price: "$15/user/mo", note: { vi: "Style guide chung cho cả team", en: "Shared brand style guide for teams" } }
      ]
    },
    categoryTags: ["writing-content", "study"],
    alternatives: ["Notion AI", "Jasper", "ChatGPT"],
    faq: [
      { q: { vi: "Grammarly có miễn phí không?", en: "Is Grammarly free?" }, a: { vi: "Có, bản miễn phí sửa lỗi ngữ pháp/chính tả cơ bản; Premium mở khoá gợi ý văn phong và viết lại câu bằng AI.", en: "Yes, the free tier fixes basic grammar/spelling; Premium unlocks AI style suggestions and sentence rewrites." } },
      { q: { vi: "Grammarly hoạt động ở đâu?", en: "Where does Grammarly work?" }, a: { vi: "Tiện ích mở rộng trình duyệt, ứng dụng desktop, Microsoft Word, Google Docs và bàn phím di động.", en: "Browser extension, desktop app, Microsoft Word, Google Docs, and a mobile keyboard." } },
      { q: { vi: "Grammarly có phát hiện đạo văn không?", en: "Does Grammarly detect plagiarism?" }, a: { vi: "Có, tính năng kiểm tra đạo văn nằm trong gói Premium, so khớp với hàng tỷ trang web và bài báo.", en: "Yes, plagiarism checking is part of the Premium plan, matching against billions of web pages and papers." } },
      { q: { vi: "Grammarly phù hợp với ai?", en: "Who is Grammarly for?" }, a: { vi: "Sinh viên, người viết nội dung và bất kỳ ai muốn văn bản tiếng Anh chuẩn xác, chuyên nghiệp hơn.", en: "Students, content writers, and anyone who wants their English writing to be more accurate and professional." } }
    ],
    screenshots: [
      { label: { vi: "Gợi ý sửa lỗi trực tiếp", en: "Real-time correction suggestions" } },
      { label: { vi: "Báo cáo điểm văn phong", en: "Writing style score report" } },
      { label: { vi: "Grammarly trong Google Docs", en: "Grammarly inside Google Docs" } }
    ],
    seo: {
      title: { vi: "Grammarly là gì? Giá, tính năng, đánh giá 2026", en: "Grammarly Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Grammarly: sửa ngữ pháp bằng AI, bảng giá Free/Premium/Business, ưu nhược điểm và công cụ thay thế.",
        en: "Grammarly reviewed: AI grammar correction, Free/Premium/Business pricing, pros & cons, and alternatives."
      },
      keywords: ["Grammarly", "Grammarly review", "Grammarly pricing", "Grammarly alternatives"]
    }
  },

  "Veo": {
    pricing: {
      free: false,
      plans: [
        { name: { vi: "Google AI Pro", en: "Google AI Pro" }, price: "$19.99/mo", note: { vi: "Số lượt tạo video giới hạn/tháng", en: "Limited monthly video generations" } },
        { name: { vi: "Google AI Ultra", en: "Google AI Ultra" }, price: "$249.99/mo", note: { vi: "Giới hạn cao hơn, chất lượng tốt nhất", en: "Higher limits, best quality" } }
      ]
    },
    categoryTags: ["video"],
    alternatives: ["Sora", "Runway", "HeyGen"],
    faq: [
      { q: { vi: "Veo dùng ở đâu?", en: "Where can I use Veo?" }, a: { vi: "Qua Google AI Studio, ứng dụng Gemini, hoặc Flow — công cụ làm phim AI của Google.", en: "Through Google AI Studio, the Gemini app, or Flow — Google's AI filmmaking tool." } },
      { q: { vi: "Veo có miễn phí không?", en: "Is Veo free?" }, a: { vi: "Không có bản miễn phí lâu dài — cần gói Google AI Pro hoặc Ultra để tạo video.", en: "There's no ongoing free tier — you need a Google AI Pro or Ultra plan to generate video." } },
      { q: { vi: "Veo có tạo được âm thanh không?", en: "Can Veo generate audio too?" }, a: { vi: "Có, các phiên bản mới của Veo tạo cả âm thanh đồng bộ (lời thoại, hiệu ứng) cùng video.", en: "Yes, newer Veo versions generate synchronized audio (dialogue, sound effects) along with the video." } },
      { q: { vi: "Veo phù hợp với ai?", en: "Who is Veo for?" }, a: { vi: "Người sáng tạo nội dung đã quen hệ sinh thái Google muốn tạo video AI chất lượng cao có âm thanh.", en: "Creators already in the Google ecosystem who want high-quality AI video generation with audio." } }
    ],
    screenshots: [
      { label: { vi: "Tạo video trong Google Flow", en: "Video generation in Google Flow" } },
      { label: { vi: "Video có âm thanh đồng bộ", en: "Video with synchronized audio" } },
      { label: { vi: "Veo trong ứng dụng Gemini", en: "Veo inside the Gemini app" } }
    ],
    seo: {
      title: { vi: "Google Veo là gì? Giá, tính năng, đánh giá 2026", en: "Google Veo Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Google Veo: tạo video AI có âm thanh, bảng giá qua Google AI Pro/Ultra, ưu nhược điểm và AI thay thế.",
        en: "Google Veo reviewed: AI video generation with audio, Google AI Pro/Ultra pricing, pros & cons, and alternatives."
      },
      keywords: ["Google Veo", "Veo AI review", "Veo pricing", "Veo vs Sora"]
    }
  },

  "Synthesia": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "3 phút video/tháng, có watermark", en: "3 minutes of video/month, watermarked" } },
        { name: { vi: "Starter", en: "Starter" }, price: "$18/mo", note: { vi: "10 phút video/tháng, không watermark", en: "10 minutes/month, no watermark" } },
        { name: { vi: "Creator / Enterprise", en: "Creator / Enterprise" }, price: { vi: "Từ $64/mo", en: "From $64/mo" }, note: { vi: "Nhiều phút hơn, avatar tuỳ chỉnh", en: "More minutes, custom avatars" } }
      ]
    },
    categoryTags: ["video", "work-tools"],
    alternatives: ["HeyGen", "Runway", "ElevenLabs"],
    faq: [
      { q: { vi: "Synthesia dùng để làm gì?", en: "What is Synthesia used for?" }, a: { vi: "Tạo video có người dẫn AI (avatar) đọc kịch bản văn bản, dùng cho đào tạo nội bộ, marketing và bài giảng.", en: "Creating videos with an AI presenter (avatar) reading a text script, used for training, marketing, and lessons." } },
      { q: { vi: "Synthesia có miễn phí không?", en: "Is Synthesia free?" }, a: { vi: "Có bản miễn phí giới hạn 3 phút video/tháng kèm watermark; các gói trả phí tăng thời lượng và bỏ watermark.", en: "There's a free tier limited to 3 minutes of video/month with a watermark; paid plans add more minutes and remove it." } },
      { q: { vi: "Synthesia có tạo avatar riêng của tôi không?", en: "Can Synthesia create a custom avatar of me?" }, a: { vi: "Có, các gói cao hơn cho phép tạo avatar AI cá nhân hoá từ video quay sẵn của bạn.", en: "Yes, higher-tier plans let you create a personalized AI avatar from your own recorded footage." } },
      { q: { vi: "Synthesia phù hợp với ai?", en: "Who is Synthesia for?" }, a: { vi: "Đội ngũ đào tạo/nhân sự và marketer cần sản xuất video nhanh mà không cần quay hay thuê diễn viên.", en: "Training/HR teams and marketers who need fast video production without filming or hiring actors." } }
    ],
    screenshots: [
      { label: { vi: "Thư viện avatar AI", en: "AI avatar library" } },
      { label: { vi: "Trình soạn kịch bản video", en: "Video script editor" } },
      { label: { vi: "Xuất video đào tạo hoàn chỉnh", en: "Finished training video export" } }
    ],
    seo: {
      title: { vi: "Synthesia là gì? Giá, tính năng, đánh giá 2026", en: "Synthesia Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Synthesia: video avatar AI cho đào tạo/marketing, bảng giá, ưu nhược điểm và AI video thay thế.",
        en: "Synthesia reviewed: AI avatar videos for training/marketing, pricing, pros & cons, and video-AI alternatives."
      },
      keywords: ["Synthesia AI", "Synthesia review", "Synthesia pricing", "Synthesia vs HeyGen"]
    }
  },

  "HeyGen": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "1 video/tháng, giới hạn thời lượng", en: "1 video/month, limited length" } },
        { name: { vi: "Creator", en: "Creator" }, price: "$29/mo", note: { vi: "Nhiều video hơn, không watermark", en: "More videos, no watermark" } },
        { name: { vi: "Team / Enterprise", en: "Team / Enterprise" }, price: { vi: "Từ $89/mo", en: "From $89/mo" }, note: { vi: "Avatar tuỳ chỉnh, cộng tác nhóm", en: "Custom avatars, team collaboration" } }
      ]
    },
    categoryTags: ["video", "work-tools"],
    alternatives: ["Synthesia", "Runway", "ElevenLabs"],
    faq: [
      { q: { vi: "HeyGen khác gì Synthesia?", en: "How is HeyGen different from Synthesia?" }, a: { vi: "Cả hai đều tạo video avatar AI; HeyGen thường được đánh giá nhanh hơn và mạnh về nhân bản giọng nói/khuôn mặt cá nhân.", en: "Both create AI avatar videos; HeyGen is often praised for speed and strong personal voice/face cloning." } },
      { q: { vi: "HeyGen có miễn phí không?", en: "Is HeyGen free?" }, a: { vi: "Có, gói miễn phí cho phép tạo 1 video/tháng với thời lượng giới hạn.", en: "Yes, the free plan allows 1 video per month with a limited length." } },
      { q: { vi: "HeyGen có dịch video sang ngôn ngữ khác không?", en: "Can HeyGen translate videos to other languages?" }, a: { vi: "Có, tính năng dịch video AI tự động đồng bộ khẩu hình theo ngôn ngữ mới.", en: "Yes, its AI video translation feature automatically syncs lip movement to the new language." } },
      { q: { vi: "HeyGen phù hợp với ai?", en: "Who is HeyGen for?" }, a: { vi: "Người làm nội dung, sales và đội ngũ marketing cần video có người nói nhanh, đa ngôn ngữ.", en: "Content creators, sales teams, and marketers who need fast, multilingual presenter videos." } }
    ],
    screenshots: [
      { label: { vi: "Tạo avatar nói từ ảnh/video", en: "Creating a talking avatar from a photo/video" } },
      { label: { vi: "Dịch video tự động", en: "Automatic video translation" } },
      { label: { vi: "Thư viện mẫu avatar có sẵn", en: "Stock avatar template library" } }
    ],
    seo: {
      title: { vi: "HeyGen là gì? Giá, tính năng, đánh giá 2026", en: "HeyGen Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá HeyGen: tạo avatar nói và dịch video bằng AI, bảng giá, ưu nhược điểm và AI video thay thế.",
        en: "HeyGen reviewed: AI talking avatars and video translation, pricing, pros & cons, and video-AI alternatives."
      },
      keywords: ["HeyGen", "HeyGen review", "HeyGen pricing", "HeyGen vs Synthesia"]
    }
  },

  "CapCut AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Đầy đủ tính năng dựng video cơ bản", en: "Full basic editing feature set" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$9.99/mo", note: { vi: "Tính năng AI nâng cao, kho asset premium", en: "Advanced AI features, premium asset library" } }
      ]
    },
    categoryTags: ["video"],
    alternatives: ["Runway", "Synthesia", "HeyGen"],
    faq: [
      { q: { vi: "CapCut AI có miễn phí không?", en: "Is CapCut AI free?" }, a: { vi: "Có, phần lớn tính năng dựng video và AI cơ bản miễn phí; gói Pro mở khoá tính năng AI nâng cao và asset premium.", en: "Yes, most basic editing and AI features are free; Pro unlocks advanced AI features and premium assets." } },
      { q: { vi: "CapCut AI làm được gì?", en: "What can CapCut AI do?" }, a: { vi: "Tự động tạo phụ đề, xoá nền, mở rộng khung hình, tách giọng nói/nhạc nền và đề xuất chỉnh sửa theo mẫu có sẵn.", en: "Auto-generate captions, remove backgrounds, extend frames, separate vocals/music, and suggest template-based edits." } },
      { q: { vi: "CapCut AI dùng trên điện thoại được không?", en: "Can I use CapCut AI on mobile?" }, a: { vi: "Có, CapCut có ứng dụng di động đầy đủ tính năng, đồng bộ dự án với bản desktop/web.", en: "Yes, CapCut has a full-featured mobile app that syncs projects with the desktop/web version." } },
      { q: { vi: "CapCut AI phù hợp với ai?", en: "Who is CapCut AI for?" }, a: { vi: "Người làm nội dung TikTok/Reels/Shorts cần dựng video nhanh, ngay trên điện thoại.", en: "TikTok/Reels/Shorts creators who need to edit video quickly, right from their phone." } }
    ],
    screenshots: [
      { label: { vi: "Trình dựng video CapCut", en: "The CapCut editing timeline" } },
      { label: { vi: "Tự động tạo phụ đề", en: "Automatic caption generation" } },
      { label: { vi: "Xoá nền bằng AI", en: "AI background removal" } }
    ],
    seo: {
      title: { vi: "CapCut AI là gì? Giá, tính năng, đánh giá 2026", en: "CapCut AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá CapCut AI: dựng video nhanh cho TikTok/Reels, bảng giá Free/Pro, ưu nhược điểm và AI video thay thế.",
        en: "CapCut AI reviewed: fast editing for TikTok/Reels, Free/Pro pricing, pros & cons, and video-AI alternatives."
      },
      keywords: ["CapCut AI", "CapCut review", "CapCut pricing", "CapCut AI features"]
    }
  },

  "Figma AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Kèm gói Figma", en: "Bundled with Figma" }, price: "$0", note: { vi: "Tính năng AI cơ bản trong bản Figma miễn phí", en: "Basic AI features on Figma's free plan" } },
        { name: { vi: "Figma Professional+", en: "Figma Professional+" }, price: "$12/editor/mo", note: { vi: "Mở khoá đầy đủ tính năng AI nâng cao", en: "Unlocks the full set of advanced AI features" } }
      ]
    },
    categoryTags: ["design", "code"],
    alternatives: ["Canva AI", "Adobe Firefly", "v0"],
    faq: [
      { q: { vi: "Figma AI làm được gì?", en: "What can Figma AI do?" }, a: { vi: "Tạo bố cục/thiết kế từ mô tả văn bản, đổi tên layer tự động, tạo nội dung mẫu và xoá nền ảnh.", en: "Generate layouts/designs from text prompts, auto-rename layers, generate placeholder content, and remove image backgrounds." } },
      { q: { vi: "Figma AI có miễn phí không?", en: "Is Figma AI free?" }, a: { vi: "Có tính năng cơ bản miễn phí; các tính năng AI nâng cao cần gói Figma Professional trở lên.", en: "Basic features are free; advanced AI features require the Figma Professional plan or higher." } },
      { q: { vi: "Figma AI có xuất code không?", en: "Can Figma AI export code?" }, a: { vi: "Có, tính năng chuyển thiết kế thành code (như React/CSS) đang ngày càng được cải thiện.", en: "Yes, design-to-code features (like React/CSS export) are steadily improving." } },
      { q: { vi: "Figma AI phù hợp với ai?", en: "Who is Figma AI for?" }, a: { vi: "Designer sản phẩm và đội ngũ UI/UX cần tăng tốc quá trình phác thảo và bàn giao thiết kế.", en: "Product designers and UI/UX teams who want to speed up drafting and design handoff." } }
    ],
    screenshots: [
      { label: { vi: "Tạo bố cục từ mô tả văn bản", en: "Layout generation from text prompts" } },
      { label: { vi: "Đổi tên layer tự động", en: "Automatic layer renaming" } },
      { label: { vi: "Xoá nền ảnh trong Figma", en: "Background removal inside Figma" } }
    ],
    seo: {
      title: { vi: "Figma AI là gì? Giá, tính năng, đánh giá 2026", en: "Figma AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Figma AI: tạo thiết kế UI bằng AI, bảng giá, ưu nhược điểm và công cụ thiết kế thay thế.",
        en: "Figma AI reviewed: AI-assisted UI design, pricing, pros & cons, and design-tool alternatives."
      },
      keywords: ["Figma AI", "Figma AI review", "Figma AI pricing", "Figma AI features"]
    }
  },

  "Replit": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Dùng thử Agent giới hạn, project công khai", en: "Limited Agent trial, public projects" } },
        { name: { vi: "Core", en: "Core" }, price: "$25/mo", note: { vi: "Credit AI hằng tháng, project riêng tư", en: "Monthly AI credits, private projects" } },
        { name: { vi: "Teams", en: "Teams" }, price: "$40/user/mo", note: { vi: "Cộng tác nhóm, quản trị tổ chức", en: "Team collaboration & org admin" } }
      ]
    },
    categoryTags: ["code"],
    alternatives: ["Cursor", "v0", "GitHub Copilot"],
    faq: [
      { q: { vi: "Replit Agent là gì?", en: "What is Replit Agent?" }, a: { vi: "Là AI có thể tự xây dựng cả một ứng dụng từ mô tả ngôn ngữ tự nhiên — viết code, cài đặt môi trường và triển khai luôn.", en: "It's an AI that can build an entire app from a natural-language description — writing code, setting up the environment, and deploying it." } },
      { q: { vi: "Replit có miễn phí không?", en: "Is Replit free?" }, a: { vi: "Có, dùng thử được với project công khai; dùng Agent thường xuyên và project riêng tư cần gói Core trả phí.", en: "Yes, you can try it with public projects; regular Agent use and private projects need the paid Core plan." } },
      { q: { vi: "Replit có cần cài đặt gì không?", en: "Do I need to install anything to use Replit?" }, a: { vi: "Không, Replit chạy hoàn toàn trên trình duyệt, không cần cài IDE hay môi trường lập trình.", en: "No, Replit runs entirely in the browser — no need to install an IDE or dev environment." } },
      { q: { vi: "Replit phù hợp với ai?", en: "Who is Replit for?" }, a: { vi: "Người mới học lập trình và nhà sáng lập muốn nhanh chóng biến ý tưởng thành ứng dụng chạy được, không cần setup phức tạp.", en: "Coding beginners and founders who want to quickly turn an idea into a working app without complex setup." } }
    ],
    screenshots: [
      { label: { vi: "Replit Agent xây dựng ứng dụng", en: "Replit Agent building an app" } },
      { label: { vi: "IDE chạy trên trình duyệt", en: "Browser-based IDE" } },
      { label: { vi: "Triển khai ứng dụng chỉ 1 cú nhấp", en: "One-click app deployment" } }
    ],
    seo: {
      title: { vi: "Replit là gì? Giá, tính năng, đánh giá 2026", en: "Replit Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Replit & Replit Agent: xây app bằng AI ngay trên trình duyệt, bảng giá, ưu nhược điểm và thay thế.",
        en: "Replit & Replit Agent reviewed: building apps with AI right in the browser, pricing, pros & cons, and alternatives."
      },
      keywords: ["Replit", "Replit Agent review", "Replit pricing", "Replit vs Cursor"]
    }
  },

  "v0": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Số lượt tạo giao diện giới hạn/tháng", en: "Limited monthly UI generations" } },
        { name: { vi: "Premium", en: "Premium" }, price: "$20/mo", note: { vi: "Nhiều credit hơn, ưu tiên tốc độ", en: "More credits, priority speed" } },
        { name: { vi: "Team", en: "Team" }, price: "$30/user/mo", note: { vi: "Cộng tác nhóm, quản lý project chung", en: "Team collaboration & shared projects" } }
      ]
    },
    categoryTags: ["code", "design"],
    alternatives: ["Cursor", "Figma AI", "Replit"],
    faq: [
      { q: { vi: "v0 của Vercel dùng để làm gì?", en: "What is Vercel's v0 used for?" }, a: { vi: "Tạo giao diện web (React/Next.js) hoàn chỉnh từ mô tả văn bản hoặc ảnh phác thảo, xuất luôn code sạch.", en: "Generating complete web UIs (React/Next.js) from a text description or sketch, exporting clean code." } },
      { q: { vi: "v0 có miễn phí không?", en: "Is v0 free?" }, a: { vi: "Có, bản miễn phí cho phép tạo giao diện với số lượt giới hạn mỗi tháng.", en: "Yes, the free tier allows generating UIs with a limited monthly quota." } },
      { q: { vi: "Code từ v0 có dùng được ngay không?", en: "Is v0's generated code production-ready?" }, a: { vi: "Có, code xuất ra dùng chuẩn React/Tailwind, dễ tích hợp trực tiếp vào dự án Next.js thật.", en: "Yes, the exported code follows React/Tailwind standards and integrates easily into a real Next.js project." } },
      { q: { vi: "v0 phù hợp với ai?", en: "Who is v0 for?" }, a: { vi: "Lập trình viên frontend và nhà sáng lập muốn dựng nhanh giao diện demo hoặc MVP từ ý tưởng.", en: "Frontend developers and founders who want to quickly build a demo UI or MVP from an idea." } }
    ],
    screenshots: [
      { label: { vi: "Tạo giao diện từ mô tả văn bản", en: "UI generation from a text prompt" } },
      { label: { vi: "Xem trước giao diện trực tiếp", en: "Live UI preview" } },
      { label: { vi: "Code React/Next.js xuất ra", en: "Exported React/Next.js code" } }
    ],
    seo: {
      title: { vi: "v0 (Vercel) là gì? Giá, tính năng 2026", en: "Vercel v0 Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá v0 của Vercel: tạo giao diện React từ văn bản, bảng giá, ưu nhược điểm và công cụ thay thế.",
        en: "Vercel's v0 reviewed: generating React UIs from text, pricing, pros & cons, and alternatives."
      },
      keywords: ["v0 Vercel", "v0 review", "v0 pricing", "v0 vs Cursor"]
    }
  },

  "Character.AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Trò chuyện không giới hạn, có chờ khi đông người dùng", en: "Unlimited chat, with queue during peak times" } },
        { name: { vi: "c.ai+", en: "c.ai+" }, price: "$9.99/mo", note: { vi: "Phản hồi nhanh hơn, ưu tiên truy cập", en: "Faster responses, priority access" } }
      ]
    },
    categoryTags: ["chat"],
    alternatives: ["ChatGPT", "Grok", "Meta AI"],
    faq: [
      { q: { vi: "Character.AI là gì?", en: "What is Character.AI?" }, a: { vi: "Nền tảng trò chuyện với các nhân vật AI có tính cách riêng, do người dùng hoặc nhà phát triển tạo ra.", en: "A platform for chatting with AI characters that have distinct personalities, created by users or developers." } },
      { q: { vi: "Character.AI có miễn phí không?", en: "Is Character.AI free?" }, a: { vi: "Có, trò chuyện cơ bản miễn phí không giới hạn; gói c.ai+ giúp phản hồi nhanh hơn khi đông người dùng.", en: "Yes, basic chatting is free with no limit; c.ai+ gives faster responses during high-traffic times." } },
      { q: { vi: "Tôi có thể tự tạo nhân vật AI không?", en: "Can I create my own AI character?" }, a: { vi: "Có, bất kỳ ai cũng có thể tạo nhân vật AI riêng với tính cách và bối cảnh tuỳ chỉnh.", en: "Yes, anyone can create their own AI character with a custom personality and backstory." } },
      { q: { vi: "Character.AI phù hợp với ai?", en: "Who is Character.AI for?" }, a: { vi: "Người muốn trò chuyện giải trí, luyện tập hội thoại hoặc khám phá các nhân vật hư cấu tương tác được.", en: "People who want casual conversation, conversation practice, or interactive fictional characters." } }
    ],
    screenshots: [
      { label: { vi: "Thư viện nhân vật AI", en: "AI character library" } },
      { label: { vi: "Giao diện trò chuyện", en: "Chat interface" } },
      { label: { vi: "Trình tạo nhân vật tuỳ chỉnh", en: "Custom character creator" } }
    ],
    seo: {
      title: { vi: "Character.AI là gì? Giá, tính năng, đánh giá 2026", en: "Character.AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Tìm hiểu Character.AI: trò chuyện với nhân vật AI, bảng giá Free/c.ai+, ưu nhược điểm và AI chat thay thế.",
        en: "Character.AI explained: chatting with AI characters, Free/c.ai+ pricing, pros & cons, and chat-AI alternatives."
      },
      keywords: ["Character.AI", "Character AI review", "Character AI pricing", "Character AI alternatives"]
    }
  },

  "NotebookLM": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Dùng được với tài khoản Google thường", en: "Available with any Google account" } },
        { name: { vi: "Kèm Google AI Pro/Ultra", en: "Bundled with Google AI Pro/Ultra" }, price: "$19.99+/mo", note: { vi: "Giới hạn cao hơn, nhiều notebook hơn", en: "Higher limits, more notebooks" } }
      ]
    },
    categoryTags: ["study", "research"],
    alternatives: ["Perplexity", "Wolfram Alpha", "ChatGPT"],
    faq: [
      { q: { vi: "NotebookLM là gì?", en: "What is NotebookLM?" }, a: { vi: "Công cụ AI của Google giúp tóm tắt, trả lời câu hỏi và tạo podcast âm thanh dựa trên chính tài liệu bạn tải lên.", en: "Google's AI tool that summarizes, answers questions, and generates audio podcasts based on documents you upload." } },
      { q: { vi: "NotebookLM có miễn phí không?", en: "Is NotebookLM free?" }, a: { vi: "Có, dùng miễn phí với tài khoản Google; gói Pro/Ultra tăng giới hạn số nguồn và notebook.", en: "Yes, it's free with a Google account; Pro/Ultra plans raise the source and notebook limits." } },
      { q: { vi: "Tính năng tạo podcast của NotebookLM là gì?", en: "What is NotebookLM's Audio Overview feature?" }, a: { vi: "AI tự tạo một đoạn hội thoại podcast tóm tắt tài liệu của bạn, nghe như hai người dẫn chương trình thật.", en: "The AI generates a podcast-style conversation summarizing your documents, sounding like two real hosts." } },
      { q: { vi: "NotebookLM phù hợp với ai?", en: "Who is NotebookLM for?" }, a: { vi: "Sinh viên, nhà nghiên cứu và bất kỳ ai cần tổng hợp nhanh nhiều tài liệu dài mà không sợ AI bịa thông tin ngoài nguồn.", en: "Students, researchers, and anyone who needs to quickly synthesize many long documents without the AI making up outside information." } }
    ],
    screenshots: [
      { label: { vi: "Tải tài liệu nguồn vào notebook", en: "Uploading source documents into a notebook" } },
      { label: { vi: "Hỏi đáp dựa trên tài liệu", en: "Q&A grounded in your documents" } },
      { label: { vi: "Tạo podcast tóm tắt (Audio Overview)", en: "Generating a summary podcast (Audio Overview)" } }
    ],
    seo: {
      title: { vi: "NotebookLM là gì? Tính năng, đánh giá 2026", en: "NotebookLM Review 2026: Features, Pricing & Alternatives" },
      description: {
        vi: "Đánh giá NotebookLM của Google: tóm tắt tài liệu, tạo podcast AI, bảng giá, ưu nhược điểm và công cụ thay thế.",
        en: "Google's NotebookLM reviewed: document summarization, AI podcast generation, pricing, pros & cons, and alternatives."
      },
      keywords: ["NotebookLM", "NotebookLM review", "NotebookLM pricing", "NotebookLM Audio Overview"]
    }
  },

  "ElevenLabs": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "~10 phút giọng nói/tháng", en: "~10 minutes of voice/month" } },
        { name: { vi: "Starter", en: "Starter" }, price: "$5/mo", note: { vi: "~30 phút/tháng, nhân bản giọng nói", en: "~30 min/month, voice cloning" } },
        { name: { vi: "Creator / Pro", en: "Creator / Pro" }, price: "$22–99/mo", note: { vi: "Nhiều phút hơn, chất lượng cao hơn", en: "More minutes, higher quality" } }
      ]
    },
    categoryTags: ["voice", "audio-music"],
    alternatives: ["Synthesia", "HeyGen", "Suno"],
    faq: [
      { q: { vi: "ElevenLabs dùng để làm gì?", en: "What is ElevenLabs used for?" }, a: { vi: "Chuyển văn bản thành giọng nói AI cực tự nhiên, nhân bản giọng nói và dịch giọng sang ngôn ngữ khác.", en: "Converting text into extremely natural AI speech, cloning voices, and dubbing voice into other languages." } },
      { q: { vi: "ElevenLabs có miễn phí không?", en: "Is ElevenLabs free?" }, a: { vi: "Có, bản miễn phí cho khoảng 10 phút giọng nói mỗi tháng; dùng nhiều hơn cần nâng cấp gói trả phí.", en: "Yes, the free tier gives about 10 minutes of voice per month; heavier use requires a paid plan." } },
      { q: { vi: "Nhân bản giọng nói (voice cloning) có an toàn không?", en: "Is voice cloning safe/ethical to use?" }, a: { vi: "ElevenLabs yêu cầu xác nhận quyền sử dụng giọng khi nhân bản, nhưng người dùng vẫn cần tuân thủ pháp luật và đạo đức khi dùng giọng của người khác.", en: "ElevenLabs requires consent verification for cloning, but users must still follow legal and ethical guidelines when using someone else's voice." } },
      { q: { vi: "ElevenLabs phù hợp với ai?", en: "Who is ElevenLabs for?" }, a: { vi: "Người làm podcast, audiobook, game và video cần giọng đọc AI chất lượng cao, tự nhiên.", en: "Podcasters, audiobook creators, game developers, and video creators who need high-quality, natural AI voice." } }
    ],
    screenshots: [
      { label: { vi: "Chuyển văn bản thành giọng nói", en: "Text-to-speech conversion" } },
      { label: { vi: "Thư viện giọng nói AI", en: "AI voice library" } },
      { label: { vi: "Nhân bản giọng nói cá nhân", en: "Personal voice cloning" } }
    ],
    seo: {
      title: { vi: "ElevenLabs là gì? Giá, tính năng, đánh giá 2026", en: "ElevenLabs Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá ElevenLabs: chuyển văn bản thành giọng nói AI tự nhiên, bảng giá, ưu nhược điểm và AI voice thay thế.",
        en: "ElevenLabs reviewed: natural AI text-to-speech, pricing, pros & cons, and voice-AI alternatives."
      },
      keywords: ["ElevenLabs", "ElevenLabs review", "ElevenLabs pricing", "ElevenLabs voice cloning"]
    }
  },

  "Jasper": {
    pricing: {
      free: false,
      plans: [
        { name: { vi: "Creator", en: "Creator" }, price: "$49/mo", note: { vi: "1 người dùng, các tính năng viết cốt lõi", en: "1 seat, core writing features" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$69/mo", note: { vi: "Nhiều người dùng, brand voice tuỳ chỉnh", en: "Multiple seats, custom brand voice" } },
        { name: { vi: "Business", en: "Business" }, price: { vi: "Liên hệ", en: "Contact sales" }, note: { vi: "Quy trình marketing đội nhóm quy mô lớn", en: "Large-scale team marketing workflows" } }
      ]
    },
    categoryTags: ["writing-content", "marketing"],
    alternatives: ["Grammarly", "Notion AI", "Canva AI"],
    faq: [
      { q: { vi: "Jasper có bản miễn phí không?", en: "Does Jasper have a free plan?" }, a: { vi: "Không, Jasper chỉ có bản dùng thử ngắn hạn, sau đó cần trả phí từ gói Creator trở lên.", en: "No, Jasper only offers a short free trial, after which you need a paid plan starting at Creator." } },
      { q: { vi: "Jasper khác gì ChatGPT?", en: "How is Jasper different from ChatGPT?" }, a: { vi: "Jasper tập trung riêng cho marketing/content với brand voice tuỳ chỉnh và quy trình đội nhóm, thay vì là chatbot đa năng.", en: "Jasper is purpose-built for marketing/content with custom brand voice and team workflows, rather than being a general-purpose chatbot." } },
      { q: { vi: "Jasper có brand voice là gì?", en: "What is Jasper's brand voice feature?" }, a: { vi: "AI học theo văn phong thương hiệu của bạn để mọi nội dung tạo ra đều nhất quán giọng điệu.", en: "The AI learns your brand's writing style so every piece of generated content stays consistent in tone." } },
      { q: { vi: "Jasper phù hợp với ai?", en: "Who is Jasper for?" }, a: { vi: "Đội ngũ marketing và agency cần sản xuất nội dung hàng loạt nhưng vẫn giữ đúng giọng điệu thương hiệu.", en: "Marketing teams and agencies who need to produce content at scale while keeping brand voice consistent." } }
    ],
    screenshots: [
      { label: { vi: "Trình soạn thảo nội dung Jasper", en: "Jasper's content editor" } },
      { label: { vi: "Cài đặt Brand Voice", en: "Brand Voice settings" } },
      { label: { vi: "Mẫu nội dung marketing có sẵn", en: "Ready-made marketing content templates" } }
    ],
    seo: {
      title: { vi: "Jasper AI là gì? Giá, tính năng, đánh giá 2026", en: "Jasper AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Jasper: AI viết nội dung marketing theo brand voice, bảng giá, ưu nhược điểm và công cụ thay thế.",
        en: "Jasper reviewed: AI marketing content with brand voice, pricing, pros & cons, and alternatives."
      },
      keywords: ["Jasper AI", "Jasper review", "Jasper pricing", "Jasper vs ChatGPT"]
    }
  },

  "Suno": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "~50 bài hát/tháng, chỉ dùng phi thương mại", en: "~50 songs/month, non-commercial use only" } },
        { name: { vi: "Pro", en: "Pro" }, price: "$10/mo", note: { vi: "~500 bài/tháng, được dùng thương mại", en: "~500 songs/month, commercial use allowed" } },
        { name: { vi: "Premier", en: "Premier" }, price: "$30/mo", note: { vi: "~2000 bài/tháng, chất lượng cao nhất", en: "~2000 songs/month, highest quality" } }
      ]
    },
    categoryTags: ["audio-music"],
    alternatives: ["ElevenLabs", "Runway", "HeyGen"],
    faq: [
      { q: { vi: "Suno dùng để làm gì?", en: "What is Suno used for?" }, a: { vi: "Tạo cả bài hát hoàn chỉnh (nhạc + lời + giọng hát) chỉ từ một mô tả văn bản ngắn.", en: "Generating complete songs (music + lyrics + vocals) from just a short text description." } },
      { q: { vi: "Suno có miễn phí không?", en: "Is Suno free?" }, a: { vi: "Có, bản miễn phí tạo được khoảng 50 bài/tháng nhưng chỉ dùng phi thương mại; muốn dùng thương mại cần gói Pro trở lên.", en: "Yes, the free tier generates about 50 songs/month but for non-commercial use only; commercial use needs Pro or higher." } },
      { q: { vi: "Bài hát tạo bằng Suno có dùng để kiếm tiền được không?", en: "Can songs made with Suno be monetized?" }, a: { vi: "Được, nếu bạn đăng ký gói trả phí (Pro/Premier) — gói Free chỉ cho phép dùng phi thương mại.", en: "Yes, if you're on a paid plan (Pro/Premier) — the Free plan only allows non-commercial use." } },
      { q: { vi: "Suno phù hợp với ai?", en: "Who is Suno for?" }, a: { vi: "Người sáng tạo nội dung, YouTuber và bất kỳ ai muốn có nhạc nền/bài hát gốc mà không cần biết chơi nhạc.", en: "Content creators, YouTubers, and anyone who wants original background music or songs without knowing how to play an instrument." } }
    ],
    screenshots: [
      { label: { vi: "Tạo bài hát từ mô tả văn bản", en: "Song generation from a text prompt" } },
      { label: { vi: "Thư viện bài hát đã tạo", en: "Library of generated songs" } },
      { label: { vi: "Chỉnh sửa lời bài hát", en: "Editing song lyrics" } }
    ],
    seo: {
      title: { vi: "Suno AI là gì? Giá, tính năng, đánh giá 2026", en: "Suno AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Suno: tạo bài hát hoàn chỉnh bằng AI, bảng giá Free/Pro/Premier, ưu nhược điểm và AI nhạc thay thế.",
        en: "Suno reviewed: generating complete songs with AI, Free/Pro/Premier pricing, pros & cons, and music-AI alternatives."
      },
      keywords: ["Suno AI", "Suno review", "Suno pricing", "Suno AI music"]
    }
  },

  "Zapier AI": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "100 tác vụ/tháng, tự động hoá cơ bản", en: "100 tasks/month, basic automation" } },
        { name: { vi: "Starter", en: "Starter" }, price: "$19.99/mo", note: { vi: "750 tác vụ/tháng, nhiều bước hơn", en: "750 tasks/month, multi-step zaps" } },
        { name: { vi: "Professional+", en: "Professional+" }, price: "Từ $69/mo", note: { vi: "Tự động hoá nâng cao, AI Agent riêng", en: "Advanced automation, custom AI Agents" } }
      ]
    },
    categoryTags: ["automation", "work-tools", "productivity"],
    alternatives: ["Notion AI", "Microsoft Copilot", "Zapier"],
    faq: [
      { q: { vi: "Zapier AI khác gì Zapier thường?", en: "How is Zapier AI different from regular Zapier?" }, a: { vi: "Zapier AI thêm khả năng dùng ngôn ngữ tự nhiên để tạo automation và các AI Agent tự vận hành, thay vì phải tự kéo-thả từng bước.", en: "Zapier AI adds the ability to build automations with natural language and use self-running AI Agents, instead of manually dragging and dropping each step." } },
      { q: { vi: "Zapier AI có miễn phí không?", en: "Is Zapier AI free?" }, a: { vi: "Có, gói miễn phí cho 100 tác vụ/tháng; cần nhiều tác vụ hoặc automation phức tạp hơn thì nâng cấp trả phí.", en: "Yes, the free plan includes 100 tasks/month; more tasks or complex automations need a paid upgrade." } },
      { q: { vi: "Zapier AI kết nối được bao nhiêu ứng dụng?", en: "How many apps does Zapier AI connect with?" }, a: { vi: "Hàng nghìn ứng dụng phổ biến như Gmail, Slack, Notion, Google Sheets và nhiều CRM khác nhau.", en: "Thousands of popular apps like Gmail, Slack, Notion, Google Sheets, and various CRMs." } },
      { q: { vi: "Zapier AI phù hợp với ai?", en: "Who is Zapier AI for?" }, a: { vi: "Chủ doanh nghiệp nhỏ và đội ngũ vận hành muốn tự động hoá quy trình lặp lại mà không cần biết lập trình.", en: "Small business owners and ops teams who want to automate repetitive workflows without knowing how to code." } }
    ],
    screenshots: [
      { label: { vi: "Tạo automation bằng ngôn ngữ tự nhiên", en: "Building automations with natural language" } },
      { label: { vi: "Trình xây dựng Zap nhiều bước", en: "Multi-step Zap builder" } },
      { label: { vi: "AI Agent tự vận hành quy trình", en: "Self-running AI Agent workflow" } }
    ],
    seo: {
      title: { vi: "Zapier AI là gì? Giá, tính năng, đánh giá 2026", en: "Zapier AI Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá Zapier AI: tự động hoá quy trình bằng ngôn ngữ tự nhiên, bảng giá, ưu nhược điểm và công cụ thay thế.",
        en: "Zapier AI reviewed: natural-language workflow automation, pricing, pros & cons, and alternatives."
      },
      keywords: ["Zapier AI", "Zapier AI review", "Zapier pricing", "Zapier AI Agents"]
    }
  },

  "DeepL": {
    pricing: {
      free: true,
      plans: [
        { name: { vi: "Free", en: "Free" }, price: "$0", note: { vi: "Dịch văn bản không giới hạn, giới hạn tài liệu", en: "Unlimited text translation, limited documents" } },
        { name: { vi: "Pro (Starter)", en: "Pro (Starter)" }, price: "$8.74/mo", note: { vi: "Dịch tài liệu không giới hạn, bảo mật hơn", en: "Unlimited document translation, more privacy" } },
        { name: { vi: "Business", en: "Business" }, price: { vi: "Liên hệ", en: "Contact sales" }, note: { vi: "Glossary riêng, quản trị đội nhóm", en: "Custom glossaries, team admin" } }
      ]
    },
    categoryTags: ["translation"],
    alternatives: ["Google Gemini", "ChatGPT", "Grammarly"],
    faq: [
      { q: { vi: "DeepL có miễn phí không?", en: "Is DeepL free?" }, a: { vi: "Có, dịch văn bản miễn phí không giới hạn; dịch tài liệu (Word/PDF/PPT) không giới hạn cần gói Pro.", en: "Yes, text translation is free and unlimited; unlimited document translation (Word/PDF/PPT) needs the Pro plan." } },
      { q: { vi: "DeepL khác gì Google Dịch?", en: "How is DeepL different from Google Translate?" }, a: { vi: "DeepL thường được đánh giá dịch tự nhiên và chính xác về ngữ cảnh hơn, đặc biệt với các ngôn ngữ châu Âu.", en: "DeepL is often rated as more natural and contextually accurate, especially for European languages." } },
      { q: { vi: "DeepL hỗ trợ bao nhiêu ngôn ngữ?", en: "How many languages does DeepL support?" }, a: { vi: "Hơn 30 ngôn ngữ, bao gồm tiếng Việt, và danh sách vẫn đang được mở rộng.", en: "More than 30 languages, including Vietnamese, with the list continuing to expand." } },
      { q: { vi: "DeepL phù hợp với ai?", en: "Who is DeepL for?" }, a: { vi: "Người dịch tài liệu công việc, sinh viên đọc tài liệu nước ngoài và doanh nghiệp cần bản dịch chuẩn xác.", en: "People translating work documents, students reading foreign materials, and businesses needing accurate translations." } }
    ],
    screenshots: [
      { label: { vi: "Giao diện dịch văn bản", en: "Text translation interface" } },
      { label: { vi: "Dịch trực tiếp file tài liệu", en: "Direct document file translation" } },
      { label: { vi: "Tiện ích mở rộng trình duyệt", en: "Browser extension" } }
    ],
    seo: {
      title: { vi: "DeepL là gì? Giá, tính năng, đánh giá 2026", en: "DeepL Review 2026: Pricing, Features & Alternatives" },
      description: {
        vi: "Đánh giá DeepL: dịch thuật AI chính xác, bảng giá Free/Pro/Business, ưu nhược điểm và công cụ dịch thay thế.",
        en: "DeepL reviewed: accurate AI translation, Free/Pro/Business pricing, pros & cons, and translation-tool alternatives."
      },
      keywords: ["DeepL", "DeepL review", "DeepL pricing", "DeepL vs Google Translate"]
    }
  }

};
