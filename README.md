# NovaTech Electronics Shop — Fullstack

Frontend React + Vite, Backend Node.js + Express, database Microsoft SQL Server (quản lý bằng SSMS), Prisma ORM.

## 1. Yêu cầu
- Node.js 18 trở lên
- Microsoft SQL Server (Express/Developer đều được)
- SQL Server Management Studio (SSMS)

## 2. Tạo database
Mở SSMS, kết nối SQL Server của bạn và chạy:

```sql
CREATE DATABASE novatech_shop;
GO
```

## 3. Cấu hình Backend
Mở terminal tại thư mục `backend`:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Mở `backend/.env`, sửa `DATABASE_URL` theo SQL Server trên máy của bạn. Ví dụ SQL Server chạy local, bật TCP/IP và dùng SQL Login:

```env
PORT=8000
CLIENT_URL=http://localhost:5173
DATABASE_URL="sqlserver://localhost:1433;database=novatech_shop;user=sa;password=YourStrong@Passw0rd;encrypt=true;trustServerCertificate=true"
JWT_SECRET=thay_bang_chuoi_bi_mat_dai_va_ngau_nhien
JWT_EXPIRES_IN=7d
```

Nếu dùng Windows Authentication hoặc instance name như `SQLEXPRESS`, cần cấu hình chuỗi kết nối đúng với SQL Server của máy. Không đưa file `.env` lên Git.

Tạo bảng và Prisma Client, sau đó nạp dữ liệu sản phẩm mẫu:

```powershell
npx prisma generate
npx prisma db push
npm run seed
```

Chạy API:

```powershell
npm run dev
```

API mặc định: `http://localhost:8000`. Kiểm tra `http://localhost:8000/health`.

## 4. Chạy Frontend
Mở terminal thứ hai tại thư mục gốc dự án:

```powershell
npm install
npm run dev
```

Frontend mặc định tại `http://localhost:5173` và gọi Backend tại `http://localhost:8000/api`. Nếu Backend ở địa chỉ khác, tạo file `.env` tại thư mục gốc:

```env
VITE_API_URL=http://localhost:8000/api
```

## 5. Tài khoản quản trị mẫu
- Email: `admin@novatech.vn`
- Mật khẩu: `Admin@123`

Đổi mật khẩu sau lần đăng nhập đầu tiên trước khi triển khai thật. Tài khoản khách hàng được tạo từ trang Đăng ký.

## 6. API chính

| Method | Endpoint | Quyền | Chức năng |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Đăng ký |
| POST | `/api/auth/login` | Public | Đăng nhập, cấp JWT |
| GET | `/api/auth/me` | Đăng nhập | Lấy tài khoản hiện tại |
| PATCH | `/api/auth/me` | Đăng nhập | Cập nhật hồ sơ |
| GET | `/api/products` | Public | Danh sách/tìm kiếm sản phẩm |
| GET | `/api/products/:id` | Public | Chi tiết sản phẩm |
| POST | `/api/products` | Admin | Thêm sản phẩm |
| PATCH | `/api/products/:id` | Admin | Sửa sản phẩm |
| DELETE | `/api/products/:id` | Admin | Xóa sản phẩm |
| GET | `/api/orders` | Đăng nhập | Admin xem tất cả, khách xem đơn của mình |
| POST | `/api/orders` | Đăng nhập | Đặt hàng, trừ tồn kho trong transaction |
| PATCH | `/api/orders/:id/status` | Admin | Cập nhật trạng thái |
| GET | `/api/admin/dashboard` | Admin | Số liệu tổng quan |
| GET | `/api/admin/customers` | Admin | Danh sách khách hàng |

## 7. Lưu ý
- Frontend không còn tự xác định Admin bằng cách nhập email có chữ `admin`; quyền được xác thực ở Backend.
- Mật khẩu được hash bằng bcrypt; API dùng JWT và kiểm tra quyền ở server.
- Thanh toán chuyển khoản hiện mới ghi nhận phương thức thanh toán, chưa tích hợp ngân hàng/cổng thanh toán tự động.
- Chưa tích hợp đơn vị vận chuyển, email/SMS, quên mật khẩu và upload ảnh lên cloud.
- Không dùng tài khoản mẫu/mật khẩu mẫu trên môi trường production.
