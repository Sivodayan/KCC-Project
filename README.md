# J/Kopay Christian College (யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி)

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-forest?style=flat-square)](LICENSE)

> **Motto:** *"Truth and Justice"* · **மகுடவாசகம்:** *“உண்மைக்கும் நேர்மைக்கும்”*  
> **Vision:** *"The Ideal School in Peninsula"* · **தூரநோக்கு:** *“குடாநாட்டின் முன்மாதிரிப் பாடசாலை”*  
> **Mission Statement:** *"To foster self respect, values, character, patriotism and Social Justice to lead the school community towards the global frontiers in education and to work for the optimum use of all the available resources skills and abilities."* · **நோக்கக்கூற்று:** *“சுயமரியாதை, விழுமியங்கள், நடத்தைக் கோலங்கள், நாட்டுப்பற்று, சமூக நியாயப்பாடு என்பவற்றை உள்ளடக்கிப் பாடசாலை சமூகத்தை கல்வியிலும், கல்விசார் கடமைகளிலும், வளங்கள், தேர்ச்சிகள், மற்றும் திறமைகளைப் பயன்படுத்திப் பாடசாலையில் கல்வித்தரத்தை நாட்டின் முதல் வரிசைக்குக் கொண்டு வருதல்.”*

A modern, responsive, and bilingual web portal for **J/Kopay Christian College**, a historic collegiate school situated in Kopay, Jaffna, Sri Lanka (founded in 1852, with pedagogical foundations dating back to 1849/1850). Built with **React 19**, **Vite**, and **Tailwind CSS**, featuring interactive 3D elements, archival history timelines, and a keyboard-driven command palette.

---

## 🌐 Live Demo

