// =======================================
// CẤU HÌNH FIREBASE (để đồng bộ Tên Website / Màu giao diện cho MỌI người)
// =======================================
//
// CÁCH LẤY THÔNG TIN NÀY:
// 1. Vào https://console.firebase.google.com/ -> đăng nhập bằng Gmail.
// 2. Bấm "Add project" (Thêm dự án) -> đặt tên tuỳ ý -> Continue -> tạo dự án
//    (miễn phí, không cần thẻ tín dụng, có thể tắt Google Analytics cho gọn).
// 3. Sau khi vào dự án: bấm biểu tượng "</>" (Web) để thêm 1 web app ->
//    đặt tên app tuỳ ý -> Register app. Firebase sẽ hiện ra một đoạn cấu
//    hình dạng: const firebaseConfig = { apiKey: "...", ... }.
// 4. Copy TOÀN BỘ các giá trị đó vào đúng vị trí bên dưới (thay các dòng
//    "DÁN_..._VÀO_ĐÂY").
// 5. Vào menu bên trái -> Build -> Realtime Database -> Create Database ->
//    chọn khu vực gần bạn -> chọn "Start in test mode" (hoặc dùng rules ở
//    cuối file này). Sau khi tạo xong, copy đúng "Realtime Database URL"
//    (dạng https://ten-du-an-default-rtdb.asia-southeast1.firebasedatabase.app)
//    vào trường databaseURL bên dưới.
//
// Nếu chưa điền, website vẫn chạy bình thường — chỉ khác là tên/màu giao
// diện Admin đổi sẽ chỉ hiện trên trình duyệt của Admin (như trước đây),
// vì chưa có nơi lưu trữ dùng chung.

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDQN32hB91hM3tcbEv9rD5snH5mGSBiZxo",
  authDomain: "tool-ai-1d848.firebaseapp.com",
  databaseURL: "https://tool-ai-1d848-default-rtdb.firebaseio.com/",
  projectId: "tool-ai-1d848",
  storageBucket: "tool-ai-1d848.appspot.com",
  messagingSenderId: "351026190561",
  appId: "1:351026190561:web:985cf1edafd3873b183fa0"
};

// Khởi tạo Firebase NGAY tại đây (file này được tải trước admin-auth-system.js,
// admin-ui-handler.js và script.js), để toàn bộ website dùng chung 1 kết nối
// Firebase duy nhất. Nếu cấu hình ở trên còn thiếu (chưa dán apiKey/appId...),
// bỏ qua bước này và các file kia sẽ tự chuyển sang chế độ hoạt động không
// có Firebase (chỉ đọc dữ liệu mặc định, không đăng nhập được).
try {
  const hasValidConfig =
    FIREBASE_CONFIG.databaseURL && !FIREBASE_CONFIG.databaseURL.includes("DÁN_") &&
    FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.includes("DÁN_") &&
    FIREBASE_CONFIG.appId && !FIREBASE_CONFIG.appId.includes("DÁN_");

  if (hasValidConfig && typeof firebase !== "undefined" && (!firebase.apps || !firebase.apps.length)) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (e) {
  console.warn("Không thể khởi tạo Firebase (kiểm tra lại firebase-config.js):", e);
}

// LẤY NỐT apiKey, messagingSenderId, appId ở đâu?
// Vào Firebase Console > (biểu tượng bánh răng) Project settings > tab
// "General" > kéo xuống mục "Your apps" > chọn app Web bạn đã tạo (hoặc
// bấm "</>" để tạo mới nếu chưa có) > phần "SDK setup and configuration"
// > chọn "Config" > copy đúng 3 giá trị còn thiếu vào đây.

// TẠO TÀI KHOẢN ADMIN DUY NHẤT (KHÔNG dùng form đăng ký trên web):
// 1. Firebase Console > Build > Authentication > tab "Sign-in method" >
//    bật "Email/Password".
// 2. Qua tab "Users" > "Add user" > nhập email + mật khẩu cho Admin.
// 3. Bấm vào user vừa tạo, copy cột "User UID" (một chuỗi dài) — đây là
//    UID cần dán vào Firebase Security Rules bên dưới, để CHỈ tài khoản
//    này mới có quyền ghi dữ liệu.

// GỢI Ý RULES CHO REALTIME DATABASE (dán vào tab "Rules" trong Firebase
// Console > Realtime Database). Thay "DÁN_UID_ADMIN_VÀO_ĐÂY" bằng UID bạn
// vừa copy ở bước trên:
//
// {
//   "rules": {
//     "tools": {
//       ".read": true,
//       ".write": "auth != null && auth.uid === 'DÁN_UID_ADMIN_VÀO_ĐÂY'"
//     },
//     "categories": {
//       ".read": true,
//       ".write": "auth != null && auth.uid === 'DÁN_UID_ADMIN_VÀO_ĐÂY'"
//     },
//     "siteSettings": {
//       ".read": true,
//       ".write": "auth != null && auth.uid === 'DÁN_UID_ADMIN_VÀO_ĐÂY'"
//     }
//   }
// }
//
// Với rules này: AI KHÁC cũng đọc được dữ liệu (để xem website), nhưng
// CHỈ đúng UID Admin ở trên mới ghi/sửa/xóa được — kể cả khi ai đó tự mở
// Console trình duyệt và gọi thẳng Firebase SDK cũng không ghi được nếu
// không đăng nhập đúng tài khoản Admin này.
