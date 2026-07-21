# Design Spec: Biography Page Portrait Integration & Framer Motion Overhaul

**Date:** 2026-07-21  
**Project:** NGO THI THUY DUYEN - Living Artistic Archive  
**Status:** Approved  

---

## 1. Executive Summary

This specification defines the redesign of the Biography page (`app/cv/page.tsx`):
1. **Title Update**: Replace `BIOGRAPHY / CV` with `BIOGRAPHY` (removing `/ CV` as requested).
2. **Artist Portrait Integration**: Embed the official artist portrait `/images/artist-portrait.png` in a museum-grade 2-column Hero section.
3. **UI/UX & Framer Motion Enhancements**:
   - Grayscale-to-color image hover effect with image zoom scale animation.
   - Artist summary side-panel highlighting core mediums, birthplace, and curatorial keywords.
   - Staggered Framer Motion entrance animations for every timeline entry.

---

## 2. Page Layout Structure (`app/cv/page.tsx`)

### 2.1 Header & Hero Section
- **Title**: `BIOGRAPHY` (in `Cormorant Garamond` serif `text-5xl md:text-7xl font-medium tracking-wide`).
- **Subtitle Badge**: `ARTISTIC TIMELINE & ARTIST PROFILE` in `font-mono text-xs font-bold text-text-secondary tracking-[0.35em]`.

### 2.2 Artist Profile 2-Column Hero Card
- **Left Column (Portrait)**:
  - Container: `border-2 border-text-primary bg-background-secondary overflow-hidden rounded-lg shadow-lg group`
  - Image: `/images/artist-portrait.png` with `filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700`
  - Caption: `NGO THI THUY DUYEN — VISUAL ARTIST / B. 1981, HOI AN, VIETNAM`
- **Right Column (Artist Summary)**:
  - Header: `Artistic Practice & Background`
  - Bio Copy: Highlight 20+ years of practice, MFA coursework at HCMC University of Fine Arts, BFA at Hue University of Arts, and research into Dó paper, ink, thread, and spatial installations.
  - Key Details Grid: Born, Based in HCMC, Primary Mediums, International Residencies.

### 2.3 Chronological Timeline Sections
- **Sections**: Education, Grants & Residencies, Solo Exhibitions & Performances, Selected Group Exhibitions, Performance Projects, Workshops & Artist Talks, Publications & Collections, Professional Experience.
- **Item Layout**: `flex flex-col md:flex-row gap-6 md:gap-12 w-full border-b border-border-light/80 pb-8 hover:border-text-primary transition-colors group`
- **Year Badge**: `w-full md:w-60 shrink-0 font-mono text-base md:text-lg font-bold text-text-primary`
- **Description**: `w-full font-serif text-xl md:text-2xl font-normal text-text-primary leading-relaxed`

---

## 3. Verification & Testing

1. **Visual Check**: Verify title displays `BIOGRAPHY` (without `/ CV`), artist portrait renders sharply with grayscale hover effect, and timeline entries scroll smoothly with Framer Motion.
2. **Production Build Check**: Execute `npm run build` to verify 0 compilation errors.
