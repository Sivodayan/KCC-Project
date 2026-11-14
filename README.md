# J/Kopay Christian College (யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி)

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-forest?style=flat-square)](LICENSE)

> **Motto:** *"Truth and Justice"* · **மகுடவாசகம்:** *“உண்மைக்கும் நேர்மைக்கும்”*  
> **Vision:** *"The Ideal School in Peninsula"* · **தூரநோக்கு:** *“குடாநாட்டின் முன்மாதிரிப் பாடசாலை”*  
> **Mission Statement:** *"To foster self respect, values, character, patriotism and Social Justice to lead the school community towards the global frontiers in education and to work for the optimum use of all the available resources skills and abilities."* · **நோக்கக்கூற்று:** *“சுயமரியாதை, விழுமியங்கள், நடத்தைக் கோலங்கள், நாட்டுப்பற்று, சமூக நியாயப்பாடு என்பவற்றை உள்ளடக்கிப் பாடசாலை சமூகத்தை கல்வியிலும், கல்விசார் கடமைகளிலும், வளங்கள், தேர்ச்சிகள், மற்றும் திறமைகளைப் பயன்படுத்திப் பாடசாலையில் கல்வித்தரத்தை நாட்டின் முதல் வரிசைக்குக் கொண்டு வருதல்.”*

A modern, high-performance, and bilingual web portal for **J/Kopay Christian College**, a historic collegiate school situated in Kopay, Jaffna, Sri Lanka (founded in 1852, with pedagogical foundations dating back to 1849/1850). Built with **React 19**, **Vite**, and **Tailwind CSS**, featuring interactive 3D elements, archival history timelines, a spotlight command palette, print-ready document sheets, offline network resiliency, and search-optimized metadata.

---

## 🌐 Live Portal

