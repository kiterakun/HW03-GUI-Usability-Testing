# P04 — Ghi chú phiên test

> **Phiên tự ghi (self-recorded) — phiên P04.** File này được lập từ bản ghi màn hình
> `recordings/P04.mp4`, bảng hỏi `responses.csv` → dòng `P04`, và file ghi chú bằng chữ
> (`ghi-chu.md`) của người tham gia.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P04 |
| Họ tên | Phạm Gia Bảo — *(che 4 số giữa khi đưa vào bảng tổng hợp)* |
| Liên hệ | xem `participants/participants.md` (đã che 4 số giữa) |
| Ngày & giờ | 2026-11-12 |
| Thời lượng | 20 phút (4 task, tổng thời gian trên task ≈ 15.3 phút) |
| Hình thức | ✅ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | Người tổ chức đợt test |
| Thiết bị / trình duyệt / kích thước màn hình | Chrome (desktop, 1440×900) |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ✅ Có (văn bản đồng ý tại `participants/consent-form.md`) |
| Tệp quay màn hình | `recordings/P04.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P04` |
| File ghi chú của người tham gia | `recordings/P04-ghi-chu.md` |

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
| Nhóm người dùng | Chủ shop thời trang |
| Độ tuổi | 35 |
| Nghề nghiệp | Chủ shop thời trang online, 5 năm kinh nghiệm |
| Kinh nghiệm e-commerce / quản trị shop | Quản lý shop online riêng (không phải EShop); quen thao tác quản lý sản phẩm |
| Thiết bị thường dùng | Máy tính cá nhân (desktop), trình duyệt Chrome |
| Có phải sinh viên HW03 không | ✅ Không |
| Có phải người trong ngành IT/QA không | ✅ Không |

> **Nhận xét của người thu phiên:** Cẩn thận, hay kiểm tra lại kết quả trước khi tin; thường đối chiếu với bản ghi hàng của chính mình.

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ✅ completed | 2.0 | ✅ completed | ✅ completed | Hoàn thành cả 3 lượt thử (sai mật khẩu → user thường → admin). Chỉ thiếu thông báo lỗi hướng dẫn. |
| T1 — Dashboard | FR-13 | ✅ completed | 3.0 | ✅ completed | ✅ completed | Đọc được 2 thẻ KPI và diễn giải “delivered” là đơn đã giao. Không có bảng đơn hàng để đối chiếu. |
| T2 — Danh mục | FR-14 | 🟡 completed_with_help | 4.8 | 🟡 completed_with_help | 🟡 completed_with_help | Tạo + xóa được nhưng **không có chức năng Sửa** → phải dùng workaround (tạo mới rồi xóa cũ). |
| T3 — Sản phẩm | FR-15 | ✅ completed | 5.5 | ✅ completed | ✅ completed | Tạo + sửa được, nhưng UI hiển thị sai (tên cả bảng đổi theo, giá mới không hiện). |

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
- [ ] Đổi tên được thành `Giày dép & Dép` — **không đạt**: Không — kết luận sau ~3 phút. (xem §2.2)
- [x] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [x] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [x] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [x] **Các sản phẩm khác KHÔNG bị đổi tên** — **không đạt**: Có (tự phát hiện lúc 16:40). (xem §2.3)

### 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | Không — kết luận sau ~3 phút. |
| Họ đã thử những cách gì? | Bấm vào tên → bấm đúp → quét cột “Hành động” → mở rộng cửa sổ trình duyệt → bấm thử nút Xóa để xem phản ứng → tạo mới rồi xóa cũ. |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | Khoảng **3 phút 10 giây** (08:20–11:30). |
| Họ có hỏi/hét gọi người tổ chức không? | Không hỏi trực tiếp; ghi trong `ghi-chu.md`: “Không có nút sửa danh mục, xóa cũng không hỏi lại.” |

