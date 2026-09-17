# PRD: Personal Portfolio Website

## Introduction

Web portofolio pribadi single-page dengan tema gelap dan simplistic, menampilkan nama, biografi singkat, riwayat pendidikan & pengalaman, projects, dan contact. Dibangun dengan React + Vite, animasi via Framer Motion, smooth scroll via Lenis, styling via Tailwind CSS, dan HTML5 2D Canvas untuk elemen physics interaktif.

**Jawaban klarifikasi:** 1A (single-page scroll), 2A (timeline kiri pendidikan / kanan pengalaman), 3A (card klik → link eksternal), 4B (social links + email), 5B (canvas/physics element).

## Goals

- Single-page scroll: semua section (Hero → About → Projects → Contact) di satu halaman, nav meng-scroll ke section
- Tema gelap simplistic dengan animasi subtle (fade-in, slide-up, stagger)
- Class names deskriptif dengan prefix per section agar mudah dicari (mis. `hero-name`, `about-timeline-item`)
- Responsive di mobile dan desktop
- Smooth scroll Lenis terintegrasi dengan anchor navigation

## User Stories

### US-001: Header Navigation
**Description:** Sebagai pengunjung, saya ingin navigasi sticky di atas agar bisa langsung melompat ke section mana pun.

**Acceptance Criteria:**
- [ ] Nav sticky di top dengan efek glass/blur saat scroll
- [ ] Link nav: About, Projects, Contact (klik → smooth scroll ke section via Lenis)
- [ ] Logo/nama di kiri, nav links di kanan
- [ ] Mobile: hamburger menu atau layout compact
- [ ] Class names deskriptif: `header-nav`, `nav-link`, `nav-logo`
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-browser skill

### US-002: Hero Section (layout 2 kolom)
**Description:** Sebagai pengunjung, saya ingin melihat nama, biografi singkat, dan CTA di sisi kiri, serta visual di sisi kanan.

**Acceptance Criteria:**
- [ ] Layout 2 kolom: kiri = teks, kanan = visual (canvas physics)
- [ ] Kiri: nama besar, tagline/biografi singkat, 3 CTA button (GitHub, LinkedIn, Contact)
- [ ] CTA Contact meng-scroll ke section contact
- [ ] CTA GitHub/LinkedIn membuka tab baru
- [ ] Animasi masuk via Framer Motion saat load (fade/slide)
- [ ] Class names: `hero-section`, `hero-name`, `hero-bio`, `hero-cta-group`, `hero-cta-btn`, `hero-visual`
- [ ] Mobile: visual di bawah teks atau disembunyikan
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-react dev-server + browser

### US-003: Canvas Physics Element di Hero
**Description:** Sebagai pengunjung, saya ingin elemen interaktif berbasis physics di hero agar halaman terasa hidup.

**Acceptance Criteria:**
- [ ] Canvas 2D di sisi kanan hero
- [ ] Elemen physics sederhana: partikel/bola yang merespons pointer (repel) dan gravitasi
- [ ] Physics berjalan pada requestAnimationFrame dengan cleanup saat unmount
- [ ] Ukuran canvas responsif terhadap container
- [ ] Performance: 60fps di desktop
- [ ] Pointer events pada canvas tidak menghalangi interaksi klik CTA
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser

### US-004: About Section — Timeline Pendidikan & Pengalaman
**Description:** Sebagai pengunjung, saya ingin melihat riwayat pendidikan (kiri) dan pengalaman (kanan) dalam format timeline.

**Acceptance Criteria:**
- [ ] Judul section "About"
- [ ] Dua timeline paralel: kiri = Pendidikan, kanan = Pengalaman
- [ ] Setiap timeline item: tahun/periode, judul, institusi/perusahaan, deskripsi singkat
- [ ] Reveal animation saat scroll ke dalam viewport (Framer Motion `whileInView`)
- [ ] Mobile: timeline menumpuk (pendidikan di atas, pengalaman di bawah)
- [ ] Class names: `about-section`, `about-timeline`, `about-timeline-left`, `about-timeline-right`, `about-timeline-item`
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser

### US-005: Projects Section — Grid Continuous
**Description:** Sebagai pengunjung, saya ingin melihat daftar project dalam grid yang mengalir ke bawah.

**Acceptance Criteria:**
- [ ] Grid layout (2 kolom desktop, 1 kolom mobile)
- [ ] Setiap card: thumbnail/preview, judul project, deskripsi singkat, tag tech
- [ ] Klik card → buka link eksternal (GitHub/demo)
- [ ] Card reveal animation saat scroll (stagger)
- [ ] Class names: `projects-section`, `projects-grid`, `project-card`, `project-title`, `project-desc`, `project-tags`
- [ ] Konten statis di `src/data/projects.js` agar mudah diedit
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser

### US-006: Contact Section
**Description:** Sebagai pengunjung, saya ingin menghubungi melalui social links atau email.

**Acceptance Criteria:**
- [ ] Judul section "Contact"
- [ ] Social links: GitHub, LinkedIn, (opsional: Twitter/X, email)
- [ ] Email menggunakan mailto: link
- [ ] Layout simple, tidak perlu form
- [ ] Class names: `contact-section`, `contact-title`, `contact-links`, `contact-link`
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser

## Functional Requirements

- FR-1: All sections render in a single page with scroll-based navigation
- FR-2: Navbar is sticky at top with glassmorphism effect on scroll
- FR-3: Nav links (About, Projects, Contact) scroll smoothly to their respective sections using Lenis
- FR-4: Hero has 2-column layout — left: text + CTAs, right: canvas physics
- FR-5: Hero CTAs: GitHub (new tab), LinkedIn (new tab), Contact (smooth scroll)
- FR-6: Canvas physics handles pointer interaction (repel) and gravity with RAF loop
- FR-7: Canvas cleans up RAF and event listeners on unmount
- FR-8: About section renders two side-by-side timelines (left: education, right: experience)
- FR-9: Timeline items have `data-delay` or stagger animation on scroll into view
- FR-10: Projects grid is 2-column on desktop, 1-column on mobile
- FR-11: Each project card has thumbnail, title, description, tech tags, and external link
- FR-12: Project data stored in `src/data/projects.js` as structured array
- FR-13: Contact section has social links and mailto email
- FR-14: All content stored in `src/data/` folder (about.js, projects.js, socials.js) for easy editing
- FR-15: Class names follow pattern: `<section>-<element>` (e.g., `hero-name`, `projects-grid`)

## Non-Goals

- No routing/multi-page — single-page scroll only
- No detail page per project — click card → external link
- No contact form backend — social links + mailto only
- No CMS — static content in JS data files
- No dark/light mode toggle — dark theme only
- No external physics library — custom lightweight canvas physics

## Design Considerations

- Dark theme: background `#0a0a0f` or similar, white/light text, one accent color
- Simplistic: generous whitespace, clear typography, subtle animations
- Consistent prefix naming per section: `hero-`, `about-`, `projects-`, `contact-`, `header-`
- Animations: fade-in, slide-up, stagger via Framer Motion
- Lenis smooth scroll with anchor link support
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`

## Technical Considerations

- React 19 + Vite 8, Tailwind v4 via `@tailwindcss/vite`
- Lenis + Framer Motion `useScroll()` integration
- Canvas physics: custom class/function in `src/canvas/` or inline in hero component
- Static content in `src/data/` (projects.js, about.js, socials.js)
- Framer Motion variants for consistent animations
- RAF cleanup in useEffect return
- React 19 StrictMode double-mount — ensure Lenis & canvas cleanup is correct

## Success Metrics

- Lighthouse Performance ≥ 90 on desktop
- All nav links smooth-scroll to correct section
- Physics canvas runs at 60fps without jank
- Layout intact at 320px–1920px breakpoints
- Class names follow prefix convention consistently

## Open Questions

- Specific accent color preference? (e.g., cyan `#38bdf8`, violet `#a78bfa`, amber `#fbbf24`)
- When will actual content be provided? (name, projects, experience details)
- Font choice? (system font vs Google Font like Inter or Space Grotesk)

## File Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx            — sticky nav, glassmorphism, hamburger mobile
│   │   ├── HeroSection.jsx       — 2-column hero: left text + CTA, right canvas
│   │   ├── HeroCanvas.jsx        — particle network physics (mouse repel + connections)
│   │   ├── AboutSection.jsx      — dual parallel timeline (education left, experience right)
│   │   ├── ProjectsSection.jsx   — 2-column project grid with card hover
│   │   └── ContactsSection.jsx   — social links + footer
│   └── data/
│       ├── about.js              — name, role, bio, education array, experience array
│       ├── projects.js           — array of project objects {id, title, description, image, tags, link, year}
│       └── socials.js            — {github, linkedin, twitter, email}
└── tasks/
    └── prd-portfolio.md
```

**Tech Stack:** React 19 · Vite 8 · Tailwind CSS v4 (`@tailwindcss/vite`) · Framer Motion · Lenis · Custom Canvas Physics

**Design Tokens (final):**
- Background: `#0e0e14`
- Surface: `#15151e` / `#1c1c27`
- Text: `#edecea` · Muted: `#6e6e82`
- Accent: `#ffffff` (white)
- Border: `rgba(255,255,255,0.07)`
- Font Display: Playfair Display · Font Body: Manrope
