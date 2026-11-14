# AI Audit Report — HW03-AI (GUI & Usability Testing)

## Phụ lục bắt buộc theo HW03 §9

| Trường | Nội dung |
|---|---|
| **Bài tập** | HW03-AI — GUI & Usability Testing (Exercise ID: HW03-AI) · 10 giờ |
| **Sinh viên** | **23120341** — 23120341@student.hcmus.edu.vn |
| **SUT** | EShop — phân hệ **Web Admin** (`eshop-sut/frontend-admin`) @ commit `85af3ba` |
| **Công cụ AI** | **OpenCode** (agent harness) · model **MiniMax M3.1 Flash Free** (`minimax-m3.1-flash-free`) · tích hợp skill `gui-testing`, `usability-testing`, `ai-audit` · MCP: Context7, Exa Search, GitHub |
| **Công cụ phụ trợ** | GitHub CLI (`gh`) — tạo/nhãn Issues; Playwright + Chromium — khảo sát runtime, dry-run, ảnh chụp trang Issues; Python 3.14 — tổng hợp số liệu, sinh báo cáo |
| **Số phiên làm việc có AI** | **2** phiên (Task 1 và Task 2) · tổng **13 lượt tương tác** được ghi nhật |
| **Khoảng thời gian** | 2026-11-11 → 2026-11-14 (GMT+7) |
| **Ngày lập báo cáo** | 2026-11-14 |

---

## 1. Khai báo sử dụng AI (HW03 §9)

> *“I use AI tools for the following tasks: phân tích mã nguồn SUT (Web Admin), sinh và review **47 mục GUI checklist** theo 4 Interface Aspects, khảo sát runtime bằng Chrome DevTools Protocol (đo độ tương phản WCAG, kiểm tra focus order, responsive), chuẩn hoá **21 + 2 bug report** và mở **23 GitHub Issues** kèm ảnh đính kèm, thiết kế kế hoạch / kịch bản / bảng hỏi cho kiểm định khả dụng, **tổng hợp số liệu 7 phiên kiểm định khả dụng thực tế** (SUS · UEQ-S · TCR), phân tích **10 Heuristics** của Nielsen, xếp hạng **mức độ severity** (Thang A Nielsen), đề xuất cải tiến, xuất **Excel checklist** và **AI Audit Report / AI Critique**. Mọi kết quả đều được sinh viên trực tiếp kiểm chứng, chạy thử trên SUT thật và chịu trách nhiệm hoàn toàn về tính chính xác.”*

**Bốn nguyên tắc giữ ranh giới giữa AI và con người trong toàn bộ bài làm:**

1. **AI không tự đánh dấu Pass/Fail** trong checklist — 47/47 mục do sinh viên tự thực thi trên SUT thật.
2. **AI không bịa dữ liệu người tham gia** — mọi con số trong báo cáo đều truy được về `responses.csv`.
3. **AI không tự quyết định mục nào là bug** — sinh viên duyệt lại phân loại Bug / Vấn đề khả dụng / Cải tiến.
4. **AI không tự tạo ảnh cross-platform hay danh sách người tham gia** — hai phần này bị bỏ qua (Task 3) và **không** được giả lập.

---

## 2. Tổng quan hai phiên làm việc

| # | Phiên | Ngày giờ | Tiêu đề | Phạm vi | Số lượt |
|---|---|---|---|---|---:|
| 1 | `CONV-20261112-1941` | 2026-11-12 19:41 → ~22:00 | Kiểm thử GUI phân hệ Web Admin EShop | **Task 1** — phân tích phạm vi, phân tích UI, sinh & review checklist 47 mục, phân tích kết quả, chuẩn hoá 21 bug, tạo 21 GitHub Issues, xuất Excel, commit | 7 |
| 2 | `2026-11-13-1636` | 2026-11-13 16:36 → ~18:30 | Kiểm định khả dụng EShop Web Admin | **Task 2** — kế hoạch đánh giá, kịch bản 4 task, bảng hỏi SUS/UEQ-S, dry-run kỹ thuật, tổng hợp 7 phiên, heuristic, severity, đề xuất cải tiến, báo cáo | 6 |

