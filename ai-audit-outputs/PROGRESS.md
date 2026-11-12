# PROGRESS — AI Audit

> File quản lý & chỉ mục các phiên AI đã ghi lại. Cập nhật sau **mỗi** lần ghi (chế độ 1) và sau
> **mỗi** lần tổng hợp (chế độ 2).

## Metadata

| Trường | Giá trị |
|---|---|
| Dự án / bài tập | HW03-AI — GUI & Usability Testing (Task 1: GUI Checklist cho Web Admin EShop) |
| Người thực hiện | 23120341 |
| Email / MSS | 23120341@student.hcmus.edu.vn · MSS 23120341 |
| AI tool chính | OpenCode (agent harness — plugin `gui-testing`, `ai-audit`) |
| Phiên bản / model | MiniMax M3.1 Flash Free (`minimax-m3.1-flash-free`) |

## Chế độ hiện tại

_Ghi conversation hiện tại_ — chế độ 1 đã hoàn thành cho phiên CONV-20261112-1941.
Chế độ 2 (tổng hợp) **chưa chạy** — cần thêm phiên nếu muốn tổng hợp nhiều phiên.

## Danh mục phiên đã ghi

| # | Mã phiên | Thời gian | AI tool | Bối cảnh | Số lượt | File log | File lỗi | Số lỗi | Đã tổng hợp |
|---|---|---|---|---|---|---|---|---|---|
| 1 | CONV-20261112-1941 | 2026-11-11 → 2026-11-12 22:00 | OpenCode + MiniMax M3.1 Flash Free | Task 1 HW03-AI — kiểm thử GUI phân hệ Web Admin EShop: thiết kế checklist 47 mục, người dùng tự thực thi, phân tích kết quả, 21 bug report + 21 GitHub Issues, báo cáo tổng hợp | 7 | `conversation-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` | `mistakes-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` | 8 | ⬜ |
| 2 | | | | | | | | | ⬜ |
| 3 | | | | | | | | | ⬜ |

_(Nhân bản dòng cho đủ số phiên. Cột "Đã tổng hợp" đánh dấu ⬜ / ✅.)_

## Trạng thái tổng hợp

| Mục | Trạng thái | File | Ngày |
|---|---|---|---|
| Bản tóm tắt lỗi từng phiên | ✅ done (1 phiên) | `mistakes-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` | 2026-11-12 |
| Báo cáo AI Audit tổng hợp | ⬜ todo | `ai-audit-summary.md` | |
| Tổng hợp lỗi AI (gom nhóm) | ⬜ todo | `ai-audit-mistakes-summary.md` | |
| Đoạn AI Critique 200–300 từ | ⬜ todo | `ai-critique.md` | |

> **Ghi chú**: vì hiện mới có **1 phiên** được ghi, bản tổng hợp (chế độ 2) và đoạn AI Critique có thể
> viết trực tiếp từ file `mistakes-*.md` mà không cần chờ thêm phiên — hoặc chạy lại skill ở chế độ 2
> để sinh đúng format báo cáo theo HW03 §9.

## Kiểm tra chất lượng báo cáo

| Tiêu chí | Yêu cầu | Đạt? |
|---|---|---|
| Mỗi lượt có đủ 4 thông tin bắt buộc (tool / thời gian / prompt / output) | 100% | ✅ 7/7 lượt |
| Prompt ghi nguyên văn | có | ✅ |
| Có phần đánh giá & chỉnh sửa của người dùng | có | ✅ |
| File lỗi AI từng phiên: ngắn gọn, chỉ lỗi nghiệp vụ | 5–15 dòng | ✅ 8 mục lỗi, không ghi lỗi `X*` |
| File tổng hợp lỗi: gom nhóm, khử trùng lặp | 15–40 dòng | ⬜ (chế độ 2 chưa chạy) |
| Có phần "AI làm tốt" (cân bằng) | có | ✅ — mục 3 "Việc AI không thể thực hiện" + phần đánh giá từng lượt |
| Có phần "AI không thể làm gì" | có | ✅ |
| AI Critique đúng 200–300 từ | có | ⬜ todo |
| Không bịa nội dung không có trong log | 100% | ✅ — mọi lỗi đều có sự kiện tương ứng trong conversation |
| Khai báo công cụ AI ở phần đầu báo cáo | có | ✅ |