### 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | Có (tự phát hiện lúc 16:40). |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | “Sao 5 dòng này tên giống nhau hết vậy? Tôi chỉ sửa một dòng.” |
| Họ có nhận ra ô nào bắt buộc không? | Không — dừng lại ở ô “Giá tiền” vì không có dấu `*`. |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | Không thử. |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | Không để ý. |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | Mở trang Login; đọc kỹ, chú ý “Admin Login”/“Email”/“Password”/“Login” đều tiếng Anh. | “Giao diện chưa Việt hóa. Kệ, đăng nhập trước đã.” | 1 |
| 01:20 | T4 | Sai mật khẩu lần 1 → `alert()` “Đăng nhập thất bại”. | “Thông báo này không nói gì cả. Mình sai hay hệ thống sai?” | 2 |
| 02:20 | T4 | Đăng nhập bằng tài khoản user thường → “Bạn không phải là admin!”. | “Chắc phải dùng tài khoản quản trị.” | 1 |
| 03:00 | T4 | Đăng nhập đúng → Dashboard. | “Vào được rồi.” | 1 |
| 03:50 | T1 | Đọc Dashboard: **6,400,000 ₫** / **5** đơn; nói doanh thu là đơn delivered. | “6.400.000, 5 đơn. Chỉ tính đơn delivered.” | 1 |
| 05:00 | T1 | Mở các mục khác trong sidebar để tìm bảng đơn hàng để đối chiếu; không tìm thấy trong phạm vi dễ dùng. | “Không thấy chỗ nào xem đơn hàng. Tôi sẽ tạm tin con số này.” | 2 |
| 07:00 | T2 | Tạo `Giày dép` → có trong bảng, không có thông báo. | “Có rồi, nhưng không có thông báo gì. Phải tự nhìn bảng.” | 2 |
| 08:20 | T2 | Tìm nút Sửa: bấm vào tên, bấm đúp, quét cột Hành động, mở rộng cửa sổ. | “Không có nút Sửa. Vậy là không sửa được tên.” | 2 |
| 10:40 | T2 | Bấm nút “Xóa” để xác nhận hệ thống có hỏi không — xóa thẳng, không hỏi. Người tham gia lập tức phản ứng. | “Xóa không hỏi à? May mà tôi còn bản ghi danh mục cũ.” | 3 |
| 11:30 | T2 | Tạo `Giày dép & Dép` rồi xóa `Giày dép`. | “Tạm coi như đổi tên được vậy.” | 2 |
| 14:00 | T3 | Điền form sản phẩm; dừng lại ở ô “Giá tiền” vì không biết bắt buộc hay không. | “Ô này có bắt buộc không nhỉ? Không thấy dấu *.” | 2 |
| 15:40 | T3 | Sửa `Tai nghe AirPods Pro 2` → tên + giá `5990000` → “Lưu sản phẩm” → `alert()` “Cập nhật thành công!”. | “Cập nhật thành công!” | 1 |
| 16:40 | T3 | Kiểm tra lại bảng: cả 5 dòng cùng tên mới; giá dòng sửa vẫn `6000000 ₫`. Nhận ra tên bị đổi hàng loạt, **không** nhận ra giá sai. | “Sao 5 dòng này tên giống nhau hết vậy? Tôi chỉ sửa một dòng.” | 3 |
| 17:30 | T3 | Điền bảng hỏi + probe. | — | 1 |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Task |
|---|---|---|---|---|---|---|
| F1 | Không có chức năng Sửa danh mục; người tham gia tìm bằng nhiều cách trước khi kết luận. | “Không có nút Sửa. Vậy là không sửa được tên.” | 4 | 3 | 08:20–11:30 | T2 |
| F2 | Xóa không có xác nhận — người tham gia phản ứng mạnh vì từng bị mất dữ liệu trong công việc thật. | “Xóa không hỏi à? May mà tôi còn bản ghi danh mục cũ.” | 1 | 1 | 10:40 | T2 |
| F3 | Sửa một sản phẩm đổi tên toàn bộ bảng. | “Sao 5 dòng này tên giống nhau hết vậy? Tôi chỉ sửa một dòng.” | 1 | 1 | 16:40 | T3 |
| F4 | Giá mới không hiển thị sau khi lưu. | “Tên đổi rồi chứ giá thì… à, tôi không để ý.” | 1 | 1 | 16:50 | T3 |
| F5 | Không có ký hiệu trường bắt buộc; nhãn là placeholder. | “Ô này có bắt buộc không nhỉ? Không thấy dấu *.” | 1 | 1 | 14:00 | T3 |
| F6 | Thông báo lỗi đăng nhập không nêu nguyên nhân và không hướng dẫn xử lý. | “Thông báo này không nói gì cả. Mình sai hay hệ thống sai?” | 1 | 1 | 01:20 | T4 |
| F7 | Không có thông báo xác nhận khi thêm danh mục. | “Có rồi, nhưng không có thông báo gì. Phải tự nhìn bảng.” | 1 | 1 | 07:00 | T2 |
| F8 | Không tìm được bảng đơn hàng để đối chiếu doanh thu. | “Không thấy chỗ nào xem đơn hàng. Tôi sẽ tạm tin con số này.” | 1 | 1 | 05:00 | T1 |

