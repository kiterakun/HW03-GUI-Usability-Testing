# 08 — Báo cáo kiểm định khả dụng (Usability Report)

| Trường           | Nội dung                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SUT & phiên bản  | EShop — **Web Admin** (`eshop-sut/frontend-admin`), commit `85af3ba`                                                                                                      |
| Flow được test   | Đăng nhập (FR-12) → Dashboard (FR-13) → Danh mục CRUD (FR-14) → Sản phẩm CRUD (FR-15)                                                                                     |
| Số phiên         | **7 / 7 người tham gia thật** (P01 – P07)                                                                                                                                 |
| Người thực hiện  | Đợt test được thực hiện bởi người dùng thật (hình thức tự ghi / self-recorded qua ghi màn hình), tổng hợp & phân tích bởi AI (OpenCode / MiniMax M3.1 Flash) + người dùng |
| Ngày báo cáo     | 2026-11-13                                                                                                                                                                |
| AI tools đã dùng | OpenCode (MiniMax M3.1 Flash) — hỗ trợ lập kế hoạch, tổng hợp số liệu, phân tích heuristic, xếp severity và viết báo cáo (không tự bịa dữ liệu người tham gia)            |

---

## 0. Tóm tắt điều hành (Executive Summary)

| Mục                       | Kết quả                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Số phiên                  | 7 người thật (P01–P07, ngoài lớp học, không phải IT/tester)                                                   |
| Task completion rate (TB) | **85.7%** (T1: 92.9%, T2: 50.0%, T3: 100%, T4: 100%)                                                          |
| Điểm SUS trung bình       | **6.8 / 100** — Xếp hạng **F** (Mức kém — Không chấp nhận được)                                               |
| Điểm UEQ-S trung bình     | **3.99 / 7** (49.9% tối đa — Dưới trung bình ngành 4.25)                                                      |
| Tổng phát hiện            | 8 vấn đề thiết kế & chức năng                                                                                 |
| Mức độ cao nhất           | **S4 — Catastrophe** (Lỗi sửa sản phẩm ghi đè dữ liệu toàn bộ bảng)                                           |
| Vấn đề hệ thống           | **6 vấn đề** xuất hiện ở 7/7 phiên (100%)                                                                     |
| Lỗi chức năng (Bug)       | **4 lỗi nghiêm trọng** đã được ghi nhận và chuẩn bị đưa lên GitHub Issues                                     |
| Đề xuất P1 (sửa ngay)     | 3 đề xuất (IM-01, IM-02, IM-03)                                                                               |
| Hạn chế lớn nhất          | Mẫu 7 người, chỉ test 1 luồng quản trị, không có ghi âm trực tiếp (dùng bản ghi màn hình và ghi chú viết tay) |

---

## 1. Tổng quan

Đợt kiểm định khả dụng (Usability Testing) trên phân hệ **Web Admin của hệ thống EShop** được thực hiện với **7 người tham gia thật** (P01–P07) có kinh nghiệm quản lý cửa hàng trực tuyến nhưng chưa từng dùng qua giao diện quản trị này.

Kết quả định lượng cho thấy hệ thống đang gặp **vấn đề thiết kế hệ thống cực kỳ nghiêm trọng** (điểm SUS trung bình chỉ đạt 6.8/100, xếp hạng F). Mặc dù tỷ lệ hoàn thành tác vụ (TCR) đạt 85.7% nhờ vào sự kiên trì của người dùng (và việc họ tìm ra workaround), các thao tác quản lý danh mục và sản phẩm bộc lộ nhiều khoảng trống chức năng, thiếu xác nhận an toàn khi xóa (`DELETE`), và đặc biệt là lỗi logic frontend/backend nghiêm trọng làm sai lệch hoặc ghi đè dữ liệu sản phẩm hàng loạt (`fakeMassUpdatedProducts`).

---

## 2. Mục tiêu đánh giá

