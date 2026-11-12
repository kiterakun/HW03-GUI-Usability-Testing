# 07 — Báo cáo GUI Testing

| Trường | Nội dung |
|---|---|
| **SUT** | EShop — phân hệ **Web Admin** (`eshop-sut/frontend-admin`) · `http://localhost:5174` (API `http://localhost:3000`) |
| **Phiên bản / commit** | `85af3ba` — React 19.2 + Vite 8 + Tailwind 3.4 (toàn bộ app nằm trong `src/App.jsx`, 922 dòng) |
| **Người thực hiện** | 23120341 (23120341@student.hcmus.edu.vn) |
| **Ngày bắt đầu – kết thúc** | 2026-11-11 → 2026-11-12 |
| **Môi trường test** | Chrome 157 / Windows 11 · viewport 1440×900 (+ 375×667, 768×1024) · DevTools Protocol để đo contrast/focus/responsive · tài khoản `admin@eshop.com` |
| **AI tools đã sử dụng** | **OpenCode** (agent harness) + **MiniMax M3.1 Flash Free** — dùng để: phân tích source code, sinh & review checklist GUI 47 mục, khảo sát runtime bằng CDP, phân tích nguyên nhân gốc, chuẩn hoá 21 bug report, viết báo cáo |

---

## 1. Tổng quan

Bài kiểm thử GUI nhắm vào **phân hệ Web Admin** của hệ thống EShop: màn hình đăng nhập quản trị,
Dashboard, quản lý Danh mục, quản lý Sản phẩm (kèm luồng Import CSV). Tổng cộng **47 mục checklist**
được thiết kế theo 4 Interface Aspects, **thực thi 47/47 mục** trên SUT thật với **40 mục Failed**
(pass rate **14,9%**) và **55 ảnh bằng chứng** có overlay email sinh viên. Kết quả được gom thành
**21 bug thật** (10 Blocker, 11 Major) đăng trên GitHub Issues, **2 vấn đề khả dụng** và **5 đề xuất
cải tiến** được tách riêng và **không** báo thành issue.

Kết luận chính: Web Admin **chưa đạt chuẩn giao diện ở bất kỳ khía cạnh nào** — IA-04
(Feedback/State) fail **100%** (13/13). Nguyên nhân gốc chiếm 60% lỗi là `RC-IMP` (triển khai thiếu),
tập trung ở ba khoảng trống kiến trúc: **không có hệ thống quản lý trạng thái giao diện**
(không loading / empty state / success toast / inline error), **form không khai báo ràng buộc dữ liệu**
(không `<label>`, không `*`, không validate), và **không có lớp định tuyến**. Hai lỗi logic tầng JSX
(doanh thu nhân đôi, sửa 1 sản phẩm làm đổi tên mọi sản phẩm) là nghiêm trọng nhất vì hiển thị sai
dữ liệu cho người dùng.

---

## 2. Mục tiêu và phạm vi

### 2.1 Mục tiêu

1. Thiết kế checklist GUI > 40 mục phủ đủ 4 Interface Aspects cho phân hệ Web Admin.
2. Thực thi checklist trên SUT thật, đánh dấu Passed/Failed kèm ảnh bằng chứng cho mục Failed.
3. Phân tích nguyên nhân gốc, chuẩn hoá bug report và báo lên GitHub Issues kèm ảnh.
4. Bảo đảm phân biệt trung thực giữa **bug**, **vấn đề khả dụng** và **đề xuất cải tiến**.

### 2.2 Trong phạm vi

| Màn hình | Route | Số mục checklist |
|---|---|---|
| Admin Login | `/` (trạng thái chưa đăng nhập) | 10 |
| Khung chung – Sidebar | `/` (mọi màn sau đăng nhập) | 10 |
| Dashboard Admin | `/` + tab "Dashboard" | 4 |
| Quản lý Danh mục | `/` + tab "Danh mục" | 1 (+5 mục dùng chung) |
| Quản lý Sản phẩm (CRUD) | `/` + tab "Sản phẩm" | 10 (+5 mục dùng chung) |
| Import sản phẩm từ CSV | `/` + tab "Sản phẩm" → khối Import | 7 (+5 mục dùng chung) |
| Khung chung – Các form | cả 4 form | 2 |
| Khung chung – Các màn hình | cả app | 3 |
| **Tổng** | | **47** |

