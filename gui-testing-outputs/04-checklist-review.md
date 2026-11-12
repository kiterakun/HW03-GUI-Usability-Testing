# 04 — Review checklist (AI review + human review)

| Trường | Nội dung |
|---|---|
| Checklist được review | `03-gui-checklist.md` (v1 → v2 → **v3**) |
| Người review | AI (OpenCode / MiniMax M3.1 Flash) — tự review bằng lăng kính phản biện, **+ điều chỉnh theo yêu cầu người dùng** |
| Ngày | 2026-11-11 (v1, v2) → 2026-11-12 (v3) |
| Trạng thái | 🟡 **AI review xong — chờ người dùng review & xác nhận (Gate B)** |

## Lịch sử phiên bản

| Phiên bản | Ngày | Nội dung | Tổng mục |
|---|---|---|---|
| v1 | 2026-11-11 | Sinh lần đầu từ `02-ui-analysis.md`, tiêu chuẩn **4 IA + FR-21..FR-24** | 67 |
| v2 | 2026-11-11 | Tự review: thêm 10 mục còn thiếu (focus order, screen reader, màu nút theo vai trò, tên dài, Enter-to-submit, Reset, 404, focus sau điều hướng, ESC/focus-trap, reset preview) + viết lại 5 mục | 77 |
| **v3** | **2026-11-12** | **Theo yêu cầu người dùng: (1) bỏ toàn bộ FR-21..FR-24, chỉ dùng 4 IA; (2) rút gọn 77 → 47 mục bằng cách gộp các mục trùng lặp theo nhóm thay vì nhân bản theo màn hình** | **47** |

---

## 1. Tự review bằng lăng kính phản biện (AI)

| Lăng kính | Số vấn đề phát hiện | Ví dụ (ID mục) | Xử lý |
|---|---|---|---|
| **Khách quan** | 3 | GUI-IA04-008 (chưa nêu cách tạo dữ liệu `delivered`); GUI-IA04-009 (dựa vào tab ngoài phạm vi mà không nói rõ); GUI-IA01-012 (chỉ nêu phương pháp đo gián tiếp, không nêu lệnh đo) | **sửa** — viết lại cả 3 mục, bổ sung điều kiện tiên quyết và lệnh DevTools cụ thể |
| **Kiểm chứng được** | 2 | GUI-IA02-012 (chưa nêu rõ 3 ca thử: rỗng / 0 / âm); GUI-IA04-019 (chưa chỉ rõ đọc ở đâu) | **sửa** |
| **Phủ sóng** | 8 | Thiếu: focus order, nhãn cho screen reader, màu nút theo vai trò, tên sản phẩm dài, Enter-to-submit, nút Reset, trang 404, focus sau điều hướng, ESC/focus-trap của modal, reset state preview | **thêm** 10 mục ở v2 |
| **Độc lập** | 2 | GUI-IA04-008 (phụ thuộc có đơn hàng `delivered`); GUI-IA04-013 (phụ thuộc việc ghi lại tên sản phẩm trước) | **sửa** — thêm ghi chú tiên quyết vào cột "Cách kiểm chứng" để mục tự chứa |
| **Khác biệt (không trùng lặp)** | 12 | 12 cặp mục cùng kiểm tra **cùng một khuyết điệt** ở nhiều màn hình: 3 mục `<label>` (Login/Danh mục/Sản phẩm), 2 mục contrast nút, 2 mục xác nhận xoá, 2 mục thông báo thành công, 2 mục lỗi server, 2 mục loading/empty | **gộp** — v3 viết thành mục "áp dụng chung cho nhiều màn hình", nêu rõ danh sách màn hình trong cột "Màn hình" và "Cách kiểm chứng" |
| **Ưu tiên** | 4 | Xoá không có xác nhận, sửa 1 sản phẩm làm đổi tất cả, doanh thu nhân đôi, menu không điều hướng bằng bàn phím | **giữ nguyên** Blocker — 14 mục Blocker được để đầu danh sách ưu tiên |

---

