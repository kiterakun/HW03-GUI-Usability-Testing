# 01 — Kế hoạch đánh giá khả dụng

| Trường | Nội dung |
|---|---|
| SUT | **EShop — Phân hệ Web Admin** (`eshop-sut/frontend-admin`), React 19 + Vite + Tailwind, toàn bộ UI nằm trong 1 component `src/App.jsx` (922 dòng), điều hướng bằng state `activeTab` — không có router |
| Phiên bản | Commit `85af3ba` ("first upload") — không sửa code trong suốt đợt test (test trên bản gốc) |
| URL / môi trường | Web Admin `http://localhost:5174` · Backend API `http://localhost:3000/api` |
| Tài khoản | Admin: `admin@eshop.com` / `Admin123!` — User thường: `test@eshop.com` / `Test1234!` |
| Người lập kế hoạch | AI (OpenCode / MiniMax M3.1 Flash) + người dùng xác nhận |
| Ngày lập | 2026-11-11 |
| Hình thức phiên | **Tự ghi (self-recorded)** — người tham gia tự quay **màn hình** + tự điền file bảng hỏi `.md`/`.csv` tải về, gửi lại. **Không ghi âm** — mọi phản hồi định tính được ghi bằng **chữ** |

**Phạm vi FR:** FR-12 (Access Control) → FR-13 (Dashboard) → FR-14 (Category CRUD) → FR-15 (Product CRUD).
**Ngoài phạm vi:** FR-16 Import CSV (khối "Import sản phẩm từ CSV" nằm trong tab Sản phẩm), FR-17 Mã giảm giá,
FR-18 Đơn hàng, FR-19 Người dùng, FR-20 Mobile, toàn bộ `frontend-web` (port 5173).

---

## 1. Câu trả lời của người dùng (nguyên văn / tóm tắt)

**Về SUT & flow:**
> "Tất cả là admin dùng thử EShop đã biết (chưa quen)" — người tham gia đã biết sản phẩm EShop nhưng **chưa quen**
> với giao diện quản trị.
>
> "Môi trường đã chạy sẵn, chưa có phiên nào" — backend `:3000` + admin `:5174` đang hoạt động.
>
> "Có sẵn tài khoản user thường để test từ chối truy cập" — dùng `test@eshop.com` cho nhánh FR-12.
>
> "Reset DB (seed lại) sau mỗi phiên" — mỗi người tham gia làm việc trên DB sạch, giống nhau.

**Về mục tiêu đánh giá:**
> Chọn cả 4: "M1: Tìm & hiểu Dashboard, M2: Thêm/sửa/xóa Danh mục, M3: Thêm/sửa/xóa Sản phẩm,
> M4: Access Control - đăng nhập & phân quyền".

**Về người tham gia:**
> 7 người thật, **ngoài lớp HW03**, đều là admin dùng thử EShop đã biết (chưa quen với trang quản trị).

**Về công cụ & thủ tục:**
> "Tự quay màn hình + tự điền file .md/.csv tải về" — không có moderator trực tiếp trong phiên.
>
> *(Bổ sung, 2026-11-13):* "hiện tại tôi không thể lấy ghi âm từ người dùng nên hãy bỏ đi, ta sẽ tập trung
> vào ghi màn hình và nghiên cứu từ các phiên ghi màn hình thôi" → **loại bỏ hoàn toàn ghi âm**:
> probe chuyển sang người tham gia **ghi bằng chữ**; bỏ yêu cầu mic, bỏ bản ghi âm probe trong
> consent form và trong checklist.

**Về dữ liệu đã có:**
> Chưa có phiên nào. Đợt test bắt đầu từ đầu.

> **Ghi chú AI:** người dùng chọn **4 mục tiêu** (khuyến nghị của module là 2–3). Vì flow đã là 1
> end-to-end flow liên tục và mỗi mục tiêu gắn với đúng 1 màn hình, 4 mục tiêu vẫn gọn: **1 mục tiêu ↔ 1
> task scenario**. AI giữ nguyên lựa chọn của người dùng và kiểm soát độ dài phiên bằng cách giới hạn
> 4 task, mỗi task ≤ 5 phút.

