# 02 — Phân tích giao diện (UI Analysis)

| Trường | Nội dung |
|---|---|
| SUT | EShop — Web Admin (`eshop-sut/frontend-admin`) tại `http://localhost:5174` |
| Ngày | 2026-11-11 |
| Người lập | AI (OpenCode / MiniMax M3.1 Flash), dựa trên source code **và** khảo sát runtime bằng Chrome headless (CDP) |
| Phiên bản | commit `85af3ba` |

---

## 1. Nguồn thông tin đã sử dụng

| Nguồn | Có / Không | Ghi chú |
|---|---|---|
| Source code frontend | ✅ Có | `frontend-admin/src/App.jsx` (922 dòng — toàn bộ app nằm trong 1 file), `App.css`, `index.css`, `tailwind.config.js`, `vite.config.js`, `package.json` |
| Chạy trực tiếp trên SUT | ✅ Có | Chrome 157 headless + Chrome DevTools Protocol. Đã đo: DOM thật, computed style, contrast ratio, focus order, responsive ở 375px, preview CSV thật |
| Tài liệu / spec / mockup | ✅ Có | `eshop-sut/README.md` (SRS v2.0 — FR-01..FR-20 phần nghiệp vụ, §8 phần yêu cầu giao diện, SEC-01..SEC-07), `setup_guide.md`, `api_specification.md` |
| Backend API | ✅ Có | `backend/server.js` — dùng để đối chiếu hành vi runtime (login lock, import validation) |

> **Phương pháp đo contrast**: script CDP đọc `getComputedStyle` + `::placeholder`, quy đổi sang WCAG 2.x contrast ratio (đọc màu nền thực tế bằng cách leo DOM). Mọi con số trong báo cáo này là **giá trị đo được**, không phải ước lượng.

---

> **Khung tiêu chuẩn của checklist (v3, 2026-11-12)**: chỉ dùng **4 Interface Aspects
> (IA-01 → IA-04)**. Các mã FR-xx trong tài liệu này chỉ là **ngữ cảnh nghiệp vụ** lấy từ đặc tả
> SRS của chính SUT, dùng để xác định "hành vi đúng" — **không phải tiêu chuẩn phân loại mục kiểm thử**.
> Không có mã FR-xx nào trong cột "Tiêu chí kiểm chứng" của 03-gui-checklist.md.

## 2. Kiến trúc UI tổng quan

| Khía cạnh | Chi tiết |
|---|---|
| Framework / thư viện UI | React 19.2.6 + Tailwind CSS 3.4.19. **Không** dùng thư viện component UI nào (không MUI/Ant/Bootstrap). Toàn bộ UI viết tay bằng class Tailwind |
| Ngôn ngữ / build | JavaScript (không TypeScript), Vite 8.0.12, `@vitejs/plugin-react` |
| Routing | ❌ **KHÔNG CÓ ROUTING.** `react-router-dom@7.15.0` có trong `devDependencies` nhưng **không được import** ở bất kỳ đâu. Toàn bộ app là 1 component `App` với state `activeTab` (`App.jsx:10`) |
| State management | React `useState` cục bộ. Không Redux/Zustand/Context. Dữ liệu tải 1 lần qua `fetchData()` (`App.jsx:41-59`) gọi **5 request song song** |
| Form + validation | HTML `<form onSubmit>` + `preventDefault`. **Không** có thư viện validate. Chỉ có `required` HTML5 ở 3 input; phần còn lại không validate ở client |
| Theme / design token | Tailwind default palette. Không có file `theme` riêng. Màu nằm rải rác dạng class literal (`bg-blue-600`, `text-blue-400`…) |
| Dark mode | ❌ **KHÔNG CÓ.** Không cấu hình `darkMode` trong `tailwind.config.js`, không có class `dark:`, không có toggle |
| Đa ngôn ngữ / RTL | ❌ **KHÔNG CÓ.** Không có i18n library, không có `dir`, `<html lang="en">` |
| Responsive breakpoints | ❌ **KHÔNG CÓ breakpoint nào.** Grep toàn bộ `App.jsx`: không có `sm:`, `md:`, `lg:`, `xl:`. Grid cứng `grid-cols-2` / `grid-cols-3`, sidebar cứng `w-64` |
| Accessibility hỗ trợ | ❌ Gần như **không có**. Runtime đo: `document.querySelectorAll('[aria-label],[aria-current],[role]').length === 0`; `document.querySelectorAll('nav,main,header,aside,footer').length === 0` |

---

## 3. Inventory màn hình

| Màn hình | Route | File component | Nhóm người dùng | Loại form | Có trạng thái động |
|---|---|---|---|---|---|
| Admin Login | `/` (khi `token` rỗng) | `App.jsx:188-215` | Admin | 1 form, 2 input | Không — dùng `alert()` native |
| Dashboard Admin | `/` + `activeTab="dashboard"` | `App.jsx:276-292` | Admin | Không | Không (không skeleton, không empty state) |
| Quản lý Danh mục | `/` + `activeTab="categories"` | `App.jsx:294-335` | Admin | 1 form, 1 input | Không (không empty state, không confirm xóa) |
| Quản lý Sản phẩm (CRUD) | `/` + `activeTab="products"` | `App.jsx:337-610` | Admin | 1 form, 5 field + select | Có (state edit form) |
| Import sản phẩm từ CSV | `/` + `activeTab="products"` (khối trên cùng) | `App.jsx:342-481` | Admin | 1 file input | Có (preview / importing / result) |
| *(Ngoài phạm vi)* Quản lý Mã Giảm Giá | `activeTab="coupons"` | `App.jsx:612-775` | Admin | 1 form, 6 field | Không |
| *(Ngoài phạm vi)* Quản lý Đơn hàng | `activeTab="orders"` | `App.jsx:777-877` | Admin | Không | Không |
| *(Ngoài phạm vi)* Quản lý Người dùng | `activeTab="users"` | `App.jsx:879-918` | Admin | Không | Không |

