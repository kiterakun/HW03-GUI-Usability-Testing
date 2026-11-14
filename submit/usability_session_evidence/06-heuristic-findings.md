# 05 — Phân tích Heuristic (Nielsen's 10 Heuristics)

| Trường | Nội dung |
|---|---|
| SUT | EShop Web Admin (`eshop-sut/frontend-admin`) |
| Nguồn phát hiện | Dữ liệu quan sát 7 phiên thực tế (`responses.csv` + `04-usability-results-consolidation.md`) + dry-run kỹ thuật |
| Người phân tích | AI (OpenCode / MiniMax M3.1 Flash) + người dùng |
| Ngày | 2026-11-13 |

---

## 1. Danh sách phát hiện và gân nhãn Heuristic

| Mã | Mô tả trung tính (từ dữ liệu 7 phiên) | Heuristic chính | Heuristic phụ | Nguyên nhân gốc | Mức độ phổ biến |
|---|---|---|---|---|---|
| **U-01** | UI Quản lý danh mục **không có nút/chức năng Sửa**, người dùng không thể đổi tên trực tiếp | **H3** (User control & freedom) | H10 | FR-14 chỉ yêu cầu Thêm/Xem/Xóa — thiếu thiết kế màn hình Sửa danh mục | 7/7 phiên (100%) |
| **U-02** | Thao tác **Xóa** (danh mục hoặc sản phẩm) thực hiện ngay lập tức **không có hộp thoại xác nhận** | **H5** (Error prevention) | H3 | Nút Xóa gọi trực tiếp API `DELETE` mà không qua modal/dialog confirm | 7/7 phiên (100%) |
| **U-03** | Khi sửa 1 sản phẩm, **tên của toàn bộ sản phẩm trong bảng bị đổi theo** | **H1** (Visibility of system status) | H5 | Lỗi state mapping (`App.jsx:110-114`: `fakeMassUpdatedProducts`) | 7/7 phiên (100%) |
| **U-04** | Sau khi sửa sản phẩm thành công, **giá mới không hiển thị ngay trên UI** (vẫn giữ giá cũ) | **H1** (Visibility of system status) | H9 | Giao diện không gọi lại hàm fetch dữ liệu hoặc không cập nhật state giá sau `PUT` | 7/7 phiên (100%) |
| **U-05** | Form nhập liệu (đăng nhập, danh mục, sản phẩm) **thiếu nhãn `<label>` và thiếu ký hiệu `*`** cho trường bắt buộc | **H6** (Recognition rather than recall) | H2 | Giao diện chỉ dùng `placeholder` mờ, không có nhãn tĩnh và không đánh dấu trường bắt buộc | 7/7 phiên (100%) |
| **U-06** | Thông báo lỗi đăng nhập và lỗi hệ thống dùng `alert()` trần, **thiếu hướng dẫn cách khắc phục** | **H9** (Help users recognize & recover) | H1 | Call-site catch lỗi dùng thuần `alert("...")` thay vì thông báo inline hoặc toast thân thiện | 7/7 phiên (100%) |
| **U-07** | Dashboard hiển thị doanh thu được **nhân đôi** (`total_amount * 2`) mà không có chú thích | **H1** (Visibility of system status) | H2 | Lỗi triển khai logic tính doanh thu ở `App.jsx:218` | 7/7 phiên (100%) |
| **U-08** | Trang quản trị dùng tiếng Anh ở form đăng nhập trong khi toàn bộ ứng dụng dùng tiếng Việt | **H4** (Consistency & standards) | H2 | Dùng template tiếng Anh mặc định cho màn hình Login (`Admin Login`, `Password`) | 7/7 phiên (100%) |

---

## 2. Phân tích chi tiết theo từng Heuristic (10 Heuristics của Nielsen)

| # | Heuristic | Số phát hiện | Phát hiện liên quan | Đánh giá chung trong phạm vi flow |
|---|---|:-:|---|---|
| **H1** | **Visibility of system status** | 3 | U-03, U-04, U-07 | **Kém**: Hệ thống che giấu hoặc hiển thị trạng thái sai lệch (tên sản phẩm bị ghi đè hàng loạt, giá không cập nhật, doanh thu bị nhân đôi). |
| **H2** | **Match between system and real world** | 2 | U-05, U-08 | **Trung bình**: Dùng tiếng Anh ở trang đăng nhập; thuật ngữ tương đối quen thuộc nhưng thiếu nhãn trực quan. |
| **H3** | **User control and freedom** | 1 | U-01 | **Kém**: Thiếu tính năng cốt lõi (Sửa danh mục), khiến người dùng bị kẹt khi thao tác nhầm hoặc muốn đổi ý. |
| **H4** | **Consistency and standards** | 1 | U-08 | **Trung bình**: Sự không nhất quán về ngôn ngữ (tiếng Anh ở login vs tiếng Việt ở phần còn lại). |
| **H5** | **Error prevention** | 2 | U-02, U-03 | **Kém**: Cho phép thao tác phá hủy (xóa) không cần xác nhận; lưu được giá âm; lỗi state ghi đè dữ liệu hàng loạt. |
| **H6** | **Recognition rather than recall** | 1 | U-05 | **Kém**: Người dùng phải nhớ ô nào bắt buộc vì form không có nhãn tĩnh và không có ký hiệu `*`. |
| **H7** | **Flexibility and efficiency of use** | 0 | — | *Chưa phát hiện vấn đề trong phạm vi flow đã test.* |
| **H8** | **Aesthetic and minimalist design** | 0 | — | *Chưa phát hiện vấn đề trong phạm vi flow đã test.* |
| **H9** | **Help users recognize, diagnose, and recover from errors** | 1 | U-06 | **Kém**: Lỗi báo qua `alert()` chung chung, không chỉ rõ nguyên nhân và không có hướng dẫn bước tiếp theo. |
| **H10** | **Help and documentation** | 1 | U-01 | **Kém**: Thiếu hướng dẫn hoặc cơ chế trợ giúp khi người dùng muốn đổi tên danh mục nhưng không tìm thấy nút. |

---

## 3. Đối chiếu phát hiện Heuristic với Mục tiêu đánh giá

| Mục tiêu | Phát hiện heuristic liên quan | Kết luận đánh giá |
|---|---|---|
| **M1** (Dashboard — FR-13) | U-07 (Doanh thu nhân đôi, thiếu chú thích) | Người dùng hiểu ý nghĩa tổng quan nhưng thiếu niềm tin vào con số do không rõ cách tính. |
| **M2** (Danh mục — FR-14) | U-01 (Không có nút Sửa), U-02 (Xóa không confirm) | TCR thấp (50%); người dùng bị chặn ở thao tác đổi tên và lo lắng khi xóa. |
| **M3** (Sản phẩm — FR-15) | U-03 (Đổi tên hàng loạt), U-04 (Giá mới không hiện), U-05 (Thiếu label) | Form hoạt động nhưng logic backend/frontend lỗi nặng, gây sai lệch dữ liệu trầm trọng. |
| **M4** (Access Control — FR-12) | U-06 (Lỗi `alert()` thô), U-08 (Login tiếng Anh) | Đăng nhập hoạt động nhưng phản hồi khi sai/từ chối chưa thân thiện. |
