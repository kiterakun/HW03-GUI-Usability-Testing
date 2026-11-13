# 02 — Kịch bản nhiệm vụ (Task Scenarios)

| Trường | Nội dung |
|---|---|
| SUT / Flow | EShop Web Admin — `http://localhost:5174` · **Đăng nhập (FR-12) → Dashboard (FR-13) → Danh mục (FR-14) → Sản phẩm (FR-15)** |
| Người viết | AI (OpenCode / MiniMax M3.1 Flash) |
| Ngày | 2026-11-11 |
| Hình thức | Tự ghi (self-recorded) — người tham gia tự quay **màn hình**; suy nghĩ & phản hồi định tính được **ghi bằng chữ** trong `ghi-chu.md`. **Không ghi âm.** |
| Phiên bản (sau pilot) | `v1.0 (trước pilot)` — sẽ cập nhật sau khi chạy pilot |

---

## 1. Lời mở đầu cho người tham gia (đọc nguyên văn, ngay sau khi bật quay màn hình)

> "Cảm ơn bạn đã tham gia. Tôi đang kiểm tra **sản phẩm**, không phải kiểm tra bạn. Bất kỳ điều gì bạn
> thấy khó hiểu hay lỗi đều là thông tin quý giá với chúng tôi. Tôi sẽ im lặng và chỉ ghi chú, nhưng nếu
> bạn bị kẹt hoàn toàn thì tôi sẽ giúp một tay — lúc đó tôi sẽ báo bạn."
>
> "Yêu cầu chung: **hãy nói thành tiếng mọi suy nghĩ** nếu máy bạn có mic đang bật — chúng tôi sẽ ghi
> được tiếng trong video. Nếu bạn không muốn nói, **ghi suy nghĩ của bạn vào file `ghi-chu.md`** (mở sẵn
> cạnh bảng hỏi) — chúng tôi sẽ đọc file đó. Bạn không cần xin phép tôi để nói. Nếu chỗ nào làm bạn thấy
> lạ, hơi sai, hoặc bạn không chắc phải làm gì — hãy ghi/nói ra ngay tại lúc đó."
>
> "Trong lúc làm nhiệm vụ, **đừng mở DevTools, đừng xem mã nguồn, đừng tra Google**. Hãy làm như một
> người quản trị cửa hàng thật sự — nếu bạn làm thật mà vẫn bị vướng, thì đó chính là điều chúng tôi
> cần biết."

---

## 2. Task scenario

> **Thứ tự thực hiện:** T4 (đăng nhập) → T1 (Dashboard) → T2 (Danh mục) → T3 (Sản phẩm).
> Đây là thứ tự tự nhiên của app: vào trang quản trị để đăng nhập, đăng nhập xong thấy Dashboard.

---

### Task 4 — Đăng nhập vào trang quản trị (FR-12)

**Bối cảnh:**
> Bạn đang muốn quản lý sản phẩm trong cửa hàng EShop của mình. Trang quản trị nằm ở
> `http://localhost:5174`. Tài khoản quản trị của bạn là **admin@eshop.com / Admin123!**.

**Mục tiêu:**
> Hãy đăng nhập vào trang quản trị EShop bằng tài khoản quản trị đã cho bạn.

**Ràng buộc (thực hiện theo thứ tự này, không cần báo trước):**
> 1. Trước tiên hãy **thử đăng nhập sai** một lần — dùng một mật khẩu bạn tự nghĩ ra (ví dụ
>    `123456`), để xem hệ thống phản hồi thế nào.
> 2. Sau đó hãy **đăng nhập bằng tài khoản user thường**: `test@eshop.com` / `Test1234!`.
> 3. Cuối cùng hãy **đăng nhập đúng** bằng tài khoản quản trị để vào được hệ thống.

**Tiêu chí thành công:**
> Người tham gia đăng nhập được bằng tài khoản admin và **hiểu được** vì sao hai lần thử trước bị từ
> chối (biết đó là do sai mật khẩu / do không phải admin), và biết phải làm gì tiếp theo mà **không
> cần đọc mã nguồn hay hỏi người hướng dẫn**.

**Dữ liệu cần chuẩn bị:** Cả 2 tài khoản `admin@eshop.com` / `Admin123!` và
`test@eshop.com` / `Test1234!` đã tồn tại sau khi seed DB.