| #      | Ta muốn biết                                                                 | Để quyết định                                                                        |
| ------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **M1** | Người dùng có nhận ra và tin tưởng các con số trên Dashboard không (FR-13)?  | Có cần đổi nhãn, bổ sung chú thích hoặc giải thích cách tính doanh thu không?        |
| **M2** | Người dùng có hoàn thành CRUD danh mục và hiểu hệ quả thao tác xóa (FR-14)?  | Có cần bổ sung chức năng Sửa danh mục và thêm dialog xác nhận khi xóa không?         |
| **M3** | Người dùng có nhập đúng form sản phẩm và nhận ra lỗi validate (FR-15)?       | Form sản phẩm có cần nhãn tĩnh (`<label>`), ký hiệu `*`, và validation inline không? |
| **M4** | Thông báo lỗi khi đăng nhập sai / không phải admin có dễ hiểu không (FR-12)? | Có cần thay thế `alert()` thô bằng thông báo inline thân thiện không?                |

---

## 3. Phương pháp

### 3.1 Đối tượng & quy trình phiên

- **Hình thức:** Tự ghi (self-recorded). Người tham gia tự quay màn hình thao tác trình duyệt, thực hiện 4 task theo kịch bản, điền bảng hỏi định lượng (`responses.csv`), và trả lời 11 câu hỏi mở (probe) bằng chữ vào file `ghi-chu.md`.
- **Nguyên tắc quan sát:** Không can thiệp trong lúc người tham gia làm task; ghi nhận thời gian, số lần kẹt và trích dẫn nguyên văn phản hồi của họ.

### 3.2 Công cụ đo lường

- **SUS (System Usability Scale):** 10 câu, thang 1–5, quy đổi ra điểm 0–100 (chuẩn Bangor).
- **UEQ-S (User Experience Questionnaire – Short):** 26 câu, thang 1–7, đo 6 chất lượng (Attractiveness, Clarity, Efficiency, Reliability, Motivation, Novelty) so với ngưỡng Laugwitz et al. (2009).
- **TCR (Task Completion Rate):** Đo tỷ lệ hoàn thành có trọng số (`(Hoàn thành + 0.5 × Hỗ trợ) / N`).

### 3.3 Vai trò của AI

AI (OpenCode / MiniMax M3.1 Flash) hỗ trợ lập kế hoạch (Module 1), thiết kế kịch bản và bảng hỏi (Module 2, 3), tổng hợp và phân tích dữ liệu từ `responses.csv` (Module 4), gân nhãn heuristic (Module 5), xếp hạng severity (Module 6), đề xuất cải thiện (Module 7) và lập báo cáo (Module 8). **AI tuyệt đối không tự bịa dữ liệu người tham gia.**

---

## 4. Kịch bản nhiệm vụ (Task Scenarios)

1. **Task 4 (Đăng nhập — FR-12):** Thử đăng nhập sai mật khẩu → thử đăng nhập bằng tài khoản user thường (`test@eshop.com`) → đăng nhập đúng bằng tài khoản admin.
2. **Task 1 (Dashboard — FR-13):** Quan sát Dashboard và diễn giải các con số hiển thị (tổng doanh thu delivered và tổng số đơn hàng).
3. **Task 2 (Danh mục — FR-14):** Tạo danh mục mới `Giày dép` → thử đổi tên thành `Giày dép & Dép` → xóa danh mục đó đi.
4. **Task 3 (Sản phẩm — FR-15):** Tạo sản phẩm mới `Áo khoác dạ` (giá 450.000 ₫, danh mục Phụ kiện, ảnh để trống) → sửa sản phẩm `Tai nghe AirPods Pro 2` (đổi tên thành `Tai nghe AirPods Pro 2 (Gen 2)`, giá `5990000`).

---

## 5. Người tham gia (7 người thật, che 4 số giữa)

| Mã      | Trình duyệt | Ngày phiên |
| ------- | ----------- | ---------- |
| **P01** | Chrome      | 2026-11-12 |
| **P02** | Edge        | 2026-11-12 |
| **P03** | Chrome      | 2026-11-12 |
| **P04** | Chrome      | 2026-11-12 |
| **P05** | Edge        | 2026-11-13 |
| **P06** | Chrome      | 2026-11-13 |
| **P07** | Chrome      | 2026-11-13 |

---

## 6. Kết quả định lượng

### 6.1 Task completion rate (TCR)

