// =======================================
// DU LIEU SONG NGU: KIEN THUC AI
// =======================================
const aiKnowledge = [
  {
    icon: "🤖",
    name: {
      vi: "AI là gì?",
      en: "What is AI?"
    },
    content: {
      vi: "AI, hay trí tuệ nhân tạo, là công nghệ giúp máy tính học hỏi, phân tích dữ liệu và thực hiện các nhiệm vụ thường cần đến trí thông minh của con người. AI có thể trả lời câu hỏi, nhận diện hình ảnh, dịch ngôn ngữ, hỗ trợ lập trình và xử lý nhiều công việc một cách nhanh chóng.",
      en: "AI, or artificial intelligence, is a technology that helps computers learn, analyze data, and perform tasks that normally require human intelligence. It can answer questions, recognize images, translate languages, support coding, and handle many tasks efficiently."
    }
  },
  {
    icon: "🧩",
    name: {
      vi: "Ứng dụng của AI",
      en: "Applications of AI"
    },
    content: {
      vi: "Ngày nay, AI được ứng dụng trong nhiều lĩnh vực như giáo dục, y tế, kinh doanh, thiết kế, lập trình và giải trí. Các công cụ AI có thể hỗ trợ viết nội dung, tạo hình ảnh, phân tích dữ liệu, dịch thuật, lập trình và tự động hóa quy trình để tiết kiệm thời gian và nâng cao hiệu quả làm việc.",
      en: "Today, AI is used across education, healthcare, business, design, software development, and entertainment. AI tools can help with writing, image creation, data analysis, translation, coding, and process automation to save time and improve productivity."
    }
  },
  {
    icon: "💡",
    name: {
      vi: "Lợi ích của AI",
      en: "Benefits of AI"
    },
    content: {
      vi: "AI giúp con người hoàn thành công việc nhanh hơn, giảm thời gian xử lý các tác vụ lặp lại và hỗ trợ sáng tạo trong học tập cũng như công việc. Ngoài ra, AI còn có khả năng phân tích lượng dữ liệu lớn để đưa ra những gợi ý hữu ích, từ đó nâng cao năng suất và chất lượng công việc.",
      en: "AI helps people finish work faster, reduce time spent on repetitive tasks, and support creativity in learning and daily work. It can also analyze large amounts of data to generate useful suggestions that improve quality and productivity."
    }
  },
  {
    icon: "⚠️",
    name: {
      vi: "Hạn chế của AI",
      en: "Limitations of AI"
    },
    content: {
      vi: "Mặc dù rất hữu ích, AI không phải lúc nào cũng đưa ra thông tin chính xác. Kết quả do AI tạo ra có thể chứa sai sót hoặc chưa phù hợp với từng tình huống cụ thể. Vì vậy, người dùng nên kiểm tra và xác minh thông tin trước khi sử dụng trong các quyết định quan trọng.",
      en: "Although AI is very useful, it does not always produce perfectly accurate information. Its output may contain mistakes or may not fit every specific situation. That is why users should review and verify AI-generated content before using it in important decisions."
    }
  }
];

// Bổ sung để danh mục có đúng 100 công cụ. Mỗi mục dùng trang chính thức và
// được xếp điểm tham khảo theo chất lượng, mức độ phổ biến và tính ứng dụng.
const additionalAiTools = [
  [52, "Leonardo AI", "image", "🎨", "leonardo", "Tạo ảnh AI linh hoạt với nhiều model và công cụ chỉnh sửa.", "Flexible AI image creation with multiple models and editing tools.", "free", 4.6, "https://leonardo.ai", true],
  [53, "Recraft", "image", "🖍️", "recraft", "Tạo hình minh hoạ, icon và đồ hoạ vector bằng AI.", "AI creation for illustrations, icons, and vector graphics.", "free", 4.6, "https://www.recraft.ai", true],
  [54, "Krea AI", "image", "✨", "krea", "Tạo và nâng cấp hình ảnh AI theo thời gian thực.", "Real-time AI image generation and enhancement.", "free", 4.5, "https://www.krea.ai", false],
  [55, "PhotoRoom", "image", "📷", "photoroom", "Xoá nền và tạo ảnh sản phẩm nhanh bằng AI.", "AI product-photo creation and background removal.", "free", 4.6, "https://www.photoroom.com", true],
  [56, "remove.bg", "image", "✂️", "removebg", "Tách nền ảnh tự động chỉ với một lần tải lên.", "Automatic image background removal in one upload.", "free", 4.5, "https://www.remove.bg", true],
  [57, "Microsoft Designer", "image", "🪄", "designer", "Thiết kế bài đăng và hình ảnh truyền thông bằng AI.", "AI-assisted social posts and visual design.", "free", 4.5, "https://designer.microsoft.com", false],
  [58, "Freepik AI", "image", "🖼️", "freepik", "Bộ công cụ tạo ảnh, mockup và chỉnh sửa thiết kế bằng AI.", "AI tools for images, mockups, and design editing.", "free", 4.5, "https://www.freepik.com/ai", true],
  [59, "Dreamina", "image", "🌈", "dreamina", "Tạo ảnh AI và nội dung sáng tạo trong hệ sinh thái CapCut.", "AI image generation for creative content in the CapCut ecosystem.", "free", 4.4, "https://dreamina.capcut.com", false],
  [60, "Figma AI", "image", "🎯", "figma", "Các tính năng AI hỗ trợ thiết kế giao diện và quy trình sản phẩm.", "AI features for interface design and product workflows.", "pro", 4.6, "https://www.figma.com/ai", false],
  [61, "Descript", "video", "🎙️", "descript", "Chỉnh sửa video và podcast bằng cách chỉnh sửa văn bản.", "Edit video and podcasts by editing the transcript.", "free", 4.6, "https://www.descript.com", false],
  [62, "OpusClip", "video", "📱", "opusclip", "Tự động cắt video dài thành các clip ngắn cho mạng xã hội.", "Turns long videos into social-ready short clips automatically.", "free", 4.6, "https://www.opus.pro", false],
  [63, "VEED", "video", "🎞️", "veed", "Tạo, dịch và thêm phụ đề video trực tuyến bằng AI.", "AI-assisted online video creation, translation, and captions.", "free", 4.5, "https://www.veed.io", false],
  [64, "Filmora AI", "video", "🎬", "filmora", "Trình dựng video có công cụ AI cho người mới bắt đầu.", "Beginner-friendly video editor with AI tools.", "free", 4.4, "https://filmora.wondershare.com", false],
  [65, "Adobe Premiere Pro", "video", "🎥", "premiere", "Dựng phim chuyên nghiệp với các tính năng AI của Adobe.", "Professional video editing with Adobe AI features.", "pro", 4.7, "https://www.adobe.com/products/premiere.html", false],
  [66, "Vidnoz AI", "video", "🧑‍💼", "vidnoz", "Tạo video avatar AI và thuyết minh đa ngôn ngữ.", "AI avatar videos with multilingual voiceovers.", "free", 4.4, "https://www.vidnoz.com", false],
  [67, "Akool", "video", "🧬", "akool", "Nền tảng video AI với avatar và dịch khuôn mặt.", "AI video platform for avatars and face translation.", "free", 4.4, "https://akool.com", true],
  [68, "GitLab Duo", "code", "🦊", "gitlab", "Trợ lý AI hỗ trợ toàn bộ vòng đời phát triển phần mềm.", "AI assistance across the software development lifecycle.", "pro", 4.5, "https://about.gitlab.com/gitlab-duo", false],
  [69, "Tabnine", "code", "⌨️", "tabnine", "Gợi ý và hoàn thành mã nguồn trong nhiều IDE.", "Code completion and suggestions across many IDEs.", "free", 4.4, "https://www.tabnine.com", false],
  [70, "Replit", "code", "⚙️", "replit", "Nền tảng lập trình trên web với AI Agent để tạo ứng dụng.", "Web development platform with an AI agent for building apps.", "free", 4.6, "https://replit.com", false],
  [71, "Devin", "code", "🤖", "devin", "AI agent hỗ trợ thực hiện tác vụ lập trình phức tạp.", "AI agent for handling multi-step software tasks.", "pro", 4.5, "https://devin.ai", false],
  [72, "Sourcegraph Cody", "code", "🔎", "sourcegraph", "Trợ lý hiểu codebase để tìm kiếm và viết mã.", "Codebase-aware assistant for search and coding.", "free", 4.4, "https://sourcegraph.com/cody", false],
  [73, "JetBrains AI Assistant", "code", "🧩", "jetbrains", "Trợ lý AI tích hợp trong các IDE của JetBrains.", "AI assistant built into JetBrains IDEs.", "pro", 4.5, "https://www.jetbrains.com/ai", false],
  [74, "Continue", "code", "🔁", "continue", "Trợ lý lập trình mã nguồn mở, có thể dùng model riêng.", "Open-source coding assistant that can use your choice of models.", "free", 4.4, "https://www.continue.dev", false],
  [75, "Aider", "code", "🛠️", "aider", "Công cụ AI chạy trong terminal để lập trình cùng Git.", "Terminal-based AI pair programmer that works with Git.", "free", 4.5, "https://aider.chat", false],
  [76, "v0", "code", "⚡", "v0", "Tạo giao diện web từ mô tả bằng ngôn ngữ tự nhiên.", "Generates web interfaces from natural-language descriptions.", "free", 4.6, "https://v0.dev", false],
  [77, "Bolt.new", "code", "⚡", "bolt", "Tạo và chạy ứng dụng web ngay trong trình duyệt với AI.", "Build and run web apps in the browser with AI.", "free", 4.6, "https://bolt.new", false],
  [78, "Lovable", "code", "💜", "lovable", "Tạo ứng dụng web từ yêu cầu bằng ngôn ngữ tự nhiên.", "Creates web applications from natural-language requirements.", "free", 4.6, "https://lovable.dev", false],
  [79, "Firebase Studio", "code", "🔥", "firebase", "Môi trường phát triển ứng dụng AI trên nền tảng Firebase.", "AI application development environment on Firebase.", "free", 4.5, "https://firebase.studio", false],
  [80, "Phind", "code", "🔍", "phind", "Công cụ tìm kiếm và trợ lý AI tối ưu cho lập trình viên.", "AI search and assistant optimized for developers.", "free", 4.5, "https://www.phind.com", false],
  [81, "HuggingChat", "chat", "🤗", "huggingface", "Trợ lý hội thoại miễn phí từ hệ sinh thái Hugging Face.", "Free conversational assistant from the Hugging Face ecosystem.", "free", 4.4, "https://huggingface.co/chat", false],
  [82, "Poe", "chat", "💬", "poe", "Một nơi để dùng và so sánh nhiều chatbot AI khác nhau.", "One place to use and compare many AI chatbots.", "free", 4.5, "https://poe.com", true],
  [83, "You.com", "chat", "🌐", "you", "Tìm kiếm và trò chuyện với AI có hỗ trợ nghiên cứu.", "AI search and chat with research support.", "free", 4.4, "https://you.com", true],
  [84, "Character.AI", "chat", "🗨️", "characterai", "Tạo và trò chuyện với các nhân vật AI tuỳ biến.", "Create and chat with customizable AI characters.", "free", 4.4, "https://character.ai", false],
  [85, "NotebookLM", "study", "📓", "notebooklm", "Nghiên cứu và hỏi đáp trực tiếp trên tài liệu của bạn.", "Research and ask questions directly across your own sources.", "free", 4.8, "https://notebooklm.google.com", false],
  [86, "Elicit", "study", "🔬", "elicit", "Trợ lý AI để tìm, tóm tắt và phân tích nghiên cứu.", "AI assistant for finding, summarizing, and analyzing research.", "free", 4.6, "https://elicit.com", false],
  [87, "Consensus", "study", "📚", "consensus", "Tìm câu trả lời dựa trên các bài báo khoa học.", "Find evidence-based answers from scientific papers.", "free", 4.6, "https://consensus.app", false],
  [88, "Scite", "study", "📖", "scite", "Phân tích trích dẫn khoa học và ngữ cảnh của chúng.", "Analyzes scientific citations and their context.", "pro", 4.5, "https://scite.ai", true],
  [89, "Otter.ai", "study", "📝", "otter", "Ghi âm, chép lời và tóm tắt cuộc họp bằng AI.", "AI meeting transcription, notes, and summaries.", "free", 4.6, "https://otter.ai", false],
  [90, "Photomath", "study", "➗", "photomath", "Quét bài toán và nhận hướng dẫn giải từng bước.", "Scan math problems and get step-by-step solutions.", "free", 4.5, "https://photomath.com", false],
  [91, "Brainly AI", "study", "🧠", "brainly", "Hỗ trợ giải bài tập và giải thích kiến thức cho học sinh.", "Homework help and explanations for students.", "free", 4.4, "https://brainly.com", false],
  [92, "ELSA Speak", "study", "🗣️", "elsa", "Luyện phát âm tiếng Anh với phản hồi AI cá nhân hoá.", "Practice English pronunciation with personalized AI feedback.", "free", 4.5, "https://elsaspeak.com", false],
  [93, "ElevenLabs", "study", "🔊", "elevenlabs", "Tạo giọng nói AI tự nhiên cho nội dung và học tập.", "Natural AI voices for content and learning.", "free", 4.7, "https://elevenlabs.io", true],
  [94, "Jasper", "chat", "✍️", "jasper", "Trợ lý AI chuyên viết nội dung và marketing.", "AI assistant focused on marketing and content creation.", "pro", 4.5, "https://www.jasper.ai", true],
  [95, "Copy.ai", "chat", "📣", "copyai", "Tạo nội dung marketing và tự động hoá quy trình bán hàng.", "Marketing copy generation and sales-workflow automation.", "free", 4.4, "https://www.copy.ai", true],
  [96, "Writesonic", "chat", "📝", "writesonic", "Viết nội dung, SEO và làm việc với AI agent.", "AI writing, SEO, and agentic workflows.", "free", 4.4, "https://writesonic.com", true],
  [97, "HubSpot Breeze", "chat", "🧡", "hubspot", "Các tính năng AI cho marketing, bán hàng và chăm sóc khách hàng.", "AI features for marketing, sales, and customer service.", "pro", 4.5, "https://www.hubspot.com/products/artificial-intelligence", false],
  [98, "Salesforce Einstein", "chat", "☁️", "salesforce", "AI cho dữ liệu khách hàng, bán hàng và dịch vụ doanh nghiệp.", "Enterprise AI for customer data, sales, and service.", "pro", 4.5, "https://www.salesforce.com/ai", false],
  [99, "Suno", "study", "🎵", "suno", "Tạo bài nhạc và bài hát từ mô tả bằng AI.", "Generate songs and music from text descriptions.", "free", 4.6, "https://suno.com", false],
  [100, "Udio", "study", "🎼", "udio", "Tạo nhạc AI với khả năng tuỳ chỉnh phong cách và lời bài hát.", "AI music generation with customizable style and lyrics.", "free", 4.5, "https://www.udio.com", false]
].map(([id, name, category, icon, logo, vi, en, badge, rating, link, hasApi]) => ({
  id, name, category, icon, logo, description: { vi, en }, badge, rating, link, hasApi: !!hasApi
}));

// =======================================
// DU LIEU SONG NGU: HUONG DAN SU DUNG AI
// =======================================
const aiGuide = [
  {
    icon: "🎯",
    name: {
      vi: "Bước 1: Chọn công cụ AI phù hợp",
      en: "Step 1: Choose the right AI tool"
    },
    content: {
      vi: "Trước tiên, hãy xác định mục đích sử dụng của bạn. Nếu bạn cần hỗ trợ học tập, viết nội dung hoặc lập trình, hãy chọn công cụ AI phù hợp với nhu cầu. Chọn đúng công cụ sẽ giúp bạn đạt được kết quả tốt hơn.",
      en: "Start by identifying your goal. If you need help with learning, writing, or coding, choose an AI tool that matches that need. Selecting the right tool usually leads to better results."
    }
  },
  {
    icon: "✍️",
    name: {
      vi: "Bước 2: Đặt câu hỏi rõ ràng",
      en: "Step 2: Write clear prompts"
    },
    content: {
      vi: "AI sẽ trả lời chính xác hơn khi bạn đưa ra yêu cầu cụ thể. Thay vì đặt câu hỏi ngắn hoặc mơ hồ, hãy mô tả rõ mục tiêu, nội dung cần thực hiện và yêu cầu về độ dài hoặc phong cách nếu cần.",
      en: "AI responds better when you give clear and specific instructions. Instead of vague prompts, describe your goal, the task details, and any preferences for length or tone."
    }
  },
  {
    icon: "🔍",
    name: {
      vi: "Bước 3: Kiểm tra kết quả",
      en: "Step 3: Review the output"
    },
    content: {
      vi: "Sau khi AI trả lời, hãy đọc và kiểm tra lại nội dung. Đối với thông tin quan trọng như bài học, số liệu hoặc tài liệu nghiên cứu, bạn nên đối chiếu với các nguồn đáng tin cậy để đảm bảo tính chính xác.",
      en: "After AI generates a result, review it carefully. For important information such as lessons, numbers, or research material, compare it with reliable sources to ensure accuracy."
    }
  },
  {
    icon: "🛠️",
    name: {
      vi: "Bước 4: Chỉnh sửa và tối ưu",
      en: "Step 4: Refine and improve"
    },
    content: {
      vi: "Nếu kết quả chưa đúng ý, bạn có thể yêu cầu AI chỉnh sửa, bổ sung hoặc viết lại theo phong cách mong muốn. Việc trao đổi nhiều lần sẽ giúp AI hiểu yêu cầu rõ hơn và tạo ra nội dung chất lượng hơn.",
      en: "If the result is not quite right, ask AI to revise, expand, or rewrite it in the style you want. Iterating a few times usually helps AI understand your request better and produce stronger content."
    }
  },
  {
    icon: "🔒",
    name: {
      vi: "Lưu ý khi sử dụng AI",
      en: "Important safety tips"
    },
    content: {
      vi: "Không nên chia sẻ thông tin cá nhân hoặc dữ liệu nhạy cảm với AI. Hãy sử dụng AI như một công cụ hỗ trợ thay vì phụ thuộc hoàn toàn, đồng thời tôn trọng bản quyền và kiểm tra nội dung trước khi đưa vào học tập hoặc công việc.",
      en: "Do not share personal or sensitive data with AI tools. Use AI as support rather than depending on it completely, respect copyright, and always review content before using it for school or work."
    }
  }
];

