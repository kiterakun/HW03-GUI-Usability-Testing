# 03 — GUI Checklist

| Trường | Nội dung |
|---|---|
| SUT | EShop — Web Admin (`eshop-sut/frontend-admin`) · `http://localhost:5174` (API `http://localhost:3000`) |
| Phạm vi | Admin Login · Dashboard Admin · Quản lý Danh mục · Quản lý Sản phẩm (CRUD) · Import sản phẩm từ CSV · Khung chung (Sidebar + các form) |
| Tiêu chuẩn | **4 Interface Aspects (IA-01 → IA-04)** — mỗi mục gắn đúng 1 IA |
| Người thiết kế | AI (OpenCode / MiniMax M3.1 Flash) |
| Ngày | 2026-11-11 (v3 — 2026-11-12) |
| Phiên bản checklist | **v3** — v1 (67 mục) → v2 (+10 mục, review) → **v3 (rút gọn còn 47 mục, bỏ FR-21..24 theo yêu cầu user)** |
| Tài khoản test | `admin@eshop.com` / `Admin123!` |
| Tổng số mục | **47** |

## Hướng dẫn cho tester

- Đánh dấu **Kết quả** = `Passed` hoặc `Failed`.
- Với mục **Failed**: điền **Bằng chứng** (đường dẫn ảnh) và **Ghi chú** (lý do fail, mô tả cụ thể).
- Không đánh dấu `N/A` trừ khi mục đó không áp dụng — ghi rõ lý do ở Ghi chú.
- **Không sửa** cột Tiêu chí kiểm chứng. Nếu một mục có vấn đề, ghi ở Ghi chú và báo lại.
- **Ưu tiên theo cột Mức độ** nếu thiếu thời gian: Blocker → Major → Minor.

> **Về tiêu chuẩn**: checklist này dùng **duy nhất 4 Interface Aspects**. Đặc tả SRS của SUT (`eshop-sut/README.md`) chỉ được dùng làm **ngữ cảnh** để xác định hành vi đúng, không phải làm tiêu chuẩn phân loại — mỗi mục chỉ thuộc 1 IA.

### Mẹo đo nhanh

| Việc | Cách làm |
|---|---|
| Đo tương phản màu | Chrome DevTools → F12 → `Ctrl+Shift+P` → `Show Contrast Issues`, hoặc chọn element → Computed → `color` / `background-color`. Đối chiếu với **giá trị đo sẵn** ghi trong cột "Cách kiểm chứng" |
| Kiểm tra `<label>` / `<h1>` / `aria` | F12 → Console → `document.querySelectorAll('label').length` |
| Kiểm tra phím Tab | Click vào vùng trống rồi nhấn `Tab` liên tục, quan sát viền focus và thứ tự dừng |
| Kiểm tra responsive | F12 → `Ctrl+Shift+M` → đặt viewport 375×667 và 768×1024 |
| Kiểm tra deep-link / Back | Xem thanh địa chỉ khi đổi tab; nhấn nút Back của trình duyệt |
| Kiểm tra dark mode | F12 → `Ctrl+Shift+P` → `Emulate CSS prefers-color-scheme: dark` |
| Kiểm tra RTL | F12 → Console → `document.documentElement.setAttribute('dir','rtl')` |

### File mẫu dùng để test (đã chuẩn bị sẵn)

Các file kiểm thử nằm ở `gui-testing-outputs/assets/` — dùng luôn, không cần tự tạo:

| File | Nội dung | Dùng cho mục |
|---|---|---|
| `quoted.csv` | 2 dòng; dòng 1 có trường **bọc dấu nháy kép chứa dấu phẩy**: `"Sản phẩm, loại A"` | GUI-IA02-012 |
| `invalid.csv` | 2 dòng; dòng 2 có `name` **rỗng**, dòng 3 có `price = -500` | GUI-IA02-011, GUI-IA04-012, GUI-IA04-013 |
| `vietnamese.csv` | 1 dòng hợp lệ, tiếng Việt có dấu | GUI-IA02-010 (file rỗng/sai header) — tạo thêm file header-only nếu cần |
| `sanpham.txt` | Cùng nội dung với CSV nhưng **đuôi `.txt`** | GUI-IA02-010 |

### Ảnh tham chiếu (runtime)

Các ảnh dưới `gui-testing-outputs/screenshots/` là **ảnh tham chiếu để đối chiếu**, không phải bằng chứng Failed:

| File | Màn hình |
|---|---|
| `ref-dashboard.png` | Dashboard Admin |
| `ref-danh-mục.png` | Quản lý Danh mục |
| `ref-sản-phẩm.png` | Quản lý Sản phẩm (kèm khối Import CSV) |
| `ref-san-pham-375px.png` | Quản lý Sản phẩm ở viewport 375px |
| `ref-mã-giảm-giá.png` | *(ngoài phạm vi)* Mã Giảm Giá |
| `ref-đơn-hàng.png` | *(ngoài phạm vi)* Đơn hàng |
| `ref-người-dùng.png` | *(ngoài phạm vi)* Người dùng |

---

## Bảng checklist

### IA-01 — General UI Standards (13 mục)

