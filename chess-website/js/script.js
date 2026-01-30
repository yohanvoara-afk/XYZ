// JavaScript for Chess Masters Website

// Form Validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const messageDiv = document.getElementById('formMessage');
    
    // Reset previous validation states
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate name
    if (name === '') {
        document.getElementById('name').classList.add('is-invalid');
        errorMessage += 'Please enter your name.<br>';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('name').classList.add('is-invalid');
        errorMessage += 'Name must be at least 2 characters long.<br>';
        isValid = false;
    } else {
        document.getElementById('name').classList.add('is-valid');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('email').classList.add('is-invalid');
        errorMessage += 'Please enter your email address.<br>';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('is-invalid');
        errorMessage += 'Please enter a valid email address.<br>';
        isValid = false;
    } else {
        document.getElementById('email').classList.add('is-valid');
    }
    
    // Display result
    messageDiv.style.display = 'block';
    if (isValid) {
        messageDiv.className = 'alert alert-success';
        messageDiv.innerHTML = '<strong>Success!</strong> Your message has been sent successfully.';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            inputs.forEach(input => {
                input.classList.remove('is-valid');
            });
            messageDiv.style.display = 'none';
        }, 2000);
    } else {
        messageDiv.className = 'alert alert-danger';
        messageDiv.innerHTML = '<strong>Error:</strong><br>' + errorMessage;
    }
    
    return false; // Prevent form submission
}

// Theme Switcher
function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('themeToggle');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeButton.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        themeButton.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeButton = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeButton) themeButton.innerHTML = '☀️';
    } else {
        if (themeButton) themeButton.innerHTML = '🌙';
    }
}

// Gallery View Toggle
function toggleGalleryView() {
    const gallery = document.getElementById('chessGallery');
    const pieces = gallery.querySelectorAll('img');
    
    pieces.forEach((piece, index) => {
        if (piece.style.transform === 'scale(0.8)') {
            piece.style.transform = 'scale(1)';
            piece.style.opacity = '1';
        } else {
            piece.style.transform = 'scale(0.8)';
            piece.style.opacity = '0.7';
        }
    });
}

// Smooth Scrolling
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Image Gallery with Lightbox
function initGallery() {
    const galleryImages = document.querySelectorAll('#chessGallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });
}

function createLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create new lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Close lightbox on click
    lightbox.addEventListener('click', function() {
        this.remove();
    });
}

// Chess Piece Animation
function animateChessPieces() {
    const pieces = document.querySelectorAll('#chessGallery img');
    
    pieces.forEach((piece, index) => {
        setTimeout(() => {
            piece.classList.add('fade-in');
            piece.style.animationDelay = `${index * 0.1}s`;
        }, index * 100);
    });
}

// Navigation Active State
function updateActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPath || 
            (currentPath.includes('index') && href === 'index.html') ||
            (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Form Field Validation on Input
function initFieldValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    
    if (nameField) {
        nameField.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value.trim())) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    }
}

// Page Load Animations
function initPageAnimations() {
    const elements = document.querySelectorAll('.card, .rule-section, .piece-movement');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Calculator Functions (for tactics page)
function initCalculator() {
    // Calculator is already implemented in tactics.html
    // This function can be used for additional calculator features
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    smoothScroll();
    updateActiveNav();
    initFieldValidation();
    initGallery();
    animateChessPieces();
    initPageAnimations();
    
    // Add theme switcher button if not exists
    if (!document.getElementById('themeToggle')) {
        const themeButton = document.createElement('button');
        themeButton.id = 'themeToggle';
        themeButton.className = 'btn btn-secondary theme-switcher';
        themeButton.innerHTML = '🌙';
        themeButton.onclick = toggleTheme;
        themeButton.title = 'Toggle Theme';
        document.body.appendChild(themeButton);
    }
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        toggleTheme();
    }
    
    // Press 'Escape' to close lightbox
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.remove();
        }
    }
});

// Performance optimization - debounce function
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

// Resize handler with debounce
const handleResize = debounce(() => {
    // Handle responsive adjustments
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'danger');
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
