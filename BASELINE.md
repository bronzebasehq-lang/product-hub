# BASELINE — Day 1 (2026-09-29)

> "Một baseline. Lưu ảnh/số 0 ngày đầu để sau 90 ngày không tranh luận bằng trí nhớ."
> — Kế hoạch 90 ngày Product Hub, gói việc 72 giờ đầu · Ngày 1

## Trạng thái

- Site tĩnh dựng xong (Ngày 1+2): 10 URL, deploy được ngay lên GitHub/Cloudflare/Netlify free.
- **Chưa deploy** — đang chạy local preview. Chưa submit Search Console.
- **Chưa có analytics thật** — 4 event chỉ log ra console (TODO Plausible/GA4 trong `assets/js/main.js`).
- **Chưa có installer** — CTA duy nhất toàn site là waitlist (đúng kế hoạch).
- **Chưa gắn Google Form** — xem `HUONG-DAN-WAITLIST.md` (việc của Minh, 2 phút).

## Số liệu ngày 0 (tất cả = 0)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| Impressions (Search Console) | 0 | chưa cài SC |
| Clicks | 0 | — |
| sample_play | 0 | event đã gắn, chờ traffic thật |
| download_click (CTA) | 0 | CTA = waitlist |
| **waitlist_submit (conversion chính)** | 0 | form UI-only, chờ Google Form |
| outbound_github_click | 0 | — |
| Bài blog đã publish | 0 | Bài 01 là scaffold, publish Ngày 3 |

## Mô tả các trang (không chụp được screenshot — môi trường không có headless browser)

Đã kiểm tra bằng cách đọc toàn bộ file HTML + curl local server (200 OK toàn bộ):

1. **`/` (home)** — Hero: "CleanTake / Clean recorded speech locally — no upload." 3 bước how-it-works, khung "Honest scope" (làm được / không làm được), section local-first, trạng thái private testing + CTA waitlist.
2. **`/cleantake/`** — Player A/B: 2 tab BEFORE/AFTER chuyển qua lại, `<audio>` cho 2 file mp3 thật, bảng sample-meta (loại ồn, ngày test 2026-09-28, ≈32dB, pipeline), khung "What this demo does NOT prove", sơ đồ pipeline, CTA waitlist. Schema SoftwareApplication.
3. **`/waitlist/`** — Form Name/Email + validate client-side, message thành công, slot embed Google Form viền đứt nét + comment hướng dẫn vị trí dán iframe, khung "Is CleanTake for you?".
4. **`/docs/install/`** — Thành thật: chưa có installer, mô tả kế hoạch Windows, "never" list, macOS/Linux chưa có.
5. **`/docs/use/`** — 3 bước drop→clean→take, sơ đồ pipeline, good/bad inputs.
6. **`/docs/limits/`** — Trang giới hạn trung thực: bảng tested configurations (café 4 giọng = ❌ fail có ghi nhận).
7. **`/privacy/`** — Local-first by architecture; website thu gì; "what we haven't audited".
8. **`/changelog/`** — v0.1.0 (2026-09-28) + "Up next" (batch, preset, installer).
9. **`/blog/`** — Index, bài 01 ở trạng thái draft.
10. **`/blog/free-local-audio-denoiser/`** — Scaffold + Article schema + HTML comment checklist trước khi publish.

## Quyết định đã khóa (Ngày 1)

- One-liner: **"Clean recorded speech locally — no upload."**
- Một CTA duy nhất: **waitlist** (chưa có installer).
- 4 event: sample_play, download_click, **waitlist_submit (conversion chính)**, outbound_github_click.
- Định vị hẹp lặp lại mọi trang: ồn môi trường cho file đã thu; KHÔNG tách giọng chồng lấn; KHÔNG real-time.
