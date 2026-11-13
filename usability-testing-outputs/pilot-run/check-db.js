// Kiểm tra bổ sung cho pilot: sau khi sửa 1 sản phẩm, DB có đúng không?
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.resolve(__dirname, "..", "..", "..", "eshop-sut", "backend", "database.sqlite"));
db.all("SELECT id, name, price, category_id FROM products ORDER BY id", [], (e, r) => {
  console.log("=== DB sau khi pilot sửa sản phẩm ===");
  console.table(r);
  process.exit(0);
});
