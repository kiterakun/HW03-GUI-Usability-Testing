# Báo cáo pilot — Dry-run kỹ thuật (2026-11-13)

> ⚠️ **ĐÂY KHÔNG PHẢI PHIÊN NGƯỜI THAM GIA THẬT.**
> Đây là **dry-run kỹ thuật**: AI tự đóng vai người dùng trên SUT thật để **kiểm chứng tính khả thi
> của kịch bản** (task có thực sự làm được không, tiêu chí thành công có đo được không, môi trường
> có chuẩn bị đúng không) và **xác minh các nghi vấn lỗi chức năng** đọc được từ mã nguồn.
>
> **Dữ liệu ở file này KHÔNG được tính vào điểm SUS/UEQ-S, KHÔNG được đếm là 1 phiên, KHÔNG thay
> thế cho phiên pilot với người thật.** Phiên pilot người thật vẫn còn thiếu (xem §6).

| Trường | Nội dung |
|---|---|
| Ngày | 2026-11-13 |
| Người thực hiện | AI (OpenCode / MiniMax M3.1 Flash) |
| Hình thức | Playwright + Chromium headless, tự động hóa thao tác giống người dùng |
| SUT | `eshop-sut` commit `85af3ba` · Admin `:5174` · API `:3000` |
| Script | `pilot-run/pilot-dryrun.js` · `pilot-run/check-price.js` |
| Log đầy đủ | `pilot-run/pilot-log.md` |
| Ảnh chụp | `pilot-run/screenshots/` (20 ảnh) |

---

## 1. Kết quả theo từng task

| Task | FR | Kịch bản có khả thi? | Ghi chú |
|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ Có | Cả 3 nhánh (sai mật khẩu / user thường / đúng) đều chạy được và đều trả về `alert()` |
| T1 — Dashboard | FR-13 | ⚠️ Có, **nhưng cần dữ liệu** | Chỉ đo được sau khi seed đơn hàng — xem §3 |
| T2 — Danh mục | FR-14 | ❌ **Một phần** | Bước "đổi tên" **không tồn tại trong UI** → cần sửa tiêu chí — xem §2.1 |
| T3 — Sản phẩm | FR-15 | ⚠️ Có, **nhưng tiêu chí sai** | Bước "dán URL ảnh" không làm được (bảng không hiện URL) + giá sửa không hiển thị — xem §2.2, §2.3 |

---

## 2. Lỗi KỊCH BẢN phải sửa (3 lỗi)

### 2.1 [T2 — nghiêm trọng] Bước "đổi tên danh mục" không tồn tại trong UI

