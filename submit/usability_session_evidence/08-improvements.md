# 07 — Đề xuất cải thiện (Improvement Recommendations)

| Trường        | Nội dung                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------- |
| SUT           | EShop Web Admin (`eshop-sut/frontend-admin`)                                                    |
| Nguồn đề xuất | Kết quả đánh giá severity (Module 6), heuristic findings (Module 5) và quan sát 7 phiên thực tế |
| Người đề xuất | AI (OpenCode / MiniMax M3.1 Flash) + người dùng                                                 |
| Ngày          | 2026-11-13                                                                                      |

---

## 1. Danh sách đề xuất cải thiện (Sắp xếp theo mức độ ưu tiên)

### P1 – Sửa ngay (Blocker / Critical — Ảnh hưởng nghiêm trọng đến dữ liệu và luồng chính)

#### IMP-01: Khắc phục lỗi ghi đè dữ liệu hàng loạt khi sửa sản phẩm & đồng bộ giá trên UI

- **Phát hiện liên quan:** U-03 (`fakeMassUpdatedProducts`), U-04 (giá mới không hiện trên UI), H1, H5, Severity 4 & 3, 7/7 người gặp.
- **Vị trí:** `frontend-admin/src/App.jsx:105–131` (`handleProductSubmit`).
- **Nội dung đề xuất:**
  1. Sửa lại logic state `setProducts` khi gọi API `PUT /api/products/:id`: thay vì map đổi tên mọi sản phẩm (`products.map(p => ({...p, name: productForm.name}))`), chỉ cập nhật đúng sản phẩm có `id === productForm.id`.
  2. Cập nhật lại state `price` và `imageUrl` ngay sau khi API trả về thành công thay vì giữ lại giá cũ.
- **Tiêu chí thành công (đo được):** Sau khi sửa một sản phẩm (vd: đổi tên AirPods và đổi giá thành 5.990.000 ₫), các sản phẩm khác trong bảng **giữ nguyên tên cũ**, và **giá mới hiển thị chính xác** ngay lập tức trên bảng mà không cần tải lại trang.
- **Nỗ lực ước tính:** S (Small, ~1 giờ).

#### IMP-02: Bổ sung chức năng Sửa danh mục trong phân hệ Quản lý Danh mục

- **Phát hiện liên quan:** U-01 (không có nút Sửa danh mục), H3, H10, Severity 3, 7/7 người gặp (TCR T2 = 50%).
- **Vị trí:** `frontend-admin/src/App.jsx` (tab Danh mục) + Backend API `PUT /api/categories/:id` (đã có sẵn trong `server.js:257`).
- **Nội dung đề xuất:**
  1. Thêm cột "Hành động" có nút "Sửa" trong bảng danh mục.
  2. Khi bấm "Sửa", hiện form inline hoặc modal cho phép chỉnh sửa `name` của danh mục và gọi `PUT /api/categories/:id`.
- **Tiêu chí thành công (đo được):** Tăng TCR của Task 2 từ 50% lên ≥ 90%; người dùng có thể đổi tên danh mục trực tiếp mà không phải tạo mới rồi xóa cũ.
- **Nỗ lực ước tính:** M (Medium, ~2–3 giờ).

#### IMP-03: Thêm hộp thoại xác nhận (Confirmation Dialog) trước khi xóa dữ liệu

- **Phát hiện liên quan:** U-02 (xóa không hỏi lại), H5, H3, Severity 3, 7/7 người gặp.
- **Vị trí:** `frontend-admin/src/App.jsx` (`deleteCategory`, `deleteProduct`, `deleteUser`).
- **Nội dung đề xuất:** Bổ sung hộp thoại xác nhận (`if (!window.confirm("Bạn có chắc chắn muốn xóa...")) return;` hoặc Modal UI tùy chỉnh) trước khi gửi yêu cầu `DELETE` lên API.
- **Tiêu chí thành công (đo được):** Bấm nút "Xóa" xuất hiện hộp thoại xác nhận; nếu bấm "Hủy", dữ liệu được giữ nguyên. Giảm 100% rủi ro xóa nhầm do vô tình bấm trúng nút.
- **Nỗ lực ước tính:** S (Small, ~1 giờ).

---