// =======================================
// DU LIEU SONG NGU: DANH SACH CONG CU AI
// category phai khop voi data-category trong sidebar:
// chat | image | video | code | finance | study
// badge: free | pro | hot
// =======================================
const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    slug: "chatgpt",
    category: "chat",
    icon: "🤖",
    logo: "openai",
    description: {
      vi: "Chatbot AI đa năng của OpenAI, hỗ trợ trò chuyện, viết lách, lập trình và giải đáp thắc mắc.",
      en: "OpenAI's all-purpose AI chatbot for conversation, writing, coding, and answering questions."
    },
    badge: "free",
    hasApi: true,
    rating: 4.8,
    link: "https://chat.openai.com",
    features: [
      { vi: "Trò chuyện tự nhiên, trả lời theo ngữ cảnh nhiều lượt", en: "Natural multi-turn conversation with context awareness" },
      { vi: "Viết nội dung, tóm tắt văn bản, dịch thuật", en: "Content writing, text summarization, translation" },
      { vi: "Hỗ trợ lập trình, giải thích và sửa lỗi code", en: "Coding assistance, code explanation and debugging" },
      { vi: "Tạo và phân tích hình ảnh (qua DALL·E, Vision)", en: "Image generation and analysis (via DALL·E, Vision)" }
    ],
    pros: [
      { vi: "Dễ sử dụng, giao diện thân thiện", en: "Easy to use, friendly interface" },
      { vi: "Hệ sinh thái plugin và tích hợp phong phú", en: "Rich plugin and integration ecosystem" },
      { vi: "Cập nhật tính năng thường xuyên", en: "Frequent feature updates" }
    ],
    cons: [
      { vi: "Bản miễn phí giới hạn số lượt dùng model mạnh", en: "Free tier limits usage of the strongest models" },
      { vi: "Đôi khi trả lời sai thông tin (ảo giác)", en: "Can occasionally hallucinate incorrect information" }
    ],
    usage: {
      vi: "Truy cập chat.openai.com, đăng nhập tài khoản OpenAI rồi nhập câu hỏi/yêu cầu vào ô chat để bắt đầu trò chuyện.",
      en: "Go to chat.openai.com, sign in with an OpenAI account, then type your question or request into the chat box to start."
    }
  },
  {
    id: 2,
    name: "Google Gemini",
    slug: "google-gemini",
    category: "chat",
    icon: "✨",
    logo: "gemini",
    description: {
      vi: "Trợ lý AI của Google, tích hợp sâu với Search, Gmail và các dịch vụ Google khác.",
      en: "Google's AI assistant with deep integration across Search, Gmail, and other Google services."
    },
    badge: "free",
    hasApi: true,
    rating: 4.6,
    link: "https://gemini.google.com",
    features: [
      { vi: "Tích hợp trực tiếp với Gmail, Docs, Search", en: "Deep integration with Gmail, Docs, and Search" },
      { vi: "Xử lý đa phương thức: văn bản, hình ảnh, giọng nói", en: "Multimodal: text, image, and voice input" },
      { vi: "Tìm kiếm thông tin thời gian thực từ Google Search", en: "Real-time information via Google Search" }
    ],
    pros: [
      { vi: "Tích hợp sâu vào hệ sinh thái Google", en: "Deep integration across the Google ecosystem" },
      { vi: "Tốc độ phản hồi nhanh", en: "Fast response speed" }
    ],
    cons: [
      { vi: "Một số tính năng nâng cao yêu cầu gói trả phí", en: "Some advanced features require a paid plan" }
    ],
    usage: {
      vi: "Truy cập gemini.google.com bằng tài khoản Google, sau đó nhập câu hỏi hoặc gắn tệp để được hỗ trợ.",
      en: "Visit gemini.google.com with a Google account, then type a question or attach a file to get help."
    }
  },
  {
    id: 3,
    name: "Claude",
    slug: "claude",
    category: "chat",
    icon: "🧠",
    logo: "claude",
    description: {
      vi: "AI của Anthropic, nổi bật về tư duy logic, viết văn bản dài và xử lý tài liệu phức tạp.",
      en: "Anthropic's AI assistant known for strong reasoning, long-form writing, and document handling."
    },
    badge: "free",
    hasApi: true,
    rating: 4.9,
    link: "https://claude.ai",
    features: [
      { vi: "Xử lý văn bản/tài liệu rất dài trong một lượt chat", en: "Handles very long documents/text in a single chat" },
      { vi: "Tạo và chỉnh sửa tài liệu, bảng tính, slide ngay trong chat", en: "Create and edit documents, spreadsheets, slides in chat" },
      { vi: "Viết code và giải thích logic rõ ràng", en: "Strong coding assistance with clear reasoning" }
    ],
    pros: [
      { vi: "Tư duy logic mạch lạc, ít ảo giác hơn nhiều mô hình khác", en: "Coherent reasoning, fewer hallucinations than many models" },
      { vi: "Giọng văn tự nhiên, phù hợp viết lách chuyên sâu", en: "Natural tone, great for in-depth writing" }
    ],
    cons: [
      { vi: "Giới hạn số lượt chat với bản miễn phí", en: "Limited number of messages on the free plan" }
    ],
    usage: {
      vi: "Vào claude.ai, đăng ký/đăng nhập tài khoản, sau đó nhập yêu cầu vào ô chat hoặc tải tệp lên để Claude xử lý.",
      en: "Go to claude.ai, sign up or log in, then type your request in the chat box or upload a file for Claude to work with."
    }
  },
  {
    id: 4,
    name: "Grok",
    slug: "grok",
    category: "chat",
    icon: "💬",
    logo: "grok",
    description: {
      vi: "Chatbot AI của xAI, tích hợp trên nền tảng X với khả năng cập nhật thông tin nhanh.",
      en: "xAI's chatbot integrated with X, designed for fast access to current information."
    },
    badge: "hot",
    hasApi: true,
    rating: 4.3,
    link: "https://x.ai"
  },
  {
    id: 5,
    name: "Midjourney",
    slug: "midjourney",
    category: "image",
    icon: "🎨",
    logo: "midjourney",
    description: {
      vi: "Công cụ tạo ảnh AI nổi tiếng với chất lượng nghệ thuật cao và phong cách độc đáo.",
      en: "A leading AI image generator known for artistic quality and distinctive visual styles."
    },
    badge: "pro",
    hasApi: false,
    rating: 4.7,
    link: "https://midjourney.com",
    features: [
      { vi: "Tạo ảnh AI từ mô tả văn bản (prompt)", en: "Generate AI images from text prompts" },
      { vi: "Nhiều phong cách nghệ thuật: hội họa, ảnh thực, 3D...", en: "Many art styles: painting, photoreal, 3D, and more" },
      { vi: "Tùy chỉnh tỉ lệ khung hình, độ chi tiết, biến thể ảnh", en: "Customize aspect ratio, detail level, and image variations" }
    ],
    pros: [
      { vi: "Chất lượng hình ảnh và tính thẩm mỹ rất cao", en: "Very high image quality and aesthetics" },
      { vi: "Cộng đồng lớn, nhiều tài liệu và prompt mẫu", en: "Large community with many example prompts" }
    ],
    cons: [
      { vi: "Không có bản dùng thử miễn phí, phải trả phí ngay", en: "No free trial, requires a paid subscription" },
      { vi: "Chủ yếu thao tác qua Discord, không thân thiện với người mới", en: "Mainly used via Discord, less beginner-friendly" }
    ],
    usage: {
      vi: "Tham gia server Discord của Midjourney hoặc dùng web app, gõ lệnh /imagine kèm mô tả để tạo ảnh.",
      en: "Join Midjourney's Discord server or use the web app, type /imagine followed by a description to generate images."
    }
  },
  {
    id: 6,
    name: "DALL·E 3",
    slug: "dalle-3",
    category: "image",
    icon: "🖼️",
    logo: "dalle",
    description: {
      vi: "Công cụ tạo ảnh từ văn bản của OpenAI, được tích hợp trong ChatGPT.",
      en: "OpenAI's text-to-image model, available directly inside ChatGPT."
    },
    badge: "free",
    hasApi: true,
    rating: 4.5,
    link: "https://openai.com/dall-e-3"
  },
  {
    id: 7,
    name: "Adobe Firefly",
    slug: "adobe-firefly",
    category: "image",
    icon: "🔥",
    logo: "firefly",
    description: {
      vi: "AI tạo và chỉnh sửa ảnh của Adobe, tích hợp trực tiếp trong bộ công cụ sáng tạo.",
      en: "Adobe's AI suite for image generation and editing, integrated into creative workflows."
    },
    badge: "free",
    hasApi: true,
    rating: 4.4,
    link: "https://firefly.adobe.com"
  },
  {
    id: 8,
    name: "Runway",
    slug: "runway",
    category: "video",
    icon: "🎬",
    logo: "runway",
    description: {
      vi: "Nền tảng AI tạo và chỉnh sửa video chuyên nghiệp, hỗ trợ text-to-video.",
      en: "A professional AI video platform for generating and editing video, including text-to-video."
    },
    badge: "pro",
    hasApi: true,
    rating: 4.5,
    link: "https://runwayml.com"
  },
  {
    id: 9,
    name: "Sora",
    slug: "sora",
    category: "video",
    icon: "🎥",
    logo: "sora",
    description: {
      vi: "AI tạo video từ văn bản của OpenAI với hình ảnh chân thực và chuyển động mượt mà.",
      en: "OpenAI's text-to-video model focused on realistic visuals and smooth motion."
    },
    badge: "hot",
    hasApi: false,
    rating: 4.6,
    link: "https://openai.com/sora"
  },
  {
    id: 10,
    name: "Pika",
    category: "video",
    icon: "📹",
    logo: "pika",
    description: {
      vi: "Công cụ tạo video AI dễ sử dụng, phù hợp cho nội dung mạng xã hội.",
      en: "An easy-to-use AI video tool well suited for social media content."
    },
    badge: "free",
    hasApi: false,
    rating: 4.2,
    link: "https://pika.art"
  },
  {
    id: 11,
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "code",
    icon: "💻",
    logo: "githubcopilot",
    description: {
      vi: "Trợ lý lập trình AI trong IDE, gợi ý code thông minh theo thời gian thực.",
      en: "An AI coding assistant inside your IDE that provides real-time code suggestions."
    },
    badge: "pro",
    hasApi: false,
    rating: 4.7,
    link: "https://github.com/features/copilot",
    features: [
      { vi: "Gợi ý code tự động ngay trong IDE (VS Code, JetBrains...)", en: "Real-time code suggestions inside your IDE (VS Code, JetBrains, etc.)" },
      { vi: "Chat hỏi đáp về codebase, giải thích và refactor code", en: "Chat to ask about your codebase, explain, and refactor code" },
      { vi: "Hỗ trợ nhiều ngôn ngữ lập trình phổ biến", en: "Supports most popular programming languages" }
    ],
    pros: [
      { vi: "Tăng tốc độ viết code đáng kể", en: "Significantly speeds up coding" },
      { vi: "Tích hợp mượt mà với các IDE quen thuộc", en: "Smooth integration with familiar IDEs" }
    ],
    cons: [
      { vi: "Cần trả phí sau thời gian dùng thử", en: "Requires payment after the trial period" },
      { vi: "Gợi ý đôi khi chưa chính xác, cần kiểm tra lại", en: "Suggestions can sometimes be inaccurate and need review" }
    ],
    usage: {
      vi: "Cài extension GitHub Copilot trong IDE, đăng nhập tài khoản GitHub có đăng ký Copilot, rồi gõ code để nhận gợi ý tự động.",
      en: "Install the GitHub Copilot extension in your IDE, sign in with a GitHub account subscribed to Copilot, then start typing code to get suggestions."
    }
  },
  {
    id: 12,
    name: "Cursor",
    slug: "cursor",
    category: "code",
    icon: "⌨️",
    logo: "cursor",
    description: {
      vi: "Trình soạn thảo code tích hợp AI mạnh mẽ, hỗ trợ chat và sửa lỗi nhanh.",
      en: "An AI-first code editor with chat features and fast code assistance."
    },
    badge: "free",
    hasApi: false,
    rating: 4.6,
    link: "https://cursor.sh"
  },
  {
    id: 13,
    name: "Microsoft Copilot",
    slug: "microsoft-copilot",
    category: "chat",
    icon: "📊",
    logo: "copilot",
    description: {
      vi: "Trợ lý AI của Microsoft hỗ trợ công việc văn phòng, tìm kiếm và tổng hợp thông tin.",
      en: "Microsoft's AI assistant for productivity, search, and everyday office tasks."
    },
    badge: "pro",
    hasApi: false,
    rating: 4.4,
    link: "https://copilot.microsoft.com"
  },
  {
    id: 14,
    name: "Notion AI",
    slug: "notion-ai",
    category: "chat",
    icon: "📝",
    logo: "notion",
    description: {
      vi: "Trợ lý AI trong Notion, hỗ trợ viết, tóm tắt và tổ chức công việc.",
      en: "Notion's built-in AI assistant for writing, summarizing, and organizing work."
    },
    badge: "free",
    hasApi: false,
    rating: 4.5,
    link: "https://notion.so/product/ai",
    features: [
      { vi: "Viết, chỉnh sửa và tóm tắt nội dung ngay trong trang Notion", en: "Write, edit, and summarize content directly inside Notion pages" },
      { vi: "Tự động tạo bảng, danh sách công việc từ ghi chú", en: "Auto-generate tables and task lists from notes" },
      { vi: "Hỏi đáp AI dựa trên toàn bộ workspace", en: "Q&A powered by your entire workspace" }
    ],
    pros: [
      { vi: "Liền mạch với thói quen ghi chú/quản lý công việc có sẵn", en: "Seamless with your existing notes and workflow" },
      { vi: "Tiết kiệm thời gian tổng hợp và soạn thảo tài liệu", en: "Saves time on drafting and summarizing documents" }
    ],
    cons: [
      { vi: "Tính năng AI là gói mở rộng trả phí thêm", en: "AI features are a paid add-on" }
    ],
    usage: {
      vi: "Trong bất kỳ trang Notion nào, gõ lệnh hoặc chọn 'Ask AI' để yêu cầu viết, tóm tắt hay chỉnh sửa nội dung.",
      en: "In any Notion page, type a command or select 'Ask AI' to write, summarize, or edit content."
    }
  },
  {
    id: 15,
    name: "Khanmigo",
    category: "study",
    icon: "📚",
    logo: "khanacademy",
    description: {
      vi: "AI của Khan Academy giúp giải thích bài học và hướng dẫn học sinh theo từng bước.",
      en: "Khan Academy's AI tutor that explains lessons and guides students step by step."
    },
    badge: "free",
    hasApi: false,
    rating: 4.5,
    link: "https://khanacademy.org/khan-labs"
  },
  {
    id: 16,
    name: "Duolingo Max",
    category: "study",
    icon: "🦉",
    logo: "duolingo",
    description: {
      vi: "Phiên bản AI nâng cao của Duolingo giúp luyện nói và giải thích ngữ pháp.",
      en: "Duolingo's enhanced AI plan for speaking practice and grammar explanations."
    },
    badge: "pro",
    hasApi: false,
    rating: 4.6,
    link: "https://duolingo.com"
  },
  {
    id: 17,
    name: "Perplexity",
    slug: "perplexity",
    category: "chat",
    icon: "🔍",
    logo: "perplexity",
    description: {
      vi: "Công cụ tìm kiếm AI có trích dẫn nguồn để tham khảo nhanh.",
      en: "An AI search engine that provides cited sources for faster research."
    },
    badge: "free",
    hasApi: true,
    rating: 4.8,
    link: "https://perplexity.ai"
  },
  {
    id: 18,
    name: "DeepSeek",
    slug: "deepseek",
    category: "chat",
    icon: "🐋",
    logo: "deepseek",
    description: {
      vi: "Mô hình AI mạnh về lập trình và suy luận.",
      en: "An AI model known for strong coding and reasoning performance."
    },
    badge: "free",
    hasApi: true,
    rating: 4.8,
    link: "https://chat.deepseek.com"
  },
  {
    id: 19,
    name: "Qwen",
    category: "chat",
    icon: "🌐",
    logo: "qwen",
    description: {
      vi: "Trợ lý AI của Alibaba cho nhiều nhu cầu hỏi đáp và làm việc.",
      en: "Alibaba's AI assistant for general productivity and question answering."
    },
    badge: "free",
    hasApi: true,
    rating: 4.7,
    link: "https://chat.qwen.ai"
  },
  {
    id: 20,
    name: "Meta AI",
    slug: "meta-ai",
    category: "chat",
    icon: "∞",
    logo: "meta",
    description: {
      vi: "Trợ lý AI của Meta được tích hợp trong hệ sinh thái sản phẩm của hãng.",
      en: "Meta's AI assistant integrated across the company's product ecosystem."
    },
    badge: "free",
    hasApi: false,
    rating: 4.7,
    link: "https://www.meta.ai"
  },
  {
    id: 21,
    name: "Kimi",
    category: "chat",
    icon: "🌙",
    logo: "kimi",
    description: {
      vi: "Trợ lý AI của Moonshot hỗ trợ hỏi đáp và xử lý thông tin.",
      en: "Moonshot's AI assistant for research, conversation, and information handling."
    },
    badge: "free",
    hasApi: true,
    rating: 4.7,
    link: "https://kimi.com"
  },
  {
    id: 22,
    name: "Mistral",
    slug: "mistral",
    category: "chat",
    icon: "⚡",
    logo: "mistral",
    description: {
      vi: "Le Chat của Mistral, phù hợp cho hỏi đáp và công việc hằng ngày.",
      en: "Mistral's Le Chat assistant for everyday work and conversations."
    },
    badge: "free",
    hasApi: true,
    rating: 4.7,
    link: "https://chat.mistral.ai"
  },
  {
    id: 23,
    name: "Codeium",
    category: "code",
    icon: "💻",
    logo: "codeium",
    description: {
      vi: "Công cụ AI hỗ trợ lập trình, gợi ý code và giải thích mã nguồn.",
      en: "An AI coding tool for code completion, suggestions, and source explanation."
    },
    badge: "free",
    hasApi: false,
    rating: 4.6,
    link: "https://codeium.com"
  },
  {
    id: 24,
    name: "Windsurf",
    category: "code",
    icon: "🌊",
    logo: "windsurf",
    description: {
      vi: "IDE hướng AI giúp lập trình nhanh hơn và dễ thao tác hơn.",
      en: "An AI-focused IDE designed to speed up software development."
    },
    badge: "free",
    hasApi: false,
    rating: 4.7,
    link: "https://windsurf.com"
  },
  {
    id: 25,
    name: "Amazon Q",
    category: "code",
    icon: "📦",
    logo: "amazon",
    description: {
      vi: "Trợ lý AI của AWS hỗ trợ lập trình và công việc doanh nghiệp.",
      en: "AWS's AI assistant for coding and enterprise productivity."
    },
    badge: "free",
    hasApi: true,
    rating: 4.5,
    link: "https://aws.amazon.com/q/"
  },
  {
    id: 26,
    name: "Canva AI",
    slug: "canva-ai",
    category: "image",
    icon: "🎨",
    logo: "canva",
    description: {
      vi: "Bộ công cụ AI trong Canva để thiết kế, viết nội dung và tạo hình nhanh.",
      en: "Canva's AI features for design, content creation, and quick visual editing."
    },
    badge: "free",
    hasApi: false,
    rating: 4.8,
    link: "https://canva.com"
  },
  {
    id: 27,
    name: "Gamma",
    category: "study",
    icon: "📊",
    logo: "gamma",
    description: {
      vi: "Công cụ AI tạo slide và tài liệu thuyết trình nhanh.",
      en: "An AI presentation tool for creating slides and documents quickly."
    },
    badge: "free",
    hasApi: false,
    rating: 4.7,
    link: "https://gamma.app"
  },
  {
    id: 28,
    name: "FLUX",
    category: "image",
    icon: "🖼️",
    logo: "flux",
    description: {
      vi: "Mô hình AI tạo ảnh chất lượng cao.",
      en: "A high-quality AI image generation model."
    },
    badge: "free",
    hasApi: true,
    rating: 4.8,
    link: "https://blackforestlabs.ai"
  },
  {
    id: 29,
    name: "Ideogram",
    category: "image",
    icon: "🖌️",
    logo: "ideogram",
    description: {
      vi: "Công cụ AI tạo ảnh và xử lý chữ trong hình ảnh rất tốt.",
      en: "An AI image generator especially strong at rendering text in images."
    },
    badge: "free",
    hasApi: true,
    rating: 4.8,
    link: "https://ideogram.ai"
  },
  {
    id: 30,
    name: "Stable Diffusion",
    slug: "stable-diffusion",
    category: "image",
    icon: "🎆",
    logo: "stability",
    description: {
      vi: "Mô hình tạo ảnh phổ biến, linh hoạt và có cộng đồng lớn.",
      en: "A widely used and flexible image generation model with a large community."
    },
    badge: "free",
    hasApi: true,
    rating: 4.7,
    link: "https://stability.ai"
  },
  {
    id: 31,
    name: "FinChat",
    category: "finance",
    icon: "📈",
    logo: "finchat",
    description: {
      vi: "Nền tảng AI phân tích cổ phiếu, báo cáo tài chính và dữ liệu doanh nghiệp.",
      en: "An AI platform for analyzing stocks, financial reports, and company data."
    },
    badge: "free",
    hasApi: false,
    rating: 4.5,
    link: "https://finchat.io"
  },
  {
    id: 32,
    name: "AlphaSense",
    category: "finance",
    icon: "🔎",
    logo: "alphasense",
    description: {
      vi: "Công cụ AI cho doanh nghiệp để tìm kiếm và phân tích tài liệu tài chính và tin tức thị trường.",
      en: "An enterprise AI platform for searching and analyzing financial documents and market news."
    },
    badge: "pro",
    hasApi: false,
    rating: 4.6,
    link: "https://alpha-sense.com"
  },
  {
    id: 33,
    name: "BloombergGPT",
    category: "finance",
    icon: "📊",
    logo: "bloomberg",
    description: {
      vi: "Mô hình AI phục vụ phân tích thị trường, tin tức và dữ liệu tài chính chuyên sâu.",
      en: "An AI model built for advanced financial data, market, and news analysis."
    },
    badge: "pro",
    hasApi: false,
    rating: 4.5,
    link: "https://bloomberg.com"
  },
  {
    id: 34,
    name: "Kavout",
    category: "finance",
    icon: "📉",
    logo: "kavout",
    description: {
      vi: "Công cụ AI hỗ trợ phân tích cổ phiếu, đánh giá xu hướng và xây dựng danh mục đầu tư.",
      en: "An AI investing tool for stock analysis, trend evaluation, and portfolio support."
    },
    badge: "free",
    hasApi: false,
    rating: 4.3,
    link: "https://kavout.com"
  },
  {
    id: 35,
    name: "Incite AI",
    category: "finance",
    icon: "📰",
    logo: "inciteai",
    description: {
      vi: "Công cụ tham khảo cho phân tích chứng khoán và xu hướng giá.",
      en: "An AI assistant for stock research and price trend insights."
    },
    badge: "free",
    hasApi: false,
    rating: 4.2,
    link: "https://incite.ai"
  },
  {
    id: 36,
    name: "Magnifi",
    category: "finance",
    icon: "💹",
    logo: "magnifi",
    description: {
      vi: "AI giúp tìm quỹ đầu tư, ETF và cổ phiếu dựa trên mục tiêu tài chính của người dùng.",
      en: "An AI investing search tool for funds, ETFs, and stocks based on user goals."
    },
    badge: "free",
    hasApi: false,
    rating: 4.3,
    link: "https://magnifi.com"
  },
  {
    id: 37,
    name: "Danelfin",
    category: "finance",
    icon: "⭐",
    logo: "danelfin",
    description: {
      vi: "Nền tảng AI chấm điểm cổ phiếu dựa trên chỉ số tài chính và kỹ thuật.",
      en: "An AI stock rating platform based on financial and technical indicators."
    },
    badge: "pro",
    hasApi: true,
    rating: 4.4,
    link: "https://danelfin.com"
  },
  {
    id: 38,
    name: "TrendSpider",
    category: "finance",
    icon: "🕸️",
    logo: "trendspider",
    description: {
      vi: "Công cụ AI hỗ trợ phân tích biểu đồ, phát hiện xu hướng và tự động hóa kỹ thuật.",
      en: "An AI platform for chart analysis, trend detection, and technical automation."
    },
    badge: "pro",
    hasApi: true,
    rating: 4.5,
    link: "https://trendspider.com"
  },
  {
    id: 39,
    name: "Tickeron",
    category: "finance",
    icon: "🎯",
    logo: "tickeron",
    description: {
      vi: "Nền tảng AI cung cấp tín hiệu giao dịch và hỗ trợ ra quyết định cho nhà đầu tư.",
      en: "An AI platform that provides trading signals and decision support for investors."
    },
    badge: "free",
    hasApi: false,
    rating: 4.3,
    link: "https://tickeron.com"
  },
  {
    id: 40,
    name: "Quizlet AI",
    category: "study",
    icon: "🗂️",
    logo: "quizlet",
    description: {
      vi: "Công cụ tạo flashcard, câu hỏi ôn tập và bài kiểm tra để học hiệu quả hơn.",
      en: "An AI study assistant for creating flashcards, review questions, and practice tests."
    },
    badge: "free",
    hasApi: false,
    rating: 4.6,
    link: "https://quizlet.com"
  },
  {
    id: 41,
    name: "Socratic",
    category: "study",
    icon: "📐",
    logo: "socratic",
    description: {
      vi: "Ứng dụng AI của Google giúp giải bài tập và học nhiều môn qua hình ảnh hoặc câu hỏi.",
      en: "Google's AI learning app that helps solve homework through photos and questions."
    },
    badge: "free",
    hasApi: false,
    rating: 4.5,
    link: "https://socratic.org"
  },
  {
    id: 42,
    name: "Wolfram Alpha",
    slug: "wolfram-alpha",
    category: "study",
    icon: "🧮",
    logo: "wolframalpha",
    description: {
      vi: "Công cụ tính toán, giải toán và phân tích dữ liệu mạnh cho các môn STEM.",
      en: "A powerful computational engine for math, science, and STEM problem solving."
    },
    badge: "free",
    hasApi: true,
    rating: 4.7,
    link: "https://wolframalpha.com"
  },
  {
    id: 43,
    name: "Grammarly",
    slug: "grammarly",
    category: "study",
    icon: "✅",
    logo: "grammarly",
    description: {
      vi: "Công cụ hỗ trợ chính tả, ngữ pháp và cải thiện kỹ năng viết tiếng Anh.",
      en: "A writing assistant for spelling, grammar, and clearer English communication."
    },
    badge: "free",
    hasApi: true,
    rating: 4.6,
    link: "https://grammarly.com"
  },
  {
    id: 44,
    name: "Veo",
    slug: "veo",
    category: "video",
    icon: "🎞️",
    logo: "veo",
    description: {
      vi: "Mô hình tạo video của Google với chất lượng cao và chuyển động tự nhiên.",
      en: "Google's video generation model with high-quality output and natural motion."
    },
    badge: "hot",
    hasApi: true,
    rating: 4.7,
    link: "https://deepmind.google/technologies/veo"
  },
  {
    id: 45,
    name: "Kling AI",
    category: "video",
    icon: "🎬",
    logo: "kling",
    description: {
      vi: "Công cụ tạo video từ văn bản hoặc hình ảnh với hiệu ứng chân thực.",
      en: "An AI video generator that turns text or images into polished videos."
    },
    badge: "free",
    hasApi: true,
    rating: 4.6,
    link: "https://klingai.com"
  },
  {
    id: 46,
    name: "Hailuo AI",
    category: "video",
    icon: "🎥",
    logo: "hailuo",
    description: {
      vi: "Công cụ chuyển văn bản thành video nhanh cho nội dung ngắn và quảng cáo.",
      en: "A fast text-to-video tool for short-form content and promotional clips."
    },
    badge: "free",
    hasApi: true,
    rating: 4.4,
    link: "https://hailuoai.video"
  },
  {
    id: 47,
    name: "Luma AI",
    category: "video",
    icon: "🌀",
    logo: "luma",
    description: {
      vi: "Nền tảng tạo video 3D và video AI có chất lượng điện ảnh.",
      en: "An AI platform for 3D scenes and cinematic-quality video creation."
    },
    badge: "free",
    hasApi: true,
    rating: 4.5,
    link: "https://lumalabs.ai"
  },
  {
    id: 48,
    name: "Synthesia",
    slug: "synthesia",
    category: "video",
    icon: "🧑‍💼",
    logo: "synthesia",
    description: {
      vi: "Công cụ tạo video với người dẫn chương trình ảo, phù hợp cho đào tạo và giới thiệu sản phẩm.",
      en: "An AI avatar video tool often used for training, demos, and product explainers."
    },
    badge: "pro",
    hasApi: true,
    rating: 4.6,
    link: "https://synthesia.io"
  },
  {
    id: 49,
    name: "HeyGen",
    slug: "heygen",
    category: "video",
    icon: "🗣️",
    logo: "heygen",
    description: {
      vi: "Nền tảng tạo video AI với nhân vật ảo, lồng tiếng tự động và hỗ trợ nhiều ngôn ngữ.",
      en: "An AI video platform with avatars, voiceover generation, and multilingual support."
    },
    badge: "pro",
    hasApi: true,
    rating: 4.6,
    link: "https://heygen.com"
  },
  {
    id: 50,
    name: "InVideo AI",
    category: "video",
    icon: "🎦",
    logo: "invideo",
    description: {
      vi: "Công cụ tạo video hoàn chỉnh từ văn bản, tự động thêm hình, giọng đọc và nhạc nền.",
      en: "An AI video creator that turns text into full videos with visuals, voice, and music."
    },
    badge: "free",
    hasApi: false,
    rating: 4.4,
    link: "https://invideo.io"
  },
  {
    id: 51,
    name: "CapCut AI",
    slug: "capcut-ai",
    category: "video",
    icon: "✂️",
    logo: "capcut",
    description: {
      vi: "Bộ tính năng AI cho tạo video tự động, phụ đề, xóa nền và chỉnh sửa nhanh.",
      en: "CapCut's AI feature set for automatic video editing, captions, and background removal."
    },
    badge: "free",
    hasApi: false,
    rating: 4.7,
    link: "https://capcut.com"
  }
];

