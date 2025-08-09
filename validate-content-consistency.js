// Content Consistency Validation Script for 4K Print Website
// This script validates content consistency across all languages (French, Arabic, English)

class ContentValidator {
    constructor() {
        this.languages = ['fr', 'ar', 'en'];
        this.validationResults = {
            languageSwitching: [],
            contentConsistency: [],
            contactForm: [],
            mapEmbed: [],
            overall: { passed: 0, failed: 0, warnings: 0 }
        };
        this.businessInfo = {
            name: '4K Print',
            tagline: 'Print & Pub',
            phone: '+212 622-646474',
            email: 'graphienet@gmail.com',
            address: 'Errahma - Casablanca, Morocco',
            whatsapp: 'https://api.whatsapp.com/message/BMEHYYEJEZLQI1',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d195.67575932320185!2d-7.723849017775271!3d33.53580919063656!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDMyJzA3LjgiTiA3wrA0MycyNi43Ilc!5e1!3m2!1sen!2sus!4v1754481813448!5m2!1sen!2sus',
            socialMedia: {
                facebook: 'https://web.facebook.com/people/graphienet-pub-print/100088486404609/',
                instagram: 'https://www.instagram.com/graphienet_pub_/',
                linkedin: 'https://www.linkedin.com/in/said-el-alaoui-9488a7270'
            }
        };
    }

    // Main validation function
    async validateAll() {
        console.log('🔍 Starting Content Consistency Validation...\n');
        
        // Test 1: Language switching functionality
        await this.testLanguageSwitching();
        
        // Test 2: Content consistency across languages
        await this.testContentConsistency();
        
        // Test 3: Contact form functionality
        await this.testContactForm();
        
        // Test 4: Map embed validation
        await this.testMapEmbed();
        
        // Generate final report
        this.generateReport();
    }

    // Test language switching functionality
    async testLanguageSwitching() {
        console.log('📋 Testing Language Switching Functionality...');
        
        try {
            // Check if i18n system is loaded
            if (typeof window.i18nManager === 'undefined') {
                this.addResult('languageSwitching', 'FAILED', 'I18n system not loaded');
                return;
            }

            const i18n = window.i18nManager;
            
            // Test switching to each language
            for (const lang of this.languages) {
                try {
                    i18n.switchLanguage(lang);
                    
                    // Wait for DOM updates
                    await this.wait(500);
                    
                    // Check if language was applied
                    const currentLang = i18n.currentLanguage;
                    if (currentLang === lang) {
                        this.addResult('languageSwitching', 'PASSED', `Successfully switched to ${lang}`);
                        
                        // Test specific elements for translation
                        const testElements = [
                            { selector: '[data-i18n="nav.home"]', key: 'nav.home' },
                            { selector: '[data-i18n="hero.title"]', key: 'hero.title' },
                            { selector: '[data-i18n="about.title"]', key: 'about.title' },
                            { selector: '[data-i18n="services.title"]', key: 'services.title' },
                            { selector: '[data-i18n="contact.title"]', key: 'contact.title' }
                        ];
                        
                        for (const test of testElements) {
                            const element = document.querySelector(test.selector);
                            if (element && element.textContent.trim()) {
                                this.addResult('languageSwitching', 'PASSED', `${test.key} translated in ${lang}`);
                            } else {
                                this.addResult('languageSwitching', 'FAILED', `${test.key} not translated in ${lang}`);
                            }
                        }
                        
                    } else {
                        this.addResult('languageSwitching', 'FAILED', `Failed to switch to ${lang}`);
                    }
                } catch (error) {
                    this.addResult('languageSwitching', 'FAILED', `Error switching to ${lang}: ${error.message}`);
                }
            }
            
        } catch (error) {
            this.addResult('languageSwitching', 'FAILED', `Language switching test failed: ${error.message}`);
        }
    }

    // Test content consistency across languages
    async testContentConsistency() {
        console.log('📋 Testing Content Consistency Across Languages...');
        
        try {
            // Load i18n translations
            const i18nScript = document.querySelector('script[src="i18n.js"]');
            if (!i18nScript) {
                this.addResult('contentConsistency', 'FAILED', 'i18n.js not found');
                return;
            }

            // Test business information consistency
            await this.testBusinessInfoConsistency();
            
            // Test service descriptions consistency
            await this.testServiceConsistency();
            
            // Test contact information consistency
            await this.testContactInfoConsistency();
            
        } catch (error) {
            this.addResult('contentConsistency', 'FAILED', `Content consistency test failed: ${error.message}`);
        }
    }

    // Test business information consistency
    async testBusinessInfoConsistency() {
        const businessElements = [
            { selector: 'title', contains: '4K Print' },
            { selector: 'meta[name="description"]', attribute: 'content', contains: 'advertising panels' },
            { selector: '.hero-title', contains: 'Print & Pub' },
            { selector: '.footer-logo .logo-link', contains: '4K Print' }
        ];

        for (const test of businessElements) {
            const element = document.querySelector(test.selector);
            if (element) {
                const content = test.attribute ? element.getAttribute(test.attribute) : element.textContent;
                if (content && content.includes(test.contains)) {
                    this.addResult('contentConsistency', 'PASSED', `Business info consistent: ${test.selector}`);
                } else {
                    this.addResult('contentConsistency', 'FAILED', `Business info inconsistent: ${test.selector}`);
                }
            } else {
                this.addResult('contentConsistency', 'FAILED', `Element not found: ${test.selector}`);
            }
        }
    }

