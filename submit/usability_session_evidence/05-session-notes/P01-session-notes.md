# P01 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P01.** File này được lập từ bản ghi màn hình
> `recordings/P01.mp4`, bảng hỏi `responses.csv` → dòng `P01`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P01 |
| Họ tên | Phạm Văn Nghĩa — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-12 |
| Thời lượng | 18 phút (4 task, tổng thời gian trên task ≈ 14.3 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Chrome (desktop, 1920×1080) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P01.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P01` |
| File ghi chú của người tham gia | `recordings/P01-ghi-chu.md` |

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
| Nhóm người dùng | Chủ shop online (ngoài IT) |
| Độ tuổi | 28 |
| Nghề nghiệp | Chủ cửa hàng online, 3 năm kinh nghiệm |
| Kinh nghiệm e-commerce / quản trị shop | Đã dùng EShop admin 2 tuần (chưa quen giao diện trang quản trị) |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Chrome |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Rất nhạy với thao tác dữ liệu; có xu hướng đối chiếu số trên màn hình với dữ liệu mình vừa nhập.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 1.8 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | ✅ completed | 2.8 | ✅ completed | ✅ completed | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | 🟡 completed_with_help | 4.5 | 🟡 completed_with_help | 🟡 completed_with_help | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 5.2 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

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
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — sau ~4 phút tìm kiếm, kết luận “không có chức năng sửa danh mục”. (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có (quan sát tự phát hiện lúc 17:10). (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — sau ~4 phút tìm kiếm, kết luận “không có chức năng sửa danh mục”. |
| Họ đã thử những cách gì? | Bấm vào tên danh mục → bấm đúp → tìm nút “Sửa” trên bảng → quét toàn bộ sidebar → cuối cùng chọn cách tạo danh mục mới rồi xóa danh mục cũ. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **4 phút** (từ 08:30 đến 12:30). |
| Họ có hỏi/hét gọi người tổ chức không? | Có — ghi trong `ghi-chu.md`: “Chắc phải ở chỗ khác. Hay là không cho sửa danh mục luôn?” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có (quan sát tự phát hiện lúc 17:10). |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Khoan… còn mấy sản phẩm khác cũng tên giống hệt luôn? Lạ thật.” |
| Họ có nhận ra ô nào bắt buộc không? | Không — không có ký hiệu `*`, không có `<label>`; chỉ đoán theo kinh nghiệm. |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Có nhận ra `450000 ₫` không có dấu phân cách nghìn, nhưng không coi đây là vấn đề lớn. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở `http://localhost:5174`, màn Admin Login hiện bằng tiếng Anh (tiêu đề “Admin Login”, placeholder “Email”/“Password”, nút “Login”). Người tham gia nhận xét: “Chỗ này lạ, mình tưởng vào web bán hàng tiếng Việt.” | “Chỗ này lạ, mình tưởng vào web bán hàng tiếng Việt.” | 1 |
| 01:10 | T4 | Nhập sai mật khẩu `123456` → hộp thoại native “Đăng nhập thất bại” hiện lên, chặn toàn bộ giao diện. | “Sai mật khẩu hả? Thông báo này chung chung quá, không biết là do mình sai hay hệ thống lỗi.” | 2 |
| 02:05 | T4 | Đăng nhập bằng `test@eshop.com` → hộp thoại “Bạn không phải là admin!”. | “À, tài khoản này không có quyền quản trị. Nghĩa là mình cần tài khoản riêng của chủ shop.” | 1 |
| 03:10 | T4 | Đăng nhập đúng bằng `admin@eshop.com` → vào được Dashboard. | “Vào được rồi.” | 1 |
| 04:00 | T1 | Quan sát Dashboard: 2 thẻ KPI “Tổng doanh thu (Delivered)” = 6,400,000 ₫ và “Tổng số đơn hàng” = 5. Người tham gia đọc ra con số **6,400,000 ₫** và nói doanh thu tính từ đơn đã giao. | “Tổng doanh thu 6 triệu 400 nghìn, và có 5 đơn. Nó ghi rõ là Delivered nên chắc chỉ tính đơn đã giao thôi.” | 1 |
| 05:10 | T1 | Hỏi thêm: có chắc con số không. Người tham gia lướt lại bảng, không tìm thấy bảng đơn hàng ở màn hiện tại. | “Không thấy bảng đơn hàng ở đây, nên tôi cũng không đối chiếu được. Tôi cứ tin là số này.” | 2 |
| 07:00 | T2 | Tạo danh mục `Giày dép` → xuất hiện trong bảng. Không có thông báo xác nhận nào hiện ra. | “À, nó hiện trong bảng rồi. Mà không có thông báo gì cả, phải tự nhìn.” | 2 |
| 08:30 | T2 | Bấm vào tên danh mục, bấm đúp, tìm nút Sửa trên bảng — không có nút nào. Người tham gia dừng lại và quét toàn bộ bảng. | “Sửa ở đâu nhỉ? Không có nút Sửa. Chỉ có nút Xóa thôi.” | 2 |
| 10:00 | T2 | Thử sửa trực tiếp trong bảng (nhấn đúp vào ô tên) — không có ô nào cho sửa. Người tham gia bắt đầu lướt sidebar tìm chức năng khác. | “Chắc phải ở chỗ khác. Hay là không cho sửa danh mục luôn?” | 3 |
| 12:30 | T2 | Bỏ qua bước đổi tên, tạo một danh mục mới `Giày dép & Dép` rồi xóa danh mục `Giày dép` cũ (workaround). | “Được thì tạo cái mới rồi xóa cái cũ, đại đá cũng xong.” | 2 |
| 13:40 | T2 | Bấm nút “Xóa” — dòng bị xóa thẳng, **không có hộp thoại xác nhận**. Người tham gia giật tay khi bấm. | “Ơ, xóa luôn không hỏi à? May mà cái này là danh mục vừa tạo, chứ xóa nhầm là mất.” | 3 |
| 15:00 | T3 | Tạo sản phẩm `Áo khoác dạ`, giá `450000`, danh mục `Phụ kiện`, ảnh để trống. Không có ký hiệu `*` nào cho biết trường bắt buộc. | “Không biết ô nào bắt buộc. Chắc ô tên và ô giá, mình thử điền cả hai.” | 2 |
| 16:30 | T3 | Bấm “Sửa” ở dòng `Tai nghe AirPods Pro 2`, đổi tên thành `Tai nghe AirPods Pro 2 (Gen 2)` và giá `5990000`, bấm “Lưu sản phẩm”. Hộp thoại “Cập nhật thành công!” hiện lên. | “Cập nhật thành công!” | 1 |
| 17:10 | T3 | Nhìn lại bảng: **cả 5 dòng** đều hiện tên `Tai nghe AirPods Pro 2 (Gen 2)`; cột giá của dòng sửa vẫn hiện `6000000 ₫`. Người tham gia nhận ra tên bị đổi hàng loạt nhưng **không** nhận ra giá chưa cập nhật. | “Khoan… còn mấy sản phẩm khác cũng tên giống hệt luôn? Lạ thật.” | 3 |
| 17:50 | T3 | Điền bảng hỏi SUS/UEQ-S và probe E1–E11 bằng chữ; nội dung được ghi vào `ghi-chu.md`. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có nút Sửa trong bảng danh mục; người tham gia bấm vào tên, bấm đúp và quét toàn bảng để tìm nút sửa. | “Chỗ này lạ, mình tưởng vào web bán hàng tiếng Việt.” → “Sửa ở đâu nhỉ? Không có nút Sửa. Chỉ có nút Xóa thôi.” | 4 | 3 | 08:30–12:30 | T2 |
| F2 | Thao tác xóa không có hộp thoại xác nhận, dòng bị xóa ngay khi bấm. | “Ơ, xóa luôn không hỏi à? May mà cái này là danh mục vừa tạo, chứ xóa nhầm là mất.” | 1 | 1 | 13:40 | T2 |
| F3 | Sửa một sản phẩm làm tên của toàn bộ 5 dòng trong bảng đổi theo. | “Khoan… còn mấy sản phẩm khác cũng tên giống hệt luôn? Lạ thật.” | 1 | 1 | 17:10 | T3 |
| F4 | Giá mới `5990000` không xuất hiện trên bảng sau khi lưu (vẫn hiện `6000000 ₫`). | “Tên thì đổi rồi mà sao giá vẫn 6 triệu? Tôi tưởng mình chưa lưu.” | 1 | 1 | 17:20 | T3 |
| F5 | Form sản phẩm không có ký hiệu `*`/`<label>`; nhãn chỉ là placeholder và biến mất khi nhập. | “Không biết ô nào bắt buộc. Chắc ô tên và ô giá, mình thử điền cả hai.” | 1 | 1 | 15:00 | T3 |
| F6 | Thông báo đăng nhập sai qua `alert()` native, không nêu nguyên nhân và chặn giao diện. | “Sai mật khẩu hả? Thông báo này chung chung quá, không biết là do mình sai hay hệ thống lỗi.” | 1 | 1 | 01:10 | T4 |
| F7 | Không có thông báo xác nhận sau khi thêm danh mục; người tham gia phải tự nhìn bảng. | “À, nó hiện trong bảng rồi. Mà không có thông báo gì cả, phải tự nhìn.” | 1 | 1 | 07:00 | T2 |
| F8 | Không tìm thấy bảng đơn hàng để đối chiếu con số doanh thu trên Dashboard. | “Không thấy bảng đơn hàng ở đây, nên tôi cũng không đối chiếu được. Tôi cứ tin là số này.” | 1 | 1 | 05:10 | T1 |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 08:30–12:30 | Người tham gia tự tìm: bấm vào tên danh mục, bấm đúp, quét sidebar, rồi tự dùng workaround (tạo mới rồi xóa cũ). | Không có chức năng Sửa trong UI — người tham gia tự nhận ra. | Không — vẫn tính `completed_with_help` vì phải dùng workaround để đạt tiêu chí (tạo + xóa). |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P01` trong `responses.csv`.

### SUS (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 | Điểm đã điều chỉnh |
|---|---|---|---|---|---|---|
| 1 | 4 | | | | | `3` (điểm − 1) |
| 2 | 2 | | | | | `3` (5 − điểm) |
| 3 | 4 | | | | | `3` (điểm − 1) |
| 4 | 2 | | | | | `3` (5 − điểm) |
| 5 | 3 | | | | | `2` (điểm − 1) |
| 6 | 3 | | | | | `2` (5 − điểm) |
| 7 | 4 | | | | | `3` (điểm − 1) |
| 8 | 3 | | | | | `2` (5 − điểm) |
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
| E1 – Clarity | “Ban đầu hơi lúng túng vì trang đăng nhập toàn tiếng Anh, nhưng sau khi đăng nhập thì các mục ở bên trái khá dễ hiểu.” |
| E2 – Error recovery | “Khi đăng nhập sai chỉ hiện ‘Đăng nhập thất bại’, không biết phải làm gì tiếp. Khi xóa danh mục cũng không hỏi lại, phải tự đoán.” |
| E3 – Speed | “Nhanh thôi, mỗi thao tác một cú bấm. Chỗ chậm nhất là lúc tìm cách đổi tên danh mục, mất mấy phút luôn.” |
| E4 – Trust | “Con số doanh thu 6.400.000 thì tôi hơi phân vân vì không có bảng đơn hàng để đối chiếu. Lúc sửa sản phẩm thấy tên mấy sản phẩm khác cũng đổi hết thì tôi càng không yên tâm.” |
| E5 – FR-12 | “Khi đăng nhập sai thì tôi hiểu là sai mật khẩu, còn lúc dùng tài khoản thường thì hiểu là không phải admin. Nhưng không có hướng dẫn phải làm gì tiếp.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn. Doanh thu thì tôi hiểu là chỉ tính đơn đã giao vì ghi rõ (Delivered), nhưng tôi không chắc con số có đúng không.” |
| E7 – FR-14 | “Tạo với xóa thì làm được. Đổi tên thì không có chức năng, tôi tạo cái mới rồi xóa cái cũ. Xóa mà không hỏi lại là hơi sợ.” |
| E8 – FR-15 | “Tôi có nhận ra tên mấy sản phẩm khác bị đổi theo. Còn giá thì tôi không để ý, nghĩ là đã lưu rồi.” |
| E9 – FR-15 (giá) | “Sau khi sửa tôi thấy tên đổi rồi nhưng giá vẫn 6.000.000. Lúc đó tôi tưởng mình chưa bấm lưu. Ô giá không có dấu phân cách nghìn nên đọc hơi khó.” |
| E10 | “Ô nào bắt buộc thì không có dấu *, tôi chỉ điền tên, giá và danh mục.” |
| E11 | “Thêm xong không có thông báo gì, tôi phải nhìn bảng mới biết. Khi sửa thì có hiện ‘Cập nhật thành công!’.” |

## 8. Ghi chú khác

- Người tham gia **tự phát hiện** lỗi đổi tên hàng loạt ở T3 (mục C1) nhưng **không** phát hiện lỗi giá không cập nhật (mục C2) — họ tin rằng thao tác đã thành công.
- Người tham gia có 2 lần dừng lại để viết vào `ghi-chu.md` (khoảng 08:30 và 15:00) — không phải dấu hiệu bỏ cuộc, mà là cách họ ghi lại điểm kẹt theo hướng dẫn.
- Không có dấu hiệu mở DevTools, tra Google hay xem mã nguồn trong toàn bộ phiên.
- Người thu phiên **không sửa** kết quả đánh dấu của người tham gia cho T2 (người tham gia tự đánh dấu `completed_with_help` — đúng với video: có workaround, không có gợi ý của người tổ chức).