aiTools.push(...additionalAiTools);

const moreAiTools = [
  [101, "Ernie Bot", "chat", "🐻", "ernie", "Chatbot AI của Baidu, hỗ trợ trò chuyện và tìm kiếm bằng tiếng Trung.", "Baidu's AI chatbot for conversation and search, strong in Chinese language.", "free", 4.2, "https://yiyan.baidu.com", true],
  [102, "ChatGLM", "chat", "🀄", "chatglm", "Mô hình trò chuyện AI mã nguồn mở của Zhipu AI.", "Zhipu AI's open-source conversational AI model.", "free", 4.2, "https://chatglm.cn", true],
  [103, "Command R", "chat", "🎯", "cohere", "Mô hình trò chuyện AI của Cohere, tối ưu cho doanh nghiệp và tìm kiếm dữ liệu.", "Cohere's chat model optimized for enterprise use and retrieval-augmented search.", "free", 4.3, "https://cohere.com", true],
  [104, "Pi", "chat", "🌸", "pi", "Trợ lý AI cá nhân hoá của Inflection AI, tập trung vào trò chuyện thân thiện.", "Inflection AI's personal assistant focused on friendly, supportive conversation.", "free", 4.2, "https://pi.ai", false],
  [105, "iFlytek Spark", "chat", "⚡", "iflytek", "Trợ lý AI đa năng của iFlytek, mạnh về nhận diện giọng nói tiếng Trung.", "iFlytek's multi-purpose AI assistant, strong in Chinese speech recognition.", "free", 4.1, "https://xinghuo.xfyun.cn", true],
  [106, "SenseChat", "chat", "👁️", "sensetime", "Chatbot AI của SenseTime hỗ trợ trò chuyện và xử lý ngôn ngữ tự nhiên.", "SenseTime's chatbot for conversation and natural language processing.", "free", 4.0, "https://www.sensetime.com", true],
  [107, "Replika", "chat", "💗", "replika", "Người bạn đồng hành AI để trò chuyện và hỗ trợ tinh thần hằng ngày.", "An AI companion for daily conversation and emotional support.", "free", 4.1, "https://replika.com", false],
  [108, "Yi-Large", "chat", "🌟", "yi", "Mô hình ngôn ngữ lớn của 01.AI, hỗ trợ trò chuyện đa ngôn ngữ.", "01.AI's large language model supporting multilingual conversation.", "free", 4.2, "https://01.ai", true],
  [109, "Groq Chat", "chat", "🚀", "groq", "Nền tảng trò chuyện AI chạy trên chip LPU tốc độ cao của Groq.", "AI chat platform powered by Groq's high-speed LPU chips.", "free", 4.4, "https://groq.com", true],
  [110, "Le Chat", "chat", "🐦", "mistralchat", "Ứng dụng trò chuyện AI chính thức của Mistral.", "Mistral's official AI chat application.", "free", 4.3, "https://chat.mistral.ai", true],
  [111, "AI21 Jamba", "chat", "🔷", "ai21", "Mô hình ngôn ngữ của AI21 Labs, hỗ trợ trò chuyện và xử lý văn bản dài.", "AI21 Labs' language model for chat and long-document processing.", "free", 4.1, "https://www.ai21.com", true],
  [112, "Coze", "chat", "🧵", "coze", "Nền tảng xây dựng chatbot AI tuỳ chỉnh của ByteDance.", "ByteDance's platform for building custom AI chatbots.", "free", 4.2, "https://www.coze.com", true],
  [113, "MiniMax Chat", "chat", "🅜", "minimax", "Trợ lý trò chuyện AI đa năng của MiniMax.", "MiniMax's all-purpose AI chat assistant.", "free", 4.1, "https://www.minimax.io", true],
  [114, "Doubao", "chat", "🫘", "doubao", "Trợ lý AI trò chuyện phổ biến của ByteDance tại Trung Quốc.", "ByteDance's popular AI chat assistant in China.", "free", 4.2, "https://www.doubao.com", true],
  [115, "Rufus", "chat", "🛍️", "amazonrufus", "Trợ lý mua sắm AI của Amazon, gợi ý và so sánh sản phẩm.", "Amazon's AI shopping assistant for product suggestions and comparisons.", "free", 4.0, "https://www.amazon.com", false],
  [116, "WPS AI", "chat", "📄", "wps", "Trợ lý AI tích hợp trong bộ ứng dụng văn phòng WPS.", "AI assistant built into the WPS Office suite.", "free", 4.1, "https://www.wps.com", false],
  [117, "Baichuan AI", "chat", "🌊", "baichuan", "Mô hình trò chuyện AI tiếng Trung của Baichuan Intelligence.", "Baichuan Intelligence's Chinese-language AI chat model.", "free", 4.0, "https://www.baichuan-ai.com", true],
  [118, "StepFun", "chat", "🪜", "stepfun", "Trợ lý AI đa phương thức của StepFun hỗ trợ trò chuyện và hình ảnh.", "StepFun's multimodal AI assistant for chat and images.", "free", 4.0, "https://www.stepfun.com", true],
  [119, "Playground AI", "image", "🎪", "playground", "Nền tảng tạo ảnh AI với nhiều mô hình và công cụ chỉnh sửa miễn phí.", "AI image platform with multiple models and free editing tools.", "free", 4.4, "https://playgroundai.com", true],
  [120, "NightCafe", "image", "☕", "nightcafe", "Cộng đồng tạo ảnh AI với nhiều phong cách nghệ thuật.", "AI art-generation community with a wide range of styles.", "free", 4.3, "https://creator.nightcafe.studio", false],
  [121, "Artbreeder", "image", "🧬", "artbreeder", "Công cụ pha trộn và tiến hoá hình ảnh AI để tạo nhân vật và phong cảnh.", "AI tool for blending and evolving images into characters and landscapes.", "free", 4.2, "https://www.artbreeder.com", false],
  [122, "DeepAI", "image", "🔷", "deepai", "Bộ công cụ AI tạo ảnh và xử lý hình ảnh trực tuyến miễn phí.", "Free online suite of AI image generation and processing tools.", "free", 4.1, "https://deepai.org", true],
  [123, "Bing Image Creator", "image", "🪁", "bingimage", "Công cụ tạo ảnh AI của Microsoft tích hợp trong Bing.", "Microsoft's AI image generator built into Bing.", "free", 4.3, "https://www.bing.com/images/create", false],
  [124, "Deep Dream Generator", "image", "🌀", "deepdream", "Công cụ tạo ảnh nghệ thuật AI theo phong cách mơ mộng, siêu thực.", "AI art generator for dreamlike, surreal visual styles.", "free", 4.0, "https://deepdreamgenerator.com", false],
  [125, "Craiyon", "image", "🖍️", "craiyon", "Công cụ tạo ảnh AI đơn giản, miễn phí, dễ sử dụng.", "A simple, free, easy-to-use AI image generator.", "free", 4.0, "https://www.craiyon.com", false],
  [126, "Pixlr", "image", "🖌️", "pixlr", "Trình chỉnh sửa ảnh trực tuyến có tích hợp công cụ AI.", "Online photo editor with built-in AI tools.", "free", 4.3, "https://pixlr.com", false],
  [127, "Fotor AI", "image", "🖼️", "fotor", "Công cụ chỉnh sửa và tạo ảnh AI cho thiết kế và marketing.", "AI photo editing and generation tool for design and marketing.", "free", 4.2, "https://www.fotor.com", false],
  [128, "Photoshop Generative Fill", "image", "🩹", "photoshop", "Tính năng AI của Photoshop giúp thêm, xoá và mở rộng nội dung ảnh.", "Photoshop's AI feature for adding, removing, and extending image content.", "pro", 4.6, "https://www.adobe.com/products/photoshop.html", false],
  [129, "Getimg.ai", "image", "🎡", "getimg", "Nền tảng tạo và chỉnh sửa ảnh AI với nhiều mô hình khác nhau.", "AI image generation and editing platform with multiple model options.", "free", 4.3, "https://getimg.ai", true],
  [130, "Civitai", "image", "🗿", "civitai", "Cộng đồng chia sẻ mô hình và tạo ảnh AI dựa trên Stable Diffusion.", "Community for sharing models and generating AI art with Stable Diffusion.", "free", 4.3, "https://civitai.com", true],
  [131, "Magnific AI", "image", "🔍", "magnific", "Công cụ nâng cấp và tăng chi tiết ảnh AI chất lượng cao.", "AI tool for high-quality image upscaling and detail enhancement.", "pro", 4.6, "https://magnific.ai", false],
  [132, "Clipdrop", "image", "📎", "clipdrop", "Bộ công cụ AI của Stability AI để chỉnh sửa và tạo ảnh nhanh.", "Stability AI's toolkit for fast AI image editing and generation.", "free", 4.3, "https://clipdrop.co", true],
  [133, "Vheer", "image", "🦌", "vheer", "Công cụ tạo ảnh AI miễn phí, không cần đăng ký.", "Free AI image generator that requires no sign-up.", "free", 4.0, "https://vheer.com", false],
  [134, "PixAI", "image", "🎴", "pixai", "Nền tảng tạo ảnh AI chuyên về phong cách anime.", "AI image platform specializing in anime-style art.", "free", 4.2, "https://pixai.art", true],
  [135, "Pictory", "video", "🎦", "pictory", "Chuyển văn bản và bài viết thành video ngắn tự động bằng AI.", "Automatically turns text and articles into short videos with AI.", "free", 4.4, "https://pictory.ai", true],
  [136, "Elai.io", "video", "🧑‍🏫", "elai", "Tạo video có avatar AI thuyết trình từ văn bản.", "Creates AI-avatar presenter videos from text.", "free", 4.3, "https://elai.io", true],
  [137, "D-ID", "video", "🪪", "did", "Công cụ tạo video avatar AI nói chuyện từ ảnh chân dung.", "AI tool that creates talking-avatar videos from a portrait photo.", "free", 4.4, "https://www.d-id.com", true],
  [138, "Colossyan", "video", "🎓", "colossyan", "Nền tảng tạo video đào tạo với avatar AI đa ngôn ngữ.", "Training-video platform with multilingual AI avatars.", "free", 4.3, "https://www.colossyan.com", false],
  [139, "Steve AI", "video", "🎨", "steveai", "Tạo video hoạt hình và video thực từ văn bản bằng AI.", "Creates animated and live-action videos from text using AI.", "free", 4.2, "https://www.steve.ai", false],
  [140, "Rephrase.ai", "video", "🗣️", "rephrase", "Tạo video cá nhân hoá với avatar AI cho marketing và đào tạo.", "Creates personalized AI-avatar videos for marketing and training.", "pro", 4.2, "https://www.rephrase.ai", false],
  [141, "Synthesys", "video", "🎭", "synthesys", "Bộ công cụ AI tạo giọng nói và video avatar chuyên nghiệp.", "AI toolkit for professional voiceovers and avatar videos.", "pro", 4.2, "https://synthesys.io", false],
  [142, "Fliki", "video", "🐣", "fliki", "Biến bài viết thành video có giọng đọc AI tự nhiên.", "Turns blog posts into videos with natural AI voiceovers.", "free", 4.4, "https://fliki.ai", false],
  [143, "Renderforest", "video", "🌲", "renderforest", "Nền tảng tạo video, logo và website hỗ trợ AI.", "AI-assisted platform for creating videos, logos, and websites.", "free", 4.2, "https://www.renderforest.com", false],
  [144, "Movio", "video", "🎦", "movio", "Tạo video avatar AI đa ngôn ngữ cho nội dung doanh nghiệp.", "Multilingual AI-avatar video creation for business content.", "free", 4.1, "https://www.movio.la", false],
  [145, "Wisecut", "video", "✂️", "wisecut", "Tự động dựng video và thêm nhạc nền bằng AI.", "Automatically edits video and adds background music using AI.", "free", 4.2, "https://wisecut.video", false],
  [146, "Vizard", "video", "🪄", "vizard", "Cắt video dài thành clip ngắn viral bằng AI.", "Uses AI to turn long videos into viral short clips.", "free", 4.3, "https://vizard.ai", false],
  [147, "Topaz Video AI", "video", "🔬", "topaz", "Nâng cấp độ phân giải và chất lượng video bằng AI.", "AI-powered video upscaling and quality enhancement.", "pro", 4.5, "https://www.topazlabs.com/topaz-video-ai", false],
  [148, "Clipchamp", "video", "🎬", "clipchamp", "Trình chỉnh sửa video của Microsoft có công cụ AI hỗ trợ.", "Microsoft's video editor with built-in AI-assisted tools.", "free", 4.3, "https://clipchamp.com", false],
  [149, "Simplified Video", "video", "🧊", "simplified", "Công cụ tạo và chỉnh sửa video AI cho nội dung mạng xã hội.", "AI video creation and editing tool for social media content.", "free", 4.1, "https://simplified.com", false],
  [150, "Deepbrain AI", "video", "🧠", "deepbrain", "Tạo video avatar AI chân thực cho thuyết trình và đào tạo.", "Creates realistic AI-avatar videos for presentations and training.", "pro", 4.3, "https://www.deepbrain.io", true],
  [151, "Codex CLI", "code", "🖥️", "codexcli", "Công cụ dòng lệnh AI của OpenAI để lập trình ngay trên terminal.", "OpenAI's command-line AI coding tool for the terminal.", "free", 4.4, "https://openai.com/codex", false],
  [152, "Cline", "code", "🤖", "cline", "Trợ lý lập trình AI mã nguồn mở chạy trực tiếp trong VS Code.", "Open-source AI coding agent that runs directly inside VS Code.", "free", 4.4, "https://cline.bot", false],
  [153, "Warp AI", "code", "🌐", "warp", "Terminal thông minh tích hợp AI hỗ trợ gõ lệnh và gỡ lỗi.", "A smart terminal with built-in AI for commands and debugging.", "free", 4.4, "https://www.warp.dev", false],
  [154, "Blackbox AI", "code", "⬛", "blackbox", "Trợ lý lập trình AI hỗ trợ tìm kiếm và tạo mã nguồn.", "AI coding assistant for code search and generation.", "free", 4.2, "https://www.blackbox.ai", true],
  [155, "Mutable AI", "code", "🔧", "mutableai", "Công cụ AI giúp tăng tốc viết mã và tái cấu trúc codebase.", "AI tool that speeds up coding and codebase refactoring.", "free", 4.1, "https://mutable.ai", false],
  [156, "AskCodi", "code", "💡", "askcodi", "Trợ lý AI hỗ trợ viết mã, tài liệu và kiểm thử phần mềm.", "AI assistant for writing code, documentation, and tests.", "free", 4.0, "https://www.askcodi.com", false],
  [157, "Sweep AI", "code", "🧹", "sweep", "AI agent tự động sửa lỗi và tạo pull request trên GitHub.", "AI agent that automatically fixes bugs and opens GitHub pull requests.", "free", 4.1, "https://sweep.dev", false],
  [158, "Refact.ai", "code", "🔩", "refact", "Trợ lý lập trình AI mã nguồn mở hỗ trợ hoàn thành và tái cấu trúc mã.", "Open-source AI coding assistant for completion and refactoring.", "free", 4.1, "https://refact.ai", false],
  [159, "CodeRabbit", "code", "🐇", "coderabbit", "Công cụ AI tự động review mã nguồn trong pull request.", "AI tool that automatically reviews code in pull requests.", "free", 4.4, "https://www.coderabbit.ai", false],
  [160, "Qodo", "code", "🧪", "qodo", "Trợ lý AI tạo kiểm thử và review mã nguồn tự động.", "AI assistant for automated code testing and review.", "free", 4.3, "https://www.qodo.ai", false],
  [161, "Zed AI", "code", "⚡", "zed", "Trình soạn thảo mã nguồn tốc độ cao với trợ lý AI tích hợp.", "A high-performance code editor with a built-in AI assistant.", "free", 4.4, "https://zed.dev", false],
  [162, "Snyk DeepCode", "code", "🛡️", "snyk", "Công cụ AI quét lỗ hổng bảo mật trong mã nguồn.", "AI-powered tool for scanning security vulnerabilities in code.", "free", 4.3, "https://snyk.io", true],
  [163, "Magic.dev", "code", "✨", "magicdev", "AI agent lập trình tự động cho các tác vụ phần mềm phức tạp.", "Autonomous AI coding agent for complex software tasks.", "pro", 4.2, "https://magic.dev", false],
  [164, "Augment Code", "code", "🧭", "augment", "Trợ lý AI hiểu toàn bộ codebase để hỗ trợ lập trình nhóm.", "AI assistant with full-codebase context for team development.", "pro", 4.3, "https://www.augmentcode.com", false],
  [165, "CodeGeeX", "code", "🌉", "codegeex", "Trợ lý lập trình AI đa ngôn ngữ của Zhipu AI.", "Zhipu AI's multilingual AI coding assistant.", "free", 4.1, "https://codegeex.cn", true],
  [166, "Pear AI", "code", "🍐", "pearai", "Trình soạn thảo mã nguồn mở tích hợp AI cho lập trình viên.", "Open-source AI-powered code editor for developers.", "free", 4.0, "https://trypear.ai", false],
  [167, "Aide", "code", "🧩", "aide", "Trợ lý lập trình AI mã nguồn mở tích hợp trong IDE.", "Open-source AI coding assistant built into the IDE.", "free", 4.0, "https://aide.dev", false],
  [168, "Trae", "code", "🚴", "trae", "IDE tích hợp AI của ByteDance hỗ trợ lập trình viên.", "ByteDance's AI-powered IDE for developers.", "free", 4.2, "https://www.trae.ai", false],
  [169, "Coursera Coach", "study", "🎓", "coursera", "Trợ lý AI của Coursera hỗ trợ học tập và giải thích bài giảng.", "Coursera's AI assistant for learning support and lecture explanations.", "free", 4.2, "https://www.coursera.org", false],
  [170, "Chegg CheggMate", "study", "📗", "chegg", "Trợ lý học tập AI của Chegg hỗ trợ giải bài tập.", "Chegg's AI study assistant for homework help.", "pro", 4.0, "https://www.chegg.com", false],
  [171, "StudyFetch", "study", "📚", "studyfetch", "Nền tảng học tập AI tạo flashcard và hướng dẫn học cá nhân hoá.", "AI learning platform that creates flashcards and personalized study guides.", "free", 4.2, "https://www.studyfetch.com", false],
  [172, "Gradescope", "study", "✅", "gradescope", "Công cụ chấm bài và phản hồi tự động hỗ trợ AI cho giáo viên.", "AI-assisted grading and feedback tool for teachers.", "free", 4.2, "https://www.gradescope.com", false],
  [173, "Speechify", "study", "🔊", "speechify", "Chuyển văn bản thành giọng đọc AI tự nhiên để học và nghe tài liệu.", "Converts text into natural AI speech for studying and listening.", "free", 4.4, "https://speechify.com", true],
  [174, "Quillbot", "study", "✍️", "quillbot", "Công cụ AI diễn giải, tóm tắt và kiểm tra ngữ pháp văn bản.", "AI tool for paraphrasing, summarizing, and grammar checking.", "free", 4.4, "https://quillbot.com", false],
  [175, "Wordtune", "study", "🔤", "wordtune", "Trợ lý AI viết lại và cải thiện câu văn tự nhiên hơn.", "AI writing assistant that rewrites sentences to sound more natural.", "free", 4.3, "https://www.wordtune.com", false],
  [176, "Speak", "study", "🗨️", "speak", "Ứng dụng luyện nói ngoại ngữ với AI có phản hồi trực tiếp.", "Language-speaking practice app with real-time AI feedback.", "free", 4.4, "https://www.speak.com", false],
  [177, "Busuu", "study", "🐝", "busuu", "Ứng dụng học ngoại ngữ có tính năng AI hỗ trợ luyện tập.", "Language-learning app with AI-assisted practice features.", "free", 4.3, "https://www.busuu.com", false],
  [178, "Babbel", "study", "🦜", "babbel", "Ứng dụng học ngôn ngữ có bài học được cá nhân hoá bằng AI.", "Language-learning app with AI-personalized lessons.", "free", 4.3, "https://www.babbel.com", false],
  [179, "Cognii", "study", "🧠", "cognii", "Trợ lý AI đánh giá và phản hồi bài luận cho học sinh.", "AI assistant that evaluates and gives feedback on student essays.", "free", 4.0, "https://www.cognii.com", false],
  [180, "Squirrel AI", "study", "🐿️", "squirrelai", "Nền tảng học tập thích ứng bằng AI theo trình độ từng học sinh.", "Adaptive AI learning platform tailored to each student's level.", "free", 4.1, "https://squirrelai.com", false],
  [181, "Century Tech", "study", "🌆", "century", "Nền tảng học tập AI cá nhân hoá lộ trình cho từng học sinh.", "AI learning platform that personalizes each student's learning path.", "free", 4.1, "https://www.century.tech", false],
  [182, "Sana Labs", "study", "🎯", "sana", "Nền tảng học tập và đào tạo doanh nghiệp ứng dụng AI.", "AI-powered learning and corporate training platform.", "pro", 4.2, "https://sanalabs.com", false],
  [183, "Numerade", "study", "🔢", "numerade", "Nền tảng học tập AI giải thích bài tập khoa học và toán học từng bước.", "AI learning platform with step-by-step science and math explanations.", "free", 4.2, "https://www.numerade.com", false],
  [184, "CourseHero AI", "study", "🦸", "coursehero", "Trợ lý học tập AI của Course Hero hỗ trợ giải bài và ôn tập.", "Course Hero's AI study assistant for homework help and review.", "pro", 4.0, "https://www.coursehero.com", false],
  [185, "Wealthfront", "finance", "🌳", "wealthfront", "Dịch vụ đầu tư tự động sử dụng AI để quản lý danh mục.", "Automated investing service that uses AI to manage portfolios.", "free", 4.2, "https://www.wealthfront.com", false],
  [186, "Betterment", "finance", "📈", "betterment", "Nền tảng quản lý tài sản tự động với thuật toán AI.", "Automated wealth-management platform powered by AI algorithms.", "free", 4.2, "https://www.betterment.com", false],
  [187, "Cleo", "finance", "🐙", "cleo", "Trợ lý tài chính cá nhân AI giúp theo dõi chi tiêu qua trò chuyện.", "AI personal-finance assistant that tracks spending through chat.", "free", 4.1, "https://www.meetcleo.com", false],
  [188, "Copilot Money", "finance", "💰", "copilotmoney", "Ứng dụng quản lý tài chính cá nhân với phân loại chi tiêu bằng AI.", "Personal finance app that categorizes spending using AI.", "pro", 4.4, "https://copilot.money", false],
  [189, "Rogo AI", "finance", "🏦", "rogo", "Trợ lý AI dành cho nhà phân tích tài chính và ngân hàng đầu tư.", "AI assistant built for financial analysts and investment bankers.", "pro", 4.2, "https://rogo.ai", false],
  [190, "Hebbia", "finance", "🔎", "hebbia", "AI tìm kiếm và phân tích tài liệu tài chính phức tạp.", "AI for searching and analyzing complex financial documents.", "pro", 4.3, "https://www.hebbia.ai", false],
  [191, "Daloopa", "finance", "📊", "daloopa", "Nền tảng AI tự động hoá xây dựng mô hình tài chính từ báo cáo.", "AI platform that automates financial-model building from filings.", "pro", 4.1, "https://daloopa.com", true],
  [192, "Kensho", "finance", "🔮", "kensho", "Công cụ AI phân tích dữ liệu thị trường tài chính của S&P Global.", "S&P Global's AI tool for analyzing financial market data.", "pro", 4.2, "https://www.kensho.com", false],
  [193, "Arta Finance", "finance", "🏛️", "arta", "Nền tảng quản lý gia sản ứng dụng AI cho nhà đầu tư cá nhân.", "AI-powered wealth-management platform for individual investors.", "pro", 4.1, "https://arta.io", false],
  [194, "Composer", "finance", "🎼", "composer", "Nền tảng đầu tư tự động cho phép xây dựng chiến lược bằng AI.", "Automated investing platform for building strategies with AI.", "free", 4.1, "https://www.composer.trade", true],
  [195, "Wealthsimple", "finance", "🍁", "wealthsimple", "Nền tảng đầu tư và tài chính cá nhân có công cụ hỗ trợ AI.", "Investing and personal-finance platform with AI-assisted tools.", "free", 4.2, "https://www.wealthsimple.com", false],
  [196, "Origin Financial", "finance", "🧭", "origin", "Ứng dụng lập kế hoạch tài chính cá nhân hỗ trợ bởi AI.", "Personal financial-planning app supported by AI.", "pro", 4.1, "https://useorigin.com", false],
  [197, "Zest AI", "finance", "🍋", "zest", "Nền tảng AI chấm điểm tín dụng cho các tổ chức cho vay.", "AI credit-scoring platform for lending institutions.", "pro", 4.1, "https://www.zest.ai", false],
  [198, "Toggle AI", "finance", "🔀", "toggle", "Trợ lý AI phân tích thị trường tài chính cho nhà đầu tư.", "AI assistant for financial market analysis aimed at investors.", "pro", 4.1, "https://www.toggle.ai", false],
  [199, "Fintool", "finance", "🧾", "fintool", "AI hỗ trợ nhà đầu tư nghiên cứu báo cáo tài chính doanh nghiệp.", "AI that helps investors research corporate financial filings.", "pro", 4.2, "https://fintool.io", false],
  [200, "Canoe Intelligence", "finance", "🛶", "canoe", "Nền tảng AI tự động hoá xử lý tài liệu đầu tư thay thế.", "AI platform that automates alternative-investment document processing.", "pro", 4.1, "https://canoeintelligence.com", false],
].map(([id, name, category, icon, logo, vi, en, badge, rating, link, hasApi]) => ({
  id, name, category, icon, logo, description: { vi, en }, badge, rating, link, hasApi: !!hasApi
}));

