# P05 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P05.** File này được lập từ bản ghi màn hình
> `recordings/P05.mp4`, bảng hỏi `responses.csv` → dòng `P05`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P05 |
| Họ tên | Nguyễn Quang Tạo — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-13 |
| Thời lượng | 18 phút (4 task, tổng thời gian trên task ≈ 13.2 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Edge (desktop, 1920×1080) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P05.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P05` |
| File ghi chú của người tham gia | `recordings/P05-ghi-chu.md` |

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
| Nhóm người dùng | Kế toán bán hàng |
| Độ tuổi | 29 |
| Nghề nghiệp | Kế toán bán hàng tại công ty thương mại điện tử |
| Kinh nghiệm e-commerce / quản trị shop | Đã dùng EShop admin 1 tuần; rất quen với bảng số và đối chiếu chéo |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Edge |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Cẩn thận, có tư duy đối chiếu số liệu — là người duy nhất chủ động kiểm tra công thức của Dashboard.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 1.6 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | ✅ completed | 2.6 | ✅ completed | ✅ completed | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | 🟡 completed_with_help | 4.2 | 🟡 completed_with_help | 🟡 completed_with_help | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 4.8 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

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
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — nhận ra sau khoảng 1 phút 40 giây. (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có — và nhận ra **cả** lỗi giá (C1 ✔, C2 ✔), là người duy nhất trong 7 phiên làm được cả hai. (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — nhận ra sau khoảng 1 phút 40 giây. |
| Họ đã thử những cách gì? | Bấm vào tên danh mục → bấm đúp → quét cột “Hành động” → kết luận app không cho sửa → tạo mới rồi xóa cũ. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **1,5 phút** (06:20–08:00). |
| Họ có hỏi/hét gọi người tổ chức không? | Không; ghi trong `ghi-chu.md`: “Không có nút sửa danh mục, tạo mới rồi xóa cũ.” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có — và nhận ra **cả** lỗi giá (C1 ✔, C2 ✔), là người duy nhất trong 7 phiên làm được cả hai. |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Tên cả 5 dòng đều đổi theo — đây là lỗi. Và giá vẫn 6.000.000 chứ không phải 5.990.000 — lỗi nữa.” |
| Họ có nhận ra ô nào bắt buộc không? | Không — không có `*`; đoán theo kinh nghiệm. |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Có — nói rõ “450000” không có dấu phân cách nghìn, khó đối chiếu khi làm kế toán. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở trang Login tiếng Anh, điền thẳng. | “Giao diện chưa Việt hóa, không sao.” | 1 |
| 00:45 | T4 | Sai mật khẩu → `alert()` “Đăng nhập thất bại”. | “Sai mật khẩu rồi.” | 1 |
| 01:30 | T4 | Tài khoản user thường → “Bạn không phải là admin!”. | “Đúng là không có quyền admin.” | 1 |
| 02:10 | T4 | Đăng nhập đúng → Dashboard. | “Vào rồi.” | 1 |
| 02:50 | T1 | Đọc Dashboard: **6,400,000 ₫** / **5** đơn; diễn giải doanh thu = tổng `total_amount` của đơn delivered. | “Doanh thu 6.400.000, 5 đơn. Ghi rõ Delivered.” | 1 |
| 03:40 | T1 | Tự tính nhẩm: 5 đơn seed có tổng tiền 3.200.000 ₫ ở trạng thái delivered → nhận ra con số 6.400.000 là **gấp đôi**. | “6.400.000… mà 5 đơn seed gốc cộng lại tôi nhớ là 3.200.000. Chắc bị nhân đôi rồi. Tôi không có bảng đơn hàng để chắc chắn.” | 3 |
| 05:30 | T2 | Tạo `Giày dép` → có trong bảng, không có thông báo. | “Thêm xong.” | 1 |
| 06:20 | T2 | Tìm nút Sửa — bấm vào tên, bấm đúp, quét bảng. Người tham gia nhận ra ngay và đề xuất workaround. | “Không có nút sửa. Tạo mới rồi xóa cũ là xong.” | 2 |
| 08:00 | T2 | Tạo `Giày dép & Dép` rồi xóa `Giày dép`. Lần xóa không có hộp thoại — người tham gia ghi nhận là rủi ro nhưng vẫn bấm. | “Xóa không hỏi lại. Rủi ro thật, nhưng ở đây là dữ liệu tôi vừa tạo.” | 2 |
| 11:00 | T3 | Điền form sản phẩm; nhận xét thiếu nhãn và thiếu ký hiệu bắt buộc. | “Không có dấu *, cũng không có nhãn cố định. Ô nào là bắt buộc thì phải đoán.” | 2 |
| 13:00 | T3 | Sửa `Tai nghe AirPods Pro 2` → tên + giá `5990000` → “Lưu sản phẩm” → `alert()` “Cập nhật thành công!”. | “Cập nhật thành công!” | 1 |
| 13:50 | T3 | Kiểm tra bảng: cả 5 dòng cùng tên mới; giá dòng sửa **vẫn** `6000000 ₫`. Người tham gia **nhận ra cả hai lỗi**. | “Tên cả 5 dòng đều đổi theo — đây là lỗi. Và giá vẫn 6.000.000 chứ không phải 5.990.000 — lỗi nữa.” | 3 |
| 15:00 | T3 | Điền bảng hỏi + probe. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có chức năng Sửa danh mục; người tham gia nhận ra nhanh và đề xuất workaround. | “Không có nút sửa. Tạo mới rồi xóa cũ là xong.” | 2 | 2 | 06:20–08:00 | T2 |
| F2 | Xóa không có hộp thoại xác nhận. | “Xóa không hỏi lại. Rủi ro thật, nhưng ở đây là dữ liệu tôi vừa tạo.” | 1 | 1 | 08:00 | T2 |
| F3 | Sửa một sản phẩm làm đổi tên toàn bộ 5 dòng. | “Tên cả 5 dòng đều đổi theo — đây là lỗi.” | 1 | 1 | 13:50 | T3 |
| F4 | Giá mới `5990000` không hiển thị (vẫn `6000000 ₫`). | “Giá vẫn 6.000.000 chứ không phải 5.990.000 — lỗi nữa.” | 1 | 1 | 13:50 | T3 |
| F5 | Form sản phẩm thiếu `<label>` và ký hiệu `*`. | “Không có dấu *, cũng không có nhãn cố định. Ô nào là bắt buộc thì phải đoán.” | 1 | 1 | 11:00 | T3 |
| F6 | `alert()` thô khi đăng nhập sai. | “Sai mật khẩu rồi.” | 1 | 1 | 00:45 | T4 |
| F7 | Con số doanh thu trên Dashboard bị nhân đôi — người tham gia tự nhận ra bằng tính nhẩm. | “6.400.000… chắc bị nhân đôi rồi. Tôi không có bảng đơn hàng để chắc chắn.” | 1 | 1 | 03:40 | T1 |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 06:20–08:00 | Tự nhận ra giới hạn, tự dùng workaround tạo mới/xóa cũ. | UI không có nút Sửa. | Không — nhưng ghi `completed_with_help` vì phải dùng workaround để đạt tiêu chí. |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P05` trong `responses.csv`.

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
| 8 | 3 | | | | | `2` (5 − điểm) |
| 9 | 3 | | | | | `2` (điểm − 1) |
| 10 | 4 | | | | | `1` (5 − điểm) |
| | | | | | **Tổng điều chỉnh** | **25** |
| | | | | | **Điểm SUS = (2.5 × 25) − 50** | **12.5 / 100** |

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
| E1 – Clarity | “Bố cục rõ ràng, dễ tìm. Nhưng form không có nhãn cố định nên khi sửa lại phải nhìn placeholder mới biết ô nào là ô nào.” |
| E2 – Error recovery | “Thông báo sai mật khẩu không cho biết phải làm gì. Xóa không hỏi lại là thiếu chuyên nghiệp — nhưng ở đây tôi tự biết mình vừa tạo cái gì.” |
| E3 – Speed | “Nhanh. Tôi làm kế toán nên quen bảng và công thức, thao tác không có gì chậm — trừ chỗ tìm nút sửa.” |
| E4 – Trust | “Tôi không tin con số 6.400.000 vì tôi nhớ tổng đơn delivered gốc chỉ 3.200.000. Và lúc sửa sản phẩm thì cả bảng bị đổi tên, giá cũng không cập nhật — hai lỗi đó làm mất uy tín nghiêm trọng.” |
| E5 – FR-12 | “Sai mật khẩu thì biết ngay. Tài khoản thường bị từ chối thì hiểu là không phải admin. Không có hướng dẫn cụ thể.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn. Tôi hiểu là doanh thu đơn delivered, nhưng tôi nghi là số này bị nhân đôi.” |
| E7 – FR-14 | “Tạo/xóa thì ổn. Đổi tên thì không có chức năng. Xóa không hỏi lại là điểm rủi ro.” |
| E8 – FR-15 | “Có. Tên mọi dòng đều bị đổi theo, và giá cũng không cập nhật. Hai lỗi rõ ràng.” |
| E9 – FR-15 (giá) | “Giá mới không hiện. Còn định dạng thì 450000 không có dấu phân cách nghìn, khi đối chiếu số tiền hơi bất tiện.” |
| E10 | “Không có dấu *. Tôi điền tên, giá, danh mục; mô tả thì để trống.” |
| E11 | “Thêm danh mục không có thông báo, phải nhìn bảng. Sửa thì có ‘Cập nhật thành công!’.” |

## 8. Ghi chú khác

- Người tham gia là **người duy nhất trong 7 phiên phát hiện cả hai lỗi hiển thị** (đổi tên hàng loạt C1 và giá không cập nhật C2) — nhờ tư duy đối chiếu số liệu của ngành kế toán.
- Người tham gia cũng là người duy nhất **nghi ngờ con số doanh thu bị nhân đôi** (tự tính nhẩm từ dữ liệu seed) — đây là dữ liệu định tính độc lập xác nhận lỗi FR-13 (U-07) mà không cần dry-run kỹ thuật.
- Phiên có thời gian ngắn nhất trong nhóm Chrome/Edge (khoảng 18 phút) nhờ thao tác nhanh và tư duy số liệu.
- Không mở DevTools, không tra Google.
- Người thu phiên không sửa kết quả đánh dấu của người tham gia.
