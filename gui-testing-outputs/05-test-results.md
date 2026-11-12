# 05 — Phân tích kết quả kiểm thử

| Trường | Nội dung |
|---|---|
| Checklist được thực thi | `03-gui-checklist.md` (v3 — 47 mục, 4 Interface Aspects) |
| Người thực thi | Người dùng (tester) — AI **không** đánh dấu Pass/Fail, chỉ phân tích kết quả |
| Thời gian thực thi | 2026-11-11 → 2026-11-12 |
| Môi trường | Chrome 157 (headless + DevTools Protocol) · Windows · viewport 1440×900 (thêm 375×667, 768×1024) · `http://localhost:5174` + API `http://localhost:3000` · admin@eshop.com |

---

## 1. Tổng quan kết quả

| Chỉ số | Giá trị |
|---|---|
| Tổng số mục đã thiết kế | 47 |
| Tổng số mục đã thực thi | **47 (100%)** |
| Passed | **7** |
| Failed | **40** |
| **Pass rate** | **14,9%** (7/47) |
| Mục bị bỏ qua / N/A | 0 |
| Mục Failed thiếu bằng chứng ảnh | **0** — 40/40 mục Failed đều có ≥1 ảnh (tổng 55 ảnh) |

> **Điểm mạnh của dữ liệu**: 100% mục đã thực thi, 0 mục bỏ qua, 0 mục Failed thiếu ghi chú
> hoặc thiếu ảnh. Mọi ảnh trong `screenshots/` đều được tham chiếu từ một mục cụ thể.

---

## 2. Phân bổ theo IA

| IA | Số mục | Passed | Failed | Tỷ lệ fail |
|---|---|---|---|---|
| IA-01 General UI Standards | 13 | 2 | 11 | 84,6% |
| IA-02 Forms | 12 | 1 | 11 | 91,7% |
| IA-03 Navigation | 9 | 4 | 5 | 55,6% |
| IA-04 Feedback / State | 13 | 0 | 13 | **100%** |
| **Tổng** | **47** | **7** | **40** | **85,1%** |

### 7 mục PASSED

| ID | Màn hình | Nội dung |
|---|---|---|
| GUI-IA01-007 | Sidebar | RTL `dir="rtl"` — không chồng lấn / tràn ngang / cắt chữ |
| GUI-IA01-013 | Sản phẩm | Zoom 200% — không sinh cuộn ngang, bảng không chồng lấn |
| GUI-IA02-009 | Sản phẩm | Form giữ nguyên dữ liệu đã nhập khi server từ chối lưu |
| GUI-IA03-003 | Sidebar | Logout → nút Back của trình duyệt không vào lại được vùng đã đăng nhập |
| GUI-IA03-006 | Sản phẩm | "Sửa" nạp đúng dữ liệu, "Hủy sửa" trả form về chế độ Thêm và xoá sạch |
| GUI-IA03-008 | Import CSV | Link "Tải file mẫu" tải file `.csv` đúng header, import được |
| GUI-IA03-009 | Sidebar | Sau khi chuyển tab, focus nằm trong vùng nội dung mới |

> **Nhận xét đáng chú ý**: 3 mục PASSED đều là hành vi **phụ thuộc lẫn nhau** (mục 003 pass nhờ ứng dụng
> không có router nên không tạo lịch sử trình duyệt — cùng nguyên nhân gốc với mục 001/002/005 FAIL).
> Không nên đọc kết quả PASS này là "tính năng logout an toàn": nó chỉ đúng **vì** ứng dụng chưa có
> routing. Khi BUG-008 được sửa, mục này **phải được kiểm thử lại**.

---

## 3. Phân bổ theo màn hình

| Màn hình | Số mục | Passed | Failed | Tỷ lệ fail |
|---|---|---|---|---|
| Admin Login | 10 | 0 | 10 | **100%** |
| Dashboard Admin | 4 | 0 | 4 | **100%** |
| Khung chung – Các màn hình | 3 | 0 | 3 | **100%** |
| Khung chung – Các form | 2 | 0 | 2 | **100%** |
| Quản lý Danh mục | 1 | 0 | 1 | **100%** |
| Import CSV | 7 | 1 | 6 | 85,7% |
| Khung chung – Sidebar | 10 | 3 | 7 | 70,0% |
| Quản lý Sản phẩm | 10 | 3 | 7 | 70,0% |