aiTools.push(...moreAiTools);

const moreAiTools2 = [
  [201, "Rytr", "writing-content", "✍️", "rytr", "Công cụ AI viết nội dung nhanh cho blog, quảng cáo và mạng xã hội.", "AI writing tool for quickly drafting blogs, ads, and social posts.", "free", 4.3, "https://rytr.me", true],
  [202, "Sudowrite", "writing-content", "📖", "sudowrite", "Trợ lý AI dành riêng cho viết truyện và tiểu thuyết sáng tạo.", "AI writing assistant built specifically for fiction and storytelling.", "pro", 4.5, "https://www.sudowrite.com", false],
  [203, "Copysmith", "writing-content", "🏷️", "copysmith", "Nền tảng AI tạo nội dung quảng cáo và mô tả sản phẩm hàng loạt.", "AI platform for generating ad copy and product descriptions at scale.", "pro", 4.2, "https://copysmith.ai", true],
  [204, "Anyword", "writing-content", "🎯", "anyword", "Công cụ AI viết nội dung marketing kèm dự đoán hiệu suất.", "AI marketing copywriter with predictive performance scoring.", "pro", 4.3, "https://anyword.com", true],
  [205, "ContentShake AI", "writing-content", "📢", "contentshake", "Công cụ của Semrush giúp lên ý tưởng và viết bài SEO bằng AI.", "Semrush's AI tool for ideating and writing SEO content.", "pro", 4.3, "https://www.semrush.com/contentshake/", false],
  [206, "Frase", "writing-content", "🔎", "frase", "Nền tảng AI nghiên cứu từ khoá và viết bài chuẩn SEO.", "AI platform for keyword research and SEO content briefs.", "pro", 4.3, "https://www.frase.io", true],
  [207, "Textio", "writing-content", "📝", "textio", "Công cụ AI cải thiện văn phong tuyển dụng và giao tiếp nội bộ.", "AI tool that improves the tone of hiring and internal communications.", "pro", 4.2, "https://www.textio.com", false],
  [208, "INK", "writing-content", "🖋️", "ink", "Trình soạn thảo AI tối ưu nội dung vừa hay vừa chuẩn SEO.", "AI editor that optimizes content for both readability and SEO.", "free", 4.2, "https://inkforall.com", false],
  [209, "Scalenut", "writing-content", "🌱", "scalenut", "Nền tảng AI lập kế hoạch, nghiên cứu và viết nội dung SEO.", "AI platform for content planning, research, and SEO writing.", "pro", 4.3, "https://www.scalenut.com", true],
  [210, "Hypotenuse AI", "writing-content", "📐", "hypotenuse", "AI viết mô tả sản phẩm và nội dung thương mại điện tử hàng loạt.", "AI for bulk-generating product descriptions and e-commerce content.", "pro", 4.2, "https://www.hypotenuse.ai", true],
  [211, "Murf AI", "voice", "🎤", "murf", "Tạo giọng đọc AI chuyên nghiệp cho video, thuyết trình và podcast.", "Studio-quality AI voiceovers for videos, presentations, and podcasts.", "free", 4.5, "https://murf.ai", true],
  [212, "Play.ht", "voice", "▶️", "playht", "Chuyển văn bản thành giọng nói AI tự nhiên với nhiều ngôn ngữ.", "Converts text into natural AI voices across many languages.", "free", 4.4, "https://play.ht", true],
  [213, "WellSaid Labs", "voice", "🗣️", "wellsaid", "Nền tảng giọng đọc AI chất lượng cao cho doanh nghiệp.", "Enterprise-grade AI voice platform for professional narration.", "pro", 4.4, "https://wellsaidlabs.com", true],
  [214, "Resemble AI", "voice", "🧬", "resemble", "Nhân bản và tạo giọng nói AI theo thời gian thực.", "Real-time AI voice cloning and generation.", "pro", 4.3, "https://www.resemble.ai", true],
  [215, "Voicemod", "voice", "🎚️", "voicemod", "Đổi giọng nói AI theo thời gian thực cho stream và gọi thoại.", "Real-time AI voice changer for streaming and voice calls.", "free", 4.3, "https://www.voicemod.net", false],
  [216, "LOVO AI", "voice", "💫", "lovo", "Nền tảng tạo giọng nói và video AI cho nội dung đa ngôn ngữ.", "AI voice and video generation platform for multilingual content.", "free", 4.3, "https://lovo.ai", true],
  [217, "Podcastle", "voice", "🏰", "podcastle", "Studio thu âm và chỉnh sửa podcast bằng AI trên trình duyệt.", "Browser-based AI recording and editing studio for podcasts.", "free", 4.4, "https://podcastle.ai", false],
  [218, "Respeecher", "voice", "🔁", "respeecher", "Công nghệ chuyển đổi giọng nói AI cho phim và game.", "AI voice-conversion technology used in film and games.", "pro", 4.2, "https://www.respeecher.com", true],
  [219, "AIVA", "audio-music", "🎼", "aiva", "AI sáng tác nhạc nền và nhạc phim theo nhiều thể loại.", "AI composer for soundtracks and background music across genres.", "free", 4.4, "https://www.aiva.ai", true],
  [220, "Soundraw", "audio-music", "🎶", "soundraw", "Tạo nhạc nền AI không bản quyền theo tâm trạng và độ dài.", "AI-generated royalty-free music customized by mood and length.", "free", 4.3, "https://soundraw.io", false],
  [221, "Boomy", "audio-music", "💥", "boomy", "Tạo bài hát AI nhanh chóng và phát hành lên các nền tảng nhạc.", "Quickly create AI songs and release them to streaming platforms.", "free", 4.2, "https://boomy.com", false],
  [222, "Mubert", "audio-music", "🌊", "mubert", "Nhạc nền AI theo thời gian thực cho nội dung và ứng dụng.", "Real-time AI-generated background music for content and apps.", "free", 4.2, "https://mubert.com", true],
  [223, "LANDR", "audio-music", "🎚️", "landr", "Mastering nhạc tự động bằng AI cho nghệ sĩ độc lập.", "AI-powered automatic music mastering for independent artists.", "free", 4.3, "https://www.landr.com", false],
  [224, "Endel", "audio-music", "🌙", "endel", "Âm thanh AI cá nhân hoá giúp tập trung, thư giãn và ngủ ngon.", "Personalized AI soundscapes for focus, relaxation, and sleep.", "free", 4.4, "https://endel.io", false],
  [225, "Beatoven.ai", "audio-music", "🎹", "beatoven", "Sáng tác nhạc nền AI theo cảm xúc cho video và podcast.", "AI music composition matched to the mood of videos and podcasts.", "free", 4.2, "https://www.beatoven.ai", true],
  [226, "Soundful", "audio-music", "🔊", "soundful", "Tạo bản nhạc AI không giới hạn bản quyền theo thể loại có sẵn.", "Generate royalty-free AI tracks from ready-made genre templates.", "free", 4.1, "https://soundful.com", true],
  [227, "Motion", "productivity", "📅", "motion", "AI tự động sắp xếp lịch làm việc và ưu tiên công việc hằng ngày.", "AI that automatically schedules your day and prioritizes tasks.", "pro", 4.3, "https://www.usemotion.com", false],
  [228, "Reclaim AI", "productivity", "⏱️", "reclaim", "Trợ lý AI tự động lên lịch họp và bảo vệ thời gian tập trung.", "AI assistant that auto-schedules meetings and protects focus time.", "free", 4.4, "https://reclaim.ai", true],
  [229, "Clockwise", "productivity", "🕰️", "clockwise", "Tối ưu hoá lịch làm việc nhóm bằng AI để giảm họp không cần thiết.", "AI that optimizes team calendars to cut down unnecessary meetings.", "free", 4.3, "https://www.getclockwise.com", false],
  [230, "Taskade", "productivity", "✅", "taskade", "Không gian làm việc AI kết hợp ghi chú, checklist và AI agent.", "AI workspace combining notes, checklists, and AI agents.", "free", 4.3, "https://www.taskade.com", true],
  [231, "Mem", "productivity", "🗂️", "mem", "Ứng dụng ghi chú AI tự động tổ chức và tìm kiếm thông tin.", "AI note-taking app that automatically organizes and surfaces info.", "pro", 4.2, "https://mem.ai", false],
  [232, "ClickUp AI", "productivity", "📌", "clickup", "Tính năng AI tích hợp trong ClickUp giúp viết, tóm tắt và lên kế hoạch.", "AI features built into ClickUp for writing, summarizing, and planning.", "free", 4.4, "https://clickup.com/ai", false],
  [233, "Todoist AI", "productivity", "☑️", "todoist", "Ứng dụng quản lý công việc có gợi ý và sắp xếp hỗ trợ bởi AI.", "Task-management app with AI-assisted suggestions and organization.", "free", 4.4, "https://www.todoist.com", false],
  [234, "Superhuman", "productivity", "📧", "superhuman", "Ứng dụng email tốc độ cao với AI viết và tóm tắt thư nhanh.", "High-speed email app with AI-assisted writing and summarization.", "pro", 4.5, "https://superhuman.com", false],
  [235, "Fireflies.ai", "productivity", "🧚", "fireflies", "Ghi âm, chép lời và tóm tắt cuộc họp tự động bằng AI.", "Automatically records, transcribes, and summarizes meetings with AI.", "free", 4.5, "https://fireflies.ai", true],
  [236, "Krisp", "productivity", "🎧", "krisp", "Khử tiếng ồn AI theo thời gian thực cho các cuộc gọi.", "Real-time AI noise cancellation for calls and meetings.", "free", 4.5, "https://krisp.ai", false],
  [237, "Semantic Scholar", "research", "🔬", "semanticscholar", "Công cụ tìm kiếm học thuật AI giúp khám phá và tóm tắt bài báo.", "AI-powered academic search engine for discovering and summarizing papers.", "free", 4.5, "https://www.semanticscholar.org", true],
  [238, "Litmaps", "research", "🗺️", "litmaps", "Trực quan hoá và theo dõi mạng lưới trích dẫn nghiên cứu bằng AI.", "AI tool that visualizes and tracks citation networks in research.", "free", 4.3, "https://www.litmaps.com", false],
  [239, "Paperpile", "research", "📑", "paperpile", "Quản lý tài liệu tham khảo với hỗ trợ AI cho nhà nghiên cứu.", "Reference-management tool with AI support for researchers.", "pro", 4.3, "https://paperpile.com", false],
  [240, "SciSpace", "research", "🧪", "scispace", "AI giải thích và hỏi đáp trực tiếp trên các bài báo khoa học.", "AI that explains and answers questions directly within scientific papers.", "free", 4.4, "https://typeset.io", true],
  [241, "ResearchRabbit", "research", "🐇", "researchrabbit", "Công cụ AI khám phá bài báo liên quan qua bản đồ trích dẫn.", "AI tool for discovering related papers through citation maps.", "free", 4.3, "https://www.researchrabbit.ai", false],
  [242, "Iris.ai", "research", "👁️", "iris", "Nền tảng AI rà soát và tổng hợp tài liệu khoa học quy mô lớn.", "AI platform for large-scale scientific literature screening and synthesis.", "pro", 4.1, "https://iris.ai", false],
  [243, "Connected Papers", "research", "🕸️", "connectedpapers", "Trực quan hoá đồ thị các bài báo liên quan đến một nghiên cứu.", "Visualizes a graph of papers related to a given research topic.", "free", 4.4, "https://www.connectedpapers.com", false],
  [244, "Undermind", "research", "🔦", "undermind", "AI tìm kiếm nghiên cứu chuyên sâu, hiểu ngữ cảnh câu hỏi phức tạp.", "AI research search engine that understands complex, in-depth queries.", "pro", 4.2, "https://undermind.ai", false],
  [245, "AdCreative.ai", "marketing", "🖼️", "adcreative", "AI tạo mẫu quảng cáo và banner chuyển đổi cao hàng loạt.", "AI that generates high-converting ad creatives and banners at scale.", "pro", 4.3, "https://www.adcreative.ai", true],
  [246, "Surfer SEO", "marketing", "🏄", "surferseo", "Công cụ AI tối ưu nội dung theo dữ liệu SEO thời gian thực.", "AI tool that optimizes content using real-time SEO data.", "pro", 4.4, "https://surferseo.com", true],
  [247, "MarketMuse", "marketing", "🐭", "marketmuse", "Nền tảng AI lập chiến lược nội dung và phân tích khoảng trống SEO.", "AI platform for content strategy and SEO content-gap analysis.", "pro", 4.2, "https://www.marketmuse.com", false],
  [248, "Persado", "marketing", "💌", "persado", "AI tạo và tối ưu ngôn từ marketing dựa trên cảm xúc khách hàng.", "AI that generates and optimizes marketing language based on emotion.", "pro", 4.1, "https://www.persado.com", false],
  [249, "Jacquard", "marketing", "🧶", "jacquard", "Nền tảng AI tạo ngôn từ marketing được cá nhân hoá (trước là Phrasee).", "AI platform for personalized marketing language, formerly Phrasee.", "pro", 4.1, "https://www.jacquard.com", false],
  [250, "Smartly.io", "marketing", "📱", "smartly", "Tự động hoá và tối ưu quảng cáo mạng xã hội bằng AI.", "AI-driven automation and optimization for social media advertising.", "pro", 4.2, "https://www.smartly.io", true],
  [251, "Albert.ai", "marketing", "🤖", "albert", "AI tự vận hành chiến dịch quảng cáo đa kênh cho doanh nghiệp.", "Autonomous AI that runs cross-channel ad campaigns for businesses.", "pro", 4.0, "https://albert.ai", false],
  [252, "Klaviyo AI", "marketing", "📬", "klaviyo", "Tính năng AI trong Klaviyo hỗ trợ email và SMS marketing.", "AI features in Klaviyo for email and SMS marketing.", "free", 4.4, "https://www.klaviyo.com", true],
  [253, "Relume", "design", "🧱", "relume", "AI tạo sitemap và wireframe trang web nhanh chóng.", "AI that quickly generates website sitemaps and wireframes.", "free", 4.3, "https://www.relume.io", false],
  [254, "Framer AI", "design", "🖥️", "framer", "AI tạo trang web hoàn chỉnh từ mô tả ngôn ngữ tự nhiên.", "AI that builds complete websites from natural-language prompts.", "free", 4.5, "https://www.framer.com/ai", false],
  [255, "Looka", "design", "🏷️", "looka", "AI tạo logo và bộ nhận diện thương hiệu nhanh chóng.", "AI that creates logos and brand identity kits quickly.", "free", 4.3, "https://looka.com", false],
  [256, "Designs.ai", "design", "🎨", "designsai", "Bộ công cụ AI tạo logo, video và thiết kế đồ hoạ đa năng.", "All-in-one AI toolkit for logos, videos, and graphic design.", "free", 4.2, "https://designs.ai", false],
  [257, "Visily", "design", "📐", "visily", "AI chuyển ảnh chụp màn hình hoặc phác thảo thành wireframe UI.", "AI that turns screenshots or sketches into UI wireframes.", "free", 4.3, "https://www.visily.ai", false],
  [258, "Khroma", "design", "🌈", "khroma", "AI học sở thích màu sắc để gợi ý bảng phối màu thiết kế.", "AI that learns your color taste to suggest design palettes.", "free", 4.2, "https://www.khroma.co", false],
  [259, "Autodraw", "design", "✏️", "autodraw", "Công cụ AI của Google gợi ý hình vẽ hoàn chỉnh từ nét vẽ tay.", "Google's AI tool that turns rough sketches into polished drawings.", "free", 4.1, "https://www.autodraw.com", false],
  [260, "Uizard", "design", "📲", "uizard", "AI biến phác thảo và mô tả thành thiết kế giao diện ứng dụng.", "AI that turns sketches and text prompts into app UI designs.", "free", 4.3, "https://uizard.io", false],
  [261, "Zapier AI", "work-tools", "⚡", "zapier", "AI giúp xây dựng quy trình tự động hoá kết nối hàng nghìn ứng dụng.", "AI that helps build automated workflows across thousands of apps.", "free", 4.5, "https://zapier.com/ai", true],
  [262, "Airtable AI", "work-tools", "🗃️", "airtable", "Tính năng AI trong Airtable hỗ trợ tóm tắt và phân loại dữ liệu.", "AI features in Airtable for summarizing and categorizing data.", "pro", 4.3, "https://www.airtable.com/ai", true],
  [263, "Beautiful.ai", "work-tools", "🖼️", "beautifulai", "AI tự động thiết kế slide thuyết trình chuyên nghiệp.", "AI that automatically designs professional presentation slides.", "free", 4.4, "https://www.beautiful.ai", false],
  [264, "Tome", "work-tools", "📖", "tome", "AI tạo bài thuyết trình và tài liệu kể chuyện trực quan.", "AI that generates visual, story-driven presentations and docs.", "free", 4.3, "https://tome.app", false],
  [265, "Slidesgo AI", "work-tools", "🎞️", "slidesgo", "AI tạo slide thuyết trình nhanh từ chủ đề hoặc tài liệu có sẵn.", "AI that quickly builds slide decks from a topic or existing document.", "free", 4.2, "https://slidesgo.com", false],
  [266, "Slack AI", "work-tools", "💬", "slack", "Tính năng AI trong Slack tóm tắt kênh và tìm kiếm thông tin nhanh.", "AI features in Slack for channel summaries and fast information search.", "pro", 4.3, "https://slack.com/features/ai", false],
  [267, "Coda AI", "work-tools", "📃", "coda", "AI tích hợp trong Coda hỗ trợ viết, tóm tắt và tạo bảng dữ liệu.", "AI built into Coda for writing, summarizing, and building tables.", "free", 4.3, "https://coda.io/product/ai", false],
  [268, "Fellow", "work-tools", "🤝", "fellow", "Trợ lý AI ghi chú và theo dõi hành động sau cuộc họp.", "AI assistant for meeting notes and follow-up action tracking.", "free", 4.3, "https://fellow.app", false],
  [269, "DeepL", "translation", "🌍", "deepl", "Công cụ dịch thuật AI nổi tiếng vì độ chính xác và tự nhiên.", "AI translation tool renowned for its accuracy and natural phrasing.", "free", 4.7, "https://www.deepl.com", true],
  [270, "Papago", "translation", "🦜", "papago", "Ứng dụng dịch AI của Naver, mạnh về tiếng Hàn và châu Á.", "Naver's AI translation app, strong in Korean and Asian languages.", "free", 4.4, "https://papago.naver.com", false],
  [271, "Reverso", "translation", "🔄", "reverso", "Dịch thuật AI kèm ví dụ ngữ cảnh và chia động từ.", "AI translation with contextual examples and verb conjugation.", "free", 4.3, "https://www.reverso.net", false],
  [272, "Lilt", "translation", "🌐", "lilt", "Nền tảng dịch thuật AI cho doanh nghiệp kết hợp con người hiệu đính.", "Enterprise AI translation platform combined with human review.", "pro", 4.2, "https://lilt.com", true],
  [273, "Smartling", "translation", "🗺️", "smartling", "Nền tảng quản lý bản địa hoá và dịch thuật AI cho doanh nghiệp.", "Enterprise AI-powered translation and localization management platform.", "pro", 4.2, "https://www.smartling.com", true],
  [274, "Systran", "translation", "🔤", "systran", "Công nghệ dịch máy AI lâu đời cho doanh nghiệp và chính phủ.", "Long-established AI machine-translation technology for enterprise and government.", "pro", 4.1, "https://www.systransoft.com", true],
  [275, "Adobe Acrobat AI Assistant", "pdf-docs", "📕", "acrobat", "Trợ lý AI trong Acrobat giúp tóm tắt và hỏi đáp trên file PDF.", "Acrobat's AI assistant for summarizing and asking questions about PDFs.", "pro", 4.4, "https://www.adobe.com/acrobat/generative-ai-pdf.html", false],
  [276, "PDF.ai", "pdf-docs", "📄", "pdfai", "Trò chuyện trực tiếp với nội dung tài liệu PDF bằng AI.", "Chat directly with the content of your PDF documents using AI.", "free", 4.3, "https://pdf.ai", false],
  [277, "ChatPDF", "pdf-docs", "💬", "chatpdf", "Tải PDF lên và đặt câu hỏi để AI trả lời dựa trên nội dung.", "Upload a PDF and ask questions answered based on its content.", "free", 4.3, "https://www.chatpdf.com", false],
  [278, "Humata", "pdf-docs", "🧠", "humata", "AI đọc và trả lời câu hỏi trên hàng trăm trang tài liệu cùng lúc.", "AI that reads and answers questions across hundreds of document pages.", "free", 4.2, "https://www.humata.ai", false],
  [279, "DocuSign AI", "pdf-docs", "✍️", "docusign", "Tính năng AI trong DocuSign giúp phân tích và tóm tắt hợp đồng.", "AI features in DocuSign for analyzing and summarizing contracts.", "pro", 4.3, "https://www.docusign.com", false],
  [280, "Nanonets", "pdf-docs", "🧾", "nanonets", "AI trích xuất dữ liệu tự động từ hoá đơn và tài liệu quét.", "AI for automatically extracting data from invoices and scanned documents.", "pro", 4.2, "https://nanonets.com", true],
  [281, "UiPath", "automation", "🦾", "uipath", "Nền tảng tự động hoá quy trình bằng robot (RPA) tích hợp AI.", "Robotic process automation (RPA) platform with built-in AI.", "pro", 4.4, "https://www.uipath.com", true],
  [282, "Make", "automation", "🧩", "make", "Nền tảng tự động hoá kéo-thả kết nối ứng dụng và AI.", "Drag-and-drop automation platform connecting apps and AI.", "free", 4.5, "https://www.make.com", true],
  [283, "n8n", "automation", "🔗", "n8n", "Công cụ tự động hoá mã nguồn mở có thể tự lưu trữ và tuỳ biến.", "Open-source, self-hostable automation and workflow tool.", "free", 4.5, "https://n8n.io", true],
  [284, "Automation Anywhere", "automation", "🏭", "automationanywhere", "Nền tảng RPA doanh nghiệp tích hợp AI Agent để tự động hoá quy trình.", "Enterprise RPA platform with AI agents for process automation.", "pro", 4.2, "https://www.automationanywhere.com", true],
  [285, "Bardeen", "automation", "🐦", "bardeen", "Tự động hoá tác vụ trình duyệt và quy trình lặp lại bằng AI.", "AI that automates browser tasks and repetitive workflows.", "free", 4.3, "https://www.bardeen.ai", false],
  [286, "Relay.app", "automation", "🚦", "relay", "Nền tảng tự động hoá kết hợp AI agent và sự phê duyệt của con người.", "Automation platform combining AI agents with human-in-the-loop approval.", "free", 4.2, "https://relay.app", false],
  [287, "AutoGPT", "agents", "🌀", "autogpt", "Dự án AI agent mã nguồn mở tự thực hiện chuỗi tác vụ phức tạp.", "Open-source AI agent project that autonomously executes complex task chains.", "free", 4.0, "https://agpt.co", false],
  [288, "AgentGPT", "agents", "🕹️", "agentgpt", "Nền tảng web cho phép triển khai AI agent tự động ngay trên trình duyệt.", "Web platform for deploying autonomous AI agents right in the browser.", "free", 4.0, "https://agentgpt.reworkd.ai", false],
  [289, "CrewAI", "agents", "👥", "crewai", "Khung phát triển giúp nhiều AI agent phối hợp hoàn thành nhiệm vụ.", "Framework for orchestrating multiple AI agents to collaborate on tasks.", "free", 4.2, "https://www.crewai.com", true],
  [290, "Imbue", "agents", "🧭", "imbue", "AI agent tập trung vào lập luận đáng tin cậy cho tác vụ lập trình.", "AI agent focused on reliable reasoning for coding tasks.", "pro", 4.1, "https://imbue.com", false],
  [291, "MultiOn", "agents", "🌐", "multion", "AI agent có thể thay bạn thao tác và hoàn thành việc trên trình duyệt.", "AI agent that can browse and complete tasks on the web on your behalf.", "pro", 4.0, "https://www.multion.ai", true],
  [292, "Manus", "agents", "🦾", "manus", "AI agent tự động lập kế hoạch và thực thi các tác vụ đa bước.", "AI agent that autonomously plans and executes multi-step tasks.", "pro", 4.2, "https://manus.im", false],
  [293, "Genspark", "agents", "✨", "genspark", "AI agent tổng hợp thông tin và tạo trang kết quả tuỳ chỉnh.", "AI agent that aggregates information into custom result pages.", "free", 4.1, "https://www.genspark.ai", false],
  [294, "Cognosys", "agents", "🧠", "cognosys", "AI agent tự động nghiên cứu và thực hiện chuỗi tác vụ theo mục tiêu.", "AI agent that autonomously researches and executes goal-driven task chains.", "free", 4.0, "https://cognosys.ai", false],
  [295, "Gong", "business", "📣", "gong", "Nền tảng AI phân tích cuộc gọi bán hàng để cải thiện doanh số.", "AI platform that analyzes sales calls to improve revenue outcomes.", "pro", 4.4, "https://www.gong.io", false],
  [296, "Chorus by ZoomInfo", "business", "🎵", "chorus", "AI ghi âm và phân tích cuộc trò chuyện bán hàng, trước là Chorus.ai.", "AI conversation-intelligence tool for sales calls, formerly Chorus.ai.", "pro", 4.2, "https://www.zoominfo.com/products/chorus", false],
  [297, "Clari", "business", "📈", "clari", "Nền tảng AI dự báo doanh số và quản lý quy trình bán hàng.", "AI platform for revenue forecasting and sales pipeline management.", "pro", 4.3, "https://www.clari.com", false],
  [298, "People.ai", "business", "👤", "peopleai", "AI tự động thu thập dữ liệu bán hàng để tối ưu hiệu suất đội ngũ.", "AI that automatically captures sales data to optimize team performance.", "pro", 4.1, "https://people.ai", false],
  [299, "Salesloft AI", "business", "🚀", "salesloft", "Tính năng AI trong Salesloft hỗ trợ tương tác và chốt đơn bán hàng.", "AI features in Salesloft that support sales engagement and deal closing.", "pro", 4.2, "https://www.salesloft.com", false],
  [300, "BenchSci", "science", "🧬", "benchsci", "AI hỗ trợ nhà khoa học thiết kế thí nghiệm sinh học nhanh hơn.", "AI that helps scientists design biological experiments faster.", "pro", 4.2, "https://www.benchsci.com", false],
].map(([id, name, category, icon, logo, vi, en, badge, rating, link, hasApi]) => ({
  id, name, category, icon, logo, description: { vi, en }, badge, rating, link, hasApi: !!hasApi
}));