## 2. Kiểm tra 3 nhóm AI hay bỏ sót

### 2.1 Accessibility

| # | Mục kiểm tra | Có mục tương ứng trong checklist v3? | ID mục | Ghi chú |
|---|---|---|---|---|
| 1 | Điều hướng bằng bàn phím (Tab/Shift+Tab/Esc/Enter) | ✅ | GUI-IA01-005, GUI-IA03-009, GUI-IA04-003 | Runtime đo: **0 phần tử focusable** trong sidebar → 7 mục menu (kể cả "Đăng xuất") không thao tác được bằng bàn phím |
| 2 | Focus order hợp lý theo luồng đọc | ✅ | GUI-IA03-009 | Bổ sung ở bước review v2 — v1 mới chỉ có "điều hướng được" chứ chưa có "thứ tự đúng" |
| 3 | Viền focus nhìn thấy được | ✅ | GUI-IA01-002 | Runtime đo computed `outline: rgb(0,0,0) none 3px` trên input → **nghi vấn không có viền focus**; mục viết theo hướng để tester xác minh bằng Tab thật |
| 4 | Nhãn form gắn đúng control (label/for) | ✅ | GUI-IA02-001, GUI-IA02-002 | Runtime: `document.querySelectorAll('label').length === 0` trên **mọi** màn hình. v3 gộp 3 mục (Login/Danh mục/Sản phẩm) thành 1 mục "áp dụng cho cả 4 form" |
| 5 | Alt text cho ảnh/icon chức năng | ❌ **đã bỏ ở v3** | — | Runtime đo: ảnh sản phẩm **có** `alt` đầy đủ → mục sẽ luôn Pass, giá trị thấp. Vẫn ghi nhận tại `02-ui-analysis.md` §4.4 để tester thấy |
| 6 | Tương phản màu đạt WCAG AA | ✅ | GUI-IA01-001, GUI-IA01-011 | Kèm **giá trị đo sẵn** để tester tái lập: placeholder 2.35:1, "Sửa" 1.92:1, "Xóa" 3.76:1, "Lưu sản phẩm" 3.30:1 (đều FAIL) |
| 7 | ARIA role/state đúng | ✅ | GUI-IA01-005 (landmark `nav`), GUI-IA01-006 (`aria-current`) | Runtime: `[aria-label],[aria-current],[role]` → **0 phần tử**; mục active chỉ khác bằng màu (vi phạm WCAG 1.4.1) |
| 8 | Zoom 200% / reflow không vỡ layout | ✅ | GUI-IA01-013, GUI-IA01-009 | v3 giữ zoom 200% (mục 013) + responsive lưới KPI (mục 009) |

### 2.2 RTL layout

| # | Mục kiểm tra | Có mục? | ID mục | Ghi chú |
|---|---|---|---|---|
| 1 | Thứ tự bố cục đảo đúng khi `dir="rtl"` | ✅ | GUI-IA01-007 | Tiêu chí viết theo hướng **kiểm tra tính toàn vẹn layout** (không chồng lấn / không tràn / không cắt chữ) để công bằng với một ứng dụng admin không tuyên bố hỗ trợ RTL |
| 2 | Icon hướng (mũi tên, chevron) đảo | ➖ N/A | — | SUT **không có** icon hướng nào — toàn bộ icon là emoji `📂` (không phản ánh chiều). Ghi nhận tại `02-ui-analysis.md` §6 |
| 3 | Cột bảng / lưới đảo | ✅ (gộp trong 007) | GUI-IA01-007 | SUT dùng `text-left` cứng cho mọi bảng → sẽ không đảo; mục 007 kiểm tra cả vùng bảng |
| 4 | Margin/padding đối xứng, không dùng left/right cứng | ✅ (gộp trong 007) | GUI-IA01-007 | SUT dùng `ml-4`, `text-left`, `w-64` cứng → ghi nhận tại `02-ui-analysis.md` §6 |
| 5 | Thanh tiến trình đảo chiều | ➖ N/A | — | SUT **không có** thanh tiến trình nào (chỉ có text "Đang import...") → đã thay bằng GUI-IA04-011 (tiến trình import) |

