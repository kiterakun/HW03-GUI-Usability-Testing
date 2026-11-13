# Hướng dẫn cho người tham gia — Usability Testing EShop Web Admin

> **Mã phiên của bạn: ______** (điền tay hoặc do người tổ chức cung cấp)

---

## 1. Bạn đang làm gì?

Chúng tôi muốn biết **trang quản trị EShop có dễ dùng với người quản lý shop thật hay không**. Bạn sẽ
dùng trang quản trị để làm vài việc quen thuộc (xem tình hình shop, thêm/sửa/xóa danh mục và sản
phẩm) và **nói to suy nghĩ của bạn** trong lúc làm.

**Điều quan trọng nhất:** chúng tôi đang kiểm tra **sản phẩm**, **không phải kiểm tra bạn**.
Bất kỳ điều gì bạn thấy khó hiểu, lạ, hoặc làm bạn bực bội — đều là thông tin chúng tôi rất cần. Cứ nói
thẳng, đừng ngại.

---

## 2. Bạn cần chuẩn bị gì?

| # | Mục | Ghi chú |
|---|---|---|
| 1 | **Máy tính** (laptop/desktop) | Trình duyệt Chrome hoặc Edge bản mới |
| 2 | **Công cụ quay màn hình** | OBS Studio (miễn phí) hoặc ShareX (Windows) — tải trước, mở thử một lần để chắc chắn quay được |
| 3 | **File bảng hỏi** | `responses-template.csv` (điền bằng Excel hoặc Notepad) |
| 4 | **File ghi chú** | `ghi-chu-template.md` — đây là nơi bạn **gõ bằng chữ** mọi suy nghĩ, chỗ bị kẹt và trả lời các câu hỏi mở |

> **Không cần cài gì thêm. Không cần mic, không cần thiết bị ghi âm nào.**
> Trang quản trị chạy sẵn ở `http://localhost:5174`.
> *(Nếu máy bạn có mic và bạn muốn nói to suy nghĩ, video sẽ tự thu được tiếng — nhưng không bắt buộc.
> Ghi bằng chữ vào `ghi-chu.md` là đủ.)*

---

## 3. Quy trình thực hiện

### Bước 1 — Bật quay màn hình (LÀM TRƯỚC khi mở trình duyệt)

Mở OBS Studio (hoặc ShareX) → bấm **Bắt đầu ghi** → chọn vùng ghi là **toàn bộ màn hình**.

### Bước 2 — Đọc phần mở đầu

Sau khi bật quay, hãy **nói to** (để người thu phiên nghe được trong file ghi):

> "Cảm ơn bạn đã tham gia. Tôi đang kiểm tra **sản phẩm**, không phải kiểm tra bạn. Bất kỳ điều gì
> bạn thấy khó hiểu hay lỗi đều là thông tin quý giá với chúng tôi. Tôi sẽ im lặng và chỉ ghi chú,
> nhưng nếu bạn bị kẹt hoàn toàn thì tôi sẽ giúp một tay — lúc đó tôi sẽ báo bạn."
>
> "Yêu cầu chung: **hãy nói thành tiếng mọi suy nghĩ**. Bạn không cần xin phép tôi để nói. Nếu chỗ
> nào làm bạn thấy lạ, hơi sai, hoặc bạn không chắc phải làm gì — hãy nói ra ngay tại lúc đó."

### Bước 3 — Warm-up (2–3 phút)

Trả lời bằng lời nói:

1. Bạn đã dùng EShop ở vai trò admin ở đâu, dùng bao lâu rồi?
2. Bạn đã từng quản lý sản phẩm trên trang quản trị nào khác chưa (Shopee, Facebook Shop…)?

### Bước 4 — Làm 4 nhiệm vụ

Mở trình duyệt, vào `http://localhost:5174`.