> **Lưu ý về 3 màn hình ngoài phạm vi**: người dùng chỉ chốt 4 màn hình + tách Import CSV. 3 tab còn lại vẫn được khảo sát runtime (để đảm bảo checklist không bỏ sót vấn đề liên quan) nhưng **không sinh checklist item**. Chúng được ghi ở §4.6–4.8 làm ngữ cảnh.

---

## 4. Phân tích chi tiết theo màn hình

### 4.1 — Admin Login (`App.jsx:188-215`)

- **Bố cục**: 1 `<div class="flex h-screen items-center justify-center bg-gray-100">` → 1 `<form class="bg-white p-8 rounded shadow-md w-96">`. Không header, không logo, không footer, không link phụ trợ (quên mật khẩu).
- **Thành phần tương tác**: 2 `<input>`, 1 `<button>`.
- **Form & field**:

| Field | Label | Type | Required | Rule validate (file:line) | Giá trị mặc định |
|---|---|---|---|---|---|
| Email | ❌ **không có** — chỉ `placeholder="Email"` | ❌ `type` **không được khai báo** → mặc định `text` (`App.jsx:196-201`) | ❌ không | ❌ không có. Runtime xác nhận `required:false` | `""` |
| Password | ❌ **không có** — chỉ `placeholder="Password"` | ✅ `type="password"` (`App.jsx:202-207`) | ❌ không | ❌ không có | `""` |
| Submit | — | `button` (mặc định `type=submit`) | — | — | Nhãn **"Login"** (tiếng Anh) |

- **Trạng thái** (đo runtime):

| Trạng thái | Có trong code? | Có quan sát được? | Ghi chú |
|---|---|---|---|
| Loading | ❌ Không | ❌ | Submit không disable, không spinner. Bấm 2 lần → 2 request song song |
| Empty | ⚠️ Có nhưng sai | ✅ | Submit rỗng → vẫn gọi API → `alert("Đăng nhập thất bại")` |
| Error | ⚠️ Sai hình thức | ✅ | Dùng `window.alert()` native — **không** có inline error, không có `[role=alert]`, không nằm trên nút submit |
| Success | ⚠️ Không | — | Thành công → chuyển thẳng sang Dashboard, **không có** thông báo xác nhận |
| Disabled | ❌ Không | ❌ | Nút "Login" luôn active |
| Offline / timeout | ❌ Không | ❌ | Lỗi mạng → `err.message` kỹ thuật ("Network Error") nhưng frontend chỉ in "Đăng nhập thất bại" |

- **Điểm rủi ro UI phát hiện được**:

| # | Nghi vấn | Nguồn phát hiện | IA | Mức độ |
|---|---|---|---|---|
| 1 | **0 thẻ `<label>`** — placeholder là nhãn duy nhất; đo contrast placeholder = **2.35:1** < 4.5:1 (WCAG 1.4.3 fail). Khi user nhập, nhãn biến mất hoàn toàn | Runtime CDP + `App.jsx:196-207` | IA-01, IA-02 | **Cao** |
| 2 | Email KHÔNG dùng `type="email"` → không có validate HTML5, vi phạm đặc tả SRS §8 | Runtime: `type:"text"` | IA-02 | **Cao** |
| 3 | Lỗi dùng `alert()` native → chặn toàn bộ UI, không nằm **trên** nút submit như đặc tả SRS §8 yêu cầu | Runtime: `alerts:["Đăng nhập thất bại"]`, `errEls:0` | IA-04 | **Cao** |
| 4 | Thông báo lỗi chung chung, không phân biệt 4 ca: sai mật khẩu / tài khoản bị khóa (HTTP 403) / không phải admin / lỗi mạng | `App.jsx:71-73` so với `server.js:40-44` | IA-04 | **Cao** |
| 5 | Không có `<h1>` — dùng `<h2>` | Runtime: `h1:0`, `h2:["Admin Login"]` | IA-01 | Trung bình |
| 6 | Nhãn tiếng Anh "Admin Login" / "Login" — đặc tả SRS §8 yêu cầu "toàn bộ giao diện dùng tiếng Việt" | Runtime | IA-01 | Trung bình |
| 7 | `<title>frontend-admin</title>` — tên scaffold Vite, không phải tên sản phẩm | Runtime + `index.html` | IA-01 | Trung bình |
| 8 | Không có nút hiện/ẩn mật khẩu | `App.jsx:202-207` | IA-02 | Trung bình |
| 9 | Không `autocomplete="username"` / `current-password` | Runtime: `ac:null` | IA-02 | Trung bình |
| 10 | Không có trạng thái loading khi submit → double-submit | `App.jsx:61-74` | IA-04 | Trung bình |
| 11 | Không có link "Quên mật khẩu" dù backend có `/api/forgot-password` | `App.jsx:188-215` vs `server.js:68` | IA-03 | Thấp |
| 12 | Không có trường `*` đánh dấu bắt buộc (đặc tả SRS §8) | `App.jsx:196-207` | IA-02 | Trung bình |
| 13 | Tài khoản bị khóa **3 phút** (spec FR-02 nói 30 giây) và mỗi lần sai **+2** (spec nói +1) — nhưng UI hiện thông báo chung chung nên user không hiểu vì sao | `server.js:54,57` (đo runtime: sau 2 lần sai đã bị khóa) | IA-04 | **Cao** |
| 14 | Không có `lang` tiếng Việt (`<html lang="en">`) | Runtime: `lang:"en"` | IA-01 | Thấp |