**Ước tính thời gian:** ≤ 4 phút

**Các trạng thái dự kiến:** Success / Error (sai mật khẩu) / Error (không phải admin) / Success

**Ghi chú cho người thu phiên:** quan sát 3 điểm —
(a) thông báo lỗi **có nói rõ nguyên nhân** không, (b) người tham gia **có tự nhận ra** lỗi là do
mình làm không, hay bị "đánh đốt" phải thử lại, (c) sau khi bị từ chối, người tham gia **biết phải
làm gì tiếp** hay phải quay lại đọc tài liệu.

---

### Task 1 — Hiểu Dashboard (FR-13)

**Bối cảnh:**
> Bạn vừa vào được trang quản trị. Đây là Dashboard — màn hình đầu tiên bạn thấy mỗi khi mở trang
> quản trị. Bạn cần biết shop mình đang kinh doanh tình hình thế nào.

**Mục tiêu:**
> Hãy cho biết bằng lời: **trên Dashboard này đang hiển thị những thông tin gì, và con số nào là doanh
> thu của shop?**

**Ràng buộc:**
> Chỉ cần quan sát và giải thích — không cần bấm vào tab nào khác. Hãy nói rõ "doanh thu" ở đây
> được tính từ những đơn hàng nào theo bạn hiểu.

**Tiêu chí thành công:**
> Người tham gia chỉ ra **đúng 2 thẻ số liệu** ("Tổng doanh thu (Delivered)" và "Tổng số đơn hàng")
> và **diễn giải được** "doanh thu" là từ các đơn **đã giao** (delivered) — không phải tổng tiền của
> mọi đơn.

**Dữ liệu cần chuẩn bị:** ≥ 5 đơn hàng ở các trạng thái khác nhau, ≥ 1 đơn `delivered` (xem §5).
Nếu Dashboard hiển thị `0 ₫` / `0` → **phiên không hợp lệ**, phải reset dữ liệu rồi chạy lại.

**Ước tính thời gian:** ≤ 4 phút

**Các trạng thái dự kiến:** Success (có dữ liệu) / Empty (0 đơn) / Loading / Error

**Ghi chú cho người thu phiên:** đây là task **đo khả năng diễn giải**, không phải đo tốc độ.
Ghi lại nguyên văn câu trả lời của người tham gia khi họ nói "doanh thu ở đây là ...". Nếu họ hiểu
sai (ví dụ nghĩ doanh thu = tổng tiền tất cả đơn), đó là phát hiện về **nhãn**, đánh giá mức độ
nghiêm trọng ở Module 6.

---

### Task 2 — Quản lý vòng đời Danh mục (FR-14)

**Bối cảnh:**
> Bạn đang muốn tổ chức lại danh mục sản phẩm của shop. Ví dụ bạn vừa bổ sung một nhóm sản phẩm mới
> và cần đưa nhóm đó vào hệ thống, đồng thời dọn một nhóm không còn dùng.

**Mục tiêu:**
> Hãy làm 3 việc trên trang quản lý Danh mục, theo đúng thứ tự:
> 1. **Tạo** một danh mục mới tên **`Giày dép`** (ghi đúng chính tả, không thêm mô tả).
> 2. **Đổi tên** danh mục đó thành **`Giày dép & Dép`** (đây là ý bạn về cách ghi tên danh mục trong
>    shop của bạn — bạn muốn gộp chung).
> 3. **Xóa** danh mục vừa đổi tên đó đi, vì bạn đã đổi ý và quyết định không dùng nhóm này nữa.

**Ràng buộc:**
> Làm theo thứ tự trên. Đây là các thao tác thật sự trên hệ thống — hãy cứ thực hiện, dữ liệu sẽ được
> khôi phục lại sau phiên test.

**Tiêu chí thành công (dùng để tính TCR):**
> (a) Danh mục `Giày dép` được tạo và **xuất hiện trong bảng bên dưới**;
> (b) Sau khi xóa, danh mục đó **không còn trong bảng**.
> Hai tiêu chí này đạt được **mà không cần gợi ý** → tính `completed`.