aiTools.push(...moreAiTools2);

const moreAiTools3 = [
  [301, "AlphaFold", "science", "🧬", "alphafold", "Hệ thống AI của DeepMind dự đoán cấu trúc protein với độ chính xác cao.", "DeepMind's AI system that predicts protein structures with high accuracy.", "free", 4.7, "https://deepmind.google/technologies/alphafold/", false],
  [302, "Insilico Medicine", "science", "💊", "insilico", "Nền tảng AI khám phá và thiết kế thuốc mới rút ngắn thời gian nghiên cứu.", "AI platform for drug discovery and design that shortens research timelines.", "pro", 4.3, "https://insilico.com", false],
  [303, "Recursion Pharmaceuticals", "science", "🔬", "recursion", "Công ty công nghệ sinh học dùng AI để mô phỏng và khám phá thuốc.", "Biotech company using AI to simulate biology and discover new drugs.", "pro", 4.2, "https://www.recursion.com", false],
  [304, "Iambic Therapeutics", "science", "⚗️", "iambic", "AI thiết kế phân tử thuốc mới bằng mô hình sinh tổng hợp.", "AI that designs novel drug molecules using generative chemistry models.", "pro", 4.1, "https://www.iambic.ai", false],
  [305, "Isomorphic Labs", "science", "🧫", "isomorphic", "Công ty của Alphabet ứng dụng AI để tăng tốc khám phá thuốc.", "Alphabet company applying AI to accelerate drug discovery.", "pro", 4.2, "https://www.isomorphiclabs.com", false],
  [306, "Owkin", "science", "🏥", "owkin", "AI phân tích dữ liệu y sinh để hỗ trợ nghiên cứu ung thư và thuốc mới.", "AI that analyzes biomedical data to support cancer and drug research.", "pro", 4.1, "https://www.owkin.com", false],
  [307, "PathAI", "science", "🩺", "pathai", "AI hỗ trợ bác sĩ giải phẫu bệnh chẩn đoán chính xác hơn từ mẫu mô.", "AI that helps pathologists diagnose tissue samples more accurately.", "pro", 4.2, "https://www.pathai.com", false],
  [308, "Enveda Biosciences", "science", "🌿", "enveda", "AI khai thác hợp chất tự nhiên để tìm ra thuốc điều trị mới.", "AI that mines natural compounds to discover new therapeutic drugs.", "pro", 4.0, "https://www.envedabio.com", false],
  [309, "Ginkgo Bioworks", "science", "🧪", "ginkgo", "Nền tảng thiết kế sinh học tế bào ứng dụng AI cho công nghệ sinh học.", "AI-driven cell-programming platform for biotechnology applications.", "pro", 4.0, "https://www.ginkgobioworks.com", false],
  [310, "Absci", "science", "🧷", "absci", "AI thiết kế kháng thể và protein trị liệu thế hệ mới.", "AI that designs next-generation antibody and protein therapeutics.", "pro", 4.0, "https://www.absci.com", false],
  [311, "Genesis Therapeutics", "science", "🧭", "genesis", "Nền tảng AI thiết kế thuốc phân tử nhỏ cho các bệnh khó điều trị.", "AI platform for designing small-molecule drugs for hard-to-treat diseases.", "pro", 4.0, "https://www.genesistherapeutics.ai", false],
  [312, "Cradle Bio", "science", "🧫", "cradle", "AI thiết kế và tối ưu protein cho nghiên cứu công nghệ sinh học.", "AI for designing and optimizing proteins for biotech research.", "pro", 4.0, "https://www.cradle.bio", false],
  [313, "Xaira Therapeutics", "science", "🧬", "xaira", "Công ty công nghệ sinh học dùng AI tạo sinh để phát triển thuốc mới.", "Biotech company using generative AI to develop new medicines.", "pro", 3.9, "https://www.xaira.com", false],
  [314, "Terray Therapeutics", "science", "⚛️", "terray", "Nền tảng AI kết hợp hoá học tổ hợp để tăng tốc khám phá thuốc.", "AI platform combining combinatorial chemistry to speed up drug discovery.", "pro", 3.9, "https://terraytx.com", false],
  [315, "Salesforce Agentforce", "business", "☁️", "agentforce", "Nền tảng AI agent của Salesforce tự động hoá quy trình kinh doanh.", "Salesforce's AI-agent platform for automating business workflows.", "pro", 4.2, "https://www.salesforce.com/agentforce/", false],
  [316, "Zendesk AI", "business", "🎧", "zendesk", "Tính năng AI trong Zendesk giúp tự động trả lời và phân loại yêu cầu hỗ trợ.", "AI features in Zendesk that auto-answer and triage support tickets.", "pro", 4.2, "https://www.zendesk.com/ai/", false],
  [317, "Freshworks Freddy AI", "business", "🐦", "freshworks", "Trợ lý AI của Freshworks hỗ trợ chăm sóc khách hàng và bán hàng.", "Freshworks' AI assistant for customer service and sales teams.", "pro", 4.1, "https://www.freshworks.com/freddy-ai/", false],
  [318, "Intercom Fin", "business", "💬", "intercomfin", "Chatbot AI của Intercom tự động giải quyết yêu cầu hỗ trợ khách hàng.", "Intercom's AI chatbot that automatically resolves customer support requests.", "pro", 4.3, "https://www.intercom.com/fin", false],
  [319, "Chargebee AI", "business", "💳", "chargebee", "Tính năng AI trong Chargebee hỗ trợ quản lý doanh thu định kỳ.", "AI features in Chargebee that help manage recurring revenue operations.", "pro", 4.0, "https://www.chargebee.com", false],
  [320, "Pipedrive AI", "business", "📇", "pipedrive", "Trợ lý AI trong Pipedrive gợi ý hành động để chốt giao dịch nhanh hơn.", "Pipedrive's AI assistant that suggests actions to close deals faster.", "pro", 4.2, "https://www.pipedrive.com", false],
  [321, "Zoho Zia", "business", "🐘", "zoho", "Trợ lý AI của Zoho hỗ trợ phân tích dữ liệu và tự động hoá công việc.", "Zoho's AI assistant for data analysis and workflow automation.", "free", 4.1, "https://www.zoho.com/zia/", false],
  [322, "monday.com AI", "business", "📅", "monday", "Tính năng AI trong monday.com giúp tóm tắt và tự động hoá dự án.", "AI features in monday.com for summarizing and automating projects.", "free", 4.3, "https://monday.com", false],
  [323, "SAP Joule", "business", "🎵", "sapjoule", "Trợ lý AI của SAP tích hợp trong hệ thống ERP doanh nghiệp.", "SAP's AI copilot built into enterprise ERP systems.", "pro", 4.0, "https://www.sap.com/products/artificial-intelligence/joule.html", false],
  [324, "Oracle AI Agents", "business", "🔺", "oracle", "Bộ AI agent của Oracle tự động hoá quy trình tài chính và nhân sự.", "Oracle's AI agents that automate finance and HR processes.", "pro", 4.0, "https://www.oracle.com/artificial-intelligence/", false],
  [325, "Workday AI", "business", "🗓️", "workday", "Tính năng AI trong Workday hỗ trợ quản lý nhân sự và tài chính.", "AI features in Workday that support HR and finance management.", "pro", 4.1, "https://www.workday.com/en-us/products/artificial-intelligence.html", false],
  [326, "ServiceNow Now Assist", "business", "🛎️", "servicenow", "AI của ServiceNow tự động hoá quy trình IT và dịch vụ doanh nghiệp.", "ServiceNow's AI that automates IT and enterprise service workflows.", "pro", 4.1, "https://www.servicenow.com/products/now-assist.html", false],
  [327, "Klarna AI Assistant", "business", "🛒", "klarna", "Trợ lý AI của Klarna xử lý hàng triệu yêu cầu chăm sóc khách hàng.", "Klarna's AI assistant that handles millions of customer service chats.", "free", 4.0, "https://www.klarna.com", false],
  [328, "Ada", "business", "🅰️", "ada", "Nền tảng AI agent tự động hoá chăm sóc khách hàng cho doanh nghiệp.", "AI-agent platform that automates customer service for businesses.", "pro", 4.1, "https://www.ada.cx", false],
  [329, "Google Translate", "translation", "🔤", "googletranslate", "Dịch vụ dịch thuật AI miễn phí phổ biến nhất của Google.", "Google's widely used free AI-powered translation service.", "free", 4.5, "https://translate.google.com", true],
  [330, "Microsoft Translator", "translation", "🪟", "mstranslator", "Dịch vụ dịch thuật AI của Microsoft tích hợp trong Office và Edge.", "Microsoft's AI translation service built into Office and Edge.", "free", 4.3, "https://www.microsoft.com/translator", true],
  [331, "Yandex Translate", "translation", "🌐", "yandex", "Công cụ dịch AI của Yandex mạnh về tiếng Nga và Đông Âu.", "Yandex's AI translation tool, strong for Russian and Eastern European languages.", "free", 4.2, "https://translate.yandex.com", true],
  [332, "iTranslate", "translation", "📱", "itranslate", "Ứng dụng dịch AI di động hỗ trợ giọng nói và hội thoại trực tiếp.", "Mobile AI translation app with voice and live conversation support.", "free", 4.3, "https://www.itranslate.com", false],
  [333, "TextUnited", "translation", "🧾", "textunited", "Nền tảng quản lý dịch thuật AI cho tài liệu và phần mềm doanh nghiệp.", "AI translation-management platform for enterprise docs and software.", "pro", 4.0, "https://www.textunited.com", true],
  [334, "Unbabel", "translation", "🗨️", "unbabel", "Dịch thuật AI kết hợp con người cho chăm sóc khách hàng đa ngôn ngữ.", "AI translation combined with human review for multilingual customer support.", "pro", 4.1, "https://unbabel.com", true],
  [335, "Ask Your PDF", "pdf-docs", "❓", "askyourpdf", "Trò chuyện và tìm kiếm thông tin nhanh trong tài liệu PDF bằng AI.", "AI chat tool for quickly finding information inside PDF documents.", "free", 4.1, "https://askyourpdf.com", false],
  [336, "UPDF AI", "pdf-docs", "📘", "updf", "Trình chỉnh sửa PDF tích hợp AI để tóm tắt và hỏi đáp tài liệu.", "PDF editor with built-in AI for summarizing and querying documents.", "free", 4.2, "https://updf.com", false],
  [337, "Sejda AI", "pdf-docs", "✂️", "sejda", "Công cụ chỉnh sửa PDF trực tuyến có hỗ trợ AI để xử lý tài liệu nhanh.", "Online PDF editor with AI support for fast document processing.", "free", 4.1, "https://www.sejda.com", false],
  [338, "PDFgear AI", "pdf-docs", "⚙️", "pdfgear", "Bộ công cụ PDF miễn phí tích hợp chatbot AI để hỏi đáp tài liệu.", "Free PDF toolkit with a built-in AI chatbot for document Q&A.", "free", 4.0, "https://www.pdfgear.com", false],
  [339, "Docsumo", "pdf-docs", "📊", "docsumo", "AI trích xuất dữ liệu có cấu trúc từ tài liệu và biểu mẫu doanh nghiệp.", "AI that extracts structured data from enterprise documents and forms.", "pro", 4.1, "https://www.docsumo.com", true],
  [340, "Rossum", "pdf-docs", "🧮", "rossum", "Nền tảng AI tự động hoá xử lý hoá đơn và chứng từ đầu vào.", "AI platform that automates invoice and document data capture.", "pro", 4.1, "https://rossum.ai", true],
  [341, "Pipedream", "automation", "🌊", "pipedream", "Nền tảng tự động hoá quy trình cho lập trình viên với AI hỗ trợ.", "Developer-focused workflow automation platform with AI assistance.", "free", 4.4, "https://pipedream.com", true],
  [342, "Workato", "automation", "🔧", "workato", "Nền tảng tự động hoá doanh nghiệp tích hợp AI để kết nối ứng dụng.", "Enterprise automation platform with AI for connecting business apps.", "pro", 4.3, "https://www.workato.com", true],
  [343, "Tray.ai", "automation", "🪁", "tray", "Nền tảng tự động hoá quy trình có AI agent dành cho doanh nghiệp.", "Workflow automation platform with AI agents built for enterprises.", "pro", 4.2, "https://tray.ai", true],
  [344, "Robocorp", "automation", "🤖", "robocorp", "Nền tảng tự động hoá quy trình mã nguồn mở kết hợp AI cho lập trình viên.", "Open-source process-automation platform with AI for developers.", "free", 4.1, "https://robocorp.com", true],
  [345, "Camunda", "automation", "🧱", "camunda", "Nền tảng điều phối quy trình nghiệp vụ tích hợp AI cho doanh nghiệp.", "Business-process orchestration platform with AI for enterprises.", "pro", 4.1, "https://camunda.com", true],
  [346, "Gumloop", "automation", "💧", "gumloop", "Công cụ xây dựng quy trình tự động hoá AI bằng kéo-thả không cần code.", "No-code, drag-and-drop AI workflow-automation builder.", "free", 4.2, "https://www.gumloop.com", false],
  [347, "Scholarcy", "research", "📇", "scholarcy", "AI tóm tắt bài báo khoa học thành các điểm chính dễ đọc.", "AI that summarizes academic papers into easy-to-read key points.", "free", 4.2, "https://www.scholarcy.com", true],
  [348, "Exa", "research", "🔎", "exa", "Công cụ tìm kiếm AI được xây dựng riêng cho các ứng dụng và agent.", "AI search engine built specifically for applications and agents.", "free", 4.3, "https://exa.ai", true],
  [349, "STORM", "research", "⛈️", "storm", "Công cụ AI của Stanford tự động nghiên cứu và viết bài tổng hợp.", "Stanford's AI tool that automatically researches and drafts articles.", "free", 4.1, "https://storm.genie.stanford.edu", false],
  [350, "Prophy", "research", "🧭", "prophy", "AI gợi ý bài báo và chuyên gia phù hợp dựa trên nội dung nghiên cứu.", "AI that recommends relevant papers and experts based on research content.", "free", 4.0, "https://www.prophy.ai", false],
  [351, "Silatus", "research", "📚", "silatus", "AI tự động nghiên cứu và tạo báo cáo dài từ nhiều nguồn tài liệu.", "AI that automatically researches and drafts long reports from many sources.", "pro", 4.0, "https://silatus.com", false],
  [352, "OpenRead", "research", "📖", "openread", "Nền tảng AI đọc, chú thích và tóm tắt tài liệu nghiên cứu khoa học.", "AI platform for reading, annotating, and summarizing scientific papers.", "free", 4.0, "https://www.openread.academy", false],
  [353, "Writer", "marketing", "🖋️", "writer", "Nền tảng AI tạo nội dung doanh nghiệp đảm bảo đúng văn phong thương hiệu.", "Enterprise AI content platform that keeps writing on-brand.", "pro", 4.3, "https://writer.com", true],
  [354, "Omneky", "marketing", "🎯", "omneky", "AI tạo và tối ưu quảng cáo sáng tạo hàng loạt cho từng nền tảng.", "AI that generates and optimizes creative ads at scale per platform.", "pro", 4.0, "https://www.omneky.com", false],
  [355, "Pencil", "marketing", "✏️", "pencil", "AI tạo và kiểm tra hiệu suất quảng cáo trước khi chạy chiến dịch.", "AI that generates and predicts ad performance before campaigns launch.", "pro", 4.1, "https://www.pencil.ai", false],
  [356, "Madgicx", "marketing", "🪄", "madgicx", "Nền tảng AI tối ưu hoá quảng cáo Facebook và Google Ads.", "AI platform for optimizing Facebook and Google Ads campaigns.", "pro", 4.2, "https://madgicx.com", true],
  [357, "Skai", "marketing", "⛵", "skai", "Nền tảng quản lý quảng cáo đa kênh ứng dụng AI cho doanh nghiệp.", "AI-powered omnichannel advertising management platform for enterprises.", "pro", 4.1, "https://skai.io", true],
  [358, "Typeface", "marketing", "🅰️", "typeface", "AI tạo nội dung tiếp thị đa phương tiện đúng bản sắc thương hiệu.", "AI that generates on-brand marketing content across media formats.", "pro", 4.1, "https://www.typeface.ai", false],
  [359, "Vectorizer.AI", "design", "📐", "vectorizerai", "AI chuyển đổi ảnh bitmap thành đồ hoạ vector chất lượng cao.", "AI that converts bitmap images into high-quality vector graphics.", "free", 4.3, "https://vectorizer.ai", true],
  [360, "Kittl", "design", "🎨", "kittl", "Nền tảng thiết kế đồ hoạ có AI hỗ trợ tạo mẫu nhanh chóng.", "Graphic-design platform with AI support for quick template creation.", "free", 4.3, "https://www.kittl.com", false],
  [361, "Flair AI", "design", "📸", "flair", "AI tạo ảnh sản phẩm chuyên nghiệp cho thương hiệu và thương mại điện tử.", "AI that generates professional product photography for brands and e-commerce.", "pro", 4.2, "https://flair.ai", false],
  [362, "Booth AI", "design", "🛍️", "booth", "AI tạo ảnh sản phẩm và nền chụp studio ảo cho bán hàng online.", "AI that creates virtual studio product photography for online sellers.", "free", 4.1, "https://www.trybooth.com", false],
  [363, "PhotoDirector AI", "design", "🖼️", "photodirector", "Trình chỉnh sửa ảnh của CyberLink tích hợp nhiều công cụ AI.", "CyberLink's photo editor packed with AI-powered editing tools.", "free", 4.2, "https://www.cyberlink.com/products/photodirector", false],
  [364, "Pebblely", "design", "🪨", "pebblely", "AI tạo phông nền sản phẩm sáng tạo cho ảnh chụp thương mại.", "AI that generates creative product backgrounds for commercial photos.", "free", 4.1, "https://pebblely.com", false],
  [365, "Miro AI", "work-tools", "🖇️", "miro", "Tính năng AI trong Miro hỗ trợ brainstorm và tổng hợp bảng trắng.", "AI features in Miro that support brainstorming and whiteboard synthesis.", "free", 4.3, "https://miro.com/ai/", false],
  [366, "Asana AI Studio", "work-tools", "📋", "asana", "AI trong Asana giúp tự động hoá quy trình và tóm tắt dự án.", "AI in Asana that automates workflows and summarizes projects.", "pro", 4.2, "https://asana.com/product/ai", false],
  [367, "Atlassian Intelligence (Trello)", "work-tools", "🗂️", "trello", "Tính năng AI của Atlassian tích hợp trong Trello để tóm tắt thẻ công việc.", "Atlassian's AI feature built into Trello for summarizing task cards.", "free", 4.1, "https://www.atlassian.com/software/artificial-intelligence", false],
  [368, "Atlassian Intelligence (Confluence)", "work-tools", "📘", "confluence", "AI trong Confluence hỗ trợ viết, tóm tắt và tìm kiếm tài liệu nhóm.", "AI in Confluence that helps write, summarize, and search team docs.", "pro", 4.2, "https://www.atlassian.com/software/confluence/ai", false],
  [369, "Wrike AI", "work-tools", "📈", "wrike", "Tính năng AI trong Wrike hỗ trợ lập kế hoạch và tự động hoá dự án.", "AI features in Wrike that support project planning and automation.", "pro", 4.1, "https://www.wrike.com", false],
  [370, "Height AI", "work-tools", "📏", "height", "Công cụ quản lý dự án tự vận hành với AI tự động cập nhật tiến độ.", "Self-managing project tool with AI that auto-updates task progress.", "free", 4.0, "https://height.app", false],
  [371, "Deepgram", "voice", "🎙️", "deepgram", "API AI chuyển giọng nói thành văn bản với tốc độ và độ chính xác cao.", "AI speech-to-text API built for speed and high accuracy.", "free", 4.4, "https://deepgram.com", true],
  [372, "AssemblyAI", "voice", "🧾", "assemblyai", "Nền tảng AI nhận diện giọng nói và phân tích âm thanh cho lập trình viên.", "AI speech-recognition and audio-intelligence platform for developers.", "free", 4.4, "https://www.assemblyai.com", true],
  [373, "Voice.ai", "voice", "🎭", "voiceai", "Công cụ đổi giọng nói AI theo thời gian thực cho stream và game.", "Real-time AI voice-changing tool for streaming and gaming.", "free", 4.1, "https://voice.ai", false],
  [374, "Altered Studio", "voice", "🎛️", "altered", "Nền tảng chuyển đổi và tạo giọng nói AI cho sáng tạo nội dung.", "AI voice-conversion and generation platform for content creators.", "pro", 4.1, "https://www.altered.ai", true],
  [375, "Coqui", "voice", "🐸", "coqui", "Công nghệ giọng nói AI mã nguồn mở cho tổng hợp và nhân bản giọng.", "Open-source AI voice technology for synthesis and voice cloning.", "free", 4.0, "https://coqui.ai", true],
  [376, "Cartesia", "voice", "🗺️", "cartesia", "Nền tảng AI tạo giọng nói thời gian thực với độ trễ cực thấp.", "AI voice platform generating real-time speech with ultra-low latency.", "pro", 4.2, "https://cartesia.ai", true],
  [377, "Loudly", "audio-music", "📣", "loudly", "AI tạo nhạc nền không giới hạn bản quyền cho nhà sáng tạo nội dung.", "AI that generates unlimited royalty-free music for content creators.", "free", 4.1, "https://www.loudly.com", true],
  [378, "Musicfy", "audio-music", "🎧", "musicfy", "AI tạo bài hát, nhân bản giọng ca sĩ và tách nhạc cụ.", "AI for song generation, singer voice cloning, and stem separation.", "free", 4.1, "https://musicfy.lol", false],
  [379, "Riffusion", "audio-music", "🎸", "riffusion", "AI tạo nhạc thử nghiệm bằng cách sinh ảnh phổ âm thanh.", "Experimental AI music generator that works by producing spectrogram images.", "free", 3.9, "https://www.riffusion.com", true],
  [380, "Rightsify Ozone", "audio-music", "🎵", "ozone", "Nền tảng AI tạo nhạc bản quyền cho phim, game và quảng cáo.", "AI music-generation platform for licensed film, game, and ad scores.", "pro", 4.0, "https://ozone.rightsify.com", true],
  [381, "Splash Pro", "audio-music", "💦", "splash", "AI sáng tác giai điệu và beat nhạc cho nhạc sĩ độc lập.", "AI that composes melodies and beats for independent musicians.", "free", 4.0, "https://splashmusic.com", false],
  [382, "Tuney", "audio-music", "🎹", "tuney", "AI tạo nhạc nền tuỳ chỉnh cho video và nội dung thương hiệu.", "AI that creates custom background music for video and brand content.", "free", 3.9, "https://www.tuney.ai", false],
  [383, "Fixie AI", "agents", "🔧", "fixie", "Nền tảng xây dựng AI agent tuỳ chỉnh kết nối API doanh nghiệp.", "Platform for building custom AI agents connected to business APIs.", "pro", 4.0, "https://www.fixie.ai", true],
  [384, "Relevance AI", "agents", "🧩", "relevanceai", "Nền tảng không cần code để xây dựng và triển khai AI agent.", "No-code platform for building and deploying AI agents.", "free", 4.2, "https://relevanceai.com", true],
  [385, "Superagent", "agents", "🦸", "superagent", "Khung mã nguồn mở giúp xây dựng AI agent cho ứng dụng doanh nghiệp.", "Open-source framework for building AI agents into business applications.", "free", 4.0, "https://superagent.sh", true],
  [386, "OpenAgents", "agents", "🌍", "openagents", "Nền tảng mã nguồn mở triển khai AI agent thực hiện tác vụ web.", "Open-source platform for deploying AI agents that carry out web tasks.", "free", 3.9, "https://github.com/xlang-ai/OpenAgents", false],
  [387, "AutoGen", "agents", "🔁", "autogen", "Khung của Microsoft giúp nhiều AI agent trò chuyện và hợp tác giải quyết việc.", "Microsoft's framework for multiple AI agents to converse and collaborate.", "free", 4.2, "https://microsoft.github.io/autogen/", true],
  [388, "Sema4.ai", "agents", "🚦", "sema4", "Nền tảng AI agent doanh nghiệp tự động hoá quy trình phức tạp.", "Enterprise AI-agent platform for automating complex business processes.", "pro", 4.0, "https://sema4.ai", true],
  [389, "Akiflow", "productivity", "🗒️", "akiflow", "Ứng dụng gom việc từ nhiều nguồn và lên lịch làm việc hỗ trợ AI.", "App that consolidates tasks from many sources with AI-assisted scheduling.", "pro", 4.2, "https://akiflow.com", false],
  [390, "Sunsama", "productivity", "🌞", "sunsama", "Công cụ lập kế hoạch ngày làm việc kết hợp AI và lịch của bạn.", "Daily planning tool that combines AI with your existing calendars.", "pro", 4.3, "https://sunsama.com", false],
  [391, "Amie", "productivity", "🦋", "amie", "Ứng dụng lịch và việc cần làm với trợ lý AI tích hợp.", "Calendar and to-do app with a built-in AI assistant.", "free", 4.2, "https://amie.so", false],
  [392, "Timely", "productivity", "⏳", "timely", "AI tự động theo dõi thời gian làm việc mà không cần bấm giờ thủ công.", "AI that automatically tracks work time without manual timers.", "pro", 4.2, "https://timely.com", true],
  [393, "Rewind AI", "productivity", "⏪", "rewind", "AI ghi nhớ mọi thứ bạn xem và nói để tìm lại thông tin sau này.", "AI that remembers everything you've seen and said so you can recall it later.", "free", 4.1, "https://www.rewind.ai", false],
  [394, "Rize", "productivity", "🎯", "rize", "AI phân tích thói quen làm việc để giúp tập trung và cân bằng hơn.", "AI that analyzes work habits to help you focus and stay balanced.", "pro", 4.1, "https://rize.io", false],
  [395, "Letterdrop", "writing-content", "📮", "letterdrop", "AI giúp đội ngũ B2B lên kế hoạch và xuất bản nội dung đều đặn.", "AI that helps B2B teams plan and publish content consistently.", "pro", 4.1, "https://www.letterdrop.com", false],
  [396, "Junia AI", "writing-content", "🧵", "junia", "Công cụ AI viết bài blog và nội dung SEO chuẩn dài.", "AI tool for writing long-form blog posts and SEO content.", "free", 4.1, "https://www.junia.ai", false],
  [397, "Copyleaks", "writing-content", "🕵️", "copyleaks", "AI phát hiện đạo văn và nội dung do AI tạo ra.", "AI that detects plagiarism and AI-generated content.", "free", 4.3, "https://copyleaks.com", true],
  [398, "Originality.ai", "writing-content", "🔏", "originality", "Công cụ kiểm tra nội dung AI và đạo văn cho nhà xuất bản.", "AI-content and plagiarism checker built for publishers.", "pro", 4.3, "https://originality.ai", true],
  [399, "Jenni AI", "writing-content", "🎓", "jenni", "Trợ lý AI viết luận văn học thuật với trích dẫn tự động.", "AI writing assistant for academic essays with automatic citations.", "free", 4.2, "https://jenni.ai", false],
  [400, "Wordvice AI", "writing-content", "📝", "wordvice", "AI kiểm tra ngữ pháp và cải thiện văn phong học thuật, chuyên nghiệp.", "AI grammar checker that polishes academic and professional writing.", "free", 4.1, "https://ai.wordvice.com", false],
].map(([id, name, category, icon, logo, vi, en, badge, rating, link, hasApi]) => ({
  id, name, category, icon, logo, description: { vi, en }, badge, rating, link, hasApi: !!hasApi
}));

