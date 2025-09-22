Catalog Service – Handover Guide

Overview
The catalog service manages book metadata and optional file uploads to MinIO. It exposes CRUD endpoints for books. Kafka is currently not used.

Tech Stack
- Java 21, Spring Boot 3.5.x
- Spring Web, Spring Data JPA
- H2 (dev) or MySQL (prod)
- MinIO Java SDK 8.5.7 (optional uploads)

Project Paths
- Code: services/catalog
- Main class: com.booknest.catalog.CatalogApplication
- Config: services/catalog/src/main/resources/application.yml

Run – Local (H2 default)
1) Build: mvn -DskipTests package (inside services/catalog)
2) Run: java -jar target/catalog-0.0.1-SNAPSHOT.jar
3) App starts at http://localhost:8082

Switch to MySQL
Provide env vars:
- SPRING_DATASOURCE_URL=jdbc:mysql://mysql-catalog:3306/danh_muc_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
- SPRING_DATASOURCE_USERNAME=root
- SPRING_DATASOURCE_PASSWORD=root

Storage (MinIO)
- Default endpoint: http://localhost:9000 (see StorageService)
- Credentials: minioadmin/minioadmin
- Bucket: books (create if missing)

API
- GET /api/books
- GET /api/books/{id}
- POST /api/books (multipart/form-data)
  - parts: meta (json Book), file (optional MultipartFile)
- PUT /api/books/{id}
- DELETE /api/books/{id}

Model
- com.booknest.catalog.model.Book: id, title, author, coverUrl, pdfUrl

Repo
- com.booknest.catalog.repo.BookRepository extends JpaRepository

Troubleshooting
- Config load error: ensure only application.yml exists (remove old application.xml)
- MinIO upload errors: verify endpoint/credentials and bucket existence
- DB errors: check SPRING_DATASOURCE_* envs or fall back to H2