| ID | IA | Màn hình | Tiêu chí kiểm chứng | Kết quả mong đợi | Cách kiểm chứng | Mức độ | Kết quả | Bằng chứng | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| GUI-IA01-001 | IA-01 | Admin Login | Tương phản giữa màu chữ placeholder và nền ô nhập ≥ 4.5:1 | Contrast ≥ 4.5:1 (giá trị đo sẵn ở runtime: **2.35:1** → hiện đang FAIL) | Mở `/` → chọn ô Email → Computed → đọc `::placeholder` color và `background-color`; dùng công cụ contrast | Major | Failed | screenshots/GUI-IA01-001.png | Màu placeholder rgb(156,163,175) trên nền ô nhập rgb(246,246,246) → tương phản đo được 2.35:1, thấp hơn ngưỡng 4.5:1. Chữ placeholder gần như chìm vào nền ô nhập. |
| GUI-IA01-002 | IA-01 | Admin Login | Cả ô Email, ô Password và nút Login đều hiện viền focus rõ ràng khi nhấn `Tab` | Mỗi phần tử có viền focus nhìn thấy được (độ dày ≥ 2px hoặc đổi màu nền rõ) | Mở `/` → nhấn `Tab` liên tục, quan sát viền focus ở từng phần tử | Major | Failed | screenshots/GUI-IA01-002.png | Cả 3 phần tử đều nhận focus khi Tab, nhưng tín hiệu focus chỉ là outline mặc định của trình duyệt (outline 1px auto, box-shadow: none), không có viền ≥ 2px hay đổi màu nền rõ ràng. |
| GUI-IA01-003 | IA-01 | Admin Login | Cấu trúc tài liệu của trang đúng chuẩn: đúng **một** thẻ `<h1>` mô tả trang, `<html lang="vi">`, và `<title>` phản ánh tên sản phẩm (không phải `frontend-admin`) | `h1` = 1; `lang` = `vi`; `title` chứa tên sản phẩm | Mở `/` → F12 → Console → `document.querySelectorAll('h1').length`, `document.documentElement.lang`, `document.title` | Major | Failed | screenshots/GUI-IA01-003.png | Trang Login không có thẻ <h1> nào (đo được 0, tiêu đề dùng <h2>); html lang="en" thay vì "vi"; <title> là "frontend-admin" thay vì tên sản phẩm. |
| GUI-IA01-004 | IA-01 | Admin Login | 100% chuỗi hiển thị trên trang bằng tiếng Việt | Không còn chuỗi tiếng Anh nào (ví dụ "Admin Login", "Login", "Email", "Password"); ghi rõ chuỗi tiếng Anh còn lại nếu có | Mở `/` → đọc toàn bộ chữ hiển thị trên form | Major | Failed | screenshots/GUI-IA01-004.png | Còn nhiều chuỗi tiếng Anh trên form Login: tiêu đề "Admin Login", placeholder "Email" và "Password", nút "Login". 100% chuỗi hiển thị bằng tiếng Việt không đạt. |
| GUI-IA01-005 | IA-01 | Khung chung – Sidebar | Sidebar là một landmark điều hướng (`nav`), và cả 7 mục menu (Dashboard, Danh mục, Sản phẩm, Mã Giảm Giá, Đơn hàng, Người dùng, Đăng xuất) đều nhận focus bằng `Tab` và kích hoạt được bằng `Enter` | Có landmark `nav`; mỗi mục dừng focus được và kích hoạt được; không mục nào phải dùng chuột | Đăng nhập → F12 → Console → `document.querySelectorAll('nav').length`; click vùng nền sidebar → nhấn `Tab` liên tục đếm điểm dừng; nhấn `Enter` ở từng mục | Blocker | Failed | screenshots/GUI-IA01-005.png | Không có landmark điều hướng: document.querySelectorAll('nav').length = 0. 7 mục menu là thẻ <li> không có tabindex (tabIndex = -1) nên không dừng focus khi Tab (0/7 mục) và không kích hoạt được bằng Enter. Chuỗi điểm dừng thực tế: INPUT(Tên danh mục mới) → BUTTON → BUTTON → BUTTON → BUTTON → BODY. |
| GUI-IA01-006 | IA-01 | Khung chung – Sidebar | Mục menu đang active được phân biệt bằng **ít nhất 2 tín hiệu khác màu chữ** (ví dụ đậm, gạch chân, hoặc thuộc tính `aria-current`) | Mục active có ≥ 2 tín hiệu khác màu; mục không active không có tín hiệu nào | Click lần lượt từng mục, quan sát sidebar; F12 → Console → `document.querySelectorAll('[aria-current]').length` phải ≥ 1 | Major | Failed | screenshots/GUI-IA01-006.png | Mục active chỉ khác mục thường bằng 1 tín hiệu màu chữ (rgb(147,197,253) so với rgb(255,255,255)); font-weight giống nhau (400), không gạch chân, không nền khác, không có thuộc tính aria-current (số phần tử = 0). |
| GUI-IA01-007 | IA-01 | Khung chung – Sidebar | Khi đặt `dir="rtl"` lên `<html>`, không có phần tử nào chồng lấn, tràn ngang khung hoặc bị cắt chữ trong sidebar và bảng | Không chồng lấn, không tràn ngang, không cắt chữ | F12 → Console → `document.documentElement.setAttribute('dir','rtl')`; quan sát sidebar + bảng; đặt lại `dir="ltr"` sau khi kiểm | Minor | Passed | screenshots/GUI-IA01-007.png | Đặt dir="rtl": sidebar chuyển sang mép phải (left 1184, right 1440), vùng nội dung ở left 0 nên không chồng lấn; không phần tử nào bị cắt chữ (kiểm tra cả 7 mục sidebar, các thẻ bảng); tài liệu scrollWidth 1440 = clientWidth 1440 nên không tràn ngang. |
| GUI-IA01-008 | IA-01 | Khung chung – Sidebar | Khi trình duyệt ở chế độ tối (`prefers-color-scheme: dark`), mọi chữ trên sidebar và vùng nội dung vẫn đạt tương phản ≥ 4.5:1 (không có chữ đen trên nền tối) | Không có chữ/nền nào tương phản < 4.5:1; ghi nhận nếu ứng dụng chỉ hỗ trợ giao diện sáng | F12 → `Ctrl+Shift+P` → `Emulate CSS prefers-color-scheme: dark`; dùng công cụ contrast đo nền sidebar và nền nội dung | Minor | Failed | screenshots/GUI-IA01-008.png | Ứng dụng không hỗ trợ giao diện tối: khi emulate prefers-color-scheme: dark, mọi màu giữ nguyên như chế độ sáng (nền sidebar rgb(31,41,55), chữ trắng). Tương phản đo được ở chế độ tối vẫn có nhiều mục dưới 4.5:1 (nút Sửa 1.92:1, nút Xóa 3.76:1, nút Lưu sản phẩm 3.30:1, giá trị KPI 3.30:1). |
| GUI-IA01-009 | IA-01 | Dashboard Admin | Lưới 2 cột KPI giữ được chiều rộng đọc được ở viewport 375px và 768px (mỗi cột ≥ 150px) | Ở 375px và 768px, mỗi cột KPI rộng ≥ 150px và nội dung không bị bóp méo | F12 → Console → `getComputedStyle(document.querySelector('div.grid.grid-cols-2')).gridTemplateColumns` rồi `Ctrl+Shift+M` đặt 375×667 và 768×1024 (giá trị đo sẵn ở 375px: **"19.5px 19.5px"** → hiện đang FAIL) | Major | Failed | screenshots/GUI-IA01-009-375.png, screenshots/GUI-IA01-009-768.png | Ở 375px: gridTemplateColumns = "19.5px 19.5px" → mỗi cột KPI chỉ 19.5px (yêu cầu ≥ 150px), nội dung bị bóp méo. Ở 768px: "216px 216px" (đạt), nhưng lưới cố định 2 cột không có breakpoint responsive nào. |
| GUI-IA01-010 | IA-01 | Quản lý Sản phẩm | Ô "Giá" trong bảng hiển thị giá có dấu phân cách hàng nghìn và ký hiệu `₫` (ví dụ `30,000,000 ₫`) | Mọi dòng đều có dấu `,` phân cách hàng nghìn và đuôi ` ₫` (giá trị đo sẵn: `30000000 ₫` → hiện đang FAIL) | Đăng nhập → tab "Sản phẩm" → đọc cột "Giá"; so sánh với giá trị trong seed data | Major | Failed | screenshots/GUI-IA01-010.png | Cột "Giá" hiển thị "30000000 ₫", "28000000 ₫", "45000000 ₫", "6000000 ₫", "4000000 ₫" — không có dấu phân cách hàng nghìn (đáng lẽ phải là "30,000,000 ₫"). |
| GUI-IA01-011 | IA-01 | Quản lý Sản phẩm | Tương phản chữ trên nền của **tất cả** nút hành động trong màn hình này ("Sửa", "Xóa", "Lưu sản phẩm") ≥ 4.5:1 | Cả ba nút đạt ≥ 4.5:1 (giá trị đo sẵn: "Sửa" **1.92:1**, "Xóa" **3.76:1**, "Lưu sản phẩm" **3.30:1** → hiện đang FAIL) | Tab "Sản phẩm" → chọn từng nút → Computed → đọc `color` và `background-color` → dùng công cụ contrast | Major | Failed | screenshots/GUI-IA01-011.png | Tương phản chữ trên nền nút đo được: Sửa 1.92:1 (trắng trên rgb(234,179,8)), Xóa 3.76:1 (trắng trên rgb(239,68,68)), Lưu sản phẩm 3.30:1 (trắng trên rgb(22,163,74)) — cả ba đều dưới 4.5:1. |
| GUI-IA01-012 | IA-01 | Quản lý Sản phẩm | Vùng bấm của các nút "Sửa" và "Xóa" trong bảng ≥ 44×44 px | Chiều cao và chiều rộng vùng bấm ≥ 44px (giá trị đo sẵn: `px-2 py-1 text-sm` → cao ~26px → hiện đang FAIL) | Tab "Sản phẩm" → chọn nút "Sửa" → Computed → `height`/`width` (hoặc `getBoundingClientRect()`) | Minor | Failed | screenshots/GUI-IA01-012.png | Vùng bấm đo được: nút "Sửa" 39×28px, nút "Xóa" 40×28px — nhỏ hơn 44×44px (do padding px-2 py-1, text-sm). |
| GUI-IA01-013 | IA-01 | Quản lý Sản phẩm | Ở mức zoom 200%, bảng và form không vỡ layout và trang không xuất hiện thanh cuộn ngang | Không có cuộn ngang; cột bảng không chồng lấn | Ctrl + `+` đến 200% → quan sát toàn trang | Minor | Passed | screenshots/GUI-IA01-013.png | Mô phỏng zoom 200% (viewport CSS 720×450): trang KHÔNG xuất hiện thanh cuộn ngang (scrollWidth 720 = clientWidth 720), bảng và form không chồng lấn; bảng chỉ cuộn ngang bên trong vùng nội dung (overflow-x auto, 502px > 464px) và lưới form 2 cột bị nén còn 176px mỗi cột. |