aiTools.push(...moreAiTools3);

const moreAiTools4 = [
  [401, "Aya by Cohere", "chat", "🪶", "aya", "Mô hình AI đa ngôn ngữ mã nguồn mở của Cohere For AI.", "Cohere For AI's open, highly multilingual language model.", "free", 4.1, "https://cohere.com/research/aya", true],
  [402, "Reka AI", "chat", "🪨", "reka", "Trợ lý AI đa phương thức hiểu văn bản, hình ảnh và video.", "Multimodal AI assistant that understands text, images, and video.", "pro", 4.1, "https://www.reka.ai", true],
  [403, "Amazon Nova", "chat", "🛰️", "nova", "Dòng mô hình AI đa phương thức của Amazon trên nền tảng Bedrock.", "Amazon's family of multimodal AI models available via Bedrock.", "pro", 4.1, "https://aws.amazon.com/ai/generative-ai/nova/", true],
  [404, "Kagi Assistant", "chat", "🔑", "kagi", "Trợ lý AI tích hợp trong công cụ tìm kiếm trả phí Kagi.", "AI assistant built into the Kagi paid search engine.", "pro", 4.3, "https://kagi.com/assistant", false],
  [405, "GigaChat", "chat", "🐘", "gigachat", "Chatbot AI tiếng Nga của Sber hỗ trợ trò chuyện và tạo nội dung.", "Sber's Russian-language AI chatbot for conversation and content creation.", "free", 3.9, "https://developers.sber.ru/gigachat", true],
  [406, "Imagen (ImageFX)", "image", "🌅", "imagefx", "Công cụ tạo ảnh AI của Google dựa trên mô hình Imagen.", "Google's AI image generator powered by its Imagen model.", "free", 4.4, "https://aitestkitchen.withgoogle.com/tools/image-fx", false],
  [407, "Lexica", "image", "🔮", "lexica", "Công cụ tìm kiếm và tạo ảnh AI dựa trên Stable Diffusion.", "AI image search and generation tool built on Stable Diffusion.", "free", 4.2, "https://lexica.art", true],
  [408, "Scenario", "image", "🎮", "scenario", "AI tạo tài nguyên hình ảnh game theo phong cách riêng của studio.", "AI that generates game art assets matching a studio's unique style.", "pro", 4.2, "https://www.scenario.com", true],
  [409, "Prisma AI", "image", "🖌️", "prisma", "Ứng dụng biến ảnh thành tranh nghệ thuật bằng bộ lọc AI.", "App that transforms photos into artwork using AI-powered filters.", "free", 4.3, "https://prisma-ai.com", false],
  [410, "Wombo Dream", "image", "🎈", "wombo", "Ứng dụng di động tạo ảnh nghệ thuật AI nhanh chóng, vui nhộn.", "Mobile app for quickly generating fun AI artwork.", "free", 4.1, "https://www.wombo.ai", false],
  [411, "Haiper", "video", "🌀", "haiper", "AI tạo video ngắn chất lượng cao từ văn bản hoặc hình ảnh.", "AI that generates high-quality short videos from text or images.", "free", 4.1, "https://haiper.ai", false],
  [412, "Genmo", "video", "🎦", "genmo", "AI tạo video từ mô tả văn bản với mô hình mã nguồn mở.", "AI video generator built on an open-source text-to-video model.", "free", 4.0, "https://www.genmo.ai", false],
  [413, "Vidu", "video", "🀄", "vidu", "Mô hình tạo video AI của Shengshu Technology tại Trung Quốc.", "AI video-generation model from China's Shengshu Technology.", "free", 4.0, "https://www.vidu.studio", false],
  [414, "Higgsfield AI", "video", "🎬", "higgsfield", "AI tạo video có chuyển động máy quay điện ảnh chân thực.", "AI video generator with cinematic, realistic camera movement.", "pro", 4.1, "https://higgsfield.ai", false],
  [415, "Kaiber", "video", "🌌", "kaiber", "AI biến ảnh và nhạc thành video nghệ thuật đầy sáng tạo.", "AI that turns images and music into imaginative art videos.", "pro", 4.1, "https://kaiber.ai", false],
  [416, "Tabby", "code", "🐈", "tabby", "Trợ lý gợi ý mã nguồn AI tự lưu trữ, bảo mật dữ liệu riêng.", "Self-hosted AI code-completion assistant that keeps data private.", "free", 4.2, "https://www.tabbyml.com", false],
  [417, "Supermaven", "code", "⚡", "supermaven", "AI hoàn thành mã nguồn cực nhanh với ngữ cảnh cửa sổ lớn.", "Ultra-fast AI code completion with a large context window.", "free", 4.4, "https://supermaven.com", false],
  [418, "Melty", "code", "🍦", "melty", "Trình soạn thảo mã AI mã nguồn mở, thao tác như một lập trình viên thật.", "Open-source AI code editor that works like an actual engineer.", "free", 4.0, "https://melty.sh", false],
  [419, "Cosine Genie", "code", "🧞", "cosine", "AI agent lập trình tự động sửa lỗi và triển khai tính năng.", "AI coding agent that autonomously fixes bugs and ships features.", "pro", 4.1, "https://cosine.sh", false],
  [420, "OpenHands", "code", "🙌", "openhands", "Nền tảng AI agent lập trình mã nguồn mở, trước đây là OpenDevin.", "Open-source AI coding-agent platform, formerly known as OpenDevin.", "free", 4.1, "https://www.all-hands.dev", true],
  [421, "Toppr", "study", "🏅", "toppr", "Nền tảng học tập AI cá nhân hoá cho học sinh phổ thông tại Ấn Độ.", "AI-personalized learning platform for school students in India.", "free", 4.0, "https://www.toppr.com", false],
  [422, "Turnitin AI", "study", "🔍", "turnitin", "Công cụ phát hiện nội dung do AI viết dùng trong giáo dục.", "AI-writing detection tool widely used in education.", "pro", 4.1, "https://www.turnitin.com", false],
  [423, "StudySmarter", "study", "🎒", "studysmarter", "Ứng dụng học tập AI tạo flashcard và tóm tắt bài giảng tự động.", "AI study app that auto-generates flashcards and lecture summaries.", "free", 4.3, "https://www.studysmarter.com", false],
  [424, "Amira Learning", "study", "🐣", "amira", "AI lắng nghe học sinh đọc to để đánh giá và cải thiện kỹ năng đọc.", "AI that listens to students read aloud to assess and improve literacy.", "pro", 4.1, "https://www.amiralearning.com", false],
  [425, "Learnosity AI", "study", "📐", "learnosity", "Nền tảng AI hỗ trợ tạo đề thi và chấm điểm cho tổ chức giáo dục.", "AI platform that helps education providers build and grade assessments.", "pro", 4.0, "https://www.learnosity.com", true],
  [426, "Addepar", "finance", "🧮", "addepar", "Nền tảng phân tích danh mục đầu tư ứng dụng AI cho nhà quản lý tài sản.", "AI-driven portfolio-analytics platform for wealth managers.", "pro", 4.1, "https://www.addepar.com", false],
  [427, "Trill A.I.", "finance", "📉", "trill", "AI phân tích báo cáo tài chính và tin tức thị trường cho nhà đầu tư.", "AI that analyzes earnings calls and market news for investors.", "pro", 4.0, "https://www.trill.ai", false],
  [428, "Numerai", "finance", "🔢", "numerai", "Quỹ đầu cơ vận hành bằng mô hình AI do cộng đồng data scientist đóng góp.", "A hedge fund run on AI models contributed by a global data-science community.", "pro", 4.0, "https://numer.ai", true],
  [429, "Empower", "finance", "💪", "empower", "Ứng dụng quản lý tài chính cá nhân với công cụ lập kế hoạch hỗ trợ AI.", "Personal-finance app with AI-assisted planning tools.", "free", 4.2, "https://www.empower.com", false],
  [430, "Vise AI", "finance", "🧭", "vise", "Nền tảng đầu tư tự động ứng dụng AI cho cố vấn tài chính.", "AI-driven automated investing platform built for financial advisors.", "pro", 4.0, "https://vise.com", false],
  [431, "NeuronWriter", "writing-content", "🧠", "neuronwriter", "Công cụ AI phân tích đối thủ và tối ưu nội dung theo SEO.", "AI tool that analyzes competitors and optimizes content for SEO.", "pro", 4.2, "https://neuronwriter.com", false],
  [432, "Byword", "writing-content", "🔡", "byword", "AI tự động hoá viết và xuất bản hàng loạt bài viết SEO.", "AI that automates writing and publishing SEO articles at scale.", "pro", 4.1, "https://www.byword.ai", true],
  [433, "HyperWrite", "writing-content", "⚡", "hyperwrite", "Trợ lý viết AI cá nhân hoá giúp soạn thảo nhanh và chính xác.", "Personalized AI writing assistant for fast, accurate drafting.", "free", 4.2, "https://hyperwriteai.com", false],
  [434, "Lex", "writing-content", "✒️", "lex", "Trình soạn thảo văn bản AI tối giản dành cho nhà văn hiện đại.", "A minimalist AI-powered word processor built for modern writers.", "free", 4.2, "https://lex.page", false],
  [435, "Article Forge", "writing-content", "🏭", "articleforge", "AI tự động tạo bài viết dài chuẩn SEO chỉ từ một từ khoá.", "AI that automatically generates long-form SEO articles from a single keyword.", "pro", 3.9, "https://www.articleforge.com", true],
  [436, "Voicemaker", "voice", "🎚️", "voicemaker", "Công cụ chuyển văn bản thành giọng nói AI với nhiều giọng đọc.", "Text-to-speech AI tool with a wide range of voices.", "free", 4.1, "https://voicemaker.in", true],
  [437, "Papercup", "voice", "☕", "papercup", "AI lồng tiếng và dịch video sang nhiều ngôn ngữ tự động.", "AI that dubs and translates videos into multiple languages automatically.", "pro", 4.1, "https://www.papercup.com", true],
  [438, "iSpeech", "voice", "💬", "ispeech", "Nền tảng chuyển văn bản thành giọng nói AI cho ứng dụng và web.", "Text-to-speech AI platform for apps and websites.", "free", 3.9, "https://www.ispeech.org", true],
  [439, "Replica Studios", "voice", "🎬", "replicastudios", "Giọng nói AI diễn xuất dành cho game và phim hoạt hình.", "AI acting voices designed for games and animated films.", "pro", 4.1, "https://replicastudios.com", true],
  [440, "Voicify", "voice", "🎼", "voicify", "AI nhân bản giọng hát để tạo bản cover nhạc theo phong cách riêng.", "AI voice-cloning tool for creating custom singing cover tracks.", "free", 3.9, "https://voicify.ai", false],
  [441, "Amadeus Code", "audio-music", "🎻", "amadeuscode", "AI sáng tác giai điệu ca khúc bằng công nghệ học sâu.", "AI that composes song melodies using deep-learning technology.", "free", 4.0, "https://amadeuscode.com", false],
  [442, "Ecrett Music", "audio-music", "🎬", "ecrettmusic", "AI tạo nhạc nền theo cảnh quay và cảm xúc video của bạn.", "AI that composes background music matched to your video's scenes and mood.", "free", 4.1, "https://ecrettmusic.com", false],
  [443, "Soundverse", "audio-music", "🌀", "soundverse", "Nền tảng AI sáng tác và chỉnh sửa nhạc cho nhà sản xuất.", "AI music-composition and editing platform for producers.", "free", 4.0, "https://soundverse.ai", true],
  [444, "WavTool", "audio-music", "🎚️", "wavtool", "Studio sản xuất nhạc trên trình duyệt có trợ lý AI hỗ trợ.", "Browser-based music-production studio with an AI co-producer.", "free", 4.0, "https://wavtool.com", false],
  [445, "Musico", "audio-music", "🎵", "musico", "AI sáng tác nhạc nền thích ứng theo thời gian thực cho game.", "AI that composes adaptive, real-time background music for games.", "pro", 3.9, "https://www.musico.ai", false],
  [446, "Fyxer AI", "productivity", "📥", "fyxer", "AI tự động sắp xếp hộp thư và soạn thảo email nháp.", "AI that automatically organizes your inbox and drafts email replies.", "pro", 4.2, "https://fyxer.com", false],
  [447, "Shortwave", "productivity", "📨", "shortwave", "Ứng dụng email có AI tóm tắt và trả lời thư nhanh chóng.", "Email app with AI that summarizes and drafts quick replies.", "free", 4.2, "https://www.shortwave.com", false],
  [448, "Missive", "productivity", "📮", "missive", "Ứng dụng email và trò chuyện nhóm tích hợp trợ lý AI viết thư.", "Team email and chat app with a built-in AI writing assistant.", "pro", 4.2, "https://missiveapp.com", false],
  [449, "Magical", "productivity", "🪄", "magical", "Tiện ích AI tự động điền và chuyển dữ liệu giữa các ứng dụng.", "AI browser extension that auto-fills and moves data between apps.", "free", 4.2, "https://www.getmagical.com", false],
  [450, "Trevor AI", "productivity", "📆", "trevor", "AI giúp lên kế hoạch ngày làm việc bằng cách kéo-thả công việc vào lịch.", "AI that helps plan your day by dragging tasks straight onto your calendar.", "free", 4.1, "https://trevorai.com", false],
  [451, "Genei", "research", "🧾", "genei", "AI tóm tắt tài liệu nghiên cứu và hỗ trợ viết luận nhanh hơn.", "AI that summarizes research documents and speeds up essay writing.", "pro", 4.0, "https://www.genei.io", false],
  [452, "Laser AI", "research", "🔬", "laserai", "AI tăng tốc rà soát tài liệu cho các nghiên cứu tổng quan hệ thống.", "AI that speeds up literature screening for systematic reviews.", "pro", 4.1, "https://www.laser.ai", false],
  [453, "Paperguide", "research", "🧭", "paperguide", "Trợ lý AI đọc, tóm tắt và viết trích dẫn cho bài nghiên cứu.", "AI assistant for reading, summarizing, and citing research papers.", "free", 4.0, "https://paperguide.ai", false],
  [454, "Sourcely", "research", "📚", "sourcely", "AI tìm và trích dẫn nguồn học thuật phù hợp cho bài luận.", "AI that finds and cites relevant academic sources for essays.", "free", 4.0, "https://sourcely.net", false],
  [455, "Afforai", "research", "🗃️", "afforai", "AI tổ chức thư viện tài liệu và trả lời câu hỏi nghiên cứu.", "AI that organizes reference libraries and answers research questions.", "free", 4.0, "https://afforai.com", false],
  [456, "Brandwell", "marketing", "🏷️", "brandwell", "AI viết nội dung SEO dài kỳ, tối ưu theo bộ máy tìm kiếm.", "AI that writes long-form, search-optimized SEO content over time.", "pro", 4.1, "https://brandwell.ai", true],
  [457, "Postwise", "marketing", "🐦", "postwise", "AI viết và lên lịch bài đăng X (Twitter) để tăng tương tác.", "AI that writes and schedules X (Twitter) posts to grow engagement.", "pro", 4.0, "https://postwise.ai", false],
  [458, "Ocoya", "marketing", "📲", "ocoya", "AI tạo nội dung và lên lịch đăng bài cho mạng xã hội.", "AI that generates content and schedules posts across social media.", "free", 4.1, "https://www.ocoya.com", true],
  [459, "Predis.ai", "marketing", "🎯", "predis", "AI tạo bài đăng, video ngắn và caption cho mạng xã hội hàng loạt.", "AI that generates social posts, short videos, and captions at scale.", "free", 4.1, "https://predis.ai", true],
  [460, "Vidyard AI", "marketing", "📹", "vidyard", "Tính năng AI trong Vidyard hỗ trợ tạo và cá nhân hoá video bán hàng.", "AI features in Vidyard for creating and personalizing sales videos.", "pro", 4.1, "https://www.vidyard.com", false],
  [461, "Durable", "design", "🏗️", "durable", "AI tạo trang web hoàn chỉnh cho doanh nghiệp nhỏ chỉ trong vài giây.", "AI that builds a complete small-business website in seconds.", "free", 4.1, "https://durable.co", false],
  [462, "Dora AI", "design", "🌀", "dora", "AI tạo trang web 3D tương tác không cần biết lập trình.", "AI that builds interactive 3D websites without any coding.", "free", 4.1, "https://www.dora.run", false],
  [463, "10Web AI", "design", "🔟", "10web", "AI tạo và host trang WordPress hoàn chỉnh từ mô tả.", "AI that generates and hosts a complete WordPress site from a prompt.", "free", 4.1, "https://10web.io", false],
  [464, "Mixo", "design", "🚀", "mixo", "AI tạo trang landing page cho startup chỉ trong vài phút.", "AI that builds a startup landing page in just minutes.", "free", 3.9, "https://mixo.io", false],
  [465, "Wix ADI", "design", "🧩", "wixadi", "Công cụ thiết kế web tự động bằng AI của nền tảng Wix.", "Wix's AI-driven automatic website design tool.", "free", 4.1, "https://www.wix.com/adi", false],
  [466, "Guru", "work-tools", "🧘", "guru", "Nền tảng quản lý tri thức nội bộ với AI trả lời câu hỏi tức thì.", "Internal knowledge-management platform with AI-powered instant answers.", "pro", 4.3, "https://www.getguru.com", true],
  [467, "Glean", "work-tools", "✨", "glean", "AI tìm kiếm doanh nghiệp giúp nhân viên tìm thông tin trong mọi công cụ.", "Enterprise AI search that helps employees find info across every tool.", "pro", 4.3, "https://www.glean.com", true],
  [468, "Stack AI", "work-tools", "🥞", "stackai", "Nền tảng không cần code để xây dựng ứng dụng AI nội bộ doanh nghiệp.", "No-code platform for building internal enterprise AI applications.", "pro", 4.1, "https://www.stack-ai.com", true],
  [469, "Nyota", "work-tools", "🌟", "nyota", "AI ghi chú cuộc họp và theo dõi công việc cần làm sau đó.", "AI that takes meeting notes and tracks resulting follow-up tasks.", "free", 4.1, "https://nyota.ai", false],
  [470, "Read AI", "work-tools", "📖", "readai", "AI tóm tắt cuộc họp, email và tin nhắn thành báo cáo ngắn gọn.", "AI that summarizes meetings, emails, and messages into concise reports.", "free", 4.2, "https://www.read.ai", false],
  [471, "Bureau Works", "translation", "🏢", "bureauworks", "Nền tảng bản địa hoá AI cho doanh nghiệp có nội dung đa ngôn ngữ.", "AI localization platform for enterprises with multilingual content.", "pro", 4.0, "https://www.bureauworks.com", true],
  [472, "Phrase", "translation", "🗨️", "phrase", "Nền tảng quản lý bản địa hoá và dịch thuật AI cho sản phẩm số.", "AI-powered localization and translation-management platform for digital products.", "pro", 4.2, "https://phrase.com", true],
  [473, "Weglot", "translation", "🌐", "weglot", "Giải pháp dịch website tự động bằng AI chỉ với vài dòng cài đặt.", "AI-powered website translation solution set up in just a few lines.", "free", 4.3, "https://www.weglot.com", true],
  [474, "Crowdin", "translation", "👥", "crowdin", "Nền tảng bản địa hoá phần mềm có AI hỗ trợ dịch thuật cộng tác.", "Software-localization platform with AI-assisted collaborative translation.", "free", 4.3, "https://crowdin.com", true],
  [475, "Wordly", "translation", "🎤", "wordly", "AI phiên dịch trực tiếp theo thời gian thực cho sự kiện và hội nghị.", "Real-time AI live interpretation for events and conferences.", "pro", 4.1, "https://www.wordly.ai", true],
  [476, "Klippa", "pdf-docs", "🧾", "klippa", "AI trích xuất dữ liệu từ hoá đơn và biên lai tự động.", "AI that automatically extracts data from invoices and receipts.", "pro", 4.1, "https://www.klippa.com", true],
  [477, "Formx", "pdf-docs", "📋", "formx", "AI trích xuất dữ liệu có cấu trúc từ biểu mẫu và tài liệu quét.", "AI that extracts structured data from forms and scanned documents.", "pro", 4.0, "https://formextractorai.com", true],
  [478, "Parseur", "pdf-docs", "📤", "parseur", "AI tự động trích xuất dữ liệu từ email và tài liệu PDF.", "AI that automatically extracts data from emails and PDF documents.", "free", 4.1, "https://parseur.com", true],
  [479, "SmallPDF AI", "pdf-docs", "🗜️", "smallpdf", "Bộ công cụ PDF trực tuyến phổ biến tích hợp trợ lý AI.", "Popular online PDF toolkit with a built-in AI assistant.", "free", 4.3, "https://smallpdf.com", false],
  [480, "Docupilot", "pdf-docs", "🛩️", "docupilot", "AI tự động tạo tài liệu từ mẫu và dữ liệu có sẵn.", "AI that automatically generates documents from templates and data.", "pro", 4.0, "https://docupilot.app", true],
  [481, "IFTTT", "automation", "🔗", "ifttt", "Nền tảng tự động hoá đơn giản kết nối thiết bị và ứng dụng có AI hỗ trợ.", "Simple automation platform connecting devices and apps with AI support.", "free", 4.1, "https://ifttt.com", true],
  [482, "Levity", "automation", "🪶", "levity", "Nền tảng không cần code để tự động hoá quy trình bằng AI phân loại.", "No-code platform for automating workflows with AI-based classification.", "pro", 4.0, "https://levity.ai", true],
  [483, "Lindy", "automation", "🐦", "lindy", "AI agent tự động hoá quy trình email, lịch và công việc lặp lại.", "AI agent that automates email, calendar, and repetitive workflows.", "free", 4.2, "https://www.lindy.ai", true],
  [484, "Vertesia", "automation", "🌐", "vertesia", "Nền tảng AI agent doanh nghiệp để tự động hoá nội dung và quy trình.", "Enterprise AI-agent platform for automating content and workflows.", "pro", 3.9, "https://vertesia.ai", true],
  [485, "Beam AI", "automation", "🔦", "beamai", "AI agent tự động hoá quy trình nghiệp vụ đầu cuối cho doanh nghiệp.", "AI agents that automate end-to-end business processes for enterprises.", "pro", 4.0, "https://beam.ai", true],
  [486, "H2O.ai", "agents", "💧", "h2oai", "Nền tảng AI mã nguồn mở xây dựng mô hình và AI agent doanh nghiệp.", "Open-source AI platform for building models and enterprise AI agents.", "free", 4.1, "https://h2o.ai", true],
  [487, "Emergence AI", "agents", "🌱", "emergence", "Nền tảng điều phối nhiều AI agent để hoàn thành tác vụ phức tạp.", "Platform for orchestrating multiple AI agents to complete complex tasks.", "pro", 4.0, "https://www.emergence.ai", true],
  [488, "Induced AI", "agents", "🤖", "inducedai", "AI agent tự động hoá tác vụ trình duyệt lặp đi lặp lại cho doanh nghiệp.", "AI agents that automate repetitive browser tasks for businesses.", "pro", 3.9, "https://www.induced.ai", true],
  [489, "Simular AI", "agents", "🖥️", "simular", "AI agent điều khiển máy tính để thực hiện tác vụ như con người.", "AI agent that operates a computer to perform tasks like a human.", "pro", 4.0, "https://www.simular.ai", false],
  [490, "Orby AI", "agents", "🔮", "orby", "AI agent tự động hoá quy trình doanh nghiệp bằng cách quan sát thao tác.", "AI agent that automates enterprise workflows by observing user actions.", "pro", 4.0, "https://www.orby.ai", false],
  [491, "Gainsight AI", "business", "📊", "gainsight", "AI trong Gainsight giúp dự đoán rủi ro và chăm sóc khách hàng.", "AI in Gainsight that predicts churn risk and guides customer success.", "pro", 4.1, "https://www.gainsight.com", false],
  [492, "Outreach AI", "business", "📤", "outreach", "AI trong Outreach hỗ trợ đội ngũ bán hàng tương tác khách hàng hiệu quả.", "AI in Outreach that helps sales teams engage prospects more effectively.", "pro", 4.2, "https://www.outreach.io", false],
  [493, "Seismic", "business", "🌊", "seismic", "Nền tảng AI hỗ trợ nội dung và huấn luyện cho đội ngũ bán hàng.", "AI platform for sales content and coaching enablement.", "pro", 4.1, "https://seismic.com", false],
  [494, "Highspot", "business", "🏔️", "highspot", "Nền tảng AI quản lý nội dung bán hàng và đào tạo đội ngũ.", "AI platform for managing sales content and team training.", "pro", 4.2, "https://www.highspot.com", false],
  [495, "Mindtickle", "business", "🎫", "mindtickle", "Nền tảng AI huấn luyện và chuẩn bị kỹ năng cho đội ngũ bán hàng.", "AI platform for training and readiness coaching of sales teams.", "pro", 4.1, "https://www.mindtickle.com", false],
  [496, "BenevolentAI", "science", "🌱", "benevolentai", "Nền tảng AI khám phá thuốc mới kết hợp sinh học và hoá học tính toán.", "AI drug-discovery platform combining biology and computational chemistry.", "pro", 4.0, "https://www.benevolent.com", false],
  [497, "Exscientia", "science", "🧪", "exscientia", "Công ty dược phẩm dùng AI thiết kế phân tử thuốc chính xác hơn.", "Pharma company using AI to design drug molecules with greater precision.", "pro", 4.0, "https://www.exscientia.ai", false],
  [498, "Deep Genomics", "science", "🧬", "deepgenomics", "AI phân tích bộ gen để phát triển liệu pháp điều trị di truyền.", "AI that analyzes genomic data to develop genetic-based therapies.", "pro", 4.0, "https://www.deepgenomics.com", false],
  [499, "Cellarity", "science", "🧫", "cellarity", "AI phân tích hành vi tế bào để tìm ra phương pháp điều trị mới.", "AI that analyzes cell behavior to uncover new treatment approaches.", "pro", 3.9, "https://www.cellarity.com", false],
  [500, "Valo Health", "science", "🩺", "valohealth", "Nền tảng AI kết hợp dữ liệu lâm sàng để tăng tốc phát triển thuốc.", "AI platform combining clinical data to accelerate drug development.", "pro", 3.9, "https://www.valohealth.com", false],
].map(([id, name, category, icon, logo, vi, en, badge, rating, link, hasApi]) => ({
  id, name, category, icon, logo, description: { vi, en }, badge, rating, link, hasApi: !!hasApi
}));