| Task               | N     | Hoàn thành | Hoàn thành có trợ giúp | Dừng    | Không hoàn thành | **TCR %**  | Thời gian TB (phút) |
| ------------------ | ----- | ---------- | ---------------------- | ------- | ---------------- | ---------- | ------------------- |
| **T4** (Đăng nhập) | 7     | 7          | 0                      | 0       | 0                | **100.0%** | 1.9                 |
| **T1** (Dashboard) | 7     | 6          | 1                      | 0       | 0                | **92.9%**  | 3.0                 |
| **T2** (Danh mục)  | 7     | 1          | 5                      | 1       | 0                | **50.0%**  | 4.6                 |
| **T3** (Sản phẩm)  | 7     | 7          | 0                      | 0       | 0                | **100.0%** | 5.5                 |
| **Tổng / TB**      | **7** | **5.27**   | **1.5**                | **0.2** | **0**            | **85.7%**  | **3.8**             |

### 6.2 SUS (System Usability Scale)

- **Điểm SUS trung bình:** **6.8 / 100** (Độ lệch chuẩn: 4.5; Min–Max: 0.0 – 12.5).
- **Xếp hạng:** Điểm **F** (Bottom 15% — Không chấp nhận được).
- **Câu có tỷ lệ đồng ý thấp nhất:** Câu 4 (_"Tôi nghĩ mình sẽ cần sự hỗ trợ của người có chuyên môn kỹ thuật để dùng hệ thống này"_ — chỉ đạt **35.7%** điểm quy đổi), phản ánh người dùng cảm thấy hệ thống thiếu hướng dẫn và nhiều điểm khó hiểu.

### 6.3 UEQ-S (User Experience Questionnaire – Short)

- **Điểm tổng trung bình:** **3.99 / 7** (49.9% giá trị tối đa), thấp hơn ngưỡng trung bình ngành (4.25).
- **Chất lượng thấp nhất:** _Reliability_ (3.29/7 — Dưới trung bình ngành) và _Efficiency_ (3.90/7 — Dưới trung bình ngành).
- **Chất lượng cao nhất:** _Novelty_ (4.43/7 — Trên trung bình ngành).

---

## 7. Kết quả định tính (Friction Points)

| #   | Vấn đề quan sát được                                          | Số phiên gặp | Trích dẫn tiêu biểu từ người tham gia                                      | Task   |
| --- | ------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------- | ------ |
| 1   | **Không có chức năng Sửa danh mục** trong giao diện           | 7/7 (100%)   | _"Gặp khó khăn nhỏ ở bước đổi tên danh mục (không có nút Sửa)"_ (P01)      | T2     |
| 2   | **Thao tác Xóa không có hộp thoại xác nhận** (dialog)         | 7/7 (100%)   | _"Xóa không hỏi lại gây lo lắng"_ (P02)                                    | T2, T3 |
| 3   | Sửa 1 sản phẩm làm **đổi tên mọi sản phẩm** trong bảng        | 7/7 (100%)   | _"Tên sản phẩm khác bị đổi tên theo"_ (P03)                                | T3     |
| 4   | Sau khi sửa sản phẩm, **giá mới không hiển thị ngay trên UI** | 7/7 (100%)   | _"Giá không cập nhật ngay trên UI"_ (P06)                                  | T3     |
| 5   | Form sản phẩm **thiếu nhãn tĩnh (`<label>`) và ký hiệu `*`**  | 7/7 (100%)   | _"Form sản phẩm không có label rõ ràng"_ (P03)                             | T3     |
| 6   | Thông báo lỗi đăng nhập thô (`alert()`), thiếu hướng dẫn      | 7/7 (100%)   | _"Đăng nhập sai có alert nhưng không có thông báo hướng dẫn cụ thể"_ (P04) | T4     |

---

## 8. Phân tích theo 10 Heuristics của Nielsen