---

## 2. Mục tiêu đánh giá

| # | Ta muốn biết | Để quyết định | Đo bằng |
|---|---|---|---|
| **M1** | Người dùng có **nhận ra và tin tưởng** hai con số trên Dashboard (tổng doanh thu "delivered", tổng số đơn) không — và có hiểu Dashboard đang hiển thị loại đơn nào không | Có cần đổi nhãn / thêm chú thích giải thích (ví dụ "chỉ tính đơn đã giao") / thêm biểu đồ để số liệu có ngữ cảnh không | Task completion rate T1, time-on-task, probe "Bạn hiểu con số này là gì không?" |
| **M2** | Người dùng có **hoàn thành vòng đời Thêm → Xem → Sửa → Xóa danh mục**, và có **nhận ra hậu quả** của thao tác xóa (danh mục bị xóa là mất vĩnh viễn, không có undo) không | Có bắt buộc thêm dialog xác nhận khi xóa (FR-24) và toast báo thành công/thất bại không | Task completion rate T2, probe về phản hồi sau khi xóa, số lần họ tự nhận ra việc xóa không thể hoàn tác |
| **M3** | Người dùng có **nhập đúng và hiểu ý nghĩa** form sản phẩm (tên, giá, ảnh, mô tả, danh mục) và có nhận biết **lỗi validate** khi thiếu trường bắt buộc / giá ≤ 0 không | Form sản phẩm có cần thêm nhãn `<label>`, ký hiệu `*`, validation inline trước nút submit (FR-22) không | Task completion rate T3, time-on-task, số lỗi người dùng tự phát hiện, probe về việc form có cho họ biết trường nào còn thiếu |
| **M4** | Khi bị **từ chối truy cập** (đăng nhập sai mật khẩu, hoặc đăng nhập bằng tài khoản user không phải admin), người dùng có **hiểu nguyên nhân** và biết **phải làm gì tiếp theo** không | Thông báo lỗi cần cải tiến thế nào (hiện là `alert()` trần, không có hướng dẫn) | Task completion rate T4, probe "Bạn nghĩ nguyên nhân là gì?", thời gian phản hồi sau khi bị từ chối |

> Mỗi mục tiêu đều dẫn tới 1 quyết định thiết kế cụ thể, không có mục tiêu thừa.

---

## 3. Hồ sơ người tham gia

| Thuộc tính | Yêu cầu | Lý do |
|---|---|---|
| Nhóm người dùng | Người đã đăng ký & dùng thử EShop ở vai trò **admin** (quản lý sản phẩm/danh mục), **chưa quen** giao diện Web Admin | Đúng vai trò thật của người quản trị; "chưa quen" loại bỏ hiệu ứng học từ lần trước, đồng thời giữ lại mức độ hiểu nghiệp vụ |
| Độ tuổi | ≥ 18, trải rộng (mục tiêu: 20–45) | Bảo đảm đa dạng, không tập trung một nhóm tuổi |
| Nghề nghiệp / kinh nghiệm ngành | Ưu tiên **không thuộc ngành IT / không phải tester** (chủ cửa hàng, nhân viên kinh doanh, sinh viên ngoài ngành CNTT) | Người có kinh nghiệm QA/IT sẽ đoán ý đồ thiết kế thay vì phản hồi trải nghiệm người dùng |
| Kinh nghiệm dùng e-commerce / trang quản trị | Đã từng đăng ký & dùng EShop ở vai trò admin; quen thao tác cơ bản thêm/sửa sản phẩm trên một sàn TMĐT nào đó (Shopee, Facebook Shop…) | Đảm bảo task không quá xa lạ với bối cảnh của họ |
| Kinh nghiệm dùng công nghệ | Dùng được trình duyệt, biết gõ phím, biết cuộn/chuột — **không bắt buộc** kỹ năng kỹ thuật cao | SUT là web desktop; quá thấp → không phản ánh người dùng thật; quá cao → mất tín hiển nhiên |
| Thiết bị thường dùng | Máy tính laptop/desktop, Chrome hoặc Edge bản mới | Admin panel chỉ có desktop |
| Tần suất sử dụng admin panel | Đã từng quản lý sản phẩm/danh mục trên hệ thống nào đó ít nhất 1 lần | Đo mức độ quen thuộc nghiệp vụ CRUD |
| **Tiêu chí loại trừ** | (a) Là sinh viên đang học HW03; (b) Làm trong ngành IT/QA hoặc có kinh nghiệm test usability; (c) Chưa từng dùng EShop; (d) Không dùng được laptop/mouse | Bảo đảm dữ liệu chân thực & đúng yêu cầu đề bài |