**Chỉ số phụ — "mức độ chặn" ở bước đổi tên (đo riêng, KHÔNG tính vào TCR):**
> Bước 2 (đổi tên) **không có chức năng tương ứng trong UI** (FR-14 chỉ yêu cầu Thêm/Xem/Xóa) →
> người tham gia **chắc chắn sẽ không hoàn thành** bước này. Đây là **dữ liệu có giá trị**, không phải
> lỗi của người tham gia. Ghi lại:
> - Họ có **nhận ra** mình không thể đổi tên không? (thời gian từ lúc bấm/chạm vào tên danh mục)
> - Họ đã **thử những cách nào**? (bấm vào tên / bấm đúp / tìm nút Sửa / hỏi bạn / tự tạo danh mục mới
>   rồi xóa cái cũ / bỏ qua)
> - Họ có **bỏ qua** bước 2 và làm tiếp bước 3 không, hay **dừng cả task**?
>
> **Quan trọng:** tiêu chí TCR của T2 **không** bao gồm "đổi tên được". Người tham gia vẫn đạt
> `completed` nếu tạo + xóa thành công, dù có bị kẹt ở bước đổi tên.

**Dữ liệu cần chuẩn bị:** Seed mặc định có 3 danh mục (Điện thoại, Laptop, Phụ kiện).

**Ước tính thời gian:** ≤ 6 phút

**Các trạng thái dự kiến:** Success / Empty (bảng trống) / Error / Success

**Ghi chú cho người thu phiên:** đây là task **cố ý chứa một bẫy**: theo FR-14, UI không có nút Sửa
danh mục. Hãy ghi lại người tham gia **tìm cách sửa tên bằng cách nào** (sửa trực tiếp trong bảng?
bấm vào tên? tạo lại danh mục mới rồi xóa cái cũ?) và mất bao lâu để nhận ra điều đó. Đây là dữ liệu
quan trọng cho M2. Đồng thời quan sát **thao tác xóa có hỏi lại xác nhận không** (FR-24 yêu cầu có
dialog xác nhận khi xóa).

---

### Task 3 — Tạo và cập nhật một Sản phẩm (FR-15)

**Bối cảnh:**
> Shop của bạn vừa nhận thêm mẫu mới. Bạn cần đưa mẫu đó lên bán, và cập nhật lại thông tin cho một
> mẫu cũ đang bán chạy.

**Mục tiêu:**
> Hãy làm 2 việc trên trang quản lý Sản phẩm:
> 1. **Tạo** một sản phẩm mới với thông tin sau:
>    - Tên: **`Áo khoác dạ`**
>    - Giá: **`450000`** (đơn vị ₫)
>    - Mô tả: **`Áo khoác dạ giữa ấm mùa đông`** (tuỳ chọn)
>    - Ảnh: **để trống**
>    - Danh mục: **`Phụ kiện`**
> 2. **Sửa** sản phẩm **`Tai nghe AirPods Pro 2`** (đang có sẵn trong bảng) để đổi tên thành
>    **`Tai nghe AirPods Pro 2 (Gen 2)`** và đổi giá thành **`5990000`**.

**Ràng buộc:**
> Làm theo thứ tự trên. Điều quan trọng là bạn **có nhập được đủ thông tin bắt buộc** hay không, và
> bạn **nhận biết được** khi nào hệ thống báo thiếu gì.

> **Vì sao bỏ yêu cầu "dán URL ảnh"?** (điều chỉnh sau pilot 2026-11-13) Bảng sản phẩm chỉ hiển thị
> **thumbnail 48×48**, không hiển thị URL ảnh ở đâu cả, và kịch bản cấm mở DevTools → người tham gia
> **không thể biết URL nào để dán**. Giữ yêu cầu đó sẽ tạo ra một điểm kẹt **giả**, không liên quan
> tới giả thuyết nghiên cứu.

**Tiêu chí thành công (dùng để tính TCR):**
> (a) Sản phẩm `Áo khoác dạ` xuất hiện trong bảng với **đúng giá `450000`** và **đúng danh mục
> `Phụ kiện`**;
> (b) Sau khi sửa, hệ thống **báo thành công** (thông báo "Cập nhật thành công!") và người tham gia
> **tin rằng** thay đổi đã được áp dụng.
> Đạt cả (a) và (b) **mà không cần gợi ý** → tính `completed`.

**Chỉ số phụ — "mức độ nhận thức" (đo riêng, KHÔNG tính vào TCR):**