### 2.3 Ngoài phạm vi

| Ngoài phạm vi | Lý do |
|---|---|
| Frontend Web khách hàng (`frontend-web`, :5173) | Người học chốt 4 màn hình admin; phần khách hàng thuộc Pool A/B của đề bài |
| Mobile app (`frontend-mobile`, React Native/Expo) | Nền tảng mobile, không thuộc Pool C (Web Admin) |
| 3 tab còn lại: Mã Giảm Giá, Đơn hàng, Người dùng | Có trong `frontend-admin` nhưng người học chỉ chốt 4 màn hình. Đã khảo sát runtime, **không** sinh mục kiểm thử |
| Cross-browser / cross-platform (≥3 nền tảng) | Task 3 của HW03 — **chưa thực hiện**, xem §9 và §10 |
| Task 2 — Usability Evaluation (7 người tham gia) | Là task riêng của HW03, ngoài phạm vi skill `gui-testing` này |
| Kiểm thử backend / SQL injection / XSS / phân quyền | Ngoài phạm vi GUI. *Ghi nhận:* tab "Đơn hàng" dùng `dangerouslySetInnerHTML` cho địa chỉ giao hàng (`App.jsx:801`) |

---

## 3. Phương pháp

### 3.1 Quy trình thiết kế checklist

| Bước | Ai làm | Công cụ | Kết quả |
|---|---|---|---|
| 1. Xác định phạm vi (Gate A) | **Người** chốt; AI đặt câu hỏi | OpenCode + MiniMax M3.1 | `01-scope-analysis.md` |
| 2. Phân tích UI | AI | Đọc source `App.jsx` + khảo sát runtime bằng Chrome headless/CDP | `02-ui-analysis.md` |
| 3. Sinh checklist | AI | OpenCode | `03-gui-checklist.md` (v1: 67 mục) |
| 4a. Tự review + bổ sung | AI | OpenCode | `04-checklist-review.md` (v2: 77 mục) |
| 4b. **Review của người** | **Người** | — | Bỏ FR-21..24, rút gọn còn 47 mục (v3) |
| 5. Thực thi checklist | **Người** | Chrome + DevTools | `03-gui-checklist.md` (47/47 có kết quả) |
| 6. Phân tích kết quả + nguyên nhân gốc | AI | OpenCode | `05-test-results.md` |
| 7. Chuẩn hoá 21 bug report | AI | OpenCode | `bugs/BUG-001..021.md` |
| 8. Tổng hợp báo cáo | AI | OpenCode | `07-gui-test-report.md` (file này) |

### 3.2 Vai trò của AI ở từng bước

**AI đảm nhiệm** — phân tích 922 dòng source code của `frontend-admin`; khảo sát runtime bằng
Chrome DevTools Protocol (đo contrast ratio theo WCAG, đếm `<label>`/`<h1>`/`aria`, ghi lại chuỗi
điểm dừng focus khi Tab, mô phỏng viewport 375/768px, `prefers-color-scheme: dark`, `dir="rtl"`, và
parse CSV thật để quan sát hành vi); sinh danh sách mục ứng viên; viết lại các mục mơ hồ thành
tiêu chí đo được; chủ động đề xuất các nhóm thường bị bỏ sót (accessibility, RTL, dark mode,
responsive) kèm mã lý do; gom 40 mục Failed thành 21 bug theo nguyên nhân gốc; viết kèm khối
"Nội dung sẵn sàng post lên GitHub Issues" cho từng bug.