### 2.3 Dark mode

| # | Mục kiểm tra | Có mục? | ID mục | Ghi chú |
|---|---|---|---|---|
| 1 | Chữ/ảnh vẫn đọc được trên nền tối | ✅ | GUI-IA01-008 | SUT **chưa hỗ trợ dark mode** (không có `darkMode` trong `tailwind.config.js`, không có class `dark:`, không có toggle) → mục đo tính toàn vẹn tương phản, đồng thời ghi rõ đây là **hạn chế của SUT, đề xuất bổ sung** |
| 2 | Hover / focus / disabled phân biệt được | ✅ (gộp trong 008) | GUI-IA01-008 | Runtime đo nút Import ở trạng thái disabled: `disabled:opacity-50` trên nền xanh → tương phản giảm mạnh |
| 3 | Ảnh, icon, biểu đồ không bị chói | ✅ (gộp trong 008) | GUI-IA01-008 | SUT dùng ảnh PNG nền trắng từ `placehold.co` → nguy cơ viền trắng nổi trên nền tối |
| 4 | Bảng, viền, shadow không bị "chìm" | ✅ (gộp trong 008) | GUI-IA01-008 | Viền bảng dùng `#e5e7eb` (Tailwind preflight) — sẽ gần như biến mất trên nền tối |

**Ghi chú chung cho §2.2 và §2.3**: theo hướng dẫn của skill, khi SUT không hỗ trợ một tính năng thì **vẫn phải giữ item đánh giá được**. Ở đây cả 2 nhóm đều đã có item kiểm chứng được bằng thao tác quan sát trong ≤2 phút.

---

## 3. Các mục đã viết lại (AI sinh → chuẩn hoá)

| ID v2 | Bản AI (viết lại) | Bản chuẩn hoá | Lý do sửa |
|---|---|---|---|
| GUI-IA04-008 | "Tạo ≥1 đơn hàng có trạng thái `delivered` (qua frontend-web Checkout rồi chuyển trạng thái trong tab Đơn hàng) → so sánh" | Bổ sung khối **"Cần dữ liệu trước"** ghi rõ 3 bước tạo đơn `delivered` và ghi lại tổng tiền để đối chiếu | Mơ hồ về điều kiện tiên quyết — tester không biết phải chuẩn bị gì |
| GUI-IA04-009 | "Mở tab 'Đơn hàng' → đếm số dòng → quay lại Dashboard → so sánh" | Ghi rõ tab "Đơn hàng" **ngoài phạm vi kiểm thử**, chỉ dùng làm số liệu đối chiếu | Tránh hiểu nhầm là đã cover tab Đơn hàng |
| GUI-IA01-012 | "đo `getBoundingClientRect().width` của 2 thẻ KPI" | Lệnh cụ thể `getComputedStyle(document.querySelector('div.grid.grid-cols-2')).gridTemplateColumns` | Cách đo dễ sai (đo thẻ con thay vì cột lưới) |
| GUI-IA02-012 | "giá rỗng, 0 hoặc âm bị chặn" | Liệt kê rõ 3 ca thử: bỏ trống giá / giá `0` / giá `-100`, kiểm tra Network mỗi lần | "Một item = một điều kiện" — tách thành 3 ca kiểm chứng độc lập |
| GUI-IA02-016 | "(có `name` rỗng ở dòng 2 và `price = -500` ở dòng 3)" | Chỉ rõ từng lỗi nằm ở dòng nào và bổ sung quan sát nhãn nút Import | Làm rõ để 2 người chấm điểm ra cùng kết luận |

---

## 4. Các mục đã thêm trong bước review (v2) + lý do AI bỏ sót

> **Nguồn gốc**: 10 mục dưới đây do **AI tự thêm** ở bước review — **không phải** người dùng thêm.
> Cột "Mã lý do AI bỏ sót" mô tả **vì sao bản v1 (sinh ở bước 3) đã bỏ sót** — đây là phần HW03 chấm điểm trực tiếp.
> Mục nào đã bị gộp/bỏ ở v3 sẽ ghi chú ở cột "Trạng thái v3".

