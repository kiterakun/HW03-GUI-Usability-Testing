# Lỗi AI — Kiểm thử GUI phân hệ Web Admin EShop

| Trường | Nội dung |
|---|---|
| **Phiên liên quan** | CONV-20261112-1941 — `conversation-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` |
| **AI tool** | OpenCode + MiniMax M3.1 Flash Free |
| **Thời gian** | 2026-11-11 → 2026-11-12 ~22:00 |
| **Tổng số lỗi ghi nhận** | **8** (6 lỗi nghiệp vụ `M1`–`M8`, 0 lỗi `X*`) |

> File này là **bản tóm tắt ngắn gọn** về lỗi của AI trong phiên. Chỉ ghi lỗi liên quan đến
> **nghiệp vụ** và ảnh hưởng tới chất lượng kết quả. Xem `references/mistake-taxonomy.md` cho mã lỗi.

## 1. Lỗi AI

| # | Mã | Lỗi | Hậu quả đối với công việc | Cách xử lý |
|---|---|---|---|---|
| 1 | `M3` | **Sinh 77 mục checklist với nhiều mục trùng lặp** (cùng một khuyết điệt được tách thành nhiều mục ở nhiều màn hình), rồi còn tự thêm 10 mục nữa trong bước review | Phải làm lại checklist **3 phiên bản** (v1 67 → v2 77 → v3 47), mất ~90 phút; người dùng phải ra lệnh rút gọn **hai lần** | Gộp 8 nhóm mục trùng lặp thành mục "áp dụng chung cho nhiều màn hình"; bỏ 7 mục giá trị thấp có lý do ghi rõ |
| 2 | `M2` | **Tự kiểm "không có mục trùng" bằng script nhưng kiểm tra sai trục** — script so cặp *(tiêu chí + màn hình)*, trong khi sự trùng lặp thật nằm ở cặp *(tiêu chí + khuyết điệt)* xuyên nhiều màn hình | Script báo "0 trùng" → AI tưởng checklist đã sạch và **chủ quan tin là đạt**; checklist vẫn dư thừa khi người dùng xem | Bổ sung trục kiểm thứ hai: nhóm theo khuyết điệt gốc, không theo màn hình |
| 3 | `M8` | **Script ghi ảnh bổ sung sai chỉ số cột** — ghi vào cột "Kết quả" thay vì cột "Bằng chứng" | 7 dòng checklist hỏng thành `"Failed, screenshots/…"`; phải viết thêm một script để sửa lại | Viết script sửa riêng khôi phục đúng cột; chạy lại validator để xác nhận 47/47 dòng hợp lệ |
| 4 | `M8` | **Dùng `require('./database')` để kiểm tra dữ liệu mà không biết file này chạy `DROP TABLE` + seed lại** | **Xoá mất dữ liệu test của người dùng**: 4 đơn hàng, ~65 sản phẩm import thử, các danh mục "QA …". Bằng chứng ảnh không mất nhưng môi trường bị reset về seed | Báo ngay trong `05-test-results.md` §10 và `07-gui-test-report.md` §10; khuyến nghị sửa `database.js` chỉ seed khi bảng chưa tồn tại. *(Người dùng trả lời: không cần, đã tự verify trước khi fill.)* |
| 5 | `M6` | **Viết bảng tổng hợp số liệu bằng tay** trong checklist | Sai số: "Import CSV 11" thực tế 10; "Admin Login 17" thực tế 18; mức độ "12/35/20" thực tế "14/25/8" | Viết script đếm lại từ file checklist và đối chiếu với bảng trong file |
| 6 | `M1` | **Tự đặt ra tiêu chí kiểm chứng không có trong đặc tả**: mục "tên danh mục trùng phải bị từ chối", trong khi đặc tả SRS **không** yêu cầu uniqueness cho danh mục | Một mục có "kết quả mong đợi" bịa ra → nếu giữ lại sẽ thành bug report sai | Bỏ ở v3 khi rà lại; ghi lý do vào `04-checklist-review.md` §5.2 |
| 7 | `M2` | **Không hỏi repo đang private hay public** trước khi tạo 21 Issue tham chiếu ảnh bằng `raw.githubusercontent.com` | Ảnh **không hiển thị** với người xem chưa đăng nhập; phải sửa cả 21 issue bằng cách thêm khối "Truy cập ảnh khi không hiển thị" + cảnh báo trong README | Bổ sung đường dẫn tương đối trong repo cho mọi issue; nêu rõ trong README rằng cần thêm giảng viên làm collaborator hoặc chuyển repo sang Public |
| 8 | `M6` | **Dùng `gh issue create --label` với cờ lặp → chỉ 1 nhãn được áp dụng** | 21 issue ban đầu chỉ có nhãn `bug`; phải chạy lại `gh issue edit --add-label "a,b,c"` cho cả 21 issue | Sửa bằng `gh issue edit --add-label` với chuỗi phân tách dấu phẩy; xác nhận lại: mọi issue có ≥ 3 nhãn |

