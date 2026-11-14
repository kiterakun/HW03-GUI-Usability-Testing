# HW03-AI — GUI & Usability Testing · EShop Web Admin

> **Bài tập cá nhân — Exercise ID: HW03-AI**
> **Sinh viên:** 23120341 — 23120341@student.hcmus.edu.vn
> **SUT:** EShop — phân hệ **Web Admin** (`eshop-sut/frontend-admin`) — https://github.com/ttbhanh/eshop-sut
> **Repository bài làm:** https://github.com/kiterakun/HW03-GUI-Usability-Testing
> **Khoảng thời gian:** 2026-11-11 → 2026-11-14

---

## 1. Trạng thái các task

| Task | Nội dung | Trạng thái | Thư mục / tệp |
|---|---|---|---|
| **Task 1** | GUI Checklist (thiết kế + thực thi + bug report) | ✅ **Hoàn thành** | `main_report/` (báo cáo chính) · `checklist/` · `bug_report/` |
| **Task 2** | Usability Evaluation (7 phiên tham gia thật + phân tích) | ✅ **Hoàn thành** | `usability_session_evidence/` |
| **Task 3** | Cross-browser / cross-platform (≥ 3 nền tảng) | ❌ **Bỏ qua** | — (xem §4) |

> **Task 1 & Task 2 đã hoàn tất.** 47 mục GUI checklist được thiết kế và thực thi **47/47** trên SUT thật
> (7 Passed · 40 Failed, pass rate 14,9%); **23 bug** (21 ở Task 1, 2 ở Task 2) đã mở thành GitHub Issues
> **#1 – #23** kèm ảnh đính kèm; kiểm định khả dụng đã chạy với **7 người thật** (P01–P07), chấm SUS &
> UEQ-S, phân tích 10 Heuristics của Nielsen và xếp mức độ severity theo Thang A Nielsen.

---

## 2. Cấu trúc bộ hồ sơ nộp

```
Submit/
├── README.md                          ← file này: tự đánh giá + test summary (HW03 §14)
├── git-commit-log.txt                 ← nhật ký commit dạng text (HW03 §12)
├── main_report/                       ← ★ BÁO CÁO CHÍNH (Markdown + PDF)
│   ├── HW03_GUI_Usability_Main_Report.md
│   ├── HW03_GUI_Usability_Main_Report.pdf
│   └── screenshots/                   ← 55 ảnh bằng chứng cho 40 mục Failed + 7 mục Passed
├── bug_report/                        ← ★ BUG REPORT + ảnh GitHub Issues
│   ├── HW03_Bug_Report.md             ← 23 bug chi tiết
│   └── screenshots/                   ← 23 ảnh chụp trang GitHub Issues (#1–#23)
├── ai_audit_report/                   ← ★ AI AUDIT REPORT + AI CRITIQUE (MD + PDF)
│   ├── HW03_AI_Audit_Report.md / .pdf
│   └── HW03_AI_Critique.md / .pdf
├── usability_session_evidence/        ← ★ BẰNG CHỨNG 7 PHIÊN USABILITY
│   ├── README.md                      ← mục lục + bảng trỏ link bản ghi màn hình
│   ├── 01-task-scenarios.md … 10-consent-form.md
│   ├── 03-sus-ueq-responses.csv       ← dữ liệu SUS/UEQ-S thô
│   ├── 04-sus-ueq-responses.md         ← bảng điểm SUS / UEQ-S / F1–F6 / TCR
│   ├── 05-participants-table.md        ← bảng 7 người tham gia (che 4 số giữa)
│   ├── 05-session-notes/               ← 7 file ghi chú phiên P01…P07 + mẫu
│   └── recordings/README.md            ← bảng link bản ghi màn hình (chờ dán link Drive)
└── checklist/                         ← ★ EXCEL CHECKLIST + TEST SUMMARY
    ├── checklist-gui-testing.xlsx      ← 3 sheet: Checklist (47×10) · Test Summary · Bug List (21)
    └── test-summary.md                 ← test summary bằng văn bản
```

---

## 3. Test summary

### 3.1. Task 1 — GUI Checklist