| ID v2 | IA | Màn hình | Tiêu chí kiểm chứng | Mã lý do AI bỏ sót | Giải thích cụ thể | Nguồn gốc | Trạng thái v3 |
|---|---|---|---|---|---|---|---|
| GUI-IA01-022 | IA-01 | Khung chung – Sidebar | Thứ tự focus theo phím `Tab` đi từ trên xuống dưới, trái sang phải | `ACCESS` | V1 chỉ kiểm tra **"điều hướng được bằng bàn phím"** mà bỏ **"thứ tự focus"**. Với menu 7 mục, ngay cả khi các mục focus được thì thứ tự Tab vẫn có thể sai | `AI+Review` | ✅ giữ → **GUI-IA03-009** |
| GUI-IA01-023 | IA-01 | Admin Login | Mỗi control có tên truy cập được bằng trình đọc màn hình | `ACCESS` | V1 kiểm tra "có `<label>`" (mắt thường thấy) nhưng **không kiểm tra tên truy cập** — hai thứ khác nhau: control có thể không có `<label>` hiển thị nhưng vẫn có `aria-label`. Screen reader là kênh tiếp cận riêng, khó kiểm chứng bằng mắt nên hay bị bỏ sót | `AI+Review` | ⚠️ **gộp** vào GUI-IA02-001 (mục label) — tránh trùng |
| GUI-IA01-024 | IA-01 | Quản lý Sản phẩm | Màu nút nhất quán theo vai trò (tích cực = xanh dương, nguy hiểm = đỏ) | `DOMAIN` | V1 chỉ kiểm tra **tương phản** màu, không kiểm tra **ý nghĩa ngữ nghĩa của màu** — quy tắc thiết kế màu theo vai trò là kiến thức chuyên môn về design system, không phải kiến thức UI chung mà mô hình mặc định áp dụng | `AI+Review` | ❌ **bỏ** ở v3 (ít giá trị so với mục tương phản) |
| GUI-IA01-025 | IA-01 | Quản lý Sản phẩm | Tên sản phẩm dài (≥60 ký tự) không làm vỡ bảng | `HIDDEN` | Chỉ xuất hiện khi **có dữ liệu dài** — seed data hiện tại có tên ngắn nên nhìn bằng mắt không thấy vấn đề | `AI+Review` | ❌ **bỏ** ở v3 (độ hiếm thấp, cần sửa dữ liệu) |
| GUI-IA02-019 | IA-02 | Admin Login | Nhấn `Enter` trong ô mật khẩu gửi form | `MODEL` | AI tập trung vào *nội dung* form (label, required, validate) mà quên *hành vi bàn phím* | `AI+Review` | ❌ **bỏ** ở v3 (giá trị thấp) |
| GUI-IA02-020 | IA-02 | Quản lý Sản phẩm | Form có nút Reset/Xóa dữ liệu, có cảnh báo trước khi xóa | `MODEL` | `interface-aspects.md` có liệt kê "Submit & Reset" nhưng AI chỉ sinh mục cho "Submit" vì Reset thường bị coi là chi tiết nhỏ | `AI+Review` | ❌ **bỏ** ở v3 |
| GUI-IA03-010 | IA-03 | Khung chung – Sidebar | URL không tồn tại → trang lỗi 404 hữu ích có nút quay về | `APP-CHAR` | SUT **không có router** → mọi URL đều render cùng một app. AI nhìn code thấy "không có router" nhưng coi đó là chi tiết kiến trúc chứ không dịch thành hành vi quan sát được | `AI+Review` | ✅ giữ → **GUI-IA03-005** |
| GUI-IA03-011 | IA-03 | Khung chung – Sidebar | Sau khi chuyển tab, focus được chuyển vào vùng nội dung mới | `ACCESS` | V1 kiểm tra focus *có/không* tồn tại nhưng không kiểm tra **focus di chuyển đi sau khi điều hướng** — yêu cầu cốt lõi của WCAG 2.4.3 | `AI+Review` | ✅ giữ → **GUI-IA03-009** |
| GUI-IA04-020 | IA-04 | Quản lý Sản phẩm | Hộp thoại xác nhận (nếu có) đóng bằng `Esc` và trả focus về nút gốc | `MODEL` | V1 chỉ kiểm tra "hộp thoại xác nhận có tồn tại không". AI dừng ở **sự tồn tại** của modal mà không kiểm tra **hành vi** (ESC, focus trap, trả focus) | `AI+Review` | ❌ **bỏ** ở v3 (vì ứng dụng hiện **chưa có** hộp thoại nào — mục chỉ có nghĩa sau khi GUI-IA04-008 được sửa) |
| GUI-IA04-021 | IA-04 | Import CSV | Khi chọn file thứ hai, preview file trước bị xóa, không trộn lẫn | `HIDDEN` | Lỗi "state cũ không được reset" chỉ lộ ra khi thao tác **liên tiếp nhiều lần** | `AI+Review` | ❌ **bỏ** ở v3 (độ hiếm thấp) |

