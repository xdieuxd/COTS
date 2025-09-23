# Dockerfile cho auth service
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /COTS
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /COTS
COPY --from=build /COTS/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