### 4.2 — Dashboard Admin (`App.jsx:276-292`)

- **Bố cục**: sidebar trái `w-64 bg-gray-800` + content phải `flex-1 p-8 overflow-auto`. Dashboard chỉ có 1 `<h2>` + grid `grid-cols-2` chứa 2 thẻ KPI trắng.
- **Thành phần tương tác**: không có nút, không có link, không có filter, không có khoảng thời gian.
- **Trạng thái**:

| Trạng thái | Có trong code? | Có quan sát được? | Ghi chú |
|---|---|---|---|
| Loading | ❌ Không | ❌ | `fetchData()` không set cờ loading → content trắng rỗng trong lúc chờ |
| Empty | ❌ Không | ✅ **Rất dễ thấy** | Runtime: `0 ₫` và `0` — không có câu "chưa có đơn hàng nào" |
| Error | ❌ Không | ❌ | `catch` chỉ xử lý 401/403 → reset token. Lỗi 500 → im lặng |
| Success | N/A | N/A | Luôn hiển thị |

- **Điểm rủi ro UI**:

| # | Nghi vấn | Nguồn | IA | Mức độ |
|---|---|---|---|---|
| 1 | **Doanh thu nhân đôi**: `sum + o.total_amount * 2` (`App.jsx:218`) — sai FR-13 | Code | IA-04 | **Cao** |
| 2 | Doanh thu ghi "Tổng doanh thu (Delivered)" nhưng **không** phân biệt trạng thái khác; không có tỷ lệ/so sánh | Code + runtime | IA-04 | Trung bình |
| 3 | `toLocaleString()` không chỉ định locale → phụ thuộc locale của máy test, không phải `vi-VN` | `App.jsx:283` | IA-01 | Trung bình |
| 4 | "0 ₫" — không có dấu phân cách hàng nghìn khi giá trị < 1000; đặc tả SRS §8 yêu cầu luôn dùng `₫` với phân cách hàng nghìn | Runtime | IA-01 | Thấp |
| 5 | Không có empty state, không có skeleton | Runtime | IA-04 | **Cao** |
| 6 | Không có `<h1>` — chỉ `<h2>Dashboard</h2>` (đặc tả SRS §8 yêu cầu đúng 1 `<h1>` mô tả nội dung trang) | Runtime | IA-01 | Trung bình |
| 7 | Grid `grid-cols-2` không có breakpoint → ở 375px 2 cột còn **19.5px** mỗi cột | Runtime (375px) | IA-01 | **Cao** |
| 8 | Không có thống kê phụ (số khách, sản phẩm bán chạy) — không bắt buộc, nhưng dashboard chỉ 2 thẻ nên giá trị thấp | Runtime | IA-04 | Thấp |

### 4.3 — Quản lý Danh mục (`App.jsx:294-335`)

- **Bố cục**: `<h2>` + form 1 dòng (input + nút "Thêm mới") + bảng 3 cột (ID / Tên Danh Mục / Hành động).
- **Form & field**:

| Field | Label | Type | Required | Rule validate | Mặc định |
|---|---|---|---|---|---|
| Tên danh mục | ❌ không có — `placeholder="Tên danh mục mới"` | `text` | ❌ | ❌ **không validate rỗng** → `POST /api/categories` không có check `name` (`server.js:249-255`) | `""` |

- **Trạng thái**: không có loading, không có empty state, không có success toast (chỉ reset ô input), không có confirm xóa.
- **Điểm rủi ro**:

| # | Nghi vấn | Nguồn | IA | Mức độ |
|---|---|---|---|---|
| 1 | **Xóa danh mục không có dialog xác nhận** — bấm là xóa ngay. Đo runtime: sau khi bấm "Xóa", bảng từ 3 dòng → 2 dòng, **không** có `confirm()` nào được gọi, không có hộp thoại nào hiện ra | Runtime (đã vô tình xóa mất seed "Điện thoại", phải khôi phục) | IA-04 | **Cao — hành động không thể hoàn tác** |
| 2 | Tên danh mục rỗng vẫn được gửi lên; FR-14 nêu rõ "Tên danh mục là bắt buộc, không được để trống" | `App.jsx:142-151` + `server.js:249-255` | IA-02 | **Cao** |
| 3 | Không có empty state khi bảng không có danh mục | Runtime | IA-04 | Trung bình |
| 4 | Không có phân trang / tìm kiếm khi danh mục nhiều | Code | IA-03 | Thấp |
| 5 | Không có nút "Sửa" danh mục dù backend có `PUT /api/categories/:id` (`server.js:257`) | Code | IA-03 | Thấp |
| 6 | Không có thông báo thành công sau khi thêm — form chỉ reset, user không biết đã thêm hay chưa | `App.jsx:142-151` | IA-04 | Trung bình |
| 7 | Cột "ID" hiển thị `#1` — format không nhất quán với bảng Sản phẩm/Đơn hàng cũng dùng `#id`, OK. Nhưng cột "Tên Danh Mục" viết hoa chữ cái đầu mỗi từ — không nhất quán với "Tên SP" ở bảng Sản phẩm | Runtime | IA-01 | Thấp |

