# Museum-Grade Typography Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize the exact typography system shown in the `/about` screenshot (`Cormorant Garamond` serif for titles & body text + `Monospace` uppercase meta tags + `#111111` deep ink) across all pages.

**Architecture:** Update `app/globals.css` default font rules. Synchronize typography classes across `app/page.tsx`, `app/works/page.tsx`, `app/works/[slug]/page.tsx`, `app/field-notes/page.tsx`, `app/journal/page.tsx`, `app/publications/page.tsx`, `app/contact/page.tsx`, `features/navigation/Navbar.tsx`, and `Footer.tsx`.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19.

## Global Constraints

- All headings, subheadings, titles, and body paragraphs must use `Cormorant Garamond` (`font-serif`) in deep charcoal `#111111` / `#222222`.
- All meta tags, dates, layer badges, and technical labels must use `Monospace` (`font-mono`) uppercase with `tracking-[0.25em]` to `tracking-[0.35em]` and `font-bold`.
- All changes must pass `npm run build` with 0 errors.

---

### Task 1: Update Global Theme Default Fonts & Base Rules (`app/globals.css`)

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Google Fonts Cormorant Garamond & JetBrains Mono
- Produces: Default font-serif body text rendering and typography defaults

- [ ] **Step 1: Set default font-serif rules in `app/globals.css`**
Add base rules to `body` and `p, article, section` so `font-serif` and `#111111` color are default for all text.

- [ ] **Step 2: Commit CSS base update**
```bash
git add app/globals.css
git commit -m "style(typography): set Cormorant Garamond as default serif font across all text elements"
```

---

### Task 2: Synchronize Homepage, Works, Field Notes, Journal & Publications Pages

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/works/page.tsx`
- Modify: `app/works/[slug]/page.tsx`
- Modify: `app/field-notes/page.tsx`
- Modify: `app/journal/page.tsx`
- Modify: `app/publications/page.tsx`
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: Page component views
- Produces: Perfectly synchronized typography matching the reference image

- [ ] **Step 1: Synchronize `app/page.tsx` (Homepage)**
Ensure Hero title, statement quotes, and artwork cards use Garamond serif (`font-serif text-text-primary`) + Mono meta badges.

- [ ] **Step 2: Synchronize `app/works/page.tsx` & `app/works/[slug]/page.tsx`**
Update chapter titles, year badges, and artwork descriptions to Garamond serif `text-lg md:text-xl font-normal text-text-primary`.

- [ ] **Step 3: Synchronize `app/field-notes/page.tsx`, `app/journal/page.tsx`, `app/publications/page.tsx`, `app/contact/page.tsx`**
Update entry list cards, article body texts, and contact copy to match Garamond serif + Mono meta labels.

- [ ] **Step 4: Commit synchronized pages**
```bash
git add app/page.tsx app/works/ app/field-notes/ app/journal/ app/publications/ app/contact/
git commit -m "style(typography): synchronize Cormorant Garamond serif and Mono meta tags across all pages"
```

---

### Task 3: End-to-End Build Verification

**Files:**
- Test all modified page components

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: `Compiled successfully` with zero errors.

- [ ] **Step 2: Final commit & push**
```bash
git add .
git commit -m "chore: complete site-wide museum typography synchronization"
git push origin main
```
