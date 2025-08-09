// Navigation and Scroll Functionality with Enhanced Error Handling
document.addEventListener('DOMContentLoaded', function () {

    // Global error handler for this module
    function handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        // Graceful degradation - ensure basic functionality still works
        return false;
    }

    // Performance monitoring utility
    const PerformanceMonitor = {
        startTime: performance.now(),

        mark: function (name) {
            if (performance.mark) {
                performance.mark(name);
            }
        },

        measure: function (name, startMark, endMark) {
            if (performance.measure) {
                try {
                    performance.measure(name, startMark, endMark);
                } catch (e) {
                    // Ignore if marks don't exist
                }
            }
        },

        logLoadTime: function () {
            const loadTime = performance.now() - this.startTime;
            console.log(`Page interactive in ${loadTime.toFixed(2)}ms`);
        }
    };

    // Global error tracking
    window.addEventListener('error', function (event) {
        console.error('JavaScript Error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
    });

    window.addEventListener('unhandledrejection', function (event) {
        console.error('Unhandled Promise Rejection:', event.reason);
    });
    // Navigation elements
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll detection for sticky header
    function handleScroll() {
        try {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Add/remove scrolled class based on scroll position
            if (header && scrollTop > 50) {
                header.classList.add('scrolled');
            } else if (header) {
                header.classList.remove('scrolled');
            }
        } catch (error) {
            handleError(error, 'handleScroll');
        }
    }

    // Throttled scroll handler for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', function () {
        requestTick();
        ticking = false;
    });

    // Mobile menu toggle functionality
    function toggleMobileMenu() {
        try {
            if (!navMenu) return;

            const isMenuOpen = navMenu.classList.contains('mobile-active');

            if (isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        } catch (error) {
            handleError(error, 'toggleMobileMenu');
        }
    }

    // Open mobile menu
    function openMobileMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('mobile-active');

        if (navOverlay) {
            navOverlay.classList.add('show');
        }

        // Add show class with slight delay for animation
        setTimeout(() => {
            navMenu.classList.add('show');
        }, 10);

        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';

        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', 'true');
    }

    // Close mobile menu
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('show');

        if (navOverlay) {
            navOverlay.classList.remove('show');
        }

        // Remove mobile-active class after animation
        setTimeout(() => {
            navMenu.classList.remove('mobile-active');
        }, 300);

        document.body.style.overflow = '';

        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', 'false');
    }

    // Mobile menu toggle event
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Close mobile menu if it's open
            if (navMenu.classList.contains('mobile-active')) {
                closeMobileMenu();
            }

            // Handle smooth scroll to sections
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Close mobile menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('mobile-active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 767 && navMenu.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavLink);
            ticking = true;
        }
    });

    // Initial call to set active nav link
    updateActiveNavLink();

    // Handle back to top functionality
    const backToTopLink = document.querySelector('.back-to-top');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        let isScrolling = false;
        let scrollTimeout;
        let pulseTimeout;

        // Add accessibility attributes
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('aria-label', 'Scroll to about section');
        scrollIndicator.setAttribute('tabindex', '0');

        // Enhanced click handler with smooth animation
        function handleScrollClick() {
            if (isScrolling) return; // Prevent multiple clicks during scroll

            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                isScrolling = true;
                scrollIndicator.style.pointerEvents = 'none';

                const headerHeight = header.offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;

                // Add visual feedback
                scrollIndicator.classList.add('fade-out');

                // Smooth scroll with callback
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Reset after scroll completes
                setTimeout(() => {
                    isScrolling = false;
                    scrollIndicator.style.pointerEvents = 'auto';
                    scrollIndicator.classList.remove('fade-out');
                }, 1000);
            }
        }

        // Click handler
        scrollIndicator.addEventListener('click', handleScrollClick);

        // Enhanced keyboard support
        scrollIndicator.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleScrollClick();
            }
        });

        // Touch support for mobile
        let touchStartY = 0;
        scrollIndicator.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
            this.style.transform = 'translateX(-50%) scale(0.95)';
        }, { passive: true });

        scrollIndicator.addEventListener('touchend', function (e) {
            this.style.transform = '';
            const touchEndY = e.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;

            // If user swiped up, trigger scroll
            if (touchDiff > 10) {
                handleScrollClick();
            }
        }, { passive: true });

        // Enhanced scroll behavior with throttling
        let ticking = false;
        function updateScrollIndicator() {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const scrollPosition = window.scrollY || window.pageYOffset;
                const scrollProgress = scrollPosition / (heroBottom - 200);

                // Fade out gradually as user scrolls
                if (scrollPosition > heroBottom - 200) {
                    const opacity = Math.max(0, 1 - scrollProgress);
                    scrollIndicator.style.opacity = opacity;
                    scrollIndicator.style.transform = `translateX(-50%) scale(${Math.max(0.8, 1 - scrollProgress * 0.2)})`;

                    if (opacity <= 0.1) {
                        scrollIndicator.style.pointerEvents = 'none';
                    }
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
                    scrollIndicator.style.pointerEvents = 'auto';
                }

                // Add pulse effect if user hasn't scrolled for a while
                clearTimeout(pulseTimeout);
                scrollIndicator.classList.remove('pulse');

                if (scrollPosition < 50) {
                    pulseTimeout = setTimeout(() => {
                        scrollIndicator.classList.add('pulse');
                    }, 3000);
                }
            }
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollIndicator);
                ticking = true;
            }
        }

        // Throttled scroll listener
        window.addEventListener('scroll', requestTick);

        // Initial call
        updateScrollIndicator();

        // Add pulse effect after initial load
        setTimeout(() => {
            if ((window.scrollY || window.pageYOffset) < 50) {
                scrollIndicator.classList.add('pulse');
            }
        }, 5000);

        // Mouse enter/leave effects
        scrollIndicator.addEventListener('mouseenter', function () {
            this.classList.remove('pulse');
        });

        scrollIndicator.addEventListener('mouseleave', function () {
            if ((window.scrollY || window.pageYOffset) < 50) {
                setTimeout(() => {
                    this.classList.add('pulse');
                }, 2000);
            }
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function (e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
            closeMobileMenu();
        }

        // Toggle mobile menu with Enter or Space on nav toggle
        if ((e.key === 'Enter' || e.key === ' ') && e.target === navToggle) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Make nav toggle focusable and accessible
    if (navToggle) {
        navToggle.setAttribute('tabindex', '0');
        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'nav-menu');

        // Add ID to nav menu for accessibility
        navMenu.setAttribute('id', 'nav-menu');
        navMenu.setAttribute('role', 'navigation');
        navMenu.setAttribute('aria-label', 'Main navigation');

        // Update aria-expanded when menu toggles
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = navToggle.classList.contains('active');
                    navToggle.setAttribute('aria-expanded', isActive.toString());
                }
            });
        });

        observer.observe(navToggle, { attributes: true });
    }

    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Simple smooth scroll implementation
        function smoothScrollTo(target, duration = 800) {
            const start = window.scrollY || document.documentElement.scrollTop;
            const distance = target - start;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, start, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }

        // Override smooth scroll behavior for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        smoothScrollTo(targetPosition);
                    }
                }
            });
        });
    }
});

