ormat Utilities
 * Provides format conversion, optimization, and runtime switching capabilities
 */

class ImageFormatUtilities {
    constructor(formatDetector) {
        this.formatDetector = formatDetector;
        this.conversionCache = new Map();
        this.optimizationSettings = {
            avif: { quality: 0.8, effort: 4 },
            webp: { quality: 0.85, method: 4 },
            jpeg: { quality: 0.9, progressive: true },
            png: { compressionLevel: 6, interlaced: false }
        };
    }

    /**
     * Runtime format switching based on browser capabilities
     * @param {HTMLImageElement|HTMLPictureElement} element - Image element to optimize
     * @param {Object} options - Optimization options
     * @returns {Promise<boolean>} - Success status
     */
    async switchToOptimalFormat(element, options = {}) {
        try {
            const originalSrc = element.src || element.dataset.src;
            if (!originalSrc) return false;

            // Wait for format detection to complete
            await this.formatDetector.initializeDetection();

            const optimalFormat = this.formatDetector.getBestSupportedFormat();
            if (!optimalFormat) return false;

            const optimizedUrl = this.generateOptimizedUrl(originalSrc, optimalFormat, options);
            
            // Test if optimized version exists
            const exists = await this.testImageExists(optimizedUrl);
            if (exists) {
                await this.updateElementSource(element, optimizedUrl, optimalFormat);
                return true;
            }

            return false;
        } catch (error) {
            console.warn('Format switching failed:', error);
            return false;
        }
    }

    /**
     * Generate optimized URL for a given format
     * @param {string} originalUrl - Original image URL
     * @param {string} format - Target format
     * @param {Object} options - Optimization options
     * @returns {string} - Optimized URL
     */
    generateOptimizedUrl(originalUrl, format, options = {}) {
        const cacheKey = `${originalUrl}_${format}_${JSON.stringify(options)}`;
        
        if (this.conversionCache.has(cacheKey)) {
            return this.conversionCache.get(cacheKey);
        }

        let optimizedUrl = this.formatDetector.getFormatUrl(originalUrl, format);
        
        // Add optimization parameters if supported
        if (options.width || options.height || options.quality) {
            const params = new URLSearchParams();
            
            if (options.width) params.set('w', options.width);
            if (options.height) params.set('h', options.height);
            if (options.quality) params.set('q', Math.round(options.quality * 100));
            if (options.format) params.set('f', options.format);
            
            const separator = optimizedUrl.includes('?') ? '&' : '?';
            optimizedUrl = `${optimizedUrl}${separator}${params.toString()}`;
        }

        this.conversionCache.set(cacheKey, optimizedUrl);
        return optimizedUrl;
    }

    /**
     * Update element source with new format
     * @param {HTMLElement} element - Image element
     * @param {string} newSrc - New source URL
     * @param {string} format - New format
     * @returns {Promise<void>}
     */
    async updateElementSource(element, newSrc, format) {
        return new Promise((resolve, reject) => {
            if (element.tagName === 'PICTURE') {
                this.updatePictureElement(element, newSrc, format);
                resolve();
            } else if (element.tagName === 'IMG') {
                const img = element;
                
                // Create a new image to test loading
                const testImg = new Image();
                testImg.onload = () => {
                    img.src = newSrc;
                    img.dataset.format = format;
                    resolve();
                };
                testImg.onerror = () => reject(new Error('Failed to load optimized image'));
                testImg.src = newSrc;
            } else {
                reject(new Error('Unsupported element type'));
            }
        });
    }

    /**
     * Update picture element with optimal sources
     * @param {HTMLPictureElement} picture - Picture element
     * @param {string} baseSrc - Base source URL
     * @param {string} preferredFormat - Preferred format
     */
    updatePictureElement(picture, baseSrc, preferredFormat) {
        const img = picture.querySelector('img');
        if (!img) return;

        // Clear existing sources
        const existingSources = picture.querySelectorAll('source');
        existingSources.forEach(source => source.remove());

        // Generate sources for supported formats
        const supportedFormats = this.formatDetector.getSupportedFormats();
        const formatPriority = ['avif', 'webp', 'jpeg', 'png'];

        formatPriority.forEach(format => {
            if (supportedFormats[format]) {
                const source = document.createElement('source');
                source.type = `image/${format}`;
                source.srcset = this.formatDetector.getFormatUrl(baseSrc, format);
                picture.insertBefore(source, img);
            }
        });

        // Update fallback img
        img.src = this.formatDetector.getFormatUrl(baseSrc, 'jpeg');
    }

