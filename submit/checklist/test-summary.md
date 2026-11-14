# Test Summary — HW03-AI (GUI & Usability Testing)

> **HW03 §14 — “The Excel checklist (more than 40 items) **and the test summary**.”**
> File này là bản test summary bằng văn bản; bản tính toán nằm trong
> `checklist-gui-testing.xlsx` — sheet **“Test Summary”** (cùng file, cùng thư mục).

| Trường | Nội dung |
|---|---|
| **Bài tập** | HW03-AI — GUI & Usability Testing |
| **Sinh viên** | 23120341 — 23120341@student.hcmus.edu.vn |
| **SUT** | EShop — phân hệ **Web Admin** (`eshop-sut/frontend-admin`) @ commit `85af3ba` |
| **Môi trường** | Chrome 157 / Edge · Windows 11 · viewport 1440×900 (+375×667, 768×1024) · `http://localhost:5174` (API `:3000`) |
| **Tài khoản test** | `admin@eshop.com` / `Admin123!` · `test@eshop.com` / `Test1234!` |
| **Ngày** | 2026-11-11 → 2026-11-14 |
| **Excel** | `checklist-gui-testing.xlsx` — 3 sheet: **Checklist** (47 mục × 10 cột) · **Test Summary** · **Bug List** (21 bug) |

---

## 1. Test summary — Task 1 (GUI Checklist)

### 1.1. Số màn hình / luồng đã test

| # | Màn hình / vùng kiểm thử | Số mục riêng | Passed | Failed | Tỷ lệ fail |
|---:|---|---:|---:|---:|---:|
| 1 | Admin Login | 10 | 0 | 10 | **100%** |
| 2 | Dashboard Admin | 4 | 0 | 4 | **100%** |
| 3 | Quản lý Danh mục | 1 | 0 | 1 | **100%** |
| 4 | Quản lý Sản phẩm (CRUD) | 10 | 3 | 7 | 70,0% |
| 5 | Import sản phẩm từ CSV | 7 | 1 | 6 | 85,7% |
| 6 | Khung chung – Sidebar | 10 | 3 | 7 | 70,0% |
| 7 | Khung chung – Các form / Các màn hình | 5 | 0 | 5 | **100%** |
| | **Tổng** | **47** | **7** | **40** | **85,1%** |

> 5 màn hình thật + 2 nhóm “khung chung” dùng chung = **7 vùng kiểm thử**.

### 1.2. Số mục checklist

| Chỉ số | Giá trị | Yêu cầu | Đạt |
|---|---:|---|:--:|
| Số mục **thiết kế** | **47** | > 40 | ✅ |
| Số mục **đã thực thi** | **47 / 47 (100%)** | thực thi đủ | ✅ |
| Số mục **Passed** | **7** | — | — |
| Số mục **Failed** | **40** | — | — |
| **Pass rate** | **14,9%** | — | — |
| Mục bị bỏ qua / N/A | 0 | — | ✅ |
| Mục Failed thiếu bằng chứng ảnh | **0** | ảnh cho mọi mục Failed | ✅ |
| IA-01 | 13 | ≥ 8 | ✅ |
| IA-02 | 12 | ≥ 8 | ✅ |
| IA-03 | 9 | ≥ 8 | ✅ |
| IA-04 | 13 | ≥ 8 | ✅ |
| Mục accessibility | 6 | ≥ 2 | ✅ |
| Mục RTL / dark mode / responsive | 1 / 1 / 2 | ≥ 1 / ≥ 1 / ≥ 2 | ✅ |

### 1.3. Phân bổ mức độ

| Mức độ | Số mục trong 47 | Số mục Failed | Tỷ lệ trong 40 mục Failed |
|---|---:|---:|---:|
| Blocker | 14 | 13 | 32,5% |
| Major | 25 | 22 | 55,0% |
| Minor | 8 | 5 | 12,5% |
| Cosmetic | 0 | 0 | 0% |
| **Tổng** | **47** | **40** | **100%** |

### 1.4. Số bug

