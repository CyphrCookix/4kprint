/**
 * Console Error Verification Test
 * Tests the website in browser and checks console for translation-related warnings or errors
 * Ensures the error handling system works correctly when keys are missing
 */

class ConsoleErrorTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            errors: []
        };
        this.originalConsole = {};
        this.capturedLogs = {
            errors: [],
            warnings: [],
            logs: []
        };
    }

    /**
     * Run all console error tests
     */
    async runAllTests() {
        console.log('🔍 Starting Console Error Verification Tests...\n');
        
        // Check if we're in a browser environment
        if (typeof document === 'undefined' || typeof window === 'undefined') {
            console.log('❌ Browser environment not available');
            this.testResults.failed++;
            this.testResults.errors.push('Browser environment not available');
            this.displayResults();
            return this.testResults;
        }

        // Set up console monitoring
        this.setupConsoleMonitoring();

        // Test 1: Check for existing translation errors
        await this.testExistingTranslationErrors();

        // Test 2: Test error handling system
        await this.testErrorHandlingSystem();

        // Test 3: Test language switching for console errors
        await this.testLanguageSwitchingErrors();

        // Restore original console
        this.restoreConsole();

        this.displayResults();
        return this.testResults;
    }

    /**
     * Set up console monitoring to capture errors and warnings
     */
    setupConsoleMonitoring() {
        console.log('📡 Setting up console monitoring...');

        // Store original console methods
        this.originalConsole.error = console.error;
        this.originalConsole.warn = console.warn;
        this.originalConsole.log = console.log;

        // Override console methods to capture messages
        console.error = (...args) => {
            this.capturedLogs.errors.push(args.join(' '));
            this.originalConsole.error.apply(console, args);
        };

        console.warn = (...args) => {
            this.capturedLogs.warnings.push(args.join(' '));
            this.originalConsole.warn.apply(console, args);
        };

        console.log = (...args) => {
            this.capturedLogs.logs.push(args.join(' '));
            this.originalConsole.log.apply(console, args);
        };

        console.log('  ✅ Console monitoring active');
    }

    /**
     * Test for existing translation errors in the console
     */
    async testExistingTranslationErrors() {
        console.log('🔍 Test 1: Checking for existing translation errors...');

        // Clear captured logs
        this.capturedLogs = { errors: [], warnings: [], logs: [] };

        // Trigger a page refresh or re-initialization to capture any startup errors
        if (typeof window.i18nManager !== 'undefined') {
            try {
                // Re-apply translations to trigger any missing key warnings
                window.i18nManager.applyTranslations();
                
                // Wait a moment for any async operations
                await this.wait(500);
                
            } catch (error) {
                console.log(`  ❌ Error during translation re-application: ${error.message}`);
                this.testResults.failed++;
                this.testResults.errors.push(`Translation re-application error: ${error.message}`);
            }
        }

        // Check for translation-related errors
        const translationErrors = this.capturedLogs.errors.filter(error => 
            error.includes('translation') || 
            error.includes('i18n') || 
            error.includes('services.') ||
            error.includes('Missing key')
        );

        const translationWarnings = this.capturedLogs.warnings.filter(warning => 
            warning.includes('translation') || 
            warning.includes('i18n') || 
            warning.includes('services.') ||
            warning.includes('Missing key')
        );

        if (translationErrors.length === 0) {
            console.log('  ✅ No translation errors found in console');
            this.testResults.passed++;
        } else {
            console.log(`  ❌ Found ${translationErrors.length} translation errors:`);
            translationErrors.forEach(error => console.log(`    - ${error}`));
            this.testResults.failed++;
            this.testResults.errors.push(`${translationErrors.length} translation errors in console`);
        }

        if (translationWarnings.length === 0) {
            console.log('  ✅ No translation warnings found in console');
            this.testResults.passed++;
        } else {
            console.log(`  ⚠️  Found ${translationWarnings.length} translation warnings:`);
            translationWarnings.forEach(warning => console.log(`    - ${warning}`));
            // Warnings might be expected for missing keys, so we don't fail the test
            console.log('  ℹ️  Warnings may be expected for missing translation keys');
        }

        console.log('');
    }

    /**
     * Test the error handling system by intentionally triggering missing keys
     */
    async testErrorHandlingSystem() {
        console.log('🧪 Test 2: Testing error handling system...');

        if (typeof window.i18nManager === 'undefined') {
            console.log('  ⚠️  i18nManager not available - skipping error handling test');
            return;
        }

        // Clear captured logs
        this.capturedLogs = { errors: [], warnings: [], logs: [] };

        try {
            // Test with a non-existent translation key
            const testKey = 'services.nonexistent_service.title';
            
            // Create a temporary element to test translation
            const testElement = document.createElement('div');
            testElement.setAttribute('data-i18n', testKey);
            testElement.textContent = testKey; // Set initial content as the key
            document.body.appendChild(testElement);

            // Try to translate the element
            if (typeof window.i18nManager.translate === 'function') {
                const result = window.i18nManager.translate(testKey);
                
                // Check if the system handled the missing key gracefully
                if (result === testKey) {
                    console.log('  ⚠️  Missing key returned as-is (no fallback mechanism)');
                } else if (result && result !== testKey) {
                    console.log(`  ✅ Missing key handled with fallback: "${result}"`);
                    this.testResults.passed++;
                } else {
                    console.log('  ❌ Missing key handling failed');
                    this.testResults.failed++;
                    this.testResults.errors.push('Missing key handling failed');
                }
            }

            // Apply translations to the test element
            window.i18nManager.applyTranslations();
            
            // Wait for any async operations
            await this.wait(200);

            // Check if warnings were logged for the missing key
            const missingKeyWarnings = this.capturedLogs.warnings.filter(warning => 
                warning.includes(testKey) || warning.includes('Missing') || warning.includes('not found')
            );

            if (missingKeyWarnings.length > 0) {
                console.log('  ✅ Warning logged for missing translation key');
                this.testResults.passed++;
            } else {
                console.log('  ❌ No warning logged for missing translation key');
                this.testResults.failed++;
                this.testResults.errors.push('Missing key warning not logged');
            }

            // Check the final content of the test element
            const finalContent = testElement.textContent.trim();
            if (finalContent === testKey) {
                console.log('  ⚠️  Element still shows translation key (no fallback display)');
            } else {
                console.log(`  ✅ Element shows fallback content: "${finalContent}"`);
                this.testResults.passed++;
            }

            // Clean up
            document.body.removeChild(testElement);

        } catch (error) {
            console.log(`  ❌ Error testing error handling system: ${error.message}`);
            this.testResults.failed++;
            this.testResults.errors.push(`Error handling system test failed: ${error.message}`);
        }

        console.log('');
    }

    /**
     * Test for console errors during language switching
     */
    async testLanguageSwitchingErrors() {
        console.log('🌐 Test 3: Testing console errors during language switching...');

        if (typeof window.i18nManager === 'undefined') {
            console.log('  ⚠️  i18nManager not available - skipping language switching error test');
            return;
        }

        const originalLanguage = window.i18nManager.currentLanguage;
        const testLanguages = ['fr', 'ar', 'en'];

        for (const lang of testLanguages) {
            console.log(`  Testing language switch to ${lang}...`);
            
            // Clear captured logs
            this.capturedLogs = { errors: [], warnings: [], logs: [] };

            try {
                // Switch language
                window.i18nManager.switchLanguage(lang);
                
                // Wait for language switch to complete
                await this.wait(1000);

                // Check for errors during language switch
                const switchErrors = this.capturedLogs.errors.filter(error => 
                    !error.includes('favicon') && // Ignore favicon errors
                    !error.includes('net::ERR') // Ignore network errors
                );

                if (switchErrors.length === 0) {
                    console.log(`    ✅ No errors during switch to ${lang}`);
                    this.testResults.passed++;
                } else {
                    console.log(`    ❌ ${switchErrors.length} errors during switch to ${lang}:`);
                    switchErrors.forEach(error => console.log(`      - ${error}`));
                    this.testResults.failed++;
                    this.testResults.errors.push(`${switchErrors.length} errors during switch to ${lang}`);
                }

            } catch (error) {
                console.log(`    ❌ Exception during switch to ${lang}: ${error.message}`);
                this.testResults.failed++;
                this.testResults.errors.push(`Exception during switch to ${lang}: ${error.message}`);
            }
        }

        // Restore original language
        try {
            window.i18nManager.switchLanguage(originalLanguage);
            await this.wait(500);
        } catch (error) {
            console.log(`  ⚠️  Could not restore original language: ${error.message}`);
        }

        console.log('');
    }

    /**
     * Restore original console methods
     */
    restoreConsole() {
        console.log('🔧 Restoring original console methods...');
        
        console.error = this.originalConsole.error;
        console.warn = this.originalConsole.warn;
        console.log = this.originalConsole.log;
        
        console.log('  ✅ Console methods restored');
    }

    /**
     * Wait for a specified amount of time
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Display test results
     */
    displayResults() {
        console.log('📊 Console Error Verification Results:');
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
            console.log('\n🎉 All console error tests passed!');
        } else {
            console.log(`\n⚠️  ${this.testResults.failed} test(s) failed. Please review the errors above.`);
        }

        // Summary of captured logs
        console.log('\n📋 Console Activity Summary:');
        console.log(`  Errors captured: ${this.capturedLogs.errors.length}`);
        console.log(`  Warnings captured: ${this.capturedLogs.warnings.length}`);
        console.log(`  Logs captured: ${this.capturedLogs.logs.length}`);
    }

    /**
     * Quick test function for browser console
     */
    static async quickTest() {
        const tester = new ConsoleErrorTester();
        return await tester.runAllTests();
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConsoleErrorTester;
} else if (typeof window !== 'undefined') {
    window.ConsoleErrorTester = ConsoleErrorTester;
}

// Auto-setup if loaded in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🔧 Console Error Tester loaded. Run ConsoleErrorTester.quickTest() to test.');
        });
    } else {
        console.log('🔧 Console Error Tester loaded. Run ConsoleErrorTester.quickTest() to test.');
    }
}