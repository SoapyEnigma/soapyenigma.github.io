# Show Ur Tees - Custom T-Shirt Business Website

A professional portfolio and lead-generation website for a custom t-shirt graphics business.

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Form Setup](#form-setup)
- [Deployment Options](#deployment-options)
- [Browser Support](#browser-support)

---

## Features

- **Responsive Design**: Looks great on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Portfolio Gallery**: Filterable image gallery with lightbox viewer
- **Contact Form**: Comprehensive quote request form with validation
- **SEO Friendly**: Proper heading structure, meta tags, and semantic HTML
- **Fast Loading**: Optimized CSS, lazy-loaded images, minimal dependencies
- **Accessible**: Proper ARIA labels, keyboard navigation, reduced motion support

---

## File Structure

```
Site/
├── index.html          # Home page
├── gallery.html        # Portfolio/gallery page
├── services.html       # Services and pricing page
├── about.html          # About us page
├── contact.html        # Contact/quote request page
├── README.md           # This file
│
├── css/
│   └── styles.css      # Main stylesheet
│
├── js/
│   └── main.js         # JavaScript functionality
│
└── images/
    ├── portfolio/      # Gallery images
    │   ├── featured-1.jpg
    │   ├── featured-2.jpg
    │   ├── featured-3.jpg
    │   ├── sports-1.jpg
    │   ├── sports-2.jpg
    │   ├── sports-3.jpg
    │   ├── corporate-1.jpg
    │   ├── corporate-2.jpg
    │   ├── corporate-3.jpg
    │   ├── event-1.jpg
    │   ├── event-2.jpg
    │   ├── event-3.jpg
    │   ├── band-1.jpg
    │   ├── band-2.jpg
    │   ├── other-1.jpg
    │   └── other-2.jpg
    ├── about-main.jpg      # About page main image
    ├── about-preview.jpg   # Home page about section image
    └── icons/              # Any icon files
```

---

## Getting Started

### Prerequisites

- A text editor (VS Code, Sublime Text, Atom, etc.)
- A web browser for testing
- Basic knowledge of HTML/CSS for customization

### Quick Start

1. Download or clone this project
2. Add your images to the `images/` folder
3. Update the content (see Customization Guide below)
4. Set up the contact form (see Form Setup below)
5. Deploy to your hosting provider

### Local Testing

Simply open `index.html` in your web browser to preview the site locally.

For a better development experience, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

---

## Customization Guide

### 1. Brand Colors

Edit the CSS variables in `css/styles.css` (lines 30-35):

```css
:root {
    /* Brand Colors - CUSTOMIZE THESE */
    --color-primary: #D32F2F;           /* Red - Change to your primary color */
    --color-primary-dark: #B71C1C;      /* Darker shade of primary */
    --color-primary-light: #EF5350;     /* Lighter shade of primary */
    --color-accent: #FF6F00;            /* Orange - Change to your accent color */
}
```

### 2. Business Information

Update these items across the HTML files:

| Item | Files to Update | Location |
|------|-----------------|----------|
| Business Name | All HTML files | `.logo-text`, `<title>` tags, footer |
| Tagline | `index.html` | Hero section subtitle |
| Contact Email | `contact.html` | Contact info sidebar |
| Phone Number | `contact.html` | Contact info sidebar |
| Social Media Links | All HTML files | Footer social links |
| Service Area | `contact.html` | Contact info sidebar |

### 3. Adding Your Images

#### Portfolio Images

1. Prepare your images (recommended: 800x800px or larger, square or 4:3 ratio)
2. Optimize for web (compress using TinyPNG, Squoosh, or similar)
3. Save to `images/portfolio/` folder
4. Update `gallery.html` with your image filenames and descriptions

Example image element in `gallery.html`:
```html
<div class="gallery-item" data-category="sports">
    <img src="images/portfolio/your-image.jpg" alt="Description of the image" loading="lazy">
    <div class="gallery-overlay">
        <h3>Project Title</h3>
        <p>Brief description</p>
        <!-- ... zoom button ... -->
    </div>
</div>
```

#### Featured Images (Home Page)

Update the three featured images in `index.html`:
```html
<img src="images/portfolio/your-featured-image.jpg" alt="Description" loading="lazy">
```

#### About Page Images

- `images/about-main.jpg` - Main about page image (your shop, team, or equipment)
- `images/about-preview.jpg` - Smaller preview on home page

### 4. Updating Services

Edit `services.html` to add or modify your services:

1. **Service Cards**: Update the service detail cards with your offerings
2. **Pricing Tiers**: Replace the `$XX` placeholder prices with your actual prices
3. **Features**: Update bullet points under each service

### 5. Updating Content

#### Home Page (`index.html`)
- Hero headline and subtitle
- Featured work descriptions
- About preview text
- Service preview cards

#### About Page (`about.html`)
- Your story
- Stats (customers served, shirts printed, years experience)
- Values and differentiators

#### Services Page (`services.html`)
- Service descriptions
- Pricing tiers (currently placeholder `$XX`)
- FAQ answers

#### Contact Page (`contact.html`)
- Contact information
- Service area description
- Social media links

### 6. Adding/Removing Gallery Categories

To add a new category:

1. Add a filter button in `gallery.html`:
```html
<button class="filter-btn" data-filter="newcategory">New Category</button>
```

2. Add items with the matching category:
```html
<div class="gallery-item" data-category="newcategory">
    <!-- image and overlay -->
</div>
```

---

## Form Setup

The contact form needs a backend to process submissions. Here are three options:

### Option 1: Formspree (Recommended - Free tier available)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID
4. Update `contact.html`, replacing `YOUR_FORMSPREE_ID`:

```html
<form action="https://formspree.io/f/YOUR_ACTUAL_ID" method="POST">
```

### Option 2: Netlify Forms (If hosting on Netlify)

1. Add attributes to the form tag:
```html
<form name="contact" method="POST" netlify>
```

2. Remove the `action` attribute
3. Deploy to Netlify - forms will work automatically

### Option 3: Custom Backend

Point the form action to your server endpoint:
```html
<form action="https://your-server.com/api/contact" method="POST">
```

---

## Deployment Options

### GitHub Pages (Free)

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your branch and folder
4. Your site will be live at `username.github.io/repository-name`

### Netlify (Free tier available)

1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository OR drag and drop your folder
3. Your site deploys automatically with a free SSL certificate

**Bonus**: Netlify Forms work out of the box!

### Vercel (Free tier available)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click deploy

### Traditional Web Hosting

1. Upload all files via FTP/SFTP to your `public_html` folder
2. Ensure your domain points to the hosting server

---

## Browser Support

This website supports:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

Progressive enhancement ensures basic functionality in older browsers.

---

## Troubleshooting

### Images Not Showing

- Check file paths are correct (case-sensitive on Linux servers)
- Ensure images are in the correct folders
- Verify image file extensions match what's in the HTML

### Form Not Working

- Ensure you've set up Formspree/Netlify correctly
- Check browser console for errors
- Verify the form action URL is correct

### Styles Not Loading

- Check the path to `css/styles.css` is correct
- Clear your browser cache
- Ensure the CSS file was uploaded

### JavaScript Not Working

- Check browser console (F12) for errors
- Ensure `js/main.js` path is correct
- Verify the file was uploaded

---

## Customization Tips

1. **Keep image sizes reasonable**: Aim for 100-300KB per image for fast loading
2. **Test on mobile**: Use Chrome DevTools device mode to preview mobile layout
3. **Update meta descriptions**: Edit the `<meta name="description">` tags for better SEO
4. **Add Google Analytics**: Insert your tracking code before `</head>` if desired
5. **Favicon**: Add a favicon.ico file to your root folder

---

## Need Help?

If you need assistance customizing this template:

1. Check the inline code comments for guidance
2. Reference the CSS variables section for color customization
3. Search for `CUSTOMIZE` comments in the code for key areas to update

---

## Credits

- Fonts: [Google Fonts](https://fonts.google.com) (Montserrat, Open Sans)
- Icons: Inline SVG icons based on [Feather Icons](https://feathericons.com)

---

## License

This template is provided for the Show Ur Tees business. Feel free to modify and use as needed for your custom apparel business.
