// Responsive and Touch Interaction Enhancements
document.addEventListener('DOMContentLoaded', function () {
    
    // ===== RESPONSIVE UTILITIES =====
    
    // Viewport detection and responsive breakpoint management
    const breakpoints = {
        mobile: 767,
        tablet: 1023,
        desktop: 1024
    };
    
    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= breakpoints.mobile) return 'mobile';
        if (width <= breakpoints.tablet) return 'tablet';
        return 'desktop';
    }
    
    // Update CSS custom properties based on viewport
    function updateViewportProperties() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        document.documentElement.style.setProperty('--vw', `${vw}px`);
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--current-breakpoint', getCurrentBreakpoint());
    }
    
    // ===== TOUCH INTERACTION ENHANCEMENTS =====
    
    // Enhanced touch feedback for interactive elements
    function addTouchFeedback() {
        const touchElements = document.querySelectorAll('.btn, .service-tile, .portfolio-item, .nav-link');
        
        touchElements.forEach(element => {
            // Add touch start feedback
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            }, { passive: true });
            
            // Remove touch feedback
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
            
            // Handle touch cancel
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }
    
    // ===== MOBILE NAVIGATION ENHANCEMENTS =====
    
    // Improved mobile menu with better touch handling
    function enhanceMobileNavigation() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (!navMenu || !navToggle) return;
        
        let touchStartY = 0;
        let touchEndY = 0;
        
        // Add swipe to close functionality for mobile menu
        navMenu.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        navMenu.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleMenuSwipe();
        }, { passive: true });
        
        function handleMenuSwipe() {
            const swipeThreshold = 100;
            const swipeDistance = touchStartY - touchEndY;
            
            // Swipe up to close menu
            if (swipeDistance > swipeThreshold && navMenu.classList.contains('mobile-active')) {
                const closeMobileMenuEvent = new CustomEvent('closeMobileMenu');
                document.dispatchEvent(closeMobileMenuEvent);
            }
        }
    }
    
    // ===== FORM ENHANCEMENTS FOR MOBILE =====
    
    // Improve form interactions on mobile devices
    function enhanceFormInteractions() {
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        formInputs.forEach(input => {
            // Prevent zoom on focus for iOS
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                input.addEventListener('focus', function() {
                    this.style.fontSize = '16px';
                });
                
                input.addEventListener('blur', function() {
                    this.style.fontSize = '';
                });
            }
            
            // Enhanced focus states for better accessibility
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('form-group-focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('form-group-focused');
            });
        });
    }
    
    // ===== SCROLL ENHANCEMENTS =====
    
    // Smooth scroll behavior with momentum for mobile
    function enhanceScrollBehavior() {
        // Add momentum scrolling for iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Prevent scroll bounce on iOS
        document.addEventListener('touchmove', function(e) {
            if (e.target.closest('.nav-menu.mobile-active') || 
                e.target.closest('.lightbox.active')) {
                return;
            }
            
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight || window.innerHeight;
            
            if (scrollTop === 0 && e.touches[0].clientY > e.touches[0].clientY) {
                e.preventDefault();
            }
            
            if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < e.touches[0].clientY) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Debounced resize handler for better performance
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
    
    // Optimized resize handler
    const handleResize = debounce(function() {
        updateViewportProperties();
        
        // Trigger custom resize event for other components
        const customResizeEvent = new CustomEvent('optimizedResize', {
            detail: {
                breakpoint: getCurrentBreakpoint(),
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
        
        document.dispatchEvent(customResizeEvent);
    }, 250);
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Improve keyboard navigation
    function enhanceKeyboardNavigation() {
        // Add visible focus indicators
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Enhanced focus management for interactive elements
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            element.addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        });
    }
    
    // ===== DEVICE-SPECIFIC OPTIMIZATIONS =====
    
    // Detect and optimize for different devices
    function optimizeForDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /ipad|iphone|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);
        const isMobile = /mobile/.test(userAgent);
        
        // Add device-specific classes
        if (isIOS) document.body.classList.add('ios-device');
        if (isAndroid) document.body.classList.add('android-device');
        if (isMobile) document.body.classList.add('mobile-device');
        
        // iOS-specific optimizations
        if (isIOS) {
            // Fix viewport height issues on iOS
            function setVH() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh-ios', `${vh}px`);
            }
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);
        }
        
        // Android-specific optimizations
        if (isAndroid) {
            // Improve touch responsiveness on Android
            document.body.style.touchAction = 'manipulation';
        }
    }
    
    // ===== ORIENTATION CHANGE HANDLING =====
    
    function handleOrientationChange() {
        window.addEventListener('orientationchange', function() {
            // Delay to ensure viewport has updated
            setTimeout(() => {
                updateViewportProperties();
                
                // Trigger custom orientation change event
                const orientationEvent = new CustomEvent('optimizedOrientationChange', {
                    detail: {
                        orientation: window.orientation,
                        breakpoint: getCurrentBreakpoint()
                    }
                });
                
                document.dispatchEvent(orientationEvent);
            }, 100);
        });
    }
    
    // ===== INITIALIZATION =====
    
    // Initialize all enhancements
    function init() {
        updateViewportProperties();
        addTouchFeedback();
        enhanceMobileNavigation();
        enhanceFormInteractions();
        enhanceScrollBehavior();
        enhanceKeyboardNavigation();
        optimizeForDevice();
        handleOrientationChange();
        
        // Add event listeners
        window.addEventListener('resize', handleResize);
        
        // Add responsive classes to body
        document.body.classList.add(`breakpoint-${getCurrentBreakpoint()}`);
        
        // Update breakpoint class on resize
        document.addEventListener('optimizedResize', function(e) {
            // Remove old breakpoint classes
            document.body.classList.remove('breakpoint-mobile', 'breakpoint-tablet', 'breakpoint-desktop');
            // Add current breakpoint class
            document.body.classList.add(`breakpoint-${e.detail.breakpoint}`);
        });
    }
    
    // Initialize when DOM is ready
    init();
    
    // ===== PUBLIC API =====
    
    // Expose utilities for other scripts
    window.ResponsiveTouch = {
        getCurrentBreakpoint,
        updateViewportProperties,
        breakpoints
    };
});