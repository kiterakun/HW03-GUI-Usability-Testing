# P02 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P02.** File này được lập từ bản ghi màn hình
> `recordings/P02.mp4`, bảng hỏi `responses.csv` → dòng `P02`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P02 |
| Họ tên | Phạm Văn Chung — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-12 |
| Thời lượng | 21 phút (4 task, tổng thời gian trên task ≈ 16.4 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Edge (desktop, 1366×768) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P02.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P02` |
| File ghi chú của người tham gia | `recordings/P02-ghi-chu.md` |

## 0. Trạng thái phiên

| Kiểm | Kết quả |
|---|---|
| DB đã reset (seed lại) trước phiên này? | ✅ Có — chạy `reset-db.ps1` (xoá `database.sqlite` → start server → `seed-orders.js`) |
| Dashboard hiển thị số khác 0 trước khi bắt đầu? | ✅ Có — doanh thu **6.400.000 ₫** / **5** đơn (giá trị **đúng** theo seed = 3.200.000 ₫; giá trị **hiển thị** = 6.400.000 ₫ do bug ×2) |
| Người tham gia có mở DevTools / tra Google / xem mã nguồn? | ✅ Không — ghi nhận qua quan sát video trong toàn bộ phiên |
| Phiên có cần loại bỏ khỏi tổng hợp không? | ✅ Không — đủ dữ liệu, giữ nguyên trong tổng hợp |

> **Lưu ý:** Dashboard không rỗng nên Task T1 (FR-13) **đo được** → không đánh dấu `not_completed`.

## 1. Hồ sơ người tham gia

| Thuộc tính | Giá trị |
|---|---|
| Nhóm người dùng | Nhân viên kinh doanh |
| Độ tuổi | 32 |
| Nghề nghiệp | Nhân viên kinh doanh bán hàng online, 6 năm kinh nghiệm |
| Kinh nghiệm e-commerce / quản trị shop | Đã dùng EShop admin 1 tháng; quen quản lý sản phẩm trên sàn Shopee |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Edge |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Thao tác nhanh, quen với thương mại điện tử; nhạy với rủi ro mất dữ liệu.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 2.1 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | ✅ completed | 3.2 | ✅ completed | ✅ completed | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | 🟡 completed_with_help | 5.0 | 🟡 completed_with_help | 🟡 completed_with_help | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 6.1 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

> Người thu phiên **không sửa** kết quả đánh dấu của người tham gia cho bất kỳ task nào ở phiên này.

### 2.1. Tiêu chí thành công chi tiết (đối chiếu từng tiêu chí)

**T4 — Đăng nhập**
- [x] Hiểu được vì sao lần đăng nhập sai bị từ chối
- [x] Hiểu được vì sao tài khoản user thường bị từ chối
- [x] Biết phải làm gì tiếp theo mà không cần trợ giúp — **không đạt**: thông báo lỗi không nêu cách xử lý (điểm F6 = 3/5)

**T1 — Dashboard**
- [x] Chỉ ra được 2 thẻ số liệu
- [x] Diễn giải doanh thu = đơn **delivered** (không phải mọi đơn)
- [x] Con số họ đọc ra: **6,400,000 ₫** (giá trị đúng theo seed = **3.200.000 ₫**; giá trị hiển thị do bug ×2 = **6.400.000 ₫**)

**T2 — Danh mục**
- [x] Tạo được `Giày dép`, xuất hiện trong bảng
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — kết luận “app này không cho sửa danh mục” sau khoảng 3 phút. (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có (tự phát hiện lúc 16:00). (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — kết luận “app này không cho sửa danh mục” sau khoảng 3 phút. |
| Họ đã thử những cách gì? | Lướt cột “Hành động” → bấm vào tên danh mục → Ctrl+− để thu nhỏ màn hình xem hết bảng → thử bấm nút Xóa để xem hệ thống phản ứi thế nào → tạo mới rồi xóa cũ. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **3 phút** (07:10–10:00). |
| Họ có hỏi/hét gọi người tổ chức không? | Không hỏi trực tiếp; ghi trong `ghi-chu.md`: “Không có nút Sửa danh mục, tôi tạo cái mới rồi xóa cái cũ.” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có (tự phát hiện lúc 16:00). |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Sao 5 cái này tên giống nhau hết vậy? Tôi chỉ sửa một cái thôi mà.” |
| Họ có nhận ra ô nào bắt buộc không? | Không chắc — không có `*`; đoán theo kinh nghiệm (“chắc tên và giá”). |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Không để ý. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở trang Login (tiếng Anh). Người tham gia điền ngay, không dừng lại đọc. | “Thiếu nhãn tiếng Việt nhưng không sao, biết là form đăng nhập.” | 1 |
| 01:00 | T4 | Nhập sai mật khẩu → `alert()` “Đăng nhập thất bại”. Người tham gia gõ lại mật khẩu ngay. | “Sai mật khẩu thôi, tôi gõ lại.” | 1 |
| 02:00 | T4 | Đăng nhập bằng tài khoản user thường → `alert()` “Bạn không phải là admin!” | “Tài khoản này không phải admin. Rõ ràng rồi.” | 1 |
| 02:50 | T4 | Đăng nhập đúng → vào Dashboard. | “Vào rồi.” | 1 |
| 03:40 | T1 | Đọc Dashboard: doanh thu **6,400,000 ₫**, 5 đơn; nói rõ chỉ tính đơn Delivered. | “Doanh thu 6.400.000, 5 đơn. Ghi rõ delivered thì chắc là đơn đã giao.” | 1 |
| 04:30 | T1 | Bấm vào từng thẻ KPI, không tìm thấy bảng đơn hàng; kéo dài ở phần đối chiếu số. | “Không có bảng đơn hàng để so. Tôi không biết con số này có bị nhân đôi không.” | 2 |
| 06:00 | T2 | Tạo danh mục `Giày dép` → xuất hiện trong bảng, không có thông báo. | “OK, có trong bảng.” | 1 |
| 07:10 | T2 | Tìm nút Sửa: lướt cột “Hành động”, bấm thử vào tên, mở rộng cửa sổ trình duyệt (Ctrl+−) để xem hết bảng. | “Không có nút Sửa. Chắc là app này không cho sửa danh mục.” | 2 |
| 09:30 | T2 | Thử bấm “Xóa” một danh mục seed để xem hệ thống có hỏi không — bị xóa thẳng, không có hộp thoại. Người tham gia dừng lại ngay. | “Khoan, xóa luôn không hỏi? Cái này là danh mục có sẵn!” | 3 |
| 10:00 | T2 | Tạo danh mục mới `Giày dép & Dép`, xóa danh mục `Giày dép` vừa tạo để đạt tiêu chí. | “Tạo cái mới xong xóa cái cũ là được, coi như đổi tên.” | 2 |
| 13:00 | T3 | Điền form sản phẩm `Áo khoác dạ`, giá `450000`, danh mục `Phụ kiện`. Không có ký hiệu `*`. | “Không có dấu *, chắc tên và giá là bắt buộc.” | 2 |
| 15:00 | T3 | Bấm “Sửa” dòng `Tai nghe AirPods Pro 2` → đổi tên + giá `5990000` → “Lưu sản phẩm” → `alert()` “Cập nhật thành công!”. | “Cập nhật thành công!” | 1 |
| 16:00 | T3 | Nhìn lại bảng: cả 5 dòng cùng tên mới, giá dòng sửa vẫn là `6000000 ₫`. Người tham gia **nhận ra** tên bị đổi hàng loạt nhưng **không** nhận ra giá sai. | “Sao 5 cái này tên giống nhau hết vậy? Tôi chỉ sửa một cái thôi mà.” | 3 |
| 18:00 | T3 | Điền bảng hỏi + probe. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có chức năng Sửa danh mục; người tham gia thử bấm vào tên và zoom out để tìm nút. | “Không có nút Sửa. Chắc là app này không cho sửa danh mục.” | 4 | 2 | 07:10–10:00 | T2 |
| F2 | Nút Xóa không có hộp thoại xác nhận — người tham gia vô tình xóa một danh mục seed. | “Khoan, xóa luôn không hỏi? Cái này là danh mục có sẵn!” | 1 | 3 | 09:30 | T2 |
| F3 | Sửa một sản phẩm làm tên của toàn bộ 5 dòng trong bảng đổi theo. | “Sao 5 cái này tên giống nhau hết vậy? Tôi chỉ sửa một cái thôi mà.” | 1 | 3 | 16:00 | T3 |
| F4 | Giá `5990000` không hiển thị sau khi lưu (vẫn là `6000000 ₫`). | “Tên thì đổi rồi, còn giá… à, giá vẫn 6 triệu. Lạ.” | 1 | 2 | 16:10 | T3 |
| F5 | Không có ký hiệu trường bắt buộc; nhãn là placeholder biến mất khi nhập. | “Không có dấu *, chắc tên và giá là bắt buộc.” | 1 | 2 | 13:00 | T3 |
| F6 | `alert()` thô khi đăng nhập sai; không nêu nguyên nhân, không chặn form rỗng. | “Sai mật khẩu thôi, tôi gõ lại.” | 1 | 1 | 01:00 | T4 |
| F7 | Dashboard không cho đối chiếu doanh thu với bảng đơn hàng. | “Không có bảng đơn hàng để so. Tôi không biết con số này có bị nhân đôi không.” | 1 | 1 | 04:30 | T1 |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 07:10–10:00 | Tự tìm (bấm vào tên, zoom out, quét cột Hành động) rồi tự dùng workaround tạo mới/xóa cũ. | UI không có chức năng Sửa. | Không — nhưng kết quả tính là `completed_with_help` do phải dùng workaround. |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P02` trong `responses.csv`.

### SUS (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 | Điểm đã điều chỉnh |
|---|---|---|---|---|---|---|
| 1 | 3 | | | | | `2` (điểm − 1) |
| 2 | 3 | | | | | `2` (5 − điểm) |
| 3 | 3 | | | | | `2` (điểm − 1) |
| 4 | 3 | | | | | `2` (5 − điểm) |
| 5 | 3 | | | | | `2` (điểm − 1) |
| 6 | 2 | | | | | `3` (5 − điểm) |
| 7 | 3 | | | | | `2` (điểm − 1) |
| 8 | 3 | | | | | `2` (5 − điểm) |
| 9 | 4 | | | | | `3` (điểm − 1) |
| 10 | 3 | | | | | `2` (5 − điểm) |
| | | | | | **Tổng điều chỉnh** | **22** |
| | | | | | **Điểm SUS = (2.5 × 22) − 50** | **5.0 / 100** |

> Xếp hạng Bangor: **F (Bottom 15% — Không chấp nhận được)**.

### UEQ-S (thang 1–7)

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| 1 | 4 | | | | | | |
| 2 | 4 | | | | | | |
| 3 | 5 | | | | | | |
| 4 | 4 | | | | | | |
| 5 | 3 | | | | | | |
| 6 | 4 | | | | | | |
| 7 | 4 | | | | | | |
| 8 | 3 | | | | | | |
| 9 | 4 | | | | | | |
| 10 | 5 | | | | | | |
| 11 | 4 | | | | | | |
| 12 | 4 | | | | | | |
| 13 | 4 | | | | | | |
| 14 | 4 | | | | | | |
| 15 | 4 | | | | | | |
| 16 | 3 | | | | | | |
| 17 | 3 | | | | | | |
| 18 | 3 | | | | | | |
| 19 | 4 | | | | | | |
| 20 | 3 | | | | | | |
| 21 | 4 | | | | | | |
| 22 | 3 | | | | | | |
| 23 | 3 | | | | | | |
| 24 | 3 | | | | | | |
| 25 | 3 | | | | | | |
| 26 | 4 | | | | | | |

| Chất lượng | Điểm TB của phiên này (1–7) | Tham chiếu — cách chấm chuẩn UEQ-S (1–7) |
|---|---|---|
| Attractiveness | 3.80 | 3.83 |
| Clarity | 4.00 | 4.00 |
| Efficiency | 3.83 | 3.83 |
| Reliability | 3.33 | 3.20 |
| Motivation | 3.50 | 3.67 |
| Novelty | 4.00 | 4.00 |

> **Quy ước chấm điểm của đợt test (dùng thống nhất cho mọi phiên và mọi bảng tổng hợp):**
> Attractiveness = 1, 6, 9, 11, 22 · Clarity = 2, 7, 10, 12, 20 · Efficiency = 3, 13, 14, 15, 23, 25 ·
> Reliability = 4, 5, 24 · Motivation = 16, 21 · Novelty = 26 → **22/26 mục được chấm điểm**;
> 4 mục **8, 17, 18, 19** không tính vào điểm 6 chất lượng. Cột tham chiếu bên cạnh là cách chấm
> UEQ-S chuẩn (Laugwitz et al., 2009) trong đó mục 26 cộng vào cả 3 chất lượng
> (Attractiveness / Motivation / Novelty) và các mục 17, 18 thuộc Reliability — dùng để đối chiếu.

### Thang tùy chỉnh F1–F6 (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| F1 | 3 | | | | |
| F2 | 3 | | | | |
| F3 | 3 | | | | |
| F4 | 3 | | | | |
| F5 | 3 | | | | |
| F6 | 3 | | | | |

### Đánh giá nhiệm vụ (Phần D) — theo từng task

| Câu | T4 | T1 | T2 | T3 |
|---|---|---|---|---|
| D1. Tôi đã hoàn thành được nhiệm vụ. | 5 | 5 | 3 | 5 |
| D2. Nhiệm vụ này dễ thực hiện. | 4 | 4 | 2 | 4 |
| D3. Tôi không cần hỗ trợ của người khác. | 5 | 4 | 2 | 5 |

## 7. Câu trả lời probe (nguyên văn từ `ghi-chu.md` của người tham gia — không diễn giải)

| Câu | Trích lời nói |
|---|---|
| E1 – Clarity | “Menu bên trái dễ tìm. Trang đăng nhập thì hơi lạ vì tiếng Anh, nhưng ai cũng biết là form login.” |
| E2 – Error recovery | “Báo lỗi bằng cái hộp thoại trắng, không nói lý do. Tệ nhất là nút Xóa không hỏi lại, tôi suýt xóa mất danh mục có sẵn.” |
| E3 – Speed | “Thao tác nhanh, mỗi việc một cú bấm. Mất thời gian nhất ở chỗ đổi tên danh mục vì không có chức năng.” |
| E4 – Trust | “Tôi không tin lắm con số doanh thu vì không có chỗ nào để so. Thêm nữa sửa một sản phẩm mà tên mấy cái khác cũng đổi — nhìn không đáng tin.” |
| E5 – FR-12 | “Sai mật khẩu thì tôi biết là sai mật khẩu; tài khoản thường thì biết là không phải admin. Nhưng không có hướng dẫn làm gì tiếp.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn. Tôi hiểu delivered là đơn đã giao, nhưng không chắc con số có đúng không vì không có bảng đơn hàng.” |
| E7 – FR-14 | “Tạo và xóa thì được. Đổi tên thì không có, tôi tạo mới rồi xóa cũ. Xóa không hỏi lại là chỗ tôi lo nhất.” |
| E8 – FR-15 | “Có, tôi thấy cả 5 dòng cùng tên mới. Giá thì tôi không kiểm tra kỹ.” |
| E9 – FR-15 (giá) | “Giá vẫn 6.000.000, không phải 5.990.000. Tôi cũng không biết số 450000 có dấu phân cách hay không.” |
| E10 | “Không có dấu *, tôi điền tên, giá, chọn danh mục, còn mô tả thì bỏ trống.” |
| E11 | “Thêm xong không có gì báo. Sửa thì có báo ‘Cập nhật thành công!’.” |

## 8. Ghi chú khác

- Người tham gia **tự phát hiện** lỗi đổi tên hàng loạt (C1), **không phát hiện** lỗi giá (C2).
- Trong lúc tìm nút Sửa, người tham gia **vô tình xóa một danh mục seed** (Điện thoại) — hậu quả trực tiếp của việc xóa không có xác nhận; dữ liệu đã được seed lại cho các phiên sau.
- Không mở DevTools, không tra Google, không xem mã nguồn.
- Người thu phiên không sửa kết quả đánh dấu của người tham gia.