---

## 4. Phân bổ theo mức độ

| Mức độ | Số mục Failed | Tỷ lệ trong 40 mục Failed | Tỷ lệ trong 47 mục |
|---|---|---|---|
| Blocker | 13 | 32,5% | 27,7% |
| Major | 22 | 55,0% | 46,8% |
| Minor | 5 | 12,5% | 10,6% |
| Cosmetic | 0 | 0% | 0% |
| **Tổng Failed** | **40** | **100%** | **85,1%** |

> **Không có mục Cosmetic nào** — mọi lỗi tìm được đều ảnh hưởng chức năng, dữ liệu hoặc khả năng sử dụng.
> Điều này khớp với đặc đải của SUT: hệ thống "cố ý" chứa lỗi chức năng, không phải lỗi trang trí.

---

## 5. Danh sách chi tiết mục Failed

| ID | IA | Màn hình | Mô tả lỗi (rút gọn từ ghi chú tester) | Nguyên nhân gốc | Bằng chứng | Mức độ | Phân loại |
|---|---|---|---|---|---|---|---|
| GUI-IA01-001 | IA-01 | Admin Login | Placeholder `rgb(156,163,175)` trên nền `rgb(246,246,246)` → 2,35:1 | `RC-VIS` | GUI-IA01-001.png | Major | Bug |
| GUI-IA01-002 | IA-01 | Admin Login | Viền focus chỉ là outline mặc định 1px, không có viền ≥2px | `RC-A11Y` | GUI-IA01-002.png | Major | **Usability** |
| GUI-IA01-003 | IA-01 | Admin Login | 0 thẻ `<h1>`; `lang="en"`; `<title>` = `frontend-admin` | `RC-I18N` | GUI-IA01-003.png | Major | Bug |
| GUI-IA01-004 | IA-01 | Admin Login | Còn chuỗi tiếng Anh: "Admin Login", "Email", "Password", "Login" | `RC-I18N` | GUI-IA01-004.png | Major | Bug |
| GUI-IA01-005 | IA-01 | Sidebar | 0 landmark `nav`; 7 mục `<li>` không có `tabindex` → 0/7 dừng focus | `RC-A11Y` | GUI-IA01-005.png | Blocker | Bug |
| GUI-IA01-006 | IA-01 | Sidebar | Mục active chỉ khác bằng màu chữ; `font-weight` giống nhau; 0 phần tử `aria-current` | `RC-A11Y` | GUI-IA01-006.png | Major | Bug |
| GUI-IA01-008 | IA-01 | Sidebar | Ứng dụng không có giao diện tối (`prefers-color-scheme: dark` không đổi gì) | `RC-FEAT` | GUI-IA01-008.png | Minor | **Enhancement** |
| GUI-IA01-009 | IA-01 | Dashboard | 375px: `gridTemplateColumns = "19.5px 19.5px"`; 768px: "216px 216px" | `RC-RESP` | GUI-IA01-009-375.png, -768.png | Major | Bug |
| GUI-IA01-010 | IA-01 | Sản phẩm | Cột "Giá" hiện `30000000 ₫` — không có dấu phân cách hàng nghìn | `RC-IMP` | GUI-IA01-010.png | Major | Bug |
| GUI-IA01-011 | IA-01 | Sản phẩm | Sửa 1,92:1 · Xóa 3,76:1 · Lưu sản phẩm 3,30:1 (chữ trắng) | `RC-VIS` | GUI-IA01-011.png | Major | Bug |
| GUI-IA01-012 | IA-01 | Sản phẩm | Nút "Sửa" 39×28px, "Xóa" 40×28px (< 44×44px) | `RC-VIS` | GUI-IA01-012.png | Minor | **Usability** |
| GUI-IA02-001 | IA-02 | Các form | 0 thẻ `<label>` trên cả 4 form (10 control) — placeholder là nhãn duy nhất | `RC-IMP` | GUI-IA02-001.png | Blocker | Bug |
| GUI-IA02-002 | IA-02 | Các form | 0 ký hiệu `*`; "Giá tiền" không đánh dấu bắt buộc | `RC-IMP` | GUI-IA02-002.png | Major | Bug |
| GUI-IA02-003 | IA-02 | Admin Login | Ô email `type="text"` → nhập `abc` vẫn gửi `POST /api/login` | `RC-IMP` | GUI-IA02-003.png | Major | Bug |
| GUI-IA02-004 | IA-02 | Admin Login | Submit form rỗng vẫn gửi request + hiện alert | `RC-IMP` | GUI-IA02-004.png | Major | Bug |
| GUI-IA02-005 | IA-02 | Admin Login | Cả 2 ô đều không có thuộc tính `autocomplete` | `RC-IMP` | GUI-IA02-005.png | Minor | **Enhancement** |
| GUI-IA02-006 | IA-02 | Sản phẩm | `maxLength = -1`; 256 ký tự vẫn được gửi lên server | `RC-IMP` | GUI-IA02-006.png | Major | Bug |
| GUI-IA02-007 | IA-02 | Sản phẩm | Giá rỗng / `0` / `-100` đều gửi `POST /api/products` | `RC-IMP` | GUI-IA02-007.png | Blocker | Bug |
| GUI-IA02-008 | IA-02 | Danh mục | Tên rỗng và tên chỉ khoảng trắng đều gửi `POST /api/categories` | `RC-IMP` | GUI-IA02-008.png | Blocker | Bug |
| GUI-IA02-010 | IA-02 | Import CSV | File `.txt` vẫn được nhận (nút "Import 1 sản phẩm"); file rỗng/header-only không có thông báo lỗi | `RC-IMP` | GUI-IA02-010-txt/-empty/-header.png | Major | Bug |
| GUI-IA02-011 | IA-02 | Import CSV | `invalid.csv` preview 2 dòng bình thường, không cảnh báo dòng lỗi | `RC-IMP` | GUI-IA02-011.png | Blocker | Bug |
| GUI-IA02-012 | IA-02 | Import CSV | Trường bọc nháy kép bị tách thành 2 cột → preview 6 cột thay vì 5 | `RC-DATA` | GUI-IA02-012.png | Blocker | Bug |
| GUI-IA03-001 | IA-03 | Sidebar | URL luôn là `/` khi đổi tab; mở `/san-pham` vẫn ra Dashboard | `RC-IMP` | GUI-IA03-001.png, -deeplink.png | Blocker | Bug |
| GUI-IA03-002 | IA-03 | Sidebar | F5 ở tab "Danh mục" → quay về Dashboard | `RC-IMP` | GUI-IA03-002.png | Major | Bug |
| GUI-IA03-004 | IA-03 | Sidebar | 0 breadcrumb; `<h1>` duy nhất là "EShop Admin" (tên sản phẩm) | `RC-FEAT` | GUI-IA03-004.png | Minor | **Enhancement** |
| GUI-IA03-005 | IA-03 | Sidebar | `/khong-ton-tai` trả HTTP 200 (SPA fallback) → màn Login, không có trang 404 | `RC-IMP` | GUI-IA03-005.png | Minor | Bug |
| GUI-IA03-007 | IA-03 | Sản phẩm | Bảng không có tìm kiếm / lọc / phân trang | `RC-FEAT` | GUI-IA03-007.png | Major | **Enhancement** |
| GUI-IA04-001 | IA-04 | Admin Login | 4 tình huống lỗi chỉ cho 2 thông báo; không thông báo nào nêu cách xử lý | `RC-IMP` | GUI-IA04-001.png, -network.png | Blocker | Bug |
| GUI-IA04-002 | IA-04 | Admin Login | `alert()` native chặn toàn bộ UI; lỗi không nằm trên nút submit | `RC-IMP` | GUI-IA04-002.png | Blocker | Bug |
| GUI-IA04-003 | IA-04 | Admin Login | Nút Login không bị disable, nhãn giữ nguyên "Login" khi đang gửi | `RC-IMP` | GUI-IA04-003.png | Major | Bug |
| GUI-IA04-004 | IA-04 | Dashboard | Không có skeleton/spinner; trang nháy trắng rồi hiện số 0 | `RC-PERF` | GUI-IA04-004.png | Major | Bug |
| GUI-IA04-005 | IA-04 | Dashboard | Chỉ hiện "0 ₫" và "0", không có thông điệp empty state | `RC-IMP` | GUI-IA04-005.png | Major | Bug |
| GUI-IA04-006 | IA-04 | Các màn hình | Thêm danh mục/sản phẩm xong không có thông báo nào (0 vùng thông báo) | `RC-IMP` | GUI-IA04-006.png, -products.png | Major | Bug |
| GUI-IA04-007 | IA-04 | Các màn hình | Lỗi tải trang bị nuốt; lỗi thao tác lộ chuỗi kỹ thuật "Network Error" | `RC-IMP` | GUI-IA04-007.png, -load.png | Major | Bug |
| GUI-IA04-008 | IA-04 | Các màn hình | Bấm "Xóa" xoá thẳng, 0 dialog, không nêu tên đối tượng | `RC-UX` | GUI-IA04-008.png | Blocker | Bug |
| GUI-IA04-009 | IA-04 | Dashboard | 1 đơn delivered 150.000 ₫ → Dashboard hiện **300.000 ₫** (gấp đôi) | `RC-IMP` | GUI-IA04-009.png | Blocker | Bug |
| GUI-IA04-010 | IA-04 | Sản phẩm | Sửa dòng 2 → **cả 5 dòng** cùng tên "QA Tên Mới" | `RC-IMP` | GUI-IA04-010.png | Blocker | Bug |
| GUI-IA04-011 | IA-04 | Import CSV | Import 60 dòng: chỉ đổi chữ "Đang import...", không có % hay bộ đếm dòng | `RC-FEAT` | GUI-IA04-011.png | Major | **Enhancement** |
| GUI-IA04-012 | IA-04 | Import CSV | Bảng tăng 69 → 70 dòng; dòng lỗi "Tên OK" (giá -500) vẫn được ghi vào DB | `RC-IMP` | GUI-IA04-012.png | Blocker | Bug |
| GUI-IA04-013 | IA-04 | Import CSV | "Import hoàn tất: 1/2 sản phẩm được thêm" — không nêu số dòng lỗi, không đánh dấu lỗi giá âm | `RC-IMP` | GUI-IA04-013.png | Major | Bug |

