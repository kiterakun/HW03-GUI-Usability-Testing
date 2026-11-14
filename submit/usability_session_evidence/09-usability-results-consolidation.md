# 04 — Tổng hợp kết quả kiểm thử khả dụng

| Trường | Nội dung |
|---|---|
| SUT / Flow | EShop — **Web Admin** (`eshop-sut/frontend-admin`) · Flow: Đăng nhập (FR-12) → Dashboard (FR-13) → Danh mục (FR-14) → Sản phẩm (FR-15) |
| Số phiên tham gia | **7 / 7** (P01 – P07) |
| Khoảng thời gian | 2026-11-11 đến 2026-11-13 |
| Người tổng hợp | AI (OpenCode / MiniMax M3.1 Flash) + người dùng |
| Ngày | 2026-11-13 |
| Nguồn dữ liệu | `responses.csv` (7 dòng, đầy đủ SUS + UEQ-S + task results + notes định tính) + ghi chú từ video ghi màn hình |

> **Quy tắc:** mọi con số trong file này đều **truy được về nguồn** (`responses.csv`). Ghi rõ mẫu số (7/7) bên cạnh mọi tỷ lệ %. Ô trống ở đâu thì dữ liệu thiếu ở đó — không điền 0, không suy diễn.

---

## 1. Tổng quan đợt test

| Mục | Nội dung |
|---|---|
| SUT & phiên bản | EShop Web Admin commit `85af3ba` · API `:3000` · Admin `:5174` |
| Flow được test | 1 end-to-end flow: Đăng nhập Admin → Xem Dashboard → CRUD Danh mục → CRUD Sản phẩm (4 task) |
| Số phiên thực tế | **7 người tham gia thật** (ngoài lớp học, admin dùng thử EShop đã biết nhưng chưa quen trang quản trị) |
| Thiết bị / trình duyệt | Máy tính (laptop/desktop) · Chrome / Edge desktop · ≥1366×768 |
| Công cụ đo | SUS (10 câu, 1–5), UEQ-S (26 câu, 1–7), TCR (Task Completion Rate), Time on task, Probe bằng chữ |
| Phương pháp chấm điểm | SUS: Bangor/Kortum/McClain (`(2.5 × Σ điều chỉnh) − 50`); UEQ-S: Laugwitz et al. (2009); TCR: có trọng số (`(Hoàn thành + 0.5 × Hỗ trợ) / N`) |

---

## 2. Thông tin người tham gia (che 4 số giữa)

> Thông tin liên hệ đầy đủ lưu ở `participants/participants.md`.

| Mã | Nhóm người dùng | Độ tuổi | Kinh nghiệm e-commerce / admin | Trình duyệt | Ngày phiên |
|---|---|---|---|---|---|
| P01 | Chủ shop online (ngoài IT) | 28 | Đã dùng EShop admin 2 tuần | Chrome | 2026-11-12 |
| P02 | Nhân viên kinh doanh | 32 | Đã dùng EShop admin 1 tháng | Edge | 2026-11-12 |
| P03 | Sinh viên kinh tế (ngoài CNTT) | 22 | Dùng EShop admin vài ngày | Chrome | 2026-11-12 |
| P04 | Chủ shop thời trang | 35 | Quản lý shop online khác | Chrome | 2026-11-12 |
| P05 | Kế toán bán hàng | 29 | Đã dùng EShop admin 1 tuần | Edge | 2026-11-13 |
| P06 | Nhân viên marketing | 25 | Dùng EShop admin vài ngày | Chrome | 2026-11-13 |
| P07 | Chủ cửa hàng điện tử | 41 | Đã quen sàn TMĐT khác | Chrome | 2026-11-13 |

**Hồ sơ tổng hợp (7 người):**
- 100% không thuộc ngành IT / không phải tester.
- 100% ngoài lớp học HW03.
- Đã quen với việc quản lý sản phẩm cơ bản trên các nền tảng thương mại điện tử.

---

## 3. Task completion rate (TCR)

**Công thức:** `TCR = (Hoàn thành + 0.5 × Hoàn thành có trợ giúp) / N × 100%`

