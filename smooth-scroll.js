// Enhanced Smooth Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll configuration
    const SCROLL_CONFIG = {
        duration: 800,
        easing: 'easeInOutCubic',
        offset: 80 // Header height offset
    };
    
    // Easing functions
    const easingFunctions = {
        linear: function(t) {
            return t;
        },
        easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeOutQuart: function(t) {
            return 1 - (--t) * t * t * t;
        }
    };
    
    // Enhanced smooth scroll function
    function smoothScrollTo(targetPosition, duration = SCROLL_CONFIG.duration, easing = SCROLL_CONFIG.easing) {
        const startPosition = window.scrollY || window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easedProgress = easingFunctions[easing] ? 
                easingFunctions[easing](progress) : 
                easingFunctions.easeInOutCubic(progress);
            
            const currentPosition = startPosition + (distance * easedProgress);
            window.scrollTo(0, currentPosition);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Get header height dynamically
    function getHeaderHeight() {
        const header = document.getElementById('header');
        return header ? header.offsetHeight : SCROLL_CONFIG.offset;
    }
    
    // Handle all anchor links with smooth scrolling
    function initializeSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = getHeaderHeight();
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Use native smooth scroll if supported, otherwise use custom implementation
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        smoothScrollTo(targetPosition);
                    }
                    
                    // Update URL hash after scroll completes
                    setTimeout(() => {
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        } else {
                            location.hash = href;
                        }
                    }, SCROLL_CONFIG.duration);
                }
            });
        });
    }
    
    // Handle browser back/forward navigation
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = getHeaderHeight();
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        smoothScrollTo(targetPosition);
                    }
                }, 100);
            }
        }
    }
    
    // Scroll to section on page load if hash exists
    function handleInitialHash() {
        const hash = window.location.hash;
        if (hash) {
            // Delay to ensure page is fully loaded
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = getHeaderHeight();
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    window.scrollTo(0, targetPosition);
                }
            }, 300);
        }
    }
    
    // Keyboard navigation for smooth scrolling
    function handleKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Page Up/Down with smooth scrolling
            if (e.key === 'PageUp' || e.key === 'PageDown') {
                e.preventDefault();
                const viewportHeight = window.innerHeight;
                const currentPosition = window.scrollY || window.pageYOffset;
                const targetPosition = e.key === 'PageUp' ? 
                    Math.max(0, currentPosition - viewportHeight * 0.8) :
                    currentPosition + viewportHeight * 0.8;
                
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(targetPosition, 600);
                }
            }
            
            // Home/End keys
            if (e.key === 'Home' && e.ctrlKey) {
                e.preventDefault();
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(0);
                }
            }
            
            if (e.key === 'End' && e.ctrlKey) {
                e.preventDefault();
                const documentHeight = Math.max(
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight
                );
                const targetPosition = documentHeight - window.innerHeight;
                
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(targetPosition);
                }
            }
        });
    }
    
    // Intersection Observer for section visibility
    function initializeSectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observerOptions = {
            root: null,
            rootMargin: `-${getHeaderHeight()}px 0px -50% 0px`,
            threshold: 0
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    const activeNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current section's nav link
                    if (activeNavLink) {
                        activeNavLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Scroll progress indicator (optional enhancement)
    function createScrollProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #e94560, #ffd700);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        function updateScrollProgress() {
            const scrollTop = window.scrollY || window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
        
        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial call
    }
    
    // Initialize all smooth scroll functionality
    function init() {
        initializeSmoothScroll();
        handleInitialHash();
        handleKeyboardNavigation();
        initializeSectionObserver();
        
        // Optional: Add scroll progress indicator
        // createScrollProgressIndicator();
        
        // Handle hash changes (browser navigation)
        window.addEventListener('hashchange', handleHashChange);
        
        // Re-initialize on dynamic content changes
        const observer = new MutationObserver((mutations) => {
            let shouldReinit = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.querySelector('a[href^="#"]')) {
                            shouldReinit = true;
                        }
                    });
                }
            });
            
            if (shouldReinit) {
                initializeSmoothScroll();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Start initialization
    init();
    
    // Expose smooth scroll function globally for external use
    window.smoothScrollTo = smoothScrollTo;
});