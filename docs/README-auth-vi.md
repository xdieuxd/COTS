Dịch vụ Auth – Tài liệu bàn giao (Tiếng Việt)

Tổng quan
Dịch vụ Auth cung cấp đăng ký và đăng nhập người dùng, sinh JWT để xác thực các request tiếp theo. Sử dụng Spring Boot 3, Spring Web, Spring Data JPA, BCrypt để băm mật khẩu, và jjwt 0.11.5 để tạo/đọc JWT.

Ngăn xếp công nghệ
- Java 21, Spring Boot 3.5.x
- Spring Web, Spring Data JPA
- CSDL: H2 (mặc định dev) hoặc MySQL (prod)
- Băm mật khẩu: spring-security-crypto (BCrypt)
- JWT: jjwt (api + impl + jackson)

Cấu trúc dự án
- Mã nguồn: services/auth
- Main class: com.booknest.auth.AuthApplication
- Cấu hình: services/auth/src/main/resources/application.yml
- Các gói chính:
  - controller: `AuthController` (điểm vào API)
  - model: `User` (thực thể JPA)
  - repo: `UserRepository` (truy vấn JPA)
  - security: `JwtUtil` (tạo/đọc JWT)

Chạy nhanh (Local – H2 mặc định)
1) Mở terminal tại thư mục `services/auth`
2) Build: `mvn -DskipTests package`
3) Chạy: `java -jar target/auth-0.0.1-SNAPSHOT.jar`
4) Ứng dụng chạy tại: http://localhost:8081

Chuyển sang MySQL (Docker hoặc máy thật)
Thiết lập biến môi trường (ví dụ dùng Docker Compose hoặc Windows PowerShell `setx`):
- SPRING_DATASOURCE_URL=jdbc:mysql://mysql-auth:3306/xac_thuc_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
- SPRING_DATASOURCE_USERNAME=root
- SPRING_DATASOURCE_PASSWORD=root
- (Tuỳ chọn) JWT_SECRET=chuoi-bi-mat-tu-32-byte-tro-len
- (Tuỳ chọn) JWT_EXPIRATION_MS=86400000

API chính
- POST /api/auth/register
  - Body JSON: { "email", "password", "fullName"? }
  - 200: { "token" }
- POST /api/auth/login
  - Body JSON: { "email", "password" }
  - 200: { "token" }

Dòng chảy xử lý (flow)
1) Client gọi POST /register hoặc /login với JSON body.
2) `AuthController` nhận request:
   - Với /register: kiểm tra trùng email, băm mật khẩu bằng BCrypt, lưu `User` mới.
   - Với /login: tìm `User` theo email, so khớp mật khẩu (BCrypt), báo lỗi nếu sai.
3) `JwtUtil.generateToken(email)` tạo JWT có subject là email, thêm issuedAt/expiration, ký HS256 bằng secret.
4) Controller trả về `{ token }`. Client đính kèm token vào Authorization header (Bearer) cho các API khác (ở service khác).

Mô hình dữ liệu
- `User`: id, email (unique, not null), password (BCrypt), fullName, createdAt, enabled.

Repository
- `UserRepository`: `Optional<User> findByEmail(String email)`.

Cấu hình quan trọng (application.yml)
- CSDL H2 mặc định: url, username, password, driver-class-name (org.h2.Driver)
- JPA: ddl-auto=update (tạo bảng khi dev), dialect=H2Dialect
- JWT: secret, expiration-ms (có thể override bằng biến môi trường)

Kiểm thử nhanh (cURL)
- Đăng ký:
  `curl -X POST http://localhost:8081/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"a@a.com\",\"password\":\"123456\",\"fullName\":\"A\"}"`
- Đăng nhập:
  `curl -X POST http://localhost:8081/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"a@a.com\",\"password\":\"123456\"}"`

Lỗi thường gặp & cách xử lý
- Không tải được MySQL driver: đảm bảo `com.mysql:mysql-connector-j:8.0.33` trong pom.xml.
- Lỗi JWT: secret quá ngắn – đảm bảo độ dài >= 32 bytes để tạo khoá HMAC.
- Không chạy được jar: kiểm tra đúng đường dẫn `target/auth-0.0.1-SNAPSHOT.jar` và đã build thành công.

