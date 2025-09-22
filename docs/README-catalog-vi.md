Dịch vụ Catalog – Tài liệu bàn giao (Tiếng Việt)

Tổng quan
Dịch vụ Catalog quản lý metadata sách và hỗ trợ (tuỳ chọn) upload file lên MinIO. Cung cấp API CRUD cho Book. Kafka hiện đang bỏ trống (không sử dụng).

Ngăn xếp công nghệ
- Java 21, Spring Boot 3.5.x
- Spring Web, Spring Data JPA
- CSDL: H2 (dev) hoặc MySQL (prod)
- MinIO Java SDK 8.5.7 (nếu dùng upload)

Cấu trúc dự án
- Mã nguồn: services/catalog
- Main class: com.booknest.catalog.CatalogApplication
- Cấu hình: services/catalog/src/main/resources/application.yml
- Các gói chính:
  - controller: `BookController` (API CRUD)
  - model: `Book` (thực thể JPA)
  - repo: `BookRepository` (JPA)
  - service: `StorageService` (upload MinIO – tuỳ chọn)

Chạy nhanh (Local – H2 mặc định)
1) Mở terminal tại `services/catalog`
2) Build: `mvn -DskipTests package`
3) Chạy: `java -jar target/catalog-0.0.1-SNAPSHOT.jar`
4) Ứng dụng chạy tại: http://localhost:8082

Chuyển sang MySQL
Thiết lập biến môi trường:
- SPRING_DATASOURCE_URL=jdbc:mysql://mysql-catalog:3306/danh_muc_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
- SPRING_DATASOURCE_USERNAME=root
- SPRING_DATASOURCE_PASSWORD=root

MinIO (tuỳ chọn)
- Endpoint: http://localhost:9000
- Tài khoản mặc định: minioadmin/minioadmin
- Bucket: books (tạo trước nếu chưa có)
- `StorageService.upload(file)`: sinh objectName, putObject lên MinIO, trả về URL truy cập (ví dụ: `/storage/{object}` – có thể tuỳ chỉnh tuỳ service lưu trữ)

API
- GET /api/books – danh sách sách
- GET /api/books/{id} – chi tiết sách
- POST /api/books (multipart/form-data)
  - parts:
    - meta: JSON Book (title, author, ...)
    - file: MultipartFile (tuỳ chọn) – nếu có thì lưu pdfUrl
- PUT /api/books/{id}
  - body JSON Book – cập nhật title/author
- DELETE /api/books/{id}

Dòng chảy xử lý (flow)
1) Client gọi API CRUD theo nhu cầu.
2) `BookController` nhận request, thao tác `BookRepository`:
   - Tạo (POST): parse meta + upload file (nếu có) qua `StorageService`, set `pdfUrl`, lưu `Book`.
   - Đọc (GET): findAll/findById.
   - Cập nhật (PUT): đọc `Book` theo id, cập nhật trường, lưu lại.
   - Xoá (DELETE): deleteById.
3) Trả về entity đã lưu hoặc 204 khi xoá thành công.

Mô hình dữ liệu
- `Book`: id, title, author, coverUrl, pdfUrl.

Repository
- `BookRepository extends JpaRepository<Book, Long>`.

Lỗi thường gặp & cách xử lý
- Lỗi đọc cấu hình (InvalidPropertiesFormatException): đảm bảo chỉ còn `application.yml` (đã xoá `application.xml`).
- Lỗi MinIO: kiểm tra endpoint/credential, bucket tồn tại; xem log `StorageService`.
- Lỗi DB: kiểm tra biến môi trường SPRING_DATASOURCE_* hoặc dùng mặc định H2 khi dev.

