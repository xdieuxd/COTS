Auth Service – Handover Guide

Overview
The auth service provides user registration and login with JWT issuance. It uses Spring Boot 3, JPA, and BCrypt password hashing. JWTs are created with jjwt 0.11.5.

Tech Stack
- Java 21, Spring Boot 3.5.x
- Spring Web, Spring Data JPA
- H2 (dev) or MySQL (prod)
- jjwt 0.11.5, spring-security-crypto

Project Paths
- Code: services/auth
- Main class: com.booknest.auth.AuthApplication
- Config: services/auth/src/main/resources/application.yml

Run – Local (H2 default)
1) Build: mvn -DskipTests package (inside services/auth)
2) Run: java -jar target/auth-0.0.1-SNAPSHOT.jar
3) App starts at http://localhost:8081

Switch to MySQL
Provide these env vars (Docker Compose or shell):
- SPRING_DATASOURCE_URL=jdbc:mysql://mysql-auth:3306/xac_thuc_db?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
- SPRING_DATASOURCE_USERNAME=root
- SPRING_DATASOURCE_PASSWORD=root
- Optional:
  - JWT_SECRET=your-strong-32b-secret
  - JWT_EXPIRATION_MS=86400000

API
- POST /api/auth/register
  - body: { email, password, fullName? }
  - 200: { token }
- POST /api/auth/login
  - body: { email, password }
  - 200: { token }

Entity
- com.booknest.auth.model.User: id, email (unique), password (BCrypt), fullName, createdAt, enabled

Repo
- com.booknest.auth.repo.UserRepository: findByEmail

JWT
- com.booknest.auth.security.JwtUtil
  - generateToken(subject)
  - extractSubject(token)

Troubleshooting
- MySQL driver not found: ensure com.mysql:mysql-connector-j:8.0.33
- JWT errors: ensure JWT_SECRET length >= 32 bytes
- H2 vs MySQL: adjust SPRING_DATASOURCE_* envs

