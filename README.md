# 4K Print Website

A modern, responsive website for a graphic design and printing business built with HTML5, CSS3, and vanilla JavaScript.

## Features

- **Multi-Language Support**: French (default), Arabic, and English with RTL support and language switcher
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Performance Optimized**: Minified assets, lazy loading, and WebP image support
- **Accessibility Compliant**: WCAG Level AA compliance with keyboard navigation
- **Interactive Animations**: Smooth scrolling and engaging micro-interactions
- **Contact Form**: Client-side validation with error handling
- **Portfolio Gallery**: Lightbox functionality with lazy loading

## Language Support

The website supports three languages with automatic detection:

- **French (fr)**: Default language
- **Arabic (ar)**: Full RTL (right-to-left) support
- **English (en)**: Alternative language

### Language Switching
- Use the language dropdown in the navigation
- Add `?lang=fr`, `?lang=ar`, or `?lang=en` to the URL
- Language preference is saved in localStorage

### RTL Support
Arabic language automatically enables:
- Right-to-left text direction
- Mirrored layout components
- Appropriate typography and spacing
- RTL-optimized navigation and forms

## Quick Start

### Development
Open `index.html` in your browser to view the development version.

### Testing Languages
- Open `test-i18n.html` to test the internationalization system
- Run `verify-i18n.js` in browser console for comprehensive i18n verification
- Check browser console for any language switching issues

### Testing Header
- Open `test-header.html` to test navigation visibility across different backgrounds
- Verify header remains visible on light, dark, and colorful backgrounds
- Test mobile menu functionality and positioning

### Production
Use the optimized files in the `dist/` folder for deployment:

```bash
# Build production version
node build-production.js

# Deploy the dist/ folder to your hosting service
```

## Project Structure

```
├── index.html              # Main development file
├── assets/                 # Development assets
│   ├── css/               # Stylesheets (including i18n.css)
│   ├── js/                # JavaScript files (including i18n.js)
│   └── images/            # Image assets
├── test-i18n.html         # I18n testing page
├── test-header.html       # Header background testing page
├── dist/                  # Production-ready build
└── .kiro/specs/           # Project specifications
```

## Deployment

The website is ready for deployment on any static hosting service:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Import project or upload `dist/` folder  
- **GitHub Pages**: Upload `dist/` contents to gh-pages branch
- **Other hosts**: Upload `dist/` folder contents

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2024 4K Print. All rights reserved.