// Enhanced Contact form functionality with error handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                // Clear error on input
                const errorElement = document.getElementById(this.name + 'Error');
                if (errorElement && errorElement.textContent) {
                    errorElement.textContent = '';
                    this.classList.remove('error');
                }
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();

            // Clear previous errors
            clearFormErrors();

            // Validate form
            let isValid = true;

            if (!name) {
                const message = window.i18n ? window.i18n.t('validation.name.required') : 'Name is required';
                showFormError('nameError', message, 'name');
                isValid = false;
            } else if (name.length < 2) {
                const message = window.i18n ? window.i18n.t('validation.name.minlength') : 'Name must be at least 2 characters';
                showFormError('nameError', message, 'name');
                isValid = false;
            }

            if (!email) {
                const message = window.i18n ? window.i18n.t('validation.email.required') : 'Email is required';
                showFormError('emailError', message, 'email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                const message = window.i18n ? window.i18n.t('validation.email.invalid') : 'Please enter a valid email address';
                showFormError('emailError', message, 'email');
                isValid = false;
            }

            if (!message) {
                const messageText = window.i18n ? window.i18n.t('validation.message.required') : 'Message is required';
                showFormError('messageError', messageText, 'message');
                isValid = false;
            } else if (message.length < 10) {
                const messageText = window.i18n ? window.i18n.t('validation.message.minlength') : 'Message must be at least 10 characters';
                showFormError('messageError', messageText, 'message');
                isValid = false;
            }

            if (isValid) {
                submitForm(formData);
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;

        switch (fieldName) {
            case 'name':
                if (!value) {
                    showFormError('nameError', 'Name is required', 'name');
                    isValid = false;
                } else if (value.length < 2) {
                    showFormError('nameError', 'Name must be at least 2 characters', 'name');
                    isValid = false;
                }
                break;
            case 'email':
                if (!value) {
                    showFormError('emailError', 'Email is required', 'email');
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    showFormError('emailError', 'Please enter a valid email address', 'email');
                    isValid = false;
                }
                break;
            case 'message':
                if (!value) {
                    showFormError('messageError', 'Message is required', 'message');
                    isValid = false;
                } else if (value.length < 10) {
                    showFormError('messageError', 'Message must be at least 10 characters', 'message');
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            const errorElement = document.getElementById(fieldName + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
            field.classList.remove('error');
        }

        return isValid;
    }

    function submitForm(formData) {
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalText = submitButton.textContent;

        // Show loading state
        const loadingText = window.i18n ? window.i18n.t('loading.sending') : 'Sending...';
        submitButton.textContent = loadingText;
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        // Simulate form submission with error handling
        const simulateSubmission = new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random failure for demonstration (remove in production)
                if (Math.random() > 0.8) {
                    reject(new Error('Network error occurred'));
                } else {
                    resolve('Form submitted successfully');
                }
            }, 2000);
        });

        simulateSubmission
            .then(() => {
                // Success
                contactForm.reset();
                formSuccess.classList.add('show');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            })
            .catch((error) => {
                // Error handling
                const errorMessage = window.i18n ? window.i18n.t('validation.submit.error') : 'Failed to send message. Please try again.';
                showFormError('submitError', errorMessage, null);
                console.error('Form submission error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            });
    }

    function showFormError(errorId, message, fieldName) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        if (fieldName) {
            const field = document.getElementById(fieldName);
            if (field) {
                field.classList.add('error');
            }
        }
    }

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        const errorFields = document.querySelectorAll('.form-input.error, .form-textarea.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Portfolio Functionality with Enhanced Performance Optimizations
document.addEventListener('DOMContentLoaded', function () {
    // Enhanced Lazy Loading Implementation with WebP Support and Error Handling
    const portfolioImages = document.querySelectorAll('.portfolio-image picture img[data-src], .portfolio-image img[data-src]');

    // WebP support detection
    function supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    const webpSupported = supportsWebP();

    // Create error placeholder image
    function createErrorPlaceholder() {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        // Draw error placeholder
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, 300, 200);
        ctx.fillStyle = '#e94560';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Image unavailable', 150, 100);
        ctx.fillText('Click to retry', 150, 120);

        return canvas.toDataURL();
    }

    const errorPlaceholder = createErrorPlaceholder();

    // Progressive image loading with multiple formats
    function loadImageWithFallback(img, originalSrc) {
        return new Promise((resolve, reject) => {
            const imageContainer = img.closest('.portfolio-image');
            let attempts = 0;
            const maxAttempts = 3;

            function tryLoad(src) {
                attempts++;
                const testImg = new Image();

                testImg.onload = function () {
                    img.src = src;
                    img.classList.add('loaded');
                    imageContainer.classList.remove('loading');
                    imageContainer.classList.remove('error');
                    resolve(src);
                };

                testImg.onerror = function () {
                    if (attempts < maxAttempts) {
                        // Retry with delay
                        setTimeout(() => tryLoad(src), 1000 * attempts);
                    } else {
                        // Show error state
                        img.src = errorPlaceholder;
                        img.alt = 'Image failed to load - Click to retry';
                        imageContainer.classList.remove('loading');
                        imageContainer.classList.add('error');

                        // Add retry functionality
                        const retryHandler = function () {
                            imageContainer.classList.add('loading');
                            imageContainer.classList.remove('error');
                            attempts = 0;
                            tryLoad(originalSrc);
                            img.removeEventListener('click', retryHandler);
                        };

                        img.addEventListener('click', retryHandler);
                        img.style.cursor = 'pointer';

                        reject(new Error(`Failed to load image after ${maxAttempts} attempts`));
                    }
                };

                testImg.src = src;
            }

            // Try WebP first if supported, then fallback to original
            if (webpSupported && originalSrc.includes('.webp')) {
                tryLoad(originalSrc);
            } else if (webpSupported && !originalSrc.includes('.webp')) {
                // Try to load WebP version first
                const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                const testWebP = new Image();
                testWebP.onload = () => tryLoad(webpSrc);
                testWebP.onerror = () => tryLoad(originalSrc);
                testWebP.src = webpSrc;
            } else {
                tryLoad(originalSrc);
            }
        });
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const originalSrc = img.dataset.src;

                if (originalSrc) {
                    loadImageWithFallback(img, originalSrc)
                        .then(() => {
                            img.removeAttribute('data-src');
                        })
                        .catch(error => {
                            console.warn('Image loading failed:', error.message, originalSrc);
                        });
                }

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    portfolioImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Simplified Lightbox Functionality - Clean Image Zoom
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    // Initialize portfolio items
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('img');

        // Add click event to portfolio item
        item.addEventListener('click', function (e) {
            e.preventDefault();
            openLightbox(img);
        });

        // Add keyboard support
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img);
            }
        });

        // Make portfolio items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View image in full size');
    });

    // Open lightbox with specific image
    function openLightbox(imgElement) {
        if (!imgElement || !lightbox || !lightboxImage) return;

        // Get the image source (handle lazy loading)
        const imageSrc = imgElement.src || imgElement.dataset.src;
        const imageAlt = imgElement.alt || 'Portfolio image';

        // Set lightbox content
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;

        // Show lightbox with animation
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        if (lightboxClose) {
            lightboxClose.focus();
        }

        // Add loading state
        lightboxImage.style.opacity = '0.7';
        
        // Remove loading state when image loads
        lightboxImage.onload = function () {
            lightboxImage.style.opacity = '1';
        };
    }

    // Close lightbox
    function closeLightbox() {
        if (!lightbox) return;
        
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox when clicking on background
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation for lightbox - Escape key only
    document.addEventListener('keydown', function (e) {
        if (lightbox && lightbox.classList.contains('active') && e.key === 'Escape') {
            closeLightbox();
        }
    });
});
//Log performance metrics when page is fully loaded
window.addEventListener('load', function () {
    PerformanceMonitor.logLoadTime();

    // Log Core Web Vitals if available
    if ('web-vitals' in window) {
        // This would be used with the web-vitals library
        console.log('Web Vitals tracking available');
    }
});

// Mark navigation as complete
PerformanceMonitor.mark('navigation-complete');