# FL Digital Website

A modern, responsive website built with Spring Boot and Thymeleaf, inspired by the clean design and functionality of FLDigital.dk.

## Tech Stack

- **Backend**: Java Spring Boot 3.2.1
- **Frontend**: Thymeleaf templates
- **Styling**: TailwindCSS (CDN)
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Database**: PostgreSQL
- **Build Tool**: Maven
- **Java Version**: 17

## Features

### 🎨 Design & UX
- Clean, minimalist design inspired by FLDigital.dk
- Fully responsive layout for all devices
- Smooth scroll animations and fade-in effects
- Modern gradient backgrounds and card hover effects
- Professional typography with Inter font family

### 🚀 Functionality
- **Hero Section**: Compelling call-to-action with gradient background
- **Services Section**: Showcase of digital marketing services
- **Contact Form**: Full-featured contact form with validation
- **Success Page**: Beautiful confirmation page with next steps
- **Form Validation**: Client-side and server-side validation
- **Database Integration**: PostgreSQL with Flyway migrations

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface elements
- Optimized images and performance

## Project Structure

```
fldigital-website/
├── src/
│   ├── main/
│   │   ├── java/com/fldigital/website/
│   │   │   ├── FlDigitalWebsiteApplication.java
│   │   │   ├── controller/
│   │   │   │   ├── HomeController.java
│   │   │   │   └── ContactController.java
│   │   │   ├── service/
│   │   │   │   └── ContactService.java
│   │   │   ├── repository/
│   │   │   │   └── ContactRepository.java
│   │   │   └── entity/
│   │   │       └── Contact.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── templates/
│   │       │   ├── index.html
│   │       │   ├── contact-form.html
│   │       │   └── success.html
│   │       ├── static/
│   │       │   ├── css/styles.css
│   │       │   └── js/main.js
│   │       └── db/migration/
│   │           └── V1__Create_contacts_table.sql
└── pom.xml
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+
- Git

### Database Setup

1. Install and start PostgreSQL
2. Create a database:
```sql
CREATE DATABASE fldigital_website;
```

3. Update `application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fldigital_website
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Running the Application

1. Clone the repository:
```bash
git clone <repository-url>
cd fldigital-website
```

2. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

### Development Mode

For development with hot reload:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## API Endpoints

### Public Endpoints
- `GET /` - Home page
- `GET /about` - About page
- `GET /services` - Services page
- `GET /contact` - Contact page redirect
- `GET /contact/form` - Contact form page
- `POST /contact/submit` - Submit contact form
- `GET /contact/success` - Success page

### Admin Endpoints (Development)
- `GET /contact/admin/list` - View all contacts
- `POST /contact/admin/{id}/process` - Mark contact as processed

## Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN NOT NULL DEFAULT FALSE
);
```

## Frontend Features

### JavaScript Functionality
- **Scroll Animations**: Intersection Observer API for fade-in effects
- **Smooth Scrolling**: Native smooth scrolling for anchor links
- **Form Validation**: Real-time client-side validation
- **Mobile Menu**: Responsive navigation menu
- **Loading States**: Visual feedback during form submission
- **Scroll to Top**: Floating action button
- **Notifications**: Toast-style notifications

### CSS Features
- **Custom Properties**: CSS variables for consistent theming
- **Responsive Design**: Mobile-first breakpoints
- **Animations**: Keyframe animations for enhanced UX
- **Accessibility**: Focus states and screen reader support
- **Print Styles**: Optimized for printing

## Performance Optimizations

- **Lazy Loading**: Images and non-critical resources
- **Resource Preloading**: Critical fonts and styles
- **Debounced Events**: Optimized scroll and resize handlers
- **Minified Assets**: Compressed CSS and JavaScript
- **Caching Headers**: Efficient browser caching

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Environment Configuration

### Development
```properties
# application-dev.properties
spring.thymeleaf.cache=false
logging.level.com.fldigital.website=DEBUG
```

### Production
```properties
# application-prod.properties
spring.thymeleaf.cache=true
logging.level.com.fldigital.website=INFO
server.compression.enabled=true
```

## Security Considerations

- CSRF protection enabled by default
- SQL injection protection with JPA
- XSS protection with Thymeleaf escaping
- Input validation on client and server side
- Secure headers configuration

## Testing

Run tests with:
```bash
mvn test
```

For integration tests:
```bash
mvn integration-test
```

## Deployment

### Docker Deployment
```dockerfile
FROM openjdk:17-jre-slim
COPY target/fldigital-website-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Build and Deploy
```bash
mvn clean package
docker build -t fldigital-website .
docker run -p 8080:8080 fldigital-website
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact:
- Email: info@fldigital.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ using Spring Boot and modern web technologies.