### 4.4 — Quản lý Sản phẩm — CRUD (`App.jsx:483-608`)

- **Bố cục**: `<h2>` → form thêm/sửa (card trắng) → bảng 4 cột (Ảnh / Tên SP / Giá / Hành động).
- **Form & field**:

| Field | Label | Type | Required | Rule validate | Mặc định |
|---|---|---|---|---|---|
| Tên sản phẩm | ❌ `placeholder="Tên sản phẩm"` | `text` | ✅ `required` (HTML5) | Chỉ required, **không** check ≤255 ký tự (FR-15) | `""` |
| Giá tiền | ❌ `placeholder="Giá tiền"` | `number` | ❌ **không** | ❌ **không** check > 0 (FR-15) | `""` |
| URL Ảnh | ❌ `placeholder="URL Ảnh"` | `text` | ❌ | ❌ không check URL hợp lệ | `""` |
| Mô tả | ❌ `placeholder="Mô tả"` | `textarea` | ❌ | — | `""` |
| Danh mục | ❌ **select không có nhãn**, chỉ hiển thị option | `select` | ❌ | ❌ không validate | `category_id: 1` |

- **Trạng thái**: có `productForm.id` để chuyển chế độ Sửa; có nút "Hủy sửa"; không có confirm xóa; lỗi dùng `alert()`.
- **Điểm rủi ro**:

| # | Nghi vấn | Nguồn | IA | Mức độ |
|---|---|---|---|---|
| 1 | **0 thẻ `<label>`** cho cả 5 field → placeholder là nhãn duy nhất; contrast placeholder 2.35:1; nhãn biến mất khi nhập | Runtime | IA-02, IA-01 | **Cao** |
| 2 | **Giá không `required` và không validate > 0** → có thể lưu giá rỗng / 0 / âm, vi phạm FR-15 | `App.jsx:500-508` | IA-02 | **Cao** |
| 3 | **Sửa 1 sản phẩm làm đổi TÊN của tất cả sản phẩm**: `products.map(p => ({...p, name: productForm.name}))` (`App.jsx:110-114`) — vi phạm FR-15 ("chỉ sản phẩm đó bị thay đổi") | Code | IA-04 | **Cao** |
| 4 | **Giá hiển thị không có dấu phân cách hàng nghìn**: runtime thấy `30000000 ₫` thay vì `30,000,000 ₫` | Runtime (ô "Giá" trong bảng) | IA-01 | **Cao** |
| 5 | Nút "Sửa" nền vàng `#eab308` + chữ trắng → contrast **1.92:1** (cần ≥4.5:1). Nút "Xóa" `#ef4444` + trắng → **3.76:1**. Nút "Lưu sản phẩm" `#16a34a` + trắng → **3.30:1** — cả 3 đều fail WCAG AA | Runtime (computed style) | IA-01 | **Cao** |
| 6 | **Xóa sản phẩm không có dialog xác nhận** (như Danh mục) | `App.jsx:133-141` | IA-04 | **Cao** |
| 7 | Bấm "Sửa" đổi tên form thành "Sửa sản phẩm" nhưng **không có nhãn `<h3>` phân biệt rõ** với chế độ Thêm — chỉ dựa vào text heading | `App.jsx:487-489` | IA-04 | Thấp |
| 8 | `setProductForm(p)` khi Sửa → `category_id` nhận **string** (`"1"`) thay vì number, không khớp type của state mặc định (`1`) | `App.jsx:594` | IA-02 | Thấp |
| 9 | Không có nút "Hủy sửa" khi đang ở chế độ Thêm (đúng), nhưng khi đang sửa nút "Hủy sửa" là text xám trên nền trắng — không có `border`, dễ bị hiểu là link | `App.jsx:548-565` | IA-01 | Thấp |
| 10 | Không có phân trang / tìm kiếm / lọc danh sách sản phẩm | Code | IA-03 | Trung bình |
| 11 | Không có empty state khi không có sản phẩm | Runtime | IA-04 | Trung bình |
| 12 | Bảng không có `<caption>`/`<th scope>`; cột "Ảnh" không có alt mô tả (chỉ `alt={p.name}` — ảnh trùng nghĩa với cột Tên SP) | `App.jsx:580-586` | IA-01 | Thấp |
| 13 | Cột "Hành động" dùng `className="p-3 flex gap-2"` trên `<td>` — `display:flex` phá vỡ layout ô bảng | `App.jsx:591` | IA-01 | Thấp |

### 4.5 — Import sản phẩm từ CSV (`App.jsx:342-481`)

- **Bố cục**: card xanh `bg-blue-50 border border-blue-200` chứa: `<h3>📂 Import sản phẩm từ CSV</h3>` + link "Tải file mẫu (template.csv)" + hàng `[input type=file] [nút Import]` + vùng preview + vùng kết quả.
- **Form & field**:

| Field | Label | Type | Required | Rule validate | Mặc định |
|---|---|---|---|---|---|
| File CSV | ❌ không có `<label>`; chỉ nút chọn file mặc định của trình duyệt | `file` | ❌ | ❌ **không kiểm tra đuôi `.csv`** (FR-16) | `null` |
| Nút Import | — | `button` | — | `disabled={importing \|\| !importPreview.length}` | Nhãn động: "Import N sản phẩm" |

- **Trạng thái**: đây là màn hình **giàu trạng thái nhất** trong phạm vi:

| Trạng thái | Có trong code? | Có quan sát được? | Ghi chú |
|---|---|---|---|
| Loading | ✅ (`importing`) | ✅ | Nút đổi thành "Đang import..." + `disabled` |
| Preview | ✅ (`importPreview`) | ✅ | Bảng "Xem trước (N dòng)" |
| Success | ✅ (`importResult`) | ✅ | Ô xanh "✅ Import hoàn tất: x/y sản phẩm được thêm" |
| Error | ✅ (`importResult.error`) | ✅ | Ô đỏ "❌ {error}" |
| Empty | ⚠️ | ✅ | Nút disabled với nhãn "**Import 0 sản phẩm**" |
| Disabled | ✅ | ✅ | Nút mờ đi khi chưa chọn file — **không có tooltip/giải thích lý do** |
| Tiến trình % | ❌ Không | ❌ | Chỉ có text "Đang import...", không có thanh % / số dòng đã xử lý |
| Rollback | ❌ Không | — | Backend không dùng transaction (`server.js:206-240`) → import lỗi vẫn insert dòng hợp lệ, vi phạm FR-16 "all-or-nothing" |

- **Điểm rủi ro**:

| # | Nghi vấn | Nguồn | IA | Mức độ |
|---|---|---|---|---|
| 1 | **Parser CSV không hỗ trợ RFC 4180**: `text.split("\n")` + `line.split(",")` (`App.jsx:367-377`). Đo runtime với file có trường bọc dấu nháy kép: `"Sản phẩm, loại A"` → preview hiện **2 cột** `"Sản phẩm` và `loại A"` → dữ liệu sẽ bị ghi sai vào DB. FR-16 yêu cầu hỗ trợ RFC 4180 | Runtime (file `quoted.csv`) | IA-04 | **Cao** |
| 2 | **Không kiểm tra đuôi file**: đo runtime với `sanpham.txt` → vẫn parse được và nút Import bật, sẽ import thành công. FR-16 yêu cầu đuôi `.csv` | Runtime (file `sanpham.txt`) | IA-02 | **Cao** |
| 3 | **Không validate `price` ở client lẫn server**: file có `price = -500` vẫn qua preview, backend cũng không chặn (`server.js:213-232` chỉ check `name` rỗng). FR-16 yêu cầu `price` phải là số dương | Runtime (file `invalid.csv`) + code server | IA-02 | **Cao** |
| 4 | **Không validate `name` rỗng ở client**: file có dòng `name` rỗng vẫn qua preview. (Server có check, nhưng đã insert các dòng hợp lệ trước → không rollback) | Runtime (file `invalid.csv`) | IA-02 | **Cao** |
| 5 | Nút disabled "Import 0 sản phẩm" **không có lý do/tooltip** → user không biết phải chọn file trước | `App.jsx:418-424` | IA-04 | Trung bình |
| 6 | **Không có thanh tiến trình** khi import nhiều dòng — chỉ có text "Đang import..." (IA-04 yêu cầu thanh % hoặc bước) | `App.jsx:421-423` | IA-04 | Trung bình |
| 7 | Link "Tải file mẫu (template.csv)" dùng `data:` URI tĩnh — tải file có header đúng nhưng **mọi giá trị đều là placeholder** (`Tên sản phẩm mẫu`, `100000`) | `App.jsx:347-353` | IA-03 | Thấp |
| 8 | Vùng preview cuộn trong `max-h-40` (~160px) → chỉ thấy vài dòng, không có phân trang | `App.jsx:432` | IA-01 | Thấp |
| 9 | Preview **không có tiêu đề cột cố định** khi file có nhiều cột lạ → bảng tràn ngang, có `overflow-x-auto` nhưng không có dấu hiệu cuộn | `App.jsx:432-455` | IA-01 | Thấp |
| 10 | Không có tiêu đề `<h1>`/`<h2>` riêng cho luồng Import — chỉ `<h3>` lồng trong card, dùng emoji 📂 làm icon | `App.jsx:344-346` | IA-01 | Thấp |

### 4.6 — *(Ngoài phạm vi, chỉ để tham chiếu)* Quản lý Mã Giảm Giá (`App.jsx:612-775`)

Runtime: 4 coupon, 4 cột form (`code` required, `type` select, `discount_value` required, `min_order_amount` mặc định 0, `expired_at` required type=date, `max_uses_per_user` mặc định 1). Vẫn **0 `<label>`**, lỗi dùng `alert()`. Có `type="date"` — là field duy nhất trong app có input type chuẩn.

### 4.7 — *(Ngoài phạm vi)* Quản lý Đơn hàng (`App.jsx:777-877`)

Runtime: bảng có **0 dòng** → `<tbody>` rỗng hoàn toàn, `innerText` chỉ còn header, **không** có thông báo "chưa có đơn hàng". Đây là bằng chứng runtime rõ ràng cho việc thiếu empty state.
**Lưu ý bảo mật (không sinh item GUI vì ngoài phạm vi màn hình, nhưng ghi nhận)**: `dangerouslySetInnerHTML` render `shipping_address` (`App.jsx:799-804`) → vi phạm SEC-04 và FR-18 (địa chỉ phải hiển thị an toàn).

### 4.8 — *(Ngoài phạm vi)* Quản lý Người dùng (`App.jsx:879-918`)

Runtime: 2 dòng, có checkbox chọn tất cả. Checkbox **không có `<label>`**, không có `name`, và **không ăn vào logic** (không state, không lọc, không xóa hàng loạt) — đã được tác giả ghi chú trong `index.css`: *"Lỗi hiển thị checkbox ảo trên UI, không ăn nhập với logic state"*.