### IA-02 — Forms (12 mục)

| ID | IA | Màn hình | Tiêu chí kiểm chứng | Kết quả mong đợi | Cách kiểm chứng | Mức độ | Kết quả | Bằng chứng | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| GUI-IA02-001 | IA-02 | Khung chung – Các form | Mọi ô nhập ở cả 4 form (Login: 2 ô; Danh mục: 1 ô; Sản phẩm: 4 ô + 1 select; Import CSV: 1 file input) đều có thẻ `<label>` gắn đúng qua `for`/`id`; placeholder KHÔNG được dùng làm nhãn duy nhất | Mỗi input/select/textarea có nhãn hiển thị luôn; nhãn không biến mất khi đã nhập; `document.querySelectorAll('label').length` ≥ 8 trên màn "Sản phẩm" | Lần lượt mở từng màn: Login → Danh mục → Sản phẩm → khối Import; F12 → Console → `document.querySelectorAll('label').length` (giá trị đo sẵn: **0** trên mọi màn → hiện đang FAIL) | Blocker | Failed | screenshots/GUI-IA02-001.png | Đếm thẻ <label> trên màn "Quản lý Sản phẩm" (gồm cả khối Import CSV): 0 thẻ cho 6 ô input/select/textarea + 1 ô chọn file — placeholder là nhãn duy nhất. Màn Login: 0 thẻ cho 2 ô. Màn Danh mục: 0 thẻ cho 1 ô. Không có cặp for/id nào. |
| GUI-IA02-002 | IA-02 | Khung chung – Các form | Trường bắt buộc được đánh dấu bằng ký hiệu `*` kèm quy tắc cụ thể | Mỗi trường bắt buộc có `*`; nhãn nêu rõ điều kiện (vd "bắt buộc", "tối đa 255 ký tự") | Lần lượt mở từng form → quan sát vùng nhãn của các ô bắt buộc | Major | Failed | screenshots/GUI-IA02-002.png | Không có ký hiệu "*" nào trên trang (đếm được 0 ký hiệu) ở cả 4 form. Chỉ ô "Tên sản phẩm" có thuộc tính HTML required, không có thông báo kèm điều kiện/giới hạn; ô "Giá tiền" không được đánh dấu bắt buộc. |
| GUI-IA02-003 | IA-02 | Admin Login | Ô email dùng `type="email"` và trình duyệt chặn được email sai định dạng ngay, không gửi request | `input.type === 'email'`; nhập `abc` → trình duyệt báo lỗi, tab Network **không** có request `POST /api/login` | Mở `/` → F12 → Console → `document.querySelector('input').type`; nhập `abc` rồi bấm Login, quan sát tab Network | Major | Failed | screenshots/GUI-IA02-003.png | Ô email không có type="email" mà là type="text" (đo được), nên trình duyệt không chặn: nhập "abc" rồi bấm Login vẫn gửi 1 request POST http://localhost:3000/api/login. |
| GUI-IA02-004 | IA-02 | Admin Login | Submit form rỗng bị chặn ở client: không gửi request lên server và không hiện thông báo lỗi | Tab Network không có request `POST /api/login`; không có thông báo lỗi hiện ra | Mở `/` → F12 → tab Network → bấm Login với form rỗng → quan sát Network (giá trị đo sẵn: **vẫn gửi request và hiện alert "Đăng nhập thất bại"**) | Major | Failed | screenshots/GUI-IA02-004.png | Submit form rỗng KHÔNG bị chặn ở client: vẫn gửi 1 request POST /api/login và hiện hộp thoại "Đăng nhập thất bại" thay vì thông báo lỗi cạnh form. |
| GUI-IA02-005 | IA-02 | Admin Login | Ô email có `autocomplete="username"`, ô mật khẩu có `autocomplete="current-password"` | Hai thuộc tính `autocomplete` đúng như yêu cầu | Mở `/` → F12 → Console → `[...document.querySelectorAll('input')].map(i=>i.autocomplete)` | Minor | Failed | screenshots/GUI-IA02-005.png | Cả 2 ô đều không có thuộc tính autocomplete (getAttribute('autocomplete') = null cho ô Email và ô Password), nên trình duyệt không tự động điền. |
| GUI-IA02-006 | IA-02 | Quản lý Sản phẩm | Tên sản phẩm bắt buộc và bị giới hạn ≤ 255 ký tự, kèm thông báo khi vượt quá | Nhập 256 ký tự → bị chặn hoặc hiện thông báo nêu rõ giới hạn 255 | Tab "Sản phẩm" → dán 256 ký tự vào ô "Tên sản phẩm" → bấm "Lưu sản phẩm" | Major | Failed | screenshots/GUI-IA02-006.png | Dán 256 ký tự vào ô "Tên sản phẩm": không có thuộc tính maxlength (maxLength = -1), không có thông báo nào về giới hạn 255 ký tự, form vẫn gửi 1 request POST /api/products với toàn bộ 256 ký tự. |
| GUI-IA02-007 | IA-02 | Quản lý Sản phẩm | Ô "Giá tiền" bắt buộc và phải > 0; giá rỗng, giá `0` hoặc giá `-100` đều bị chặn ở client kèm thông báo | Không có request `POST/PUT /api/products` khi giá không hợp lệ; hiện thông báo lỗi cụ thể | Tab "Sản phẩm" → thử lần lượt: bỏ trống giá, giá `0`, giá `-100` → bấm "Lưu sản phẩm" → kiểm tra Network mỗi lần | Blocker | Failed | screenshots/GUI-IA02-007.png | Không có validate ở client: giá để trống, giá 0 và giá -100 đều gửi 1 request POST /api/products (price lần lượt là "", "0", "-100") và không hiện thông báo lỗi nào. |
| GUI-IA02-008 | IA-02 | Quản lý Danh mục | Tên danh mục rỗng hoặc chỉ gồm khoảng trắng bị chặn trước khi gửi lên server | Không có request `POST /api/categories`; hiện thông báo lỗi cụ thể cạnh ô nhập | Tab "Danh mục" → để trống ô → bấm "Thêm mới" → kiểm tra tab Network | Blocker | Failed | screenshots/GUI-IA02-008.png | Tên danh mục để trống và tên chỉ gồm khoảng trắng đều không bị chặn: mỗi lần đều gửi 1 request POST /api/categories (body {"name":""} và {"name":"   "}), không có thông báo lỗi cạnh ô nhập. |
| GUI-IA02-009 | IA-02 | Quản lý Sản phẩm | Khi server từ chối lưu, toàn bộ dữ liệu đã nhập vẫn còn nguyên trong form | Sau khi hiện lỗi, tên/giá/mô tả/URL ảnh vẫn hiển thị đúng như trước khi bấm Lưu | Tab "Sản phẩm" → nhập đầy đủ → dừng backend (`Ctrl+C` ở terminal server) → bấm "Lưu sản phẩm" → quan sát form sau khi lỗi hiện | Major | Passed | screenshots/GUI-IA02-009.png | Tắt backend rồi bấm "Lưu sản phẩm": hộp thoại báo "Lỗi lưu sản phẩm: Network Error" nhưng toàn bộ dữ liệu đã nhập vẫn còn nguyên trong form (tên "QA Giữ Dữ Liệu", giá "777000", ảnh "https://placehold.co/300", mô tả "Mô tả QA giữ dữ liệu"). |
| GUI-IA02-010 | IA-02 | Import CSV | Chỉ file có đuôi `.csv` được chấp nhận; file đuôi khác, file rỗng, hoặc file thiếu cột bắt buộc đều bị từ chối kèm thông báo nêu rõ lỗi ở đâu | Chọn `.txt` → hiện thông báo lỗi, nút Import không bật; file rỗng / thiếu cột `price` → báo rõ thiếu gì | Tab "Sản phẩm" → khối Import → chọn `gui-testing-outputs/assets/sanpham.txt`; tạo thêm file rỗng và file chỉ có header `name,price,description,imageUrl,category_id` rồi chọn lần lượt (giá trị đo sẵn: **`.txt` vẫn được chấp nhận và nút Import bật**) | Major | Failed | screenshots/GUI-IA02-010-txt.png, screenshots/GUI-IA02-010-empty.png, screenshots/GUI-IA02-010-header.png | File đuôi .txt vẫn được chấp nhận: sau khi chọn sanpham.txt, nút hiện "Import 1 sản phẩm" và KHÔNG bị disable. File rỗng và file chỉ có header đều cho preview 0 dòng, nút bị disable nhưng KHÔNG có thông báo lỗi nào nêu rõ thiếu gì. |
| GUI-IA02-011 | IA-02 | Import CSV | `name` rỗng và `price` không phải số dương bị chặn trước khi import, kèm thông báo chỉ rõ dòng lỗi | Preview hoặc thông báo đánh dấu dòng lỗi; nút Import không cho gửi dữ liệu lỗi lên server | Chọn `gui-testing-outputs/assets/invalid.csv` (dòng 2 có `name` rỗng, dòng 3 có `price = -500`) → quan sát preview và nhãn nút Import (giá trị đo sẵn: **vẫn hiện preview bình thường, không cảnh báo**) | Blocker | Failed | screenshots/GUI-IA02-011.png | Chọn invalid.csv: preview hiển thị 2 dòng bình thường, không cảnh báo dòng nào lỗi (dòng 2 có name rỗng hiện ô trống, dòng 3 có price -500 hiện nguyên); nút "Import 2 sản phẩm" vẫn bật, không có thông báo chỉ rõ dòng lỗi. |
| GUI-IA02-012 | IA-02 | Import CSV | File CSV có trường chứa dấu phẩy được bọc dấu nháy kép được tách đúng thành 1 cột | Preview hiển thị đúng 5 cột, không bị tách nhầm (giá trị đo sẵn: **`"Sản phẩm, loại A"` bị tách thành 2 cột**) | Chọn `gui-testing-outputs/assets/quoted.csv` → xem bảng "Xem trước" | Blocker | Failed | screenshots/GUI-IA02-012.png | CSV có trường bọc nháy kép chứa dấu phẩy bị tách sai: dòng 1 hiển thị 6 cột ["Sản phẩm", "loại A", "100000", "Mô tả có", "dấu phẩy", ...] thay vì 5 cột; giá trị "Sản phẩm, loại A" bị cắt thành 2 trường. |

