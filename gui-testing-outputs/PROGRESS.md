# PROGRESS — GUI Testing

> File quản lý tiến độ & output của skill `gui-testing`.
> Cập nhật file này sau **mỗi** bước, trước khi chuyển sang bước tiếp theo.

## Metadata

| Trường | Giá trị |
|---|---|
| SUT | EShop — Web Admin (`eshop-sut/frontend-admin`) |
| Phiên bản / commit | `85af3ba` — React 19.2 + Vite 8 + Tailwind 3.4 |
| Người thực hiện | AI (OpenCode / MiniMax M3.1 Flash) + người dùng review |
| Ngày bắt đầu | 2026-11-11 |
| Ngày kết thúc | _(chưa xác định)_ |
| Môi trường test | `http://localhost:5174` (admin) + `http://localhost:3000/api` (backend) · Chrome desktop · admin@eshop.com / Admin123! |
| AI tools đã dùng | OpenCode + MiniMax M3.1 Flash Free |

## Trạng thái các bước

| # | Bước | Module | Trạng thái | Artifact | Ngày | Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Scope Analyzer | `modules/phase01/01-scope-analyzer.md` | ✅ done | `01-scope-analysis.md` | 2026-11-11 | Gate A đã qua: user chốt 5 luồng, credential `Admin123!`, chuẩn 4 IA + FR-21..24, chỉ Phase 01 |
| 2 | UI Analyzer | `modules/phase01/02-ui-analyzer.md` | ✅ done | `02-ui-analysis.md` | 2026-11-11 | Đọc source `App.jsx` (922 dòng) **và** khảo sát runtime bằng Chrome headless/CDP: đo contrast, focus order, responsive 375px, preview CSV |
| 3 | Checklist Generator | `modules/phase01/03-checklist-generator.md` | ✅ done | `03-gui-checklist.md` | 2026-11-11 | v1 = 67 mục; đã kiểm bằng script: 0 trùng, 100% cột Kết quả trống |
| 4 | Checklist Reviewer | `modules/phase01/04-checklist-reviewer.md` | ✅ done | `04-checklist-review.md` | 2026-11-11 (v2) → **2026-11-12 (v3)** | v2 = 77 mục; **v3 = 47 mục** theo yêu cầu user: bỏ FR-21..24, rút gọn bằng gộp 8 nhóm trùng lặp + bỏ 7 mục giá trị thấp |
| — | **GATE: người dùng thực thi checklist trên SUT thật** | — | ⛔ blocked | — | | Sẵn sàng — cần user điền Passed/Failed + ảnh bằng chứng |
| 5 | Test Result Analyzer | `modules/phase02/05-test-result-analyzer.md` | ✅ done | `05-test-results.md` | 2026-11-12 | 47/47 mục đã thực thi · 7 Passed / 40 Failed (pass rate 14,9%) · 40/40 Failed có ghi chú + ảnh · gom thành **21 bug** + 2 vấn đề khả dụng + 5 cải tiến |
| 6 | Bug Report Generator | `modules/phase02/06-bug-report-generator.md` | ✅ done | `bugs/BUG-001..021.md` | 2026-11-12 | 21 bug (10 Blocker, 11 Major), mỗi file kèm bước tái hiện + ảnh + khối "Nội dung post GitHub Issues" |
| 7 | GUI Report Generator | `modules/phase02/07-gui-report-generator.md` | ✅ done | `07-gui-test-report.md` | 2026-11-12 | Báo cáo tổng hợp đầy đủ 13 mục; §9 Cross-browser ghi **trống có chủ đích** (Task 3 chưa làm) |

Trạng thái: `⬜ todo` → `🟡 doing` → `✅ done` → `⛔ blocked` → `⚠️ done (có vấn đề)`.

## Checklist chất lượng (điền khi hoàn tất Phase 01)

| Tiêu chí | Yêu cầu | Thực tế | Đạt? |
|---|---|---|---|
| Tổng số mục checklist | > 40 | 47 (v3, rút gọn từ 77) | ✅ |
| Mỗi IA có ≥ 8 mục | 4 IA | 13 / 12 / 9 / 13 | ✅ |
| Số màn hình được cover | ≥ 2 | 7 vùng (Login, Dashboard, Danh mục, Sản phẩm, Import CSV, Khung chung–Sidebar, Khung chung–Các form) | ✅ |
| Có mục accessibility (bàn phím, screen reader) | ≥ 2 | 6 | ✅ |
| Có mục RTL layout | ≥ 1 | 1 (GUI-IA01-007) | ✅ |
| Có mục dark mode | ≥ 1 | 1 (GUI-IA01-008) | ✅ |
| Có mục responsive | ≥ 2 | 2 (GUI-IA01-009 lưới KPI, GUI-IA01-013 zoom 200%) | ✅ |
| Mỗi mục có cách kiểm chứng cụ thể | 100% | 47/47 | ✅ |
| Không có 2 mục trùng tiêu chí + màn hình | 0 trùng | 0 (kiểm bằng script) | ✅ |
| Có ghi lý do AI bỏ sót cho các mục bổ sung | ≥ 5 mục | 10 mục (mã PROMPT/MODEL/APP-CHAR/DOMAIN/HIDDEN/ACCESS) | ✅ |
| Tiêu chuẩn phân loại chỉ dùng 4 IA | không trộn FR-xx | 0 mã FR-xx trong checklist | ✅ |
| Người dùng đã review checklist | có xác nhận | ⏳ chờ user (Gate B) | ⬜ |