---

## 6. Phân tích nguyên nhân gốc

| Mã | Nhóm nguyên nhân | Số mục | Tỷ lệ | Nhận xét |
|---|---|---|---|---|
| `RC-IMP` | Triển khai sai / thiếu triển khai | 24 | 60,0% | **Nguyên nhân gốc chiếm 3/4 số lỗi.** Web Admin được viết bằng React thuần + Tailwind, không dùng thư viện UI/validate/CSV nào; mọi thứ được "tự viết tay" nên thiếu hàng loạt xử lý chuẩn |
| `RC-FEAT` | Tính năng chưa được xây dựng | 4 | 10,0% | dark mode, breadcrumb, tìm kiếm/phân trang, tiến trình % — đều là **cải tiến**, không phải lỗi |
| `RC-VIS` | Vấn đề thị giác | 3 | 7,5% | Tương phản dưới WCAG AA ở 4 thành phần + vùng bấm nhỏ. Bảng màu Tailwind mặc định dùng chữ trắng trên nền `yellow-500`/`red-500`/`green-600` — cần chọn lại shade |
| `RC-A11Y` | Vấn đề accessibility | 3 | 7,5% | Sidebar dùng `<li onClick>` thay vì `<button>`/`<a>`; không có landmark; trạng thái active chỉ bằng màu |
| `RC-I18N` | Vấn ngôn ngữ / metadata | 2 | 5,0% | Giao diện còn chuỗi tiếng Anh; `<html lang="en">`; `<title>` scaffold Vite |
| `RC-RESP` | Vấn đề responsive | 1 | 2,5% | Không có breakpoint nào trong toàn bộ app; sidebar `w-64` cứng |
| `RC-PERF` | Hiệu năng cảm nhận | 1 | 2,5% | 5 request nối tiếp không có trạng thái loading |
| `RC-UX` | Vấn đề thiết kế UX | 1 | 2,5% | Hành động phá huỷ (xoá) không có bước xác nhận |
| `RC-DATA` | Dữ liệu / edge case | 1 | 2,5% | CSV parser tự tách bằng `split(",")` không theo RFC 4180 |
| `RC-CONS` | Không nhất quán | 0 | 0% | — |
| `RC-REQ` | Đặc tả chưa rõ | 0 | 0% | — |

