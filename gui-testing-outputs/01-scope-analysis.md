# 01 — Phân tích phạm vi kiểm thử GUI

| Trường | Nội dung |
|---|---|
| SUT | EShop — phân hệ **Web Admin** (`frontend-admin`) |
| URL / Repo | `http://localhost:5174` (Vite dev server) · API: `http://localhost:3000/api` · repo `D:\save\Learn\Test\HW03\eshop-sut` |
| Phiên bản / commit | `85af3ba` ("first upload") — React 19.2 + Vite 8 + Tailwind 3.4 |
| Người lập | AI (OpenCode / MiniMax M3.1 Flash) + người dùng review |
| Ngày | 2026-11-11 |

---

## 1. Câu trả lời của người dùng (nguyên văn hoặc tóm tắt)

> Ghi lại các câu hỏi đã hỏi và câu trả lời nhận được. Đây là bằng chứng cho thấy phạm vi do con
> người quyết định, không phải AI tự chọn.

**Câu hỏi 1 – Ứng dụng & môi trường:**
> "Đúng, dùng localhost:5174 + backend :3000, tài khoản admin chính xác là admin@eshop.com /
> Admin123!"
>
> *(Ghi chú của AI trước khi hỏi: `README.md:23` ghi `Admin123!` còn `setup_guide.md:105` ghi
> `admin123` — mâu thuẫn trong tài liệu. Người dùng xác nhận mật khẩu đúng là `Admin123!`.
> Mâu thuẫn tài liệu này được giữ lại thành 1 checklist item kiểm chứng độc lập — không tự
> coi là bug UI.)*

**Câu hỏi 2 – Màn hình trong phạm vi:**
> "Có, tách Import CSV thành luồng riêng (Recommended)"
>
> 4 màn hình người dùng chốt: Admin Login, Dashboard Admin, Quản lý Danh mục, Quản lý Sản phẩm.
> Import CSV (nằm trong khối Sản phẩm) được tách thành **luồng/màn hình riêng**.

**Câu hỏi 3 – Nền tảng / trình duyệt:**
> "Đúng, dùng localhost:5174 + backend :3000" — Web frontend (desktop, Chrome), không bao gồm
> mobile app trong lần chạy này.

**Câu hỏi 4 – Tiêu chuẩn & ràng buộc (số mục, WCAG, guideline lớp):**
> Lần hỏi đầu: "4 IA + FR-21..FR-24 của đặc tả (Recommended)"
>
> **Sửa đổi theo yêu cầu người dùng (2026-11-12): "Bỏ đi FR-21..24, chỉ cần 4 IA thôi"**
>
> → Tiêu chuẩn chính thức của checklist là **4 Interface Aspects (IA-01 → IA-04)** và
> **không dùng mã FR-xx làm tiêu chuẩn phân loại**. Đặc tả SRS của SUT
> (`eshop-sut/README.md`) chỉ được dùng làm **ngữ cảnh** để xác định hành vi đúng
> (ví dụ "tên danh mục không được để trống"), không xuất hiện trong cột
> "Tiêu chí kiểm chứng" của bất kỳ mục nào.
>
> Mỗi checklist item thuộc **đúng 1 IA**.

**Câu hỏi 5 – Có cross-browser / cross-platform trong phạm vi lần này không:**
> Chưa chốt trong lần này. Lần chạy này chỉ thực thi trên **Chrome desktop**. Phần
> cross-browser được ghi vào §6 "Ngoài phạm vi" để không bị báo cáo là đã cover.

**Câu hỏi 6 – Skill chạy tới bước nào:**
> "Chỉ Phase 01 (Recommended)" — sinh scope + UI analysis + checklist + tự review, rồi **DỪNG**
> để người dùng tự thực thi trên SUT thật (Gate B).

---

## 2. Danh sách màn hình trong phạm vi

| # | Màn hình | Route / URL | Nhóm người dùng | Hành động chính | Trạng thái cần kiểm | Rủi ro UI |
|---|---|---|---|---|---|---|
| 1 | Admin Login | `http://localhost:5174/` (unauth state) | Admin | Nhập email/mật khẩu & submit | Rỗng / sai format / sai credential / không phải admin / token hết hạn | **Cao** |
| 2 | Dashboard Admin | Sidebar → "Dashboard" | Admin | Xem KPI doanh thu & tổng đơn | Loading / rỗng / lỗi API / số liệu sai | Trung bình |
| 3 | Quản lý Danh mục | Sidebar → "Danh mục" | Admin | Thêm / xem / xóa danh mục | Rỗng / trùng tên / lỗi server / không xác nhận trước khi xóa | **Cao** |
| 4 | Quản lý Sản phẩm (CRUD) | Sidebar → "Sản phẩm" | Admin | Thêm / sửa / xóa sản phẩm | Rỗng / thiếu ảnh / edit sai bản ghi / lỗi validate | **Cao** |
| 5 | Import sản phẩm từ CSV | Sidebar → "Sản phẩm" → khối "Import sản phẩm từ CSV" | Admin | Chọn file CSV → xem trước → import | Chưa chọn file / file sai định dạng / preview / đang import / thành công / lỗi rollback | **Cao** |