**Người đảm nhiệm** — chốt phạm vi, môi trường và tiêu chuẩn (Gate A); yêu cầu bỏ FR-21..24 và rút
gọn checklist (v3); **tự thực thi toàn bộ 47 mục** trên SUT thật, đánh dấu Passed/Failed, ghi
lý do fail có số đo định lượng, chụp 55 ảnh bằng chứng; quyết định bug nào là bug thật; xác nhận
mật khẩu admin khi tài liệu mâu thuẫn.

> **Nguyên tắc bất di bất dịch trong toàn bộ quy trình**: AI **không** tự đánh dấu Pass/Fail,
> **không** tự tạo bug, **không** tự chuyển từ Phase 01 sang Phase 02. Mọi kết quả trong
> `03-gui-checklist.md` do người học điền.

### 3.3 Cách thực thi checklist

- Thực thi **cá nhân**, một người, trên máy Windows cài Chrome 157.
- Mỗi mục được kiểm chứng bằng hành động quan sát được trong ≤ 2 phút; các mục cần đo định lượng
  (contrast, focus order, responsive) dùng DevTools Console với lệnh cụ thể ghi trong cột
  "Cách kiểm chứng".
- Ảnh bằng chứng được chụp cho **mọi** mục Failed (40/40), tổng 55 ảnh; **không** chụp cho mục Passed.
- Có 4 file CSV mẫu chuẩn bị sẵn tại `assets/` để tái hiện các lỗi Import CSV
  (`quoted.csv`, `invalid.csv`, `vietnamese.csv`, `sanpham.txt`).
- Mọi ảnh đã được overlay email sinh viên `23120341@student.hcmus.edu.vn`.

---

## 4. Tổng quan checklist

| IA | Số mục | Tỷ lệ |
|---|---|---|
| IA-01 General UI Standards | 13 | 27,7% |
| IA-02 Forms | 12 | 25,5% |
| IA-03 Navigation | 9 | 19,1% |
| IA-04 Feedback / State | 13 | 27,7% |
| **Tổng** | **47** | **100%** |

| Màn hình | Số mục |
|---|---|
| Admin Login | 10 |
| Khung chung – Sidebar | 10 |
| Quản lý Sản phẩm (CRUD) | 10 |
| Import sản phẩm từ CSV | 7 |
| Dashboard Admin | 4 |
| Khung chung – Các màn hình | 3 |
| Khung chung – Các form | 2 |
| Quản lý Danh mục | 1 |
| **Tổng** | **47** |

---

## 5. Kết quả thực thi

| Chỉ số | Giá trị |
|---|---|
| Mục đã thiết kế | 47 |
| Mục đã thực thi | **47 (100%)** |
| Passed | 7 |
| Failed | 40 |
| **Pass rate** | **14,9%** |
| Mục bỏ qua / N/A | 0 |
| Mục Failed thiếu bằng chứng ảnh | **0** (55 ảnh) |

| IA | Mục | Failed | Tỷ lệ fail |
|---|---|---|---|
| IA-01 | 13 | 11 | 84,6% |
| IA-02 | 12 | 11 | 91,7% |
| IA-03 | 9 | 5 | 55,6% |
| IA-04 | 13 | 13 | **100%** |

| Mức độ | Số bug |
|---|---|
| Blocker | 10 |
| Major | 11 |
| Minor | 0 |
| Cosmetic | 0 |

*(Mức độ trong bảng trên là của 21 bug. Theo **mục** Failed: 13 Blocker, 22 Major, 5 Minor.)*

---

## 6. Phân tích nguyên nhân gốc