### 4b. Các mục người dùng bổ sung

_(Chưa có — chờ người dùng review ở Gate B. Khi có, ghi ở đây với nguồn gốc `Human` hoặc `Human+AI`.)_

| ID | IA | Màn hình | Tiêu chí kiểm chứng | Mã lý do AI bỏ sót | Giải thích cụ thể | Nguồn gốc |
|---|---|---|---|---|---|---|
| _(chờ người dùng điền)_ | | | | | | |

---

## 5. Mục bị loại bỏ / gộp ở v3 (77 → 47)

### 5.1. Mục bị **gộp** (không mất nội dung kiểm thử, chỉ giảm số mục)

| Nhóm mục trùng lặp | Mục gộp lại | Cách gộp | Lý do gộp |
|---|---|---|---|
| **3 mục "có `<label>`"** ở Login / Danh mục / Sản phẩm | → **GUI-IA02-001** | Một mục "áp dụng cho cả 4 form", liệt kê đủ 8 control + lệnh Console để đếm | Cùng một khuyết điệt (`label` = 0) trên mọi form. Nhân bản 3 lần chỉ tăng khối lượng thao tác mà không tăng độ phủ |
| **3 mục contrast nút** (Sửa / Xóa / Lưu sản phẩm) | → **GUI-IA01-011** | Một mục "tất cả nút hành động trong màn hình", liệt kê giá trị đo sẵn của cả 3 | Cùng tiêu chí (≥4.5:1), cùng màn hình → theo luật "không trùng tiêu chí + màn hình" phải gộp |
| **2 mục xác nhận xoá** (Danh mục / Sản phẩm) | → **GUI-IA04-008** | Một mục "mọi hành động xoá", nêu rõ cả 2 nơi trong "Cách kiểm chứng" | Cùng tiêu chí (dialog xác nhận) |
| **2 mục thông báo thành công** (Danh mục / Sản phẩm) | → **GUI-IA04-006** | Một mục "sau mỗi thao tác ghi", liệt kê các thao tác ghi | Cùng tiêu chí (phản hồi thành công) |
| **2 mục lỗi server / lỗi mạng** | → **GUI-IA04-007** | Gộp lỗi server + lỗi mạng vào một mục "lỗi hiển thị thân thiện", vì cùng một tiêu chí: thông báo cho người dùng biết chuyện gì xảy ra và làm gì tiếp | Cùng tiêu chí (thân thiện + có cách khắc phục + giữ dữ liệu) |
| **2 mục loading / empty state** (Dashboard + bảng) | → **GUI-IA04-004** (loading, Dashboard) + **GUI-IA04-005** (empty state, Dashboard) | Giữ thành 2 mục riêng nhưng ghim vào Dashboard (nơi hiện trạng rõ nhất) và ghi trong Ghi chú rằng các bảng khác cũng cần kiểm | Vẫn giữ 2 tiêu chí khác nhau; chỉ dời màn hình để tránh trùng |
| **2 mục focus order + focus sau điều hướng** | → **GUI-IA03-009** | Gộp vào 1 mục "focus sau điều hướng" | Cùng chủ đề quản lý focus |

