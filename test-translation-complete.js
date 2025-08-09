/**
 * Complete Translation Testing Suite
 * Runs all translation tests: validation, language switching, and console errors
 * This is the main test file that combines all individual test modules
 */

class CompleteTranslationTester {
    constructor() {
        this.testResults = {
            validation: null,
            languageSwitching: null,
            consoleErrors: null,
            summary: {
                totalPassed: 0,
                totalFailed: 0,
                totalTests: 0
            }
        };
    }

    /**
     * Run all translation tests
     */
    async runAllTests() {
        console.log('🚀 Starting Complete Translation Test Suite...');
        console.log('==============================================\n');

        // Check if we're in a browser environment
        if (typeof document === 'undefined' || typeof window === 'undefined') {
            console.log('❌ Browser environment not available. Please run this in a browser.');
            return this.testResults;
        }

        try {
            // Test 1: Translation Validation
            console.log('🧪 PHASE 1: Translation Validation');
            console.log('----------------------------------');
            if (typeof TranslationValidator !== 'undefined') {
                const validator = new TranslationValidator();
                this.testResults.validation = validator.runAllTests();
            } else {
                console.log('❌ TranslationValidator not available. Please load test-translation-validation.js first.');
                this.testResults.validation = { passed: 0, failed: 1, errors: ['TranslationValidator not loaded'] };
            }
            console.log('\n');

            // Test 2: Language Switching
            console.log('🌐 PHASE 2: Language Switching');
            console.log('------------------------------');
            if (typeof LanguageSwitchingTester !== 'undefined') {
                const languageTester = new LanguageSwitchingTester();
                this.testResults.languageSwitching = await languageTester.runAllTests();
            } else {
                console.log('❌ LanguageSwitchingTester not available. Please load test-language-switching.js first.');
                this.testResults.languageSwitching = { passed: 0, failed: 1, errors: ['LanguageSwitchingTester not loaded'] };
            }
            console.log('\n');

            // Test 3: Console Errors
            console.log('🔍 PHASE 3: Console Error Verification');
            console.log('--------------------------------------');
            if (typeof ConsoleErrorTester !== 'undefined') {
                const consoleTester = new ConsoleErrorTester();
                this.testResults.consoleErrors = await consoleTester.runAllTests();
            } else {
                console.log('❌ ConsoleErrorTester not available. Please load test-console-errors.js first.');
                this.testResults.consoleErrors = { passed: 0, failed: 1, errors: ['ConsoleErrorTester not loaded'] };
            }
            console.log('\n');

            // Calculate summary
            this.calculateSummary();

            // Display final results
            this.displayFinalResults();

        } catch (error) {
            console.log(`❌ Error running complete test suite: ${error.message}`);
            console.log(error.stack);
        }

        return this.testResults;
    }

    /**
     * Calculate summary statistics
     */
    calculateSummary() {
        const results = [
            this.testResults.validation,
            this.testResults.languageSwitching,
            this.testResults.consoleErrors
        ].filter(result => result !== null);

        this.testResults.summary = {
            totalPassed: results.reduce((sum, result) => sum + (result.passed || 0), 0),
            totalFailed: results.reduce((sum, result) => sum + (result.failed || 0), 0),
            totalTests: results.reduce((sum, result) => sum + (result.passed || 0) + (result.failed || 0), 0)
        };
    }

    /**
     * Display final test results
     */
    displayFinalResults() {
        console.log('🏁 FINAL TEST RESULTS');
        console.log('=====================');
        
        const { totalPassed, totalFailed, totalTests } = this.testResults.summary;
        const successRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : 0;

        console.log(`📊 Overall Statistics:`);
        console.log(`   ✅ Total Passed: ${totalPassed}`);
        console.log(`   ❌ Total Failed: ${totalFailed}`);
        console.log(`   📈 Total Tests: ${totalTests}`);
        console.log(`   📊 Success Rate: ${successRate}%`);
        console.log('');

        // Phase-by-phase breakdown
        console.log('📋 Phase Breakdown:');
        
        if (this.testResults.validation) {
            const v = this.testResults.validation;
            console.log(`   🧪 Translation Validation: ${v.passed}✅ ${v.failed}❌`);
        }
        
        if (this.testResults.languageSwitching) {
            const l = this.testResults.languageSwitching;
            console.log(`   🌐 Language Switching: ${l.passed}✅ ${l.failed}❌`);
        }
        
        if (this.testResults.consoleErrors) {
            const c = this.testResults.consoleErrors;
            console.log(`   🔍 Console Errors: ${c.passed}✅ ${c.failed}❌`);
        }

        console.log('');

        // Overall status
        if (totalFailed === 0) {
            console.log('🎉 ALL TESTS PASSED! 🎉');
            console.log('The translation system is working correctly.');
        } else {
            console.log('⚠️  SOME TESTS FAILED');
            console.log(`${totalFailed} test(s) need attention. Review the detailed results above.`);
        }

        // Recommendations
        console.log('\n💡 Recommendations:');
        if (totalFailed === 0) {
            console.log('   ✅ Translation system is ready for production');
            console.log('   ✅ All service titles display correctly in all languages');
            console.log('   ✅ Language switching works properly');
            console.log('   ✅ No console errors detected');
        } else {
            console.log('   🔧 Review failed tests and fix translation issues');
            console.log('   🔧 Ensure all translation keys exist in i18n.js');
            console.log('   🔧 Test language switching manually if automated tests failed');
            console.log('   🔧 Check browser console for any remaining errors');
        }
    }

    /**
     * Quick test function for browser console
     */
    static async quickTest() {
        const tester = new CompleteTranslationTester();
        return await tester.runAllTests();
    }

    /**
     * Load all required test modules dynamically
     */
    static async loadTestModules() {
        console.log('📦 Loading test modules...');
        
        const modules = [
            'test-translation-validation.js',
            'test-language-switching.js',
            'test-console-errors.js'
        ];

        for (const module of modules) {
            try {
                const script = document.createElement('script');
                script.src = module;
                document.head.appendChild(script);
                
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                });
                
                console.log(`  ✅ Loaded ${module}`);
            } catch (error) {
                console.log(`  ❌ Failed to load ${module}: ${error.message}`);
            }
        }
        
        console.log('📦 Module loading complete\n');
    }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompleteTranslationTester;
} else if (typeof window !== 'undefined') {
    window.CompleteTranslationTester = CompleteTranslationTester;
}

// Auto-setup if loaded in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🔧 Complete Translation Tester loaded.');
            console.log('📖 Usage:');
            console.log('   CompleteTranslationTester.quickTest() - Run all tests');
            console.log('   CompleteTranslationTester.loadTestModules() - Load individual test modules');
        });
    } else {
        console.log('🔧 Complete Translation Tester loaded.');
        console.log('📖 Usage:');
        console.log('   CompleteTranslationTester.quickTest() - Run all tests');
        console.log('   CompleteTranslationTester.loadTestModules() - Load individual test modules');
    }
}