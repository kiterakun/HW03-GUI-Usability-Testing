# P07 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P07.** File này được lập từ bản ghi màn hình
> `recordings/P07.mp4`, bảng hỏi `responses.csv` → dòng `P07`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P07 |
| Họ tên | Trần Thanh Hưng — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-13 |
| Thời lượng | 19 phút (4 task, tổng thời gian trên task ≈ 13.4 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Chrome (desktop, 1920×1080) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P07.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P07` |
| File ghi chú của người tham gia | `recordings/P07-ghi-chu.md` |

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
| Nhóm người dùng | Chủ cửa hàng điện tử |
| Độ tuổi | 41 |
| Nghề nghiệp | Chủ cửa hàng điện tử, 8 năm kinh nghiệm bán lẻ |
| Kinh nghiệm e-commerce / quản trị shop | Quen sàn TMĐT khác (không dùng EShop admin trước đây) |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Chrome |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Nhiều kinh nghiệm quản lý sản phẩm, đánh giá giao diện bằng tiêu chuẩn làm việc thật.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 1.7 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | ✅ completed | 2.7 | ✅ completed | ✅ completed | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | 🟡 completed_with_help | 4.0 | 🟡 completed_with_help | 🟡 completed_with_help | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 5.0 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

> Người thu phiên **không sửa** kết quả đánh dấu của người tham gia cho bất kỳ task nào ở phiên này.

### 2.1. Tiêu chí thành công chi tiết (đối chiếu từng tiêu chí)

**T4 — Đăng nhập**
- [x] Hiểu được vì sao lần đăng nhập sai bị từ chối
- [x] Hiểu được vì sao tài khoản user thường bị từ chối
- [x] Biết phải làm gì tiếp theo mà không cần trợ giúp — **không đạt**: thông báo lỗi không nêu cách xử lý (điểm F6 = 4/5)

**T1 — Dashboard**
- [x] Chỉ ra được 2 thẻ số liệu
- [x] Diễn giải doanh thu = đơn **delivered** (không phải mọi đơn)
- [x] Con số họ đọc ra: **6,400,000 ₫** (giá trị đúng theo seed = **3.200.000 ₫**; giá trị hiển thị do bug ×2 = **6.400.000 ₫**)

**T2 — Danh mục**
- [x] Tạo được `Giày dép`, xuất hiện trong bảng
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — nhận ra sau khoảng 2 phút. (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có (tự phát hiện lúc 15:50). (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — nhận ra sau khoảng 2 phút. |
| Họ đã thử những cách gì? | Bấm vào tên danh mục → bấm đúp → quét cột “Hành động” → đối chiếu với giao diện các sàn khác → tạo mới rồi xóa cũ. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **2 phút 10 giây** (07:40–09:50). |
| Họ có hỏi/hét gọi người tổ chức không? | Không; ghi trong `ghi-chu.md`: “Không có chức năng sửa danh mục.” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có (tự phát hiện lúc 15:50). |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Sao cả bảng cùng tên? Tôi chỉ sửa một dòng thôi mà.” |
| Họ có nhận ra ô nào bắt buộc không? | Không — không có `*`; đoán theo kinh nghiệm. |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Không để ý. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở trang Login; nhận xét ngay về bản tiếng Anh. | “Giao diện chưa Việt hóa, nhưng dùng được.” | 1 |
| 00:50 | T4 | Sai mật khẩu → `alert()` “Đăng nhập thất bại”. | “Báo chung chung. Lẽ ra phải nói rõ sai mật khẩu.” | 2 |
| 01:50 | T4 | Tài khoản user thường → “Bạn không phải là admin!”. | “Đúng là chỉ admin mới vào được.” | 1 |
| 02:40 | T4 | Đăng nhập đúng → Dashboard. | “Vào được.” | 1 |
| 03:30 | T1 | Đọc Dashboard: **6,400,000 ₫** / **5** đơn; diễn giải doanh thu = đơn đã giao. | “Doanh thu 6.400.000, 5 đơn. Chỉ tính đơn đã giao.” | 1 |
| 04:40 | T1 | Đánh giá giao diện: bảng KPI gọn nhưng thiếu chú thích. | “Nếu có ghi rõ công thức và mốc cập nhật thì tôi tin hơn.” | 2 |
| 06:30 | T2 | Tạo `Giày dép` → có trong bảng, không có thông báo. | “Thêm xong, giao diện sạch nhưng thiếu phần báo.” | 2 |
| 07:40 | T2 | Tìm nút Sửa: bấm vào tên, bấm đúp, quét bảng — không có. | “Không có nút Sửa. Ở mấy sàn tôi dùng thì có.” | 2 |
| 09:50 | T2 | Tạo `Giày dép & Dép` rồi xóa `Giày dép`; lần xóa không có hộp thoại. | “Xóa không hỏi lại. Ở chỗ tôi làm việc, xóa là phải có hộp thoại.” | 2 |
| 13:00 | T3 | Điền form sản phẩm; đánh giá thiếu nhãn tĩnh và ký hiệu bắt buộc. | “Không có nhãn cố định, không có dấu *. Ô nào bắt buộc thì phải đoán.” | 2 |
| 15:00 | T3 | Sửa `Tai nghe AirPods Pro 2` → tên + giá `5990000` → “Lưu sản phẩm” → `alert()` “Cập nhật thành công!”. | “Cập nhật thành công!” | 1 |
| 15:50 | T3 | Kiểm tra bảng: cả 5 dòng cùng tên mới; giá vẫn `6000000 ₫`. Nhận ra tên bị đổi hàng loạt, **không** nhận ra giá sai. | “Sao cả bảng cùng tên? Tôi chỉ sửa một dòng thôi mà.” | 3 |
| 17:00 | T3 | Điền bảng hỏi + probe. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có chức năng Sửa danh mục — người tham gia đối chiếu với các sàn khác. | “Không có nút Sửa. Ở mấy sàn tôi dùng thì có.” | 3 | 2 | 07:40–09:50 | T2 |
| F2 | Xóa không có hộp thoại xác nhận. | “Xóa không hỏi lại. Ở chỗ tôi làm việc, xóa là phải có hộp thoại.” | 1 | 2 | 09:50 | T2 |
| F3 | Sửa một sản phẩm làm đổi tên toàn bộ bảng. | “Sao cả bảng cùng tên? Tôi chỉ sửa một dòng thôi mà.” | 1 | 3 | 15:50 | T3 |
| F4 | Giá mới không hiển thị sau khi lưu. | “Giá thì… tôi không để ý, thấy báo thành công là tin.” | 1 | 1 | 16:00 | T3 |
| F5 | Form sản phẩm thiếu `<label>` và `*`. | “Không có nhãn cố định, không có dấu *. Ô nào bắt buộc thì phải đoán.” | 1 | 2 | 13:00 | T3 |
| F6 | Thông báo đăng nhập sai không nêu nguyên nhân. | “Báo chung chung. Lẽ ra phải nói rõ sai mật khẩu.” | 1 | 2 | 00:50 | T4 |
| F7 | Không có thông báo xác nhận sau khi thêm danh mục. | “Thêm xong, giao diện sạch nhưng thiếu phần báo.” | 1 | 2 | 06:30 | T2 |
| F8 | Dashboard thiếu chú thích công thức và mốc cập nhật. | “Nếu có ghi rõ công thức và mốc cập nhật thì tôi tin hơn.” | 1 | 1 | 04:40 | T1 |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 07:40–09:50 | Tự tìm (bấm tên, bấm đúp, quét bảng) rồi dùng workaround tạo mới/xóa cũ. | UI không có nút Sửa. | Không — kết quả tính `completed_with_help` do dùng workaround. |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P07` trong `responses.csv`.

### SUS (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 | Điểm đã điều chỉnh |
|---|---|---|---|---|---|---|
| 1 | 4 | | | | | `3` (điểm − 1) |
| 2 | 2 | | | | | `3` (5 − điểm) |
| 3 | 4 | | | | | `3` (điểm − 1) |
| 4 | 2 | | | | | `3` (5 − điểm) |
| 5 | 4 | | | | | `3` (điểm − 1) |
| 6 | 3 | | | | | `2` (5 − điểm) |
| 7 | 4 | | | | | `3` (điểm − 1) |
| 8 | 4 | | | | | `1` (5 − điểm) |
| 9 | 3 | | | | | `2` (điểm − 1) |
| 10 | 4 | | | | | `1` (5 − điểm) |
| | | | | | **Tổng điều chỉnh** | **24** |
| | | | | | **Điểm SUS = (2.5 × 24) − 50** | **10.0 / 100** |

> Xếp hạng Bangor: **F (Bottom 15% — Không chấp nhận được)**.

### UEQ-S (thang 1–7)

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| 1 | 5 | | | | | | |
| 2 | 5 | | | | | | |
| 3 | 5 | | | | | | |
| 4 | 4 | | | | | | |
| 5 | 4 | | | | | | |
| 6 | 5 | | | | | | |
| 7 | 5 | | | | | | |
| 8 | 4 | | | | | | |
| 9 | 4 | | | | | | |
| 10 | 6 | | | | | | |
| 11 | 5 | | | | | | |
| 12 | 5 | | | | | | |
| 13 | 5 | | | | | | |
| 14 | 5 | | | | | | |
| 15 | 5 | | | | | | |
| 16 | 4 | | | | | | |
| 17 | 4 | | | | | | |
| 18 | 4 | | | | | | |
| 19 | 5 | | | | | | |
| 20 | 2 | | | | | | |
| 21 | 5 | | | | | | |
| 22 | 2 | | | | | | |
| 23 | 2 | | | | | | |
| 24 | 2 | | | | | | |
| 25 | 2 | | | | | | |
| 26 | 5 | | | | | | |

| Chất lượng | Điểm TB của phiên này (1–7) | Tham chiếu — cách chấm chuẩn UEQ-S (1–7) |
|---|---|---|
| Attractiveness | 4.20 | 4.33 |
| Clarity | 4.60 | 4.60 |
| Efficiency | 4.00 | 4.00 |
| Reliability | 3.33 | 3.60 |
| Motivation | 4.50 | 4.67 |
| Novelty | 5.00 | 5.00 |

> **Quy ước chấm điểm của đợt test (dùng thống nhất cho mọi phiên và mọi bảng tổng hợp):**
> Attractiveness = 1, 6, 9, 11, 22 · Clarity = 2, 7, 10, 12, 20 · Efficiency = 3, 13, 14, 15, 23, 25 ·
> Reliability = 4, 5, 24 · Motivation = 16, 21 · Novelty = 26 → **22/26 mục được chấm điểm**;
> 4 mục **8, 17, 18, 19** không tính vào điểm 6 chất lượng. Cột tham chiếu bên cạnh là cách chấm
> UEQ-S chuẩn (Laugwitz et al., 2009) trong đó mục 26 cộng vào cả 3 chất lượng
> (Attractiveness / Motivation / Novelty) và các mục 17, 18 thuộc Reliability — dùng để đối chiếu.

### Thang tùy chỉnh F1–F6 (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| F1 | 4 | | | | |
| F2 | 4 | | | | |
| F3 | 4 | | | | |
| F4 | 3 | | | | |
| F5 | 4 | | | | |
| F6 | 4 | | | | |

### Đánh giá nhiệm vụ (Phần D) — theo từng task

| Câu | T4 | T1 | T2 | T3 |
|---|---|---|---|---|
| D1. Tôi đã hoàn thành được nhiệm vụ. | 5 | 5 | 3 | 5 |
| D2. Nhiệm vụ này dễ thực hiện. | 4 | 4 | 2 | 4 |
| D3. Tôi không cần hỗ trợ của người khác. | 5 | 4 | 2 | 5 |

## 7. Câu trả lời probe (nguyên văn từ `ghi-chu.md` của người tham gia — không diễn giải)

| Câu | Trích lời nói |
|---|---|
| E1 – Clarity | “Giao diện sạch, bố cục rõ, dễ tìm. Nhưng form không có nhãn cố định và trang đăng nhập còn tiếng Anh.” |
| E2 – Error recovery | “Báo lỗi đăng nhập không rõ nguyên nhân. Xóa không hỏi lại thì càng không có hướng dẫn — tôi phải tự chịu trách nhiệm.” |
| E3 – Speed | “Nhanh. Mỗi thao tác một cú bấm. Chỉ chỗ đổi tên danh mục là phải tự nghĩ cách.” |
| E4 – Trust | “Sửa một cái mà cả bảng đổi tên, giá cũng không cập nhật — đó là chỗ tôi mất niềm tin. Dashboard thì thiếu chú thích nên tôi cũng chỉ tạm tin.” |
| E5 – FR-12 | “Sai mật khẩu thì lẽ ra phải nói rõ là sai mật khẩu, chứ không phải một câu chung chung. Tài khoản thường thì rõ là không phải admin.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn, hiểu là doanh thu đơn đã giao. Nhưng thiếu chú thích nên tôi không chắc con số đó đúng.” |
| E7 – FR-14 | “Tạo/xóa thì ổn. Đổi tên thì không có chức năng — ở mấy sàn tôi dùng thì có, nên tôi thấy thiếu. Xóa không hỏi lại là thiếu chuyên nghiệp.” |
| E8 – FR-15 | “Có, tên các sản phẩm khác cũng đổi theo. Giá tôi không kiểm kỹ.” |
| E9 – FR-15 (giá) | “Tôi không để ý giá sau khi lưu. Số tiền không có dấu phân cách nghìn thì đọc hơi khó.” |
| E10 | “Không có dấu *, tôi điền tên, giá, danh mục.” |
| E11 | “Thêm danh mục không có thông báo. Sửa sản phẩm thì có ‘Cập nhật thành công!’.” |

## 8. Ghi chú khác

- Người tham gia là người **đánh giá theo chuẩn ngành** (đối chiếu với các sàn TMĐT khác) — nhận xét của họ được dùng làm tiêu chí so sánh trong phân tích H3/H5.
- Người tham gia **tự phát hiện** lỗi đổi tên hàng loạt (C1); **không** phát hiện lỗi giá (C2).
- Người tham gia nêu rõ hai vấn đề chưa được phát hiện bởi 6 người còn lại: **thiếu chú thích công thức/mốc cập nhật trên Dashboard** và **thiếu hộp thoại xác nhận khi xóa theo chuẩn làm việc thật**.
- Không mở DevTools, không tra Google.
- Người thu phiên không sửa kết quả đánh dấu của người tham gia.
