# ---- Build Stage ----
FROM eclipse-temurin:17-jdk AS build

# Install Maven (because mvnw does not exist in your project)
RUN apt-get update && apt-get install -y maven

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -q -e -DskipTests package

# ---- Run Stage ----
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]
