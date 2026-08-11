// =======================================================
// GET /api/ai-news
// Query params:
//   limit    - số bài tối đa trả về (mặc định 60, tối đa 150)
//   category - all | ai-news | research | ai-tools | companies | technology
//   q        - tìm kiếm theo title/description/source (tuỳ chọn, lọc phía server)
// =======================================================
const { getNews } = require("./_lib/news");

module.exports = async (req, res) => {
  try {
    const { limit, category, q } = req.query || {};

    const data = await getNews({});

    let items = data.items || [];

    if (category && category !== "all") {
      items = items.filter(it => it.category === category);
    }

    if (q && String(q).trim()) {
      const needle = String(q).trim().toLowerCase();
      items = items.filter(
        it =>
          it.title.toLowerCase().includes(needle) ||
          (it.description || "").toLowerCase().includes(needle) ||
          it.source.toLowerCase().includes(needle)
      );
    }

    const lim = Math.min(Math.max(parseInt(limit, 10) || 60, 1), 150);
    items = items.slice(0, lim);

    // CDN cache: Vercel/Edge sẽ phục vụ response đã cache tối đa 10 phút,
    // và âm thầm làm mới ở nền (stale-while-revalidate) trong tối đa 1 ngày.
    // Đây chính là cơ chế "auto refresh" thực tế trên Hobby plan - xem README.
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
    res.status(200).json({
      ok: true,
      count: items.length,
      totalAvailable: data.items ? data.items.length : 0,
      fetchedAt: data.fetchedAt,
      servedFrom: data.servedFrom,
      sources: data.sources,
      items
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err && err.message ? err.message : "Unknown error",
      items: []
    });
  }
};