    // Test service consistency
    async testServiceConsistency() {
        const expectedServices = [
            'Advertising Panels',
            'Product Labels',
            'Flyers',
            'PVC Banner & Vinyl',
            'Logo Design & Branding',
            'Business Cards & Brochures',
            'Large Format Prints',
            'Custom Stickers',
            'Window & Car Decals',
            'One-way Vision Film'
        ];

        const serviceElements = document.querySelectorAll('.service-tile .service-title');
        
        if (serviceElements.length >= expectedServices.length) {
            this.addResult('contentConsistency', 'PASSED', `All ${expectedServices.length} services present`);
        } else {
            this.addResult('contentConsistency', 'WARNING', `Only ${serviceElements.length} services found, expected ${expectedServices.length}`);
        }

        // Check if services match expected list
        const foundServices = Array.from(serviceElements).map(el => el.textContent.trim());
        for (const expectedService of expectedServices) {
            const found = foundServices.some(service => service.includes(expectedService.split(' ')[0]));
            if (found) {
                this.addResult('contentConsistency', 'PASSED', `Service found: ${expectedService}`);
            } else {
                this.addResult('contentConsistency', 'WARNING', `Service not found: ${expectedService}`);
            }
        }
    }

    // Test contact information consistency
    async testContactInfoConsistency() {
        const contactTests = [
            { 
                selector: 'a[href*="whatsapp"]', 
                expectedHref: this.businessInfo.whatsapp,
                test: 'WhatsApp link'
            },
            {
                selector: 'a[href^="mailto:"]',
                expectedHref: `mailto:${this.businessInfo.email}`,
                test: 'Email link'
            },
            {
                selector: '.contact-text',
                contains: 'Errahma - Casablanca',
                test: 'Address information'
            }
        ];

        for (const test of contactTests) {
            const element = document.querySelector(test.selector);
            if (element) {
                if (test.expectedHref) {
                    const href = element.getAttribute('href');
                    if (href && href.includes(test.expectedHref.split('//')[1]?.split('/')[0] || test.expectedHref)) {
                        this.addResult('contentConsistency', 'PASSED', `${test.test} correct`);
                    } else {
                        this.addResult('contentConsistency', 'FAILED', `${test.test} incorrect: ${href}`);
                    }
                } else if (test.contains) {
                    const content = element.textContent;
                    if (content && content.includes(test.contains)) {
                        this.addResult('contentConsistency', 'PASSED', `${test.test} correct`);
                    } else {
                        this.addResult('contentConsistency', 'FAILED', `${test.test} incorrect`);
                    }
                }
            } else {
                this.addResult('contentConsistency', 'FAILED', `${test.test} element not found`);
            }
        }
    }