| Mã | Nhóm nguyên nhân | Số mục | Tỷ lệ |
|---|---|---|---|
| `RC-IMP` | Triển khai sai / thiếu triển khai | 24 | 60,0% |
| `RC-FEAT` | Tính năng chưa được xây dựng | 4 | 10,0% |
| `RC-VIS` | Vấn đề thị giác | 3 | 7,5% |
| `RC-A11Y` | Vấn đề accessibility | 3 | 7,5% |
| `RC-I18N` | Vấn đề ngôn ngữ / metadata | 2 | 5,0% |
| `RC-RESP` | Vấn đề responsive | 1 | 2,5% |
| `RC-PERF` | Hiệu năng cảm nhận | 1 | 2,5% |
| `RC-UX` | Vấn đề thiết kế UX | 1 | 2,5% |
| `RC-DATA` | Dữ liệu / edge case | 1 | 2,5% |

**Ba khoảng trống kiến trúc lộ ra (không phải lỗi lẻ):**

1. **Không có lớp quản lý trạng thái giao diện.** IA-04 fail 100%. Không loading, không empty state,
   không success toast, không inline error, không confirm — mọi phản hồi đi qua `window.alert()` rời
   rạc tại 7 call-site. Đây là **một** khoảng trống, không phải 13 lỗi độc lập.
2. **Form không khai báo ràng buộc dữ liệu.** 11/12 mục IA-02 fail, cùng một nguyên nhân: không
   `<label>`, không `*`, không `type="email"`, không `maxlength`, không validate giá > 0, không chặn
   tên rỗng.
3. **Không có lớp định tuyến.** 3 lỗi navigation (mất deep-link, F5 mất tab, không có trang 404) đều
   từ một nguyên nhân: app là 1 component với state `activeTab` — dù `react-router-dom` đã được cài
   sẵn nhưng không import.

**Khuyến nghị: sửa ở tầng kiến trúc, không sửa lẻ.** Ba nhóm trên chiếm **30/40** mục Failed và
**10/21** bug. Một lần bổ sung (1) component thông báo/toast dùng chung + state `loading`/`empty`,
(2) một lớp validate dùng chung cho 4 form, (3) `react-router-dom` cho 7 route — sẽ đóng được gần
40% lỗi mà không cần sửa từng dòng.

---

## 7. Danh sách bug

