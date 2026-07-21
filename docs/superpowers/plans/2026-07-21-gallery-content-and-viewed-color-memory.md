# Web Content Update & Viewed Image Color Memory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize media assets and text content from `Thu vien` (docxs, photos) into the website, and implement a persistent Viewed Image Color Memory system using `localStorage`.

**Architecture:** Create `ViewedImagesContext` to store viewed image/work IDs in `localStorage`. Create `ArchiveImage` wrapper component for grayscale-to-color transitions. Update Homepage, About (`/about`), CV (`/cv`), and Works (`/works`) pages.

**Tech Stack:** Next.js 15 (App Router), React, TypeScript, Framer Motion, Tailwind CSS.

## Global Constraints
- Language Context support (Vietnamese & English).
- Images unviewed: `filter grayscale contrast-110 hover:grayscale-0`.
- Images viewed: `filter grayscale-0 contrast-100` permanently.
- Browser storage key: `archive_viewed_images`.

---

### Task 1: Asset Migration from `Thu vien`

**Files:**
- Create: `public/images/home-hero.jpg`
- Create: `public/images/artist-portrait.png`
- Create: `public/images/materials/material-1.jpg`
- Create: `public/images/materials/material-2.jpg`

- [ ] **Step 1: Copy images from `Thu vien` to `public/images/`**

Run node/python/shell command to copy files.

- [ ] **Step 2: Verify copied images exist**

Verify file sizes and availability in `public/images/`.

---

### Task 2: Viewed Images Context & `ArchiveImage` Component

**Files:**
- Create: `lib/context/ViewedImagesContext.tsx`
- Create: `components/ui/ArchiveImage.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- `ViewedImagesContextType`: `{ viewedIds: Set<string>; markAsViewed: (id: string) => void; isViewed: (id: string) => boolean }`
- `ArchiveImageProps`: `{ src: string; alt: string; id: string; className?: string; aspectRatio?: string; priority?: boolean }`

- [ ] **Step 1: Create `lib/context/ViewedImagesContext.tsx`**
- [ ] **Step 2: Create `components/ui/ArchiveImage.tsx`**
- [ ] **Step 3: Wrap `app/layout.tsx` with `ViewedImagesProvider`**
- [ ] **Step 4: Verify build with `npm run build`**

---

### Task 3: Homepage Updates (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update Hero section background image to `/images/home-hero.jpg`**
- [ ] **Step 2: Update Featured Fragments cards to use `ArchiveImage` or `markAsViewed` on click**
- [ ] **Step 3: Test Homepage compilation**

---

### Task 4: Biography & About Page Update (`app/about/page.tsx`)

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Update portrait image to `/images/artist-portrait.png` using `ArchiveImage`**
- [ ] **Step 2: Update Biography text from `ARTIST BIO- short version.docx` in `t(...)`**
- [ ] **Step 3: Add Materials Showcase section with `material-1.jpg` and `material-2.jpg`**
- [ ] **Step 4: Test About page compilation**

---

### Task 5: CV Page Update (`app/cv/page.tsx`)

**Files:**
- Modify: `app/cv/page.tsx`

- [ ] **Step 1: Update `cvData` structure with full entries from `CURRICULUM VITAE.docx`**
- [ ] **Step 2: Test CV page compilation**

---

### Task 6: Works Gallery & Detail Integration (`app/works/page.tsx` and `app/works/[slug]/page.tsx`)

**Files:**
- Modify: `app/works/page.tsx`
- Modify: `app/works/[slug]/page.tsx`

- [ ] **Step 1: Update artwork cards in `/works` to use `ArchiveImage`**
- [ ] **Step 2: Auto-mark artwork images as viewed on `/works/[slug]` mount**
- [ ] **Step 3: Run final verification check (`npm run build`)**

