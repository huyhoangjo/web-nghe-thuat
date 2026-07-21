# Design Spec: Museum-Grade Typography Synchronization Across Entire Web App

**Date:** 2026-07-21  
**Project:** NGO THI THUY DUYEN - Living Artistic Archive  
**Status:** Approved  

---

## 1. Executive Summary

This specification defines the complete synchronization of the museum-grade typography system (as shown in the user's reference screenshot of `/about`) across every page of the web application (`/`, `/works`, `/works/[slug]`, `/field-notes`, `/journal`, `/publications`, `/cv`, `/contact`, `/admin`).

The aesthetic combines:
1. **Curatorial Display & Body Text**: `Cormorant Garamond` serif font for all titles, headings, subtitles, blockquotes, and reading paragraphs (`#111111` deep ink, `leading-[1.9]`, `font-normal` 400 / `font-medium` 500 weight).
2. **Curatorial Metadata & Badges**: `Monospace` / `font-mono` font in uppercase with wide letter-spacing (`tracking-[0.25em]` to `tracking-[0.35em]`, `font-bold`, `#222222` color) for layer tags, section numbers, dates, categories, and technical labels.
3. **Contrast & Paper Palette**: Crisp deep ink on warm museum ivory (`#F8F7F4`).

---

## 2. Typography Rules & Tokens

### 2.1 CSS Theme Variables (`app/globals.css`)
- `--font-serif`: `"Cormorant Garamond", Georgia, serif`
- `--font-mono`: `"JetBrains Mono", monospace`
- `--color-text-primary`: `#111111`
- `--color-text-secondary`: `#222222`
- `--color-text-muted`: `#333333`

### 2.2 Component Hierarchy
- **Page Titles (`H1`)**: `font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-wide text-center uppercase`
- **Section Titles (`H2/H3`)**: `font-serif text-2xl md:text-4xl font-medium text-text-primary tracking-wide`
- **Body & Paragraphs (`P`)**: `font-serif text-lg md:text-xl font-normal text-text-primary leading-[1.9]`
- **Layer & Meta Badges (`SPAN`)**: `font-mono text-xs font-bold text-text-secondary tracking-[0.3em] uppercase block`

---

## 3. Page Synchronization Scope

1. `features/navigation/Navbar.tsx` & `Footer.tsx`: Brand logo in Garamond wide tracking, nav items in Garamond serif + mono labels.
2. `app/page.tsx` (Homepage): Hero titles, philosophy quotes, featured artwork headers in Garamond serif.
3. `app/works/page.tsx` & `app/works/[slug]/page.tsx`: Artwork chapter headers, medium descriptions, and curatorial notes in Garamond serif.
4. `app/field-notes/page.tsx` & `app/journal/page.tsx`: Research entry titles and reading body text in Garamond serif + mono dates.
5. `app/publications/page.tsx`: Critical review text and catalog titles in Garamond serif.
6. `app/cv/page.tsx`: Timeline headings and detailed career entries in Garamond serif text (`text-xl md:text-2xl font-normal`).
7. `app/contact/page.tsx`: Contact inquiry copy in Garamond serif + mono form labels.
8. `app/admin/page.tsx`: Post titles, preview cards, and editor textareas in Garamond serif.

---

## 4. Verification & Testing

1. **Visual Consistency Check**: Verify that all pages render using the exact same font pairing (`Cormorant Garamond` serif + `Monospace` uppercase meta tags) as the `/about` screenshot.
2. **Production Build Check**: Execute `npm run build` to verify 0 errors.