## 5. Trợ giúp / can thiệp

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| 08:20–11:30 | Tự tìm (bấm tên, bấm đúp, quét bảng, mở rộng cửa sổ) rồi dùng workaround tạo mới/xóa cũ. | UI không có nút Sửa. | Không — kết quả tính `completed_with_help` do dùng workaround. |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P04` trong `responses.csv`.

### SUS (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 | Điểm đã điều chỉnh |
|---|---|---|---|---|---|---|
| 1 | 3 | | | | | `2` (điểm − 1) |
| 2 | 3 | | | | | `2` (5 − điểm) |
| 3 | 4 | | | | | `3` (điểm − 1) |
| 4 | 3 | | | | | `2` (5 − điểm) |
| 5 | 3 | | | | | `2` (điểm − 1) |
| 6 | 3 | | | | | `2` (5 − điểm) |
| 7 | 3 | | | | | `2` (điểm − 1) |
| 8 | 3 | | | | | `2` (5 − điểm) |
| 9 | 3 | | | | | `2` (điểm − 1) |
| 10 | 3 | | | | | `2` (5 − điểm) |
| | | | | | **Tổng điều chỉnh** | **21** |
| | | | | | **Điểm SUS = (2.5 × 21) − 50** | **2.5 / 100** |

> Xếp hạng Bangor: **F (Bottom 15% — Không chấp nhận được)**.

### UEQ-S (thang 1–7)

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| 1 | 4 | | | | | | |
| 2 | 4 | | | | | | |
| 3 | 4 | | | | | | |
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
| Efficiency | 3.67 | 3.67 |
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
| E1 – Clarity | “Menu và bảng rõ ràng. Nhưng trang đăng nhập toàn tiếng Anh, và khi sai mật khẩu thì báo chung chung quá.” |
| E2 – Error recovery | “Không có hướng dẫn. Lúc xóa cũng không hỏi lại — với tôi, xóa là mất luôn nên hơi sợ.” |
| E3 – Speed | “Thao tác nhanh, quen rồi. Lâu nhất là lúc tìm nút sửa danh mục.” |
| E4 – Trust | “Tôi là người hay đối chiếu. Sửa một sản phẩm mà tên 5 dòng khác cũng đổi thì tôi sẽ không tin lắm. Doanh thu thì cũng không có chỗ để so.” |
| E5 – FR-12 | “Sai mật khẩu thì hiểu là sai mật khẩu, tài khoản thường thì hiểu là không phải admin. Nhưng thông báo không nói phải làm gì tiếp theo.” |
| E6 – FR-13 | “Tôi đọc 6.400.000 ₫ và 5 đơn, hiểu là doanh thu đơn đã giao. Tôi không xác minh được con số.” |
| E7 – FR-14 | “Tạo và xóa thì làm được. Đổi tên thì không có chức năng nào, tôi tạo mới xóa cũ. Xóa không hỏi lại là điểm tôi thấy rủi ro nhất.” |
| E8 – FR-15 | “Có, tôi thấy tên mấy dòng khác cũng đổi hết. Giá thì không kiểm.” |
| E9 – FR-15 (giá) | “Tôi không nhìn kỹ giá sau khi sửa. Và giá hiển thị không có dấu phân cách nghìn, đọc hơi khó.” |
| E10 | “Không thấy dấu *, tôi đoán tên và giá là bắt buộc.” |
| E11 | “Thêm danh mục không có thông báo. Sửa sản phẩm thì có báo ‘Cập nhật thành công!’.” |

## 8. Ghi chú khác

- Người tham gia **tự phát hiện** lỗi đổi tên hàng loạt (C1); **không** phát hiện lỗi giá (C2).
- Phản ứng mạnh nhất với việc xóa không có xác nhận — người tham gia nói rõ đây là thói quen làm việc: xóa là mất luôn.
- Người tham gia có xu hướng tự kiểm chéo bằng trí nhớ dữ liệu đã nhập (ví dụ “may mà tôi còn bản ghi danh mục cũ”).
- Không mở DevTools, không tra Google.
- Người thu phiên không sửa kết quả đánh dấu của người tham gia.
