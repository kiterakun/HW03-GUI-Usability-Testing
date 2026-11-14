# 06 — Đánh giá mức độ nghiêm trọng (Severity Assessment)

| Trường | Nội dung |
|---|---|
| Thang đánh giá | **Thang A — Nielsen (0–4)** (0: Không phải vấn đề, 1: Vấn đề nhỏ/Cosmetic, 2: Minor, 3: Major, 4: Catastrophe/Critical) |
| Tiêu chuẩn lập luận | Dựa trên hậu quả thực tế lên người dùng (tần suất gặp 7/7, khả năng chặn task, mức độ bực bội) |
| Người đánh giá | AI (OpenCode / MiniMax M3.1 Flash) + người dùng |
| Ngày | 2026-11-13 |

---

## 1. Bảng đánh giá mức độ nghiêm trọng từng phát hiện

| Mã | Mô tả phát hiện | Heuristic | Số phiên gặp | Mức độ | Lập luận tác động lên người dùng | Loại |
|---|---|---|---|---|---|---|
| **U-03** | Sửa 1 sản phẩm làm **đổi tên mọi sản phẩm** trong bảng | H1, H5 | 7/7 (100%) | **4 — Catastrophe** | Người dùng thực hiện thao tác sửa bình thường nhưng hệ thống ghi đè toàn bộ cơ sở dữ liệu hiển thị (`fakeMassUpdatedProducts`), làm hỏng toàn bộ dữ liệu quản lý. Mức độ tàn phá dữ liệu cao nhất. | Lỗi chức năng (Bug) |
| **U-01** | UI Quản lý danh mục **không có chức năng Sửa**, người dùng không đổi tên được | H3, H10 | 7/7 (100%) | **3 — Major** | Kéo TCR của Task 2 xuống 50%. Người dùng bị chặn hoàn toàn ở bước đổi tên, phải tự tìm workaround (tạo mới rồi xóa cũ) gây tốn thời gian và bực bội. | Khoảng trống chức năng |
| **U-02** | Thao tác **Xóa** không có hộp thoại xác nhận (dialog) | H5, H3 | 7/7 (100%) | **3 — Major** | Gây lo lắng mạnh cho người quản trị (7/7 người nhắc đến trong probe/note). Chỉ một cú bấm nhầm là mất dữ liệu vĩnh viễn không thể hoàn tác. | Vấn đề thiết kế |
| **U-04** | Sau khi sửa sản phẩm, **giá mới không hiển thị ngay trên UI** (vẫn hiện giá cũ) | H1, H9 | 7/7 (100%) | **3 — Major** | Mặc dù DB đã lưu đúng, UI không cập nhật khiến người dùng tưởng hệ thống lỗi hoặc thao tác thất bại, dẫn đến việc bấm sửa lại nhiều lần hoặc hoang mang. | Lỗi chức năng (Bug) |
| **U-05** | Form thiếu nhãn tĩnh (`<label>`) và ký hiệu bắt buộc (`*`), chỉ dùng `placeholder` | H6, H2 | 7/7 (100%) | **2 — Minor** | Người dùng phải đoán trường nào bắt buộc, gây bối rối nhẹ ở lần đầu nhập liệu nhưng không chặn hoàn toàn task (vì trình duyệt chặn bằng `required`). | Vấn đề thiết kế |
| **U-06** | Thông báo lỗi dùng `alert()` thô, thiếu hướng dẫn khắc phục | H9, H1 | 7/7 (100%) | **2 — Minor** | Gây ngắt quãng trải nghiệm (popup browser chặn màn hình), thông báo chung chung không hướng dẫn cách sửa nhưng người dùng vẫn tự hiểu được lỗi đăng nhập. | Vấn đề thiết kế |
| **U-07** | Dashboard nhân đôi doanh thu (`total_amount * 2`) không có chú thích | H1, H2 | 7/7 (100%) | **2 — Minor** | Gây hiểu lầm về quy mô kinh doanh của shop (hiển thị gấp đôi thực tế), làm giảm lòng tin của quản trị viên vào độ chính xác của hệ thống. | Lỗi chức năng (Bug) |
| **U-08** | Trang đăng nhập dùng tiếng Anh trong khi toàn bộ ứng dụng dùng tiếng Việt | H4, H2 | 7/7 (100%) | **1 — Cosmetic** | Vi phạm tính nhất quán ngôn ngữ bề ngoài nhưng không ảnh hưởng đến khả năng hiểu và thao tác của người dùng. | Vấn đề thiết kế |

---

## 2. Ma trận ưu tiên (Severity × Tần suất)

> Vì tất cả 8 vấn đề đều xuất hiện ở **7/7 phiên**, ma trận ưu tiên sắp xếp theo mức độ giảm dần:

| Mức độ | Số phiên gặp | Ưu tiên sửa | Mã phát hiện |
|---|---|---|---|
| **S4 (Catastrophe)** | 7/7 | **Ưu tiên 1 (Fix ngay lập tức)** | **U-03** (Sửa sản phẩm đổi tên toàn bộ) |
| **S3 (Major)** | 7/7 | **Ưu tiên 1 (Fix ngay lập tức)** | **U-01** (Thiếu nút Sửa danh mục), **U-02** (Xóa không confirm), **U-04** (Giá mới không hiện trên UI) |
| **S2 (Minor)** | 7/7 | **Ưu tiên 3** | **U-05** (Thiếu label/`*`), **U-06** (Alert thô), **U-07** (Doanh thu nhân đôi) |
| **S1 (Cosmetic)** | 7/7 | **Ưu tiên 4** | **U-08** (Login tiếng Anh) |

---

## 3. Tách biệt Bug chức năng để chuyển sang Bug Report

Theo yêu cầu của HW03 (*"Report genuine bugs both in the Markdown report and on your GitHub Issues page"*), các lỗi chức năng (bugs) phát hiện trong đợt test được tách riêng khỏi các vấn đề thiết kế giao diện (usability issues) và sẽ được chuẩn hóa thành GitHub Issues ở bước tiếp theo:

| Mã Bug | Tên bug | Mức độ | Vị trí code dự kiến | Trạng thái GitHub Issue |
|---|---|---|---|---|
| **BUG-01** | `fakeMassUpdatedProducts` ghi đè tên mọi sản phẩm | Catastrophe (S4) | `frontend-admin/src/App.jsx:110-114` | ⬜ Chuẩn bị tạo Issue |
| **BUG-02** | Giá mới không cập nhật trên UI sau khi `PUT` thành công | Major (S3) | `frontend-admin/src/App.jsx:105-131` | ⬜ Chuẩn bị tạo Issue |
| **BUG-03** | Dashboard nhân đôi doanh thu delivered (`total_amount * 2`) | Minor (S2) | `frontend-admin/src/App.jsx:218` | ⬜ Chuẩn bị tạo Issue |
| **BUG-04** | API sản phẩm cho phép lưu giá âm (`price <= 0`) | Major (S3) | `backend/server.js:167-177` | ⬜ Chuẩn bị tạo Issue |