- **Số màn hình / luồng đã test:** 5 màn hình trong phân hệ Web Admin (Login, Dashboard, Danh mục, Sản phẩm CRUD, Import CSV) + 2 nhóm khung chung (Sidebar, Các form / Các màn hình) = **7 vùng kiểm thử**.
- **Số mục checklist:** **47 mục** (IA-01: 13 · IA-02: 12 · IA-03: 9 · IA-04: 13).
- **Kết quả thực thi:** **47/47 mục đã chạy** — **7 Passed, 40 Failed** (pass rate **14,9%**).
- **Phân bổ theo IA:** IA-01 11/13 fail · IA-02 11/12 · IA-03 5/9 · **IA-04 13/13 (100%)**.
- **Bug đã ghi nhận:** **21 bug** (10 Blocker, 11 Major) → GitHub Issues **#1 → #21**.
- **Bằng chứng:** **55 ảnh** cho 40 mục Failed (tất cả đều overlay email sinh viên) + 7 ảnh cho các mục Passed.
- **Nguyên nhân gốc chiếm nhiều nhất:** `RC-IMP` — triển khai thiếu/sai (24/40 mục Failed, 60,0%).

### 3.2. Task 2 — Usability Evaluation

- **Flow được test:** Đăng nhập (FR-12) → Dashboard (FR-13) → Danh mục CRUD (FR-14) → Sản phẩm CRUD (FR-15) — 1 end-to-end flow, 4 task.
- **Số người tham gia:** **7 người thật** ngoài lớp học (P01–P07), 100% không thuộc ngành IT/QA, thông tin liên hệ được **che 4 số giữa** (`usability_session_evidence/05-participants-table.md`).
- **Chỉ số định lượng:**
  - **Task Completion Rate (TCR) trung bình:** **85,7%** (T4: 100% · T1: 92,9% · T2: 50,0% · T3: 100%).
  - **Điểm SUS trung bình:** **6,8 / 100** — Xếp hạng **F** (Bottom 15% — không chấp nhận được).
  - **Điểm UEQ-S trung bình:** **3,99 / 7** (49,9% — thấp hơn ngưỡng trung bình ngành 4,25).
  - **Điểm tùy chỉnh F1–F6:** 3,29 – 3,57 / 5 (thấp nhất: F4 “cần chắc chắn không xóa nhầm” = 3,29).
