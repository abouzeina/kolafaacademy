# Kholafa Academy Website

![Kholafa Academy Logo](assets/logo.jpg)

## 📌 Project Overview
**Kholafa Academy** is a modern, responsive, and performance-optimized website for an established Quranic and Arabic language educational institution with over 20 years of experience. The platform is designed to present the academy's programs, legacy, and pricing to students worldwide.

The project is built using **Vanilla Web Technologies** (HTML5, CSS3, JavaScript) to ensure lightning-fast performance, simple maintenance, and maximum flexibility without relying on heavy frameworks.

## ✨ Key Features
- **🌍 Multilingual Support:** Full support for both Arabic (RTL - Default) and English (LTR - Located in the `en/` directory).
- **🚀 Performance Optimized:** 
  - All images are optimized using the modern `WebP` format.
  - Critical assets (CSS, Fonts) are preloaded.
  - Non-critical images use native browser `lazy` loading.
- **📱 Fully Responsive:** Carefully crafted mobile and tablet experiences ensuring the site looks beautiful on any device size.
- **🎨 Luxury Aesthetics:** A cohesive design system utilizing premium color palettes (Gold/Navy), smooth micro-animations, glassmorphism, and elegant typography (Alexandria & IBM Plex Sans Arabic).
- **♿ Accessible & SEO Friendly:** Semantic HTML structure and proper meta tags to ensure high search engine visibility and accessibility.

## 🛠️ Technology Stack
- **Structure:** HTML5
- **Styling:** CSS3 (Vanilla CSS, custom properties/variables, CSS Grid & Flexbox)
- **Interactivity:** Vanilla JavaScript (ES6+)

## 📂 Project Structure

```text
kholafa-vanilla/
│
├── index.html               # Main Landing Page (Arabic)
├── programs.html            # All Programs Overview (Arabic)
├── program-*.html           # Individual Program Pages (Arabic)
├── pricing.html             # Pricing & Packages (Arabic)
├── legacy.html              # Academy's Legacy & Achievements (Arabic)
├── teachers.html            # About Us & Teachers (Arabic)
├── contact.html             # Contact Us Page (Arabic)
│
├── en/                      # English Version (LTR)
│   ├── index.html
│   ├── programs.html
│   └── ...                  # Mirrored English pages
│
├── css/                     # Stylesheets
│   ├── global.css           # CSS Variables & Global Resets
│   ├── components.css       # Reusable UI Components (Buttons, Cards, Badges)
│   ├── header.css           # Navigation styling
│   ├── footer.css           # Footer styling
│   └── *.css                # Page-specific styling (home, pricing, legacy, etc.)
│
├── js/                      # JavaScript files
│   └── main.js              # Core interactivity (Mobile menu, Sliders, Animations)
│
└── assets/                  # Media & Images (Optimized WebP format)
```

## 💻 Development & Deployment
Since this is a vanilla HTML/CSS/JS project, there is no build step required.

1. **Local Development:** 
   - Simply open any `.html` file in your browser, or use a tool like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code to run the project locally with hot-reloading.
2. **Deployment:** 
   - The project is fully static and production-ready. 
   - It can be deployed directly to any static hosting provider such as Vercel, Netlify, GitHub Pages, or a traditional cPanel/Apache web server.

## 🎨 Design System (CSS Variables)
The project relies heavily on CSS custom properties defined in `css/global.css`.

- **Primary Colors:** Navy Blue (`#0f172a`, `#1e293b`)
- **Accent Colors:** Luxury Gold (`#d4af37`, `#f3e5ab`)
- **Typography:** 
  - `Alexandria` (Headings)
  - `IBM Plex Sans Arabic` (Body Text)
  - `Outfit` / `Inter` (English Version)

## 🤝 Maintenance
When updating content:
- **Images:** If you add new images, always ensure they are converted to `.webp` format before placing them in the `assets/` folder to maintain performance.
- **Multilingual:** Any structural or content changes made to the Arabic pages in the root folder should be manually mirrored to the corresponding files in the `en/` folder.

---
*Developed for Kholafa Academy - All Rights Reserved © 2026*