### Phát hiện đáng chú ý (insights)

1. **IA-04 fail 100% (13/13) — điểm yếu kiến trúc rõ ràng nhất.**
   Ứng dụng **không có hệ thống quản lý trạng thái giao diện**: không loading, không empty state,
   không success toast, không inline error, không confirm. Mọi phản hồi đi qua `window.alert()` rời rạc
   tại 5 call-site (`App.jsx:72, 129, 137, 149, 630`). Đây **không phải 13 lỗi lẻ** mà là **một
   thiếu hụt kiến trúc** — sửa bằng cách thêm một lớp quản lý trạng thái + component thông báo, không
   sửa lẻ từng mục.

2. **Form không có validate ở client ở bất kỳ form nào.**
   10/11 mục IA-02 fail đều thuộc cùng một nhóm nguyên nhân (`RC-IMP`): không `<label>`, không `*`,
   không `type="email"`, không `maxlength`, không chặn giá ≤ 0, không chặn tên rỗng, không
   `autocomplete`. Biểu hiện bên ngoài khác nhau nhưng cùng một nguyên nhân: **form không được khai báo
   ràng buộc dữ liệu**. Đề xuất: một lớp validate dùng chung cho cả 4 form.

3. **Hai lỗi logic nghiệp vụ gây sai dữ liệu thật (mức Blocker).**
   `GUI-IA04-009` (doanh thu ×2 — `App.jsx:218`) và `GUI-IA04-010` (sửa 1 sản phẩm đổi tên tất cả —
   `App.jsx:110-114`) đều là lỗi ở tầng JSX, không phải lỗi backend. Chúng **làm sai dữ liệu hiển thị
   cho người dùng**, không chỉ sai giao diện — đây là 2 lỗi nghiêm trọng nhất trong toàn bộ bộ kết quả.

