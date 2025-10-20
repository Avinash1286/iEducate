# 🚀 Quick Start Guide - iEducate Website

## Getting Started

### Option 1: Open Directly in Browser
1. Navigate to your project folder: `d:\iEducate`
2. Double-click `index.html` to open in your default browser

### Option 2: Use Live Server (Recommended)
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Simple HTTP Server
```powershell
# Navigate to project directory
cd d:\iEducate

# If you have Python installed:
python -m http.server 8000

# Then open: http://localhost:8000
```

## 🎨 Customization Guide

### Change Colors
Edit `css/style.css` - Lines 7-17 (CSS Variables):
```css
:root {
    --primary-color: #007bff;    /* Main brand color */
    --secondary-color: #6c757d;  /* Secondary color */
    --accent-color: #28a745;     /* Accent/highlight color */
    --dark-color: #212529;       /* Dark text */
    --light-color: #f8f9fa;      /* Light backgrounds */
}
```

### Update Content
- **Brand Name**: Line 35 in `index.html` - Change "iEducate" to your brand
- **Services**: Lines 115-130 in `index.html`
- **Portfolio Items**: Lines 160-195 in `index.html`
- **Testimonials**: Lines 200-240 in `index.html`
- **Blog Posts**: Lines 245-285 in `index.html`
- **FAQ Questions**: Lines 290-330 in `index.html`
- **Contact Info**: Lines 355-380 in `index.html`

### Replace Images
Replace placeholder URLs in `index.html`:
- `https://via.placeholder.com/500x400` → Your image URL
- Or use local images: `images/your-image.jpg`

## ✨ Feature Testing Checklist

- [ ] Test loading screen (refresh page)
- [ ] Try dark mode toggle (top right)
- [ ] Scroll and watch progress bar
- [ ] Check stats counter animation
- [ ] Navigate testimonial slider
- [ ] Click FAQ questions
- [ ] Open live chat widget
- [ ] Test cookie consent banner
- [ ] Try mobile menu (resize browser)
- [ ] Test all navigation links

## 📱 Responsive Testing

### In Browser DevTools:
1. Press `F12` or `Ctrl+Shift+I`
2. Click device toolbar icon (or `Ctrl+Shift+M`)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1200px

## 🐛 Troubleshooting

### Styles not loading?
- Check file paths in `index.html` (lines 11-15)
- Ensure `css` folder is in the same directory

### JavaScript not working?
- Check browser console for errors (`F12` → Console)
- Ensure `js/responsive.js` path is correct (line 463)

### Dark mode not persisting?
- Check if localStorage is enabled in browser
- Clear browser cache and try again

## 🎯 Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Enable Caching**: Configure web server caching
3. **Minify CSS/JS**: Use build tools for production
4. **CDN**: Host Font Awesome on CDN (already included)

## 🔗 External Dependencies

- **Font Awesome 6.4.0**: Icons (CDN linked in HTML)
- **Google Fonts**: (Optional) Add your preferred fonts

## 📊 Analytics Setup (Optional)

Add to `<head>` section before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## 🚀 Deployment Options

### GitHub Pages (Free)
1. Create repository on GitHub
2. Push your code
3. Enable GitHub Pages in repository settings

### Netlify (Free)
1. Sign up at netlify.com
2. Drag and drop your `iEducate` folder
3. Get instant live URL

### Vercel (Free)
1. Sign up at vercel.com
2. Import from Git or upload folder
3. Auto-deploy on updates

## 📞 Support

For questions or issues:
- Check `FEATURES.md` for feature documentation
- Review browser console for error messages
- Test in different browsers

---

**Happy coding! 🎉**
