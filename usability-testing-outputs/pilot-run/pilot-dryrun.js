// PILOT DRY-RUN — kiểm chứng tính khả thi của kịch bản (không phải dữ liệu người tham gia)
// Chạy: node pilot-dryrun.js
// Output: pilot-run/screenshots/*.png + pilot-run/pilot-log.md

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const SHOT = path.join(__dirname, "screenshots");
fs.mkdirSync(SHOT, { recursive: true });

const log = [];
let step = 0;
function L(line) {
  const s = `[${String(++step).padStart(2, "0")}] ${line}`;
  console.log(s);
  log.push(s);
}
function H(level, text) {
  L(`**${level}:** ${text}`);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const dialogs = [];
  page.on("dialog", async (d) => {
    dialogs.push({ type: d.type(), message: d.message() });
    L(`⚠ DIALOG [${d.type()}]: "${d.message()}"`);
    await d.accept();
  });
  page.on("console", (m) => {
    if (m.type() === "error") L(`⚠ console.error: ${m.text()}`);
  });

  const shot = async (name) => {
    const f = path.join(SHOT, `${String(step).padStart(2, "0")}-${name}.png`);
    await page.screenshot({ path: f, fullPage: false });
    L(`📸 ${path.basename(f)}`);
  };

  // ============ T4 — FR-12 Access Control ============
  L("=== T4: Đăng nhập (FR-12) ===");
  await page.goto("http://localhost:5174", { waitUntil: "networkidle" });
  await shot("login-form");
  L(`Tiêu đề form đăng nhập: "${await page.locator("form h2").innerText()}"`);
  const loginInputs = await page.locator("form input").count();
  const labelCount = await page.locator("form label").count();
  L(`Số input trong form: ${loginInputs}; số <label>: ${labelCount}`);
  L(`Placeholder input: ${JSON.stringify(await page.locator("form input").evaluateAll((els) => els.map((e) => e.placeholder)))}`);
  L(`type của input: ${JSON.stringify(await page.locator("form input").evaluateAll((els) => els.map((e) => e.type)))}`);

  // 4.1 đăng nhập sai
  await page.locator('input[placeholder="Email"]').fill("admin@eshop.com");
  await page.locator('input[placeholder="Password"]').fill("123456");
  await page.locator("form button").click();
  await page.waitForTimeout(800);
  await shot("login-wrong-password");
  H("FR-12", `Sau khi sai mật khẩu: hộp thoại = ${dialogs.length ? JSON.stringify(dialogs.at(-1).message) : "KHÔNG CÓ"}`);

  // 4.2 đăng nhập bằng tài khoản user thường
  await page.locator('input[placeholder="Email"]').fill("test@eshop.com");
  await page.locator('input[placeholder="Password"]').fill("Test1234!");
  await page.locator("form button").click();
  await page.waitForTimeout(800);
  await shot("login-as-normal-user");
  H("FR-12", `Sau khi dùng tài khoản user thường: hộp thoại = ${dialogs.length ? JSON.stringify(dialogs.at(-1).message) : "KHÔNG CÓ"}`);

  // 4.3 đăng nhập đúng
  await page.locator('input[placeholder="Email"]').fill("admin@eshop.com");
  await page.locator('input[placeholder="Password"]').fill("Admin123!");
  await page.locator("form button").click();
  await page.waitForTimeout(1500);
  await shot("dashboard-after-login");
  const sidebarVisible = await page.locator("text=EShop Admin").isVisible().catch(() => false);
  L(`Vào được trong admin? ${sidebarVisible ? "CÓ" : "KHÔNG"}`);

  // ============ T1 — FR-13 Dashboard ============
  L("=== T1: Dashboard (FR-13) ===");
  const dashText = await page.locator("main, .flex-1").first().innerText().catch(() => "");
  L(`Nội dung Dashboard: ${JSON.stringify(dashText.slice(0, 300))}`);
  const revenueText = await page.locator("text=/Tổng doanh thu/").first().locator("..").innerText().catch(() => "");
  L(`Thẻ doanh thu: ${JSON.stringify(revenueText)}`);
  const orderCount = await page.locator("text=/Tổng số đơn hàng/").first().locator("..").innerText().catch(() => "");
  L(`Thẻ tổng đơn: ${JSON.stringify(orderCount)}`);
  H("FR-13", `Dashboard hiển thị doanh thu = ${revenueText.replace(/\s+/g, " ")} | đúng tổng delivered (3.200.000 ₫)? ${revenueText.includes("6.400.000") ? "KHÔNG — đang nhân đôi" : "có vẻ đúng"}`);
  const h1s = await page.locator("h1").allInnerTexts();
  const h2s = await page.locator("h2").allInnerTexts();
  L(`Số thẻ <h1> trên trang: ${h1s.length} → ${JSON.stringify(h1s)}`);
  L(`Các thẻ <h2>: ${JSON.stringify(h2s)}`);

  // ============ T2 — FR-14 Danh mục ============
  L("=== T2: Danh mục (FR-14) ===");
  await page.locator("text=Danh mục").first().click();
  await page.waitForTimeout(800);
  await shot("categories-initial");
  const catHeaders = await page.locator("table thead th").allInnerTexts();
  L(`Header bảng Danh mục: ${JSON.stringify(catHeaders)}`);
  L(`→ Cột "Sửa" có tồn tại không? ${catHeaders.some((h) => /sửa|edit/i.test(h)) ? "CÓ" : "KHÔNG — UI không có chức năng Sửa danh mục"}`);

  // 2.1 Tạo "Giày dép"
  await page.locator('input[placeholder="Tên danh mục mới"]').fill("Giày dép");
  await page.locator('button:has-text("Thêm mới")').click();
  await page.waitForTimeout(1000);
  await shot("category-created");
  const rowsAfterCreate = await page.locator("table tbody tr").allInnerTexts();
  L(`Số dòng sau khi tạo: ${rowsAfterCreate.length}`);
  L(`Có dòng "Giày dép"? ${rowsAfterCreate.some((r) => r.includes("Giày dép")) ? "CÓ" : "KHÔNG"}`);
  H("FR-14", `Sau khi tạo, có phản hồi trực quan (toast/bảng cập nhật)? ${rowsAfterCreate.some((r) => r.includes("Giày dép")) ? "CÓ — bảng cập nhật" : "KHÔNG"}`);

  // 2.2 Đổi tên — thử các cách
  const catRow = page.locator("table tbody tr", { hasText: "Giày dép" }).first();
  const buttonsInRow = await catRow.locator("button").allInnerTexts();
  L(`Các nút trong dòng danh mục "Giày dép": ${JSON.stringify(buttonsInRow)}`);
  await catRow.locator("td").nth(1).click();
  await page.waitForTimeout(400);
  await shot("category-try-edit-in-table");
  const dblEditable = await catRow.locator('input[type="text"], [contenteditable="true"]').count();
  H("FR-14", `Thử sửa trực tiếp trong bảng: có ô nhập xuất hiện không? ${dblEditable ? "CÓ" : "KHÔNG — người dùng sẽ bị chặn ở bước này"}`);
  await page.keyboard.press("Escape");

  // 2.3 Xóa
  dialogs.length = 0;
  await catRow.locator('button:has-text("Xóa")').click();
  await page.waitForTimeout(1000);
  await shot("category-deleted");
  const confirmDialog = dialogs.find((d) => d.type === "confirm");
  H("FR-14", `Xóa danh mục: có dialog xác nhận? ${confirmDialog ? "CÓ" : "KHÔNG — xóa ngay không hỏi (vi phạm FR-24)"}`);
  const rowsAfterDelete = await page.locator("table tbody tr").allInnerTexts();
  L(`Còn dòng "Giày dép"? ${rowsAfterDelete.some((r) => r.includes("Giày dép")) ? "CÓ — xóa thất bại?" : "KHÔNG — đã xóa"}`);

  // ============ T3 — FR-15 Sản phẩm ============
  L("=== T3: Sản phẩm (FR-15) ===");
  await page.locator("text=Sản phẩm").first().click();
  await page.waitForTimeout(800);
  await shot("products-initial");
  const prodHeaders = await page.locator("table thead th").allInnerTexts();
  L(`Header bảng Sản phẩm: ${JSON.stringify(prodHeaders)}`);
  const formInputs = await page.locator("form input, form textarea, form select").evaluateAll((els) =>
    els.map((e) => ({ tag: e.tagName, ph: e.placeholder, type: e.type, required: e.required }))
  );
  L(`Các field trong form sản phẩm: ${JSON.stringify(formInputs)}`);
  const formLabels = await page.locator("form label").count();
  H("FR-15", `Form sản phẩm: ${formLabels} <label>, ${formInputs.filter((f) => f.required).length} field có required, ${formInputs.filter((f) => /^\*$/.test(f.ph || "")).length} field có ký hiệu *`);

  const priceCellBefore = await page.locator("table tbody tr").nth(3).innerText();
  L(`Giá hiển thị trước khi sửa (dòng 4): ${JSON.stringify(priceCellBefore)}`);
  H("FR-21", `Định dạng giá có phân cách nghìn? ${/[\d]\s\d{3}\s\d{3}/.test(priceCellBefore) ? "CÓ" : "KHÔNG — hiển thị giá trị thô"}`);

  // 3.1 Tạo sản phẩm mới
  await page.locator('input[placeholder="Tên sản phẩm"]').fill("Áo khoác dạ");
  await page.locator('input[placeholder="Giá tiền"]').fill("450000");
  await page.locator('textarea[placeholder="Mô tả"]').fill("Áo khoác dạ giữa ấm mùa đông");
  await page.locator('input[placeholder="URL Ảnh"]').fill("https://placehold.co/300x300/png?text=AoKhoac");
  await page.locator("form select").selectOption({ label: "Phụ kiện" });
  await shot("product-form-filled");
  await page.locator('button:has-text("Lưu sản phẩm")').click();
  await page.waitForTimeout(1500);
  await shot("product-created");
  const prodRows = await page.locator("table tbody tr").allInnerTexts();
  L(`Có dòng "Áo khoác dạ"? ${prodRows.some((r) => r.includes("Áo khoác dạ")) ? "CÓ" : "KHÔNG"}`);
  L(`Dòng "Áo khoác dạ": ${JSON.stringify(prodRows.find((r) => r.includes("Áo khoác dạ")))}`);

  // 3.2 Sửa "Tai nghe AirPods Pro 2"
  const namesBefore = await page.locator("table tbody tr td:nth-child(2)").allInnerTexts();
  L(`Tên sản phẩm TRƯỚC khi sửa: ${JSON.stringify(namesBefore)}`);
  const airpodsRow = page.locator("table tbody tr", { hasText: "Tai nghe AirPods Pro 2" }).first();
  await airpodsRow.locator('button:has-text("Sửa")').click();
  await page.waitForTimeout(600);
  await shot("product-edit-form");
  L(`Tiêu đề form khi sửa: "${await page.locator("form h3").first().innerText()}"`);
  await page.locator('input[placeholder="Tên sản phẩm"]').fill("Tai nghe AirPods Pro 2 (Gen 2)");
  await page.locator('input[placeholder="Giá tiền"]').fill("5990000");
  await page.locator('button:has-text("Lưu sản phẩm")').click();
  await page.waitForTimeout(1500);
  await shot("product-edited");
  const namesAfter = await page.locator("table tbody tr td:nth-child(2)").allInnerTexts();
  L(`Tên sản phẩm SAU khi sửa: ${JSON.stringify(namesAfter)}`);
  const changed = namesAfter.filter((n, i) => n !== namesBefore[i]);
  H("FR-15", `Sau khi sửa 1 sản phẩm, các dòng bị ĐỔI TÊN: ${JSON.stringify(changed)}`);
  H("FR-15", `Vi phạm "chỉ sản phẩm đó bị thay đổi"? ${changed.length > 1 ? "CÓ — ${changed.length} dòng bị đổi tên" : "không"}`);
  const airpodsPrice = await page.locator("table tbody tr", { hasText: "Tai nghe AirPods Pro 2 (Gen 2)" }).first().innerText();
  L(`Dòng AirPods sau khi sửa: ${JSON.stringify(airpodsPrice)}`);

  // ============ Kiểm tra bổ sung cho kịch bản ============
  L("=== Kiểm tra bổ sung ===");
  const navItems = await page.locator("aside li, .w-64 li").allInnerTexts().catch(() => []);
  L(`Các mục điều hướng: ${JSON.stringify(navItems)}`);
  const activeItems = await page.locator(".w-64 li.text-blue-400").allInnerTexts().catch(() => []);
  L(`Mục đang highlight: ${JSON.stringify(activeItems)}`);
  const url = page.url();
  H("FR-23", `URL sau khi chuyển tab: "${url}" → có đổi theo tab không? ${url.includes("products") || url.includes("product") ? "CÓ" : "KHÔNG — điều hướng bằng state, không có router"}`);
  const breadcrumbs = await page.locator("nav, .breadcrumb, ol").allInnerTexts().catch(() => []);
  H("FR-23", `Breadcrumb: ${JSON.stringify(breadcrumbs.filter((b) => b.trim()))}`);

  // Kiểm tra validate giá <= 0
  await page.locator('input[placeholder="Tên sản phẩm"]').fill("SP giá âm");
  await page.locator('input[placeholder="Giá tiền"]').fill("-5000");
  dialogs.length = 0;
  await page.locator('button:has-text("Lưu sản phẩm")').click();
  await page.waitForTimeout(1200);
  await shot("product-negative-price");
  H("FR-15", `Nhập giá âm: hộp thoại = ${dialogs.length ? JSON.stringify(dialogs.at(-1).message) : "KHÔNG CÓ — sản phẩm có thể được lưu với giá âm"}`);

  // Bỏ trống tên
  await page.locator('input[placeholder="Tên sản phẩm"]').fill("");
  await page.locator('input[placeholder="Giá tiền"]').fill("100000");
  dialogs.length = 0;
  await page.locator('button:has-text("Lưu sản phẩm")').click();
  await page.waitForTimeout(1200);
  await shot("product-empty-name");
  H("FR-22", `Bỏ trống tên: hộp thoại = ${dialogs.length ? JSON.stringify(dialogs.at(-1).message) : "KHÔNG CÓ — trình duyệt chặn bằng required, không có thông báo inline"}`);

  // Kiểm tra trạng thái loading
  L("Kiểm tra: có phần tử nào chứa chữ 'Đang' / spinner không?");
  const loadingTexts = await page.locator("text=/Đang tải|Loading|spinner/i").allInnerTexts().catch(() => []);
  H("IA-04", `Trạng thái loading: ${loadingTexts.length ? JSON.stringify(loadingTexts) : "KHÔNG CÓ phần tử loading"}`);

  // Kiểm tra xóa sản phẩm có confirm
  dialogs.length = 0;
  const firstRow = page.locator("table tbody tr").first();
  await firstRow.locator('button:has-text("Xóa")').click();
  await page.waitForTimeout(1000);
  await shot("product-delete");
  H("FR-24", `Xóa sản phẩm: có dialog xác nhận? ${dialogs.find((d) => d.type === "confirm") ? "CÓ" : "KHÔNG — xóa ngay không hỏi"}`);

  await browser.close();

  fs.writeFileSync(path.join(__dirname, "pilot-log.md"), "# Pilot dry-run — log kỹ thuật\n\n" + log.join("\n") + "\n");
  console.log("\n--- DONE ---");
})().catch((e) => {
  console.error("PILOT ERROR:", e);
  fs.writeFileSync(path.join(__dirname, "pilot-log.md"), "# Pilot dry-run — log kỹ thuật\n\n" + log.join("\n") + `\n\n**LỖI:** ${e.message}\n`);
  process.exit(1);
});