- **Phát hiện chính (Severity Assessment):** **6 vấn đề hệ thống** xuất hiện ở **7/7 phiên**, **0 lỗi lẻ**. Mức độ cao nhất: **S4 — Catastrophe** (`fakeMassUpdatedProducts` — sửa 1 sản phẩm làm đổi tên toàn bộ bảng). 3 mức S3 (thiếu nút Sửa danh mục · xóa không có confirm · giá mới không update UI), 3 mức S2, 1 mức S1.
- **Bug mới từ phiên usability:** 4 lỗi chức năng → **2 GitHub Issue mới** (#22, #23) + 2 lỗi đã mở ở Task 1 (#2, #5).

### 3.3. Tổng hợp

| Chỉ số | Giá trị |
|---|---|
| Số màn hình / luồng được test | 5 màn hình + 2 khung chung (Task 1) · 1 flow / 4 task (Task 2) |
| Số mục checklist thiết kế | **47** (> 40 ✅) |
| Số mục checklist đã thực thi | **47 / 47 (100%)** |
| Số mục Passed / Failed | **7 / 40** |
| Số bug | **23** (21 Task 1 · 2 Task 2) — GitHub Issues #1–#23 |
| Số người tham gia | **7** |
| Số bản ghi màn hình | **7** (P01–P07) + 1 pilot dry-run |
| Ảnh bằng chứng | **55** (checklist) + **23** (GitHub Issues) = 78 |
| Số commit | **23** |
| Điểm SUS / UEQ-S | **6,8 / 100 (F)** · **3,99 / 7** |

---

## 4. Task 3 — Cross-browser / Cross-platform: chưa thực hiện

| Mục | Nội dung |
|---|---|
| Yêu cầu | Task 1 trên **≥ 3 nền tảng** (Chrome, Firefox, Safari / Android Chrome), ưu tiên BrowserStack / LambdaTest, hoặc Expo Go trên điện thoại thật; mỗi ảnh overlay email sinh viên |
| **Trạng thái** | ❌ **Chưa thực hiện** — tự đánh giá **0/20 điểm** |
| Lý do | Toàn bộ đợt kiểm thử tập trung vào **độ sâu** (47 mục checklist thực thi đầy đủ + 7 phiên người thật) thay vì **độ rộng** nền tảng |
| Đã làm một phần | Kiểm thử **responsive trong cùng trình duyệt**: viewport 375×667, 768×1024 và mô phỏng zoom 200% (GUI-IA01-009, GUI-IA01-013) — **không phải** cross-platform |
| Ảnh overlay email sinh viên | ✅ Có — 55 ảnh bằng chứng checklist và 23 ảnh GitHub Issues đều hiển thị overlay `23120341 · 23120341@student.hcmus.edu.vn` |

---

## 5. Bảng tự đánh giá (HW03 §15)

| No. | Criteria | Grade | Self-Assessed Grade | Ghi chú |
|---|---|---:|---:|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | **30** | 47 mục · thực thi 47/47 · 21 bug + 23 ảnh GitHub Issues |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | **40** | 7 người thật · SUS 6,8 · UEQ-S 3,99 · TCR 85,7% · 8 phát hiện xếp severity |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **0** | **Bỏ qua** — không có trial BrowserStack/LambdaTest và không có thiết bị thật |
| 4 | Agent Skills | 10 | **10** | 3 skill dùng cho chính bài này: `gui-testing`, `usability-testing`, `ai-audit` |
| | **Total** | **100** | **080** | |

### 5.1. Agent Skills đã xây dựng

| Skill | Mục đích | Tái sử dụng được cho | Video demo (YouTube) |
|---|---|---|---|
| `gui-testing` | Thiết kế & thực thi GUI checklist theo 4 Interface Aspect — 7 module, có Gate A (chốt phạm vi) và Gate B (người dùng tự thực thi) | Mọi màn hình web của bất kỳ SUT nào | *(dán link)_ |
| `usability-testing` | Kiểm định khả dụng theo 8 module / 3 phase — planner, scenario, questionnaire, observation, heuristic, severity, improvement, report | Mọi luồng end-to-end của bất kỳ sản phẩm nào | *(dán link)_ |
| `ai-audit` | Trích xuất log prompt/output, tổng hợp lỗi AI, sinh AI Audit Report + AI Critique | Mọi bài tập có yêu cầu khai báo minh bạch AI | *(dán link)_ |

---

## 6. Khai báo AI & AI Audit

- **Khai báo:** **Có sử dụng AI** — OpenCode + MiniMax M3.1 Flash Free (Kite Pro), điều hướng qua 3 Agent Skill.
- **AI Audit Report:** `ai_audit_report/HW03_AI_Audit_Report.md` (+ `.pdf`) — khai báo, nhật ký **13 lượt tương tác** (tên công cụ · ngày giờ · prompt · output), danh sách **8 lỗi AI** kèm biện pháp khắc phục, và đánh giá mức độ tin cậy theo từng loại đầu ra.
- **AI Critique (200–300 từ):** `ai_audit_report/HW03_AI_Critique.md` (+ `.pdf`) — **296 từ**.
- **Nguyên tắc đã giữ:** AI không tự đánh dấu Pass/Fail trong checklist · không bịa dữ liệu người tham gia · không tự quyết định mục nào là bug · không giả lập ảnh cross-platform hay danh sách người tham gia.

---

## 7. Việc cần làm trước khi nộp

| # | Việc | Nơi | Trạng thái |
|---:|---|---|---|
| 1 | Upload 7 bản ghi màn hình `.mp4` lên Google Drive (quyền “Bất kỳ ai có đường liên kết”) và **dán link** | `usability_session_evidence/recordings/README.md` + `usability_session_evidence/README.md` | ⬜ |
| 2 | **Dán link YouTube** cho 3 video demo Agent Skill | §5.1 của file này | ⬜ |
| 3 | Đóng gói thành `23120341_HW03_AI_GUIUsability_080.zip` (HW03 §14) | — | ⬜ |

---

## 8. Tài liệu tham khảo

- Đề bài: `2026.HW03.GUI Usability_En.md` (HW03-AI, FIT — HCMUS)
- SUT: https://github.com/ttbhanh/eshop-sut
- Repository bài làm: https://github.com/kiterakun/HW03-GUI-Usability-Testing
- ISTQB Foundation Level Syllabus (latest edition) · Hardman, P. (2025). *A Post-AI Learning Taxonomy* · Fuster Rabella, M. (2025). *OECD Education Working Paper No. 338* · Anthropic (2025). *Building Reliable AI Test Agents* · DeepEval & Promptfoo documentation

---

*Sinh viên: 23120341 · 23120341@student.hcmus.edu.vn · 2026-11-14.*
