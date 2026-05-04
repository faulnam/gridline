# Gridline Digital - Digital Agency Website

**Tagline:** Digital growth, built on the grid.

A modern, high-performance digital agency website built with React and Tailwind CSS.

## 🎨 Visual Identity

- **Primary Background:** #0A0A0A (Deep Black)
- **Card Background:** #111111 / #141414
- **Accent Color:** #00C8FF (Cyan Neon)
- **Primary Text:** #FFFFFF
- **Secondary Text:** #888888 / #AAAAAA
- **Card Border:** #1E1E1E

## 🚀 Features

### Pages
- **Home** - Hero, Stats, Services, Featured Work, Process, Testimonials, CTA
- **Portfolio** - Project grid with detailed case studies
- **Pricing** - 3-tier pricing with FAQ
- **Contact** - Lead form with validation

### Interactive Elements
- Sticky navigation with scroll effects
- Animated stats counter
- Hover effects on cards and buttons
- AI chat assistant modal
- Smooth page transitions
- Mobile-responsive design

### Animations
- Fade-in on scroll (IntersectionObserver)
- Glow pulse effects on hero illustration
- Card hover transformations
- Smooth scrolling throughout

## 📦 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Google Fonts (Inter)** - Typography

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
gridline/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── StatsBar.jsx
│   │   ├── Services.jsx
│   │   ├── FeaturedWork.jsx
│   │   ├── Process.jsx
│   │   ├── Testimonial.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   └── ChatModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Pricing.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎯 Key Components

### Navbar
- Sticky positioning with scroll detection
- Mobile hamburger menu
- CTA button for strategy calls

### Hero Section
- Two-column layout with animated SVG illustration
- Diagonal lines with glow effects
- Social proof with avatars and ratings

### Stats Bar
- Animated counter on scroll
- Three key metrics with icons
- Responsive grid layout

### Services
- 6 service cards in responsive grid
- Hover effects with cyan glow
- Icon-based visual hierarchy

### Featured Work
- 3 project cards with gradient backgrounds
- Stats display for each project
- Click-through to detailed case studies

### Process
- 4-step timeline with icons
- Dashed connector lines
- Clear step numbering

### Testimonial
- Auto-rotating carousel
- Manual dot navigation
- Large quote display

### Chat Modal
- AI assistant simulation
- Text chat interface
- Voice call option (VAPI integration ready)
- Context-aware responses

### Contact Form
- Full validation with error states
- Success screen after submission
- localStorage integration (demo)
- Ready for backend integration

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  'bg-primary': '#0A0A0A',
  'cyan-accent': '#00C8FF',
  // ... more colors
}
```

### Animations
Custom animations are defined in `src/index.css`:
- `glow-pulse` - Pulsing glow effect
- `fade-in-up` - Fade and slide up animation

### Content
All content is hardcoded in components for easy customization. Update text, stats, and project data directly in the component files.

## 🌐 Deployment

Build the project and deploy the `dist` folder to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 📝 Future Enhancements

- [ ] Backend API integration for contact form
- [ ] Anthropic Claude API for real AI chat
- [ ] VAPI integration for voice calls
- [ ] CMS integration (Sanity/Contentful)
- [ ] Blog section
- [ ] Case study detail pages with more content
- [ ] Analytics integration (Google Analytics/Plausible)
- [ ] A/B testing setup

## 📄 License

© 2024 Gridline Digital. All rights reserved.

---

Built with ❤️ using React + Tailwind CSS
# gridline
