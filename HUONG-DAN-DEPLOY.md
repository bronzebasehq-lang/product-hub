# Hướng dẫn deploy + Search Console + Analytics (Product Hub)

> Tài liệu cho Minh. Rio đã chuẩn bị hết phần kỹ thuật — Minh chỉ làm các bước cần **tài khoản của chính Minh** (Rio không dùng tài khoản cá nhân của mình, cũng không mua domain).
> Các bước UI dưới đây Rio đã kiểm tra lại ngày 2026-09-30, không viết từ trí nhớ cũ.

---

## Việc 1: Chọn nơi host web (chọn 1 trong 2)

### Phương án A — Cloudflare Pages (Rio khuyên dùng)

Vì sao: web đã được viết sẵn với địa chỉ `cleantake.pages.dev`, host ở đây thì không phải sửa gì thêm. Miễn phí, không cần thẻ ngân hàng, mỗi lần cập nhật code là web tự deploy lại.

**Minh làm (khoảng 15 phút):**

1. Vào **dash.cloudflare.com/sign-up**, đăng ký tài khoản bằng email (không cần thẻ).
2. Bảo Rio: "chọn Cloudflare Pages". Rio sẽ nén toàn bộ code web gửi cho Minh (1 file zip).
3. Minh tạo tài khoản **GitHub** (github.com → Sign up) nếu chưa có, rồi tạo repository mới: vào **github.com/new** → tên gợi ý `product-hub` → chọn **Public** → **Create repository** (không tick thêm gì). ⚠️ Lưu ý: GitHub web KHÔNG tự bung file zip, nên có 2 cách đưa code lên:
   - **Cách 1 (khuyên dùng):** tạo Personal Access Token cho Rio quyền push — Rio gửi link nhập an toàn, Minh paste token vào đó (Rio không bao giờ thấy token). Rio push code thẳng lên repo, sau này update cũng push giùm, Minh không đụng gì nữa.
   - **Cách 2 (tự làm):** tải file zip của Rio về máy → **giải nén** → vào repo → link "uploading an existing file" → kéo thả TOÀN BỘ file/thư mục đã giải nén vào (kể cả thư mục ẩn `.github`).
4. Vào Cloudflare dashboard → menu trái **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git** → cho phép Cloudflare đọc GitHub → chọn repo `product-hub` → **Begin setup**.
5. Điền build settings đúng như sau:
   - **Project name:** `cleantake` (để được địa chỉ `cleantake.pages.dev`)
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** để trống
   - **Build output directory:** `/`
6. Bấm **Save and Deploy**. Khoảng 30 giây sau web sẽ live tại `https://cleantake.pages.dev` — mở lên kiểm tra.

Từ nay mỗi lần Rio sửa web, Minh chỉ cần upload file mới lên GitHub repo → Cloudflare tự deploy lại.

### Phương án B — GitHub Pages (qua GitHub Actions)

Vì sao: không cần tạo tài khoản Cloudflare, mọi thứ nằm gọn trong GitHub. Nhược điểm: địa chỉ sẽ là `<tên>.github.io/product-hub/` (xấu hơn, và phải sửa lại địa chỉ trong code — Rio làm giúp).

**Minh làm:**

1. Tạo tài khoản GitHub, tạo repo `product-hub`, upload file zip của Rio (giống bước 2–3 phương án A). File `.github/workflows/deploy.yml` Rio đã viết sẵn trong zip.
2. Vào repo → **Settings** → menu **Pages** → mục **Build and deployment** → **Source** chọn **GitHub Actions**.
3. Upload lại / push 1 thay đổi bất kỳ lên nhánh `main` → workflow tự chạy → web live tại `https://<tên-github>.github.io/product-hub/`.
4. Báo Rio địa chỉ mới để Rio cập nhật lại toàn bộ link trong code.

---

## Việc 2: Google Search Console (sau khi web đã live)

Để Google biết web tồn tại và báo cho Minh khi có lỗi index. Cần đăng nhập Google (tài khoản nào cũng được).

**Minh làm (khoảng 10 phút):**

1. Vào **search.google.com/search-console** → đăng nhập Google.
2. Bấm **Add property** (hoặc menu dropdown góc trái) → chọn **URL prefix** (KHÔNG chọn Domain) → nhập đúng địa chỉ web (vd `https://cleantake.pages.dev`) → **Continue**.
3. Google hiện các cách xác minh — chọn tab **HTML tag**. Google sẽ đưa 1 dòng meta tag, trông như:
   `<meta name="google-site-verification" content="abc123..." />`
4. **Copy nguyên dòng đó gửi cho Rio.** Rio sẽ gắn vào web và deploy lại (Minh không cần đụng vào file).
5. Quay lại Search Console → bấm **Verify**. Hiện "Ownership verified" là xong.
6. Sau khi verify: menu trái **Sitemaps** → ô "Add a new sitemap" nhập `sitemap.xml` → **Submit**.
7. (Khuyên làm) Menu **URL Inspection** → nhập từng địa chỉ quan trọng (`/`, `/cleantake/`, `/blog/free-local-audio-denoiser/`) → bấm **Request indexing** để Google crawl sớm.

> Cách khác (nếu Minh thích): tab **HTML file** → tải file `googleXXXX.html` về → gửi file cho Rio → Rio đặt ở thư mục gốc web → Minh bấm Verify. Kết quả như nhau.

---

## Việc 3: Bật Analytics thật (Google Analytics 4 — miễn phí)

Web đã có sẵn code đo 4 sự kiện (`sample_play`, `download_click`, `waitlist_submit`, `outbound_github_click`) nhưng đang **tắt** — chưa gửi đi đâu cả. Để bật:

**Minh làm (khoảng 10 phút):**

1. Vào **analytics.google.com** → đăng nhập Google → **Start measuring** (hoặc Admin → Create → Account).
2. Tạo Account (tên gợi ý: `Bronze Base`) → tạo Property (tên gợi ý: `CleanTake Hub`) → chọn platform **Web** → nhập URL web → tạo **Data Stream**.
3. Google sẽ hiện **Measurement ID** dạng `G-XXXXXXXXXX`. **Copy gửi cho Rio.**
4. Rio gắn ID vào web (1 dòng) và deploy lại. Từ đó mọi sự kiện tự chảy về GA4.
5. Kiểm tra: mở web → bấm play file demo → vào GA4 → **Reports → Realtime** → thấy sự kiện `sample_play` hiện lên là thành công.

> Không gửi email thật của người dùng đi đâu: sự kiện `waitlist_submit` chỉ ghi lại phần domain email (vd `gmail.com`), không ghi địa chỉ đầy đủ.

---

## Tóm tắt việc cần Minh

| # | Việc | Minh làm gì | Rio đã chuẩn bị |
|---|------|-------------|-----------------|
| 1 | Chọn hosting | Chọn A hoặc B, tạo tài khoản Cloudflare/GitHub, upload zip | Code web xong, file deploy.yml viết sẵn |
| 2 | Search Console | Add property → copy meta tag gửi Rio → Verify → Submit sitemap | Sẵn sàng gắn tag/file xác minh |
| 3 | Analytics | Tạo GA4 property → gửi Measurement ID cho Rio | Code 4 sự kiện viết sẵn, tắt mặc định |

Không mua domain, không trả phí gì ở cả 3 việc.