### 5.2. Mục bị **bỏ** (không đưa vào v3)

| Mục v2 | IA | Màn hình | Lý do bỏ |
|---|---|---|---|
| GUI-IA01-018 | IA-01 | Sản phẩm | **Sẽ luôn Pass** — runtime đo: mọi ảnh sản phẩm đã có `alt` đầy đủ. Giữ lại sẽ tạo cảm giác "coverage rộng" nhưng không tìm ra được vấn đề |
| GUI-IA01-024 | IA-01 | Sản phẩm | Màu nút theo vai trò — trùng phần lớn với mục tương phản; quy tắc màu theo vai trò không nằm trong 4 IA một cách rõ ràng |
| GUI-IA01-025 | IA-01 | Sản phẩm | Tên sản phẩm dài — chỉ lộ ra khi sửa dữ liệu, độ hiếm thấp so với chi phí thao tác |
| GUI-IA02-019 | IA-02 | Login | Enter-to-submit — hành vi mặc định của browser, giá trị thấp |
| GUI-IA02-020 | IA-02 | Sản phẩm | Nút Reset — ứng dụng không có, và chỉ là chi tiết nhỏ |
| GUI-IA04-020 | IA-04 | Sản phẩm | ESC/focus-trap của modal — **ứng dụng hiện chưa có hộp thoại nào**, mục chỉ có nghĩa sau khi mục xác nhận xoá (GUI-IA04-008) được sửa. Ghi nhận lại trong bug report nếu cần |
| GUI-IA04-021 | IA-04 | Import CSV | Reset preview khi chọn file mới — độ hiếm thấp |
| GUI-IA04-002 (cũ) | IA-04 | Login | Lỗi mạng — **gộp** vào GUI-IA04-007 (không bỏ) |
| GUI-IA01-023 | IA-01 | Login | Tên truy cập screen reader — **gộp** vào GUI-IA02-001 (không bỏ) |
| GUI-IA03-001 | IA-03 | Dashboard | Dashboard reachable trong 1 click — hiển nhiên đúng, không có giá trị kiểm chứng |
| GUI-IA02-009 (cũ) | IA-02 | Danh mục | Tên danh mục trùng — **đặc tả không yêu cầu uniqueness** cho danh mục, nên tiêu chí "bị từ chối" là do AI tự đặt ra → bỏ để checklist trung thực |
| GUI-IA04-019 (cũ) | IA-04 | Import CSV | Nút Import disabled không có lý do — độ hiếm thấp, và đã nằm gần đủ trong GUI-IA04-008 |
| GUI-IA01-020 (cũ) | IA-01 | Sản phẩm | Cỡ chữ input ≥16px — chỉ liên quan mobile, mà lần chạy này chỉ test Chrome desktop |
| GUI-IA02-014 (cũ) | IA-02 | Sản phẩm | Giữ dữ liệu khi server lỗi — **gộp** vào GUI-IA02-009 / GUI-IA04-007 (không bỏ) |

---

## 6. So sánh trước / sau

| Chỉ số | v1 | v2 | **v3 (hiện tại)** | Chênh lệch v2 → v3 |
|---|---|---|---|---|
| Tổng số mục | 67 | 77 | **47** | **−30** |
| IA-01 | 21 | 25 | **13** | −12 |
| IA-02 | 18 | 20 | **12** | −8 |
| IA-03 | 9 | 11 | **9** | −2 |
| IA-04 | 19 | 21 | **13** | −8 |
| Số mục viết lại | — | 5 | 5 (giữ nguyên từ v2) | 0 |
| Số mục thêm mới | — | 10 | 0 | −10 (đã gộp vào các mục khác) |
| Số mục bỏ | — | 0 | **7** | +7 |
| Số mục gộp | — | 0 | **8 nhóm / ~23 mục** | — |
| Số màn hình / vùng cover | 6 | 6 | 7 (thêm 2 nhóm "khung chung") | +1 |
| Số mục accessibility | 6 | 9 | **6** | −3 |
| Số mục RTL | 1 | 1 | **1** | 0 |
| Số mục dark mode | 1 | 1 | **1** | 0 |
| Số mục responsive + zoom | 3 | 4 | **2** | −2 |
| Mã FR-xx trong cột tiêu chí | có | có | **0** | **−hết** |
| Cặp trùng (tiêu chí + màn hình) | 0 | 0 | **0** (kiểm bằng script) | 0 |
| Dòng có cột Kết quả điền sẵn | 0 | 0 | **0** | 0 |

