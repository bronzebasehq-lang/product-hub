# Hướng dẫn: gắn Google Form vào trang /waitlist (2 phút)

> Trang waitlist hiện tại chỉ có form giao diện (chưa lưu được email thật vì site chưa có backend).
> Làm theo 3 bước dưới đây để thu email thật qua Google Form — miễn phí, không cần code.

## Bước 1 — Tạo form (2 phút)

1. Vào [forms.google.com](https://forms.google.com) (đăng nhập Gmail của bro).
2. Bấm **Blank form** → đặt tên: `CleanTake Waitlist`.
3. Thêm 2 câu hỏi:
   - **Name** — Short answer, **không bắt buộc** (Required: tắt).
   - **Email** — Short answer, **bắt buộc** (Required: bật). Bấm ⋮ → **Response validation** → chọn **Text → Email** để Google tự kiểm tra email hợp lệ.
4. Tab **Settings** → mục **Collect email addresses** (giờ là dropdown) → chọn **Off** (mình đã hỏi email trong form rồi, không cần thu 2 lần).

## Bước 2 — Xuất bản (Publish) form — BẮT BUỘC (giao diện mới 2026)

> Google đã bỏ nút **Send** cũ, thay bằng nút **Publish**. Form chưa publish thì người khác mở link chỉ thấy trang trắng.

1. Bấm nút **Publish** (góc phải trên).
2. Chọn **Anyone with the link** (ai có link cũng trả lời được) → bấm **Publish** → nút chuyển thành **Published**.

## Bước 3 — Lấy mã nhúng

1. Bấm menu **⋮** (ba chấm, góc phải trên) → chọn **Embed HTML**.
2. Copy đoạn `<iframe ...>...</iframe>`.
3. ⚠️ Chiều cao mặc định thường quá thấp làm form bị cắt — tăng `height` lên khoảng `800`–`1000`.

## Bước 4 — Gửi iframe cho Rio dán giùm (10 giây)

File `waitlist/index.html` nằm trên máy của Rio nên bro không mở trực tiếp được — đừng tìm file.

👉 **Copy đoạn `<iframe ...>...</iframe>` vừa lấy, paste thẳng vào chat gửi Rio. Rio dán giùm vào đúng chỗ.**

## Kiểm tra

- Mở `/waitlist/` → điền thử 1 email → bấm Submit trên Google Form → vào Google Form tab **Responses** xem có ghi nhận không.
- Event `waitlist_submit` trong `assets/js/main.js` hiện chỉ log ra console. Khi form Google đã live, lượt submit thật nằm trong tab Responses của Google — đó là số liệu conversion chính cho tới khi gắn analytics thật.

## Lưu ý

- Đừng bật "Limit to 1 response" nếu muốn người dùng không cần đăng nhập Google.
- Mọi email thu được chỉ dùng để gửi **1 mail duy nhất** khi CleanTake public (đúng như đã hứa trên trang).