4. **Import CSV là mảng yếu tập thể.** 6/7 mục fail, gồm 4 lỗi Blocker: parser không theo RFC 4180,
   không validate, không rollback (ghi cả dòng lỗi vào DB), báo cáo thiếu thông tin. Cả 4 lỗi đều bắt
   nguồn từ một quyết định duy nhất: **tự parse CSV ở frontend rồi gửi JSON sang backend**
   (`App.jsx:367-377` + `server.js:199-241`), thay vì gửi file lên server để xử lý nguyên tử.

5. **Ứng dụng không có routing → 3 lỗi navigation cùng một nguyên nhân.**
   Không deep-link, refresh mất tab, không có trang 404 — tất cả từ việc ứng dụng là 1 component với
   state `activeTab`. Đã cài `react-router-dom@7.15.0` trong `package.json` nhưng **không import ở đâu**.

6. **Một "PASS" là PASS nhờ bug.** GUI-IA03-003 (logout → Back không vào lại được) pass vì ứng dụng
   không tạo lịch sử trình duyệt — tức là pass nhờ BUG-008. Phải kiểm thử lại sau khi sửa BUG-008.

7. **Không phát hiện lỗi an toàn dữ liệu nào ngoài xoá không xác nhận.** Form sản phẩm giữ nguyên dữ
   liệu khi server lỗi (GUI-IA02-009 PASS) — điểm tốt, nhưng chỉ vì `alert()` hiển thị lỗi chứ không
   clear form.

---

## 7. Phân loại: Bug vs. Vấn đề khả dụng vs. Cải tiến