| # | Cần quan sát | Ghi chú |
|---|---|---|
| C1 | Người tham gia có **nhận ra tên của các sản phẩm KHÁC** trong bảng cũng bị đổi thành `Tai nghe AirPods Pro 2 (Gen 2)` không? | Đây là lỗi `fakeMassUpdatedProducts` (`App.jsx:110-114`) — vi phạm FR-15. Nếu họ **không** nhận ra → mức độ nghiêm trọng cao |
| C2 | Người tham gia có **nhận ra giá `5990000` không hiển thị** (dòng vẫn hiện `6000000 ₫`) không? | Lỗi hiển thị — DB đã cập nhật đúng nhưng UI không refresh. Nếu họ **không** nhận ra → họ tin là đã sửa thành công → ảnh hưởng **trust** |
| C3 | Người tham gia có **nhận ra ô nào là bắt buộc** không (tên, giá, danh mục — có ký hiệu `*` hay không)? | FR-22 |
| C4 | Họ có thử nhập **giá âm / 0** không, và phản hồi của hệ thống ra sao? | FR-15 yêu cầu giá > 0; dry-run đã xác nhận hệ thống **vẫn lưu** giá âm |
| C5 | Họ có nhận ra sự khác biệt giữa `450000 ₫` và `450.000 ₫` khi đọc giá không? | FR-21 |

> **Vì sao bỏ tiêu chí "giá hiển thị 5990000" và "sản phẩm khác không bị đổi tên" khỏi điều kiện
> thành công?** (điều chỉnh sau pilot 2026-11-13) Cả hai điều kiện đó **không thể đạt được bởi người
> dùng** — chúng là lỗi của sản phẩm (đã xác nhận bằng dry-run). Nếu giữ trong tiêu chí thành công,
> mọi người tham gia đều bị đánh dấu "không hoàn thành" dù họ làm đúng → tín hiệu vô nghĩa và
> đánh giá sai năng lực người dùng. Chúng được chuyển thành **chỉ số nhận thức C1/C2 ở trên**.

**Dữ liệu cần chuẩn bị:** Seed mặc định có 5 sản phẩm, trong đó có `Tai nghe AirPods Pro 2` thuộc
danh mục `Phụ kiện`.

**Ước tính thời gian:** ≤ 8 phút

**Các trạng thái dự kiến:** Success / Empty / Error (thiếu tên) / Error (giá ≤ 0) / Error (server)

**Ghi chú cho người thu phiên:** đây là task **quan trọng nhất** của đợt test. Ghi lại:
(a) người tham gia có **nhận ra** ô nào là bắt buộc không (tên, giá, danh mục — có ký hiệu `*` hay
không?), và họ có biết **từ chối là do trường nào** không;
(b) có họ thử nhập **giá âm hoặc 0** không, và phản hồi của hệ thống ra sao;
(c) sau khi bấm "Sửa" một sản phẩm, họ có **nhận ra** những sản phẩm khác bị đổi tên không, và có
nhận ra giá mới không hiển thị không. Nếu họ không nhận ra, hãy hỏi ở probe E8/E9.

---

## 3. Tiêu chí kết quả (dùng thống nhất cho mọi phiên)

| Kết quả | Định nghĩa | Ghi trong bảng tổng hợp |
|---|---|---|
| Hoàn thành | Đạt đủ tiêu chí, **tự** xong, không cần gợi ý | `completed` |
| Hoàn thành có trợ giúp | Đạt tiêu chí nhưng cần gợi ý (người tham gia tự "gợi ý cho mình" qua DevTools / đọc lại tài liệu / bỏ cuộc rồi quay lại) | `completed_with_help` |
| Dừng giữa chừng | Người tham gia bỏ cuộc / không tiến triển được | `abandoned` |
| Không hoàn thành | Hết thời gian, chưa đạt tiêu chí | `not_completed` |

> Trong hình thức **tự ghi**, người tham gia tự phân loại kết quả ở cuối mỗi task trong
> `responses.csv`; người thu phiên **đối chiếu lại** bằng video và sửa nếu có sai lệch (ghi rõ
> nếu có sửa).

---

## 4. Kịch bản moderator