### IA-03 — Navigation (9 mục)

| ID | IA | Màn hình | Tiêu chí kiểm chứng | Kết quả mong đợi | Cách kiểm chứng | Mức độ | Kết quả | Bằng chứng | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| GUI-IA03-001 | IA-03 | Khung chung – Sidebar | URL thay đổi theo tab đang xem (deep-link): mỗi tab có 1 URL riêng và mở trực tiếp URL đó được vào đúng tab | Mỗi tab có URL riêng; copy URL tab rồi mở tab mới vẫn vào đúng tab (giá trị đo sẵn: **URL không đổi, luôn là `/`** → hiện đang FAIL) | Đăng nhập → click từng mục sidebar → quan sát thanh địa chỉ; copy URL của tab "Sản phẩm" rồi mở tab trình duyệt mới | Blocker | Failed | screenshots/GUI-IA03-001-deeplink.png, screenshots/GUI-IA03-001.png | URL không đổi khi chuyển tab: Dashboard, Danh mục, Sản phẩm, Mã Giảm Giá, Đơn hàng, Người dùng đều giữ http://localhost:5174/. Mở trực tiếp URL sâu http://localhost:5174/san-pham (đang đã đăng nhập) → ứng dụng vẫn hiện màn "Dashboard", mục active là Dashboard, không có form Quản lý Sản phẩm. |
| GUI-IA03-002 | IA-03 | Khung chung – Sidebar | Tải lại trang (F5) giữ nguyên tab đang xem | Sau F5 vẫn ở tab đang xem trước đó | Đăng nhập → sang tab "Danh mục" → nhấn F5 → quan sát tab đang active | Major | Failed | screenshots/GUI-IA03-002.png | Đang ở tab "Danh mục" thì nhấn F5 → sau khi tải lại màn hiện là "Dashboard" (mục active = Dashboard, tiêu đề "Dashboard"); vì URL không đổi nên không khôi phục được tab đang xem. |
| GUI-IA03-003 | IA-03 | Khung chung – Sidebar | Sau khi bấm "Đăng xuất", nhấn nút Back của trình duyệt KHÔNG quay lại được phần đã đăng nhập | Back không đưa người dùng vào lại vùng đã đăng nhập; nếu vào được thì phải bị chuyển về màn Login | Đăng nhập → bấm "Đăng xuất" → nhấn nút Back của trình duyệt → quan sát | Blocker | Passed | screenshots/GUI-IA03-003.png | Bấm "Đăng xuất" → hiện form Login, token bị xoá khỏi localStorage. Nhấn Back không quay lại được vùng đã đăng nhập: ứng dụng không tạo lịch sử riêng (history.length = 2, chỉ có entry gốc), nên Back chỉ ra ngoài ứng dụng (about:blank), không vào lại khu vực đã đăng nhập. |
| GUI-IA03-004 | IA-03 | Khung chung – Sidebar | Mỗi màn hình con hiển thị đường dẫn điều hướng (breadcrumb) hoặc tiêu đề cấp 1 cho biết đang ở đâu | Có breadcrumb bấm được, hoặc tiêu đề cấp 1 mô tả đúng màn hình đang xem | Đăng nhập → lần lượt vào "Danh mục", "Sản phẩm" → quan sát có breadcrumb hay tiêu đề mô tả màn hình | Minor | Failed | screenshots/GUI-IA03-004.png | Không có breadcrumb ở bất kỳ màn nào (số phần tử breadcrumb = 0). Mỗi màn chỉ có <h2> mô tả đúng màn hình ("Quản lý Danh mục", "Quản lý Sản phẩm", "Dashboard") nhưng <h1> duy nhất là "EShop Admin" — tên sản phẩm, không mô tả màn hình đang xem. |
| GUI-IA03-005 | IA-03 | Khung chung – Sidebar | Mở một URL không tồn tại (ví dụ `http://localhost:5174/khong-ton-tai`) sẽ hiện trang lỗi 404 hữu ích có nút quay về màn hình chính, không phải màn trắng hoặc màn trống | Có thông báo lỗi 404 + nút "Về trang chủ"/"Đăng nhập" | Dán URL `http://localhost:5174/khong-ton-tai` vào thanh địa chỉ rồi Enter | Minor | Failed | screenshots/GUI-IA03-005.png | Mở http://localhost:5174/khong-ton-tai trả HTTP 200 vì Vite SPA fallback trả index.html → ứng dụng hiện màn Login bình thường, không có thông báo lỗi 404 (không khớp mẫu 404 / không tìm thấy) và không có nút quay về màn hình chính. |
| GUI-IA03-006 | IA-03 | Quản lý Sản phẩm | Bấm "Sửa" điền đúng giá trị sản phẩm đó vào form; bấm "Hủy sửa" trả form về trạng thái "Thêm sản phẩm mới" và xoá sạch dữ liệu cũ | Form đổi tiêu đề thành "Sửa sản phẩm", mọi field nhận đúng giá trị; sau khi "Hủy sửa" các field trống và tiêu đề về "Thêm sản phẩm mới" | Tab "Sản phẩm" → bấm "Sửa" ở dòng thứ 2 → quan sát form → bấm "Hủy sửa" → quan sát lại | Major | Passed | screenshots/GUI-IA03-006.png, screenshots/GUI-IA03-006-cancel.png | Bấm "Sửa" ở dòng 2: tiêu đề form đổi thành "Sửa sản phẩm", các ô nhận đúng dữ liệu (tên "Samsung Galaxy S24 Ultra", giá "28000000", mô tả "Màn hình hiển thị xuất sắc, camera siêu zoom"). Bấm "Hủy sửa": tiêu đề về "Thêm sản phẩm mới" và cả 4 ô đã trống. |
| GUI-IA03-007 | IA-03 | Quản lý Sản phẩm | Danh sách sản phẩm có ô tìm kiếm hoặc bộ lọc (theo danh mục) hoặc phân trang | Có công cụ quản lý danh sách; không phải bảng dài không có tìm kiếm/lọc/phân trang | Tab "Sản phẩm" → quan sát vùng phía trên bảng; thử tìm theo tên | Major | Failed | screenshots/GUI-IA03-007.png | Bảng sản phẩm (5 dòng seed) không có ô tìm kiếm, không có bộ lọc theo danh mục (chỉ 1 select dùng để chọn danh mục khi thêm mới) và không có phân trang — danh sách là bảng dài không có công cụ quản lý. |
| GUI-IA03-008 | IA-03 | Import CSV | Link "Tải file mẫu (template.csv)" tải được file mẫu hợp lệ, đúng định dạng và import thử không lỗi | File tải về có đuôi `.csv`, header đúng `name,price,description,imageUrl,category_id`, và import file đó không báo lỗi | Tab "Sản phẩm" → bấm "Tải file mẫu (template.csv)" → mở file đã tải bằng Notepad → quan sát header | Major | Passed | screenshots/GUI-IA03-008.png | Link "Tải file mẫu (template.csv)" tải về file tên template_import.csv (đuôi .csv) với header đúng "name,price,description,imageUrl,category_id" và 1 dòng mẫu hợp lệ (Tên sản phẩm mẫu, 100000, ...), định dạng import được. |
| GUI-IA03-009 | IA-03 | Khung chung – Sidebar | Sau khi chuyển sang tab khác, focus (điểm nhận bàn phím) được chuyển vào vùng nội dung mới thay vì đứng lại ở mục menu vừa bấm | Focus rời khỏi mục menu và nằm trong vùng nội dung mới (hoặc `h1` của màn hình mới) | Đăng nhập → bấm mục "Danh mục" bằng chuột → nhấn `Tab` → quan sát phần tử nào nhận focus | Minor | Passed | screenshots/GUI-IA03-009.png | Bấm mục "Danh mục" bằng chuột rồi nhấn Tab: focus dừng ở <INPUT> placeholder="Tên danh mục mới" — nằm trong vùng nội dung mới, không đứng lại ở mục menu vừa bấm (mục <li> không nhận focus). |

