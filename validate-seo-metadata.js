// SEO Metadata Validation Script for 4K Print
// This script validates the manifest.json, structured data, and meta tags

const fs = require('fs');
const path = require('path');

class SEOValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.success = [];
    }

    // Validate manifest.json
    validateManifest() {
        console.log('🔍 Validating manifest.json...');
        
        try {
            const manifestPath = path.join(__dirname, 'manifest.json');
            const manifestContent = fs.readFileSync(manifestPath, 'utf8');
            const manifest = JSON.parse(manifestContent);

            // Required fields validation
            const requiredFields = ['name', 'short_name', 'description', 'start_url', 'display', 'icons'];
            
            requiredFields.forEach(field => {
                if (manifest[field]) {
                    this.success.push(`✅ Manifest has required field: ${field}`);
                } else {
                    this.errors.push(`❌ Manifest missing required field: ${field}`);
                }
            });

            // Business-specific validation
            if (manifest.name.includes('4K Print')) {
                this.success.push('✅ Manifest name includes correct business name');
            } else {
                this.errors.push('❌ Manifest name does not include "4K Print"');
            }

            if (manifest.description.includes('advertising panels') && manifest.description.includes('digital printing')) {
                this.success.push('✅ Manifest description includes key services');
            } else {
                this.warnings.push('⚠️ Manifest description should mention key services');
            }

            // Icons validation
            if (manifest.icons && manifest.icons.length > 0) {
                this.success.push(`✅ Manifest has ${manifest.icons.length} icon(s) defined`);
            } else {
                this.errors.push('❌ Manifest has no icons defined');
            }

        } catch (error) {
            this.errors.push(`❌ Error reading manifest.json: ${error.message}`);
        }
    }

    // Validate HTML meta tags
    validateHTMLMetaTags() {
        console.log('🔍 Validating HTML meta tags...');
        
        try {
            const htmlPath = path.join(__dirname, 'index.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');

            // Check for essential meta tags
            const metaTagChecks = [
                { pattern: /<meta name="description"[^>]*content="[^"]*4K Print[^"]*"/i, name: 'Description with business name' },
                { pattern: /<meta name="keywords"[^>]*content="[^"]*advertising panels[^"]*"/i, name: 'Keywords with main service' },
                { pattern: /<meta property="og:title"[^>]*content="[^"]*4K Print[^"]*"/i, name: 'Open Graph title' },
                { pattern: /<meta property="og:description"[^>]*content="[^"]*"/i, name: 'Open Graph description' },
                { pattern: /<meta property="og:image"[^>]*content="[^"]*"/i, name: 'Open Graph image' },
                { pattern: /<meta property="og:url"[^>]*content="[^"]*"/i, name: 'Open Graph URL' },
                { pattern: /<meta name="twitter:card"[^>]*content="[^"]*"/i, name: 'Twitter Card type' },
                { pattern: /<meta name="twitter:title"[^>]*content="[^"]*4K Print[^"]*"/i, name: 'Twitter title' },
                { pattern: /<meta name="robots"[^>]*content="[^"]*"/i, name: 'Robots meta tag' }
            ];

            metaTagChecks.forEach(check => {
                if (check.pattern.test(htmlContent)) {
                    this.success.push(`✅ Found ${check.name}`);
                } else {
                    this.errors.push(`❌ Missing or incorrect ${check.name}`);
                }
            });

            // Check for business-specific content
            if (htmlContent.includes('Errahma - Casablanca')) {
                this.success.push('✅ HTML contains correct business location');
            } else {
                this.errors.push('❌ HTML missing correct business location');
            }

            if (htmlContent.includes('+212622646474')) {
                this.success.push('✅ HTML contains correct phone number');
            } else {
                this.errors.push('❌ HTML missing correct phone number');
            }

        } catch (error) {
            this.errors.push(`❌ Error reading index.html: ${error.message}`);
        }
    }

    // Validate structured data
    validateStructuredData() {
        console.log('🔍 Validating structured data...');
        
        try {
            const htmlPath = path.join(__dirname, 'index.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');

            // Extract JSON-LD structured data
            const jsonLdMatch = htmlContent.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
            
            if (jsonLdMatch) {
                const structuredData = JSON.parse(jsonLdMatch[1].trim());
                
                // Validate required schema.org fields for LocalBusiness
                const requiredFields = ['@context', '@type', 'name', 'description', 'address', 'telephone'];
                
                requiredFields.forEach(field => {
                    if (structuredData[field]) {
                        this.success.push(`✅ Structured data has required field: ${field}`);
                    } else {
                        this.errors.push(`❌ Structured data missing required field: ${field}`);
                    }
                });

                // Validate business-specific data
                if (structuredData.name === '4K Print') {
                    this.success.push('✅ Structured data has correct business name');
                } else {
                    this.errors.push('❌ Structured data has incorrect business name');
                }

                if (structuredData.telephone === '+212622646474') {
                    this.success.push('✅ Structured data has correct phone number');
                } else {
                    this.errors.push('❌ Structured data has incorrect phone number');
                }

                if (structuredData.address && structuredData.address.addressLocality === 'Casablanca') {
                    this.success.push('✅ Structured data has correct city');
                } else {
                    this.errors.push('❌ Structured data missing or incorrect city');
                }

                if (structuredData.serviceType && structuredData.serviceType.length > 0) {
                    this.success.push(`✅ Structured data lists ${structuredData.serviceType.length} services`);
                } else {
                    this.warnings.push('⚠️ Structured data should list business services');
                }

            } else {
                this.errors.push('❌ No structured data found in HTML');
            }

        } catch (error) {
            this.errors.push(`❌ Error validating structured data: ${error.message}`);
        }
    }

    // Run all validations
    runValidation() {
        console.log('🚀 Starting SEO Metadata Validation for 4K Print\n');
        
        this.validateManifest();
        this.validateHTMLMetaTags();
        this.validateStructuredData();
        
        this.printResults();
    }

    // Print validation results
    printResults() {
        console.log('\n📊 VALIDATION RESULTS\n');
        console.log('='.repeat(50));
        
        if (this.success.length > 0) {
            console.log('\n✅ SUCCESS:');
            this.success.forEach(msg => console.log(`  ${msg}`));
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.warnings.forEach(msg => console.log(`  ${msg}`));
        }
        
        if (this.errors.length > 0) {
            console.log('\n❌ ERRORS:');
            this.errors.forEach(msg => console.log(`  ${msg}`));
        }
        
        console.log('\n' + '='.repeat(50));
        console.log(`📈 SUMMARY: ${this.success.length} passed, ${this.warnings.length} warnings, ${this.errors.length} errors`);
        
        if (this.errors.length === 0) {
            console.log('🎉 All critical validations passed!');
        } else {
            console.log('🔧 Please fix the errors above before deployment.');
        }
    }
}

// Run the validation
const validator = new SEOValidator();
validator.runValidation();