> Vì hình thức **tự ghi**, không có moderator trực tiếp trong phiên. Các nguyên tắc dưới đây được
> chuyển thành **chỉ dẫn cho người tham gia** và **quy tắc cho người thu phiên khi xem lại video**.
> **Không dùng ghi âm** — mọi phản hồi định tính đến từ video (hành vi) + `ghi-chu.md` (lời người dùng).

### Câu hỏi trung tính (người tham gia tự hỏi/ghi, hoặc người thu phiên hỏi bằng follow-up sau phiên)

- "Bạn đang nghĩ gì?"
- "Bạn đang tìm gì?"
- "Bạn mong đợi điều gì ở đây?"
- "Nếu là bạn, bạn sẽ làm gì tiếp theo?"

### Tuyệt đối không nói / không làm

- ❌ "Bạn phải bấm vào nút X."
- ❌ "Thử tìm trong menu bên trái."
- ❌ "Đúng rồi, bấm tiếp đi."
- ❌ "Sửa lại số điện thoại đi."
- ❌ Gửi tài liệu / video hướng dẫn cho người tham gia trong lúc đang làm task.
- ❌ Sửa giúp khi người tham gia kẹt.

### Can thiệp khi bị kẹt

> Sau ≥2–3 phút không tiến triển: *"Tôi sẽ giúp bạn một chút nhé. [làm 1 hành động]. Bạn tiếp tục nhé."*

Trong hình thức tự ghi: người tham gia được phép **ghi vào `ghi-chu.md`** "Tôi bị kẹt ở bước … lúc …
phút" rồi dừng task đó và đi tiếp. Người thu phiên ghi lại điểm dừng từ video.

### Follow-up cho người thu phiên (sau khi xem video, hỏi bổ sung nếu probe trong `ghi-chu.md` chưa rõ)

- "Lúc bạn bấm X, bạn mong kết quả sẽ là gì?" (probe động)
- "Bạn có nhận ra điều gì trên màn hình vừa thay đổi không?"
- "Nếu đây là shop của bạn, bạn có dùng con số trên Dashboard để quyết định gì không?"

---

## 5. Quy trình reset giữa các phiên

> **Người dùng chốt: reset DB (seed lại) sau mỗi phiên.**
>
> ⚠️ **THỨ TỰ BẮT BUỘC — sai thứ tự sẽ làm Dashboard rỗng và hỏng Task T1.**
> Lý do: `backend/database.js` chạy `initDatabase()` **ngay khi được `require`** — nghĩa là mỗi lần
> `require('./database')` (mà `server.js` làm) sẽ **DROP và tạo lại toàn bộ bảng**, xoá sạch dữ liệu
> đã seed. Phải seed đơn hàng **SAU** khi server đã chạy.

| Bước | Hành động | Tự động / Thủ công | Ghi chú |
|---|---|---|---|
| 1 | Dừng backend (`Ctrl+C` ở terminal chạy `node server.js`) | Thủ công | Bắt buộc để đóng kết nối SQLite |
| 2 | Xoá file `backend/database.sqlite` | Thủ công | Xoá **file**, giữ thư mục |
| 3 | Chạy `node backend/server.js` | Thủ công | Server tự tạo bảng + seed: 2 user, 3 danh mục, 5 sản phẩm, 4 coupon |
| 4 | Chạy `node backend/seed-orders.js` | Thủ công | **Bắt buộc** — seed mặc định KHÔNG có đơn hàng. Script mở DB trực tiếp, KHÔNG `require('./database')` |
| 5 | Mở `http://localhost:5174` → đăng nhập → Dashboard phải hiện **`6,400,000 ₫`** và **`5`** đơn | Thủ công | Nếu vẫn là 0 → **không cho chạy phiên** |
| 6 | Xác nhận Web Admin `:5174` vẫn chạy | Thủ công | Admin dev server không cần restart |
| 7 | Xoá file bản ghi của phiên trước khỏi `recordings/` & `screenshots/` | Thủ công | Giữ workspace sạch |

> **Tự động hóa:** chạy `powershell -ExecutionPolicy Bypass -File usability-testing-outputs/reset-db.ps1`
> — script làm đúng thứ tự bên trên và in ra giá trị Dashboard kỳ vọng để đối chiếu.

### Đặc tả dữ liệu đơn hàng mẫu (`backend/seed-orders.js` — đã tạo)

Tạo **5 đơn hàng** với `total_amount` khác nhau, trải đủ các trạng thái, để Dashboard có dữ liệu đủ
phong phú để người tham gia diễn giải:

| # | user_id | total_amount | status | shipping_address |
|---|---|---|---|---|
| 1 | 2 (test user) | 450000 | `pending` | `12 Lê Lợi, Q1, TP.HCM` |
| 2 | 2 | 1250000 | `confirmed` | `45 Nguyễn Huệ, Q1, TP.HCM` |
| 3 | 2 | 890000 | `shipping` | `88 Trần Phú, Q5, TP.HCM` |
| 4 | 2 | 3200000 | `delivered` | `221 Hai Bà Trưng, Q3, TP.HCM` |
| 5 | 2 | 760000 | `canceled` | `35 Lý Tự Trọng, Q1, TP.HCM` |

> ⚠️ **Lưu ý về FR-13:** frontend tính doanh thu bằng `o.total_amount * 2` (`App.jsx:218`) — nhân đôi
> số thực. Điều này **không phải lỗi hiển thị do dữ liệu**, mà là lỗi triển khai.
> - Giá trị **đúng** = `3,200,000 ₫` → giá trị **hiển thị** trên UI = `6,400,000 ₫`.
> - Task T1 **không dùng con số làm chuẩn** — chỉ dùng việc người dùng **nói đúng "delivered"** là
>   chuẩn. Người thu phiên ghi lại **con số họ đọc ra** để đối chiếu khi phân tích.
> - Định dạng hiển thị là `6,400,000 ₫` (dấu phẩy, locale `en-US`) chứ không phải `6.400.000 ₫`
>   (`vi-VN`) — ghi nhận ở Module 5/6 (FR-21).

---

## 6. Ghi chú kỹ thuật quan trọng cho người thu phiên

| Điểm | Vị trí | Ý nghĩa cho việc diễn giải | Xác minh bằng dry-run 2026-11-13 |
|---|---|---|---|
| Admin API **không kiểm tra `role`** | `backend/server.js:494, 504, 510, 525` — tất cả route `/api/admin/*` chỉ dùng `authenticateToken`, không có middleware kiểm tra `role = 'admin'` | Vi phạm FR-12/SEC-03. Nhưng UI chặn ở client (`App.jsx:65`) → người tham gia **không nhìn thấy** lỗ hổng này trên UI. Đây là **phát hiện kiểm thử backend**, không phải phát hiện usability — ghi vào phụ lục, **không tính vào điểm SUS**. | Không kiểm được qua UI |
| Dashboard nhân đôi doanh thu | `App.jsx:217-220` — `sum + o.total_amount * 2` | Số hiển thị sai gấp 2 lần (đúng `3.200.000 ₫`, hiện `6.400.000 ₫`). Người tham gia **không có cách nào nhận ra** (không có số đối chiếu) → ảnh hưởng **trust** (probe E4/E6). | ✅ Xác nhận |
| Sửa sản phẩm sửa tên **mọi** sản phẩm | `App.jsx:110-114` — `fakeMassUpdatedProducts` map toàn bộ list | Vi phạm FR-15. Đây là **phát hiện quan trọng nhất** của Task 3 → chỉ số C1. | ✅ Xác nhận — 5/5 dòng đều đổi tên |
| Sửa sản phẩm → **giá mới không hiển thị** | `App.jsx:110-114` — `fakeMassUpdatedProducts` chỉ copy `name`, giữ `price` cũ | Vi phạm FR-15. DB có đúng `5990000` nhưng UI vẫn hiện `6000000 ₫` → người dùng tưởng sửa thất bại → chỉ số C2. | ✅ Xác nhận |
| UI không có nút **Sửa danh mục** | `App.jsx:294-335` — bảng Danh mục chỉ có cột ID / Tên / Hành động (chỉ nút Xóa) | FR-14 chỉ yêu cầu Thêm/Xem/Xóa, nên **không phải bug** — nhưng Task 2 yêu cầu đổi tên → người tham gia sẽ bị chặn. Đây là **vấn đề thiết kế** (khoảng trống chức năng), xếp severity ở Module 6. → **chỉ số phụ "mức độ chặn"** của T2. | ✅ Xác nhận — chỉ có nút "Xóa" |
| Xóa danh mục / sản phẩm **không có dialog xác nhận** | `App.jsx:153-160`, `App.jsx:133-140` — gọi API thẳng, không confirm | Vi phạm FR-24. Đo bằng probe "Bạn có chắc xóa là xóa hẳn không?". | ✅ Xác nhận — không có dialog confirm |
| Thông báo lỗi dùng `alert()` | `App.jsx:72, 81, 91, 128, 150` | Không có feedback inline, không có loading state → ảnh hưởng **error recovery** (probe E2). | ✅ Xác nhận — 3 hộp thoại, 0 phần tử loading |
| **Giá âm vẫn được lưu** | `server.js:167-177` — `POST /api/products` không validate `price > 0` | Vi phạm FR-15. Đo bằng chỉ số C4. | ✅ Xác nhận — DB lưu `price = -5000` |
| Giá hiển thị không phân cách nghìn | `App.jsx:590` — `{p.price} ₫` (giá trị thô) | Vi phạm FR-21. Ví dụ `30000000 ₫` thay vì `30.000.000 ₫`. Người tham gia có thể bị khó đọc giá → chỉ số C5. | ✅ Xác nhận |
| Dashboard dùng locale `en-US` | `App.jsx:283` — `toLocaleString()` không truyền locale | Hiện `6,400,000 ₫` thay vì `6.400.000 ₫` → vi phạm FR-21 (nhất quán định dạng tiền). | ✅ Xác nhận |
| Form không có `<label>`, chỉ có `placeholder` | `App.jsx:500-535` (form sản phẩm), `App.jsx:298-303` (form danh mục), `App.jsx:192-208` (login) | Vi phạm FR-22 (ký hiệu `*` bắt buộc). Đo bằng chỉ số C3. | ✅ Xác nhận — form sản phẩm: 0 `<label>`, 1 field `required`, 0 field có `*` |
| Trang đăng nhập dùng **tiếng Anh** | `App.jsx:192-213` — "Admin Login", placeholder "Email"/"Password", nút "Login" | Vi phạm FR-21 (toàn bộ giao diện tiếng Việt). Đo bằng probe E2/E5. | ✅ Xác nhận |
| Không có router, dùng `activeTab` | `App.jsx:10` | Điều hướng không đổi URL, không có breadcrumb → FR-23. Ghi nhận ở Module 5 (H1/H3), không đo trực tiếp bằng task. | ✅ Xác nhận — URL luôn `http://localhost:5174/` |