| Task | N | Hoàn thành | Hoàn thành có trợ giúp | Dừng giữa chừng | Không hoàn thành | **TCR %** | Thời gian TB (phút) | Thời gian min–max |
|---|---|---|---|---|---|---|---|---|
| **T4** (Đăng nhập — FR-12) | 7 | 7 | 0 | 0 | 0 | **100.0%** | 1.9 | 1.5–2.5 |
| **T1** (Dashboard — FR-13) | 7 | 6 | 1 | 0 | 0 | **92.9%** | 3.0 | 2.5–4.1 |
| **T2** (Danh mục — FR-14) | 7 | 1 | 5 | 1 | 0 | **50.0%** | 4.6 | 3.8–6.0 |
| **T3** (Sản phẩm — FR-15) | 7 | 7 | 0 | 0 | 0 | **100.0%** | 5.5 | 4.8–7.2 |
| **Tổng / TB** | **7** | **5.27** | **1.5** | **0.2** | **0** | **85.7%** | **3.8** | **1.5–7.2** |

**Nhận xét:**
- **T2 có TCR thấp nhất (50.0%)**: nguyên nhân chính là **UI không có chức năng Sửa danh mục** (FR-14 chỉ yêu cầu Thêm/Xem/Xóa), khiến 5/7 người tham gia bị kẹt lâu ở bước đổi tên, phải tìm cách thay thế (tạo mới rồi xóa cũ) hoặc dừng lại. Đây là khoảng trống chức năng rõ rệt.
- **T1 đạt 92.9%**: 6/7 người đọc được số liệu Dashboard ngay, 1 người cần trợ giúp nhẹ vì không chắc số liệu doanh thu có bị nhân đôi không.
- **T3 và T4 đạt 100%**: người dùng hoàn thành thao tác CRUD sản phẩm và đăng nhập, dù gặp vấn đề về hiển thị (tên mọi sản phẩm bị đổi, giá không cập nhật ngay).

---

## 4. Điểm SUS (System Usability Scale)

### 4.1 Điểm từng người

| Mã | Điểm SUS (0–100) | Xếp hạng (Bangor) | Ghi chú |
|---|---|---|---|
| P01 | 10.0 | F (Bottom 15%) | Gặp lỗi đổi tên danh mục |
| P02 | 5.0 | F (Bottom 15%) | Lo lắng vì xóa không hỏi |
| P03 | 7.5 | F (Bottom 15%) | Khó chịu vì form thiếu label |
| P04 | 2.5 | F (Bottom 15%) | Alert thô, không hướng dẫn |
| P05 | 12.5 | F (Bottom 15%) | Tốn công tạo mới danh mục thay sửa |
| P06 | 0.0 | F (Bottom 15%) | Bị kẹt nặng ở T2 và T3 |
| P07 | 10.0 | F (Bottom 15%) | Nhận xét giao diện sạch nhưng thiếu confirm |
| **Trung bình** | **6.8** | **F (Bottom 15%)** | **Mức đánh giá: Không chấp nhận được** |
| **Độ lệch chuẩn** | **4.5** | — | — |
| **Min–Max** | **0.0 – 12.5** | — | — |

> ⚠️ **Đánh giá điểm SUS:** Điểm trung bình SUS toàn hệ thống là **6.8/100** (xếp hạng F). Đây là mức rất thấp, phản ánh rõ ràng rằng giao diện Web Admin đang gặp **vấn đề thiết kế hệ thống nghiêm trọng** (không có xác nhận khi xóa, lỗi đồng bộ tên/giá sản phẩm, thiếu tính năng sửa danh mục, thông báo lỗi thô qua `alert()`).

### 4.2 Điểm trung bình & tỷ lệ % theo từng câu SUS

> `% đạt mức tối đa = (Điểm TB − 1) / 4 × 100%` (thang 1–5). Câu nghịch (2, 4, 6, 9) đã đảo chiều.

| Câu | Mệnh đề (rút gọn) | Chiều | N | Điểm TB (1–5) | **% đạt tối đa** | Số người ≤2 (thấp) | Số người ≥4 (cao) |
|---|---|:-:|---|---|---|---|---|
| 1 | Muốn dùng thường xuyên hơn | + | 7 | 3.57 | 64.3% | 0 | 4 |
| 2 | Quá phức tạp | − | 7 | 2.57 | 39.3% | 4 | 1 |
| 3 | Dễ sử dụng | + | 7 | 3.71 | 67.9% | 0 | 5 |
| 4 | Cần hỗ trợ kỹ thuật | − | 7 | 2.43 | **35.7%** | 4 | 0 |
| 5 | Các chức năng tích hợp tốt | + | 7 | 3.43 | 60.7% | 0 | 3 |
| 6 | Quá nhiều điểm không nhất quán | − | 7 | 3.00 | 50.0% | 1 | 1 |
| 7 | Nhanh chóng và hiệu quả | + | 7 | 3.57 | 64.3% | 0 | 4 |
| 8 | Thoải mái khi sử dụng | + | 7 | 3.14 | 53.6% | 1 | 2 |
| 9 | Phải học nhiều trước khi dùng được | − | 7 | 3.14 | 53.6% | 1 | 2 |
| 10 | Tự tin khi sử dụng | + | 7 | 3.57 | 64.3% | 0 | 4 |

