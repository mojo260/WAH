FROM openjdk:17-jre-slim

WORKDIR /app

COPY target/fldigital-website-1.0.0.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]
