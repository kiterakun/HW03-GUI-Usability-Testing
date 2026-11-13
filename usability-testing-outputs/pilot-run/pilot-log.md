# Pilot dry-run — log kỹ thuật

[01] === T4: Đăng nhập (FR-12) ===
[02] 📸 01-login-form.png
[03] Tiêu đề form đăng nhập: "Admin Login"
[04] Số input trong form: 2; số <label>: 0
[05] Placeholder input: ["Email","Password"]
[06] type của input: ["text","password"]
[07] ⚠ console.error: Failed to load resource: the server responded with a status of 401 (Unauthorized)
[08] ⚠ DIALOG [alert]: "Đăng nhập thất bại"
[09] 📸 08-login-wrong-password.png
[10] **FR-12:** Sau khi sai mật khẩu: hộp thoại = "Đăng nhập thất bại"
[11] ⚠ DIALOG [alert]: "Bạn không phải là admin!"
[12] 📸 11-login-as-normal-user.png
[13] **FR-12:** Sau khi dùng tài khoản user thường: hộp thoại = "Bạn không phải là admin!"
[14] 📸 13-dashboard-after-login.png
[15] Vào được trong admin? CÓ
[16] === T1: Dashboard (FR-13) ===
[17] Nội dung Dashboard: "Dashboard\nTổng doanh thu (Delivered)\n\n6,400,000 ₫\n\nTổng số đơn hàng\n\n5"
[18] Thẻ doanh thu: "Tổng doanh thu (Delivered)\n\n6,400,000 ₫"
[19] Thẻ tổng đơn: "Tổng số đơn hàng\n\n5"
[20] **FR-13:** Dashboard hiển thị doanh thu = Tổng doanh thu (Delivered) 6,400,000 ₫ | đúng tổng delivered (3.200.000 ₫)? có vẻ đúng
[21] Số thẻ <h1> trên trang: 1 → ["EShop Admin"]
[22] Các thẻ <h2>: ["Dashboard"]
[23] === T2: Danh mục (FR-14) ===
[24] 📸 23-categories-initial.png
[25] Header bảng Danh mục: ["ID","Tên Danh Mục","Hành động"]
[26] → Cột "Sửa" có tồn tại không? KHÔNG — UI không có chức năng Sửa danh mục
[27] 📸 26-category-created.png
[28] Số dòng sau khi tạo: 4
[29] Có dòng "Giày dép"? CÓ
[30] **FR-14:** Sau khi tạo, có phản hồi trực quan (toast/bảng cập nhật)? CÓ — bảng cập nhật
[31] Các nút trong dòng danh mục "Giày dép": ["Xóa"]
[32] 📸 31-category-try-edit-in-table.png
[33] **FR-14:** Thử sửa trực tiếp trong bảng: có ô nhập xuất hiện không? KHÔNG — người dùng sẽ bị chặn ở bước này
[34] 📸 33-category-deleted.png
[35] **FR-14:** Xóa danh mục: có dialog xác nhận? KHÔNG — xóa ngay không hỏi (vi phạm FR-24)
[36] Còn dòng "Giày dép"? KHÔNG — đã xóa
[37] === T3: Sản phẩm (FR-15) ===
[38] 📸 37-products-initial.png
[39] Header bảng Sản phẩm: ["Ảnh","Tên SP","Giá","Hành động"]
[40] Các field trong form sản phẩm: [{"tag":"INPUT","ph":"Tên sản phẩm","type":"text","required":true},{"tag":"INPUT","ph":"Giá tiền","type":"number","required":false},{"tag":"INPUT","ph":"URL Ảnh","type":"text","required":false},{"tag":"TEXTAREA","ph":"Mô tả","type":"textarea","required":false},{"tag":"SELECT","type":"select-one","required":false}]
[41] **FR-15:** Form sản phẩm: 0 <label>, 1 field có required, 0 field có ký hiệu *
[42] Giá hiển thị trước khi sửa (dòng 4): "\tTai nghe AirPods Pro 2\t6000000 ₫\t\nSửa\nXóa"
[43] **FR-21:** Định dạng giá có phân cách nghìn? KHÔNG — hiển thị giá trị thô
[44] 📸 43-product-form-filled.png
[45] 📸 44-product-created.png
[46] Có dòng "Áo khoác dạ"? CÓ
[47] Dòng "Áo khoác dạ": "\tÁo khoác dạ\t450000 ₫\t\nSửa\nXóa"
[48] Tên sản phẩm TRƯỚC khi sửa: ["iPhone 15 Pro Max","Samsung Galaxy S24 Ultra","MacBook Pro M3","Tai nghe AirPods Pro 2","Bàn phím cơ Keychron Q1","Áo khoác dạ"]
[49] 📸 48-product-edit-form.png
[50] Tiêu đề form khi sửa: "Sửa sản phẩm"
[51] ⚠ DIALOG [alert]: "Cập nhật thành công!"
[52] 📸 51-product-edited.png
[53] Tên sản phẩm SAU khi sửa: ["Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)"]
[54] **FR-15:** Sau khi sửa 1 sản phẩm, các dòng bị ĐỔI TÊN: ["Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)","Tai nghe AirPods Pro 2 (Gen 2)"]
[55] **FR-15:** Vi phạm "chỉ sản phẩm đó bị thay đổi"? CÓ — ${changed.length} dòng bị đổi tên
[56] Dòng AirPods sau khi sửa: "\tTai nghe AirPods Pro 2 (Gen 2)\t30000000 ₫\t\nSửa\nXóa"
[57] === Kiểm tra bổ sung ===
[58] Các mục điều hướng: ["Dashboard","Danh mục","Sản phẩm","Mã Giảm Giá","Đơn hàng","Người dùng","Đăng xuất"]
[59] Mục đang highlight: ["Sản phẩm"]
[60] **FR-23:** URL sau khi chuyển tab: "http://localhost:5174/" → có đổi theo tab không? KHÔNG — điều hướng bằng state, không có router
[61] **FR-23:** Breadcrumb: []
[62] ⚠ console.error: An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string. src src
[63] 📸 62-product-negative-price.png
[64] **FR-15:** Nhập giá âm: hộp thoại = KHÔNG CÓ — sản phẩm có thể được lưu với giá âm
[65] 📸 64-product-empty-name.png
[66] **FR-22:** Bỏ trống tên: hộp thoại = KHÔNG CÓ — trình duyệt chặn bằng required, không có thông báo inline
[67] Kiểm tra: có phần tử nào chứa chữ 'Đang' / spinner không?
[68] **IA-04:** Trạng thái loading: KHÔNG CÓ phần tử loading
[69] 📸 68-product-delete.png
[70] **FR-24:** Xóa sản phẩm: có dialog xác nhận? KHÔNG — xóa ngay không hỏi
