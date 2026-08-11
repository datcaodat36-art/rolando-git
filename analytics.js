// =======================================
// 📊 GOOGLE ANALYTICS 4 — tracking cho website
// =======================================
// File này CHỈ làm 2 việc:
//   1) Khởi tạo Google Analytics 4 (gtag.js) với Measurement ID hiện tại.
//   2) Cung cấp hàm dùng chung window.trackEvent(name, params) để các file
//      JS khác (script.js, prompts.js, quiz.js, battle.js...) gọi khi có
//      hành động quan trọng (xem AI, copy prompt, làm quiz, đấu AI...).
//
// AN TOÀN — ĐỌC KỸ TRƯỚC KHI SỬA:
//   - Nếu GA4 bị chặn (AdBlock) hoặc lỗi mạng: script gtag.js chỉ đơn giản
//     không tải được, còn window.dataLayer.push() vẫn chạy bình thường
//     (không ném lỗi) -> KHÔNG ảnh hưởng phần còn lại của trang.
//   - window.trackEvent() luôn bọc try/catch — 1 lỗi analytics không bao
//     giờ được phép làm vỡ luồng chức năng chính (copy, favorite, quiz...).
//   - File này PHẢI được nạp TRƯỚC các file gọi window.trackEvent(...)
//     (script.js, prompts.js, quiz.js, battle.js) — xem thứ tự <script> đã
//     thêm trong index.html.
//   - KHÔNG gửi dữ liệu cá nhân: không email, không tên/ID người dùng,
//     không nội dung riêng tư. Chỉ gửi metadata: tên/slug AI, tên/slug
//     prompt, category, từ khoá tìm kiếm (đã giới hạn độ dài).
//   - CHỈ 1 nơi gửi pageview: gtag.js tự động gửi (send_page_view mặc định
//     = true khi gọi "config"). Không có chỗ nào khác trong code gọi thêm
//     page_view thủ công -> không có pageview trùng lặp.

(function () {
  "use strict";

  var GA_MEASUREMENT_ID = "G-G5BF8KWDHW";

  // ---------- 1) Khởi tạo gtag.js theo đúng chuẩn Google ----------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag; // giữ lại tên chuẩn để tiện debug từ console nếu cần

  try {
    gtag("js", new Date());
    // send_page_view: không cần khai báo (mặc định true) - gtag.js sẽ tự
    // gửi ĐÚNG 1 pageview khi tải trang.
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true
    });
  } catch (e) {
    // Không throw ra ngoài - trang phải chạy bình thường dù analytics lỗi.
  }

  // Nạp gtag.js bất đồng bộ (async), không chặn render trang. Nếu bị
  // AdBlock/mạng chặn thì onerror chỉ để im lặng bỏ qua — các lệnh
  // gtag(...) ở trên/dưới vẫn nằm an toàn trong dataLayer, không gây lỗi gì
  // cho phần còn lại của website.
  try {
    var gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    gaScript.onerror = function () {
      /* GA4 bị chặn hoặc lỗi mạng - bỏ qua, website vẫn hoạt động bình thường */
    };
    var firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(gaScript, firstScript);
    } else {
      document.head.appendChild(gaScript);
    }
  } catch (e) {
    // bỏ qua
  }

  // ---------- 2) Hàm dùng chung để gửi custom event ----------
  // Dùng ở bất kỳ file JS nào: window.trackEvent("prompt_copy", { prompt_slug: "..." })
  var MAX_STRING_LEN = 100;

  function sanitizeParams(params) {
    var out = {};
    if (!params || typeof params !== "object") return out;
    Object.keys(params).forEach(function (key) {
      var val = params[key];
      if (val === null || val === undefined) return;
      if (typeof val === "string") {
        // Cắt bớt chuỗi quá dài (vd. từ khoá tìm kiếm) để tránh vô tình
        // gửi nội dung dài / nhạy cảm lên GA4.
        out[key] = val.slice(0, MAX_STRING_LEN);
      } else if (typeof val === "number" || typeof val === "boolean") {
        out[key] = val;
      }
      // Bỏ qua object/array lồng nhau — các event hiện tại không cần, và
      // tránh vô tình gửi dữ liệu không kiểm soát được cấu trúc.
    });
    return out;
  }

  window.trackEvent = function (eventName, params) {
    try {
      if (!eventName || typeof eventName !== "string") return;
      gtag("event", eventName, sanitizeParams(params));
    } catch (e) {
      // Không để lỗi analytics ảnh hưởng chức năng chính của trang.
    }
  };

  // ---------- 3) Debounce cho các event dễ bị bắn liên tục (tìm kiếm) ----------
  // window.trackEventDebounced(key, eventName, params, waitMs?)
  // "key" để phân biệt nhiều ô tìm kiếm khác nhau (vd. "ai-search",
  // "prompt-search") dùng chung 1 hàm debounce mà không đụng timer của nhau.
  var debounceTimers = {};
  window.trackEventDebounced = function (key, eventName, params, wait) {
    try {
      clearTimeout(debounceTimers[key]);
      debounceTimers[key] = setTimeout(function () {
        window.trackEvent(eventName, params);
      }, wait || 600);
    } catch (e) {
      // bỏ qua
    }
  };
})();