### IA-04 — Feedback / State (13 mục)

| ID | IA | Màn hình | Tiêu chí kiểm chứng | Kết quả mong đợi | Cách kiểm chứng | Mức độ | Kết quả | Bằng chứng | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| GUI-IA04-001 | IA-04 | Admin Login | Thông báo lỗi phân biệt được 4 tình huống: sai mật khẩu / tài khoản bị khoá / tài khoản không phải admin / lỗi mạng | Mỗi tình huống có thông báo **khác nhau** và nêu cách xử lý | Thử lần lượt: (1) sai mật khẩu, (2) sai ≥2 lần để bị khoá, (3) đăng nhập bằng `test@eshop.com` (user thường), (4) tắt backend rồi đăng nhập → so sánh 4 thông báo | Blocker | Failed | screenshots/GUI-IA04-001-network.png, screenshots/GUI-IA04-001.png | 4 tình huống chỉ cho 2 thông báo khác nhau: sai mật khẩu → "Đăng nhập thất bại"; bị khoá (sai lần 2) → "Đăng nhập thất bại"; không phải admin → "Bạn không phải là admin!"; lỗi mạng (đã tắt backend) → "Đăng nhập thất bại". Không thông báo nào nêu cách xử lý. |
| GUI-IA04-002 | IA-04 | Admin Login | Thông báo lỗi hiển thị **trên nút submit** (không phải dưới) và không chặn toàn bộ giao diện bằng hộp thoại hệ thống | Lỗi nằm ngay trên nút Login; không có hộp thoại `alert()` native; có thể tiếp tục thao tác ngay | Nhập sai mật khẩu → bấm Login → quan sát vị trí thông báo và xem có hộp thoại hệ thống bật lên không (giá trị đo sẵn: **hiện `alert("Đăng nhập thất bại")`, lỗi nằm dưới form** — hộp thoại native chặn UI) | Blocker | Failed | screenshots/GUI-IA04-002.png | Sai mật khẩu → hộp thoại hệ thống native (type=alert, message="Đăng nhập thất bại") hiện lên và chặn toàn bộ giao diện; trong DOM không có phần tử lỗi nào được render cạnh nút Login, lỗi không nằm trên nút submit. |
| GUI-IA04-003 | IA-04 | Admin Login | Trong lúc gửi request, nút Login bị disable và có chỉ báo đang xử lý (spinner hoặc chữ "Đang đăng nhập…") | Nút không bấm lại được; có phản hồi trực quan trong lúc chờ | Đăng nhập rồi quan sát nút trong lúc chờ; hoặc DevTools → Network → Slow 3G rồi bấm Login | Major | Failed | screenshots/GUI-IA04-003.png | Trong lúc gửi request (mô phỏng độ trễ 2s cho /api/login): nút Login vẫn disabled=false và nhãn giữ nguyên "Login" — không bị disable, không có spinner, không có chữ "Đang đăng nhập…". |
| GUI-IA04-004 | IA-04 | Dashboard Admin | Trong lúc tải dữ liệu có skeleton/spinner thay vì để trang trắng rỗng | Trong lúc chờ vẫn thấy khung nội dung hoặc spinner; không nháy trắng | DevTools → Network → Slow 3G → đăng nhập lại → quan sát vùng nội dung lúc tải | Major | Failed | screenshots/GUI-IA04-004.png | Trong lúc tải (mô phỏng độ trễ 2.5s cho /api/admin/orders): vùng nội dung chỉ có 1 phần tử và hiển thị luôn khung Dashboard với giá trị 0 — không có skeleton/spinner nào, trang nháy trắng rồi hiện số 0. |
| GUI-IA04-005 | IA-04 | Dashboard Admin | Khi chưa có đơn hàng nào, hiện empty state có thông điệp thân thiện thay vì con số "0" trần trụi | Có thông điệp giải thích (vd "Chưa có đơn hàng nào") thay cho số 0 trần | Đăng nhập → tab Dashboard (trạng thái seed hiện tại chưa có đơn hàng) → quan sát 2 thẻ KPI (giá trị đo sẵn: chỉ hiện `0 ₫` và `0`, không có thông điệp) | Major | Failed | screenshots/GUI-IA04-005.png | Khi chưa có đơn hàng nào, 2 thẻ KPI chỉ hiện "Tổng doanh thu (Delivered)  /  0 ₫" và "Tổng số đơn hàng  /  0" — không có thông điệp thân thiện kiểu "Chưa có đơn hàng nào". |
| GUI-IA04-006 | IA-04 | Khung chung – Các màn hình | Sau mỗi thao tác ghi thành công (thêm / sửa / xoá danh mục, sản phẩm, import) có thông báo xác nhận nêu rõ **đã làm gì** | Thông báo cụ thể (vd "Đã thêm danh mục X"), không chỉ là form được reset trong im lặng | Tab "Danh mục" → thêm 1 danh mục hợp lệ → quan sát (giá trị đo sẵn: **không có thông báo nào, chỉ xoá sạch ô nhập**) | Major | Failed | screenshots/GUI-IA04-006-products.png, screenshots/GUI-IA04-006.png | Thêm danh mục "QA Thông Báo Test": bảng cập nhật thành công nhưng không có bất kỳ thông báo nào (0 vùng thông báo trong DOM, chỉ có ô nhập được xoá trong im lặng). Thêm sản phẩm cũng không có thông báo. Khi sửa có hộp thoại "Cập nhật thành công!" — chung chung, không nêu đã làm gì với đối tượng nào. |
| GUI-IA04-007 | IA-04 | Khung chung – Các màn hình | Lỗi từ server hoặc lỗi mạng hiển thị thân thiện, nêu nguyên nhân và có cách khắc phục; không lộ stack trace hay câu SQL; dữ liệu đã nhập không bị mất | Thông báo bằng tiếng Việt + nút thử lại; không có đoạn mã SQL/SQLite; form giữ nguyên dữ liệu | Dừng backend (`Ctrl+C`) rồi thử thêm/sửa/xoá ở tab "Danh mục" và "Sản phẩm" → quan sát thông báo | Major | Failed | screenshots/GUI-IA04-007.png, screenshots/GUI-IA04-007-load.png | Tắt backend: lúc tải trang, lỗi mạng bị nuốt hoàn toàn (0 thông báo, không có vùng lỗi nào trong DOM). Khi thao tác, hộp thoại native hiện thông báo kỹ thuật "Lỗi lưu sản phẩm: Network Error" / "Lỗi thêm DM: Network Error" — không phải tiếng Việt thân thiện, không có nút thử lại, không có thông báo cạnh ô nhập. |
| GUI-IA04-008 | IA-04 | Khung chung – Các màn hình | Mọi hành động xoá (danh mục, sản phẩm) phải hiện hộp thoại xác nhận nêu rõ **tên** đối tượng sẽ bị xoá; bấm "Huỷ" thì dữ liệu vẫn còn | Có hộp thoại xác nhận trước khi xoá; hủy thì không mất dữ liệu | Tab "Danh mục" → bấm "Xóa" ở một dòng → quan sát có hộp thoại xác nhận không; lặp lại ở tab "Sản phẩm" (giá trị đo sẵn: **không có hộp thoại nào, xoá thẳng** — lúc khảo sát AI vô tình xoá mất danh mục seed "Điện thoại" và phải khôi phục lại) | Blocker | Failed | screenshots/GUI-IA04-008.png | Bấm "Xóa" ở dòng "QA Xoá Test": không có hộp thoại xác nhận nào (số dialog = 0), dòng bị xoá thẳng khỏi bảng (còn lại Điện thoại, Laptop, Phụ kiện) — không hỏi lại và không nêu tên đối tượng sẽ bị xoá. |
| GUI-IA04-009 | IA-04 | Dashboard Admin | Tổng doanh thu và tổng số đơn hàng khớp đúng dữ liệu thật: doanh thu = **tổng** `total_amount` của các đơn `delivered` (không nhân hệ số), tổng đơn = số dòng bảng Đơn hàng | Hai con số khớp dữ liệu; không gấp đôi | **Cần dữ liệu trước**: tạo ≥1 đơn `delivered` (mua hàng ở frontend-web :5173 → Checkout, rồi tab "Đơn hàng" bấm "Hoàn thành") → ghi lại tổng tiền các đơn đó → tải lại Dashboard → so sánh (giá trị đo sẵn trong code: công thức đang nhân `* 2` → hiện đang FAIL) | Blocker | Failed | screenshots/GUI-IA04-009.png | Dữ liệu thật: 4 đơn hàng, trong đó 1 đơn delivered 150.000 ₫ → tổng tiền delivered = 150.000 ₫. Dashboard hiển thị "Tổng doanh thu (Delivered)  /  300,000 ₫" (gấp đôi). Tổng số đơn hiện 4 và bảng Đơn hàng có 4 dòng nên phần này khớp. |
| GUI-IA04-010 | IA-04 | Quản lý Sản phẩm | Sửa 1 sản phẩm chỉ thay đổi sản phẩm đó; tên của các sản phẩm khác giữ nguyên | Sau khi sửa và lưu, chỉ dòng sửa đổi; các dòng khác giữ nguyên tên và giá | Tab "Sản phẩm" → ghi lại tên của 3 dòng đầu → bấm "Sửa" ở dòng 2 → đổi tên → bấm "Lưu sản phẩm" → so sánh cả bảng (giá trị đo sẵn trong code: tên **mọi** sản phẩm bị đổi theo tên vừa sửa → hiện đang FAIL). **Lưu ý: mục này sẽ sửa dữ liệu, hãy ghi lại danh sách tên trước để khôi phục** | Blocker | Failed | screenshots/GUI-IA04-010.png | Trước khi sửa: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, MacBook Pro M3, Tai nghe AirPods Pro 2, Bàn phím cơ Keychron Q1. Sửa dòng 2 thành "QA Tên Mới" và lưu → bảng hiển thị "QA Tên Mới" cho CẢ 5 dòng, không chỉ dòng được sửa. Đã khôi phục lại tên sản phẩm id=2 trong DB sau khi kiểm thử. |
| GUI-IA04-011 | IA-04 | Import CSV | Trong lúc import có chỉ báo tiến trình (phần trăm hoặc số dòng đã xử lý), không chỉ có chữ "Đang import..." | Có thanh % hoặc đếm số dòng đã xử lý | Import file nhiều dòng (≥ 50 dòng) → quan sát nút trong lúc chạy (giá trị đo sẵn: **chỉ đổi chữ thành "Đang import..."**) | Major | Failed | screenshots/GUI-IA04-011.png | Import file 60 dòng (mô phỏng độ trễ 2.5s): nút chỉ đổi chữ thành "Đang import..." và bị disable — không có thanh phần trăm, không có bộ đếm số dòng đã xử lý. |
| GUI-IA04-012 | IA-04 | Import CSV | Khi có dòng lỗi, toàn bộ import được rollback: **không** sản phẩm nào trong file bị ghi vào DB | Sau khi import file có lỗi, bảng sản phẩm không thêm dòng nào từ file đó | Chọn `gui-testing-outputs/assets/invalid.csv` → bấm Import → kiểm tra tab "Sản phẩm" xem có dòng mới nào không (giá trị đo sẵn trong code: **backend không dùng transaction, các dòng hợp lệ vẫn được insert**) | Blocker | Failed | screenshots/GUI-IA04-012.png | Import invalid.csv: bảng sản phẩm tăng từ 69 lên 70 dòng và dòng mới ghi vào DB là "Tên OK" (giá -500) — dòng lỗi vẫn được insert, không rollback toàn bộ giao dịch. |
| GUI-IA04-013 | IA-04 | Import CSV | Báo cáo kết quả import nêu rõ: số dòng thành công, số dòng lỗi, và lý do lỗi của từng dòng | Thông báo có cả 3 thông tin; mỗi dòng lỗi có lý do cụ thể (vd "Hàng 3: Thiếu tên sản phẩm") | Import file `invalid.csv` → đọc ô kết quả màu xanh/đỏ bên dưới | Major | Failed | screenshots/GUI-IA04-013.png | Ô kết quả hiện "Import hoàn tất: 1/2 sản phẩm được thêm" kèm lý do lỗi "Hàng 2: Thiếu tên sản phẩm" — nhưng KHÔNG nêu số dòng lỗi và dòng 3 (giá -500) không bị đánh dấu là lỗi nào, nên báo cáo không đủ 3 thông tin. |