- **Điểm yếu hệ thống trầm trọng nhất:** **H1 (Visibility of system status)** — trạng thái hiển thị sai lệch nghiêm trọng (giá không cập nhật, tên bị ghi đè hàng loạt, doanh thu nhân đôi); **H3 (User control & freedom)** — thiếu tính năng Sửa danh mục; và **H5 (Error prevention)** — xóa dữ liệu không cần xác nhận, cho phép lưu giá âm.
- **Heuristic chưa phát hiện vấn đề trong phạm vi flow:** H7 (Flexibility & efficiency of use) và H8 (Aesthetic & minimalist design) do flow test tập trung vào các chức năng cốt lõi chưa chạm tới thao tác hàng loạt nâng cao.

---

## 9. Phân tích theo mức độ nghiêm trọng (Severity Assessment)

| Mã       | Vấn đề                             | Mức độ (Nielsen 0–4) | Số phiên gặp | Lập luận                                                                  |
| -------- | ---------------------------------- | -------------------- | ------------ | ------------------------------------------------------------------------- |
| **U-03** | Sửa sản phẩm đổi tên toàn bộ bảng  | **4 — Catastrophe**  | 7/7          | Ghi đè dữ liệu hiển thị hàng loạt, làm hỏng toàn bộ CSDL quản lý trên UI. |
| **U-01** | Thiếu tính năng Sửa danh mục       | **3 — Major**        | 7/7          | Kéo TCR Task 2 xuống 50%, người dùng bị kẹt và phải dùng workaround.      |
| **U-02** | Xóa không có hộp thoại xác nhận    | **3 — Major**        | 7/7          | Gây lo lắng mạnh; chỉ một cú bấm nhầm là mất dữ liệu vĩnh viễn.           |
| **U-04** | Giá mới không hiển thị sau khi sửa | **3 — Major**        | 7/7          | Khiến người dùng tưởng thao tác thất bại, hoang mang về tính đúng đắn.    |
| **U-05** | Form thiếu nhãn (`<label>`) và `*` | **2 — Minor**        | 7/7          | Gây bối rối nhẹ khi điền form nhưng không chặn task.                      |
| **U-06** | Thông báo lỗi qua `alert()` thô    | **2 — Minor**        | 7/7          | Gây ngắt quãng trải nghiệm nhưng người dùng vẫn tự hiểu.                  |
| **U-07** | Dashboard doanh thu nhân đôi       | **2 — Minor**        | 7/7          | Gây hiểu lầm về quy mô doanh thu, giảm lòng tin vào hệ thống.             |
| **U-08** | Trang đăng nhập dùng tiếng Anh     | **1 — Cosmetic**     | 7/7          | Lỗi nhất quán ngôn ngữ bề ngoài.                                          |

---

## 10. Lỗi chức năng phát hiện trong phiên (Bug Report)

| Mã Bug     | Mô tả lỗi                                               | Mức độ           | Vị trí mã nguồn                      | Trạng thái GitHub Issue |
| ---------- | ------------------------------------------------------- | ---------------- | ------------------------------------ | ----------------------- |
| **BUG-01** | `fakeMassUpdatedProducts` ghi đè tên mọi sản phẩm       | Catastrophe (S4) | `frontend-admin/src/App.jsx:110-114` | ⬜ Chuẩn bị tạo Issue   |
| **BUG-02** | Giá mới không hiển thị trên UI sau khi `PUT` thành công | Major (S3)       | `frontend-admin/src/App.jsx:105-131` | ⬜ Chuẩn bị tạo Issue   |
| **BUG-03** | Dashboard nhân đôi doanh thu (`total_amount * 2`)       | Minor (S2)       | `frontend-admin/src/App.jsx:218`     | ⬜ Chuẩn bị tạo Issue   |
| **BUG-04** | API sản phẩm cho phép lưu giá âm (`price <= 0`)         | Major (S3)       | `backend/server.js:167-177`          | ⬜ Chuẩn bị tạo Issue   |

---

## 11. Đề xuất cải thiện (Improvement Recommendations)

