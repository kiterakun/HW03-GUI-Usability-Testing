# {{Mã}} — Ghi chú phiên test

> **Template cho phiên tự ghi (self-recorded).** Sao chép file này thành `P01-session-notes.md` … rồi điền.
> **Người thu phiên điền sau khi xem lại video.** AI không được điền hộ.

| Trường | Nội dung |
|---|---|
| Mã người tham gia | P{{XX}} |
| Họ tên | _(ghi tên thật ở đây; **che 4 số giữa** khi đưa vào file bảng tổng hợp)_ |
| Liên hệ | _(che: 09***6789 / a***@gmail.com)_ |
| Ngày & giờ | |
| Thời lượng | |
| Hình thức | ⬜ Tự ghi (self-recorded) — **chỉ bản ghi màn hình**, không ghi âm |
| Người thu phiên (xem video) | |
| Thiết bị / trình duyệt / kích thước màn hình | |
| SUT phiên bản / môi trường | `eshop-sut` commit `85af3ba` · `http://localhost:5174` · API `:3000` |
| Đồng ý quay màn hình | ⬜ Có ⬜ Không |
| Tệp quay màn hình | `recordings/P01-session.mp4` |
| File bảng hỏi | `responses.csv` → dòng `P01` |
| File ghi chú của người tham gia | `recordings/P01-ghi-chu.md` |

## 0. Trạng thái phiên

| Kiểm | Kết quả |
|---|---|
| DB đã reset (seed lại) trước phiên này? | ⬜ Có ⬜ Không → **phiên không hợp lệ nếu không có** |
| Dashboard hiển thị số khác 0 trước khi bắt đầu? | ⬜ Có (ghi giá trị: doanh thu ___ ₫ / ___ đơn) ⬜ Không → **phiên không hợp lệ** |
| Người tham gia có mở DevTools / tra Google / xem mã nguồn? | ⬜ Không ⬜ Có (mô tả) |
| Phiên có cần loại bỏ khỏi tổng hợp không? | ⬜ Không ⬜ Có — lý do: ______ |

> **Lưu ý:** nếu Dashboard rỗng (0 ₫ / 0 đơn) thì Task T1 (FR-13) **không đo được** → đánh dấu
> `not_completed` cho T1 và ghi rõ lý do "môi trường rỗng", **không** tính vào tỷ lệ hoàn thành
> nếu người tổ chức chốt loại phiên.

## 1. Hồ sơ người tham gia

| Thuộc tính | Giá trị |
|---|---|
| Nhóm người dùng | |
| Độ tuổi | |
| Nghề nghiệp | |
| Kinh nghiệm e-commerce / quản trị shop | |
| Thiết bị thường dùng | |
| Có phải sinh viên HW03 không | ⬜ Không |
| Có phải người trong ngành IT/QA không | ⬜ Không |

## 2. Kết quả từng task

| Task | FR | Kết quả | Thời gian (phút) | Người tham gia tự đánh dấu | Người thu phiên đối chiếu | Ghi chú |
|---|---|---|---|---|---|---|
| T4 — Đăng nhập | FR-12 | ⬜ completed ⬜ completed_with_help ⬜ abandoned ⬜ not_completed | | | | |
| T1 — Dashboard | FR-13 | ⬜ completed ⬜ completed_with_help ⬜ abandoned ⬜ not_completed | | | |
| T2 — Danh mục | FR-14 | ⬜ completed ⬜ completed_with_help ⬜ abandoned ⬜ not_completed | | | |
| T3 — Sản phẩm | FR-15 | ⬜ completed ⬜ completed_with_help ⬜ abandoned ⬜ not_completed | | | |

> Nếu người thu phiên **sửa** kết quả so với đánh dấu của người tham gia → ghi rõ ở §8.

### 2.1. Tiêu chí thành công chi tiết (đối chiếu từng tiêu chí)

**T4 — Đăng nhập**
- [ ] Hiểu được vì sao lần đăng nhập sai bị từ chối
- [ ] Hiểu được vì sao tài khoản user thường bị từ chối
- [ ] Biết phải làm gì tiếp theo mà không cần trợ giúp

**T1 — Dashboard**
- [ ] Chỉ ra được 2 thẻ số liệu
- [ ] Diễn giải doanh thu = đơn **delivered** (không phải mọi đơn)
- [ ] Con số họ đọc ra: ______ ₫ (giá trị đúng theo seed = **3.200.000 ₫**; giá trị hiện thị do bug ×2 = **6.400.000 ₫**)

**T2 — Danh mục**
- [ ] Tạo được `Giày dép`, xuất hiện trong bảng
- [ ] Đổi tên được thành `Giày dép & Dép` (đọc mục §2.2)
- [ ] Xóa được, danh mục biến mất khỏi bảng

**T3 — Sản phẩm**
- [ ] Tạo được `Áo khoác dạ` với giá `450000` và danh mục `Phụ kiện`
- [ ] Sửa được `Tai nghe AirPods Pro 2` → tên mới + giá `5990000`
- [ ] **Các sản phẩm khác KHÔNG bị đổi tên** (kiểm tra lại từ video)