| ID | Tiêu đề | Mức độ | Nguyên nhân gốc | Mục checklist | Link |
|---|---|---|---|---|---|
| BUG-001 | [Web Admin] Mọi form đều không có thẻ `<label>` — placeholder là nhãn duy nhất | Blocker | `RC-IMP` | GUI-IA02-001 | `bugs/BUG-001.md` |
| BUG-002 | [Quản lý Sản phẩm / Danh mục] Form không chặn giá âm và tên danh mục rỗng | Blocker | `RC-IMP` | GUI-IA02-007, -008 | `bugs/BUG-002.md` |
| BUG-003 | [Quản lý Sản phẩm / Danh mục] Xoá không có hộp thoại xác nhận | Blocker | `RC-UX` | GUI-IA04-008 | `bugs/BUG-003.md` |
| BUG-004 | [Quản lý Sản phẩm] Sửa 1 sản phẩm làm đổi tên của toàn bộ danh sách | Blocker | `RC-IMP` | GUI-IA04-010 | `bugs/BUG-004.md` |
| BUG-005 | [Admin Dashboard] Tổng doanh thu nhân đôi | Blocker | `RC-IMP` | GUI-IA04-009 | `bugs/BUG-005.md` |
| BUG-006 | [Import CSV] Import không rollback — dòng lỗi vẫn được ghi vào CSDL | Blocker | `RC-IMP` | GUI-IA04-012 | `bugs/BUG-006.md` |
| BUG-007 | [Import CSV] Trường CSV bọc dấu nháy kép bị tách sai thành nhiều cột | Blocker | `RC-DATA` | GUI-IA02-012 | `bugs/BUG-007.md` |
| BUG-008 | [Web Admin] Không có routing — mất deep-link, F5 mất tab, không có trang 404 | Blocker | `RC-IMP` | GUI-IA03-001, -002, -005 | `bugs/BUG-008.md` |
| BUG-009 | [Web Admin] Lỗi toàn bộ báo bằng `alert()` native | Blocker | `RC-IMP` | GUI-IA04-001, -002, -007 | `bugs/BUG-009.md` |
| BUG-010 | [Sidebar] Menu không dùng được bằng bàn phím, thiếu landmark `nav` | Blocker | `RC-A11Y` | GUI-IA01-005, -006 | `bugs/BUG-010.md` |
| BUG-011 | [Admin Login] Form không validate ở client | Major | `RC-IMP` | GUI-IA02-003, -004 | `bugs/BUG-011.md` |
| BUG-012 | [Web Admin] Trường bắt buộc không có ký hiệu `*` và không giới hạn 255 ký tự | Major | `RC-IMP` | GUI-IA02-002, -006 | `bugs/BUG-012.md` |
| BUG-013 | [Import CSV] Không kiểm tra đuôi `.csv` và không cảnh báo dòng lỗi | Major | `RC-IMP` | GUI-IA02-010, -011 | `bugs/BUG-013.md` |
| BUG-014 | [Import CSV] Báo cáo kết quả import thiếu số dòng lỗi | Major | `RC-IMP` | GUI-IA04-013 | `bugs/BUG-014.md` |
| BUG-015 | [Admin Dashboard] Thiếu trạng thái loading và empty state | Major | `RC-PERF` | GUI-IA04-004, -005 | `bugs/BUG-015.md` |
| BUG-016 | [Web Admin] Thao tác ghi thành công không có thông báo xác nhận | Major | `RC-IMP` | GUI-IA04-006 | `bugs/BUG-016.md` |
| BUG-017 | [Admin Login] Nút Login không disable và không có chỉ báo đang xử lý | Major | `RC-IMP` | GUI-IA04-003 | `bugs/BUG-017.md` |
| BUG-018 | [Web Admin] Tương phản chữ dưới WCAG AA ở 4 thành phần | Major | `RC-VIS` | GUI-IA01-001, -011 | `bugs/BUG-018.md` |
| BUG-019 | [Web Admin] Giao diện còn tiếng Anh, `lang="en"`, `<title>` sai, thiếu `<h1>` | Major | `RC-I18N` | GUI-IA01-003, -004 | `bugs/BUG-019.md` |
| BUG-020 | [Quản lý Sản phẩm] Cột "Giá" không có dấu phân cách hàng nghìn | Major | `RC-IMP` | GUI-IA01-010 | `bugs/BUG-020.md` |
| BUG-021 | [Admin Dashboard] Lưới KPI vỡ ở viewport 375px | Major | `RC-RESP` | GUI-IA01-009 | `bugs/BUG-021.md` |

Tất cả 21 bug cũng được báo trên **GitHub Issues** của repo `kiterakun/HW03-GUI-Usability-Testing`
kèm ảnh đính kèm.

---

## 8. Bug vs. vấn đề khả dụng vs. đề xuất cải tiến

| Phân loại | Số lượng | Tóm tắt |
|---|---|---|
| **Bug** | **21** | BUG-001 … BUG-021 (10 Blocker, 11 Major) |
| Vấn đề ưu tiên thẩm mỹ | **0** | — |
| Vấn đề khả dụng | **2** | U-01 viền focus 1px mặc định (GUI-IA01-002) · U-02 vùng bấm nút 39×28px (GUI-IA01-012) |
| Đề xuất cải tiến | **5** | E-01 dark mode · E-02 breadcrumb · E-03 tìm kiếm/lọc/phân trang · E-04 tiến trình % khi import · E-05 `autocomplete` |

**Vì sao không báo mọi thứ là bug** — tiêu chí đã dùng:

1. **Bug** = hành vi khác với kỳ vọng chuẩn ghi rõ trong cột "Kết quả mong đợi" của checklist, hoặc
   gây mất / sai dữ liệu. Mỗi bug đều có Actual ≠ Expected định lượng.