| Chỉ số | Giá trị |
|---|---:|
| **Tổng số bug** | **21** |
| — Blocker | 10 |
| — Major | 11 |
| — Minor / Cosmetic | 0 / 0 |
| Vấn đề khả dụng (không mở Issue) | 2 |
| Đề xuất cải tiến (không mở Issue) | 5 |
| GitHub Issues đã mở | 21 (#1–#21) |
| Ảnh bằng chứng | 55 (tất cả đều overlay email sinh viên) |
| Nguyên nhân gốc chiếm nhiều nhất | `RC-IMP` — 24/40 mục Failed (60,0%) |

---

## 2. Test summary — Task 2 (Usability Evaluation)

| Chỉ số | Giá trị | Yêu cầu | Đạt |
|---|---:|---|:--:|
| **Số người tham gia thật** | **7** (P01–P07) | 7 | ✅ |
| Số phiên | 7 | 7 | ✅ |
| Người ngoài lớp HW03 | 7/7 | 100% | ✅ |
| Người ngoài ngành IT/QA | 7/7 | ưu tiên | ✅ |
| Thông tin liên hệ che 4 số giữa | 7/7 | 100% | ✅ |
| Số flow end-to-end | 1 (4 task: T4 → T1 → T2 → T3) | 1 | ✅ |
| Task Completion Rate (TB) | **85,7%** | — | — |
| — T4 Đăng nhập | 100,0% | — | — |
| — T1 Dashboard | 92,9% | — | — |
| — T2 Danh mục | **50,0%** | — | ⚠️ |
| — T3 Sản phẩm | 100,0% | — | — |
| **Điểm SUS trung bình** | **6,8 / 100 — hạng F** | đo bằng thang chuẩn | ✅ |
| **Điểm UEQ-S trung bình** | **3,99 / 7 (49,9%)** | đo bằng thang chuẩn | ✅ |
| Điểm tùy chỉnh F1–F6 | 3,29 – 3,57 / 5 | — | ✅ |
| Số phát hiện | **8 vấn đề hệ thống** · 0 lỗi lẻ | — | — |
| Mức độ cao nhất | **S4 — Catastrophe** | xếp theo Thang A Nielsen | ✅ |
| Bug chức năng | 4 lỗi → 2 Issue mới (#22, #23) + 2 Issue đã mở ở Task 1 | — | ✅ |
| Đề xuất cải tiến | 5 (IM-01…IM-05) | — | ✅ |
| Bản ghi màn hình | 7 tệp `.mp4` (P01–P07) + 1 pilot | “where available” | ✅ |
| Phiên pilot với người thật | ⚠️ **chưa chạy** (mới có dry-run kỹ thuật) | ≥ 1 | ⚠️ |

---

## 3. Tổng hợp toàn bài

| Chỉ số | Task 1 | Task 2 | Tổng |
|---|---|---|---|
| Số màn hình / luồng test | 5 màn hình + 2 khung chung | 1 flow / 4 task | 6 màn hình · 4 task |
| Số mục checklist thiết kế | 47 | — | **47** |
| Số mục đã thực thi | 47/47 | 28 task (7 × 4) | **75 lượt thực thi** |
| Passed | 7 | 27 task hoàn thành | — |
| Failed | 40 | 6 task cần trợ giúp + 1 dừng | — |
| **Số bug** | 21 | 2 | **23** |
| Số vấn đề khả dụng + cải tiến | 2 + 5 | 6 vấn đề hệ thống | 13 |
| Số người tham gia | — | 7 | **7** |
| Ảnh bằng chứng | 55 | 23 (GitHub Issues) | **78** |
| Số commit | 13 | 8 | **21** |
| Video demo skill | — | — | *(xem `../README.md`)* |

---

## 4. Task 3 — Cross-browser / Cross-platform

| Mục | Trạng thái |
|---|---|
| Yêu cầu | Task 1 trên **≥ 3 nền tảng** (Chrome, Firefox, Safari / Android Chrome), ưu tiên BrowserStack / LambdaTest hoặc Expo Go trên điện thoại thật; mỗi ảnh overlay email sinh viên |
| **Trạng thái** | ❌ **Chưa thực hiện** — tự đánh giá **0/20 điểm** |
| Đã làm trong hướng tiếp cận này | Responsive trong cùng trình duyệt: viewport 375×667, 768×1024 và mô phỏng zoom 200% (GUI-IA01-009, GUI-IA01-013) — **không phải** cross-platform |
| Ảnh overlay email sinh viên | ✅ 55 ảnh bằng chứng checklist + 23 ảnh GitHub Issues đều có overlay `23120341 · 23120341@student.hcmus.edu.vn` |

---

## 5. Bảng tự đánh giá (HW03 §15)

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---:|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | **30** |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | **40** |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | **0** *(bỏ qua)* |
| 4 | Agent Skills | 10 | **10** |
| | **Total** | **100** | **080** |

---

*Sinh viên: 23120341 · 23120341@student.hcmus.edu.vn · HW03-AI — GUI & Usability Testing · 2026-11-14.*
