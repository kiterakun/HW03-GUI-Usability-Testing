# P03 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P03.** File này được lập từ bản ghi màn hình
> `recordings/P03.mp4`, bảng hỏi `responses.csv` → dòng `P03`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P03 |
| Họ tên | Phạm Thị Thuỷ — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-12 |
| Thời lượng | 16 phút (4 task, tổng thời gian trên task ≈ 12.7 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Chrome (desktop, 1536×864) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P03.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P03` |
| File ghi chú của người tham gia | `recordings/P03-ghi-chu.md` |

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
| Nhóm người dùng | Sinh viên kinh tế (ngoài CNTT) |
| Độ tuổi | 22 |
| Nghề nghiệp | Sinh viên ngành Kinh tế, làm freelance bán hàng online |
| Kinh nghiệm e-commerce / quản trị shop | Dùng EShop admin vài ngày; mới làm quen quản lý sản phẩm |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Chrome |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Nhanh nhẹn, dùng bảng tính hàng ngày nên nhạy với định dạng số và việc form thiếu nhãn.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 1.5 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | ✅ completed | 2.5 | ✅ completed | ✅ completed | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | ✅ completed | 3.8 | ✅ completed | ✅ completed | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 4.9 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

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
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — nhưng nhận ra rất nhanh (khoảng 1 phút 40 giây). (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có (tự phát hiện lúc 12:40). (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — nhưng nhận ra rất nhanh (khoảng 1 phút 40 giây). |
| Họ đã thử những cách gì? | Bấm vào tên danh mục → bấm đúp → quét cột “Hành động” → hiểu là không có chức năng → tạo mới rồi xóa cũ. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **1,5 phút** (06:20–08:00) — nhanh nhất trong 7 người. |
| Họ có hỏi/hét gọi người tổ chức không? | Không; ghi trong `ghi-chu.md`: “App này không có nút sửa danh mục.” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có (tự phát hiện lúc 12:40). |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Ơ sao tên các sản phẩm khác cũng đổi theo vậy?” |
| Họ có nhận ra ô nào bắt buộc không? | Không chắc — không có `*`; nhưng phát hiện nhãn placeholder biến mất khi gõ nên rất bối rối khi quay lại sửa. |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Có nhận ra giá không có dấu phân cách nghìn (vì quen dùng Excel), nhưng không chặn thao tác. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở trang Login tiếng Anh, điền ngay. | “Chắc do mới làm, chưa Việt hóa.” | 1 |
| 00:50 | T4 | Sai mật khẩu → `alert()` “Đăng nhập thất bại”. | “Sai mật khẩu. Gõ lại thôi.” | 1 |
| 01:40 | T4 | Dùng tài khoản user thường → “Bạn không phải là admin!”. | “À, cần tài khoản admin.” | 1 |
| 02:20 | T4 | Đăng nhập đúng → Dashboard. | “Vào rồi.” | 1 |
| 03:00 | T1 | Đọc Dashboard: **6,400,000 ₫** / **5** đơn; diễn giải doanh thu = đơn delivered. | “Doanh thu 6.400.000, 5 đơn. Ghi (Delivered) nên là đơn đã giao.” | 1 |
| 04:00 | T1 | Tự hỏi: có phải số bị nhân đôi không; không tìm được bảng đơn hàng để so. | “Số này tròn quá… mà không có bảng đơn hàng để đối chiếu.” | 2 |
| 05:30 | T2 | Tạo `Giày dép` → có trong bảng, không thông báo. | “Thêm xong, thấy trong bảng.” | 1 |
| 06:20 | T2 | Bấm vào tên, bấm đúp, tìm nút Sửa — không có. Người tham gia lập tức hiểu đây là giới hạn của app. | “App này không có nút sửa danh mục. Tạo mới rồi xóa cũ đi.” | 2 |
| 08:00 | T2 | Tạo `Giày dép & Dép`, xóa `Giày dép`. Lần xóa không có hộp thoại xác nhận — người tham gia không bình luận. | “Xóa xong.” | 1 |
| 10:30 | T3 | Điền form sản phẩm; nhận xét về việc nhãn chỉ là placeholder. | “Nhãn biến mất khi mình gõ, nhìn lại không biết ô nào là ô nào.” | 2 |
| 12:00 | T3 | Sửa `Tai nghe AirPods Pro 2` → tên + giá `5990000` → “Lưu sản phẩm” → `alert()` “Cập nhật thành công!”. | “Cập nhật thành công!” | 1 |
| 12:40 | T3 | Nhìn lại bảng: cả 5 dòng cùng tên mới; giá vẫn `6000000 ₫`. Người tham gia **nhận ra** cả tên bị đổi hàng loạt và **không** để ý giá. | “Ơ sao tên các sản phẩm khác cũng đổi theo vậy?” | 3 |
| 13:30 | T3 | Điền bảng hỏi + probe. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có chức năng Sửa danh mục — người tham gia nhận ra khá nhanh và tự chọn workaround. | “App này không có nút sửa danh mục. Tạo mới rồi xóa cũ đi.” | 2 | 2 | 06:20–08:00 | T2 |
| F2 | Xóa không có hộp thoại xác nhận — người tham gia không nhận ra vì chỉ xóa dữ liệu vừa tạo. | “Xóa xong.” | 1 | 1 | 08:00 | T2 |
| F3 | Sửa một sản phẩm làm đổi tên toàn bộ 5 dòng. | “Ơ sao tên các sản phẩm khác cũng đổi theo vậy?” | 1 | 1 | 12:40 | T3 |
| F4 | Giá mới không hiển thị sau khi lưu. | “Giá… à, tôi không nhìn kỹ.” | 1 | 1 | 12:45 | T3 |
| F5 | Form sản phẩm không có `<label>`; nhãn là placeholder và biến mất khi nhập. | “Nhãn biến mất khi mình gõ, nhìn lại không biết ô nào là ô nào.” | 1 | 1 | 10:30 | T3 |
| F6 | Thông báo đăng nhập sai dùng `alert()` chung chung. | “Sai mật khẩu. Gõ lại thôi.” | 1 | 1 | 00:50 | T4 |
| F7 | Không có thông báo xác nhận khi thêm danh mục; phải tự nhìn bảng. | “Thêm xong, thấy trong bảng.” | 1 | 1 | 05:30 | T2 |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 06:20–08:00 | Tự nhận ra giới hạn chức năng và tự chọn workaround tạo mới/xóa cũ. | UI không có nút Sửa. | Không — kết quả vẫn ghi `completed` vì đạt cả hai tiêu chí TCR (tạo + xóa) mà không cần gợi ý của người tổ chức. |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P03` trong `responses.csv`.

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
| 9 | 2 | | | | | `1` (điểm − 1) |
| 10 | 4 | | | | | `1` (5 − điểm) |
| | | | | | **Tổng điều chỉnh** | **23** |
| | | | | | **Điểm SUS = (2.5 × 23) − 50** | **7.5 / 100** |

> Xếp hạng Bangor: **F (Bottom 15% — Không chấp nhận được)**.

### UEQ-S (thang 1–7)

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| 1 | 5 | | | | | | |
| 2 | 5 | | | | | | |
| 3 | 6 | | | | | | |
| 4 | 4 | | | | | | |
| 5 | 4 | | | | | | |
| 6 | 5 | | | | | | |
| 7 | 5 | | | | | | |
| 8 | 4 | | | | | | |
| 9 | 5 | | | | | | |
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
| Attractiveness | 4.40 | 4.50 |
| Clarity | 4.60 | 4.60 |
| Efficiency | 4.17 | 4.17 |
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
| F4 | 4 | | | | |
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
| E1 – Clarity | “Cấu trúc dễ hiểu: menu bên trái, bảng ở giữa. Nhưng form thì thiếu nhãn, gõ xong không biết đang ở ô nào.” |
| E2 – Error recovery | “Sai mật khẩu thì tôi biết là sai mật khẩu. Nhưng lúc xóa không có hộp thoại nào hỏi lại, nên tôi cũng không biết có khôi phục được không.” |
| E3 – Speed | “Nhanh. Thao tác đơn giản, tôi quen làm trên Shopee.” |
| E4 – Trust | “Sau khi sửa mà tên mấy sản phẩm khác cũng đổi thì tôi không tin lắm. Doanh thu thì tôi cũng không đối chiếu được vì không có bảng đơn hàng.” |
| E5 – FR-12 | “Sai mật khẩu thì hiểu rồi, tài khoản thường thì hiểu là không phải admin.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn, và hiểu doanh thu là đơn đã giao. Nhưng số này có đúng không thì tôi không kiểm được.” |
| E7 – FR-14 | “Tạo/xóa thì ổn. Đổi tên thì không có chức năng, tôi tạo mới rồi xóa cũ.” |
| E8 – FR-15 | “Có, tên các sản phẩm khác bị đổi tên theo. Giá thì tôi không để ý.” |
| E9 – FR-15 (giá) | “Giá hiển thị kiểu 450000, không có dấu phân cách nghìn. Tôi biết là lỗi hiển thị của app.” |
| E10 | “Không có dấu *, tôi đoán tên và giá là bắt buộc.” |
| E11 | “Thêm thì không báo gì, xem bảng là biết. Sửa thì có báo thành công.” |

## 8. Ghi chú khác

- Phiên có TCR cao nhất ở T2 (`completed`, không cần trợ giúp) — người tham gia nhận ra khoảng trống chức năng nhanh và biết workaround.
- Người tham gia **tự phát hiện** lỗi đổi tên hàng loạt (C1); **không** phát hiện lỗi giá (C2).
- Người tham gia nói rõ vấn đề nhãn placeholder biến mất — nhận xét này được dùng để bổ sung cho BUG-001 và phát hiện U-05.
- Không mở DevTools, không tra Google.
- Người thu phiên không sửa kết quả đánh dấu của người tham gia.
