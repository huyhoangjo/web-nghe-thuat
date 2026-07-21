# Design Spec: PDF UI/UX Refinements & 5-Chapter Restructuring

**Date:** 2026-07-21  
**Project:** NGO THI THUY DUYEN - Living Artistic Archive  
**Status:** Approved  

---

## 1. Executive Summary

This specification implements all design enhancements requested in `NHỮNG CHI TIẾT CẦN CHỈNH SỬA CHO GIAO DIỆN WEB.pdf`:
1. **Homepage Navigation Bar**: Hide desktop menu text links on homepage. Show ONLY hamburger menu icon and `VI / EN` switcher.
2. **Inner Pages Navigation Bar**: Show artist name on top left. Rename nav items to `BODY OF WORK`, `PRACTICE`, `FRAGMENTS`, `CV & CONTACT`. Remove `INDEX ☰` icon on inner pages, keeping ONLY `VI / EN`.
3. **Homepage Hero Section**: Full-color background image (`/images/home-hero.jpg`), title scaled to 75% size, quote updated to `“Art as a process of becoming.”`, hero button renamed to `ENTER`.
4. **Homepage Body of Work Section**: Section title renamed to `BODY OF WORK`, view all link renamed to `VIEW ALL →`.
5. **Color System**: Secondary text color set to `#2B2A2A`, hover accent color set to Ochre Gold `#bc9c22`.
6. **5-Chapter Restructuring & Filter (`app/works/page.tsx`)**: Rename title to `BODY OF WORK`, remove `CHRONOLOGICAL ARCHIVE` tagline, implement 5 chapter filters with interactive content display.
7. **Session Memory Viewed State**: Viewed artwork thumbnails stay colored in `sessionStorage` and reset on browser refresh/exit.

---

## 2. Detailed Technical Specifications

### 2.1 Theme & Color Palette (`app/globals.css`)
- `--color-text-secondary`: `#2B2A2A`
- `--color-accent-hover`: `#bc9c22`
- CSS rule: `.hover-gold:hover { color: #bc9c22 !important; }`

### 2.2 Navigation Bar Rules (`features/navigation/Navbar.tsx`)
- **Homepage (`/`)**:
  - Left: Blank
  - Right: `☰` (Drawer Menu Icon) + `VI / EN` Language Toggle
  - Hidden: All text nav links and `INDEX ☰` text.
- **Inner Pages (`/works`, `/about`, `/field-notes`, `/cv`, `/contact`, etc.)**:
  - Left: `NGO THI THUY DUYEN` brand title
  - Center: `BODY OF WORK`, `PRACTICE`, `FRAGMENTS`, `CV & CONTACT`
  - Right: `VI / EN` Language Toggle
  - Hidden: `INDEX ☰` text and `☰` drawer icon on inner pages.

### 2.3 Homepage Hero & Sections (`app/page.tsx`)
- Image: `/images/home-hero.jpg` (Full color, no grayscale filter, `opacity-30`).
- Title `NGO THI THUY DUYEN`: `font-serif text-3xl md:text-5xl lg:text-6xl font-medium text-text-primary tracking-wider uppercase` (75% size).
- Hero Quote: `“Art as a process of becoming.”`
- Hero Button: `ENTER` (navigates to `/works`).
- Section Title: `BODY OF WORK`
- Section Link: `VIEW ALL →`

### 2.4 5-Chapter Restructuring (`app/works/page.tsx`)
- Page Title: `BODY OF WORK`
- Tagline: Removed (`CHRONOLOGICAL ARCHIVE` removed).
- 5 Chapters:
  1. `Chapter I: Emerging Presence (2003–2007)`
  2. `Chapter II: Departure (2007–2009)`
  3. `Chapter III: Fragile Bodies (2011–2012)`
  4. `Chapter IV: Temporary Presence (2012–2013)`
  5. `Chapter V: The Origin of No-Self (2013–2014)`
- Interactive filtering: Clicking a chapter tab displays its artworks.

---

## 3. Verification & Testing

1. **Homepage Check**: Verify homepage navbar shows only `☰` and `VI / EN`. Hero shows color image, smaller title, new quote, and `ENTER` button.
2. **Inner Page Check**: Verify inner pages show `NGO THI THUY DUYEN` on top left, updated nav links, and no `INDEX ☰` icon on top right.
3. **Works Page Check**: Verify title displays `BODY OF WORK`, tagline is removed, and 5-chapter filter functions cleanly.
4. **Build Check**: Execute `npm run build` to verify 0 compilation errors.