Official Website:  
👉 **[https://jkcc.edu.lk/](https://jkcc.edu.lk/)**

---

## ✨ Key Features & Architecture

### 🏛️ Interactive Heritage & Collegiate Principles
* **3D Flip Cards:** Interactive cards for **Motto**, **Vision**, and **Mission** with smooth CSS 3D perspective flip animation between English and Tamil on hover, tap, or keyboard focus (`Enter` / `Space`).
* **Tamil School Anthem (பாடசாலைக் கீதம்):** Dedicated anthem player and modal composed in *Ragam Hamsadhwani* (*“வாழிய நம் கலைக்கூடமே வாழ்க”*), complete with Tamil lyrics and copy utility.
* **Single-Page Formal Print Sheet:** Ink-friendly `@media print` layout ([src/components/AnthemPrintSheet.jsx](file:///d:/Documents/Projects/HTML/KCC%20Project/src/components/AnthemPrintSheet.jsx)) engineered to fit all 19 lines, the crest watermark, and ornamental collegiate borders on **a single page** for framing or ceremonies.

### 📖 Dual-Language Archival History (1849 – Present)
* **Full Chronological Timeline:** 12+ historic eras documenting the institution's evolution from the 1849 Church Mission Society (CMS) English School established by Rev. & Mrs. Robert Bren, through the Bren Hall construction, into the modern collegiate era.
* **Instant Bilingual Switching:** Toggle between full **English** and **Tamil (தமிழ்)** historical records with URL state sync (`?lang=ta`).
* **Archival Photography:** Integrated historical photos (`his1.jpg` – `his12.jpg`) illustrating significant milestones.
* **Leadership Directory:** Comprehensive historical registry of Headmasters (from 1880) and School Managers (from 1899).

### 🖼️ 3D Digital Photo Journal & Gallery
* **Perspective Coverflow:** 3D carousel showcasing campus moments, science laboratories, cultural celebrations, and sports meets.
* **Multi-Input Controls:** Supports side-peek click navigation, mouse wheel scrolling, touch swipe gestures, keyboard arrow keys, indicator dots, and continuous auto-play rotation.
* **Viewport Triggered Fan-in:** Dynamic 3D fan-in entrance animation initialized once the gallery section enters the viewport.

### ⚡ Academic Metrics & Achievements
* **Animated Counter Statistics:** Easing counter animations (`easeOutExpo`) triggered on scroll:
  * **1852** — Year founded
  * **386+** — Enrolled students
  * **46** — Dedicated faculty mentors
  * **94.2%** — G.C.E. O/L pass rate
  * **78%** — G.C.E. A/L university qualification rate
  * **18** — Active student clubs & societies
  * **4** — Houses of pride
  * **100%** — Modern laboratory access

### 🔍 Spotlight Command Palette (`Ctrl + K` / `/`)
* Global search dialog accessible from anywhere on the site with `Ctrl + K` or `/`.
* **Staggered Entry Transitions:** Micro-staggered animations for search inputs, rotating icon badges, quick filter tags (*Events*, *History*, *Anthem*, *Gallery*, *Contact*), and search results.
* **Desktop Hotkeys:** On-screen keyboard shortcuts (`↑↓` navigate, `↵` select, `esc` close).

### 📡 Offline & Network Resiliency System
* **Global Connection Monitoring:** Real-time browser `online`/`offline` listener that surfaces a non-intrusive sticky notice when connection drops and confirms reconnection with an auto-dismissing banner.
* **Contextual Offline Fallback:** In-place network error boundary component featuring an animated vector Wi-Fi disconnection illustration, live connectivity testing button (*"Try Again"* with real server ping), connection diagnostics, and reload action without disturbing the user's route history or URL bar.
* **Network Error Boundary:** React boundary wrapping lazy route imports to catch offline chunk-load failures and render the in-place fallback rather than a blank screen.

### 🚫 Themed 404 Error Handling
* Dedicated `NotFoundPage` matching the college green aesthetic with watermark crest, popular portal directory links, and a direct **"Report Broken Link"** `mailto:` button with pre-filled error URL and timestamp.

### 🔍 Search Engine Optimization (SEO) & Google Search Console
* **Google XML Sitemap (`sitemap.xml`):** Fully compliant with Google's Sitemaps and Image Sitemaps protocols (`xmlns:image`), indexing key campus photography, official crests, and archival images.
* **Bidirectional Multilingual Annotations:** Self-referential `xhtml:link` hreflang tags for English (`/history`), Tamil (`/history?lang=ta`), and `x-default`.
* **Canonical 301 Edge Redirects:** Automatic 301 redirects in `worker.js` and `public/_redirects` to consolidate legacy parameterized queries (`/?lang=en`, `/?lang=ta`, `/history?lang=en`) into clean canonical URLs.
* **Structured Data:** Comprehensive JSON-LD schema for `WebSite`, `WebPage`, and `School`.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>⌘</kbd> + <kbd>K</kbd> | Open / Close Search Command Palette |
| <kbd>/</kbd> | Open Search (when not in a text field) |
| <kbd>Esc</kbd> | Close active modal (Search, Anthem, or Mobile Menu) |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate search items in Command Palette |
| <kbd>Enter</kbd> | Select active search result / Flip Principles cards |
| <kbd>←</kbd> / <kbd>→</kbd> | Navigate 3D Gallery slides |

---

## 🛠️ Tech Stack & Design System

* **Framework:** [React 19](https://react.dev/)
* **Routing:** [React Router v7](https://reactrouter.com/) (SPA architecture)
* **Build Tool:** [Vite 6](https://vitejs.dev/)
* **Styling:** [Tailwind CSS 3.x](https://tailwindcss.com/) + Custom CSS for 3D transforms, print layouts, and keyframes
* **Typography:**
  * **Primary (English):** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
  * **Tamil Script:** [Noto Sans Tamil](https://fonts.google.com/specimen/Noto+Sans+Tamil)
* **Brand Color Palette:**
  * Forest Green: `#196716` (`brand-forest`)
  * Forest Hover: `#135211` (`brand-forestHover`)
  * Sage: `#588F54` (`brand-sage`)
  * Soft Green: `#91BD8D` (`brand-soft`)
  * Pale Green: `#C5E1C1` (`brand-pale`)
  * Light Mint: `#E9F8E7` (`brand-light`)
  * Clean White: `#FDFEFD` (`brand-white`)
  * Dark Canvas: `#0b120c` / `#111e13` (Dark mode background)
* **Hosting & CDN:** [Cloudflare Pages](https://pages.cloudflare.com/) + Cloudflare Workers

---

## 📁 Project Directory Structure

```text
KCC-Project/
├── public/
│   ├── assets/                     # Campus imagery, historical archives, and school crest
│   ├── _headers                    # Security headers (HSTS, CSP, X-Frame-Options)
│   ├── _redirects                  # Cloudflare Pages 301 canonical redirects
│   ├── 404.html                    # SPA redirect fallback for static hosts
│   ├── robots.txt                  # Robots crawler directives & sitemap reference
│   └── sitemap.xml                 # XML Sitemap with Google Image extensions & hreflang
├── src/
│   ├── components/
│   │   ├── AboutDropdown.jsx       # About dropdown menu (History, Anthem, Principles)
│   │   ├── AnthemModal.jsx         # School anthem pop-up modal
│   │   ├── AnthemPrintSheet.jsx    # Single-page formal printable anthem sheet
│   │   ├── Contact.jsx             # Contact cards and message inquiry form
│   │   ├── Footer.jsx              # Footer links, navigation, and copyright notices
│   │   ├── Gallery.jsx             # 3D interactive coverflow photo gallery
│   │   ├── GlassImage.jsx          # Progressive glassmorphic image component
│   │   ├── GlassSkeleton.jsx       # Route suspense loader & shimmer skeletons
│   │   ├── Hero.jsx                # Campus hero section with bilingual banner
│   │   ├── HistoryTimeline.jsx     # Comprehensive bilingual timeline (English & தமிழ்)
│   │   ├── LeadershipDirectory.jsx # Historical registry of Headmasters & Managers
│   │   ├── Navbar.jsx              # Responsive header, language toggle & mobile menu
│   │   ├── NetworkErrorBoundary.jsx# Route error boundary catching network/chunk load errors
│   │   ├── Performance.jsx         # Animated counter statistics section
│   │   ├── Principles.jsx          # 3D interactive flip-cards (Motto, Vision, Mission)
│   │   ├── SchoolAnthem.jsx        # School anthem player, lyrics, and print trigger
│   │   ├── SchoolEvents.jsx        # School events timeline & Facebook community sync
│   │   ├── SearchModal.jsx         # Spotlight command palette with staggered transitions
│   │   ├── OfflineFallback.jsx     # In-place network diagnostics & connection recovery fallback
│   │   └── ThemeToggle.jsx         # Dark / Light mode toggle switch
│   ├── context/
│   │   └── SiteContentContext.jsx  # Global site content state and CMS data provider
│   ├── data/
│   │   ├── facebookEvents.js       # Facebook community feeds & fallback events
│   │   └── siteContent.json        # Centralized content store (History, Events, Staff)
│   ├── pages/
│   │   ├── AdminPage.jsx           # Administrative portal for site updates
│   │   ├── AnthemPage.jsx          # Dedicated school anthem page
│   │   ├── ContactPage.jsx         # Contact administration view
│   │   ├── EventsPage.jsx          # Full school events & news view
│   │   ├── GalleryPage.jsx         # Dedicated photo gallery view
│   │   ├── HistoryPage.jsx         # Dedicated history view with language toggle
│   │   ├── HomePage.jsx            # Main landing view
│   │   └── NotFoundPage.jsx        # 404 page with "Report Broken Link" mailto
│   ├── App.jsx                     # Root router, SEO metadata manager & network monitor
│   ├── index.css                   # Custom utility classes, animations & print styles
│   └── main.jsx                    # React 19 entry point
├── worker.js                       # Cloudflare Worker for API proxies & 301 redirects
├── index.html                      # HTML5 shell, SEO tags, and JSON-LD schema
├── package.json                    # Dependencies & npm scripts
├── tailwind.config.js              # Tailwind theme configurations
├── vite.config.js                  # Vite bundler configuration
└── README.md                       # Documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (`v18.x` or higher recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sivodayan/KCC-Project.git
   cd KCC-Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Dev** | `npm run dev` | Runs the Vite development server with Hot Module Replacement (HMR). |
| **Build** | `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| **Preview** | `npm run preview` | Locally serves the production build to inspect prior to deployment. |

---

## 🚀 Deployment (Cloudflare Pages & Worker)

The project is configured for continuous deployment on **Cloudflare Pages**:

### Build Settings:
* **Framework preset:** `Vite`
* **Build command:** `npm run build`
* **Build output directory:** `dist`
* **Root directory:** `/`

### Edge Routing & 301 Redirects:
* `worker.js` handles API requests (`/api/github`, `/api/resolve-facebook`) and performs canonical 301 permanent redirects for parameterized URLs (`/?lang=en`, `/?lang=ta`, `/history?lang=en`).
* `public/_headers` enforces security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`).

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with pride for <strong>J/Kopay Christian College</strong> · யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி</sub>
</div>
