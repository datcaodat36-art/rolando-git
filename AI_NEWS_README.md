# 🗞️ AI NEWS — Báo cáo hoàn thiện

## ⚠️ Tình trạng ban đầu (quan trọng)
Kiểm tra toàn bộ mã nguồn trong file zip bạn gửi cho thấy **chưa từng có hệ thống
AI News nào được xây dựng trước đó**: không có thư mục `/api`, không có RSS/API nào
được gọi, không có endpoint `GET /api/ai-news` hay `GET /api/cron-refresh`, và
cũng chưa có section "AI News" nào trong giao diện. Vì vậy phần này được **xây
mới hoàn toàn**, đi kèm với giao diện tối giản, đồng bộ 100% với theme hiện tại
(dùng lại `--bg`, `--primary`, `--card-bg`, `--radius`, `--font-heading`,
`--font-body`... đã có sẵn trong `style.css`) — **không đổi bố cục hay theme
chung của trang**.

---

## 1. Nguồn tin đang dùng
File cấu hình: `api/_lib/news.js` → mảng `SOURCES`.

| Nguồn | Loại | RSS URL |
|---|---|---|
| OpenAI | Chính thức | https://openai.com/news/rss.xml |
| Google AI | Chính thức | https://blog.google/technology/ai/rss/ |
| Google DeepMind | Chính thức (research) | https://deepmind.google/blog/feed/basic/ |
| NVIDIA | Chính thức | https://blogs.nvidia.com/feed/ |
| Microsoft AI | Chính thức | https://news.microsoft.com/source/topics/ai/feed/ |
| MIT News (AI) | Nghiên cứu | https://news.mit.edu/rss/topic/artificial-intelligence2 |
| TechCrunch — AI | Báo công nghệ uy tín | https://techcrunch.com/category/artificial-intelligence/feed/ |
| VentureBeat — AI | Báo công nghệ uy tín | https://venturebeat.com/category/ai/feed/ |
| The Verge — AI | Báo công nghệ uy tín | https://www.theverge.com/rss/ai-artificial-intelligence/index.xml |
| Ars Technica — AI | Báo công nghệ uy tín | https://arstechnica.com/ai/feed/ |

**Lưu ý về Anthropic, Meta AI, xAI:** cả ba hiện **không có RSS chính thức công
khai** (đã kiểm tra thực tế). Thay vì lấy từ nguồn không rõ ràng, tin về 3 công
ty này vẫn xuất hiện tự nhiên qua các nguồn báo chí công nghệ uy tín ở trên
(TechCrunch/VentureBeat/The Verge/Ars Technica đều đưa tin về Anthropic, Meta AI,
xAI rất thường xuyên). Nếu sau này họ ra RSS chính thức, chỉ cần thêm 1 dòng vào
mảng `SOURCES`.

Tất cả các nguồn đều được fetch **song song, độc lập** — 1 nguồn lỗi không ảnh
hưởng nguồn khác (xem mục 4).

---

## 2. Endpoint đang dùng để lấy tin

### `GET /api/ai-news`
Endpoint chính, frontend (`ai-news.js`) gọi endpoint này.

Query params hỗ trợ:
- `limit` — số bài tối đa (mặc định 60, tối đa 150). Ví dụ: `/api/ai-news?limit=5`
- `category` — `all | ai-news | research | ai-tools | companies | technology`
- `q` — tìm kiếm theo title/description/source (lọc phía server, tuỳ chọn)

Response mẫu:
```json
{
  "ok": true,
  "count": 5,
  "totalAvailable": 87,
  "fetchedAt": "2026-08-11T08:00:00.000Z",
  "servedFrom": "live",
  "sources": [
    { "source": "openai", "name": "OpenAI", "ok": true, "error": null, "count": 12 },
    { "source": "nvidia", "name": "NVIDIA", "ok": false, "error": "HTTP 503", "count": 0 }
  ],
  "items": [
    {
      "id": "n1a2b3c",
      "title": "...",
      "description": "...",
      "url": "https://...",
      "source": "OpenAI",
      "image": "https://.../cover.jpg",
      "publishedAt": "2026-08-11T07:40:00.000Z",
      "category": "companies"
    }
  ]
}
```
`servedFrom` cho biết dữ liệu đến từ đâu: `live` (vừa fetch xong),
`memory-cache` / `tmp-cache` (cache nóng trong 8 phút), `stale-cache` (toàn bộ
nguồn lỗi, trả về bản cache cũ nhất còn có), hoặc `empty` (chưa từng fetch thành
công lần nào — cực hiếm).

