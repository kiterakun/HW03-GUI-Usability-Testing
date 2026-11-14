# Usability Session Evidence — 7 phiên kiểm định khả dụng

> **HW03 §14 — “The usability-session evidence (task scenario, observation notes, SUS / UEQ-S responses, "
  "severity-ranked findings, and screen recordings where available) together with the table of 7 participants.”**
>
> Thư mục này là toàn bộ bằng chứng cho **Task 2 — Usability Evaluation** của bài HW03-AI
> (EShop — phân hệ Web Admin, flow FR-12 → FR-13 → FR-14 → FR-15, 7 người tham gia thật).

---

## 1. Danh mục bằng chứng

| # | Tệp | Nội dung | Yêu cầu HW03 |
|---:|---|---|---|
| 01 | [`01-task-scenarios.md`](01-task-scenarios.md) | **Task scenario** đầy đủ cho 4 task: bối cảnh, mục tiêu, ràng buộc, tiêu chí thành công, chỉ số phụ C1–C5, kịch bản moderator, quy trình reset DB, đặc tả dữ liệu mẫu | ✅ Task scenario |
| 02 | [`02-evaluation-plan.md`](02-evaluation-plan.md) | Kế hoạch đánh giá: mục tiêu M1–M4, hồ sơ người tham gia, kịch bản phiên, công cụ đo, tuyển dụng & lịch phiên, chuẩn bị môi trường, rủi ro kế hoạch | ✅ |
| 03 | [`03-questionnaire.md`](03-questionnaire.md) | Bộ bảng hỏi đầy đủ: SUS 10 câu · UEQ-S 26 câu · F1–F6 · probe E1–E11 · đánh giá nhiệm vụ (Phần D) | ✅ |
| 04 | [`04-sus-ueq-responses.md`](04-sus-ueq-responses.md) | **SUS / UEQ-S responses** của 7 phiên — bảng thô, bảng điểm từng câu, 6 chất lượng, F1–F6, kết quả từng task | ✅ SUS / UEQ-S responses |
| 04b | [`03-sus-ueq-responses.csv`](03-sus-ueq-responses.csv) | Dữ liệu thô 7 dòng — nguồn gốc duy nhất của mọi con số | ✅ |
| 05 | [`05-participants-table.md`](05-participants-table.md) | **Bảng 7 người tham gia** (che 4 số giữa) + đối chiếu yêu cầu tuyển dụng | ✅ Bảng 7 người tham gia |
| 05b | [`05-session-notes/`](05-session-notes/) | **Ghi chú quan sát 7 phiên** — mỗi file theo mẫu `TEMPLATE-session-notes.md`: trạng thái phiên, hồ sơ, kết quả từng task, timeline trích từ video, điểm nhiễm, trợ giúp, bảng hỏi, trích dẫn probe, ghi chú khác | ✅ Observation notes |
| 06 | [`06-heuristic-findings.md`](06-heuristic-findings.md) | Gán nhãn **10 Heuristics của Nielsen** cho 8 phát hiện | ✅ |
| 07 | [`07-severity-ranked-findings.md`](07-severity-ranked-findings.md) | **Xếp hạng severity** theo Thang A Nielsen (0–4) + ma trận ưu tiên + tách 4 bug chức năng | ✅ Severity-ranked findings |
| 08 | [`08-improvements.md`](08-improvements.md) | 5 đề xuất cải tiến (P1/P2) kèm tiêu chí thành công đo được + re-test plan | ✅ |
| 09 | [`09-usability-results-consolidation.md`](09-usability-results-consolidation.md) | Bảng tổng hợp kết quả: TCR, SUS, UEQ-S, F1–F6, điểm nhiễm, lỗi lẻ vs vấn đề hệ thống, đối chiếu M1–M4 | ✅ |
| 10 | [`10-consent-form.md`](10-consent-form.md) | Văn bản đồng ý tham gia (chỉ quay màn hình, **không ghi âm**) | ✅ |
| 11 | [`recordings/README.md`](recordings/README.md) | **Bản ghi màn hình 7 phiên** — bảng trỏ link Google Drive (do sinh viên dán link sau khi upload) | ✅ Screen recordings |

---

## 2. Bản ghi màn hình (screen recordings)

Bản ghi màn hình từng phiên nằm trong thư mục `recordings/` của bộ hồ sơ gốc
(`usability-testing-outputs/recordings/`) — tổng dung lượng ≈ 590 MB, vượt quá giới hạn nhiều nền tảng nộp bài.

**Cách xử lý:** 7 tệp `.mp4` được **upload lên Google Drive** và thay bằng **link chia sẻ** trong bảng bên dưới.
> ⚠️ **Sinh viên cần dán link vào cột “Link Google Drive” trước khi nộp.**
> Nhớ đặt quyền chia sẻ **“Bất kỳ ai có đường liên kết”** để TA tải được.

| Mã | Tệp gốc | Thời lượng | Link Google Drive | *(chờ sinh viên dán)* |
|---|---|---|---|---|
| P01 | `recordings/P01.mp4` | ~18 phút | _(dán link)_ | |
| P02 | `recordings/P02.mp4` | ~21 phút | _(dán link)_ | |
| P03 | `recordings/P03.mp4` | ~16 phút | _(dán link)_ | |
| P04 | `recordings/P04.mp4` | ~20 phút | _(dán link)_ | |
| P05 | `recordings/P05.mp4` | ~18 phút | _(dán link)_ | |
| P06 | `recordings/P06.mp4` | ~26 phút | _(dán link)_ | |
| P07 | `recordings/P07.mp4` | ~19 phút | _(dán link)_ | |
| Pilot | `recordings/Pilot.mp4` | dry-run kỹ thuật | *(dán link)_ | |

> **Ghi chú:** đây là **bản ghi màn hình tự ghi (self-recorded)** — không có bản ghi âm giọng nói.
> Vì vậy phản hồi định tính trong `05-session-notes/` được lấy từ **hành vi quan sát trên video** kết hợp
> **file ghi chú bằng chữ** (`ghi-chu.md`) của người tham gia — hai nguồn được ghi rõ trong từng file.

---

## 3. Bản đồ tương quan giữa các tài liệu

```
02-evaluation-plan.md  ──►  01-task-scenarios.md  ──►  03-questionnaire.md
        (mục tiêu M1–M4)      (4 task, tiêu chí)        (SUS/UEQ-S/F1–F6/E1–E11)
                                    │
                                    ▼
                        recordings/P0*.mp4  (7 bản ghi)
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
  05-session-notes/          03-sus-ueq-responses.csv     04-sus-ueq-responses.md
  (7 file, theo mẫu)          (dữ liệu thô)                (điểm SUS/UEQ-S/TCR)
        └───────────────────────────┼───────────────────────────┘
                                    ▼
                      09-usability-results-consolidation.md
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
        06-heuristic-findings.md        07-severity-ranked-findings.md
                    │                               │
                    └───────────────┬───────────────┘
                                    ▼
                         08-improvements.md
                                    │
                                    ▼
                    2 GitHub Issues: #22, #23
```

---

## 4. Các con số chính của đợt kiểm định khả dụng

| Chỉ số | Giá trị | Nguồn |
|---|---|---|
| Số phiên / người tham gia | 7 / 7 | `05-participants-table.md` |
| Task Completion Rate (TB) | **85,7%** | `09-usability-results-consolidation.md` §3 |
| TCR theo task | T4 100% · T1 92,9% · T2 50,0% · T3 100% | `09-…` §3 |
| Điểm SUS trung bình | **6,8 / 100** — hạng **F** (Bottom 15%) | `09-…` §4 · `04-sus-ueq-responses.md` §1 |
| Điểm UEQ-S trung bình | **3,99 / 7** (49,9%) — thấp hơn ngưỡng ngành 4,25 | `09-…` §5 |
| Điểm tùy chỉnh F1–F6 | 3,29 – 3,57 / 5 | `04-sus-ueq-responses.md` §3 |
| Phát hiện usability | **8 vấn đề hệ thống** (7/7 phiên) · **0 lỗi lẻ** | `07-severity-ranked-findings.md` |
| Mức độ cao nhất | **S4 — Catastrophe** (sửa sản phẩm đổi tên toàn bộ bảng) | `07-…` §1 |
| Bug chức năng từ phiên usability | 4 lỗi → 2 GitHub Issue mới (#22, #23) + 2 lỗi đã mở ở Task 1 (#2, #5) | `07-…` §3 |
| Đề xuất cải tiến | 5 (IM-01…IM-05): 3 P1 + 2 P2 | `08-improvements.md` |
| Thời gian TB mỗi task | T4 1,9′ · T1 3,0′ · T2 4,6′ · T3 5,5′ | `04-sus-ueq-responses.md` §4 |

---

## 5. Mẫu ghi chú phiên

File mẫu gốc: `usability-testing-outputs/04-participant-notes/TEMPLATE-session-notes.md`
(cũng được sao chép tại `05-session-notes/TEMPLATE-session-notes.md`).

Mỗi file ghi chú phiên trong `05-session-notes/` bám sát mẫu này, gồm các phần:

| § | Nội dung |
|---|---|
| Header | Mã, họ tên, liên hệ (che), ngày & giờ, thời lượng, hình thức, thiết bị/trình duyệt, SUT & commit, đồng ý quay màn hình, tệp ghi chú |
| 0 | Trạng thái phiên: DB đã reset?, Dashboard có số khác 0?, có mở DevTools/tra Google?, có loại khỏi tổng hợp không? |
| 1 | Hồ sơ người tham gia + nhận xét của người thu phiên |
| 2 | Kết quả từng task (kết quả · thời gian · đối chiếu) + §2.1 tiêu chí thành công chi tiết + §2.2 bẫy T2 + §2.3 bẫy T3 |
| 3 | **Timeline** trích từ video (mốc · task · sự kiện quan sát được · trích dẫn nguyên văn · mức độ bực bội 1–3) |
| 4 | **Điểm nhiễm** (mô tả trung tính · trích dẫn · số lần · mức độ · mốc thời gian · task) |
| 5 | Trợ giúp / can thiệp và ảnh hưởng tới kết quả task |
| 6 | Điểm bảng hỏi: SUS (bảng điều chỉnh) · UEQ-S (26 câu + 6 chất lượng) · F1–F6 · đánh giá nhiệm vụ D1–D3 |
| 7 | **Câu trả lời probe E1–E11 (nguyên văn)** |
| 8 | Ghi chú khác của phiên |

---

*Sinh viên: 23120341 · 23120341@student.hcmus.edu.vn · HW03-AI — GUI & Usability Testing · 2026-11-14.*
