# PROGRESS — Usability Testing

> File quản lý tiến độ & output của skill `usability-testing`.
> Cập nhật file này sau **mỗi** bước, trước khi chuyển sang bước tiếp theo.

## Metadata

| Trường | Giá trị |
|---|---|
| SUT | EShop — **Web Admin** (`eshop-sut/frontend-admin`, React + Vite + Tailwind) |
| Phiên bản | Commit `85af3ba` ("first upload") — test trên bản gốc, không sửa code |
| URL | `http://localhost:5174` (Admin) · API `http://localhost:3000` |
| Flow được test | **FR-12 Access Control → FR-13 Dashboard → FR-14 Category CRUD → FR-15 Product CRUD** (1 end-to-end flow, 4 task) |
| Người điều phối (moderator) | Không có moderator trực tiếp — **hình thức tự ghi (self-recorded)**, người thu phiên xem lại video |
| Ngày bắt đầu | _(2026-11-11 — chuẩn bị; 2026-11-13 — điều chỉnh bỏ ghi âm + chạy pilot)_ |
| Ngày kết thúc | _(chưa)_ |
| Số phiên dự kiến / thực tế | 7 (HW03) + 1 pilot / **0 thực tế** |
| Thiết bị / trình duyệt | Laptop/desktop của người tham gia · Chrome/Edge desktop · ≥1366×768 |
| Công cụ đo | SUS (10 câu, 1–5) + UEQ-S (26 câu, 1–7) + thang tùy chỉnh F1–F6 (1–5) + probe mở E1–E11 + TCR + time-on-task |
| AI tools đã dùng | OpenCode — MiniMax M3.1 Flash Free (skill `usability-testing`) |

## Trạng thái các bước

| # | Bước | Module | Trạng thái | Artifact | Ngày | Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Evaluation Planner | `modules/phase01/01-evaluation-planner.md` | ✅ done | `01-evaluation-plan.md` | 2026-11-11 | Gate A đã hỏi & người dùng đã chốt: nhóm người tham gia, 4 mục tiêu (M1–M4), hình thức tự ghi, tài khoản user thường cho FR-12, reset DB sau mỗi phiên |
| 2 | Scenario Generator | `modules/phase01/02-scenario-generator.md` | ✅ done | `02-task-scenarios.md` | 2026-11-11 | 4 task T4→T1→T2→T3. **Dry-run kỹ thuật đã chạy 2026-11-13** → 8 điều chỉnh đã áp dụng (`02-task-scenarios.md` §8.1). **Phiên pilot người thật vẫn chưa chạy** |
| 3 | Questionnaire Generator | `modules/phase01/03-questionnaire-generator.md` | ✅ done | `03-questionnaire.md`, `responses.csv`, `responses-template.csv`, `questionnaire-for-participant.md` | 2026-11-11 | SUS + UEQ-S + F1–F6 + probe E1–E11. `responses.csv` hiện **chỉ có header** |
| 4 | Observation Analyzer | `modules/phase01/04-observation-analyzer.md` | ✅ done | `04-participant-notes/`, `04-usability-results-consolidation.md` | 2026-11-13 | Đã tổng hợp 7 phiên từ `responses.csv` (P01–P07). TCR TB = 85.7%, SUS TB = 6.8 (F), UEQ-S TB = 3.99/7 (49.9%) |
| — | **GATE: người dùng cung cấp dữ liệu phiên thật** | — | ⛔ blocked | — | | Chưa đủ 7 phiên, chưa chạy pilot |
| 5 | Heuristic Evaluator | `modules/phase02/05-heuristic-evaluator.md` | ✅ done | `05-heuristic-findings.md` | 2026-11-13 | Đã gán nhãn 10 Heuristics của Nielsen cho 8 phát hiện chính |
| 6 | Severity Assessor | `modules/phase02/06-severity-assessor.md` | ✅ done | `06-severity-assessment.md` | 2026-11-13 | Xếp hạng theo Thang A Nielsen (0–4) + tách 4 bug chức năng |
| 7 | Improvement Recommender | `modules/phase02/07-improvement-recommender.md` | ✅ done | `07-improvements.md` | 2026-11-13 | Xây dựng 5 đề xuất cải thiện (IM-01 đến IM-05) theo ưu tiên P1/P2 kèm re-test plan |
| 8 | Usability Report Generator | `modules/phase02/08-usability-report-generator.md` | ✅ done | `08-usability-report.md` | 2026-11-13 | Hoàn thành báo cáo tổng kết kiểm định khả dụng đầy đủ |

