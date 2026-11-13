# Reset DB EShop về trạng thái seed chuẩn + dữ liệu đơn hàng mẫu.
# Dùng TRƯỚC mỗi phiên usability test.
#
#   powershell -ExecutionPolicy Bypass -File reset-db.ps1
#
# ⚠️ THỨ TỰ RẤT QUAN TRỌNG:
#   1. Xoá DB  2. KHỞI ĐỘNG server  3. seed-orders  4. kiểm tra Dashboard
#   Vì `database.js` chạy initDatabase() mỗi lần được require → start server sẽ XOÁ toàn bộ
#   dữ liệu đã seed trước đó. Phải seed-orders SAU khi server đã chạy.

$ErrorActionPreference = "Stop"
$backend = "D:\save\Learn\Test\HW03\eshop-sut\backend"
if (-not (Test-Path $backend)) { $backend = Join-Path $PSScriptRoot "..\..\eshop-sut\backend" }

Write-Host "=== Reset EShop DB ===" -ForegroundColor Cyan

# 1. Dung backend dang chay
$procs = Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
    Where-Object { $_.CommandLine -like "*server.js*" }
foreach ($p in $procs) {
    Write-Host "  Dung backend PID $($p.ProcessId)"
    Stop-Process -Id $p.ProcessId -Force
    Start-Sleep -Milliseconds 800
}

# 2. Xoa file DB
$dbFile = Join-Path $backend "database.sqlite"
if (Test-Path $dbFile) {
    Remove-Item $dbFile -Force
    Write-Host "  Da xoa database.sqlite"
}

# 3. Khoi dong backend (tu tao bang + seed user/san pham/danh muc/coupon)
Write-Host "  Khoi dong backend..."
Start-Process -FilePath "node" -ArgumentList "server.js" -WorkingDirectory $backend -WindowStyle Minimized
Start-Sleep -Seconds 3

# 4. Tao don hang mau (SAU khi server da chay) - Dashboard FR-13 can co du lieu
Write-Host "  Seed don hang mau..."
Push-Location $backend
node seed-orders.js
$seedExit = $LASTEXITCODE
Pop-Location
if ($seedExit -ne 0) { throw "seed-orders.js that bai" }

# 5. Kiem tra API
try {
    $prods = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -TimeoutSec 5
    Write-Host "  API OK - san pham: $($prods.Count)" -ForegroundColor Green
} catch {
    Write-Host "  API khong phan hoi: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Xong. Nhay sang http://localhost:5174 va Kiem tra Dashboard co so khac 0 ===" -ForegroundColor Cyan
Write-Host "    Doanh thu hien thi phai la 6.400.000 VND (gia tri dung la 3.200.000 VND)"