---

## 5. Thành phần dùng chung

| Component / thư viện | Dùng ở màn hình nào | Hành vi kỳ vọng chung |
|---|---|---|
| `<form onSubmit>` + `preventDefault` | Login, Danh mục, Sản phẩm, Coupon | Không validate client-side ngoài `required` HTML5; không có trạng thái submitting |
| `window.alert()` | Login (`App.jsx:72`), Danh mục (`:149`), Sản phẩm (`:129`,`:137`), Coupon (`:630`) | Chặn toàn bộ UI; không nằm trên nút submit; không định dạng; không tự đóng |
| `axios` + `axios.defaults.headers.common["Authorization"]` | Toàn app (`App.jsx:36`) | Token gắn global; lỗi 401/403 → reset token, không báo người dùng |
| `fetchData()` | Toàn app (`App.jsx:41-59`) | 5 request **tuần tự** (`await` trong vòng lặp) → tổng độ trễ = tổng 5 round-trip |
| `localStorage["adminToken"]` | Toàn app (`App.jsx:7`, `:70`, `:267`) | Token tồn tại vô hạn, không có thời hạn hiển thị |
| `statusLabel()` / `statusStyle()` | Đơn hàng (ngoài phạm vi) | Map màu theo trạng thái, dùng **màu + chữ** (không chỉ màu) — đúng cách |
| Tailwind `grid-cols-2` / `grid-cols-3` | Dashboard, Sản phẩm, Coupon | Không có breakpoint → vỡ ở viewport hẹp |
| `onError` → `placehold.co/50` cho `<img>` | Sản phẩm (`App.jsx:584-586`) | Ảnh hỏng có ảnh thay thế — nhưng **không** có text thay thế cho screen reader |

---

## 6. Accessibility / RTL / Dark mode — đánh giá sơ bộ

| Khía cạnh | Hiện trạng trong code | Nhận xét / rủi ro |
|---|---|---|
| Bàn phím / focus order | Sidebar là 7 thẻ `<li onClick>` — runtime đo `tabindex:null`, `role:null`, `document.querySelectorAll('li[tabindex], li button').length === 0`. **Toàn bộ menu không điều hướng được bằng bàn phím**, kể cả "Đăng xuất" | `App.jsx:227-271`. Rủi ro **rất cao** — người dùng bàn phím không thể dùng app |
| ARIA / label | Runtime: `[aria-label],[aria-current],[role]` → **0 phần tử**. `aria-current` = 0 (không đánh dấu mục menu đang active) | Mục active chỉ khác bằng màu chữ → tín hiệu **chỉ bằng màu** (WCAG 1.4.1) |
| Landmark | Runtime: `nav,main,header,aside,footer` → **0 phần tử**. Sidebar là `<div>` + `<ul>` | Không có landmark để screen reader định vị |
| Vùng bấm | Nút "Xóa"/"Sửa" trong bảng: `px-2 py-1 text-sm` → **~26px** chiều cao, xa hơn ngưỡng 44×44 | `App.jsx:592-604` |
| Tương phản | Placeholder **2.35:1** (fail); nút "Sửa" **1.92:1** (fail); nút "Xóa" **3.76:1** (fail); nút "Lưu sản phẩm" **3.30:1** (fail). Đạt: header bảng 16.96:1, nav thường 14.68:1, nav active 5.77:1, "Đăng xuất" 5.31:1, nút "Login" 5.17:1 | Bảng đo ở §7 |
| Focus indicator | Runtime computed: input `outline: rgb(0,0,0) none 3px` (**style = none**) → không có viền focus trên input; button nhận mặc định trình duyệt (`auto 1px`) | Cần tester xác minh bằng phím Tab thật |
| Tiêu đề trang | `<h1>` = 0 trên màn Login; `<h1>` = 1 trên shell (`EShop Admin` — tiêu đề app, không phải tiêu đề trang con) | đặc tả SRS §8 yêu cầu đúng 1 `<h1>` mô tả nội dung trang |
| Ngôn ngữ | `<html lang="en">` trong khi UI tiếng Việt | `index.html` |
| RTL | Không có `dir="rtl"`, không có CSS logical property (`ms-`/`me-`/`ps-`/`pe-`), dùng `ml-4`, `text-left`, `text-right` cứng | **Không hỗ trợ RTL** — khi đặt `dir="rtl"`, sidebar vẫn trái, bảng vẫn căn trái, icon "Xóa" không đảo |
| Dark mode | Không có `darkMode` config, không có class `dark:`, không có toggle | **Không hỗ trợ** — đặt hệ thống ở dark mode → app vẫn sáng (không tính là bug, nhưng là hạn chế cần ghi trong báo cáo) |
| Zoom / reflow | Runtime ở 375px: `documentElement.scrollWidth === innerWidth` (không tràn ngang) **nhưng** `grid-cols-2` → cột còn **19.5px**, input còn **18px** rộng, `font-size: 14px` (< 16px → iOS tự zoom) | Vỡ nội dung chứ không tràn |
| Ngôn ngữ chữ | Không có test độ dài dòng; các tiêu đề ngắn nên không có rủi ro cắt chữ | — |

---

## 7. Bảng contrast đo được (runtime, WCAG 2.x)