**Quy định bắt buộc (HW03):**
- Số người tham gia: **7 người thật**.
- Người tham gia **không được là sinh viên đang học HW03**.
- Ưu tiên người **không thuộc ngành IT / không phải tester**.
- Thông tin liên hệ phải **có thể kiểm chứng** (Zalo / email / điện thoại) và **che 4 số giữa**.

---

## 4. Flow và kịch bản (tóm tắt — chi tiết ở `02-task-scenarios.md`)

Flow duy nhất: **Đăng nhập → Dashboard → Quản lý Danh mục → Quản lý Sản phẩm** (mỗi màn hình là 1 task, 1 mục tiêu).

| Task | Mô tả ngắn | Mục tiêu | Tiêu chí thành công (dùng để tính TCR) | Ước tính thời gian |
|---|---|---|---|---|
| **T1** | Xem Dashboard | M1 | Người tham gia nói/viết được "tổng doanh thu" và "tổng số đơn hàng" lấy từ đơn nào, và nhận ra con số nào là doanh thu | ≤ 4 phút |
| **T2** | Tạo → (thử đổi tên) → xóa một danh mục | M2 | (a) `Giày dép` được tạo và xuất hiện trong bảng; (b) sau khi xóa, nó biến mất khỏi bảng. **Không tính** bước "đổi tên" (UI không có chức năng này) — đo riêng làm chỉ số "mức độ chặn" | ≤ 6 phút |
| **T3** | Tạo → sửa một sản phẩm (chọn danh mục, giá) | M3 | (a) `Áo khoác dạ` xuất hiện với đúng giá `450000` và danh mục `Phụ kiện`; (b) sau khi sửa, hệ thống báo thành công và người tham gia tin là đã áp dụng. **Không tính** "giá hiển thị đúng" và "sản phẩm khác không đổi tên" (lỗi sản phẩm, đã xác nhận) | ≤ 8 phút |
| **T4** | Thử truy cập bị từ chối: đăng nhập sai mật khẩu, rồi đăng nhập bằng tài khoản user thường | M4 | Người tham gia **hiểu** vì sao bị từ chối và biết phải làm gì tiếp (dùng đúng tài khoản admin) | ≤ 4 phút |

> **Điều chỉnh sau pilot (2026-11-13):** tiêu chí T2 và T3 được tách thành **tiêu chí do người dùng kiểm soát
> được** (dùng để tính TCR) và **chỉ số phụ** đo mức độ nhận thức. Lý do: một số điều kiện bất khả thi
> với người dùng (đổi tên danh mục, giá hiển thị sau khi sửa) sẽ làm TCR luôn = 0 và đánh giá sai
> năng lực người tham gia. Chi tiết: `02-task-scenarios.md` §8.1.

> **Lưu ý về T4:** vì đây là phiên tự ghi, **T4 đặt TRƯỚC** trong tài liệu gửi cho người tham gia để
> họ bắt đầu từ trạng thái "chưa đăng nhập" (đây là điểm vào tự nhiên của app), nhưng **được chấm ở
> cuối** trong bảng tổng hợp. Nếu người tham gia tự đăng nhập thành công bằng tài khoản admin ở đầu
> phiên, họ vẫn làm được T4 bằng cách **đăng xuất** rồi thử lại (sidebar có nút "Đăng xuất").

---

## 5. Kịch bản phiên test (self-recorded)