### `GET /api/cron-refresh`
Endpoint được Vercel Cron gọi để làm nóng cache trước (xem mục 3). Có thể gọi
tay để test. Trả về danh sách trạng thái từng nguồn.

Cả 2 endpoint dùng chung logic ở `api/_lib/news.js` (fetch RSS, lọc, khử trùng,
phân loại, sắp xếp) — không lặp code.

---

## 3. Cron refresh hoạt động thế nào

Đã cấu hình trong `vercel.json`:
```json
"crons": [{ "path": "/api/cron-refresh", "schedule": "0 6 * * *" }]
```

**Sự thật về gói Hobby của Vercel:** Cron Jobs trên gói Hobby **chỉ chạy tối đa
1 lần/ngày** — đây là giới hạn cứng của nền tảng, không phải do code. File
`vercel.json` ở trên đã tuân đúng giới hạn này (1 lần/ngày lúc 06:00 UTC), **không
giả vờ** là chạy mỗi 5–15 phút.

**Vậy tin có thật sự "mới" mỗi khi người dùng vào trang không?** Có — nhờ một cơ
chế khác, độc lập với cron: endpoint `/api/ai-news` trả về header
```
Cache-Control: public, s-maxage=600, stale-while-revalidate=86400
```
Điều này khiến CDN của Vercel tự cache response tối đa **10 phút**, và tự động
fetch lại ở nền mỗi khi có traffic sau mốc 10 phút đó — **không cần đợi cron**.
Đây chính là cơ chế "auto refresh" thực tế của hệ thống: khoảng **~10 phút/lần**
đối với người dùng thật, dựa trên traffic, cộng thêm cron 1 lần/ngày để làm nóng
cache phòng khi trang ít người truy cập.

Nếu sau này nâng cấp lên gói Pro trở lên, có thể sửa `"schedule"` trong
`vercel.json` để cron chạy dày hơn (ví dụ mỗi giờ), không cần sửa code khác.

---

## 4. Cơ chế Fallback (không để trang News trắng)

3 lớp fallback độc lập, từ trong ra ngoài:

1. **Từng nguồn RSS lỗi** → `Promise.allSettled` trong `aggregateAll()` đảm bảo
   1 nguồn timeout/lỗi (throw, HTTP lỗi, XML hỏng...) chỉ làm nguồn đó trả về
   mảng rỗng, các nguồn còn lại vẫn chạy và trả kết quả bình thường.
2. **Toàn bộ nguồn lỗi cùng lúc** (ví dụ mất mạng ra ngoài của Vercel) → server
   trả về **cache gần nhất** đã lưu trong `/tmp` của serverless instance, dù đã
   quá hạn 8 phút TTL, còn hơn trả rỗng.
3. **Ngay cả khi server không còn cache nào** (ví dụ cold start đầu tiên +
   toàn bộ nguồn lỗi cùng lúc — cực hiếm) → **phía trình duyệt** (`ai-news.js`)
   có lớp `localStorage` riêng, lưu lại lần fetch thành công gần nhất của
   *chính người dùng đó*. Khi mở lại trang, nếu API lỗi, trang hiển thị ngay
   tin đã lưu kèm badge "Bản lưu gần nhất", **không bao giờ hiện trang trắng**.
   Chỉ khi máy người dùng đó cũng chưa từng tải được tin lần nào mới hiện thông
   báo lỗi + nút "Thử lại".

---

## 5. Cache lưu ở đâu

| Lớp cache | Vị trí | Thời hạn | Mục đích |
|---|---|---|---|
| Memory cache | Biến trong RAM của server function | 8 phút | Giảm số lần fetch RSS khi cùng 1 instance xử lý nhiều request liên tiếp (warm start) |
| Tmp cache | `/tmp/ai-news-cache.json` trên serverless instance | 8 phút (dùng lại), không giới hạn khi làm fallback | Fallback khi toàn bộ nguồn RSS lỗi |
| CDN cache (Vercel Edge) | Do Vercel quản lý, theo header `Cache-Control` | `s-maxage=600` (10 phút) | Cơ chế "auto refresh" thực tế cho người dùng thật |
| localStorage | Trình duyệt người dùng, key `aiNewsLocalCache` | Không hết hạn (ghi đè mỗi lần fetch thành công) | Hàng rào cuối — trang không bao giờ trắng |

**Lưu ý về `/tmp` và memory cache:** đây là serverless (mỗi request có thể chạy
trên instance khác nhau, "cold start" xoá sạch RAM/`/tmp`), nên 2 lớp cache đầu
**không đảm bảo bền vững 100%** giữa các lần cold start — chúng chỉ tăng tốc và
làm fallback tạm thời. Lớp cache thật sự đáng tin cậy để "không bao giờ trắng
trang" là **localStorage phía client** và **CDN cache của Vercel**.