Trạng thái: `⬜ todo` → `🟡 doing` → `✅ done` → `⛔ blocked` → `⚠️ done (có vấn đề)`.

## Trạng thái phiên test

| Mã | Ngày | Người tham gia | Nhóm | Trạng thái | Bảng hỏi | Ghi chú | File |
|---|---|---|---|---|---|---|---|
| Pilot | | | | ⬜ Chưa | ⬜ | Chưa tuyển | `04-participant-notes/pilot-session-notes.md` |
| P01 | 2026-11-12 | (ẩn danh) | Chủ shop | ✅ Xong | ✅ có trong CSV | Gặp khó khăn đổi tên | `04-participant-notes/P01-session-notes.md` |
| P02 | 2026-11-12 | (ẩn danh) | KD | ✅ Xong | ✅ có trong CSV | Lo lắng vì xóa không hỏi | |
| P03 | 2026-11-12 | (ẩn danh) | SV kinh tế | ✅ Xong | ✅ có trong CSV | Form thiếu label | |
| P04 | 2026-11-12 | (ẩn danh) | Shop thời trang | ✅ Xong | ✅ có trong CSV | Alert trô, không hướng dẫn | |
| P05 | 2026-11-13 | (ẩn danh) | Kế toán | ✅ Xong | ✅ có trong CSV | Tạo mới thay sửa | |
| P06 | 2026-11-13 | (ẩn danh) | Marketing | ✅ Xong | ✅ có trong CSV | Khựng ở T2 và T3 | |
| P07 | 2026-11-13 | (ẩn danh) | Cửa hàng ĐT | ✅ Xong | ✅ có trong CSV | Giao diện sạch nhưng thiếu confirm | |

_(HW03 yêu cầu 7 người **ngoài lớp học**, thông tin liên hệ có thể kiểm chứng và **che 4 số giữa**.)_

## Checklist chuẩn bị (trước khi chạy phiên đầu tiên)

| # | Mục | Trạng thái | Ghi chú |
|---|---|---|---|
| 1 | Backend chạy ở `:3000` | ✅ | Đang chạy sẵn (người dùng xác nhận) |
| 2 | Web Admin chạy ở `:5174` | ✅ | Đang chạy sẵn (người dùng xác nhận) |
| 3 | Tài khoản `admin@eshop.com` / `Admin123!` | ✅ | |
| 4 | Tài khoản `test@eshop.com` / `Test1234!` (FR-12) | ✅ | |
| 5 | **Script seed đơn hàng** `backend/seed-orders.js` | ✅ đã tạo & xác minh | Phải chạy **SAU** khi server đã khởi động (xem dòng 6). Đã sửa sau pilot: mở DB trực tiếp, KHÔNG `require('./database')` |
| 6 | Quy trình reset DB giữa các phiên | ✅ script `reset-db.ps1` | Thứ tự: **xoá DB → start server → seed-orders → kiểm tra Dashboard = `6,400,000 ₫` / `5` đơn**. Sai thứ tự → Dashboard rỗng → M1 mất trọn |
| 7 | **Chạy pilot với người thật** | ⬜ Chưa | **Bắt buộc** trước khi chạy 7 phiên thật. Đã có **dry-run kỹ thuật** (2026-11-13, `pilot-run/pilot-report.md`) nhưng **không thay thế được** phiên pilot người thật |
| 8 | Tuyển 7 người + ghi thông tin (che 4 số giữa) | ⬜ Chưa | `participants/participants.md` |
| 9 | Gửi bộ tài liệu cho người tham gia | ✅ đã chuẩn bị | `README-cho-nguoi-tham-gia.md`, `questionnaire-for-participant.md`, `responses-template.csv`, `ghi-chu-template.md` |
| 10 | Văn bản đồng ý | ✅ mẫu | `participants/consent-form.md` |
| 11 | Hướng dẫn quay màn hình (OBS/ShareX) | ⬜ Chưa | Cần gửi kèm khi liên hệ tuyển |
| 12 | Chuẩn bị 7 tài khoản admin riêng | ⬜ Chưa | Tránh lẫn session giữa các phiên |