| Vị trí | Chữ | Nền | Ratio | Ngưỡng | Kết quả |
|---|---|---|---|---|---|
| Login placeholder "Email" / "Password" | `rgb(156,163,175)` | `rgb(246,246,246)` | **2.35** | 4.5 | ❌ FAIL |
| Nút "Login" | trắng | `rgb(37,99,235)` | 5.17 | 4.5 | ✅ PASS |
| `<h2>Admin Login` | đen | trắng | 21.0 | 3.0 | ✅ PASS |
| Nút "Lưu sản phẩm" | trắng | `rgb(22,163,74)` | **3.30** | 4.5 | ❌ FAIL |
| Nút "Sửa" (5×) | trắng | `rgb(234,179,8)` | **1.92** | 4.5 | ❌ FAIL |
| Nút "Xóa" (5×) | trắng | `rgb(239,68,68)` | **3.76** | 4.5 | ❌ FAIL |
| `<th>` header bảng | đen | `rgb(229,231,235)` | 16.96 | 4.5 | ✅ PASS |
| Nav item thường | trắng | `rgb(31,41,55)` | 14.68 | 4.5 | ✅ PASS |
| Nav item active | `rgb(96,165,250)` | `rgb(31,41,55)` | 5.77 | 4.5 | ✅ PASS |
| Nav "Đăng xuất" | `rgb(248,113,113)` | `rgb(31,41,55)` | 5.31 | 4.5 | ✅ PASS |
| Ô giá trong bảng SP | đen | trắng | 21.0 | 4.5 | ✅ PASS |

> Đây là các **số đo thật** — checklist sẽ dùng đúng ngưỡng này làm ngưỡng Pass/Fail để người thực thi có thể tái lập bằng DevTools.

---

## 8. Phân tích cross-browser / cross-platform

> **Không nằm trong phạm vi lần chạy này** (người dùng chốt chỉ Chrome desktop). Bảng dưới ghi rõ trạng thái để §"Hạn chế" của báo cáo không ghi sai.

| Nền tảng | Yêu cầu | Có sẵn công cụ? | Ghi chú rủi ro |
|---|---|---|---|
| Chrome 157 (desktop 1440×900) | ✅ **Đã dùng để khảo sát runtime** | ✅ Có | Cơ sở cho toàn bộ số đo ở §7 |
| Firefox | ⬜ Chưa thực thi | ✅ Có sẵn trên máy | `input type="date"` hiển thị khác Chrome; `appearance` mặc định khác → cần đo lại contrast nút |
| Safari / macOS + iPad | ⬜ Chưa thực thi | ❌ Không có máy Mac | `100vh` khác iOS (address bar) → sidebar `h-screen` có thể bị cắt |
| Edge | ⬜ Chưa thực thi | ✅ Có sẵn (`msedge.exe`) | Chromium, gần như giống Chrome |
| Android Chrome / Expo Go (375px) | ⬜ Chưa thực thi | ⚠️ Chỉ mô phỏng viewport | Đã mô phỏng 375px: layout vỡ (grid cột 19.5px, input 18px) — đây là **rủi ro đã biết**, cần xác nhận trên thiết bị thật |
| Zoom 200% / reflow | ⬜ Chưa thực thi | ✅ Có (Ctrl +) | Chưa đo |

---

## 9. Tổng hợp: danh sách ứng viên checklist item

_(Đầu vào cho Module 3 — Checklist Generator. Tổng 54 ứng viên, sẽ lọc còn **50 mục** để không trùng tiêu chí + màn hình.)_