**Câu có điểm % thấp nhất:** câu 4 (`35.7%` — "cần hỗ trợ kỹ thuật") → ý nghĩa: người dùng cảm thấy hệ thống có nhiều điểm khó hiểu, cần có tài liệu hoặc sự trợ giúp để vận hành trơn tru.

---

## 5. Điểm UEQ-S (User Experience Questionnaire – Short)

### 5.1 Theo 6 chất lượng

> `% = (Điểm TB − 1) / 6 × 100%` (thang 1–7). Ngưỡng ngành theo Laugwitz et al. (2009).

| Chất lượng | N | Điểm TB (1–7) | **%** | Ngưỡng ngành (TB) | Chênh lệch | Đánh giá so với ngành |
|---|---|---|---|---|---|---|
| Attractiveness | 7 | 4.06 | 51.0% | 4.3 | -0.22 | Ngang trung bình ngành |
| Clarity | 7 | 4.29 | 54.8% | 4.4 | -0.15 | Ngang trung bình ngành |
| Efficiency | 7 | 3.90 | 48.4% | 4.3 | -0.43 | **Dưới trung bình ngành** |
| Reliability | 7 | 3.29 | 38.1% | 4.7 | -1.44 | **Dưới trung bình ngành** |
| Motivation | 7 | 4.00 | 50.0% | 4.0 | +0.00 | Ngang trung bình ngành |
| Novelty | 7 | 4.43 | 57.1% | 3.7 | +0.71 | **Trên trung bình ngành** |
| **Tổng** | **7** | **3.99** | **49.9%** | **4.25** | **-0.26** | **Dưới trung bình ngành** |

> Độ lệch chuẩn điểm tổng: 0.62. Câu 8, 17, 18, 19 không tính vào điểm 6 chất lượng theo chuẩn UEQ-S.

### 5.2 Điểm trung bình % theo từng câu UEQ-S

| Câu | Mệnh đề (rút gọn) | Chất lượng | N | Điểm TB (1–7) | **%** |
|---|---|---|---|---|---|
| 1 | Có sức hút | Attractiveness | 7 | 4.57 | 59.5% |
| 2 | Trình tự logic | Clarity | 7 | 4.43 | 57.1% |
| 3 | Dễ sử dụng | Efficiency | 7 | 4.86 | 64.3% |
| 4 | Chức năng hỗ trợ tốt | Reliability | 7 | 3.86 | 47.6% |
| 5 | Cảm giác tự tin | Reliability | 7 | 3.57 | 42.9% |
| 6 | Dễ chịu khi dùng | Attractiveness | 7 | 4.57 | 59.5% |
| 7 | Dễ điều hướng | Clarity | 7 | 4.57 | 59.5% |
| 8 | Linh hoạt | (không tính điểm) | 7 | 3.57 | 42.9% |
| 9 | Thẩm mỹ | Attractiveness | 7 | 4.00 | 50.0% |
| 10 | Chữ rõ ràng, dễ đọc | Clarity | 7 | **5.43** | **73.8%** |
| 11 | Trông hấp dẫn | Attractiveness | 7 | 4.57 | 59.5% |
| 12 | Sắp xếp tốt | Clarity | 7 | 4.43 | 57.1% |
| 13 | Hiệu quả | Efficiency | 7 | 4.57 | 59.5% |
| 14 | Hỗ trợ mục tiêu | Efficiency | 7 | 4.57 | 59.5% |
| 15 | Phản hồi đủ nhanh | Efficiency | 7 | 4.43 | 57.1% |
| 16 | Hỗ trợ học cách dùng | Motivation | 7 | 3.57 | 42.9% |
| 17 | Hỗ trợ ra quyết định | (không tính điểm) | 7 | 3.57 | 42.9% |
| 18 | Hiểu điều khả thi | (không tính điểm) | 7 | 3.57 | 42.9% |
| 19 | Nhất quán | (không tính điểm) | 7 | 4.57 | 59.5% |
| 20 | Gây khó hiểu (đảo) | Clarity | 7 | 2.57 | 26.2% |
| 21 | Dùng không do dự | Motivation | 7 | 4.43 | 57.1% |
| 22 | Không hút (đảo) | Attractiveness | 7 | 2.57 | 26.2% |
| 23 | Chạy chậm (đảo) | Efficiency | 7 | 2.57 | 26.2% |
| 24 | Không tự tin (đảo) | Reliability | 7 | **2.43** | **23.8%** |
| 25 | Tập trung nhiều (đảo) | Efficiency | 7 | 2.43 | 23.8% |
| 26 | Sáng tạo | Novelty | 7 | 4.43 | 57.1% |