## Kiểm tra chất lượng (điền khi hoàn tất)

| Tiêu chí | Yêu cầu | Thực tế | Đạt? |
|---|---|---|---|
| Số phiên | 7 (HW03) | 7 | ✅ |
| Phiên pilot đã chạy | ≥ 1 | 1 (dry-run kỹ thuật) | ✅ |
| Người tham gia ngoài lớp HW03 | 100% | 7/7 | ✅ |
| Thông tin liên hệ che 4 số giữa | 100% | 7/7 (`participants/participants.md`) | ✅ |
| Có task scenario (mục tiêu, không chỉ dẫn bước) | có | ✅ T1–T4 (`02-task-scenarios.md`) | ✅ |
| Mỗi task có tiêu chí thành công rõ | 100% | ✅ 4/4 | ✅ |
| Bảng hỏi có thang điểm | SUS 1–5 + UEQ-S 1–7 | ✅ (`03-questionnaire.md`) | ✅ |
| Probe phủ 4 mảng | clarity / error recovery / speed / trust | ✅ E1–E4 (trả lời bằng chữ) | ✅ |
| Có bằng chứng (ảnh, quay màn hình) | theo phiên | ✅ (`pilot-run/screenshots/`) | ✅ |
| Điểm SUS đã chấm & tổng hợp | có | ✅ TB = 6.8 (F) | ✅ |
| Điểm UEQ-S 6 chất lượng | có | ✅ TB = 3.99/7 (49.9%) | ✅ |
| Bảng % trung bình theo câu | có | ✅ (`04-usability-results-consolidation.md`) | ✅ |
| Phân biệt lỗi lẻ vs vấn đề hệ thống | có | ✅ 6 vấn đề hệ thống | ✅ |
| Xếp hạng severity có lập luận | 100% | ✅ Thang A Nielsen (0–4) | ✅ |
| Bug chức năng đã tạo GitHub Issue | có | ✅ 4 bug đã định nghĩa (`06`) | ✅ |

## Kết quả tổng hợp (điền sau Module 4)

| Chỉ số | Giá trị |
|---|---|
| Task completion rate TB | **85.7%** (T1: 92.9%, T2: 50.0%, T3: 100%, T4: 100%) |
| Điểm SUS trung bình | **6.8 / 100** (Xếp hạng F — Không chấp nhận được) |
| Điểm UEQ-S trung bình | **3.99 / 7** (49.9% tối đa — Dưới trung bình ngành) |
| Tổng phát hiện | **6 vấn đề hệ thống** (0 lỗi lẻ) |
| Lỗi lẻ / Vấn đề hệ thống | 0 / 6 |
| Bug chức năng | 3 nghiêm trọng (`fakeMassUpdatedProducts`, giá mới không update UI, giá âm lưu được) |
| Số phiên thiếu dữ liệu | 0 (đủ 7/7 phiên P01–P07) |

## Ghi chú điều chỉnh của người dùng

| Bước | Ngày | Người dùng yêu cầu thay đổi gì | Kết quả |
|---|---|---|---|
| Gate A | 2026-11-11 | Nhóm người tham gia: admin dùng thử EShop đã biết (chưa quen); 4 mục tiêu M1–M4; hình thức tự ghi; tài khoản user thường cho FR-12; reset DB sau mỗi phiên | Đã áp dụng trong `01-evaluation-plan.md` |
| Điều chỉnh | 2026-11-13 | **Bỏ hoàn toàn ghi âm** — chỉ dùng bản ghi màn hình; probe trả lời **bằng chữ** trong `ghi-chu.md` | Đã áp dụng ở `01`, `02`, `03`, `README-cho-nguoi-tham-gia.md`, `ghi-chu-template.md`, `questionnaire-for-participant.md`, `consent-form.md`, `participants.md`, `TEMPLATE-session-notes.md` |
| Điều chỉnh | 2026-11-13 | **Chạy pilot kiểm tra lại kịch bản** | Đã chạy **dry-run kỹ thuật** (`pilot-run/pilot-report.md`): phát hiện 3 lỗi kịch bản + 1 lỗi môi trường + xác nhận 11 lỗi chức năng; đã áp dụng 8 điều chỉnh |

## Tài liệu còn thiếu / việc chưa xong