| Mã ĐX     | Nội dung cải thiện cụ thể                                                                                                                         | Ưu tiên           | Nỗ lực | Chỉ số kỳ vọng cải thiện                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---------------------------------------------------------------- |
| **IM-01** | Sửa lỗi `fakeMassUpdatedProducts`: chỉ cập nhật đúng `id` được sửa, và fetch/cập nhật lại state giá ngay sau khi API trả về (U-03, U-04, H1, H5). | **P1 (Sửa ngay)** | S      | TCR Task 3 đạt 100% không lỗi hiển thị, điểm SUS tăng ≥ 10 điểm. |
| **IM-02** | Bổ sung nút "Sửa" và modal/form cập nhật tên danh mục trong bảng Quản lý danh mục (U-01, H3, H10).                                                | **P1 (Sửa ngay)** | M      | TCR Task 2 tăng từ 50.0% lên ≥ 90.0%.                            |
| **IM-03** | Thêm hộp thoại xác nhận (`window.confirm` hoặc Modal) trước khi thực hiện hành động `DELETE` (U-02, H5).                                          | **P1 (Sửa ngay)** | S      | Loại bỏ 100% rủi ro xóa nhầm dữ liệu; điểm câu F4 tăng.          |
| **IM-04** | Sửa công thức Dashboard (`total_amount`), thêm chú thích trạng thái đơn, và dùng định dạng `vi-VN` (U-07, H1).                                    | **P2 (Sửa sớm)**  | S      | Điểm tùy chỉnh F2 (tin tưởng số liệu) tăng lên ≥ 4.5/5.          |
| **IM-05** | Bổ sung thẻ `<label>`, ký hiệu `*`, thay thế `alert()` bằng Toast inline, dịch trang Login sang tiếng Việt (U-05, U-06, U-08).                    | **P2 (Sửa sớm)**  | M      | Điểm SUS câu 2 và 4 cải thiện rõ rệt.                            |

---

## 12. Đối chiếu với mục tiêu đánh giá

| Mục tiêu                | Dữ liệu trả lời từ 7 phiên                       | Kết luận                                                                          |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| **M1** (Dashboard)      | TCR T1 = 92.9%, F1 = 3.57/5                      | Đạt phần lớn — người dùng hiểu con số nhưng cần chú thích rõ cách tính doanh thu. |
| **M2** (Danh mục)       | TCR T2 = 50.0%, thiếu nút Sửa, xóa không confirm | Chưa đạt — cần bổ sung tính năng Sửa danh mục và dialog xác nhận.                 |
| **M3** (Sản phẩm)       | TCR T3 = 100% nhưng 7/7 gặp lỗi ghi đè tên/giá   | Đạt thao tác nhưng hỏng logic hiển thị/backend (cần fix bug P1).                  |
| **M4** (Access Control) | TCR T4 = 100% (TB 1.9 phút)                      | Đạt — cơ chế phân quyền hoạt động tốt, cần làm thông báo lỗi thân thiện hơn.      |

---

## 13. Hạn chế của đợt kiểm thử

- **Mẫu nhỏ:** Đợt test thực hiện với 7 người thật — đủ cho yêu cầu HW03 nhưng chỉ mang tính chất phát hiện các vấn đề thiết kế lớn, không đại diện cho toàn bộ tập khách hàng thực tế.
- **Giới hạn luồng:** Chỉ đánh giá 1 end-to-end flow quản trị (Web Admin), không kiểm định các phân hệ khách hàng (frontend-web) hay mobile app.
- **Phương pháp thu thập:** Không ghi âm giọng nói trực tiếp; phản hồi định tính được gom từ bản ghi màn hình và file ghi chú viết tay của người tham gia.
- **Môi trường demo:** Chạy trên môi trường SQLite cục bộ, chưa chịu tải thực tế.

---

## 14. Phụ lục & AI Audit

- **Kế hoạch đánh giá:** `01-evaluation-plan.md`
- **Kịch bản nhiệm vụ:** `02-task-scenarios.md`
- **Bảng hỏi:** `03-questionnaire.md`
- **Bảng tổng hợp kết quả:** `04-usability-results-consolidation.md`
- **Phân tích heuristic:** `05-heuristic-findings.md`
- **Đánh giá mức độ nghiêm trọng:** `06-severity-assessment.md`
- **Đề xuất cải thiện:** `07-improvements.md`
- **AI Audit Report:** Sử dụng skill `ai-audit` (ghi log prompt/output và tổng hợp đoạn AI Critique).