| Phân loại | Số lượng | Chi tiết |
|---|---|---|
| **Bug** (vi phạm hành vi đúng / gây mất dữ liệu) | **21** | BUG-001 … BUG-021 |
| **Vấn đề ưu tiên thẩm mỹ** | **0** | Không có mục nào chỉ "xấu" mà vẫn đúng chức năng |
| **Vấn đề khả dụng** (dùng được nhưng gian nan / rủi ro) | **2** | U-01 viền focus 1px mặc định (GUI-IA01-002) · U-02 vùng bấm 39×28px (GUI-IA01-012) → xem xét chuyển sang skill `usability-testing` |
| **Cải tiến đề xuất** (không sai, nhưng nên tốt hơn) | **5** | E-01 dark mode (GUI-IA01-008) · E-02 breadcrumb (GUI-IA03-004) · E-03 tìm kiếm/lọc/phân trang (GUI-IA03-007) · E-04 tiến trình % khi import (GUI-IA04-011) · E-05 `autocomplete` (GUI-IA02-005) |

### Giải thích cách phân loại

Tiêu chí dùng để phân loại (áp dụng nghiêm để không báo nhầm loại):

1. **Có phải hành vi sai không?** Nếu ứng dụng làm khác với hành vi được kỳ vọng chuẩn, hoặc với đặc tả
   SRS của chính SUT → **Bug**. Tiêu chí kiểm chứng trong checklist đã viết sẵn phần "Kết quả mong đợi"
   theo chuẩn WCAG / hành vi kỳ vọng của ngành — đó là cơ sở khách quan, không phải ý kiến cá nhân.
2. **Lỗi có gây mất / sai dữ liệu hoặc chặn luồng không?** → Blocker/Major theo mức độ ảnh hưởng.
3. **Ứng dụng vẫn dùng được nhưng gian nan?** → **Vấn đề khả dụng**, **không** tạo GitHub Issue.
   - `U-01` (viền focus 1px): WCAG 2.4.7 Focus Visible vẫn **được thỏa** bằng outline mặc định của
     trình duyệt → không phải vi phạm → usability.
   - `U-02` (39×28px): WCAG 2.2 SC 2.5.8 Target Size (Minimum) chỉ yêu cầu **24×24px** → 39×28 **đạt**;
     ngưỡng 44×44 thuộc WCAG 2.1 AAA và Apple HIG → usability, không phải bug.
4. **Ứng dụng không sai, chỉ là chưa làm?** → **Cải tiến**. Không mở Issue.
   - `E-01` dark mode: ứng dụng **giữ nguyên** giao diện sáng khi hệ điều hành ở chế độ tối → không
     sai, chỉ chưa có theme tối.
   - `E-04` tiến trình %: hiện đã có "Đang import..." + disable nút → có phản hồi, chỉ thiếu %.

> **Quy tắc vàng đã áp dụng**: 5 mục "Cải tiến" và 2 mục "Usability" **không** được đưa vào danh sách
> GitHub Issues. 21 Issue là 21 lỗi chức năng thật, mỗi lỗi gắn với một nguyên nhân gốc khác nhau.

---

## 8. Danh sách bug đề xuất (input cho Module 6)