---

## 7. Ghi chú điều chỉnh của người dùng

| Bước | Ngày | Người dùng yêu cầu thay đổi gì | Kết quả |
|---|---|---|---|
| 1 (Scope Analyzer) | 2026-11-11 | Chốt SUT = `frontend-admin` @ localhost:5174 + backend :3000; credential `admin@eshop.com` / `Admin123!` | Ghi vào `01-scope-analysis.md` §1 |
| 1 (Scope Analyzer) | 2026-11-11 | Tách "Import CSV" thành luồng/màn hình riêng | Phạm vi chốt 5 luồng + Khung chung |
| 1 (Scope Analyzer) | 2026-11-11 | Dùng chuẩn 4 IA + FR-21..FR-24 | **Đã bị ghi đè ở v3 — xem dòng dưới** |
| 1 (Scope Analyzer) | 2026-11-11 | Chỉ chạy Phase 01, dừng sau bước 4 | Skill dừng ở Gate B |
| **4 (Review)** | **2026-11-12** | **"Bỏ đi FR-21..24 chỉ cần 4 IA thôi"** | **Đã bỏ toàn bộ mã FR-21..FR-24 khỏi cột "Tiêu chí kiểm chứng" của checklist. Trong `02-ui-analysis.md`, các tham chiếu FR-21..24 được đổi thành "đặc tả SRS §8" và ghi chú rõ đây chỉ là ngữ cảnh nghiệp vụ, không phải tiêu chuẩn phân loại** |
| **4 (Review)** | **2026-11-12** | **"Giảm bớt checklist, 77 là quá nhiều và dư thừa"** | **Rút gọn 77 → 47 mục (−39%) bằng cách gộp 8 nhóm mục trùng lặp và bỏ 7 mục giá trị thấp. Chi tiết gộp/bỏ ở §5. Vẫn đạt yêu cầu: >40 mục, mỗi IA ≥8 (13/12/9/13)** |

---

## 8. Xác nhận của người dùng

- Ngày: _(chờ)_
- Người xác nhận: _(chờ)_
- Nội dung đã thay đổi theo yêu cầu: _(chờ)_

### Câu hỏi cho người dùng

1. 47 mục (từ 77) — anh/chị thấy đã đủ gọn chưa, hay muốn rút thêm?
2. Việc gộp 8 nhóm mục trùng lặp thành mục "áp dụng chung cho nhiều màn hình" có làm khó chấm không? (Cách thay thế: tách lại thành mục riêng theo màn hình → số mục tăng lên ~60)
3. 7 mục đã bỏ (§5.2) — có mục nào anh/chị thấy quan trọng và muốn giữ lại không?
4. Có muốn thêm mục nào không?

---

## 9. Trạng thái Gate B

> ⛔ **Đang chờ người dùng review và xác nhận checklist.**
>
> Sau khi được xác nhận, bước tiếp theo là **người dùng tự thực thi checklist trên SUT thật**:
> mở `03-gui-checklist.md`, điền cột **Kết quả** (`Passed`/`Failed`), cột **Bằng chứng**
> (đường dẫn ảnh) và **Ghi chú** (lý do fail) cho các mục Failed.
>
> AI **không** tự đánh dấu Pass/Fail, không tự tạo bug, không tự chuyển sang Module 5.