2. **Vấn đề khả dụng** = dùng được nhưng gian nan. `U-02` (39×28px) **đạt** WCAG 2.2 SC 2.5.8
   Target Size (Minimum) 24×24px → không phải vi phạm, ngưỡng 44×44 thuộc WCAG 2.1 AAA. `U-01`
   (viền focus 1px) vẫn thỏa WCAG 2.4.7 Focus Visible bằng outline mặc định của trình duyệt.
3. **Cải tiến** = ứng dụng không sai, chỉ là chưa làm. `E-01`: ứng dụng **giữ nguyên** giao diện sáng
   khi hệ điều hành ở chế độ tối → không phải lỗi.
4. **Không có mục Cosmetic nào** — mọi lỗi tìm được đều ảnh hưởng chức năng, dữ liệu hoặc khả năng
   sử dụng, phù hợp với đặc đải của SUT (hệ thống cố ý chứa lỗi chức năng, không phải lỗi trang trí).

> 7 mục này **không** được mở GitHub Issue. Báo sai loại sẽ làm giảm uy tín báo cáo.

---

## 9. Cross-browser / Cross-platform

> ⚠️ **Chưa thực hiện** — thuộc Task 3 của HW03, ngoài phạm vi lần chạy này. Mục này được ghi
> **trống có chủ đích** để báo cáo không ghi sai những gì chưa làm.

| Nền tảng | Phiên bản | Màn hình đã test | Số lỗi phát hiện riêng | Ghi chú |
|---|---|---|---|---|
| Chrome 157 (desktop) | 157.0.8103.50 | 5 màn hình trong phạm vi | 40 mục Failed | ✅ Đã thực thi — nền tảng duy nhất |
| Firefox | — | — | — | ⬜ Chưa test |
| Safari / macOS + iPad | — | — | — | ⬜ Chưa test |
| Android Chrome / Expo Go | — | — | — | ⬜ Chưa test |

- Công cụ: **chưa dùng** BrowserStack / LambdaTest.
- Mỗi ảnh đã overlay email sinh viên: ✅ **Có** — 55/55 ảnh đã overlay
  `23120341 | 23120341@student.hcmus.edu.vn`.
- Sai khác đáng chú ý giữa các nền tảng: **chưa có dữ liệu**.

> **Rủi ro đã biết từ Task 1** (cần xác nhận ở Task 3): ứng dụng không có breakpoint nào, lưới KPI
> vỡ còn 19,5px mỗi cột ở 375px (BUG-021), nên **chắc chắn fail** trên Android Chrome / iPad.
> Ngoài ra `input type="date"` (tab Mã Giảm Giá) hiển thị khác nhau giữa Chrome và Safari/Firefox.

---

## 10. Hạn chế của quá trình kiểm thử

- **Chỉ kiểm thử trên 1 trình duyệt / 3 kích thước màn hình**: Chrome 157, viewport 1440×900
  (chính), 375×667 và 768×1024 (mô phỏng bằng DevTools). Không test Firefox, Safari, Edge; không
  test trên thiết bị thật.
- **Chưa kiểm thử với người dùng khuyết tật / trình đọc màn hình**: các mục accessibility được đánh
  giá bằng **phép đo tự động** (DOM, computed style, WCAG contrast ratio, điều hướng bằng phím Tab).
  Chưa dùng NVDA / VoiceOver thật; mục "tên truy cập cho trình đọc màn hình" đã bị gộp vào
  GUI-IA02-001 nên không có phép đo screen reader độc lập.
- **Chưa kiểm thử hiệu năng**: chỉ mô phỏng độ trễ 2–2,5s qua DevTools, không đo thời gian tải thật,
  không đo với tập dữ liệu lớn (bảng sản phẩm tối đa ~70 dòng trong lúc test).
- **Chưa kiểm thử bảo mật**: không thử SQL injection, XSS, vượt phân quyền. Ghi nhận ngoài phạm vi:
  tab "Đơn hàng" dùng `dangerouslySetInnerHTML` cho địa chỉ giao hàng (`App.jsx:801`).