| # | IA | Màn hình | Mô tả kiểm chứng (1 dòng) | Nguồn |
|---|---|---|---|---|
| 1 | IA-01 | Login | Placeholder là nhãn duy nhất, tương phản ≥4.5:1 | runtime |
| 2 | IA-01 | Login | Tồn tại đúng 1 `<h1>` mô tả trang | runtime |
| 3 | IA-01 | Login | Ngôn ngữ giao diện đồng nhất tiếng Việt | runtime |
| 4 | IA-01 | Login | `<title>` phản ánh đúng tên sản phẩm | runtime |
| 5 | IA-01 | Login | Viền focus nhìn thấy trên cả input và button | runtime |
| 6 | IA-01 | Shell/Sidebar | Điều hướng bằng bàn phím tới mọi mục menu | runtime |
| 7 | IA-01 | Shell/Sidebar | Có landmark `nav`/`main` | runtime |
| 8 | IA-01 | Shell/Sidebar | Mục active phân biệt bằng nhiều tín hiệu, không chỉ màu | runtime |
| 9 | IA-01 | Dashboard | Grid 2 cột không vỡ ở viewport hẹp | runtime |
| 10 | IA-01 | Danh mục | Tiêu đề cột viết hoa nhất quán giữa các bảng | runtime |
| 11 | IA-01 | Sản phẩm | Giá hiển thị có dấu phân cách hàng nghìn + ₫ | runtime |
| 12 | IA-01 | Sản phẩm | Tương phản nút "Sửa"/"Xóa"/"Lưu" ≥4.5:1 | runtime |
| 13 | IA-01 | Sản phẩm | Vùng bấm nút trong bảng ≥44×44px | runtime |
| 14 | IA-01 | Import CSV | Tiêu đề luồng dùng `<h2>`/`<h3>` ngữ nghĩa, có text thay icon | runtime |
| 15 | IA-01 | Sản phẩm | Zoom 200% không vỡ layout | code |
| 16 | IA-01 | Toàn app | RTL: `dir="rtl"` đảo layout sidebar/bảng | code |
| 17 | IA-01 | Toàn app | Dark mode: bảng màu đọc được ở chế độ tối | code |
| 18 | IA-01 | Toàn app | `<html lang>` đúng tiếng Việt | runtime |
| 19 | IA-01 | Toàn app | Ảnh có alt mô tả nội dung | runtime |
| 20 | IA-02 | Login | Email dùng `type="email"` | runtime |
| 21 | IA-02 | Login | Mỗi field có `<label>` | runtime |
| 22 | IA-02 | Login | Field bắt buộc có ký hiệu `*` | code |
| 23 | IA-02 | Login | Mật khẩu có nút hiện/ẩn | code |
| 24 | IA-02 | Login | `autocomplete` đúng cho email/mật khẩu | runtime |
| 25 | IA-02 | Login | Submit rỗng bị chặn bởi validate, không gọi API | runtime |
| 26 | IA-02 | Danh mục | Tên danh mục bắt buộc, chặn rỗng ở client | runtime |
| 27 | IA-02 | Danh mục | Tên danh mục ≤ giới hạn / không trùng | code |
| 28 | IA-02 | Sản phẩm | Tên sản phẩm bắt buộc + ≤255 ký tự | runtime |
| 29 | IA-02 | Sản phẩm | Giá bắt buộc và > 0 | runtime |
| 30 | IA-02 | Sản phẩm | Select danh mục có nhãn | runtime |
| 31 | IA-02 | Sản phẩm | URL ảnh được kiểm tra định dạng URL | code |
| 32 | IA-02 | Import CSV | Chỉ nhận file `.csv` | runtime |
| 33 | IA-02 | Import CSV | Validate `name`/`price` trước khi import | runtime |
| 34 | IA-02 | Import CSV | Parser xử lý trường bọc dấu nháy kép (RFC 4180) | runtime |
| 35 | IA-02 | Import CSV | File rỗng / sai header báo lỗi rõ ràng | code |
| 36 | IA-02 | Toàn app | Lỗi hiển thị **trên** nút submit | runtime |
| 37 | IA-02 | Toàn app | Dữ liệu nhập không bị mất khi báo lỗi | code |
| 38 | IA-03 | Shell | URL đổi theo tab đang xem (deep-link) | runtime |
| 39 | IA-03 | Shell | Refresh giữ nguyên tab hiện tại | runtime |
| 40 | IA-03 | Shell | Nút Back của trình duyệt hoạt động đúng | runtime |
| 41 | IA-03 | Shell | Sau logout, Back không vào lại được app | code |
| 42 | IA-03 | Shell | Breadcrumb ở màn hình con | code |
| 43 | IA-03 | Shell | Mục menu active được đánh dấu `aria-current` | runtime |
| 44 | IA-03 | Dashboard | Từ Dashboard sang màn hình khác giữ được ngữ cảnh | code |
| 45 | IA-03 | Danh mục | Có tìm kiếm / phân trang khi danh mục nhiều | code |
| 46 | IA-03 | Sản phẩm | Có tìm kiếm / lọc / phân trang | code |
| 47 | IA-03 | Sản phẩm | Link tải file mẫu hoạt động | runtime |
| 48 | IA-03 | Login | Có đường dẫn quên mật khẩu | code |
| 49 | IA-04 | Login | Phân biệt lỗi sai mật khẩu vs khoá tài khoản vs không phải admin | runtime |
| 50 | IA-04 | Login | Nút bị disable + spinner khi đang gửi | code |
| 51 | IA-04 | Login | Thông báo thành công khi đăng nhập thành công | code |
| 52 | IA-04 | Dashboard | Có loading/skeleton khi tải dữ liệu | runtime |
| 53 | IA-04 | Dashboard | Empty state khi chưa có đơn hàng | runtime |
| 54 | IA-04 | Dashboard | Tổng doanh thu chỉ tính đơn `delivered`, đúng số liệu | code |
| 55 | IA-04 | Danh mục | Xóa có dialog xác nhận | runtime |
| 56 | IA-04 | Danh mục | Thông báo thành công sau khi thêm | code |
| 57 | IA-04 | Danh mục | Lỗi server hiển thị thân thiện, không lộ stack trace | code |
| 58 | IA-04 | Sản phẩm | Sửa 1 sản phẩm không ảnh hưởng sản phẩm khác | code |
| 59 | IA-04 | Sản phẩm | Xóa sản phẩm có dialog xác nhận | code |
| 60 | IA-04 | Sản phẩm | Empty state khi không có sản phẩm | code |
| 61 | IA-04 | Sản phẩm | Ảnh hỏng có fallback + thông báo | runtime |
| 62 | IA-04 | Import CSV | Nút Import disabled có lý do giải thích | runtime |
| 63 | IA-04 | Import CSV | Có tiến trình % khi import | code |
| 64 | IA-04 | Import CSV | Import lỗi → rollback toàn bộ, không insert dòng hợp lệ | code |
| 65 | IA-04 | Import CSV | Báo cáo kết quả: số dòng thành công / số dòng lỗi / lý do | runtime |
| 66 | IA-04 | Toàn app | Lỗi mạng → thông báo thân thiện + có nút thử lại | code |

> **Ghi chú về ảnh chụp tham chiếu**: ảnh runtime của từng màn hình đã lưu tại `gui-testing-outputs/screenshots/ref-*.png` (và `ref-san-pham-375px.png`). Đây là **ảnh tham chiếu cho tester đối chiếu**, **không** phải bằng chứng Failed — bằng chứng Failed phải do người thực thi chụp.
