// =======================================
// 📚 PROMPT LIBRARY — data holder
// Giữ mảng "sống" promptLibrary, giống hệt cách aiTools hoạt động trong
// data.js: khai báo SỚM (trước admin-ui-handler.js) với giá trị rỗng, rồi
// được nạp đầy bởi prompts.js — đầu tiên từ data/prompts.json (fetch), sau
// đó Firebase Realtime Database ("prompts") sẽ ghi đè nếu Admin đã từng lưu
// dữ liệu lên đó. Nhờ khai báo sớm bằng let (không phải const gán mảng mới),
// mọi file khác (admin-ui-handler.js, prompts.js) luôn tham chiếu ĐÚNG 1
// mảng này dù nó được nạp dữ liệu bất đồng bộ (async) sau đó.
// =======================================
let promptLibrary = [];