aiTools.push(...moreAiTools4);

// =======================================
// DU LIEU SONG NGU: AI THEO NGHE
// =======================================
const aiByProfession = [
  {
    icon: "💼",
    title: { vi: "AI cho Dân văn phòng", en: "AI for Office Workers" },
    intro: { vi: "Sử dụng AI để:", en: "Use AI to:" },
    tasks: [
      { vi: "Soạn email chuyên nghiệp", en: "Write professional emails" },
      { vi: "Viết báo cáo", en: "Write reports" },
      { vi: "Tóm tắt tài liệu", en: "Summarize documents" },
      { vi: "Dịch văn bản", en: "Translate text" },
      { vi: "Tạo slide thuyết trình", en: "Create presentation slides" }
    ],
    suggested: ["ChatGPT", "Claude", "Gemini", "Gamma", "Notion AI"]
  },
  {
    icon: "💻",
    title: { vi: "AI cho Lập trình viên", en: "AI for Developers" },
    intro: { vi: "AI giúp:", en: "AI helps you:" },
    tasks: [
      { vi: "Viết mã nguồn", en: "Write source code" },
      { vi: "Giải thích code", en: "Explain code" },
      { vi: "Sửa lỗi", en: "Fix bugs" },
      { vi: "Tạo website", en: "Build websites" },
      { vi: "Viết tài liệu kỹ thuật", en: "Write technical documentation" }
    ],
    suggested: ["Claude", "ChatGPT", "GitHub Copilot", "Gemini", "Cursor"]
  },
  {
    icon: "🎨",
    title: { vi: "AI cho Thiết kế", en: "AI for Designers" },
    intro: { vi: "AI hỗ trợ:", en: "AI supports you with:" },
    tasks: [
      { vi: "Tạo hình ảnh", en: "Generate images" },
      { vi: "Thiết kế logo", en: "Design logos" },
      { vi: "Banner quảng cáo", en: "Create ad banners" },
      { vi: "Chỉnh sửa ảnh", en: "Edit photos" },
      { vi: "Xóa nền", en: "Remove backgrounds" }
    ],
    suggested: ["Midjourney", "Canva AI", "Adobe Firefly", "Ideogram", "Leonardo AI"]
  },
  {
    icon: "🎬",
    title: { vi: "AI cho Người làm Video", en: "AI for Video Creators" },
    intro: { vi: "AI giúp:", en: "AI helps you:" },
    tasks: [
      { vi: "Tạo video từ văn bản", en: "Generate video from text" },
      { vi: "Tạo avatar AI", en: "Create AI avatars" },
      { vi: "Lồng tiếng", en: "Add voiceovers" },
      { vi: "Tạo phụ đề", en: "Generate subtitles" },
      { vi: "Dịch video", en: "Translate videos" }
    ],
    suggested: ["Veo", "Runway", "Pika", "HeyGen", "CapCut AI"]
  },
  {
    icon: "📚",
    title: { vi: "AI cho Học sinh & Sinh viên", en: "AI for Students" },
    intro: { vi: "AI hỗ trợ:", en: "AI supports you with:" },
    tasks: [
      { vi: "Giải bài tập", en: "Solve homework" },
      { vi: "Học ngoại ngữ", en: "Learn foreign languages" },
      { vi: "Viết luận", en: "Write essays" },
      { vi: "Tóm tắt sách", en: "Summarize books" },
      { vi: "Lập kế hoạch học tập", en: "Plan study schedules" }
    ],
    suggested: ["ChatGPT", "Gemini", "Perplexity", "Khanmigo", "Quizlet AI"]
  },
  {
    icon: "📈",
    title: { vi: "AI cho Marketing", en: "AI for Marketing" },
    intro: { vi: "AI giúp:", en: "AI helps you:" },
    tasks: [
      { vi: "Viết bài quảng cáo", en: "Write ad copy" },
      { vi: "Viết content Facebook", en: "Write Facebook content" },
      { vi: "SEO", en: "Optimize SEO" },
      { vi: "Email Marketing", en: "Run email marketing" },
      { vi: "Phân tích khách hàng", en: "Analyze customers" }
    ],
    suggested: ["ChatGPT", "Jasper", "Copy.ai", "Claude", "Canva AI"]
  },
  {
    icon: "💰",
    title: { vi: "AI cho Kinh doanh", en: "AI for Business" },
    intro: { vi: "AI hỗ trợ:", en: "AI supports you with:" },
    tasks: [
      { vi: "Phân tích dữ liệu", en: "Analyze data" },
      { vi: "Dự báo doanh thu", en: "Forecast revenue" },
      { vi: "Chăm sóc khách hàng", en: "Support customers" },
      { vi: "Chatbot bán hàng", en: "Run sales chatbots" },
      { vi: "Viết mô tả sản phẩm", en: "Write product descriptions" }
    ],
    suggested: ["ChatGPT", "Claude", "Gemini", "HubSpot AI", "Salesforce Einstein"]
  },
  {
    icon: "📱",
    title: { vi: "AI cho Nhà sáng tạo nội dung", en: "AI for Content Creators" },
    intro: { vi: "AI giúp:", en: "AI helps you:" },
    tasks: [
      { vi: "Viết kịch bản", en: "Write scripts" },
      { vi: "Lên ý tưởng video", en: "Brainstorm video ideas" },
      { vi: "Tạo thumbnail", en: "Create thumbnails" },
      { vi: "Viết tiêu đề hấp dẫn", en: "Write catchy titles" },
      { vi: "Tạo giọng đọc AI", en: "Generate AI voiceovers" }
    ],
    suggested: ["ChatGPT", "Claude", "Veo", "ElevenLabs", "Canva AI"]
  }
];