    // Test contact form functionality
    async testContactForm() {
        console.log('📋 Testing Contact Form Functionality...');
        
        try {
            const form = document.getElementById('contactForm');
            if (!form) {
                this.addResult('contactForm', 'FAILED', 'Contact form not found');
                return;
            }

            this.addResult('contactForm', 'PASSED', 'Contact form found');

            // Test form fields
            const requiredFields = [
                { id: 'name', type: 'text', label: 'Name field' },
                { id: 'email', type: 'email', label: 'Email field' },
                { id: 'message', type: 'textarea', label: 'Message field' }
            ];

            for (const field of requiredFields) {
                const element = document.getElementById(field.id);
                if (element) {
                    this.addResult('contactForm', 'PASSED', `${field.label} found`);
                    
                    // Test field attributes
                    if (element.hasAttribute('required')) {
                        this.addResult('contactForm', 'PASSED', `${field.label} is required`);
                    } else {
                        this.addResult('contactForm', 'WARNING', `${field.label} not marked as required`);
                    }
                } else {
                    this.addResult('contactForm', 'FAILED', `${field.label} not found`);
                }
            }

            // Test project type dropdown
            const projectType = document.getElementById('projectType');
            if (projectType) {
                const options = projectType.querySelectorAll('option');
                if (options.length > 1) {
                    this.addResult('contactForm', 'PASSED', `Project type dropdown has ${options.length} options`);
                } else {
                    this.addResult('contactForm', 'WARNING', 'Project type dropdown has limited options');
                }
            }

            // Test submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                this.addResult('contactForm', 'PASSED', 'Submit button found');
            } else {
                this.addResult('contactForm', 'FAILED', 'Submit button not found');
            }

        } catch (error) {
            this.addResult('contactForm', 'FAILED', `Contact form test failed: ${error.message}`);
        }
    }

    // Test map embed
    async testMapEmbed() {
        console.log('📋 Testing Map Embed...');
        
        try {
            const mapIframe = document.querySelector('.about-map, iframe[src*="google.com/maps"]');
            if (!mapIframe) {
                this.addResult('mapEmbed', 'FAILED', 'Map iframe not found');
                return;
            }

            this.addResult('mapEmbed', 'PASSED', 'Map iframe found');

            // Test iframe src
            const src = mapIframe.getAttribute('src');
            if (src && src.includes('google.com/maps/embed')) {
                this.addResult('mapEmbed', 'PASSED', 'Map embed URL is valid Google Maps embed');
                
                // Test if coordinates match expected location (Casablanca area)
                if (src.includes('33.53') && src.includes('-7.72')) {
                    this.addResult('mapEmbed', 'PASSED', 'Map coordinates match Casablanca location');
                } else {
                    this.addResult('mapEmbed', 'WARNING', 'Map coordinates may not match expected location');
                }
            } else {
                this.addResult('mapEmbed', 'FAILED', 'Invalid map embed URL');
            }

            // Test iframe attributes
            const requiredAttributes = ['width', 'height', 'allowfullscreen'];
            for (const attr of requiredAttributes) {
                if (mapIframe.hasAttribute(attr)) {
                    this.addResult('mapEmbed', 'PASSED', `Map iframe has ${attr} attribute`);
                } else {
                    this.addResult('mapEmbed', 'WARNING', `Map iframe missing ${attr} attribute`);
                }
            }

        } catch (error) {
            this.addResult('mapEmbed', 'FAILED', `Map embed test failed: ${error.message}`);
        }
    }

    // Helper function to add validation results
    addResult(category, status, message) {
        const result = { status, message, timestamp: new Date().toISOString() };
        this.validationResults[category].push(result);
        
        // Update overall counters
        switch (status) {
            case 'PASSED':
                this.validationResults.overall.passed++;
                break;
            case 'FAILED':
                this.validationResults.overall.failed++;
                break;
            case 'WARNING':
                this.validationResults.overall.warnings++;
                break;
        }

        // Log to console with appropriate styling
        const emoji = status === 'PASSED' ? '✅' : status === 'FAILED' ? '❌' : '⚠️';
        console.log(`${emoji} [${category.toUpperCase()}] ${message}`);
    }

    // Helper function to wait
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Generate final validation report
    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 CONTENT CONSISTENCY VALIDATION REPORT');
        console.log('='.repeat(60));
        
        const { passed, failed, warnings } = this.validationResults.overall;
        const total = passed + failed + warnings;
        
        console.log(`\n📈 OVERALL RESULTS:`);
        console.log(`   Total Tests: ${total}`);
        console.log(`   ✅ Passed: ${passed} (${((passed/total)*100).toFixed(1)}%)`);
        console.log(`   ❌ Failed: ${failed} (${((failed/total)*100).toFixed(1)}%)`);
        console.log(`   ⚠️  Warnings: ${warnings} (${((warnings/total)*100).toFixed(1)}%)`);
        
        // Detailed results by category
        for (const [category, results] of Object.entries(this.validationResults)) {
            if (category === 'overall') continue;
            
            console.log(`\n📋 ${category.toUpperCase().replace(/([A-Z])/g, ' $1').trim()}:`);
            
            const categoryPassed = results.filter(r => r.status === 'PASSED').length;
            const categoryFailed = results.filter(r => r.status === 'FAILED').length;
            const categoryWarnings = results.filter(r => r.status === 'WARNING').length;
            
            console.log(`   ✅ ${categoryPassed} | ❌ ${categoryFailed} | ⚠️ ${categoryWarnings}`);
            
            // Show failed tests
            const failedTests = results.filter(r => r.status === 'FAILED');
            if (failedTests.length > 0) {
                console.log(`   Failed tests:`);
                failedTests.forEach(test => console.log(`     - ${test.message}`));
            }
        }

        // Recommendations
        console.log(`\n💡 RECOMMENDATIONS:`);
        if (failed > 0) {
            console.log(`   - Address ${failed} failed test(s) before deployment`);
        }
        if (warnings > 0) {
            console.log(`   - Review ${warnings} warning(s) for potential improvements`);
        }
        if (failed === 0 && warnings === 0) {
            console.log(`   - All tests passed! Content consistency is excellent.`);
        }

        console.log('\n' + '='.repeat(60));
        
        // Return summary for programmatic use
        return {
            success: failed === 0,
            summary: { passed, failed, warnings, total },
            details: this.validationResults
        };
    }
}

// Auto-run validation when script loads
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for i18n system to load
    await new Promise(resolve => {
        if (window.i18nManager) {
            resolve();
        } else {
            const checkI18n = setInterval(() => {
                if (window.i18nManager) {
                    clearInterval(checkI18n);
                    resolve();
                }
            }, 100);
        }
    });

    // Run validation
    const validator = new ContentValidator();
    const results = await validator.validateAll();
    
    // Store results globally for access
    window.validationResults = results;
});

// Export for manual testing
window.ContentValidator = ContentValidator;