### P2 – Sửa sớm (Major / Minor — Ảnh hưởng rõ đến trải nghiệm và độ tin cậy)

#### IMP-04: Sửa lỗi tính doanh thu nhân đôi trên Dashboard & bổ sung chú thích

- **Phát hiện liên quan:** U-07 (doanh thu nhân đôi), H1, H2, Severity 2, 7/7 người gặp.
- **Vị trí:** `frontend-admin/src/App.jsx:217–220`.
- **Nội dung đề xuất:**
  1. Sửa công thức tính doanh thu từ `o.total_amount * 2` thành `o.total_amount` (lấy đúng giá trị từ API).
  2. Thêm dòng chú thích nhỏ dưới nhãn thẻ Dashboard: _"Chỉ tính các đơn hàng đã giao (delivered)"_.
  3. Sử dụng định dạng tiền tệ chuẩn tiếng Việt (`vi-VN`, phân cách bằng dấu chấm `6.400.000 ₫` thay vì `6,400,000 ₫`).
- **Tiêu chí thành công (đo được):** Con số doanh thu trên Dashboard khớp chính xác với tổng thực tế trong CSDL; người dùng không còn băn khoăn về tính chính xác của số liệu (đo qua điểm tùy chỉnh F2 tăng từ 3.43 lên ≥ 4.5).
- **Nỗ lực ước tính:** S (Small, ~30 phút).

#### IMP-05: Cải tiến Form nhập liệu (thêm `<label>`, `*`) và thay thế `alert()` bằng Toast thông báo

- **Phát hiện liên quan:** U-05 (form thiếu nhãn), U-06 (lỗi dùng `alert()`), H6, H9, Severity 2, 7/7 người gặp.
- **Vị trí:** Toàn bộ form trong `frontend-admin/src/App.jsx` (Login, Sản phẩm, Danh mục, Coupon).
- **Nội dung đề xuất:**
  1. Bổ sung thẻ `<label>` hiển thị rõ ràng phía trên mỗi ô nhập liệu, kèm ký hiệu `*` màu đỏ cho các trường bắt buộc.
  2. Thay thế toàn bộ các hàm `alert(...)` bằng hệ thống Toast Notification (hoặc thông báo inline màu đỏ nằm ngay trên nút submit theo FR-22).
  3. Chuẩn hóa ngôn ngữ trang Đăng nhập sang tiếng Việt hoàn toàn.
- **Tiêu chí thành công (đo được):** Form có nhãn tĩnh dễ nhận biết; thông báo lỗi hiển thị inline, không chặn màn hình bằng popup browser; điểm SUS câu 2 và câu 4 cải thiện đáng kể.
- **Nỗ lực ước tính:** M (Medium, ~4 giờ).

---

## 2. Kế hoạch kiểm chứng lại (Re-test Plan) sau khi cải thiện

Sau khi đội ngũ phát triển áp dụng các đề xuất P1 và P2, đợt kiểm định khả dụng rút gọn sẽ được thực hiện lại để đo lường mức độ cải thiện:

| Chỉ số định lượng                 | Trước cải thiện (Hiện tại) | Mục tiêu sau cải thiện                | Phương pháp đo                                     |
| --------------------------------- | -------------------------- | ------------------------------------- | -------------------------------------------------- |
| **Task Completion Rate (TCR) TB** | 85.7%                      | **≥ 95%**                             | Chạy lại 4 task với 3–5 người dùng mới             |
| **TCR Task 2 (Danh mục)**         | 50.0%                      | **≥ 90%**                             | Đo tỷ lệ hoàn thành sau khi đã có nút Sửa danh mục |
| **Điểm SUS trung bình**           | 6.8 / 100 (F)              | **≥ 72.0 (A — Tốt)**                  | Thu thập bảng hỏi SUS sau phiên re-test            |
| **Điểm tổng UEQ-S**               | 3.99 / 7 (49.9%)           | **≥ 5.2 / 7 (Trên trung bình ngành)** | Thu thập bảng hỏi UEQ-S sau phiên re-test          |
| **Số vấn đề hệ thống mức S3/S4**  | 4 vấn đề                   | **0 vấn đề**                          | Kiểm chứng qua dry-run Playwright                  |
