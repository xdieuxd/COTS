# --------------------
# Stage build
# --------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /COTS

# Copy pom và source code
COPY pom.xml ./
COPY src ./src

# Build project, bỏ qua test
RUN mvn clean package -DskipTests

# --------------------
# Stage runtime
# --------------------
FROM openjdk:17-jdk-slim
WORKDIR /COTS

# Copy jar từ build stage, đường dẫn đúng
COPY --from=build /COTS/target/*.jar app.jar

# Expose port
EXPOSE 8082

# Chạy ứng dụng
ENTRYPOINT ["java","-jar","app.jar"]
