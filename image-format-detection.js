/**
 * Advanced Image Format Detection and Support System
 * Provides comprehensive browser capability detection for modern image formats
 * with proper fallback hierarchy: AVIF → WebP → JPEG/PNG
 */

class ImageFormatDetector {
    constructor() {
        this.supportCache = new Map();
        this.detectionPromises = new Map();
        this.initializeDetection();
    }

    /**
     * Initialize format detection for all supported formats
     */
    async initializeDetection() {
        // Run all format detections in parallel
        const detectionPromises = [
            this.detectAVIFSupport(),
            this.detectWebPSupport(),
            this.detectJPEGSupport(),
            this.detectPNGSupport()
        ];

        await Promise.all(detectionPromises);
        
        // Dispatch custom event when detection is complete
        document.dispatchEvent(new CustomEvent('imageFormatsDetected', {
            detail: {
                avif: this.supportCache.get('avif'),
                webp: this.supportCache.get('webp'),
                jpeg: this.supportCache.get('jpeg'),
                png: this.supportCache.get('png')
            }
        }));
    }

    /**
     * Detect AVIF support using multiple methods for reliability
     * @returns {Promise<boolean>}
     */
    async detectAVIFSupport() {
        if (this.supportCache.has('avif')) {
            return this.supportCache.get('avif');
        }

        if (this.detectionPromises.has('avif')) {
            return this.detectionPromises.get('avif');
        }

        const detectionPromise = this._detectFormatSupport('avif', [
            // Method 1: Canvas toDataURL
            () => this._canvasDetection('image/avif'),
            // Method 2: Image loading test
            () => this._imageLoadTest('data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='),
            // Method 3: Feature detection via HTMLImageElement
            () => this._featureDetection('avif')
        ]);

        this.detectionPromises.set('avif', detectionPromise);
        const isSupported = await detectionPromise;
        this.supportCache.set('avif', isSupported);
        
        return isSupported;
    }

    /**
     * Detect WebP support using multiple methods for reliability
     * @returns {Promise<boolean>}
     */
    async detectWebPSupport() {
        if (this.supportCache.has('webp')) {
            return this.supportCache.get('webp');
        }

        if (this.detectionPromises.has('webp')) {
            return this.detectionPromises.get('webp');
        }

        const detectionPromise = this._detectFormatSupport('webp', [
            // Method 1: Canvas toDataURL (most reliable)
            () => this._canvasDetection('image/webp'),
            // Method 2: Image loading test
            () => this._imageLoadTest('data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'),
            // Method 3: Feature detection
            () => this._featureDetection('webp')
        ]);

        this.detectionPromises.set('webp', detectionPromise);
        const isSupported = await detectionPromise;
        this.supportCache.set('webp', isSupported);
        
        return isSupported;
    }

    /**
     * Detect JPEG support (should always be true, but included for completeness)
     * @returns {Promise<boolean>}
     */
    async detectJPEGSupport() {
        if (this.supportCache.has('jpeg')) {
            return this.supportCache.get('jpeg');
        }

        // JPEG is universally supported, but we'll do a quick check
        const isSupported = await this._canvasDetection('image/jpeg');
        this.supportCache.set('jpeg', isSupported);
        
        return isSupported;
    }

    /**
     * Detect PNG support (should always be true, but included for completeness)
     * @returns {Promise<boolean>}
     */
    async detectPNGSupport() {
        if (this.supportCache.has('png')) {
            return this.supportCache.get('png');
        }

        // PNG is universally supported, but we'll do a quick check
        const isSupported = await this._canvasDetection('image/png');
        this.supportCache.set('png', isSupported);
        
        return isSupported;
    }

    /**
     * Generic format support detection using multiple methods
     * @param {string} format - Format name
     * @param {Function[]} detectionMethods - Array of detection methods
     * @returns {Promise<boolean>}
     */
    async _detectFormatSupport(format, detectionMethods) {
        // Try each detection method and return true if any succeeds
        for (const method of detectionMethods) {
            try {
                const result = await method();
                if (result) {
                    return true;
                }
            } catch (error) {
                console.warn(`Format detection method failed for ${format}:`, error);
                continue;
            }
        }
        
        return false;
    }