> **Nhật ký đầy đủ** (prompt nguyên văn + output + đánh giá của sinh viên cho từng lượt) được lưu tại:
> `ai-audit-outputs/conversation-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` và
> `ai-audit-outputs/conversation-2026-11-13-1636-kiem-thu-usability-eshop-admin.md`.

---

## 3. Nhật ký tương tác chi tiết

> Yêu cầu HW03 §9: *“include the following information for each interaction: **Name of the AI tool · Date and time · Your prompt · The AI output**”*.
> Bảng dưới liệt kê **13 lượt tương tác**; phần chi tiết của từng lượt nằm ở các file nhật ký nêu trên.

### 3.1. Phiên 1 — Task 1: GUI Testing & Checklist (`CONV-20261112-1941`)

| Lượt | Ngày & giờ | Prompt (nguyên văn) | Output của AI | Đánh giá & hiệu chỉnh của sinh viên |
|---|---|---|---|---|
| 1 | 2026-11-11 | *“@gui-testing Tiến hành thực hiện GUI-Testing trên phần mềm eshop-sut. Phạm vi cần phân tích bao gồm các màn hình Admin Login, Dashboard Admin, Quản lý Danh mục, Quản lý Sản phẩm.”* | Tạo `PROGRESS.md`, `01-scope-analysis.md`, `02-ui-analysis.md` (đọc `App.jsx` 922 dòng + khảo sát runtime bằng Chrome headless/CDP), `03-gui-checklist.md` (**77 mục**), `04-checklist-review.md` (tự review + 10 mục bổ sung kèm mã lý do), file CSV mẫu, ảnh tham chiếu. Phát hiện: sidebar **0 phần tử focusable**, **0 thẻ `<label>`**, xóa không có dialog, `alert()` ở 5 call-site, `fakeMassUpdatedProducts` (`App.jsx:110-114`), doanh thu nhân đôi (`App.jsx:218`), CSV không theo RFC 4180, responsive vỡ ở 375px, tương phản nút 1,92:1. **⛔ Dừng ở Gate B.** | **AI tốt** ở phần phát hiện lỗi tầng JSX mà mắt thường khó thấy, và **tôn trọng ranh giới Gate B** (không tự đánh dấu Pass/Fail). **Nhưng sinh quá nhiều mục** (67 → 77) và trộn FR-21..24 vào tiêu chuẩn. → Sinh viên chốt phạm vi, tách Import CSV thành luồng riêng, xác nhận credential `Admin123!`. |
| 2 | 2026-11-12 | *“gui-testing-outputs\03-gui-checklist.md đã được hoàn thành, hãy kiểm tra và tiếp tục bước tiếp theo.”* | Chạy script validate → **47/47 hợp lệ, mọi mục Failed đều có ghi chú + bằng chứng, mọi ảnh được tham chiếu đều tồn tại**. Viết `05-test-results.md` (phân tích nguyên nhân gốc, phân loại Bug/Usability/Enhancement). Gom **40 mục Failed → 21 bug + 2 vấn đề khả dụng + 5 cải tiến**. Hỏi Gate B (repo đích, nhãn, overlay email). | **AI tốt** — đặc biệt phần **phân loại trung thực**: không biến 2 vấn đề khả dụng và 5 đề xuất cải tiến thành bug. Sinh viên xác nhận: *“Không cần, tôi đã verify trước khi đưa fill vào checklist rồi.”* |
| 3 | 2026-11-12 | *“Bỏ đi FR-21..24 chỉ cần 4 IA thôi, và giảm bớt checklist xuống 77 là quá nhiều và dư thừa.”* | Xoá **100% mã FR-xx** khỏi cột tiêu chí; đổi tham chiếu FR-21..24 trong `02-ui-analysis.md` thành “đặc tả SRS §8” kèm ghi chú chỉ là ngữ cảnh. Rút gọn **77 → 47 mục (−39%)** bằng cách **gộp** 8 nhóm mục trùng lặp (3 mục `<label>` → 1; 3 mục contrast → 1; 2 mục xác nhận xóa → 1; 2 mục thông báo → 1; 2 mục lỗi server → 1; 2 mục loading/empty → 2; 2 mục focus → 1) và **bỏ 7 mục** giá trị thấp, kèm lý do cho từng mục. | **AI làm tốt hơn mong đợi ở chỗ gộp thay vì cắt bừa** — không mất nội dung kiểm thử. Việc bỏ mục “tên danh mục trùng” với lý do “đặc tả không yêu cầu uniqueness” thể hiện **sự trung thực** — loại bỏ cả tiêu chí do chính AI tự đặt ra. |
| 4 | 2026-11-12 | *“Hãy copy thư mục GUI-Testing này vào repo HW03-GUI-Usability-Testing sau đó tiến hành viết commit, và tạo GitHub Issues bằng github cli tôi đã auth. Viết commit và tạo GitHub Issues phải chuẩn theo HW03.”* + *“Hãy overlay lên ảnh giúp tôi, chỉ overlay ảnh mà ta sẽ nộp.”* + *“Xuất .xlsx ngay (Recommended)”* | Commit **10 commit** theo từng bước; tạo **21 GitHub Issues** (#1–#21) kèm bước tái hiện, Actual ≠ Expected, ảnh embed và ≥3 nhãn; overlay email lên **62/62 ảnh**; xuất `checklist-gui-testing.xlsx` (3 sheet: Checklist 47×10 · Test Summary · Bug List 21); tạo `git-commit-log.txt` dạng text theo HW03 §12. | **Hai điểm AI làm chưa tốt:** (1) **không hỏi trước repo đang private hay public** trước khi tạo Issue — chỉ phát hiện ra sau khi raw URL 404; (2) lần đầu chỉ áp dụng được nhãn `bug`, phải chạy lại `gh issue edit --add-label` cho cả 21 issue. → AI tự sửa: bổ sung khối “Truy cập ảnh khi không hiển thị” vào cả 21 issue. |
| 5 | 2026-11-12 | *“Hoàn thành Task 1 trước chưa cần làm Task 2.”* | Chấp hành đúng: tiếp tục sinh nốt 21 bug report, xuất Excel, overlay ảnh, commit, tạo Issues — **không** đụng vào Task 2. | AI chấp hành đúng phạm vi. Không cần chỉnh sửa. |
| 6 | 2026-11-12 | *“đây là email của tôi: 23120341@student.hcmus.edu.vn”* | Chạy script Pillow overlay dải đen mờ + dải xanh mép trái lên 62 ảnh; xác nhận 62/62 ảnh có overlay. | AI đáp ứng đúng; ảnh được kiểm tra lại bằng công cụ đọc ảnh. |
| 7 | 2026-11-12 | *“@ai-audit Ghi lại conversation này.”* | Sinh `conversation-2026-11-12-1941-…md` và `mistakes-2026-11-12-1941-…md`, cập nhật `PROGRESS.md`. | Đáp ứng đúng yêu cầu HW03 §9. |

### 3.2. Phiên 2 — Task 2: Usability Evaluation (`2026-11-13-1636`)

| Lượt | Ngày & giờ | Prompt (nguyên văn) | Output của AI | Đánh giá & hiệu chỉnh của sinh viên |
|---|---|---|---|---|
| 1 | 2026-11-13 16:36 | *“@usability-testing Tiến hành Usability Testing trên phần mềm eshop-sut. Luồng test sẽ là fr12-fr13-fr14-fr15, đọc README.md của eshop-sut để hiểu các FR.”* | Đọc `README.md` + `App.jsx`; xác định FR-12 (Login), FR-13 (Dashboard), FR-14 (Category CRUD), FR-15 (Product CRUD); lập kế hoạch đánh giá (Gate A) với 4 mục tiêu M1–M4. | AI chọn đúng 4 FR khớp luồng quản trị và đặt mục tiêu theo từng FR. Sinh viên trả lời Gate A. |
| 2 | 2026-11-13 | Trả lời Gate A (7 người quản trị dùng thử chưa quen; hình thức tự ghi; reset DB sau mỗi phiên). | Tạo `01-evaluation-plan.md`, `02-task-scenarios.md` (4 task T4→T1→T2→T3), `03-questionnaire.md` (SUS 10 câu · UEQ-S 26 câu · F1–F6 · probe E1–E11) + `responses.csv` template; viết `backend/seed-orders.js` và `reset-db.ps1`. | Khung chuẩn bị đầy đủ. **Nhưng script seed ban đầu có lỗi vòng đời CSDL** (xem lỗi #2 ở §4). |
| 3 | 2026-11-13 | *“Có một vài thay đổi, hiện tại tôi không thể lấy ghi âm từ người dùng nên hãy bỏ đi, ta sẽ tập trung vào ghi màn hình và nghiên cứu từ các phiên ghi màn hình thôi. Sau khi chỉnh lại hãy chạy pilot để kiểm tra lại kịch bản.”* | Loại bỏ **hoàn toàn** yêu cầu ghi âm trên 9 file tài liệu; chuyển probe sang trả lời **bằng chữ** trong `ghi-chu.md`. Chạy **dry-run kỹ thuật** (Playwright + Chromium headless) phát hiện **3 lỗi kịch bản + 1 lỗi môi trường**, xác minh **11 bug chức năng**; áp dụng **8 điều chỉnh** (tách TCR khỏi chỉ số phụ ở T2; bỏ 2 tiêu chí bất khả thi + thêm C1–C5 ở T3; sửa thứ tự reset DB; viết lại `seed-orders.js`). | **Điểm mạnh lớn:** AI **chủ động chạy dry-run trên SUT thật** thay vì lý thuyết suông, nhờ đó bắt được lỗi kịch bản trước khi 7 người thật bị ảnh hưởng. **Nhưng dry-run kỹ thuật không thay thế được phiên pilot với người thật** — hạn chế này được ghi nhận công khai. |
| 4 | 2026-11-13 | *“Tôi đã điền vào usability-testing-outputs\responses.csv rồi, và hiện tại tôi đã loại bỏ những tài liệu dư thừa vì có hạn chế về mặt thu thập data, tôi chỉ lấy được các data recording thôi. Hãy tiến hành bước tiếp theo, dựa trên usability-testing-outputs\responses.csv tôi đã tổng hợp.”* | Đọc `responses.csv` (7 phiên P01–P07); chạy `aggregate_sus.py` tính **TCR 85,7%**, **SUS 6,8/100**, **UEQ-S 3,99/7**; lập `04-usability-results-consolidation.md` với bảng % theo từng câu. | AI **không bịa dữ liệu** — mọi con số truy được về `responses.csv`. Sinh viên kiểm chứng lại toàn bộ. |
| 5 | 2026-11-13 | *(Tiếp nối tự động qua các bước phân tích Phase 02)* | `05-heuristic-findings.md` (gán nhãn 10 Heuristics cho 8 phát hiện) · `06-severity-assessment.md` (Thang A Nielsen 0–4 + tách 4 bug chức năng) · `07-improvements.md` (5 đề xuất P1/P2 + re-test plan) · `08-usability-report.md` · cập nhật `PROGRESS.md`. | Chuỗi phân tích đầy đủ, mỗi phát hiện đều có lập luận severity dựa trên tần suất 7/7. |
| 6 | 2026-11-13 | *“@ai-audit Ghi lại conversation này.”* | Hỏi chế độ (chọn Chế độ 1) và sinh 2 file audit cho phiên này. | Đáp ứng đúng. |

---

## 4. Danh sách lỗi và sai sót của AI

| # | Phiên | Loại lỗi | Mô tả chi tiết | Hậu quả | Biện pháp khắc phục | Mức độ |
|---|---|---|---|---|---|---|
| 1 | 1 | **Sinh dữ liệu / checklist rườm rà** | Bản đầu sinh **77 mục** checklist với nhiều mục trùng lặp, đồng thời trộn tiêu chuẩn phân loại `FR-21..24` vào cột tiêu chí kiểm chứng — trái yêu cầu đề bài (chỉ 4 IA). | Checklist không đúng phạm vi; tốn thời gian review; có nguy cơ bị trừ điểm ở tiêu chí “tiêu chuẩn phân loại”. | Sinh viên yêu cầu bỏ FR-21..24; AI gộp 8 nhóm trùng lặp và bỏ 7 mục giá trị thấp → **47 mục**, vẫn đạt mỗi IA ≥ 8. | **Cao** |
| 2 | 2 | **Lỗi vòng đời CSDL trong script seed** | Script `seed-orders.js` ban đầu dùng `require('./database')`. Vì `backend/database.js` chạy `initDatabase()` **ngay khi được require** (nó `DROP TABLE` rồi seed lại 6 bảng), mỗi lần server khởi động lại xoá sạch dữ liệu vừa seed. | Dashboard rỗng (`0 ₫` / `0` đơn) → **Task T1 (FR-13) đo không được**, đe dọa toàn bộ phiên 7 người. | Viết lại script mở **trực tiếp** file `database.sqlite` (không `require`), chuẩn hoá `reset-db.ps1` theo đúng thứ tự: **xoá DB → start server → seed-orders → kiểm tra Dashboard = 6.400.000 ₫ / 5 đơn**. | **Cao** |
| 3 | 2 | **Lỗi giả định tính năng trong kịch bản** | AI đưa yêu cầu *“đổi tên danh mục”* vào **tiêu chí thành công** của Task 2, và *“giá hiển thị 5990000”* + *“sản phẩm khác không bị đổi tên”* vào tiêu chí thành công của Task 3 — trong khi UI **không có** nút Sửa danh mục và giá mới **không** hiển thị sau khi sửa. | Nếu giữ nguyên, **mọi** người tham gia đều bị đánh dấu “không hoàn thành” dù họ làm đúng → TCR bị bóp méo hoàn toàn (T2 có thể = 0%) và đánh giá sai năng lực người dùng. | Phát hiện qua dry-run; tách **TCR** (chỉ gồm thao tác người dùng kiểm soát được) khỏi **chỉ số phụ** (“mức độ chặn” C1–C5). AI đã tự sửa và ghi rõ trong `02-task-scenarios.md`. | **Nghiêm trọng** |
| 4 | 1 | **Lỗi tham chiếu ảnh trong GitHub Issues** | Dùng URL `raw.githubusercontent.com` cho ảnh đính kèm trong khi repo đang **private** → ảnh không hiển thị với người chưa đăng nhập. | Ảnh bằng chứng trong 21 issue bị lỗi hiển thị → vi phạm yêu cầu “attach bug screenshots to each GitHub issue”. | Bổ sung khối **“Truy cập ảnh khi không hiển thị”** (đường dẫn tương đối trong repo) vào cả 21 issue; repo hiện đã **public** nên ảnh hiển thị trực tiếp; **23 ảnh chụp trang Issue** được đính kèm trong `bug_report/screenshots/`. | Trung bình |
| 5 | 1 | **Lỗi định dạng nhãn GitHub** | Lệnh `gh issue create` với cờ `--label` lặp lại bị giới hạn ở **một** nhãn → 21 issue đầu tiên chỉ có nhãn `bug`. | Thiếu nhãn phân loại mức độ / khu vực trên 21 issue. | Chạy lại `gh issue edit --add-label` cho toàn bộ 21 issue. | Thấp |
| 6 | 1 | **Không hỏi trước trạng thái visibility của repo** | AI không hỏi repo sẽ để **private** hay **public** trước khi sinh nội dung issue có ảnh nhúng theo URL raw. | Phát hiện ra muộn (chỉ khi raw URL trả 404) → phải sửa lại 21 issue. | Bổ sung khối fallback; thống nhất quyết định visibility do sinh viên đưa ra. | Thấp |
| 7 | 2 | **Thiếu kiểm chứng “state lifecycle” của ứng dụng trước khi sinh kịch bản dữ liệu** | Khi viết script seed, AI không kiểm tra cơ chế `initDatabase()` chạy khi `require` — tức không kiểm tra vòng đời khởi tạo CSDL của ứng dụng trước khi sinh dữ liệu mẫu. | Gốc rễ của lỗi #2: một lần lỗi này có thể làm hỏng dữ liệu người tham gia đã tạo trong các phiên trước. | Bổ sung bước “kiểm tra state lifecycle” vào quy trình chuẩn bị môi trường; đưa quy trình reset DB thành script `reset-db.ps1` có in giá trị Dashboard kỳ vọng để đối chiếu. | Trung bình |
| 8 | 2 | **Không phân biệt rõ “khoảng trống chức năng” với “lỗi của người tham gia”** | Bản đầu của kịch bản coi việc không đổi được tên danh mục là **tiêu chí thành công**, dễ bị hiểu là người tham gia thất bại. | Đe dọa tính công bằng của đợt kiểm thử và làm sai lệch TCR. | Tách rõ: TCR chỉ gồm thao tác người dùng kiểm soát được; phần không thể thực hiện trở thành **chỉ số phụ** đo “mức độ chặn” và “mức độ nhận thức”, rồi kết luận là **vấn đề thiết kế của sản phẩm**. | Nghiêm trọng |

### 4.1. Thống kê lỗi AI theo phiên

| Phiên | Tổng lượt | Lượt “đúng” | Lượt “cần chỉnh sửa” | Lượt “phải làm lại” | Thời gian ước tính để chỉnh sửa |
|---|---:|---:|---:|---:|---|
| Phiên 1 (Task 1) | 7 | 6 | 1 (lượt 4) | 1 (lượt 3) | ~90 phút |
| Phiên 2 (Task 2) | 6 | 4 | 2 (lượt 2, 3) | 0 | ~60 phút |

### 4.2. Những gì AI **không** làm được và cần con người thực hiện

| Việc | Lý do | Người thực hiện |
|---|---|---|
| **Thực thi checklist** | Cần mở ứng dụng, đo đạc bằng DevTools, đánh dấu 47/47 mục, viết ghi chú lý do fail, chụp 55 ảnh bằng chứng có overlay email | Sinh viên |
| **Quyết định cái nào là bug thật** | AI đề xuất phân loại; người dùng phải xác nhận mức độ và loại bỏ (21 bug, không phải 40) | Sinh viên |
| **Quyết định phạm vi và tiêu chuẩn** | Chọn màn hình nào, dùng 4 IA hay kèm FR, độ chi tiết của checklist | Sinh viên (Gate A) |
| **Tuyển 7 người tham gia thật & thu dữ liệu** | Cần người thật ngoài lớp học, có thông tin liên hệ kiểm chứng, văn bản đồng ý | Sinh viên |
| **Giải thích mâu thuẫn trong tài liệu SUT** | `README.md:23` ghi `Admin123!` còn `setup_guide.md:105` ghi `admin123` | Sinh viên (hỏi, không tự kết luận) |
| **Ảnh cross-platform (Task 3)** | Cần BrowserStack/LambdaTest hoặc thiết bị thật; **không thể giả lập** | Không thực hiện — ghi rõ bỏ qua |
| **Quyết định bảo mật repo** | Private hay public là quyết định của sinh viên | Sinh viên |

---

## 5. Đánh giá mức độ tin cậy của AI theo từng loại đầu ra

| Loại đầu ra | Mức độ tin cậy | Cách kiểm chứng đã dùng | Kết quả |
|---|---|---|---|
| Phân tích mã nguồn & phát hiện lỗi tầng JSX | **Cao** | Đối chiếu với dry-run Playwright trên SUT thật | 11/13 nghi vấn được xác nhận; 2 nghi vấn mới phát hiện |
| Số đo runtime (contrast, DOM, focus order) | **Cao** | Đo lại bằng DevTools trong lúc thực thi checklist | Khớp 100% với ghi chú của tester |
| Thiết kế checklist | **Trung bình** | Script kiểm tra trùng lặp + review 5 lăng kính + duyệt của sinh viên | Cần 2 vòng sửa (77 → 47) |
| Thiết kế kịch bản usability | **Trung bình–thấp** | Dry-run kỹ thuật | 3 lỗi kịch bản + 1 lỗi môi trường phải sửa |
| Tổng hợp số liệu (SUS/UEQ-S/TCR) | **Cao** | Tính lại độc lập từ `responses.csv` | Khớp; điểm SUS từng người được kiểm chứng tay (P01 = 10,0 … P06 = 0,0) |
| Gắn nhãn heuristic & xếp severity | **Trung bình–cao** | Đối chiếu với trích dẫn nguyên văn của người tham gia | Mỗi mức độ đều có lập luận dựa trên tần suất 7/7 |
| Sinh nội dung mô tả bug | **Cao** | Mỗi bug có bằng chứng ảnh + bước tái hiện độc lập kiểm chứng lại được | 23/23 issue có ảnh hiển thị đúng |
| **Dữ liệu người tham gia** | **AI không tạo ra** | — | Toàn bộ số liệu do sinh viên thu thập |

---

## 6. Kết luận của AI Audit

1. **AI đạt mức Bloom-AI G9.3 (Analyse)** ở phần phân tích: đọc mã nguồn, đo runtime, gom nguyên nhân gốc, phân tích heuristic, xếp severity — đều theo đúng phương pháp chuẩn và có thể tái lập.
2. **AI đạt mức G9.4 (Collaborate)** ở phần quy trình: skill có **Gate A / Gate B** buộc người dùng phải quyết định ở các điểm bất biến (phạm vi, tiêu chuẩn, kết quả thực thi) — chính các Gate này đã phát hiện ra lỗi của AI.
3. **Mọi lỗi của AI đều thuộc loại “AI thiếu ngữ cảnh hệ thống”** — sinh checklist theo khuôn mẫu phổ biến, giả định tính năng có sẵn, không kiểm tra vòng đời khởi tạo CSDL, và không hỏi về trạng thái repo. Không lỗi nào là lỗi tính toán hay lỗi suy luận logic.
4. **Chiến lược khắc phục hiệu quả nhất là dry-run bằng công cụ tự động trên SUT thật**: 4 lỗi nghiêm trọng nhất của AI đều bị bắt được bởi chính bước này, trước khi chúng làm hỏng dữ liệu của 7 người tham gia thật.

---

## 7. Tài liệu liên quan

| Tệp | Nội dung |
|---|---|
| `ai_audit_report/HW03_AI_Critique.md` (+ `.pdf`) | Đoạn AI Critique 200–300 từ (HW03 §10) |
| `ai-audit-outputs/conversation-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` | Nhật ký đầy đủ phiên 1 (prompt nguyên văn + output + đánh giá) |
| `ai-audit-outputs/conversation-2026-11-13-1636-kiem-thu-usability-eshop-admin.md` | Nhật ký đầy đủ phiên 2 |
| `ai-audit-outputs/mistakes-2026-11-12-1941-kiem-thu-gui-eshop-admin.md` | Bản lỗi AI chi tiết của phiên 1 |
| `ai-audit-outputs/mistakes-2026-11-13-1636-kiem-thu-usability-eshop-admin.md` | Bản lỗi AI chi tiết của phiên 2 |
| `ai-audit-outputs/ai-audit-summary.md` · `ai-audit-mistakes-summary.md` | Bản tóm tắt |
| `main_report/HW03_GUI_Usability_Main_Report.md` §2, §6 | Quy trình và bảng điều chỉnh của người dùng |

---

*Sinh viên: 23120341 · 23120341@student.hcmus.edu.vn · HW03-AI — GUI & Usability Testing · AI Audit Report lập ngày 2026-11-14.*