| # | Mã bug | Tiêu đề | Mức độ | Nguyên nhân gốc | Mục checklist liên quan | Ảnh |
|---|---|---|---|---|---|---|
| 1 | BUG-001 | [Web Admin] Mọi form đều không có thẻ `<label>` — placeholder là nhãn duy nhất | Blocker | `RC-IMP` | GUI-IA02-001 | GUI-IA02-001.png |
| 2 | BUG-002 | [Quản lý Sản phẩm / Danh mục] Form không chặn giá ≤ 0 và tên danh mục rỗng | Blocker | `RC-IMP` | GUI-IA02-007, GUI-IA02-008 | GUI-IA02-007.png, GUI-IA02-008.png |
| 3 | BUG-003 | [Quản lý Sản phẩm / Danh mục] Xoá không có hộp thoại xác nhận — dữ liệu bị mất ngay | Blocker | `RC-UX` | GUI-IA04-008 | GUI-IA04-008.png |
| 4 | BUG-004 | [Quản lý Sản phẩm] Sửa 1 sản phẩm làm đổi tên của toàn bộ danh sách | Blocker | `RC-IMP` | GUI-IA04-010 | GUI-IA04-010.png |
| 5 | BUG-005 | [Admin Dashboard] Tổng doanh thu nhân đôi so với tổng tiền đơn hàng `delivered` | Blocker | `RC-IMP` | GUI-IA04-009 | GUI-IA04-009.png |
| 6 | BUG-006 | [Import CSV] Import không rollback — dòng lỗi vẫn được ghi vào CSDL | Blocker | `RC-IMP` | GUI-IA04-012 | GUI-IA04-012.png |
| 7 | BUG-007 | [Import CSV] Trường CSV bọc dấu nháy kép bị tách sai thành nhiều cột | Blocker | `RC-DATA` | GUI-IA02-012 | GUI-IA02-012.png |
| 8 | BUG-008 | [Web Admin] Không có routing — mất deep-link, F5 mất tab, không có trang 404 | Blocker | `RC-IMP` | GUI-IA03-001, -002, -005 | GUI-IA03-001.png, -deeplink.png, GUI-IA03-002.png, GUI-IA03-005.png |
| 9 | BUG-009 | [Web Admin] Lỗi dùng `alert()` native — không phân biệt nguyên nhân, lộ lỗi kỹ thuật, nuốt lỗi tải trang | Blocker | `RC-IMP` | GUI-IA04-001, -002, -007 | GUI-IA04-001.png, -network.png, GUI-IA04-002.png, GUI-IA04-007.png, -load.png |
| 10 | BUG-010 | [Sidebar] Menu không dùng được bằng bàn phím, thiếu landmark `nav`, mục active chỉ phân biệt bằng màu | Blocker | `RC-A11Y` | GUI-IA01-005, -006 | GUI-IA01-005.png, GUI-IA01-006.png |
| 11 | BUG-011 | [Admin Login] Form không validate ở client — email sai định dạng và submit rỗng vẫn gửi request | Major | `RC-IMP` | GUI-IA02-003, -004 | GUI-IA02-003.png, GUI-IA02-004.png |
| 12 | BUG-012 | [Web Admin] Trường bắt buộc không được đánh dấu `*` và không nêu giới hạn 255 ký tự | Major | `RC-IMP` | GUI-IA02-002, -006 | GUI-IA02-002.png, GUI-IA02-006.png |
| 13 | BUG-013 | [Import CSV] Không kiểm tra đuôi file `.csv` và không cảnh báo dòng lỗi trước khi import | Major | `RC-IMP` | GUI-IA02-010, -011 | GUI-IA02-010-txt/-empty/-header.png, GUI-IA02-011.png |
| 14 | BUG-014 | [Import CSV] Báo cáo kết quả import thiếu số dòng lỗi và không đánh dấu lỗi giá âm | Major | `RC-IMP` | GUI-IA04-013 | GUI-IA04-013.png |
| 15 | BUG-015 | [Admin Dashboard] Thiếu trạng thái loading và empty state | Major | `RC-PERF` | GUI-IA04-004, -005 | GUI-IA04-004.png, GUI-IA04-005.png |
| 16 | BUG-016 | [Web Admin] Thao tác ghi thành công không có bất kỳ thông báo xác nhận nào | Major | `RC-IMP` | GUI-IA04-006 | GUI-IA04-006.png, -products.png |
| 17 | BUG-017 | [Admin Login] Nút Login không bị disable và không có chỉ báo đang xử lý | Major | `RC-IMP` | GUI-IA04-003 | GUI-IA04-003.png |
| 18 | BUG-018 | [Web Admin] Tương phản chữ dưới WCAG AA ở 4 thành phần (1,92:1 – 3,76:1) | Major | `RC-VIS` | GUI-IA01-001, -011 | GUI-IA01-001.png, GUI-IA01-011.png |
| 19 | BUG-019 | [Web Admin] Giao diện còn chuỗi tiếng Anh, `lang="en"`, `<title>` là tên scaffold | Major | `RC-I18N` | GUI-IA01-003, -004 | GUI-IA01-003.png, GUI-IA01-004.png |
| 20 | BUG-020 | [Quản lý Sản phẩm] Cột "Giá" không có dấu phân cách hàng nghìn | Major | `RC-IMP` | GUI-IA01-010 | GUI-IA01-010.png |
| 21 | BUG-021 | [Admin Dashboard] Lưới 2 cột KPI bị bóp còn 19,5px mỗi cột ở viewport 375px | Major | `RC-RESP` | GUI-IA01-009 | GUI-IA01-009-375.png, -768.png |

