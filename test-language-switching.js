/**
 * Language Switching Functionality Test
 * Tests language switching between French, Arabic, and English
 * Verifies service titles update correctly and RTL formatting works
 */

class LanguageSwitchingTester {
    constructor() {
        this.supportedLanguages = ['fr', 'ar', 'en'];
        this.testResults = {
            passed: 0,
            failed: 0,
            errors: []
        };
        this.originalLanguage = null;
    }

    /**
     * Run all language switching tests
     */
    async runAllTests() {
        console.log('🌐 Starting Language Switching Tests...\n');
        
        // Check if we're in a browser environment
        if (typeof document === 'undefined' || typeof window.i18nManager === 'undefined') {
            console.log('❌ Browser environment or i18nManager not available');
            this.testResults.failed++;
            this.testResults.errors.push('Browser environment or i18nManager not available');
            this.displayResults();
            return this.testResults;
        }

        // Store original language
        this.originalLanguage = window.i18nManager.currentLanguage;
        console.log(`📝 Original language: ${this.originalLanguage}`);

        // Test each language
        for (const lang of this.supportedLanguages) {
            await this.testLanguageSwitch(lang);
        }

        // Test RTL formatting specifically for Arabic
        await this.testRTLFormatting();

        // Restore original language
        await this.restoreOriginalLanguage();

        this.displayResults();
        return this.testResults;
    }

    /**
     * Test switching to a specific language
     */
    async testLanguageSwitch(targetLang) {
        console.log(`🔄 Testing switch to ${targetLang.toUpperCase()}...`);

        try {
            // Switch language
            window.i18nManager.switchLanguage(targetLang);

            // Wait for language switch animation to complete
            await this.waitForLanguageSwitch();

            // Verify language was switched
            if (window.i18nManager.currentLanguage === targetLang) {
                console.log(`  ✅ Successfully switched to ${targetLang}`);
                this.testResults.passed++;
            } else {
                console.log(`  ❌ Failed to switch to ${targetLang} (current: ${window.i18nManager.currentLanguage})`);
                this.testResults.failed++;
                this.testResults.errors.push(`Failed to switch to ${targetLang}`);
                return;
            }

            // Test service title translations
            await this.testServiceTitleTranslations(targetLang);

            // Test that no translation keys are visible
            this.testNoTranslationKeysVisible(targetLang);

            // Test language persistence
            this.testLanguagePersistence(targetLang);

        } catch (error) {
            console.log(`  ❌ Error testing ${targetLang}: ${error.message}`);
            this.testResults.failed++;
            this.testResults.errors.push(`Error testing ${targetLang}: ${error.message}`);
        }

        console.log('');
    }

    /**
     * Test service title translations for a specific language
     */
    async testServiceTitleTranslations(lang) {
        console.log(`  📋 Checking service title translations in ${lang}...`);

        const serviceTitles = document.querySelectorAll('.service-title[data-i18n]');
        let translatedCount = 0;
        let keyCount = 0;

        serviceTitles.forEach((titleElement, index) => {
            const text = titleElement.textContent.trim();
            const i18nKey = titleElement.getAttribute('data-i18n');

            // Check if text looks like a translation key
            if (this.isTranslationKey(text)) {
                console.log(`    ❌ Service ${index + 1}: Showing translation key "${text}"`);
                keyCount++;
            } else {
                console.log(`    ✅ Service ${index + 1}: Properly translated "${text}"`);
                translatedCount++;
            }
        });

        if (keyCount === 0) {
            console.log(`  ✅ All ${translatedCount} service titles properly translated in ${lang}`);
            this.testResults.passed++;
        } else {
            console.log(`  ❌ ${keyCount} service titles showing translation keys in ${lang}`);
            this.testResults.failed++;
            this.testResults.errors.push(`${keyCount} service titles showing translation keys in ${lang}`);
        }
    }

    /**
     * Test that no translation keys are visible after language switch
     */
    testNoTranslationKeysVisible(lang) {
        console.log(`  🔍 Checking for visible translation keys in ${lang}...`);

        const allI18nElements = document.querySelectorAll('[data-i18n]');
        let visibleKeysCount = 0;
        const visibleKeys = [];

        allI18nElements.forEach(element => {
            const text = element.textContent.trim();
            if (this.isTranslationKey(text)) {
                visibleKeysCount++;
                visibleKeys.push(text);
            }
        });

        if (visibleKeysCount === 0) {
            console.log(`  ✅ No translation keys visible in ${lang}`);
            this.testResults.passed++;
        } else {
            console.log(`  ❌ ${visibleKeysCount} translation keys still visible in ${lang}`);
            console.log(`    Keys: ${visibleKeys.slice(0, 5).join(', ')}${visibleKeys.length > 5 ? '...' : ''}`);
            this.testResults.failed++;
            this.testResults.errors.push(`${visibleKeysCount} translation keys visible in ${lang}`);
        }
    }