## 2. Điểm người dùng đã chỉnh

| # | Sửa gì | Vì sao phải sửa | Mã lỗi |
|---|---|---|---|
| 1 | Chốt lại phạm vi qua Gate A: tách "Import CSV" thành luồng riêng, xác nhận credential `Admin123!` (tài liệu SUT mâu thuẫn) | Phạm vi do con người quyết định, không phải AI tự chọn | — |
| 2 | Yêu cầu **bỏ toàn bộ FR-21..24**, chỉ dùng 4 IA | Tiêu chuẩn phân loại của bài chỉ có 4 IA; FR gây lẫn lộn | `M3` |
| 3 | Yêu cầu **rút gọn checklist** — "77 là quá nhiều và dư thừa" | Checklist v1/v2 dư thừa, tốn thời gian thực thi mà không tăng độ phủ | `M3` |
| 4 | Yêu cầu **dừng ở Task 1**, không làm Task 2 | Giữ đúng phạm vi HW03 hiện tại | — |
| 5 | Yêu cầu **overlay email lên ảnh** và **xuất .xlsx ngay** | Điều kiện bắt buộc của HW03 §11 và §14 | — |
| 6 | Xác nhận dữ liệu đã được **tự verify trước khi fill** vào checklist | Bảo đảm AI đọc dữ liệu thật, không phải dữ liệu bịa | — |

## 3. Việc AI không thể thực hiện

- **Thực thi checklist** — AI thiết kế 47 mục nhưng không thể đánh dấu Passed/Failed. Người dùng
  phải mở app, đo đạc bằng DevTools, chụp 55 ảnh và viết lý do cho từng mục Failed.
- **Quyết định cái nào là bug thật** — AI đề xuất 21 bug + 2 vấn đề khả dụng + 5 cải tiến, người
  dùng phải phê duyệt mức độ và loại.
- **Tạo bằng chứng không thể bịa** — ảnh chụp, số đo runtime, và ảnh cắt lỗi đều phải do người
  dùng tạo ra; AI chỉ có thể chuẩn hoá chúng thành bug report.
- **Task 2 (7 người tham gia thật) và Task 3 (cross-platform)** — không thể do AI tạo ra; đây là
  điểm bị trừ trọng nếu bịa.
- **Bảo mật repo** — quyết định private/public là thuộc người dùng.

## 4. Bài học nhanh

- **AI có xu hướng "càng nhiều càng tốt"**: cả 2 lần tự mở rộng (67 → 77 mục) đều làm giảm chất
  lượng. Đề bài ghi "nhiều hơn 40 mục" nhưng tiêu chí thật là **độ phủ không trùng lặp** — AI đọc
  "nhiều" theo nghĩa số lượng.
- **Self-check bằng script chỉ có giá trị nếu đo đúng cái cần đo**: script "0 mục trùng" chạy
  xanh nhưng kiểm tra sai trục, nên AI tự tin bỏ qua chính thứ nó vừa viết ra.
- **Số liệu trong báo cáo phải do máy tính, không do AI đếm tay**: 3 bảng tổng hợp sai số chỉ được
  phát hiện khi đối chiếu bằng script.
- **AI làm tốt khi được dẫn dắt có cấu trúc** (skill có Gate, template, ngưỡng đo) và làm yếu khi
  tự quyết định khối lượng — bài học này dùng chung cho cả skill `gui-testing` lẫn `ai-audit`.