---

## Tổng hợp

### Theo Interface Aspect

| IA | Số mục | Ghi chú |
|---|---|---|
| IA-01 General UI Standards | 13 | Gồm 4 mục accessibility (bàn phím + landmark, focus ring, tín hiệu không phải màu, focus order) + 1 mục RTL + 1 mục dark mode + 2 mục responsive/zoom |
| IA-02 Forms | 12 | 4 form thật (Login / Danh mục / Sản phẩm / Import CSV); 2 mục áp dụng chung cho mọi form |
| IA-03 Navigation | 9 | Trọng tâm: ứng dụng không có routing, không có deep-link, không có breadcrumb, không có trang 404 |
| IA-04 Feedback / State | 13 | Trọng tâm: 5 call-site `alert()` native, thiếu empty state, thiếu loading, thiếu confirm xóa |
| **Tổng** | **47** | |

### Theo màn hình

| Màn hình | Số mục riêng | Ghi chú |
|---|---|---|
| Admin Login | 10 | |
| Khung chung – Sidebar | 10 | |
| Quản lý Sản phẩm (CRUD) | 10 | + 5 mục dùng chung (IA-02-001/002, IA-04-006/007/008) |
| Import sản phẩm từ CSV | 7 | + 5 mục dùng chung (IA-02-001/002, IA-04-006/007/008) |
| Dashboard Admin | 4 | + 5 mục dùng chung (IA-02-001/002, IA-04-006/007/008) |
| Quản lý Danh mục | 1 | + 5 mục dùng chung (IA-02-001/002, IA-04-006/007/008) → 6 mục áp dụng |
| Khung chung – Các form (áp dụng cả 4 form) | 2 | |
| Khung chung – Các màn hình (áp dụng mọi màn) | 3 | |
| **Tổng** | **47** | 5 mục "dùng chung" được tính ở nhóm Khung chung, không nhân bản theo màn hình |

### Theo mức độ

| Mức độ | Số mục |
|---|---|
| Blocker | 14 |
| Major | 25 |
| Minor | 8 |
| Cosmetic | 0 |

---

## Checklist tự kiểm trước khi thực thi

| Kiểm | Đạt? |
|---|---|
| Tổng số mục > 40 | ✅ 47 |
| Mỗi IA ≥ 8 mục | ✅ 13 / 12 / 9 / 13 |
| Không có 2 mục trùng tiêu chí + màn hình | ✅ kiểm bằng script — 0 cặp trùng |
| Mọi mục có "Cách kiểm chứng" cụ thể | ✅ |
| Có mục accessibility / RTL / dark mode / responsive | ✅ 4 / 1 / 1 / 2 (+1 zoom) |
| Cột Kết quả / Bằng chứng / Ghi chú còn trống | ✅ 47/47 dòng trống |
| Không có mục nào dùng từ mơ hồ ("dễ", "đẹp", "hợp lý") | ✅ — mọi mục dùng ngưỡng đo cụ thể (px, giây, tỷ lệ, số lượng) |
| Chỉ dùng 4 IA, không trộn tiêu chuẩn khác | ✅ không còn mã FR-xx trong bất kỳ mục nào |
