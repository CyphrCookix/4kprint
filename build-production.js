#!/usr/bin/env node

/**
 * Production Build Script for 4K Print Website
 * This script optimizes assets for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build...');

// Configuration
const config = {
    sourceDir: '.',
    buildDir: './dist',
    assets: {
        css: ['assets/css/main.css', 'assets/css/responsive.css', 'assets/css/animations.css', 'assets/css/i18n.css'],
        js: ['assets/js/i18n.js', 'assets/js/main.js', 'assets/js/smooth-scroll.js', 'assets/js/responsive-touch.js', 'assets/js/animations.js'],
        images: ['assets/images/**/*'],
        fonts: ['assets/fonts/**/*']
    }
};

// Create build directory
function createBuildDir() {
    if (!fs.existsSync(config.buildDir)) {
        fs.mkdirSync(config.buildDir, { recursive: true });
        console.log('✅ Created build directory');
    }
}

// Copy and optimize HTML
function optimizeHTML() {
    let html = fs.readFileSync('index.html', 'utf8');
    
    // Replace development assets with minified versions
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/main.css">',
        '<link rel="stylesheet" href="assets/css/main.min.css">'
    );
    
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/responsive.css">',
        ''
    );
    
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/animations.css">',
        ''
    );
    
    html = html.replace(
        '<link rel="stylesheet" href="assets/css/i18n.css">',
        ''
    );
    
    html = html.replace(
        '<script src="assets/js/main.js"></script>',
        '<script src="assets/js/main.min.js"></script>'
    );
    
    html = html.replace(
        '<script src="assets/js/smooth-scroll.js"></script>',
        ''
    );
    
    html = html.replace(
        '<script src="assets/js/responsive-touch.js"></script>',
        ''
    );
    
    html = html.replace(
        '<script src="assets/js/animations.js"></script>',
        ''
    );
    
    html = html.replace(
        '<script src="assets/js/i18n.js"></script>',
        ''
    );
    
    html = html.replace(
        '<script src="assets/js/i18n.js"></script>',
        ''
    );
    
    // Add performance optimizations and security headers
    html = html.replace(
        '<head>',
        `<head>
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    
    <!-- Performance Optimizations -->
    <link rel="preload" href="assets/css/main.min.css" as="style">
    <link rel="preload" href="assets/js/main.min.js" as="script">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
    );
    
    // Minify HTML (basic)
    html = html
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
    
    fs.writeFileSync(path.join(config.buildDir, 'index.html'), html);
    console.log('✅ Optimized HTML');
}

// Copy assets
function copyAssets() {
    const assetsDir = path.join(config.buildDir, 'assets');
    
    // Create assets directories
    ['css', 'js', 'images', 'fonts'].forEach(dir => {
        const dirPath = path.join(assetsDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
    
    // Copy minified CSS
    fs.copyFileSync('assets/css/main.min.css', path.join(assetsDir, 'css', 'main.min.css'));
    
    // Copy minified JS
    fs.copyFileSync('assets/js/main.min.js', path.join(assetsDir, 'js', 'main.min.js'));
    
    // Copy images
    if (fs.existsSync('assets/images')) {
        copyDirectory('assets/images', path.join(assetsDir, 'images'));
    }
    
    // Copy fonts
    if (fs.existsSync('assets/fonts')) {
        copyDirectory('assets/fonts', path.join(assetsDir, 'fonts'));
    }
    
    // Copy other files
    ['logo.png', 'logoWhite.png', 'placeholder.webp', 'manifest.json', 'robots.txt', 'sitemap.xml'].forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(config.buildDir, file));
        }
    });
    
    console.log('✅ Copied optimized assets');
}

// Helper function to copy directories recursively
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

// Generate service worker for caching
function generateServiceWorker() {
    const serviceWorker = `
// Service Worker for 4K Print Website
const CACHE_NAME = '4k-print-v1';
const urlsToCache = [
    '/',
    '/assets/css/main.min.css',
    '/assets/js/main.min.js',
    '/logo.png',
    '/logoWhite.png',
    '/placeholder.webp'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
`;
    
    fs.writeFileSync(path.join(config.buildDir, 'sw.js'), serviceWorker.trim());
    console.log('✅ Generated service worker');
}

// Create deployment configuration
function createDeploymentConfig() {
    const netlifyConfig = `
# Netlify configuration for 4K Print Website
[build]
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
    
    fs.writeFileSync(path.join(config.buildDir, 'netlify.toml'), netlifyConfig.trim());
    
    const vercelConfig = {
        "version": 2,
        "builds": [
            {
                "src": "index.html",
                "use": "@vercel/static"
            }
        ],
        "routes": [
            {
                "src": "/(.*)",
                "dest": "/index.html"
            }
        ],
        "headers": [
            {
                "source": "/(.*)",
                "headers": [
                    {
                        "key": "X-Frame-Options",
                        "value": "DENY"
                    },
                    {
                        "key": "X-Content-Type-Options",
                        "value": "nosniff"
                    }
                ]
            }
        ]
    };
    
    fs.writeFileSync(path.join(config.buildDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
    console.log('✅ Created deployment configurations');
}

// Main build function
function build() {
    try {
        createBuildDir();
        optimizeHTML();
        copyAssets();
        generateServiceWorker();
        createDeploymentConfig();
        
        console.log('🎉 Production build completed successfully!');
        console.log(`📁 Build output: ${config.buildDir}`);
        console.log('🚀 Ready for deployment');
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build };