**Quan sát:** header bảng Danh mục = `["ID", "Tên Danh Mục", "Hành động"]`; các nút trong dòng =
`["Xóa"]` — **không có nút Sửa**. Bấm vào ô tên → không xuất hiện ô nhập (`contenteditable`/`input`
= 0 phần tử). FR-14 chỉ yêu cầu Thêm/Xem/**Xóa**, nên đây **không phải bug** — nhưng kịch bản cũ yêu
cầu người tham gia "đổi tên", tức là yêu cầu một việc hệ thống không hỗ trợ.

**Hậu quả nếu không sửa:** tiêu chí thành công của T2 ("bảng hiển thị `Giày dép & Dép`") **không bao
giờ đạt được** → TCR của T2 luôn = 0% → tín hiệu vô nghĩa, che mất chất lượng thật của phần
Thêm/Xóa.

**Cách sửa đã áp dụng:** tách tiêu chí T2 thành 2 phần —
- **Tiêu chí thành công (TCR đo được):** tạo được `Giày dép` **và** xóa được nó.
- **Chỉ số phụ "mức độ chặn" (đo riêng, không tính vào TCR):** người tham gia có nhận ra mình **không
  thể đổi tên** không, và họ làm gì tiếp (tự tạo danh mục mới rồi xóa cái cũ / bỏ qua / hỏi).

### 2.2 [T3 — nghiêm trọng] Bước "dán URL ảnh" không làm được

**Quan sát:** bảng sản phẩm chỉ hiển thị **thumbnail 48×48**, **không có ô nào hiện URL ảnh**. Không có
cách nào để người tham gia biết URL cần dán, và mở DevTools bị cấm trong kịch bản.

**Hậu quả nếu không sửa:** người tham gia bị kẹt ở một bước **không liên quan** tới giả thuyết nghiên
cứu → nhiễu tín hiệu, tăng thời gian phiên, tạo điểm nhiễm giả.

**Cách sửa đã áp dụng:** kịch bản mới ghi *"Ảnh: để trống"* (ảnh không bắt buộc theo FR-15).

### 2.3 [T3 — nghiêm trọng] Tiêu chí "giá hiển thị 5990000" không thể đạt

**Quan sát:** người dùng nhập giá `5990000` và bấm Lưu → hệ thống báo "Cập nhật thành công!", nhưng
**UI vẫn hiển thị `6000000 ₫`** ở dòng vừa sửa. Kiểm tra DB: giá **đã** được cập nhật đúng `5990000`.
→ Đây là lỗi hiển thị của sản phẩm, **không phải lỗi của người dùng**.

**Hậu quả nếu không sửa:** người tham gia bị đánh dấu "không hoàn thành" dù họ đã làm đúng.

**Cách sửa đã áp dụng:** bỏ tiêu chí "giá hiển thị đúng" khỏi điều kiện thành công của T3; thay bằng
tiêu chí mà người dùng kiểm soát được (tạo mới đúng giá/danh mục + hệ thống báo thành công), và đưa
việc "giá không cập nhật trên UI" + "tên mọi sản phẩm bị đổi" thành **chỉ số nhận thức** đo riêng.

---

## 3. Lỗi MÔI TRƯỜNG phải sửa (1 lỗi — nghiêm trọng, chặn được cả M1)

### 3.1 Thứ tự seed đơn hàng sai → Dashboard luôn rỗng

**Quan sát:** lần chạy đầu tiên, sau khi `node database.js` + `node seed-orders.js`, Dashboard hiển thị
`0 ₫` và `0` đơn. Truy ra nguyên nhân: `backend/database.js` chạy `initDatabase()` **ngay khi được
`require`** — nghĩa là `require('./database')` trong `server.js` sẽ **DROP và tạo lại toàn bộ bảng**
mỗi lần khởi động server. `seed-orders.js` cũng `require('./database')` → cùng vấn đề.

**Hậu quả:** nếu không sửa, **mọi phiên đều có Dashboard rỗng** → T1 (FR-13) không đo được → mất
trọn vòng M1.

**Cách sửa đã áp dụng:**
1. `seed-orders.js` viết lại — mở trực tiếp `database.sqlite` bằng `sqlite3`, **không** `require('./database')`.
2. `reset-db.ps1` viết lại — thứ tự bắt buộc: **xoá DB → start server → seed-orders → kiểm tra**.
3. `02-task-scenarios.md` §5 cập nhật lại quy trình cho khớp.

**Xác minh sau khi sửa:** Dashboard hiển thị `6,400,000 ₫` và `5` đơn. ✅

---

## 4. Xác minh các nghi vấn lỗi chức năng (đọc từ mã nguồn)

| # | Nghi vấn | Kết quả dry-run | Bằng chứng |
|---|---|---|---|
| 1 | Sửa 1 sản phẩm → **tên của mọi sản phẩm** bị đổi (vi phạm FR-15) | ✅ **Xác nhận** | 5/5 dòng đều đổi thành `Tai nghe AirPods Pro 2 (Gen 2)`. `App.jsx:110-114` |
| 2 | Dashboard nhân đôi doanh thu (vi phạm FR-13) | ✅ **Xác nhận** | Hiển thị `6,400,000 ₫`, giá trị đúng = `3,200,000 ₫`. `App.jsx:217-220` |
| 3 | Xóa danh mục/sản phẩm không có dialog xác nhận (vi phạm FR-24) | ✅ **Xác nhận** | Không có dialog `confirm` nào; dữ liệu xóa ngay |
| 4 | Lỗi dùng `alert()`, không có lỗi inline / không có loading (vi phạm FR-22, FR-24) | ✅ **Xác nhận** | 3 hộp thoại `alert()`; không có phần tử "Đang tải"/spinner nào trên trang |
| 5 | Form không có `<label>`, không có ký hiệu `*` (vi phạm FR-22) | ✅ **Xác nhận** | Form sản phẩm: 0 `<label>`, 1 field `required` (chỉ tên), 0 field có `*` |
| 6 | Giá không phân cách nghìn (vi phạm FR-21) | ✅ **Xác nhận** | Hiển thị `30000000 ₫`, `450000 ₫` — giá trị thô |
| 7 | Không có router / URL không đổi / không breadcrumb (vi phạm FR-23) | ✅ **Xác nhận** | URL luôn là `http://localhost:5174/`; breadcrumb = rỗng |
| 8 | Admin API không kiểm tra `role` (vi phạm FR-12/SEC-03) | ⚠️ Không kiểm được qua UI | UI chặn ở client (`App.jsx:65`). Chỉ kiểm được bằng API call trực tiếp → **test backend, ngoài phạm vi GUI** |
| 9 | **MỚI** — Giá âm được lưu thành công (vi phạm FR-15 "giá phải > 0") | ✅ **Xác nhận** | Nhập `-5000` → không có cảnh báo, sản phẩm được lưu; DB có `price = -5000` |
| 10 | **MỚI** — Sau khi sửa, giá mới không hiển thị lên UI | ✅ **Xác nhận** | Nhập `5990000` → UI vẫn hiện `6000000 ₫`; DB có `5990000` → lỗi hiển thị |
| 11 | **MỚI** — `img src=""` khi không nhập URL ảnh | ✅ **Xác nhận** | Console: `An empty string ("") was passed to the %s attribute ... src` |
| 12 | **MỚI** — Dashboard dùng định dạng `en-US` (`6,400,000`) thay vì `vi-VN` (`6.400.000`) | ✅ **Xác nhận** | `toLocaleString()` không truyền locale |
| 13 | **MỚI** — Trang Admin Login dùng tiếng Anh (`Admin Login`, `Email`, `Password`, `Login`) trong khi toàn hệ thống tiếng Việt (vi phạm FR-21) | ✅ **Xác nhận** | Ảnh `01-login-form.png` |

---

## 5. Điều chỉnh đã áp dụng cho kịch bản

| # | File | Thay đổi |
|---|---|---|
| 1 | `02-task-scenarios.md` — T2 | Tách tiêu chí thành công (TCR) và chỉ số phụ "mức độ chặn"; bỏ yêu cầu đổi tên khỏi tiêu chí |
| 2 | `02-task-scenarios.md` — T3 | "Ảnh: **để trống**" thay cho "dán URL ảnh"; bỏ tiêu chí "giá hiển thị 5990000"; thêm 2 chỉ số nhận thức |
| 3 | `02-task-scenarios.md` — §5 | Quy trình reset DB mới (xoá → start server → seed-orders → kiểm tra) |
| 4 | `02-task-scenarios.md` — §8 | Điền kết quả pilot này |
| 5 | `eshop-sut/backend/seed-orders.js` | Viết lại: mở DB trực tiếp, không `require('./database')` |
| 6 | `usability-testing-outputs/reset-db.ps1` | Viết lại theo thứ tự đúng |
| 7 | `03-questionnaire.md` — E8 | Bổ sung câu hỏi về **giá không cập nhật** sau khi sửa |
| 8 | `01-evaluation-plan.md` | Cập nhật tiêu chí T1/T2/T3 + rủi ro mới |

---

## 6. Việc còn lại

- [ ] **Phiên pilot với người thật** (1 người) — bắt buộc theo yêu cầu HW03. Dry-run kỹ thuật này
      **không thay thế** được phiên pilot người thật, vì nó không đo được phản ứng tâm lý, thời gian
      thực tế và độ khó hiểu của kịch bản từ góc nhìn người dùng.
- [ ] Sau phiên pilot người thật: cập nhật `02-task-scenarios.md` §8 (mục "Phiên pilot người thật"),
      rồi mới chạy 7 phiên.