// =======================================
// DANH MỤC MẶC ĐỊNH (dùng để "Nhập dữ liệu mặc định" lên Firebase lần đầu,
// và làm dữ liệu dự phòng khi chưa cấu hình/kết nối được Firebase)
// =======================================
const DEFAULT_CATEGORIES = [
  { slug: "chat", icon: "💬", labelVi: "Chat AI", labelEn: "Chat AI" },
  { slug: "image", icon: "🎨", labelVi: "AI Hình ảnh", labelEn: "Image AI" },
  { slug: "video", icon: "🎬", labelVi: "AI Video", labelEn: "Video AI" },
  { slug: "code", icon: "💻", labelVi: "AI Lập trình", labelEn: "Coding AI" },
  { slug: "finance", icon: "💰", labelVi: "AI Tài chính", labelEn: "Finance AI" },
  { slug: "study", icon: "📚", labelVi: "AI Học tập", labelEn: "Learning AI" },
  { slug: "audio-music", icon: "🎵", labelVi: "AI Âm thanh & Nhạc", labelEn: "Audio & Music AI" },
  { slug: "writing-content", icon: "✍️", labelVi: "AI Viết & Nội dung", labelEn: "Writing & Content AI" },
  { slug: "voice", icon: "🎙️", labelVi: "AI Voice", labelEn: "Voice AI" },
  { slug: "productivity", icon: "📊", labelVi: "AI Năng suất", labelEn: "Productivity AI" },
  { slug: "research", icon: "🔍", labelVi: "AI Nghiên cứu", labelEn: "Research AI" },
  { slug: "marketing", icon: "📣", labelVi: "AI Marketing", labelEn: "Marketing AI" },
  { slug: "design", icon: "🖼️", labelVi: "AI Thiết kế", labelEn: "Design AI" },
  { slug: "work-tools", icon: "🧑‍💼", labelVi: "AI Công việc", labelEn: "Work AI" },
  { slug: "translation", icon: "🌐", labelVi: "AI Dịch thuật", labelEn: "Translation AI" },
  { slug: "pdf-docs", icon: "📝", labelVi: "AI PDF & Tài liệu", labelEn: "PDF & Documents AI" },
  { slug: "automation", icon: "🤖", labelVi: "AI Automation", labelEn: "Automation AI" },
  { slug: "agents", icon: "🧠", labelVi: "AI Agents", labelEn: "AI Agents" },
  { slug: "business", icon: "🛍️", labelVi: "AI Kinh doanh", labelEn: "Business AI" },
  { slug: "science", icon: "🔬", labelVi: "AI Khoa học", labelEn: "Science AI" }
];

// Bản sao "sạch" của bộ công cụ mặc định, chụp lại NGAY LÚC NÀY trước khi
// bất kỳ đoạn code nào khác (đồng bộ Firebase, Admin Panel...) có cơ hội
// chỉnh sửa mảng aiTools ở trên. Dùng cho nút "Nhập dữ liệu mặc định lên
// Firebase" trong Dashboard, để luôn nhập đúng dữ liệu gốc dù aiTools hiện
// tại đã bị thay thế bằng dữ liệu từ Firebase hay chưa.
// Cac AI trong additionalAiTools/moreAiTools... duoc khai bao o dang tuple
// (mang vi tri, khong co ten thuoc tinh) nen khong the chen truc tiep field
// "slug" vao tung dong nhu cac AI dang object literal o tren. Thay vao do,
// gan "slug" sau khi toan bo aiTools da duoc dung len, theo id.
const EXTRA_AI_SLUGS = {
  60: "figma-ai",        // Figma AI
  70: "replit",          // Replit
  76: "v0",              // v0
  84: "character-ai",    // Character.AI
  85: "notebooklm",       // NotebookLM
  93: "elevenlabs",       // ElevenLabs
  94: "jasper",           // Jasper
  99: "suno",             // Suno
  261: "zapier-ai",       // Zapier AI
  269: "deepl"            // DeepL
};
aiTools.forEach(tool => {
  if (EXTRA_AI_SLUGS[tool.id]) tool.slug = EXTRA_AI_SLUGS[tool.id];
});

const DEFAULT_TOOLS_SEED = aiTools.map(tool => JSON.parse(JSON.stringify(tool)));