    /**
     * Test if an image URL exists and is loadable
     * @param {string} url - Image URL to test
     * @returns {Promise<boolean>} - Whether image exists
     */
    async testImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => resolve(false), 3000);
            
            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
            
            img.src = url;
        });
    }

    /**
     * Batch optimize multiple images
     * @param {NodeList|Array} elements - Image elements to optimize
     * @param {Object} options - Optimization options
     * @returns {Promise<Array>} - Array of optimization results
     */
    async batchOptimize(elements, options = {}) {
        const promises = Array.from(elements).map(element => 
            this.switchToOptimalFormat(element, options)
                .catch(error => {
                    console.warn('Individual optimization failed:', error);
                    return false;
                })
        );

        return Promise.all(promises);
    }

    /**
     * Generate responsive image sources
     * @param {string} baseUrl - Base image URL
     * @param {Object} options - Generation options
     * @returns {Object} - Responsive sources object
     */
    generateResponsiveSources(baseUrl, options = {}) {
        const {
            widths = [320, 640, 960, 1280, 1920, 2560],
            formats = ['avif', 'webp', 'jpeg'],
            densities = [1, 2]
        } = options;

        const sources = {};
        const supportedFormats = this.formatDetector.getSupportedFormats();

        formats.forEach(format => {
            if (supportedFormats[format]) {
                sources[format] = {
                    srcset: this.generateSrcSet(baseUrl, format, widths, densities),
                    type: `image/${format}`
                };
            }
        });

        return sources;
    }

    /**
     * Generate srcset string for a format
     * @param {string} baseUrl - Base URL
     * @param {string} format - Image format
     * @param {number[]} widths - Width variants
     * @param {number[]} densities - Density variants
     * @returns {string} - Srcset string
     */
    generateSrcSet(baseUrl, format, widths, densities) {
        const srcsetEntries = [];

        widths.forEach(width => {
            densities.forEach(density => {
                const url = this.generateOptimizedUrl(baseUrl, format, { 
                    width: width * density 
                });
                
                if (density === 1) {
                    srcsetEntries.push(`${url} ${width}w`);
                } else {
                    srcsetEntries.push(`${url} ${width * density}w`);
                }
            });
        });

        return srcsetEntries.join(', ');
    }

    /**
     * Create picture element with optimal sources
     * @param {string} src - Base image source
     * @param {Object} options - Creation options
     * @returns {HTMLPictureElement} - Generated picture element
     */
    createOptimalPictureElement(src, options = {}) {
        const {
            alt = '',
            className = '',
            loading = 'lazy',
            sizes = '100vw',
            widths = [320, 640, 960, 1280, 1920, 2560]
        } = options;

        const picture = document.createElement('picture');
        if (className) picture.className = className;

        // Generate sources for supported formats
        const responsiveSources = this.generateResponsiveSources(src, { widths });
        
        Object.entries(responsiveSources).forEach(([format, sourceData]) => {
            const source = document.createElement('source');
            source.type = sourceData.type;
            source.srcset = sourceData.srcset;
            source.sizes = sizes;
            picture.appendChild(source);
        });

        // Create fallback img element
        const img = document.createElement('img');
        img.src = this.formatDetector.getFormatUrl(src, 'jpeg');
        img.alt = alt;
        img.loading = loading;
        img.sizes = sizes;
        
        // Add responsive srcset for fallback
        const fallbackSrcset = this.generateSrcSet(src, 'jpeg', widths, [1]);
        if (fallbackSrcset) {
            img.srcset = fallbackSrcset;
        }

        picture.appendChild(img);
        return picture;
    }

    /**
     * Get optimization statistics
     * @returns {Object} - Optimization statistics
     */
    getOptimizationStats() {
        const supportedFormats = this.formatDetector.getSupportedFormats();
        const cacheSize = this.conversionCache.size;
        
        return {
            supportedFormats,
            cacheSize,
            cacheSizeKB: Math.round(JSON.stringify([...this.conversionCache]).length / 1024),
            optimizationSettings: this.optimizationSettings
        };
    }

    /**
     * Clear conversion cache
     */
    clearCache() {
        this.conversionCache.clear();
    }

    /**
     * Update optimization settings
     * @param {Object} newSettings - New optimization settings
     */
    updateOptimizationSettings(newSettings) {
        this.optimizationSettings = {
            ...this.optimizationSettings,
            ...newSettings
        };
    }
}

/**
 * Format Conversion Helper
 * Provides client-side format conversion utilities
 */
class FormatConverter {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Convert image to different format using canvas
     * @param {HTMLImageElement} img - Source image
     * @param {string} format - Target format
     * @param {number} quality - Quality (0-1)
     * @returns {Promise<string>} - Data URL of converted image
     */
    async convertImageFormat(img, format, quality = 0.9) {
        return new Promise((resolve, reject) => {
            try {
                this.canvas.width = img.naturalWidth || img.width;
                this.canvas.height = img.naturalHeight || img.height;
                
                this.ctx.drawImage(img, 0, 0);
                
                const mimeType = `image/${format}`;
                const dataUrl = this.canvas.toDataURL(mimeType, quality);
                
                resolve(dataUrl);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Create low quality image placeholder (LQIP)
     * @param {HTMLImageElement} img - Source image
     * @param {number} maxWidth - Maximum width for placeholder
     * @returns {string} - Data URL of LQIP
     */
    createLQIP(img, maxWidth = 64) {
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const width = Math.min(maxWidth, img.naturalWidth);
        const height = Math.round(width * aspectRatio);
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.ctx.drawImage(img, 0, 0, width, height);
        
        return this.canvas.toDataURL('image/jpeg', 0.1);
    }
}

// Initialize utilities
let imageFormatUtilities;
let formatConverter;

// Wait for format detector to be available
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.imageFormatDetector) {
            imageFormatUtilities = new ImageFormatUtilities(window.imageFormatDetector);
            formatConverter = new FormatConverter();
            
            // Make globally available
            window.imageFormatUtilities = imageFormatUtilities;
            window.formatConverter = formatConverter;
        }
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ImageFormatUtilities,
        FormatConverter
    };
}