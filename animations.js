// Interactive Animations and Smooth Transitions
document.addEventListener('DOMContentLoaded', function () {
    
    // ===== SCROLL-TRIGGERED ANIMATIONS =====
    
    // Animation configuration
    const ANIMATION_CONFIG = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        duration: 800,
        stagger: 100
    };
    
    // Animation classes and their configurations
    const animationClasses = {
        'fade-in': {
            initial: { opacity: 0, transform: 'translateY(30px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        },
        'fade-in-left': {
            initial: { opacity: 0, transform: 'translateX(-50px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        'fade-in-right': {
            initial: { opacity: 0, transform: 'translateX(50px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        'fade-in-up': {
            initial: { opacity: 0, transform: 'translateY(50px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        },
        'scale-in': {
            initial: { opacity: 0, transform: 'scale(0.8)' },
            animate: { opacity: 1, transform: 'scale(1)' }
        },
        'slide-in-up': {
            initial: { opacity: 0, transform: 'translateY(100px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        }
    };
    
    // Performance-optimized animation function
    function animateElement(element, animationType, delay = 0) {
        const config = animationClasses[animationType];
        if (!config) return;
        
        // Apply initial state
        Object.assign(element.style, {
            opacity: config.initial.opacity,
            transform: config.initial.transform,
            transition: `all ${ANIMATION_CONFIG.duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
        });
        
        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                Object.assign(element.style, {
                    opacity: config.animate.opacity,
                    transform: config.animate.transform
                });
            });
        });
    }
    
    // Intersection Observer for scroll-triggered animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fade-in';
                const delay = parseInt(element.dataset.delay) || index * ANIMATION_CONFIG.stagger;
                
                // Add animation class for CSS-based animations
                element.classList.add('animate-in');
                
                // Apply JavaScript-based animation
                animateElement(element, animationType, delay);
                
                // Unobserve after animation
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: ANIMATION_CONFIG.threshold,
        rootMargin: ANIMATION_CONFIG.rootMargin
    });
    
    // Initialize scroll animations
    function initializeScrollAnimations() {
        // Add animation attributes to elements
        const sectionsToAnimate = [
            { selector: '.section-title', animation: 'fade-in-up', delay: 0 },
            { selector: '.section-subtitle', animation: 'fade-in-up', delay: 100 },
            { selector: '.about-image', animation: 'fade-in-left', delay: 0 },
            { selector: '.about-text', animation: 'fade-in-right', delay: 200 },
            { selector: '.service-tile', animation: 'scale-in', stagger: true },
            { selector: '.portfolio-item', animation: 'fade-in-up', stagger: true },
            { selector: '.contact-form', animation: 'fade-in-left', delay: 0 },
            { selector: '.contact-info', animation: 'fade-in-right', delay: 200 }
        ];
        
        sectionsToAnimate.forEach(({ selector, animation, delay, stagger }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.dataset.animation = animation;
                element.dataset.delay = stagger ? index * ANIMATION_CONFIG.stagger : (delay || 0);
                
                // Set initial state to prevent flash
                element.style.opacity = '0';
                element.style.transform = animationClasses[animation].initial.transform;
                
                animationObserver.observe(element);
            });
        });
    }
    
    // ===== ENHANCED HOVER EFFECTS =====
    
    // Service tiles enhanced hover effects
    function enhanceServiceTileHovers() {
        const serviceTiles = document.querySelectorAll('.service-tile');
        
        serviceTiles.forEach(tile => {
            const icon = tile.querySelector('.service-icon');
            const title = tile.querySelector('.service-title');
            const description = tile.querySelector('.service-description');
            
            tile.addEventListener('mouseenter', function() {
                // Enhanced hover animation
                this.style.transform = 'translateY(-12px) scale(1.03)';
                this.style.boxShadow = '0 25px 50px rgba(233, 69, 96, 0.2)';
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.background = 'linear-gradient(135deg, var(--color-accent-magenta), #d63651)';
                }
                
                if (title) {
                    title.style.transform = 'translateY(-3px)';
                    title.style.color = 'var(--color-accent-magenta)';
                }
                
                if (description) {
                    description.style.transform = 'translateY(-2px)';
                    description.style.color = '#444';
                }
            });
            
            tile.addEventListener('mouseleave', function() {
                // Reset animations
                this.style.transform = '';
                this.style.boxShadow = '';
                
                if (icon) {
                    icon.style.transform = '';
                    icon.style.background = '';
                }
                
                if (title) {
                    title.style.transform = '';
                    title.style.color = '';
                }
                
                if (description) {
                    description.style.transform = '';
                    description.style.color = '';
                }
            });
        });
    }
    
    // Portfolio items enhanced hover effects
    function enhancePortfolioHovers() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const image = item.querySelector('.portfolio-image img');
            const overlay = item.querySelector('.portfolio-overlay');
            const info = item.querySelector('.portfolio-info');
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.03)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
                
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
                
                if (info) {
                    info.style.transform = 'translateY(0) scale(1.05)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                if (image) {
                    image.style.transform = '';
                }
                
                if (info) {
                    info.style.transform = '';
                }
            });
        });
    }
    
    // ===== MICRO-INTERACTIONS =====
    
    // Button micro-interactions
    function addButtonMicroInteractions() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Enhanced hover states
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Form field micro-interactions
    function addFormMicroInteractions() {
        const formFields = document.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        formFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const label = formGroup?.querySelector('.form-label');
            
            field.addEventListener('focus', function() {
                if (formGroup) {
                    formGroup.style.transform = 'translateY(-2px)';
                    formGroup.style.transition = 'transform 0.3s ease';
                }
                
                if (label) {
                    label.style.color = 'var(--color-accent-magenta)';
                    label.style.transform = 'scale(1.05)';
                    label.style.transition = 'all 0.3s ease';
                }
                
                this.style.borderColor = 'var(--color-accent-magenta)';
                this.style.boxShadow = '0 0 0 3px rgba(233, 69, 96, 0.1)';
            });
            
            field.addEventListener('blur', function() {
                if (formGroup) {
                    formGroup.style.transform = '';
                }
                
                if (label) {
                    label.style.color = '';
                    label.style.transform = '';
                }
                
                if (!this.value) {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
        });
    }
    
    // Navigation link micro-interactions
    function addNavMicroInteractions() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // ===== SCROLL PROGRESS INDICATOR =====
    
    function createScrollProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent-magenta), var(--color-highlight-yellow));
            z-index: 9999;
            transition: width 0.1s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(progressBar);
        
        let ticking = false;
        
        function updateScrollProgress() {
            const scrollTop = window.scrollY || window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / documentHeight) * 100, 100);
            
            progressBar.style.width = scrollPercent + '%';
            progressBar.style.opacity = scrollTop > 100 ? '1' : '0';
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
        updateScrollProgress(); // Initial call
    }
    
    // ===== PARALLAX EFFECTS =====
    
    function addParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrollTop = window.scrollY || window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5; // Parallax speed
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // ===== PERFORMANCE MONITORING =====
    
    function monitorAnimationPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function measureFPS() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // If FPS drops below 30, reduce animations
                if (fps < 30) {
                    document.body.classList.add('reduce-animations');
                    console.warn('Low FPS detected, reducing animations');
                } else if (fps > 50) {
                    document.body.classList.remove('reduce-animations');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // Start monitoring after initial load
        setTimeout(() => {
            requestAnimationFrame(measureFPS);
        }, 2000);
    }
    
    // ===== REDUCED MOTION SUPPORT =====
    
    function handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function setReducedMotion(mediaQuery) {
            if (mediaQuery.matches) {
                document.body.classList.add('reduce-motion');
                // Disable complex animations
                const animatedElements = document.querySelectorAll('[data-animation]');
                animatedElements.forEach(element => {
                    element.style.transition = 'none';
                    element.style.animation = 'none';
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                });
            } else {
                document.body.classList.remove('reduce-motion');
            }
        }
        
        setReducedMotion(prefersReducedMotion);
        prefersReducedMotion.addListener(setReducedMotion);
    }
    
    // ===== INITIALIZATION =====
    
    function init() {
        try {
            // Check for reduced motion preference first
            handleReducedMotion();
            
            // Only initialize animations if not reduced motion
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                initializeScrollAnimations();
                enhanceServiceTileHovers();
                enhancePortfolioHovers();
                addButtonMicroInteractions();
                addFormMicroInteractions();
                addNavMicroInteractions();
                createScrollProgressIndicator();
                addParallaxEffects();
                monitorAnimationPerformance();
            }
            
            // Add CSS for animations
            addAnimationCSS();
            
            console.log('✅ Animations initialized successfully');
        } catch (error) {
            console.error('❌ Animation initialization failed:', error);
            // Fallback: ensure basic functionality still works
            document.body.classList.add('reduce-animations');
            
            // Report error for debugging
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: 'Animation initialization failed',
                    fatal: false
                });
            }
        }
    }
    
    // Add CSS for animations
    function addAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ripple animation */
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            /* Scroll progress bar */
            .scroll-progress-bar {
                will-change: width;
            }
            
            /* Animation performance optimizations */
            .animate-in {
                will-change: opacity, transform;
            }
            
            /* Reduced animations for low performance */
            .reduce-animations * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            
            .reduce-animations .parallax {
                transform: none !important;
            }
            
            /* Enhanced hover states */
            .service-tile,
            .portfolio-item,
            .btn {
                will-change: transform, box-shadow;
            }
            
            /* Touch device optimizations */
            @media (hover: none) and (pointer: coarse) {
                .service-tile:hover,
                .portfolio-item:hover,
                .btn:hover {
                    transform: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Initialize animations
    init();
    
    // Expose animation utilities
    window.AnimationUtils = {
        animateElement,
        ANIMATION_CONFIG,
        animationClasses
    };
});