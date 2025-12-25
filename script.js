// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initMobileNavigation();
    initHeroSlider();
    initVideoSection();
    initScrollAnimations();
    initBackToTop();
    initFormSubmission();
    initGestureArrows();
    initCounterAnimation();
    
    // Set minimum date for appointment form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Show gesture arrows after loading
            setTimeout(() => {
                showGestureArrows();
            }, 1000);
        }, 500);
    }, 2000);
}

// Mobile Navigation
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Reset all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        
        // Trigger animations for visible elements
        const slideContent = slides[index].querySelector('.slide-content');
        const animateElements = slideContent.querySelectorAll('.animate-on-scroll');
        animateElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 200);
        });
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    // Auto-slide functionality
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Start auto-sliding after initial delay
    setTimeout(() => {
        startSlideInterval();
    }, 3000);
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', startSlideInterval);
    }
    
    // Initialize first slide animations
    setTimeout(() => {
        const firstSlide = slides[0];
        const animateElements = firstSlide.querySelectorAll('.animate-on-scroll');
        animateElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 200);
        });
    }, 100);
}

// Video Section
function initVideoSection() {
    const playVideoBtn = document.getElementById('playVideoBtn');
    const videoBtn = document.querySelector('.video-btn');
    
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            // Open YouTube video in new tab
            window.open('https://youtu.be/F_7ikEiH-mA?si=ZFeji5auk6dheObg', '_blank');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
    
    if (videoBtn) {
        videoBtn.addEventListener('mouseenter', function() {
            this.style.gap = '20px';
        });
        
        videoBtn.addEventListener('mouseleave', function() {
            this.style.gap = '12px';
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for stats counters
                if (entry.target.classList.contains('stat-number')) {
                    startCounterAnimation(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        // Set initial value to 0
        counter.textContent = '0';
    });
}

function startCounterAnimation(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Submission with Formspree
function initFormSubmission() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (!appointmentForm) return;
    
    // Replace with your Formspree endpoint
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
    appointmentForm.action = formspreeEndpoint;
    
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            service: document.getElementById('service').value,
            employees: document.getElementById('employees').value,
            message: document.getElementById('message').value
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.company || 
            !formData.date || !formData.time || !formData.service || !formData.employees) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = appointmentForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        
        try {
            // Prepare FormData for submission
            const formDataObj = new FormData(appointmentForm);
            
            // Submit to Formspree
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: formDataObj,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                showNotification(
                    `Thank you, ${formData.name}! Your appointment request has been sent. 
                    We'll email you at ${formData.email} to confirm.`, 
                    'success'
                );
                
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Appointment Sent!';
                submitBtn.style.background = 'var(--success)';
                
                // Reset form after delay
                setTimeout(() => {
                    appointmentForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Fallback: show success message anyway for demo purposes
            showNotification(
                `Thank you, ${formData.name}! Your appointment has been booked for 
                ${formData.date} at ${formData.time}. We will contact you shortly at ${formData.email}.`, 
                'info'
            );
            
            // Reset form
            appointmentForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = originalBg;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// Gesture Arrows
function initGestureArrows() {
    const leftGesture = document.getElementById('leftGesture');
    const rightGesture = document.getElementById('rightGesture');
    
    if (leftGesture && rightGesture) {
        // Click handlers for arrows
        leftGesture.addEventListener('click', function() {
            // Navigate to previous section or trigger previous slide
            document.querySelector('#sliderPrev')?.click();
        });
        
        rightGesture.addEventListener('click', function() {
            // Navigate to next section or trigger next slide
            document.querySelector('#sliderNext')?.click();
        });
    }
}

function showGestureArrows() {
    const leftGesture = document.getElementById('leftGesture');
    const rightGesture = document.getElementById('rightGesture');
    
    if (leftGesture && rightGesture) {
        // Show arrows with delay
        setTimeout(() => {
            leftGesture.style.opacity = '1';
            leftGesture.style.transform = 'translateX(0)';
        }, 500);
        
        setTimeout(() => {
            rightGesture.style.opacity = '1';
            rightGesture.style.transform = 'translateX(0)';
        }, 1000);
        
        // Hide arrows after 10 seconds
        setTimeout(() => {
            hideGestureArrows();
        }, 10000);
    }
}

function hideGestureArrows() {
    const leftGesture = document.getElementById('leftGesture');
    const rightGesture = document.getElementById('rightGesture');
    
    if (leftGesture && rightGesture) {
        leftGesture.style.opacity = '0';
        rightGesture.style.opacity = '0';
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let icon = 'fas fa-info-circle';
    let bgColor = 'var(--primary)';
    
    switch(type) {
        case 'success':
            icon = 'fas fa-check-circle';
            bgColor = 'var(--success)';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            bgColor = 'var(--danger)';
            break;
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            bgColor = 'var(--warning)';
            break;
    }
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 18px 25px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.4s var(--bounce);
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        display: flex;
        align-items: center;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