## Kết quả kiểm thử (điền sau Phase 02)

| Chỉ số | Giá trị |
|---|---|
| Tổng mục đã thực thi | 47 / 47 (100%) |
| Passed | 7 |
| Failed | 40 |
| Pass rate (%) | **14,9%** |
| Số bug đã tạo | **21** (dự kiến — chờ duyệt Gate B của Module 6) |
| Blocker / Major / Minor / Cosmetic | 10 / 9 / 2 / 0 (trong 21 bug) · theo mục Failed: 13 / 22 / 5 / 0 |
| Mục thiếu bằng chứng ảnh | **0** (55 ảnh cho 40 mục Failed) |
| Vấn đề khả dụng (không mở Issue) | 2 — GUI-IA01-002, GUI-IA01-012 |
| Cải tiến đề xuất (không mở Issue) | 5 — GUI-IA01-008, GUI-IA02-005, GUI-IA03-004, GUI-IA03-007, GUI-IA04-011 |

## Phân bổ theo IA

| IA | Số mục | Failed | Tỷ lệ fail |
|---|---|---|---|
| IA-01 General UI Standards | 13 | 11 | 84,6% |
| IA-02 Forms | 12 | 11 | 91,7% |
| IA-03 Navigation | 9 | 5 | 55,6% |
| IA-04 Feedback / State | 13 | 13 | **100%** |

## Ghi chú điều chỉnh của người dùng

_(Ghi lại mọi thay đổi người dùng yêu cầu ở từng bước — đây là bằng chứng cho phần "human review"
mà HW03 chấm điểm.)_

| Bước | Ngày | Người dùng yêu cầu thay đổi gì | Kết quả |
|---|---|---|---|
| 1 (Scope Analyzer) | 2026-11-11 | Chốt SUT = `frontend-admin` @ localhost:5174 + backend :3000; credential `admin@eshop.com` / `Admin123!` (xác nhận mâu thuẫn với `setup_guide.md`) | Ghi vào `01-scope-analysis.md` §1; credential chuẩn hoá thành 1 mục kiểm chứng |
| 1 (Scope Analyzer) | 2026-11-11 | Tách "Import CSV" thành luồng/màn hình riêng thay vì gộp trong Sản phẩm | Phạm vi chốt 5 luồng + Khung chung (Sidebar) = 6 vùng cover |
| 1 (Scope Analyzer) | 2026-11-11 | Dùng chuẩn **4 IA + FR-21..FR-24** của đặc tả | ~~Bị ghi đè ở v3~~ — xem dòng 2026-11-12 |
| 1 (Scope Analyzer) | 2026-11-11 | Chỉ chạy **Phase 01**, dừng sau bước 4 để user tự thực thi | Skill dừng ở Gate B; Module 5–7 chưa mở |
| **4 (Checklist Review)** | **2026-11-12** | **"Bỏ đi FR-21..24, chỉ cần 4 IA thôi"** | Đã bỏ toàn bộ mã FR-21..FR-24 khỏi cột "Tiêu chí kiểm chứng". Trong `02-ui-analysis.md` các tham chiếu FR-21..24 → "đặc tả SRS §8" + ghi chú đây chỉ là ngữ cảnh nghiệp vụ, không phải tiêu chuẩn phân loại. `01-scope-analysis.md` §1/§4/§5 cập nhật theo |
| **4 (Checklist Review)** | **2026-11-12** | **"Giảm bớt checklist, 77 là quá nhiều và dư thừa"** | Rút gọn **77 → 47 mục (−39%)**: gộp 8 nhóm mục trùng lặp (~23 mục → 8 mục "áp dụng chung"), bỏ 7 mục giá trị thấp. Chi tiết từng nhóm gộp/bỏ ở `04-checklist-review.md` §5. Vẫn đạt: >40 mục, mỗi IA ≥8 (13/12/9/13), 0 trùng, 100% cột Kết quả trống |

## Tài liệu còn thiếu / việc chưa xong

- [x] ⏳ **User review + xác nhận checklist** (bước 4) — user yêu cầu bỏ FR-21..24 + rút gọn 77→47
- [x] ⏳ **User thực thi 47 mục checklist** — 47/47 có kết quả, 40 Failed kèm ghi chú + ảnh
- [x] Ảnh chụp cho tất cả mục Failed (55 ảnh, đã overlay email sinh viên)
- [x] Bảng tính Excel checklist — `assets/checklist-gui-testing.xlsx` (3 sheet: Checklist / Test Summary / Bug List)
- [x] 21 bug report chuẩn hoá — `bugs/BUG-001..021.md`
- [ ] **GitHub Issues** — 21 issue trên `kiterakun/HW03-GUI-Usability-Testing` kèm ảnh đính kèm
- [ ] **Git commit log** — `git-commit-log.txt` (theo yêu cầu HW03 §12: mỗi bước 1 commit)
- [ ] **AI Audit Report** + **AI Critique 200–300 từ** (skill `ai-audit`) — bắt buộc theo HW03 §9, §10
- [ ] **Task 2 — Usability Evaluation** (7 phiên, SUS/UEQ-S) — chưa thực hiện
- [ ] **Task 3 — Cross-browser / cross-platform** (≥3 nền tảng, overlay email) — chưa thực hiện; `07-gui-test-report.md` §9 ghi trống có chủ đích
- [ ] Bản PDF của báo cáo chính (HW03 §14 yêu cầu Markdown + PDF)