> **Ghi chú kiến trúc quan trọng:** 5 màn hình trên **không tách theo URL**. Toàn bộ `frontend-admin`
> là một component duy nhất (`src/App.jsx, 922 dòng`) điều khiển bằng state `activeTab`
> (`App.jsx:10`). Không có `react-router-dom` được dùng, không có route, không có URL thay đổi khi
> chuyển tab. Đây là nguồn gốc của hàng loạt nghi vấn IA-03 (deep-link, refresh giữ state,
> browser Back) — xem `02-ui-analysis.md`.

---

## 3. Phân tích rủi ro theo màn hình

| Màn hình | Số form nhập liệu | Số trạng thái động (loading/empty/error) | Số bước trong flow | Phụ thuộc mạng | Phân quyền | Điểm rủi ro |
|---|---|---|---|---|---|---|
| Admin Login | 1 (2 field) | 4–5 (rỗng, sai format, sai credential, không phải admin, token rỗng) | 1 | Có (`POST /api/login`) | Có (role=admin) | Dùng `alert()` thay vì inline error; không `type="email"`; thiếu label; thiếu trạng thái loading; không có show/hide password |
| Dashboard Admin | 0 | 3 (loading, rỗng, lỗi) | 1 | Có (5 request song song) | Có | Không có skeleton/spinner; `totalRevenue` nhân `*2` (App.jsx:218) — số liệu sai; `toLocaleString()` không định dạng VN |
| Quản lý Danh mục | 1 (1 field) | 4 (rỗng, trùng, lỗi, không confirm xóa) | 1–2 | Có | Có | Không validate tên rỗng ở client; xóa không có dialog xác nhận; không có empty state |
| Quản lý Sản phẩm | 1 (5 field) + file input | 5 (rỗng, ảnh lỗi, edit, validate, lỗi server) | 2–3 | Có | Có | Thiếu label + ký hiệu `*`; `price` không `required`/không validate >0; "Sửa" set `setProductForm(p)` giữ `id`/`category_id` kiểu string; `fakeMassUpdatedProducts` (App.jsx:110-114) sửa tên của **mọi** sản phẩm → vi phạm FR-15 |
| Import CSV | 2 (file input + nút) | 6 (chưa chọn file, preview, importing, success, error, rollback) | 3 | Có | Có | Nút "Import" `disabled` nhưng không có lý do/tooltip; không validate đuôi `.csv`; parse CSV tay bằng `split(",")` → không hỗ trợ RFC 4180 (FR-16); không có thanh tiến trình % |

---

## 4. Phân bổ IA dự kiến

> **Con số cập nhật sau v3** (2026-11-12) — sau khi người dùng yêu cầu bỏ FR-21..24 và rút gọn
> checklist. Phân bổ cuối cùng: **IA-01: 13 · IA-02: 12 · IA-03: 9 · IA-04: 13 = 47 mục**.

| IA | Số mục cuối | Lý do chọn tỷ lệ này |
|---|---|---|
| IA-01 General UI Standards | 13 | 5 màn hình × layout/typography/contrast + 4 mục accessibility (bàn phím + landmark, focus ring, tín hiệu không phải màu, focus order) + 1 mục RTL + 1 mục dark mode + 2 mục responsive/zoom. Bảng 3 tab cố định `grid-cols-2` không có breakpoint → rủi ro cao. |
| IA-02 Forms | 12 | 4 form nhập liệu thật (Login, Danh mục, Sản phẩm, Import CSV) + 2 mục áp dụng chung cho cả 4 form (nhãn, ký hiệu bắt buộc) + tiêu chí input type / validate / giữ dữ liệu / file CSV. Rủi ro cao nhất vì hầu hết field chỉ dùng `placeholder`, không có `<label>`. |
| IA-03 Navigation | 9 | Toàn bộ app là 1 component với `activeTab` — không route, không URL, không breadcrumb, không deep-link. Sidebar 7 mục + Đăng xuất. Cần verify mục active, browser Back sau logout, refresh giữ hay mất state, URL có đổi không. |
| IA-04 Feedback / State | 13 | 5 call-site `alert()` (login fail, xóa lỗi, lưu SP lỗi, thêm DM lỗi, xóa DM lỗi) — không phải toast, không nằm trên nút submit → vi phạm yêu cầu vị trí thông báo lỗi của IA-02. Ngoài ra: loading state, empty state, success, tiến trình import, xác nhận xóa, xử lý lỗi mạng. |
| **Tổng** | **47** | >40 theo yêu cầu HW03; mỗi IA ≥8; 5 mục được viết ở dạng "áp dụng chung cho nhiều màn hình" thay vì nhân bản. |

---

## 5. Yêu cầu bắt buộc của đề bài (nếu có)