    /**
     * Canvas-based format detection
     * @param {string} mimeType - MIME type to test
     * @returns {boolean}
     */
    _canvasDetection(mimeType) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const dataURL = canvas.toDataURL(mimeType);
            return dataURL.indexOf(`data:${mimeType}`) === 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Image loading test for format detection
     * @param {string} testImageData - Base64 test image data
     * @returns {Promise<boolean>}
     */
    _imageLoadTest(testImageData) {
        return new Promise((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => {
                resolve(false);
            }, 2000); // 2 second timeout

            img.onload = () => {
                clearTimeout(timeout);
                resolve(img.width > 0 && img.height > 0);
            };

            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };

            img.src = testImageData;
        });
    }

    /**
     * Feature detection using HTMLImageElement
     * @param {string} format - Format to detect
     * @returns {boolean}
     */
    _featureDetection(format) {
        try {
            // Check if the browser supports the format in HTMLImageElement
            const img = document.createElement('img');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Some browsers expose format support through canvas
            if (ctx && typeof ctx.drawImage === 'function') {
                return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
            }
            
            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the best supported format from a list of options
     * @param {string[]} formats - Array of format names in preference order
     * @returns {string|null} - Best supported format or null
     */
    getBestSupportedFormat(formats = ['avif', 'webp', 'jpeg', 'png']) {
        for (const format of formats) {
            if (this.supportCache.get(format)) {
                return format;
            }
        }
        return null;
    }

    /**
     * Check if a specific format is supported
     * @param {string} format - Format name
     * @returns {boolean}
     */
    isFormatSupported(format) {
        return this.supportCache.get(format) || false;
    }

    /**
     * Get all supported formats
     * @returns {Object} - Object with format support status
     */
    getSupportedFormats() {
        return {
            avif: this.supportCache.get('avif') || false,
            webp: this.supportCache.get('webp') || false,
            jpeg: this.supportCache.get('jpeg') || false,
            png: this.supportCache.get('png') || false
        };
    }

    /**
     * Generate format-specific URL from base URL
     * @param {string} baseUrl - Base image URL
     * @param {string} format - Target format
     * @returns {string} - Format-specific URL
     */
    getFormatUrl(baseUrl, format) {
        if (!baseUrl) return baseUrl;
        
        // Extract file extension
        const lastDotIndex = baseUrl.lastIndexOf('.');
        const lastSlashIndex = baseUrl.lastIndexOf('/');
        
        // Only replace extension if dot comes after last slash (is actually an extension)
        if (lastDotIndex > lastSlashIndex && lastDotIndex !== -1) {
            const basePath = baseUrl.substring(0, lastDotIndex);
            return `${basePath}.${format}`;
        }
        
        // If no extension found, append format
        return `${baseUrl}.${format}`;
    }
}

/**
 * Format Selection Utility
 * Provides intelligent format selection based on browser capabilities
 */
class FormatSelector {
    constructor(detector) {
        this.detector = detector;
        this.fallbackHierarchy = ['avif', 'webp', 'jpeg', 'png'];
    }

    /**
     * Select the best format for a given image URL
     * @param {string} originalUrl - Original image URL
     * @param {string[]} preferredFormats - Preferred formats in order
     * @returns {Object} - Selected format info
     */
    selectOptimalFormat(originalUrl, preferredFormats = this.fallbackHierarchy) {
        const bestFormat = this.detector.getBestSupportedFormat(preferredFormats);
        
        if (!bestFormat) {
            return {
                format: 'jpeg', // Ultimate fallback
                url: originalUrl,
                isOptimal: false
            };
        }

        return {
            format: bestFormat,
            url: this.detector.getFormatUrl(originalUrl, bestFormat),
            isOptimal: bestFormat === preferredFormats[0]
        };
    }

    /**
     * Generate source set for picture element
     * @param {string} baseUrl - Base image URL without extension
     * @param {number[]} widths - Array of image widths
     * @param {string[]} formats - Formats to generate
     * @returns {Object} - Source sets for each format
     */
    generateSourceSets(baseUrl, widths = [320, 640, 960, 1280, 1920, 2560], formats = ['avif', 'webp', 'jpeg']) {
        const sourceSets = {};
        
        formats.forEach(format => {
            if (this.detector.isFormatSupported(format)) {
                sourceSets[format] = widths
                    .map(width => `${baseUrl}-${width}.${format} ${width}w`)
                    .join(', ');
            }
        });
        
        return sourceSets;
    }
}

// Global instances
const imageFormatDetector = new ImageFormatDetector();
const formatSelector = new FormatSelector(imageFormatDetector);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ImageFormatDetector,
        FormatSelector,
        imageFormatDetector,
        formatSelector
    };
}

// Global access
window.ImageFormatDetector = ImageFormatDetector;
window.FormatSelector = FormatSelector;
window.imageFormatDetector = imageFormatDetector;
window.formatSelector = formatSelector;