---

## 6. Tần suất refresh thực tế
- Với người dùng thật (có traffic): **~10 phút/lần** nhờ CDN `s-maxage=600`.
- Với cron (Vercel Hobby): **1 lần/ngày**, chỉ để làm nóng cache, không phải cơ
  chế refresh chính.
- Không có gì chạy "mỗi 5–15 phút" theo đúng nghĩa polling liên tục — vì Vercel
  Hobby không hỗ trợ điều đó cho cron. Đã tuân thủ đúng yêu cầu "không giả vờ".

## 7. Giới hạn do Vercel (Hobby plan)
- Cron: tối đa 1 lần/ngày.
- Thời gian chạy 1 function: đã giới hạn `maxDuration: 10` giây trong
  `vercel.json` (an toàn trong hạn mức Hobby). Với 10 nguồn fetch song song,
  timeout mỗi nguồn 8 giây, tổng thời gian chạy thực tế thường dưới 8-9 giây.
- Không có database — vì vậy không dùng cache bền vững kiểu KV/Redis, mà dùng
  chiến lược 4 lớp ở mục 4-5.

---

## 8. Cách kiểm tra sau khi deploy lên Vercel

```bash
# 1. Kiểm tra endpoint chính trả về đúng dữ liệu
curl "https://<domain-cua-ban>/api/ai-news?limit=5"
# → phải thấy "ok": true và 5 item, mỗi item có publishedAt/url/title/source

# 2. Kiểm tra publishedAt có phải tin gần đây không
curl "https://<domain-cua-ban>/api/ai-news?limit=5" | grep publishedAt

# 3. Gọi lại lần 2 ngay sau đó — vì có cache 10 phút nên 2 lần gọi liên tiếp
#    thường trả CÙNG danh sách, đó là đúng, không phải bug.
#    Để test dedupe thực sự: đợi >10 phút rồi gọi lại, so sánh "id" các bài mới
#    với các bài cũ, không được trùng "id".

# 4. Kiểm tra lọc theo category
curl "https://<domain-cua-ban>/api/ai-news?category=research&limit=5"

# 5. Kiểm tra cron endpoint chạy được
curl "https://<domain-cua-ban>/api/cron-refresh"
# → xem field "sources" để biết nguồn nào ok:true/false lúc đó

# 6. Test "1 nguồn lỗi không hỏng nguồn khác":
#    xem field "sources" trong response — nếu có nguồn nào ok:false,
#    các nguồn ok:true khác vẫn phải có count > 0 và "items" vẫn có dữ liệu.
```

Trên giao diện:
1. Vào trang, bấm menu **"🗞️ AI News"**.
2. Tin phải hiện ra (loading ngắn rồi có card), sắp xếp mới → cũ.
3. Gõ vào ô tìm kiếm, bấm các nút lọc (All/AI News/Research/AI Tools/Companies/
   Technology) — danh sách phải lọc đúng.
4. Bấm "Đọc tiếp" trên 1 bài → phải mở đúng bài viết gốc ở tab mới.
5. Test fallback: tắt mạng trình duyệt (DevTools → Network → Offline), tải lại
   trang, vào lại mục AI News → nếu trước đó đã từng tải thành công 1 lần, tin
   cũ (kèm badge "Bản lưu gần nhất") vẫn phải hiện ra, không trắng trang.

---

## 9. Các phần KHÔNG bị thay đổi
Theo đúng yêu cầu, chỉ sửa AI News + API/cron liên quan. Đã kiểm tra không đụng
tới: Space AI, Future Lab, AI Directory, AI Detail, Prompt Library, AI Battle,
AI Quiz, Trending AI, Analytics (GA4) — toàn bộ các section này vẫn nguyên vẹn
trong `index.html`/`script.js`.

## 10. Danh sách file đã thêm/sửa
**Thêm mới:**
- `api/_lib/news.js` — logic tổng hợp RSS dùng chung
- `api/ai-news.js` — endpoint `GET /api/ai-news`
- `api/cron-refresh.js` — endpoint `GET /api/cron-refresh`
- `ai-news.css` — style cho section AI News
- `ai-news.js` — logic frontend (fetch, search, filter, cache, render)

**Đã sửa (chỉ thêm, không xoá gì của phần cũ):**
- `index.html` — thêm link nav + section AI News + include CSS/JS
- `script.js` — thêm biến section/toggle + đăng ký vào `showSection()`
- `translations.js` — thêm các key `ai_news_*`, `nav_ai_news` (vi + en)
- `vercel.json` — thêm `crons` + `functions.maxDuration`
