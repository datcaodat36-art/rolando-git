// =======================================================
// GET /api/cron-refresh
// Được Vercel Cron gọi (xem vercel.json) để làm mới cache sớm.
// Trên gói Hobby, Vercel Cron chỉ chạy tối đa 1 lần/ngày - đây LÀ giới hạn
// của nền tảng, không phải giới hạn do code. Việc "refresh" thực sự mỗi khi
// người dùng ghé site vẫn diễn ra nhờ Cache-Control s-maxage trong
// /api/ai-news.js (xem README / báo cáo cuối).
//
// Nếu bạn đặt biến môi trường CRON_SECRET trên Vercel, endpoint này sẽ
// kiểm tra header Authorization: Bearer <CRON_SECRET> mà Vercel Cron tự
// gửi kèm, để tránh người ngoài gọi tràn endpoint này.
// =======================================================
const { aggregateAll } = require("./_lib/news");

module.exports = async (req, res) => {
  const expectedSecret = process.env.CRON_SECRET;
  if (expectedSecret) {
    const auth = req.headers["authorization"] || "";
    if (auth !== `Bearer ${expectedSecret}`) {
      res.status(401).json({ ok: false, error: "Unauthorized" });
      return;
    }
  }

  try {
    const result = await aggregateAll();
    res.status(200).json({
      ok: true,
      refreshedAt: result.fetchedAt,
      totalItems: result.items.length,
      sources: result.sources
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err && err.message ? err.message : "Unknown error" });
  }
};
