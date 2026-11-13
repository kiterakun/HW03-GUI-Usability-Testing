# HW03 — GUI & Usability Testing · EShop

> **Bài tập cá nhân — Exercise ID: HW03-AI**  
> Sinh viên: **23120341** — 23120341@student.hcmus.edu.vn  
> SUT: **EShop** — phân hệ **Web Admin** (`eshop-sut/frontend-admin`) — https://github.com/ttbhanh/eshop-sut  
> Repository này: https://github.com/kiterakun/HW03-GUI-Usability-Testing  

---

## 1. Trạng thái các task

| Task | Nội dung | Trạng thái | Thư mục |
|---|---|---|---|
| **Task 1** | GUI Checklist (thiết kế + thực thi + bug report) | ✅ **Hoàn thành** | [`gui-testing-outputs/`](gui-testing-outputs/) |
| **Task 2** | Usability Evaluation (7 phiên tham gia thật + phân tích) | ✅ **Hoàn thành** | [`usability-testing-outputs/`](usability-testing-outputs/) |
| **Task 3** | Cross-browser / cross-platform (≥ 3 nền tảng) | ⏳ Bỏ qua | — |

> **Task 1 & Task 2 đã hoàn tất**: 47 mục GUI checklist thiết kế & thực thi 47/47 trên SUT thật, 21 bug Task 1 và 2 bug Task 2 đã mở trên [GitHub Issues](https://github.com/kiterakun/HW03-GUI-Usability-Testing/issues). Kiểm định khả dụng chạy với 7 người thật (P01–P07), chấm SUS & UEQ-S, phân tích 10 Heuristics của Nielsen và xếp mức độ severity.

---

## 2. Test summary — Task 1 & Task 2

### 2.1 Task 1: GUI Checklist
- **Số màn hình / luồng đã test:** 5 màn hình trong phân hệ Web Admin (Login, Dashboard, Danh mục, Sản phẩm CRUD, Import CSV).
- **Số mục checklist:** 47 mục (IA-01: 13, IA-02: 12, IA-03: 9, IA-04: 13).
- **Kết quả thực thi:** 47/47 mục đã chạy — 7 Passed, 40 Failed.
- **Bug đã ghi nhận:** 21 bug (10 Blocker, 11 Major) đã tạo GitHub Issues (#1 đến #21).

### 2.2 Task 2: Usability Evaluation
- **Flow được test:** Đăng nhập (FR-12) → Dashboard (FR-13) → Danh mục CRUD (FR-14) → Sản phẩm CRUD (FR-15).
- **Số người tham gia:** 7 người thật ngoài lớp học (P01–P07), thông tin liên hệ được che 4 số giữa (`participants/participants.md`).
- **Chỉ số định lượng:**
  - **Task Completion Rate (TCR) trung bình:** **85.7%** (T4: 100%, T1: 92.9%, T2: 50.0%, T3: 100%).
  - **Điểm SUS trung bình:** **6.8 / 100** — Xếp hạng **F** (Mức kém — Không chấp nhận được).
  - **Điểm UEQ-S trung bình:** **3.99 / 7** (49.9% tối đa — Dưới trung bình ngành 4.25).
- **Phát hiện chính (Severity Assessment):** 6 vấn đề hệ thống (1 Catastrophe S4: `fakeMassUpdatedProducts`; 3 Major S3: thiếu nút Sửa danh mục, xóa không confirm, giá mới không update UI; 2 Minor S2; 1 Cosmetic S1). Đã tạo thêm GitHub Issues #22 và #23.

---

## 3. Cấu trúc thư mục

```
HW03-GUI-Usability-Testing/
├── README.md                        ← file này (self-assessment + test summary)
├── git-commit-log.txt               ← git log dạng text (HW03 §12)
├── ai-audit-outputs/                ← AI Audit Report & AI Critique (HW03 §9, §10)
│   ├── PROGRESS.md
│   ├── conversation-2026-11-12-1941-kiem-thu-gui-eshop-admin.md
│   ├── mistakes-2026-11-12-1941-kiem-thu-gui-eshop-admin.md
│   ├── conversation-2026-11-13-1636-kiem-thu-usability-eshop-admin.md
│   ├── mistakes-2026-11-13-1636-kiem-thu-usability-eshop-admin.md
│   └── ai-critique.md               ← đoạn AI Critique 250 từ (HW03 §10)
├── gui-testing-outputs/             ← toàn bộ artifacts của Task 1
│   ├── PROGRESS.md
│   ├── 01-scope-analysis.md
│   ├── 02-ui-analysis.md
│   ├── 03-gui-checklist.md
│   ├── 04-checklist-review.md
│   ├── 05-test-results.md
│   ├── 07-gui-test-report.md
│   ├── issue-urls.txt
│   ├── bugs/                        ← 21 bug report (BUG-001 … BUG-021)
│   ├── screenshots/                 ← 62 ảnh (55 ảnh bằng chứng đã overlay email)
│   └── assets/
│       ├── checklist-gui-testing.xlsx
│       └── ...
└── usability-testing-outputs/       ← toàn bộ artifacts của Task 2
    ├── PROGRESS.md
    ├── 01-evaluation-plan.md
    ├── 02-task-scenarios.md
    ├── 03-questionnaire.md
    ├── 04-usability-results-consolidation.md
    ├── 05-heuristic-findings.md
    ├── 06-severity-assessment.md
    ├── 07-improvements.md
    ├── 08-usability-report.md
    ├── responses.csv
    ├── participants/                ← danh sách 7 người + consent form
    ├── 04-participant-notes/        ← ghi chú phiên P01–P07
    └── pilot-run/                   ← log & báo cáo dry-run kỹ thuật + ảnh
```

---

## 4. Bảng tự đánh giá (HW03 §15)

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | **30** |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | **40** |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **0** *(bỏ qua)* |
| 4 | Agent Skills | 10 | **10** |
| | **Total** | **100** | **080** |

---

## 5. Khai báo AI & AI Audit

- **Khai báo:** Có sử dụng AI (OpenCode + MiniMax M3.1 Flash / Kite Pro).
- **AI Audit Report:** Toàn bộ log tương tác được lưu tại `ai-audit-outputs/`.
- **AI Critique:** Lưu tại `ai-audit-outputs/ai-critique.md` (250 từ, phản tỉnh về sai sót của AI trong việc tạo script seed DB và quản lý kịch bản).