## 2.2. Ghi chú riêng cho Task T2 (bẫy: UI không có chức năng Sửa danh mục)

| Câu hỏi | Trả lời của người tham gia (nguyên văn) |
|---|---|
| Họ có tìm ra cách đổi tên không? | |
| Họ đã thử những cách gì? (sửa trong bảng / bấm vào tên / tạo mới rồi xóa cũ / không làm gì) | |
| Mất bao lâu (phút) để nhận ra không có chức năng sửa? | |
| Họ có hỏi/hét gọi người tổ chức không? | |

## 2.3. Ghi chú riêng cho Task T3 (bẫy: sửa 1 sản phẩm làm đổi tên mọi sản phẩm)

| Câu hỏi | Trả lời |
|---|---|
| Họ có nhận ra tên sản phẩm khác bị đổi không? (quan sát tự phát hiện) | ⬜ Có ⬜ Không |
| Nếu không tự phát hiện — họ trả lời E8 thế nào? | |
| Họ có nhận ra ô nào bắt buộc không? | |
| Họ có thử giá ≤ 0 không? Phản hồi hệ thống thế nào? | |
| Họ có nhận ra `450000 ₫` vs `450.000 ₫` không? | |

## 3. Dòng thời gian (timeline) — trích từ video

| Mốc | Task | Sự kiện quan sát được | Trích dẫn lời nói (nguyên văn) | Mức độ bực bội (1–3) |
|---|---|---|---|---|
| 00:00 | — | (đọc phần mở đầu) | | |
| | | | | |

> **Mức độ bực bội tham chiếu:**
> 1 = Không có dấu hiệu khó chịu · 2 = Dừng lại, hỏi câu hỏi tự nhiên, thử lại · 3 = Bực bội rõ
> rệt (thở dài, nói "không hiểu sao", yêu cầu bỏ qua, bỏ cuộc).

## 4. Điểm nhiễm (friction points)

| # | Mô tả trung tính (không diễn giải) | Trích dẫn | Số lần xảy ra | Mức độ (1–3) | Mốc thời gian | Ảnh / video |
|---|---|---|---|---|---|---|
| F1 | | | | | | |

## 5. Trợ giúp / can thiệp

> Với hình thức tự ghi: ghi lại mọi hành động người tham gia tự làm để vượt trở ngại (tra Google, mở
> DevTools, xem lại tài liệu, hỏi người tổ chức).

| Mốc | Hành động | Lý do | Ảnh hưởng tới kết quả task |
|---|---|---|---|
| | | | ⬜ Không ⬜ Có — kết quả tính là `completed_with_help` |

## 6. Điểm bảng hỏi của phiên này

> Sao chép từ dòng `P{{XX}}` trong `responses.csv`.

### SUS (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 | Điểm đã điều chỉnh |
|---|---|---|---|---|---|---|
| 1 | | | | | | `điểm − 1` |
| 2 | | | | | | `5 − điểm` |
| 3 | | | | | | `điểm − 1` |
| 4 | | | | | | `5 − điểm` |
| 5 | | | | | | `điểm − 1` |
| 6 | | | | | | `5 − điểm` |
| 7 | | | | | | `điểm − 1` |
| 8 | | | | | | `5 − điểm` |
| 9 | | | | | | `điểm − 1` |
| 10 | | | | | | `5 − điểm` |
| | | | | | **Tổng điều chỉnh** | |
| | | | | | **Điểm SUS = (2.5 × tổng) − 50** | |

### UEQ-S (thang 1–7)

| Câu | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| … | | | | | | | |
| 26 | | | | | | | |

### Thang tùy chỉnh F1–F6 (thang 1–5)

| Câu | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| F1 | | | | | |
| F2 | | | | | |
| F3 | | | | | |
| F4 | | | | | |
| F5 | | | | | |
| F6 | | | | | |

### Đánh giá nhiệm vụ (Phần D) — theo từng task

| Câu | T4 | T1 | T2 | T3 |
|---|---|---|---|---|
| D1. Tôi đã hoàn thành được nhiệm vụ. | | | | |
| D2. Nhiệm vụ này dễ thực hiện. | | | | |
| D3. Tôi không cần hỗ trợ của người khác. | | | | |

## 7. Câu trả lời probe (nguyên văn từ `ghi-chu.md` của người tham gia — không diễn giải)

| Câu | Trích lời nói |
|---|---|
| E1 – Clarity | |
| E2 – Error recovery | |
| E3 – Speed | |
| E4 – Trust | |
| E5 – FR-12 | |
| E6 – FR-13 | |
| E7 – FR-14 | |
| E8 – FR-15 | |
| E9 – FR-15 (giá) | |
| E10 | |
| E11 | |

## 8. Ghi chú khác

_(Điều gì đặc biệt về phiên này: lời nói đáng chú ý, hành vi bất thường, lỗi môi trường, chỗ người thu
phiên đã sửa kết quả so với đánh dấu của người tham gia…)_

-