    /**
     * Test language persistence in localStorage
     */
    testLanguagePersistence(lang) {
        console.log(`  💾 Checking language persistence for ${lang}...`);

        const storedLang = localStorage.getItem('4kprint-language');
        if (storedLang === lang) {
            console.log(`  ✅ Language ${lang} properly stored in localStorage`);
            this.testResults.passed++;
        } else {
            console.log(`  ❌ Language not properly stored (expected: ${lang}, stored: ${storedLang})`);
            this.testResults.failed++;
            this.testResults.errors.push(`Language persistence failed for ${lang}`);
        }
    }

    /**
     * Test RTL formatting for Arabic
     */
    async testRTLFormatting() {
        console.log('🔄 Testing RTL formatting for Arabic...');

        try {
            // Switch to Arabic
            window.i18nManager.switchLanguage('ar');
            await this.waitForLanguageSwitch();

            // Check if HTML dir attribute is set to rtl
            const htmlDir = document.documentElement.getAttribute('dir');
            if (htmlDir === 'rtl') {
                console.log('  ✅ HTML dir attribute set to RTL for Arabic');
                this.testResults.passed++;
            } else {
                console.log(`  ❌ HTML dir attribute not set to RTL (current: ${htmlDir})`);
                this.testResults.failed++;
                this.testResults.errors.push('RTL formatting not applied for Arabic');
            }

            // Check if body has RTL class
            const hasRTLClass = document.body.classList.contains('rtl') || 
                               document.body.classList.contains('lang-ar') ||
                               document.documentElement.classList.contains('rtl');
            
            if (hasRTLClass) {
                console.log('  ✅ RTL styling class applied');
                this.testResults.passed++;
            } else {
                console.log('  ⚠️  No RTL styling class found (may be handled by CSS)');
                // This is not necessarily a failure, just a note
            }

            // Test Arabic text rendering
            const arabicElements = document.querySelectorAll('[data-i18n]');
            let arabicTextFound = false;
            
            arabicElements.forEach(element => {
                const text = element.textContent.trim();
                // Check for Arabic characters (Unicode range)
                if (/[\u0600-\u06FF]/.test(text)) {
                    arabicTextFound = true;
                }
            });

            if (arabicTextFound) {
                console.log('  ✅ Arabic text properly rendered');
                this.testResults.passed++;
            } else {
                console.log('  ❌ No Arabic text found after switching to Arabic');
                this.testResults.failed++;
                this.testResults.errors.push('Arabic text not rendered');
            }

        } catch (error) {
            console.log(`  ❌ Error testing RTL formatting: ${error.message}`);
            this.testResults.failed++;
            this.testResults.errors.push(`RTL formatting test error: ${error.message}`);
        }

        console.log('');
    }

    /**
     * Restore original language
     */
    async restoreOriginalLanguage() {
        if (this.originalLanguage) {
            console.log(`🔄 Restoring original language: ${this.originalLanguage}`);
            try {
                window.i18nManager.switchLanguage(this.originalLanguage);
                await this.waitForLanguageSwitch();
                console.log('  ✅ Original language restored');
            } catch (error) {
                console.log(`  ⚠️  Could not restore original language: ${error.message}`);
            }
        }
    }

    /**
     * Wait for language switch animation to complete
     */
    waitForLanguageSwitch() {
        return new Promise((resolve) => {
            // Wait for the language switching animation to complete
            const checkSwitching = () => {
                if (!window.i18nManager.isSwitching && !document.body.classList.contains('language-switching')) {
                    resolve();
                } else {
                    setTimeout(checkSwitching, 100);
                }
            };
            
            // Start checking after a short delay
            setTimeout(checkSwitching, 200);
        });
    }

    /**
     * Check if text looks like a translation key
     */
    isTranslationKey(text) {
        return text.includes('.') && (text.includes('_') || text.startsWith('services.'));
    }

    /**
     * Display test results
     */
    displayResults() {
        console.log('📊 Language Switching Test Results:');
        console.log('===================================');
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
            console.log('\n🎉 All language switching tests passed!');
        } else {
            console.log(`\n⚠️  ${this.testResults.failed} test(s) failed. Please review the errors above.`);
        }
    }

    /**
     * Quick test function for browser console
     */
    static async quickTest() {
        const tester = new LanguageSwitchingTester();
        return await tester.runAllTests();
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitchingTester;
} else if (typeof window !== 'undefined') {
    window.LanguageSwitchingTester = LanguageSwitchingTester;
}

// Auto-setup if loaded in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🔧 Language Switching Tester loaded. Run LanguageSwitchingTester.quickTest() to test.');
        });
    } else {
        console.log('🔧 Language Switching Tester loaded. Run LanguageSwitchingTester.quickTest() to test.');
    }
}