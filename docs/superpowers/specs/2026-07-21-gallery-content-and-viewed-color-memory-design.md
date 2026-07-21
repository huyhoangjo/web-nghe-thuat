# Design Spec: Web Content Update & Viewed Image Color Memory

**Date**: 2026-07-21  
**Project**: Ngo Thi Thuy Duyen - Living Artistic Archive  
**Status**: Approved by User  

---

## 1. Executive Summary

This update synchronizes the website content and media assets with the latest material provided in the `Thu vien` library. It also introduces a dynamic visual feature: **Viewed Image Color Memory**. 

When visitors navigate the archive, unviewed images remain in classic black & white (`grayscale`), turning into color on hover. Once an image or artwork is viewed (by clicking or opening its detail view), the system records its state in `localStorage`. From that point forward, the viewed image remains permanently in vibrant full color (`grayscale-0`) across all sessions and page reloads.

---

## 2. Media & Content Synchronizations

### 2.1 Media Asset Migration from `Thu vien`
1. **Homepage Hero Image**:
   - Source: `Thu vien/Home photo.jpg`
   - Destination: `/public/images/home-hero.jpg`
   - Target usage: Replaces `/duyen.jpg` in `app/page.tsx` hero section with high-resolution artwork/landscape hero.
2. **Artist Portrait Image**:
   - Source: `Thu vien/Ảnh chân dung cho Bio or portfolio.png`
   - Destination: `/public/images/artist-portrait.png`
   - Target usage: Replaces placeholder/portrait on `app/about/page.tsx` (Biography & Profile).
3. **Material / Texture Artwork Images**:
   - Source: `Thu vien/Ảnh dùng làm chất liệu.jpg` & `Thu vien/Ảnh dùng làm chất liệu 1.jpg`
   - Destination: `/public/images/materials/material-1.jpg` & `/public/images/materials/material-2.jpg`
   - Target usage: Displayed in the artistic practice and material inquiry sections on `app/about/page.tsx` and featured work background layers.

### 2.2 Text Content Updates from `.docx` Documents
1. **Biography Update (`app/about/page.tsx`)**:
   - Source: `Thu vien/ARTIST BIO- short version.docx`
   - Content: Multi-paragraph biographic overview highlighting 20+ years of practice centered on handmade dó paper, ink, thread, light, and transparent resin across painting, installation, and performance art. Both English & Vietnamese versions integrated via `LanguageContext`.
2. **Curriculum Vitae Timeline (`app/cv/page.tsx`)**:
   - Source: `Thu vien/CURRICULUM VITAE.docx`
   - Content: Structured comprehensive timeline covering:
     - Education (Ho Chi Minh City University of Fine Arts, Hue University of Arts)
     - Grants & Artist Residencies (Cu Chi, South Country, Young Artists Grants Melbourne, HIVECAMP Korea)
     - Solo Exhibitions (Allergy 2011, Departure 2007)
     - Selected Group Exhibitions (2003-2016)
     - Performance Art Projects (Allergy, PAN ASIA, Blue-Red-Yellow, Gwangju Biennale, Fireflies)
     - Artist Talks & Workshops (Germany, Taiwan, Vietnam)
     - Publications & Collections
     - Professional Experience (Art Director 2018-2023 at First Interactive Technology)

---

## 3. Viewed Image Color Memory System

### 3.1 Architecture Overview
- **`ViewedImagesContext` (`lib/context/ViewedImagesContext.tsx`)**:
  - Maintains `viewedIds`: a `Set<string>` containing URLs or unique IDs of images/works that the user has viewed.
  - Hydrates from `localStorage` under key `archive_viewed_images` on client mount.
  - Exposes `markAsViewed(id: string)` method and `isViewed(id: string)` check.
  - Automatically updates `localStorage` whenever new images are marked as viewed.

### 3.2 Reusable `ArchiveImage` Component (`components/ui/ArchiveImage.tsx`)
- Encapsulates standard grayscale-to-color transition logic.
- Props: `src`, `alt`, `id`, `className`, `aspectRatio`, `priority`.
- Behavior:
  - Checks `isViewed(id)` from `ViewedImagesContext`.
  - If `isViewed === true`: applies CSS `filter grayscale-0 contrast-100`.
  - If `isViewed === false`: applies CSS `filter grayscale contrast-110 hover:grayscale-0`.
  - Smooth 700ms cubic-bezier transitions for color changes.

### 3.3 Automatic View Trigger Points
1. **Card Click**: Clicking any artwork card on Homepage or `/works` triggers `markAsViewed(work.slug)` or `markAsViewed(work.images[0])`.
2. **Detail Page Navigation**: Opening `/works/[slug]` marks all images associated with that work as viewed upon page mount.
3. **Modal / Lightbox View**: Expanding an image view marks the image as viewed.

---

## 4. Verification & Testing Plan

1. **Build & Lint Verification**:
   - Run `npm run build` or Next.js build check to confirm TypeScript and JSX compile without errors.
2. **Functional Verification**:
   - Check Homepage Hero displays `home-hero.jpg`.
   - Check About page displays `artist-portrait.png` and updated biography text.
   - Check CV page displays updated full CV content.
   - Verify unviewed gallery images start as black & white.
   - Click an artwork, view its detail page, return to main gallery: confirm that image now stays colored permanently.
   - Refresh browser tab: confirm colored state persists via `localStorage`.

