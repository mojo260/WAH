// FL Digital Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScrolling();
    initFormValidation();
    initMobileMenu();
    initContactForm();
    initScrollToTop();
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error state on input
                if (this.classList.contains('form-error')) {
                    this.classList.remove('form-error');
                }
            });
        });
        
        // Form submission validation
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please correct the errors in the form.', 'error');
            }
        });
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error states
    field.classList.remove('form-error', 'form-success');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (isRequired && value === '') {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    else if (fieldType === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation
    else if (fieldType === 'tel' && value !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Name validation
    else if (field.name === 'name' && value !== '') {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }
    }
    
    // Message validation
    else if (field.name === 'message' && value !== '') {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
    }
    
    // Apply validation styles
    if (!isValid) {
        field.classList.add('form-error');
        showFieldError(field, errorMessage);
    } else if (value !== '') {
        field.classList.add('form-success');
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-sm text-red-600 mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-gray-700';
            } else {
                icon.className = 'fas fa-times text-gray-700';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.className = 'fas fa-bars text-gray-700';
            });
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            const submitText = document.getElementById('submitText');
            const submitSpinner = document.getElementById('submitSpinner');
            
            // Show loading state
            if (submitButton && submitText && submitSpinner) {
                submitButton.disabled = true;
                submitText.textContent = 'Sending...';
                submitSpinner.classList.remove('hidden');
            }
            
            // The form will submit naturally, but we want to show loading state
            // If there are validation errors, we'll reset the button state
            setTimeout(() => {
                if (submitButton && !contactForm.querySelector('.form-error')) {
                    return; // Form is valid, let it submit
                }
                
                // Reset button state if validation failed
                if (submitButton && submitText && submitSpinner) {
                    submitButton.disabled = false;
                    submitText.textContent = 'Send Message';
                    submitSpinner.classList.add('hidden');
                }
            }, 100);
        });
    }
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-50';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    
    // Scroll to top functionality
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            notification.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
            notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add performance optimization for scroll events
window.addEventListener('scroll', throttle(function() {
    // Update navigation bar style on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.pageYOffset > 50) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    }
}, 100));

// Handle resize events
window.addEventListener('resize', debounce(function() {
    // Recalculate any position-dependent elements
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.classList.add('hidden');
    }
}, 250));

// Preload critical resources
function preloadResources() {
    // Preload important fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// Initialize preloading
preloadResources();