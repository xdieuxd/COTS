# --------------------
# Build stage
# --------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /COTS

# Copy parent pom
COPY pom.xml ./

# Copy gateway module
COPY gateway ./gateway

# Copy toàn bộ service modules
COPY services ./services

# Build chỉ gateway và các module phụ thuộc, bỏ test
RUN mvn clean package -pl gateway -am -DskipTests

# --------------------
# Runtime stage
# --------------------
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /COTS

# Copy jar của gateway từ build stage
COPY --from=build /COTS/gateway/target/*-SNAPSHOT.jar app.jar

# Expose port ứng dụng
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java","-jar","app.jar"]