> **Nguyên tắc:** các mục trên là **kiến thức nền cho người thu phiên**, dùng để **đối chiếu** phát hiện
> từ người tham gia — **không** được nói cho người tham gia trước khi họ làm task.

---

## 7. Câu hỏi phụ dành riêng cho từng task (đưa vào probe)

### Task 4 (FR-12 — Access Control)
- Khi đăng nhập sai, bạn nghĩ hệ thống đang báo lỗi gì?
- Khi đăng nhập bằng tài khoản thường bị từ chối, bạn hiểu vì sao không? Bạn biết phải làm gì tiếp
  theo không?
- Thông báo lỗi có đủ thông tin để bạn tự xử lý không?

### Task 1 (FR-13 — Dashboard)
- Bạn hiểu "Tổng doanh thu" ở đây gồm những đơn nào? Bạn có chắc không?
- Hai con số này giúp bạn quyết định điều gì trong công việc? Bạn có cần thêm thông tin gì không?

### Task 2 (FR-14 — Danh mục)
- Bạn có tìm được cách **đổi tên** một danh mục không? Nếu không, bạn đã làm gì?
- Khi bạn bấm "Xóa", bạn có chắc là dữ liệu sẽ mất hẳn không? Hệ thống có hỏi lại bạn không?
- Sau khi thêm/xóa, bạn có biết chắc thao tác đã thành công không?

### Task 3 (FR-15 — Sản phẩm)
- Bạn có biết ô nào là **bắt buộc** phải điền không? Làm sao bạn biết?
- Khi hệ thống không cho bạn lưu, thông báo có chỉ ra **trường nào** còn thiếu không?
- Sau khi bấm "Sửa" một sản phẩm, bạn có nhận ra tên của **những sản phẩm khác** trong bảng cũng bị
  thay đổi không?
- Sau khi bấm "Sửa", **giá `5990000` bạn vừa nhập có xuất hiện trong bảng không?** Nếu không, bạn có
  nhận ra không?