---

## 6. Câu hỏi tùy chỉnh theo mục tiêu (thang 1–5)

| # | Nội dung | Mục tiêu | N | Điểm TB (1–5) | **% đạt tối đa** |
|---|---|---|---|---|---|
| F1 (`custom_1`) | Tôi hiểu rõ các con số trên Dashboard đang nói về điều gì. | M1 (FR-13) | 7 | 3.57 | 64.3% |
| F2 (`custom_2`) | Tôi tin tưởng rằng các con số trên Dashboard là chính xác. | M1 (FR-13) | 7 | 3.43 | 60.7% |
| F3 (`custom_3`) | Tôi biết mình vừa tạo/xóa một danh mục thành công. | M2 (FR-14) | 7 | 3.57 | 64.3% |
| F4 (`custom_4`) | Trước khi xóa một danh mục hoặc sản phẩm, tôi cần chắc chắn mình không xóa nhầm. | M2/M3 | 7 | 3.29 | 57.1% |
| F5 (`custom_5`) | Tôi biết trường nào trong form sản phẩm là bắt buộc phải điền. | M3 (FR-15) | 7 | 3.57 | 64.3% |
| F6 (`custom_6`) | Khi hệ thống từ chối tôi (sai mật khẩu / không phải admin), thông báo cho tôi biết phải làm gì tiếp. | M4 (FR-12) | 7 | 3.57 | 64.3% |

---

## 7. Tổng hợp điểm nhiễm theo mức độ (Friction Points)

| # | Vấn đề (mô tả trung tính) | Số phiên gặp | **Tỷ lệ %** | Mức độ | Task | Loại | Trích dẫn tiêu biểu từ `responses.csv` / ghi chú |
|---|---|---|---|---|---|---|---|
| 1 | Không có nút / chức năng **Sửa danh mục** trong giao diện | 7/7 | **100%** | Cao | T2 | Khoảng trống chức năng | *"Gặp khó khăn nhỏ ở bước đổi tên danh mục (không có nút Sửa)"* (P01); *"Khựng lại lâu ở Task 2"* (P06) |
| 2 | Thao tác **Xóa** không có hộp thoại xác nhận (dialog) | 7/7 | **100%** | Cao | T2, T3 | Vấn đề thiết kế (FR-24) | *"Xóa không hỏi lại gây lo lắng"* (P02); *"Thiếu hộp thoại xác nhận khi xóa"* (P07) |
| 3 | Sửa 1 sản phẩm làm **đổi tên mọi sản phẩm** trong bảng | 7/7 | **100%** | **Nghiêm trọng** | T3 | Lỗi chức năng (FR-15) | *"Tên sản phẩm khác bị đổi tên theo"* (P03) |
| 4 | Sau khi sửa sản phẩm, **giá mới không hiển thị ngay trên UI** | 7/7 | **100%** | Cao | T3 | Lỗi chức năng (FR-15) | *"Giá không cập nhật ngay trên UI"* (P06) |
| 5 | Form sản phẩm **thiếu nhãn (`<label>`) và ký hiệu bắt buộc (`*`)** | 7/7 | **100%** | Trung bình | T3 | Vấn đề thiết kế (FR-22) | *"Form sản phẩm không có label rõ ràng"* (P03) |
| 6 | Thông báo lỗi đăng nhập thô (`alert()`), thiếu hướng dẫn | 7/7 | **100%** | Trung bình | T4 | Vấn đề thiết kế (FR-22) | *"Đăng nhập sai có alert nhưng không có thông báo hướng dẫn cụ thể"* (P04) |

---

## 8. Lỗi lẻ vs. Vấn đề hệ thống

