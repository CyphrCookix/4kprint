// Verification script for i18n implementation
// Run this in the browser console to verify the i18n system

function verifyI18nSystem() {
    console.log('🔍 Verifying i18n system...');
    
    // Check if i18n is loaded
    if (!window.i18n) {
        console.error('❌ i18n system not loaded');
        return false;
    }
    
    console.log('✅ i18n system loaded');
    
    // Check supported languages
    const supportedLangs = window.i18n.getSupportedLanguages();
    console.log('📋 Supported languages:', supportedLangs);
    
    if (!supportedLangs.includes('fr') || !supportedLangs.includes('ar') || !supportedLangs.includes('en')) {
        console.error('❌ Missing required languages (fr, ar, en)');
        return false;
    }
    
    console.log('✅ All required languages supported');
    
    // Check current language
    const currentLang = window.i18n.getCurrentLanguage();
    console.log('🌍 Current language:', currentLang);
    
    // Check if language switcher exists
    const switchers = document.querySelectorAll('.language-switcher');
    const oldSelectors = document.querySelectorAll('.language-selector');
    
    console.log('🔄 Language switchers found:', switchers.length);
    console.log('⚠️ Old language selectors found:', oldSelectors.length);
    
    if (switchers.length !== 1) {
        console.error('❌ Expected exactly 1 language switcher, found:', switchers.length);
        return false;
    }
    
    if (oldSelectors.length > 0) {
        console.error('❌ Old language selectors still present:', oldSelectors.length);
        return false;
    }
    
    console.log('✅ Language switcher structure correct');
    
    // Test translations
    const testKeys = ['nav.home', 'hero.title', 'about.title', 'services.title'];
    let translationErrors = 0;
    
    ['fr', 'ar', 'en'].forEach(lang => {
        console.log(`🔤 Testing ${lang} translations:`);
        testKeys.forEach(key => {
            // Temporarily switch language for testing
            const originalLang = window.i18n.currentLanguage;
            window.i18n.currentLanguage = lang;
            
            const translation = window.i18n.t(key);
            if (translation === key) {
                console.error(`❌ Missing translation for ${key} in ${lang}`);
                translationErrors++;
            } else {
                console.log(`  ✅ ${key}: "${translation}"`);
            }
            
            // Restore original language
            window.i18n.currentLanguage = originalLang;
        });
    });
    
    if (translationErrors > 0) {
        console.error(`❌ Found ${translationErrors} translation errors`);
        return false;
    }
    
    console.log('✅ All translations working');
    
    // Test RTL functionality
    const isRTL = window.i18n.isRTLLanguage();
    const htmlDir = document.documentElement.getAttribute('dir');
    console.log('📐 RTL status:', isRTL, 'HTML dir:', htmlDir);
    
    // Test language switching
    console.log('🔄 Testing language switching...');
    const originalLang = window.i18n.getCurrentLanguage();
    
    try {
        window.i18n.switchLanguage('ar');
        if (window.i18n.getCurrentLanguage() !== 'ar') {
            console.error('❌ Failed to switch to Arabic');
            return false;
        }
        console.log('✅ Arabic switch successful');
        
        window.i18n.switchLanguage('en');
        if (window.i18n.getCurrentLanguage() !== 'en') {
            console.error('❌ Failed to switch to English');
            return false;
        }
        console.log('✅ English switch successful');
        
        // Restore original language
        window.i18n.switchLanguage(originalLang);
        console.log('✅ Language restored to:', originalLang);
        
    } catch (error) {
        console.error('❌ Language switching error:', error);
        return false;
    }
    
    console.log('🎉 All i18n system checks passed!');
    return true;
}

// Auto-run verification when script loads
if (typeof window !== 'undefined') {
    // Wait for DOM and i18n to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(verifyI18nSystem, 500);
        });
    } else {
        setTimeout(verifyI18nSystem, 500);
    }
}

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = verifyI18nSystem;
}