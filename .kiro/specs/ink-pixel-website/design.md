# Design Document

## Overview

The 4K Print website is a single-page application (SPA) built as a static website that showcases a graphic design and printing business. The design emphasizes visual storytelling through strategic use of imagery, typography, and color to communicate professionalism and creativity. The site follows a mobile-first responsive design approach with smooth scrolling navigation between sections.

## Architecture

### Technology Stack

- **Frontend Framework**: HTML5, CSS3, and vanilla JavaScript for lightweight performance
- **CSS Framework**: Custom CSS with CSS Grid and Flexbox for layout management
- **Build Tools**: Basic build process for asset optimization and minification
- **Hosting**: Static hosting solution (Netlify, Vercel, or similar)

### Site Structure

```
/
├── index.html (Single page with all sections)
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   └── smooth-scroll.js
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── about-photo.jpg
│   │   ├── portfolio/
│   │   └── icons/
│   └── fonts/
└── README.md
```

## Components and Interfaces

### Header Component

- **Sticky Navigation**: Fixed position header with transparent background that becomes solid on scroll
- **Logo**: 4K Print branding positioned left
- **Navigation Menu**: Right-aligned links (Home, Services, Portfolio, Contact)
- **Mobile Menu**: Hamburger menu for mobile devices with slide-out navigation

### Hero Section

- **Background**: Full-viewport height with parallax scrolling effect
- **Content Overlay**: Semi-transparent overlay for text readability
- **Headline**: Large, bold typography with fade-in animation
- **CTA Buttons**: Primary button (Get a Quote) and secondary button (View Portfolio)
- **Scroll Indicator**: Subtle down arrow to encourage scrolling

### About Section

- **Layout**: CSS Grid two-column layout (image left, content right)
- **Image Container**: Responsive image with subtle hover effects
- **Content Block**: Mission statement, values, and key differentiators
- **Responsive Behavior**: Stacks vertically on mobile devices

### Services Section

- **Grid Layout**: CSS Grid 3x2 layout for six service tiles
- **Service Tiles**: Card-based design with icon, title, and brief description
- **Hover Effects**: Scale and shadow transitions on hover
- **Icons**: Custom SVG icons for each service type
- **Responsive Grid**: Adjusts to 2x3 on tablet, 1x6 on mobile

### Portfolio Section

- **Masonry Layout**: CSS Grid masonry-style layout for varied image sizes
- **Image Gallery**: Lightbox functionality for enlarged viewing
- **Hover Overlays**: Project title and category appear on hover
- **Filter System**: Optional category filtering (Logo, Print, Packaging, etc.)
- **Lazy Loading**: Images load as user scrolls to improve performance

### Contact Section

- **Contact Form**: Simple form with name, email, project type, and message fields
- **Contact Information**: Business address, phone, email, and hours
- **Map Integration**: Embedded map showing business location
- **Social Links**: Links to social media profiles

### Footer

- **Minimal Design**: Copyright, additional links, and social media icons
- **Back to Top**: Smooth scroll to top functionality

## Data Models

### Portfolio Item

```javascript
{
  id: string,
  title: string,
  category: string,
  description: string,
  imageUrl: string,
  thumbnailUrl: string,
  tags: string[]
}
```

### Service

```javascript
{
  id: string,
  name: string,
  description: string,
  iconUrl: string,
  featured: boolean
}
```

### Contact Form Submission

```javascript
{
  name: string,
  email: string,
  projectType: string,
  message: string,
  timestamp: Date
}
```

## Visual Design System

### Color Palette

- **Primary Blue**: #1a1a2e (Midnight blue for structure and headers)
- **Accent Magenta**: #e94560 (Vibrant magenta for CTAs and highlights)
- **Neutral Grey**: #f5f5f5 (Light grey for backgrounds and balance)
- **Highlight Yellow**: #ffd700 (Yellow for accents and hover states)
- **Text Colors**: #333333 (dark grey), #666666 (medium grey), #ffffff (white)

### Typography

- **Primary Font**: Poppins (Google Fonts) - Headings and navigation
  - H1: 3.5rem, bold
  - H2: 2.5rem, semi-bold
  - H3: 1.8rem, medium
- **Secondary Font**: Open Sans (Google Fonts) - Body text and descriptions
  - Body: 1rem, regular
  - Small: 0.875rem, regular

### Spacing System

- **Base Unit**: 8px
- **Spacing Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Container Max Width**: 1200px
- **Section Padding**: 96px vertical, 24px horizontal

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

## Error Handling

### Image Loading

- **Fallback Images**: Default placeholder images for missing portfolio items
- **Progressive Loading**: Low-quality image placeholders while high-res images load
- **Error States**: Graceful handling of failed image loads

### Form Validation

- **Client-side Validation**: Real-time validation for required fields and email format
- **Error Messages**: Clear, user-friendly error messages
- **Success States**: Confirmation message after successful form submission

### Browser Compatibility

- **Graceful Degradation**: Core functionality works without JavaScript
- **CSS Fallbacks**: Fallback styles for older browsers
- **Feature Detection**: Progressive enhancement for modern browser features

## Performance Optimization

### Image Optimization

- **Responsive Images**: Multiple image sizes using srcset attribute
- **WebP Format**: Modern image format with JPEG fallbacks
- **Lazy Loading**: Images load only when entering viewport
- **Compression**: Optimized file sizes without quality loss

### Code Optimization

- **CSS Minification**: Compressed CSS files for production
- **JavaScript Bundling**: Combined and minified JavaScript files
- **Critical CSS**: Inline critical CSS for above-the-fold content
- **Font Loading**: Optimized web font loading strategy

## Testing Strategy

### Cross-browser Testing

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Testing Tools**: BrowserStack or similar cross-browser testing platform

### Responsive Testing

- **Device Testing**: Physical testing on various devices and screen sizes
- **Viewport Testing**: Browser developer tools for responsive design testing
- **Performance Testing**: Lighthouse audits for performance, accessibility, and SEO

### Accessibility Testing

- **WCAG Compliance**: Level AA compliance for accessibility standards
- **Screen Reader Testing**: Testing with screen reader software
- **Keyboard Navigation**: Full site functionality using only keyboard
- **Color Contrast**: Ensuring sufficient contrast ratios for all text

### User Experience Testing

- **Navigation Flow**: Testing smooth scrolling and section transitions
- **Form Functionality**: Contact form submission and validation testing
- **Interactive Elements**: Hover effects, button states, and animations
- **Loading Performance**: Page load speed and image loading optimization