| Giai đoạn | Nội dung (hướng dẫn gửi kèm cho người tham gia) | Thời lượng |
|---|---|---|
| 0. Tự chuẩn bị | Đọc `README-cho-nguoi-tham-gia.md`; cài OBS/ShareX hoặc công cụ quay màn hình; tải `questionnaire-for-participant.md` + `responses-template.csv` + `ghi-chu-template.md` | tự chuẩn bị |
| 1. Bắt đầu quay | Bấm quay màn hình **trước khi** mở trình duyệt; nói to lời dẫn dắt của mình (video có thu âm sẵn thì để nguyên; **không cần thiết bị ghi âm riêng**) | — |
| 2. Warm-up | Hỏi kinh nghiệm (không phải task): "Bạn đã dùng EShop ở vai trò admin ở đâu, dùng bao lâu?" | 2–3 phút |
| 3. Task T4 → T1 → T2 → T3 | Đọc nguyên văn mục tiêu từ `02-task-scenarios.md`, **không gợi ý** | ≤ 22 phút |
| 4. Bảng hỏi | Điền `responses.csv` (SUS 10 câu + UEQ-S 26 mục + F1–F6 + D) | 8–10 phút |
| 5. Probe | Trả lời 11 câu mở **bằng chữ** trong `ghi-chu.md` (Phần Probe) | 8–12 phút |
| 6. Kết thúc | Dừng quay, gửi lại: file video + `responses.csv` đã điền + `ghi-chu.md` đã điền | — |

**Nguyên tắc quan sát trung tính (áp dụng cho người tham gia tự ghi — họ là người vừa là người dùng vừa là người quan sát):**
- Không dùng tài liệu hướng dẫn, không tra Google, không xem lại màn hình khi đang làm task.
- Nói to mọi suy nghĩ (nếu máy có mic sẵn, video sẽ thu được; **không cần mua hay cài thêm thiết bị ghi âm nào**). Nếu không có mic thì ghi suy nghĩ bằng chữ vào `ghi-chu.md`.
- Ghi lại chính xác thời điểm bị kẹt (bấm giờ hoặc ghi "kẹt ở bước… lúc …").
- **Không xóa lịch sử trình duyệt** — để AI/người thu phiên đối chiếu được với lời kể.

---

## 6. Công cụ đo lường

| Công cụ | Vai trò | Thang | Nguồn |
|---|---|---|---|
| SUS | Thang tổng hợp chất lượng toàn hệ thống | 10 câu, 1–5 → 0–100 | `03-questionnaire.md` |
| UEQ-S | 6 chất lượng chi tiết (clarity, efficiency, dependability, learnability, safety, stimulation) | 26 mục, 1–7 | `03-questionnaire.md` |
| Task completion rate | Tỷ lệ hoàn thành từng task (4 mức) | Hoàn thành / Có trợ giúp / Dừng giữa chừng / Không hoàn thành | Quan sát (tự ghi) |
| Time on task | Thời gian mỗi task | phút | Quan sát (tự ghi) |
| Probe | Định tính — 11 câu mở, trả lời **bằng chữ** | tự do | `03-questionnaire.md` |
| Trợ giúp (hint) | Có bị người tham gia tự "gợi ý cho mình" không (mở DevTools, đọc code…) | có/không | Quan sát (tự ghi) |

---

## 7. Bảng tuyển dụng & lịch phiên

| # | Mã | Họ tên | Liên hệ (che 4 số giữa) | Nhóm người dùng | Ngày phiên | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | P01 | | | | | Chưa tuyển |
| 2 | P02 | | | | | Chưa tuyển |
| 3 | P03 | | | | | Chưa tuyển |
| 4 | P04 | | | | | Chưa tuyển |
| 5 | P05 | | | | | Chưa tuyển |
| 6 | P06 | | | | | Chưa tuyển |
| 7 | P07 | | | | | Chưa tuyển |
| — | Pilot | | | | | Chưa tuyển |

> **Người dùng điền bảng này. AI không được điền hộ.**
> Bảng thông tin chi tiết (che 4 số giữa) lưu ở `participants/participants.md`.

---

## 8. Chuẩn bị môi trường & dữ liệu