> **Trong lúc làm nhiệm vụ:**
> - ❌ **Đừng** mở DevTools, **đừng** xem mã nguồn, **đừng** tra Google, **đừng** xem lại file hướng dẫn này.
> - ✅ Hãy làm như một người quản trị shop thật sự — nếu bạn làm thật mà vẫn bị vướng, thì đó chính là
>   điều chúng tôi cần biết.
> - ✅ **Ghi lại suy nghĩ của bạn vào `ghi-chu.md`** khi bạn bị kẹt hoặc thấy chỗ lạ (không cần dừng
>   lại lâu — ghi nhanh một dòng là được). Nếu máy có mic đang bật, bạn cũng có thể **nói to** suy nghĩ
>   — video sẽ tự thu được tiếng, không cần thiết bị ghi âm riêng.

Đọc và làm lần lượt theo thứ tự sau (mỗi nhiệm vụ có sẵn ở `02-task-scenarios.md`, bản rút gọn cho
bạn nằm ở §4 bên dưới).

**Sau mỗi nhiệm vụ:** điền kết quả & thời gian vào bảng **Phần D** trong `responses-template.csv`.

### Bước 5 — Bảng hỏi (10–12 phút)

Mở `responses-template.csv` và điền:

- **Phần A** — thông tin nền (8 câu, chọn 1 ô)
- **Phần B** — SUS, 10 câu thang 1–5
- **Phần C** — UEQ-S, 26 câu thang 1–7
- **Phần D** — kết quả & thời gian 4 nhiệm vụ
- **Phần F** — 6 câu tùy chỉnh, thang 1–5

> **Điền bằng cách nào:** mở file bằng Excel/Google Sheets → điền số vào đúng ô. Nếu dùng Notepad,
> mỗi câu một dòng theo đúng thứ tự cột trong file. Cột đầu tiên `participant_id` điền mã phiên của bạn.
>
> **Ô nào không trả lời thì để trống** — đừng đoán. Ô trống là dữ liệu hợp lệ.

### Bước 6 — Câu hỏi mở (probe) — viết tay, 8–12 phút

Mở file `ghi-chu.md` (bản mẫu đã gửi kèm), tìm mục **"6. Trả lời câu hỏi mở (E1–E11)"**, và **gõ
câu trả lời của bạn** vào từng dòng, bắt đầu bằng mã câu:

```
E1: ...
E2: ...
E3: ...
```

Danh sách 11 câu nằm ở **Phần E** trong `questionnaire-for-participant.md`. Trả lời dài, đừng ngắn.
Nếu câu nào không áp dụng với phiên của bạn, ghi rõ "không áp dụng" — đó cũng là dữ liệu hợp lệ.

### Bước 7 — Gửi lại

Gửi lại cho người tổ chức:

1. **File video** ghi màn hình (định dạng `.mp4` / `.mkv`)
2. **`responses-template.csv`** đã điền
3. **`ghi-chu.md`** đã điền (gồm chỗ bị kẹt, trả lời E1–E11, và ghi chú tự do)

---

## 4. Nội dung 4 nhiệm vụ (rút gọn — đọc nguyên văn, không diễn giải)

