# Admin Floating Editor Modal & CV Layout Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the `/cv` page into a spacious, high-contrast grid, and convert the `/admin` post editor into a centered floating backdrop overlay modal.

**Architecture:** Update `app/cv/page.tsx` grid definitions and font classes. Wrap the `(isAdding || editingPost)` form in `app/admin/page.tsx` with a fixed backdrop modal container with Framer Motion animations.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19, Framer Motion v12, Lucide icons.

## Global Constraints

- `/cv` timeline entries must span `max-w-6xl` with `col-span-2` for years and `col-span-10` for content.
- `/admin` editor form must render inside a fixed backdrop modal (`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-text-primary/75 backdrop-blur-md`).
- All changes must pass `npm run build` with zero errors.

---

### Task 1: Overhaul Biography / CV Layout & Typography (`app/cv/page.tsx`)

**Files:**
- Modify: `app/cv/page.tsx`

**Interfaces:**
- Consumes: `cvData` structure and `useLanguage`
- Produces: Spacious 2:10 ratio grid timeline view with large high-contrast serif typography

- [ ] **Step 1: Update container width and header**
Set container to `max-w-6xl mx-auto py-24 bg-background-primary space-y-20`.

- [ ] **Step 2: Update Grid ratio and typography for CV items**
Change item layout to `grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-b border-border-light pb-6 last:border-0`.
Set Year column: `md:col-span-2 font-mono text-sm md:text-base font-bold text-text-primary tracking-wider`.
Set Content column: `md:col-span-10 font-serif text-lg md:text-xl font-normal text-text-primary leading-relaxed`.

- [ ] **Step 3: Commit CV layout overhaul**
```bash
git add app/cv/page.tsx
git commit -m "refactor(cv): overhaul layout into spacious 2:10 grid with high-contrast typography"
```

---

### Task 2: Convert Admin Editor into Floating Center Overlay Modal (`app/admin/page.tsx`)

**Files:**
- Modify: `app/admin/page.tsx`

**Interfaces:**
- Consumes: `editingPost` and `isAdding` states
- Produces: Centered fixed backdrop modal dialog for post editing

- [ ] **Step 1: Wrap editor container with fixed backdrop overlay**
Wrap the editor `<motion.div>` in a backdrop container:
`<div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-text-primary/75 backdrop-blur-md overflow-y-auto">`

- [ ] **Step 2: Add modal backdrop click handler and max-height scrolling**
Add backdrop click handler to close editor when clicking outside the form card.
Set form card styling to `relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background-primary border-2 border-text-primary p-6 md:p-10 rounded-2xl shadow-2xl space-y-8`.

- [ ] **Step 3: Commit Admin Floating Modal update**
```bash
git add app/admin/page.tsx
git commit -m "feat(admin): convert post editor into centered floating backdrop overlay modal"
```

---

### Task 3: End-to-End Build Verification

**Files:**
- Test all modified components

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: `Compiled successfully` with zero errors.

- [ ] **Step 2: Final commit**
```bash
git add .
git commit -m "chore: complete CV layout overhaul and admin floating editor modal"
```
