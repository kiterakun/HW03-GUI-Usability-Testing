// Kiểm tra giá hiển thị trong UI sau khi sửa (vì tất cả dòng đều trùng tên, phải đo theo index)
const { chromium } = require("playwright");

(async () => {
  const b = await chromium.launch();
  const p = await b.newContext({ viewport: { width: 1440, height: 900 } }).then((c) => c.newPage());
  p.on("dialog", (d) => d.accept());

  await p.goto("http://localhost:5174", { waitUntil: "networkidle" });
  await p.locator('input[placeholder="Email"]').fill("admin@eshop.com");
  await p.locator('input[placeholder="Password"]').fill("Admin123!");
  await p.locator("form button").click();
  await p.waitForTimeout(1200);
  await p.locator("text=Sản phẩm").first().click();
  await p.waitForTimeout(800);

  const before = await p.locator("table tbody tr").evaluateAll((rows) =>
    rows.map((r) => Array.from(r.querySelectorAll("td")).slice(0, 3).map((c) => c.innerText.trim()))
  );
  console.log("=== TRƯỚC khi sửa ===");
  console.table(before);

  const row = p.locator("table tbody tr").nth(3);
  await row.locator('button:has-text("Sửa")').click();
  await p.waitForTimeout(400);
  await p.locator('input[placeholder="Giá tiền"]').fill("5990000");
  await p.locator('input[placeholder="Tên sản phẩm"]').fill("Tai nghe AirPods Pro 2 (Gen 2)");
  await p.locator('button:has-text("Lưu sản phẩm")').click();
  await p.waitForTimeout(1500);

  const after = await p.locator("table tbody tr").evaluateAll((rows) =>
    rows.map((r) => Array.from(r.querySelectorAll("td")).slice(0, 3).map((c) => c.innerText.trim()))
  );
  console.log("=== SAU khi sửa (dòng index 3 = dòng đã sửa) ===");
  console.table(after);
  console.log("Người dùng nhập giá 5990000 → UI hiển thị ở dòng 3:", JSON.stringify(after[3]));

  await b.close();
})();
