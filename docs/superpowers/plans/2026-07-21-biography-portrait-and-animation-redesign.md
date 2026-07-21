# Biography Page Portrait Integration & Animation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `/ CV` from title, add artist portrait image `/images/artist-portrait.png` in a museum-grade 2-column hero card, and implement Framer Motion scroll animations on `app/cv/page.tsx`.

**Architecture:** Update `app/cv/page.tsx` with a 2-column portrait profile card, Framer Motion image hover effects, and updated timeline layout.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19, Framer Motion v12.

## Global Constraints

- Title header must be `BIOGRAPHY` (removing `/ CV`).
- Image path must be `/images/artist-portrait.png`.
- All changes must pass `npm run build` with 0 errors.

---

### Task 1: Overhaul Biography Hero & Embed Portrait Image (`app/cv/page.tsx`)

**Files:**
- Modify: `app/cv/page.tsx`
- Consumes: `/images/artist-portrait.png`

- [ ] **Step 1: Update page title header**
Change `BIOGRAPHY / CV` to `BIOGRAPHY`.

- [ ] **Step 2: Build 2-column Artist Profile Hero Section**
Add a 2-column grid (`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24`):
- Left (`lg:col-span-5`): Animated Portrait Image with border-2 frame, grayscale-to-color hover transition, and caption (`NGO THI THUY DUYEN / B. 1981, HOI AN, VIETNAM`).
- Right (`lg:col-span-7`): Artist practice summary paragraph, key stats grid (Mediums, Residencies, Practice focus).

- [ ] **Step 3: Add Framer Motion staggered scroll animations to timeline sections**
Wrap each section and item in `motion.section` and `motion.div` with viewport threshold and smooth ease transitions.

- [ ] **Step 4: Commit Biography overhaul**
```bash
git add app/cv/page.tsx public/images/artist-portrait.png
git commit -m "feat(biography): integrate artist portrait, remove / CV title, add Framer Motion animations"
```

---

### Task 2: End-to-End Build Verification

**Files:**
- Test `app/cv/page.tsx`

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: `Compiled successfully` with zero errors.

- [ ] **Step 2: Commit and push**
```bash
git add .
git commit -m "chore: complete biography portrait redesign and animation overhaul"
git push origin main
```