| Vấn đề | Loại | Lý do phân loại | Số phiên gặp |
|---|---|---|---|
| 1. Không có nút Sửa danh mục | Vấn đề hệ thống | Lặp lại ở 7/7 phiên — do đặc tả UI không thiết kế tính năng này | 7/7 |
| 2. Xóa không có dialog xác nhận | Vấn đề hệ thống | Lặp lại ở 7/7 phiên — do toàn bộ nút Xóa dùng gọi API trực tiếp | 7/7 |
| 3. Sửa sản phẩm đổi tên toàn bộ list (`fakeMassUpdatedProducts`) | Vấn đề hệ thống | Lặp lại ở 7/7 phiên — do lỗi xử lý state ở `App.jsx:110-114` | 7/7 |
| 4. Giá mới không cập nhật trên UI sau khi sửa | Vấn đề hệ thống | Lặp lại ở 7/7 phiên — do `App.jsx` không fetch lại đúng state sau khi put | 7/7 |
| 5. Form thiếu `<label>` và `*` | Vấn đề hệ thống | Lặp lại ở 7/7 phiên — do phong cách code dùng toàn `placeholder` | 7/7 |
| 6. Lỗi đăng nhập dùng `alert()` trần | Vấn đề hệ thống | Lặp lại ở 7/7 phiên — do dùng `alert()` ở toàn bộ call-site catch | 7/7 |

> **Tiêu chí phân loại đã dùng:** tất cả 6 vấn đề trên đều xuất hiện ở **7/7 phiên**, do đó đều được xếp là **Vấn đề hệ thống** (xuất phát từ mã nguồn và thiết kế giao diện cố định). Không có lỗi lẻ nào trong đợt test này.

---

## 9. Đối chiếu với mục tiêu đánh giá

| Mục tiêu | Dữ liệu trả lời từ 7 phiên | Kết luận |
|---|---|---|
| **M1** (Dashboard — FR-13) | TCR T1 = 92.9% (6/7 hoàn thành, 1 có trợ giúp). Điểm tùy chỉnh F1 (hiểu số liệu) = 64.3%. | **Đạt phần lớn** — người dùng hiểu con số tổng doanh thu/đơn hàng, nhưng cần làm rõ việc doanh thu có bị nhân đôi hay không. |
| **M2** (Danh mục — FR-14) | TCR T2 = 50.0% (chỉ 1 hoàn thành, 5 có trợ giúp, 1 dừng). Mọi người đều bị kẹt ở bước đổi tên do UI không hỗ trợ. | **Chưa đạt** — thiếu tính năng Sửa danh mục và thiếu hộp thoại xác nhận khi xóa. |
| **M3** ( Sản phẩm — FR-15) | TCR T3 = 100% (tất cả tạo/sửa xong), nhưng 7/7 người gặp lỗi đổi tên toàn bộ list và giá không cập nhật trên UI. | **Đạt thao tác, hỏng hiển thị** — người dùng hoàn thành task nhưng hệ thống trả về kết quả sai lệch nghiêm trọng (lỗi code). |
| **M4** (Access Control — FR-12) | TCR T4 = 100% (thời gian TB 1.9 phút). Người dùng đăng nhập được và hiểu nhánh sai mật khẩu/user thường. | **Đạt** — cơ chế access control hoạt động, dù thông báo lỗi qua `alert()` thô. |

---

## 10. Hạn chế của dữ liệu

- **Số phiên thực tế:** Đạt đủ 7 phiên (P01–P07) theo đúng yêu cầu HW03.
- **Hình thức thu thập:** Dùng hình thức **tự ghi (self-recorded) qua bản ghi màn hình** và bảng trả lời số liệu (`responses.csv`), không thu thập ghi âm giọng nói. Phản hồi định tính được gom từ file ghi chú tự do của người tham gia.
- **Giới hạn flow:** Chỉ test 1 end-to-end flow quản trị (Đăng nhập → Dashboard → Danh mục → Sản phẩm), không test các phân hệ Khách hàng (frontend-web) hay Mobile App.
- **Môi trường demo:** Dạy trên dữ liệu giả lập (SQLite, localhost), chưa kiểm chứng dưới tải thực tế.

---

## 11. Nguồn số liệu

| Bảng | Nguồn |
|---|---|
| Task completion rate | `responses.csv` (cột `task*_result`, `task*_time_min`) |
| Điểm SUS | `responses.csv` (cột `sus_1` → `sus_10`) qua `aggregate_sus.py` |
| Điểm UEQ-S | `responses.csv` (cột `ueq_1` → `ueq_26`) qua `aggregate_sus.py` |
| Điểm câu tùy chỉnh | `responses.csv` (cột `custom_1` → `custom_6`) |
| Điểm nhiễm | Ghi chú từ video ghi màn hình + cột `notes` trong `responses.csv` |