- **Ba tab của Web Admin nằm ngoài phạm vi** (Mã Giảm Giá, Đơn hàng, Người dùng) — đã khảo sát runtime
  và phát hiện vài vấn đề tương tự (ví dụ tab Đơn hàng có **không** có empty state khi không có đơn,
  và có 2 nút trạng thái cho đơn `canceled`), nhưng **không** có mục kiểm thử chính thức nào cho
  chúng → chưa thể báo thành issue.
- **Một mục PASS là PASS nhờ bug**: GUI-IA03-003 (logout → Back không vào lại được vùng đã đăng nhập)
  pass vì ứng dụng chưa có router nên không tạo lịch sử trình duyệt. Khi BUG-008 được sửa, mục này
  **phải kiểm thử lại** — nếu không, sẽ có đường quay ngược vào vùng đã đăng nhập.
- **CSDL bị reset về seed trong lúc AI kiểm tra dữ liệu**: `backend/database.js` chạy
  `DROP TABLE` + seed lại mỗi lần được `require`. Lệnh kiểm tra của AI đã vô tình kích hoạt nó,
  xoá các dữ liệu test mà tester tạo (4 đơn hàng, ~65 sản phẩm import thử, các danh mục "QA …").
  **Bằng chứng không bị ảnh hưởng** (đều là ảnh chụp + ghi chú đã lưu). Khuyến nghị sửa `database.js`
  để chỉ seed khi bảng chưa tồn tại.
- **Mục GUI-IA04-009 phụ thuộc dữ liệu ngoài phạm vi**: cần tạo đơn hàng từ frontend-web để có đơn
  `delivered`. Kết quả đã thu thập khi dữ liệu còn tồn tại (4 đơn, 1 đơn `delivered` 150.000 ₫).
- **Hạn chế về tiêu chuẩn**: bài này bỏ FR-21..24 theo yêu cầu người học và chỉ dùng **4 Interface
  Aspects**. Vì vậy các mục kiểm tra hành vi cụ thể theo đặc tả SRS (ví dụ khóa tài khoản 30 giây
  vs 3 phút, tăng bộ đếm `+2` thay vì `+1` ở `server.js:54,57`) **không** có mục kiểm thử tương ứng
  và chưa được báo thành issue.
- **Task 2 (usability evaluation) chưa thực hiện** — 7 người tham gia, kịch bản nhiệm vụ, SUS/UEQ-S
  chưa có. Kết quả usability chưa được tích hợp vào báo cáo này.

---

## 11. Đề xuất cải tiến

