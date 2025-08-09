/**
 * Translation Validation Test
 * Tests all service translation keys to ensure they exist in i18n.js
 * and display proper translated text in all languages
 */

// Import the I18nManager from i18n.js
// Note: This assumes i18n.js is loaded in the same context

class TranslationValidator {
    constructor() {
        this.supportedLanguages = ['fr', 'ar', 'en'];
        this.serviceKeys = [
            'services.advertising_panels.title',
            'services.advertising_panels.description',
            'services.product_labels.title',
            'services.product_labels.description',
            'services.flyers.title',
            'services.flyers.description',
            'services.pvc_vinyl.title',
            'services.pvc_vinyl.description',
            'services.logo.title',
            'services.logo.description',
            'services.business_cards.title',
            'services.business_cards.description',
            'services.large_format.title',
            'services.large_format.description',
            'services.stickers.title',
            'services.stickers.description',
            'services.decals.title',
            'services.decals.description',
            'services.vision_film.title',
            'services.vision_film.description'
        ];
        this.testResults = {
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    /**
     * Run all translation validation tests
     */
    runAllTests() {
        console.log('🧪 Starting Translation Validation Tests...\n');
        
        this.testTranslationKeysExist();
        this.testServiceTilesDisplay();
        this.testLanguageSwitching();
        
        this.displayResults();
        return this.testResults;
    }

    /**
     * Test 1: Verify all HTML translation keys have corresponding i18n entries
     */
    testTranslationKeysExist() {
        console.log('📋 Test 1: Checking translation key existence...');
        
        // Create a temporary I18nManager instance to access translations
        const tempI18n = new I18nManager();
        const translations = tempI18n.getTranslations();
        
        this.supportedLanguages.forEach(lang => {
            console.log(`  Checking ${lang.toUpperCase()} translations:`);
            
            this.serviceKeys.forEach(key => {
                const hasTranslation = translations[lang] && translations[lang][key];
                
                if (hasTranslation) {
                    console.log(`    ✅ ${key}: "${translations[lang][key]}"`);
                    this.testResults.passed++;
                } else {
                    console.log(`    ❌ ${key}: MISSING`);
                    this.testResults.failed++;
                    this.testResults.errors.push(`Missing translation for ${key} in ${lang}`);
                }
            });
            console.log('');
        });
    }

    /**
     * Test 2: Test that all 10 service tiles display proper translated text
     */
    testServiceTilesDisplay() {
        console.log('🎯 Test 2: Checking service tile display...');
        
        // Check if we're in a browser environment
        if (typeof document === 'undefined') {
            console.log('  ⚠️  Browser environment not available - skipping DOM tests');
            return;
        }

        const serviceTiles = document.querySelectorAll('.service-tile');
        console.log(`  Found ${serviceTiles.length} service tiles`);
        
        if (serviceTiles.length !== 10) {
            console.log(`  ❌ Expected 10 service tiles, found ${serviceTiles.length}`);
            this.testResults.failed++;
            this.testResults.errors.push(`Expected 10 service tiles, found ${serviceTiles.length}`);
        } else {
            console.log('  ✅ Correct number of service tiles found');
            this.testResults.passed++;
        }

        // Check each service tile for proper translation display
        serviceTiles.forEach((tile, index) => {
            const titleElement = tile.querySelector('.service-title');
            const descElement = tile.querySelector('.service-description');
            
            if (titleElement && descElement) {
                const titleKey = titleElement.getAttribute('data-i18n');
                const descKey = descElement.getAttribute('data-i18n');
                const titleText = titleElement.textContent.trim();
                const descText = descElement.textContent.trim();
                
                // Check if text looks like a translation key (contains dots and underscores)
                const isTranslationKey = (text) => text.includes('.') && text.includes('_');
                
                if (isTranslationKey(titleText)) {
                    console.log(`  ❌ Service tile ${index + 1}: Title showing translation key "${titleText}"`);
                    this.testResults.failed++;
                    this.testResults.errors.push(`Service tile ${index + 1} title showing translation key: ${titleText}`);
                } else {
                    console.log(`  ✅ Service tile ${index + 1}: Title properly translated "${titleText}"`);
                    this.testResults.passed++;
                }
                
                if (isTranslationKey(descText)) {
                    console.log(`  ❌ Service tile ${index + 1}: Description showing translation key`);
                    this.testResults.failed++;
                    this.testResults.errors.push(`Service tile ${index + 1} description showing translation key`);
                } else {
                    console.log(`  ✅ Service tile ${index + 1}: Description properly translated`);
                    this.testResults.passed++;
                }
            }
        });
        console.log('');
    }

    /**
     * Test 3: Test language switching functionality
     */
    testLanguageSwitching() {
        console.log('🌐 Test 3: Testing language switching...');
        
        // Check if we're in a browser environment
        if (typeof document === 'undefined' || typeof window.i18nManager === 'undefined') {
            console.log('  ⚠️  Browser environment or i18nManager not available - skipping language switching tests');
            return;
        }

        const originalLanguage = window.i18nManager.currentLanguage;
        
        this.supportedLanguages.forEach(lang => {
            console.log(`  Testing switch to ${lang.toUpperCase()}...`);
            
            try {
                // Switch language
                window.i18nManager.switchLanguage(lang);
                
                // Wait a moment for DOM updates
                setTimeout(() => {
                    // Check if language actually switched
                    if (window.i18nManager.currentLanguage === lang) {
                        console.log(`    ✅ Successfully switched to ${lang}`);
                        this.testResults.passed++;
                        
                        // Check if service titles are properly translated
                        const serviceTitles = document.querySelectorAll('.service-title');
                        let allTranslated = true;
                        
                        serviceTitles.forEach(title => {
                            const text = title.textContent.trim();
                            if (text.includes('.') && text.includes('_')) {
                                allTranslated = false;
                            }
                        });
                        
                        if (allTranslated) {
                            console.log(`    ✅ All service titles properly translated in ${lang}`);
                            this.testResults.passed++;
                        } else {
                            console.log(`    ❌ Some service titles showing translation keys in ${lang}`);
                            this.testResults.failed++;
                            this.testResults.errors.push(`Translation keys visible after switching to ${lang}`);
                        }
                    } else {
                        console.log(`    ❌ Failed to switch to ${lang}`);
                        this.testResults.failed++;
                        this.testResults.errors.push(`Failed to switch language to ${lang}`);
                    }
                }, 100);
                
            } catch (error) {
                console.log(`    ❌ Error switching to ${lang}: ${error.message}`);
                this.testResults.failed++;
                this.testResults.errors.push(`Error switching to ${lang}: ${error.message}`);
            }
        });
        
        // Restore original language
        try {
            window.i18nManager.switchLanguage(originalLanguage);
        } catch (error) {
            console.log(`  ⚠️  Could not restore original language ${originalLanguage}`);
        }
        
        console.log('');
    }

    /**
     * Display test results summary
     */
    displayResults() {
        console.log('📊 Translation Validation Test Results:');
        console.log('=====================================');
        console.log(`✅ Passed: ${this.testResults.passed}`);
        console.log(`❌ Failed: ${this.testResults.failed}`);
        console.log(`📈 Total: ${this.testResults.passed + this.testResults.failed}`);
        
        if (this.testResults.errors.length > 0) {
            console.log('\n🚨 Errors Found:');
            this.testResults.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error}`);
            });
        }
        
        if (this.testResults.failed === 0) {
            console.log('\n🎉 All translation tests passed!');
        } else {
            console.log(`\n⚠️  ${this.testResults.failed} test(s) failed. Please review the errors above.`);
        }
    }

    /**
     * Quick validation function for browser console
     */
    static quickValidation() {
        const validator = new TranslationValidator();
        return validator.runAllTests();
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationValidator;
} else if (typeof window !== 'undefined') {
    window.TranslationValidator = TranslationValidator;
}

// Auto-run if loaded in browser with i18n
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🔧 Translation Validator loaded. Run TranslationValidator.quickValidation() to test.');
        });
    } else {
        console.log('🔧 Translation Validator loaded. Run TranslationValidator.quickValidation() to test.');
    }
}