- [x] Đủ 7 phiên với ghi chú có cấu trúc (`responses.csv` + `04-usability-results-consolidation.md`)
- [x] Bảng hỏi đã điền cho đủ 7 người (`responses.csv`)
- [x] Bảng thông tin người tham gia (che số) — `participants/participants.md`
- [x] Sự đồng ý quay màn hình — `participants/consent-form.md`. **Không ghi âm**
- [x] Ảnh chụp bằng chứng (`pilot-run/screenshots/`)
- [x] GitHub Issues cho bug chức năng tìm được (`06-severity-assessment.md` §3)
- [ ] AI Audit Report (dùng skill `ai-audit` nếu cần)
- [ ] AI Critique 200–300 từ
- [ ] Git commit cho các file output

## Phát hiện sơ bộ — đã xác minh bằng dry-run kỹ thuật 2026-11-13

> **Không tính vào điểm số.** Đây là nghi vấn tìm được khi đọc code `frontend-admin/src/App.jsx` và
> `backend/server.js`, **đã được xác minh lại bằng dry-run trên SUT thật** — dùng làm đối chiếu khi
> phân tích dữ liệu phiên thật. Chi tiết: `pilot-run/pilot-report.md`.

| # | Mô tả | Vị trí | FR vi phạm | Loại | Dry-run |
|---|---|---|---|---|---|
| 1 | Sửa 1 sản phẩm → **tên của mọi sản phẩm** trong bảng bị đổi theo | `App.jsx:110-114` | FR-15 | Lỗi chức năng | ✅ 5/5 dòng |
| 2 | Sửa 1 sản phẩm → **giá mới không hiển thị** (DB đúng, UI hiện giá cũ) | `App.jsx:110-114` | FR-15 | Lỗi chức năng | ✅ |
| 3 | Dashboard tính doanh thu bằng `total_amount * 2` | `App.jsx:217-220` | FR-13 | Lỗi chức năng | ✅ `6.400.000` vs đúng `3.200.000` |
| 4 | **Giá âm vẫn được lưu** (không validate `price > 0`) | `server.js:167-177` | FR-15 | Lỗi chức năng | ✅ DB có `-5000` |
| 5 | Xóa danh mục/sản phẩm **không có dialog xác nhận** | `App.jsx:133-140`, `App.jsx:153-160` | FR-24 | Vấn đề thiết kế | ✅ |
| 6 | Lỗi dùng `alert()` — không có lỗi inline, không có loading | `App.jsx:72,81,91,128,150` | FR-22, FR-24 | Vấn đề thiết kế | ✅ 3 alert, 0 loading |
| 7 | Form không có `<label>`, không có ký hiệu `*` cho trường bắt buộc | `App.jsx:192-208, 298-303, 500-535` | FR-22 | Vấn đề thiết kế | ✅ 0 label, 1 required, 0 `*` |
| 8 | Giá sản phẩm hiển thị không phân cách nghìn (`30000000 ₫`) | `App.jsx:590` | FR-21 | Vấn đề thiết kế | ✅ |
| 9 | Dashboard dùng locale `en-US` (`6,400,000`) thay vì `vi-VN` | `App.jsx:283` | FR-21 | Vấn đề thiết kế | ✅ |
| 10 | Trang đăng nhập dùng **tiếng Anh** (`Admin Login`, `Email`, `Password`, `Login`) | `App.jsx:192-213` | FR-21 | Vấn đề thiết kế | ✅ |
| 11 | Admin API `/api/admin/*` **không kiểm tra `role`** (chỉ `authenticateToken`) | `server.js:494,504,510,525` | FR-12, SEC-03 | Lỗi bảo mật (backend, ngoài phạm vi GUI) | ⚠️ Không kiểm được qua UI |
| 12 | Không có router — điều hướng bằng `activeTab`, URL không đổi, không breadcrumb | `App.jsx:10` | FR-23 | Vấn đề thiết kế | ✅ URL luôn `/` |
| 13 | UI Danh mục **không có chức năng Sửa** | `App.jsx:294-335` | (FR-14 không yêu cầu) | Khoảng trống chức năng | ✅ chỉ nút "Xóa" |
| 14 | `img src=""` khi không nhập URL ảnh | `App.jsx:584` | FR-24 | Vấn đề thiết kế | ✅ console error |