Visit the deployed website:  
👉 **[https://jkcc.edu.lk/](https://jkcc.edu.lk/)**

---

## ✨ Key Features

### 🏛️ Interactive Heritage & Principles
* **3D Flip Cards:** Interactive cards for **Motto**, **Vision**, and **Mission** with smooth CSS 3D flip animation between English and Tamil on hover, tap, or keyboard focus (`Enter` / `Space`).
* **Tamil School Anthem Modal (பாடசாலைக் கீதம்):** Dedicated pop-up modal showcasing the college anthem composed in *Ragam Hamsadhwani* (*“வாழிய நம் கலைக்கூடமே வாழ்க”*).

### 📖 Dual-Language Archival History
* **Full Chronological Timeline:** 12+ historic eras documenting the institution's evolution from the 1849 Church Mission Society (CMS) English School established by Rev. & Mrs. Robert Bren, through the Bren Hall construction, into the modern era.
* **Instant Bilingual Switching:** Toggle between full **English** and **Tamil (தமிழ்)** historical records with persistent scroll preservation.
* **Archival Photography:** Integrated high-resolution historical photos (`his1.jpg` – `his12.jpg`) illustrating significant milestones.
* **Leadership Directory:** Comprehensive historical registry of Headmasters (from 1880) and School Managers (from 1899).

### 🖼️ 3D Digital Photo Journal & Gallery
* **Perspective Carousel:** 3D coverflow-style carousel showcasing 11 high-resolution moments of campus life, science laboratories, celebrations, and sports meets.
* **Multi-Input Controls:** Supports side-peek click navigation, mouse wheel scrolling, swipe gestures, keyboard arrow keys, indicator dots, and uninterrupted continuous auto-play rotation (does not pause on hover).
* **Viewport Triggered Fan-in:** Dynamic 3D fan-in entrance animation initialized once the gallery section enters the viewport.

### 🎀 Grand Inauguration Ceremony Simulator (`inauguration/`)
* **Dedicated Ceremony Launch App:** A standalone, self-contained application located in the [`inauguration/`](file:///d:/Documents/Projects/HTML/KCC%20Project/inauguration/index.html) directory, built to simulate an official web portal dedication on auditorium stage screens or event displays.
* **School Brand Identity:** Implements the official school design system, colors (Forest Green `#196716`, Pale Mint `#C5E1C1`, and White `#FDFEFD`), Google fonts (*Plus Jakarta Sans* & *Noto Sans Tamil*), and official assets (`logo.png`, `hero.jpg`, and campus highlights).
* **Interactive Ribbon Cutting:** Cutting the ribbon with the central golden college crest medallion or the scissors button triggers realistic snip audio and parting physics.
* **Celebration & Auto-Redirect:** Plays celebratory fanfare, bursts school-color confetti, presents the dedication modal, and automatically redirects straight into the website.
* **How to Run:** Open [`inauguration/index.html`](file:///d:/Documents/Projects/HTML/KCC%20Project/inauguration/index.html) directly in any web browser.

### ⚡ Performance & Academic Metrics
* **Animated Statistics Counters:** Easing counter animations (`easeOutExpo`) showing key metrics triggered when scrolled into view:
  * **1852** — Year founded
  * **386+** — Enrolled students
  * **46** — Dedicated faculty mentors
  * **94.2%** — G.C.E. O/L pass rate
  * **78%** — G.C.E. A/L university qualification rate
  * **18** — Active student clubs & societies
  * **4** — Houses of pride
  * **100%** — Modern laboratory access

### 🔍 Spotlight Command Palette (`Ctrl + K`)
* Global search dialog accessible from anywhere on the site with keyboard shortcut `Ctrl + K` or `/`.
* Fuzzy search across campus history, academic values, school anthem, gallery, and administrative contacts.
* Direct shortcut navigation with keyboard arrows and `Enter`.

### 📞 College Office & Inquiries
* Direct contact details (telephone `021 223 0040`, email `kcckopay@gmail.com`, and Google Maps pin).
* Interactive inquiry form with responsive validation and submission confirmation.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> or <kbd>⌘</kbd> + <kbd>K</kbd> | Open / Close Search Command Palette |
| <kbd>/</kbd> | Open Search (when not in a text field) |
| <kbd>Esc</kbd> | Close active modal (Search or School Anthem) |
| <kbd>←</kbd> / <kbd>→</kbd> | Navigate 3D Gallery slides |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Flip Motto / Vision / Mission cards when focused |

---

## 🛠️ Tech Stack & Design System

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite 6](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom Vanilla CSS for 3D transforms and keyframe animations
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
* **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)

---

## 📁 Project Directory Structure

```text
KCC-Project/
├── public/
│   └── assets/                  # Campus imagery, archival photographs, and logo
├── src/
│   ├── components/
│   │   ├── AboutDropdown.jsx       # About dropdown menu (History, Anthem, Motto)
│   │   ├── AnthemModal.jsx         # School anthem popup (பாடசாலைக் கீதம்)
│   │   ├── Contact.jsx             # Contact details and inquiry submission form
│   │   ├── Footer.jsx              # Footer links, navigation, and copyright
│   │   ├── Gallery.jsx             # 3D interactive photo journal & coverflow carousel
│   │   ├── Hero.jsx                # Campus hero section with bilingual banner
│   │   ├── HistoryTimeline.jsx     # Comprehensive bilingual timeline (English & தமிழ்)
│   │   ├── LeadershipDirectory.jsx # Historical registry of Headmasters & Managers
│   │   ├── Navbar.jsx              # Sticky navigation bar & language switcher
│   │   ├── Performance.jsx         # Animated counter statistics section
│   │   ├── Principles.jsx          # 3D interactive flip-cards (Motto, Vision, Mission)
│   │   └── SearchModal.jsx         # Global search palette dialog (Ctrl+K)
│   ├── pages/
│   │   ├── HistoryPage.jsx         # Dedicated history view with language toggle
│   │   └── HomePage.jsx            # Main single-page landing layout
│   ├── App.jsx                     # Root application container & shortcut listener
│   ├── index.css                   # Custom 3D perspective styles & CSS keyframes
│   └── main.jsx                    # Vite React DOM entry point
├── index.html                      # HTML5 shell, meta tags, and Tailwind theme config
├── package.json                    # Project metadata, scripts, and dependencies
├── vite.config.js                  # Vite configuration & base repository path
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (version `18.x` or higher recommended).

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
   Open [http://localhost:5173/KCC-Project/](http://localhost:5173/KCC-Project/) in your browser.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Dev** | `npm run dev` | Runs the development server with Hot Module Replacement (HMR). |
| **Build** | `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| **Preview** | `npm run preview` | Locally serves the production build to inspect prior to deployment. |

---

## 🚀 Deployment (Cloudflare Pages)

The project is configured for **Direct Git Builds** on [Cloudflare Pages](https://pages.cloudflare.com/):

### Cloudflare Pages Build Settings:
* **Framework preset:** `Vite`
* **Build command:** `npm run build`
* **Build output directory:** `dist`
* **Root directory:** `/`

### SPA Routing & Security Headers:
* `public/_redirects` ensures all client-side routes (e.g. `/history`, `/admin`, `/gallery`) resolve directly to `/index.html` with HTTP 200.
* `public/_headers` enforces secure HTTP response headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`).

### Environment Variables in Cloudflare Pages:
Set the following under **Project Settings > Environment Variables**:
* `GITHUB_TOKEN` *(**Encrypted secret** - Personal access token with `repo` scope, securely accessed by serverless Pages Function `/api/github`)*
* `VITE_FIREBASE_API_KEY`
* `VITE_FIREBASE_AUTH_DOMAIN`
* `VITE_FIREBASE_PROJECT_ID`
* `VITE_FIREBASE_STORAGE_BUCKET`
* `VITE_FIREBASE_MESSAGING_SENDER_ID`
* `VITE_FIREBASE_APP_ID`

---

## 🤝 Contributing

Contributions to improve the website, enrich historical archives, or optimize accessibility are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with pride for <strong>J/Kopay Christian College</strong> · யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி</sub>
</div>