> **Không mở Issue cho**: U-01, U-02 (vấn đề khả dụng) · E-01 … E-05 (cải tiến đề xuất).

---

## 9. Xung đột / điểm cần người dùng xác nhận

| Vấn đề | Câu hỏi đã hỏi | Trạng thái |
|---|---|---|
| Mật khẩu admin trong `README.md` (`Admin123!`) khác `setup_guide.md` (`admin123`) | Đã hỏi ở Gate A | ✅ Đã xác nhận: `Admin123!` |
| Có nên tạo GitHub Issue cho 21 bug hay chỉ tạo file `.md`? | Đã hỏi ở Gate B của Module 6 | ⏳ Chờ trả lời |
| Repo GitHub đích và nhãn (label) nào dùng? | Đã hỏi ở Gate B của Module 6 | ⏳ Chờ trả lời |
| Ảnh có cần overlay email sinh viên không? | Đã hỏi ở Gate B của Module 6 | ⏳ Chờ trả lời |
| CSDL bị **reset về seed** trong lúc tôi kiểm tra dữ liệu (xem §10) | — | ⚠️ Cần thông báo cho người dùng |

---

## 10. Hạn chế của dữ liệu kết quả

- ⚠️ **CSDL đã bị reset về trạng thái seed trong lúc AI kiểm tra dữ liệu.** `backend/database.js` chạy
  `DROP TABLE IF EXISTS` cho 6 bảng rồi seed lại mỗi lần được `require`. Lệnh kiểm tra của AI đã
  vô tình kích hoạt nó, xoá các dữ liệu test mà tester tạo (4 đơn hàng, ~65 sản phẩm import thử,
  các danh mục "QA ..."). **Bằng chứng đã thu thập không bị ảnh hưởng** (đều là ảnh chụp + ghi chú
  đã lưu), nhưng nếu cần kiểm thử lại mục `GUI-IA04-009` (doanh thu) thì phải tạo lại đơn hàng.
  → **Khuyến nghị**: sửa `database.js` để chỉ seed khi bảng chưa tồn tại.
- **Chỉ test trên 1 trình duyệt**: Chrome 157. Không test Firefox, Safari, Edge.
- **Chỉ test 1 nền tảng**: desktop. Viewport 375px chỉ mô phỏng bằng DevTools, **không** test trên
  thiết bị thật / Expo Go.
- **Chưa test với người khuyết tật thực**: mục accessibility được đánh giá bằng phép đo tự động
  (DOM, computed style, contrast ratio) và điều hướng bằng `Tab`, **không** dùng NVDA/VoiceOver thật.
  Mục GUI-IA01-023 (tên truy cập screen reader) đã bị gộp vào GUI-IA02-001 nên không có phép đo
  screen reader độc lập.
- **Chưa test hiệu năng thực**: chỉ mô phỏng độ trễ 2–2,5s qua DevTools.
- **Chưa test bảo mật**: không thử SQL injection, XSS, vượt phân quyền. *(Ghi nhận: tab "Đơn hàng"
  dùng `dangerouslySetInnerHTML` cho địa chỉ giao hàng — `App.jsx:801` — nằm ngoài phạm vi màn hình
  nên không có mục kiểm thử.)*
- **Chưa test với dữ liệu lớn**: bảng sản phẩm chỉ có 5 dòng seed (tối đa 70 dòng trong lúc test).
  Chưa kiểm tra hiệu năng khi có hàng nghìn sản phẩm.
- **Chưa kiểm thử 3 tab ngoài phạm vi**: Mã Giảm Giá, Đơn hàng, Người dùng — chỉ khảo sát runtime
  trong bước phân tích UI, **không** có mục kiểm thử nào.
- **Mục GUI-IA04-009 phụ thuộc dữ liệu ngoài phạm vi**: cần tạo đơn hàng từ frontend-web để có đơn
  `delivered`. Kết quả đã thu thập được khi dữ liệu còn tồn tại (4 đơn, 1 delivered 150.000 ₫).