- [x] Số mục tối thiểu: **> 40** — **47 mục** (sau khi rút gọn từ 77 theo yêu cầu user ngày 2026-11-12)
- [x] Phủ đủ 4 IA: IA-01 / IA-02 / IA-03 / IA-04, mỗi IA ≥ 8 mục (13 / 12 / 9 / 13)
- [x] Số màn hình tối thiểu: **≥ 2** — chốt 5 màn hình / luồng + 2 nhóm "khung chung" (Sidebar, Các form)
- [x] Tiêu chuẩn phân loại: **chỉ 4 IA** — không dùng FR-21..FR-24 (đã bỏ theo yêu cầu user)
- [ ] Cross-browser / cross-platform: **chưa thực thi** trong lần chạy này (ghi ở §6)
- [ ] Format bảng tính: bảng Markdown trong `03-gui-checklist.md`; chuyển Excel ở Phase 02 nếu cần
- [ ] Yêu cầu GitHub Issues: tạo ở bước 6 (Phase 02) sau khi có bug thật
- [ ] Overlay email sinh viên lên ảnh: ở bước 6–7 khi có bằng chứng ảnh
- [x] Ngôn ngữ báo cáo: **tiếng Việt**, giữ nguyên thuật ngữ kỹ thuật tiếng Anh

---

## 6. Ngoài phạm vi

_(Ghi rõ những gì KHÔNG test trong lần này và lý do — mục "Hạn chế" trong báo cáo cuối sẽ dựa vào đây.)_

- **Frontend Web khách hàng** (`frontend-web`, port 5173): Home, Login, Register, Product Detail, Cart,
  Checkout, Profile, ForgotPassword — nằm ngoài 4 màn hình admin người dùng chốt.
- **Mobile app** (`frontend-mobile`, React Native/Expo): nằm ngoài nền tảng Web; người dùng xác nhận
  "web frontend, desktop".
- **3 tab còn lại của Web Admin**: "Mã Giảm Giá", "Đơn hàng", "Người dùng" — hiện diện trong
  `App.jsx` (dòng 612, 777, 879) nhưng người dùng chỉ chốt 4 màn hình + Import CSV. Được ghi nhận
  đầy đủ trong `02-ui-analysis.md` nhưng **không sinh checklist item**.
- **Cross-browser / cross-platform**: chỉ Chrome desktop trong lần chạy này. Firefox, Safari, Android
  Chrome/Expo Go **không** thực thi — phần này để trống trong báo cáo, không đánh dấu là đã cover.
- **Kiểm thử backend/API, SQL injection, business logic**: nằm ngoài phạm vi GUI. Các nghi vấn bảo
  mật phát hiện khi đọc code được **ghi nhận** trong `02-ui-analysis.md` §5 nhưng không mở thành
  checklist item GUI (trừ khi biểu hiện ra được trên UI, ví dụ XSS qua `dangerouslySetInnerHTML`
  tại `App.jsx:801` — cái này **có** mở item ở màn hình Đơn hàng nếu phạm vi mở rộng).

---

## 7. Người thực thi checklist thực tế

_(Ai sẽ điền Passed/Failed? Điều này quyết định mức chi tiết của hướng dẫn kiểm chứng.)_

- **Người dùng (chính người đặt phạm vi)** sẽ tự mở `http://localhost:5174`, thực thi checklist và
  điền `Passed`/`Failed` vào cột `Kết quả` của `03-gui-checklist.md`.
- AI **không** tự điền kết quả. Gate B của skill được kích hoạt sau bước 4.
- Hướng dẫn kiểm chứng vì vậy được viết ở dạng **hành động cụ thể, có thể quan sát bằng mắt trong
  ≤2 phút**, không yêu cầu đọc code, và có ngưỡng đo định lượng (px, giây, tỷ lệ) để người khác
  chấm điểm cho cùng kết quả.

### Điều kiện tiên quyết để bắt đầu thực thi

1. Backend chạy tại `http://localhost:3000` (`node backend/server.js`).
2. Seed data đã chạy (`node backend/database.js`) — cần có sản phẩm/danh mục/đơn hàng để kiểm
   được các trạng thái "có dữ liệu" bên cạnh "rỗng".
3. `cd frontend-admin && npm run dev` → `http://localhost:5174`.
4. Đăng nhập: `admin@eshop.com` / `Admin123!` (do người dùng xác nhận ở Gate A).

---

## 8. Xác nhận

- Ngày: 2026-11-11
- Người xác nhận: người dùng (qua bảng hỏi Gate A)
- Ghi chú: người dùng đã chốt 4 quyết định — môi trường localhost:5174 + credential `Admin123!`,
  tách Import CSV thành luồng riêng, dùng 4 IA + FR-21..FR-24, và chỉ chạy Phase 01.
  AI đã ghi nhận mâu thuẫn credential giữa `README.md:23` và `setup_guide.md:105` để đưa thành
  mục kiểm chứng thay vì tự kết luận.