| # | Đề xuất | Gắn với nguyên nhân gốc / bug | Mức độ ưu tiên | Nỗ lực |
|---|---|---|---|---|
| 1 | **Bổ sung lớp quản lý trạng thái giao diện dùng chung**: component toast/inline-error, cờ `loading` + `empty`, thay toàn bộ `window.alert()` | `RC-IMP` · BUG-009, 015, 016, 017 | **Cao** | L |
| 2 | **Bổ sung lớp validate dùng chung cho cả 4 form**: `<label>`, ký hiệu `*`, `type`/`maxlength`/`min`, thông báo lỗi cạnh ô | `RC-IMP` · BUG-001, 002, 011, 012 | **Cao** | M |
| 3 | **Bổ sung routing** (`react-router-dom` đã cài sẵn): 7 route, deep-link, trang 404; đồng thời khoá vùng đã đăng nhập sau logout | `RC-IMP` · BUG-008 | **Cao** | M |
| 4 | **Sửa 2 lỗi logic tầng JSX**: bỏ `* 2` ở công thức doanh thu; sửa `map` gán tên cho toàn bộ danh sách khi sửa sản phẩm | `RC-IMP` · BUG-004, 005 | **Cao** | S |
| 5 | **Đưa import CSV về xử lý nguyên tử ở server**: gửi file lên server, validate toàn bộ trước khi ghi, bọc `db.transaction()`, dùng thư viện parse CSV chuẩn (RFC 4180) | `RC-IMP`, `RC-DATA` · BUG-006, 007, 013, 014 | **Cao** | L |
| 6 | **Thêm dialog xác nhận cho mọi hành động xoá**, nêu rõ tên đối tượng | `RC-UX` · BUG-003 | **Cao** | S |
| 7 | **Điều chỉnh bảng màu để đạt WCAG AA**: nền `yellow-500`→`yellow-600` + chữ tối, `red-500`→`red-600`, `green-600`→`green-700`, placeholder `gray-400`→`gray-600` | `RC-VIS` · BUG-018 | Trung bình | S |
| 8 | **Chuẩn hoá ngôn ngữ & metadata**: dịch chuỗi tiếng Anh còn lại, `<html lang="vi">`, `<title>` = tên sản phẩm, bổ sung `<h1>` | `RC-I18N` · BUG-019 | Trung bình | S |
| 9 | **Chuyển sidebar sang `<nav>` + `<button>`/`<NavLink>`**, thêm `aria-current="page"` và tín hiệu active không chỉ dựa vào màu | `RC-A11Y` · BUG-010 | Trung bình | M |
| 10 | **Trích hàm `formatCurrency()` dùng chung** cho mọi nơi hiển thị tiền, chỉ định locale `vi-VN` | `RC-IMP` · BUG-020 | Trung bình | S |
| 11 | **Bổ sung breakpoint responsive**: `grid-cols-1 sm:grid-cols-2`, sidebar thu gọn/drawer, cỡ chữ input ≥16px | `RC-RESP` · BUG-021 | Thấp (app desktop) | M |
| 12 | **Cải tiến (không phải bug)**: dark mode, breadcrumb, tìm kiếm/lọc/phân trang, tiến trình % khi import, `autocomplete` | `RC-FEAT` · E-01…E-05 | Thấp | M–L |
| 13 | **Sửa `backend/database.js`** để chỉ seed khi bảng chưa tồn tại, tránh mất dữ liệu khi restart | Hạn chế môi trường | Trung bình | S |

---

## 12. AI Audit & AI Critique

- **AI Audit Report**: xem `../ai-audit-outputs/` (sinh bằng skill `ai-audit`).
- **AI Critique (200–300 từ)**: xem `../ai-audit-outputs/ai-critique.md`.

Khai báo: bài này **có** sử dụng AI — OpenCode (agent harness) + MiniMax M3.1 Flash Free, dùng cho
phân tích source code, sinh & review checklist, khảo sát runtime, phân tích nguyên nhân gốc và viết
báo cáo. Toàn bộ kết quả Pass/Fail và ảnh bằng chứng do người học tự thực thi và tự kiểm chứng.

---

## 13. Phụ lục

| Phụ lục | Đường dẫn |
|---|---|
| Phân tích phạm vi | `01-scope-analysis.md` |
| Phân tích UI | `02-ui-analysis.md` |
| Checklist đầy đủ (47 mục, đã điền kết quả) | `03-gui-checklist.md` |
| Review checklist (v1 → v2 → v3) | `04-checklist-review.md` |
| Kết quả & phân tích nguyên nhân gốc | `05-test-results.md` |
| Bug reports (21 file) | `bugs/BUG-001.md` … `bugs/BUG-021.md` |
| Bảng tính Excel (3 sheet) | `assets/checklist-gui-testing.xlsx` |
| File CSV mẫu dùng để tái hiện lỗi | `assets/invalid.csv`, `quoted.csv`, `vietnamese.csv`, `sanpham.txt` |
| Ảnh bằng chứng (55 ảnh, đã overlay email) | `screenshots/` |
| Quản lý tiến độ | `PROGRESS.md` |
| AI Audit Report | `../ai-audit-outputs/` |
| Git commit log | `git-commit-log.txt` (thư mục gốc của repo) |
