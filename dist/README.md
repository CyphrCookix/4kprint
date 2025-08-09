# 4K Print Website - Production Build

This directory contains the optimized production build of the 4K Print website.

## Build Optimizations

### CSS Optimization
- Combined all CSS files (main.css, responsive.css, animations.css) into a single minified file
- Removed comments and unnecessary whitespace
- Optimized for faster loading

### JavaScript Optimization
- Combined all JavaScript files (main.js, smooth-scroll.js, responsive-touch.js, animations.js) into a single minified file
- Removed comments and unnecessary whitespace
- Optimized for better performance

### HTML Optimization
- Minified HTML structure
- Added performance optimizations:
  - Preload critical CSS and JavaScript
  - DNS prefetch for Google Fonts
  - Optimized resource loading

### Assets
- All images and fonts are included
- Service worker for offline caching
- Optimized file structure for static hosting

## Deployment Options

### Netlify
1. Upload the `dist` folder to Netlify
2. The `netlify.toml` configuration file is included for optimal settings
3. Automatic redirects and security headers are configured

### Vercel
1. Upload the `dist` folder to Vercel
2. The `vercel.json` configuration file is included
3. Static hosting optimizations are pre-configured

### Other Static Hosts
The build is compatible with any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh

## Performance Features

### Caching
- Service worker for offline functionality
- Long-term caching for static assets
- Optimized cache headers

### Security
- Security headers configured
- XSS protection enabled
- Content type sniffing disabled

### Loading Performance
- Critical resource preloading
- DNS prefetching for external resources
- Minified and compressed assets

## File Structure

```
dist/
├── index.html              # Optimized HTML
├── assets/
│   ├── css/
│   │   └── main.min.css   # Combined and minified CSS
│   ├── js/
│   │   └── main.min.js    # Combined and minified JavaScript
│   ├── images/            # Optimized images
│   └── fonts/             # Web fonts
├── logo.png               # Logo files
├── logoWhite.png
├── placeholder.webp
├── sw.js                  # Service worker
├── netlify.toml          # Netlify configuration
├── vercel.json           # Vercel configuration
└── README.md             # This file
```

## Testing the Build

Before deployment, you can test the build locally:

1. Serve the `dist` directory using a local web server
2. Test all functionality works correctly
3. Verify performance optimizations are applied
4. Check that all assets load properly

## Browser Support

The optimized build supports:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

Expected performance improvements:
- Reduced file sizes (CSS and JS combined and minified)
- Faster initial page load
- Improved caching efficiency
- Better mobile performance
- Enhanced accessibility compliance

## Maintenance

To update the build:
1. Make changes to source files in the main project
2. Run the build process again
3. Replace the contents of this `dist` directory
4. Redeploy to your hosting service