| Mục | Chi tiết | Đã chuẩn bị? |
|---|---|---|
| Backend API | `node backend/server.js` → `http://localhost:3000` (đang chạy sẵn) | ✅ |
| Web Admin | `cd frontend-admin && npm run dev` → `http://localhost:5174` (đang chạy sẵn) | ✅ |
| Tài khoản admin | `admin@eshop.com` / `Admin123!` | ✅ |
| Tài khoản user thường (FR-12) | `test@eshop.com` / `Test1234!` | ✅ |
| **Dữ liệu Dashboard (bắt buộc)** | Seed mặc định **không có đơn hàng nào** → Dashboard hiển thị `0 ₫` và `0`, người tham gia sẽ **không có gì để diễn giải** → M1 không đo được. Đã tạo script `backend/seed-orders.js` (5 đơn, đủ trạng thái, `delivered` = 3.200.000 ₫). **Phải chạy SAU khi server đã khởi động** — xem §9 | ✅ script đã tạo & đã xác minh; ⬜ phải chạy trước mỗi phiên |
| Dữ liệu sản phẩm/danh mục | Seed mặc định: 3 danh mục (Điện thoại, Laptop, Phụ kiện) + 5 sản phẩm — đủ dùng | ✅ |
| Quy tắc reset giữa các phiên | **Reset DB (seed lại) sau mỗi phiên** (người dùng chốt). Script `reset-db.ps1` — **xoá → start server → seed-orders → kiểm tra**. Xem §9 | ✅ |
| Thiết bị test | Laptop/desktop người tham gia, Chrome/Edge desktop, ≥ 1366×768 | ⬜ |
| Công cụ quay màn hình | OBS Studio hoặc ShareX (Windows) — hướng dẫn gửi kèm. **Không yêu cầu thiết bị ghi âm riêng** | ⬜ |
| Probe (định tính) | Người tham gia trả lời **bằng chữ** trong `ghi-chu.md` (Phần Probe). Mic tích hợp máy là tùy chọn | ⬜ |
| Văn bản đồng ý tham gia | Văn bản đồng ý (khai thu thập bản ghi hình màn hình, mục đích nghiên cứu, quyền rút lại) — mẫu ở `participants/consent-form.md` | ⬜ |

---

## 9. Quy trình reset DB giữa các phiên

> **Người dùng chốt: reset DB (seed lại) sau mỗi phiên.** Nhưng seed mặc định của `database.js` **không
> tạo đơn hàng**, nên bước reset phải kèm bước tạo đơn hàng mẫu.
>
> ⚠️ **THỨ TỰ BẮT BUỘC** (đã phát hiện ở pilot 2026-11-13): `backend/database.js` chạy
> `initDatabase()` **ngay khi được `require`** → mỗi lần `require('./database')` (mà `server.js` làm)
> sẽ **DROP và tạo lại toàn bộ bảng**. Nếu seed-orders chạy **trước** khi start server, server sẽ
> xoá sạch → Dashboard luôn rỗng → M1 không đo được.

| Bước | Lệnh / hành động | Ghi chú |
|---|---|---|
| 1 | Dừng backend (Ctrl+C trong terminal chạy `node server.js`) | Bắt buộc để không giữ kết nối SQLite |
| 2 | Xoá file `backend/database.sqlite` | Xoá file, không xoá thư mục |
| 3 | Chạy `node backend/server.js` | Server tự tạo bảng + seed: 2 user, 3 danh mục, 5 sản phẩm, 4 coupon |
| 4 | Chạy `node backend/seed-orders.js` | **SAU** khi server đã chạy. Script mở DB trực tiếp, KHÔNG `require('./database')` |
| 5 | Kiểm tra `http://localhost:5174` → Dashboard hiện **`6,400,000 ₫`** và **`5`** đơn | Nếu vẫn là 0 → **không cho chạy phiên** |

> **Tự động hóa:** `powershell -ExecutionPolicy Bypass -File usability-testing-outputs/reset-db.ps1`

---

## 10. Rủi ro kế hoạch

