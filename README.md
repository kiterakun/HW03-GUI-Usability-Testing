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
| **Task 2** | Usability Evaluation (7 phiên tham gia thật) | ⏳ Chưa thực hiện | — |
| **Task 3** | Cross-browser / cross-platform (≥ 3 nền tảng) | ⏳ Chưa thực hiện | — |

> **Task 1 đã hoàn tất**: 47 mục checklist thiết kế & **thực thi 47/47** trên SUT thật, 40 mục Failed
> kèm ảnh bằng chứng, 21 bug đã mở trên [GitHub Issues](https://github.com/kiterakun/HW03-GUI-Usability-Testing/issues).
> Task 2 và Task 3 **chưa** thực hiện — các mục liên quan trong báo cáo được đánh dấu rõ là chưa làm,
> không ghi sai những gì chưa có.

---

## 2. Test summary — Task 1

### 2.1 Phạm vi đã test

| | Nội dung |
|---|---|
| **Số màn hình / luồng đã test** | **5** màn hình / luồng trong phân hệ Web Admin: Admin Login, Dashboard Admin, Quản lý Danh mục, Quản lý Sản phẩm (CRUD), Import sản phẩm từ CSV *(+ 2 nhóm "khung chung" dùng chung: Sidebar và Các form)* |
| **Số mục checklist đã thiết kế** | **47** (IA-01: 13 · IA-02: 12 · IA-03: 9 · IA-04: 13) |
| **Số mục đã thực thi** | **47** (100%) — 0 mục bỏ qua, 0 mục N/A |
| **Passed** | **7** |
| **Failed** | **40** |
| **Pass rate** | **14,9%** |
| **Số bug** | **21** (10 Blocker · 11 Major) + 2 vấn đề khả dụng + 5 đề xuất cải tiến *(7 mục này **không** mở Issue)* |
| **Ảnh bằng chứng** | **55** ảnh cho 40 mục Failed — **tất cả đã overlay** `23120341@student.hcmus.edu.vn` |
| **Số người tham gia usability** | **0** — Task 2 chưa thực hiện |
| **Video demo** | ⏳ Chưa có — sẽ bổ sung khi thực hiện Task 2/3 |

### 2.2 Bảng tổng hợp nhanh theo IA

| IA | Số mục | Passed | Failed | Tỷ lệ fail |
|---|---|---|---|---|
| IA-01 General UI Standards | 13 | 2 | 11 | 84,6% |
| IA-02 Forms | 12 | 1 | 11 | 91,7% |
| IA-03 Navigation | 9 | 4 | 5 | 55,6% |
| IA-04 Feedback / State | 13 | 0 | 13 | **100%** |
| **Tổng** | **47** | **7** | **40** | **85,1%** |

### 2.3 Ba khoảng trống kiến trúc được phát hiện

1. **Không có lớp quản lý trạng thái giao diện** → IA-04 fail 100%: không loading, không empty state,
   không success toast, không inline error; mọi lỗi đi qua `window.alert()`.
2. **Form không khai báo ràng buộc dữ liệu** → 11/12 mục IA-02 fail: không `<label>`, không `*`,
   không validate giá > 0, không chặn tên rỗng.
3. **Không có lớp định tuyến** → mất deep-link, F5 mất tab, không có trang 404.

---

## 3. Cấu trúc thư mục

```
HW03-GUI-Usability-Testing/
├── README.md                        ← file này (self-assessment + test summary)
├── git-commit-log.txt               ← git log dạng text (HW03 §12)
└── gui-testing-outputs/             ← toàn bộ artifacts của Task 1
    ├── PROGRESS.md                  ← quản lý tiến độ từng bước
    ├── 01-scope-analysis.md         ← phân tích phạm vi (Gate A)
    ├── 02-ui-analysis.md            ← phân tích UI từ source code + runtime
    ├── 03-gui-checklist.md          ← 47 mục, đã điền Passed/Failed + ảnh + ghi chú
    ├── 04-checklist-review.md       ← review AI (v1→v2→v3) + lý do AI bỏ sót
    ├── 05-test-results.md           ← kết quả & phân tích nguyên nhân gốc
    ├── 07-gui-test-report.md        ← báo cáo GUI Testing tổng hợp
    ├── issue-urls.txt               ← ánh xạ BUG-0xx → GitHub Issue URL
    ├── bugs/                        ← 21 bug report chuẩn (BUG-001 … BUG-021)
    ├── screenshots/                 ← 62 ảnh (55 ảnh bằng chứng đã overlay email + 7 ảnh tham chiếu)
    └── assets/
        ├── checklist-gui-testing.xlsx ← Excel: Checklist / Test Summary / Bug List
        ├── invalid.csv                 ← file mẫu để tái hiện lỗi Import CSV
        ├── quoted.csv
        ├── sanpham.txt
        └── vietnamese.csv
```

### 3.1 Quy trình commit (HW03 §12)

Mỗi bước của quy trình kiểm thử có **một commit riêng**:

| # | Commit | Nội dung |
|---|---|---|
| 1 | `aaa5d47` | `docs(task1): chot pham vi kiem thu GUI cho phan he Web Admin EShop` |
| 2 | `b50a71a` | `docs(task1): phan tich giao dien Web Admin tu source code va runtime` |
| 3 | `7494db3` | `feat(task1): checklist GUI 47 muc theo 4 interface aspects` *(bản thiết kế — cột kết quả để trống)* |
| 4 | `df34dfb` | `test(task1): thuc thi checklist tren SUT that - 47/47 muc, 40 failed` *(bản đã điền kết quả + 62 ảnh)* |
| 5 | `4fa5c65` | `docs(task1): phan tich ket qua va phan loai bug theo nguyen nhan goc` |
| 6 | `2972856` | `fix(task1): 21 bug report chuan hoa kem anh bang chung` |
| 7 | `902b8ce` | `docs(task1): bao cao tong hop GUI testing va README tu danh giá` |
| 8 | `d7a097d` | `chore(task1): ban Excel checklist, file CSV mau va quan ly tien do` |
| 9 | `474e7a7` | `docs(task1): them file git commit log dang text theo yeu cau HW03 §12` |

Toàn bộ log ở dạng text: [`git-commit-log.txt`](git-commit-log.txt).

> ⚠️ **Repo đang để Private.** Ảnh trong GitHub Issues được tham chiếu bằng URL `raw.githubusercontent.com`
> — người xem cần **đăng nhập và có quyền truy cập repo** thì ảnh mới hiển thị. Nếu muốn ảnh hiển thị
> với mọi người (ví dụ giảng viên chưa được thêm làm collaborator), cần chuyển repo sang **Public**
> trong `Settings → General → Danger Zone`, hoặc thêm giảng viên/TAs làm collaborator.
> Trong mỗi issue cũng có mục *"Truy cập ảnh khi không hiển thị"* kèm đường dẫn tương đối trong repo
> để mở trực tiếp từ cây thư mục.

---

## 4. Bug report

21 bug đã được báo trên [GitHub Issues](https://github.com/kiterakun/HW03-GUI-Usability-Testing/issues)
kèm ảnh đính kèm. Ánh xạ BUG → Issue URL nằm ở
[`gui-testing-outputs/issue-urls.txt`](gui-testing-outputs/issue-urls.txt). Chi tiết đầy đủ (mô tả, bước
tái hiện, Actual/Expected, tác động người dùng, ghi chú kỹ thuật) nằm trong
[`gui-testing-outputs/bugs/`](gui-testing-outputs/bugs/).

| ID | Tiêu đề | Mức độ |
|---|---|---|
| BUG-001 | [Web Admin] Mọi form đều không có thẻ `<label>` — placeholder là nhãn duy nhất | Blocker |
| BUG-002 | [Quản lý Sản phẩm / Danh mục] Form không chặn giá âm và tên danh mục rỗng | Blocker |
| BUG-003 | [Quản lý Sản phẩm / Danh mục] Xoá không có hộp thoại xác nhận | Blocker |
| BUG-004 | [Quản lý Sản phẩm] Sửa 1 sản phẩm làm đổi tên của toàn bộ danh sách | Blocker |
| BUG-005 | [Admin Dashboard] Tổng doanh thu nhân đôi | Blocker |
| BUG-006 | [Import CSV] Import không rollback — dòng lỗi vẫn được ghi vào CSDL | Blocker |
| BUG-007 | [Import CSV] Trường CSV bọc dấu nháy kép bị tách sai thành nhiều cột | Blocker |
| BUG-008 | [Web Admin] Không có routing — mất deep-link, F5 mất tab, không có trang 404 | Blocker |
| BUG-009 | [Web Admin] Lỗi toàn bộ báo bằng `alert()` native | Blocker |
| BUG-010 | [Sidebar] Menu không dùng được bằng bàn phím, thiếu landmark `nav` | Blocker |
| BUG-011 | [Admin Login] Form không validate ở client | Major |
| BUG-012 | [Web Admin] Trường bắt buộc không có ký hiệu `*` và không giới hạn 255 ký tự | Major |
| BUG-013 | [Import CSV] Không kiểm tra đuôi `.csv` và không cảnh báo dòng lỗi | Major |
| BUG-014 | [Import CSV] Báo cáo kết quả import thiếu số dòng lỗi | Major |
| BUG-015 | [Admin Dashboard] Thiếu trạng thái loading và empty state | Major |
| BUG-016 | [Web Admin] Thao tác ghi thành công không có thông báo xác nhận | Major |
| BUG-017 | [Admin Login] Nút Login không disable và không có chỉ báo đang xử lý | Major |
| BUG-018 | [Web Admin] Tương phản chữ dưới WCAG AA ở 4 thành phần | Major |
| BUG-019 | [Web Admin] Giao diện còn tiếng Anh, `lang="en"`, `<title>` sai, thiếu `<h1>` | Major |
| BUG-020 | [Quản lý Sản phẩm] Cột "Giá" không có dấu phân cách hàng nghìn | Major |
| BUG-021 | [Admin Dashboard] Lưới KPI vỡ ở viewport 375px | Major |

---

## 5. AI Audit & AI Critique

| Tài liệu | Trạng thái | Đường dẫn |
|---|---|---|
| AI Audit Report | ⏳ Chưa sinh | `ai-audit-outputs/` (skill `ai-audit`) |
| AI Critique (200–300 từ) | ⏳ Chưa sinh | `ai-audit-outputs/ai-critique.md` |
| Báo cáo GUI (Markdown) | ✅ | `gui-testing-outputs/07-gui-test-report.md` |
| Báo cáo GUI (PDF) | ⏳ Chưa xuất | — |

**Khai báo AI (HW03 §9):** bài này **có** sử dụng AI.
**Công cụ:** OpenCode (agent harness) + **MiniMax M3.1 Flash Free**.
**Phạm vi sử dụng:** phân tích source code của SUT; sinh & review checklist GUI 47 mục theo 4
Interface Aspects; khảo sát runtime bằng Chrome DevTools Protocol (đo WCAG contrast, kiểm tra
focus order, responsive, dark mode, RTL, parse CSV thật); phân tích nguyên nhân gốc và gom 40 mục
Failed thành 21 bug; viết bug report và báo cáo.
**Ranh giới:** AI **không** tự đánh dấu Passed/Failed, **không** tự tạo bug, **không** tự quyết
định cái nào là bug thật. Toàn bộ kết quả kiểm thử và ảnh bằng chứng do sinh viên tự thực thi và
tự kiểm chứng.

---

## 6. Bảng tự đánh giá (HW03 §15)

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | **28** |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | **0** *(chưa thực hiện)* |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **0** *(chưa thực hiện)* |
| 4 | Agent Skills | 10 | **10** |
| | **Total** | **100** | **38** *(tạm tính, chỉ Task 1 + Agent Skills)* |

**Ghi chú về tự đánh giá Task 1 (28/30):**
- Đạt: 47 mục (>40), phủ đủ 4 IA, mỗi IA ≥ 8 mục; 47/47 được thực thi; 40/40 mục Failed có ghi chú
  *và* ảnh bằng chứng; 21 bug chuẩn hoá theo nguyên nhân gốc, mỗi bug có bước tái hiện đủ để người
  khác tái hiện; 21 Issue trên GitHub kèm ảnh; Excel checklist 3 sheet; ảnh đã overlay email.
- Trừ 2 điểm: Task 3 (cross-platform) chưa thực hiện nên chưa có bằng chứng liên nền tảng cho
  màn hình; và phần **AI Audit Report + AI Critique** (bắt buộc theo §9/§10) chưa sinh.
- Điểm cộng về quy trình: có đầy đủ 3 tầng review (AI tự review → AI bổ sung 10 mục kèm mã lý do
  "AI bỏ sót" → người học review và yêu cầu rút gọn 77→47 mục, bỏ FR-21..24).

---

## 7. Tài liệu tham chiếu

| Tài liệu | Đường dẫn |
|---|---|
| Đặc tả SRS của SUT | `eshop-sut/README.md` (FR-01…FR-19, §8 yêu cầu giao diện) |
| Đề bài HW03 | `2026.HW03.GUI Usability_En.md` |
| Git commit log (dạng text) | `git-commit-log.txt` |
| GitHub Issues | https://github.com/kiterakun/HW03-GUI-Usability-Testing/issues |