- Bạn có nhận ra sự khác biệt giữa `450000 ₫` và `450.000 ₫` khi đọc giá không?

---

## 8. Kết quả phiên pilot

### 8.1. Dry-run kỹ thuật (AI tự thực hiện, 2026-11-13)

> ⚠️ **KHÔNG PHẢI PHIÊN NGƯỜI THAM GIA THẬT** — không tính vào điểm, không đếm là 1 phiên.
> Chi tiết đầy đủ: `pilot-run/pilot-report.md` · log: `pilot-run/pilot-log.md` · ảnh:
> `pilot-run/screenshots/`.

| Mục | Nội dung |
|---|---|
| Ngày chạy | 2026-11-13 |
| Hình thức | Playwright + Chromium headless, tự động hóa thao tác giống người dùng |
| Kết quả từng task | T4 ✅ chạy được · T1 ⚠️ cần seed đơn hàng · T2 ⚠️ bước "đổi tên" không tồn tại · T3 ⚠️ tiêu chí giá không đạt được |
| Lỗi kịch bản phát hiện | **3** (T2 đổi tên · T3 dán URL ảnh · T3 tiêu chí giá) |
| Lỗi môi trường phát hiện | **1** (thứ tự seed đơn hàng → Dashboard luôn rỗng) |
| Lỗi chức năng xác minh | **11/13** nghi vấn từ mã nguồn được xác nhận bằng dry-run; 2 nghi vấn mới (giá âm lưu được · giá mới không hiển thị sau khi sửa) |
| Thời gian thực tế | Không đo được (tự động hóa) → cần phiên người thật để đo |
| Điều chỉnh đã thực hiện | 8 điều chỉnh — xem bảng dưới |

**Các điều chỉnh đã áp dụng sau dry-run:**

| # | File | Thay đổi |
|---|---|---|
| 1 | `02-task-scenarios.md` — T2 | Tách tiêu chí TCR (tạo + xóa) khỏi chỉ số phụ "mức độ chặn" (đổi tên) |
| 2 | `02-task-scenarios.md` — T3 | "Ảnh: **để trống**"; bỏ tiêu chí "giá 5990000 hiển thị" và "sản phẩm khác không đổi tên" khỏi điều kiện thành công; thêm 5 chỉ số C1–C5 |
| 3 | `02-task-secnarios.md` — §5 | Quy trình reset DB mới: xoá → **start server** → seed-orders → kiểm tra |
| 4 | `02-task-scenarios.md` — §6 | Bảng ghi chú kỹ thuật: thêm cột "Xác minh bằng dry-run", thêm 4 dòng lỗi mới |
| 5 | `02-task-scenarios.md` — §7 | Probe T3: thêm câu hỏi về giá không hiển thị sau khi sửa |
| 6 | `eshop-sut/backend/seed-orders.js` | Viết lại: mở DB trực tiếp, KHÔNG `require('./database')` |
| 7 | `usability-testing-outputs/reset-db.ps1` | Viết lại theo thứ tự đúng, tự in giá trị Dashboard kỳ vọng |
| 8 | `03-questionnaire.md` + `questionnaire-for-participant.md` + `ghi-chu-template.md` | Probe E8/E9 bổ sung câu hỏi về giá không cập nhật; chuyển probe sang trả lời **bằng chữ** (bỏ ghi âm) |

### 8.2. Phiên pilot với người thật — **CHƯA CHẠY**

| Mục | Nội dung |
|---|---|
| Ngày chạy pilot | _Chưa chạy_ |
| Người tham gia pilot | _Chưa tuyển_ |
| Task có vấn đề gì | _Chưa chạy_ |
| Người tham gia có hiểu đúng mục tiêu không (không cần gợi ý)? | _Chưa chạy_ |
| Thời gian thực tế so với dự kiến | _Chưa chạy_ |
| Điều chỉnh đã thực hiện | _Chưa chạy_ |

> **Dry-run kỹ thuật KHÔNG thay thế được phiên pilot với người thật** — nó không đo được phản ứng
> tâm lý, thời gian thực tế và độ khó hiểu của kịch bản từ góc nhìn người dùng. Theo yêu cầu HW03,
> vẫn cần **≥ 1 phiên pilot với 1 người thật** trước khi chạy 7 phiên.
