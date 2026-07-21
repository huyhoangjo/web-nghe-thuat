# PDF UI/UX Refinements & 5-Chapter Restructuring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all design changes specified in `NHỮNG CHI TIẾT CẦN CHỈNH SỬA CHO GIAO DIỆN WEB.pdf`.

**Architecture:** Update `app/globals.css`, `features/navigation/Navbar.tsx`, `app/page.tsx`, `app/works/page.tsx`, and `components/ui/ArchiveImage.tsx`.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19, Framer Motion v12.

## Global Constraints

- Secondary text color `#2B2A2A`. Hover color `#bc9c22`.
- Homepage navbar: ONLY `☰` icon and `VI / EN`.
- Inner navbar: Brand on left, updated nav item titles (`BODY OF WORK`, `PRACTICE`, `FRAGMENTS`, `CV & CONTACT`), ONLY `VI / EN` on right (no `INDEX ☰`).
- All changes must pass `npm run build` with 0 errors.

---

### Task 1: Update Global Theme Colors & Hover Rules (`app/globals.css`)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Set secondary color `#2B2A2A` and hover accent `#bc9c22`**
Update `@theme` variables and add hover utility rule `.hover-gold:hover { color: #bc9c22; }`.

- [ ] **Step 2: Commit CSS theme update**
```bash
git add app/globals.css
git commit -m "style(theme): update secondary text color to #2B2A2A and hover accent to #bc9c22"
```

---

### Task 2: Refactor Navigation Bar System (`features/navigation/Navbar.tsx`)

**Files:**
- Modify: `features/navigation/Navbar.tsx`

- [ ] **Step 1: Update Homepage vs Inner Page navigation logic**
Homepage (`/`): Show ONLY `☰` drawer button + `VI / EN` language toggle.
Inner pages: Show `NGO THI THUY DUYEN` on left, `BODY OF WORK`, `PRACTICE`, `FRAGMENTS`, `CV & CONTACT` in center, and ONLY `VI / EN` on right (hide `INDEX ☰` text & icon).

- [ ] **Step 2: Commit Navbar refactor**
```bash
git add features/navigation/Navbar.tsx
git commit -m "refactor(navbar): separate homepage minimal header and inner page header with updated nav links"
```

---

### Task 3: Update Homepage Hero & Sections (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update Hero background image, title size, quote, and button**
Use `/images/home-hero.jpg` in full color (no grayscale). Reduce title font size to 75% (`text-3xl md:text-5xl lg:text-6xl`). Update quote to `“Art as a process of becoming.”`. Change button text to `ENTER`.

- [ ] **Step 2: Update lower section titles & links**
Change `FEATURED FRAGMENTS` to `BODY OF WORK`. Change `VIEW ALL WORKS →` to `VIEW ALL →`.

- [ ] **Step 3: Commit Homepage updates**
```bash
git add app/page.tsx
git commit -m "feat(home): update hero color image, title size, quote, ENTER button, and Body of Work header"
```

---

### Task 4: Restructure Works Page to 5 Chapters (`app/works/page.tsx`)

**Files:**
- Modify: `app/works/page.tsx`

- [ ] **Step 1: Update page title and remove tagline**
Title set to `BODY OF WORK`. Remove `CHRONOLOGICAL ARCHIVE` text.

- [ ] **Step 2: Restructure into 5 Chapters with interactive filtering**
Implement 5 chapter filters (`Emerging Presence`, `Departure`, `Fragile Bodies`, `Temporary Presence`, `The Origin of No-Self`). Add chapter selector tabs so clicking a chapter displays its artworks.

- [ ] **Step 3: Commit Works page restructuring**
```bash
git add app/works/page.tsx
git commit -m "feat(works): restructure into 5 chapters with interactive chapter filtering"
```

---

### Task 5: End-to-End Build Verification

**Files:**
- Test all modified components

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: `Compiled successfully` with 0 errors.

- [ ] **Step 2: Commit and push**
```bash
git add .
git commit -m "chore: complete PDF UI/UX refinements and 5-chapter restructuring"
git push origin main
```
