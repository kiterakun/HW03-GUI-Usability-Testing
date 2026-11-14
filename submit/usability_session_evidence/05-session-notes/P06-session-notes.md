# P06 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P06.** File này được lập từ bản ghi màn hình
> `recordings/P06.mp4`, bảng hỏi `responses.csv` → dòng `P06`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P06 |
| Họ tên | Ngô Thị Kim Liên — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-13 |
| Thời lượng | 26 phút (4 task, tổng thời gian trên task ≈ 19.8 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Chrome (desktop, 1366×768) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P06.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P06` |
| File ghi chú của người tham gia | `recordings/P06-ghi-chu.md` |

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
| Nhóm người dùng | Nhân viên marketing |
| Độ tuổi | 25 |
| Nghề nghiệp | Nhân viên marketing bán hàng qua mạng xã hội |
| Kinh nghiệm e-commerce / quản trị shop | Dùng EShop admin vài ngày; chủ yếu quen các nền tảng marketplace |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Chrome |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Không quen giao diện quản trị; đi theo trực giác và dễ bỏ cuộc khi gặp vướng.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 2.5 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | 🟡 completed_with_help | 4.1 | 🟡 completed_with_help | 🟡 completed_with_help | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | 🔴 abandoned | 6.0 | 🔴 abandoned | 🔴 abandoned | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 7.2 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

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
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — kết luận “không cho sửa danh mục” nhưng **không hoàn tất được** bước đổi tên. (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có (tự phát hiện lúc 22:30). (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — kết luận “không cho sửa danh mục” nhưng **không hoàn tất được** bước đổi tên. |
| Họ đã thử những cách gì? | Bấm vào tên → bấm đúp → quét cột “Hành động” → mở menu chuột phải → Ctrl+− thu nhỏ → dừng lại ghi chú → bỏ qua bước đổi tên. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **5 phút** (11:00–16:00) — lâu nhất trong 7 phiên. |
| Họ có hỏi/hét gọi người tổ chức không? | Không hỏi trực tiếp; ghi trong `ghi-chu.md`: “em dừng ở bước đổi tên, không tìm được cách.” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có (tự phát hiện lúc 22:30). |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Sao tất cả cùng tên vậy? Tôi chỉ sửa một cái mà…” |
| Họ có nhận ra ô nào bắt buộc không? | Không — dừng lâu ở ô “Giá tiền” vì không có `*`. |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Không để ý. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở trang Login tiếng Anh; dừng lại đọc khá lâu. | “Trang này tiếng Anh hết… Email, Password là gì nhỉ? À hiểu rồi.” | 2 |
| 02:00 | T4 | Sai mật khẩu → `alert()` “Đăng nhập thất bại”; người tham gia đóng hộp thoại và thử lại. | “Sai rồi à. Gõ lại.” | 2 |
| 03:30 | T4 | Đăng nhập bằng tài khoản user thường → “Bạn không phải là admin!”. | “Khoan, tài khoản này không vào được. Chắc phải là tài khoản chủ shop.” | 2 |
| 04:40 | T4 | Đăng nhập đúng → Dashboard. | “Vào được.” | 1 |
| 05:30 | T1 | Đọc Dashboard: **6,400,000 ₫** / **5** đơn; không diễn giải được “delivered” một cách chắc chắn, phải hỏi người tổ chức mới hiểu. | “Doanh thu 6.400.000 với 5 đơn… chắc là tổng tiền các đơn đã giao? Tôi không rõ ‘Delivered’ nghĩa là gì.” | 3 |
| 08:00 | T1 | Người tham gia **cần trợ giúp** để xác nhận ý nghĩa của nhãn “Delivered” (ghi trong `ghi-chu.md`: “em chưa chắc ‘Delivered’ gồm những đơn nào”). | — | 3 |
| 10:00 | T2 | Tạo `Giày dép` → có trong bảng, không có thông báo. | “Thêm xong rồi.” | 1 |
| 11:00 | T2 | Tìm nút Sửa: bấm vào tên, bấm đúp, quét cột Hành động, mở menu phải chuột, Ctrl+− — không có. | “Sửa ở đâu vậy? Không thấy nút nào hết.” | 3 |
| 14:00 | T2 | Tiếp tục tìm kiếm, dừng lại lâu ở bước đổi tên. | “Hay là ứng dụng này không cho sửa danh mục?” | 3 |
| 16:00 | T2 | Người tham gia **dừng task T2** (không tạo được danh mục `Giày dép & Dép` theo kịch bản) và ghi rõ điểm dừng trong `ghi-chu.md`. | “Em dừng ở bước đổi tên, không tìm được cách.” | 3 |
| 17:00 | T2 | Chuyển sang bước xóa danh mục vừa tạo để hoàn tất phần có thể; lần xóa không có hộp thoại xác nhận. | “Xóa không hỏi gì hết. Hơi rợn.” | 2 |
| 19:00 | T3 | Điền form sản phẩm; dừng lâu ở ô “Giá tiền”. | “Ô giá này bắt buộc đúng không? Không thấy dấu *.” | 3 |
| 21:30 | T3 | Sửa `Tai nghe AirPods Pro 2` → tên + giá `5990000` → “Lưu sản phẩm” → `alert()` “Cập nhật thành công!”. | “Cập nhật thành công!” | 1 |
| 22:30 | T3 | Nhìn lại bảng: cả 5 dòng cùng tên mới; giá vẫn `6000000 ₫`. Nhận ra tên bị đổi hàng loạt, **không** nhận ra giá sai. | “Sao tất cả cùng tên vậy? Tôi chỉ sửa một cái mà…” | 3 |
| 24:00 | T3 | Điền bảng hỏi + probe. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có chức năng Sửa danh mục — người tham gia tìm lâu nhất và **dừng task**. | “Sửa ở đâu vậy? Không thấy nút nào hết.” → “Hay là ứng dụng này không cho sửa danh mục?” | 6 | 3 | 11:00–16:00 | T2 |
| F2 | Xóa không có hộp thoại xác nhận. | “Xóa không hỏi gì hết. Hơi rợn.” | 1 | 2 | 17:00 | T2 |
| F3 | Sửa một sản phẩm làm đổi tên toàn bộ bảng. | “Sao tất cả cùng tên vậy? Tôi chỉ sửa một cái mà…” | 1 | 3 | 22:30 | T3 |
| F4 | Giá mới không hiển thị sau khi lưu. | “Giá… tôi không để ý, thấy báo thành công là tôi tin.” | 1 | 1 | 22:40 | T3 |
| F5 | Form sản phẩm thiếu nhãn và ký hiệu `*`; người tham gia dừng lâu ở ô giá. | “Ô giá này bắt buộc đúng không? Không thấy dấu *.” | 1 | 2 | 19:00 | T3 |
| F6 | `alert()` thô khi đăng nhập sai; người tham gia không biết nguyên nhân. | “Sai rồi à. Gõ lại.” | 1 | 2 | 02:00 | T4 |
| F7 | Không hiểu nhãn “Delivered” → cần trợ giúp để hoàn thành T1. | “em chưa chắc ‘Delivered’ gồm những đơn nào” | 1 | 3 | 05:30–08:00 | T1 |
| F8 | Trang đăng nhập hoàn toàn tiếng Anh gây khó khăn ban đầu. | “Trang này tiếng Anh hết… Email, Password là gì nhỉ? À hiểu rồi.” | 1 | 2 | 00:00 | — |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 05:30–08:00 | Người tham gia ghi câu hỏi vào `ghi-chu.md` và **dừng chờ** để được giải đáp nghĩa của nhãn “Delivered”. | Không rõ “Delivered” bao gồm đơn nào (không có chú thích trên UI). | Có — kết quả T1 ghi `completed_with_help`. |
| 16:00 | Người tham gia **dừng task T2** tại bước đổi tên. | UI không có chức năng Sửa danh mục. | Có — T2 ghi `abandoned`. |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P06` trong `responses.csv`.

### SUS (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 | Điểm đã điều chỉnh |
|---|---|---|---|---|---|---|
| 1 | 3 | | | | | `2` (điểm − 1) |
| 2 | 4 | | | | | `1` (5 − điểm) |
| 3 | 3 | | | | | `2` (điểm − 1) |
| 4 | 3 | | | | | `2` (5 − điểm) |
| 5 | 3 | | | | | `2` (điểm − 1) |
| 6 | 4 | | | | | `1` (5 − điểm) |
| 7 | 3 | | | | | `2` (điểm − 1) |
| 8 | 2 | | | | | `3` (5 − điểm) |
| 9 | 4 | | | | | `3` (điểm − 1) |
| 10 | 3 | | | | | `2` (5 − điểm) |
| | | | | | **Tổng điều chỉnh** | **20** |
| | | | | | **Điểm SUS = (2.5 × 20) − 50** | **0.0 / 100** |

> Xếp hạng Bangor: **F (Bottom 15% — Không chấp nhận được)**.

### UEQ-S (thang 1–7)

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| 1 | 4 | | | | | | |
| 2 | 3 | | | | | | |
| 3 | 4 | | | | | | |
| 4 | 3 | | | | | | |
| 5 | 3 | | | | | | |
| 6 | 4 | | | | | | |
| 7 | 4 | | | | | | |
| 8 | 3 | | | | | | |
| 9 | 3 | | | | | | |
| 10 | 4 | | | | | | |
| 11 | 4 | | | | | | |
| 12 | 3 | | | | | | |
| 13 | 4 | | | | | | |
| 14 | 4 | | | | | | |
| 15 | 3 | | | | | | |
| 16 | 3 | | | | | | |
| 17 | 3 | | | | | | |
| 18 | 3 | | | | | | |
| 19 | 4 | | | | | | |
| 20 | 3 | | | | | | |
| 21 | 3 | | | | | | |
| 22 | 3 | | | | | | |
| 23 | 3 | | | | | | |
| 24 | 4 | | | | | | |
| 25 | 4 | | | | | | |
| 26 | 3 | | | | | | |

| Chất lượng | Điểm TB của phiên này (1–7) | Tham chiếu — cách chấm chuẩn UEQ-S (1–7) |
|---|---|---|
| Attractiveness | 3.60 | 3.50 |
| Clarity | 3.40 | 3.40 |
| Efficiency | 3.67 | 3.67 |
| Reliability | 3.33 | 3.20 |
| Motivation | 3.00 | 3.00 |
| Novelty | 3.00 | 3.00 |

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
| F2 | 2 | | | | |
| F3 | 3 | | | | |
| F4 | 4 | | | | |
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
| E1 – Clarity | “Ban đầu hơi khó vì trang đăng nhập tiếng Anh, và ô giá tiền không biết có bắt buộc không. Menu bên trái thì dễ hiểu.” |
| E2 – Error recovery | “Sai mật khẩu thì chỉ báo chung chung, tôi gõ lại là xong. Nhưng lúc xóa không hỏi lại thì tôi hơi rợn vì nếu xóa nhầm là mất luôn.” |
| E3 – Speed | “Chỗ đổi tên danh mục mất mất lâu, tôi tưởng mình bị treo. Còn lại thì nhanh.” |
| E4 – Trust | “Sửa xong mà tên mấy sản phẩm khác cũng đổi thì tôi không tin lắm. Dashboard thì tôi cũng không hiểu ‘Delivered’ gồm gì nên cũng chưa tin lắm.” |
| E5 – FR-12 | “Sai mật khẩu thì tôi biết là do mình gõ sai. Tài khoản thường bị từ chối thì hiểu là không phải admin. Nhưng không có hướng dẫn phải làm gì tiếp.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn. Nhưng ‘Delivered’ là đơn giao rồi hay đơn đang giao thì tôi không chắc, phải hỏi mới biết.” |
| E7 – FR-14 | “Tạo và xóa thì làm được. Đổi tên thì em không tìm được cách nào, nên em dừng luôn tại đó.” |
| E8 – FR-15 | “Có, tôi thấy mấy tên khác cũng bị đổi. Giá thì tôi không kiểm.” |
| E9 – FR-15 (giá) | “Tôi không để ý giá vì thấy báo thành công. Định dạng số thì… 450000 không có dấu phân cách, đọc hơi khó.” |
| E10 | “Không thấy dấu *, nên tôi không biết ô nào bắt buộc.” |
| E11 | “Thêm danh mục không có báo gì. Sửa sản phẩm thì báo ‘Cập nhật thành công!’.” |

## 8. Ghi chú khác

- Đây là phiên duy nhất bị ghi `abandoned` ở T2 — người tham gia **dừng task** sau 5 phút tìm kiếm chức năng Sửa. Đây là dữ liệu quan trọng: khoảng trống chức năng **không chỉ làm chậm** mà còn **làm người dùng bỏ cuộc**.
- Người tham gia là người duy nhất cần **trợ giúp để hoàn thành T1** (hiểu nhãn “Delivered”), dẫn tới `completed_with_help` cho T1.
- Người tham gia ghi chú bằng văn phong “em” — dấu hiệu người dùng ít quen giao diện quản trị.
- Người tham gia **tự phát hiện** lỗi đổi tên hàng loạt (C1); **không** phát hiện lỗi giá (C2).
- Không mở DevTools, không tra Google.
- Người thu phiên không sửa kết quả đánh dấu của người tham gia (kết quả `abandoned` ở T2 được giữ nguyên theo video và `ghi-chu.md`).