> **Nhiệm vụ 1 — Đăng nhập (FR-12)**
>
> Bạn đang muốn quản lý sản phẩm trong cửa hàng EShop của mình. Trang quản trị nằm ở
> `http://localhost:5174`. Tài khoản quản trị của bạn là **admin@eshop.com / Admin123!**
>
> Hãy làm theo thứ tự sau:
> 1. Trước tiên **thử đăng nhập sai** một lần — dùng một mật khẩu bạn tự nghĩ ra (ví dụ `123456`).
> 2. Sau đó **đăng nhập bằng tài khoản user thường**: `test@eshop.com` / `Test1234!`
> 3. Cuối cùng **đăng nhập đúng** bằng tài khoản quản trị để vào được hệ thống.
>
> ---
>
> **Nhiệm vụ 2 — Dashboard (FR-13)**
>
> Bạn vừa vào được trang quản trị. Đây là Dashboard — màn hình đầu tiên bạn thấy mỗi khi mở trang quản
> trị. Bạn cần biết shop mình đang kinh doanh tình hình thế nào.
>
> Hãy cho biết bằng lời: **trên Dashboard này đang hiển thị những thông tin gì, và con số nào là doanh
> thu của shop?** Chỉ cần quan sát và giải thích — không cần bấm vào tab nào khác. Hãy nói rõ "doanh
> thu" ở đây được tính từ những đơn hàng nào theo bạn hiểu.
>
> ---
>
> **Nhiệm vụ 3 — Danh mục (FR-14)**
>
> Bạn đang muốn tổ chức lại danh mục sản phẩm của shop. Ví dụ bạn vừa bổ sung một nhóm sản phẩm mới
> và cần đưa nhóm đó vào hệ thống, đồng thời dọn một nhóm không còn dùng.
>
> Hãy làm 3 việc trên trang quản lý Danh mục, theo đúng thứ tự:
> 1. **Tạo** một danh mục mới tên **`Giày dép`** (ghi đúng chính tả, không thêm mô tả).
> 2. **Đổi tên** danh mục đó thành **`Giày dép & Dép`**.
> 3. **Xóa** danh mục vừa đổi tên đó đi.
>
> Làm theo thứ tự trên. Đây là các thao tác thật sự trên hệ thống — hãy cứ thực hiện, dữ liệu sẽ được
> khôi phục lại sau phiên test.
>
> **Nếu bạn không tìm được cách nào để đổi tên** (bước 2), đừng dừng lại vì vậy — hãy **ghi vào
> `ghi-chu.md`** rằng bạn đã thử những gì và không thấy cách nào, rồi **làm tiếp bước 3**.
>
> ---
>
> **Nhiệm vụ 4 — Sản phẩm (FR-15)**
>
> Shop của bạn vừa nhận thêm mẫu mới. Bạn cần đưa mẫu đó lên bán, và cập nhật lại thông tin cho một
> mẫu cũ đang bán chạy.
>
> Hãy làm 2 việc trên trang quản lý Sản phẩm:
> 1. **Tạo** một sản phẩm mới:
>    - Tên: **`Áo khoác dạ`**
>    - Giá: **`450000`** (đơn vị ₫)
>    - Mô tả: **`Áo khoác dạ giữa ấm mùa đông`** (tuỳ chọn)
>    - Ảnh: **để trống** (không bắt buộc)
>    - Danh mục: **`Phụ kiện`**
> 2. **Sửa** sản phẩm **`Tai nghe AirPods Pro 2`** (đang có sẵn trong bảng) để đổi tên thành
>    **`Tai nghe AirPods Pro 2 (Gen 2)`** và đổi giá thành **`5990000`**.
>
> Điều quan trọng là bạn **có nhập được đủ thông tin bắt buộc** hay không, và bạn **nhận biết được**
> khi nào hệ thống báo thiếu gì.

---

## 5. Nếu bạn bị kẹt

Bạn **không cần** tự tra cứu bằng Google hay đọc mã nguồn. Nếu bị kẹt hơn 2–3 phút:

1. Ghi vào file `ghi-chu.md`: "Bị kẹt ở bước … lúc … phút" (mục 1 của file đó).
2. Nếu muốn, nói to: "Tôi bị kẹt ở đây, không biết làm gì tiếp." — hoặc chỉ cần ghi chữ là đủ.
3. **Bỏ qua nhiệm vụ đó** và làm tiếp nhiệm vụ còn lại.

Đây **không phải** lỗi của bạn — bị kẹt chính là dữ liệu chúng tôi cần.

---

## 6. Quyền riêng tư

- Bản ghi **màn hình** (và tiếng nói nếu máy bạn có mic đang bật — hoàn toàn tùy chọn) chỉ dùng cho
  **mục đích nghiên cứu khả dụng** trong học phần.
- Bạn có thể **rút lại** và yêu cầu xoá bản ghi bất kỳ lúc nào.
- Thông tin liên hệ của bạn được **che 4 số giữa** khi đưa vào báo cáo.
- Bạn **không** bị đánh giá năng lực — chỉ sản phẩm mới được đánh giá.

Cảm ơn bạn đã tham gia!
