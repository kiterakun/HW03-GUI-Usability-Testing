# AI Critique (200–300 từ)

> **HW03 §10 — AI Critique.** Đoạn này phản tỉnh về công cụ AI đã dùng trong bài HW03-AI: AI sai ở đâu,
> vì sao không bắt được lỗi, và bài học rút ra khi cộng tác với AI.

Trong HW03 này, AI là trợ lý cho cả hai nhiệm vụ: sinh và tinh chỉnh 47 mục checklist GUI, khảo sát runtime, chuẩn hoá 23 bug report, thiết kế kịch bản và bảng hỏi kiểm định khả dụng, tổng hợp số liệu 7 phiên, gắn nhãn Heuristic và xếp severity. Điểm mạnh rõ nhất là AI bám sát phương pháp luận và tôn trọng ranh giới Gate: nó không tự đánh dấu Passed/Failed cho mục checklist nào, không bịa con số nào của người tham gia.

Tuy nhiên, AI sai ở bốn điểm, cùng một nguyên nhân gốc: nó thiếu ngữ cảnh hệ thống. Nó sinh 77 mục checklist rườm rà rồi trộn tiêu chuẩn FR-21..24 vào chỗ đề bài chỉ cho phép 4 Interface Aspect. Nó viết script seed đơn hàng bằng `require('./database')` mà không biết `initDatabase()` chạy ngay khi module được nạp, khiến Dashboard rỗng và có thể xoá dữ liệu các phiên trước. Nó đặt tiêu chí “đổi tên danh mục” cho một UI không có nút Sửa — nếu giữ, mọi người tham gia sẽ bị đánh dấu thất bại dù họ làm đúng. Nó cũng nhúng ảnh theo URL `raw` vào Issue khi repo private.

Vì sao không bắt được? Vì nó suy luận theo khuôn mẫu phổ biến thay vì kiểm chứng trạng thái thật, và vì người dùng chủ động dừng ở các Gate để kiểm tra thủ công.

Bài học lớn nhất: AI không thay thế được human review, nhưng một dry-run bằng công cụ tự động trên SUT thật lại là trợ lý tốt nhất để bắt lỗi của chính AI. Bốn lỗi nghiêm trọng nhất đều bị phát hiện theo cách đó, trước khi nó làm hỏng dữ liệu của bảy người tham gia thật.

---

| Kiểm | Kết quả |
|---|---|
| Số từ (đếm theo khoảng trắng, không tính tiêu đề và ghi chú) | **296** |
| Khoảng mục yêu cầu | 200–300 từ ✅ |
| Đạt ba câu hỏi bắt buộc | ① AI sai ở đâu ✅ ② Vì sao không bắt được lỗi ✅ ③ Bài học về cộng tác với AI ✅ |

---

*Sinh viên: 23120341 · 23120341@student.hcmus.edu.vn · HW03-AI — GUI & Usability Testing · 2026-11-14.*
