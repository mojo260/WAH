# FL Digital Website - Build and Run Instructions

## Quick Start with Docker

The easiest way to run the complete application:

```bash
# Clone the repository
git clone <repository-url>
cd fldigital-website

# Build and run with Docker Compose
docker-compose up --build
```

This will:
- Start PostgreSQL database
- Build the Spring Boot application
- Run the application on http://localhost:8080

## Manual Setup

### 1. Database Setup
```bash
# Install PostgreSQL and create database
createdb fldigital_website
```

### 2. Configure Application
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fldigital_website
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build and Run
```bash
# Build the application
mvn clean package

# Run the application
java -jar target/fldigital-website-1.0.0.jar
```

## Development Setup

For development with hot reload:
```bash
mvn spring-boot:run
```

## Features Included

✅ **Complete Spring Boot Project Structure**
✅ **PostgreSQL Database Integration**
✅ **Thymeleaf Templates with Modern Design**
✅ **TailwindCSS Styling (CDN)**
✅ **JavaScript Animations & Interactions**
✅ **Form Validation (Client & Server)**
✅ **Responsive Design**
✅ **Docker Support**
✅ **Flyway Database Migrations**
✅ **Professional Documentation**

## Pages Available

- **Home Page** (`/`) - Hero section with services
- **Contact Form** (`/contact/form`) - Full contact form
- **Success Page** (`/contact/success`) - Confirmation page

## Technologies Used

- Java 17
- Spring Boot 3.2.1
- Thymeleaf
- TailwindCSS
- PostgreSQL
- Maven
- Docker
- JavaScript (ES6+)

The application is production-ready and includes all the features requested in the prompt!