| Rủi ro | Khả năng | Dấu hiệu sớm | Kế hoạch xử lý |
|---|---|---|---|
| **Dashboard rỗng → M1 không đo được** | **Đã xảy ra & đã xử lý** (pilot 2026-11-13) | Dashboard hiện `0 ₫` / `0` | Script `seed-orders.js` + `reset-db.ps1` với thứ tự đúng (§9); kiểm tra `6,400,000 ₫` / `5` đơn trước mỗi phiên |
| Người tham gia tự ghi → ghi chú quan sát thiếu chi tiết | Cao | Phiên thiếu mốc thời gian, thiếu lời nói | Bảng hỏi có mục bắt buộc ghi thời gian mỗi task; có mẫu `ghi-chu-template.md` điền sẵn cho họ |
| **Không có ghi âm → mất "think-aloud"** | **Cao** (điều chỉnh 2026-11-13) | Video không thu được tiếng nói; probe viết tắt | (a) Mic tích hợp laptop vẫn được OBS/ShareX thu **kèm video** nếu người tham gia không tắt — **không cần thiết bị ghi âm riêng**; (b) mọi probe bắt buộc trả lời **bằng chữ** trong `ghi-chu.md`; (c) yêu cầu người tham gia **gõ các mốc bị kẹt vào `ghi-chu.md` ngay khi xảy ra** — thay cho việc nói |
| Người tham gia "nghiên cứu trước" → mất tính tự nhiên | Trung bình | Họ đi thẳng vào thao tác mà không đọc kỹ | Nhắc trong hướng dẫn: không mở DevTools/đọc code trong lúc làm task |
| Phiên tự ghi → khó phân biệt "lỗi sản phẩm" với "lỗi mạng" | Trung bình | Task dừng bất thường | Cho phép nói "tôi nghĩ đây là lỗi mạng"; ghi vào probe; không tính vào lỗi UI |
| Biến động dữ liệu giữa các phiên do mỗi người tạo/xóa khác nhau | Trung bình | DB không được reset | Bắt buộc chạy §9 trước mỗi phiên; ghi lại giá trị Dashboard quan sát được trong từng phiên |
| Số người tham gia không đủ 7 do khó tuyển (tiêu chí loại trừ chặt) | Trung bình | Chưa đủ 5 người trong 1 tuần đầu | Nới tiêu chí (c): cho phép người đã đăng ký EShop nhưng chưa từng vào trang Admin |
| Người tham gia không có tài khoản admin EShop | Trung bình | Họ không có credential | Chuẩn bị sẵn 7 tài khoản admin riêng cho 7 người (không dùng chung `admin@eshop.com`) để tránh lẫn session |
| Hình thức tự ghi làm giảm độ sâu của probe | Trung bình | Probe trả lời cụt | Bắt buộc trả lời probe **bằng chữ**, tối thiểu 2–3 câu cho mỗi mảng; mẫu có sẵn câu hỏi gợi ý trong `ghi-chu-template.md` |
| **Thứ tự seed đơn hàng sai → Dashboard luôn rỗng** (phát hiện 2026-11-13) | **Đã xảy ra** | Dashboard hiện `0 ₫` / `0` | `database.js` chạy `initDatabase()` mỗi lần `require` → start server xoá sạch dữ liệu đã seed. Đã sửa: `seed-orders.js` mở DB trực tiếp, `reset-db.ps1` theo thứ tự **xoá → start server → seed-orders → kiểm tra** |
| **Tiêu chí thành công bất khả thi với người dùng** (phát hiện 2026-11-13) | **Đã xảy ra** | TCR của T2/T3 luôn 0% dù người tham gia làm đúng | Đã tách tiêu chí TCR / chỉ số phụ C1–C5 cho T2, T3 |

---

## 11. Xác nhận

- Ngày: 2026-11-11
- Người xác nhận: người dùng (qua bảng hỏi Gate A) — chốt: nhóm người tham gia, 4 mục tiêu, hình thức
  tự ghi, tài khoản user thường cho FR-12, reset DB sau mỗi phiên.
- **Điều chỉnh 2026-11-13 (người dùng):** loại bỏ hoàn toàn **ghi âm** — chỉ dùng **bản ghi màn hình**,
  probe trả lời bằng chữ.
